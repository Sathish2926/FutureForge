"""
Script to test live backend endpoints against local uvicorn server.
"""
import urllib.request
import urllib.parse
import json

base_url = "http://127.0.0.1:8000"

# 1. Health check
try:
    with urllib.request.urlopen(f"{base_url}/api/health") as response:
        print("[Health Check]:", response.status, response.read().decode())
except Exception as e:
    print("[Health Check Error]:", e)

# 2. Register/Login test user
auth_data = json.dumps({"email": "live_user@futureforge.ai", "password": "password123", "name": "Sriram"}).encode("utf-8")
req = urllib.request.Request(f"{base_url}/api/auth/register", data=auth_data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as resp:
        res_json = json.loads(resp.read().decode())
        token = res_json["access_token"]
        print("[Register/Login]: Success! Obtained JWT token.")
except Exception as e:
    # Try login directly
    login_req = urllib.request.Request(f"{base_url}/api/auth/login", data=json.dumps({"email": "live_user@futureforge.ai", "password": "password123"}).encode("utf-8"), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(login_req) as resp:
        res_json = json.loads(resp.read().decode())
        token = res_json["access_token"]
        print("[Login]: Success! Obtained JWT token.")

headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# 3. Test Dashboard endpoint
dash_req = urllib.request.Request(f"{base_url}/api/dashboard", headers=headers)
try:
    with urllib.request.urlopen(dash_req) as resp:
        dash_json = json.loads(resp.read().decode())
        print("[Dashboard API]: Success 200 OK! Greeting:", dash_json.get("greeting_name"))
except Exception as e:
    print("[Dashboard API Error]:", e)

# 4. Test Roadmap Generation endpoint for "Doctor"
roadmap_req = urllib.request.Request(f"{base_url}/api/roadmaps", data=json.dumps({"goal_text": "Doctor"}).encode("utf-8"), headers=headers)
try:
    with urllib.request.urlopen(roadmap_req) as resp:
        roadmap_json = json.loads(resp.read().decode())
        print("[Roadmap Generation API]: Success 200 OK! Career:", roadmap_json.get("career_name"), "| Ambiguous:", roadmap_json.get("is_ambiguous"))
except Exception as e:
    print("[Roadmap Generation API Error]:", e)
