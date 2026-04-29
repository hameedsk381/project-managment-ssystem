from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.deps import require_authenticated_user
from app.database import get_db
from app.models.user import User
from app.schemas.notification import NotificationResponse
from app.services.notification_service import (
  delete_notification,
  list_notifications_for_user,
  list_unread_notifications_for_user,
  mark_all_notifications_read,
  mark_notification_read,
)


router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("", response_model=list[NotificationResponse])
def list_notifications_endpoint(
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return list_notifications_for_user(db, current_user)


@router.get("/unread", response_model=list[NotificationResponse])
def list_unread_notifications_endpoint(
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return list_unread_notifications_for_user(db, current_user)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read_endpoint(
  notification_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return mark_notification_read(db, notification_id, current_user)


@router.patch("/read-all")
def mark_all_notifications_read_endpoint(
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  return mark_all_notifications_read(db, current_user)


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_notification_endpoint(
  notification_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(require_authenticated_user),
):
  delete_notification(db, notification_id, current_user)
  return Response(status_code=status.HTTP_204_NO_CONTENT)
