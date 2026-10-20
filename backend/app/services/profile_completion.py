from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Optional

from sqlalchemy.orm import Session

from .. import models

INTENTIONAL_NON_DISCLOSURE = {"prefer_not_to_say", "not_specified"}

SECTION_LABELS = {
    "basic_profile": "Basic profile",
    "academic_details": "Academic details",
    "career_dna": "Career DNA",
    "interests": "Interests",
    "location_preferences": "Location",
    "financial_preference": "Financial preference",
    "skills": "Detailed skills",
    "goals": "Career goals",
}

STAGE_COMPLETION_RULES = {
    "class10": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "interests",
            "location_preferences",
            "financial_preference",
        ],
        "optional": ["skills", "goals"],
    },
    "class12": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "interests",
            "location_preferences",
            "financial_preference",
            "goals",
        ],
        "optional": ["skills"],
    },
    "diploma": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "interests",
            "location_preferences",
            "financial_preference",
            "goals",
        ],
        "optional": ["skills"],
    },
    "ug": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "skills",
            "goals",
            "location_preferences",
            "financial_preference",
        ],
        "optional": ["interests"],
    },
    "pg": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "skills",
            "goals",
            "location_preferences",
            "financial_preference",
        ],
        "optional": ["interests"],
    },
    "phd": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "skills",
            "goals",
            "location_preferences",
            "financial_preference",
        ],
        "optional": ["interests"],
    },
    "professional": {
        "required": [
            "basic_profile",
            "academic_details",
            "career_dna",
            "skills",
            "goals",
            "location_preferences",
            "financial_preference",
        ],
        "optional": ["interests"],
    },
    "default": {
        "required": [
            "basic_profile",
            "career_dna",
            "interests",
            "location_preferences",
            "academic_details",
            "financial_preference",
        ],
        "optional": ["skills", "goals"],
    },
}


@dataclass
class SectionSignal:
    profile: bool
    career_dna: bool

    @property
    def completed(self) -> bool:
        return self.profile or self.career_dna

    @property
    def source(self) -> str:
        if self.profile and self.career_dna:
            return "profile+career_dna"
        if self.profile:
            return "profile"
        if self.career_dna:
            return "career_dna"
        return "missing"


def _is_non_empty(value: Any, *, allow_intentional_non_disclosure: bool = False) -> bool:
    if value is None:
        return False
    if isinstance(value, str):
        normalized = value.strip().lower()
        if not normalized:
            return False
        if allow_intentional_non_disclosure and normalized in INTENTIONAL_NON_DISCLOSURE:
            return True
        return True
    if isinstance(value, (list, tuple, set, dict)):
        return len(value) > 0
    return True


def _profile_stage_to_career_dna_stage(profile_stage: Optional[str]) -> Optional[str]:
    mapping = {
        "class10": "class10",
        "class12": "class12",
        "diploma": "class12",
        "ug": "ug",
        "pg": "pg",
        "phd": "pg",
        "professional": "job_switcher",
    }
    return mapping.get(profile_stage or "")


def _first_non_empty_answer(answers: dict, keys: list[str]) -> bool:
    for key in keys:
        if _is_non_empty(answers.get(key)):
            return True
    return False


def _latest_relevant_career_dna(db: Session, user_id: int, stage: Optional[str]) -> Optional[models.CareerDNAResponse]:
    if stage:
        record = (
            db.query(models.CareerDNAResponse)
            .filter_by(user_id=user_id, stage=stage)
            .order_by(models.CareerDNAResponse.updated_at.desc(), models.CareerDNAResponse.id.desc())
            .first()
        )
        if record:
            return record
    return (
        db.query(models.CareerDNAResponse)
        .filter_by(user_id=user_id)
        .order_by(models.CareerDNAResponse.updated_at.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )


def _build_section_signals(user: models.User, dna_answers: dict) -> dict[str, SectionSignal]:
    profile = user.profile
    financial_profile = profile.financial_profile if profile else None

    profile_basic = bool(profile and _is_non_empty(profile.name) and _is_non_empty(profile.education_stage) and _is_non_empty(profile.state))

    profile_location = bool(profile and _is_non_empty(profile.preferred_location))
    dna_location = _first_non_empty_answer(dna_answers, ["location_preference", "family_constraints"])

    profile_academic = bool(
        (profile and (_is_non_empty(profile.current_class_or_year) or _is_non_empty(profile.education_stage)))
        or len(user.education_records) > 0
    )
    dna_academic = _first_non_empty_answer(
        dna_answers,
        ["favorite_subjects", "strong_subjects", "stream", "degree_branch", "degree_specialization", "current_role"],
    )

    profile_interests = len(user.user_interests) > 0
    dna_interests = _first_non_empty_answer(dna_answers, ["favorite_subjects", "career_curiosity", "next_step_interest"])

    profile_skills = len(user.user_skills) > 0
    dna_skills = _first_non_empty_answer(dna_answers, ["skills_so_far", "current_skills", "work_style"])

    profile_goals = any(g.is_primary and g.status == "active" for g in user.career_goals)
    dna_goals = _first_non_empty_answer(dna_answers, ["career_curiosity", "preferred_degree_type", "target_field", "next_step_interest"])

    profile_financial = bool(
        financial_profile
        and (
            _is_non_empty(financial_profile.family_income_band, allow_intentional_non_disclosure=True)
            or _is_non_empty(financial_profile.budget_band, allow_intentional_non_disclosure=True)
            or _is_non_empty(financial_profile.government_private_preference)
        )
    )
    dna_financial = _first_non_empty_answer(dna_answers, ["budget_band", "family_constraints"])

    return {
        "basic_profile": SectionSignal(profile=profile_basic, career_dna=False),
        "academic_details": SectionSignal(profile=profile_academic, career_dna=dna_academic),
        "career_dna": SectionSignal(profile=False, career_dna=len(dna_answers) > 0),
        "interests": SectionSignal(profile=profile_interests, career_dna=dna_interests),
        "location_preferences": SectionSignal(profile=profile_location, career_dna=dna_location),
        "financial_preference": SectionSignal(profile=profile_financial, career_dna=dna_financial),
        "skills": SectionSignal(profile=profile_skills, career_dna=dna_skills),
        "goals": SectionSignal(profile=profile_goals, career_dna=dna_goals),
    }


def _section_payload(section_id: str, signal: SectionSignal, optional: bool) -> dict:
    return {
        "id": section_id,
        "label": SECTION_LABELS.get(section_id, section_id.replace("_", " ").title()),
        "completed": signal.completed,
        "source": signal.source,
        "optional": optional,
    }


def compute_profile_completion(db: Session, user: models.User) -> dict:
    profile_stage = user.profile.education_stage if user.profile else None
    career_dna_stage = _profile_stage_to_career_dna_stage(profile_stage)
    dna_record = _latest_relevant_career_dna(db, user.id, career_dna_stage)
    dna_answers = dna_record.answers_json if (dna_record and isinstance(dna_record.answers_json, dict)) else {}

    section_signals = _build_section_signals(user, dna_answers)
    stage_rules = STAGE_COMPLETION_RULES.get(profile_stage or "", STAGE_COMPLETION_RULES["default"])

    required_sections = [
        _section_payload(section_id, section_signals[section_id], optional=False)
        for section_id in stage_rules["required"]
    ]
    optional_sections = [
        _section_payload(section_id, section_signals[section_id], optional=True)
        for section_id in stage_rules["optional"]
    ]

    required_total = len(required_sections)
    required_completed = sum(1 for section in required_sections if section["completed"])
    completeness_percent = round((required_completed / required_total) * 100) if required_total else 0

    missing_sections = [section["id"] for section in required_sections if not section["completed"]]

    return {
        "completeness_percent": completeness_percent,
        "missing_sections": missing_sections,
        "required_sections": required_sections,
        "optional_sections": optional_sections,
        "stage_used": profile_stage or "default",
        "career_dna_stage_used": dna_record.stage if dna_record else None,
        "summary": {
            "required_completed": required_completed,
            "required_total": required_total,
            "optional_completed": sum(1 for section in optional_sections if section["completed"]),
            "optional_total": len(optional_sections),
        },
    }
