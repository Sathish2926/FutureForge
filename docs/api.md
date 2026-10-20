# API reference

Base path: `/api`. All routes except `/auth/*` and `/health` require
`Authorization: Bearer <token>`.

| Method | Path | Purpose |
|---|---|---|
| POST | /auth/register | Create account, returns JWT |
| POST | /auth/login | Returns JWT |
| GET  | /profile | Full profile + completeness score |
| PATCH | /profile | Partial update — never re-asks known fields |
| GET  | /careers | List/search catalogue |
| GET  | /careers/{slug} | Full detail incl. all pathways |
| POST | /careers/recommendations | Hybrid-engine match scores + reasoning |
| GET  | /colleges | Filterable list |
| GET  | /colleges/{id} | Detail |
| POST | /colleges/recommendations | Tiered matches against profile |
| GET  | /scholarships | List |
| GET  | /scholarships/{id} | Detail incl. eligibility rules |
| POST | /scholarships/recommendations | Deterministic eligibility check |
| POST | /roadmaps | Body: `{career_slug}` OR `{goal_text}` (any free text — resolved/synthesized via the universal career resolver if not curated). Generates a new independent roadmap; user can hold unlimited roadmaps for unlimited goals simultaneously. Re-posting the same goal versions that goal's roadmap rather than duplicating it. |
| GET  | /roadmaps | ALL of the user's active roadmaps (one per goal they've generated), each with steps + completion % |
| POST | /roadmaps/progress | Update a step's status |
| GET  | /career-dna/stages | List of supported Career DNA stages |
| GET  | /career-dna/questions?stage=... | Stage-specific question set (class10/class12/ug/pg/job_switcher) |
| POST | /career-dna/submit | Submit answers for one stage → returns every group/path open at that stage + why, ranked but never filtered |
| GET  | /career-dna | All of the user's Career DNA responses across every stage they've filled in |
| GET  | /career-dna/{stage} | This user's single-stage response |
| POST | /ai/chat | AI advisor — also resolves/synthesizes arbitrary goals via the same universal resolver, so "how do I become a politician" gets a real structured answer (deterministic fallback, Gemini optional) |
| GET  | /ai/conversations | List past conversations |
| GET  | /dashboard | Aggregate command-center view |
| GET/POST | /saved/colleges[/{id}] | Saved colleges |
| GET/POST | /saved/scholarships[/{id}] | Saved scholarships |
| GET  | /admin/analytics | Admin-only usage analytics |
| GET  | /admin/data-sources | Admin-only provider status |

Full interactive docs at `/docs` (Swagger UI) once the backend is running.
