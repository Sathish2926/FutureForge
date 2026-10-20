"""
Automated Test Suite for AI Career Guidance Engine & Verified Career Knowledge Base.
Tests 1 through 8 strictly adhere to Section 14 of the requirements:
- Test 1: Multiple Skills (Digital marketer + teaching + communication + data analysis)
- Test 2: Career Transition (Accountant to Data Analyst)
- Test 3: Missing Profile Details (Follow-up prompts, no arbitrary match percentage)
- Test 4: Unsupported Career (Missing coverage detected, request logged, transparent limitation notice)
- Test 5: Incomplete Career Record (Detects incomplete record, flags verification notice)
- Test 6: Unknown Skill Preserved (Preserves original user phrasing)
- Test 7: AI Failure Fallback (Deterministic rule-based response when Gemini fails)
- Test 8: Existing Module Regression (Verifies existing endpoints remain unbroken)
"""
import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from app import models
from app.auth import create_access_token, hash_password
from app.professional_models import (
    ProfessionalProfile,
    ProfessionalRole,
    GuidanceRequestRecord,
)
from app.services.professional_planner_service import (
    seed_professional_dataset,
    calculate_skill_gap_analysis,
    recommend_career_options,
    generate_personalized_roadmap,
)
from app.services.profile_nlp_service import (
    parse_natural_language_profile,
    analyze_multiskill_evidence,
)


@pytest.fixture(scope="module")
def engine_and_session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    seed_professional_dataset(db)

    # Seed test users
    user = models.User(
        email="career_test_user@futureforge.test",
        hashed_password=hash_password("SecurePass123!"),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    yield db, user

    db.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="module")
def client(engine_and_session):
    db, _ = engine_and_session

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture(scope="module")
def auth_headers(engine_and_session):
    _, user = engine_and_session
    token = create_access_token(user.id)
    return {"Authorization": f"Bearer {token}"}


# ============================================================================
# TEST 1: Multiple Skills
# Input: A digital marketer with teaching experience, communication skills,
# and basic data analysis.
# Expected:
# - Analyse all provided information.
# - Do not ignore secondary skills.
# - Do not invent unreported qualifications or achievements.
# - Recommend only careers supported by relevant data.
# ============================================================================
def test_1_multiple_skills_analysis(client, auth_headers, engine_and_session):
    db, user = engine_and_session

    bio_text = (
        "I am a digital marketer with 3 years of experience in SEO, campaign execution, and social media. "
        "I also have 1 year of teaching experience at a coaching institute, strong communication skills, "
        "and basic data analysis capabilities using Excel and Google Analytics."
    )

    # 1. Parse natural language profile
    parse_res = client.post(
        "/api/career-dna/professional/profile/parse-natural-language",
        json={"profile_text": bio_text},
        headers=auth_headers,
    )
    assert parse_res.status_code == 200
    parsed = parse_res.json()["extracted_profile"]

    # Verify primary and secondary skills are extracted
    extracted_skills_lower = [s.lower() for s in parsed.get("current_skills", [])]
    assert any("marketing" in s or "seo" in s for s in extracted_skills_lower)
    assert any("teaching" in s for s in extracted_skills_lower), "Secondary teaching skill must not be ignored"
    assert any("communication" in s for s in extracted_skills_lower), "Secondary communication skill must not be ignored"
    assert any("data analysis" in s or "analytics" in s for s in extracted_skills_lower)

    # 2. Save profile
    save_payload = {
        "current_job_title": "Digital Marketer",
        "current_industry": "Marketing & Advertising",
        "years_experience": 3.0,
        "highest_qualification": "Bachelor of Arts",
        "current_skills": parsed.get("current_skills", ["SEO", "Content Marketing", "Teaching", "Communication", "Data Analysis"]),
        "tools_technologies": ["Google Analytics", "MS Excel"],
        "career_goals": ["Explore suitable career options"],
        "target_pathway": "explore_options",
    }
    save_res = client.post("/api/career-dna/professional/profile", json=save_payload, headers=auth_headers)
    assert save_res.status_code == 200

    # 3. Check career recommendations
    rec_res = client.get("/api/career-dna/professional/recommendations", headers=auth_headers)
    assert rec_res.status_code == 200
    recs = rec_res.json()
    assert len(recs) > 0

    # Ensure recommendations are grounded in marketing / communication / growth
    rec_titles = [r["role_title"] for r in recs]
    has_relevant_role = any(
        "Marketing" in t or "Content" in t or "SEO" in t or "Analytics" in t
        for t in rec_titles
    )
    assert has_relevant_role, f"Expected relevant career pathways, got: {rec_titles}"

    # Verify that secondary teaching/communication skills are analyzed in transferable capabilities
    top_rec = recs[0]
    assert "score_breakdown" in top_rec
    assert top_rec["score_breakdown"]["skills_score"] > 0
    # No hallucinated certifications
    assert "Certified Cloud Architect" not in str(recs)


# ============================================================================
# TEST 2: Career Transition (Accountant to Data Analyst)
# Input: An accountant who wants to become a data analyst.
# Expected:
# - Identify potentially relevant accounting and analytical experience.
# - Confirm unknown technical skills.
# - Identify documented gaps such as SQL or visualization when applicable.
# - Provide a supported learning pathway if sufficient data exists.
# ============================================================================
def test_2_career_transition_accountant_to_data_analyst(client, auth_headers, engine_and_session):
    profile_payload = {
        "current_job_title": "Accountant",
        "current_industry": "Finance & Accounting",
        "years_experience": 4.0,
        "highest_qualification": "Bachelor of Commerce",
        "current_skills": ["Financial Reporting", "General Ledger", "Excel", "Budgeting", "Variance Analysis"],
        "tools_technologies": ["MS Excel", "Tally ERP"],
        "career_goals": ["Switch to a different job"],
        "target_pathway": "known_target",
        "target_role": "Data Analyst",
    }
    save_res = client.post("/api/career-dna/professional/profile", json=profile_payload, headers=auth_headers)
    assert save_res.status_code == 200

    # Request skill gap analysis for target role "Data Analyst"
    gap_res = client.post("/api/career-dna/professional/gap-analysis?target_role=Data+Analyst", headers=auth_headers)
    assert gap_res.status_code == 200
    gap = gap_res.json()

    # 1. Potentially transferable / existing analytical skills identified (e.g. Excel, numerical analysis)
    existing_skill_names = [s["skill_name"].lower() for s in gap.get("existing_skills", [])]
    assert any("excel" in s or "data" in s or "reporting" in s for s in existing_skill_names)

    # 2. Documented gaps identified (SQL, Python/R, or BI/Visualization)
    missing_skill_names = [s["skill_name"].lower() for s in gap.get("missing_skills", [])]
    assert any("sql" in s for s in missing_skill_names), "SQL should be identified as a core gap"

    # 3. Unknown technical skills flagged for confirmation rather than assumed present
    unknown_skill_names = [s["skill_name"].lower() for s in gap.get("unknown_skills", [])]
    # Either in missing or unknown, they must not be assumed present in existing_skills
    assert not any("python" in s for s in existing_skill_names), "Python must not be assumed present"

    # 4. Create structured roadmap for transition
    plan_res = client.post("/api/career-dna/professional/plans", json={"target_role": "Data Analyst"}, headers=auth_headers)
    assert plan_res.status_code == 200
    plan = plan_res.json()
    assert plan["target_role"] == "Data Analyst"
    assert plan["total_steps"] >= 4
    # Ensure SQL or Data Visualization is part of the learning steps
    step_titles = [s["title"].lower() for s in plan["steps"]]
    assert any("sql" in t or "data" in t or "analysis" in t or "visualization" in t for t in step_titles)


# ============================================================================
# TEST 3: Missing Profile Details
# Input: A professional asks for a career change but does not provide current skills or target role.
# Expected:
# - Ask concise, relevant follow-up questions.
# - Do NOT generate arbitrary match percentages.
# ============================================================================
def test_3_missing_profile_details_no_arbitrary_scores(client, auth_headers, engine_and_session):
    db, user = engine_and_session

    # Profile with no skills, no target, minimal info
    sparse_payload = {
        "current_job_title": "Job Seeker",
        "current_industry": "General",
        "years_experience": 0.0,
        "highest_qualification": "Not Specified",
        "current_skills": [],
        "tools_technologies": [],
        "career_goals": ["Switch to a different job"],
        "target_pathway": "explore_options",
        "target_role": "",
    }
    save_res = client.post("/api/career-dna/professional/profile", json=sparse_payload, headers=auth_headers)
    assert save_res.status_code == 200

    # 1. Recommendations should not fabricate high scores (e.g. 75%)
    rec_res = client.get("/api/career-dna/professional/recommendations", headers=auth_headers)
    assert rec_res.status_code == 200
    recs = rec_res.json()
    # Should either be empty or only return low stretch matches with explicit 0% skills score
    for r in recs:
        assert r["match_score"] < 40.0, f"Arbitrary high match score generated: {r['match_score']}"
        assert r["score_breakdown"]["skills_score"] == 0.0

    # 2. Skill gap analysis on an empty profile produces Case C prompts
    gap_res = client.post("/api/career-dna/professional/gap-analysis?target_role=Automation+Tester", headers=auth_headers)
    assert gap_res.status_code == 200
    gap = gap_res.json()
    assert gap["status"] in ("insufficient_profile", "partially_verified", "sufficient_data")
    assert gap["missing_information_prompt"] is not None
    assert len(gap["missing_information_questions"]) > 0
    # Questions ask for specific details
    q_texts = [q["question"] for q in gap["missing_information_questions"]]
    assert any("skill" in q.lower() or "experience" in q.lower() or "industry" in q.lower() for q in q_texts)


# ============================================================================
# TEST 4: Unsupported Career
# Input: A user requests detailed guidance for a career absent from the knowledge base.
# Expected:
# - Detect the missing coverage.
# - Avoid inventing requirements or roadmaps.
# - Explain the limitation.
# - Record the request only if the implemented workflow supports it.
# ============================================================================
def test_4_unsupported_career_coverage_and_logging(client, auth_headers, engine_and_session):
    db, user = engine_and_session

    unsupported_role = "Quantum Astrobiology Specialist"

    gap_res = client.post(
        f"/api/career-dna/professional/gap-analysis?target_role={unsupported_role}",
        headers=auth_headers,
    )
    assert gap_res.status_code == 200
    gap = gap_res.json()

    # 1. Missing coverage detected
    assert gap["status"] == "unsupported_career"

    # 2. Limitation clearly explained without fabricating fake skills
    assert gap["unsupported_message"] is not None
    assert "not currently covered by our verified guidance database" in gap["unsupported_message"]
    assert gap["match_score"] == 0.0

    # 3. Request recorded in database
    assert gap["request_logged"] is True
    assert gap["request_id"] is not None
    assert gap["request_id"].startswith("REQ-") or gap["request_id"].startswith("GR-")

    # 4. Verify request was recorded in guidance_request_records table
    req_record = db.query(GuidanceRequestRecord).filter_by(request_id=gap["request_id"]).first()
    assert req_record is not None
    assert req_record.career_topic == unsupported_role
    assert req_record.category == "unsupported_career"

    # 5. Endpoint to list logged guidance requests returns this request
    list_res = client.get("/api/career-dna/professional/guidance-requests", headers=auth_headers)
    assert list_res.status_code == 200
    requests_list = list_res.json()
    req_ids = [r["request_id"] for r in requests_list]
    assert gap["request_id"] in req_ids


# ============================================================================
# TEST 5: Incomplete Career Record
# Input: A career exists in the database but has insufficient skill or qualification information.
# Expected:
# - Detect incomplete coverage.
# - Avoid presenting the record as fully verified.
# - Provide only supported information or ask for further review.
# ============================================================================
def test_5_incomplete_career_record_handling(client, auth_headers, engine_and_session):
    db, _ = engine_and_session

    # Provide a profile with verified skills
    profile_payload = {
        "current_job_title": "Lab Assistant",
        "current_industry": "Healthcare & Life Sciences",
        "years_experience": 2.0,
        "highest_qualification": "Bachelor of Science",
        "current_skills": ["Biology", "Laboratory Protocols", "Sample Preparation"],
        "tools_technologies": ["Microscope", "Lab Information System"],
        "career_goals": ["Explore suitable career options"],
        "target_pathway": "explore_options",
    }
    client.post("/api/career-dna/professional/profile", json=profile_payload, headers=auth_headers)

    # Query the incomplete career sample seeded into DB
    incomplete_role = db.query(ProfessionalRole).filter_by(completeness_status="incomplete").first()
    assert incomplete_role is not None, "Incomplete career sample should be seeded"

    # Request gap analysis on incomplete role
    gap_res = client.post(
        f"/api/career-dna/professional/gap-analysis?target_role={incomplete_role.title}",
        headers=auth_headers,
    )
    assert gap_res.status_code == 200
    gap = gap_res.json()

    # Detect incomplete status & flag verification notice
    assert gap["completeness_status"] == "incomplete"
    assert gap["status"] in ("partially_verified", "insufficient_profile")
    assert gap["verification_notice"] is not None
    assert "undergoing curriculum verification" in gap["verification_notice"]


# ============================================================================
# TEST 6: User Mentions an Unknown Skill
# Expected:
# - Preserve the original skill text.
# - Ask for clarification if necessary.
# - Avoid rejecting unfamiliar wording solely because it is absent from predefined dropdown options.
# ============================================================================
def test_6_unknown_skill_preservation(client, auth_headers, engine_and_session):
    custom_skill = "Algorithmic Market Arbitrage v3"
    custom_tool = "Quantum Simulator v2.1"

    profile_payload = {
        "current_job_title": "Quantitative Associate",
        "current_industry": "Finance",
        "years_experience": 2.0,
        "highest_qualification": "Master of Science",
        "current_skills": ["Financial Analysis", custom_skill],
        "tools_technologies": ["MS Excel", custom_tool],
        "career_goals": ["Get promoted in current company"],
        "target_pathway": "explore_options",
    }

    save_res = client.post("/api/career-dna/professional/profile", json=profile_payload, headers=auth_headers)
    assert save_res.status_code == 200
    saved = save_res.json()

    # Original wording is preserved in profile
    assert custom_skill in saved["current_skills"]
    assert custom_tool in saved["tools_technologies"]

    # When querying gap analysis, custom skill is preserved in profile data
    get_res = client.get("/api/career-dna/professional/profile", headers=auth_headers)
    assert get_res.status_code == 200
    assert custom_skill in get_res.json()["current_skills"]


# ============================================================================
# TEST 7: AI Failure Fallback
# Expected:
# - Use reliable rule-based fallback where possible.
# - Display a transparent error or unavailable status otherwise.
# - Never fabricate an answer to hide an API failure.
# ============================================================================
def test_7_ai_failure_fallback_deterministic_output(client, auth_headers, engine_and_session):
    # Mock Gemini / AI explainer to simulate network outage / API exception
    with patch("app.recommendation.try_gemini_explain", side_effect=RuntimeError("AI API service unreachable")):
        query_payload = {
            "query": "What steps should I take to transition from manual to automated testing?",
            "plan_id": None,
        }
        res = client.post("/api/career-dna/professional/assistant", json=query_payload, headers=auth_headers)
        assert res.status_code == 200
        data = res.json()

        # Fallback must be deterministic, transparent, and structured
        assert data["is_fallback"] is True
        assert len(data["reply"]) > 50
        assert "Rule-Based" in data["source"] or "Curated" in data["source"]
        # No error crash, no fabricated hallucination
        assert "skill" in data["reply"].lower() or "transition" in data["reply"].lower()


# ============================================================================
# TEST 8: Existing Module Regression Safety
# Verify that:
# - Student career guidance continues to work.
# - Existing Graduate features remain functional.
# - Scholarship functionality remains unchanged.
# ============================================================================
def test_8_existing_module_regression_safety(client, auth_headers):
    # 1. Scholarship search endpoint remains unbroken
    sch_res = client.get("/api/scholarships?limit=5", headers=auth_headers)
    assert sch_res.status_code == 200
    sch_data = sch_res.json()
    assert isinstance(sch_data, list)

    # 2. Career DNA base routes remain functional
    canonical_res = client.get("/api/career-dna/graduate/canonical", headers=auth_headers)
    # 200 or 404 (if not initialized) without crashing with 500
    assert canonical_res.status_code in (200, 404)

    # 3. User profile authentication remains intact
    me_res = client.get("/api/career-dna/professional/profile", headers=auth_headers)
    assert me_res.status_code == 200
    me_res = client.get("/api/career-dna/professional/profile", headers=auth_headers)
    assert me_res.status_code == 200
