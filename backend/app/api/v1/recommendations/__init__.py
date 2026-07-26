from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.recommendation import Recommendation
from app.schemas.recommendation import RecommendationResponse
from app.services.recommendation.engine import CareerRecommendationEngine

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.post("/generate", response_model=List[RecommendationResponse])
async def generate_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Trigger the Career Recommendation Engine for the current user."""
    engine = CareerRecommendationEngine(db=db)
    try:
        recommendations = await engine.generate_recommendations(user_id=current_user.id)
        return recommendations
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[RecommendationResponse])
def get_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Fetch the latest generated recommendations for the user."""
    recommendations = db.query(Recommendation).filter(
        Recommendation.user_id == current_user.id
    ).order_by(Recommendation.match_percentage.desc()).all()
    
    return recommendations

from app.schemas.recommendation import SimulationRequest, SimulationResponse
from app.services.recommendation.simulator import CareerSimulator

@router.post("/simulate", response_model=SimulationResponse)
def simulate_career_path(
    request: SimulationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    simulator = CareerSimulator(db=db)
    return simulator.run_simulation(user_id=current_user.id, request=request)
