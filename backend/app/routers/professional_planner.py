"""
Router for Working Professional Career Growth & Transition Planner.
Exclusively under /api/career-dna/professional prefix.
Requires authentication; enforces user ownership on all profiles and plans.
"""
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.auth import get_current_user
from app import models
import uuid
from app.professional_models import (
    ProfessionalProfile,
    ProfessionalRole,
    ProfessionalLearningResource,
    ProfessionalCareerPlan,
    ProfessionalPlanStep,
    GuidanceRequestRecord,
)
from app.professional_schemas import (
    ProfessionalProfileSaveRequest,
    ProfessionalProfileResponse,
    SkillGapAnalysisResponse,
    CareerOptionRecommendation,
    GeneratePlanRequest,
    StepUpdateRequest,
    ChecklistUpdateRequest,
    AssistantQueryRequest,
    NaturalLanguageProfileRequest,
    GuidanceRequestCreate,
    GuidanceRequestResponse,
)
from app.services.profile_nlp_service import (
    parse_natural_language_profile,
    analyze_multiskill_evidence,
)
from app.services.professional_planner_service import (
    seed_professional_dataset,
    calculate_skill_gap_analysis,
    recommend_career_options,
    generate_personalized_roadmap,
    generate_ai_profile_summary,
    answer_ai_assistant_query,
)

router = APIRouter(prefix="/api/career-dna/professional", tags=["professional-career-planner"])


@router.get("/profile", response_model=Optional[ProfessionalProfileResponse])
def get_professional_profile(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Retrieve the current user's working professional profile."""
    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    return profile


@router.post("/profile", response_model=ProfessionalProfileResponse)
def save_professional_profile(
    payload: ProfessionalProfileSaveRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Create or update the user's working professional profile."""
    # Ensure datasets are seeded
    seed_professional_dataset(db)

    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if not profile:
        profile = ProfessionalProfile(user_id=user.id)
        db.add(profile)

    profile.current_job_title = payload.current_job_title.strip()
    profile.current_industry = payload.current_industry.strip()
    profile.years_experience = payload.years_experience
    profile.employment_type = payload.employment_type
    profile.highest_qualification = payload.highest_qualification.strip()
    profile.degree_specialization = payload.degree_specialization.strip() if payload.degree_specialization else None
    profile.current_skills = payload.current_skills
    profile.tools_technologies = payload.tools_technologies
    profile.responsibilities = payload.responsibilities.strip() if payload.responsibilities else None
    profile.certifications = payload.certifications
    profile.career_goals = payload.career_goals
    profile.target_pathway = payload.target_pathway
    profile.target_role = payload.target_role.strip() if payload.target_role else None
    profile.target_industry = payload.target_industry.strip() if payload.target_industry else None
    profile.preferred_location = payload.preferred_location.strip() if payload.preferred_location else None
    profile.preferred_work_arrangement = payload.preferred_work_arrangement
    profile.target_salary_range = payload.target_salary_range.strip() if payload.target_salary_range else None
    profile.weekly_learning_hours = payload.weekly_learning_hours
    profile.preferred_learning_format = payload.preferred_learning_format
    profile.learning_budget = payload.learning_budget
    profile.preferred_language = payload.preferred_language
    profile.target_timeline = payload.target_timeline
    profile.current_salary = payload.current_salary.strip() if payload.current_salary else None

    # Generate or refresh AI / rule-based summary
    profile.profile_summary = generate_ai_profile_summary(profile)

    # Sync into CareerDNAResponse stage="job_switcher" for compatibility with dashboard / existing queries
    sync_answers = {
        "current_job_title": profile.current_job_title,
        "current_role": profile.current_job_title,
        "current_industry": profile.current_industry,
        "years_experience": str(profile.years_experience),
        "highest_qualification": profile.highest_qualification,
        "current_skills": profile.current_skills,
        "tools_used": profile.tools_technologies,
        "current_responsibilities": profile.responsibilities,
        "switch_reasons": profile.career_goals,
        "target_role": profile.target_role or "",
        "weekly_learning_hours": f"{profile.weekly_learning_hours} hours",
        "transition_timeline": profile.target_timeline,
    }

    previous_dna = (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user.id, stage="job_switcher")
        .order_by(models.CareerDNAResponse.version.desc())
        .first()
    )
    dna_record = models.CareerDNAResponse(
        user_id=user.id,
        stage="job_switcher",
        answers_json=sync_answers,
        guidance_json={"summary": {"headline": f"{profile.current_job_title} -> {profile.target_role or 'Career Growth'}", "why_this_fits": profile.profile_summary}},
        version=(previous_dna.version if previous_dna and previous_dna.version else 0) + 1,
        ruleset_version="career_dna_professional_v2",
    )
    db.add(dna_record)

    db.commit()
    db.refresh(profile)
    return profile


@router.get("/recommendations", response_model=List[CareerOptionRecommendation])
def get_career_recommendations(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Suggest career options when target is unknown or for exploring alternatives."""
    seed_professional_dataset(db)
    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Please complete your professional profile first.")
    return recommend_career_options(db, profile)


@router.post("/gap-analysis", response_model=SkillGapAnalysisResponse)
def get_skill_gap_analysis(
    target_role: str = Query(..., description="Target career role title"),
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Compute transparent skill gap analysis between profile and selected role."""
    seed_professional_dataset(db)
    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Please complete your professional profile first.")
    return calculate_skill_gap_analysis(db, profile, target_role)


@router.post("/plans")
def create_or_regenerate_career_plan(
    payload: GeneratePlanRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Generate and persist a personalized step-by-step career development plan."""
    seed_professional_dataset(db)
    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Please complete your professional profile first.")

    target_role = payload.target_role.strip()
    roadmap_result = generate_personalized_roadmap(db, profile, target_role)

    # Archive prior active plans for the EXACT same role, preserve plans for other roles as 'saved'
    prior_plans = db.query(ProfessionalCareerPlan).filter_by(user_id=user.id, status="active").all()
    for pp in prior_plans:
        if pp.target_role.lower() == target_role.lower():
            pp.status = "archived"
        else:
            pp.status = "saved"

    plan = ProfessionalCareerPlan(
        user_id=user.id,
        target_role=target_role,
        target_industry=profile.target_industry or profile.current_industry,
        status="active",
        match_score=roadmap_result["match_score"],
        skill_gaps_summary=roadmap_result["gap_analysis"],
        ai_analysis=profile.profile_summary,
        timeline_estimate=roadmap_result["timeline_estimate"],
        checklist_items=roadmap_result["checklist"],
    )
    db.add(plan)
    db.flush()

    for s in roadmap_result["steps"]:
        step = ProfessionalPlanStep(
            plan_id=plan.id,
            stage_name=s["stage_name"],
            order_index=s["order_index"],
            title=s["title"],
            explanation=s["explanation"],
            related_skill=s.get("related_skill"),
            priority=s.get("priority", "Medium"),
            estimated_duration=s.get("estimated_duration"),
            estimated_hours=s.get("estimated_hours", 10),
            resource_title=s.get("resource_title"),
            resource_url=s.get("resource_url"),
            resource_provider=s.get("resource_provider"),
            resource_cost=s.get("resource_cost"),
            practical_task=s.get("practical_task"),
            completion_status="not_started",
        )
        db.add(step)

    # Also update profile's target role
    profile.target_role = target_role
    db.commit()
    db.refresh(plan)

    return get_plan_details(plan.id, db, user)


@router.post("/plans/{plan_id}/activate")
def activate_career_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Set a specific saved plan as active without losing other saved plans."""
    target_plan = db.query(ProfessionalCareerPlan).filter_by(id=plan_id, user_id=user.id).first()
    if not target_plan:
        raise HTTPException(status_code=404, detail="Career plan not found.")

    all_user_plans = db.query(ProfessionalCareerPlan).filter_by(user_id=user.id).all()
    for p in all_user_plans:
        if p.id == plan_id:
            p.status = "active"
        elif p.status == "active":
            p.status = "saved"

    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if profile:
        profile.target_role = target_plan.target_role

    db.commit()
    db.refresh(target_plan)
    return get_plan_details(target_plan.id, db, user)


@router.get("/plans")
def list_career_plans(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """List all saved career plans for the current user."""
    plans = (
        db.query(ProfessionalCareerPlan)
        .filter_by(user_id=user.id)
        .order_by(ProfessionalCareerPlan.created_at.desc())
        .all()
    )
    results = []
    for p in plans:
        total_steps = len(p.steps)
        completed_steps = len([s for s in p.steps if s.completion_status == "completed"])
        progress_pct = round((completed_steps / total_steps * 100)) if total_steps > 0 else 0
        results.append({
            "id": p.id,
            "target_role": p.target_role,
            "target_industry": p.target_industry,
            "status": p.status,
            "match_score": p.match_score,
            "timeline_estimate": p.timeline_estimate,
            "total_steps": total_steps,
            "completed_steps": completed_steps,
            "progress_pct": progress_pct,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "updated_at": p.updated_at.isoformat() if p.updated_at else None,
        })
    return results


@router.get("/plans/{plan_id}")
def get_plan_details(
    plan_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Retrieve full details of a specific plan, including all steps and progress."""
    plan = db.query(ProfessionalCareerPlan).filter_by(id=plan_id, user_id=user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Career plan not found.")

    steps_data = []
    for s in plan.steps:
        steps_data.append({
            "id": s.id,
            "stage_name": s.stage_name,
            "order_index": s.order_index,
            "title": s.title,
            "explanation": s.explanation,
            "related_skill": s.related_skill,
            "priority": s.priority,
            "estimated_duration": s.estimated_duration,
            "estimated_hours": s.estimated_hours,
            "resource_title": s.resource_title,
            "resource_url": s.resource_url,
            "resource_provider": s.resource_provider,
            "resource_cost": s.resource_cost,
            "practical_task": s.practical_task,
            "completion_status": s.completion_status,
            "user_notes": s.user_notes,
            "completed_at": s.completed_at.isoformat() if s.completed_at else None,
        })

    total_steps = len(steps_data)
    completed_steps = len([s for s in steps_data if s["completion_status"] == "completed"])
    progress_pct = round((completed_steps / total_steps * 100)) if total_steps > 0 else 0

    return {
        "id": plan.id,
        "target_role": plan.target_role,
        "target_industry": plan.target_industry,
        "status": plan.status,
        "match_score": plan.match_score,
        "timeline_estimate": plan.timeline_estimate,
        "ai_analysis": plan.ai_analysis,
        "skill_gaps_summary": plan.skill_gaps_summary,
        "checklist_items": plan.checklist_items or [],
        "total_steps": total_steps,
        "completed_steps": completed_steps,
        "progress_pct": progress_pct,
        "steps": steps_data,
        "created_at": plan.created_at.isoformat() if plan.created_at else None,
        "updated_at": plan.updated_at.isoformat() if plan.updated_at else None,
    }


@router.patch("/plans/{plan_id}/steps/{step_id}")
def update_step_progress(
    plan_id: int,
    step_id: int,
    payload: StepUpdateRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Update step completion status and personal notes."""
    plan = db.query(ProfessionalCareerPlan).filter_by(id=plan_id, user_id=user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Career plan not found.")

    step = db.query(ProfessionalPlanStep).filter_by(id=step_id, plan_id=plan.id).first()
    if not step:
        raise HTTPException(status_code=404, detail="Roadmap step not found.")

    if payload.completion_status is not None:
        valid_statuses = ["not_started", "in_progress", "completed"]
        if payload.completion_status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")
        step.completion_status = payload.completion_status
        if payload.completion_status == "completed":
            step.completed_at = datetime.utcnow()
        else:
            step.completed_at = None

    if payload.user_notes is not None:
        step.user_notes = payload.user_notes

    plan.updated_at = datetime.utcnow()
    db.commit()

    return {
        "message": "Step updated successfully.",
        "step_id": step.id,
        "completion_status": step.completion_status,
        "user_notes": step.user_notes,
    }


@router.patch("/plans/{plan_id}/checklist")
def update_plan_checklist(
    plan_id: int,
    payload: ChecklistUpdateRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Update transition checklist item completion statuses."""
    plan = db.query(ProfessionalCareerPlan).filter_by(id=plan_id, user_id=user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Career plan not found.")

    plan.checklist_items = payload.checklist_items
    plan.updated_at = datetime.utcnow()
    db.commit()

    return {"message": "Checklist updated.", "checklist_items": plan.checklist_items}


@router.get("/resources")
def get_learning_resources(
    skill: Optional[str] = None,
    cost_type: Optional[str] = None,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Retrieve verified learning resources, optionally filtered by skill or cost."""
    seed_professional_dataset(db)
    query = db.query(ProfessionalLearningResource)
    if skill:
        query = query.filter(ProfessionalLearningResource.related_skill.ilike(f"%{skill}%"))
    if cost_type:
        query = query.filter(ProfessionalLearningResource.cost_type.ilike(f"%{cost_type}%"))
    resources = query.all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "provider": r.provider,
            "related_skill": r.related_skill,
            "description": r.description,
            "cost_type": r.cost_type,
            "resource_type": r.resource_type,
            "url": r.url,
            "is_verified": r.is_verified,
            "last_verified": r.last_verified,
        }
        for r in resources
    ]


@router.post("/assistant")
def query_ai_career_assistant(
    payload: AssistantQueryRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Contextual AI Guidance Assistant for working professionals."""
    profile = db.query(ProfessionalProfile).filter_by(user_id=user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Please complete your professional profile first.")

    active_plan = None
    if payload.plan_id:
        active_plan = db.query(ProfessionalCareerPlan).filter_by(id=payload.plan_id, user_id=user.id).first()
    if not active_plan:
        active_plan = (
            db.query(ProfessionalCareerPlan)
            .filter_by(user_id=user.id, status="active")
            .order_by(ProfessionalCareerPlan.created_at.desc())
            .first()
        )

    return answer_ai_assistant_query(db, profile, payload.query, active_plan)


@router.post("/profile/parse-natural-language")
def parse_natural_language_profile_endpoint(
    payload: NaturalLanguageProfileRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Extracts structured professional profile data from free-form natural language text.
    Preserves unique user skills, identifies multiple roles, and highlights transferable evidence.
    """
    extracted = parse_natural_language_profile(payload.profile_text)
    # Also attach profile field aliases for seamless client consumption
    extracted["current_skills"] = extracted.get("skills_extracted", [])
    extracted["current_job_title"] = extracted.get("roles_mentioned", [None])[0] if extracted.get("roles_mentioned") else None
    extracted["target_role"] = extracted.get("target_role_intent")
    return {
        "status": "success",
        "extracted_profile": extracted,
        "raw_text": payload.profile_text,
    }


@router.get("/guidance-requests")
def list_guidance_requests(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Lists career guidance requests logged for unsupported or emerging careers."""
    records = (
        db.query(GuidanceRequestRecord)
        .filter_by(user_id=user.id)
        .order_by(GuidanceRequestRecord.created_at.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "request_id": r.request_id,
            "career_topic": r.career_topic,
            "category": r.category,
            "reason": r.reason,
            "status": r.status,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in records
    ]


@router.post("/guidance-requests", response_model=GuidanceRequestResponse)
def submit_guidance_request(
    payload: GuidanceRequestCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Submit a guidance request for unsupported or unverified career topics."""
    req_id = f"REQ-{uuid.uuid4().hex[:8].upper()}"
    rec = GuidanceRequestRecord(
        request_id=req_id,
        user_id=user.id,
        career_topic=payload.career_topic,
        category=payload.category,
        user_context=payload.user_context or {},
        reason=payload.reason or f"User requested guidance for career topic '{payload.career_topic}'.",
        status="pending_review",
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return GuidanceRequestResponse(
        id=rec.id,
        request_id=rec.request_id,
        career_topic=rec.career_topic,
        category=rec.category,
        reason=rec.reason,
        status=rec.status,
        created_at=rec.created_at.isoformat() if rec.created_at else None,
    )
