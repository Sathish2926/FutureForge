"""
End-to-end API integration tests for the Scholarship Module.
Tests live database sessions, API endpoints, serialization, and deterministic evaluations.
"""
import pytest
from app.database import SessionLocal
from app import models
from app.routers import scholarships


@pytest.fixture
def db_session():
    db = SessionLocal()
    yield db
    db.close()


@pytest.fixture
def test_user(db_session):
    user = db_session.query(models.User).filter_by(email="scholarship_test@futureforge.ai").first()
    if not user:
        user = models.User(
            email="scholarship_test@futureforge.ai",
            hashed_password="hashed_pw_test",
            is_admin=True
        )
        db_session.add(user)
        db_session.flush()

        prof = models.Profile(
            user_id=user.id,
            name="Sita Raman",
            education_stage="ug",
            gender="female",
            state="Tamil Nadu",
            district="Chennai",
            category="BC"
        )
        db_session.add(prof)
        db_session.commit()
    return user


def test_api_list_scholarships(db_session):
    """Test listing scholarships with state and level filters."""
    all_schs = scholarships.list_scholarships(db=db_session)
    assert len(all_schs) >= 10

    # Filter by Tamil Nadu
    tn_schs = scholarships.list_scholarships(db=db_session, state="Tamil Nadu")
    assert any("Tamil Nadu" in s["eligible_states"] or s["geographic_coverage"] == "tamil_nadu" for s in tn_schs)


def test_api_get_single_scholarship(db_session):
    """Test retrieving a single scholarship with full rules, documents, and application steps."""
    sch = db_session.query(models.Scholarship).filter(models.Scholarship.code == "TN_PUDHUMAI_PENN").first()
    assert sch is not None

    data = scholarships.get_scholarship(sch.id, db=db_session)
    assert data["name"] == sch.name
    assert len(data["required_documents"]) >= 3
    assert len(data["application_steps"]) >= 4
    assert len(data["eligibility_rules"]) >= 3
    assert data["official_application_url"] == "https://www.penkalvi.tn.gov.in/"


def test_api_profile_save_and_get(db_session, test_user):
    """Test saving and getting multi-step scholarship profile."""
    from app.schemas import ScholarshipProfileIn

    payload = ScholarshipProfileIn(
        education_level="Undergraduate",
        course_name="B.Tech Artificial Intelligence",
        stream="Engineering & Technology",
        previous_marks_percent=88.5,
        domicile_state="Tamil Nadu",
        has_domicile_certificate=True,
        social_category="BC",
        annual_family_income=180000.0,
        gender="female",
        studied_govt_school_tn=True,
        is_first_generation_graduate=True
    )

    save_res = scholarships.save_user_scholarship_profile(payload, db=db_session, user=test_user)
    assert save_res["status"] == "success"

    get_res = scholarships.get_user_scholarship_profile(db=db_session, user=test_user)
    prof = get_res["profile"]
    assert prof["education_level"] == "Undergraduate"
    assert prof["studied_govt_school_tn"] is True
    assert prof["annual_family_income"] == 180000.0


def test_api_recommend_scholarships_deterministic(db_session, test_user):
    """Test full recommendation evaluation for female Tamil Nadu govt school graduate."""
    recs = scholarships.recommend_scholarships(db=db_session, user=test_user)
    assert recs["summary"]["total_count"] >= 10
    assert recs["summary"]["eligible_count"] >= 1

    # Check that Pudhumai Penn is in eligible list
    pudhumai = next((item for item in recs["eligible"] if item["scholarship"]["code"] == "TN_PUDHUMAI_PENN"), None)
    assert pudhumai is not None
    assert pudhumai["eligibility_status"] == "ELIGIBLE"
    assert pudhumai["match_score"] >= 90
    assert len(pudhumai["breakdown"]) >= 3
    assert all(b["result"] == "PASS" for b in pudhumai["breakdown"])


def test_api_saved_and_tracking_flow(db_session, test_user):
    """Test saving scholarship, updating status to 'applied' with ref no, and unsaving."""
    from app.schemas import SavedScholarshipUpdateIn

    sch = db_session.query(models.Scholarship).first()
    assert sch is not None

    # Save
    save_res = scholarships.save_or_update_scholarship(
        sch.id,
        payload=SavedScholarshipUpdateIn(status="saved", notes="Will submit this week"),
        db=db_session,
        user=test_user
    )
    assert save_res["status"] == "success"

    # Verify in list
    saved_list = scholarships.get_user_saved_scholarships(db=db_session, user=test_user)
    assert any(item["scholarship_id"] == sch.id for item in saved_list)

    # Update to applied with ref no
    update_res = scholarships.save_or_update_scholarship(
        sch.id,
        payload=SavedScholarshipUpdateIn(status="applied", application_reference_no="APP_TN_2026_99"),
        db=db_session,
        user=test_user
    )
    assert update_res["tracking_status"] == "applied"

    # Unsave
    del_res = scholarships.unsave_scholarship(sch.id, db=db_session, user=test_user)
    assert del_res["status"] == "success"


def test_api_grounded_ai_explainer(db_session, test_user):
    """Test grounded AI Q&A strictly backed by database records."""
    from app.schemas import ScholarshipAIExplainRequest

    sch = db_session.query(models.Scholarship).filter(models.Scholarship.code == "TN_PUDHUMAI_PENN").first()
    assert sch is not None

    # Query required documents
    res_docs = scholarships.explain_scholarship_ai(
        ScholarshipAIExplainRequest(scholarship_id=sch.id, query="What documents do I need to apply?"),
        db=db_session,
        user=test_user
    )
    assert "Document Checklist" in res_docs["reply"]
    assert "Aadhaar" in res_docs["reply"]

    # Query how to apply
    res_apply = scholarships.explain_scholarship_ai(
        ScholarshipAIExplainRequest(scholarship_id=sch.id, query="How do I apply for this scholarship?"),
        db=db_session,
        user=test_user
    )
    assert "How to Avail" in res_apply["reply"]
    assert "penkalvi" in res_apply["reply"].lower()


def test_api_admin_quality_check(db_session, test_user):
    """Test admin quality check and audit logging."""
    q_check = scholarships.admin_quality_check(db=db_session, user=test_user)
    assert "total_records" in q_check
    assert q_check["total_records"] >= 10
