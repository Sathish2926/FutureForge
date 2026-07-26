from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.college import College, CollegeCourse, SavedCollege
from app.models.exam import EntranceExam, ExamCareerLink
from app.models.certification import Certification, CertificationCareerLink
from app.models.scholarship import Scholarship
from app.schemas.education import (
    CollegeMatchResponse, CollegeDetailResponse, MatchResponse,
    EntranceExamDetail, CertificationBase
)

router = APIRouter(prefix="/education", tags=["education"])

@router.get("/colleges/match", response_model=List[CollegeMatchResponse])
def get_college_matches(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Engine to match user with colleges based on Career DNA & Preferences."""
    colleges = db.query(College).limit(5).all()
    results = []
    
    for col in colleges:
        # Mock calculation logic
        results.append(CollegeMatchResponse(
            college=col,
            match=MatchResponse(match_percentage=85.5, suitability_score=8.5, confidence="High"),
            top_courses=[c for c in col.courses][:2]
        ))
        
    return results

@router.get("/colleges/{college_id}", response_model=CollegeDetailResponse)
def get_college_details(college_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    college = db.query(College).filter(College.id == college_id).first()
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
        
    is_saved = db.query(SavedCollege).filter(SavedCollege.college_id == college_id, SavedCollege.user_id == current_user.id).first() is not None
    
    return CollegeDetailResponse(
        **college.__dict__,
        courses=college.courses,
        is_saved=is_saved
    )

@router.get("/exams/career/{career_id}", response_model=List[EntranceExamDetail])
def get_exams_for_career(career_id: int, db: Session = Depends(get_db)):
    links = db.query(ExamCareerLink).filter(ExamCareerLink.career_id == career_id).all()
    return [link.exam for link in links if link.exam]

@router.get("/certifications/career/{career_id}", response_model=List[CertificationBase])
def get_certifications_for_career(career_id: int, db: Session = Depends(get_db)):
    links = db.query(CertificationCareerLink).filter(CertificationCareerLink.career_id == career_id).all()
    return [link.certification for link in links if link.certification]
