# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user
from app.services.profile_completion import compute_profile_completion

router = APIRouter(prefix="/api/profile", tags=["profile"])


def _serialize(profile: models.Profile, user: models.User):
    return {
        "name": profile.name,
        "date_of_birth": profile.date_of_birth,
        "gender": profile.gender,
        "state": profile.state,
        "district": profile.district,
        "city": profile.city,
        "education_stage": profile.education_stage,
        "current_class_or_year": profile.current_class_or_year,
        "preferred_location": profile.preferred_location,
        "willing_to_relocate": profile.willing_to_relocate,
        "category": profile.category,
        "disability_status": profile.disability_status,
        "first_generation_learner": profile.first_generation_learner,
        "financial_profile": {
            "family_income_band": profile.financial_profile.family_income_band,
            "budget_band": profile.financial_profile.budget_band,
            "government_private_preference": profile.financial_profile.government_private_preference,
        } if profile.financial_profile else None,
        "education_records": [
            {"level": e.level, "institution_name": e.institution_name, "stream": e.stream,
             "subjects": e.subjects, "marks_percent": e.marks_percent, "cgpa": e.cgpa}
            for e in user.education_records
        ],
        "interests": [ui.interest.name for ui in user.user_interests],
        "skills": [us.skill.name for us in user.user_skills],
        "primary_career_goal": next(
            (g.career.slug for g in user.career_goals if g.is_primary and g.status == "active"), None
        ),
    }


@router.get("", response_model=schemas.ProfileOut)
def get_profile(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    profile = user.profile
    profile_before = {
        field: getattr(profile, field, None) if profile else None
        for field in ["education_stage", "current_class_or_year", "preferred_location", "willing_to_relocate"]
    }
    completion = compute_profile_completion(db, user)
    profile_payload = _serialize(profile, user) if profile else {}
    profile_payload["completion"] = {
        "required_sections": completion["required_sections"],
        "optional_sections": completion["optional_sections"],
        "stage_used": completion["stage_used"],
        "career_dna_stage_used": completion["career_dna_stage_used"],
        "summary": completion["summary"],
    }
    return schemas.ProfileOut(
        name=profile.name if profile else None,
        education_stage=profile.education_stage if profile else None,
        state=profile.state if profile else None,
        completeness_percent=completion["completeness_percent"],
        missing_sections=completion["missing_sections"],
        profile=profile_payload,
    )


@router.patch("", response_model=schemas.ProfileOut)
def update_profile(
    payload: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Partial update — only send fields that changed. Existing values are
    preserved unless explicitly overwritten, so the frontend never needs to
    re-collect information already on file (spec §5)."""
    profile = user.profile
    if not profile:
        profile = models.Profile(user_id=user.id)
        db.add(profile)
        db.flush()

    simple_fields = [
        "name", "date_of_birth", "gender", "state", "district", "city", "pincode",
        "education_stage", "current_class_or_year", "preferred_location",
        "willing_to_relocate", "distance_preference_km", "category",
        "disability_status", "first_generation_learner",
    ]
    for field in simple_fields:
        value = getattr(payload, field)
        if value is not None:
            setattr(profile, field, value)

    if any(
        getattr(payload, field) is not None
        for field in ["family_income_band", "budget_band", "government_private_preference"]
    ):
        if not profile.financial_profile:
            fp = models.FinancialProfile()
            db.add(fp)
            db.flush()
            profile.financial_profile = fp
        fp = profile.financial_profile
        if payload.family_income_band is not None:
            fp.family_income_band = payload.family_income_band or None
        if payload.budget_band is not None:
            fp.budget_band = payload.budget_band or None
        if payload.government_private_preference is not None:
            fp.government_private_preference = payload.government_private_preference or None

    if payload.interests:
        existing = {ui.interest.name for ui in user.user_interests}
        for name in payload.interests:
            if name in existing:
                continue
            interest = db.query(models.Interest).filter_by(name=name).first()
            if not interest:
                interest = models.Interest(name=name, category="custom")
                db.add(interest)
                db.flush()
            db.add(models.UserInterest(user_id=user.id, interest_id=interest.id))

    if payload.skills:
        existing = {us.skill.name for us in user.user_skills}
        for name in payload.skills:
            if name in existing:
                continue
            skill = db.query(models.Skill).filter_by(name=name).first()
            if not skill:
                skill = models.Skill(name=name, category="custom")
                db.add(skill)
                db.flush()
            db.add(models.UserSkill(user_id=user.id, skill_id=skill.id))

    if payload.education_records:
        for rec in payload.education_records:
            db.add(models.EducationRecord(user_id=user.id, **rec.dict()))

    if any(getattr(payload, field) is not None for field in simple_fields) or payload.education_records or payload.skills or payload.interests:
        profile.version = (profile.version or 1) + 1

    if payload.primary_career_goal_slug:
        career = db.query(models.Career).filter_by(slug=payload.primary_career_goal_slug).first()
        if career:
            for g in user.career_goals:
                if g.is_primary:
                    g.is_primary = False
            db.add(models.CareerGoal(user_id=user.id, career_id=career.id, is_primary=True))

    db.commit()
    db.refresh(user)
    completion = compute_profile_completion(db, user)
    profile_payload = _serialize(user.profile, user)
    profile_payload["completion"] = {
        "required_sections": completion["required_sections"],
        "optional_sections": completion["optional_sections"],
        "stage_used": completion["stage_used"],
        "career_dna_stage_used": completion["career_dna_stage_used"],
        "summary": completion["summary"],
    }
    return schemas.ProfileOut(
        name=user.profile.name, education_stage=user.profile.education_stage, state=user.profile.state,
        completeness_percent=completion["completeness_percent"],
        missing_sections=completion["missing_sections"],
        profile=profile_payload,
    )
