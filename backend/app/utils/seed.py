from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User


def seed_admin_user(db: Session) -> None:
  existing_admin = db.query(User).filter(User.email == "admin@example.com").first()
  if existing_admin:
    return

  admin_user = User(
    name="Admin User",
    email="admin@example.com",
    password_hash=hash_password("admin123"),
    role="Admin",
    is_active=True,
  )
  db.add(admin_user)
  db.commit()
