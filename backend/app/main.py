from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routes import auth, projects, issues, goals, wiki, dashboard, teams

# Initialize Database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "version": settings.VERSION}

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(projects.router, prefix=f"{settings.API_V1_STR}/projects", tags=["Projects"])
app.include_router(issues.router, prefix=f"{settings.API_V1_STR}/issues", tags=["Issues"])
app.include_router(goals.router, prefix=f"{settings.API_V1_STR}/goals", tags=["Goals"])
app.include_router(wiki.router, prefix=f"{settings.API_V1_STR}/wiki", tags=["Wiki"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["Dashboard"])
app.include_router(teams.router, prefix=f"{settings.API_V1_STR}/teams", tags=["Teams"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
