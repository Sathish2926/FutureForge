"""Scholarship document model."""

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class ScholarshipDocument(Base):
    __tablename__ = "scholarship_documents"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("scholarship_profiles.id"), nullable=False, index=True)
    document_type = Column(String, nullable=False)  # income_certificate, community_certificate, etc.
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("ScholarshipProfile", back_populates="documents")
