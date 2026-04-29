from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.deps import require_authenticated_user
from app.database import get_db
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentResponse, CommentUpdate
from app.services.comment_service import create_comment, delete_comment, list_task_comments, update_comment


router = APIRouter(tags=["Comments"])


@router.post("/tasks/{task_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment_endpoint(
  task_id: int,
  payload: CommentCreate,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return create_comment(db, task_id, current_user, payload)


@router.get("/tasks/{task_id}/comments", response_model=list[CommentResponse])
def list_task_comments_endpoint(
  task_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_authenticated_user),
):
  return list_task_comments(db, task_id)


@router.put("/comments/{comment_id}", response_model=CommentResponse)
def update_comment_endpoint(
  comment_id: int,
  payload: CommentUpdate,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return update_comment(db, comment_id, current_user, payload)


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment_endpoint(
  comment_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  delete_comment(db, comment_id, current_user)
  return Response(status_code=status.HTTP_204_NO_CONTENT)
