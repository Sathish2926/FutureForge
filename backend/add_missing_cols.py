import sqlite3

def upgrade_db():
    conn = sqlite3.connect('futureforge.db')
    cursor = conn.cursor()
    
    columns = [
        "district TEXT",
        "current_course TEXT"
    ]
    for col in columns:
        col_name = col.split()[0]
        try:
            cursor.execute(f"ALTER TABLE profiles ADD COLUMN {col}")
            print(f"Added column {col_name} to profiles.")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print(f"Column {col_name} already exists.")
            else:
                print(f"Error adding {col_name}: {e}")
                
    conn.commit()
    conn.close()

if __name__ == '__main__':
    upgrade_db()
