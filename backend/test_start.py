import base64
import json
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from app.models.user import User
from app.models.profile import CareerDNA

db = SessionLocal()
user = db.query(User).first()

if not user:
    print("No user found.")
    exit(1)

# Ensure the user has NO career_dna to test startCareerDNA creation
cdna = db.query(CareerDNA).filter(CareerDNA.user_id == user.id).first()
if cdna:
    db.delete(cdna)
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

url = "http://127.0.0.1:8000/api/v1/career-dna/start"
headers = {
    "Authorization": f"Bearer {fake_token}",
    "Content-Type": "application/json"
}

print("Calling POST /start...")
response = requests.post(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
