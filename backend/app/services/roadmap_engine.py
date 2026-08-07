import json
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.roadmap import Roadmap, RoadmapMilestone, LearningPlan, ProjectRecommendation
from app.models.profile import Profile, CareerDNA
from app.services.ai.gemini_provider import GeminiProvider

class RoadmapGeneratorService:
    def __init__(self, db: Session):
        self.db = db
        self.ai = GeminiProvider()

    async def generate_roadmap(self, user_id: int, target_career: str = None, timeline: str = "Standard", skill_level: str = "Beginner", priority: str = "Balanced") -> Roadmap:
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        cdna = self.db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
        
        goal = target_career or (profile.career_goal if profile else "Professional Career")
        
        # Build comprehensive context
        context = {
            "career_goal": goal,
            "education": profile.education_level if profile else "Unknown",
            "occupation": profile.occupation if profile else "Unknown",
            "timeline": timeline,
            "skill_level": skill_level,
            "priority": priority,
            "dna": {}
        }
        
        if cdna:
            context["dna"] = {
                "identity": cdna.career_identity,
                "strengths": cdna.strengths or [],
                "growth_areas": cdna.growth_areas or [],
                "scores": {
                    "leadership": cdna.leadership,
                    "communication": cdna.communication,
                    "programming": cdna.programming,
                    "analytical": cdna.analytical,
                    "problem_solving": cdna.problem_solving,
                    "business": cdna.business_orientation,
                    "public_service": cdna.public_service
                }
            }

        prompt = f"""
        You are an elite AI Career Coach and Execution Engine. 
        Generate a highly personalized, structured execution roadmap for this user.
        
        USER CONTEXT:
        {json.dumps(context, indent=2)}

        RULES:
        1. Break the roadmap into exact Phases (e.g., Phase 1: Foundation, Phase 2: Core Skills, etc).
        2. Each Phase must contain actionable tasks (Learning Plans) and Projects.
        3. If their goal is IPS/IAS or Civil Services, include UPSC syllabus, NCERT, Current Affairs, Physical Fitness, Ethics, Public Administration. DO NOT include programming.
        4. If their goal is MBA, include CAT preparation, Business Analytics, Leadership, Case Studies. DO NOT include software engineering unless specifically asked.
        5. Personalize based on their DNA. If Communication is weak, add communication tasks. If Leadership is high, add leadership activities.
        6. For each task, suggest specific resources (Courses, Books, YouTube, Official Websites).
        7. Incorporate the requested Timeline ({timeline}), Skill Level ({skill_level}), and Priority ({priority}).
        
        Return ONLY valid JSON matching this schema exactly:
        {{
            "title": "String - e.g. IPS Officer Execution Roadmap",
            "description": "String - Rich AI Summary of this specific roadmap. Include current readiness assessment and a motivational overview based on their DNA and skill level.",
            "estimated_months": 24,
            "phases": [
                {{
                    "title": "String - Phase 1: Foundation",
                    "description": "String - Goal of this phase",
                    "difficulty": "Beginner/Intermediate/Advanced",
                    "tasks": [
                        {{
                            "skill_name": "String - Actionable task name",
                            "estimated_hours": 40,
                            "resource_type": "Course/Book/YouTube/Practice",
                            "resource_link": "String - specific title or URL"
                        }}
                    ],
                    "projects": [
                        {{
                            "title": "String - Project or Milestone name",
                            "level": "String",
                            "description": "String - What to do"
                        }}
                    ]
                }}
            ]
        }}
        """

        try:
            result = await self.ai.generate_structured_completion(prompt, db=self.db)
        except Exception as e:
            print("Error generating roadmap:", e)
            raise ValueError("Failed to generate AI roadmap.")

        # Allow multiple active roadmaps. Do not archive automatically unless explicitly requested.

        roadmap = Roadmap(
            user_id=user_id,
            career_id=None,
            title=result.get("title", f"{goal} Roadmap"),
            description=result.get("description", "AI Generated Roadmap"),
            estimated_completion_months=result.get("estimated_months", 12),
            status="active"
        )
        self.db.add(roadmap)
        self.db.flush()

        phases = result.get("phases", [])
        for idx, p in enumerate(phases):
            milestone = RoadmapMilestone(
                roadmap_id=roadmap.id,
                title=p.get("title", f"Phase {idx+1}"),
                description=p.get("description", ""),
                sequence_order=idx + 1,
                difficulty=p.get("difficulty", "Medium"),
                status="pending"
            )
            self.db.add(milestone)
            self.db.flush()

            for task in p.get("tasks", []):
                lp = LearningPlan(
                    milestone_id=milestone.id,
                    skill_name=task.get("skill_name", "Learn Skill"),
                    estimated_hours=task.get("estimated_hours", 10),
                    resource_type=task.get("resource_type", "Course"),
                    resource_link=task.get("resource_link", ""),
                    status="pending"
                )
                self.db.add(lp)
                
            for proj in p.get("projects", []):
                pr = ProjectRecommendation(
                    milestone_id=milestone.id,
                    title=proj.get("title", "Project"),
                    level=proj.get("level", "Beginner"),
                    description=proj.get("description", ""),
                    is_completed=False
                )
                self.db.add(pr)

        self.db.commit()
        self.db.refresh(roadmap)
        return roadmap
