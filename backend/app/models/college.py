from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Degree(Base):
    __tablename__ = "degrees"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    level = Column(String) # UG, PG, Diploma
    duration_years = Column(Float)
    description = Column(Text)

    college_courses = relationship("CollegeCourse", back_populates="degree")
    # KMS Linking
    careers = relationship("DegreeCareerLink", back_populates="degree")


class DegreeCareerLink(Base):
    __tablename__ = "degree_career_links"
    
    id = Column(Integer, primary_key=True, index=True)
    degree_id = Column(Integer, ForeignKey("degrees.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    relevance_score = Column(Float, default=1.0)
    
    degree = relationship("Degree", back_populates="careers")
    # career = relationship("Career")


class College(Base):
    __tablename__ = "colleges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    state = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    avg_fees = Column(Float)
    placement_rate = Column(Float)
    has_hostel = Column(Boolean)
    is_private = Column(Boolean)
    ranking = Column(Integer)
    
    # KMS expansions
    highest_package = Column(Float)
    average_package = Column(Float)
    top_recruiters = Column(JSON)
    accreditation = Column(String)
    infrastructure_details = Column(JSON)
    website = Column(String)
    established_year = Column(Integer)

    saved_colleges = relationship("SavedCollege", back_populates="college")
    courses = relationship("CollegeCourse", back_populates="college")


class CollegeCourse(Base):
    __tablename__ = "college_courses"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("colleges.id"))
    degree_id = Column(Integer, ForeignKey("degrees.id"))
    
    specialization = Column(String)
    fees_per_year = Column(Float)
    seats = Column(Integer)
    cutoff_percentile = Column(Float)
    
    college = relationship("College", back_populates="courses")
    degree = relationship("Degree", back_populates="college_courses")


class SavedCollege(Base):
    __tablename__ = "saved_colleges"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    college_id = Column(Integer, ForeignKey("colleges.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="saved_colleges")
    college = relationship("College", back_populates="saved_colleges")