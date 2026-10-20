# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(prefix="/api/saved", tags=["saved"])


@router.get("/colleges")
def saved_colleges(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return [{"id": sc.college.id, "name": sc.college.name, "city": sc.college.city} for sc in user.saved_colleges]


@router.post("/colleges/{college_id}")
def save_college(college_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    college = db.query(models.College).get(college_id)
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    exists = db.query(models.SavedCollege).filter_by(user_id=user.id, college_id=college_id).first()
    if not exists:
        db.add(models.SavedCollege(user_id=user.id, college_id=college_id))
        db.commit()
    return {"saved": True}


@router.delete("/colleges/{college_id}")
def delete_saved_college(college_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    saved = db.query(models.SavedCollege).filter_by(user_id=user.id, college_id=college_id).first()
    if saved:
        db.delete(saved)
        db.commit()
    return {"saved": False}


@router.get("/scholarships")
def saved_scholarships(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return [{"id": ss.scholarship.id, "name": ss.scholarship.name} for ss in user.saved_scholarships]


@router.post("/scholarships/{scholarship_id}")
def save_scholarship(scholarship_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    scholarship = db.query(models.Scholarship).get(scholarship_id)
    if not scholarship:
        raise HTTPException(status_code=404, detail="Scholarship not found")
    exists = db.query(models.SavedScholarship).filter_by(user_id=user.id, scholarship_id=scholarship_id).first()
    if not exists:
        db.add(models.SavedScholarship(user_id=user.id, scholarship_id=scholarship_id))
        db.commit()
    return {"saved": True}
