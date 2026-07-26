import json
from abc import ABC, abstractmethod
from typing import Dict, Any

class AIProvider(ABC):
    @abstractmethod
    async def generate_completion(self, prompt: str) -> str:
        """
        Generate a text completion from the AI provider.
        """
        pass
    
    @abstractmethod
    async def generate_structured_completion(self, prompt: str) -> Dict[str, Any]:
        """
        Generate a strictly structured completion (e.g., JSON).
        """
        pass
