"""Service layer exports."""

from .health import get_service_status
from .scholarships import ScholarshipRecommendationService, ScholarshipProfileNotFoundError

__all__ = [
    "get_service_status",
    "ScholarshipRecommendationService",
    "ScholarshipProfileNotFoundError",
]