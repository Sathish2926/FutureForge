import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.session import SessionLocal
from app.models.assessment import AssessmentSession
from app.services.career_dna_engine import ScoringEngineService, ContextBuilderService
import asyncio

async def test_complete():
    db = SessionLocal()
    # Find the latest session
    session = db.query(AssessmentSession).order_by(AssessmentSession.id.desc()).first()
    if not session:
        print("No session found.")
        return

    print(f"Testing completion for session {session.id}, user {session.user_id}")
    try:
        scoring = ScoringEngineService(db)
        cdna = scoring.calculate_scores(session.id, session.user_id)
        print("Scoring successful:", cdna.id)
    except Exception as e:
        print("Error in scoring:", e)
        import traceback
        traceback.print_exc()
        return

    try:
        context_builder = ContextBuilderService(db)
        cdna = await context_builder.generate_ai_summary(session.user_id)
        print("Context building successful:", cdna.id if cdna else None)
    except Exception as e:
        print("Error in context building:", e)
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_complete())
