import base64
import json
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from app.models.user import User
from app.models.scholarship_profile import ScholarshipProfile

db = SessionLocal()
user = db.query(User).first()

if not user:
    print("No user found.")
    exit(1)

# Ensure the user has a scholarship profile
profile = db.query(ScholarshipProfile).filter(ScholarshipProfile.user_id == user.id).first()
if not profile:
    profile = ScholarshipProfile(
        user_id=user.id,
        academic_stage="ug",
    )
    db.add(profile)
    db.commit()

payload = {
    "uid": user.firebase_uid or "test_uid",
    "email": user.email,
    "name": user.full_name
}
payload_bytes = json.dumps(payload).encode('utf-8')
payload_b64 = base64.urlsafe_b64encode(payload_bytes).decode('utf-8').rstrip("=")

header = {
    "alg": "HS256",
    "typ": "JWT"
}
header_bytes = json.dumps(header).encode('utf-8')
header_b64 = base64.urlsafe_b64encode(header_bytes).decode('utf-8').rstrip("=")

fake_token = f"{header_b64}.{payload_b64}.fakesignature"

url = "http://127.0.0.1:8000/api/v1/scholarships/profile"
headers = {
    "Authorization": f"Bearer {fake_token}",
    "Content-Type": "application/json"
}

print("Calling GET /profile...")
response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")

if response.status_code != 200:
    print("Error getting profile, testing PUT /profile...")
    data = {
        "academic_stage": "pg"
    }
    r = requests.put(url, headers=headers, json=data)
    print(f"PUT Status Code: {r.status_code}")
    print(f"PUT Response: {r.text}")
