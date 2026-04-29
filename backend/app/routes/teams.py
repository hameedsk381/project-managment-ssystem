from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User, Team
from ..dependencies import get_current_active_user
from pydantic import BaseModel

class TeamBase(BaseModel):
    name: str
    description: str | None = None

class TeamCreate(TeamBase):
    lead_id: int

class Team(TeamBase):
    id: int
    lead_id: int
    class Config:
        from_attributes = True

router = APIRouter()

@router.get("/", response_model=List[Team])
def read_teams(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(Team).all()

@router.post("/", response_model=Team)
def create_team(
    team_in: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    team = Team(**team_in.dict())
    db.add(team)
    db.commit()
    db.refresh(team)
    return team
