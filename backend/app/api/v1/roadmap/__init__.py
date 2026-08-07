from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.roadmap import Roadmap, RoadmapMilestone, LearningPlan, ProjectRecommendation
from app.schemas.roadmap_execution import RoadmapBase
from app.services.roadmap_engine import RoadmapGeneratorService

router = APIRouter(prefix="/roadmap", tags=["roadmap"])

@router.post("/test_generate", response_model=RoadmapBase)
async def test_generate_roadmap(db: Session = Depends(get_db)):
    try:
        engine = RoadmapGeneratorService(db)
        roadmap = await engine.generate_roadmap(1, "Software Engineer")
        return roadmap
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

@router.post("/generate", response_model=RoadmapBase)
async def generate_roadmap(
    target_career: str = Query(None, description="Optional target career if overriding profile"),
    timeline: str = Query("Standard", description="Target timeline"),
    skill_level: str = Query("Beginner", description="Current skill level"),
    priority: str = Query("Balanced", description="Priority mode"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Generates a personalized execution roadmap using Gemini based on Career DNA and Profile."""
    try:
        engine = RoadmapGeneratorService(db)
        roadmap = await engine.generate_roadmap(current_user.id, target_career, timeline, skill_level, priority)
        return roadmap
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[RoadmapBase])
def get_user_roadmaps(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Roadmap).filter(Roadmap.user_id == current_user.id, Roadmap.status == "active").all()

@router.get("/{roadmap_id}", response_model=RoadmapBase)
def get_roadmap(roadmap_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    roadmap = db.query(Roadmap).filter(
        Roadmap.id == roadmap_id, 
        Roadmap.user_id == current_user.id
    ).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return roadmap

@router.put("/milestones/{milestone_id}/progress")
def complete_milestone(
    milestone_id: int, 
    status: str, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    milestone = db.query(RoadmapMilestone).filter(RoadmapMilestone.id == milestone_id).first()
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
        
    milestone.status = status
    if status == "completed":
        milestone.completed_at = datetime.utcnow()
        
    # Update roadmap completion percentage
    roadmap = milestone.roadmap
    total_milestones = len(roadmap.milestones)
    completed_milestones = sum(1 for m in roadmap.milestones if m.status == "completed")
    if total_milestones > 0:
        roadmap.completion_percentage = (completed_milestones / total_milestones) * 100
        
    db.commit()
    return {"status": "success", "milestone_status": milestone.status, "completion": roadmap.completion_percentage}

@router.put("/tasks/{task_id}/progress")
def update_task_progress(
    task_id: int, 
    status: str, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    task = db.query(LearningPlan).filter(LearningPlan.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    task.status = status
    db.commit()
    return {"status": "success", "task_status": task.status}
