import sys
import os
import json
from datetime import datetime
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.database.session import SessionLocal
from app.models.roadmap import Roadmap, RoadmapMilestone, LearningPlan, ProjectRecommendation
from app.models.user import User

db = SessionLocal()

def seed_roadmaps():
    user = db.query(User).first()
    if not user:
        print("No user found. Please login first.")
        return

    roadmaps_data = [
        {
            "title": "Software Engineer Execution Roadmap",
            "description": "Your Career DNA indicates strong Analytical and Tech Orientation. This accelerated roadmap focuses on building production-level skills, mastering system design, and establishing a robust GitHub portfolio to ensure you are interview-ready.",
            "estimated_months": 12,
            "phases": [
                {
                    "title": "Foundation & Core Programming",
                    "description": "Master data structures, algorithms, and core programming paradigms in Python or Java.",
                    "difficulty": "Intermediate",
                    "tasks": [
                        {"skill_name": "Master Data Structures (Trees, Graphs, Hash Maps)", "estimated_hours": 40, "resource_type": "Course", "resource_link": "https://leetcode.com/explore/"},
                        {"skill_name": "Object Oriented Programming Principles", "estimated_hours": 20, "resource_type": "Book", "resource_link": "Head First Design Patterns"}
                    ],
                    "projects": [
                        {"title": "CLI Task Manager", "level": "Beginner", "description": "Build a command-line interface tool to manage tasks using file I/O and standard libraries."}
                    ]
                },
                {
                    "title": "Backend Engineering & Databases",
                    "description": "Build scalable APIs and design efficient relational database schemas.",
                    "difficulty": "Advanced",
                    "tasks": [
                        {"skill_name": "Advanced SQL & Indexing", "estimated_hours": 30, "resource_type": "Course", "resource_link": "https://useTheIndexLuke.com/"},
                        {"skill_name": "RESTful API Design & Authentication", "estimated_hours": 25, "resource_type": "Documentation", "resource_link": "https://swagger.io/"}
                    ],
                    "projects": [
                        {"title": "E-Commerce REST API", "level": "Intermediate", "description": "Develop a fully authenticated backend with product management, cart caching (Redis), and PostgreSQL."}
                    ]
                },
                {
                    "title": "System Design & Interview Prep",
                    "description": "Learn to scale systems horizontally and practice mock system design interviews.",
                    "difficulty": "Advanced",
                    "tasks": [
                        {"skill_name": "Distributed Systems Concepts", "estimated_hours": 50, "resource_type": "Book", "resource_link": "Designing Data-Intensive Applications"},
                        {"skill_name": "Mock Interviews & Whiteboarding", "estimated_hours": 30, "resource_type": "Practice", "resource_link": "https://pramp.com"}
                    ],
                    "projects": [
                        {"title": "System Design: Scalable Chat App", "level": "Advanced", "description": "Write a detailed architecture document mapping out load balancers, WebSocket servers, and NoSQL databases."}
                    ]
                }
            ]
        },
        {
            "title": "IPS Officer Execution Roadmap",
            "description": "Leveraging your high Public Service and Leadership traits, this comprehensive roadmap is tailored for the UPSC Civil Services Examination with a focus on Police Services. Consistency and discipline are your primary requirements.",
            "estimated_months": 24,
            "phases": [
                {
                    "title": "UPSC Foundation & NCERTs",
                    "description": "Build a rock-solid foundation across all humanities subjects through NCERTs and begin daily current affairs tracking.",
                    "difficulty": "Beginner",
                    "tasks": [
                        {"skill_name": "Complete History & Geography NCERTs (Class 6-12)", "estimated_hours": 150, "resource_type": "Books", "resource_link": "ncert.nic.in"},
                        {"skill_name": "Daily Newspaper Analysis (The Hindu)", "estimated_hours": 60, "resource_type": "Habit", "resource_link": "https://thehindu.com"}
                    ],
                    "projects": [
                        {"title": "Current Affairs Repository", "level": "Beginner", "description": "Create a digital notebook (Notion/Evernote) categorized by GS Papers for daily notes."}
                    ]
                },
                {
                    "title": "Core Syllabus & Optional Subject",
                    "description": "Deep dive into standard reference books and master your chosen optional subject.",
                    "difficulty": "Advanced",
                    "tasks": [
                        {"skill_name": "Indian Polity by M. Laxmikanth", "estimated_hours": 80, "resource_type": "Book", "resource_link": "Standard Reference"},
                        {"skill_name": "Ethics, Integrity, and Aptitude", "estimated_hours": 50, "resource_type": "Book", "resource_link": "Lexicon"}
                    ],
                    "projects": [
                        {"title": "Mains Answer Writing Practice", "level": "Intermediate", "description": "Write 2 answers daily for previous year questions, focusing on structure and presentation."}
                    ]
                }
            ]
        }
    ]

    for data in roadmaps_data:
        # Avoid duplicates
        if db.query(Roadmap).filter(Roadmap.title == data["title"], Roadmap.user_id == user.id).first():
            continue

        roadmap = Roadmap(
            user_id=user.id,
            title=data["title"],
            description=data["description"],
            estimated_completion_months=data["estimated_months"],
            status="active",
            completion_percentage=0.0
        )
        db.add(roadmap)
        db.flush()

        for idx, p in enumerate(data["phases"]):
            milestone = RoadmapMilestone(
                roadmap_id=roadmap.id,
                title=p["title"],
                description=p["description"],
                sequence_order=idx + 1,
                difficulty=p["difficulty"],
                status="pending"
            )
            db.add(milestone)
            db.flush()

            for t in p["tasks"]:
                lp = LearningPlan(
                    milestone_id=milestone.id,
                    skill_name=t["skill_name"],
                    estimated_hours=t["estimated_hours"],
                    resource_type=t["resource_type"],
                    resource_link=t["resource_link"],
                    status="pending"
                )
                db.add(lp)
                
            for proj in p["projects"]:
                pr = ProjectRecommendation(
                    milestone_id=milestone.id,
                    title=proj["title"],
                    level=proj["level"],
                    description=proj["description"],
                    is_completed=False
                )
                db.add(pr)

    db.commit()
    print("Successfully seeded realistic AI roadmaps.")

if __name__ == "__main__":
    seed_roadmaps()
