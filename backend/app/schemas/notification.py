from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    id: int
    title: str
    message: str
    type: str
    priority: str
    action_url: Optional[str] = None
    is_read: bool
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)
