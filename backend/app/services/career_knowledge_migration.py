"""
Schema migration for Verified Career Knowledge Base and Guidance Request Records.
Ensures existing databases gain the new columns without losing any data.
Compatible with SQLite and PostgreSQL.
"""
import logging
from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine

logger = logging.getLogger("careerpath.migration")


def migrate_career_knowledge_schema(engine: Engine):
    """
    Inspects `professional_roles` and adds any missing columns.
    Creates `guidance_request_records` table if missing.
    """
    with engine.connect() as conn:
        inspector = inspect(conn)
        tables = inspector.get_table_names()

        # 1. Update professional_roles table if it exists
        if "professional_roles" in tables:
            existing_cols = {col["name"] for col in inspector.get_columns("professional_roles")}
            new_cols = [
                ("typical_responsibilities", "TEXT"),
                ("relevant_degrees", "VARCHAR(255)"),
                ("essential_qualifications", "VARCHAR(255)"),
                ("entry_level_pathways", "TEXT"),
                ("related_careers", "TEXT"),
                ("certifications_prerequisites", "TEXT"),
                ("practical_projects", "TEXT"),
                ("career_transition_guidance", "TEXT"),
                ("location_conditions", "VARCHAR(255)"),
                ("source_references", "TEXT"),
                ("last_verified", "VARCHAR(32)"),
                ("completeness_status", "VARCHAR(32) DEFAULT 'complete'"),
                ("review_status", "VARCHAR(32) DEFAULT 'published'"),
            ]
            for col_name, col_type in new_cols:
                if col_name not in existing_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE professional_roles ADD COLUMN {col_name} {col_type}"))
                        conn.commit()
                        logger.info("Added column %s to professional_roles", col_name)
                    except Exception as e:
                        logger.warning("Could not add column %s to professional_roles: %s", col_name, e)

        # 2. Create guidance_request_records table if not present
        if "guidance_request_records" not in tables:
            try:
                conn.execute(text("""
                    CREATE TABLE guidance_request_records (
                        id INTEGER PRIMARY KEY,
                        request_id VARCHAR(64) UNIQUE NOT NULL,
                        user_id INTEGER REFERENCES users(id),
                        career_topic VARCHAR(200) NOT NULL,
                        category VARCHAR(64) DEFAULT 'unsupported_career',
                        user_context TEXT,
                        reason TEXT NOT NULL,
                        missing_categories TEXT,
                        status VARCHAR(32) DEFAULT 'pending_review',
                        created_at DATETIME,
                        reviewed_at DATETIME
                    )
                """))
                conn.commit()
                logger.info("Created table guidance_request_records")
            except Exception as e:
                logger.warning("Could not create guidance_request_records table: %s", e)
