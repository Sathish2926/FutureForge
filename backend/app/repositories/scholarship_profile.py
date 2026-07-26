"""Scholarship profile persistence helpers."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import ScholarshipProfile


class ScholarshipProfileRepository:
    """Encapsulates scholarship profile queries."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_user_id(self, user_id: int) -> ScholarshipProfile | None:
        """Return the scholarship profile for a given user."""

        statement = select(ScholarshipProfile).where(ScholarshipProfile.user_id == user_id)
        return self.db.scalars(statement).first()

    def create(self, profile: ScholarshipProfile) -> ScholarshipProfile:
        """Persist a new scholarship profile."""

        self.db.add(profile)
        self.db.flush()
        self.db.refresh(profile)
        return profile

    def update(self, profile: ScholarshipProfile, data: dict[str, object]) -> ScholarshipProfile:
        """Update existing profile fields."""

        for key, value in data.items():
            if value is not None and hasattr(profile, key):
                setattr(profile, key, value)
        self.db.flush()
        self.db.refresh(profile)
        return profile

    def delete(self, profile: ScholarshipProfile) -> None:
        """Remove a scholarship profile."""

        self.db.delete(profile)
        self.db.flush()
