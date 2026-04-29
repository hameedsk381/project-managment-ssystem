from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from ..database import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    PROJECT_MANAGER = "project_manager"
    TEAM_LEAD = "team_lead"
    MEMBER = "member"
    VIEWER = "viewer"

# Association table for Team Members
team_members = Table(
    "team_members",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("team_id", ForeignKey("teams.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), default=UserRole.MEMBER)
    
    teams = relationship("Team", secondary=team_members, back_populates="members")
    led_teams = relationship("Team", back_populates="lead")
    led_projects = relationship("Project", back_populates="lead")
    assigned_issues = relationship("Issue", back_populates="assignee")
    created_issues = relationship("Issue", back_populates="creator")

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    lead_id = Column(Integer, ForeignKey("users.id"))
    
    lead = relationship("User", back_populates="led_teams")
    members = relationship("User", secondary=team_members, back_populates="teams")
    projects = relationship("Project", back_populates="team")
