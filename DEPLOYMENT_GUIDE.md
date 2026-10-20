# 🚀 FutureForge Production Deployment Guide

This guide walks you through hosting the FutureForge application (FastAPI backend + React Vite frontend).

---

## Architecture Overview

* **Frontend**: React + TypeScript + Vite + Tailwind CSS (`/frontend`)
* **Backend**: FastAPI + SQLAlchemy (`/backend`)
* **Database**: SQLite (default zero-config) or PostgreSQL (`DATABASE_URL`)
* **AI Engine**: Gemini API (`GEMINI_API_KEY`)

---

## 🌟 Option 1: Vercel (Frontend) + Render (Backend) — [Recommended & Easiest]

This option gives you high-speed global CDN for the frontend and automated SSL without needing server management.

### Part A: Deploy Backend to Render (Free / Starter)

1. Go to **[render.com](https://render.com)** and sign in with GitHub.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   * **Name**: `futureforge-backend`
   * **Root Directory**: `backend`
   * **Environment**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   * `ALLOWED_ORIGINS`: `*` (or your Vercel frontend URL once deployed)
   * `AUTO_CREATE_TABLES`: `true`
   * `JWT_SECRET`: *(generate a secure random 32-character string)*
   * `GEMINI_API_KEY`: *(your Google Gemini API key)*
6. Click **Deploy Web Service**.
7. Copy your deployed backend URL: `https://futureforge-backend.onrender.com`.

---

### Part B: Deploy Frontend to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **Add New...** → **Project**.
3. Import your FutureForge repository.
4. Set the following configuration:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `frontend`
5. Under **Environment Variables**, add:
   * `VITE_API_BASE_URL`: `https://futureforge-backend.onrender.com/api`
   * *(Optional Firebase keys if using Firebase Auth)*:
     * `VITE_FIREBASE_API_KEY`
     * `VITE_FIREBASE_AUTH_DOMAIN`
     * `VITE_FIREBASE_PROJECT_ID`
6. Click **Deploy**.
7. Vercel will build and launch your live application at `https://your-project.vercel.app`!

---

## 🐳 Option 2: Docker & Docker Compose (VPS / AWS / DigitalOcean)

If you have a Linux server (Ubuntu/Debian) or want to host both services together on a single VPS:

### 1. Prerequisites
Install Docker and Docker Compose on your server:
```bash
sudo apt update && sudo apt install -y docker.io docker-compose
```

### 2. Clone & Configure
```bash
git clone <your-repo-url>
cd Futureforge
```

### 3. Launch with Docker Compose
```bash
docker-compose up -d --build
```
* **Frontend**: Accessible at `http://your-server-ip:3000`
* **Backend API**: Accessible at `http://your-server-ip:8000/docs`

---

## ⚡ Option 3: One-Click Render Blueprint

We have already created a [`render.yaml`](./render.yaml) configuration in the root directory.

1. Push your code to GitHub.
2. In Render, click **Blueprints** → **New Blueprint Instance**.
3. Select your repository.
4. Render will automatically read `render.yaml`, set up the FastAPI web service and React static site together, and wire up `VITE_API_BASE_URL`.

---

## 🔐 Production Environment Variables Checklist

| Variable | Location | Description |
| :--- | :--- | :--- |
| `ALLOWED_ORIGINS` | Backend | Comma-separated list of allowed frontend domains or `*` |
| `AUTO_CREATE_TABLES`| Backend | `true` (auto creates SQLite/Postgres tables on launch) |
| `DATABASE_URL` | Backend | Optional: `postgresql://user:pass@host:5432/dbname` (defaults to local SQLite) |
| `JWT_SECRET` | Backend | Secret key used for signing session tokens |
| `GEMINI_API_KEY` | Backend | Google Gemini API key for AI Copilot & roadmap generation |
| `VITE_API_BASE_URL` | Frontend | Full URL to backend `/api` endpoint (e.g. `https://api.yourdomain.com/api`) |
