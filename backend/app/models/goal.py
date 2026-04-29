from sqlalchemy import Column, Integer, String, ForeignKey, Float, Enum, DateTime
from sqlalchemy.orm import relationship
from ..database import Base
import enum

class GoalStatus(str, enum.Enum):
    ON_TRACK = "on_track"
    AT_RISK = "at_risk"
    COMPLETED = "completed"

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    progress = Column(Float, default=0.0)
    status = Column(Enum(GoalStatus), default=GoalStatus.ON_TRACK)
    target_date = Column(DateTime)
    
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="goals")
