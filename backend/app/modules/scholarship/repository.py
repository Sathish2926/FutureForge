"""Scholarship module repository exports."""

from app.repositories.scholarship import ScholarshipRepository
from app.repositories.scholarship_profile import ScholarshipProfileRepository
from app.repositories.scholarship_bookmark import ScholarshipBookmarkRepository

__all__ = [
    "ScholarshipRepository",
    "ScholarshipProfileRepository",
    "ScholarshipBookmarkRepository",
]
