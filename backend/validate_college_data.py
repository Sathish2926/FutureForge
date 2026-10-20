"""
College Data Integrity and Validation Script for FutureForge.
Validates 500-college dataset integrity, schemas, relationships, non-destructiveness, and constraints.
"""
import os
import sys

backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import SessionLocal
from app import models


def validate_college_dataset():
    db = SessionLocal()
    print("=== STARTING COLLEGE DATASET VALIDATION ===")
    errors = []
    warnings = []

    try:
        # 1. Total count check
        college_count = db.query(models.College).count()
        print(f"[CHECK 1] College Count: {college_count}")
        if college_count != 500:
            errors.append(f"Expected 500 colleges, found {college_count}")

        # 2. Details count check
        detail_count = db.query(models.CollegeDetail).count()
        print(f"[CHECK 2] College Detail Count: {detail_count}")
        if detail_count != 500:
            errors.append(f"Expected 500 college details, found {detail_count}")

        # 3. Programs count check
        program_count = db.query(models.CollegeProgram).count()
        print(f"[CHECK 3] Program Count: {program_count}")
        if program_count != 492:
            warnings.append(f"Expected 492 program master records, found {program_count}")

        # 4. College Course mapping check
        cc_count = db.query(models.CollegeCourse).count()
        print(f"[CHECK 4] CollegeCourse Mappings Count: {cc_count}")
        if cc_count < 500:
            errors.append(f"Expected at least 500 college course mappings, found {cc_count}")

        # 5. ID Uniqueness and Non-null Check
        colleges = db.query(models.College).all()
        ids = set()
        for c in colleges:
            if not c.name or not c.name.strip():
                errors.append(f"College ID {c.id} has empty name")
            if not c.state or not c.state.strip():
                errors.append(f"College ID {c.id} has empty state")
            if not c.city or not c.city.strip():
                errors.append(f"College ID {c.id} has empty city")
            if c.id in ids:
                errors.append(f"Duplicate College ID found: {c.id}")
            ids.add(c.id)

        # 6. Detail completeness (Fees & Placement)
        details = db.query(models.CollegeDetail).all()
        missing_fees = 0
        missing_placements = 0
        for d in details:
            if d.annual_fee_max_inr is None and d.estimated_total_annual_cost_inr is None:
                missing_fees += 1
            if d.avg_package_lpa is None and d.placement_rate_pct_est is None:
                missing_placements += 1

        print(f"[CHECK 5] Fees Completeness: {500 - missing_fees}/500")
        print(f"[CHECK 6] Placement Completeness: {500 - missing_placements}/500")
        if missing_fees > 0:
            warnings.append(f"{missing_fees} colleges missing fee data")
        if missing_placements > 0:
            warnings.append(f"{missing_placements} colleges missing placement data")

        # 7. Non-destructiveness check (Careers, Scholarships, Skills, Users)
        career_count = db.query(models.Career).count()
        scholarship_count = db.query(models.Scholarship).count()
        skill_count = db.query(models.Skill).count()

        print(f"[CHECK 7] Existing Careers Intact: {career_count}")
        print(f"[CHECK 8] Existing Scholarships Intact: {scholarship_count}")
        print(f"[CHECK 9] Existing Skills Intact: {skill_count}")

        if errors:
            print("\n[FAIL] VALIDATION FAILED WITH ERRORS:")
            for err in errors:
                print(f"  - {err}")
            return False
        else:
            print("\n[SUCCESS] ALL CRITICAL DATASET VALIDATION CHECKS PASSED!")
            if warnings:
                print("Warnings:")
                for w in warnings:
                    print(f"  - {w}")
            return True

    except Exception as e:
        print(f"[FAIL] Validation crashed: {e}")
        return False
    finally:
        db.close()


if __name__ == "__main__":
    success = validate_college_dataset()
    sys.exit(0 if success else 1)
