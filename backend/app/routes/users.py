from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.core.deps import require_admin
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.services.user_service import create_user, deactivate_user, get_user_or_404, list_users, update_user


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user_endpoint(
  payload: UserCreate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin),
):
  return create_user(db, payload)


@router.get("", response_model=list[UserResponse])
def list_users_endpoint(
  search: str | None = Query(default=None),
  role: str | None = Query(default=None),
  status_filter: str | None = Query(default=None, alias="status"),
  db: Session = Depends(get_db),
  _: User = Depends(require_admin),
):
  return list_users(db, search=search, role=role, status_filter=status_filter)


@router.get("/{user_id}", response_model=UserResponse)
def get_user_endpoint(
  user_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin),
):
  return get_user_or_404(db, user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update_user_endpoint(
  user_id: int,
  payload: UserUpdate,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin),
):
  return update_user(db, user_id, payload)


@router.patch("/{user_id}/deactivate", response_model=UserResponse)
def deactivate_user_endpoint(
  user_id: int,
  db: Session = Depends(get_db),
  _: User = Depends(require_admin),
):
  return deactivate_user(db, user_id)
