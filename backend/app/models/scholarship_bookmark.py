"""Scholarship bookmark model."""

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class ScholarshipBookmark(Base):
    __tablename__ = "scholarship_bookmarks"
    __table_args__ = (UniqueConstraint("user_id", "scholarship_id", name="uq_user_scholarship_bookmark"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"), nullable=False, index=True)
    status = Column(String, default="saved")  # saved, applied, rejected
    notes = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="scholarship_bookmarks")
    scholarship = relationship("Scholarship", back_populates="bookmarks")
