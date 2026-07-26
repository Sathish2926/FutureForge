from sqlalchemy.orm import Session
from app.models.career import Career, CareerSkill
from app.models.scholarship import Scholarship
from app.models.roadmap import Roadmap, RoadmapMilestone
from app.models.college import College

def retrieve_knowledge(db: Session, intent: str, user_id: int):
    """
    Simulates retrieving domain-specific knowledge based on intent.
    In production, this would do vector searches against embeddings of these models.
    """
    knowledge = {}
    
    if intent == "career":
        # Get top 3 careers randomly or based on user recommendations
        careers = db.query(Career).limit(3).all()
        knowledge["careers"] = [{"title": c.title, "industry": getattr(c, "industry", "")} for c in careers]
        
    elif intent == "scholarship":
        scholarships = db.query(Scholarship).limit(3).all()
        knowledge["scholarships"] = [{"title": s.title, "amount": s.amount} for s in scholarships]
        
    elif intent == "roadmap":
        roadmaps = db.query(Roadmap).filter(Roadmap.user_id == user_id).limit(1).all()
        if roadmaps:
            r = roadmaps[0]
            milestones = db.query(RoadmapMilestone).filter(RoadmapMilestone.roadmap_id == r.id).all()
            knowledge["active_roadmap"] = {
                "title": r.title, 
                "completion": r.completion_percentage,
                "milestones": [{"title": m.title, "status": m.status} for m in milestones]
            }
            
    elif intent == "college":
        colleges = db.query(College).limit(3).all()
        knowledge["colleges"] = [{"name": c.name, "location": getattr(c, "state", getattr(c, "location", ""))} for c in colleges]
        
    return knowledge
