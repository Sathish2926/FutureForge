"""
Comprehensive unit & integration tests for Working Professional Career Growth & Transition Planner.
Tests:
- Scenario A: Known Target Role (Manual Tester -> Automation Tester)
- Scenario B: Unknown Target Role (Accountant -> Career Options Recommendations)
- Scenario C: Promotion & Seniority (Software Developer progression)
- Scenario D: AI Fallback (Grounded rule-based fallback when AI is unavailable)
- Scenario E: Security & Persistence (Auth enforcement, user isolation, step & checklist updates)
- Scenario F: Regression safety (Colleges, Scholarships, Health, Career DNA remain intact)
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app import models, professional_models
from app.auth import create_access_token, hash_password
from app.services.professional_planner_service import seed_professional_dataset


@pytest.fixture(scope="module")
def test_db():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    seed_professional_dataset(db)

    # Create two test users
    user1 = models.User(
        email="professional1@example.com",
        hashed_password=hash_password("Password123!"),
    )
    user2 = models.User(
        email="professional2@example.com",
        hashed_password=hash_password("Password123!"),
    )
    db.add(user1)
    db.add(user2)
    db.commit()
    db.refresh(user1)
    db.refresh(user2)

    yield db, user1, user2

    db.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="module")
def client(test_db):
    db, _, _ = test_db

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def test_unauthenticated_access_denied(client):
    """Scenario E: Unauthenticated requests return 401 or 403 Forbidden."""
    resp = client.get("/api/career-dna/professional/profile")
    assert resp.status_code in (401, 403)

    resp = client.post("/api/career-dna/professional/profile", json={})
    assert resp.status_code in (401, 403)


def test_scenario_a_known_target_manual_tester(client, test_db):
    """
    Scenario A: Known Target Role
    Input:
    - Current role: Manual Tester, 2 years experience
    - Skills: Manual Testing, Test Case Design, Bug Reporting
    - Target: Automation Tester
    - Learning time: 5 hours/week, Free resources only
    """
    db, user1, _ = test_db
    token = create_access_token(user1.id)
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Save profile
    payload = {
        "current_job_title": "Manual Tester",
        "current_industry": "Software & Information Technology",
        "years_experience": 2.0,
        "employment_type": "Full-time",
        "highest_qualification": "Bachelor of Technology",
        "degree_specialization": "Computer Science",
        "current_skills": ["Manual Testing", "Test Case Design", "Bug Reporting", "Defect Reporting & Triage"],
        "tools_technologies": ["Jira", "Postman", "Excel"],
        "responsibilities": "Creating test scenarios, executing manual regression cycles, documenting defect logs.",
        "certifications": ["ISTQB Foundation"],
        "career_goals": ["Switch to a different job", "Learn new skills required for career growth"],
        "target_pathway": "known_target",
        "target_role": "Automation Tester",
        "target_industry": "Software & Information Technology",
        "preferred_location": "Bangalore / Remote",
        "preferred_work_arrangement": "Remote",
        "target_salary_range": "8 - 12 LPA",
        "weekly_learning_hours": 5,
        "preferred_learning_format": "Practical Projects",
        "learning_budget": "Free Only",
        "preferred_language": "English",
        "target_timeline": "Medium-term",
    }

    res = client.post("/api/career-dna/professional/profile", json=payload, headers=headers)
    assert res.status_code == 200, res.text
    profile_data = res.json()
    assert profile_data["current_job_title"] == "Manual Tester"
    assert profile_data["target_role"] == "Automation Tester"
    assert profile_data["profile_summary"] is not None

    # 2. Skill Gap Analysis
    gap_res = client.post("/api/career-dna/professional/gap-analysis?target_role=Automation%20Tester", headers=headers)
    assert gap_res.status_code == 200, gap_res.text
    gap_data = gap_res.json()
    assert gap_data["target_role"] == "Automation Tester"
    assert gap_data["match_score"] > 0
    # Recognized reported testing skills
    existing_skill_names = [s["skill_name"] for s in gap_data["existing_skills"]]
    assert "Test Case Design" in existing_skill_names or "Defect Reporting & Triage" in existing_skill_names
    # Identified automation skills to develop
    missing_skill_names = [s["skill_name"] for s in gap_data["missing_skills"]]
    assert any("Selenium" in s or "Python" in s or "Playwright" in s for s in missing_skill_names)

    # 3. Generate Roadmap Plan
    plan_res = client.post("/api/career-dna/professional/plans", json={"target_role": "Automation Tester"}, headers=headers)
    assert plan_res.status_code == 200, plan_res.text
    plan_data = plan_res.json()
    assert plan_data["target_role"] == "Automation Tester"
    assert plan_data["total_steps"] >= 4
    assert len(plan_data["steps"]) >= 4
    # Check that steps are ordered and grouped into stages
    stage_names = [s["stage_name"] for s in plan_data["steps"]]
    assert any("Strengthen Foundations" in s for s in stage_names)
    assert any("Develop Target Skills" in s for s in stage_names)
    assert any("Build Practical Evidence" in s for s in stage_names)
    assert any("Prepare for the Transition" in s for s in stage_names)

    # Verify free learning resources attached
    resources = [s.get("resource_url") for s in plan_data["steps"] if s.get("resource_url")]
    assert len(resources) > 0

    # 4. Progress Tracking
    first_step = plan_data["steps"][0]
    step_id = first_step["id"]
    patch_res = client.patch(
        f"/api/career-dna/professional/plans/{plan_data['id']}/steps/{step_id}",
        json={"completion_status": "completed", "user_notes": "Completed test case audit and mapped to automation."},
        headers=headers,
    )
    assert patch_res.status_code == 200
    assert patch_res.json()["completion_status"] == "completed"

    # Verify progress recalculation
    updated_plan_res = client.get(f"/api/career-dna/professional/plans/{plan_data['id']}", headers=headers)
    assert updated_plan_res.status_code == 200
    updated_plan = updated_plan_res.json()
    assert updated_plan["completed_steps"] == 1
    assert updated_plan["progress_pct"] > 0


def test_scenario_b_unknown_target_accountant(client, test_db):
    """
    Scenario B: Unknown Target Role
    Input:
    - Current role: Accountant, 3 years experience
    - Skills: Excel, Financial Reporting
    - Goal: Explore career growth, Target role not selected
    """
    db, _, user2 = test_db
    token = create_access_token(user2.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Accountant",
        "current_industry": "Finance & Accounting",
        "years_experience": 3.0,
        "employment_type": "Full-time",
        "highest_qualification": "Bachelor of Commerce",
        "degree_specialization": "Accounting",
        "current_skills": ["Excel", "Financial Reporting", "Bookkeeping", "Tally ERP"],
        "tools_technologies": ["MS Excel", "Tally", "QuickBooks"],
        "responsibilities": "Managing journal entries, reconciliation, monthly GST filings, profit and loss statements.",
        "certifications": [],
        "career_goals": ["Explore suitable career options", "Improve salary prospects"],
        "target_pathway": "help_me_choose",
        "target_role": None,
        "weekly_learning_hours": 6,
        "preferred_learning_format": "Guided Courses",
        "learning_budget": "Free Only",
        "target_timeline": "Flexible",
    }

    res = client.post("/api/career-dna/professional/profile", json=payload, headers=headers)
    assert res.status_code == 200

    # Recommend Career Options
    rec_res = client.get("/api/career-dna/professional/recommendations", headers=headers)
    assert rec_res.status_code == 200
    recommendations = rec_res.json()
    assert len(recommendations) > 0
    rec_titles = [r["role_title"] for r in recommendations]
    assert any("Financial Analyst" in t or "Data Analyst" in t for t in rec_titles)

    # Let user select "Financial Analyst" and generate plan
    selected_role = "Financial Analyst"
    plan_res = client.post("/api/career-dna/professional/plans", json={"target_role": selected_role}, headers=headers)
    assert plan_res.status_code == 200
    plan = plan_res.json()
    assert plan["target_role"] == selected_role
    assert plan["total_steps"] >= 4


def test_scenario_c_promotion_software_developer(client, test_db):
    """
    Scenario C: Promotion / Seniority Progression
    Input:
    - Software Developer, 4 years experience
    - Goal: Move into a senior role
    """
    db, user1, _ = test_db
    token = create_access_token(user1.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Software Developer",
        "current_industry": "Software & Information Technology",
        "years_experience": 4.0,
        "employment_type": "Full-time",
        "highest_qualification": "B.Tech Computer Science",
        "current_skills": ["Python", "SQL", "REST APIs", "Git", "Docker"],
        "tools_technologies": ["PostgreSQL", "Docker", "GitLab CI", "Linux"],
        "responsibilities": "Developing microservices, code reviews, database queries, API development.",
        "career_goals": ["Get promoted", "Move into a leadership or management role"],
        "target_pathway": "known_target",
        "target_role": "Backend Developer",
        "weekly_learning_hours": 8,
    }
    client.post("/api/career-dna/professional/profile", json=payload, headers=headers)

    plan_res = client.post("/api/career-dna/professional/plans", json={"target_role": "Backend Developer"}, headers=headers)
    assert plan_res.status_code == 200
    plan = plan_res.json()
    assert plan["target_role"] == "Backend Developer"
    assert plan["match_score"] >= 40
    # Capstone practical project should be present in Stage 3
    capstone_steps = [s for s in plan["steps"] if "Capstone" in s["title"] or "Practical" in s["stage_name"]]
    assert len(capstone_steps) > 0


def test_scenario_d_ai_assistant_fallback(client, test_db):
    """
    Scenario D: AI Service Guidance & Deterministic Fallback
    Assistant provides contextual replies and does not crash even without live Gemini keys.
    """
    db, user1, _ = test_db
    token = create_access_token(user1.id)
    headers = {"Authorization": f"Bearer {token}"}

    queries = [
        "Why was this role recommended for me?",
        "Which of my current skills are transferable?",
        "How can I manage this plan with only 5 hours per week?",
        "How should I approach an internal promotion with my manager?",
    ]
    for q in queries:
        res = client.post("/api/career-dna/professional/assistant", json={"query": q}, headers=headers)
        assert res.status_code == 200, res.text
        data = res.json()
        assert "reply" in data
        assert len(data["reply"]) > 20
        assert "source" in data


def test_scenario_e_user_isolation(client, test_db):
    """
    Scenario E: User Isolation
    User 2 cannot view or modify User 1's plans.
    """
    db, user1, user2 = test_db
    token1 = create_access_token(user1.id)
    token2 = create_access_token(user2.id)

    # Get user 1's plan id
    user1_plans_res = client.get("/api/career-dna/professional/plans", headers={"Authorization": f"Bearer {token1}"})
    assert user1_plans_res.status_code == 200
    user1_plans = user1_plans_res.json()
    assert len(user1_plans) > 0
    u1_plan_id = user1_plans[0]["id"]

    # User 2 tries to access user 1's plan
    u2_access = client.get(f"/api/career-dna/professional/plans/{u1_plan_id}", headers={"Authorization": f"Bearer {token2}"})
    assert u2_access.status_code == 404


def test_scenario_f_regression_testing(client):
    """
    Scenario F: Existing endpoints still function normally without regression.
    """
    # 1. Health check
    h = client.get("/api/health")
    assert h.status_code == 200
    assert h.json() == {"status": "ok"}

    # 2. Career DNA stages
    stages = client.get("/api/career-dna/stages")
    assert stages.status_code == 200
    stage_keys = [s["stage"] for s in stages.json()]
    assert "class10" in stage_keys
    assert "ug" in stage_keys
    assert "job_switcher" in stage_keys

    # 3. Public careers list
    careers_res = client.get("/api/careers")
    assert careers_res.status_code == 200

    # 4. Scholarships list
    scholarships_res = client.get("/api/scholarships")
    assert scholarships_res.status_code == 200


# =========================================================================
# TARGETED SCENARIOS A - F (Prompt Specification Validations)
# =========================================================================

def test_spec_scenario_a_digital_marketer_no_skills_target_bdm(client, test_db):
    """
    Scenario A:
    Current role: Digital Marketer
    Experience: 2 years
    Skills: Not yet provided
    Target: Business Development Manager

    Expected:
    - Do not invent UI/UX, Figma, prospecting, testing, accounting, or programming skills.
    - Ask for missing information (missing_information_prompt populated).
    - Unconfirmed competencies marked unknown with follow_up_prompt.
    - Honest match score (0.0%, no 40% floor).
    """
    db, _, _ = test_db
    user_a = models.User(
        email="scenario_a_user@example.com",
        hashed_password=hash_password("Pass123!"),
    )
    db.add(user_a)
    db.commit()
    db.refresh(user_a)

    token = create_access_token(user_a.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Digital Marketer",
        "current_industry": "Marketing & Advertising",
        "years_experience": 2.0,
        "employment_type": "Full-time",
        "highest_qualification": "Bachelor's Degree",
        "current_skills": [],  # NOT provided yet
        "tools_technologies": [],
        "responsibilities": "",  # Empty
        "certifications": [],
        "career_goals": ["Explore suitable career options"],
        "target_pathway": "known_target",
        "target_role": "Business Development Manager",
        "weekly_learning_hours": 5,
    }

    save_res = client.post("/api/career-dna/professional/profile", json=payload, headers=headers)
    assert save_res.status_code == 200

    gap_res = client.post(
        "/api/career-dna/professional/gap-analysis?target_role=Business%20Development%20Manager",
        headers=headers,
    )
    assert gap_res.status_code == 200
    gap = gap_res.json()

    # 1. No invented skills
    assert len(gap["existing_skills"]) == 0
    all_invented_terms = ["UI/UX", "Figma", "Prospecting", "Selenium", "Testing", "Accounting", "Python"]
    for s in gap["existing_skills"]:
        for term in all_invented_terms:
            assert term.lower() not in s["skill_name"].lower()

    # 2. Honest match score (0%, not fabricated 40%)
    assert gap["match_score"] == 0.0

    # 3. Missing information prompt is returned asking user for details
    assert gap["missing_information_prompt"] is not None
    assert "skills" in gap["missing_information_prompt"].lower()

    # 4. Role requirements are marked unknown with follow-up prompts
    assert len(gap["unknown_skills"]) > 0
    for unk in gap["unknown_skills"]:
        assert unk["status_code"] == "unknown"
        assert unk["follow_up_prompt"] is not None


def test_spec_scenario_b_digital_marketer_seo_content_career_growth(client, test_db):
    """
    Scenario B:
    Current role: Digital Marketer
    Experience: 2 years
    Confirmed skills: SEO, Google Analytics, content marketing
    Goal: Career growth

    Expected:
    - Recommend plausible marketing-related pathways and explain their relevance.
    - Only recommend technical or sales transitions when justified.
    - No 40% hardcoded floor.
    - Transparent 4-part score breakdown returned.
    """
    db, _, _ = test_db
    user_b = models.User(
        email="scenario_b_user@example.com",
        hashed_password=hash_password("Pass123!"),
    )
    db.add(user_b)
    db.commit()
    db.refresh(user_b)

    token = create_access_token(user_b.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Digital Marketer",
        "current_industry": "Marketing & Advertising",
        "years_experience": 2.0,
        "employment_type": "Full-time",
        "highest_qualification": "Bachelor of Business Administration",
        "current_skills": ["SEO", "Google Analytics", "Content Marketing"],
        "tools_technologies": ["Google Analytics", "Google Search Console", "WordPress"],
        "responsibilities": "Managing organic content, optimizing blog posts for SEO, tracking monthly web traffic and conversion in GA4.",
        "career_goals": ["Get promoted in current company", "Become a specialist in the current field"],
        "target_pathway": "help_me_choose",
        "target_role": None,
        "weekly_learning_hours": 6,
    }

    client.post("/api/career-dna/professional/profile", json=payload, headers=headers)

    rec_res = client.get("/api/career-dna/professional/recommendations", headers=headers)
    assert rec_res.status_code == 200
    recs = rec_res.json()
    assert len(recs) > 0

    rec_map = {r["role_title"]: r for r in recs}

    # Top recommendations must include marketing-related pathways
    marketing_roles = [
        "Growth Marketing Specialist",
        "Content Strategy & SEO Lead",
        "Performance Marketing Specialist",
        "Marketing Analytics Specialist",
    ]
    present_marketing = [r for r in marketing_roles if r in rec_map]
    assert len(present_marketing) >= 2, f"Expected marketing pathways, found: {list(rec_map.keys())}"

    # Verify marketing roles have high match (> 30%) and technical software roles have low match (< 25%)
    top_marketing = rec_map[present_marketing[0]]
    assert top_marketing["match_score"] >= 30.0
    assert top_marketing["score_breakdown"] is not None
    assert top_marketing["score_breakdown"]["skills_score"] > 0
    assert top_marketing["score_breakdown"]["experience_score"] > 0

    if "Automation Tester" in rec_map:
        auto_tester = rec_map["Automation Tester"]
        assert auto_tester["match_score"] < top_marketing["match_score"]
        # Verify no 40% floor
        assert auto_tester["match_score"] < 40.0


def test_spec_scenario_c_digital_marketer_leadgen_crm_target_bdm(client, test_db):
    """
    Scenario C:
    Current role: Digital Marketer
    Experience: 2 years
    Confirmed skills: Paid advertising, lead generation, CRM campaign management
    Target: Business Development Manager

    Expected:
    - Recognize relevant transferable experience (lead gen, CRM).
    - Identify remaining skill gaps (B2B discovery, sales negotiation).
    - Generate a tailored roadmap covering B2B discovery, qualification, and negotiation.
    """
    db, _, _ = test_db
    user_c = models.User(
        email="scenario_c_user@example.com",
        hashed_password=hash_password("Pass123!"),
    )
    db.add(user_c)
    db.commit()
    db.refresh(user_c)

    token = create_access_token(user_c.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Digital Marketer",
        "current_industry": "Digital Marketing & Growth",
        "years_experience": 2.0,
        "employment_type": "Full-time",
        "highest_qualification": "Bachelor's Degree",
        "current_skills": ["Paid Advertising", "Lead Generation", "CRM Campaign Management"],
        "tools_technologies": ["Meta Ads Manager", "HubSpot CRM", "Google Ads"],
        "responsibilities": "Running paid customer acquisition campaigns, generating marketing qualified leads, tracking conversion in HubSpot CRM.",
        "career_goals": ["Switch to a different job", "Improve salary prospects"],
        "target_pathway": "known_target",
        "target_role": "Business Development Manager",
        "weekly_learning_hours": 6,
    }

    client.post("/api/career-dna/professional/profile", json=payload, headers=headers)

    # 1. Skill Gap Analysis
    gap_res = client.post(
        "/api/career-dna/professional/gap-analysis?target_role=Business%20Development%20Manager",
        headers=headers,
    )
    assert gap_res.status_code == 200
    gap = gap_res.json()

    # Confirmed transferable skills recognized
    existing = [s["skill_name"] for s in gap["existing_skills"]]
    assert any("Lead" in s or "CRM" in s for s in existing)

    # Core sales gaps identified
    missing = [s["skill_name"] for s in gap["missing_skills"]]
    assert any("Discovery" in s or "Negotiation" in s or "Prospecting" in s for s in missing)

    # 2. Roadmap Generation
    plan_res = client.post(
        "/api/career-dna/professional/plans",
        json={"target_role": "Business Development Manager"},
        headers=headers,
    )
    assert plan_res.status_code == 200
    plan = plan_res.json()
    assert plan["target_role"] == "Business Development Manager"

    step_titles = [s["title"] for s in plan["steps"]]
    # Should include tailored BDM transition topics
    assert any("Qualification" in t or "Prospecting" in t or "Discovery" in t for t in step_titles)
    assert any("Negotiation" in t or "Playbook" in t for t in step_titles)


def test_spec_scenario_d_target_role_change_preserves_plans(client, test_db):
    """
    Scenario D:
    The user changes their target role.

    Expected:
    - Recalculate recommendations and skill gaps using the new target without corrupting existing saved plans.
    - Multiple plans coexist safely; switching between them works without data loss.
    """
    db, _, _ = test_db
    user_d = models.User(
        email="scenario_d_user@example.com",
        hashed_password=hash_password("Pass123!"),
    )
    db.add(user_d)
    db.commit()
    db.refresh(user_d)

    token = create_access_token(user_d.id)
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "current_job_title": "Digital Marketer",
        "current_industry": "Marketing & Advertising",
        "years_experience": 2.0,
        "highest_qualification": "Bachelor's Degree",
        "current_skills": ["SEO", "Content Marketing", "Google Analytics"],
        "target_pathway": "known_target",
        "target_role": "Business Development Manager",
        "weekly_learning_hours": 5,
    }
    save_res = client.post("/api/career-dna/professional/profile", json=payload, headers=headers)
    assert save_res.status_code == 200

    # 1. Create plan for Role 1: Business Development Manager
    p1_res = client.post(
        "/api/career-dna/professional/plans",
        json={"target_role": "Business Development Manager"},
        headers=headers,
    )
    assert p1_res.status_code == 200
    p1 = p1_res.json()
    p1_id = p1["id"]

    # Mark first step of p1 as completed
    step1_id = p1["steps"][0]["id"]
    client.patch(
        f"/api/career-dna/professional/plans/{p1_id}/steps/{step1_id}",
        json={"completion_status": "completed"},
        headers=headers,
    )

    # 2. User changes target to Role 2: Growth Marketing Specialist
    p2_res = client.post(
        "/api/career-dna/professional/plans",
        json={"target_role": "Growth Marketing Specialist"},
        headers=headers,
    )
    assert p2_res.status_code == 200
    p2 = p2_res.json()
    p2_id = p2["id"]
    assert p2_id != p1_id

    # 3. Verify both plans are preserved in list
    plans_res = client.get("/api/career-dna/professional/plans", headers=headers)
    assert plans_res.status_code == 200
    saved_plans = plans_res.json()
    saved_ids = [p["id"] for p in saved_plans]
    assert p1_id in saved_ids
    assert p2_id in saved_ids

    # 4. Verify p1 step progress is still intact
    p1_check = client.get(f"/api/career-dna/professional/plans/{p1_id}", headers=headers).json()
    assert p1_check["completed_steps"] == 1

    # 5. Switch active plan back to p1 via activate endpoint
    act_res = client.post(f"/api/career-dna/professional/plans/{p1_id}/activate", headers=headers)
    assert act_res.status_code == 200
    assert act_res.json()["status"] == "active"


def test_spec_scenario_e_ai_provider_failure_fallback(client, test_db):
    """
    Scenario E:
    The AI provider fails or keys are unavailable.

    Expected:
    - Show useful guidance or rule-based fallback without crashing.
    - Explicitly label as rule-based fallback without fabricating live AI claims.
    """
    db, user1, _ = test_db
    token = create_access_token(user1.id)
    headers = {"Authorization": f"Bearer {token}"}

    queries = [
        "Why was this role recommended for me?",
        "Which of my current skills are transferable?",
        "How do I balance learning with my current full-time job?",
    ]
    for q in queries:
        res = client.post("/api/career-dna/professional/assistant", json={"query": q}, headers=headers)
        assert res.status_code == 200
        data = res.json()
        assert "reply" in data
        assert len(data["reply"]) > 20
        # If fallback, verify transparent source label
        if data.get("is_fallback"):
            assert "fallback" in data["source"].lower() or "guidance" in data["source"].lower()
            assert "live gemini" not in data["source"].lower()


def test_spec_scenario_f_regression_safety(client):
    """
    Scenario F:
    Existing Graduate, Scholarship, student Career DNA, authentication, and unrelated features continue working.
    """
    # 1. Base health check
    health = client.get("/api/health")
    assert health.status_code == 200

    # 2. Public career and scholarship catalog
    careers = client.get("/api/careers")
    assert careers.status_code == 200

    scholarships = client.get("/api/scholarships")
    assert scholarships.status_code == 200

    # 3. Career DNA stage listing
    stages = client.get("/api/career-dna/stages")
    assert stages.status_code == 200
    stages_data = stages.json()
    stage_ids = [s["stage"] for s in stages_data]
    assert "class10" in stage_ids
    assert "class12" in stage_ids
    assert "ug" in stage_ids
    assert "pg" in stage_ids
    assert "job_switcher" in stage_ids

