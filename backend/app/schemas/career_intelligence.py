from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from .recommendation import CareerBrief

class CareerDetailBase(BaseModel):
    responsibilities: Optional[List[str]] = None
    daily_work: Optional[str] = None
    growth_opportunities: Optional[str] = None
    work_environment: Optional[str] = None
    work_life_balance: Optional[str] = None
    remote_opportunities: Optional[str] = None

class CareerInsightBase(BaseModel):
    automation_risk: Optional[str] = None
    industry_growth: Optional[str] = None
    top_hiring_industries: Optional[List[str]] = None
    global_opportunities: Optional[str] = None

class CareerTimelineBase(BaseModel):
    stage_order: int
    stage_name: str
    estimated_months: int
    description: str

class CareerLearningResourceBase(BaseModel):
    level: str
    type: str
    title: str
    url: Optional[str] = None
    description: Optional[str] = None

class CareerSkillGapBase(BaseModel):
    skill_name: str
    importance: float
    difficulty: str
    estimated_learning_time: str
    user_has_skill: bool

class MatchAnalysisResponse(BaseModel):
    overall_match: float
    skill_match: float
    interest_match: float
    personality_match: float
    goal_match: float
    budget_match: float
    location_match: float

class CareerIntelligenceResponse(BaseModel):
    career: CareerBrief
    detail: Optional[CareerDetailBase] = None
    insight: Optional[CareerInsightBase] = None
    timeline: Optional[List[CareerTimelineBase]] = None
    learning_resources: Optional[List[CareerLearningResourceBase]] = None
    is_bookmarked: bool = False
    
    model_config = ConfigDict(from_attributes=True)
