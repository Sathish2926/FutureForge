"""Repository layer for database access."""

from .scholarship import ScholarshipRepository
from .scholarship_profile import ScholarshipProfileRepository
from .scholarship_bookmark import ScholarshipBookmarkRepository

__all__ = [
    "ScholarshipRepository",
    "ScholarshipProfileRepository",
    "ScholarshipBookmarkRepository",
]