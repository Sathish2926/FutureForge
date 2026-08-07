from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    education_level = Column(String)
    institution = Column(String)
    school = Column(String)
    college = Column(String)
    company = Column(String)
    marks = Column(Float)
    state = Column(String)
    district = Column(String)
    location = Column(String)
    community = Column(String)
    current_course = Column(String)
    gender = Column(String)
    dob = Column(String)
    family_income = Column(Float)
    has_disability = Column(Boolean, default=False)
    skills = Column(JSON)
    interests = Column(JSON)
    budget = Column(Float)
    preferred_location = Column(String)
    career_goal = Column(String)
    occupation = Column(String)
    learning_style = Column(String)
    languages = Column(JSON)
    financial_background = Column(String)
    hostel_requirement = Column(Boolean, default=False)
    gov_or_private = Column(String)
    
    # Newly added fields for Career DNA goals
    salary_expectation = Column(String)
    goal_timeline = Column(String)
    work_life_balance = Column(String)
    
    # Academic & Professional Information merged from CareerDNAAcademic
    board = Column(String)
    stream = Column(String)
    favorite_subjects = Column(JSON)
    weak_subjects = Column(JSON)
    dream_stream = Column(String)
    coaching = Column(Boolean)
    entrance_exam = Column(String)
    preferred_degree = Column(String)
    degree = Column(String)
    department = Column(String)
    cgpa = Column(Float)
    backlogs = Column(Integer)
    projects = Column(Integer)
    internships = Column(Integer)
    industry = Column(String)
    experience_years = Column(Float)
    current_role = Column(String)
    salary_range = Column(String)
    certifications = Column(JSON)

    user = relationship("User", back_populates="profile")

    @property
    def career_dna_completed(self) -> bool:
        if self.user and self.user.career_dna:
            return self.user.career_dna.is_completed
        return False


class CareerDNA(Base):
    __tablename__ = "career_dna"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    user_type = Column(String)
    completion_percentage = Column(Integer, default=0)
    last_completed_step = Column(Integer, default=1)
    is_completed = Column(Boolean, default=False)

    analytical = Column(Float, default=0.0)
    creativity = Column(Float, default=0.0)
    leadership = Column(Float, default=0.0)
    programming = Column(Float, default=0.0)
    problem_solving = Column(Float, default=0.0)
    communication = Column(Float, default=0.0)
    critical_thinking = Column(Float, default=0.0)
    teamwork = Column(Float, default=0.0)
    entrepreneurship = Column(Float, default=0.0)
    learning_ability = Column(Float, default=0.0)
    business_orientation = Column(Float, default=0.0)
    financial_thinking = Column(Float, default=0.0)
    public_service = Column(Float, default=0.0)

    # Generated fields
    career_identity = Column(String, nullable=True)
    strengths = Column(JSON, nullable=True)
    growth_areas = Column(JSON, nullable=True)
    learning_style = Column(String, nullable=True)
    work_style = Column(String, nullable=True)
    decision_style = Column(String, nullable=True)
    motivation = Column(String, nullable=True)
    career_readiness = Column(String, nullable=True)
    goal_reality_check = Column(String, nullable=True)
    confidence_scores = Column(JSON, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="career_dna")
    personality_answers = relationship("CareerDNAPersonality", back_populates="career_dna", cascade="all, delete-orphan")


class CareerDNAPersonality(Base):
    __tablename__ = "career_dna_personality"

    id = Column(Integer, primary_key=True, index=True)
    career_dna_id = Column(Integer, ForeignKey("career_dna.id"))

    scenario_key = Column(String)
    selected_option = Column(String)

    career_dna = relationship("CareerDNA", back_populates="personality_answers")