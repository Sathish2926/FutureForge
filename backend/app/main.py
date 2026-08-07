from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_v1_router
from app.core.config import settings
from app.core.logging import configure_logging

from sqlalchemy import text
from app.database.session import engine
from app.models import Base

configure_logging()

def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database schema verified/created successfully.")
    except Exception as e:
        print(f"Error creating database schema: {e}")

init_db()

app = FastAPI(title=settings.project_name, debug=settings.debug)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_v1_router, prefix=settings.api_v1_prefix)

@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": settings.project_name}

@app.get("/test-db", tags=["system"])
def test_db():
    try:
        from sqlalchemy import text
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1")).scalar()
            return {"db_status": "connected", "result": result}
    except Exception as e:
        return {"db_status": "error", "error": str(e)}
