from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies.auth import get_db, verify_token
from app.models import User
from app.models.profile import Profile, CareerDNA
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/auth", tags=["auth"])

class RegistrationData(BaseModel):
    user_type: str
    education_level: str
    occupation: str
    dob: str
    gender: str
    state: str
    district: str
    community: str
    family_income: float
    languages: List[str]
    current_course: str
    college: str
    career_goal: str

@router.post("/register")
def register_user(
    data: RegistrationData,
    db: Session = Depends(get_db),
    decoded_token: dict = Depends(verify_token)
):
    """
    Transactional Signup: Creates User, Profile, and CareerDNA in a single transaction.
    If it fails, it rolls back everything.
    """
    
    firebase_uid = decoded_token.get("uid")
    email = decoded_token.get("email")
    
    try:
        # 1. Create User
        user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
        if not user:
            user = User(
                firebase_uid=firebase_uid,
                email=email,
                full_name=decoded_token.get("name", "")
            )
            db.add(user)
            db.flush() # flush to get user.id for Profile/CareerDNA
            
        # 2. Create Profile
        profile = db.query(Profile).filter(Profile.user_id == user.id).first()
        if not profile:
            profile = Profile(user_id=user.id)
            db.add(profile)
            
        # Set profile data
        profile.education_level = data.education_level
        profile.occupation = data.occupation
        profile.dob = data.dob
        profile.gender = data.gender
        profile.state = data.state
        profile.district = data.district
        profile.community = data.community
        profile.family_income = data.family_income
        profile.languages = data.languages
        profile.current_course = data.current_course
        profile.college = data.college
        profile.career_goal = data.career_goal
        
        # 3. Create CareerDNA
        cdna = db.query(CareerDNA).filter(CareerDNA.user_id == user.id).first()
        if not cdna:
            cdna = CareerDNA(user_id=user.id)
            db.add(cdna)
            
        # Set CareerDNA data
        cdna.user_type = data.user_type
        cdna.completion_percentage = 20
        cdna.last_completed_step = 2
        
        db.commit()
        return {"status": "success", "message": "User initialized transactionally."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")
