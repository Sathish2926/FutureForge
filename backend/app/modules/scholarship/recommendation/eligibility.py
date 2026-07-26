"""Eligibility rules for scholarship recommendations."""

from __future__ import annotations

from dataclasses import dataclass, field

from app.models import Profile, Scholarship


@dataclass(slots=True)
class EligibilityResult:
    can_apply: str
    matched_criteria: list[str] = field(default_factory=list)
    optional_criteria: list[str] = field(default_factory=list)
    not_eligible_reason: str | None = None


def evaluate_eligibility(profile: Profile, scholarship: Scholarship) -> EligibilityResult:
    matched: list[str] = []
    optional: list[str] = []

    if scholarship.state and scholarship.state not in {"All India", profile.state}:
        return EligibilityResult("NO", matched, optional, f"State mismatch: requires {scholarship.state}")
    if scholarship.course_level and profile.education_level and scholarship.course_level not in {profile.education_level, "UG", "PG", "Diploma", "School"}:
        return EligibilityResult("NO", matched, optional, f"Education level mismatch: requires {scholarship.course_level}")
    if scholarship.community and scholarship.community not in {"ALL", profile.community, "General"}:
        return EligibilityResult("NO", matched, optional, f"Community mismatch: requires {scholarship.community}")
    if scholarship.gender and scholarship.gender not in {"All", profile.gender}:
        return EligibilityResult("NO", matched, optional, f"Gender mismatch: requires {scholarship.gender}")
    if scholarship.minimum_percentage is not None and profile.marks is not None and profile.marks < scholarship.minimum_percentage:
        return EligibilityResult("NO", matched, optional, f"Minimum percentage is {scholarship.minimum_percentage}")
    if scholarship.maximum_family_income is not None and profile.family_income is not None and profile.family_income > scholarship.maximum_family_income:
        return EligibilityResult("NO", matched, optional, f"Maximum family income is {scholarship.maximum_family_income}")
    if scholarship.disability_required and not profile.has_disability:
        return EligibilityResult("NO", matched, optional, "Scholarship requires disability status")

    matched.extend([
        "State matches",
        "Education level matches",
        "Community matches",
        "Income within limit" if scholarship.maximum_family_income is not None else "No income cap",
        "Marks satisfy eligibility" if scholarship.minimum_percentage is not None else "No marks cap",
    ])
    if scholarship.gender in {"Female", "Male"}:
        optional.append("Gender-specific scheme")
    if not scholarship.disability_required:
        optional.append("Disability not required")

    return EligibilityResult("YES", matched, optional)
