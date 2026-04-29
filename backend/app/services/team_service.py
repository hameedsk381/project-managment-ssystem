from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.team import Team
from app.schemas.team import TeamCreate, TeamUpdate


def create_team(db: Session, payload: TeamCreate) -> Team:
  existing_team = db.query(Team).filter(Team.name == payload.name).first()
  if existing_team:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Team already exists")

  team = Team(**payload.model_dump())
  db.add(team)
  db.commit()
  db.refresh(team)
  return team


def list_teams(db: Session) -> list[Team]:
  return db.query(Team).order_by(Team.created_at.desc()).all()


def get_team_or_404(db: Session, team_id: int) -> Team:
  team = db.get(Team, team_id)
  if not team:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")
  return team


def update_team(db: Session, team_id: int, payload: TeamUpdate) -> Team:
  team = get_team_or_404(db, team_id)
  data = payload.model_dump(exclude_unset=True)

  if "name" in data:
    existing_team = db.query(Team).filter(Team.name == data["name"], Team.id != team_id).first()
    if existing_team:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Team name already exists")

  for field, value in data.items():
    setattr(team, field, value)
  db.commit()
  db.refresh(team)
  return team


def delete_team(db: Session, team_id: int) -> None:
  team = get_team_or_404(db, team_id)
  if team.projects:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Cannot delete a team that still has projects",
    )

  db.delete(team)
  db.commit()
