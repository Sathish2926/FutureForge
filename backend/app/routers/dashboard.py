# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, recommendation
from app.database import get_db
from app.auth import get_current_user
from app.services.profile_completion import compute_profile_completion

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
def get_dashboard(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    profile = user.profile
    completion = compute_profile_completion(db, user)
    pct = completion["completeness_percent"]
    missing = completion["missing_sections"]

    primary_goal = next((g for g in user.career_goals if g.is_primary and g.status == "active"), None)

    top_matches = []
    careers = db.query(models.Career).all()
    for career in careers:
        result = recommendation.score_career(db, user, career)
        top_matches.append({"career_name": career.name, "career_slug": career.slug, "match_score": result["score"]})
    top_matches.sort(key=lambda m: m["match_score"], reverse=True)
    top_matches = top_matches[:5]

    active_roadmap = db.query(models.Roadmap).filter_by(user_id=user.id, is_active=True).first()
    next_actions = []
    if active_roadmap:
        pending = [s for s in active_roadmap.steps if not s.progress or s.progress.status != "completed"]
        next_actions = [{"title": s.title, "stage": s.stage} for s in pending[:3]]
    elif top_matches:
        next_actions = [{"title": f"Explore the roadmap for {top_matches[0]['career_name']}", "stage": "Getting started"}]
    if pct < 100:
        next_actions.append({"title": f"Complete your profile ({', '.join(missing[:2])})", "stage": "Profile"})

    saved_colleges = [{"id": sc.college.id, "name": sc.college.name} for sc in user.saved_colleges]
    saved_scholarships = [{"id": ss.scholarship.id, "name": ss.scholarship.name} for ss in user.saved_scholarships]

    upcoming_deadlines = []
    for s in db.query(models.Scholarship).all():
        if s.application_close_date:
            upcoming_deadlines.append({"scholarship": s.name, "closes": s.application_close_date})

    recent_conversations = [{"id": c.id, "title": c.title} for c in user.conversations[-3:]]

    return {
        "greeting_name": profile.name if profile else None,
        "profile_completeness_percent": pct,
        "education_stage": profile.education_stage if profile else None,
        "primary_career_goal": primary_goal.career.name if primary_goal else None,
        "top_career_matches": top_matches,
        "active_roadmap_completion_percent": (
            round(100 * sum(1 for s in active_roadmap.steps if s.progress and s.progress.status == "completed") / len(active_roadmap.steps))
            if active_roadmap and active_roadmap.steps else 0
        ),
        "next_actions": next_actions[:3],
        "saved_colleges": saved_colleges,
        "saved_scholarships": saved_scholarships,
        "upcoming_deadlines": upcoming_deadlines[:5],
        "recent_ai_conversations": recent_conversations,
    }
