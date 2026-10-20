import sqlite3

def sync_db(db_path):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    tables = [r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
    if 'college_details' in tables:
        c.execute("""
            UPDATE college_details
            SET 
                avg_package_lpa = COALESCE((
                    SELECT p.average_package 
                    FROM placements p 
                    WHERE p.college_id = college_details.college_id 
                      AND p.average_package IS NOT NULL
                ), avg_package_lpa),
                avg_package_min_lpa = COALESCE((
                    SELECT p.median_package 
                    FROM placements p 
                    WHERE p.college_id = college_details.college_id 
                      AND p.median_package IS NOT NULL
                ), avg_package_min_lpa),
                avg_package_max_lpa = COALESCE((
                    SELECT p.highest_package 
                    FROM placements p 
                    WHERE p.college_id = college_details.college_id 
                      AND p.highest_package IS NOT NULL
                ), avg_package_max_lpa),
                placement_rate_pct_est = COALESCE((
                    SELECT p.placement_percentage 
                    FROM placements p 
                    WHERE p.college_id = college_details.college_id 
                      AND p.placement_percentage IS NOT NULL
                ), placement_rate_pct_est)
            WHERE EXISTS (
                SELECT 1 FROM placements p 
                WHERE p.college_id = college_details.college_id 
                  AND (p.average_package IS NOT NULL OR p.placement_percentage IS NOT NULL)
            )
        """)
        # Specific updates for PSG Tech, SKCET, SSN
        c.execute("""
            UPDATE college_details 
            SET avg_package_lpa = 10.5, avg_package_min_lpa = 7.5, avg_package_max_lpa = 43.5, placement_rate_pct_est = 93.5, nirf_rank_seeded = 67
            WHERE college_id = 'CLG_010832'
        """)
        c.execute("""
            UPDATE college_details 
            SET avg_package_lpa = 6.2, avg_package_min_lpa = 5.8, avg_package_max_lpa = 32.0, placement_rate_pct_est = 88.5
            WHERE college_id = 'CLG_010557'
        """)
        c.execute("""
            UPDATE college_details 
            SET avg_package_lpa = 10.2, avg_package_min_lpa = 7.5, avg_package_max_lpa = 64.0, placement_rate_pct_est = 92.3
            WHERE college_id = 'CLG_025947'
        """)
        conn.commit()
        print(f"Synced college_details in {db_path}")
    conn.close()

sync_db("backend/careerpath.db")
sync_db("data/exports/careerpath_curated.db")
