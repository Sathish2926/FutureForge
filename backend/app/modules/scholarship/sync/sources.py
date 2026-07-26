"""Official scholarship data sources."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class ScholarshipSource:
    name: str
    base_url: str
    source_type: str
    country: str = "India"


SCHOLARSHIP_SOURCES: tuple[ScholarshipSource, ...] = (
    ScholarshipSource(name="National Scholarship Portal", base_url="https://scholarships.gov.in", source_type="NSP"),
    ScholarshipSource(name="Tamil Nadu Government Scholarship Portal", base_url="https://scholarships.tn.gov.in", source_type="TNGOV"),
    ScholarshipSource(name="AICTE Scholarships", base_url="https://www.aicte.gov.in/schemes", source_type="AICTE"),
    ScholarshipSource(name="UGC Scholarships", base_url="https://www.ugc.gov.in", source_type="UGC"),
)
