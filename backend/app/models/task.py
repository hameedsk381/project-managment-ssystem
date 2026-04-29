from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Task(Base):
  __tablename__ = "tasks"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
  milestone_id: Mapped[int | None] = mapped_column(ForeignKey("milestones.id"), nullable=True)
  title: Mapped[str] = mapped_column(String(255), nullable=False)
  description: Mapped[str | None] = mapped_column(Text, nullable=True)
  status: Mapped[str] = mapped_column(String(100), nullable=False, default="todo")
  priority: Mapped[str] = mapped_column(String(100), nullable=False, default="medium")
  assigned_to: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
  created_by: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
  due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime,
    default=datetime.utcnow,
    onupdate=datetime.utcnow,
    nullable=False,
  )

  project = relationship("Project", back_populates="tasks")
  milestone = relationship("Milestone", back_populates="tasks")
  assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_tasks")
  creator = relationship("User", foreign_keys=[created_by], back_populates="created_tasks")
  comments = relationship("Comment", back_populates="task", cascade="all, delete-orphan")
