import enum

from sqlalchemy import Boolean, Column, DateTime, Enum as SAEnum, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class RoleEnum(str, enum.Enum):
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    role = Column(SAEnum(RoleEnum), default=RoleEnum.STUDENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("Profile", back_populates="user", uselist=False)
    career_dna = relationship("CareerDNA", back_populates="user", uselist=False)

    assessment_sessions = relationship("AssessmentSession", back_populates="user")
    saved_careers = relationship("SavedCareer", back_populates="user")
    saved_colleges = relationship("SavedCollege", back_populates="user")

    recommendations = relationship("Recommendation", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")

    scholarship_profile = relationship("ScholarshipProfile", back_populates="user", uselist=False)
    scholarship_bookmarks = relationship("ScholarshipBookmark", back_populates="user")
    scholarship_recommendation_history = relationship("ScholarshipRecommendationHistory", back_populates="user")