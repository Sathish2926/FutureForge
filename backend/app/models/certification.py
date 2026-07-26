from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

class LearningPlatform(Base):
    __tablename__ = "learning_platforms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    is_free = Column(Boolean, default=False)
    focus_areas = Column(JSON)
    url = Column(String)
    
    certifications = relationship("Certification", back_populates="platform")


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    provider_name = Column(String)
    platform_id = Column(Integer, ForeignKey("learning_platforms.id"), nullable=True)
    level = Column(String) # Beginner, Intermediate, Advanced
    url = Column(String)
    description = Column(Text)
    
    # KMS Linking
    careers = relationship("CertificationCareerLink", back_populates="certification")
    platform = relationship("LearningPlatform", back_populates="certifications")


class CertificationCareerLink(Base):
    __tablename__ = "certification_career_links"
    
    id = Column(Integer, primary_key=True, index=True)
    certification_id = Column(Integer, ForeignKey("certifications.id"))
    career_id = Column(Integer, ForeignKey("careers.id"))
    
    certification = relationship("Certification", back_populates="careers")
    # career = relationship("Career")
