import { Degree } from "./types";

export const DEGREES_DATA: Degree[] = [
  // ==========================================
  // 1. ENGINEERING BRANCHES (B.Tech / B.E.)
  // ==========================================
  {
    id: "btech-cse",
    familyId: "engineering",
    name: "Bachelor of Technology in Computer Science & Engineering",
    shortName: "B.Tech CSE",
    aliases: ["BTech CSE", "BE CSE", "Computer Engineering", "B.E. Computer Science", "B.Tech CS", "software engineering", "coder", "programmer"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      year1Certificate: "Undergraduate Certificate in Computing Fundamentals",
      year2Diploma: "Diploma in Software Development & Data Structures",
      year3Degree: "B.Sc (Computer Science Engineering)",
      year4HonoursResearch: "B.Tech Computer Science & Engineering (Honours / Research)",
      durationVariants: ["4 Years (Regular)", "3 Years (Lateral Entry)"]
    },
    subjectsTaught: [
      "Data Structures & Algorithms",
      "Operating Systems & Linux Kernel",
      "Computer Networks & Protocols",
      "Database Management Systems & SQL",
      "Compiler Design & Theory of Computation",
      "Cloud Computing & Distributed Systems"
    ],
    skillsGained: [
      "Object-Oriented Programming (Java, C++, Python)",
      "High-Performance Algorithmic Logic",
      "Full-stack Web & REST API Architecture",
      "Relational & NoSQL Database Optimization",
      "System Scalability & Performance Profiling"
    ],
    typicalEmployers: ["Google", "Microsoft", "Amazon", "Adobe", "Flipkart", "TCS", "Infosys"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE CSE Curriculum Revision",
      confidence: "high"
    }
  },
  {
    id: "btech-aids",
    familyId: "engineering",
    name: "Bachelor of Technology in Artificial Intelligence & Data Science",
    shortName: "B.Tech AI & DS",
    aliases: ["BTech AI", "B.Tech Data Science", "AI and ML", "Machine Learning Engineering", "Artificial Intelligence", "AI DS"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      year1Certificate: "Certificate in Computational Intelligence Basics",
      year2Diploma: "Diploma in Statistical Data Modeling",
      year3Degree: "B.Sc in Applied Artificial Intelligence",
      year4HonoursResearch: "B.Tech in AI & Data Science (Honours)",
      durationVariants: ["4 Years (Regular)"]
    },
    subjectsTaught: [
      "Mathematical Foundations of Machine Learning",
      "Deep Learning & Neural Networks (TensorFlow/PyTorch)",
      "Natural Language Processing (NLP & LLMs)",
      "Computer Vision & Pattern Recognition",
      "Big Data Frameworks (Spark & Hadoop)"
    ],
    skillsGained: [
      "Predictive Modeling & Feature Engineering",
      "Deep Neural Network Training",
      "Transformer & LLM Fine-Tuning",
      "MLOps Deployment Pipelines",
      "Statistical Hypothesis Testing"
    ],
    typicalEmployers: ["Amazon AI", "NVIDIA", "Microsoft Research", "Fractal Analytics", "Tiger Analytics"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE AI Model Framework",
      confidence: "high"
    }
  },
  {
    id: "btech-it",
    familyId: "engineering",
    name: "Bachelor of Technology in Information Technology",
    shortName: "B.Tech IT",
    aliases: ["BTech IT", "BE IT", "Bachelor of Engineering in IT", "Information Tech"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Enterprise Application Development",
      "Information Security & Cryptography",
      "Web Services & Microservices",
      "Cloud Infrastructure & Storage",
      "Database Administration"
    ],
    skillsGained: ["Full-Stack Engineering", "Network Security", "Cloud Operations", "Agile Software Life Cycle"],
    typicalEmployers: ["TCS", "Infosys", "Cognizant", "Wipro", "Accenture", "Cisco"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Model Curriculum",
      confidence: "high"
    }
  },
  {
    id: "btech-ece",
    familyId: "engineering",
    name: "Bachelor of Technology in Electronics & Communication Engineering",
    shortName: "B.Tech ECE",
    aliases: ["BTech ECE", "BE ECE", "Electronics and Telecom", "Telecommunication Engineering", "VLSI"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral Entry)"]
    },
    subjectsTaught: [
      "Digital Signal Processing (DSP)",
      "VLSI Design & Verilog / VHDL",
      "Microcontrollers & Embedded Systems (ARM / RISC-V)",
      "Electromagnetic Theory & Antennas",
      "Wireless & 5G Cellular Communications"
    ],
    skillsGained: [
      "VLSI Circuit Synthesis & Timing Analysis",
      "Embedded C / C++ Firmware Development",
      "RF Hardware Testing with Oscilloscopes",
      "Digital Communication Protocols"
    ],
    typicalEmployers: ["Qualcomm", "Intel India", "Texas Instruments", "Broadcom", "ISRO", "BEL"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE ECE Committee",
      confidence: "high"
    }
  },
  {
    id: "btech-eee",
    familyId: "engineering",
    name: "Bachelor of Technology in Electrical & Electronics Engineering",
    shortName: "B.Tech EEE",
    aliases: ["BTech EEE", "BE EEE", "Electrical Engineering", "Power Systems", "EV Engineering", "btech-electrical", "B.Tech Electrical"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral Entry)"]
    },
    subjectsTaught: [
      "Electric Power Generation, Transmission & Distribution",
      "Electrical Machines & Transformers",
      "Power Electronics & Electric Vehicle Drives",
      "Control Systems Engineering",
      "Renewable Energy Systems (Solar & Wind)"
    ],
    skillsGained: ["MATLAB / Simulink Circuit Simulation", "EV Motor Controller Design", "Switchgear & Substation Engineering", "PLC / SCADA Automation"],
    typicalEmployers: ["Tata Power", "Schneider Electric", "Siemens", "NTPC", "Power Grid Corporation (PGCIL)", "Ola Electric"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Electrical Committee",
      confidence: "high"
    }
  },
  {
    id: "btech-mech",
    familyId: "engineering",
    name: "Bachelor of Technology in Mechanical Engineering",
    shortName: "B.Tech Mechanical",
    aliases: ["B.Tech Mechanical Engineering", "BTech Mechanical Engineering", "B Tech Mechanical Engineering", "BTech Mech", "BE Mechanical", "Mechanical Engineering", "Mechanical Engineer", "Automobile Engineering", "btech-mechanical"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Applied Thermodynamics & Heat Transfer",
      "Strength of Materials & Structural Mechanics",
      "Fluid Mechanics & Hydraulic Machinery",
      "Design of Machine Elements",
      "Manufacturing Technology & CNC Machining",
      "Finite Element Analysis (FEA / ANSYS)"
    ],
    skillsGained: ["3D CAD Modeling (SolidWorks/CATIA)", "FEA Stress Simulation (ANSYS)", "Thermodynamic Heat Load Sizing", "GD&T Tolerancing"],
    typicalEmployers: ["Tata Motors", "Mahindra & Mahindra", "L&T", "Maruti Suzuki", "BHEL", "DRDO"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Mechanical Curriculum",
      confidence: "high"
    }
  },
  {
    id: "btech-civil",
    familyId: "engineering",
    name: "Bachelor of Technology in Civil Engineering",
    shortName: "B.Tech Civil",
    aliases: ["BTech Civil", "BE Civil", "Structural Engineering", "Construction Engineering", "Civil Engineer"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Structural Analysis & Reinforced Concrete Design (RCC)",
      "Geotechnical & Soil Mechanics",
      "Surveying & Total Station / GIS",
      "Transportation & Highway Engineering",
      "Environmental Engineering & Waste Water Management",
      "Construction Project Planning (Primavera / MS Project)"
    ],
    skillsGained: ["AutoCAD Civil 3D Drafting", "STAAD.Pro / ETABS Structural Modeling", "Surveying & Leveling", "Quantity Estimation & BOQ"],
    typicalEmployers: ["L&T Construction", "Shapoorji Pallonji", "Afcons", "NHAI", "CPWD", "Metro Rail Corporations"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Civil Committee",
      confidence: "high"
    }
  },
  {
    id: "btech-chem",
    familyId: "engineering",
    name: "Bachelor of Technology in Chemical Engineering",
    shortName: "B.Tech Chemical",
    aliases: ["BTech Chemical", "BE Chemical", "Petrochemical Engineering", "Process Engineering", "btech-chemical"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Mass Transfer Operations",
      "Heat Transfer Equipment Design",
      "Chemical Reaction Engineering (CRE)",
      "Process Dynamics & Control",
      "Plant Design & Process Economics (Aspen Plus)"
    ],
    skillsGained: ["Process Flow Diagram (PFD) Simulation", "Distillation Column Sizing", "HAZOP Safety Analysis", "Plant Economics"],
    typicalEmployers: ["Reliance Industries", "Indian Oil Corporation (IOCL)", "ONGC", "Tata Chemicals", "BASF", "Dow Chemical"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Chemical Committee",
      confidence: "high"
    }
  },
  {
    id: "btech-aero",
    familyId: "engineering",
    name: "Bachelor of Technology in Aerospace / Aeronautical Engineering",
    shortName: "B.Tech Aerospace",
    aliases: ["BTech Aeronautical", "Aerospace Engineering", "Aviation Engineering", "Aircraft Design", "btech-aerospace"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Aerodynamics & Compressible Flow",
      "Flight Mechanics & Aircraft Stability",
      "Aircraft Propulsion (Gas Turbines / Rockets)",
      "Aerospace Structures & Composite Materials",
      "Avionics & Flight Navigation Systems"
    ],
    skillsGained: ["Computational Fluid Dynamics (CFD)", "Aerodynamic Foil Design", "Propulsion Thrust Calculations", "Flight Simulation"],
    typicalEmployers: ["Hindustan Aeronautics Limited (HAL)", "ISRO", "DRDO", "Airbus India", "Boeing India", "Collins Aerospace"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Aerospace Board",
      confidence: "high"
    }
  },
  {
    id: "btech-biotech",
    familyId: "engineering",
    name: "Bachelor of Technology in Biotechnology",
    shortName: "B.Tech Biotech",
    aliases: ["BTech Biotechnology", "Bioprocess Engineering", "Biochemical Engineering", "btech-biotechnology"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Bioprocess Engineering & Bioreactor Design",
      "Genetic Engineering & Recombinant DNA Technology",
      "Immunology & Molecular Diagnostics",
      "Bioinformatics & Computational Biology",
      "Downstream Processing & Protein Purification"
    ],
    skillsGained: ["Fermentation & Cell Culture", "Bioprocess Sizing", "PCR & Gel Electrophoresis", "Bioinformatics (BLAST, PyMOL)"],
    typicalEmployers: ["Biocon", "Serum Institute of India", "Bharat Biotech", "Dr. Reddy's", "Novozymes"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Biotech Board",
      confidence: "high"
    }
  },
  {
    id: "btech-agri",
    familyId: "engineering",
    name: "Bachelor of Technology in Agricultural Engineering",
    shortName: "B.Tech Agri Engg",
    aliases: ["BTech Agriculture Engineering", "Farm Machinery", "Irrigation Engineering", "btech-agri-engineering"],
    level: "UG",
    regulator: "ICAR",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Farm Machinery & Tractor Systems",
      "Soil & Water Conservation Engineering",
      "Irrigation & Micro-Irrigation Drainage",
      "Post-Harvest & Agricultural Processing",
      "Renewable Energy for Agriculture"
    ],
    skillsGained: ["Micro-irrigation CAD Design", "Farm Machinery Maintenance", "Hydrological Watershed Modeling", "Cold Storage Sizing"],
    typicalEmployers: ["Mahindra Tractors", "Jain Irrigation Systems", "TAFE", "John Deere", "ITC Agri Business", "NABARD"],
    isCommon: false,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "ICAR Agricultural Engineering Division",
      confidence: "high"
    }
  },
  {
    id: "btech-marine",
    familyId: "engineering",
    name: "Bachelor of Technology in Marine Engineering",
    shortName: "B.Tech Marine",
    aliases: ["BTech Marine", "Merchant Navy", "Ship Engineering", "Marine Officer"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Marine Internal Combustion Engines",
      "Naval Architecture & Ship Stability",
      "Marine Auxiliary Machinery & Boilers",
      "Maritime Law & IMO Safety Conventions (STCW)",
      "Shipboard Electrical & Automation Systems"
    ],
    skillsGained: ["Shipboard Engine Overhauling", "Watchkeeping in Engine Room", "STCW Marine Safety", "Pneumatic Control Systems"],
    typicalEmployers: ["Maersk Line", "Anglo-Eastern Ship Management", "Fleet Management", "Shipping Corporation of India (SCI)", "Great Eastern Shipping"],
    isCommon: false,
    meta: {
      sourceUrl: "https://www.dgshipping.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Directorate General of Shipping (DGS India)",
      confidence: "high"
    }
  },
  {
    id: "btech-mining",
    familyId: "engineering",
    name: "Bachelor of Technology in Mining Engineering",
    shortName: "B.Tech Mining",
    aliases: ["BTech Mining", "Mining Engineer", "Mineral Engineering"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Surface & Underground Mining Methods",
      "Rock Mechanics & Strata Control",
      "Mine Ventilation & Safety Regulations (DGMS)",
      "Drilling & Blasting Engineering",
      "Mineral Processing & Beneficiation"
    ],
    skillsGained: ["Blast Vibration Monitoring", "Mine Plan Drafting (Surpac)", "DGMS Safety Compliance", "Geotechnical Slop Analysis"],
    typicalEmployers: ["Coal India Limited (CIL)", "Hindustan Zinc", "Tata Steel Mining", "NMDC", "Vedanta Resources"],
    isCommon: false,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Mining Committee",
      confidence: "high"
    }
  },
  {
    id: "btech-petroleum",
    familyId: "engineering",
    name: "Bachelor of Technology in Petroleum Engineering",
    shortName: "B.Tech Petroleum",
    aliases: ["BTech Petroleum", "Oil and Gas Engineering", "Drilling Engineering"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Reservoir Engineering & Well Logging",
      "Drilling Technology & Well Completion",
      "Petroleum Production Operations",
      "Enhanced Oil Recovery (EOR)",
      "Natural Gas Processing & Pipeline Transport"
    ],
    skillsGained: ["Well Log Interpretation (Petrel)", "Reservoir Simulation", "Blowout Prevention Protocols", "Offshore Safety"],
    typicalEmployers: ["ONGC", "Oil India Limited (OIL)", "Schlumberger (SLB)", "Halliburton", "Baker Hughes", "Reliance E&P"],
    isCommon: false,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Petroleum Division",
      confidence: "high"
    }
  },

  // ==========================================
  // 2. COMPUTING & IT (BCA / B.Sc CS)
  // ==========================================
  {
    id: "bca",
    familyId: "computing",
    name: "Bachelor of Computer Applications",
    shortName: "BCA",
    aliases: ["BCA", "Bachelor of Computer Application", "BCA Degree", "Computer Applications", "bacomputer-applications"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Computer Applications",
      year2Diploma: "Diploma in Software Development",
      year3Degree: "Bachelor of Computer Applications (BCA)",
      year4HonoursResearch: "BCA (Honours / Research) - 4-Year NEP Option",
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Programming with C, C++, and Java",
      "Web Technologies (HTML, CSS, JavaScript, PHP)",
      "Relational Database Management Systems (MySQL / Oracle)",
      "Data Structures & Object-Oriented Analysis",
      "Software Testing & Project Management"
    ],
    skillsGained: ["Full-Stack Web Development", "SQL Database Queries", "Application Testing", "Software Project Documentation"],
    typicalEmployers: ["TCS", "Wipro", "Infosys", "Cognizant", "Zoho", "HCLTech"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Learning Outcomes Framework",
      confidence: "high"
    }
  },
  {
    id: "bsc-cs",
    familyId: "computing",
    name: "Bachelor of Science in Computer Science",
    shortName: "B.Sc CS",
    aliases: ["BSc CS", "B.Sc Computer Science", "BSc Computer Science", "Bachelor of Science in CS", "bsc-computer-science"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Undergraduate Certificate in Computing Fundamentals",
      year2Diploma: "Undergraduate Diploma in Computer Systems",
      year3Degree: "Bachelor of Science (B.Sc CS)",
      year4HonoursResearch: "B.Sc (Honours with Research)",
      durationVariants: ["3 Years", "4 Years"]
    },
    subjectsTaught: [
      "Mathematical Foundations of Computing",
      "Data Structures & Algorithm Design",
      "Computer Architecture & Operating Systems",
      "Python for Data Analysis & Web",
      "Database Systems & Software Engineering"
    ],
    skillsGained: ["Mathematical Problem Solving", "Python Scripting & Algorithms", "SQL & Database Design", "Linux Command Line"],
    typicalEmployers: ["TCS", "Wipro", "Infosys", "Tech Mahindra", "Capgemini", "Accenture"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC LOCF Computer Science",
      confidence: "high"
    }
  },

  // ==========================================
  // 3. PURE & APPLIED SCIENCES (B.Sc)
  // ==========================================
  {
    id: "bsc-physics",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Physics",
    shortName: "B.Sc Physics",
    aliases: ["BSc Physics", "B.Sc (Hons) Physics", "Physics Degree"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3, durationVariants: ["3 Years", "4 Years (NEP Honours)"] },
    subjectsTaught: ["Classical Mechanics", "Electromagnetism & Optics", "Quantum Mechanics & Statistical Physics", "Nuclear & Solid State Physics", "Mathematical Physics & Lab"],
    skillsGained: ["Mathematical Problem Solving", "Laser & Optics Calibration", "Error Analysis & Statistical Modeling", "Scientific Python"],
    typicalEmployers: ["BARC", "ISRO", "DRDO", "Semiconductor Labs", "EdTech Companies", "Optics & Sensor Manufacturers"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Physics Curriculum",
      confidence: "high"
    }
  },
  {
    id: "bsc-maths",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Mathematics",
    shortName: "B.Sc Maths",
    aliases: ["BSc Mathematics", "B.Sc (Hons) Maths", "Maths Degree", "Mathematics", "bsc-mathematics"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3, durationVariants: ["3 Years", "4 Years (NEP)"] },
    subjectsTaught: ["Real Analysis & Complex Analysis", "Linear Algebra & Abstract Algebra", "Differential Equations & Numerical Methods", "Probability & Mathematical Statistics", "Linear Programming & Operations Research"],
    skillsGained: ["Rigorous Analytical Logic", "Statistical Modeling", "Optimization Algorithms", "Python / R Data Computing"],
    typicalEmployers: ["Financial Institutions", "Actuarial Consultancies", "Data Analytics Firms", "Indian Statistical Institute (ISI)", "EdTech"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Mathematics Framework",
      confidence: "high"
    }
  },
  {
    id: "bsc-chemistry",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Chemistry",
    shortName: "B.Sc Chemistry",
    aliases: ["BSc Chemistry", "B.Sc (Hons) Chemistry", "Industrial Chemistry"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3, durationVariants: ["3 Years", "4 Years (NEP)"] },
    subjectsTaught: ["Inorganic Chemistry & Coordination Compounds", "Organic Reaction Mechanisms & Stereochemistry", "Physical Chemistry & Thermodynamics", "Analytical Chemistry & Instrumental Methods", "Polymer & Industrial Chemistry"],
    skillsGained: ["Titration & Gravimetric Analysis", "Spectrophotometric Assays", "Laboratory GLP Protocols", "Organic Compound Synthesis"],
    typicalEmployers: ["Pharma QC Labs (Cipla, Sun Pharma)", "Paint & Coating Industries (Asian Paints)", "FMCG (HUL, ITC)", "CSIR Labs"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Chemistry Curriculum",
      confidence: "high"
    }
  },

  // ==========================================
  // 4. HEALTHCARE & MEDICINE
  // ==========================================
  {
    id: "mbbs",
    familyId: "health_medicine",
    name: "Bachelor of Medicine and Bachelor of Surgery",
    shortName: "MBBS",
    aliases: ["MBBS", "Doctor", "Medical Doctor", "Physician", "Allopathic Doctor", "docter", "mbbs doctor"],
    level: "Professional",
    regulator: "NMC",
    structure: {
      durationStandardYears: 5.5,
      durationVariants: ["4.5 Years Pre/Para/Clinical Academics + 1 Year Compulsory Rotatory Residential Internship (CRRI)"]
    },
    subjectsTaught: [
      "Human Anatomy, Embryology & Histology",
      "Human Physiology & Medical Biochemistry",
      "Pathology, Microbiology & Pharmacology",
      "Forensic Medicine & Community Medicine",
      "General Medicine, Pediatrics & Psychiatry",
      "General Surgery, Orthopedics, ENT, Ophthalmology & Obstetrics/Gynecology"
    ],
    skillsGained: [
      "Comprehensive Physical Clinical Examination",
      "Differential Diagnosis & Clinical Reasoning",
      "Basic & Advanced Life Support (BLS / ACLS)",
      "Prescription Pharmacotherapy & Antibiotic Stewardship",
      "Emergency Wound Management, Suturing & Cannulation"
    ],
    typicalEmployers: [
      "AIIMS & Central Government Hospitals",
      "Corporate Healthcare Chains (Apollo, Fortis, Max, Narayana Health)",
      "State Government Health Services (PHC, CHC, District Headquarters Hospitals)",
      "Armed Forces Medical Services (AFMS)"
    ],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.nmc.org.in",
      retrievedOn: "2025-06-15",
      verifier: "NMC Competency-Based Medical Education (CBME) Regulations",
      confidence: "high"
    }
  },
  {
    id: "bds",
    familyId: "health_medicine",
    name: "Bachelor of Dental Surgery",
    shortName: "BDS",
    aliases: ["BDS", "Dentist", "Dental Doctor", "Dentistry"],
    level: "Professional",
    regulator: "DCI",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["4 Years Academics + 1 Year Paid Rotatory Internship"]
    },
    subjectsTaught: [
      "General Human Anatomy & Physiology",
      "Dental Anatomy, Embryology & Oral Histology",
      "Oral Pathology & Microbiology",
      "Prosthodontics & Crown/Bridge",
      "Conservative Dentistry & Endodontics (Root Canal)",
      "Oral & Maxillofacial Surgery & Periodontics"
    ],
    skillsGained: [
      "Dental Restorations & Endodontic Root Canals",
      "Local Anesthesia Administration in Oral Cavity",
      "Tooth Extractions & Minor Oral Surgical Procedures",
      "Prosthetic Denture Impressions & Fabrication"
    ],
    typicalEmployers: ["Corporate Dental Chains (Clove Dental)", "Government Dental Colleges & Hospitals", "Private Dental Clinics", "Army Dental Corps"],
    isCommon: true,
    meta: {
      sourceUrl: "https://dciindia.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Dental Council of India (DCI) Regulations",
      confidence: "high"
    }
  },
  {
    id: "bpt",
    familyId: "health_allied",
    name: "Bachelor of Physiotherapy",
    shortName: "BPT",
    aliases: ["BPT", "Physiotherapist", "Physical Therapy", "Physiotherapy"],
    level: "Professional",
    regulator: "STATE_BOARD",
    structure: {
      durationStandardYears: 4.5,
      durationVariants: ["4 Years Academics + 6 Months Compulsory Clinical Internship"]
    },
    subjectsTaught: [
      "Anatomy, Physiology & Biomechanics",
      "Exercise Therapy & Electrotherapy Modalities",
      "Orthopedic Physiotherapy & Sports Rehabilitation",
      "Neurological Physiotherapy (Stroke, Spinal Rehabilitation)",
      "Cardiorespiratory Physiotherapy & ICU Mobility"
    ],
    skillsGained: [
      "Musculoskeletal Joint Mobilization & Manipulation",
      "Neuro-Developmental Therapy (NDT) Gait Training",
      "Sports Injury Taping & Cryotherapy",
      "Chest Physiotherapy & Postural Drainage"
    ],
    typicalEmployers: ["Orthopedic & Multispecialty Hospitals", "Sports Medicine Clinics & IPL/ISL Franchises", "Rehabilitation Centers", "Independent Physiotherapy Practice"],
    isCommon: true,
    meta: {
      sourceUrl: "https://main.mohfw.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Commission for Allied and Healthcare Professions Act",
      confidence: "high"
    }
  },
  {
    id: "bsc-nursing",
    familyId: "health_allied",
    name: "Bachelor of Science in Nursing",
    shortName: "B.Sc Nursing",
    aliases: ["BSc Nursing", "Staff Nurse", "Nursing Officer", "RN RM", "b.sc-nursing"],
    level: "UG",
    regulator: "INC",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years Comprehensive Clinical Integration under INC Revised Syllabus"]
    },
    subjectsTaught: [
      "Applied Anatomy, Physiology & Nutrition",
      "Nursing Foundations & Patient Care Ethics",
      "Pharmacology, Pathology & Genetics",
      "Adult Health Nursing (Medical-Surgical I & II)",
      "Child Health & Mental Health Nursing",
      "Midwifery & Obstetrical Nursing"
    ],
    skillsGained: [
      "IV Cannulation & Medication Infusion Pumps",
      "ICU Ventilator Patient Management",
      "Sterile Surgical Asepsis & Wound Dressing",
      "Normal Delivery Assistance & Neonatal Resuscitation"
    ],
    typicalEmployers: ["AIIMS Nursing Officer (NORCET)", "Apollo & Max Hospitals", "NHS Hospitals (UK - via OET/CBT)", "US Healthcare (via NCLEX-RN)"],
    isCommon: true,
    meta: {
      sourceUrl: "https://indiannursingcouncil.org",
      retrievedOn: "2025-06-15",
      verifier: "Indian Nursing Council (INC)",
      confidence: "high"
    }
  },
  {
    id: "bpharm",
    familyId: "pharmacy",
    name: "Bachelor of Pharmacy",
    shortName: "B.Pharm",
    aliases: ["BPharm", "B Pharmacy", "Pharmacist", "Pharmacy"],
    level: "UG",
    regulator: "PCI",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Pharmaceutics & Formulation Development",
      "Pharmaceutical Chemistry & Medicinal Chemistry",
      "Pharmacology & Toxicology",
      "Pharmacognosy & Phytochemistry",
      "Pharmacy Law & Regulatory Affairs"
    ],
    skillsGained: ["Tablet & Capsule Formulation", "Drug Dissolution & Quality Testing", "Retail Pharmacy Dispensing & Counseling", "Pharmacovigilance Data Entry"],
    typicalEmployers: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Retail Hospital Pharmacies", "Central Drug Standard Control Organisation (CDSCO)"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.pci.nic.in",
      retrievedOn: "2025-06-15",
      verifier: "Pharmacy Council of India (PCI)",
      confidence: "high"
    }
  },

  // ==========================================
  // 5. COMMERCE & MANAGEMENT
  // ==========================================
  {
    id: "bcom",
    familyId: "commerce",
    name: "Bachelor of Commerce",
    shortName: "B.Com",
    aliases: ["BCom", "B.Com General", "BCom Honours", "Bachelor of Commerce", "B.Com Accounts"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Undergraduate Certificate in Financial Accounting",
      year2Diploma: "Undergraduate Diploma in Commerce & Taxation",
      year3Degree: "Bachelor of Commerce (B.Com)",
      year4HonoursResearch: "B.Com (Honours with Research)",
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Financial Accounting & Auditing",
      "Direct & Indirect Taxation (GST and Income Tax)",
      "Cost Accounting & Management Accounting",
      "Business Law & Company Law",
      "Financial Management & Banking Operations"
    ],
    skillsGained: ["Tally Prime / SAP FICO Ledger Accounting", "Tax Computation & Return Filing", "Balance Sheet Finalization", "Advanced Excel Spreadsheets"],
    typicalEmployers: ["Deloitte", "EY", "PwC", "KPMG", "HDFC Bank", "ICICI Bank", "Genpact"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Commerce Framework",
      confidence: "high"
    }
  },
  {
    id: "bba",
    familyId: "commerce",
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    aliases: ["BBA", "BMS", "Bachelor of Management Studies", "Business Administration", "BBA Finance", "BBA Marketing"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Principles of Management & Organizational Behavior",
      "Marketing Management & Brand Strategy",
      "Financial Management & Budgeting",
      "Human Resource Management",
      "Business Analytics & Operations Research"
    ],
    skillsGained: ["Executive Presentations & Pitching", "Market Research & Survey Analysis", "Customer Acquisition Strategy", "Team Leadership & Conflict Resolution"],
    typicalEmployers: ["Amazon", "Zomato", "Swiggy", "Hindustan Unilever", "Deloitte USI", "Byju's"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Management Framework",
      confidence: "high"
    }
  },

  // ==========================================
  // 6. LAW & LEGAL STUDIES
  // ==========================================
  {
    id: "llb",
    familyId: "law",
    name: "Bachelor of Laws (3-Year LL.B / 5-Year Integrated B.A. LL.B)",
    shortName: "LL.B",
    aliases: ["LLB", "BA LLB", "BBA LLB", "B.A. LL.B", "Lawyer", "Advocate", "Legal Studies"],
    level: "Professional",
    regulator: "BCI",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (Post-Graduation Entry)", "5 Years (Integrated after Class 12)"]
    },
    subjectsTaught: [
      "Constitutional Law of India",
      "Law of Contracts & Mercantile Law",
      "Bharatiya Nyaya Sanhita (IPC) & Criminal Procedure",
      "Code of Civil Procedure & Evidence Act",
      "Company Law & Competition Act",
      "Intellectual Property Law & Arbitration"
    ],
    skillsGained: [
      "Case Law Precedent Analysis (Manupatra / SCC)",
      "Pleadings, Petitions & Plaint Drafting",
      "Statutory Construction & Legal Argumentation",
      "Commercial Contract Negotiation"
    ],
    typicalEmployers: ["Shardul Amarchand Mangaldas", "AZB & Partners", "Khaitan & Co", "Chambers of Senior Advocates", "In-House Corporate Legal Teams"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.barcouncilofindia.org",
      retrievedOn: "2025-06-15",
      verifier: "Bar Council of India Regulations",
      confidence: "high"
    }
  },

  // ==========================================
  // 7. ARTS & HUMANITIES
  // ==========================================
  {
    id: "ba-economics",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in Economics",
    shortName: "B.A. Economics",
    aliases: ["BA Economics", "BA Econ", "B.A. (Hons) Economics", "Economics Degree", "Economist"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3, durationVariants: ["3 Years", "4 Years (NEP Honours)"] },
    subjectsTaught: [
      "Microeconomic Theory & Applications",
      "Macroeconomic Analysis & Monetary Policy",
      "Mathematical Methods for Economics",
      "Econometrics & Regression Modeling",
      "Public Economics & Indian Economic Development"
    ],
    skillsGained: ["Econometric Modeling with Stata / R", "Economic Policy Synthesis", "Quantitative Data Analysis", "Macroeconomic Trend Forecasting"],
    typicalEmployers: ["NITI Aayog", "Reserve Bank of India (RBI)", "CRISIL", "JPMorgan Chase", "World Bank / Asian Development Bank Consultancies"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Economics Framework",
      confidence: "high"
    }
  },
  {
    id: "ba-polscience",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in Political Science",
    shortName: "B.A. Political Science",
    aliases: ["BA Political Science", "BA Pol Science", "Politics and International Relations"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3, durationVariants: ["3 Years", "4 Years (NEP)"] },
    subjectsTaught: [
      "Political Theory & Western / Indian Political Thought",
      "Indian Government, Constitution & Politics",
      "Comparative Political Systems",
      "International Relations & Global Geopolitics",
      "Public Policy Formulation & Administrative Ethics"
    ],
    skillsGained: ["Constitutional Analysis", "Geopolitical Intelligence Synthesis", "Policy Memo Drafting", "Electoral Analysis"],
    typicalEmployers: ["Observer Research Foundation (ORF)", "Centre for Policy Research (CPR)", "Digital Media Houses", "Political Consultancies (I-PAC)"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Political Science Board",
      confidence: "high"
    }
  },
  {
    id: "ba-journalism",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in Journalism & Mass Communication",
    shortName: "B.A. Journalism (BJMC)",
    aliases: ["BJMC", "BA Journalism", "Mass Communication", "Media Studies", "Journalist"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3 },
    subjectsTaught: [
      "News Reporting, Editing & Headline Writing",
      "Broadcast Journalism & Television Production",
      "Digital Media, SEO Journalism & Social Media",
      "Media Law, Defamation & Press Council Ethics",
      "Public Relations, Advertising & Corporate Communications"
    ],
    skillsGained: ["Investigative Reporting & Fact-Checking", "Video Editing (Premiere Pro / DaVinci)", "Camera Operation & Audio Production", "Press Release Crafting"],
    typicalEmployers: ["The Hindu", "The Indian Express", "NDTV", "BBC India", "Adfactors PR", "Inshorts"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Media Studies Framework",
      confidence: "high"
    }
  },

  // ==========================================
  // 8. VOCATIONAL & POLYTECHNIC
  // ==========================================
  {
    id: "polytechnic-mech",
    familyId: "vocational",
    name: "Diploma in Mechanical Engineering (Polytechnic)",
    shortName: "Diploma Mechanical",
    aliases: ["Polytechnic Mechanical", "DME", "Diploma Mech", "ITI Mechanical"],
    level: "Diploma",
    regulator: "STATE_BOARD",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (after 10th)", "2 Years (Lateral entry after 12th/ITI)"]
    },
    subjectsTaught: [
      "Workshop Technology (Fitting, Turning, Welding)",
      "Machine Drawing & AutoCAD 2D/3D",
      "Thermal Engineering & Refrigeration",
      "Hydraulics & Fluid Power Systems",
      "Industrial Engineering & Quality Control"
    ],
    skillsGained: ["Lathe & Milling Machine Operation", "Pneumatic & Hydraulic Circuit Troubleshooting", "AutoCAD Drafting", "Shop Floor 5S Maintenance"],
    typicalEmployers: ["Maruti Suzuki", "Hyundai", "Tata Motors", "L&T Construction", "Indian Railways"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "State Board of Technical Education",
      confidence: "high"
    }
  },
  {
    id: "polytechnic-civil",
    familyId: "vocational",
    name: "Diploma in Civil Engineering (Polytechnic)",
    shortName: "Diploma Civil",
    aliases: ["Polytechnic Civil", "DCE", "Diploma Civil Engineering"],
    level: "Diploma",
    regulator: "STATE_BOARD",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years (after 10th)", "2 Years (Lateral)"]
    },
    subjectsTaught: [
      "Building Materials & Construction Technology",
      "Surveying with Total Station & Levelling",
      "Civil Engineering Drawing & AutoCAD",
      "Concrete Technology & Soil Mechanics",
      "Estimating, Costing & Valuation"
    ],
    skillsGained: ["Total Station Land Surveying", "Concrete Slump & Cube Testing", "Bar Bending Schedule Preparation", "Site Measurements Checking"],
    typicalEmployers: ["L&T", "Shapoorji Pallonji", "Afcons", "State PWD Contracts", "NHAI Subcontractors"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Diploma Civil Norms",
      confidence: "high"
    }
  },
  {
    id: "polytechnic-eee",
    familyId: "vocational",
    name: "Diploma in Electrical & Electronics Engineering",
    shortName: "Diploma EEE",
    aliases: ["Polytechnic Electrical", "DEEE", "Diploma Electrical"],
    level: "Diploma",
    regulator: "STATE_BOARD",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "2 Years (Lateral)"]
    },
    subjectsTaught: [
      "Electrical Circuit Theory",
      "AC and DC Electrical Machines",
      "Electrical Power Generation & Switchgear",
      "Industrial Automation & PLC Basics",
      "Wiring, Earthing & Estimation"
    ],
    skillsGained: ["Motor Rewinding & Testing", "Industrial Panel Wiring & Earthing", "PLC Ladder Logic Programming", "Transformer Maintenance"],
    typicalEmployers: ["Tata Power", "State Electricity Boards (TANGEDCO, MSEDCL, BESCOM)", "Schneider Electric", "Metro Rail"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Electrical Diploma Board",
      confidence: "high"
    }
  },

  // ==========================================
  // 9. DESIGN & ARCHITECTURE
  // ==========================================
  {
    id: "bdes-fashion",
    familyId: "design_creative",
    name: "Bachelor of Design in Fashion Design",
    shortName: "B.Des Fashion Design",
    aliases: ["BDes Fashion", "B.Des Fashion", "Fashion Designing", "Apparel Design", "NIFT Fashion", "B.Des"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 4,
      year1Certificate: "Certificate in Design Foundation",
      year2Diploma: "Diploma in Fashion Illustration & Pattern Making",
      year3Degree: "B.Des Fashion",
      year4HonoursResearch: "B.Des Fashion Design (Research & Collections)"
    },
    subjectsTaught: [
      "Fashion Illustration & Digital CAD",
      "Pattern Making & Garment Construction",
      "Textile Science & Fabric Finishes",
      "Draping & Haute Couture Techniques",
      "Fashion Forecasting & Merchandising",
      "Sustainable Fashion & Circularity"
    ],
    skillsGained: [
      "Fashion Sketching & CLO 3D",
      "Flat Pattern Drafting & Draping",
      "Textile Sourcing & Print Design",
      "Apparel Quality Control",
      "Collection Moodboarding"
    ],
    typicalEmployers: ["Aditya Birla Fashion", "Shahi Exports", "Arvind Mills", "Zara India", "Fabindia", "Design Studios"],
    isCommon: true,
    meta: {
      sourceUrl: "https://nift.ac.in",
      retrievedOn: "2025-06-15",
      verifier: "National Institute of Fashion Technology",
      confidence: "high"
    }
  },
  {
    id: "bdes-ux",
    familyId: "design_creative",
    name: "Bachelor of Design in Interaction & UI/UX Design",
    shortName: "B.Des UI/UX",
    aliases: ["BDes UX", "UI/UX Design", "Interaction Design", "Product Design", "Digital Design"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Human-Computer Interaction (HCI)",
      "Design Systems & Figma Prototyping",
      "User Research & Heuristic Evaluation",
      "Information Architecture & Wireframing",
      "Usability Testing & Micro-interactions"
    ],
    skillsGained: [
      "Figma & Protopie Prototyping",
      "User Journey Mapping",
      "Qualitative User Interviewing",
      "Design System Governance",
      "Responsive UI Design"
    ],
    typicalEmployers: ["Google", "Microsoft", "Swiggy", "Zomato", "CRED", "Razorpay", "Design Agencies"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.nid.edu",
      retrievedOn: "2025-06-15",
      verifier: "National Institute of Design (NID)",
      confidence: "high"
    }
  },
  {
    id: "barch",
    familyId: "design_creative",
    name: "Bachelor of Architecture",
    shortName: "B.Arch",
    aliases: ["BArch", "B. Arch", "Architecture", "Architectural Design", "COA Architect"],
    level: "UG",
    regulator: "COA",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5 Years (Full-Time Mandated by COA)"]
    },
    subjectsTaught: [
      "Architectural Design Studio",
      "Building Construction & Materials",
      "History of Architecture & Heritage",
      "Structural Mechanics & RCC Design",
      "Building Services & HVAC/Acoustics",
      "Urban Planning & Sustainable Architecture"
    ],
    skillsGained: [
      "Autodesk AutoCAD & Revit BIM",
      "3D SketchUp & Lumion Visualization",
      "Working Drawing Preparation",
      "COA Statutory Building Bye-laws Compliance",
      "Site Superintending & Bill Verification"
    ],
    typicalEmployers: ["Morphogenesis", "Hafeez Contractor Architects", "CP Kukreja Architects", "L&T Construction", "NBCC", "Urban Development Authorities"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.coa.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Council of Architecture (COA)",
      confidence: "high"
    }
  },

  // ==========================================
  // 10. PSYCHOLOGY & HUMANITIES
  // ==========================================
  {
    id: "bsc-psychology",
    familyId: "arts_humanities",
    name: "Bachelor of Science in Psychology",
    shortName: "B.Sc Psychology",
    aliases: ["BSc Psychology", "B.Sc. Psychology", "BA Psychology", "Applied Psychology", "Psychology degree", "B.Sc Applied Psychology"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Foundations of Psychological Science",
      year2Diploma: "Diploma in Applied Behavioral Analysis",
      year3Degree: "B.Sc Psychology",
      year4HonoursResearch: "B.Sc Psychology (Honours / Clinical Research)"
    },
    subjectsTaught: [
      "General Psychology & Cognitive Processes",
      "Developmental Psychology (Lifespan)",
      "Abnormal Psychology & Psychopathology",
      "Psychological Assessment & Testing",
      "Social Psychology & Group Dynamics",
      "Research Methodology & Psychometrics"
    ],
    skillsGained: [
      "Psychometric Test Administration (WAIS/SPM)",
      "Active Listening & Clinical Empathy",
      "SPSS & Statistical Correlation Analysis",
      "Behavioral Interview Protocols",
      "Mental Health First Aid"
    ],
    typicalEmployers: ["Fortis Healthcare", "NIMHANS Research Projects", "Schools & Educational Consortia", "Corporate HR & People Operations", "Mental Wellness Startups (Mindler, YourDOST)"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Psychology Model Curriculum",
      confidence: "high"
    }
  },
  {
    id: "ba-english",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in English Literature",
    shortName: "B.A. English",
    aliases: ["BA English", "B.A. English Literature", "English Honours", "BA Lit", "English degree"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Language & Communication",
      year2Diploma: "Diploma in Literary Studies",
      year3Degree: "B.A. English",
      year4HonoursResearch: "B.A. English (Honours / Research)"
    },
    subjectsTaught: [
      "British & American Literature",
      "Indian Writing in English & Dalit Literature",
      "Literary Theory & Critical Analysis",
      "Linguistics & Phonetics",
      "Professional Content Writing & Copywriting",
      "Post-Colonial & Gender Studies"
    ],
    skillsGained: [
      "Critical Exegesis & Rhetorical Analysis",
      "Long-form Editorial Proofreading & Copyediting",
      "Brand Narrative & Copywriting",
      "Technical & Corporate Documentation",
      "Creative Storytelling"
    ],
    typicalEmployers: ["Penguin Random House", "Oxford University Press", "EdTech Companies (UpGrad, Coursera)", "Content Agencies & Media Outlets", "Civil Services", "PR Agencies"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC English Curriculum Framework",
      confidence: "high"
    }
  },

  // ==========================================
  // 11. LIFE SCIENCES & BIOLOGY
  // ==========================================
  {
    id: "bsc-biology",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Biological Sciences",
    shortName: "B.Sc Biology",
    aliases: ["BSc Biology", "B.Sc. Biology", "B.Sc Life Sciences", "BSc Botany", "BSc Zoology", "Life Sciences degree"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Cellular & Molecular Biology",
      year2Diploma: "Diploma in Bioscience Techniques",
      year3Degree: "B.Sc Biological Sciences",
      year4HonoursResearch: "B.Sc Biological Sciences (Honours / Research)"
    },
    subjectsTaught: [
      "Cell Biology & Genetics",
      "Animal Diversity & Physiology",
      "Plant Morphology & Taxonomy",
      "Ecology & Environmental Biology",
      "Biochemistry & Molecular Biology Tools",
      "Microbiology Fundamentals"
    ],
    skillsGained: [
      "Microscopy & Specimen Preparation",
      "Agarose Gel Electrophoresis & PCR Basics",
      "Field Biodiversity Sampling",
      "Spectrophotometric Assays",
      "Laboratory Safety & Bio-waste Disposal"
    ],
    typicalEmployers: ["Biocon", "Syngene", "Serum Institute of India", "Diagnostic Laboratories", "Botanical & Zoological Survey of India", "ICAR Research Institutes"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Life Sciences Curriculum",
      confidence: "high"
    }
  },
  {
    id: "bsc-biotech",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Biotechnology",
    shortName: "B.Sc Biotechnology",
    aliases: ["BSc Biotech", "B.Sc. Biotechnology", "BSc Biotechnology", "Biotechnology degree"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "Certificate in Recombinant DNA Basics",
      year2Diploma: "Diploma in Fermentation & Cell Culture",
      year3Degree: "B.Sc Biotechnology",
      year4HonoursResearch: "B.Sc Biotechnology (Honours / Research)"
    },
    subjectsTaught: [
      "Recombinant DNA Technology & Gene Cloning",
      "Bioprocess Engineering & Fermentation",
      "Immunology & Vaccine Technology",
      "Bioinformatics & Sequence Analysis",
      "Plant & Animal Tissue Culture",
      "Genomics & Proteomics"
    ],
    skillsGained: [
      "Plasmid Isolation & Restriction Digestion",
      "Aseptic Cell Culture Maintenance",
      "ELISA & Western Blotting Assays",
      "NCBI BLAST & PyMOL Sequence Alignment",
      "GLP/GMP Documentation"
    ],
    typicalEmployers: ["Biocon Biologics", "Serum Institute of India", "Bharat Biotech", "Novozymes", "Thermo Fisher Scientific", "AstraZeneca"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "DBT / UGC Biotechnology Curriculum",
      confidence: "high"
    }
  },
  {
    id: "bsc-stats",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Statistics",
    shortName: "B.Sc Statistics",
    aliases: ["BSc Statistics", "B.Sc. Statistics", "Statistics degree", "BSc Stats", "Mathematical Statistics", "bsc-statistics"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3 },
    subjectsTaught: [
      "Probability Theory & Probability Distributions",
      "Statistical Inference (Estimation & Hypothesis Testing)",
      "Linear Models & Regression Analysis",
      "Sampling Techniques & Design of Experiments",
      "Statistical Computing using R & Python",
      "Time Series Analysis & Forecasting"
    ],
    skillsGained: [
      "Statistical Analysis in R & Python",
      "Hypothesis Formulation & A/B Test Design",
      "Multivariate Regression Modeling",
      "Survey Sampling Methodology",
      "Exploratory Data Analysis (EDA)"
    ],
    typicalEmployers: ["Mu Sigma", "Fractal Analytics", "Genpact", "Indian Statistical Service (UPSC ISS)", "National Sample Survey Office (NSSO)", "Kantar Research"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Statistics Model Curriculum",
      confidence: "high"
    }
  },
  {
    id: "msc-biotech",
    familyId: "pure_sciences",
    name: "Master of Science in Biotechnology",
    shortName: "M.Sc Biotechnology",
    aliases: ["MSc Biotech", "M.Sc. Biotechnology", "Masters Biotechnology", "PG Biotech"],
    level: "PG",
    regulator: "UGC",
    structure: { durationStandardYears: 2 },
    subjectsTaught: [
      "Molecular Biology & Genetic Engineering",
      "Bioprocess Technology & Downstream Processing",
      "Computational Biology & Structural Bioinformatics",
      "Stem Cell Biology & Regenerative Medicine",
      "Intellectual Property Rights & Biosafety",
      "Research Dissertation & Lab Practicum"
    ],
    skillsGained: [
      "Gene Cloning & Crispr/Cas9 Workflows",
      "Mammalian Cell Culture & Bioreactor Scale-up",
      "HPLC & Mass Spectrometry Operation",
      "Bioinformatics Pipeline Scripting (Python/R)",
      "Scientific Paper Writing & Patent Search"
    ],
    typicalEmployers: ["Biocon", "Reliance Life Sciences", "AstraZeneca R&D", "Syngene International", "CSIR Labs (CCMB, IGIB)", "ICMR Institutes"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "DBT-sponsored M.Sc Curriculum",
      confidence: "high"
    }
  },

  // ==========================================
  // 12. EDUCATION & TEACHING
  // ==========================================
  {
    id: "bed",
    familyId: "education",
    name: "Bachelor of Education",
    shortName: "B.Ed",
    aliases: ["BEd", "B. Ed", "Bachelor of Education", "Teaching degree", "Teacher Training", "bveducation"],
    level: "UG",
    regulator: "NCTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years (Post-Graduation/UG)", "4 Years (Integrated ITEP after 12th)"]
    },
    subjectsTaught: [
      "Childhood & Growing Up (Educational Psychology)",
      "Contemporary India & Education Policy",
      "Learning and Teaching Methodologies",
      "Pedagogy of School Subjects (Maths, Science, Social, Languages)",
      "Assessment for Learning & Evaluation",
      "Inclusive Education & Assistive Tech"
    ],
    skillsGained: [
      "Constructivist Lesson Plan Drafting",
      "Classroom Dynamic Management",
      "Summative & Formative Rubric Creation",
      "Digital Smartboard & EdTech Pedagogy",
      "Special Needs Accommodation"
    ],
    typicalEmployers: ["Kendriya Vidyalaya Sangathan (KVS)", "Navodaya Vidyalaya Samiti (NVS)", "Delhi Public Schools (DPS)", "State Government Model Schools", "International Baccalaureate (IB) Schools", "BYJU'S / Vedantu"],
    isCommon: true,
    meta: {
      sourceUrl: "https://ncte.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Council for Teacher Education (NCTE)",
      confidence: "high"
    }
  },

  // ==========================================
  // 13. AGRICULTURE & ALLIED SCIENCES
  // ==========================================
  {
    id: "bsc-agri",
    familyId: "agriculture",
    name: "Bachelor of Science (Honours) in Agriculture",
    shortName: "B.Sc Agriculture",
    aliases: ["BSc Agri", "B.Sc. Agriculture", "BSc Agriculture", "Agriculture degree", "ICAR Agriculture", "bsc-agriculture"],
    level: "UG",
    regulator: "ICAR",
    structure: {
      durationStandardYears: 4,
      year1Certificate: "Undergraduate Certificate in Agronomy Basics",
      year2Diploma: "Diploma in Soil & Crop Management",
      year3Degree: "B.Sc Agriculture",
      year4HonoursResearch: "B.Sc (Hons) Agriculture (RAWE Internship)",
      durationVariants: ["4 Years (Mandated by ICAR 5th Deans Committee)"]
    },
    subjectsTaught: [
      "Agronomy of Field Crops",
      "Genetics & Plant Breeding",
      "Soil Science & Agricultural Chemistry",
      "Agricultural Entomology & Pest Control",
      "Plant Pathology & Disease Management",
      "Rural Agricultural Work Experience (RAWE)",
      "Agricultural Economics & Agribusiness Management"
    ],
    skillsGained: [
      "Soil Nutrient Testing & NPK Recommendation",
      "Pest & Pathogen Field Diagnosis",
      "Drip & Sprinkler Irrigation Scheduling",
      "Crop Hybridization Techniques",
      "FPO (Farmer Producer Org) Management"
    ],
    typicalEmployers: ["Bayer CropScience", "Syngenta India", "UPL Limited", "ITC Agri-Business", "NABARD / Nationalized Banks (AFO)", "State Agriculture Departments"],
    isCommon: true,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "ICAR 5th Deans Committee Framework",
      confidence: "high"
    }
  },

  // ==========================================
  // 14. ADVANCED COMMERCE SPECIALIZATIONS
  // ==========================================
  {
    id: "bcom-finance",
    familyId: "commerce",
    name: "Bachelor of Commerce in Accounting & Finance",
    shortName: "B.Com Finance",
    aliases: ["BCom Finance", "B.Com Accounting", "BCom Accounting", "BAF", "b com finance", "Finance degree"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3 },
    subjectsTaught: [
      "Corporate Financial Accounting",
      "Direct & Indirect Taxation (GST / Income Tax)",
      "Financial Management & Capital Markets",
      "Cost & Management Accounting",
      "Auditing & Corporate Governance",
      "Financial Modeling using Excel"
    ],
    skillsGained: [
      "Double-Entry Ledger & Tally Prime / Zoho Books",
      "GST & TDS Return Filing Preparation",
      "Discounted Cash Flow (DCF) Valuation",
      "Financial Ratio Analysis & Budgeting",
      "Audit Trail Verification"
    ],
    typicalEmployers: ["Deloitte", "PwC", "EY", "KPMG", "HDFC Bank", "ICICI Bank", "Genpact"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Commerce Framework",
      confidence: "high"
    }
  },
  {
    id: "bcom-comp-app",
    familyId: "commerce",
    name: "Bachelor of Commerce in Computer Applications",
    shortName: "B.Com Computer Applications",
    aliases: ["BCom CA", "B.Com Computer Applications", "BCom Computers", "B.Com IT"],
    level: "UG",
    regulator: "UGC",
    structure: { durationStandardYears: 3 },
    subjectsTaught: [
      "Financial Accounting & Tally ERP",
      "Database Management Systems & SQL",
      "Business Analytics & Advanced Excel",
      "E-Commerce Technologies & Web Design",
      "Income Tax Law & Electronic Filing",
      "Python for Business Applications"
    ],
    skillsGained: [
      "SQL Querying for Financial Datasets",
      "Advanced Excel (VLOOKUP, Pivot, Power Query)",
      "Enterprise Tally & GST Software",
      "Business Reporting & Dashboarding",
      "Accounting Reconciliation"
    ],
    typicalEmployers: ["TCS BPS", "Infosys BPM", "Cognizant", "Standard Chartered GBS", "SME Accounting Firms"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Commerce Curriculum",
      confidence: "high"
    }
  },

  // ==========================================
  // 15. COMPUTING & IT SPECIALIZATIONS
  // ==========================================
  {
    id: "mca",
    familyId: "computing",
    name: "Master of Computer Applications",
    shortName: "MCA",
    aliases: ["MCA", "Master of Computer Applications", "Postgraduate Computing", "masters in computer science"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years (AICTE Approved Model)"]
    },
    subjectsTaught: [
      "Advanced Data Structures & Algorithms",
      "Full Stack Web Development (React & Node.js)",
      "Cloud Architecture & Microservices",
      "Data Science & Machine Learning",
      "Mobile App Development (Flutter/Kotlin)",
      "Information Security & Cryptography"
    ],
    skillsGained: [
      "Enterprise Application Architecture",
      "REST & GraphQL Microservices",
      "NoSQL & Distributed Database Design",
      "CI/CD Deployment Pipelines (Docker/K8s)",
      "Algorithmic Complexity Optimization"
    ],
    typicalEmployers: ["Amazon", "Microsoft", "Oracle", "Cognizant", "TCS", "Accenture", "Wipro"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE MCA Curriculum Norms",
      confidence: "high"
    }
  },
  {
    id: "btech-robotics",
    familyId: "engineering",
    name: "Bachelor of Technology in Robotics & Automation",
    shortName: "B.Tech Robotics",
    aliases: ["BTech Robotics", "Robotics Engineering", "Automation Engineering", "Mechatronics & Robotics", "robotics engineer"],
    level: "UG",
    regulator: "AICTE",
    structure: { durationStandardYears: 4 },
    subjectsTaught: [
      "Kinematics & Dynamics of Manipulators",
      "Sensors, Actuators & Microcontrollers",
      "Robot Operating System (ROS / ROS2)",
      "Industrial Automation & PLC/SCADA",
      "Computer Vision & Autonomous Navigation",
      "Control Systems & Feedback Design"
    ],
    skillsGained: [
      "ROS2 Nodes & Topic Programming (Python/C++)",
      "Microcontroller Interfacing (Arduino/STM32)",
      "OpenCV Object Tracking",
      "PLC Ladder Programming & Pneumatics",
      "SolidWorks 3D Mechanism CAD"
    ],
    typicalEmployers: ["GreyOrange", "Addverb Technologies", "FANUC India", "ABB India", "KUKA Robotics", "DRDO Robotics R&D Labs"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Emerging Tech Robotics Framework",
      confidence: "high"
    }
  },

  // ==========================================
  // 16. HOSPITALITY & VOCATIONAL
  // ==========================================
  {
    id: "bhm",
    familyId: "hospitality",
    name: "Bachelor of Hotel Management & Catering Technology",
    shortName: "BHM",
    aliases: ["BHM", "B.H.M", "Hotel Management", "NCHMCT JEE", "BHMCT", "Hospitality Management"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years (BHMCT)", "3 Years (B.Sc Hospitality)"]
    },
    subjectsTaught: [
      "Food Production & Culinary Arts",
      "Food & Beverage Service Operations",
      "Front Office Management & Reservation Systems",
      "Accommodation Operations & Housekeeping",
      "Hospitality Accounting & Cost Control",
      "Hospitality Law & Food Safety (FSSAI)"
    ],
    skillsGained: [
      "Opera & Fidelio PMS Software",
      "Fine Dining Gueridon Service",
      "Continental & Indian Culinary Preparations",
      "Guest Grievance Resolution",
      "FSSAI Hygiene Auditing"
    ],
    typicalEmployers: ["Taj Hotels (IHCL)", "Oberoi Group", "Marriott International", "Hyatt", "Accor Hotels", "Emirates Flight Catering"],
    isCommon: true,
    meta: {
      sourceUrl: "https://nchm.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "NCHMCT / AICTE Hospitality Board",
      confidence: "high"
    }
  },
  {
    id: "bvoc",
    familyId: "vocational",
    name: "Bachelor of Vocation in Software Development & IT",
    shortName: "B.Voc IT",
    aliases: ["BVoc", "B.Voc", "Bachelor of Vocation", "Vocational Degree", "NSQF Level 7"],
    level: "Vocational",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      year1Certificate: "NSQF Level 4 Diploma",
      year2Diploma: "NSQF Level 5 Advanced Diploma",
      year3Degree: "B.Voc Degree (NSQF Level 7)"
    },
    subjectsTaught: [
      "Core Java & Object-Oriented Design",
      "Front-end Development (HTML5, CSS3, JavaScript)",
      "Database Management & SQL",
      "Software Testing & Quality Assurance",
      "Industry Apprenticeship & On-the-Job Training",
      "Soft Skills & Workplace Communication"
    ],
    skillsGained: [
      "Practical Web Page Implementation",
      "SQL Table Creation & Querying",
      "Manual & Automated Test Case Writing",
      "Git Version Control",
      "Shop Floor Collaboration"
    ],
    typicalEmployers: ["Tech Mahindra", "Wipro Work-Integrated Learning", "Tata Consultancy Services", "Local IT Services SMEs", "Public Sector Units"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC NSQF B.Voc Scheme Guidelines",
      confidence: "high"
    }
  }
,

  // ==========================================
  // 13. ADDITIONAL UG & PG DEGREES (CATALOG EXPANSION)
  // ==========================================
  {
    id: "bsc-it",
    familyId: "computing",
    name: "Bachelor of Science in Information Technology",
    shortName: "B.Sc IT",
    aliases: ["BSc IT", "B.Sc. IT", "B.Sc Information Technology", "Bachelor of Science in IT", "Information Technology B.Sc"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Network Systems & Telecommunications",
      "Database Administration & SQL",
      "Cybersecurity & Information Assurance",
      "Cloud Infrastructure & Virtualization",
      "Web Technologies & Mobile Development",
      "Operating Systems & Linux Administration"
    ],
    skillsGained: [
      "Network Architecture & Troubleshooting",
      "Database Design & Query Tuning",
      "Cloud Operations (AWS / Azure)",
      "Linux System Administration",
      "Full-stack Web Scripting"
    ],
    typicalEmployers: ["Cisco", "Infosys", "Wipro", "TCS", "HCLTech", "Cognizant"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC LOCF Information Technology",
      confidence: "high"
    }
  },
  {
    id: "btech-biomedical",
    familyId: "engineering",
    name: "Bachelor of Technology in Biomedical Engineering",
    shortName: "B.Tech Biomedical",
    aliases: ["BTech Biomedical", "BE Biomedical Engineering", "B.Tech Bio-Medical", "Biomedical Engineering", "Bioengineering"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Biomedical Instrumentation & Sensors",
      "Physiological Systems Modeling",
      "Medical Imaging & Signal Processing",
      "Biomaterials & Artificial Organs",
      "Biomechanics & Rehabilitation Engineering",
      "Hospital Systems & Clinical Safety"
    ],
    skillsGained: [
      "Medical Device Prototyping & Calibration",
      "Biosignal Analysis (ECG/EEG in MATLAB)",
      "Regulatory Compliance (FDA / ISO 13485)",
      "Clinical Diagnostics Instrumentation",
      "CAD Modeling of Orthopedic Implants"
    ],
    typicalEmployers: ["GE Healthcare", "Siemens Healthineers", "Philips Healthcare", "Medtronic", "Apollo Hospitals", "Stryker"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Biomedical Engineering Board",
      confidence: "high"
    }
  },
  {
    id: "btech-electronics",
    familyId: "engineering",
    name: "Bachelor of Technology in Electronics & Instrumentation Engineering",
    shortName: "B.Tech Instrumentation",
    aliases: ["BTech Instrumentation", "BE Electronics & Instrumentation", "B.Tech EIE", "Instrumentation Engineering", "Electronics and Instrumentation"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Transducers & Industrial Measurement",
      "Process Dynamics & Control Systems",
      "PLC, SCADA & Distributed Control Systems (DCS)",
      "Embedded Microcontrollers & Industrial IoT",
      "Digital Signal Processing & Filtering",
      "Virtual Instrumentation (LabVIEW)"
    ],
    skillsGained: [
      "PLC / SCADA Automation Programming",
      "Industrial Sensor Interfacing & Calibration",
      "Control Loop PID Tuning",
      "Distributed Control Systems Architecture",
      "LabVIEW Data Acquisition Systems"
    ],
    typicalEmployers: ["Honeywell", "ABB", "Siemens", "Yokogawa", "Emerson", "ONGC", "NTPC"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE EIE Curriculum",
      confidence: "high"
    }
  },
  {
    id: "btech-environmental",
    familyId: "engineering",
    name: "Bachelor of Technology in Environmental Engineering",
    shortName: "B.Tech Environmental",
    aliases: ["BTech Environmental", "BE Environmental Engineering", "Environmental Engineering", "B.Tech Ecology & Environment"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years", "3 Years (Lateral)"]
    },
    subjectsTaught: [
      "Water & Industrial Wastewater Engineering",
      "Air Pollution Monitoring & Dispersion Control",
      "Solid & Hazardous Waste Remediation",
      "Environmental Impact Assessment (EIA)",
      "Hydrology & Groundwater Modeling",
      "GIS & Remote Sensing for Environmental Planning"
    ],
    skillsGained: [
      "EIA Report Preparation & Public Consultation",
      "Water Quality Laboratory Assays",
      "Air Pollution Modeling (AERMOD)",
      "Pollution Control Board Statutory Filings",
      "GIS Environmental Spatial Analysis"
    ],
    typicalEmployers: ["CPCB", "State Pollution Control Boards", "NEERI", "Suez", "Veolia", "Jacobs Engineering", "Tata Consulting Engineers"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Environmental Engineering Division",
      confidence: "high"
    }
  },
  {
    id: "bsc-microbiology",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Microbiology",
    shortName: "B.Sc Microbiology",
    aliases: ["BSc Microbiology", "B.Sc. Microbiology", "Microbiology Degree", "Bachelor of Science in Microbiology", "Microbiologist"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Bacteriology, Virology & Mycology",
      "Microbial Genetics & Molecular Biology",
      "Immunology & Serological Assays",
      "Industrial Fermentation & Bioprocess",
      "Medical & Clinical Microbiology",
      "Food & Dairy Microbiology"
    ],
    skillsGained: [
      "Aseptic Microbial Isolation & Culturing",
      "Gram Staining & Differential Microscopy",
      "PCR & Gel Electrophoresis Diagnostics",
      "Antimicrobial Susceptibility Testing",
      "GLP Cleanroom Compliance"
    ],
    typicalEmployers: ["Biocon", "Dr. Reddy's", "Serum Institute of India", "Bharat Biotech", "FSSAI", "Diagnostic Pathology Networks"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC LOCF Microbiology",
      confidence: "high"
    }
  },
  {
    id: "bsc-environmental",
    familyId: "pure_sciences",
    name: "Bachelor of Science in Environmental Science",
    shortName: "B.Sc Environmental",
    aliases: ["BSc Environmental Science", "B.Sc. Environmental", "Environmental Science Degree", "B.Sc Ecology", "Bachelor of Science in Environmental Science"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP)"]
    },
    subjectsTaught: [
      "Ecology, Ecosystems & Biodiversity",
      "Environmental Chemistry & Toxicology",
      "Atmospheric Science & Climate Modeling",
      "Natural Resource Management & Forestry",
      "Environmental Law, Ethics & Policy",
      "Remote Sensing & Spatial GIS"
    ],
    skillsGained: [
      "Biodiversity Field Sampling & Census",
      "Soil & Effluent Chemical Testing",
      "Carbon Footprint Accounting",
      "GIS Vegetation & Watershed Mapping",
      "Environmental Audit Synthesis"
    ],
    typicalEmployers: ["WWF India", "TERI", "Wildlife Institute of India", "Forest Survey of India", "Environmental Consulting Groups"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Environmental Science LOCF",
      confidence: "high"
    }
  },
  {
    id: "bms",
    familyId: "commerce",
    name: "Bachelor of Management Studies",
    shortName: "BMS",
    aliases: ["Bachelor of Management Studies", "BMS Degree", "Management Studies", "B.M.S", "Business Management Studies"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Principles of Business Management",
      "Managerial Economics & Macro Policy",
      "Marketing Strategy & Brand Management",
      "Corporate Financial Management",
      "Human Resource Planning & Industrial Relations",
      "Business Analytics & Excel Modeling"
    ],
    skillsGained: [
      "Strategic Business Case Presentation",
      "Financial Statement & Valuation Modeling",
      "Consumer Behavior & Survey Analytics",
      "Cross-Functional Team Leadership",
      "Project Risk Management"
    ],
    typicalEmployers: ["Deloitte", "KPMG", "EY", "PwC", "Reliance Industries", "HDFC Bank", "FMCG Brands"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Management Studies Framework",
      confidence: "high"
    }
  },
  {
    id: "bfia",
    familyId: "commerce",
    name: "Bachelor of Business Administration in Financial Investment Analysis",
    shortName: "BFIA",
    aliases: ["Bachelor of Finance & Accounting", "BBA FIA", "Financial Investment Analysis", "B.F.I.A", "BBA Finance", "BFIA"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP)"]
    },
    subjectsTaught: [
      "Financial Markets, Regulators & Institutions",
      "Investment Analysis & Portfolio Management",
      "Corporate Finance & Working Capital Management",
      "Derivatives, Futures & Risk Hedging",
      "Financial Econometrics & Time Series",
      "Taxation Laws & Business Auditing"
    ],
    skillsGained: [
      "Discounted Cash Flow (DCF) & LBO Valuation",
      "Portfolio Risk & Sharpe Optimization",
      "Financial Modeling in Excel & Bloomberg",
      "Derivatives Payoff Simulation",
      "Corporate Equity Research Writing"
    ],
    typicalEmployers: ["Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "TresVista", "Crisil", "Nomura"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Delhi University / UGC BFIA Framework",
      confidence: "high"
    }
  },
  {
    id: "ba-history",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in History",
    shortName: "B.A. History",
    aliases: ["BA History", "B.A. History", "Bachelor of Arts in History", "History Major", "BA Hist"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Ancient Indian Civilization & Archeology",
      "Medieval Indian Polities & Society",
      "Modern Indian Freedom Struggle & Constitutional Evolution",
      "World History, Revolutions & Imperialism",
      "Historiography & Archival Research Methods",
      "Heritage Studies & Monument Conservation"
    ],
    skillsGained: [
      "Archival Source Cross-Examination",
      "Historical Narrative & Monograph Synthesis",
      "Critical Inquiry & Qualitative Research",
      "Heritage Site Documentation",
      "Civil Services Aptitude Analytical Grounding"
    ],
    typicalEmployers: ["Archaeological Survey of India (ASI)", "National Archives of India", "Museums & Heritage Trusts", "Publishing Houses", "Civil Services Cadres"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC History Model Curriculum",
      confidence: "high"
    }
  },
  {
    id: "ba-psychology",
    familyId: "arts_humanities",
    name: "Bachelor of Arts in Psychology",
    shortName: "B.A. Psychology",
    aliases: ["BA Psychology", "B.A. Psychology", "Bachelor of Arts in Psychology", "Psychology Major", "Psychology BA"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (NEP Honours)"]
    },
    subjectsTaught: [
      "Foundational Cognitive Processes & Perception",
      "Lifespan Developmental Psychology",
      "Psychopathology & Abnormal Psychology",
      "Social Psychology & Group Dynamics",
      "Psychological Testing & Psychometrics",
      "Counseling Psychology & Therapeutic Orientations"
    ],
    skillsGained: [
      "Psychometric Battery Administration & Scoring",
      "Empathic Active Listening & Clinical Interviewing",
      "Behavioral Data Coding (SPSS)",
      "Qualitative Case Study Formulation",
      "Workplace Wellbeing Program Drafting"
    ],
    typicalEmployers: ["Mental Wellness Clinics", "Educational Institutions", "Corporate HR & Talent Acquisition", "NGOs & Rehabilitation Centers", "Market Research Agencies"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Psychology LOCF",
      confidence: "high"
    }
  },
  {
    id: "bplan",
    familyId: "design_creative",
    name: "Bachelor of Planning",
    shortName: "B.Plan",
    aliases: ["Bachelor of Planning", "BPlan", "B.Plan", "Urban Planning Degree", "City Planning", "Regional Planning"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Urban & Regional Planning Theories",
      "Transportation Planning & Mobility Systems",
      "Housing, Infrastructure & Utility Network Design",
      "Geographic Information Systems (GIS) & Spatial Analysis",
      "Environmental & Climate Resilient Planning",
      "Urban Governance, Real Estate & Planning Legislation"
    ],
    skillsGained: [
      "Master Plan & Zonal Plan Drafting",
      "Spatial GIS Modeling (ArcGIS / QGIS)",
      "Transportation Demand & Origin-Destination Analysis",
      "Urban Policy & Bye-Law Interpretation",
      "Socio-Economic Field Survey Synthesis"
    ],
    typicalEmployers: ["Urban Development Authorities (DDA, BDA, MMRDA)", "Town & Country Planning Departments", "Smart Cities Missions", "Real Estate Advisory (JLL, CBRE)", "NITI Aayog"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "Institute of Town Planners India (ITPI) / AICTE",
      confidence: "high"
    }
  },
  {
    id: "ba-llb",
    familyId: "law",
    name: "Bachelor of Arts & Bachelor of Laws (5-Year Integrated)",
    shortName: "B.A. LL.B",
    aliases: ["BA LLB", "B.A. LL.B (Hons)", "5-Year Law", "Integrated Law", "bbal-aw", "Bachelor of Arts and Bachelor of Laws"],
    level: "UG",
    regulator: "BCI",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5 Years Integrated"]
    },
    subjectsTaught: [
      "Constitutional Law & Administrative Law",
      "Criminal Jurisprudence (Bharatiya Nyaya Sanhita / CrPC)",
      "Law of Contracts & Specific Relief",
      "Civil Procedure Code & Law of Evidence",
      "Public International Law & Human Rights",
      "Corporate Law, IPR & Moot Court Advocacy"
    ],
    skillsGained: [
      "Legal Case Research & Precedent Analysis (SCC Online / Manupatra)",
      "Pleadings, Petitions & Commercial Contract Drafting",
      "Courtroom Argumentation & Moot Advocacy",
      "Alternative Dispute Resolution (Mediation / Arbitration)",
      "Statutory Construction"
    ],
    typicalEmployers: ["Shardul Amarchand Mangaldas", "Cyril Amarchand Mangaldas", "Trilegal", "AZB & Partners", "Supreme Court & High Courts", "Corporate Legal Departments"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.barcouncilofindia.org",
      retrievedOn: "2025-06-15",
      verifier: "Bar Council of India (BCI) Legal Education Rules",
      confidence: "high"
    }
  },
  {
    id: "bba-llb",
    familyId: "law",
    name: "Bachelor of Business Administration & Bachelor of Laws (5-Year Integrated)",
    shortName: "BBA LL.B",
    aliases: ["BBA LLB", "B.B.A. LL.B (Hons)", "Corporate Law Integrated", "bbal-bba", "Bachelor of Business Administration and Bachelor of Laws"],
    level: "UG",
    regulator: "BCI",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5 Years Integrated"]
    },
    subjectsTaught: [
      "Company Law & Corporate Governance",
      "Mergers, Acquisitions & Competition Law",
      "Banking, Insurance & Financial Regulations",
      "Securities Law & SEBI Regulations",
      "Intellectual Property Rights & Patent Law",
      "Business Management, Accounting & Taxation Laws"
    ],
    skillsGained: [
      "M&A Due Diligence & Share Purchase Agreements",
      "Corporate Regulatory Compliance (SEBI / MCA / RBI)",
      "Commercial Contract Negotiation",
      "IP Trademark & Patent Filing",
      "Arbitration Brief Preparation"
    ],
    typicalEmployers: ["Top Law Firms (SAM, CAM, Khaitan & Co)", "In-House Legal Wings (Tata, Reliance, Infosys)", "Big 4 Consulting Legal Practices", "Investment Banks"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.barcouncilofindia.org",
      retrievedOn: "2025-06-15",
      verifier: "Bar Council of India (BCI) Corporate Stream",
      confidence: "high"
    }
  },
  {
    id: "bnys",
    familyId: "health_medicine",
    name: "Bachelor of Naturopathy & Yogic Sciences",
    shortName: "BNYS",
    aliases: ["Bachelor of Naturopathy & Yogic Sciences", "BNYS Doctor", "Naturopathy and Yoga", "B.N.Y.S", "Naturopathy Degree"],
    level: "UG",
    regulator: "NMC",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5.5 Years (4.5 Years Academic + 1 Year Mandatory Internship)"]
    },
    subjectsTaught: [
      "Human Anatomy & Human Physiology",
      "Philosophy & Practice of Yoga & Pranayama",
      "Hydrotherapy, Mud Therapy & Chromotherapy",
      "Nutrition, Dietetics & Fasting Therapy",
      "Acupuncture, Acupressure & Reflexology",
      "Clinical Naturopathy & Lifestyle Disease Management"
    ],
    skillsGained: [
      "Non-Invasive Holistic Clinical Diagnosis",
      "Therapeutic Yoga Protocol Formulation",
      "Clinical Lifestyle Prescription & Fasting Management",
      "Hydrotherapy & Massage Therapy Administration",
      "Preventive Health Counseling"
    ],
    typicalEmployers: ["AYUSH Hospitals", "Naturopathy Sanatoriums", "Preventive Wellness Resorts", "Medical Tourism Centers", "Integrative Medicine Clinics"],
    isCommon: true,
    meta: {
      sourceUrl: "https://ayush.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Ministry of AYUSH / Central Council for Research in Yoga and Naturopathy",
      confidence: "high"
    }
  },
  {
    id: "bmlt",
    familyId: "health_medicine",
    name: "Bachelor of Medical Laboratory Technology",
    shortName: "BMLT",
    aliases: ["Bachelor of Medical Laboratory Technology", "BMLT", "B.M.L.T", "Medical Lab Science", "B.Sc MLT"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years", "4 Years (with Internship)"]
    },
    subjectsTaught: [
      "Clinical Biochemistry & Enzymology",
      "Hematology, Blood Banking & Transfusion Medicine",
      "Medical Microbiology & Parasitology",
      "Histopathology & Cytological Techniques",
      "Immunology, Serology & Molecular Diagnostics",
      "Laboratory Quality Assurance & Biosafety"
    ],
    skillsGained: [
      "Automated Blood & Biochemical Analyzer Calibration",
      "Microscopic Cell Morphology & Smear Interpretation",
      "Blood Group Typing & Cross-Matching",
      "Clinical Chemistry Quality Control (Westgard Rules)",
      "Biohazard Safety Protocol Enforcement"
    ],
    typicalEmployers: ["Dr. Lal PathLabs", "Metropolis Healthcare", "SRL Diagnostics", "Government District Hospitals", "Apollo Diagnostics"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Commission for Allied and Healthcare Professions (NCAHP)",
      confidence: "high"
    }
  },
  {
    id: "bhms",
    familyId: "health_medicine",
    name: "Bachelor of Homeopathic Medicine and Surgery",
    shortName: "BHMS",
    aliases: ["Bachelor of Homeopathic Medicine and Surgery", "BHMS Doctor", "Homeopathy Degree", "B.H.M.S", "Homeopathic Physician"],
    level: "UG",
    regulator: "NMC",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5.5 Years (4.5 Years + 1 Year CRRI)"]
    },
    subjectsTaught: [
      "Organon of Medicine & Homeopathic Philosophy",
      "Homeopathic Materia Medica & Therapeutics",
      "Homeopathic Pharmacy & Drug Proving",
      "Human Anatomy, Physiology & Biochemistry",
      "General Pathology & Systemic Microbiology",
      "Practice of Medicine, Surgery & Gynecology"
    ],
    skillsGained: [
      "Holistic Constitutional Case Taking",
      "Repertorization (Radar / Kent Methodologies)",
      "Homeopathic Medicine Dispensing & Potentization",
      "Clinical Physical Examination",
      "Chronic Disease Management"
    ],
    typicalEmployers: ["Central Council for Research in Homeopathy (CCRH)", "State AYUSH Hospitals", "Private Homeopathic Clinics", "Schwabe India", "SBL Homeopathy"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.nch.org.in",
      retrievedOn: "2025-06-15",
      verifier: "National Commission for Homoeopathy (NCH)",
      confidence: "high"
    }
  },
  {
    id: "bams",
    familyId: "health_medicine",
    name: "Bachelor of Ayurvedic Medicine and Surgery",
    shortName: "BAMS",
    aliases: ["Bachelor of Ayurvedic Medicine and Surgery", "BAMS Doctor", "Ayurveda Degree", "B.A.M.S", "Ayurvedic Physician"],
    level: "UG",
    regulator: "NMC",
    structure: {
      durationStandardYears: 5,
      durationVariants: ["5.5 Years (4.5 Years + 1 Year CRRI)"]
    },
    subjectsTaught: [
      "Padartha Vijnana & Samhita Siddhanta",
      "Rachana Sharir (Anatomy) & Kriya Sharir (Physiology)",
      "Dravyaguna Vijnana (Ayurvedic Pharmacology)",
      "Rasa Shastra & Bhaishajya Kalpana (Pharmaceutics)",
      "Panchakarma Procedures & Detoxification",
      "Kayachikitsa (Internal Medicine) & Shalya Tantra (Surgery)"
    ],
    skillsGained: [
      "Nadi Pariksha (Ayurvedic Pulse Diagnosis)",
      "Panchakarma Protocol Supervision (Vamana, Virechana, Basti)",
      "Herbal Compound Formulation & Quality Testing",
      "Integrative Clinical Management of Chronic Disorders",
      "Ayurvedic Preventive Diet & Lifestyle Prescription"
    ],
    typicalEmployers: ["All India Institute of Ayurveda (AIIA)", "Patanjali Ayurved", "Dabur India", "Himalaya Wellness", "State AYUSH Dispensaries"],
    isCommon: true,
    meta: {
      sourceUrl: "https://ncismindia.org",
      retrievedOn: "2025-06-15",
      verifier: "National Commission for Indian System of Medicine (NCISM)",
      confidence: "high"
    }
  },
  {
    id: "bdes-industrial",
    familyId: "design_creative",
    name: "Bachelor of Design in Industrial Design",
    shortName: "B.Des Industrial",
    aliases: ["Bachelor of Design in Industrial Design", "Industrial Design", "Product Design Degree", "BDes Product Design", "B.Des Industrial Design"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Design Drawing, Sketching & Form Studies",
      "Materials & Manufacturing Technology",
      "Applied Ergonomics & Anthropometry",
      "3D CAD Modeling (SolidWorks / Rhino)",
      "Physical Prototyping & Workshop Practice",
      "Design for Assembly (DFA) & Circular Economy"
    ],
    skillsGained: [
      "Rapid Ideation Concept Sketching",
      "High-Precision 3D CAD Surface Modeling",
      "Rapid Prototyping (3D Printing / CNC Milling)",
      "Ergonomic Usability Assessment",
      "Design Verification for Mass Manufacturing"
    ],
    typicalEmployers: ["Tata Elxsi", "Godrej Design Lab", "Havells", "Titan Design Studio", "Whirlpool", "Automotive Styling Studios"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "National Institute of Design (NID) / AICTE",
      confidence: "high"
    }
  },
  {
    id: "bdes-graphic",
    familyId: "design_creative",
    name: "Bachelor of Design in Graphic Design",
    shortName: "B.Des Graphic",
    aliases: ["Bachelor of Design in Graphic Design", "Graphic Design Degree", "Communication Design", "BDes Visual Communication", "B.Des Graphic Design"],
    level: "UG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Typography, Lettering & Hierarchy",
      "Visual Identity & Brand Architecture",
      "Publication, Book & Editorial Design",
      "Digital Illustration & Vector Graphics",
      "Packaging Design & Structural Die-Lines",
      "UI/UX Fundamentals & Web Layouts"
    ],
    skillsGained: [
      "Brand Identity System Creation (Adobe Suite)",
      "Advanced Typography & Grid Layouts",
      "Vector & Digital Illustration",
      "Packaging Technical Production Readiness",
      "Visual Storytelling & Creative Pitching"
    ],
    typicalEmployers: ["Ogilvy", "Landor & Fitch", "Dentsu Creative", "Flipkart Design", "Swiggy Studio", "Pentagram"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE / NID Communication Design Council",
      confidence: "high"
    }
  },
  {
    id: "bfa",
    familyId: "design_creative",
    name: "Bachelor of Fine Arts",
    shortName: "BFA",
    aliases: ["Bachelor of Fine Arts", "B.F.A", "Fine Arts Degree", "Painting and Sculpture", "BFA Applied Arts"],
    level: "UG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Drawing, Anatomy & Life Study",
      "Painting Techniques (Oil, Acrylic, Tempera, Watercolor)",
      "Sculpture, Clay Modeling & Casting",
      "History of Indian & Western Visual Art",
      "Printmaking (Lithography, Woodcut, Etching)",
      "Applied Art, Concept Art & Aesthetics"
    ],
    skillsGained: [
      "Traditional Medium Painting & Drawing Mastery",
      "Digital Concept Art & Environment Design",
      "Sculptural Form Fabrication",
      "Art Exhibition Curation & Cataloging",
      "Visual Aesthetics & Creative Direction"
    ],
    typicalEmployers: ["Animation & VFX Studios", "Gaming Companies (Ubisoft, Rockstar)", "Advertising Agencies", "Art Galleries & Museums", "Publishers"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Fine Arts Board",
      confidence: "high"
    }
  },
  {
    id: "bsc-horticulture",
    familyId: "agriculture",
    name: "Bachelor of Science in Horticulture",
    shortName: "B.Sc Horticulture",
    aliases: ["BSc Horticulture", "B.Sc. Horticulture", "Bachelor of Science in Horticulture", "Horticulture Degree"],
    level: "UG",
    regulator: "ICAR",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Fruit Science (Pomology) & Orchard Management",
      "Vegetable Science (Olericulture) & Seed Production",
      "Commercial Floriculture & Landscape Architecture",
      "Post-Harvest Management & Food Processing",
      "Plant Breeding, Tissue Culture & Biotechnology",
      "Greenhouse Automation & Hydroponics"
    ],
    skillsGained: [
      "Protected Cultivation & Polyhouse Management",
      "Grafting, Budding & Micropropagation",
      "Orchard Layout & Landscape Drafting",
      "Cold Chain & Post-Harvest Quality Control",
      "Horticultural Crop Pest Diagnostics"
    ],
    typicalEmployers: ["National Horticulture Board (NHB)", "State Horticulture Departments", "ITC Agri Business", "Syngenta", "Commercial Floriculture Enterprises"],
    isCommon: true,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "Indian Council of Agricultural Research (ICAR)",
      confidence: "high"
    }
  },
  {
    id: "bsc-forestry",
    familyId: "agriculture",
    name: "Bachelor of Science in Forestry",
    shortName: "B.Sc Forestry",
    aliases: ["BSc Forestry", "B.Sc. Forestry", "Bachelor of Science in Forestry", "Forestry Degree"],
    level: "UG",
    regulator: "ICAR",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Principles of Silviculture & Tree Measurement",
      "Forest Ecology, Biodiversity & Soil Conservation",
      "Wood Science, Timber Anatomy & Forest Products",
      "Wildlife Management & Habitat Conservation",
      "Forest Remote Sensing & GIS Geomatics",
      "Forest Laws, Policies & Tribal Rights"
    ],
    skillsGained: [
      "Forest Canopy & Stand Inventory Assessment",
      "GIS Satellite Mapping for Deforestation Monitoring",
      "Wildlife Census Methodologies",
      "Sustainable Timber Harvesting Planning",
      "Forest Carbon Sequestration Modeling"
    ],
    typicalEmployers: ["Indian Forest Service (IFS)", "State Forest Departments", "Wildlife Institute of India (WII)", "Forest Research Institute (FRI)", "Paper & Pulp Industries"],
    isCommon: true,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "ICAR 5th Deans Committee on Forestry",
      confidence: "high"
    }
  },
  {
    id: "bsc-fisheries",
    familyId: "agriculture",
    name: "Bachelor of Fisheries Science",
    shortName: "B.F.Sc Fisheries",
    aliases: ["Bachelor of Fisheries Science", "BFSc", "B.F.Sc", "BSc Fisheries", "Fisheries Science"],
    level: "UG",
    regulator: "ICAR",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["4 Years"]
    },
    subjectsTaught: [
      "Aquaculture Engineering & Pond Ecology",
      "Fish Pathology, Immunology & Pharmacology",
      "Fish Processing Technology & Quality Assurance (HACCP)",
      "Marine Biology & Oceanography",
      "Fishing Gear & Vessel Technology",
      "Fisheries Economics & Marketing"
    ],
    skillsGained: [
      "Finfish & Shellfish Induced Breeding Operations",
      "Recirculating Aquaculture System (RAS) Operation",
      "Export Seafood Quality Auditing (EU / FDA)",
      "Aquatic Disease Diagnostics & Water Chemistry",
      "Feed Formulation & Biosecurity Protocols"
    ],
    typicalEmployers: ["Marine Products Export Development Authority (MPEDA)", "State Fisheries Departments", "Central Institute of Fisheries Education (CIFE)", "Seafood Export Companies", "Commercial Hatcheries"],
    isCommon: true,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "ICAR Fisheries Education Division",
      confidence: "high"
    }
  },
  {
    id: "msc-cs",
    familyId: "computing",
    name: "Master of Science in Computer Science",
    shortName: "M.Sc CS",
    aliases: ["MSc Computer Science", "M.Sc. CS", "Master of Science in Computer Science", "msc-compsci", "M.Sc Computer Science"],
    level: "PG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Design & Analysis of Algorithms",
      "Distributed Computing & Cloud Architecture",
      "Machine Learning & Pattern Recognition",
      "Advanced Database Systems & Big Data Technologies",
      "Cryptography & Network Security",
      "Research Methodology & Dissertation Project"
    ],
    skillsGained: [
      "High-Performance Algorithmic Optimization",
      "Distributed Systems Engineering",
      "Applied Machine Learning with Python",
      "Database Scalability & Sharding Architecture",
      "Technical Research Paper Authorship"
    ],
    typicalEmployers: ["Google", "Microsoft Research", "Amazon", "IBM Research", "Oracle", "Top Academic Institutions"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Master's Framework in Computing",
      confidence: "high"
    }
  },
  {
    id: "mtech-cse",
    familyId: "engineering",
    name: "Master of Technology in Computer Science & Engineering",
    shortName: "M.Tech CSE",
    aliases: ["MTech CSE", "M.Tech Computer Science", "Master of Technology in Computer Science", "MTech CS"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Computer Architecture & Parallel Systems",
      "Deep Learning & Neural Network Systems",
      "Distributed Systems & Cloud Infrastructure",
      "Advanced Operating Systems & Kernel Internals",
      "Cybersecurity, Cryptography & Hardware Security"
    ],
    skillsGained: [
      "Hardware-Software Co-Optimization",
      "Deep Learning Model Architecture & Fine-Tuning",
      "Cloud-Native Distributed Infrastructure",
      "Low-Level Kernel Programming & Profiling",
      "Doctoral Research & Patent Filing"
    ],
    typicalEmployers: ["NVIDIA", "Qualcomm", "Intel", "AMD", "Microsoft", "Adobe", "IIT / NIT Faculty Cadres"],
    isCommon: true,
    customPrivateCareers: [
      {
        id: "occ-mt-software-architect",
        title: "Senior Distributed Systems & Software Architect",
        sector: "Information Technology & Enterprise Infrastructure",
        employerType: "private",
        isEntryLevel: false,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Distributed Systems", "C++ / Go / Rust", "Kubernetes", "Kafka", "Microservices Architecture"],
        indicativeSalary: {
          minLPA: 16.0,
          maxLPA: 35.0,
          unit: "LPA (CTC in Metro)",
          region: "Pan-India / Metro",
          year: 2026,
          source: "NASSCOM Tech Salary Benchmark",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Architects resilient, high-throughput backend services, low-latency microservices, and large-scale cloud infrastructure.",
        topEmployers: ["Google", "Microsoft", "Amazon", "NVIDIA", "Salesforce"],
        linkedCareerId: "software-engineer",
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2026-06-15",
          verifier: "NASSCOM Engineering Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-mt-ai-research-engineer",
        title: "AI & Machine Learning Research Engineer",
        sector: "Artificial Intelligence & Computational Intelligence",
        employerType: "private",
        isEntryLevel: false,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["PyTorch / JAX", "Deep Learning Architectures", "LLMOps & Fine-Tuning", "CUDA / GPU Optimization", "Python"],
        indicativeSalary: {
          minLPA: 18.0,
          maxLPA: 40.0,
          unit: "LPA (CTC)",
          region: "Bengaluru / Hyderabad / NCR",
          year: 2026,
          source: "AIM Research Salary Report",
          sourceUrl: "https://analyticsindiamag.com"
        },
        description: "Designs novel neural architectures, trains foundation models, and accelerates deep learning inference on heterogeneous clusters.",
        topEmployers: ["NVIDIA", "Meta", "Google DeepMind", "Microsoft Research", "OpenAI"],
        linkedCareerId: "data-scientist",
        meta: {
          sourceUrl: "https://analyticsindiamag.com",
          retrievedOn: "2026-06-15",
          verifier: "AIM Analytics Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-mt-cloud-devops-architect",
        title: "Cloud Platform & Systems Infrastructure Engineer",
        sector: "Cloud Infrastructure & Platform Operations",
        employerType: "private",
        isEntryLevel: false,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Terraform", "Kubernetes", "Linux Kernel Internals", "AWS / Azure / GCP", "CI/CD Platforms"],
        indicativeSalary: {
          minLPA: 14.0,
          maxLPA: 30.0,
          unit: "LPA",
          region: "Pan-India",
          year: 2026,
          source: "Hays Tech Salary Guide",
          sourceUrl: "https://www.hays.com"
        },
        description: "Designs automated multi-cloud deployment platforms, ensures 99.99% system availability, and secures containerized microservices.",
        topEmployers: ["JPMorgan Chase", "Adobe", "Flipkart", "Accenture", "Infosys"],
        linkedCareerId: "devops-engineer",
        meta: {
          sourceUrl: "https://www.hays.com",
          retrievedOn: "2026-06-15",
          verifier: "Hays Tech Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-mt-cybersecurity-architect",
        title: "Cybersecurity & Cryptographic Systems Architect",
        sector: "Information Security & Cryptographic Engineering",
        employerType: "private",
        isEntryLevel: false,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Zero-Trust Architecture", "Applied Cryptography", "Threat Modeling", "Hardware Security", "Network Protocols"],
        indicativeSalary: {
          minLPA: 15.0,
          maxLPA: 32.0,
          unit: "LPA",
          region: "Metro",
          year: 2026,
          source: "DSCI Cyber Salary Index",
          sourceUrl: "https://www.dsci.in"
        },
        description: "Protects critical computing systems, audits secure communications protocols, and implements post-quantum cryptographic primitives.",
        topEmployers: ["Palo Alto Networks", "Cisco", "CrowdStrike", "Qualcomm", "TCS Cyber"],
        linkedCareerId: "cybersecurity-specialist",
        meta: {
          sourceUrl: "https://www.dsci.in",
          retrievedOn: "2026-06-15",
          verifier: "DSCI Security Survey",
          confidence: "high"
        }
      },
      {
        id: "occ-mt-rd-scientist",
        title: "Research Scientist / Member of Technical Staff (R&D)",
        sector: "Advanced Industrial & National Research Laboratories",
        employerType: "private",
        isEntryLevel: false,
        requiredDegreeRules: { allowedDegreeFamilies: ["engineering", "computing"] },
        skills: ["Scientific Computing", "Algorithmic Complexity", "Technical Publishing", "Patent Drafting", "C++ / Python"],
        indicativeSalary: {
          minLPA: 18.0,
          maxLPA: 42.0,
          unit: "LPA",
          region: "Metro / Autonomous Labs",
          year: 2026,
          source: "Corporate R&D Survey",
          sourceUrl: "https://www.nasscom.in"
        },
        description: "Conducts breakthrough computing research, files technological patents, and transfers novel algorithmic prototypes into industrial production.",
        topEmployers: ["Samsung R&D Institute", "Intel Labs", "Qualcomm R&D", "C-DAC", "DRDO Labs"],
        linkedCareerId: "research-scientist",
        meta: {
          sourceUrl: "https://www.nasscom.in",
          retrievedOn: "2026-06-15",
          verifier: "NASSCOM R&D Report",
          confidence: "high"
        }
      }
    ],
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE PG Engineering Framework",
      confidence: "high"
    }
  },
  {
    id: "phd-cse",
    familyId: "engineering",
    name: "Doctor of Philosophy in Computer Science & Engineering",
    shortName: "Ph.D CSE",
    aliases: ["PhD CSE", "Ph.D Computer Science", "Doctorate in Computer Science", "PhD CS", "Doctor of Philosophy CS", "phd-cs"],
    level: "Doctoral",
    regulator: "UGC",
    structure: {
      durationStandardYears: 4,
      durationVariants: ["3-5 Years"]
    },
    subjectsTaught: [
      "Advanced Research Methodologies & Quantitative Analysis",
      "Doctoral Research Seminar & Literature Review",
      "Specialized Domain Thesis & Dissertation Research",
      "Research Ethics, Scholarly Publishing & Peer Review",
      "Independent Theoretical & Experimental Computing"
    ],
    skillsGained: [
      "Original Theoretical & Applied Scientific Research",
      "High-Impact Peer-Reviewed Journal Publishing (IEEE/ACM)",
      "Grant Proposal Formulation & Research Funding Acquisition",
      "University Graduate Level Pedagogy & Research Mentoring",
      "Patenting Novel Algorithmic & Computing Architectures"
    ],
    typicalEmployers: [
      "Premier Universities & Research Institutes (IISc, IITs, NITs, Central Universities)",
      "Corporate Research Labs (Microsoft Research, Google Research, IBM Research)",
      "Autonomous National Laboratories (TIFR, C-DAC, DRDO, ISRO)",
      "Deep-Tech Unicorns & Quantitative Algorithmic Research Firms"
    ],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2026-06-15",
      verifier: "UGC Doctoral Degree Minimum Standards & Procedures",
      confidence: "high"
    }
  },
  {
    id: "mtech-mech",
    familyId: "engineering",
    name: "Master of Technology in Mechanical Engineering",
    shortName: "M.Tech Mech",
    aliases: ["MTech Mechanical", "M.Tech Mechanical Engineering", "MTech Thermal", "MTech Design", "MTech Manufacturing", "mtech-mechanical"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Finite Element Analysis (FEA)",
      "Computational Fluid Dynamics (CFD)",
      "Advanced Dynamics of Machinery & Vibrations",
      "Fracture Mechanics & Fatigue Design",
      "Advanced Thermodynamics & Energy Systems"
    ],
    skillsGained: [
      "Complex Structural FEA Simulations (ANSYS / Abaqus)",
      "Aerodynamic & Thermal CFD Modeling (Fluent)",
      "Non-Linear Mechanics & Fatigue Estimation",
      "Design of Advanced Propulsion & Turbomachinery",
      "Experimental Modal Testing & Diagnostics"
    ],
    typicalEmployers: ["ISRO", "DRDO", "Tata Motors R&D", "Mahindra Research Valley", "General Electric", "Airbus"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Mechanical PG Curriculum",
      confidence: "high"
    }
  },
  {
    id: "mtech-eee",
    familyId: "engineering",
    name: "Master of Technology in Electrical Engineering",
    shortName: "M.Tech Electrical",
    aliases: ["MTech Electrical", "M.Tech Electrical Engineering", "MTech Power Systems", "MTech Power Electronics", "mtech-electrical"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Power System Dynamics & Stability",
      "High-Power Converters & Electric Vehicle Drives",
      "Smart Grid Infrastructure & Distributed Energy",
      "Digital Signal Processors in Power Electronics",
      "Modern Control Theory & State-Space Modeling"
    ],
    skillsGained: [
      "Microgrid & Smart Grid Transient Simulation",
      "EV Motor Inverter Hardware-in-the-Loop Testing",
      "Power Quality Harmonic Mitigation Design",
      "DSP Firmware for Converter Controls",
      "High-Voltage Substation Protection Engineering"
    ],
    typicalEmployers: ["Power Grid Corporation (PGCIL)", "Schneider Electric", "ABB", "Siemens Energy", "Tata Power", "Tesla / EV R&D"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Electrical Engineering Board",
      confidence: "high"
    }
  },
  {
    id: "mtech-civil",
    familyId: "engineering",
    name: "Master of Technology in Civil Engineering",
    shortName: "M.Tech Civil",
    aliases: ["MTech Civil", "M.Tech Civil Engineering", "MTech Structural", "MTech Geotechnical", "MTech Transportation"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Structural Dynamics & Seismic Engineering",
      "Non-Linear Finite Element Analysis of Concrete & Steel",
      "Deep Foundations & Soil-Structure Interaction",
      "Highway Geometric Design & Traffic Flow Modeling",
      "Water Resources Systems Planning & Hydro-Informatics"
    ],
    skillsGained: [
      "High-Rise Structural Modeling (ETABS / STAAD.Pro)",
      "Earthquake Resilient Building Design",
      "Geotechnical Retaining Wall & Foundation Analysis (Plaxis)",
      "Transportation Corridor Traffic Simulation",
      "Detailed Project Report (DPR) Synthesis"
    ],
    typicalEmployers: ["Larsen & Toubro Construction", "NHAI", "Tata Consulting Engineers", "Afcons Infrastructure", "Jacobs", "DMRC"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Civil Engineering Board",
      confidence: "high"
    }
  },
  {
    id: "mcom",
    familyId: "commerce",
    name: "Master of Commerce",
    shortName: "M.Com",
    aliases: ["MCom", "M.Com", "Master of Commerce", "M.Com Finance", "M.Com Accounting"],
    level: "PG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Corporate Financial Accounting & Reporting",
      "International Finance & Foreign Exchange Markets",
      "Strategic Cost Management & Decision Analysis",
      "Direct & Indirect Taxation Planning",
      "Advanced Business Statistics & Econometric Methods",
      "Corporate Governance & Business Ethics"
    ],
    skillsGained: [
      "Consolidated Financial Statement Preparation (Ind AS / IFRS)",
      "Corporate Tax Structuring & Advisory",
      "Quantitative Business Research (SPSS / R)",
      "Cost Allocation & Activity-Based Budgeting",
      "University Commerce Lecturing Competency"
    ],
    typicalEmployers: ["Big 4 Accounting (Deloitte, EY, PwC, KPMG)", "State Bank of India", "ICICI Bank", "Higher Education Institutions", "Corporate Treasuries"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Commerce PG Curriculum",
      confidence: "high"
    }
  },
  {
    id: "mba",
    familyId: "commerce",
    name: "Master of Business Administration",
    shortName: "MBA",
    aliases: ["MBA", "Master of Business Administration", "PGDM", "Post Graduate Diploma in Management", "Business Administration Master"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Corporate Strategic Management & Leadership",
      "Marketing Strategy & Brand Management",
      "Corporate Finance, Valuation & Capital Markets",
      "Operations Research & Supply Chain Optimization",
      "Human Capital Strategy & Organizational Behavior",
      "Business Analytics & Data-Driven Decision Making"
    ],
    skillsGained: [
      "Executive Financial Modeling & P&L Ownership",
      "Market Penetration Strategy Formulation",
      "Cross-Functional Operational Leadership",
      "Boardroom Pitching & Stakeholder Negotiation",
      "Enterprise Transformation Management"
    ],
    typicalEmployers: ["McKinsey & Company", "Boston Consulting Group (BCG)", "Bain & Company", "Amazon", "Hindustan Unilever", "Citibank"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE / IIM Management Guidelines",
      confidence: "high"
    }
  },
  {
    id: "ma-english",
    familyId: "arts_humanities",
    name: "Master of Arts in English Literature",
    shortName: "M.A. English",
    aliases: ["MA English", "M.A. English", "Master of Arts in English", "English Literature MA"],
    level: "PG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Literary Theory, Postmodernism & Cultural Studies",
      "British Literature: From Renaissance to Modernism",
      "Indian Writing in English & Postcolonial Studies",
      "World Literature & Translation Studies",
      "Linguistics, Phonetics & English Language Teaching",
      "Research Methodologies in Literary Studies"
    ],
    skillsGained: [
      "Rigorous Textual & Discourse Criticism",
      "High-Level Editorial & Publishing Review",
      "Curriculum Design for English Language Teaching",
      "Creative Writing & Corporate Communications",
      "Academic Research Synthesis"
    ],
    typicalEmployers: ["Oxford University Press", "Penguin Random House", "Central & State Universities", "Corporate Communications Units", "Media & Editorial Agencies"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC English Literature PG Board",
      confidence: "high"
    }
  },
  {
    id: "ma-economics",
    familyId: "arts_humanities",
    name: "Master of Arts in Economics",
    shortName: "M.A. Economics",
    aliases: ["MA Economics", "M.A. Economics", "Master of Arts in Economics", "M.Sc Economics", "Economist MA"],
    level: "PG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Microeconomic Theory & Game Theory",
      "Advanced Macroeconomic Modeling & Monetary Policy",
      "Econometric Methods & Time Series Econometrics",
      "Development Economics & Policy Formulation",
      "Public Economics & Fiscal Federalism",
      "Financial Economics & Portfolio Theory"
    ],
    skillsGained: [
      "Econometric Modeling (Stata / R / Python)",
      "Macroeconomic Forecast Construction",
      "Public Policy Impact Assessment",
      "Financial Asset Pricing & Risk Estimation",
      "Policy White Paper Synthesis"
    ],
    typicalEmployers: ["Reserve Bank of India (RBI)", "Ministry of Finance", "NITI Aayog", "World Bank / Asian Development Bank", "J.P. Morgan", "Crisil"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Delhi School of Economics / UGC Economics Board",
      confidence: "high"
    }
  },
  {
    id: "mpharm",
    familyId: "health_medicine",
    name: "Master of Pharmacy",
    shortName: "M.Pharm",
    aliases: ["MPharm", "M.Pharm", "Master of Pharmacy", "M.Pharm Pharmacology", "M.Pharm Pharmaceutics"],
    level: "PG",
    regulator: "PCI",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Modern Pharmaceutical Analytical Techniques (HPLC / LC-MS)",
      "Advanced Biopharmaceutics & Pharmacokinetics",
      "Targeted Novel Drug Delivery Systems",
      "Regulatory Affairs & Clinical Research Protocols",
      "Molecular Pharmacology & Drug Screening",
      "Industrial Pharmacy & cGMP Manufacturing"
    ],
    skillsGained: [
      "Chromatographic & Spectroscopic Method Validation",
      "Novel Formulation Development & Dissolution Testing",
      "Regulatory Dossier Compilation (CTD / eCTD)",
      "Bioavailability & Bioequivalence (BA/BE) Study Design",
      "Clinical Trial Protocol Management"
    ],
    typicalEmployers: ["Sun Pharma", "Dr. Reddy's Laboratories", "Cipla", "Novartis", "Pfizer", "Central Drugs Standard Control Organisation (CDSCO)"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.pci.nic.in",
      retrievedOn: "2025-06-15",
      verifier: "Pharmacy Council of India (PCI) PG Board",
      confidence: "high"
    }
  },
  {
    id: "mds",
    familyId: "health_medicine",
    name: "Master of Dental Surgery",
    shortName: "MDS",
    aliases: ["MDS", "Master of Dental Surgery", "M.D.S", "Dental Specialist", "Oral Surgery Master"],
    level: "PG",
    regulator: "DCI",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years"]
    },
    subjectsTaught: [
      "Applied Basic Sciences & Craniofacial Anatomy",
      "Orthodontics & Dentofacial Orthopedics",
      "Oral & Maxillofacial Surgery",
      "Conservative Dentistry & Endodontics",
      "Prosthodontics, Crown & Bridge Implantology",
      "Periodontology & Oral Pathology"
    ],
    skillsGained: [
      "Complex Surgical Tooth Impaction & Jaw Alignment",
      "Fixed Orthodontic Appliance Management",
      "Precision Dental Implant Placement",
      "Microscopic Endodontic Root Canal Therapy",
      "Maxillofacial Trauma Emergency Management"
    ],
    typicalEmployers: ["Government Dental Colleges", "Multispecialty Hospitals", "Private Advanced Dental Practices", "Military Dental Centre"],
    isCommon: true,
    meta: {
      sourceUrl: "https://dciindia.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Dental Council of India (DCI)",
      confidence: "high"
    }
  },
  {
    id: "ms-surgery",
    familyId: "health_medicine",
    name: "Master of Surgery in General Surgery",
    shortName: "M.S. Surgery",
    aliases: ["MS General Surgery", "Master of Surgery", "M.S. General Surgery", "MS Surgery", "General Surgeon", "ms-general-surgery"],
    level: "PG",
    regulator: "NMC",
    structure: {
      durationStandardYears: 3,
      durationVariants: ["3 Years Residency"]
    },
    subjectsTaught: [
      "Principles of Surgery, Shock & Critical Care",
      "Operative General Surgery & Trauma Resuscitation",
      "Laparoscopic & Minimally Invasive Surgical Techniques",
      "Surgical Oncology & Endocrine Surgery",
      "Vascular, Plastic & Reconstructive Surgery Basics",
      "Post-Operative Critical Care Management"
    ],
    skillsGained: [
      "Major Open & Laparoscopic Abdominal Surgery",
      "Emergency Polytrauma Surgical Resuscitation",
      "Elective Hernia, Thyroid & Gallbladder Resection",
      "Wound Debridement & Reconstructive Flaps",
      "Surgical ICU Ventilatory & Fluid Management"
    ],
    typicalEmployers: ["AIIMS", "PGIMER", "State Government Medical Colleges", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.nmc.org.in",
      retrievedOn: "2025-06-15",
      verifier: "National Medical Commission (NMC) Postgraduate Medical Board",
      confidence: "high"
    }
  },
  {
    id: "msc-agri",
    familyId: "agriculture",
    name: "Master of Science in Agriculture",
    shortName: "M.Sc Agri",
    aliases: ["MSc Agriculture", "M.Sc. Agriculture", "Master of Science in Agriculture", "m.sc-agriculture", "M.Sc Agronomy"],
    level: "PG",
    regulator: "ICAR",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Modern Concepts in Crop Production & Agronomy",
      "Soil Fertility, Plant Nutrition & Nutrient Dynamics",
      "Experimental Designs & Statistical Research Methods",
      "Physiology of Drought, Salinity & Abiotic Stress",
      "Integrated Farming Systems & Precision Agriculture",
      "Agricultural Research Dissertation"
    ],
    skillsGained: [
      "Field Trial Experimental Design & ANOVA Analysis",
      "Soil Chemical Profiling & Fertilizer Scheduling",
      "Satellite & Drone Remote Sensing for Crop Health",
      "Hybrid Crop Evaluation & Agronomic Auditing",
      "Agricultural Extension & Scientific Advisory"
    ],
    typicalEmployers: ["Indian Council of Agricultural Research (ICAR)", "National Seeds Corporation", "Bayer Crop Science", "Corteva Agriscience", "State Agricultural Universities"],
    isCommon: true,
    meta: {
      sourceUrl: "https://icar.org.in",
      retrievedOn: "2025-06-15",
      verifier: "ICAR Post Graduate Education Division",
      confidence: "high"
    }
  },
  {
    id: "mtech-biotech",
    familyId: "engineering",
    name: "Master of Technology in Biotechnology",
    shortName: "M.Tech Biotech",
    aliases: ["MTech Biotechnology", "M.Tech Biotech", "Master of Technology in Biotechnology", "mtech-biotechnology", "MTech Genetic Engineering"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Bioprocess Engineering & Bioreactor Scale-up",
      "Recombinant DNA Technology, CRISPR & Gene Therapy",
      "Downstream Processing & Protein Purification",
      "Computational Structural Biology & Bioinformatics",
      "Metabolic Engineering & Synthetic Biology"
    ],
    skillsGained: [
      "Pilot-Scale Bioreactor Fermentation Control",
      "CRISPR-Cas9 Guide RNA Design & Cell Line Transfection",
      "Preparative HPLC Protein Fractionation",
      "Next-Generation Sequencing (NGS) Data Analysis",
      "Biopharmaceutical Regulatory Compliance"
    ],
    typicalEmployers: ["Biocon Biologics", "Reliance Life Sciences", "Bharat Serums", "Syngene International", "Dr. Reddy's R&D"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Biotechnology Engineering Board",
      confidence: "high"
    }
  },
  {
    id: "mtech-environmental",
    familyId: "engineering",
    name: "Master of Technology in Environmental Engineering",
    shortName: "M.Tech Environmental",
    aliases: ["MTech Environmental", "M.Tech Environmental Engineering", "Master of Technology in Environmental Engineering", "mtech-environmental"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Physicochemical & Biological Water Treatment",
      "Industrial Air Pollution Modeling & Stack Dispersion",
      "Hazardous Waste Remediation & Containment Design",
      "Environmental Impact Assessment & Environmental Audit",
      "Industrial Ecology, LCA & Circular Economy"
    ],
    skillsGained: [
      "Biological Wastewater Treatment Process Simulation (BioWin)",
      "AERMOD Atmospheric Dispersion Modeling",
      "Life Cycle Assessment (SimaPro / OpenLCA)",
      "Contaminated Site Remediation Strategy Formulation",
      "Corporate Sustainability & ESG Reporting"
    ],
    typicalEmployers: ["Central Pollution Control Board", "NEERI", "Mott MacDonald", "ERM India", "Jacobs Engineering", "Municipal Corporations"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE Environmental Engineering PG Committee",
      confidence: "high"
    }
  },
  {
    id: "mdes",
    familyId: "design_creative",
    name: "Master of Design",
    shortName: "M.Des",
    aliases: ["MDes", "Master of Design", "M.Des", "m.des", "M.Des Product Design", "M.Des Interaction Design"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Advanced Design Research & Qualitative Ethnography",
      "Strategic Design, Systems Thinking & Service Design",
      "Advanced Interaction Design & Ubiquitous Computing",
      "Cognitive Ergonomics & Human Factors Engineering",
      "Design Futuring, Speculative Design & Prototyping"
    ],
    skillsGained: [
      "Ethnographic User Research & Behavioral Synthesis",
      "Complex Multi-Platform Design Systems Architecture",
      "High-Fidelity Interactive Prototyping",
      "Design Strategy & Executive C-Suite Pitching",
      "Tangible & Emerging Interface Prototyping"
    ],
    typicalEmployers: ["IDC School of Design, IIT Bombay", "National Institute of Design (NID)", "Google Design", "Apple", "Microsoft Design", "Samsung Design"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "AICTE / CEED Design Education Council",
      confidence: "high"
    }
  },
  {
    id: "march",
    familyId: "design_creative",
    name: "Master of Architecture",
    shortName: "M.Arch",
    aliases: ["MArch", "Master of Architecture", "M.Arch", "m.arch", "M.Arch Urban Design", "Sustainable Architecture M.Arch"],
    level: "PG",
    regulator: "COA",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Sustainable Architecture & Building Energy Simulation",
      "Urban Design Theory & Spatial Morphology",
      "Architectural Heritage Conservation & Restoration",
      "Advanced Building Information Modeling (BIM - Level 3)",
      "Contemporary Architectural Theory & Criticism"
    ],
    skillsGained: [
      "Building Energy Modeling (DesignBuilder / EnergyPlus)",
      "Advanced Revit BIM Coordination & Clash Detection",
      "Historical Structure Restoration Documentation",
      "Urban Fabric Spatial Morphology Analysis",
      "Green Building Certification (GRIHA / LEED AP) Advisory"
    ],
    typicalEmployers: ["School of Planning and Architecture (SPA)", "CPWD Architecture Wing", "Foster + Partners", "Atkins India", "HOK Architects"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.coa.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "Council of Architecture (COA) PG Regulations",
      confidence: "high"
    }
  },
  {
    id: "mplan",
    familyId: "design_creative",
    name: "Master of Planning",
    shortName: "M.Plan",
    aliases: ["MPlan", "Master of Planning", "M.Plan", "m.plan", "Urban and Regional Planning Master", "City Planning Master"],
    level: "PG",
    regulator: "AICTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Regional Planning & Spatial Economics",
      "Metropolitan Transport Planning & Transit Systems",
      "Environmental Planning & Disaster Resilient Infrastructure",
      "Advanced Spatial Informatics & Big Data GIS",
      "Land Economics, Real Estate Finance & Planning Law"
    ],
    skillsGained: [
      "Macro Spatial Modeling & Regional Master Planning",
      "Traffic & Travel Demand Forecasting (VISUM / Cube)",
      "GIS Geoprocessing & Spatial Multi-Criteria Analysis",
      "Urban Renewal & PPP Infrastructure Financial Modeling",
      "Statutory Development Plan Drafting"
    ],
    typicalEmployers: ["Town & Country Planning Organization (TCPO)", "NITI Aayog Urban Wing", "World Bank Urban Projects", "State Urban Development Departments", "PwC Urban Infrastructure"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.aicte-india.org",
      retrievedOn: "2025-06-15",
      verifier: "ITPI / AICTE Town Planning Board",
      confidence: "high"
    }
  },
  {
    id: "mlib",
    familyId: "arts_humanities",
    name: "Master of Library & Information Science",
    shortName: "M.Lib.I.Sc",
    aliases: ["MLib", "Master of Library Science", "M.Lib", "M.Lib.I.Sc", "MLIS", "mlib", "Library and Information Science"],
    level: "PG",
    regulator: "UGC",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Information Storage & Retrieval Systems",
      "Digital Library Architecture & Content Management",
      "Knowledge Organization (Dewey Decimal / UDC / RDA)",
      "Bibliometrics, Scientometrics & Research Impact",
      "Research Data Management & Open Access Systems"
    ],
    skillsGained: [
      "Digital Repository Configuration (DSpace / EPrints)",
      "Integrated Library System Deployment (Koha)",
      "Bibliometric Citation Network Analysis (Scopus / WoS)",
      "Metadata Schema Standardization (Dublin Core / MARC21)",
      "Scholarly Information Literacy Instruction"
    ],
    typicalEmployers: ["University Central Libraries", "National Library of India", "CSIR / DRDO Information Resource Centers", "Corporate Archives", "Think Tank Libraries"],
    isCommon: true,
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "UGC Library and Information Science Curriculum",
      confidence: "high"
    }
  },
  {
    id: "ma-education",
    familyId: "education",
    name: "Master of Education",
    shortName: "M.Ed",
    aliases: ["MEd", "Master of Education", "M.Ed", "ma-education", "Education Master", "Teacher Education M.Ed", "med"],
    level: "PG",
    regulator: "NCTE",
    structure: {
      durationStandardYears: 2,
      durationVariants: ["2 Years"]
    },
    subjectsTaught: [
      "Philosophical & Sociological Foundations of Education",
      "Advanced Curriculum Development & Instructional Design",
      "Psychometrics, Educational Testing & Evaluation",
      "Educational Technology & Learning Management Systems",
      "Educational Policy, Leadership & Teacher Education"
    ],
    skillsGained: [
      "Teacher Training Curriculum & Practicum Design",
      "Standardized Educational Testing & Psychometric Scoring",
      "Instructional Courseware Structuring (Moodle / Canvas)",
      "Educational Qualitative & Action Research",
      "School Quality Assessment & Accreditation Auditing"
    ],
    typicalEmployers: ["NCERT", "State Council of Educational Research and Training (SCERT)", "DIET Institutes", "B.Ed Colleges Faculty", "EdTech Curriculum Teams", "CBSE / ICSE School Leadership"],
    isCommon: true,
    meta: {
      sourceUrl: "https://ncte.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Council for Teacher Education (NCTE)",
      confidence: "high"
    }
  }

];

export const DEGREES_CATALOG = DEGREES_DATA;

export function getDegreeById(id: string): Degree | undefined {
  return DEGREES_DATA.find((d) => d.id === id);
}
