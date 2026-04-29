from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task
from app.models.team import Team
from app.models.user import User


def get_dashboard_stats(db: Session) -> dict:
  total_projects = db.query(func.count(Project.id)).scalar() or 0
  active_projects = (
    db.query(func.count(Project.id))
    .filter(Project.is_archived.is_(False), Project.status.notin_(["completed", "archived"]))
    .scalar()
    or 0
  )
  total_tasks = db.query(func.count(Task.id)).scalar() or 0
  active_tasks = (
    db.query(func.count(Task.id)).filter(Task.status.in_(["todo", "in_progress", "blocked"])).scalar() or 0
  )
  completed_tasks = db.query(func.count(Task.id)).filter(Task.status.in_(["done", "completed"])).scalar() or 0
  overdue_tasks = (
    db.query(func.count(Task.id))
    .filter(Task.due_date.is_not(None), Task.due_date < date.today(), Task.status.notin_(["done", "completed"]))
    .scalar()
    or 0
  )
  total_users = db.query(func.count(User.id)).scalar() or 0
  total_teams = db.query(func.count(Team.id)).scalar() or 0

  return {
    "total_projects": total_projects,
    "active_projects": active_projects,
    "total_tasks": total_tasks,
    "active_tasks": active_tasks,
    "completed_tasks": completed_tasks,
    "overdue_tasks": overdue_tasks,
    "total_users": total_users,
    "total_teams": total_teams,
  }


def get_recent_activity(db: Session, limit: int = 10) -> dict:
  project_items = [
    {
      "entity_type": "project",
      "action": "updated" if project.updated_at > project.created_at else "created",
      "item_id": project.id,
      "title": project.title,
      "status": project.status,
      "timestamp": project.updated_at,
    }
    for project in db.query(Project).order_by(Project.updated_at.desc()).limit(limit).all()
  ]
  task_items = [
    {
      "entity_type": "task",
      "action": "updated" if task.updated_at > task.created_at else "created",
      "item_id": task.id,
      "title": task.title,
      "status": task.status,
      "timestamp": task.updated_at,
    }
    for task in db.query(Task).order_by(Task.updated_at.desc()).limit(limit).all()
  ]

  items = sorted(project_items + task_items, key=lambda item: item["timestamp"], reverse=True)[:limit]
  return {"items": items}
