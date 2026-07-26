"""Manual scholarship synchronization workflow."""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.modules.scholarship.sync.fetcher import ScholarshipFetcher
from app.modules.scholarship.sync.parser import parse_raw_scholarships, parse_scholarship_record
from app.modules.scholarship.sync.sources import SCHOLARSHIP_SOURCES
from app.repositories.scholarship import ScholarshipRepository

logger = logging.getLogger(__name__)


@dataclass(slots=True)
class SyncSummary:
    inserted: int = 0
    updated: int = 0
    skipped: int = 0
    failed: int = 0


class ScholarshipSyncScheduler:
    """Fetch, parse, validate, and persist scholarships from approved sources."""

    def __init__(self, fetcher: ScholarshipFetcher | None = None) -> None:
        self.fetcher = fetcher or ScholarshipFetcher()

    def sync(self, db: Session) -> SyncSummary:
        summary = SyncSummary()
        repository = ScholarshipRepository(db)
        logger.info("Synchronization started")

        for source in SCHOLARSHIP_SOURCES:
            logger.info("Source name=%s", source.name)
            try:
                raw = self.fetcher.fetch(source.base_url)
                records = parse_raw_scholarships(raw, source.name, source.country)
                logger.info("Scholarships fetched=%s source=%s", len(records), source.name)
            except Exception as exc:  # noqa: BLE001
                summary.failed += 1
                logger.exception("Failed to fetch source=%s: %s", source.name, exc)
                continue

            existing_by_title = {item.title: item for item in repository.find_by_source(source.name)}

            for record in records:
                scholarship = parse_scholarship_record(record, source.name, source.country)
                if scholarship is None:
                    summary.skipped += 1
                    continue

                existing = existing_by_title.get(scholarship.title)
                if existing is None:
                    repository.create(scholarship)
                    existing_by_title[scholarship.title] = scholarship
                    summary.inserted += 1
                else:
                    repository.update(existing, {
                        key: value for key, value in scholarship.__dict__.items() if not key.startswith("_")
                    })
                    summary.updated += 1

        self._deactivate_expired(repository)
        db.commit()
        logger.info(
            "Synchronization completed inserted=%s updated=%s skipped=%s failed=%s",
            summary.inserted,
            summary.updated,
            summary.skipped,
            summary.failed,
        )
        return summary

    def _deactivate_expired(self, repository: ScholarshipRepository) -> None:
        now = datetime.now(timezone.utc)
        for scholarship in repository.find_all():
            if scholarship.application_end_date is not None and scholarship.application_end_date < now:
                repository.update(scholarship, {"status": "expired", "is_active": False})
