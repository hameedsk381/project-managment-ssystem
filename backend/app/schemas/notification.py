from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class NotificationCreate(BaseModel):
  user_id: int
  title: str = Field(min_length=1, max_length=255)
  message: str = Field(min_length=1)

  @field_validator("title", "message")
  @classmethod
  def normalize_fields(cls, value: str) -> str:
    stripped = value.strip()
    if not stripped:
      raise ValueError("Field cannot be empty")
    return stripped


class NotificationUpdate(BaseModel):
  is_read: bool


class NotificationResponse(BaseModel):
  id: int
  user_id: int
  title: str
  message: str
  is_read: bool
  created_at: datetime

  model_config = ConfigDict(from_attributes=True)
