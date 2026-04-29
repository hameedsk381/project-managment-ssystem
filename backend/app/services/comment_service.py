from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.models.notification import Notification
from app.models.task import Task
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentUpdate


def _get_task_or_404(db: Session, task_id: int) -> Task:
  task = db.get(Task, task_id)
  if not task:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
  return task


def get_comment_or_404(db: Session, comment_id: int) -> Comment:
  comment = db.get(Comment, comment_id)
  if not comment:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
  return comment


def create_comment(db: Session, task_id: int, user: User, payload: CommentCreate) -> Comment:
  task = _get_task_or_404(db, task_id)
  comment = Comment(task_id=task.id, user_id=user.id, comment=payload.comment)
  db.add(comment)
  db.commit()
  db.refresh(comment)

  if task.assigned_to and task.assigned_to != user.id:
    db.add(
      Notification(
        user_id=task.assigned_to,
        title="New task comment",
        message=f"{user.name} commented on task '{task.title}'.",
      )
    )
    db.commit()

  return comment


def list_task_comments(db: Session, task_id: int) -> list[Comment]:
  _get_task_or_404(db, task_id)
  return db.query(Comment).filter(Comment.task_id == task_id).order_by(Comment.created_at.asc()).all()


def update_comment(db: Session, comment_id: int, user: User, payload: CommentUpdate) -> Comment:
  comment = get_comment_or_404(db, comment_id)
  if comment.user_id != user.id and user.role != "Admin":
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You are not allowed to update this comment",
    )

  comment.comment = payload.comment
  db.commit()
  db.refresh(comment)
  return comment


def delete_comment(db: Session, comment_id: int, user: User) -> None:
  comment = get_comment_or_404(db, comment_id)
  if comment.user_id != user.id and user.role != "Admin":
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You are not allowed to delete this comment",
    )

  db.delete(comment)
  db.commit()
