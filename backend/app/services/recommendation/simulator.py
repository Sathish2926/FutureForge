import json
from sqlalchemy.orm import Session
from app.schemas.recommendation import SimulationRequest, SimulationResponse, ScenarioResult, ScenarioMetric
from app.models.profile import Profile, CareerDNA
from app.services.ai.gemini_provider import GeminiProvider

class CareerSimulator:
    def __init__(self, db: Session):
        self.db = db
        self.ai_provider = GeminiProvider()

    def run_simulation(self, user_id: int, request: SimulationRequest) -> SimulationResponse:
        # Fetch base profile
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        dna = self.db.query(CareerDNA).filter(CareerDNA.user_id == user_id).first()
        
        base_context = {
            "profile": {
                "education": getattr(profile, "education_level", "Unknown"),
                "location": getattr(profile, "location", "Unknown"),
                "budget": getattr(profile, "budget", "Unknown")
            },
            "dna": {
                "top_industries": getattr(dna, "top_industries", []),
                "personality": getattr(dna, "personality_type", "Unknown")
            }
        }

        # Prompt AI to generate the comparison
        prompt = f"""You are the FutureForge What-If Career Simulator.
You are given a base user profile and two scenarios to compare. 
You MUST respond ONLY with a valid JSON string that matches the requested output structure perfectly.

# User Base Context
{json.dumps(base_context, indent=2)}

# Scenario A: {request.scenario_a.label}
Changes applied: {json.dumps(request.scenario_a.changes)}

# Scenario B: {request.scenario_b.label}
Changes applied: {json.dumps(request.scenario_b.changes)}

# Task
Analyze what happens to the user's career trajectory, education options, and financial outlook under Scenario A vs Scenario B.

# Output Format (Strict JSON)
{{
    "scenario_a_result": {{
        "label": "{request.scenario_a.label}",
        "metrics": [
            {{"category": "Expected Salary", "value": "..."}},
            {{"category": "Growth Opportunities", "value": "..."}},
            {{"category": "Time & Cost", "value": "..."}}
        ],
        "recommended_colleges": ["College 1", "College 2"],
        "scholarship_options": ["Option 1"],
        "career_paths": ["Career 1"]
    }},
    "scenario_b_result": {{
        "label": "{request.scenario_b.label}",
        "metrics": [
            {{"category": "Expected Salary", "value": "..."}},
            {{"category": "Growth Opportunities", "value": "..."}},
            {{"category": "Time & Cost", "value": "..."}}
        ],
        "recommended_colleges": ["College 3", "College 4"],
        "scholarship_options": ["Option 2"],
        "career_paths": ["Career 2"]
    }},
    "ai_conclusion": "A brief 2-sentence conclusion on which scenario aligns better with their Career DNA."
}}
"""
        
        try:
            # We enforce JSON output in the prompt, let's parse it
            raw_response = self.ai_provider.generate_response(prompt=prompt, db=self.db)
            
            # Clean up markdown code blocks if any
            clean_json = raw_response.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(clean_json)
            
            return SimulationResponse(**parsed)
            
        except Exception as e:
            # Fallback if parsing fails or API errors
            return SimulationResponse(
                scenario_a_result=ScenarioResult(
                    label=request.scenario_a.label,
                    metrics=[ScenarioMetric(category="Error", value="Simulation failed")]
                ),
                scenario_b_result=ScenarioResult(
                    label=request.scenario_b.label,
                    metrics=[ScenarioMetric(category="Error", value="Simulation failed")]
                ),
                ai_conclusion=f"Simulation error: {str(e)}"
            )
