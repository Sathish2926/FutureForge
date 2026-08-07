import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.session import SessionLocal, engine
from app.models import Base
from app.models.assessment import AssessmentQuestion, AssessmentOption, AssessmentSession, AssessmentResponse

def reset():
    print("Dropping tables...")
    AssessmentResponse.__table__.drop(engine, checkfirst=True)
    AssessmentSession.__table__.drop(engine, checkfirst=True)
    AssessmentOption.__table__.drop(engine, checkfirst=True)
    AssessmentQuestion.__table__.drop(engine, checkfirst=True)
    
    print("Re-creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Done!")

if __name__ == "__main__":
    reset()
