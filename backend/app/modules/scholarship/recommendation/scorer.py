"""Scoring for scholarship recommendations."""

from __future__ import annotations

from app.models import Profile, Scholarship
from app.modules.scholarship.recommendation.eligibility import evaluate_eligibility

WEIGHTS = {
    "state": 20,
    "education": 20,
    "community": 15,
    "income": 15,
    "marks": 20,
    "gender": 5,
    "disability": 5,
}


def score_scholarship(profile: Profile, scholarship: Scholarship) -> dict[str, object]:
    eligibility = evaluate_eligibility(profile, scholarship)
    if eligibility.can_apply == "NO":
        return {
            "match_score": 0.0,
            "can_apply": "NO",
            "matched_criteria": eligibility.matched_criteria,
            "optional_criteria": eligibility.optional_criteria,
            "not_eligible_reason": eligibility.not_eligible_reason,
        }

    score = 0.0
    if scholarship.state in {None, "All India", profile.state}:
        score += WEIGHTS["state"]
    if scholarship.course_level in {None, profile.education_level, "UG", "PG", "Diploma", "School"}:
        score += WEIGHTS["education"]
    if scholarship.community in {None, "ALL", profile.community, "General"}:
        score += WEIGHTS["community"]
    if scholarship.maximum_family_income is None or (profile.family_income is not None and profile.family_income <= scholarship.maximum_family_income):
        score += WEIGHTS["income"]
    if scholarship.minimum_percentage is None or (profile.marks is not None and profile.marks >= scholarship.minimum_percentage):
        score += WEIGHTS["marks"]
    if scholarship.gender in {None, "All", profile.gender}:
        score += WEIGHTS["gender"]
    if not scholarship.disability_required or profile.has_disability:
        score += WEIGHTS["disability"]

    return {
        "match_score": min(score, 100.0),
        "can_apply": "YES",
        "matched_criteria": eligibility.matched_criteria,
        "optional_criteria": eligibility.optional_criteria,
        "not_eligible_reason": None,
    }
