"""Scholarship bookmark persistence helpers."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import ScholarshipBookmark


class ScholarshipBookmarkRepository:
    """Encapsulates scholarship bookmark queries."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_user_and_scholarship(self, user_id: int, scholarship_id: int) -> ScholarshipBookmark | None:
        """Return a bookmark for a specific user-scholarship pair."""

        statement = select(ScholarshipBookmark).where(
            ScholarshipBookmark.user_id == user_id,
            ScholarshipBookmark.scholarship_id == scholarship_id,
        )
        return self.db.scalars(statement).first()

    def list_by_user(self, user_id: int) -> list[ScholarshipBookmark]:
        """Return all bookmarks for a given user."""

        statement = (
            select(ScholarshipBookmark)
            .where(ScholarshipBookmark.user_id == user_id)
            .order_by(ScholarshipBookmark.created_at.desc())
        )
        return list(self.db.scalars(statement).all())

    def create(self, bookmark: ScholarshipBookmark) -> ScholarshipBookmark:
        """Persist a new bookmark."""

        self.db.add(bookmark)
        self.db.flush()
        self.db.refresh(bookmark)
        return bookmark

    def delete(self, bookmark: ScholarshipBookmark) -> None:
        """Remove a bookmark."""

        self.db.delete(bookmark)
        self.db.flush()

    def get_bookmarked_scholarship_ids(self, user_id: int) -> set[int]:
        """Return a set of scholarship IDs bookmarked by the user."""

        statement = select(ScholarshipBookmark.scholarship_id).where(
            ScholarshipBookmark.user_id == user_id
        )
        return set(self.db.scalars(statement).all())
