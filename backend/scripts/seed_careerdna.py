import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.session import SessionLocal, engine
from app.models import Base
from app.models.assessment import AssessmentQuestion, AssessmentOption

def seed_careerdna():
    print("Re-initializing Database Schema...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    if db.query(AssessmentQuestion).count() > 0:
        print("Questions already seeded. Skipping.")
        db.close()
        return

    print("Seeding Hierarchical Career DNA Assessment Questions...")

    questions_data = [
        # ================= LEVEL 1: UNIVERSAL (Asked to every user) =================
        {
            "level": 1,
            "category": "Work Preference",
            "type": "either-or",
            "education": None,
            "occupation": None,
            "career_goals": None,
            "difficulty": 1.0,
            "text": "Your ideal work setting is...",
            "options": [
                {"text": "Working Solo (Deep Work)", "emoji": "🧘", "mapping": {"teamwork": 0.2, "problem_solving": 0.9}},
                {"text": "Small Agile Team", "emoji": "👥", "mapping": {"teamwork": 0.8, "communication": 0.7}},
                {"text": "Large Dynamic Organization", "emoji": "🏢", "mapping": {"leadership": 0.6, "business_orientation": 0.5}},
            ]
        },
        {
            "level": 1,
            "category": "Creativity",
            "type": "either-or",
            "education": None,
            "occupation": None,
            "career_goals": None,
            "difficulty": 1.0,
            "text": "When given a new project, you prefer to:",
            "options": [
                {"text": "Follow a proven template", "emoji": "📋", "mapping": {"creativity": 0.2, "execution": 0.8}},
                {"text": "Invent a completely new approach", "emoji": "💡", "mapping": {"creativity": 1.0, "problem_solving": 0.9}},
                {"text": "Combine existing ideas in a novel way", "emoji": "🧩", "mapping": {"creativity": 0.7, "analytical_thinking": 0.7}},
            ]
        },
        {
            "level": 1,
            "category": "Communication",
            "type": "scenario",
            "education": None,
            "occupation": None,
            "career_goals": None,
            "difficulty": 1.0,
            "text": "A colleague misunderstands your instructions. You...",
            "options": [
                {"text": "Write a detailed email to clarify", "emoji": "📧", "mapping": {"communication": 0.7, "analytical_thinking": 0.5}},
                {"text": "Schedule a quick 1-on-1 meeting", "emoji": "🤝", "mapping": {"communication": 1.0, "leadership": 0.8}},
                {"text": "Fix the mistake yourself", "emoji": "🛠️", "mapping": {"communication": 0.2, "execution": 0.9}},
            ]
        },

        # ================= LEVEL 2: EDUCATION/OCCUPATION SPECIFIC =================
        {
            "level": 2,
            "category": "Logical Reasoning",
            "type": "scenario",
            "education": "UG",
            "occupation": None,
            "career_goals": None,
            "difficulty": 1.5,
            "text": "(Undergrad) You are assigned a complex capstone project. First step?",
            "options": [
                {"text": "Break it into smaller milestones", "emoji": "📅", "mapping": {"analytical_thinking": 0.9, "execution": 0.8}},
                {"text": "Research the latest trends in the field", "emoji": "🔍", "mapping": {"learning_ability": 1.0, "analytical_thinking": 0.5}},
                {"text": "Start building a prototype immediately", "emoji": "🚀", "mapping": {"creativity": 0.8, "problem_solving": 0.8}},
            ]
        },
        {
            "level": 2,
            "category": "Career Growth",
            "type": "scenario",
            "education": None,
            "occupation": "Working Professional",
            "career_goals": None,
            "difficulty": 1.8,
            "text": "(Professional) Your manager offers a promotion that requires heavy travel. You...",
            "options": [
                {"text": "Accept immediately to accelerate career", "emoji": "📈", "mapping": {"business_orientation": 0.9, "leadership": 0.7}},
                {"text": "Analyze the financial vs lifestyle trade-off", "emoji": "⚖️", "mapping": {"financial_thinking": 1.0, "analytical_thinking": 0.8}},
            ]
        },

        # ================= LEVEL 3: CAREER GOAL SPECIFIC =================
        {
            "level": 3,
            "category": "Technology Interest",
            "type": "scenario",
            "education": None,
            "occupation": None,
            "career_goals": ["Software Engineer", "Data Scientist", "Cyber Security"],
            "difficulty": 1.8,
            "text": "(Tech) You are debugging a complex system where the error only occurs randomly. Your first step is to:",
            "options": [
                {"text": "Read the codebase line by line", "emoji": "📖", "mapping": {"analytical_thinking": 0.8, "tech_orientation": 0.4}},
                {"text": "Write a script to reproduce and isolate the issue", "emoji": "💻", "mapping": {"problem_solving": 1.0, "tech_orientation": 0.9}},
                {"text": "Search online for similar issues", "emoji": "🔍", "mapping": {"problem_solving": 0.9}},
            ]
        },
        {
            "level": 3,
            "category": "Financial Thinking",
            "type": "likert",
            "education": None,
            "occupation": None,
            "career_goals": ["MBA", "Entrepreneur", "Chartered Accountant"],
            "difficulty": 1.5,
            "text": "(Business) When making a strategic decision, I heavily rely on ROI and cost-benefit analysis before proceeding.",
            "options": [
                {"text": "1 - Rarely", "emoji": "1️⃣", "mapping": {"financial_thinking": 0.1}},
                {"text": "3 - Sometimes", "emoji": "3️⃣", "mapping": {"financial_thinking": 0.5}},
                {"text": "5 - Always", "emoji": "5️⃣", "mapping": {"financial_thinking": 1.0, "analytical_thinking": 0.5}},
            ]
        },
        {
            "level": 3,
            "category": "Public Service",
            "type": "scenario",
            "education": None,
            "occupation": None,
            "career_goals": ["IAS", "IPS"],
            "difficulty": 2.0,
            "text": "(Civil Service) Two community groups are in a dispute over resource allocation. As a mediator, you:",
            "options": [
                {"text": "Enforce the written policy strictly", "emoji": "⚖️", "mapping": {"decision_making": 0.8, "public_service": 0.5}},
                {"text": "Listen to both sides and find a compromise", "emoji": "🤝", "mapping": {"communication": 0.9, "public_service": 0.8}},
                {"text": "Analyze the long-term societal impact before deciding", "emoji": "🌍", "mapping": {"public_service": 1.0, "analytical_thinking": 0.8}},
            ]
        }
    ]

    for q_data in questions_data:
        q = AssessmentQuestion(
            level=q_data["level"],
            category=q_data["category"],
            type=q_data["type"],
            education=q_data["education"],
            occupation=q_data["occupation"],
            career_goals=q_data["career_goals"],
            difficulty=q_data["difficulty"],
            text=q_data["text"]
        )
        db.add(q)
        db.flush() # Get question ID

        for opt_data in q_data["options"]:
            opt = AssessmentOption(
                question_id=q.id,
                text=opt_data["text"],
                emoji=opt_data.get("emoji"),
                score_mapping=opt_data["mapping"]
            )
            db.add(opt)
            
    db.commit()
    print(f"Successfully seeded {len(questions_data)} Career DNA questions with Hierarchy.")
    db.close()

if __name__ == "__main__":
    seed_careerdna()
