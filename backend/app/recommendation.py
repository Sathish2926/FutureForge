"""
Lifecycle-Aware & Domain-Aware Recommendation Engine.

Distinguishes:
1. Career Recommendation ("What career fits this person?")
2. Higher Study Recommendation ("What should this person study next?")
3. Career Pathway ("How can this person reach the target career?")

Supports lifecycle stages:
- Class 10
- Class 11/12
- Undergraduate
- Postgraduate
- Working Professional

Maintains strict domain eligibility:
- B.Sc IT / BCA -> MCA, M.Sc CS, M.Sc Data Science
- B.Sc Nursing -> M.Sc Nursing, MPH, MHA (never generic MCA/M.Tech)
- LLB -> LLM, Judicial Services, Corporate Law (never generic MCA/M.Tech)
- MBBS -> MD/MS Specialization, DNB (never generic MCA/M.Tech)
- B.Tech -> M.Tech, MS, MBA
- B.Sc Math/Stats -> M.Sc Math/Stats, Data Science, Actuarial Science
- B.Sc Biotech -> M.Sc Biotech, Bioinformatics
- B.Com / BBA -> MBA, CA, M.Com
"""
import os
import hashlib
import json
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session

from . import models
from .academic_progression import (
    AcademicProgressionEngine,
    normalize_qualification,
    DOCTORAL_HIGHER_STUDIES_CATALOG,
    NormalizedQualification,
)

# Configurable weights for pure scoring tests
WEIGHTS = {
    "interests": 0.25,
    "academic": 0.25,
    "skills": 0.25,
    "goal": 0.25,
}

# Multi-Factor Weighted Scoring Model Weights
MULTIFACTOR_WEIGHTS = {
    "degree_alignment": 0.25,
    "academic_performance": 0.20,
    "goal_alignment": 0.20,
    "interest_alignment": 0.15,
    "skill_alignment": 0.10,
    "feasibility": 0.10,
}

def _confidence_from_score(score: float, has_profile_data: bool = True) -> str:
    if not has_profile_data:
        return "Low"
    if score >= 75:
        return "High"
    if score >= 50:
        return "Medium"
    return "Low"

def generate_reasoning(user: models.User, career: Any, score_result: dict) -> dict:
    c_name = getattr(career, "name", "this career")
    score = score_result.get("score", 75) if isinstance(score_result, dict) else 75
    return {
        "evidence": f"Matches your target field and profile interests in {c_name}",
        "match_summary": f"Strong alignment with a match score of {score}%.",
        "tradeoffs": "Requires dedicated academic preparation and consistent skill development.",
        "alternatives": ["Related specialization pathways", "Industry certification options"],
        "confidence": "High",
    }

def score_career(db: Session, user: models.User, career: Any) -> dict:
    c_slug = getattr(career, "slug", "")
    c_name = getattr(career, "name", "")
    candidates = generate_career_recommendations(db, user)
    for c in candidates:
        if c.get("career_slug") == c_slug or c.get("title") == c_name:
            return {"score": c.get("score", 75.0), "confidence": "High"}
    return {"score": 65.0, "confidence": "Medium"}

def _interest_match(user_interests: set, career: Any) -> float:
    if not user_interests:
        return 0.4
    rec_subj = getattr(career, "recommended_subjects", "") or ""
    rec_set = {s.strip().lower() for s in rec_subj.split(",") if s.strip()}
    if not rec_set:
        return 0.5
    overlap = len(user_interests.intersection(rec_set))
    if overlap == 0:
        return 0.3
    if overlap == 1:
        return 0.7
    return min(1.0, 0.7 + 0.15 * (overlap - 1))

def _academic_match(profile: Any, ed_records: List[Any], career: Any) -> float:
    if not ed_records:
        return 0.5
    recent = max(ed_records, key=lambda r: getattr(r, "marks_percent", 0) or 0)
    marks = getattr(recent, "marks_percent", 60) or 60
    base = min(1.0, max(0.2, marks / 100.0))
    rec_subj = getattr(career, "recommended_subjects", "") or ""
    stream = getattr(recent, "stream", "") or ""
    if stream == "PCM" and any(s in rec_subj for s in ["physics", "math"]):
        base = min(1.0, base + 0.1)
    return base

def _skill_match(user_skills: set, career: Any) -> float:
    links = getattr(career, "skill_links", []) or []
    core_skills = {l.skill.name.lower() for l in links if getattr(l, "priority", "") == "core" and getattr(l, "skill", None)}
    if not core_skills:
        return 0.5
    overlap = len(user_skills.intersection(core_skills))
    if overlap == 0:
        return 0.3
    return min(1.0, 0.5 + (0.5 * overlap / len(core_skills)))

def _goal_match(user_goal_slug: Optional[str], career: Any) -> float:
    if not user_goal_slug:
        return 0.5
    career_slug = getattr(career, "slug", "") or ""
    if user_goal_slug == career_slug:
        return 1.0
    return 0.5

ENGINE_VERSION = "v4_stage_aware_pathways"


# ------------------------------------------------ Domain Knowledge Taxonomy
DOMAIN_HIGHER_STUDIES_MAP = {
    "nursing": {
        "domain_name": "Nursing & Healthcare Administration",
        "allowed_pg_programs": [
            {
                "title": "M.Sc Nursing (Clinical Specialty)",
                "reference": "msc-nursing",
                "field": "Clinical Nursing",
                "base_score": 92,
                "eligibility": "Eligible",
                "prerequisites": "B.Sc Nursing",
                "tags": ["clinical", "nursing", "healthcare", "patient"],
                "reasons": "Direct clinical continuation of B.Sc Nursing, enabling clinical specialization, hospital ward management, and senior nursing educator roles."
            },
            {
                "title": "Master of Public Health (MPH)",
                "reference": "mph-public-health",
                "field": "Public Health & Epidemiology",
                "base_score": 88,
                "eligibility": "Eligible",
                "prerequisites": "Health Science Graduate",
                "tags": ["public health", "epidemiology", "policy", "community"],
                "reasons": "Prepares health science graduates for epidemiology, government health policy, WHO/NGO project management, and global health administration."
            },
            {
                "title": "Master of Hospital Administration (MHA)",
                "reference": "mha-hospital-admin",
                "field": "Healthcare Management",
                "base_score": 85,
                "eligibility": "Eligible",
                "prerequisites": "Graduate in Health Sciences / Allied Health",
                "tags": ["management", "hospital", "administration", "leadership"],
                "reasons": "Combines clinical healthcare experience with healthcare operations, hospital logistics, quality accreditation, and executive administration."
            }
        ],
        "allowed_careers": ["Nurse Manager / Superintendent", "Clinical Research Associate", "Public Health Specialist"]
    },

    "law": {
        "domain_name": "Legal Studies & Judiciary",
        "allowed_pg_programs": [
            {
                "title": "LL.M (Master of Laws - Corporate / Cyber / IP Law)",
                "reference": "llm-master-of-laws",
                "field": "Law & Legal Specialization",
                "base_score": 95,
                "eligibility": "Eligible",
                "prerequisites": "LL.B Degree Required",
                "tags": ["law", "corporate", "intellectual property", "cyber law"],
                "reasons": "Advanced legal specialization for corporate counsel, litigation expertise, intellectual property, or university legal academia."
            },
            {
                "title": "Judicial Services Examination (PCS-J / Civil Judge)",
                "reference": "pcs-j-judiciary",
                "field": "Judiciary & Public Governance",
                "base_score": 90,
                "eligibility": "Eligible",
                "prerequisites": "LL.B Degree & State Bar Registration",
                "tags": ["judiciary", "civil judge", "public service", "court"],
                "reasons": "Competitive civil judicial magistrate pathway for legal graduates seeking service in state judicial administration."
            },
            {
                "title": "Post Graduate Diploma in Intellectual Property Rights (PGDIPR)",
                "reference": "pgd-ipr",
                "field": "Corporate & Tech Law",
                "base_score": 84,
                "eligibility": "Eligible",
                "prerequisites": "Graduate in Law or Science/Tech",
                "tags": ["patents", "copyright", "technology law", "compliance"],
                "reasons": "Specialization in patent law, copyright licensing, technology transfer, and patent attorney certification."
            }
        ],
        "allowed_careers": ["Corporate Lawyer", "Judicial Officer", "Intellectual Property Attorney", "Legal Consultant"]
    },

    "medicine": {
        "domain_name": "Medical Doctor & Specialty Medicine",
        "allowed_pg_programs": [
            {
                "title": "MD (Doctor of Medicine - General Medicine / Radiology / Pediatrics)",
                "reference": "md-postgraduate",
                "field": "Clinical Specialty Medicine",
                "base_score": 96,
                "eligibility": "Eligible",
                "prerequisites": "MBBS + Mandatory Internship Completed",
                "tags": ["medicine", "clinical", "residency", "doctor"],
                "reasons": "Primary 3-year medical post-graduate clinical residency following NEET-PG / INI-CET entrance counselling."
            },
            {
                "title": "MS (Master of Surgery - General Surgery / Orthopedics)",
                "reference": "ms-surgery-postgraduate",
                "field": "Surgical Specialty",
                "base_score": 93,
                "eligibility": "Eligible",
                "prerequisites": "MBBS Degree Required",
                "tags": ["surgery", "trauma", "operating theater", "surgical"],
                "reasons": "Specialized surgical residency training for operating theater procedures and trauma management."
            },
            {
                "title": "DNB (Diplomate of National Board Specialty Certification)",
                "reference": "dnb-specialty",
                "field": "Board Certified Specialty Medicine",
                "base_score": 88,
                "eligibility": "Eligible",
                "prerequisites": "MBBS + NBE CET",
                "tags": ["dnb", "specialty", "hospital residency", "clinical"],
                "reasons": "NBE board-certified clinical specialty residency recognized across major corporate and government super-specialty hospitals."
            }
        ],
        "allowed_careers": ["MBBS Physician", "Specialist Medical Officer", "Clinical Researcher"]
    },

    "computer_science": {
        "domain_name": "Computer Science & Information Technology",
        "allowed_pg_programs": [
            {
                "title": "Master of Computer Applications (MCA)",
                "reference": "mca-master-computer-applications",
                "field": "Computer Applications & Software Engineering",
                "base_score": 94,
                "eligibility": "Eligible",
                "prerequisites": "B.Sc IT / BCA / Math background",
                "tags": ["programming", "software", "development", "coding", "full stack", "java", "python"],
                "reasons": "Standard 2-year post-graduate degree in full-stack software development, database systems, computer networks, and cloud computing."
            },
            {
                "title": "M.Sc Computer Science",
                "reference": "msc-computer-science",
                "field": "Theoretical CS & Software Systems",
                "base_score": 90,
                "eligibility": "Eligible",
                "prerequisites": "CS/IT Graduate",
                "tags": ["algorithms", "theoretical cs", "systems", "research", "software architecture"],
                "reasons": "Deep academic program focusing on algorithms, distributed computing, compiler design, and software architecture."
            },
            {
                "title": "M.Sc Data Science & Artificial Intelligence",
                "reference": "msc-data-science-ai",
                "field": "Data Science & Machine Learning",
                "base_score": 92,
                "eligibility": "Eligible",
                "prerequisites": "Math / Stats / CS background",
                "tags": ["data science", "statistics", "machine learning", "analytics", "data", "python", "ai"],
                "reasons": "Specialized curriculum covering machine learning, statistical modeling, big data engineering, and Python analytics."
            },
            {
                "title": "MBA (Technology Management / Information Systems)",
                "reference": "mba-tech-management",
                "field": "Tech Management & Product Leadership",
                "base_score": 86,
                "eligibility": "Eligible",
                "prerequisites": "Graduate + Entrance Exam",
                "tags": ["management", "leadership", "product", "communication", "business", "entrepreneurship"],
                "reasons": "Bridges technical computing expertise with product management, IT consulting, strategy, and business leadership."
            }
        ],
        "allowed_careers": [
            "Software Engineer",
            "Data Analyst",
            "Full Stack Developer",
            "Data Scientist",
            "Product Manager",
            "AI Research Engineer",
            "Machine Learning Engineer",
            "Cloud Solutions Architect",
            "DevOps Engineer",
            "Cybersecurity Specialist",
            "Systems Architect",
            "Database Administrator",
            "R&D Scientist",
        ]
    },

    "engineering": {
        "domain_name": "Engineering & Technology",
        "allowed_pg_programs": [
            {
                "title": "M.Tech (Master of Technology - CSE / AI / Robotics / VLSI)",
                "reference": "mtech-engineering",
                "field": "Advanced Engineering & Technology",
                "base_score": 94,
                "eligibility": "Eligible",
                "prerequisites": "B.Tech + GATE exam",
                "tags": ["engineering", "technology", "mtech", "research", "gate"],
                "reasons": "Technical post-graduate degree for advanced engineering R&D, core technological research, and university faculty roles."
            },
            {
                "title": "MS in Computer Science / Robotics (Global Universities)",
                "reference": "ms-cs-global",
                "field": "International Tech Research",
                "base_score": 91,
                "eligibility": "Eligible",
                "prerequisites": "B.Tech / B.E. Graduate",
                "tags": ["international", "ms", "global", "research", "robotics"],
                "reasons": "Graduate research program targeting global technology ecosystems, specialized labs, and international tech careers."
            },
            {
                "title": "MBA (Technology Management / Operations)",
                "reference": "mba-tech-management",
                "field": "Business & Engineering Management",
                "base_score": 87,
                "eligibility": "Eligible",
                "prerequisites": "Graduate",
                "tags": ["management", "operations", "leadership", "strategy"],
                "reasons": "Bridges technical engineering knowledge with product management, tech strategy, and executive business leadership."
            }
        ],
        "allowed_careers": ["Software Engineer", "Robotics Engineer", "Mechanical Engineer", "Product Manager"]
    },

    "mathematics_statistics": {
        "domain_name": "Mathematical & Statistical Sciences",
        "allowed_pg_programs": [
            {
                "title": "M.Sc Mathematics / Applied Mathematics",
                "reference": "msc-mathematics",
                "field": "Mathematical Sciences",
                "base_score": 94,
                "eligibility": "Eligible",
                "prerequisites": "B.Sc Math Graduate",
                "tags": ["mathematics", "algebra", "analysis", "pure math", "calculus"],
                "reasons": "Rigorous post-graduate study in analysis, algebra, differential equations, and computational math."
            },
            {
                "title": "M.Sc Statistics / Data Analytics",
                "reference": "msc-statistics-data",
                "field": "Statistical Modeling & Analytics",
                "base_score": 93,
                "eligibility": "Eligible",
                "prerequisites": "Math/Stats background",
                "tags": ["statistics", "data analytics", "probability", "data science", "modeling"],
                "reasons": "Advanced training in probability theory, biostatistics, regression modeling, and data analytics."
            },
            {
                "title": "Actuarial Science Professional Certification (IAI / IFoA)",
                "reference": "actuarial-science-cert",
                "field": "Finance & Risk Analytics",
                "base_score": 89,
                "eligibility": "Eligible",
                "prerequisites": "Math/Stats background",
                "tags": ["actuarial", "finance", "risk", "insurance", "financial math"],
                "reasons": "Professional examination track for financial risk modeling, insurance mathematics, and pension fund management."
            }
        ],
        "allowed_careers": ["Data Scientist", "Actuary / Risk Analyst", "Quantitative Analyst", "Academic Researcher"]
    },

    "biotechnology_life_science": {
        "domain_name": "Biotechnology & Life Sciences",
        "allowed_pg_programs": [
            {
                "title": "M.Sc Biotechnology",
                "reference": "msc-biotechnology",
                "field": "Biological Sciences & Tech",
                "base_score": 93,
                "eligibility": "Eligible",
                "prerequisites": "Life Science / Biotech Graduate",
                "tags": ["biotech", "biology", "genetics", "lab", "fermentation"],
                "reasons": "Post-graduate research program covering recombinant DNA technology, cell culture, fermentation, and bioprocess engineering."
            },
            {
                "title": "M.Sc Bioinformatics",
                "reference": "msc-bioinformatics",
                "field": "Computational Biology",
                "base_score": 90,
                "eligibility": "Eligible",
                "prerequisites": "Biotech / CS background",
                "tags": ["bioinformatics", "genomics", "computational biology", "python"],
                "reasons": "Combines genomics, molecular biology algorithms, sequence analysis, and Python biopython scripting."
            }
        ],
        "allowed_careers": ["Biotechnology Researcher", "Bioinformatics Analyst", "Quality Control Scientist"]
    },

    "business_commerce": {
        "domain_name": "Business Administration, Finance & Commerce",
        "allowed_pg_programs": [
            {
                "title": "MBA (Master of Business Administration - Finance / Marketing / HR)",
                "reference": "mba-finance-marketing",
                "field": "Business Leadership & Finance",
                "base_score": 95,
                "eligibility": "Eligible",
                "prerequisites": "Graduate + CAT/XAT/GMAT",
                "tags": ["management", "mba", "finance", "marketing", "leadership", "business"],
                "reasons": "Premier management degree for corporate strategy, investment management, marketing direction, and executive leadership."
            },
            {
                "title": "Chartered Accountancy (CA Intermediate / Final)",
                "reference": "ca-icai-program",
                "field": "Accounting, Tax & Audit",
                "base_score": 92,
                "eligibility": "Eligible",
                "prerequisites": "ICAI Direct Entry for Commerce Graduates",
                "tags": ["accounting", "audit", "taxation", "ca", "finance"],
                "reasons": "Professional accounting credential for corporate auditing, financial controllership, and tax consulting."
            },
            {
                "title": "M.Com (Master of Commerce - Accounting & Finance)",
                "reference": "mcom-accounting-finance",
                "field": "Commerce & Financial Accounting",
                "base_score": 86,
                "eligibility": "Eligible",
                "prerequisites": "B.Com Degree",
                "tags": ["commerce", "accounting", "banking", "finance"],
                "reasons": "Academic post-graduate degree in financial reporting, corporate governance, and commerce pedagogy."
            }
        ],
        "allowed_careers": ["Financial Analyst", "Chartered Accountant", "Management Consultant", "Marketing Director"]
    },

    "economics_social_science": {
        "domain_name": "Economics & Social Policy",
        "allowed_pg_programs": [
            {
                "title": "MA Economics / M.Sc Applied Economics",
                "reference": "ma-economics",
                "field": "Economics & Econometrics",
                "base_score": 94,
                "eligibility": "Eligible",
                "prerequisites": "BA/B.Sc Economics Graduate",
                "tags": ["economics", "econometrics", "macroeconomics", "finance", "policy"],
                "reasons": "Comprehensive post-graduate degree in micro/macroeconomics, econometrics, and policy evaluation."
            },
            {
                "title": "Master of Public Policy (MPP)",
                "reference": "mpp-public-policy",
                "field": "Public Policy & Governance",
                "base_score": 89,
                "eligibility": "Eligible",
                "prerequisites": "Graduate",
                "tags": ["policy", "governance", "public policy", "social impact"],
                "reasons": "Interdisciplinary program preparing policy analysts for government, think tanks, international development, and NGOs."
            }
        ],
        "allowed_careers": ["Economic Analyst", "Policy Researcher", "Financial Consultant"]
    },

    "class10": {
        "domain_name": "Senior Secondary Stream Options",
        "allowed_pg_programs": [
            {
                "title": "Science (PCM - Physics, Chemistry, Mathematics)",
                "reference": "stream-science-pcm",
                "field": "Engineering & Technical Stream",
                "base_score": 92,
                "eligibility": "Eligible",
                "prerequisites": "Class 10 Pass",
                "tags": ["math", "physics", "engineering", "technology", "pcm"],
                "reasons": "Opens entry into B.Tech, Computer Science, Architecture, Defense (NDA), and pure science research."
            },
            {
                "title": "Science (PCB - Physics, Chemistry, Biology)",
                "reference": "stream-science-pcb",
                "field": "Medical & Biological Stream",
                "base_score": 90,
                "eligibility": "Eligible",
                "prerequisites": "Class 10 Pass",
                "tags": ["biology", "medicine", "doctor", "nursing", "pcb"],
                "reasons": "Opens pathways to NEET (MBBS/BDS), Nursing, Biotechnology, Pharmacy, and Allied Health."
            },
            {
                "title": "Commerce (with Mathematics / Financial Markets)",
                "reference": "stream-commerce",
                "field": "Business & Finance Stream",
                "base_score": 88,
                "eligibility": "Eligible",
                "prerequisites": "Class 10 Pass",
                "tags": ["commerce", "finance", "accounting", "business", "economics"],
                "reasons": "Foundational stream for B.Com, BBA, Chartered Accountancy (CA), Finance, and Business Analytics."
            },
            {
                "title": "Humanities / Arts & Social Sciences",
                "reference": "stream-humanities",
                "field": "Liberal Arts & Public Governance",
                "base_score": 85,
                "eligibility": "Eligible",
                "prerequisites": "Class 10 Pass",
                "tags": ["arts", "humanities", "law", "civil services", "psychology"],
                "reasons": "Ideal foundation for Law (BA LLB), Civil Services (UPSC), Journalism, Psychology, and Design."
            }
        ],
        "allowed_careers": ["Software Engineer", "Doctor", "Chartered Accountant", "Civil Servant", "Lawyer"]
    },

    "class12": {
        "domain_name": "Undergraduate Degree Pathways",
        "allowed_pg_programs": [
            {
                "title": "B.Tech / B.E. (Computer Science / Engineering)",
                "reference": "ug-btech",
                "field": "Engineering & Technology",
                "base_score": 94,
                "required_subjects": ["math", "physics"],
                "entrance_exam": "JEE or institution-specific engineering entrance",
                "eligibility": "Eligible (10+2 PCM Required)",
                "prerequisites": "Class 12 PCM",
                "tags": ["engineering", "pcm", "btech", "computers", "software"],
                "reasons": "4-year professional engineering degree with high industry demand and global career avenues."
            },
            {
                "title": "MBBS / BDS (Bachelor of Medicine / Surgery)",
                "reference": "ug-mbbs",
                "field": "Medicine & Clinical Care",
                "base_score": 93,
                "required_subjects": ["biology", "physics", "chemistry"],
                "entrance_exam": "NEET",
                "eligibility": "Eligible (10+2 PCB + NEET Exam Required)",
                "prerequisites": "Class 12 PCB",
                "tags": ["doctor", "medicine", "pcb", "hospital", "clinical"],
                "reasons": "Premier undergraduate clinical medical program for becoming a licensed medical practitioner."
            },
            {
                "title": "BCA / B.Sc Computer Science",
                "reference": "ug-bca",
                "field": "Computer Applications",
                "base_score": 90,
                "eligibility": "Eligible",
                "prerequisites": "Class 12 Any Stream / Math preferred",
                "tags": ["bca", "programming", "software", "coding"],
                "reasons": "3-year specialized IT degree preparing students for software roles and MCA/M.Sc postgraduation."
            },
            {
                "title": "B.Com / BBA (Bachelor of Commerce / Business Admin)",
                "reference": "ug-bcom-bba",
                "field": "Commerce & Management",
                "base_score": 88,
                "eligibility": "Eligible",
                "prerequisites": "Class 12 Any Stream",
                "tags": ["commerce", "bba", "bcom", "finance", "business"],
                "reasons": "3-year degree establishing solid corporate finance, marketing, and business administration fundamentals."
            },
            {
                "title": "5-Year Integrated B.A. LL.B (Law)",
                "reference": "ug-ballb",
                "field": "Legal Studies",
                "base_score": 87,
                "eligibility": "Eligible (CLAT / Entrance Exam Required)",
                "prerequisites": "Class 12 Any Stream",
                "tags": ["law", "clat", "ballb", "judiciary", "legal"],
                "reasons": "Integrated 5-year law degree training students for advocacy, judiciary, corporate law, and legal compliance."
            }
        ],
        "allowed_careers": ["Software Engineer", "MBBS Doctor", "Chartered Accountant", "Corporate Lawyer", "Data Analyst"]
    }
}


def detect_user_domain(user: models.User, stage_override: Optional[str] = None) -> str:
    """
    Detects the user's primary academic domain based on current education stage,
    degree, stream, and major.
    """
    if not user.profile:
        return "computer_science"

    stage = normalize_education_stage(stage_override or (user.profile.education_stage if user.profile else "ug"))
    if stage in ["class10"]:
        return "class10"
    if stage in ["class12", "class11"]:
        return "class12"

    records = list(user.education_records)
    combined_text = ""
    for r in records:
        combined_text += f" {r.institution_name or ''} {r.board_or_university or ''} {r.stream or ''} {r.subjects or ''}"

    if user.profile.current_class_or_year:
        combined_text += f" {user.profile.current_class_or_year}"

    text = combined_text.lower()

    if "nursing" in text or "b.sc nursing" in text:
        return "nursing"
    if "llb" in text or "law" in text or "legal" in text or "b.a. ll.b" in text:
        return "law"
    if "mbbs" in text or "doctor" in text or "medicine" in text:
        return "medicine"
    
    # Check computer science & computing BEFORE generic engineering keyword!
    cs_keywords = [
        "computer science", "cse", "cs", "information technology", " it", "software",
        "artificial intelligence", " ai", "machine learning", " ml", "data science",
        "cybersecurity", "cyber security", "cloud", "devops", "mca", "bca", "distributed systems"
    ]
    if any(k in text for k in cs_keywords):
        return "computer_science"

    if "b.tech" in text or "b.e" in text or "engineering" in text or "btech" in text or "polytechnic" in text:
        return "engineering"
    if "math" in text or "mathematics" in text or "statistics" in text:
        return "mathematics_statistics"
    if "biotech" in text or "biotechnology" in text or "life science" in text:
        return "biotechnology_life_science"
    if "b.com" in text or "bba" in text or "commerce" in text or "finance" in text:
        return "business_commerce"
    if "economics" in text or "econometrics" in text:
        return "economics_social_science"
    
    return "computer_science"


def normalize_education_stage(stage: Optional[str]) -> str:
    value = (stage or "ug").strip().lower()
    return {
        "class_10": "class10", "class 10": "class10", "class10": "class10",
        "class_12": "class12", "class 12": "class12", "class11": "class12", "class12": "class12",
        "diploma": "diploma", "undergraduate": "ug", "ug": "ug",
        "postgraduate": "pg", "pg": "pg",
        "phd": "doctoral", "doctoral": "doctoral",
        "professional": "working_professional", "job_switcher": "working_professional",
        "working_professional": "working_professional",
    }.get(value, value)


def recommendation_scope(stage: str) -> str:
    return {
        "class10": "stream",
        "class12": "undergraduate",
        "ug": "postgraduate_or_career",
        "pg": "research_or_career",
        "doctoral": "postdoctoral_or_research",
        "working_professional": "career_transition",
    }.get(normalize_education_stage(stage), "career_discovery")


def generate_idempotency_hash(
    user_id: int,
    profile_version: int,
    career_dna_version: int,
    recommendation_type: str,
    goal_text: Optional[str] = None,
    engine_version: str = ENGINE_VERSION
) -> str:
    """Computes a deterministic SHA256 hash for idempotency checking."""
    raw = f"{user_id}:{profile_version}:{career_dna_version}:{recommendation_type}:{goal_text or ''}:{engine_version}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:32]


def _latest_career_dna(db: Session, user: models.User, stage: Optional[str] = None) -> Optional[models.CareerDNAResponse]:
    query = db.query(models.CareerDNAResponse).filter_by(user_id=user.id)
    if stage:
        query = query.filter_by(stage=stage)
    return (
        query
        .order_by(models.CareerDNAResponse.updated_at.desc(), models.CareerDNAResponse.id.desc())
        .first()
    )


def _extract_signals(db: Session, user: models.User, stage_override: Optional[str] = None) -> Dict[str, Any]:
    """Extracts all user interest, skill, goal, and profile signals into a structured dictionary."""
    stage = normalize_education_stage(stage_override or (user.profile.education_stage if user.profile else "ug"))
    dna_stage = "job_switcher" if stage == "working_professional" else stage
    dna_record = _latest_career_dna(db, user, dna_stage)
    dna_answers = dna_record.answers_json if dna_record and dna_record.answers_json else {}

    skills = {us.skill.name.lower() for us in user.user_skills} if user.user_skills else set()
    if isinstance(dna_answers.get("skills_so_far"), str):
        skills |= {s.strip().lower() for s in dna_answers["skills_so_far"].split(",") if s.strip()}

    interests = {ui.interest.name.lower() for ui in user.user_interests} if user.user_interests else set()
    for k in ["favorite_subjects", "strong_subjects", "career_curiosity", "next_step_interest", "target_field"]:
        val = dna_answers.get(k)
        if isinstance(val, list):
            interests |= {str(x).strip().lower() for x in val if str(x).strip()}
        elif isinstance(val, str) and val.strip():
            interests.add(val.strip().lower())

    primary_goal = next((g for g in user.career_goals if g.is_primary and g.status == "active"), None)
    goal_slug = primary_goal.career.slug if primary_goal and primary_goal.career else None

    degree = "Standard Graduate"
    marks = 75.0
    status = "completed"
    if user.profile and user.profile.current_class_or_year:
        cc_lower = user.profile.current_class_or_year.lower()
        if "dropped" in cc_lower or "dropout" in cc_lower:
            status = "dropped_out"
        elif any(w in cc_lower for w in ["pursuing", "ongoing", "final year", "studying", "enrolled"]):
            status = "pursuing"
        elif "backlog" in cc_lower:
            status = "backlog"
        elif "gap" in cc_lower:
            status = "gap_year"

    if user.education_records:
        rec = max(list(user.education_records), key=lambda x: (x.end_year or 0, x.id))
        degree = rec.stream or rec.board_or_university or "Graduate"
        if rec.marks_percent:
            marks = rec.marks_percent
        stream_lower = (rec.stream or "").lower()
        if "dropped" in stream_lower or "dropout" in stream_lower:
            status = "dropped_out"
        elif "pursuing" in stream_lower:
            status = "pursuing"
        elif "backlog" in stream_lower:
            status = "backlog"

    # For dropped out users, identify previous completed degree if available
    previous_degree = None
    if status == "dropped_out" and len(user.education_records) > 1:
        sorted_recs = sorted(list(user.education_records), key=lambda x: (x.end_year or 0, x.id))
        for r in reversed(sorted_recs[:-1]):
            if r.stream and not any(d in (r.stream or "").lower() for d in ["dropped", "dropout"]):
                previous_degree = r.stream
                break

    return {
        "skills": skills,
        "interests": interests,
        "goal_slug": goal_slug,
        "dna_answers": dna_answers,
        "degree": degree,
        "marks": marks,
        "stage": stage,
        "status": status,
        "previous_degree": previous_degree,
        "assessment_stage": dna_record.stage if dna_record else None,
        "education_record": _latest_education_record(user),
    }


def score_candidate_program(program: dict, signals: dict) -> dict:
    """
    Computes transparent multi-factor score out of 100 for a program.
    Ensures different profiles with the same degree get personalized rankings.
    """
    base = float(program.get("base_score", 70))
    tags = {str(tag).lower() for tag in program.get("tags", [])}

    # 1. Degree Alignment (0.25)
    degree_text = str(signals.get("degree", "")).lower()
    degree_tags = {str(tag).lower() for tag in program.get("degree_tags", [])}
    deg_score = 90.0 if not degree_tags or any(tag in degree_text for tag in degree_tags) else 45.0

    # 2. Academic Performance (0.20)
    marks = signals.get("marks", 75.0)
    acad_score = min(100.0, max(50.0, marks))

    # 3. Goal Alignment (0.20)
    goal_score = 55.0
    dna_goals = signals.get("dna_answers", {}).get("next_step_interest", [])
    if isinstance(dna_goals, str):
        dna_goals = [dna_goals]
    
    if any("higher studies" in str(g).lower() or "research" in str(g).lower() for g in dna_goals):
        goal_score = 95.0
    elif any("placement" in str(g).lower() or "job" in str(g).lower() for g in dna_goals):
        if "placement" in program["title"].lower() or "job" in program["title"].lower():
            goal_score = 95.0
        else:
            goal_score = 70.0

    # 4. Interest Alignment (0.15)
    user_interests = {str(item).lower() for item in signals.get("interests", set())}
    interest_overlap = len(user_interests & tags)
    interest_score = min(100.0, 70.0 + (interest_overlap * 10.0))

    # 5. Skill Alignment (0.10)
    user_skills = {str(item).lower() for item in signals.get("skills", set())}
    skill_overlap = len(user_skills & tags)
    skill_score = min(100.0, 65.0 + (skill_overlap * 12.0))

    # 6. Feasibility & Constraints (0.10)
    feasibility_score = 85.0 if signals.get("eligibility_status") in {"Eligible", "ELIGIBLE", "Requires entrance exam", "REQUIRES_ENTRANCE_EXAM", "Eligible with conditions", "ELIGIBLE_WITH_CONDITIONS"} else 45.0

    total = (
        deg_score * MULTIFACTOR_WEIGHTS["degree_alignment"]
        + acad_score * MULTIFACTOR_WEIGHTS["academic_performance"]
        + goal_score * MULTIFACTOR_WEIGHTS["goal_alignment"]
        + interest_score * MULTIFACTOR_WEIGHTS["interest_alignment"]
        + skill_score * MULTIFACTOR_WEIGHTS["skill_alignment"]
        + feasibility_score * MULTIFACTOR_WEIGHTS["feasibility"]
    )

    score_val = round(total, 1)
    match_level = "Strong Alignment" if score_val >= 82 else ("Good Alignment" if score_val >= 68 else "Limited Alignment")

    return {
        "score": score_val,
        "match_level": match_level,
        "breakdown": {
            "degree_alignment": deg_score,
            "academic_performance": acad_score,
            "goal_alignment": goal_score,
            "interest_alignment": interest_score,
            "skill_alignment": skill_score,
            "feasibility": feasibility_score,
        }
    }


def _latest_education_record(user: models.User):
    if not user.education_records:
        return None
    return max(list(user.education_records), key=lambda record: (record.end_year or 0, record.id))


def _eligibility_for_program(program: dict, signals: dict) -> tuple[str, list[str]]:
    stage = normalize_education_stage(signals.get("stage"))
    record = signals.get("education_record")
    stream_text = " ".join(str(value or "") for value in [getattr(record, "stream", ""), getattr(record, "subjects", "")]).lower()
    marks = signals.get("marks")
    required_stage = program.get("required_stage")
    missing = []
    if required_stage and required_stage != stage:
        return "NOT_CURRENTLY_ELIGIBLE", [f"Requires {required_stage} stage"]
    if stage == "class12" and not record:
        return "UNKNOWN", ["Class 12 subjects and marks are required"]
    required_subjects = [item.lower() for item in program.get("required_subjects", [])]
    if required_subjects:
        absent = [subject for subject in required_subjects if subject not in stream_text]
        if absent:
            missing.extend(absent)
            return "NOT_CURRENTLY_ELIGIBLE", [f"Required subjects: {', '.join(absent)}"]
    minimum_marks = program.get("minimum_marks")
    if minimum_marks and marks is None:
        return "UNKNOWN", ["Marks are required"]
    if minimum_marks and marks < minimum_marks:
        return "NOT_CURRENTLY_ELIGIBLE", [f"Minimum marks: {minimum_marks}%"]
    entrance = program.get("entrance_exam")
    if entrance:
        return "REQUIRES_ENTRANCE_EXAM", [f"Entrance requirement: {entrance}"]
    return "ELIGIBLE", []


def _candidate_programs_for_stage(domain_info: dict, stage: str, domain_key: str = "computer_science") -> list[dict]:
    stage = normalize_education_stage(stage)
    if stage == "class10":
        return [{**item, "required_stage": "class10", "pathway_type": "VOCATIONAL_PATHWAY"} for item in domain_info.get("allowed_pg_programs", [])]
    if stage == "class12":
        return [{**item, "required_stage": "class12", "pathway_type": "INDUSTRY_ENTRY"} for item in domain_info.get("allowed_pg_programs", [])]
    if stage == "ug":
        return [{**item, "required_stage": "ug", "pathway_type": "HIGHER_STUDIES"} for item in domain_info.get("allowed_pg_programs", [])]
    if stage in ["pg", "phd", "doctoral"]:
        # Return genuine doctoral and research pathways, NEVER ordinary industry careers
        if stage in ["phd", "doctoral"]:
            postdoc_programs = DOCTORAL_HIGHER_STUDIES_CATALOG.get("postdoctoral", [])
            return [{**item, "required_stage": stage, "pathway_type": "RESEARCH"} for item in postdoc_programs]

        catalog = DOCTORAL_HIGHER_STUDIES_CATALOG.get(domain_key) or DOCTORAL_HIGHER_STUDIES_CATALOG.get("engineering")
        if catalog:
            return [{**item, "required_stage": "pg", "pathway_type": "RESEARCH" if "phd" in item["reference"] or "fellowship" in item["reference"] or "rd-" in item["reference"] else item.get("pathway_type", "HIGHER_STUDIES")} for item in catalog]

        # Domain doctoral fallback for science / humanities / health
        return [
            {
                "title": f"Ph.D in {domain_info['domain_name']}",
                "reference": f"phd-{domain_info['domain_name'].lower().replace(' ', '-')}",
                "field": "Doctoral Research",
                "base_score": 94,
                "tags": ["research", "phd", "doctoral"],
                "degree_tags": [],
                "eligibility": "ELIGIBLE",
                "prerequisites": f"Master's Degree in {domain_info['domain_name']} with valid qualifying test",
                "reasons": f"Terminal academic and doctoral thesis research in {domain_info['domain_name']}.",
                "pathway_type": "RESEARCH",
                "required_stage": "pg",
            },
            {
                "title": f"Research Fellowship (JRF / SRF) in {domain_info['domain_name']}",
                "reference": f"fellowship-{domain_info['domain_name'].lower().replace(' ', '-')}",
                "field": "National Research Fellowship",
                "base_score": 90,
                "tags": ["fellowship", "research", "jrf"],
                "degree_tags": [],
                "eligibility": "REQUIRES_ENTRANCE_EXAM",
                "prerequisites": "Master's Degree + National Eligibility Test (NET / GATE / CSIR)",
                "reasons": f"Funded research residency and doctoral fellowship in recognized laboratories and institutions.",
                "pathway_type": "RESEARCH",
                "required_stage": "pg",
            },
            {
                "title": "MBA / Master of Management Studies",
                "reference": "mba-exec-transition",
                "field": "Management & Leadership Transition",
                "base_score": 84,
                "tags": ["mba", "management", "leadership"],
                "degree_tags": [],
                "eligibility": "ELIGIBLE",
                "prerequisites": "Postgraduate or Graduate Degree",
                "reasons": "Professional executive management degree enabling transition into department leadership and strategy.",
                "pathway_type": "CAREER_TRANSITION",
                "required_stage": "pg",
            },
        ]
    return []


def generate_higher_study_recommendations(db: Session, user: models.User, stage_override: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Generates domain-aware, lifecycle-aware Higher Study Recommendations
    evaluated against academic progression rules, candidate generation, and multi-factor weighted scoring.
    Strictly excludes the user's current qualification and same-level duplicates.
    """
    stage = normalize_education_stage(stage_override or (user.profile.education_stage if user.profile else "ug"))
    if stage == "working_professional":
        return []
    domain_key = detect_user_domain(user, stage_override=stage)
    domain_info = DOMAIN_HIGHER_STUDIES_MAP.get(domain_key, DOMAIN_HIGHER_STUDIES_MAP["computer_science"])
    signals = _extract_signals(db, user, stage_override=stage)
    programs = _candidate_programs_for_stage(domain_info, stage, domain_key=domain_key)

    user_status = signals.get("status", "completed")
    curr_norm = normalize_qualification(signals.get("degree", ""), level_hint=stage)

    items = []

    # If user dropped out, add an academic recovery / degree completion pathway at top priority
    if user_status == "dropped_out":
        prev_text = f" (Previous Completed Degree: {signals['previous_degree']})" if signals.get("previous_degree") else ""
        items.append({
            "item_type": "higher_study",
            "item_reference": "academic-recovery-reentry",
            "title": f"Degree Completion & Credit Re-entry Pathway ({curr_norm.display_name})",
            "sector_or_field": "Academic Recovery & Degree Completion",
            "rank": 1,
            "score": 96.0,
            "match_level": "High",
            "eligibility_status": "Eligible for Re-entry",
            "eligibility_state": "ELIGIBLE",
            "pathway_type": "ACADEMIC_RECOVERY",
            "stage": stage,
            "profile_alignment": "High",
            "structured_reasons": {
                "evidence": f"Academic Status: Incomplete / Dropped Out ({curr_norm.display_name}){prev_text}",
                "requirement": "University academic continuation or institutional credit transfer",
                "eligibility_checks": ["Prior completed degree valid for credit transfer or continuation"],
                "eligibility_state": "ELIGIBLE",
                "pathway_type": "ACADEMIC_RECOVERY",
                "tradeoffs": "Completing your degree or using credit transfer is the fastest route to re-qualifying for higher academic and public sector opportunities.",
                "confidence": "High",
                "why_fit": f"You have not completed {curr_norm.display_name}. Finishing this degree is essential before entering regular postgraduate or doctoral admissions.",
                "why_recommended": "Credential completion & academic recovery.",
                "why_eligible": "Academic institutions support readmission and credit transfer under UGC guidelines.",
                "next_steps": "Contact university registrar / examination controller for re-registration or lateral completion options.",
            }
        })

    for idx, prog in enumerate(programs):
        # Academic Progression Engine Validation
        validation = AcademicProgressionEngine.validate_higher_study(
            current_user_degree=curr_norm,
            candidate_program=prog,
            user_status=user_status,
            user_goals=list(signals.get("interests", set())),
        )
        if not validation["valid"]:
            # Hard exclusion: reject same qualification, lower level, or incompatible discipline
            continue

        eligibility_status, eligibility_reasons = _eligibility_for_program(prog, signals)
        signals["eligibility_status"] = eligibility_status
        if eligibility_status == "NOT_CURRENTLY_ELIGIBLE":
            continue
        display_eligibility = {
            "ELIGIBLE": "Eligible",
            "REQUIRES_ENTRANCE_EXAM": "Requires entrance exam",
            "ELIGIBLE_WITH_CONDITIONS": "Eligible with conditions",
            "UNKNOWN": "Eligibility needs verification",
        }.get(eligibility_status, eligibility_status)
        scored = score_candidate_program(prog, signals)

        explainability = validation.get("explainability", {})

        items.append({
            "item_type": "higher_study",
            "item_reference": prog["reference"],
            "title": prog["title"],
            "sector_or_field": prog["field"],
            "rank": len(items) + 1,
            "score": scored["score"],
            "match_level": scored["match_level"],
            "eligibility_status": display_eligibility,
            "eligibility_state": eligibility_status,
            "pathway_type": prog.get("pathway_type", "RESEARCH" if stage in ["pg", "phd", "doctoral"] else "HIGHER_STUDIES"),
            "stage": stage,
            "profile_alignment": scored["match_level"],
            "structured_reasons": {
                "evidence": f"Academic Qualification: {signals['degree']} | Domain: {domain_info['domain_name']}",
                "requirement": prog.get("prerequisites", "Standard domain background"),
                "eligibility_checks": eligibility_reasons,
                "eligibility_state": eligibility_status,
                "pathway_type": prog.get("pathway_type", "RESEARCH" if stage in ["pg", "phd", "doctoral"] else "HIGHER_STUDIES"),
                "tradeoffs": "Requires targeted entrance preparation and dedicated research focus.",
                "confidence": scored["match_level"],
                "why_fit": prog.get("reasons", ""),
                "why_recommended": explainability.get("why_recommended", prog.get("reasons", "")),
                "why_eligible": explainability.get("why_eligible", "Satisfies prerequisite level"),
                "next_steps": explainability.get("next_steps", "Prepare for entrance examinations"),
                "timing_advice": validation.get("timing_advice", ""),
            }
        })

    items.sort(key=lambda x: x["score"], reverse=True)
    for idx, item in enumerate(items):
        item["rank"] = idx + 1

    return items


def generate_career_recommendations(db: Session, user: models.User) -> List[Dict[str, Any]]:
    """
    Generates ranked Career Recommendations using candidate evaluation & domain awareness.
    Guarantees discipline-specific career alignment (e.g. M.Tech CSE profiles receive
    Software/AI/Cloud/Systems roles, never unrelated Mechanical/Civil GET roles).
    """
    domain_key = detect_user_domain(user)
    domain_info = DOMAIN_HIGHER_STUDIES_MAP.get(domain_key, DOMAIN_HIGHER_STUDIES_MAP["computer_science"])
    signals = _extract_signals(db, user)

    all_careers = db.query(models.Career).all()
    items = []

    # Cross-discipline exclusion list for computer science profiles
    core_engineering_blacklist = [
        "mechanical", "civil", "automobile", "thermodynamics", "structural mechanics",
        "core & automation", "plc / scada", "autocad", "solidworks", "chemical engineering"
    ]

    for c in all_careers:
        c_name_lower = c.name.lower()
        c_desc_lower = (c.description or "").lower()

        # Hard exclusion for Computer Science profiles against unrelated Core Mechanical/Civil
        if domain_key == "computer_science":
            if any(b in c_name_lower or b in c_desc_lower for b in core_engineering_blacklist):
                user_interests = signals["interests"]
                user_skills = signals["skills"]
                if not any(b in s for s in user_interests for b in core_engineering_blacklist) and not any(b in s for s in user_skills for b in core_engineering_blacklist):
                    continue

        is_domain_match = any(ac.lower() in c.name.lower() or c.name.lower() in ac.lower() for ac in domain_info["allowed_careers"])
        
        base = 86.0 if is_domain_match else 60.0
        user_skills = signals["skills"]
        user_interests = signals["interests"]

        overlap = 0
        if c.recommended_subjects:
            subj_list = [s.strip().lower() for s in c.recommended_subjects.split(",")]
            overlap += len(user_interests & set(subj_list))

        score = min(98.0, base + (overlap * 4.0))
        match_level = "High" if score >= 80 else ("Good" if score >= 65 else "Possible")

        items.append({
            "item_type": "career",
            "item_reference": c.slug,
            "title": c.name,
            "sector_or_field": c.sector,
            "score": float(score),
            "match_level": match_level,
            "eligibility_status": "Eligible",
            "structured_reasons": {
                "evidence": f"Domain Alignment: {domain_info['domain_name']}",
                "requirement": c.recommended_subjects or "Standard domain skills",
                "tradeoffs": c.typical_progression or "Requires technical skill build-up and project portfolio.",
                "confidence": "High" if score >= 78 else "Medium",
                "why_fit": f"Strong career alignment with {c.sector} and background in {domain_info['domain_name']}."
            }
        })

    items.sort(key=lambda x: x["score"], reverse=True)
    return items[:5]


def try_gemini_explain(prompt: str, system_prompt: str | None = None) -> Optional[str]:
    """Call Gemini with an optional system prompt. Returns None when
    Gemini is unavailable or the call fails — callers fall back to
    deterministic replies.

    Parameters
    ----------
    prompt : str
        The user-facing message to send to Gemini.
    system_prompt : str | None
        The system instruction that scopes the model's persona and
        guardrails (e.g. the Futureforge Career Guide prompt).
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        import google.generativeai as genai  # noqa: E402
        genai.configure(api_key=api_key)

        model_kwargs: dict = {"model_name": "gemini-2.0-flash"}
        if system_prompt:
            model_kwargs["system_instruction"] = system_prompt

        model = genai.GenerativeModel(**model_kwargs)
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text.strip()
    except Exception:
        # Silently degrade — the chat handler has deterministic fallbacks
        pass

    return None

