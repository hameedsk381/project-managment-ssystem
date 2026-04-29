from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.core.deps import require_admin_or_project_manager, require_authenticated_user
from app.database import get_db
from app.models.user import User
from app.schemas.task import TaskAssignUpdate, TaskCreate, TaskResponse, TaskStatusUpdate, TaskUpdate
from app.services.task_service import (
  assign_task,
  create_task,
  delete_task,
  get_task_or_404,
  list_project_tasks,
  list_tasks,
  update_task,
  update_task_status,
)


router = APIRouter(tags=["Tasks"])


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task_endpoint(
  payload: TaskCreate,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  if payload.created_by is None:
    payload = payload.model_copy(update={"created_by": current_user.id})
  return create_task(db, payload)


@router.get("/tasks", response_model=list[TaskResponse])
def list_tasks_endpoint(
  search: str | None = Query(default=None),
  status_filter: str | None = Query(default=None, alias="status"),
  priority: str | None = Query(default=None),
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return list_tasks(db, search=search, status_filter=status_filter, priority=priority)


@router.get("/projects/{project_id}/tasks", response_model=list[TaskResponse])
def list_project_tasks_endpoint(
  project_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return list_project_tasks(db, project_id)


@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task_endpoint(
  task_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return get_task_or_404(db, task_id)


@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task_endpoint(
  task_id: int,
  payload: TaskUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return update_task(db, task_id, payload)


@router.patch("/tasks/{task_id}/status", response_model=TaskResponse)
def update_task_status_endpoint(
  task_id: int,
  payload: TaskStatusUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return update_task_status(db, task_id, payload.status)


@router.patch("/tasks/{task_id}/assign", response_model=TaskResponse)
def assign_task_endpoint(
  task_id: int,
  payload: TaskAssignUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin_or_project_manager),
):
  return assign_task(db, task_id, payload.assigned_to)


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_endpoint(
  task_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  delete_task(db, task_id)
  return Response(status_code=status.HTTP_204_NO_CONTENT)
