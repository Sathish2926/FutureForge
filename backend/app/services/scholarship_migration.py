"""
Database schema migration helper for scholarship module tables.
Runs idempotently on startup to ensure SQLite tables have all required columns.
"""
import logging
from sqlalchemy import text
from app.database import engine, Base

logger = logging.getLogger("careerpath.scholarship_migration")


def migrate_scholarship_schema(db_engine=engine):
    """Safely adds missing columns to SQLite tables if they do not already exist."""
    with db_engine.connect() as conn:
        # 1. Inspect existing columns in scholarships
        try:
            res = conn.execute(text("PRAGMA table_info(scholarships)"))
            existing_cols = {row[1].lower() for row in res.fetchall()}
        except Exception as e:
            logger.warning("Could not check table_info for scholarships: %s", e)
            existing_cols = set()

        if existing_cols:
            scholarship_cols = [
                ("code", "VARCHAR(64)"),
                ("provider_category", "VARCHAR(64) DEFAULT 'central_govt'"),
                ("description", "TEXT"),
                ("geographic_coverage", "VARCHAR(64) DEFAULT 'all_india'"),
                ("eligible_states", "VARCHAR(500) DEFAULT 'ALL'"),
                ("domicile_required", "BOOLEAN DEFAULT 0"),
                ("domicile_state", "VARCHAR(100)"),
                ("eligible_courses", "TEXT DEFAULT 'all'"),
                ("institution_types", "VARCHAR(200) DEFAULT 'all'"),
                ("min_marks_percent", "FLOAT"),
                ("max_family_income", "FLOAT"),
                ("eligible_categories", "VARCHAR(200) DEFAULT 'all'"),
                ("gender_restriction", "VARCHAR(32) DEFAULT 'all'"),
                ("age_limit", "INTEGER"),
                ("special_eligibility_criteria", "TEXT"),
                ("benefit_amount_inr", "FLOAT"),
                ("benefit_type", "VARCHAR(64) DEFAULT 'annual_scholarship'"),
                ("benefit_duration", "VARCHAR(120)"),
                ("renewal_requirements", "TEXT"),
                ("required_documents", "TEXT"),
                ("deadline_verification_status", "VARCHAR(32) DEFAULT 'unconfirmed'"),
                ("application_mode", "VARCHAR(64) DEFAULT 'online_portal'"),
                ("official_info_url", "VARCHAR(500)"),
                ("official_application_url", "VARCHAR(500)"),
                ("application_portal_name", "VARCHAR(150)"),
                ("source_type", "VARCHAR(64) DEFAULT 'official_portal'"),
                ("source_publication_date", "VARCHAR(50)"),
                ("verification_notes", "TEXT"),
                ("application_steps", "TEXT"),
            ]
            for col_name, col_def in scholarship_cols:
                if col_name.lower() not in existing_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE scholarships ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                        logger.info("Added column scholarships.%s", col_name)
                    except Exception as ex:
                        logger.warning("Error adding column %s: %s", col_name, ex)

        # 2. Inspect scholarship_eligibility_rules
        try:
            res_rules = conn.execute(text("PRAGMA table_info(scholarship_eligibility_rules)"))
            rules_cols = {row[1].lower() for row in res_rules.fetchall()}
        except Exception:
            rules_cols = set()

        if rules_cols:
            rule_cols_to_add = [
                ("is_mandatory", "BOOLEAN DEFAULT 1"),
                ("description", "VARCHAR(500)"),
            ]
            for col_name, col_def in rule_cols_to_add:
                if col_name.lower() not in rules_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE scholarship_eligibility_rules ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    except Exception as ex:
                        logger.warning("Error adding column to rules: %s", ex)

        # 3. Inspect saved_scholarships
        try:
            res_saved = conn.execute(text("PRAGMA table_info(saved_scholarships)"))
            saved_cols = {row[1].lower() for row in res_saved.fetchall()}
        except Exception:
            saved_cols = set()

        if saved_cols:
            saved_cols_to_add = [
                ("status", "VARCHAR(64) DEFAULT 'saved'"),
                ("application_reference_no", "VARCHAR(120)"),
                ("notes", "TEXT"),
                ("deadline_reminder", "BOOLEAN DEFAULT 1"),
                ("eligibility_snapshot", "TEXT"),
                ("updated_at", "DATETIME"),
            ]
            for col_name, col_def in saved_cols_to_add:
                if col_name.lower() not in saved_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE saved_scholarships ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    except Exception as ex:
                        logger.warning("Error adding column to saved_scholarships: %s", ex)

        # 4. Inspect user_scholarship_profiles
        try:
            res_usp = conn.execute(text("PRAGMA table_info(user_scholarship_profiles)"))
            usp_cols = {row[1].lower() for row in res_usp.fetchall()}
        except Exception:
            usp_cols = set()

        if usp_cols:
            usp_cols_to_add = [
                ("grading_system", "VARCHAR(32) DEFAULT 'percentage'"),
                ("academic_year_needed", "VARCHAR(32) DEFAULT '2026-27'"),
                ("admission_status", "VARCHAR(32) DEFAULT 'confirmed'"),
                ("permanent_state", "VARCHAR(64) DEFAULT 'Tamil Nadu'"),
                ("current_study_state", "VARCHAR(64) DEFAULT 'Tamil Nadu'"),
                ("academic_achievements", "TEXT"),
                ("has_completed_onboarding", "BOOLEAN DEFAULT 0"),
            ]
            for col_name, col_def in usp_cols_to_add:
                if col_name.lower() not in usp_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE user_scholarship_profiles ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    except Exception as ex:
                        logger.warning("Error adding column to user_scholarship_profiles: %s", ex)

    # Ensure any new tables (user_scholarship_profiles, scholarship_sources, etc.) are created
    Base.metadata.create_all(bind=db_engine)
