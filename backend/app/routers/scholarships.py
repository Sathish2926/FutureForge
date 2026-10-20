"""
Comprehensive Scholarship Router for FutureForge.
Supports discovery, multi-step profile management, deterministic eligibility breakdown,
application tracking, grounded AI guidance, and administrative verification.
"""
import json
from datetime import datetime, date
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user
from app.services.eligibility import evaluate_scholarship_detailed, evaluate_scholarship

router = APIRouter(prefix="/api/scholarships", tags=["scholarships"])


def _clean_str_param(p: Any) -> Optional[str]:
    if p is None or not isinstance(p, str):
        return None
    val = p.strip()
    return val if val else None


def _parse_json_field(val: Any, default=None):
    if not val:
        return default
    if isinstance(val, (list, dict)):
        return val
    try:
        return json.loads(val)
    except Exception:
        return default


def _serialize(s: models.Scholarship, full: bool = True) -> Dict[str, Any]:
    req_docs = _parse_json_field(s.required_documents, [])
    app_steps = _parse_json_field(s.application_steps, [])
    special_criteria = _parse_json_field(s.special_eligibility_criteria, {})

    data = {
        "id": s.id,
        "code": s.code,
        "name": s.name,
        "provider": s.provider,
        "provider_category": s.provider_category or "central_govt",
        "description": s.description or "",
        "geographic_coverage": s.geographic_coverage or "all_india",
        "eligible_states": s.eligible_states or "ALL",
        "domicile_required": bool(s.domicile_required),
        "domicile_state": s.domicile_state,
        "education_levels": s.education_levels or "",
        "eligible_courses": s.eligible_courses or "all",
        "institution_types": s.institution_types or "all",
        "academic_year": s.academic_year or "2026-27",
        "min_marks_percent": s.min_marks_percent,
        "max_family_income": s.max_family_income,
        "eligible_categories": s.eligible_categories or "all",
        "gender_restriction": s.gender_restriction or "all",
        "age_limit": s.age_limit,
        "special_eligibility_criteria": special_criteria,
        "benefit_amount_inr": s.benefit_amount_inr,
        "benefit": s.benefit_description or "",
        "benefit_description": s.benefit_description or "",
        "benefit_type": s.benefit_type or "annual_scholarship",
        "benefit_duration": s.benefit_duration or "",
        "renewal_requirements": s.renewal_requirements or "",
        "required_documents": req_docs,
        "application_open_date": s.application_open_date,
        "application_close_date": s.application_close_date,
        "deadline_verification_status": s.deadline_verification_status or "unconfirmed",
        "application_mode": s.application_mode or "online_portal",
        "official_info_url": s.official_info_url or s.official_url,
        "official_application_url": s.official_application_url,
        "official_url": s.official_application_url or s.official_info_url or s.official_url,
        "application_portal_name": s.application_portal_name or "Official Portal",
        "source_name": s.source_name or "Official Notification",
        "source_type": s.source_type or "official_portal",
        "source_publication_date": s.source_publication_date,
        "last_verified": s.last_verified.isoformat() if s.last_verified else None,
        "verification_status": s.verification_status or "NEEDS_REVERIFICATION",
        "verification_notes": s.verification_notes or "",
        "application_steps": app_steps,
        "levels": s.education_levels or "", # Backwards compatibility
    }

    if full:
        data["eligibility_rules"] = [
            {
                "id": r.id,
                "type": r.rule_type,
                "rule_type": r.rule_type,
                "value": r.rule_value,
                "rule_value": r.rule_value,
                "is_mandatory": getattr(r, "is_mandatory", True),
                "description": getattr(r, "description", "") or ""
            }
            for r in (s.eligibility_rules or [])
        ]
        data["sources"] = [
            {
                "id": src.id,
                "title": src.title,
                "url": src.url,
                "source_type": src.source_type,
                "status": src.status,
                "verified_at": src.verified_at.isoformat() if src.verified_at else None,
                "notes": src.notes
            }
            for src in (s.sources or [])
        ]
        data["verification_history"] = [
            {
                "id": vh.id,
                "field_name": vh.field_name,
                "old_value": vh.old_value,
                "new_value": vh.new_value,
                "source_url": vh.source_url,
                "verified_by": vh.verified_by,
                "verification_notes": vh.verification_notes,
                "timestamp": vh.timestamp.isoformat() if vh.timestamp else None
            }
            for vh in (s.verification_history or [])
        ]

    return data


def _get_user_profile_dict(user: models.User, db: Session) -> Dict[str, Any]:
    """Compiles unified dictionary of profile facts for scholarship matching."""
    usp = user.scholarship_profile
    if usp:
        return {
            "education_level": usp.education_level,
            "course_name": usp.course_name,
            "stream": usp.stream,
            "year_of_study": usp.year_of_study,
            "previous_qualification": usp.previous_qualification,
            "previous_marks_percent": usp.previous_marks_percent,
            "previous_cgpa": usp.previous_cgpa,
            "grading_system": getattr(usp, "grading_system", "percentage") or "percentage",
            "passing_year": usp.passing_year,
            "institution_name": usp.institution_name,
            "institution_type": usp.institution_type or "government",
            "study_mode": usp.study_mode or "full-time",
            "academic_year_needed": getattr(usp, "academic_year_needed", "2026-27") or "2026-27",
            "admission_status": getattr(usp, "admission_status", "confirmed") or "confirmed",
            "country": usp.country or "India",
            "state": usp.state or "Tamil Nadu",
            "current_study_state": getattr(usp, "current_study_state", usp.state) or usp.state or "Tamil Nadu",
            "permanent_state": getattr(usp, "permanent_state", usp.state) or usp.state or "Tamil Nadu",
            "district": usp.district,
            "domicile_state": usp.domicile_state or usp.state or "Tamil Nadu",
            "has_domicile_certificate": usp.has_domicile_certificate,
            "social_category": usp.social_category or "General",
            "category": usp.social_category or "General",
            "has_community_certificate": usp.has_community_certificate,
            "annual_family_income": usp.annual_family_income,
            "has_income_certificate": usp.has_income_certificate,
            "income_certificate_valid": usp.income_certificate_valid,
            "gender": usp.gender,
            "has_disability": usp.has_disability,
            "disability_percentage": usp.disability_percentage,
            "has_disability_certificate": usp.has_disability_certificate,
            "is_first_generation_graduate": usp.is_first_generation_graduate,
            "is_single_girl_child": usp.is_single_girl_child,
            "is_orphan_or_single_parent": usp.is_orphan_or_single_parent,
            "is_hosteller": usp.is_hosteller,
            "is_ex_servicemen_family": usp.is_ex_servicemen_family,
            "studied_govt_school_tn": usp.studied_govt_school_tn,
            "sports_cultural_quota": usp.sports_cultural_quota,
            "entrance_exam_qualified": usp.entrance_exam_qualified,
            "academic_achievements": getattr(usp, "academic_achievements", None),
            "has_completed_onboarding": bool(getattr(usp, "has_completed_onboarding", False)),
        }

    # Fallback from base Profile and EducationRecord
    prof = user.profile
    fin = prof.financial_profile if prof else None
    latest_edu = max(user.education_records, key=lambda e: (e.end_year or 0, e.id)) if user.education_records else None

    # Resolve stage string
    stage_map = {
        "class10": "Class 10",
        "class12": "Class 12",
        "diploma": "Diploma",
        "ug": "Undergraduate",
        "pg": "Postgraduate",
        "phd": "PhD / Research",
        "vocational": "Vocational / ITI"
    }
    edu_stage = prof.education_stage if prof else None
    mapped_level = stage_map.get(edu_stage, edu_stage or "Undergraduate")

    return {
        "education_level": mapped_level,
        "course_name": None,
        "stream": latest_edu.stream if latest_edu else None,
        "year_of_study": prof.current_class_or_year if prof else "1st Year",
        "previous_qualification": latest_edu.level if latest_edu else None,
        "previous_marks_percent": latest_edu.marks_percent if latest_edu else None,
        "previous_cgpa": latest_edu.cgpa if latest_edu else None,
        "grading_system": "percentage",
        "passing_year": latest_edu.end_year if latest_edu else None,
        "institution_name": latest_edu.institution_name if latest_edu else None,
        "institution_type": "government",
        "study_mode": "full-time",
        "academic_year_needed": "2026-27",
        "admission_status": "confirmed",
        "country": "India",
        "state": prof.state if prof else "Tamil Nadu",
        "current_study_state": prof.state if prof else "Tamil Nadu",
        "permanent_state": prof.state if prof else "Tamil Nadu",
        "district": prof.district if prof else None,
        "domicile_state": prof.state if prof else "Tamil Nadu",
        "has_domicile_certificate": True,
        "social_category": prof.category if prof else "General",
        "category": prof.category if prof else "General",
        "has_community_certificate": True,
        "annual_family_income": None,
        "family_income_band": fin.family_income_band if fin else None,
        "has_income_certificate": True,
        "income_certificate_valid": True,
        "gender": prof.gender if (prof and hasattr(prof, "gender")) else None,
        "has_disability": prof.disability_status if prof else False,
        "disability_percentage": 40.0 if (prof and prof.disability_status) else 0.0,
        "has_disability_certificate": prof.disability_status if prof else False,
        "is_first_generation_graduate": prof.first_generation_learner if prof else False,
        "is_single_girl_child": False,
        "is_orphan_or_single_parent": False,
        "is_hosteller": False,
        "is_ex_servicemen_family": False,
        "studied_govt_school_tn": False,
        "sports_cultural_quota": False,
        "entrance_exam_qualified": None,
        "academic_achievements": None,
        "has_completed_onboarding": False,
    }


# =====================================================================
# 1. LIST SCHOLARSHIPS (WITH FILTERS & SEARCH)
# =====================================================================
@router.get("")
def list_scholarships(
    db: Session = Depends(get_db),
    level: Optional[str] = Query(None, description="Filter by education level"),
    state: Optional[str] = Query(None, description="Filter by state / coverage"),
    category: Optional[str] = Query(None, description="Filter by category"),
    provider_category: Optional[str] = Query(None, description="Filter by central_govt, state_govt, etc."),
    verification_status: Optional[str] = Query(None, description="Filter by verification status"),
    search: Optional[str] = Query(None, description="Search term")
):
    level_str = _clean_str_param(level)
    state_str = _clean_str_param(state)
    category_str = _clean_str_param(category)
    prov_cat_str = _clean_str_param(provider_category)
    ver_stat_str = _clean_str_param(verification_status)
    search_str = _clean_str_param(search)

    query = db.query(models.Scholarship)

    if prov_cat_str:
        query = query.filter(models.Scholarship.provider_category == prov_cat_str)

    if ver_stat_str:
        query = query.filter(models.Scholarship.verification_status == ver_stat_str)

    if state_str:
        state_lower = state_str.lower()
        if state_lower not in ["all", "all india"]:
            query = query.filter(
                (models.Scholarship.eligible_states.ilike(f"%{state_str}%")) |
                (models.Scholarship.eligible_states.ilike("%ALL%")) |
                (models.Scholarship.geographic_coverage == "all_india")
            )

    all_schs = query.all()
    results = []

    for s in all_schs:
        # Client side search and level filtering
        if search_str:
            q = search_str.lower()
            corpus = f"{s.name} {s.provider} {s.description or ''} {s.eligible_courses or ''}".lower()
            if q not in corpus:
                continue

        if level_str and level_str.lower() not in ["all", "any"]:
            l_lower = level_str.lower()
            sch_levels = (s.education_levels or "").lower()
            if l_lower not in sch_levels and "all" not in sch_levels:
                continue

        if category_str and category_str.lower() not in ["all", "any"]:
            cat_lower = category_str.lower()
            sch_cats = (s.eligible_categories or "").lower()
            if cat_lower not in sch_cats and "all" not in sch_cats:
                continue

        results.append(_serialize(s, full=False))

    return results


# =====================================================================
# 2. GET SINGLE SCHOLARSHIP BY ID
# =====================================================================
@router.get("/{scholarship_id}")
def get_scholarship(scholarship_id: int, db: Session = Depends(get_db)):
    s = db.query(models.Scholarship).get(scholarship_id)
    if not s:
        raise HTTPException(status_code=404, detail="Scholarship not found")
    return _serialize(s, full=True)


# =====================================================================
# 3. GET USER'S SCHOLARSHIP PROFILE
# =====================================================================
@router.get("/user/profile")
def get_user_scholarship_profile(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    profile_dict = _get_user_profile_dict(user, db)
    usp = user.scholarship_profile
    has_completed = bool(usp and getattr(usp, "has_completed_onboarding", False) and usp.education_level)
    return {
        "user_id": user.id,
        "profile": profile_dict,
        "has_completed_scholarship_profile": has_completed
    }


# =====================================================================
# 4. SAVE / UPDATE USER'S SCHOLARSHIP PROFILE
# =====================================================================
@router.post("/user/profile")
def save_user_scholarship_profile(
    payload: schemas.ScholarshipProfileIn,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    usp = user.scholarship_profile
    if not usp:
        usp = models.UserScholarshipProfile(user_id=user.id)
        db.add(usp)

    # Update all fields from payload
    for field, val in payload.dict(exclude_unset=True).items():
        setattr(usp, field, val)

    usp.updated_at = datetime.utcnow()

    # Also keep base Profile in sync for consistency across the app
    if user.profile:
        if payload.education_level:
            # Map back to education stage key
            inv_map = {
                "class 10": "class10", "class 11": "class12", "class 12": "class12",
                "diploma": "diploma", "undergraduate": "ug", "postgraduate": "pg",
                "phd / research": "phd"
            }
            mapped = inv_map.get(payload.education_level.lower(), "ug")
            user.profile.education_stage = mapped
        if payload.state:
            user.profile.state = payload.state
        if payload.district:
            user.profile.district = payload.district
        if payload.gender:
            user.profile.gender = payload.gender
        if payload.social_category:
            user.profile.category = payload.social_category
        if payload.has_disability is not None:
            user.profile.disability_status = payload.has_disability
        if payload.is_first_generation_graduate is not None:
            user.profile.first_generation_learner = payload.is_first_generation_graduate

    db.commit()
    db.refresh(usp)

    return {
        "status": "success",
        "message": "Scholarship profile saved successfully",
        "profile": _get_user_profile_dict(user, db)
    }


# =====================================================================
# 5. RECOMMENDATIONS & ELIGIBILITY EVALUATION
# =====================================================================
@router.post("/recommendations")
def recommend_scholarships(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    """
    Deterministic rule-based scholarship eligibility engine (spec §5, §6, §8).
    Evaluates mandatory conditions, separates results, never overrides failures with AI,
    and returns comprehensive breakdown tables.
    """
    profile_dict = _get_user_profile_dict(user, db)
    scholarships = db.query(models.Scholarship).all()

    eligible_list = []
    potentially_eligible_list = []
    ineligible_list = []
    unverified_list = []
    closed_list = []
    all_evaluated = []

    for s in scholarships:
        res = evaluate_scholarship_detailed(s, profile_dict)
        serialized_sch = _serialize(s, full=True)

        item = {
            "scholarship": serialized_sch,
            "eligibility_status": res["eligibility_status"],
            "application_period_status": res["application_period_status"],
            "application_period_label": res["application_period_label"],
            "match_score": res["match_score"],
            "breakdown": res["breakdown"],
            "matching_reasons": res["matching_reasons"],
            "missing_requirements": res["missing_requirements"],
            "failed_reasons": res["failed_reasons"],
        }

        all_evaluated.append(item)

        # Categorize
        if res["application_period_status"] == "CLOSED":
            closed_list.append(item)

        if res["eligibility_status"] == "ELIGIBLE":
            eligible_list.append(item)
        elif res["eligibility_status"] == "POTENTIALLY_ELIGIBLE":
            potentially_eligible_list.append(item)
        elif res["eligibility_status"] == "INELIGIBLE":
            ineligible_list.append(item)
        elif res["eligibility_status"] == "UNVERIFIED":
            unverified_list.append(item)

    # Sort each list by match_score descending, and application opening preference
    def _sort_key(i):
        # Open applications get priority
        app_weight = 20 if i["application_period_status"] == "OPEN" else (10 if i["application_period_status"] == "UPCOMING" else 0)
        return -(i["match_score"] + app_weight)

    eligible_list.sort(key=_sort_key)
    potentially_eligible_list.sort(key=_sort_key)
    ineligible_list.sort(key=_sort_key)

    # All evaluated sort order: Eligible -> Potentially Eligible -> Unverified -> Ineligible
    status_order = {"ELIGIBLE": 0, "POTENTIALLY_ELIGIBLE": 1, "UNVERIFIED": 2, "INELIGIBLE": 3}
    all_evaluated.sort(key=lambda i: (status_order.get(i["eligibility_status"], 4), _sort_key(i)))

    # Count application deadlines
    open_count = sum(1 for i in all_evaluated if i["application_period_status"] == "OPEN")
    upcoming_count = sum(1 for i in all_evaluated if i["application_period_status"] == "UPCOMING")
    closed_count = sum(1 for i in all_evaluated if i["application_period_status"] == "CLOSED")

    return {
        "summary": {
            "total_count": len(all_evaluated),
            "eligible_count": len(eligible_list),
            "potentially_eligible_count": len(potentially_eligible_list),
            "ineligible_count": len(ineligible_list),
            "unverified_count": len(unverified_list),
            "open_count": open_count,
            "upcoming_count": upcoming_count,
            "closed_count": closed_count,
            "profile_context": {
                "education_level": profile_dict.get("education_level"),
                "state": profile_dict.get("state"),
                "social_category": profile_dict.get("social_category"),
                "annual_family_income": profile_dict.get("annual_family_income"),
                "gender": profile_dict.get("gender")
            }
        },
        "results": all_evaluated,
        "eligible": eligible_list,
        "potentially_eligible": potentially_eligible_list,
        "ineligible": ineligible_list,
        "unverified": unverified_list,
        "closed": closed_list
    }


# =====================================================================
# 6. SAVED SCHOLARSHIPS & APPLICATION TRACKER
# =====================================================================
@router.get("/user/saved")
def get_user_saved_scholarships(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    saved_items = db.query(models.SavedScholarship).filter_by(user_id=user.id).order_by(desc(models.SavedScholarship.created_at)).all()
    results = []
    for item in saved_items:
        s = item.scholarship
        if not s:
            continue
        results.append({
            "id": item.id,
            "scholarship_id": s.id,
            "name": s.name,
            "provider": s.provider,
            "benefit": s.benefit_description,
            "benefit_amount_inr": s.benefit_amount_inr,
            "status": item.status or "saved",
            "application_reference_no": item.application_reference_no,
            "notes": item.notes,
            "deadline_reminder": item.deadline_reminder,
            "application_close_date": s.application_close_date,
            "official_application_url": s.official_application_url or s.official_info_url or s.official_url,
            "verification_status": s.verification_status,
            "saved_date": item.created_at.isoformat() if item.created_at else None,
            "updated_at": item.updated_at.isoformat() if item.updated_at else None
        })
    return results


@router.post("/user/saved/{scholarship_id}")
def save_or_update_scholarship(
    scholarship_id: int,
    payload: Optional[schemas.SavedScholarshipUpdateIn] = None,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    sch = db.query(models.Scholarship).get(scholarship_id)
    if not sch:
        raise HTTPException(status_code=404, detail="Scholarship not found")

    item = db.query(models.SavedScholarship).filter_by(user_id=user.id, scholarship_id=scholarship_id).first()
    if not item:
        item = models.SavedScholarship(
            user_id=user.id,
            scholarship_id=scholarship_id,
            status=payload.status if payload and payload.status else "saved",
            application_reference_no=payload.application_reference_no if payload else None,
            notes=payload.notes if payload else None,
            deadline_reminder=payload.deadline_reminder if payload else True
        )
        db.add(item)
    else:
        if payload:
            if payload.status:
                item.status = payload.status
            if payload.application_reference_no is not None:
                item.application_reference_no = payload.application_reference_no
            if payload.notes is not None:
                item.notes = payload.notes
            if payload.deadline_reminder is not None:
                item.deadline_reminder = payload.deadline_reminder
        item.updated_at = datetime.utcnow()

    db.commit()
    return {"status": "success", "message": "Scholarship saved to tracking list", "tracking_status": item.status}


@router.delete("/user/saved/{scholarship_id}")
def unsave_scholarship(
    scholarship_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    item = db.query(models.SavedScholarship).filter_by(user_id=user.id, scholarship_id=scholarship_id).first()
    if item:
        db.delete(item)
        db.commit()
        return {"status": "success", "message": "Scholarship removed from saved list"}
    return {"status": "not_found", "message": "Scholarship was not saved"}


# =====================================================================
# 7. GROUNDED AI ASSISTANT FOR SCHOLARSHIP GUIDANCE
# =====================================================================
@router.post("/ai-explain")
def explain_scholarship_ai(
    req: schemas.ScholarshipAIExplainRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    """
    Grounded AI guidance strictly using verified database records.
    Never hallucinates benefits, URLs, deadlines, or overrides rules (spec §9).
    """
    sch = db.query(models.Scholarship).get(req.scholarship_id)
    if not sch:
        raise HTTPException(status_code=404, detail="Scholarship not found")

    profile_dict = _get_user_profile_dict(user, db)
    eval_res = evaluate_scholarship_detailed(sch, profile_dict)

    query_lower = req.query.strip().lower()
    docs = _parse_json_field(sch.required_documents, [])
    steps = _parse_json_field(sch.application_steps, [])

    # Deterministic grounded responses based on verified data
    if any(k in query_lower for k in ["document", "docs", "certificate", "checklist"]):
        doc_bullets = "\n".join([f"- **{d['name']}** ({'Mandatory' if d.get('mandatory') else 'Optional'}): {d.get('description', '')}" for d in docs])
        response_text = (
            f"### Official Document Checklist for {sch.name}\n\n"
            f"According to official scheme guidelines, here are the verified required documents:\n\n"
            f"{doc_bullets}\n\n"
            f"**Important:** Please ensure names on all certificates match your Aadhaar card exactly."
        )
    elif any(k in query_lower for k in ["how to apply", "apply", "steps", "procedure", "process"]):
        step_bullets = "\n".join([f"**Step {s.get('step_number', idx+1)}: {s.get('title')}**\n{s.get('instruction')}" for idx, s in enumerate(steps)])
        portal_info = f"Official Application Portal: [{sch.application_portal_name or 'Portal'}]({sch.official_application_url or sch.official_url})" if sch.official_application_url else "Application portal opening will be announced on the official information page."
        response_text = (
            f"### How to Avail {sch.name}\n\n"
            f"{step_bullets}\n\n"
            f"{portal_info}\n\n"
            f"*(Note: FutureForge guides you to the official government portal; we never collect passwords or submit on your behalf.)*"
        )
    elif any(k in query_lower for k in ["eligible", "why", "qualify", "match"]):
        breakdown_lines = "\n".join([f"- **{b['name']}**: `{b['result']}` — {b['guidance']}" for b in eval_res["breakdown"]])
        response_text = (
            f"### Eligibility Breakdown for Your Profile\n\n"
            f"**Current Status:** `{eval_res['eligibility_status']}`\n\n"
            f"**Condition-by-Condition Evaluation:**\n"
            f"{breakdown_lines}\n\n"
            f"**Next Steps:** " +
            ("You meet all verified requirements! You may proceed with application." if eval_res["eligibility_status"] == "ELIGIBLE" else
             "Please check missing certificates or update your profile to confirm eligibility.")
        )
    else:
        # General informative overview grounded in record
        response_text = (
            f"### Scheme Details: {sch.name}\n\n"
            f"- **Provider:** {sch.provider}\n"
            f"- **Benefit:** {sch.benefit_description}\n"
            f"- **Eligibility Summary:** For {sch.education_levels} students, Income cap: {f'₹{sch.max_family_income:,.0f}' if sch.max_family_income else 'No income ceiling'}\n"
            f"- **Deadline:** {sch.application_close_date or 'Refer to official portal'} ({sch.deadline_verification_status})\n"
            f"- **Official Portal:** {sch.official_application_url or sch.official_info_url or sch.official_url}\n"
            f"- **Last Verified:** {sch.last_verified.strftime('%d %B %Y') if sch.last_verified else 'Verified'}\n\n"
            f"Feel free to ask about required documents, application steps, or eligibility criteria!"
        )

    return {
        "scholarship_id": sch.id,
        "query": req.query,
        "reply": response_text,
        "source": sch.source_name,
        "verified_url": sch.official_info_url or sch.official_url
    }


# =====================================================================
# 8. ADMINISTRATIVE SCHOLARSHIP MANAGEMENT & AUDIT LOG
# =====================================================================
@router.post("/admin/scholarships")
def admin_create_scholarship(
    payload: schemas.ScholarshipAdminIn,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Administrator permissions required")

    sch_dict = payload.dict(exclude={"rules", "required_documents", "application_steps"})
    if payload.required_documents:
        sch_dict["required_documents"] = json.dumps(payload.required_documents)
    if payload.application_steps:
        sch_dict["application_steps"] = json.dumps(payload.application_steps)

    sch_dict["last_verified"] = datetime.utcnow()
    sch = models.Scholarship(**sch_dict)
    db.add(sch)
    db.flush()

    if payload.rules:
        for r in payload.rules:
            db.add(models.ScholarshipEligibilityRule(
                scholarship_id=sch.id,
                rule_type=r.get("rule_type", "other"),
                rule_value=r.get("rule_value", ""),
                is_mandatory=r.get("is_mandatory", True),
                description=r.get("description", "")
            ))

    # Add audit log
    db.add(models.ScholarshipVerificationHistory(
        scholarship_id=sch.id,
        field_name="creation",
        old_value=None,
        new_value=sch.name,
        source_url=sch.official_info_url,
        verified_by=user.email,
        verification_notes="Created via admin panel."
    ))

    db.commit()
    db.refresh(sch)
    return {"status": "success", "scholarship_id": sch.id, "message": "Scholarship created successfully"}


@router.put("/admin/scholarships/{scholarship_id}")
def admin_update_scholarship(
    scholarship_id: int,
    payload: schemas.ScholarshipAdminIn,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Administrator permissions required")

    sch = db.query(models.Scholarship).get(scholarship_id)
    if not sch:
        raise HTTPException(status_code=404, detail="Scholarship not found")

    old_status = sch.verification_status
    data = payload.dict(exclude={"rules", "required_documents", "application_steps"})

    for k, v in data.items():
        if v is not None:
            setattr(sch, k, v)

    if payload.required_documents is not None:
        sch.required_documents = json.dumps(payload.required_documents)
    if payload.application_steps is not None:
        sch.application_steps = json.dumps(payload.application_steps)

    sch.last_verified = datetime.utcnow()

    # Log audit entry if status or key fields changed
    if old_status != payload.verification_status:
        db.add(models.ScholarshipVerificationHistory(
            scholarship_id=sch.id,
            field_name="verification_status",
            old_value=old_status,
            new_value=payload.verification_status,
            source_url=sch.official_info_url,
            verified_by=user.email,
            verification_notes=payload.verification_notes or "Updated by administrator"
        ))

    db.commit()
    return {"status": "success", "message": "Scholarship updated successfully"}


@router.post("/admin/scholarships/{scholarship_id}/verify")
def admin_verify_scholarship(
    scholarship_id: int,
    status_update: str = Query("VERIFIED_ACTIVE"),
    notes: Optional[str] = Query("Verified against latest portal release"),
    source_url: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Administrator permissions required")

    sch = db.query(models.Scholarship).get(scholarship_id)
    if not sch:
        raise HTTPException(status_code=404, detail="Scholarship not found")

    old_status = sch.verification_status
    sch.verification_status = status_update
    sch.last_verified = datetime.utcnow()
    if notes:
        sch.verification_notes = notes

    # Add audit log
    db.add(models.ScholarshipVerificationHistory(
        scholarship_id=sch.id,
        field_name="verification_status",
        old_value=old_status,
        new_value=status_update,
        source_url=source_url or sch.official_info_url,
        verified_by=user.email,
        verification_notes=notes
    ))

    db.commit()
    return {"status": "success", "message": f"Scholarship marked {status_update}"}


@router.get("/admin/audit-log")
def admin_get_audit_log(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Administrator permissions required")

    logs = db.query(models.ScholarshipVerificationHistory).order_by(desc(models.ScholarshipVerificationHistory.timestamp)).limit(50).all()
    return [
        {
            "id": l.id,
            "scholarship_id": l.scholarship_id,
            "scholarship_name": l.scholarship.name if l.scholarship else "N/A",
            "field_name": l.field_name,
            "old_value": l.old_value,
            "new_value": l.new_value,
            "source_url": l.source_url,
            "verified_by": l.verified_by,
            "verification_notes": l.verification_notes,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None
        }
        for l in logs
    ]


@router.get("/admin/quality-check")
def admin_quality_check(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Administrator permissions required")

    all_schs = db.query(models.Scholarship).all()
    missing_links = []
    needing_reverification = []
    expired_deadlines = []

    today_str = date.today().isoformat()

    for s in all_schs:
        if not s.official_application_url and not s.official_info_url:
            missing_links.append({"id": s.id, "name": s.name, "issue": "No official URL recorded"})
        if s.verification_status in ["NEEDS_REVERIFICATION", "UNVERIFIED"]:
            needing_reverification.append({"id": s.id, "name": s.name, "status": s.verification_status})
        if s.application_close_date and s.application_close_date < today_str and s.verification_status == "VERIFIED_ACTIVE":
            expired_deadlines.append({"id": s.id, "name": s.name, "close_date": s.application_close_date})

    return {
        "total_records": len(all_schs),
        "needing_reverification_count": len(needing_reverification),
        "expired_deadlines_count": len(expired_deadlines),
        "missing_links_count": len(missing_links),
        "needing_reverification": needing_reverification,
        "expired_deadlines": expired_deadlines,
        "missing_links": missing_links
    }
