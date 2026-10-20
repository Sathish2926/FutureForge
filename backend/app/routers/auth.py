# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas, auth
from app.auth import get_current_user
from app.database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=schemas.TokenResponse)
def register(payload: schemas.RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user = models.User(email=payload.email, hashed_password=auth.hash_password(payload.password))
    db.add(user)
    db.flush()

    profile = models.Profile(user_id=user.id, name=payload.name)
    db.add(profile)
    db.commit()

    token = auth.create_access_token(user.id)
    return schemas.TokenResponse(access_token=token, is_admin=user.is_admin)


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not user.hashed_password or not auth.verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    token = auth.create_access_token(user.id)
    return schemas.TokenResponse(access_token=token, is_admin=user.is_admin)


@router.post("/firebase", response_model=schemas.TokenResponse)
def firebase_auth(payload: schemas.FirebaseAuthRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        user = models.User(email=payload.email, firebase_uid=payload.uid, hashed_password=None)
        db.add(user)
        db.flush()
        display_name = payload.name if (payload.name and payload.name.strip()) else payload.email.split("@")[0]
        profile = models.Profile(user_id=user.id, name=display_name)
        db.add(profile)
        db.commit()
    else:
        if payload.uid and not user.firebase_uid:
            user.firebase_uid = payload.uid
            db.commit()
        profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()
        if profile and (not profile.name or profile.name == "Student") and payload.name:
            profile.name = payload.name
            db.commit()

    token = auth.create_access_token(user.id)
    return schemas.TokenResponse(access_token=token, is_admin=user.is_admin)


@router.get("/me", response_model=schemas.MeResponse)
def me(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Return authenticated user's identity including is_admin for frontend role-based routing."""
    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    return schemas.MeResponse(
        id=current_user.id,
        email=current_user.email,
        name=profile.name if profile else current_user.email.split("@")[0],
        is_admin=current_user.is_admin,
    )
