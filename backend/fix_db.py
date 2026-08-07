import os
import sys
sys.path.append(os.getcwd())
from app.database.session import engine
from app.models import Base
from sqlalchemy import text

def fix_db():
    print("Creating missing tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")
    
    print("Adding missing columns to 'profiles' table...")
    with engine.connect() as conn:
        columns_to_add = {
            "institution": "character varying",
            "school": "character varying",
            "college": "character varying",
            "company": "character varying",
            "location": "character varying",
            "dob": "character varying",
            "occupation": "character varying"
        }
        for col, col_type in columns_to_add.items():
            try:
                conn.execute(text(f"ALTER TABLE profiles ADD COLUMN {col} {col_type}"))
                conn.commit()
                print(f"Added column {col}")
            except Exception as e:
                # Column might already exist
                conn.rollback()
                print(f"Column {col} might already exist: {e}")
                
        print("Database schema updated successfully!")

if __name__ == "__main__":
    fix_db()
