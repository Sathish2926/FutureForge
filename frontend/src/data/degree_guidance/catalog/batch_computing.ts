import { UniversalDegreeRecord } from "./types";

export const COMPUTING_DEGREES: UniversalDegreeRecord[] = [
  // 1. B.Sc Computer Science
  {
    degree_id: "bsc-cs",
    id: "bsc-cs",
    familyId: "computing",
    name: "Bachelor of Science in Computer Science",
    shortName: "B.Sc Computer Science",
    aliases: ["BSc CS", "B.Sc. Computer Science", "BSc Computer Science", "B.Sc (Hons) Computer Science", "BSc CS Hons", "Computer Science graduate", "bsc-cs"],
    level: "UG",
    discipline: "Computing & IT",
    duration: "3 to 4 Years (NEP FYUP)",
    durationYears: 3,
    regulator: "UGC",
    overview: "A rigorous foundational undergraduate degree focusing on theoretical computing, algorithm design, data structures, operating systems, and full-stack software development. It equips students with algorithmic thinking, mathematical rigor, and modern programming proficiency for tech industry roles and postgraduate research.",
    key_skills: [
      "Data Structures & Algorithmic Complexity (Java/C++/Python)",
      "Database Design & SQL Optimization",
      "Object-Oriented Software Engineering & Design Patterns",
      "Operating Systems Internals & Linux Shell Scripting",
      "Computer Networks, TCP/IP & RESTful API Architecture",
      "Web Technologies & Frontend/Backend Integration"
    ],
    subjects_taught: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems & Systems Programming",
      "Computer System Architecture",
      "Design & Analysis of Algorithms",
      "Software Engineering & Object-Oriented Design",
      "Computer Networks & Network Security"
    ],
    typical_employers: ["Tata Consultancy Services", "Infosys", "Wipro", "Cognizant", "Zoho Corporation", "Amazon Development Centre", "Product & Fintech Startups"],
    specializations: [
      { id: "cs-ai-ml", name: "Artificial Intelligence & Machine Learning", aliases: ["B.Sc CS AI", "CS with ML"], skillsGained: ["TensorFlow", "Scikit-Learn", "Python", "Data Mining"], typicalRoles: ["Associate ML Engineer", "Data Analyst"] },
      { id: "cs-data-science", name: "Data Science & Analytics", aliases: ["B.Sc Data Science", "Data Analytics"], skillsGained: ["Pandas", "SQL", "Tableau", "Predictive Analytics"], typicalRoles: ["Junior Data Scientist", "BI Analyst"] },
      { id: "cs-cloud-cyber", name: "Cloud Computing & Cybersecurity", aliases: ["B.Sc Cloud Security"], skillsGained: ["AWS/Azure", "Docker", "Linux Hardening", "Network Security"], typicalRoles: ["Cloud Support Associate", "Security Analyst"] }
    ],
    sourceUrl: "https://www.ugc.gov.in",
    lastReviewed: "2026-08-15",
    career_paths: [
      {
        id: "bsc-cs-car-1",
        degree_id: "bsc-cs",
        role_title: "Junior Software Developer / Full-Stack Engineer",
        tier: "entry",
        employer_type: "private",
        career_type: "Direct",
        match_rationale: "Your B.Sc CS covers data structures, algorithms, and OOP, mapping directly to application software development and REST API programming.",
        indicative_salary: { min: 4.5, max: 8.5, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "NASSCOM / AmbitionBox IT Salary Report 2025 (indicative — varies by employer and location)" },
        skills: ["Java/Python/TypeScript", "Data Structures", "SQL & Relational DBs", "Git & CI/CD"],
        top_employers: ["Zoho", "ThoughtWorks", "Accenture", "SaaS Startups"],
        sourceUrl: "https://www.nasscom.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-cs-car-2",
        degree_id: "bsc-cs",
        role_title: "Data Analyst / Associate Business Intelligence Engineer",
        tier: "entry",
        employer_type: "private",
        career_type: "Related",
        match_rationale: "Discrete mathematics, probability, and database management coursework provide direct grounding for SQL data modeling and statistical dashboarding.",
        indicative_salary: { min: 4.2, max: 8.0, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Analytics India Magazine Survey 2025 (indicative)" },
        skills: ["SQL Query Tuning", "Python (Pandas/NumPy)", "Power BI/Tableau", "Applied Statistics"],
        top_employers: ["Mu Sigma", "Fractal Analytics", "LatentView", "E-commerce Companies"],
        sourceUrl: "https://analyticsindiamag.com",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-cs-car-3",
        degree_id: "bsc-cs",
        role_title: "Lead Systems Architect / Technical Lead",
        tier: "senior",
        employer_type: "private",
        career_type: "Advanced",
        match_rationale: "Requires scaling distributed architectures and microservices, building upon underlying operating systems, concurrency, and network protocol foundations.",
        indicative_salary: { min: 18.0, max: 35.0, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Michael Page India Technology Salary Guide 2025 (indicative)" },
        skills: ["Distributed Systems", "Cloud Infrastructure (AWS/GCP)", "High-Concurrency Architectures", "Engineering Leadership"],
        top_employers: ["Tier-1 Product Tech", "FinTech Platforms", "Global In-House Centers (GCCs)"],
        sourceUrl: "https://www.michaelpage.co.in",
        lastReviewed: "2026-08-15"
      }
    ],
    higher_studies: [
      {
        id: "bsc-cs-hs-1",
        degree_id: "bsc-cs",
        program_name: "MCA (Master of Computer Applications)",
        level: "PG",
        entrance_exams: ["NIMCET", "MAH-MCA-CET", "TANCET", "CUET-PG"],
        eligibility_rule: "Graduation in B.Sc CS / BCA / B.Sc with Mathematics at 10+2 level or graduation level with minimum 60% aggregate (55% for SC/ST).",
        typical_duration: "2 Years",
        top_institutes: ["NIT Trichy", "NIT Surathkal", "JNU New Delhi", "Delhi University", "Pune University"],
        sourceUrl: "https://www.nimcet.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-cs-hs-2",
        degree_id: "bsc-cs",
        program_name: "M.Sc Computer Science / M.Sc Data Science",
        level: "PG",
        entrance_exams: ["CUET-PG", "DUET", "State University PG CETs"],
        eligibility_rule: "B.Sc (Hons) Computer Science or B.Sc with Computer Science as a major subject with minimum 55% aggregate from a UGC-recognized university. Note: IIT JAM does not offer a Computer Science test paper; admissions are via university entrance or CUET-PG.",
        typical_duration: "2 Years",
        top_institutes: ["Delhi University", "Banaras Hindu University (BHU)", "Hyderabad Central University", "Chennai Mathematical Institute"],
        sourceUrl: "https://pgcuet.samarth.ac.in",
        lastReviewed: "2026-08-15"
      }
    ],
    certifications: [
      {
        id: "bsc-cs-cert-1",
        degree_id: "bsc-cs",
        cert_name: "AWS Certified Solutions Architect – Associate",
        provider: "Amazon Web Services (AWS)",
        domain: "Cloud Infrastructure & DevOps",
        level: "Intermediate",
        prerequisites: ["Familiarity with networking, compute primitives, and Linux CLI"],
        official_url: "https://aws.amazon.com/certification/certified-solutions-architect-associate",
        sourceUrl: "https://aws.amazon.com/certification",
        lastReviewed: "2026-08-15",
        costBand: "Medium (5k-20k)"
      },
      {
        id: "bsc-cs-cert-2",
        degree_id: "bsc-cs",
        cert_name: "Meta Front-End / Back-End Developer Professional Certificate",
        provider: "Meta / Coursera",
        domain: "Full-Stack Web Engineering",
        level: "Beginner",
        prerequisites: ["Basic programming fundamentals in JavaScript or Python"],
        official_url: "https://www.coursera.org/professional-certificates/meta-back-end-developer",
        sourceUrl: "https://www.coursera.org",
        lastReviewed: "2026-08-15",
        costBand: "Low (<5k)"
      },
      {
        id: "bsc-cs-cert-3",
        degree_id: "bsc-cs",
        cert_name: "CompTIA Security+ / CEH (Certified Ethical Hacker)",
        provider: "CompTIA / EC-Council",
        domain: "Cybersecurity & Network Defense",
        level: "Intermediate",
        prerequisites: ["Computer networks, TCP/IP fundamentals, and OS concepts"],
        official_url: "https://www.comptia.org/certifications/security",
        sourceUrl: "https://www.comptia.org",
        lastReviewed: "2026-08-15",
        costBand: "High (>20k)"
      }
    ],
    government_exams: [
      {
        id: "bsc-cs-govt-1",
        degree_id: "bsc-cs",
        exam_or_post_name: "IBPS Specialist Officer (SO) – IT Officer Scale I",
        conducting_body: "Institute of Banking Personnel Selection (IBPS)",
        eligibility_rule: {
          degreeFamily: "computing",
          allowedDegrees: ["bsc-cs", "bca", "btech-cse", "btech-it"],
          mandatorySubjects: ["Computer Science", "Information Technology", "Computer Applications"],
          minMarksPercent: 55,
          ageLimitRule: { general: 30, obc: 33, sc_st: 35 },
          categoryRelaxation: "3 years for OBC, 5 years for SC/ST, 10 years for PwD as per central banking recruitment notifications.",
          notes: "4-year engineering degree or postgraduate degree in CS/IT, or B-Level certification from DOEACC. For 3-year B.Sc CS, check individual public sector bank special notification eligibility."
        },
        sourceUrl: "https://www.ibps.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-cs-govt-2",
        degree_id: "bsc-cs",
        exam_or_post_name: "Scientific Assistant (Computer Science) – IMD / DRDO / ISRO",
        conducting_body: "Staff Selection Commission (SSC) / RAC DRDO",
        eligibility_rule: {
          degreeFamily: "computing",
          allowedDegrees: ["bsc-cs", "bsc-it", "bca"],
          minMarksPercent: 60,
          ageLimitRule: { general: 30, obc: 33, sc_st: 35 },
          categoryRelaxation: "Standard central government age relaxation rules apply.",
          notes: "Bachelor's degree in Science (with Computer Science/IT/Physics) or Computer Applications with at least 60% marks."
        },
        sourceUrl: "https://ssc.gov.in",
        lastReviewed: "2026-08-15"
      }
    ],
    career_switch: [
      {
        id: "bsc-cs-switch-1",
        degree_id: "bsc-cs",
        target_role: "Technical Product Manager (Tech PM)",
        pivot_reason: "Translates software architectural feasibility, database constraints, and API capabilities into business product roadmaps and customer UX.",
        bridge_steps: [
          { step: 1, title: "Product Analytics & Wireframing", type: "course", detail: "Learn Mixpanel, Google Analytics 4, and Figma wireframing for user stories.", estimatedMonths: 2 },
          { step: 2, title: "Agile Scrum & Product Strategy", type: "cert", detail: "Obtain Certified Scrum Product Owner (CSPO) or Pragmatic Institute certificate.", estimatedMonths: 2 },
          { step: 3, title: "Capstone Product Teardown", type: "portfolio", detail: "Write and publish 2 in-depth product teardowns evaluating tech debt and revenue optimization.", estimatedMonths: 2 }
        ],
        typical_duration: "4 to 6 Months",
        recommended_certs: ["Certified Scrum Product Owner (CSPO)", "Pragmatic Institute Certified Product Manager"],
        why_feasible: "CS graduates have deep empathy for developer constraints, preventing unrealistic feature planning and earning immediate engineering team trust.",
        sourceUrl: "https://www.scrumalliance.org",
        lastReviewed: "2026-08-15"
      }
    ],
    entrepreneurship: [
      {
        id: "bsc-cs-ent-1",
        degree_id: "bsc-cs",
        idea_title: "Vertical B2B Micro-SaaS Studio",
        description: "Build niche workflow automation tools, compliance audit dashboards, or API integrations for small and medium enterprises in underserved regional industries.",
        first_milestones: [
          "Conduct 20 user interviews with regional logistics or retail SMB owners to identify recurring manual spreadsheets.",
          "Build an MVP utilizing Next.js, Supabase, and Stripe/Razorpay within 30 days.",
          "Onboard 3 paying pilot clients at introductory monthly subscription tiers."
        ],
        relevant_schemes: [
          { name: "Startup India Seed Fund Scheme (SISFS)", agency: "DPIIT / Ministry of Commerce", benefits: "Up to ₹20 Lakhs grant for proof of concept and prototype development.", sourceUrl: "https://seedfund.startupindia.gov.in" },
          { name: "MeitY SAMRIDH Scheme", agency: "Ministry of Electronics & Information Technology", benefits: "Up to ₹40 Lakhs accelerator matching funding for tech software startups.", sourceUrl: "https://meity.gov.in" }
        ],
        sourceUrl: "https://www.startupindia.gov.in",
        lastReviewed: "2026-08-15"
      }
    ],
    roadmap_template: {
      pursuing: {
        degree_id: "bsc-cs",
        status: "pursuing",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Algorithmic Foundations & Core Stack (Semesters 1–2)",
            timeframe: "Months 1–12",
            tag: "skill-building",
            description: "Build robust understanding of computational theory, discrete mathematics, and object-oriented programming.",
            tasks: [
              "Master C++ or Java and practice 100+ fundamental problems on LeetCode / HackerRank.",
              "Build relational databases and practice complex multi-table SQL queries.",
              "Create a clean GitHub profile with 2 documented command-line or GUI projects."
            ],
            milestone: "Achieve > 7.5 CGPA and publish first functional programming project on GitHub."
          },
          {
            stepNumber: 2,
            title: "Phase 2: Full-Stack Web Development & Summer Internship (Semesters 3–4)",
            timeframe: "Months 13–24",
            tag: "internship",
            description: "Develop production-ready web engineering capabilities and pursue industry internships.",
            tasks: [
              "Learn modern web development (React, Node.js, Express, PostgreSQL / MongoDB).",
              "Earn AWS Certified Cloud Practitioner or Meta Frontend Certification.",
              "Apply to 20+ software internships via Internshala, LinkedIn, and collegiate tech networks."
            ],
            milestone: "Complete an 8-week software development internship."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Pre-Placement Preparation & PG Entrance Strategy (Semesters 5–6)",
            timeframe: "Months 25–36",
            tag: "exam-prep",
            description: "Prepare simultaneously for campus placements and national competitive/PG entrance tests.",
            tasks: [
              "Prepare for NIMCET / CUET-PG if targeting premier MCA / M.Sc admissions.",
              "Solve 150+ medium LeetCode problems covering Trees, Graphs, Dynamic Programming.",
              "Build a comprehensive full-stack capstone project featuring authentication, background jobs, and cloud deployment."
            ],
            milestone: "Secure on-campus software placement offer or qualifying rank in NIMCET/CUET-PG."
          }
        ]
      },
      completed: {
        degree_id: "bsc-cs",
        status: "completed",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Project Portfolio Audit & Core Gap Remediation",
            timeframe: "Months 1–2",
            tag: "skill-building",
            description: "Standardize engineering artifacts to pass competitive technical screening rounds.",
            tasks: [
              "Refactor top 3 GitHub repositories with comprehensive READMEs, live demo URLs, and unit tests.",
              "Earn AWS Solutions Architect Associate or equivalent industry-recognized credential.",
              "Review high-frequency system design and data structures interview concepts."
            ],
            milestone: "Live developer portfolio deployed with verifiable production demonstrations."
          },
          {
            stepNumber: 2,
            title: "Phase 2: High-Volume Application Pipeline & Referrals",
            timeframe: "Months 3–4",
            tag: "application",
            description: "Execute targeted outreach across startup founders, tech recruiters, and alumni networks.",
            tasks: [
              "Apply to 10 tailored software engineering openings weekly with custom project walk-throughs.",
              "Engage in tech mock interviews through Pramp / Interviewing.io.",
              "Attend regional tech meetups (React, AWS User Groups, GDG) for direct referrals."
            ],
            milestone: "Secure 3 to 5 first-round technical screening interviews."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Offer Selection & Onboarding Acceleration",
            timeframe: "Months 5–6",
            tag: "decision",
            description: "Negotiate compensation packages and prepare for productive engineering contribution.",
            tasks: [
              "Evaluate offers assessing engineering mentorship, codebase scale, and career progression.",
              "Pre-study employer tech stack and development workflows (Docker, Kubernetes, CI/CD).",
              "Formulate a 90-day onboarding plan targeting first production code commit within week 2."
            ],
            milestone: "Successfully join software engineering team with clear 1-year progression goals."
          }
        ]
      }
    }
  },

  // 2. BCA (Bachelor of Computer Applications)
  {
    degree_id: "bca",
    id: "bca",
    familyId: "computing",
    name: "Bachelor of Computer Applications",
    shortName: "BCA",
    aliases: ["B.C.A.", "Bachelor of Computer Application", "BCA graduate", "Computer Applications degree", "bca"],
    level: "UG",
    discipline: "Computing & IT",
    duration: "3 Years",
    durationYears: 3,
    regulator: "UGC",
    overview: "An application-oriented undergraduate computing degree emphasizing enterprise software development, database administration, web and mobile app architecture, and practical IT tools. It is tailored for rapid industry absorption in corporate software development, IT operations, and systems analysis.",
    key_skills: [
      "Enterprise Application Development (Java / C# .NET / Python)",
      "Relational Database Administration & SQL Tuning",
      "Web Technologies (HTML5, CSS3, JavaScript, React/Node)",
      "Mobile Application Development (Android/Kotlin)",
      "Software Testing, QA Automation & Bug Tracking",
      "Cloud Infrastructure Basics & Business Computing"
    ],
    subjects_taught: [
      "Object-Oriented Programming with C++ and Java",
      "Relational Database Management Systems (Oracle / MySQL)",
      "Web Technologies & Scripting Frameworks",
      "Data Structures Using C",
      "Software Engineering & Project Management",
      "Computer Networks & Mobile Computing",
      "Cloud Computing & Enterprise Applications"
    ],
    typical_employers: ["Wipro Technologies", "TCS", "Infosys", "Cognizant", "Mindtree", "Capgemini", "Fintech & E-commerce Startups"],
    specializations: [
      { id: "bca-cloud", name: "Cloud & DevOps", aliases: ["BCA Cloud Computing"], skillsGained: ["AWS", "Azure", "CI/CD", "Linux"], typicalRoles: ["DevOps Engineer", "Cloud Associate"] },
      { id: "bca-cyber", name: "Cybersecurity & Ethical Hacking", aliases: ["BCA Information Security"], skillsGained: ["Network Security", "Vulnerability Assessment", "SIEM"], typicalRoles: ["Security Analyst", "SOC Associate"] },
      { id: "bca-data", name: "Data Analytics", aliases: ["BCA Big Data"], skillsGained: ["Python", "SQL", "Tableau", "Excel Modeling"], typicalRoles: ["Data Analyst", "Operations Analyst"] }
    ],
    sourceUrl: "https://www.ugc.gov.in",
    lastReviewed: "2026-08-15",
    career_paths: [
      {
        id: "bca-car-1",
        degree_id: "bca",
        role_title: "Associate Software Engineer / Application Developer",
        tier: "entry",
        employer_type: "private",
        career_type: "Direct",
        match_rationale: "Your BCA coursework in Java, Web Technologies, and DBMS translates directly into building enterprise applications, handling front-end/back-end logic, and maintaining production databases.",
        indicative_salary: { min: 4.2, max: 7.5, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "AmbitionBox BCA Placement Salary Report 2025 (indicative)" },
        skills: ["Java/.NET/Python", "SQL", "REST APIs", "Git"],
        top_employers: ["TCS", "Wipro", "Infosys", "Deloitte USI"],
        sourceUrl: "https://www.ambitionbox.com",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bca-car-2",
        degree_id: "bca",
        role_title: "Quality Assurance (QA) Automation Engineer",
        tier: "entry",
        employer_type: "private",
        career_type: "Related",
        match_rationale: "Software engineering and lifecycle testing modules in BCA provide direct competency in test plan formulation, Selenium scripting, and regression testing.",
        indicative_salary: { min: 3.8, max: 6.8, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Glassdoor India QA Salary Survey 2025 (indicative)" },
        skills: ["Selenium", "Postman", "Java/Python", "Jira", "Test Automation"],
        top_employers: ["Cognizant", "CGI", "Hexaware", "Product Startups"],
        sourceUrl: "https://www.glassdoor.co.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bca-car-3",
        degree_id: "bca",
        role_title: "Senior Engineering Manager / IT Delivery Lead",
        tier: "senior",
        employer_type: "private",
        career_type: "Advanced",
        match_rationale: "Requires end-to-end SDLC delivery oversight, client SLA management, and technical team mentoring, built on years of application engineering foundations.",
        indicative_salary: { min: 16.0, max: 32.0, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Michael Page Technology Report 2025 (indicative)" },
        skills: ["Agile/Scrum", "Release Management", "Vendor & SLA Governance", "Budget & Headcount Planning"],
        top_employers: ["Accenture", "IBM India", "Global Capability Centers (GCCs)"],
        sourceUrl: "https://www.michaelpage.co.in",
        lastReviewed: "2026-08-15"
      }
    ],
    higher_studies: [
      {
        id: "bca-hs-1",
        degree_id: "bca",
        program_name: "MCA (Master of Computer Applications)",
        level: "PG",
        entrance_exams: ["NIMCET", "MAH-MCA-CET", "CUET-PG", "IPU CET"],
        eligibility_rule: "Pass BCA / B.Sc (Computer Science) / B.Sc (IT) or equivalent degree with minimum 50% aggregate marks (45% for reserved category). Mathematics at 10+2 level is required for premier NITs.",
        typical_duration: "2 Years",
        top_institutes: ["NIT Trichy", "NIT Surathkal", "JNU", "Vellore Institute of Technology (VIT)", "Christ University"],
        sourceUrl: "https://www.nimcet.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bca-hs-2",
        degree_id: "bca",
        program_name: "MBA in Information Systems / IT Management",
        level: "PG",
        entrance_exams: ["CAT", "XAT", "SNAP", "NMAT", "CMAT"],
        eligibility_rule: "Recognized Bachelor's degree in any discipline (BCA graduates strongly preferred for tech management) with minimum 50% marks.",
        typical_duration: "2 Years",
        top_institutes: ["SIBM Pune", "NMIMS Mumbai", "SCMHRD", "IIMs", "SPJIMR"],
        sourceUrl: "https://iimcat.ac.in",
        lastReviewed: "2026-08-15"
      }
    ],
    certifications: [
      {
        id: "bca-cert-1",
        degree_id: "bca",
        cert_name: "Microsoft Certified: Azure Developer Associate (AZ-204)",
        provider: "Microsoft",
        domain: "Cloud Application Development",
        level: "Intermediate",
        prerequisites: ["Proficiency in C#/.NET or Python and Azure fundamentals"],
        official_url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer",
        sourceUrl: "https://learn.microsoft.com",
        lastReviewed: "2026-08-15",
        costBand: "Medium (5k-20k)"
      },
      {
        id: "bca-cert-2",
        degree_id: "bca",
        cert_name: "Oracle Certified Professional: Java SE Developer",
        provider: "Oracle",
        domain: "Enterprise Java Programming",
        level: "Intermediate",
        prerequisites: ["Core Java OOP and exception handling concepts"],
        official_url: "https://education.oracle.com/java-se-developer",
        sourceUrl: "https://education.oracle.com",
        lastReviewed: "2026-08-15",
        costBand: "High (>20k)"
      },
      {
        id: "bca-cert-3",
        degree_id: "bca",
        cert_name: "Full Stack Open Certification",
        provider: "University of Helsinki",
        domain: "Modern Full-Stack Web Development",
        level: "Intermediate",
        prerequisites: ["JavaScript fundamentals"],
        official_url: "https://fullstackopen.com/en",
        sourceUrl: "https://fullstackopen.com",
        lastReviewed: "2026-08-15",
        costBand: "Free"
      }
    ],
    government_exams: [
      {
        id: "bca-govt-1",
        degree_id: "bca",
        exam_or_post_name: "NIC / NIELIT Scientific & Technical Assistant",
        conducting_body: "National Informatics Centre (NIC) / NIELIT",
        eligibility_rule: {
          degreeFamily: "computing",
          allowedDegrees: ["bca", "bsc-cs", "btech-cse", "mca"],
          minMarksPercent: 60,
          ageLimitRule: { general: 30, obc: 33, sc_st: 35 },
          categoryRelaxation: "3 years for OBC, 5 years for SC/ST.",
          notes: "Bachelor in Computer Applications or M.Sc in Computer Applications with first class."
        },
        sourceUrl: "https://www.calicut.nielit.in/nic",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bca-govt-2",
        degree_id: "bca",
        exam_or_post_name: "Staff Selection Commission Combined Graduate Level (SSC CGL)",
        conducting_body: "Staff Selection Commission (SSC)",
        eligibility_rule: {
          degreeFamily: "any",
          allowedDegrees: ["any-recognized-graduate"],
          minMarksPercent: 50,
          ageLimitRule: { general: 30, obc: 33, sc_st: 35 },
          notes: "General graduate entry for Central Secretariat Assistant Section Officer, CBDT Tax Assistant, and Inspector posts."
        },
        sourceUrl: "https://ssc.gov.in",
        lastReviewed: "2026-08-15",
        is_generalist_fallback: true
      }
    ],
    career_switch: [
      {
        id: "bca-switch-1",
        degree_id: "bca",
        target_role: "UI/UX & Frontend Design Specialist",
        pivot_reason: "Bridges frontend HTML/CSS/React coding capability with user empathy, typography, and interactive wireframing.",
        bridge_steps: [
          { step: 1, title: "Figma & Design Systems Mastery", type: "course", detail: "Complete Google UX Design Professional Certificate and master auto-layout in Figma.", estimatedMonths: 2 },
          { step: 2, title: "Design Portfolio Construction", type: "portfolio", detail: "Design and build 3 end-to-end responsive mobile/web applications with live interactive Figma prototypes.", estimatedMonths: 2 },
          { step: 3, title: "Usability Testing & Case Studies", type: "portfolio", detail: "Document user journey maps, A/B testing rationale, and accessibility compliance (WCAG).", estimatedMonths: 1 }
        ],
        typical_duration: "4 to 5 Months",
        recommended_certs: ["Google UX Design Professional Certificate", "Interaction Design Foundation (IxDF) Certification"],
        why_feasible: "BCA graduates understand the underlying CSS and component lifecycle, enabling design of components that are practically implementable by frontend engineers.",
        sourceUrl: "https://www.interaction-design.org",
        lastReviewed: "2026-08-15"
      }
    ],
    entrepreneurship: [
      {
        id: "bca-ent-1",
        degree_id: "bca",
        idea_title: "Custom Web & App Development Agency for Local Businesses",
        description: "Deliver digital transformation, custom billing portals, e-commerce storefronts, and WhatsApp marketing integrations for regional manufacturers and service providers.",
        first_milestones: [
          "Secure 2 pilot clients through local business associations or family networks.",
          "Standardize a boilerplate web stack using Next.js, Tailwind CSS, and Razorpay.",
          "Deliver projects on time with a guaranteed 30-day post-launch support agreement."
        ],
        relevant_schemes: [
          { name: "Pradhan Mantri MUDRA Yojana (Tarun Scheme)", agency: "Ministry of Finance", benefits: "Collateral-free loans up to ₹10 Lakhs for IT services infrastructure and workstation setup.", sourceUrl: "https://www.mudra.org.in" },
          { name: "Stand-Up India Scheme", agency: "SIDBI", benefits: "Bank loans between ₹10 Lakhs and ₹1 Crore for greenfield enterprises.", sourceUrl: "https://www.standupmitra.in" }
        ],
        sourceUrl: "https://www.mudra.org.in",
        lastReviewed: "2026-08-15"
      }
    ],
    roadmap_template: {
      pursuing: {
        degree_id: "bca",
        status: "pursuing",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Programming & Database Fluency (Year 1)",
            timeframe: "Months 1–12",
            tag: "skill-building",
            description: "Solidify core C/C++, Java, and relational database SQL query writing.",
            tasks: [
              "Master Java object-oriented principles and write clean modular code.",
              "Build a functional inventory or student management system linked to MySQL.",
              "Familiarize with Git and push clean code commits regularly."
            ],
            milestone: "Achieve first-class marks in first-year exams and complete 2 portfolio codebases."
          },
          {
            stepNumber: 2,
            title: "Phase 2: Modern Web Stack & Live Projects (Year 2)",
            timeframe: "Months 13–24",
            tag: "internship",
            description: "Learn full-stack web technologies and pursue internships.",
            tasks: [
              "Learn modern web engineering (HTML5, Tailwind, React, Node.js).",
              "Earn a recognized developer credential such as Microsoft Azure Fundamentals (AZ-900).",
              "Participate in collegiate coding events and secure a 2-month summer internship."
            ],
            milestone: "Complete summer internship and deploy a live web app."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Campus Placements & Competitive MCA Prep (Year 3)",
            timeframe: "Months 25–36",
            tag: "application",
            description: "Focus on corporate hiring rounds, aptitude tests, and NIMCET/MCA entrance exams.",
            tasks: [
              "Practice quantitative aptitude, logical reasoning, and technical interview questions.",
              "Prepare entrance applications for premier MCA institutions (NIMCET / State CETs).",
              "Complete capstone industry project and publish documentation."
            ],
            milestone: "Receive campus placement offer or high qualifying rank in MCA entrance."
          }
        ]
      },
      completed: {
        degree_id: "bca",
        status: "completed",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Technical Stack Polish & Portfolio Hosting",
            timeframe: "Months 1–2",
            tag: "skill-building",
            description: "Bring academic projects up to professional enterprise standards.",
            tasks: [
              "Deploy at least 2 full-stack projects on Vercel / Render with live database backends.",
              "Refactor code to follow industry clean code conventions and write API documentation with Swagger.",
              "Earn Azure Developer (AZ-204) or AWS Certified Developer Associate."
            ],
            milestone: "Production portfolio online with verifiable live URLs."
          },
          {
            stepNumber: 2,
            title: "Phase 2: Active Job Applications & Tech Interviews",
            timeframe: "Months 3–4",
            tag: "application",
            description: "Apply systematically to software service providers, GCCs, and product startups.",
            tasks: [
              "Submit 10 targeted job applications weekly across LinkedIn, Naukri, and Instahyre.",
              "Practice coding interview rounds focusing on arrays, strings, and SQL joins.",
              "Seek alumni referrals at IT service giants (Wipro, TCS, Infosys, Cognizant)."
            ],
            milestone: "Secure 2 to 4 technical interview rounds."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Negotiation & Corporate Onboarding",
            timeframe: "Months 5–6",
            tag: "decision",
            description: "Select optimal role and onboard effectively into production engineering.",
            tasks: [
              "Evaluate offers assessing compensation, training programs, and project allocation.",
              "Pre-study enterprise tools (Jira, Confluence, Git workflows, Docker).",
              "Establish 6-month performance targets with your engineering manager."
            ],
            milestone: "Commence Junior Developer / QA role with established promotion milestones."
          }
        ]
      }
    }
  },

  // 3. B.Sc Information Technology (B.Sc IT)
  {
    degree_id: "bsc-it",
    id: "bsc-it",
    familyId: "computing",
    name: "Bachelor of Science in Information Technology",
    shortName: "B.Sc IT",
    aliases: ["BSc IT", "B.Sc. IT", "BSc Information Technology", "B.Sc. Information Technology", "Information Tech degree", "bsc-it"],
    level: "UG",
    discipline: "Computing & IT",
    duration: "3 Years",
    durationYears: 3,
    regulator: "UGC",
    overview: "An applied undergraduate curriculum focused on computing infrastructure, database administration, information security, enterprise networking, and cloud services. It bridges core programming with systems administration and technology infrastructure management for modern enterprise IT ecosystems.",
    key_skills: [
      "Enterprise Network Architecture & Subnetting (Cisco CCNA)",
      "Linux/Windows Server Administration & Shell Scripting",
      "Relational & NoSQL Database Management (MySQL, MongoDB)",
      "Cloud Infrastructure Provisioning (AWS / Azure)",
      "Information Security & Vulnerability Auditing",
      "Full-Stack Web Scripting (Python, JavaScript, PHP)"
    ],
    subjects_taught: [
      "Computer Networks & Protocols",
      "Operating Systems & Server Architecture",
      "Database Systems & Query Optimization",
      "Information Security & Cryptography",
      "Web Technologies & Distributed Computing",
      "Enterprise Cloud Services",
      "IT Project Management & ITIL Framework"
    ],
    typical_employers: ["Cisco Systems", "Accenture", "Infosys", "HCLTech", "Wipro Infrastructure Services", "Banking Tech Hubs", "Telecom Providers (Airtel, Jio)"],
    specializations: [
      { id: "it-networking", name: "Network Engineering & Cloud Security", aliases: ["B.Sc IT Networking"], skillsGained: ["Cisco Routing", "Firewalls", "VPNs", "Packet Analysis"], typicalRoles: ["Network Engineer", "Systems Administrator"] },
      { id: "it-cloud", name: "Cloud Infrastructure & Virtualization", aliases: ["B.Sc IT Cloud"], skillsGained: ["AWS", "VMware", "Terraform", "Docker"], typicalRoles: ["Cloud Operations Associate", "DevOps Trainee"] }
    ],
    sourceUrl: "https://www.ugc.gov.in",
    lastReviewed: "2026-08-15",
    career_paths: [
      {
        id: "bsc-it-car-1",
        degree_id: "bsc-it",
        role_title: "Network Support Engineer / Systems Administrator",
        tier: "entry",
        employer_type: "private",
        career_type: "Direct",
        match_rationale: "Coursework in computer networking, TCP/IP, routing protocols, and Linux administration maps directly into enterprise network monitoring and server provisioning.",
        indicative_salary: { min: 4.0, max: 7.2, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "AmbitionBox IT Infrastructure Report 2025 (indicative)" },
        skills: ["TCP/IP", "Linux CLI", "Active Directory", "Router/Switch Config", "DNS/DHCP"],
        top_employers: ["HCLTech", "Wipro", "NTT Data", "Airtel Enterprise"],
        sourceUrl: "https://www.ambitionbox.com",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-it-car-2",
        degree_id: "bsc-it",
        role_title: "Cloud Operations / Site Reliability Associate",
        tier: "entry",
        employer_type: "private",
        career_type: "Related",
        match_rationale: "Combines OS virtualization, scripting, and enterprise cloud modules learned in B.Sc IT into managing 24/7 cloud uptime and monitoring metrics.",
        indicative_salary: { min: 4.8, max: 8.5, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Glassdoor Cloud Engineer Survey 2025 (indicative)" },
        skills: ["AWS/Azure", "Docker", "Python/Bash Scripting", "Prometheus/Grafana"],
        top_employers: ["Capgemini", "Cognizant", "Mindtree", "Cloud MSPs"],
        sourceUrl: "https://www.glassdoor.co.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-it-car-3",
        degree_id: "bsc-it",
        role_title: "Principal Infrastructure Architect / Head of IT Operations",
        tier: "senior",
        employer_type: "private",
        career_type: "Advanced",
        match_rationale: "Directs global hybrid-cloud infrastructure, SOC cybersecurity operations, disaster recovery protocols, and enterprise ITIL compliance.",
        indicative_salary: { min: 20.0, max: 38.0, unit: "LPA (INR)", region: "Pan-India / Metro", year: 2025, source: "Michael Page IT Infrastructure Report 2025 (indicative)" },
        skills: ["Multi-Cloud Architecture", "Disaster Recovery", "Zero Trust Security", "ITIL Governance", "Enterprise Budgeting"],
        top_employers: ["Multinational Banks", "Global GCCs", "Telecom Giants"],
        sourceUrl: "https://www.michaelpage.co.in",
        lastReviewed: "2026-08-15"
      }
    ],
    higher_studies: [
      {
        id: "bsc-it-hs-1",
        degree_id: "bsc-it",
        program_name: "M.Sc Information Technology / M.Sc Cybersecurity",
        level: "PG",
        entrance_exams: ["CUET-PG", "State University PG CETs"],
        eligibility_rule: "B.Sc IT or B.Sc CS with minimum 50-55% aggregate from a recognized university.",
        typical_duration: "2 Years",
        top_institutes: ["University of Mumbai", "University of Madras", "Calcutta University", "Symbiosis Institute"],
        sourceUrl: "https://pgcuet.samarth.ac.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-it-hs-2",
        degree_id: "bsc-it",
        program_name: "MCA (Master of Computer Applications)",
        level: "PG",
        entrance_exams: ["NIMCET", "MAH-MCA-CET", "TANCET"],
        eligibility_rule: "Recognized Bachelor's degree in B.Sc IT with Mathematics at 10+2 level or graduation level with minimum 50% marks.",
        typical_duration: "2 Years",
        top_institutes: ["NITs", "VJTI Mumbai", "PSG College of Technology", "Anna University"],
        sourceUrl: "https://www.nimcet.in",
        lastReviewed: "2026-08-15"
      }
    ],
    certifications: [
      {
        id: "bsc-it-cert-1",
        degree_id: "bsc-it",
        cert_name: "Cisco Certified Network Associate (CCNA 200-301)",
        provider: "Cisco Systems",
        domain: "Enterprise Network Infrastructure",
        level: "Intermediate",
        prerequisites: ["IP addressing, subnetting, and network device fundamentals"],
        official_url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
        sourceUrl: "https://www.cisco.com",
        lastReviewed: "2026-08-15",
        costBand: "High (>20k)"
      },
      {
        id: "bsc-it-cert-2",
        degree_id: "bsc-it",
        cert_name: "Red Hat Certified System Administrator (RHCSA)",
        provider: "Red Hat",
        domain: "Enterprise Linux Administration",
        level: "Intermediate",
        prerequisites: ["Linux command line and shell scripting"],
        official_url: "https://www.redhat.com/en/services/certification/rhcsa",
        sourceUrl: "https://www.redhat.com",
        lastReviewed: "2026-08-15",
        costBand: "High (>20k)"
      },
      {
        id: "bsc-it-cert-3",
        degree_id: "bsc-it",
        cert_name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
        provider: "Microsoft",
        domain: "Cloud Concepts & Services",
        level: "Beginner",
        prerequisites: ["General IT concepts"],
        official_url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals",
        sourceUrl: "https://learn.microsoft.com",
        lastReviewed: "2026-08-15",
        costBand: "Low (<5k)"
      }
    ],
    government_exams: [
      {
        id: "bsc-it-govt-1",
        degree_id: "bsc-it",
        exam_or_post_name: "Railway Recruitment Board (RRB) Senior Section Engineer / IT",
        conducting_body: "Railway Recruitment Control Board",
        eligibility_rule: {
          degreeFamily: "computing",
          allowedDegrees: ["bsc-it", "bsc-cs", "btech-it", "btech-cse", "bca"],
          minMarksPercent: 55,
          ageLimitRule: { general: 33, obc: 36, sc_st: 38 },
          notes: "Bachelor's degree in Information Technology or Computer Science from recognized university."
        },
        sourceUrl: "https://www.rrbcdg.gov.in",
        lastReviewed: "2026-08-15"
      },
      {
        id: "bsc-it-govt-2",
        degree_id: "bsc-it",
        exam_or_post_name: "Staff Selection Commission Combined Graduate Level (SSC CGL)",
        conducting_body: "Staff Selection Commission (SSC)",
        eligibility_rule: {
          degreeFamily: "any",
          allowedDegrees: ["any-recognized-graduate"],
          minMarksPercent: 50,
          ageLimitRule: { general: 30, obc: 33, sc_st: 35 },
          notes: "Generalist graduate entry for central ministry executive posts."
        },
        sourceUrl: "https://ssc.gov.in",
        lastReviewed: "2026-08-15",
        is_generalist_fallback: true
      }
    ],
    career_switch: [
      {
        id: "bsc-it-switch-1",
        degree_id: "bsc-it",
        target_role: "SOC (Security Operations Center) Cybersecurity Analyst",
        pivot_reason: "Leverages network packet inspection, server logging, and OS hardening competencies learned in B.Sc IT to monitor cyber threat telemetry.",
        bridge_steps: [
          { step: 1, title: "Threat Detection & SIEM Tools", type: "course", detail: "Learn Splunk, Wireshark, and MITRE ATT&CK framework.", estimatedMonths: 2 },
          { step: 2, title: "CompTIA Security+ or CySA+ Certification", type: "cert", detail: "Obtain CompTIA Security+ industry certification.", estimatedMonths: 2 },
          { step: 3, title: "Hands-on Threat Hunting Labs", type: "portfolio", detail: "Complete 20+ defensive blue-team labs on TryHackMe or Let'sDefend.", estimatedMonths: 1 }
        ],
        typical_duration: "4 to 5 Months",
        recommended_certs: ["CompTIA Security+", "Microsoft Certified: Security Operations Analyst (SC-200)"],
        why_feasible: "B.Sc IT graduates already understand subnets, firewall ports, and DNS vulnerabilities, making security log interpretation natural and quick to master.",
        sourceUrl: "https://www.comptia.org",
        lastReviewed: "2026-08-15"
      }
    ],
    entrepreneurship: [
      {
        id: "bsc-it-ent-1",
        degree_id: "bsc-it",
        idea_title: "Managed IT Services & Cybersecurity Auditing Firm (MSP)",
        description: "Provide complete outsourced IT support, firewall configuration, automated cloud backups, and compliance audits for regional healthcare clinics, schools, and legal firms.",
        first_milestones: [
          "Set up remote monitoring and management (RMM) stack and secure first 2 annual maintenance contracts (AMC).",
          "Partner with cloud backup providers (AWS/Wasabi) to offer automated ransomware-resilient data protection.",
          "Achieve ₹50,000 monthly recurring revenue (MRR) from retainers."
        ],
        relevant_schemes: [
          { name: "PMEGP (Prime Minister's Employment Generation Programme)", agency: "Ministry of MSME / KVIC", benefits: "Subsidies ranging from 15% to 35% on project costs up to ₹20 Lakhs for service sector ventures.", sourceUrl: "https://www.kviconline.gov.in" },
          { name: "PM MUDRA Yojana (Kishore Scheme)", agency: "Ministry of Finance", benefits: "Loans from ₹50,000 to ₹5 Lakhs for IT hardware and networking test equipment.", sourceUrl: "https://www.mudra.org.in" }
        ],
        sourceUrl: "https://www.mudra.org.in",
        lastReviewed: "2026-08-15"
      }
    ],
    roadmap_template: {
      pursuing: {
        degree_id: "bsc-it",
        status: "pursuing",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Networking & Linux Fundamentals (Year 1)",
            timeframe: "Months 1–12",
            tag: "skill-building",
            description: "Master TCP/IP networking, Linux terminal commands, and basic Python scripting.",
            tasks: [
              "Set up a home/virtual lab with Packet Tracer and Ubuntu Server.",
              "Learn Bash scripting and automate common administration tasks.",
              "Maintain strong academic GPA (>7.0 CGPA)."
            ],
            milestone: "Configure a complete multi-subnet virtual network topology and pass first-year exams."
          },
          {
            stepNumber: 2,
            title: "Phase 2: Cloud Provisioning & Industry Certification (Year 2)",
            timeframe: "Months 13–24",
            tag: "certification",
            description: "Acquire cloud infrastructure credentials and secure an infrastructure internship.",
            tasks: [
              "Earn CCNA (200-301) or AWS Certified Cloud Practitioner.",
              "Containerize services using Docker and explore Kubernetes basics.",
              "Complete a 2-month summer internship with an ISP, IT MSP, or enterprise datacenter."
            ],
            milestone: "Attain CCNA or Cloud Certification and complete summer internship."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Campus Placements & Enterprise Specialization (Year 3)",
            timeframe: "Months 25–36",
            tag: "application",
            description: "Prepare for campus placements and technical IT infrastructure screening.",
            tasks: [
              "Practice troubleshooting scenarios (DNS outage, packet loss, server CPU throttling).",
              "Participate in placement drives of IT services and telecom enterprises.",
              "Prepare MCA or M.Sc IT applications if targeting postgraduate specialization."
            ],
            milestone: "Accept full-time IT Systems / Network Associate offer."
          }
        ]
      },
      completed: {
        degree_id: "bsc-it",
        status: "completed",
        phases: [
          {
            stepNumber: 1,
            title: "Phase 1: Credentials Review & Lab Documentation",
            timeframe: "Months 1–2",
            tag: "skill-building",
            description: "Certify core network/cloud competencies with recognized vendor credentials.",
            tasks: [
              "Document virtual network lab architectures with network diagrams and GitHub notes.",
              "Attain Cisco CCNA or RHCSA to establish clear technical differentiation.",
              "Review high-frequency IT infrastructure support interview questions."
            ],
            milestone: "Industry credential verified and technical lab portfolio published."
          },
          {
            stepNumber: 2,
            title: "Phase 2: High-Volume Application Pipeline",
            timeframe: "Months 3–4",
            tag: "application",
            description: "Target enterprise infrastructure service desks, datacenter providers, and NOCs.",
            tasks: [
              "Apply to 12 targeted Network / Systems Support openings weekly.",
              "Connect with NOC team leads on LinkedIn for direct team referrals.",
              "Practice mock technical interviews covering router configs and Linux troubleshooting."
            ],
            milestone: "Secure 3 to 5 first-round technical interview calls."
          },
          {
            stepNumber: 3,
            title: "Phase 3: Offer Acceptance & Shift / Rotation Onboarding",
            timeframe: "Months 5–6",
            tag: "decision",
            description: "Finalize employment offer and establish on-the-job progression targets.",
            tasks: [
              "Evaluate compensation, shift allowances, and cloud project exposure.",
              "Familiarize with enterprise ticketing tools (ServiceNow, Jira Service Desk).",
              "Set a 12-month goal to advance to L2 Network / Cloud Engineer."
            ],
            milestone: "Commence Network / Cloud Engineer position with clear L2 advancement plan."
          }
        ]
      }
    }
  }
];
