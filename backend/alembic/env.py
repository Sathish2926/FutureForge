"""
Alembic environment script.

Deliberately does NOT hardcode a database URL in alembic.ini — it reads
the same DATABASE_URL the app itself uses (app/database.py, which reads
from .env / the environment), so migrations always target whichever
database the app is actually configured for (SQLite in dev by default,
Postgres in production via DATABASE_URL).

`target_metadata` is wired to the app's real SQLAlchemy models, so a
future `alembic revision --autogenerate` can diff against the live
model definitions instead of only against migration history.
"""
import sys
import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import Base, DATABASE_URL  # noqa: E402
from app import models  # noqa: E402,F401 — registers all model classes on Base.metadata

config = context.config
config.set_main_option("sqlalchemy.url", DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Emit SQL to stdout without a live DB connection (`alembic upgrade head --sql`)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations against a live DB connection — the normal case."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
