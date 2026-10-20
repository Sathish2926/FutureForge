from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user
from app.services.career_dna import (
    QUESTION_SETS,
    build_adaptive_question_set,
    build_guidance,
    build_job_switcher_guidance,
    build_canonical_career_dna,
    MINI_EXPERIMENTS,
    evaluate_experiment_submission,
    evaluate_class10_adaptive_state,
)
from app.services.target_resolution import resolve_target_role
from app.services.recommendation_core import UnifiedRecommendationEngine

router = APIRouter(prefix="/api/career-dna", tags=["career-dna"])

VALID_STAGES = set(QUESTION_SETS.keys())  # class10, class12, ug, pg, job_switcher


@router.get("/stages")
def list_stages():
    """All stages this dedicated Career DNA form supports."""
    return [{"stage": s, "label": {
        "class10": "Class 10", "class12": "Class 12", "ug": "Undergraduate",
        "pg": "Postgraduate", "job_switcher": "Working professional / career switcher",
    }[s]} for s in QUESTION_SETS.keys()]


@router.get("/questions")
def get_questions(stage: str):
    if stage not in VALID_STAGES:
        raise HTTPException(status_code=400, detail=f"Unknown stage. Valid stages: {sorted(VALID_STAGES)}")
    return build_adaptive_question_set(stage, {})


@router.post("/adaptive-next")
def get_adaptive_next_question(payload: schemas.AdaptiveNextQuestionRequest):
    """
    Returns the dynamic next question, current phase, domain scores, and completion status
    for the Class 10 adaptive Career DNA questionnaire.
    """
    if payload.stage != "class10":
        raise HTTPException(status_code=400, detail="Adaptive questioning currently only supported for class10.")
    return evaluate_class10_adaptive_state(payload.answers or {})


@router.post("/submit")
def submit_career_dna(
    payload: schemas.CareerDNASubmitRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Each user has one Career DNA response PER STAGE (a dedicated form
    separate from general onboarding). Submitting syncs the profile version,
    updates user interests/stage, and generates fresh lifecycle recommendations."""
    if payload.stage not in VALID_STAGES:
        raise HTTPException(status_code=400, detail=f"Unknown stage. Valid stages: {sorted(VALID_STAGES)}")

    if payload.stage == "job_switcher":
        if not (payload.answers.get("current_job_title") or payload.answers.get("current_role")):
            raise HTTPException(status_code=422, detail="Please provide your current job title or role.")
        guidance = build_job_switcher_guidance(payload.answers)
    else:
        guidance = build_guidance(payload.stage, payload.answers)

    previous = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage=payload.stage)
        .order_by(models.CareerDNAResponse.version.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )
    record = models.CareerDNAResponse(
        user_id=user.id,
        stage=payload.stage,
        answers_json=payload.answers,
        guidance_json=guidance,
        version=(previous.version if previous and previous.version else 0) + 1,
        ruleset_version="career_dna_v2",
    )
    db.add(record)

    # Preserve the user's actual education stage. Career DNA stage is stored as a
    # separate assessment context and should not overwrite the profile's academic stage,
    # especially for class10/UG users who are also exploring job transitions.
    profile = user.profile
    if not profile:
        profile = models.Profile(user_id=user.id, version=1)
        db.add(profile)
    else:
        profile.version = (profile.version or 1) + 1

    # Keep a stage-specific Career DNA record, but do not mutate the student's academic stage.
    if payload.stage != "job_switcher" and profile.education_stage is None:
        profile.education_stage = payload.stage

    # Extract stated interests / subjects and update UserInterest table
    extracted_interests = set()
    for key in ["favorite_subjects", "strong_subjects", "career_curiosity", "target_field", "preferred_degree_type"]:
        val = payload.answers.get(key)
        if isinstance(val, list):
            for v in val:
                if isinstance(v, str) and v.strip():
                    extracted_interests.add(v.strip())
        elif isinstance(val, str) and val.strip():
            extracted_interests.add(val.strip())

    if extracted_interests:
        # Clear old user interests and add extracted ones
        db.query(models.UserInterest).filter_by(user_id=user.id).delete()
        for intr_name in list(extracted_interests)[:10]:
            interest_obj = db.query(models.Interest).filter_by(name=intr_name).first()
            if not interest_obj:
                interest_obj = models.Interest(name=intr_name, category="career_dna")
                db.add(interest_obj)
                db.flush()
            user_interest = models.UserInterest(user_id=user.id, interest_id=interest_obj.id)
            db.add(user_interest)

    db.commit()
    db.refresh(record)

    # Regenerate persistent recommendations for this user
    try:
        from app.services import recommendation_service
        if payload.stage != "job_switcher":
            recommendation_service.get_or_generate_recommendations(
                db, user, recommendation_type="higher_study", force_regenerate=True, stage_override=payload.stage
            )
        recommendation_service.get_or_generate_recommendations(
            db, user, recommendation_type="career", force_regenerate=True
        )
    except Exception as e:
        print(f"Warning: recommendation auto-refresh failed: {e}")

    return {"id": record.id, "stage": record.stage, "answers": record.answers_json, "guidance": record.guidance_json}


@router.get("")
def list_my_career_dna(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    """All stage responses this user has filled in so far — each stage
    is its own separate form/result, never overwriting a different stage."""
    records = db.query(models.CareerDNAResponse).filter_by(user_id=user.id).all()
    return [{"id": r.id, "stage": r.stage, "answers": r.answers_json, "guidance": r.guidance_json,
             "updated_at": r.updated_at.isoformat() if r.updated_at else None} for r in records]


@router.get("/experiments")
def list_experiments():
    """Returns available mini-experiments for bridging uncertainty in specific domains."""
    return MINI_EXPERIMENTS


@router.post("/experiment")
def submit_experiment(
    payload: schemas.ExperimentSubmissionRequest,
    user: models.User = Depends(get_current_user),
):
    """Evaluates a user mini-experiment submission and returns evidence/feedback."""
    return evaluate_experiment_submission(payload.experiment_id, payload.selected_option)


@router.post("/resolve-target")
def resolve_target(
    payload: schemas.TargetResolutionRequest,
    user: models.User = Depends(get_current_user),
):
    """Semantic target role resolution with typo tolerance, alias mapping, and unknown handling."""
    return resolve_target_role(payload.target_role)


@router.post("/why")
def get_why_analysis(
    stage: str,
    payload: dict,
    user: models.User = Depends(get_current_user),
):
    """Provides 'Why Not?' and 'What Would Change This?' rationales for candidate paths."""
    answers = payload.get("answers", {})
    target_role = payload.get("target_role")
    recs = UnifiedRecommendationEngine.generate_recommendations(stage, answers, target_role=target_role)
    return {
        "stage": stage,
        "items": recs.get("items", []),
        "why_not_candidates": recs.get("why_not_candidates", []),
        "explanation_trace": recs.get("explanation_trace", {}),
    }


@router.post("/correct")
def submit_user_correction(
    payload: schemas.UserCorrectionRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Section 38: Allows user to correct signals ('That's not me', 'I dislike coding')."""
    record = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage=payload.stage)
        .order_by(models.CareerDNAResponse.version.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )
    if not record:
        raise HTTPException(status_code=404, detail="No existing Career DNA record found for this stage to correct.")

    updated_answers = dict(record.answers_json or {})
    updated_answers.update(payload.corrected_signals)
    updated_answers["_user_corrections"] = updated_answers.get("_user_corrections", []) + [
        {"signals": payload.corrected_signals}
    ]

    if payload.stage == "job_switcher":
        new_guidance = build_job_switcher_guidance(updated_answers)
    else:
        new_guidance = build_guidance(payload.stage, updated_answers)

    new_record = models.CareerDNAResponse(
        user_id=user.id,
        stage=payload.stage,
        answers_json=updated_answers,
        guidance_json=new_guidance,
        version=(record.version or 1) + 1,
        ruleset_version="career_dna_v2_corrected",
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return {
        "message": "Career DNA updated with user corrections.",
        "id": new_record.id,
        "stage": new_record.stage,
        "version": new_record.version,
        "guidance": new_record.guidance_json,
    }


@router.get("/{stage}")
def get_my_career_dna(stage: str, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    record = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage=stage)
        .order_by(models.CareerDNAResponse.version.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )
    if not record:
        return None
    return {"id": record.id, "stage": record.stage, "version": record.version,
            "ruleset_version": record.ruleset_version, "answers": record.answers_json, "guidance": record.guidance_json}


@router.get("/{stage}/canonical")
def get_canonical_career_dna(stage: str, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    """Returns the typed canonical CareerDNA schema object for the user's stage response."""
    record = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage=stage)
        .order_by(models.CareerDNAResponse.version.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )
    if not record:
        canonical = build_canonical_career_dna(stage, {})
        return canonical.model_dump()

    canonical_data = (record.guidance_json or {}).get("canonical_dna")
    if not canonical_data:
        canonical = build_canonical_career_dna(stage, record.answers_json or {})
        canonical_data = canonical.model_dump()
    return canonical_data
