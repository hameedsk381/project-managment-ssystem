from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.team import Team
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectUpdate


def _validate_project_references(db: Session, owner_id: int | None, team_id: int | None) -> None:
  if owner_id is not None and not db.get(User, owner_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project owner not found")
  if team_id is not None and not db.get(Team, team_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")


def create_project(db: Session, payload: ProjectCreate) -> Project:
  _validate_project_references(db, payload.owner_id, payload.team_id)
  project = Project(**payload.model_dump())
  db.add(project)
  db.commit()
  db.refresh(project)
  return project


def list_projects(
  db: Session,
  search: str | None = None,
  status_filter: str | None = None,
  priority: str | None = None,
) -> list[Project]:
  query = db.query(Project)

  if search:
    query = query.filter(Project.title.ilike(f"%{search}%"))
  if status_filter:
    query = query.filter(Project.status == status_filter)
  if priority:
    query = query.filter(Project.priority == priority)

  return query.order_by(Project.created_at.desc()).all()


def get_project_or_404(db: Session, project_id: int) -> Project:
  project = db.get(Project, project_id)
  if not project:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
  return project


def update_project(db: Session, project_id: int, payload: ProjectUpdate) -> Project:
  project = get_project_or_404(db, project_id)
  data = payload.model_dump(exclude_unset=True)
  _validate_project_references(
    db,
    data.get("owner_id", project.owner_id),
    data.get("team_id", project.team_id),
  )
  start_date = data.get("start_date", project.start_date)
  end_date = data.get("end_date", project.end_date)
  if start_date and end_date and end_date < start_date:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="end_date cannot be earlier than start_date",
    )

  for field, value in data.items():
    setattr(project, field, value)
  db.commit()
  db.refresh(project)
  return project


def archive_project(db: Session, project_id: int) -> Project:
  project = get_project_or_404(db, project_id)
  if project.is_archived:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project is already archived")
  project.is_archived = True
  project.status = "archived"
  db.commit()
  db.refresh(project)
  return project


def delete_project(db: Session, project_id: int) -> None:
  project = get_project_or_404(db, project_id)
  db.delete(project)
  db.commit()
