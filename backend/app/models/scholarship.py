from sqlalchemy import Boolean, Column, DateTime, Float, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    provider = Column(String)
    amount = Column(Float, nullable=False, default=0.0)
    scholarship_type = Column(String)
    country = Column(String, default="India")
    course_level = Column(String)
    course_name = Column(String)
    minimum_percentage = Column(Float)
    maximum_family_income = Column(Float)
    age_min = Column(Integer)
    age_max = Column(Integer)
    income_limit = Column(Float)
    minimum_marks = Column(Float)
    community = Column(String)
    gender = Column(String)
    state = Column(String)
    education_level = Column(String)
    disability_required = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True, index=True)
    eligible_courses = Column(JSON)
    official_link = Column(String)
    deadline = Column(DateTime)
    application_start_date = Column(DateTime)
    application_end_date = Column(DateTime)
    official_url = Column(String)
    official_notification_url = Column(String)
    source = Column(String, index=True)
    last_synced = Column(DateTime(timezone=True))
    status = Column(String, default="active", index=True)
    required_documents = Column(JSON)
    eligibility_summary = Column(Text)
    application_mode = Column(String)
    renewal_available = Column(Boolean, default=False)
    contact_information = Column(JSON)
    faq_url = Column(String)
    application_policy = Column(String)
    compatible_with_other_schemes = Column(String)
    restrictions_on_combining = Column(Text)
    benefits = Column(Text)
    selection_process = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    bookmarks = relationship("ScholarshipBookmark", back_populates="scholarship")