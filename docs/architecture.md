# Architecture

## Overview
Single-page React frontend talking to a FastAPI JSON backend over `/api`.
Auth is a bearer JWT (dev mode) issued by the backend; swap for Firebase
ID token verification in `app/auth.py` without touching any other module.

## Recommendation engine (hybrid, per spec §10/§38)
`app/recommendation.py` computes a weighted Profile Match Score from six
factors (interest, academic, skill, goal, preference, feasibility),
entirely deterministically. `generate_reasoning()` builds a structured,
user-facing explanation (evidence / requirement / trade-offs /
confidence / assumptions) from that same evidence.

`try_gemini_explain()` is the *only* place a live Gemini call happens.
If `GEMINI_API_KEY` is unset (or the call fails), it returns `None` and
the deterministic explanation is used as-is — the engine never blocks
on AI availability, satisfying "AI failure fallback" (§38).

## Why SQLite by default
Postgres requires a running server this sandbox can't provision. SQLAlchemy's
dialect is fully abstracted behind `DATABASE_URL`, so switching to Postgres
in a real deployment is a one-line env var change — no application code
depends on SQLite-specific behavior.

## Data provider abstraction (spec §14, §59)
`College`/`Scholarship` rows carry a `source_provider`/`source_name` and
`last_verified` field, and `ExternalDataSource` records provenance and
sync status per provider. Today only `seed_fallback_dataset` exists as a
"provider." Adding a live provider (AISHE, National Scholarship Portal,
a college API) means writing a small sync function that upserts into the
same tables and updates `ExternalDataSource.status` to `live` — no schema
change needed.

## Recommendation snapshots
`Recommendation` rows store `reasoning_json` and `profile_snapshot_json`
at generation time, so historical recommendations remain explainable
even after the user's live profile changes later (spec §29).
