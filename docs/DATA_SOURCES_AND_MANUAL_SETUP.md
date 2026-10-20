# Manual Data You Need to Provide — API Keys, URLs & Credentials

This is a **separate, single reference document** for everything you personally
need to obtain and paste in before this app is a live, production system.
Nothing here is invented or guessed — every value below is either a real
public URL you can visit today, or a placeholder you must fill after
creating an account with that provider. Where the app runs fine without
a value (using a deterministic fallback), that's stated explicitly.

All of these get pasted into **`backend/.env`** (copy `backend/.env.example` to
`backend/.env` first — never commit the real `.env` file).

---

## 1. Database

| Variable | What it is | Required? | Where to get it |
|---|---|---|---|
| `DATABASE_URL` | Connection string for your database | No — defaults to local SQLite (`sqlite:///./careerpath.db`), zero setup | For production Postgres: create a database (locally via `createdb careerpath`, or a managed service — see below) and use `postgresql+psycopg2://USER:PASSWORD@HOST:5432/DBNAME` |

**Managed Postgres options** (any works, no code changes needed):
- Neon — https://neon.tech (free tier available)
- Supabase — https://supabase.com (free tier available)
- Railway — https://railway.app
- Your own server / RDS / Cloud SQL

---

## 2. Firebase Authentication

The app ships with a working dev-mode JWT auth system (email/password,
no external account needed) so you can run it today with **zero Firebase
setup**. Fill this in only when you're ready to switch to real Firebase
Auth (email/password + Google Sign-In) as the spec requires.

| Variable | What it is | Where to get it |
|---|---|---|
| `FIREBASE_PROJECT_ID` | Your Firebase project ID | https://console.firebase.google.com → Create project → Project settings (gear icon) → General tab → "Project ID" |
| `FIREBASE_CLIENT_EMAIL` | Service account email | Project settings → Service accounts tab → "Generate new private key" → downloads a JSON file → copy `client_email` field |
| `FIREBASE_PRIVATE_KEY` | Service account private key | Same JSON file → copy `private_key` field (keep the `\n` characters as-is, or the app's `.env` loader will need them escaped) |

**Steps to set up Firebase Auth on the frontend (once you have a project):**
1. Firebase Console → your project → Build → Authentication → Get started
2. Enable "Email/Password" sign-in method
3. Enable "Google" sign-in method (toggle it on, provide a support email)
4. Project settings → General → "Your apps" → Add a Web app → copy the
   `firebaseConfig` object (apiKey, authDomain, projectId, etc.) into a new
   `frontend/src/firebase.ts` file (this file doesn't exist yet — it's a
   documented next step, not built in this pass, since there's no Firebase
   project connected here to build and test it against)
5. Wire `frontend/src/api/client.ts`'s auth calls to Firebase's SDK
   (`signInWithEmailAndPassword`, `signInWithPopup` for Google) instead of
   the current dev-JWT calls
6. Backend: replace the dev-JWT verification in `backend/app/auth.py` with
   Firebase Admin SDK's `firebase_admin.auth.verify_id_token()` using the
   three variables above

**Note:** Firebase's public web config (`apiKey`, `authDomain`, etc.) is
meant to be exposed client-side by Firebase's own design — it is NOT a
secret. Only the three server-side variables above must stay private.

---

## 3. Google Gemini API (AI reasoning layer)

The app runs on a fully deterministic rule/scoring engine without this —
that's a hard product requirement (spec §38), not a limitation. Add this
only to layer richer natural-language explanations on top.

| Variable | What it is | Where to get it |
|---|---|---|
| `GEMINI_API_KEY` | Your Gemini API key | https://aistudio.google.com/apikey → "Create API key" (free tier available; check current quota at https://ai.google.dev/pricing) |
| `GEMINI_MODEL` | Which model to call | Defaults to `gemini-1.5-pro` in `.env.example` — check https://ai.google.dev/gemini-api/docs/models for current model names, since these change over time |

**Where this plugs in:** `backend/app/recommendation.py`, function
`try_gemini_explain()`. It already makes the correct API call shape — you
only need to supply the key.

---

## 4. College Data Source

The app ships with an 11-college curated fallback dataset (real
institutions) so College Explorer works with zero setup. For the full
national catalogue:

| Source | Type | URL | Notes |
|---|---|---|---|
| AISHE (All India Survey on Higher Education) | Government open data | https://aishe.gov.in | Official Ministry of Education dataset — no API key, but data comes as downloadable reports/datasets, not a live REST API; needs an ETL/import job |
| data.gov.in | Government open data portal | https://data.gov.in | Search "college" or "AISHE" — some datasets have API access; register for an API key on the portal if one is available for the specific dataset |
| A commercial college-data API (optional) | Third-party | *(pick a provider with an explicit free tier, per spec §14 — none is hardcoded into this app; you choose one)* | Fill `COLLEGE_API_KEY` in `.env` once chosen; wire it into a new provider class implementing the `CollegeProvider` interface — not built yet since no such provider is connected here |

**Where this plugs in:** `backend/app/seed_data.py` (the fallback list) —
a real sync job would live in a new `backend/app/integrations/college_provider.py`
implementing the abstraction the spec requires (§59), writing normalized
rows into the `colleges` / `college_courses` tables and logging to
`external_data_sources`.

---

## 5. Scholarship Data Source

Ships with 6 real, curated central-government scholarship schemes.

| Source | URL | Notes |
|---|---|---|
| National Scholarship Portal | https://scholarships.gov.in | The authoritative source for most central scholarships — no public REST API as of this writing; would need scraping (against ToS — avoid) or manual/periodic data entry |
| AICTE Pragati/Saksham | https://www.aicte-pragati-saksham-gov.in | Technical education scholarships for women |
| DST INSPIRE | https://www.online-inspire.gov.in | Science scholarships |
| UGC | https://www.ugc.gov.in | University Grants Commission schemes |
| Your state's scholarship portal | *(varies by state — e.g. Tamil Nadu: https://tnscholarship.tn.gov.in)* | Search "[your state] government scholarship portal" |

**Important:** Per spec §17/§42, never let an AI model invent scholarship
deadlines, amounts, or eligibility — always link back to these official
pages, and mark data as `needs_verification` (already implemented) until
someone manually confirms it against the source.

---

## 6. Maps / Geocoding

Not built in this pass (see README known limitations) — this section is
for when you add it.

| Variable | What it is | Where to get it |
|---|---|---|
| `MAP_PROVIDER` | Which geocoding provider | Defaults to `osm-nominatim` (free, no key required) |
| `MAP_API_KEY` | Only needed for a paid provider | Leave blank for Nominatim. If you switch providers: Mapbox (https://mapbox.com — free tier), Google Maps Geocoding (https://console.cloud.google.com/google/maps-apis — paid), etc. |

**If you use OpenStreetMap Nominatim (the free default):**
- Usage policy (read before going live): https://operations.osmfoundation.org/policies/nominatim/
- Required: a valid, descriptive `User-Agent` header identifying your app
  (not implemented yet — add when building the map feature)
- Required: cache results, rate-limit your own requests (max ~1 req/sec),
  and never do bulk/systematic geocoding against the public instance
- Attribution required on any map view: "© OpenStreetMap contributors"

---

## 7. Admin Access (no external service — just a step you run yourself)

Not an API key — a one-time local command after you register your first account:

```bash
cd backend
python create_admin.py you@example.com
```

This flips `is_admin = True` on that user row directly in your database.

---

## 8. Summary — what you MUST fill in vs. what's optional

| To do this... | You need |
|---|---|
| Run the app at all, locally, today | **Nothing.** SQLite + dev-JWT auth work with zero setup. |
| Deploy to production with a real shared database | `DATABASE_URL` (Postgres) |
| Use real Firebase email/Google login instead of dev-JWT | Section 2 (Firebase) |
| Get richer AI-narrated explanations instead of the template engine | Section 3 (`GEMINI_API_KEY`) — the app works fully without this |
| Show the full national college catalogue instead of 11 curated ones | Section 4 |
| Show the full national scholarship catalogue instead of 6 curated ones | Section 5 |
| Add a map view | Section 6 |

Every one of the "optional" rows has a working, honest fallback already
built — filling these in *upgrades* the app, none of them are required to
get a real, working product running.
