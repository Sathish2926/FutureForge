"""
SQLAlchemy models for Universal Degree Guidance Module.
Conforms to Section 1 Data Model:
- degrees
- career_paths
- higher_studies
- certifications
- government_exams
- career_switch
- entrepreneurship
- roadmap_template
- unmatched_inputs
Every row with a factual claim carries sourceUrl + lastReviewed.
"""

from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, ForeignKey, JSON, Boolean, DateTime
)
from sqlalchemy.orm import relationship
from .database import Base

def now_iso():
    return datetime.utcnow().isoformat()

class DegreeModel(Base):
    __tablename__ = "degrees"

    degree_id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    aliases = Column(JSON, nullable=False, default=list) # Array of strings
    level = Column(String(32), nullable=False) # UG, PG, Professional, Vocational, Diploma
    discipline = Column(String(128), nullable=False)
    duration = Column(String(64), nullable=False)
    specializations = Column(JSON, nullable=True, default=list)
    regulator = Column(String(64), nullable=False) # UGC, AICTE, NMC, PCI, BCI, COA, ICAR, NCTE, etc.
    overview = Column(Text, nullable=False) # 2-4 curriculum-grounded sentences
    key_skills = Column(JSON, nullable=False, default=list)
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)
    needsVerification = Column(Boolean, default=False)

    # Relationships
    career_paths = relationship("CareerPathModel", back_populates="degree", cascade="all, delete-orphan")
    higher_studies = relationship("HigherStudyModel", back_populates="degree", cascade="all, delete-orphan")
    certifications = relationship("CertificationModel", back_populates="degree", cascade="all, delete-orphan")
    government_exams = relationship("GovernmentExamModel", back_populates="degree", cascade="all, delete-orphan")
    career_switch = relationship("CareerSwitchModel", back_populates="degree", cascade="all, delete-orphan")
    entrepreneurship = relationship("EntrepreneurshipModel", back_populates="degree", cascade="all, delete-orphan")
    roadmap_templates = relationship("RoadmapTemplateModel", back_populates="degree", cascade="all, delete-orphan")

class CareerPathModel(Base):
    __tablename__ = "career_paths"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    role_title = Column(String(255), nullable=False)
    tier = Column(String(32), nullable=False) # entry, senior
    employer_type = Column(String(32), nullable=False) # private, psu, government, self
    career_type = Column(String(32), default="Direct") # Direct, Related, Advanced, Regulated, Exploratory
    match_rationale = Column(Text, nullable=False) # Why this degree fits, referencing actual curriculum
    indicative_salary = Column(JSON, nullable=False) # {min, max, unit, region, year, source}
    skills = Column(JSON, default=list)
    top_employers = Column(JSON, default=list)
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="career_paths")

class HigherStudyModel(Base):
    __tablename__ = "higher_studies"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    program_name = Column(String(255), nullable=False)
    level = Column(String(32), nullable=False) # PG, Doctoral, Executive
    entrance_exams = Column(JSON, nullable=False, default=list)
    eligibility_rule = Column(Text, nullable=False)
    typical_duration = Column(String(64), nullable=False)
    top_institutes = Column(JSON, default=list)
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="higher_studies")

class CertificationModel(Base):
    __tablename__ = "certifications"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    cert_name = Column(String(255), nullable=False)
    provider = Column(String(255), nullable=False)
    domain = Column(String(128), nullable=False)
    level = Column(String(32), default="Intermediate")
    prerequisites = Column(JSON, default=list)
    official_url = Column(String(512), nullable=False)
    cost_band = Column(String(64), default="Medium (5k-20k)")
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="certifications")

class GovernmentExamModel(Base):
    __tablename__ = "government_exams"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    exam_or_post_name = Column(String(255), nullable=False)
    conducting_body = Column(String(255), nullable=False)
    eligibility_rule = Column(JSON, nullable=False) # structured rule or notification reference
    is_generalist_fallback = Column(Boolean, default=False)
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False) # max 6 months old

    degree = relationship("DegreeModel", back_populates="government_exams")

class CareerSwitchModel(Base):
    __tablename__ = "career_switch"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    target_role = Column(String(255), nullable=False)
    pivot_reason = Column(Text, nullable=False)
    why_feasible = Column(Text, nullable=True)
    bridge_steps = Column(JSON, nullable=False, default=list) # [{step, title, type, detail, estimatedMonths}]
    typical_duration = Column(String(64), nullable=False)
    recommended_certs = Column(JSON, default=list)
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="career_switch")

class EntrepreneurshipModel(Base):
    __tablename__ = "entrepreneurship"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    idea_title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    first_milestones = Column(JSON, nullable=False, default=list)
    relevant_schemes = Column(JSON, nullable=False, default=list) # [{name, agency, benefits, sourceUrl}]
    sourceUrl = Column(String(512), nullable=False)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="entrepreneurship")

class RoadmapTemplateModel(Base):
    __tablename__ = "roadmap_template"

    id = Column(String(64), primary_key=True)
    degree_id = Column(String(64), ForeignKey("degrees.degree_id"), nullable=False, index=True)
    status = Column(String(32), nullable=False) # pursuing / completed
    phases = Column(JSON, nullable=False, default=list) # [{stepNumber, title, timeframe, tag, tasks, milestone}]
    sourceUrl = Column(String(512), nullable=True)
    lastReviewed = Column(String(32), nullable=False)

    degree = relationship("DegreeModel", back_populates="roadmap_templates")

class UnmatchedInputModel(Base):
    __tablename__ = "unmatched_inputs"

    id = Column(String(64), primary_key=True)
    raw_query = Column(String(255), nullable=False, index=True)
    timestamp = Column(String(64), default=now_iso)
    resolved_to = Column(String(64), nullable=True) # degree_id if resolved
    frequency = Column(Integer, default=1)
    status = Column(String(32), default="pending") # pending, resolved, ignored
