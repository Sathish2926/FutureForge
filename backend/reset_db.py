"""
Script to recreate SQLite database tables with updated schema and seed dataset.
"""
import os
import sqlite3
from app.database import engine, Base, SessionLocal
from app import models
from app.seed_data import seed

db_file = "careerpath.db"

# Recreate all tables cleanly
print("Dropping existing tables and creating fresh database schema...")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    print("Seeding database...")
    seed(db)
    print("Seeding completed successfully.")
finally:
    db.close()

# Verify columns
conn = sqlite3.connect(db_file)
print("Updated roadmaps columns:", [c[1] for c in conn.execute('PRAGMA table_info(roadmaps)').fetchall()])
print("Updated roadmap_steps columns:", [c[1] for c in conn.execute('PRAGMA table_info(roadmap_steps)').fetchall()])
conn.close()

print("Database reset and migration complete!")
