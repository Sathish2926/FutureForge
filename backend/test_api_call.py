import base64
import json
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from app.models.user import User

db = SessionLocal()
user = db.query(User).first()

if not user:
    print("No user found.")
    exit(1)

# Create a fake JWT that the dev auth bypass will accept
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

url = "http://127.0.0.1:8000/api/v1/career-dna/step/2"
headers = {
    "Authorization": f"Bearer {fake_token}",
    "Content-Type": "application/json"
}
data = {
    "step": 2,
    "data": {
        "user_type": "Diploma"
    }
}

response = requests.put(url, json=data, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
