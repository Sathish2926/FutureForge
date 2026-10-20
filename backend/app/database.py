"""
Database setup. Defaults to SQLite for zero-config local development.
Set DATABASE_URL to a postgresql+psycopg2://... URL for production —
no code changes required, SQLAlchemy handles the dialect switch.
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

db_url = os.getenv("DATABASE_URL")
if not db_url or db_url == "sqlite:///./careerpath.db":
    backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db_file = os.path.join(backend_dir, "careerpath.db")
    DATABASE_URL = f"sqlite:///{db_file}"
else:
    DATABASE_URL = db_url

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
