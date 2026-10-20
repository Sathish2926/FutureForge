"""
SQLAlchemy models — normalized schema (3NF) matching the product's ERD.
Financial/eligibility data lives in its own table (not duplicated across
users/careers/colleges/scholarships) and everything else references it.
"""
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey,
    UniqueConstraint, JSON
)
from sqlalchemy.orm import relationship
from .database import Base


def now():
    return datetime.utcnow()


# ---------------------------------------------------------------- identity
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    firebase_uid = Column(String(128), unique=True, index=True, nullable=True)  # set when Firebase Auth is wired in
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=True)  # dev-mode auth only; never used if Firebase handles identity
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=now)
    deleted_at = Column(DateTime, nullable=True)  # soft delete

    profile = relationship("Profile", back_populates="user", uselist=False)
    education_records = relationship("EducationRecord", back_populates="user")
    user_skills = relationship("UserSkill", back_populates="user")
    user_interests = relationship("UserInterest", back_populates="user")
    career_goals = relationship("CareerGoal", back_populates="user")
    roadmaps = relationship("Roadmap", back_populates="user")
    saved_colleges = relationship("SavedCollege", back_populates="user")
    saved_scholarships = relationship("SavedScholarship", back_populates="user")
    scholarship_profile = relationship("UserScholarshipProfile", back_populates="user", uselist=False)
    conversations = relationship("AIConversation", back_populates="user")
    recommendations = relationship("Recommendation", back_populates="user")


class FinancialProfile(Base):
    __tablename__ = "financial_profiles"
    id = Column(Integer, primary_key=True)
    family_income_band = Column(String(32))  # e.g. "below_2.5L", "2.5-8L", "8L+"
    budget_band = Column(String(32))
    government_private_preference = Column(String(16))  # government|private|no_preference


class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String(120))
    date_of_birth = Column(String(10), nullable=True)
    gender = Column(String(32), nullable=True)
    state = Column(String(64))
    district = Column(String(64), nullable=True)
    city = Column(String(64), nullable=True)
    pincode = Column(String(10), nullable=True)

    education_stage = Column(String(32))  # class10|class12|diploma|ug|pg|phd|professional
    current_class_or_year = Column(String(32), nullable=True)

    preferred_location = Column(String(64), nullable=True)
    willing_to_relocate = Column(Boolean, default=True)
    distance_preference_km = Column(Integer, nullable=True)

    category = Column(String(32), nullable=True)  # optional, scholarship-relevant only
    disability_status = Column(Boolean, default=False)
    first_generation_learner = Column(Boolean, default=False)

    financial_profile_id = Column(Integer, ForeignKey("financial_profiles.id"), nullable=True)
    financial_profile = relationship("FinancialProfile")

    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User", back_populates="profile")


# --------------------------------------------------------------- education
class EducationRecord(Base):
    __tablename__ = "education_records"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    level = Column(String(32))  # class10|class12|diploma|ug|pg|phd
    institution_name = Column(String(200), nullable=True)
    board_or_university = Column(String(200), nullable=True)
    stream = Column(String(64), nullable=True)  # PCM, PCB, Commerce, Arts...
    subjects = Column(String(500), nullable=True)  # comma-separated
    marks_percent = Column(Float, nullable=True)
    cgpa = Column(Float, nullable=True)
    start_year = Column(Integer, nullable=True)
    end_year = Column(Integer, nullable=True)

    user = relationship("User", back_populates="education_records")


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True)
    name = Column(String(120), unique=True)
    category = Column(String(64))  # technical|soft|language|certification


class UserSkill(Base):
    __tablename__ = "user_skills"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    proficiency = Column(String(16), default="beginner")  # beginner|intermediate|advanced
    __table_args__ = (UniqueConstraint("user_id", "skill_id"),)

    user = relationship("User", back_populates="user_skills")
    skill = relationship("Skill")


class Interest(Base):
    __tablename__ = "interests"
    id = Column(Integer, primary_key=True)
    name = Column(String(120), unique=True)
    category = Column(String(64))  # subject|career_area|hobby|work_type


class UserInterest(Base):
    __tablename__ = "user_interests"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    interest_id = Column(Integer, ForeignKey("interests.id"))
    weight = Column(Float, default=1.0)  # relative strength, 0-1
    __table_args__ = (UniqueConstraint("user_id", "interest_id"),)

    user = relationship("User", back_populates="user_interests")
    interest = relationship("Interest")


# ------------------------------------------------------------------ career
class Career(Base):
    __tablename__ = "careers"
    id = Column(Integer, primary_key=True)
    slug = Column(String(120), unique=True, index=True)
    name = Column(String(160))
    sector = Column(String(64))  # Technology, Government, Medicine, ...
    description = Column(Text)
    recommended_subjects = Column(String(300), nullable=True)  # comma-separated
    common_entrance_exams = Column(String(300), nullable=True)
    relevant_degrees = Column(String(300), nullable=True)
    typical_progression = Column(Text, nullable=True)
    industry_sectors = Column(String(300), nullable=True)
    government_opportunities = Column(Text, nullable=True)
    higher_study_routes = Column(Text, nullable=True)
    skill_building_timeline = Column(String(120), nullable=True)
    # Set true when a user typed a goal that wasn't in the curated catalogue
    # (spec: "react to any input" — collector, IPS, politician, any domain).
    # The pathway is synthesized from a sector template, not hand-curated,
    # so it's flagged for the UI to show a stronger verify-before-relying-on-this notice.
    is_user_generated = Column(Boolean, default=False)
    needs_verification = Column(Boolean, default=False)

    pathways = relationship("CareerPathway", back_populates="career")
    skill_links = relationship("CareerSkill", back_populates="career")


class CareerSkill(Base):
    __tablename__ = "career_skills"
    id = Column(Integer, primary_key=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    priority = Column(String(16), default="core")  # core|complementary
    why_it_matters = Column(String(400), nullable=True)

    career = relationship("Career", back_populates="skill_links")
    skill = relationship("Skill")


class CareerPathway(Base):
    """One row per (career, route_type) — e.g. Scientist has common/competitive/research/industry routes."""
    __tablename__ = "career_pathways"
    id = Column(Integer, primary_key=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    route_type = Column(String(32))  # common|competitive|alternative|research|industry|lower_cost|backup
    title = Column(String(160))
    description = Column(Text)
    steps_json = Column(JSON)  # ordered list of {stage, action, why}

    career = relationship("Career", back_populates="pathways")


class CareerAlternative(Base):
    __tablename__ = "career_alternatives"
    id = Column(Integer, primary_key=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    related_career_id = Column(Integer, ForeignKey("careers.id"))
    relationship_type = Column(String(32))  # related|backup|adjacent


class CareerGoal(Base):
    __tablename__ = "career_goals"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    is_primary = Column(Boolean, default=True)
    status = Column(String(16), default="active")  # active|archived
    created_at = Column(DateTime, default=now)

    user = relationship("User", back_populates="career_goals")
    career = relationship("Career")


# ----------------------------------------------------------------- roadmap
class Roadmap(Base):
    __tablename__ = "roadmaps"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    recommendation_id = Column(Integer, ForeignKey("recommendations.id"), nullable=True)
    selected_item_id = Column(Integer, nullable=True)
    target_education = Column(String(200), nullable=True)
    version = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    confidence_score = Column(Float, default=1.0)
    skill_gap_summary_json = Column(JSON, nullable=True)  # {known: [], gaps: [{skill, priority, gap_level}]}
    is_ambiguous = Column(Boolean, default=False)
    clarification_suggestions_json = Column(JSON, nullable=True)  # list of suggested alternative goal strings
    clarification_reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now)

    user = relationship("User", back_populates="roadmaps")
    career = relationship("Career")
    steps = relationship("RoadmapStep", back_populates="roadmap", order_by="RoadmapStep.order_index")


class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"
    id = Column(Integer, primary_key=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    order_index = Column(Integer)
    stage = Column(String(64))  # e.g. "Class 11-12", "Undergraduate"
    stage_key = Column(String(32), nullable=True)  # class10|class12|ug|pg|professional
    title = Column(String(200))
    description = Column(Text)
    why = Column(Text, nullable=True)
    estimated_time = Column(String(64), nullable=True)
    skill_name = Column(String(120), nullable=True)
    is_skipped = Column(Boolean, default=False)
    skip_reason = Column(String(255), nullable=True)

    roadmap = relationship("Roadmap", back_populates="steps")
    progress = relationship("RoadmapProgress", back_populates="step", uselist=False)
    tasks = relationship("RoadmapTask", back_populates="step")
    resources = relationship("LearningResource", back_populates="step")


class RoadmapTask(Base):
    __tablename__ = "roadmap_tasks"
    id = Column(Integer, primary_key=True)
    step_id = Column(Integer, ForeignKey("roadmap_steps.id"))
    title = Column(String(255))
    is_completed = Column(Boolean, default=False)
    task_type = Column(String(32), default="action")  # action|project|practice|assessment

    step = relationship("RoadmapStep", back_populates="tasks")


class LearningResource(Base):
    __tablename__ = "learning_resources"
    id = Column(Integer, primary_key=True)
    step_id = Column(Integer, ForeignKey("roadmap_steps.id"))
    title = Column(String(255))
    url = Column(String(500), nullable=True)
    resource_type = Column(String(32), default="article")  # article|video|course|doc
    estimated_minutes = Column(Integer, nullable=True)

    step = relationship("RoadmapStep", back_populates="resources")


class RoadmapProgress(Base):
    __tablename__ = "roadmap_progress"
    id = Column(Integer, primary_key=True)
    step_id = Column(Integer, ForeignKey("roadmap_steps.id"), unique=True)
    status = Column(String(16), default="not_started")  # not_started|in_progress|completed
    updated_at = Column(DateTime, default=now, onupdate=now)

    step = relationship("RoadmapStep", back_populates="progress")


class SkillPrerequisite(Base):
    __tablename__ = "skill_prerequisites"
    id = Column(Integer, primary_key=True)
    parent_skill_id = Column(Integer, ForeignKey("skills.id"))
    child_skill_id = Column(Integer, ForeignKey("skills.id"))

    parent_skill = relationship("Skill", foreign_keys=[parent_skill_id])
    child_skill = relationship("Skill", foreign_keys=[child_skill_id])


class SkillAssessment(Base):
    __tablename__ = "skill_assessments"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=True)
    step_id = Column(Integer, ForeignKey("roadmap_steps.id"), nullable=True)
    score = Column(Float)
    passed = Column(Boolean)
    feedback = Column(Text, nullable=True)
    taken_at = Column(DateTime, default=now)

    user = relationship("User")
    skill = relationship("Skill")
    step = relationship("RoadmapStep")


class RoadmapGenerationLog(Base):
    __tablename__ = "roadmap_generation_logs"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    goal_text = Column(String(200))
    is_ambiguous = Column(Boolean, default=False)
    confidence_score = Column(Float, default=1.0)
    validation_passed = Column(Boolean, default=True)
    error_details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now)

    user = relationship("User")


class RoadmapRequestSubmission(Base):
    __tablename__ = "roadmap_request_submissions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    career_name = Column(String(255), nullable=False)
    notes = Column(Text, nullable=True)
    user_email = Column(String(255), nullable=True)
    status = Column(String(32), default="pending")  # pending|reviewed|added
    created_at = Column(DateTime, default=now)

    user = relationship("User")




# ------------------------------------------------------------ career DNA
class CareerDNAResponse(Base):
    """One row per (user, stage) — a dedicated, stage-specific 'Career DNA'
    form, separate from the general profile/onboarding. Each stage
    (class10/class12/ug/pg/job_switcher) asks different guidance
    questions and gets back a generated 'what groups/paths exist and why
    they matter for you' result, stored alongside the raw answers so the
    guidance stays reproducible/explainable later (same principle as
    Recommendation snapshots)."""
    __tablename__ = "career_dna_responses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stage = Column(String(32))  # class10|class12|ug|pg|job_switcher
    answers_json = Column(JSON)
    guidance_json = Column(JSON)  # generated groups/paths + usefulness explanation
    version = Column(Integer, default=1)
    ruleset_version = Column(String(64), default="career_dna_v2")
    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User")


# --------------------------------------------------------- assessment engine
class AssessmentCategory(Base):
    """Top-level category grouping for the assessment (Aptitude, Interest,
    Personality, Problem Solving, Career Preferences). Stored in DB so admin
    can toggle categories on/off without code changes."""
    __tablename__ = "assessment_categories"
    id = Column(Integer, primary_key=True)
    slug = Column(String(64), unique=True, index=True)  # aptitude|interest|personality|problem_solving|career_preferences
    name = Column(String(120))
    description = Column(Text, nullable=True)
    icon = Column(String(64), nullable=True)  # lucide icon name
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    questions = relationship("AssessmentQuestion", back_populates="category")


class AssessmentQuestion(Base):
    """Data-driven question. The question_type, options_json, and
    scoring_weights_json let the engine interpret any answer format and
    map it to Career DNA dimensions without hardcoding logic per question."""
    __tablename__ = "assessment_questions"
    id = Column(Integer, primary_key=True)
    category_slug = Column(String(64), ForeignKey("assessment_categories.slug"), index=True)
    subcategory = Column(String(64), nullable=True)
    # 'all' means it appears for every stage; otherwise stage-specific
    education_stage = Column(String(32), default="all")  # all|class10|class12|ug|pg|professional
    difficulty = Column(String(16), default="beginner")  # beginner|intermediate|advanced
    # single_choice: one correct/weighted answer from options
    # likert_scale: 1-5 agreement strength, maps to dimension weights
    # scenario: scenario with weighted choices
    question_type = Column(String(32), default="single_choice")
    question_text = Column(Text)
    options_json = Column(JSON)  # [{text, value, weights: {dimension: score}}]
    correct_answer = Column(String(120), nullable=True)  # for aptitude scoring
    # Maps selected answer to dimension weights, e.g. {analytical: 0.8, logical: 0.9}
    scoring_weights_json = Column(JSON, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=now)

    category = relationship("AssessmentCategory", back_populates="questions")


class AssessmentAttempt(Base):
    """One row per user attempt. Retakes create a NEW attempt; old attempts
    are preserved and queryable. The most recently completed attempt that
    is_active=True drives Career DNA. Users can explicitly activate a
    previous attempt."""
    __tablename__ = "assessment_attempts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    stage = Column(String(32))  # education stage at time of attempt
    status = Column(String(16), default="in_progress")  # in_progress|completed|abandoned
    attempt_number = Column(Integer, default=1)
    current_question_index = Column(Integer, default=0)
    total_questions = Column(Integer, default=0)
    # Final computed scores per dimension (0-100) and per category
    scores_json = Column(JSON, nullable=True)
    # computed Career DNA dimensions from this attempt
    career_dna_dimensions_json = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=False)  # true = drives current Career DNA
    started_at = Column(DateTime, default=now)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User")
    responses = relationship("AssessmentResponse", back_populates="attempt", cascade="all, delete-orphan")


class AssessmentResponse(Base):
    """One row per (attempt, question) answer. Supports autosave/resume
    and full audit trail of what was answered in each attempt."""
    __tablename__ = "assessment_responses"
    id = Column(Integer, primary_key=True)
    attempt_id = Column(Integer, ForeignKey("assessment_attempts.id", ondelete="CASCADE"), index=True)
    question_id = Column(Integer, ForeignKey("assessment_questions.id"))
    selected_option = Column(String(255))  # the selected option value
    score_awarded = Column(Float, default=0.0)  # computed score for this answer
    dimension_contributions_json = Column(JSON, nullable=True)  # {analytical: 0.8, logical: 0.6, ...}
    answered_at = Column(DateTime, default=now)

    attempt = relationship("AssessmentAttempt", back_populates="responses")
    question = relationship("AssessmentQuestion")


def _gen_college_id():
    import uuid
    return f"CLG_{uuid.uuid4().hex[:8].upper()}"


# ---------------------------------------------------------------- colleges
class College(Base):
    __tablename__ = "colleges"
    id = Column(String(64), primary_key=True, default=_gen_college_id)
    college_id = Column(String(64), nullable=True, default=_gen_college_id)
    name = Column(String(200))
    college_name = Column(String(200), nullable=True)
    institution_type = Column(String(64))  # government|private|deemed
    standardized_college_type = Column(String(64), nullable=True)
    standardized_ownership_type = Column(String(64), nullable=True)

    state = Column(String(64))
    city = Column(String(64))
    district = Column(String(64), nullable=True)
    pincode = Column(String(32), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    website = Column(String(200), nullable=True)
    hostel_available = Column(Boolean, nullable=True)
    source_provider = Column(String(64), default="careerpath_curated")
    last_verified = Column(DateTime, nullable=True)

    courses = relationship("CollegeCourse", back_populates="college")
    details = relationship("CollegeDetail", back_populates="college", uselist=False, cascade="all, delete-orphan")
    programs = relationship("CollegeProgram", back_populates="college", cascade="all, delete-orphan")


class CollegeDetail(Base):
    __tablename__ = "college_details"
    id = Column(Integer, primary_key=True)
    college_id = Column(String(64), ForeignKey("colleges.id", ondelete="CASCADE"), unique=True, nullable=False)

    domain_group = Column(String(120), nullable=True)
    course_family = Column(String(255), nullable=True)
    district = Column(String(64), nullable=True)
    pincode = Column(Integer, nullable=True)
    year_established = Column(Integer, nullable=True)
    common_admission_route = Column(String(200), nullable=True)

    annual_fee_min_inr = Column(Integer, nullable=True)
    annual_fee_max_inr = Column(Integer, nullable=True)
    estimated_4yr_fee_inr = Column(Integer, nullable=True)

    avg_package_min_lpa = Column(Float, nullable=True)
    avg_package_max_lpa = Column(Float, nullable=True)
    avg_package_lpa = Column(Float, nullable=True)
    placement_rate_pct_est = Column(Float, nullable=True)

    rating_seeded = Column(Float, nullable=True)
    nirf_rank_seeded = Column(Integer, nullable=True)
    nirf_rank_status = Column(String(120), nullable=True)

    hostel_facility = Column(String(120), nullable=True)
    placement_facility = Column(String(120), nullable=True)
    transport_facility = Column(String(120), nullable=True)
    estimated_hostel_annual_inr = Column(Integer, nullable=True)
    estimated_total_annual_cost_inr = Column(Integer, nullable=True)
    package_to_fee_ratio = Column(Float, nullable=True)
    estimated_roi_score = Column(Float, nullable=True)

    fee_source_type = Column(String(120), nullable=True)
    placement_source_type = Column(String(120), nullable=True)
    verification_required = Column(String(120), nullable=True)
    fee_data_basis = Column(String(255), nullable=True)
    placement_data_basis = Column(String(255), nullable=True)
    fee_is_estimate = Column(Boolean, default=True)
    placement_is_estimate = Column(Boolean, default=True)
    placement_rate_source = Column(String(255), nullable=True)
    location_quality = Column(String(255), nullable=True)

    college = relationship("College", back_populates="details")


class CollegeProgram(Base):
    __tablename__ = "college_programs"
    id = Column(Integer, primary_key=True)
    program_id = Column(Integer, index=True, nullable=True)
    college_id = Column(String(64), ForeignKey("colleges.id", ondelete="CASCADE"), nullable=False)
    college_code = Column(String(64), nullable=True)
    program_no = Column(Integer, nullable=True)
    branch = Column(String(200), nullable=False)
    approved_intake = Column(Integer, nullable=True)
    course_category = Column(String(100), nullable=True)
    course_start_year = Column(Integer, nullable=True)
    accredited = Column(String(32), nullable=True)
    accreditation_valid_upto = Column(String(32), nullable=True)
    source_booklet = Column(String(100), nullable=True)
    source_pdf_page = Column(Integer, nullable=True)

    college = relationship("College", back_populates="programs")



class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    name = Column(String(160))
    degree_level = Column(String(32))  # UG|PG|Diploma|PhD
    field = Column(String(120))


class CollegeCourse(Base):
    __tablename__ = "college_courses"
    id = Column(Integer, primary_key=True)
    college_id = Column(String(64), ForeignKey("colleges.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    entrance_exam = Column(String(120), nullable=True)
    min_eligibility_percent = Column(Float, nullable=True)
    annual_fees_inr = Column(Integer, nullable=True)

    college = relationship("College", back_populates="courses")
    course = relationship("Course")


class SavedCollege(Base):
    __tablename__ = "saved_colleges"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    college_id = Column(String(64), ForeignKey("colleges.id"))
    created_at = Column(DateTime, default=now)

    user = relationship("User", back_populates="saved_colleges")
    college = relationship("College")



# ------------------------------------------------------------- scholarship
# ------------------------------------------------------------- scholarship
class Scholarship(Base):
    __tablename__ = "scholarships"
    id = Column(Integer, primary_key=True)
    code = Column(String(64), unique=True, index=True, nullable=True)
    name = Column(String(255), nullable=False)
    provider = Column(String(200), nullable=False)
    provider_category = Column(String(64), default="central_govt")  # central_govt|state_govt|corporate_csr|foundation|institutional
    description = Column(Text, nullable=True)
    geographic_coverage = Column(String(64), default="all_india")   # all_india|tamil_nadu|state_specific
    eligible_states = Column(String(500), default="ALL")
    domicile_required = Column(Boolean, default=False)
    domicile_state = Column(String(100), nullable=True)
    education_levels = Column(String(255), nullable=False)          # Class 10,Class 11,Class 12,Diploma,UG,PG,PhD,Vocational
    eligible_courses = Column(Text, default="all")                  # Engineering, Medicine, Arts, Science, Commerce or all
    institution_types = Column(String(200), default="all")          # government,government-aided,private,all
    academic_year = Column(String(32), default="2026-27")
    min_marks_percent = Column(Float, nullable=True)
    max_family_income = Column(Float, nullable=True)
    eligible_categories = Column(String(200), default="all")        # SC,ST,OBC,BC,MBC,DNC,EWS,Minority,General,all
    gender_restriction = Column(String(32), default="all")          # female|male|all
    age_limit = Column(Integer, nullable=True)
    special_eligibility_criteria = Column(Text, nullable=True)      # JSON list/dict of special condition flags
    benefit_amount_inr = Column(Float, nullable=True)
    benefit_description = Column(String(500), nullable=False)
    benefit_type = Column(String(64), default="annual_scholarship") # monthly_stipend|annual_scholarship|tuition_fee_reimbursement|maintenance_allowance|fee_concession|fixed_amount
    benefit_duration = Column(String(120), nullable=True)
    renewal_requirements = Column(Text, nullable=True)
    required_documents = Column(Text, nullable=True)                # JSON array: [{name, mandatory, description, confirmed}]
    application_open_date = Column(String(20), nullable=True)
    application_close_date = Column(String(20), nullable=True)
    deadline_verification_status = Column(String(32), default="unconfirmed") # confirmed|tentative|closed|unconfirmed
    application_mode = Column(String(64), default="online_portal")  # online_portal|offline|institution_level
    official_info_url = Column(String(500), nullable=True)
    official_application_url = Column(String(500), nullable=True)
    official_url = Column(String(500), nullable=True)               # Backwards compatibility
    application_portal_name = Column(String(150), nullable=True)
    source_name = Column(String(150), default="National Scholarship Portal")
    source_type = Column(String(64), default="official_portal")     # official_portal|government_order|department_notification|guideline_pdf
    source_publication_date = Column(String(50), nullable=True)
    last_verified = Column(DateTime, nullable=True)
    verification_status = Column(String(32), default="NEEDS_REVERIFICATION") # VERIFIED_ACTIVE|VERIFIED_UPCOMING|VERIFIED_CLOSED|VERIFIED_RECURRING|NEEDS_REVERIFICATION|UNVERIFIED|RETIRED_OR_DISCONTINUED
    verification_notes = Column(Text, nullable=True)
    application_steps = Column(Text, nullable=True)                 # JSON array: [{step_number, title, instruction, is_mandatory}]

    eligibility_rules = relationship("ScholarshipEligibilityRule", back_populates="scholarship", cascade="all, delete-orphan")
    sources = relationship("ScholarshipSource", back_populates="scholarship", cascade="all, delete-orphan")
    saved_by_users = relationship("SavedScholarship", back_populates="scholarship", cascade="all, delete-orphan")
    verification_history = relationship("ScholarshipVerificationHistory", back_populates="scholarship", cascade="all, delete-orphan")


class ScholarshipEligibilityRule(Base):
    __tablename__ = "scholarship_eligibility_rules"
    id = Column(Integer, primary_key=True)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"))
    rule_type = Column(String(64))  # income_max|category|state|min_marks|gender|education_level|course|institution_type|domicile|special_condition
    rule_value = Column(String(255))
    is_mandatory = Column(Boolean, default=True)
    description = Column(String(500), nullable=True)

    scholarship = relationship("Scholarship", back_populates="eligibility_rules")


class ScholarshipSource(Base):
    __tablename__ = "scholarship_sources"
    id = Column(Integer, primary_key=True)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"))
    title = Column(String(255), nullable=False)
    url = Column(String(500), nullable=False)
    source_type = Column(String(64), default="official_portal")
    verified_at = Column(DateTime, default=now)
    status = Column(String(32), default="verified")  # verified|unverified|broken
    notes = Column(Text, nullable=True)

    scholarship = relationship("Scholarship", back_populates="sources")


class ScholarshipVerificationHistory(Base):
    __tablename__ = "scholarship_verification_history"
    id = Column(Integer, primary_key=True)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"))
    field_name = Column(String(100), nullable=False)
    old_value = Column(Text, nullable=True)
    new_value = Column(Text, nullable=True)
    source_url = Column(String(500), nullable=True)
    verified_by = Column(String(100), default="system_curator")
    verification_notes = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=now)

    scholarship = relationship("Scholarship", back_populates="verification_history")


class UserScholarshipProfile(Base):
    __tablename__ = "user_scholarship_profiles"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    # Step 1: Education Details
    education_level = Column(String(64), nullable=True)             # Class 10, Class 11, Class 12, Diploma, Undergraduate, Postgraduate, PhD / Research, Vocational / ITI, Other
    course_name = Column(String(150), nullable=True)                # e.g., B.Tech Computer Science, B.Sc Physics, MBBS
    stream = Column(String(100), nullable=True)                     # e.g., Science, Commerce, Arts, Technical
    year_of_study = Column(String(32), nullable=True)               # e.g., 1st Year, 2nd Year, Final Year
    previous_qualification = Column(String(100), nullable=True)     # e.g., Class 12, Class 10, Diploma
    previous_marks_percent = Column(Float, nullable=True)           # e.g., 85.5
    previous_cgpa = Column(Float, nullable=True)                    # e.g., 8.8
    grading_system = Column(String(32), default="percentage")       # percentage|cgpa_10|cgpa_4
    passing_year = Column(Integer, nullable=True)                   # e.g., 2025
    institution_name = Column(String(255), nullable=True)
    institution_type = Column(String(64), default="government")     # government|government-aided|private|other
    study_mode = Column(String(32), default="full-time")            # full-time|part-time|distance
    academic_year_needed = Column(String(32), default="2026-27")
    admission_status = Column(String(32), default="confirmed")      # confirmed|seeking_admission|lateral_entry

    # Step 2: Location & Domicile
    country = Column(String(64), default="India")
    state = Column(String(64), default="Tamil Nadu")
    district = Column(String(100), nullable=True)
    current_study_state = Column(String(64), default="Tamil Nadu")
    permanent_state = Column(String(64), default="Tamil Nadu")
    domicile_state = Column(String(64), default="Tamil Nadu")
    has_domicile_certificate = Column(Boolean, default=True)

    # Step 3: Social Category
    social_category = Column(String(64), default="General")         # General|SC|ST|OBC|BC|MBC / DNC|EWS|Minority|Other|prefer_not_to_say
    has_community_certificate = Column(Boolean, default=True)

    # Step 4: Financial Details
    annual_family_income = Column(Float, nullable=True)             # in INR, e.g. 180000
    has_income_certificate = Column(Boolean, default=True)
    income_certificate_valid = Column(Boolean, default=True)

    # Step 5: Conditional & Special Details
    gender = Column(String(32), nullable=True)                      # female|male|other|prefer_not_to_say
    has_disability = Column(Boolean, default=False)
    disability_percentage = Column(Float, nullable=True)            # e.g. 40.0
    has_disability_certificate = Column(Boolean, default=False)
    is_first_generation_graduate = Column(Boolean, default=False)
    is_single_girl_child = Column(Boolean, default=False)
    is_orphan_or_single_parent = Column(Boolean, default=False)
    is_hosteller = Column(Boolean, default=False)                   # True=Hostel resident, False=Day scholar
    is_ex_servicemen_family = Column(Boolean, default=False)
    studied_govt_school_tn = Column(Boolean, default=False)         # Tamil Nadu Govt School (Class 6-12) for Pudhumai Penn / Tamil Pudhalvan
    sports_cultural_quota = Column(Boolean, default=False)
    entrance_exam_qualified = Column(String(150), nullable=True)    # e.g. JEE, NEET, NMMS, GATE, TNEA
    academic_achievements = Column(Text, nullable=True)
    has_completed_onboarding = Column(Boolean, default=False)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User", back_populates="scholarship_profile")


class SavedScholarship(Base):
    __tablename__ = "saved_scholarships"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"))
    status = Column(String(64), default="saved") # saved|checking_eligibility|preparing_documents|ready_to_apply|applied|institution_verification_pending|provider_verification_pending|awarded|rejected|not_pursuing
    application_reference_no = Column(String(120), nullable=True)
    notes = Column(Text, nullable=True)
    deadline_reminder = Column(Boolean, default=True)
    eligibility_snapshot = Column(Text, nullable=True) # JSON snapshot of eligibility status and breakdown
    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User", back_populates="saved_scholarships")
    scholarship = relationship("Scholarship", back_populates="saved_by_users")


# ---------------------------------------------------------------- AI / rec
class AIConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=now)

    user = relationship("User", back_populates="conversations")
    messages = relationship("AIMessage", back_populates="conversation", order_by="AIMessage.id")


class AIMessage(Base):
    __tablename__ = "ai_messages"
    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id"))
    role = Column(String(16))  # user|assistant
    content = Column(Text)
    created_at = Column(DateTime, default=now)

    conversation = relationship("AIConversation", back_populates="messages")


class Recommendation(Base):
    """Versioned snapshot of recommendations — lifecycle-aware and profile-persistent."""
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"), nullable=True)
    
    profile_version = Column(Integer, default=1)
    career_dna_version = Column(Integer, default=1)
    lifecycle_stage = Column(String(32), nullable=True)  # class10|class12|ug|pg|professional
    recommendation_type = Column(String(32), default="career")  # career|higher_study|career_pathway
    engine_version = Column(String(32), default="v2_domain_aware")
    status = Column(String(32), default="active")  # active|superseded|archived
    idempotency_hash = Column(String(64), index=True, nullable=True)
    selected_item_id = Column(Integer, nullable=True)
    
    score = Column(Float, nullable=True)
    reasoning_json = Column(JSON, nullable=True)
    profile_snapshot_json = Column(JSON, nullable=True)
    recommendation_data = Column(JSON, nullable=True)
    ai_model_used = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=now)

    user = relationship("User", back_populates="recommendations")
    items = relationship("RecommendationItem", back_populates="recommendation", cascade="all, delete-orphan")


class RecommendationItem(Base):
    """Ranked item within a recommendation snapshot."""
    __tablename__ = "recommendation_items"
    id = Column(Integer, primary_key=True)
    recommendation_id = Column(Integer, ForeignKey("recommendations.id", ondelete="CASCADE"))
    item_type = Column(String(32))  # career|higher_study|career_pathway
    item_reference = Column(String(160))  # career slug or program title
    title = Column(String(200))
    sector_or_field = Column(String(120), nullable=True)
    rank = Column(Integer)
    score = Column(Float)
    match_level = Column(String(16), default="High")  # High|Medium|Low
    eligibility_status = Column(String(32), default="Eligible")  # Eligible|Prerequisite_Required|Conditional
    structured_reasons = Column(JSON, nullable=True)  # {evidence, requirement, tradeoffs, confidence, why_fit}
    created_at = Column(DateTime, default=now)

    recommendation = relationship("Recommendation", back_populates="items")


class ExternalDataSource(Base):
    __tablename__ = "external_data_sources"
    id = Column(Integer, primary_key=True)
    provider = Column(String(64))
    source_name = Column(String(160))
    source_url = Column(String(300), nullable=True)
    type = Column(String(32))  # college|scholarship|geocoding
    status = Column(String(16), default="fallback_dataset")  # live|fallback_dataset|disabled
    last_sync = Column(DateTime, nullable=True)
    reliability = Column(String(16), default="unverified")
    notes = Column(String(300), nullable=True)


# Register professional planner models on SQLAlchemy Base
from .professional_models import (  # noqa: F401, E402
    ProfessionalProfile,
    ProfessionalRole,
    ProfessionalRoleSkill,
    ProfessionalLearningResource,
    ProfessionalCareerPlan,
    ProfessionalPlanStep,
)

