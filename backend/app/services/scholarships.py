"""Scholarship recommendation service layer — redesigned for ScholarshipProfile."""

from __future__ import annotations

from dataclasses import dataclass, field

from app.models import Scholarship, ScholarshipProfile, User
from app.repositories import ScholarshipRepository, ScholarshipBookmarkRepository
from app.schemas.scholarship import ScholarshipRecommendationResponse

from .recommendation_engine import (
    RecommendationEvaluation,
    format_percentage,
    has_token_overlap,
    is_open_ended,
    normalize_text,
)


@dataclass(slots=True)
class ScholarshipRecommendationResult:
    """Internal recommendation result used by the service and router."""

    scholarship_id: int
    title: str
    description: str | None
    amount: float
    provider: str | None
    match_score: float
    eligibility_status: str
    recommendation_reasons: list[str]
    matched_criteria: list[str] = field(default_factory=list)
    optional_criteria: list[str] = field(default_factory=list)
    can_apply: str = "NO"
    not_eligible_reason: str | None = None
    official_apply_link: str | None = None
    deadline: str | None = None
    required_documents: list[str] = field(default_factory=list)
    multiple_application_rule: str | None = None
    combining_restrictions: str | None = None
    application_mode: str | None = None
    application_policy: str | None = None
    eligibility_summary: str | None = None
    contact_information: dict | None = None
    faq_url: str | None = None
    benefits: str | None = None
    renewal_available: bool = False
    is_bookmarked: bool = False

    def to_response(self) -> ScholarshipRecommendationResponse:
        """Convert the internal result into the public response schema."""

        return ScholarshipRecommendationResponse(
            scholarship_id=self.scholarship_id,
            title=self.title,
            description=self.description,
            amount=self.amount,
            provider=self.provider,
            match_score=self.match_score,
            eligibility_status=self.eligibility_status,
            recommendation_reasons=self.recommendation_reasons,
            matched_criteria=self.matched_criteria,
            optional_criteria=self.optional_criteria,
            can_apply=self.can_apply,
            not_eligible_reason=self.not_eligible_reason,
            official_apply_link=self.official_apply_link,
            deadline=self.deadline,
            required_documents=self.required_documents,
            multiple_application_rule=self.multiple_application_rule,
            combining_restrictions=self.combining_restrictions,
            application_mode=self.application_mode,
            application_policy=self.application_policy,
            eligibility_summary=self.eligibility_summary,
            contact_information=self.contact_information,
            faq_url=self.faq_url,
            benefits=self.benefits,
            renewal_available=self.renewal_available,
            is_bookmarked=self.is_bookmarked,
        )


class ScholarshipProfileNotFoundError(Exception):
    """Raised when a student profile is required but missing."""


class ScholarshipRecommendationEngine:
    """Encapsulates scholarship eligibility and ranking rules.

    The engine is intentionally stateless so it can be reused by future
    recommendation modules with only the domain-specific inputs changed.
    """

    weights = {
        "state": 15,
        "education": 15,
        "community": 12,
        "income": 15,
        "marks": 15,
        "gender": 5,
        "disability": 5,
        "minority": 5,
        "institution_type": 5,
        "first_graduate": 4,
        "hosteller": 2,
        "nationality": 2,
    }

    def evaluate(self, profile: ScholarshipProfile, scholarship: Scholarship) -> RecommendationEvaluation:
        """Evaluate a single scholarship against a student scholarship profile."""

        reasons: list[str] = []
        score = 0.0

        # 1. State check
        if not self._matches_state(profile.state, scholarship.state):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["state"]
        reasons.append(self._state_reason(scholarship.state, profile.state))

        # 2. Education level check (academic stage)
        if not self._matches_education(profile.academic_stage, scholarship.education_level):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["education"]
        reasons.append(self._education_reason(scholarship.education_level, profile.academic_stage))

        # 3. Community check
        if not self._matches_community(profile.community, scholarship.community):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["community"]
        reasons.append(self._community_reason(scholarship.community, profile.community))

        # 4. Income check
        income_limit = scholarship.income_limit or scholarship.maximum_family_income
        if not self._matches_income(profile.annual_family_income, income_limit):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self._income_score(profile.annual_family_income, income_limit)
        reasons.append(self._income_reason(profile.annual_family_income, income_limit))

        # 5. Marks / percentage check
        min_marks = scholarship.minimum_marks or scholarship.minimum_percentage
        if not self._matches_marks(profile.percentage_cgpa, min_marks):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["marks"]
        reasons.append(self._marks_reason(profile.percentage_cgpa, min_marks))

        # 6. Gender check
        if not self._matches_gender(profile.gender, scholarship.gender):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["gender"]
        reasons.append(self._gender_reason(scholarship.gender, profile.gender))

        # 7. Disability check
        if not self._matches_disability(profile.has_disability, scholarship.disability_required):
            return RecommendationEvaluation(False, 0.0, reasons)
        score += self.weights["disability"]
        reasons.append(self._disability_reason(scholarship.disability_required, profile.has_disability))

        # 8. Minority check
        if profile.is_minority:
            score += self.weights["minority"]
            reasons.append("Minority scholarship benefits applicable")
        else:
            score += self.weights["minority"] * 0.5
            reasons.append("No minority restriction")

        # 9. Institution type
        score += self.weights["institution_type"]
        if profile.is_government_institution:
            reasons.append("Government institution — higher priority for government scholarships")
        else:
            reasons.append("Applicable for your institution type")

        # 10. First graduate
        if profile.is_first_graduate:
            score += self.weights["first_graduate"]
            reasons.append("First generation graduate — eligible for priority consideration")
        else:
            score += self.weights["first_graduate"] * 0.5

        # 11. Hosteller
        if profile.is_hosteller:
            score += self.weights["hosteller"]
            reasons.append("Hosteller — eligible for additional hostel allowance schemes")
        else:
            score += self.weights["hosteller"] * 0.5

        # 12. Nationality
        score += self.weights["nationality"]

        return RecommendationEvaluation(True, round(min(score, 100.0), 2), reasons)

    # ── Match checkers ──────────────────────────────────────────────

    def _matches_state(self, profile_state: str | None, scholarship_state: str | None) -> bool:
        if is_open_ended(scholarship_state):
            return True
        return normalize_text(profile_state) == normalize_text(scholarship_state)

    def _matches_education(self, profile_stage: str | None, scholarship_level: str | None) -> bool:
        if is_open_ended(scholarship_level):
            return True
        return has_token_overlap(profile_stage, scholarship_level)

    def _matches_community(self, profile_community: str | None, scholarship_community: str | None) -> bool:
        if is_open_ended(scholarship_community):
            return True
        return has_token_overlap(profile_community, scholarship_community)

    def _matches_income(self, profile_income: float | None, scholarship_income_limit: float | None) -> bool:
        if scholarship_income_limit is None:
            return True
        if profile_income is None:
            return False
        return profile_income <= scholarship_income_limit

    def _matches_marks(self, profile_marks: float | None, scholarship_minimum_marks: float | None) -> bool:
        if scholarship_minimum_marks is None:
            return True
        if profile_marks is None:
            return False
        return profile_marks >= scholarship_minimum_marks

    def _matches_gender(self, profile_gender: str | None, scholarship_gender: str | None) -> bool:
        if is_open_ended(scholarship_gender):
            return True

        normalized_profile_gender = normalize_text(profile_gender)
        normalized_scholarship_gender = normalize_text(scholarship_gender)

        if not normalized_profile_gender or not normalized_scholarship_gender:
            return False

        if normalized_scholarship_gender in {"women", "girls", "female"}:
            return normalized_profile_gender in {"female", "woman", "girl", "women"}

        if normalized_scholarship_gender in {"men", "boys", "male"}:
            return normalized_profile_gender in {"male", "man", "boy", "men"}

        return normalized_profile_gender == normalized_scholarship_gender

    def _matches_disability(self, profile_has_disability: bool | None, scholarship_requires_disability: bool) -> bool:
        if not scholarship_requires_disability:
            return True
        return bool(profile_has_disability)

    # ── Score helpers ───────────────────────────────────────────────

    def _income_score(self, profile_income: float | None, scholarship_income_limit: float | None) -> float:
        if scholarship_income_limit is None:
            return float(self.weights["income"])
        if profile_income is None or scholarship_income_limit <= 0:
            return 0.0

        headroom = max(scholarship_income_limit - profile_income, 0.0)
        return round(self.weights["income"] * min(headroom / scholarship_income_limit, 1.0), 2)

    # ── Reason generators ───────────────────────────────────────────

    def _state_reason(self, scholarship_state: str | None, profile_state: str | None) -> str:
        if is_open_ended(scholarship_state):
            return "✓ Available across India"
        return f"✓ This scholarship is available for {profile_state} students"

    def _education_reason(self, scholarship_level: str | None, profile_stage: str | None) -> str:
        stage_labels = {
            "class_10": "Class 10",
            "class_12": "Class 12 / Higher Secondary",
            "diploma": "Diploma",
            "ug": "Undergraduate",
            "pg": "Postgraduate",
        }
        label = stage_labels.get(profile_stage or "", profile_stage or "")
        if is_open_ended(scholarship_level):
            return "✓ Open to all education levels"
        return f"✓ Applicable for {label} students"

    def _community_reason(self, scholarship_community: str | None, profile_community: str | None) -> str:
        if is_open_ended(scholarship_community):
            return "✓ Open to all communities"
        return f"✓ You belong to {profile_community} community"

    def _income_reason(self, profile_income: float | None, scholarship_income_limit: float | None) -> str:
        if scholarship_income_limit is None:
            return "✓ No family income restriction"
        income_text = f"₹{profile_income:,.0f}" if profile_income is not None else "unknown"
        limit_text = f"₹{scholarship_income_limit:,.0f}"
        return f"✓ Your income ({income_text}) satisfies the eligibility criteria (limit: {limit_text})"

    def _marks_reason(self, profile_marks: float | None, scholarship_minimum_marks: float | None) -> str:
        if scholarship_minimum_marks is None:
            return "✓ No minimum marks requirement"
        return f"✓ Your academic score ({format_percentage(profile_marks)}) exceeds the minimum requirement ({format_percentage(scholarship_minimum_marks)})"

    def _gender_reason(self, scholarship_gender: str | None, profile_gender: str | None) -> str:
        if is_open_ended(scholarship_gender):
            return "✓ Open to all genders"
        return f"✓ Applicable for {profile_gender} students"

    def _disability_reason(self, scholarship_requires_disability: bool, profile_has_disability: bool | None) -> str:
        if scholarship_requires_disability:
            return "✓ Supports differently abled students"
        if profile_has_disability:
            return "✓ Profile indicates a disability preference"
        return "✓ No disability restriction"


class ScholarshipRecommendationService:
    """Application service that fetches data and applies the engine."""

    def __init__(self, repository: ScholarshipRepository | None = None) -> None:
        self.repository = repository
        self.engine = ScholarshipRecommendationEngine()

    def get_recommendations(
        self,
        db,
        current_user: User,
    ) -> list[ScholarshipRecommendationResult]:
        """Return all eligible scholarships sorted by match score."""

        profile = current_user.scholarship_profile
        if profile is None:
            raise ScholarshipProfileNotFoundError(
                "Scholarship profile not found. Please complete your scholarship eligibility profile first."
            )

        repository = self.repository or ScholarshipRepository(db)
        bookmark_repo = ScholarshipBookmarkRepository(db)
        bookmarked_ids = bookmark_repo.get_bookmarked_scholarship_ids(current_user.id)

        # Step 4: Filter by academic stage first
        scholarships = repository.list_active_by_academic_stage(profile.academic_stage)

        results: list[ScholarshipRecommendationResult] = []
        for scholarship in scholarships:
            evaluation = self.engine.evaluate(profile, scholarship)
            if not evaluation.is_eligible:
                continue

            # Determine multiple application rule
            compat = scholarship.compatible_with_other_schemes
            if compat:
                compat_lower = compat.lower()
                if "one" in compat_lower or "single" in compat_lower:
                    multiple_rule = "ONE_ONLY"
                elif "conditional" in compat_lower:
                    multiple_rule = "CONDITIONAL"
                else:
                    multiple_rule = "MULTIPLE_ALLOWED"
            else:
                multiple_rule = "MULTIPLE_ALLOWED"

            results.append(
                ScholarshipRecommendationResult(
                    scholarship_id=scholarship.id,
                    title=scholarship.title,
                    description=scholarship.description,
                    amount=scholarship.amount or 0.0,
                    provider=scholarship.provider,
                    match_score=evaluation.match_score,
                    eligibility_status="eligible",
                    recommendation_reasons=evaluation.reasons,
                    matched_criteria=[
                        "State", "Education", "Community", "Income",
                        "Marks", "Gender", "Disability", "Minority",
                        "Institution Type", "First Graduate", "Hosteller", "Nationality",
                    ],
                    optional_criteria=[
                        "Application mode", "Renewal availability",
                    ] if scholarship.renewal_available is not None else [],
                    can_apply="YES",
                    official_apply_link=scholarship.official_url or scholarship.official_link,
                    deadline=scholarship.application_end_date.isoformat() if scholarship.application_end_date else None,
                    required_documents=list(scholarship.required_documents or []),
                    multiple_application_rule=multiple_rule,
                    combining_restrictions=scholarship.restrictions_on_combining,
                    application_mode=scholarship.application_mode,
                    application_policy=scholarship.application_policy,
                    eligibility_summary=scholarship.eligibility_summary,
                    contact_information=scholarship.contact_information,
                    faq_url=scholarship.faq_url,
                    benefits=scholarship.benefits,
                    renewal_available=scholarship.renewal_available or False,
                    is_bookmarked=scholarship.id in bookmarked_ids,
                )
            )

        results.sort(key=lambda item: (-item.match_score, -item.amount, item.title.lower()))
        return results