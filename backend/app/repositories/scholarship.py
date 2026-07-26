"""Scholarship persistence helpers."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Scholarship


class ScholarshipRepository:
    """Encapsulates scholarship queries so business logic stays in services."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def list_active_scholarships(self) -> list[Scholarship]:
        """Return all active scholarships ordered for stable recommendation output."""

        statement = (
            select(Scholarship)
            .where(Scholarship.is_active.is_(True))
            .order_by(Scholarship.amount.desc(), Scholarship.id.asc())
        )
        return list(self.db.scalars(statement).all())

    def create(self, scholarship: Scholarship) -> Scholarship:
        self.db.add(scholarship)
        self.db.flush()
        return scholarship

    def update(self, scholarship: Scholarship, data: dict[str, object]) -> Scholarship:
        for key, value in data.items():
            if hasattr(scholarship, key):
                setattr(scholarship, key, value)
        self.db.flush()
        return scholarship

    def find_by_source(self, source: str) -> list[Scholarship]:
        statement = select(Scholarship).where(Scholarship.source == source)
        return list(self.db.scalars(statement).all())

    def find_all(self) -> list[Scholarship]:
        statement = select(Scholarship).order_by(Scholarship.last_synced.desc().nullslast(), Scholarship.id.asc())
        return list(self.db.scalars(statement).all())

    def bulk_insert(self, scholarships: list[Scholarship]) -> list[Scholarship]:
        self.db.add_all(scholarships)
        self.db.flush()
        return scholarships

    def get_by_id(self, scholarship_id: int) -> Scholarship | None:
        """Return a single scholarship by ID."""

        statement = select(Scholarship).where(Scholarship.id == scholarship_id)
        return self.db.scalars(statement).first()

    def list_active_by_academic_stage(self, academic_stage: str) -> list[Scholarship]:
        """Return active scholarships filtered by academic stage compatibility."""

        stage_mapping = {
            "class_10": ["Class 10", "School", "Pre-Matric", "class_10"],
            "class_12": ["Class 12", "Higher Secondary", "Post-Matric", "class_12"],
            "diploma": ["Diploma", "diploma"],
            "ug": ["UG", "Undergraduate", "Under Graduate", "B.E", "B.Tech", "B.Sc", "B.A", "B.Com", "ug"],
            "pg": ["PG", "Postgraduate", "Post Graduate", "M.E", "M.Tech", "M.Sc", "M.A", "M.Com", "pg"],
        }

        allowed_levels = stage_mapping.get(academic_stage.lower(), [academic_stage])

        statement = (
            select(Scholarship)
            .where(Scholarship.is_active.is_(True))
            .order_by(Scholarship.amount.desc(), Scholarship.id.asc())
        )
        all_scholarships = list(self.db.scalars(statement).all())

        filtered = []
        for s in all_scholarships:
            level = (s.education_level or "").strip()
            course_level = (s.course_level or "").strip()
            combined = f"{level} {course_level}".lower()

            if not level and not course_level:
                filtered.append(s)
                continue

            if any(al.lower() in combined for al in allowed_levels):
                filtered.append(s)
                continue

            if any(kw in combined for kw in ["all", "open", "any", "general"]):
                filtered.append(s)

        return filtered

    def bulk_update(self, scholarships: list[Scholarship]) -> list[Scholarship]:
        for scholarship in scholarships:
            self.db.add(scholarship)
        self.db.flush()
        return scholarships