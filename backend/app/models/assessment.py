from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class QuestionCategory(Base):
    __tablename__ = "question_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    questions = relationship("Question", back_populates="category")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("question_categories.id"))
    question = Column(Text)
    difficulty = Column(String)
    education_level = Column(String)
    marks = Column(Integer, default=1)

    category = relationship("QuestionCategory", back_populates="questions")
    options = relationship("QuestionOption", back_populates="question")
    responses = relationship("AssessmentResponse", back_populates="question")


class QuestionOption(Base):
    __tablename__ = "question_options"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    option_text = Column(Text)
    is_correct = Column(Boolean)

    question = relationship("Question", back_populates="options")
    responses = relationship("AssessmentResponse", back_populates="option")


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Float)
    responses = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="assessments")
    assessment_responses = relationship("AssessmentResponse", back_populates="assessment")


class AssessmentResponse(Base):
    __tablename__ = "assessment_responses"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    selected_option = Column(Integer, ForeignKey("question_options.id"))
    score = Column(Float)

    assessment = relationship("Assessment", back_populates="assessment_responses")
    question = relationship("Question", back_populates="responses")
    option = relationship("QuestionOption", back_populates="responses")