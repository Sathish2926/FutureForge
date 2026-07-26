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
    marks = Column(Float)
    state = Column(String)
    location = Column(String)
    community = Column(String)
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

    user = relationship("User", back_populates="profile")


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

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="career_dna")
    academic = relationship("CareerDNAAcademic", back_populates="career_dna", uselist=False, cascade="all, delete-orphan")
    personality_answers = relationship("CareerDNAPersonality", back_populates="career_dna", cascade="all, delete-orphan")


class CareerDNAAcademic(Base):
    __tablename__ = "career_dna_academic"

    id = Column(Integer, primary_key=True, index=True)
    career_dna_id = Column(Integer, ForeignKey("career_dna.id"), unique=True)

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

    career_dna = relationship("CareerDNA", back_populates="academic")


class CareerDNAPersonality(Base):
    __tablename__ = "career_dna_personality"

    id = Column(Integer, primary_key=True, index=True)
    career_dna_id = Column(Integer, ForeignKey("career_dna.id"))

    scenario_key = Column(String)
    selected_option = Column(String)

    career_dna = relationship("CareerDNA", back_populates="personality_answers")