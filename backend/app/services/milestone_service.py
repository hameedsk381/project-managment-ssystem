from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.milestone import Milestone
from app.models.project import Project
from app.schemas.milestone import MilestoneCreate, MilestoneUpdate


def _ensure_project_exists(db: Session, project_id: int) -> Project:
  project = db.get(Project, project_id)
  if not project:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
  return project


def create_milestone(db: Session, payload: MilestoneCreate) -> Milestone:
  _ensure_project_exists(db, payload.project_id)
  milestone = Milestone(**payload.model_dump())
  db.add(milestone)
  db.commit()
  db.refresh(milestone)
  return milestone


def list_project_milestones(db: Session, project_id: int) -> list[Milestone]:
  _ensure_project_exists(db, project_id)
  return (
    db.query(Milestone)
    .filter(Milestone.project_id == project_id)
    .order_by(Milestone.created_at.desc())
    .all()
  )


def get_milestone_or_404(db: Session, milestone_id: int) -> Milestone:
  milestone = db.get(Milestone, milestone_id)
  if not milestone:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Milestone not found")
  return milestone


def update_milestone(db: Session, milestone_id: int, payload: MilestoneUpdate) -> Milestone:
  milestone = get_milestone_or_404(db, milestone_id)
  data = payload.model_dump(exclude_unset=True)
  project_id = data.get("project_id")
  if project_id is not None:
    _ensure_project_exists(db, project_id)

  for field, value in data.items():
    setattr(milestone, field, value)
  db.commit()
  db.refresh(milestone)
  return milestone


def update_milestone_status(db: Session, milestone_id: int, status_value: str) -> Milestone:
  milestone = get_milestone_or_404(db, milestone_id)
  milestone.status = status_value
  db.commit()
  db.refresh(milestone)
  return milestone


def delete_milestone(db: Session, milestone_id: int) -> None:
  milestone = get_milestone_or_404(db, milestone_id)
  if milestone.tasks:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Cannot delete a milestone that still has tasks",
    )

  db.delete(milestone)
  db.commit()
