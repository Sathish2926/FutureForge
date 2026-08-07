from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True) # e.g. Leadership, Analytical Thinking
    type = Column(String) # e.g. likert, scenario, ranking
    level = Column(Integer, default=1) # 1: Universal, 2: Occupation, 3: Career Goal
    occupation = Column(String, nullable=True)
    education = Column(String, nullable=True)
    career_goals = Column(JSON, nullable=True)
    difficulty = Column(Float, default=1.0)
    text = Column(Text)
    metadata_json = Column(JSON, nullable=True)

    options = relationship("AssessmentOption", back_populates="question", cascade="all, delete-orphan")
    responses = relationship("AssessmentResponse", back_populates="question")


class AssessmentOption(Base):
    __tablename__ = "assessment_options"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("assessment_questions.id"))
    text = Column(Text)
    emoji = Column(String, nullable=True)
    score_mapping = Column(JSON) # e.g. {"leadership": 0.8, "decision_making": 0.5}

    question = relationship("AssessmentQuestion", back_populates="options")
    responses = relationship("AssessmentResponse", back_populates="option")


class AssessmentSession(Base):
    __tablename__ = "assessment_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="IN_PROGRESS") # IN_PROGRESS, COMPLETED
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_completed_step = Column(Integer, default=0)

    user = relationship("User", back_populates="assessment_sessions")
    responses = relationship("AssessmentResponse", back_populates="session", cascade="all, delete-orphan")


class AssessmentResponse(Base):
    __tablename__ = "assessment_responses"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("assessment_sessions.id"))
    question_id = Column(Integer, ForeignKey("assessment_questions.id"))
    option_id = Column(Integer, ForeignKey("assessment_options.id"), nullable=True)
    raw_value = Column(String, nullable=True) # For likert/ranking if no strict option
    time_taken_ms = Column(Integer, nullable=True)

    session = relationship("AssessmentSession", back_populates="responses")
    question = relationship("AssessmentQuestion", back_populates="responses")
    option = relationship("AssessmentOption", back_populates="responses")