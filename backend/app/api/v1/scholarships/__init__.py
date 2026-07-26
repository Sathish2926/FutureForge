"""Scholarship API routes — Profile, Recommendations, Details, Bookmarks."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import ScholarshipBookmark, ScholarshipProfile, User
from app.repositories import (
    ScholarshipBookmarkRepository,
    ScholarshipProfileRepository,
    ScholarshipRepository,
)
from app.schemas.scholarship import (
    ScholarshipBookmarkCreate,
    ScholarshipBookmarkRead,
    ScholarshipDashboardResponse,
    ScholarshipDetailResponse,
    ScholarshipProfileCreate,
    ScholarshipProfileRead,
    ScholarshipProfileUpdate,
    ScholarshipRecommendationResponse,
)
from app.services.scholarships import (
    ScholarshipProfileNotFoundError,
    ScholarshipRecommendationService,
)

router = APIRouter(prefix="/scholarships", tags=["scholarships"])


# ── Helper ──────────────────────────────────────────────────────────

def _calculate_profile_completion(profile: ScholarshipProfile) -> float:
    """Calculate profile completion percentage based on filled fields."""

    fields = [
        profile.academic_stage,
        profile.current_course,
        profile.current_year,
        profile.state,
        profile.district,
        profile.community,
        profile.gender,
        profile.annual_family_income,
        profile.percentage_cgpa,
        profile.institution_name,
        profile.university,
        profile.parent_occupation,
        profile.nationality,
    ]
    filled = sum(1 for f in fields if f is not None and f != "" and f != 0)
    return round((filled / len(fields)) * 100, 1)


def _get_missing_documents(profile: ScholarshipProfile) -> list[str]:
    """Return list of potentially missing documents based on profile."""

    missing = []
    docs = {d.document_type for d in (profile.documents or [])}

    if profile.annual_family_income and "income_certificate" not in docs:
        missing.append("Income Certificate")
    if profile.community and profile.community.upper() not in {"GENERAL"} and "community_certificate" not in docs:
        missing.append("Community Certificate")
    if profile.has_disability and "disability_certificate" not in docs:
        missing.append("Disability Certificate")
    if "bonafide_certificate" not in docs:
        missing.append("Bonafide Certificate")
    if "previous_marksheet" not in docs:
        missing.append("Previous Marksheet")

    return missing


# ── Scholarship Profile ─────────────────────────────────────────────

@router.post(
    "/profile",
    response_model=ScholarshipProfileRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create scholarship eligibility profile",
)
def create_scholarship_profile(
    payload: ScholarshipProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipProfileRead:
    """Create a new scholarship eligibility profile for the authenticated user."""

    repo = ScholarshipProfileRepository(db)
    existing = repo.get_by_user_id(current_user.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Scholarship profile already exists. Use PUT to update.",
        )

    profile = ScholarshipProfile(user_id=current_user.id, **payload.model_dump())
    profile.profile_completion = _calculate_profile_completion(profile)
    created = repo.create(profile)
    db.commit()
    db.refresh(created)
    return ScholarshipProfileRead.model_validate(created)


@router.put(
    "/profile",
    response_model=ScholarshipProfileRead,
    summary="Update scholarship eligibility profile",
)
def update_scholarship_profile(
    payload: ScholarshipProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipProfileRead:
    """Update the scholarship eligibility profile for the authenticated user."""

    repo = ScholarshipProfileRepository(db)
    profile = repo.get_by_user_id(current_user.id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship profile not found. Create one first.",
        )

    update_data = payload.model_dump(exclude_unset=True)
    updated = repo.update(profile, update_data)
    updated.profile_completion = _calculate_profile_completion(updated)
    db.commit()
    db.refresh(updated)
    return ScholarshipProfileRead.model_validate(updated)


@router.get(
    "/profile",
    response_model=ScholarshipProfileRead,
    summary="Fetch scholarship eligibility profile",
)
def get_scholarship_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipProfileRead:
    """Return the scholarship eligibility profile for the authenticated user."""

    repo = ScholarshipProfileRepository(db)
    profile = repo.get_by_user_id(current_user.id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship profile not found. Please complete your profile first.",
        )

    return ScholarshipProfileRead.model_validate(profile)


# ── Recommendations ─────────────────────────────────────────────────

@router.get(
    "/recommendations",
    response_model=list[ScholarshipRecommendationResponse],
    summary="Get personalized scholarship recommendations",
)
def get_scholarship_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[ScholarshipRecommendationResponse]:
    """Return scholarship recommendations for the authenticated student."""

    service = ScholarshipRecommendationService()
    try:
        results = service.get_recommendations(db=db, current_user=current_user)
    except ScholarshipProfileNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc

    return [result.to_response() for result in results]


# ── Scholarship Detail ──────────────────────────────────────────────

@router.get(
    "/{scholarship_id}",
    response_model=ScholarshipDetailResponse,
    summary="Get detailed scholarship information",
)
def get_scholarship_detail(
    scholarship_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipDetailResponse:
    """Return full details for a single scholarship."""

    repo = ScholarshipRepository(db)
    scholarship = repo.get_by_id(scholarship_id)
    if not scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship not found.",
        )

    bookmark_repo = ScholarshipBookmarkRepository(db)
    bookmark = bookmark_repo.get_by_user_and_scholarship(current_user.id, scholarship_id)

    response = ScholarshipDetailResponse.model_validate(scholarship)
    response.is_bookmarked = bookmark is not None
    return response


# ── Bookmarks ───────────────────────────────────────────────────────

@router.post(
    "/{scholarship_id}/bookmark",
    response_model=ScholarshipBookmarkRead,
    summary="Bookmark or unbookmark a scholarship",
)
def toggle_bookmark(
    scholarship_id: int,
    payload: ScholarshipBookmarkCreate | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipBookmarkRead:
    """Toggle bookmark for a scholarship. If already bookmarked, remove it."""

    repo = ScholarshipBookmarkRepository(db)
    existing = repo.get_by_user_and_scholarship(current_user.id, scholarship_id)

    if existing:
        repo.delete(existing)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_200_OK,
            detail="Bookmark removed.",
        )

    scholarship_repo = ScholarshipRepository(db)
    scholarship = scholarship_repo.get_by_id(scholarship_id)
    if not scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship not found.",
        )

    bookmark = ScholarshipBookmark(
        user_id=current_user.id,
        scholarship_id=scholarship_id,
        status=payload.status if payload else "saved",
        notes=payload.notes if payload else None,
    )
    created = repo.create(bookmark)
    db.commit()
    db.refresh(created)
    return ScholarshipBookmarkRead.model_validate(created)


@router.get(
    "/bookmarks",
    response_model=list[ScholarshipBookmarkRead],
    summary="Get saved/bookmarked scholarships",
)
def get_bookmarks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[ScholarshipBookmarkRead]:
    """Return all bookmarked scholarships for the authenticated user."""

    repo = ScholarshipBookmarkRepository(db)
    bookmarks = repo.list_by_user(current_user.id)
    return [ScholarshipBookmarkRead.model_validate(b) for b in bookmarks]


# ── Dashboard ───────────────────────────────────────────────────────

@router.get(
    "/dashboard/summary",
    response_model=ScholarshipDashboardResponse,
    summary="Get scholarship dashboard summary",
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ScholarshipDashboardResponse:
    """Return dashboard summary for the authenticated user."""

    profile_repo = ScholarshipProfileRepository(db)
    profile = profile_repo.get_by_user_id(current_user.id)

    profile_completion = 0.0
    missing_docs: list[str] = []
    if profile:
        profile_completion = _calculate_profile_completion(profile)
        missing_docs = _get_missing_documents(profile)

    bookmark_repo = ScholarshipBookmarkRepository(db)
    bookmarks = bookmark_repo.list_by_user(current_user.id)

    recommendations: list[ScholarshipRecommendationResponse] = []
    avg_score = 0.0
    upcoming_deadlines = 0

    if profile:
        try:
            service = ScholarshipRecommendationService()
            results = service.get_recommendations(db=db, current_user=current_user)
            recommendations = [r.to_response() for r in results[:5]]
            if results:
                avg_score = round(sum(r.match_score for r in results) / len(results), 1)
            upcoming_deadlines = sum(1 for r in results if r.deadline is not None)
        except ScholarshipProfileNotFoundError:
            pass

    return ScholarshipDashboardResponse(
        total_recommendations=len(recommendations),
        total_bookmarks=len(bookmarks),
        upcoming_deadlines=upcoming_deadlines,
        profile_completion=profile_completion,
        average_match_score=avg_score,
        top_recommendations=recommendations,
        recent_bookmarks=[ScholarshipBookmarkRead.model_validate(b) for b in bookmarks[:5]],
        missing_documents=missing_docs,
    )
