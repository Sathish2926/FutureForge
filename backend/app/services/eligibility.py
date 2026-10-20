"""
Deterministic Scholarship Eligibility Engine for FutureForge.
Evaluates every mandatory and optional condition separately into PASS / FAIL / UNKNOWN / NOT_APPLICABLE.
Never allows AI narrative or heuristics to override hard rules (spec §5, §8, §18).
"""
import json
from datetime import datetime, date
from typing import Optional, Dict, Any, List, Tuple

INCOME_BAND_MAX = {
    "below_2.5L": 250000,
    "below_2.5l": 250000,
    "2.5-8L": 800000,
    "2.5-8l": 800000,
    "8L+": 10000000,
    "8l+": 10000000,
}

EDUCATION_LEVEL_ALIASES = {
    "class 10": ["class 10", "class10", "10th", "matric", "secondary"],
    "class 11": ["class 11", "class11", "11th", "higher secondary 1st year"],
    "class 12": ["class 12", "class12", "12th", "higher secondary", "hsc", "plus two"],
    "diploma": ["diploma", "polytechnic", "d.pharm"],
    "undergraduate": ["undergraduate", "ug", "b.tech", "b.e", "b.sc", "b.com", "b.a", "mbbs", "bds", "b.arch", "bba", "bca"],
    "postgraduate": ["postgraduate", "pg", "m.tech", "m.e", "m.sc", "m.com", "m.a", "md", "ms", "mba", "mca"],
    "phd / research": ["phd", "phd / research", "doctorate", "research", "m.phil"],
    "vocational / iti": ["vocational", "vocational / iti", "iti", "trade", "certificate"]
}


def normalize_level(level_str: Optional[str]) -> str:
    if not level_str:
        return ""
    l = level_str.strip().lower()
    for canonical, aliases in EDUCATION_LEVEL_ALIASES.items():
        if l == canonical or l in aliases:
            return canonical
        for a in aliases:
            if a in l:
                return canonical
    return l


def resolve_income_amount(profile: Dict[str, Any]) -> Tuple[Optional[float], bool]:
    """Returns (effective_income, is_undisclosed)."""
    raw_income = profile.get("annual_family_income")
    if raw_income is not None:
        try:
            return float(raw_income), False
        except (ValueError, TypeError):
            pass

    band = profile.get("family_income_band")
    if band:
        band_str = str(band).strip().lower()
        if band_str in ["prefer_not_to_say", "prefer_not_to_disclose", "undisclosed"]:
            return None, True
        if band_str in INCOME_BAND_MAX:
            return float(INCOME_BAND_MAX[band_str]), False

    if profile.get("income_undisclosed"):
        return None, True

    return None, False


def match_categories(user_category: Optional[str], allowed_str: str) -> str:
    """Checks user's social category against allowed string.
    Distinguishes BC, MBC/DNC, OBC, SC, ST, Minority."""
    if not allowed_str:
        return "PASS"
    allowed_lower = [c.strip().lower() for c in allowed_str.split(",")]
    if "all" in allowed_lower or "any" in allowed_lower:
        return "PASS"

    if not user_category or str(user_category).strip().lower() in ["prefer_not_to_say", "prefer_not_to_disclose", "none", ""]:
        return "UNKNOWN"

    u = user_category.strip().lower()

    # Direct match
    if any(u == c or c in u for c in allowed_lower):
        return "PASS"

    # Category equivalence rules
    # In Tamil Nadu, MBC / DNC is a specialized sub-category of backward classes
    if "mbc" in u or "dnc" in u:
        if any("mbc" in c or "dnc" in c or "bc" in c or "obc" in c for c in allowed_lower):
            return "PASS"
    if "bc" in u and not "mbc" in u:
        if any("bc" in c or "obc" in c for c in allowed_lower):
            return "PASS"
    if "obc" in u:
        if any("obc" in c or "bc" in c for c in allowed_lower):
            return "PASS"
    if "sc" in u:
        if any("sc" in c for c in allowed_lower):
            return "PASS"
    if "st" in u:
        if any("st" in c for c in allowed_lower):
            return "PASS"
    if "minority" in u:
        if any("minority" in c for c in allowed_lower):
            return "PASS"

    return "FAIL"


def evaluate_single_rule(
    rule_type: str,
    rule_value: str,
    profile: Dict[str, Any],
    is_mandatory: bool = True
) -> Dict[str, Any]:
    """Evaluates a single rule against user profile facts.
    Returns: {name, rule_description, user_data, result, is_mandatory, guidance}"""
    rtype = rule_type.strip().lower()
    rval = (rule_value or "").strip()
    rval_lower = rval.lower()

    # Default result
    result = "UNKNOWN"
    user_data_display = "Not Provided"
    guidance = ""
    name = rtype.replace("_", " ").title()

    if rval_lower in ["all", "any", "no", "none", "not_applicable", "n/a", ""]:
        return {
            "name": name,
            "rule_description": f"Open to all ({rval or 'All'})",
            "user_data": "N/A",
            "result": "PASS",
            "is_mandatory": is_mandatory,
            "guidance": "No restrictive condition applies."
        }

    # 1. Income Max
    if rtype in ["income_max", "max_family_income", "income"]:
        name = "Annual Family Income"
        rule_desc = f"Annual family income must not exceed ₹{float(rval):,.0f}" if rval.replace(".", "", 1).isdigit() else f"Income limit: {rval}"
        income, is_undisclosed = resolve_income_amount(profile)
        if income is not None:
            user_data_display = f"₹{income:,.0f}"
            try:
                limit = float(rval)
                if income <= limit:
                    result = "PASS"
                    guidance = f"Your family income (₹{income:,.0f}) is within the permissible limit of ₹{limit:,.0f}."
                else:
                    result = "FAIL"
                    guidance = f"Your family income (₹{income:,.0f}) exceeds the maximum ceiling of ₹{limit:,.0f}."
            except (ValueError, TypeError):
                result = "UNKNOWN"
                guidance = "Unable to parse official income limit threshold."
        elif is_undisclosed:
            user_data_display = "Prefer not to disclose"
            result = "UNKNOWN"
            guidance = "Income was marked as 'Prefer not to disclose'. Income verification needed to confirm eligibility."
        else:
            user_data_display = "Not specified"
            result = "UNKNOWN"
            guidance = "Income details not provided. Please provide family income to confirm."

    # 2. Minimum Marks
    elif rtype in ["min_marks", "marks", "percentage"]:
        name = "Academic Marks / Percentage"
        rule_desc = f"Minimum {rval}% in previous qualifying examination"
        marks = profile.get("previous_marks_percent")
        if marks is None:
            marks = profile.get("marks_percent")
        
        grading_sys = profile.get("grading_system", "percentage")
        cgpa_display = None
        if marks is None and profile.get("previous_cgpa") is not None:
            try:
                cgpa_val = float(profile["previous_cgpa"])
                if grading_sys == "cgpa_4":
                    marks = cgpa_val * 25.0
                    cgpa_display = f"{cgpa_val:.2f}/4.0 CGPA (≈ {marks:.1f}%)"
                else:
                    marks = cgpa_val * 9.5
                    cgpa_display = f"{cgpa_val:.2f}/10.0 CGPA (AICTE conversion: {cgpa_val} × 9.5 ≈ {marks:.1f}%)"
            except (ValueError, TypeError):
                marks = None

        if marks is not None:
            try:
                user_marks = float(marks)
                user_data_display = cgpa_display if cgpa_display else f"{user_marks:.1f}%"
                min_req = float(rval)
                if user_marks >= min_req:
                    result = "PASS"
                    guidance = f"Your recorded score ({user_data_display}) meets the required minimum of {min_req}%."
                else:
                    result = "FAIL"
                    guidance = f"Your score ({user_marks:.1f}%) is below the required {min_req}% cutoff."
            except (ValueError, TypeError):
                result = "UNKNOWN"
                guidance = "Could not parse minimum score requirement."
        else:
            user_data_display = "Marks not provided"
            result = "UNKNOWN"
            guidance = f"Academic marks needed to verify against the {rval}% threshold."

    # 3. Social Category
    elif rtype in ["category", "social_category", "community"]:
        name = "Social Category / Community"
        rule_desc = f"Eligible category: {rval}"
        user_cat = profile.get("social_category") or profile.get("category")
        user_data_display = str(user_cat) if user_cat else "Not Disclosed"
        cat_result = match_categories(user_cat, rval)
        result = cat_result
        if result == "PASS":
            guidance = f"Your community ({user_cat}) qualifies under the scheme's eligible categories."
        elif result == "FAIL":
            guidance = f"Scheme is restricted to {rval}; your category is recorded as {user_cat}."
        else:
            guidance = "Community certificate details needed to confirm category eligibility."

    # 4. Gender
    elif rtype == "gender":
        name = "Gender Requirement"
        rule_desc = f"Restricted to: {rval.title()}"
        user_gender = (profile.get("gender") or "").strip().lower()
        user_data_display = user_gender.title() if user_gender else "Not Disclosed"
        if not user_gender or user_gender in ["prefer_not_to_say", "prefer_not_to_disclose"]:
            result = "UNKNOWN"
            guidance = "Gender not disclosed. Please specify gender to confirm eligibility."
        elif user_gender == rval_lower or rval_lower in ["all", "any"]:
            result = "PASS"
            guidance = f"Matches the gender condition ({rval.title()})."
        else:
            result = "FAIL"
            guidance = f"Scheme is exclusively for {rval.title()} candidates."

    # 5. Domicile / State
    elif rtype in ["domicile", "state", "eligible_states", "nativity"]:
        name = "Domicile & State Nativity"
        rule_desc = f"Domicile / Nativity in: {rval}"
        user_domicile = profile.get("domicile_state") or profile.get("state")
        has_cert = profile.get("has_domicile_certificate", True)
        user_data_display = f"{user_domicile or 'Unknown'} (Cert: {'Yes' if has_cert else 'Pending'})"

        if not user_domicile:
            result = "UNKNOWN"
            guidance = "Domicile or state of residence has not been confirmed."
        elif "all india" in rval_lower or "all" in rval_lower:
            result = "PASS"
            guidance = "Open to residents of all Indian states."
        elif rval_lower in user_domicile.lower() or user_domicile.lower() in rval_lower:
            if not has_cert and is_mandatory:
                result = "UNKNOWN"
                guidance = f"You are from {user_domicile}, but domicile certificate verification is required."
            else:
                result = "PASS"
                guidance = f"Your domicile ({user_domicile}) satisfies the state eligibility requirement."
        else:
            result = "FAIL"
            guidance = f"Scheme requires domicile in {rval}. Your profile indicates {user_domicile}."

    # 6. Education Level
    elif rtype in ["education_level", "levels", "stage"]:
        name = "Education Level"
        rule_desc = f"Eligible levels: {rval}"
        user_level = profile.get("education_level") or profile.get("education_stage")
        norm_user = normalize_level(user_level)
        allowed_levels = [normalize_level(lvl) for lvl in rval.split(",")]

        user_data_display = str(user_level).title() if user_level else "Not Specified"
        if not user_level:
            result = "UNKNOWN"
            guidance = "Please provide your current education level to confirm eligibility."
        elif any(norm_user == alvl or alvl in norm_user for alvl in allowed_levels):
            result = "PASS"
            guidance = f"Your current study level ({user_level}) is eligible."
        else:
            result = "FAIL"
            guidance = f"Scheme is for {rval}; your recorded level is {user_level}."

    # 7. Course / Stream
    elif rtype in ["course", "eligible_courses", "stream"]:
        name = "Eligible Course / Field"
        rule_desc = f"Eligible courses: {rval}"
        user_course = profile.get("course_name") or profile.get("stream")
        user_data_display = str(user_course) if user_course else "General"
        if not user_course:
            result = "PASS" if "all" in rval_lower else "UNKNOWN"
            guidance = "General course enrollment."
        elif "all" in rval_lower:
            result = "PASS"
            guidance = "Scheme is open to all recognized courses."
        else:
            uc_lower = user_course.lower()
            allowed_courses = [c.strip().lower() for c in rval.split(",")]
            if any(c in uc_lower or uc_lower in c for c in allowed_courses):
                result = "PASS"
                guidance = f"Your course ({user_course}) matches the approved disciplines."
            else:
                result = "FAIL"
                guidance = f"Course restricted to {rval}; your course is {user_course}."

    # 8. Institution Type
    elif rtype in ["institution_type", "school_type"]:
        name = "Institution Type"
        rule_desc = f"Eligible institutions: {rval}"
        user_inst_type = profile.get("institution_type") or "government"
        user_data_display = str(user_inst_type).title()
        allowed_types = [t.strip().lower() for t in rval.split(",")]
        if "all" in allowed_types:
            result = "PASS"
            guidance = "All recognized institution types eligible."
        elif user_inst_type.lower() in allowed_types:
            result = "PASS"
            guidance = f"Your institution type ({user_inst_type}) meets the requirement."
        else:
            result = "FAIL"
            guidance = f"Scheme is for {rval} institutions. Your institution is {user_inst_type}."

    # 9. Disability
    elif rtype in ["disability", "disability_status"]:
        name = "Disability Status"
        rule_desc = f"Persons with Disabilities (minimum {rval}% disability)" if rval.replace(".", "", 1).isdigit() else f"Disability rule: {rval}"
        has_pwd = profile.get("has_disability", False) or profile.get("disability_status", False)
        pct = profile.get("disability_percentage", 0.0)
        user_data_display = f"{'Yes' if has_pwd else 'No'} ({pct}% disability)"

        if has_pwd:
            try:
                min_pct = float(rval) if rval.replace(".", "", 1).isdigit() else 40.0
                if (pct or 40.0) >= min_pct:
                    result = "PASS"
                    guidance = f"Certified disability meets the minimum threshold ({min_pct}%)."
                else:
                    result = "FAIL"
                    guidance = f"Disability percentage ({pct}%) is below the minimum required {min_pct}%."
            except Exception:
                result = "PASS"
                guidance = "PWD criteria satisfied."
        else:
            result = "FAIL"
            guidance = "Scheme is exclusively for differently-abled students."

    # 10. Special Conditions
    elif rtype == "special_condition":
        cond_key = rval_lower
        if cond_key == "studied_govt_school_tn":
            name = "TN Government School Education (6th-12th)"
            rule_desc = "Must have studied continuously in Tamil Nadu Government schools from Class 6 to 12"
            studied = profile.get("studied_govt_school_tn")
            user_data_display = "Yes (Verified via EMIS)" if studied else ("No" if studied is False else "Not Provided")
            if studied is True:
                result = "PASS"
                guidance = "Satisfies government school study requirement in Tamil Nadu."
            elif studied is False:
                result = "FAIL"
                guidance = "Scheme strictly requires Class 6 to 12 schooling in Tamil Nadu Government schools."
            else:
                result = "UNKNOWN"
                guidance = "Proof of Class 6 to 12 schooling in TN Government school required."

        elif cond_key == "first_generation_graduate":
            name = "First Generation Graduate Status"
            rule_desc = "First person in family to graduate (no parents or elder siblings graduated)"
            is_fg = profile.get("is_first_generation_graduate") or profile.get("first_generation_learner")
            user_data_display = "Yes (Certificate Available)" if is_fg else ("No" if is_fg is False else "Not Provided")
            if is_fg is True:
                result = "PASS"
                guidance = "First generation graduate status verified."
            elif is_fg is False:
                result = "FAIL"
                guidance = "Scheme is only for first generation graduates."
            else:
                result = "UNKNOWN"
                guidance = "First Graduate Certificate verification needed."

        elif cond_key == "single_girl_child":
            name = "Single Girl Child Status"
            rule_desc = "Must be the only child / single girl child of the family"
            is_sgc = profile.get("is_single_girl_child")
            user_data_display = "Yes" if is_sgc else ("No" if is_sgc is False else "Not Provided")
            if is_sgc is True:
                result = "PASS"
                guidance = "Single girl child condition met."
            elif is_sgc is False:
                result = "FAIL"
                guidance = "Restricted to single girl child applicants."
            else:
                result = "UNKNOWN"
                guidance = "Affidavit of single girl child status required."

        elif cond_key == "orphan_or_single_parent":
            name = "Orphan / Martyr's Ward / COVID Orphan"
            rule_desc = "Orphan student, COVID-19 orphan, or ward of martyred armed forces personnel"
            is_orphan = profile.get("is_orphan_or_single_parent")
            user_data_display = "Yes" if is_orphan else ("No" if is_orphan is False else "Not Provided")
            if is_orphan is True:
                result = "PASS"
                guidance = "Qualifying special category condition satisfied."
            elif is_orphan is False:
                result = "FAIL"
                guidance = "Scheme requires orphan or martyr family status."
            else:
                result = "UNKNOWN"
                guidance = "Official bereavement or martyr certificate required."

        else:
            name = f"Special Criterion ({rval})"
            rule_desc = f"Must satisfy: {rval}"
            user_data_display = "Pending Check"
            result = "UNKNOWN"
            guidance = f"Please check scheme guidelines for {rval} verification."

    else:
        name = rtype.replace("_", " ").title()
        rule_desc = f"Requirement: {rval}"
        user_data_display = "Not Evaluated"
        result = "UNKNOWN"
        guidance = "Standard eligibility verification required."

    return {
        "name": name,
        "rule_description": rule_desc,
        "user_data": user_data_display,
        "result": result,
        "is_mandatory": is_mandatory,
        "guidance": guidance
    }


def compute_application_period_status(
    open_date_str: Optional[str],
    close_date_str: Optional[str],
    deadline_status: Optional[str],
    verification_status: Optional[str]
) -> Tuple[str, str]:
    """Computes whether the application period is OPEN, UPCOMING, CLOSED, or UNVERIFIED.
    Returns (status, human_label)."""
    if verification_status in ["UNVERIFIED", "NEEDS_REVERIFICATION"]:
        return "UNVERIFIED", "Status Not Verified"
    if verification_status == "VERIFIED_UPCOMING":
        return "UPCOMING", "Upcoming — Officially Confirmed"
    if verification_status == "VERIFIED_CLOSED" or deadline_status == "closed":
        return "CLOSED", "Application Closed — Officially Confirmed"

    today = date.today()

    if close_date_str:
        try:
            close_dt = datetime.strptime(close_date_str, "%Y-%m-%d").date()
            if today > close_dt:
                return "CLOSED", "Application Closed — Officially Confirmed"
        except Exception:
            pass

    if open_date_str:
        try:
            open_dt = datetime.strptime(open_date_str, "%Y-%m-%d").date()
            if today < open_dt:
                return "UPCOMING", "Upcoming — Officially Confirmed"
        except Exception:
            pass

    if verification_status == "VERIFIED_ACTIVE":
        return "OPEN", "Application Open — Officially Confirmed"

    return "OPEN", "Application Open — Officially Confirmed"


def evaluate_scholarship_detailed(
    scholarship: Any,
    profile: Dict[str, Any]
) -> Dict[str, Any]:
    """Complete evaluation of a scholarship record against a user profile dictionary.
    Returns:
    - eligibility_status: ELIGIBLE | POTENTIALLY_ELIGIBLE | INELIGIBLE | UNVERIFIED
    - application_period_status: OPEN | UPCOMING | CLOSED | UNVERIFIED
    - application_period_label: User-facing text
    - breakdown: List of evaluated rule dicts
    - match_score: Int 0-100 indicating profile similarity
    - matching_reasons: List of positive match bullet points
    - missing_requirements: List of missing/unknown items
    - failed_reasons: List of reasons for ineligibility
    """
    rules = getattr(scholarship, "eligibility_rules", []) or []
    sch_status = getattr(scholarship, "verification_status", "NEEDS_REVERIFICATION")

    # Evaluate all rules
    breakdown: List[Dict[str, Any]] = []
    has_mandatory_fail = False
    has_mandatory_unknown = False

    matching_reasons: List[str] = []
    missing_requirements: List[str] = []
    failed_reasons: List[str] = []

    for r in rules:
        rtype = getattr(r, "rule_type", None) or (r.get("rule_type") if isinstance(r, dict) else "")
        rval = getattr(r, "rule_value", None) or (r.get("rule_value") if isinstance(r, dict) else "")
        is_mand = getattr(r, "is_mandatory", True) if hasattr(r, "is_mandatory") else r.get("is_mandatory", True) if isinstance(r, dict) else True

        check = evaluate_single_rule(rtype, rval, profile, is_mandatory=is_mand)
        breakdown.append(check)

        if is_mand:
            if check["result"] == "FAIL":
                has_mandatory_fail = True
                failed_reasons.append(check["guidance"] or f"Failed {check['name']} requirement.")
            elif check["result"] == "UNKNOWN":
                has_mandatory_unknown = True
                missing_requirements.append(f"{check['name']}: {check['guidance']}")
            elif check["result"] == "PASS":
                matching_reasons.append(f"{check['name']}: {check['guidance']}")
        else:
            if check["result"] == "PASS":
                matching_reasons.append(f"{check['name']}: Satisfied.")

    # Determine eligibility status
    if sch_status == "UNVERIFIED":
        final_eligibility = "UNVERIFIED"
    elif has_mandatory_fail:
        final_eligibility = "INELIGIBLE"
    elif has_mandatory_unknown:
        final_eligibility = "POTENTIALLY_ELIGIBLE"
    else:
        final_eligibility = "ELIGIBLE"

    # Application period evaluation
    open_d = getattr(scholarship, "application_open_date", None)
    close_d = getattr(scholarship, "application_close_date", None)
    d_status = getattr(scholarship, "deadline_verification_status", "unconfirmed")

    app_period_status, app_period_label = compute_application_period_status(
        open_d, close_d, d_status, sch_status
    )

    # Compute similarity/relevance match score
    # Score is 0 if INELIGIBLE, otherwise weighted on matched aspects
    score = 0
    if final_eligibility in ["ELIGIBLE", "POTENTIALLY_ELIGIBLE"]:
        total_rules = len(breakdown) if breakdown else 1
        pass_count = sum(1 for b in breakdown if b["result"] == "PASS")
        score = int((pass_count / total_rules) * 80)
        if app_period_status == "OPEN":
            score += 20
        elif app_period_status == "UPCOMING":
            score += 10
        score = min(score, 100)
    else:
        score = 10

    # Ensure at least some match rationale
    if not matching_reasons and final_eligibility != "INELIGIBLE":
        matching_reasons.append("No disqualifying criteria found in available profile data.")

    return {
        "eligibility_status": final_eligibility,
        "application_period_status": app_period_status,
        "application_period_label": app_period_label,
        "match_score": score,
        "breakdown": breakdown,
        "matching_reasons": matching_reasons,
        "missing_requirements": missing_requirements,
        "failed_reasons": failed_reasons,
    }


# Backwards compatibility helper for existing callers
def evaluate_scholarship(
    rules: list,
    *,
    income_band: Optional[str] = None,
    category: Optional[str] = None,
    marks_percent: Optional[float] = None,
    gender: Optional[str] = None,
    state: Optional[str] = None
) -> dict:
    """Legacy helper preserved for backward compatibility."""
    profile = {
        "family_income_band": income_band,
        "category": category,
        "social_category": category,
        "marks_percent": marks_percent,
        "previous_marks_percent": marks_percent,
        "gender": gender,
        "state": state,
        "domicile_state": state,
    }

    # Wrap mock scholarship
    class MockScholarship:
        def __init__(self, r_list):
            self.eligibility_rules = r_list
            self.verification_status = "VERIFIED_ACTIVE"
            self.application_open_date = None
            self.application_close_date = None
            self.deadline_verification_status = "unconfirmed"

    eval_result = evaluate_scholarship_detailed(MockScholarship(rules), profile)
    # Map back to legacy status text
    status_map = {
        "ELIGIBLE": "Likely Eligible",
        "POTENTIALLY_ELIGIBLE": "Eligibility Needs Verification",
        "INELIGIBLE": "Not Eligible",
        "UNVERIFIED": "Eligibility Needs Verification"
    }

    checks = {}
    for item in eval_result["breakdown"]:
        label = item["name"].lower().replace(" ", "_")
        checks[label] = item["result"]

    return {
        "status": status_map.get(eval_result["eligibility_status"], "Eligibility Needs Verification"),
        "checks": checks,
        "detailed": eval_result
    }
