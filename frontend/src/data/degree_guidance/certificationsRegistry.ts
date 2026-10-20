import { Certification } from "./types";

export const CERTIFICATIONS_REGISTRY: Certification[] = [
  // ==========================================
  // 1. CLOUD, DEVOPS & INFRASTRUCTURE
  // ==========================================
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    domain: "Cloud & DevOps",
    level: "Intermediate",
    prerequisites: ["Knowledge of distributed systems, networking, and AWS core services"],
    costBand: "Medium (5k-20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate",
    renewalRules: "Recertification exam or upgrade to Professional level every 3 years",
    meta: {
      sourceUrl: "https://aws.amazon.com/certification",
      retrievedOn: "2025-06-15",
      verifier: "AWS Official Certification Directory",
      confidence: "high"
    }
  },
  {
    id: "azure-az104",
    name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    provider: "Microsoft",
    domain: "Cloud & DevOps",
    level: "Intermediate",
    prerequisites: ["Understanding of Azure services, security, storage, and networking"],
    costBand: "Medium (5k-20k)",
    validityYears: 1,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator",
    renewalRules: "Free annual online renewal assessment on Microsoft Learn",
    meta: {
      sourceUrl: "https://learn.microsoft.com",
      retrievedOn: "2025-06-15",
      verifier: "Microsoft Learn Official",
      confidence: "high"
    }
  },
  {
    id: "gcp-ace",
    name: "Google Cloud Associate Cloud Engineer",
    provider: "Google Cloud",
    domain: "Cloud & DevOps",
    level: "Beginner",
    prerequisites: ["Familiarity with GCP Console and command-line tool (gcloud)"],
    costBand: "Medium (5k-20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
    renewalRules: "Retake exam every 3 years",
    meta: {
      sourceUrl: "https://cloud.google.com",
      retrievedOn: "2025-06-15",
      verifier: "Google Cloud Certifications",
      confidence: "high"
    }
  },
  {
    id: "cka",
    name: "Certified Kubernetes Administrator (CKA)",
    provider: "Cloud Native Computing Foundation (CNCF) & Linux Foundation",
    domain: "Cloud & DevOps",
    level: "Advanced",
    prerequisites: ["Proficiency in Linux terminal, Docker containers, and Kubernetes concepts"],
    costBand: "High (>20k)",
    validityYears: 2,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.cncf.io/certification/cka",
    renewalRules: "Pass current version of CKA exam every 2 years",
    meta: {
      sourceUrl: "https://www.cncf.io",
      retrievedOn: "2025-06-15",
      verifier: "CNCF Official",
      confidence: "high"
    }
  },
  {
    id: "terraform-associate",
    name: "HashiCorp Certified: Terraform Associate",
    provider: "HashiCorp",
    domain: "Cloud & DevOps",
    level: "Intermediate",
    prerequisites: ["Basic understanding of Infrastructure as Code and cloud provider concepts"],
    costBand: "Low (<5k)",
    validityYears: 2,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    meta: {
      sourceUrl: "https://www.hashicorp.com",
      retrievedOn: "2025-06-15",
      verifier: "HashiCorp Official",
      confidence: "high"
    }
  },

  // ==========================================
  // 2. CYBERSECURITY & NETWORKING
  // ==========================================
  {
    id: "comptia-sec-plus",
    name: "CompTIA Security+ (SY0-701)",
    provider: "CompTIA",
    domain: "Cybersecurity",
    level: "Intermediate",
    prerequisites: ["CompTIA Network+ and two years of administration experience recommended"],
    costBand: "High (>20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.comptia.org/certifications/security",
    renewalRules: "50 Continuing Education Units (CEUs) every 3 years",
    meta: {
      sourceUrl: "https://www.comptia.org",
      retrievedOn: "2025-06-15",
      verifier: "CompTIA Directory",
      confidence: "high"
    }
  },
  {
    id: "ceh",
    name: "Certified Ethical Hacker (CEH v13)",
    provider: "EC-Council",
    domain: "Cybersecurity",
    level: "Intermediate",
    prerequisites: ["2 years work experience in cybersecurity or attended official training"],
    costBand: "High (>20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh",
    renewalRules: "120 ECE credits every 3 years",
    meta: {
      sourceUrl: "https://www.eccouncil.org",
      retrievedOn: "2025-06-15",
      verifier: "EC-Council Official",
      confidence: "high"
    }
  },
  {
    id: "cisco-ccna",
    name: "Cisco Certified Network Associate (CCNA 200-301)",
    provider: "Cisco Systems",
    domain: "Networking",
    level: "Beginner",
    prerequisites: ["Basic understanding of IP addressing and network fundamentals"],
    costBand: "High (>20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
    renewalRules: "Earn 30 Continuing Education credits or pass qualifying exam every 3 years",
    meta: {
      sourceUrl: "https://www.cisco.com",
      retrievedOn: "2025-06-15",
      verifier: "Cisco Official Certifications",
      confidence: "high"
    }
  },

  // ==========================================
  // 3. DATA SCIENCE & ANALYTICS
  // ==========================================
  {
    id: "google-data-analytics",
    name: "Google Data Analytics Professional Certificate",
    provider: "Google (via Coursera)",
    domain: "Data & AI",
    level: "Beginner",
    prerequisites: ["None - designed for complete beginners"],
    costBand: "Low (<5k)",
    examMode: "Online",
    recognition: "industry",
    officialUrl: "https://grow.google/certificates/data-analytics",
    meta: {
      sourceUrl: "https://grow.google",
      retrievedOn: "2025-06-15",
      verifier: "Grow with Google",
      confidence: "high"
    }
  },
  {
    id: "ms-pl300",
    name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    provider: "Microsoft",
    domain: "Data & AI",
    level: "Intermediate",
    prerequisites: ["Experience transforming, modeling, and visualizing data in Power BI"],
    costBand: "Low (<5k)",
    validityYears: 1,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate",
    renewalRules: "Free annual renewal online on Microsoft Learn",
    meta: {
      sourceUrl: "https://learn.microsoft.com",
      retrievedOn: "2025-06-15",
      verifier: "Microsoft Learn",
      confidence: "high"
    }
  },
  {
    id: "databricks-associate",
    name: "Databricks Certified Associate Developer for Apache Spark",
    provider: "Databricks",
    domain: "Data & AI",
    level: "Intermediate",
    prerequisites: ["Understanding of Spark DataFrame API, Spark architecture, and Python/Scala"],
    costBand: "Medium (5k-20k)",
    validityYears: 2,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.databricks.com/learn/certification",
    meta: {
      sourceUrl: "https://www.databricks.com",
      retrievedOn: "2025-06-15",
      verifier: "Databricks Academy",
      confidence: "high"
    }
  },

  // ==========================================
  // 4. FINANCE, AUDIT & ACCOUNTING
  // ==========================================
  {
    id: "ca-icai",
    name: "Chartered Accountant (CA)",
    provider: "Institute of Chartered Accountants of India (ICAI)",
    domain: "Finance & Accounting",
    level: "Advanced",
    prerequisites: ["Pass Foundation, Intermediate, and mandatory 2-year practical articleship training"],
    costBand: "Medium (5k-20k)",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://www.icai.org",
    renewalRules: "Mandatory Continuing Professional Education (CPE) hours annually",
    meta: {
      sourceUrl: "https://www.icai.org",
      retrievedOn: "2025-06-15",
      verifier: "ICAI Official Statutory Body",
      confidence: "high"
    }
  },
  {
    id: "cma-icmai",
    name: "Cost and Management Accountant (CMA)",
    provider: "Institute of Cost Accountants of India (ICMAI - formerly ICWA)",
    domain: "Finance & Accounting",
    level: "Advanced",
    prerequisites: ["Pass Foundation/Graduation entry, Intermediate, and 15 months practical training"],
    costBand: "Medium (5k-20k)",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://icmai.in",
    meta: {
      sourceUrl: "https://icmai.in",
      retrievedOn: "2025-06-15",
      verifier: "ICMAI Official Statutory Body",
      confidence: "high"
    }
  },
  {
    id: "cs-icsi",
    name: "Company Secretary (CS)",
    provider: "Institute of Company Secretaries of India (ICSI)",
    domain: "Corporate Governance & Law",
    level: "Advanced",
    prerequisites: ["Pass CSEET, Executive programme, Professional programme, and practical training"],
    costBand: "Medium (5k-20k)",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://www.icsi.edu",
    meta: {
      sourceUrl: "https://www.icsi.edu",
      retrievedOn: "2025-06-15",
      verifier: "ICSI Official Statutory Body",
      confidence: "high"
    }
  },
  {
    id: "cfa",
    name: "Chartered Financial Analyst (CFA Level I, II, III)",
    provider: "CFA Institute",
    domain: "Finance & Accounting",
    level: "Advanced",
    prerequisites: ["Undergraduate degree or in final year of bachelor's degree"],
    costBand: "High (>20k)",
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.cfainstitute.org/en/programs/cfa",
    meta: {
      sourceUrl: "https://www.cfainstitute.org",
      retrievedOn: "2025-06-15",
      verifier: "CFA Institute Global",
      confidence: "high"
    }
  },
  {
    id: "nism-series-viii",
    name: "NISM Series VIII: Equity Derivatives Certification",
    provider: "National Institute of Securities Markets (SEBI Mandated)",
    domain: "Finance & Accounting",
    level: "Beginner",
    prerequisites: ["Basic knowledge of equity and financial derivatives markets"],
    costBand: "Low (<5k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "india_regulated",
    officialUrl: "https://www.nism.ac.in/certifications",
    renewalRules: "Re-examination or Continuing Professional Education (CPE) program",
    meta: {
      sourceUrl: "https://www.nism.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "SEBI Mandated NISM",
      confidence: "high"
    }
  },

  // ==========================================
  // 5. PROJECT MANAGEMENT & AGILE
  // ==========================================
  {
    id: "pmp",
    name: "Project Management Professional (PMP)",
    provider: "Project Management Institute (PMI)",
    domain: "Project & Agile Management",
    level: "Advanced",
    prerequisites: ["Four-year degree + 36 months leading projects + 35 hours PM education"],
    costBand: "High (>20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.pmi.org/certifications/project-management-pmp",
    renewalRules: "60 Professional Development Units (PDUs) every 3 years",
    meta: {
      sourceUrl: "https://www.pmi.org",
      retrievedOn: "2025-06-15",
      verifier: "PMI Global",
      confidence: "high"
    }
  },
  {
    id: "psm-1",
    name: "Professional Scrum Master I (PSM I)",
    provider: "Scrum.org",
    domain: "Project & Agile Management",
    level: "Beginner",
    prerequisites: ["Deep understanding of the Scrum Guide and Agile practices"],
    costBand: "Medium (5k-20k)",
    examMode: "Online",
    recognition: "global",
    officialUrl: "https://www.scrum.org/assessments/professional-scrum-master-i-certification",
    renewalRules: "Lifetime validity (no renewal required)",
    meta: {
      sourceUrl: "https://www.scrum.org",
      retrievedOn: "2025-06-15",
      verifier: "Scrum.org",
      confidence: "high"
    }
  },

  // ==========================================
  // 6. HEALTHCARE & LIFE SCIENCES
  // ==========================================
  {
    id: "bls-acls",
    name: "Basic Life Support (BLS) & Advanced Cardiovascular Life Support (ACLS)",
    provider: "American Heart Association (AHA) / Indian Resuscitation Council (IRC)",
    domain: "Healthcare",
    level: "Intermediate",
    prerequisites: ["Healthcare professional (Doctor, Nurse, Allied Health, EMT)"],
    costBand: "Medium (5k-20k)",
    validityYears: 2,
    examMode: "Offline",
    recognition: "global",
    officialUrl: "https://cpr.heart.org",
    renewalRules: "Hands-on recertification practical course every 2 years",
    meta: {
      sourceUrl: "https://cpr.heart.org",
      retrievedOn: "2025-06-15",
      verifier: "AHA Guidelines",
      confidence: "high"
    }
  },
  {
    id: "state-nursing-council",
    name: "Registered Nurse & Registered Midwife (RN & RM)",
    provider: "State Nursing Council (under Indian Nursing Council - INC)",
    domain: "Healthcare",
    level: "Beginner",
    prerequisites: ["Completed B.Sc Nursing or GNM from INC recognized institution"],
    costBand: "Low (<5k)",
    validityYears: 5,
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://indiannursingcouncil.org",
    renewalRules: "Renewal every 5 years with 150 CNE credit hours",
    meta: {
      sourceUrl: "https://indiannursingcouncil.org",
      retrievedOn: "2025-06-15",
      verifier: "Indian Nursing Council Act",
      confidence: "high"
    }
  },
  {
    id: "nmc-medical-registration",
    name: "Permanent Medical Council Registration (NMC / State Medical Council)",
    provider: "National Medical Commission (NMC)",
    domain: "Healthcare",
    level: "Beginner",
    prerequisites: ["MBBS degree from NMC recognized college + 1 Year CRRI Internship completion"],
    costBand: "Low (<5k)",
    validityYears: 5,
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://www.nmc.org.in",
    renewalRules: "5-yearly renewal requiring 30 Continuing Medical Education (CME) credit hours",
    meta: {
      sourceUrl: "https://www.nmc.org.in",
      retrievedOn: "2025-06-15",
      verifier: "NMC Act 2019 Guidelines",
      confidence: "high"
    }
  },
  {
    id: "nabh-auditor",
    name: "NABH Internal Assessor for Hospitals & Healthcare Providers",
    provider: "National Accreditation Board for Hospitals & Healthcare Providers (Quality Council of India)",
    domain: "Healthcare",
    level: "Intermediate",
    prerequisites: ["MBBS, BDS, B.Sc Nursing, or MHA with hospital clinical experience"],
    costBand: "Medium (5k-20k)",
    examMode: "Online",
    recognition: "india_regulated",
    officialUrl: "https://www.nabh.co",
    renewalRules: "Refresher training every 3 years",
    meta: {
      sourceUrl: "https://www.nabh.co",
      retrievedOn: "2025-06-15",
      verifier: "NABH Quality Council of India",
      confidence: "high"
    }
  },

  // ==========================================
  // 7. LAW, ARCHITECTURE & ENGINEERING TRADES
  // ==========================================
  {
    id: "aibe-cop",
    name: "Bar Council Certificate of Practice (COP)",
    provider: "Bar Council of India (BCI)",
    domain: "Law & Legal Practice",
    level: "Beginner",
    prerequisites: ["LL.B. degree from BCI recognized law college and provisional State Bar enrollment"],
    costBand: "Low (<5k)",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://allindiabarexamination.com",
    meta: {
      sourceUrl: "https://allindiabarexamination.com",
      retrievedOn: "2025-06-15",
      verifier: "BCI Statutory Registration",
      confidence: "high"
    }
  },
  {
    id: "cyber-law-cert",
    name: "Cyber Law & Information Security Practice Certification",
    provider: "Indian Law Institute (ILI) / NLSIU",
    domain: "Law & Legal Practice",
    level: "Intermediate",
    prerequisites: ["Law graduate (LL.B.) or IT professional"],
    costBand: "Medium (5k-20k)",
    examMode: "Online",
    recognition: "india_regulated",
    officialUrl: "https://ili.ac.in",
    meta: {
      sourceUrl: "https://ili.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "Indian Law Institute Official",
      confidence: "high"
    }
  },
  {
    id: "adr-mediation",
    name: "Certified Commercial Mediator & Arbitrator",
    provider: "Indian Institute of Arbitration & Mediation (IIAM)",
    domain: "Law & Legal Practice",
    level: "Intermediate",
    prerequisites: ["Law graduate (LL.B.) or judicial officer"],
    costBand: "High (>20k)",
    examMode: "Online",
    recognition: "global",
    officialUrl: "https://arbitrationindia.org",
    meta: {
      sourceUrl: "https://arbitrationindia.org",
      retrievedOn: "2025-06-15",
      verifier: "IIAM Mediation Accreditation Board",
      confidence: "high"
    }
  },
  {
    id: "coa-registration",
    name: "Council of Architecture (COA) Registration",
    provider: "Council of Architecture (COA India)",
    domain: "Architecture",
    level: "Beginner",
    prerequisites: ["5-year B.Arch degree recognized under Architects Act 1972"],
    costBand: "Low (<5k)",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://www.coa.gov.in",
    renewalRules: "Annual renewal / lifetime registration option",
    meta: {
      sourceUrl: "https://www.coa.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Council of Architecture Statutory Authority",
      confidence: "high"
    }
  },
  {
    id: "autodesk-autocad",
    name: "Autodesk Certified Professional in AutoCAD for Design & Drafting",
    provider: "Autodesk",
    domain: "Engineering & CAD",
    level: "Intermediate",
    prerequisites: ["400-1200 hours of AutoCAD software experience"],
    costBand: "Medium (5k-20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://www.autodesk.com/certification/all-certifications/autocad-design-drafting-professional",
    meta: {
      sourceUrl: "https://www.autodesk.com",
      retrievedOn: "2025-06-15",
      verifier: "Autodesk Official",
      confidence: "high"
    }
  },
  {
    id: "six-sigma-green-belt",
    name: "Lean Six Sigma Green Belt (ICGB)",
    provider: "ASQ (American Society for Quality) / IASSC",
    domain: "Quality & Operations",
    level: "Intermediate",
    prerequisites: ["Three years of on-the-job experience in one or more areas of Six Sigma Body of Knowledge"],
    costBand: "High (>20k)",
    validityYears: 3,
    examMode: "Proctored",
    recognition: "global",
    officialUrl: "https://asq.org/cert/six-sigma-green-belt",
    meta: {
      sourceUrl: "https://asq.org",
      retrievedOn: "2025-06-15",
      verifier: "ASQ Official",
      confidence: "high"
    }
  },

  // ==========================================
  // 8. GOVERNMENT & SKILL INDIA INITIATIVES
  // ==========================================
  {
    id: "swayam-nptel",
    name: "SWAYAM / NPTEL Elite + Silver/Gold Certificate",
    provider: "Ministry of Education & IIT Madras",
    domain: "Academics & Skills",
    level: "Intermediate",
    prerequisites: ["Completion of 8 or 12-week course assignments on SWAYAM platform"],
    costBand: "Low (<5k)",
    examMode: "Proctored",
    recognition: "india_regulated",
    officialUrl: "https://nptel.ac.in",
    meta: {
      sourceUrl: "https://nptel.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "NPTEL Ministry of Education",
      confidence: "high"
    }
  },
  {
    id: "nsdc-pmkvy",
    name: "NSDC / PMKVY National Skills Qualification (NSQF Level 5-7)",
    provider: "National Skill Development Corporation (NSDC / MSDE)",
    domain: "Vocational & Technical Trades",
    level: "Intermediate",
    prerequisites: ["Completion of training at accredited Pradhan Mantri Kaushal Kendra (PMKK)"],
    costBand: "Free",
    examMode: "Offline",
    recognition: "india_regulated",
    officialUrl: "https://www.pmkvyofficial.org",
    meta: {
      sourceUrl: "https://www.pmkvyofficial.org",
      retrievedOn: "2025-06-15",
      verifier: "Ministry of Skill Development & Entrepreneurship",
      confidence: "high"
    }
  },

  // ==========================================
  // 9. DESIGN & MARKETING
  // ==========================================
  {
    id: "google-ux-cert",
    name: "Google UX Design Professional Certificate",
    provider: "Google (via Coursera)",
    domain: "Design & UX",
    level: "Beginner",
    prerequisites: ["None - includes building portfolio with 3 case studies in Figma & Adobe XD"],
    costBand: "Low (<5k)",
    examMode: "Online",
    recognition: "industry",
    officialUrl: "https://grow.google/certificates/ux-design",
    meta: {
      sourceUrl: "https://grow.google",
      retrievedOn: "2025-06-15",
      verifier: "Google Career Certificates",
      confidence: "high"
    }
  },
  {
    id: "google-ads-cert",
    name: "Google Ads Search & Measurement Certification",
    provider: "Google Skillshop",
    domain: "Digital Marketing",
    level: "Beginner",
    prerequisites: ["Pass online Skillshop knowledge assessment"],
    costBand: "Free",
    validityYears: 1,
    examMode: "Online",
    recognition: "industry",
    officialUrl: "https://skillshop.withgoogle.com",
    renewalRules: "Retake assessment annually",
    meta: {
      sourceUrl: "https://skillshop.withgoogle.com",
      retrievedOn: "2025-06-15",
      verifier: "Google Skillshop",
      confidence: "high"
    }
  },
  {
    id: "hubspot-inbound",
    name: "HubSpot Inbound Marketing Certified",
    provider: "HubSpot Academy",
    domain: "Digital Marketing",
    level: "Beginner",
    prerequisites: ["Comprehensive study of inbound methodology and content strategy"],
    costBand: "Free",
    validityYears: 2,
    examMode: "Online",
    recognition: "industry",
    officialUrl: "https://academy.hubspot.com/courses/inbound-marketing",
    meta: {
      sourceUrl: "https://academy.hubspot.com",
      retrievedOn: "2025-06-15",
      verifier: "HubSpot Academy",
      confidence: "high"
    }
  }
];
