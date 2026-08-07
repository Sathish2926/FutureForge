import json
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.assessment import AssessmentQuestion, AssessmentSession, AssessmentResponse, AssessmentOption
from app.models.profile import CareerDNA, Profile
from app.services.ai.gemini_provider import GeminiProvider

class AdaptiveEngineService:
    def __init__(self, db: Session):
        self.db = db

    def get_next_questions(self, session_id: int, user_id: int, limit: int = 3) -> List[dict]:
        session = self.db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
        if not session:
            raise ValueError("Session not found")
        
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        answered_ids = [r.question_id for r in session.responses]
        
        # Analyze current progress
        total_answered = len(answered_ids)
        
        # Define hierarchy thresholds
        # First 3 questions -> Level 1 (Universal)
        # Next 3 questions -> Level 2 (Education/Occupation specific)
        # Next 4 questions -> Level 3 (Career Goal specific)
        
        current_level = 1
        if total_answered >= 6:
            current_level = 3
        elif total_answered >= 3:
            current_level = 2

        query = self.db.query(AssessmentQuestion).filter(AssessmentQuestion.level == current_level)
        
        if answered_ids:
            query = query.filter(~AssessmentQuestion.id.in_(answered_ids))
            
        if profile:
            if current_level == 2:
                # Level 2 filters
                edu = profile.education_level
                occ = profile.occupation
                if edu or occ:
                    query = query.filter(
                        or_(
                            AssessmentQuestion.education == edu,
                            AssessmentQuestion.occupation == occ,
                            AssessmentQuestion.education == None
                        )
                    )
            elif current_level == 3 and profile.career_goal:
                # Level 3 filters
                goal = profile.career_goal.lower()
                
                # Check JSON contains or text match
                # Since SQLite JSON is tricky in basic SQLAlchemy without dialects, we fallback to python-side filtering if needed
                # But here we fetch potential questions and filter in python for accuracy across goals
                pass

        questions_pool = query.all()
        
        # Python-side filtering for Level 3 JSON array matching (safer for SQLite)
        if current_level == 3 and profile and profile.career_goal:
            goal = profile.career_goal.lower()
            filtered_pool = []
            for q in questions_pool:
                if q.career_goals:
                    if any(goal in g.lower() or g.lower() in goal for g in q.career_goals):
                        filtered_pool.append(q)
                else:
                    filtered_pool.append(q)
            questions_pool = filtered_pool
            
        questions = questions_pool[:limit]
        
        # If we exhausted the current level, try fetching from the next level
        if not questions and current_level < 3:
            return self.get_next_fallback(session_id, user_id, limit, current_level + 1, answered_ids, profile)
        
        results = []
        for q in questions:
            options = [{"id": opt.id, "text": opt.text, "emoji": opt.emoji} for opt in q.options]
            results.append({
                "id": q.id,
                "category": q.category,
                "type": q.type,
                "text": q.text,
                "difficulty": q.difficulty,
                "options": options
            })
        return results
        
    def get_next_fallback(self, session_id, user_id, limit, fallback_level, answered_ids, profile):
        query = self.db.query(AssessmentQuestion).filter(AssessmentQuestion.level == fallback_level)
        if answered_ids:
            query = query.filter(~AssessmentQuestion.id.in_(answered_ids))
            
        questions = query.limit(limit).all()
        results = []
        for q in questions:
            options = [{"id": opt.id, "text": opt.text, "emoji": opt.emoji} for opt in q.options]
            results.append({
                "id": q.id,
                "category": q.category,
                "type": q.type,
                "text": q.text,
                "difficulty": q.difficulty,
                "options": options
            })
        return results

class ScoringEngineService:
    def __init__(self, db: Session):
        self.db = db

    def calculate_scores(self, session_id: int, user_id: int):
        session = self.db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
        responses = session.responses
        
        trait_scores = {}
        max_possible = {}

        for resp in responses:
            q = resp.question
            opt = resp.option
            if not opt or not opt.score_mapping:
                continue
                
            weight = q.difficulty
            mapping = opt.score_mapping
            if isinstance(mapping, str):
                mapping = json.loads(mapping)
                
            for trait, score_val in mapping.items():
                if trait not in trait_scores:
                    trait_scores[trait] = 0.0
                    max_possible[trait] = 0.0
                
                trait_scores[trait] += (score_val * weight)
                max_possible[trait] += (1.0 * weight) 
                
        final_scores = {}
        for trait in trait_scores:
            if max_possible[trait] > 0:
                final_scores[trait] = round((trait_scores[trait] / max_possible[trait]) * 100, 1)
            else:
                final_scores[trait] = 0.0

        confidence = {}
        for trait in final_scores:
            confidence[trait] = 85.0

        top_traits = sorted(final_scores.items(), key=lambda item: item[1], reverse=True)
        identity = "Balanced Generalist"
        if len(top_traits) >= 2:
            t1, t2 = top_traits[0][0], top_traits[1][0]
            if "leadership" in t1 and "tech" in t2: identity = "Visionary Creator"
            elif "logic" in t1 and "tech" in t2: identity = "System Thinker"
            elif "creativity" in t1: identity = "Practical Innovator"
            elif "public_service" in t1: identity = "Community Leader"
            elif "leadership" in t1 and "business" in t2: identity = "Strategic Builder"
            elif "analytical_thinking" in t1: identity = "Analytical Problem Solver"

        cdna = self.db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
        if not cdna:
            cdna = CareerDNA(user_id=user_id)
            self.db.add(cdna)
            
        cdna.leadership = final_scores.get("leadership", 0.0)
        cdna.analytical = final_scores.get("analytical_thinking", 0.0)
        cdna.communication = final_scores.get("communication", 0.0)
        cdna.creativity = final_scores.get("creativity", 0.0)
        cdna.business_orientation = final_scores.get("business_orientation", 0.0)
        cdna.programming = final_scores.get("tech_orientation", 0.0)
        cdna.financial_thinking = final_scores.get("financial_thinking", 0.0)
        cdna.public_service = final_scores.get("public_service", 0.0)
        cdna.problem_solving = final_scores.get("problem_solving", 0.0)
        
        cdna.career_identity = identity
        cdna.confidence_scores = confidence
        
        self.db.commit()
        return cdna

class ContextBuilderService:
    def __init__(self, db: Session):
        self.db = db
        self.ai = GeminiProvider()

    async def generate_ai_summary(self, user_id: int):
        cdna = self.db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        
        if not cdna:
            return None

        goal = profile.career_goal if profile else "Undecided"
        edu = profile.education_level if profile else "Unknown"
        
        payload = {
            "user": {
                "education": edu,
                "goal": goal,
                "identity": cdna.career_identity
            },
            "traits": {
                "leadership": cdna.leadership,
                "analytical": cdna.analytical,
                "communication": cdna.communication,
                "tech_orientation": cdna.programming,
                "financial_thinking": cdna.financial_thinking,
                "problem_solving": cdna.problem_solving
            }
        }

        prompt = f"""
        You are an elite career mentor. Analyze this Career DNA profile:
        {json.dumps(payload, indent=2)}

        Provide a structured JSON response containing:
        1. "personalized_summary": A short motivational overview (3 sentences).
        2. "career_goal_reality_check": Analyze their goal ({goal}) vs their traits. Are they ready? What needs improvement? Provide realistic pathway adjustments.
        3. "strengths": List of 3 top strength strings.
        4. "growth_areas": List of 3 growth area strings.
        5. "learning_style": A short descriptive string.
        6. "work_style": A short descriptive string.
        7. "decision_style": A short descriptive string.
        """

        try:
            result = await self.ai.generate_structured_completion(prompt, db=self.db)
            
            cdna.strengths = result.get("strengths", [])
            cdna.growth_areas = result.get("growth_areas", [])
            cdna.learning_style = result.get("learning_style", "")
            cdna.work_style = result.get("work_style", "")
            cdna.decision_style = result.get("decision_style", "")
            cdna.goal_reality_check = result.get("career_goal_reality_check", "")
            cdna.motivation = result.get("personalized_summary", "")
            cdna.is_completed = True
            
            self.db.commit()
            return cdna
            
        except Exception as e:
            print(f"Error generating AI summary: {e}")
            # Fallback values if API is failing
            cdna.strengths = []
            cdna.growth_areas = []
            cdna.is_completed = True
            cdna.goal_reality_check = "Unable to reach AI for analysis at this moment."
            self.db.commit()
            return cdna
