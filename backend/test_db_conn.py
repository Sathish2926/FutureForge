import sys
import psycopg2
from app.core.config import settings

print(f"Connecting to: {settings.database_url}")
try:
    conn = psycopg2.connect(
        settings.database_url.replace("postgresql+psycopg2://", "postgresql://"),
        connect_timeout=2
    )
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    print("Database is alive!")
    
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles';")
    print("Profiles columns:", [r[0] for r in cur.fetchall()])
    
    conn.close()
except Exception as e:
    print(f"Error: {e}")
