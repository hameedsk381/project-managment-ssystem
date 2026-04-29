from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.models.user import User


def authenticate_user(db: Session, email: str, password: str) -> User:
  user = db.query(User).filter(User.email == email).first()
  if not user or not verify_password(password, user.password_hash):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Incorrect email or password",
    )
  if not user.is_active:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User is inactive")
  return user


def login_user(db: Session, email: str, password: str) -> dict:
  user = authenticate_user(db, email, password)
  token = create_access_token(user.id)
  return {"access_token": token, "token_type": "bearer"}
