"""
SQLAlchemy models for Working Professional Career Growth & Transition Planner.
Isolated models that extend FutureForge without modifying any existing tables.
"""
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from .database import Base


def now():
    return datetime.utcnow()


class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, index=True, nullable=False)

    # Current Professional Profile
    current_job_title = Column(String(160), nullable=False)
    current_industry = Column(String(120), nullable=False)
    years_experience = Column(Float, nullable=False, default=0.0)
    employment_type = Column(String(64), nullable=False, default="Full-time")  # Full-time, Part-time, Contract, Freelance, Self-employed, Other
    highest_qualification = Column(String(120), nullable=False)
    degree_specialization = Column(String(160), nullable=True)
    current_skills = Column(JSON, default=list)  # list of strings
    tools_technologies = Column(JSON, default=list)  # list of strings
    responsibilities = Column(Text, nullable=True)
    certifications = Column(JSON, default=list)  # list of strings

    # Career Goals (multi-select list of strings)
    career_goals = Column(JSON, default=list)

    # Target Career
    target_pathway = Column(String(32), default="known_target")  # known_target | help_me_choose
    target_role = Column(String(160), nullable=True)
    target_industry = Column(String(120), nullable=True)
    preferred_location = Column(String(120), nullable=True)
    preferred_work_arrangement = Column(String(64), default="No Preference")  # On-site, Hybrid, Remote, No Preference
    target_salary_range = Column(String(64), nullable=True)

    # Learning Preferences
    weekly_learning_hours = Column(Integer, default=5)
    preferred_learning_format = Column(String(64), default="Mixed")  # Videos, Documentation, Guided Courses, Practical Projects, Mixed
    learning_budget = Column(String(64), default="Free Only")  # Free Only, Low Budget, Flexible Budget
    preferred_language = Column(String(64), default="English")
    target_timeline = Column(String(64), default="Medium-term")  # Short-term, Medium-term, Flexible
    current_salary = Column(String(64), nullable=True)

    # AI / Rule-based profile analysis summary
    profile_summary = Column(Text, nullable=True)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User")


class ProfessionalRole(Base):
    __tablename__ = "professional_roles"

    id = Column(Integer, primary_key=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    title = Column(String(160), nullable=False)
    industry = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    experience_level = Column(String(64), default="Mid")  # Entry, Mid, Senior, Lead
    transition_category = Column(String(64), default="Adjacent")  # Directly Transferable, Adjacent, Reskilling Required, Career Advancement
    transferable_from = Column(JSON, default=list)  # list of keywords/roles
    typical_progression = Column(String(255), nullable=True)
    why_it_fits_template = Column(Text, nullable=True)
    transferability_notes = Column(Text, nullable=True)
    suggested_learning_areas = Column(JSON, default=list)
    possible_next_steps = Column(JSON, default=list)
    created_at = Column(DateTime, default=now)

    # Verified Knowledge Base Metadata Fields
    typical_responsibilities = Column(JSON, default=list)  # list of typical day-to-day duties
    relevant_degrees = Column(String(255), nullable=True)  # recommended degree background
    essential_qualifications = Column(String(255), nullable=True)  # mandatory licenses / degrees if applicable
    entry_level_pathways = Column(JSON, default=list)  # pathways to break in
    related_careers = Column(JSON, default=list)  # list of slugs / titles
    certifications_prerequisites = Column(JSON, default=list)  # list of {name, provider, mandatory}
    practical_projects = Column(JSON, default=list)  # portfolio / project ideas
    career_transition_guidance = Column(Text, nullable=True)  # specific tips for career changers
    location_conditions = Column(String(255), nullable=True)  # country / regulatory constraints
    source_references = Column(JSON, default=list)  # list of {source_name, url, type}
    last_verified = Column(String(32), nullable=True)  # e.g. "2026-10"
    completeness_status = Column(String(32), default="complete")  # 'complete', 'incomplete', 'needs_verification'
    review_status = Column(String(32), default="published")  # 'published', 'draft', 'pending_review'

    skills = relationship("ProfessionalRoleSkill", back_populates="role", cascade="all, delete-orphan")


class GuidanceRequestRecord(Base):
    __tablename__ = "guidance_request_records"

    id = Column(Integer, primary_key=True)
    request_id = Column(String(64), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    career_topic = Column(String(200), nullable=False)
    category = Column(String(64), default="unsupported_career")  # unsupported_career, incomplete_career_data, insufficient_profile, general_guidance
    user_context = Column(JSON, default=dict)
    reason = Column(Text, nullable=False)
    missing_categories = Column(JSON, default=list)
    status = Column(String(32), default="pending_review")  # pending_review, under_review, resolved
    created_at = Column(DateTime, default=now)
    reviewed_at = Column(DateTime, nullable=True)

    user = relationship("User")


class ProfessionalRoleSkill(Base):
    __tablename__ = "professional_role_skills"

    id = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey("professional_roles.id", ondelete="CASCADE"), index=True, nullable=False)
    skill_name = Column(String(120), nullable=False)
    category = Column(String(64), default="Technical")  # Technical, Tools & Technologies, Core Domain, Soft Skills, Leadership
    importance = Column(String(32), default="core")  # core, complementary, optional
    why_it_matters = Column(Text, nullable=False)
    recommended_priority = Column(String(16), default="High")  # High, Medium, Low
    suggested_learning_hours = Column(Integer, default=10)

    role = relationship("ProfessionalRole", back_populates="skills")


class ProfessionalLearningResource(Base):
    __tablename__ = "professional_learning_resources"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    provider = Column(String(120), nullable=False)
    related_skill = Column(String(120), nullable=False, index=True)
    description = Column(Text, nullable=False)
    cost_type = Column(String(32), default="Free")  # Free, Low Budget, Paid
    resource_type = Column(String(64), default="Course")  # Course, Documentation, Practice, Project, Certification
    url = Column(String(500), nullable=False)
    is_verified = Column(Boolean, default=True)
    last_verified = Column(String(32), nullable=True)


class ProfessionalCareerPlan(Base):
    __tablename__ = "professional_career_plans"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)
    target_role = Column(String(160), nullable=False)
    target_industry = Column(String(120), nullable=True)
    status = Column(String(32), default="active")  # active, completed, archived
    match_score = Column(Float, default=0.0)  # estimated profile-to-role match score (0-100)
    skill_gaps_summary = Column(JSON, default=dict)  # {existing: [], to_improve: [], missing: [], additional: []}
    ai_analysis = Column(Text, nullable=True)
    timeline_estimate = Column(String(64), nullable=True)
    checklist_items = Column(JSON, default=list)  # list of {id, title, category, completed}

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User")
    steps = relationship("ProfessionalPlanStep", back_populates="plan", cascade="all, delete-orphan", order_by="ProfessionalPlanStep.order_index")


class ProfessionalPlanStep(Base):
    __tablename__ = "professional_plan_steps"

    id = Column(Integer, primary_key=True)
    plan_id = Column(Integer, ForeignKey("professional_career_plans.id", ondelete="CASCADE"), index=True, nullable=False)
    stage_name = Column(String(120), nullable=False)  # Stage 1: Strengthen Foundations, etc.
    order_index = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    explanation = Column(Text, nullable=False)
    related_skill = Column(String(120), nullable=True)
    priority = Column(String(16), default="Medium")  # High, Medium, Low
    estimated_duration = Column(String(64), nullable=True)  # e.g., "3 weeks"
    estimated_hours = Column(Integer, default=15)
    resource_title = Column(String(255), nullable=True)
    resource_url = Column(String(500), nullable=True)
    resource_provider = Column(String(120), nullable=True)
    resource_cost = Column(String(32), nullable=True)
    practical_task = Column(Text, nullable=True)
    completion_status = Column(String(32), default="not_started")  # not_started, in_progress, completed
    user_notes = Column(Text, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    plan = relationship("ProfessionalCareerPlan", back_populates="steps")
