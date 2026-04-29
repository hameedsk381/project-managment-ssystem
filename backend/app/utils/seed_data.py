from sqlalchemy.orm import Session
from ..database import SessionLocal, engine, Base
from ..models.user import User, UserRole
from ..models.team import Team
from ..models.project import Project, ProjectStatus
from ..models.issue import Issue, IssueState, IssuePriority
from ..core.security import get_password_hash
from datetime import datetime, timedelta

def seed_db():
    db = SessionLocal()
    
    # Check if admin already exists
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if admin:
        print("Database already seeded.")
        return

    # 1. Create Admin User
    admin = User(
        email="admin@example.com",
        hashed_password=get_password_hash("admin123"),
        full_name="System Admin",
        role=UserRole.ADMIN
    )
    db.add(admin)
    
    # 2. Create Project Manager
    pm = User(
        email="pm@example.com",
        hashed_password=get_password_hash("pm123"),
        full_name="Sarah Chen",
        role=UserRole.PROJECT_MANAGER
    )
    db.add(pm)
    
    db.commit()
    db.refresh(admin)
    db.refresh(pm)

    # 3. Create a Team
    team = Team(
        name="Apollo Engineering",
        description="Core platform engineering team",
        lead_id=pm.id
    )
    db.add(team)
    db.commit()
    db.refresh(team)
    
    # Add members to team
    team.members.append(admin)
    team.members.append(pm)
    db.commit()

    # 4. Create a Project
    project = Project(
        name="Apollo Platform",
        identifier="APO",
        description="Next-gen cloud project management platform",
        status=ProjectStatus.ONGOING,
        team_id=team.id,
        lead_id=pm.id,
        progress=65.0
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    # 5. Create Issues
    issue1 = Issue(
        title="Implement OAuth2 Authentication",
        description="Add support for Google and GitHub login",
        state=IssueState.DONE,
        priority=IssuePriority.URGENT,
        project_id=project.id,
        creator_id=admin.id,
        assignee_id=pm.id
    )
    
    issue2 = Issue(
        title="Refactor Frontend Store",
        description="Migrate from Redux to Zustand for better performance",
        state=IssueState.IN_PROGRESS,
        priority=IssuePriority.HIGH,
        project_id=project.id,
        creator_id=pm.id,
        assignee_id=admin.id
    )
    
    issue3 = Issue(
        title="Mobile Layout Fixes",
        description="Sidebar overlaps on tablet view",
        state=IssueState.TODO,
        priority=IssuePriority.MEDIUM,
        project_id=project.id,
        creator_id=admin.id,
        assignee_id=admin.id
    )
    
    db.add(issue1)
    db.add(issue2)
    db.add(issue3)
    
    db.commit()
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    seed_db()
