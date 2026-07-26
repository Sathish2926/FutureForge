"""Parse raw scholarship source data into Scholarship ORM objects."""

from __future__ import annotations

from datetime import datetime, timezone
from html.parser import HTMLParser
from typing import Any

from app.models import Scholarship


class _AnchorCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_anchor = False
        self.current_href: str | None = None
        self.current_text: list[str] = []
        self.links: list[tuple[str | None, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "a":
            self.in_anchor = True
            self.current_href = dict(attrs).get("href")
            self.current_text = []

    def handle_data(self, data: str) -> None:
        if self.in_anchor:
            self.current_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "a" and self.in_anchor:
            text = " ".join("".join(self.current_text).split())
            if text:
                self.links.append((self.current_href, text))
            self.in_anchor = False
            self.current_href = None
            self.current_text = []


def _parse_date(value: Any) -> datetime | None:
    if value in (None, "", "NA", "N/A"):
        return None
    if isinstance(value, datetime):
        return value
    if isinstance(value, str):
        for fmt in ("%d-%m-%Y", "%Y-%m-%d", "%d/%m/%Y", "%Y-%m-%d %H:%M:%S"):
            try:
                return datetime.strptime(value.strip(), fmt).replace(tzinfo=timezone.utc)
            except ValueError:
                continue
    return None


def _parse_float(value: Any) -> float | None:
    if value in (None, "", "NA", "N/A"):
        return None
    try:
        return float(str(value).replace(",", "").strip())
    except ValueError:
        return None


def _normalize_course_level(value: Any) -> str | None:
    if value in (None, ""):
        return None
    text = str(value).strip().lower()
    if "pg" in text or "post graduate" in text:
        return "PG"
    if "diploma" in text:
        return "Diploma"
    if "school" in text or "pre-matric" in text or "pre matric" in text:
        return "School"
    return "UG"


def _normalize_state(value: Any) -> str | None:
    if value in (None, "", "all india", "india"):
        return "All India"
    text = str(value).strip()
    if text.lower() in {"tn", "tamil nadu"}:
        return "Tamil Nadu"
    return text


def parse_raw_scholarships(raw: dict[str, Any], source_name: str, default_country: str = "India") -> list[dict[str, Any]]:
    text = str(raw.get("text") or "")
    collector = _AnchorCollector()
    collector.feed(text)

    records: list[dict[str, Any]] = []
    for href, title in collector.links:
        lower_title = title.lower()
        if "scholar" not in lower_title and "scheme" not in lower_title and "award" not in lower_title:
            continue
        records.append({
            "title": title,
            "description": title,
            "provider": source_name,
            "amount": 0.0,
            "scholarship_type": "Government",
            "state": "All India" if "nsp" in source_name.lower() or "ugc" in source_name.lower() or "aicte" in source_name.lower() else "Tamil Nadu",
            "country": default_country,
            "course_level": "UG",
            "community": "ALL",
            "gender": "All",
            "minimum_percentage": None,
            "maximum_family_income": None,
            "disability_required": False,
            "application_start_date": None,
            "application_end_date": None,
            "official_url": href,
            "official_notification_url": href,
            "source": source_name,
            "last_synced": datetime.now(timezone.utc),
            "status": "active",
            "required_documents": [],
            "eligibility_summary": title,
            "application_mode": "Online",
            "renewal_available": False,
            "contact_information": {},
            "faq_url": None,
            "application_policy": "Conditional",
            "compatible_with_other_schemes": "Conditional",
            "restrictions_on_combining": None,
            "eligible_courses": ["UG"],
        })
    return records


def parse_scholarship_record(record: dict[str, Any], source_name: str, default_country: str = "India") -> Scholarship | None:
    title = (record.get("title") or "").strip()
    if not title:
        return None

    scholarship = Scholarship(
        title=title,
        description=record.get("description"),
        provider=record.get("provider") or source_name,
        amount=_parse_float(record.get("amount")) or 0.0,
        scholarship_type=record.get("scholarship_type"),
        state=_normalize_state(record.get("state")),
        country=record.get("country") or default_country,
        course_level=_normalize_course_level(record.get("course_level")),
        course_name=record.get("course_name"),
        community=record.get("community"),
        gender=record.get("gender") or "All",
        minimum_percentage=_parse_float(record.get("minimum_percentage")),
        maximum_family_income=_parse_float(record.get("maximum_family_income")),
        age_min=None,
        age_max=None,
        disability_required=bool(record.get("disability_required")),
        application_start_date=_parse_date(record.get("application_start_date")),
        application_end_date=_parse_date(record.get("application_end_date")),
        official_url=record.get("official_url"),
        official_notification_url=record.get("official_notification_url"),
        source=source_name,
        last_synced=datetime.now(timezone.utc),
        status=record.get("status") or "active",
        required_documents=record.get("required_documents") or [],
        eligibility_summary=record.get("eligibility_summary"),
        application_mode=record.get("application_mode"),
        renewal_available=bool(record.get("renewal_available")),
        contact_information=record.get("contact_information") or {},
        faq_url=record.get("faq_url"),
        application_policy=record.get("application_policy"),
        compatible_with_other_schemes=record.get("compatible_with_other_schemes"),
        restrictions_on_combining=record.get("restrictions_on_combining"),
        eligible_courses=record.get("eligible_courses") or [],
        official_link=record.get("official_url"),
        deadline=_parse_date(record.get("application_end_date")),
        is_active=True,
    )
    return scholarship
