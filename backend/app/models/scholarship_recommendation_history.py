"""Scholarship recommendation history model."""

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class ScholarshipRecommendationHistory(Base):
    __tablename__ = "scholarship_recommendation_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"), nullable=False)
    match_score = Column(Float, default=0.0)
    eligibility_status = Column(String, default="pending")
    recommendation_reasons = Column(JSON)
    generated_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="scholarship_recommendation_history")
    scholarship = relationship("Scholarship")
