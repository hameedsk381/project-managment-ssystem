from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def create_user(db: Session, payload: UserCreate) -> User:
  existing_user = db.query(User).filter(User.email == payload.email).first()
  if existing_user:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")

  user = User(
    name=payload.name,
    email=payload.email,
    password_hash=hash_password(payload.password),
    role=payload.role,
    is_active=payload.is_active,
  )
  db.add(user)
  db.commit()
  db.refresh(user)
  return user


def list_users(
  db: Session,
  search: str | None = None,
  role: str | None = None,
  status_filter: str | None = None,
) -> list[User]:
  query = db.query(User)

  if search:
    like_search = f"%{search}%"
    query = query.filter((User.name.ilike(like_search)) | (User.email.ilike(like_search)))
  if role:
    query = query.filter(User.role == role)
  if status_filter == "active":
    query = query.filter(User.is_active.is_(True))
  if status_filter == "inactive":
    query = query.filter(User.is_active.is_(False))

  return query.order_by(User.created_at.desc()).all()


def get_user_or_404(db: Session, user_id: int) -> User:
  user = db.get(User, user_id)
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user


def update_user(db: Session, user_id: int, payload: UserUpdate) -> User:
  user = get_user_or_404(db, user_id)
  data = payload.model_dump(exclude_unset=True)

  if "email" in data:
    existing_user = db.query(User).filter(User.email == data["email"], User.id != user_id).first()
    if existing_user:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")

  if "password" in data:
    user.password_hash = hash_password(data.pop("password"))

  for field, value in data.items():
    setattr(user, field, value)

  db.commit()
  db.refresh(user)
  return user


def deactivate_user(db: Session, user_id: int) -> User:
  user = get_user_or_404(db, user_id)
  if user.email == "admin@example.com":
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Default admin user cannot be deactivated",
    )
  user.is_active = False
  db.commit()
  db.refresh(user)
  return user
