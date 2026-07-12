from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum

class RoleEnum(str, enum.Enum):
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    role = Column(Enum(RoleEnum), default=RoleEnum.STUDENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    profile = relationship("Profile", back_populates="user", uselist=False)
    assessments = relationship("Assessment", back_populates="user")
    saved_careers = relationship("SavedCareer", back_populates="user")
    saved_colleges = relationship("SavedCollege", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    education_level = Column(String)
    marks = Column(Float)
    skills = Column(JSON) # List of skills
    interests = Column(JSON) # List of interests
    budget = Column(Float)
    preferred_location = Column(String)
    career_goal = Column(String)
    learning_style = Column(String)
    languages = Column(JSON)
    financial_background = Column(String)
    hostel_requirement = Column(Boolean, default=False)
    gov_or_private = Column(String)
    
    # Career DNA Scores
    dna_analytical = Column(Float, default=0.0)
    dna_creativity = Column(Float, default=0.0)
    dna_leadership = Column(Float, default=0.0)
    dna_programming = Column(Float, default=0.0)
    dna_problem_solving = Column(Float, default=0.0)
    dna_communication = Column(Float, default=0.0)
    dna_critical_thinking = Column(Float, default=0.0)
    dna_teamwork = Column(Float, default=0.0)
    dna_entrepreneurship = Column(Float, default=0.0)
    dna_learning_ability = Column(Float, default=0.0)

    user = relationship("User", back_populates="profile")

class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    avg_salary = Column(Float)
    demand_score = Column(Float)
    future_scope = Column(String)
    required_skills = Column(JSON)
    
class College(Base):
    __tablename__ = "colleges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    avg_fees = Column(Float)
    placement_rate = Column(Float)
    has_hostel = Column(Boolean)
    is_private = Column(Boolean)
    ranking = Column(Integer)
    courses = Column(JSON)
    
class Assessment(Base):
    __tablename__ = "assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Float)
    responses = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="assessments")

class SavedCareer(Base):
    __tablename__ = "saved_careers"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="saved_careers")

class SavedCollege(Base):
    __tablename__ = "saved_colleges"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    college_id = Column(Integer, ForeignKey("colleges.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="saved_colleges")
