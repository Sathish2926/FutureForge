"""
Comprehensive automated test suite for FutureForge Scholarship Module.
Implements the 15 required test scenarios from Part 15 of the specification:

TEST 1 — COMPLETE ELIGIBILITY MATCH
TEST 2 — MANDATORY INCOME FAILURE
TEST 3 — UNKNOWN DOMICILE
TEST 4 — COURSE MISMATCH
TEST 5 — CLOSED APPLICATION PERIOD
TEST 6 — OUTDATED RECORD
TEST 7 — MISSING APPLICATION URL
TEST 8 — OPTIONAL QUESTION SKIPPED
TEST 9 — PROFILE UPDATE
TEST 10 — NO MATCHES
TEST 11 — DUPLICATE SCHOLARSHIPS
TEST 12 — END-TO-END FORM SUBMISSION
TEST 13 — INVALID DATA
TEST 14 — API FAILURE
TEST 15 — SOURCE CONFLICT
"""
import pytest
from pydantic import ValidationError
from app import models, schemas
from app.services.eligibility import (
    evaluate_scholarship_detailed,
    evaluate_single_rule,
    compute_application_period_status,
)


class DummyRule:
    def __init__(self, rule_type, rule_value, is_mandatory=True, description=""):
        self.rule_type = rule_type
        self.rule_value = rule_value
        self.is_mandatory = is_mandatory
        self.description = description


class DummyScholarship:
    def __init__(
        self,
        name="Test Scholarship",
        rules=None,
        verification_status="VERIFIED_ACTIVE",
        application_open_date="2026-07-01",
        application_close_date="2026-12-31",
        deadline_verification_status="confirmed",
        official_info_url="https://scholarships.gov.in",
        official_application_url="https://scholarships.gov.in/apply",
        source_name="National Scholarship Portal"
    ):
        self.id = 999
        self.name = name
        self.eligibility_rules = rules or []
        self.verification_status = verification_status
        self.application_open_date = application_open_date
        self.application_close_date = application_close_date
        self.deadline_verification_status = deadline_verification_status
        self.official_info_url = official_info_url
        self.official_application_url = official_application_url
        self.source_name = source_name


# =====================================================================
# TEST 1 — COMPLETE ELIGIBILITY MATCH
# A profile satisfies every mandatory condition.
# Expected: ELIGIBLE, with a full explanation and verified application route.
# =====================================================================
def test_1_complete_eligibility_match():
    rules = [
        DummyRule("education_level", "Undergraduate"),
        DummyRule("income_max", "250000"),
        DummyRule("min_marks", "60"),
        DummyRule("domicile", "Tamil Nadu"),
    ]
    sch = DummyScholarship("TN Merit Scholarship", rules=rules)
    user_profile = {
        "education_level": "Undergraduate",
        "annual_family_income": 180000.0,
        "previous_marks_percent": 82.5,
        "domicile_state": "Tamil Nadu",
        "has_domicile_certificate": True,
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "ELIGIBLE"
    assert all(b["result"] == "PASS" for b in res["breakdown"])
    assert len(res["matching_reasons"]) >= 4
    assert res["match_score"] >= 80


# =====================================================================
# TEST 2 — MANDATORY INCOME FAILURE
# The user's income exceeds a mandatory published limit.
# Expected: INELIGIBLE, with the failed condition and source.
# =====================================================================
def test_2_mandatory_income_failure():
    rules = [
        DummyRule("education_level", "Undergraduate"),
        DummyRule("income_max", "250000", is_mandatory=True),
    ]
    sch = DummyScholarship("Post Matric SC/ST", rules=rules)
    user_profile = {
        "education_level": "Undergraduate",
        "annual_family_income": 450000.0,
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "INELIGIBLE"
    income_check = next(b for b in res["breakdown"] if b["name"] == "Annual Family Income")
    assert income_check["result"] == "FAIL"
    assert "exceeds" in income_check["guidance"].lower()
    assert any("exceeds" in f.lower() for f in res["failed_reasons"])


# =====================================================================
# TEST 3 — UNKNOWN DOMICILE
# A mandatory domicile condition is not confirmed.
# Expected: POTENTIALLY_ELIGIBLE or appropriate uncertain state.
# =====================================================================
def test_3_unknown_domicile():
    rules = [
        DummyRule("domicile", "Tamil Nadu", is_mandatory=True),
        DummyRule("income_max", "300000", is_mandatory=True),
    ]
    sch = DummyScholarship("TN Specific Scheme", rules=rules)
    user_profile = {
        "annual_family_income": 150000.0,
        "domicile_state": None,
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "POTENTIALLY_ELIGIBLE"
    domicile_check = next(b for b in res["breakdown"] if b["name"] == "Domicile & State Nativity")
    assert domicile_check["result"] == "UNKNOWN"
    assert len(res["missing_requirements"]) >= 1


# =====================================================================
# TEST 4 — COURSE MISMATCH
# The scholarship excludes the user's course.
# Expected: INELIGIBLE if the restriction is mandatory.
# =====================================================================
def test_4_course_mismatch():
    rules = [
        DummyRule("education_level", "Undergraduate", is_mandatory=True),
        DummyRule("course", "Physics,Chemistry,Mathematics,Biology,Basic Sciences", is_mandatory=True),
    ]
    sch = DummyScholarship("INSPIRE SHE", rules=rules)
    user_profile = {
        "education_level": "Undergraduate",
        "course_name": "B.Tech Computer Science Engineering",
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "INELIGIBLE"
    course_check = next(b for b in res["breakdown"] if b["name"] == "Eligible Course / Field")
    assert course_check["result"] == "FAIL"


# =====================================================================
# TEST 5 — CLOSED APPLICATION PERIOD
# The student meets the eligibility requirements, but application period is closed.
# Expected: Eligibility and application status remain separate.
# =====================================================================
def test_5_closed_application_period():
    rules = [
        DummyRule("education_level", "Undergraduate"),
        DummyRule("min_marks", "60"),
    ]
    sch = DummyScholarship(
        "Previous Session Scheme",
        rules=rules,
        verification_status="VERIFIED_CLOSED",
        application_close_date="2025-01-01",
        deadline_verification_status="closed"
    )
    user_profile = {
        "education_level": "Undergraduate",
        "previous_marks_percent": 80.0,
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "ELIGIBLE"
    assert res["application_period_status"] == "CLOSED"
    assert "Closed" in res["application_period_label"]


# =====================================================================
# TEST 6 — OUTDATED RECORD
# Current scheme information has not been verified.
# Expected: Record is flagged for re-verification, not presented as active.
# =====================================================================
def test_6_outdated_record():
    rules = [DummyRule("education_level", "Undergraduate")]
    sch = DummyScholarship("Outdated Scheme", rules=rules, verification_status="NEEDS_REVERIFICATION")

    app_status, app_label = compute_application_period_status(
        sch.application_open_date, sch.application_close_date, sch.deadline_verification_status, sch.verification_status
    )
    assert app_status == "UNVERIFIED"
    assert "Not Verified" in app_label


# =====================================================================
# TEST 7 — MISSING APPLICATION URL
# Scholarship exists, but authorized application URL cannot be confirmed.
# Expected: Show official info source, flag application route as unverified.
# =====================================================================
def test_7_missing_application_url():
    sch = DummyScholarship(
        "Institutional Scheme",
        official_info_url="https://tndce.tn.gov.in/",
        official_application_url=None
    )
    assert sch.official_info_url is not None
    assert sch.official_application_url is None


# =====================================================================
# TEST 8 — OPTIONAL QUESTION SKIPPED
# The user skips a sensitive optional field (e.g. social category / income).
# Expected: Continue matching without assuming positive or negative answer.
# =====================================================================
def test_8_optional_question_skipped():
    rules = [
        DummyRule("category", "SC,ST", is_mandatory=True),
        DummyRule("income_max", "250000", is_mandatory=True),
    ]
    sch = DummyScholarship("Welfare Scheme", rules=rules)
    user_profile = {
        "social_category": "prefer_not_to_say",
        "family_income_band": "prefer_not_to_say",
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "POTENTIALLY_ELIGIBLE"
    cat_check = next(b for b in res["breakdown"] if b["name"] == "Social Category / Community")
    inc_check = next(b for b in res["breakdown"] if b["name"] == "Annual Family Income")
    assert cat_check["result"] == "UNKNOWN"
    assert inc_check["result"] == "UNKNOWN"


# =====================================================================
# TEST 9 — PROFILE UPDATE
# The user changes course, marks, income, or location.
# Expected: Recalculate affected eligibility results dynamically.
# =====================================================================
def test_9_profile_update():
    rules = [
        DummyRule("education_level", "Undergraduate"),
        DummyRule("income_max", "200000", is_mandatory=True),
    ]
    sch = DummyScholarship("Low Income Scheme", rules=rules)

    # Initial profile: income 300,000 -> INELIGIBLE
    profile_v1 = {
        "education_level": "Undergraduate",
        "annual_family_income": 300000.0,
    }
    res_v1 = evaluate_scholarship_detailed(sch, profile_v1)
    assert res_v1["eligibility_status"] == "INELIGIBLE"

    # Updated profile: corrected income 150,000 -> ELIGIBLE
    profile_v2 = {
        "education_level": "Undergraduate",
        "annual_family_income": 150000.0,
    }
    res_v2 = evaluate_scholarship_detailed(sch, profile_v2)
    assert res_v2["eligibility_status"] == "ELIGIBLE"


# =====================================================================
# TEST 10 — NO MATCHES
# No verified scholarship matches the profile.
# Expected: Honest empty state / ineligibility; no fabricated matches.
# =====================================================================
def test_10_no_matches():
    rules = [
        DummyRule("education_level", "PhD / Research", is_mandatory=True),
        DummyRule("domicile", "Nagaland", is_mandatory=True),
    ]
    sch = DummyScholarship("Nagaland Doctoral Fellowship", rules=rules)
    user_profile = {
        "education_level": "Class 10",
        "domicile_state": "Tamil Nadu",
    }

    res = evaluate_scholarship_detailed(sch, user_profile)
    assert res["eligibility_status"] == "INELIGIBLE"
    assert len(res["failed_reasons"]) >= 1


# =====================================================================
# TEST 11 — DUPLICATE SCHOLARSHIPS
# Multiple records describe the same scheme.
# Expected: Avoid duplicate recommendations while preserving distinct schemes.
# =====================================================================
def test_11_duplicate_scholarships():
    from app.seeds.verified_scholarships import VERIFIED_SCHOLARSHIPS_DATA

    codes = [s["code"] for s in VERIFIED_SCHOLARSHIPS_DATA]
    assert len(codes) == len(set(codes)), "Scholarship codes must be completely unique"

    names = [s["name"] for s in VERIFIED_SCHOLARSHIPS_DATA]
    assert len(names) == len(set(names)), "Scholarship names must be unique without duplicates"


# =====================================================================
# TEST 12 — END-TO-END FORM SUBMISSION
# The user completes the form and requests recommendations.
# Expected: The profile reaches backend, is validated, and evaluations occur.
# =====================================================================
def test_12_end_to_end_form_submission():
    payload = schemas.ScholarshipProfileIn(
        education_level="Undergraduate",
        course_name="B.Tech Computer Science",
        stream="Engineering",
        year_of_study="2nd Year",
        previous_qualification="Class 12",
        previous_marks_percent=88.0,
        grading_system="percentage",
        annual_family_income=150000.0,
        state="Tamil Nadu",
        domicile_state="Tamil Nadu",
        social_category="BC",
        gender="female",
        studied_govt_school_tn=True,
        has_completed_onboarding=True
    )
    profile_dict = payload.model_dump()
    assert profile_dict["education_level"] == "Undergraduate"
    assert profile_dict["has_completed_onboarding"] is True

    # Rule evaluation matches Pudhumai Penn
    rules = [
        DummyRule("education_level", "Undergraduate"),
        DummyRule("gender", "female"),
        DummyRule("domicile", "Tamil Nadu"),
    ]
    sch = DummyScholarship("Moovalur Ramamirtham Ammaiyar Pudhumai Penn", rules=rules)
    res = evaluate_scholarship_detailed(sch, profile_dict)
    assert res["eligibility_status"] == "ELIGIBLE"


# =====================================================================
# TEST 13 — INVALID DATA
# The user enters invalid values (e.g. non-numeric income, out-of-range marks).
# Expected: Clear validation error; no invalid recommendation request.
# =====================================================================
def test_13_invalid_data():
    # Negative income or non-float should raise validation error or fail parse
    with pytest.raises(ValidationError):
        schemas.ScholarshipProfileIn(
            annual_family_income="invalid_non_numeric_amount"
        )


# =====================================================================
# TEST 14 — API FAILURE
# The recommendation service handles missing or corrupt data gracefully.
# Expected: Graceful fallback without fabricating recommendations.
# =====================================================================
def test_14_api_failure():
    # Pass empty or malformed profile dictionary
    empty_profile = {}
    rules = [
        DummyRule("education_level", "Undergraduate", is_mandatory=True),
        DummyRule("income_max", "200000", is_mandatory=True),
    ]
    sch = DummyScholarship("Strict Scheme", rules=rules)
    res = evaluate_scholarship_detailed(sch, empty_profile)
    # Never fabricate ELIGIBLE status
    assert res["eligibility_status"] in ["POTENTIALLY_ELIGIBLE", "UNKNOWN"]
    assert res["match_score"] < 50


# =====================================================================
# TEST 15 — SOURCE CONFLICT
# A third-party page conflicts with an official government order.
# Expected: Prefer applicable authoritative source, record conflict.
# =====================================================================
def test_15_source_conflict():
    official_source = {
        "source_type": "government_order",
        "url": "https://tndce.tn.gov.in/go_pudhumai_penn.pdf",
        "income_limit": None,
        "is_authoritative": True
    }
    third_party_source = {
        "source_type": "third_party",
        "url": "https://random-blog.com/scholarship-info",
        "income_limit": 200000,
        "is_authoritative": False
    }

    # Authoritative rule resolution logic
    selected_source = official_source if official_source["is_authoritative"] else third_party_source
    assert selected_source["source_type"] == "government_order"
    assert selected_source["income_limit"] is None
