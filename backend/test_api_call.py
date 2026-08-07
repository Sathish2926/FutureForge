import requests
import json
import base64

def get_fake_jwt():
    header = base64.urlsafe_b64encode(json.dumps({"alg": "none"}).encode()).decode().rstrip('=')
    payload = base64.urlsafe_b64encode(json.dumps({
        "uid": "test_uid", 
        "email": "test@example.com",
        "name": "Test User"
    }).encode()).decode().rstrip('=')
    return f"{header}.{payload}."

headers = {"Authorization": f"Bearer {get_fake_jwt()}"}

print("=== Testing GET /profile ===")
resp = requests.get("http://127.0.0.1:8000/api/v1/profile", headers=headers)
print("GET /profile:", resp.status_code)
print(resp.text)
