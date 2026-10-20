"""Preserve versioned Career DNA assessment snapshots."""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0002_version_career_dna"
down_revision: Union[str, None] = "0001_initial"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    named_constraints = {item.get("name") for item in inspector.get_unique_constraints("career_dna_responses")}
    if "uq_career_dna_responses_user_stage" in named_constraints:
        with op.batch_alter_table("career_dna_responses") as batch:
            batch.add_column(sa.Column("version", sa.Integer(), nullable=True, server_default="1"))
            batch.add_column(sa.Column("ruleset_version", sa.String(length=64), nullable=True, server_default="career_dna_v2"))
            batch.drop_constraint("uq_career_dna_responses_user_stage", type_="unique")
        return

    # Existing SQLite databases created directly from SQLAlchemy expose the
    # unnamed model constraint as sqlite_autoindex, which cannot be dropped.
    # A copy operation lets Alembic preserve rows while omitting that index.
    source = sa.Table(
        "career_dna_responses", sa.MetaData(),
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("stage", sa.String(length=32), nullable=True),
        sa.Column("answers_json", sa.JSON(), nullable=True),
        sa.Column("guidance_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
    )
    with op.batch_alter_table("career_dna_responses", copy_from=source, recreate="always") as batch:
        batch.add_column(sa.Column("version", sa.Integer(), nullable=True, server_default="1"))
        batch.add_column(sa.Column("ruleset_version", sa.String(length=64), nullable=True, server_default="career_dna_v2"))


def downgrade() -> None:
    with op.batch_alter_table("career_dna_responses") as batch:
        batch.create_unique_constraint("uq_career_dna_responses_user_stage", ["user_id", "stage"])
        batch.drop_column("ruleset_version")
        batch.drop_column("version")