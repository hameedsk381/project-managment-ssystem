from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Milestone(Base):
  __tablename__ = "milestones"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
  title: Mapped[str] = mapped_column(String(255), nullable=False)
  description: Mapped[str | None] = mapped_column(Text, nullable=True)
  due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
  status: Mapped[str] = mapped_column(String(100), nullable=False, default="planned")
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime,
    default=datetime.utcnow,
    onupdate=datetime.utcnow,
    nullable=False,
  )

  project = relationship("Project", back_populates="milestones")
  tasks = relationship("Task", back_populates="milestone", cascade="save-update")
