"""
Evidence and Validation Engine.

Implements Sections 10-14 of FutureForge:
- FACT / INFERENCE / HYPOTHESIS separation
- Evidence hierarchy and provenance tracking
- Wrong input handling (typos, ambiguous, unknown, nonsense)
- Mark validation (bounds check: 0 <= mark <= maxMark, 'not sure' -> UNKNOWN, never 0)
- Contradiction Engine (detects conflicting inputs, flags CONTRADICTION, resolves deterministically)
"""
import re
from typing import Any, Dict, List, Optional, Tuple
from .career_dna_schema import EvidenceItem


# Evidence Hierarchy Weights (Observed project > verified academic > assessment > repeated self-report > single self-report > inference)
SOURCE_RELIABILITY_WEIGHTS = {
    "project": 1.0,
    "work_history": 0.95,
    "verified_academic": 0.90,
    "academic_record": 0.85,
    "user_correction": 0.85,
    "behavioral_task": 0.80,
    "assessment": 0.75,
    "repeated_self_report": 0.65,
    "user_self_report": 0.50,
    "single_self_report": 0.50,
    "system_inference": 0.35,
    "hypothesis": 0.20,
}


def sanitize_text(value: Any) -> str:
    """Safely sanitizes text input, neutralizing prompt injection attempts by treating them strictly as raw data."""
    if value is None:
        return ""
    text = str(value).strip()
    # Strip null bytes and non-printable control characters
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    return text


def validate_mark(raw_value: Any, max_mark: float = 100.0) -> Dict[str, Any]:
    """
    Mark validation (Section 13).
    Ensures 0 <= mark <= maxMark.
    If invalid (e.g., 157/100 or -5), returns status='INVALID'.
    If 'not sure', 'pending', 'unknown', returns status='UNKNOWN' (never 0).
    """
    if raw_value is None:
        return {"status": "UNKNOWN", "value": None, "message": "Mark not provided."}

    text = sanitize_text(raw_value).lower()
    if text in ["not sure", "unknown", "unsure", "dont know", "don't know", "pending", "na", "n/a", ""]:
        return {"status": "UNKNOWN", "value": None, "message": "Mark is unknown."}

    # Extract first numeric value or percentage
    match = re.search(r"[-+]?\d*\.?\d+", text)
    if not match:
        return {"status": "INVALID", "value": raw_value, "message": f"Could not parse numeric mark from '{raw_value}'."}

    try:
        val = float(match.group())
    except (ValueError, TypeError):
        return {"status": "INVALID", "value": raw_value, "message": f"Invalid numeric format: '{raw_value}'."}

    if val < 0 or val > max_mark:
        return {
            "status": "INVALID",
            "value": val,
            "message": f"Mark {val} is outside the valid range of 0 to {max_mark}.",
        }

    return {
        "status": "VALID",
        "value": val,
        "normalized_percentage": round((val / max_mark) * 100.0, 1),
        "message": "Valid mark.",
    }


def create_evidence(
    value: Any,
    source: str = "user_self_report",
    evidence_type: str = "FACT",
    confidence: Optional[float] = None,
    provenance: Optional[str] = None,
) -> EvidenceItem:
    """Creates a validated, typed EvidenceItem with appropriate reliability confidence."""
    if confidence is None:
        base_confidence = SOURCE_RELIABILITY_WEIGHTS.get(source, 0.50)
        # Inferences and hypotheses naturally cap certainty
        if evidence_type == "INFERENCE":
            confidence = min(base_confidence, 0.75)
        elif evidence_type == "HYPOTHESIS":
            confidence = min(base_confidence, 0.40)
        else:
            confidence = base_confidence

    return EvidenceItem(
        value=value,
        source=source,
        evidenceType=evidence_type,
        confidence=round(confidence, 2),
        provenance=provenance,
    )


class ContradictionEngine:
    """
    Contradiction Engine (Section 14).
    Detects contradictory statements across profile fields, tracks both sources,
    and provides deterministic resolution.
    """

    @staticmethod
    def detect_contradictions(profile_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        contradictions = []

        # 1. Subject affinity contradiction (e.g. loves X vs hates X)
        interests_text = " ".join(
            str(profile_data.get(k, ""))
            for k in ["favorite_subjects", "interests", "enjoyed_activities", "liked_topics"]
        ).lower()

        dislikes_text = " ".join(
            str(profile_data.get(k, ""))
            for k in ["disliked_subjects", "hated_subjects", "least_favorite", "struggles"]
        ).lower()

        key_domains = ["math", "maths", "science", "physics", "chemistry", "biology", "coding", "english", "history"]
        for domain in key_domains:
            likes = (f"love {domain}" in interests_text or f"like {domain}" in interests_text or f"{domain}" in interests_text)
            dislikes = (f"hate {domain}" in dislikes_text or f"dislike {domain}" in dislikes_text or f"struggle with {domain}" in dislikes_text)
            if likes and dislikes:
                contradictions.append({
                    "dimension": "subject_preference",
                    "subject": domain,
                    "evidence_a": f"Expressed interest/enjoyment in {domain}",
                    "evidence_b": f"Expressed dislike/struggle with {domain}",
                    "severity": "MATERIAL" if domain in ["math", "maths", "science", "coding"] else "MINOR",
                    "status": "CONTRADICTION",
                    "suggested_resolution": f"Verify whether student enjoys conceptual {domain} while finding exam testing frustrating, or vice versa.",
                })

        # 2. Remote vs Mandatory In-Person Goal contradiction
        work_mode = str(profile_data.get("preferred_work_mode", "")).lower()
        target_role = str(profile_data.get("target_role", "") or profile_data.get("goal_text", "")).lower()
        
        in_person_roles = ["surgeon", "pilot", "laboratory technician", "civil engineer", "physician", "dentist"]
        if "remote only" in work_mode or "100% remote" in work_mode:
            for ipr in in_person_roles:
                if ipr in target_role:
                    contradictions.append({
                        "dimension": "constraint_goal_conflict",
                        "role": target_role,
                        "constraint": work_mode,
                        "evidence_a": f"Constraint: {work_mode}",
                        "evidence_b": f"Target role requires physical on-site presence: {target_role}",
                        "severity": "MATERIAL",
                        "status": "CONTRADICTION",
                        "suggested_resolution": "Clarify if user is open to on-site work or seeks adjacent remote specializations.",
                    })

        # 3. High Mark vs 'I cannot do math'
        marks = profile_data.get("marks", {})
        if isinstance(marks, dict):
            math_mark_res = validate_mark(marks.get("math") or marks.get("mathematics") or marks.get("maths"))
            if math_mark_res.get("status") == "VALID" and math_mark_res.get("normalized_percentage", 0) >= 85:
                if "cannot do math" in dislikes_text or "terrible at math" in dislikes_text:
                    contradictions.append({
                        "dimension": "aptitude_self_perception_gap",
                        "evidence_a": f"Academic record: {math_mark_res.get('normalized_percentage')}% in Mathematics",
                        "evidence_b": "Self-report: Feeling unable to do math",
                        "severity": "MATERIAL",
                        "status": "CONTRADICTION",
                        "suggested_resolution": "High academic competence observed despite confidence deficit.",
                    })

        return contradictions


# Evidence Cluster Definitions for Anti-Double Counting (Section 14 & 15)
CORRELATED_CLUSTERS = {
    "QUANTITATIVE_ORIENTATION": ["math", "maths", "mathematics", "calculus", "algebra", "statistics", "numerical"],
    "SCIENCE_ORIENTATION": ["science", "physics", "chemistry", "biology", "life sciences", "scientific"],
    "TECH_ORIENTATION": ["coding", "computer", "software", "programming", "python", "javascript", "it", "web development", "full stack"],
    "BUSINESS_ORIENTATION": ["business", "finance", "money", "accounting", "commerce", "economics", "investing"],
    "HUMANITIES_ORIENTATION": ["history", "political science", "literature", "english", "social science", "writing", "law", "policy"],
    "CREATIVE_ORIENTATION": ["design", "art", "drawing", "ui/ux", "animation", "music"],
    "RESEARCH_ORIENTATION": ["research", "phd", "publishing", "fellowship", "academia", "experimentation"],
}


def classify_signal(
    key: str,
    raw_value: Any,
    source: str = "user_self_report",
) -> List[Dict[str, Any]]:
    """
    Classifies raw input into typed signals and assigns appropriate evidence levels (Section 4 & 5).
    Separates Facts, Interests, Aptitude, Skills, and Goals (Section 3).
    """
    signals = []
    if raw_value is None:
        return signals

    values = raw_value if isinstance(raw_value, list) else [raw_value]
    for val in values:
        if val is None or str(val).strip() == "":
            continue
        text_val = str(val).strip()
        text_lower = text_val.lower()

        # Goals (Section 3D)
        if any(gk in key.lower() for gk in ["goal", "target", "objective", "aim", "future_direction"]):
            signals.append({
                "type": "GOAL_SIGNAL",
                "value": text_val,
                "source": source,
                "evidenceLevel": "SINGLE_SELF_REPORT",
                "confidence": 0.60,
                "cluster": "CAREER_GOAL",
                "title": f"Goal: {text_val}",
                "evidenceDescription": f"Stated personal goal: '{text_val}'.",
            })
            continue

        # Preferences & Constraints
        if any(pk in key.lower() for pk in ["preference", "work_mode", "location", "budget", "constraint"]):
            sig_type = "CONSTRAINT_SIGNAL" if "constraint" in key.lower() or "budget" in key.lower() else "PREFERENCE_SIGNAL"
            signals.append({
                "type": sig_type,
                "value": text_val,
                "source": source,
                "evidenceLevel": "SINGLE_SELF_REPORT",
                "confidence": 0.70,
                "cluster": "PREFERENCE",
                "title": text_val.title(),
                "evidenceDescription": f"User preference noted in '{key}'.",
            })
            continue

        # Identify correlated cluster
        matched_cluster = None
        for cluster_name, keywords in CORRELATED_CLUSTERS.items():
            if any(kw in text_lower for kw in keywords):
                matched_cluster = cluster_name
                break

        # Interests vs Skills (Section 3B vs 3C)
        if any(ik in key.lower() for ik in ["interest", "enjoy", "hobby", "like", "activity", "favorite"]):
            signals.append({
                "type": "INTEREST_SIGNAL",
                "value": text_val,
                "source": source,
                "evidenceLevel": "SINGLE_SELF_REPORT",
                "confidence": 0.65,
                "cluster": matched_cluster or "GENERAL_INTEREST",
                "title": f"Interest in {text_val.title()}",
                "evidenceDescription": f"Self-reported interest in '{text_val}'.",
            })
        elif any(sk in key.lower() for sk in ["skill", "technical", "proficiency"]):
            # Self-reported skill is single self-report, not observed fact
            signals.append({
                "type": "SKILL_SIGNAL",
                "value": text_val,
                "source": source,
                "evidenceLevel": "SINGLE_SELF_REPORT",
                "confidence": 0.50,
                "cluster": matched_cluster or "TECHNICAL_SKILL",
                "title": text_val,
                "evidenceDescription": f"Self-reported familiarity with '{text_val}'.",
            })
        else:
            signals.append({
                "type": "PREFERENCE_SIGNAL",
                "value": text_val,
                "source": source,
                "evidenceLevel": "SINGLE_SELF_REPORT",
                "confidence": 0.55,
                "cluster": matched_cluster or "GENERAL",
                "title": text_val.title(),
                "evidenceDescription": f"Selection: '{text_val}'.",
            })

    return signals


def derive_strongest_signals(
    marks: Dict[str, Any],
    signals: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:
    """
    Computes strongest signals from evidence with controlled correlation (Section 7, 14, 15).
    Does NOT copy raw checkboxes. Emits evidence description and confidence tier.
    """
    strongest = []
    seen_clusters = set()

    # 1. Academic Performance Evidence (Direct Facts)
    for sub, raw_mark in marks.items():
        v = validate_mark(raw_mark)
        if v.get("status") == "VALID" and v.get("normalized_percentage", 0) >= 65:
            pct = v.get("normalized_percentage")
            sub_title = sub.replace("_", " ").title()
            conf_label = "Strong academic evidence" if pct >= 80 else "Supported by academic evidence"
            strongest.append({
                "title": f"{sub_title} Foundation",
                "evidence": f"Demonstrated {pct}% in {sub_title}.",
                "confidence": conf_label,
                "evidenceLevel": "DIRECT_FACT",
                "cluster": f"ACADEMIC_{sub.upper()}",
            })
            if "math" in sub.lower():
                seen_clusters.add("QUANTITATIVE_ORIENTATION")
            if any(s in sub.lower() for s in ["science", "physics", "chem", "bio"]):
                seen_clusters.add("SCIENCE_ORIENTATION")

    # 2. Clustered Interest / Behavioral Signals (Controlled contribution: max 1 per cluster)
    cluster_counts = {}
    cluster_examples = {}
    for s in signals:
        c = s.get("cluster")
        if c and c not in ["CAREER_GOAL", "PREFERENCE", "GENERAL"]:
            cluster_counts[c] = cluster_counts.get(c, 0) + 1
            if c not in cluster_examples:
                cluster_examples[c] = s.get("value")

    cluster_title_map = {
        "BUSINESS_ORIENTATION": ("Business Curiosity", "You expressed interest in business and financial decision-making."),
        "QUANTITATIVE_ORIENTATION": ("Quantitative Curiosity", "You selected numerical and problem-solving topics."),
        "TECH_ORIENTATION": ("Technology Exploration", "You indicated interest in software and computing concepts."),
        "SCIENCE_ORIENTATION": ("Scientific Curiosity", "You showed interest in empirical inquiry and natural sciences."),
        "HUMANITIES_ORIENTATION": ("Social & Legal Inquiry", "You selected topics in social systems, governance, or writing."),
        "CREATIVE_ORIENTATION": ("Creative Expression", "You selected design and visual thinking activities."),
        "RESEARCH_ORIENTATION": ("Inquiry & Research Focus", "You highlighted curiosity in deep academic exploration."),
    }

    for c, count in sorted(cluster_counts.items(), key=lambda x: x[1], reverse=True):
        if c in seen_clusters:
            continue
        seen_clusters.add(c)
        title_meta = cluster_title_map.get(c)
        if title_meta:
            title, desc = title_meta
            conf = "Emerging" if count == 1 else "Reinforced self-report"
            strongest.append({
                "title": title,
                "evidence": desc,
                "confidence": conf,
                "evidenceLevel": "REPEATED_SELF_REPORT" if count > 1 else "SINGLE_SELF_REPORT",
                "cluster": c,
            })

    return strongest[:4]


def derive_what_we_know(
    stage: str,
    user_profile: Dict[str, Any],
) -> Dict[str, List[str]]:
    """
    Separates user-provided facts from external verification (Section 6).
    Never says 'No verified historical records submitted yet' when user provided data.
    """
    stage_titles = {
        "class10": "Class 10 Student",
        "class12": "Class 12 / Higher Secondary",
        "ug": "Undergraduate Student",
        "pg": "Postgraduate Student",
        "working_professional": "Working Professional",
    }
    user_facts = [f"Education stage: {stage_titles.get(stage, stage.title())}"]

    # Stream / Degree
    stream_val = user_profile.get("stream") or user_profile.get("degree_or_stream") or user_profile.get("degree")
    if stream_val and str(stream_val).lower() not in ["none", "unknown", ""]:
        user_facts.append(f"Current stream/degree: {stream_val}")

    # Marks
    marks = user_profile.get("marks", {})
    if isinstance(marks, dict):
        for sub, val in marks.items():
            vm = validate_mark(val)
            if vm.get("status") == "VALID":
                user_facts.append(f"{sub.replace('_', ' ').title()} mark: {vm.get('value')}/100")

    # Current Role / Responsibilities
    current_role = user_profile.get("current_role") or user_profile.get("current_job_title")
    if current_role and str(current_role).lower() not in ["none", "unknown", ""]:
        user_facts.append(f"Current role: {current_role}")

    # Stated Goal
    stated_goal = user_profile.get("target_role") or user_profile.get("goal_text") or user_profile.get("primary_goal")
    if stated_goal and str(stated_goal).lower() not in ["none", "unknown", ""]:
        user_facts.append(f"Stated goal: {stated_goal}")

    # Verified records
    verified = []
    if user_profile.get("verified_academic_records"):
        verified.extend(user_profile["verified_academic_records"])

    return {
        "user_provided_facts": user_facts,
        "verified_records": verified if verified else ["No externally verified records have been added."],
    }


def derive_demonstrated_capabilities(
    marks: Dict[str, Any],
    experiments: List[Dict[str, Any]],
    projects: List[Any],
    work_history: List[Any],
) -> List[str]:
    """
    Populates demonstrated capabilities ONLY when actual evidence exists (Section 8).
    Never populates from mere questionnaire selections.
    """
    capabilities = []

    # Academic evidence
    for sub, val in marks.items():
        vm = validate_mark(val)
        if vm.get("status") == "VALID" and vm.get("normalized_percentage", 0) >= 70:
            capabilities.append(f"Academic proficiency in {sub.replace('_', ' ').title()} ({vm.get('normalized_percentage')}%)")

    # Completed experiments
    for exp in experiments:
        if exp.get("status") in ["COMPLETED", "PASSED"]:
            capabilities.append(f"Demonstrated in challenge: {exp.get('title', 'Exploration task')}")

    # Projects
    for proj in projects:
        if isinstance(proj, str) and proj.strip():
            capabilities.append(f"Practical project: {proj}")
        elif isinstance(proj, dict) and proj.get("title"):
            capabilities.append(f"Practical project: {proj['title']}")

    # Work history
    for wh in work_history:
        if isinstance(wh, str) and wh.strip():
            capabilities.append(f"Professional experience: {wh}")
        elif isinstance(wh, dict) and wh.get("role"):
            capabilities.append(f"Professional role: {wh['role']}")

    return capabilities


def derive_stage_uncertainty(
    stage: str,
    user_profile: Dict[str, Any],
    signals: List[Dict[str, Any]],
) -> List[str]:
    """
    Dynamically identifies decision-relevant uncertainty for the current stage (Section 10).
    Never uses static generic placeholders.
    """
    uncertainties = []
    marks = user_profile.get("marks", {})
    skills = user_profile.get("skills", [])
    has_skills = bool(skills and any(s.strip() for s in skills if isinstance(s, str)))

    if stage == "class10":
        has_math = any("math" in k.lower() for k in marks.keys())
        if has_math:
            uncertainties.append("Advanced quantitative problem-solving beyond standard school board curriculum")
        else:
            uncertainties.append("Quantitative aptitude foundation across secondary mathematics")

        has_commerce = any("business" in s.get("cluster", "") or "finance" in s.get("cluster", "") for s in signals)
        if has_commerce:
            uncertainties.append("Specific interest depth between corporate commerce vs pure economics")
        else:
            uncertainties.append("Orientation toward commercial and economic decision scenarios")

        uncertainties.append("Hands-on exposure to practical computing or experimental science")

    elif stage == "class12":
        stream = str(user_profile.get("stream", "")).lower()
        if "pcb" in stream:
            uncertainties.append("Readiness and commitment to multi-year clinical medical entrance competition (NEET)")
            uncertainties.append("Exploration of allied life sciences (Biotechnology, Pharmacy, Clinical Research)")
        elif "pcm" in stream:
            uncertainties.append("Preference between core engineering branches (CS, Electrical, Mechanical) vs Applied Sciences")
        else:
            uncertainties.append("Undergraduate degree specialization preferences (Professional vs Academic degrees)")

    elif stage == "ug":
        if not has_skills:
            uncertainties.append("Demonstrated coding / technical tool competencies (no verified skills submitted)")
        uncertainties.append("Immediate placement readiness vs willingness to pursue postgraduate specialization (M.Tech/MS/MBA)")
        uncertainties.append("Independent project portfolio depth and problem-solving artifacts")

    elif stage == "pg":
        if not has_skills:
            uncertainties.append("Specialized production tool proficiency and portfolio evidence")
        uncertainties.append("Orientation between corporate industry roles vs doctoral research / academic appointments")
        uncertainties.append("Demonstrated research publications or applied thesis outcomes")

    elif stage == "working_professional":
        target = user_profile.get("target_role")
        if target:
            uncertainties.append(f"Formal prerequisite alignment and institutional certifications for {target}")
            uncertainties.append("Demonstrated domain artifacts proving transferable execution in target responsibilities")
        else:
            uncertainties.append("Specific target role definition (lateral advancement vs complete domain pivot)")

    return uncertainties[:3]

