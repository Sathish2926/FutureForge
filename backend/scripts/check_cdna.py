import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.session import SessionLocal
from app.models.profile import CareerDNA

db = SessionLocal()
cdnas = db.query(CareerDNA).all()
for c in cdnas:
    print(f"ID: {c.id}, User: {c.user_id}, Completed: {c.is_completed}, Identity: {c.career_identity}")
