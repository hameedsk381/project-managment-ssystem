from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.goal import Goal as GoalModel
from ..dependencies import get_current_active_user
from ..models.user import User
from pydantic import BaseModel
from datetime import datetime

class GoalBase(BaseModel):
    title: str
    description: str | None = None
    status: str = "on_track"
    target_date: datetime | None = None

class GoalCreate(GoalBase):
    project_id: int

class Goal(GoalBase):
    id: int
    progress: float
    project_id: int
    class Config:
        from_attributes = True

router = APIRouter()

@router.get("/", response_model=List[Goal])
def read_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(GoalModel).all()

@router.post("/", response_model=Goal)
def create_goal(
    goal_in: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    goal = GoalModel(**goal_in.dict())
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal
