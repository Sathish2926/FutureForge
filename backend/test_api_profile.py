import json
import base64
import requests

def make_fake_token(payload):
    header = base64.urlsafe_b64encode(b'{"alg":"none"}').decode('utf-8').rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8').rstrip('=')
    return f"{header}.{payload_b64}."

token = make_fake_token({"uid": "mockuser", "email": "mock@user.com"})

print(f"Fake Token: {token}")

data = {
    "dob": "21-05-2005",
    "gender": "Male",
    "location": "Coimbatore",
    "languages": ["English"],
    "education_level": "PG",
    "institution": "PSG College Of Technology",
    "occupation": "Student",
    "career_goal": "Software Developer"
}

resp = requests.put(
    "http://127.0.0.1:8000/api/v1/profile",
    json=data,
    headers={"Authorization": f"Bearer {token}"}
)

print(f"Status: {resp.status_code}")
print(f"Response: {resp.text}")
