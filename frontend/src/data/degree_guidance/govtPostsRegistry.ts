import { GovPost } from "./types";

export const GOVT_POSTS_REGISTRY: GovPost[] = [
  {
    id: "post-ias",
    post: "Indian Administrative Service (IAS) / District Magistrate",
    department: "Department of Personnel & Training (DoPT) / Cabinet Secretariat",
    recruitingBody: "UPSC",
    examId: "upsc-cse",
    payLevel: "Level 10 (7th CPC: ₹56,100 - ₹1,77,500 basic + DA + allowances)",
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true
    },
    ageLimitRules: { general: 32, obc: 35, sc_st: 37, minAge: 21 },
    attempts: { general: 6, obc: 9, sc_st: 99 },
    level: "central",
    indicativeSalary: {
      minLPA: 10.5,
      maxLPA: 14.5,
      unit: "LPA (CTC equivalent with perks/housing)",
      region: "Pan-India",
      year: 2025,
      source: "7th Central Pay Commission Gazette Notification",
      sourceUrl: "https://dopt.gov.in"
    },
    meta: {
      sourceUrl: "https://upsc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UPSC CSE Official Notification",
      confidence: "high"
    }
  },
  {
    id: "post-ies",
    post: "Assistant Executive Engineer / Indian Engineering Services (IES)",
    department: "Central Engineering Services (CPWD / Railways / MES / CWC)",
    recruitingBody: "UPSC",
    examId: "upsc-ese",
    payLevel: "Level 10 (7th CPC: ₹56,100 basic)",
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering"],
      allowedDegreeIds: ["btech-civil", "btech-mech", "btech-eee", "btech-ece"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 21 },
    level: "central",
    indicativeSalary: {
      minLPA: 10.0,
      maxLPA: 13.5,
      unit: "LPA (Indicative with DA/HRA)",
      region: "Central Govt Deputations",
      year: 2025,
      source: "7th CPC Gazette",
      sourceUrl: "https://dopt.gov.in"
    },
    meta: {
      sourceUrl: "https://upsc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UPSC ESE Notification",
      confidence: "high"
    }
  },
  {
    id: "post-medical-officer",
    post: "Medical Officer / Assistant Division Medical Officer (ADMO)",
    department: "Central Health Services / Indian Railways",
    recruitingBody: "UPSC",
    examId: "upsc-cms",
    payLevel: "Level 10 (7th CPC: ₹56,100 + 20% Non-Practicing Allowance (NPA))",
    eligibilityRules: {
      allowedDegreeFamilies: ["health_medicine"],
      allowedDegreeIds: ["mbbs"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 32, obc: 35, sc_st: 37, minAge: 21 },
    level: "central",
    indicativeSalary: {
      minLPA: 12.0,
      maxLPA: 16.0,
      unit: "LPA (Includes basic + DA + NPA + HRA)",
      region: "Pan-India Central Hospitals",
      year: 2025,
      source: "Ministry of Health & Family Welfare Notification",
      sourceUrl: "https://mohfw.gov.in"
    },
    meta: {
      sourceUrl: "https://upsc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UPSC CMS Notification",
      confidence: "high"
    }
  },
  {
    id: "post-aso-mea",
    post: "Assistant Section Officer (ASO) in Ministry of External Affairs / CSS",
    department: "Ministry of External Affairs / Central Secretariat Service",
    recruitingBody: "SSC",
    examId: "ssc-cgl",
    payLevel: "Level 7 (7th CPC: ₹44,900 - ₹1,42,400 basic)",
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 20 },
    level: "central",
    indicativeSalary: {
      minLPA: 8.5,
      maxLPA: 11.5,
      unit: "LPA (Metro postings; significant foreign allowance on MEA embassy postings)",
      region: "New Delhi / Indian Embassies Worldwide",
      year: 2025,
      source: "SSC CGL Official Notification",
      sourceUrl: "https://ssc.gov.in"
    },
    meta: {
      sourceUrl: "https://ssc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Staff Selection Commission",
      confidence: "high"
    }
  },
  {
    id: "post-junior-engineer",
    post: "Junior Engineer (Civil / Electrical / Mechanical)",
    department: "Central Public Works Department (CPWD) / Military Engineer Services",
    recruitingBody: "SSC",
    examId: "ssc-je",
    payLevel: "Level 6 (7th CPC: ₹35,400 - ₹1,12,400 basic)",
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "vocational"],
      allowedDegreeIds: ["btech-civil", "btech-mech", "btech-eee", "polytechnic-civil", "polytechnic-mech", "polytechnic-eee"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 18 },
    level: "central",
    indicativeSalary: {
      minLPA: 6.5,
      maxLPA: 8.5,
      unit: "LPA",
      region: "Pan-India",
      year: 2025,
      source: "SSC JE Notification",
      sourceUrl: "https://ssc.gov.in"
    },
    meta: {
      sourceUrl: "https://ssc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "SSC JE Official",
      confidence: "high"
    }
  },
  {
    id: "post-bank-po",
    post: "Probationary Officer (Scale I Assistant Manager)",
    department: "Public Sector Banks (SBI / PNB / Bank of Baroda / Canara Bank)",
    recruitingBody: "IBPS / SBI",
    examId: "ibps-po",
    payLevel: "Junior Management Grade Scale I (Basic ₹36,000 + allowances under 12th Bipartite Settlement)",
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 20 },
    level: "central",
    indicativeSalary: {
      minLPA: 8.5,
      maxLPA: 10.5,
      unit: "LPA (Includes leased accommodation & bank benefits)",
      region: "Pan-India",
      year: 2025,
      source: "Indian Banks' Association (IBA) 12th Bipartite Settlement",
      sourceUrl: "https://www.iba.org.in"
    },
    meta: {
      sourceUrl: "https://ibps.in",
      retrievedOn: "2025-06-15",
      verifier: "IBPS Official Notification",
      confidence: "high"
    }
  },
  {
    id: "post-bank-so-it",
    post: "IT Specialist Officer (Scale I)",
    department: "Public Sector Banks",
    recruitingBody: "IBPS",
    examId: "ibps-so-it",
    payLevel: "Scale I Officer (Basic ₹36,000 + allowances)",
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing"],
      allowedDegreeIds: ["btech-cse", "btech-it", "btech-ece", "btech-eee", "mca", "msc-cs", "msc-it"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 20 },
    level: "central",
    indicativeSalary: {
      minLPA: 8.5,
      maxLPA: 10.5,
      unit: "LPA",
      region: "Bank IT Headquarters (Mumbai, Bengaluru, Chennai)",
      year: 2025,
      source: "IBPS SO Notification",
      sourceUrl: "https://ibps.in"
    },
    meta: {
      sourceUrl: "https://ibps.in",
      retrievedOn: "2025-06-15",
      verifier: "IBPS Official",
      confidence: "high"
    }
  },
  {
    id: "post-rbi-grade-b",
    post: "Assistant Manager (Grade 'B' Generalist / DEPR / DSIM)",
    department: "Reserve Bank of India (RBI)",
    recruitingBody: "Reserve Bank of India Services Board",
    examId: "rbi-grade-b",
    payLevel: "RBI Grade B Scale (Basic ₹55,200 with starting gross monthly ~₹1,16,000 + bank quarters)",
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true,
      minMarksPercent: 60
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 21 },
    attempts: { general: 6, obc: 99, sc_st: 99 },
    level: "central",
    indicativeSalary: {
      minLPA: 16.0,
      maxLPA: 22.0,
      unit: "LPA (CTC equivalent with housing in Tier 1 cities)",
      region: "Mumbai / Metro RBI Regional Offices",
      year: 2025,
      source: "RBI Recruitment Advertisement",
      sourceUrl: "https://rbi.org.in"
    },
    meta: {
      sourceUrl: "https://rbi.org.in",
      retrievedOn: "2025-06-15",
      verifier: "Reserve Bank of India Services Board",
      confidence: "high"
    }
  },
  {
    id: "post-sebi-grade-a",
    post: "Assistant Manager (Grade 'A' Officer)",
    department: "Securities and Exchange Board of India (SEBI)",
    recruitingBody: "SEBI",
    examId: "sebi-grade-a",
    payLevel: "SEBI Grade A Scale (Basic ₹44,500 with gross monthly CTC ~₹1,40,000 without accommodation)",
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "commerce", "law", "computing", "postgraduate"],
      allowedDegreeIds: ["btech-cse", "btech-it", "btech-eee", "btech-ece", "llb", "ba-llb", "mba", "mcom", "mca", "ca"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 30, obc: 33, sc_st: 35, minAge: 21 },
    level: "central",
    indicativeSalary: {
      minLPA: 16.5,
      maxLPA: 22.5,
      unit: "LPA (CTC equivalent including market allowance & leased housing)",
      region: "SEBI Bhavan (Mumbai BKC) / Regional Metros",
      year: 2025,
      source: "SEBI Recruitment Notification",
      sourceUrl: "https://sebi.gov.in"
    },
    meta: {
      sourceUrl: "https://sebi.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Securities and Exchange Board of India",
      confidence: "high"
    }
  },
  {
    id: "post-civil-judge",
    post: "Civil Judge Junior Division / Judicial Magistrate First Class",
    department: "State Judicial Services (High Court of respective State)",
    recruitingBody: "State High Court & State PSC",
    examId: "state-judicial-service",
    payLevel: "Junior Civil Judge Scale (Starting basic ₹77,840 as per 2nd National Judicial Pay Commission)",
    eligibilityRules: {
      allowedDegreeFamilies: ["law"],
      allowedDegreeIds: ["llb", "ba-llb", "bba-llb", "bcom-llb"],
      anyRecognizedGraduate: false
    },
    ageLimitRules: { general: 35, obc: 38, sc_st: 40, minAge: 21 },
    level: "state",
    indicativeSalary: {
      minLPA: 14.0,
      maxLPA: 18.0,
      unit: "LPA (Official judicial pay + security + judicial allowances)",
      region: "District & Subordinate Courts",
      year: 2025,
      source: "Second National Judicial Pay Commission (SNJPC) Report",
      sourceUrl: "https://sci.gov.in"
    },
    meta: {
      sourceUrl: "https://sci.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Supreme Court of India / State High Courts",
      confidence: "high"
    }
  },
  {
    id: "post-deputy-collector-tn",
    post: "Deputy Collector / Deputy Superintendent of Police (DSP)",
    department: "Tamil Nadu Revenue & Police Departments",
    recruitingBody: "TNPSC",
    examId: "tnpsc-group1",
    payLevel: "Level 22 of Tamil Nadu Revised Pay Rules (Basic ₹56,100 - ₹2,05,700)",
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      anyRecognizedGraduate: true
    },
    ageLimitRules: { general: 34, obc: 39, sc_st: 39, minAge: 21 },
    level: "state",
    stateName: "Tamil Nadu",
    indicativeSalary: {
      minLPA: 9.5,
      maxLPA: 12.5,
      unit: "LPA",
      region: "Tamil Nadu",
      year: 2025,
      source: "TNPSC Group 1 Notification",
      sourceUrl: "https://tnpsc.gov.in"
    },
    meta: {
      sourceUrl: "https://tnpsc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "TNPSC Official Notification",
      confidence: "high"
    }
  },
  {
    id: "post-assistant-professor",
    post: "Assistant Professor (Colleges & Universities)",
    department: "Higher Education Department / UGC recognized Universities",
    recruitingBody: "State PSCs / Central Universities / UGC",
    examId: "ugc-net",
    payLevel: "Academic Level 10 (7th CPC UGC: Entry pay ₹57,700)",
    eligibilityRules: {
      allowedDegreeFamilies: ["arts_humanities", "commerce", "computing", "education", "law", "pure_sciences", "postgraduate"],
      anyRecognizedGraduate: false,
      minMarksPercent: 55
    },
    ageLimitRules: { general: 99, obc: 99, sc_st: 99, minAge: 22 }, // No upper age limit for Assistant Professor
    level: "central",
    indicativeSalary: {
      minLPA: 9.5,
      maxLPA: 13.0,
      unit: "LPA",
      region: "University Campuses Nationwide",
      year: 2025,
      source: "UGC Regulations on Minimum Qualifications for Appointment of Teachers 2018",
      sourceUrl: "https://ugc.gov.in"
    },
    meta: {
      sourceUrl: "https://ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Statutory Regulations",
      confidence: "high"
    }
  }
];
