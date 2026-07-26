from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.profile import CareerDNA, CareerDNAAcademic, CareerDNAPersonality, Profile
from app.schemas.career_dna import CareerDNAResponse, StepSaveRequest

router = APIRouter(prefix="/career-dna", tags=["career_dna"])

@router.post("/start", response_model=CareerDNAResponse)
def start_career_dna(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Initialize or fetch existing Career DNA progress."""
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == current_user.id).first()
    if not cdna:
        cdna = CareerDNA(
            user_id=current_user.id,
            completion_percentage=0,
            last_completed_step=1
        )
        db.add(cdna)
        db.commit()
        db.refresh(cdna)
    return cdna

@router.get("/progress", response_model=CareerDNAResponse)
def get_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == current_user.id).first()
    if not cdna:
        raise HTTPException(status_code=404, detail="Career DNA not started.")
    return cdna

@router.put("/step/{step_id}")
def save_step(
    step_id: int,
    payload: StepSaveRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == current_user.id).first()
    if not cdna:
        raise HTTPException(status_code=404, detail="Career DNA not found.")

    data = payload.data
    
    if step_id == 2:
        cdna.user_type = data.get("user_type")
    
    elif step_id == 3:
        if not cdna.academic:
            cdna.academic = CareerDNAAcademic()
        for key, value in data.items():
            if hasattr(cdna.academic, key):
                setattr(cdna.academic, key, value)
                
    elif step_id == 4:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if not profile:
            profile = Profile(user_id=current_user.id)
            db.add(profile)
        profile.skills = data.get("skills", [])
        
    elif step_id == 5:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile:
            profile.interests = data.get("interests", [])
            
    elif step_id == 6:
        # Personality
        # Clear existing
        db.query(CareerDNAPersonality).filter(CareerDNAPersonality.career_dna_id == cdna.id).delete()
        answers = data.get("answers", [])
        for ans in answers:
            db.add(CareerDNAPersonality(
                career_dna_id=cdna.id,
                scenario_key=ans.get("scenario_key"),
                selected_option=ans.get("selected_option")
            ))
            
    elif step_id == 7:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile:
            profile.learning_style = data.get("learning_style")
            
    elif step_id == 8:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile:
            if "career_goal" in data: profile.career_goal = data["career_goal"]
            
    elif step_id == 9:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile:
            if "budget" in data: profile.budget = data["budget"]
            if "family_income" in data: profile.family_income = data["family_income"]
            if "preferred_location" in data: profile.preferred_location = data["preferred_location"]
            if "languages" in data: profile.languages = data["languages"]

    # Update progress
    cdna.last_completed_step = step_id
    cdna.completion_percentage = int((step_id / 10.0) * 100)
    
    db.commit()
    db.refresh(cdna)
    return {"status": "success", "last_completed_step": cdna.last_completed_step}

@router.post("/complete")
def complete_career_dna(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == current_user.id).first()
    if not cdna:
        raise HTTPException(status_code=404, detail="Career DNA not found.")
        
    cdna.is_completed = True
    cdna.completion_percentage = 100
    db.commit()
    return {"status": "completed"}
