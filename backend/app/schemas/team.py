from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class TeamBase(BaseModel):
  name: str = Field(min_length=1, max_length=255)
  description: str | None = None

  @field_validator("name")
  @classmethod
  def validate_name(cls, value: str) -> str:
    stripped = value.strip()
    if not stripped:
      raise ValueError("Name cannot be empty")
    return stripped

  @field_validator("description")
  @classmethod
  def normalize_description(cls, value: str | None) -> str | None:
    return value.strip() if value else value


class TeamCreate(TeamBase):
  pass


class TeamUpdate(BaseModel):
  name: str | None = Field(default=None, min_length=1, max_length=255)
  description: str | None = None

  @field_validator("name")
  @classmethod
  def validate_optional_name(cls, value: str | None) -> str | None:
    if value is None:
      return value
    stripped = value.strip()
    if not stripped:
      raise ValueError("Name cannot be empty")
    return stripped

  @field_validator("description")
  @classmethod
  def normalize_optional_description(cls, value: str | None) -> str | None:
    return value.strip() if value else value


class TeamResponse(TeamBase):
  id: int
  created_at: datetime

  model_config = ConfigDict(from_attributes=True)
