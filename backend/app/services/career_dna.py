"""
Career DNA — a dedicated, stage-specific discovery form (separate from
general profile onboarding, per the product requirement).

For every stage, this answers: "given where I am right now, what are
ALL the groups/streams/paths I could realistically take next, and what
is each one actually useful for?" — BEFORE the user has necessarily
picked a specific career. This is deliberately broader than a single
career recommendation: it's the fork-in-the-road map.
"""
from typing import Any, Optional, Dict, List
import re
from .career_dna_schema import (
    CareerDNA, EvidenceItem, SignalItem, AcademicProfile, AptitudeProfile, InterestProfile,
    SkillProfile, PreferenceProfile, ValuesProfile, GoalsProfile,
    ConstraintsProfile, ExperienceProfile, TargetDirectionProfile,
    ExplorationHistoryProfile, UncertaintyProfile
)
from .career_dna_questionnaire_schema import (
    CLASS10_DOMAINS as C10_ADAPTIVE_DOMAINS,
    QuestionOption as AdaptiveQuestionOption,
    Question as AdaptiveQuestion,
    AnswerRecord as AdaptiveAnswerRecord,
    QuestionnaireSession,
)
from .career_dna_question_bank import QuestionBank
from .career_dna_questionnaire_selector import (
    select_next_batch,
    select_next_question,
    record_answer,
    count_visible_questions,
    build_contradiction_checks,
    MIN_VISIBLE_QUESTIONS,
    MAX_VISIBLE_QUESTIONS,
    HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD,
)
from .evidence_engine import (
    validate_mark, create_evidence, ContradictionEngine, sanitize_text,
    classify_signal, derive_strongest_signals, derive_what_we_know,
    derive_demonstrated_capabilities, derive_stage_uncertainty,
    CORRELATED_CLUSTERS
)
from .target_resolution import resolve_target_role
from .requirement_engine import RequirementEngine, TransferableSkillEngine
from .recommendation_core import select_dynamic_experiments




STAGE_METADATA = {
    "class10": {
        "question_cap": 10,
        "required_dimensions": ["subjects", "career_interest", "work_style", "constraints"],
        "ruleset_version": "career_dna_v1",
    },
    "class12": {
        "question_cap": 10,
        "required_dimensions": ["stream", "exam_interest", "degree_preferences", "work_style"],
        "ruleset_version": "career_dna_v1",
    },
    "ug": {
        "question_cap": 8,
        "required_dimensions": ["degree_branch", "next_step_interest", "skills", "gap"],
        "ruleset_version": "career_dna_v1",
    },
    "pg": {
        "question_cap": 8,
        "required_dimensions": ["specialization", "research", "direction", "mobility"],
        "ruleset_version": "career_dna_v1",
    },
    "job_switcher": {
        "question_cap": 20,
        "required_dimensions": ["current_role", "specialization", "experience", "responsibilities", "skills", "goal", "transition_fit"],
        "ruleset_version": "career_dna_v1",
    },
}

ADAPTIVE_QUESTION_IDS = {
    "job_switcher": [
        "current_job_title",
        "current_specialization",
        "seniority_level",
        "years_experience",
        "current_industry",
        "current_responsibilities",
        "current_responsibilities_free_text",
        "current_skills",
        "tools_used",
        "highest_qualification",
        "certifications",
        "major_achievements",
        "switch_reasons",
        "target_role_status",
        "target_role",
        "target_industries",
        "work_preferences",
        "weekly_learning_hours",
        "transition_timeline",
        "willing_to_reskill",
    ],
}


PATH_TYPE_RULES = {
    "professional_certification": [
        "ca", "chartered accountant", "cfa", "acca", "cs", "company secretary",
        "certification", "licensure", "asq", "pmp", "aws", "azure",
    ],
    "regulated_licensure": [
        "doctor", "medicine", "mbbs", "bds", "surgeon", "dentist", "architect",
        "pilot", "lawyer", "advocate", "teacher", "nurse", "clinical",
    ],
    "specialized_study": [
        "mtech", "ms", "mba", "phd", "research", "masters", "higher studies",
        "graduate study", "study abroad",
    ],
    "general_career": [
        "software", "data", "product", "design", "marketing", "business", "finance",
        "operations", "sales", "analyst", "engineer",
    ],
}

QUESTION_SETS = {
    "class10": [
        {"id": "favorite_subjects", "type": "multi_select", "question": "Which subjects do you enjoy most?",
         "options": ["Mathematics", "Science (Physics/Chemistry/Biology)", "Social Science/History/Civics",
                     "Languages/English", "Computer/IT", "Art/Craft", "Commerce basics", "Physical Education"]},
        {"id": "strong_subjects", "type": "multi_select", "question": "Which subjects do you consistently score well in?",
         "options": ["Mathematics", "Science", "Social Science", "Languages", "Computer/IT", "Commerce", "Art"]},
        {"id": "work_style", "type": "single_select", "question": "Which describes how you like to work best?",
         "options": ["Solving logical/numeric problems", "Hands-on/practical building or fixing things",
                     "Creative/artistic expression", "Reading, writing, debating ideas", "Helping/working with people"]},
        {"id": "career_curiosity", "type": "multi_select",
         "question": "Any fields you're curious about, even vaguely? (pick any that interest you)",
         "options": ["Engineering/Technology", "Medicine/Healthcare", "Government service (IAS/IPS/etc.)",
                     "Business/Commerce", "Law", "Design/Creative fields", "Defence/Armed forces",
                     "Teaching/Academics", "Skilled trade (electrician, mechanic, etc.)", "Not sure yet"]},
        {"id": "family_constraints", "type": "single_select", "question": "Any constraints to keep in mind?",
         "options": ["None / flexible", "Budget-conscious", "Prefer to study near home", "Family expects a specific field"]},
    ],
    "class12": [
        {"id": "stream", "type": "single_select", "question": "Which stream/group are you currently in?",
         "options": ["Science (PCM)", "Science (PCB)", "Science (PCMB)", "Commerce (with Maths)",
                     "Commerce (without Maths)", "Arts/Humanities", "Vocational/ITI"]},
        {"id": "entrance_interest", "type": "multi_select",
         "question": "Which entrance exams (if any) have you considered or heard about?",
         "options": ["JEE Main/Advanced", "NEET", "CUET", "CLAT", "NDA", "CA Foundation",
                     "Design entrances (NID/NIFT/UCEED)", "None yet"]},
        {"id": "preferred_degree_type", "type": "multi_select", "question": "What kind of degree are you leaning toward?",
         "options": ["Engineering (B.Tech/B.E.)", "Medicine (MBBS/BDS/BAMS)", "Pure sciences (B.Sc)",
                     "Commerce (B.Com/BBA)", "Law (BA LLB)", "Design/Architecture", "Arts/Humanities (BA)",
                     "Defence entry (NDA/CDS)", "Not decided"]},
        {"id": "strong_subjects", "type": "multi_select", "question": "Which subjects are your strongest right now?",
         "options": ["Mathematics", "Physics", "Chemistry", "Biology", "Accountancy", "Economics", "Business Studies", 
                     "History/Political Science", "Languages", "Computer Science/IT"]},
        {"id": "work_style", "type": "single_select", "question": "What kind of work appeals to you?",
         "options": ["Logical problem solving & coding", "Healthcare & helping people", "Business, finance & management", 
                     "Creative design & arts", "Research & deep study", "Public service & administration"]},
    ],
    "ug": [
        {"id": "degree_branch", "type": "text", "question": "What degree and branch/specialization are you in? (e.g. B.Tech CSE, B.Com, BA Economics)"},
        {"id": "current_year", "type": "single_select", "question": "Which year are you in?",
         "options": ["1st year", "2nd year", "3rd year", "Final year", "Already graduated"]},
        {"id": "next_step_interest", "type": "multi_select", "question": "What are you weighing for after this degree?",
         "options": ["Placement/job immediately", "Higher studies (M.Tech/MBA/MS)", "Competitive government exams (UPSC/banking/SSC)",
                     "Research/PhD", "Entrepreneurship/startup", "Study abroad", "Not sure yet"]},
        {"id": "skills_so_far", "type": "text", "question": "Any skills, projects, or internships so far worth mentioning?"},
        {"id": "biggest_gap", "type": "single_select", "question": "What feels like the biggest gap right now?",
         "options": ["Technical/domain skills", "Clarity on which direction to pick", "Exam preparation strategy",
                     "Portfolio/work experience", "Confidence/guidance in general"]},
    ],
    "pg": [
        {"id": "degree_specialization", "type": "text", "question": "What are you pursuing/have you completed at PG level? (degree + specialization)"},
        {"id": "primary_direction", "type": "single_select", "question": "What direction are you leaning toward?",
         "options": ["PhD/research", "Industry job in specialization", "Academia/teaching", "Public sector/government role",
                     "Entrepreneurship", "Still deciding"]},
        {"id": "publications_research", "type": "single_select", "question": "Any research experience or publications so far?",
         "options": ["Yes, published/ongoing research", "Some project-level research experience", "None yet"]},
        {"id": "geographic_flexibility", "type": "single_select", "question": "Open to relocating (including abroad) for the right opportunity?",
         "options": ["Yes, anywhere", "Within India only", "Prefer to stay local"]},
    ],
    "job_switcher": [
        {"id": "current_job_title", "type": "text", "question": "What is your current job title / role?",
         "placeholder": "Examples: Software Engineer, Data Analyst, Project Manager, Teacher"},
        {"id": "current_specialization", "type": "text", "question": "What subject, specialization, or domain do you work in?",
         "placeholder": "Examples: Computer Science teaching, English language training, retail banking, backend APIs"},
        {"id": "seniority_level", "type": "single_select", "question": "What is your current seniority level?",
         "options": ["Entry-level", "Individual contributor", "Senior specialist", "Team lead", "Manager", "Head / director", "Not sure"]},
        {"id": "years_experience", "type": "single_select", "question": "How many years of professional experience do you have?",
         "options": ["Less than 1 year", "1-3 years", "3-5 years", "5-8 years", "8-12 years", "12+ years"]},
        {"id": "current_industry", "type": "single_select", "question": "Which industry or business domain do you currently work in?",
         "options": ["Information Technology", "Banking & Financial Services", "Healthcare", "Manufacturing",
                     "Education", "Retail", "Telecommunications", "Automotive", "E-commerce",
                     "Government", "Media & Entertainment", "Consulting", "Other"]},
        {"id": "current_responsibilities", "type": "multi_select", "question": "What are your main responsibilities in your current role?",
         "options": ["Software development", "Data analysis", "Project management", "Team management",
                     "Client communication", "Sales", "Testing", "Research", "Operations",
                     "Reporting", "Design", "Technical support", "Documentation", "Other"]},
        {"id": "current_responsibilities_free_text", "type": "textarea", "question": "Optional: describe your responsibilities in your own words.",
         "placeholder": "e.g. Built backend APIs, managed SQL data pipelines, coordinated cross-functional delivery."},
        {"id": "current_skills", "type": "skill_select", "question": "What professional or technical skills do you currently use?",
         "options": ["Python", "Java", "JavaScript", "SQL", "Excel", "Power BI", "AWS", "Project Management",
                     "Communication", "Leadership", "Sales", "Data Analysis", "Research", "Testing", "API Development"]},
        {"id": "tools_used", "type": "text", "question": "Which tools, platforms, or software do you actually use?",
         "placeholder": "Examples: Excel, PowerPoint, Google Workspace, Moodle, Power BI, Salesforce, GitHub"},
        {"id": "highest_qualification", "type": "text", "question": "What is your highest qualification and specialization?",
         "placeholder": "Examples: B.A. English, B.Tech Computer Science, M.Com Finance"},
        {"id": "certifications", "type": "text", "question": "Which relevant certifications or additional training do you have? (Optional)",
         "placeholder": "Examples: B.Ed, AWS Cloud Practitioner, Google Data Analytics, none"},
        {"id": "skill_proficiency", "type": "textarea", "question": "How proficient are you in your selected skills?",
         "placeholder": "Example:\nPython — Advanced — 3 years\nSQL — Intermediate — 2 years\nAWS — Beginner — 6 months"},
        {"id": "major_achievements", "type": "textarea", "question": "What are your major achievements in your current career?",
         "placeholder": "Example: Automated monthly reports and reduced reporting time by 40%."},
        {"id": "major_projects", "type": "textarea", "question": "Have you worked on any major projects that demonstrate your skills? (Optional)",
         "placeholder": "Project title | short description | technologies/tools used | role | outcome"},
        {"id": "switch_reasons", "type": "multi_select", "question": "Why are you considering a career / role switch?",
         "options": ["Higher salary", "Career growth", "Lack of growth", "Want a new challenge",
                     "Interest in another field", "Better work-life balance", "Remote work", "Industry change",
                     "Job security", "Relocation", "Personal interest", "Other"]},
        {"id": "avoid_next_role", "type": "multi_select", "question": "What would you prefer to avoid in your next role?",
         "options": ["Heavy coding", "Night shifts", "Customer interaction", "Frequent travel",
                     "People management", "Sales pressure", "Routine work", "On-site work", "Other"]},
        {"id": "target_role_status", "type": "single_select", "question": "Do you already have a target role in mind?",
         "options": ["Yes", "No", "Not sure"]},
        {"id": "target_role", "type": "text", "question": "What role are you targeting?",
         "placeholder": "Example: Data Engineer"},
        {"id": "target_industries", "type": "multi_select", "question": "Which industries or domains are you interested in moving into?",
         "options": ["Information Technology", "Finance", "Healthcare", "Consulting", "Manufacturing",
                     "Education", "Retail", "E-commerce", "Marketing", "Operations", "Analytics", "Government", "Other"]},
        {"id": "work_preferences", "type": "multi_select", "question": "What kind of work would you prefer next?",
         "options": ["Training and facilitation", "Writing and content", "Analysis and problem solving", "Building technology",
                 "Research", "Managing people", "Client interaction", "Creative work", "Independent work", "Teaching" ]},
        {"id": "current_salary_range", "type": "single_select", "question": "What is your current salary range?",
         "options": ["Less than ₹3 LPA", "₹3-6 LPA", "₹6-10 LPA", "₹10-15 LPA", "₹15-25 LPA", "₹25 LPA+", "Prefer not to say"]},
        {"id": "target_salary_range", "type": "single_select", "question": "What salary range are you targeting?",
         "options": ["Less than ₹3 LPA", "₹3-6 LPA", "₹6-10 LPA", "₹10-15 LPA", "₹15-25 LPA", "₹25 LPA+", "No fixed target"]},
        {"id": "current_location", "type": "text", "question": "Where are you currently based?",
         "placeholder": "e.g. Bengaluru, Pune, Hyderabad"},
        {"id": "work_location_preference", "type": "single_select", "question": "Where are you willing to work?",
         "options": ["Current city only", "Specific cities", "Anywhere in India", "International", "Remote"]},
        {"id": "work_model_preference", "type": "single_select", "question": "What is your preferred work model?",
         "options": ["Remote", "Hybrid", "On-site", "No preference"]},
        {"id": "willing_to_relocate", "type": "single_select", "question": "Are you willing to relocate?",
         "options": ["Yes", "No", "Maybe"]},
        {"id": "weekly_learning_hours", "type": "single_select", "question": "How much time can you dedicate to learning each week?",
         "options": ["Less than 3 hours", "3-5 hours", "5-10 hours", "10-15 hours", "15+ hours"]},
        {"id": "transition_timeline", "type": "single_select", "question": "How soon would you ideally like to transition?",
         "options": ["Less than 1 month", "1-3 months", "3-6 months", "6-12 months", "12+ months"]},
        {"id": "willing_to_reskill", "type": "single_select", "question": "How willing are you to learn new skills or take a certification?",
         "options": ["Prefer to use my existing skills", "Open to short courses", "Open to substantial reskilling", "Open to another degree", "Not sure"]},
    ],
}


GROUP_CATALOGUE = {
    "class10": [
        {"group": "Science (PCM — Physics, Chemistry, Maths)",
         "useful_for": "Engineering, architecture, defence technical entries, pure sciences, aviation, data science/AI, actuarial science.",
         "signals": ["Engineering/Technology", "Defence/Armed forces", "Mathematics", "Science", "Computer/IT", "Solving logical/numeric problems", "Hands-on/practical building or fixing things"]},
        {"group": "Science (PCB — Physics, Chemistry, Biology)",
         "useful_for": "Medicine (MBBS/BDS/BAMS/BHMS), pharmacy, biotechnology, nursing, allied health sciences, agriculture sciences.",
         "signals": ["Medicine/Healthcare", "Science (Physics/Chemistry/Biology)", "Science", "Helping/working with people"]},
        {"group": "Science (PCMB — all four)",
         "useful_for": "Keeps BOTH engineering and medical entrance options open the longest, at the cost of a heavier subject load.",
         "signals": ["Engineering/Technology", "Medicine/Healthcare", "Mathematics", "Science"]},
        {"group": "Commerce (with Maths)",
         "useful_for": "B.Com, BBA, CA, CS, CFA, economics, actuarial science, business analytics.",
         "signals": ["Business/Commerce", "Mathematics", "Commerce basics", "Commerce", "Solving logical/numeric problems"]},
        {"group": "Commerce (without Maths)",
         "useful_for": "B.Com, BBA, CA/CS, banking, general business roles.",
         "signals": ["Business/Commerce", "Commerce basics", "Commerce"]},
        {"group": "Arts/Humanities",
         "useful_for": "Law (CLAT), civil services (UPSC), journalism/media, psychology, design, teaching, politics.",
         "signals": ["Government service (IAS/IPS/etc.)", "Law", "Design/Creative fields", "Teaching/Academics", "Social Science/History/Civics", "Social Science", "Languages/English", "Languages", "Reading, writing, debating ideas", "Creative/artistic expression", "Art/Craft", "Art"]},
        {"group": "Vocational/ITI",
         "useful_for": "Direct-entry skilled trades, fast route to employable skills and apprenticeships.",
         "signals": ["Skilled trade (electrician, mechanic, etc.)", "Hands-on/practical building or fixing things"]},
    ],
    "class12": [
        {"group": "Engineering (B.Tech/B.E.)", 
         "useful_for": "Software/IT, core engineering branches, R&D roles, higher studies (M.Tech/MS), entrepreneurship in tech.",
         "signals": ["Engineering (B.Tech/B.E.)", "JEE Main/Advanced", "Science (PCM)", "Science (PCMB)", "Mathematics", "Physics", "Computer Science/IT", "Logical problem solving & coding"]},
        {"group": "Medicine (MBBS/BDS/BAMS/BHMS)", 
         "useful_for": "Clinical practice, specialization via PG medical (MD/MS), research, public health.",
         "signals": ["Medicine (MBBS/BDS/BAMS)", "NEET", "Science (PCB)", "Science (PCMB)", "Biology", "Chemistry", "Healthcare & helping people"]},
        {"group": "Pure sciences (B.Sc)", 
         "useful_for": "Research (M.Sc→PhD), teaching, scientific roles, data science.",
         "signals": ["Pure sciences (B.Sc)", "Science (PCM)", "Science (PCB)", "Science (PCMB)", "Physics", "Chemistry", "Mathematics", "Biology", "Research & deep study"]},
        {"group": "Commerce (B.Com/BBA)", 
         "useful_for": "CA/CS/CMA, banking and finance, MBA, entrepreneurship, corporate roles.",
         "signals": ["Commerce (B.Com/BBA)", "CA Foundation", "Commerce (with Maths)", "Commerce (without Maths)", "Accountancy", "Economics", "Business Studies", "Business, finance & management"]},
        {"group": "Law (BA LLB / 5-year integrated)", 
         "useful_for": "Litigation, corporate law, judiciary, civil services, legal policy roles.",
         "signals": ["Law (BA LLB)", "CLAT", "Arts/Humanities", "Commerce (without Maths)", "History/Political Science", "Languages", "Public service & administration", "Reading, writing, debating ideas"]},
        {"group": "Design/Architecture", 
         "useful_for": "UI/UX, product design, architecture practice, fashion/graphic design.",
         "signals": ["Design/Architecture", "Design entrances (NID/NIFT/UCEED)", "Creative design & arts"]},
        {"group": "Arts/Humanities (BA)", 
         "useful_for": "Civil services, journalism, psychology, social work, teaching, public policy.",
         "signals": ["Arts/Humanities (BA)", "CUET", "Arts/Humanities", "History/Political Science", "Languages", "Public service & administration", "Research & deep study"]},
        {"group": "Defence entry (NDA)", 
         "useful_for": "Army/Navy/Air Force officer entry.",
         "signals": ["Defence entry (NDA/CDS)", "NDA", "Science (PCM)"]},
    ],
    "ug": [
        {"group": "Placement/direct job", "useful_for": "Immediate income and industry experience.", "signals": ["Placement/job immediately"]},
        {"group": "Higher studies (M.Tech/MBA/MS/MA)", "useful_for": "Specialization, higher entry-level pay.", "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"]},
        {"group": "Competitive government exams", "useful_for": "Civil services (IAS/IPS/IFS), banking, defence civil posts.", "signals": ["Competitive government exams (UPSC/banking/SSC)"]},
        {"group": "Research/PhD", "useful_for": "Academic/research careers.", "signals": ["Research/PhD"]},
        {"group": "Entrepreneurship/startup", "useful_for": "Building something of your own.", "signals": ["Entrepreneurship/startup"]},
    ],
    "pg": [
        {"group": "PhD/research", "useful_for": "Academia, national research labs.", "signals": ["PhD/research", "Yes, published/ongoing research"]},
        {"group": "Industry job in specialization", "useful_for": "Applying the specialization directly.", "signals": ["Industry job in specialization"]},
        {"group": "Academia/teaching", "useful_for": "College/university faculty roles.", "signals": ["Academia/teaching"]},
        {"group": "Public sector/government role", "useful_for": "PG-level entries into scientist posts.", "signals": ["Public sector/government role"]},
        {"group": "Entrepreneurship", "useful_for": "Deep specialization + PG-level network.", "signals": ["Entrepreneurship"]},
    ],
    "job_switcher": [
        {"group": "Lateral move within same industry", "useful_for": "Lowest-friction switch.", "signals": ["Better growth/pay", "Work-life balance"]},
        {"group": "Full domain switch", "useful_for": "Bigger reskilling investment.", "signals": ["Personal interest/passion"]},
        {"group": "Further formal study (MBA/M.Tech/M.S.)", "useful_for": "Best when target field has degree-gate.", "signals": ["20+ hrs/week (full-time reskilling)"]},
        {"group": "Entrepreneurship", "useful_for": "Uses existing credibility/network.", "signals": []},
    ],
}


# ==============================================================================
# CLASS 10 3-PHASE ADAPTIVE QUESTIONNAIRE SPECIFICATION
# ==============================================================================
CLASS10_DOMAINS = [
    "math_logical",
    "life_sciences",
    "humanities_social",
    "business_commerce",
    "creative_visual",
    "practical_applied",
]

CLASS10_DOMAIN_LABELS = {
    "math_logical": "Math & Logical Reasoning",
    "life_sciences": "Life Sciences & Healthcare",
    "humanities_social": "Humanities, Law & Social Systems",
    "business_commerce": "Business, Commerce & Finance",
    "creative_visual": "Creative, Design & Visual Arts",
    "practical_applied": "Practical & Applied Technical",
    # Uppercase standard keys
    "MATH_LOGICAL": "Math & Logical Reasoning",
    "LIFE_SCIENCES_CARE": "Life Sciences & Healthcare",
    "HUMANITIES_SOCIAL": "Humanities, Law & Social Systems",
    "BUSINESS_COMMERCE": "Business, Commerce & Finance",
    "CREATIVE_VISUAL": "Creative, Design & Visual Arts",
    "PRACTICAL_APPLIED": "Practical & Applied Technical",
}

CLASS10_DOMAIN_STREAM_MAP = {
    "math_logical": "Science (PCM — Physics, Chemistry, Maths)",
    "life_sciences": "Science (PCB — Physics, Chemistry, Biology)",
    "business_commerce": "Commerce (with Maths)",
    "humanities_social": "Arts/Humanities",
    "creative_visual": "Arts/Humanities",
    "practical_applied": "Vocational/ITI",
    # Uppercase standard keys
    "MATH_LOGICAL": "Science (PCM — Physics, Chemistry, Maths)",
    "LIFE_SCIENCES_CARE": "Science (PCB — Physics, Chemistry, Biology)",
    "BUSINESS_COMMERCE": "Commerce (with Maths)",
    "HUMANITIES_SOCIAL": "Arts/Humanities",
    "CREATIVE_VISUAL": "Arts/Humanities",
    "PRACTICAL_APPLIED": "Vocational/ITI",
}

UPPER_TO_LOWER_DOMAIN = {
    "MATH_LOGICAL": "math_logical",
    "LIFE_SCIENCES_CARE": "life_sciences",
    "HUMANITIES_SOCIAL": "humanities_social",
    "BUSINESS_COMMERCE": "business_commerce",
    "CREATIVE_VISUAL": "creative_visual",
    "PRACTICAL_APPLIED": "practical_applied",
}

LOWER_TO_UPPER_DOMAIN = {
    "math_logical": "MATH_LOGICAL",
    "life_sciences": "LIFE_SCIENCES_CARE",
    "life_sciences_care": "LIFE_SCIENCES_CARE",
    "humanities_social": "HUMANITIES_SOCIAL",
    "business_commerce": "BUSINESS_COMMERCE",
    "creative_visual": "CREATIVE_VISUAL",
    "practical_applied": "PRACTICAL_APPLIED",
}

LEGACY_QUESTION_MAP = {
    "c10_q1_saturday": "u1",
    "c10_q2_classroom": "u2",
    "c10_q3_project_role": "u3",
    "c10_q4_article_click": "u4",
    "c10_q5_confidence": "u5",
}
REVERSE_LEGACY_MAP = {v: k for k, v in LEGACY_QUESTION_MAP.items()}

ADAPTIVE_QUESTION_PREFIXES = (
    "c10_", "u1", "u2", "u3", "u4", "u5",
    "ml_", "ls_", "bc_", "cr_", "hu_", "pa_",
    "cc_", "tb_",
)

# Phase 1: Universal Orientation (asked to everyone in fixed order)
CLASS10_PHASE1_QUESTIONS = [
    {
        "id": "c10_q1_saturday",
        "phase": 1,
        "type": "single_select",
        "question": "How would you rather spend a free Saturday?",
        "options": [
            "Building, assembling, or fixing something physical",
            "Reading about how businesses or people make money",
            "Watching a documentary about space, medicine, or how the body works",
            "Sketching, editing videos, or designing something",
            "Debating a current event or reading about history/society",
            "Solving puzzles, coding, or playing strategy games",
        ],
        "option_weights": {
            "Building, assembling, or fixing something physical": {"practical_applied": 2.0, "math_logical": 0.8},
            "Reading about how businesses or people make money": {"business_commerce": 2.0},
            "Watching a documentary about space, medicine, or how the body works": {"life_sciences": 1.8, "math_logical": 0.8},
            "Sketching, editing videos, or designing something": {"creative_visual": 2.0},
            "Debating a current event or reading about history/society": {"humanities_social": 2.0},
            "Solving puzzles, coding, or playing strategy games": {"math_logical": 2.0},
        },
    },
    {
        "id": "c10_q2_classroom",
        "phase": 1,
        "type": "single_select",
        "question": "In class, which feeling do you enjoy most?",
        "options": [
            "The moment a math problem finally clicks",
            "Learning why something works biologically (why medicine helps, how the body heals)",
            "Discussing why something happened in history or society",
            "Understanding how money, trade, or a business decision works",
            "Making something look or sound better (art, presentation, design)",
        ],
        "option_weights": {
            "The moment a math problem finally clicks": {"math_logical": 2.0},
            "Learning why something works biologically (why medicine helps, how the body heals)": {"life_sciences": 2.0},
            "Discussing why something happened in history or society": {"humanities_social": 2.0},
            "Understanding how money, trade, or a business decision works": {"business_commerce": 2.0},
            "Making something look or sound better (art, presentation, design)": {"creative_visual": 2.0},
        },
    },
    {
        "id": "c10_q3_project_role",
        "phase": 1,
        "type": "single_select",
        "question": "If you had to lead a school project, which role would you want?",
        "options": [
            "The one figuring out the numbers/budget",
            "The one designing how it looks/feels",
            "The one researching and writing the content",
            "The one building/testing the actual thing",
            "The one explaining the health/science angle if relevant",
        ],
        "option_weights": {
            "The one figuring out the numbers/budget": {"business_commerce": 1.8, "math_logical": 0.8},
            "The one designing how it looks/feels": {"creative_visual": 2.0},
            "The one researching and writing the content": {"humanities_social": 2.0},
            "The one building/testing the actual thing": {"practical_applied": 1.8, "math_logical": 0.8},
            "The one explaining the health/science angle if relevant": {"life_sciences": 2.0},
        },
    },
    {
        "id": "c10_q4_article_click",
        "phase": 1,
        "type": "single_select",
        "question": "Which of these topics would you click on first?",
        "options": [
            '"How AI is changing jobs"',
            '"Why the stock market crashed"',
            '"New treatment discovered for a disease"',
            '"The history behind a major conflict"',
            '"How a famous building/product was designed"',
        ],
        "option_weights": {
            '"How AI is changing jobs"': {"math_logical": 2.0},
            '"Why the stock market crashed"': {"business_commerce": 2.0},
            '"New treatment discovered for a disease"': {"life_sciences": 2.0},
            '"The history behind a major conflict"': {"humanities_social": 2.0},
            '"How a famous building/product was designed"': {"creative_visual": 1.6, "practical_applied": 0.8},
        },
    },
    {
        "id": "c10_q5_confidence",
        "phase": 1,
        "type": "single_select",
        "question": "Self-rated confidence check: which subject do you feel most confident in right now?",
        "options": [
            "Math",
            "Science (Biology-heavy)",
            "Social Science/History/Civics",
            "None strongly / it varies",
        ],
        "option_weights": {
            "Math": {"math_logical": 2.0},
            "Science (Biology-heavy)": {"life_sciences": 2.0},
            "Social Science/History/Civics": {"humanities_social": 2.0},
            "None strongly / it varies": {},
        },
        "flags": {
            "Math": {"math_confident": True},
            "Science (Biology-heavy)": {"bio_confident": True},
            "Social Science/History/Civics": {"social_confident": True},
            "None strongly / it varies": {"flat_confidence": True},
        },
    },
]

# Phase 2: Narrowing, keyed by domain pair
CLASS10_PHASE2_PAIR_QUESTIONS = {
    ("business_commerce", "math_logical"): [
        {
            "id": "c10_p2_mb_1",
            "question": "Would you rather solve an equation with one correct answer, or figure out a real-world tradeoff with no single correct answer?",
            "options": [
                "Solve an equation with one clear, correct answer",
                "Figure out a real-world tradeoff with no single correct answer",
            ],
            "option_weights": {
                "Solve an equation with one clear, correct answer": {"math_logical": 2.0},
                "Figure out a real-world tradeoff with no single correct answer": {"business_commerce": 2.0},
            },
        },
        {
            "id": "c10_p2_mb_2",
            "question": "If both fascinate you: are you more curious about why a formula works, or what it's worth in the real world (pricing, profit, growth)?",
            "options": [
                "Why a formula works and how it is proven mathematically",
                "What it's worth in the real world (pricing, profit, growth)",
            ],
            "option_weights": {
                "Why a formula works and how it is proven mathematically": {"math_logical": 2.0},
                "What it's worth in the real world (pricing, profit, growth)": {"business_commerce": 2.0},
            },
        },
        {
            "id": "c10_p2_mb_3",
            "question": "Would you enjoy a stock market simulation game or a coding/robotics competition more?",
            "options": [
                "A coding, algorithm, or robotics competition",
                "A stock market or business simulation game",
            ],
            "option_weights": {
                "A coding, algorithm, or robotics competition": {"math_logical": 2.0},
                "A stock market or business simulation game": {"business_commerce": 2.0},
            },
        },
        {
            "id": "c10_p2_mb_4",
            "question": 'When you imagine yourself at 25, are you closer to "working on a technical product" or "running/growing a business"?',
            "options": [
                "Working on a technical product, software, or engineering system",
                "Running, marketing, or growing a business or enterprise",
            ],
            "option_weights": {
                "Working on a technical product, software, or engineering system": {"math_logical": 2.0},
                "Running, marketing, or growing a business or enterprise": {"business_commerce": 2.0},
            },
        },
    ],
    ("life_sciences", "math_logical"): [
        {
            "id": "c10_p2_ml_1",
            "question": "Are you more drawn to how machines/systems work, or how living things work?",
            "options": [
                "How machines, computers, and physical systems work",
                "How living organisms, human physiology, and biology work",
            ],
            "option_weights": {
                "How machines, computers, and physical systems work": {"math_logical": 2.0},
                "How living organisms, human physiology, and biology work": {"life_sciences": 2.0},
            },
        },
        {
            "id": "c10_p2_ml_2",
            "question": "Would you rather build something that solves a problem, or understand/treat something that's broken (in a body, ecosystem)?",
            "options": [
                "Build a device, app, or tool that solves a practical problem",
                "Understand, diagnose, or treat illness in a body or ecosystem",
            ],
            "option_weights": {
                "Build a device, app, or tool that solves a practical problem": {"math_logical": 2.0},
                "Understand, diagnose, or treat illness in a body or ecosystem": {"life_sciences": 2.0},
            },
        },
        {
            "id": "c10_p2_ml_3",
            "question": "Does the idea of a lab focused on chemicals/physics excite you more, or a lab focused on biology/medicine?",
            "options": [
                "A lab focused on physics, circuits, chemical synthesis, or coding",
                "A lab focused on biology, genetics, microorganisms, or medicine",
            ],
            "option_weights": {
                "A lab focused on physics, circuits, chemical synthesis, or coding": {"math_logical": 2.0},
                "A lab focused on biology, genetics, microorganisms, or medicine": {"life_sciences": 2.0},
            },
        },
        {
            "id": "c10_p2_ml_4",
            "question": "If a family member were ill, are you more interested in how the treatment was engineered or how the treatment works in the body?",
            "options": [
                "How the treatment or diagnostic equipment was engineered",
                "How the treatment interacts with cells and works in the human body",
            ],
            "option_weights": {
                "How the treatment or diagnostic equipment was engineered": {"math_logical": 2.0},
                "How the treatment interacts with cells and works in the human body": {"life_sciences": 2.0},
            },
        },
    ],
    ("math_logical", "practical_applied"): [
        {
            "id": "c10_p2_mp_1",
            "question": "Do you prefer understanding a concept deeply on paper, or actually building/testing a working version of it?",
            "options": [
                "Understanding the concept deeply on paper and in theory",
                "Actually building, assembling, and testing a working physical version",
            ],
            "option_weights": {
                "Understanding the concept deeply on paper and in theory": {"math_logical": 2.0},
                "Actually building, assembling, and testing a working physical version": {"practical_applied": 2.0},
            },
        },
        {
            "id": "c10_p2_mp_2",
            "question": "Would you rather win a math/physics olympiad, or win a robotics/making competition?",
            "options": [
                "Win a math, physics, or algorithmic olympiad",
                "Win a robotics, fabrication, or maker competition",
            ],
            "option_weights": {
                "Win a math, physics, or algorithmic olympiad": {"math_logical": 2.0},
                "Win a robotics, fabrication, or maker competition": {"practical_applied": 2.0},
            },
        },
        {
            "id": "c10_p2_mp_3",
            "question": "When you're stuck on a problem, do you like reasoning it out theoretically, or trying things hands-on until something works?",
            "options": [
                "Reasoning it out theoretically and logically",
                "Trying things hands-on iteratively until something works",
            ],
            "option_weights": {
                "Reasoning it out theoretically and logically": {"math_logical": 2.0},
                "Trying things hands-on iteratively until something works": {"practical_applied": 2.0},
            },
        },
    ],
    ("business_commerce", "humanities_social"): [
        {
            "id": "c10_p2_bh_1",
            "question": "Are you more interested in how a company is run, or in how society/government/culture works?",
            "options": [
                "How a company is run, markets operate, and revenues are generated",
                "How society, government policies, laws, and culture work",
            ],
            "option_weights": {
                "How a company is run, markets operate, and revenues are generated": {"business_commerce": 2.0},
                "How society, government policies, laws, and culture work": {"humanities_social": 2.0},
            },
        },
        {
            "id": "c10_p2_bh_2",
            "question": "Would you rather read about a company's rise and fall, or a political/historical movement?",
            "options": [
                "A company's rise and fall, corporate deals, or financial markets",
                "A political movement, landmark court case, or historical revolution",
            ],
            "option_weights": {
                "A company's rise and fall, corporate deals, or financial markets": {"business_commerce": 2.0},
                "A political movement, landmark court case, or historical revolution": {"humanities_social": 2.0},
            },
        },
        {
            "id": "c10_p2_bh_3",
            "question": "Do you see yourself more in a corporate/business setting, or in law, public policy, journalism, or social work?",
            "options": [
                "In a corporate, financial, consulting, or business setting",
                "In law, public policy, civil services, journalism, or social advocacy",
            ],
            "option_weights": {
                "In a corporate, financial, consulting, or business setting": {"business_commerce": 2.0},
                "In law, public policy, civil services, journalism, or social advocacy": {"humanities_social": 2.0},
            },
        },
    ],
    ("life_sciences", "practical_applied"): [
        {
            "id": "c10_p2_lp_1",
            "question": "Are you more drawn to research/understanding disease, or to hands-on patient care and practical medical skills?",
            "options": [
                "Deep research into pathology, pharmacology, and disease mechanisms",
                "Hands-on patient care, nursing, paramedical work, and practical skills",
            ],
            "option_weights": {
                "Deep research into pathology, pharmacology, and disease mechanisms": {"life_sciences": 2.0},
                "Hands-on patient care, nursing, paramedical work, and practical skills": {"practical_applied": 2.0},
            },
        },
        {
            "id": "c10_p2_lp_2",
            "question": "Would a longer path (medicine/research, many years of study) bother you, or are you looking for a quicker path into hands-on healthcare work?",
            "options": [
                "A long rigorous academic path (MBBS/research 5–8+ years) is rewarding to me",
                "I prefer a quicker 2–3 year vocational or diploma path into hands-on healthcare",
            ],
            "option_weights": {
                "A long rigorous academic path (MBBS/research 5–8+ years) is rewarding to me": {"life_sciences": 2.0},
                "I prefer a quicker 2–3 year vocational or diploma path into hands-on healthcare": {"practical_applied": 2.0},
            },
        },
    ],
    ("creative_visual", "humanities_social"): [
        {
            "id": "c10_p2_ch_1",
            "question": "Would you rather express an idea visually (design, film, art) or express it in writing/speech (essays, debate, journalism)?",
            "options": [
                "Visually through design, illustration, film, or artistic media",
                "In writing or speech through essays, debates, journalism, or policy papers",
            ],
            "option_weights": {
                "Visually through design, illustration, film, or artistic media": {"creative_visual": 2.0},
                "In writing or speech through essays, debates, journalism, or policy papers": {"humanities_social": 2.0},
            },
        },
        {
            "id": "c10_p2_ch_2",
            "question": "Are you more interested in how something looks and feels, or in what it means and why it matters?",
            "options": [
                "How something looks, feels, and its aesthetic user experience",
                "What something means historically, ethically, and why it matters to society",
            ],
            "option_weights": {
                "How something looks, feels, and its aesthetic user experience": {"creative_visual": 2.0},
                "What something means historically, ethically, and why it matters to society": {"humanities_social": 2.0},
            },
        },
        {
            "id": "c10_p2_ch_3",
            "question": "Could you see yourself in a design portfolio review, or a moot court/debate competition?",
            "options": [
                "Presenting a portfolio in a creative design or architecture review",
                "Arguing in a moot court trial or parliamentary debate competition",
            ],
            "option_weights": {
                "Presenting a portfolio in a creative design or architecture review": {"creative_visual": 2.0},
                "Arguing in a moot court trial or parliamentary debate competition": {"humanities_social": 2.0},
            },
        },
    ],
    ("creative_visual", "math_logical"): [
        {
            "id": "c10_p2_cm_1",
            "question": "When exploring a digital product or building, do you focus more on visual aesthetics & usability or underlying code & engineering?",
            "options": [
                "Visual styling, ergonomics, typography, and aesthetic experience",
                "Underlying code logic, algorithms, and technical engineering calculations",
            ],
            "option_weights": {
                "Visual styling, ergonomics, typography, and aesthetic experience": {"creative_visual": 2.0},
                "Underlying code logic, algorithms, and technical engineering calculations": {"math_logical": 2.0},
            },
        },
    ],
    ("business_commerce", "creative_visual"): [
        {
            "id": "c10_p2_bc_1",
            "question": "In launching a product, would you be more excited to create the visual branding & design, or manage the pricing & revenue model?",
            "options": [
                "Creating the visual identity, brand aesthetics, and user interface",
                "Structuring pricing, unit economics, market expansion, and revenue",
            ],
            "option_weights": {
                "Creating the visual identity, brand aesthetics, and user interface": {"creative_visual": 2.0},
                "Structuring pricing, unit economics, market expansion, and revenue": {"business_commerce": 2.0},
            },
        },
    ],
    ("humanities_social", "math_logical"): [
        {
            "id": "c10_p2_hm_1",
            "question": "Would you rather evaluate a national issue through data calculations and mathematical models, or through historical precedents and constitutional law?",
            "options": [
                "Mathematical models, statistics, and quantitative data",
                "Historical precedents, legal philosophy, and ethical reasoning",
            ],
            "option_weights": {
                "Mathematical models, statistics, and quantitative data": {"math_logical": 2.0},
                "Historical precedents, legal philosophy, and ethical reasoning": {"humanities_social": 2.0},
            },
        },
    ],
    ("humanities_social", "life_sciences"): [
        {
            "id": "c10_p2_hl_1",
            "question": "Are you more drawn to clinical and laboratory biology, or to social policy, human behavior, and public healthcare ethics?",
            "options": [
                "Clinical pathology, human anatomy, and laboratory biology",
                "Public policy, social healthcare access, and bioethics",
            ],
            "option_weights": {
                "Clinical pathology, human anatomy, and laboratory biology": {"life_sciences": 2.0},
                "Public policy, social healthcare access, and bioethics": {"humanities_social": 2.0},
            },
        },
    ],
    ("business_commerce", "life_sciences"): [
        {
            "id": "c10_p2_bl_1",
            "question": "Would you rather manage healthcare organizations and biotech commercial ventures, or conduct clinical treatments directly?",
            "options": [
                "Healthcare management, hospital operations, and pharmaceutical business",
                "Direct clinical diagnosis, patient treatment, and medical research",
            ],
            "option_weights": {
                "Healthcare management, hospital operations, and pharmaceutical business": {"business_commerce": 2.0},
                "Direct clinical diagnosis, patient treatment, and medical research": {"life_sciences": 2.0},
            },
        },
    ],
    ("business_commerce", "practical_applied"): [
        {
            "id": "c10_p2_bp_1",
            "question": "Would you rather manage financial budgets and team operations, or work hands-on repairing equipment and building installations?",
            "options": [
                "Managing financial budgets, sales, and business operations",
                "Working hands-on building, wiring, or repairing technical systems",
            ],
            "option_weights": {
                "Managing financial budgets, sales, and business operations": {"business_commerce": 2.0},
                "Working hands-on building, wiring, or repairing technical systems": {"practical_applied": 2.0},
            },
        },
    ],
    ("creative_visual", "practical_applied"): [
        {
            "id": "c10_p2_cp_1",
            "question": "Do you enjoy sketching and conceiving the visual concept more, or using physical tools and machinery to manufacture the final product?",
            "options": [
                "Sketching, 3D modeling, and conceiving the visual aesthetic",
                "Using physical tools, machines, and materials to build the physical object",
            ],
            "option_weights": {
                "Sketching, 3D modeling, and conceiving the visual aesthetic": {"creative_visual": 2.0},
                "Using physical tools, machines, and materials to build the physical object": {"practical_applied": 2.0},
            },
        },
    ],
    ("humanities_social", "practical_applied"): [
        {
            "id": "c10_p2_hp_1",
            "question": "Would you prefer a career centered on research, debate, and writing policies, or working with physical equipment and craftsmanship?",
            "options": [
                "Researching, writing, legal advocacy, and debating ideas",
                "Hands-on mechanical, electronic, or artisanal craftsmanship",
            ],
            "option_weights": {
                "Researching, writing, legal advocacy, and debating ideas": {"humanities_social": 2.0},
                "Hands-on mechanical, electronic, or artisanal craftsmanship": {"practical_applied": 2.0},
            },
        },
    ],
    ("practical_applied", "lone_leader"): [
        {
            "id": "c10_p2_pv_1",
            "question": "Do you already have a specific hands-on skill or trade you enjoy (electronics, mechanics, culinary, technical crafts)?",
            "options": [
                "Yes, I actively practice an applied skill or trade craft",
                "No, I just generally like doing practical things rather than reading textbooks",
            ],
            "option_weights": {
                "Yes, I actively practice an applied skill or trade craft": {"practical_applied": 2.5},
                "No, I just generally like doing practical things rather than reading textbooks": {"practical_applied": 1.0},
            },
        },
        {
            "id": "c10_p2_pv_2",
            "question": "Would you rather start working with practical skills sooner, even if it means a shorter formal-education path?",
            "options": [
                "Yes, I value starting hands-on industry work and apprenticeships sooner",
                "No, I want to keep the option open for full 3–4 year university degree programs",
            ],
            "option_weights": {
                "Yes, I value starting hands-on industry work and apprenticeships sooner": {"practical_applied": 2.0},
                "No, I want to keep the option open for full 3–4 year university degree programs": {"practical_applied": -0.5},
            },
        },
    ],
}

# Phase 3: Verification Questions (triggered by pattern)
CLASS10_PHASE3_VERIFICATION_QUESTIONS = {
    "math_confidence_gap": {
        "id": "c10_v_math_confidence",
        "phase": 3,
        "type": "single_select",
        "pattern": "strong_math_low_confidence",
        "question": "You've shown a lot of interest in logic and problem-solving, but rated your confidence in Math lower. Which feels more true: you enjoy math but don't feel confident yet, or you enjoy the idea of these fields more than actual math coursework?",
        "options": [
            "Enjoy it, just not confident yet",
            "I like the idea more than the coursework",
        ],
        "resolutions": {
            "Enjoy it, just not confident yet": {
                "flag": "confidence_gap_not_aptitude",
                "insight": "Confidence gap, not aptitude gap: You enjoy logical problem solving but lack confidence in current school marks. We recommend a low-stakes diagnostic mini-challenge.",
                "multiplier": 1.0,
            },
            "I like the idea more than the coursework": {
                "flag": "interest_concept_over_math_rigor",
                "insight": "Concept appeal over math coursework: Downweighted pure math stream; emphasized applied tech or business options.",
                "multiplier": 0.7,
            },
        },
    },
    "medical_goal_mismatch": {
        "id": "c10_v_medical_mismatch",
        "phase": 3,
        "type": "single_select",
        "pattern": "stated_doctor_low_bio",
        "question": "You mentioned wanting to become a doctor. Do you also enjoy biology and science topics day-to-day, or is this more about the idea of the profession (respect, stability, helping people)?",
        "options": [
            "Enjoy the subject too",
            "More about the profession's appeal",
        ],
        "resolutions": {
            "Enjoy the subject too": {
                "flag": "genuine_bio_interest_confirmed",
                "insight": "Confirmed genuine day-to-day biology engagement for clinical healthcare.",
                "boost": {"life_sciences": 2.0},
            },
            "More about the profession's appeal": {
                "flag": "goal_interest_mismatch_medicine",
                "insight": "Goal vs interest mismatch: Drawn to respect and service rather than daily bio-study. Exploring healthcare management or psychology.",
                "boost": {},
            },
        },
    },
    "flat_profile": {
        "id": "c10_v_flat_profile",
        "phase": 3,
        "type": "single_select",
        "pattern": "vague_flat_profile",
        "question": "It seems like a few different areas interest you fairly equally — which of these would you be most disappointed to not explore at all: technology, business, healthcare, arts, or social sciences?",
        "options": [
            "Technology & Computing",
            "Business & Commerce",
            "Healthcare & Biology",
            "Arts & Visual Design",
            "Social Sciences, Law & Society",
        ],
        "resolutions": {
            "Technology & Computing": {"domain": "math_logical", "boost": 1.5},
            "Business & Commerce": {"domain": "business_commerce", "boost": 1.5},
            "Healthcare & Biology": {"domain": "life_sciences", "boost": 1.5},
            "Arts & Visual Design": {"domain": "creative_visual", "boost": 1.5},
            "Social Sciences, Law & Society": {"domain": "humanities_social", "boost": 1.5},
        },
    },
}

def get_class10_tiebreaker_question(domain_a: str, domain_b: str) -> dict:
    pair = tuple(sorted([domain_a, domain_b]))
    scenarios = {
        ("business_commerce", "math_logical"): (
            "You have one free elective period today — do you join the algorithmic coding club or the business simulation club?",
            "The algorithmic coding & problem-solving club",
            "math_logical",
            "The business, trade & investment simulation club",
            "business_commerce",
        ),
        ("life_sciences", "math_logical"): (
            "You are invited to shadow a researcher for a day — do you visit an aerospace/computing lab or a biomedical genetics lab?",
            "The aerospace, robotics & computing lab",
            "math_logical",
            "The biomedical, genetics & health science lab",
            "life_sciences",
        ),
        ("math_logical", "practical_applied"): (
            "In a science lab, do you enjoy deriving the mathematical theory or building the physical test apparatus?",
            "Deriving the mathematical equations and theoretical proof",
            "math_logical",
            "Building and wiring the physical experimental apparatus",
            "practical_applied",
        ),
        ("business_commerce", "humanities_social"): (
            "Your school is launching a major initiative — do you lead the financial fundraising strategy or the debate and policy advocacy team?",
            "The financial budgeting, fundraising & revenue strategy",
            "business_commerce",
            "The debate, public advocacy & legal drafting committee",
            "humanities_social",
        ),
        ("creative_visual", "humanities_social"): (
            "Would you rather design the visual branding and campaign film, or write the investigative editorial and speech?",
            "Design the visual identity, poster typography, and campaign film",
            "creative_visual",
            "Write the investigative editorial, policy essay, and public speech",
            "humanities_social",
        ),
    }

    if pair in scenarios:
        q_text, opt_a, dom_a, opt_b, dom_b = scenarios[pair]
        return {
            "id": "c10_v_tiebreaker",
            "phase": 3,
            "type": "single_select",
            "pattern": "near_tie",
            "question": q_text,
            "options": [opt_a, opt_b],
            "option_weights": {
                opt_a: {dom_a: 2.0},
                opt_b: {dom_b: 2.0},
            },
        }

    label_a = CLASS10_DOMAIN_LABELS.get(domain_a, domain_a)
    label_b = CLASS10_DOMAIN_LABELS.get(domain_b, domain_b)
    opt_a = f"Focus on {label_a}"
    opt_b = f"Focus on {label_b}"
    return {
        "id": "c10_v_tiebreaker",
        "phase": 3,
        "type": "single_select",
        "pattern": "near_tie",
        "question": f"If you had to pick one hands-on project for the next semester, which direction pulls you more: {label_a} or {label_b}?",
        "options": [opt_a, opt_b],
        "option_weights": {
            opt_a: {domain_a: 2.0},
            opt_b: {domain_b: 2.0},
        },
    }

def derive_semantic_orientation(domain_scores: dict[str, float], flavor_tags: list[str] | None = None) -> dict:
    """
    Derives semantic orientation directly from domain scores and flavor tags.
    Returns:
    - primary_domain: str
    - secondary_domain: str
    - primary_label: str
    - secondary_label: str
    - gap: float
    - flavor_lean: str | None
    - profile_status: 'clear' | 'broad_exploratory' | 'unresolved_contradiction'
    - summary: str
    """
    norm_scores = {}
    for d in C10_ADAPTIVE_DOMAINS:
        val = domain_scores.get(d)
        if val is None:
            low = UPPER_TO_LOWER_DOMAIN.get(d, d.lower())
            val = domain_scores.get(low, 0.0)
        norm_scores[d] = float(val)

    ranked = sorted(C10_ADAPTIVE_DOMAINS, key=lambda d: norm_scores.get(d, 0.0), reverse=True)
    top1 = ranked[0]
    top2 = ranked[1]
    top3 = ranked[2]
    gap = norm_scores[top1] - norm_scores[top2]

    # Flavor lean evaluation
    flavor_lean = None
    tags = flavor_tags or []
    if top1 == "MATH_LOGICAL":
        if "computing" in tags:
            flavor_lean = "Computing & Systems Architecture"
        elif "engineering-applied" in tags:
            flavor_lean = "Applied Engineering & Physical Systems"
        elif "pure-theory" in tags:
            flavor_lean = "Pure Mathematics & Theoretical Physics"
    elif top1 == "LIFE_SCIENCES_CARE":
        if "engineering-applied" in tags:
            flavor_lean = "Biomedical Technology & Diagnostics"
        elif "pure-theory" in tags:
            flavor_lean = "Biological Research & Pathology"
    elif top1 == "BUSINESS_COMMERCE":
        if "computing" in tags:
            flavor_lean = "FinTech & Quantitative Commerce"
        elif "pure-theory" in tags:
            flavor_lean = "Economics & Financial Modeling"
        elif "engineering-applied" in tags:
            flavor_lean = "Commercial Operations & Venture Management"
    elif top1 == "CREATIVE_VISUAL":
        if "computing" in tags:
            flavor_lean = "Digital UI/UX & Interactive Media"
        elif "pure-theory" in tags:
            flavor_lean = "Visual Arts & Aesthetic Communication"
    elif top1 == "HUMANITIES_SOCIAL":
        if "pure-theory" in tags:
            flavor_lean = "Constitutional Law, History & Philosophy"
        elif "engineering-applied" in tags:
            flavor_lean = "Public Policy & Social Systems Administration"
    elif top1 == "PRACTICAL_APPLIED":
        if "computing" in tags:
            flavor_lean = "Hands-On Hardware & Systems Assembly"
        elif "engineering-applied" in tags:
            flavor_lean = "Applied Technical Trades & Workshop Prototyping"

    profile_status = "clear"
    if gap < 0.8 or (norm_scores[top1] - norm_scores[top3]) < 1.0 or norm_scores[top1] < 2.0:
        profile_status = "broad_exploratory"

    return {
        "primary_domain": top1,
        "secondary_domain": top2,
        "primary_label": CLASS10_DOMAIN_LABELS.get(top1, top1.replace("_", " ").title()),
        "secondary_label": CLASS10_DOMAIN_LABELS.get(top2, top2.replace("_", " ").title()),
        "scores": norm_scores,
        "gap": round(gap, 2),
        "flavor_lean": flavor_lean,
        "flavor_tags": tags,
        "profile_status": profile_status,
        "summary": (
            f"Your responses indicate strong orientation toward {CLASS10_DOMAIN_LABELS.get(top1, top1)}"
            + (f" with a specific lean toward {flavor_lean}." if flavor_lean else ".")
        ),
    }


def evaluate_class10_adaptive_state(answers: dict) -> dict:
    """
    Evaluates Class 10 adaptive questionnaire state using the QuestionnaireSession state machine.
    Replays answers deterministically and returns domain scores, next question, flags,
    verification insights, and completion status.
    """
    bank = QuestionBank()

    # If session already provided
    if isinstance(answers.get("__session__"), QuestionnaireSession):
        session = answers["__session__"]
    else:
        session = QuestionnaireSession(session_id="class10_adaptive")
        # Replay questions sequentially
        while True:
            q = select_next_question(session, bank)
            if not q or session.tier == "complete":
                break

            # Find answer value in answers dict
            ans_val = None
            if q.question_id in answers:
                ans_val = answers[q.question_id]
            else:
                # Check legacy aliases
                leg_id = REVERSE_LEGACY_MAP.get(q.question_id)
                if leg_id and leg_id in answers:
                    ans_val = answers[leg_id]
                else:
                    # Check pair aliases or case-insensitive matches
                    for k, v in answers.items():
                        if k.lower() == q.question_id.lower():
                            ans_val = v
                            break

            if ans_val is None or str(ans_val).strip() == "":
                break

            # Match option
            chosen_opt_id = None
            for opt in q.options:
                if (opt.option_id == ans_val or
                    opt.label.strip().lower() == str(ans_val).strip().lower() or
                    str(ans_val).strip().lower() in opt.label.strip().lower() or
                    opt.label.strip().lower() in str(ans_val).strip().lower()):
                    chosen_opt_id = opt.option_id
                    break

            if not chosen_opt_id and q.options:
                clean_ans = str(ans_val).strip().lower()
                for opt in q.options:
                    if opt.option_id.lower() == clean_ans or opt.option_id.split("_")[-1].lower() == clean_ans:
                        chosen_opt_id = opt.option_id
                        break

                if not chosen_opt_id:
                    # Semantic keyword fallback for legacy answer strings
                    if q.question_id == "u2":
                        if "math" in clean_ans: chosen_opt_id = "u2a"
                        elif any(w in clean_ans for w in ["bio", "medicine", "heal"]): chosen_opt_id = "u2b"
                        elif any(w in clean_ans for w in ["history", "society"]): chosen_opt_id = "u2c"
                        elif any(w in clean_ans for w in ["money", "trade", "business"]): chosen_opt_id = "u2d"
                        elif any(w in clean_ans for w in ["art", "design", "presentation"]): chosen_opt_id = "u2e"
                    elif q.question_id == "u3":
                        if any(w in clean_ans for w in ["budget", "pricing", "selling", "number"]): chosen_opt_id = "u3a"
                        elif any(w in clean_ans for w in ["design", "look", "feel"]): chosen_opt_id = "u3b"
                        elif any(w in clean_ans for w in ["research", "writing", "content"]): chosen_opt_id = "u3c"
                        elif any(w in clean_ans for w in ["building", "physical", "actual", "code", "structure"]): chosen_opt_id = "u3d"
                        elif any(w in clean_ans for w in ["health", "science"]): chosen_opt_id = "u3e"
                    elif q.question_id == "u4":
                        if any(w in clean_ans for w in ["algorithm", "ai", "changing jobs"]): chosen_opt_id = "u4a"
                        elif any(w in clean_ans for w in ["company", "stock", "market", "billion"]): chosen_opt_id = "u4b"
                        elif any(w in clean_ans for w in ["disease", "treatment"]): chosen_opt_id = "u4c"
                        elif any(w in clean_ans for w in ["conflict", "history"]): chosen_opt_id = "u4d"
                        elif any(w in clean_ans for w in ["building", "product", "designed"]): chosen_opt_id = "u4e"
                    elif q.question_id == "u5":
                        if "math" in clean_ans: chosen_opt_id = "u5a"
                        elif any(w in clean_ans for w in ["science", "bio"]): chosen_opt_id = "u5b"
                        elif any(w in clean_ans for w in ["social", "history", "civic"]): chosen_opt_id = "u5c"
                        elif any(w in clean_ans for w in ["none", "varies", "not"]): chosen_opt_id = "u5d"

            if chosen_opt_id:
                session = record_answer(session, q, chosen_opt_id, bank)
            else:
                break

    # Determine phase metadata
    if session.tier == "universal":
        current_phase = 1
        phase_title = "Phase 1: Universal Orientation"
    elif session.tier in ["narrowing", "cross_check"]:
        current_phase = 2
        phase_title = "Phase 2: Narrowing Contenders"
    elif session.tier == "verification":
        current_phase = 3
        phase_title = "Phase 3: Verification & Calibration"
    elif session.tier == "hidden_verification":
        current_phase = 4
        phase_title = "Phase 4: Alignment Check"
    else:
        current_phase = "completed"
        phase_title = "Assessment Completed"

    total_answered = len(session.answer_log)
    is_finished = session.tier == "complete"

    # Next question
    next_q = select_next_question(session, bank)
    if next_q and not is_finished:
        legacy_id = REVERSE_LEGACY_MAP.get(next_q.question_id, next_q.question_id)
        is_legacy = any(k.startswith("c10_") for k in answers.keys()) or len(answers) == 0
        qid_to_use = legacy_id if is_legacy else next_q.question_id

        next_q_dict = {
            "id": qid_to_use,
            "question_id": next_q.question_id,
            "phase": current_phase if isinstance(current_phase, int) else 3,
            "phase_title": phase_title,
            "type": "single_select",
            "question": next_q.prompt,
            "prompt": next_q.prompt,
            "options": [opt.label for opt in next_q.options],
            "structured_options": [opt.model_dump() for opt in next_q.options],
            "domain_pair": next_q.domain_pair,
            "tier": next_q.tier,
            "flavor_tags": next_q.flavor_tags,
            "step_number": total_answered + 1,
            "total_estimated": max(15, total_answered + 1),
        }
    else:
        next_q_dict = None
        is_finished = True
        current_phase = "completed"
        phase_title = "Assessment Completed"

    # Domain ranking & scores
    ranked_upper = sorted(C10_ADAPTIVE_DOMAINS, key=lambda d: session.domain_scores.get(d, 0.0), reverse=True)
    ranked_lower = [UPPER_TO_LOWER_DOMAIN.get(d, d.lower()) for d in ranked_upper]

    is_legacy = any(k.startswith("c10_") for k in answers.keys())
    ranked = ranked_lower if is_legacy else ranked_upper

    domain_scores_dual = {}
    for d in C10_ADAPTIVE_DOMAINS:
        score = session.domain_scores.get(d, 0.0)
        domain_scores_dual[d] = score
        low = UPPER_TO_LOWER_DOMAIN.get(d, d.lower())
        domain_scores_dual[low] = score
        if d == "LIFE_SCIENCES_CARE":
            domain_scores_dual["life_sciences_care"] = score

    # Check flags
    flags = {}
    u5_ans = next((a for a in session.answer_log if a.question_id == "u5"), None)
    if u5_ans:
        if u5_ans.option_id == "u5a":
            flags["math_confident"] = True
        elif u5_ans.option_id == "u5b":
            flags["bio_confident"] = True
        elif u5_ans.option_id == "u5c":
            flags["social_confident"] = True
        elif u5_ans.option_id == "u5d":
            flags["flat_confidence"] = True

    if session.domain_scores.get("MATH_LOGICAL", 0.0) >= 2.0 and not flags.get("math_confident", False):
        flags["math_confidence_gap"] = True

    stated_career_text = " ".join([str(v).lower() for k, v in answers.items() if "career" in k.lower() or "curiosity" in k.lower() or "goal" in k.lower()])
    has_doctor_goal = any(w in stated_career_text for w in ["doctor", "medicine", "mbbs", "healthcare"])
    if has_doctor_goal and session.domain_scores.get("LIFE_SCIENCES_CARE", 0.0) < 2.0:
        flags["medical_goal_mismatch"] = True

    if flags.get("flat_confidence", False) and (session.domain_scores[ranked_upper[0]] - session.domain_scores[ranked_upper[2]]) < 1.0:
        flags["flat_profile"] = True

    # Verification insights
    verification_insights = []
    if session.cross_verified_domains:
        for cvd in session.cross_verified_domains:
            lbl = CLASS10_DOMAIN_LABELS.get(cvd, cvd)
            verification_insights.append(f"Preference for {lbl} was consistently confirmed across real-world commitments.")
    if session.flagged_contradiction:
        verification_insights.append(session.flagged_contradiction.get("explanation", ""))

    formatted_answer_log = []
    for a in session.answer_log:
        formatted_answer_log.append({
            "question_id": a.question_id,
            "question": a.prompt or a.question_id,
            "selected_option": a.selected_label or a.option_id,
            "weights_applied": a.domain_weights_applied,
            "phase": 1 if a.tier == "universal" else (2 if a.tier in ["narrowing", "cross_check"] else 3),
            "tier": a.tier,
        })

    return {
        "stage": "class10",
        "domain_scores": domain_scores_dual,
        "ranked_domains": ranked,
        "leading_domains": ranked[:2],
        "current_phase": current_phase,
        "phase_title": phase_title,
        "total_answered": total_answered,
        "total_estimated": max(15, total_answered),
        "next_question": next_q_dict,
        "is_finished": is_finished,
        "answer_log": formatted_answer_log,
        "flags": flags,
        "verification_insights": verification_insights,
        "flagged_contradiction": session.flagged_contradiction,
        "profile_status": session.profile_status,
        "tier": session.tier,
        "__session__": session,
    }


CLASS10_OPTION_VALUE_CATALOGUE = {
    "Science (PCM — Physics, Chemistry, Maths)": {
        "direction_id": "science_pcm",
        "group": "Science (PCM — Physics, Chemistry, Maths)",
        "name": "Science + Mathematics (PCM)",
        "tagline": "A direction worth exploring if you enjoy mathematics, scientific problem solving, and technology-oriented subjects.",
        "subjects": ["Physics", "Chemistry", "Mathematics", "English", "Elective (Computer Science / PE / Economics)"],
        "keeps_open": [
            "Engineering (All branches)",
            "Computer Science & Software",
            "Data Science & AI",
            "Architecture (B.Arch)",
            "Pure & Applied Sciences",
            "Defence Technical Entries (NDA / Tech Entry)",
            "Commercial Aviation",
            "Actuarial Science & Quantitative Finance",
        ],
        "makes_easier": [
            "Transition into engineering and STEM degrees",
            "Preparation for technical entrance exams (JEE, State CETs)",
            "Foundational quantitative and mathematical problem solving",
        ],
        "constraints": [
            "Some medical and clinical health science pathways require Biology (NEET eligibility).",
            "Requires consistent dedication to mathematics problem solving and physical sciences.",
        ],
        "still_to_explore": [
            "How much you enjoy deeper scientific reasoning beyond school memorization",
            "Your comfort with sustained, multi-step mathematical problem solving",
        ],
        "career_families": [
            {
                "family": "Engineering & Technology",
                "examples": ["Software Engineer", "Robotics Specialist", "Aerospace Engineer", "Mechanical Engineer"],
            },
            {
                "family": "Computing & Data Systems",
                "examples": ["Data Scientist", "AI Engineer", "Cloud Systems Architect"],
            },
            {
                "family": "Pure Science & R&D",
                "examples": ["Research Physicist", "Materials Scientist", "Astrophysicist"],
            },
            {
                "family": "Built Environment & Defence",
                "examples": ["Architect", "Defence Technical Officer", "Commercial Pilot"],
            },
        ],
        "default_experiment_id": "tech_problem_solving",
        "experiment_title": "Technology & Problem Solving Exploration",
        "experiment_action": "Try the 5-minute Technology & Problem Solving challenge",
        "duration": "5 mins",
        "sources": ["CBSE Curriculum Framework", "AICTE Approval Process Handbook", "Joint Entrance Examination Board"],
        "last_verified": "2026-03-01",
    },
    "Science (PCB — Physics, Chemistry, Biology)": {
        "direction_id": "science_pcb",
        "group": "Science (PCB — Physics, Chemistry, Biology)",
        "name": "Science + Biology (PCB)",
        "tagline": "A direction worth exploring if you are curious about living systems, healthcare, medicine, and life sciences.",
        "subjects": ["Physics", "Chemistry", "Biology", "English", "Elective (Psychology / Biotechnology / PE)"],
        "keeps_open": [
            "Medicine (MBBS)",
            "Dental Surgery (BDS)",
            "Veterinary Science & Animal Husbandry",
            "Pharmacy & Pharmaceutical Sciences",
            "Biotechnology & Genetics",
            "Nursing & Allied Health Sciences",
            "Agricultural & Environmental Sciences",
            "Psychology & Cognitive Science",
        ],
        "makes_easier": [
            "Preparation for NEET and health sciences admissions",
            "Deep comprehension of human physiology, disease, and biological systems",
        ],
        "constraints": [
            "Most mainstream engineering and pure mathematics degrees require Class 12 Mathematics.",
            "Clinical medical routes require extensive long-term academic commitment (5.5+ years plus residency).",
        ],
        "still_to_explore": [
            "Your interest in clinical patient care versus laboratory and research science",
            "Your comfort with extensive biological terminology, diagrams, and memorization",
        ],
        "career_families": [
            {
                "family": "Clinical Healthcare & Medicine",
                "examples": ["Physician", "Surgeon", "Dentist", "Veterinarian"],
            },
            {
                "family": "Pharmaceutical & Life Sciences",
                "examples": ["Pharmacologist", "Biomedical Researcher", "Geneticist"],
            },
            {
                "family": "Allied Health & Therapy",
                "examples": ["Physiotherapist", "Clinical Psychologist", "Nutritionist"],
            },
        ],
        "default_experiment_id": "healthcare_reality",
        "experiment_title": "Healthcare Reality Exploration",
        "experiment_action": "Try the 5-minute Healthcare Reality challenge",
        "duration": "5 mins",
        "sources": ["National Medical Commission (NMC)", "Pharmacy Council of India", "Dental Council of India"],
        "last_verified": "2026-03-01",
    },
    "Science (PCMB — all four)": {
        "direction_id": "science_pcmb",
        "group": "Science (PCMB — all four)",
        "name": "Science + Mathematics & Biology (PCMB)",
        "tagline": "An intensive direction that keeps both technical engineering and medical/life science pathways open.",
        "subjects": ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
        "keeps_open": [
            "All Engineering disciplines (including Biomedical Engineering)",
            "All Medical, Dental, and Healthcare fields",
            "Bioinformatics & Computational Biology",
            "Data Science & AI in Healthcare",
            "Biotechnology & Genetic Engineering",
            "Pure Sciences (Physics, Chemistry, Maths, Biology)",
            "Architecture & Design",
        ],
        "makes_easier": [
            "Postponing the final fork between engineering and medicine until Class 12",
            "Entering interdisciplinary frontiers like Bio-AI, Neurotechnology, and Medical Devices",
        ],
        "constraints": [
            "Carries the heaviest academic and laboratory study load among all streams.",
            "Simultaneous preparation for both JEE and NEET entrance formats can cause severe cognitive strain.",
        ],
        "still_to_explore": [
            "Whether you genuinely need both subjects or would thrive better by specializing your effort",
            "Your stamina for balancing four heavy practical science and mathematics curricula",
        ],
        "career_families": [
            {
                "family": "Interdisciplinary Bio-Tech & Bio-AI",
                "examples": ["Biomedical Engineer", "Computational Biologist", "Medical Device Innovator"],
            },
            {
                "family": "Healthcare or Engineering",
                "examples": ["Doctor", "Software Engineer", "Health Data Scientist"],
            },
        ],
        "default_experiment_id": "scientific_reasoning",
        "experiment_title": "Interdisciplinary Science & Logic Exploration",
        "experiment_action": "Try the 5-minute Science & Logic challenge",
        "duration": "5 mins",
        "sources": ["CBSE Stream Guidelines", "IIT-JEE and NEET Eligibility Norms"],
        "last_verified": "2026-03-01",
    },
    "Commerce (with Maths)": {
        "direction_id": "commerce_maths",
        "group": "Commerce (with Maths)",
        "name": "Commerce + Mathematics",
        "tagline": "A direction worth exploring if you enjoy numbers, business decisions, and real-world financial systems.",
        "subjects": ["Accountancy", "Business Studies", "Economics", "Mathematics", "English"],
        "keeps_open": [
            "Finance & Investment Banking",
            "Chartered Accountancy (CA) & Audit",
            "Economics & Econometrics (B.Sc / BA Hons)",
            "Business Analytics & FinTech",
            "Actuarial Science & Risk Management",
            "Management & Business Administration (BBA / BMS / MBA)",
            "Corporate Law & Mergers (via 5-year Integrated Law)",
            "Entrepreneurship & Venture Operations",
        ],
        "makes_easier": [
            "Admissions to top university commerce and economics programs requiring Class 12 Mathematics",
            "Strong quantitative readiness for finance, data analytics, and professional exams (CA, CFA, CMA)",
        ],
        "constraints": [
            "Does not allow transition into engineering or medical degrees (requires Science).",
            "Requires comfort with algebraic and statistical reasoning alongside commercial concepts.",
        ],
        "still_to_explore": [
            "Whether you enjoy analyzing real-world business financial decisions and statements",
            "Your interest in economic theory and markets versus company management",
        ],
        "career_families": [
            {
                "family": "Finance & Quantitative Analysis",
                "examples": ["Financial Analyst", "Investment Banker", "Actuary", "Risk Manager"],
            },
            {
                "family": "Accounting & Corporate Governance",
                "examples": ["Chartered Accountant (CA)", "Statutory Auditor", "Tax Consultant"],
            },
            {
                "family": "Business Analytics & Consulting",
                "examples": ["Business Analyst", "FinTech Product Specialist", "Strategy Consultant"],
            },
        ],
        "default_experiment_id": "business_simulation",
        "experiment_title": "Business & Financial Decision Simulation",
        "experiment_action": "Try the 5-minute Business Decision Simulation",
        "duration": "5 mins",
        "sources": ["ICAI Chartered Accountancy Guidelines", "Delhi University Commerce Eligibility Criteria"],
        "last_verified": "2026-03-01",
    },
    "Commerce (without Maths)": {
        "direction_id": "commerce_without_maths",
        "group": "Commerce (without Maths)",
        "name": "Commerce (Applied / Without Maths)",
        "tagline": "A direction worth exploring if you are drawn to business, trade, marketing, and management without heavy calculus.",
        "subjects": ["Accountancy", "Business Studies", "Economics", "Informatics Practices / PE", "English"],
        "keeps_open": [
            "Bachelor of Commerce (B.Com General)",
            "Bachelor of Business Administration (BBA / BMS)",
            "Company Secretary (CS) & Corporate Governance",
            "Digital Marketing & Brand Management",
            "Banking Operations & Retail Financial Services",
            "Hospitality & Event Management",
            "Entrepreneurship & Family Business Operations",
        ],
        "makes_easier": [
            "Focusing on commercial concepts, organizational operations, and communication without calculus pressure",
        ],
        "constraints": [
            "Certain premier universities require Class 12 Mathematics for B.Com (Honours) or B.Sc Economics.",
            "Actuarial science and quantitative data analytics degrees typically require Mathematics.",
        ],
        "still_to_explore": [
            "Whether your target universities have a mathematics prerequisite for your desired undergraduate courses",
            "Your interest in qualitative business management versus financial modeling",
        ],
        "career_families": [
            {
                "family": "Business Operations & Management",
                "examples": ["Business Development Lead", "Human Resources Manager", "Operations Executive"],
            },
            {
                "family": "Marketing & Brand Building",
                "examples": ["Brand Strategist", "Digital Marketing Specialist", "Public Relations Executive"],
            },
            {
                "family": "Corporate Secretarial & Compliance",
                "examples": ["Company Secretary (CS)", "Compliance Officer", "Banking Officer"],
            },
        ],
        "default_experiment_id": "business_simulation",
        "experiment_title": "Business & Marketing Strategy Exploration",
        "experiment_action": "Try the 5-minute Marketing & Strategy challenge",
        "duration": "5 mins",
        "sources": ["ICSI Guidelines", "University Grants Commission Framework"],
        "last_verified": "2026-03-01",
    },
    "Arts/Humanities": {
        "direction_id": "arts_humanities",
        "group": "Arts/Humanities",
        "name": "Humanities & Social Sciences",
        "tagline": "A direction worth exploring if you are curious about society, human behavior, law, public policy, communication, and creative expression.",
        "subjects": ["History / Political Science", "Sociology / Psychology", "Economics / Geography", "Languages / Literature", "English"],
        "keeps_open": [
            "Law (5-Year Integrated BA-LLB via CLAT / AILET)",
            "Civil Services (UPSC / State Public Service Commissions)",
            "Journalism, Media & Mass Communication",
            "Psychology, Counseling & Behavioral Sciences",
            "Public Policy, International Relations & Diplomacy",
            "Design & Creative Arts (NID / NIFT / UCEED)",
            "Content Strategy, Publishing & Academic Research",
        ],
        "makes_easier": [
            "Preparation for legal entrance exams (CLAT) and civil services (UPSC) which prioritize general studies and reading",
            "Advanced critical analysis, structured essay writing, and verbal argumentation",
        ],
        "constraints": [
            "STEM fields (engineering, medical, pure physical sciences) are closed without Class 11-12 science subjects.",
            "Certain quantitative economics programs prefer or mandate Class 12 Mathematics.",
        ],
        "still_to_explore": [
            "Your comfort with extensive reading, evaluating competing viewpoints, and writing long-form essays",
            "Whether your interest leans toward public service and law, media and writing, or social research",
        ],
        "career_families": [
            {
                "family": "Law & Public Policy",
                "examples": ["Advocate / Corporate Lawyer", "Civil Servant (IAS / IFS)", "Policy Analyst", "Diplomat"],
            },
            {
                "family": "Media, Communication & Design",
                "examples": ["Investigative Journalist", "Content Director", "Product Designer", "Author"],
            },
            {
                "family": "Behavioral & Social Science",
                "examples": ["Clinical Psychologist", "Sociologist", "Urban Planner", "International Development Officer"],
            },
        ],
        "default_experiment_id": "legal_argumentation",
        "experiment_title": "Legal & Policy Argumentation Challenge",
        "experiment_action": "Try the 5-minute Legal Argumentation challenge",
        "duration": "5 mins",
        "sources": ["Consortium of National Law Universities (CLAT)", "UPSC Syllabus and Examination Framework"],
        "last_verified": "2026-03-01",
    },
    "Vocational/ITI": {
        "direction_id": "vocational_iti",
        "group": "Vocational/ITI",
        "name": "Vocational & Applied Technical Skills",
        "tagline": "A practical, hands-on route focused on industry-ready technical skills, apprenticeships, and early employable mastery.",
        "subjects": ["Applied Trade Theory", "Workshop Practical Training", "Engineering Drawing / Applied IT", "Employability & Workplace Skills"],
        "keeps_open": [
            "Direct Technical Industry Employment",
            "Polytechnic Diploma Engineering (with Lateral Entry to B.Tech)",
            "National Apprenticeship Training Schemes (NATS / NAPS)",
            "Specialized Technical Workshops & Skilled Entrepreneurship",
            "Government Technical Technician Cadres (Railways, Defence PSUs)",
        ],
        "makes_easier": [
            "Fastest pathway to employable technical income with minimal abstract academic theory",
            "Hands-on equipment mastery and practical workshop expertise",
        ],
        "constraints": [
            "Direct admission into standard university Bachelor's programs usually requires completing a diploma or bridge program.",
            "Physical workshop attendance and practical tool work are mandatory.",
        ],
        "still_to_explore": [
            "Your preference for practical hands-on technical work versus formal university degree study",
        ],
        "career_families": [
            {
                "family": "Precision Industry & Mechatronics",
                "examples": ["Industrial Automation Technician", "CNC Specialist", "Precision Electrician"],
            },
            {
                "family": "Applied Engineering & Services",
                "examples": ["Automotive Master Technician", "HVAC Specialist", "Workshop Owner"],
            },
        ],
        "default_experiment_id": "applied_practical",
        "experiment_title": "Hands-on Technical Troubleshooting",
        "experiment_action": "Try the 5-minute Technical Troubleshooting challenge",
        "duration": "5 mins",
        "sources": ["Directorate General of Training (DGT)", "National Council for Vocational Education and Training (NCVET)"],
        "last_verified": "2026-03-01",
    },
}


def derive_class10_semantic_signals(answers: dict, session: QuestionnaireSession | None = None) -> list:
    """
    Controlled signal synthesis preventing correlation inflation.
    Groups correlated inputs (e.g. Mathematics + logical + numeric) into 1 signal.
    Each signal carries explicit evidence metadata (type, strength, reliability, category).
    Reads directly from QuestionnaireSession domain scores and answer log when present.
    """
    signals = []
    all_answers_lower = []
    for k, v in answers.items():
        all_answers_lower.extend([str(s).lower() for s in _as_list(v)])
    
    # 1. Quantitative Problem Solving
    has_math_subject = any("math" in str(a).lower() for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_logic_style = any("logic" in str(a).lower() or "numeric" in str(a).lower() for a in _as_list(answers.get("work_style")))
    has_math_mark = False
    math_pct = 0
    for k, v in answers.items():
        if "math" in k.lower():
            vm = validate_mark(v)
            if vm.get("status") == "VALID":
                has_math_mark = True
                math_pct = vm.get("normalized_percentage", 0)

    if has_math_subject or has_logic_style or has_math_mark:
        evidence_sources = []
        if has_math_mark:
            evidence_sources.append({
                "source": f"academic_record:mathematics_{math_pct}%",
                "category": "ACADEMIC",
                "evidenceType": "ACADEMIC",
                "strength": "HIGH" if math_pct >= 75 else ("MEDIUM" if math_pct >= 60 else "LOW"),
                "reliability": "ACADEMIC_RECORD",
                "recency": "CURRENT",
            })
        if has_math_subject:
            evidence_sources.append({
                "source": "favorite_subjects:mathematics",
                "category": "INTEREST",
                "evidenceType": "INTEREST",
                "strength": "MEDIUM",
                "reliability": "SELF_REPORTED",
                "recency": "CURRENT",
            })
        if has_logic_style:
            evidence_sources.append({
                "source": "work_style:logical_numeric",
                "category": "PERSONALITY",
                "evidenceType": "PERSONALITY",
                "strength": "MEDIUM",
                "reliability": "SELF_REPORTED",
                "recency": "CURRENT",
            })

        signals.append({
            "id": "quantitative_problem_solving",
            "cluster": "QUANTITATIVE_ORIENTATION",
            "title": "🔢 QUANTITATIVE PROBLEM SOLVING",
            "headline": "Quantitative & Logical Reasoning",
            "description": "You demonstrate engagement with numerical, mathematical, and logical problem-solving structures.",
            "evidence_summary": ("Academic mark (" + str(math_pct) + "%) + " if has_math_mark else "") + ("Mathematics subject preference + " if has_math_subject else "") + ("Logical problem-solving style" if has_logic_style else ""),
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "SUPPORTED" if (has_math_mark and (has_math_subject or has_logic_style)) else ("REPEATED_SELF_REPORT" if len(evidence_sources) >= 2 else "EXPLORATORY"),
            "is_aptitude_claim": has_math_mark,
            "tag": "Academic & Interest Signal" if has_math_mark else "Early Interest Signal",
        })

    # 2. Business Curiosity
    has_commerce_subj = any(any(w in str(a).lower() for w in ["commerce", "economic", "finance", "business", "account"]) for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_biz_curiosity = any(any(w in str(a).lower() for w in ["business", "commerce", "finance", "economic"]) for a in _as_list(answers.get("career_curiosity")) + _as_list(answers.get("interests")))
    if has_commerce_subj or has_biz_curiosity:
        evidence_sources = []
        if has_commerce_subj:
            evidence_sources.append({"source": "favorite_subjects:commerce", "category": "INTEREST", "evidenceType": "INTEREST", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_biz_curiosity:
            evidence_sources.append({"source": "career_curiosity:business", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "business_curiosity",
            "cluster": "BUSINESS_ORIENTATION",
            "title": "💼 BUSINESS CURIOSITY",
            "headline": "Business & Commercial Thinking",
            "description": "You express curiosity about markets, financial decision-making, and commercial operations.",
            "evidence_summary": "Commerce interest + business curiosity",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # 3. Technology Interest
    has_comp_subj = any("computer" in str(a).lower() or "/it" in str(a).lower() or " it" in str(a).lower() or str(a).lower() == "it" for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_tech_curiosity = any("engineering" in str(a).lower() or "technology" in str(a).lower() for a in _as_list(answers.get("career_curiosity")))
    if has_comp_subj or has_tech_curiosity:
        evidence_sources = []
        if has_comp_subj:
            evidence_sources.append({"source": "favorite_subjects:computer_it", "category": "INTEREST", "evidenceType": "INTEREST", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_tech_curiosity:
            evidence_sources.append({"source": "career_curiosity:technology", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "technology_interest",
            "cluster": "TECH_ORIENTATION",
            "title": "💻 TECHNOLOGY INTEREST",
            "headline": "Technology & Computing",
            "description": "Technology, software, and engineering domains are among your preferred areas of exploration.",
            "evidence_summary": "Computer/IT preference + technology curiosity",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # 4. Scientific Inquiry
    has_sci_subj = any("science" in str(a).lower() and "social" not in str(a).lower() for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_sci_mark = False
    sci_pct = 0
    for k, v in answers.items():
        if "science" in k.lower() and "social" not in k.lower():
            vm = validate_mark(v)
            if vm.get("status") == "VALID":
                has_sci_mark = True
                sci_pct = vm.get("normalized_percentage", 0)

    if has_sci_subj or has_sci_mark:
        evidence_sources = []
        if has_sci_mark:
            evidence_sources.append({"source": f"academic_record:science_{sci_pct}%", "category": "ACADEMIC", "evidenceType": "ACADEMIC", "strength": "HIGH" if sci_pct >= 75 else "MEDIUM", "reliability": "ACADEMIC_RECORD", "recency": "CURRENT"})
        if has_sci_subj:
            evidence_sources.append({"source": "favorite_subjects:science", "category": "INTEREST", "evidenceType": "INTEREST", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "scientific_inquiry",
            "cluster": "SCIENCE_ORIENTATION",
            "title": "🔬 SCIENTIFIC INQUIRY",
            "headline": "Empirical & Natural Sciences",
            "description": "You show engagement with physical and natural sciences, experimentation, and natural systems.",
            "evidence_summary": ("Science academic mark (" + str(sci_pct) + "%) + " if has_sci_mark else "") + ("Science subject preference" if has_sci_subj else ""),
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "SUPPORTED" if (has_sci_mark and has_sci_subj) else "EXPLORATORY",
            "is_aptitude_claim": has_sci_mark,
            "tag": "Academic & Interest Signal" if has_sci_mark else "Early Interest Signal",
        })

    # 5. Healthcare & Human Biology
    has_health_curiosity = any("medicine" in str(a).lower() or "healthcare" in str(a).lower() for a in _as_list(answers.get("career_curiosity")))
    has_people_style = any("helping" in str(a).lower() or "people" in str(a).lower() for a in _as_list(answers.get("work_style")))
    if has_health_curiosity or has_people_style:
        evidence_sources = []
        if has_health_curiosity:
            evidence_sources.append({"source": "career_curiosity:healthcare", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_people_style:
            evidence_sources.append({"source": "work_style:helping_people", "category": "PERSONALITY", "evidenceType": "PERSONALITY", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "healthcare_curiosity",
            "cluster": "HEALTHCARE_ORIENTATION",
            "title": "🧬 HEALTHCARE & HUMAN BIOLOGY",
            "headline": "Health Sciences & Human Well-being",
            "description": "You express interest in life sciences, medical care, and helping individuals directly.",
            "evidence_summary": "Healthcare curiosity + desire to work with people",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # 6. Social & Legal Inquiry
    has_social_subj = any("social" in str(a).lower() or "history" in str(a).lower() or "civics" in str(a).lower() or "language" in str(a).lower() for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_debate_style = any("reading" in str(a).lower() or "writing" in str(a).lower() or "debating" in str(a).lower() for a in _as_list(answers.get("work_style")))
    has_law_curiosity = any("law" in str(a).lower() or "government" in str(a).lower() for a in _as_list(answers.get("career_curiosity")))
    if has_social_subj or has_debate_style or has_law_curiosity:
        evidence_sources = []
        if has_social_subj:
            evidence_sources.append({"source": "favorite_subjects:social_science", "category": "INTEREST", "evidenceType": "INTEREST", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_debate_style:
            evidence_sources.append({"source": "work_style:reading_debating", "category": "PERSONALITY", "evidenceType": "PERSONALITY", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_law_curiosity:
            evidence_sources.append({"source": "career_curiosity:law_gov", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "social_legal_inquiry",
            "cluster": "HUMANITIES_ORIENTATION",
            "title": "⚖️ SOCIAL & LEGAL INQUIRY",
            "headline": "Society, Law & Governance",
            "description": "You show interest in social institutions, governance, reading, debate, and legal policy.",
            "evidence_summary": "Social science + reading/debating preference + legal curiosity",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "DEVELOPING" if (has_social_subj and (has_debate_style or has_law_curiosity)) else "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # 7. Creative Expression & Design
    has_art_subj = any("art" in str(a).lower() or "craft" in str(a).lower() for a in _as_list(answers.get("favorite_subjects")) + _as_list(answers.get("strong_subjects")))
    has_creative_style = any("creative" in str(a).lower() or "artistic" in str(a).lower() for a in _as_list(answers.get("work_style")))
    has_design_curiosity = any("design" in str(a).lower() for a in _as_list(answers.get("career_curiosity")))
    if has_art_subj or has_creative_style or has_design_curiosity:
        evidence_sources = []
        if has_art_subj:
            evidence_sources.append({"source": "favorite_subjects:art", "category": "INTEREST", "evidenceType": "INTEREST", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_creative_style:
            evidence_sources.append({"source": "work_style:creative", "category": "PERSONALITY", "evidenceType": "PERSONALITY", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_design_curiosity:
            evidence_sources.append({"source": "career_curiosity:design", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "creative_design",
            "cluster": "CREATIVE_ORIENTATION",
            "title": "🎨 CREATIVE EXPRESSION & DESIGN",
            "headline": "Design & Visual Thinking",
            "description": "You enjoy visual design, creative expression, and bringing original ideas to life.",
            "evidence_summary": "Art/Craft + creative expression preference",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "DEVELOPING" if (has_art_subj and has_creative_style) else "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # 8. Hands-on Technical
    has_hands_style = any("hands-on" in a or "fixing" in a or "building" in a for a in _as_list(answers.get("work_style")))
    has_trade_curiosity = any("trade" in a or "mechanic" in a or "electrician" in a for a in _as_list(answers.get("career_curiosity")))
    if has_hands_style or has_trade_curiosity:
        evidence_sources = []
        if has_hands_style:
            evidence_sources.append({"source": "work_style:hands_on", "category": "PERSONALITY", "evidenceType": "PERSONALITY", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})
        if has_trade_curiosity:
            evidence_sources.append({"source": "career_curiosity:trade", "category": "GOAL", "evidenceType": "GOAL", "strength": "MEDIUM", "reliability": "SELF_REPORTED", "recency": "CURRENT"})

        signals.append({
            "id": "hands_on_technical",
            "cluster": "TECHNICAL_ORIENTATION",
            "title": "🛠️ HANDS-ON TECHNICAL EXPLORATION",
            "headline": "Applied Practical Mastery",
            "description": "You prefer practical, tactile learning and understanding how physical tools and equipment operate.",
            "evidence_summary": "Hands-on building preference + trade curiosity",
            "evidence_sources": evidence_sources,
            "evidence_ids": [e["source"] for e in evidence_sources],
            "maturity": "EXPLORATORY",
            "is_aptitude_claim": False,
            "tag": "Early Interest Signal",
        })

    # Adaptive Questionnaire Integration
    is_adaptive = session is not None or any(k.startswith(ADAPTIVE_QUESTION_PREFIXES) for k in answers.keys())
    if is_adaptive:
        if not session:
            state = evaluate_class10_adaptive_state(answers)
            session = state.get("__session__")
            domain_scores = state.get("domain_scores", {})
            answer_log = state.get("answer_log", [])
        else:
            domain_scores = session.domain_scores
            answer_log = [
                {
                    "question_id": a.question_id,
                    "selected_option": a.selected_label or a.option_id,
                    "weights_applied": a.domain_weights_applied,
                }
                for a in session.answer_log
            ]
        existing_sig_ids = {s["id"] for s in signals}

        # 1. math_logical
        score_ml = domain_scores.get("MATH_LOGICAL", domain_scores.get("math_logical", 0))
        if score_ml >= 1.0:
            math_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("MATH_LOGICAL", 0) > 0 or
                a.get("weights_applied", {}).get("math_logical", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["math", "puzzle", "algorithm", "code", "logic"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_ml >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in math_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in math_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "quantitative_problem_solving" not in existing_sig_ids:
                signals.append({
                    "id": "quantitative_problem_solving",
                    "cluster": "QUANTITATIVE_ORIENTATION",
                    "title": "🔢 QUANTITATIVE PROBLEM SOLVING",
                    "headline": "Quantitative & Logical Reasoning",
                    "description": "You demonstrate engagement with numerical, mathematical, and logical problem-solving structures.",
                    "evidence_summary": f"Adaptive scenario choices in mathematical & logical reasoning (Score: {score_ml:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_ml >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })
            else:
                for s in signals:
                    if s["id"] == "quantitative_problem_solving":
                        s["evidence_sources"].extend(ev_sources)
                        s["evidence_ids"].extend([e["source"] for e in ev_sources])
                        s["maturity"] = "SUPPORTED"

        # 2. business_commerce
        score_bc = domain_scores.get("BUSINESS_COMMERCE", domain_scores.get("business_commerce", 0))
        if score_bc >= 1.0:
            biz_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("BUSINESS_COMMERCE", 0) > 0 or
                a.get("weights_applied", {}).get("business_commerce", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["business", "trade", "budget", "pricing", "market", "profit", "customer"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_bc >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in biz_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in biz_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "business_curiosity" not in existing_sig_ids:
                signals.append({
                    "id": "business_curiosity",
                    "cluster": "BUSINESS_ORIENTATION",
                    "title": "💼 BUSINESS CURIOSITY",
                    "headline": "Business & Commercial Thinking",
                    "description": "You express curiosity about markets, financial decision-making, and commercial operations.",
                    "evidence_summary": f"Adaptive scenario choices in commercial and financial thinking (Score: {score_bc:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_bc >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })
            else:
                for s in signals:
                    if s["id"] == "business_curiosity":
                        s["evidence_sources"].extend(ev_sources)
                        s["evidence_ids"].extend([e["source"] for e in ev_sources])
                        s["maturity"] = "SUPPORTED"

        # 3. life_sciences
        score_ls = domain_scores.get("LIFE_SCIENCES_CARE", domain_scores.get("life_sciences", 0))
        if score_ls >= 1.0:
            bio_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("LIFE_SCIENCES_CARE", 0) > 0 or
                a.get("weights_applied", {}).get("life_sciences", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["nature", "animal", "plant", "brain", "memory", "body", "living", "doctor", "medicine", "health"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_ls >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in bio_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in bio_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "scientific_inquiry" not in existing_sig_ids:
                signals.append({
                    "id": "scientific_inquiry",
                    "cluster": "SCIENCE_ORIENTATION",
                    "title": "🔬 SCIENTIFIC INQUIRY",
                    "headline": "Empirical & Natural Sciences",
                    "description": "You show engagement with biological and natural sciences, experimentation, and natural systems.",
                    "evidence_summary": f"Adaptive scenario choices in life sciences and biological systems (Score: {score_ls:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_ls >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })
            if "healthcare_curiosity" not in existing_sig_ids and any("medic" in str(a.get("selected_option", "")).lower() or "doctor" in str(a.get("selected_option", "")).lower() or "health" in str(a.get("selected_option", "")).lower() for a in bio_ans):
                signals.append({
                    "id": "healthcare_curiosity",
                    "cluster": "HEALTHCARE_ORIENTATION",
                    "title": "🧬 HEALTHCARE & HUMAN BIOLOGY",
                    "headline": "Health Sciences & Human Well-being",
                    "description": "You express interest in life sciences, medical care, and helping individuals directly.",
                    "evidence_summary": f"Adaptive scenario choices in health & biology (Score: {score_ls:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })

        # 4. humanities_social
        score_hu = domain_scores.get("HUMANITIES_SOCIAL", domain_scores.get("humanities_social", 0))
        if score_hu >= 1.0:
            hum_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("HUMANITIES_SOCIAL", 0) > 0 or
                a.get("weights_applied", {}).get("humanities_social", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["history", "society", "country", "argument", "debate", "background", "research", "reading", "civics"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_hu >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in hum_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in hum_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "social_legal_inquiry" not in existing_sig_ids:
                signals.append({
                    "id": "social_legal_inquiry",
                    "cluster": "HUMANITIES_ORIENTATION",
                    "title": "⚖️ SOCIAL & LEGAL INQUIRY",
                    "headline": "Society, Law & Governance",
                    "description": "You show interest in social institutions, governance, reading, debate, and human history.",
                    "evidence_summary": f"Adaptive scenario choices in humanities and social inquiry (Score: {score_hu:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_hu >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })

        # 5. creative_visual
        score_cr = domain_scores.get("CREATIVE_VISUAL", domain_scores.get("creative_visual", 0))
        if score_cr >= 1.0:
            art_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("CREATIVE_VISUAL", 0) > 0 or
                a.get("weights_applied", {}).get("creative_visual", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["sketch", "paint", "poster", "slide", "visual", "look", "design", "creative", "video", "art"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_cr >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in art_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in art_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "creative_design" not in existing_sig_ids:
                signals.append({
                    "id": "creative_design",
                    "cluster": "CREATIVE_ORIENTATION",
                    "title": "🎨 CREATIVE EXPRESSION & DESIGN",
                    "headline": "Design & Visual Thinking",
                    "description": "You enjoy visual design, creative expression, and bringing original ideas to life.",
                    "evidence_summary": f"Adaptive scenario choices in visual design and creativity (Score: {score_cr:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_cr >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })

        # 6. practical_applied
        score_pa = domain_scores.get("PRACTICAL_APPLIED", domain_scores.get("practical_applied", 0))
        if score_pa >= 1.0:
            pra_ans = [
                a for a in answer_log
                if a.get("weights_applied", {}).get("PRACTICAL_APPLIED", 0) > 0 or
                a.get("weights_applied", {}).get("practical_applied", 0) > 0 or
                any(w in str(a.get("selected_option", "")).lower() for w in ["hand", "build", "fix", "tool", "physical", "experiment", "model", "workshop"])
            ]
            ev_sources = [
                {
                    "source": f"question:{a.get('question_id', '')}",
                    "category": "INTEREST",
                    "evidenceType": "INTEREST",
                    "strength": "HIGH" if score_pa >= 2.0 else "MEDIUM",
                    "reliability": "ADAPTIVE_SCENARIO",
                    "recency": "CURRENT",
                }
                for a in pra_ans[:3]
            ]
            qids_cited = [a.get("question_id", "") for a in pra_ans[:3] if a.get("question_id")]
            qids_summary = f" (Questions: {', '.join(qids_cited)})" if qids_cited else ""
            if "hands_on_technical" not in existing_sig_ids:
                signals.append({
                    "id": "hands_on_technical",
                    "cluster": "TECHNICAL_ORIENTATION",
                    "title": "🛠️ HANDS-ON TECHNICAL EXPLORATION",
                    "headline": "Applied Practical Mastery",
                    "description": "You prefer practical, tactile learning and understanding how physical tools and equipment operate.",
                    "evidence_summary": f"Adaptive scenario choices in practical and applied execution (Score: {score_pa:.1f}){qids_summary}",
                    "evidence_sources": ev_sources,
                    "evidence_ids": [e["source"] for e in ev_sources],
                    "maturity": "SUPPORTED" if score_pa >= 2.0 else "EXPLORATORY",
                    "is_aptitude_claim": False,
                    "tag": "Adaptive Scenario Signal",
                })

    return signals


def derive_class10_competing_hypotheses(
    signals: list,
    answers: dict,
    session: QuestionnaireSession | None = None,
) -> list:
    is_adaptive = session is not None or any(k.startswith(ADAPTIVE_QUESTION_PREFIXES) for k in answers.keys())
    if is_adaptive:
        if not session:
            adaptive_state = evaluate_class10_adaptive_state(answers)
            session = adaptive_state.get("__session__")
            ranked = adaptive_state["ranked_domains"]
            scores = adaptive_state["domain_scores"]
            answer_log = adaptive_state["answer_log"]
        else:
            adaptive_state = evaluate_class10_adaptive_state({"__session__": session})
            ranked_upper = sorted(C10_ADAPTIVE_DOMAINS, key=lambda d: session.domain_scores.get(d, 0.0), reverse=True)
            ranked_lower = [UPPER_TO_LOWER_DOMAIN.get(d, d.lower()) for d in ranked_upper]
            is_legacy = any(k.startswith("c10_") for k in answers.keys())
            ranked = ranked_lower if is_legacy else ranked_upper
            scores = adaptive_state["domain_scores"]
            answer_log = adaptive_state["answer_log"]

        DOMAIN_HYP_CONFIG = {
            "math_logical": {
                "id": "hyp_quant_tech",
                "name": "Quantitative & Technology Pathway",
                "title": "Quantitative & Technology Pathway",
                "associated_stream": "Science (PCM — Physics, Chemistry, Maths)",
                "key_unknown": "How much you enjoy abstract mathematical reasoning and sustained analytical problem solving beyond standard school questions.",
                "key_unknowns": "How much you enjoy abstract mathematical reasoning and sustained analytical problem solving beyond standard school questions.",
                "what_helps": "Try the Technology & Problem Solving exploration challenge to observe how you approach algorithmic puzzles.",
                "what_helps_resolve": "Try the Technology & Problem Solving exploration challenge to observe how you approach algorithmic puzzles.",
                "experiment_id": "tech_problem_solving",
            },
            "business_commerce": {
                "id": "hyp_quant_biz",
                "name": "Commercial & Business Strategy Pathway",
                "title": "Commercial & Business Strategy Pathway",
                "associated_stream": "Commerce (with Maths)",
                "key_unknown": "Whether you prefer financial modeling and economic analysis or operational management and marketing strategy.",
                "key_unknowns": "Whether you prefer financial modeling and economic analysis or operational management and marketing strategy.",
                "what_helps": "Try the Business & Financial Decision Simulation to test your appetite for commercial trade-offs.",
                "what_helps_resolve": "Try the Business & Financial Decision Simulation to test your appetite for commercial trade-offs.",
                "experiment_id": "business_simulation",
            },
            "life_sciences": {
                "id": "hyp_science_health",
                "name": "Life Sciences & Healthcare Pathway",
                "title": "Life Sciences & Healthcare Pathway",
                "associated_stream": "Science (PCB — Physics, Chemistry, Biology)",
                "key_unknown": "Your preference for biological systems versus technological engineering, and stamina for clinical diagnostic environments.",
                "key_unknowns": "Your preference for biological systems versus technological engineering, and stamina for clinical diagnostic environments.",
                "what_helps": "Try the Healthcare Reality Exploration to see what clinical diagnosis and patient care genuinely entail.",
                "what_helps_resolve": "Try the Healthcare Reality Exploration to see what clinical diagnosis and patient care genuinely entail.",
                "experiment_id": "healthcare_reality",
            },
            "humanities_social": {
                "id": "hyp_social_law",
                "name": "Humanities, Law & Social Reasoning",
                "title": "Humanities, Law & Social Reasoning",
                "associated_stream": "Arts / Humanities",
                "key_unknown": "Comfort with extensive reading volumes, written argumentation, and evaluating competing social and historical perspectives.",
                "key_unknowns": "Comfort with extensive reading volumes, written argumentation, and evaluating competing social and historical perspectives.",
                "what_helps": "Try the Legal & Policy Argumentation challenge.",
                "what_helps_resolve": "Try the Legal & Policy Argumentation challenge.",
                "experiment_id": "legal_argumentation",
            },
            "creative_visual": {
                "id": "hyp_creative_design",
                "name": "Creative Design & Visual Thinking",
                "title": "Creative Design & Visual Thinking",
                "associated_stream": "Design / Humanities / Architecture",
                "key_unknown": "Whether you lean towards digital UI/UX and product design, architectural spaces, or commercial visual communication.",
                "key_unknowns": "Whether you lean towards digital UI/UX and product design, architectural spaces, or commercial visual communication.",
                "what_helps": "Try the Visual Hierarchy & Design Challenge.",
                "what_helps_resolve": "Try the Visual Hierarchy & Design Challenge.",
                "experiment_id": "design_wireframing",
            },
            "practical_applied": {
                "id": "hyp_hands_on",
                "name": "Applied Technical & Hands-On Pathway",
                "title": "Applied Technical & Hands-On Pathway",
                "associated_stream": "Vocational / Technical Diploma (Polytechnic/ITI)",
                "key_unknown": "Preference between hands-on engineering execution versus theoretical academic study.",
                "key_unknowns": "Preference between hands-on engineering execution versus theoretical academic study.",
                "what_helps": "Try the Technical Troubleshooting & Equipment Challenge.",
                "what_helps_resolve": "Try the Technical Troubleshooting & Equipment Challenge.",
                "experiment_id": "hands_on_troubleshooting",
            },
        }

        top_2 = ranked[:2] if len(ranked) >= 2 else (ranked + ["business_commerce"])[:2]
        adaptive_hypotheses = []
        for d in top_2:
            norm_d = UPPER_TO_LOWER_DOMAIN.get(d, d.lower())
            cfg = DOMAIN_HYP_CONFIG.get(norm_d)
            if not cfg:
                continue

            dom_upper = LOWER_TO_UPPER_DOMAIN.get(norm_d, norm_d.upper())
            dom_lower = norm_d
            score_val = scores.get(dom_upper, scores.get(dom_lower, 0.0))
            lbl = CLASS10_DOMAIN_LABELS.get(dom_upper, CLASS10_DOMAIN_LABELS.get(dom_lower, norm_d))

            supporting_ans = []
            supporting_qids = []
            for log in answer_log:
                w_map = log.get("weights_applied", {})
                opt_str = str(log.get("selected_option", ""))
                qid = log.get("question_id", "")
                if (
                    w_map.get(dom_upper, 0) > 0 or
                    w_map.get(dom_lower, 0) > 0 or
                    dom_lower in opt_str.lower() or
                    any(w in opt_str.lower() for w in lbl.lower().split())
                ):
                    supporting_ans.append(opt_str)
                    if qid and qid not in supporting_qids:
                        supporting_qids.append(qid)

            if supporting_ans:
                qids_str = f" (Questions: {', '.join(supporting_qids[:3])})" if supporting_qids else ""
                premise = f"Strong affinity for {lbl} (Score: {score_val:.1f}){qids_str}. In your scenario responses, you favored options like: '{supporting_ans[0]}'."
            else:
                premise = f"Strong affinity for {lbl} (Score: {score_val:.1f}) based on your problem-solving scenario choices."

            adaptive_hypotheses.append({
                **cfg,
                "is_active": True,
                "evidence": premise,
                "premise": premise,
                "cited_question_ids": supporting_qids,
                "score": score_val,
            })

        return adaptive_hypotheses

    signal_ids = {s["id"] for s in signals}
    hypotheses = []

    # Hypothesis A: Quantitative + Technology
    hyp_a_supported = "quantitative_problem_solving" in signal_ids and ("technology_interest" in signal_ids or "scientific_inquiry" in signal_ids)
    hypotheses.append({
        "id": "hyp_quant_tech",
        "name": "Quantitative + Technology Pathway",
        "title": "Quantitative + Technology Pathway",
        "associated_stream": "Science (PCM — Physics, Chemistry, Maths)",
        "is_active": hyp_a_supported,
        "evidence": "Demonstrated interest in Mathematics, logical problem solving, and technology.",
        "premise": "Demonstrated interest in Mathematics, logical problem solving, and technology.",
        "key_unknown": "How much you enjoy deep scientific reasoning beyond textbooks, and your comfort with sustained mathematical problem solving.",
        "key_unknowns": "How much you enjoy deep scientific reasoning beyond textbooks, and your comfort with sustained mathematical problem solving.",
        "what_helps": "Try the Technology & Problem Solving exploration challenge to observe how you approach algorithmic puzzles.",
        "what_helps_resolve": "Try the Technology & Problem Solving exploration challenge to observe how you approach algorithmic puzzles.",
        "experiment_id": "tech_problem_solving",
    })

    # Hypothesis B: Quantitative + Business
    hyp_b_supported = "quantitative_problem_solving" in signal_ids and "business_curiosity" in signal_ids
    hypotheses.append({
        "id": "hyp_quant_biz",
        "name": "Quantitative + Business Pathway",
        "title": "Quantitative + Business Pathway",
        "associated_stream": "Commerce (with Maths)",
        "is_active": hyp_b_supported,
        "evidence": "Combination of interest in Mathematics and numerical problems with curiosity about business, money and decisions.",
        "premise": "Combination of interest in Mathematics and numerical problems with curiosity about business, money and decisions.",
        "key_unknown": "Whether you enjoy analyzing real company decisions, accounting principles, and economic market forces.",
        "key_unknowns": "Whether you enjoy analyzing real company decisions, accounting principles, and economic market forces.",
        "what_helps": "Try the Business & Financial Decision Simulation to test your appetite for commercial trade-offs.",
        "what_helps_resolve": "Try the Business & Financial Decision Simulation to test your appetite for commercial trade-offs.",
        "experiment_id": "business_simulation",
    })

    # Hypothesis C: Science + Healthcare
    hyp_c_supported = "scientific_inquiry" in signal_ids and "healthcare_curiosity" in signal_ids
    hypotheses.append({
        "id": "hyp_science_health",
        "name": "Science + Healthcare Pathway",
        "title": "Science + Healthcare Pathway",
        "associated_stream": "Science (PCB — Physics, Chemistry, Biology)",
        "is_active": hyp_c_supported,
        "evidence": "Curiosity about health sciences, human biology, and medical fields.",
        "premise": "Curiosity about health sciences, human biology, and medical fields.",
        "key_unknown": "Your interest in biological systems versus technology, and your stamina for long-term clinical commitments.",
        "key_unknowns": "Your interest in biological systems versus technology, and your stamina for long-term clinical commitments.",
        "what_helps": "Try the Healthcare Reality Exploration to see what clinical diagnosis and patient care genuinely entail.",
        "what_helps_resolve": "Try the Healthcare Reality Exploration to see what clinical diagnosis and patient care genuinely entail.",
        "experiment_id": "healthcare_reality",
    })

    # Hypothesis D: Law & Social Reasoning
    hyp_d_supported = "social_legal_inquiry" in signal_ids
    hypotheses.append({
        "id": "hyp_social_law",
        "name": "Humanities, Law & Social Reasoning",
        "title": "Humanities, Law & Social Reasoning",
        "associated_stream": "Arts/Humanities",
        "is_active": hyp_d_supported,
        "evidence": "Interest in social systems, reading, debating ideas, or governance/law.",
        "premise": "Interest in social systems, reading, debating ideas, or governance/law.",
        "key_unknown": "Comfort with extensive reading, written argumentation, and evaluating competing social perspectives.",
        "key_unknowns": "Comfort with extensive reading, written argumentation, and evaluating competing social perspectives.",
        "what_helps": "Try the Legal & Policy Argumentation challenge.",
        "what_helps_resolve": "Try the Legal & Policy Argumentation challenge.",
        "experiment_id": "legal_argumentation",
    })

    return hypotheses


def generate_class10_semantic_rationale(group_name: str, signals: list, marks: dict) -> dict:
    sig_ids = {s["id"] for s in signals}

    # Check PCMB first to avoid substring match on PCM
    if "PCMB" in group_name:
        evidence_ids = []
        if "quantitative_problem_solving" in sig_ids: evidence_ids.append("subject_math")
        if "scientific_inquiry" in sig_ids: evidence_ids.append("subject_science")
        if "healthcare_curiosity" in sig_ids: evidence_ids.append("curiosity_healthcare")
        if "technology_interest" in sig_ids: evidence_ids.append("curiosity_tech")

        student_text = "You are showing interest across both physical/mathematical sciences and biological fields, keeping both engineering and medical entries accessible."
        parent_text = "Why this direction is being considered: Keeps maximum career options open across both technical and medical disciplines, but requires careful monitoring due to the dual JEE/NEET study load."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Clusters [QUANTITATIVE_ORIENTATION, SCIENCE_ORIENTATION, HEALTHCARE_ORIENTATION] -> Stream [Science PCMB]. Key unknown: stamina for dual science and math curricula."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    if "PCM" in group_name:
        reasons_list = []
        evidence_ids = []
        if "quantitative_problem_solving" in sig_ids:
            reasons_list.append("logical problem solving")
            evidence_ids.extend(["subject_math", "style_logical_numeric"])
        if "scientific_inquiry" in sig_ids:
            reasons_list.append("natural sciences")
            evidence_ids.append("subject_science")
        if "technology_interest" in sig_ids:
            reasons_list.append("technology")
            evidence_ids.extend(["subject_computer", "curiosity_tech"])

        if reasons_list:
            joined = " and ".join(reasons_list)
            student_text = f"Your Mathematics and Science interests combine with your interest in {joined}."
        else:
            student_text = "A versatile STEM foundation for students exploring analytical, engineering, or computing directions."

        parent_text = "Why this direction is being considered: Provides strong foundational options across technology, engineering, and data science based on reported quantitative interest. Preserves broad eligibility for competitive degree entries."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Clusters [QUANTITATIVE_ORIENTATION, TECH_ORIENTATION] -> Stream [Science PCM]. Key unknown: sustained mathematical stamina beyond Class 10."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    if "Commerce (with Maths)" in group_name:
        evidence_ids = []
        if "quantitative_problem_solving" in sig_ids:
            evidence_ids.extend(["subject_math", "style_logical_numeric"])
        if "business_curiosity" in sig_ids:
            evidence_ids.extend(["curiosity_business", "subject_commerce"])

        student_text = "You combine an interest in Mathematics with curiosity about business, money, and real-world financial decisions."
        parent_text = "Why this direction is being considered: Combines commercial and economic principles with core mathematics, keeping high-value finance, chartered accountancy, economics, and business analytics pathways open."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Clusters [QUANTITATIVE_ORIENTATION, BUSINESS_ORIENTATION] -> Stream [Commerce with Maths]. Key unknown: interest in corporate accounting and economic theory."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    if "PCB" in group_name:
        evidence_ids = []
        if "scientific_inquiry" in sig_ids:
            evidence_ids.append("subject_science")
        if "healthcare_curiosity" in sig_ids:
            evidence_ids.extend(["curiosity_healthcare", "style_helping_people"])

        student_text = "You have expressed interest in Science and healthcare, making life science, medicine, and wellness pathways worth exploring."
        parent_text = "Why this direction is being considered: Aligns with stated interest in healthcare, life sciences, and patient care. Prepares specifically for NEET, pharmacy, biotechnology, and allied clinical programs."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Clusters [SCIENCE_ORIENTATION, HEALTHCARE_ORIENTATION] -> Stream [Science PCB]. Key unknown: commitment to 5.5+ years clinical training versus laboratory research."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    if "Commerce (without Maths)" in group_name:
        evidence_ids = []
        if "business_curiosity" in sig_ids:
            evidence_ids.extend(["curiosity_business", "subject_commerce"])

        student_text = "You are curious about business operations, trade, marketing, and management, without committing to heavy advanced calculus."
        parent_text = "Why this direction is being considered: Provides solid foundations in accounting, corporate studies, and business management while relieving quantitative calculus pressure."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Cluster [BUSINESS_ORIENTATION] -> Stream [Commerce without Maths]. Key unknown: whether desired university programs require Class 12 Math."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    if "Arts" in group_name or "Humanities" in group_name:
        evidence_ids = []
        if "social_legal_inquiry" in sig_ids:
            evidence_ids.extend(["subject_social", "style_debating", "curiosity_law"])
        if "creative_design" in sig_ids:
            evidence_ids.extend(["subject_art", "style_creative"])

        student_text = "Your interests in social systems, reading, debate, law, and human affairs make Humanities an exciting direction to explore."
        parent_text = "Why this direction is being considered: Develops critical reading, writing, and analytical skills highly valued in law, public policy, civil services, and media careers."
        counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Clusters [HUMANITIES_ORIENTATION, CREATIVE_ORIENTATION] -> Stream [Humanities]. Key unknown: comfort with extensive reading and argumentation."

        return {
            "student_rationale": student_text,
            "parent_rationale": parent_text,
            "counsellor_trace": counsellor_text,
            "evidence_ids": sorted(list(set(evidence_ids))),
        }

    # Vocational/ITI
    evidence_ids = []
    if "hands_on_technical" in sig_ids:
        evidence_ids.extend(["style_hands_on", "curiosity_trade"])

    student_text = "Your preference for practical, hands-on learning and technical skills aligns directly with industry-ready skilled trades."
    parent_text = "Why this direction is being considered: Delivers fast, employable practical capabilities and apprenticeships with immediate industry relevance."
    counsellor_text = f"Trace: Evidence {sorted(list(set(evidence_ids)))} -> Cluster [TECHNICAL_ORIENTATION] -> Stream [Vocational/ITI]. Key unknown: preference for hands-on work versus university degrees."

    return {
        "student_rationale": student_text,
        "parent_rationale": parent_text,
        "counsellor_trace": counsellor_text,
        "evidence_ids": sorted(list(set(evidence_ids))),
    }


def generate_class10_reasons_for_group(group_name: str, answers: dict) -> list:
    """
    Generates explainable, semantic reasons for a group without ever saying 'You selected X'.
    """
    signals = derive_class10_semantic_signals(answers)
    sig_ids = {s["id"] for s in signals}
    reasons = []

    if "PCMB" in group_name:
        if "quantitative_problem_solving" in sig_ids and "scientific_inquiry" in sig_ids:
            reasons.append("Preserves flexibility across both mathematical engineering and biological/medical pathways.")
        elif "scientific_inquiry" in sig_ids:
            reasons.append("Explores comprehensive physical and life sciences.")
    elif "PCM" in group_name:
        if "quantitative_problem_solving" in sig_ids:
            reasons.append("Combines your interests in Mathematics with structured logical problem solving.")
        if "technology_interest" in sig_ids:
            reasons.append("Connects your curiosity about computing and technology with foundational science.")
        if "scientific_inquiry" in sig_ids:
            reasons.append("Explores empirical sciences and physical systems.")
    elif "Commerce (with Maths)" in group_name:
        if "quantitative_problem_solving" in sig_ids and "business_curiosity" in sig_ids:
            reasons.append("Connects your numerical problem-solving interest with curiosity about businesses, profit and decisions.")
        elif "business_curiosity" in sig_ids:
            reasons.append("Curious about commercial systems, financial decisions, and enterprise.")
        elif "quantitative_problem_solving" in sig_ids:
            reasons.append("Applies mathematical problem solving to financial and commercial contexts.")
    elif "PCB" in group_name:
        if "scientific_inquiry" in sig_ids or "healthcare_curiosity" in sig_ids:
            reasons.append("Connects natural science inquiry with curiosity about healthcare, human biology, and medical fields.")
    elif "Commerce (without Maths)" in group_name:
        if "business_curiosity" in sig_ids:
            reasons.append("Focuses on business management, trade, and marketing without heavy calculus.")
    elif "Arts" in group_name or "Humanities" in group_name:
        if "social_legal_inquiry" in sig_ids:
            reasons.append("Builds on your interests in social systems, reading, debating ideas, and legal affairs.")
        if "creative_design" in sig_ids:
            reasons.append("Encourages creative expression, visual thinking, and design exploration.")
    elif "Vocational" in group_name:
        reasons.append("Focuses on hands-on practical building, fixing, and applied technical mastery.")

    for k, v in answers.items():
        if any(sub in k.lower() for sub in ["math", "science"]):
            vm = validate_mark(v)
            if vm.get("status") == "VALID" and vm.get("normalized_percentage", 0) >= 65:
                pct = vm.get("normalized_percentage")
                if "math" in k.lower() and any(w in group_name.lower() for w in ["math", "pcm", "commerce"]):
                    reasons.append(f"Supported by your academic performance in Mathematics ({pct}%).")
                elif "science" in k.lower() and any(w in group_name.lower() for w in ["science", "pcb", "pcm"]):
                    reasons.append(f"Supported by your academic performance in Science ({pct}%).")

    if not reasons:
        reasons.append("Foundational pathway for Class 11-12 subject exploration.")

    out = []
    for r in reasons:
        if r not in out:
            out.append(r)
    return out[:4]


def generate_stage_reasons_for_group(stage: str, group_name: str, answers: dict) -> list:
    """
    Generates intelligent, semantic reasons for any stage and group without ever saying 'You selected X'.
    """
    if stage == "class10":
        return generate_class10_reasons_for_group(group_name, answers)

    reasons = []
    all_answers_text = " ".join([str(v).lower() for v in answers.values() if v])
    g_lower = group_name.lower()

    if stage == "class12":
        if "engineering" in g_lower:
            if any(w in all_answers_text for w in ["math", "pcm", "physics"]):
                reasons.append("Builds on your analytical foundation in Mathematics and physical sciences with structured problem-solving.")
            if any(w in all_answers_text for w in ["computer", "code", "coding", "software", "it"]):
                reasons.append("Aligns with your interest in computing systems, algorithmic thinking, and technical creation.")
            if any(w in all_answers_text for w in ["hands-on", "building", "fixing", "logic"]):
                reasons.append("Channels practical problem solving into real-world technological infrastructure.")
            if not reasons:
                reasons.append("Core STEM pathway for software, hardware, core engineering, and technology innovation.")
        elif "medicine" in g_lower:
            if any(w in all_answers_text for w in ["bio", "pcb", "science", "chemistry"]):
                reasons.append("Connects your interest in living systems, human biology, and medical science.")
            if any(w in all_answers_text for w in ["help", "service", "healthcare", "people"]):
                reasons.append("Channels your commitment to clinical diagnosis, patient care, and healthcare impact.")
            if not reasons:
                reasons.append("Rigorous professional preparation for clinical medicine, surgery, and public health.")
        elif "pure sciences" in g_lower:
            if any(w in all_answers_text for w in ["research", "deep study", "science", "physics", "chemistry", "bio"]):
                reasons.append("Encourages deep theoretical curiosity, empirical laboratory inquiry, and scientific discovery.")
            if any(w in all_answers_text for w in ["math", "logic"]):
                reasons.append("Develops formal quantitative reasoning and mathematical modeling for research.")
            if not reasons:
                reasons.append("Foundational scientific pathway for academic research (M.Sc→PhD), data science, and R&D.")
        elif "commerce" in g_lower:
            if any(w in all_answers_text for w in ["business", "commerce", "finance", "management"]):
                reasons.append("Applies commercial, economic, and managerial principles to enterprise and market operations.")
            if any(w in all_answers_text for w in ["math", "account", "numeric", "money"]):
                reasons.append("Builds structured financial literacy and quantitative analysis for corporate finance and professional accounting (CA/CS/CFA).")
            if not reasons:
                reasons.append("Versatile foundation for business leadership, corporate management, banking, and entrepreneurship.")
        elif "law" in g_lower:
            if any(w in all_answers_text for w in ["debat", "reading", "writing", "social", "history", "pol"]):
                reasons.append("Builds on your strengths in critical reading, structured argumentation, and social systems.")
            if not reasons:
                reasons.append("Direct professional route for corporate law, litigation, judiciary, and public policy.")
        elif "design" in g_lower or "architecture" in g_lower:
            if any(w in all_answers_text for w in ["creative", "art", "design"]):
                reasons.append("Integrates visual thinking, creative expression, and spatial problem solving.")
            if not reasons:
                reasons.append("Prepares for high-demand creative fields including UI/UX, product design, and architecture.")
        elif "arts" in g_lower or "humanities" in g_lower:
            if any(w in all_answers_text for w in ["history", "pol", "civics", "reading", "writing", "language"]):
                reasons.append("Develops deep analytical perspectives on society, human behavior, governance, and communication.")
            if not reasons:
                reasons.append("Strong academic preparation for civil services (UPSC), public policy, journalism, and research.")
        elif "defence" in g_lower:
            reasons.append("Combines technical STEM readiness with leadership, physical discipline, and national defence service.")
        else:
            reasons.append("Stage-aligned academic direction matching your selected stream and study interests.")

    elif stage == "ug":
        if "placement" in g_lower or "job" in g_lower:
            reasons.append("Prioritizes immediate industry entry, financial independence, and hands-on professional experience.")
        elif "higher studies" in g_lower:
            reasons.append("Deepens subject specialization and accelerates career trajectory through advanced postgraduate education.")
        elif "government" in g_lower or "exam" in g_lower:
            reasons.append("Prepares for leadership and administration roles in civil services, public sector undertakings, and governance.")
        elif "research" in g_lower or "phd" in g_lower:
            reasons.append("Channels academic excellence into cutting-edge research, scientific publication, and academic careers.")
        elif "entrepreneurship" in g_lower or "startup" in g_lower:
            reasons.append("Focuses on venture creation, product innovation, and solving market problems through enterprise.")
        else:
            reasons.append("Career direction aligned with your undergraduate domain and stated next-step priorities.")

    elif stage == "pg":
        if "phd" in g_lower or "research" in g_lower:
            reasons.append("Advances deep domain expertise into novel research contributions, academic faculty roles, and institutional research.")
        elif "industry" in g_lower:
            reasons.append("Applies advanced postgraduate specialization directly into high-tier industry roles and technical leadership.")
        elif "academia" in g_lower or "teaching" in g_lower:
            reasons.append("Channels deep subject mastery into higher education teaching, curriculum development, and university leadership.")
        elif "public" in g_lower or "government" in g_lower:
            reasons.append("Prepares for specialized scientific, economic, or policy advisory positions in public institutions.")
        elif "entrepreneurship" in g_lower:
            reasons.append("Translates specialized postgraduate technical or managerial depth into high-barrier venture creation.")
        else:
            reasons.append("Postgraduate trajectory matched to your specialization and long-term career goals.")
    else:
        reasons.append("Structured pathway aligned with your profile and stage targets.")

    # Add academic marks evidence if present
    for k, v in answers.items():
        if any(sub in k.lower() for sub in ["math", "science", "physics", "chemistry", "biology", "account", "economic"]):
            vm = validate_mark(v)
            if vm.get("status") == "VALID" and vm.get("normalized_percentage", 0) >= 65:
                pct = vm.get("normalized_percentage")
                sub_name = k.replace("_mark", "").replace("_score", "").replace("_", " ").title()
                reasons.append(f"Supported by your academic performance in {sub_name} ({pct}%).")

    out = []
    for r in reasons:
        if r not in out:
            out.append(r)
    return out[:4]


def format_contradiction_report(flagged_contradiction: dict | None) -> dict | None:
    """
    Formats a flagged contradiction into a structured student- and counsellor-facing report
    following the copy pattern:
    consistently_indicated -> forced_choice_revealed -> normalizing_explanation -> suggested_next_step
    """
    if not flagged_contradiction:
        return None
    audited = flagged_contradiction.get("audited_domain", "")
    opposing = flagged_contradiction.get("opposing_domain", "")
    lbl_audited = CLASS10_DOMAIN_LABELS.get(audited, audited.replace("_", " ").title())
    lbl_opposing = CLASS10_DOMAIN_LABELS.get(opposing, opposing.replace("_", " ").title())

    orig_refs = flagged_contradiction.get("original_qualifying_answers", [])
    check1_qid = flagged_contradiction.get("check_1", {}).get("question_id", "")
    check2_qid = flagged_contradiction.get("check_2", {}).get("question_id", "")
    verification_qids = [q for q in [check1_qid, check2_qid] if q]
    orig_str = f" ({', '.join(orig_refs)})" if orig_refs else ""
    verif_str = f" ({', '.join(verification_qids)})" if verification_qids else ""

    consistently_indicated = (
        f"Your earlier exploratory answers{orig_str} consistently indicated a strong orientation toward {lbl_audited}."
    )
    forced_choice_revealed = (
        f"However, in direct forced-choice real-world commitments{verif_str}, you decisively selected {lbl_opposing} instead."
    )
    normalizing_explanation = (
        "This is completely normal and expected at Class 10. Rather than an error, this reveals dual, competing inclinations "
        "that deserve intentional exploration before finalizing your stream."
    )
    suggested_next_step = (
        f"Try a 5-minute head-to-head exploration challenge comparing {lbl_audited} and {lbl_opposing}, "
        "or schedule a discussion with your counsellor to evaluate both options."
    )

    return {
        "status": "unresolved_contradiction",
        "audited_domain": audited,
        "opposing_domain": opposing,
        "audited_label": lbl_audited,
        "opposing_label": lbl_opposing,
        "consistently_indicated": consistently_indicated,
        "forced_choice_revealed": forced_choice_revealed,
        "normalizing_explanation": normalizing_explanation,
        "suggested_next_step": suggested_next_step,
        "copy_pattern": f"{consistently_indicated} {forced_choice_revealed} {normalizing_explanation} {suggested_next_step}",
        "raw": flagged_contradiction,
    }


def build_class10_direction_experience(
    answers: dict | QuestionnaireSession,
    session: QuestionnaireSession | None = None,
    domain_scores: dict[str, float] | None = None,
    answer_log: list | None = None,
    flagged_contradiction: dict | None = None,
) -> dict:
    """
    Builds the complete Class 10 'Direction After 10th' guided decision journey.
    Strictly separates INTEREST from SUITABILITY and enforces evidence maturity.
    Accepts raw answers dict, a QuestionnaireSession, or individual extracted session components.
    """
    if isinstance(answers, QuestionnaireSession):
        session = answers
        answers_dict = {a.question_id: a.option_id for a in session.answer_log}
        if domain_scores is None:
            domain_scores = session.domain_scores
        if answer_log is None:
            answer_log = session.answer_log
        if flagged_contradiction is None:
            flagged_contradiction = session.flagged_contradiction
    else:
        answers_dict = answers or {}
        if session is None and isinstance(answers_dict.get("__session__"), QuestionnaireSession):
            session = answers_dict["__session__"]
        if session is not None:
            if domain_scores is None:
                domain_scores = session.domain_scores
            if answer_log is None:
                answer_log = session.answer_log
            if flagged_contradiction is None:
                flagged_contradiction = session.flagged_contradiction

    is_adaptive = session is not None or any(k.startswith(ADAPTIVE_QUESTION_PREFIXES) for k in answers_dict.keys())
    adaptive_state = None
    if is_adaptive:
        if session is not None:
            adaptive_state = evaluate_class10_adaptive_state({"__session__": session, **answers_dict})
        else:
            adaptive_state = evaluate_class10_adaptive_state(answers_dict)
            session = adaptive_state.get("__session__")

        if domain_scores is None and adaptive_state:
            domain_scores = adaptive_state.get("domain_scores", {})
        if answer_log is None and adaptive_state:
            answer_log = adaptive_state.get("answer_log", [])
        if flagged_contradiction is None and adaptive_state:
            flagged_contradiction = adaptive_state.get("flagged_contradiction")

    signals = derive_class10_semantic_signals(answers_dict, session=session)
    hypotheses = derive_class10_competing_hypotheses(signals, answers_dict, session=session)

    # Derive semantic orientation directly from domain scores and flavor tags
    flavor_tags = session.flavor_tags if session else []
    semantic_orientation = derive_semantic_orientation(domain_scores or {}, flavor_tags=flavor_tags) if domain_scores else None
    contradiction_report = format_contradiction_report(flagged_contradiction)

    # 1. Academic Snapshot & Subject Marks (handle both flat keys and nested academic_marks dict)
    marks_dict = {}
    academic_records = []

    raw_marks_map = {}
    if isinstance(answers_dict.get("academic_marks"), dict):
        raw_marks_map.update(answers_dict["academic_marks"])
    for k, v in answers_dict.items():
        if k != "academic_marks" and isinstance(v, (int, float, str)):
            if any(sub in k.lower() for sub in ["mark", "score", "math", "science", "english", "social", "physics", "chemistry", "biology", "history", "economics"]):
                raw_marks_map[k] = v

    for sub_k, sub_v in raw_marks_map.items():
        vm = validate_mark(sub_v)
        if vm.get("status") == "VALID":
            sub_clean = sub_k.replace("_mark", "").replace("_score", "").replace("_", " ").title()
            pct = vm.get("normalized_percentage")
            marks_dict[sub_k.lower()] = pct
            academic_records.append({
                "subject": sub_clean,
                "mark": pct,
                "interpretation": "Recent school performance context",
            })

    academic_snapshot = {
        "records": academic_records,
        "disclaimer": "Your current academic evidence gives us useful context, but marks alone do not determine career direction. A mark reflects recent school examination performance, not a permanent ceiling on capability.",
    }

    # 2. Low-Evidence & Broad-Interest Evaluation
    non_empty_answers = sum(1 for v in answers_dict.values() if v and str(v).strip() and str(v) != "Not sure yet")

    fav_subjs = _as_list(answers_dict.get("favorite_subjects")) + _as_list(answers_dict.get("strong_subjects"))
    curiosities = _as_list(answers_dict.get("career_curiosity")) + _as_list(answers_dict.get("interests"))

    def _classify_interest_domain(text: str) -> str:
        t = str(text).lower()
        if any(w in t for w in ["tech", "comput", "software", "programm", "engineerin", "it", "coding"]):
            return "STEM_TECH"
        if any(w in t for w in ["biolog", "medic", "health", "pharma", "clinical", "nursing"]):
            return "STEM_BIO"
        if any(w in t for w in ["math", "physic", "chemis", "stem", "quant"]):
            return "STEM_PHYSICAL"
        if any(w in t for w in ["business", "financ", "econom", "commer", "account", "trade", "manag"]):
            return "BUSINESS"
        if any(w in t for w in ["law", "politic", "histor", "social", "psychol", "humanit", "literat", "writ"]):
            return "HUMANITIES"
        if any(w in t for w in ["art", "design", "paint", "music", "craft"]):
            return "CREATIVE"
        if any(w in t for w in ["trade", "mechanic", "electric", "voca"]):
            return "VOCATIONAL"
        return f"OTHER_{t}"

    interest_domains = set()
    for item in fav_subjs + curiosities:
        interest_domains.add(_classify_interest_domain(item))

    is_broad_interests = len(interest_domains) >= 4
    is_low_evidence = len(signals) == 0 and len(academic_records) == 0 and non_empty_answers < 2

    # Determine top-level profile status
    if flagged_contradiction:
        profile_status = "unresolved_contradiction"
    elif (session and getattr(session, "profile_status", None) == "broad_exploratory") or (semantic_orientation and semantic_orientation.get("profile_status") == "broad_exploratory") or is_broad_interests or is_low_evidence:
        profile_status = "broad_exploratory"
    else:
        profile_status = "clear"

    # 3. What We Know vs What We're Still Exploring
    what_we_know = []
    if academic_records:
        what_we_know.append(f"Academic context across {len(academic_records)} recorded subjects")
    if fav_subjs:
        what_we_know.append("Subjects you enjoy: " + ", ".join(fav_subjs[:3]))
    if answers_dict.get("work_style"):
        what_we_know.append(f"Work style preference: {answers_dict.get('work_style')}")
    if curiosities:
        what_we_know.append("Fields you are curious about: " + ", ".join(curiosities[:3]))

    still_to_explore = [
        "How strong is your mathematical reasoning beyond school textbook preference?",
        "Do you enjoy technology and computing deeply enough to pursue technical problem-solving daily?",
        "How interested are you in business and economics as real-world decision areas?",
        "How do you respond to scientific reasoning and laboratory inquiry?",
    ]

    # 4. Demonstrated Strengths vs Early Signals
    demonstrated_strengths = []
    if academic_records:
        high_marks = [f"{r['subject']} ({r['mark']}%)" for r in academic_records if r['mark'] >= 75]
        if high_marks:
            demonstrated_strengths.append(f"Academic performance in {', '.join(high_marks)}")
    if not demonstrated_strengths:
        demonstrated_strengths = ["We haven't demonstrated specific capabilities yet. No tested capability score yet. Micro-tests will validate capability."]

    early_signals = [s["description"] for s in signals]

    # 5. Candidate Generation & Validation (Stage 1 & Stage 2)
    directions_worth_exploring = []
    comparison_matrix = {}
    sig_ids = {s["id"] for s in signals}

    math_mark_high = any(pct >= 75 for sub_k, pct in marks_dict.items() if "math" in sub_k)
    sci_mark_high = any(pct >= 75 for sub_k, pct in marks_dict.items() if any(w in sub_k for w in ["science", "physics", "chemistry", "bio"]) and "social" not in sub_k)
    social_mark_high = any(pct >= 75 for sub_k, pct in marks_dict.items() if any(w in sub_k for w in ["social", "history", "civic", "politic"]) and "econ" not in sub_k)
    commerce_mark_high = any(pct >= 75 for sub_k, pct in marks_dict.items() if any(w in sub_k for w in ["commer", "account", "econ", "business"]))
    english_mark_high = any(pct >= 75 for sub_k, pct in marks_dict.items() if "english" in sub_k)

    dislikes_text = " ".join(_as_list(answers_dict.get("dislikes")) + _as_list(answers_dict.get("avoid_next_role"))).lower()

    for group_key, cat_entry in CLASS10_OPTION_VALUE_CATALOGUE.items():
        dir_id = cat_entry["direction_id"]
        
        # Calculate evidence alignment
        has_interest = False
        has_academic = False
        has_conflict = False
        
        if dir_id == "science_pcm":
            has_interest = ("technology_interest" in sig_ids or "scientific_inquiry" in sig_ids) or ("quantitative_problem_solving" in sig_ids and "business_curiosity" not in sig_ids and "social_legal_inquiry" not in sig_ids)
            has_academic = math_mark_high and sci_mark_high
            has_conflict = any(w in dislikes_text for w in ["math", "physics", "programming", "engineering", "coding"]) or (any("creative" in a.lower() for a in _as_list(answers_dict.get("work_style"))) and not has_interest)
        elif dir_id == "commerce_maths":
            has_interest = "business_curiosity" in sig_ids
            has_academic = math_mark_high and (commerce_mark_high or math_mark_high)
        elif dir_id == "science_pcb":
            has_interest = "healthcare_curiosity" in sig_ids or "scientific_inquiry" in sig_ids
            has_academic = sci_mark_high
        elif dir_id == "science_pcmb":
            has_interest = "scientific_inquiry" in sig_ids and ("healthcare_curiosity" in sig_ids or "technology_interest" in sig_ids)
            has_academic = math_mark_high and sci_mark_high
        elif dir_id == "commerce_without_maths":
            has_interest = "business_curiosity" in sig_ids
            has_academic = commerce_mark_high
        elif dir_id == "arts_humanities":
            has_interest = "social_legal_inquiry" in sig_ids or "creative_design" in sig_ids
            has_academic = english_mark_high or social_mark_high
        elif dir_id == "vocational_iti":
            has_interest = "hands_on_technical" in sig_ids
            has_academic = False

        # Determine Evidence Maturity & Decision Status
        # RULE: Interest ALONE NEVER generates STRONGLY_SUPPORTED or SUPPORTED.
        # RULE: If broad interests, do not label as STRONGLY_SUPPORTED.
        if is_adaptive and adaptive_state:
            ranked_doms = adaptive_state["ranked_domains"]
            top_stream_1 = CLASS10_DOMAIN_STREAM_MAP.get(ranked_doms[0]) if len(ranked_doms) > 0 else None
            top_stream_2 = CLASS10_DOMAIN_STREAM_MAP.get(ranked_doms[1]) if len(ranked_doms) > 1 else None

            if group_key == top_stream_1 or dir_id == top_stream_1:
                maturity = "STRONGLY_SUPPORTED"
                decision_status = "RECOMMENDED"
                alignment_label = "STRONGLY SUPPORTED"
                score = 0.94
            elif group_key == top_stream_2 or dir_id == top_stream_2:
                maturity = "SUPPORTED"
                decision_status = "SUPPORTED"
                alignment_label = "PROMISING DIRECTION"
                score = 0.86
            else:
                matching_domain = next((d for d, s in CLASS10_DOMAIN_STREAM_MAP.items() if s == group_key or s == dir_id), None)
                dom_score = adaptive_state["domain_scores"].get(matching_domain, 0.0) if matching_domain else 0.0
                score = round(max(0.30, min(0.72, 0.35 + dom_score * 0.08)), 2)
                maturity = "DEVELOPING" if score >= 0.55 else "EXPLORATORY"
                decision_status = "PROMISING" if score >= 0.55 else "EXPLORATORY"
                alignment_label = "WORTH EXPLORING"
        elif is_low_evidence:
            maturity = "INSUFFICIENT"
            decision_status = "INSUFFICIENT_EVIDENCE"
            alignment_label = "NEEDS MORE EVIDENCE"
            score = 0.20
        elif has_conflict:
            maturity = "CONFLICTING"
            decision_status = "NEEDS_VALIDATION"
            alignment_label = "NEEDS MORE EVIDENCE"
            score = 0.40
        elif is_broad_interests:
            maturity = "EXPLORATORY"
            decision_status = "EXPLORATORY"
            alignment_label = "WORTH EXPLORING"
            score = 0.50 + (0.15 if has_interest else 0.0)
        elif dir_id == "science_pcmb":
            # PCMB Guard: require strong dual academic + dual interest
            if has_academic and has_interest:
                maturity = "SUPPORTED"
                decision_status = "SUPPORTED"
                alignment_label = "PROMISING DIRECTION"
                score = 0.80
            elif has_interest:
                maturity = "EXPLORATORY"
                decision_status = "EXPLORATORY"
                alignment_label = "WORTH EXPLORING"
                score = 0.55
            else:
                maturity = "EXPLORATORY"
                decision_status = "EXPLORATORY"
                alignment_label = "WORTH EXPLORING"
                score = 0.35
        else:
            if has_academic and has_interest:
                maturity = "STRONGLY_SUPPORTED"
                decision_status = "RECOMMENDED"
                alignment_label = "STRONGLY SUPPORTED"
                score = 0.92
            elif has_academic or (has_interest and len([s for s in signals if s['id'] in sig_ids]) >= 2):
                maturity = "SUPPORTED"
                decision_status = "SUPPORTED"
                alignment_label = "PROMISING DIRECTION"
                score = 0.78
            elif has_interest:
                maturity = "DEVELOPING"
                decision_status = "PROMISING"
                alignment_label = "WORTH EXPLORING"
                score = 0.62
            else:
                maturity = "EXPLORATORY"
                decision_status = "EXPLORATORY"
                alignment_label = "WORTH EXPLORING"
                score = 0.35

        rationale_meta = generate_class10_semantic_rationale(group_key, signals, marks_dict)
        
        # Build Traceability object
        traceability = {
            "recommendationId": f"rec_{dir_id}",
            "candidateId": dir_id,
            "matchedFactors": [s["headline"] for s in signals if s["id"] in sig_ids],
            "unmatchedFactors": [f for f in ["Mathematics", "Science", "Business", "Law", "Healthcare", "Art"] if f.lower() not in " ".join(fav_subjs + curiosities).lower()],
            "evidenceSources": [src for s in signals if s["id"] in sig_ids for src in s.get("evidence_sources", [])],
            "score": round(score, 2),
            "evidenceMaturity": maturity,
            "decisionStatus": decision_status,
            "profileStatus": profile_status,
            "explanation": rationale_meta["student_rationale"],
            "generatedAt": "2026-09-22T22:46:21Z",
        }

        dir_obj = {
            "direction_id": dir_id,
            "group": group_key,
            "name": cat_entry["name"],
            "tagline": cat_entry["tagline"],
            "alignment_label": alignment_label,
            "evidence_maturity": maturity,
            "decision_status": decision_status,
            "profile_status": profile_status,
            "score": score,
            "student_rationale": rationale_meta["student_rationale"],
            "parent_rationale": rationale_meta["parent_rationale"],
            "counsellor_trace": rationale_meta["counsellor_trace"],
            "evidence_ids": rationale_meta["evidence_ids"],
            "subjects": cat_entry["subjects"],
            "keeps_open": cat_entry["keeps_open"],
            "makes_easier": cat_entry["makes_easier"],
            "constraints": cat_entry["constraints"],
            "still_to_explore": cat_entry["still_to_explore"],
            "career_families": [f["family"] for f in cat_entry["career_families"]],
            "traceability": traceability,
            "next_experiment": {
                "id": cat_entry["default_experiment_id"],
                "title": cat_entry["experiment_title"],
                "action": cat_entry["experiment_action"],
                "duration": cat_entry["duration"],
            },
        }
        directions_worth_exploring.append(dir_obj)

        comparison_matrix[dir_id] = {
            "name": cat_entry["name"],
            "current_evidence": alignment_label,
            "why_it_appears": rationale_meta["student_rationale"],
            "subjects_involved": cat_entry["subjects"],
            "keeps_open": cat_entry["keeps_open"],
            "potential_constraints": cat_entry["constraints"],
            "still_to_explore": cat_entry["still_to_explore"],
            "next_experiment": {
                "title": cat_entry["experiment_title"],
                "action": cat_entry["experiment_action"],
                "duration": cat_entry["duration"],
            },
        }

    # Sort candidates by score descending
    directions_worth_exploring.sort(key=lambda d: d["score"], reverse=True)

    # Broad Interest Advisory note if applicable
    broad_interest_advisory = None
    if is_broad_interests:
        broad_interest_advisory = "You have expressed interest across multiple distinct domain areas (e.g. Science, Business, Law, Healthcare). Self-reported interest alone does not indicate stream suitability. We recommend taking targeted capability challenges to narrow down your focus."

    # Filter active hypotheses — for adaptive profiles, top-2 hypotheses are always active; for legacy, require close competition
    if is_adaptive and hypotheses:
        active_competing_hypotheses = hypotheses
    else:
        active_competing_hypotheses = hypotheses if (len(directions_worth_exploring) >= 2 and abs(directions_worth_exploring[0]["score"] - directions_worth_exploring[1]["score"]) <= 0.15) else []

    # Map layer nodes
    has_quant = "quantitative_problem_solving" in sig_ids
    has_tech = "technology_interest" in sig_ids
    has_biz = "business_curiosity" in sig_ids
    has_sci = "scientific_inquiry" in sig_ids
    has_health = "healthcare_curiosity" in sig_ids
    has_social = "social_legal_inquiry" in sig_ids
    has_design = "creative_design" in sig_ids

    decision_map = {
        "statement": "Your evidence connects your current learning interests to streams and downstream degree pathways without locking you into a single career.",
        "layers": [
            {
                "layer_id": "interests",
                "title": "Your Emerging Signals",
                "nodes": [
                    {"id": "sig_quant", "label": "Quantitative Problem Solving", "icon": "calculator", "active": has_quant},
                    {"id": "sig_tech", "label": "Technology Interest", "icon": "laptop", "active": has_tech},
                    {"id": "sig_biz", "label": "Business Curiosity", "icon": "briefcase", "active": has_biz},
                    {"id": "sig_health", "label": "Healthcare & Biology", "icon": "heart", "active": has_health},
                    {"id": "sig_social", "label": "Social & Legal Inquiry", "icon": "scale", "active": has_social},
                    {"id": "sig_design", "label": "Creative & Design", "icon": "palette", "active": has_design},
                ],
            },
            {
                "layer_id": "streams",
                "title": "Stream Directions",
                "nodes": [
                    {"id": "str_pcm", "label": "Science + Maths (PCM)", "direction_id": "science_pcm", "active": has_quant and (has_tech or has_sci)},
                    {"id": "str_comm_math", "label": "Commerce + Maths", "direction_id": "commerce_maths", "active": has_quant and has_biz},
                    {"id": "str_pcb", "label": "Science + Biology (PCB)", "direction_id": "science_pcb", "active": has_sci or has_health},
                    {"id": "str_arts", "label": "Humanities / Social Sciences", "direction_id": "arts_humanities", "active": has_social or has_design},
                ],
            },
            {
                "layer_id": "sectors",
                "title": "Career Sectors Kept Open",
                "nodes": [
                    {"id": "sec_eng_tech", "label": "Engineering & Technology", "active": has_quant and (has_tech or has_sci)},
                    {"id": "sec_data_ai", "label": "Data & Computing Systems", "active": has_quant},
                    {"id": "sec_finance", "label": "Finance, FinTech & Business", "active": has_biz},
                    {"id": "sec_health", "label": "Healthcare & Life Sciences", "active": has_health},
                    {"id": "sec_law_policy", "label": "Law, Public Policy & Governance", "active": has_social},
                ],
            },
        ],
        "connections": [
            {"from": "sig_quant", "to": "str_pcm", "active": has_quant},
            {"from": "sig_tech", "to": "str_pcm", "active": has_tech},
            {"from": "sig_quant", "to": "str_comm_math", "active": has_quant},
            {"from": "sig_biz", "to": "str_comm_math", "active": has_biz},
            {"from": "sig_health", "to": "str_pcb", "active": has_health},
            {"from": "sig_social", "to": "str_arts", "active": has_social},
            {"from": "str_pcm", "to": "sec_eng_tech", "active": has_quant and (has_tech or has_sci)},
            {"from": "str_pcm", "to": "sec_data_ai", "active": has_quant},
            {"from": "str_comm_math", "to": "sec_finance", "active": has_biz},
            {"from": "str_pcb", "to": "sec_health", "active": has_health},
            {"from": "str_arts", "to": "sec_law_policy", "active": has_social},
        ],
    }

    # Targeted micro-test selection (Information-Gain Logic)
    if flagged_contradiction and contradiction_report:
        smart_exp = {
            "experiment_id": "contradiction_resolution",
            "title": f"Compare {contradiction_report['audited_label']} vs {contradiction_report['opposing_label']}",
            "action_text": "Try the 5-minute Head-to-Head Discovery Challenge",
            "rationale": contradiction_report["suggested_next_step"],
            "duration": "5 mins",
        }
    elif active_competing_hypotheses:
        comp_hyp = active_competing_hypotheses[0]
        hyp_title = comp_hyp.get("title") or comp_hyp.get("name", "Direction Comparison")
        hyp_unknown = comp_hyp.get("key_unknowns") or comp_hyp.get("key_unknown", "")
        smart_exp = {
            "experiment_id": comp_hyp.get("experiment_id", "tech_problem_solving"),
            "title": hyp_title,
            "action_text": f"Try the 5-minute {hyp_title} Challenge",
            "rationale": f"Resolves key uncertainty: {hyp_unknown}",
            "duration": "5 mins",
        }
    else:
        smart_exp = {
            "experiment_id": "tech_problem_solving" if has_quant else "business_simulation",
            "title": "Core Interest Exploration",
            "action_text": "Try a 5-minute guided discovery challenge",
            "rationale": "This challenge provides maximum clarity on your problem-solving style with minimal time investment.",
            "duration": "5 mins",
        }

    verification_insights_list = list(adaptive_state.get("verification_insights", [])) if is_adaptive and adaptive_state else []
    if contradiction_report and contradiction_report.get("copy_pattern"):
        if contradiction_report["copy_pattern"] not in verification_insights_list:
            verification_insights_list.insert(0, contradiction_report["copy_pattern"])

    counsellor_view = {
        "profile_status": profile_status,
        "semantic_orientation": semantic_orientation,
        "flagged_contradiction": flagged_contradiction,
        "contradiction_report": contradiction_report,
        "flags": adaptive_state.get("flags", {}) if adaptive_state else {},
        "verification_log": getattr(session, "verification_log", []) if session else [],
    }

    answer_log_final = []
    if is_adaptive and adaptive_state:
        answer_log_final = list(adaptive_state.get("answer_log", []))
    if not answer_log_final and isinstance(answers_dict, dict):
        for q_key, q_val in answers_dict.items():
            if q_key.startswith("__") or q_key in ("academic_marks",):
                continue
            matching_q = next((q for q in QUESTION_SETS.get("class10", []) if q["id"] == q_key), None)
            q_text = matching_q["question"] if matching_q else q_key.replace("_", " ").title()
            val_text = ", ".join(q_val) if isinstance(q_val, list) else str(q_val)
            answer_log_final.append({
                "question_id": q_key,
                "question": q_text,
                "selected_option": val_text,
                "phase": 1,
                "tier": "standard",
            })

    return {
        "hero": {
            "header": "YOUR DIRECTION AFTER 10TH",
            "subtitle": "Based on your academic profile, preferred subjects, and problem-solving style, here are the stream directions worth exploring.",
            "summary_tagline": "Class 10 is a stream choice, not a lifelong career choice. Focus on keeping degree pathways open.",
        },
        "profile_status": profile_status,
        "semantic_orientation": semantic_orientation,
        "flagged_contradiction": flagged_contradiction,
        "contradiction_report": contradiction_report,
        "counsellor_view": counsellor_view,
        "signals_understood": signals,
        "what_we_know_vs_learning": {
            "what_we_know": what_we_know,
            "still_to_explore": still_to_explore,
        },
        "academic_snapshot": academic_snapshot,
        "demonstrated_vs_early_signals": {
            "demonstrated_strengths": demonstrated_strengths,
            "early_signals": early_signals,
        },
        "competing_hypotheses": active_competing_hypotheses,
        "directions_worth_exploring": directions_worth_exploring,
        "comparison_matrix": comparison_matrix,
        "decision_map": decision_map,
        "smart_exploration": smart_exp,
        "is_low_evidence": is_low_evidence,
        "is_broad_interests": is_broad_interests,
        "broad_interest_advisory": broad_interest_advisory,
        "low_evidence_guidance": {
            "title": "There's not enough information yet to narrow your direction.",
            "what_we_know": ["No strong subject or activity preferences recorded yet."],
            "what_we_dont_know": ["Favorite subjects", "Work style preferences", "Curiosity areas"],
            "why_it_matters": "Without evidence, choosing a stream is based on guesswork. Gathering 5 minutes of input keeps your future choices clear and intentional.",
            "next_action": "Take a 5-minute discovery challenge to uncover your first signals.",
        },
        "next_steps": {
            "guidance_message": "Your current evidence suggests that you have more than one interesting direction. The next useful step is to explore the areas where your evidence is still uncertain.",
            "actions": [
                {"label": "Try a 5-minute exploration", "action": "open_experiment", "primary": True},
                {"label": "Compare these directions", "action": "open_comparison", "primary": False},
                {"label": "See subjects & pathways", "action": "scroll_directions", "primary": False},
                {"label": "Talk to a counsellor", "action": "open_counsellor", "primary": False},
            ],
        },
        "journey_close": {
            "title": "YOUR CAREER JOURNEY IS JUST STARTING",
            "message": "You don't need to have your final career figured out after 10th. The goal right now is to understand yourself better, keep the right options open, and gather better evidence before making important decisions.",
        },
        "answer_log": answer_log_final,
        "adaptive_state": {
            "domain_scores": adaptive_state.get("domain_scores", {}),
            "ranked_domains": adaptive_state.get("ranked_domains", []),
            "answer_log": answer_log_final,
            "verification_insights": verification_insights_list,
            "flags": adaptive_state.get("flags", {}),
            "current_phase": adaptive_state.get("current_phase", 1),
            "phase_title": adaptive_state.get("phase_title", ""),
            "total_answered": adaptive_state.get("total_answered", 0),
            "total_estimated": adaptive_state.get("total_estimated", 10),
        } if is_adaptive and adaptive_state else None,
        "verification_insights": verification_insights_list,
    }


CLASS10_SUBJECT_OVERVIEW = {
    "Science (PCM — Physics, Chemistry, Maths)": ["Physics", "Chemistry", "Mathematics"],
    "Science (PCB — Physics, Chemistry, Biology)": ["Physics", "Chemistry", "Biology"],
    "Science (PCMB — all four)": ["Physics", "Chemistry", "Mathematics", "Biology"],
    "Commerce (with Maths)": ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    "Commerce (without Maths)": ["Accountancy", "Business Studies", "Economics"],
    "Arts/Humanities": ["History / Political Science", "Languages", "Sociology / Psychology"],
    "Vocational/ITI": ["Trade practicals", "Workshop safety", "Basic applied science"],
}


GROUP_CONSIDERATIONS = {
    "Science (PCM — Physics, Chemistry, Maths)": ["Requires consistent Mathematics practice.", "Physics and Chemistry depth matters."],
    "Science (PCB — Physics, Chemistry, Biology)": ["Biology-heavy study load.", "Medical routes often need long-term preparation."],
    "Science (PCMB — all four)": ["Heavier subject load.", "Best when genuinely undecided."],
    "Commerce (with Maths)": ["Math helps in finance and analytics routes."],
    "Commerce (without Maths)": ["Lighter quantitative load.", "Good to pair with communication skills."],
    "Arts/Humanities": ["Strong reading and writing habits helpful.", "Excellent for law, policy, civil services."],
    "Vocational/ITI": ["Hands-on learning essential."],
}


def _as_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def _split_directions(useful_for: str) -> list[str]:
    parts = [chunk.strip().strip(".") for chunk in useful_for.replace(";", ",").split(",")]
    return [p for p in parts if p][:6]


def _group_subject_overview(stage: str, group_name: str) -> list[str]:
    if stage == "class10":
        return CLASS10_SUBJECT_OVERVIEW.get(group_name, [])
    if "Engineering" in group_name: return ["Core domain fundamentals", "Problem solving", "Project/lab work"]
    if "Medicine" in group_name: return ["Biology and health sciences", "Clinical foundations", "Entrance-driven preparation"]
    if "Law" in group_name: return ["Legal reasoning", "Reading and writing", "Case analysis"]
    if "Commerce" in group_name: return ["Accounting", "Business studies", "Economics / quantitative reasoning"]
    if "Research" in group_name or "PhD" in group_name: return ["Research methodology", "Domain depth", "Academic writing"]
    return []


def _summary_attributes(answers: dict) -> list[str]:
    attributes = []
    keys = ["favorite_subjects", "strong_subjects", "career_curiosity", "work_style", "next_step_interest", "target_field", "stream", "preferred_degree_type"]
    for key in keys:
        for item in _as_list(answers.get(key)):
            if item not in attributes:
                attributes.append(item)
            if len(attributes) >= 4:
                return attributes
    return attributes


def build_adaptive_question_set(stage: str, answers: dict) -> dict:
    """Return stage-aware metadata and a capped question list.

    The product spec requires that we assess a user with a separate Career DNA
    flow, keep the real profile stage intact, and avoid asking more than the
    capped number of questions needed for a robust evaluation.
    """
    stage_key = (stage or "class10").lower()
    base_questions = QUESTION_SETS.get(stage_key, QUESTION_SETS.get("class10", []))
    metadata = STAGE_METADATA.get(stage_key, STAGE_METADATA["class10"]).copy()
    cap = max(1, int(metadata.get("question_cap", 10)))
    selected_ids = ADAPTIVE_QUESTION_IDS.get(stage_key)
    if selected_ids:
        question_by_id = {question["id"]: question for question in base_questions}
        questions = [question_by_id[item_id] for item_id in selected_ids if item_id in question_by_id]
    else:
        questions = base_questions[:cap]

    # Keep the flow deterministic while still allowing stage-specific adaptation.
    if stage_key == "job_switcher":
        if answers.get("target_role_status") and str(answers.get("target_role_status")).lower() == "no":
            questions = [q for q in questions if q["id"] != "target_role"]
    elif stage_key in {"class10", "class12"}:
        if answers.get("career_curiosity") or answers.get("preferred_degree_type"):
            questions = [q for q in questions if q["id"] not in {"family_constraints", "preferred_degree_type"}][:cap]

    return {
        "stage": stage_key,
        "question_cap": cap,
        "required_dimensions": metadata.get("required_dimensions", []),
        "questions": questions,
        "ruleset_version": metadata.get("ruleset_version", "career_dna_v1"),
        "adaptive_reasoning": "Use the minimum necessary questions to score the user against each stage-specific path family.",
    }


def detect_path_type(stage: str, answers: dict, target_text: str) -> str:
    """Classify the target path described by the user.

    This is intentionally lightweight and explainable: a target that requires a
    formal professional qualification or legal registration is treated as a
    regulated path, while general career and study routes remain separate.
    """
    text = str(target_text or "").strip().lower()
    if not text:
        return "general_career"

    normalized = re.sub(r"[^a-z0-9\s]", " ", text)
    normalized = re.sub(r"\s+", " ", normalized).strip()

    for path_type, keywords in PATH_TYPE_RULES.items():
        if any(keyword in normalized for keyword in keywords):
            return path_type

    # Re-check explicit certification words after punctuation cleanup.
    if any(token in normalized for token in ["ca ", "chartered accountant", "cfa", "company secretary"]):
        return "professional_certification"
    if any(token in normalized for token in ["doctor", "medicine", "architect", "pilot", "lawyer", "teacher", "nurse"]):
        return "regulated_licensure"
    if any(token in normalized for token in ["mba", "mtech", "phd", "masters", "higher studies", "research"]):
        return "specialized_study"
    return "general_career"


def _get_domain_tailored_catalogue(stage: str, answers: dict) -> list[dict]:
    catalogue = GROUP_CATALOGUE.get(stage, [])
    if stage != "ug":
        return catalogue

    degree_text = (
        str(answers.get("degree_branch", "")) + " " +
        str(answers.get("skills_so_far", "")) + " " +
        str(answers.get("target_field", ""))
    ).lower()

    # 1. Computer Applications / CS / IT (BCA, B.Sc CS/IT, Diploma CS, Software)
    if any(kw in degree_text for kw in ["bca", "computer application", "b.sc it", "bsc it", "b.sc cs", "bsc cs", "software"]):
        return [
            {
                "group": "Higher Studies — MCA / M.Sc Computer Science / MBA (Tech Management)",
                "useful_for": "Specialization in Software Architecture, Advanced Algorithms, qualifying for Tier-1 Tech placements.",
                "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"],
                "what_you_will_study": ["Advanced Data Structures & Algorithms", "Cloud Computing & DevOps", "Full-Stack System Design", "Database Management"],
                "can_lead_towards": ["MCA", "M.Sc Computer Science", "MBA (IT Management)", "Software Architect"],
            },
            {
                "group": "Software Engineering & Industry Placement",
                "useful_for": "Immediate entry into software engineering, web development, QA, or IT consulting roles.",
                "signals": ["Placement/job immediately"],
                "what_you_will_study": ["Full-Stack Web Dev (React/Node)", "Data Structures & Algorithms", "System Architecture & Git"],
                "can_lead_towards": ["Frontend/Backend Developer", "Full Stack Engineer", "DevOps Engineer"],
            },
            {
                "group": "Government Tech & Civil Services (NIC / ISRO / Banking PO / SSC CGL)",
                "useful_for": "Scientist/Engineer posts in NIC/ISRO, IT Officers in Banks, or Civil Services.",
                "signals": ["Competitive government exams (UPSC/banking/SSC)"],
                "what_you_will_study": ["CS Technical Aptitude", "Quantitative & Reasoning Ability", "General Awareness"],
                "can_lead_towards": ["NIC Scientist-B", "Bank IT Officer (IBPS SO)", "ISRO Technical Assistant"],
            },
            {
                "group": "Computer Science Research & Academia (M.S. / PhD)",
                "useful_for": "R&D labs, AI/ML research fellowships, and university faculty positions.",
                "signals": ["Research/PhD"],
                "what_you_will_study": ["Machine Learning & AI", "Research Methodologies", "Academic Publishing"],
                "can_lead_towards": ["M.S. by Research", "PhD in Computer Science", "AI Research Scientist"],
            },
            {
                "group": "Tech Startup, SaaS, or Independent Development",
                "useful_for": "Building digital software products, web/mobile app agencies, or micro-SaaS ventures.",
                "signals": ["Entrepreneurship/startup"],
                "what_you_will_study": ["Product Management", "SaaS Bootstrapping", "Client Acquisition & MVP"],
                "can_lead_towards": ["Tech Founder", "Freelance Software Engineer", "SaaS Builder"],
            },
        ]

    # 2. Engineering (B.Tech / B.E.)
    if any(kw in degree_text for kw in ["b.tech", "btech", "b.e", "be ", "engineering"]):
        return [
            {
                "group": "Higher Studies — M.Tech / MS in CS/AI / MBA (GATE / GRE / CAT)",
                "useful_for": "Deep engineering specialization, research labs, tier-1 tech salaries, or leadership roles.",
                "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"],
                "what_you_will_study": ["Advanced Core Engineering", "Machine Learning & Systems", "Research Project"],
                "can_lead_towards": ["M.Tech (IITs/NITs)", "MS in US/Germany", "MBA (IIMs/ISB)"],
            },
            {
                "group": "Core Engineering & Technology Industry Placement",
                "useful_for": "Immediate entry into software engineering, core hardware/electronics, or tech consulting.",
                "signals": ["Placement/job immediately"],
                "what_you_will_study": ["Domain Engineering Skills", "Coding & DSA", "System Design"],
                "can_lead_towards": ["Software Engineer", "Core Field Engineer", "Tech Consultant"],
            },
            {
                "group": "Engineering Services & PSU Jobs (IES / GATE PSU / Civil Services)",
                "useful_for": "Indian Engineering Services (IES), Officer posts in ONGC/IOCL/NTPC via GATE, or IAS/IPS.",
                "signals": ["Competitive government exams (UPSC/banking/SSC)"],
                "what_you_will_study": ["GATE Syllabus", "General Engineering Aptitude", "General Studies"],
                "can_lead_towards": ["IES Officer", "PSU Executive Engineer", "UPSC Civil Servant"],
            },
            {
                "group": "Engineering R&D & Global Doctorate (PhD / Fellowships)",
                "useful_for": "High-impact industrial R&D labs, patents, and global academic appointments.",
                "signals": ["Research/PhD"],
                "what_you_will_study": ["Advanced Mathematics", "Experimental R&D", "Paper Publications"],
                "can_lead_towards": ["Industrial R&D Scientist", "PhD Fellow", "Professor"],
            },
            {
                "group": "DeepTech & Engineering Startup",
                "useful_for": "Building hardware/software engineering products, robotics, AI systems, or tech consulting.",
                "signals": ["Entrepreneurship/startup"],
                "what_you_will_study": ["Prototyping & Hardware/Software MVP", "Venture Pitching", "Product IP"],
                "can_lead_towards": ["DeepTech Founder", "Chief Technology Officer (CTO)"],
            },
        ]

    # 3. Commerce & Management (B.Com / BBA / BMS)
    if any(kw in degree_text for kw in ["b.com", "bcom", "bba", "bms", "commerce", "finance", "accounting"]):
        return [
            {
                "group": "Higher Studies — MBA (CAT/GMAT) / M.Com / CA / CFA",
                "useful_for": "Investment banking, corporate finance, management consulting, or chartered accountancy.",
                "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"],
                "what_you_will_study": ["Corporate Finance", "Strategic Management", "Financial Modeling"],
                "can_lead_towards": ["MBA (Top B-Schools)", "CA / CFA Charterholder", "M.Com"],
            },
            {
                "group": "Finance, Accounting, & Corporate Placement",
                "useful_for": "Immediate roles in financial analysis, auditing, business operations, or digital marketing.",
                "signals": ["Placement/job immediately"],
                "what_you_will_study": ["Advanced Excel & PowerBI", "Financial Accounting", "Corporate Communication"],
                "can_lead_towards": ["Financial Analyst", "Audit Associate", "Operations Executive"],
            },
            {
                "group": "Banking & Government Officers (RBI Grade B / SEBI / Bank PO / SSC CGL)",
                "useful_for": "Officer cadres in Reserve Bank of India, SEBI, Public Sector Banks, or Revenue Services.",
                "signals": ["Competitive government exams (UPSC/banking/SSC)"],
                "what_you_will_study": ["Financial Systems & Economics", "Reasoning & Quantitative Aptitude"],
                "can_lead_towards": ["RBI Grade B Officer", "Bank PO (IBPS/SBI)", "SSC CGL Income Tax Officer"],
            },
            {
                "group": "Financial Economics & Business Research",
                "useful_for": "Think tanks, economic policy institutes, and academic research.",
                "signals": ["Research/PhD"],
                "what_you_will_study": ["Econometrics", "Statistical Research", "Market Analytics"],
                "can_lead_towards": ["Economic Researcher", "PhD in Commerce/Economics"],
            },
            {
                "group": "Fintech, E-Commerce, or Business Venture",
                "useful_for": "Launching a commerce brand, financial advisory, e-commerce store, or business agency.",
                "signals": ["Entrepreneurship/startup"],
                "what_you_will_study": ["Business Model Design", "Digital Marketing & Growth", "Financial Planning"],
                "can_lead_towards": ["E-Commerce Founder", "Financial Consultant", "Business Owner"],
            },
        ]

    # 4. Medical / Healthcare (MBBS / BDS / BAMS / Nursing)
    if any(kw in degree_text for kw in ["mbbs", "bds", "bams", "nursing", "medical"]):
        return [
            {
                "group": "Medical Specialization — MD / MS / DNB / M.Sc Nursing",
                "useful_for": "Clinical specialization, hospital leadership, surgical practice, or super-specialization.",
                "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"],
                "what_you_will_study": ["Clinical Specialization Subjects", "Hospital Residency", "Patient Management"],
                "can_lead_towards": ["MD Specialist", "MS Surgeon", "DNB Senior Resident"],
            },
            {
                "group": "Clinical Practice & Hospital Residency",
                "useful_for": "Immediate entry into hospital junior residency, clinical duty doctor, or general practice.",
                "signals": ["Placement/job immediately"],
                "what_you_will_study": ["Emergency Care", "Clinical Diagnostics", "Pharmacology"],
                "can_lead_towards": ["Junior Resident Doctor", "General Physician", "Medical Officer"],
            },
            {
                "group": "Public Health & Government Medical Officer (UPSC CMS / WHO / State Health)",
                "useful_for": "Combined Medical Services officer posts, public health administration, and WHO policy.",
                "signals": ["Competitive government exams (UPSC/banking/SSC)"],
                "what_you_will_study": ["Epidemiology", "Public Health Policy", "Preventive Medicine"],
                "can_lead_towards": ["UPSC Medical Officer", "Public Health Specialist"],
            },
            {
                "group": "Clinical Research & Public Health (MPH / PhD in Medical Sciences)",
                "useful_for": "Pharma clinical trials, epidemiology research, and biomedical research.",
                "signals": ["Research/PhD"],
                "what_you_will_study": ["Biostatistics", "Clinical Trial Design", "Epidemiological Research"],
                "can_lead_towards": ["Master of Public Health (MPH)", "Clinical Trial Scientist"],
            },
            {
                "group": "HealthTech, Clinic Chain, or Healthcare Consultancy",
                "useful_for": "Setting up private clinics, tele-medicine platforms, or digital health startups.",
                "signals": ["Entrepreneurship/startup"],
                "what_you_will_study": ["Healthcare Management", "Telemedicine Technology", "Clinic Operations"],
                "can_lead_towards": ["Clinic Founder", "HealthTech Entrepreneur"],
            },
        ]

    # 5. Law (LLB / BA LLB)
    if any(kw in degree_text for kw in ["llb", "law", "legal"]):
        return [
            {
                "group": "Legal Postgraduation — LLM (Corporate Law / Cyber Law / IPR)",
                "useful_for": "Specialization in international corporate law, intellectual property, or cyber law.",
                "signals": ["Higher studies (M.Tech/MBA/MS)", "Study abroad"],
                "what_you_will_study": ["Comparative Constitutional Law", "Corporate & Securities Law", "IPR & Tech Law"],
                "can_lead_towards": ["LLM Specialist", "Corporate Law Consultant"],
            },
            {
                "group": "Law Firm Associate & Corporate Legal Counsel",
                "useful_for": "Immediate practice in corporate law firms, litigation chambers, or in-house legal teams.",
                "signals": ["Placement/job immediately"],
                "what_you_will_study": ["Drafting & Conveyancing", "Contract Negotiation", "Courtroom Advocacy"],
                "can_lead_towards": ["Law Firm Associate", "In-House Counsel", "Litigation Lawyer"],
            },
            {
                "group": "Judicial Services & Public Prosecutor (PCS-J / Civil Services)",
                "useful_for": "Civil Judge / Judicial Magistrate posts, Public Prosecutor, or IAS/IPS.",
                "signals": ["Competitive government exams (UPSC/banking/SSC)"],
                "what_you_will_study": ["Civil & Criminal Procedure", "IPC & Evidence Act", "Constitutional Law"],
                "can_lead_towards": ["Civil Judge (PCS-J)", "Public Prosecutor", "UPSC Officer"],
            },
            {
                "group": "Legal Policy & Academic Research (PhD in Law / LLD)",
                "useful_for": "Legal think tanks, constitutional policy research, and law university faculty.",
                "signals": ["Research/PhD"],
                "what_you_will_study": ["Jurisprudence", "Legal Methodologies", "Policy Analysis"],
                "can_lead_towards": ["Legal Researcher", "Law Professor"],
            },
            {
                "group": "LegalTech, Independent Practice, or Legal Consultancy",
                "useful_for": "Independent chamber practice, legaltech software, or compliance consulting.",
                "signals": ["Entrepreneurship/startup"],
                "what_you_will_study": ["Chamber Management", "LegalTech Automation", "Client Relations"],
                "can_lead_towards": ["Independent Advocate", "LegalTech Founder"],
            },
        ]

    return catalogue


def _score_entry(stage: str, entry: dict, answers: dict) -> tuple[float, list[str], int]:
    signals_for_group = [s.lower() for s in entry.get("signals", [])]
    
    all_user_answers = []
    for k, v in answers.items():
        all_user_answers.extend(_as_list(v))
    
    score = 0.0
    overlap = 0
    reasons = []
    matched_clusters = set()

    # Positive scoring with controlled correlation (Section 14 & 15: Anti-Double Counting)
    for answer in all_user_answers:
        if not answer: continue
        answer_lower = answer.lower()
        matches_exact = answer_lower in signals_for_group
        matches_substr = any(sig in answer_lower or answer_lower in sig for sig in signals_for_group)
        
        if matches_exact or matches_substr:
            # Check cluster to prevent double counting
            matched_c = None
            for c_name, c_kws in CORRELATED_CLUSTERS.items():
                if any(kw in answer_lower for kw in c_kws):
                    matched_c = c_name
                    break
            
            if matched_c and matched_c in matched_clusters:
                # Controlled addition to avoid inflated scores
                score += 5.0
            else:
                if matched_c:
                    matched_clusters.add(matched_c)
                overlap += 1
                score += 35.0 if matches_exact else 18.0

    # Add academic marks evidence (Direct Facts)
    group_title_lower = entry.get("group", "").lower()
    for k, v in answers.items():
        if any(sub in k.lower() for sub in ["math", "science", "english", "social"]):
            vm = validate_mark(v)
            if vm.get("status") == "VALID" and vm.get("normalized_percentage", 0) >= 65:
                pct = vm.get("normalized_percentage")
                if "math" in k.lower() and any(w in group_title_lower for w in ["math", "pcm", "engineering", "commerce", "analytics"]):
                    score += 18.0
                    reasons.append(f"Supported by your academic performance in Mathematics ({pct}%).")
                elif "science" in k.lower() and any(w in group_title_lower for w in ["science", "pcb", "pcm", "medical", "tech"]):
                    score += 18.0
                    reasons.append(f"Supported by your academic performance in Science ({pct}%).")

    semantic_reasons = generate_stage_reasons_for_group(stage, entry.get("group", ""), answers)
    if semantic_reasons:
        reasons = semantic_reasons

    # Remove duplicates from reasons
    unique_reasons = []
    for r in reasons:
        if r not in unique_reasons:
            unique_reasons.append(r)

    if not unique_reasons:
        unique_reasons.append("Standard foundational pathway for your academic stage.")

    return score, unique_reasons[:4], overlap


def _normalize_scores(scored_items: list[dict], stage: str = "") -> None:
    if not scored_items:
        return
    
    raw_scores = [item["raw_score"] for item in scored_items]
    low = min(raw_scores)
    high = max(raw_scores)

    for item in scored_items:
        if high <= 0:
            item["match_score"] = 50
            item["alignment_label"] = "WORTH EXPLORING"
            item["eligibility_status"] = "ELIGIBLE"
            continue

        if high == low:
            item["match_score"] = 70
            if stage == "class10":
                item["alignment_label"] = "PROMISING DIRECTION" if item["overlap"] > 0 else "WORTH EXPLORING"
            else:
                item["alignment_label"] = "PROMISING DIRECTION" if item["overlap"] > 0 else "WORTH EXPLORING"
            item["eligibility_status"] = "ELIGIBLE"
            continue
            
        # Normalize internal diagnostic ranking score (capped at 86, never 92%, 98%, or 100% fake certainty)
        normalized = 50 + ((item["raw_score"] - low) / (high - low)) * 34
        item["match_score"] = min(86, round(normalized))

        # Assign qualitative alignment label (deterministic meaning for Class 10)
        if stage == "class10":
            if item["match_score"] >= 78 and item["overlap"] >= 2:
                item["alignment_label"] = "STRONGLY SUPPORTED"
            elif item["match_score"] >= 65 and item["overlap"] >= 1:
                item["alignment_label"] = "PROMISING DIRECTION"
            elif item["overlap"] >= 1 or item["match_score"] >= 55:
                item["alignment_label"] = "WORTH EXPLORING"
            else:
                item["alignment_label"] = "NEEDS MORE EVIDENCE"
        else:
            if item["match_score"] >= 78 and item["overlap"] >= 1:
                item["alignment_label"] = "STRONG ALIGNMENT"
            elif item["match_score"] >= 65:
                item["alignment_label"] = "PROMISING DIRECTION"
            else:
                item["alignment_label"] = "WORTH EXPLORING"

        item["eligibility_status"] = "ELIGIBLE"



PROFESSIONAL_ROLE_REQUIREMENTS = {
    "doctor": ["Clinical diagnosis", "Patient care", "Medical ethics", "Healthcare communication", "Documentation", "Team coordination"],
    "physician": ["Clinical diagnosis", "Patient care", "Medical ethics", "Healthcare communication", "Documentation", "Team coordination"],
    "teacher": ["Instruction", "Lesson planning", "Curriculum planning", "Classroom management", "Assessment", "Communication", "Student support"],
    "accountant": ["Accounting", "Audit review", "Financial reporting", "Tax compliance", "Excel", "Stakeholder communication"],
    "engineer": ["Technical problem solving", "System design", "Quality assurance", "Documentation", "Cross-functional collaboration", "Domain fundamentals"],
    "software engineer": ["Programming", "Data structures", "Git", "SQL", "Testing", "System design"],
    "data engineer": ["Programming", "Python", "SQL", "ETL", "Data pipelines", "Data warehousing", "Cloud", "Spark"],
    "data analyst": ["SQL", "Python", "Statistics", "Excel", "Data visualization", "Business analysis"],
    "data scientist": ["Python", "SQL", "Statistics", "Machine learning", "Data visualization"],
    "devops engineer": ["Linux", "Git", "Docker", "CI/CD", "Cloud", "Scripting", "Monitoring"],
    "cloud engineer": ["Linux", "Networking", "Cloud", "Docker", "Infrastructure as code", "Security"],
    "cybersecurity analyst": ["Networking", "Linux", "Security", "Threat analysis", "Incident response", "Scripting"],
    "product manager": ["Product discovery", "Communication", "Prioritization", "User research", "Analytics", "Stakeholder management"],
    "manager": ["Team leadership", "Planning", "People management", "Communication", "Stakeholder management", "Decision making"],
    "business analyst": ["Requirements analysis", "SQL", "Excel", "Data visualization", "Communication", "Process mapping"],
    "ui/ux designer": ["User research", "Figma", "Interaction design", "Visual design", "Prototyping", "Portfolio"],
    "sales": ["Customer relationship management", "Sales pipeline", "Negotiation", "Communication", "Target achievement", "Market understanding"],
    "hr": ["Recruitment", "Employee relations", "Policy handling", "Communication", "Documentation", "People management"],
    "lawyer": ["Legal research", "Contract review", "Case analysis", "Communication", "Documentation", "Client advisory"],
    "nurse": ["Patient care", "Clinical procedures", "Healthcare communication", "Documentation", "Team support", "Safety protocols"],
}

PROFESSIONAL_ROLE_FAMILIES = {
    "doctor": ["doctor", "physician", "surgeon", "dentist", "cardiologist", "pediatrician", "radiologist", "mbbs", "medical officer", "general practitioner"],
    "teacher": ["teacher", "faculty", "lecturer", "trainer", "educator", "instructor"],
    "accountant": ["accountant", "chartered accountant", "finance", "audit", "bookkeeper"],
    "engineer": ["engineer", "engineering", "developer", "architect", "mechanical", "civil", "electrical", "electronics", "production", "manufacturing"],
    "manager": ["manager", "team lead", "project manager", "product manager", "operations manager", "program manager", "lead"],
    "analyst": ["analyst", "research analyst", "financial analyst", "business analyst"],
    "designer": ["designer", "uiux", "ux", "ui", "product designer", "graphic designer"],
    "sales": ["sales", "business development", "account manager", "relationship manager", "marketing executive"],
    "hr": ["hr", "human resources", "recruiter", "talent acquisition"],
    "lawyer": ["lawyer", "advocate", "legal", "counsel"],
    "nurse": ["nurse", "nursing", "clinical", "healthcare"],
}

PROFESSIONAL_ALIASES = {
    "spring boot": "Programming", "java": "Programming", "python": "Python", "sql": "SQL",
    "mysql": "SQL", "sql / databases": "SQL", "database": "SQL", "databases": "SQL",
    "rest api": "API development", "rest apis": "API development", "backend development": "Programming",
    "data analysis": "Data analysis", "excel": "Excel", "communication": "Communication",
    "git": "Git", "git & version control": "Git", "docker": "Docker", "linux": "Linux",
    "cloud": "Cloud", "react": "Frontend development", "testing": "Testing",
    "clinical diagnosis": "Clinical diagnosis", "patient care": "Patient care", "team coordination": "Team coordination",
    "classroom management": "Classroom management", "instruction": "Instruction", "recruitment": "Recruitment",
    "client communication": "Client communication", "sales pipeline": "Sales pipeline",
    "lesson planning": "Lesson planning", "curriculum planning": "Curriculum planning",
    "lesson plan": "Lesson planning", "curriculum design": "Curriculum planning",
    "student assessment": "Assessment", "assessment and evaluation": "Assessment",
    "student mentoring": "Student support", "student support": "Student support",
    "mentor students": "Student support", "mentored students": "Student support",
    "parent communication": "Parent communication", "educational technology": "Educational technology",
    "learning management systems": "Learning management systems", "subject expertise": "Subject expertise",
    "chemistry": "Laboratory domain knowledge", "biology": "Laboratory domain knowledge", "physics": "Laboratory domain knowledge",
    "sample preparation": "Sample preparation", "sample handling": "Sample handling",
    "equipment handling": "Equipment handling", "laboratory equipment": "Equipment handling",
    "safety procedures": "Safety procedures", "lab safety": "Safety procedures",
    "basic testing": "Basic testing", "testing and measurement": "Measurement",
    "laboratory documentation": "Laboratory documentation", "lab documentation": "Laboratory documentation",
    "quality control": "Quality procedures", "quality procedures": "Quality procedures",
    "technical documentation": "Technical documentation", "measurement": "Measurement",
}


def _infer_role_requirements(target_role: str) -> list[str]:
    if not target_role:
        return []

    normalized = re.sub(r"[^a-z0-9\s]", " ", target_role.lower()).strip()
    if not normalized:
        return []

    ordered_keys = sorted(PROFESSIONAL_ROLE_REQUIREMENTS.keys(), key=lambda key: (-len(key), key))
    for key in ordered_keys:
        if normalized == key or normalized in key or key in normalized:
            return PROFESSIONAL_ROLE_REQUIREMENTS[key]

    for family, keywords in PROFESSIONAL_ROLE_FAMILIES.items():
        if any(keyword in normalized for keyword in keywords):
            return PROFESSIONAL_ROLE_REQUIREMENTS.get(family, [])

    return []


def _professional_list(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str):
        return [item.strip() for item in re.split(r",|\n", value) if item.strip()]
    return []


def _canonical_skill(value: str) -> str:
    normalized = re.sub(r"\s+", " ", value.strip().lower())
    return PROFESSIONAL_ALIASES.get(normalized, value.strip().title())


PROFESSIONAL_TRANSITION_CATALOGUE = [
    {
        "role": "University Professor / Academic Faculty",
        "aliases": [
            "professor", "prof", "college teacher", "university lecturer", "faculty",
            "academic", "assistant professor", "associate professor", "lecturer",
            "college professor", "higher education faculty", "university faculty", "higher education"
        ],
        "evidence_keywords": [
            "teaching", "instruction", "curriculum planning", "lesson planning",
            "assessment", "subject expertise", "mentoring", "classroom management",
            "pedagogy", "research", "publishing"
        ],
        "intent_keywords": [
            "higher education", "academia", "professor", "faculty", "university",
            "college", "teaching", "research"
        ],
        "required_skills": [
            "Subject matter expertise", "Instruction", "Pedagogy",
            "Curriculum planning", "Assessment", "Academic research"
        ],
        "mandatory_requirements": [
            "Master's Degree in relevant discipline",
            "UGC NET / CSIR NET qualification or PhD"
        ],
        "category": "Directly Transferable",
        "gaps": ["UGC NET qualification or PhD", "Peer-reviewed research publications"],
        "next_step": "Verify institutional eligibility requirements (Master's degree and UGC NET/SET or PhD enrolment) for university faculty appointment.",
        "roadmap_mode": "academic_faculty",
    },
    {
        "role": "Laboratory Technician", "aliases": ["laboratory technician", "lab technician", "laboratory technologist"],
        "evidence_keywords": ["laboratory", "chemistry", "biology", "physics", "sample preparation", "equipment handling", "testing", "measurement", "safety procedures", "laboratory documentation"],
        "intent_keywords": ["laboratory", "lab", "testing", "quality control", "science"],
        "required_skills": ["Laboratory domain knowledge", "Sample preparation", "Equipment handling", "Safety procedures", "Basic testing", "Laboratory documentation"],
        "mandatory_requirements": ["Relevant laboratory qualification or supervised practical experience"],
        "category": "Adjacent", "gaps": ["Validated laboratory qualification", "Advanced laboratory procedures"],
        "next_step": "Document your laboratory domain, equipment, procedures, and qualification before comparing technician roles.",
        "roadmap_mode": "practical_lab",
    },

    {
        "role": "Quality Control Technician", "aliases": ["quality control technician", "qc technician", "quality technician"],
        "evidence_keywords": ["quality control", "testing", "measurement", "sample preparation", "safety procedures", "documentation", "inspection"],
        "intent_keywords": ["quality", "testing", "laboratory", "manufacturing"],
        "required_skills": ["Testing", "Measurement", "Quality procedures", "Sample handling", "Safety procedures", "Technical documentation"],
        "mandatory_requirements": ["Relevant technical qualification or documented quality-control experience"],
        "category": "Adjacent", "gaps": ["Quality standards", "Validated testing procedures"],
        "next_step": "Record one complete test or quality-control procedure with acceptance criteria and documentation.",
        "roadmap_mode": "practical_lab",
    },
    {
        "role": "Corporate Trainer", "aliases": ["corporate trainer", "trainer", "employee training"],
        "evidence_keywords": ["teaching", "instruction", "training", "facilitation", "presentation", "mentoring", "public speaking"],
        "intent_keywords": ["training", "facilitation", "people", "teaching", "corporate"],
        "required_skills": ["Communication", "Presentation", "Training", "Facilitation", "Mentoring"],
        "category": "Directly Transferable", "gaps": ["Adult learning design", "Corporate LMS"],
        "next_step": "Run a short workplace-style training session and document the learning outcome.",
    },
    {
        "role": "Instructional Designer", "aliases": ["instructional designer", "learning designer", "course designer"],
        "evidence_keywords": ["lesson planning", "curriculum planning", "curriculum design", "content creation", "educational content", "assessment", "lms", "documentation"],
        "intent_keywords": ["content", "learning", "design", "instructional", "education"],
        "required_skills": ["Curriculum planning", "Content development", "Assessment", "Learning experience design"],
        "category": "Adjacent", "gaps": ["Instructional design models", "Authoring tools", "Learning experience design"],
        "next_step": "Create one digital lesson with objectives, activities, assessment, and learner feedback.",
    },
    {
        "role": "Learning & Development Specialist", "aliases": ["learning and development", "l&d", "ld specialist"],
        "evidence_keywords": ["training", "teaching", "mentoring", "facilitation", "assessment", "performance tracking", "communication"],
        "intent_keywords": ["training", "people", "learning", "management"],
        "required_skills": ["Training", "Needs analysis", "Facilitation", "Communication", "Evaluation"],
        "category": "Adjacent", "gaps": ["Training needs analysis", "Learning evaluation", "Corporate HR processes"],
        "next_step": "Map a learner need to a measurable training plan and evaluation method.",
    },
    {
        "role": "Academic Coordinator", "aliases": ["academic coordinator", "program coordinator", "education coordinator"],
        "evidence_keywords": ["coordination", "curriculum planning", "reporting", "administration", "team management", "documentation", "scheduling"],
        "intent_keywords": ["coordination", "education", "management", "operations"],
        "required_skills": ["Planning", "Coordination", "Communication", "Reporting", "Stakeholder management"],
        "category": "Directly Transferable", "gaps": ["Education operations systems", "Program reporting"],
        "next_step": "Document a program improvement project with stakeholders, measures, and outcomes.",
    },
    {
        "role": "Content Specialist", "aliases": ["content specialist", "content writer", "technical writer"],
        "evidence_keywords": ["writing", "documentation", "content creation", "research", "editing", "communication", "presentation"],
        "intent_keywords": ["writing", "content", "communication", "creative"],
        "required_skills": ["Written communication", "Research", "Content development", "Editing"],
        "category": "Adjacent", "gaps": ["Editorial workflow", "Portfolio of published work"],
        "next_step": "Publish two evidence-backed pieces for the target audience and collect feedback.",
    },
    {
        "role": "Research Analyst", "aliases": ["research analyst", "researcher", "research scientist"],
        "evidence_keywords": ["research", "analysis", "documentation", "publication", "data", "presentation"],
        "intent_keywords": ["research", "analysis", "academic", "data"],
        "required_skills": ["Research", "Analysis", "Documentation", "Communication"],
        "category": "Adjacent", "gaps": ["Research methods", "Data analysis", "Published portfolio"],
        "next_step": "Turn one research question into a documented analysis with method, evidence, and findings.",
    },
    {
        "role": "Data Analyst", "aliases": ["data analyst", "analytics", "reporting analyst"],
        "evidence_keywords": ["data analysis", "excel", "sql", "power bi", "tableau", "statistics", "reporting", "performance tracking"],
        "intent_keywords": ["data", "analytics", "analysis", "technology"],
        "required_skills": ["SQL", "Excel", "Data visualization", "Statistics", "Business analysis"],
        "category": "Reskilling Required", "gaps": ["SQL", "Data visualization", "Real-world data project"],
        "next_step": "Build a small analysis project using a real dataset and explain the decisions in a portfolio case study.",
    },
    {
        "role": "Business Analyst", "aliases": ["business analyst", "requirements analyst"],
        "evidence_keywords": ["data analysis", "reporting", "stakeholder", "documentation", "problem solving", "process", "research"],
        "intent_keywords": ["analysis", "business", "problem solving", "technology"],
        "required_skills": ["Requirements analysis", "Communication", "Process mapping", "SQL", "Excel"],
        "category": "Reskilling Required", "gaps": ["Requirements analysis", "Process mapping", "SQL"],
        "next_step": "Turn one current-work problem into a requirements document and process map.",
    },
    {
        "role": "Software Developer", "aliases": ["software developer", "software engineer", "developer", "programmer"],
        "evidence_keywords": ["programming", "python", "java", "javascript", "software development", "api development", "coding", "git"],
        "intent_keywords": ["software", "coding", "technology", "building technology", "developer"],
        "required_skills": ["Programming", "Data structures", "Git", "Testing", "Software development projects"],
        "category": "Reskilling Required", "gaps": ["Data structures", "Git", "Production development", "Testing", "Portfolio project"],
        "next_step": "Build and publish one tested application that demonstrates production-style development practices.",
    },
    {
        "role": "QA Automation Engineer", "aliases": ["qa automation", "test automation", "qa engineer"],
        "evidence_keywords": ["testing", "programming", "python", "java", "javascript", "quality assurance", "automation"],
        "intent_keywords": ["testing", "technology", "software", "automation"],
        "required_skills": ["Testing", "Programming", "Automation", "Git", "Test design"],
        "category": "Reskilling Required", "gaps": ["Automation framework", "Git", "Test design", "Portfolio project"],
        "next_step": "Automate a representative test suite and document coverage, failures, and maintenance decisions.",
    },
    {
        "role": "Data Engineer", "aliases": ["data engineer", "analytics engineer"],
        "evidence_keywords": ["programming", "python", "sql", "etl", "data pipelines", "data analysis", "cloud"],
        "intent_keywords": ["data", "analytics", "technology"],
        "required_skills": ["Programming", "Python", "SQL", "ETL", "Data pipelines", "Data warehousing", "Cloud", "Spark"],
        "category": "Reskilling Required", "gaps": ["Python", "ETL", "Data pipelines", "Data warehousing", "Cloud", "Spark"],
        "next_step": "Create a small documented pipeline from raw data to a queryable warehouse table.",
    },
]


def _professional_profile_missing(answers: dict) -> list[str]:
    missing = []
    if not (answers.get("current_job_title") or answers.get("current_role")):
        missing.append("current role")
    if not answers.get("years_experience"):
        missing.append("years of experience")
    if not answers.get("current_responsibilities") and not answers.get("current_work_description") and not answers.get("current_responsibilities_free_text") and not answers.get("current_responsibilities_other"):
        missing.append("actual responsibilities")
    if not answers.get("current_skills") and not (answers.get("current_work_description") or answers.get("current_responsibilities_free_text") or answers.get("current_responsibilities_other")):
        missing.append("skills or detailed work evidence")
    if not answers.get("switch_reasons") and not answers.get("target_role"):
        missing.append("reason for switching or target direction")
    if not answers.get("weekly_learning_hours"):
        missing.append("learning time")
    if not answers.get("transition_timeline"):
        missing.append("transition timeline")
    if not answers.get("current_industry") and not (answers.get("current_specialization") or answers.get("current_work_description") or answers.get("current_responsibilities_free_text") or answers.get("current_responsibilities_other")):
        missing.append("industry or specialization")
    return missing


def _professional_evidence(answers: dict) -> tuple[list[str], dict[str, dict[str, str]], str]:
    evidence: dict[str, dict[str, str]] = {}
    current: list[str] = []
    explicit_fields = [
        ("current_skills", "skill selection", "Strong"),
        ("current_responsibilities", "responsibility selection", "Strong"),
        ("current_responsibilities_other", "custom responsibility", "Strong"),
        ("current_responsibilities_free_text", "responsibility description", "Moderate"),
        ("tools_used", "tools entered", "Moderate"),
        ("major_achievements", "achievement description", "Moderate"),
        ("major_projects", "project description", "Moderate"),
        ("current_specialization", "specialization entered", "Moderate"),
    ]
    for key, source, confidence in explicit_fields:
        values = _professional_list(answers.get(key))
        for value in values:
            if value.lower() == "other":
                continue
            canonical = _canonical_skill(value)
            if value not in current:
                current.append(value)
            if canonical not in current:
                current.append(canonical)
            evidence.setdefault(canonical, {"evidence": value, "source": source, "confidence": confidence})

    searchable_text = " ".join(
        str(answers.get(key, ""))
        for key in ["current_specialization", "current_responsibilities_free_text", "current_responsibilities_other", "tools_used", "major_achievements", "major_projects"]
    ).lower()
    for alias, canonical in PROFESSIONAL_ALIASES.items():
        if alias in searchable_text:
            if canonical not in current:
                current.append(canonical)
            evidence.setdefault(canonical, {"evidence": searchable_text.strip(), "source": "free-text answer", "confidence": "Moderate"})

    # Target role, target industry, switch reason, and preferences describe
    # intent. They are never evidence that the user already has a target skill.
    profile_keys = [
        "current_job_title", "current_specialization", "current_industry", "current_responsibilities",
        "current_responsibilities_other", "current_responsibilities_free_text", "current_skills", "tools_used",
        "highest_qualification", "certifications", "skill_proficiency", "major_achievements", "major_projects",
    ]
    full_text = " ".join(str(answers.get(key, "")) for key in profile_keys).lower()
    return list(dict.fromkeys(current)), evidence, full_text


def _target_candidate(target_role: str) -> dict:
    return {}


def _resolve_professional_target(target_role: str) -> dict | None:
    if not target_role:
        return None
    normalized = re.sub(r"\s+", " ", target_role.lower()).strip()
    for candidate in PROFESSIONAL_TRANSITION_CATALOGUE:
        if normalized == candidate["role"].lower() or normalized in candidate["aliases"]:
            return candidate
        if any(len(alias) >= 4 and alias in normalized for alias in candidate["aliases"]):
            return candidate

    # Fall back to canonical target resolution (Section 36, 48)
    res = resolve_target_role(target_role)
    if res and res.get("canonical_name"):
        c_slug = res.get("entity", {}).get("slug", "") if res.get("entity") else ""
        if c_slug == "professor" or any(w in normalized for w in ["professor", "prof", "faculty", "lecturer"]):
            for candidate in PROFESSIONAL_TRANSITION_CATALOGUE:
                if "professor" in candidate["role"].lower():
                    return candidate
        if c_slug in ["software-developer"] or any(w in normalized for w in ["software developer", "programmer", "software engineer"]):
            for candidate in PROFESSIONAL_TRANSITION_CATALOGUE:
                if "software developer" in candidate["role"].lower():
                    return candidate
        if c_slug in ["data-analyst"] or any(w in normalized for w in ["data analyst", "data analytics"]):
            for candidate in PROFESSIONAL_TRANSITION_CATALOGUE:
                if "data analyst" in candidate["role"].lower():
                    return candidate

    return None



MINI_EXPERIMENTS = [
    {
        "id": "exp_coding",
        "domain": "Technology & Coding",
        "title": "Beginner Logic & Code Trace Challenge",
        "description": "Trace an algorithm reversing an array and predict the final state after execution.",
        "difficulty": "10 minutes",
        "task_prompt": "Given array [10, 20, 30, 40] with two pointers swapping ends, what is the output?",
        "options": ["[40, 30, 20, 10]", "[10, 20, 30, 40]", "[20, 10, 40, 30]"],
        "correct_option": "[40, 30, 20, 10]",
    },
    {
        "id": "exp_analytics",
        "domain": "Data Analytics",
        "title": "Micro Data Interpretation Task",
        "description": "Evaluate conversion rates across marketing campaigns with varying budgets.",
        "difficulty": "10 minutes",
        "task_prompt": "Campaign A spends $100 for 5 acquisitions ($20/cust); Campaign B spends $300 for 20 acquisitions ($15/cust). Which is more cost-efficient per user?",
        "options": ["Campaign B ($15 per acquisition)", "Campaign A ($20 per acquisition)", "Both are equal"],
        "correct_option": "Campaign B ($15 per acquisition)",
    },
    {
        "id": "exp_finance",
        "domain": "Finance & Accounting",
        "title": "Operating Leverage Scenario",
        "description": "Determine the impact of fixed vs variable costs when revenue fluctuates.",
        "difficulty": "10 minutes",
        "task_prompt": "If revenue declines 20% while fixed costs remain constant, what happens to operating profit?",
        "options": ["Operating profit declines by more than 20% due to fixed cost leverage", "Operating profit declines exactly 20%", "Operating profit is unaffected"],
        "correct_option": "Operating profit declines by more than 20% due to fixed cost leverage",
    },
    {
        "id": "exp_design",
        "domain": "Design & UI/UX",
        "title": "Visual Hierarchy Critique",
        "description": "Identify which visual element improves conversion in a multi-step checkout form.",
        "difficulty": "10 minutes",
        "task_prompt": "When users miss the primary payment action, what is the most effective UX fix?",
        "options": ["Increase visual contrast and place primary action above secondary options", "Add more explanatory text paragraphs", "Make all buttons the same grey color"],
        "correct_option": "Increase visual contrast and place primary action above secondary options",
    },
    {
        "id": "exp_research",
        "domain": "Science & Academic Research",
        "title": "Hypothesis & Causality Evaluation",
        "description": "Distinguish between correlation and direct causation in an observational dataset.",
        "difficulty": "10 minutes",
        "task_prompt": "A study finds cities with more coffee shops have higher tech patent filings. Does opening coffee shops directly cause tech innovation?",
        "options": ["No, coffee shop density is a confounding correlation with urban tech clusters", "Yes, coffee consumption directly induces patent drafting", "Correlation always equals causation"],
        "correct_option": "No, coffee shop density is a confounding correlation with urban tech clusters",
    }
]


def evaluate_experiment_submission(experiment_id: str, user_answer: str) -> Dict[str, Any]:
    """Evaluates a completed mini-experiment and records evidence."""
    exp = next((e for e in MINI_EXPERIMENTS if e["id"] == experiment_id), None)
    if not exp:
        return {"status": "UNKNOWN_EXPERIMENT", "passed": False, "feedback": "Experiment not recognized."}

    passed = (user_answer.strip() == exp["correct_option"].strip())
    evidence_text = f"Completed mini-experiment '{exp['title']}': {'Demonstrated aptitude' if passed else 'Struggled with challenge'}"

    return {
        "status": "EVALUATED",
        "experiment_id": experiment_id,
        "title": exp["title"],
        "passed": passed,
        "evidence_item": {
            "value": "Passed" if passed else "Needs Practice",
            "source": "behavioral_task",
            "evidenceType": "FACT",
            "evidenceLevel": "OBSERVED",
            "confidence": 0.80 if passed else 0.60,
            "provenance": evidence_text,
        },
        "feedback": "Great analytical deduction! Aptitude signal confirmed." if passed else "Helpful exploration. This indicates foundational practice is beneficial before specializing.",
    }


def build_canonical_career_dna(stage: str, answers: dict, profile_data: Optional[dict] = None) -> CareerDNA:
    """Builds a canonical, typed CareerDNA object from stage responses."""
    data = dict(answers or {})
    if profile_data:
        data.update(profile_data)

    stage_norm = "working_professional" if stage in ["job_switcher", "professional"] else (stage or "class10").lower()

    # Marks & Academic
    academic_ev = []
    validated_marks = {}
    for key, val in data.items():
        if "mark" in key.lower() or "score" in key.lower() or key in ["math", "science", "english", "social_science"]:
            res = validate_mark(val)
            if res["status"] == "VALID":
                validated_marks[key] = res["value"]
                academic_ev.append(create_evidence(res["value"], source="academic_record", evidence_type="FACT", provenance=f"Reported {key}"))
            elif res["status"] == "UNKNOWN":
                validated_marks[key] = "UNKNOWN"

    # Aptitudes
    aptitude_ev = []
    # Interests
    raw_interests = data.get("career_curiosity") or data.get("interests") or data.get("favorite_subjects") or []
    if isinstance(raw_interests, str):
        raw_interests = [raw_interests]
    interest_ev = [create_evidence(item, source="user_self_report", evidence_type="FACT") for item in raw_interests]

    # Skills & Transferable
    raw_skills = data.get("skills") or data.get("current_skills") or data.get("skills_so_far") or []
    if isinstance(raw_skills, str):
        raw_skills = [raw_skills]
    responsibilities = data.get("current_responsibilities") or data.get("responsibilities") or []
    if isinstance(responsibilities, str):
        responsibilities = [responsibilities]

    transferable_items = TransferableSkillEngine.extract_transferable_skills(
        responsibilities=responsibilities,
        current_skills=raw_skills,
    )
    skill_ev = [create_evidence(s, source="user_self_report", evidence_type="FACT") for s in raw_skills]

    # Contradictions
    contradictions = ContradictionEngine.detect_contradictions(data)

    # Target resolution
    target_raw = data.get("target_role") or data.get("goal_text") or data.get("career_goal")
    resolved_target = resolve_target_role(target_raw)

    # Completeness
    filled_keys = [k for k, v in data.items() if v]
    completeness = min(100.0, round((len(filled_keys) / 8.0) * 100.0, 1))
    quality = "HIGH" if len(filled_keys) >= 6 and not contradictions else ("MEDIUM" if len(filled_keys) >= 3 else "INSUFFICIENT")

    signals_list = []
    for k, v in data.items():
        for sig in classify_signal(k, v):
            signals_list.append(SignalItem(**sig))

    return CareerDNA(
        version=1,
        stage=stage_norm,
        profileCompleteness=completeness,
        evidenceQuality=quality,
        academicProfile=AcademicProfile(
            educationLevel=stage_norm,
            stream=data.get("stream") or data.get("degree_branch"),
            subjects=data.get("favorite_subjects") if isinstance(data.get("favorite_subjects"), list) else [],
            marks=validated_marks,
            academicStrengths=data.get("strong_subjects") if isinstance(data.get("strong_subjects"), list) else [],
            academicEvidence=academic_ev,
        ),
        aptitudeProfile=AptitudeProfile(
            numerical="moderate" if "mathematics" in str(data).lower() else None,
            logical="moderate" if "logic" in str(data).lower() else None,
            evidence=aptitude_ev,
        ),
        interestProfile=InterestProfile(
            domains=raw_interests,
            evidence=interest_ev,
        ),
        skillProfile=SkillProfile(
            technical=raw_skills,
            transferable=[
                {
                    "skill": t["skill"],
                    "sourceEvidence": t["sourceEvidence"],
                    "confidence": t["confidence"],
                    "transferReason": t["transferReason"],
                    "targetRelevance": t["targetRelevance"],
                }
                for t in transferable_items
            ],
            evidence=skill_ev,
        ),
        preferenceProfile=PreferenceProfile(
            workStyle=[data.get("work_style")] if data.get("work_style") and isinstance(data.get("work_style"), str) else (data.get("work_style") or []),
            environment=data.get("work_environment"),
        ),
        valuesProfile=ValuesProfile(
            income=data.get("salary_priority"),
            impact=data.get("impact_priority"),
        ),
        goals=GoalsProfile(
            primaryGoal=resolved_target.get("canonical_name") or target_raw,
            goalConfidence="high" if resolved_target.get("confidence", 0) >= 0.8 else "tentative",
        ),
        targetDirection=TargetDirectionProfile(
            rawInput=target_raw,
            normalizedInput=resolved_target.get("normalized_input"),
            resolvedEntity=resolved_target.get("entity"),
            resolutionState=resolved_target.get("state", "UNKNOWN"),
            confidence=resolved_target.get("confidence", 0.0),
        ),
        signals=signals_list,
        uncertainty=UncertaintyProfile(
            contradictions=contradictions,
            missingEvidence=derive_stage_uncertainty(stage_norm, data, [s.model_dump() for s in signals_list]),
            confidence=0.85 if quality == "HIGH" else 0.50,
        ),
    )




def build_job_switcher_guidance(answers: dict) -> dict:
    """Build an evidence-backed professional transition analysis.

    The function deliberately returns an insufficient-data state instead of
    filling the UI with generic careers when the professional profile is thin.
    """
    current_role = str(answers.get("current_job_title") or answers.get("current_role", "")).strip()
    target_role_status = str(answers.get("target_role_status") or "").strip().lower()
    target_role = str(answers.get("target_role") or answers.get("target_field") or "").strip()
    if target_role_status and target_role_status != "yes":
        target_role = ""

    missing = _professional_profile_missing(answers)
    current, evidence, full_text = _professional_evidence(answers)
    if missing:
        follow_up_questions = [
            "What subject or specialization do you work in?", "What do you actually do in a typical week?",
            "Which tools and skills do you use?", "Why do you want to switch and what work interests you?",
        ]
        if "lab" in current_role.lower() or "laboratory" in current_role.lower():
            follow_up_questions = [
                "What type of laboratory do you work in?", "What is your highest qualification?",
                "Which laboratory tasks and procedures do you perform?", "Which equipment do you handle?",
                "Do you perform testing, measurement, or sample preparation?", "Which safety procedures and records do you maintain?",
                "Which software or tools do you use, and what role do you want next?",
            ]
        return {
            "stage": "job_switcher", "type": "career_transition", "profile_status": "insufficient_evidence",
            "summary": {"title": "More professional context is needed", "current_role": current_role, "target_role": target_role,
                        "headline": f"{current_role or 'Working professional'} - evidence review pending",
                        "why_this_fits": "A job title alone is not enough to recommend a reliable career switch."},
            "target_role": target_role, "profile_match": None, "transition_readiness": None,
            "readiness_label": "Evidence strength", "evidence_strength": "INSUFFICIENT",
            "transition_difficulty": "Not assessed", "difficulty_explanation": "Complete the missing profile fields before transition difficulty is calculated.",
            "estimated_preparation": None, "transferable_skills": [], "transferable_skill_evidence": [], "skill_gaps": [],
            "recommended_learning_priorities": [], "roadmap": [], "recommendations": [], "alternative_roles": [],
            "missing_information": missing,
            "follow_up_questions": follow_up_questions,
            "education_recommendation": "No education recommendation is made until the current professional profile is sufficiently detailed.",
            "disclaimer": "No career recommendations were generated because the available evidence is insufficient.",
        }

    target_key = target_role.lower()
    candidates = PROFESSIONAL_TRANSITION_CATALOGUE[:]
    hard_block_reason = ""
    regulated_requirements = {
        "doctor": ["mbbs", "medical"],
        "physician": ["mbbs", "medical"],
        "lawyer": ["llb", "law"],
        "advocate": ["llb", "law"],
        "pilot": ["pilot", "aviation"],
        "architect": ["architecture", "b.arch"],
    }
    qualification_text = " ".join(str(answers.get(key, "")) for key in ["highest_qualification", "certifications"]).lower()
    for regulated_role, required_terms in regulated_requirements.items():
        if regulated_role in target_key and not any(term in qualification_text for term in required_terms):
            hard_block_reason = f"{target_role} is not a direct transition without the required formal qualification or licence."
            candidates = []
            break
    if target_role and not hard_block_reason:
        validated_target = _resolve_professional_target(target_role)
        if not validated_target:
            res_target = resolve_target_role(target_role)
            return {
                "stage": "job_switcher",
                "type": "career_transition",
                "profile_status": "no_supported_match",
                "summary": {
                    "title": "Target role not validated",
                    "current_role": current_role,
                    "target_role": target_role,
                    "headline": f"{current_role} -> {target_role} (not validated)",
                    "why_this_fits": "We couldn't confidently identify this as a recognized career direction." if res_target.get("state") == "UNKNOWN_TARGET" else f"'{target_role}' is not currently in the validated transition catalog.",
                },
                "target_role": target_role,
                "profile_match": None,
                "transition_readiness": None,
                "readiness_label": "Evidence strength",
                "evidence_strength": "INSUFFICIENT",
                "transition_difficulty": "Not assessed",
                "difficulty_explanation": "We couldn't confidently identify this as a recognized career direction." if res_target.get("state") == "UNKNOWN_TARGET" else f"We could not validate '{target_role}' against supported transition paths.",
                "estimated_preparation": None,
                "transferable_skills": current,
                "transferable_skill_evidence": [],
                "skill_gaps": [],
                "recommended_learning_priorities": [],
                "roadmap": [],
                "recommendations": [],
                "alternative_roles": [],
                "missing_information": ["validated target career role"],
                "follow_up_questions": [f"Did you mean one of the supported paths, or can you describe the day-to-day responsibilities of '{target_role}'?"],
                "education_recommendation": "No recommendation can be made for an unvalidated target role.",
                "disclaimer": "We couldn't confidently identify this as a recognized career direction." if res_target.get("state") == "UNKNOWN_TARGET" else "The target role could not be matched to a validated transition profile.",
            }
        candidates = [validated_target]


    explicit_intent = " ".join(
        str(answers.get(key, "")) for key in ["target_industries", "work_preferences", "switch_reasons"]
    ).lower()
    scored = []
    for candidate in candidates:
        matched_evidence = [keyword for keyword in candidate["evidence_keywords"] if keyword in full_text or keyword in " ".join(current).lower()]
        matched_intent = [keyword for keyword in candidate["intent_keywords"] if keyword in explicit_intent]
        required = candidate["required_skills"]
        matched_skills = [skill for skill in required if skill.lower() in {_canonical_skill(item).lower() for item in current}]
        if not target_role and len(matched_evidence) < 2:
            continue
        if not target_role and not matched_intent and candidate["category"] == "Reskilling Required":
            continue
        if target_role and not matched_evidence and not matched_skills and not matched_intent:
            continue
        if candidate.get("mandatory_requirements") and not qualification_text:
            continue
        alignment = round((len(matched_skills) / max(len(required), 1)) * 100)
        evidence_score = min(100, len(matched_evidence) * 18 + len(matched_intent) * 12 + alignment // 3)
        scored.append({"candidate": candidate, "matched_evidence": matched_evidence, "matched_intent": matched_intent, "matched_skills": matched_skills, "score": evidence_score})

    scored.sort(key=lambda item: (item["score"], len(item["matched_skills"])), reverse=True)
    if not scored:
        return {
            "stage": "job_switcher", "type": "career_transition", "profile_status": "no_supported_match",
            "summary": {"title": "No sufficiently supported career switch yet", "current_role": current_role, "target_role": target_role,
                        "headline": f"{current_role} - no supported transition identified",
                        "why_this_fits": hard_block_reason or "The current answers do not provide enough evidence for a relevant target career."},
            "target_role": target_role, "profile_match": None, "transition_readiness": None,
            "readiness_label": "Evidence strength", "evidence_strength": "INSUFFICIENT",
            "transition_difficulty": "Challenging" if hard_block_reason else "Not assessed",
            "difficulty_explanation": hard_block_reason or "Add a target direction, relevant activities, or demonstrated skills before choosing a transition.",
            "estimated_preparation": None, "transferable_skills": current, "transferable_skill_evidence": [], "skill_gaps": [],
            "recommended_learning_priorities": [], "roadmap": [], "recommendations": [], "alternative_roles": [],
            "missing_information": [hard_block_reason] if hard_block_reason else ["supported target direction or stronger evidence of relevant activities"],
            "follow_up_questions": ["Which type of work do you want to move toward?", "Which activities do you want to do more often?"],
            "education_recommendation": "No course or career path is recommended without a supported match.",
            "disclaimer": "It is valid to receive no recommendation when the current evidence does not support one.",
        }

    top = scored[0]
    candidate = top["candidate"]
    required = candidate["required_skills"]
    current_keys = {_canonical_skill(skill).lower() for skill in current}
    gaps = [skill for skill in required if skill.lower() not in current_keys]
    transferable = [skill for skill in current if _canonical_skill(skill).lower() in {item.lower() for item in required}]
    coverage = round((len(transferable) / max(len(required), 1)) * 100)
    category = candidate["category"]
    if coverage >= 70 and len(gaps) <= 2:
        category = "Directly Transferable"
    elif coverage >= 35:
        category = "Adjacent"
    elif category != "Directly Transferable":
        category = "Reskilling Required"
    difficulty = "Easy" if category == "Directly Transferable" else "Moderate" if category == "Adjacent" else "Challenging"
    hours = str(answers.get("weekly_learning_hours") or "")
    preparation = "3-6 months" if difficulty == "Easy" else "6-12 months" if "5-10" in hours or "10-15" in hours else "12-18 months"
    hours_per_week = "5-8 hours" if "5-10" in hours else "10-15 hours" if "10-15" in hours else "2-4 hours"
    hours_per_week_value = 6 if "5-10" in hours else 12 if "10-15" in hours else 3
    phase_weeks = 4
    roadmap = [{"period": f"Weeks {index * 4 + 1}-{index * 4 + 4}", "focus": gap, "time": hours_per_week,
                "hours_per_week": hours_per_week_value, "estimated_total_hours": hours_per_week_value * phase_weeks,
                "outcome": f"Build verifiable evidence of {gap} for {candidate['role']} applications."} for index, gap in enumerate(gaps[:3])]
    if not roadmap:
        roadmap = [{"period": "Next 4 weeks", "focus": candidate["role"] + " evidence", "time": hours_per_week,
                    "hours_per_week": hours_per_week_value, "estimated_total_hours": hours_per_week_value * phase_weeks,
                    "outcome": candidate["next_step"]}]
    skill_evidence = []
    evidence_backed_transferable = []
    for skill in transferable:
        item = evidence.get(_canonical_skill(skill), {})
        evidence_text = str(item.get("evidence", "")).strip()
        if not evidence_text:
            continue
        evidence_backed_transferable.append(skill)
        skill_evidence.append({
            "skill": skill,
            "evidence": evidence_text,
            "confidence": item.get("confidence", "Moderate"),
            "source": item.get("source", "selected professional input"),
        })
    transferable = evidence_backed_transferable
    recommendations = []
    for item in scored[:3]:
        item_candidate = item["candidate"]
        item_required = item_candidate["required_skills"]
        item_gaps = [skill for skill in item_required if skill.lower() not in current_keys]
        item_transferable = [skill for skill in current if _canonical_skill(skill).lower() in {value.lower() for value in item_required}]
        item_transferable = [skill for skill in item_transferable if str(evidence.get(_canonical_skill(skill), {}).get("evidence", "")).strip()]
        item_coverage = round((len(item_transferable) / max(len(item_required), 1)) * 100)
        item_category = "Directly Transferable" if item_coverage >= 70 and len(item_gaps) <= 2 else "Adjacent" if item_coverage >= 35 else "Reskilling Required"
        requirement_analysis = [
            {
                "requirement": skill,
                "status": "SUPPORTED" if skill.lower() in current_keys else "UNKNOWN",
                "evidence": evidence.get(_canonical_skill(skill), {}).get("evidence") if skill.lower() in current_keys else None,
            }
            for skill in item_required
        ]
        hard_blockers = item_candidate.get("mandatory_requirements", [])
        qualification_text = " ".join(str(answers.get(key, "")) for key in ["highest_qualification", "certifications"]).strip()
        if hard_blockers and not qualification_text:
            hard_blockers = [f"{requirement} (not established)" for requirement in hard_blockers]
        evidence_phrase = ", ".join(item["matched_evidence"][:4])
        transferable_phrase = ", ".join(item_transferable[:4])
        why = (
            f"Your profile shows evidence in {evidence_phrase}."
            if evidence_phrase else
            "Your stated transition goal makes this a possible reskilling path, but current-skill evidence is limited."
        )
        if transferable_phrase:
            why += f" Transferable skills include {transferable_phrase}."
        recommendations.append({
            "career": item_candidate["role"], "match_category": item_category,
            "why": why,
            "transferable_skills": item_transferable, "skill_gaps": item_gaps,
            "requirement_analysis": requirement_analysis, "hard_blockers": hard_blockers,
            "transition_effort": "Low" if len(item_gaps) <= 2 else "Moderate" if len(item_gaps) <= 4 else "High",
            "next_step": item_candidate["next_step"], "evidence": item["matched_evidence"],
        })
    alternatives = [{"role": item["career"], "why": item["why"], "transferable_skills": item["transferable_skills"],
                     "missing_skills": item["skill_gaps"], "transition_type": item["match_category"]} for item in recommendations[1:]]
    recommendations = [item for item in recommendations if item["career"] and item["why"].strip() and (item["evidence"] or item["match_category"] == "Reskilling Required")]
    alternatives = alternatives[:max(0, len(recommendations) - 1)]
    return {
        "stage": "job_switcher", "type": "career_transition", "profile_status": "sufficient_evidence",
        "summary": {"title": "Evidence-Based Career Transition Profile", "current_role": current_role, "target_role": target_role or candidate["role"],
                    "headline": f"{current_role or 'Current role'} -> {target_role or candidate['role']}",
                    "why_this_fits": recommendations[0]["why"]},
        "target_role": target_role or candidate["role"], "profile_match": top["score"], "transition_readiness": top["score"],
        "readiness_label": "Evidence alignment (not hiring probability)",
        "evidence_strength": "STRONG" if len(top["matched_evidence"]) >= 3 else "MODERATE" if top["matched_evidence"] else "INSUFFICIENT",
        "overall_compatibility": category, "transition_difficulty": difficulty,
        "difficulty_explanation": f"This is {difficulty.lower()} because {len(transferable)} required skills have evidence and {len(gaps)} remain to be built.",
        "estimated_preparation": preparation, "current_skills": current, "transferable_skills": transferable,
        "transferable_skill_evidence": [
            {**item, "strength": item["confidence"], "years_of_experience": answers.get("years_experience"),
             "why_it_transfers": f"This evidence overlaps with the {candidate['role']} requirement set."}
            for item in skill_evidence
        ],
        "skill_gaps": [{"skill": skill, "priority": index + 1, "readiness": 0} for index, skill in enumerate(gaps)],
        "recommended_learning_priorities": gaps[:5], "roadmap": roadmap, "recommendations": recommendations,
        "target_requirements": recommendations[0]["requirement_analysis"] if recommendations else [],
        "application_readiness": ["Resume evidence preparation", "Interview preparation"],
        "alternative_roles": alternatives, "missing_information": [],
        "education_recommendation": "Verify any qualification or certification requirements for the target role before investing in a course.",
        "disclaimer": "Recommendations are evidence-backed transition hypotheses, not hiring probabilities or employment guarantees.",
        "what_we_know": [
            f"Current Role: {current_role or 'Professional'}",
            f"Experience: {answers.get('years_experience', 'Not specified')}",
            f"Current Industry: {answers.get('current_industry', 'Not specified')}",
        ],
        "what_we_know_structured": derive_what_we_know("working_professional", answers),
        "strongest_signals": [f"{t} — Transferable Capability" for t in transferable[:3]] if transferable else ["Professional domain execution"],
        "what_you_enjoy": answers.get("work_preferences") or answers.get("switch_reasons") or ["Career growth and domain mastery"],
        "what_you_appear_good_at": [f"Demonstrated execution: {t}" for t in transferable[:3]] if transferable else ["We don't have enough demonstrated evidence yet to confidently identify specific capabilities."],
        "what_is_still_uncertain": [gap.get("skill") if isinstance(gap, dict) else str(gap) for gap in gaps[:3]] or ["Domain-specific tool certifications"],
        "directions_worth_exploring": [rec.get("career") for rec in recommendations[:3]],
        "why_these_directions": [rec.get("why") for rec in recommendations[:3]],
        "what_to_try_next": [f"Review requirements for {recommendations[0]['career'] if recommendations else 'target role'}", "Draft targeted experience bullet points"],
        "academic_or_career_options": [rec.get("career") for rec in recommendations],
        "canonical_dna": build_canonical_career_dna("working_professional", answers).model_dump(),
        "experiments": select_dynamic_experiments(["TECH_ORIENTATION", "BUSINESS_ORIENTATION"], bool(transferable), "working_professional"),
    }


def build_guidance(stage: str, answers: dict) -> dict:
    """Builds deterministic, explainable path guidance with ranking,
    reasoning factors, and progressive-disclosure friendly payloads."""
    catalogue = _get_domain_tailored_catalogue(stage, answers)
    if not catalogue:
        what_we_know_data = derive_what_we_know(stage, answers)
        res = {
            "stage": stage,
            "summary": {"title": "Your Career DNA", "highlights": _summary_attributes(answers)},
            "groups": [],
            "top_recommendations": [],
            "other_paths": [],
            "disclaimer": "This shows every legitimate option at your stage. Guidance reflects verified signals and reported interests.",
            "what_we_know": what_we_know_data["user_provided_facts"],
            "what_we_know_structured": what_we_know_data,
            "strongest_signals": ["Stage-appropriate baseline curiosity"],
            "what_you_enjoy": [],
            "what_you_appear_good_at": ["We don't have enough demonstrated evidence yet to confidently identify specific capabilities."],
            "what_is_still_uncertain": derive_stage_uncertainty(stage, answers, []),
            "directions_worth_exploring": [],
            "why_these_directions": [],
            "what_to_try_next": ["Complete the initial diagnostic assessment"],
            "academic_or_career_options": [],
            "canonical_dna": build_canonical_career_dna(stage, answers).model_dump(),
            "experiments": select_dynamic_experiments([], False, stage),
        }
        if stage == "class10":
            res["class10_direction_experience"] = build_class10_direction_experience(answers)
        return res

    scored = []
    for entry in catalogue:
        raw_score, reasons, overlap = _score_entry(stage, entry, answers)
        scored.append({"entry": entry, "reasons": reasons, "overlap": overlap, "raw_score": raw_score})

    _normalize_scores(scored, stage=stage)

    # Sort primarily by match_score, then overlap
    scored.sort(key=lambda item: (item["match_score"], item["overlap"]), reverse=True)

    has_meaningful_data = any(item["overlap"] > 0 for item in scored)

    # Evidence & Signal Extraction (Sections 3, 4, 5, 6, 7, 8, 9, 10)
    what_we_know_data = derive_what_we_know(stage, answers)
    signals_list = []
    for k, v in answers.items():
        signals_list.extend(classify_signal(k, v))
        
    marks_dict = {}
    for k, v in answers.items():
        if any(m in k.lower() for m in ["mark", "score", "math", "science", "english", "social"]):
            vm = validate_mark(v)
            if vm.get("status") == "VALID":
                marks_dict[k] = vm["value"]

    strongest_signals_data = derive_strongest_signals(marks_dict, signals_list)
    strongest_signals_formatted = [
        f"{s['title']} ({s['confidence']})" for s in strongest_signals_data
    ] if strongest_signals_data else ["Stage-appropriate baseline curiosity"]

    # What You Enjoy (Section 9: strictly interests, not skills)
    what_you_enjoy = (
        answers.get("favorite_subjects") or answers.get("career_curiosity") or 
        answers.get("interests") or answers.get("liked_topics") or []
    )
    if isinstance(what_you_enjoy, str):
        what_you_enjoy = [what_you_enjoy]

    # What You Appear Good At (Section 8: Demonstrated Evidence ONLY)
    demonstrated_strengths = derive_demonstrated_capabilities(
        marks=marks_dict,
        experiments=[],
        projects=answers.get("projects") or [],
        work_history=answers.get("responsibilities") or [],
    )
    if not demonstrated_strengths:
        demonstrated_strengths = ["We don't have enough demonstrated evidence yet to confidently identify specific capabilities."]

    # Decision-relevant stage uncertainty (Section 10)
    stage_uncertainty = derive_stage_uncertainty(stage, answers, signals_list)

    # Dynamic mini-experiments (Section 33 & 34)
    active_clusters = [s.get("cluster") for s in signals_list if s.get("cluster")]
    has_skills = bool(answers.get("skills") or answers.get("current_skills") or answers.get("skills_so_far"))
    dynamic_exps = select_dynamic_experiments(active_clusters, has_skills, stage)

    groups = []
    for rank, item in enumerate(scored, start=1):
        entry = item["entry"]
        group_name = entry["group"]
        
        group_payload = {
            "group": group_name,
            "useful_for": entry["useful_for"],
            "match_score": item["match_score"],
            "alignment_label": item.get("alignment_label", "WORTH EXPLORING"),
            "eligibility_status": item.get("eligibility_status", "ELIGIBLE"),
            "rank": rank,
            "closer_fit_to_your_answers": item["overlap"] > 0,
            "why_this_fits": item["reasons"],
            "what_you_will_study": entry.get("what_you_will_study") or _group_subject_overview(stage, group_name),
            "can_lead_towards": entry.get("can_lead_towards") or _split_directions(entry["useful_for"]),
            "things_to_consider": GROUP_CONSIDERATIONS.get(group_name, [
                "Use this as guidance and verify current eligibility/requirements from official sources.",
                "Compare this path with at least one alternative before choosing.",
            ]),
        }

        if stage == "class10" and group_name in CLASS10_OPTION_VALUE_CATALOGUE:
            cat_entry = CLASS10_OPTION_VALUE_CATALOGUE[group_name]
            group_payload["direction_id"] = cat_entry["direction_id"]
            group_payload["name"] = cat_entry["name"]
            group_payload["tagline"] = cat_entry["tagline"]
            group_payload["keeps_open"] = cat_entry["keeps_open"]
            group_payload["makes_easier"] = cat_entry["makes_easier"]
            group_payload["constraints"] = cat_entry["constraints"]
            group_payload["still_to_explore"] = cat_entry["still_to_explore"]
            group_payload["career_families"] = cat_entry["career_families"]
            group_payload["next_experiment"] = {
                "id": cat_entry["default_experiment_id"],
                "title": cat_entry["experiment_title"],
                "action": cat_entry["experiment_action"],
                "duration": cat_entry["duration"],
            }
            c10_signals = derive_class10_semantic_signals(answers)
            rationale_meta = generate_class10_semantic_rationale(group_name, c10_signals, marks_dict)
            group_payload["student_rationale"] = rationale_meta["student_rationale"]
            group_payload["parent_rationale"] = rationale_meta["parent_rationale"]
            group_payload["counsellor_trace"] = rationale_meta["counsellor_trace"]
            group_payload["evidence_ids"] = rationale_meta["evidence_ids"]

        groups.append(group_payload)

    top_recommendations = groups[:3]
    other_paths = groups[3:]

    if not has_meaningful_data:
        disclaimer = "You haven't provided enough answers yet for us to confidently rank these pathways. Please complete the assessment."
    else:
        disclaimer = (
            "This shows legitimate pathway options at your stage based on your current inputs. "
            "Labels indicate evidence-based alignment rather than deterministic hiring or employment guarantees."
        )

    if stage == "class10":
        disclaimer = (
            "These are stream options after Class 10, not degree eligibility decisions or final career conclusions. "
            "Your next decision is choosing subjects for Classes 11-12 to keep desired pathways accessible."
        ) if has_meaningful_data else (
            "Complete the assessment to compare stream options after Class 10, not degree eligibility decisions. "
            "Degree and entrance eligibility will be evaluated after Class 12."
        )

    response_payload = {
        "stage": stage,
        "stage_scope": "stream_selection" if stage == "class10" else "pathway_selection",
        "next_decision": "Choose your Class 11-12 stream" if stage == "class10" else None,
        "summary": {
            "title": "Your Career DNA",
            "highlights": strongest_signals_formatted,
            "message": "These highlights are based on demonstrated academic marks and reported interests.",
        },
        "groups": groups,
        "top_recommendations": top_recommendations,
        "other_paths": other_paths,
        "disclaimer": disclaimer,
        "what_we_know": what_we_know_data["user_provided_facts"],
        "what_we_know_structured": what_we_know_data,
        "strongest_signals": strongest_signals_formatted,
        "strongest_signals_structured": strongest_signals_data,
        "what_you_enjoy": what_you_enjoy,
        "what_you_appear_good_at": demonstrated_strengths,
        "what_is_still_uncertain": stage_uncertainty,
        "directions_worth_exploring": [g["group"] for g in top_recommendations],
        "why_these_directions": [g["why_this_fits"] for g in top_recommendations],
        "what_to_try_next": (
            ["Try a 10-minute discovery challenge", "Compare syllabus topics across stream options"]
            if stage == "class10" else ["Complete an aptitude/skill challenge", "Review prerequisite requirements"]
        ),
        "academic_or_career_options": [g["group"] for g in groups],
        "canonical_dna": build_canonical_career_dna(stage, answers).model_dump(),
        "experiments": dynamic_exps,
    }

    if stage == "class10":
        c10_exp = build_class10_direction_experience(answers)
        response_payload["class10_direction_experience"] = c10_exp
        is_c10_adaptive = (isinstance(answers, dict) and any(k.startswith(ADAPTIVE_QUESTION_PREFIXES) for k in answers.keys())) or isinstance(answers, QuestionnaireSession)
        if is_c10_adaptive and c10_exp.get("directions_worth_exploring"):
            response_payload["directions_worth_exploring"] = [d["group"] for d in c10_exp["directions_worth_exploring"][:3]]
            response_payload["why_these_directions"] = [d["student_rationale"] for d in c10_exp["directions_worth_exploring"][:3]]

    return response_payload

