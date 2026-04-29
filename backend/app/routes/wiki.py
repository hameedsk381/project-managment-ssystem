from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.wiki import WikiPage as WikiModel
from ..dependencies import get_current_active_user
from ..models.user import User
from pydantic import BaseModel

class WikiBase(BaseModel):
    title: str
    content: str
    category: str

class WikiCreate(WikiBase):
    pass

class Wiki(WikiBase):
    id: int
    author_id: int
    class Config:
        from_attributes = True

router = APIRouter()

@router.get("/", response_model=List[Wiki])
def read_wiki_pages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(WikiModel).all()

@router.post("/", response_model=Wiki)
def create_wiki_page(
    wiki_in: WikiCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    wiki = WikiModel(**wiki_in.dict(), author_id=current_user.id)
    db.add(wiki)
    db.commit()
    db.refresh(wiki)
    return wiki
