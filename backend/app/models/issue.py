from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, func
from sqlalchemy.orm import relationship
from ..database import Base
import enum

class IssueState(str, enum.Enum):
    BACKLOG = "backlog"
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    DONE = "done"

class IssuePriority(str, enum.Enum):
    URGENT = "urgent"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    NONE = "none"

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    state = Column(Enum(IssueState), default=IssueState.BACKLOG)
    priority = Column(Enum(IssuePriority), default=IssuePriority.NONE)
    
    project_id = Column(Integer, ForeignKey("projects.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"))
    creator_id = Column(Integer, ForeignKey("users.id"))
    cycle_id = Column(Integer, ForeignKey("cycles.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    project = relationship("Project", back_populates="issues")
    assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_issues")
    creator = relationship("User", foreign_keys=[creator_id], back_populates="created_issues")
    cycle = relationship("Cycle", back_populates="issues")
