"""
Universal career resolver.

The product requirement: the app must react meaningfully to ANY stated
goal — "IPS officer", "District Collector", "politician", "marine
biologist", "voice actor" — not just the curated 17-career seed
catalogue. It must never respond with "career not found."

Strategy (kept explainable, not a black box):
  1. Try to match existing curated Career rows (exact slug, then
     name/keyword match) — curated data always wins when it exists.
  2. If nothing matches, classify the goal into a broad sector using a
     keyword taxonomy covering the sectors the product spec requires
     (Technology, Government & Civil Services, Medicine, Law, Design,
     Defence, Aviation, Education, Media, Skilled Trades, Business,
     Science & Research, Politics & Public Service, Sports, Arts, ...).
  3. Synthesize a new Career row from that sector's GENERIC pathway
     template, with the user's exact wording as the name. This row is
     flagged is_user_generated=True, needs_verification=True so the UI
     can visibly mark it as "generated from a general template — verify
     specifics on official sources" (spec §41/§42 — never invent exam
     dates/eligibility as fact).
  4. The synthesized career flows through the SAME scoring/roadmap/chat
     pipeline as curated careers — no special-cased code downstream.

This keeps a hard boundary: FACTS (exam names, fee figures, deadlines)
are never fabricated for a synthesized career — the template only
supplies generic, stage-structured *process* guidance ("build subject
foundation", "identify the relevant competitive exam and verify its
current eligibility on the official site") rather than invented
specifics.
"""
import re
from difflib import SequenceMatcher
from sqlalchemy.orm import Session

from .. import models

# keyword -> sector. Order matters: more specific keywords should be
# checked before generic ones (handled by iterating a list, not a dict,
# so earlier entries win ties).
SECTOR_KEYWORDS = [
    (["collector", "district collector", "ips", "ias", "ifs officer", "civil service", "upsc", "bureaucrat",
      "administrative service", "police officer", "magistrate"], "Government & Civil Services"),
    (["politician", "mla", "mp", "member of parliament", "political leader", "public office", "elected office",
      "corporator", "sarpanch", "political career"], "Politics & Public Service"),
    (["software", "developer", "programmer", "coding", "app development", "web development", "devops",
      "cloud engineer", "backend", "frontend", "full stack"], "Technology"),
    (["data scientist", "machine learning", "ai engineer", "artificial intelligence", "data analyst"], "Technology"),
    (["cyber", "security analyst", "ethical hacker", "penetration tester"], "Technology"),
    (["doctor", "physician", "surgeon", "mbbs", "dentist", "nurse", "medicine", "healthcare", "physiotherap",
      "pharmacist", "veterinar"], "Medicine & Healthcare"),
    (["lawyer", "advocate", "judge", "legal", "litigation", "law career"], "Law"),
    (["architect", "urban planner"], "Design & Architecture"),
    (["designer", "ui/ux", "graphic design", "fashion design", "interior design", "product design"], "Design"),
    (["mechanical engineer", "civil engineer", "electrical engineer", "electronics engineer", "engineer"], "Engineering"),
    (["scientist", "researcher", "research scholar", "isro", "drdo", "csir", "physicist", "chemist", "biologist",
      "marine biolog", "astronomer"], "Science & Research"),
    (["professor", "academic", "lecturer", "teacher", "teaching"], "Education & Research"),
    (["pilot", "aviation", "air traffic control", "aeronautic"], "Aviation"),
    (["army", "navy", "air force", "defence officer", "military"], "Defence"),
    (["banker", "banking", "investment", "finance officer", "financial analyst"], "Banking & Finance"),
    (["chartered accountant", "company secretary", "ca", "accountant", "auditor"], "Finance & Commerce"),
    (["entrepreneur", "startup founder", "founder", "business owner"], "Business & Entrepreneurship"),
    (["journalist", "media", "news anchor", "film maker", "director", "screenwriter", "actor", "voice actor",
      "musician", "content creator", "influencer"], "Media & Arts"),
    (["athlete", "sportsperson", "cricketer", "footballer", "coach"], "Sports"),
    (["social worker", "ngo", "activist", "counsellor", "psycholog"], "Social Sciences"),
    (["electrician", "plumber", "mechanic", "welder", "carpenter", "technician", "fitter"], "Skilled Trades"),
    (["farmer", "agriculture", "agronomist"], "Agriculture"),
    (["chef", "culinary", "hotel management", "hospitality"], "Hospitality"),
    (["diplomat", "foreign service", "ambassador"], "Government & Civil Services"),
]

STAGE_LABELS = {
    "class10": "Class 10", "class12": "Class 11-12", "diploma": "Diploma",
    "ug": "Undergraduate", "pg": "Postgraduate", "phd": "Doctorate", "professional": "Working professional",
}

STAGE_SEQUENCE = ["class10", "class12", "diploma", "ug", "pg", "phd", "professional"]


def _stage_key(education_stage: str | None) -> str:
    if education_stage in STAGE_LABELS:
        return education_stage
    return "default"


def _stage_label(stage_key: str) -> str:
    return STAGE_LABELS.get(stage_key, stage_key.replace("_", " ").title())


def _normalize_text(text: str) -> str:
    text = re.sub(r"[^a-z0-9]+", " ", (text or "").lower())
    tokens = []
    for token in text.split():
        if token in {"engg", "engineering"}:
            tokens.append("engineer")
            continue
        if token.endswith("engineering"):
            tokens.append(token[: -len("engineering")] + "engineer")
            continue
        if token.endswith("engineers"):
            tokens.append(token[:-1])
            continue
        if token.endswith("ies") and len(token) > 3:
            tokens.append(token[:-3] + "y")
            continue
        if token.endswith("s") and len(token) > 3 and not token.endswith("ss"):
            tokens.append(token[:-1])
            continue
        tokens.append(token)
    return " ".join(tokens)


def _similarity_score(left: str, right: str) -> float:
    left_norm = _normalize_text(left)
    right_norm = _normalize_text(right)
    if not left_norm or not right_norm:
        return 0.0
    sorted_left = " ".join(sorted(left_norm.split()))
    sorted_right = " ".join(sorted(right_norm.split()))
    return max(
        SequenceMatcher(None, left_norm, right_norm).ratio(),
        SequenceMatcher(None, sorted_left, sorted_right).ratio(),
    )


def _make_step(
    stage_key: str,
    goal: str,
    why: str,
    prerequisites: list[str],
    actions: list[str],
    resources: list[str],
    estimated_time: str,
) -> dict:
    return {
        "stage_key": stage_key,
        "stage_label": _stage_label(stage_key),
        "goal": goal,
        "why": why,
        "prerequisites": prerequisites,
        "actions": actions,
        "resources": resources,
        "estimated_time": estimated_time,
    }


def _sector_profile(track: str, foundation: str, entry: str, practice: str, transition: str, sources: str, backup: str, verify: str):
    return {
        "track": track,
        "foundation": foundation,
        "entry": entry,
        "practice": practice,
        "transition": transition,
        "sources": sources,
        "backup": backup,
        "verify": verify,
    }


SECTOR_PROFILES = {
    "Technology": _sector_profile(
        "technology and software products",
        "Mathematics, problem solving, and digital literacy",
        "a CS/IT degree, a coding bootcamp, or another software-adjacent route",
        "coding, debugging, projects, internships, and system thinking",
        "web, mobile, data, platform, or infrastructure roles",
        "official institute admissions, company career pages, and campus placement notices",
        "a product, data, or QA path if pure software hiring is tight",
        "current syllabus and eligibility on the institute or exam's official site",
    ),
    "Engineering": _sector_profile(
        "engineering branches and applied design",
        "Physics, Chemistry, Mathematics (PCM)",
        "JEE Main / state CET -> B.Tech or B.E.",
        "CAD, labs, prototypes, design reviews, and internships",
        "design, production, R&D, maintenance, or PSU-style technical roles",
        "NTA, state CET portals, institute admissions, GATE, and PSU notices",
        "a diploma or allied technical route if the main engineering seat is not available",
        "current eligibility and syllabus on the official admission / recruitment notice",
    ),
    "Science & Research": _sector_profile(
        "science and research work",
        "strong math/science fundamentals and research curiosity",
        "science UG programs, integrated degrees, or research-oriented admissions",
        "labs, reading papers, mini-projects, and research internships",
        "research assistant, master's, or PhD-track roles",
        "institute admissions, lab pages, fellowship notices, and official research recruitment",
        "an allied science, analytics, or teaching route if research entry takes longer",
        "current program eligibility on the institution or fellowship page",
    ),
    "Education & Research": _sector_profile(
        "teaching and academic research",
        "subject mastery, reading, writing, and explanation skills",
        "a relevant bachelor's degree followed by master's / qualifying exam / PhD routes",
        "lesson design, tutoring, research writing, and classroom or lab practice",
        "teaching, academic research, or training roles",
        "university notices, fellowship pages, and official hiring portals",
        "school teaching, tutoring, or content development if faculty hiring is delayed",
        "current qualification and vacancy details on official notices",
    ),
    "Government & Civil Services": _sector_profile(
        "government administration and civil service",
        "reading, writing, current affairs, and structured reasoning",
        "official civil-service or public-service recruitment notifications",
        "answer writing, mock tests, issue analysis, and interview practice",
        "training, allotment, and early public-administration responsibilities",
        "official exam notifications, government recruitment pages, and service allotment notices",
        "state services, allied government exams, or policy support roles",
        "the current syllabus, eligibility, and schedule on the official notification",
    ),
    "Politics & Public Service": _sector_profile(
        "politics and public service",
        "public speaking, local issue work, and civic understanding",
        "party, community, NGO, or local-governance entry routes rather than one fixed exam",
        "field work, issue mapping, public communication, and coalition building",
        "ward, local-body, organisational, or policy roles with visible public impact",
        "official party/community/public-service announcements and verified local-government sources",
        "public administration, advocacy, or social-impact roles if electoral entry is slow",
        "current local rules, eligibility, and selection process from the official body",
    ),
    "Medicine & Healthcare": _sector_profile(
        "medicine and healthcare",
        "Physics, Chemistry, and Biology (PCB)",
        "NEET-UG or the relevant healthcare admissions route",
        "clinical observation, anatomy, communication, and supervised practice",
        "internship, licensing, or specialization routes depending on the profession",
        "NTA, medical college, and official counselling notices",
        "allied healthcare routes such as dentistry, nursing, physiotherapy, or AYUSH",
        "the current eligibility and counselling schedule on the official notice",
    ),
    "Law": _sector_profile(
        "law and legal practice",
        "reading comprehension, reasoning, and structured writing",
        "CLAT / AILET / state law entrance or the graduate LLB route",
        "moot courts, internships, legal drafting, and case reading",
        "bar enrolment, litigation, in-house counsel, or judiciary prep",
        "law school notices, Bar Council rules, and official court or recruitment pages",
        "policy, compliance, or legal research roles if litigation is not the right fit",
        "current admission and enrolment rules on the official law-school or council site",
    ),
    "Design & Architecture": _sector_profile(
        "architecture and built-environment design",
        "Math, spatial reasoning, and visual thinking",
        "NATA / JEE Main Paper 2 or another architecture admissions route",
        "studio work, drawings, model-making, and site observation",
        "B.Arch, internship, portfolio, and registration-based practice",
        "official architecture college admissions and Council of Architecture notices",
        "interior, urban, or industrial design if architecture admission is not the right fit",
        "current eligibility and syllabus on the official admissions notice",
    ),
    "Design": _sector_profile(
        "digital, graphic, fashion, product, or interior design",
        "visual thinking, communication, and creative practice",
        "a design degree, a foundation program, or a strong self-built portfolio",
        "portfolio projects, critique, iteration, and user testing",
        "junior designer, studio assistant, freelancer, or internship-based entry",
        "official design-school admissions, portfolio briefs, and studio call pages",
        "a related design niche if the first portfolio target is not the right fit",
        "current brief, admission, or call requirements on the official source",
    ),
    "Aviation": _sector_profile(
        "aviation and flight operations",
        "Physics, Mathematics, discipline, and medical fitness",
        "DGCA-approved training plus the required medical clearances",
        "flying hours, simulator practice, and safety discipline",
        "first officer, flight operations, or air traffic control routes",
        "DGCA, approved flying schools, and airline career pages",
        "defence aviation or airport operations if civil aviation entry is delayed",
        "current medical and licensing rules on the official aviation authority site",
    ),
    "Defence": _sector_profile(
        "defence service and military leadership",
        "physical fitness, discipline, and officer-like qualities",
        "NDA, CDS, AFCAT, or the current defence recruitment route",
        "fitness, leadership, mock interviews, and branch-specific preparation",
        "training, commissioning, and service-based specialization",
        "official defence recruitment notifications and service academy pages",
        "other uniformed or security-service routes if the preferred branch is not open",
        "the current eligibility and selection process on the official defence notice",
    ),
    "Banking & Finance": _sector_profile(
        "banking and financial services",
        "numeracy, reasoning, communication, and awareness of financial systems",
        "bank recruitment exams or a finance-focused entry route after graduation",
        "quantitative aptitude, reasoning, banking awareness, and interview practice",
        "probationary officer, specialist officer, branch, or analyst roles",
        "official bank recruitment pages, PSU notices, and the recruiting organisation's portal",
        "a commerce, analytics, or operations route if pure banking hiring is crowded",
        "current recruitment stages and eligibility on the official notice",
    ),
    "Finance & Commerce": _sector_profile(
        "accounting, commerce, and professional finance",
        "commerce, numeracy, and business fundamentals",
        "ICAI / ICSI / professional commerce qualification routes",
        "accounting practice, audit work, case studies, and articleship or internship experience",
        "qualified finance, audit, or compliance roles",
        "official institute notifications and verified employer recruitment pages",
        "banking, analytics, or business operations if the chosen qualification path changes",
        "current exam structure and eligibility on the official institute site",
    ),
    "Business & Entrepreneurship": _sector_profile(
        "business building and entrepreneurship",
        "problem solving, communication, and market awareness",
        "there is no fixed entrance; the route is usually skill-first plus venture validation",
        "customer discovery, prototypes, pilots, and feedback loops",
        "founder, operator, product, sales, or small-business roles",
        "incubator, startup-program, and official scheme pages",
        "an intrapreneur, product, or operations track if launching is not the right time",
        "current program or scheme rules on the official page",
    ),
    "Media & Arts": _sector_profile(
        "media, arts, and creative production",
        "storytelling, observation, and consistent creative practice",
        "portfolio, reel, audition, or project-based entry rather than one fixed exam",
        "drafts, recordings, portfolios, rehearsal, feedback, and networking",
        "assistant, junior creative, freelance, or first credited work",
        "official institute briefs, casting notices, and verified production call pages",
        "adjacent creative work such as editing, copy, or social content if the first niche is crowded",
        "current brief or call requirements on the official notice",
    ),
    "Sports": _sector_profile(
        "competitive sport and coaching",
        "fitness, repetition, technique, and mental discipline",
        "club, academy, federation, or trial-based entry depending on the sport",
        "daily training, match practice, performance tracking, and coaching",
        "club, district, state, or national-level selection and support roles",
        "official federation, association, and trial notices",
        "coaching, strength-and-conditioning, or sports administration if competition is not the main path",
        "the current trial or selection criteria on the official notice",
    ),
    "Social Sciences": _sector_profile(
        "social work, counselling, and community-facing public work",
        "listening, empathy, writing, and understanding people and systems",
        "social-science, psychology, sociology, or counselling-oriented study routes",
        "community projects, supervised practice, and reflective field work",
        "NGO, counselling, policy, or community-program roles",
        "official institute admissions, NGO hiring pages, and state or central scheme notices",
        "education, research, or program-management work if direct field entry is slow",
        "current qualification rules on the official source",
    ),
    "Skilled Trades": _sector_profile(
        "skilled trade work and technical services",
        "tool safety, manual practice, and practical problem solving",
        "ITI, apprenticeship, diploma, or trade-certification entry routes",
        "shop-floor practice, supervised repetition, and local work experience",
        "licensed technician, contractor, supervisor, or self-employed trade work",
        "state ITI notices, apprenticeship pages, and local licensing rules",
        "a diploma or lateral-entry engineering route if the trade evolves into technical supervision",
        "current trade or licence requirements on the official/local notice",
    ),
    "Agriculture": _sector_profile(
        "agriculture and agri-business",
        "biology, soil awareness, observation, and field discipline",
        "agriculture, agri-science, horticulture, or allied admission routes",
        "farm practice, experiments, field visits, and local problem solving",
        "farm management, extension, research, supply-chain, or agri-tech roles",
        "official university admissions, ICAR-style notices, and state agriculture departments",
        "agri-tech, food systems, or allied science if the core route changes",
        "current admission or recruitment details on the official source",
    ),
    "Hospitality": _sector_profile(
        "hospitality and service management",
        "service mindset, communication, and operational discipline",
        "hotel management, hospitality management, or apprenticeship-style entry",
        "front-office practice, service standards, teamwork, and customer handling",
        "hotel, travel, events, or food-service operations roles",
        "official institute admissions, hotel-chain career pages, and training notices",
        "event operations, tourism, or food-service administration if hotel roles are crowded",
        "current course or hiring requirements on the official page",
    ),
    "General / Cross-domain": _sector_profile(
        "a cross-domain or still-unclear career",
        "broad curiosity, reading, and local exploration",
        "a general degree, short course, or exploratory project before narrowing down",
        "sampling the field, talking to practitioners, and keeping a small proof of interest",
        "the first practical role that teaches the real job",
        "official course pages, job notices, and trusted institutional sources",
        "another adjacent field if the first guess turns out to be wrong",
        "the current notice on the official source you are checking",
    ),
}


def _build_stage_steps(profile: dict, stage_key: str, source_hint: str | None = None) -> list[dict]:
    stage_label = _stage_label(stage_key)
    track = profile["track"]
    foundation = profile["foundation"]
    entry = profile["entry"]
    practice = profile["practice"]
    transition = profile["transition"]
    sources = profile["sources"]
    backup = profile["backup"]
    verify = profile["verify"]
    source_suffix = f" using the curated path for {source_hint}" if source_hint else ""

    if stage_key == "class10":
        return [
            _make_step(
                stage_key,
                f"Explore {track}",
                f"Understand what day-to-day work in {track} looks like before you commit your next academic choice.",
                ["No prior technical or professional experience is required."],
                [
                    f"Talk to 2 people already working in {track}{source_suffix}.",
                    f"Read the official material that explains how people enter {track}.",
                    "Write down what sounds interesting and what does not.",
                ],
                [sources, verify],
                "1-2 weeks",
            ),
            _make_step(
                stage_key,
                f"Choose the route that keeps {entry} open",
                f"Pick the school stream or base route that keeps the main entry path into {track} available.",
                [foundation],
                [
                    f"Compare the main route with one backup route for {track}.",
                    "Check subject requirements and eligibility on the official notice before you decide.",
                    "Tell your school counsellor what route you are leaning toward.",
                ],
                [sources, "School counsellor / mentor"],
                "1 week",
            ),
            _make_step(
                stage_key,
                "Verify the official entry map",
                f"Collect the current admissions, syllabus, or recruitment rules that lead into {track}.",
                ["A confirmed subject or stream choice."],
                [
                    f"Bookmark the official admissions / recruitment pages for {track}.",
                    "Save the syllabus, eligibility rules, and deadlines in one place.",
                    "Note one backup path in case the first option changes.",
                ],
                [verify, sources],
                "1 week",
            ),
            _make_step(
                stage_key,
                "Do one proof-of-interest project",
                f"Build a tiny project, reading log, or observation exercise tied to {practice}.",
                ["A basic understanding of the field from the first three steps."],
                [
                    f"Do a small project or shadowing exercise related to {practice}.",
                    "Save the output in a folder, notebook, or portfolio.",
                    "Use it to decide whether the field still feels right.",
                ],
                ["Your own notes / folder", sources],
                "2-4 weeks",
            ),
        ]

    if stage_key in {"class12", "diploma"}:
        return [
            _make_step(
                stage_key,
                f"Lock the {stage_label.lower()} route into {track}",
                f"Use the current school or diploma stage to keep the main route into {track} open.",
                [foundation],
                [
                    f"Choose the route that keeps {entry} available.",
                    "Decide the main route and one fallback route before the application window opens.",
                    f"Discuss the plan with a teacher or mentor who knows {track} admissions.",
                ],
                [sources, verify],
                "1-2 weeks",
            ),
            _make_step(
                stage_key,
                f"Prepare for the official entry process",
                f"Start focused preparation for the syllabus, test, or selection process that leads into {track}.",
                [f"The subject or diploma route needed for {entry} is already chosen."],
                [
                    f"Use official syllabus / notification material for {entry}.",
                    f"Solve practice questions or build practice work that mirrors {practice}.",
                    "Track weak areas every week.",
                ],
                [verify, sources],
                "4-12 weeks",
            ),
            _make_step(
                stage_key,
                f"Build evidence for {track}",
                f"Create a project, portfolio, or practice record that proves you can do the work.",
                ["A clear main route and preparation plan."],
                [
                    f"Collect one project, lab record, portfolio piece, or practice sample linked to {practice}.",
                    f"Write a short note on how that evidence maps to {transition}.",
                ],
                ["Portfolio / notebook / project folder", sources],
                "2-6 weeks",
            ),
            _make_step(
                stage_key,
                f"Keep a backup route into {track}",
                f"Keep one realistic fallback alive while you keep working on the main route.",
                ["The first route is underway."],
                [
                    f"List one backup route that still leads to {track} or a nearby adjacent role.",
                    f"Check whether {backup} is realistic for your current stage.",
                    "Keep the backup route visible until the main route is confirmed.",
                ],
                [sources, verify],
                "1 week",
            ),
        ]

    if stage_key == "ug":
        return [
            _make_step(
                stage_key,
                f"Deepen core skills for {track}",
                f"Use your degree years to turn theory into practical ability in {track}.",
                [foundation],
                [
                    f"Finish one course/project that strengthens {practice}.",
                    "Keep a running list of what recruiters or supervisors actually ask for.",
                    "Keep one eye on internships and one eye on the next academic step.",
                ],
                [sources, verify],
                "1 semester",
            ),
            _make_step(
                stage_key,
                "Complete an internship or supervised practice",
                f"Try the work in a real environment so you can judge fit and improve faster.",
                ["A basic handle on the subject or tooling."],
                [
                    f"Apply for internships, labs, studios, apprenticeships, or field work tied to {track}.",
                    "Record what you learned and what you still need to learn.",
                ],
                [sources, "Internship / lab / studio page"],
                "4-12 weeks",
            ),
            _make_step(
                stage_key,
                f"Check the next entry or specialization route",
                f"Use the official notices to see whether your next move is an exam, application, or specialization choice.",
                [f"An internship or project record for {track} has started."],
                [
                    f"Review the current official route into {track} and save the syllabus or program requirements.",
                    "Compare direct entry with one higher-study route.",
                ],
                [sources, verify],
                "1-2 weeks",
            ),
            _make_step(
                stage_key,
                f"Prepare the first serious application or portfolio",
                f"Turn your coursework and practice into a first real application for {track}.",
                ["A project and internship record are on hand."],
                [
                    f"Prepare the first application, test, or portfolio for {transition}.",
                    "Ask one mentor to review it before you submit.",
                ],
                ["Portfolio / CV / application draft", sources],
                "2-4 weeks",
            ),
        ]

    if stage_key in {"pg", "phd"}:
        return [
            _make_step(
                stage_key,
                f"Choose the specialization inside {track}",
                f"Use postgraduate study to narrow into the part of {track} you want to own.",
                ["A completed bachelor's degree or equivalent."],
                [
                    f"Pick a specialization aligned with {practice} and {transition}.",
                    "Check the current admission or fellowship rules for the specialization.",
                ],
                [sources, verify],
                "1-2 weeks",
            ),
            _make_step(
                stage_key,
                "Build research / advanced practice depth",
                f"Strengthen the evidence that you can operate independently in {track}.",
                ["You already have the base degree."],
                [
                    f"Complete one substantial project, dissertation, lab effort, or advanced practice piece linked to {practice}.",
                    "Write down how this work improves your placement or research profile.",
                ],
                ["Thesis / project / portfolio folder", sources],
                "1 semester",
            ),
            _make_step(
                stage_key,
                "Verify the current entry or hiring process",
                f"Check the exact admission, fellowship, or recruitment route that opens the next door in {track}.",
                ["A specialization direction is now chosen."],
                [
                    f"Read the official notice for the next {track} entry point.",
                    "Save current eligibility, deadlines, and document rules in one place.",
                ],
                [verify, sources],
                "1 week",
            ),
            _make_step(
                stage_key,
                f"Position for the next role in {track}",
                f"Prepare for the first high-confidence role, fellowship, or advanced study move.",
                ["Specialization work is underway."],
                [
                    f"Update the CV / portfolio / application to reflect {transition}.",
                    "Ask one supervisor or mentor to review it.",
                ],
                ["CV / portfolio / application draft", sources],
                "2-4 weeks",
            ),
        ]

    if stage_key == "professional":
        return [
            _make_step(
                stage_key,
                f"Map your transferable skills into {track}",
                f"Translate your current experience into the language that {track} hiring managers actually use.",
                ["You already have work experience or a prior qualification."],
                [
                    f"List the experience that maps cleanly to {practice}.",
                    "Write the gap list in plain language.",
                ],
                [sources, verify],
                "3-7 days",
            ),
            _make_step(
                stage_key,
                f"Close the skill gap for {track}",
                f"Add only the skills, tools, or evidence that the next role truly needs.",
                ["You know the target role and the gap list."],
                [
                    f"Choose one bridge course, certification, portfolio project, or supervised practice item tied to {practice}.",
                    "Avoid collecting credentials that do not change the hiring decision.",
                ],
                [sources, verify],
                "2-8 weeks",
            ),
            _make_step(
                stage_key,
                f"Build proof and credibility",
                f"Make it easy for the next employer, client, or selector to see that you can already do the work.",
                ["A target role and one gap-filling action are in progress."],
                [
                    f"Publish or compile proof of work relevant to {transition}.",
                    "Collect references, portfolio samples, or a short case study.",
                ],
                ["Portfolio / references / case study", sources],
                "2-6 weeks",
            ),
            _make_step(
                stage_key,
                f"Apply to the first transition role",
                f"Target one concrete opening, then iterate from there instead of waiting for a perfect fit.",
                ["The proof-of-skill packet is ready."],
                [
                    f"Apply to roles or programmes that lead into {track}.",
                    "Track every response and keep one backup route alive.",
                ],
                [sources, verify],
                "1-3 weeks",
            ),
        ]

    return [
        _make_step(
            "default",
            f"Explore {track}",
            f"Start with a broad, low-risk overview of {track}.",
            ["No fixed prerequisites yet."],
            [
                f"Read the official route into {track}.",
                "Talk to one practitioner and one mentor.",
            ],
            [sources, verify],
            "1-2 weeks",
        ),
        _make_step(
            "default",
            f"Choose a route into {track}",
            f"Pick the most realistic entry route and keep one backup.",
            ["You now know the field at a high level."],
            [
                f"Shortlist the main route and a backup route for {track}.",
                "Check the current official notice before you commit.",
            ],
            [sources, verify],
            "1 week",
        ),
    ]


def build_roadmap_steps_for_sector(sector: str, education_stage: str | None) -> list[dict]:
    profile = SECTOR_PROFILES.get(sector, SECTOR_PROFILES["General / Cross-domain"])
    return _build_stage_steps(profile, _stage_key(education_stage))


def flatten_pathway_steps(steps_json) -> list[dict]:
    def _normalize_step(step: dict) -> dict:
        normalized = dict(step)
        action = normalized.get("action") or normalized.get("goal") or normalized.get("title")
        if action and "action" not in normalized:
            normalized["action"] = action
        if action and "goal" not in normalized:
            normalized["goal"] = action
        return normalized

    if isinstance(steps_json, list):
        return [_normalize_step(step) for step in steps_json]
    if not isinstance(steps_json, dict):
        return []

    flattened: list[dict] = []
    for key in STAGE_SEQUENCE + ["default"]:
        items = steps_json.get(key)
        if items:
            flattened.extend(_normalize_step(item) for item in items)
    for key, items in steps_json.items():
        if key not in STAGE_SEQUENCE and key != "default" and items:
            flattened.extend(_normalize_step(item) for item in items)
    return flattened


def _curated_source_actions(steps_json) -> list[str]:
    actions = []
    for step in flatten_pathway_steps(steps_json):
        action = step.get("action") or step.get("goal") or step.get("title")
        if action:
            actions.append(action)
    return actions


def build_roadmap_steps_for_career(career: models.Career, education_stage: str | None) -> list[dict]:
    pathway = next((p for p in career.pathways if p.route_type == "common"), career.pathways[0] if career.pathways else None)
    if not pathway or not pathway.steps_json:
        return build_roadmap_steps_for_sector(career.sector, education_stage)

    stage_key = _stage_key(education_stage)
    steps_json = pathway.steps_json

    if isinstance(steps_json, dict):
        selected = steps_json.get(stage_key) or steps_json.get("default")
        if selected:
            return selected
        return flatten_pathway_steps(steps_json) or build_roadmap_steps_for_sector(career.sector, education_stage)

    source_actions = _curated_source_actions(steps_json)
    if not source_actions:
        return build_roadmap_steps_for_sector(career.sector, education_stage)

    profile = SECTOR_PROFILES.get(career.sector, SECTOR_PROFILES["General / Cross-domain"])
    lead_action = source_actions[0]
    middle_action = source_actions[min(1, len(source_actions) - 1)]
    tail_action = source_actions[-1]

    if stage_key == "class10":
        return [
            _make_step(stage_key, f"Explore {career.name}", f"Understand what a real route into {career.name} looks like.", ["No prior experience is required."], [f"Read the curated pathway for {career.name}.", f"Talk to someone who already works in this field about {lead_action.lower()}.", "Write down what sounds appealing and what does not."], [profile["sources"], profile["verify"]], "1-2 weeks"),
            _make_step(stage_key, f"Choose the school route that keeps {lead_action.lower()} open", f"Keep the right subjects and route open early, before doors close.", [profile["foundation"]], [f"Compare the main route and one backup route for {career.name}.", f"Check whether the current school stage keeps {lead_action.lower()} available."], [profile["sources"], profile["verify"]], "1 week"),
            _make_step(stage_key, "Do one proof-of-interest task", f"A tiny project or observation makes the choice more concrete.", ["A basic read on the field."], [f"Do one small task connected to {middle_action.lower()}.", "Save the result in a notebook or folder."], ["Your own notes / folder", profile["sources"]], "2-4 weeks"),
            _make_step(stage_key, "Keep a fallback path visible", f"Do not rely on one route before the official route is confirmed.", ["The main route has been identified."], [f"Write one backup route that could still lead to {career.name}.", "Check the official notice before you commit."], [profile["sources"], profile["verify"]], "1 week"),
        ]

    if stage_key in {"class12", "diploma"}:
        return [
            _make_step(stage_key, f"Lock the {STAGE_LABELS[stage_key].lower()} route for {career.name}", f"Use the current school or diploma stage to keep the main route open.", [profile["foundation"]], [f"Confirm the entry route around {lead_action.lower()}.", f"Shortlist the main and fallback route for {career.name}.", "Ask a mentor or teacher to sanity-check the plan."], [profile["sources"], profile["verify"]], "1-2 weeks"),
            _make_step(stage_key, f"Prepare for the official process for {career.name}", f"Start practicing for the actual exam, application, or selection process.", ["The route is now chosen."], [f"Use the current official syllabus / notification for {lead_action.lower()}.", f"Build one project or practice record tied to {middle_action.lower()}.", "Track weak areas weekly."], [profile["sources"], profile["verify"]], "4-12 weeks"),
            _make_step(stage_key, f"Build evidence for {career.name}", f"Create proof that you can already do part of the work.", ["Preparation is underway."], [f"Collect one sample of work related to {tail_action.lower()}.", "Write a short note mapping it to the target field."], ["Portfolio / notebook / project folder", profile["sources"]], "2-6 weeks"),
            _make_step(stage_key, f"Keep one backup route into {career.name}", f"Stay flexible while the main route is still uncertain.", ["A main route is underway."], [f"Write down one adjacent role or route that still leads toward {career.name}.", "Keep the backup route visible until you get a decision."], [profile["sources"], profile["verify"]], "1 week"),
        ]

    if stage_key == "ug":
        return [
            _make_step(stage_key, f"Deepen core skills for {career.name}", f"Turn course content into practical ability.", [profile["foundation"]], [f"Finish one project or course that strengthens {lead_action.lower()}.", "Keep notes on what recruiters or supervisors actually ask for.", "Use your degree years to build proof, not just attendance."], [profile["sources"], profile["verify"]], "1 semester"),
            _make_step(stage_key, f"Complete internship or supervised practice", f"Try the field in a real environment before you commit further.", ["A basic handle on the subject."], [f"Apply for internships, labs, studios, apprenticeship, or field work tied to {middle_action.lower()}.", "Record what you learned and what still needs work."], [profile["sources"], "Internship / lab / studio page"], "4-12 weeks"),
            _make_step(stage_key, f"Check the next entry or specialization route", f"Use the official notices to see whether the next move is an exam, application, or specialization choice.", ["You have one project or internship record."], [f"Review the current official route into {career.name}.", "Compare direct entry with one higher-study route."], [profile["sources"], profile["verify"]], "1-2 weeks"),
            _make_step(stage_key, f"Prepare the first serious application", f"Turn coursework and practice into a first real application.", ["The project/internship record is on hand."], [f"Prepare the first application, test, or portfolio for {tail_action.lower()}.", "Ask one mentor to review it before you submit."], ["Portfolio / CV / application draft", profile["sources"]], "2-4 weeks"),
        ]

    if stage_key in {"pg", "phd"}:
        return [
            _make_step(stage_key, f"Choose the specialization inside {career.name}", f"Use postgraduate study to narrow into the part of the field you want to own.", ["A completed bachelor's degree or equivalent."], [f"Pick a specialization aligned with {middle_action.lower()}.", "Check the current admission or fellowship rules for that specialisation."], [profile["sources"], profile["verify"]], "1-2 weeks"),
            _make_step(stage_key, f"Build research or advanced practice depth", f"Strengthen the evidence that you can operate independently in the field.", ["The base degree is already complete."], [f"Complete one substantial project, dissertation, lab effort, or advanced practice piece linked to {middle_action.lower()}.", "Write down how this work improves your placement or research profile."], ["Thesis / project / portfolio folder", profile["sources"]], "1 semester"),
            _make_step(stage_key, f"Verify the current entry or hiring process", f"Check the exact admission, fellowship, or recruitment route that opens the next door.", ["A specialization direction is now chosen."], [f"Read the official notice for the next {career.name} entry point.", "Save eligibility, deadlines, and document rules in one place."], [profile["verify"], profile["sources"]], "1 week"),
            _make_step(stage_key, f"Position for the next role in {career.name}", f"Prepare for the first high-confidence role, fellowship, or advanced study move.", ["Specialisation work is underway."], [f"Update the CV / portfolio / application to reflect {tail_action.lower()}.", "Ask one supervisor or mentor to review it."], ["CV / portfolio / application draft", profile["sources"]], "2-4 weeks"),
        ]

    if stage_key == "professional":
        return [
            _make_step(stage_key, f"Map transferable skills into {career.name}", f"Translate your current experience into the language employers or selectors use for this field.", ["You already have work experience or a prior qualification."], [f"List the experience that maps cleanly to {lead_action.lower()}.", "Write the gap list in plain language."], [profile["sources"], profile["verify"]], "3-7 days"),
            _make_step(stage_key, f"Close the skill gap for {career.name}", f"Add only the skills, tools, or evidence that the next role truly needs.", ["You know the target role and the gap list."], [f"Choose one bridge course, certification, portfolio project, or supervised practice item tied to {middle_action.lower()}.", "Avoid collecting credentials that do not change the hiring decision."], [profile["sources"], profile["verify"]], "2-8 weeks"),
            _make_step(stage_key, f"Build proof and credibility", f"Make it easy for the next employer, client, or selector to see that you can already do the work.", ["A target role and one gap-filling action are in progress."], [f"Publish or compile proof of work relevant to {tail_action.lower()}.", "Collect references, portfolio samples, or a short case study."], ["Portfolio / references / case study", profile["sources"]], "2-6 weeks"),
            _make_step(stage_key, f"Apply to the first transition role", f"Target one concrete opening instead of waiting for a perfect fit.", ["The proof-of-skill packet is ready."], [f"Apply to roles or programmes that lead into {career.name}.", "Track every response and keep one backup route alive."], [profile["sources"], profile["verify"]], "1-3 weeks"),
        ]

    return build_roadmap_steps_for_sector(career.sector, education_stage)


def _pick_pathway_steps(steps_json, education_stage: str | None) -> list[dict]:
    if isinstance(steps_json, dict):
        stage_key = _stage_key(education_stage)
        return steps_json.get(stage_key) or steps_json.get("default") or flatten_pathway_steps(steps_json)
    return flatten_pathway_steps(steps_json)


def _slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:100] or "custom-goal"


def _classify_sector(text: str) -> str:
    """Word-boundary matching, not plain substring containment — short
    keywords like 'mp', 'ips', 'ias', 'ca' would otherwise false-positive
    inside unrelated words (e.g. 'mp' inside 'completely', 'ias' inside
    'ideas'). Multi-word keywords are matched as a boundary-safe phrase."""
    t = text.lower()
    for keywords, sector in SECTOR_KEYWORDS:
        for kw in keywords:
            kw_clean = kw.strip()
            if not kw_clean:
                continue
            pattern = r"\b" + re.escape(kw_clean) + r"\b"
            if re.search(pattern, t):
                return sector
    return "General / Cross-domain"


def _find_existing(db: Session, text: str):
    slug_guess = _slugify(text)
    exact = db.query(models.Career).filter_by(slug=slug_guess).first()
    if exact:
        return exact

    needle = _normalize_text(text)
    if not needle:
        return None

    best_match = None
    best_score = 0.0
    for career in db.query(models.Career).all():
        for candidate in (career.slug, career.name):
            candidate_norm = _normalize_text(candidate)
            if candidate_norm == needle:
                return career
            score = _similarity_score(needle, candidate_norm)
            if score > best_score:
                best_score = score
                best_match = career

    if best_match and best_score >= 0.85:
        return best_match
    return None


def _synthesize(db: Session, text: str, sector: str) -> "models.Career":
    pathway_map = {
        stage: build_roadmap_steps_for_sector(sector, stage)
        for stage in ["class10", "class12", "diploma", "ug", "pg", "phd", "professional", "default"]
    }
    career = models.Career(
        slug=_slugify(text) + "-" + str(abs(hash(text)) % 10000),
        name=text.strip().title(),
        sector=sector,
        description=(
            f"A pathway generated for '{text.strip()}' ({sector}). This career isn't in the curated "
            f"catalogue yet, so the steps below are a general, stage-structured process rather than "
            f"hand-verified specifics — verify exam names, eligibility, and deadlines on official sources."
        ),
        recommended_subjects=None,
        common_entrance_exams=None,
        relevant_degrees=None,
        typical_progression="Generated from a general sector template — see roadmap steps for the process.",
        industry_sectors=sector,
        government_opportunities="Government/PSU opportunities may exist in this field — verify on official recruitment portals." if sector in (
            "Government & Civil Services", "Politics & Public Service", "Defence", "Banking & Finance") else None,
        higher_study_routes="Higher study/specialization routes are common in most fields at the postgraduate level; research this field's typical route.",
        skill_building_timeline="Varies — typically 2-6 years depending on entry route.",
        is_user_generated=True,
        needs_verification=True,
    )
    db.add(career)
    db.flush()

    db.add(models.CareerPathway(
        career_id=career.id, route_type="common", title=f"General pathway into {career.name}",
        description=f"Generated general pathway for {career.name}.", steps_json=pathway_map,
    ))
    # A second, explicitly-labelled "verify locally" backup route so the
    # multi-pathway requirement (spec §12) still holds for generated careers.
    db.add(models.CareerPathway(
        career_id=career.id, route_type="alternative",
        title="Talk to people already in this field",
        description="Directly contacting 2-3 people currently working in this field (via LinkedIn, alumni networks, "
                     "or local professional bodies) for a first-hand, current view of how they actually got in.",
        steps_json={
            "default": [
                {
                    "stage_key": "default",
                    "stage_label": "Any stage",
                    "goal": "Identify and message 2-3 working professionals in this exact field for a short informational conversation.",
                    "why": "For niche or generated pathways, a first-hand account is often more current and reliable than any static guide.",
                    "prerequisites": ["A target field and a short list of people to contact."],
                    "actions": ["Send a short, polite message asking for a 10-minute informational chat.", "Ask how they actually entered the field and what they would do differently."],
                    "resources": ["LinkedIn, alumni networks, local professional bodies"],
                    "estimated_time": "1-2 weeks",
                }
            ]
        },
    ))
    db.flush()
    return career


def resolve_or_create_career(db: Session, goal_text: str) -> "models.Career":
    """Never returns None — the whole point is that the app reacts to any input."""
    goal_text = (goal_text or "").strip()
    if not goal_text:
        raise ValueError("goal_text is required")

    existing = _find_existing(db, goal_text)
    if existing:
        return existing

    sector = _classify_sector(goal_text)
    return _synthesize(db, goal_text, sector)
