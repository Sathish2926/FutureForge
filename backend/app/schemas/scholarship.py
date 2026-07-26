"""Pydantic schemas for scholarship profile APIs."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ScholarshipProfileCreate(BaseModel):
    """Schema for creating a scholarship eligibility profile."""

    academic_stage: str = Field(..., description="class_10, class_12, diploma, ug, pg")
    current_course: str | None = None
    current_year: int | None = None
    state: str | None = None
    district: str | None = None
    community: str | None = None
    gender: str | None = None
    nationality: str = "Indian"
    annual_family_income: float | None = None
    parent_occupation: str | None = None
    percentage_cgpa: float | None = None
    has_disability: bool = False
    is_first_graduate: bool = False
    is_hosteller: bool = False
    is_government_institution: bool = False
    is_orphan: bool = False
    is_single_girl_child: bool = False
    is_minority: bool = False
    institution_name: str | None = None
    university: str | None = None
    institution_type: str | None = None
    additional_info: str | None = None


class ScholarshipProfileUpdate(BaseModel):
    """Schema for updating a scholarship eligibility profile."""

    academic_stage: str | None = None
    current_course: str | None = None
    current_year: int | None = None
    state: str | None = None
    district: str | None = None
    community: str | None = None
    gender: str | None = None
    nationality: str | None = None
    annual_family_income: float | None = None
    parent_occupation: str | None = None
    percentage_cgpa: float | None = None
    has_disability: bool | None = None
    is_first_graduate: bool | None = None
    is_hosteller: bool | None = None
    is_government_institution: bool | None = None
    is_orphan: bool | None = None
    is_single_girl_child: bool | None = None
    is_minority: bool | None = None
    institution_name: str | None = None
    university: str | None = None
    institution_type: str | None = None
    additional_info: str | None = None


class ScholarshipProfileRead(BaseModel):
    """ORM-facing scholarship profile response schema."""

    id: int
    user_id: int
    academic_stage: str
    current_course: str | None = None
    current_year: int | None = None
    state: str | None = None
    district: str | None = None
    community: str | None = None
    gender: str | None = None
    nationality: str = "Indian"
    annual_family_income: float | None = None
    parent_occupation: str | None = None
    percentage_cgpa: float | None = None
    has_disability: bool = False
    is_first_graduate: bool = False
    is_hosteller: bool = False
    is_government_institution: bool = False
    is_orphan: bool = False
    is_single_girl_child: bool = False
    is_minority: bool = False
    institution_name: str | None = None
    university: str | None = None
    institution_type: str | None = None
    additional_info: str | None = None
    profile_completion: float = 0.0
    created_at: datetime | None = None
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class ScholarshipBookmarkCreate(BaseModel):
    """Schema for bookmarking a scholarship."""

    status: str = "saved"
    notes: str | None = None


class ScholarshipBookmarkRead(BaseModel):
    """ORM-facing bookmark response schema."""

    id: int
    user_id: int
    scholarship_id: int
    status: str = "saved"
    notes: str | None = None
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class ScholarshipDetailResponse(BaseModel):
    """Detailed scholarship view with all metadata."""

    id: int
    title: str
    description: str | None = None
    provider: str | None = None
    amount: float = 0.0
    benefits: str | None = None
    scholarship_type: str | None = None
    country: str = "India"
    course_level: str | None = None
    course_name: str | None = None
    education_level: str | None = None
    minimum_percentage: float | None = None
    maximum_family_income: float | None = None
    income_limit: float | None = None
    minimum_marks: float | None = None
    age_min: int | None = None
    age_max: int | None = None
    community: str | None = None
    gender: str | None = None
    state: str | None = None
    disability_required: bool = False
    eligibility_summary: str | None = None
    application_mode: str | None = None
    deadline: str | None = None
    application_start_date: str | None = None
    application_end_date: str | None = None
    official_link: str | None = None
    official_url: str | None = None
    official_notification_url: str | None = None
    required_documents: list[str] = Field(default_factory=list)
    renewal_available: bool = False
    selection_process: str | None = None
    contact_information: dict | None = None
    application_policy: str | None = None
    compatible_with_other_schemes: str | None = None
    restrictions_on_combining: str | None = None
    faq_url: str | None = None
    is_active: bool = True
    is_bookmarked: bool = False

    model_config = ConfigDict(from_attributes=True)


class ScholarshipRecommendationResponse(BaseModel):
    """Enhanced response payload for scholarship recommendations."""

    scholarship_id: int
    title: str
    description: str | None = None
    amount: float
    provider: str | None = None
    match_score: float = Field(ge=0, le=100)
    eligibility_status: str
    recommendation_reasons: list[str] = Field(default_factory=list)
    matched_criteria: list[str] = Field(default_factory=list)
    optional_criteria: list[str] = Field(default_factory=list)
    can_apply: str = "NO"
    not_eligible_reason: str | None = None
    official_apply_link: str | None = None
    deadline: str | None = None
    required_documents: list[str] = Field(default_factory=list)
    multiple_application_rule: str | None = None
    combining_restrictions: str | None = None
    application_mode: str | None = None
    application_policy: str | None = None
    eligibility_summary: str | None = None
    contact_information: dict | None = None
    faq_url: str | None = None
    benefits: str | None = None
    renewal_available: bool = False
    is_bookmarked: bool = False


class ScholarshipDashboardResponse(BaseModel):
    """Dashboard summary response."""

    total_recommendations: int = 0
    total_bookmarks: int = 0
    upcoming_deadlines: int = 0
    profile_completion: float = 0.0
    average_match_score: float = 0.0
    top_recommendations: list[ScholarshipRecommendationResponse] = Field(default_factory=list)
    recent_bookmarks: list[ScholarshipBookmarkRead] = Field(default_factory=list)
    missing_documents: list[str] = Field(default_factory=list)