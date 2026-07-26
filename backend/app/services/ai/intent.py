def detect_intent(message: str) -> str:
    """
    Very basic heuristic intent detection.
    In production, this would be a local ML classifier (like fasttext or a tiny BERT) 
    or a zero-shot LLM call (though that adds latency).
    """
    msg_lower = message.lower()
    
    roadmap_keywords = ['roadmap', 'milestone', 'step', 'progress', 'learn', 'course', 'project']
    scholarship_keywords = ['scholarship', 'fund', 'money', 'grant', 'financial aid']
    college_keywords = ['college', 'university', 'degree', 'campus', 'admission']
    career_keywords = ['career', 'job', 'salary', 'role', 'profession']
    
    if any(k in msg_lower for k in scholarship_keywords):
        return "scholarship"
    if any(k in msg_lower for k in college_keywords):
        return "college"
    if any(k in msg_lower for k in roadmap_keywords):
        return "roadmap"
    if any(k in msg_lower for k in career_keywords):
        return "career"
        
    return "general"
