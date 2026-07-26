from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User

# In a real scenario, this would trigger background tasks to parse CSV/JSON
# from UGC, AISHE, NIRF datasets and update the Knowledge Management System.

router = APIRouter(prefix="/sync", tags=["admin", "sync"])

def background_sync_task(source: str, db: Session):
    """
    Mock background task for Knowledge Refresh Service.
    In production, this downloads updated datasets from government portals
    and upserts into Career, College, and Scholarship tables.
    """
    import time
    time.sleep(5)
    # Simulate DB update logic...
    print(f"Successfully synced latest knowledge from {source}.")

@router.post("/knowledge")
def trigger_knowledge_refresh(
    source: str, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if getattr(current_user, "role", "STUDENT") != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized. Admin access required.")
        
    valid_sources = ["ugc_colleges", "tn_scholarships", "skill_india_careers"]
    if source not in valid_sources:
        raise HTTPException(status_code=400, detail=f"Invalid source. Must be one of {valid_sources}")
        
    background_tasks.add_task(background_sync_task, source, db)
    
    return {
        "status": "processing",
        "message": f"Knowledge Refresh Service started for '{source}'. The AI Retrieval Engine will automatically use the updated data once complete."
    }
