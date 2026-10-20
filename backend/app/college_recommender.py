"""
Deterministic College Recommendation Engine for CareerPath AI.
Calculates multi-factor weighted match scores prioritizing course alignment, budget affordability,
location preference, and desired placement CTC (Average Package in LPA).
"""
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session, joinedload, selectinload
from . import models

DEFAULT_RECOMMENDATION_WEIGHTS = {
    "course_domain_match": 0.35,
    "budget_fit": 0.15,
    "placement_ctc_fit": 0.25,
    "location_fit": 0.15,
    "roi_score": 0.04,
    "college_quality": 0.03,
    "preferences": 0.03,
}

DOMAIN_EXACT_MAP = {
    "engineering & technology": {
        "groups": ["engineering & technology"],
        "types": ["ENGINEERING_TECHNOLOGY"],
        "course_keywords": [
            "b.tech", "b.e", "m.tech", "engineering", "computer", "electronics", "mechanical",
            "civil", "information technology", "electrical", "chemical", "robotics", "artificial intelligence", "data science"
        ]
    },
    "management & business": {
        "groups": ["management & business", "management"],
        "types": ["MANAGEMENT"],
        "course_keywords": [
            "mba", "bba", "pgdm", "management", "business administration", "finance", "marketing",
            "human resource", "logistics", "operations"
        ]
    },
    "medicine & healthcare": {
        "groups": ["medicine & healthcare", "medical", "dental", "pharmacy"],
        "types": ["MEDICAL", "DENTAL", "PHARMACY"],
        "course_keywords": [
            "mbbs", "bds", "b.pharm", "m.pharm", "pharm.d", "pharmacy", "nursing", "physiotherapy",
            "allied health", "bams", "bhms", "medicine", "dental", "md -", "ms -"
        ]
    },
    "pharmacy": {
        "groups": ["pharmacy"],
        "types": ["PHARMACY"],
        "course_keywords": [
            "b.pharm", "m.pharm", "pharm.d", "pharmacy", "pharmaceutical", "pharmacology", "pharmaceutics"
        ]
    },
    "dental & oral health": {
        "groups": ["dental", "dental & oral health"],
        "types": ["DENTAL"],
        "course_keywords": [
            "bds", "mds", "dental", "dentistry", "oral surgery", "oral pathology", "prosthodontics", "periodontics"
        ]
    },
    "law & legal studies": {
        "groups": ["law & legal studies", "law"],
        "types": ["LAW"],
        "course_keywords": [
            "llb", "ba llb", "bba llb", "llm", "law", "legal studies", "jurisprudence"
        ]
    },
    "agriculture & life sciences": {
        "groups": ["agriculture & life sciences", "agriculture"],
        "types": ["AGRICULTURE"],
        "course_keywords": [
            "agriculture", "horticulture", "forestry", "veterinary", "agri", "b.sc agriculture", "fisheries", "food technology"
        ]
    },
    "architecture & design": {
        "groups": ["architecture & design", "architecture & planning", "architecture"],
        "types": ["ARCHITECTURE_PLANNING"],
        "course_keywords": [
            "b.arch", "m.arch", "architecture", "interior design", "urban planning", "planning", "product design"
        ]
    },
    "arts & science / general": {
        "groups": ["arts & science / general", "arts & science", "arts_science"],
        "types": ["ARTS_SCIENCE"],
        "course_keywords": [
            "b.sc", "b.a", "b.com", "bca", "humanities", "economics", "physics", "chemistry", "mathematics",
            "english", "commerce", "history", "political science"
        ]
    },
    "education & teaching": {
        "groups": ["education & teaching", "education"],
        "types": ["EDUCATION"],
        "course_keywords": [
            "b.ed", "m.ed", "education", "teaching", "pedagogy", "elementary education"
        ]
    },
    "pure science & research": {
        "groups": ["pure science & research", "pure science"],
        "types": ["PURE_SCIENCE_RESEARCH"],
        "course_keywords": [
            "pure science", "physics", "chemistry", "mathematics", "biology", "research", "m.sc", "integrated m.sc", "iiser"
        ]
    },
    "multidisciplinary university": {
        "groups": ["multidisciplinary university"],
        "types": ["MULTIDISCIPLINARY_UNIVERSITY"],
        "course_keywords": []
    }
}


def check_domain_match(
    college: models.College,
    detail: Optional[models.CollegeDetail],
    target_domain: str,
    desired_course: str = ""
) -> tuple[bool, float]:
    """
    Checks whether a college matches the user's selected domain and course.
    Returns (is_match: bool, score: float).
    """
    if not target_domain or target_domain in ("any", "all", "all domains", "no preference", ""):
        return True, 90.0

    td = target_domain.strip().lower()
    mapping = DOMAIN_EXACT_MAP.get(td)
    if not mapping:
        for k, v in DOMAIN_EXACT_MAP.items():
            if k in td or td in k:
                mapping = v
                break
    if not mapping:
        return True, 85.0

    col_domain = (detail.domain_group if detail and detail.domain_group else "").strip().lower()
    col_name = (college.name or "").strip().lower()
    branches = [p.branch.lower() for p in college.programs] if college.programs else []
    course_names = [cc.course.name.lower() for cc in college.courses if cc.course] if college.courses else []
    all_programs = f"{(detail.course_family or '').lower()} {' '.join(branches)} {' '.join(course_names)}"

    # 1. Direct group match in primary domain groups
    if any(g in col_domain or col_domain in g for g in mapping["groups"]):
        if desired_course:
            dc = desired_course.strip().lower()
            if dc in all_programs or dc in col_name or any(dc in b for b in branches):
                return True, 100.0
            return True, 75.0
        return True, 95.0

    # 2. Multidisciplinary University matching courses
    if "multidisciplinary" in col_domain:
        if desired_course:
            dc = desired_course.strip().lower()
            if dc in all_programs or dc in col_name or any(dc in b for b in branches):
                return True, 95.0
            return False, 0.0
        if any(kw in all_programs for kw in mapping["course_keywords"]):
            return True, 85.0
        return False, 0.0

    # 3. Direct course match if course is specified and found in programs
    if desired_course:
        dc = desired_course.strip().lower()
        if dc in all_programs or dc in col_name:
            return True, 90.0

    return False, 0.0


def score_college(
    college: models.College,
    student_profile: Dict[str, Any],
    weights: Dict[str, float] = DEFAULT_RECOMMENDATION_WEIGHTS
) -> Dict[str, Any]:
    detail: Optional[models.CollegeDetail] = college.details

    # Extract student profile parameters
    raw_desired_course = (student_profile.get("desired_course") or "").strip()
    desired_course = raw_desired_course.lower()
    if desired_course in ("any", "all", "all branches", "any course", "no preference", "all programs", "none"):
        desired_course = ""

    domain = (student_profile.get("domain") or "").strip().lower()

    # Desired Placement Average CTC (LPA) - Optional filter
    desired_ctc = student_profile.get("desired_ctc") or student_profile.get("placement_average_ctc") or student_profile.get("target_ctc")
    if desired_ctc in ("any", "all", "no_preference", "none", "", 0, "0"):
        desired_ctc = None
    elif desired_ctc is not None:
        try:
            desired_ctc = float(desired_ctc)
            if desired_ctc <= 0:
                desired_ctc = None
        except (ValueError, TypeError):
            desired_ctc = None

    preferred_state = (student_profile.get("preferred_state") or "").strip().lower()
    if preferred_state in ("all india", "all", "any", "no preference", "none", ""):
        preferred_state = ""

    preferred_city = (student_profile.get("preferred_city") or "").strip().lower()
    
    annual_budget = student_profile.get("annual_budget")
    if annual_budget is not None:
        try:
            annual_budget = float(annual_budget)
        except (ValueError, TypeError):
            annual_budget = None

    govt_private_pref = (student_profile.get("government_private_preference") or "no_preference").strip().lower()
    hostel_req = student_profile.get("hostel_required", False)

    # 1. Course / Domain Match Score (0 - 100)
    is_domain_match, domain_score = check_domain_match(college, detail, domain, desired_course)
    matched_course_name = "All Programs / Any Branch"

    if desired_course and is_domain_match:
        matched_course_name = raw_desired_course
    elif college.courses and college.courses[0].course:
        matched_course_name = college.courses[0].course.name
    else:
        matched_course_name = "All Programs / Any Branch"

    # 2. Budget Fit Score & Status
    annual_fee = detail.annual_fee_max_inr if detail and detail.annual_fee_max_inr else (college.courses[0].annual_fees_inr if college.courses and college.courses[0].annual_fees_inr else 60000)
    total_annual_cost = detail.estimated_total_annual_cost_inr if detail and detail.estimated_total_annual_cost_inr else annual_fee

    budget_score = 85.0
    budget_fit_status = "Within Budget"

    if annual_budget and annual_budget > 0:
        cost_to_compare = total_annual_cost if total_annual_cost else annual_fee
        if cost_to_compare <= 0.85 * annual_budget:
            budget_score = 100.0
            budget_fit_status = "Within Budget"
        elif cost_to_compare <= 1.0 * annual_budget:
            budget_score = 92.0
            budget_fit_status = "Within Budget"
        elif cost_to_compare <= 1.25 * annual_budget:
            budget_score = 60.0
            budget_fit_status = "Stretch"
        else:
            budget_score = 25.0
            budget_fit_status = "Over Budget"

    # 3. Placement Strength & Desired CTC Fit (0 - 100)
    placement_rate = detail.placement_rate_pct_est if detail and detail.placement_rate_pct_est is not None else 65.0
    avg_pkg = detail.avg_package_lpa if detail and detail.avg_package_lpa is not None else 4.0

    ctc_deficiency_penalty = 0.0
    if desired_ctc and desired_ctc > 0:
        ratio = avg_pkg / desired_ctc
        if avg_pkg >= desired_ctc:
            ctc_score = min(100.0, 90.0 + (ratio - 1.0) * 15.0)
            ctc_fit_status = "Exceeds Target CTC" if avg_pkg >= desired_ctc * 1.2 else "Target CTC Met"
        elif ratio >= 0.85:
            ctc_score = 75.0
            ctc_fit_status = "Near Target CTC"
            ctc_deficiency_penalty = 5.0
        elif ratio >= 0.70:
            ctc_score = 50.0
            ctc_fit_status = "Moderate Fit"
            ctc_deficiency_penalty = 15.0
        elif ratio >= 0.50:
            ctc_score = 25.0
            ctc_fit_status = "Below Target CTC"
            ctc_deficiency_penalty = 25.0
        else:
            ctc_score = max(5.0, ratio * 25.0)
            ctc_fit_status = "Below Target CTC"
            ctc_deficiency_penalty = 35.0
        
        placement_score = min(100.0, max(5.0, (ctc_score * 0.80) + (placement_rate * 0.20)))
    else:
        ctc_fit_status = f"₹{avg_pkg:.1f} LPA Avg" if avg_pkg else "Standard CTC"
        placement_score = min(100.0, (placement_rate * 0.35) + min(65.0, avg_pkg * 5.0))

    # 4. Location Fit Score
    col_state = (college.state or "").strip().lower()
    col_city = (college.city or "").strip().lower()

    location_score = 80.0
    is_location_match = False

    if preferred_state and col_state and (preferred_state in col_state or col_state in preferred_state):
        location_score = 100.0
        is_location_match = True
    elif preferred_city and col_city and (preferred_city in col_city or col_city in preferred_city):
        location_score = 100.0
        is_location_match = True
    elif preferred_state:
        location_score = 15.0
        is_location_match = False
    else:
        location_score = 85.0
        is_location_match = True

    # 5. ROI Score
    roi_score_val = min(100.0, float(detail.estimated_roi_score)) if detail and detail.estimated_roi_score is not None else 70.0

    # 6. College Quality Score
    nirf_rank = detail.nirf_rank_seeded if detail and detail.nirf_rank_seeded else 9999
    rating = detail.rating_seeded if detail and detail.rating_seeded else 7.0

    if nirf_rank <= 50:
        quality_score = 100.0
    elif nirf_rank <= 100:
        quality_score = 90.0
    elif nirf_rank <= 200:
        quality_score = 80.0
    else:
        quality_score = min(100.0, rating * 10.0)

    # 7. Preferences Score
    pref_score = 50.0
    inst_type = (college.institution_type or "private").lower()
    if govt_private_pref == "government" and inst_type == "government":
        pref_score += 25.0
    elif govt_private_pref == "private" and inst_type in ["private", "deemed"]:
        pref_score += 25.0
    else:
        pref_score += 15.0

    if hostel_req:
        if college.hostel_available:
            pref_score += 25.0
        else:
            pref_score += 0.0
    else:
        pref_score += 25.0

    # Weighted Sum Calculation using active weights
    active_weights = dict(weights)
    if "placement_ctc_fit" not in active_weights:
        active_weights["placement_ctc_fit"] = active_weights.get("placement_strength", 0.25)

    weighted_total = (
        domain_score * active_weights.get("course_domain_match", 0.35) +
        budget_score * active_weights.get("budget_fit", 0.15) +
        placement_score * active_weights.get("placement_ctc_fit", 0.25) +
        location_score * active_weights.get("location_fit", 0.15) +
        roi_score_val * active_weights.get("roi_score", 0.04) +
        quality_score * active_weights.get("college_quality", 0.03) +
        pref_score * active_weights.get("preferences", 0.03)
    )

    # Apply deficiency penalty if college fails user's requested CTC target
    weighted_total = max(10.0, weighted_total - ctc_deficiency_penalty)

    # If domain does not match, penalize heavily so it never ranks above domain colleges
    if not is_domain_match:
        weighted_total = min(30.0, weighted_total * 0.3)

    match_score = min(100.0, max(0.0, round(weighted_total, 1)))

    if match_score >= 80.0 and (not desired_ctc or avg_pkg >= 0.80 * desired_ctc):
        match_level = "Best Match"
    elif match_score >= 68.0:
        match_level = "Strong Match"
    elif match_score >= 55.0:
        match_level = "Good Match"
    else:
        match_level = "Reach"

    # Target name for Why Fit text
    display_target = raw_desired_course or student_profile.get("domain") or "chosen field"

    # Why Fit Bullet Points
    why_fit = []
    if desired_ctc and avg_pkg >= desired_ctc:
        why_fit.append(f"Average package of ₹{avg_pkg:.1f} LPA meets/exceeds your target CTC of ₹{desired_ctc:.1f} LPA.")
    elif desired_ctc and avg_pkg >= 0.85 * desired_ctc:
        why_fit.append(f"Average package of ₹{avg_pkg:.1f} LPA is close to your ₹{desired_ctc:.1f} LPA target.")
    elif placement_rate >= 75.0:
        why_fit.append(f"Strong placement record of {placement_rate:.0f}% with an average package of ₹{avg_pkg:.1f} LPA.")
    
    if is_domain_match and domain_score >= 80.0:
        why_fit.append(f"Offers courses directly aligned with your {display_target}.")
    if budget_fit_status == "Within Budget":
        why_fit.append(f"Fits within your annual budget of ₹{int(annual_budget):,}." if annual_budget else "Offers an affordable annual fee structure.")
    if is_location_match and preferred_state:
        why_fit.append(f"Located in your preferred state ({college.city}, {college.state}).")
    if nirf_rank and nirf_rank <= 100:
        why_fit.append(f"Ranked #{nirf_rank} in national NIRF institutional rankings.")
    if college.institution_type == "government" and govt_private_pref == "government":
        why_fit.append("Premier government institute offering subsidized tuition fees.")

    if not why_fit:
        why_fit.append("Provides recognized degree programs with verified campus placements.")

    # Tradeoffs Bullet Points
    tradeoffs = []
    if not is_location_match and preferred_state:
        tradeoffs.append(f"Located outside your preferred state ({college.city}, {college.state}).")
    if desired_ctc and avg_pkg < desired_ctc:
        gap_pct = int(((desired_ctc - avg_pkg) / desired_ctc) * 100)
        tradeoffs.append(f"Average package (₹{avg_pkg:.1f} LPA) is {gap_pct}% below your target CTC of ₹{desired_ctc:.1f} LPA.")
    if budget_fit_status == "Stretch":
        tradeoffs.append("Tuition fees are slightly higher than your target annual budget (Stretch tier).")
    elif budget_fit_status == "Over Budget":
        tradeoffs.append("Estimated annual fees exceed your preferred budget threshold.")
    if not college.hostel_available and hostel_req:
        tradeoffs.append("Campus hostel facility not available; private off-campus accommodation required.")
    if detail and (detail.fee_is_estimate or detail.placement_is_estimate):
        tradeoffs.append("Fee and placement figures are benchmark estimates; official prospectus verification recommended.")

    if not tradeoffs:
        tradeoffs.append("Regular campus attendance and sessionals required for ongoing academic progress.")

    # Verification status
    verif_req = detail.verification_required if detail and detail.verification_required else "Estimated"
    if verif_req and "no" in verif_req.lower():
        verification_status = "Verified"
    elif detail and not detail.fee_is_estimate and not detail.placement_is_estimate:
        verification_status = "Verified"
    else:
        verification_status = "Estimated"

    admission_route = detail.common_admission_route if detail and detail.common_admission_route else (college.courses[0].entrance_exam if college.courses else "Merit-based")

    return {
        "college_id": college.id,
        "college_name": college.name,
        "course": matched_course_name,
        "domain": detail.domain_group if detail and detail.domain_group else "General",
        "state": college.state,
        "city": college.city,
        "location": f"{college.city}, {college.state}",
        "institution_type": college.institution_type,
        "annual_fee_inr": annual_fee,
        "annual_fee_min_inr": detail.annual_fee_min_inr if detail and detail.annual_fee_min_inr else annual_fee,
        "annual_fee_max_inr": detail.annual_fee_max_inr if detail and detail.annual_fee_max_inr else annual_fee,
        "estimated_total_annual_cost_inr": total_annual_cost,
        "average_package_lpa": avg_pkg,
        "avg_package_lpa": avg_pkg,
        "placement_rate_pct": placement_rate,
        "match_score": match_score,
        "match_level": match_level,
        "budget_fit_status": budget_fit_status,
        "ctc_fit_status": ctc_fit_status,
        "eligibility_status": ctc_fit_status,
        "desired_ctc": desired_ctc,
        "entrance_exam": admission_route,
        "entrance_exam_status": "Eligible",
        "hostel_available": college.hostel_available,
        "nirf_rank": nirf_rank if nirf_rank < 9999 else None,
        "rating": rating,
        "why_fit": why_fit,
        "tradeoffs": tradeoffs,
        "verification_status": verification_status,
        "verification_required": detail.verification_required if detail else "Estimated",
        "is_location_match": is_location_match,
        "is_domain_match": is_domain_match
    }


def recommend_colleges_engine(
    db: Session,
    student_profile: Dict[str, Any],
    limit: int = 50
) -> Dict[str, Any]:
    colleges = db.query(models.College).options(
        joinedload(models.College.details),
        selectinload(models.College.programs),
        selectinload(models.College.courses)
    ).all()

    scored_items = []
    for c in colleges:
        scored = score_college(c, student_profile)
        scored_items.append(scored)

    # Filter by domain if domain is specified
    domain_req = (student_profile.get("domain") or "").strip().lower()
    if domain_req and domain_req not in ("any", "all", "no preference", ""):
        matching_domain_items = [item for item in scored_items if item["is_domain_match"]]
        eval_items = matching_domain_items if matching_domain_items else scored_items
    else:
        eval_items = scored_items

    preferred_state = (student_profile.get("preferred_state") or "").strip().lower()
    if preferred_state in ("all india", "all", "any", "no preference", "none", ""):
        preferred_state = ""

    desired_ctc_val = student_profile.get("desired_ctc") or student_profile.get("placement_average_ctc")
    d_ctc = float(desired_ctc_val) if desired_ctc_val else 0.0

    # Separate state matches and non-state matches
    if preferred_state:
        state_matches = [item for item in eval_items if item["is_location_match"]]
        other_matches = [item for item in eval_items if not item["is_location_match"]]
        
        state_matches.sort(key=lambda x: (x["match_score"], x["average_package_lpa"]), reverse=True)
        other_matches.sort(key=lambda x: (x["match_score"], x["average_package_lpa"]), reverse=True)
        
        # Best Overall Matches: prioritize state matches, then top out-of-state matches
        best_matches = (state_matches + other_matches)[:limit]
        
        # Location Matches: strictly state matches (or fallback if 0 in that state)
        location_matches = state_matches[:limit] if state_matches else other_matches[:limit]

        # Best Budget Fits: prioritize state budget fits
        budget_state = [item for item in state_matches if item["budget_fit_status"] == "Within Budget"]
        budget_other = [item for item in other_matches if item["budget_fit_status"] == "Within Budget"]
        budget_state.sort(key=lambda x: (x["annual_fee_inr"], -x["match_score"]))
        budget_other.sort(key=lambda x: (x["annual_fee_inr"], -x["match_score"]))
        best_budget_fits = (budget_state + budget_other)[:limit]

        # Best Placement / ROI: prioritize state placement fits
        roi_state = sorted(
            state_matches,
            key=lambda x: (1 if x["average_package_lpa"] >= d_ctc else 0, x["average_package_lpa"], x["placement_rate_pct"]),
            reverse=True
        )
        roi_other = sorted(
            other_matches,
            key=lambda x: (1 if x["average_package_lpa"] >= d_ctc else 0, x["average_package_lpa"], x["placement_rate_pct"]),
            reverse=True
        )
        best_placement_roi = (roi_state + roi_other)[:limit]

    else:
        # All India / No State filter
        eval_items.sort(key=lambda x: (x["match_score"], x["average_package_lpa"]), reverse=True)
        best_matches = eval_items[:limit]
        
        best_budget_fits = [item for item in eval_items if item["budget_fit_status"] == "Within Budget"]
        best_budget_fits.sort(key=lambda x: (x["annual_fee_inr"], -x["match_score"]))
        best_budget_fits = best_budget_fits[:limit]

        best_placement_roi = sorted(
            eval_items,
            key=lambda x: (1 if x["average_package_lpa"] >= d_ctc else 0, x["average_package_lpa"], x["placement_rate_pct"]),
            reverse=True
        )[:limit]

        location_matches = best_matches[:limit]

    alternative_options = [
        item for item in eval_items if item["budget_fit_status"] in ["Stretch", "Over Budget"] or item["match_level"] == "Reach"
    ]
    alternative_options.sort(key=lambda x: x["match_score"], reverse=True)
    alternative_options = alternative_options[:limit]

    return {
        "summary": {
            "total_colleges_evaluated": len(colleges),
            "matching_domain_evaluated": len(eval_items),
            "top_match_count": len(best_matches),
            "student_profile_applied": {
                "desired_course": student_profile.get("desired_course"),
                "domain": student_profile.get("domain"),
                "annual_budget": student_profile.get("annual_budget"),
                "desired_ctc": d_ctc if d_ctc > 0 else None,
                "preferred_state": preferred_state if preferred_state else "All India",
            }
        },
        "best_matches": best_matches,
        "best_budget_fits": best_budget_fits,
        "best_placement_roi": best_placement_roi,
        "location_matches": location_matches,
        "alternative_options": alternative_options,
    }
