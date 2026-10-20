import { UniversalDegreeRecord } from "./types";

export const POSTGRADUATE_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "msc-cs",
    "id": "msc-cs",
    "familyId": "computing",
    "name": "Master of Science in Computer Science",
    "shortName": "M.Sc Computer Science",
    "aliases": [
      "MSc CS",
      "M.Sc. Computer Science",
      "MSc Computer Science",
      "Postgraduate in Computer Science",
      "msc-cs"
    ],
    "level": "PG",
    "discipline": "Computing & IT",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "An advanced 2-year postgraduate program delving into theoretical computer science, advanced algorithmic complexity, distributed systems, artificial intelligence, and scientific computing. It prepares graduates for high-level R&D engineering, research laboratories, and doctoral studies in computing sciences.",
    "key_skills": [
      "Advanced Algorithm Analysis & NP-Completeness Proofs",
      "Distributed Computing Architecture & Consensus Protocols (Raft/Paxos)",
      "Statistical Machine Learning & Deep Learning Neural Networks",
      "Database Internals, Query Optimization & Transaction Engines",
      "Scientific Python, Parallel Computing & GPU Programming (CUDA)",
      "Formal Methods & Software Verification Protocols"
    ],
    "subjects_taught": [
      "Design and Analysis of Advanced Algorithms",
      "Advanced Operating Systems & Distributed Systems",
      "Theory of Computation & Computational Complexity",
      "Artificial Intelligence & Advanced Machine Learning",
      "Cryptography, Network Protocols & Information Security",
      "Cloud Computing & Big Data Engineering",
      "Postgraduate Master Thesis & Research Dissertation"
    ],
    "typical_employers": [
      "R&D Labs (Microsoft Research, IBM Research, Google Research)",
      "Tier-1 Software Product Firms (Adobe, Amazon, Salesforce)",
      "FinTech Quant Labs (Goldman Sachs, DE Shaw)",
      "Autonomous Vehicle & AI Startups",
      "Defense & Space Research (DRDO, ISRO)"
    ],
    "specializations": [
      {
        "id": "msc-cs-ai",
        "name": "Artificial Intelligence & Computational Intelligence",
        "aliases": [
          "M.Sc AI"
        ],
        "skillsGained": [
          "Deep Learning",
          "NLP",
          "Reinforcement Learning"
        ],
        "typicalRoles": [
          "AI Research Scientist",
          "Applied ML Engineer"
        ]
      },
      {
        "id": "msc-cs-systems",
        "name": "Distributed Systems & Cloud Infrastructure",
        "aliases": [
          "Systems Track"
        ],
        "skillsGained": [
          "Kubernetes",
          "gRPC",
          "Storage Engines"
        ],
        "typicalRoles": [
          "Distributed Systems Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "msc-cs-c1",
        "degree_id": "msc-cs",
        "role_title": "Research Scientist / Applied Machine Learning Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level coursework in statistical learning theory and vector optimization provides mathematical grounding to train deep neural architectures.",
        "indicative_salary": {
          "min": 9.0,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "NASSCOM AI Talent Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PyTorch",
          "TensorFlow",
          "Deep Learning",
          "Vector Embeddings"
        ],
        "top_employers": [
          "IBM Research",
          "Amazon AI",
          "Samsung R&D",
          "Fractal Analytics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-cs-c2",
        "degree_id": "msc-cs",
        "role_title": "Systems Software Engineer (Distributed Storage)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Advanced distributed systems and consensus protocol modules directly qualify you to build scalable cloud backends.",
        "indicative_salary": {
          "min": 8.5,
          "max": 17.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Product Tech Compensation Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Go/Rust",
          "gRPC",
          "Distributed Caching",
          "Linux Internals"
        ],
        "top_employers": [
          "Nutanix",
          "VMware",
          "Red Hat India",
          "Zomato Infra"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-cs-c3",
        "degree_id": "msc-cs",
        "role_title": "Chief AI Architect / Principal Research Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading enterprise-scale AI research and LLM fine-tuning pipelines demands doctoral-level algorithmic rigor and postgraduate research background.",
        "indicative_salary": {
          "min": 30.0,
          "max": 65.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Technology Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Generative AI Governance",
          "Enterprise Architecture",
          "LLMOps",
          "Patent Strategy"
        ],
        "top_employers": [
          "Microsoft IDC",
          "Google India",
          "Tier-1 AI Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "msc-cs-hs1",
        "degree_id": "msc-cs",
        "program_name": "Ph.D. in Computer Science & Engineering",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE CS",
          "UGC-NET / JRF",
          "IIT Direct Ph.D. Written Tests"
        ],
        "eligibility_rule": "Master's degree in Computer Science (M.Sc CS / MCA / M.Tech) with minimum 60% marks or 6.5 CGPA and valid GATE/NET score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Bombay",
          "IIT Delhi",
          "IIT Madras",
          "IIIT Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-cs-hs2",
        "degree_id": "msc-cs",
        "program_name": "MS by Research / Ph.D. in Artificial Intelligence & Data Science",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE CS",
          "UGC-NET",
          "Institute Selection"
        ],
        "eligibility_rule": "First-class M.Sc in Computer Science / Mathematics / Statistics with proven research thesis or publication.",
        "typical_duration": "3 to 4 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "TIFR Mumbai",
          "ISI Kolkata",
          "IIIT Bangalore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "msc-cs-ct1",
        "degree_id": "msc-cs",
        "cert_name": "AWS Certified Machine Learning \u2013 Specialty",
        "provider": "Amazon Web Services",
        "domain": "Machine Learning & Cloud",
        "level": "Advanced",
        "prerequisites": [
          "Deep knowledge of ML algorithms and Python"
        ],
        "official_url": "https://aws.amazon.com/certification/certified-machine-learning-specialty",
        "sourceUrl": "https://aws.amazon.com/certification/certified-machine-learning-specialty",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-cs-ct2",
        "degree_id": "msc-cs",
        "cert_name": "Google Cloud Professional Data Engineer",
        "provider": "Google Cloud",
        "domain": "Big Data & Cloud Engineering",
        "level": "Advanced",
        "prerequisites": [
          "Experience with distributed data processing systems"
        ],
        "official_url": "https://cloud.google.com/certification/data-engineer",
        "sourceUrl": "https://cloud.google.com/certification/data-engineer",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-cs-ct3",
        "degree_id": "msc-cs",
        "cert_name": "Certified Kubernetes Administrator (CKA)",
        "provider": "Cloud Native Computing Foundation (CNCF)",
        "domain": "DevOps & Cloud Native",
        "level": "Intermediate",
        "prerequisites": [
          "Linux CLI and containerization fundamentals"
        ],
        "official_url": "https://www.cncf.io/certification/cka",
        "sourceUrl": "https://www.cncf.io/certification/cka",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "msc-cs-gv1",
        "degree_id": "msc-cs",
        "exam_or_post_name": "Scientist / Engineer 'SC' (Computer Science)",
        "conducting_body": "ISRO / VSSC / URSC",
        "eligibility_rule": {
          "degreeFamily": "Computer Science",
          "allowedDegrees": [
            "M.Sc Computer Science",
            "M.Tech CSE"
          ],
          "mandatorySubjects": [
            "Computer Science"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Gazetted Group A scientist recruitment for space flight software and mission telemetry networks."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-cs-gv2",
        "degree_id": "msc-cs",
        "exam_or_post_name": "Scientist 'B' (Computer Science / Cyber Security)",
        "conducting_body": "NIC / NIELIT / MeitY",
        "eligibility_rule": {
          "degreeFamily": "Computing",
          "allowedDegrees": [
            "M.Sc CS",
            "MCA",
            "M.Tech CS"
          ],
          "mandatorySubjects": [
            "Computer Science & Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government scientific officer cadre recruitment for national digital infrastructure."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.nielit.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "msc-cs-sw1",
        "degree_id": "msc-cs",
        "target_role": "Quantitative Finance Researcher / High Frequency Trading (HFT) Strategist",
        "pivot_reason": "Capitalize on advanced probability, stochastic calculus, and high-performance C++ concurrency to engineer algorithmic trading models.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Stochastic Calculus & Financial Derivatives Pricing",
            "type": "course",
            "detail": "Master Black-Scholes PDE, Monte Carlo asset simulation, and risk-neutral measures.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Ultra-Low Latency C++ Trading Engine Optimization",
            "type": "course",
            "detail": "Implement lock-free queues, kernel-bypass socket networking, and memory-mapped order books.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Statistical Arbitrage Strategy Backtesting Project",
            "type": "portfolio",
            "detail": "Build a live simulated tick-data backtester in C++ with historical order execution.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "CQF (Certificate in Quantitative Finance)",
          "C++ Certified Professional Programmer"
        ],
        "why_feasible": "Theoretical CS postgraduates possess mathematical maturity and algorithmic optimization skills required by algorithmic quant desks.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "msc-cs-ent1",
        "degree_id": "msc-cs",
        "idea_title": "Enterprise AI & LLM Inference Acceleration Platform",
        "description": "Develop an edge-AI optimization runtime that compresses and quantizes open-source LLMs for on-premise enterprise deployment.",
        "first_milestones": [
          "Build a proof-of-concept inference engine running quantized 8-bit LLMs on commodity workstation GPUs.",
          "File a provisional patent on memory-efficient key-value cache paging algorithms.",
          "Pilot with 3 enterprise SaaS clients needing private, GDPR-compliant document search."
        ],
        "relevant_schemes": [
          {
            "name": "DST TDB (Technology Development Board) Seed Fund",
            "agency": "Department of Science and Technology",
            "benefits": "Up to 1 Crore soft loan / equity for deep tech IP commercialization.",
            "sourceUrl": "https://tdb.gov.in"
          },
          {
            "name": "MeitY TIDE 2.0 (Technology Incubation and Development of Entrepreneurs)",
            "agency": "Ministry of Electronics & IT",
            "benefits": "Grant of up to 7 Lakhs for prototype and 30 Lakhs for growth.",
            "sourceUrl": "https://meitystartuphub.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "msc-cs",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Algorithms & Systems Research",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Deep dive into NP-hardness proofs, distributed consensus, and advanced machine learning.",
              "Select postgraduate research thesis topic in distributed AI or cryptography."
            ],
            "milestone": "Research topic approval and high-grade semester results"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Research & International Conference Submission",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Implement and benchmark core thesis algorithms against open datasets.",
              "Publish research findings in peer-reviewed IEEE/ACM proceedings."
            ],
            "milestone": "Peer-reviewed paper submission and pre-placement offers"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Advanced Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master's thesis before external committee.",
              "Complete interviews for R&D scientist and high-tier engineering roles."
            ],
            "milestone": "M.Sc Computer Science degree award with distinction"
          }
        ]
      },
      "completed": {
        "degree_id": "msc-cs",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "R&D Portfolio Audit & Research Publication Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Organize GitHub research repositories, thesis code, and technical whitepapers.",
              "Prepare for system design and advanced data structure interviews."
            ],
            "milestone": "Industry-ready R&D engineering portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Tier-1 Tech & Research Labs Drive",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Target specialist software engineering and research scientist applications.",
              "Deliver seminar talks on postgraduate thesis during company interview rounds."
            ],
            "milestone": "Job offer secured at Tier-1 software or R&D center"
          },
          {
            "stepNumber": 3,
            "title": "Senior Research Engineer Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead proprietary algorithm implementation or scale core platform architecture.",
              "Evaluate Ph.D. fellowship opportunities (PMRF / foreign doctorate)."
            ],
            "milestone": "Promoted to Senior Research Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mca",
    "id": "mca",
    "familyId": "computing",
    "name": "Master of Computer Applications",
    "shortName": "MCA",
    "aliases": [
      "Master of Computer Applications",
      "MCA graduate",
      "mca"
    ],
    "level": "PG",
    "discipline": "Computing & IT",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A premier 2-year professional postgraduate degree approved by AICTE that provides advanced mastery over application software architecture, enterprise systems, cloud platforms, full-stack software development, and mobile application engineering. It transforms computer science and application graduates into senior technical professionals and enterprise architects.",
    "key_skills": [
      "Enterprise Software Architecture (Microservices & Domain-Driven Design)",
      "Cloud Infrastructure Orchestration (Docker, Kubernetes, AWS/Azure)",
      "Full-Stack Web & Mobile App Development (React, Node.js, Flutter)",
      "Database Administration, Relational & NoSQL System Tuning (PostgreSQL, MongoDB)",
      "Enterprise Java / Spring Boot & C# .NET Enterprise Frameworks",
      "DevOps CI/CD Pipelines & Infrastructure as Code (Terraform)"
    ],
    "subjects_taught": [
      "Advanced Java & J2EE Enterprise Frameworks",
      "Data Structures & Design of Algorithms",
      "Cloud Computing & Virtualization",
      "Full Stack Web Development",
      "Software Project Management & Agile Methodologies",
      "Mobile Application Development (Android/iOS)",
      "Major Industry Internship & Project"
    ],
    "typical_employers": [
      "Global Consulting Majors (Accenture, Deloitte, PwC, Capgemini)",
      "Product Tech Companies (Zoho, Freshworks, PayTM)",
      "IT Services Giants (TCS, Infosys, Wipro, Cognizant)",
      "Fintech Platforms (PhonePe, Razorpay)",
      "Public Sector Undertakings (NIC, C-DAC)"
    ],
    "specializations": [
      {
        "id": "mca-cloud",
        "name": "Cloud Computing & DevOps Engineering",
        "aliases": [
          "MCA Cloud"
        ],
        "skillsGained": [
          "Kubernetes",
          "AWS",
          "CI/CD"
        ],
        "typicalRoles": [
          "Cloud DevOps Engineer"
        ]
      },
      {
        "id": "mca-data",
        "name": "Data Analytics & Business Intelligence",
        "aliases": [
          "MCA Data"
        ],
        "skillsGained": [
          "Python",
          "PowerBI",
          "SQL"
        ],
        "typicalRoles": [
          "Data Analytics Consultant"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mca-c1",
        "degree_id": "mca",
        "role_title": "Senior Full-Stack Enterprise Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Comprehensive enterprise Java Spring Boot and modern frontend framework training enables end-to-end development of large-scale enterprise portals.",
        "indicative_salary": {
          "min": 6.5,
          "max": 13.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "NASSCOM Enterprise IT Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Spring Boot",
          "React.js",
          "Microservices",
          "RESTful APIs"
        ],
        "top_employers": [
          "Accenture",
          "Infosys",
          "Deloitte",
          "Zoho"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mca-c2",
        "degree_id": "mca",
        "role_title": "Cloud DevOps & Platform Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Rigorous cloud architecture, Linux server management, and automated container deployment skills directly fulfill corporate DevOps roles.",
        "indicative_salary": {
          "min": 7.0,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Industry Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Kubernetes",
          "Docker",
          "AWS",
          "Terraform",
          "Jenkins"
        ],
        "top_employers": [
          "Capgemini",
          "Cognizant",
          "Mindtree",
          "Tech Startups"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mca-c3",
        "degree_id": "mca",
        "role_title": "Chief Technology Officer / Enterprise Solutions Architect",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing complete multi-tier digital architecture and managing hundreds of engineers requires postgraduate depth in software engineering lifecycle.",
        "indicative_salary": {
          "min": 24.0,
          "max": 55.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Tech Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Enterprise Architecture",
          "Cloud Migration",
          "Engineering Governance",
          "P&L Management"
        ],
        "top_employers": [
          "Global In-House Centers (GCCs)",
          "FinTech Unicorns"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mca-hs1",
        "degree_id": "mca",
        "program_name": "Ph.D. in Computer Science / Information Technology",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET / JRF",
          "GATE CS",
          "State University Ph.D. Entrance"
        ],
        "eligibility_rule": "Master of Computer Applications (MCA) with minimum 55% marks from a recognized university and valid UGC-NET/GATE score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "JNU New Delhi",
          "Delhi University",
          "Pune University",
          "NIT Trichy",
          "Anna University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mca-hs2",
        "degree_id": "mca",
        "program_name": "Post Graduate Diploma in Advanced Computing (PG-DAC)",
        "level": "PG",
        "entrance_exams": [
          "C-DAC C-CAT"
        ],
        "eligibility_rule": "Graduate in Engineering or MCA with minimum 50% marks.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "C-DAC ACTS Pune",
          "C-DAC Noida",
          "C-DAC Bangalore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mca-ct1",
        "degree_id": "mca",
        "cert_name": "Oracle Certified Professional: Java SE Developer",
        "provider": "Oracle",
        "domain": "Enterprise Software Development",
        "level": "Intermediate",
        "prerequisites": [
          "Solid understanding of object-oriented Java concepts"
        ],
        "official_url": "https://education.oracle.com/oracle-certified-professional-java-se-11-developer",
        "sourceUrl": "https://education.oracle.com/oracle-certified-professional-java-se-11-developer",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mca-ct2",
        "degree_id": "mca",
        "cert_name": "Microsoft Certified: Azure Solutions Architect Expert",
        "provider": "Microsoft",
        "domain": "Cloud Architecture",
        "level": "Advanced",
        "prerequisites": [
          "Experience with Azure administration and development"
        ],
        "official_url": "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect",
        "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mca-ct3",
        "degree_id": "mca",
        "cert_name": "Certified ScrumMaster (CSM)",
        "provider": "Scrum Alliance",
        "domain": "Agile Project Management",
        "level": "Beginner",
        "prerequisites": [
          "Basic familiarity with software project workflows"
        ],
        "official_url": "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
        "sourceUrl": "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mca-gv1",
        "degree_id": "mca",
        "exam_or_post_name": "NIC / NIELIT Scientist 'B' & Scientific Officer / Technical Assistant",
        "conducting_body": "National Informatics Centre (NIC)",
        "eligibility_rule": {
          "degreeFamily": "Computer Applications",
          "allowedDegrees": [
            "MCA",
            "M.Sc CS",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Computer Applications / Computer Science"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Permanent central government recruitment for developing e-Governance and digital public infrastructure."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.nielit.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mca-gv2",
        "degree_id": "mca",
        "exam_or_post_name": "State Public Service Commission (PSC) Assistant Programmer / System Analyst",
        "conducting_body": "State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Computer Science",
          "allowedDegrees": [
            "MCA",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Computer Science / IT"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State IT cadre gazetted roles for government department automation."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mca-sw1",
        "degree_id": "mca",
        "target_role": "Cybersecurity Threat Hunter & Incident Responder (SOC Lead)",
        "pivot_reason": "Pivot your knowledge of operating system internals, network protocols, and software vulnerabilities into defensive enterprise cyber operations.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Network Security & Protocol Analysis (Wireshark / Snort)",
            "type": "course",
            "detail": "Master packet inspection, TCP handshakes, TLS decryption, and intrusion detection systems.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "SIEM Implementation & Threat Hunting (Splunk / Elastic Security)",
            "type": "course",
            "detail": "Configure log ingestion, write correlation rules, and automate SOC playbooks.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Hands-On Red/Blue Team Incident Response Lab Capstone",
            "type": "portfolio",
            "detail": "Simulate malware outbreak and document live containment and eradication procedures.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "CompTIA Security+",
          "Certified Ethical Hacker (CEH)"
        ],
        "why_feasible": "MCA graduates possess software engineering fundamentals that make them outstanding cybersecurity analysts capable of code auditing.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mca-ent1",
        "degree_id": "mca",
        "idea_title": "B2B SaaS Low-Code Workflow Automation Agency",
        "description": "Found a software consultancy delivering custom enterprise integrations, low-code CRM portals, and automated ERP workflows for MSMEs.",
        "first_milestones": [
          "Deliver 3 successful enterprise automation projects for local logistics and manufacturing firms.",
          "Build reusable microservices connectors for GST filing, banking APIs, and WhatsApp business notifications.",
          "Achieve 10 Lakhs annual recurring revenue from maintenance and licensing contracts."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme (SISFS)",
            "agency": "DPIIT",
            "benefits": "Up to 20 Lakhs grant for prototype validation and 50 Lakhs debt/equity.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "MSME Udyam Registration & Credit Linked Capital Subsidy",
            "agency": "Ministry of MSME",
            "benefits": "Priority sector lending and collateral-free bank loans up to 1 Crore via CGTMSE.",
            "sourceUrl": "https://udyamregistration.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mca",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Frameworks & Database Mastery",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Spring Boot, microservices architecture, and PostgreSQL query tuning.",
              "Build end-to-end full-stack portal with CI/CD deployment on cloud."
            ],
            "milestone": "Deployed enterprise application project with documentation"
          },
          {
            "stepNumber": 2,
            "title": "Corporate Internship & Cloud Certifications",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Undergo mandatory 6-month industry internship at a software enterprise.",
              "Earn AWS Certified Solutions Architect or Azure Developer certification."
            ],
            "milestone": "Successful industry internship completion and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Final Placement Drives & System Design",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in centralized on-campus master-level software placement drives.",
              "Master distributed caching, load balancing, and high-concurrency architectures."
            ],
            "milestone": "Secured software engineering offer at top MNC"
          }
        ]
      },
      "completed": {
        "degree_id": "mca",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Master Resume & Enterprise Skill Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Refactor GitHub portfolio to showcase production-grade microservices and cloud deployments.",
              "Review core computer science principles and behavioral interview questions."
            ],
            "milestone": "Polished corporate developer resume"
          },
          {
            "stepNumber": 2,
            "title": "MNC & Product Tech Interview Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Software Engineer II and Cloud Developer openings.",
              "Clear coding assessments, system design interviews, and managerial rounds."
            ],
            "milestone": "Offer letter received for enterprise engineer position"
          },
          {
            "stepNumber": 3,
            "title": "Technical Leadership & Career Scaling",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Own major customer-facing microservices and mentor junior developers.",
              "Prepare for solutions architect or engineering management certifications."
            ],
            "milestone": "Promoted to Senior Software Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-cse",
    "id": "mtech-cse",
    "familyId": "engineering",
    "name": "Master of Technology in Computer Science & Engineering",
    "shortName": "M.Tech CSE",
    "aliases": [
      "M.Tech Computer Science",
      "MTech CSE",
      "Master of Engineering CSE",
      "mtech-cse"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A premier technical postgraduate degree in engineering covering advanced computer architecture, parallel computing, deep learning, cryptographic security, and systems verification. It prepares engineering postgraduates for advanced research and development roles in high-performance computing, semiconductors, and specialized cloud systems.",
    "key_skills": [
      "Hardware-Aware Algorithm Optimization & GPU Computing (CUDA)",
      "Advanced Microprocessor Architecture & Memory Hierarchy Tuning",
      "Formal Verification & High-Assurance Software Design",
      "Distributed Machine Learning Systems (Horovod, DeepSpeed)",
      "Applied Cryptography & Zero-Knowledge Protocol Engineering",
      "Heterogeneous Computing & Linux Kernel Module Programming"
    ],
    "subjects_taught": [
      "Advanced Computer Architecture & Multiprocessors",
      "Advanced Operating Systems & Kernel Internals",
      "Advanced Data Structures & Combinatorial Optimization",
      "High Performance Computing & Cloud Infrastructure",
      "Hardware Security & Applied Cryptography",
      "Deep Learning Systems & Compilers",
      "Master Thesis & Research Dissertation"
    ],
    "typical_employers": [
      "Semiconductor Giants (Intel, Qualcomm, NVIDIA, AMD)",
      "Tier-1 Cloud Infra (Google Cloud, AWS, Microsoft Azure)",
      "Autonomous Robotics Labs",
      "Defense R&D Organizations (DRDO, ISRO)",
      "High-Frequency Algorithmic Trading Firms"
    ],
    "specializations": [
      {
        "id": "mtech-cse-hpc",
        "name": "High Performance Computing & Parallel Systems",
        "aliases": [
          "M.Tech HPC"
        ],
        "skillsGained": [
          "CUDA",
          "MPI",
          "OpenMP"
        ],
        "typicalRoles": [
          "HPC Systems Architect"
        ]
      },
      {
        "id": "mtech-cse-ai",
        "name": "Artificial Intelligence & Computational Data Science",
        "aliases": [
          "M.Tech AI"
        ],
        "skillsGained": [
          "Distributed PyTorch",
          "LLMOps"
        ],
        "typicalRoles": [
          "AI Systems Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-cse-c1",
        "degree_id": "mtech-cse",
        "role_title": "GPU Computing & Compiler Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Coursework in advanced computer architecture and parallel systems directly translates to writing CUDA kernels and optimizing machine learning compilers.",
        "indicative_salary": {
          "min": 12.0,
          "max": 24.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Semiconductor Tech Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "CUDA",
          "C++20",
          "LLVM Compilers",
          "Parallel Architecture"
        ],
        "top_employers": [
          "NVIDIA",
          "Intel India",
          "Qualcomm",
          "AMD"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-cse-c2",
        "degree_id": "mtech-cse",
        "role_title": "Cloud Infrastructure & Hypervisor Architect",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Deep mastery of virtual memory, microkernel design, and hardware-assisted virtualization qualifies you to engineer next-generation hyperscale cloud platforms.",
        "indicative_salary": {
          "min": 11.0,
          "max": 22.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Global Tech Salary Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "KVM/QEMU",
          "Linux Kernel",
          "eBPF",
          "Kubernetes"
        ],
        "top_employers": [
          "Microsoft Azure",
          "AWS Core Infra",
          "Nutanix"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-cse-c3",
        "degree_id": "mtech-cse",
        "role_title": "Distinguished Systems Engineer / VP of Infrastructure",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading global semiconductor software initiatives and enterprise cloud hardware integration requires decades of advanced architectural leadership.",
        "indicative_salary": {
          "min": 35.0,
          "max": 80.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "System-on-Chip (SoC) Integration",
          "Hardware Acceleration",
          "Engineering Leadership"
        ],
        "top_employers": [
          "Intel Labs",
          "NVIDIA Research",
          "Tier-1 R&D Centers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-cse-hs1",
        "degree_id": "mtech-cse",
        "program_name": "Ph.D. in Computer Science & Systems Engineering",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE CS",
          "Prime Minister's Research Fellowship (PMRF)"
        ],
        "eligibility_rule": "Master of Technology in CSE / ECE with minimum 7.0 CGPA and outstanding academic record.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Bombay",
          "IIT Madras",
          "IIT Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-cse-hs2",
        "degree_id": "mtech-cse",
        "program_name": "Postdoctoral Research Fellowship / Industrial Research Fellowship",
        "level": "Doctoral",
        "entrance_exams": [
          "CSIR-RA",
          "Industry Postdoc Calls"
        ],
        "eligibility_rule": "Ph.D. in Computer Engineering or exceptional M.Tech thesis with international patents.",
        "typical_duration": "1 to 2 Years",
        "top_institutes": [
          "TIFR Mumbai",
          "Microsoft Research India",
          "Max Planck Institutes"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-cse-ct1",
        "degree_id": "mtech-cse",
        "cert_name": "NVIDIA Certified Associate: Accelerated Computing with CUDA",
        "provider": "NVIDIA Deep Learning Institute",
        "domain": "GPU Parallel Computing",
        "level": "Advanced",
        "prerequisites": [
          "Proficiency in C/C++ and matrix math"
        ],
        "official_url": "https://www.nvidia.com/en-us/training/",
        "sourceUrl": "https://www.nvidia.com/en-us/training/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-cse-ct2",
        "degree_id": "mtech-cse",
        "cert_name": "Linux Foundation Certified System Administrator (LFCS)",
        "provider": "Linux Foundation",
        "domain": "Linux Kernel & Systems Administration",
        "level": "Intermediate",
        "prerequisites": [
          "Linux command line and storage management"
        ],
        "official_url": "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
        "sourceUrl": "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-cse-ct3",
        "degree_id": "mtech-cse",
        "cert_name": "AWS Certified Advanced Networking \u2013 Specialty",
        "provider": "Amazon Web Services",
        "domain": "Cloud Networking & BGP",
        "level": "Advanced",
        "prerequisites": [
          "Advanced networking concepts and enterprise IP routing"
        ],
        "official_url": "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
        "sourceUrl": "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-cse-gv1",
        "degree_id": "mtech-cse",
        "exam_or_post_name": "DRDO Scientist 'B' (Computer Science & Engineering)",
        "conducting_body": "RAC / DRDO",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech / M.Tech in CSE"
          ],
          "mandatorySubjects": [
            "Computer Science & Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Direct recruitment based on GATE score followed by personal interview for defense computing research."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rac.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-cse-gv2",
        "degree_id": "mtech-cse",
        "exam_or_post_name": "ISRO Scientist / Engineer 'SC' (Computer Science)",
        "conducting_body": "ICRB / ISRO",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "M.Tech CSE",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Computer Science"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government scientific cadre recruitment for space mission computing."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-cse-sw1",
        "degree_id": "mtech-cse",
        "target_role": "Hardware-Software Co-Design Specialist for ASIC/FPGA Accelerators",
        "pivot_reason": "Leverage your systems knowledge to bridge algorithmic software development and silicon design by generating custom hardware accelerators for machine learning.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Verilog/SystemVerilog RTL Synthesis Fundamentals",
            "type": "course",
            "detail": "Learn RTL synthesis, state machine design, and timing closure for FPGAs.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "High-Level Synthesis (HLS) for Neural Networks (Xilinx Vitis)",
            "type": "course",
            "detail": "Compile C++/OpenCL algorithms into custom hardware logic blocks.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Edge TPU Accelerator FPGA Demonstration Project",
            "type": "portfolio",
            "detail": "Implement a custom quantized convolution accelerator on Xilinx Zynq FPGA.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "ARM Accredited Engineer",
          "Xilinx Certified Developer"
        ],
        "why_feasible": "M.Tech CSE postgraduates understand memory hierarchies and computational complexity, making them ideal co-design architects.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-cse-ent1",
        "degree_id": "mtech-cse",
        "idea_title": "Domain-Specific Silicon & FPGA Acceleration IP Cores",
        "description": "Found an IP core development startup designing ultra-low latency hardware acceleration cores for cryptographic hashing and video transcoding.",
        "first_milestones": [
          "Design and verify a proprietary RISC-V acceleration IP core delivering 5x energy efficiency.",
          "Test IP core on silicon emulators and publish architectural benchmark paper.",
          "License IP blocks to fabless semiconductor design houses and defense contractors."
        ],
        "relevant_schemes": [
          {
            "name": "Design Linked Incentive (DLI) Scheme for Semiconductors",
            "agency": "MeitY / CDAC",
            "benefits": "Financial support up to 50% of eligible project cost up to 15 Crore.",
            "sourceUrl": "https://www.c-dac.in/index.aspx?id=dli_scheme"
          },
          {
            "name": "Chips to Startup (C2S) Programme",
            "agency": "Ministry of Electronics and IT",
            "benefits": "Access to EDA tools from Synopsys/Cadence and prototyping fab support.",
            "sourceUrl": "https://www.c2s.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-cse",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Systems Coursework & Research Ideation",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Complete rigorous courses in advanced computer architecture, parallel computing, and distributed algorithms.",
              "Identify master thesis advisor and submit research proposal on hardware acceleration or cloud systems."
            ],
            "milestone": "Approved M.Tech dissertation topic and high first-year CGPA"
          },
          {
            "stepNumber": 2,
            "title": "M.Tech Dissertation Execution & Paper Publication",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Develop novel system prototype and run extensive benchmark simulations on HPC clusters.",
              "Submit research findings to premier international conferences (DAC, OSDI, ASPLOS, NeurIPS)."
            ],
            "milestone": "Dissertation draft submitted and campus placement secured"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & R&D Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Successfully defend master thesis before external panel.",
              "Join top semiconductor or systems R&D team as Member of Technical Staff."
            ],
            "milestone": "M.Tech degree conferred with honors"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-cse",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "R&D Portfolio Curation & Technical Profiling",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Package master's thesis research code, benchmarks, and published conference papers.",
              "Refine systems engineering resume focusing on concurrency, Linux kernel, and GPU programming."
            ],
            "milestone": "Specialized systems engineering portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Semiconductor & Cloud R&D Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for R&D engineer positions at semiconductor and hyperscale cloud companies.",
              "Clear technical interviews on hardware architecture, cache coherence, and memory management."
            ],
            "milestone": "Offer letter received for systems engineer position"
          },
          {
            "stepNumber": 3,
            "title": "Advanced Systems Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Architect mission-critical hardware drivers or cloud microservices.",
              "Pursue PMRF or international Ph.D. if aspiring for research scientist career."
            ],
            "milestone": "Promoted to Principal Systems Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-mech",
    "id": "mtech-mech",
    "familyId": "engineering",
    "name": "Master of Technology in Mechanical Engineering",
    "shortName": "M.Tech Mechanical",
    "aliases": [
      "M.Tech Mechanical",
      "MTech ME",
      "Master of Engineering Mechanical",
      "mtech-mech"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "An advanced 2-year postgraduate program specializing in computational fluid dynamics (CFD), finite element analysis (FEA), advanced thermal sciences, computer-aided manufacturing, and robotics. It trains mechanical engineers for specialized R&D roles in aerospace, automotive aerodynamics, power plants, and advanced precision manufacturing.",
    "key_skills": [
      "Advanced Computational Fluid Dynamics (ANSYS Fluent, OpenFOAM)",
      "Nonlinear Finite Element Analysis & Crashworthiness Simulation (LS-DYNA, Abaqus)",
      "Multibody Dynamics & Vibrations Analysis (ADAMS, MATLAB/Simulink)",
      "Design of Thermal Systems, Cryogenics & Heat Exchangers",
      "Advanced Additive Manufacturing & Metal 3D Printing",
      "Topology Optimization & Lightweight Composite Materials"
    ],
    "subjects_taught": [
      "Advanced Fluid Mechanics & Turbulence Modeling",
      "Advanced Heat and Mass Transfer & Cryogenics",
      "Computational Methods in Engineering & CFD",
      "Theory of Elasticity, Plasticity & FEA",
      "Advanced Manufacturing Processes & Precision Engineering",
      "Robotics, Mechatronics & Automation",
      "Postgraduate Master Dissertation"
    ],
    "typical_employers": [
      "Aerospace & Defense (DRDO, ISRO, HAL, Boeing, Airbus India)",
      "Automotive R&D (Tata Motors, Mahindra Research Valley, Maruti Suzuki)",
      "Heavy Engineering & Energy (L&T, GE Power, BHEL, Siemens)",
      "CAE Simulation Software Majors (Ansys, Dassault Syst\u00e8mes)",
      "Precision Engineering Startups"
    ],
    "specializations": [
      {
        "id": "mtech-mech-thermal",
        "name": "Thermal & Fluids Engineering",
        "aliases": [
          "M.Tech Thermal"
        ],
        "skillsGained": [
          "CFD",
          "Combustion",
          "Cryogenics"
        ],
        "typicalRoles": [
          "Thermal Systems Engineer"
        ]
      },
      {
        "id": "mtech-mech-design",
        "name": "Mechanical Design & CAE Engineering",
        "aliases": [
          "M.Tech Machine Design"
        ],
        "skillsGained": [
          "FEA",
          "Structural Fatigue",
          "Vibration"
        ],
        "typicalRoles": [
          "CAE Structural Analyst"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-mech-c1",
        "degree_id": "mtech-mech",
        "role_title": "CAE Simulation & Crashworthiness Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Postgraduate mastery of nonlinear finite element methods and LS-DYNA directly aligns with vehicle crash safety simulation.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Automotive CAE Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "LS-DYNA",
          "Abaqus",
          "HyperMesh",
          "Nonlinear FEA"
        ],
        "top_employers": [
          "Mahindra Research Valley",
          "Tata Motors R&D",
          "Mercedes-Benz R&D",
          "Maruti Suzuki"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-mech-c2",
        "degree_id": "mtech-mech",
        "role_title": "CFD Aerodynamics / Thermal Management Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth turbulence modeling, conjugate heat transfer, and ANSYS Fluent simulation expertise directly qualifies you for battery thermal and aerodynamic optimization.",
        "indicative_salary": {
          "min": 8.0,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Aerospace Engineering Compensation Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ANSYS Fluent",
          "OpenFOAM",
          "Battery Thermal Management",
          "Turbulence"
        ],
        "top_employers": [
          "Boeing India",
          "GE Aerospace",
          "Ather Energy",
          "L&T Heavy Civil"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-mech-c3",
        "degree_id": "mtech-mech",
        "role_title": "Chief Mechanical Architect / VP of Engineering",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing complete multi-physics product development and vehicle platform architecture requires deep mechanical postgraduate expertise.",
        "indicative_salary": {
          "min": 28.0,
          "max": 60.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Engineering Executive Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Multi-Physics Simulation",
          "Program Management",
          "Design for Manufacturing"
        ],
        "top_employers": [
          "Global Automotive R&D Centers",
          "Aerospace OEMs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-mech-hs1",
        "degree_id": "mtech-mech",
        "program_name": "Ph.D. in Mechanical Engineering (Thermal / Design / Manufacturing)",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE ME",
          "PMRF Fellowship",
          "Direct University Interview"
        ],
        "eligibility_rule": "First class M.Tech in Mechanical Engineering or Aerospace Engineering with valid GATE score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Madras",
          "IIT Bombay",
          "IIT Kanpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-mech-hs2",
        "degree_id": "mtech-mech",
        "program_name": "Post Graduate Diploma in Industrial Safety / Quality Management",
        "level": "PG",
        "entrance_exams": [
          "State Technical Board Entrance"
        ],
        "eligibility_rule": "Degree in Engineering (Mechanical / Chemical) with minimum 50% marks.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "National Institute of Industrial Engineering (IIM Mumbai)",
          "Central Labour Institute Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-mech-ct1",
        "degree_id": "mtech-mech",
        "cert_name": "Certified ANSYS CFD Professional",
        "provider": "ANSYS",
        "domain": "Computational Fluid Dynamics",
        "level": "Advanced",
        "prerequisites": [
          "Solid background in fluid mechanics and heat transfer"
        ],
        "official_url": "https://www.ansys.com/academic/learning-resources",
        "sourceUrl": "https://www.ansys.com/academic/learning-resources",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-mech-ct2",
        "degree_id": "mtech-mech",
        "cert_name": "Dassault Syst\u00e8mes Certified Abaqus Structural Specialist",
        "provider": "Dassault Syst\u00e8mes",
        "domain": "Finite Element Analysis",
        "level": "Advanced",
        "prerequisites": [
          "Knowledge of continuum mechanics and stress analysis"
        ],
        "official_url": "https://www.3ds.com/training/certification",
        "sourceUrl": "https://www.3ds.com/training/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-mech-ct3",
        "degree_id": "mtech-mech",
        "cert_name": "Six Sigma Black Belt in Manufacturing (SSBB)",
        "provider": "ASQ / Benchmark Six Sigma",
        "domain": "Quality Engineering & Lean Manufacturing",
        "level": "Intermediate",
        "prerequisites": [
          "Industrial experience in process optimization"
        ],
        "official_url": "https://asq.org/cert/six-sigma-black-belt",
        "sourceUrl": "https://asq.org/cert/six-sigma-black-belt",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-mech-gv1",
        "degree_id": "mtech-mech",
        "exam_or_post_name": "DRDO Scientist 'B' (Mechanical Engineering)",
        "conducting_body": "RAC / DRDO",
        "eligibility_rule": {
          "degreeFamily": "Mechanical Engineering",
          "allowedDegrees": [
            "M.Tech Mechanical",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Mechanical Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Recruitment through GATE Mechanical paper score followed by technical interview for defense laboratory projects."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rac.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-mech-gv2",
        "degree_id": "mtech-mech",
        "exam_or_post_name": "ISRO Scientist / Engineer 'SC' (Mechanical)",
        "conducting_body": "ICRB / ISRO",
        "eligibility_rule": {
          "degreeFamily": "Mechanical Engineering",
          "allowedDegrees": [
            "M.Tech Mechanical",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Mechanical Engineering"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central scientific service recruitment for rocket propulsion, satellite structures, and thermal protection systems."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-mech-sw1",
        "degree_id": "mtech-mech",
        "target_role": "Electric Vehicle (EV) Battery Pack Thermal & Structural Architect",
        "pivot_reason": "Apply your thermodynamics, phase-change heat transfer, and structural crashworthiness expertise to design high-safety electric vehicle lithium-ion battery modules.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Lithium-Ion Battery Electrochemistry & Thermal Runaway Dynamics",
            "type": "course",
            "detail": "Understand cell heat generation, cooling jacket design, and thermal runaway prevention.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Battery Module CFD Conjugate Heat Transfer (ANSYS Fluent)",
            "type": "course",
            "detail": "Simulate liquid cooling plates, dielectric immersion cooling, and ambient cold-start heating.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "AIS-156 / UN ECE R100 Compliant Battery Pack Structural & Thermal Capstone",
            "type": "portfolio",
            "detail": "Build complete 3D FEA/CFD simulation model passing regulatory penetration and thermal shock standards.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified EV Powertrain Engineer",
          "ANSYS Fluent Certified"
        ],
        "why_feasible": "Thermal postgraduates intuitively understand conduction and convective cooling regimes, making them superior battery thermal engineers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-mech-ent1",
        "degree_id": "mtech-mech",
        "idea_title": "High-Precision Metal 3D Printing & Topology Optimization Bureau",
        "description": "Establish a specialized contract additive manufacturing service delivering lightweight aerospace brackets and medical titanium implants.",
        "first_milestones": [
          "Acquire industrial Selective Laser Melting (SLM) metal 3D printer.",
          "Demonstrate 40% weight reduction on aerospace structural brackets using Altair Inspire topology optimization.",
          "Achieve AS9100 aerospace quality management certification and secure prototype supply orders."
        ],
        "relevant_schemes": [
          {
            "name": "National Strategy for Additive Manufacturing (NSAM)",
            "agency": "Ministry of Electronics & IT",
            "benefits": "Financial subsidies and technology incubation support for 3D printing startups.",
            "sourceUrl": "https://www.meity.gov.in"
          },
          {
            "name": "Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE)",
            "agency": "Ministry of MSME",
            "benefits": "Collateral-free business loans up to 2 Crore.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-mech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Continuum Mechanics & CFD/FEA Simulation",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Navier-Stokes turbulence equations, nonlinear elasticity, and advanced finite element formulations.",
              "Set up simulation workstations and complete advanced meshing tutorials in HyperMesh and Fluent."
            ],
            "milestone": "Completed high-precision CAE simulation project"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Experimental Benchmarking & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Fabricate physical test rig or run extensive wind tunnel / thermal camera validation for thesis.",
              "Complete summer research internship at premier automotive R&D or aerospace facility."
            ],
            "milestone": "Validated master dissertation draft and internship letter"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & CAE Placement Campaigns",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation with peer-reviewed journal paper submission.",
              "Clear technical interviews for senior CAE simulation and thermal engineering roles."
            ],
            "milestone": "Secured appointment letter at Tier-1 automotive or aerospace MNC"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-mech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Simulation Portfolio & Technical Dossier Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Create portfolio demonstrating mesh convergence, boundary condition rationale, and experimental validation.",
              "Review interview fundamentals in structural mechanics, heat transfer, and materials science."
            ],
            "milestone": "Professional CAE engineering dossier"
          },
          {
            "stepNumber": 2,
            "title": "R&D Campus & Off-Campus Hiring Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for CAE Structural Analyst and Thermal Management Engineer openings.",
              "Present thesis simulation results and methodology during technical interview rounds."
            ],
            "milestone": "Job offer secured for CAE/CFD specialist role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Simulation Engineer & Technical Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead vehicle crashworthiness certification or rocket propulsion thermal protection design.",
              "Evaluate corporate sponsorship for Ph.D. or global research fellowship."
            ],
            "milestone": "Promoted to Senior CAE Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-eee",
    "id": "mtech-eee",
    "familyId": "engineering",
    "name": "Master of Technology in Electrical Engineering",
    "shortName": "M.Tech Electrical",
    "aliases": [
      "M.Tech Electrical",
      "MTech EEE",
      "M.Tech Power Systems",
      "mtech-eee"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "An advanced 2-year postgraduate engineering degree focusing on power electronics, renewable grid integration, HVDC transmission, smart grid communication protocols, and electric drive dynamics. It trains engineers to architect resilient national power grids, EV charging networks, and industrial high-voltage automation systems.",
    "key_skills": [
      "Power Electronics Converter Design & Wide Bandgap Semiconductor Control (SiC/GaN)",
      "Grid Integration of Renewable Energy & Microgrid Stability (ETAP, PSCAD)",
      "Digital Signal Processing for Power Protection & Phasor Measurement Units (PMU)",
      "Electric Vehicle Drive Train Modeling & Field-Oriented Motor Control (FOC)",
      "High Voltage Engineering & Substation Automation (IEC 61850)",
      "Hardware-in-the-Loop Simulation (RT-LAB / Typhoon HIL)"
    ],
    "subjects_taught": [
      "Advanced Power System Analysis & Dynamics",
      "Advanced Power Electronics & Converter Topologies",
      "Control of Electric Drives & Vector Control",
      "Renewable Energy Systems & Grid Integration",
      "Smart Grid Technologies & IoT in Power",
      "High Voltage DC (HVDC) & FACTS Controllers",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Power Grid Corporation of India (POWERGRID)",
      "National Thermal Power Corporation (NTPC)",
      "MNC Energy & Automation Giants (ABB, Siemens, Schneider Electric, Hitachi Energy)",
      "EV Powertrain & Battery R&D Labs",
      "Renewable Energy IPPs (Adani Green, Tata Power Renewables)"
    ],
    "specializations": [
      {
        "id": "mtech-eee-power",
        "name": "Power Systems & Smart Grids",
        "aliases": [
          "M.Tech Power Systems"
        ],
        "skillsGained": [
          "PSCAD",
          "IEC 61850",
          "Grid Stability"
        ],
        "typicalRoles": [
          "Grid Planning Engineer"
        ]
      },
      {
        "id": "mtech-eee-drives",
        "name": "Power Electronics & Electric Drives",
        "aliases": [
          "M.Tech Power Electronics"
        ],
        "skillsGained": [
          "Motor Control",
          "SiC Inverters"
        ],
        "typicalRoles": [
          "Power Electronics Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-eee-c1",
        "degree_id": "mtech-eee",
        "role_title": "Power Electronics Lead Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level understanding of high-frequency magnetic design and wide bandgap inverters directly maps to next-generation solar and EV power converters.",
        "indicative_salary": {
          "min": 8.0,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Power Sector Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "SiC/GaN Inverters",
          "Thermal Design",
          "DSP Control",
          "Altium"
        ],
        "top_employers": [
          "Hitachi Energy",
          "Schneider Electric",
          "ABB India",
          "Delta Electronics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-eee-c2",
        "degree_id": "mtech-eee",
        "role_title": "Grid Interconnection & Stability Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Proficiency in transient simulation tools (PSCAD, DigSILENT) and IEEE 1547 standards qualifies you for utility-scale solar/wind grid interconnection studies.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Energy Transition Salary Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PSCAD",
          "DigSILENT",
          "Grid Compliance",
          "Harmonics"
        ],
        "top_employers": [
          "Tata Power",
          "Adani Energy Solutions",
          "DNV Energy",
          "L&T Power"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-eee-c3",
        "degree_id": "mtech-eee",
        "role_title": "Chief Electrical Engineer / VP Grid Modernization",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading regional transmission network modernization and multi-gigawatt renewable integration requires deep postgraduate electrical engineering expertise.",
        "indicative_salary": {
          "min": 26.0,
          "max": 55.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Substation Automation",
          "Smart Grid Architecture",
          "Regulatory Compliance"
        ],
        "top_employers": [
          "National Grid Operators",
          "Multinational EPCs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-eee-hs1",
        "degree_id": "mtech-eee",
        "program_name": "Ph.D. in Electrical & Power Engineering",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE EE",
          "PMRF Fellowship",
          "Direct University Interview"
        ],
        "eligibility_rule": "First class M.Tech in Electrical Engineering with minimum 7.0 CGPA and valid GATE score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Delhi",
          "IIT Roorkee",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-eee-hs2",
        "degree_id": "mtech-eee",
        "program_name": "Executive Certificate in Energy Transition & Hydrogen Technologies",
        "level": "Executive",
        "entrance_exams": [
          "Institute Selection"
        ],
        "eligibility_rule": "Degree in Engineering with minimum 2 years of work experience in the energy domain.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "IIT Madras",
          "TERI University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-eee-ct1",
        "degree_id": "mtech-eee",
        "cert_name": "Certified Energy Manager (CEM)",
        "provider": "Bureau of Energy Efficiency (BEE)",
        "domain": "Energy Efficiency & Conservation",
        "level": "Advanced",
        "prerequisites": [
          "Graduate in Engineering with work experience in power/utilities"
        ],
        "official_url": "https://www.beeindia.gov.in",
        "sourceUrl": "https://www.beeindia.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-eee-ct2",
        "degree_id": "mtech-eee",
        "cert_name": "Certified PSCAD / EMTDC Transient Simulation Specialist",
        "provider": "Manitoba Hydro International",
        "domain": "Power System Transients",
        "level": "Intermediate",
        "prerequisites": [
          "Solid foundation in AC circuit theory and transformers"
        ],
        "official_url": "https://www.mhi.ca/pscad",
        "sourceUrl": "https://www.mhi.ca/pscad",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-eee-ct3",
        "degree_id": "mtech-eee",
        "cert_name": "Certified IEC 61850 Substation Automation Professional",
        "provider": "DNV / IEEE",
        "domain": "Substation Automation Protocols",
        "level": "Advanced",
        "prerequisites": [
          "Knowledge of protection relays and Ethernet networking"
        ],
        "official_url": "https://www.dnv.com",
        "sourceUrl": "https://www.dnv.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-eee-gv1",
        "degree_id": "mtech-eee",
        "exam_or_post_name": "Power Grid Executive Trainee / Engineer (Electrical)",
        "conducting_body": "POWERGRID",
        "eligibility_rule": {
          "degreeFamily": "Electrical Engineering",
          "allowedDegrees": [
            "M.Tech Electrical",
            "B.Tech Electrical"
          ],
          "mandatorySubjects": [
            "Electrical Engineering"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Recruitment through GATE EE paper for managing national transmission lines and 765kV substations."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.powergrid.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-eee-gv2",
        "degree_id": "mtech-eee",
        "exam_or_post_name": "Central Electricity Authority (CEA) / UPSC Engineering Services",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Electrical Engineering",
          "allowedDegrees": [
            "M.Tech Electrical",
            "B.Tech Electrical"
          ],
          "mandatorySubjects": [
            "Electrical Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Gazetted Group A technical posts in Central Power Engineering Service."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-eee-sw1",
        "degree_id": "mtech-eee",
        "target_role": "EV Fast-Charger High-Power Electronics Architect",
        "pivot_reason": "Apply wide-bandgap converter topologies and resonant LLC converters to engineer 350kW DC ultra-fast electric vehicle chargers.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Bidirectional AC-DC Active Front End (AFE) Inverter Design",
            "type": "course",
            "detail": "Implement unity power factor correction and grid harmonic elimination in MATLAB/Simulink.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Isolated Resonant DC-DC Dual Active Bridge (DAB) Converters",
            "type": "course",
            "detail": "Design high-frequency planar transformers and zero-voltage-switching (ZVS) gate drivers.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "CCS-2 / ISO 15118 Compliant 350kW EV Charger Hardware Capstone",
            "type": "portfolio",
            "detail": "Deliver tested hardware schematic and thermal management layout for DC fast charger.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Power Electronics Designer",
          "Automotive Functional Safety (ISO 26262)"
        ],
        "why_feasible": "Electrical postgraduates possess mathematical mastery of high-voltage magnetic coupling and closed-loop feedback controllers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-eee-ent1",
        "degree_id": "mtech-eee",
        "idea_title": "Smart Microgrid Energy Management & Battery Energy Storage (BESS) Integration",
        "description": "Found an engineering solutions venture designing containerized battery storage solutions and automated islanded microgrids for industrial parks.",
        "first_milestones": [
          "Complete dynamic simulation of a 1MW/2MWh BESS tied to industrial solar rooftop.",
          "Build proprietary IoT edge microgrid controller running frequency stabilization algorithms.",
          "Deploy first commercial microgrid pilot at a textile processing facility."
        ],
        "relevant_schemes": [
          {
            "name": "Production Linked Incentive (PLI) for Advanced Chemistry Cells (ACC)",
            "agency": "Ministry of Heavy Industries",
            "benefits": "Fiscal incentives for domestic grid-scale battery manufacturing and deployment.",
            "sourceUrl": "https://heavyindustries.gov.in"
          },
          {
            "name": "National Clean Energy Fund (NCEF) Grants",
            "agency": "Ministry of Power",
            "benefits": "Project assistance for clean energy demonstration projects.",
            "sourceUrl": "https://powermin.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-eee",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Converter Topologies & Power Grid Modeling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master state-space modeling of converters, space-vector PWM, and high-voltage transmission dynamics.",
              "Formulate thesis proposal on wide-bandgap inverters or renewable grid compliance."
            ],
            "milestone": "Approved thesis proposal and top academic grade sheet"
          },
          {
            "stepNumber": 2,
            "title": "Hardware-in-the-Loop Simulation & Industrial Lab Testing",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Implement digital control on DSP/FPGA board and test with real-time grid simulator.",
              "Publish technical papers in IEEE Transactions on Power Electronics/Power Systems."
            ],
            "milestone": "Peer-reviewed paper accepted and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Power Sector Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation and showcase working converter prototype.",
              "Join leading power MNC, utility, or EV technology lab."
            ],
            "milestone": "Conferred M.Tech Electrical Engineering degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-eee",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Power Electronics Portfolio & Schematic Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile Altium schematics, thermal simulation reports, and firmware control repositories.",
              "Review interview fundamentals in closed-loop control, magnetics, and protection relays."
            ],
            "milestone": "Specialized power engineering portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Energy & EV Tech Corporate Hiring Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Senior Power Electronics Engineer and Grid Interconnection Specialist positions.",
              "Demonstrate DSP motor control code and converter PCB layout during interview rounds."
            ],
            "milestone": "Offer letter received for power systems role"
          },
          {
            "stepNumber": 3,
            "title": "Technical Authority & Transmission Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead utility-scale renewable battery integration projects or industrial inverter product lines.",
              "Pursue Senior Member IEEE elevation and professional engineering license."
            ],
            "milestone": "Promoted to Principal Power Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-civil",
    "id": "mtech-civil",
    "familyId": "engineering",
    "name": "Master of Technology in Civil Engineering",
    "shortName": "M.Tech Civil",
    "aliases": [
      "M.Tech Civil",
      "MTech Structural",
      "M.Tech Civil Engineering",
      "mtech-civil"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A specialized 2-year postgraduate program offering rigorous training in advanced structural dynamics, earthquake-resistant design, geotechnical foundation analysis, transportation infrastructure, and water resources engineering. It prepares civil engineers to lead mega-infrastructure projects such as high-speed railways, underground metros, sea bridges, and smart urban corridors.",
    "key_skills": [
      "Earthquake-Resistant Structural Analysis (IS 1893 / Eurocodes / ASCE 7)",
      "Nonlinear Seismic Dynamic Analysis (ETABS, SAP2000, PERFORM-3D)",
      "Advanced Geotechnical Deep Foundation & Tunneling Design (PLAXIS 2D/3D)",
      "Building Information Modeling (BIM) & 4D Construction Sequencing (Revit, Navisworks)",
      "Prestressed Concrete & Long-Span Bridge Engineering",
      "Pavement Design & Highway Traffic Micro-Simulation (VISSIM, MX Road)"
    ],
    "subjects_taught": [
      "Advanced Structural Analysis & Matrix Methods",
      "Earthquake Engineering & Structural Dynamics",
      "Design of Advanced Reinforced & Prestressed Concrete Structures",
      "Advanced Soil Mechanics & Foundation Engineering",
      "Finite Element Analysis of Concrete Structures",
      "Transportation Infrastructure Planning & Design",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Global Infrastructure Consultancies (Arup, WSP, AECOM, Atkins)",
      "EPC Construction Conglomerates (L&T Construction, Shapoorji Pallonji, Tata Projects)",
      "Public Sector Units (NHAI, DMRC, RITES, IRCON)",
      "Specialized Geotechnical & Tunneling Contractors",
      "Municipal Infrastructure Authorities"
    ],
    "specializations": [
      {
        "id": "mtech-civil-struct",
        "name": "Structural Engineering",
        "aliases": [
          "M.Tech Structural"
        ],
        "skillsGained": [
          "ETABS",
          "Seismic Design",
          "Bridges"
        ],
        "typicalRoles": [
          "Senior Structural Engineer"
        ]
      },
      {
        "id": "mtech-civil-geotech",
        "name": "Geotechnical & Tunneling Engineering",
        "aliases": [
          "M.Tech Geotech"
        ],
        "skillsGained": [
          "PLAXIS",
          "Soil Dynamics",
          "Piling"
        ],
        "typicalRoles": [
          "Geotechnical Consultant"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-civ-c1",
        "degree_id": "mtech-civil",
        "role_title": "Senior Structural Design Engineer (High-Rise & Bridges)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Postgraduate mastery of seismic response spectra, dynamic wind loading, and ETABS design translates directly into high-rise and bridge structural modeling.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Civil Engineering Infrastructure Salary Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ETABS",
          "SAP2000",
          "Seismic Design",
          "Bridge Engineering"
        ],
        "top_employers": [
          "Arup",
          "WSP India",
          "L&T Construction",
          "AECOM"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-civ-c2",
        "degree_id": "mtech-civil",
        "role_title": "Geotechnical & Underground Tunneling Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth training in deep excavation, diaphragm walls, and PLAXIS 3D numerical soil modeling directly fulfills metro rail underground design requirements.",
        "indicative_salary": {
          "min": 8.0,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Infrastructure Consulting Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PLAXIS 3D",
          "Deep Foundations",
          "Tunneling",
          "Slope Stability"
        ],
        "top_employers": [
          "DMRC",
          "Afcons Infrastructure",
          "Atkins",
          "Tata Projects"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-civ-c3",
        "degree_id": "mtech-civil",
        "role_title": "Chief Infrastructure Engineer / Project Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing multi-billion dollar highway corridors, sea bridges, and urban transit systems requires comprehensive postgraduate civil engineering leadership.",
        "indicative_salary": {
          "min": 28.0,
          "max": 65.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Engineering Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "EPC Project Governance",
          "FIDIC Contract Management",
          "Structural Health"
        ],
        "top_employers": [
          "L&T Infrastructure",
          "National Highway Developers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-civ-hs1",
        "degree_id": "mtech-civil",
        "program_name": "Ph.D. in Structural Engineering / Earthquake Engineering",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE CE",
          "PMRF Fellowship",
          "Direct University Interview"
        ],
        "eligibility_rule": "First class M.Tech in Civil / Structural Engineering with minimum 7.0 CGPA.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IIT Roorkee",
          "IIT Kanpur",
          "IIT Bombay",
          "IIT Madras"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-civ-hs2",
        "degree_id": "mtech-civil",
        "program_name": "Post Graduate Diploma in Construction Project Management",
        "level": "PG",
        "entrance_exams": [
          "NICMAR NCAT"
        ],
        "eligibility_rule": "Degree in Engineering (Civil) or Architecture with minimum 50% marks.",
        "typical_duration": "1 to 2 Years",
        "top_institutes": [
          "NICMAR University Pune",
          "National Institute of Construction Management"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-civ-ct1",
        "degree_id": "mtech-civil",
        "cert_name": "Autodesk Certified Professional: Revit for Structural Design",
        "provider": "Autodesk",
        "domain": "Building Information Modeling (BIM)",
        "level": "Intermediate",
        "prerequisites": [
          "Experience with structural drafting and 3D modeling"
        ],
        "official_url": "https://www.autodesk.com/certification",
        "sourceUrl": "https://www.autodesk.com/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-civ-ct2",
        "degree_id": "mtech-civil",
        "cert_name": "Bentley Certified STAAD.Pro Structural Expert",
        "provider": "Bentley Systems",
        "domain": "Structural Analysis & Steel Design",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of IS 800 and IS 456 codes"
        ],
        "official_url": "https://www.bentley.com",
        "sourceUrl": "https://www.bentley.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-civ-ct3",
        "degree_id": "mtech-civil",
        "cert_name": "Project Management Professional (PMP)",
        "provider": "Project Management Institute (PMI)",
        "domain": "Mega Project Management",
        "level": "Advanced",
        "prerequisites": [
          "3 years of professional project leadership experience"
        ],
        "official_url": "https://www.pmi.org/certifications/project-management-pmp",
        "sourceUrl": "https://www.pmi.org/certifications/project-management-pmp",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-civ-gv1",
        "degree_id": "mtech-civil",
        "exam_or_post_name": "UPSC Engineering Services Examination (ESE - Civil Engineering)",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Civil Engineering",
          "allowedDegrees": [
            "M.Tech Civil",
            "B.Tech Civil"
          ],
          "mandatorySubjects": [
            "Civil Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government recruitment for Central Engineering Service (CPWD), Military Engineer Services (MES), and Border Roads."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-civ-gv2",
        "degree_id": "mtech-civil",
        "exam_or_post_name": "National Highways Authority of India (NHAI) Manager (Technical)",
        "conducting_body": "NHAI",
        "eligibility_rule": {
          "degreeFamily": "Civil Engineering",
          "allowedDegrees": [
            "M.Tech Civil",
            "B.Tech Civil"
          ],
          "mandatorySubjects": [
            "Civil Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Management of national highway corridors, expressways, and major bridge structures."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://nhai.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-civ-sw1",
        "degree_id": "mtech-civil",
        "target_role": "Computational Wind & Aerodynamic Specialist for Supertall Towers",
        "pivot_reason": "Merge structural dynamics with computational fluid dynamics to assess vortex shedding, aeroelastic flutter, and wind tunnel testing on skyscrapers.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Boundary Layer Wind Tunnel Simulation (ANSYS Fluent / OpenFOAM)",
            "type": "course",
            "detail": "Model atmospheric boundary layer wind velocity profiles around complex tower geometry.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Aeroelastic Structural Response & Tuned Mass Damper (TMD) Design",
            "type": "course",
            "detail": "Calculate cross-wind accelerations, human comfort criteria (ISO 10137), and size liquid/pendulum dampers.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "300m Supertall Tower Wind-Structure Interaction Capstone",
            "type": "portfolio",
            "detail": "Deliver full aeroelastic simulation report with damper sizing for a 70-story residential skyscraper.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Wind Engineering Specialist",
          "ASCE Structural Member"
        ],
        "why_feasible": "Civil postgraduates possess mathematical mastery of structural dynamics and harmonic oscillations.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-civ-ent1",
        "degree_id": "mtech-civil",
        "idea_title": "Structural Health Monitoring (SHM) & IoT Sensor Analytics Firm",
        "description": "Found an engineering technology venture deploying fiber-optic strain sensors and accelerometer arrays to monitor bridge stability and aging dams in real time.",
        "first_milestones": [
          "Build an IoT sensor node capturing ambient vibrations on a 4-lane highway bridge.",
          "Develop a cloud dashboard displaying real-time modal frequencies and crack propagation alerts.",
          "Secure structural audit monitoring contracts with 3 municipal bridge corporations."
        ],
        "relevant_schemes": [
          {
            "name": "National Infrastructure Pipeline (NIP) Tech Innovation Fund",
            "agency": "Department of Economic Affairs",
            "benefits": "Grant and incubation support for innovative infrastructure maintenance technologies.",
            "sourceUrl": "https://indiainfrastructure.gov.in"
          },
          {
            "name": "Startup India Seed Fund",
            "agency": "DPIIT",
            "benefits": "Up to 50 Lakhs for pilot validation and market deployment.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-civil",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Dynamics & Finite Element Modeling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master dynamic matrix formulations, response spectrum analysis, and advanced soil mechanics.",
              "Select dissertation topic on seismic retrofitting or deep underground foundation modeling."
            ],
            "milestone": "Approved thesis topic and distinction in analytical coursework"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Modeling & Structural Lab Testing",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform non-linear pushover analysis or shake table testing of structural models.",
              "Publish structural findings in premier civil engineering journals (ASCE / Springer)."
            ],
            "milestone": "Master dissertation draft submitted and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Design Consultancy Hiring",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend dissertation before external board of structural engineers.",
              "Secure placement at international engineering consultancy (Arup, WSP, L&T)."
            ],
            "milestone": "Awarded M.Tech in Civil Engineering"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-civil",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Structural Portfolio & Design Calculation Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile design calculation sheets, ETABS models, and BIM reinforcement drawings.",
              "Review Indian Standard and Eurocode clauses for seismic and prestressed design."
            ],
            "milestone": "Professional structural design portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Global Infrastructure Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Structural Engineer II and Geotechnical Consultant positions.",
              "Demonstrate load path analysis, shear wall design, and foundation calculations in interviews."
            ],
            "milestone": "Offer letter received for design engineer role"
          },
          {
            "stepNumber": 3,
            "title": "Chartered Engineer & Project Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Direct structural teams on signature bridge or high-rise projects.",
              "Acquire Chartered Engineer (CEng) or Licensed Structural Engineer seal."
            ],
            "milestone": "Promoted to Principal Structural Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-environmental",
    "id": "mtech-environmental",
    "familyId": "engineering",
    "name": "Master of Technology in Environmental Engineering",
    "shortName": "M.Tech Environmental",
    "aliases": [
      "M.Tech Environmental",
      "MTech Environment",
      "M.Tech Environmental Engineering",
      "mtech-environmental"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A vital postgraduate engineering discipline addressing industrial wastewater treatment, atmospheric air dispersion modeling, hazardous waste containment, climate decarbonization, and environmental impact assessments (EIA). It equips engineers to design zero-liquid-discharge (ZLD) plants, carbon capture systems, and municipal water recycling infrastructure.",
    "key_skills": [
      "Industrial Wastewater Treatment & Zero Liquid Discharge (ZLD) Process Design",
      "Air Dispersion Modeling & Industrial Emission Control (AERMOD, CALPUFF)",
      "Hazardous & Solid Waste Containment Landfill Engineering (Hydraulic Barriers)",
      "Environmental Impact Assessment (EIA) & MoEFCC Regulatory Clearance",
      "Carbon Footprint Accounting & Life Cycle Assessment (SimaPro, GaBi)",
      "Membrane Bioreactor (MBR) & Advanced Oxidation Process (AOP) Design"
    ],
    "subjects_taught": [
      "Physicochemical & Biological Processes in Environmental Engineering",
      "Air Pollution Meteorology & Dispersion Modeling",
      "Industrial Wastewater Management & Zero Liquid Discharge",
      "Hazardous Waste & Contaminated Site Remediation",
      "Environmental Impact Assessment & Environmental Auditing",
      "Climate Change, Carbon Sequestration & ESG Compliance",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Global Environmental Consultancies (ERM, Ramboll, Jacobs, Wood)",
      "Water Treatment Majors (Thermax, VA Tech Wabag, Suez, Veolia)",
      "Central & State Pollution Control Boards (CPCB / SPCB)",
      "Heavy Manufacturing & Chemical Plants (Reliance, Tata Steel, Vedanta)",
      "Corporate Sustainability & ESG Advisory Desks"
    ],
    "specializations": [
      {
        "id": "mtech-env-water",
        "name": "Water & Wastewater Reclamation Engineering",
        "aliases": [
          "M.Tech Water Resources"
        ],
        "skillsGained": [
          "MBR",
          "ZLD",
          "Desalination"
        ],
        "typicalRoles": [
          "Water Process Engineer"
        ]
      },
      {
        "id": "mtech-env-air",
        "name": "Air Quality Engineering & Carbon Management",
        "aliases": [
          "M.Tech Air Quality"
        ],
        "skillsGained": [
          "AERMOD",
          "Carbon Accounting"
        ],
        "typicalRoles": [
          "Air Quality Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-env-c1",
        "degree_id": "mtech-environmental",
        "role_title": "Industrial Wastewater & ZLD Process Lead",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Postgraduate training in membrane bioreactors, reverse osmosis, and chemical precipitation qualifies you to design zero-liquid discharge effluent plants.",
        "indicative_salary": {
          "min": 7.0,
          "max": 13.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Environmental Process Engineering Pay Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ZLD Systems",
          "Membrane Separation",
          "Bio-Oxidation",
          "AutoCAD P&ID"
        ],
        "top_employers": [
          "Thermax",
          "VA Tech Wabag",
          "Suez Water",
          "Veolia India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-env-c2",
        "degree_id": "mtech-environmental",
        "role_title": "EIA & Environmental Regulatory Consultant",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Expertise in environmental clearance rules, baseline air/water sampling, and public hearing documentation maps directly into statutory EIA consulting.",
        "indicative_salary": {
          "min": 6.8,
          "max": 13.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Sustainability Consulting Salary Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "EIA Reports",
          "MoEFCC Clearance",
          "AERMOD",
          "Risk Assessment"
        ],
        "top_employers": [
          "ERM India",
          "Ramboll",
          "KPMG ESG",
          "Tata Consulting Engineers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-env-c3",
        "degree_id": "mtech-environmental",
        "role_title": "Chief Sustainability Officer / VP Environmental Compliance",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading corporate net-zero decarbonization strategies and managing multi-site regulatory compliance requires decades of environmental engineering leadership.",
        "indicative_salary": {
          "min": 25.0,
          "max": 52.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Corporate ESG Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Net-Zero Strategy",
          "Corporate ESG",
          "CPCB Negotiations",
          "Circular Economy"
        ],
        "top_employers": [
          "Reliance Industries",
          "Adani Enterprises",
          "Tata Steel"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-env-hs1",
        "degree_id": "mtech-environmental",
        "program_name": "Ph.D. in Environmental Engineering & Sustainability",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE EV / CE",
          "CSIR-JRF",
          "Institute Interview"
        ],
        "eligibility_rule": "First class M.Tech in Environmental / Chemical / Civil Engineering with valid GATE score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Roorkee",
          "IIT Delhi",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-env-hs2",
        "degree_id": "mtech-environmental",
        "program_name": "Lead Auditor Certification in Environmental Management Systems (ISO 14001)",
        "level": "Executive",
        "entrance_exams": [
          "IRCA Accredited Course"
        ],
        "eligibility_rule": "Degree in Engineering or Science with minimum 2 years of industrial experience.",
        "typical_duration": "1 Month",
        "top_institutes": [
          "BSI Group",
          "T\u00dcV S\u00dcD",
          "Bureau Veritas"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-env-ct1",
        "degree_id": "mtech-environmental",
        "cert_name": "NABET Accredited EIA Functional Area Expert (FAE)",
        "provider": "Quality Council of India (QCI) / NABET",
        "domain": "Environmental Impact Assessment",
        "level": "Advanced",
        "prerequisites": [
          "Master degree in Environmental Science/Engineering with industrial experience"
        ],
        "official_url": "https://nabet.qci.org.in",
        "sourceUrl": "https://nabet.qci.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-env-ct2",
        "degree_id": "mtech-environmental",
        "cert_name": "Certified Sustainability Professional (GRI Standards)",
        "provider": "Global Reporting Initiative (GRI)",
        "domain": "Corporate ESG & Sustainability Reporting",
        "level": "Intermediate",
        "prerequisites": [
          "Understanding of ESG frameworks and material disclosures"
        ],
        "official_url": "https://www.globalreporting.org",
        "sourceUrl": "https://www.globalreporting.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-env-ct3",
        "degree_id": "mtech-environmental",
        "cert_name": "Certified Carbon Auditor / GHG Accounting Lead (ISO 14064)",
        "provider": "T\u00dcV Rheinland / BSI",
        "domain": "Carbon Footprint & Greenhouse Gas Inventory",
        "level": "Advanced",
        "prerequisites": [
          "Knowledge of Scope 1, 2, and 3 emissions accounting"
        ],
        "official_url": "https://www.tuv.com",
        "sourceUrl": "https://www.tuv.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-env-gv1",
        "degree_id": "mtech-environmental",
        "exam_or_post_name": "Central Pollution Control Board (CPCB) Scientist 'B'",
        "conducting_body": "CPCB / MoEFCC",
        "eligibility_rule": {
          "degreeFamily": "Environmental Engineering",
          "allowedDegrees": [
            "M.Tech Environmental",
            "B.Tech Environmental"
          ],
          "mandatorySubjects": [
            "Environmental Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government scientific post monitoring industrial discharge, air quality standards, and river rejuvenation."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://cpcb.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-env-gv2",
        "degree_id": "mtech-environmental",
        "exam_or_post_name": "State Pollution Control Board (SPCB) Assistant Environmental Engineer",
        "conducting_body": "State PSCs / SPCBs",
        "eligibility_rule": {
          "degreeFamily": "Environmental Engineering",
          "allowedDegrees": [
            "M.Tech Environmental",
            "B.Tech Environmental"
          ],
          "mandatorySubjects": [
            "Environmental Science / Engineering"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State statutory roles for issuing consent to establish (CTE) and consent to operate (CTO) to industries."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://moef.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-env-sw1",
        "degree_id": "mtech-environmental",
        "target_role": "Corporate ESG Analyst & Net-Zero Decarbonization Strategist",
        "pivot_reason": "Pivot your chemical reaction and emission quantification skills into quantitative corporate carbon accounting and science-based emissions reduction targets.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Corporate GHG Protocol (Scope 1, 2, 3) Accounting & SimaPro LCA",
            "type": "course",
            "detail": "Quantify organizational emissions across upstream supply chains and manufacturing operations.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Science Based Targets Initiative (SBTi) & TCFD Climate Risk Reporting",
            "type": "course",
            "detail": "Model transition climate risks and formulate 2040 net-zero trajectory plans.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Comprehensive Industrial Decarbonization & BRSR Disclosure Capstone",
            "type": "portfolio",
            "detail": "Deliver full SEBI BRSR compliance report with verified marginal abatement cost curves.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "GRI Certified Sustainability Professional",
          "GARP Sustainability and Climate Risk (SCR)"
        ],
        "why_feasible": "Environmental engineers possess mass-balance and chemical tracking skills that make their corporate carbon audits technically rigorous.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-env-ent1",
        "degree_id": "mtech-environmental",
        "idea_title": "Decentralized Modular Wastewater Treatment & Biogas Generation Utility",
        "description": "Found an environmental engineering venture installing prefabricated packaged sewage treatment plants (STPs) and food waste anaerobic biodigesters for gated communities.",
        "first_milestones": [
          "Design a plug-and-play 50 KLD containerized Moving Bed Biofilm Reactor (MBBR) plant.",
          "Pilot the treatment unit at a commercial IT park, producing tertiary recycled water for toilet flushing.",
          "Achieve empanelment with state urban development authorities for municipal decentralized water reuse."
        ],
        "relevant_schemes": [
          {
            "name": "Swachh Bharat Mission (Urban) Tech Innovation Grants",
            "agency": "Ministry of Housing and Urban Affairs",
            "benefits": "Capital grants for innovative decentralized sewage and waste management.",
            "sourceUrl": "https://sbmurban.org"
          },
          {
            "name": "Technology Development Board (TDB) Commercialization Loan",
            "agency": "Department of Science and Technology",
            "benefits": "Concessional loans up to 50% of project cost for green technologies.",
            "sourceUrl": "https://tdb.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-environmental",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Reaction Kinetics & Environmental Process Design",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master biological nutrient removal kinetics, mass transfer in aeration, and industrial emission dispersion.",
              "Select master thesis topic on carbon capture, advanced wastewater oxidation, or plastic upcycling."
            ],
            "milestone": "Approved dissertation proposal and high course grades"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Laboratory Benchmarking & Industrial Sampling",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Operate lab-scale bioreactor or run atmospheric dispersion simulations using AERMOD.",
              "Submit technical research papers to high-impact journals (Water Research / Chemosphere)."
            ],
            "milestone": "Published research paper and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Green Tech Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation before regulatory and academic experts.",
              "Join international environmental consultancy or leading water treatment MNC."
            ],
            "milestone": "Conferred M.Tech in Environmental Engineering"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-environmental",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Environmental Dossier & EIA Portfolio Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile process flow diagrams (PFDs), mass-energy balance calculations, and regulatory clearances.",
              "Review state pollution control board norms and statutory effluent discharge limits."
            ],
            "milestone": "Professional environmental engineering dossier"
          },
          {
            "stepNumber": 2,
            "title": "Consultancy & Corporate Sustainability Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Environmental Process Engineer and ESG Sustainability Specialist openings.",
              "Present wastewater treatment plant schematics and dispersion modeling in interviews."
            ],
            "milestone": "Secured offer at top environmental engineering firm"
          },
          {
            "stepNumber": 3,
            "title": "Senior Environmental Specialist Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead turnkey zero liquid discharge implementations or corporate net-zero disclosures.",
              "Earn QCI/NABET accredited functional area expert certification."
            ],
            "milestone": "Promoted to Senior Environmental Consultant"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mtech-biotech",
    "id": "mtech-biotech",
    "familyId": "engineering",
    "name": "Master of Technology in Biotechnology",
    "shortName": "M.Tech Biotechnology",
    "aliases": [
      "M.Tech Biotechnology",
      "MTech Biotech",
      "M.Tech Bioprocess Engineering",
      "mtech-biotech"
    ],
    "level": "PG",
    "discipline": "Engineering & Technology",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A premier technical postgraduate degree combining molecular biology with biochemical engineering principles. It covers upstream bioprocess optimization, industrial bioreactor design, recombinant protein purification (downstream processing), metabolic flux analysis, and biosimilar scale-up. It prepares engineers for core pharmaceutical manufacturing, vaccine development, and synthetic biology production.",
    "key_skills": [
      "Bioreactor Design, Scale-Up & Microbial Fermentation Control (5L to 10,000L)",
      "Downstream Processing & Chromatography Purification (AKTA, FPLC, HPLC)",
      "Cell Line Development & Recombinant Mammalian Cell Culture (CHO cells)",
      "Metabolic Flux Analysis & Synthetic Biology Pathway Engineering",
      "Biopharmaceutical Quality by Design (QbD) & cGMP Validation Standards",
      "Techno-Economic Modeling & Bioprocess Simulation (SuperPro Designer)"
    ],
    "subjects_taught": [
      "Advanced Biochemical Reaction Engineering & Bioreactor Design",
      "Downstream Processing & Bioseparations",
      "Recombinant DNA Technology & Protein Engineering",
      "Mammalian Cell Culture & Monoclonal Antibody Manufacturing",
      "Computational Biology & Bioprocess Modeling",
      "Regulatory Affairs, Biosimilars & Intellectual Property",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Biopharmaceutical Majors (Biocon, Serum Institute, Dr. Reddy's, Bharat Biotech)",
      "Contract Development & Manufacturing Organizations (Syngene, Enzene, Aragen)",
      "Industrial Enzyme Producers (Novozymes India, Advanced Enzyme Technologies)",
      "Food & Synthetic Biology Startups",
      "National Research Institutes (DBT-THSTI, NII, CSIR-IMTECH)"
    ],
    "specializations": [
      {
        "id": "mtech-bt-bioprocess",
        "name": "Bioprocess & Biomanufacturing Engineering",
        "aliases": [
          "M.Tech Bioprocess"
        ],
        "skillsGained": [
          "Fermentation",
          "Scale-Up",
          "SuperPro"
        ],
        "typicalRoles": [
          "Bioprocess Scientist"
        ]
      },
      {
        "id": "mtech-bt-biosimilar",
        "name": "Biosimilars & Downstream Purification",
        "aliases": [
          "M.Tech Downstream"
        ],
        "skillsGained": [
          "AKTA",
          "Affinity Chromatography"
        ],
        "typicalRoles": [
          "Purification Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mt-bt-c1",
        "degree_id": "mtech-biotech",
        "role_title": "Upstream Bioprocess Scientist (Fermentation)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Mastery of microbial growth kinetics, dissolved oxygen mass transfer (kLa), and bioreactor feed strategies directly applies to industrial vaccine and enzyme fermentation.",
        "indicative_salary": {
          "min": 7.2,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Biopharma R&D Compensation Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Bioreactor Scale-Up",
          "Fed-Batch Fermentation",
          "DoE",
          "Do-Sensor"
        ],
        "top_employers": [
          "Serum Institute",
          "Biocon Biologics",
          "Bharat Biotech",
          "Syngene"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-bt-c2",
        "degree_id": "mtech-biotech",
        "role_title": "Downstream Purification Lead (Monoclonal Antibodies)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth chromatography resin selection, tangent flow filtration (TFF), and viral clearance testing directly qualify you for therapeutic protein downstream processing.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharmaceutical Biotech Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "AKTA FPLC",
          "Protein A Chromatography",
          "TFF Filtration",
          "SDS-PAGE"
        ],
        "top_employers": [
          "Dr. Reddy's Biologics",
          "Enzene Biosciences",
          "Intas Pharma"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-bt-c3",
        "degree_id": "mtech-biotech",
        "role_title": "VP Biopharmaceutical Manufacturing / Head of Operations",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing commercial cGMP manufacturing facilities producing millions of biosimilar doses demands decades of biochemical engineering leadership.",
        "indicative_salary": {
          "min": 28.0,
          "max": 60.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Biopharma Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "cGMP Manufacturing",
          "FDA Regulatory Audits",
          "P&L Management"
        ],
        "top_employers": [
          "Global Biomanufacturing Hubs",
          "Vaccine MNCs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mt-bt-hs1",
        "degree_id": "mtech-biotech",
        "program_name": "Ph.D. in Biochemical Engineering / Biotechnology",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE BT",
          "CSIR/DBT-JRF",
          "Prime Minister's Research Fellowship (PMRF)"
        ],
        "eligibility_rule": "First class M.Tech in Biotechnology / Biochemical Engineering with valid GATE score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IIT Delhi",
          "IIT Bombay",
          "IIT Kharagpur",
          "ICT Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-bt-hs2",
        "degree_id": "mtech-biotech",
        "program_name": "Post Graduate Diploma in Regulatory Affairs for Biopharmaceuticals",
        "level": "PG",
        "entrance_exams": [
          "University Selection"
        ],
        "eligibility_rule": "Master degree in Biotechnology, Pharmacy, or Life Sciences with minimum 55% marks.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "Jamia Hamdard New Delhi",
          "NIPER SAS Nagar"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mt-bt-ct1",
        "degree_id": "mtech-biotech",
        "cert_name": "Certified Bioprocess Downstream Purification Professional",
        "provider": "GE Healthcare / Cytiva",
        "domain": "Chromatography & Bioseparations",
        "level": "Advanced",
        "prerequisites": [
          "Hands-on experience with AKTA chromatography systems"
        ],
        "official_url": "https://www.cytivalifesciences.com",
        "sourceUrl": "https://www.cytivalifesciences.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-bt-ct2",
        "degree_id": "mtech-biotech",
        "cert_name": "cGMP Compliance & Data Integrity for Biological Products",
        "provider": "PDA (Parenteral Drug Association)",
        "domain": "Biopharma Quality & Regulatory Compliance",
        "level": "Intermediate",
        "prerequisites": [
          "Understanding of cleanroom standards and sterile manufacturing"
        ],
        "official_url": "https://www.pda.org",
        "sourceUrl": "https://www.pda.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mt-bt-ct3",
        "degree_id": "mtech-biotech",
        "cert_name": "SuperPro Designer Certified Bioprocess Simulator",
        "provider": "Intelligen Inc.",
        "domain": "Techno-Economic Bioprocess Simulation",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of chemical engineering mass-energy balances"
        ],
        "official_url": "https://www.intelligen.com",
        "sourceUrl": "https://www.intelligen.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mt-bt-gv1",
        "degree_id": "mtech-biotech",
        "exam_or_post_name": "Scientist 'B' / Technical Officer (Biotechnology)",
        "conducting_body": "DBT / BIRAC / National Research Labs",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "M.Tech Biotechnology",
            "M.Sc Biotechnology"
          ],
          "mandatorySubjects": [
            "Biotechnology / Life Sciences"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government scientific officer posts managing national biotechnology missions and clinical trials."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://dbtindia.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mt-bt-gv2",
        "degree_id": "mtech-biotech",
        "exam_or_post_name": "Patent Examiner (Biotechnology & Pharmaceuticals)",
        "conducting_body": "Controller General of Patents, Designs and Trade Marks (CGPDTM)",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "M.Tech Biotechnology",
            "M.Sc Biotech"
          ],
          "mandatorySubjects": [
            "Biotechnology"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Gazetted Group A role examining patent applications for gene therapies, vaccines, and recombinant enzymes."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ipindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mt-bt-sw1",
        "degree_id": "mtech-biotech",
        "target_role": "Bioinformatics & Computational Protein Modeling Scientist",
        "pivot_reason": "Leverage your structural biology and biochemical background to pivot into computational drug design, antibody docking, and AlphaFold-driven protein engineering.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Python for Bioinformatics & Structural Biology (BioPython, PyMOL)",
            "type": "course",
            "detail": "Parse PDB structures, analyze binding pockets, and automate molecular docking scripts.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Molecular Dynamics Simulation & Free Energy Calculations (GROMACS)",
            "type": "course",
            "detail": "Simulate antibody-antigen stability and solvent interactions over 100ns trajectories.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "De Novo Therapeutic Peptide Design & Docking Capstone",
            "type": "portfolio",
            "detail": "Design an engineered binding peptide against an oncogenic receptor target and validate affinity in silico.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Computational Biologist",
          "Structural Bioinformatics Certificate"
        ],
        "why_feasible": "Biotech postgraduates possess wet-lab intuition regarding protein folding that makes their in silico predictions realistic.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mt-bt-ent1",
        "degree_id": "mtech-biotech",
        "idea_title": "Custom Microbial Cell Factory & Recombinant Industrial Enzyme Production",
        "description": "Found a synthetic biology startup developing engineered yeast and bacterial strains to produce high-value specialty enzymes for textile, paper, and animal feed industries.",
        "first_milestones": [
          "Engineer a Pichia pastoris expression vector achieving 10g/L enzyme titer in benchtop bioreactor.",
          "Demonstrate 30% reduction in processing costs on customer textile bio-polishing trials.",
          "Secure BIRAC BIG grant for scaling fermentation from 5L to 200L pilot facility."
        ],
        "relevant_schemes": [
          {
            "name": "BIRAC Biotechnology Ignition Grant (BIG)",
            "agency": "Department of Biotechnology",
            "benefits": "Up to 50 Lakhs equity-free grant for early-stage biotechnology startups.",
            "sourceUrl": "https://www.birac.nic.in"
          },
          {
            "name": "BIRAC SBIRI (Small Business Innovation Research Initiative)",
            "agency": "DBT / BIRAC",
            "benefits": "Subsidized research funding up to 1 Crore for scaling proof-of-concept technologies.",
            "sourceUrl": "https://www.birac.nic.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mtech-biotech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Biochemical Engineering & Cell Line Engineering",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master bioreactor mass transfer, kinetics of recombinant cell culture, and chromatography theory.",
              "Select master dissertation topic in microbial fermentation or therapeutic protein purification."
            ],
            "milestone": "Approved thesis topic and distinction in bioprocess coursework"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Experimental Scale-Up & Publication",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Operate automated bioreactors and AKTA purification systems to optimize target protein yield.",
              "Publish experimental findings in premier journals (Biotechnology and Bioengineering / Biochemical Engineering Journal)."
            ],
            "milestone": "Peer-reviewed paper accepted and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Biopharma Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation before scientific examiners.",
              "Join leading vaccine, biosimilar, or enzyme manufacturing company as R&D scientist."
            ],
            "milestone": "Conferred M.Tech in Biotechnology"
          }
        ]
      },
      "completed": {
        "degree_id": "mtech-biotech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Technical Bioprocess Portfolio Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile fermentation batch reports, chromatograms, SDS-PAGE gel assays, and mass balances.",
              "Review cGMP guidelines, FDA 21 CFR Part 11, and ICH Q8/Q9/Q10 quality standards."
            ],
            "milestone": "Professional bioprocess engineering dossier"
          },
          {
            "stepNumber": 2,
            "title": "Biopharma Corporate Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Upstream Scientist and Downstream Purification Process Engineer openings.",
              "Present bioreactor optimization data and chromatography troubleshooting in interviews."
            ],
            "milestone": "Secured offer at top biopharmaceutical company"
          },
          {
            "stepNumber": 3,
            "title": "Biomanufacturing Leadership & Scale-Up",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead commercial tech-transfer from pilot lab to 5,000L manufacturing suite.",
              "Pursue regulatory leadership or corporate biosimilar strategy."
            ],
            "milestone": "Promoted to Senior Bioprocess Scientist"
          }
        ]
      }
    }
  },
  {
    "degree_id": "msc-biotech",
    "id": "msc-biotech",
    "familyId": "pure_sciences",
    "name": "Master of Science in Biotechnology",
    "shortName": "M.Sc Biotechnology",
    "aliases": [
      "MSc Biotechnology",
      "M.Sc. Biotech",
      "MSc Biotech",
      "Postgraduate in Biotechnology",
      "msc-biotech"
    ],
    "level": "PG",
    "discipline": "Pure & Applied Sciences",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "An advanced 2-year scientific postgraduate degree focusing on molecular genetics, genetic engineering, immunology, cell biology, genomics, and bio-therapeutics. Supported across central universities via GAT-B (Graduate Aptitude Test-Biotechnology), it prepares researchers and technical specialists for diagnostic laboratories, genomics facilities, pharmaceutical R&D, and doctoral fellowships.",
    "key_skills": [
      "Recombinant DNA Technology, Gene Cloning & CRISPR-Cas9 Editing",
      "Next-Generation Sequencing (NGS) Data Analysis & RNA-Seq Workflows",
      "Immunological Assays (ELISA, Western Blotting, Flow Cytometry / FACS)",
      "Mammalian & Plant Tissue Culture Protocols",
      "High-Throughput PCR Diagnostics & Real-Time qPCR Assays",
      "Protein Expression, Extraction & Spectrophotometric Analysis"
    ],
    "subjects_taught": [
      "Advanced Molecular Biology & Genetic Engineering",
      "Immunology & Immunotechnology",
      "Genomics, Proteomics & Bioinformatics",
      "Cell Biology & Molecular Genetics",
      "Bioprocess Technology & Enzyme Engineering",
      "Biosafety, Bioethics & Intellectual Property Rights",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Diagnostic & Genomics Testing Labs (MedGenome, Strand Life Sciences, Lal PathLabs)",
      "Biotech R&D Centers (Reliance Life Sciences, Serum Institute, Biocon)",
      "Contract Research Organizations (Syngene, Eurofins, Thermo Fisher)",
      "National Research Laboratories (DBT, CSIR, ICMR)",
      "Agricultural Biotech Companies"
    ],
    "specializations": [
      {
        "id": "msc-bt-molecular",
        "name": "Molecular Diagnostics & Genomics",
        "aliases": [
          "M.Sc Genomics"
        ],
        "skillsGained": [
          "NGS",
          "CRISPR",
          "qPCR"
        ],
        "typicalRoles": [
          "Molecular Diagnostics Specialist"
        ]
      },
      {
        "id": "msc-bt-immuno",
        "name": "Immunotechnology & Vaccine Biology",
        "aliases": [
          "M.Sc Immuno"
        ],
        "skillsGained": [
          "FACS",
          "ELISA",
          "Cell Culture"
        ],
        "typicalRoles": [
          "Immunology Research Associate"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "msc-bt-c1",
        "degree_id": "msc-biotech",
        "role_title": "Molecular Diagnostics & NGS Genomics Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level proficiency in DNA extraction, qPCR assay design, and NGS library preparation qualifies you to lead molecular pathology laboratories.",
        "indicative_salary": {
          "min": 5.5,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Genomics Diagnostic Salary Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "NGS Sequencing",
          "qPCR",
          "Variant Calling",
          "DNA Extraction"
        ],
        "top_employers": [
          "MedGenome",
          "Strand Life Sciences",
          "Eurofins India",
          "Dr Lal PathLabs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-bt-c2",
        "degree_id": "msc-biotech",
        "role_title": "Immunology & Assay Development Research Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Rigorous training in monoclonal antibody characterization, ELISA optimization, and flow cytometry directly aligns with biopharma research pipelines.",
        "indicative_salary": {
          "min": 5.8,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Life Sciences R&D Compensation Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Flow Cytometry",
          "ELISA",
          "Cell Culture",
          "Assay Validation"
        ],
        "top_employers": [
          "Syngene International",
          "Reliance Life Sciences",
          "Thermo Fisher Scientific"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-bt-c3",
        "degree_id": "msc-biotech",
        "role_title": "Director of Genomics / Principal Research Scientist",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading molecular oncology panels and multi-omics research centers requires decades of postgraduate biotechnology research and leadership.",
        "indicative_salary": {
          "min": 22.0,
          "max": 48.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Scientific Executive Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Genomics",
          "Laboratory Direction (NABL)",
          "Research Strategy"
        ],
        "top_employers": [
          "National Diagnostic Chains",
          "Global CROs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "msc-bt-hs1",
        "degree_id": "msc-biotech",
        "program_name": "Ph.D. in Biotechnology / Molecular Biology",
        "level": "Doctoral",
        "entrance_exams": [
          "CSIR-UGC NET (JRF)",
          "DBT-JRF (BET)",
          "ICMR-JRF",
          "GATE BT"
        ],
        "eligibility_rule": "Master of Science in Biotechnology / Life Sciences with minimum 55% marks and qualifying national JRF score.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "JNU New Delhi",
          "NCBS Bangalore",
          "NII New Delhi",
          "IIT Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-bt-hs2",
        "degree_id": "msc-biotech",
        "program_name": "Advanced PG Diploma in Clinical Research & Pharmacovigilance",
        "level": "PG",
        "entrance_exams": [
          "University Selection"
        ],
        "eligibility_rule": "M.Sc in Life Sciences, Biotechnology, or Pharmacy with minimum 50% marks.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "KLE University",
          "ICRI India"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "msc-bt-ct1",
        "degree_id": "msc-biotech",
        "cert_name": "Certified Molecular Diagnostics Specialist (NGS & PCR)",
        "provider": "NABL / Recognized Health Authority",
        "domain": "Clinical Molecular Testing",
        "level": "Intermediate",
        "prerequisites": [
          "Master degree in life sciences or biotechnology"
        ],
        "official_url": "https://www.nabl-india.org",
        "sourceUrl": "https://www.nabl-india.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-bt-ct2",
        "degree_id": "msc-biotech",
        "cert_name": "Flow Cytometry Data Analysis Certification (FlowJo)",
        "provider": "BD Biosciences / FlowJo",
        "domain": "Cellular Immunology & FACS",
        "level": "Intermediate",
        "prerequisites": [
          "Experience with fluorescence activated cell sorting"
        ],
        "official_url": "https://www.flowjo.com",
        "sourceUrl": "https://www.flowjo.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-bt-ct3",
        "degree_id": "msc-biotech",
        "cert_name": "Good Laboratory Practice (GLP) & Biosafety Compliance",
        "provider": "National GLP Compliance Monitoring Authority (NGCMA)",
        "domain": "Laboratory Quality Assurance",
        "level": "Beginner",
        "prerequisites": [
          "Degree in science or engineering"
        ],
        "official_url": "https://dst.gov.in",
        "sourceUrl": "https://dst.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "msc-bt-gv1",
        "degree_id": "msc-biotech",
        "exam_or_post_name": "CSIR-UGC National Eligibility Test (NET) for JRF & Lectureship",
        "conducting_body": "NTA / CSIR",
        "eligibility_rule": {
          "degreeFamily": "Life Sciences",
          "allowedDegrees": [
            "M.Sc Biotechnology",
            "M.Sc Life Sciences"
          ],
          "mandatorySubjects": [
            "Life Sciences"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "National entrance conferring prestigious Junior Research Fellowship and Assistant Professor eligibility across all Indian universities."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://csirnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-bt-gv2",
        "degree_id": "msc-biotech",
        "exam_or_post_name": "DBT Junior Research Fellowship (BET - Biotechnology Eligibility Test)",
        "conducting_body": "Regional Centre for Biotechnology (RCB) / DBT",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "M.Sc Biotechnology",
            "M.Tech Biotech"
          ],
          "mandatorySubjects": [
            "Biotechnology"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Central government doctoral fellowship funded by the Department of Biotechnology."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rcb.res.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "msc-bt-sw1",
        "degree_id": "msc-biotech",
        "target_role": "Clinical Research Associate (CRA) & Trial Operations Lead",
        "pivot_reason": "Leverage your medical biotechnology and pharmacology understanding to manage ICH-GCP compliant clinical trials for pharmaceutical sponsors.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "ICH-GCP Guidelines & Clinical Trial Protocol Design",
            "type": "course",
            "detail": "Master clinical trial phases, institutional ethics committees (IEC), and regulatory filings.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Electronic Data Capture (EDC) & Clinical Data Management (Medidata)",
            "type": "course",
            "detail": "Monitor patient case report forms (eCRFs), adverse event reporting, and source data verification.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Site Initiation & Monitoring Audit Simulation Capstone",
            "type": "portfolio",
            "detail": "Deliver full clinical monitoring visit report and regulatory compliance audit package.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Clinical Research Associate (CCRA)",
          "ICH-GCP Certificate"
        ],
        "why_feasible": "Biotechnology postgraduates possess disease pathology and bioassay knowledge that makes them superior clinical trial monitors.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "msc-bt-ent1",
        "degree_id": "msc-biotech",
        "idea_title": "Specialized Molecular Diagnostic & Infectious Disease Testing Lab",
        "description": "Found an accredited clinical molecular testing lab offering rapid RT-PCR panels for viral pathogens, genetic hereditary carrier screening, and HLA typing.",
        "first_milestones": [
          "Set up NABL-compliant cleanroom facility with real-time qPCR and automated nucleic acid extraction.",
          "Validate diagnostic sensitivity on syndromic respiratory and gastrointestinal infection panels.",
          "Empanel with 15 private multi-specialty hospitals for outsourced molecular diagnostics."
        ],
        "relevant_schemes": [
          {
            "name": "BIRAC SEED Fund Scheme",
            "agency": "Department of Biotechnology",
            "benefits": "Financial assistance up to 30 Lakhs for healthcare biotech startups.",
            "sourceUrl": "https://www.birac.nic.in"
          },
          {
            "name": "MUDRA Scheme (Tarun Loan)",
            "agency": "Ministry of Finance",
            "benefits": "Loans up to 10 Lakhs for diagnostic clinic equipment purchase.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "msc-biotech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Molecular Biology & Genomic Techniques",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master recombinant DNA protocols, gene cloning, PCR assay development, and immunological assays.",
              "Prepare for national doctoral fellowship examinations (CSIR-NET JRF, DBT-BET, ICMR-JRF)."
            ],
            "milestone": "High first-year academic score and JRF exam qualification"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Research & National Lab Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct 6-month experimental dissertation at a premier national laboratory or biotech firm.",
              "Publish scientific findings in international peer-reviewed journals."
            ],
            "milestone": "Completed master thesis dissertation and scientific paper"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & R&D Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend dissertation before external board of examiners.",
              "Secure scientific position at leading diagnostic lab, genomics firm, or biopharma CRO."
            ],
            "milestone": "Awarded M.Sc in Biotechnology degree with honors"
          }
        ]
      },
      "completed": {
        "degree_id": "msc-biotech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Scientific Dossier & Assay Protocol Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document laboratory proficiencies, assay troubleshooting protocols, and publication reprints.",
              "Review molecular biology theory, diagnostic quality standards (NABL), and research methodologies."
            ],
            "milestone": "Industry-ready scientific research dossier"
          },
          {
            "stepNumber": 2,
            "title": "Genomics & Biopharma Industry Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Molecular Biologist and Research Associate positions.",
              "Demonstrate PCR assay design and experimental data interpretation during technical interviews."
            ],
            "milestone": "Job offer secured for scientific research role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Research Scientist & Doctoral Fellowship",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead genomics laboratory teams or transition into funded Ph.D. program on national JRF fellowship.",
              "Publish groundbreaking therapeutic or diagnostic research."
            ],
            "milestone": "Promoted to Senior Scientist or commenced Ph.D."
          }
        ]
      }
    }
  },
  {
    "degree_id": "msc-agri",
    "id": "msc-agri",
    "familyId": "agriculture",
    "name": "Master of Science in Agriculture",
    "shortName": "M.Sc Agriculture",
    "aliases": [
      "MSc Agriculture",
      "M.Sc. (Agri)",
      "MSc Agri",
      "Postgraduate in Agriculture",
      "msc-agri"
    ],
    "level": "PG",
    "discipline": "Agriculture & Allied Sciences",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "ICAR",
    "overview": "A premier 2-year agricultural research postgraduate degree under the Indian Council of Agricultural Research (ICAR). Offered in specialized disciplines such as Agronomy, Genetics & Plant Breeding, Soil Science, Agricultural Entomology, and Plant Pathology, it equips graduates to lead national crop breeding programs, agribusiness R&D, and agricultural university teaching.",
    "key_skills": [
      "Advanced Crop Physiology & Climate-Resilient Agronomic Practices",
      "Molecular Plant Breeding & Marker-Assisted Selection (MAS)",
      "Soil Chemistry, Nutrient Dynamics & Spectrophotometric Profiling",
      "Integrated Pest Management (IPM) & Molecular Pathogen Diagnostics",
      "Experimental Design in Agriculture & Statistical Field Trials (R / SAS / OPSTAT)",
      "Agrochemical Registration, Regulatory Dossiers & CIBRC Protocols"
    ],
    "subjects_taught": [
      "Advanced Design of Experiments & Agricultural Statistics",
      "Physiological Aspects of Crop Production & Climate Stress",
      "Molecular Approaches to Crop Improvement & Plant Breeding",
      "Soil Fertility & Fertilizer Management in Sustainable Agriculture",
      "Advanced Plant Protection & Crop Health Diagnostics",
      "Agribusiness Management & Seed Certification Standards",
      "Postgraduate Master Research Thesis"
    ],
    "typical_employers": [
      "ICAR Research Institutes (IARI, CRRI, IIOR, CICR)",
      "State Agricultural Universities (SAUs)",
      "MNC Seed & Agrochemical R&D (Bayer, Syngenta, Corteva, UPL)",
      "Public Sector Banking (IBPS AFO Specialist / Agriculture Officers)",
      "Commercial Agribusiness & Plantation Corporates"
    ],
    "specializations": [
      {
        "id": "msc-agri-breed",
        "name": "Genetics & Plant Breeding",
        "aliases": [
          "M.Sc Plant Breeding"
        ],
        "skillsGained": [
          "Hybrid Breeding",
          "MAS"
        ],
        "typicalRoles": [
          "Plant Breeder / Seed Scientist"
        ]
      },
      {
        "id": "msc-agri-agronomy",
        "name": "Agronomy & Soil Management",
        "aliases": [
          "M.Sc Agronomy"
        ],
        "skillsGained": [
          "Nutrient Management",
          "Precision Farming"
        ],
        "typicalRoles": [
          "Senior Agronomist"
        ]
      }
    ],
    "sourceUrl": "https://icar.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "msc-ag-c1",
        "degree_id": "msc-agri",
        "role_title": "Commercial Plant Breeder / Hybrid Seed Scientist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level coursework in quantitative genetics, line breeding, and marker-assisted selection qualifies you to breed high-yielding hybrid seeds.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Agri-Biotech Industry Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Hybrid Breeding",
          "Varietal Purity",
          "Field Trial Analysis",
          "QTL Mapping"
        ],
        "top_employers": [
          "Bayer CropScience",
          "Syngenta India",
          "Corteva Agriscience",
          "Rasi Seeds"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-ag-c2",
        "degree_id": "msc-agri",
        "role_title": "Senior Technical Agronomist / Product Development Lead",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Deep mastery of crop nutrition curves, agrochemical efficacy trials, and soil fertility dynamics maps directly to agribusiness technical leadership.",
        "indicative_salary": {
          "min": 6.2,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Agrochemical Corporate Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Crop Nutrition",
          "Agrochemical Dossiers",
          "Field Demos",
          "Farmer Outreach"
        ],
        "top_employers": [
          "UPL Limited",
          "Coromandel International",
          "IFFCO",
          "PI Industries"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-ag-c3",
        "degree_id": "msc-agri",
        "role_title": "Chief Agricultural Officer / Head of Global Seed Breeding",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing commercial multi-crop breeding stations and multinational agrochemical trial pipelines requires advanced agricultural postgraduate credentials.",
        "indicative_salary": {
          "min": 24.0,
          "max": 50.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Agribusiness Executive Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Breeding Pipeline Strategy",
          "Regulatory Filings (PPV&FR)",
          "Agribusiness P&L"
        ],
        "top_employers": [
          "Global Seed Corporations",
          "Agri-Biotech Majors"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "msc-ag-hs1",
        "degree_id": "msc-agri",
        "program_name": "Ph.D. in Agriculture (Agronomy / Plant Breeding / Soil Science)",
        "level": "Doctoral",
        "entrance_exams": [
          "ICAR AICE-JRF/SRF (Ph.D.)",
          "ARS Preliminary Examination",
          "SAU Ph.D. Entrance"
        ],
        "eligibility_rule": "Master of Science in Agriculture in the concerned discipline from an ICAR-accredited university with minimum 6.5/10.0 OGPA.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "Indian Agricultural Research Institute (IARI New Delhi)",
          "Punjab Agricultural University (PAU)",
          "GBPUAT Pantnagar",
          "TNAU Coimbatore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-ag-hs2",
        "degree_id": "msc-agri",
        "program_name": "Post Graduate Diploma in Agri-Business Management (PGDABM)",
        "level": "PG",
        "entrance_exams": [
          "CAT",
          "XAT",
          "CUET-PG"
        ],
        "eligibility_rule": "Four-year B.Sc Agriculture or M.Sc Agriculture with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIM Ahmedabad",
          "MANAGE Hyderabad",
          "IRMA Anand"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "msc-ag-ct1",
        "degree_id": "msc-agri",
        "cert_name": "Certified Seed Quality & Varietal Purity Inspector",
        "provider": "National Seeds Corporation (NSC) / ICAR",
        "domain": "Seed Technology & Certification",
        "level": "Intermediate",
        "prerequisites": [
          "M.Sc in Agriculture or Plant Breeding"
        ],
        "official_url": "https://www.indiaseeds.com",
        "sourceUrl": "https://www.indiaseeds.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-ag-ct2",
        "degree_id": "msc-agri",
        "cert_name": "Certified Drone Pilot for Agricultural Crop Scouting & Spraying",
        "provider": "DGCA Approved Drone Training School",
        "domain": "Precision Agriculture & Drone Scouting",
        "level": "Intermediate",
        "prerequisites": [
          "Graduate in Agriculture or Science"
        ],
        "official_url": "https://digitalsky.dgca.gov.in",
        "sourceUrl": "https://digitalsky.dgca.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "msc-ag-ct3",
        "degree_id": "msc-agri",
        "cert_name": "NABL Laboratory Assessor for Soil, Water & Fertilizer Testing",
        "provider": "NABL India",
        "domain": "Agricultural Testing Laboratory Quality",
        "level": "Advanced",
        "prerequisites": [
          "Master degree in Agriculture or Chemistry with analytical testing experience"
        ],
        "official_url": "https://www.nabl-india.org",
        "sourceUrl": "https://www.nabl-india.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "msc-ag-gv1",
        "degree_id": "msc-agri",
        "exam_or_post_name": "Agricultural Research Service (ARS) / National Eligibility Test (NET)",
        "conducting_body": "Agricultural Scientists Recruitment Board (ASRB) / ICAR",
        "eligibility_rule": {
          "degreeFamily": "Agricultural Sciences",
          "allowedDegrees": [
            "M.Sc Agriculture in relevant discipline"
          ],
          "mandatorySubjects": [
            "Agronomy / Genetics & Plant Breeding / Soil Science"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Scientist cadre recruitment for ICAR research institutes across India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://asrb.org.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "msc-ag-gv2",
        "degree_id": "msc-agri",
        "exam_or_post_name": "State Agriculture Department Assistant Director of Agriculture (ADA)",
        "conducting_body": "State Public Service Commissions (PSCs)",
        "eligibility_rule": {
          "degreeFamily": "Agriculture",
          "allowedDegrees": [
            "M.Sc Agriculture",
            "B.Sc Agriculture"
          ],
          "mandatorySubjects": [
            "Agricultural Sciences"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Class I/II gazetted agricultural administrative officer managing district-level crop schemes and input subsidies."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "msc-ag-sw1",
        "degree_id": "msc-agri",
        "target_role": "Satellite Agtech & Crop Phenology Modeling Specialist",
        "pivot_reason": "Combine your field agronomy knowledge with multispectral satellite imagery and weather indices to build automated crop insurance and yield models.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Google Earth Engine & Satellite Crop Index Analysis (NDVI / NDRE)",
            "type": "course",
            "detail": "Process Sentinel-2 and Landsat multispectral imagery to detect crop stress and leaf area index.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Python for Agricultural Climate Data & Crop Growth Simulation (DSSAT)",
            "type": "course",
            "detail": "Calibrate process-based crop models with historical rainfall, temperature, and soil data.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Parametric Crop Insurance Yield Assessment Capstone",
            "type": "portfolio",
            "detail": "Build automated satellite yield loss verification model for Pradhan Mantri Fasal Bima Yojana (PMFBY).",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Geospatial Analyst for Agriculture",
          "Precision Farming Certificate"
        ],
        "why_feasible": "Agronomists understand crop developmental stages intuitively, making their remote-sensing yield models vastly more accurate.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "msc-ag-ent1",
        "degree_id": "msc-agri",
        "idea_title": "High-Tech Seed Production & Bio-Fertilizer Formulation Enterprise",
        "description": "Found an agricultural inputs company producing certified climate-resilient hybrid seeds and liquid bio-fertilizers for regional farmer producer organizations.",
        "first_milestones": [
          "Establish 20-acre contract hybrid seed production block with farmer partners.",
          "Set up liquid bio-fertilizer and mycorrhizal culture formulation facility.",
          "Achieve seed testing certification from State Seed Certification Agency and distribute through 50 retail agro-dealers."
        ],
        "relevant_schemes": [
          {
            "name": "Sub-Mission on Seeds and Planting Material (SMSP)",
            "agency": "Ministry of Agriculture",
            "benefits": "Financial assistance for seed infrastructure and processing units.",
            "sourceUrl": "https://agricoop.nic.in"
          },
          {
            "name": "Agri-Clinics and Agri-Business Centres (ACABC) Scheme",
            "agency": "MANAGE / NABARD",
            "benefits": "Up to 36-44% composite subsidy on bank loans for agriculture postgraduates.",
            "sourceUrl": "https://www.agriclinics.net"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "msc-agri",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Agronomic Principles & Field Trial Planning",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master experimental plot design, split-plot statistical models, and crop physiology under climate stress.",
              "Design and sow field dissertation research plots during Kharif/Rabi seasons."
            ],
            "milestone": "Approved field research plan and statistical layout"
          },
          {
            "stepNumber": 2,
            "title": "Field Research Execution & ASRB-NET Preparation",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Collect morphological and physiological crop yield data across growing seasons.",
              "Rigorously prepare for ASRB-NET / ARS examination and publish research articles."
            ],
            "milestone": "Completed field research dissertation and qualified ASRB-NET"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Agribusiness Placement Drives",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation before university board of examiners.",
              "Secure corporate seed R&D or public sector agricultural officer appointment."
            ],
            "milestone": "Conferred M.Sc in Agriculture degree"
          }
        ]
      },
      "completed": {
        "degree_id": "msc-agri",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Agricultural Research Dossier & Statistical Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile experimental field trial reports, ANOVA statistical tables, and publication reprints.",
              "Review latest government agricultural schemes (PM-KISAN, PMFBY, Soil Health Card)."
            ],
            "milestone": "Professional agricultural research dossier"
          },
          {
            "stepNumber": 2,
            "title": "Corporate Agribusiness & Research Campus Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Hybrid Plant Breeder and Technical Agronomist positions.",
              "Demonstrate crop diagnosis, field trial statistical analysis, and agronomic recommendations in interviews."
            ],
            "milestone": "Offer letter received for specialist agricultural scientist role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Agricultural Scientist Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead regional seed breeding stations or state agricultural development zones.",
              "Enroll in Ph.D. program or lead commercial crop protection product launches."
            ],
            "milestone": "Promoted to Senior Research Agronomist"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mcom",
    "id": "mcom",
    "familyId": "commerce",
    "name": "Master of Commerce",
    "shortName": "M.Com",
    "aliases": [
      "Master of Commerce",
      "M.Com.",
      "MCom",
      "mcom"
    ],
    "level": "PG",
    "discipline": "Commerce, Business & Management",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "An advanced 2-year postgraduate degree delivering in-depth academic and analytical training in financial accounting, corporate taxation, international finance, managerial economics, auditing standards, and statistical research methods. It prepares commerce postgraduates for senior corporate accounting, banking specialist roles, financial analysis, and higher education teaching (UGC-NET / Assistant Professor).",
    "key_skills": [
      "Advanced Corporate Financial Reporting & Ind AS / IFRS Convergence",
      "Direct & Indirect Taxation Planning (Corporate Tax, GST Compliance)",
      "Corporate Financial Management & Working Capital Optimization",
      "Financial Statement Analysis & Ratio Forecasting (Excel, Tally Prime)",
      "Statutory Auditing Protocols & Risk-Based Internal Audits",
      "Business Research Methods & Econometric Data Analysis (SPSS / R)"
    ],
    "subjects_taught": [
      "Advanced Financial Accounting & Reporting",
      "Corporate Financial Policy & Strategy",
      "Direct Tax Law and Practice & International Taxation",
      "Goods and Services Tax (GST) & Customs Law",
      "Advanced Business Statistics & Quantitative Techniques",
      "Advanced Auditing & Corporate Governance",
      "Postgraduate Research Dissertation / Project"
    ],
    "typical_employers": [
      "Big 4 Accounting & Advisory Firms (Deloitte, PwC, EY, KPMG)",
      "Commercial & Investment Banks (HDFC Bank, ICICI Bank, SBI)",
      "Corporate Finance Desks of MNCs",
      "Credit Rating Agencies (CRISIL, ICRA, CareEdge)",
      "Universities & Degree Colleges"
    ],
    "specializations": [
      {
        "id": "mcom-finance",
        "name": "Accounting & Finance",
        "aliases": [
          "M.Com Finance"
        ],
        "skillsGained": [
          "IFRS",
          "Corporate Valuation",
          "Ind AS"
        ],
        "typicalRoles": [
          "Financial Controller",
          "Senior Accountant"
        ]
      },
      {
        "id": "mcom-tax",
        "name": "Taxation & Corporate Law",
        "aliases": [
          "M.Com Tax"
        ],
        "skillsGained": [
          "Corporate Tax",
          "Transfer Pricing",
          "GST"
        ],
        "typicalRoles": [
          "Tax Consultant"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mcom-c1",
        "degree_id": "mcom",
        "role_title": "Senior Financial Analyst / Corporate Accountant",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level coursework in consolidated financial statements, Ind AS reporting, and financial modeling qualifies you to manage corporate balance sheets.",
        "indicative_salary": {
          "min": 5.5,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Commerce Postgrad Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Ind AS",
          "Financial Modeling",
          "Corporate Tax",
          "Excel"
        ],
        "top_employers": [
          "Deloitte",
          "EY India",
          "Wipro Finance",
          "Genpact"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mcom-c2",
        "degree_id": "mcom",
        "role_title": "Credit Risk & Corporate Banking Underwriter",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth analysis of working capital cycles, balance sheet ratios, and cash flow adequacy maps directly to commercial lending appraisal.",
        "indicative_salary": {
          "min": 6.0,
          "max": 11.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Banking Sector Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Credit Appraisal",
          "Debt Service Ratio",
          "Working Capital",
          "Banking"
        ],
        "top_employers": [
          "HDFC Bank",
          "ICICI Bank",
          "Kotak Mahindra Bank",
          "Axis Bank"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mcom-c3",
        "degree_id": "mcom",
        "role_title": "VP Finance / Chief Financial Officer (CFO)",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing complete corporate treasury, capital allocation, and statutory financial reporting demands advanced postgraduate financial mastery.",
        "indicative_salary": {
          "min": 22.0,
          "max": 48.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Finance Pay Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Treasury Strategy",
          "IFRS Compliance",
          "Board Governance",
          "M&A"
        ],
        "top_employers": [
          "Publicly Listed Corporates",
          "Financial Institutions"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mcom-hs1",
        "degree_id": "mcom",
        "program_name": "Ph.D. in Commerce & Financial Studies",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET (JRF)",
          "State University Ph.D. Entrance"
        ],
        "eligibility_rule": "Master of Commerce (M.Com) with minimum 55% marks from a recognized university.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "Delhi School of Economics",
          "Banaras Hindu University",
          "Calcutta University",
          "Mumbai University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mcom-hs2",
        "degree_id": "mcom",
        "program_name": "Chartered Financial Analyst (CFA Program)",
        "level": "Professional",
        "entrance_exams": [
          "CFA Institute Entrance"
        ],
        "eligibility_rule": "Bachelor's or Master's degree in any discipline with interest in investment management.",
        "typical_duration": "2 to 3 Years",
        "top_institutes": [
          "CFA Institute USA (Administered Globally)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mcom-ct1",
        "degree_id": "mcom",
        "cert_name": "ACCA (Association of Chartered Certified Accountants)",
        "provider": "ACCA Global",
        "domain": "Global Financial Accounting & IFRS",
        "level": "Advanced",
        "prerequisites": [
          "Commerce degree grants exemptions for initial foundation papers"
        ],
        "official_url": "https://www.accaglobal.com",
        "sourceUrl": "https://www.accaglobal.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mcom-ct2",
        "degree_id": "mcom",
        "cert_name": "Certified Management Accountant (CMA US)",
        "provider": "IMA (Institute of Management Accountants)",
        "domain": "Corporate Financial Management",
        "level": "Intermediate",
        "prerequisites": [
          "Bachelor's degree or higher in business/finance"
        ],
        "official_url": "https://www.imanet.org",
        "sourceUrl": "https://www.imanet.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mcom-ct3",
        "degree_id": "mcom",
        "cert_name": "Certified Financial Modeling & Valuation Analyst (FMVA)",
        "provider": "Corporate Finance Institute (CFI)",
        "domain": "Valuation & DCF Modeling",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of corporate accounting and Excel formulas"
        ],
        "official_url": "https://corporatefinanceinstitute.com",
        "sourceUrl": "https://corporatefinanceinstitute.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mcom-gv1",
        "degree_id": "mcom",
        "exam_or_post_name": "UGC-NET Commerce for Assistant Professor & Junior Research Fellowship",
        "conducting_body": "National Testing Agency (NTA)",
        "eligibility_rule": {
          "degreeFamily": "Commerce",
          "allowedDegrees": [
            "M.Com"
          ],
          "mandatorySubjects": [
            "Commerce"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Mandatory national qualification for appointment as Assistant Professor in all UGC-recognized universities."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mcom-gv2",
        "degree_id": "mcom",
        "exam_or_post_name": "IBPS Specialist Officer (SO - Scale I Marketing / HR / Rajbhasha / Banking)",
        "conducting_body": "IBPS",
        "eligibility_rule": {
          "degreeFamily": "Commerce & Banking",
          "allowedDegrees": [
            "M.Com",
            "B.Com"
          ],
          "mandatorySubjects": [
            "Commerce / Banking"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Centralized recruitment for commercial officer cadres across public sector banks."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ibps.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mcom-sw1",
        "degree_id": "mcom",
        "target_role": "Financial Data Analytics & Automated BI Dashboard Developer",
        "pivot_reason": "Pivot your accounting ledger and balance sheet expertise into automated enterprise Power BI/SQL financial dashboards.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Advanced SQL & Relational Database Design for Financial Ledgers",
            "type": "course",
            "detail": "Master joins, window functions, and CTEs to query enterprise ERP accounting databases.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Power BI & DAX Financial Reporting Architecture",
            "type": "course",
            "detail": "Build automated income statement, balance sheet, and variance dashboards connected to SQL.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Automated Multi-Entity Financial Consolidation Capstone",
            "type": "portfolio",
            "detail": "Deliver end-to-end automated financial reporting suite with currency conversions in Power BI.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Microsoft Certified: Power BI Data Analyst",
          "FMVA Financial Modeling"
        ],
        "why_feasible": "M.Com postgraduates understand debit-credit mechanics and chart-of-accounts hierarchies that software developers struggle with.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mcom-ent1",
        "degree_id": "mcom",
        "idea_title": "Virtual CFO & SME Corporate Compliance Advisory Practice",
        "description": "Establish a boutique financial advisory firm offering fractional CFO services, monthly MIS reporting, and GST/income tax audit filing for growing MSMEs.",
        "first_milestones": [
          "Acquire professional indemnity insurance and establish cloud accounting workflows (Zoho Books / QuickBooks).",
          "Onboard 5 corporate clients on retainer for monthly financial closure and tax audits.",
          "Expand practice to include transfer pricing studies and angel investment pitch deck modeling."
        ],
        "relevant_schemes": [
          {
            "name": "MSME Udyam Registration & Priority Sector Lending",
            "agency": "Ministry of MSME",
            "benefits": "Access to collateral-free business loans under CGTMSE up to 2 Crore.",
            "sourceUrl": "https://udyamregistration.gov.in"
          },
          {
            "name": "Startup India Advisory Mentorship",
            "agency": "DPIIT",
            "benefits": "Tax exemptions and incubation support for registered consultancy ventures.",
            "sourceUrl": "https://www.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mcom",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Corporate Accounting & UGC-NET Prep",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Ind AS standards, corporate tax planning laws, and advanced statistical analysis.",
              "Commence structured preparation for UGC-NET Commerce examination."
            ],
            "milestone": "High first-year academic score and UGC-NET syllabus completion"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Research & Corporate Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct academic research on corporate governance or working capital efficiency in listed companies.",
              "Undergo summer financial internship at leading corporate or advisory firm."
            ],
            "milestone": "Submitted master research project and secured UGC-NET qualification"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Corporate Placement Campaigns",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master research project before university examiners.",
              "Join leading corporate finance division, Big 4 audit practice, or university faculty."
            ],
            "milestone": "Conferred Master of Commerce degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mcom",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Financial Modeling Portfolio & Credential Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile complex DCF valuation models, tax audit computation templates, and UGC-NET certificates.",
              "Review interview fundamentals in financial ratio analysis, Ind AS adjustments, and GST laws."
            ],
            "milestone": "Professional corporate finance portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Banking & Advisory Campus Hiring Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Senior Financial Analyst and Banking Credit Manager openings.",
              "Demonstrate balance sheet analysis, cash flow reconciliation, and tax planning during interviews."
            ],
            "milestone": "Offer letter received for corporate finance role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Finance Controller Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead corporate accounting consolidation or prepare company for initial public offering (IPO).",
              "Pursue ACCA or CFA charter for international mobility."
            ],
            "milestone": "Promoted to Senior Finance Manager"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mba",
    "id": "mba",
    "familyId": "commerce",
    "name": "Master of Business Administration",
    "shortName": "MBA",
    "aliases": [
      "Master of Business Administration",
      "MBA graduate",
      "PGDM",
      "mba"
    ],
    "level": "PG",
    "discipline": "Commerce, Business & Management",
    "duration": "2 Years (4 Semesters / 6 Trimesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A flagship 2-year professional postgraduate management program providing comprehensive leadership training across marketing, finance, human resources, operations, strategy, and business analytics. It prepares postgraduates to lead cross-functional organizations, drive corporate growth, manage P&L responsibilities, and launch high-impact entrepreneurial ventures.",
    "key_skills": [
      "Corporate Strategy Formulation & Competitive Advantage Analysis (Porter's Frameworks)",
      "Financial Management, Corporate Valuation & Capital Budgeting (DCF / LBO Modeling)",
      "Strategic Marketing, Brand Positioning & Go-to-Market (GTM) Strategy",
      "Supply Chain Network Design & Operations Optimization (Six Sigma / Lean)",
      "Organizational Leadership, Talent Management & Change Management",
      "Business Analytics, Data Visualization & Executive Decision Modeling (Python, Tableau)"
    ],
    "subjects_taught": [
      "Managerial Economics & Quantitative Methods",
      "Financial Accounting & Corporate Financial Management",
      "Marketing Management & Consumer Behavior",
      "Operations Management & Supply Chain Strategy",
      "Strategic Management & Corporate Governance",
      "Business Analytics & Executive Leadership",
      "Mandatory Summer Internship & Capstone Project"
    ],
    "typical_employers": [
      "Global Management Consultancies (McKinsey, BCG, Bain, Big 4)",
      "Investment Banks & Private Equity (Goldman Sachs, Morgan Stanley, Avendus)",
      "FMCG Conglomerates (HUL, P&G, Nestl\u00e9, ITC)",
      "Tech Majors & Unicorns (Amazon, Google, Flipkart, Microsoft)",
      "Conglomerates (Tata Administrative Services, Aditya Birla Group, Reliance)"
    ],
    "specializations": [
      {
        "id": "mba-finance",
        "name": "Finance & Investment Banking",
        "aliases": [
          "MBA Finance"
        ],
        "skillsGained": [
          "M&A",
          "DCF Modeling",
          "PE/VC"
        ],
        "typicalRoles": [
          "Investment Banking Associate"
        ]
      },
      {
        "id": "mba-marketing",
        "name": "Marketing & Brand Management",
        "aliases": [
          "MBA Marketing"
        ],
        "skillsGained": [
          "Brand Strategy",
          "Digital Marketing",
          "GTM"
        ],
        "typicalRoles": [
          "Brand Manager",
          "Product Marketing Lead"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mba-c1",
        "degree_id": "mba",
        "role_title": "Management Consultant / Strategy Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Comprehensive case study training in cost optimization, market entry strategy, and executive presentations directly maps into top-tier management consulting.",
        "indicative_salary": {
          "min": 14.0,
          "max": 28.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Tier-1 MBA Placement Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Strategy Frameworks",
          "Case Analysis",
          "Financial Modeling",
          "Executive Storytelling"
        ],
        "top_employers": [
          "McKinsey & Company",
          "BCG",
          "Bain",
          "Deloitte Consulting"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mba-c2",
        "degree_id": "mba",
        "role_title": "Brand Manager / Product Marketing Lead",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Mastery of customer segmentation, unit economics, and omnichannel media campaigns qualifies you to drive multi-crore consumer brand P&Ls.",
        "indicative_salary": {
          "min": 12.0,
          "max": 24.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "FMCG MBA Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Brand Equity",
          "P&L Management",
          "GTM Strategy",
          "Consumer Insights"
        ],
        "top_employers": [
          "Hindustan Unilever",
          "P&G India",
          "Nestl\u00e9",
          "ITC Limited"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mba-c3",
        "degree_id": "mba",
        "role_title": "Managing Director / Chief Executive Officer (CEO)",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading global multi-divisional enterprises, capital markets engagement, and enterprise transformation demands comprehensive master-level business acumen.",
        "indicative_salary": {
          "min": 45.0,
          "max": 150.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Leadership Compensation Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Enterprise Governance",
          "Global Strategy",
          "P&L Ownership",
          "Board Relations"
        ],
        "top_employers": [
          "Global Conglomerates",
          "Public Corporates"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mba-hs1",
        "degree_id": "mba",
        "program_name": "Fellow Programme in Management (FPM / Ph.D. in Management)",
        "level": "Doctoral",
        "entrance_exams": [
          "CAT",
          "GMAT",
          "GRE",
          "Research Proposal Interview"
        ],
        "eligibility_rule": "Master's degree in any discipline with minimum 60% marks or equivalent CGPA from a recognized institute.",
        "typical_duration": "4 to 5 Years",
        "top_institutes": [
          "IIM Ahmedabad",
          "IIM Bangalore",
          "IIM Calcutta",
          "ISB Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mba-hs2",
        "degree_id": "mba",
        "program_name": "Executive Leadership Programs / Global Master of Laws (LLM in Corporate Law)",
        "level": "Executive",
        "entrance_exams": [
          "Institute Selection"
        ],
        "eligibility_rule": "MBA with minimum 5 years of post-qualification managerial work experience.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "INSEAD",
          "Harvard Business School",
          "IIM Ahmedabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mba-ct1",
        "degree_id": "mba",
        "cert_name": "Project Management Professional (PMP)",
        "provider": "Project Management Institute (PMI)",
        "domain": "Strategic Project Management",
        "level": "Advanced",
        "prerequisites": [
          "3 years of professional project leadership experience"
        ],
        "official_url": "https://www.pmi.org/certifications/project-management-pmp",
        "sourceUrl": "https://www.pmi.org/certifications/project-management-pmp",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mba-ct2",
        "degree_id": "mba",
        "cert_name": "Certified Supply Chain Professional (CSCP)",
        "provider": "ASCM / APICS",
        "domain": "End-to-End Supply Chain Management",
        "level": "Advanced",
        "prerequisites": [
          "Bachelor degree plus professional supply chain experience"
        ],
        "official_url": "https://www.ascm.org",
        "sourceUrl": "https://www.ascm.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mba-ct3",
        "degree_id": "mba",
        "cert_name": "Chartered Financial Analyst (CFA Level I/II)",
        "provider": "CFA Institute",
        "domain": "Investment Management & Equity Research",
        "level": "Advanced",
        "prerequisites": [
          "Graduation in any discipline"
        ],
        "official_url": "https://www.cfainstitute.org",
        "sourceUrl": "https://www.cfainstitute.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mba-gv1",
        "degree_id": "mba",
        "exam_or_post_name": "Public Sector Undertaking (PSU) Management Trainee (HR / Marketing / Finance)",
        "conducting_body": "NTPC / ONGC / BHEL / IOCL",
        "eligibility_rule": {
          "degreeFamily": "Management",
          "allowedDegrees": [
            "2-year Full Time MBA / PGDM"
          ],
          "mandatorySubjects": [
            "Finance / HR / Marketing"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 29,
            "obc": 32,
            "sc_st": 34
          },
          "notes": "Direct officer recruitment across Maharatna and Navratna public enterprises."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ongcindia.com",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mba-gv2",
        "degree_id": "mba",
        "exam_or_post_name": "Reserve Bank of India (RBI) Grade 'B' Officer",
        "conducting_body": "Reserve Bank of India Services Board",
        "eligibility_rule": {
          "degreeFamily": "Any Graduate / Postgraduate",
          "allowedDegrees": [
            "Graduation / Post Graduation in any discipline including MBA"
          ],
          "mandatorySubjects": [
            "General Studies / Economic & Social Issues / Finance & Management"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Premier central banking regulatory career managing monetary policy and banking supervision."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://opportunities.rbi.org.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mba-sw1",
        "degree_id": "mba",
        "target_role": "Technical Product Manager (TPM) in High-Tech & SaaS",
        "pivot_reason": "Combine your business acumen, user journey mapping, and financial unit economics with software development lifecycles to lead SaaS product lines.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Agile Product Management & Wireframing (Jira / Figma)",
            "type": "course",
            "detail": "Master PRD documentation, backlog grooming, and customer discovery interviews.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Data-Driven Product Analytics & A/B Testing (Mixpanel / Amplitude)",
            "type": "course",
            "detail": "Define North Star metrics, track funnel drop-offs, and design multivariate feature experiments.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "End-to-End SaaS Feature Launch & GTM Capstone Project",
            "type": "portfolio",
            "detail": "Build complete product spec, financial business case, and release roadmap for an enterprise B2B feature.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Product Manager (CPM)",
          "Scrum Product Owner (CSPO)"
        ],
        "why_feasible": "MBAs understand ROI and market viability, making them natural leaders of engineering and design squads.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mba-ent1",
        "degree_id": "mba",
        "idea_title": "Venture-Backed Direct-to-Consumer (D2C) or B2B SaaS Enterprise",
        "description": "Found a scalable technology startup addressing enterprise supply chain inefficiencies or launching an innovative omnichannel consumer brand.",
        "first_milestones": [
          "Formulate comprehensive investor deck and financial unit economic model.",
          "Launch minimum viable product (MVP) and acquire first 10,000 active users or 20 enterprise pilot clients.",
          "Raise institutional seed round from angel networks and institutional venture capital firms."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme (SISFS)",
            "agency": "DPIIT",
            "benefits": "Up to 50 Lakhs funding for early stage product commercialization.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "Pradhan Mantri Mudra Yojana (PMMY)",
            "agency": "Ministry of Finance",
            "benefits": "Loans up to 10 Lakhs for business establishment.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mba",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Core Management Foundations & Summer Placement Prep",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master corporate strategy, financial accounting, marketing dynamics, and microeconomics.",
              "Participate in corporate case competitions and secure prestigious summer internship."
            ],
            "milestone": "Secured summer internship at premier corporate MNC"
          },
          {
            "stepNumber": 2,
            "title": "Summer Internship & Specialization Electives",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Deliver high-impact summer project delivering measurable revenue growth or operational savings.",
              "Secure pre-placement offer (PPO) and complete advanced electives in chosen major."
            ],
            "milestone": "Successful summer internship with Pre-Placement Offer (PPO)"
          },
          {
            "stepNumber": 3,
            "title": "Final Placements & Executive Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Lead student clubs or campus placement committee initiatives.",
              "Finalize top-tier consulting, investment banking, or corporate leadership offer."
            ],
            "milestone": "Conferred Master of Business Administration degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mba",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Executive Leadership Portfolio & Case Study Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Package corporate case competition solutions, internship whitepapers, and financial models.",
              "Review behavioral frameworks, leadership style narratives, and business case frameworks."
            ],
            "milestone": "Executive-level business leadership dossier"
          },
          {
            "stepNumber": 2,
            "title": "Lateral & Executive Corporate Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Management Consultant and Product Marketing Manager openings.",
              "Excel in case interviews, guestimate rounds, and executive partner discussions."
            ],
            "milestone": "Appointment letter secured for senior management position"
          },
          {
            "stepNumber": 3,
            "title": "General Management & Enterprise Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Own departmental P&L and lead cross-functional teams to deliver key organizational milestones.",
              "Evaluate advisory board roles or executive education for senior director transition."
            ],
            "milestone": "Promoted to Associate Vice President / Business Head"
          }
        ]
      }
    }
  },
  {
    "degree_id": "ma-english",
    "id": "ma-english",
    "familyId": "arts_humanities",
    "name": "Master of Arts in English Literature",
    "shortName": "M.A. English",
    "aliases": [
      "MA English",
      "Master of Arts in English",
      "M.A. English Literature",
      "ma-english"
    ],
    "level": "PG",
    "discipline": "Arts, Humanities & Social Sciences",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "An advanced 2-year postgraduate program offering rigorous critical analysis of English literature from the Renaissance to contemporary postcolonial studies. It immerses students in literary theory, cultural studies, semiotics, linguistics, creative writing, and rhetoric, preparing graduates for higher academic research, elite publishing, corporate communications, and high-level digital content strategy.",
    "key_skills": [
      "Advanced Critical Theory, Deconstruction & Postcolonial Discourse Analysis",
      "Stylistics, Rhetorical Analysis & Advanced Copyediting (Chicago/MLA/APA)",
      "Cultural Studies, Media Semiotics & Gender Representation Analysis",
      "Long-Form Research Writing & Scholarly Literary Synthesis",
      "Corporate Communications, Narrative Strategy & Crisis Public Relations",
      "Curriculum Design & Pedagogical Instruction for English Language Teaching (ELT)"
    ],
    "subjects_taught": [
      "Chaucer to the Metaphysicals & Shakespearean Drama",
      "Romantic and Victorian Poetry & Prose",
      "Modern & Contemporary British, American and World Literature",
      "Postcolonial Literatures in English & Indian Writing in English",
      "Literary Theory and Cultural Studies",
      "Linguistics, Phonetics and English Language Teaching (ELT)",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Global Book Publishers (Penguin Random House, HarperCollins, Oxford University Press)",
      "National Media Houses (The Hindu, Indian Express, BBC India)",
      "Universities & Higher Education Institutions",
      "MNC Corporate Communications & Public Relations Consultancies",
      "Digital Content & Brand Storytelling Agencies"
    ],
    "specializations": [
      {
        "id": "ma-eng-theory",
        "name": "Literary Theory & Cultural Studies",
        "aliases": [
          "Cultural Studies Track"
        ],
        "skillsGained": [
          "Critical Theory",
          "Discourse Analysis"
        ],
        "typicalRoles": [
          "Academic Researcher",
          "Editorial Lead"
        ]
      },
      {
        "id": "ma-eng-elt",
        "name": "Linguistics & English Language Teaching (ELT)",
        "aliases": [
          "Applied Linguistics"
        ],
        "skillsGained": [
          "Phonetics",
          "Curriculum Design"
        ],
        "typicalRoles": [
          "ELT Specialist",
          "Curriculum Developer"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "ma-eng-c1",
        "degree_id": "ma-english",
        "role_title": "Senior Commissioning Editor / Book Editor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Advanced training in literary critique, structural editing, and textual scholarship qualifies you to acquire manuscripts and manage editorial publishing pipelines.",
        "indicative_salary": {
          "min": 5.0,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Publishing Industry Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Developmental Editing",
          "Proofreading",
          "Author Relations",
          "Chicago Manual"
        ],
        "top_employers": [
          "Penguin Random House India",
          "HarperCollins",
          "Rupa Publications"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-eng-c2",
        "degree_id": "ma-english",
        "role_title": "Corporate Communications Lead / Narrative Strategist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Mastery of rhetoric, tone-of-voice governance, and long-form narrative structure maps directly into corporate leadership communications and ESG reporting.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Corporate Comms Salary Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Executive Ghostwriting",
          "Crisis PR",
          "Press Releases",
          "Internal Comms"
        ],
        "top_employers": [
          "Tata Sons",
          "Infosys Brand Team",
          "Adfactors PR",
          "Edelman India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-eng-c3",
        "degree_id": "ma-english",
        "role_title": "Chief Content Officer / Publishing Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing multinational publishing imprints and defining national cultural media campaigns requires decades of literary and editorial leadership.",
        "indicative_salary": {
          "min": 20.0,
          "max": 42.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Editorial Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Imprint Strategy",
          "Media Rights Acquisition",
          "Editorial Governance"
        ],
        "top_employers": [
          "Major International Publishing Houses",
          "Global Media Groups"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "ma-eng-hs1",
        "degree_id": "ma-english",
        "program_name": "Ph.D. in English Literature / Cultural Studies",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET (JRF)",
          "Central University Research Entrance"
        ],
        "eligibility_rule": "Master of Arts in English with minimum 55% marks from a recognized university.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "JNU New Delhi",
          "Delhi University",
          "EFL University Hyderabad",
          "Jadavpur University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-eng-hs2",
        "degree_id": "ma-english",
        "program_name": "Post Graduate Diploma in Journalism & Mass Communication",
        "level": "PG",
        "entrance_exams": [
          "IIMC Entrance Examination"
        ],
        "eligibility_rule": "Bachelor's or Master's degree in any discipline with minimum 50% marks.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "Indian Institute of Mass Communication (IIMC New Delhi)",
          "Asian College of Journalism (ACJ Chennai)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "ma-eng-ct1",
        "degree_id": "ma-english",
        "cert_name": "CELTA (Certificate in Teaching English to Speakers of Other Languages)",
        "provider": "Cambridge English Assessment",
        "domain": "English Language Teaching (ELT)",
        "level": "Advanced",
        "prerequisites": [
          "High English language proficiency and graduate degree"
        ],
        "official_url": "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/",
        "sourceUrl": "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-eng-ct2",
        "degree_id": "ma-english",
        "cert_name": "Professional Copyediting & Proofreading Certification",
        "provider": "Chartered Institute of Editing and Proofreading (CIEP)",
        "domain": "Publishing Editorial Standards",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in humanities with editorial aptitude"
        ],
        "official_url": "https://www.ciep.uk",
        "sourceUrl": "https://www.ciep.uk",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-eng-ct3",
        "degree_id": "ma-english",
        "cert_name": "HubSpot Certified Content Marketing Specialist",
        "provider": "HubSpot Academy",
        "domain": "Digital Brand Storytelling & Inbound Strategy",
        "level": "Beginner",
        "prerequisites": [
          "Basic understanding of digital marketing principles"
        ],
        "official_url": "https://academy.hubspot.com",
        "sourceUrl": "https://academy.hubspot.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "ma-eng-gv1",
        "degree_id": "ma-english",
        "exam_or_post_name": "UGC-NET English for Assistant Professor & Junior Research Fellowship",
        "conducting_body": "National Testing Agency (NTA)",
        "eligibility_rule": {
          "degreeFamily": "English",
          "allowedDegrees": [
            "M.A. English"
          ],
          "mandatorySubjects": [
            "English Literature"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "National statutory eligibility test for faculty recruitment in universities and degree colleges across India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-eng-gv2",
        "degree_id": "ma-english",
        "exam_or_post_name": "UPSC Civil Services Examination (IAS / IFS / IPS) with English Literature Optional",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Any Graduate / Postgraduate",
          "allowedDegrees": [
            "Graduation / Post Graduation in any discipline"
          ],
          "mandatorySubjects": [
            "General Studies + English Literature Optional"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "English literature is one of the most high-scoring and analytical optional subjects in UPSC CSE."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "ma-eng-sw1",
        "degree_id": "ma-english",
        "target_role": "UX Content Strategist & Conversational AI Prompt Designer",
        "pivot_reason": "Apply your deep linguistic syntax, rhetoric, and reader psychology training to craft intuitive user interface microcopy and train conversational LLM personas.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "UX Writing Principles & User Interface Microcopy (Figma)",
            "type": "course",
            "detail": "Design error states, button CTAs, onboarding flows, and accessibility screen-reader texts.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Conversational Design & LLM System Prompt Engineering",
            "type": "course",
            "detail": "Define tone-of-voice guidelines, few-shot prompt templates, and conversational bot branching.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Complete SaaS Application UX Copy & Conversational Bot Capstone",
            "type": "portfolio",
            "detail": "Deliver full Figma copy deck and prompt evaluation benchmark for a fintech app.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified UX Writer",
          "Conversational AI Design Certificate"
        ],
        "why_feasible": "English postgraduates possess subtle understanding of connotations, empathy, and clarity required for high-converting UX copy.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "ma-eng-ent1",
        "degree_id": "ma-english",
        "idea_title": "Boutique Literary Agency & Premium Content Production House",
        "description": "Found an independent literary agency representing emerging South Asian authors and producing high-impact corporate biographies and documentary scripts.",
        "first_milestones": [
          "Sign 5 debut fiction and non-fiction authors for manuscript representation.",
          "Negotiate publishing deals with Tier-1 traditional publishing houses.",
          "Establish commercial ghostwriting services for tech founders and business leaders."
        ],
        "relevant_schemes": [
          {
            "name": "National Book Trust (NBT) Author Support Grants",
            "agency": "Ministry of Education",
            "benefits": "Financial subsidies for regional and creative writing publication.",
            "sourceUrl": "https://www.nbtindia.gov.in"
          },
          {
            "name": "Startup India Registration for Creative Studios",
            "agency": "DPIIT",
            "benefits": "Tax exemptions and priority intellectual property support.",
            "sourceUrl": "https://www.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "ma-english",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Literary Canon Immersion & Critical Theory Mastery",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master postcolonial theory, feminist critique, and semiotic textual analysis.",
              "Begin structured preparation for UGC-NET English Literature examination."
            ],
            "milestone": "Top academic grades and completion of UGC-NET core reading list"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Writing & Editorial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Draft comprehensive master dissertation analyzing a focused literary corpus or cultural text.",
              "Complete summer editorial internship at major publishing house or national magazine."
            ],
            "milestone": "Master dissertation submitted and UGC-NET qualified"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Publishing Campus Drives",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend dissertation before external literary scholars.",
              "Secure editorial or corporate communications placement."
            ],
            "milestone": "Conferred Master of Arts in English degree"
          }
        ]
      },
      "completed": {
        "degree_id": "ma-english",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Editorial Portfolio & Research Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile published book reviews, long-form essays, and academic dissertation chapters.",
              "Review interview fundamentals in editorial style guides, copyediting symbols, and publishing workflows."
            ],
            "milestone": "Professional editorial and writing portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Publishing & Media Corporate Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Commissioning Editor and Corporate Communications Specialist positions.",
              "Demonstrate editorial judgment, manuscript evaluation, and crisis messaging in interviews."
            ],
            "milestone": "Offer letter received for editorial or communications role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Editorial Leadership & Authorship",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead book acquisitions across major literary imprints or become university assistant professor.",
              "Publish original critical research or literary monograph."
            ],
            "milestone": "Promoted to Senior Editor or Assistant Professor"
          }
        ]
      }
    }
  },
  {
    "degree_id": "ma-economics",
    "id": "ma-economics",
    "familyId": "arts_humanities",
    "name": "Master of Arts in Economics",
    "shortName": "M.A. Economics",
    "aliases": [
      "MA Economics",
      "Master of Arts in Economics",
      "M.Sc Economics",
      "ma-economics"
    ],
    "level": "PG",
    "discipline": "Arts, Humanities & Social Sciences",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "A premier 2-year mathematically rigorous postgraduate degree in theoretical and applied economics. Covering advanced microeconomic foundations, dynamic macroeconomic modeling, advanced econometrics, public finance, and development policy, it prepares graduates for central banking, economic policy think tanks, quantitative financial risk management, and doctoral research.",
    "key_skills": [
      "Advanced Microeconomic Theory & Game-Theoretic Mechanism Design",
      "Dynamic Stochastic General Equilibrium (DSGE) Macroeconomic Modeling",
      "Advanced Econometric Time-Series & Panel Data Analysis (Stata, R, Python)",
      "Causal Inference & Quasi-Experimental Impact Evaluation (Diff-in-Diff, RDD, IV)",
      "Public Policy Cost-Benefit Analysis & Fiscal Expenditure Review",
      "Financial Risk Modeling, Yield Curve Forecasting & Econometric Forecasting"
    ],
    "subjects_taught": [
      "Advanced Microeconomic Theory & General Equilibrium",
      "Advanced Macroeconomic Analysis & Monetary Economics",
      "Econometric Methods & Applied Econometrics",
      "Mathematical Methods in Economics & Optimization",
      "Public Economics & Fiscal Policy",
      "International Trade & Finance",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Central Banks & Financial Regulators (RBI, SEBI, Ministry of Finance)",
      "Global Investment Banks (Goldman Sachs, J.P. Morgan, Morgan Stanley)",
      "Economic Research Think Tanks (NIPFP, NCAER, ICRIER, CPR)",
      "International Multilateral Organizations (World Bank, IMF, ADB)",
      "Specialized Analytics Consultancies (Mu Sigma, Fractal, McKinsey Analytics)"
    ],
    "specializations": [
      {
        "id": "ma-econ-econometrics",
        "name": "Applied Econometrics & Quantitative Policy",
        "aliases": [
          "Quantitative Track"
        ],
        "skillsGained": [
          "Stata",
          "Causal Inference",
          "Time Series"
        ],
        "typicalRoles": [
          "Econometrician",
          "Data Scientist"
        ]
      },
      {
        "id": "ma-econ-finance",
        "name": "Financial Economics & Macroeconomic Policy",
        "aliases": [
          "Financial Economics"
        ],
        "skillsGained": [
          "DSGE",
          "Yield Curve",
          "Macro Forecasting"
        ],
        "typicalRoles": [
          "Macroeconomic Strategist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "ma-ec-c1",
        "degree_id": "ma-economics",
        "role_title": "Macroeconomic Strategist / Quantitative Research Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Advanced econometric modeling and time-series forecasting training maps directly into fixed income, currency, and macro research at investment banks.",
        "indicative_salary": {
          "min": 8.5,
          "max": 17.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Investment Banking Economics Salary Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Time Series",
          "R/Python",
          "Macro Forecasting",
          "Econometrics"
        ],
        "top_employers": [
          "Goldman Sachs",
          "J.P. Morgan",
          "Nomura",
          "Crisil"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-ec-c2",
        "degree_id": "ma-economics",
        "role_title": "Public Policy Impact Evaluation Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level mastery of difference-in-differences and randomized control trial (RCT) econometric evaluation qualifies you to lead developmental policy research.",
        "indicative_salary": {
          "min": 7.5,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Policy Think Tank Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Causal Inference",
          "Stata",
          "Policy Design",
          "Cost-Benefit Analysis"
        ],
        "top_employers": [
          "J-PAL South Asia",
          "NIPFP",
          "World Bank India",
          "NITI Aayog"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-ec-c3",
        "degree_id": "ma-economics",
        "role_title": "Chief Economist / Head of Global Research",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Guiding monetary policy interpretation, sovereign bond market predictions, and macroeconomic projections requires decades of elite economic expertise.",
        "indicative_salary": {
          "min": 35.0,
          "max": 85.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Executive Economist Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Macro Strategy",
          "Sovereign Debt Analysis",
          "Central Bank Advisory"
        ],
        "top_employers": [
          "Tier-1 Global Investment Banks",
          "Multilateral Financial Bodies"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "ma-ec-hs1",
        "degree_id": "ma-economics",
        "program_name": "Ph.D. in Economics",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET (JRF)",
          "Direct Entrance Exam (ISI, DSE, IGIDR)"
        ],
        "eligibility_rule": "Master's degree in Economics / Mathematics / Statistics with minimum 55% marks.",
        "typical_duration": "4 to 5 Years",
        "top_institutes": [
          "Delhi School of Economics",
          "Indian Statistical Institute (ISI Delhi)",
          "IGIDR Mumbai",
          "JNU New Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-ec-hs2",
        "degree_id": "ma-economics",
        "program_name": "Master of Science in Financial Engineering / Quantitative Finance",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "CAT",
          "GMAT"
        ],
        "eligibility_rule": "Master degree in Economics, Mathematics, or Engineering with strong quantitative calculus background.",
        "typical_duration": "1 to 2 Years",
        "top_institutes": [
          "Worldquant University",
          "IIM Bangalore",
          "Foreign Universities"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "ma-ec-ct1",
        "degree_id": "ma-economics",
        "cert_name": "Financial Risk Manager (FRM)",
        "provider": "Global Association of Risk Professionals (GARP)",
        "domain": "Financial Risk Management",
        "level": "Advanced",
        "prerequisites": [
          "Strong quantitative and econometric background"
        ],
        "official_url": "https://www.garp.org/frm",
        "sourceUrl": "https://www.garp.org/frm",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-ec-ct2",
        "degree_id": "ma-economics",
        "cert_name": "Data Analysis for Public Policy MicroMasters",
        "provider": "MITx / edX",
        "domain": "Econometric Causal Inference & Randomized Trials",
        "level": "Intermediate",
        "prerequisites": [
          "Undergraduate mathematics and microeconomics"
        ],
        "official_url": "https://www.edx.org/micromasters/mitx-data-economics-and-development-policy",
        "sourceUrl": "https://www.edx.org/micromasters/mitx-data-economics-and-development-policy",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-ec-ct3",
        "degree_id": "ma-economics",
        "cert_name": "Certified Stata & R Econometric Specialist",
        "provider": "Timberlake Analytics",
        "domain": "Statistical Programming & Time Series",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of multiple regression and panel data"
        ],
        "official_url": "https://www.timberlake.co.uk",
        "sourceUrl": "https://www.timberlake.co.uk",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "ma-ec-gv1",
        "degree_id": "ma-economics",
        "exam_or_post_name": "Indian Economic Service (IES) Examination",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Economics",
          "allowedDegrees": [
            "Post-graduate degree in Economics / Applied Economics / Business Economics / Econometrics"
          ],
          "mandatorySubjects": [
            "General Economics I, II, III and Indian Economics"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Elite Group A Central Civil Service providing economic advice to the Government of India across all ministries."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-ec-gv2",
        "degree_id": "ma-economics",
        "exam_or_post_name": "Reserve Bank of India (RBI) Grade 'B' - DEPR (Department of Economic and Policy Research)",
        "conducting_body": "Reserve Bank of India Services Board",
        "eligibility_rule": {
          "degreeFamily": "Economics",
          "allowedDegrees": [
            "Master's Degree in Economics / Econometrics / Quantitative Economics"
          ],
          "mandatorySubjects": [
            "Economics / Econometrics"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Specialist research cadre directly assisting the Monetary Policy Committee (MPC) in inflation targeting."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://opportunities.rbi.org.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "ma-ec-sw1",
        "degree_id": "ma-economics",
        "target_role": "Antitrust & Competition Economics Litigation Consultant",
        "pivot_reason": "Apply microeconomic industrial organization theory, market concentration metrics (HHI), and econometric demand elasticity to advise corporations in antitrust lawsuits.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Industrial Organization & Market Power Economics (CCI Frameworks)",
            "type": "course",
            "detail": "Master relevant market definition, predatory pricing tests, and merger review simulations.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Econometric Demand Estimation & Merger Simulation (Stata / Python)",
            "type": "course",
            "detail": "Estimate nested logit models, price-cost margins, and upward pricing pressure (UPP) indices.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Competition Commission of India (CCI) Merger Filing Capstone",
            "type": "portfolio",
            "detail": "Deliver economic expert report evaluating competitive harm for a multi-crore telecom merger.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Competition Economics Certificate",
          "Applied Econometrics Specialist"
        ],
        "why_feasible": "Economists possess the exact formal industrial organization models demanded by antitrust courts and regulators.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "ma-ec-ent1",
        "degree_id": "ma-economics",
        "idea_title": "Independent Economic & Policy Research Advisory Firm",
        "description": "Found a specialized economic consultancy delivering econometric impact evaluations, regulatory tariff design, and macroeconomic forecasting models for governments and industry bodies.",
        "first_milestones": [
          "Deliver sovereign credit and inflation impact assessment model for regional chamber of commerce.",
          "Win contract for third-party randomized control trial (RCT) evaluation of a state welfare scheme.",
          "Establish subscription macroeconomic quarterly research report for institutional investors."
        ],
        "relevant_schemes": [
          {
            "name": "NITI Aayog Aspirational Districts Research Fellowship",
            "agency": "NITI Aayog",
            "benefits": "Project grants and empanelment for policy impact assessments.",
            "sourceUrl": "https://www.niti.gov.in"
          },
          {
            "name": "Startup India Professional Services Scheme",
            "agency": "DPIIT",
            "benefits": "Tax benefits and incubation support for analytical startups.",
            "sourceUrl": "https://www.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "ma-economics",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Micro, Macro & Econometric Modeling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master dynamic programming, game-theoretic mechanism design, and time-series econometrics.",
              "Prepare for Indian Economic Service (IES) and RBI DEPR specialist examinations."
            ],
            "milestone": "Distinction in analytical coursework and IES syllabus completion"
          },
          {
            "stepNumber": 2,
            "title": "Empirical Dissertation & Research Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct quantitative dissertation testing econometric hypotheses on macroeconomic or household survey data.",
              "Complete summer research internship at RBI, NIPFP, or premier investment bank."
            ],
            "milestone": "Completed empirical dissertation and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Economic Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend dissertation with robust econometric robustness tests.",
              "Join leading investment bank, economic think tank, or international organization."
            ],
            "milestone": "Awarded Master of Arts in Economics degree"
          }
        ]
      },
      "completed": {
        "degree_id": "ma-economics",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Econometric Portfolio & Code Repository Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile annotated Stata do-files, R Markdown reports, and policy impact briefs.",
              "Review interview fundamentals in causal inference, monetary policy transmission, and econometrics."
            ],
            "milestone": "Professional econometric research portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Financial & Policy Campus Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Quantitative Research Analyst and Policy Specialist positions.",
              "Demonstrate econometric regression interpretation and macroeconomic forecasting in interviews."
            ],
            "milestone": "Offer letter secured for economist position"
          },
          {
            "stepNumber": 3,
            "title": "Senior Economic Authority Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead regional macroeconomic forecasting desks or advise central government ministries.",
              "Pursue Ph.D. at premier global institution or attain senior economist rank."
            ],
            "milestone": "Promoted to Senior Economist"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mlib",
    "id": "mlib",
    "familyId": "arts_humanities",
    "name": "Master of Library & Information Science",
    "shortName": "M.Lib.",
    "aliases": [
      "M.Lib",
      "M.Lib.I.Sc",
      "MLIS",
      "Master of Library Science",
      "mlib"
    ],
    "level": "PG",
    "discipline": "Arts, Humanities & Social Sciences",
    "duration": "1 to 2 Years (Integrated / Direct)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "A specialized professional postgraduate degree in modern information management, digital libraries, metadata architecture, knowledge organization, and archival curation. It equips information professionals to manage university libraries, digital repositories (DSpace, Koha), corporate knowledge management systems, and research documentation databases.",
    "key_skills": [
      "Digital Library Architecture & Open Source Repository Management (DSpace, EPrints)",
      "Automated Integrated Library Management Systems (Koha, LibSys)",
      "Metadata Standards & Ontologies (Dublin Core, MARC 21, RDA, Bibframe)",
      "Classification & Indexing Systems (Dewey Decimal / UDC / Colon Classification)",
      "Bibliometrics, Scientometrics & Research Impact Analysis (Scopus, Web of Science)",
      "Digital Archiving, Preservation & Electronic Resource Licensing"
    ],
    "subjects_taught": [
      "Information Sources, Systems and Services",
      "Information Processing and Retrieval (Classification & Cataloguing)",
      "Digital Libraries and Information Technology Application",
      "Research Methodology & Scientometrics",
      "Knowledge Management & Information Architecture",
      "Preservation and Conservation of Information Resources",
      "Master Research Project / Internship"
    ],
    "typical_employers": [
      "Central & State Universities (Delhi University, JNU, BHU)",
      "National Premier Institutes (IITs, IIMs, IISc, AIIMS Libraries)",
      "Research Laboratories (CSIR, DRDO, ISRO Information Centers)",
      "Corporate Law & Management Libraries",
      "National Archives and Public Library Systems"
    ],
    "specializations": [
      {
        "id": "mlib-digital",
        "name": "Digital Repositories & Knowledge Systems",
        "aliases": [
          "Digital Libraries Track"
        ],
        "skillsGained": [
          "DSpace",
          "Koha",
          "Metadata"
        ],
        "typicalRoles": [
          "Digital Library Architect"
        ]
      },
      {
        "id": "mlib-scientometrics",
        "name": "Scientometrics & Research Analytics",
        "aliases": [
          "Research Impact Track"
        ],
        "skillsGained": [
          "Bibliometrics",
          "h-index",
          "Scopus"
        ],
        "typicalRoles": [
          "Bibliometric Analyst"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mlib-c1",
        "degree_id": "mlib",
        "role_title": "Assistant Librarian / Information Scientist",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Master-level proficiency in automated cataloging (MARC 21), Koha ILS deployment, and digital repository setup qualifies you for UGC assistant librarian cadres.",
        "indicative_salary": {
          "min": 6.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "UGC Pay Matrix 7th CPC (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Koha",
          "DSpace",
          "MARC 21",
          "E-Resources"
        ],
        "top_employers": [
          "IIT Delhi Library",
          "JNU Central Library",
          "IIM Ahmedabad",
          "CSIR Information Center"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mlib-c2",
        "degree_id": "mlib",
        "role_title": "Corporate Knowledge Manager / Research Documentalist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth taxonomical indexing, digital rights management, and enterprise search curation directly fulfill corporate knowledge repository management roles.",
        "indicative_salary": {
          "min": 5.5,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Corporate Knowledge Management Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Taxonomy Design",
          "SharePoint",
          "Knowledge Management",
          "Metadata"
        ],
        "top_employers": [
          "McKinsey Knowledge Center",
          "Deloitte Research",
          "Khaitan & Co Legal Library"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mlib-c3",
        "degree_id": "mlib",
        "role_title": "University Librarian / Director of Information Services",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Directing multi-crore digital e-consortium licenses and university-wide digital archive networks requires senior postgraduate library science leadership.",
        "indicative_salary": {
          "min": 18.0,
          "max": 38.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Central Government Academic Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "E-Consortium Negotiations",
          "Library Automation",
          "Digital Archiving"
        ],
        "top_employers": [
          "Central Universities",
          "National Research Centers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mlib-hs1",
        "degree_id": "mlib",
        "program_name": "Ph.D. in Library and Information Science",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET (JRF)",
          "University Research Entrance"
        ],
        "eligibility_rule": "Master of Library and Information Science (M.Lib.I.Sc) with minimum 55% marks.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "Delhi University",
          "DRTC / ISI Bangalore",
          "Banaras Hindu University",
          "Jadavpur University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mlib-hs2",
        "degree_id": "mlib",
        "program_name": "Associateship in Information Science (AIS) / Digital Archiving Certification",
        "level": "Executive",
        "entrance_exams": [
          "National Archives Selection"
        ],
        "eligibility_rule": "Master degree in Library Science with working experience in archives.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "Documentation Research and Training Centre (DRTC)",
          "National Archives of India"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mlib-ct1",
        "degree_id": "mlib",
        "cert_name": "Certified Koha Library Automation Administrator",
        "provider": "Infonet / Open Source Foundation",
        "domain": "Open Source Library Management",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of Linux command line and library cataloging"
        ],
        "official_url": "https://koha-community.org",
        "sourceUrl": "https://koha-community.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mlib-ct2",
        "degree_id": "mlib",
        "cert_name": "DSpace Digital Repository Implementation Specialist",
        "provider": "DuraSpace / Lyrasis",
        "domain": "Institutional Repositories & Open Access",
        "level": "Intermediate",
        "prerequisites": [
          "Familiarity with digital archiving and metadata protocols"
        ],
        "official_url": "https://dspace.lyrasis.org",
        "sourceUrl": "https://dspace.lyrasis.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mlib-ct3",
        "degree_id": "mlib",
        "cert_name": "Research Impact & Bibliometrics Certification",
        "provider": "Clarivate / Web of Science",
        "domain": "Citation Analysis & Research Metrics",
        "level": "Intermediate",
        "prerequisites": [
          "Understanding of academic indexing and citation metrics"
        ],
        "official_url": "https://clarivate.com",
        "sourceUrl": "https://clarivate.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mlib-gv1",
        "degree_id": "mlib",
        "exam_or_post_name": "UGC-NET Library & Information Science for Assistant Librarian & JRF",
        "conducting_body": "National Testing Agency (NTA)",
        "eligibility_rule": {
          "degreeFamily": "Library Science",
          "allowedDegrees": [
            "M.Lib.I.Sc",
            "MLIS"
          ],
          "mandatorySubjects": [
            "Library and Information Science"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Mandatory qualification for Assistant Librarian recruitment across all Indian central and state universities."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mlib-gv2",
        "degree_id": "mlib",
        "exam_or_post_name": "Kendriya Vidyalaya Sangathan (KVS) / NVS Librarian Recruitment",
        "conducting_body": "KVS / NVS",
        "eligibility_rule": {
          "degreeFamily": "Library Science",
          "allowedDegrees": [
            "M.Lib",
            "B.Lib"
          ],
          "mandatorySubjects": [
            "Library Science"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Permanent central government librarian positions in national school networks."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://kvsangathan.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mlib-sw1",
        "degree_id": "mlib",
        "target_role": "Enterprise Taxonomy & Ontological Knowledge Graph Architect",
        "pivot_reason": "Pivot your formal classification (DDC/UDC) and metadata skills into structuring enterprise ontologies, e-commerce product catalogs, and semantic web search.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Semantic Web Standards & RDF / OWL Ontologies (Prot\u00e9g\u00e9)",
            "type": "course",
            "detail": "Build domain ontologies, define URI namespaces, and validate SPARQL semantic queries.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Enterprise Knowledge Graph Construction (Neo4j / Graph Databases)",
            "type": "course",
            "detail": "Model entities, relationships, and taxonomical hierarchies in property graph databases.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "E-Commerce Faceted Search Taxonomy & Catalog Hierarchy Capstone",
            "type": "portfolio",
            "detail": "Deliver full enterprise product taxonomy and search schema for 50,000 retail SKUs.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Knowledge Graph Professional",
          "Semantic Web Architecture Certificate"
        ],
        "why_feasible": "Library scientists understand indexing hierarchies and faceted classification better than general software engineers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mlib-ent1",
        "degree_id": "mlib",
        "idea_title": "Turnkey Digital Archiving & Institutional Repository Consultancy",
        "description": "Found an information technology firm providing end-to-end digitisation, OCR scanning, and cloud-hosted DSpace repository setup for heritage colleges and research bodies.",
        "first_milestones": [
          "Acquire high-speed planetary book scanners and OCR document processing pipeline.",
          "Digitize 100,000 historical manuscripts for a regional university library.",
          "Deploy automated Koha cloud installation for 10 private colleges on annual subscription."
        ],
        "relevant_schemes": [
          {
            "name": "National Mission on Libraries (NML) Modernization Scheme",
            "agency": "Ministry of Culture",
            "benefits": "Financial assistance for library automation and digitization projects.",
            "sourceUrl": "https://www.nmlindia.nic.in"
          },
          {
            "name": "Startup India MSME Support",
            "agency": "Ministry of MSME",
            "benefits": "Collateral-free machinery purchase loans under CGTMSE.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mlib",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Classification & Digital Information Systems",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master MARC 21, DDC 23rd edition, and open-source Koha / DSpace server configuration.",
              "Begin preparation for UGC-NET Library & Information Science examination."
            ],
            "milestone": "High first-year academic score and server deployment proficiency"
          },
          {
            "stepNumber": 2,
            "title": "Master Project & University Library Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Implement functional institutional repository with live metadata harvesting (OAI-PMH).",
              "Complete practical internship at premier IIT/central university library."
            ],
            "milestone": "Submitted master project and qualified UGC-NET"
          },
          {
            "stepNumber": 3,
            "title": "Degree Award & Library Cadre Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master dissertation before external board of information scientists.",
              "Secure appointment as College Librarian or Corporate Information Manager."
            ],
            "milestone": "Conferred Master of Library & Information Science degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mlib",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Technical Library Dossier & Automation Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile Koha configuration scripts, DSpace repository URLs, and scientometric citation reports.",
              "Review interview fundamentals in library budget allocation, copyright fair use, and e-consortia."
            ],
            "milestone": "Professional library scientist dossier"
          },
          {
            "stepNumber": 2,
            "title": "Academic & Research Institute Hiring Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Assistant Librarian and Scientific Information Officer positions.",
              "Demonstrate database search strategies, Koha administration, and cataloging in interviews."
            ],
            "milestone": "Offer letter received for assistant librarian role"
          },
          {
            "stepNumber": 3,
            "title": "University Library Leadership Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Oversee campus-wide RFID automation and e-journal subscription consortia.",
              "Pursue Ph.D. or attain Deputy Librarian / University Librarian status."
            ],
            "milestone": "Promoted to Senior Information Scientist"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mpharm",
    "id": "mpharm",
    "familyId": "health_sciences",
    "name": "Master of Pharmacy",
    "shortName": "M.Pharm",
    "aliases": [
      "M.Pharm.",
      "MPharm",
      "Master of Pharmacy",
      "mpharm"
    ],
    "level": "PG",
    "discipline": "Medicine & Health Sciences",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "PCI",
    "overview": "An advanced 2-year pharmaceutical sciences postgraduate program regulated by the Pharmacy Council of India (PCI). Offered in specializations including Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, and Regulatory Affairs, it trains graduates in novel drug delivery systems (NDDS), pre-clinical pharmacokinetics, analytical validation (HPLC/LC-MS), and global regulatory dossier submissions (US FDA / EMA / CDSCO).",
    "key_skills": [
      "Novel Drug Delivery Systems (NDDS) & Nanoparticle Formulation Formulation",
      "Analytical Method Development & Validation (HPLC, LC-MS/MS, GC-MS)",
      "Preclinical Pharmacokinetics (DMPK) & Toxicological Animal Bioassays",
      "Regulatory Dossier Compilation (eCTD format, US FDA Module 3, ICH Guidelines)",
      "Quality by Design (QbD) & Process Analytical Technology (PAT) in Pharma",
      "cGMP Cleanroom Validation & Lyophilization Cycle Development"
    ],
    "subjects_taught": [
      "Modern Pharmaceutical Analytical Techniques",
      "Advanced Biopharmaceutics & Pharmacokinetics",
      "Drug Delivery Technologies & Nanotechnology",
      "Preclinical Safety Screening & Molecular Pharmacology",
      "Regulatory Affairs & cGMP Quality Assurance",
      "Research Methodology and Biostatistics",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Global Pharmaceutical MNCs (Sun Pharma, Cipla, Dr. Reddy's, Lupin)",
      "Contract Research & Manufacturing Services (Syngene, GVK BIO / Aragen, Jubilant)",
      "Global Regulatory & Pharmacovigilance Hubs (Novartis, Pfizer India, IQVIA)",
      "National Regulatory Agencies (CDSCO, IPC)",
      "Pharmacy Colleges & Research Universities"
    ],
    "specializations": [
      {
        "id": "mpharm-ceutics",
        "name": "Pharmaceutics & Formulation Development",
        "aliases": [
          "M.Pharm Pharmaceutics"
        ],
        "skillsGained": [
          "NDDS",
          "Solubility Enhancement",
          "QbD"
        ],
        "typicalRoles": [
          "Formulation Scientist (F&D)"
        ]
      },
      {
        "id": "mpharm-cology",
        "name": "Pharmacology & Toxicological Screening",
        "aliases": [
          "M.Pharm Pharmacology"
        ],
        "skillsGained": [
          "Animal Models",
          "DMPK",
          "Bioassays"
        ],
        "typicalRoles": [
          "Preclinical Research Scientist"
        ]
      }
    ],
    "sourceUrl": "https://www.pci.nic.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mph-c1",
        "degree_id": "mpharm",
        "role_title": "Formulation & Development (F&D) Scientist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level coursework in biopharmaceutics, lipid nanoparticles, and QbD formulation directly qualifies you for formulation research in top pharmaceutical companies.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Pharma R&D Salary Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "F&D",
          "NDDS",
          "HPLC",
          "Solubility Enhancement"
        ],
        "top_employers": [
          "Sun Pharma",
          "Cipla",
          "Dr. Reddy's",
          "Lupin"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mph-c2",
        "degree_id": "mpharm",
        "role_title": "Global Regulatory Affairs & eCTD Dossier Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth knowledge of ICH guidelines, US FDA 21 CFR regulations, and eCTD submission format maps directly into international regulatory filings.",
        "indicative_salary": {
          "min": 6.8,
          "max": 13.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Regulatory Affairs Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "eCTD",
          "ICH Guidelines",
          "US FDA Module 3",
          "Regulatory Filings"
        ],
        "top_employers": [
          "Novartis India",
          "Pfizer Global Hub",
          "Mylan / Viatris",
          "Teva Pharma"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mph-c3",
        "degree_id": "mpharm",
        "role_title": "VP Pharmaceutical R&D / Global Head of Regulatory Operations",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading global formulation pipelines, Abbreviated New Drug Application (ANDA) approvals, and pre-clinical trials demands postgraduate pharmacy mastery.",
        "indicative_salary": {
          "min": 26.0,
          "max": 58.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Pharma Executive Pay Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ANDA Filings",
          "Global R&D Strategy",
          "FDA Audit Defense"
        ],
        "top_employers": [
          "Tier-1 Pharmaceutical Conglomerates",
          "Global Generic Giants"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mph-hs1",
        "degree_id": "mpharm",
        "program_name": "Ph.D. in Pharmaceutical Sciences",
        "level": "Doctoral",
        "entrance_exams": [
          "GPAT",
          "NIPER Ph.D. Entrance",
          "CSIR-NET / JRF",
          "Direct University Interview"
        ],
        "eligibility_rule": "Master of Pharmacy (M.Pharm) with minimum 60% marks or equivalent CGPA from a PCI-recognized institution.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "NIPER SAS Nagar (Mohali)",
          "NIPER Hyderabad",
          "ICT Mumbai",
          "BITS Pilani",
          "Jamia Hamdard"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mph-hs2",
        "degree_id": "mpharm",
        "program_name": "Post Graduate Certificate in Pharmacovigilance & Drug Safety",
        "level": "Executive",
        "entrance_exams": [
          "Industry Selection"
        ],
        "eligibility_rule": "M.Pharm or B.Pharm with basic understanding of adverse drug reaction reporting.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "Indian Pharmacopoeia Commission (IPC)",
          "Academy of Clinical Excellence"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mph-ct1",
        "degree_id": "mpharm",
        "cert_name": "RAC (Regulatory Affairs Certification - Global)",
        "provider": "Regulatory Affairs Professionals Society (RAPS)",
        "domain": "Global Pharmaceutical Regulatory Affairs",
        "level": "Advanced",
        "prerequisites": [
          "Master degree in pharmacy or life sciences with regulatory experience"
        ],
        "official_url": "https://www.raps.org",
        "sourceUrl": "https://www.raps.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mph-ct2",
        "degree_id": "mpharm",
        "cert_name": "Certified Quality by Design (QbD) in Formulation Development",
        "provider": "ISPE (International Society for Pharmaceutical Engineering)",
        "domain": "Pharmaceutical QbD & Process Validation",
        "level": "Intermediate",
        "prerequisites": [
          "Experience in formulation R&D or analytical development"
        ],
        "official_url": "https://ispe.org",
        "sourceUrl": "https://ispe.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mph-ct3",
        "degree_id": "mpharm",
        "cert_name": "Certified Pharmacovigilance Professional (CPVP)",
        "provider": "DIA (Drug Information Association)",
        "domain": "Drug Safety & Signal Detection",
        "level": "Intermediate",
        "prerequisites": [
          "Pharmacy or medical degree with pharmacology background"
        ],
        "official_url": "https://www.diaglobal.org",
        "sourceUrl": "https://www.diaglobal.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mph-gv1",
        "degree_id": "mpharm",
        "exam_or_post_name": "Drug Inspector / Assistant Drugs Controller",
        "conducting_body": "UPSC / State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Pharmacy",
          "allowedDegrees": [
            "M.Pharm",
            "B.Pharm"
          ],
          "mandatorySubjects": [
            "Pharmacy / Pharmaceutical Sciences"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Statutory regulatory inspection authority inspecting drug manufacturing facilities and enforcing Drugs & Cosmetics Act 1940."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mph-gv2",
        "degree_id": "mpharm",
        "exam_or_post_name": "Scientist / Junior Scientific Officer (JSO)",
        "conducting_body": "Indian Pharmacopoeia Commission (IPC) / CDSCO",
        "eligibility_rule": {
          "degreeFamily": "Pharmacy",
          "allowedDegrees": [
            "M.Pharm in Pharmaceutics / Analysis / Pharmacology"
          ],
          "mandatorySubjects": [
            "Pharmaceutical Sciences"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government scientific roles framing national pharmacopoeial standards and Pharmacovigilance Programme of India (PvPI)."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ipc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mph-sw1",
        "degree_id": "mpharm",
        "target_role": "Artificial Intelligence & Computational Drug Discovery Scientist",
        "pivot_reason": "Bridge your pharmacological receptor binding and chemical structure-activity knowledge into AI-driven molecular property prediction and virtual screening.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Cheminformatics & Molecular Docking in Python (RDKit / AutoDock)",
            "type": "course",
            "detail": "Represent chemical structures as SMILES, compute Morgan fingerprints, and dock ligands into target enzymes.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Machine Learning for ADMET & Quantitative Structure-Activity (QSAR)",
            "type": "course",
            "detail": "Train random forest and graph neural networks to predict blood-brain barrier permeability and toxicity.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "End-to-End De Novo Small Molecule Hit Identification Capstone",
            "type": "portfolio",
            "detail": "Deliver validated virtual hit series against a kinase cancer target with calculated binding free energies.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Cheminformatics Specialist",
          "Computational Drug Discovery Certificate"
        ],
        "why_feasible": "M.Pharm postgraduates understand pharmacokinetics and chemical toxicity nuances that computational scientists overlook.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mph-ent1",
        "degree_id": "mpharm",
        "idea_title": "Specialized Contract Analytical Testing & Stability Testing Laboratory",
        "description": "Found an accredited analytical testing lab providing stability study storage (ICH zones), HPLC impurity profiling, and dissolution method development for generic pharma exporters.",
        "first_milestones": [
          "Set up cGMP-compliant testing facility with validated stability chambers and UHPLC systems.",
          "Achieve ISO 17025 accreditation and state drug licensing authority approval.",
          "Secure ongoing stability study contracts with 10 generic formulation manufacturers."
        ],
        "relevant_schemes": [
          {
            "name": "Pharmaceutical Technology Upgradation Assistance Scheme (PTUAS)",
            "agency": "Department of Pharmaceuticals",
            "benefits": "Capital subsidy up to 20% on plant modernization to achieve WHO-GMP standards.",
            "sourceUrl": "https://pharmaceuticals.gov.in"
          },
          {
            "name": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
            "agency": "Ministry of MSME",
            "benefits": "Collateral-free loans up to 2 Crore for lab equipment purchase.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mpharm",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Analytical Instrumentation & Formulation Studies",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master HPLC method development, dissolution kinetics, and novel drug delivery mechanisms.",
              "Select master dissertation topic in modified-release tablets, liposomes, or targeted drug delivery."
            ],
            "milestone": "Approved research protocol and distinction in first-year theory"
          },
          {
            "stepNumber": 2,
            "title": "Dissertation Experimental Work & GPAT/NIPER Prep",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Formulate and analytically characterize experimental drug batches across multiple stress conditions.",
              "Publish research findings in peer-reviewed pharmaceutical journals (Elsevier / Springer)."
            ],
            "milestone": "Master dissertation completed and paper accepted"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Pharma R&D Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend dissertation before external board of pharmaceutical examiners.",
              "Join top pharmaceutical R&D center as Formulation Scientist or Regulatory Associate."
            ],
            "milestone": "Awarded Master of Pharmacy degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mpharm",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "R&D Dossier & Analytical Method Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile HPLC chromatograms, dissolution profile charts, and stability testing reports.",
              "Review ICH quality guidelines (Q1A to Q14) and FDA 21 CFR Part 210/211 cGMP regulations."
            ],
            "milestone": "Professional pharmaceutical research dossier"
          },
          {
            "stepNumber": 2,
            "title": "Pharma Campus & Corporate Off-Campus Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Formulation & Development and Global Regulatory Affairs openings.",
              "Demonstrate formulation problem-solving, excipient compatibility, and dissolution troubleshooting in interviews."
            ],
            "milestone": "Offer letter received for formulation scientist role"
          },
          {
            "stepNumber": 3,
            "title": "Senior Pharmaceutical Scientist Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead generic drug dossier submissions for US FDA / EMA approvals.",
              "Pursue Ph.D. at premier NIPER or corporate leadership track in global regulatory affairs."
            ],
            "milestone": "Promoted to Senior Formulation Scientist"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mds",
    "id": "mds",
    "familyId": "health_sciences",
    "name": "Master of Dental Surgery",
    "shortName": "MDS",
    "aliases": [
      "Master of Dental Surgery",
      "M.D.S.",
      "MDS specialist",
      "mds"
    ],
    "level": "PG",
    "discipline": "Medicine & Health Sciences",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "DCI",
    "overview": "A premier 3-year clinical surgical postgraduate degree governed by the Dental Council of India (DCI). Offered in specialties such as Orthodontics & Dentofacial Orthopedics, Oral & Maxillofacial Surgery, Conservative Dentistry & Endodontics, and Periodontology, it prepares dental specialists for advanced surgical operations, tertiary craniofacial care, and clinical academic appointments.",
    "key_skills": [
      "Advanced Maxillofacial Trauma Surgery & Craniofacial Reconstruction",
      "Surgical Endodontic Microsurgery & Microscopic Root Canal Therapy",
      "Fixed Orthodontic Mechanics & Clear Aligner Digital Treatment Planning",
      "Complex Implantology, Sinus Lifts & Bone Graft Augmentation Procedures",
      "Periodontal Plastic Microsurgery & Guided Tissue Regeneration (GTR)",
      "Clinical Photography, CBCT 3D Radiographic Interpretation & Virtual Surgical Planning"
    ],
    "subjects_taught": [
      "Applied Basic Sciences (Anatomy, Physiology, Pathology, Pharmacology)",
      "Specialty Clinical Theory and Surgical Principles",
      "Advanced Operative Techniques & Surgical Hands-On Rotations",
      "Cone Beam Computed Tomography (CBCT) & Diagnostic Imaging",
      "Interdisciplinary Treatment Planning & Implantology",
      "Research Methodology, Biostatistics & Master Dissertation",
      "Hospital Maxillofacial Trauma Emergency Rotations"
    ],
    "typical_employers": [
      "Tertiary Dental Hospitals & Multi-Specialty Hospitals (Apollo, Fortis, Manipal)",
      "Specialized Private Dental Clinics & Multi-Branch Dental Chains (Clove Dental)",
      "Government Medical & Dental Colleges",
      "Armed Forces Medical Services (Army Dental Corps)",
      "International Dental Implant & Aligners Corporates"
    ],
    "specializations": [
      {
        "id": "mds-ortho",
        "name": "Orthodontics & Dentofacial Orthopedics",
        "aliases": [
          "MDS Orthodontics"
        ],
        "skillsGained": [
          "Aligners",
          "Cephalometrics",
          "Braces"
        ],
        "typicalRoles": [
          "Consultant Orthodontist"
        ]
      },
      {
        "id": "mds-omfs",
        "name": "Oral & Maxillofacial Surgery",
        "aliases": [
          "MDS OMFS"
        ],
        "skillsGained": [
          "Trauma Surgery",
          "Cleft Palate",
          "Implants"
        ],
        "typicalRoles": [
          "Maxillofacial Surgeon"
        ]
      }
    ],
    "sourceUrl": "https://dciindia.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mds-c1",
        "degree_id": "mds",
        "role_title": "Consultant Maxillofacial Surgeon / Endodontist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level surgical training in microscopic root canals and orthognathic surgeries qualifies you for consultant hospital attachments.",
        "indicative_salary": {
          "min": 9.0,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Healthcare Specialist Salary Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "CBCT Planning",
          "Microsurgery",
          "Implants",
          "Maxillofacial Trauma"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Clove Dental",
          "Fortis Healthcare",
          "Max Healthcare"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mds-c2",
        "degree_id": "mds",
        "role_title": "Assistant Professor in Dental Surgery",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "DCI-mandated postgraduate qualification enables direct eligibility for faculty appointments and clinical instruction in government and private dental colleges.",
        "indicative_salary": {
          "min": 8.5,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Central Government Academic Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Teaching",
          "Surgical Training",
          "Research",
          "OPD Management"
        ],
        "top_employers": [
          "Government Dental Colleges",
          "AIIMS Dental Wings",
          "State Medical Universities"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mds-c3",
        "degree_id": "mds",
        "role_title": "Director of Craniofacial Surgery / Hospital Department Chair",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading tertiary craniofacial trauma centers and comprehensive hospital dental services demands decades of specialized surgical leadership.",
        "indicative_salary": {
          "min": 30.0,
          "max": 75.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Medical Specialist Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Complex Facial Reconstruction",
          "Clinical Governance",
          "Surgical Leadership"
        ],
        "top_employers": [
          "Tertiary Healthcare Conglomerates",
          "Elite Multispecialty Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mds-hs1",
        "degree_id": "mds",
        "program_name": "Fellowship in Cleft Lip & Palate / Craniofacial Surgery",
        "level": "Executive",
        "entrance_exams": [
          "DCI Accredited Fellowship Entrance"
        ],
        "eligibility_rule": "Master of Dental Surgery in Oral & Maxillofacial Surgery from a DCI-recognized institution.",
        "typical_duration": "1 to 2 Years",
        "top_institutes": [
          "All India Institute of Medical Sciences (AIIMS)",
          "Christian Medical College (CMC Vellore)",
          "Nitte University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mds-hs2",
        "degree_id": "mds",
        "program_name": "Ph.D. in Dental Sciences / Craniofacial Research",
        "level": "Doctoral",
        "entrance_exams": [
          "University Research Entrance"
        ],
        "eligibility_rule": "Master of Dental Surgery (MDS) with minimum 55% marks.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "Manipal Academy of Higher Education",
          "King George's Medical University (KGMU Lucknow)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mds-ct1",
        "degree_id": "mds",
        "cert_name": "Fellow of International Congress of Oral Implantologists (FICOI)",
        "provider": "ICOI (International Congress of Oral Implantologists)",
        "domain": "Advanced Dental Implantology",
        "level": "Advanced",
        "prerequisites": [
          "MDS degree with documented case presentations of bone grafts and implants"
        ],
        "official_url": "https://www.icoi.org",
        "sourceUrl": "https://www.icoi.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mds-ct2",
        "degree_id": "mds",
        "cert_name": "Invisalign / Clear Aligner Certified Provider",
        "provider": "Align Technology",
        "domain": "Digital Orthodontics & Clear Aligner Therapy",
        "level": "Intermediate",
        "prerequisites": [
          "MDS in Orthodontics or dental surgeon with orthodontic training"
        ],
        "official_url": "https://www.invisalign.com",
        "sourceUrl": "https://www.invisalign.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mds-ct3",
        "degree_id": "mds",
        "cert_name": "Advanced Trauma Life Support (ATLS)",
        "provider": "American College of Surgeons / ATLS India",
        "domain": "Emergency Maxillofacial Trauma Management",
        "level": "Advanced",
        "prerequisites": [
          "Medical or dental surgical postgraduate"
        ],
        "official_url": "https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/",
        "sourceUrl": "https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mds-gv1",
        "degree_id": "mds",
        "exam_or_post_name": "Armed Forces Dental Corps (Short Service Commission Officer - Captain)",
        "conducting_body": "Ministry of Defence / Army Dental Corps",
        "eligibility_rule": {
          "degreeFamily": "Dental Surgery",
          "allowedDegrees": [
            "MDS",
            "BDS"
          ],
          "mandatorySubjects": [
            "Dental Surgery"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 35,
            "sc_st": 35
          },
          "notes": "Commissioned officer rank in the Indian Armed Forces providing dental and maxillofacial care across military hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://joinindianarmy.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mds-gv2",
        "degree_id": "mds",
        "exam_or_post_name": "UPSC / State Medical Services Dental Specialist / Medical Officer",
        "conducting_body": "UPSC / State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Dental",
          "allowedDegrees": [
            "MDS in relevant specialty"
          ],
          "mandatorySubjects": [
            "Dental Specialties"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 40,
            "obc": 43,
            "sc_st": 45
          },
          "notes": "Class I Gazetted Specialist in central/state government healthcare departments and district hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mds-sw1",
        "degree_id": "mds",
        "target_role": "Digital Dentistry & 3D Surgical Planning Specialist",
        "pivot_reason": "Leverage your 3D craniofacial anatomy and CBCT expertise to lead surgical guide manufacturing, custom titanium implant design, and virtual orthognathic planning.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Cone Beam CT Segmentation & 3D Anatomic Modeling (Mimics / 3D Slicer)",
            "type": "course",
            "detail": "Segment patient DICOM files into 3D bone models and perform automated cephalometric landmarks.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Virtual Surgical Planning & Custom Orthognathic Splint CAD/CAM",
            "type": "course",
            "detail": "Simulate Le Fort I and BSSO osteotomies and print biocompatible surgical guides.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Complex Craniofacial Reconstruction Guided Surgery Capstone",
            "type": "portfolio",
            "detail": "Deliver full virtual surgical planning report and 3D printed guides for a mandibular resection case.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Digital Dentistry Specialist",
          "Materialise Mimics Certified"
        ],
        "why_feasible": "Maxillofacial surgeons intuitively understand surgical margins and bone vascularity, making their CAD/CAM designs medically flawless.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mds-ent1",
        "degree_id": "mds",
        "idea_title": "Multi-Specialty Advanced Dental Surgery & Implant Center",
        "description": "Found an advanced surgical dental clinic equipped with operatory microscope, in-house digital CBCT scanner, and CAD/CAM chairside milling for single-visit restorations.",
        "first_milestones": [
          "Acquire commercial space, clinical radiography licenses (AERB), and state dental council clinic registration.",
          "Install dental operatory microscope and digital intraoral scanner.",
          "Establish patient referral network with 20 general dental practitioners for complex surgeries."
        ],
        "relevant_schemes": [
          {
            "name": "Pradhan Mantri Mudra Yojana (Tarun Scheme)",
            "agency": "Ministry of Finance",
            "benefits": "Term loans up to 10 Lakhs for healthcare clinic setup.",
            "sourceUrl": "https://www.mudra.org.in"
          },
          {
            "name": "CGTMSE Medical Professional Equipment Loan Scheme",
            "agency": "Ministry of MSME / Nationalized Banks",
            "benefits": "Collateral-free clinic loans up to 2 Crore for diagnostic machinery.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mds",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Surgical Principles & Preclinical Logbooks",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master anatomical dissection, osteotomy models, and intricate preclinical wire bending.",
              "Select and register master dissertation topic with state health university."
            ],
            "milestone": "Approved dissertation synopsis and high clinical case volume"
          },
          {
            "stepNumber": 2,
            "title": "Specialty Clinical Procedures & Trauma Emergency Rotations",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform documented surgical procedures (trauma plating, orthognathic, or complex endodontic treatments).",
              "Manage maxillofacial emergency night calls in tertiary hospital."
            ],
            "milestone": "Completed clinical surgical quota and master thesis submission"
          },
          {
            "stepNumber": 3,
            "title": "Final Clinical Board Exams & Specialist Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Clear university clinical practicals with external examiners.",
              "Join leading corporate hospital or establish private specialist consultancy."
            ],
            "milestone": "Conferred Master of Dental Surgery degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mds",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Surgical Portfolio & Case Documentation Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile standardized clinical photographs, pre/post CBCT radiographs, and case follow-up records.",
              "Review surgical emergency protocols, local flap designs, and medicolegal consent."
            ],
            "milestone": "Professional clinical surgical portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Hospital & Healthcare Chain Specialist Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Consultant Dental Surgeon and Assistant Professor openings.",
              "Present surgical case series and operative technique videos during hospital credentialing panels."
            ],
            "milestone": "Offer letter received for hospital consultant attachment"
          },
          {
            "stepNumber": 3,
            "title": "Chief Craniofacial Surgeon & Clinical Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead multidisciplinary facial trauma reconstruction teams.",
              "Pursue fellowship in head and neck oncology or expand private clinic to regional center of excellence."
            ],
            "milestone": "Promoted to Senior Consultant Maxillofacial Surgeon"
          }
        ]
      }
    }
  },
  {
    "degree_id": "ms-surgery",
    "id": "ms-surgery",
    "familyId": "health_sciences",
    "name": "Master of Surgery in General Surgery",
    "shortName": "M.S. General Surgery",
    "aliases": [
      "MS General Surgery",
      "M.S. Surgery",
      "Master of Surgery",
      "ms-surgery"
    ],
    "level": "PG",
    "discipline": "Medicine & Health Sciences",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "NMC",
    "overview": "A premier 3-year clinical surgical postgraduate residency regulated by the National Medical Commission (NMC). It trains MBBS doctors in advanced operative surgery, trauma resuscitation, minimally invasive laparoscopic surgery, oncology resections, critical care, and surgical emergencies. It forms the foundational credential for independent surgical practice and super-specialty surgical fellowships (M.Ch / DrNB).",
    "key_skills": [
      "Emergency Exploratory Laparotomy & Abdominal Trauma Resuscitation",
      "Basic & Advanced Laparoscopic Surgery (Laparoscopic Cholecystectomy, Appendectomy)",
      "Head & Neck, Thyroid, Breast & Gastrointestinal Cancer Resections",
      "Critical Care Management, Intensive Care Unit (ICU) Hemodynamic Monitoring",
      "Surgical Suture Techniques, Flap Reconstructions & Wound Healing Optimization",
      "Diagnostic & Therapeutic Upper and Lower Gastrointestinal Endoscopy"
    ],
    "subjects_taught": [
      "General Surgical Principles, Wound Healing & Shock Management",
      "Gastrointestinal Surgery, Hepatobiliary & Pancreatic Surgery",
      "Surgical Oncology (Breast, Thyroid, GI Tract & Skin)",
      "Trauma, Burns, Emergency Medicine & Critical Care",
      "Pediatric Surgery, Urology & Vascular Surgery Fundamentals",
      "Laparoscopy, Robotic Surgery & Endoscopy",
      "Master Research Dissertation"
    ],
    "typical_employers": [
      "Government Medical College Hospitals & District Civil Hospitals",
      "Central Premier Institutes (AIIMS, PGIMER, JIPMER)",
      "Tertiary Private Multi-Specialty Hospitals (Apollo, Max, Fortis, Narayana Health)",
      "Armed Forces Medical Services (AMC)",
      "Mission & Charitable Hospitals"
    ],
    "specializations": [
      {
        "id": "ms-laparoscopy",
        "name": "Minimal Access & Laparoscopic Surgery",
        "aliases": [
          "Laparoscopic Surgery"
        ],
        "skillsGained": [
          "Laparoscopy",
          "Endotraining"
        ],
        "typicalRoles": [
          "Laparoscopic Surgeon"
        ]
      },
      {
        "id": "ms-oncosurgery",
        "name": "Surgical Oncology & Endocrine Surgery",
        "aliases": [
          "Surgical Oncology Track"
        ],
        "skillsGained": [
          "Tumor Resection",
          "Lymphadenectomy"
        ],
        "typicalRoles": [
          "Surgical Oncologist"
        ]
      }
    ],
    "sourceUrl": "https://www.nmc.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "ms-surg-c1",
        "degree_id": "ms-surgery",
        "role_title": "Consultant General & Laparoscopic Surgeon",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Comprehensive operative residency handling emergency laparotomies and elective laparoscopic procedures directly qualifies you for independent hospital surgery.",
        "indicative_salary": {
          "min": 12.0,
          "max": 24.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Medical Specialist Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Laparoscopy",
          "Trauma Surgery",
          "Emergency Resuscitation",
          "Gastrointestinal"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Max Healthcare",
          "Fortis Healthcare",
          "Narayana Health"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ms-surg-c2",
        "degree_id": "ms-surgery",
        "role_title": "Senior Resident / Assistant Professor in General Surgery",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "NMC-mandated residency completion enables direct eligibility for Senior Residency and Assistant Professor posts in government medical colleges.",
        "indicative_salary": {
          "min": 10.5,
          "max": 20.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Central Government Academic Residency Pay (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Resident Training",
          "Clinical Teaching",
          "Operative Theater Management"
        ],
        "top_employers": [
          "AIIMS New Delhi",
          "PGIMER Chandigarh",
          "State Medical Colleges"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ms-surg-c3",
        "degree_id": "ms-surgery",
        "role_title": "Director of Surgical Services / Chief of Surgery",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing tertiary operating room suites, surgical intensive care units, and clinical governance requires decades of surgical leadership.",
        "indicative_salary": {
          "min": 35.0,
          "max": 90.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Medical Executive Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Surgical Governance",
          "Multi-Organ Transplant",
          "Clinical Leadership"
        ],
        "top_employers": [
          "Premier Tertiary Medical Centers",
          "Multi-Hospital Healthcare Groups"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "ms-surg-hs1",
        "degree_id": "ms-surgery",
        "program_name": "M.Ch / DrNB Super-Specialty (Surgical Oncology / GI Surgery / Urology / Neurosurgery / Plastic Surgery)",
        "level": "Super-Specialty",
        "entrance_exams": [
          "NEET-SS (Super Specialty)",
          "INI-SS (Institute of National Importance Super Specialty)"
        ],
        "eligibility_rule": "Master of Surgery (M.S.) in General Surgery or DNB General Surgery from an NMC-recognized institution.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "AIIMS New Delhi",
          "Tata Memorial Centre Mumbai",
          "PGIMER Chandigarh",
          "CMC Vellore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ms-surg-hs2",
        "degree_id": "ms-surgery",
        "program_name": "Fellowship in Minimal Access Surgery (FMAS / FIAGES)",
        "level": "Fellowship",
        "entrance_exams": [
          "AMASI / IAGES Selection"
        ],
        "eligibility_rule": "MS in General Surgery with interest in laparoscopic surgery.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "Association of Minimal Access Surgeons of India",
          "IAGES India"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "ms-surg-ct1",
        "degree_id": "ms-surgery",
        "cert_name": "FMAS (Fellowship in Minimal Access Surgery)",
        "provider": "Association of Minimal Access Surgeons of India (AMASI)",
        "domain": "Advanced Laparoscopic Operative Surgery",
        "level": "Advanced",
        "prerequisites": [
          "MS General Surgery with documented laparoscopic operations"
        ],
        "official_url": "https://www.amasi.org",
        "sourceUrl": "https://www.amasi.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ms-surg-ct2",
        "degree_id": "ms-surgery",
        "cert_name": "Advanced Trauma Life Support (ATLS) Instructor / Provider",
        "provider": "American College of Surgeons / ATLS India",
        "domain": "Emergency Trauma Resuscitation",
        "level": "Advanced",
        "prerequisites": [
          "Postgraduate medical doctor in surgical or emergency specialty"
        ],
        "official_url": "https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/",
        "sourceUrl": "https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ms-surg-ct3",
        "degree_id": "ms-surgery",
        "cert_name": "MRCS (Member of the Royal College of Surgeons)",
        "provider": "Royal College of Surgeons (England / Edinburgh / Glasgow)",
        "domain": "International Surgical Standards",
        "level": "Advanced",
        "prerequisites": [
          "MBBS and surgical training"
        ],
        "official_url": "https://www.rcseng.ac.uk",
        "sourceUrl": "https://www.rcseng.ac.uk",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "ms-surg-gv1",
        "degree_id": "ms-surgery",
        "exam_or_post_name": "UPSC Combined Medical Services / Specialist Medical Officer (Surgery)",
        "conducting_body": "UPSC / Ministry of Health",
        "eligibility_rule": {
          "degreeFamily": "Surgery",
          "allowedDegrees": [
            "MS General Surgery",
            "DNB General Surgery"
          ],
          "mandatorySubjects": [
            "General Surgery"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 40,
            "obc": 43,
            "sc_st": 45
          },
          "notes": "Class I Gazetted Specialist in Central Health Service (CHS) managing surgery departments in Safdarjung, RML, and CGHS hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ms-surg-gv2",
        "degree_id": "ms-surgery",
        "exam_or_post_name": "Armed Forces Medical Services (Surgeon Specialist - Major / Lt. Colonel)",
        "conducting_body": "Ministry of Defence",
        "eligibility_rule": {
          "degreeFamily": "Surgery",
          "allowedDegrees": [
            "MS General Surgery"
          ],
          "mandatorySubjects": [
            "General Surgery"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 38,
            "obc": 40,
            "sc_st": 42
          },
          "notes": "Specialist officer cadre in military command hospitals treating combat casualties and service personnel."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.mod.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "ms-surg-sw1",
        "degree_id": "ms-surgery",
        "target_role": "Robotic Surgery Clinical Specialist & Surgical Robotics Proctor",
        "pivot_reason": "Leverage your extensive operative anatomy and laparoscopic dexterity to train surgical teams on da Vinci and Hugo robotic platforms.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Robotic Surgical Console Simulation & Dual-Console Training",
            "type": "course",
            "detail": "Master 3D stereoscopic visualization, wristed instrument manipulation, and clutching mechanics.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "System Docking, Port Placement & Operating Room Team Orchestration",
            "type": "course",
            "detail": "Train scrub nurses and bedside surgical assistants on robotic boom placement and collision avoidance.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Proctored Robotic Cholecystectomy & Hernia Repair Case Series",
            "type": "portfolio",
            "detail": "Complete 30 proctored robotic surgical cases and obtain certified clinical proctor status.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Robotic Surgeon",
          "Intuitive Surgical Console Certificate"
        ],
        "why_feasible": "General surgeons possess visceral operative judgment that enables them to excel as clinical directors for surgical robotics MNCs.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "ms-surg-ent1",
        "degree_id": "ms-surgery",
        "idea_title": "Day-Care Laparoscopic Surgery & Surgical Speciality Center",
        "description": "Establish a specialized day-care surgical center performing ambulatory laparoscopic cholecystectomy, hernia repairs, and proctology with 24-hour discharge.",
        "first_milestones": [
          "Acquire municipal healthcare establishment license and fire/pollution approvals.",
          "Equip state-of-the-art modular operating theater with HD laparoscopic stack and recovery bays.",
          "Empanel with major Third Party Administrators (TPAs) and health insurers for cashless day-care surgeries."
        ],
        "relevant_schemes": [
          {
            "name": "Stand-Up India Scheme for Healthcare Clinics",
            "agency": "Ministry of Finance / SIDBI",
            "benefits": "Composite bank loans between 10 Lakhs and 1 Crore for setting up healthcare centers.",
            "sourceUrl": "https://www.standupmitra.in"
          },
          {
            "name": "Emergency Credit Line Guarantee Scheme (ECLGS) for Healthcare",
            "agency": "National Credit Guarantee Trustee Company (NCGTC)",
            "benefits": "Government-guaranteed loans for medical infrastructure expansion.",
            "sourceUrl": "https://www.ncgtc.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "ms-surgery",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Surgical Anatomy, Trauma Rotations & Basic Operative Skills",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master knot tying, emergency wound debridement, appendectomy, and ICU central line placements.",
              "Submit master research dissertation protocol to institutional ethics committee."
            ],
            "milestone": "High emergency clinical case volume and approved thesis synopsis"
          },
          {
            "stepNumber": 2,
            "title": "Major Operative Surgery & Minimally Invasive Rotations",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform documented major surgical operations under consultant supervision (laparotomies, thyroidectomies, trauma repair).",
              "Complete master dissertation data collection and draft research paper."
            ],
            "milestone": "Completed surgical logbook with required major operative numbers"
          },
          {
            "stepNumber": 3,
            "title": "Exit Practical Examinations & Super-Specialty Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Clear rigorous clinical long cases and surgical pathology viva examinations.",
              "Prepare for NEET-SS / INI-SS examination for M.Ch super-specialty admission."
            ],
            "milestone": "Conferred Master of Surgery (M.S.) in General Surgery degree"
          }
        ]
      },
      "completed": {
        "degree_id": "ms-surgery",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Surgical Operative Dossier & Case Series Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile comprehensive operative logbook certified by head of department.",
              "Review surgical morbidity/mortality audits, oncology resection margins, and emergency protocols."
            ],
            "milestone": "Professional surgical operative portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Hospital Specialist & Senior Resident Appointments",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Consultant Surgeon and Senior Resident positions in premier hospitals.",
              "Demonstrate operative decision-making, complication management, and laparoscopic proficiency in interviews."
            ],
            "milestone": "Appointment letter secured as Consultant Surgeon"
          },
          {
            "stepNumber": 3,
            "title": "Super-Specialty Training & Surgical Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Commence M.Ch super-specialty (Surgical Oncology, GI Surgery, or Urology) or build thriving hospital practice.",
              "Deliver complex surgical care and mentor surgical postgraduates."
            ],
            "milestone": "Attained Senior Consultant Surgeon status"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mdes",
    "id": "mdes",
    "familyId": "design_creative",
    "name": "Master of Design",
    "shortName": "M.Des",
    "aliases": [
      "Master of Design",
      "M.Des.",
      "MDes",
      "mdes"
    ],
    "level": "PG",
    "discipline": "Design & Creative Arts",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "A premier 2-year postgraduate design program covering interaction design, industrial product styling, user experience (UX) architecture, strategic design management, and design research. Admitted through the prestigious Common Entrance Exam for Design (CEED), it transforms design and engineering graduates into creative directors, principal UX architects, and product innovation leaders.",
    "key_skills": [
      "Advanced User Experience (UX) Architecture & Qualitative Design Ethnography",
      "Complex Interactive System Prototyping (Figma, Framer, ProtoPie)",
      "Physical-Digital Industrial Product Styling & Design for Manufacturing (DFM)",
      "Strategic Design Thinking, Systems Mapping & Service Blueprinting",
      "Usability Engineering, Cognitive Walkthroughs & Eye-Tracking Testing",
      "Design Systems Governance & Accessibility Standards (WCAG 2.2 AA/AAA)"
    ],
    "subjects_taught": [
      "Design Research Methods & Ethnographic Field Studies",
      "Interaction Design & Digital Information Architecture",
      "Form Studies, Semantics & Visual Design Systems",
      "Service Design & Systems Thinking",
      "Physical Product Ergonomics & Prototyping",
      "Design Management, Strategy & Intellectual Property",
      "Degree Graduation Project & Industry Internship"
    ],
    "typical_employers": [
      "Global Tech Giants (Google, Microsoft, Apple, Amazon Design Studios)",
      "FinTech Unicorns (CRED, Razorpay, PhonePe)",
      "Automotive Design Studios (Tata Motors Design, Mahindra Design Studio)",
      "Global Design Consultancies (IDEO, Frog Design, Elephant Design)",
      "Hardware & IoT Consumer Brands (Samsung R&D, boAt)"
    ],
    "specializations": [
      {
        "id": "mdes-ux",
        "name": "Interaction & Experience Design",
        "aliases": [
          "M.Des Interaction"
        ],
        "skillsGained": [
          "UX Architecture",
          "Prototyping",
          "Design Systems"
        ],
        "typicalRoles": [
          "Principal UX Designer"
        ]
      },
      {
        "id": "mdes-product",
        "name": "Industrial & Physical Product Design",
        "aliases": [
          "M.Des Product"
        ],
        "skillsGained": [
          "Rhino CAD",
          "Ergonomics",
          "DFM"
        ],
        "typicalRoles": [
          "Lead Industrial Designer"
        ]
      }
    ],
    "sourceUrl": "https://www.ceed.iitb.ac.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mdes-c1",
        "degree_id": "mdes",
        "role_title": "Principal User Experience (UX) & Product Designer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Master-level ethnographic research, mental model mapping, and interactive micro-animations directly qualify you for high-tier UX product design teams.",
        "indicative_salary": {
          "min": 12.0,
          "max": 24.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Product Design Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Figma",
          "Design Systems",
          "User Research",
          "Service Design"
        ],
        "top_employers": [
          "Google India Design",
          "CRED",
          "Microsoft Studio",
          "Razorpay"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mdes-c2",
        "degree_id": "mdes",
        "role_title": "Lead Industrial & Mobility Designer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Postgraduate mastery of vehicle form language, advanced CAD surfacing, and injection molding constraints translates into automotive and consumer hardware styling.",
        "indicative_salary": {
          "min": 11.0,
          "max": 22.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Industrial Design Compensation Benchmark (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Alias AutoStudio",
          "Form Studies",
          "Clay Sculpting",
          "DFM"
        ],
        "top_employers": [
          "Tata Motors Design",
          "Mahindra Design Studio",
          "Samsung Electronics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mdes-c3",
        "degree_id": "mdes",
        "role_title": "Chief Design Officer (CDO) / VP of Design",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Guiding enterprise brand identity, cross-platform product ecosystems, and design strategy requires decades of postgraduate design leadership.",
        "indicative_salary": {
          "min": 35.0,
          "max": 80.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Creative Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Design Strategy",
          "Executive Influence",
          "Team Leadership",
          "Brand Equity"
        ],
        "top_employers": [
          "Global Technology Enterprises",
          "Design Agencies"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mdes-hs1",
        "degree_id": "mdes",
        "program_name": "Ph.D. in Design / Human-Computer Interaction (HCI)",
        "level": "Doctoral",
        "entrance_exams": [
          "CEED",
          "Institute Written Test & Portfolio Review"
        ],
        "eligibility_rule": "Master's degree in Design (M.Des) or Architecture with minimum 60% marks and outstanding design portfolio.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IDC School of Design (IIT Bombay)",
          "IIT Delhi",
          "IIT Guwahati",
          "National Institute of Design (NID Ahmedabad)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mdes-hs2",
        "degree_id": "mdes",
        "program_name": "Executive Certificate in Strategic Innovation & Design Thinking",
        "level": "Executive",
        "entrance_exams": [
          "Institute Selection"
        ],
        "eligibility_rule": "Master in Design with minimum 3 years of professional design leadership.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "Stanford d.school",
          "ISB Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mdes-ct1",
        "degree_id": "mdes",
        "cert_name": "Nielsen Norman Group UX Master Certified (NN/g UXMC)",
        "provider": "Nielsen Norman Group",
        "domain": "User Experience Research & Usability",
        "level": "Advanced",
        "prerequisites": [
          "Documented completion of 15 advanced UX courses and exams"
        ],
        "official_url": "https://www.nngroup.com",
        "sourceUrl": "https://www.nngroup.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mdes-ct2",
        "degree_id": "mdes",
        "cert_name": "Certified Professional in Accessibility Core Competencies (CPACC)",
        "provider": "International Association of Accessibility Professionals (IAAP)",
        "domain": "Digital Accessibility & Inclusive Design",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of disability models and WCAG standards"
        ],
        "official_url": "https://www.accessibilityassociation.org",
        "sourceUrl": "https://www.accessibilityassociation.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mdes-ct3",
        "degree_id": "mdes",
        "cert_name": "Design Sprint Certified Facilitator",
        "provider": "Sprint Stories / Design Sprint Academy",
        "domain": "Rapid Design Prototyping & Facilitation",
        "level": "Intermediate",
        "prerequisites": [
          "Experience in leading cross-functional design sprints"
        ],
        "official_url": "https://designsprint.academy",
        "sourceUrl": "https://designsprint.academy",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mdes-gv1",
        "degree_id": "mdes",
        "exam_or_post_name": "Designer / Design Officer in Defense & Space Applications",
        "conducting_body": "DRDO / ISRO / ALIMCO",
        "eligibility_rule": {
          "degreeFamily": "Design",
          "allowedDegrees": [
            "M.Des",
            "B.Des"
          ],
          "mandatorySubjects": [
            "Industrial Design / Ergonomics"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Specialist design officer roles creating cockpit ergonomics, prosthetic aids, and telemetry user interfaces."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mdes-gv2",
        "degree_id": "mdes",
        "exam_or_post_name": "National Institute of Design (NID) Assistant Professor / Faculty",
        "conducting_body": "NID / Ministry of Commerce and Industry",
        "eligibility_rule": {
          "degreeFamily": "Design",
          "allowedDegrees": [
            "M.Des in relevant discipline"
          ],
          "mandatorySubjects": [
            "Design"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Faculty recruitment at premier Institutes of National Importance under DPIIT."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.nid.edu",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mdes-sw1",
        "degree_id": "mdes",
        "target_role": "Spatial Computing & AR/VR Interface Architect",
        "pivot_reason": "Apply your 3D spatial reasoning, ergonomic reach envelopes, and interaction design to build natural spatial interfaces for Vision Pro and Meta Quest.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Spatial Computing Ergonomics & 3D Gestural Design (Unity / Unreal)",
            "type": "course",
            "detail": "Design stereoscopic UI depths, field-of-view eye tracking, and hand-tracking affordances.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Interactive XR Prototyping (ShapesXR / Bezel 3D)",
            "type": "course",
            "detail": "Prototype spatial layouts and volumetric micro-interactions in mixed reality headsets.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Immersive Surgical or Industrial AR Spatial Workflow Capstone",
            "type": "portfolio",
            "detail": "Deliver full working mixed-reality headset spatial interface for industrial maintenance.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Unity Certified Associate: Game Design",
          "Spatial Computing UX Specialist"
        ],
        "why_feasible": "M.Des postgraduates possess understanding of human depth perception and cognitive ergonomics that makes their spatial UI comfortable.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mdes-ent1",
        "degree_id": "mdes",
        "idea_title": "Strategic Product Innovation & Design Venture Studio",
        "description": "Found an independent design studio delivering end-to-end industrial design, branding, and mobile application experiences for high-growth tech startups.",
        "first_milestones": [
          "Deliver 3 signature design projects with physical prototyping and mobile application launches.",
          "Establish in-house rapid prototyping maker space with SLA 3D printing and usability testing lab.",
          "Achieve international design accolades (Red Dot Award / iF Design Award)."
        ],
        "relevant_schemes": [
          {
            "name": "Design Clinic Scheme for MSMEs",
            "agency": "Ministry of MSME / NID",
            "benefits": "Financial assistance up to 15 Lakhs for design projects with MSME clients.",
            "sourceUrl": "https://www.designclinicsmsme.org"
          },
          {
            "name": "Startup India DPIIT Recognition",
            "agency": "DPIIT",
            "benefits": "Tax holidays and fast-tracked patent examination for design patents.",
            "sourceUrl": "https://www.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mdes",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Design Research Ethnography & Form Exploration",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master user ethnographic interviews, behavioral mapping, rapid sketching, and 3D digital form creation.",
              "Select master graduation project sponsor with a leading product firm or design lab."
            ],
            "milestone": "Approved design graduation project brief and stellar portfolio reviews"
          },
          {
            "stepNumber": 2,
            "title": "Graduation Project Execution & Prototype Fabrication",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Build functional physical prototype or high-fidelity interactive software application.",
              "Submit design entries to national and international student design competitions."
            ],
            "milestone": "Completed graduation project and secured campus design offer"
          },
          {
            "stepNumber": 3,
            "title": "Graduation Jury Defense & Design Placement Drives",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master thesis before external panel of distinguished design directors.",
              "Join premier tech firm, mobility studio, or global design consultancy."
            ],
            "milestone": "Conferred Master of Design (M.Des) degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mdes",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Design Portfolio & Case Study Crafting",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Package in-depth design case studies with user research artifacts, wireframe iterations, and measured metrics.",
              "Review interview fundamentals in design systems, behavioral ergonomics, and stakeholder alignment."
            ],
            "milestone": "World-class digital design portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Tech & Automotive Design Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Senior Product Designer and Industrial Stylist openings.",
              "Present portfolio projects and lead live design whiteboard challenge during interviews."
            ],
            "milestone": "Offer letter received for design lead position"
          },
          {
            "stepNumber": 3,
            "title": "Design Leadership & Creative Direction",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Direct cross-functional design sprints and mentor junior interaction designers.",
              "Elevate to Design Director or establish recognized boutique design consultancy."
            ],
            "milestone": "Promoted to Design Director"
          }
        ]
      }
    }
  },
  {
    "degree_id": "march",
    "id": "march",
    "familyId": "architecture",
    "name": "Master of Architecture",
    "shortName": "M.Arch",
    "aliases": [
      "Master of Architecture",
      "M.Arch.",
      "MArch",
      "march"
    ],
    "level": "PG",
    "discipline": "Architecture & Planning",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "COA",
    "overview": "An advanced 2-year professional architectural postgraduate program approved by the Council of Architecture (COA). Offering specializations in Urban Design, Architectural Conservation, Sustainable Architecture, and Landscape Architecture, it trains architects to manage complex urban regeneration, climate-responsive building envelopes, heritage revitalization, and net-zero smart campus design.",
    "key_skills": [
      "Advanced Parametric & Computational Form Generation (Grasshopper, Rhino, Dynamo)",
      "Building Performance Simulation & Energy Modeling (EnergyPlus, DesignBuilder, IES VE)",
      "Urban Design Master Planning & Transit-Oriented Development (TOD) Frameworks",
      "Architectural Conservation, Heritage Documentation & Adaptive Reuse Protocols",
      "Comprehensive Building Information Modeling (BIM - Level 2 / Revit Architecture)",
      "Passive Solar Architecture, Daylight Analysis & Microclimate Simulation (ENVI-met)"
    ],
    "subjects_taught": [
      "Advanced Architectural Design Studio & Urban Context",
      "Contemporary Architectural Theory & Critical Regionalism",
      "Parametric Design & Computational Architecture",
      "Sustainable Building Technologies & Energy Simulation",
      "Heritage Conservation Principles & Structural Retrofit",
      "Urban Design Policies, Form-Based Codes & Real Estate Economics",
      "Master Research Thesis & Design Project"
    ],
    "typical_employers": [
      "Global Architecture & Urban Design Practices (Foster + Partners, Gensler, SOM, HOK)",
      "National Master Planning Firms (CP Kukreja, Morphogenesis, Hafeez Contractor)",
      "Municipal Urban Development Authorities (DDA, MMRDA, Smart City SPVs)",
      "Historic Heritage & Conservation Trusts (INTACH, UNESCO projects)",
      "Green Building & Sustainable Engineering Consultancies"
    ],
    "specializations": [
      {
        "id": "march-urban",
        "name": "Urban Design & Smart Cities",
        "aliases": [
          "M.Arch Urban Design"
        ],
        "skillsGained": [
          "TOD",
          "Master Planning",
          "Public Space"
        ],
        "typicalRoles": [
          "Urban Designer"
        ]
      },
      {
        "id": "march-sustain",
        "name": "Sustainable & Energy-Efficient Architecture",
        "aliases": [
          "M.Arch Sustainability"
        ],
        "skillsGained": [
          "EnergyPlus",
          "Net-Zero",
          "LEED"
        ],
        "typicalRoles": [
          "Sustainable Design Lead"
        ]
      }
    ],
    "sourceUrl": "https://www.coa.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mar-c1",
        "degree_id": "march",
        "role_title": "Senior Urban Designer / Master Planner",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Postgraduate training in streetscape design, public transit integration, and urban form-based codes translates directly to master planning waterfronts and smart cities.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Architecture Design Compensation Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Master Planning",
          "Urban Space Design",
          "TOD",
          "GIS / Rhino"
        ],
        "top_employers": [
          "CP Kukreja Architects",
          "Morphogenesis",
          "WSP Urban Planning",
          "AECOM"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mar-c2",
        "degree_id": "march",
        "role_title": "Building Performance & Sustainable Architecture Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "In-depth energy modeling (DesignBuilder), daylight optimization, and net-zero carbon building design directly qualifies you for environmental design consulting.",
        "indicative_salary": {
          "min": 7.0,
          "max": 13.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Green Building Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "EnergyPlus",
          "Daylight Simulation",
          "GRIHA",
          "LEED AP"
        ],
        "top_employers": [
          "Gensler",
          "Arup Architecture",
          "Transsolar",
          "Edifice Consultants"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mar-c3",
        "degree_id": "march",
        "role_title": "Principal Architect / Director of Urban Planning",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading iconic national public institutions, airport terminals, and city master plans demands decades of postgraduate architectural authority.",
        "indicative_salary": {
          "min": 28.0,
          "max": 65.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Architecture Executive Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Iconic Master Planning",
          "Firm Governance",
          "International Competitions"
        ],
        "top_employers": [
          "Leading Global Architectural Studios",
          "National EPC Firms"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mar-hs1",
        "degree_id": "march",
        "program_name": "Ph.D. in Architecture & Urban Studies",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE AR",
          "Direct Institute Written Test & Research Interview"
        ],
        "eligibility_rule": "Master of Architecture (M.Arch) or M.Plan with minimum 60% aggregate from a COA-recognized institution.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "IIT Roorkee",
          "SPA New Delhi",
          "CEPT University Ahmedabad",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mar-hs2",
        "degree_id": "march",
        "program_name": "Post Graduate Certificate in Heritage Conservation / Urban Management",
        "level": "Executive",
        "entrance_exams": [
          "University Selection"
        ],
        "eligibility_rule": "M.Arch with interest in monument conservation and historic urban landscapes.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "CEPT University",
          "INTACH Heritage Academy"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mar-ct1",
        "degree_id": "march",
        "cert_name": "LEED AP BD+C (Building Design and Construction)",
        "provider": "USGBC / GBCI",
        "domain": "Green Building Rating & Sustainable Design",
        "level": "Advanced",
        "prerequisites": [
          "Knowledge of green building systems and project submittal procedures"
        ],
        "official_url": "https://www.usgbc.org/credentials/leed-ap-bdc",
        "sourceUrl": "https://www.usgbc.org/credentials/leed-ap-bdc",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mar-ct2",
        "degree_id": "march",
        "cert_name": "GRIHA Certified Professional (GRIHA CP)",
        "provider": "GRIHA Council / TERI",
        "domain": "National Green Building Rating System",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in Architecture or Engineering"
        ],
        "official_url": "https://www.grihaindia.org",
        "sourceUrl": "https://www.grihaindia.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mar-ct3",
        "degree_id": "march",
        "cert_name": "Autodesk Certified Professional: Revit for Architectural Design",
        "provider": "Autodesk",
        "domain": "Building Information Modeling (BIM)",
        "level": "Intermediate",
        "prerequisites": [
          "Experience with complex parametric building models"
        ],
        "official_url": "https://www.autodesk.com/certification",
        "sourceUrl": "https://www.autodesk.com/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mar-gv1",
        "degree_id": "march",
        "exam_or_post_name": "UPSC / CPWD Senior Architect / Architect (Central Public Works)",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Architecture",
          "allowedDegrees": [
            "M.Arch",
            "B.Arch"
          ],
          "mandatorySubjects": [
            "Architecture"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Gazetted architectural cadre designing major government secretariats, supreme court annexes, and national monuments."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mar-gv2",
        "degree_id": "march",
        "exam_or_post_name": "School of Planning and Architecture (SPA) Assistant Professor",
        "conducting_body": "SPA New Delhi / Bhopal / Vijayawada",
        "eligibility_rule": {
          "degreeFamily": "Architecture",
          "allowedDegrees": [
            "M.Arch with valid COA registration"
          ],
          "mandatorySubjects": [
            "Architecture"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Academic faculty appointment at Institutes of National Importance under Ministry of Education."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.spa.ac.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mar-sw1",
        "degree_id": "march",
        "target_role": "Architectural Metaverse & Virtual Environment Unreal Engine Artist",
        "pivot_reason": "Apply your spatial geometry, lighting calculations, and photorealistic texturing to construct immersive architectural environments and real-time metaverse twins.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Unreal Engine 5 for Architecture (Lumen & Nanite)",
            "type": "course",
            "detail": "Import BIM geometry into UE5, configure physical sun/sky lighting, and optimize collision meshes.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Real-Time ArchViz Interactivity & Blueprints Visual Scripting",
            "type": "course",
            "detail": "Create material switchers, automated door animations, and VR walkthrough controllers.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Interactive Photorealistic Architectural Walkthrough Capstone",
            "type": "portfolio",
            "detail": "Deliver full executable real-time architectural walkthrough with dynamic daylight controls.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Unreal Engine Certified Creator",
          "Epic Games ArchViz Certificate"
        ],
        "why_feasible": "Architects possess spatial proportions, lighting, and materiality intuition that traditional 3D generalists lack.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mar-ent1",
        "degree_id": "march",
        "idea_title": "Sustainable Architecture & Computational Design Studio",
        "description": "Establish a specialized architectural practice delivering climate-responsive passive commercial buildings, net-zero residences, and heritage adaptive reuse.",
        "first_milestones": [
          "Register architectural practice with Council of Architecture and obtain professional indemnity.",
          "Win commission for a 20,000 sq ft net-zero sustainable retreat or institutional campus.",
          "Publish project energy efficiency metrics demonstrating 50% reduction in air conditioning loads."
        ],
        "relevant_schemes": [
          {
            "name": "Energy Conservation Building Code (ECBC) Incentives",
            "agency": "Bureau of Energy Efficiency",
            "benefits": "Floor Area Ratio (FAR) bonuses and tax rebates for certified ECBC buildings.",
            "sourceUrl": "https://www.beeindia.gov.in"
          },
          {
            "name": "Startup India Architecture Venture Registration",
            "agency": "DPIIT",
            "benefits": "Income tax exemption and fast-tracked patent/design registration.",
            "sourceUrl": "https://www.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "march",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Urban Context Studio & Computational Form Exploration",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master parametric algorithms in Grasshopper, solar irradiance modeling, and urban master planning.",
              "Formulate master thesis brief focusing on climate-responsive housing or transit corridor regeneration."
            ],
            "milestone": "Approved thesis proposal and high studio jury evaluation"
          },
          {
            "stepNumber": 2,
            "title": "Thesis Studio Execution & Energy Performance Validation",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Develop detailed physical architectural model and comprehensive energy simulation calculations.",
              "Participate in national and international architectural design competitions."
            ],
            "milestone": "Completed master thesis jury and pre-placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Design Practice Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend architectural thesis before distinguished external jury of master architects.",
              "Secure senior design role at premier national or international architectural studio."
            ],
            "milestone": "Conferred Master of Architecture (M.Arch) degree"
          }
        ]
      },
      "completed": {
        "degree_id": "march",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Architectural Portfolio & BIM Dossier Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Curate portfolio showcasing hand sketches, parametric definitions, rendered perspectives, and detailing sheets.",
              "Review Council of Architecture professional ethics, building bylaws, and contract administration."
            ],
            "milestone": "Professional architectural portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Design Firm & Urban Planning Hiring Campaigns",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Senior Urban Designer and Building Performance Architect positions.",
              "Present design studio drawings and energy modeling methodologies during partner interviews."
            ],
            "milestone": "Offer letter received for senior architectural designer role"
          },
          {
            "stepNumber": 3,
            "title": "Principal Architect & Urban Design Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Direct master planning teams on landmark institutional projects or transit hubs.",
              "Establish private architectural partnership or attain university professorship."
            ],
            "milestone": "Promoted to Associate Director / Partner"
          }
        ]
      }
    }
  },
  {
    "degree_id": "mplan",
    "id": "mplan",
    "familyId": "architecture",
    "name": "Master of Planning (Urban & Regional Planning)",
    "shortName": "M.Plan",
    "aliases": [
      "Master of Planning",
      "M.Plan.",
      "MPlan",
      "Master of Urban Planning",
      "mplan"
    ],
    "level": "PG",
    "discipline": "Architecture & Planning",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "AICTE",
    "overview": "A premier 2-year postgraduate program recognized by the Institute of Town Planners India (ITPI) and AICTE. It specializes in urban land use planning, regional development economics, transportation transit corridors, environmental infrastructure, and geographic information systems (GIS). It equips professionals to draft statutory master plans, smart city infrastructure blueprints, and metropolitan mobility policies.",
    "key_skills": [
      "Statutory Master Planning & Land Use Zoning Regulations (URDPFI Guidelines)",
      "Geographic Information Systems (GIS) Spatial Analytics (ArcGIS, QGIS)",
      "Transportation Corridor Modeling & Traffic Impact Assessment (VISSIM, TransCAD)",
      "Urban Governance, Municipal Finance & Public-Private Partnerships (PPP)",
      "Environmental Regional Planning, Hazard Vulnerability & Disaster Mitigation",
      "Metropolitan Demographic Forecasting & Socio-Economic Census Analytics"
    ],
    "subjects_taught": [
      "Planning Theory, History of Human Settlements & Urban Form",
      "Socio-Economic & Demographic Basis of Planning",
      "Spatial Data Analysis & Advanced GIS Applications",
      "Transportation Planning & Traffic Engineering",
      "Urban Infrastructure & Environmental Planning Studio",
      "Urban Legislation, Municipal Governance & Project Finance",
      "Master Planning Thesis & Field Studio"
    ],
    "typical_employers": [
      "Town & Country Planning Organizations (TCPO, State TCPDs)",
      "Metropolitan Development Authorities (DDA, MMRDA, BDA, CMDA)",
      "Global Infrastructure Advisory Consultancies (PwC Urban, CRISIL Infrastructure, Ernst & Young)",
      "Smart City Special Purpose Vehicles (SPVs)",
      "Multilateral Urban Agencies (World Bank, UN-Habitat, Asian Development Bank)"
    ],
    "specializations": [
      {
        "id": "mplan-urban",
        "name": "Urban & Metropolitan Planning",
        "aliases": [
          "Metropolitan Planning"
        ],
        "skillsGained": [
          "Master Planning",
          "Zoning",
          "GIS"
        ],
        "typicalRoles": [
          "Town Planner"
        ]
      },
      {
        "id": "mplan-transport",
        "name": "Transport Planning & Mobility",
        "aliases": [
          "Transport Planning"
        ],
        "skillsGained": [
          "Traffic Simulation",
          "Metro Transit",
          "BRTS"
        ],
        "typicalRoles": [
          "Transportation Planner"
        ]
      }
    ],
    "sourceUrl": "https://www.itpi.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mpl-c1",
        "degree_id": "mplan",
        "role_title": "Urban & Regional Planner / GIS Spatial Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Advanced spatial land-use modeling, demographic regression, and QGIS mapping directly qualify you to prepare city development and infrastructure master plans.",
        "indicative_salary": {
          "min": 7.0,
          "max": 13.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Urban Planning Consulting Salary Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ArcGIS",
          "Master Planning",
          "Land Use Zoning",
          "URDPFI"
        ],
        "top_employers": [
          "PwC Urban Advisory",
          "EY Infrastructure",
          "WSP Planning",
          "Ramboll"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mpl-c2",
        "degree_id": "mplan",
        "role_title": "Assistant Town Planner / Municipal Planning Officer",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Statutory qualification recognized by ITPI enables direct appointment in state town planning departments managing development control regulations.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Public Service Commission Pay Matrix (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Building Bylaws",
          "Zoning Clearance",
          "Town Planning Schemes",
          "DCR"
        ],
        "top_employers": [
          "State Town & Country Planning Departments",
          "Municipal Corporations"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mpl-c3",
        "degree_id": "mplan",
        "role_title": "Chief Urban Planner / Director of Infrastructure Advisory",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing multi-state regional economic corridor plans and national urban mission implementation demands decades of postgraduate town planning leadership.",
        "indicative_salary": {
          "min": 26.0,
          "max": 60.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Infrastructure Advisory Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Metropolitan Strategy",
          "Policy Formulation",
          "Infrastructure PPP"
        ],
        "top_employers": [
          "Global Infrastructure Advisory Firms",
          "Metropolitan Planning Boards"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mpl-hs1",
        "degree_id": "mplan",
        "program_name": "Ph.D. in Urban and Regional Planning",
        "level": "Doctoral",
        "entrance_exams": [
          "GATE AR / CE",
          "Institute Written Test & Research Interview"
        ],
        "eligibility_rule": "Master of Planning (M.Plan) from a recognized university with minimum 60% aggregate.",
        "typical_duration": "3 to 5 Years",
        "top_institutes": [
          "School of Planning and Architecture (SPA New Delhi)",
          "CEPT University Ahmedabad",
          "IIT Kharagpur",
          "IIT Roorkee"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mpl-hs2",
        "degree_id": "mplan",
        "program_name": "Post Graduate Certificate in Municipal Finance & Urban Governance",
        "level": "Executive",
        "entrance_exams": [
          "University Selection"
        ],
        "eligibility_rule": "M.Plan with interest in municipal bond issuance and municipal accounting.",
        "typical_duration": "6 Months",
        "top_institutes": [
          "National Institute of Urban Affairs (NIUA)",
          "Administrative Staff College of India (ASCI)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mpl-ct1",
        "degree_id": "mplan",
        "cert_name": "Associate Member of the Institute of Town Planners India (AITPI)",
        "provider": "Institute of Town Planners India (ITPI)",
        "domain": "Professional Town Planning Practice",
        "level": "Advanced",
        "prerequisites": [
          "Master of Planning from an ITPI-recognized planning institution"
        ],
        "official_url": "https://www.itpi.org.in",
        "sourceUrl": "https://www.itpi.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mpl-ct2",
        "degree_id": "mplan",
        "cert_name": "Esri Certified ArcGIS Spatial Analyst Professional",
        "provider": "Esri",
        "domain": "Geographic Information Systems (GIS)",
        "level": "Intermediate",
        "prerequisites": [
          "Proficiency in raster modeling, geodatabase design, and spatial analysis"
        ],
        "official_url": "https://www.esri.com/training/certification/",
        "sourceUrl": "https://www.esri.com/training/certification/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mpl-ct3",
        "degree_id": "mplan",
        "cert_name": "PTV VISSIM Certified Traffic Micro-Simulation Specialist",
        "provider": "PTV Group",
        "domain": "Traffic Simulation & Corridor Analysis",
        "level": "Intermediate",
        "prerequisites": [
          "Knowledge of traffic volume counts and intersection delay calculations"
        ],
        "official_url": "https://www.ptvgroup.com",
        "sourceUrl": "https://www.ptvgroup.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mpl-gv1",
        "degree_id": "mplan",
        "exam_or_post_name": "State Public Service Commission (PSC) Assistant Town Planner (ATP)",
        "conducting_body": "State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Planning",
          "allowedDegrees": [
            "M.Plan",
            "B.Plan"
          ],
          "mandatorySubjects": [
            "Urban & Regional Planning"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Class II Gazetted statutory town planning role sanctioning regional layout plans and city development permissions."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mpl-gv2",
        "degree_id": "mplan",
        "exam_or_post_name": "Town & Country Planning Organisation (TCPO) Planning Officer",
        "conducting_body": "Ministry of Housing and Urban Affairs (MoHUA)",
        "eligibility_rule": {
          "degreeFamily": "Town Planning",
          "allowedDegrees": [
            "Master's Degree in Town / City / Urban Planning"
          ],
          "mandatorySubjects": [
            "Urban Planning"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Apex technical advisory organization on human settlements under the Government of India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://tcpo.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mpl-sw1",
        "degree_id": "mplan",
        "target_role": "Smart City Urban IoT & Digital Twin Infrastructure Architect",
        "pivot_reason": "Apply your land-use layers, sensor topologies, and spatial GIS data to architect centralized Integrated Command and Control Centres (ICCC) for smart cities.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Smart City ICCC Architecture & IoT Sensor Networks",
            "type": "course",
            "detail": "Understand city surveillance cameras, intelligent traffic management systems (ITMS), and solid waste tracking.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "City Digital Twin 3D GIS Visualization (Cesium / Unreal Engine)",
            "type": "course",
            "detail": "Connect live IoT data streams to 3D city models for real-time flood simulation and traffic rerouting.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Integrated Command & Control Centre (ICCC) Operational Blueprint Capstone",
            "type": "portfolio",
            "detail": "Deliver full functional architecture document and dashboard layout for a smart city of 1 million citizens.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Smart City Professional Certificate",
          "GIS Digital Twin Specialist"
        ],
        "why_feasible": "Urban planners understand administrative jurisdictions and emergency workflows better than traditional IT engineers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mpl-ent1",
        "degree_id": "mplan",
        "idea_title": "Urban Spatial Analytics & Feasibility Advisory Consultancy",
        "description": "Establish a specialized spatial planning consultancy delivering real estate market absorption studies, GIS corridor surveys, and statutory environmental impact studies for developers.",
        "first_milestones": [
          "Acquire commercial GIS software licenses and drone surveying equipment.",
          "Deliver statutory Town Planning Scheme (TPS) layout for a 200-acre residential township.",
          "Contract with municipal corporations for drone-based property tax GIS mapping."
        ],
        "relevant_schemes": [
          {
            "name": "PM Awas Yojana (Urban) Tech Sub-Mission",
            "agency": "Ministry of Housing and Urban Affairs",
            "benefits": "Project grants for innovative sustainable planning and construction.",
            "sourceUrl": "https://pmay-urban.gov.in"
          },
          {
            "name": "Startup India MSME Support",
            "agency": "Ministry of MSME",
            "benefits": "Collateral-free loans for technical consultancy equipment.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mplan",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Planning Studio Foundations & Regional Demographics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master URDPFI planning norms, land-use zoning, GIS mapping, and demographic projection models.",
              "Participate in human settlement field studio collecting household socioeconomic surveys."
            ],
            "milestone": "Approved field survey report and distinction in first-year planning studio"
          },
          {
            "stepNumber": 2,
            "title": "Master Plan Formulation & Traffic Simulation Studio",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Draft comprehensive city master plan including transportation networks and environmental layers.",
              "Conduct traffic micro-simulation using VISSIM and compile research thesis."
            ],
            "milestone": "Completed master planning thesis and secured campus placement offer"
          },
          {
            "stepNumber": 3,
            "title": "Thesis Defense & Planning Institute Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Defend master thesis before external panel of chief town planners and ITPI fellows.",
              "Join international infrastructure consultancy, smart city SPV, or urban research institute."
            ],
            "milestone": "Conferred Master of Planning (M.Plan) degree"
          }
        ]
      },
      "completed": {
        "degree_id": "mplan",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Planning Portfolio & Statutory Dossier Packaging",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile GIS land-use maps, demographic regression graphs, and traffic impact assessment reports.",
              "Review Town & Country Planning legislation, development control regulations, and ITPI ethical standards."
            ],
            "milestone": "Professional urban planning portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Urban Advisory & Public Sector Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Assistant Town Planner and Urban Infrastructure Consultant openings.",
              "Present statutory master planning methodologies and GIS spatial analysis in interviews."
            ],
            "milestone": "Offer letter received for urban planner position"
          },
          {
            "stepNumber": 3,
            "title": "Chief Town Planner & Urban Policy Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Direct master planning revisions for million-plus cities or manage multi-crore infrastructure PPPs.",
              "Attain Fellow of the Institute of Town Planners India (FITPI)."
            ],
            "milestone": "Promoted to Senior Urban Planning Director"
          }
        ]
      }
    }
  }
];
