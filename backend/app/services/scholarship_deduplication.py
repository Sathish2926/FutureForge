"""
Deduplication and enrichment script for the Scholarship database.
Ensures that duplicate representations of the same government or private scheme
are merged into canonical records, satisfying Case 12.
"""
import json
import logging
from datetime import datetime
from sqlalchemy.orm import Session
from app import models
from app.database import engine, SessionLocal
from app.seeds.verified_scholarships import VERIFIED_SCHOLARSHIPS_DATA

logger = logging.getLogger("scholarship_deduplication")

# Canonical aliases to match existing names with verified codes
NAME_ALIASES = {
    "moovalur ramamirtham": "TN_PUDHUMAI_PENN",
    "pudhumai penn": "TN_PUDHUMAI_PENN",
    "tamil pudhalvan": "TN_TAMIL_PUDHALVAN",
    "post-matric scholarship scheme for sc / st / scc": "TN_POST_MATRIC_SC_ST",
    "post matric scholarship for sc students": "TN_POST_MATRIC_SC_ST",
    "post-matric scholarship for bc, mbc and dnc": "TN_BC_MBC_POST_MATRIC",
    "first graduate tuition fee concession": "TN_FIRST_GRADUATE_CONCESSION",
    "aicte pragati": "AICTE_PRAGATI",
    "aicte saksham": "AICTE_SAKSHAM",
    "aicte swanath": "AICTE_SWANATH",
    "central sector scheme of scholarship": "CENTRAL_CSSS_HIGHER_ED",
    "national means-cum-merit": "CENTRAL_NMMSS",
    "inspire scholarship for higher education": "DST_INSPIRE_SHE",
    "minority": "CENTRAL_MINORITY_POST_MATRIC"
}

# Enrichment details for other genuine schemes in the database
OTHER_SCHEMES_ENRICHMENT = {
    "Reliance Foundation Undergraduate Scholarship": {
        "code": "CORP_RELIANCE_UG",
        "provider_category": "corporate_csr",
        "description": "Reliance Foundation Undergraduate Scholarship aims to support meritorious students from all streams of higher education with priority for economically weaker backgrounds.",
        "geographic_coverage": "all_india",
        "eligible_states": "ALL",
        "education_levels": "Undergraduate",
        "eligible_courses": "all",
        "institution_types": "all",
        "max_family_income": 1500000.0,
        "min_marks_percent": 60.0,
        "benefit_amount_inr": 200000.0,
        "benefit_description": "Up to ₹2,00,000 over the course of the degree program",
        "benefit_type": "annual_scholarship",
        "benefit_duration": "Duration of undergraduate degree",
        "official_info_url": "https://www.scholarships.reliancefoundation.org/",
        "official_application_url": "https://www.scholarships.reliancefoundation.org/",
        "application_portal_name": "Reliance Foundation Scholarships Portal",
        "source_name": "Reliance Foundation Official Portal",
        "verification_status": "VERIFIED_ACTIVE",
        "deadline_verification_status": "confirmed",
        "application_open_date": "2026-08-01",
        "application_close_date": "2026-10-15",
        "required_documents": json.dumps([
            {"name": "Class 12 Marksheet", "mandatory": True, "confirmed": True, "description": "Minimum 60% aggregate"},
            {"name": "Family Income Proof", "mandatory": True, "confirmed": True, "description": "ITR / Salary slip / Tehsildar income certificate"},
            {"name": "College Admission Bonafide / Fee Receipt", "mandatory": True, "confirmed": True, "description": "Proof of full-time UG enrolment"},
            {"name": "Aadhaar Card", "mandatory": True, "confirmed": True, "description": "Government identity proof"}
        ]),
        "application_steps": json.dumps([
            {"step_number": 1, "title": "Online Aptitude Test", "instruction": "Register and complete the mandatory online proctored aptitude test.", "is_mandatory": True},
            {"step_number": 2, "title": "Submit Documents", "instruction": "Upload marksheet, income certificate, and bonafide.", "is_mandatory": True},
            {"step_number": 3, "title": "Selection & Award", "instruction": "Results published based on aptitude score and socioeconomic indicators.", "is_mandatory": True}
        ]),
        "rules": [
            {"rule_type": "min_marks", "rule_value": "60", "is_mandatory": True, "description": "Minimum 60% in Class 12"},
            {"rule_type": "income_max", "rule_value": "1500000", "is_mandatory": True, "description": "Household income up to ₹15 Lakhs (preference <= ₹2.5L)"},
            {"rule_type": "education_level", "rule_value": "Undergraduate", "is_mandatory": True, "description": "Full-time UG degree"}
        ]
    },
    "HDFC Bank Parivartan's ECSS Programme (Educational Crisis Scholarship Scheme)": {
        "code": "CORP_HDFC_ECSS",
        "provider_category": "corporate_csr",
        "description": "Financial assistance program for meritorious students from underprivileged backgrounds facing personal or economic crisis to continue their schooling and higher education.",
        "geographic_coverage": "all_india",
        "eligible_states": "ALL",
        "education_levels": "Class 10,Class 11,Class 12,Diploma,Undergraduate,Postgraduate",
        "eligible_courses": "all",
        "institution_types": "all",
        "max_family_income": 250000.0,
        "min_marks_percent": 55.0,
        "benefit_amount_inr": 75000.0,
        "benefit_description": "Up to ₹75,000 depending on course and fee structure",
        "benefit_type": "annual_scholarship",
        "benefit_duration": "1 year (renewable)",
        "official_info_url": "https://www.hdfcbank.com/",
        "official_application_url": "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
        "application_portal_name": "HDFC Parivartan Portal (via Authorized Partner)",
        "source_name": "HDFC Bank Parivartan CSR Notification",
        "verification_status": "VERIFIED_ACTIVE",
        "deadline_verification_status": "confirmed",
        "application_open_date": "2026-06-01",
        "application_close_date": "2026-10-31",
        "required_documents": json.dumps([
            {"name": "Previous Qualifying Marksheet", "mandatory": True, "confirmed": True, "description": "Minimum 55% marks"},
            {"name": "Family Income Proof", "mandatory": True, "confirmed": True, "description": "Salary slip / ITR / Income Certificate <= ₹2.5L"},
            {"name": "Proof of Crisis / Need", "mandatory": False, "confirmed": True, "description": "Medical bills / death certificate / job loss proof if applicable"},
            {"name": "Admission Receipt & Student ID", "mandatory": True, "confirmed": True, "description": "Proof of current year enrollment"}
        ]),
        "application_steps": json.dumps([
            {"step_number": 1, "title": "Check Eligibility", "instruction": "Ensure family income is under ₹2.5 Lakhs and previous score >= 55%.", "is_mandatory": True},
            {"step_number": 2, "title": "Online Application", "instruction": "Fill personal and educational details and upload required proofs.", "is_mandatory": True},
            {"step_number": 3, "title": "Document Verification", "instruction": "Shortlisted candidates undergo telephonic/document verification.", "is_mandatory": True}
        ]),
        "rules": [
            {"rule_type": "income_max", "rule_value": "250000", "is_mandatory": True, "description": "Family income not exceeding ₹2.5 Lakhs"},
            {"rule_type": "min_marks", "rule_value": "55", "is_mandatory": True, "description": "Minimum 55% marks in previous year"}
        ]
    },
    "Kotak Kanya Scholarship (Kotak Education Foundation)": {
        "code": "CORP_KOTAK_KANYA",
        "provider_category": "foundation",
        "description": "Financial assistance to meritorious girl students from underprivileged families who have secured admission to 1st year professional graduation courses (Engineering, MBBS, Architecture, Design, Integrated Law).",
        "geographic_coverage": "all_india",
        "eligible_states": "ALL",
        "education_levels": "Undergraduate",
        "eligible_courses": "Engineering,Medicine,Law,Architecture,Design,Professional",
        "institution_types": "all",
        "gender_restriction": "female",
        "max_family_income": 600000.0,
        "min_marks_percent": 85.0,
        "benefit_amount_inr": 150000.0,
        "benefit_description": "₹1,50,000 per year until completion of the professional degree",
        "benefit_type": "annual_scholarship",
        "benefit_duration": "4 to 5 years (Full course duration)",
        "official_info_url": "https://kotakeducation.org/",
        "official_application_url": "https://kotakeducation.org/kotak-kanya-scholarship/",
        "application_portal_name": "Kotak Education Foundation Portal",
        "source_name": "Kotak Education Foundation Official Notification",
        "verification_status": "VERIFIED_ACTIVE",
        "deadline_verification_status": "confirmed",
        "application_open_date": "2026-07-01",
        "application_close_date": "2026-10-31",
        "required_documents": json.dumps([
            {"name": "Class 12 Marksheet", "mandatory": True, "confirmed": True, "description": "Scored >= 85% in Class 12 board exams"},
            {"name": "Entrance Exam Scorecard / Rank Card", "mandatory": True, "confirmed": True, "description": "NEET / JEE / CLAT score proof"},
            {"name": "College Admission Allotment Letter", "mandatory": True, "confirmed": True, "description": "Professional degree seat allotment"},
            {"name": "Income Certificate", "mandatory": True, "confirmed": True, "description": "Income <= ₹6 Lakhs"},
            {"name": "Aadhaar Card", "mandatory": True, "confirmed": True, "description": "Identity verification"}
        ]),
        "application_steps": json.dumps([
            {"step_number": 1, "title": "Register on Portal", "instruction": "Submit application online with Class 12 and entrance exam scores.", "is_mandatory": True},
            {"step_number": 2, "title": "Interview", "instruction": "Telephonic and video interview of shortlisted candidates.", "is_mandatory": True},
            {"step_number": 3, "title": "Sanction & Mentorship", "instruction": "Scholarship awarded alongside academic mentorship.", "is_mandatory": True}
        ]),
        "rules": [
            {"rule_type": "gender", "rule_value": "female", "is_mandatory": True, "description": "Exclusively for female students"},
            {"rule_type": "min_marks", "rule_value": "85", "is_mandatory": True, "description": "Minimum 85% marks in Class 12"},
            {"rule_type": "income_max", "rule_value": "600000", "is_mandatory": True, "description": "Annual family income not exceeding ₹6,00,000"},
            {"rule_type": "education_level", "rule_value": "Undergraduate", "is_mandatory": True, "description": "Enrolled in 1st year professional degree"}
        ]
    }
}


def deduplicate_and_enrich_scholarships(db: Session):
    """
    Finds and merges duplicate schemes.
    Keeps canonical verified records and enriches other genuine records.
    """
    all_schs = db.query(models.Scholarship).all()
    logger.info("Total scholarships before deduplication: %d", len(all_schs))

    # Map verified records by code
    verified_by_code = {}
    for s in all_schs:
        if s.code:
            verified_by_code[s.code] = s

    # Check older records (ones without code)
    to_delete = []

    for s in all_schs:
        if s.code:
            continue # Already canonical

        s_name_lower = s.name.lower()
        matched_code = None

        for alias, code in NAME_ALIASES.items():
            if alias in s_name_lower:
                matched_code = code
                break

        if matched_code and matched_code in verified_by_code:
            canonical = verified_by_code[matched_code]
            # Transfer any saved scholarships from older duplicate to canonical
            saved_refs = db.query(models.SavedScholarship).filter_by(scholarship_id=s.id).all()
            for sr in saved_refs:
                already_saved = db.query(models.SavedScholarship).filter_by(
                    user_id=sr.user_id, scholarship_id=canonical.id
                ).first()
                if not already_saved:
                    sr.scholarship_id = canonical.id
                else:
                    db.delete(sr)

            to_delete.append(s)
            logger.info("Marked duplicate for removal: id=%d name='%s' (merged into code=%s)", s.id, s.name, matched_code)
        else:
            # Check if this other genuine scholarship has enrichment data
            for match_name, enrich in OTHER_SCHEMES_ENRICHMENT.items():
                if match_name.lower() in s_name_lower or s_name_lower in match_name.lower():
                    s.code = enrich["code"]
                    s.provider_category = enrich.get("provider_category", s.provider_category)
                    s.description = enrich.get("description", s.description)
                    s.geographic_coverage = enrich.get("geographic_coverage", s.geographic_coverage)
                    s.eligible_states = enrich.get("eligible_states", s.eligible_states)
                    s.education_levels = enrich.get("education_levels", s.education_levels)
                    s.eligible_courses = enrich.get("eligible_courses", s.eligible_courses)
                    s.institution_types = enrich.get("institution_types", s.institution_types)
                    s.min_marks_percent = enrich.get("min_marks_percent", s.min_marks_percent)
                    s.max_family_income = enrich.get("max_family_income", s.max_family_income)
                    s.benefit_amount_inr = enrich.get("benefit_amount_inr", s.benefit_amount_inr)
                    s.benefit_description = enrich.get("benefit_description", s.benefit_description)
                    s.benefit_type = enrich.get("benefit_type", s.benefit_type)
                    s.benefit_duration = enrich.get("benefit_duration", s.benefit_duration)
                    s.gender_restriction = enrich.get("gender_restriction", s.gender_restriction or "all")
                    s.official_info_url = enrich.get("official_info_url", s.official_info_url)
                    s.official_application_url = enrich.get("official_application_url", s.official_application_url)
                    s.application_portal_name = enrich.get("application_portal_name", s.application_portal_name)
                    s.source_name = enrich.get("source_name", s.source_name)
                    s.verification_status = enrich.get("verification_status", s.verification_status)
                    s.deadline_verification_status = enrich.get("deadline_verification_status", "confirmed")
                    s.application_open_date = enrich.get("application_open_date")
                    s.application_close_date = enrich.get("application_close_date")
                    s.required_documents = enrich.get("required_documents")
                    s.application_steps = enrich.get("application_steps")
                    s.last_verified = datetime.utcnow()

                    if enrich.get("rules"):
                        existing_rules = {(r.rule_type, r.rule_value) for r in s.eligibility_rules}
                        for r in enrich["rules"]:
                            if (r["rule_type"], r["rule_value"]) not in existing_rules:
                                db.add(models.ScholarshipEligibilityRule(
                                    scholarship_id=s.id,
                                    rule_type=r["rule_type"],
                                    rule_value=r["rule_value"],
                                    is_mandatory=r.get("is_mandatory", True),
                                    description=r.get("description", "")
                                ))
                    break

    for d in to_delete:
        db.delete(d)

    db.commit()
    remaining = db.query(models.Scholarship).count()
    logger.info("Deduplication complete. Remaining unique scholarships: %d", remaining)


if __name__ == "__main__":
    db = SessionLocal()
    deduplicate_and_enrich_scholarships(db)
    db.close()
    print("Deduplication executed successfully.")
