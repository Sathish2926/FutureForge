"""
Profile-Persistent & Idempotent Recommendation Service Layer.

Ensures that recommendations are NOT recalculated on every GET request or page refresh.
Persists recommendation snapshots and item records in PostgreSQL / SQLite DB.
Regenerates only when meaningful profile changes occur (version increments) or user forces reassessment.
"""
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session

from .. import models
from ..recommendation import (
    generate_idempotency_hash,
    generate_higher_study_recommendations,
    generate_career_recommendations,
    ENGINE_VERSION,
    normalize_education_stage,
    recommendation_scope,
)


def get_user_profile_version(user: models.User) -> int:
    if user.profile and user.profile.version:
        return user.profile.version
    return 1


def get_user_career_dna_version(db: Session, user: models.User, stage_override: Optional[str] = None) -> int:
    stage = normalize_education_stage(stage_override or (user.profile.education_stage if user.profile else "ug"))
    assessment_stage = "job_switcher" if stage == "working_professional" else stage
    dna = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage=assessment_stage)
        .order_by(models.CareerDNAResponse.updated_at.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )
    return getattr(dna, "version", 1) if dna else 1


def _serialize_recommendation(rec: models.Recommendation) -> Dict[str, Any]:
    items_serialized = []
    for item in sorted(rec.items, key=lambda x: x.rank):
        structured_reasons = item.structured_reasons or {}
        items_serialized.append({
            "id": item.id,
            "recommendation_id": item.recommendation_id,
            "item_type": item.item_type,
            "item_reference": item.item_reference,
            "title": item.title,
            "sector_or_field": item.sector_or_field,
            "rank": item.rank,
            "score": item.score,
            "match_level": item.match_level,
            "profile_alignment": item.match_level,
            "eligibility_status": item.eligibility_status,
            "eligibility_state": structured_reasons.get("eligibility_state", item.eligibility_status),
            "pathway_type": structured_reasons.get("pathway_type"),
            "structured_reasons": structured_reasons,
            "created_at": item.created_at.isoformat() if item.created_at else None,
        })

    typed_items = {
        "programs": [item for item in items_serialized if item.get("pathway_type") in {"UNDERGRADUATE_PROGRAM", "POSTGRADUATE_PROGRAM", "HIGHER_STUDIES"}],
        "careers": [item for item in items_serialized if item.get("pathway_type") in {"CAREER", "INDUSTRY_ADVANCEMENT", "CAREER_SWITCH"}],
        "research_pathways": [item for item in items_serialized if item.get("pathway_type") in {"RESEARCH", "RESEARCH_PATHWAY", "PHD_PATHWAY"}],
        "certifications": [item for item in items_serialized if item.get("pathway_type") == "PROFESSIONAL_CERTIFICATION"],
    }
    return {
        "id": rec.id,
        "user_id": rec.user_id,
        "profile_version": rec.profile_version,
        "career_dna_version": rec.career_dna_version,
        "lifecycle_stage": rec.lifecycle_stage,
        "recommendation_type": rec.recommendation_type,
        "candidate_scope": recommendation_scope(rec.lifecycle_stage),
        "engine_version": rec.engine_version,
        "status": rec.status,
        "selected_item_id": rec.selected_item_id,
        "idempotency_hash": rec.idempotency_hash,
        "created_at": rec.created_at.isoformat() if rec.created_at else None,
        "items": items_serialized,
        **typed_items,
    }


def get_or_generate_recommendations(
    db: Session,
    user: models.User,
    recommendation_type: str = "career",
    goal_text: Optional[str] = None,
    force_regenerate: bool = False,
    stage_override: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Core Idempotent & Persistent Fetcher.
    If a valid active recommendation exists for current profile version & hash, returns it from DB.
    Otherwise generates, saves snapshot & items, and returns.
    """
    profile_ver = get_user_profile_version(user)
    stage = normalize_education_stage(stage_override or (user.profile.education_stage if user.profile else "ug"))
    dna_ver = get_user_career_dna_version(db, user, stage_override=stage)

    # Class 10 users need stream exploration first. Degree recommendations at
    # this stage create a false impression that higher-education prerequisites
    # have already been met, and old persisted snapshots must not leak through.
    if recommendation_type == "higher_study" and stage == "class10":
        return {
            "id": None,
            "user_id": user.id,
            "profile_version": profile_ver,
            "career_dna_version": dna_ver,
            "lifecycle_stage": stage,
            "recommendation_type": recommendation_type,
            "candidate_scope": recommendation_scope(stage),
            "engine_version": ENGINE_VERSION,
            "status": "not_ready",
            "selected_item_id": None,
            "idempotency_hash": None,
            "created_at": None,
            "items": [],
            "stage_message": "Complete Class 12 and confirm your subjects before receiving degree-level recommendations.",
        }

    idem_hash = generate_idempotency_hash(
        user_id=user.id,
        profile_version=profile_ver,
        career_dna_version=dna_ver,
        recommendation_type=recommendation_type,
        goal_text=goal_text,
        engine_version=f"{ENGINE_VERSION}:{stage}:{recommendation_scope(stage)}"
    )

    if not force_regenerate:
        existing = (
            db.query(models.Recommendation)
            .filter_by(
                user_id=user.id,
                recommendation_type=recommendation_type,
                status="active",
                idempotency_hash=idem_hash
            )
            .order_by(models.Recommendation.created_at.desc())
            .first()
        )
        if existing:
            return _serialize_recommendation(existing)

    # Archive / Supersede old active recommendations of this type
    db.query(models.Recommendation).filter_by(
        user_id=user.id,
        recommendation_type=recommendation_type,
        status="active"
    ).update({"status": "superseded"})
    db.flush()

    # Generate new recommendation items
    if recommendation_type == "higher_study":
        raw_items = generate_higher_study_recommendations(db, user, stage_override=stage)
    else:
        raw_items = generate_career_recommendations(db, user)

    # Save parent Recommendation snapshot
    rec = models.Recommendation(
        user_id=user.id,
        profile_version=profile_ver,
        career_dna_version=dna_ver,
        lifecycle_stage=stage,
        recommendation_type=recommendation_type,
        engine_version=ENGINE_VERSION,
        status="active",
        idempotency_hash=idem_hash,
    )
    db.add(rec)
    db.flush()

    # Save child RecommendationItem records
    for ri in raw_items:
        db.add(models.RecommendationItem(
            recommendation_id=rec.id,
            item_type=ri["item_type"],
            item_reference=ri["item_reference"],
            title=ri["title"],
            sector_or_field=ri.get("sector_or_field"),
            rank=ri["rank"],
            score=ri["score"],
            match_level=ri["match_level"],
            eligibility_status=ri["eligibility_status"],
            structured_reasons=ri["structured_reasons"],
        ))

    db.commit()
    db.refresh(rec)
    return _serialize_recommendation(rec)


def select_recommendation_item(
    db: Session,
    user: models.User,
    recommendation_id: int,
    item_id: int
) -> Dict[str, Any]:
    """
    Persists user's explicit selection of a recommended career or higher study program.
    """
    rec = db.query(models.Recommendation).filter_by(id=recommendation_id, user_id=user.id).first()
    if not rec:
        raise ValueError("Recommendation snapshot not found")

    item = db.query(models.RecommendationItem).filter_by(id=item_id, recommendation_id=rec.id).first()
    if not item:
        raise ValueError("Recommendation item not found in snapshot")

    rec.selected_item_id = item.id
    db.commit()
    db.refresh(rec)
    return _serialize_recommendation(rec)


def mark_profile_updated(db: Session, user: models.User):
    """
    Increments profile version when profile / education records / skills change meaningfully.
    This triggers new recommendation generation on next request.
    """
    if user.profile:
        user.profile.version = (user.profile.version or 1) + 1
        db.commit()
