from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

class EntranceExam(Base):
    __tablename__ = "entrance_exams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    full_name = Column(String)
    eligibility = Column(Text)
    syllabus = Column(JSON)
    difficulty = Column(String)
    timeline_start = Column(DateTime)
    timeline_end = Column(DateTime)
    preparation_tips = Column(Text)
    official_website = Column(String)
    
    # KMS Linking
    careers = relationship("ExamCareerLink", back_populates="exam")


class ExamCareerLink(Base):
    __tablename__ = "exam_career_links"
    
    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("entrance_exams.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    exam = relationship("EntranceExam", back_populates="careers")
    # career = relationship("Career")
