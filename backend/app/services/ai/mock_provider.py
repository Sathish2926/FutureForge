from typing import Dict, Any
from .provider_interface import AIProvider

class MockAIProvider(AIProvider):
    async def generate_completion(self, prompt: str) -> str:
        return "This is a mock AI completion."
        
    async def generate_structured_completion(self, prompt: str) -> Dict[str, Any]:
        """
        Mock response structured according to the prompt expectations.
        In a real scenario, this would use a robust LLM json mode or parsing.
        """
        return {
            "why_recommended": "This career aligns with your analytical skills and strong interest in technology.",
            "why_not_others": "Other careers like pure management require more extroverted traits which don't match your preference for independent work.",
            "strengths": ["Analytical Thinking", "Problem Solving", "Focus"],
            "weaknesses": ["Public Speaking", "Large team coordination"],
            "missing_skills": ["Cloud Architecture Basics", "System Design"],
            "learning_suggestions": ["Take a foundational AWS certification", "Build a scalable project"]
        }
