from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any

class ProfileBase(BaseModel):
    education_level: Optional[str] = None
    institution: Optional[str] = None
    marks: Optional[float] = None
    state: Optional[str] = None
    location: Optional[str] = None
    community: Optional[str] = None
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

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileRead(ProfileBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)
