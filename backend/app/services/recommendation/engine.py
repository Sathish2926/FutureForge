from sqlalchemy.orm import Session
from app.models.career import Career
from app.models.profile import CareerDNA, Profile
from app.models.recommendation import Recommendation, RecommendationWeightConfig
from app.services.ai.gemini_provider import GeminiProvider

class CareerRecommendationEngine:
    def __init__(self, db: Session, ai_provider=None):
        self.db = db
        self.ai_provider = ai_provider or GeminiProvider()

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
            raise ValueError("No careers found in the database. Please seed the database first.")
        
        # Example Matching Algorithm
        scored_careers = []
        for career in careers:
            # Deterministic Math (Simplified Example)
            # In production, this compares skills array intersection, salary match, etc.
            base_score = 0.5 # Dummy baseline
            
            # Simple check if any interest aligns with industry
            interest_match = 1.0 if profile.interests and career.industry in profile.interests else 0.5
            base_score += interest_match * config.interest_weight

            # Heavy weight on Career Goal
            goal_match = 0.0
            if profile.career_goal:
                if career.title.lower() in profile.career_goal.lower() or profile.career_goal.lower() in career.title.lower():
                    goal_match = 1.0
                elif career.industry.lower() in profile.career_goal.lower():
                    goal_match = 0.8
            base_score += goal_match * config.goal_weight * 2.0 # Boost goal weight

            scored_careers.append({
                "career": career,
                "score": min(base_score, 1.0)
            })

        # Sort and take top 3
        scored_careers.sort(key=lambda x: x["score"], reverse=True)
        top_careers = scored_careers[:3]

        # Clear existing recommendations for this user to prevent duplicates
        self.db.query(Recommendation).filter(Recommendation.user_id == user_id).delete()
        self.db.commit()

        recommendations = []
        for match in top_careers:
            # Generate AI Insights heavily relying on Career Goal
            dna_traits = f"Analytical: {dna.analytical}, Leadership: {dna.leadership}, Creativity: {dna.creativity}, Problem Solving: {dna.problem_solving}"
            prompt = (
                f"Explain why {match['career'].title} is a good fit for someone whose ultimate Career Goal is '{profile.career_goal or 'Undecided'}'. "
                f"Their Career DNA traits are: {dna_traits}. "
                f"Provide a clear justification for WHY this is recommended, and WHY NOT other alternative paths. "
                f"Ensure the discussion heavily aligns with their specific goal. If their goal is non-technical, do NOT discuss programming."
            )
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
