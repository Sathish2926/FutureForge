from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

class LearningPlanBase(BaseModel):
    id: int
    skill_name: str
    status: str
    estimated_hours: Optional[int] = None
    resource_type: Optional[str] = None
    resource_link: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class ProjectRecommendationBase(BaseModel):
    id: int
    title: str
    level: str
    description: Optional[str] = None
    github_link_idea: Optional[str] = None
    is_completed: bool
    model_config = ConfigDict(from_attributes=True)

class RoadmapMilestoneBase(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    sequence_order: int
    difficulty: Optional[str] = None
    status: str
    target_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    learning_plans: Optional[List[LearningPlanBase]] = None
    projects: Optional[List[ProjectRecommendationBase]] = None
    model_config = ConfigDict(from_attributes=True)

class RoadmapBase(BaseModel):
    id: int
    career_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    estimated_completion_months: int
    completion_percentage: float
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    milestones: Optional[List[RoadmapMilestoneBase]] = None
    model_config = ConfigDict(from_attributes=True)

class RoadmapGenerateRequest(BaseModel):
    career_id: int
