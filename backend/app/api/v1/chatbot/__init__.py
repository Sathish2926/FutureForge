from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import User
from app.models.chat import ChatSession, ChatMessage
from app.schemas.chat import ChatSessionBase, ChatSessionDetail, ChatMessageBase, ChatMessageCreate, ChatSessionCreate

# We'll use a mock provider here to simulate the AI Coach.
# In a real setup, this would call the AI Provider interface.

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

@router.post("/sessions", response_model=ChatSessionBase)
def create_session(request: ChatSessionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = ChatSession(
        user_id=current_user.id,
        title=request.title,
        mode=request.mode,
        language=request.language
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    # Add initial greeting message based on mode
    greeting = f"Hello! I am your AI Career Coach. How can I assist you with your {request.mode} goals today?"
    msg = ChatMessage(session_id=session.id, role="assistant", content=greeting)
    db.add(msg)
    db.commit()
    
    return session

@router.get("/sessions", response_model=List[ChatSessionBase])
def get_sessions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(ChatSession).filter(ChatSession.user_id == current_user.id).order_by(ChatSession.created_at.desc()).all()

@router.get("/sessions/{session_id}", response_model=ChatSessionDetail)
def get_session(session_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

from app.services.ai.context_builder import build_context, build_final_prompt

from app.services.ai.gemini_provider import GeminiProvider

@router.post("/sessions/{session_id}/message", response_model=ChatMessageBase)
def send_message(session_id: int, request: ChatMessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    # Save user message
    user_msg = ChatMessage(session_id=session_id, role="user", content=request.content)
    db.add(user_msg)
    db.commit()
    
    # 1. Build Context Object (Intent Detection & Retrieval)
    context = build_context(db, current_user.id, request.content)
    
    # 2. Build Final Prompt
    final_prompt = build_final_prompt(context, request.content, mode=session.mode)
    
    # 3. Execute AI Provider
    provider = GeminiProvider(session_id=session_id)
    ai_content = provider.generate_response(prompt=final_prompt, db=db)
    
    ai_msg = ChatMessage(session_id=session_id, role="assistant", content=ai_content)
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)
    
    return ai_msg

@router.post("/build-prompt")
def api_build_prompt(request: ChatMessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Explainable AI endpoint: Returns the exact prompt that would be sent to the LLM, 
    including all retrieved context and profile data, without actually executing the LLM.
    """
    context = build_context(db, current_user.id, request.content)
    final_prompt = build_final_prompt(context, request.content)
    return {"final_prompt": final_prompt, "context_metadata": context}
