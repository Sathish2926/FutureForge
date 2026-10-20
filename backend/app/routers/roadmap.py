from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user, get_current_user_optional
from app.services.career_resolver import build_roadmap_steps_for_career, resolve_or_create_career
from app.services.roadmap_engine import (
    check_ambiguity,
    resolve_semantic_cluster,
    CURATED_SEED_TEMPLATES,
    validate_roadmap_quality,
    generate_gemini_roadmap_structure,
    verify_acyclic_dag,
    normalize_and_map_skills,
    compute_skill_gap,
    calculate_confidence_score,
    evaluate_step_assessment,
)

router = APIRouter(prefix="/api/roadmaps", tags=["roadmaps"])


def _current_stage_key(education_stage: str | None) -> str:
    return education_stage if education_stage in {"class10", "class12", "diploma", "ug", "pg", "phd", "professional", "no_degree"} else "default"


def _completion(roadmap: models.Roadmap) -> int:
    if not roadmap.steps:
        return 0
    done = sum(1 for s in roadmap.steps if (s.progress and s.progress.status == "completed") or s.is_skipped)
    return round(100 * done / len(roadmap.steps))


def _serialize_roadmap(roadmap: models.Roadmap, current_stage_key: str) -> dict:
    template_steps = build_roadmap_steps_for_career(roadmap.career, current_stage_key) if roadmap.career else []

    # Determine provenance label cleanly
    if roadmap.confidence_score and roadmap.confidence_score >= 0.95:
        provenance_label = "Curated Seed Pathway"
    elif roadmap.career and not roadmap.career.is_user_generated:
        provenance_label = "Curated Seed Pathway"
    elif roadmap.confidence_score and roadmap.confidence_score >= 0.88:
        provenance_label = "AI-Synthesized Path"
    else:
        provenance_label = "Sector Template Fallback"

    serialized_steps = []
    for index, stored_step in enumerate(roadmap.steps):
        template_step = template_steps[index] if index < len(template_steps) else {}
        stage_key = stored_step.stage_key or template_step.get("stage_key") or current_stage_key
        stage_label = stored_step.stage or template_step.get("stage_label") or "Milestone"

        # Serialize resources
        res_list = [
            {
                "id": r.id,
                "title": r.title,
                "url": r.url,
                "resource_type": r.resource_type,
                "estimated_minutes": r.estimated_minutes,
            }
            for r in (stored_step.resources or [])
        ]
        if not res_list and template_step.get("resources"):
            res_list = [
                {
                    "id": i + 1,
                    "title": str(res),
                    "url": None,
                    "resource_type": "article",
                    "estimated_minutes": 15,
                }
                for i, res in enumerate(template_step.get("resources", []))
            ]

        # Serialize tasks
        task_list = [
            {
                "id": t.id,
                "title": t.title,
                "is_completed": t.is_completed or stored_step.is_skipped,
                "task_type": t.task_type,
            }
            for t in (stored_step.tasks or [])
        ]
        if not task_list and template_step.get("actions"):
            task_list = [
                {
                    "id": i + 1,
                    "title": str(act),
                    "is_completed": stored_step.is_skipped,
                    "task_type": "action",
                }
                for i, act in enumerate(template_step.get("actions", []))
            ]

        serialized_steps.append({
            "id": stored_step.id,
            "order_index": stored_step.order_index,
            "stage": stage_label,
            "stage_key": stage_key,
            "goal": stored_step.title,
            "title": stored_step.title,
            "description": stored_step.description,
            "why": stored_step.why,
            "estimated_time": stored_step.estimated_time or template_step.get("estimated_time", "2 weeks"),
            "skill_name": stored_step.skill_name,
            "is_skipped": stored_step.is_skipped,
            "skip_reason": stored_step.skip_reason,
            "prerequisites": template_step.get("prerequisites", []),
            "actions": [t["title"] for t in task_list],
            "resources": res_list,
            "tasks": task_list,
            "is_current_stage": current_stage_key != "default" and stage_key == current_stage_key,
            "status": stored_step.progress.status if stored_step.progress else ("completed" if stored_step.is_skipped else "not_started"),
        })

    return {
        "id": roadmap.id,
        "career_name": roadmap.career.name if roadmap.career else "Goal Pathway",
        "career_slug": roadmap.career.slug if roadmap.career else None,
        "sector": roadmap.career.sector if roadmap.career else "General",
        "version": roadmap.version,
        "provenance_label": provenance_label,
        "is_user_generated": roadmap.career.is_user_generated if roadmap.career else True,
        "needs_verification": roadmap.career.needs_verification if roadmap.career else True,
        "is_ambiguous": roadmap.is_ambiguous,
        "clarification_reason": roadmap.clarification_reason,
        "clarification_suggestions": roadmap.clarification_suggestions_json or [],
        "confidence_score": roadmap.confidence_score or 1.0,
        "skill_gap_summary": roadmap.skill_gap_summary_json or {"known": [], "gaps": []},
        "completion_percent": _completion(roadmap),
        "steps": serialized_steps,
    }


@router.post("")
def generate_roadmap(
    payload: schemas.RoadmapRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Generates a high-depth, validated roadmap.
    1. Checks ambiguity -> explicit clarification state if broad/vague or invalid.
    2. Uses semantic cluster resolver to match inputs like "Doctor" -> "mbbs-physician".
    3. Serves high-depth curated seeds for known clusters, or constrained Gemini generation.
    4. Runs mandatory Quality Gate validation.
    5. Calculates skill gaps and dynamic confidence scores.
    """
    goal_text = payload.goal_text or (payload.career_slug.replace("-", " ") if payload.career_slug else "")
    if not goal_text and not payload.career_slug:
        raise HTTPException(status_code=400, detail="Provide either career_slug or goal_text")

    # Step 1: Check Ambiguity
    is_ambiguous, reason, suggestions, class_type = check_ambiguity(goal_text)
    if is_ambiguous:
        career = resolve_or_create_career(db, goal_text)
        roadmap = models.Roadmap(
            user_id=user.id,
            career_id=career.id,
            version=1,
            is_active=True,
            is_ambiguous=True,
            clarification_reason=reason,
            clarification_suggestions_json=suggestions,
            confidence_score=0.0,
        )
        db.add(roadmap)
        db.commit()
        db.refresh(roadmap)

        log = models.RoadmapGenerationLog(
            user_id=user.id,
            goal_text=goal_text,
            is_ambiguous=True,
            confidence_score=0.0,
            validation_passed=False,
            error_details="Goal destination is ambiguous."
        )
        db.add(log)
        db.commit()

        return _serialize_roadmap(roadmap, "default")

    # Step 2: Resolve Career & Semantic Cluster
    cluster_key = resolve_semantic_cluster(goal_text)
    career = db.query(models.Career).filter_by(slug=payload.career_slug).first() if payload.career_slug else None
    if not career:
        career = resolve_or_create_career(db, goal_text)

    user_stage = user.profile.education_stage if user.profile else "ug"
    current_stage_key = _current_stage_key(user_stage)

    raw_steps = []
    required_skills = []
    provenance = "Sector Template Fallback"

    # Step 3: Check Deep Curated Seed Templates
    if cluster_key and cluster_key in CURATED_SEED_TEMPLATES:
        seed = CURATED_SEED_TEMPLATES[cluster_key]
        provenance = "Curated Seed Pathway"
        career.name = seed["career_name"]
        career.sector = seed["sector"]
        career.is_user_generated = False
        career.needs_verification = False
        required_skills = seed["required_skills"]
        for s in seed["steps"]:
            raw_steps.append({
                "stage_key": s["stage_key"],
                "stage_label": s["stage_label"],
                "goal": s["title"],
                "why": s["why"],
                "skill_name": s["skill_name"],
                "prerequisites": s["prerequisites"],
                "actions": s["actions"],
                "resources": s["resources"],
                "estimated_time": s["estimated_time"],
            })
    else:
        # Try Gemini structured AI generation
        gemini_out = generate_gemini_roadmap_structure(goal_text, user_stage)
        if gemini_out and not gemini_out.is_ambiguous and gemini_out.steps:
            candidate_steps = []
            cand_skills = gemini_out.required_skills
            for step_data in gemini_out.steps:
                candidate_steps.append({
                    "stage_key": step_data.stage_key,
                    "stage_label": step_data.stage_key.replace("_", " ").title(),
                    "goal": step_data.title,
                    "why": step_data.why,
                    "skill_name": step_data.skill_name,
                    "prerequisites": step_data.prerequisites,
                    "actions": step_data.actions,
                    "resources": step_data.resources,
                    "estimated_time": step_data.estimated_time,
                })
            
            # Quality Gate check on Gemini candidate
            passed, reasons, metrics = validate_roadmap_quality({"steps": candidate_steps})
            if passed:
                provenance = "AI-Synthesized Path"
                raw_steps = candidate_steps
                required_skills = cand_skills

    # Fallback to deterministic sector templates if raw_steps is still empty
    if not raw_steps:
        provenance = "Sector Template Fallback"
        template_steps = build_roadmap_steps_for_career(career, current_stage_key)
        for ts in template_steps:
            raw_steps.append({
                "stage_key": ts.get("stage_key", current_stage_key),
                "stage_label": ts.get("stage_label", "Stage"),
                "goal": ts.get("goal", ts.get("title", "Milestone")),
                "why": ts.get("why", "Key milestone for career progression"),
                "skill_name": ts.get("goal", "Core Skill"),
                "prerequisites": ts.get("prerequisites", []),
                "actions": ts.get("actions", []),
                "resources": ts.get("resources", []),
                "estimated_time": ts.get("estimated_time", "2 weeks"),
            })
            required_skills.append(ts.get("goal", "Core Skill"))

    # Personalization Adaptivity for Class 10 / No Degree
    if user_stage in {"class10", "no_degree"} and raw_steps:
        if raw_steps[0]["stage_key"] in {"ug", "class12"}:
            raw_steps[0]["stage_label"] = "Alternative Pathway: Certifications & Bootcamps"
            raw_steps[0]["why"] = "For learners without formal degree credentials, industry certifications and intensive bootcamps offer direct alternative entry routes."
            if raw_steps[0].get("actions"):
                raw_steps[0]["actions"][0] = "Enroll in Google / Meta Professional Certificate or coding bootcamp (freeCodeCamp / Coursera)."

    # Step 4: Quality Gate & DAG Verification
    passed_gate, gate_reasons, quality_metrics = validate_roadmap_quality({"steps": raw_steps})
    normalize_and_map_skills(db, required_skills)
    sanitized_steps = verify_acyclic_dag(raw_steps)

    # Step 5: Personalization & Skill-Gap Analysis
    skill_gap_summary = compute_skill_gap(db, user, required_skills)
    user_known_names = {k["skill"].lower() for k in skill_gap_summary.get("known", [])}

    # Deactivate previous active roadmap for this specific career or target selection
    existing = db.query(models.Roadmap).filter_by(user_id=user.id, career_id=career.id, is_active=True).first()
    version = 1
    if existing:
        existing.is_active = False
        version = existing.version + 1
    else:
        # If payload specifies a selected item or target change, deactivate existing active roadmaps
        if payload.selected_item_id or payload.recommendation_id:
            active_any = db.query(models.Roadmap).filter_by(user_id=user.id, is_active=True).all()
            for r_act in active_any:
                r_act.is_active = False
        
        highest_ever = db.query(models.Roadmap).filter_by(user_id=user.id).order_by(models.Roadmap.version.desc()).first()
        if highest_ever:
            version = highest_ever.version + 1

    confidence = calculate_confidence_score(provenance, quality_metrics)

    roadmap = models.Roadmap(
        user_id=user.id,
        career_id=career.id,
        version=version,
        is_active=True,
        confidence_score=confidence,
        skill_gap_summary_json=skill_gap_summary,
        is_ambiguous=False,
    )
    db.add(roadmap)
    db.flush()

    for idx, s in enumerate(sanitized_steps):
        s_skill = s.get("skill_name") or s.get("goal")
        
        # Check if step should be skipped due to skill mastery or advanced user PhD degree
        is_skipped = bool(s_skill and s_skill.lower() in user_known_names)
        skip_reason = f"Skipped: Skill '{s_skill}' already mastered in user profile" if is_skipped else None

        if not is_skipped and user_stage in {"phd", "pg"} and s.get("stage_key") in {"class10", "class12"}:
            is_skipped = True
            skip_reason = f"Skipped: User possesses advanced academic qualification ({user_stage.upper()})"

        rs = models.RoadmapStep(
            roadmap_id=roadmap.id,
            order_index=idx,
            stage=s.get("stage_label", "Stage"),
            stage_key=s.get("stage_key", "ug"),
            title=s.get("goal"),
            description="; ".join(s.get("actions", [])) or s.get("goal"),
            why=s.get("why"),
            estimated_time=s.get("estimated_time", "2 weeks"),
            skill_name=s_skill,
            is_skipped=is_skipped,
            skip_reason=skip_reason,
        )
        db.add(rs)
        db.flush()

        initial_status = "completed" if is_skipped else "not_started"
        db.add(models.RoadmapProgress(step_id=rs.id, status=initial_status))

        for act in s.get("actions", []):
            db.add(models.RoadmapTask(step_id=rs.id, title=act, is_completed=is_skipped, task_type="action"))

        for res in s.get("resources", []):
            if isinstance(res, dict):
                db.add(models.LearningResource(
                    step_id=rs.id,
                    title=res.get("title", ""),
                    url=res.get("url"),
                    resource_type=res.get("resource_type", "article"),
                    estimated_minutes=res.get("estimated_minutes", 15)
                ))
            else:
                db.add(models.LearningResource(step_id=rs.id, title=str(res), resource_type="article", estimated_minutes=15))

    db.commit()
    db.refresh(roadmap)

    log = models.RoadmapGenerationLog(
        user_id=user.id,
        goal_text=goal_text,
        is_ambiguous=False,
        confidence_score=confidence,
        validation_passed=passed_gate,
        error_details="; ".join(gate_reasons) if not passed_gate else None
    )
    db.add(log)
    db.commit()

    return _serialize_roadmap(roadmap, current_stage_key)


@router.get("/premade")
def get_premade_roadmaps(db: Session = Depends(get_db)):
    """
    Returns seeded pre-made careers from the database so the roadmap search
    only shows available, verified careers.
    """
    careers = db.query(models.Career).filter(
        models.Career.is_user_generated == False
    ).order_by(models.Career.name).all()

    return [
        {
            "id": c.id,
            "slug": c.slug,
            "name": c.name,
            "sector": c.sector,
            "description": c.description,
            "recommended_subjects": c.recommended_subjects,
            "skill_building_timeline": c.skill_building_timeline,
            "typical_progression": c.typical_progression,
            "skills": [cs.skill.name for cs in c.skill_links if cs.skill] if c.skill_links else []
        }
        for c in careers
    ]


@router.post("/request-new")
def submit_roadmap_request(
    payload: schemas.RoadmapRequestSubmissionCreate,
    db: Session = Depends(get_db),
    user: Optional[models.User] = Depends(get_current_user_optional),
):
    """
    Records a user request when their required roadmap is not in the system.
    "your required roadmap not here, send it to us we well add it definitely."
    """
    if not payload.career_name or not payload.career_name.strip():
        raise HTTPException(status_code=400, detail="Career name is required")

    submission = models.RoadmapRequestSubmission(
        user_id=user.id if user else None,
        career_name=payload.career_name.strip(),
        notes=payload.notes.strip() if payload.notes else None,
        user_email=payload.user_email.strip() if payload.user_email else (user.email if user else None),
        status="pending",
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return {
        "status": "success",
        "message": "your required roadmap not here, send it to us we well add it definitely.",
        "id": submission.id,
        "career_name": submission.career_name,
    }


@router.get("")
def list_roadmaps(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    """Returns all active roadmaps for user with full serialized steps and progress."""
    roadmaps = db.query(models.Roadmap).filter_by(user_id=user.id, is_active=True).order_by(models.Roadmap.created_at.desc()).all()
    current_stage_key = _current_stage_key(user.profile.education_stage if user.profile else None)
    return [_serialize_roadmap(r, current_stage_key) for r in roadmaps]



@router.post("/assessments/submit")
@router.post("/steps/{step_id}/assess")
def submit_step_assessment(
    payload: Dict[str, Any],
    step_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Submits answers for interactive step skill assessment and unlocks progression."""
    target_id = step_id or payload.get("step_id")
    if not target_id:
        raise HTTPException(status_code=400, detail="step_id is required")
    step = db.query(models.RoadmapStep).filter_by(id=target_id).first()
    if not step:
        raise HTTPException(status_code=404, detail="Roadmap step not found")
    
    result = evaluate_step_assessment(db, user, step, payload.get("answers", {}))
    return result


@router.post("/progress")
def update_roadmap_step_progress(
    payload: Dict[str, Any],
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Updates progress status for a roadmap step."""
    step_id = payload.get("step_id")
    status = payload.get("status", "in_progress")
    step = db.query(models.RoadmapStep).filter_by(id=step_id).first()
    if not step:
        raise HTTPException(status_code=404, detail="Roadmap step not found")
    
    if not step.progress:
        step.progress = models.RoadmapProgress(step_id=step.id)
    
    step.progress.status = status
    db.commit()
    db.refresh(step.progress)
    return {"step_id": step.id, "status": step.progress.status}


@router.delete("/{roadmap_id}")
def delete_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Deletes/deactivates a user's roadmap."""
    roadmap = db.query(models.Roadmap).filter_by(id=roadmap_id, user_id=user.id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    roadmap.is_active = False
    
    # Also archive associated active career goal if linked
    if roadmap.career_id:
        goal = db.query(models.CareerGoal).filter_by(user_id=user.id, career_id=roadmap.career_id, status="active").first()
        if goal:
            goal.status = "archived"
            goal.is_primary = False
            
    db.commit()
    return {"status": "deleted", "id": roadmap_id}

