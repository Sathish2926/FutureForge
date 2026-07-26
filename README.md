# FutureForge

FutureForge is an AI-powered career and education guidance platform. This repository currently contains the production-ready scaffold for the frontend, backend, database assets, and supporting project structure.

## Included

- React 19 + Vite + TypeScript frontend scaffold
- FastAPI + SQLAlchemy backend scaffold
- PostgreSQL-ready database folder structure
- Docker Compose setup
- Shared routing, layout, configuration, and placeholder pages

## Next Steps

This scaffold is ready for feature development. Business logic, AI features, authentication flows, recommendation systems, and database operations are intentionally left unimplemented.

An AI-powered platform that provides personalized career and education guidance through assessments, Career DNA profiling, explainable AI recommendations, college and scholarship suggestions, and career roadmaps.

---

## Prerequisites

Install the following before running the project:

* Node.js (LTS)
* Python 3.12+
* PostgreSQL 16+
* Git
* VS Code (Recommended)

---

## Clone the Repository

```bash
git clone <repository-url>

cd FutureForge
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

Swagger API:

```
http://localhost:8000/docs
```

---

# Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/futureforge_db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

GEMINI_API_KEY=your_api_key
```

---

# Git Workflow

Always create a feature branch before starting work.

```bash
git checkout develop

git pull origin develop

git checkout -b feature/your-feature
```

After completing your work:

```bash
git add .

git commit -m "Describe your changes"

git push origin feature/your-feature
```

Create a Pull Request to merge into `develop`.

Never push directly to `main`.

---

# Project Structure

```
FutureForge/
│
├── frontend/
├── backend/
├── database/
├── docs/
├── datasets/
├── assets/
└── README.md
```
