from sqlalchemy.orm import Session
from app.models.career import Career
from app.models.profile import CareerDNA, Profile
from app.models.recommendation import Recommendation, RecommendationWeightConfig
from app.services.ai.mock_provider import MockAIProvider

class CareerRecommendationEngine:
    def __init__(self, db: Session, ai_provider=None):
        self.db = db
        self.ai_provider = ai_provider or MockAIProvider()

    async def generate_recommendations(self, user_id: int):
        dna = self.db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()

        if not dna or not profile:
            raise ValueError("User Profile or Career DNA incomplete.")

        # Fetch active configuration
        config = self.db.query(RecommendationWeightConfig).filter(RecommendationWeightConfig.is_active == True).first()
        if not config:
            config = RecommendationWeightConfig() # use defaults
            self.db.add(config)
            self.db.commit()

        # Fetch all careers
        careers = self.db.query(Career).all()
        if not careers:
            # Auto-seed mock careers for demonstration
            mock_careers = [
                Career(title="AI Engineer", industry="Technology", base_salary_min=10.0, base_salary_max=25.0, demand_score=9.5, difficulty="High", required_education="B.Tech CS"),
                Career(title="Product Manager", industry="Business", base_salary_min=12.0, base_salary_max=30.0, demand_score=8.5, difficulty="Medium", required_education="MBA"),
                Career(title="Data Scientist", industry="Technology", base_salary_min=9.0, base_salary_max=22.0, demand_score=9.0, difficulty="High", required_education="B.Tech/M.Sc"),
                Career(title="Digital Marketing Specialist", industry="Marketing", base_salary_min=4.0, base_salary_max=12.0, demand_score=8.0, difficulty="Low", required_education="Any Degree"),
                Career(title="UI/UX Designer", industry="Design", base_salary_min=6.0, base_salary_max=18.0, demand_score=8.5, difficulty="Medium", required_education="Design Degree/Portfolio")
            ]
            self.db.add_all(mock_careers)
            self.db.commit()
            careers = self.db.query(Career).all()
        
        # Example Matching Algorithm
        scored_careers = []
        for career in careers:
            # Deterministic Math (Simplified Example)
            # In production, this compares skills array intersection, salary match, etc.
            base_score = 0.5 # Dummy baseline
            
            # Simple check if any interest aligns with industry
            interest_match = 1.0 if profile.interests and career.industry in profile.interests else 0.5
            base_score += interest_match * config.interest_weight

            scored_careers.append({
                "career": career,
                "score": min(base_score, 1.0)
            })

        # Sort and take top 3
        scored_careers.sort(key=lambda x: x["score"], reverse=True)
        top_careers = scored_careers[:3]

        recommendations = []
        for match in top_careers:
            # Generate AI Insights
            prompt = f"Explain why {match['career'].title} is a good fit for someone with interests {profile.interests}."
            ai_insights = await self.ai_provider.generate_structured_completion(prompt)

            # Persist to DB
            rec = Recommendation(
                user_id=user_id,
                career_id=match["career"].id,
                match_percentage=round(match["score"] * 100, 2),
                confidence_score=85.0, # Dummy confidence
                why_recommended=ai_insights.get("why_recommended", ""),
                why_not_others=ai_insights.get("why_not_others", ""),
                strengths=ai_insights.get("strengths", []),
                weaknesses=ai_insights.get("weaknesses", []),
                missing_skills=ai_insights.get("missing_skills", []),
                learning_suggestions=ai_insights.get("learning_suggestions", []),
                weights_used={
                    "academic": config.academic_weight,
                    "skills": config.skills_weight,
                    "interest": config.interest_weight,
                    "personality": config.personality_weight,
                    "goal": config.goal_weight,
                    "location": config.location_weight
                }
            )
            self.db.add(rec)
            recommendations.append(rec)
            
        self.db.commit()
        return recommendations
