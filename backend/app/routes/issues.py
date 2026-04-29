from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.issue import Issue, IssueCreate, IssueUpdate
from ..models.issue import Issue as IssueModel
from ..dependencies import get_current_active_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[Issue])
def read_issues(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    project_id: Optional[int] = None,
    assignee_id: Optional[int] = None,
    current_user: User = Depends(get_current_active_user)
):
    query = db.query(IssueModel)
    if project_id:
        query = query.filter(IssueModel.project_id == project_id)
    if assignee_id:
        query = query.filter(IssueModel.assignee_id == assignee_id)
    
    issues = query.offset(skip).limit(limit).all()
    return issues

@router.post("/", response_model=Issue)
def create_issue(
    *,
    db: Session = Depends(get_db),
    issue_in: IssueCreate,
    current_user: User = Depends(get_current_active_user)
):
    issue = IssueModel(
        **issue_in.dict(),
        creator_id=current_user.id
    )
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue

@router.patch("/{issue_id}", response_model=Issue)
def update_issue(
    issue_id: int,
    issue_in: IssueUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    issue = db.query(IssueModel).filter(IssueModel.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    update_data = issue_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(issue, field, value)
    
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue
