"""
Pydantic schemas for Working Professional Career Growth & Transition Planner.
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ProfessionalProfileSaveRequest(BaseModel):
    current_job_title: str = Field(..., min_length=1)
    current_industry: str = Field(..., min_length=1)
    years_experience: float = Field(0.0, ge=0)
    employment_type: str = "Full-time"
    highest_qualification: str = "Not Specified"
    degree_specialization: Optional[str] = None
    current_skills: List[str] = []
    tools_technologies: List[str] = []
    responsibilities: Optional[str] = None
    certifications: List[str] = []

    career_goals: List[str] = []

    target_pathway: str = "known_target"  # known_target | help_me_choose
    target_role: Optional[str] = None
    target_industry: Optional[str] = None
    preferred_location: Optional[str] = None
    preferred_work_arrangement: str = "No Preference"
    target_salary_range: Optional[str] = None

    weekly_learning_hours: int = 5
    preferred_learning_format: str = "Mixed"
    learning_budget: str = "Free Only"
    preferred_language: str = "English"
    target_timeline: str = "Medium-term"
    current_salary: Optional[str] = None


class ProfessionalProfileResponse(BaseModel):
    id: int
    user_id: int
    current_job_title: str
    current_industry: str
    years_experience: float
    employment_type: str
    highest_qualification: str
    degree_specialization: Optional[str]
    current_skills: List[str]
    tools_technologies: List[str]
    responsibilities: Optional[str]
    certifications: List[str]
    career_goals: List[str]
    target_pathway: str
    target_role: Optional[str]
    target_industry: Optional[str]
    preferred_location: Optional[str]
    preferred_work_arrangement: str
    target_salary_range: Optional[str]
    weekly_learning_hours: int
    preferred_learning_format: str
    learning_budget: str
    preferred_language: str
    target_timeline: str
    current_salary: Optional[str]
    profile_summary: Optional[str]

    class Config:
        from_attributes = True


class SkillGapItem(BaseModel):
    skill_name: str
    category: str
    importance: str
    why_it_matters: str
    recommended_priority: str
    suggested_hours: int
    suggested_resource: Optional[Dict[str, Any]] = None
    current_status: str
    status_code: Optional[str] = "confirmed"  # confirmed, needs_improvement, missing, unknown
    follow_up_prompt: Optional[str] = None


class SkillGapAnalysisResponse(BaseModel):
    target_role: str
    industry: str
    description: str
    transition_category: str
    match_score: float
    match_score_explanation: str
    transferability_summary: str
    existing_skills: List[SkillGapItem]
    skills_to_improve: List[SkillGapItem]
    missing_skills: List[SkillGapItem]
    unknown_skills: Optional[List[SkillGapItem]] = []
    recommended_additional: List[SkillGapItem]
    suggested_learning_areas: List[str]
    possible_next_steps: List[str]
    missing_information_prompt: Optional[str] = None
    status: Optional[str] = "sufficient_data"  # sufficient_data, partially_verified, insufficient_profile, unsupported_career
    completeness_status: Optional[str] = "complete"  # complete, incomplete, needs_verification
    verification_notice: Optional[str] = None
    unsupported_message: Optional[str] = None
    request_logged: Optional[bool] = False
    request_id: Optional[str] = None
    missing_information_questions: Optional[List[Dict[str, Any]]] = []
    source_references: Optional[List[Dict[str, Any]]] = []
    last_verified: Optional[str] = None


class CareerOptionRecommendation(BaseModel):
    role_title: str
    slug: str
    industry: str
    description: str
    move_type: str
    recommendation_category: Optional[str] = "A. Closely Related Careers"  # A. Closely Related Careers, B. Career Growth Opportunities, C. Career Transition Opportunities
    match_score: float
    score_breakdown: Optional[Dict[str, Any]] = None
    why_it_fits: str
    transferable_skills: List[str]
    skills_to_develop: List[str]
    transferability_summary: str
    suggested_learning_areas: List[str]
    possible_next_steps: List[str]
    learning_resources: List[Dict[str, Any]]
    is_fallback_score: Optional[bool] = False
    source_references: Optional[List[Dict[str, Any]]] = []
    last_verified: Optional[str] = None
    completeness_status: Optional[str] = "complete"
    feasibility: Optional[str] = "Medium"
    estimated_duration: Optional[str] = "3 to 6 months"
    review_status: Optional[str] = "approved"
    typical_responsibilities: Optional[List[str]] = []
    essential_qualifications: Optional[List[str]] = []
    practical_projects: Optional[List[str]] = []


class GeneratePlanRequest(BaseModel):
    target_role: str


class StepUpdateRequest(BaseModel):
    completion_status: Optional[str] = None  # not_started, in_progress, completed
    user_notes: Optional[str] = None


class ChecklistUpdateRequest(BaseModel):
    checklist_items: List[Dict[str, Any]]


class AssistantQueryRequest(BaseModel):
    query: str
    plan_id: Optional[int] = None


class NaturalLanguageProfileRequest(BaseModel):
    profile_text: str = Field(..., min_length=3)


class GuidanceRequestCreate(BaseModel):
    career_topic: str = Field(..., min_length=2)
    category: str = "unsupported_career"
    user_context: Optional[Dict[str, Any]] = None
    reason: Optional[str] = None


class GuidanceRequestResponse(BaseModel):
    id: int
    request_id: str
    career_topic: str
    category: str
    reason: str
    status: str
    created_at: Any
