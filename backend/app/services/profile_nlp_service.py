"""
Natural Language Profile Parser & Career Transition Analyzer.
Implements Section 3, Section 4, and Section 6 of the AI Career Guidance Engine requirements:
- Extracts multiple roles and all technical/non-technical skills from natural-language text.
- Maintains strict distinctions:
  1. Confirmed facts provided by user.
  2. Inferred transferable skills.
  3. Skills requiring confirmation.
  4. Missing skills for target career.
  5. Missing information follow-up questions.
- Never fabricates unverified skills.
- Handles unknown skills gracefully without discarding them.
"""
import re
from typing import Dict, List, Any, Optional

# Knowledge mapping of transferable capabilities inferred from verified past roles/domains
TRANSFERABLE_SKILLS_TAXONOMY: Dict[str, List[Dict[str, str]]] = {
    "teaching": [
        {"skill_name": "Curriculum & Lesson Planning", "category": "Core Domain", "why": "Developed through structuring classroom syllabi and student objectives."},
        {"skill_name": "Public Speaking & Verbal Articulation", "category": "Soft Skills", "why": "Honed daily through classroom lectures and student presentations."},
        {"skill_name": "Formative & Summative Assessment", "category": "Core Domain", "why": "Inferred from designing test rubrics and grading assignments."},
        {"skill_name": "Empathy & Differentiated Instruction", "category": "Soft Skills", "why": "Inferred from accommodating diverse student learning speeds."}
    ],
    "teacher": [
        {"skill_name": "Curriculum & Lesson Planning", "category": "Core Domain", "why": "Developed through structuring classroom syllabi and student objectives."},
        {"skill_name": "Public Speaking & Verbal Articulation", "category": "Soft Skills", "why": "Honed daily through classroom lectures and student presentations."},
        {"skill_name": "Instructional Delivery", "category": "Core Domain", "why": "Direct experience delivering concepts and facilitating group learning."}
    ],
    "digital marketing": [
        {"skill_name": "Audience Research & Customer Personas", "category": "Core Domain", "why": "Inferred from planning targeting campaigns for specific demographic cohorts."},
        {"skill_name": "Copywriting & Value Proposition Messaging", "category": "Soft Skills", "why": "Inferred from authoring promotional hooks, ads, and landing page copy."},
        {"skill_name": "Funnel Analytics & CTR / Conversion Tracking", "category": "Technical", "why": "Inferred from evaluating paid and organic campaign performance."}
    ],
    "digital marketer": [
        {"skill_name": "Audience Research & Customer Personas", "category": "Core Domain", "why": "Inferred from planning targeting campaigns for specific demographic cohorts."},
        {"skill_name": "Copywriting & Value Proposition Messaging", "category": "Soft Skills", "why": "Inferred from authoring promotional hooks, ads, and landing page copy."},
        {"skill_name": "Funnel Analytics & CTR / Conversion Tracking", "category": "Technical", "why": "Inferred from evaluating paid and organic campaign performance."}
    ],
    "accounting": [
        {"skill_name": "Financial Statement Literacy", "category": "Core Domain", "why": "Direct competence with Balance Sheets, P&L, and general ledgers."},
        {"skill_name": "Numerical Accuracy & Reconciliation", "category": "Core Domain", "why": "Inferred from balancing accounts, trial balances, and ledger auditing."},
        {"skill_name": "Spreadsheet Data Modeling", "category": "Technical", "why": "Inferred from tabular bookkeeping and financial reports in Excel."}
    ],
    "accountant": [
        {"skill_name": "Financial Statement Literacy", "category": "Core Domain", "why": "Direct competence with Balance Sheets, P&L, and general ledgers."},
        {"skill_name": "Numerical Accuracy & Reconciliation", "category": "Core Domain", "why": "Inferred from balancing accounts, trial balances, and ledger auditing."},
        {"skill_name": "Spreadsheet Data Modeling", "category": "Technical", "why": "Inferred from tabular bookkeeping and financial reports in Excel."}
    ],
    "customer support": [
        {"skill_name": "Customer Empathy & De-escalation", "category": "Soft Skills", "why": "Direct experience resolving user complaints under SLA constraints."},
        {"skill_name": "Technical Troubleshooting Methodology", "category": "Core Domain", "why": "Inferred from diagnosing user bugs, reproducing issues, and ticketing."}
    ],
    "sales": [
        {"skill_name": "Commercial Communication & Rapport", "category": "Soft Skills", "why": "Honed through direct buyer engagement and pitch meetings."},
        {"skill_name": "Pipeline & Deal Tracking", "category": "Core Domain", "why": "Inferred from managing CRM stages and closing cycles."}
    ]
}

# Common skills to recognize from natural language phrases
RECOGNIZED_SKILL_PATTERNS = [
    (r"\bpython\b", "Python"),
    (r"\bexcel\b", "Excel"),
    (r"\bsql\b", "SQL"),
    (r"\bcommunication\b", "Communication"),
    (r"\b(basic\s+data\s+analysis|data\s+analysis)\b", "Basic Data Analysis"),
    (r"\bteaching\b", "Teaching"),
    (r"\bdigital\s+marketing\b", "Digital Marketing"),
    (r"\baccounting\b", "Accounting"),
    (r"\b(seo|search\s+engine\s+optimization)\b", "SEO"),
    (r"\bcontent\s+writing\b", "Content Writing"),
    (r"\bfigma\b", "Figma"),
    (r"\bui\s*/\s*ux(\s+design)?\b", "UI/UX Design"),
    (r"\bjavascript\b", "JavaScript"),
    (r"\btypescript\b", "TypeScript"),
    (r"\breact\b", "React"),
    (r"\bdocker\b", "Docker"),
    (r"\bgit\b", "Git"),
    (r"\bpower\s*bi\b", "Power BI"),
    (r"\btableau\b", "Tableau"),
    (r"\bproject\s+management\b", "Project Management"),
    (r"\bpublic\s+speaking\b", "Public Speaking"),
    (r"\bproblem\s+solving\b", "Problem Solving"),
]

# Common transition trigger patterns: "move from X into Y", "transition into Y", "become a Y", "switch to Y"
TRANSITION_PATTERNS = [
    r"move\s+from\s+([a-zA-Z\s]+?)\s+into\s+([a-zA-Z\s]+?)(?:[.,]|$)",
    r"transition\s+(?:from\s+([a-zA-Z\s]+?)\s+)?into\s+([a-zA-Z\s]+?)(?:[.,]|$)",
    r"switch\s+(?:from\s+([a-zA-Z\s]+?)\s+)?to\s+([a-zA-Z\s]+?)(?:[.,]|$)",
    r"want\s+to\s+become\s+(?:an?\s+)?([a-zA-Z\s]+?)(?:[.,]|$)",
    r"aspire\s+to\s+be\s+(?:an?\s+)?([a-zA-Z\s]+?)(?:[.,]|$)",
]


def parse_natural_language_profile(text: str) -> Dict[str, Any]:
    """
    Parses a free-text self-description or natural-language query into structured components:
    - roles_mentioned: all past/current jobs or experiences
    - skills_extracted: all distinct skills explicitly listed
    - target_role_intent: stated transition destination if present
    - raw_unmatched_tokens: preserves any unusual/unrecognized skills stated by the user
    """
    cleaned = text.strip()
    if not cleaned:
        return {
            "roles_mentioned": [],
            "skills_extracted": [],
            "target_role_intent": None,
            "raw_unmatched_tokens": [],
            "facts": [],
        }

    lower_text = cleaned.lower()

    # 1. Detect roles & past experiences
    roles_mentioned = []
    role_indicators = [
        "digital marketer", "digital marketing", "marketer",
        "teacher", "teaching", "educator", "tutor",
        "accountant", "accounting", "bookkeeper",
        "software engineer", "developer", "programmer",
        "data analyst", "data scientist",
        "customer support", "sales executive", "designer"
    ]
    for r in role_indicators:
        if re.search(rf"\b{re.escape(r)}\b", lower_text):
            # Standardize label
            clean_role = r.replace("teaching", "Teaching Experience").replace("digital marketing", "Digital Marketer").title()
            if clean_role not in roles_mentioned:
                roles_mentioned.append(clean_role)

    # 2. Detect transition intents
    target_role_intent = None
    for pattern in TRANSITION_PATTERNS:
        match = re.search(pattern, lower_text)
        if match:
            groups = match.groups()
            target_str = groups[-1].strip()
            # Clean filler words
            target_str = re.sub(r"^(an?|the)\s+", "", target_str).strip()
            if len(target_str) >= 3 and target_str not in ["a", "an", "the", "my"]:
                target_role_intent = target_str.title()
                break

    # 3. Detect skills explicitly provided
    skills_extracted = []
    for pattern, skill_name in RECOGNIZED_SKILL_PATTERNS:
        if re.search(pattern, lower_text):
            if skill_name not in skills_extracted:
                skills_extracted.append(skill_name)

    # 4. Handle arbitrary / unknown user skills:
    # Look for lists following "I know", "skills in", "experience with"
    raw_unmatched = []
    list_matches = re.findall(r"(?:i know|skills in|experience with|proficient in|familiar with)\s+([^.]+)", lower_text)
    for clause in list_matches:
        tokens = [t.strip() for t in re.split(r"[,;]|(?:\band\b)", clause) if t.strip()]
        for tok in tokens:
            tok_clean = re.sub(r"^(basic|intermediate|advanced|good|solid)\s+", "", tok).strip()
            if len(tok_clean) >= 2 and tok_clean not in ["a", "an", "the", "and", "or", "also"]:
                formatted_token = tok.title()
                # If not already covered in recognized skills, preserve it!
                if not any(s.lower() == tok_clean.lower() for s in skills_extracted):
                    raw_unmatched.append(formatted_token)
                    skills_extracted.append(formatted_token)

    # Deduplicate skills case-insensitively
    unique_skills = []
    seen = set()
    for s in skills_extracted:
        sl = s.lower().strip()
        if sl and sl not in seen:
            seen.add(sl)
            unique_skills.append(s)
    skills_extracted = unique_skills

    # 5. Extract explicitly stated facts
    facts = []
    if roles_mentioned:
        facts.append(f"Reported background/roles: {', '.join(roles_mentioned)}")
    if skills_extracted:
        facts.append(f"Explicitly mentioned skills: {', '.join(skills_extracted)}")
    if target_role_intent:
        facts.append(f"Stated target career intent: {target_role_intent}")

    return {
        "roles_mentioned": roles_mentioned,
        "skills_extracted": skills_extracted,
        "target_role_intent": target_role_intent,
        "raw_unmatched_tokens": raw_unmatched,
        "facts": facts,
    }


def analyze_multiskill_evidence(
    parsed_profile: Dict[str, Any],
    target_role_data: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """
    Evaluates confirmed user profile inputs against career expectations.
    Implements Section 3 'Important Profile Rules':
    1. Confirmed facts provided by user.
    2. Potentially transferable skills inferred from verified facts.
    3. Skills requiring confirmation.
    4. Skills target career requires but user has not demonstrated.
    5. Missing information follow-up questions.
    """
    roles = parsed_profile.get("roles_mentioned", [])
    user_skills = parsed_profile.get("skills_extracted", [])
    target_role = parsed_profile.get("target_role_intent")
    if target_role_data:
        target_role = target_role_data.get("title", target_role)

    # 1. Confirmed Facts
    confirmed_facts = list(parsed_profile.get("facts", []))

    # 2. Inferred Transferable Skills (derived strictly from confirmed roles)
    inferred_transferable = []
    for role_name in roles:
        role_key = role_name.lower()
        for tax_key, skills in TRANSFERABLE_SKILLS_TAXONOMY.items():
            if tax_key in role_key or role_key in tax_key:
                for s in skills:
                    if not any(ts["skill_name"] == s["skill_name"] for ts in inferred_transferable):
                        inferred_transferable.append({
                            "skill_name": s["skill_name"],
                            "category": s["category"],
                            "source_experience": role_name,
                            "rationale": s["why"],
                            "status": "Inferred Transferable (from verified experience)"
                        })

    # 3. Skills Requiring Confirmation (e.g. "basic data analysis" -> needs confirmation of specific tools)
    skills_requiring_confirmation = []
    for s in user_skills:
        s_lower = s.lower()
        if "basic" in s_lower:
            skills_requiring_confirmation.append({
                "skill_name": s,
                "reason": f"User reported '{s}' without specifying tool depth. Needs confirmation on whether this includes SQL, Python, or spreadsheet formulas.",
                "clarification_prompt": f"You mentioned {s}. Could you confirm whether this includes SQL queries, Excel formulas, or Python libraries like Pandas?"
            })
        elif s_lower in ["data analysis", "analytics"] and not any(t in [us.lower() for us in user_skills] for t in ["sql", "excel", "python"]):
            skills_requiring_confirmation.append({
                "skill_name": s,
                "reason": "Mentioned data analysis without indicating specific tooling (SQL/Excel/BI).",
                "clarification_prompt": "Which tools do you currently use for data analysis (e.g., Excel, SQL, Tableau, Power BI)?"
            })

    # 4. Target Career Gap Analysis (if target role provided)
    missing_for_target = []
    target_role_supported = True
    completeness_status = "complete"

    if target_role_data:
        completeness_status = target_role_data.get("completeness_status", "complete")
        role_skills = target_role_data.get("skills", [])
        for rskill in role_skills:
            req_name = rskill.get("skill_name", "")
            req_lower = req_name.lower()
            # Check if user has it directly
            has_direct = any(us.lower() in req_lower or req_lower in us.lower() for us in user_skills)
            # Check if user has it inferred
            has_inferred = any(ts["skill_name"].lower() in req_lower for ts in inferred_transferable)

            if not has_direct and not has_inferred:
                missing_for_target.append({
                    "skill_name": req_name,
                    "category": rskill.get("category", "Technical"),
                    "importance": rskill.get("importance", "core"),
                    "why_it_matters": rskill.get("why_it_matters", f"Standard requirement for {target_role}."),
                    "status": "Missing - Skill Development Required"
                })

    # 5. Missing Information Questions (Case C handling)
    missing_information_questions = []

    # If user provided zero skills and zero roles
    if not roles and not user_skills:
        missing_information_questions.append({
            "field": "current_role_and_skills",
            "question": "What is your current or most recent job role, and what primary skills or tools do you use day-to-day?"
        })
    # If user wants a career transition but target role is unknown
    if not target_role:
        missing_information_questions.append({
            "field": "target_role",
            "question": "Which specific career role or industry domain are you aiming to transition into?"
        })
    # If transition to Data Analyst but no mention of SQL/Excel/Math
    if target_role and "data analyst" in target_role.lower():
        has_sql_or_db = any("sql" in us.lower() or "database" in us.lower() for us in user_skills)
        if not has_sql_or_db:
            missing_information_questions.append({
                "field": "sql_experience",
                "question": "A Data Analyst role typically requires database querying. Do you have any experience writing SQL queries or working with relational databases?"
            })
    # If transition to Business Development but no mention of sales/client facing
    if target_role and "business development" in target_role.lower():
        has_sales = any("sales" in r.lower() or "client" in r.lower() for r in roles)
        if not has_sales:
            missing_information_questions.append({
                "field": "client_facing_experience",
                "question": "Business Development relies heavily on outbound discovery and negotiations. Have you previously held client-facing or sales-related responsibilities?"
            })

    return {
        "confirmed_facts": confirmed_facts,
        "explicit_skills": user_skills,
        "inferred_transferable_skills": inferred_transferable,
        "skills_requiring_confirmation": skills_requiring_confirmation,
        "missing_skills_for_target": missing_for_target,
        "missing_information_questions": missing_information_questions,
        "target_role": target_role,
        "is_profile_sufficient": len(user_skills) > 0 or len(roles) > 0,
        "completeness_status": completeness_status,
    }
