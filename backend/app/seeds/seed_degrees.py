"""
Universal Degree Guidance Seed Script.
Seeds all 98 curated degrees meeting Section 3 mandatory completeness criteria
into the SQLite/PostgreSQL database tables:
- degrees
- career_paths
- higher_studies
- certifications
- government_exams
- career_switch
- entrepreneurship
- roadmap_template
"""

import os
import sys
import json
import re

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Ensure backend directory is in path
backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import engine, Base, SessionLocal
from app.degree_models import (
    DegreeModel,
    CareerPathModel,
    HigherStudyModel,
    CertificationModel,
    GovernmentExamModel,
    CareerSwitchModel,
    EntrepreneurshipModel,
    RoadmapTemplateModel
)

def extract_degrees_from_ts_file(filepath):
    """Parses JSON-like degree array exported in TypeScript catalog files."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the JSON array part
    match = re.search(r'export const \w+: UniversalDegreeRecord\[\]\s*=\s*(\[[\s\S]*\]);?', content)
    if not match:
        return []

    json_str = match.group(1).rstrip(';')
    try:
        return json.loads(json_str)
    except Exception as e:
        print(f"Error parsing JSON from {filepath}: {e}")
        return []

def seed_universal_degrees():
    print("=================================================================")
    print("🚀 SEEDING UNIVERSAL DEGREE GUIDANCE CATALOG (98 DEGREES)")
    print("=================================================================\n")

    # Create tables if not existing
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    json_path = os.path.join(backend_dir, "..", "data", "exports", "universal_degrees.json")
    if not os.path.exists(json_path):
        json_path = os.path.join("data", "exports", "universal_degrees.json")

    with open(json_path, 'r', encoding='utf-8') as f:
        degs = json.load(f)

    print(f"Loaded {len(degs)} degrees from {json_path}...")

    total_degrees = 0
    total_careers = 0
    total_hs = 0
    total_certs = 0
    total_gov = 0
    total_sw = 0
    total_ent = 0
    total_rdm = 0

    try:
        # Clear existing degree guidance rows for clean idempotent re-seed
        session.query(RoadmapTemplateModel).delete()
        session.query(EntrepreneurshipModel).delete()
        session.query(CareerSwitchModel).delete()
        session.query(GovernmentExamModel).delete()
        session.query(CertificationModel).delete()
        session.query(HigherStudyModel).delete()
        session.query(CareerPathModel).delete()
        session.query(DegreeModel).delete()
        session.commit()

        for d in degs:
            deg_id = d.get("degree_id") or d.get("id")

                new_deg = DegreeModel(
                    degree_id=deg_id,
                    name=d["name"],
                    aliases=d.get("aliases", []),
                    level=d["level"],
                    discipline=d["discipline"],
                    duration=d["duration"],
                    specializations=d.get("specializations", []),
                    regulator=d["regulator"],
                    overview=d["overview"],
                    key_skills=d.get("key_skills", []),
                    sourceUrl=d.get("sourceUrl", "https://www.ugc.gov.in"),
                    lastReviewed=d.get("lastReviewed", "2026-08-15"),
                    needsVerification=d.get("needsVerification", False)
                )
                session.add(new_deg)
                total_degrees += 1

                # Career Paths
                for cp in d.get("career_paths", []):
                    c_id = cp["id"] if cp["id"].startswith(deg_id) else f"{deg_id}-{cp['id']}"
                    new_cp = CareerPathModel(
                        id=c_id,
                        degree_id=deg_id,
                        role_title=cp["role_title"],
                        tier=cp["tier"],
                        employer_type=cp["employer_type"],
                        career_type=cp.get("career_type", "Direct"),
                        match_rationale=cp["match_rationale"],
                        indicative_salary=cp["indicative_salary"],
                        skills=cp.get("skills", []),
                        top_employers=cp.get("top_employers", []),
                        sourceUrl=cp.get("sourceUrl", "https://www.nasscom.in"),
                        lastReviewed=cp.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_cp)
                    total_careers += 1

                # Higher Studies
                for hs in d.get("higher_studies", []):
                    hs_id = hs["id"] if hs["id"].startswith(deg_id) else f"{deg_id}-{hs['id']}"
                    new_hs = HigherStudyModel(
                        id=hs_id,
                        degree_id=deg_id,
                        program_name=hs["program_name"],
                        level=hs.get("level", "PG"),
                        entrance_exams=hs.get("entrance_exams", []),
                        eligibility_rule=hs["eligibility_rule"],
                        typical_duration=hs["typical_duration"],
                        top_institutes=hs.get("top_institutes", []),
                        sourceUrl=hs.get("sourceUrl", "https://www.ugc.gov.in"),
                        lastReviewed=hs.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_hs)
                    total_hs += 1

                # Certifications
                for ct in d.get("certifications", []):
                    ct_id = ct["id"] if ct["id"].startswith(deg_id) else f"{deg_id}-{ct['id']}"
                    new_ct = CertificationModel(
                        id=ct_id,
                        degree_id=deg_id,
                        cert_name=ct["cert_name"],
                        provider=ct["provider"],
                        domain=ct["domain"],
                        level=ct.get("level", "Intermediate"),
                        prerequisites=ct.get("prerequisites", []),
                        official_url=ct["official_url"],
                        cost_band=ct.get("costBand", "Medium (5k-20k)"),
                        sourceUrl=ct.get("sourceUrl", ct["official_url"]),
                        lastReviewed=ct.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_ct)
                    total_certs += 1

                # Government Exams
                for gv in d.get("government_exams", []):
                    gv_id = gv["id"] if gv["id"].startswith(deg_id) else f"{deg_id}-{gv['id']}"
                    new_gv = GovernmentExamModel(
                        id=gv_id,
                        degree_id=deg_id,
                        exam_or_post_name=gv["exam_or_post_name"],
                        conducting_body=gv["conducting_body"],
                        eligibility_rule=gv["eligibility_rule"],
                        is_generalist_fallback=gv.get("is_generalist_fallback", False),
                        sourceUrl=gv.get("sourceUrl", "https://upsc.gov.in"),
                        lastReviewed=gv.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_gv)
                    total_gov += 1

                # Career Switch
                for sw in d.get("career_switch", []):
                    sw_id = sw["id"] if sw["id"].startswith(deg_id) else f"{deg_id}-{sw['id']}"
                    new_sw = CareerSwitchModel(
                        id=sw_id,
                        degree_id=deg_id,
                        target_role=sw["target_role"],
                        pivot_reason=sw["pivot_reason"],
                        why_feasible=sw.get("why_feasible", ""),
                        bridge_steps=sw.get("bridge_steps", []),
                        typical_duration=sw["typical_duration"],
                        recommended_certs=sw.get("recommended_certs", []),
                        sourceUrl=sw.get("sourceUrl", "https://www.coursera.org"),
                        lastReviewed=sw.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_sw)
                    total_sw += 1

                # Entrepreneurship
                for ent in d.get("entrepreneurship", []):
                    ent_id = ent["id"] if ent["id"].startswith(deg_id) else f"{deg_id}-{ent['id']}"
                    new_ent = EntrepreneurshipModel(
                        id=ent_id,
                        degree_id=deg_id,
                        idea_title=ent["idea_title"],
                        description=ent["description"],
                        first_milestones=ent.get("first_milestones", []),
                        relevant_schemes=ent.get("relevant_schemes", []),
                        sourceUrl=ent.get("sourceUrl", "https://www.startupindia.gov.in"),
                        lastReviewed=ent.get("lastReviewed", "2026-08-15")
                    )
                    session.add(new_ent)
                    total_ent += 1

                # Roadmap Template
                rdm = d.get("roadmap_template", {})
                for status in ["pursuing", "completed"]:
                    if status in rdm:
                        phases = rdm[status].get("phases", [])
                        new_rdm = RoadmapTemplateModel(
                            id=f"rdm-{deg_id}-{status}",
                            degree_id=deg_id,
                            status=status,
                            phases=phases,
                            sourceUrl="https://futureforge.ai/curriculum-standards",
                            lastReviewed=d.get("lastReviewed", "2026-08-15")
                        )
                        session.add(new_rdm)
                        total_rdm += 1

        session.commit()
        print("\n=================================================================")
        print("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!")
        print("=================================================================")
        print(f"- Total Degrees Seeded:          {total_degrees}")
        print(f"- Total Career Paths Seeded:     {total_careers}")
        print(f"- Total Higher Studies Seeded:   {total_hs}")
        print(f"- Total Certifications Seeded:   {total_certs}")
        print(f"- Total Government Exams Seeded: {total_gov}")
        print(f"- Total Career Switches Seeded:  {total_sw}")
        print(f"- Total Entrepreneurship Seeded: {total_ent}")
        print(f"- Total Roadmap Templates:       {total_rdm}")
        print("=================================================================\n")

    except Exception as e:
        session.rollback()
        print(f"❌ Seeding error: {e}")
        raise
    finally:
        session.close()

if __name__ == "__main__":
    seed_universal_degrees()
