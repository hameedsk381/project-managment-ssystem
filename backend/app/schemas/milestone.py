from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class MilestoneBase(BaseModel):
  project_id: int
  title: str = Field(min_length=1, max_length=255)
  description: str | None = None
  due_date: date | None = None
  status: str = Field(min_length=1, max_length=100)

  @model_validator(mode="after")
  def normalize_fields(self) -> "MilestoneBase":
    self.title = self.title.strip()
    self.status = self.status.strip()
    self.description = self.description.strip() if self.description else self.description
    return self


class MilestoneCreate(MilestoneBase):
  pass


class MilestoneUpdate(BaseModel):
  project_id: int | None = None
  title: str | None = Field(default=None, min_length=1, max_length=255)
  description: str | None = None
  due_date: date | None = None
  status: str | None = Field(default=None, min_length=1, max_length=100)

  @model_validator(mode="after")
  def normalize_fields(self) -> "MilestoneUpdate":
    if self.title is not None:
      self.title = self.title.strip()
    if self.status is not None:
      self.status = self.status.strip()
    if self.description:
      self.description = self.description.strip()
    return self


class MilestoneStatusUpdate(BaseModel):
  status: str = Field(min_length=1, max_length=100)


class MilestoneResponse(MilestoneBase):
  id: int
  created_at: datetime
  updated_at: datetime

  model_config = ConfigDict(from_attributes=True)
