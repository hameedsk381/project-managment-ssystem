from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.project import Project, ProjectStatus
from ..models.issue import Issue, IssueState
from ..models.user import User
from ..dependencies import get_current_active_user

router = APIRouter()

@router.get("/metrics")
def get_dashboard_metrics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    total_projects = db.query(Project).count()
    active_issues = db.query(Issue).filter(Issue.state != IssueState.DONE).count()
    completed_tasks = db.query(Issue).filter(Issue.state == IssueState.DONE).count()
    
    # Calculate average progress
    projects = db.query(Project).all()
    avg_progress = sum([p.progress for p in projects]) / len(projects) if projects else 0
    
    return {
        "total_projects": total_projects,
        "active_issues": active_issues,
        "completed_tasks": completed_tasks,
        "avg_progress": round(avg_progress, 2),
        "user_role": current_user.role,
        "user_name": current_user.full_name
    }
