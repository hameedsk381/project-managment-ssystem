from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CommentBase(BaseModel):
  comment: str = Field(min_length=1)

  @field_validator("comment")
  @classmethod
  def normalize_comment(cls, value: str) -> str:
    stripped = value.strip()
    if not stripped:
      raise ValueError("Comment cannot be empty")
    return stripped


class CommentCreate(CommentBase):
  pass


class CommentUpdate(CommentBase):
  pass


class CommentResponse(CommentBase):
  id: int
  task_id: int
  user_id: int
  created_at: datetime
  updated_at: datetime

  model_config = ConfigDict(from_attributes=True)
