# Backend Starter

This backend uses Flask, SQLAlchemy, and Flask-Migrate.

## 1. Create a virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## 2. Install packages

```powershell
pip install -r requirements.txt
```

## 3. Create your environment file

Copy `.env.example` to `.env` and update the values.

If you want a quick local start, you can leave `DATABASE_URL` empty and use the default SQLite database from `app/config.py`.

## 4. Start the server

```powershell
python run.py
```

## 5. Create demo data

Use:

```http
POST /api/setup/seed
```

Then test:

- `GET /health`
- `GET /api/visitors`
- `POST /api/visitors/invite`
- `POST /api/complaints`
