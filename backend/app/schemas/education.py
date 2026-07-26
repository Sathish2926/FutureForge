from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any

class DegreeBase(BaseModel):
    id: int
    title: str
    level: str
    duration_years: float
    description: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class CollegeCourseBase(BaseModel):
    id: int
    specialization: Optional[str] = None
    fees_per_year: Optional[float] = None
    seats: Optional[int] = None
    cutoff_percentile: Optional[float] = None
    degree: DegreeBase
    model_config = ConfigDict(from_attributes=True)

class CollegeBase(BaseModel):
    id: int
    name: str
    location: Optional[str] = None
    state: Optional[str] = None
    avg_fees: Optional[float] = None
    placement_rate: Optional[float] = None
    highest_package: Optional[float] = None
    has_hostel: Optional[bool] = None
    is_private: Optional[bool] = None
    ranking: Optional[int] = None
    model_config = ConfigDict(from_attributes=True)

class CollegeDetailResponse(CollegeBase):
    average_package: Optional[float] = None
    top_recruiters: Optional[List[str]] = None
    accreditation: Optional[str] = None
    infrastructure_details: Optional[Dict[str, Any]] = None
    website: Optional[str] = None
    established_year: Optional[int] = None
    courses: Optional[List[CollegeCourseBase]] = None
    is_saved: bool = False

class MatchResponse(BaseModel):
    match_percentage: float
    suitability_score: float
    confidence: str

class CollegeMatchResponse(BaseModel):
    college: CollegeBase
    match: MatchResponse
    top_courses: List[CollegeCourseBase]

class EntranceExamBase(BaseModel):
    id: int
    name: str
    full_name: Optional[str] = None
    difficulty: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class EntranceExamDetail(EntranceExamBase):
    eligibility: Optional[str] = None
    syllabus: Optional[Dict[str, Any]] = None
    preparation_tips: Optional[str] = None
    official_website: Optional[str] = None

class CertificationBase(BaseModel):
    id: int
    name: str
    provider_name: Optional[str] = None
    level: Optional[str] = None
    url: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)
