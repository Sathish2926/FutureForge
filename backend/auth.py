from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from sqlalchemy.orm import Session
from .database import get_db
from .models import User
import os

# Initialize Firebase Admin
# NOTE: In production, the credentials should be loaded securely from a JSON file or env vars.
# For demo purposes, we will try to load from a path or use application default credentials.
try:
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            firebase_admin.initialize_app()
except Exception as e:
    print(f"Warning: Firebase initialization failed - {e}")

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verifies the Firebase JWT token."""
    token = credentials.credentials
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(decoded_token: dict = Depends(verify_token), db: Session = Depends(get_db)):
    """Fetches the current user from the DB based on the verified Firebase token."""
    firebase_uid = decoded_token.get("uid")
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    
    if not user:
        # Auto-create user if they don't exist yet but have a valid token
        user = User(
            firebase_uid=firebase_uid,
            email=decoded_token.get("email"),
            full_name=decoded_token.get("name", "")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
    return user
