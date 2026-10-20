"""
Unified Multidimensional Recommendation Engine.

Implements Sections 3-8, 11-18, 21-31, 33-35, 40-47, 51-60 of FutureForge:
- 5 Stage Policies (Class 10, Class 12, UG, PG, Working Professional)
- Unbundled M.Tech / MS / MBA (Section 25)
- Class 10: Stream exploration directions & option value, NOT final careers (Section 17 & 18)
- Class 12: Real prerequisite checks (PCB + JEE conflict detection) (Section 21 & 45)
- UG/PG: Goal-first recommendation, 'NO SKILLS' handling with missing skill evidence (Section 24, 26, 27)
- Dynamic Mini-Experiments selection based on uncertainty and candidate paths (Section 33 & 34)
- Anti-double counting and correlated evidence control (Section 14 & 15)
- Goal != Fit (Section 16)
- Removal of arbitrary user-facing percentage scores (Section 11)
- Evidence-based alignment labels: STRONG ALIGNMENT, PROMISING DIRECTION, WORTH EXPLORING, etc. (Section 11, 41)
- Strict rationale traces with evidence references, rejecting generic clichés (Section 29, 30, 57, 58)
"""
import re
from typing import Any, Dict, List, Optional, Tuple
from .target_resolution import CANONICAL_TARGET_TAXONOMY, resolve_target_role
from .requirement_engine import RequirementEngine, TransferableSkillEngine
from .evidence_engine import validate_mark, CORRELATED_CLUSTERS


# Stage-Specific Pathway Catalogues (Unbundled & Stage-Appropriate)
STAGE_PATHWAYS = {
    "class10": [
        {
            "id": "c10-comm-math",
            "title": "Commerce with Mathematics",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Business & Finance",
            "primary_evidence_cluster": "BUSINESS_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Combines commercial literacy with quantitative analytical tools for finance, economics, analytics, and accounting.",
            "what_this_keeps_open": [
                "Chartered Accountancy (CA / ACCA)",
                "Investment Banking & Financial Analysis",
                "Corporate Law (via 5-Year Integrated LLB)",
                "Business Economics & Data Analytics (B.Sc / BMS)",
                "Business Management (BBA / Integrated MBA)",
            ],
            "what_this_supports": "Builds commercial decision-making, financial modeling, and applied quantitative reasoning.",
            "trade_offs": "Closes technical engineering degrees (B.Tech/BE), but keeps almost all analytical, financial, and managerial directions accessible.",
            "what_is_still_uncertain": "Specific depth of accounting interest vs economics/analytics interest.",
            "what_to_try_next": "Complete a 10-minute business decision / operating leverage challenge.",
            "prerequisites": "Secondary school mathematics foundation.",
        },
        {
            "id": "c10-pcm",
            "title": "Science with Mathematics (PCM)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "STEM & Technology",
            "primary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "secondary_evidence_cluster": "SCIENCE_ORIENTATION",
            "why_fit_base": "Provides rigorous quantitative problem-solving foundation for computing, engineering, physical sciences, and technical innovation.",
            "what_this_keeps_open": [
                "Engineering & Technology (B.Tech / BE in CS, AI, Electronics, Mechanical)",
                "Computing & Software Applications (BCA / B.Sc Computer Science)",
                "Architecture & Urban Planning (B.Arch)",
                "Pure & Applied Physical Sciences (B.Sc Physics, Chemistry, Mathematics)",
                "Commercial & Management routes (via quantitative entrance examinations)",
            ],
            "what_this_supports": "Builds rigorous analytical logic, empirical modeling, and computational thinking.",
            "trade_offs": "Requires sustained daily problem solving in physics and calculus; high curriculum intensity across two years.",
            "what_is_still_uncertain": "Quantitative aptitude beyond standard secondary school curriculum and coding exposure.",
            "what_to_try_next": "Complete a 10-minute algorithmic logic task.",
            "prerequisites": "Strong grasp of Class 10 Mathematics and Science.",
        },
        {
            "id": "c10-pcb",
            "title": "Science with Biology (PCB)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Healthcare & Life Sciences",
            "primary_evidence_cluster": "SCIENCE_ORIENTATION",
            "secondary_evidence_cluster": "RESEARCH_ORIENTATION",
            "why_fit_base": "Focuses on living organisms, clinical care, physiological systems, and biochemical processes.",
            "what_this_keeps_open": [
                "Clinical Medicine & Dentistry (MBBS / BDS / AYUSH)",
                "Pharmacy & Pharmaceutical Sciences (B.Pharm)",
                "Biotechnology & Bioinformatics (B.Sc)",
                "Allied Healthcare Sciences (Nursing, Physiotherapy, Radiology)",
            ],
            "what_this_supports": "Builds empirical inquiry, physiological understanding, and patient-centered clinical awareness.",
            "trade_offs": "Without Mathematics, traditional engineering (B.Tech) routes are generally closed; requires multi-year preparation for medical admissions.",
            "what_is_still_uncertain": "Readiness for intensive competitive entrance exams (NEET) vs interest in allied research pathways.",
            "what_to_try_next": "Explore a biological systems / clinical diagnosis mini-task.",
            "prerequisites": "Strong grasp of Class 10 Science (Life Processes and Chemistry).",
        },
        {
            "id": "c10-arts",
            "title": "Humanities & Social Sciences",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Governance, Law & Media",
            "primary_evidence_cluster": "HUMANITIES_ORIENTATION",
            "secondary_evidence_cluster": "CREATIVE_ORIENTATION",
            "why_fit_base": "Develops critical inquiry, qualitative research, institutional analysis, and persuasive communication.",
            "what_this_keeps_open": [
                "Law & Legal Practice (5-Year Integrated BA LLB / BBA LLB)",
                "Public Policy & Civil Services (UPSC / State Services)",
                "Journalism, Media & Digital Communications",
                "Psychology, Behavioral Sciences & Sociology",
                "Design, Creative Strategy & Advertising",
            ],
            "what_this_supports": "Fosters deep reading comprehension, sociopolitical analysis, and structured argumentative writing.",
            "trade_offs": "Closes technical STEM laboratory and engineering degrees; opens diverse legal, public policy, and creative paths.",
            "what_is_still_uncertain": "Reading stamina for extensive primary texts and interest in qualitative vs quantitative analysis.",
            "what_to_try_next": "Try a policy analysis or legal argumentation case challenge.",
            "prerequisites": "Interest in extensive reading, socioeconomic structures, and analytical writing.",
        },
    ],
    "class12": [
        {
            "id": "c12-eng",
            "title": "Engineering & Technology (B.Tech / BE Entrance)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Technology & Engineering",
            "primary_evidence_cluster": "TECH_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "mandatory_subjects": ["mathematics", "physics"],
            "why_fit_base": "Prepares for technical undergraduate engineering disciplines (CS, Electronics, Mechanical, Data Science).",
            "what_this_keeps_open": ["Software Engineering", "Hardware Engineering", "Data Science", "Technical R&D"],
            "prerequisites": "10+2 with Physics, Mathematics, and Chemistry/CS (mandatory).",
        },
        {
            "id": "c12-med",
            "title": "Medical & Dental Examination (NEET-UG / MBBS / BDS)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Healthcare & Medicine",
            "primary_evidence_cluster": "SCIENCE_ORIENTATION",
            "secondary_evidence_cluster": "RESEARCH_ORIENTATION",
            "mandatory_subjects": ["biology", "physics", "chemistry"],
            "why_fit_base": "National entrance trajectory for accredited medical and dental clinical degree programs.",
            "what_this_keeps_open": ["Clinical Medicine (MBBS)", "Dental Surgery (BDS)", "Clinical Research"],
            "prerequisites": "10+2 with Physics, Chemistry, and Biology (mandatory).",
        },
        {
            "id": "c12-cuet-commerce",
            "title": "Commerce & Economics (B.Com Hons / BMS / Economics)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Business & Finance",
            "primary_evidence_cluster": "BUSINESS_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "mandatory_subjects": [],
            "why_fit_base": "Undergraduate business and economics curriculum leading to corporate finance, analytics, and consulting.",
            "what_this_keeps_open": ["Corporate Finance", "Chartered Accountancy", "Management Consulting", "Investment Banking"],
            "prerequisites": "10+2 with Commerce, Mathematics, or Economics background.",
        },
        {
            "id": "c12-law",
            "title": "Integrated 5-Year Law Entrance (CLAT / AILET - BA LLB / BBA LLB)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Law & Legal Services",
            "primary_evidence_cluster": "HUMANITIES_ORIENTATION",
            "secondary_evidence_cluster": "BUSINESS_ORIENTATION",
            "mandatory_subjects": [],
            "why_fit_base": "Direct path into National Law Universities for corporate law, litigation, and judicial preparation.",
            "what_this_keeps_open": ["Corporate Legal Counsel", "Litigation Practice", "Judicial Services", "Legal Tech"],
            "prerequisites": "10+2 from any recognized academic stream.",
        },
    ],
    "ug": [
        {
            "id": "ug-industry-tech",
            "title": "Software Engineering / Industry Entry",
            "pathway_type": "CAREER_PATH",
            "cluster": "Technology & Software",
            "primary_evidence_cluster": "TECH_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Direct entry into professional software development teams via demonstrated code artifacts and problem-solving.",
            "prerequisites": "Degree in CS/IT/BCA or demonstrated technical project portfolio.",
        },
        {
            "id": "ug-mtech",
            "title": "M.Tech / Technical Specialization (GATE)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Technology & Systems",
            "primary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "secondary_evidence_cluster": "RESEARCH_ORIENTATION",
            "why_fit_base": "Domestic advanced engineering master's degree focusing on specialized systems, algorithms, and institutional R&D.",
            "entry_route": "GATE (Graduate Aptitude Test in Engineering)",
            "trade_offs": "Highly technical, research/systems orientation; requires intense preparation in core computer science theory.",
            "prerequisites": "B.Tech / BE or equivalent degree with competitive GATE score.",
        },
        {
            "id": "ug-ms",
            "title": "MS in Computer Science (Global Graduate Studies)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "International Graduate Education",
            "primary_evidence_cluster": "TECH_ORIENTATION",
            "secondary_evidence_cluster": "RESEARCH_ORIENTATION",
            "why_fit_base": "International graduate program providing cutting-edge lab immersion, research publications, and global tech market access.",
            "entry_route": "GRE, TOEFL/IELTS, academic transcripts, and research statement.",
            "trade_offs": "Higher financial investment and international relocation; requires independent research interest.",
            "prerequisites": "Bachelor's degree with strong academic record and verified statement of purpose.",
        },
        {
            "id": "ug-mba",
            "title": "MBA / Business Management (CAT / GMAT)",
            "pathway_type": "EDUCATION_PATH",
            "cluster": "Business & Leadership",
            "primary_evidence_cluster": "BUSINESS_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Accelerates transition into strategy, product management, investment banking, and executive operations.",
            "entry_route": "CAT / GMAT / XAT national competitive examinations.",
            "trade_offs": "Shifts daily focus from hands-on software development to organizational leadership and business metrics.",
            "prerequisites": "Bachelor's degree in any discipline with competitive entrance examination score.",
        },
        {
            "id": "ug-upsc",
            "title": "UPSC Civil Services Examination (IAS / IPS / IFS)",
            "pathway_type": "GOVERNMENT_PATH",
            "cluster": "Government & Civil Services",
            "primary_evidence_cluster": "HUMANITIES_ORIENTATION",
            "secondary_evidence_cluster": "BUSINESS_ORIENTATION",
            "why_fit_base": "Competitive national examination for public administrative leadership, governance, and societal policy execution.",
            "prerequisites": "Recognized Bachelor's degree (minimum age 21).",
        },
    ],
    "pg": [
        {
            "id": "pg-software-eng",
            "title": "Software Engineer / Backend Systems Specialist",
            "pathway_type": "CAREER_PATH",
            "cluster": "Technology & Software",
            "primary_evidence_cluster": "TECH_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Professional engineering role building robust web services, distributed systems, and enterprise backends.",
            "prerequisites": "Master's degree in computing (MCA / M.Tech / M.Sc CS) with hands-on coding proficiency.",
        },
        {
            "id": "pg-data-analytics",
            "title": "Data Analyst & Business Intelligence Specialist",
            "pathway_type": "CAREER_PATH",
            "cluster": "Data & Analytics",
            "primary_evidence_cluster": "BUSINESS_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Leverages quantitative modeling, SQL querying, and visualization tools to drive business metrics.",
            "prerequisites": "Degree in computing, statistics, or mathematics with database proficiency.",
        },
        {
            "id": "pg-fullstack",
            "title": "Full Stack Application Developer",
            "pathway_type": "CAREER_PATH",
            "cluster": "Technology & Software",
            "primary_evidence_cluster": "TECH_ORIENTATION",
            "secondary_evidence_cluster": "CREATIVE_ORIENTATION",
            "why_fit_base": "End-to-end product engineering covering frontend UI frameworks, backend APIs, and cloud deployments.",
            "prerequisites": "Postgraduate qualification with full-stack portfolio projects.",
        },
        {
            "id": "pg-phd",
            "title": "Doctoral Research Fellowship & PhD (UGC NET-JRF / GATE)",
            "pathway_type": "RESEARCH_PATH",
            "cluster": "Science & Research",
            "primary_evidence_cluster": "RESEARCH_ORIENTATION",
            "secondary_evidence_cluster": "QUANTITATIVE_ORIENTATION",
            "why_fit_base": "Advanced independent research for university tenure-track faculty appointments and corporate R&D posts.",
            "prerequisites": "Completed Master's degree with minimum 55% marks and qualifying national fellowship exam.",
        },
    ],
}

# Dynamic Mini-Experiments Catalogue (Section 33 & 34)
DYNAMIC_EXPERIMENTS = [
    {
        "id": "exp-coding",
        "cluster": "TECH_ORIENTATION",
        "title": "Algorithm Logic & Automation Challenge",
        "duration": "10 min",
        "resolves_uncertainty": "Coding aptitude & computational thinking",
        "impact_pathways": ["Software Engineering", "Science with Mathematics (PCM)", "M.Tech", "Full Stack Developer"],
        "scenario": "A logistics warehouse needs an automated sorting rule for incoming packages. Which approach minimizes lookup latency at scale?",
        "options": [
            {"id": "A", "text": "Linear scan checking every package sequentially", "score": 40},
            {"id": "B", "text": "Hash-table index grouping packages by destination postal code (O(1) average lookup)", "score": 95},
            {"id": "C", "text": "Manual operator visual inspection queue", "score": 20},
        ],
    },
    {
        "id": "exp-finance",
        "cluster": "BUSINESS_ORIENTATION",
        "title": "Operating Leverage & Unit Economics Challenge",
        "duration": "10 min",
        "resolves_uncertainty": "Financial acumen & business decision-making",
        "impact_pathways": ["Commerce with Mathematics", "Data Analytics", "MBA", "Finance"],
        "scenario": "A digital service has high fixed infrastructure costs ($50k/mo) and low variable costs ($2/user). If price is $20/user, what happens as volume grows from 5,000 to 10,000 users?",
        "options": [
            {"id": "A", "text": "Operating profit margin expands significantly as fixed costs are absorbed across higher volume", "score": 95},
            {"id": "B", "text": "Profit remains strictly identical on a per-user basis regardless of scale", "score": 30},
            {"id": "C", "text": "Fixed infrastructure expenses automatically double as user count doubles", "score": 20},
        ],
    },
    {
        "id": "exp-research",
        "cluster": "RESEARCH_ORIENTATION",
        "title": "Hypothesis Design & Empirical Inquiry",
        "duration": "10 min",
        "resolves_uncertainty": "Scientific research methodology & experimental rigor",
        "impact_pathways": ["Doctoral Research Fellowship & PhD", "MS in Computer Science", "Life Sciences"],
        "scenario": "An observational study discovers a positive correlation between variable X and metric Y (r = 0.78). What is the appropriate next step before asserting causal effect?",
        "options": [
            {"id": "A", "text": "Immediately publish that X causes Y because r exceeds 0.70", "score": 20},
            {"id": "B", "text": "Design a randomized controlled trial (RCT) with an isolated control group to test intervention effects", "score": 95},
            {"id": "C", "text": "Discard the data entirely because observational data cannot indicate any relationship", "score": 30},
        ],
    },
    {
        "id": "exp-design",
        "cluster": "CREATIVE_ORIENTATION",
        "title": "Visual Hierarchy & User Flow Challenge",
        "duration": "10 min",
        "resolves_uncertainty": "Design sensibility & user empathy",
        "impact_pathways": ["Graphic & UI Designer", "Humanities & Design", "Product Design"],
        "scenario": "Users are dropping off on a multi-step checkout screen. What is the most evidence-based UX intervention?",
        "options": [
            {"id": "A", "text": "Reduce form fields to essentials, chunk steps progressively, and increase primary CTA affordance", "score": 95},
            {"id": "B", "text": "Make the background flashing red to capture urgent attention", "score": 15},
            {"id": "C", "text": "Add a large legal disclaimer paragraph explaining company policy at the top", "score": 30},
        ],
    },
]


def select_dynamic_experiments(
    candidate_clusters: List[str],
    has_skills: bool,
    stage: str,
) -> List[Dict[str, Any]]:
    """
    Selects 1-2 mini-experiments that directly resolve active decision uncertainty (Section 33 & 34).
    Never shows finance operating leverage to a biology student!
    """
    selected = []
    seen = set()

    for exp in DYNAMIC_EXPERIMENTS:
        exp_cluster = exp["cluster"]
        if exp_cluster in candidate_clusters and exp["id"] not in seen:
            # If user has no skills in tech and tech is a candidate, coding is top priority
            if exp_cluster == "TECH_ORIENTATION" and not has_skills:
                selected.insert(0, exp)
            else:
                selected.append(exp)
            seen.add(exp["id"])

    # Fallback to stage default if no direct match
    if not selected:
        if stage == "class10":
            selected = [DYNAMIC_EXPERIMENTS[0], DYNAMIC_EXPERIMENTS[1]]  # Coding & Finance
        elif stage in ["ug", "pg"]:
            selected = [DYNAMIC_EXPERIMENTS[0]]  # Coding
        else:
            selected = [DYNAMIC_EXPERIMENTS[1]]  # Finance

    return selected[:2]


class UnifiedRecommendationEngine:
    """
    Unified core recommendation engine enforcing stage policies, evidence rationale,
    and machine-readable explanation traces without arbitrary percentage match scores.
    """

    @classmethod
    def generate_recommendations(
        cls,
        stage: str,
        user_profile: Dict[str, Any],
        target_role: Optional[str] = None,
        force_regenerate: bool = False,
    ) -> Dict[str, Any]:
        """
        Executes multidimensional recommendation evaluation.
        """
        normalized_stage = "working_professional" if stage in ["job_switcher", "professional"] else stage
        if normalized_stage not in ["class10", "class12", "ug", "pg", "working_professional"]:
            normalized_stage = "class10"

        # Count evidence tokens to prevent empty hallucinated recommendations
        evidence_count = 0
        for k, val in user_profile.items():
            if k in ["education_stage", "stage"] or val is None or val == "" or val == []:
                continue
            if isinstance(val, (list, dict)):
                evidence_count += len(val)
            else:
                evidence_count += 1

        if evidence_count < 2 and not target_role:
            return {
                "status": "NO_RECOMMENDATION_YET",
                "stage": normalized_stage,
                "summary": "We need more evidence before narrowing this down",
                "message": "We currently have insufficient verifiable signals to recommend a specific pathway without guessing.",
                "what_we_know": ["Stage: " + normalized_stage.upper()],
                "what_is_uncertain": [
                    "Core subject strengths beyond preliminary records",
                    "Interest domain preferences",
                    "Primary career objectives",
                ],
                "next_best_action": "Complete the initial diagnostic assessment or select a 10-minute mini-experiment.",
                "items": [],
                "why_not_candidates": [],
                "explanation_trace": {
                    "reason": "Profile evidence below minimum threshold.",
                    "evidence_count": evidence_count,
                    "confidence": "INSUFFICIENT",
                },
            }

        # Resolve target role if specified
        resolved_target = None
        target_eligibility = None
        if target_role:
            resolved_target = resolve_target_role(target_role)
            if resolved_target.get("entity"):
                target_eligibility = RequirementEngine.evaluate_target_eligibility(user_profile, resolved_target["entity"])

        # Working Professional Flow
        if normalized_stage == "working_professional":
            return cls._evaluate_working_professional_paths(user_profile, resolved_target, target_eligibility)

        # Build user evidence context (Anti-Double Counting, Section 14 & 15)
        user_signals_text = cls._build_user_text_corpus(user_profile)
        marks = user_profile.get("marks", {})
        stream_degree = str(user_profile.get("stream") or user_profile.get("degree_or_stream") or user_profile.get("degree") or "").lower()
        
        # Clean skills check (Section 27: NO SKILLS handling)
        raw_skills = user_profile.get("skills") or []
        clean_skills = [
            s.strip() for s in raw_skills 
            if isinstance(s, str) and s.lower().strip() not in ["no skills", "none", "n/a", "no skill", "not provided", "nil", ""]
        ]
        has_skills = len(clean_skills) > 0

        # Stated user goal (Goal != Fit, Section 16)
        user_goal = str(user_profile.get("target_role") or user_profile.get("goal_text") or user_profile.get("primary_goal") or "").lower()

        # Identify which evidence clusters are supported by user evidence
        active_clusters = set()
        for cluster_name, keywords in CORRELATED_CLUSTERS.items():
            if any(kw in user_signals_text for kw in keywords):
                active_clusters.add(cluster_name)

        candidate_paths = STAGE_PATHWAYS.get(normalized_stage, STAGE_PATHWAYS["class10"])
        scored_items = []
        why_not_items = []
        candidate_clusters_seen = set()

        for path in candidate_paths:
            primary_c = path.get("primary_evidence_cluster", "")
            secondary_c = path.get("secondary_evidence_cluster", "")
            candidate_clusters_seen.add(primary_c)

            # 1. Eligibility Check (Section 19, 21, 40)
            eligibility_status = "ELIGIBLE"
            hard_blockers = []
            
            # Class 12: Real Subject Prerequisites (Section 21: Class 12 PCB + JEE Case)
            if normalized_stage == "class12":
                mand_subjects = path.get("mandatory_subjects", [])
                if "mathematics" in mand_subjects and ("pcb" in stream_degree or "biology" in stream_degree):
                    if not any(k in stream_degree for k in ["pcm", "math", "pcmb"]):
                        eligibility_status = "NOT_CURRENTLY_ELIGIBLE"
                        hard_blockers.append(
                            "Prerequisite Mismatch: Engineering pathways and JEE require 10+2 with Mathematics. "
                            "Your current subject combination (PCB) does not satisfy the required Mathematics prerequisite for this pathway."
                        )
                if "biology" in mand_subjects and ("pcm" in stream_degree and not any(k in stream_degree for k in ["pcb", "bio", "pcmb"])):
                    eligibility_status = "NOT_CURRENTLY_ELIGIBLE"
                    hard_blockers.append(
                        "Prerequisite Mismatch: Medical entrance (NEET-UG) requires 10+2 with Biology/Biotechnology."
                    )

            # 2. Alignment Analysis (Section 41: Qualitative Alignment State)
            # Evaluates academic marks, interest cluster, goal alignment, and skill presence
            has_academic_mark = False
            academic_score_boost = 0
            if "math" in primary_c.lower() or "quantitative" in primary_c.lower():
                vm = validate_mark(marks.get("math") or marks.get("mathematics") or marks.get("maths"))
                if vm.get("status") == "VALID":
                    has_academic_mark = True
                    academic_score_boost = vm.get("normalized_percentage", 0)

            has_cluster_interest = (primary_c in active_clusters) or (secondary_c in active_clusters)
            is_goal_aligned = bool(user_goal and any(w in path["title"].lower() for w in user_goal.split() if len(w) > 3))

            # Derive Qualitative Alignment Label (No arbitrary 98%/92% percentages)
            if eligibility_status == "NOT_CURRENTLY_ELIGIBLE":
                alignment_label = "NOT CURRENTLY ELIGIBLE"
                rank_score = 10
            elif not has_skills and normalized_stage in ["ug", "pg"] and "tech" in primary_c.lower():
                # Section 26 & 27: Degree compatible, but skill evidence missing
                alignment_label = "WORTH EXPLORING"
                rank_score = 60
            elif has_academic_mark and academic_score_boost >= 75 and has_cluster_interest:
                alignment_label = "STRONG ALIGNMENT"
                rank_score = 90
            elif has_cluster_interest or is_goal_aligned:
                alignment_label = "PROMISING DIRECTION"
                rank_score = 75
            else:
                alignment_label = "WORTH EXPLORING"
                rank_score = 50

            # 3. Personalized Rationale Generator (Section 29, 30, 57, 58)
            personalized_reasons = []
            supporting_evidence = []
            
            if has_academic_mark and academic_score_boost >= 65:
                personalized_reasons.append(f"Supported by your academic performance in Mathematics ({academic_score_boost}%).")
                supporting_evidence.append(f"Mathematics mark: {academic_score_boost}%")

            if has_cluster_interest:
                personalized_reasons.append(f"Directly matches your interest signals in {primary_c.replace('_', ' ').title()}.")
                supporting_evidence.append(f"Expressed interest in {primary_c.replace('_', ' ').title()}")

            if is_goal_aligned:
                personalized_reasons.append(f"Aligns with your stated target direction: '{user_goal}'.")
                supporting_evidence.append(f"Stated goal: {user_goal}")

            if not has_skills and normalized_stage in ["ug", "pg"] and "tech" in primary_c.lower():
                personalized_reasons.append("Your degree qualification is compatible, but technical skill evidence is not yet established.")

            if hard_blockers:
                personalized_reasons.extend(hard_blockers)

            # Construct personalized why_fit sentence
            why_fit_text = " ".join(personalized_reasons) if personalized_reasons else path.get("why_fit_base", "Plausible pathway matching your academic stage.")

            item_payload = {
                "id": path["id"],
                "title": path["title"],
                "pathway_type": path["pathway_type"],
                "cluster": path["cluster"],
                "rank_score": rank_score,
                "alignment_label": alignment_label,
                "eligibility_status": eligibility_status,
                "hard_blockers": hard_blockers,
                "why_this_path": why_fit_text,
                "about_this_path": path.get("why_fit_base", ""),
                "supporting_evidence": supporting_evidence if supporting_evidence else ["Stage-appropriate exploration direction"],
                "what_this_keeps_open": path.get("what_this_keeps_open", []),
                "what_this_supports": path.get("what_this_supports", ""),
                "trade_offs": path.get("trade_offs", "Requires consistent curriculum focus and timely preparation."),
                "what_is_still_uncertain": path.get("what_is_still_uncertain", "Practical problem-solving depth under timed conditions."),
                "gaps": hard_blockers if hard_blockers else ([] if has_skills or normalized_stage == "class10" else ["Demonstrated skill evidence missing (portfolio or challenge)"]),
                "what_would_change_this": (
                    "Resolving subject prerequisite eligibility." if hard_blockers
                    else ("Completing a 10-minute skill challenge or project." if not has_skills and normalized_stage in ["ug", "pg"]
                    else "Submitting term examination marks or practical problem-solving evidence.")
                ),
                "next_step": path.get("what_to_try_next", f"Explore curriculum details and try an introductory challenge for {path['title']}."),
            }

            if rank_score >= 40:
                scored_items.append(item_payload)
            else:
                why_not_items.append({
                    "title": path["title"],
                    "pathway_type": path["pathway_type"],
                    "reason_excluded": f"Current profile evidence does not prioritize {path['cluster']}.",
                    "what_is_missing": [f"Demonstrated coursework or expressed interest in {path['cluster']}."],
                    "what_would_make_it_viable": "Take an introductory exploration challenge in this domain.",
                    "is_ruled_out": False,
                })

        scored_items.sort(key=lambda x: x["rank_score"], reverse=True)

        # Dynamic Mini-Experiments Selection (Section 33 & 34)
        dynamic_experiments = select_dynamic_experiments(list(candidate_clusters_seen), has_skills, normalized_stage)

        trace = {
            "stage": normalized_stage,
            "target_evaluated": resolved_target["canonical_name"] if resolved_target else None,
            "user_evidence_count": evidence_count,
            "candidates_evaluated": len(candidate_paths),
            "candidates_recommended": len(scored_items),
            "candidates_excluded": len(why_not_items),
            "confidence": "HIGH" if scored_items and scored_items[0]["alignment_label"] == "STRONG ALIGNMENT" else "MODERATE",
            "decision_context": f"{normalized_stage.upper()} multidimensional evaluation",
        }

        return {
            "status": "RECOMMENDATIONS_READY",
            "stage": normalized_stage,
            "summary": f"Evidence-based pathway evaluation for {normalized_stage.upper()}",
            "target_resolution": resolved_target,
            "target_eligibility": target_eligibility,
            "items": scored_items,
            "why_not_candidates": why_not_items,
            "dynamic_experiments": dynamic_experiments,
            "explanation_trace": trace,
        }

    @classmethod
    def _evaluate_working_professional_paths(
        cls,
        user_profile: Dict[str, Any],
        resolved_target: Optional[Dict[str, Any]],
        target_eligibility: Optional[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """Evaluates transition for working professionals with transferable skills and gap analysis."""
        current_role = user_profile.get("current_job_title") or user_profile.get("current_role") or "Working Professional"
        responsibilities = user_profile.get("responsibilities") or user_profile.get("current_responsibilities") or []
        current_skills = user_profile.get("skills") or []

        # If current role is teacher, ensure teaching responsibility is recognized
        if "teach" in str(current_role).lower() and not any("teach" in str(r).lower() for r in responsibilities):
            responsibilities = list(responsibilities) + ["teaching", "classroom instruction", "curriculum planning"]

        transferable = TransferableSkillEngine.extract_transferable_skills(
            responsibilities=responsibilities,
            current_skills=current_skills,
            target_role=resolved_target.get("canonical_name") if resolved_target else None,
        )

        items = []
        why_not = []

        if resolved_target and resolved_target.get("entity"):
            target_entity = resolved_target["entity"]
            eligibility_state = target_eligibility.get("eligibility_state", "PARTIALLY_ELIGIBLE") if target_eligibility else "PARTIALLY_ELIGIBLE"
            hard_blockers = target_eligibility.get("hard_blockers", []) if target_eligibility else []
            skill_gaps = target_eligibility.get("skill_gaps", []) if target_eligibility else []

            # Alignment label
            if eligibility_state == "ELIGIBLE":
                alignment_label = "STRONG ALIGNMENT"
            elif eligibility_state == "PARTIALLY_ELIGIBLE":
                alignment_label = "POSSIBLE WITH PREPARATION"
            elif eligibility_state == "REQUIREMENTS_UNKNOWN":
                alignment_label = "REQUIREMENTS UNKNOWN"
            else:
                alignment_label = "NOT CURRENTLY ELIGIBLE"

            items.append({
                "id": target_entity["slug"],
                "title": target_entity["canonical_name"],
                "pathway_type": target_entity["pathway_type"],
                "cluster": target_entity["cluster"],
                "rank_score": 85 if eligibility_state == "ELIGIBLE" else (65 if eligibility_state == "PARTIALLY_ELIGIBLE" else 35),
                "alignment_label": alignment_label,
                "eligibility_status": eligibility_state,
                "hard_blockers": hard_blockers,
                "why_this_path": (
                    f"Transition from '{current_role}' to '{target_entity['canonical_name']}'. "
                    + (f"Demonstrated transferable capabilities: {', '.join([t['skill'] for t in transferable[:2]])}. " if transferable else "")
                    + (f"Key institutional requirements needed: {'; '.join(hard_blockers)}." if hard_blockers else "")
                ),
                "supporting_evidence": [f"Transferable skill: {t['skill']}" for t in transferable[:3]] or ["Current professional domain context"],
                "transferable_skills": transferable,
                "gaps": hard_blockers if hard_blockers else skill_gaps,
                "application_readiness": target_eligibility.get("application_readiness", {}) if target_eligibility else {},
                "what_would_change_this": (
                    "Fulfilling statutory qualification requirements (Master's degree / UGC-NET)." if "professor" in target_entity["slug"]
                    else "Building verified portfolio artifacts and completing domain certifications."
                ),
                "next_step": (
                    "Review institutional eligibility criteria and prepare postgraduate qualification plan." if hard_blockers
                    else "Compile transferable skill dossier and prepare domain application materials."
                ),
            })
        else:
            # Adjacent role from transferable skills
            items.append({
                "id": "adjacent-domain-advancement",
                "title": f"Senior {current_role} / Domain Specialist",
                "pathway_type": "CAREER_PATH",
                "cluster": "Professional Advancement",
                "rank_score": 80,
                "alignment_label": "STRONG ALIGNMENT",
                "eligibility_status": "ELIGIBLE",
                "why_this_path": f"Direct career progression leveraging your established execution as {current_role}.",
                "supporting_evidence": [t["skill"] for t in transferable[:3]],
                "transferable_skills": transferable,
                "gaps": ["Strategic stakeholder ownership", "Advanced mentorship & cross-team execution"],
                "what_would_change_this": "Demonstrating leadership of strategic initiatives.",
                "next_step": "Document team leadership and impact milestones in your professional portfolio.",
            })

        trace = {
            "stage": "working_professional",
            "current_role": current_role,
            "target_evaluated": resolved_target["canonical_name"] if resolved_target else None,
            "transferable_skills_found": len(transferable),
            "confidence": "HIGH" if transferable else "MODERATE",
            "decision_context": "Professional career transition analysis",
        }

        return {
            "status": "RECOMMENDATIONS_READY",
            "stage": "working_professional",
            "summary": f"Transition analysis evaluated for {current_role}",
            "target_resolution": resolved_target,
            "target_eligibility": target_eligibility,
            "transferable_skills": transferable,
            "items": items,
            "why_not_candidates": why_not,
            "dynamic_experiments": [DYNAMIC_EXPERIMENTS[0], DYNAMIC_EXPERIMENTS[1]],
            "explanation_trace": trace,
        }

    @staticmethod
    def _build_user_text_corpus(user_profile: Dict[str, Any]) -> str:
        tokens = []
        for val in user_profile.values():
            if isinstance(val, list):
                tokens.extend([str(item) for item in val])
            elif isinstance(val, dict):
                tokens.extend([str(k) + " " + str(v) for k, v in val.items()])
            elif val is not None:
                tokens.append(str(val))
        return " ".join(tokens).lower()
