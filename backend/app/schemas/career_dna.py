from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CareerDNAResponse(BaseModel):
    id: int
    is_completed: bool

    # Raw Scores
    analytical: Optional[float] = 0.0
    creativity: Optional[float] = 0.0
    leadership: Optional[float] = 0.0
    programming: Optional[float] = 0.0
    problem_solving: Optional[float] = 0.0
    communication: Optional[float] = 0.0
    entrepreneurship: Optional[float] = 0.0
    learning_ability: Optional[float] = 0.0
    business_orientation: Optional[float] = 0.0
    financial_thinking: Optional[float] = 0.0
    public_service: Optional[float] = 0.0

    # Generated Identity & Summary
    career_identity: Optional[str] = None
    strengths: Optional[List[str]] = None
    growth_areas: Optional[List[str]] = None
    learning_style: Optional[str] = None
    work_style: Optional[str] = None
    decision_style: Optional[str] = None
    motivation: Optional[str] = None
    career_readiness: Optional[str] = None
    goal_reality_check: Optional[str] = None
    
    # Contextual Profile data
    career_goal: Optional[str] = None
    education_level: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
