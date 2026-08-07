from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any

class ProfileBase(BaseModel):
    education_level: Optional[str] = None
    institution: Optional[str] = None
    school: Optional[str] = None
    college: Optional[str] = None
    company: Optional[str] = None
    marks: Optional[float] = None
    state: Optional[str] = None
    district: Optional[str] = None
    location: Optional[str] = None
    community: Optional[str] = None
    current_course: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[str] = None
    family_income: Optional[float] = None
    has_disability: Optional[bool] = False
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    budget: Optional[float] = None
    preferred_location: Optional[str] = None
    career_goal: Optional[str] = None
    occupation: Optional[str] = None
    learning_style: Optional[str] = None
    languages: Optional[List[str]] = None
    financial_background: Optional[str] = None
    hostel_requirement: Optional[bool] = False
    gov_or_private: Optional[str] = None
    salary_expectation: Optional[str] = None
    goal_timeline: Optional[str] = None
    work_life_balance: Optional[str] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileRead(ProfileBase):
    id: int
    user_id: int
    career_dna_completed: bool = False

    model_config = ConfigDict(from_attributes=True)
