from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, Text, JSON, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

class RecommendationWeightConfig(Base):
    __tablename__ = "recommendation_weight_configs"

    id = Column(Integer, primary_key=True, index=True)
    academic_weight = Column(Float, default=0.25)
    skills_weight = Column(Float, default=0.30)
    interest_weight = Column(Float, default=0.20)
    personality_weight = Column(Float, default=0.10)
    goal_weight = Column(Float, default=0.10)
    location_weight = Column(Float, default=0.05)
    is_active = Column(Boolean, default=True)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    version = Column(Integer, default=1)
    match_percentage = Column(Float)
    confidence_score = Column(Float)
    
    # Explainable AI Fields
    why_recommended = Column(Text)
    why_not_others = Column(Text)
    strengths = Column(JSON)
    weaknesses = Column(JSON)
    missing_skills = Column(JSON)
    learning_suggestions = Column(JSON)
    weights_used = Column(JSON)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="recommendations")
    career = relationship("Career", back_populates="recommendations")