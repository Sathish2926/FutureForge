from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.profile import Profile
from app.schemas.profile import ProfileRead, ProfileCreate, ProfileUpdate

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("", response_model=ProfileRead)
def get_user_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get the profile of the current authenticated user."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return profile

@router.put("", response_model=ProfileRead)
def update_user_profile(
    profile_in: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update or create the profile for the current authenticated user."""
    try:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        
        if profile:
            update_data = profile_in.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(profile, field, value)
            db.add(profile)
        else:
            profile = Profile(user_id=current_user.id, **profile_in.model_dump(exclude_unset=True))
            db.add(profile)
            
        db.commit()
        db.refresh(profile)
        return profile
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        raise HTTPException(status_code=400, detail=str(error_details))
