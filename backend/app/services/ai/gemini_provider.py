import os
import time
import google.generativeai as genai
from sqlalchemy.orm import Session
from app.models.ai_cache import ProviderLog
from app.services.ai.provider_interface import AIProvider

class GeminiProvider(AIProvider):
    def __init__(self, model_name: str = "gemini-2.5-pro", session_id: int = None):
        super().__init__()
        # In production, these should be verified on app startup
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            # Fallback or warn, here we just configure if it exists.
            # We won't crash here so that mock still works if testing,
            # but ideally you'd throw an error if missing.
            pass
        else:
            genai.configure(api_key=api_key)
            
        self.model_name = os.environ.get("GEMINI_MODEL", model_name)
        self.session_id = session_id

    def generate_response(self, prompt: str, db: Session = None, **kwargs) -> str:
        start_time = time.time()
        error_msg = None
        response_text = ""
        prompt_tokens = 0
        completion_tokens = 0
        
        try:
            model = genai.GenerativeModel(self.model_name)
            # You can count tokens before sending
            # prompt_tokens = model.count_tokens(prompt).total_tokens
            
            response = model.generate_content(prompt)
            response_text = response.text
            
            # Extract actual token counts if available
            try:
                if hasattr(response, 'usage_metadata'):
                    prompt_tokens = response.usage_metadata.prompt_token_count
                    completion_tokens = response.usage_metadata.candidates_token_count
            except:
                pass
                
        except Exception as e:
            error_msg = str(e)
            response_text = "I apologize, but I am currently unable to process your request due to a technical error."
            
        finally:
            latency = int((time.time() - start_time) * 1000)
            if db:
                log_entry = ProviderLog(
                    provider_name="gemini",
                    session_id=self.session_id,
                    tokens_prompt=prompt_tokens,
                    tokens_completion=completion_tokens,
                    latency_ms=latency,
                    error_message=error_msg
                )
                db.add(log_entry)
                db.commit()
                
        return response_text

    def stream_response(self, prompt: str, db: Session = None, **kwargs):
        # Implementation for StreamingResponse in FastAPI
        start_time = time.time()
        error_msg = None
        prompt_tokens = 0
        completion_tokens = 0
        
        try:
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content(prompt, stream=True)
            for chunk in response:
                yield chunk.text
                completion_tokens += 10 # rough estimate since chunk sizes vary
                
        except Exception as e:
            error_msg = str(e)
            yield "I apologize, but I am currently unable to process your request."
            
        finally:
            latency = int((time.time() - start_time) * 1000)
            if db:
                log_entry = ProviderLog(
                    provider_name="gemini_stream",
                    session_id=self.session_id,
                    tokens_prompt=prompt_tokens,
                    tokens_completion=completion_tokens,
                    latency_ms=latency,
                    error_message=error_msg
                )
                db.add(log_entry)
                db.commit()
