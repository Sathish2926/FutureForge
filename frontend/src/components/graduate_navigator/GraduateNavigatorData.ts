export interface JobOutcome {
  role: string;
  salaryRange: string;
  description: string;
  topEmployers: string[];
  keySkills: string[];
  fitReason: string;
}

export interface HigherEdOutcome {
  degree: string;
  specialization: string;
  entranceExams: string[];
  admissionNotes: string;
  duration: string;
}

export interface CertificationOutcome {
  name: string;
  provider: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  relevance: string;
  estimatedTime: string;
  linkNote: string;
}

export interface EntrepreneurshipOutcome {
  title: string;
  description: string;
  platformOrEcosystem: string;
  initialSteps: string[];
}

export interface GovtExamOutcome {
  examName: string;
  conductingBody: string;
  targetPosts: string;
  eligibilityNote: string;
  prepStrategy: string;
}

export interface CareerSwitchOutcome {
  targetField: string;
  pivotReason: string;
  bridgeCourses: string[];
  transitionTime: string;
}

export interface SkillRung {
  technical: string[];
  soft: string[];
  courses: string[];
}

export interface DegreeCluster {
  id: string;
  name: string;
  shortTitle: string;
  iconType: "code" | "cpu" | "briefcase" | "book" | "palette" | "flask" | "compass" | "pill" | "wrench";
  overview: string;
  typicalDuration: string;
  jobs: JobOutcome[];
  higherEducation: HigherEdOutcome[];
  certifications: CertificationOutcome[];
  entrepreneurship: EntrepreneurshipOutcome[];
  govtExams: GovtExamOutcome[];
  careerSwitch: CareerSwitchOutcome[];
  skillLadder: {
    foundation: SkillRung;
    intermediate: SkillRung;
    advanced: SkillRung;
  };
  roadmaps: {
    pursuing: {
      phase1: { title: string; timeframe: string; tasks: string[]; milestone: string };
      phase2: { title: string; timeframe: string; tasks: string[]; milestone: string };
      phase3: { title: string; timeframe: string; tasks: string[]; milestone: string };
    };
    completed: {
      phase1: { title: string; timeframe: string; tasks: string[]; milestone: string };
      phase2: { title: string; timeframe: string; tasks: string[]; milestone: string };
      phase3: { title: string; timeframe: string; tasks: string[]; milestone: string };
    };
  };
  metrics: {
    avgPlacementRate: string;
    medianStartingSalary: string;
    avgTimeToOutcome: string;
    highDemandSectors: string[];
  };
}

export const DEGREE_CLUSTERS: DegreeCluster[] = [
  {
    id: "bsc_cs_bca",
    name: "B.Sc. Computer Science / BCA / IT",
    shortTitle: "B.Sc CS / BCA",
    iconType: "code",
    overview: "Foundational computing, software systems, algorithmic thinking, and modern programming stacks with diverse direct tech entry points.",
    typicalDuration: "3 to 4 years (FYUP / NEP)",
    jobs: [
      {
        role: "Software Developer / Engineer",
        salaryRange: "₹4.5L – ₹12L PA ($55K–$75K US)",
        description: "Designs, writes, tests, and maintains application code across full-stack, frontend, or backend services.",
        topEmployers: ["Tech Product Companies", "SaaS Startups", "IT Services (TCS, Infosys, Wipro)", "Fintech Firms"],
        keySkills: ["Java / Python / JS", "Data Structures & Algorithms", "SQL & Relational DBs", "Git & CI/CD"],
        fitReason: "Direct match with core CS coursework in programming, algorithms, and database management."
      },
      {
        role: "Data Analyst / Associate Data Scientist",
        salaryRange: "₹5L – ₹14L PA ($60K–$85K US)",
        description: "Transforms raw business and application telemetry into predictive analytics, KPI dashboards, and statistical models.",
        topEmployers: ["Analytics Consultancies", "E-commerce Giants", "Banking & NBFCs", "Healthcare Tech"],
        keySkills: ["Python (Pandas, NumPy)", "SQL Query Tuning", "Tableau / PowerBI", "Applied Statistics"],
        fitReason: "Strong mathematical foundation in discrete math and database systems translates seamlessly into data analytics."
      },
      {
        role: "Cloud / DevOps Associate Engineer",
        salaryRange: "₹5.5L – ₹13L PA ($65K–$90K US)",
        description: "Automates deployment pipelines, provisions infrastructure as code, and manages cloud reliability and security.",
        topEmployers: ["Cloud Providers", "Enterprises with AWS/Azure Footprint", "Managed Service Providers"],
        keySkills: ["Linux CLI", "AWS / Azure Fundamentals", "Docker Containers", "Bash Scripting"],
        fitReason: "Builds upon OS and computer networking principles learned during undergraduate study."
      },
      {
        role: "QA Automation & Test Engineer",
        salaryRange: "₹4L – ₹8.5L PA",
        description: "Builds automated end-to-end testing frameworks, API performance tests, and regression verification suites.",
        topEmployers: ["Software Delivery Centers", "Consumer Tech Apps", "E-Governance Portals"],
        keySkills: ["Selenium / Playwright", "Java / Python", "Postman / RestAssured", "Test Lifecycle"],
        fitReason: "Ideal launchpad for CS graduates with keen analytical attention to edge-cases and quality standards."
      }
    ],
    higherEducation: [
      {
        degree: "M.Sc Computer Science / M.Sc AI & Data Science",
        specialization: "Advanced Machine Learning, Distributed Systems, Cryptography",
        entranceExams: ["CUET-PG", "JAM (for select IITs)", "State University CETs"],
        admissionNotes: "Requires B.Sc CS/IT or BCA with minimum 55% aggregate.",
        duration: "2 years (4 semesters)"
      },
      {
        degree: "MCA (Master of Computer Applications)",
        specialization: "Enterprise Software Engineering & Cloud Architectures",
        entranceExams: ["NIMCET (for NITs)", "MAH-MCA-CET", "TANCET", "State CETs"],
        admissionNotes: "Mathematics at 10+2 level or undergraduate level is mandatory for premier NIT admissions.",
        duration: "2 years"
      },
      {
        degree: "MBA in Technology / Information Systems Management",
        specialization: "Product Management, IT Consulting, FinTech Strategy",
        entranceExams: ["CAT", "XAT", "GMAT", "SNAP"],
        admissionNotes: "Blends technical computing background with business leadership and product strategy.",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect – Associate",
        provider: "Amazon Web Services",
        level: "Intermediate",
        relevance: "Industry standard for cloud architecture and infrastructure engineering.",
        estimatedTime: "2–3 months",
        linkNote: "aws.amazon.com/certification"
      },
      {
        name: "Meta Front-End / Back-End Developer Professional Certificate",
        provider: "Coursera / Meta",
        level: "Beginner",
        relevance: "Comprehensive practical portfolio builder covering React, APIs, and databases.",
        estimatedTime: "3–4 months",
        linkNote: "coursera.org/professional-certificates/meta"
      },
      {
        name: "CompTIA Security+ / CEH",
        provider: "CompTIA / EC-Council",
        level: "Intermediate",
        relevance: "Foundational credential for entering cybersecurity analyst and SOC roles.",
        estimatedTime: "2 months",
        linkNote: "comptia.org/certifications/security"
      }
    ],
    entrepreneurship: [
      {
        title: "B2B SaaS / Micro-SaaS Product Studio",
        description: "Build lightweight software tools solving niche workflow bottlenecks for SMBs and creator economies.",
        platformOrEcosystem: "IndieHackers, ProductHunt, AWS Activate, Stripe Atlas",
        initialSteps: ["Validate customer pain-point via LinkedIn outreach", "Build MVP with Next.js & Supabase", "Launch on ProductHunt"]
      },
      {
        title: "Freelance Technical Development Agency",
        description: "Offer full-stack web and mobile application delivery for overseas clients and regional businesses.",
        platformOrEcosystem: "Upwork, Toptal, GitHub Sponsors, Twitter/X Tech Showcase",
        initialSteps: ["Curate 3 production-grade open-source GitHub projects", "Register agency profile on Upwork", "Deliver fixed-scope MVP sprints"]
      }
    ],
    govtExams: [
      {
        examName: "IBPS / SBI IT Specialist Officer (Scale I)",
        conductingBody: "Institute of Banking Personnel Selection / State Bank of India",
        targetPosts: "Assistant Manager (IT & Systems)",
        eligibilityNote: "B.Sc CS / BCA / B.Tech eligible in most nationalized bank notifications.",
        prepStrategy: "Focus on Computer Science domain (OS, Networking, DBMS) plus Quantitative Aptitude and English."
      },
      {
        examName: "SSC CGL / Scientific Assistant (IMD)",
        conductingBody: "Staff Selection Commission",
        targetPosts: "Scientific Assistant (Meteorology / Computing)",
        eligibilityNote: "Bachelor's degree with Computer Science or Physics as a subject.",
        prepStrategy: "Tier 1 general aptitude + Tier 2 specialized domain paper."
      }
    ],
    careerSwitch: [
      {
        targetField: "Product Management (Tech PM)",
        pivotReason: "Combines technical architectural fluency with user experience intuition and business goals.",
        bridgeCourses: ["Agile Scrum Master certification", "Reforge / Coursera Product Management Specialization"],
        transitionTime: "3 to 6 months"
      },
      {
        targetField: "UI/UX & Design Engineering",
        pivotReason: "Bridges frontend React/Vue development with Figma user research and accessibility design.",
        bridgeCourses: ["Google UX Design Certificate", "Figma Design Systems masterclasses"],
        transitionTime: "2 to 4 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Core Programming (Java/Python/C++)", "Data Structures & Algorithms", "HTML/CSS & Modern JS", "Git Basics"],
        soft: ["Structured Problem Solving", "Clear Technical Written Notes", "Curiosity & Debugging Mindset"],
        courses: ["CS50 (Harvard / edX)", "Coursera Algorithmic Toolbox", "The Odin Project"]
      },
      intermediate: {
        technical: ["Relational Databases & SQL", "Backend Framework (Node/Spring/Django)", "REST & GraphQL APIs", "Docker Basics"],
        soft: ["Team Code Reviews", "Agile Standups", "Active Listening & Feedback"],
        courses: ["Meta Full-Stack Professional Certificate", "FreeCodeCamp Back-End Certification"]
      },
      advanced: {
        technical: ["Cloud Deployments (AWS/GCP)", "Microservices Architecture", "CI/CD Pipelines", "System Design Fundamentals"],
        soft: ["Technical Leadership", "Stakeholder Communication", "Mentoring Junior Peers"],
        courses: ["Grokking the System Design Interview", "AWS Certified Solutions Architect Associate Track"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Undergrad Foundation & Tech Stack Mastery (Year 2–3)",
          timeframe: "Semester 3–6 (6–12 months)",
          tasks: ["Maintain strong academic scores (> 7.5 CGPA)", "Master one modern stack (MERN or Java/Spring)", "Build 2 showcase repos on GitHub"],
          milestone: "Compete in 1–2 national college hackathons & launch personal developer portfolio."
        },
        phase2: {
          title: "Summer Internship & Open Source Contributions (Final Year Entry)",
          timeframe: "Semester 6–7 (3–6 months)",
          tasks: ["Apply to 15+ software developer summer internships", "Practice 100+ LeetCode problems (Arrays, Trees, Graphs)", "Earn AWS Cloud Practitioner certification"],
          milestone: "Complete an 8-week industry internship or recognized open-source program (GSoC/LFX)."
        },
        phase3: {
          title: "Campus Placements & Off-Campus Job Pipeline",
          timeframe: "Semester 7–8 (Final 6 months)",
          tasks: ["Participate in campus placement drives", "Network with tech alumni on LinkedIn", "Polish resume with quantifiable project impact metrics"],
          milestone: "Receive full-time software developer offer prior to degree graduation."
        }
      },
      completed: {
        phase1: {
          title: "Portfolio Audit & Core Skill Gap Bridging",
          timeframe: "Month 1–2",
          tasks: ["Audit GitHub and deploy live demo URLs for top 3 projects", "Refactor codebase to follow clean architecture & unit tests", "Target 1 core industry certification (AWS or Java Developer)"],
          milestone: "Production-ready portfolio live with verifiable project metrics."
        },
        phase2: {
          title: "High-Volume Targeted Applications & Mock Interviews",
          timeframe: "Month 2–4",
          tasks: ["Send 8–10 tailored outreach emails weekly with personalized GitHub links", "Conduct peer mock coding interviews on Pramp / Interviewing.io", "Attend regional developer meetups (GDG, React India)"],
          milestone: "Secure 3–5 initial screening calls and technical round interviews."
        },
        phase3: {
          title: "Offer Negotiation & Onboarding Ramp-Up",
          timeframe: "Month 4–6",
          tasks: ["Evaluate compensation packages and career growth trajectory", "Complete company tech stack pre-reading", "Set 90-day onboarding milestones"],
          milestone: "Commence Junior Software Engineer role with clear 1-year progression goals."
        }
      }
    },
    metrics: {
      avgPlacementRate: "82% within 6 months",
      medianStartingSalary: "₹5.2 LPA (Domestic) / $68K (International)",
      avgTimeToOutcome: "3.5 months post-completion",
      highDemandSectors: ["SaaS & Cloud Platforms", "FinTech & Payments", "HealthTech", "E-Commerce"]
    }
  },
  {
    id: "btech_engg",
    name: "B.Tech / B.E. (Engineering - Core & Tech Branches)",
    shortTitle: "B.Tech Engineering",
    iconType: "cpu",
    overview: "Rigorous 4-year technical problem-solving foundation spanning Mechanical, Electrical, Civil, ECE, Chemical, and Computer Engineering disciplines.",
    typicalDuration: "4 years (8 semesters)",
    jobs: [
      {
        role: "R&D / Core Design Engineer",
        salaryRange: "₹5L – ₹14L PA ($65K–$95K US)",
        description: "Applies physical and mathematical principles to design industrial components, circuitry, automotive drivetrains, or structural systems.",
        topEmployers: ["Tata Motors", "L&T", "Bosch", "ISRO / DRDO", "Schneider Electric", "Intel / Qualcomm"],
        keySkills: ["AutoCAD / SolidWorks / MATLAB", "Finite Element Analysis (FEA)", "Embedded Systems", "Thermodynamics / Circuitry"],
        fitReason: "Direct realization of core engineering labs, capstone design projects, and specialized branch curricula."
      },
      {
        role: "Software & Technology Consultant",
        salaryRange: "₹6.5L – ₹18L PA ($75K–$115K US)",
        description: "Designs large-scale technology solutions, enterprise migrations, and algorithmic platforms for Fortune 500 clients.",
        topEmployers: ["Accenture Technology", "Deloitte Tech", "Google / Microsoft", "Amazon AWS"],
        keySkills: ["System Design", "Cloud Infrastructure", "Programming (C++/Java/Python)", "Enterprise Architecture"],
        fitReason: "Engineering problem solving and analytical rigor are universally prized by global technology firms."
      },
      {
        role: "Project Engineer / Operations Manager",
        salaryRange: "₹4.8L – ₹11L PA",
        description: "Coordinates on-site EPC execution, supply chain optimization, vendor management, and industrial safety compliance.",
        topEmployers: ["L&T Construction", "Adani Group", "Siemens", "Reliance Industries"],
        keySkills: ["Project Management (Primavera/MS Project)", "Quality Assurance", "Cost Estimation", "Safety Standards"],
        fitReason: "Combines technical drawings comprehension with industrial engineering project execution."
      }
    ],
    higherEducation: [
      {
        degree: "M.Tech / M.E. (Master of Technology)",
        specialization: "VLSI Design, Robotics & Automation, Thermal Engg, Structural Engg, AI",
        entranceExams: ["GATE (Graduate Aptitude Test in Engineering)"],
        admissionNotes: "High GATE percentile unlocks subsidized M.Tech seats with monthly MHRD stipends (₹12,400/month) at IITs/NITs.",
        duration: "2 years"
      },
      {
        degree: "MS (Master of Science) Abroad (US, Germany, UK)",
        specialization: "Automotive Systems, Mechatronics, Data Engineering, Material Science",
        entranceExams: ["GRE", "TOEFL / IELTS"],
        admissionNotes: "German public universities offer tuition-free master's programs for engineering graduates with strong academic credentials.",
        duration: "1.5 to 2 years"
      },
      {
        degree: "MBA (General / Operations / Tech Management)",
        specialization: "Operations, Supply Chain, Strategic Consulting",
        entranceExams: ["CAT", "GMAT", "XAT"],
        admissionNotes: "Engineers constitute a high proportion of students at top IIMs and global business schools.",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "PMP (Project Management Professional) / CAPM",
        provider: "Project Management Institute (PMI)",
        level: "Intermediate",
        relevance: "Global benchmark for leading capital and technology engineering projects.",
        estimatedTime: "3 months",
        linkNote: "pmi.org/certifications/capm"
      },
      {
        name: "Six Sigma Green Belt",
        provider: "ASQ / IASSC",
        level: "Intermediate",
        relevance: "Demonstrates process optimization, DMAIC methodology, and defect elimination.",
        estimatedTime: "1–2 months",
        linkNote: "asq.org/cert/six-sigma-green-belt"
      },
      {
        name: "Autodesk Certified Professional (AutoCAD / Revit / Inventor)",
        provider: "Autodesk",
        level: "Intermediate",
        relevance: "Industry standard for civil, mechanical, and architectural CAD design verification.",
        estimatedTime: "2 months",
        linkNote: "autodesk.com/certification"
      }
    ],
    entrepreneurship: [
      {
        title: "Hardware / DeepTech Startup",
        description: "Develop IoT devices, renewable energy kits, drone payload solutions, or industrial sensors.",
        platformOrEcosystem: "DST NIDHI-TBI incubators, IIT Innovation Parks, BIRAC, Y Combinator",
        initialSteps: ["Build functional laboratory prototype", "Apply for government patent grant & seed funding", "Engage pilot industrial beta tester"]
      }
    ],
    govtExams: [
      {
        examName: "Engineering Services Examination (ESE / IES)",
        conductingBody: "Union Public Service Commission (UPSC)",
        targetPosts: "Class 1 Gazetted Officer (Indian Railway Services, CPWD, Military Engineer Services)",
        eligibilityNote: "B.Tech/B.E. degree in Civil, Mechanical, Electrical, or Electronics & Telecommunication.",
        prepStrategy: "1–2 years dedicated preparation on core engineering syllabus + GS and engineering ethics."
      },
      {
        examName: "PSU Recruitment through GATE",
        conductingBody: "IOCL, ONGC, NTPC, BHEL, PowerGrid, GAIL",
        targetPosts: "Executive Trainee / Assistant Engineer",
        eligibilityNote: "Valid top GATE score + personal interview.",
        prepStrategy: "Focus on in-depth numerical accuracy across 10 core subjects."
      }
    ],
    careerSwitch: [
      {
        targetField: "Investment Banking & Quantitative Finance",
        pivotReason: "Deep mathematical modeling and algorithmic programming skills translate directly into quant finance.",
        bridgeCourses: ["CFA Level 1", "Financial Engineering (Columbia / Coursera)"],
        transitionTime: "6 to 9 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Engineering Mathematics & Calculus", "Engineering Drawing / CAD", "C / Python Basics", "Lab Measurement Tools"],
        soft: ["Scientific Inquiry", "Engineering Documentation", "Persistence"],
        courses: ["NPTEL Engineering Foundation Courses", "MIT OpenCourseWare Calculus"]
      },
      intermediate: {
        technical: ["Domain CAD/Simulation (FEA/CFD/SPICE)", "Microcontrollers & Embedded C", "Statistical Process Control"],
        soft: ["Cross-Discipline Collaboration", "Safety Protocol Compliance"],
        courses: ["Coursera Simulation Tools", "MATLAB Onramp & Simulink"]
      },
      advanced: {
        technical: ["System Architecture Integration", "Failure Mode Effects Analysis (FMEA)", "Regulatory Standards (ISO/ASME/IEEE)"],
        soft: ["Team Engineering Leadership", "Client Risk Communication"],
        courses: ["Six Sigma Green Belt Prep", "CAPM PMI Course"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Core Engineering Fundamentals & CAD Labs (Year 2)",
          timeframe: "Semester 3–4",
          tasks: ["Excel in core branch theoretical courses", "Master primary industry modeling software (AutoCAD/MATLAB/SolidWorks)", "Join college SAE/IEEE/Robotics clubs"],
          milestone: "Complete first hardware/software mini-project and participate in departmental symposium."
        },
        phase2: {
          title: "Industrial Training & Minor Specialization (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Undergo mandatory 4–6 week industrial implant training", "Initiate GATE or GRE prep depending on academic vs industry goal", "Enroll in elective tracks (IoT, AI, or EV Tech)"],
          milestone: "Produce industrial internship training report and lock capstone project proposal."
        },
        phase3: {
          title: "Final Year Capstone, Placements & Competitive Exams",
          timeframe: "Semester 7–8",
          tasks: ["Deliver working prototype of capstone major project", "Appear for on-campus core & tech placement interviews", "Attempt GATE / ESE exams"],
          milestone: "Publish research paper or file provisional patent & secure campus placement offer."
        }
      },
      completed: {
        phase1: {
          title: "Core Competency Consolidation & Portfolio Framing",
          timeframe: "Month 1–2",
          tasks: ["Document capstone project in a sleek visual engineering dossier", "Earn Green Belt or certified CAD associate badge", "Draft tailored resumes for core vs software tracks"],
          milestone: "Engineering project portfolio hosted with CAD renderings, calculation sheets, and demo videos."
        },
        phase2: {
          title: "Strategic Industry Targeting & Technical Interviews",
          timeframe: "Month 2–4",
          tasks: ["Target Tier-1 & Tier-2 manufacturing/tech hubs (Pune, Bangalore, Chennai, Gurgaon)", "Connect with alumni working at target EPC/R&D corporations", "Practice technical whiteboard problem-solving"],
          milestone: "Attend 3–4 technical assessment rounds."
        },
        phase3: {
          title: "Professional Onboarding & Continuing Engineering Education",
          timeframe: "Month 4–6",
          tasks: ["Begin graduate engineer training (GET) program", "Familiarize with company quality and safety SOPs", "Map out 3-year professional engineering licensure (PE) milestones"],
          milestone: "Successful confirmation from GET to full Assistant Engineer designation."
        }
      }
    },
    metrics: {
      avgPlacementRate: "78% across branches",
      medianStartingSalary: "₹6.0 LPA (Domestic Core/Tech) / ₹11 LPA (Top Tech)",
      avgTimeToOutcome: "3 months post-completion",
      highDemandSectors: ["Automotive & EV", "Semiconductors & VLSI", "EPC Infrastructure", "Renewable Energy"]
    }
  },
  {
    id: "bba_bcom",
    name: "BBA / B.Com (Business, Accounting, Finance & Management)",
    shortTitle: "BBA / B.Com",
    iconType: "briefcase",
    overview: "Commercial acumen, corporate finance, financial accounting, marketing dynamics, business analytics, and organizational strategy.",
    typicalDuration: "3 to 4 years (FYUP)",
    jobs: [
      {
        role: "Financial Analyst / Equity Research Associate",
        salaryRange: "₹4.5L – ₹11L PA ($60K–$85K US)",
        description: "Analyzes financial statements, builds DCF valuation models, tracks capital markets, and prepares investor decks.",
        topEmployers: ["Big 4 (Deloitte, PwC, EY, KPMG)", "Investment Banks (J.P. Morgan, Morgan Stanley)", "Fintech Platforms", "Credit Rating Agencies"],
        keySkills: ["Financial Modeling (Excel)", "Balance Sheet & P&L Analysis", "Valuation Principles", "PowerPoint Storytelling"],
        fitReason: "Direct application of accounting, business finance, and corporate taxation principles."
      },
      {
        role: "Business Analyst / Management Associate",
        salaryRange: "₹4.5L – ₹9.5L PA",
        description: "Bridges business operations with technology teams; gathers requirements, optimizes operational funnels, and maps workflows.",
        topEmployers: ["Management Consultancies", "E-Commerce Startups", "Retail Giants", "IT Consulting"],
        keySkills: ["SQL Basics", "Business Process Modeling", "Agile / Scrum", "Data Visualization (Tableau/Excel)"],
        fitReason: "BBA management case studies and commercial acumen equip students to solve cross-functional bottlenecks."
      },
      {
        role: "Corporate Accountant / Tax Consultant",
        salaryRange: "₹3.8L – ₹7.5L PA",
        description: "Manages statutory compliance, GST returns, ledger reconciliation, audit coordination, and corporate filings.",
        topEmployers: ["CA Firms", "Corporate Finance Departments", "MNC Shared Services"],
        keySkills: ["Tally Prime / SAP FICO", "GST & TDS Compliance", "Statutory Audit", "IFRS / Ind AS Basics"],
        fitReason: "Foundation laid in financial accounting and auditing courses throughout B.Com."
      },
      {
        role: "Digital Marketing & Growth Associate",
        salaryRange: "₹4L – ₹8.5L PA",
        description: "Executes performance marketing campaigns, SEO, customer retention funnels, and social engagement strategies.",
        topEmployers: ["Digital Agencies", "Direct-to-Consumer (D2C) Brands", "Tech Startups"],
        keySkills: ["Google Ads / Analytics", "Meta Business Suite", "SEO Audits", "Content Copywriting"],
        fitReason: "Natural career pathway for marketing-focused BBA graduates with creative and analytical drive."
      }
    ],
    higherEducation: [
      {
        degree: "MBA (Master of Business Administration) / PGDM",
        specialization: "Finance, Marketing, Business Analytics, Human Resources, Strategy",
        entranceExams: ["CAT", "XAT", "GMAT", "NMAT", "SNAP"],
        admissionNotes: "Premier route for substantial salary uplift; IIMs, XLRI, ISB, and global top B-schools.",
        duration: "2 years"
      },
      {
        degree: "M.Com (Master of Commerce)",
        specialization: "Advanced Accounting, International Business, Banking",
        entranceExams: ["CUET-PG", "State University Merit"],
        admissionNotes: "Ideal for aspiring academic professors, researchers, or state civil services preparation.",
        duration: "2 years"
      },
      {
        degree: "Chartered Accountancy (CA) / CS / CMA",
        specialization: "Auditing, Corporate Law, Cost & Management Accounting",
        entranceExams: ["ICAI Direct Entry Scheme (after graduation with >55% marks)"],
        admissionNotes: "Exempts graduates from Foundation examination, permitting direct entry into Intermediate articleship.",
        duration: "3 years"
      }
    ],
    certifications: [
      {
        name: "CFA (Chartered Financial Analyst) Level I",
        provider: "CFA Institute (USA)",
        level: "Advanced",
        relevance: "Gold standard globally for asset management, portfolio advisory, and investment banking.",
        estimatedTime: "6 months",
        linkNote: "cfainstitute.org/programs/cfa"
      },
      {
        name: "CPA (Certified Public Accountant) / ACCA",
        provider: "AICPA / ACCA Global",
        level: "Advanced",
        relevance: "Highest international credential in financial accounting and statutory audit.",
        estimatedTime: "12–18 months",
        linkNote: "accaglobal.com"
      },
      {
        name: "Advanced Financial Modeling & Valuation",
        provider: "CFI (Corporate Finance Institute) / Wall Street Prep",
        level: "Intermediate",
        relevance: "Essential practical skill to pass investment banking and equity research technical rounds.",
        estimatedTime: "2 months",
        linkNote: "corporatefinanceinstitute.com"
      }
    ],
    entrepreneurship: [
      {
        title: "E-Commerce D2C Brand / Specialized Retail",
        description: "Identify high-margin consumer products, source directly from manufacturers, and sell via Shopify and Amazon.",
        platformOrEcosystem: "Shopify, Amazon Seller Central, Shiprocket, Meta Ad Manager",
        initialSteps: ["Conduct product margin & competition analysis", "Secure sample supplier inventory", "Run targeted test ad campaigns"]
      },
      {
        title: "Financial Advisory & GST Consultancy",
        description: "Provide accounting, taxation, payroll, and business setup compliance for regional small enterprises.",
        platformOrEcosystem: "Tally, ClearTax, GSTN Portal, Zoho Books Partner",
        initialSteps: ["Acquire GST practitioner / tax return preparer credentials", "Onboard initial 5 local business clients", "Establish recurring retainer model"]
      }
    ],
    govtExams: [
      {
        examName: "RBI Grade B Officer Examination",
        conductingBody: "Reserve Bank of India",
        targetPosts: "Manager (Grade B) – Central Banking",
        eligibilityNote: "Minimum 60% marks in Bachelor's degree.",
        prepStrategy: "Phase 1 Aptitude + Phase 2 Economic & Social Issues (ESI), Finance & Management (FM)."
      },
      {
        examName: "IBPS Probationary Officer (PO) & SBI PO",
        conductingBody: "IBPS / SBI",
        targetPosts: "Probationary Officer (Scale I) across 11 nationalized banks",
        eligibilityNote: "Any graduate degree from a recognized university.",
        prepStrategy: "Rigorous timed practice on Quantitative Aptitude, Data Interpretation, Reasoning, and Banking Awareness."
      }
    ],
    careerSwitch: [
      {
        targetField: "FinTech & Financial Data Science",
        pivotReason: "Commerce graduates with Python/SQL skills bridge business intuition and automated algorithmic banking.",
        bridgeCourses: ["Google Data Analytics Professional Certificate", "Python for Financial Analysis (Coursera)"],
        transitionTime: "4 to 6 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Accounting Principles (Debits/Credits)", "Advanced MS Excel (VLOOKUP, Pivot, INDEX/MATCH)", "Business Economics"],
        soft: ["Business Etiquette", "Written Financial Summaries", "Attention to Numerical Detail"],
        courses: ["Khan Academy Finance", "Excel Skills for Business (Macquarie / Coursera)"]
      },
      intermediate: {
        technical: ["Financial Statement Analysis", "Three-Statement Financial Modeling", "Corporate Tax & GST Basics", "PowerPoint Storyboarding"],
        soft: ["Executive Presentation Skills", "Commercial Negotiation", "Time Management"],
        courses: ["Corporate Finance Institute (CFI) Courses", "Tally Prime Certification"]
      },
      advanced: {
        technical: ["DCF & LBO Valuation", "Regulatory Compliance & Risk Mitigation", "SQL & PowerBI for Business Analytics"],
        soft: ["Strategic Client Advising", "Team Management", "High-Stakes Stakeholder Alignment"],
        courses: ["CFA Level I Curriculum", "Wall Street Prep Financial Modeling"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Accounting Mastery & Professional Excel Fluency (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Build bulletproof grasp of accounting statements and taxation", "Attain Advanced Excel and financial shortcut speed", "Lead college commerce club / finance fest activities"],
          milestone: "Achieve top quartile GPA and build a dynamic DCF model of a listed public company."
        },
        phase2: {
          title: "Corporate Internship & Professional Credential Prep (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Secure an 8-week internship at a CA firm, bank, or corporate finance wing", "Begin CFA Level 1 or CAT prep depending on immediate career trajectory", "Learn PowerBI or SQL for data-driven business reporting"],
          milestone: "Complete corporate internship with tangible financial audit/analysis deliverables."
        },
        phase3: {
          title: "Campus Placements & Final Year Strategy",
          timeframe: "Semester 7–8",
          tasks: ["Participate in Big 4 and corporate finance campus recruitment drives", "Crack aptitude and case interview preparation", "Appear for competitive exams or finalize master's applications"],
          milestone: "Secure placement offer as Financial Analyst or Management Trainee."
        }
      },
      completed: {
        phase1: {
          title: "Technical Resume Transformation & Case Practice",
          timeframe: "Month 1–2",
          tasks: ["Transform resume into clean bullet points with financial impact metrics", "Build a public financial model portfolio on Google Drive/LinkedIn", "Enroll in specialized financial modeling or digital marketing track"],
          milestone: "Portfolio of 2 equity valuation reports and clean professional resume ready."
        },
        phase2: {
          title: "Targeted Outreach to Big 4, B-Schools & Corporate Finance Hubs",
          timeframe: "Month 2–4",
          tasks: ["Conduct informational interviews with alumni working in financial services", "Apply to 20+ analyst and associate trainee listings weekly", "Practice financial modeling test tasks under timed constraints"],
          milestone: "Clear 2–3 financial modeling technical assessments and partner interview rounds."
        },
        phase3: {
          title: "Corporate Entry & Professional Exam Progression",
          timeframe: "Month 4–6",
          tasks: ["Commence Analyst role in corporate finance or advisory team", "Register for CFA Level 1 or relevant certification exams with company tuition aid", "Set 18-month career review goals"],
          milestone: "Established as high-performing Analyst with clear progression towards Senior Associate."
        }
      }
    },
    metrics: {
      avgPlacementRate: "76% within 6 months",
      medianStartingSalary: "₹4.8 LPA (Analyst) / ₹12+ LPA (Top MBA/CFA)",
      avgTimeToOutcome: "3.2 months post-completion",
      highDemandSectors: ["Corporate Banking", "Big 4 Consulting & Audit", "Fintech & Payments", "E-Commerce Analytics"]
    }
  },
  {
    id: "ba_arts",
    name: "BA (Arts, Literature, Humanities, Journalism & Social Sciences)",
    shortTitle: "BA Arts & Humanities",
    iconType: "book",
    overview: "Critical reasoning, historical context, advanced qualitative communication, socio-political analysis, creative writing, and public media.",
    typicalDuration: "3 to 4 years (FYUP)",
    jobs: [
      {
        role: "Content Strategist & Editorial Specialist",
        salaryRange: "₹4L – ₹8.5L PA ($50K–$70K US)",
        description: "Creates long-form essays, corporate thought-leadership whitepapers, technical documentation, and brand narratives.",
        topEmployers: ["Media Houses", "Publishing Companies", "B2B SaaS Content Teams", "Public Relations Agencies"],
        keySkills: ["Long-Form Writing", "SEO Keyword Strategy", "Editing & Proofreading", "Audience Research"],
        fitReason: "Direct conversion of critical text analysis, essay formulation, and narrative eloquence from literature and humanities."
      },
      {
        role: "Public Policy & NGO Research Associate",
        salaryRange: "₹4.2L – ₹9L PA",
        description: "Conducts qualitative field research, synthesizes legislative bills, writes policy briefs, and evaluates social development schemes.",
        topEmployers: ["Think Tanks (CPR, ORF, Brookings India)", "NGOs (Pratham, Teach For India)", "United Nations / UNDP", "Consultancies"],
        keySkills: ["Qualitative Research", "Policy Brief Synthesis", "Data Interpretation", "Stakeholder Interviews"],
        fitReason: "Political science, sociology, and economics degrees excel at contextual governance evaluation."
      },
      {
        role: "Corporate Communications & PR Executive",
        salaryRange: "₹4L – ₹8.5L PA",
        description: "Manages corporate reputation, drafts press releases, coordinates media interviews, and crafts executive internal communications.",
        topEmployers: ["PR Agencies (Edelman, MSL, Genesis BCW)", "MNC Corporate Affairs", "Healthcare & Tech Brands"],
        keySkills: ["Media Relations", "Crisis Communication", "Press Release Drafting", "Brand Storytelling"],
        fitReason: "Humanities graduates possess sophisticated interpersonal empathy and narrative nuance."
      }
    ],
    higherEducation: [
      {
        degree: "MA (Master of Arts) in English / Economics / Psychology / Sociology",
        specialization: "Academic Research, Literary Criticism, Behavioral Economics",
        entranceExams: ["CUET-PG (for JNU, DU, BHU, HC)", "University Direct CETs"],
        admissionNotes: "Essential stepping-stone towards UGC-NET qualification and university professorship.",
        duration: "2 years"
      },
      {
        degree: "LLB (Bachelor of Legislative Law - 3-Year Post-Grad Program)",
        specialization: "Corporate Law, Constitutional Law, Intellectual Property",
        entranceExams: ["DU LLB / NLSAT (NLSIU Bengaluru 3-Year LLB)", "MH CET Law"],
        admissionNotes: "Premier route for arts graduates wishing to transition into legal advocacy and corporate legal counsel.",
        duration: "3 years"
      },
      {
        degree: "Master's in Journalism & Mass Communication (MJMC)",
        specialization: "Broadcast Journalism, Investigative Reporting, Digital Media Production",
        entranceExams: ["IIMC Entrance Exam", "ACJ Entrance", "SIMC MA MC"],
        admissionNotes: "Hands-on journalism training with leading broadcast news studios and digital publications.",
        duration: "1 to 2 years"
      }
    ],
    certifications: [
      {
        name: "Content Marketing & Inbound Certification",
        provider: "HubSpot Academy",
        level: "Beginner",
        relevance: "Demonstrates practical B2B and consumer content marketing conversion methodology.",
        estimatedTime: "1 month",
        linkNote: "academy.hubspot.com"
      },
      {
        name: "TEFL / TESOL Certification (120 Hours)",
        provider: "TEFL Academy / Cambridge",
        level: "Intermediate",
        relevance: "Qualifies graduates to teach English overseas and across international IB schools.",
        estimatedTime: "2–3 months",
        linkNote: "cambridgeenglish.org"
      }
    ],
    entrepreneurship: [
      {
        title: "Digital Publishing / Substack Newsletter Studio",
        description: "Build an audience around niche cultural, policy, or business commentary, monetizing via subscriptions and sponsorships.",
        platformOrEcosystem: "Substack, Ghost, Medium, Beehiiv, Twitter/X",
        initialSteps: ["Publish 10 weekly analytical essays", "Grow targeted subscriber base to 1,000 readers", "Launch paid tier and sponsorships"]
      }
    ],
    govtExams: [
      {
        examName: "UPSC Civil Services Examination (IAS / IPS / IFS)",
        conductingBody: "Union Public Service Commission",
        targetPosts: "Indian Administrative Service, Foreign Service, Police Service",
        eligibilityNote: "Any graduate degree; humanities subjects (History, Pol Sci, Sociology, Geography) dominate optional papers.",
        prepStrategy: "1–2 years systematic coverage of NCERTs, standard reference texts, answer-writing practice, and current affairs analysis."
      },
      {
        examName: "State Public Service Commission (State PCS)",
        conductingBody: "State Governments (e.g. UPPSC, MPSC, TNPSC)",
        targetPosts: "Deputy Collector, DSP, Commercial Tax Officer",
        eligibilityNote: "Graduates with regional language fluency.",
        prepStrategy: "Strong state history, culture, and administrative law knowledge."
      }
    ],
    careerSwitch: [
      {
        targetField: "Human Resources (HR) & People Operations",
        pivotReason: "High emotional intelligence, psychology insight, and communication skills translate into talent acquisition and retention.",
        bridgeCourses: ["SHRM-CP / HR Management Specialization on Coursera"],
        transitionTime: "3 to 5 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Expository Essay Writing", "Textual Analysis", "Library & Secondary Research", "Grammar & Syntax Mastery"],
        soft: ["Empathetic Listening", "Critical Reading", "Intellectual Curiosity"],
        courses: ["Coursera Writing in the Sciences / Effective Writing", "Harvard Justice Course (Michael Sandel)"]
      },
      intermediate: {
        technical: ["SEO Content Writing", "Qualitative Survey Design", "CMS Systems (WordPress/Notion)", "Basic Data Presentation"],
        soft: ["Persuasive Argumentation", "Public Speaking", "Adaptability"],
        courses: ["HubSpot Content Marketing", "Google SEO Fundamentals"]
      },
      advanced: {
        technical: ["Policy Impact Assessment", "Media Relations Strategy", "Editorial Management & Publishing Workflows"],
        soft: ["Cross-Cultural Diplomacy", "Ethical Leadership", "Conflict Resolution"],
        courses: ["UGC NET Prep Materials", "Advanced Strategic Communications (Coursera)"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Writing Portfolio & Scholarly Foundations (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Read deeply across interdisciplinary humanities literature", "Write regularly for college journal or student newspaper", "Maintain top grades in major subjects"],
          milestone: "Publish 5 articles/essays in recognized student or public platforms (e.g. Youth Ki Awaaz, Medium)."
        },
        phase2: {
          title: "Editorial / Policy Internship & Language Skills (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Undertake 2-month summer internship with a publishing house, NGO, or media bureau", "Begin UPSC or Law Entrance (NLSAT) prep if targeting civil service or legal career", "Acquire HubSpot or SEO certifications"],
          milestone: "Complete formal internship and assemble a curated writing clipping portfolio."
        },
        phase3: {
          title: "Senior Thesis, Placements & Postgraduate Entrance",
          timeframe: "Semester 7–8",
          tasks: ["Complete senior undergraduate research dissertation", "Appear for CUET-PG or law entrance exams", "Apply to corporate communications and media graduate roles"],
          milestone: "Receive admission to top Master's program or secure offer at leading media/policy organization."
        }
      },
      completed: {
        phase1: {
          title: "Writing Portfolio Curation & Target Role Mapping",
          timeframe: "Month 1–2",
          tasks: ["Assemble 5 best writing samples into a sleek online portfolio (Contently/Notion)", "Highlight demonstrated research, editing, and qualitative synthesis skills", "Draft tailored cover letters showcasing narrative command"],
          milestone: "Published personal digital portfolio with direct links to live articles."
        },
        phase2: {
          title: "Direct Agency & Corporate Outreach",
          timeframe: "Month 2–4",
          tasks: ["Reach out to Managing Editors and Content Leads on LinkedIn", "Pitch 3 custom story or content briefs to target publications", "Participate in editorial test assignments"],
          milestone: "Complete 2–3 editorial trial tasks and secure initial client/employer interviews."
        },
        phase3: {
          title: "Full-Time Placement & Thought Leadership",
          timeframe: "Month 4–6",
          tasks: ["Onboard as Content Specialist, Policy Associate, or PR Executive", "Establish personal newsletter or regular industry LinkedIn commentary", "Plan 2-year trajectory towards senior editorial or Master's degree abroad"],
          milestone: "Firmly established in professional creative/policy role with recognized bylines."
        }
      }
    },
    metrics: {
      avgPlacementRate: "71% within 6 months",
      medianStartingSalary: "₹4.2 LPA (Content/PR) / ₹8+ LPA (Policy Consultancies)",
      avgTimeToOutcome: "3.8 months post-completion",
      highDemandSectors: ["Digital Media & Publishing", "Public Policy & Development", "Corporate Communications", "EdTech"]
    }
  },
  {
    id: "bdes_design",
    name: "B.Des (Design - UX/UI, Graphic, Product, Fashion & Animation)",
    shortTitle: "B.Des Design",
    iconType: "palette",
    overview: "Human-centered design, interactive prototyping, visual communication, ergonomics, user research, and digital product experience.",
    typicalDuration: "4 years (8 semesters)",
    jobs: [
      {
        role: "UI/UX Product Designer",
        salaryRange: "₹6L – ₹16L PA ($70K–$105K US)",
        description: "Designs wireframes, design systems, user journeys, interactive Figma prototypes, and usability testing suites.",
        topEmployers: ["Tech Unicorns (Swiggy, Zomato, CRED)", "Product SaaS", "Design Studios", "FinTech Apps"],
        keySkills: ["Figma Design Systems", "User Research & Usability Testing", "Wireframing & Prototyping", "Interaction Design"],
        fitReason: "Direct specialization of design thinking, user empathy, and interactive tool proficiency."
      },
      {
        role: "Brand & Visual Communication Designer",
        salaryRange: "₹4.5L – ₹10L PA",
        description: "Crafts comprehensive brand identities, typography guidelines, vector illustrations, marketing collateral, and packaging.",
        topEmployers: ["Creative Agencies (Ogilvy, DDB)", "Direct-to-Consumer Brands", "Tech Companies"],
        keySkills: ["Adobe Illustrator & Photoshop", "Typography & Color Theory", "Brand Identity Systems", "Packaging Design"],
        fitReason: "Core visual composition and typography coursework honed throughout B.Des foundation."
      },
      {
        role: "Motion Graphics & 3D Visualizer",
        salaryRange: "₹5L – ₹12L PA",
        description: "Creates kinetic typography, explainer animations, 3D asset renders, and visual effects for games and digital ads.",
        topEmployers: ["Gaming Studios", "Animation Houses", "Ad Agencies", "OTT Streaming Platforms"],
        keySkills: ["After Effects", "Cinema 4D / Blender", "Storyboarding", "Kinetic Typography"],
        fitReason: "Synthesizes narrative pacing with visual timing and 3D space comprehension."
      }
    ],
    higherEducation: [
      {
        degree: "M.Des (Master of Design)",
        specialization: "Interaction Design, Industrial Product Design, Transportation Design",
        entranceExams: ["CEED (conducted by IIT Bombay)", "NID DAT M.Des"],
        admissionNotes: "Prestigious admission into IDC IIT Bombay, NID Ahmedabad, and IISc Bengaluru with MHRD monthly stipend.",
        duration: "2 years"
      },
      {
        degree: "MA / MS in Human-Computer Interaction (HCI) Abroad",
        specialization: "Cognitive Ergonomics, Augmented Reality Design, AI UX",
        entranceExams: ["Portfolio Review", "GRE (Optional)", "IELTS/TOEFL"],
        admissionNotes: "Highly sought after by international tech giants (CMU, Georgia Tech, TU Delft, Umeå).",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "Nielsen Norman Group (NN/g) UX Certification",
        provider: "Nielsen Norman Group",
        level: "Advanced",
        relevance: "Highest international credibility in user research methodologies and usability evaluation.",
        estimatedTime: "2 months",
        linkNote: "nngroup.com"
      },
      {
        name: "Google UX Design Professional Certificate",
        provider: "Coursera / Google",
        level: "Beginner",
        relevance: "Validates 3 complete portfolio case-studies from paper wireframes to high-fidelity Figma apps.",
        estimatedTime: "3 months",
        linkNote: "coursera.org/professional-certificates/google-ux-design"
      }
    ],
    entrepreneurship: [
      {
        title: "Independent UI/UX Design & Branding Consultancy",
        description: "Deliver high-touch brand design, landing page optimization, and mobile app design systems for early-stage funded startups.",
        platformOrEcosystem: "Dribbble Pro, Behance, Contra, Twitter/X Design Community",
        initialSteps: ["Publish 3 deep-dive case studies on Behance", "Post visual redesign concepts on X/Twitter", "Close first 2 client sprints on retainer"]
      }
    ],
    govtExams: [
      {
        examName: "Govt Design Specialist & E-Governance Visualizer",
        conductingBody: "Ministry of Electronics & IT (MeitY), National Informatics Centre (NIC)",
        targetPosts: "Lead UX Designer for Digital India Initiatives",
        eligibilityNote: "Degree in Design / Fine Arts with portfolio verification.",
        prepStrategy: "Portfolio evaluation focused on public accessibility (WCAG 2.1) and Indian language localization."
      }
    ],
    careerSwitch: [
      {
        targetField: "Product Management (Design-Led PM)",
        pivotReason: "Deep user empathy and interaction workflows make designers natural leaders for consumer product experiences.",
        bridgeCourses: ["Product School Certification", "Data-Driven Product Analytics"],
        transitionTime: "4 to 6 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Drawing & Visual Composition", "Color Theory & Grid Systems", "Adobe Suite Fundamentals", "Basic Figma Wireframing"],
        soft: ["Aesthetic Sensitivity", "Constructive Critique Reception", "Empathy with Non-Tech Users"],
        courses: ["CalArts Graphic Design Specialization", "Figma 101 Basics"]
      },
      intermediate: {
        technical: ["Design Systems Creation", "User Research & Usability Testing", "Interactive Micro-Animations", "Responsive Web Layouts"],
        soft: ["Design Rationale Articulation", "Cross-Functional Collaboration with Engineers"],
        courses: ["Google UX Design Track", "Refactoring UI by Adam Wathan"]
      },
      advanced: {
        technical: ["Information Architecture for Complex Enterprise Platforms", "Accessibility & WCAG Compliance", "Motion Design Systems"],
        soft: ["Executive Design Storytelling", "Strategic Business Impact Measurement"],
        courses: ["NN/g Specialized Masterclasses", "Advanced Figma Tokens & Variables"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Foundation Skills & Design Explorations (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Master typography, grids, color theory, and sketching", "Develop speed in Figma, Illustrator, and Photoshop", "Take part in regional design hackathons and 24-hour design jams"],
          milestone: "Build and publish first 2 visual exploration projects on Behance / Dribbble."
        },
        phase2: {
          title: "Industry UX Internship & Case-Study Documentation (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Apply for summer UI/UX product design internships", "Document full case studies detailing the problem statement, user research, wireframes, and iteration", "Learn basics of HTML/CSS to communicate with developers"],
          milestone: "Complete 10-week summer internship at a product tech firm or design studio."
        },
        phase3: {
          title: "Graduation Project & Design Portfolio Polish",
          timeframe: "Semester 7–8",
          tasks: ["Execute 6-month industry sponsored graduation project (GP)", "Prepare live portfolio website (Framer/Webflow) with 3 polished end-to-end case studies", "Present at annual degree design show"],
          milestone: "Secure full-time Product Designer offer and earn praise at degree showcase."
        }
      },
      completed: {
        phase1: {
          title: "Portfolio Optimization & Case Study Storytelling",
          timeframe: "Month 1–2",
          tasks: ["Reformat case studies to focus on business impact and user problem metrics", "Publish personal portfolio on custom domain using Framer", "Record 2-minute Loom walkthroughs explaining top design decisions"],
          milestone: "Live responsive design portfolio with 3 comprehensive case studies."
        },
        phase2: {
          title: "Active Job Applications & Design Challenge Rounds",
          timeframe: "Month 2–4",
          tasks: ["Apply to tech startups, agencies, and global product teams", "Tackle 48-hour take-home design challenges with structured frameworks", "Engage actively with design leaders on Twitter and LinkedIn"],
          milestone: "Successfully pass whiteboarding interview rounds and app critique sessions."
        },
        phase3: {
          title: "Onboarding as Product Designer & Design System Contribution",
          timeframe: "Month 4–6",
          tasks: ["Join product squad and audit existing component libraries", "Run first usability test on live production features", "Establish yourself as key bridge between product managers and frontend engineers"],
          milestone: "Ship first major feature update to production with positive user satisfaction metrics."
        }
      }
    },
    metrics: {
      avgPlacementRate: "85% within 6 months",
      medianStartingSalary: "₹6.5 LPA (Junior Product Designer) / ₹14+ LPA (Top Tech)",
      avgTimeToOutcome: "2.8 months post-completion",
      highDemandSectors: ["B2B & B2C SaaS", "Fintech & WealthTech", "E-Commerce", "HealthTech"]
    }
  },
  {
    id: "bsc_lifesci",
    name: "B.Sc Life Sciences (Biology, Chemistry, Biotechnology & Biochemistry)",
    shortTitle: "B.Sc Life Sciences",
    iconType: "flask",
    overview: "Cellular biology, biochemistry, chemical synthesis, microbiological assays, recombinant DNA techniques, and clinical diagnostic standards.",
    typicalDuration: "3 to 4 years (FYUP)",
    jobs: [
      {
        role: "Quality Control (QC) & QA Analyst",
        salaryRange: "₹3.8L – ₹7.5L PA",
        description: "Conducts chemical testing, chromatographic assays (HPLC/GC), stability testing, and compliance documentation under FDA/GMP standards.",
        topEmployers: ["Sun Pharma", "Dr. Reddy's", "Biocon", "Cipla", "Lupin"],
        keySkills: ["HPLC & Chromatography", "Good Laboratory Practice (GLP)", "Spectrophotometry", "SOP Documentation"],
        fitReason: "Direct application of wet laboratory techniques and chemical analysis mastered in undergraduate labs."
      },
      {
        role: "Biotechnology Research & Lab Associate",
        salaryRange: "₹4L – ₹8.5L PA",
        description: "Assists senior scientists in cell culture maintenance, PCR assays, protein purification, and genomics sample prep.",
        topEmployers: ["Syngene International", "Reliance Life Sciences", "CSIR Labs", "ICMR Research Centers"],
        keySkills: ["PCR & Gel Electrophoresis", "Aseptic Cell Culture", "Buffer Preparation", "Lab Instrumentation"],
        fitReason: "Brings strong foundations in molecular genetics and biochemical protocols."
      },
      {
        role: "Clinical Data Coordinator / Regulatory Associate",
        salaryRange: "₹4.2L – ₹8L PA",
        description: "Manages clinical trial documentation, patient electronic data capture (EDC), and regulatory safety submissions.",
        topEmployers: ["IQVIA", "Parexel", "Icon Clinical", "Novartis Healthcare"],
        keySkills: ["GCP (Good Clinical Practice)", "Clinical Trial Protocols", "MedDRA Coding", "Pharmacovigilance Basics"],
        fitReason: "Life science terminology combined with methodical attention to biological safety."
      }
    ],
    higherEducation: [
      {
        degree: "M.Sc in Biotechnology / Molecular Biology / Biochemistry / Chemistry",
        specialization: "Genetic Engineering, Immunology, Structural Biology, Synthetic Chemistry",
        entranceExams: ["GAT-B (DBT Sponsored with ₹12,000/mo stipend)", "IIT JAM", "CUET-PG"],
        admissionNotes: "Clearing GAT-B provides full tuition fellowship and monthly government stipend across top universities.",
        duration: "2 years"
      },
      {
        degree: "MBA in Pharmaceutical & Healthcare Management",
        specialization: "Pharma Marketing, Health Economics, Hospital Administration",
        entranceExams: ["CAT", "NMAT (Pharma MBA)", "CMAT"],
        admissionNotes: "Combines scientific comprehension with high-paying healthcare marketing and commercial operations.",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "ICH-GCP (Good Clinical Practice) Certification",
        provider: "NIDA Clinical Trials Network / Coursera",
        level: "Beginner",
        relevance: "Mandatory qualification for entering clinical research coordinator (CRC) and CRA roles.",
        estimatedTime: "1 month",
        linkNote: "ich.org"
      },
      {
        name: "Python for Bioinformatics & Computational Biology",
        provider: "Coursera / UC San Diego",
        level: "Intermediate",
        relevance: "Crucial bridge for transitioning from wet lab to high-paying computational genomics and drug discovery.",
        estimatedTime: "2–3 months",
        linkNote: "coursera.org"
      }
    ],
    entrepreneurship: [
      {
        title: "Specialized Agritech / Organic Diagnostic Lab",
        description: "Offer soil microbial testing, water purity certification, and organic farming bio-fertilizer consulting.",
        platformOrEcosystem: "BIRAC BIG Grants, Startup India, NABARD Agritech Schemes",
        initialSteps: ["Set up basic analytical wet lab apparatus", "Acquire regional NABL accreditation", "Partner with local organic farming cooperatives"]
      }
    ],
    govtExams: [
      {
        examName: "Food Safety Officer (FSSAI) / State Food Inspector",
        conductingBody: "FSSAI / State PSCs",
        targetPosts: "Food Safety Officer (FSO)",
        eligibilityNote: "Degree in Food Technology, Biotechnology, Chemistry, or Biochemistry.",
        prepStrategy: "Focus on Food Safety Act, food preservation standards, microbiological contamination, and general aptitude."
      }
    ],
    careerSwitch: [
      {
        targetField: "Bioinformatics & Health Data Analytics",
        pivotReason: "Huge demand for professionals who understand biological gene expression data and can write Python/R pipelines.",
        bridgeCourses: ["Bioinformatics Specialization on Coursera", "R Programming for Genomics"],
        transitionTime: "4 to 6 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Microscopy & Staining", "Solution Molarity & Buffer Prep", "Aseptic Pipetting", "Basic Lab Safety (MSDS)"],
        soft: ["Methodical Documentation", "Observation Accuracy", "Patience with Long Experiments"],
        courses: ["Basic Wet Lab Chemistry (MIT OCW)", "NCBI Gene Tools Tutorials"]
      },
      intermediate: {
        technical: ["PCR & Gel Documentation", "HPLC Operation & Chromatography", "GLP / GMP Standards", "Bio-statistics Basics"],
        soft: ["Protocol Troubleshooting", "Data Integrity Reporting"],
        courses: ["ICH-GCP Clinical Modules", "Chromatography Principles on edX"]
      },
      advanced: {
        technical: ["Next-Generation Sequencing (NGS) Data Analysis", "Bioprocess Fermentation Scaling", "Regulatory Dossier Drafting (FDA/EMA)"],
        soft: ["Scientific Cross-Functional Review", "Bioethics Adherence"],
        courses: ["Bioinformatics with Python", "Regulatory Affairs in Life Sciences"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Wet Lab Technique Mastery & Theory Excellence (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Excel in organic chemistry, cell biology, and biochemistry lab practicals", "Maintain high GPA to stay competitive for government research scholarships", "Learn basic Python for scientific computation"],
          milestone: "Achieve distinction in analytical practicals and master sterile microbial protocols."
        },
        phase2: {
          title: "Summer Research Fellowship & Certification (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Apply for prestigious summer research fellowships (IASc-INSA-NASI, CSIR, TIFR VSRP)", "Complete 8-week research project under university scientist", "Earn ICH-GCP clinical trials certificate"],
          milestone: "Produce validated summer research report and present poster at scientific symposium."
        },
        phase3: {
          title: "Competitive Entrance Exams & Pharma Campus Drives",
          timeframe: "Semester 7–8",
          tasks: ["Appear for GAT-B, IIT-JAM, and CUET-PG exams for funded Master's programs", "Interview with pharma QC/QA campus recruiters", "Finalize undergraduate research project"],
          milestone: "Secure GAT-B qualification with monthly stipend or receive pharma QA analyst offer."
        }
      },
      completed: {
        phase1: {
          title: "Instrument Certification & GLP Documentation Audit",
          timeframe: "Month 1–2",
          tasks: ["Highlight practical familiarity with HPLC, UV-Vis, PCR, and titrations on resume", "Complete online course in Good Laboratory Practice (GLP) and Pharmacovigilance", "Target regional pharma manufacturing clusters (Hyderabad, Baddi, Vapi, Bangalore)"],
          milestone: "Standardized laboratory-ready scientific resume targeting 3 distinct roles."
        },
        phase2: {
          title: "Direct Pharma & CRO Walk-In / Application Drives",
          timeframe: "Month 2–4",
          tasks: ["Attend pharma walk-in interviews across major formulation and API manufacturing plants", "Apply to clinical research organizations (CROs) for Clinical Data Coordinator positions", "Review pharmacopoeia standards (IP/USP/BP)"],
          milestone: "Pass laboratory practical interview test and clear HR rounds."
        },
        phase3: {
          title: "Industrial QA/QC Onboarding & Career Growth",
          timeframe: "Month 4–6",
          tasks: ["Undergo GMP compliance training on-site", "Master laboratory information management system (LIMS)", "Plan 3-year trajectory towards Executive Quality Control or sponsored Master's"],
          milestone: "Fully certified as independent analytical testing chemist."
        }
      }
    },
    metrics: {
      avgPlacementRate: "73% within 6 months",
      medianStartingSalary: "₹4.0 LPA (Domestic Lab) / ₹7.5 LPA (Clinical Research CROs)",
      avgTimeToOutcome: "3.6 months post-completion",
      highDemandSectors: ["Pharmaceutical Formulations", "Clinical Research (CROs)", "Diagnostics & Pathology", "Bioprocessing"]
    }
  },
  {
    id: "barch",
    name: "B.Arch (Architecture & Urban Planning)",
    shortTitle: "B.Arch Architecture",
    iconType: "compass",
    overview: "Spatial design, structural engineering fundamentals, architectural history, building bylaws, urban planning, BIM software, and sustainable built environments.",
    typicalDuration: "5 years (10 semesters)",
    jobs: [
      {
        role: "Architectural Designer / Project Architect",
        salaryRange: "₹4.5L – ₹10L PA ($60K–$85K US)",
        description: "Produces architectural working drawings, municipal sanction drawings, 3D BIM visualizations, and site coordination reports.",
        topEmployers: ["Architectural Consultancies (Hafeez Contractor, Morphogenesis)", "Real Estate Developers", "Urban Planning Firms"],
        keySkills: ["AutoCAD / Revit (BIM)", "Rhino + Grasshopper", "Building Bylaws & NBC", "Client Presentations"],
        fitReason: "Direct execution of 5-year studio design thesis and construction technology courses."
      },
      {
        role: "BIM Specialist & Computational Designer",
        salaryRange: "₹5.5L – ₹12L PA",
        description: "Coordinates multi-disciplinary clash detection between architectural, structural, and MEP engineering models.",
        topEmployers: ["International Engineering Consultancies (Arup, Atkins, WSP)", "Large Construction EPCs"],
        keySkills: ["Autodesk Revit Architecture & MEP", "Navisworks Clash Detection", "Parametric Modeling", "Dynamo Scripting"],
        fitReason: "Architecture graduates with strong computational design tools possess high global export value."
      }
    ],
    higherEducation: [
      {
        degree: "M.Arch (Master of Architecture) / M.Plan (Urban & Regional Planning)",
        specialization: "Urban Design, Sustainable Architecture, Landscape Architecture, Housing",
        entranceExams: ["GATE (Architecture & Planning Paper)", "CEPT Entrance Exam"],
        admissionNotes: "Top rankers enter CEPT Ahmedabad and SPA Delhi with monthly GATE stipend.",
        duration: "2 years"
      },
      {
        degree: "Master's in Construction Project Management (NICMAR / Global)",
        specialization: "Real Estate Development, Mega-Infrastructure Contracting",
        entranceExams: ["NCAT (NICMAR)", "CAT", "GMAT"],
        admissionNotes: "Combines technical blueprint mastery with corporate real estate commercial development.",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "Autodesk Certified Professional: Revit for Architectural Design",
        provider: "Autodesk",
        level: "Advanced",
        relevance: "Essential globally for hiring in corporate architectural and BIM engineering firms.",
        estimatedTime: "2 months",
        linkNote: "autodesk.com/certification"
      },
      {
        name: "LEED Green Associate / IGBC AP",
        provider: "US Green Building Council (USGBC) / IGBC",
        level: "Intermediate",
        relevance: "Validates proficiency in sustainable design, energy modeling, and green building rating systems.",
        estimatedTime: "2 months",
        linkNote: "usgbc.org/credentials"
      }
    ],
    entrepreneurship: [
      {
        title: "Independent Architectural Studio & Interior Practice",
        description: "Register with Council of Architecture (COA) to independently take residential, retail, and commercial design projects.",
        platformOrEcosystem: "Council of Architecture (COA) Registration, ArchDaily, Houzz, Instagram Showcase",
        initialSteps: ["Secure COA permanent license number", "Complete first 2 residential renovation commissions", "Establish vendor network with civil contractors and carpenters"]
      }
    ],
    govtExams: [
      {
        examName: "Assistant Town Planner / Municipal Architect",
        conductingBody: "State Public Service Commissions / DDA / CIDCO",
        targetPosts: "Assistant Architect (Class 1 / Class 2 Gazetted)",
        eligibilityNote: "B.Arch with valid Council of Architecture registration.",
        prepStrategy: "Urban development acts, National Building Code (NBC), zoning bylaws, and town planning principles."
      }
    ],
    careerSwitch: [
      {
        targetField: "Virtual World & Metaverse 3D Spatial Designer",
        pivotReason: "Spatial sense, scale, and lighting in architecture apply directly to 3D gaming environments and XR simulation.",
        bridgeCourses: ["Unreal Engine for Architectural Visualization", "Blender 3D Environment Design"],
        transitionTime: "3 to 5 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Hand Drafting & Model Making", "AutoCAD 2D Drafting", "SketchUp 3D", "History of Architecture"],
        soft: ["Visual Spatialization", "Patience in Studio Juries", "Perseverance"],
        courses: ["Architectural Sketching Fundamentals", "AutoCAD Comprehensive Guide"]
      },
      intermediate: {
        technical: ["Revit BIM Modeling", "Working Drawings & Detailing", "Building Services (HVAC/Plumbing/Fire)", "Photoshop Post-Production"],
        soft: ["Client Requirement Translation", "Site Contractor Coordination"],
        courses: ["Autodesk Revit Architecture Track", "Lumion / Enscape Rendering"]
      },
      advanced: {
        technical: ["Parametric Design (Grasshopper/Dynamo)", "Multi-Disciplinary Clash Detection (Navisworks)", "LEED Green Building Standards"],
        soft: ["Studio Design Leadership", "Commercial Budget Negotiation"],
        courses: ["LEED Green Associate Prep", "Advanced Computational Architecture"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Studio Design Foundations & Software Fluency (Year 1–3)",
          timeframe: "Semester 1–6",
          tasks: ["Excel in Design Studio briefs from residences to institutional campuses", "Master digital tools (AutoCAD, Revit, Photoshop, Rhino)", "Maintain design portfolio documenting design intent and construction details"],
          milestone: "Win or get shortlisted in national NASA (National Association of Students of Architecture) design competition."
        },
        phase2: {
          title: "Mandatory Practical Training Internship (Year 4)",
          timeframe: "Semester 7–8 (Full semester or year)",
          tasks: ["Complete mandatory 6-month architectural internship under a COA registered firm", "Gain on-site construction supervision and municipal sanction drawing experience", "Learn project billing and contractor liaison"],
          milestone: "Obtain formal practical training completion certificate and recommendation letter."
        },
        phase3: {
          title: "Final Year Thesis, COA Registration & Portfolio Polish",
          timeframe: "Semester 9–10",
          tasks: ["Defend comprehensive Architectural Design Thesis before external jury", "Prepare polished digital and print architectural portfolio", "Apply for Council of Architecture (COA) registration immediately upon results"],
          milestone: "Successfully graduate, earn COA license number, and receive junior architect offer."
        }
      },
      completed: {
        phase1: {
          title: "Portfolio Curation & Professional Licensure",
          timeframe: "Month 1–2",
          tasks: ["Verify COA license number registration", "Publish PDF and web portfolio with thesis, working drawings, and physical models", "Target leading boutique studios vs large corporate BIM consultancies"],
          milestone: "Licensed Architect credentials ready with verified digital portfolio."
        },
        phase2: {
          title: "Studio Interviews & Design Trials",
          timeframe: "Month 2–4",
          tasks: ["Attend in-person studio jury interviews with physical portfolio", "Complete timed drafting and detailing test assignments", "Network with alumni running independent regional practices"],
          milestone: "Receive multiple architectural associate job offers."
        },
        phase3: {
          title: "On-Site Management & Project Lead Track",
          timeframe: "Month 4–6",
          tasks: ["Lead project packages from concept to working drawing releases", "Attend weekly structural and MEP coordination meetings", "Plan 3-year timeline towards Principal Architect or Master's in Urban Design"],
          milestone: "First residential or commercial project broken ground under your direct drafting supervision."
        }
      }
    },
    metrics: {
      avgPlacementRate: "80% within 6 months",
      medianStartingSalary: "₹4.8 LPA (Studio) / ₹8+ LPA (International BIM Consultancies)",
      avgTimeToOutcome: "3.2 months post-completion",
      highDemandSectors: ["BIM & Computational Architecture", "Sustainable Green Construction", "Luxury Residential Interiors", "Urban Infrastructure"]
    }
  },
  {
    id: "bpharm",
    name: "B.Pharm (Pharmacy & Pharmaceutical Sciences)",
    shortTitle: "B.Pharm Pharmacy",
    iconType: "pill",
    overview: "Pharmacology, medicinal chemistry, pharmaceutics, drug formulation, regulatory affairs, clinical trials, and retail/hospital pharmacy dispensing.",
    typicalDuration: "4 years (8 semesters)",
    jobs: [
      {
        role: "Production & Formulation Chemist",
        salaryRange: "₹3.8L – ₹7.5L PA",
        description: "Oversees large-scale tablet compression, sterile injectables manufacturing, bioprocessing, and compliance with Good Manufacturing Practices (GMP).",
        topEmployers: ["Sun Pharma", "Cipla", "Dr. Reddy's Laboratories", "Abbott Healthcare", "Mankind Pharma"],
        keySkills: ["cGMP Guidelines", "Industrial Formulation Equipment", "Sterile Processing", "Batch Manufacturing Records (BMR)"],
        fitReason: "Direct culmination of industrial pharmacy and pharmaceutics lab training."
      },
      {
        role: "Drug Regulatory Affairs (DRA) Associate",
        salaryRange: "₹4.5L – ₹9L PA",
        description: "Compiles Common Technical Documents (CTD/eCTD) for drug marketing approvals across US FDA, EMA, and CDSCO.",
        topEmployers: ["MNC Pharmaceutical Hubs", "Regulatory Consultancies", "Biotech Innovators"],
        keySkills: ["CTD / eCTD Dossier Preparation", "FDA 21 CFR Regulations", "Pharmacovigilance (PV)", "Regulatory Submissions"],
        fitReason: "Pharmacy graduates possess the exact pharmacological understanding and regulatory terminology required by global authorities."
      },
      {
        role: "Medical Information & Clinical Research Associate",
        salaryRange: "₹4.2L – ₹8.5L PA",
        description: "Monitors human clinical trials, tracks adverse drug reactions (ADR), coordinates with hospitals, and ensures ethical GCP adherence.",
        topEmployers: ["IQVIA", "TCS Life Sciences", "Novartis Healthcare", "Syneos Health"],
        keySkills: ["Pharmacovigilance (Argus Safety)", "GCP Guidelines", "Clinical Trial Protocol", "Medical Writing"],
        fitReason: "Pharmacology and toxicology depth gives pharmacy graduates an edge in clinical safety monitoring."
      }
    ],
    higherEducation: [
      {
        degree: "M.Pharm (Master of Pharmacy)",
        specialization: "Pharmacology, Pharmaceutics, Pharmaceutical Analysis, Regulatory Affairs",
        entranceExams: ["GPAT (Graduate Pharmacy Aptitude Test with ₹12,400/mo stipend)", "NIPER JEE"],
        admissionNotes: "NIPER institutes are the apex pharmacy institutions of national importance in India, offering high corporate campus placement rates.",
        duration: "2 years"
      },
      {
        degree: "Pharm.D (Post-Baccalaureate)",
        specialization: "Clinical Pharmacy, Hospital Patient Care, Pharmacotherapy",
        entranceExams: ["State Pharmacy Entrance / Merit"],
        admissionNotes: "3-year clinical residency program qualifying pharmacists for doctor of pharmacy designation.",
        duration: "3 years"
      },
      {
        degree: "MBA in Pharmaceutical Management",
        specialization: "Pharma Brand Management, Healthcare Supply Chain, International Trade",
        entranceExams: ["CAT", "NMAT", "CMAT"],
        admissionNotes: "Fast-tracks entry into product management and commercial executive leadership at top pharma MNCs.",
        duration: "2 years"
      }
    ],
    certifications: [
      {
        name: "Certified Pharmacovigilance Professional (CPVP)",
        provider: "BioPharma Institute / Coursera",
        level: "Intermediate",
        relevance: "Accelerates entry into high-paying corporate pharmacovigilance and drug safety associate positions.",
        estimatedTime: "2 months",
        linkNote: "biopharmainstitute.com"
      },
      {
        name: "ICH Regulatory Guidelines & eCTD Masterclass",
        provider: "Regulatory Affairs Professionals Society (RAPS)",
        level: "Intermediate",
        relevance: "Industry-standard credential for entry into international pharmaceutical dossier management.",
        estimatedTime: "2 months",
        linkNote: "raps.org"
      }
    ],
    entrepreneurship: [
      {
        title: "Retail & Community Pharmacy Chain / Wholesale Distribution",
        description: "Utilize state pharmacy council registration to open high-margin licensed retail pharmacies or surgical distribution agencies.",
        platformOrEcosystem: "State Pharmacy Council Licensure, Drug Inspectorate Licenses (Form 20/21), PharmEasy Partner",
        initialSteps: ["Obtain Registered Pharmacist state license number", "Secure Form 20 and Form 21 retail drug licenses", "Tie up with pharmaceutical stockists and regional clinics"]
      }
    ],
    govtExams: [
      {
        examName: "Drug Inspector (DI) Examination",
        conductingBody: "UPSC / State Public Service Commissions",
        targetPosts: "Drug Inspector / Assistant Drugs Controller (Gazetted Officer)",
        eligibilityNote: "B.Pharm degree + 18 months manufacturing/testing experience in schedule M/C drugs (per Drugs & Cosmetics Rules).",
        prepStrategy: "Drugs and Cosmetics Act 1940, Pharmacology, Pharmaceutics, and jurisprudence laws."
      },
      {
        examName: "Government Hospital Pharmacist",
        conductingBody: "ESIC, Railways (RRB), AIIMS, Central Government Health Scheme (CGHS)",
        targetPosts: "Pharmacist Grade II (Permanent central/state pay scales)",
        eligibilityNote: "Registered Pharmacist under the Pharmacy Act 1948.",
        prepStrategy: "Clinical dispensing knowledge, drug pharmacology, and hospital inventory control."
      }
    ],
    careerSwitch: [
      {
        targetField: "HealthTech & Telemedicine Product Management",
        pivotReason: "Deep grasp of patient prescription workflows, drug interactions, and medical regulations bridges digital health apps.",
        bridgeCourses: ["Digital Health Certificate", "Product Analytics"],
        transitionTime: "3 to 6 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Chemical Dispensing & Weighing", "Pharmaceutics Lab Compounding", "Human Anatomy & Physiology", "Drug Nomenclature"],
        soft: ["Accuracy & Exactness", "Patient Empathy", "Strict Ethics"],
        courses: ["Pharmacy Council Core Syllabus", "Pharmacology Basics (MIT OCW)"]
      },
      intermediate: {
        technical: ["Pharmacokinetics & Drug Interactions", "BMR & BPR Industrial Documentation", "Analytical Instrumentation (UV/HPLC)", "Drug Jurisprudence"],
        soft: ["Team Protocol Compliance", "Clear Clinical Explanations"],
        courses: ["ICH Quality Guidelines", "Pharmacovigilance Fundamentals"]
      },
      advanced: {
        technical: ["eCTD Dossier Compilation", "Bioequivalence Study Design", "ADR Signal Detection (Argus Safety)"],
        soft: ["Regulatory Inspection Auditing", "Cross-Functional Strategy"],
        courses: ["RAPS Regulatory Affairs Modules", "Advanced Biopharmaceutics"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Pharmaceutical Chemistry & Industrial Labs (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Attain deep mastery over medicinal chemistry and pharmacology", "Maintain high GPA to stay competitive for NIPER-JEE and GPAT", "Complete hospital dispensing exposure during vacation"],
          milestone: "Achieve top grades in pharmacology practicals and participate in state IPC pharmacy conferences."
        },
        phase2: {
          title: "Industrial Formulation Training & GPAT Preparation (Year 3)",
          timeframe: "Semester 5–6",
          tasks: ["Undergo mandatory 1-month industrial training in a GMP certified pharmaceutical factory", "Intensive preparation for GPAT (Graduate Pharmacy Aptitude Test)", "Explore specialized elective tracks like Pharmacovigilance or Cosmetic Technology"],
          milestone: "Score high percentiles in national level GPAT mock test series."
        },
        phase3: {
          title: "GPAT/NIPER Results, State Licensure & Placements (Year 4)",
          timeframe: "Semester 7–8",
          tasks: ["Appear for GPAT and NIPER-JEE exams", "Apply for State Pharmacy Council Registered Pharmacist license", "Attend campus drives for QA/QC, Production, and Clinical Research roles"],
          milestone: "Crack GPAT with monthly fellowship or secure pharma MNC campus placement."
        }
      },
      completed: {
        phase1: {
          title: "Pharmacist Registration & Technical Portfolio Assembly",
          timeframe: "Month 1–2",
          tasks: ["Obtain official State Pharmacy Council registration card and certificate", "Highlight industrial factory training and instrumentation expertise on CV", "Earn certified Pharmacovigilance or GCP badge"],
          milestone: "Licensed Registered Pharmacist credentials verified with optimized CV."
        },
        phase2: {
          title: "Pharma Production & Clinical Research Applications",
          timeframe: "Month 2–4",
          tasks: ["Target pharmaceutical manufacturing belts (Baddi, Hyderabad, Ahmedabad, Sikkim)", "Apply to CROs for Clinical Data Coordinator and Drug Safety positions", "Prepare for technical interviews on pharmacology mechanisms of action"],
          milestone: "Secure 2–3 written technical interview calls."
        },
        phase3: {
          title: "Industrial Onboarding & Pharmacovigilance Ramp-Up",
          timeframe: "Month 4–6",
          tasks: ["Commence Junior Chemist or Drug Safety Associate role", "Undergo standard operating procedure (SOP) qualification", "Plan 2-year trajectory towards Executive Regulatory Affairs or sponsored M.Pharm"],
          milestone: "Successfully certified as qualified person in analytical or clinical safety unit."
        }
      }
    },
    metrics: {
      avgPlacementRate: "83% within 6 months",
      medianStartingSalary: "₹4.5 LPA (Industry/Production) / ₹9+ LPA (Post-NIPER M.Pharm)",
      avgTimeToOutcome: "2.9 months post-completion",
      highDemandSectors: ["Pharma Manufacturing & QC", "Clinical Research & Pharmacovigilance", "Regulatory Affairs Consulting", "Retail Health Chains"]
    }
  },
  {
    id: "vocational_diploma",
    name: "Vocational Stream / Polytechnic / Applied Diplomas",
    shortTitle: "Vocational & Polytechnic",
    iconType: "wrench",
    overview: "Direct practical trade mastery, engineering workshop technology, NSQF level certifications, industrial automation, and hands-on technician competencies.",
    typicalDuration: "2 to 3 years (Polytechnic / B.Voc / ITI)",
    jobs: [
      {
        role: "Junior Engineer / Technical Supervisor",
        salaryRange: "₹3.5L – ₹6.5L PA",
        description: "Supervises shopfloor manufacturing lines, CNC machine operations, electrical maintenance, and site civil construction.",
        topEmployers: ["L&T Construction", "Maruti Suzuki", "Ashok Leyland", "State Electricity Boards (DISCOMs)", "Indian Railways"],
        keySkills: ["Shopfloor Maintenance", "PLC / CNC Operations", "Electrical Wiring Diagrams", "Industrial Safety Standards"],
        fitReason: "Direct application of 3 years practical workshop machinery and industrial diploma curriculum."
      },
      {
        role: "Automation & Robotics Technician",
        salaryRange: "₹4L – ₹7.5L PA",
        description: "Programs, calibrates, and repairs automated pneumatic arms, sensors, and SCADA monitoring equipment in modern factories.",
        topEmployers: ["Automotive Assembly Plants", "FMCG Packaging Centers", "Consumer Electronics Factories"],
        keySkills: ["PLC Programming (Siemens/Allen-Bradley)", "Pneumatics & Hydraulics", "Sensor Calibration", "Preventive Maintenance"],
        fitReason: "Applied polytechnic mechatronics and electrical diplomas excel in hands-on equipment reliability."
      },
      {
        role: "Quality Assurance & NDT Inspector",
        salaryRange: "₹3.8L – ₹7L PA",
        description: "Conducts non-destructive testing (NDT), ultrasonic flaw detection, weld inspection, and dimensional calibration.",
        topEmployers: ["Inspection Consultancies (TÜV SÜD, Bureau Veritas)", "Defense Ordnance", "Shipbuilding Yards"],
        keySkills: ["Non-Destructive Testing (NDT Level II)", "Ultrasonic Testing", "Vernier/Micrometer Metrology"],
        fitReason: "Exact technical trade focus with high national and Middle-East overseas placement value."
      }
    ],
    higherEducation: [
      {
        degree: "Lateral Entry B.Tech / B.E. (Direct 2nd Year Entry)",
        specialization: "Mechanical, Electrical, Civil, Computer Science, Automation",
        entranceExams: ["State Lateral Entry Entrance Tests (LEET / JELET / ECET)"],
        admissionNotes: "Enables polytechnic diploma holders to join directly into the 3rd semester (2nd year) of full B.Tech engineering programs.",
        duration: "3 years"
      },
      {
        degree: "B.Voc (Bachelor of Vocational Education)",
        specialization: "Industrial Automation, Automotive Manufacturing, Software Development",
        entranceExams: ["CUET-UG / University Direct Admissions"],
        admissionNotes: "UGC recognized degree with multi-entry and multi-exit credit framework (Certificate, Diploma, Advanced Diploma, Degree).",
        duration: "3 years"
      }
    ],
    certifications: [
      {
        name: "NDT Level II Certification (ASNT Standards)",
        provider: "American Society for Nondestructive Testing (ASNT)",
        level: "Intermediate",
        relevance: "High international demand across oil & gas, aerospace, and heavy manufacturing.",
        estimatedTime: "2 months",
        linkNote: "asnt.org"
      },
      {
        name: "PLC & SCADA Industrial Automation Certification",
        provider: "Siemens SITRAIN / Schneider Electric Academy",
        level: "Intermediate",
        relevance: "Transforms standard electricians and mechanics into modern automated factory automation leads.",
        estimatedTime: "2 months",
        linkNote: "sitrain.siemens.com"
      }
    ],
    entrepreneurship: [
      {
        title: "Industrial Maintenance & Contracting Service Agency",
        description: "Provide licensed electrical contracting, HVAC servicing, or CNC machine maintenance contracts for local industrial estates.",
        platformOrEcosystem: "PMEGP Government Loan Scheme, Mudra Scheme, MSME Udyam Registration",
        initialSteps: ["Obtain State Electrical Supervisor / Contractor License", "Register MSME firm under Udyam scheme", "Secure annual maintenance contracts (AMC) with local manufacturing units"]
      }
    ],
    govtExams: [
      {
        examName: "Staff Selection Commission Junior Engineer (SSC JE)",
        conductingBody: "Staff Selection Commission (SSC)",
        targetPosts: "Junior Engineer (Civil, Mechanical, Electrical) in CPWD, MES, and Central Water Commission",
        eligibilityNote: "3-year Diploma in Civil, Electrical, or Mechanical Engineering from recognized institute.",
        prepStrategy: "Technical branch paper + General Intelligence & Reasoning."
      },
      {
        examName: "Railway Recruitment Board Junior Engineer (RRB JE)",
        conductingBody: "Indian Railways",
        targetPosts: "Junior Engineer (Permanent Railway Pay Matrix Level 6)",
        eligibilityNote: "Diploma in relevant engineering discipline.",
        prepStrategy: "Stage 1 CBT General Aptitude + Stage 2 Technical Domain Syllabus."
      }
    ],
    careerSwitch: [
      {
        targetField: "IT Systems & Hardware Network Administration",
        pivotReason: "Practical technical troubleshooting mindset translates easily into IT server hardware, cabling, and data-center support.",
        bridgeCourses: ["Cisco CCNA", "CompTIA Network+"],
        transitionTime: "3 to 4 months"
      }
    ],
    skillLadder: {
      foundation: {
        technical: ["Workshop Machinery Safety", "Blueprint & Electrical Schematic Reading", "Hand Tools & Metrology", "Basic Welding / Fitting"],
        soft: ["Physical Stamina", "Safety First Consciousness", "Punctuality"],
        courses: ["Industrial Safety Basics", "Engineering Drawing Interpretation"]
      },
      intermediate: {
        technical: ["PLC Logic & Wiring", "CNC G-Code / M-Code Programming", "Troubleshooting Industrial Motors & Pumps", "NDT Testing"],
        soft: ["Shopfloor Team Coordination", "Incident Reporting"],
        courses: ["PLC Programming Fundamentals", "NDT Level II Modules"]
      },
      advanced: {
        technical: ["SCADA & Industrial IoT Integration", "Preventive Maintenance Scheduling (CMMS)", "Shopfloor Lean 5S & Kaizen"],
        soft: ["Contractor Negotiation", "Shift Supervisory Leadership"],
        courses: ["Siemens Advanced Industrial Automation", "Lean Manufacturing 5S"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: {
          title: "Hands-on Workshop Labs & Machine Tool Mastery (Year 1–2)",
          timeframe: "Semester 1–4",
          tasks: ["Excel in lathe, milling, electrical wiring, and fluid mechanics labs", "Acquire CAD drafting skills", "Maintain distinction marks (> 75%) to qualify for LEET B.Tech entry"],
          milestone: "Fabricate a working mechanical/electrical assembly project in college workshop."
        },
        phase2: {
          title: "In-Plant Industrial Apprenticeship & Skill Certification (Final Year)",
          timeframe: "Semester 5–6",
          tasks: ["Undergo 3-month industrial apprenticeship under NAPS / NATS portal", "Prepare for state LEET entrance exam or target campus placement with auto/manufacturing MNCs", "Earn PLC or NDT specialization certificate"],
          milestone: "Receive National Apprenticeship Certificate (NAC) or top LEET entrance score."
        },
        phase3: {
          title: "Lateral B.Tech Entry vs Junior Engineer Recruitment",
          timeframe: "Graduation Transition",
          tasks: ["Participate in campus recruitment drives for Diploma Trainee Engineer (DTE)", "Appear for state LEET counseling for lateral entry B.Tech", "Apply for SSC JE and RRB JE government notifications"],
          milestone: "Secure admission to 2nd year B.Tech or sign GET employment contract."
        }
      },
      completed: {
        phase1: {
          title: "Trade Certification Audit & Apprenticeship Enrollment",
          timeframe: "Month 1–2",
          tasks: ["Enroll on the National Apprenticeship Promotion Scheme (NAPS) portal", "Assemble practical machine and software competencies into a 1-page technician resume", "Target industrial manufacturing zones (Chakan, Sriperumbudur, Manesar, Sanand)"],
          milestone: "NAPS verified candidate profile and updated trade resume."
        },
        phase2: {
          title: "Plant Walk-In Interviews & Trade Skill Tests",
          timeframe: "Month 2–4",
          tasks: ["Attend industrial plant walk-in interviews for Diploma Trainee positions", "Complete practical machine calibration and wiring test tasks on-site", "Prepare for basic technical viva on electrical/mechanical systems"],
          milestone: "Pass practical trade demonstration and secure manufacturing offer."
        },
        phase3: {
          title: "Shopfloor Onboarding & Pathway to Supervisor",
          timeframe: "Month 4–6",
          tasks: ["Complete on-site plant safety training and OHS compliance", "Earn company machine operator certification", "Set target to advance to Assistant Shift In-Charge within 18 months"],
          milestone: "Promoted from Trainee to regular Junior Technical Engineer with independent shift responsibility."
        }
      }
    },
    metrics: {
      avgPlacementRate: "88% within 4 months",
      medianStartingSalary: "₹3.6L – ₹5.5L PA (Domestic) / ₹10L+ PA (Overseas Gulf/Singapore)",
      avgTimeToOutcome: "2.4 months post-completion",
      highDemandSectors: ["Automotive & Ancillaries", "Heavy Engineering & EPC", "Industrial Automation", "Railways & Metro Rail"]
    }
  }
];

export const ACTION_TEMPLATES = {
  coldEmail: {
    title: "Internship & Project Outreach Cold Email",
    description: "Battle-tested email template tailored for undergraduates and recent graduates reaching out directly to hiring managers, founders, and team leads.",
    subject: "[Your Name] – Interest in [Department / Role] Internship / Entry Opportunity",
    body: `Dear [Recipient Name or "Hiring Team"],

I am [Your Name], currently a [Year of Study / Recent Graduate] in [Your Degree Name – e.g. B.Sc Computer Science / B.Tech / B.Com] from [Your University/College]. I have been closely tracking [Company/Organization Name]'s impactful work in [Specific Product / Domain – e.g. scalable cloud infrastructure / quantitative finance / consumer UX], and I would love to contribute to your team.

Key strengths I would bring to your projects:
• [Key Skill / Project 1]: Developed [Brief 1-sentence description with metric – e.g. full-stack web application with Next.js & Supabase serving 500+ users].
• [Key Skill / Project 2]: Solid foundation in [Relevant Technical Area – e.g. financial modeling / UI design systems / Python data analysis].
• [Achievement / Practical Badge]: [e.g. Winner at Hackathon / Certified AWS Cloud Practitioner / Prior 8-week internship experience].

I have attached my resume and linked my portfolio / GitHub below for your review:
• Portfolio / GitHub / Case Studies: [Link]
• LinkedIn: [Link]

I would welcome the opportunity to discuss how my skill set can support your team's immediate goals. Thank you for your time and consideration.

Sincerely,
[Your Name]
[Phone Number] | [Email Address]`
  },
  internshipChecklist: [
    { id: "ic_1", category: "Academic & Coursework", text: "Maintain strong academic grades (> 7.0 CGPA / 65%+) in relevant major subjects." },
    { id: "ic_2", category: "Academic & Coursework", text: "Complete at least one comprehensive departmental lab capstone or practical term project." },
    { id: "ic_3", category: "Portfolio & Assets", text: "Build a clean 1-page ATS-friendly resume highlighting quantifiable project outcomes." },
    { id: "ic_4", category: "Portfolio & Assets", text: "Host live demonstrable proofs (GitHub repos with READMEs, Figma case studies, or financial models)." },
    { id: "ic_5", category: "Targeting & Research", text: "Curate a shortlist of 20–30 organizations matching your degree cluster and industry aspiration." },
    { id: "ic_6", category: "Outreach & Applications", text: "Send 8–10 tailored cold outreach emails or LinkedIn InMails weekly using personalized angles." },
    { id: "ic_7", category: "Interview Preparation", text: "Practice core domain fundamentals (data structures, financial formulas, or design critique) under timed pressure." },
    { id: "ic_8", category: "Soft Skills & Logistics", text: "Conduct mock behavioral interviews focusing on clarity, problem-solving narrative, and questions for the interviewer." },
    { id: "ic_9", category: "Administrative Clearance", text: "Obtain formal No-Objection Certificate (NOC) and attendance credit clearance from college department." }
  ],
  portfolioChecklist: [
    { id: "pc_1", category: "Selection", text: "Select 3–4 showcase projects that directly mirror the exact job role you are targeting." },
    { id: "pc_2", category: "Problem Context", text: "Clearly define the problem statement, user challenge, or market need before showing the solution." },
    { id: "pc_3", category: "Role & Ownership", text: "Explicitly state your individual contribution, tech stack used, and team dynamics." },
    { id: "pc_4", category: "Measurable Impact", text: "Include quantifiable metrics where possible (e.g. 'reduced latency by 35%', 'automated 12 hrs/week')." },
    { id: "pc_5", category: "Visual Polish", text: "Provide high-resolution visual screenshots, architecture flowcharts, or interactive live demo URLs." },
    { id: "pc_6", category: "Code / Deliverable Cleanliness", text: "Ensure GitHub repositories have clear README.md files with 1-step installation instructions." },
    { id: "pc_7", category: "Feedback & Iteration", text: "Seek peer or mentor review, eliminating broken links, typos, and visual clutter." },
    { id: "pc_8", category: "Accessibility", text: "Host on a fast-loading custom domain (Vercel, Netlify, Framer, GitHub Pages, or Notion)." }
  ]
};

export const CHATBOT_INTENTS_DATA = [
  {
    keywords: ["what can i do", "career options", "jobs after", "career opportunities", "roles"],
    response: (cluster: DegreeCluster, status: string) => 
      `With a background in **${cluster.name}**, your primary career avenues include:
1. **${cluster.jobs[0].role}** (${cluster.jobs[0].salaryRange}): ${cluster.jobs[0].description}
2. **${cluster.jobs[1]?.role || "Specialist Track"}** (${cluster.jobs[1]?.salaryRange}): ${cluster.jobs[1]?.description}
${cluster.jobs[2] ? `3. **${cluster.jobs[2].role}**: ${cluster.jobs[2].description}` : ""}

${status === "pursuing" 
  ? "👉 *Since you are currently pursuing your degree, your immediate highest-ROI move is securing an industry internship and building a 3-project showcase portfolio.*"
  : "👉 *Since you have graduated, focus on high-impact resume submission, mock interviews, and obtaining a recognized industry micro-credential.*"}`
  },
  {
    keywords: ["higher education", "masters", "master", "m.tech", "mba", "m.sc", "further study", "pg"],
    response: (cluster: DegreeCluster) => 
      `For **${cluster.name}**, the most prestigious and high-return postgraduate pathways are:
${cluster.higherEducation.map((he) => `• **${he.degree}** (${he.specialization}): Entrance via **${he.entranceExams.join(", ")}**. Duration: ${he.duration}. Notes: ${he.admissionNotes}`).join("\n")}

Would you like advice on preparing for the entrance exams or balancing higher studies with work?`
  },
  {
    keywords: ["certification", "certifications", "credential", "courses", "skills to learn", "tools"],
    response: (cluster: DegreeCluster) => 
      `Top industry-standard certifications for **${cluster.name}** are:
${cluster.certifications.map((c) => `• **${c.name}** (${c.provider}) [${c.level} level]: ${c.relevance} (Est. ${c.estimatedTime})`).join("\n")}

You can also explore the 3-tier **Skill Ladder** tab above to see foundation, intermediate, and advanced capabilities mapped with learning resources!`
  },
  {
    keywords: ["switch", "pivot", "change career", "alternate", "different field"],
    response: (cluster: DegreeCluster) => 
      `Looking to pivot from **${cluster.name}**? High-probability transition bridges include:
${cluster.careerSwitch.map((cs) => `• **${cs.targetField}**: ${cs.pivotReason} Bridge courses: ${cs.bridgeCourses.join(", ")}. Typical timeline: ${cs.transitionTime}.`).join("\n")}

You can leverage your current analytical and communication strengths while picking up domain skills via micro-credentials!`
  },
  {
    keywords: ["government", "govt", "upsc", "competitive exam", "psu", "railway", "ssc"],
    response: (cluster: DegreeCluster) => 
      `Key competitive government exams tailored for **${cluster.name}**:
${cluster.govtExams.map((ge) => `• **${ge.examName}** (${ge.conductingBody}): Target post: *${ge.targetPosts}*. Strategy: ${ge.prepStrategy}`).join("\n")}

Would you like a prep timeline alongside your degree coursework?`
  }
];
