from fastapi import APIRouter

from app.api.v1.admin import router as admin_router
from app.api.v1.ai import router as ai_router
from app.api.v1.assessment import router as assessment_router
from app.api.v1.auth import router as auth_router
from app.api.v1.career import router as career_router
from app.api.v1.chatbot import router as chatbot_router
from app.api.v1.colleges import router as colleges_router
from app.api.v1.profile import router as profile_router
from app.api.v1.roadmap import router as roadmap_router
from app.api.v1.scholarships import router as scholarships_router
from app.api.v1.users import router as users_router
from app.api.v1.career_dna import router as career_dna_router
from app.api.v1.recommendations import router as recommendations_router
from app.api.v1.career_intelligence import router as career_intelligence_router
from app.api.v1.education import router as education_router
from app.api.v1.notifications import router as notifications_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(profile_router)
api_v1_router.include_router(assessment_router)
api_v1_router.include_router(career_router)
api_v1_router.include_router(career_dna_router)
api_v1_router.include_router(colleges_router)
api_v1_router.include_router(scholarships_router)
api_v1_router.include_router(roadmap_router)
api_v1_router.include_router(chatbot_router)
api_v1_router.include_router(admin_router)
api_v1_router.include_router(ai_router)
api_v1_router.include_router(recommendations_router)
api_v1_router.include_router(career_intelligence_router)
api_v1_router.include_router(education_router)
api_v1_router.include_router(notifications_router)
