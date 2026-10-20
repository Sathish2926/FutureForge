"""
Requirement Matching & Eligibility-First Engine.

Implements Sections 23-26 of FutureForge:
1. Eligibility First: Hard blockers checked before fit assessment.
   States: ELIGIBLE, PARTIALLY_ELIGIBLE, NOT_CURRENTLY_ELIGIBLE, REQUIREMENTS_UNKNOWN, AMBIGUOUS, INSUFFICIENT_EVIDENCE.
2. Requirement Matching: SUPPORTED, PARTIALLY_SUPPORTED, MISSING, UNKNOWN, HARD_BLOCKER.
3. Transferable Skill Engine: Evidence-backed capabilities mapped from current experience to target.
4. Skill Gap vs Application Readiness Separation.
"""
from typing import Any, Dict, List, Optional
from .evidence_engine import sanitize_text


class RequirementEngine:
    """
    Evaluates institutional and industry prerequisites against user evidence.
    """

    @staticmethod
    def evaluate_target_eligibility(
        user_profile: Dict[str, Any],
        target_entity: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Runs eligibility-first evaluation pipeline.
        Returns:
            eligibility_state: ELIGIBLE | PARTIALLY_ELIGIBLE | NOT_CURRENTLY_ELIGIBLE | REQUIREMENTS_UNKNOWN | INSUFFICIENT_EVIDENCE
            hard_blockers: List of hard statutory/academic blockers
            requirement_analysis: List of mapped requirements with statuses
            skill_gaps: List of technical/domain skills missing
            application_readiness: Status and recommendations for portfolios, resumes, credentials
        """
        if not target_entity or not target_entity.get("known_requirements_complete"):
            return {
                "eligibility_state": "REQUIREMENTS_UNKNOWN",
                "hard_blockers": [],
                "requirement_analysis": [],
                "skill_gaps": [],
                "application_readiness": {
                    "status": "UNKNOWN",
                    "notes": "Official institutional prerequisites are not yet compiled for this emerging direction.",
                },
                "summary": "Prerequisites cannot be verified from the current knowledge base. Further exploration recommended.",
            }

        hard_blockers = []
        requirement_analysis = []
        skill_gaps = []

        # Current user academic & stage context
        user_stage = str(user_profile.get("education_stage", "")).lower()
        user_degree = str(user_profile.get("degree_or_stream", "") or user_profile.get("stream", "") or user_profile.get("current_stream", "")).lower()
        
        # Clean skills: treat 'no skills', 'none', 'n/a' as empty (Section 27)
        raw_skills = user_profile.get("skills") or []
        user_skills = [
            s.lower().strip() for s in raw_skills 
            if isinstance(s, str) and s.lower().strip() not in ["no skills", "none", "n/a", "no skill", "not provided", "nil", ""]
        ]
        user_responsibilities = [r.lower() for r in (user_profile.get("responsibilities") or [])]
        current_job = str(user_profile.get("current_role") or user_profile.get("current_job_title") or "").lower()
        if "teach" in current_job and not any("teach" in r for r in user_responsibilities):
            user_responsibilities.append("teaching")

        target_slug = target_entity.get("slug", "")
        mandatory_reqs = target_entity.get("mandatory_requirements", [])

        # Hard constraint rules by target role (Section 19, 21)
        if target_slug in ["software-developer", "engineer"] or "engineering" in str(target_entity.get("cluster", "")).lower():
            # Check for 10+2 Mathematics prerequisite (Section 21: Class 12 PCB + JEE Conflict)
            if user_stage in ["class12"] and ("pcb" in user_degree or "biology" in user_degree):
                if not any(k in user_degree for k in ["math", "pcm", "pcmb"]):
                    hard_blockers.append(
                        "Prerequisite Mismatch: Engineering pathways require 10+2 with Mathematics. "
                        "Your current subject combination (PCB) does not satisfy the required Mathematics prerequisite for this pathway."
                    )

        if target_slug == "doctor":
            # Mandatory PCB in 10+2
            if user_degree and not any(k in user_degree for k in ["pcb", "science", "biology", "bio", "medical", "mbbs"]):
                hard_blockers.append("Statutory Requirement: 10+2 with Physics, Chemistry, and Biology (PCB) is mandatory for NEET-UG and medical qualification in India.")

        if target_slug in ["ias-civil-servant", "civil-services-ias"]:
            # Mandatory Graduation degree
            if user_stage in ["class10", "class12"]:
                hard_blockers.append("UPSC Civil Services requires completion of a recognized Bachelor's degree (minimum age 21).")

        if target_slug == "professor":
            # University faculty requirements (Section 36, 48, 78)
            if user_stage in ["class10", "class12"]:
                hard_blockers.append("University teaching/faculty positions require a completed Master's degree and UGC-NET qualification or PhD.")
            elif user_stage == "ug":
                hard_blockers.append("University teaching/faculty positions require completing a Master's degree first before qualifying UGC-NET / PhD.")

        # Evaluate mandatory requirements
        for req in mandatory_reqs:
            req_lower = req.lower()
            status = "UNKNOWN"

            # Check if user matches requirement
            if any(s in req_lower for s in user_skills) or any(r in req_lower for r in user_responsibilities):
                status = "SUPPORTED"
            elif any(k in req_lower for k in ["degree", "bachelor", "master", "neet", "ugc net"]):
                if hard_blockers:
                    status = "HARD_BLOCKER"
                else:
                    status = "PARTIALLY_SUPPORTED" if user_degree else "UNKNOWN"
            else:
                # Skill or tool requirement
                matching_skill = any(k in user_skills for k in req_lower.split() if len(k) > 2)
                if matching_skill:
                    status = "SUPPORTED"
                else:
                    status = "MISSING"
                    skill_gaps.append(req)

            requirement_analysis.append({
                "requirement": req,
                "status": status,
                "evidence": f"Evaluated against profile state ({user_stage}, {user_degree})"
            })

        # Determine overall eligibility state
        if hard_blockers:
            eligibility_state = "NOT_CURRENTLY_ELIGIBLE"
        elif any(r["status"] == "UNKNOWN" for r in requirement_analysis) and not any(r["status"] == "SUPPORTED" for r in requirement_analysis):
            eligibility_state = "INSUFFICIENT_EVIDENCE"
        elif skill_gaps or any(r["status"] == "PARTIALLY_SUPPORTED" for r in requirement_analysis):
            eligibility_state = "PARTIALLY_ELIGIBLE"
        else:
            eligibility_state = "ELIGIBLE"

        # Application Readiness vs Skill Gap (Section 26, 27)
        has_portfolio = bool(user_profile.get("projects") or user_profile.get("portfolio_url") or user_profile.get("github_url"))
        has_cert = bool(user_profile.get("certifications"))
        
        if not user_skills and target_slug in ["software-developer", "data-analyst"]:
            app_status = "NEEDS_EVIDENCE"
            app_notes = "No technical skills or projects submitted yet. Complete a practical challenge to demonstrate readiness."
        elif not skill_gaps:
            app_status = "READY" if (has_portfolio or has_cert) else "NEEDS_PORTFOLIO"
            app_notes = "Technical capabilities supported. Focus on practical projects, case studies, or verified credentials."
        else:
            app_status = "PREPARATION_REQUIRED"
            app_notes = f"Skill development required in: {', '.join(skill_gaps[:3])}."

        return {
            "eligibility_state": eligibility_state,
            "hard_blockers": hard_blockers,
            "requirement_analysis": requirement_analysis,
            "skill_gaps": skill_gaps,
            "application_readiness": {
                "status": app_status,
                "has_portfolio": has_portfolio,
                "notes": app_notes,
            },
            "summary": (
                f"Status: {eligibility_state}. "
                + (f"Blockers: {'; '.join(hard_blockers)} " if hard_blockers else "")
                + (f"Key gaps: {', '.join(skill_gaps[:3])}." if skill_gaps else "Prerequisites satisfied.")
            )
        }



class TransferableSkillEngine:
    """
    Transferable Skill Engine (Section 25).
    Extracts evidence-backed transferable skills without generating generic,
    unsupported buzzwords.
    """

    RESPONSIBILITY_TRANSFER_MAP = {
        "software development": [
            {"skill": "System Architecture", "reason": "Experience structuring codebases transfers directly to technical design.", "relevance": "direct"},
            {"skill": "Debugging & Troubleshooting", "reason": "Root cause analysis transfers to system reliability and analytics.", "relevance": "direct"},
            {"skill": "Algorithmic Problem Solving", "reason": "Computational thinking transfers across data science and engineering.", "relevance": "direct"},
        ],
        "data analysis": [
            {"skill": "Quantitative Data Interpretation", "reason": "Transforming data into insights transfers to business intelligence and strategy.", "relevance": "direct"},
            {"skill": "Metric Definition & Tracking", "reason": "Understanding business KPIs transfers to product and project management.", "relevance": "complementary"},
        ],
        "project management": [
            {"skill": "Cross-Functional Coordination", "reason": "Aligning multidisciplinary teams transfers to leadership and operations.", "relevance": "direct"},
            {"skill": "Risk & Timeline Management", "reason": "Contingency planning transfers to strategic planning and consulting.", "relevance": "direct"},
        ],
        "teaching": [
            {"skill": "Pedagogy & Knowledge Transfer", "reason": "Explaining complex concepts clearly transfers to technical writing and leadership.", "relevance": "direct"},
            {"skill": "Curriculum & Lesson Structuring", "reason": "Modular structuring transfers to onboarding, enablement, and operations.", "relevance": "complementary"},
        ],
        "sales": [
            {"skill": "Value Proposition Negotiation", "reason": "Understanding buyer objections transfers to consulting and product marketing.", "relevance": "direct"},
            {"skill": "Stakeholder Relationship Building", "reason": "Managing client expectations transfers to business development and management.", "relevance": "direct"},
        ],
    }

    @classmethod
    def extract_transferable_skills(
        cls,
        responsibilities: List[str],
        current_skills: List[str],
        target_role: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """
        Maps validated responsibilities and current skills to evidence-backed transferable capabilities.
        Avoids empty buzzwords unless substantiated by verified activity.
        """
        transferable = []
        seen = set()

        for resp in responsibilities:
            resp_clean = resp.lower().strip()
            for key, capabilities in cls.RESPONSIBILITY_TRANSFER_MAP.items():
                if key in resp_clean or resp_clean in key:
                    for cap in capabilities:
                        if cap["skill"] not in seen:
                            seen.add(cap["skill"])
                            transferable.append({
                                "skill": cap["skill"],
                                "sourceEvidence": f"Derived from practical responsibility: '{resp}'",
                                "confidence": "high",
                                "transferReason": cap["reason"],
                                "targetRelevance": cap["relevance"],
                            })

        # Add domain skills if proven
        for sk in current_skills:
            sk_clean = sk.title().strip()
            if sk_clean not in seen and sk_clean.lower() in ["sql", "python", "excel", "figma", "git", "statistics"]:
                seen.add(sk_clean)
                transferable.append({
                    "skill": sk_clean,
                    "sourceEvidence": f"Explicit verified tool proficiency: '{sk_clean}'",
                    "confidence": "high",
                    "transferReason": "Technical proficiency applicable across domains.",
                    "targetRelevance": "direct",
                })

        return transferable
