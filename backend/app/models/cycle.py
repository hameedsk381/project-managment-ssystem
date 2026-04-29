from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from ..database import Base

class Cycle(Base):
    __tablename__ = "cycles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    is_active = Column(Boolean, default=False)
    
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    project = relationship("Project", back_populates="cycles")
    issues = relationship("Issue", back_populates="cycle")
