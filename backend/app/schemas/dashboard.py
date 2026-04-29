from datetime import datetime

from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
  total_projects: int
  active_projects: int
  total_tasks: int
  active_tasks: int
  completed_tasks: int
  overdue_tasks: int
  total_users: int
  total_teams: int


class RecentActivityItem(BaseModel):
  entity_type: str
  action: str
  item_id: int
  title: str
  status: str
  timestamp: datetime


class RecentActivityResponse(BaseModel):
  items: list[RecentActivityItem]
