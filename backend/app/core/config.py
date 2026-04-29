from pydantic import BaseModel


class Settings(BaseModel):
  app_name: str = "AI Native Project Management System API"
  api_prefix: str = ""
  jwt_secret_key: str = "change-this-in-production"
  jwt_algorithm: str = "HS256"
  access_token_expire_minutes: int = 60 * 24
  cors_origins: list[str] = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
  ]


settings = Settings()
