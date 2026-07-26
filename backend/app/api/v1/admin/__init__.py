"""Admin API routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models import RoleEnum, User
from app.modules.scholarship.sync.scheduler import ScholarshipSyncScheduler
from app.repositories.scholarship import ScholarshipRepository
from app.schemas.scholarship import ScholarshipDetailResponse

router = APIRouter(prefix="/admin", tags=["admin"])


def _require_admin(current_user: User) -> None:
	if current_user.role != RoleEnum.ADMIN:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")


@router.post("/scholarships/sync")
def sync_scholarships(
	db: Session = Depends(get_db),
	current_user: User = Depends(get_current_user),
) -> dict[str, int | str]:
	_require_admin(current_user)
	summary = ScholarshipSyncScheduler().sync(db)
	return {
		"message": "Scholarship synchronization completed",
		"inserted": summary.inserted,
		"updated": summary.updated,
		"skipped": summary.skipped,
		"failed": summary.failed,
	}


@router.get("/scholarships", response_model=list[ScholarshipDetailResponse])
def list_scholarships(
	db: Session = Depends(get_db),
	current_user: User = Depends(get_current_user),
) -> list[ScholarshipDetailResponse]:
	_require_admin(current_user)
	repository = ScholarshipRepository(db)
	return repository.find_all()

from app.api.v1.admin.sync import router as sync_router
router.include_router(sync_router)
