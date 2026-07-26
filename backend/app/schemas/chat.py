from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ChatMessageBase(BaseModel):
    id: int
    role: str
    content: str
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class ChatSessionBase(BaseModel):
    id: int
    title: str
    mode: str
    language: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class ChatSessionDetail(ChatSessionBase):
    messages: List[ChatMessageBase] = []

class ChatMessageCreate(BaseModel):
    content: str

class ChatSessionCreate(BaseModel):
    title: str
    mode: str = "general"
    language: str = "English"
