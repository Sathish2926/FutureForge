import re
from typing import Optional
# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas, recommendation
from app.database import get_db
from app.auth import get_current_user
from app.services.career_resolver import flatten_pathway_steps, resolve_or_create_career
from app.services.chat_system_prompt import build_chat_system_prompt

router = APIRouter(prefix="/api/ai", tags=["ai"])

# Phrases that typically precede a stated goal, used to pull out a
# candidate goal phrase when no curated-keyword match is found — this is
# what lets the advisor react to completely arbitrary goals ("I want to
# become a marine biologist", "how do I become a politician") instead of
# only the ~17 curated careers.
GOAL_PHRASE_PATTERNS = [
    r"(?:want to (?:become|be)|wanna be|become an?|be an?|career (?:as|in)|switch to|move into|interested in becoming an?)\s+([a-zA-Z /&-]{3,60})",
]


def _extract_free_text_goal(message: str) -> Optional[str]:
    for pattern in GOAL_PHRASE_PATTERNS:
        m = re.search(pattern, message, re.IGNORECASE)
        if m:
            candidate = m.group(1).strip().rstrip(".?!")
            # trim trailing filler words a regex like this tends to over-capture
            candidate = re.split(r"\b(?:and|but|so|because|as|since)\b", candidate)[0].strip()
            if candidate:
                return candidate
    return None


def _match_careers_in_message(db: Session, message: str):
    """Very small deterministic intent matcher: looks for career names/keywords
    the user mentions. This is what runs Gemini-free; a real Gemini call
    would replace this with proper NLU while keeping the same structured
    contract (recommendation + why + next steps + alternatives + risks)."""
    msg = message.lower()
    careers = db.query(models.Career).all()
    hits = []
    keyword_map = {
        "isro": "research-scientist-isro", "scientist": "research-scientist-isro", "space": "research-scientist-isro",
        "software": "software-engineer", "developer": "software-engineer", "coding": "software-engineer",
        "data science": "data-scientist", "machine learning": "data-scientist", "ai/ml": "data-scientist",
        "civil services": "civil-services-ias", "ias": "civil-services-ias", "upsc": "civil-services-ias",
        "doctor": "doctor-mbbs", "medicine": "doctor-mbbs", "mbbs": "doctor-mbbs",
        "lawyer": "lawyer", "law": "lawyer",
        "ca": "chartered-accountant", "chartered accountant": "chartered-accountant",
        "architect": "architect",
        "mechanical": "mechanical-engineer",
        "cyber": "cybersecurity-engineer", "security": "cybersecurity-engineer",
        "pilot": "commercial-pilot", "flying": "commercial-pilot",
        "defence": "defence-officer", "army": "defence-officer", "navy": "defence-officer", "air force": "defence-officer",
        "bank": "banking-professional",
        "design": "ui-ux-designer", "ux": "ui-ux-designer",
        "professor": "professor-researcher", "research": "professor-researcher", "phd": "professor-researcher",
        "entrepreneur": "entrepreneur", "startup": "entrepreneur",
        "electrician": "skilled-trade-electrician",
    }
    for kw, slug in keyword_map.items():
        if kw in msg:
            c = next((c for c in careers if c.slug == slug), None)
            if c and c not in hits:
                hits.append(c)
    return hits


CLASS10_DIRECTION_PATTERNS = [
    r"what\s+(?:should|can|do)\s+i\s+(?:study|do|pick|choose|take)\s+after\s+(?:10th|class\s+10|tenth)",
    r"which\s+(?:stream|group|subject)\s+(?:should|can|must)\s+i\s+(?:take|choose|pick|select)",
    r"science\s+or\s+commerce",
    r"which\s+group\s+suits\s+me",
    r"which\s+stream\s+is\s+suitable",
    r"i\s+am\s+confused\s+after\s+(?:10th|class\s+10)",
    r"confused\s+(?:between|about)\s+streams",
    r"stream\s+selection",
    r"what\s+can\s+i\s+do\s+after\s+10th",
]


def _is_class10_direction_query(message: str, user: models.User) -> bool:
    msg_lower = message.lower()
    for pattern in CLASS10_DIRECTION_PATTERNS:
        if re.search(pattern, msg_lower):
            return True
    stage = (user.profile.education_stage or "").lower() if user.profile else ""
    if stage == "class10" and ("study" in msg_lower or "stream" in msg_lower or "subject" in msg_lower or "next" in msg_lower):
        return True
    return False


def _build_12th_completed_fallback(message: str, past_messages: list) -> tuple[str, dict]:
    msg_lower = message.lower()
    all_text = " ".join([m.content.lower() for m in past_messages] + [msg_lower])

    # Check Quick-Reply Intent Routing Rule on already-shown recommendations
    is_followup = any(
        kw in msg_lower
        for kw in [
            "entrance exam", "exam date", "dates", "build roadmap", "roadmap for option",
            "vocational diploma", "option 1", "option 2", "how to prepare", "eligibility"
        ]
    ) and len(past_messages) >= 2

    # Detect stream
    stream = None
    if "pcmb" in all_text:
        stream = "Science (PCMB)"
    elif "pcm" in all_text:
        stream = "Science (PCM)"
    elif "pcb" in all_text:
        stream = "Science (PCB)"
    elif "commerce" in all_text:
        stream = "Commerce"
    elif "arts" in all_text or "humanities" in all_text:
        stream = "Humanities / Arts"

    # Detect subject affinity or enjoy/dislike
    enjoyed_or_disliked = None
    if any(k in all_text for k in ["math", "coding", "physics", "problem", "solve"]):
        enjoyed_or_disliked = "Enjoys analytical / math / problem-solving tasks"
    elif any(k in all_text for k in ["bio", "biology", "medical", "life science"]):
        enjoyed_or_disliked = "Drawn to life sciences / healthcare"
    elif any(k in all_text for k in ["design", "art", "creative", "drawing", "ui"]):
        enjoyed_or_disliked = "Enjoys creative / visual / design work"
    elif any(k in all_text for k in ["business", "finance", "money", "marketing", "trade"]):
        enjoyed_or_disliked = "Interested in business / finance"

    # Detect work style
    work_style = None
    if any(k in all_text for k in ["hands-on", "practical", "building", "project"]):
        work_style = "Prefers practical, hands-on project work"
    elif any(k in all_text for k in ["theory", "research", "studying", "academic"]):
        work_style = "Comfortable with academic / theoretical study"

    # Detect motivation or constraint
    motivation_or_constraint = None
    if any(k in all_text for k in ["job", "salary", "income", "placement", "fast"]):
        motivation_or_constraint = "Prioritizes fast job readiness / career ROI"
    elif any(k in all_text for k in ["stable", "stability", "govt", "exam", "defense", "nda"]):
        motivation_or_constraint = "Values stability / public service / competitive entry"

    signals_captured = [s for s in [stream, enjoyed_or_disliked, work_style, motivation_or_constraint] if s]
    signals_count = len(signals_captured)
    threshold_met = signals_count >= 3

    signal_state = {
        "stream": stream,
        "subject_affinity": enjoyed_or_disliked,
        "enjoyed_or_disliked": enjoyed_or_disliked,
        "work_style": work_style,
        "motivation_or_constraint": motivation_or_constraint,
        "signals_captured_count": signals_count,
        "threshold_met": threshold_met,
    }

    if is_followup:
        # Handle specific quick-reply follow-up without duplicating the entire recommendation block
        if "exam" in msg_lower or "date" in msg_lower:
            reply = (
                "Here are the key entrance exam windows to check right now for 12th-completed students:\n\n"
                "1. **CUET (UG)**: Central and participating state universities (registration typically Feb–April, exams May–June).\n"
                "2. **State Common Entrance Tests (CETs)**: For state engineering and professional colleges (March–May window).\n"
                "3. **Specialized Entrance Exams**: Design (NID/UCEED), Defense (NDA twice yearly), and Law (CLAT).\n\n"
                "Always verify exact deadlines and fee circulars directly on official testing portals (e.g. nta.ac.in or state CET cells)."
            )
            quick_replies = [
                "Build roadmap for Option 1",
                "Explore vocational diplomas",
                "Review college eligibility",
                "Something else — I'll type it",
            ]
        elif "roadmap" in msg_lower or "option 1" in msg_lower:
            reply = (
                "Here is an immediate action sequence for your prioritized direction:\n\n"
                "- **Month 1 (Exploration & Registration)**: Complete target exam forms and download official syllabus.\n"
                "- **Months 2–4 (Skill Baseline)**: Work through foundational problem sets and build 1 practical project or study plan.\n"
                "- **Month 5+ (Application & Counseling)**: Participate in institutional counseling rounds with your preferred specializations."
            )
            quick_replies = [
                "Check entrance exam dates",
                "Explore vocational diplomas",
                "Review target specializations",
                "Something else — I'll type it",
            ]
        else:
            reply = (
                f"Addressing your request for '{message}':\n\n"
                "Vocational diplomas and skill tracks provide practical, fast-track competency in 6–12 months. "
                "They focus 80% on lab/project work and 20% on theory, giving you rapid entry into entry-level industry roles "
                "with the option to pursue a degree later."
            )
            quick_replies = [
                "Check entrance exam dates",
                "Build roadmap for Option 1",
                "Review degree alternatives",
                "Something else — I'll type it",
            ]

        structured = {
            "reply_to_student": reply,
            "signal_state": signal_state,
            "flags": {
                "off_scope": False,
                "needs_human_support": False,
                "contradiction_detected": False,
                "is_followup_on_existing_recommendations": True,
            },
            "recommendations": [],
            "priority_pick": None,
            "next_step": {
                "type": "action",
                "content": "Select your next action or tell me what else you'd like to investigate.",
                "quick_replies": quick_replies,
            },
        }
        return reply, structured

    if not threshold_met:
        # Before threshold met: Signal Gating Rule enforces empty recommendations, priority_pick: null, and ONE next question with quick_replies
        if stream == "Science (PCMB)":
            reply = (
                "Got it — PCMB keeps both math/engineering and biology/medical-adjacent pathways open. "
                "Because having both can pull you in opposite directions, what did you actually enjoy more "
                "day-to-day: solving analytical/math problems, studying life sciences, or doing something more visual or practical?"
            )
            quick_replies = [
                "Loved Math & logical solving",
                "Preferred Biology & healthcare",
                "Want hands-on tech / coding",
                "Leaning creative or design",
                "Something else — I'll type it",
            ]
        elif stream in ("Science (PCM)", "Science (PCB)"):
            reply = (
                f"Understood — you completed 12th in {stream}. That gives us a solid baseline. "
                "To see which directions actually fit your personality, what kind of work style appeals to you more?"
            )
            quick_replies = [
                "Hands-on building & tech",
                "Research & pure science",
                "Fast job-ready skill track",
                "Design & visual creative",
                "Something else — I'll type it",
            ]
        else:
            reply = (
                "Thanks for sharing. To give you recommendations tailored to how you actually work and think, "
                "which subjects or activities in 11th-12th felt most engaging to you?"
            )
            quick_replies = [
                "Math & logical problems",
                "Business, accounts & finance",
                "Creative arts & design",
                "Writing & social sciences",
                "Something else — I'll type it",
            ]

        structured = {
            "reply_to_student": reply,
            "signal_state": signal_state,
            "flags": {
                "off_scope": False,
                "needs_human_support": False,
                "contradiction_detected": False,
                "is_followup_on_existing_recommendations": False,
            },
            "recommendations": [],
            "priority_pick": None,
            "next_step": {
                "type": "question",
                "content": "Which subjects or day-to-day activities felt most engaging to you?",
                "quick_replies": quick_replies,
            },
        }
        return reply, structured

    # When threshold is met (>= 3 signals):
    stream_focus = "Technology & Computing" if "math" in all_text or "pcm" in all_text else "Applied Science"
    reply = (
        "Based on what you've shared so far, we have enough clear signal to compare concrete directions across "
        "multiple pathway categories. Here are your strongest tailored directions:"
    )
    recs = [
        {
            "path_category": "degree",
            "title": f"B.Tech / Applied Degree in {stream_focus}",
            "why_this_fits": f"Your background in {stream or '12th'} paired with your interest in {enjoyed_or_disliked or 'problem solving'} provides strong academic leverage for structured degree programs.",
            "fit_confidence": "high",
            "specializations": [
                f"{stream_focus} Systems",
                "Applied Computing & Data Science",
                "Core Engineering Specialization",
            ],
            "realistic_requirements": "Entrance examinations (CUET / state CET / institution entrance) and 12th board eligibility (verify with official source)",
            "next_action_this_week": "Review 2-3 target universities and their entrance exam registration deadlines.",
            "alt_path": "Polytechnic Diploma in Computing / 1-year Industry Tech Certification (faster 12-month job entry, lower degree ceiling initially).",
        },
        {
            "path_category": "skill_vocational",
            "title": "Professional Industry Diploma & Portfolio Track",
            "why_this_fits": f"Connecting your preference for {work_style or 'practical work'} with {motivation_or_constraint or 'career readiness'}, a focused certification or polytechnic track builds immediate hireable competence.",
            "fit_confidence": "medium",
            "specializations": [
                "Full-Stack Development & Cloud",
                "UI/UX & Product Design",
                "Applied Practical Trades",
            ],
            "realistic_requirements": "Hands-on project work, portfolio building, or industry certification (no entrance exam)",
            "next_action_this_week": "Complete a 1-hour trial tutorial or starter project to evaluate your day-to-day enjoyment.",
            "alt_path": None,
        },
    ]
    structured = {
        "reply_to_student": reply,
        "signal_state": signal_state,
        "flags": {
            "off_scope": False,
            "needs_human_support": False,
            "contradiction_detected": False,
            "is_followup_on_existing_recommendations": False,
        },
        "recommendations": recs,
        "priority_pick": f"{recs[0]['title']} — establishes foundational accreditation while allowing you to specialize with practical skills.",
        "next_step": {
            "type": "action",
            "content": "Would you like to build a step-by-step roadmap for one of these directions, or explore alternative routes?",
            "quick_replies": [
                "Build roadmap for Option 1",
                "Explore vocational diplomas",
                "Check entrance exam dates",
                "Something else — I'll type it",
            ],
        },
    }
    return reply, structured



@router.post("/chat", response_model=schemas.ChatResponse)
def chat(payload: schemas.ChatRequest, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    if payload.conversation_id:
        conv = db.query(models.AIConversation).get(payload.conversation_id)
        if not conv or conv.user_id != user.id:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conv = models.AIConversation(user_id=user.id, title=payload.message[:60])
        db.add(conv)
        db.flush()

    # Capture past messages for conversation memory before adding the new message
    past_messages = list(conv.messages) if conv and conv.messages else []
    db.add(models.AIMessage(conversation_id=conv.id, role="user", content=payload.message))

    # Check for Class 10 Post-10th Direction Intent first
    if _is_class10_direction_query(payload.message, user):
        reply = (
            "You're at the stream-selection stage after Class 10! You don't need to choose a specific lifelong career yet.\n\n"
            "In Class 10, your primary decision is choosing a stream / subject direction (such as Science PCM, Science PCB, Commerce, or Humanities) that keeps your favorite future degree options open while testing your real interests.\n\n"
            "Here is how we can help you choose the right stream:\n"
            "1. **Start My Direction Assessment**: Uncover your favorite subjects, work style, and academic strengths.\n"
            "2. **Use My Existing Career DNA**: View your generated stream map, option values, and trade-offs.\n"
            "3. **Explore Streams**: Compare PCM, PCB, Commerce, and Humanities side-by-side."
        )
        structured = {
            "intent": "POST_10_EDUCATION_DIRECTION",
            "stage": "class10",
            "actions": [
                {"label": "Start My Direction Assessment", "action": "open_assessment", "url": "/career-dna"},
                {"label": "Use My Existing Career DNA", "action": "open_career_dna", "url": "/career-dna"},
                {"label": "Explore Streams", "action": "explore_streams", "url": "/career-dna"},
            ],
            "blocks": [],
        }
        db.add(models.AIMessage(conversation_id=conv.id, role="assistant", content=reply))
        db.commit()
        return schemas.ChatResponse(
            conversation_id=conv.id, reply=reply, structured=structured,
            ai_model_used=None,
        )

    matched_careers = _match_careers_in_message(db, payload.message)
    generated_career = None
    if not matched_careers:
        candidate_goal = _extract_free_text_goal(payload.message)
        if candidate_goal:
            generated_career = resolve_or_create_career(db, candidate_goal)
            matched_careers = [generated_career]

    # Assemble the Futureforge system prompt with student context
    education_stage = payload.stage or (user.profile.education_stage if user.profile else None)
    career_dna_summary = None
    # If the user has Career DNA results, extract a summary for the LLM
    if hasattr(user, 'career_dna_result') and user.career_dna_result:
        try:
            import json as _json
            dna_data = user.career_dna_result.result_json
            if isinstance(dna_data, str):
                dna_data = _json.loads(dna_data)
            career_dna_summary = {
                "domain_scores": dna_data.get("domain_scores", {}),
                "top_streams": [d.get("name", "") for d in dna_data.get("directions", [])[:3]],
                "profile_status": dna_data.get("profile_status", "unknown"),
            }
        except Exception:
            pass  # Career DNA extraction failed; proceed without it

    norm_stage = (education_stage or "").strip().lower()
    is_12th_flow = norm_stage in ("class12", "12th", "12th_completed", "class 12", "class_12")

    system_prompt = build_chat_system_prompt(
        education_stage=education_stage,
        career_dna_summary=career_dna_summary,
        prompt_mode="12th_completed" if is_12th_flow else None,
    )

    if is_12th_flow:
        dialogue = []
        for m in past_messages[-10:]:
            role_label = "Student" if m.role == "user" else "Assistant"
            dialogue.append(f"{role_label}: {m.content}")
        if dialogue:
            dialogue_str = "\n".join(dialogue)
            prompt_to_llm = (
                f"Conversation history:\n{dialogue_str}\n\n"
                f"Latest student message:\nStudent: {payload.message}\n\n"
                f"Follow the CONVERSATION MEMORY RULE, SIGNAL-GATING RULE, QUICK-REPLY RULE, and OUTPUT SCHEMA. "
                f"Respond strictly in valid JSON."
            )
        else:
            prompt_to_llm = (
                f"Student: {payload.message}\n\n"
                f"Follow the CONVERSATION MEMORY RULE, SIGNAL-GATING RULE, QUICK-REPLY RULE, and OUTPUT SCHEMA. "
                f"Respond strictly in valid JSON."
            )
    else:
        prompt_to_llm = f"User asked: {payload.message}. Provide career guidance."

    gemini_text = recommendation.try_gemini_explain(
        prompt_to_llm,
        system_prompt=system_prompt,
    )

    if is_12th_flow:
        # Parse JSON output from 12th completed guide
        parsed_json = None
        if gemini_text:
            cleaned = gemini_text.strip()
            if cleaned.startswith("```"):
                lines = cleaned.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].strip().startswith("```"):
                    lines = lines[:-1]
                cleaned = "\n".join(lines).strip()
            try:
                import json as _json
                parsed_json = _json.loads(cleaned)
            except Exception:
                parsed_json = None

        if isinstance(parsed_json, dict) and "reply_to_student" in parsed_json:
            reply = parsed_json["reply_to_student"]
            # Ensure quick_replies always ends with "Something else — I'll type it"
            next_step = parsed_json.get("next_step") or {}
            qr = next_step.get("quick_replies")
            if qr and isinstance(qr, list):
                if not any("something else" in q.lower() for q in qr):
                    qr.append("Something else — I'll type it")
            structured = parsed_json
        elif gemini_text:
            reply = gemini_text
            structured = {
                "reply_to_student": reply,
                "signal_state": {
                    "stream": None,
                    "subject_affinity": None,
                    "enjoyed_or_disliked": None,
                    "work_style": None,
                    "motivation_or_constraint": None,
                    "signals_captured_count": 1,
                    "threshold_met": False,
                },
                "flags": {"off_scope": False, "needs_human_support": False, "contradiction_detected": False},
                "recommendations": [],
                "priority_pick": None,
                "next_step": {
                    "type": "question",
                    "content": "Tell me more about the subjects or activities you enjoyed most in 12th.",
                    "quick_replies": [
                        "Loved analytical & math tasks",
                        "Preferred life sciences & biology",
                        "Interested in business & finance",
                        "Drawn to creative arts & design",
                        "Something else — I'll type it",
                    ],
                },
            }
        else:
            reply, structured = _build_12th_completed_fallback(payload.message, past_messages)

    elif matched_careers:
        structured_blocks = []
        for career in matched_careers[:2]:
            score_result = recommendation.score_career(db, user, career)
            reasoning = recommendation.generate_reasoning(user, career, score_result)
            alt_pathways = [p.title for p in career.pathways if p.route_type != "common"]
            first_pathway_steps = flatten_pathway_steps(career.pathways[0].steps_json) if career.pathways else []
            structured_blocks.append({
                "recommendation": career.name,
                "is_user_generated": career.is_user_generated,
                "why_this_fits_you": reasoning["evidence"] + ". " + reasoning["match_summary"],
                "what_to_do_next": (first_pathway_steps[0]["action"] if first_pathway_steps else "Explore the full roadmap for this career."),
                "alternative_options": alt_pathways,
                "risks_tradeoffs": reasoning["tradeoffs"],
                "confidence": reasoning["confidence"],
                "sources": ("Generated from a general sector template — this career isn't in the curated catalogue "
                            "yet, so verify exam names, eligibility, and deadlines on official sources before relying on it."
                            if career.is_user_generated else
                            "Structured career catalogue (verify exam/eligibility specifics on official sources)."),
            })
        reply_lines = []
        for block in structured_blocks:
            generated_note = "\n\n_This pathway was generated from a general template since it isn't in the curated catalogue yet — verify specifics on official sources._" if block["is_user_generated"] else ""
            reply_lines.append(
                f"**{block['recommendation']}**{generated_note}\n\n"
                f"Why this fits you: {block['why_this_fits_you']}\n\n"
                f"What to do next: {block['what_to_do_next']}\n\n"
                f"Alternative options: {', '.join(block['alternative_options']) if block['alternative_options'] else 'See career details for more routes.'}\n\n"
                f"Risks / trade-offs: {block['risks_tradeoffs']}\n\n"
                f"Confidence: {block['confidence']}"
            )
        reply = gemini_text or "\n\n---\n\n".join(reply_lines)
        structured = {"blocks": structured_blocks}
    else:
        reply = gemini_text or (
            "I couldn't quite pin down a specific career or field from that — could you name it directly? "
            "For example: \"I want to become a marine biologist\" or \"career in politics\". "
            "This works for any field, not just a fixed list — you can also browse the Career Explorer."
        )
        structured = {"blocks": []}

    db.add(models.AIMessage(conversation_id=conv.id, role="assistant", content=reply))
    db.commit()

    return schemas.ChatResponse(
        conversation_id=conv.id, reply=reply, structured=structured,
        ai_model_used="gemini" if gemini_text else None,
    )



@router.get("/conversations")
def list_conversations(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    convs = db.query(models.AIConversation).filter_by(user_id=user.id).all()
    return [{"id": c.id, "title": c.title, "message_count": len(c.messages)} for c in convs]


@router.get("/conversations/{conv_id}")
def get_conversation(conv_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    conv = db.query(models.AIConversation).get(conv_id)
    if not conv or conv.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    return {"id": conv.id, "title": conv.title,
            "messages": [{"role": m.role, "content": m.content} for m in conv.messages]}
