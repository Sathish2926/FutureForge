import asyncio
from sqlalchemy.orm import Session
from database import SessionLocal
from app.models.profile import CareerDNA, Profile
from app.models.user import User

def test_commit():
    db = SessionLocal()
    # Find any user
    user = db.query(User).first()
    if not user:
        print("No user found")
        return
        
    cdna = db.query(CareerDNA).filter(CareerDNA.user_id == user.id).first()
    if not cdna:
        cdna = CareerDNA(user_id=user.id)
        db.add(cdna)
        db.commit()
        db.refresh(cdna)
        
    print(f"Current cdna.user_type: {cdna.user_type}")
    
    cdna.user_type = "Diploma"
    cdna.last_completed_step = 2
    cdna.completion_percentage = 20
    
    try:
        db.commit()
        print("Commit successful!")
    except Exception as e:
        print(f"Error during commit: {e}")

if __name__ == "__main__":
    test_commit()
