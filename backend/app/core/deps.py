from collections.abc import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import get_db
from app.models.user import User


bearer_scheme = HTTPBearer(auto_error=False)
ADMIN_ROLE = "Admin"
PROJECT_MANAGER_ROLE = "Project Manager"


def get_current_user(
  db: Session = Depends(get_db),
  credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> User:
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )

  try:
    if credentials is None:
      raise credentials_exception

    payload = jwt.decode(
      credentials.credentials,
      settings.jwt_secret_key,
      algorithms=[settings.jwt_algorithm],
    )
    user_id = int(payload.get("sub"))
  except (JWTError, TypeError, ValueError):
    raise credentials_exception

  user = db.get(User, user_id)
  if not user or not user.is_active:
    raise credentials_exception

  return user


def require_roles(*allowed_roles: str) -> Callable:
  def checker(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in allowed_roles:
      raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have access to this resource",
      )
    return current_user

  return checker


def require_authenticated_user(current_user: User = Depends(get_current_user)) -> User:
  return current_user


def require_admin(current_user: User = Depends(get_current_user)) -> User:
  return require_roles(ADMIN_ROLE)(current_user)


def require_admin_or_project_manager(current_user: User = Depends(get_current_user)) -> User:
  return require_roles(ADMIN_ROLE, PROJECT_MANAGER_ROLE)(current_user)
