import os
import sqlite3
from typing import Optional, List, Dict, Any
# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, Query, HTTPException, Body
from sqlalchemy.orm import Session

from app import models
from app.database import get_db, db_file
from app.auth import get_current_user_optional
from app.college_recommender import recommend_colleges_engine
from app.strict_college_filter import execute_strict_college_filter, VALID_COLLEGE_TYPES

router = APIRouter(prefix="/api/colleges", tags=["colleges"])

DB_PATH = db_file if (db_file and os.path.exists(db_file)) else os.path.abspath("backend/careerpath.db")



def _get_single_college_dict(college_id: int) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    col = cur.execute("SELECT * FROM colleges WHERE college_id = ?", [college_id]).fetchone()
    if not col:
        conn.close()
        return None

    col_dict = dict(col)
    cid = col_dict["college_id"]
    progs = [dict(pr) for pr in cur.execute("SELECT * FROM programs WHERE college_id = ?", [cid]).fetchall()]
    placements = [dict(pl) for pl in cur.execute("SELECT * FROM placements WHERE college_id = ?", [cid]).fetchall()]
    rankings = [dict(rk) for rk in cur.execute("SELECT * FROM college_rankings WHERE college_id = ?", [cid]).fetchall()]
    fees = [dict(fe) for fe in cur.execute("SELECT * FROM college_fees WHERE college_id = ?", [cid]).fetchall()]
    meds = [dict(md) for md in cur.execute("SELECT * FROM medical_details WHERE college_id = ?", [cid]).fetchall()]
    conn.close()

    col_dict["id"] = cid
    col_dict["name"] = col_dict["college_name"]
    col_dict["institution_type"] = col_dict.get("standardized_ownership_type") or "College"
    col_dict["domain_group"] = col_dict.get("standardized_college_type") or "General"
    col_dict["domain"] = col_dict.get("standardized_college_type") or "General"
    col_dict["location"] = f"{col_dict.get('city') or col_dict.get('district') or ''}, {col_dict.get('state') or ''}".strip(", ")

    fee_vals = [p["annual_fee"] for p in progs if p.get("annual_fee") is not None]
    if not fee_vals:
        fee_vals = [f["tuition_fee"] for f in fees if f.get("tuition_fee") is not None]
    min_fee_val = min(fee_vals) if fee_vals else None
    max_fee_val = max(fee_vals) if fee_vals else None
    col_dict["annual_fee_min_inr"] = min_fee_val or 50000
    col_dict["annual_fee_max_inr"] = max_fee_val or min_fee_val or 50000
    col_dict["annual_fee_inr"] = min_fee_val or max_fee_val or 50000
    col_dict["estimated_total_annual_cost_inr"] = col_dict["annual_fee_inr"]

    avg_pkgs = [pl["average_package"] for pl in placements if pl.get("average_package") is not None]
    med_pkgs = [pl["median_package"] for pl in placements if pl.get("median_package") is not None]
    pcts = [pl["placement_percentage"] for pl in placements if pl.get("placement_percentage") is not None]
    col_dict["average_package_lpa"] = avg_pkgs[0] if avg_pkgs else (med_pkgs[0] if med_pkgs else 4.0)
    col_dict["avg_package_lpa"] = col_dict["average_package_lpa"]
    col_dict["median_package_lpa"] = med_pkgs[0] if med_pkgs else None
    col_dict["placement_rate_pct"] = pcts[0] if pcts else 65.0
    col_dict["placement_rate_pct_est"] = col_dict["placement_rate_pct"]

    nirf_ranks = [rk["rank"] for rk in rankings if rk.get("rank") is not None]
    col_dict["nirf_rank"] = nirf_ranks[0] if nirf_ranks else None
    col_dict["nirf_rank_seeded"] = col_dict["nirf_rank"]
    col_dict["rating"] = col_dict.get("careerpath_selection_score") or 70.0
    col_dict["rating_seeded"] = col_dict["rating"]
    col_dict["verification_status"] = "Verified"

    courses_list = []
    for p in progs:
        courses_list.append({
            "id": p.get("program_id") or p.get("id"),
            "course": p.get("course_name") or p.get("degree"),
            "degree_level": p.get("education_level"),
            "field": p.get("specialization"),
            "entrance_exam": p.get("entrance_exam"),
            "annual_fees_inr": p.get("annual_fee"),
        })
    col_dict["courses"] = courses_list
    col_dict["programs"] = progs
    col_dict["placements"] = placements
    col_dict["rankings"] = rankings
    col_dict["college_fees"] = fees
    col_dict["medical_details"] = meds
    return col_dict


@router.get("")
def list_colleges(
    domain: Optional[str] = None,
    standardized_college_type: Optional[str] = None,
    college_type: Optional[str] = None,
    course: Optional[str] = None,
    course_name: Optional[str] = None,
    education_level: Optional[str] = None,
    degree: Optional[str] = None,
    specialization: Optional[str] = None,
    entrance_exam: Optional[str] = None,
    state: Optional[str] = None,
    district: Optional[str] = None,
    city: Optional[str] = None,
    institution_type: Optional[str] = None,
    standardized_ownership_type: Optional[str] = None,
    ownership: Optional[str] = None,
    min_fee: Optional[float] = None,
    max_fee: Optional[float] = None,
    max_annual_fee: Optional[float] = None,
    min_median_package: Optional[float] = None,
    min_avg_package: Optional[float] = None,
    min_average_package: Optional[float] = None,
    min_placement: Optional[float] = None,
    min_placement_percentage: Optional[float] = None,
    placement_academic_year: Optional[str] = None,
    placement_confidence: Optional[str] = None,
    max_nirf_rank: Optional[int] = None,
    max_rank: Optional[int] = None,
    min_nirf_score: Optional[float] = None,
    nirf_category: Optional[str] = None,
    medical_specialization: Optional[str] = None,
    hospital_name: Optional[str] = None,
    search: Optional[str] = None,
    query: Optional[str] = None,
    sort_by: Optional[str] = "default",
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    filter_dict = {
        "domain": domain,
        "standardized_college_type": standardized_college_type or college_type,
        "course_name": course_name or course,
        "education_level": education_level,
        "degree": degree,
        "specialization": specialization,
        "entrance_exam": entrance_exam,
        "state": state,
        "district": district,
        "city": city,
        "standardized_ownership_type": standardized_ownership_type or ownership or institution_type,
        "min_fee": min_fee,
        "max_fee": max_fee or max_annual_fee,
        "min_median_package": min_median_package,
        "min_average_package": min_average_package or min_avg_package,
        "min_placement_percentage": min_placement_percentage or min_placement,
        "placement_academic_year": placement_academic_year,
        "placement_confidence": placement_confidence,
        "max_nirf_rank": max_nirf_rank or max_rank,
        "min_nirf_score": min_nirf_score,
        "nirf_category": nirf_category,
        "medical_specialization": medical_specialization,
        "hospital_name": hospital_name,
        "search": search or query,
    }
    clean_filters = {k: v for k, v in filter_dict.items() if v is not None and str(v).strip() != ""}
    return execute_strict_college_filter(
        db_path=DB_PATH,
        filters=clean_filters,
        sort_by=sort_by or "default",
        limit=limit,
        offset=offset
    )


@router.get("/{college_id}")
def get_college(college_id: str, db: Session = Depends(get_db)):
    col = _get_single_college_dict(college_id)
    if not col:
        raise HTTPException(status_code=404, detail="College not found")
    return col


@router.get("/{college_id}/courses")
def get_college_courses(college_id: str, db: Session = Depends(get_db)):
    col = _get_single_college_dict(college_id)
    if not col:
        raise HTTPException(status_code=404, detail="College not found")
    return {
        "college_id": col["id"],
        "college_name": col["name"],
        "courses": col["courses"],
        "programs": col["programs"],
    }



def _extract_profile_dict(user: Optional[models.User], body: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    prof_dict = {}
    if user and user.profile:
        p = user.profile
        prof_dict["desired_course"] = getattr(p, "target_degree", None) or getattr(p, "preferred_field", None)
        prof_dict["domain"] = getattr(p, "preferred_field", None)
        prof_dict["preferred_state"] = getattr(p, "preferred_location", None) or getattr(p, "state", None)
        prof_dict["preferred_city"] = getattr(p, "preferred_location", None) or getattr(p, "city", None)
        if p.financial_profile:
            band = p.financial_profile.budget_band
            prof_dict["annual_budget"] = {"low": 100000, "medium": 300000, "high": 1000000}.get(band, 300000)
            prof_dict["government_private_preference"] = p.financial_profile.government_private_preference

    if user and user.education_records:
        latest = max(user.education_records, key=lambda e: (getattr(e, "end_year", 0) or 0, getattr(e, "id", 0)))
        prof_dict["education_stage"] = getattr(latest, "education_level", None) or getattr(latest, "level", None)
        prof_dict["current_stream"] = getattr(latest, "stream", None)
        if getattr(latest, "marks_percent", None) is not None:
            prof_dict["academic_percentage"] = latest.marks_percent

    if body:
        for k, v in body.items():
            if v is not None and v != "":
                prof_dict[k] = v

    return prof_dict


@router.post("/recommendations")
@router.post("/recommend")
def recommend_colleges_api(
    payload: Optional[Dict[str, Any]] = Body(None),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    user: Optional[models.User] = Depends(get_current_user_optional)
):
    student_profile = _extract_profile_dict(user, payload)
    req_limit = payload.get("limit") if (payload and payload.get("limit")) else limit
    recommendations = recommend_colleges_engine(db, student_profile, limit=req_limit)
    return recommendations


@router.post("/search")
def search_colleges_api(
    payload: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db)
):
    sort_by = payload.get("sort_by", "default")
    limit = int(payload.get("limit", 50))
    offset = int(payload.get("offset", 0))
    return execute_strict_college_filter(
        db_path=DB_PATH,
        filters=payload,
        sort_by=sort_by,
        limit=limit,
        offset=offset
    )

