import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.dependencies.auth import get_current_user
from app.models import User

# Override auth dependency
def override_get_current_user():
    return User(id=1, email="test@example.com", firebase_uid="test_uid")

app.dependency_overrides[get_current_user] = override_get_current_user

client = TestClient(app)

def test_profile_update():
    # Fetch first
    resp = client.get("/api/v1/profile")
    print("GET /profile:", resp.status_code, resp.text)
    
    # Try PUT with id and user_id (as frontend does)
    payload = {
        "id": 1,
        "user_id": 1,
        "location": "Chennai",
        "gender": "Male"
    }
    resp = client.put("/api/v1/profile", json=payload)
    print("PUT /profile:", resp.status_code, resp.text)

def test_bookmark():
    resp = client.post("/api/v1/career-intelligence/bookmarks/1")
    print("POST /bookmark:", resp.status_code, resp.text)

if __name__ == "__main__":
    test_profile_update()
    test_bookmark()
