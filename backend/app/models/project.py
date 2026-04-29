from sqlalchemy import Column, Integer, String, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship
from ..database import Base
import enum

class ProjectStatus(str, enum.Enum):
    PLANNING = "planning"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    identifier = Column(String, unique=True, index=True) # e.g., "APO"
    description = Column(String)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PLANNING)
    progress = Column(Float, default=0.0)
    
    team_id = Column(Integer, ForeignKey("teams.id"))
    lead_id = Column(Integer, ForeignKey("users.id"))
    
    team = relationship("Team", back_populates="projects")
    lead = relationship("User", back_populates="led_projects")
    issues = relationship("Issue", back_populates="project")
    cycles = relationship("Cycle", back_populates="project")
    goals = relationship("Goal", back_populates="project")
