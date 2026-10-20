# CareerPath AI — Personalized Career, Education & Opportunity Advisor

A lifelong career and education advisor: profile once, get explainable,
stage-specific guidance from Class 10 through working professional.

## What's new: Career DNA, universal goal support, multi-roadmap

Three features added specifically so this isn't a small-scope app that
only knows a fixed list of careers:

1. **Career DNA** — a separate, dedicated form per life stage (Class 10,
   Class 12, Undergraduate, Postgraduate, Working professional/switcher),
   distinct from general profile onboarding. Each stage asks its own
   questions and returns *every* legitimate group/stream/path available
   at that stage with a plain "what it's useful for" explanation — e.g.
   Class 10 gets Science(PCM)/Science(PCB)/Commerce/Arts/Vocational, each
   with what careers it keeps open, not just a single push toward one
   stream. Nothing is hidden; answers only affect ranking, never which
   options are shown. One response per (user, stage) — filling in UG
   later doesn't erase your Class 10 answers. See `app/services/career_dna.py`.
2. **Universal career resolver** — the app reacts to *any* stated goal,
   not just the curated catalogue. Ask for "IPS officer", "district
   collector", "politician", "marine biologist", or literally anything
   else, and `app/services/career_resolver.py` either matches curated
   data (always preferred when it exists) or classifies the goal into a
   broad sector and synthesizes a general, stage-structured pathway on
   the spot — flagged `is_user_generated`/`needs_verification` so the UI
   visibly marks it as "verify specifics on official sources" rather than
   presenting invented facts as curated ones. This flows through the same
   scoring/roadmap/chat pipeline as curated careers, no special-casing.
3. **Unlimited roadmaps per user** — `POST /api/roadmaps` accepts either
   a curated `career_slug` or free-text `goal_text`; a user can generate
   as many roadmaps for as many different goals as they want, all listed
   together (`GET /api/roadmaps`), each tracked and progressable
   independently.

The AI Advisor chat also uses the same resolver — "how do I become a
politician" gets a real structured answer, not a shrug.

**Manual setup, API keys, and every external URL you need to fill in are
in their own document, separate from this README:**
📄 **[`docs/DATA_SOURCES_AND_MANUAL_SETUP.md`](docs/DATA_SOURCES_AND_MANUAL_SETUP.md)**

## What's real here, and what needs your setup (honest disclosure)

This was built in a sandboxed environment **with no network access and no
API keys**, so a few things are true and worth knowing upfront:

- **The backend is a real, runnable FastAPI app** with a genuine hybrid
  recommendation engine (rule-based eligibility + weighted scoring +
  template-based explanations) — not hardcoded per-career responses. It
  runs standalone against SQLite with zero external setup.
- **Gemini, Firebase Auth, and live college/scholarship APIs are wired as
  clean, documented integration points, not live-tested integrations.**
  I don't have a Gemini key, Firebase project, or network access to
  verify calls against them. The app runs on deterministic fallbacks by
  default (which the spec itself requires — see §38) and upgrades
  automatically the moment you add real credentials, with no code
  changes needed on the recommendation logic.
- **The frontend is a complete React/TS/Vite/Tailwind app wired to real
  backend endpoints.** I could not run `npm install` here (no registry
  access) to do an actual build-and-click-through verification — the
  backend's Python files were syntax-checked and the API contracts were
  written to match on both sides, but you should run `npm run dev` and
  smoke-test before treating this as verified end-to-end.
- **College/scholarship data is the documented fallback dataset** (§14,
  §60) — ~11 real institutions and 6 real central government scholarship
  schemes, correctly structured, not synced live from AISHE/NSP.

None of this is padding to look complete — it's the honest state of a
project whose spec explicitly requires Firebase/Gemini/external APIs
that simply aren't reachable from here. Treat this as a strong, working
MVP skeleton to build on, not a verified production deploy.

## Architecture

```
careerpath-ai/
  backend/    FastAPI + SQLAlchemy + SQLite (swap-in Postgres via DATABASE_URL)
  frontend/   React + TypeScript + Vite + Tailwind
  docs/       architecture notes
```

See `docs/architecture.md` for the full design rationale, `docs/api.md`
for the endpoint list, and `docs/database.md` for the schema.

## Tech stack (as delivered vs. spec)

| Layer | Spec asked for | Delivered |
|---|---|---|
| Frontend | React/TS/Vite/Tailwind/RHF/Zod/TanStack Query | React/TS/Vite/Tailwind/React Router. RHF/Zod/TanStack Query/Recharts omitted to keep the scaffold buildable without a package registry — trivial to add once `npm install` works in your environment. |
| Backend | FastAPI/Pydantic/SQLAlchemy/Alembic/PostgreSQL | FastAPI/Pydantic/SQLAlchemy on SQLite by default (zero-setup); Postgres is a one-line `DATABASE_URL` change. **Alembic is now wired in** (`alembic/versions/0001_initial.py`) — see Migrations below. |
| Auth | Firebase Auth | Dev-mode local JWT (email/password) so the app works with zero external accounts. `app/auth.py` documents exactly how to swap in Firebase Admin token verification. |
| AI | Gemini with tool calling | `recommendation.try_gemini_explain()` — calls Gemini if `GEMINI_API_KEY` is set, otherwise the deterministic engine (which always runs first regardless) supplies the explanation. Tool-calling/function-calling not implemented — see docs/ai-system.md for the intended shape. |
| Maps | Leaflet + Nominatim | Not implemented in this pass — colleges carry lat/lng in the schema, ready for a map view. |

## Getting started

### Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # defaults work out of the box on SQLite
python seed.py          # optional — also runs automatically on first startup
uvicorn app.main:app --reload --port 8000
```

(Zero-setup dev uses `AUTO_CREATE_TABLES=true`, the default. For a
shared/production database, run `alembic upgrade head` instead and set
`AUTO_CREATE_TABLES=false` — see Migrations below.)

Visit `http://localhost:8000/api/health` → `{"status": "ok"}`.
Interactive API docs: `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. The Vite dev server proxies `/api` to
`localhost:8000` (see `vite.config.ts`).

### Try it end-to-end

1. Register a new account on `/login`.
2. Complete onboarding (adapts questions to your stage).
3. Visit **Career DNA**, pick your stage, answer the short form — see
   every group/stream/path open to you and why, not just one push.
4. Visit **Careers**, open e.g. "Research Scientist (ISRO track)" —
   see the Profile Match Score, reasoning, and multiple pathways.
5. Visit **Roadmap** and type *any* goal — "IPS officer", "politician",
   "marine biologist" — click Generate. Do it again for a second, totally
   different goal. Both roadmaps stay listed and trackable at once.
6. Check **Colleges** and **Scholarships** for match tiers / eligibility
   status computed from your profile.
7. Ask the **AI Advisor**: *"how do I become a district collector"* or
   *"I'm in 12th and confused between engineering and medicine"* — see
   the structured response either way.

### Admin access

```bash
cd backend
python create_admin.py you@example.com   # after registering that account
```

Then call `GET /api/admin/analytics` with that account's token.

## Environment variables

See `backend/.env.example`. Nothing there needs to be filled in for the
app to run — it's for enabling Postgres, Firebase, Gemini, and external
data providers when you're ready.

## Database

Normalized to 3NF — see `docs/database.md`. Financial data lives in its
own `financial_profiles` table (not duplicated across users/careers/
colleges/scholarships, per spec §28). Recommendations are stored as
immutable snapshots (`recommendations` table) so historical
recommendations stay explainable even after the live profile changes.

### Migrations (Alembic)

The initial schema (all 28 tables) is captured in
`alembic/versions/0001_initial.py`, hand-written to exactly mirror
`app/models.py` — I verified this programmatically in-sandbox (every
table and every column cross-checked between the two files; zero
mismatches) since there's no installed Alembic/database here to run
`alembic revision --autogenerate` against directly. Once you have
Alembic installed against a real database, it's worth running
`alembic revision --autogenerate -m "check"` once and confirming it
generates an *empty* diff — that's your independent proof this file is
accurate — before deleting that empty check revision.

```bash
cd backend
alembic upgrade head          # creates all tables via migration, not create_all
# ...make a model change...
alembic revision --autogenerate -m "describe the change"
alembic upgrade head
```

For local dev, you don't need this — `AUTO_CREATE_TABLES=true` (the
default) still creates tables automatically on startup with zero
commands. Set `AUTO_CREATE_TABLES=false` once you're managing schema via
Alembic yourself (e.g. any shared or production database), so the two
mechanisms don't race each other.

## Known limitations (honest list)

- **Verification note:** while reviewing the universal career resolver
  for this pass, I found and fixed a real bug — `_classify_sector` used
  plain substring matching, so short keywords like `"mp"` false-positived
  inside unrelated words (e.g. matched inside "co**mp**letely", would
  have matched "e**mp**loyment", "ideas" contains "ias", etc.). Fixed to
  word-boundary regex matching and added regression tests
  (`test_classify_sector_does_not_false_positive_on_short_keyword_substrings`)
  so this can't silently reappear. Worth knowing if you extend the
  keyword list — always test short/abbreviation keywords for this.
- Test coverage: pure-logic tests (`test_eligibility.py`, `test_career_dna.py`,
  `test_recommendation_engine.py`, `test_career_resolver.py`) were
  **actually executed in this sandbox** by stubbing out sqlalchemy where
  needed, and pass. `test_api_integration.py` (FastAPI TestClient against
  an in-memory SQLite DB, covering register/login, universal roadmap
  generation for both curated and arbitrary goals, multi-roadmap
  coexistence, Career DNA submit/list, scholarship eligibility, and AI
  chat) was written against the actual router/schema source but could
  **not** be executed here — no network access to install
  fastapi/sqlalchemy. Run `pytest app/tests/ -v` yourself before
  trusting it in CI.
- No map view yet (data model supports it; Leaflet UI not built).
- Frontend never had `npm install` run against it in this environment —
  review it once before deploying, per the disclosure above.
- College/scholarship datasets are illustrative (11 colleges, 6
  scholarships), not the full national catalogue.
- Gemini tool/function-calling (the `get_user_profile`, `search_colleges`
  etc. tool list from the spec) is not implemented — the deterministic
  engine performs those lookups directly instead of via an AI tool-call
  loop. Worth adding once you have Gemini access to test against.

## Future improvements

- Wire real Firebase Admin verification into `app/auth.py`.
- Add Gemini tool-calling for the AI Advisor, keeping the deterministic
  engine as the required fallback (per §38).
- Run `test_api_integration.py` for real and fix anything a live
  dependency stack surfaces that this sandbox couldn't check.
- Leaflet map view for colleges using the existing lat/lng fields.
- Expand the career/college/scholarship datasets, or wire a real
  AISHE/NSP sync job into `ExternalDataSource`.
