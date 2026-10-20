import { DegreeFamily } from "./types";
import { CERTIFICATIONS_REGISTRY } from "./certificationsRegistry";
import { HIGHER_STUDIES_REGISTRY } from "./higherStudiesRegistry";
import { GOVT_POSTS_REGISTRY } from "./govtPostsRegistry";

// Helper to look up cert by ID
const cert = (id: string) => CERTIFICATIONS_REGISTRY.find(c => c.id === id)!;
const hs = (id: string) => HIGHER_STUDIES_REGISTRY.find(h => h.id === id)!;
const gp = (id: string) => GOVT_POSTS_REGISTRY.find(g => g.id === id)!;

export const DEGREE_FAMILIES: Record<string, DegreeFamily> = {
  // ============================================================
  // 1. ENGINEERING & TECHNOLOGY
  // ============================================================
  engineering: {
    id: "engineering",
    name: "Engineering & Technology",
    description: "Professional engineering programs accredited by AICTE and affiliated to central, state, or deemed technical universities.",
    icon: "Cpu",
    defaultRegulator: "AICTE",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 4,
      year1Certificate: "Undergraduate Certificate in Basic Engineering & Applied Sciences (NEP exit)",
      year2Diploma: "Undergraduate Diploma in Engineering Technology (NEP exit)",
      year3Degree: "Bachelor of Science (Engineering) (NEP exit)",
      year4HonoursResearch: "Bachelor of Technology (B.Tech / B.E. with Honours / Research)",
      durationVariants: ["4 Years (Regular)", "3 Years (Lateral Entry for Diploma Holders)"]
    },
    defaultSubjects: [
      "Engineering Mathematics & Calculus",
      "Data Structures & Algorithms",
      "Applied Physics & Mechanics",
      "Object Oriented Programming & System Design",
      "Circuit Theory & Microprocessors",
      "Engineering Economics & Management"
    ],
    defaultSkills: [
      "Algorithmic Problem Solving",
      "System Architecture & Design",
      "Debugging & Code Optimization",
      "CAD/CAE Simulation & Prototyping",
      "Version Control (Git/GitHub)",
      "Technical Documentation"
    ],
    defaultEmployers: [
      "Top Product Tech (Google, Microsoft, Amazon, Adobe)",
      "Global IT Services (TCS, Infosys, Wipro, Cognizant, Accenture)",
      "Core Engineering & Automotive (Tata Motors, L&T, Mahindra, Bosch)",
      "Central Public Sector Undertakings (IOCL, NTPC, ONGC, BHEL, ISRO)"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-software-engineer",
        title: "Software Development Engineer (SDE I)",
        sector: "Information Technology & Software Products",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Java / Python / C++", "Data Structures & Algorithms", "SQL & NoSQL", "REST APIs", "Git"],
        indicativeSalary: {
          minLPA: 6.0,
          maxLPA: 18.0,
          unit: "LPA (CTC in Tier 1 cities)",
          region: "Pan-India / Metro",
          year: 2025,
          source: "NASSCOM Tech Salary Benchmark & AmbitionBox",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Designs, tests, and deploys high-scale software services, backend APIs, and distributed systems.",
        topEmployers: ["Amazon", "Microsoft", "Flipkart", "Infosys", "TCS"],
        linkedCareerId: "software-engineer",
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2025-06-15",
          verifier: "NASSCOM Industry Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-devops-cloud-engineer",
        title: "Cloud & DevOps Engineer",
        sector: "Cloud Infrastructure & Platform Operations",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Linux Shell Scripting", "Docker & Kubernetes", "AWS / Azure", "CI/CD Pipelines", "Terraform"],
        indicativeSalary: {
          minLPA: 6.5,
          maxLPA: 16.0,
          unit: "LPA",
          region: "Bengaluru / Hyderabad / Pune / NCR",
          year: 2025,
          source: "Hays Tech Salary Guide",
          sourceUrl: "https://www.hays.com"
        },
        description: "Automates deployment pipelines, monitors microservices infrastructure, and ensures cloud system uptime and security.",
        topEmployers: ["TCS", "Accenture", "Wipro", "Cognizant", "JPMorgan Chase"],
        linkedCareerId: "devops-engineer",
        meta: {
          sourceUrl: "https://www.hays.com",
          retrievedOn: "2025-06-15",
          verifier: "Hays Asia Tech Report",
          confidence: "high"
        }
      },
      {
        id: "occ-systems-design-engineer",
        title: "Graduate Engineer Trainee (GET - Core & Automation)",
        sector: "Core Manufacturing, Energy & Infrastructure",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering"] },
        skills: ["AutoCAD / SolidWorks", "Thermodynamics / Structural Mechanics", "PLC / SCADA", "Quality Control"],
        indicativeSalary: {
          minLPA: 4.5,
          maxLPA: 9.0,
          unit: "LPA",
          region: "Chennai / Pune / Jamshedpur / Ahmedabad",
          year: 2025,
          source: "Confederation of Indian Industry (CII) Campus Hiring Report",
          sourceUrl: "https://www.cii.in"
        },
        description: "Supervises manufacturing processes, assists senior plant engineers with plant layout, and implements automation workflows.",
        topEmployers: ["L&T", "Tata Motors", "Mahindra & Mahindra", "Reliance Industries", "Bosch India"],
        linkedCareerId: "core-engineer",
        meta: {
          sourceUrl: "https://www.cii.in",
          retrievedOn: "2025-06-15",
          verifier: "CII Industry Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-data-scientist-ai",
        title: "Data Scientist & AI / ML Engineer",
        sector: "Artificial Intelligence & Computational Intelligence",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing", "sciences"] },
        skills: ["Python", "Machine Learning", "PyTorch / TensorFlow", "SQL", "Pandas"],
        indicativeSalary: {
          minLPA: 7.0,
          maxLPA: 20.0,
          unit: "LPA",
          region: "Bengaluru / Hyderabad / Pune / NCR",
          year: 2025,
          source: "NASSCOM Tech Salary Benchmark",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Develops statistical models, machine learning algorithms, and deep neural pipelines for production data products.",
        topEmployers: ["Google", "Microsoft", "Amazon", "Fractal Analytics", "Mu Sigma"],
        linkedCareerId: "data-scientist",
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2025-06-15",
          verifier: "NASSCOM Industry Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-fullstack-developer",
        title: "Full Stack Web & Application Developer",
        sector: "Information Technology & Software Products",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["TypeScript / JavaScript", "React / Next.js", "Node.js", "PostgreSQL", "REST APIs"],
        indicativeSalary: {
          minLPA: 5.5,
          maxLPA: 15.0,
          unit: "LPA",
          region: "Pan-India / Remote",
          year: 2025,
          source: "AmbitionBox Tech Hiring Report",
          sourceUrl: "https://www.ambitionbox.com"
        },
        description: "Builds user-facing web applications, responsive interfaces, and scalable backend microservices.",
        topEmployers: ["Zoho", "Swiggy", "Zomato", "Accenture", "TCS"],
        linkedCareerId: "full-stack-developer",
        meta: {
          sourceUrl: "https://www.ambitionbox.com",
          retrievedOn: "2025-06-15",
          verifier: "Industry Report",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-ies"),
      gp("post-bank-so-it"),
      gp("post-junior-engineer"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("phd-cse"),
      hs("phd-ai-ds"),
      hs("phd-pmrf"),
      hs("rd-scientist-residency"),
      hs("mtech-cse-ai"),
      hs("ms-abroad-cs"),
      hs("mba-general-tech")
    ].filter(Boolean),
    defaultCertifications: [
      cert("aws-saa"),
      cert("azure-az104"),
      cert("cka"),
      cert("six-sigma-green-belt")
    ],
    defaultSwitchPaths: [
      {
        id: "eng-to-product-management",
        fromDegreeFamily: "engineering",
        toOccupationTitle: "Associate Product Manager (APM)",
        typicalDuration: "6 to 9 Months",
        whyFeasible: "Engineers possess the technical systems intuition required to collaborate with developers, needing only user empathy and business metrics upskilling.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Master Product Analytics & Metrics",
            type: "course",
            detail: "Learn North Star metrics, cohort retention, A/B testing, and feature adoption funnels.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Build 2 Live Product Teardowns",
            type: "portfolio",
            detail: "Publish deep-dive Figma prototypes and PRDs (Product Requirement Documents) analyzing real apps like Swiggy, Zerodha, or Notion.",
            estimatedMonths: 3
          },
          {
            step: 3,
            title: "Earn PSPO or Google UX Design Certification",
            type: "cert",
            detail: "Validate understanding of agile sprint backlogs and wireframing.",
            estimatedMonths: 2,
            sourceUrl: "https://www.scrum.org"
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Model Curriculum Guidelines",
      confidence: "high"
    }
  },

  // ============================================================
  // 2. COMPUTING & IT (BCA / B.Sc CS)
  // ============================================================
  computing: {
    id: "computing",
    name: "Computing & IT Applications (BCA / B.Sc CS / IT)",
    description: "3 to 4-year undergraduate programs focused on software development, web frameworks, systems programming, and database administration.",
    icon: "Code",
    defaultRegulator: "UGC",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Office Automation & Web Design (NEP)",
      year2Diploma: "Diploma in Computer Applications (NEP)",
      year3Degree: "Bachelor of Computer Applications (BCA / B.Sc CS)",
      year4HonoursResearch: "BCA (Honours / Research) - 4th Year under NEP 2020",
      durationVariants: ["3 Years (Traditional)", "4 Years (NEP Honours)"]
    },
    defaultSubjects: [
      "Programming in C++, Java, and Python",
      "Relational Database Management Systems (RDBMS)",
      "Web Technologies (HTML, CSS, JavaScript, React)",
      "Computer Networks & Operating Systems",
      "Software Engineering & Agile Methodologies"
    ],
    defaultSkills: [
      "Full-stack Web Development",
      "SQL Query Writing & Database Tuning",
      "API Integration & Testing",
      "Version Control (Git)",
      "Problem Solving & Logic Building"
    ],
    defaultEmployers: [
      "IT Consultancies (TCS Ignite, Wipro WIMS, Cognizant, Infosys)",
      "Digital Agencies & Web Startups",
      "Fintech & E-commerce Software Teams",
      "Banking & Insurance In-house Tech Centers"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-fullstack-dev",
        title: "Full Stack Web Developer",
        sector: "Web & Mobile Applications",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["computing", "engineering"] },
        skills: ["JavaScript / TypeScript", "React / Node.js", "MongoDB / PostgreSQL", "REST APIs", "Tailwind CSS"],
        indicativeSalary: {
          minLPA: 4.5,
          maxLPA: 12.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "NASSCOM IT Workforce Analysis",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Builds client-side user interfaces and server-side backend databases for web and mobile products.",
        topEmployers: ["Zoho", "Freshworks", "TCS", "Cognizant", "Swiggy"],
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2025-06-15",
          verifier: "NASSCOM Industry Report",
          confidence: "high"
        }
      },
      {
        id: "occ-data-analyst",
        title: "Junior Data Analyst",
        sector: "Analytics & Business Intelligence",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["computing", "pure_sciences", "commerce", "engineering"] },
        skills: ["SQL", "Excel / Google Sheets", "Power BI / Tableau", "Python (Pandas)", "Data Cleaning"],
        indicativeSalary: {
          minLPA: 4.2,
          maxLPA: 9.5,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "Analytics India Magazine Survey",
          sourceUrl: "https://analyticsindiamag.com"
        },
        description: "Cleans business datasets, executes SQL queries, and crafts executive KPI dashboards for operational decision-making.",
        topEmployers: ["Mu Sigma", "LatentView", "EY", "KPMG", "Wipro"],
        linkedCareerId: "data-scientist",
        meta: {
          sourceUrl: "https://analyticsindiamag.com",
          retrievedOn: "2025-06-15",
          verifier: "AIM Research",
          confidence: "high"
        }
      },
      {
        id: "occ-qa-automation-engineer",
        title: "Quality Assurance & Test Automation Engineer",
        sector: "Software Quality & Testing",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["computing", "engineering"] },
        skills: ["Selenium", "Postman API Testing", "Java / Python TestNG", "JIRA", "Test Cases"],
        indicativeSalary: {
          minLPA: 4.0,
          maxLPA: 8.5,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "AmbitionBox Tech Salary Index",
          sourceUrl: "https://www.ambitionbox.com"
        },
        description: "Writes automated test scripts for APIs and web platforms to prevent bugs and guarantee software reliability.",
        topEmployers: ["HCL Technologies", "Tech Mahindra", "Capgemini", "Accenture"],
        meta: {
          sourceUrl: "https://www.ambitionbox.com",
          retrievedOn: "2025-06-15",
          verifier: "AmbitionBox Tech Index",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-bank-so-it"),
      gp("post-bank-po"),
      gp("post-aso-mea"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("mca-program"),
      hs("mba-general-tech"),
      hs("ms-abroad-cs")
    ],
    defaultCertifications: [
      cert("google-data-analytics"),
      cert("aws-saa"),
      cert("ms-pl300")
    ],
    defaultSwitchPaths: [
      {
        id: "comp-to-data-science",
        fromDegreeFamily: "computing",
        toOccupationTitle: "Data Scientist / Machine Learning Engineer",
        typicalDuration: "6 to 8 Months",
        whyFeasible: "Computing graduates already possess coding and database skills, requiring only statistics, scikit-learn, and deep learning libraries.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Advanced Statistics & Probability with Python",
            type: "course",
            detail: "Master hypothesis testing, regression analysis, distributions, and Pandas/NumPy.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn Microsoft PL-300 or Databricks Associate",
            type: "cert",
            detail: "Demonstrate enterprise competence in data warehousing and visualization.",
            estimatedMonths: 2,
            sourceUrl: "https://learn.microsoft.com"
          },
          {
            step: 3,
            title: "Deploy 3 End-to-End ML Apps on Streamlit/HuggingFace",
            type: "portfolio",
            detail: "Build predictive models with deployed REST endpoints on GitHub.",
            estimatedMonths: 3
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Curriculum Framework",
      confidence: "high"
    }
  },

  // ============================================================
  // 3. PURE & APPLIED SCIENCES
  // ============================================================
  pure_sciences: {
    id: "pure_sciences",
    name: "Pure & Applied Sciences (B.Sc)",
    description: "3 to 4-year foundational science degrees in Physics, Chemistry, Mathematics, Statistics, Biotechnology, and Life Sciences.",
    icon: "FlaskConical",
    defaultRegulator: "UGC",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 3,
      year1Certificate: "Undergraduate Certificate in Natural Sciences (NEP)",
      year2Diploma: "Undergraduate Diploma in Applied Sciences (NEP)",
      year3Degree: "Bachelor of Science (B.Sc Degree)",
      year4HonoursResearch: "B.Sc (Honours / Research) qualifying for 1-year M.Sc or direct Ph.D.",
      durationVariants: ["3 Years (Traditional)", "4 Years (NEP Research)"]
    },
    defaultSubjects: [
      "Advanced Classical & Modern Theoretical Concepts",
      "Laboratory Instrumentation & Chemical/Physical Analysis",
      "Calculus, Differential Equations & Mathematical Modeling",
      "Scientific Research Methodology & Data Processing",
      "Computational Scientific Programming"
    ],
    defaultSkills: [
      "Quantitative & Analytical Modeling",
      "Laboratory Spectrophotometry, Chromatography & Titration",
      "Statistical Hypothesis Testing & Error Analysis",
      "Scientific Literature Synthesis & Report Writing",
      "Python / R for Scientific Data Processing"
    ],
    defaultEmployers: [
      "R&D Laboratories & Testing Facilities (SGS, TUV, Bureau Veritas)",
      "Pharmaceutical & Chemical Industries (Cipla, Dr. Reddy's, Sun Pharma)",
      "Data Analytics & Market Research Consultancies",
      "Government Scientific Bodies (CSIR, DRDO, ISRO, ICMR, BARC)"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-lab-scientific-analyst",
        title: "Quality Control (QC) & Analytical Chemist / Biologist",
        sector: "Pharmaceuticals, Chemicals & Biotechnology",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["pure_sciences", "pharmacy"] },
        skills: ["HPLC", "GC-MS", "Good Laboratory Practice (GLP)", "Spectroscopy", "SOP Documentation"],
        indicativeSalary: {
          minLPA: 3.5,
          maxLPA: 6.5,
          unit: "LPA",
          region: "Hyderabad / Ahmedabad / Mumbai / Baddi",
          year: 2025,
          source: "Indian Chemical Council & Pharma HR Benchmark",
          sourceUrl: "https://www.indianchemicalcouncil.com"
        },
        description: "Tests chemical and biological samples against pharmacopoeia standards using high-precision chromatography and spectrophotometry.",
        topEmployers: ["Dr. Reddy's Laboratories", "Sun Pharma", "Cipla", "Lupin", "Biocon"],
        meta: {
          sourceUrl: "https://www.indianchemicalcouncil.com",
          retrievedOn: "2025-06-15",
          verifier: "Indian Chemical Council",
          confidence: "high"
        }
      },
      {
        id: "occ-science-data-analyst",
        title: "Quantitative / Risk Analyst",
        sector: "Financial Modeling & Analytics",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["pure_sciences", "engineering", "computing", "commerce"] },
        skills: ["Mathematical Modeling", "Advanced Excel", "R / Python", "Probability & Statistics", "SQL"],
        indicativeSalary: {
          minLPA: 6.0,
          maxLPA: 14.0,
          unit: "LPA",
          region: "Mumbai / Bengaluru / Gurugram",
          year: 2025,
          source: "CRISIL & Financial Benchmark",
          sourceUrl: "https://www.crisil.com"
        },
        description: "Applies mathematical equations, Monte Carlo simulations, and statistical probability distributions to evaluate market risk.",
        topEmployers: ["CRISIL", "ICRA", "Goldman Sachs", "Morgan Stanley", "Fractal Analytics"],
        linkedCareerId: "actuary",
        meta: {
          sourceUrl: "https://www.crisil.com",
          retrievedOn: "2025-06-15",
          verifier: "CRISIL Financial Research",
          confidence: "high"
        }
      },
      {
        id: "occ-science-educator",
        title: "Subject Matter Expert (SME) & Science Content Developer",
        sector: "EdTech, Publishing & Academic Content",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["pure_sciences", "engineering"] },
        skills: ["Pedagogical Content Writing", "Curriculum Design", "LaTeX", "Science Video Explanations"],
        indicativeSalary: {
          minLPA: 4.0,
          maxLPA: 8.0,
          unit: "LPA",
          region: "NCR / Bengaluru / Remote",
          year: 2025,
          source: "EdTech India Industry Review",
          sourceUrl: "https://www.ibef.org"
        },
        description: "Authors high-accuracy curricula, problem sets, and video lesson storyboards for national competitive entrance exams.",
        topEmployers: ["PhysicsWallah", "Allen Career Institute", "Chegg India", "Pearson India"],
        linkedCareerId: "school-teacher",
        meta: {
          sourceUrl: "https://www.ibef.org",
          retrievedOn: "2025-06-15",
          verifier: "IBEF Education Report",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-ias"),
      gp("post-aso-mea"),
      gp("post-bank-po"),
      gp("post-assistant-professor")
    ],
    defaultHigherStudies: [
      hs("phd-pmrf"),
      hs("mba-general-tech"),
      hs("mph-public-health")
    ],
    defaultCertifications: [
      cert("google-data-analytics"),
      cert("swayam-nptel"),
      cert("ms-pl300")
    ],
    defaultSwitchPaths: [
      {
        id: "science-to-data-science",
        fromDegreeFamily: "pure_sciences",
        toOccupationTitle: "Data Analyst / Biostatistician",
        typicalDuration: "6 Months",
        whyFeasible: "Pure science graduates have deep mathematical rigor and laboratory discipline, translating seamlessly into statistical data modeling.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Python for Data Analysis (Pandas, NumPy, Matplotlib)",
            type: "course",
            detail: "Transform spreadsheet data into programmatic statistical pipelines.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn Google Data Analytics Certificate",
            type: "cert",
            detail: "Gain practical experience in SQL databases and Tableau dashboards.",
            estimatedMonths: 2,
            sourceUrl: "https://grow.google"
          },
          {
            step: 3,
            title: "Build 3 Applied Datasets Case Studies",
            type: "portfolio",
            detail: "Publish Kaggle notebooks analyzing clinical trial data, weather patterns, or finance data.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Science Guidelines",
      confidence: "high"
    }
  },

  // ============================================================
  // 4. HEALTHCARE & MEDICINE (MBBS / BDS / AYUSH)
  // ============================================================
  health_medicine: {
    id: "health_medicine",
    name: "Medicine & Clinical Healthcare (MBBS / BDS / AYUSH)",
    description: "5.5-year clinical medical and surgical training including 1-year Compulsory Rotatory Residential Internship (CRRI) governed by NMC, DCI, and NCISM.",
    icon: "Stethoscope",
    defaultRegulator: "NMC",
    defaultLevel: "Professional",
    defaultStructure: {
      durationStandardYears: 5.5,
      durationVariants: ["4.5 Years Academics + 1 Year CRRI Clinical Internship"]
    },
    defaultSubjects: [
      "Human Anatomy, Physiology & Biochemistry",
      "Pathology, Microbiology & Pharmacology",
      "Forensic Medicine & Community Medicine",
      "General Medicine, Paediatrics & Dermatology",
      "General Surgery, Orthopaedics & Obstetrics/Gynaecology"
    ],
    defaultSkills: [
      "Clinical Patient Examination & Differential Diagnosis",
      "Emergency Triage & Basic/Advanced Resuscitation (BLS/ACLS)",
      "Pharmacotherapeutics & Prescription Writing",
      "Surgical Wound Debridement & Suturing",
      "Patient Empathy, Medical Ethics & Medicolegal Protocols"
    ],
    defaultEmployers: [
      "Government Medical College Hospitals & District Hospitals",
      "Corporate Hospital Chains (Apollo, Fortis, Max, Manipal, Narayana Health)",
      "Primary Health Centres (PHC) & Community Health Centres (CHC)",
      "Clinical Research Organizations (IQVIA, Syneos Health)"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-duty-medical-officer",
        title: "Duty Medical Officer (DMO) / Resident Doctor",
        sector: "Hospital Inpatient & Emergency Care",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["health_medicine"], allowedDegreeIds: ["mbbs"] },
        skills: ["Emergency Triage", "ICU Monitoring", "Patient Management", "BLS/ACLS", "Clinical Protocols"],
        indicativeSalary: {
          minLPA: 7.2,
          maxLPA: 12.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "Indian Medical Association (IMA) & Hospital Benchmark",
          sourceUrl: "https://www.ima-india.org"
        },
        description: "Manages hospital wards and emergency casualty cases, stabilizes acute patients, and executes senior consultant treatment plans.",
        topEmployers: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals"],
        linkedCareerId: "doctor",
        meta: {
          sourceUrl: "https://www.ima-india.org",
          retrievedOn: "2025-06-15",
          verifier: "IMA Employment Guidelines",
          confidence: "high"
        }
      },
      {
        id: "occ-clinical-research-physician",
        title: "Clinical Safety Physician / Medical Monitor",
        sector: "Clinical Research & Pharmacovigilance",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["health_medicine"] },
        skills: ["Pharmacovigilance (MedDRA)", "Adverse Event Coding", "GCP Guidelines", "Clinical Protocols"],
        indicativeSalary: {
          minLPA: 8.0,
          maxLPA: 15.0,
          unit: "LPA",
          region: "Bengaluru / Hyderabad / Mumbai",
          year: 2025,
          source: "Indian Society for Clinical Research (ISCR)",
          sourceUrl: "https://www.iscr.org"
        },
        description: "Reviews adverse event reports from global clinical drug trials, evaluates patient safety signals, and files regulatory safety submissions.",
        topEmployers: ["IQVIA", "Parexel", "Novartis Healthcare", "Pfizer India", "Syneos Health"],
        meta: {
          sourceUrl: "https://www.iscr.org",
          retrievedOn: "2025-06-15",
          verifier: "ISCR Industry Report",
          confidence: "high"
        }
      },
      {
        id: "occ-medical-director-healthtech",
        title: "Telemedicine Consultant & HealthTech Clinical Lead",
        sector: "Digital Health & Teleconsultation",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["health_medicine"] },
        skills: ["Teleconsultation Protocols", "Digital Health Records (ABDM)", "Preventive Wellness Counseling"],
        indicativeSalary: {
          minLPA: 7.5,
          maxLPA: 14.0,
          unit: "LPA",
          region: "Metro / Remote",
          year: 2025,
          source: "NASSCOM Digital Health Industry Insights",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Provides verified teleconsultations, reviews clinical algorithms, and ensures quality compliance for digital health platforms.",
        topEmployers: ["Practo", "Apollo 24|7", "Tata 1mg", "MediBuddy", "Pharmeasy"],
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2025-06-15",
          verifier: "NASSCOM Digital Health",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-medical-officer"),
      gp("post-ias"),
      gp("post-deputy-collector-tn")
    ],
    defaultHigherStudies: [
      hs("md-ms-medical"),
      hs("mph-public-health"),
      hs("mba-general-tech")
    ],
    defaultCertifications: [
      cert("bls-acls"),
      cert("nmc-medical-registration"),
      cert("nabh-auditor")
    ],
    defaultSwitchPaths: [
      {
        id: "med-to-healthcare-mgmt",
        fromDegreeFamily: "health_medicine",
        toOccupationTitle: "Hospital Administrator / Healthcare Operations Manager",
        typicalDuration: "12 Months (Executive MBA or MHA)",
        whyFeasible: "Clinical doctors understand patient flows, NABH medical protocols, and surgical OT constraints intuitively, making them exceptional hospital executives.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Complete Certificate in Healthcare Management / NABH Quality Standards",
            type: "course",
            detail: "Learn hospital budgeting, NABH accreditation criteria, supply chain, and medico-legal compliance.",
            estimatedMonths: 4
          },
          {
            step: 2,
            title: "Pursue Executive MBA in Hospital Administration",
            type: "course",
            detail: "Executive programs from institutes like TISS or IIMs designed for practicing clinicians.",
            estimatedMonths: 8,
            sourceUrl: "https://tiss.edu"
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.nmc.org.in",
      retrievedOn: "2025-06-15",
      verifier: "National Medical Commission (NMC)",
      confidence: "high"
    }
  },

  // ============================================================
  // 5. COMMERCE & MANAGEMENT (B.Com / BBA)
  // ============================================================
  commerce: {
    id: "commerce",
    name: "Commerce, Business & Management (B.Com / BBA)",
    description: "3 to 4-year programs covering corporate accounting, taxation, financial markets, business law, marketing, and enterprise management.",
    icon: "Briefcase",
    defaultRegulator: "UGC",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 3,
      year1Certificate: "Undergraduate Certificate in Commerce & Bookkeeping (NEP)",
      year2Diploma: "Undergraduate Diploma in Business Accounting & Taxation (NEP)",
      year3Degree: "Bachelor of Commerce (B.Com) / BBA",
      year4HonoursResearch: "B.Com (Honours with Research) under NEP 2020",
      durationVariants: ["3 Years (Traditional)", "4 Years (NEP Honours)"]
    },
    defaultSubjects: [
      "Financial Accounting & Corporate Reporting",
      "Direct & Indirect Taxation (Income Tax & GST)",
      "Cost & Management Accounting",
      "Corporate Law, Business Law & Auditing",
      "Financial Management & Working Capital",
      "Marketing, Human Resource & Operations Management"
    ],
    defaultSkills: [
      "Financial Statement Analysis & Modeling",
      "GST & TDS Filing Compliance",
      "Advanced Excel (VLOOKUP, Pivot Tables, Macros)",
      "Tally Prime / SAP FICO Accounting",
      "Business Communication & Negotiation"
    ],
    defaultEmployers: [
      "Big 4 Accounting & Audit Firms (Deloitte, PwC, EY, KPMG)",
      "Multinational Banks & Investment Banks (HDFC Bank, ICICI Bank, HSBC, Citi)",
      "Corporate Finance & Accounting Departments",
      "Fintech Startups, Equity Brokerages & Wealth Advisory Firms"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-financial-analyst",
        title: "Financial Analyst / Investment Banking Associate",
        sector: "Banking, Financial Services & Insurance (BFSI)",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["commerce", "engineering", "pure_sciences"] },
        skills: ["Financial Modeling (DCF)", "Valuation", "Advanced Excel", "Bloomberg / FactSet", "Ratio Analysis"],
        indicativeSalary: {
          minLPA: 5.5,
          maxLPA: 14.0,
          unit: "LPA",
          region: "Mumbai / NCR / Bengaluru",
          year: 2025,
          source: "BSE & Financial Institutions Survey",
          sourceUrl: "https://www.bseindia.com"
        },
        description: "Builds financial valuation models, conducts competitor benchmarking, and drafts investment pitch decks for equity research.",
        topEmployers: ["JPMorgan Chase", "Goldman Sachs", "Deloitte", "Nomura", "HDFC Bank"],
        linkedCareerId: "chartered-accountant",
        meta: {
          sourceUrl: "https://www.bseindia.com",
          retrievedOn: "2025-06-15",
          verifier: "BSE Financial Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-corporate-accountant",
        title: "Corporate Accountant & Tax Analyst",
        sector: "Corporate Finance & Taxation",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["commerce"] },
        skills: ["Tally Prime", "GST Returns (GSTR-1, 3B)", "TDS Compliance", "Bank Reconciliation", "MIS Reporting"],
        indicativeSalary: {
          minLPA: 3.6,
          maxLPA: 7.5,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "ICAI Placement Committee Benchmark",
          sourceUrl: "https://www.icai.org"
        },
        description: "Manages day-to-day general ledger accounting, conducts monthly bank reconciliations, and ensures timely GST/TDS filings.",
        topEmployers: ["Reliance Industries", "Tata Sons", "L&T", "Wipro Finance", "Genpact"],
        meta: {
          sourceUrl: "https://www.icai.org",
          retrievedOn: "2025-06-15",
          verifier: "ICAI Placement Statistics",
          confidence: "high"
        }
      },
      {
        id: "occ-digital-marketing-specialist",
        title: "Digital Marketing & Growth Specialist",
        sector: "Marketing & E-Commerce",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["commerce", "arts_humanities", "computing", "all_graduates"] },
        skills: ["Google Ads (PPC)", "Meta Ads Manager", "SEO & Keyword Research", "Google Analytics 4", "Copywriting"],
        indicativeSalary: {
          minLPA: 4.0,
          maxLPA: 9.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "Internet and Mobile Association of India (IAMAI)",
          sourceUrl: "https://www.iamai.in"
        },
        description: "Plans and optimizes paid user acquisition campaigns on search and social channels to maximize return on ad spend (ROAS).",
        topEmployers: ["Nykaa", "Zomato", "GroupM", "Dentsu India", "Amazon India"],
        meta: {
          sourceUrl: "https://www.iamai.in",
          retrievedOn: "2025-06-15",
          verifier: "IAMAI Digital Report",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-rbi-grade-b"),
      gp("post-sebi-grade-a"),
      gp("post-bank-po"),
      gp("post-aso-mea"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("mba-general-tech"),
      hs("llm-law")
    ],
    defaultCertifications: [
      cert("ca-icai"),
      cert("cma-icmai"),
      cert("cs-icsi"),
      cert("cfa"),
      cert("nism-series-viii")
    ],
    defaultSwitchPaths: [
      {
        id: "comm-to-fintech-product",
        fromDegreeFamily: "commerce",
        toOccupationTitle: "Fintech Product Manager",
        typicalDuration: "6 to 9 Months",
        whyFeasible: "Commerce students understand lending, payment gateways, ledger double-entry, and RBI compliance inherently, needing only tech API integration skills.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Learn API Fundamentals & SQL for Product Managers",
            type: "course",
            detail: "Understand how payment gateways (Razorpay, UPI NPCI), core banking APIs, and webhooks function.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Product Requirement Writing & Wireframing (Figma)",
            type: "portfolio",
            detail: "Draft PRDs for financial workflows: e.g. digital KYC onboarding, automated loan disbursement.",
            estimatedMonths: 3
          },
          {
            step: 3,
            title: "Earn Professional Scrum Master (PSM I)",
            type: "cert",
            detail: "Validate agile sprint methodology credentials.",
            estimatedMonths: 1,
            sourceUrl: "https://www.scrum.org"
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Commerce Guidelines",
      confidence: "high"
    }
  },

  // ============================================================
  // 6. LAW & LEGAL STUDIES (LL.B / Integrated Law)
  // ============================================================
  law: {
    id: "law",
    name: "Law & Legal Studies (3-Year LL.B / 5-Year Integrated B.A. LL.B)",
    description: "Statutory legal education programs accredited by the Bar Council of India (BCI) leading to legal practice, judiciary, and corporate counsel.",
    icon: "Scale",
    defaultRegulator: "BCI",
    defaultLevel: "Professional",
    defaultStructure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (Post-Graduation LL.B)", "5 Years (Integrated B.A./B.B.A./B.Com LL.B after 12th)"]
    },
    defaultSubjects: [
      "Constitutional Law & Administrative Law",
      "Law of Contracts & Specific Relief",
      "Indian Penal Code (BNS) & Criminal Procedure (BNSS)",
      "Civil Procedure Code & Law of Evidence (BSA)",
      "Corporate Law, Mergers & Securities Regulations",
      "Intellectual Property Rights & International Law"
    ],
    defaultSkills: [
      "Statutory Interpretation & Legal Case Research",
      "Contract Drafting & Due Diligence",
      "Courtroom Advocacy & Oral Argumentation",
      "Dispute Resolution & Negotiation Strategy",
      "Legal Compliance & Risk Assessment"
    ],
    defaultEmployers: [
      "Tier-1 Corporate Law Firms (Shardul Amarchand, AZB, Khaitan, Trilegal)",
      "Supreme Court, High Courts & District Courts (Senior Advocates)",
      "Corporate In-House Legal Departments (Tata, Reliance, Infosys, ICICI)",
      "LPO (Legal Process Outsourcing) & Compliance Firms"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-corporate-associate",
        title: "Corporate Legal Associate (M&A / General Corporate)",
        sector: "Corporate Law Firms",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["law"] },
        skills: ["Contract Drafting", "Due Diligence", "Companies Act 2013", "FDI & FEMA Guidelines", "Legal Research (SCC Online / Manupatra)"],
        indicativeSalary: {
          minLPA: 9.0,
          maxLPA: 18.0,
          unit: "LPA (Tier-1 law firm entry packages)",
          region: "Mumbai / New Delhi / Bengaluru",
          year: 2025,
          source: "Legally India Industry Salary Report",
          sourceUrl: "https://www.legallyindia.com"
        },
        description: "Drafts commercial agreements, conducts vendor due diligence, and advises corporate boards on regulatory filings.",
        topEmployers: ["Shardul Amarchand Mangaldas", "Cyril Amarchand Mangaldas", "AZB & Partners", "Khaitan & Co", "Trilegal"],
        linkedCareerId: "lawyer",
        meta: {
          sourceUrl: "https://www.legallyindia.com",
          retrievedOn: "2025-06-15",
          verifier: "Legally India Annual Report",
          confidence: "high"
        }
      },
      {
        id: "occ-litigation-advocate",
        title: "Litigation Advocate (Junior Associate to Senior Advocate)",
        sector: "Court Litigation & Trial Practice",
        employerType: "self",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["law"] },
        skills: ["Pleadings Drafting (Writs, Plaints, Bail Applications)", "Oral Advocacy", "Evidence Law", "Client Consultation"],
        indicativeSalary: {
          minLPA: 3.5,
          maxLPA: 8.0,
          unit: "LPA (Starting stipend; scales exponentially with independent retainers)",
          region: "High Courts & District Courts Nationwide",
          year: 2025,
          source: "Bar Council of India Survey",
          sourceUrl: "https://www.barcouncilofindia.org"
        },
        description: "Drafts petitions, represents clients before district courts and High Courts, and assists senior advocates during oral hearings.",
        topEmployers: ["Chambers of Senior Advocates", "Independent Legal Practice", "Advocate Partnerships"],
        linkedCareerId: "lawyer",
        meta: {
          sourceUrl: "https://www.barcouncilofindia.org",
          retrievedOn: "2025-06-15",
          verifier: "Bar Council of India",
          confidence: "high"
        }
      },
      {
        id: "occ-inhouse-legal-counsel",
        title: "In-House Legal & Compliance Officer",
        sector: "Banking, Tech & Corporate Legal",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["law"] },
        skills: ["NDAs & Master Services Agreements", "Data Privacy (DPDP Act)", "Labor Law Compliance", "IPR Trademark Filing"],
        indicativeSalary: {
          minLPA: 6.5,
          maxLPA: 12.0,
          unit: "LPA",
          region: "NCR / Mumbai / Bengaluru",
          year: 2025,
          source: "Society of Indian Law Firms (SILF)",
          sourceUrl: "https://www.silf.org.in"
        },
        description: "Reviews vendor contracts, protects company trademarks, and ensures organizational compliance with statutory regulations.",
        topEmployers: ["HDFC Bank", "Infosys Legal", "Tata Motors", "Flipkart", "Adani Group"],
        meta: {
          sourceUrl: "https://www.silf.org.in",
          retrievedOn: "2025-06-15",
          verifier: "SILF Research",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-civil-judge"),
      gp("post-sebi-grade-a"),
      gp("post-ias"),
      gp("post-aso-mea")
    ],
    defaultHigherStudies: [
      hs("llm-law"),
      hs("mba-general-tech")
    ],
    defaultCertifications: [
      cert("aibe-cop"),
      cert("cyber-law-cert"),
      cert("adr-mediation")
    ],
    defaultSwitchPaths: [
      {
        id: "law-to-data-privacy",
        fromDegreeFamily: "law",
        toOccupationTitle: "Data Protection Officer (DPO) / Tech Policy Lead",
        typicalDuration: "4 to 6 Months",
        whyFeasible: "The enactment of the Digital Personal Data Protection (DPDP) Act creates immense demand for legal minds who understand technical data architecture.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Master DPDP Act 2023 & GDPR Privacy Frameworks",
            type: "course",
            detail: "Deep dive into consent architecture, data principals, cross-border transfers, and penalties.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn CIPP/E or DSCI Certified Privacy Professional (DCPP)",
            type: "cert",
            detail: "Gold standard accreditation for international data protection officers.",
            estimatedMonths: 2,
            sourceUrl: "https://iapp.org"
          },
          {
            step: 3,
            title: "Draft 2 Enterprise Privacy Policy Audits",
            type: "portfolio",
            detail: "Perform mock data compliance audits on real digital consumer applications.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.barcouncilofindia.org",
      retrievedOn: "2025-06-15",
      verifier: "Bar Council of India Statutory Body",
      confidence: "high"
    }
  },

  // ============================================================
  // 7. ARTS, HUMANITIES & SOCIAL SCIENCES
  // ============================================================
  arts_humanities: {
    id: "arts_humanities",
    name: "Arts, Humanities & Social Sciences (B.A. / BSW)",
    description: "3 to 4-year programs in Economics, Political Science, Psychology, Sociology, Journalism, History, and Public Policy fostering critical reasoning and communication.",
    icon: "BookOpen",
    defaultRegulator: "UGC",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 3,
      year1Certificate: "Undergraduate Certificate in Humanities (NEP)",
      year2Diploma: "Undergraduate Diploma in Social Sciences (NEP)",
      year3Degree: "Bachelor of Arts (B.A.)",
      year4HonoursResearch: "B.A. (Honours / Research) qualifying for 1-year Master's",
      durationVariants: ["3 Years (Traditional)", "4 Years (NEP Honours)"]
    },
    defaultSubjects: [
      "Economic Theory & Public Finance",
      "Political Institutions, Governance & International Relations",
      "Social Psychology, Behavioral Dynamics & Counseling",
      "Sociological Systems & Social Research Methodologies",
      "Journalism, Media Ethics & Mass Communication"
    ],
    defaultSkills: [
      "Critical Analysis & Policy Synthesis",
      "Long-form Writing & Editorial Storytelling",
      "Qualitative Survey Design & Field Research",
      "Public Relations & Media Strategy",
      "Stakeholder Communication & Empathy"
    ],
    defaultEmployers: [
      "Public Policy Think Tanks (ORF, CPR, NITI Aayog Consultancies)",
      "Digital Media, Journalism & Broadcasting (The Hindu, Indian Express, BBC)",
      "NGOs, International Development Agencies (UNICEF, UNDP, World Bank projects)",
      "Corporate Communications & Brand Strategy Agencies"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-policy-researcher",
        title: "Public Policy Analyst / Research Associate",
        sector: "Think Tanks & Governance Consultancies",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["arts_humanities", "law", "all_graduates"] },
        skills: ["Policy Brief Drafting", "Qualitative Coding (Atlas.ti)", "Legislative Research", "Data Visualization", "Stakeholder Interviews"],
        indicativeSalary: {
          minLPA: 4.8,
          maxLPA: 10.5,
          unit: "LPA",
          region: "New Delhi / Bengaluru",
          year: 2025,
          source: "Centre for Policy Research & Think Tank Benchmark",
          sourceUrl: "https://cprindia.org"
        },
        description: "Analyzes draft government policies, conducts empirical field studies, and authors evidence-backed briefs for lawmakers and development agencies.",
        topEmployers: ["Observer Research Foundation (ORF)", "Centre for Policy Research (CPR)", "NITI Aayog Fellowships", "KPMG Public Sector"],
        linkedCareerId: "civil-servant",
        meta: {
          sourceUrl: "https://cprindia.org",
          retrievedOn: "2025-06-15",
          verifier: "CPR Policy Report",
          confidence: "high"
        }
      },
      {
        id: "occ-content-communications-lead",
        title: "Content Strategist & Communications Specialist",
        sector: "Corporate Communications & Digital Media",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["arts_humanities", "all_graduates"] },
        skills: ["Editorial Writing", "Brand Narrative", "SEO Optimization", "Social Media Strategy", "Press Releases"],
        indicativeSalary: {
          minLPA: 4.2,
          maxLPA: 8.5,
          unit: "LPA",
          region: "Pan-India / Remote",
          year: 2025,
          source: "Public Relations Consultants Association of India (PRCAI)",
          sourceUrl: "https://prcai.org"
        },
        description: "Crafts corporate whitepapers, handles crisis communications, and leads high-impact organic storytelling across digital platforms.",
        topEmployers: ["Edelman India", "Adfactors PR", "Ogilvy", "Zoho", "Swiggy Brand Team"],
        linkedCareerId: "journalist",
        meta: {
          sourceUrl: "https://prcai.org",
          retrievedOn: "2025-06-15",
          verifier: "PRCAI Report",
          confidence: "high"
        }
      },
      {
        id: "occ-hr-talent-associate",
        title: "Human Resources (HR) & Talent Specialist",
        sector: "Human Resources & Talent Management",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["arts_humanities", "commerce", "all_graduates"] },
        skills: ["Behavioral Interviewing", "Talent Acquisition", "Employee Engagement", "HRIS (Workday/Darwinbox)", "Labor Laws"],
        indicativeSalary: {
          minLPA: 4.0,
          maxLPA: 8.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "SHRM India Talent Acquisition Benchmark",
          sourceUrl: "https://www.shrm.org"
        },
        description: "Sources candidates, designs employee onboarding programs, and implements behavioral retention strategies in organizations.",
        topEmployers: ["TCS", "Accenture", "Amazon India", "Flipkart", "Wipro"],
        meta: {
          sourceUrl: "https://www.shrm.org",
          retrievedOn: "2025-06-15",
          verifier: "SHRM India Research",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-ias"),
      gp("post-aso-mea"),
      gp("post-bank-po"),
      gp("post-deputy-collector-tn"),
      gp("post-assistant-professor")
    ],
    defaultHigherStudies: [
      hs("mba-general-tech"),
      hs("llm-law"),
      hs("mph-public-health")
    ],
    defaultCertifications: [
      cert("google-data-analytics"),
      cert("hubspot-inbound"),
      cert("google-ux-cert")
    ],
    defaultSwitchPaths: [
      {
        id: "arts-to-ux-research",
        fromDegreeFamily: "arts_humanities",
        toOccupationTitle: "UX Researcher (User Experience)",
        typicalDuration: "5 to 7 Months",
        whyFeasible: "Humanities graduates (especially in Psychology, Sociology, and Literature) possess deep empathy and qualitative interview skills, making them ideal UX researchers.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Complete Google UX Design Professional Certificate",
            type: "cert",
            detail: "Learn user journey mapping, wireframing in Figma, and usability testing protocols.",
            estimatedMonths: 3,
            sourceUrl: "https://grow.google"
          },
          {
            step: 2,
            title: "Conduct 2 Real User Usability Research Studies",
            type: "portfolio",
            detail: "Run 10+ user interviews, synthesize empathy maps and affinity diagrams, and document insights.",
            estimatedMonths: 2
          },
          {
            step: 3,
            title: "Build Online UX Portfolio (Notion / Webflow)",
            type: "portfolio",
            detail: "Showcase user research methodology, problem statements, and measurable redesign outcomes.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Humanities Framework",
      confidence: "high"
    }
  },

  // ============================================================
  // 8. VOCATIONAL, DIPLOMA & TECHNICAL TRADES
  // ============================================================
  vocational: {
    id: "vocational",
    name: "Vocational & Polytechnic Diploma (Diploma / B.Voc / ITI)",
    description: "Hands-on, practice-heavy technical programs accredited by State Technical Boards, NCVET, and AICTE offering rapid industry placement and lateral entry to B.Tech.",
    icon: "Wrench",
    defaultRegulator: "NCVET",
    defaultLevel: "Diploma",
    defaultStructure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (Post-10th Polytechnic)", "2 Years (Lateral Entry after 12th/ITI)", "3 Years (B.Voc Degree)"]
    },
    defaultSubjects: [
      "Engineering Drawing, Machine Design & Workshop Technology",
      "Electrical Machines, Power Systems & Instrumentation",
      "Civil Surveying, Building Materials & Construction Practices",
      "CNC Machining, Welding & Industrial Fabrication",
      "Industrial Automation (PLC / SCADA) & Safety Standards"
    ],
    defaultSkills: [
      "Practical Equipment Troubleshooting & Repair",
      "Blueprint Reading & CAD Drafting",
      "Preventive Maintenance & Safety Auditing",
      "PLC Programming & Wiring Harness Assembly",
      "Hands-on Quality Inspection & Precision Measurement"
    ],
    defaultEmployers: [
      "Automobile & Manufacturing Plants (Hyundai, Maruti Suzuki, Tata Motors)",
      "Infrastructure & Construction Giants (L&T Construction, Shapoorji Pallonji)",
      "Public Sector Heavy Industries (BHEL, SAIL, Indian Railways, Metro Rail)",
      "Consumer Electronics & Telecom Service Providers"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-junior-production-engineer",
        title: "Junior Production / Maintenance Engineer",
        sector: "Manufacturing & Heavy Engineering",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["vocational", "engineering"] },
        skills: ["Preventive Maintenance", "Hydraulics & Pneumatics", "5S & Kaizen", "PLC Basics", "Machine Safety"],
        indicativeSalary: {
          minLPA: 3.2,
          maxLPA: 6.0,
          unit: "LPA",
          region: "Sriperumbudur / Sanand / Manesar / Pune",
          year: 2025,
          source: "Automotive Component Manufacturers Association of India (ACMA)",
          sourceUrl: "https://www.acma.in"
        },
        description: "Executes preventive shop-floor machine maintenance, monitors assembly lines, and implements 5S workplace safety.",
        topEmployers: ["Maruti Suzuki", "Hyundai Motor India", "L&T", "Tata Motors", "Bharat Forge"],
        meta: {
          sourceUrl: "https://www.acma.in",
          retrievedOn: "2025-06-15",
          verifier: "ACMA Industry Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-site-supervisor",
        title: "Civil Site Supervisor / Billing Surveyor",
        sector: "Civil Construction & Real Estate",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["vocational", "engineering"] },
        skills: ["Total Station Surveying", "Bar Bending Schedule (BBS)", "AutoCAD", "Concrete Quality Testing", "Site Log"],
        indicativeSalary: {
          minLPA: 3.0,
          maxLPA: 5.5,
          unit: "LPA",
          region: "Pan-India Construction Sites",
          year: 2025,
          source: "Construction Industry Development Council (CIDC)",
          sourceUrl: "https://www.cidc.in"
        },
        description: "Oversees daily concrete pours and steel reinforcement, tracks contractor labor, and verifies site measurement bills.",
        topEmployers: ["L&T Construction", "Shapoorji Pallonji", "Afcons Infrastructure", "DLF"],
        meta: {
          sourceUrl: "https://www.cidc.in",
          retrievedOn: "2025-06-15",
          verifier: "CIDC Guidelines",
          confidence: "high"
        }
      },
      {
        id: "occ-electrical-technician",
        title: "Industrial Electrical & Automation Technician",
        sector: "Power, Utilities & Renewable Energy",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["vocational", "engineering"] },
        skills: ["Switchgear Maintenance", "Solar PV Installation", "Transformer Testing", "Circuit Diagnosis", "Electrical Safety"],
        indicativeSalary: {
          minLPA: 3.2,
          maxLPA: 5.8,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "Skill Council for Green Jobs (SCGJ)",
          sourceUrl: "https://sscgj.in"
        },
        description: "Installs, tests, and maintains high-voltage industrial switchgears, solar power inverters, and electrical distribution panels.",
        topEmployers: ["Tata Power Solar", "Schneider Electric", "Siemens India", "ABB India"],
        meta: {
          sourceUrl: "https://sscgj.in",
          retrievedOn: "2025-06-15",
          verifier: "SCGJ Skill Report",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-junior-engineer"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      {
        id: "btech-lateral-entry",
        program: "B.Tech / B.E. (Lateral Entry directly into 2nd Year / 3rd Semester)",
        level: "UG",
        durationYears: 3,
        entranceExamIds: ["state-cet"],
        eligibilityRules: {
          allowedDegreeFamilies: ["vocational"],
          minMarksPercent: 45
        },
        fundingOptions: [
          "State government tuition fee waiver (PMKVY / State Post-Matric)",
          "Institutional lateral entry scholarships"
        ],
        topInstitutesIndia: ["State Government Engineering Colleges (TNEA, DTE Maharashtra, UPSEE Lateral)"],
        meta: {
          sourceUrl: "https://www.aicte-india.org",
          retrievedOn: "2025-06-15",
          verifier: "AICTE Lateral Entry Regulations",
          confidence: "high"
        }
      },
      hs("mtech-cse-ai")
    ],
    defaultCertifications: [
      cert("autodesk-autocad"),
      cert("nsdc-pmkvy"),
      cert("swayam-nptel")
    ],
    defaultSwitchPaths: [
      {
        id: "voc-to-cad-bim",
        fromDegreeFamily: "vocational",
        toOccupationTitle: "BIM Modeler (Building Information Modeling) & CAD Specialist",
        typicalDuration: "4 to 6 Months",
        whyFeasible: "Diploma holders already understand engineering drawings and physical components, making software-based 3D BIM modeling a high-paying transition.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Master Revit Architecture & Navisworks",
            type: "course",
            detail: "Learn 3D architectural, structural, and MEP modeling with clash detection.",
            estimatedMonths: 3
          },
          {
            step: 2,
            title: "Earn Autodesk Certified Professional in Revit",
            type: "cert",
            detail: "Industry standard certification for international engineering consultancies.",
            estimatedMonths: 1,
            sourceUrl: "https://www.autodesk.com"
          },
          {
            step: 3,
            title: "Assemble 3 Commercial BIM Project Models",
            type: "portfolio",
            detail: "Create detailed BIM models with schedule takeoffs and rendering sheets.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.ncvet.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "NCVET Regulatory Standards",
      confidence: "high"
    }
  },

  // ============================================================
  // 9. DESIGN & CREATIVE ARTS (B.Des / B.Arch / BFA)
  // ============================================================
  design_creative: {
    id: "design_creative",
    name: "Design, Architecture & Creative Arts (B.Des / B.Arch / BFA)",
    description: "4 to 5-year studio-intensive professional programs in Product, Industrial, Fashion, Interaction, Architecture, and Visual Communication.",
    icon: "Palette",
    defaultRegulator: "AICTE",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years (B.Des / BFA)", "5 Years (B.Arch under COA)"]
    },
    defaultSubjects: [
      "Design Thinking & User Research",
      "Visual Composition, Typography & Color Theory",
      "Digital Prototyping & CAD/3D Modeling",
      "Materials, Ergonomics & Manufacturing Processes",
      "Design Portfolio & Studio Capstone"
    ],
    defaultSkills: [
      "User Interface & Experience (UI/UX) Design",
      "Wireframing & Interactive Prototyping (Figma)",
      "Design Systems & Component Architecture",
      "3D Rendering & Material Exploration",
      "Design Critique & Storytelling"
    ],
    defaultEmployers: [
      "Global Design Studios (IDEO, Frog Design, Elephant Design)",
      "Tech Product Companies (Google, Swiggy, Zomato, Razorpay)",
      "Apparel & Fashion Houses (Aditya Birla Fashion, Arvind Brands)",
      "Automotive & Consumer Electronics Studios"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-product-uiux-designer",
        title: "Product Designer / UI-UX Lead",
        sector: "Digital Tech & Product Design",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["design_creative", "computing", "arts_humanities"] },
        skills: ["Figma / FigJam", "User Journey Mapping", "Design Systems", "Usability Testing", "Wireframing"],
        indicativeSalary: {
          minLPA: 7.0,
          maxLPA: 16.0,
          unit: "LPA",
          region: "Bengaluru / Gurugram / Mumbai",
          year: 2025,
          source: "India Design Council & Glassdoor Tech Benchmark",
          sourceUrl: "https://indiadesigncouncil.org"
        },
        description: "Designs consumer-facing digital applications, establishes unified design systems, and runs user testing sprints.",
        topEmployers: ["Swiggy", "Flipkart", "CRED", "Microsoft India", "Zoho"],
        meta: {
          sourceUrl: "https://indiadesigncouncil.org",
          retrievedOn: "2025-06-15",
          verifier: "India Design Council",
          confidence: "high"
        }
      },
      {
        id: "occ-industrial-designer",
        title: "Industrial / Hardware Product Designer",
        sector: "Consumer Electronics & Automotive",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["design_creative", "engineering"] },
        skills: ["Rhino / SolidWorks", "Rapid Prototyping", "Design for Manufacturing", "Ergonomics"],
        indicativeSalary: {
          minLPA: 5.5,
          maxLPA: 12.0,
          unit: "LPA",
          region: "Pune / Chennai / NCR",
          year: 2025,
          source: "CII National Design Committee",
          sourceUrl: "https://www.cii.in"
        },
        description: "Develops physical forms, ergonomic enclosures, and manufacturing blueprints for hardware and appliances.",
        topEmployers: ["Tata Elxsi", "Titan Company", "Godrej Design Lab", "Havells"],
        meta: {
          sourceUrl: "https://www.cii.in",
          retrievedOn: "2025-06-15",
          verifier: "CII Design Summit",
          confidence: "high"
        }
      },
      {
        id: "occ-visual-communication-designer",
        title: "Visual Brand & Communication Designer",
        sector: "Creative Agencies & Media",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["design_creative", "arts_humanities"] },
        skills: ["Adobe Illustrator & Photoshop", "Brand Identity", "Motion Graphics", "Typography"],
        indicativeSalary: {
          minLPA: 4.8,
          maxLPA: 10.0,
          unit: "LPA",
          region: "Mumbai / Bengaluru / Delhi NCR",
          year: 2025,
          source: "Advertising Agencies Association of India",
          sourceUrl: "https://aaai.in"
        },
        description: "Crafts corporate visual identities, marketing collateral, and motion visual storytelling for global consumer brands.",
        topEmployers: ["Ogilvy", "Dentsu Creative", "Schbang", "Blink Digital"],
        meta: {
          sourceUrl: "https://aaai.in",
          retrievedOn: "2025-06-15",
          verifier: "AAAI Report",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-aso-mea"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("mdes-design"),
      hs("mba-general-tech")
    ],
    defaultCertifications: [
      cert("google-ux-cert"),
      cert("autodesk-autocad"),
      cert("coa-registration")
    ],
    defaultSwitchPaths: [
      {
        id: "des-to-frontend",
        fromDegreeFamily: "design_creative",
        toOccupationTitle: "Design Technologist / Creative Front-End Developer",
        typicalDuration: "4 to 6 Months",
        whyFeasible: "Designers with Figma mastery bridge the gap into React and CSS effortlessly by writing production code for their own wireframes.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Learn Modern HTML5, TailwindCSS & Modern JavaScript",
            type: "course",
            detail: "Translate Figma auto-layout into responsive CSS flexbox and grid components.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Build Interactive React Component Library",
            type: "portfolio",
            detail: "Create and publish a live Storybook component design system on GitHub.",
            estimatedMonths: 2
          },
          {
            step: 3,
            title: "Deploy 2 Complete Web Applications on Vercel",
            type: "portfolio",
            detail: "Showcase responsive web typography, micro-interactions, and accessible web UI.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Design & Architecture Board",
      confidence: "high"
    }
  },

  // ============================================================
  // 10. AGRICULTURE & ALLIED SCIENCES (B.Sc Agri / Forestry)
  // ============================================================
  agriculture: {
    id: "agriculture",
    name: "Agriculture, Horticulture & Food Science (B.Sc Agri / B.Tech Agri)",
    description: "4-year multidisciplinary scientific programs governed by the Indian Council of Agricultural Research (ICAR).",
    icon: "Wheat",
    defaultRegulator: "ICAR",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years (Academics + RAWE Rural Agricultural Work Experience)"]
    },
    defaultSubjects: [
      "Agronomy, Soil Science & Plant Nutrition",
      "Genetics, Plant Breeding & Seed Technology",
      "Plant Pathology, Entomology & Crop Protection",
      "Agricultural Economics, Agribusiness & Farm Management",
      "Agricultural Engineering & Precision Irrigation Systems"
    ],
    defaultSkills: [
      "Soil Fertility & Nutrient Testing",
      "Crop Disease Diagnosis & Integrated Pest Management (IPM)",
      "Agribusiness Supply Chain Management",
      "Precision Drone & Sensor-based Agriculture",
      "Farmer Extension & Field Trials"
    ],
    defaultEmployers: [
      "Agrochemical & Seed Majors (Bayer CropScience, Syngenta, UPL, Corteva)",
      "Nationalized Banks & NABARD (Agricultural Officers)",
      "Agritech Startups (DeHaat, Ninjacart, AgroStar, CropIn)",
      "Food Processing Conglomerates (ITC Agri, Nestlé India, Godrej Agrovet)"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-agronomist-advisor",
        title: "Agronomist / Precision Farming Specialist",
        sector: "AgriTech & Crop Science",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["agriculture", "pure_sciences"] },
        skills: ["Soil Chemistry", "Crop Yield Modeling", "Fertilizer Schedules", "IoT Soil Sensors"],
        indicativeSalary: {
          minLPA: 4.5,
          maxLPA: 8.5,
          unit: "LPA",
          region: "Pan-India Agri Corridors",
          year: 2025,
          source: "ICAR Placement Cell & Agribusiness Report",
          sourceUrl: "https://icar.org.in"
        },
        description: "Advises corporate farms on optimal seed selection, soil fertility, irrigation scheduling, and pest protection.",
        topEmployers: ["Bayer CropScience", "Syngenta India", "UPL Limited", "DeHaat"],
        meta: {
          sourceUrl: "https://icar.org.in",
          retrievedOn: "2025-06-15",
          verifier: "ICAR Directorate",
          confidence: "high"
        }
      },
      {
        id: "occ-agribusiness-manager",
        title: "Agribusiness Supply Chain & Procurement Executive",
        sector: "Food Processing & Agri Logistics",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["agriculture", "commerce"] },
        skills: ["Farmgate Procurement", "Cold Chain Logistics", "Mandi Operations", "Quality Grading"],
        indicativeSalary: {
          minLPA: 5.0,
          maxLPA: 10.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2025,
          source: "Federation of Indian Chambers of Commerce and Industry (FICCI)",
          sourceUrl: "https://www.ficci.in"
        },
        description: "Manages farm-to-warehouse crop procurement, quality testing, and pricing negotiations across rural mandis.",
        topEmployers: ["ITC Foods", "Adani Wilmar", "Ninjacart", "WayCool Foods"],
        meta: {
          sourceUrl: "https://www.ficci.in",
          retrievedOn: "2025-06-15",
          verifier: "FICCI Agri Division",
          confidence: "high"
        }
      },
      {
        id: "occ-credit-analyst-agri",
        title: "Rural Credit & Microfinance Analyst",
        sector: "Rural Banking & NBFCs",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["agriculture", "commerce"] },
        skills: ["Kisan Credit Card (KCC) Appraisal", "Crop Insurance (PMFBY)", "Rural Lending Risk"],
        indicativeSalary: {
          minLPA: 4.5,
          maxLPA: 9.0,
          unit: "LPA",
          region: "Semi-Urban / Rural Branches",
          year: 2025,
          source: "IBA Rural Banking Report",
          sourceUrl: "https://www.iba.org.in"
        },
        description: "Underwrites rural farmer loans, evaluates crop collateral viability, and ensures agricultural subsidy compliance.",
        topEmployers: ["HDFC Bank Rural", "ICICI Bank", "Samunnati Agri Value", "Federal Bank"],
        meta: {
          sourceUrl: "https://www.iba.org.in",
          retrievedOn: "2025-06-15",
          verifier: "IBA Rural Banking",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-bank-po"),
      gp("post-deputy-collector-tn"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("mba-general-tech"),
      hs("phd-pmrf")
    ],
    defaultCertifications: [
      cert("google-data-analytics"),
      cert("swayam-nptel"),
      cert("nsdc-pmkvy")
    ],
    defaultSwitchPaths: [
      {
        id: "agri-to-agritech",
        fromDegreeFamily: "agriculture",
        toOccupationTitle: "AgriTech Product Manager & Data Specialist",
        typicalDuration: "6 Months",
        whyFeasible: "Agricultural graduates understand farmer psychology, weather risk, and field dynamics that software engineers cannot easily replicate.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Learn SQL & Tableau for Agricultural Yield Analytics",
            type: "course",
            detail: "Analyze weather station data, satellite vegetation indices (NDVI), and market prices.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn Google Data Analytics Professional Certificate",
            type: "cert",
            detail: "Master data cleaning, database querying, and dashboard reporting.",
            estimatedMonths: 2,
            sourceUrl: "https://grow.google"
          },
          {
            step: 3,
            title: "Publish Agri-Yield Prediction Case Study on Kaggle",
            type: "portfolio",
            detail: "Demonstrate data-driven farm advisory logic for smallholder farmers.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "Indian Council of Agricultural Research",
      confidence: "high"
    }
  },

  // ============================================================
  // 11. EDUCATION & PEDAGOGY (B.Ed / D.El.Ed / M.Ed)
  // ============================================================
  education: {
    id: "education",
    name: "Education, Teaching & Pedagogy (B.Ed / D.El.Ed)",
    description: "Professional teacher education programs recognized by the National Council for Teacher Education (NCTE).",
    icon: "GraduationCap",
    defaultRegulator: "NCTE",
    defaultLevel: "Professional",
    defaultStructure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years (Post-Graduation B.Ed)", "4 Years (Integrated ITEP after 12th)"]
    },
    defaultSubjects: [
      "Childhood & Growing Up (Child Development Psychology)",
      "Contemporary India & Educational Policies (NEP 2020)",
      "Pedagogy of School Subjects (Sciences, Mathematics, Social Sciences)",
      "Assessment for Learning & Educational Evaluation",
      "Educational Technology & ICT in Classrooms"
    ],
    defaultSkills: [
      "Curriculum Lesson Planning & Instructional Design",
      "Differentiated Classroom Instruction",
      "Student Formative Assessment & Grading",
      "EdTech LMS Platform Operations (Google Classroom, Canvas)",
      "Inclusive Education & Behavioral Guidance"
    ],
    defaultEmployers: [
      "Central Government Schools (Kendriya Vidyalaya KVS, Navodaya NVS)",
      "Private International & CBSE/ICSE Schools",
      "EdTech Platforms & Curriculum Design Companies (Khan Academy, Cuemath)",
      "Teacher Training Institutes & State Education Boards"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-school-educator",
        title: "Senior School Educator (TGT / PGT Specialist)",
        sector: "School Education & K-12",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["education", "pure_sciences", "arts_humanities"] },
        skills: ["CBSE / ICSE Pedagogy", "Classroom Management", "Lesson Planning", "STEM Demonstrations"],
        indicativeSalary: {
          minLPA: 4.2,
          maxLPA: 8.5,
          unit: "LPA",
          region: "Metro & Tier 1 Cities",
          year: 2025,
          source: "National Education Barometer",
          sourceUrl: "https://ncte.gov.in"
        },
        description: "Delivers conceptual classroom instruction, mentors students for board examinations, and evaluates lab experiments.",
        topEmployers: ["Delhi Public School (DPS)", "The Heritage School", "Oakridge International", "DAV Schools"],
        meta: {
          sourceUrl: "https://ncte.gov.in",
          retrievedOn: "2025-06-15",
          verifier: "NCTE Framework",
          confidence: "high"
        }
      },
      {
        id: "occ-instructional-designer",
        title: "Instructional Designer / E-Learning Specialist",
        sector: "Corporate EdTech & E-Learning",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["education", "arts_humanities", "computing"] },
        skills: ["ADDIE Model", "Articulate Storyline", "LMS Administration", "Microlearning Scriptwriting"],
        indicativeSalary: {
          minLPA: 5.5,
          maxLPA: 12.0,
          unit: "LPA",
          region: "Remote / Bengaluru / NCR",
          year: 2025,
          source: "Association for Talent Development (ATD)",
          sourceUrl: "https://td.org"
        },
        description: "Designs structured e-learning modules, writes interactive simulation storyboards, and manages corporate LMS courseware.",
        topEmployers: ["Coursera", "upGrad", "Tata Interactive Systems", "Skillsoft"],
        meta: {
          sourceUrl: "https://td.org",
          retrievedOn: "2025-06-15",
          verifier: "ATD Learning Benchmark",
          confidence: "high"
        }
      },
      {
        id: "occ-curriculum-developer",
        title: "K-12 Curriculum & Assessment Developer",
        sector: "Educational Publishing & EdTech",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["education", "pure_sciences", "arts_humanities"] },
        skills: ["Blooms Taxonomy", "Item Writing", "NEP Pedagogical Framework", "Textbook Authoring"],
        indicativeSalary: {
          minLPA: 4.8,
          maxLPA: 9.5,
          unit: "LPA",
          region: "New Delhi / Chennai / Mumbai",
          year: 2025,
          source: "Federation of Educational Publishers in India",
          sourceUrl: "https://fepi.in"
        },
        description: "Authors school textbook chapters, designs experiential activity workbooks, and creates standardized question banks.",
        topEmployers: ["Oxford University Press", "Cambridge University Press", "Orient Blackswan", "Lead School"],
        meta: {
          sourceUrl: "https://fepi.in",
          retrievedOn: "2025-06-15",
          verifier: "FEPI Industry Data",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-assistant-professor"),
      gp("post-ias"),
      gp("post-aso-mea")
    ],
    defaultHigherStudies: [
      hs("mba-general-tech"),
      hs("phd-pmrf")
    ],
    defaultCertifications: [
      cert("swayam-nptel"),
      cert("google-ux-cert"),
      cert("nsdc-pmkvy")
    ],
    defaultSwitchPaths: [
      {
        id: "edu-to-corporate-training",
        fromDegreeFamily: "education",
        toOccupationTitle: "Corporate Learning & Development (L&D) Partner",
        typicalDuration: "4 to 6 Months",
        whyFeasible: "Teachers possess mastery over learning psychology and presentation, translating smoothly into corporate adult training.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Study Corporate Competency Mapping & Kirkpatrick Evaluation",
            type: "course",
            detail: "Understand how business training ROI is evaluated at reaction, learning, and business impact levels.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn Certified ScrumMaster (PSM I) or Agile Trainer Credentials",
            type: "cert",
            detail: "Master agile facilitation and sprint retrospective coaching.",
            estimatedMonths: 1,
            sourceUrl: "https://www.scrum.org"
          },
          {
            step: 3,
            title: "Develop 2 Employee Onboarding Training Blueprints",
            type: "portfolio",
            detail: "Create complete slide decks, facilitator guides, and interactive role-play modules.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://ncte.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Council for Teacher Education",
      confidence: "high"
    }
  },

  // ============================================================
  // 12. HOSPITALITY & TOURISM (BHM / BBA Tourism)
  // ============================================================
  hospitality: {
    id: "hospitality",
    name: "Hospitality, Hotel Management & Tourism (BHM / BBA Tourism)",
    description: "3 to 4-year service-management programs governed by NCHMCT and AICTE covering culinary arts, front office, guest relations, and tourism.",
    icon: "Utensils",
    defaultRegulator: "NCHMCT",
    defaultLevel: "UG",
    defaultStructure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (B.Sc Hospitality)", "4 Years (BHMCT under AICTE)"]
    },
    defaultSubjects: [
      "Front Office Operations & Revenue Management",
      "Food & Beverage Service & Bar Operations",
      "Culinary Arts, Food Production & Nutrition",
      "Accommodation Operations & Housekeeping Management",
      "Hospitality Sales, Marketing & Event Management"
    ],
    defaultSkills: [
      "Guest Relationship Management & Crisis De-escalation",
      "Hotel Property Management Systems (Opera PMS)",
      "Menu Engineering & Food Cost Control",
      "Corporate Event Planning & Banquet Coordination",
      "Cross-cultural Etiquette & Multilingual Communication"
    ],
    defaultEmployers: [
      "Luxury Hotel Chains (Taj / IHCL, Marriott International, Oberoi Hotels, ITC Hotels)",
      "Airlines & Aviation Services (Emirates, Qatar Airways, IndiGo - Cabin Crew & Ground Ops)",
      "Luxury Cruise Lines (Royal Caribbean, Carnival)",
      "Corporate Event Management Companies"
    ],
    defaultPrivateCareers: [
      {
        id: "occ-hotel-management-trainee",
        title: "Management Trainee (Hotel Operations / F&B)",
        sector: "Luxury Hospitality & Resorts",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["hospitality", "commerce", "arts_humanities"] },
        skills: ["Opera PMS", "Food Safety (FSSAI)", "VIP Guest Protocol", "Banquet Operations"],
        indicativeSalary: {
          minLPA: 3.8,
          maxLPA: 7.2,
          unit: "LPA",
          region: "Metros & Resort Destinations",
          year: 2025,
          source: "Hotel Association of India (HAI)",
          sourceUrl: "https://hotelassociationofindia.com"
        },
        description: "Rotates across Front Office, Housekeeping, and F&B to oversee guest experiences, staff rostering, and revenue KPIs.",
        topEmployers: ["IHCL (Taj Group)", "The Oberoi Group", "Marriott International", "ITC Hotels"],
        meta: {
          sourceUrl: "https://hotelassociationofindia.com",
          retrievedOn: "2025-06-15",
          verifier: "HAI Industry Standards",
          confidence: "high"
        }
      },
      {
        id: "occ-event-banquet-manager",
        title: "Corporate Event & Wedding Operations Manager",
        sector: "Events & MICE (Meetings, Incentives, Conferences, Exhibitions)",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["hospitality", "commerce", "arts_humanities"] },
        skills: ["Vendor Negotiation", "AV Production Coordination", "Crowd Safety", "Budget Tracking"],
        indicativeSalary: {
          minLPA: 4.5,
          maxLPA: 10.0,
          unit: "LPA",
          region: "Delhi NCR / Mumbai / Jaipur / Goa",
          year: 2025,
          source: "Event and Entertainment Management Association (EEMA)",
          sourceUrl: "https://eema-india.org"
        },
        description: "Manages logistics, high-end caterers, décor setup, and live execution for corporate conferences and luxury destination weddings.",
        topEmployers: ["Wizcraft International", "Percept Limited", "Fountainhead MKTG", "DNA Entertainment"],
        meta: {
          sourceUrl: "https://eema-india.org",
          retrievedOn: "2025-06-15",
          verifier: "EEMA Benchmark",
          confidence: "high"
        }
      },
      {
        id: "occ-aviation-hospitality-executive",
        title: "Aviation Customer Experience & In-Flight Executive",
        sector: "Commercial Aviation & Airport Lounge Services",
        employerType: "private",
        isEntryLevel: true,
        requiredDegreeRules: { allowedDegreeFamilies: ["hospitality", "arts_humanities", "all_graduates"] },
        skills: ["First Aid & Emergency Safety", "Aviation Security Protocols", "Customer Care"],
        indicativeSalary: {
          minLPA: 5.0,
          maxLPA: 11.0,
          unit: "LPA",
          region: "International Airports (DEL, BOM, BLR)",
          year: 2025,
          source: "Directorate General of Civil Aviation (DGCA) Industry Notes",
          sourceUrl: "https://dgca.gov.in"
        },
        description: "Delivers safety-critical and hospitality services on domestic and international commercial flights and premium airport lounges.",
        topEmployers: ["Air India", "IndiGo", "Vistara", "Singapore Airlines", "Plaza Premium Lounge"],
        meta: {
          sourceUrl: "https://dgca.gov.in",
          retrievedOn: "2025-06-15",
          verifier: "DGCA Aviation Industry Data",
          confidence: "high"
        }
      }
    ],
    defaultGovtPosts: [
      gp("post-aso-mea"),
      gp("post-bank-po"),
      gp("post-ias")
    ],
    defaultHigherStudies: [
      hs("mba-general-tech"),
      hs("mph-public-health")
    ],
    defaultCertifications: [
      cert("hubspot-inbound"),
      cert("google-data-analytics"),
      cert("pmp")
    ],
    defaultSwitchPaths: [
      {
        id: "hosp-to-customer-success",
        fromDegreeFamily: "hospitality",
        toOccupationTitle: "Customer Success & High-Value Account Manager (SaaS / Tech)",
        typicalDuration: "4 to 6 Months",
        whyFeasible: "Hospitality graduates possess elite client empathy, active listening, and relationship management that B2B SaaS companies prize for enterprise retention.",
        growthPotential: "high",
        bridgeSteps: [
          {
            step: 1,
            title: "Master Customer Relationship Management (Salesforce & HubSpot CRM)",
            type: "course",
            detail: "Learn pipeline tracking, client onboarding flows, Net Revenue Retention (NRR), and churn reduction.",
            estimatedMonths: 2
          },
          {
            step: 2,
            title: "Earn HubSpot Inbound & Customer Service Certification",
            type: "cert",
            detail: "Demonstrate verified mastery of enterprise client retention and ticketing systems.",
            estimatedMonths: 1,
            sourceUrl: "https://academy.hubspot.com"
          },
          {
            step: 3,
            title: "Conduct 2 B2B Client Onboarding Simulation Audits",
            type: "portfolio",
            detail: "Draft quarterly business review (QBR) slide decks and customer health scorecards.",
            estimatedMonths: 2
          }
        ]
      }
    ],
    meta: {
      sourceUrl: "https://nchm.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "NCHMCT Statutory Council",
      confidence: "high"
    }
  }
};
