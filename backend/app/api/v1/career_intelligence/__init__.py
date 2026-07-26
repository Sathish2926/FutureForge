from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.career import Career, CareerDetail, CareerInsight, CareerTimeline, CareerLearningResource, CareerBookmark, CareerSkill
from app.models.profile import Profile
from app.schemas.career_intelligence import CareerIntelligenceResponse, MatchAnalysisResponse, CareerSkillGapBase

router = APIRouter(prefix="/career-intelligence", tags=["career_intelligence"])

@router.get("/careers/{career_id}", response_model=CareerIntelligenceResponse)
def get_career_details(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    career = db.query(Career).filter(Career.id == career_id).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    bookmark = db.query(CareerBookmark).filter(
        CareerBookmark.career_id == career_id, 
        CareerBookmark.user_id == current_user.id
    ).first()

    return {
        "career": career,
        "detail": career.detail,
        "insight": career.insight,
        "timeline": career.timeline,
        "learning_resources": career.learning_resources,
        "is_bookmarked": bookmark is not None
    }

@router.get("/careers/{career_id}/match-analysis", response_model=MatchAnalysisResponse)
def get_match_analysis(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    career = db.query(Career).filter(Career.id == career_id).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    # In production, evaluate real metrics against CareerDNA
    # For now, generate deterministic mock metrics
    return {
        "overall_match": 88.5,
        "skill_match": 75.0,
        "interest_match": 90.0,
        "personality_match": 85.0,
        "goal_match": 95.0,
        "budget_match": 100.0,
        "location_match": 100.0
    }

@router.get("/careers/{career_id}/skill-gap", response_model=List[CareerSkillGapBase])
def get_skill_gap(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    career = db.query(Career).filter(Career.id == career_id).first()
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    user_skills = profile.skills if profile and profile.skills else []
    user_skills_lower = [s.lower() for s in user_skills]

    gaps = []
    
    # Check if career has specific skills, if not we mock it for demo
    skills = career.skills
    if not skills:
        mock_skills = [
            {"name": "Python", "importance": 0.9, "diff": "Medium", "time": "3 months"},
            {"name": "Machine Learning", "importance": 0.95, "diff": "High", "time": "6 months"},
            {"name": "Communication", "importance": 0.6, "diff": "Low", "time": "Ongoing"}
        ]
        for ms in mock_skills:
            gaps.append(
                CareerSkillGapBase(
                    skill_name=ms["name"],
                    importance=ms["importance"],
                    difficulty=ms["diff"],
                    estimated_learning_time=ms["time"],
                    user_has_skill=ms["name"].lower() in user_skills_lower
                )
            )
    else:
        for sk in skills:
            gaps.append(
                CareerSkillGapBase(
                    skill_name=sk.skill_name,
                    importance=sk.importance,
                    difficulty=sk.difficulty or "Medium",
                    estimated_learning_time=sk.estimated_learning_time or "3 months",
                    user_has_skill=sk.skill_name.lower() in user_skills_lower
                )
            )
            
    return gaps

@router.post("/bookmarks/{career_id}")
def toggle_bookmark(
    career_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    bookmark = db.query(CareerBookmark).filter(
        CareerBookmark.career_id == career_id,
        CareerBookmark.user_id == current_user.id
    ).first()

    if bookmark:
        db.delete(bookmark)
        db.commit()
        return {"status": "removed"}
    else:
        new_bm = CareerBookmark(user_id=current_user.id, career_id=career_id, is_liked=1)
        db.add(new_bm)
        db.commit()
        return {"status": "added"}
