from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.models.user import User


def list_notifications_for_user(db: Session, user: User) -> list[Notification]:
  return (
    db.query(Notification)
    .filter(Notification.user_id == user.id)
    .order_by(Notification.created_at.desc())
    .all()
  )


def list_unread_notifications_for_user(db: Session, user: User) -> list[Notification]:
  return (
    db.query(Notification)
    .filter(Notification.user_id == user.id, Notification.is_read.is_(False))
    .order_by(Notification.created_at.desc())
    .all()
  )


def get_notification_for_user_or_404(db: Session, notification_id: int, user: User) -> Notification:
  notification = db.get(Notification, notification_id)
  if not notification:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
  if notification.user_id != user.id:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
  return notification


def mark_notification_read(db: Session, notification_id: int, user: User) -> Notification:
  notification = get_notification_for_user_or_404(db, notification_id, user)
  notification.is_read = True
  db.commit()
  db.refresh(notification)
  return notification


def mark_all_notifications_read(db: Session, user: User) -> dict:
  db.query(Notification).filter(Notification.user_id == user.id, Notification.is_read.is_(False)).update(
    {Notification.is_read: True},
    synchronize_session=False,
  )
  db.commit()
  return {"message": "All notifications marked as read"}


def delete_notification(db: Session, notification_id: int, user: User) -> None:
  notification = get_notification_for_user_or_404(db, notification_id, user)
  db.delete(notification)
  db.commit()
