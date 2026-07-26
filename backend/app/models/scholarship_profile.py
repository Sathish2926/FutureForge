"""Scholarship eligibility profile model."""

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class ScholarshipProfile(Base):
    __tablename__ = "scholarship_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Academic information
    academic_stage = Column(String, nullable=False)  # class_10, class_12, diploma, ug, pg
    current_course = Column(String)
    current_year = Column(Integer)

    # Location
    state = Column(String)
    district = Column(String)

    # Demographics
    community = Column(String)  # SC, ST, BC, MBC, OBC, General, Minority
    gender = Column(String)
    nationality = Column(String, default="Indian")

    # Financial
    annual_family_income = Column(Float)
    parent_occupation = Column(String)

    # Academic performance
    percentage_cgpa = Column(Float)

    # Status flags
    has_disability = Column(Boolean, default=False)
    is_first_graduate = Column(Boolean, default=False)
    is_hosteller = Column(Boolean, default=False)
    is_government_institution = Column(Boolean, default=False)
    is_orphan = Column(Boolean, default=False)
    is_single_girl_child = Column(Boolean, default=False)
    is_minority = Column(Boolean, default=False)

    # Institution
    institution_name = Column(String)
    university = Column(String)
    institution_type = Column(String)  # government, private

    # Additional notes
    additional_info = Column(Text)

    # Profile completeness tracking
    profile_completion = Column(Float, default=0.0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="scholarship_profile")
    documents = relationship("ScholarshipDocument", back_populates="profile", cascade="all, delete-orphan")
