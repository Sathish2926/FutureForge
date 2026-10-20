import { Exam } from "./types";

export const EXAMS_REGISTRY: Exam[] = [
  // ==========================================
  // 1. NATIONAL ELIGIBILITY & RESEARCH EXAMS
  // ==========================================
  {
    id: "ugc-net",
    name: "UGC National Eligibility Test (NET / JRF)",
    acronym: "UGC-NET",
    conductingBody: "National Testing Agency (NTA)",
    purpose: "eligibility_test",
    eligibilityRules: {
      degreeFamilies: [
        "arts_humanities", "commerce", "computing", "education", "law",
        "library_science", "hospitality", "management", "postgraduate"
      ],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 55, reserved: 50 },
      ageRange: { min: 21, maxGeneral: 30, maxObc: 33, maxScSt: 35 } // JRF limit (Lectureship has NO upper limit)
    },
    pattern: "Paper 1 (General Teaching & Research Aptitude - 50 MCQs, 100 marks) + Paper 2 (Subject specific - 100 MCQs, 200 marks). 3 hours uninterrupted.",
    mode: "cbt",
    frequency: "Twice a year (June & December cycles)",
    typicalMonths: ["June", "December"],
    officialUrl: "https://ugcnet.nta.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Qualifies for Assistant Professor (no age limit) and Junior Research Fellowship (JRF, age limits apply)."
  },
  {
    id: "csir-net",
    name: "Joint CSIR-UGC NET for JRF & Lectureship",
    acronym: "CSIR-NET",
    conductingBody: "National Testing Agency (NTA) on behalf of CSIR",
    purpose: "eligibility_test",
    eligibilityRules: {
      degreeFamilies: ["pure_sciences", "health_allied", "pharmacy", "engineering", "postgraduate"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 55, reserved: 50 },
      ageRange: { min: 21, maxGeneral: 28, maxObc: 31, maxScSt: 33 } // JRF limit
    },
    pattern: "Single paper of 200 marks divided into Part A (General Aptitude), Part B (Subject MCQs), Part C (Higher-order scientific analytical questions).",
    mode: "cbt",
    frequency: "Twice a year (June & December)",
    typicalMonths: ["June", "December"],
    officialUrl: "https://csirnet.nta.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Covers Chemical Sciences, Earth Sciences, Life Sciences, Mathematical Sciences, and Physical Sciences."
  },

  // ==========================================
  // 2. POSTGRADUATE TECHNICAL & MANAGEMENT ENTRANCES
  // ==========================================
  {
    id: "gate",
    name: "Graduate Aptitude Test in Engineering",
    acronym: "GATE",
    conductingBody: "Rotating IITs / IISc Bangalore",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["engineering", "pure_sciences", "computing", "architecture", "pharmacy", "postgraduate"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "65 questions (100 marks): 10 General Aptitude + 55 Technical Subject questions (MCQs, MSQs, and Numerical NATs). 3 hours.",
    mode: "cbt",
    frequency: "Once a year (February)",
    typicalMonths: ["February"],
    officialUrl: "https://gate2025.iitr.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Used for M.Tech admissions at IITs/NITs, direct Ph.D., and recruitment into Navratna/Maharatna PSUs (IOCL, ONGC, NTPC, etc.). Score valid 3 years for admissions."
  },
  {
    id: "cat",
    name: "Common Admission Test (CAT)",
    acronym: "CAT",
    conductingBody: "Indian Institutes of Management (IIMs)",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "66 questions across 3 sections: VARC (24), DILR (20), Quantitative Aptitude (22). 40 minutes per section (120 mins total).",
    mode: "cbt",
    frequency: "Once a year (Last Sunday of November)",
    typicalMonths: ["November"],
    officialUrl: "https://iimcat.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Gate to 21 IIMs and 100+ premier management institutes (FMS Delhi, SPJIMR, MDI Gurgaon, IIT DoMS)."
  },
  {
    id: "cuet-pg",
    name: "Common University Entrance Test (Postgraduate)",
    acronym: "CUET-PG",
    conductingBody: "National Testing Agency (NTA)",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "75 domain-specific multiple choice questions (300 marks). 105 minutes duration.",
    mode: "cbt",
    frequency: "Once a year (March - April)",
    typicalMonths: ["March", "April"],
    officialUrl: "https://pgcuet.samarth.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Single gateway for MA, M.Sc, M.Com, MCA, M.Tech, and LLM across 190+ Central, State, and Deemed Universities including DU, JNU, BHU, and TISS."
  },
  {
    id: "iit-jam",
    name: "Joint Admission Test for Masters (IIT JAM)",
    acronym: "IIT-JAM",
    conductingBody: "Rotating IITs",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["pure_sciences"],
      allowedDegrees: ["bsc-physics", "bsc-chemistry", "bsc-maths", "bsc-stats", "bsc-biotech", "bsc-geology", "bsc-electronics"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 55, reserved: 50 },
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "60 questions (100 marks) in Section A (MCQs), Section B (MSQs), Section C (NAT Numerical Answer Type). 3 hours.",
    mode: "cbt",
    frequency: "Once a year (February)",
    typicalMonths: ["February"],
    officialUrl: "https://jam2025.iitd.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Admissions to M.Sc, M.Sc-PhD dual degree at IITs & IISc. Papers offered: Biotechnology, Chemistry, Economics, Geology, Mathematics, Mathematical Statistics, Physics. (NOTE: IIT JAM has no CS paper)."
  },
  {
    id: "nimcet",
    name: "NIT MCA Common Entrance Test",
    acronym: "NIMCET",
    conductingBody: "Rotating NIT",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["computing", "pure_sciences", "engineering"],
      allowedDegrees: ["bca", "bsc-cs", "bsc-it", "bsc-maths", "bsc-stats", "btech-cse", "btech-it"],
      mandatorySubjects: ["Mathematics / Statistics at 10+2 or Degree level"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 60, reserved: 55 },
      ageRange: {}
    },
    pattern: "120 MCQs: Mathematics (50), Analytical Ability & Logical Reasoning (40), Computer Awareness (20), General English (10). 2 hours.",
    mode: "cbt",
    frequency: "Once a year (June)",
    typicalMonths: ["June"],
    officialUrl: "https://nimcet.admissions.nic.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Premier entrance for 3-year Master of Computer Applications (MCA) across participating National Institutes of Technology."
  },
  {
    id: "gpat",
    name: "Graduate Pharmacy Aptitude Test",
    acronym: "GPAT",
    conductingBody: "National Board of Examinations in Medical Sciences (NBEMS)",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["pharmacy"],
      allowedDegrees: ["bpharm"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {}
    },
    pattern: "125 MCQs (500 marks) testing Pharmaceutical Chemistry, Pharmaceutics, Pharmacognosy, Pharmacology. 3 hours.",
    mode: "cbt",
    frequency: "Once a year (June)",
    typicalMonths: ["June"],
    officialUrl: "https://natboard.edu.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Mandatory national entrance for Master of Pharmacy (M.Pharm) admissions with AICTE/PCI scholarship of ₹12,400/month."
  },
  {
    id: "ceed",
    name: "Common Entrance Examination for Design",
    acronym: "CEED",
    conductingBody: "IIT Bombay",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      ageRange: {}
    },
    pattern: "Part A (CBT aptitude test, screening) + Part B (Design sketch, creativity and visual communication test). 3 hours total.",
    mode: "hybrid",
    frequency: "Once a year (January)",
    typicalMonths: ["January"],
    officialUrl: "https://ceed.iitb.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Qualifying exam for Master of Design (M.Des) and Ph.D. in Design at IISc Bangalore, IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur."
  },
  {
    id: "neet-pg",
    name: "NEET Postgraduate (MD / MS / DNB)",
    acronym: "NEET-PG",
    conductingBody: "National Board of Examinations in Medical Sciences (NBEMS)",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["health_medicine"],
      allowedDegrees: ["mbbs"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: false, // Requires completed CRRI 1-year internship
      minMarks: { general: 50, reserved: 40 },
      ageRange: {}
    },
    pattern: "200 MCQs (800 marks) across Clinical, Para-clinical, and Pre-clinical medical subjects with negative marking. 3.5 hours.",
    mode: "cbt",
    frequency: "Once a year (July / August)",
    typicalMonths: ["July", "August"],
    officialUrl: "https://natboard.edu.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Admissions to 50% All India Quota and 50% State Quota MD/MS/DNB postgraduate medical seats. Includes erstwhile AIIMS PG quota."
  },
  {
    id: "ini-cet",
    name: "Institute of National Importance Combined Entrance Test",
    acronym: "INI-CET",
    conductingBody: "AIIMS New Delhi",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["health_medicine"],
      allowedDegrees: ["mbbs"],
      finalYearStudentsEligible: false,
      minMarks: { general: 55, reserved: 50 }
    },
    pattern: "200 MCQs testing higher order clinical application. 3 hours.",
    mode: "cbt",
    frequency: "Twice a year (May & November sessions)",
    typicalMonths: ["May", "November"],
    officialUrl: "https://aiimsexams.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Admissions to MD, MS, M.Ch (6 years), DM (6 years), and MDS at AIIMS Delhi and other AIIMS, JIPMER Puducherry, NIMHANS Bengaluru, and PGIMER Chandigarh."
  },
  {
    id: "clat-pg",
    name: "Common Law Admission Test (PG - LLM)",
    acronym: "CLAT-PG",
    conductingBody: "Consortium of National Law Universities",
    purpose: "pg_entry",
    eligibilityRules: {
      degreeFamilies: ["law"],
      allowedDegrees: ["llb", "ba-llb", "bba-llb", "bcom-llb"],
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {}
    },
    pattern: "120 objective questions based on Constitutional Law, Jurisprudence, Torts, Contracts, Criminal Law, and International Law. 2 hours.",
    mode: "pen_paper",
    frequency: "Once a year (December)",
    typicalMonths: ["December"],
    officialUrl: "https://consortiumofnlus.ac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Gateway to 1-year LL.M. programs across 24 National Law Universities."
  },

  // ==========================================
  // 3. CIVIL SERVICES & CENTRAL GOVT EXAMS
  // ==========================================
  {
    id: "upsc-cse",
    name: "UPSC Civil Services Examination",
    acronym: "UPSC CSE",
    conductingBody: "Union Public Service Commission (UPSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true, // For prelims; degree marksheet needed for Mains DAF
      ageRange: { min: 21, maxGeneral: 32, maxObc: 35, maxScSt: 37 },
      maxAttempts: { general: 6, obc: 9, sc_st: 99 }
    },
    pattern: "Stage 1: Prelims (GS Paper 1 + CSAT qualifying). Stage 2: Mains (9 descriptive papers). Stage 3: Personality Test (Interview).",
    mode: "pen_paper",
    frequency: "Once a year (Prelims in May/June)",
    typicalMonths: ["May", "June"],
    officialUrl: "https://upsc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Recruitment to Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), Indian Revenue Service (IRS), and Group A/B central civil services."
  },
  {
    id: "upsc-ese",
    name: "UPSC Engineering Services Examination (IES)",
    acronym: "UPSC ESE",
    conductingBody: "Union Public Service Commission (UPSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering"],
      allowedDegrees: ["btech-civil", "btech-mech", "btech-eee", "btech-ece"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: true,
      ageRange: { min: 21, maxGeneral: 30, maxObc: 33, maxScSt: 35 },
      maxAttempts: { general: 99, obc: 99, sc_st: 99 }
    },
    pattern: "Stage 1: Preliminary (500 marks). Stage 2: Main Conventional (600 marks). Stage 3: Personality Test (200 marks).",
    mode: "pen_paper",
    frequency: "Once a year (February Prelims)",
    typicalMonths: ["February"],
    officialUrl: "https://upsc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Group A technical posts in Central Engineering Services: Indian Railway Service of Mechanical/Civil/Electrical Engineers, CPWD, Indian Naval Armament Service, Military Engineer Services."
  },
  {
    id: "upsc-cms",
    name: "UPSC Combined Medical Services Examination",
    acronym: "UPSC CMS",
    conductingBody: "Union Public Service Commission (UPSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["health_medicine"],
      allowedDegrees: ["mbbs"],
      finalYearStudentsEligible: true,
      ageRange: { min: 21, maxGeneral: 32, maxObc: 35, maxScSt: 37 }
    },
    pattern: "Computer-based exam (2 papers of 250 marks each) + Personality Test (100 marks).",
    mode: "cbt",
    frequency: "Once a year (July)",
    typicalMonths: ["July"],
    officialUrl: "https://upsc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Recruitment of Medical Officers in Central Health Services, Indian Railways, New Delhi Municipal Council, and Municipal Corporations."
  },
  {
    id: "upsc-cds",
    name: "Combined Defence Services Examination",
    acronym: "UPSC CDS",
    conductingBody: "Union Public Service Commission (UPSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      ageRange: { min: 19, maxGeneral: 24, maxObc: 24, maxScSt: 24 } // Note: Indian Military limits have NO caste age relaxation
    },
    pattern: "Written examination (English, GK, Elementary Maths for IMA/AFA/INA; English & GK for OTA) + 5-day SSB Interview.",
    mode: "pen_paper",
    frequency: "Twice a year (CDS I in April, CDS II in September)",
    typicalMonths: ["April", "September"],
    officialUrl: "https://upsc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Permanent/Short Service Commission as Commissioned Officer in Indian Army (IMA/OTA), Indian Navy (INA), and Indian Air Force (AFA)."
  },
  {
    id: "ssc-cgl",
    name: "SSC Combined Graduate Level Examination",
    acronym: "SSC CGL",
    conductingBody: "Staff Selection Commission (SSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: false, // Requires degree completed by cutoff date
      ageRange: { min: 18, maxGeneral: 30, maxObc: 33, maxScSt: 35 },
      maxAttempts: { general: 99, obc: 99, sc_st: 99 }
    },
    pattern: "Tier 1: 100 MCQs (200 marks, qualifying). Tier 2: Mathematical Abilities, Reasoning, English, General Awareness + Computer Module & Typing Test.",
    mode: "cbt",
    frequency: "Once a year (September / October)",
    typicalMonths: ["September", "October"],
    officialUrl: "https://ssc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Recruitment to Assistant Section Officer (CSS, MEA, IB, Railway), Income Tax Inspector, Central Excise Inspector, Preventive Officer, and Enforcement Officer."
  },
  {
    id: "ssc-je",
    name: "SSC Junior Engineer Examination",
    acronym: "SSC JE",
    conductingBody: "Staff Selection Commission (SSC)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering", "vocational"],
      allowedDegrees: ["btech-civil", "btech-mech", "btech-eee", "polytechnic-civil", "polytechnic-mech", "polytechnic-eee"],
      finalYearStudentsEligible: false,
      ageRange: { min: 18, maxGeneral: 30, maxObc: 33, maxScSt: 35 }
    },
    pattern: "Paper 1: 200 MCQs (General Intelligence, Reasoning, GA, Core Engineering). Paper 2: 100 Core Engineering CBT questions (300 marks).",
    mode: "cbt",
    frequency: "Once a year (June)",
    typicalMonths: ["June"],
    officialUrl: "https://ssc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Junior Engineers in CPWD, MES, Central Water Commission, and Border Roads Organisation."
  },

  // ==========================================
  // 4. BANKING, INSURANCE & REGULATORY BODIES
  // ==========================================
  {
    id: "ibps-po",
    name: "IBPS Probationary Officer / Management Trainee",
    acronym: "IBPS PO",
    conductingBody: "Institute of Banking Personnel Selection",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: false, // Degree completion required by registration deadline
      ageRange: { min: 20, maxGeneral: 30, maxObc: 33, maxScSt: 35 }
    },
    pattern: "Prelims (100 MCQs: English, Quant, Reasoning) + Mains (200 MCQs + Descriptive Letter/Essay) + Personal Interview.",
    mode: "cbt",
    frequency: "Once a year (Prelims in October, Mains in November)",
    typicalMonths: ["October", "November"],
    officialUrl: "https://ibps.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Recruitment of Officers across 11 Public Sector Banks (Bank of Baroda, PNB, Canara Bank, Union Bank, etc.)."
  },
  {
    id: "sbi-po",
    name: "State Bank of India Probationary Officer",
    acronym: "SBI PO",
    conductingBody: "State Bank of India (SBI)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      ageRange: { min: 21, maxGeneral: 30, maxObc: 33, maxScSt: 35 },
      maxAttempts: { general: 4, obc: 7, sc_st: 99 }
    },
    pattern: "Phase 1: Prelims (100 marks) + Phase 2: Mains (250 marks, objective + descriptive) + Phase 3: Psychometric Test, Group Discussion & Interview (50 marks).",
    mode: "cbt",
    frequency: "Once a year (November - December)",
    typicalMonths: ["November", "December"],
    officialUrl: "https://sbi.co.in/careers",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Flagship executive leadership career in India's largest public sector bank with fast-track promotion to AGM/DGM."
  },
  {
    id: "rbi-grade-b",
    name: "Reserve Bank of India Grade B Officers",
    acronym: "RBI Grade B",
    conductingBody: "Reserve Bank of India Services Board",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: false,
      minMarks: { general: 60, reserved: 50 },
      ageRange: { min: 21, maxGeneral: 30, maxObc: 33, maxScSt: 35 },
      maxAttempts: { general: 6, obc: 99, sc_st: 99 }
    },
    pattern: "Phase 1: 200 marks (General Awareness, Reasoning, English, Quant). Phase 2: 3 Papers (Economic & Social Issues, Descriptive English, Finance & Management). Phase 3: Interview.",
    mode: "cbt",
    frequency: "Once a year (July / September)",
    typicalMonths: ["July", "September"],
    officialUrl: "https://rbi.org.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Premier central banking regulatory career with competitive salary, allowances, and macroeconomic policy influence."
  },
  {
    id: "sebi-grade-a",
    name: "SEBI Grade A Assistant Manager",
    acronym: "SEBI Grade A",
    conductingBody: "Securities and Exchange Board of India",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering", "commerce", "law", "computing", "postgraduate"],
      allowedDegrees: ["btech-cse", "btech-it", "btech-eee", "btech-ece", "llb", "ba-llb", "mba", "mcom", "mca", "ca"],
      finalYearStudentsEligible: false,
      ageRange: { min: 21, maxGeneral: 30, maxObc: 33, maxScSt: 35 }
    },
    pattern: "Phase 1: Online screening (General + Stream specific). Phase 2: Two papers (English descriptive + Stream specialized). Phase 3: Interview.",
    mode: "cbt",
    frequency: "Once a year (July / August)",
    typicalMonths: ["July", "August"],
    officialUrl: "https://sebi.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Regulator of Indian securities & capital markets across General, Legal, Information Technology, Engineering, and Research streams."
  },
  {
    id: "ibps-so-it",
    name: "IBPS Specialist Officer (IT Officer Scale I)",
    acronym: "IBPS SO IT",
    conductingBody: "Institute of Banking Personnel Selection",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering", "computing"],
      allowedDegrees: ["btech-cse", "btech-it", "btech-ece", "btech-eee", "mca", "msc-cs", "msc-it"],
      anyRecognizedGraduate: false,
      finalYearStudentsEligible: false,
      ageRange: { min: 20, maxGeneral: 30, maxObc: 33, maxScSt: 35 }
    },
    pattern: "Prelims (English, Reasoning, Quant) + Mains (Professional Technical IT Knowledge test) + Interview.",
    mode: "cbt",
    frequency: "Once a year (December)",
    typicalMonths: ["December"],
    officialUrl: "https://ibps.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Requires 4-year Engineering/Technology degree in CS/IT/ECE or PG in Computer Science/Applications. General graduates not eligible."
  },

  // ==========================================
  // 5. RAILWAYS, DEFENCE & SCIENTIFIC
  // ==========================================
  {
    id: "rrb-ntpc",
    name: "Railway Recruitment Board NTPC (Graduate Posts)",
    acronym: "RRB NTPC",
    conductingBody: "Railway Recruitment Control Board (RRCB / Indian Railways)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: false,
      ageRange: { min: 18, maxGeneral: 33, maxObc: 36, maxScSt: 38 }
    },
    pattern: "CBT 1 (Screening: 100 questions) + CBT 2 (120 questions) + Typing Skill / Computer Based Aptitude Test (as per post) + Document Verification.",
    mode: "cbt",
    frequency: "Periodic recruitment cycle",
    typicalMonths: ["October", "November"],
    officialUrl: "https://indianrailways.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Posts include Station Master, Goods Train Manager, Commercial Apprentice, Senior Clerk cum Typist."
  },
  {
    id: "afcat",
    name: "Air Force Common Admission Test",
    acronym: "AFCAT",
    conductingBody: "Indian Air Force (IAF)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering", "all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: true,
      minMarks: { general: 60, reserved: 60 },
      ageRange: { min: 20, maxGeneral: 24, maxObc: 24, maxScSt: 24 } // Flying branch 20-24, Ground Duty 20-26
    },
    pattern: "Online test (100 questions, 300 marks: Verbal Ability, Numerical Ability, Reasoning, Military Aptitude, General Awareness) + AFSB Interview.",
    mode: "cbt",
    frequency: "Twice a year (AFCAT 1 in February, AFCAT 2 in August)",
    typicalMonths: ["February", "August"],
    officialUrl: "https://afcat.cdac.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Commissioned officer in Flying Branch and Ground Duty (Technical & Non-Technical) branches of Indian Air Force."
  },
  {
    id: "barc-ocess",
    name: "Bhabha Atomic Research Centre OCES / DGFS",
    acronym: "BARC OCES",
    conductingBody: "Bhabha Atomic Research Centre (BARC / DAE)",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["engineering", "pure_sciences"],
      allowedDegrees: ["btech-mech", "btech-civil", "btech-eee", "btech-ece", "btech-chem", "btech-cse", "msc-physics", "msc-chemistry"],
      finalYearStudentsEligible: true,
      minMarks: { general: 60, reserved: 60 },
      ageRange: { min: 21, maxGeneral: 26, maxObc: 29, maxScSt: 31 }
    },
    pattern: "Online Screening Test (or valid GATE score) + Comprehensive technical interview at BARC Training School.",
    mode: "cbt",
    frequency: "Once a year (March - April)",
    typicalMonths: ["March", "April"],
    officialUrl: "https://barcoces.examinfo.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Direct recruitment as Scientific Officer 'C' in Department of Atomic Energy institutions."
  },

  // ==========================================
  // 6. STATE RECRUITMENT & TEACHING EXAMS
  // ==========================================
  {
    id: "ctet",
    name: "Central Teacher Eligibility Test",
    acronym: "CTET",
    conductingBody: "Central Board of Secondary Education (CBSE)",
    purpose: "eligibility_test",
    eligibilityRules: {
      degreeFamilies: ["education"],
      allowedDegrees: ["bed", "itep", "deled", "bped"],
      finalYearStudentsEligible: true,
      minMarks: { general: 50, reserved: 45 },
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "Paper 1 (Classes I to V: 150 MCQs) and/or Paper 2 (Classes VI to VIII: 150 MCQs). 150 minutes each.",
    mode: "cbt",
    frequency: "Twice a year (January & July)",
    typicalMonths: ["January", "July"],
    officialUrl: "https://ctet.nic.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Mandatory qualification for appointment as teacher in Kendriya Vidyalayas (KVS), Navodaya Vidyalayas (NVS), Central Tibetan Schools, and schools under UTs."
  },
  {
    id: "tnpsc-group1",
    name: "TNPSC Combined Civil Services Examination - I (Group 1)",
    acronym: "TNPSC Group 1",
    conductingBody: "Tamil Nadu Public Service Commission",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      finalYearStudentsEligible: false,
      ageRange: { min: 21, maxGeneral: 34, maxObc: 39, maxScSt: 39 }
    },
    pattern: "Prelims (200 MCQs, 300 marks) + Mains (Paper 1 Tamil eligibility + Papers 2, 3, 4 descriptive) + Interview.",
    mode: "pen_paper",
    frequency: "Once a year",
    typicalMonths: ["July"],
    officialUrl: "https://tnpsc.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Highest state civil services posts: Deputy Collector (RDO), Deputy Superintendent of Police (DSP), Assistant Commissioner of Commercial Taxes, District Registrar."
  },
  {
    id: "state-judicial-service",
    name: "State Judicial Services Examination (Civil Judge Junior Division)",
    acronym: "State Judicial Services",
    conductingBody: "State High Courts & State Public Service Commissions",
    purpose: "govt_job",
    eligibilityRules: {
      degreeFamilies: ["law"],
      allowedDegrees: ["llb", "ba-llb", "bba-llb", "bcom-llb"],
      finalYearStudentsEligible: false,
      ageRange: { min: 21, maxGeneral: 35, maxObc: 38, maxScSt: 40 }
    },
    pattern: "Preliminary Objective Screening + Mains Descriptive Law Papers + Viva Voce.",
    mode: "pen_paper",
    frequency: "Annual / Biennial by respective State",
    typicalMonths: ["May", "October"],
    officialUrl: "https://sci.gov.in",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Direct appointment as Civil Judge / Judicial Magistrate. Some states permit fresh law graduates; others require active bar enrollment (verify specific state notification)."
  },

  // ==========================================
  // 7. PROFESSIONAL LICENSING & FOREIGN BOARDS
  // ==========================================
  {
    id: "aibe",
    name: "All India Bar Examination",
    acronym: "AIBE",
    conductingBody: "Bar Council of India (BCI)",
    purpose: "licence",
    eligibilityRules: {
      degreeFamilies: ["law"],
      allowedDegrees: ["llb", "ba-llb", "bba-llb", "bcom-llb"],
      finalYearStudentsEligible: false, // Must be provisionally enrolled with State Bar Council
      ageRange: {} // NO AGE LIMIT
    },
    pattern: "100 objective questions covering Indian legal statutes, Constitutional Law, IPC, CrPC, CPC, Evidence Act. Qualifying cutoff: 45% (Gen/OBC), 40% (SC/ST).",
    mode: "pen_paper",
    frequency: "Once or twice a year",
    typicalMonths: ["November"],
    officialUrl: "https://allindiabarexamination.com",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Mandatory statutory exam to obtain permanent Certificate of Practice (COP) for practicing advocacy in Indian courts."
  },
  {
    id: "usmle-step1",
    name: "United States Medical Licensing Examination (Step 1 & Step 2 CK)",
    acronym: "USMLE",
    conductingBody: "FSMB & NBME (USA)",
    purpose: "licence",
    eligibilityRules: {
      degreeFamilies: ["health_medicine"],
      allowedDegrees: ["mbbs"],
      finalYearStudentsEligible: true,
      ageRange: {}
    },
    pattern: "Step 1: Pass/Fail CBT testing basic medical sciences. Step 2 CK: Scored clinical knowledge exam (240+ target for residency match).",
    mode: "cbt",
    frequency: "Year-round at Prometric test centres",
    typicalMonths: ["Year-round"],
    officialUrl: "https://usmle.org",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Gateway to US medical residency (ECFMG certification). College must be listed in World Directory of Medical Schools (WDOMS)."
  },
  {
    id: "plab-ukmla",
    name: "Professional and Linguistic Assessments Board / UKMLA",
    acronym: "PLAB / UKMLA",
    conductingBody: "General Medical Council (GMC UK)",
    purpose: "licence",
    eligibilityRules: {
      degreeFamilies: ["health_medicine"],
      allowedDegrees: ["mbbs"],
      mandatorySubjects: ["OET (Grade B) or IELTS (7.5 overall with 7.0 in all bands)"],
      finalYearStudentsEligible: false,
      ageRange: {}
    },
    pattern: "PLAB 1: 180 Single Best Answer questions (CBT). PLAB 2: 16 clinical scenarios OSCE in Manchester, UK.",
    mode: "hybrid",
    frequency: "4 times a year for PLAB 1",
    typicalMonths: ["February", "May", "August", "November"],
    officialUrl: "https://gmc-uk.org",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Pathway for International Medical Graduates to obtain GMC registration and practice medicine in the United Kingdom NHS."
  },
  {
    id: "nclex-rn",
    name: "National Council Licensure Examination for Registered Nurses",
    acronym: "NCLEX-RN",
    conductingBody: "National Council of State Boards of Nursing (NCSBN)",
    purpose: "licence",
    eligibilityRules: {
      degreeFamilies: ["health_allied"],
      allowedDegrees: ["bsc-nursing"],
      finalYearStudentsEligible: false,
      ageRange: {}
    },
    pattern: "Computerized Adaptive Test (CAT) with 85 to 150 questions testing clinical nursing judgment and safety. 5 hours.",
    mode: "cbt",
    frequency: "Year-round booking at Pearson VUE centers",
    typicalMonths: ["Year-round"],
    officialUrl: "https://ncsbn.org/nclex.page",
    lastVerified: "2025-06-15",
    expiresAt: "2025-12-15",
    notes: "Required for RN licensure to work in the USA, Canada, and Australia."
  }
];
