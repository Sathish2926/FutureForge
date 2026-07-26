import json
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.profile import Profile, CareerDNA
from app.services.ai.intent import detect_intent
from app.services.ai.retrieval import retrieve_knowledge

def build_context(db: Session, user_id: int, message: str) -> dict:
    """
    Constructs the absolute state of the user to inject into the LLM prompt.
    """
    intent = detect_intent(message)
    
    # 1. Base User Profile & DNA
    user = db.query(User).filter(User.id == user_id).first()
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    dna = db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
    
    context = {
        "user": {
            "name": user.full_name if user else "Student",
            "role": getattr(user, "role", "STUDENT"),
        },
        "profile": {
            "occupation": getattr(profile, "occupation", ""),
            "institution": getattr(profile, "institution", ""),
            "location": getattr(profile, "location", ""),
        } if profile else {},
        "career_dna": {
            "personality_type": getattr(dna, "personality_type", ""),
            "traits": getattr(dna, "traits", {}),
            "top_industries": getattr(dna, "top_industries", [])
        } if dna else {},
        "intent_detected": intent,
        "retrieved_knowledge": retrieve_knowledge(db, intent, user_id)
    }
    
    return context

def build_final_prompt(context: dict, message: str, mode: str = "general") -> str:
    """
    Merges the Context JSON with the actual Prompt Template.
    """
    system_base = f"""You are FutureForge, an elite AI Career Coach. 
Always remain supportive and factual. Never fabricate information.
When recommending careers, colleges, or scholarships, rely primarily on the [Retrieved Knowledge] section below.

# User Context
Name: {context['user'].get('name', 'Student')}
Location: {context['profile'].get('location', 'Unknown')}
Personality Type: {context['career_dna'].get('personality_type', 'Unknown')}

# Retrieved Knowledge (KMS)
{json.dumps(context.get('retrieved_knowledge', {}), indent=2)}

Please answer the user's latest query considering the above state.
"""
    
    return f"{system_base}\n\nUser Query: {message}"
