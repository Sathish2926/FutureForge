from typing import Literal
from pydantic import BaseModel, Field

CLASS10_DOMAINS: list[str] = [
    "MATH_LOGICAL",
    "LIFE_SCIENCES_CARE",
    "HUMANITIES_SOCIAL",
    "BUSINESS_COMMERCE",
    "CREATIVE_VISUAL",
    "PRACTICAL_APPLIED",
]

DOMAIN_CODE_MAP: dict[str, str] = {
    "ML": "MATH_LOGICAL",
    "LS": "LIFE_SCIENCES_CARE",
    "HU": "HUMANITIES_SOCIAL",
    "BC": "BUSINESS_COMMERCE",
    "CR": "CREATIVE_VISUAL",
    "PA": "PRACTICAL_APPLIED",
}

CODE_TO_DOMAIN_MAP: dict[str, str] = {v: k for k, v in DOMAIN_CODE_MAP.items()}


class QuestionOption(BaseModel):
    option_id: str
    label: str
    domain_weights: dict[str, float] = Field(default_factory=dict)  # partial weights allowed across multiple domains
    meta_flag: str | None = None
    effect: str | None = None


class Question(BaseModel):
    question_id: str
    stage: Literal["class10"] = "class10"
    tier: Literal["universal", "narrowing", "cross_check", "verification", "hidden_verification"]
    domain_pair: tuple[str, str] | None = None   # required for "narrowing" tier
    prompt: str
    options: list[QuestionOption]
    contradiction_check_for: str | None = None
    flavor_tags: list[str] = Field(default_factory=list)


class AnswerRecord(BaseModel):
    question_id: str
    option_id: str
    domain_weights_applied: dict[str, float] = Field(default_factory=dict)
    max_possible_weight: float   # highest single-domain weight available among this question's options
    selected_label: str | None = None
    prompt: str | None = None
    tier: str | None = None


class QuestionnaireSession(BaseModel):
    session_id: str
    stage: str = "class10"
    domain_scores: dict[str, float] = Field(default_factory=lambda: {d: 0.0 for d in CLASS10_DOMAINS})
    answered_question_ids: list[str] = Field(default_factory=list)
    answer_log: list[AnswerRecord] = Field(default_factory=list)
    verification_log: list[dict] = Field(default_factory=list)   # hidden-phase records
    tier: Literal["universal", "narrowing", "cross_check", "verification", "hidden_verification", "complete"] = "universal"
    flagged_contradiction: dict | None = None
    flavor_tags: list[str] = Field(default_factory=list)

    # State tracking metadata
    initial_top_domain: str | None = None
    current_pair: tuple[str, str] | None = None
    narrowing_count: int = 0
    narrowing_pair_history: list[tuple[str, str]] = Field(default_factory=list)
    phase1_5_tiebreaker_asked: bool = False
    cross_check_done: bool = False
    verification_count: int = 0
    hidden_verification_count: int = 0
    hidden_audit_domains: list[str] = Field(default_factory=list)
    hidden_audit_index: int = 0
    hidden_check_step: int = 1  # 1 for initial commitment check, 2 for corroboration
    hidden_pending_contradiction: dict | None = None
    profile_status: Literal["clear", "broad_exploratory", "unresolved_contradiction"] = "clear"
    cross_verified_domains: list[str] = Field(default_factory=list)
