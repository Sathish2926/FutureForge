"""
Dedicated College Dataset Importer for FutureForge.
Imports 500 colleges from Excel dataset:
data/FutureForge_College_Recommendation_500_CrossWeb_Enriched_2026.xlsx
"""
import os
import sys
import shutil
import datetime
import pandas as pd
from sqlalchemy import text

# Ensure backend directory is in path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import engine, Base, SessionLocal
from app import models  # Ensures models registered on Base

EXCEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data",
    "FutureForge_College_Recommendation_500_CrossWeb_Enriched_2026.xlsx"
)


def safe_int(val, default=None):
    if pd.isna(val) or val is None:
        return default
    try:
        return int(val)
    except (ValueError, TypeError):
        return default


def safe_float(val, default=None):
    if pd.isna(val) or val is None:
        return default
    try:
        return float(val)
    except (ValueError, TypeError):
        return default


def safe_str(val, default=None):
    if pd.isna(val) or val is None:
        return default
    s = str(val).strip()
    return s if s else default


def safe_bool(val, default=False):
    if pd.isna(val) or val is None:
        return default
    if isinstance(val, bool):
        return val
    s = str(val).strip().lower()
    return s in ["true", "yes", "1"]


def normalize_institution_type(raw_type: str) -> str:
    if not raw_type:
        return "private"
    t = raw_type.lower()
    if "government" in t or "govt" in t:
        return "government"
    if "deemed" in t:
        return "deemed"
    return "private"


def create_backup():
    root_dir = os.path.dirname(backend_dir)
    db_path = os.path.join(backend_dir, "careerpath.db")
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = os.path.join(backend_dir, f"careerpath_backup_before_college_import_{timestamp}.db")
    
    if os.path.exists(db_path):
        shutil.copy2(db_path, backup_path)
        print(f"[BACKUP] Created SQLite database backup at: {backup_path}")
    else:
        print("[BACKUP] Database file does not exist yet. It will be created.")

    root_db = os.path.join(root_dir, "careerpath.db")
    if os.path.exists(root_db):
        root_backup = os.path.join(root_dir, f"careerpath_backup_before_college_import_{timestamp}.db")
        shutil.copy2(root_db, root_backup)


def import_dataset():
    print(f"Reading Excel dataset from: {EXCEL_PATH}")
    if not os.path.exists(EXCEL_PATH):
        raise FileNotFoundError(f"Excel dataset not found at {EXCEL_PATH}")

    xl = pd.ExcelFile(EXCEL_PATH)
    df_master = pd.read_excel(xl, sheet_name="college_master")
    df_fee = pd.read_excel(xl, sheet_name="fee_structure")
    df_placement = pd.read_excel(xl, sheet_name="placement_data")
    df_program = pd.read_excel(xl, sheet_name="program_master")

    create_backup()

    # Create missing tables in DB first
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        print("Clearing previous college dataset records...")
        db.execute(text("DELETE FROM saved_colleges"))
        db.execute(text("DELETE FROM college_courses"))
        db.execute(text("DELETE FROM college_programs"))
        db.execute(text("DELETE FROM college_details"))
        db.execute(text("DELETE FROM colleges"))
        db.commit()

        # Cache courses dict: course_name -> Course model
        course_cache = {}

        def get_or_create_course(course_name: str, degree_level: str = "UG", field: str = "General") -> models.Course:
            key = course_name.strip()
            if key in course_cache:
                return course_cache[key]
            
            c = db.query(models.Course).filter(models.Course.name == key).first()
            if not c:
                c = models.Course(name=key, degree_level=degree_level, field=field)
                db.add(c)
                db.flush()
            course_cache[key] = c
            return c

        print(f"Importing {len(df_master)} colleges from college_master...")
        
        now_time = datetime.datetime.utcnow()

        for idx, row in df_master.iterrows():
            c_id = safe_int(row['college_id'])
            c_name = safe_str(row['college_name'])
            raw_inst_type = safe_str(row['institution_type'], 'Self Financing')
            norm_inst_type = normalize_institution_type(raw_inst_type)
            state = safe_str(row['state'], 'Tamil Nadu')
            city = safe_str(row['city'], 'Tamil Nadu')

            hostel_val = safe_str(row.get('hostel'))
            hostel_avail = True if hostel_val and 'yes' in hostel_val.lower() else (False if hostel_val and 'no' in hostel_val.lower() else True)

            college = models.College(
                id=c_id,
                name=c_name,
                institution_type=norm_inst_type,
                state=state,
                city=city,
                latitude=safe_float(row.get('latitude')),
                longitude=safe_float(row.get('longitude')),
                website=safe_str(row.get('website')),
                hostel_available=hostel_avail,
                source_provider="FutureForge_500_CrossWeb_Enriched_2026",
                last_verified=now_time,
            )
            db.add(college)

            detail = models.CollegeDetail(
                college_id=c_id,
                domain_group=safe_str(row.get('domain_group')),
                course_family=safe_str(row.get('course_family')),
                district=safe_str(row.get('district')),
                pincode=safe_int(row.get('pincode')),
                year_established=safe_int(row.get('year_established')),
                common_admission_route=safe_str(row.get('common_admission_route')),
                
                annual_fee_min_inr=safe_int(row.get('annual_fee_min_inr')),
                annual_fee_max_inr=safe_int(row.get('annual_fee_max_inr')),
                estimated_4yr_fee_inr=safe_int(row.get('estimated_4yr_fee_inr')),
                
                avg_package_min_lpa=safe_float(row.get('avg_package_min_lpa')),
                avg_package_max_lpa=safe_float(row.get('avg_package_max_lpa')),
                avg_package_lpa=safe_float(row.get('avg_package_lpa')),
                placement_rate_pct_est=safe_float(row.get('placement_rate_pct_est')),
                
                rating_seeded=safe_float(row.get('rating_seeded'), 7.0),
                nirf_rank_seeded=safe_int(row.get('nirf_rank_seeded'), 9999),
                nirf_rank_status=safe_str(row.get('nirf_rank_status')),
                
                hostel_facility=safe_str(row.get('hostel')),
                placement_facility=safe_str(row.get('placement_facility')),
                transport_facility=safe_str(row.get('transport')),
                estimated_hostel_annual_inr=safe_int(row.get('estimated_hostel_annual_inr')),
                estimated_total_annual_cost_inr=safe_int(row.get('estimated_total_annual_cost_inr')),
                package_to_fee_ratio=safe_float(row.get('package_to_fee_ratio')),
                estimated_roi_score=safe_float(row.get('estimated_roi_score')),
                
                fee_source_type=safe_str(row.get('fee_source_type')),
                placement_source_type=safe_str(row.get('placement_source_type')),
                verification_required=safe_str(row.get('verification_required')),
                fee_data_basis=safe_str(row.get('fee_data_basis')),
                placement_data_basis=safe_str(row.get('placement_data_basis')),
                fee_is_estimate=safe_bool(row.get('fee_is_estimate'), True),
                placement_is_estimate=safe_bool(row.get('placement_is_estimate'), True),
                placement_rate_source=safe_str(row.get('placement_rate_source')),
                location_quality=safe_str(row.get('location_quality')),
            )
            db.add(detail)

        db.flush()

        # Import Program Master
        print(f"Importing {len(df_program)} programs from program_master...")
        programs_by_college = {}
        for _, p_row in df_program.iterrows():
            c_id = safe_int(p_row['college_id'])
            branch = safe_str(p_row['branch'], 'General')
            prog = models.CollegeProgram(
                program_id=safe_int(p_row['program_id']),
                college_id=c_id,
                college_code=safe_str(p_row.get('college_code')),
                program_no=safe_int(p_row.get('program_no')),
                branch=branch,
                approved_intake=safe_int(p_row.get('approved_intake')),
                course_category=safe_str(p_row.get('course_category')),
                course_start_year=safe_int(p_row.get('course_start_year')),
                accredited=safe_str(p_row.get('accredited')),
                accreditation_valid_upto=safe_str(p_row.get('accreditation_valid_upto')),
                source_booklet=safe_str(p_row.get('source_booklet')),
                source_pdf_page=safe_int(p_row.get('source_pdf_page')),
            )
            db.add(prog)
            programs_by_college.setdefault(c_id, []).append(p_row)

        db.flush()

        # Map CollegeCourse records for all colleges
        print("Mapping CollegeCourse records for all 500 colleges...")
        all_colleges = db.query(models.College).all()

        for col in all_colleges:
            c_detail = col.details
            progs = programs_by_college.get(col.id, [])
            
            if progs:
                for p_row in progs:
                    b_name = safe_str(p_row['branch'], 'General Program')
                    deg_level = "PG" if any(x in b_name.upper() for x in ["MCA", "MBA", "M.SC", "M.TECH", "MD", "MS", "LLM"]) else "UG"
                    field_name = c_detail.domain_group if c_detail else "General"
                    course_obj = get_or_create_course(b_name, degree_level=deg_level, field=field_name)

                    fees = c_detail.annual_fee_max_inr if c_detail else 50000
                    exam = c_detail.common_admission_route if c_detail else "Merit-based"
                    min_pct = 50.0

                    cc = models.CollegeCourse(
                        college_id=col.id,
                        course_id=course_obj.id,
                        entrance_exam=exam,
                        min_eligibility_percent=min_pct,
                        annual_fees_inr=fees
                    )
                    db.add(cc)
            else:
                cf = c_detail.course_family if c_detail and c_detail.course_family else "Undergraduate Degree Program"
                deg_level = "UG"
                field_name = c_detail.domain_group if c_detail else "General"
                course_obj = get_or_create_course(cf, degree_level=deg_level, field=field_name)

                fees = c_detail.annual_fee_max_inr if c_detail else 50000
                exam = c_detail.common_admission_route if c_detail else "Merit-based"
                min_pct = 50.0

                cc = models.CollegeCourse(
                    college_id=col.id,
                    course_id=course_obj.id,
                    entrance_exam=exam,
                    min_eligibility_percent=min_pct,
                    annual_fees_inr=fees
                )
                db.add(cc)

        db.commit()

        # Copy to root careerpath.db as well so both files stay 100% in sync
        backend_db = os.path.join(backend_dir, "careerpath.db")
        root_dir = os.path.dirname(backend_dir)
        root_db = os.path.join(root_dir, "careerpath.db")
        if os.path.exists(backend_db):
            shutil.copy2(backend_db, root_db)
            print(f"[SYNC] Synced backend database to root: {root_db}")

        print("=== COLLEGE DATASET IMPORT COMPLETE ===")
        print(f"Total Colleges: {db.query(models.College).count()}")
        print(f"Total Details: {db.query(models.CollegeDetail).count()}")
        print(f"Total Programs: {db.query(models.CollegeProgram).count()}")
        print(f"Total Courses: {db.query(models.Course).count()}")
        print(f"Total College Courses Mapped: {db.query(models.CollegeCourse).count()}")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Import failed: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    import_dataset()
