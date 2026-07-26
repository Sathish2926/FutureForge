from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CareerDNAAcademicBase(BaseModel):
    board: Optional[str] = None
    stream: Optional[str] = None
    favorite_subjects: Optional[List[str]] = None
    weak_subjects: Optional[List[str]] = None
    dream_stream: Optional[str] = None
    coaching: Optional[bool] = None
    entrance_exam: Optional[str] = None
    preferred_degree: Optional[str] = None
    degree: Optional[str] = None
    department: Optional[str] = None
    cgpa: Optional[float] = None
    backlogs: Optional[int] = None
    projects: Optional[int] = None
    internships: Optional[int] = None
    industry: Optional[str] = None
    experience_years: Optional[float] = None
    current_role: Optional[str] = None
    salary_range: Optional[str] = None
    certifications: Optional[List[str]] = None

class CareerDNAPersonalityBase(BaseModel):
    scenario_key: str
    selected_option: str

class CareerDNABase(BaseModel):
    user_type: Optional[str] = None
    completion_percentage: Optional[int] = 0
    last_completed_step: Optional[int] = 1
    is_completed: Optional[bool] = False

    analytical: Optional[float] = 0.0
    creativity: Optional[float] = 0.0
    leadership: Optional[float] = 0.0
    programming: Optional[float] = 0.0
    problem_solving: Optional[float] = 0.0
    communication: Optional[float] = 0.0
    critical_thinking: Optional[float] = 0.0
    teamwork: Optional[float] = 0.0
    entrepreneurship: Optional[float] = 0.0
    learning_ability: Optional[float] = 0.0

class CareerDNAResponse(CareerDNABase):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class StepSaveRequest(BaseModel):
    step: int
    data: Dict[str, Any]
