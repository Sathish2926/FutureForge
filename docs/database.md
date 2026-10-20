# Database schema (3NF)

Full model definitions: `backend/app/models.py`.

Core entity groups:
- **Identity**: `users`, `profiles`, `financial_profiles` (income/budget
  live once, referenced by FK — never duplicated per spec §28).
- **Education**: `education_records`, `skills`/`user_skills`,
  `interests`/`user_interests`.
- **Career**: `careers`, `career_skills`, `career_pathways` (one row per
  route type — common/competitive/research/industry/backup),
  `career_alternatives`, `career_goals`.
- **Roadmap**: `roadmaps` (versioned, never deleted on goal change —
  spec §25/§26), `roadmap_steps`, `roadmap_progress`.
- **Colleges**: `colleges`, `courses`, `college_courses` (join table
  carrying exam/fees/eligibility per course-at-college).
- **Scholarships**: `scholarships`, `scholarship_eligibility_rules`
  (typed rules: income_max/category/min_marks — evaluated deterministically,
  never overridden by AI per spec §18).
- **Engagement**: `saved_colleges`, `saved_scholarships`,
  `ai_conversations`/`ai_messages`, `recommendations` (immutable
  snapshots), `external_data_sources`.

All FK relationships use SQLAlchemy `relationship()` for ORM convenience;
see the model file for exact columns, indexes (via `unique=True`/
`index=True`), and constraints.
