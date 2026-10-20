import logging
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .database import engine, Base, SessionLocal
from . import models  # noqa: F401 — ensures models are registered on Base before create_all
from .seed_data import seed, seed_admin, seed_batch1
from .routers import auth, profile, careers, colleges, scholarships, roadmap, chat, dashboard, saved, career_dna, recommendations, career_catalog, class10_copilot, professional_planner

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("careerpath")

app = FastAPI(title="CareerPath AI", version="1.0.0")

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
if allowed_origins_env:
    for o in allowed_origins_env.split(","):
        if o.strip():
            origins.append(o.strip())

# Allow all Vercel deployments and localhost by default so frontend on Vercel connects without CORS hurdles
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def api_prefix_compatibility_middleware(request: Request, call_next):
    # Support client requests made without /api prefix
    path = request.url.path
    if not path.startswith("/api") and not path.startswith("/docs") and not path.startswith("/openapi.json") and not path.startswith("/redoc"):
        segments = [s for s in path.split("/") if s]
        if segments and segments[0] in [
            "auth", "profile", "careers", "colleges", "scholarships",
            "roadmaps", "ai", "dashboard", "saved", "career-dna",
            "recommendations", "career-catalog", "class10-copilot"
        ]:
            request.scope["path"] = f"/api{path}"
    return await call_next(request)



@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Never leak raw stack traces to the client (spec §37)
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Something went wrong. Please try again."})


@app.on_event("startup")
def on_startup():
    # Dev convenience: auto-create tables from the live models so the app
    # runs with zero setup on a fresh SQLite file. In production, run
    # `alembic upgrade head` instead (see alembic/versions/0001_initial.py)
    # and set AUTO_CREATE_TABLES=false so this doesn't run redundantly
    # alongside real migrations.
    if os.getenv("AUTO_CREATE_TABLES", "true").lower() != "false":
        Base.metadata.create_all(bind=engine)
    from .services.scholarship_migration import migrate_scholarship_schema
    from .services.career_knowledge_migration import migrate_career_knowledge_schema
    from .seeds.verified_scholarships import seed_verified_scholarships
    from .services.scholarship_deduplication import deduplicate_and_enrich_scholarships
    migrate_scholarship_schema(engine)
    migrate_career_knowledge_schema(engine)
    db = SessionLocal()
    try:
        seed(db)
        seed_admin(db)
        seed_batch1(db)
        seed_verified_scholarships(db)
        deduplicate_and_enrich_scholarships(db)
    finally:
        db.close()



app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(careers.router)
app.include_router(colleges.router)
app.include_router(scholarships.router)
app.include_router(roadmap.router)
app.include_router(chat.router)
app.include_router(dashboard.router)
app.include_router(saved.router)

app.include_router(career_dna.router)
app.include_router(recommendations.router)
app.include_router(career_catalog.router)
app.include_router(class10_copilot.router)
app.include_router(professional_planner.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
