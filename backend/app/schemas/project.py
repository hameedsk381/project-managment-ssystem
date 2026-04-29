from pydantic import BaseModel
from typing import Optional, List
from ..models.project import ProjectStatus

class ProjectBase(BaseModel):
    name: str
    identifier: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING

class ProjectCreate(ProjectBase):
    team_id: int
    lead_id: int

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    progress: Optional[float] = None

class Project(ProjectBase):
    id: int
    progress: float
    team_id: int
    lead_id: int

    class Config:
        from_attributes = True
