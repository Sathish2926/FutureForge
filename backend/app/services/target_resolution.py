"""
Target Role Resolution Engine.

Implements Sections 19, 20, and 45 of FutureForge:
Layered pipeline:
RAW INPUT -> NORMALIZATION -> TYPO CORRECTION -> ALIAS MATCHING -> SEMANTIC MATCHING -> CAREER CLUSTER -> CANDIDATE ENTITIES -> CONFIDENCE -> RESOLUTION

Supports:
- Common aliases and abbreviations (prof, dev, CA, IAS, doc, etc.)
- Typo resilience and colloquial phrasing ('coding job', 'college teacher', 'civil servant')
- Unknown / non-curated roles -> outputs RECOGNIZED_REQUIREMENTS_INCOMPLETE without fake scores
"""
import re
from difflib import SequenceMatcher
from typing import Any, Dict, List, Optional, Tuple


# Canonical Career Clusters and Entities (Section 19, 20, 45)
CANONICAL_TARGET_TAXONOMY = {
    "professor": {
        "canonical_name": "University Professor / Academic Faculty",
        "slug": "professor",
        "cluster": "Education & Academia",
        "pathway_type": "ACADEMIC_PATH",
        "aliases": [
            "professor", "prof", "college teacher", "university lecturer", "faculty",
            "academic", "assistant professor", "associate professor", "lecturer",
            "university faculty", "college professor", "higher education faculty", "higher education"
        ],
        "mandatory_requirements": ["Master's Degree in relevant discipline", "UGC NET / CSIR NET qualification or PhD"],
        "typical_degrees": ["Postgraduate (M.A. / M.Sc / M.Tech)", "PhD"],
        "skills": ["Subject matter expertise", "Pedagogy", "Academic research", "Curriculum design", "Mentorship"],
        "known_requirements_complete": True,
    },
    "software-developer": {
        "canonical_name": "Software Developer / Engineer",
        "slug": "software-developer",
        "cluster": "Technology & Software",
        "pathway_type": "CAREER_PATH",
        "aliases": [
            "software developer", "software engineer", "software dev", "developer", "coding job",
            "programmer", "backend developer", "frontend developer", "full stack developer", "coder"
        ],
        "mandatory_requirements": ["Proficiency in at least one core programming language", "Data structures & algorithms"],
        "typical_degrees": ["B.Tech / B.E. in CS/IT", "BCA / MCA", "B.Sc Computer Science"],
        "skills": ["Data Structures", "System Design", "Version Control (Git)", "API Development", "Problem Solving"],
        "known_requirements_complete": True,
    },
    "data-analyst": {
        "canonical_name": "Data Analyst",
        "slug": "data-analyst",
        "cluster": "Data & Analytics",
        "pathway_type": "CAREER_PATH",
        "aliases": [
            "data analyst", "data analytics", "data", "analytics", "business data analyst",
            "bi analyst", "analytics associate"
        ],
        "mandatory_requirements": ["SQL querying proficiency", "Spreadsheet modeling / Excel", "Data visualization tool (PowerBI/Tableau)"],
        "typical_degrees": ["B.Sc Statistics / Math", "B.Tech", "B.Com / BBA with Analytics", "BCA"],
        "skills": ["SQL", "Data Modeling", "Business Intelligence", "Python/R basics", "Statistical Interpretation"],
        "known_requirements_complete": True,
    },
    "doctor": {
        "canonical_name": "Medical Doctor (Physician)",
        "slug": "doctor",
        "cluster": "Healthcare & Medicine",
        "pathway_type": "CAREER_PATH",
        "aliases": [
            "doctor", "medical doctor", "physician", "doc", "clinical doctor", "mbbs", "general physician"
        ],
        "mandatory_requirements": ["10+2 with Physics, Chemistry, Biology (PCB)", "NEET-UG qualification", "MBBS degree from accredited medical college", "State Medical Council Registration"],
        "typical_degrees": ["MBBS", "MD / MS Specialization"],
        "skills": ["Clinical diagnosis", "Patient care", "Pharmacology", "Medical documentation", "Emergency response"],
        "known_requirements_complete": True,
    },
    "ias-civil-servant": {
        "canonical_name": "Civil Servant / IAS Officer",
        "slug": "civil-services-ias",
        "cluster": "Government & Civil Services",
        "pathway_type": "GOVERNMENT_PATH",
        "aliases": [
            "ias", "ias officer", "district collector", "civil servant", "civil services",
            "upsc", "collector", "indian administrative service"
        ],
        "mandatory_requirements": ["Graduation degree in any discipline", "Minimum age 21", "UPSC Civil Services Examination (Prelims, Mains, Interview)"],
        "typical_degrees": ["Any recognized Bachelor's Degree (B.A., B.Sc, B.Tech, B.Com)"],
        "skills": ["General Studies", "Administrative judgment", "Public Policy", "Ethics & Governance", "Analytical writing"],
        "known_requirements_complete": True,
    },
    "chartered-accountant": {
        "canonical_name": "Chartered Accountant (CA)",
        "slug": "chartered-accountant",
        "cluster": "Finance & Accounting",
        "pathway_type": "CERTIFICATION_PATH",
        "aliases": [
            "chartered accountant", "ca", "accountant", "icai", "audit consultant", "chartered accountancy"
        ],
        "mandatory_requirements": ["ICAI CA Foundation/Direct Entry", "CA Intermediate", "3-year Articleship / Practical Training", "CA Final examination"],
        "typical_degrees": ["B.Com", "ICAI Certification"],
        "skills": ["Financial Auditing", "Taxation (Direct/Indirect)", "Corporate Law", "Financial Reporting (IndAS)", "Cost Accounting"],
        "known_requirements_complete": True,
    },
    "marine-biologist": {
        "canonical_name": "Marine Biologist",
        "slug": "marine-biologist",
        "cluster": "Science & Research",
        "pathway_type": "RESEARCH_PATH",
        "aliases": [
            "marine biologist", "marine biology", "ocean biologist", "oceanographer", "marine scientist"
        ],
        "mandatory_requirements": ["B.Sc in Biology / Life Sciences / Zoology", "M.Sc in Marine Biology or Oceanography"],
        "typical_degrees": ["B.Sc Zoology/Life Science", "M.Sc Marine Biology", "PhD Marine Ecology"],
        "skills": ["Aquatic ecology", "Field sampling", "Statistical biology", "Scientific publishing", "SCUBA/Oceanographic instrumentation"],
        "known_requirements_complete": True,
    },
    "graphic-designer": {
        "canonical_name": "Graphic & UI Designer",
        "slug": "graphic-designer",
        "cluster": "Design & Creative",
        "pathway_type": "CAREER_PATH",
        "aliases": [
            "graphic designer", "graphic design", "ui designer", "visual designer", "ui/ux designer",
            "designer", "illustrator"
        ],
        "mandatory_requirements": ["Demonstrated design portfolio", "Proficiency in industry design tools (Figma, Adobe Suite)"],
        "typical_degrees": ["B.Des", "B.F.A.", "Self-taught with portfolio"],
        "skills": ["Typography", "Color Theory", "Figma / Adobe Suite", "Design Systems", "Visual Hierarchy"],
        "known_requirements_complete": True,
    },
    "entrepreneur": {
        "canonical_name": "Entrepreneur / Startup Founder",
        "slug": "entrepreneur",
        "cluster": "Entrepreneurship & Business",
        "pathway_type": "ENTREPRENEURSHIP_PATH",
        "aliases": [
            "entrepreneur", "startup founder", "business owner", "founder", "startup", "businessman", "businesswoman"
        ],
        "mandatory_requirements": ["Viable product/service proposition", "Market validation", "Capital/resource mobilization"],
        "typical_degrees": ["Any degree or self-directed"],
        "skills": ["Business Modeling", "Product Validation", "Sales & Pitching", "Financial Planning", "Leadership"],
        "known_requirements_complete": True,
    },
    "ai-researcher": {
        "canonical_name": "AI / Machine Learning Researcher",
        "slug": "ai-researcher",
        "cluster": "Science & Research / Tech",
        "pathway_type": "RESEARCH_PATH",
        "aliases": [
            "ai researcher", "machine learning scientist", "ml researcher", "ai scientist",
            "deep learning researcher", "machine learning engineer"
        ],
        "mandatory_requirements": ["Strong foundation in linear algebra, multivariable calculus, and probability", "Python & PyTorch/TensorFlow proficiency"],
        "typical_degrees": ["B.Tech CS / Math", "M.Tech / M.S. in AI/CS", "PhD in Computer Science"],
        "skills": ["Machine Learning", "PyTorch", "Mathematical Optimization", "Research Paper Writing", "Experimental Rigor"],
        "known_requirements_complete": True,
    },
    "business-general": {
        "canonical_name": "Business Management & Operations",
        "slug": "business-management",
        "cluster": "Business & Management",
        "pathway_type": "CAREER_PATH",
        "aliases": [
            "business", "business career", "business field", "management", "business executive", "corporate management"
        ],
        "mandatory_requirements": ["Undergraduate degree (BBA, B.Com, or equivalent)", "Foundational understanding of business operations"],
        "typical_degrees": ["BBA", "B.Com", "MBA"],
        "skills": ["Business Operations", "Strategic Planning", "Stakeholder Communication", "Budgeting", "Team Coordination"],
        "known_requirements_complete": True,
    },
}

# Broad Sector Clusters for Fallback Resolution
SECTOR_CLUSTERS = {
    "Technology & Engineering": ["tech", "software", "hardware", "engineering", "coding", "web", "cloud", "security", "robotics", "dev"],
    "Healthcare & Medicine": ["medical", "health", "hospital", "clinic", "therapy", "nursing", "pharma", "dentist", "doctor", "surgery"],
    "Business & Finance": ["finance", "banking", "accounting", "investment", "marketing", "sales", "consulting", "commerce", "stock"],
    "Government & Public Service": ["civil services", "government", "policy", "collector", "diplomat", "police", "defence", "military", "army", "navy"],
    "Science & Research": ["research", "science", "biotechnology", "chemistry", "physics", "astronomy", "laboratory", "genetics", "ecology"],
    "Education & Academia": ["teaching", "education", "school", "college", "professor", "trainer", "curriculum", "lecturer"],
    "Law & Legal Services": ["law", "legal", "advocate", "judge", "judiciary", "corporate law", "attorney", "solicitor"],
    "Design & Creative Arts": ["design", "art", "animation", "film", "music", "writing", "journalism", "photography", "fashion"],
    "Skilled Trades & Aviation": ["pilot", "aviation", "aeronautics", "culinary", "chef", "automotive", "technician", "electrician"],
}


def normalize_query(query: str) -> str:
    """Normalizes query text, removing punctuation and redundant whitespace."""
    if not query:
        return ""
    text = query.lower().strip()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    tokens = text.split()
    # Normalize common suffix variations
    cleaned_tokens = []
    for t in tokens:
        if t in ["jobs", "job", "career", "careers", "field", "fields", "line"]:
            continue
        cleaned_tokens.append(t)
    return " ".join(cleaned_tokens).strip()


def resolve_target_role(raw_input: Optional[str]) -> Dict[str, Any]:
    """
    Executes the layered resolution pipeline:
    1. Typo / Normalization
    2. Exact & Alias Match
    3. Fuzzy Ratio Match
    4. Cluster Match (Recognized direction, structured requirements incomplete)
    5. Unknown Handling (Never fake fit score, marks UNKNOWN)
    """
    if not raw_input or not raw_input.strip():
        return {
            "raw_input": raw_input,
            "normalized_input": "",
            "state": "UNKNOWN",
            "canonical_name": None,
            "cluster": None,
            "pathway_type": None,
            "confidence": 0.0,
            "entity": None,
            "message": "No target career specified.",
        }

    normalized = normalize_query(raw_input)
    if not normalized:
        return {
            "raw_input": raw_input,
            "normalized_input": "",
            "state": "UNKNOWN",
            "canonical_name": None,
            "cluster": None,
            "pathway_type": None,
            "confidence": 0.0,
            "entity": None,
            "message": "Target role could not be parsed.",
        }

    # Step 2: Exact & Alias Matching
    best_match_key = None
    best_score = 0.0

    for key, entity in CANONICAL_TARGET_TAXONOMY.items():
        aliases = [normalize_query(a) for a in entity["aliases"]]
        if normalized in aliases or entity["slug"] == normalized:
            return {
                "raw_input": raw_input,
                "normalized_input": normalized,
                "state": "EXACT_MATCH" if normalized == entity["slug"] else "ALIAS_MATCH",
                "canonical_name": entity["canonical_name"],
                "cluster": entity["cluster"],
                "pathway_type": entity["pathway_type"],
                "confidence": 1.0 if normalized == entity["slug"] else 0.95,
                "entity": entity,
                "message": f"Resolved '{raw_input}' to {entity['canonical_name']}.",
            }

        # Check token containment
        for alias in aliases:
            if alias and len(alias) >= 4 and alias in normalized:
                score = len(alias) / len(normalized)
                if score > best_score:
                    best_score = score
                    best_match_key = key

            ratio = SequenceMatcher(None, normalized, alias).ratio()
            if ratio > best_score:
                best_score = ratio
                best_match_key = key

    # Step 3: Fuzzy Confidence Check
    if best_match_key and best_score >= 0.72:
        matched_entity = CANONICAL_TARGET_TAXONOMY[best_match_key]
        return {
            "raw_input": raw_input,
            "normalized_input": normalized,
            "state": "SEMANTIC_MATCH",
            "canonical_name": matched_entity["canonical_name"],
            "cluster": matched_entity["cluster"],
            "pathway_type": matched_entity["pathway_type"],
            "confidence": round(best_score, 2),
            "entity": matched_entity,
            "message": f"Matched '{raw_input}' to {matched_entity['canonical_name']} via semantic similarity.",
        }

    # Step 4: Cluster Match (Section 20: Role database does not control user exploration)
    matched_cluster = None
    for cluster_name, keywords in SECTOR_CLUSTERS.items():
        if any(kw in normalized for kw in keywords):
            matched_cluster = cluster_name
            break

    if matched_cluster:
        return {
            "raw_input": raw_input,
            "normalized_input": normalized,
            "state": "RECOGNIZED_BUT_REQUIREMENTS_INCOMPLETE",
            "canonical_name": raw_input.strip().title(),
            "cluster": matched_cluster,
            "pathway_type": "CAREER_PATH",
            "confidence": 0.50,
            "entity": {
                "canonical_name": raw_input.strip().title(),
                "slug": re.sub(r"\s+", "-", normalized),
                "cluster": matched_cluster,
                "pathway_type": "CAREER_PATH",
                "aliases": [raw_input.strip()],
                "mandatory_requirements": [],
                "skills": [],
                "known_requirements_complete": False,
            },
            "message": f"Recognized direction in {matched_cluster}, but structured requirements are incomplete.",
        }

    # Step 5: Truly unknown direction (Section 38: UNKNOWN_TARGET with honest message)
    return {
        "raw_input": raw_input,
        "normalized_input": normalized,
        "state": "UNKNOWN_TARGET",
        "canonical_name": raw_input.strip().title(),
        "cluster": None,
        "pathway_type": "UNKNOWN",
        "confidence": 0.0,
        "entity": None,
        "message": "We couldn't confidently identify this as a recognized career direction.",
    }

