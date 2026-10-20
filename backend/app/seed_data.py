"""
Seed data. This is the documented fallback dataset (spec §14/§60): a
real, structured career/college/scholarship catalogue that ships with
the app so it works standalone. It's illustrative in scale (~20 careers,
not "5 hardcoded"), not exhaustive — production would sync this table
from AISHE/NSP/official sources via the provider abstractions below.
"""
from datetime import datetime
from sqlalchemy.orm import Session
from . import models

SKILLS = [
    ("Mathematics", "technical"), ("Physics", "technical"), ("Programming Fundamentals", "technical"),
    ("Data Structures & Algorithms", "technical"), ("Python", "technical"), ("Java", "technical"),
    ("SQL / Databases", "technical"), ("Git & Version Control", "technical"), ("Statistics", "technical"),
    ("Machine Learning", "technical"), ("Communication", "soft"), ("Essay Writing", "soft"),
    ("Current Affairs Awareness", "soft"), ("Anatomy & Physiology", "technical"), ("Clinical Reasoning", "technical"),
    ("Legal Research", "technical"), ("Financial Accounting", "technical"), ("Auditing", "technical"),
    ("CAD / Design Software", "technical"), ("Structural Analysis", "technical"), ("Aerodynamics", "technical"),
    ("Network Security", "technical"), ("Ethical Hacking Fundamentals", "technical"), ("Flight Theory", "technical"),
    ("Physical Fitness", "soft"), ("Public Speaking", "soft"), ("Business Strategy", "soft"),
    ("UI/UX Design", "technical"), ("Portfolio Building", "soft"), ("Research Methodology", "technical"),
]

INTERESTS = [
    ("Physics", "subject"), ("Mathematics", "subject"), ("Biology", "subject"), ("Computer Science", "subject"),
    ("Economics", "subject"), ("Space & Astronomy", "career_area"), ("Government Service", "career_area"),
    ("Technology", "career_area"), ("Healthcare", "career_area"), ("Law & Justice", "career_area"),
    ("Design & Creativity", "career_area"), ("Business & Finance", "career_area"), ("Research", "career_area"),
    ("Defence & Armed Forces", "career_area"), ("Teaching", "career_area"), ("Analytical Problem Solving", "hobby"),
]

# (name, slug, sector, description, subjects, exams, degrees, progression, industries, govt_opps, higher_study, timeline, pathways)
CAREERS = [
    dict(
        slug="research-scientist-isro", name="Research Scientist (Space/Aerospace — ISRO track)", sector="Science & Research",
        description="Design, build and analyze spacecraft, satellite, and launch-vehicle systems, or conduct space-science research at national labs.",
        recommended_subjects="Physics, Mathematics, Computer Science", common_entrance_exams="JEE Main/Advanced, ISRO Centralised Recruitment Board exam, GATE, IIST Admission Test",
        relevant_degrees="B.Tech Aerospace/Mechanical/EEE/CS, Integrated M.Sc Physics, M.Tech, PhD",
        typical_progression="UG in a core engineering/physics discipline -> relevant internships/projects -> ISRO Centralised Recruitment or research fellowships -> Scientist/Engineer 'SC' grade -> senior research roles.",
        industry_sectors="Government space research, defence R&D, private space-tech startups",
        government_opportunities="ISRO Centralised Recruitment Board (ICRB), DRDO, national research labs",
        higher_study_routes="M.Tech/MS in Aerospace or related specialization, PhD via institutes like IIST/IISc",
        skill_building_timeline="6-10 years from Class 11 to entry-level research role",
        pathways=[
            dict(route_type="common", title="Engineering-first route", steps=[
                ("Class 11-12", "Take Physics, Chemistry, Mathematics (PCM); build strong problem-solving habits", "PCM with strong Math/Physics is the baseline eligibility for nearly every aerospace-adjacent UG program."),
                ("Undergraduate", "B.Tech in Aerospace, Mechanical, Electronics or Computer Science at a reputed institute (via JEE or state entrance)", "ISRO recruits across multiple core engineering branches, not aerospace alone."),
                ("Undergraduate", "Join or start space-tech/robotics projects, CanSat/rocketry competitions, research internships", "Hands-on project and research exposure is consistently what separates strong ISRO/DRDO applicants."),
                ("Post-graduation", "Consider M.Tech/MS for a research-focused role, or apply directly to ISRO's Centralised Recruitment Board with a B.Tech", "ISRO hires both at B.Tech and M.Tech level for Scientist/Engineer 'SC' posts."),
                ("Entry", "Apply to ISRO Centralised Recruitment (ICRB), DRDO, or private space-tech firms (Skyroot, Agnikul etc.)", "These are the primary hiring channels for this track; verify current eligibility on isro.gov.in."),
            ]),
            dict(route_type="research", title="Physics research route", steps=[
                ("Class 11-12", "PCM with emphasis on Physics and Mathematics olympiad-style problem solving", "Strengthens candidacy for integrated science programs like IISc/IISERs."),
                ("Undergraduate", "Integrated M.Sc / BS-MS in Physics at IISc, IISERs, or a strong university physics program", "These feeder programs are common routes into space-science research roles, distinct from the engineering route."),
                ("Post-graduation", "PhD in astrophysics, space science, or related field", "Pure research roles (as opposed to engineering roles) typically require a PhD."),
                ("Entry", "Postdoctoral or scientist positions at ISRO's research centres, IUCAA, TIFR, or international space agencies", "Research-track entry differs from the engineering recruitment channel — verify current openings directly."),
            ]),
            dict(route_type="backup", title="Allied engineering / industry route", steps=[
                ("Undergraduate", "Any core engineering branch (Mechanical, Electronics, CS) at a good institute", "Keeps options open if a highly specific aerospace seat isn't secured."),
                ("Early career", "Join private aerospace/defence contractors, or a software/data role supporting space-tech (simulation, GNC software, etc.)", "Private space industry in India is growing quickly and hires broadly from core engineering backgrounds."),
                ("Mid career", "Lateral move into ISRO/DRDO via experienced-hire recruitment, or continue in private space-tech", "Experienced-hire channels exist alongside campus/direct recruitment."),
            ]),
        ],
        skills=[("Mathematics", "core"), ("Physics", "core"), ("Programming Fundamentals", "complementary")],
    ),
    dict(
        slug="software-engineer", name="Software Engineer", sector="Technology",
        description="Design, build, and maintain software systems and applications across web, mobile, or backend infrastructure.",
        recommended_subjects="Mathematics, Computer Science, Physics", common_entrance_exams="JEE Main/Advanced, state CET, university-specific tests",
        relevant_degrees="B.Tech/B.E. CSE or IT, BCA, B.Sc CS", typical_progression="UG in CS/IT -> DSA + projects -> internship -> SDE-1 -> SDE-2/3 -> Staff/Architect or management track.",
        industry_sectors="IT services, product companies, startups, fintech", government_opportunities="PSU IT roles, NIC, government digital initiatives",
        higher_study_routes="M.Tech/MS in CS, specialised certifications", skill_building_timeline="4-6 years to a solid mid-level role",
        pathways=[
            dict(route_type="common", title="Standard CS degree route", steps=[
                ("Class 11-12", "PCM stream with strong Mathematics", "Mathematics and logical reasoning underpin CS coursework and most entrance exams."),
                ("Undergraduate", "B.Tech/B.E. in CSE or IT", "Direct, most common route into software engineering roles."),
                ("Undergraduate", "Learn programming fundamentals, then DSA, Git, SQL, and build 2-3 real projects", "Recruiters weight practical project/DSA ability heavily over CGPA alone."),
                ("Undergraduate", "Do at least one internship before final year", "Internship experience materially improves placement outcomes."),
                ("Entry", "Apply for SDE/Software Engineer roles via campus placement or direct applications", "Standard entry point into the industry."),
            ]),
            dict(route_type="alternative", title="Non-CS-degree route (BCA/B.Sc + self-study)", steps=[
                ("Undergraduate", "BCA or B.Sc Computer Science if a CSE seat isn't accessible", "A legitimate, lower-cost alternative route into the same career."),
                ("Undergraduate", "Self-study DSA and build a strong public portfolio (GitHub, deployed projects)", "Portfolio and demonstrated skill increasingly substitute for degree pedigree at many companies."),
                ("Entry", "Target startups and product companies that hire on skill assessments, or pursue a bridging M.Tech/MCA", "These employers often weight practical ability over the specific UG degree."),
            ]),
        ],
        skills=[("Programming Fundamentals", "core"), ("Data Structures & Algorithms", "core"), ("Git & Version Control", "core"), ("SQL / Databases", "core")],
    ),
    dict(
        slug="data-scientist", name="Data Scientist / ML Engineer", sector="Technology",
        description="Build models and data pipelines to extract insight and power decision-making or ML-driven products.",
        recommended_subjects="Mathematics, Statistics, Computer Science", common_entrance_exams="JEE Main/Advanced, GATE (for M.Tech)",
        relevant_degrees="B.Tech CSE/IT, B.Sc Statistics/Math, M.Sc Data Science", typical_progression="Strong math/CS foundation -> programming + statistics -> ML projects -> analyst/junior DS role -> ML engineer/senior DS.",
        industry_sectors="Tech, fintech, healthcare analytics, e-commerce", government_opportunities="NITI Aayog data initiatives, Digital India projects",
        higher_study_routes="M.Sc/MS in Data Science, Statistics, or ML", skill_building_timeline="4-7 years including specialization",
        pathways=[
            dict(route_type="common", title="CS + Math foundation route", steps=[
                ("Undergraduate", "B.Tech CSE/IT or B.Sc Statistics/Mathematics", "Both provide the quantitative and programming grounding data science needs."),
                ("Undergraduate", "Learn Python, SQL, Statistics, then Machine Learning fundamentals", "This is the standard skill sequence employers expect."),
                ("Undergraduate", "Build 2-3 end-to-end ML projects with real datasets, publish on GitHub/Kaggle", "Demonstrated project work is the strongest signal for entry-level DS/ML hiring."),
                ("Entry", "Apply for Data Analyst or Junior Data Scientist roles, or an MS in Data Science for a stronger research base", "Many enter via an analyst role before moving to full ML engineering."),
            ]),
            dict(route_type="industry", title="Career-switcher route (from software/other backgrounds)", steps=[
                ("Bridge", "Strengthen statistics and ML fundamentals via structured coursework", "Programming experience transfers directly; statistics/ML theory is usually the gap."),
                ("Bridge", "Convert existing domain experience (e.g. backend, finance) into a specialised ML niche", "Domain expertise plus ML skills is a differentiated, in-demand combination."),
                ("Entry", "Target ML engineer or applied-scientist roles that value engineering background", "Companies increasingly value engineers who can also do ML, not just researchers."),
            ]),
        ],
        skills=[("Python", "core"), ("Statistics", "core"), ("Machine Learning", "core"), ("SQL / Databases", "core")],
    ),
    dict(
        slug="civil-services-ias", name="Civil Services (IAS/IPS/IFS)", sector="Government & Civil Services",
        description="Administer government policy and public services as an officer in the All India Services via UPSC.",
        recommended_subjects="Any stream — degree subject is flexible; strong general studies and writing matter more", common_entrance_exams="UPSC Civil Services Examination (Prelims, Mains, Interview)",
        relevant_degrees="Any bachelor's degree (Arts, Science, Engineering, Commerce all qualify)", typical_progression="Any UG degree -> sustained UPSC preparation (2-3 years typical) -> Prelims -> Mains -> Interview -> IAS/IPS/IFS allocation.",
        industry_sectors="Government administration, policy, public service", government_opportunities="This career IS the government opportunity — IAS, IPS, IFS, and allied central services",
        higher_study_routes="Not required, though many aspirants pursue a Master's during preparation", skill_building_timeline="Typically 2-4 years of dedicated preparation after graduation",
        pathways=[
            dict(route_type="common", title="Direct UPSC preparation route", steps=[
                ("Class 10-12", "Focus on strong fundamentals in any stream; build reading habits and general awareness", "UPSC accepts graduates from any stream, so early specialization matters less than broad literacy and reasoning."),
                ("Undergraduate", "Choose a degree you can realistically score well in (any stream is valid) while building an optional-subject interest for UPSC Mains", "Degree choice affects your later 'optional subject' choice and daily bandwidth, not eligibility."),
                ("Undergraduate/Graduate", "Start NCERT-based foundation reading, newspaper/current-affairs habit, and answer-writing practice in the final UG year", "Early starters typically need fewer attempts; UPSC allows a limited number of attempts depending on category."),
                ("Post-graduation", "1-2 years of structured preparation: Prelims (objective) -> Mains (descriptive) -> Personality Test", "This is the exact three-stage UPSC CSE structure — verify current syllabus/pattern on upsc.gov.in."),
                ("Entry", "On selection, allocation to IAS/IPS/IFS/other central services based on rank and preference; training at LBSNAA or respective academy", "Service allocation depends on rank secured and preferences filed — never guaranteed in advance."),
            ]),
            dict(route_type="backup", title="Allied/state services backup route", steps=[
                ("Parallel prep", "Simultaneously prepare for State Public Service Commission exams (state civil services) using overlapping syllabus", "State PSC exams share substantial syllabus overlap with UPSC and offer additional attempts/opportunities."),
                ("Backup", "Consider SSC CGL, banking (IBPS), or PSU exams as parallel-track government career options", "These provide financial stability and a government-service career even if UPSC CSE isn't cleared."),
            ]),
        ],
        skills=[("Essay Writing", "core"), ("Current Affairs Awareness", "core"), ("Communication", "complementary")],
    ),
    dict(
        slug="doctor-mbbs", name="Doctor (MBBS / Physician)", sector="Medicine & Healthcare",
        description="Diagnose and treat patients as a licensed medical doctor after MBBS and clinical training.",
        recommended_subjects="Physics, Chemistry, Biology", common_entrance_exams="NEET-UG (mandatory), NEET-PG (for postgraduate specialization)",
        relevant_degrees="MBBS, then MD/MS for specialization", typical_progression="PCB in Class 11-12 -> NEET-UG -> MBBS (5.5 years incl. internship) -> optional NEET-PG for specialization -> practice or further specialization.",
        industry_sectors="Hospitals, clinics, public health, private practice", government_opportunities="Government hospital postings, AIIMS/state medical services, rural service bonds",
        higher_study_routes="MD/MS specialization, DM/MCh super-specialization", skill_building_timeline="5.5 years for MBBS, 8-11 years including specialization",
        pathways=[
            dict(route_type="common", title="Standard MBBS route", steps=[
                ("Class 11-12", "PCB (Physics, Chemistry, Biology) with strong NEET-oriented preparation", "PCB is a hard prerequisite — NEET syllabus is drawn directly from the PCB curriculum."),
                ("Entrance", "Qualify NEET-UG with a competitive rank", "NEET-UG is the sole entrance exam for MBBS admission across India."),
                ("Undergraduate", "MBBS (5.5 years including 1-year compulsory rotating internship) at a government or private medical college", "Government colleges are significantly lower-cost; admission is rank- and category-dependent."),
                ("Post-graduation", "Optionally attempt NEET-PG for MD/MS specialization in a chosen field", "Specialization substantially affects career trajectory and earning potential; not mandatory to practice as a general physician."),
            ]),
            dict(route_type="alternative", title="Allied health backup route", steps=[
                ("Backup", "If NEET-UG rank doesn't secure an MBBS seat, consider BDS (Dental), BAMS/BHMS (AYUSH), Nursing, or Physiotherapy — all use PCB and often the same or related entrance ecosystem", "These are legitimate healthcare careers with lower cutoffs, not \"lesser\" fallback — many students build strong careers here."),
            ]),
        ],
        skills=[("Anatomy & Physiology", "core"), ("Clinical Reasoning", "core"), ("Communication", "complementary")],
    ),
    dict(
        slug="lawyer", name="Lawyer / Advocate", sector="Law",
        description="Practice law — litigation, corporate counsel, or specialised legal advisory — after a law degree and Bar Council enrolment.",
        recommended_subjects="Any stream (Arts/Commerce commonly chosen); English and reasoning ability matter most", common_entrance_exams="CLAT, AILET, state law entrance tests",
        relevant_degrees="5-year integrated LLB (BA LLB etc.) after Class 12, or 3-year LLB after any bachelor's degree", typical_progression="Class 12 (any stream) -> CLAT/law entrance -> 5-year integrated LLB -> internships -> Bar Council enrolment -> litigation or corporate law.",
        industry_sectors="Litigation, corporate law firms, in-house counsel, judiciary", government_opportunities="Judicial services exams, government legal cells, PSU legal departments",
        higher_study_routes="LLM specialization, judicial services preparation", skill_building_timeline="5 years for the degree, 2-3 more to establish practice",
        pathways=[
            dict(route_type="common", title="Integrated 5-year LLB route", steps=[
                ("Class 12", "Any stream is acceptable; strong English, reading comprehension and reasoning help most", "CLAT and similar entrance exams test logical reasoning and comprehension, not stream-specific knowledge."),
                ("Entrance", "Qualify CLAT/AILET or a university law entrance exam", "These are the primary gateways to National Law Universities and top private law schools."),
                ("Undergraduate", "5-year integrated LLB (e.g. BA LLB) with moot courts and at least 2-3 internships under practicing lawyers/firms", "Practical exposure through internships strongly influences early career opportunities."),
                ("Entry", "Enrol with the Bar Council of India, then join a law firm, litigation practice, or corporate legal team", "Bar Council enrolment is a mandatory legal requirement to practice as an advocate."),
            ]),
            dict(route_type="alternative", title="Post-graduate 3-year LLB route", steps=[
                ("Undergraduate", "Complete any bachelor's degree first (e.g. B.Com, BA)", "Useful if a student decides on law later, or wants a combined specialization such as Commerce + Law for corporate/tax law."),
                ("Law degree", "3-year LLB after graduation", "Standard alternative route for those who didn't take the 5-year integrated path directly after Class 12."),
            ]),
        ],
        skills=[("Legal Research", "core"), ("Essay Writing", "core"), ("Communication", "complementary")],
    ),
    dict(
        slug="chartered-accountant", name="Chartered Accountant (CA)", sector="Finance & Commerce",
        description="Provide accounting, auditing, taxation, and financial advisory services after qualifying the ICAI CA exams.",
        recommended_subjects="Commerce stream typically (Accountancy, Business Studies, Economics); open to other streams too",
        common_entrance_exams="ICAI CA Foundation, Intermediate, and Final examinations",
        relevant_degrees="No specific degree required — CA is a professional qualification via ICAI, often paired with B.Com",
        typical_progression="Class 12 -> CA Foundation -> CA Intermediate -> 2-3 years Articleship (practical training) -> CA Final -> qualified Chartered Accountant.",
        industry_sectors="Audit firms, corporate finance, taxation advisory, banking", government_opportunities="PSU finance roles, government auditing bodies (CAG)",
        higher_study_routes="Further specialization via CFA, CS, or an MBA in Finance", skill_building_timeline="4.5-5 years typical from Class 12 to qualification",
        pathways=[
            dict(route_type="common", title="Direct-entry CA route", steps=[
                ("Class 11-12", "Commerce stream is common (not mandatory) with Accountancy and Mathematics/Economics", "Commerce background eases the CA Foundation syllabus but ICAI accepts any stream."),
                ("Foundation", "Register for and clear the ICAI CA Foundation exam after Class 12", "This is the standard entry point into the CA pipeline for Class 12 pass-outs."),
                ("Intermediate + Articleship", "Clear CA Intermediate, then complete a mandatory ~2-3 year Articleship (practical training under a practicing CA)", "Articleship is where most practical accounting/audit skill is actually built — it's a mandatory ICAI requirement."),
                ("Final", "Clear the CA Final examination to qualify as a Chartered Accountant", "Final qualification opens practice, employment, or partnership-track roles."),
            ]),
            dict(route_type="alternative", title="Graduate-entry route", steps=[
                ("Undergraduate", "Complete B.Com (or any degree meeting ICAI's marks threshold)", "Graduates with sufficient marks can enter CA Intermediate directly, skipping Foundation."),
                ("Direct entry", "Register directly for CA Intermediate via the ICAI graduate-entry scheme", "This shortens the pipeline for those who complete a bachelor's degree first."),
            ]),
        ],
        skills=[("Financial Accounting", "core"), ("Auditing", "core"), ("Mathematics", "complementary")],
    ),
    dict(
        slug="architect", name="Architect", sector="Design & Architecture",
        description="Design buildings and spaces, balancing aesthetics, structural feasibility, and functionality.",
        recommended_subjects="Mathematics (compulsory), Physics; an eye for design and spatial reasoning", common_entrance_exams="NATA, JEE Main Paper 2",
        relevant_degrees="B.Arch (5-year professional degree)", typical_progression="PCM with Math (mandatory) -> NATA/JEE Paper 2 -> B.Arch -> Council of Architecture registration -> practice or firm employment.",
        industry_sectors="Architecture firms, urban planning, real estate development", government_opportunities="Public Works Department, urban development authorities, government housing boards",
        higher_study_routes="M.Arch specialization (urban design, landscape, etc.)", skill_building_timeline="5 years for B.Arch plus registration",
        pathways=[
            dict(route_type="common", title="Standard B.Arch route", steps=[
                ("Class 11-12", "Mathematics is compulsory; Physics/Chemistry commonly taken alongside", "NATA and JEE Paper 2 both require Mathematics as a Class 12 subject."),
                ("Entrance", "Qualify NATA and/or JEE Main Paper 2", "These are the two primary national entrance routes into B.Arch programs."),
                ("Undergraduate", "5-year B.Arch with a strong design portfolio and studio project work", "Architecture hiring and further studies weigh portfolio quality heavily, not just grades."),
                ("Entry", "Register with the Council of Architecture (mandatory to use the title 'Architect') and join a firm or start independent practice", "COA registration is a legal requirement to practice as an architect in India."),
            ]),
        ],
        skills=[("CAD / Design Software", "core"), ("Structural Analysis", "complementary"), ("Mathematics", "core")],
    ),
    dict(
        slug="mechanical-engineer", name="Mechanical Engineer", sector="Engineering",
        description="Design, analyse, and maintain mechanical systems across manufacturing, automotive, energy, and aerospace industries.",
        recommended_subjects="Physics, Mathematics, Chemistry", common_entrance_exams="JEE Main/Advanced, state CETs",
        relevant_degrees="B.Tech/B.E. Mechanical Engineering", typical_progression="PCM -> JEE/state CET -> B.Tech Mechanical -> internship -> design/production/R&D engineer role -> senior/specialist engineer.",
        industry_sectors="Automotive, manufacturing, energy, aerospace, heavy industry", government_opportunities="PSU technical roles (via GATE), DRDO, railways (via engineering services exam)",
        higher_study_routes="M.Tech via GATE, MS abroad, specialization in thermal/design/manufacturing", skill_building_timeline="4 years UG plus specialization",
        pathways=[
            dict(route_type="common", title="Standard engineering route", stages={
                "class10": [
                    {"stage_key": "class10", "stage_label": "Class 10", "goal": "Explore mechanical engineering and decide whether PCM is the right base route", "why": "The field is built on physical problem solving, so the subject choice happens early.", "prerequisites": ["No prior engineering experience"], "actions": ["Read what mechanical engineers actually do in design, production, and R&D.", "Talk to one practising engineer or senior student.", "Compare PCM with one backup route.", "Write down whether the field still feels interesting."], "resources": ["Institute admissions pages", "career counsellor", "working engineers"], "estimated_time": "1-2 weeks"},
                    {"stage_key": "class12", "stage_label": "Class 11-12", "goal": "Choose PCM and keep the engineering entrance route open", "why": "PCM keeps the main engineering entry path available.", "prerequisites": ["Class 10 complete"], "actions": ["Take PCM if possible.", "Shortlist JEE/state CET dates and official eligibility rules.", "Keep one backup diploma route in mind."], "resources": ["NTA and state CET portals", "school counsellor"], "estimated_time": "1 week"},
                    {"stage_key": "ug", "stage_label": "Undergraduate", "goal": "Start a small project that confirms the field fits you", "why": "A tiny build or observation task is better than guessing.", "prerequisites": ["A basic idea of the field"], "actions": ["Build a small CAD or mechanics project.", "Keep a notebook of what you learned.", "See whether the hands-on work still feels right."], "resources": ["Your own project folder", "lab or workshop access"], "estimated_time": "2-4 weeks"},
                    {"stage_key": "professional", "stage_label": "Working professional", "goal": "Check whether a transition into mechanical work is realistic", "why": "Professionals usually need a gap analysis before they move into a core engineering role.", "prerequisites": ["Existing work experience"], "actions": ["List which parts of your current job map to design, maintenance, manufacturing, or analysis.", "Identify the one skill gap that matters most.", "Decide whether a bridge course, portfolio, or M.Tech route is the better next move."], "resources": ["Official admissions and recruitment notices", "mentor or supervisor"], "estimated_time": "1 week"},
                    {"stage_key": "default", "stage_label": "Undergraduate", "goal": "Follow the standard B.Tech route", "why": "This is the most common entry route into mechanical engineering.", "prerequisites": ["PCM"], "actions": ["Prepare for JEE/state CET.", "Join B.Tech Mechanical Engineering.", "Aim for internships and core-sector projects."], "resources": ["JEE/state CET notices", "college admission page"], "estimated_time": "1-2 years"},
                ],
            }),
        ],
        skills=[("CAD / Design Software", "core"), ("Mathematics", "core"), ("Physics", "core")],
    ),
    dict(
        slug="cybersecurity-engineer", name="Cybersecurity Engineer", sector="Technology",
        description="Protect systems and networks from security threats through defensive engineering, monitoring, and ethical hacking.",
        recommended_subjects="Mathematics, Computer Science", common_entrance_exams="JEE Main/Advanced, state CETs (for CS/IT degree)",
        relevant_degrees="B.Tech CSE/IT or a cybersecurity-focused specialization", typical_progression="CS/IT degree -> networking + security fundamentals -> certifications -> SOC analyst/security engineer -> senior security roles.",
        industry_sectors="IT security, banking/fintech, government cyber cells, consulting", government_opportunities="CERT-In, NCIIPC, defence cyber roles",
        higher_study_routes="M.Tech in Cybersecurity, specialised certifications (CEH, OSCP, CISSP)", skill_building_timeline="4-6 years including certification track",
        pathways=[
            dict(route_type="common", title="CS degree + certification route", steps=[
                ("Undergraduate", "B.Tech CSE/IT with electives in networks and security", "Provides the foundational CS and networking knowledge security work builds on."),
                ("Undergraduate", "Learn networking fundamentals, then ethical hacking basics; practice on legal platforms (CTFs, labs)", "Hands-on, hands-clean practice (not real-world unauthorized testing) is how this skillset is legitimately built."),
                ("Entry", "Pursue industry certifications (e.g., CompTIA Security+, CEH) alongside entry-level SOC analyst roles", "Certifications are commonly used as a credibility signal in this field, alongside a degree."),
            ]),
        ],
        skills=[("Network Security", "core"), ("Ethical Hacking Fundamentals", "core"), ("Programming Fundamentals", "complementary")],
    ),
    dict(
        slug="commercial-pilot", name="Commercial Pilot", sector="Aviation",
        description="Fly commercial aircraft for airlines after completing flight training and licensing.",
        recommended_subjects="Physics, Mathematics", common_entrance_exams="DGCA-approved flying school admission, Class 1 medical exam",
        relevant_degrees="Not a university degree — a DGCA Commercial Pilot Licence (CPL) via an approved flying school",
        typical_progression="PCM in Class 12 -> Class 1 medical certification -> CPL training at a DGCA-approved school -> type rating -> airline hiring as First Officer -> Captain over time.",
        industry_sectors="Commercial airlines, cargo aviation, charter services", government_opportunities="Indian Air Force (separate route via NDA/CDS), state government aviation",
        higher_study_routes="Additional type ratings, Airline Transport Pilot Licence (ATPL) upgrade", skill_building_timeline="2-3 years of flight training plus type rating",
        pathways=[
            dict(route_type="common", title="Civil aviation CPL route", steps=[
                ("Class 11-12", "PCM with Physics and Mathematics; maintain strong physical fitness", "Both are prerequisites for DGCA licensing eligibility and the mandatory medical exam."),
                ("Medical", "Clear the DGCA Class 1 medical examination early", "This is a hard gating requirement — worth verifying eligibility before investing in expensive flight training."),
                ("Training", "Enrol in a DGCA-approved flying school for CPL training (India or abroad)", "Training cost and quality vary significantly between schools — verify DGCA approval status directly."),
                ("Entry", "Apply to airlines for First Officer positions after CPL and type rating", "Type rating on a specific aircraft is often airline-sponsored or a further personal investment."),
            ]),
            dict(route_type="alternative", title="Defence aviation route", steps=[
                ("Alternative", "Join the Indian Air Force as a pilot via NDA (after Class 12) or CDS (after graduation)", "A fully government-funded alternative route into flying, with a different service commitment and career structure than civil aviation."),
            ]),
        ],
        skills=[("Flight Theory", "core"), ("Physical Fitness", "core"), ("Mathematics", "complementary")],
    ),
    dict(
        slug="defence-officer", name="Defence Officer (Army/Navy/Air Force)", sector="Defence",
        description="Serve as a commissioned officer in the Indian Armed Forces.",
        recommended_subjects="Any stream (Science stream required for technical/flying branches)", common_entrance_exams="NDA (after Class 12), CDS (after graduation), AFCAT (Air Force)",
        relevant_degrees="NDA integrates training with a degree; CDS requires a prior bachelor's degree", typical_progression="Class 12 -> NDA exam + SSB interview -> 3-year training (degree included) -> commissioning; OR graduation -> CDS/AFCAT -> officer training -> commissioning.",
        industry_sectors="Army, Navy, Air Force", government_opportunities="This career is itself a central government service",
        higher_study_routes="Specialised courses within service (technical, staff college, etc.)", skill_building_timeline="3-4 years including training",
        pathways=[
            dict(route_type="common", title="NDA route (after Class 12)", steps=[
                ("Class 12", "Any stream for Army/Navy general entries; Science (PCM) required for technical/flying branches", "Branch choice at NDA determines the required stream — verify current branch-wise eligibility on the NDA notification."),
                ("Entrance", "Clear the NDA written exam followed by the SSB interview (psychological, group and personal interview rounds)", "SSB assesses officer-like qualities beyond academics — a distinct and significant part of selection."),
                ("Training", "3-year training at the National Defence Academy, followed by service-specific training", "Combines a degree with military training in a single integrated program."),
            ]),
            dict(route_type="alternative", title="CDS route (after graduation)", steps=[
                ("Undergraduate", "Complete any bachelor's degree", "CDS is open to graduates from any discipline, widening entry beyond Class 12 NDA aspirants."),
                ("Entrance", "Clear the CDS written exam and SSB interview", "Parallel entry pathway to NDA, aimed at graduates rather than Class 12 pass-outs."),
            ]),
        ],
        skills=[("Physical Fitness", "core"), ("Communication", "complementary"), ("Public Speaking", "complementary")],
    ),
    dict(
        slug="banking-professional", name="Banking Professional (PO/Officer)", sector="Banking & Finance",
        description="Work as a Probationary Officer or specialist officer in public or private sector banks.",
        recommended_subjects="Any stream", common_entrance_exams="IBPS PO, SBI PO, RBI Grade B",
        relevant_degrees="Any bachelor's degree", typical_progression="Any UG degree -> IBPS/SBI PO exam preparation -> Probationary Officer -> branch/assistant manager -> senior banking roles.",
        industry_sectors="Public and private sector banks, NBFCs", government_opportunities="Public sector banks are themselves government/PSU employers",
        higher_study_routes="Certifications (JAIIB/CAIIB), MBA Finance for accelerated growth", skill_building_timeline="1-2 years of exam preparation after graduation",
        pathways=[
            dict(route_type="common", title="IBPS/SBI PO route", steps=[
                ("Undergraduate", "Any bachelor's degree with a reasonable aggregate", "Eligibility for these exams is stream-agnostic, unlike engineering/medicine."),
                ("Preparation", "Prepare quantitative aptitude, reasoning, English, and general/banking awareness", "This is the fixed syllabus structure across IBPS/SBI PO exams."),
                ("Entry", "Clear Prelims -> Mains -> Interview stages of IBPS PO/SBI PO", "Standard multi-stage banking recruitment process — verify current pattern on ibps.in/sbi.co.in."),
            ]),
        ],
        skills=[("Financial Accounting", "complementary"), ("Communication", "core")],
    ),
    dict(
        slug="ui-ux-designer", name="UI/UX Designer", sector="Design",
        description="Design digital product experiences — research, wireframing, visual design, and usability testing.",
        recommended_subjects="Any stream; a design foundation program helps", common_entrance_exams="UCEED, NID DAT (for formal design degrees) — not mandatory for this career",
        relevant_degrees="B.Des, or any degree plus a strong self-built portfolio", typical_progression="Design foundation (formal or self-taught) -> portfolio projects -> internship -> junior designer -> senior/lead designer.",
        industry_sectors="Tech product companies, design agencies, startups", government_opportunities="Limited — mostly private-sector driven; some government digital service design roles exist",
        higher_study_routes="M.Des specialization, or self-directed advanced portfolio work", skill_building_timeline="2-4 years to a strong junior-to-mid level",
        pathways=[
            dict(route_type="common", title="Formal design degree route", steps=[
                ("Entrance", "Qualify UCEED or NID DAT for a B.Des program", "These are the standard national entrance exams for formal design education in India."),
                ("Undergraduate", "B.Des with a UX/interaction design specialization", "Provides structured design theory alongside studio practice."),
                ("Entry", "Build a portfolio through internships and personal projects, then apply for junior UX roles", "Portfolio quality is the primary hiring signal in design roles, more than the degree itself."),
            ]),
            dict(route_type="alternative", title="Portfolio-first self-taught route", steps=[
                ("Bridge", "Complete any bachelor's degree while self-studying UX fundamentals and design tools", "A valid, common route — many working designers do not hold a formal design degree."),
                ("Portfolio", "Redesign real products as case studies, do freelance/volunteer design work to build a portfolio", "This directly substitutes for formal credentials when the portfolio is strong."),
                ("Entry", "Apply directly to startups/agencies that hire on portfolio review rather than degree", "Common in the design industry, more so than in regulated professions like medicine or law."),
            ]),
        ],
        skills=[("UI/UX Design", "core"), ("Portfolio Building", "core"), ("Communication", "complementary")],
    ),
    dict(
        slug="professor-researcher", name="Professor / Academic Researcher", sector="Education & Research",
        description="Teach at the university level and conduct original research within an academic discipline.",
        recommended_subjects="Depends on discipline; strong foundation in the chosen subject", common_entrance_exams="UGC-NET/JRF, GATE (for engineering disciplines), university PhD entrance tests",
        relevant_degrees="Master's degree, then PhD in the chosen discipline", typical_progression="UG -> PG (Master's) -> UGC-NET/JRF or equivalent -> PhD -> postdoctoral research (optional) -> Assistant Professor -> Associate/Full Professor.",
        industry_sectors="Universities, research institutes, think tanks", government_opportunities="Central/state university faculty positions, CSIR/ICAR/ICMR research labs",
        higher_study_routes="PhD is effectively mandatory for a permanent faculty position", skill_building_timeline="8-11 years from UG to a faculty position",
        pathways=[
            dict(route_type="common", title="Standard academic route", steps=[
                ("Undergraduate", "Bachelor's degree in the discipline of interest with strong academic performance", "Sustained subject-matter strength is what carries through the entire academic pipeline."),
                ("Post-graduation", "Master's degree in the same or a closely related discipline", "Required for PhD admission in almost all cases."),
                ("Qualifying exam", "Clear UGC-NET/JRF (or GATE for most engineering disciplines) to become PhD/fellowship eligible", "JRF specifically provides a research fellowship stipend during the PhD."),
                ("Doctorate", "3-5+ year PhD with original research and publications", "Publication record significantly influences later faculty hiring."),
                ("Entry", "Apply for Assistant Professor positions at universities, often after or during a postdoctoral stint", "Postdoc experience is increasingly common before permanent faculty roles, especially in sciences."),
            ]),
        ],
        skills=[("Research Methodology", "core"), ("Communication", "complementary"), ("Essay Writing", "complementary")],
    ),
    dict(
        slug="entrepreneur", name="Entrepreneur / Startup Founder", sector="Business & Entrepreneurship",
        description="Build and grow an independent venture, from idea validation through funding and scaling.",
        recommended_subjects="Any stream; business/economics exposure helps but isn't required", common_entrance_exams="Not applicable — no fixed entrance requirement",
        relevant_degrees="Any degree, or none — many founders come from technical, design, or commerce backgrounds", typical_progression="Build domain skill (technical/design/business) -> identify a problem worth solving -> validate with real users -> build MVP -> iterate -> raise funding or bootstrap -> scale.",
        industry_sectors="Any — technology, D2C, services, manufacturing, social enterprise", government_opportunities="Startup India scheme support, incubation cells at government-recognized institutions",
        higher_study_routes="MBA is common but not required; many founders skip formal business education entirely", skill_building_timeline="Highly variable — no fixed timeline",
        pathways=[
            dict(route_type="common", title="Skill-first founder route", steps=[
                ("Foundation", "Build deep expertise in one functional area first (engineering, design, or a specific industry domain)", "Most successful early-stage founders build on genuine domain expertise rather than starting from zero."),
                ("Validation", "Work on side projects or freelance in the space to validate real problems worth solving", "Reduces the risk of building something nobody needs — the single most common startup failure mode."),
                ("Launch", "Build a minimum viable product and get it in front of real early users before scaling", "Early user feedback is far more valuable pre-scale than a polished but unvalidated product."),
                ("Growth", "Decide between bootstrapping and raising external funding based on the business model", "This is a strategic, not automatic, choice — both are legitimate depending on capital intensity."),
            ]),
            dict(route_type="alternative", title="Structured/incubator route", steps=[
                ("Incubation", "Apply to a college or government-recognized startup incubator/accelerator for mentorship and seed support", "Reduces early-stage risk through structured mentorship, though it is not required to start a company."),
            ]),
        ],
        skills=[("Business Strategy", "core"), ("Communication", "core"), ("Public Speaking", "complementary")],
    ),
    dict(
        slug="skilled-trade-electrician", name="Skilled Trade — Electrician", sector="Skilled Trades",
        description="Install, maintain and repair electrical systems after ITI/diploma training and certification.",
        recommended_subjects="Any stream; a Science background helps but ITI programs are open post-Class 10", common_entrance_exams="ITI admission (state-level, often merit-based on Class 10 marks)",
        relevant_degrees="ITI certificate in Electrician trade, or a Diploma in Electrical Engineering for a broader scope", typical_progression="Class 10 -> ITI Electrician trade (1-2 years) -> apprenticeship -> licensed electrician -> supervisor/contractor over time.",
        industry_sectors="Construction, manufacturing, facilities maintenance, self-employment", government_opportunities="Government ITI training subsidies, PSU technician roles",
        higher_study_routes="Diploma or B.Tech in Electrical Engineering via lateral entry for those who want to progress further", skill_building_timeline="1-2 years to a working certification, longer to master-level expertise",
        pathways=[
            dict(route_type="common", title="ITI direct-entry route", steps=[
                ("After Class 10", "Enrol in a government or private ITI for the Electrician trade", "This is a fast, low-cost, and widely available route into a skilled, in-demand trade."),
                ("Training", "Complete the 1-2 year ITI program plus a practical apprenticeship", "Hands-on apprenticeship is where most real competence in this trade is built."),
                ("Entry", "Obtain a trade certificate/license and work with a contractor, company, or independently", "Licensing requirements vary by state — verify local requirements."),
            ]),
            dict(route_type="higher_cost", title="Diploma-to-degree progression route", steps=[
                ("Diploma", "Pursue a 3-year Diploma in Electrical Engineering instead of/after ITI for a broader technical scope", "Opens supervisory and design-adjacent roles beyond hands-on trade work."),
                ("Lateral entry", "Use lateral entry into a B.Tech Electrical Engineering program if desired", "A legitimate progression route from diploma into a full engineering degree, without repeating Class 12."),
            ]),
        ],
        skills=[("Physical Fitness", "complementary")],
    ),
]

COLLEGES = [
    dict(name="Indian Institute of Space Science and Technology (IIST)", institution_type="government", state="Kerala", city="Thiruvananthapuram", lat=8.5241, lng=76.9366, website="https://www.iist.ac.in", hostel=True, fees=280000, exam="JEE Advanced", course_field="Aerospace Engineering", degree_level="UG", min_pct=85),
    dict(name="IIT Madras", institution_type="government", state="Tamil Nadu", city="Chennai", lat=12.9915, lng=80.2336, website="https://www.iitm.ac.in", hostel=True, fees=220000, exam="JEE Advanced", course_field="Mechanical Engineering", degree_level="UG", min_pct=90),
    dict(name="NIT Trichy", institution_type="government", state="Tamil Nadu", city="Tiruchirappalli", lat=10.7590, lng=78.8147, website="https://www.nitt.edu", hostel=True, fees=160000, exam="JEE Main", course_field="Computer Science Engineering", degree_level="UG", min_pct=85),
    dict(name="Anna University (CEG Campus)", institution_type="government", state="Tamil Nadu", city="Chennai", lat=13.0107, lng=80.2350, website="https://www.annauniv.edu", hostel=True, fees=60000, exam="TNEA (state counselling)", course_field="Civil Engineering", degree_level="UG", min_pct=70),
    dict(name="AIIMS Delhi", institution_type="government", state="Delhi", city="New Delhi", lat=28.5672, lng=77.2100, website="https://www.aiims.edu", hostel=True, fees=6000, exam="NEET-UG", course_field="MBBS", degree_level="UG", min_pct=90),
    dict(name="National Law School of India University (NLSIU)", institution_type="government", state="Karnataka", city="Bengaluru", lat=12.9075, lng=77.5850, website="https://www.nls.ac.in", hostel=True, fees=280000, exam="CLAT", course_field="BA LLB", degree_level="UG", min_pct=75),
    dict(name="Shri Ram College of Commerce (SRCC)", institution_type="government", state="Delhi", city="New Delhi", lat=28.6889, lng=77.2183, website="https://www.srcc.edu", hostel=False, fees=25000, exam="CUET", course_field="B.Com (Hons)", degree_level="UG", min_pct=90),
    dict(name="Sir J.J. College of Architecture", institution_type="government", state="Maharashtra", city="Mumbai", lat=18.9548, lng=72.8324, website="https://www.jjcoa.mah.nic.in", hostel=False, fees=45000, exam="NATA", course_field="B.Arch", degree_level="UG", min_pct=75),
    dict(name="IIIT Hyderabad", institution_type="government", state="Telangana", city="Hyderabad", lat=17.4457, lng=78.3489, website="https://www.iiit.ac.in", hostel=True, fees=350000, exam="JEE Main / UGEE", course_field="Computer Science Engineering", degree_level="UG", min_pct=88),
    dict(name="National Institute of Design (NID) Ahmedabad", institution_type="government", state="Gujarat", city="Ahmedabad", lat=23.0395, lng=72.5066, website="https://www.nid.edu", hostel=True, fees=400000, exam="NID DAT", course_field="Design (UX)", degree_level="UG", min_pct=70),
    dict(name="Local Government Polytechnic (ITI-affiliated)", institution_type="government", state="Tamil Nadu", city="Coimbatore", lat=11.0168, lng=76.9558, website=None, hostel=False, fees=8000, exam="State ITI admission", course_field="Electrician Trade", degree_level="Diploma", min_pct=35),
]

SCHOLARSHIPS = [
    dict(name="National Means-cum-Merit Scholarship (NMMS)", provider="Ministry of Education, Govt. of India", benefit="₹12,000/year", levels="Class 9-12", url="https://scholarships.gov.in", income_max="350000", category=None, min_marks=55, source="National Scholarship Portal", status="verified"),
    dict(name="Central Sector Scheme of Scholarships for College and University Students", provider="Ministry of Education, Govt. of India", benefit="Up to ₹20,000/year", levels="UG", url="https://scholarships.gov.in", income_max="450000", category=None, min_marks=80, source="National Scholarship Portal", status="verified"),
    dict(name="AICTE Pragati Scholarship for Girls", provider="AICTE", benefit="₹50,000/year", levels="Diploma, UG (Technical)", url="https://www.aicte-pragati-saksham-gov.in", income_max="800000", category=None, min_marks=None, source="AICTE", status="verified"),
    dict(name="Post Matric Scholarship for SC Students", provider="Ministry of Social Justice and Empowerment", benefit="Tuition fee + maintenance allowance", levels="Class 11 onwards", url="https://scholarships.gov.in", income_max="250000", category="SC", min_marks=None, source="National Scholarship Portal", status="verified"),
    dict(name="INSPIRE Scholarship for Higher Education (SHE)", provider="Dept. of Science & Technology, Govt. of India", benefit="₹80,000/year", levels="UG/PG in Natural/Basic Sciences", url="https://www.online-inspire.gov.in", income_max=None, category=None, min_marks=None, source="DST INSPIRE", status="verified"),
    dict(name="State Government Merit Scholarship (Tamil Nadu)", provider="Govt. of Tamil Nadu", benefit="Varies by scheme", levels="Class 11 - UG", url="https://tn.gov.in", income_max="200000", category=None, min_marks=None, source="State Scholarship Portal", status="needs_verification"),
]


def seed(db: Session):
    if db.query(models.Career).count() > 0:
        return  # already seeded

    skill_objs = {}
    for name, cat in SKILLS:
        s = models.Skill(name=name, category=cat)
        db.add(s)
        skill_objs[name] = s

    interest_objs = {}
    for name, cat in INTERESTS:
        i = models.Interest(name=name, category=cat)
        db.add(i)
        interest_objs[name] = i
    db.flush()

    for c in CAREERS:
        career = models.Career(
            slug=c["slug"], name=c["name"], sector=c["sector"], description=c["description"],
            recommended_subjects=c["recommended_subjects"], common_entrance_exams=c["common_entrance_exams"],
            relevant_degrees=c["relevant_degrees"], typical_progression=c["typical_progression"],
            industry_sectors=c["industry_sectors"], government_opportunities=c["government_opportunities"],
            higher_study_routes=c["higher_study_routes"], skill_building_timeline=c["skill_building_timeline"],
        )
        db.add(career)
        db.flush()

        for sk_name, priority in c["skills"]:
            db.add(models.CareerSkill(career_id=career.id, skill_id=skill_objs[sk_name].id, priority=priority,
                                       why_it_matters=f"Core to succeeding in {c['name']}."))

        for pw in c["pathways"]:
            if "stages" in pw:
                steps_json = pw["stages"]
            else:
                steps_json = [{"stage": s[0], "action": s[1], "why": s[2]} for s in pw["steps"]]
            db.add(models.CareerPathway(career_id=career.id, route_type=pw["route_type"], title=pw["title"],
                                         description=pw["title"], steps_json=steps_json))

    db.flush()

    for idx, col in enumerate(COLLEGES):
        cid = f"CLG_SEED_{idx + 1:04d}"
        college = models.College(
            id=cid, college_id=cid,
            name=col["name"], college_name=col["name"],
            institution_type=col["institution_type"], standardized_ownership_type=col["institution_type"].upper(),
            state=col["state"], city=col["city"],
            latitude=col["lat"], longitude=col["lng"], website=col["website"], hostel_available=col["hostel"],
            source_provider="seed_fallback_dataset", last_verified=datetime.utcnow(),
        )
        db.add(college)
        db.flush()
        course = db.query(models.Course).filter_by(name=col["course_field"]).first()
        if not course:
            course = models.Course(name=col["course_field"], degree_level=col["degree_level"], field=col["course_field"])
            db.add(course)
            db.flush()
        db.add(models.CollegeCourse(college_id=college.id, course_id=course.id, entrance_exam=col["exam"],
                                     min_eligibility_percent=col["min_pct"], annual_fees_inr=col["fees"]))

    for sch in SCHOLARSHIPS:
        s = models.Scholarship(
            name=sch["name"], provider=sch["provider"], benefit_description=sch["benefit"],
            education_levels=sch["levels"], official_url=sch["url"], academic_year="2026-27",
            source_name=sch["source"], last_verified=datetime.utcnow(), verification_status=sch["status"],
        )
        db.add(s)
        db.flush()
        if sch["income_max"]:
            db.add(models.ScholarshipEligibilityRule(scholarship_id=s.id, rule_type="income_max", rule_value=sch["income_max"]))
        if sch["category"]:
            db.add(models.ScholarshipEligibilityRule(scholarship_id=s.id, rule_type="category", rule_value=sch["category"]))
        if sch["min_marks"]:
            db.add(models.ScholarshipEligibilityRule(scholarship_id=s.id, rule_type="min_marks", rule_value=str(sch["min_marks"])))

    db.add(models.ExternalDataSource(provider="seed", source_name="CareerPath AI Fallback Dataset", type="college",
                                      status="fallback_dataset", reliability="curated_for_dev",
                                      notes="Bundled dataset covering colleges from the seed catalogue. Replace with an AISHE/live provider in production."))
    db.add(models.ExternalDataSource(provider="seed", source_name="CareerPath AI Fallback Dataset", type="scholarship",
                                      status="fallback_dataset", reliability="curated_for_dev",
                                      notes="Bundled dataset covering scholarships from the seed catalogue. Replace with National Scholarship Portal sync in production."))

    db.commit()


def seed_admin(db: Session):
    """Idempotent — creates the default demo admin account if it does not exist.
    Credentials: admin@futureforge.ai / Admin@123456
    Change the password immediately in production via /api/admin/me."""
    import bcrypt
    admin_email = "admin@futureforge.ai"
    existing = db.query(models.User).filter(models.User.email == admin_email).first()
    if existing:
        # Ensure is_admin flag is set (in case it was reset)
        if not existing.is_admin:
            existing.is_admin = True
            db.commit()
        return

    hashed = bcrypt.hashpw("Admin@123456".encode(), bcrypt.gensalt()).decode()
    admin_user = models.User(
        email=admin_email,
        hashed_password=hashed,
        is_admin=True,
    )
    db.add(admin_user)
    db.flush()
    db.add(models.Profile(user_id=admin_user.id, name="FutureForge Admin"))
    db.commit()


def seed_batch1(db: Session):
    """
    Idempotent seeder for Batch 1 (15 Curated Technology Careers with 4-phase roadmaps).
    Ensures all 15 careers, their skills, and their pathway structures are populated in the DB.
    """
    import os
    import json

    seed_file = os.path.join(os.path.dirname(__file__), "seeds", "batch1_technology.json")
    if not os.path.exists(seed_file):
        return

    with open(seed_file, "r", encoding="utf-8") as f:
        careers_data = json.load(f)

    for c in careers_data:
        slug = c["slug"]
        career = db.query(models.Career).filter_by(slug=slug).first()
        if not career:
            career = models.Career(
                slug=slug,
                name=c["name"],
                sector=c.get("sector", "Technology"),
                description=c.get("description", ""),
                recommended_subjects=c.get("recommended_subjects"),
                common_entrance_exams=c.get("common_entrance_exams"),
                relevant_degrees=c.get("relevant_degrees"),
                typical_progression=c.get("typical_progression"),
                industry_sectors=c.get("industry_sectors"),
                government_opportunities=c.get("government_opportunities"),
                higher_study_routes=c.get("higher_study_routes"),
                skill_building_timeline=c.get("skill_building_timeline"),
                is_user_generated=False,
                needs_verification=False,
            )
            db.add(career)
            db.flush()
        else:
            career.name = c["name"]
            career.sector = c.get("sector", "Technology")
            career.description = c.get("description", "")
            career.recommended_subjects = c.get("recommended_subjects")
            career.common_entrance_exams = c.get("common_entrance_exams")
            career.relevant_degrees = c.get("relevant_degrees")
            career.typical_progression = c.get("typical_progression")
            career.industry_sectors = c.get("industry_sectors")
            career.government_opportunities = c.get("government_opportunities")
            career.higher_study_routes = c.get("higher_study_routes")
            career.skill_building_timeline = c.get("skill_building_timeline")
            career.is_user_generated = False
            career.needs_verification = False
            db.flush()

        # Skills
        for sk_item in c.get("skills", []):
            sk_name = sk_item["name"]
            priority = sk_item.get("priority", "core")
            skill_obj = db.query(models.Skill).filter(models.Skill.name.ilike(sk_name)).first()
            if not skill_obj:
                skill_obj = models.Skill(name=sk_name, category="technical")
                db.add(skill_obj)
                db.flush()

            link = db.query(models.CareerSkill).filter_by(career_id=career.id, skill_id=skill_obj.id).first()
            if not link:
                db.add(models.CareerSkill(
                    career_id=career.id,
                    skill_id=skill_obj.id,
                    priority=priority,
                    why_it_matters=f"{priority.capitalize()} skill for {career.name}."
                ))

        # Pathways
        milestones = c.get("roadmap", {}).get("milestones", [])
        if milestones:
            steps_json = [
                {
                    "stage": f"{m.get('phase', 'Phase')} • {m.get('estimated_time', '')}",
                    "action": m.get("title", ""),
                    "why": m.get("why", ""),
                    "skill_name": m.get("skill_name"),
                    "estimated_time": m.get("estimated_time"),
                    "actions": m.get("actions", []),
                    "resources": m.get("resources", [])
                }
                for m in milestones
            ]
            pathway = db.query(models.CareerPathway).filter_by(career_id=career.id, route_type="common").first()
            if not pathway:
                pathway = models.CareerPathway(
                    career_id=career.id,
                    route_type="common",
                    title="Curated 4-Phase Roadmap",
                    description=c.get("description", ""),
                    steps_json=steps_json
                )
                db.add(pathway)
            else:
                pathway.steps_json = steps_json

    db.commit()

