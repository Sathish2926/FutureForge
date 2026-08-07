from sqlalchemy import create_engine, text
from app.core.config import settings
import sys

try:
    engine = create_engine(settings.database_url)
    with engine.connect() as conn:
        res = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles';")).fetchall()
        print("PROFILES COLUMNS:", [r[0] for r in res])
        
        res2 = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")).fetchall()
        print("TABLES:", [r[0] for r in res2])
except Exception as e:
    print(e)
    sys.exit(1)
