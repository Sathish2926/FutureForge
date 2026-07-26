from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    industry = Column(String)
    base_salary_min = Column(Float)
    base_salary_max = Column(Float)
    demand_score = Column(Float)
    difficulty = Column(String)
    future_scope = Column(String)
    required_education = Column(String)
    required_skills = Column(JSON)

    roadmaps = relationship("Roadmap", back_populates="career")
    recommendations = relationship("Recommendation", back_populates="career")
    skills = relationship("CareerSkill", back_populates="career")
    saved_careers = relationship("SavedCareer", back_populates="career")
    
    # Career Intelligence Extensions
    detail = relationship("CareerDetail", back_populates="career", uselist=False, cascade="all, delete-orphan")
    insight = relationship("CareerInsight", back_populates="career", uselist=False, cascade="all, delete-orphan")
    timeline = relationship("CareerTimeline", back_populates="career", cascade="all, delete-orphan")
    learning_resources = relationship("CareerLearningResource", back_populates="career", cascade="all, delete-orphan")
    related_to = relationship("RelatedCareer", foreign_keys="[RelatedCareer.career_id]", back_populates="career")


class CareerSkill(Base):
    __tablename__ = "career_skills"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    skill_name = Column(String)
    importance = Column(Float)
    
    # Career Intelligence Extension
    difficulty = Column(String, default="Medium")
    estimated_learning_time = Column(String, default="3 months")

    career = relationship("Career", back_populates="skills")


class SavedCareer(Base):
    __tablename__ = "saved_careers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="saved_careers")
    career = relationship("Career", back_populates="saved_careers")


class CareerDetail(Base):
    __tablename__ = "career_details"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"), unique=True)
    
    responsibilities = Column(JSON)
    daily_work = Column(Text)
    growth_opportunities = Column(Text)
    work_environment = Column(Text)
    work_life_balance = Column(String)
    remote_opportunities = Column(String)

    career = relationship("Career", back_populates="detail")


class CareerInsight(Base):
    __tablename__ = "career_insights"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"), unique=True)

    automation_risk = Column(String)
    industry_growth = Column(String)
    top_hiring_industries = Column(JSON)
    global_opportunities = Column(Text)

    career = relationship("Career", back_populates="insight")


class CareerTimeline(Base):
    __tablename__ = "career_timeline"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    stage_order = Column(Integer)
    stage_name = Column(String)
    estimated_months = Column(Integer)
    description = Column(Text)

    career = relationship("Career", back_populates="timeline")


class CareerLearningResource(Base):
    __tablename__ = "career_learning_resources"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    level = Column(String) # Beginner, Intermediate, Advanced
    type = Column(String) # Course, Book, Certification, Project
    title = Column(String)
    url = Column(String)
    description = Column(Text)

    career = relationship("Career", back_populates="learning_resources")


class RelatedCareer(Base):
    __tablename__ = "related_careers"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"))
    related_career_id = Column(Integer, ForeignKey("careers.id"))
    similarity_score = Column(Float)
    reason = Column(String)

    career = relationship("Career", foreign_keys=[career_id], back_populates="related_to")
    related_career = relationship("Career", foreign_keys=[related_career_id])


class CareerBookmark(Base):
    __tablename__ = "career_bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    is_liked = Column(Integer, default=0) # SQLite/SQLAlchemy Boolean compatibility: Can use Integer or Boolean. I'll use Boolean from sqlalchemy. Let's assume boolean. Wait, I didn't import Boolean. Let's just use string or integer, or add Boolean.
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
    career = relationship("Career")


class CareerComparison(Base):
    __tablename__ = "career_comparisons"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_ids = Column(JSON) # List of career IDs
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")