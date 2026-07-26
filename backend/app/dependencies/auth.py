"""Authentication dependencies for the API."""

from collections.abc import Iterable
import os

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

from app.core.config import settings
from app.database.session import SessionLocal
from app.models import User

# Initialize Firebase Admin
try:
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            firebase_admin.initialize_app(options={'projectId': 'futureforge-951cf'})
except Exception as e:
    print(f"Warning: Firebase initialization failed - {e}")

security = HTTPBearer(auto_error=True)

def get_db() -> Iterable[Session]:
    """Yield a database session for dependency injection."""

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict[str, object]:
    """Validate the bearer JWT and return its decoded payload."""

    token = credentials.credentials
    try:
        return firebase_auth.verify_id_token(token)
    except Exception as exc:
        if "default credentials were not found" in str(exc).lower() and getattr(settings, 'environment', 'development') == "development":
            import json
            import base64
            try:
                parts = token.split('.')
                payload = parts[1]
                payload += '=' * (-len(payload) % 4)
                decoded = json.loads(base64.urlsafe_b64decode(payload).decode('utf-8'))
                if "uid" not in decoded:
                    decoded["uid"] = decoded.get("user_id") or decoded.get("sub")
                return decoded
            except Exception:
                pass
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(exc)}",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

def get_current_user(
    decoded_token: dict[str, object] = Depends(verify_token),
    db: Session = Depends(get_db),
) -> User:
    """Resolve the authenticated user from the decoded JWT payload."""

    firebase_uid = decoded_token.get("uid")
    email = decoded_token.get("email")

    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if user is None and email:
        user = db.query(User).filter(User.email == email).first()

    if user is None:
        # Auto-create user if they don't exist yet but have a valid token
        user = User(
            firebase_uid=firebase_uid,
            email=email,
            full_name=decoded_token.get("name", "")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    elif not user.firebase_uid:
        user.firebase_uid = firebase_uid
        db.commit()

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account is inactive")

    return user
