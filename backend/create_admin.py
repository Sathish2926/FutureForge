"""Dev helper: promote a registered user to admin. Usage: python create_admin.py you@example.com"""
import sys
from app.database import SessionLocal
from app import models

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python create_admin.py <email>")
        sys.exit(1)
    db = SessionLocal()
    user = db.query(models.User).filter_by(email=sys.argv[1]).first()
    if not user:
        print("No such user — register via /api/auth/register first.")
        sys.exit(1)
    user.is_admin = True
    db.commit()
    print(f"{sys.argv[1]} is now an admin.")
