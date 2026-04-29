from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class TaskBase(BaseModel):
  project_id: int
  milestone_id: int | None = None
  title: str = Field(min_length=1, max_length=255)
  description: str | None = None
  status: str = Field(min_length=1, max_length=100)
  priority: str = Field(min_length=1, max_length=100)
  assigned_to: int | None = None
  created_by: int | None = None
  due_date: date | None = None

  @model_validator(mode="after")
  def normalize_fields(self) -> "TaskBase":
    self.title = self.title.strip()
    self.status = self.status.strip()
    self.priority = self.priority.strip()
    self.description = self.description.strip() if self.description else self.description
    return self


class TaskCreate(TaskBase):
  pass


class TaskUpdate(BaseModel):
  project_id: int | None = None
  milestone_id: int | None = None
  title: str | None = Field(default=None, min_length=1, max_length=255)
  description: str | None = None
  status: str | None = Field(default=None, min_length=1, max_length=100)
  priority: str | None = Field(default=None, min_length=1, max_length=100)
  assigned_to: int | None = None
  created_by: int | None = None
  due_date: date | None = None

  @model_validator(mode="after")
  def normalize_fields(self) -> "TaskUpdate":
    if self.title is not None:
      self.title = self.title.strip()
    if self.status is not None:
      self.status = self.status.strip()
    if self.priority is not None:
      self.priority = self.priority.strip()
    if self.description:
      self.description = self.description.strip()
    return self


class TaskStatusUpdate(BaseModel):
  status: str = Field(min_length=1, max_length=100)


class TaskAssignUpdate(BaseModel):
  assigned_to: int | None = None


class TaskResponse(TaskBase):
  id: int
  created_at: datetime
  updated_at: datetime

  model_config = ConfigDict(from_attributes=True)
