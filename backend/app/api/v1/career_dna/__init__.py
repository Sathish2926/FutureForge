from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.profile import CareerDNA, Profile
from app.models.assessment import AssessmentSession, AssessmentResponse, AssessmentOption
from app.schemas.career_dna import CareerDNAResponse
from app.services.career_dna_engine import AdaptiveEngineService, ScoringEngineService, ContextBuilderService

router = APIRouter(prefix="/career-dna", tags=["career_dna"])

@router.post("/session/start")
def start_assessment_session(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Initializes a new adaptive assessment session."""
    # Check for existing incomplete session
    session = db.query(AssessmentSession).filter(
        AssessmentSession.user_id == current_user.id,
        AssessmentSession.status == "IN_PROGRESS"
    ).first()
    
    if not session:
        session = AssessmentSession(user_id=current_user.id, status="IN_PROGRESS")
        db.add(session)
        db.commit()
        db.refresh(session)
        
    engine = AdaptiveEngineService(db)
    questions = engine.get_next_questions(session.id, current_user.id, limit=3)
    
    return {
        "session_id": session.id,
        "last_completed_step": session.last_completed_step,
        "questions": questions
    }

@router.get("/session/status")
def get_session_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = db.query(AssessmentSession).filter(
        AssessmentSession.user_id == current_user.id,
        AssessmentSession.status == "IN_PROGRESS"
    ).first()
    
    if session:
        return {"status": "IN_PROGRESS"}
    return {"status": "NOT_STARTED"}

@router.get("/session/next")
def get_next_questions(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id, 
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    engine = AdaptiveEngineService(db)
    questions = engine.get_next_questions(session.id, current_user.id, limit=3)
    return {"questions": questions}

@router.post("/session/submit")
def submit_answer(
    session_id: int,
    question_id: int,
    option_id: int,
    time_taken_ms: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id,
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    resp = AssessmentResponse(
        session_id=session.id,
        question_id=question_id,
        option_id=option_id,
        time_taken_ms=time_taken_ms
    )
    db.add(resp)
    
    session.last_completed_step += 1
    session.updated_at = datetime.utcnow()
    db.commit()
    
    return {"status": "saved"}

@router.post("/session/complete")
async def complete_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id,
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    session.status = "COMPLETED"
    db.commit()
    
    scoring = ScoringEngineService(db)
    cdna = scoring.calculate_scores(session.id, current_user.id)
    
    context_builder = ContextBuilderService(db)
    cdna = await context_builder.generate_ai_summary(current_user.id)
    
    return {"status": "completed", "career_dna_id": cdna.id}

@router.get("/results", response_model=CareerDNAResponse)
def get_results(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == current_user.id).first()
    if not cdna or not cdna.is_completed:
        raise HTTPException(status_code=404, detail="No completed Career DNA found.")
        
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    
    return {
        "id": cdna.id,
        "is_completed": cdna.is_completed,
        "analytical": cdna.analytical,
        "creativity": cdna.creativity,
        "leadership": cdna.leadership,
        "programming": cdna.programming,
        "problem_solving": cdna.problem_solving,
        "communication": cdna.communication,
        "entrepreneurship": cdna.entrepreneurship,
        "learning_ability": cdna.learning_ability,
        "business_orientation": cdna.business_orientation,
        "financial_thinking": cdna.financial_thinking,
        "public_service": cdna.public_service,
        "career_identity": cdna.career_identity,
        "strengths": cdna.strengths,
        "growth_areas": cdna.growth_areas,
        "learning_style": cdna.learning_style,
        "work_style": cdna.work_style,
        "decision_style": cdna.decision_style,
        "motivation": cdna.motivation,
        "career_readiness": cdna.career_readiness,
        "goal_reality_check": cdna.goal_reality_check,
        "career_goal": profile.career_goal if profile else None,
        "education_level": profile.education_level if profile else None
    }
