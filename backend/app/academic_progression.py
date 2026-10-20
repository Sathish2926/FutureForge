"""
FutureForge Academic Progression Engine (Python Core).

Provides universal academic hierarchy modeling, normalization of degree qualifications,
strict anti-duplication hard rules, discipline compatibility matching, status-aware
lifecycle handling, and factual explainability for Higher Studies and Career pathways.

Adheres strictly to the Academic Progression Hierarchy:
Class 10 -> Class 11-12 / Diploma -> Undergraduate (UG) -> Postgraduate (PG) -> Doctoral / Ph.D -> Postdoctoral
"""

import re
from typing import Dict, List, Any, Optional, Tuple, Set


ACADEMIC_LEVEL_RANKS: Dict[str, float] = {
    "class10": 1.0,
    "class12": 2.0,
    "diploma": 2.5,
    "ug": 3.0,
    "pg": 4.0,
    "doctoral": 5.0,
    "postdoctoral": 6.0,
}

ELIGIBLE_NEXT_LEVELS: Dict[str, List[str]] = {
    "class10": ["class12", "diploma"],
    "class12": ["ug"],
    "diploma": ["ug"],  # Lateral Entry B.Tech / UG
    "ug": ["pg"],
    "pg": ["doctoral"],
    "doctoral": ["postdoctoral"],
    "postdoctoral": ["postdoctoral"],
}

# Discipline keyword maps for robust normalization
DISCIPLINE_PATTERNS: List[Tuple[str, List[str]]] = [
    ("computer_science", [
        "computer science", "cse", "cs", "information technology", " it", "software",
        "artificial intelligence", " ai", "machine learning", " ml", "data science",
        "cybersecurity", "cyber security", "cloud", "devops", "mca", "bca", "distributed systems"
    ]),
    ("mechanical", [
        "mechanical", "mech", "automobile", "automotive", "mechatronics", "thermal",
        "manufacturing", "cad", "cam", "robotics"
    ]),
    ("electrical_electronics", [
        "electrical", "eee", "ece", "electronics", "vlsi", "embedded", "telecommunication",
        "power systems", "instrumentation"
    ]),
    ("civil", [
        "civil", "structural", "construction", "environmental engineering", "transportation"
    ]),
    ("biotechnology", [
        "biotechnology", "biotech", "bioinformatics", "life sciences", "biology", "genetics",
        "microbiology", "biomedical"
    ]),
    ("mathematics_statistics", [
        "mathematics", "applied mathematics", "maths", "math", "statistics", "stats",
        "data analytics", "actuarial"
    ]),
    ("business_commerce", [
        "business", "management", "commerce", "finance", "marketing", "accounting",
        "mba", "bba", "b.com", "m.com", "chartered accountancy", " ca"
    ]),
    ("medicine_health", [
        "medicine", "mbbs", "md", "ms surgery", "nursing", "pharmacy", "b.pharm", "m.pharm",
        "public health", "hospital administration", "clinical"
    ]),
    ("law", [
        "law", "legal", "llb", "ll.b", "llm", "ll.m", "judiciary", "justice"
    ]),
    ("humanities_arts", [
        "arts", "humanities", "economics", "econometrics", "psychology", "sociology",
        "english", "literature", "journalism", "public policy"
    ]),
]

# Qualification pattern matcher
QUALIFICATION_PATTERNS: List[Tuple[str, str, List[str]]] = [
    # (qualification_id, academic_level, [regex patterns or substrings])
    ("postdoc", "postdoctoral", ["post-doc", "postdoc", "post-doctoral", "post doctoral"]),
    ("phd", "doctoral", ["ph.d", "phd", "doctor of philosophy", "doctorate", "doctoral"]),
    ("mtech", "pg", ["m.tech", "mtech", "master of technology", "m.e.", "master of engineering"]),
    ("ms", "pg", ["m.s.", " ms in", "master of science in engineering"]),
    ("msc", "pg", ["m.sc", "msc", "master of science"]),
    ("mca", "pg", ["mca", "master of computer applications"]),
    ("mba", "pg", ["mba", "master of business administration", "pgdm"]),
    ("mcom", "pg", ["m.com", "mcom", "master of commerce"]),
    ("md_ms", "pg", ["m.d.", "md", "m.s. surgery", "master of surgery"]),
    ("llm", "pg", ["ll.m", "llm", "master of laws"]),
    ("btech", "ug", ["b.tech", "btech", "b.e.", "b.e", "bachelor of technology", "bachelor of engineering"]),
    ("bsc", "ug", ["b.sc", "bsc", "bachelor of science"]),
    ("bca", "ug", ["bca", "bachelor of computer applications"]),
    ("bba", "ug", ["bba", "bachelor of business administration"]),
    ("bcom", "ug", ["b.com", "bcom", "bachelor of commerce"]),
    ("mbbs", "ug", ["mbbs", "bachelor of medicine"]),
    ("llb", "ug", ["ll.b", "llb", "bachelor of laws", "ba llb"]),
    ("diploma", "diploma", ["diploma", "polytechnic"]),
    ("class12", "class12", ["class 12", "class-12", "12th", "10+2", "higher secondary", "intermediate"]),
    ("class10", "class10", ["class 10", "class-10", "10th", "matriculation", "secondary school"]),
]


class NormalizedQualification:
    def __init__(
        self,
        raw_text: str,
        academic_level: str,
        qualification_id: str,
        discipline_id: str,
        specialization: str,
        display_name: str,
    ):
        self.raw_text = raw_text
        self.academic_level = academic_level
        self.qualification_id = qualification_id
        self.discipline_id = discipline_id
        self.specialization = specialization
        self.display_name = display_name

    def to_dict(self) -> Dict[str, Any]:
        return {
            "raw_text": self.raw_text,
            "academic_level": self.academic_level,
            "qualification_id": self.qualification_id,
            "discipline_id": self.discipline_id,
            "specialization": self.specialization,
            "display_name": self.display_name,
        }

    def __repr__(self) -> str:
        return f"<NormalizedQualification level={self.academic_level} qual={self.qualification_id} disc={self.discipline_id} spec={self.specialization}>"


def normalize_qualification(raw_text: Optional[str], level_hint: Optional[str] = None) -> NormalizedQualification:
    """
    Normalizes any degree, stream, or education string into a canonical representation.
    Extracts qualification_id, academic_level, discipline_id, and clean specialization.
    """
    cleaned = (raw_text or "").strip().lower()
    
    # 1. Determine Qualification & Level
    detected_qual = "other"
    detected_level = level_hint or "ug"
    
    for q_id, q_level, patterns in QUALIFICATION_PATTERNS:
        if any(p in cleaned for p in patterns):
            detected_qual = q_id
            detected_level = q_level
            break
            
    # Fallback to level_hint if detected is generic
    if detected_qual == "other" and level_hint:
        clean_hint = level_hint.lower().strip()
        if clean_hint in ACADEMIC_LEVEL_RANKS:
            detected_level = clean_hint
            
    # 2. Determine Discipline
    detected_disc = "general"

    # Direct qualification to discipline priors
    if detected_qual in ["mbbs", "md_ms"]:
        detected_disc = "medicine_health"
    elif detected_qual in ["mca", "bca"]:
        detected_disc = "computer_science"
    elif detected_qual in ["llb", "llm"]:
        detected_disc = "law"
    elif detected_qual in ["mba", "bba", "mcom", "bcom"]:
        detected_disc = "business_commerce"
    else:
        for disc_id, disc_patterns in DISCIPLINE_PATTERNS:
            matched = False
            for p in disc_patterns:
                p_clean = p.strip()
                if len(p_clean) <= 3:
                    if re.search(r"\b" + re.escape(p_clean) + r"\b", cleaned):
                        matched = True
                        break
                else:
                    if p in cleaned:
                        matched = True
                        break
            if matched:
                detected_disc = disc_id
                break

    # 3. Clean Specialization & Display Title
    spec = "General"
    if detected_disc == "computer_science":
        if any(x in cleaned for x in ["ai", "artificial intelligence", "machine learning", "data science"]):
            spec = "Artificial Intelligence & Data Science"
        elif any(x in cleaned for x in ["cyber", "security"]):
            spec = "Cybersecurity & Information Security"
        elif any(x in cleaned for x in ["cloud", "devops"]):
            spec = "Cloud Computing & DevOps"
        elif any(x in cleaned for x in ["it", "information technology"]):
            spec = "Information Technology"
        else:
            spec = "Computer Science & Engineering"
    elif detected_disc == "mechanical":
        spec = "Mechanical Engineering"
    elif detected_disc == "electrical_electronics":
        spec = "Electronics & Electrical Engineering"
    elif detected_disc == "civil":
        spec = "Civil & Structural Engineering"
    elif detected_disc == "biotechnology":
        spec = "Biotechnology & Life Sciences"
    elif detected_disc == "mathematics_statistics":
        spec = "Mathematics & Statistics"
    elif detected_disc == "business_commerce":
        spec = "Management & Business Administration"
    elif detected_disc == "medicine_health":
        spec = "Medicine & Health Sciences"
    elif detected_disc == "law":
        spec = "Legal Studies"

    display_prefix = {
        "phd": "Ph.D",
        "postdoc": "Post-Doctoral Fellowship",
        "mtech": "M.Tech",
        "ms": "MS",
        "msc": "M.Sc",
        "mca": "MCA",
        "mba": "MBA",
        "mcom": "M.Com",
        "md_ms": "MD/MS",
        "llm": "LL.M",
        "btech": "B.Tech",
        "bsc": "B.Sc",
        "bca": "BCA",
        "bba": "BBA",
        "bcom": "B.Com",
        "mbbs": "MBBS",
        "llb": "LL.B",
        "diploma": "Diploma",
        "class12": "Class 12",
        "class10": "Class 10",
    }.get(detected_qual, detected_qual.upper())

    display_name = f"{display_prefix} in {spec}" if spec != "General" else display_prefix

    return NormalizedQualification(
        raw_text=raw_text or "",
        academic_level=detected_level,
        qualification_id=detected_qual,
        discipline_id=detected_disc,
        specialization=spec,
        display_name=display_name,
    )


class AcademicProgressionEngine:
    """
    Universal engine for validating, ranking, and explaining academic pathways
    and higher study recommendations.
    """

    @staticmethod
    def get_level_rank(level: str) -> float:
        return ACADEMIC_LEVEL_RANKS.get(level.lower().strip(), 3.0)

    @staticmethod
    def get_eligible_next_levels(current_level: str) -> List[str]:
        return ELIGIBLE_NEXT_LEVELS.get(current_level.lower().strip(), ["pg"])

    @staticmethod
    def validate_higher_study(
        current_user_degree: NormalizedQualification,
        candidate_program: Dict[str, Any],
        user_status: str = "completed",
        user_goals: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Validates a candidate higher study option against user's current qualification.
        Applies hard exclusion rules:
        - Never recommend exact same degree or same degree with slightly different title.
        - Never recommend equivalent qualification at same level as direct higher study.
        - Never recommend lower-level qualifications.
        """
        candidate_title = candidate_program.get("title", "")
        candidate_ref = candidate_program.get("reference", "")
        cand_norm = normalize_qualification(candidate_title)

        curr_rank = AcademicProgressionEngine.get_level_rank(current_user_degree.academic_level)
        cand_rank = AcademicProgressionEngine.get_level_rank(cand_norm.academic_level)

        reasons = []
        is_valid = True
        pathway_category = "DIRECT_PROGRESSION"

        # 1. HARD RULE: Same Qualification Check
        if (
            cand_norm.qualification_id == current_user_degree.qualification_id
            and cand_norm.academic_level == current_user_degree.academic_level
            and cand_norm.discipline_id == current_user_degree.discipline_id
        ):
            return {
                "valid": False,
                "rejection_reason": "SAME_DEGREE_EXCLUSION",
                "message": f"Cannot recommend {candidate_title} because the user already possesses or is pursuing this qualification.",
                "candidate_norm": cand_norm.to_dict(),
            }

        # 2. HARD RULE: Lower-Level Qualification Check
        if cand_rank < curr_rank:
            return {
                "valid": False,
                "rejection_reason": "LOWER_LEVEL_EXCLUSION",
                "message": f"Cannot recommend {candidate_title} (level: {cand_norm.academic_level}) as higher studies for a user at {current_user_degree.academic_level} level.",
                "candidate_norm": cand_norm.to_dict(),
            }

        # 3. Same-Level Specialization Check
        if cand_rank == curr_rank:
            # Same academic level: e.g. M.Tech CSE -> M.Tech AI or M.Tech CSE -> MBA
            if cand_norm.qualification_id == "mba" or "management" in cand_norm.specialization.lower():
                pathway_category = "CAREER_TRANSITION"
                reasons.append("Management & business leadership transition from technical domain.")
            else:
                pathway_category = "ALTERNATIVE_SPECIALIZATION"
                reasons.append(f"Lateral academic specialization pivot at {cand_norm.academic_level.upper()} level.")

        # 4. Check Discipline Compatibility
        discipline_compatible = (
            cand_norm.discipline_id == current_user_degree.discipline_id
            or cand_norm.discipline_id in ["general", "business_commerce"]
            or current_user_degree.discipline_id == "general"
        )
        if not discipline_compatible:
            # Check cross-discipline bridges
            if current_user_degree.discipline_id in ["mathematics_statistics", "electrical_electronics"] and cand_norm.discipline_id == "computer_science":
                discipline_compatible = True
                reasons.append("Compatible quantitative/engineering foundation for computing disciplines.")
            else:
                return {
                    "valid": False,
                    "rejection_reason": "DISCIPLINE_INCOMPATIBLE",
                    "message": f"Candidate discipline {cand_norm.discipline_id} is not naturally aligned with {current_user_degree.discipline_id}.",
                    "candidate_norm": cand_norm.to_dict(),
                }

        # 5. Ph.D / Doctoral Rules
        if current_user_degree.academic_level == "doctoral":
            if cand_norm.academic_level != "postdoctoral":
                return {
                    "valid": False,
                    "rejection_reason": "DOCTORAL_USER_CANNOT_TAKE_MASTERS",
                    "message": "Doctoral graduates cannot be recommended ordinary Master's degrees.",
                    "candidate_norm": cand_norm.to_dict(),
                }
            pathway_category = "POST_DOCTORAL"

        # 6. Status-Aware Narrative
        status_clean = user_status.lower().strip() if user_status else "completed"
        if status_clean in ["pursuing", "in_progress"]:
            timing_advice = f"Next-step option to pursue after completing your current {current_user_degree.display_name}."
        elif status_clean in ["dropped_out", "incomplete"]:
            timing_advice = "Degree re-entry or credit completion recommended before transitioning to this advanced pathway."
        else:
            timing_advice = f"Direct next academic step based on your completed {current_user_degree.display_name}."

        # 7. Generate Factual Explainability
        if cand_rank > curr_rank:
            if cand_norm.academic_level == "doctoral":
                pathway_category = "DIRECT_PROGRESSION"
                reasons.append(f"Valid next academic progression level ({cand_norm.academic_level.upper()}) following {current_user_degree.academic_level.upper()}.")
                reasons.append(f"Builds upon foundational and specialized research in {current_user_degree.specialization}.")
            else:
                pathway_category = "DIRECT_PROGRESSION"
                reasons.append(f"Valid next academic progression level ({cand_norm.academic_level.upper()}) following {current_user_degree.academic_level.upper()}.")
                reasons.append(f"Extends technical depth and domain mastery in {current_user_degree.specialization}.")

        return {
            "valid": True,
            "pathway_category": pathway_category,
            "timing_advice": timing_advice,
            "candidate_norm": cand_norm.to_dict(),
            "explainability": {
                "why_recommended": f"Valid {pathway_category.replace('_', ' ').title()} pathway matching your {current_user_degree.specialization} foundation.",
                "why_eligible": f"Your current qualification ({current_user_degree.display_name}) meets the academic prerequisite level for this program.",
                "next_steps": "Review entrance examinations, research proposal requirements, and institutional application deadlines.",
                "detailed_reasons": reasons,
            },
        }


# High quality doctoral and advanced programs catalog for PG/Doctoral stages
DOCTORAL_HIGHER_STUDIES_CATALOG: Dict[str, List[Dict[str, Any]]] = {
    "computer_science": [
        {
            "title": "Ph.D in Computer Science & Engineering",
            "reference": "phd-cse",
            "field": "Doctoral Research in Computer Science",
            "base_score": 96,
            "tags": ["phd", "research", "computer science", "algorithms", "systems"],
            "prerequisites": "M.Tech / M.E. / MS in CSE or equivalent with valid GATE / UGC-NET score",
            "entrance_exam": "GATE / UGC-NET (JRF) / Institutional Written Test & Interview",
            "reasons": "Terminal academic and research qualification for tenured faculty positions, industrial R&D leadership, and deep scientific computing.",
            "pathway_type": "DIRECT_PROGRESSION",
            "duration": "3–5 Years",
        },
        {
            "title": "Ph.D in Artificial Intelligence & Machine Learning",
            "reference": "phd-ai-ml",
            "field": "Doctoral Research in AI & Cognitive Systems",
            "base_score": 95,
            "tags": ["phd", "research", "ai", "machine learning", "deep learning"],
            "prerequisites": "M.Tech / MS / M.Sc in CS/IT/AI/Math with research aptitude",
            "entrance_exam": "GATE / UGC-NET (JRF) / Research Proposal Interview",
            "reasons": "Frontier research in foundational AI, multimodal architectures, autonomous systems, and advanced neural algorithms.",
            "pathway_type": "DIRECT_PROGRESSION",
            "duration": "3–5 Years",
        },
        {
            "title": "Ph.D in Data Science & Distributed Systems",
            "reference": "phd-data-science",
            "field": "Doctoral Research in Big Data & Cloud Systems",
            "base_score": 92,
            "tags": ["phd", "research", "data science", "distributed systems", "cloud"],
            "prerequisites": "M.Tech / M.Sc / MCA with analytical and systems background",
            "entrance_exam": "GATE / UGC-NET / Institutional Entrance",
            "reasons": "Explores ultra-scale distributed computing, federated data systems, and algorithmic statistical modeling.",
            "pathway_type": "DIRECT_PROGRESSION",
            "duration": "3–5 Years",
        },
        {
            "title": "Prime Minister's Research Fellowship (PMRF) / CSIR-UGC JRF",
            "reference": "pmrf-research-fellowship",
            "field": "National Elite Doctoral Research Fellowship",
            "base_score": 98,
            "tags": ["fellowship", "pmrf", "research", "national", "csir", "ugc"],
            "prerequisites": "Top-tier M.Tech / B.Tech graduate from recognized institutes with high CGPA / GATE score",
            "entrance_exam": "PMRF National Selection Process",
            "reasons": "Prestigious national doctoral fellowship offering substantial monthly stipend and generous annual research grants at IITs/IISc.",
            "pathway_type": "RESEARCH_FELLOWSHIP",
            "duration": "4–5 Years",
        },
        {
            "title": "Executive Ph.D in Technology & Enterprise Systems",
            "reference": "executive-phd-tech",
            "field": "Practitioner Doctoral Research",
            "base_score": 87,
            "tags": ["executive phd", "industry research", "enterprise", "technology management"],
            "prerequisites": "Master's degree with 3+ years of professional industry experience",
            "entrance_exam": "Portfolio Review & Research Proposal",
            "reasons": "Designed for working senior engineers and tech leaders to conduct applied industrial research without leaving current employment.",
            "pathway_type": "EXECUTIVE_DOCTORAL",
            "duration": "3–4 Years",
        },
        {
            "title": "MBA in Technology Management / Executive MBA",
            "reference": "mba-tech-management",
            "field": "Technology Leadership & Product Strategy",
            "base_score": 86,
            "tags": ["mba", "management", "product leadership", "strategy"],
            "prerequisites": "Postgraduate or Graduate with relevant experience + CAT/GMAT",
            "entrance_exam": "CAT / XAT / GMAT / Executive Assessment",
            "reasons": "Strategic career pivot transitioning senior technical specialists into VP of Engineering, CTO, and Product Leadership roles.",
            "pathway_type": "CAREER_TRANSITION",
            "duration": "1–2 Years",
        },
    ],
    "engineering": [
        {
            "title": "Ph.D in Engineering & Applied Sciences",
            "reference": "phd-engineering",
            "field": "Doctoral Research in Advanced Engineering",
            "base_score": 94,
            "tags": ["phd", "research", "engineering"],
            "prerequisites": "M.Tech / M.E. with valid GATE / UGC-NET score",
            "entrance_exam": "GATE / NET / Institute Written Test",
            "reasons": "Advanced engineering R&D, structural modeling, novel material synthesis, and high-impact industrial research.",
            "pathway_type": "DIRECT_PROGRESSION",
            "duration": "3–5 Years",
        },
        {
            "title": "Prime Minister's Research Fellowship (PMRF)",
            "reference": "pmrf-fellowship-eng",
            "field": "Elite Engineering Research Fellowship",
            "base_score": 97,
            "tags": ["pmrf", "fellowship", "research"],
            "prerequisites": "Top percentile M.Tech / B.Tech from CFTIs",
            "entrance_exam": "PMRF Selection",
            "reasons": "Premier doctoral fellowship for path-breaking technological innovation at leading national institutes.",
            "pathway_type": "RESEARCH_FELLOWSHIP",
            "duration": "4–5 Years",
        },
        {
            "title": "Executive MBA / Master of Management Studies",
            "reference": "executive-mba-eng",
            "field": "Engineering Management & Operations",
            "base_score": 85,
            "tags": ["mba", "management", "operations"],
            "prerequisites": "Engineering degree with industry experience",
            "entrance_exam": "CAT / GMAT / Executive Entrance",
            "reasons": "Prepares technical specialists for supply chain leadership, manufacturing management, and industrial business strategy.",
            "pathway_type": "CAREER_TRANSITION",
            "duration": "1–2 Years",
        },
    ],
    "postdoctoral": [
        {
            "title": "Post-Doctoral Research Fellowship (PDF)",
            "reference": "postdoc-fellowship",
            "field": "Post-Doctoral Scientific Research",
            "base_score": 98,
            "tags": ["postdoc", "fellowship", "research", "academia"],
            "prerequisites": "Awarded Ph.D degree with verified peer-reviewed publications",
            "entrance_exam": "Research Proposal Evaluation & Host Faculty Sponsorship",
            "reasons": "Advanced post-doctoral research fellowship establishing independent scientific trajectory, lab leadership, and tenure credentials.",
            "pathway_type": "POST_DOCTORAL",
            "duration": "1–3 Years",
        }
    ]
}
