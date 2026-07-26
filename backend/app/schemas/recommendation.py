from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

class CareerBrief(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    industry: Optional[str] = None
    base_salary_min: Optional[float] = None
    base_salary_max: Optional[float] = None
    demand_score: Optional[float] = None
    difficulty: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class RecommendationResponse(BaseModel):
    id: int
    user_id: int
    career_id: int
    version: int
    match_percentage: float
    confidence_score: float
    why_recommended: Optional[str] = None
    why_not_others: Optional[str] = None
    strengths: Optional[List[str]] = None
    weaknesses: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None
    learning_suggestions: Optional[List[str]] = None
    
    career: Optional[CareerBrief] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class ScenarioParam(BaseModel):
    label: str # e.g. "BCA" or "B.Tech" or "₹200,000 Budget" or "Bengaluru"
    changes: Dict[str, Any] # e.g. {"degree": "BCA"} or {"budget": 200000} or {"location": "Bengaluru"}

class SimulationRequest(BaseModel):
    scenario_a: ScenarioParam
    scenario_b: ScenarioParam

class ScenarioMetric(BaseModel):
    category: str # e.g. Expected Salary, Higher Studies, Companies
    value: str

class ScenarioResult(BaseModel):
    label: str
    metrics: List[ScenarioMetric]
    recommended_colleges: Optional[List[str]] = None
    scholarship_options: Optional[List[str]] = None
    career_paths: Optional[List[str]] = None

class SimulationResponse(BaseModel):
    scenario_a_result: ScenarioResult
    scenario_b_result: ScenarioResult
    ai_conclusion: str
