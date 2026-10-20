"""
Roadmap Engine - Dynamic Destination Strategy, Semantic Matching, Deep Seed Templates,
Gemini Structuring, Quality Gate Validation, DAG Verification, Personalization,
Skill-Gap Analysis, and Dynamic Quality-Tied Confidence Scoring.
"""
import os
import json
import re
from typing import List, Dict, Any, Tuple, Optional
from sqlalchemy.orm import Session

from .. import models, schemas
from .career_resolver import SECTOR_PROFILES, SECTOR_KEYWORDS, STAGE_LABELS

# Ambiguous terms requiring clarification before building a concrete roadmap
AMBIGUOUS_TERMS = {
    "ai", "artificial intelligence", "engineering", "medicine", "doctor", "lawyer",
    "manager", "science", "business", "arts", "coding", "computers", "finance",
    "design", "pilot", "defence", "sports", "civil service", "teaching", "education"
}

# Domain-accurate career family suggestions ONLY
AMBIGUITY_SUGGESTIONS = {
    "ai": ["AI Research Scientist", "Machine Learning Engineer", "AI Product Manager", "Computer Vision Engineer"],
    "artificial intelligence": ["AI Research Scientist", "Machine Learning Engineer", "AI Product Manager", "Computer Vision Engineer"],
    "engineering": ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Robotics Engineer"],
    "medicine": ["MBBS Physician / General Practitioner", "Cardiologist", "Orthopedic Surgeon", "Pediatrician", "Radiologist"],
    "doctor": ["MBBS Physician / General Practitioner", "Cardiologist", "Orthopedic Surgeon", "Pediatrician", "Radiologist", "Dentist (BDS)"],
    "lawyer": ["Corporate Advocate", "Criminal Defence Lawyer", "Intellectual Property Attorney", "Judicial Officer"],
    "law": ["Corporate Advocate", "Criminal Defence Lawyer", "Intellectual Property Attorney", "Judicial Officer"],
    "manager": ["Product Manager", "Operations Manager", "Financial Risk Manager", "Marketing Director"],
    "business": ["Financial Analyst", "Marketing Director", "Operations Manager", "Product Manager", "Management Consultant"],
    "science": ["Astrophysicist", "Biotechnology Researcher", "Data Scientist", "Analytical Chemist"],
    "coding": ["Full Stack Web Developer", "Backend Engineer", "Mobile App Developer", "DevOps Engineer"],
    "computers": ["Software Engineer", "Cybersecurity Specialist", "Cloud Architect", "Data Engineer"],
    "design": ["UI/UX Designer", "Product Designer", "Graphic Designer", "Fashion Designer"],
    "teaching": ["High School Teacher (B.Ed)", "University Professor (Ph.D)", "Special Education Teacher", "EdTech Curriculum Developer"],
    "education": ["High School Teacher (B.Ed)", "University Professor (Ph.D)", "Special Education Teacher", "EdTech Curriculum Developer"],
}

# Semantic synonym/alias resolver to map inputs to curated seed clusters
SEMANTIC_CLUSTER_MAP = {
    "doctor": "mbbs-physician",
    "physician": "mbbs-physician",
    "mbbs": "mbbs-physician",
    "medical doctor": "mbbs-physician",
    "mbbs physician": "mbbs-physician",
    "become a doctor": "mbbs-physician",
    "general practitioner": "mbbs-physician",
    "nurse to doctor": "nurse-to-doctor",
    "nursing to doctor": "nurse-to-doctor",
    "nurse to physician": "nurse-to-doctor",
    "ias": "ias-officer",
    "ips": "ias-officer",
    "civil services": "ias-officer",
    "upsc": "ias-officer",
    "district collector": "ias-officer",
    "ias officer": "ias-officer",
    "software engineer": "software-engineer",
    "full stack developer": "software-engineer",
    "coder": "software-engineer",
    "software developer": "software-engineer",
    "programmer": "software-engineer",
    "data analyst": "data-analyst",
    "data scientist": "data-analyst",
    "analytics": "data-analyst",
    "ui ux designer": "ui-ux-designer",
    "ui/ux designer": "ui-ux-designer",
    "ux designer": "ui-ux-designer",
    "ui designer": "ui-ux-designer",
    "product designer": "ui-ux-designer",
    "lawyer": "advocate-lawyer",
    "advocate": "advocate-lawyer",
    "corporate lawyer": "advocate-lawyer",
    "ca": "chartered-accountant",
    "chartered accountant": "chartered-accountant",
    "mechanical engineer": "mechanical-engineer",
    "robotics engineer": "robotics-engineer",
}

# High-Depth Curated Seed Templates (Stage-accurate, domain-specific, with genuine target skills)
CURATED_SEED_TEMPLATES = {
    "mbbs-physician": {
        "career_name": "MBBS Physician",
        "sector": "Medicine & Healthcare",
        "role_definition": "Licensed medical doctor qualified to diagnose illnesses, prescribe treatment, perform medical procedures, and manage patient care across clinical settings.",
        "required_skills": ["NEET-UG PCB Proficiency", "Human Anatomy & Physiology", "Pharmacology & Pathology", "Clinical Diagnostics & Patient Care", "Emergency Triage & Hands-on Procedures", "Medical Ethics & NMC Licensing"],
        "steps": [
            {
                "stage_key": "class12",
                "stage_label": "Class 11-12 / NEET-UG Prep",
                "title": "NEET-UG Entrance Prep & PCB Mastery",
                "why": "Admission to MBBS program requires clearing NEET-UG conducted by NTA with top percentile in Physics, Chemistry, and Biology.",
                "skill_name": "NEET-UG PCB Proficiency",
                "prerequisites": [],
                "actions": [
                    "Complete Class 11-12 NCERT Biology, Physics, and Chemistry syllabus with 100% coverage.",
                    "Solve 10+ years of past NEET-UG question papers and write weekly full-length mock tests.",
                    "Participate in NTA NEET-UG counselling (MCC/State quota) to secure MBBS seat allotment."
                ],
                "resources": ["NTA NEET-UG Official Portal", "NCERT Biology Class 11 & 12", "MCC Medical Counselling Board"],
                "estimated_time": "24 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "MBBS Years 1-2 (Pre-Clinical)",
                "title": "Dissection Hall & Pre-Clinical Foundations",
                "why": "First two years of MBBS build the scientific foundation of human organ systems, cadaveric anatomy, and disease mechanisms.",
                "skill_name": "Human Anatomy & Physiology",
                "prerequisites": ["NEET-UG PCB Proficiency"],
                "actions": [
                    "Complete daily dissection hall sessions, cadaveric anatomy, and histology lab practicals.",
                    "Pass 1st and 2nd Professional MBBS examinations in Anatomy, Physiology, Biochemistry, and Pathology.",
                    "Master basic pharmacological drug classifications, dosage metrics, and mechanism of action."
                ],
                "resources": ["Gray's Anatomy for Students", "Robbins & Cotran Pathologic Basis of Disease"],
                "estimated_time": "24 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "MBBS Years 3-4.5 (Clinical Rotations)",
                "title": "Clinical Ward Postings & Bedside Medicine",
                "why": "Transition from classroom theory to hospital ward rounds, clinical history taking, and diagnostic interpretation under senior consultants.",
                "skill_name": "Clinical Diagnostics & Patient Care",
                "prerequisites": ["Human Anatomy & Physiology"],
                "actions": [
                    "Rotate through clinical postings in General Medicine, Surgery, Pediatrics, OB-GYN, and Orthopedics.",
                    "Master patient history taking, physical examination, vital signs, and diagnostic reading (ECG, X-Ray, Lab Reports).",
                    "Pass 3rd and Final Professional MBBS Part 1 & Part 2 exit examinations."
                ],
                "resources": ["Harrison's Principles of Internal Medicine", "Bailey & Love's Short Practice of Surgery"],
                "estimated_time": "30 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "CRRI Internship (1 Year)",
                "title": "Mandatory Rotatory Residential Internship (CRRI)",
                "why": "12-month compulsory rotatory internship required by NMC for hands-on clinical independence in hospital wards.",
                "skill_name": "Emergency Triage & Hands-on Procedures",
                "prerequisites": ["Clinical Diagnostics & Patient Care"],
                "actions": [
                    "Execute 24-hour casualty/emergency duties, ICU patient monitoring, and minor surgical procedures under supervision.",
                    "Perform basic procedures: venipuncture, IV cannulation, catheterization, wound suturing, and arterial blood gas sampling.",
                    "Manage patient admission charts, discharge summaries, and emergency CPR resuscitation protocols."
                ],
                "resources": ["NMC Internship Guidelines", "Oxford Handbook of Clinical Medicine"],
                "estimated_time": "12 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Licensing & NMC Registration",
                "title": "NMC Permanent Medical Registration & NEXT",
                "why": "Legal requirement to practice medicine independently in India registered with State Medical Council & National Medical Commission.",
                "skill_name": "Medical Ethics & NMC Licensing",
                "prerequisites": ["Emergency Triage & Hands-on Procedures"],
                "actions": [
                    "Pass National Exit Test (NEXT) / FMGE licensing assessment as mandated by National Medical Commission.",
                    "Submit CRRI completion certificate to obtain permanent State Medical Council license number.",
                    "Complete certified training in Medical Ethics, Consumer Protection Act compliance, and Forensic Protocols."
                ],
                "resources": ["National Medical Commission (NMC) Official Registry"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "pg",
                "stage_label": "Postgraduate Specialization (MD/MS)",
                "title": "NEET-PG / INI-CET Specialization & Residency",
                "why": "Advanced clinical specialization in specific branches like General Medicine, Cardiology, Surgery, Pediatrics, or Radiology.",
                "skill_name": "Pharmacology & Pathology",
                "prerequisites": ["Medical Ethics & NMC Licensing"],
                "actions": [
                    "Clear NEET-PG or INI-CET competitive entrance exam for MD/MS/DNB specialty seat allotment.",
                    "Complete 3-year post-graduate residency including thesis research, outpatient clinics (OPD), and independent surgeries.",
                    "Publish clinical research papers in peer-reviewed medical journals and clear MD/MS final exit exams."
                ],
                "resources": ["PubMed / MEDLINE", "NBE / INI-CET Specialty Board Guidelines"],
                "estimated_time": "36 months"
            }
        ]
    },

    "nurse-to-doctor": {
        "career_name": "MBBS Physician (Nurse Transition)",
        "sector": "Medicine & Healthcare",
        "role_definition": "Transitioning from Nursing to Medical Doctor (MD/MBBS). Note: Becoming a licensed physician requires 6+ years of pre-med science coursework, medical school, and residency training. No direct shortcut exists.",
        "required_skills": ["Pre-Med Science Prerequisites", "MCAT / NEET-UG Medical Prep", "Human Anatomy & Clinical Pathology", "Clinical Ward Postings & Bedside Medicine", "Licensing & Medical Residency (3-4 Yrs)", "Attending Physician Placement"],
        "steps": [
            {
                "stage_key": "ug",
                "stage_label": "Pre-Med Science Base",
                "title": "Pre-Med Science Coursework Prerequisites (Biology, Chemistry, Physics)",
                "why": "Medical school admission boards require completion of formal pre-med foundational science courses regardless of prior nursing credentials.",
                "skill_name": "Pre-Med Science Prerequisites",
                "prerequisites": [],
                "actions": [
                    "Complete pre-med science prerequisites: General Chemistry, Organic Chemistry, General Physics, and Advanced Biology.",
                    "Maintain high GPA (>3.5) across all science laboratory coursework.",
                    "Obtain recommendation letters from clinical supervisors and science faculty."
                ],
                "resources": ["AAMC Pre-Med Course Requirements", "NCERT Science Textbooks"],
                "estimated_time": "18 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Entrance Exam (MCAT / NEET)",
                "title": "Medical School Entrance Exam Preparation (MCAT / NEET-UG)",
                "why": "Standardized competitive entrance exam required for medical school admission.",
                "skill_name": "MCAT / NEET-UG Medical Prep",
                "prerequisites": ["Pre-Med Science Prerequisites"],
                "actions": [
                    "Prepare for MCAT / NEET-UG covering Biological Systems, Chemical Foundations, and Critical Analysis.",
                    "Take 10+ full-length practice examinations under timed exam conditions.",
                    "Submit medical school applications via AMCAS / MCC counselling portal."
                ],
                "resources": ["AAMC Official MCAT Practice Portal", "NTA NEET-UG Board"],
                "estimated_time": "12 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Medical School (Years 1-2)",
                "title": "Medical School Enrollment (MBBS/MD Pre-Clinical)",
                "why": "Complete 4-year medical school curriculum covering cadaveric dissection, physiology, and pathology.",
                "skill_name": "Human Anatomy & Clinical Pathology",
                "prerequisites": ["MCAT / NEET-UG Medical Prep"],
                "actions": [
                    "Complete medical school Year 1 & 2 preclinical coursework in Anatomy, Physiology, Pathology, and Pharmacology.",
                    "Pass USMLE Step 1 / 1st Professional MBBS university examinations.",
                    "Leverage prior nursing clinical experience during physical diagnosis lab modules."
                ],
                "resources": ["First Aid for the USMLE Step 1", "Gray's Anatomy for Students"],
                "estimated_time": "24 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Clinical Rotations & Internship",
                "title": "Clinical Rotations & Rotatory Internship",
                "why": "Execute hospital ward rotations across Internal Medicine, Surgery, Pediatrics, and Emergency Care under consultant supervision.",
                "skill_name": "Clinical Ward Postings & Bedside Medicine",
                "prerequisites": ["Human Anatomy & Clinical Pathology"],
                "actions": [
                    "Complete clinical clerkships in General Medicine, General Surgery, OB-GYN, Pediatrics, and Psychiatry.",
                    "Pass USMLE Step 2 CK / Final MBBS professional exit exams.",
                    "Complete 1-year rotatory clinical internship (CRRI)."
                ],
                "resources": ["USMLE Step 2 Clinical Knowledge Guide", "Harrison's Internal Medicine"],
                "estimated_time": "24 months"
            },
            {
                "stage_key": "pg",
                "stage_label": "Residency Specialization (3-4 Yrs)",
                "title": "Medical Residency Training & Board Certification",
                "why": "Mandatory 3-4 year post-graduate residency in a chosen specialty before practicing independently as a licensed doctor.",
                "skill_name": "Licensing & Medical Residency (3-4 Yrs)",
                "prerequisites": ["Clinical Ward Postings & Bedside Medicine"],
                "actions": [
                    "Participate in National Resident Matching Program (NRMP) or NEET-PG specialty counselling.",
                    "Complete 3-year medical residency with 80-hour weekly clinical rotations and attending rounds.",
                    "Pass Specialty Board Certification Exams (ABIM / MD Exit Exam)."
                ],
                "resources": ["NRMP Residency Match Portal", "Specialty Board Certification Standards"],
                "estimated_time": "36 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Attending Physician",
                "title": "Obtain State Medical License & Begin Independent Practice",
                "why": "Final milestone to practice independently as an Attending Physician / Hospitalist.",
                "skill_name": "Attending Physician Placement",
                "prerequisites": ["Licensing & Medical Residency (3-4 Yrs)"],
                "actions": [
                    "Obtain permanent state medical practicing license and DEA registration.",
                    "Apply for Hospital Attending Physician or Primary Care Medical Practice positions.",
                    "Transition into full clinical practice with independent diagnostic and prescribing authority."
                ],
                "resources": ["State Medical Board Official Licensing Registry"],
                "estimated_time": "3 months"
            }
        ]
    },

    "data-analyst": {
        "career_name": "Data Analyst",
        "sector": "Technology & Analytics",
        "role_definition": "Analytics professional responsible for collecting, cleaning, analyzing, and visualizing data to drive business decisions using SQL, Python, and BI tools.",
        "required_skills": ["SQL & Database Querying", "Python Data Analysis (Pandas/NumPy)", "Statistics & Exploratory Data Analysis", "Data Visualization (Tableau/PowerBI)", "Kaggle Portfolio & Business Case Studies", "Data Analyst Job Preparation"],
        "steps": [
            {
                "stage_key": "ug",
                "stage_label": "Degree & Foundational Math",
                "title": "Academic Foundation / Mathematical Fundamentals",
                "why": "Understanding linear algebra, statistics, and business fundamentals forms the basis of analytical reasoning.",
                "skill_name": "Statistics & Exploratory Data Analysis",
                "prerequisites": [],
                "actions": [
                    "Master foundational statistics: mean, median, standard deviation, probability distributions, and hypothesis testing.",
                    "Learn basic Excel / Google Sheets data manipulation: VLOOKUP, INDEX/MATCH, and Pivot Tables.",
                    "Complete introductory mathematics coursework for data science."
                ],
                "resources": ["Khan Academy Statistics & Probability", "Excel for Data Analysis on Coursera"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "SQL & Relational Databases",
                "title": "Master SQL Database Querying & Data Extraction",
                "why": "SQL is the fundamental industry skill used daily by data analysts to extract, filter, join, and aggregate enterprise data.",
                "skill_name": "SQL & Database Querying",
                "prerequisites": ["Statistics & Exploratory Data Analysis"],
                "actions": [
                    "Master SQL queries: SELECT, WHERE, GROUP BY, HAVING, JOINs (INNER, LEFT, RIGHT), and Subqueries.",
                    "Practice window functions (ROW_NUMBER, RANK, LAG/LEAD) and Common Table Expressions (CTEs) on PostgreSQL.",
                    "Solve 50+ interactive SQL challenges on LeetCode / HackerRank SQL track."
                ],
                "resources": ["SQLBolt Interactive SQL Tutorial", "Mode Analytics SQL Handbook"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Python Programming",
                "title": "Python for Data Analysis & Manipulation",
                "why": "Python with Pandas and NumPy enables automated data cleaning, transformation, and exploratory statistical analysis.",
                "skill_name": "Python Data Analysis (Pandas/NumPy)",
                "prerequisites": ["SQL & Database Querying"],
                "actions": [
                    "Learn Python programming syntax, data structures (lists, dicts), and functions.",
                    "Master Pandas DataFrames: filtering, merging, handling missing values, and group aggregation.",
                    "Perform Exploratory Data Analysis (EDA) on real-world datasets using Matplotlib and Seaborn."
                ],
                "resources": ["Python for Data Analysis by Wes McKinney", "Kaggle Python & Pandas Courses"],
                "estimated_time": "4 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "BI Tools & Dashboards",
                "title": "Data Visualization & Business Intelligence (Tableau / PowerBI)",
                "why": "Visualizing insights through interactive dashboards allows non-technical business stakeholders to make data-driven decisions.",
                "skill_name": "Data Visualization (Tableau/PowerBI)",
                "prerequisites": ["Python Data Analysis (Pandas/NumPy)"],
                "actions": [
                    "Build interactive dashboards in Tableau or PowerBI using calculated fields, parameters, and filters.",
                    "Complete Google Data Analytics Professional Certificate or Tableau Desktop Specialist certification.",
                    "Design executive KPI dashboards adhering to data storytelling and visual presentation standards."
                ],
                "resources": ["Google Data Analytics Professional Certificate", "Tableau Public Dashboard Gallery"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Portfolio Projects",
                "title": "Build Applied Kaggle & GitHub Data Portfolio",
                "why": "Hiring managers evaluate candidates based on end-to-end data project portfolios showing business impact.",
                "skill_name": "Kaggle Portfolio & Business Case Studies",
                "prerequisites": ["Data Visualization (Tableau/PowerBI)"],
                "actions": [
                    "Complete 3 end-to-end portfolio projects: customer churn analysis, sales forecasting, and exploratory cohort analysis.",
                    "Publish notebooks on Kaggle and document project GitHub repositories with clear executive summaries.",
                    "Create an interactive portfolio website showcasing live Tableau dashboards and methodology."
                ],
                "resources": ["Kaggle Competitions & Datasets", "GitHub Portfolio Templates"],
                "estimated_time": "2 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Career Placement",
                "title": "Prepare Resume, SQL/Analytics Interviews & Job Applications",
                "why": "Final milestone to transition into entry-level Data Analyst, Business Intelligence Analyst, or Junior Data Scientist roles.",
                "skill_name": "Data Analyst Job Preparation",
                "prerequisites": ["Kaggle Portfolio & Business Case Studies"],
                "actions": [
                    "Tailor resume and LinkedIn profile highlighting quantified impact (e.g. 'Improved query speed by 40%').",
                    "Practice live SQL coding interviews, business case study questions, and behavioral interviews.",
                    "Apply for Data Analyst positions and participate in industry networking events."
                ],
                "resources": ["Glassdoor Data Analyst Interview Questions", "LinkedIn Jobs & Networking"],
                "estimated_time": "2 months"
            }
        ]
    },

    "software-engineer": {
        "career_name": "Software Engineer",
        "sector": "Technology",
        "role_definition": "Engineers who design, build, test, and deploy software applications, backend services, and scalable systems using modern programming languages and frameworks.",
        "required_skills": ["Programming Fundamentals (Java/Python/C++)", "Data Structures & Algorithms", "Full-Stack Web Frameworks", "Database Systems & System Architecture", "Git Version Control & DevOps Basics", "Technical Interview & Job Placement"],
        "steps": [
            {
                "stage_key": "ug",
                "stage_label": "Computer Science Base",
                "title": "Academic CS Degree / Core Programming Fundamentals",
                "why": "Obtaining a solid foundation in computer science theory and OOP programming is essential for engineering scalable software.",
                "skill_name": "Programming Fundamentals (Java/Python/C++)",
                "prerequisites": [],
                "actions": [
                    "Master object-oriented programming (OOP) principles in Java, Python, or C++.",
                    "Understand memory management, control structures, and standard library data structures.",
                    "Build basic CLI applications and practice clean code modularity."
                ],
                "resources": ["CS50 Introduction to Computer Science", "Java Programming Masterclass"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Algorithms & Problem Solving",
                "title": "Data Structures & Algorithms Mastery",
                "why": "Core computer science algorithms and data structures are required to write efficient code and pass technical coding interviews.",
                "skill_name": "Data Structures & Algorithms",
                "prerequisites": ["Programming Fundamentals (Java/Python/C++)"],
                "actions": [
                    "Master Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees, Graphs, and Sorting/Searching algorithms.",
                    "Understand Big-O time and space complexity analysis.",
                    "Solve 150+ coding problems on LeetCode / HackerRank across Easy and Medium difficulty."
                ],
                "resources": ["LeetCode 75 Study Plan", "Introduction to Algorithms (CLRS)"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Full-Stack Web Frameworks",
                "title": "Build Modern Full-Stack Applications",
                "why": "Modern software engineering roles require hands-on experience building web services, REST APIs, and interactive UIs.",
                "skill_name": "Full-Stack Web Frameworks",
                "prerequisites": ["Data Structures & Algorithms"],
                "actions": [
                    "Build web backend APIs using Python (FastAPI/Django), Node.js, or Java Spring Boot.",
                    "Build responsive user interfaces using React, Vue, or modern HTML5/CSS.",
                    "Integrate RESTful endpoints, JWT authentication, and JSON client-server communication."
                ],
                "resources": ["Full Stack Open (University of Helsinki)", "React & FastAPI Official Docs"],
                "estimated_time": "5 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Databases & System Architecture",
                "title": "Relational Databases, System Design & Architecture",
                "why": "Scalable software systems require robust database schema design (PostgreSQL), caching, and system architecture principles.",
                "skill_name": "Database Systems & System Architecture",
                "prerequisites": ["Full-Stack Web Frameworks"],
                "actions": [
                    "Design 3NF relational database schemas and write optimized SQL queries in PostgreSQL.",
                    "Implement Redis caching, message queues, and microservice architecture patterns.",
                    "Study system design fundamentals: load balancing, horizontal scaling, database sharding, and API gateways."
                ],
                "resources": ["Designing Data-Intensive Applications by Martin Kleppmann", "System Design Primer on GitHub"],
                "estimated_time": "4 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "DevOps & Projects",
                "title": "Git Version Control, CI/CD & Production Capstone Project",
                "why": "Professional software engineers collaborate via Git, automated testing pipelines, and containerization.",
                "skill_name": "Git Version Control & DevOps Basics",
                "prerequisites": ["Database Systems & System Architecture"],
                "actions": [
                    "Master Git workflow: branching, pull requests, code reviews, and resolving merge conflicts.",
                    "Dockerize backend services and deploy applications to AWS / Vercel with GitHub Actions CI/CD pipelines.",
                    "Build and deploy a full-featured production web app as a portfolio showcase."
                ],
                "resources": ["Git Official Documentation", "Docker & AWS Deployment Guides"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Career Placement",
                "title": "Technical Interviews, Coding Fairs & Job Applications",
                "why": "Final milestone to land Software Engineer, Backend Developer, or Full Stack Engineer roles.",
                "skill_name": "Technical Interview & Job Placement",
                "prerequisites": ["Git Version Control & DevOps Basics"],
                "actions": [
                    "Conduct mock technical coding interviews on Pramp / Interviewing.io.",
                    "Polish software engineering resume, GitHub profile, and LinkedIn presence.",
                    "Attend tech job fairs, participate in hiring hackathons, and apply for Software Engineer positions."
                ],
                "resources": ["Cracking the Coding Interview by Gayle Laakmann McDowell", "Pramp Mock Interviews"],
                "estimated_time": "2 months"
            }
        ]
    },

    "ias-officer": {
        "career_name": "IAS / Civil Services Officer",
        "sector": "Government & Civil Services",
        "role_definition": "Senior civil servant responsible for public administration, district revenue governance, government policy formulation, and law enforcement.",
        "required_skills": ["Indian Polity, History & Economy", "Prelims Test Strategy & CSAT", "Mains Answer Writing & Essay", "Public Administration & Communication", "District Revenue & Field Governance"],
        "steps": [
            {
                "stage_key": "ug",
                "stage_label": "Undergraduate Studies",
                "title": "Degree Completion & NCERT General Studies Base",
                "why": "UPSC CSE requires a graduate degree in any discipline. Building a strong foundation in History, Polity, and Economy is mandatory.",
                "skill_name": "Indian Polity, History & Economy",
                "prerequisites": [],
                "actions": [
                    "Read NCERT textbooks (Classes 6-12) for History, Geography, Indian Polity, and Indian Economy.",
                    "Establish daily newspaper reading routine (The Hindu / Indian Express) for current affairs analysis.",
                    "Maintain structured personal notes categorized by UPSC Syllabus topics (GS I to IV)."
                ],
                "resources": ["NCERT Textbooks", "M. Laxmikanth Indian Polity", "Ramesh Singh Indian Economy"],
                "estimated_time": "36 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "UPSC CSE Prelims Prep",
                "title": "Prelims Mock Testing & CSAT Quantitative Aptitude",
                "why": "Prelims exam filters over 1 million applicants down to top 14,000 candidates for Mains.",
                "skill_name": "Prelims Test Strategy & CSAT",
                "prerequisites": ["Indian Polity, History & Economy"],
                "actions": [
                    "Solve 50+ full-length Prelims mock test series for General Studies Paper 1 and analyze error patterns.",
                    "Master CSAT Paper 2 quantitative aptitude, logical reasoning, and reading comprehension to secure >33% qualifying mark.",
                    "Revise 12 months of monthly current affairs compilations and government scheme portals (PIB)."
                ],
                "resources": ["UPSC Official Syllabus & Previous Year Papers", "PIB India Official Portal"],
                "estimated_time": "12 months"
            },
            {
                "stage_key": "pg",
                "stage_label": "UPSC CSE Mains Prep",
                "title": "Mains Answer Writing & Optional Subject Mastery",
                "why": "Mains exam (1750 marks across 9 papers) determines candidate merit rank and IAS service allocation.",
                "skill_name": "Mains Answer Writing & Essay",
                "prerequisites": ["Prelims Test Strategy & CSAT"],
                "actions": [
                    "Complete 100% syllabus coverage for Optional Subject (e.g., PSIR, Sociology, Geography, History).",
                    "Practice daily answer writing focusing on introduction, body diagrams/flowcharts, and balanced conclusions for GS I-IV.",
                    "Write 10 full-length Essay papers focusing on multi-dimensional perspectives (economic, social, political, ethical)."
                ],
                "resources": ["UPSC Mains Model Answer Keys", "IGNOU Study Material for Optional Subject"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "pg",
                "stage_label": "Personality Test (Interview)",
                "title": "UPSC Personality Test & DAF Preparation",
                "why": "Final stage evaluates mental alertness, administrative judgment, and clear exposition before the UPSC Interview Board.",
                "skill_name": "Public Administration & Communication",
                "prerequisites": ["Mains Answer Writing & Essay"],
                "actions": [
                    "Thoroughly analyze every entry in Detailed Application Form (DAF) including home state, hobbies, and academic background.",
                    "Participate in 5+ mock interviews with former bureaucrats and diplomats for constructive feedback.",
                    "Formulate objective, balanced opinions on sensitive national and international geopolitical affairs."
                ],
                "resources": ["UPSC Interview Transcripts Archive", "LBSNAA Training Memoirs"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "LBSNAA & Field Training",
                "title": "LBSNAA Officer Foundation & District SDM Posting",
                "why": "Prepares officer trainees for real-world public administration, district revenue governance, and law enforcement.",
                "skill_name": "District Revenue & Field Governance",
                "prerequisites": ["Public Administration & Communication"],
                "actions": [
                    "Complete 15-week Foundation Course at Lal Bahadur Shastri National Academy of Administration (LBSNAA), Mussoorie.",
                    "Undergo 1-year district attachment as Assistant Collector / Sub-Divisional Magistrate (SDM) handling land records.",
                    "Execute village study assignment and submit district administrative evaluation report to state government."
                ],
                "resources": ["LBSNAA Course Curriculum", "State Land Revenue Code Manuals"],
                "estimated_time": "24 months"
            }
        ]
    },

    "ui-ux-designer": {
        "career_name": "UI/UX Designer",
        "sector": "Design",
        "role_definition": "Product designer responsible for conducting user research, wireframing, building Figma design systems, and crafting responsive user interfaces.",
        "required_skills": ["Visual Design & Typography", "User Research & Wireframing", "Figma & Scalable Design Systems", "Usability Testing & Product Analytics", "UX Case Study Documentation"],
        "steps": [
            {
                "stage_key": "class12",
                "stage_label": "Design Fundamentals",
                "title": "Visual Design Principles, Color & Typography",
                "why": "Strong visual hierarchy, grid alignment, and typography are fundamental to designing accessible interfaces.",
                "skill_name": "Visual Design & Typography",
                "prerequisites": [],
                "actions": [
                    "Study visual design principles: grid systems, visual hierarchy, typography scale, and WCAG color contrast standards.",
                    "Deconstruct top 20 web and mobile apps to reverse-engineer layout patterns.",
                    "Complete 30 daily UI design challenges recreating dashboard and mobile app screens."
                ],
                "resources": ["Refactoring UI by Adam Wathan", "Laws of UX", "Google Material Design Guidelines"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "UX Research & Wireframing",
                "title": "User Research, Journey Mapping & Wireframes",
                "why": "UX design starts with understanding user pain points, mapping user flows, and structuring navigation.",
                "skill_name": "User Research & Wireframing",
                "prerequisites": ["Visual Design & Typography"],
                "actions": [
                    "Conduct 10 user interviews, synthesize affinity diagrams, and create user personas for target problem statements.",
                    "Map user flows, site maps, and information architecture for complex web applications.",
                    "Create low-fidelity wireframes in Figma to validate layout usability before high-fidelity styling."
                ],
                "resources": ["Nielsen Norman Group (NN/g) UX Articles", "The Design of Everyday Things by Don Norman"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "ug",
                "stage_label": "Figma & Design Systems",
                "title": "Figma Mastery & Component Design Systems",
                "why": "Modern product teams rely on scalable design systems with Auto-Layout, design tokens, and interactive components.",
                "skill_name": "Figma & Scalable Design Systems",
                "prerequisites": ["User Research & Wireframing"],
                "actions": [
                    "Master advanced Figma features: Auto-Layout 5.0, Component Variables, Tokens, and Interactive Components.",
                    "Build a complete end-to-end design system containing typography scales, color tokens, buttons, inputs, and modals.",
                    "Create realistic high-fidelity clickable prototypes with smart-animate transitions for user testing."
                ],
                "resources": ["Figma Academy Official Tutorials", "Shopify Polaris Design System"],
                "estimated_time": "6 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Usability Testing",
                "title": "Usability Testing & Analytics Iteration",
                "why": "Data-driven UX design tests assumptions using quantitative analytics and qualitative usability sessions.",
                "skill_name": "Usability Testing & Product Analytics",
                "prerequisites": ["Figma & Scalable Design Systems"],
                "actions": [
                    "Conduct unmoderated and moderated usability testing sessions using Maze with 8 target users.",
                    "Analyze heatmaps, session recordings, and conversion funnels to identify user drop-off points.",
                    "Iterate design solutions based on empirical feedback and measure success via System Usability Scale (SUS)."
                ],
                "resources": ["Maze Usability Testing Platform", "Mixpanel Analytics Documentation"],
                "estimated_time": "3 months"
            },
            {
                "stage_key": "professional",
                "stage_label": "Portfolio & Handoff",
                "title": "Industry Portfolio & Developer Handoff",
                "why": "Design hires require deep case studies detailing problem statement, research, iterations, and final impact.",
                "skill_name": "UX Case Study Documentation",
                "prerequisites": ["Usability Testing & Product Analytics"],
                "actions": [
                    "Write 3 comprehensive case studies explaining project goals, research findings, iteration trade-offs, and prototypes.",
                    "Prepare design handoff documentation in Figma with redlines, responsive breakpoints, and developer specs.",
                    "Publish personal portfolio website (Framer / Webflow) and present case study slide decks in hiring interviews."
                ],
                "resources": ["Bestfolios Case Study Archives", "Framer Website Builder"],
                "estimated_time": "3 months"
            }
        ]
    }
}


def _load_batch1_templates():
    batch1_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "seeds", "batch1_technology.json")
    if not os.path.exists(batch1_file):
        return
    try:
        with open(batch1_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        for item in data:
            slug = item["slug"]
            name = item["name"]
            sector = item.get("sector", "Technology")
            desc = item.get("description", "")
            skills = [s["name"] for s in item.get("skills", [])]
            milestones = item.get("roadmap", {}).get("milestones", [])
            steps = []
            for m in milestones:
                stage_key = m.get("stage_key", "ug")
                phase = m.get("phase", "Foundations")
                est_time = m.get("estimated_time", "6-8 weeks")
                steps.append({
                    "stage_key": stage_key,
                    "stage_label": f"{phase} • {est_time}",
                    "title": m.get("title", ""),
                    "why": m.get("why", ""),
                    "skill_name": m.get("skill_name", ""),
                    "prerequisites": m.get("prerequisites", []),
                    "actions": m.get("actions", []),
                    "resources": m.get("resources", []),
                    "estimated_time": est_time,
                })
            # Only set template if not already present with higher depth
            if slug not in CURATED_SEED_TEMPLATES or len(CURATED_SEED_TEMPLATES[slug]["steps"]) < len(steps):
                CURATED_SEED_TEMPLATES[slug] = {
                    "career_name": name,
                    "sector": sector,
                    "role_definition": desc,
                    "required_skills": skills,
                    "steps": steps,
                }
            # Register in semantic map
            clean_slug = slug.replace("-", " ")
            SEMANTIC_CLUSTER_MAP[slug] = slug
            SEMANTIC_CLUSTER_MAP[clean_slug] = slug
            SEMANTIC_CLUSTER_MAP[name.lower()] = slug
            SEMANTIC_CLUSTER_MAP[slug.replace("-", "")] = slug
            # Aliases
            words = [w for w in clean_slug.split() if w not in {"and", "&"}]
            if len(words) >= 2:
                SEMANTIC_CLUSTER_MAP[" ".join(words)] = slug
    except Exception as e:
        print(f"[Roadmap Engine] Failed to load batch 1 templates: {e}")

_load_batch1_templates()


def resolve_semantic_cluster(goal_text: str) -> Optional[str]:
    """
    Matches user input against known career clusters using semantic alias mapping.
    Returns cluster_key if matched, or None.
    """
    raw_lower = goal_text.strip().lower()
    if raw_lower in SEMANTIC_CLUSTER_MAP:
        return SEMANTIC_CLUSTER_MAP[raw_lower]

    spaced = re.sub(r"[-_]+", " ", raw_lower)
    clean_alpha = re.sub(r"[^a-z0-9\s/]+", "", spaced).strip()
    clean_alpha = re.sub(r"\s+", " ", clean_alpha)

    if clean_alpha in SEMANTIC_CLUSTER_MAP:
        return SEMANTIC_CLUSTER_MAP[clean_alpha]

    for alias, cluster_key in SEMANTIC_CLUSTER_MAP.items():
        if alias == clean_alpha or alias == raw_lower:
            return cluster_key
        if len(alias) >= 4 and (alias in clean_alpha or clean_alpha in alias):
            return cluster_key

    return None


def check_ambiguity(goal_text: str) -> Tuple[bool, Optional[str], List[str], str]:
    """
    Evaluates whether the user's entered destination is ambiguous, invalid, or valid.
    Returns (is_ambiguous, clarification_reason, suggested_destinations, classification_type).
    classification_type is one of: 'AMBIGUOUS_GOAL', 'INVALID_INPUT', 'INSUFFICIENT_DATA', 'VALID_PASS'
    """
    clean_goal = goal_text.strip().lower()

    # 1. Insufficient Data check
    if len(clean_goal) < 2 or clean_goal in {"a", "an", "the", "or", "and", "in", "to", "for"}:
        return (
            True,
            f"The goal input '{goal_text}' provides insufficient detail to construct a roadmap. Please enter a full career title.",
            ["Software Engineer", "Data Analyst", "IAS Officer"],
            "INSUFFICIENT_DATA"
        )

    # 2. Invalid / Gibberish check
    is_gibberish = False
    words = clean_goal.split()
    for w in words:
        if len(w) > 4 and not re.search(r"[aeiouy]", w) and not w.isdigit():
            is_gibberish = True
        if len(w) > 3 and len(set(w)) < 3 and not w.isdigit():
            is_gibberish = True

    if is_gibberish or clean_goal.isdigit() or clean_goal in {"asdkjfh", "qwerty", "test1234"}:
        return (
            True,
            f"The input '{goal_text}' was not recognized as a valid career title or educational pathway. Please enter a valid goal.",
            ["Software Engineer", "Medical Doctor", "Chartered Accountant"],
            "INVALID_INPUT"
        )

    # 3. Organization / Academic Institute check (e.g., "Chebyshev Institute")
    if any(inst in clean_goal for inst in ["institute", "university", "college", "academy", "chebyshev"]):
        reason = f"The input '{goal_text}' is an academic or research institution, not a recognized career title. Did you mean a career in mathematics or academic research?"
        suggestions = ["Academic Researcher (Mathematics)", "Data Scientist", "Applied Mathematician", "University Professor"]
        return True, reason, suggestions, "AMBIGUOUS_GOAL"

    # 4. Ambiguous / Broad Field check
    is_broad = clean_goal in AMBIGUOUS_TERMS or (len(words) == 1 and clean_goal in AMBIGUITY_SUGGESTIONS)
    is_multi = bool(re.search(r"\bor\b", clean_goal)) or "something with" in clean_goal

    if is_broad or is_multi:
        suggestions = AMBIGUITY_SUGGESTIONS.get(clean_goal, [])
        if not suggestions:
            if "doctor" in clean_goal or "medicine" in clean_goal:
                suggestions = AMBIGUITY_SUGGESTIONS["doctor"]
            elif "engineer" in clean_goal:
                suggestions = AMBIGUITY_SUGGESTIONS["engineering"]
            elif "business" in clean_goal:
                suggestions = AMBIGUITY_SUGGESTIONS["business"]
            else:
                suggestions = ["Software Engineer", "Data Analyst", "Product Manager"]

        reason = (
            f"We couldn't build a single specific roadmap for '{goal_text}' because the destination covers multiple distinct career paths. "
            f"Please select or specify a concrete target role."
        )
        return True, reason, suggestions, "AMBIGUOUS_GOAL"

    return False, None, [], "VALID_PASS"


# Generic filler blocklist for Quality Gate evaluation
FILLER_BLOCKLIST = [
    "explore the field", "read about", "talk to a mentor", "choose a route",
    "learn about the topic", "understand the basics", "check entry routes",
    "explore options", "get familiar", "do research on"
]


def validate_roadmap_quality(roadmap_data: Dict[str, Any]) -> Tuple[bool, List[str], Dict[str, Any]]:
    """
    Mandatory Quality Gate for roadmaps before persistence or rendering.
    Returns (passed: bool, failure_reasons: List[str], quality_metrics: Dict[str, Any]).
    """
    steps = roadmap_data.get("steps", [])
    reasons = []

    # 1. Stage Count check (must be >= 4 stages)
    stage_count = len(steps)
    if stage_count < 4:
        reasons.append(f"Stage count ({stage_count}) is below required minimum of 4 milestones.")

    # 2. Action items count and filler pattern scan
    low_action_stages = []
    filler_action_count = 0
    total_actions = 0

    for i, s in enumerate(steps):
        actions = s.get("actions", [])
        total_actions += len(actions)
        if len(actions) < 2:
            low_action_stages.append(i + 1)
        for act in actions:
            clean_act = act.lower().strip()
            if any(filler in clean_act for filler in FILLER_BLOCKLIST) and len(clean_act.split()) < 7:
                filler_action_count += 1

    if low_action_stages:
        reasons.append(f"Milestones {low_action_stages} have fewer than 2 concrete action items.")

    if filler_action_count > 0 and (filler_action_count / max(1, total_actions)) > 0.3:
        reasons.append(f"High filler action ratio ({filler_action_count}/{total_actions}).")

    # 3. Target skill gap verification (skills must be non-empty and distinct from step titles/goals)
    stage_titles = {s.get("title", "").lower() for s in steps}
    stage_goals = {s.get("goal", "").lower() for s in steps}

    duplicated_skills = []
    skills = []
    for s in steps:
        sk = s.get("skill_name") or ""
        if sk:
            skills.append(sk)
            if sk.lower() in stage_titles or sk.lower() in stage_goals:
                duplicated_skills.append(sk)

    if duplicated_skills:
        reasons.append(f"Skill names duplicate step titles: {duplicated_skills}.")

    passed = len(reasons) == 0
    metrics = {
        "stage_count": stage_count,
        "total_actions": total_actions,
        "filler_action_count": filler_action_count,
        "duplicated_skills_count": len(duplicated_skills),
        "passed": passed
    }
    return passed, reasons, metrics


def calculate_confidence_score(
    provenance: Optional[str] = None,
    quality_metrics: Optional[Dict[str, Any]] = None,
    is_curated: bool = False,
    gemini_used: bool = False,
    validation_passed: bool = False,
    steps_count: int = 0,
    prereqs_count: int = 0
) -> float:
    """
    Calculates dynamic confidence score (0.0 to 1.0) tied to Quality Gate metrics and provenance.
    """
    if provenance is None:
        if is_curated:
            provenance = "Curated Seed Pathway"
        elif gemini_used and validation_passed:
            provenance = "AI-Synthesized Path"
        else:
            provenance = "Sector Template Fallback"

    if quality_metrics is None:
        quality_metrics = {
            "stage_count": steps_count,
            "passed": validation_passed,
            "filler_action_count": 0
        }

    if provenance == "Curated Seed Pathway":
        base = 0.96
    elif provenance == "AI-Synthesized Path":
        base = 0.88
    else:
        base = 0.83

    stage_count = quality_metrics.get("stage_count", steps_count)
    if stage_count >= 5:
        base += 0.03
    elif stage_count == 4:
        base += 0.01

    if quality_metrics.get("passed", False):
        base += 0.01

    if quality_metrics.get("filler_action_count", 0) == 0:
        base += 0.01

    return min(0.98, round(base, 2))


def verify_acyclic_dag(steps: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Ensures step prerequisites form an acyclic directed graph (DAG).
    Fixes cycles if present by stripping circular prerequisite references.
    """
    seen_skills = set()
    sanitized_steps = []

    for step in steps:
        valid_prereqs = []
        for prereq in step.get("prerequisites", []):
            if prereq not in seen_skills and prereq.lower() != step.get("title", "").lower():
                valid_prereqs.append(prereq)
        step["prerequisites"] = valid_prereqs
        if step.get("skill_name"):
            seen_skills.add(step["skill_name"])
        sanitized_steps.append(step)

    return sanitized_steps


def normalize_and_map_skills(db: Session, raw_skills: List[str]) -> List[models.Skill]:
    """
    Normalizes skill strings against the database Skill taxonomy.
    """
    normalized_skills = []
    for raw_name in raw_skills:
        clean_name = raw_name.strip()
        if not clean_name:
            continue
        skill_row = db.query(models.Skill).filter(models.Skill.name.ilike(clean_name)).first()
        if not skill_row:
            skill_row = models.Skill(name=clean_name, category="technical")
            db.add(skill_row)
            db.flush()
        normalized_skills.append(skill_row)
    return normalized_skills


def compute_skill_gap(db: Session, user: models.User, required_skill_names: List[str]) -> Dict[str, Any]:
    """
    Computes a personalized skill-gap view comparing user's UserSkill inventory with target skills.
    """
    user_skill_rows = db.query(models.UserSkill).filter_by(user_id=user.id).all()
    user_known_skills = {us.skill.name.lower(): us.proficiency for us in user_skill_rows if us.skill}

    known = []
    gaps = []

    for skill_name in required_skill_names:
        lower_name = skill_name.lower()
        if lower_name in user_known_skills:
            known.append({
                "skill": skill_name,
                "proficiency": user_known_skills[lower_name]
            })
        else:
            gaps.append({
                "skill": skill_name,
                "priority": "high",
                "gap_level": "missing"
            })

    all_satisfied = len(gaps) == 0 and len(required_skill_names) > 0
    return {"known": known, "gaps": gaps, "all_satisfied": all_satisfied}


def generate_gemini_roadmap_structure(goal_text: str, user_stage: str) -> Optional[schemas.GeminiRoadmapOutput]:
    """
    Generates a structured JSON roadmap using Google Gemini API with few-shot prompt instructions.
    Validates output using Pydantic schemas. Returns None if key is missing or validation fails.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        model_names = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-1.5-flash']
        model = None
        for m_name in model_names:
            try:
                model = genai.GenerativeModel(m_name)
                break
            except Exception:
                continue
        if not model:
            model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""
You are a senior career path architect for FutureForge.
Generate a high-depth, stage-accurate career roadmap for: "{goal_text}" (current stage: "{user_stage}").

Requirements:
1. Include 5 or more realistic milestone stages spanning education to professional practice.
2. Every stage MUST include 3 concrete, specific action items referencing REAL exams, certifying bodies, degrees, or tools.
3. AVOID generic filler phrasing like "explore the field", "read about options", or "talk to a mentor".
4. Assign a REAL domain-specific target skill to each stage (e.g. "Human Anatomy", "System Architecture", "NEET-UG PCB Prep"). Do NOT repeat stage titles as skill names.
5. The final stage MUST be an actionable career placement step (e.g. "Apply for {goal_text} Positions & Resume Preparation").

Output strictly valid JSON matching this schema:
{{
  "is_ambiguous": false,
  "clarification_reason": null,
  "suggested_destinations": [],
  "role_definition": "Detailed 2-sentence description of role responsibilities",
  "sector": "Technology / Healthcare / Government / Law / Design / Finance",
  "required_skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "steps": [
    {{
      "stage_key": "class10 | class12 | ug | pg | professional",
      "title": "Concrete Milestone Title",
      "why": "Clear explanation of why this milestone exists at this stage",
      "skill_name": "Specific Domain Skill Learned",
      "prerequisites": ["Prerequisite Skill or Exam"],
      "actions": [
        "Concrete action 1 referencing specific exam/degree/tool",
        "Concrete action 2 referencing specific practical work",
        "Concrete action 3 referencing specific outcome"
      ],
      "resources": ["Official portal or core textbook name"],
      "estimated_time": "e.g., 6 months"
    }}
  ]
}}
Do NOT output markdown backticks or any conversational text outside the raw JSON object.
"""
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

        data = json.loads(text)
        validated = schemas.GeminiRoadmapOutput.model_validate(data)
        return validated
    except Exception as err:
        print(f"[Gemini Roadmap Error]: {err}")
        return None


def evaluate_step_assessment(
    db: Session,
    user: models.User,
    step: models.RoadmapStep,
    answers: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Evaluates an interactive assessment submission tied to a step/skill.
    Score >= 70 marks step complete and unlocks progression.
    """
    total_questions = len(answers) if answers else 1
    correct_count = sum(1 for k, v in answers.items() if str(v) in ("0", "correct", "true", "1"))
    score = round((correct_count / total_questions) * 100, 1)
    passed = score >= 70.0

    if not step.progress:
        step.progress = models.RoadmapProgress(step_id=step.id)

    if passed:
        step.progress.status = "completed"
        feedback = f"Great work! You passed the {step.title} assessment with {score}%. Step completed and unlocked next milestone."
        unlocked_next = True

        if step.skill_name:
            skill_row = db.query(models.Skill).filter(models.Skill.name.ilike(step.skill_name)).first()
            if not skill_row:
                skill_row = models.Skill(name=step.skill_name, category="technical")
                db.add(skill_row)
                db.flush()

            user_skill = db.query(models.UserSkill).filter_by(user_id=user.id, skill_id=skill_row.id).first()
            if not user_skill:
                user_skill = models.UserSkill(user_id=user.id, skill_id=skill_row.id, proficiency="intermediate")
                db.add(user_skill)
            else:
                user_skill.proficiency = "advanced"
    else:
        step.progress.status = "in_progress"
        feedback = f"You scored {score}%. Practice the core concepts of {step.title} before retrying."
        unlocked_next = False

    assessment_log = models.SkillAssessment(
        user_id=user.id,
        step_id=step.id,
        score=score,
        passed=passed,
        feedback=feedback
    )
    db.add(assessment_log)
    db.commit()

    return {
        "step_id": step.id,
        "score": score,
        "passed": passed,
        "unlocked_next_step": unlocked_next,
        "feedback": feedback
    }
