import requests
try:
    headers = {
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "PUT"
    }
    resp = requests.options("http://127.0.0.1:8000/api/v1/career-dna/step/2", headers=headers)
    print("OPTIONS Status:", resp.status_code)
    print("OPTIONS Headers:", resp.headers)
except Exception as e:
    print("Error:", e)
