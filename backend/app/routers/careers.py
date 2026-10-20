from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas, recommendation
from app.database import get_db
from app.auth import get_current_user
from app.services.career_resolver import flatten_pathway_steps

router = APIRouter(prefix="/api/careers", tags=["careers"])


@router.get("")
def list_careers(sector: str = None, q: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Career)
    if sector:
        query = query.filter(models.Career.sector == sector)
    if q:
        query = query.filter(models.Career.name.ilike(f"%{q}%"))
    careers = query.all()
    return [{"id": c.id, "slug": c.slug, "name": c.name, "sector": c.sector, "description": c.description} for c in careers]


@router.get("/{slug}")
def get_career(slug: str, db: Session = Depends(get_db)):
    career = db.query(models.Career).filter_by(slug=slug).first()
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")
    return {
        "id": career.id, "slug": career.slug, "name": career.name, "sector": career.sector,
        "description": career.description, "recommended_subjects": career.recommended_subjects,
        "common_entrance_exams": career.common_entrance_exams, "relevant_degrees": career.relevant_degrees,
        "typical_progression": career.typical_progression, "industry_sectors": career.industry_sectors,
        "government_opportunities": career.government_opportunities, "higher_study_routes": career.higher_study_routes,
        "skill_building_timeline": career.skill_building_timeline,
        "core_skills": [cs.skill.name for cs in career.skill_links if cs.priority == "core"],
        "complementary_skills": [cs.skill.name for cs in career.skill_links if cs.priority == "complementary"],
        "pathways": [
            {"route_type": p.route_type, "title": p.title, "steps": flatten_pathway_steps(p.steps_json)} for p in career.pathways
        ],
    }


@router.post("/recommendations")
def get_recommendations(
    payload: schemas.RecommendationRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    """Hybrid engine: deterministic rule/weighted scoring always runs;
    Gemini (if configured) only adds narrative polish on top — see
    recommendation.py for the fallback contract (spec §10, §38)."""
    if payload.career_slug:
        careers = [db.query(models.Career).filter_by(slug=payload.career_slug).first()]
        if not careers[0]:
            raise HTTPException(status_code=404, detail="Career not found")
    else:
        careers = db.query(models.Career).all()

    results = []
    for career in careers:
        score_result = recommendation.score_career(db, user, career)
        reasoning = recommendation.generate_reasoning(user, career, score_result)
        results.append({
            "career": {"id": career.id, "slug": career.slug, "name": career.name, "sector": career.sector,
                       "description": career.description},
            "match_score": score_result["score"],
            "breakdown": score_result["breakdown"],
            "reasoning": reasoning,
        })

        db.add(models.Recommendation(
            user_id=user.id, career_id=career.id, recommendation_type="career",
            score=score_result["score"], reasoning_json=reasoning,
            profile_snapshot_json={"education_stage": user.profile.education_stage if user.profile else None},
            ai_model_used=None,
        ))

    db.commit()
    results.sort(key=lambda r: r["match_score"], reverse=True)
    return results[: payload.top_n]
