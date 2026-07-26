"""Shared recommendation scoring utilities.

The recommendation engine is intentionally isolated from scholarship-specific
transport concerns so it can be reused for future college and career matching
features.
"""

from __future__ import annotations

from dataclasses import dataclass, field
import re


_OPEN_VALUES = {
    "",
    "all",
    "any",
    "everyone",
    "general",
    "open",
    "open to all",
    "all india",
    "all-india",
    "central",
    "central government",
    "national",
    "pan india",
    "pan-india",
}

_TOKEN_SPLIT_PATTERN = re.compile(r"[,/&|()]+")


@dataclass(slots=True)
class RecommendationEvaluation:
    """Normalized evaluation result returned by the scoring engine."""

    is_eligible: bool
    match_score: float
    reasons: list[str] = field(default_factory=list)


def normalize_text(value: str | None) -> str:
    """Return a lowercase normalized string for fuzzy comparisons."""

    return " ".join(value.strip().lower().split()) if value else ""


def tokenize(value: str | None) -> set[str]:
    """Split a text field into normalized tokens for compatibility matching."""

    normalized = normalize_text(value)
    if not normalized:
        return set()

    tokens = {token.strip() for token in _TOKEN_SPLIT_PATTERN.split(normalized) if token.strip()}
    if not tokens:
        return {normalized}

    return tokens


def is_open_ended(value: str | None) -> bool:
    """Return True when a scholarship field is effectively unrestricted."""

    normalized = normalize_text(value)
    return normalized in _OPEN_VALUES


def has_token_overlap(source: str | None, target: str | None) -> bool:
    """Check whether two categorical values share at least one normalized token."""

    source_tokens = tokenize(source)
    target_tokens = tokenize(target)
    return bool(source_tokens & target_tokens)


def format_percentage(value: float | None) -> str:
    """Format a score-like percentage for human-readable reasons."""

    if value is None:
        return ""
    if float(value).is_integer():
        return f"{int(value)}%"
    return f"{value:.1f}%"