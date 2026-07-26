from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.sql import func
from .base import Base

class ConversationSummary(Base):
    __tablename__ = "conversation_summaries"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"))
    summary_text = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AIContextCache(Base):
    __tablename__ = "ai_context_cache"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    intent_type = Column(String)
    context_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))

class KnowledgeCache(Base):
    __tablename__ = "knowledge_cache"
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String)
    query_hash = Column(String, index=True)
    retrieved_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))

class ProviderLog(Base):
    __tablename__ = "provider_logs"
    id = Column(Integer, primary_key=True, index=True)
    provider_name = Column(String)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=True)
    tokens_prompt = Column(Integer, default=0)
    tokens_completion = Column(Integer, default=0)
    latency_ms = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
