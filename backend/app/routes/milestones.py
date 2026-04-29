from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.deps import require_admin_or_project_manager, require_authenticated_user
from app.database import get_db
from app.models.user import User
from app.schemas.milestone import MilestoneCreate, MilestoneResponse, MilestoneStatusUpdate, MilestoneUpdate
from app.services.milestone_service import (
  create_milestone,
  delete_milestone,
  get_milestone_or_404,
  list_project_milestones,
  update_milestone,
  update_milestone_status,
)


router = APIRouter(tags=["Milestones"])


@router.post("/milestones", response_model=MilestoneResponse, status_code=status.HTTP_201_CREATED)
def create_milestone_endpoint(
  payload: MilestoneCreate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin_or_project_manager),
):
  return create_milestone(db, payload)


@router.get("/projects/{project_id}/milestones", response_model=list[MilestoneResponse])
def list_project_milestones_endpoint(
  project_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return list_project_milestones(db, project_id)


@router.get("/milestones/{milestone_id}", response_model=MilestoneResponse)
def get_milestone_endpoint(
  milestone_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return get_milestone_or_404(db, milestone_id)


@router.put("/milestones/{milestone_id}", response_model=MilestoneResponse)
def update_milestone_endpoint(
  milestone_id: int,
  payload: MilestoneUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin_or_project_manager),
):
  return update_milestone(db, milestone_id, payload)


@router.patch("/milestones/{milestone_id}/status", response_model=MilestoneResponse)
def update_milestone_status_endpoint(
  milestone_id: int,
  payload: MilestoneStatusUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin_or_project_manager),
):
  return update_milestone_status(db, milestone_id, payload.status)


@router.delete("/milestones/{milestone_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_milestone_endpoint(
  milestone_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin_or_project_manager),
):
  delete_milestone(db, milestone_id)
  return Response(status_code=status.HTTP_204_NO_CONTENT)
