# AI system

## Current implementation
`app/recommendation.py` and `app/routers/chat.py` implement a
deterministic reasoning layer that mirrors the *output contract* the
spec wants from Gemini (recommendation / why it fits / next step /
alternatives / trade-offs / confidence / sources) without depending on
a live model. This is intentional per §38 (AI failure fallback) — it
also means the app is fully functional in this network-less sandbox.

## Adding real Gemini tool-calling
1. Set `GEMINI_API_KEY` in `.env`.
2. `try_gemini_explain()` already makes a basic `generateContent` call —
   extend it to Gemini's function-calling API, registering tools that
   mirror the spec's list: `get_user_profile`, `search_colleges`,
   `search_scholarships`, `calculate_profile_fit`, etc. Each tool should
   simply call the existing Python functions in `recommendation.py` /
   the router modules — don't let Gemini invent data, only orchestrate
   calls to them.
3. Keep `score_career()` and the eligibility-rule checks in
   `scholarships.py` as the source of truth Gemini's output is
   constrained by — never let a Gemini response override a PASS/FAIL
   eligibility determination (§18).
