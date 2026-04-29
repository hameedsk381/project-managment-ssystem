from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from ..models.issue import IssueState, IssuePriority

class IssueBase(BaseModel):
    title: str
    description: Optional[str] = None
    state: IssueState = IssueState.BACKLOG
    priority: IssuePriority = IssuePriority.NONE

class IssueCreate(IssueBase):
    project_id: int
    assignee_id: Optional[int] = None
    cycle_id: Optional[int] = None

class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    state: Optional[IssueState] = None
    priority: Optional[IssuePriority] = None
    assignee_id: Optional[int] = None

class Issue(IssueBase):
    id: int
    project_id: int
    assignee_id: Optional[int]
    creator_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
