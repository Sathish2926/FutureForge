"""Scholarship module ORM exports."""

from app.models.scholarship import Scholarship
from app.models.scholarship_profile import ScholarshipProfile
from app.models.scholarship_bookmark import ScholarshipBookmark
from app.models.scholarship_document import ScholarshipDocument
from app.models.scholarship_recommendation_history import ScholarshipRecommendationHistory

__all__ = [
    "Scholarship",
    "ScholarshipProfile",
    "ScholarshipBookmark",
    "ScholarshipDocument",
    "ScholarshipRecommendationHistory",
]
