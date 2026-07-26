import os
import sys
sys.path.append(os.getcwd())
from app.database.session import engine
from sqlalchemy import text

def fix_sequences():
    with engine.connect() as conn:
        conn.execute(text("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);"))
        conn.execute(text("SELECT setval('scholarship_profiles_id_seq', COALESCE((SELECT MAX(id)+1 FROM scholarship_profiles), 1), false);"))
        conn.execute(text("SELECT setval('scholarships_id_seq', COALESCE((SELECT MAX(id)+1 FROM scholarships), 1), false);"))
        conn.commit()
        print('Sequences updated!')

if __name__ == "__main__":
    fix_sequences()
