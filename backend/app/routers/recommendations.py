"""
Router for Profile-Persistent & Lifecycle-Aware Recommendations.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user
from app.services.recommendation_service import (
    get_or_generate_recommendations,
    select_recommendation_item,
    mark_profile_updated
)

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])


@router.get("/career")
def get_career_recommendations(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Returns active persistent career recommendations for current profile & Career DNA version.
    """
    return get_or_generate_recommendations(db, user, recommendation_type="career")


@router.get("/higher-study")
def get_higher_study_recommendations(
    stage: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Returns active persistent domain-aware higher study recommendations for user's degree/stage.
    """
    return get_or_generate_recommendations(db, user, recommendation_type="higher_study", stage_override=stage)


@router.post("/reassess")
def reassess_recommendations(
    recommendation_type: str = Query("career"),
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Explicit user trigger to force recommendation regeneration.
    """
    return get_or_generate_recommendations(db, user, recommendation_type=recommendation_type, force_regenerate=True)


@router.post("/{recommendation_id}/select")
def select_item(
    recommendation_id: int,
    payload: Dict[str, Any],
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """
    Persists user's selected recommendation item ID for roadmap generation.
    """
    item_id = payload.get("item_id")
    if not item_id:
        raise HTTPException(status_code=400, detail="item_id is required")

    try:
        updated = select_recommendation_item(db, user, recommendation_id, item_id)
        return updated
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
