"""Application schemas."""

from .base import MessageResponse
from .scholarship import (
    ScholarshipBookmarkCreate,
    ScholarshipBookmarkRead,
    ScholarshipDashboardResponse,
    ScholarshipDetailResponse,
    ScholarshipProfileCreate,
    ScholarshipProfileRead,
    ScholarshipProfileUpdate,
    ScholarshipRecommendationResponse,
)

__all__ = [
    "MessageResponse",
    "ScholarshipBookmarkCreate",
    "ScholarshipBookmarkRead",
    "ScholarshipDashboardResponse",
    "ScholarshipDetailResponse",
    "ScholarshipProfileCreate",
    "ScholarshipProfileRead",
    "ScholarshipProfileUpdate",
    "ScholarshipRecommendationResponse",
]