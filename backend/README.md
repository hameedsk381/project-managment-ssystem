# Backend Setup

## Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Run The FastAPI Server

```bash
uvicorn app.main:app --reload
```

## Open Swagger

After the server starts, open:

```text
http://127.0.0.1:8000/docs
```

The development admin user is created automatically on startup if it does not already exist:

- email: `admin@example.com`
- password: `admin123`
- role: `Admin`
