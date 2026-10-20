import { HigherStudy } from "./types";

export const HIGHER_STUDIES_REGISTRY: HigherStudy[] = [
  // =========================================================================
  // DOCTORAL & RESEARCH PROGRAMS (FOR PG / M.TECH / M.SC / POSTGRADUATE GRADUATES)
  // =========================================================================
  {
    id: "phd-cse",
    program: "Doctor of Philosophy (Ph.D.) in Computer Science & Engineering",
    level: "Doctoral",
    durationYears: 4,
    entranceExamIds: ["gate", "ugc-net", "csir-net"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing", "postgraduate"],
      allowedDegreeIds: ["mtech-cse", "mtech-aids", "msc-cs", "mca", "btech-cse"],
      minMarksPercent: 65,
      mandatoryPrerequisites: [
        "Master's degree in Engineering/Technology (M.Tech/M.E.) in CSE/IT, or M.Sc/MCA with high GATE/NET percentile, or 4-year B.Tech with CGPA >= 8.0"
      ]
    },
    fundingOptions: [
      "Ministry of Education (MoE) Institutional Fellowship: ₹37,000/mo (Years 1-2) + ₹42,000/mo (Years 3-5) + HRA",
      "Prime Minister's Research Fellowship (PMRF): ₹70,000 to ₹80,000/month + ₹2 Lakhs annual research grant",
      "Sponsored Industrial Research Fellowships (TCS, Google, Microsoft Research, Intel Labs)"
    ],
    abroadRequirements: {
      gre: true,
      ielts_toefl: "7.0+ IELTS or 100+ TOEFL for top global doctoral programs",
      notes: "Most US and European doctoral positions in CS provide 100% full tuition waiver and guaranteed annual stipend ($28,000 - $42,000/year)."
    },
    topInstitutesIndia: [
      "IISc Bangalore",
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "IIT Kanpur",
      "IIIT Hyderabad",
      "TIFR Mumbai"
    ],
    topDestinationsAbroad: [
      "USA (Carnegie Mellon, MIT, Stanford, UC Berkeley)",
      "Switzerland (ETH Zurich, EPFL)",
      "Singapore (NUS, NTU)",
      "Germany (Max Planck Institute, TU Munich)"
    ],
    meta: {
      sourceUrl: "https://www.iisc.ac.in/admissions/phd",
      retrievedOn: "2026-06-15",
      verifier: "MoE / IISc / IIT Joint Doctoral Guidelines",
      confidence: "high"
    }
  },
  {
    id: "phd-ai-ds",
    program: "Ph.D. in Artificial Intelligence & Computational Data Science",
    level: "Doctoral",
    durationYears: 4,
    entranceExamIds: ["gate", "ugc-net"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing", "pure_sciences", "postgraduate"],
      allowedDegreeIds: ["mtech-cse", "msc-cs", "btech-cse", "btech-aids"],
      minMarksPercent: 65,
      mandatoryPrerequisites: [
        "Postgraduate degree (M.Tech/M.Sc) in Computer Science, Data Science, Artificial Intelligence, or Applied Mathematics with strong algorithmic/ML background"
      ]
    },
    fundingOptions: [
      "AICTE Doctoral Fellowship (ADF): ₹37,000 to ₹42,000/month + contingency grant",
      "National AI Mission Doctoral Grants & NVIDIA Academic Research Awards",
      "Full University Research Assistantship (RA)"
    ],
    abroadRequirements: {
      gre: true,
      ielts_toefl: "7.0+ IELTS / 100+ TOEFL",
      notes: "Research paper publications or strong GitHub open-source repositories significantly enhance admission chances."
    },
    topInstitutesIndia: [
      "IISc Bangalore (CDS / CSA)",
      "IIT Madras (Robert Bosch Centre for Data Science & AI)",
      "IIT Delhi (Yardi School of AI)",
      "IIIT Hyderabad (Kohli Centre on Intelligent Systems)",
      "IIT Hyderabad"
    ],
    topDestinationsAbroad: [
      "USA (Stanford, CMU, Washington, NYU Courant)",
      "UK (Oxford, Cambridge, UCL)",
      "Canada (Mila Montreal, Vector Institute Toronto)"
    ],
    meta: {
      sourceUrl: "https://ai.iitd.ac.in",
      retrievedOn: "2026-06-15",
      verifier: "IIT Delhi Yardi School of AI Framework",
      confidence: "high"
    }
  },
  {
    id: "phd-cyber-security",
    program: "Ph.D. in Distributed Systems & Cybersecurity",
    level: "Doctoral",
    durationYears: 4,
    entranceExamIds: ["gate", "ugc-net"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing", "postgraduate"],
      allowedDegreeIds: ["mtech-cse", "msc-cs", "btech-cse"],
      minMarksPercent: 60,
      mandatoryPrerequisites: [
        "M.Tech / M.E. in Computer Science, Information Security, or Distributed Systems"
      ]
    },
    fundingOptions: [
      "National Cyber Security R&D Fellowship (MeitY Grants)",
      "DRDO Sponsored Advanced Research Fellowship (₹42,000/mo + HRA)",
      "MoE Junior/Senior Research Fellowship"
    ],
    abroadRequirements: {
      gre: false,
      ielts_toefl: "6.5+ IELTS for European labs; 7.0 for US",
      notes: "Focus on zero-trust architectures, hardware security, post-quantum cryptography, and cloud kernel security."
    },
    topInstitutesIndia: [
      "IIT Kanpur (C3iHub Cybersecurity Center)",
      "IIT Madras",
      "IIIT Bangalore",
      "DRDO-DIAT Pune",
      "IIT Roorkee"
    ],
    topDestinationsAbroad: [
      "USA (Purdue CERIAS, CMU CyLab, Georgia Tech)",
      "Israel (Technion, Tel Aviv University)",
      "Netherlands (TU Delft)"
    ],
    meta: {
      sourceUrl: "https://c3ihub.iitk.ac.in",
      retrievedOn: "2026-06-15",
      verifier: "MeitY / IIT Kanpur Cybersecurity Centre",
      confidence: "high"
    }
  },
  {
    id: "phd-pmrf",
    program: "Doctor of Philosophy (Ph.D.) via Prime Minister's Research Fellowship (PMRF)",
    level: "Doctoral",
    durationYears: 4,
    entranceExamIds: ["gate", "csir-net", "ugc-net"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "pure_sciences", "computing", "architecture", "postgraduate"],
      minMarksPercent: 75,
      mandatoryPrerequisites: [
        "Completed M.Tech/M.Sc with high rank, or Direct entry from 4-year B.Tech with CGPA >= 8.0"
      ]
    },
    fundingOptions: [
      "PMRF Fellowship: ₹70,000/month (Year 1 & 2), ₹75,000/month (Year 3), ₹80,000/month (Years 4 & 5)",
      "₹2 Lakhs annual research contingency grant (total ₹10 Lakhs over 5 years)"
    ],
    topInstitutesIndia: ["IISc Bangalore", "IIT Madras", "IIT Bombay", "IIT Delhi", "IIT Kanpur", "IIT Kharagpur"],
    meta: {
      sourceUrl: "https://www.pmrf.in",
      retrievedOn: "2026-06-15",
      verifier: "Ministry of Education PMRF Secretariat",
      confidence: "high"
    }
  },
  {
    id: "rd-scientist-residency",
    program: "Research Associate & Scientist-B Pathway (ISRO, DRDO, C-DAC, CSIR Labs)",
    level: "Doctoral",
    durationYears: 3,
    entranceExamIds: ["gate", "csir-net"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing", "pure_sciences", "postgraduate"],
      allowedDegreeIds: ["mtech-cse", "mtech-mech", "mtech-eee", "msc-cs", "msc-biotech"],
      minMarksPercent: 65,
      mandatoryPrerequisites: [
        "First-class Post-Graduate Degree in Engineering (M.Tech/M.E.) or Ph.D. submitted in relevant domain"
      ]
    },
    fundingOptions: [
      "7th Pay Commission Pay Matrix Level 10 (₹56,100 basic + DA + HRA = ~₹85,000 - ₹1,05,000/month gross)",
      "CSIR Senior Research Associate Pool Officer Grant"
    ],
    topInstitutesIndia: [
      "ISRO Satellite Integration Centres (URSC Bengaluru, VSSC Thiruvananthapuram)",
      "DRDO Labs (CAIR Bengaluru, R&DE Pune, DLRL Hyderabad)",
      "C-DAC Advanced Computing Training School & National Supercomputing Mission Labs",
      "CSIR-National Physical Laboratory (NPL) New Delhi"
    ],
    meta: {
      sourceUrl: "https://www.drdo.gov.in",
      retrievedOn: "2026-06-15",
      verifier: "DRDO / RAC Scientist Recruitment Board",
      confidence: "high"
    }
  },
  {
    id: "executive-phd-tech",
    program: "Executive Ph.D. / Doctor of Business Administration (DBA) in Technology Innovation",
    level: "Doctoral",
    durationYears: 3,
    entranceExamIds: ["gmat", "cat"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "commerce", "computing", "postgraduate"],
      allowedDegreeIds: ["mtech-cse", "mba", "mca", "mtech-mech"],
      minMarksPercent: 60,
      mandatoryPrerequisites: [
        "Postgraduate degree (M.Tech, MBA, MCA, M.Sc) + minimum 3 to 5 years of professional industry experience"
      ]
    },
    fundingOptions: [
      "Corporate tuition sponsorship from employer",
      "Executive tax-deductible educational loan schemes"
    ],
    topInstitutesIndia: ["ISB Hyderabad", "IIM Ahmedabad", "IIT Bombay (SJMSOM)", "XLRI Jamshedpur"],
    meta: {
      sourceUrl: "https://www.isb.edu",
      retrievedOn: "2026-06-15",
      verifier: "ISB / AACSB Executive Standards",
      confidence: "high"
    }
  },
  {
    id: "postdoc-fellowship",
    program: "Post-Doctoral Research Fellowship (PDF) in Advanced Systems",
    level: "Doctoral",
    durationYears: 2,
    entranceExamIds: [],
    eligibilityRules: {
      allowedDegreeFamilies: ["postgraduate", "engineering", "computing", "pure_sciences"],
      mandatoryPrerequisites: [
        "Doctoral degree (Ph.D.) successfully awarded or thesis submitted with peer-reviewed publications"
      ]
    },
    fundingOptions: [
      "SERB National Post-Doctoral Fellowship (N-PDF): ₹55,000/mo + HRA + ₹2 Lakhs/yr research grant",
      "IISc / IIT Institute Post-Doctoral Fellowship (₹65,000 to ₹75,000/month)",
      "Marie Skłodowska-Curie Actions (MSCA) European Fellowships (€4,500 - €5,500/month)"
    ],
    topInstitutesIndia: ["IISc Bangalore", "IIT Bombay", "IIT Delhi", "TIFR Mumbai"],
    topDestinationsAbroad: ["MIT (USA)", "Max Planck Institutes (Germany)", "ETH Zurich (Switzerland)", "Oxford (UK)"],
    meta: {
      sourceUrl: "https://www.serbonline.in",
      retrievedOn: "2026-06-15",
      verifier: "SERB / DST Government of India",
      confidence: "high"
    }
  },

  // =========================================================================
  // POSTGRADUATE MASTER'S PROGRAMS (VALID NEXT LEVEL FOR UNDERGRADUATE GRADUATES)
  // =========================================================================
  {
    id: "mtech-cse-ai",
    program: "M.Tech in Computer Science / Artificial Intelligence & Data Science",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["gate"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing"],
      allowedDegreeIds: ["btech-cse", "btech-it", "btech-ece", "bca", "bsc-cs"],
      minMarksPercent: 60,
      mandatoryPrerequisites: ["4-year Bachelor's degree in Engineering (B.Tech/B.E.) with valid GATE CS or DA score"]
    },
    fundingOptions: [
      "AICTE / MoE PG Scholarship (₹12,400 per month for GATE qualified candidates)",
      "Teaching Assistantship (TA) / Research Assistantship (RA) at IITs/NITs"
    ],
    abroadRequirements: {
      gre: false,
      ielts_toefl: "Not required for Indian IITs/NITs; 6.5+ IELTS for DAAD Germany / NUS Singapore",
      notes: "Direct admission at top IITs through COAP counselling."
    },
    topInstitutesIndia: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IISc Bangalore", "IIIT Hyderabad", "NIT Trichy"],
    topDestinationsAbroad: ["Germany (TU Munich, RWTH Aachen - Tuition Free)", "USA (Carnegie Mellon, Stanford)", "Singapore (NUS, NTU)"],
    meta: {
      sourceUrl: "https://gate2025.iitr.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "MoE / AICTE Norms",
      confidence: "high"
    }
  },
  {
    id: "ms-abroad-cs",
    program: "Master of Science (MS) in Computer Science & Software Engineering (USA / Europe)",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["gre", "ielts", "toefl"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering", "computing", "pure_sciences"],
      allowedDegreeIds: ["btech-cse", "btech-it", "btech-ece", "bca", "bsc-cs"],
      minMarksPercent: 65,
      mandatoryPrerequisites: ["4-year bachelor's degree or 3-year degree with WES evaluation / 1-year bridge course"]
    },
    fundingOptions: [
      "Graduate Research Assistantship (GRA) / Graduate Teaching Assistantship (GTA) with full tuition waiver + monthly stipend ($1,500 - $2,500)",
      "Prodigy Finance / MPower Financing no-cosigner education loans"
    ],
    abroadRequirements: {
      gre: true,
      ielts_toefl: "6.5 - 7.5 IELTS or 90 - 105 TOEFL",
      notes: "USA offers 36-month STEM OPT (work authorization) post-completion."
    },
    topInstitutesIndia: ["IIIT Hyderabad (MS by Research)", "IISc Bangalore"],
    topDestinationsAbroad: ["USA (Purdue, Georgia Tech, UIUC, Texas A&M)", "Germany (TU9 universities)", "Canada (UBC, Toronto, Waterloo)"],
    meta: {
      sourceUrl: "https://www.ets.org/gre",
      retrievedOn: "2025-06-15",
      verifier: "ETS / US Universities International Office",
      confidence: "high"
    }
  },
  {
    id: "mba-general-tech",
    program: "Master of Business Administration (MBA) / PGDM in Tech Management & Product Strategy",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["cat", "xat", "gmat", "cmat"],
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      minMarksPercent: 50
    },
    fundingOptions: [
      "Merit-cum-means institutional scholarships at IIMs",
      "Full 100% collateral-free education loans from SBI Scholar / Canara Bank Vidya Tur"
    ],
    abroadRequirements: {
      gmat: true,
      ielts_toefl: "7.0+ IELTS or 100+ TOEFL",
      workExperienceYears: 3,
      notes: "Top global MBA programs (INSEAD, Harvard, LBS) typically require 3-5 years of post-graduation work experience."
    },
    topInstitutesIndia: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "ISB Hyderabad", "FMS Delhi", "XLRI Jamshedpur"],
    topDestinationsAbroad: ["USA (Harvard, Wharton, Stanford)", "France/Singapore (INSEAD)", "UK (London Business School)"],
    meta: {
      sourceUrl: "https://iimcat.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "IIM Admission Committee",
      confidence: "high"
    }
  },
  {
    id: "mca-program",
    program: "Master of Computer Applications (MCA - 2 Years)",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["nimcet", "cuet-pg", "tancet"],
    eligibilityRules: {
      allowedDegreeFamilies: ["computing", "pure_sciences", "commerce", "engineering"],
      allowedDegreeIds: ["bca", "bsc-cs", "bsc-it", "bsc-maths", "bcom"],
      mandatoryPrerequisites: ["Mathematics at 10+2 level or Degree level"],
      minMarksPercent: 50
    },
    fundingOptions: [
      "State government post-matric scholarship schemes",
      "Institutional merit concessions"
    ],
    topInstitutesIndia: ["NIT Trichy", "NIT Surathkal", "JNU New Delhi", "DU (Delhi University)", "PSG Tech Coimbatore"],
    meta: {
      sourceUrl: "https://nimcet.admissions.nic.in",
      retrievedOn: "2025-06-15",
      verifier: "NIMCET / AICTE Norms",
      confidence: "high"
    }
  },
  {
    id: "mtech-mech-thermal",
    program: "M.Tech in Thermal, Design & Automated Manufacturing Systems",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["gate"],
    eligibilityRules: {
      allowedDegreeFamilies: ["engineering"],
      allowedDegreeIds: ["btech-mech", "btech-aerospace", "btech-automobile"],
      minMarksPercent: 60,
      mandatoryPrerequisites: ["B.Tech in Mechanical, Automobile, or Production Engineering with valid GATE ME score"]
    },
    fundingOptions: [
      "AICTE PG Scholarship (₹12,400/month)",
      "Industry live research project sponsorships"
    ],
    topInstitutesIndia: ["IIT Madras", "IIT Kharagpur", "IIT Roorkee", "NIT Trichy"],
    meta: {
      sourceUrl: "https://gate2025.iitr.ac.in",
      retrievedOn: "2026-06-15",
      verifier: "AICTE / GATE ME Norms",
      confidence: "high"
    }
  },
  {
    id: "md-ms-medical",
    program: "Doctor of Medicine (MD) / Master of Surgery (MS) / DNB",
    level: "PG",
    durationYears: 3,
    entranceExamIds: ["neet-pg", "ini-cet"],
    eligibilityRules: {
      allowedDegreeFamilies: ["health_medicine"],
      allowedDegreeIds: ["mbbs"],
      mandatoryPrerequisites: ["NMC / State Medical Council registration and completed 1-year CRRI internship"]
    },
    fundingOptions: [
      "Mandatory monthly resident junior doctor stipend in all government and recognized medical colleges (₹60,000 - ₹1,10,000/month)"
    ],
    topInstitutesIndia: ["AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore", "KGMU Lucknow", "Madras Medical College"],
    topDestinationsAbroad: ["USA (USMLE Residency - salaried $65k/yr)", "UK (NHS Foundation / Specialty Training - £35k-£50k/yr)"],
    meta: {
      sourceUrl: "https://natboard.edu.in",
      retrievedOn: "2025-06-15",
      verifier: "National Medical Commission (NMC)",
      confidence: "high"
    }
  },
  {
    id: "mph-public-health",
    program: "Master of Public Health (MPH)",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["cuet-pg"],
    eligibilityRules: {
      allowedDegreeFamilies: ["health_medicine", "health_allied", "pharmacy", "pure_sciences", "arts_humanities"],
      minMarksPercent: 50
    },
    fundingOptions: [
      "ICMR fellowship grants",
      "WHO / UNICEF project stipends"
    ],
    topInstitutesIndia: ["TISS Mumbai", "JIPMER Puducherry", "PGIMER Chandigarh", "Public Health Foundation of India (PHFI)"],
    topDestinationsAbroad: ["Johns Hopkins Bloomberg School of Public Health (USA)", "London School of Hygiene & Tropical Medicine (UK)", "Karolinska Institutet (Sweden)"],
    meta: {
      sourceUrl: "https://tiss.edu",
      retrievedOn: "2025-06-15",
      verifier: "TISS / ICMR",
      confidence: "high"
    }
  },
  {
    id: "mdes-design",
    program: "Master of Design (M.Des) in Product, Interaction & Visual Communication",
    level: "PG",
    durationYears: 2,
    entranceExamIds: ["ceed"],
    eligibilityRules: {
      allowedDegreeFamilies: ["all_graduates"],
      minMarksPercent: 55
    },
    fundingOptions: [
      "MoE Design Teaching Assistantship (₹12,400/month at IITs/IISc)",
      "Industry sponsored live project stipends"
    ],
    topInstitutesIndia: ["IDC School of Design, IIT Bombay", "NID Ahmedabad", "Department of Design, IIT Delhi", "CPDM IISc Bangalore"],
    topDestinationsAbroad: ["RCA London (UK)", "Politecnico di Milano (Italy)", "Parsons School of Design (USA)"],
    meta: {
      sourceUrl: "https://ceed.iitb.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "IIT Bombay CEED Office",
      confidence: "high"
    }
  },
  {
    id: "llm-law",
    program: "Master of Laws (LL.M. - 1 Year)",
    level: "PG",
    durationYears: 1,
    entranceExamIds: ["clat-pg", "ailet-pg"],
    eligibilityRules: {
      allowedDegreeFamilies: ["law"],
      allowedDegreeIds: ["llb", "ba-llb", "bba-llb", "bcom-llb"],
      minMarksPercent: 50
    },
    fundingOptions: [
      "UGC Junior Research Fellowship (₹37,000/mo if UGC-NET qualified)",
      "University merit scholarships"
    ],
    topInstitutesIndia: ["NLSIU Bengaluru", "NALSAR Hyderabad", "NLU Delhi", "WBNUJS Kolkata"],
    topDestinationsAbroad: ["University of Oxford (BCL - UK)", "Harvard Law School (USA)", "Cambridge University (UK)"],
    meta: {
      sourceUrl: "https://consortiumofnlus.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "Consortium of NLUs",
      confidence: "high"
    }
  },

  // =========================================================================
  // LATERAL ENTRY / DIPLOMA PROGRESSION (FOR POLYTECHNIC DIPLOMA HOLDERS)
  // =========================================================================
  {
    id: "lateral-entry-btech",
    program: "Bachelor of Technology (B.Tech / B.E. via Lateral Entry to 2nd Year)",
    level: "UG",
    durationYears: 3,
    entranceExamIds: ["tancet", "cuet-pg"],
    eligibilityRules: {
      allowedDegreeFamilies: ["vocational", "engineering"],
      allowedDegreeIds: ["polytechnic-mech", "polytechnic-civil", "polytechnic-eee", "bvoc"],
      minMarksPercent: 45,
      mandatoryPrerequisites: [
        "3-year State Board of Technical Education Diploma in Engineering with minimum 45% aggregate (40% for reserved categories)"
      ]
    },
    fundingOptions: [
      "State Government Post-Matric Fee Reimbursement Schemes",
      "Pragati / Saksham Scholarships for Technical Education"
    ],
    topInstitutesIndia: [
      "PSG College of Technology Coimbatore",
      "College of Engineering Guindy (Anna University)",
      "Jadavpur University Kolkata",
      "COEP Technological University Pune"
    ],
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2026-06-15",
      verifier: "AICTE Lateral Entry Regulations",
      confidence: "high"
    }
  }
];

export function getHigherStudyById(id: string): HigherStudy | undefined {
  return HIGHER_STUDIES_REGISTRY.find(h => h.id === id);
}
