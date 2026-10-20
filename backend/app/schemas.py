from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field


# ---------- auth ----------
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class FirebaseAuthRequest(BaseModel):
    email: EmailStr
    name: Optional[str] = "User"
    uid: Optional[str] = None
    id_token: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    is_admin: bool = False


# ---------- profile ----------
class EducationRecordIn(BaseModel):
    level: str
    institution_name: Optional[str] = None
    board_or_university: Optional[str] = None
    stream: Optional[str] = None
    subjects: Optional[str] = None
    marks_percent: Optional[float] = None
    cgpa: Optional[float] = None
    start_year: Optional[int] = None
    end_year: Optional[int] = None


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None
    education_stage: Optional[str] = None
    current_class_or_year: Optional[str] = None
    preferred_location: Optional[str] = None
    willing_to_relocate: Optional[bool] = None
    distance_preference_km: Optional[int] = None
    category: Optional[str] = None
    disability_status: Optional[bool] = None
    first_generation_learner: Optional[bool] = None
    family_income_band: Optional[str] = None
    budget_band: Optional[str] = None
    government_private_preference: Optional[str] = None
    interests: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    education_records: Optional[List[EducationRecordIn]] = None
    primary_career_goal_slug: Optional[str] = None


class ProfileOut(BaseModel):
    name: Optional[str]
    education_stage: Optional[str]
    state: Optional[str]
    completeness_percent: int
    missing_sections: List[str]
    profile: dict


# ---------- career ----------
class CareerOut(BaseModel):
    id: int
    slug: str
    name: str
    sector: str
    description: str

    class Config:
        from_attributes = True


class CareerMatch(BaseModel):
    career: CareerOut
    match_score: float
    breakdown: dict
    reasoning: dict


class RecommendationRequest(BaseModel):
    career_slug: Optional[str] = None  # if omitted, return top matches across catalogue
    top_n: int = 5


# ---------- roadmap ----------
class GeminiRoadmapStep(BaseModel):
    stage_key: str  # class10|class12|ug|pg|professional
    title: str
    why: str
    skill_name: Optional[str] = None
    prerequisites: List[str] = []
    actions: List[str] = []
    resources: List[str] = []
    estimated_time: str


class GeminiRoadmapOutput(BaseModel):
    is_ambiguous: bool = False
    clarification_reason: Optional[str] = None
    suggested_destinations: List[str] = []
    role_definition: Optional[str] = None
    sector: Optional[str] = "General"
    required_skills: List[str] = []
    steps: List[GeminiRoadmapStep] = []


class RoadmapTaskOut(BaseModel):
    id: int
    title: str
    is_completed: bool
    task_type: str

    class Config:
        from_attributes = True


class LearningResourceOut(BaseModel):
    id: int
    title: str
    url: Optional[str] = None
    resource_type: str
    estimated_minutes: Optional[int] = None

    class Config:
        from_attributes = True


class RoadmapStepOut(BaseModel):
    id: int
    order_index: int
    stage: str
    stage_key: Optional[str] = None
    title: str
    description: str
    why: Optional[str]
    estimated_time: Optional[str] = None
    skill_name: Optional[str] = None
    is_skipped: bool = False
    skip_reason: Optional[str] = None
    status: str
    prerequisites: List[str] = []
    actions: List[str] = []
    resources: List[LearningResourceOut] = []
    tasks: List[RoadmapTaskOut] = []
    is_current_stage: bool = False

    class Config:
        from_attributes = True


class RoadmapRequest(BaseModel):
    career_slug: Optional[str] = None
    goal_text: Optional[str] = None
    recommendation_id: Optional[int] = None
    selected_item_id: Optional[int] = None


class RoadmapRequestSubmissionCreate(BaseModel):
    career_name: str
    notes: Optional[str] = None
    user_email: Optional[str] = None



class RoadmapOut(BaseModel):
    id: int
    career_name: str
    career_slug: Optional[str] = None
    sector: Optional[str] = "General"
    version: int
    is_user_generated: bool = False
    needs_verification: bool = False
    is_ambiguous: bool = False
    clarification_reason: Optional[str] = None
    clarification_suggestions: List[str] = []
    confidence_score: float = 1.0
    skill_gap_summary: Optional[dict] = None
    completion_percent: int = 0
    steps: List[RoadmapStepOut] = []



class ProgressUpdate(BaseModel):
    step_id: int
    status: str  # not_started|in_progress|completed


class AssessmentSubmission(BaseModel):
    step_id: int
    answers: dict  # {question_index: selected_option_index}


class AssessmentResultOut(BaseModel):
    step_id: int
    score: float
    passed: bool
    unlocked_next_step: bool
    feedback: str



# ---------- chat ----------
class ChatRequest(BaseModel):
    conversation_id: Optional[int] = None
    message: str
    stage: Optional[str] = None


class ChatResponse(BaseModel):
    conversation_id: int
    reply: str
    structured: dict
    ai_model_used: Optional[str]


# ---------- career dna ----------
class CareerDNASubmitRequest(BaseModel):
    stage: str  # class10|class12|ug|pg|job_switcher
    answers: dict  # {question_id: answer}


class AdaptiveNextQuestionRequest(BaseModel):
    stage: str = "class10"
    answers: dict = {}



class TargetResolutionRequest(BaseModel):
    target_role: str


class ExperimentSubmissionRequest(BaseModel):
    experiment_id: str
    selected_option: str


class UserCorrectionRequest(BaseModel):
    stage: str
    corrected_signals: dict


# ---------- auth: me ----------
class MeResponse(BaseModel):
    id: int
    email: str
    name: str
    is_admin: bool

    class Config:
        from_attributes = True


# ---------- scholarship module ----------
class ScholarshipProfileIn(BaseModel):
    education_level: Optional[str] = None
    course_name: Optional[str] = None
    stream: Optional[str] = None
    year_of_study: Optional[str] = None
    previous_qualification: Optional[str] = None
    previous_marks_percent: Optional[float] = None
    previous_cgpa: Optional[float] = None
    grading_system: Optional[str] = "percentage"
    passing_year: Optional[int] = None
    institution_name: Optional[str] = None
    institution_type: Optional[str] = "government"
    study_mode: Optional[str] = "full-time"
    academic_year_needed: Optional[str] = "2026-27"
    admission_status: Optional[str] = "confirmed"

    country: Optional[str] = "India"
    state: Optional[str] = "Tamil Nadu"
    current_study_state: Optional[str] = "Tamil Nadu"
    permanent_state: Optional[str] = "Tamil Nadu"
    district: Optional[str] = None
    domicile_state: Optional[str] = "Tamil Nadu"
    has_domicile_certificate: Optional[bool] = True

    social_category: Optional[str] = "General"
    has_community_certificate: Optional[bool] = True

    annual_family_income: Optional[float] = None
    has_income_certificate: Optional[bool] = True
    income_certificate_valid: Optional[bool] = True

    gender: Optional[str] = None
    has_disability: Optional[bool] = False
    disability_percentage: Optional[float] = None
    has_disability_certificate: Optional[bool] = False
    is_first_generation_graduate: Optional[bool] = False
    is_single_girl_child: Optional[bool] = False
    is_orphan_or_single_parent: Optional[bool] = False
    is_hosteller: Optional[bool] = False
    is_ex_servicemen_family: Optional[bool] = False
    studied_govt_school_tn: Optional[bool] = False
    sports_cultural_quota: Optional[bool] = False
    entrance_exam_qualified: Optional[str] = None
    academic_achievements: Optional[str] = None
    has_completed_onboarding: Optional[bool] = True


class SavedScholarshipUpdateIn(BaseModel):
    status: Optional[str] = "saved"
    application_reference_no: Optional[str] = None
    notes: Optional[str] = None
    deadline_reminder: Optional[bool] = True


class ScholarshipAIExplainRequest(BaseModel):
    scholarship_id: int
    query: str
    context: Optional[dict] = None


class ScholarshipAdminIn(BaseModel):
    code: Optional[str] = None
    name: str
    provider: str
    provider_category: Optional[str] = "central_govt"
    description: Optional[str] = None
    geographic_coverage: Optional[str] = "all_india"
    eligible_states: Optional[str] = "ALL"
    domicile_required: Optional[bool] = False
    domicile_state: Optional[str] = None
    education_levels: str
    eligible_courses: Optional[str] = "all"
    institution_types: Optional[str] = "all"
    academic_year: Optional[str] = "2026-27"
    min_marks_percent: Optional[float] = None
    max_family_income: Optional[float] = None
    eligible_categories: Optional[str] = "all"
    gender_restriction: Optional[str] = "all"
    age_limit: Optional[int] = None
    benefit_amount_inr: Optional[float] = None
    benefit_description: str
    benefit_type: Optional[str] = "annual_scholarship"
    benefit_duration: Optional[str] = None
    renewal_requirements: Optional[str] = None
    application_open_date: Optional[str] = None
    application_close_date: Optional[str] = None
    deadline_verification_status: Optional[str] = "unconfirmed"
    application_mode: Optional[str] = "online_portal"
    official_info_url: Optional[str] = None
    official_application_url: Optional[str] = None
    application_portal_name: Optional[str] = None
    source_name: Optional[str] = "Official Portal"
    source_type: Optional[str] = "official_portal"
    verification_status: Optional[str] = "VERIFIED_ACTIVE"
    verification_notes: Optional[str] = None
    required_documents: Optional[Any] = None
    application_steps: Optional[Any] = None
    rules: Optional[List[dict]] = None



