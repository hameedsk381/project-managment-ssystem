from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.milestone import Milestone
from app.models.notification import Notification
from app.models.project import Project
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate


def _ensure_project_exists(db: Session, project_id: int) -> Project:
  project = db.get(Project, project_id)
  if not project:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
  return project


def _ensure_user_exists(db: Session, user_id: int | None, detail: str) -> None:
  if user_id is not None and not db.get(User, user_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


def _ensure_milestone_matches_project(
  db: Session,
  milestone_id: int | None,
  project_id: int,
) -> Milestone | None:
  if milestone_id is None:
    return None

  milestone = db.get(Milestone, milestone_id)
  if not milestone:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Milestone not found")
  if milestone.project_id != project_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Milestone does not belong to the selected project",
    )
  return milestone


def create_task(db: Session, payload: TaskCreate) -> Task:
  _ensure_project_exists(db, payload.project_id)
  _ensure_milestone_matches_project(db, payload.milestone_id, payload.project_id)
  _ensure_user_exists(db, payload.assigned_to, "Assignee not found")
  _ensure_user_exists(db, payload.created_by, "Task creator not found")

  task = Task(**payload.model_dump())
  db.add(task)
  db.commit()
  db.refresh(task)
  if task.assigned_to is not None:
    db.add(
      Notification(
        user_id=task.assigned_to,
        title="New task assigned",
        message=f"You were assigned to task '{task.title}'.",
      )
    )
    db.commit()
  return task


def list_tasks(
  db: Session,
  search: str | None = None,
  status_filter: str | None = None,
  priority: str | None = None,
) -> list[Task]:
  query = db.query(Task)

  if search:
    query = query.filter(Task.title.ilike(f"%{search}%"))
  if status_filter:
    query = query.filter(Task.status == status_filter)
  if priority:
    query = query.filter(Task.priority == priority)

  return query.order_by(Task.created_at.desc()).all()


def list_project_tasks(db: Session, project_id: int) -> list[Task]:
  _ensure_project_exists(db, project_id)
  return db.query(Task).filter(Task.project_id == project_id).order_by(Task.created_at.desc()).all()


def get_task_or_404(db: Session, task_id: int) -> Task:
  task = db.get(Task, task_id)
  if not task:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
  return task


def update_task(db: Session, task_id: int, payload: TaskUpdate) -> Task:
  task = get_task_or_404(db, task_id)
  data = payload.model_dump(exclude_unset=True)
  project_id = data.get("project_id", task.project_id)
  _ensure_project_exists(db, project_id)
  _ensure_milestone_matches_project(db, data.get("milestone_id", task.milestone_id), project_id)
  _ensure_user_exists(db, data.get("assigned_to", task.assigned_to), "Assignee not found")
  _ensure_user_exists(db, data.get("created_by", task.created_by), "Task creator not found")

  previous_assignee = task.assigned_to
  for field, value in data.items():
    setattr(task, field, value)
  db.commit()
  db.refresh(task)
  if "assigned_to" in data and task.assigned_to is not None and task.assigned_to != previous_assignee:
    db.add(
      Notification(
        user_id=task.assigned_to,
        title="Task assignment updated",
        message=f"You were assigned to task '{task.title}'.",
      )
    )
    db.commit()
  return task


def update_task_status(db: Session, task_id: int, status_value: str) -> Task:
  task = get_task_or_404(db, task_id)
  task.status = status_value
  db.commit()
  db.refresh(task)
  return task


def assign_task(db: Session, task_id: int, assignee_id: int | None) -> Task:
  task = get_task_or_404(db, task_id)
  _ensure_user_exists(db, assignee_id, "Assignee not found")
  task.assigned_to = assignee_id
  db.commit()
  db.refresh(task)
  if assignee_id is not None:
    db.add(
      Notification(
        user_id=assignee_id,
        title="Task assigned",
        message=f"You were assigned to task '{task.title}'.",
      )
    )
    db.commit()
  return task


def delete_task(db: Session, task_id: int) -> None:
  task = get_task_or_404(db, task_id)
  db.delete(task)
  db.commit()
