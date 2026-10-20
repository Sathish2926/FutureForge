from typing import Optional, Dict, Any, List
from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel, Field

from app.services.class10_copilot_service import process_copilot_turn

router = APIRouter(prefix="/api/class10-copilot", tags=["class10-copilot"])


class CopilotChatRequest(BaseModel):
    message: Optional[str] = Field(default="", description="The message from the student")
    user_message: Optional[str] = Field(default=None, description="Alias for message")
    current_screen: Optional[str] = Field(default="landing", description="Current active screen in catalog")
    current_tier_a_id: Optional[str] = Field(default=None, description="Active Tier A stream id if any")
    current_leaf_id: Optional[str] = Field(default=None, description="Active Leaf node id if viewing details")
    marks_profile: Optional[Dict[str, Any]] = Field(default=None, description="Student's marks layer profile if set")
    event: Optional[Dict[str, Any]] = Field(default=None, description="Optional UI event (e.g. node clicked)")
    disable_grounding: Optional[bool] = Field(default=False, description="Flag for acceptance testing refusal without grounding")


class CopilotEventRequest(BaseModel):
    event: Dict[str, Any] = Field(..., description="Interaction event payload e.g. USER_CLICKED_NODE")
    current_screen: Optional[str] = Field(default="landing")
    current_tier_a_id: Optional[str] = Field(default=None)
    current_leaf_id: Optional[str] = Field(default=None)
    marks_profile: Optional[Dict[str, Any]] = Field(default=None)


@router.post("/chat")
def copilot_chat(payload: CopilotChatRequest):
    """
    Processes a conversational turn for the Class 10 Pathway Co-Pilot.
    Returns synchronized message, validated ui_action, candidate nodes, quick replies, and audit logs.
    """
    try:
        msg_text = (payload.message or payload.user_message or "").strip()
        response = process_copilot_turn(
            user_message=msg_text,
            current_screen=payload.current_screen,
            current_tier_a_id=payload.current_tier_a_id,
            current_leaf_id=payload.current_leaf_id,
            marks_profile=payload.marks_profile,
            event=payload.event,
            disable_grounding=payload.disable_grounding or False
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing Co-Pilot turn: {str(e)}")


@router.post("/event")
def copilot_event(payload: CopilotEventRequest):
    """
    Handles student interaction events (e.g., clicking a card or switching screens)
    to generate proactive, grounded commentary when relevant.
    """
    try:
        response = process_copilot_turn(
            user_message="",
            current_screen=payload.current_screen,
            current_tier_a_id=payload.current_tier_a_id,
            current_leaf_id=payload.current_leaf_id,
            marks_profile=payload.marks_profile,
            event=payload.event,
            disable_grounding=False
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error handling Co-Pilot event: {str(e)}")
