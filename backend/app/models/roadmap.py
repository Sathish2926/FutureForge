from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    title = Column(String)
    description = Column(Text)
    estimated_completion_months = Column(Integer, default=12)
    completion_percentage = Column(Float, default=0.0)
    status = Column(String, default="active") # active, completed, abandoned
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User")
    career = relationship("Career", back_populates="roadmaps")
    milestones = relationship("RoadmapMilestone", back_populates="roadmap", cascade="all, delete-orphan")


class RoadmapMilestone(Base):
    __tablename__ = "roadmap_milestones"

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    title = Column(String)
    description = Column(Text)
    sequence_order = Column(Integer)
    difficulty = Column(String)
    status = Column(String, default="pending") # pending, in_progress, completed
    target_date = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))

    roadmap = relationship("Roadmap", back_populates="milestones")
    learning_plans = relationship("LearningPlan", back_populates="milestone", cascade="all, delete-orphan")
    projects = relationship("ProjectRecommendation", back_populates="milestone", cascade="all, delete-orphan")


class LearningPlan(Base):
    __tablename__ = "learning_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    milestone_id = Column(Integer, ForeignKey("roadmap_milestones.id"))
    skill_name = Column(String)
    status = Column(String, default="pending")
    estimated_hours = Column(Integer)
    resource_type = Column(String) # Course, Certification, Book
    resource_link = Column(String)
    
    milestone = relationship("RoadmapMilestone", back_populates="learning_plans")


class ProjectRecommendation(Base):
    __tablename__ = "project_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    milestone_id = Column(Integer, ForeignKey("roadmap_milestones.id"))
    title = Column(String)
    level = Column(String) # Beginner, Intermediate, Advanced
    description = Column(Text)
    github_link_idea = Column(String)
    is_completed = Column(Boolean, default=False)
    
    milestone = relationship("RoadmapMilestone", back_populates="projects")


class UserSkillProgress(Base):
    __tablename__ = "user_skill_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_name = Column(String)
    proficiency_level = Column(String) # Beginner, Intermediate, Advanced, Master
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User")


class Reminder(Base):
    __tablename__ = "reminders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"), nullable=True)
    milestone_id = Column(Integer, ForeignKey("roadmap_milestones.id"), nullable=True)
    title = Column(String)
    due_date = Column(DateTime(timezone=True))
    is_notified = Column(Boolean, default=False)
    
    user = relationship("User")