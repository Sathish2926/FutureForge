import sqlite3

conn = sqlite3.connect('d:/Futureforge/backend/careerpath.db')
c = conn.cursor()
tables = [row[0] for row in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print('Tables in DB:', tables)
if 'careers' in tables:
    print('careers count:', c.execute('SELECT count(*) FROM careers').fetchone()[0])
if 'professional_roles' in tables:
    print('professional_roles count:', c.execute('SELECT count(*) FROM professional_roles').fetchone()[0])
if 'professional_learning_resources' in tables:
    print('professional_learning_resources count:', c.execute('SELECT count(*) FROM professional_learning_resources').fetchone()[0])
if 'skills' in tables:
    print('skills count:', c.execute('SELECT count(*) FROM skills').fetchone()[0])
conn.close()
