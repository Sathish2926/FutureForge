import sqlite3
import os

DB = "careerpath.db"

if not os.path.exists(DB):
    print("Database not found:", DB)
    input("\nPress Enter to exit...")
    exit()

conn = sqlite3.connect(DB)
cur = conn.cursor()

print("=" * 70)
print("           FUTUREFORGE SQLITE DATABASE VIEWER")
print("=" * 70)
print("Database:", os.path.abspath(DB))

print("\nTABLES")
print("-" * 70)

tables = cur.execute("""
    SELECT name
    FROM sqlite_master
    WHERE type='table'
    ORDER BY name
""").fetchall()

for i, (table,) in enumerate(tables, 1):
    count = cur.execute(
        f'SELECT COUNT(*) FROM "{table}"'
    ).fetchone()[0]

    print(f"{i:2}. {table:<35} {count:>6} rows")

print("\nCOLLEGE DATABASE SUMMARY")
print("-" * 70)

for table in ["colleges", "courses", "college_courses", "saved_colleges"]:
    try:
        count = cur.execute(
            f'SELECT COUNT(*) FROM "{table}"'
        ).fetchone()[0]
        print(f"{table:<25}: {count}")
    except sqlite3.Error:
        print(f"{table:<25}: table not found")

print("\nCOLLEGES")
print("-" * 70)

rows = cur.execute("""
    SELECT id, name, state, city, institution_type
    FROM colleges
    ORDER BY id
    LIMIT 20
""").fetchall()

for row in rows:
    print(row)

print("\nCOURSES")
print("-" * 70)

rows = cur.execute("""
    SELECT id, name, degree_level, field
    FROM courses
    ORDER BY id
    LIMIT 20
""").fetchall()

for row in rows:
    print(row)

print("\nCOLLEGE → COURSE MAPPINGS")
print("-" * 70)

rows = cur.execute("""
    SELECT
        cc.id,
        c.name AS college,
        co.name AS course,
        cc.entrance_exam,
        cc.annual_fees_inr
    FROM college_courses cc
    JOIN colleges c ON c.id = cc.college_id
    JOIN courses co ON co.id = cc.course_id
    ORDER BY cc.id
    LIMIT 30
""").fetchall()

for row in rows:
    print(row)

conn.close()

print("\n" + "=" * 70)
print("Database viewer completed.")
print("=" * 70)

input("\nPress Enter to exit...")