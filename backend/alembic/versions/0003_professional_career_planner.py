"""Add Working Professional Career Growth & Transition Planner tables.

Revision ID: 0003_professional_career_planner
Revises: 0002_version_career_dna
Create Date: 2026-10-19 20:30:00.000000
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = "0003_professional_career_planner"
down_revision: Union[str, None] = "0002_version_career_dna"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    existing_tables = set(inspector.get_table_names())

    if "professional_profiles" not in existing_tables:
        op.create_table(
            "professional_profiles",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), unique=True, index=True, nullable=False),
            sa.Column("current_job_title", sa.String(160), nullable=False),
            sa.Column("current_industry", sa.String(120), nullable=False),
            sa.Column("years_experience", sa.Float(), nullable=False, server_default="0.0"),
            sa.Column("employment_type", sa.String(64), nullable=False, server_default="Full-time"),
            sa.Column("highest_qualification", sa.String(120), nullable=False),
            sa.Column("degree_specialization", sa.String(160), nullable=True),
            sa.Column("current_skills", sa.JSON(), nullable=True),
            sa.Column("tools_technologies", sa.JSON(), nullable=True),
            sa.Column("responsibilities", sa.Text(), nullable=True),
            sa.Column("certifications", sa.JSON(), nullable=True),
            sa.Column("career_goals", sa.JSON(), nullable=True),
            sa.Column("target_pathway", sa.String(32), server_default="known_target"),
            sa.Column("target_role", sa.String(160), nullable=True),
            sa.Column("target_industry", sa.String(120), nullable=True),
            sa.Column("preferred_location", sa.String(120), nullable=True),
            sa.Column("preferred_work_arrangement", sa.String(64), server_default="No Preference"),
            sa.Column("target_salary_range", sa.String(64), nullable=True),
            sa.Column("weekly_learning_hours", sa.Integer(), server_default="5"),
            sa.Column("preferred_learning_format", sa.String(64), server_default="Mixed"),
            sa.Column("learning_budget", sa.String(64), server_default="Free Only"),
            sa.Column("preferred_language", sa.String(64), server_default="English"),
            sa.Column("target_timeline", sa.String(64), server_default="Medium-term"),
            sa.Column("current_salary", sa.String(64), nullable=True),
            sa.Column("profile_summary", sa.Text(), nullable=True),
            sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
            sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
        )

    if "professional_roles" not in existing_tables:
        op.create_table(
            "professional_roles",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("slug", sa.String(120), unique=True, index=True, nullable=False),
            sa.Column("title", sa.String(160), nullable=False),
            sa.Column("industry", sa.String(120), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("experience_level", sa.String(64), server_default="Mid"),
            sa.Column("transition_category", sa.String(64), server_default="Adjacent"),
            sa.Column("transferable_from", sa.JSON(), nullable=True),
            sa.Column("typical_progression", sa.String(255), nullable=True),
            sa.Column("why_it_fits_template", sa.Text(), nullable=True),
            sa.Column("transferability_notes", sa.Text(), nullable=True),
            sa.Column("suggested_learning_areas", sa.JSON(), nullable=True),
            sa.Column("possible_next_steps", sa.JSON(), nullable=True),
            sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        )

    if "professional_role_skills" not in existing_tables:
        op.create_table(
            "professional_role_skills",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("role_id", sa.Integer(), sa.ForeignKey("professional_roles.id", ondelete="CASCADE"), index=True, nullable=False),
            sa.Column("skill_name", sa.String(120), nullable=False),
            sa.Column("category", sa.String(64), server_default="Technical"),
            sa.Column("importance", sa.String(32), server_default="core"),
            sa.Column("why_it_matters", sa.Text(), nullable=False),
            sa.Column("recommended_priority", sa.String(16), server_default="High"),
            sa.Column("suggested_learning_hours", sa.Integer(), server_default="10"),
        )

    if "professional_learning_resources" not in existing_tables:
        op.create_table(
            "professional_learning_resources",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("title", sa.String(255), nullable=False),
            sa.Column("provider", sa.String(120), nullable=False),
            sa.Column("related_skill", sa.String(120), index=True, nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("cost_type", sa.String(32), server_default="Free"),
            sa.Column("resource_type", sa.String(64), server_default="Course"),
            sa.Column("url", sa.String(500), nullable=False),
            sa.Column("is_verified", sa.Boolean(), server_default="1"),
            sa.Column("last_verified", sa.String(32), nullable=True),
        )

    if "professional_career_plans" not in existing_tables:
        op.create_table(
            "professional_career_plans",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), index=True, nullable=False),
            sa.Column("target_role", sa.String(160), nullable=False),
            sa.Column("target_industry", sa.String(120), nullable=True),
            sa.Column("status", sa.String(32), server_default="active"),
            sa.Column("match_score", sa.Float(), server_default="0.0"),
            sa.Column("skill_gaps_summary", sa.JSON(), nullable=True),
            sa.Column("ai_analysis", sa.Text(), nullable=True),
            sa.Column("timeline_estimate", sa.String(64), nullable=True),
            sa.Column("checklist_items", sa.JSON(), nullable=True),
            sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
            sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
        )

    if "professional_plan_steps" not in existing_tables:
        op.create_table(
            "professional_plan_steps",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("plan_id", sa.Integer(), sa.ForeignKey("professional_career_plans.id", ondelete="CASCADE"), index=True, nullable=False),
            sa.Column("stage_name", sa.String(120), nullable=False),
            sa.Column("order_index", sa.Integer(), nullable=False),
            sa.Column("title", sa.String(255), nullable=False),
            sa.Column("explanation", sa.Text(), nullable=False),
            sa.Column("related_skill", sa.String(120), nullable=True),
            sa.Column("priority", sa.String(16), server_default="Medium"),
            sa.Column("estimated_duration", sa.String(64), nullable=True),
            sa.Column("estimated_hours", sa.Integer(), server_default="15"),
            sa.Column("resource_title", sa.String(255), nullable=True),
            sa.Column("resource_url", sa.String(500), nullable=True),
            sa.Column("resource_provider", sa.String(120), nullable=True),
            sa.Column("resource_cost", sa.String(32), nullable=True),
            sa.Column("practical_task", sa.Text(), nullable=True),
            sa.Column("completion_status", sa.String(32), server_default="not_started"),
            sa.Column("user_notes", sa.Text(), nullable=True),
            sa.Column("completed_at", sa.DateTime(), nullable=True),
        )


def downgrade() -> None:
    op.drop_table("professional_plan_steps")
    op.drop_table("professional_career_plans")
    op.drop_table("professional_learning_resources")
    op.drop_table("professional_role_skills")
    op.drop_table("professional_roles")
    op.drop_table("professional_profiles")
