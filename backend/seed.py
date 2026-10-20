"""Standalone seed script: `python seed.py` — also runs automatically on API startup."""
from app.database import Base, engine, SessionLocal
from app import models  # noqa: F401
from app.seed_data import seed

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed(db)
        print("Seed complete.")
    finally:
        db.close()
