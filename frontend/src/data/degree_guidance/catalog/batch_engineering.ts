import { UniversalDegreeRecord } from "./types";

export const ENGINEERING_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "btech-cse",
    "id": "btech-cse",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Computer Science & Engineering",
    "shortName": "B.Tech CSE",
    "aliases": [
      "BTech CSE",
      "BE CSE",
      "Computer Engineering",
      "B.E. Computer Science",
      "B.Tech CS",
      "software engineering",
      "coder",
      "programmer",
      "btech-cse"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A comprehensive 4-year engineering program covering high-performance algorithms, operating system internals, database systems, distributed cloud computing, and computer networks. It trains students to design, develop, and scale software systems for enterprise architectures and research applications.",
    "key_skills": [
      "Data Structures & Algorithms",
      "Distributed Systems",
      "Operating Systems",
      "Computer Networks",
      "Database Engineering",
      "Cloud Computing"
    ],
    "subjects_taught": [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Compiler Design",
      "Computer Architecture"
    ],
    "typical_employers": [
      "Google",
      "Microsoft",
      "Amazon",
      "Adobe",
      "Flipkart",
      "TCS",
      "Infosys",
      "Cisco"
    ],
    "specializations": [
      {
        "id": "cse-ai",
        "name": "AI & Machine Learning",
        "aliases": [
          "CSE AI"
        ],
        "skillsGained": [
          "PyTorch",
          "TensorFlow"
        ],
        "typicalRoles": [
          "AI Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-cse-car-1",
        "degree_id": "btech-cse",
        "role_title": "Software Development Engineer (SDE I)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your B.Tech CSE covers core algorithms, operating systems, and object-oriented design, directly qualifying you for writing scalable production services.",
        "indicative_salary": {
          "min": 6.5,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "NASSCOM Placements Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Algorithms",
          "Java/C++/Go",
          "System Design"
        ],
        "top_employers": [
          "Amazon",
          "Microsoft",
          "Flipkart"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-cse-car-2",
        "degree_id": "btech-cse",
        "role_title": "Cloud Infrastructure & DevOps Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Operating systems concurrency, socket networking, and distributed systems coursework map directly into automated cloud deployments.",
        "indicative_salary": {
          "min": 5.5,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox DevOps Index 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Docker",
          "Kubernetes",
          "AWS / Terraform"
        ],
        "top_employers": [
          "Infosys",
          "Cognizant",
          "Cloud MSPs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-cse-car-3",
        "degree_id": "btech-cse",
        "role_title": "Principal Architect / Director of Engineering",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Demands architectural governance across high-scale distributed systems and multi-datacenter optimization built on computer engineering depth.",
        "indicative_salary": {
          "min": 25.0,
          "max": 65.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Tech Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Distributed Systems",
          "Cloud Governance",
          "Leadership"
        ],
        "top_employers": [
          "Tier-1 Product Tech",
          "GCCs",
          "FinTech Unicorns"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-cse-hs-1",
        "degree_id": "btech-cse",
        "program_name": "M.Tech in Computer Science & Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (CS paper)"
        ],
        "eligibility_rule": "B.Tech in CSE/IT with valid GATE CS score and min 60% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Delhi",
          "IISc Bangalore"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-cse-hs-2",
        "degree_id": "btech-cse",
        "program_name": "MS in Computer Science Abroad (US, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "TOEFL / IELTS"
        ],
        "eligibility_rule": "4-year engineering degree with minimum 3.0/4.0 GPA or 65%+ marks.",
        "typical_duration": "1.5 to 2 Years",
        "top_institutes": [
          "TU Munich",
          "CMU",
          "UIUC"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-cse-cert-1",
        "degree_id": "btech-cse",
        "cert_name": "AWS Certified Solutions Architect \u2013 Associate",
        "provider": "Amazon Web Services",
        "domain": "Cloud Computing",
        "level": "Intermediate",
        "prerequisites": [
          "Networking and compute primitives"
        ],
        "official_url": "https://aws.amazon.com/certification",
        "sourceUrl": "https://aws.amazon.com/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-cse-cert-2",
        "degree_id": "btech-cse",
        "cert_name": "Certified Kubernetes Administrator (CKA)",
        "provider": "CNCF",
        "domain": "DevOps & Containers",
        "level": "Intermediate",
        "prerequisites": [
          "Linux CLI and Docker"
        ],
        "official_url": "https://www.cncf.io/certification/cka",
        "sourceUrl": "https://www.cncf.io/certification/cka",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-cse-cert-3",
        "degree_id": "btech-cse",
        "cert_name": "DeepLearning.AI Machine Learning Specialization",
        "provider": "DeepLearning.AI",
        "domain": "Machine Learning",
        "level": "Intermediate",
        "prerequisites": [
          "Python, Linear Algebra"
        ],
        "official_url": "https://www.deeplearning.ai",
        "sourceUrl": "https://www.deeplearning.ai",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-cse-govt-1",
        "degree_id": "btech-cse",
        "exam_or_post_name": "Scientist/Engineer 'SC' (Computer Science) \u2013 ISRO / DRDO",
        "conducting_body": "ISRO ICRB / RAC DRDO",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-cse-sw-1",
        "degree_id": "btech-cse",
        "target_role": "Quantitative Trader / Financial Quant",
        "pivot_reason": "Applies high-frequency algorithmic processing, probability modeling, and low-latency C++ coding to automated trading.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Stochastic Calculus & Math Finance",
            "type": "course",
            "detail": "Master Black-Scholes and Monte Carlo simulations.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Low-Latency C++ Order Book",
            "type": "portfolio",
            "detail": "Implement an order matching engine in C++20.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "CQF Credential",
            "type": "cert",
            "detail": "Complete CQF or FRM Part I.",
            "estimatedMonths": 3
          }
        ],
        "typical_duration": "6 to 8 Months",
        "recommended_certs": [
          "Certificate in Quantitative Finance (CQF)"
        ],
        "why_feasible": "CSE graduates possess the algorithmic speed and mathematical rigor required by quantitative execution desks.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-cse-ent-1",
        "degree_id": "btech-cse",
        "idea_title": "AI-Powered Developer Tooling Platform",
        "description": "Develop automated code review, performance profiling, and security compliance verification tools for CI/CD.",
        "first_milestones": [
          "Build open-source GitHub Action.",
          "Pilot with 5 tech startups.",
          "Apply for SISFS grant."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-cse",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Algorithmic Rigor & OOP Mastery",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Solve 150+ LeetCode problems.",
              "Build relational database systems.",
              "Maintain CGPA > 8.0."
            ],
            "milestone": "Strong algorithmic foundation."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Cloud Systems & Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master AWS/Docker.",
              "Apply to 30+ engineering internships.",
              "Clear campus placement tests."
            ],
            "milestone": "Complete 8-12 week software internship."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Campus Placements & Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Practice system design.",
              "Complete capstone thesis.",
              "Participate in hiring drives."
            ],
            "milestone": "Secure full-time SDE role."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-cse",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Portfolio Optimization",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Refactor 2 projects into microservices.",
              "Earn AWS Solutions Architect.",
              "Practice mock interviews."
            ],
            "milestone": "Verified portfolio online."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Targeted Application Sprint",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 openings weekly with referrals.",
              "Complete 10 mock coding rounds.",
              "Attend tech meetups."
            ],
            "milestone": "Secure 3 to 6 technical interview calls."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Negotiation & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Compare offers on compensation and growth.",
              "Pre-study team tech stack.",
              "Establish 90-day onboarding milestones."
            ],
            "milestone": "Commence SDE position."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-mech",
    "id": "btech-mech",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Mechanical Engineering",
    "shortName": "B.Tech Mechanical",
    "aliases": [
      "BTech Mechanical",
      "BE Mechanical",
      "Mechanical Engineering",
      "B.E. Mechanical",
      "B.Tech Mech",
      "mechanical engineer",
      "btech-mech"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A core 4-year engineering discipline focused on thermodynamics, fluid mechanics, solid mechanics, manufacturing processes, machine design, and CAD/CAM/CAE simulations. Graduates engineer automotive systems, power generation plants, aerospace components, HVAC systems, and automated robotics.",
    "key_skills": [
      "3D CAD Modeling (SolidWorks/CATIA)",
      "Finite Element Analysis (ANSYS)",
      "Computational Fluid Dynamics",
      "Thermodynamics & Heat Transfer",
      "CNC Machining & Tooling",
      "Robotics & Mechatronics"
    ],
    "subjects_taught": [
      "Thermodynamics",
      "Fluid Mechanics",
      "Strength of Materials",
      "Kinematics & Dynamics",
      "Manufacturing Science",
      "Design of Machine Elements"
    ],
    "typical_employers": [
      "Tata Motors",
      "Mahindra & Mahindra",
      "L&T",
      "Bosch",
      "BHEL",
      "Maruti Suzuki",
      "Thermax",
      "ISRO / DRDO"
    ],
    "specializations": [
      {
        "id": "mech-ev",
        "name": "Electric Vehicles",
        "aliases": [
          "EV Tech"
        ],
        "skillsGained": [
          "Battery Thermal Management"
        ],
        "typicalRoles": [
          "EV Powertrain Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-mech-car-1",
        "degree_id": "btech-mech",
        "role_title": "Mechanical Design / CAE Simulation Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in strength of materials, machine design, and CAD/FEA maps directly to component modeling, stress analysis, and structural validation.",
        "indicative_salary": {
          "min": 5.0,
          "max": 10.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Mech Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "SolidWorks/CATIA",
          "ANSYS FEA",
          "GD&T"
        ],
        "top_employers": [
          "Tata Motors",
          "Mahindra",
          "Bosch",
          "John Deere"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mech-car-2",
        "degree_id": "btech-mech",
        "role_title": "Plant Operations / Production Planning Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Manufacturing science and industrial engineering modules prepare you directly for shop-floor cycle time optimization, line balancing, and quality control.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Manufacturing Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Lean Manufacturing",
          "Six Sigma",
          "CNC Operations"
        ],
        "top_employers": [
          "L&T",
          "Jindal Steel",
          "ITC Manufacturing"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mech-car-3",
        "degree_id": "btech-mech",
        "role_title": "Chief Engineer / Plant Operations Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Requires multi-facility capital expenditure governance, heavy industrial plant safety compliance, and supply chain manufacturing leadership.",
        "indicative_salary": {
          "min": 22.0,
          "max": 45.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Industrial Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Plant Turnaround",
          "Capex Budgeting",
          "TPM"
        ],
        "top_employers": [
          "Heavy Engineering MNCs",
          "Automotive OEMs",
          "Steel Conglomerates"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-mech-hs-1",
        "degree_id": "btech-mech",
        "program_name": "M.Tech in Thermal Engineering / Machine Design",
        "level": "PG",
        "entrance_exams": [
          "GATE (ME paper)"
        ],
        "eligibility_rule": "B.Tech in Mechanical with valid GATE ME score and min 60% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Madras",
          "IIT Bombay",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mech-hs-2",
        "degree_id": "btech-mech",
        "program_name": "MS in Automotive Engineering Abroad (Germany, US)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year engineering degree in Mechanical Engineering with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "RWTH Aachen",
          "TU Munich",
          "University of Stuttgart"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-mech-cert-1",
        "degree_id": "btech-mech",
        "cert_name": "Certified SolidWorks Professional (CSWP)",
        "provider": "Dassault Syst\u00e8mes",
        "domain": "CAD Design",
        "level": "Intermediate",
        "prerequisites": [
          "Parametric 3D modeling"
        ],
        "official_url": "https://www.solidworks.com/certifications",
        "sourceUrl": "https://www.solidworks.com/certifications",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-mech-cert-2",
        "degree_id": "btech-mech",
        "cert_name": "ANSYS Certified Associate in Mechanical FEA",
        "provider": "ANSYS",
        "domain": "FEA Simulation",
        "level": "Intermediate",
        "prerequisites": [
          "Strength of materials, elasticity"
        ],
        "official_url": "https://innovationspace.ansys.com",
        "sourceUrl": "https://innovationspace.ansys.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-mech-cert-3",
        "degree_id": "btech-mech",
        "cert_name": "Certified Lean Six Sigma Green Belt (ICGB)",
        "provider": "ASQ",
        "domain": "Quality Control",
        "level": "Intermediate",
        "prerequisites": [
          "Applied statistics, process mapping"
        ],
        "official_url": "https://asq.org",
        "sourceUrl": "https://asq.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-mech-govt-1",
        "degree_id": "btech-mech",
        "exam_or_post_name": "UPSC Engineering Services Examination (ESE) \u2013 Mechanical",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-mech-sw-1",
        "degree_id": "btech-mech",
        "target_role": "Robotics & Industrial Automation Programmer",
        "pivot_reason": "Bridges mechanical kinematics and linkage design with ROS (Robot Operating System), Python vision, and PLC logic.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "ROS2 & Python Robotics",
            "type": "course",
            "detail": "Master ROS2 navigation stacks and kinematic modeling.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Simulation in Gazebo",
            "type": "portfolio",
            "detail": "Simulate 6-DOF robotic arm pick-and-place in Gazebo.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Hardware PLC Lab",
            "type": "portfolio",
            "detail": "Build automated actuator rig using STM32/Arduino.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "Udacity Robotics Software Engineer Nanodegree"
        ],
        "why_feasible": "Mechanical engineers inherently grasp rigid body dynamics, torque profiles, and gear ratios.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-mech-ent-1",
        "degree_id": "btech-mech",
        "idea_title": "Precision 3D Prototyping & Rapid Tooling Studio",
        "description": "Provide custom additive manufacturing, high-strength functional polymer and metal SLS prototyping, and short-run CNC parts.",
        "first_milestones": [
          "Acquire 2 industrial 3D printers.",
          "Partner with 5 drone/automotive teams.",
          "Expand into injection mold tooling."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-mech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Solid Mechanics & 3D CAD Modeling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Earn Certified SolidWorks Associate (CSWA).",
              "Join college SAE / BAJA teams.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Pass CSWA and design first vehicle mechanism."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: CAE Simulation & Plant Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master ANSYS static structural analysis.",
              "Complete 6-8 week factory internship.",
              "Begin GATE ME prep."
            ],
            "milestone": "Complete plant internship and publish FEA case study."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Campus Hiring & GATE",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Appear for GATE ME exam.",
              "Participate in core placement drives (L&T, Tata Motors).",
              "Complete capstone prototype."
            ],
            "milestone": "Secure core engineering placement or competitive GATE rank."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-mech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: CAD/FEA Portfolio Credentialing",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 3 detailed FEA case studies on GrabCAD.",
              "Earn CSWP certification.",
              "Practice thermodynamics interview questions."
            ],
            "milestone": "Verified mechanical portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: OEM & Engineering Application",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Submit 15 GET applications weekly.",
              "Connect with design leads on LinkedIn.",
              "Attend industrial job fairs."
            ],
            "milestone": "Secure 3 to 5 technical design interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate plant vs R&D career path.",
              "Review OSHA/ISO factory safety protocols.",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence mechanical engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-civil",
    "id": "btech-civil",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Civil Engineering",
    "shortName": "B.Tech Civil",
    "aliases": [
      "BTech Civil",
      "BE Civil",
      "Civil Engineering",
      "B.E. Civil",
      "civil engineer",
      "btech-civil"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A foundational engineering degree training professionals in structural design, geotechnical engineering, water resource management, transportation infrastructure, and construction project execution. Civil engineers plan, build, and maintain public highways, bridges, urban skyscrapers, dams, and environmental utility systems.",
    "key_skills": [
      "Structural Analysis & RCC/Steel Design (STAAD.Pro, ETABS)",
      "Geotechnical Soil Mechanics & Foundation Sizing",
      "Highway Geometry & Traffic Engineering (MX Road / Civil 3D)",
      "Surveying, Total Station & GIS Spatial Analysis",
      "Project Scheduling & Cost Estimation (Primavera P6, MS Project)",
      "Environmental Water Treatment & Hydrology"
    ],
    "subjects_taught": [
      "Structural Analysis",
      "Design of Reinforced Concrete Structures",
      "Geotechnical Engineering & Foundation Design",
      "Transportation Engineering",
      "Hydrology & Water Resources",
      "Construction Technology & Management"
    ],
    "typical_employers": [
      "Larsen & Toubro (L&T) Construction",
      "Shapoorji Pallonji",
      "Tata Projects",
      "NHAI",
      "Afcons Infrastructure",
      "Central Public Works Department (CPWD)",
      "Rail Vikas Nigam (RVNL)"
    ],
    "specializations": [
      {
        "id": "civil-struct",
        "name": "Structural Engineering",
        "aliases": [
          "Structures"
        ],
        "skillsGained": [
          "Seismic Design",
          "ETABS"
        ],
        "typicalRoles": [
          "Structural Design Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-civil-car-1",
        "degree_id": "btech-civil",
        "role_title": "Structural Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in RCC design, steel structures, and structural analysis software (ETABS/STAAD) qualifies you directly for designing high-rise and infrastructure frameworks.",
        "indicative_salary": {
          "min": 5.0,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Civil Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ETABS",
          "STAAD.Pro",
          "RCC Design",
          "IS 456 / IS 800"
        ],
        "top_employers": [
          "L&T",
          "WSP India",
          "Arup",
          "Tata Projects"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-civil-car-2",
        "degree_id": "btech-civil",
        "role_title": "Site Project Engineer / Construction Manager",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Construction management, bar bending schedule, concrete technology, and surveying courses prepare you for on-site execution and contractor quality governance.",
        "indicative_salary": {
          "min": 4.2,
          "max": 8.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Construction Index 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Site Execution",
          "Quantity Surveying",
          "Quality Assurance",
          "Billing"
        ],
        "top_employers": [
          "Shapoorji Pallonji",
          "Afcons",
          "NCC Limited"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-civil-car-3",
        "degree_id": "btech-civil",
        "role_title": "Chief Project Director / EPC Vice President",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs multi-thousand crore mega-infrastructure projects (highways, metros, airports), managing contractual FIDIC guidelines, risk, and multi-tier sub-contractors.",
        "indicative_salary": {
          "min": 24.0,
          "max": 50.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Infrastructure Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "EPC Project Governance",
          "FIDIC Contracts",
          "Claims Management",
          "Capex Control"
        ],
        "top_employers": [
          "Global EPC Giants",
          "Metro Rail Corporations",
          "National Infrastructure Developers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-civil-hs-1",
        "degree_id": "btech-civil",
        "program_name": "M.Tech in Structural Engineering / Geotechnical Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (CE paper)"
        ],
        "eligibility_rule": "B.Tech in Civil with valid GATE CE score and min 60% marks for IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Roorkee",
          "IIT Delhi",
          "IIT Madras",
          "IIT Kanpur"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-civil-hs-2",
        "degree_id": "btech-civil",
        "program_name": "MS in Construction Management / Structural Mechanics Abroad",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year civil engineering degree with min 65% aggregate.",
        "typical_duration": "1.5 to 2 Years",
        "top_institutes": [
          "Purdue University",
          "Delft University of Technology (TU Delft)",
          "NUS Singapore"
        ],
        "sourceUrl": "https://www.tudelft.nl",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-civil-cert-1",
        "degree_id": "btech-civil",
        "cert_name": "Bentley STAAD.Pro Structural Analysis Professional",
        "provider": "Bentley Systems",
        "domain": "Structural Analysis",
        "level": "Intermediate",
        "prerequisites": [
          "Structural mechanics, IS codes"
        ],
        "official_url": "https://www.bentley.com",
        "sourceUrl": "https://www.bentley.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-civil-cert-2",
        "degree_id": "btech-civil",
        "cert_name": "Autodesk Certified Professional: Revit for Structures",
        "provider": "Autodesk",
        "domain": "BIM Architecture & Modeling",
        "level": "Intermediate",
        "prerequisites": [
          "Structural drawings, drafting"
        ],
        "official_url": "https://www.autodesk.com/certification",
        "sourceUrl": "https://www.autodesk.com/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-civil-cert-3",
        "degree_id": "btech-civil",
        "cert_name": "Oracle Primavera P6 Project Management Certification",
        "provider": "Oracle",
        "domain": "Project Scheduling & Control",
        "level": "Intermediate",
        "prerequisites": [
          "Critical path method, Gantt scheduling"
        ],
        "official_url": "https://education.oracle.com",
        "sourceUrl": "https://education.oracle.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-civil-govt-1",
        "degree_id": "btech-civil",
        "exam_or_post_name": "UPSC Engineering Services Examination (ESE) \u2013 Civil Branch",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-civil-govt-2",
        "degree_id": "btech-civil",
        "exam_or_post_name": "Staff Selection Commission Junior Engineer (SSC JE) \u2013 Civil",
        "conducting_body": "SSC",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-civil-sw-1",
        "degree_id": "btech-civil",
        "target_role": "GIS & Spatial Data Analyst",
        "pivot_reason": "Transfers surveying, geomatics, and topographical mapping knowledge into satellite remote sensing, ArcGIS urban modeling, and geospatial analytics.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "ArcGIS & QGIS Spatial Modeling",
            "type": "course",
            "detail": "Master vector/raster spatial analysis, map projections, and satellite imagery.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Python for Geospatial Data (GeoPandas)",
            "type": "course",
            "detail": "Automate spatial indexing, buffer analysis, and geocoding.",
            "estimatedMonths": 1
          },
          {
            "step": 3,
            "title": "Urban Infrastructure Mapping Project",
            "type": "portfolio",
            "detail": "Publish a GIS map analyzing flood inundation or smart city transport routing.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "4 Months",
        "recommended_certs": [
          "Esri ArcGIS Desktop Entry Certificate"
        ],
        "why_feasible": "Civil engineers already know coordinate systems, contours, and land surveying principles.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-civil-ent-1",
        "degree_id": "btech-civil",
        "idea_title": "Geotechnical Testing & Non-Destructive Testing (NDT) Lab",
        "description": "Establish an accredited soil mechanics testing, core-cutting, rebound hammer, and ultrasonic pulse velocity testing lab for building structural audits.",
        "first_milestones": [
          "Procure calibrated soil triaxial, direct shear, and rebound testing apparatus.",
          "Obtain NABL accreditation for soil and concrete cube testing.",
          "Tie up with 15 local builders and architectural firms."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-civil",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Surveying & Mechanics of Solids",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master total station surveying and AutoCAD drafting.",
              "Learn basics of STAAD.Pro.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Publish first 2D/3D building plan."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Structural Analysis & Site Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master ETABS seismic design.",
              "Complete 6-8 week highway or building site internship.",
              "Begin GATE CE preparation."
            ],
            "milestone": "Complete structural audit internship report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Campus Hiring & Competitive Exams",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Appear for GATE CE and SSC JE exams.",
              "Participate in core construction placement drives.",
              "Finalize capstone design of bridge or multi-story building."
            ],
            "milestone": "Secure core construction or design placement."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-civil",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Structural Portfolio & Code Compliance",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Build portfolio of 3 structural designs following IS 456 and IS 1893.",
              "Earn Primavera P6 or Revit Structures certification.",
              "Practice technical interview questions in soil and concrete."
            ],
            "milestone": "Verified structural portfolio online."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target EPC & Consultancies",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 site and design openings weekly.",
              "Network with project managers on LinkedIn.",
              "Attend construction tech seminars."
            ],
            "milestone": "Secure 3 to 5 technical design and site interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate site rotation, allowance, and project scale.",
              "Review site safety and labor compliance regulations.",
              "Establish 1-year target to become Assistant Project Manager."
            ],
            "milestone": "Commence civil engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-eee",
    "id": "btech-eee",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Electrical & Electronics Engineering",
    "shortName": "B.Tech Electrical",
    "aliases": [
      "BTech EEE",
      "BE EEE",
      "Electrical Engineering",
      "B.E. Electrical",
      "B.Tech EEE",
      "electrical engineer",
      "btech-eee"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A comprehensive 4-year engineering curriculum covering power systems, electrical machines, power electronics, control systems, renewable energy grids, and analog/digital circuits. Electrical engineers design smart grids, high-voltage transmission networks, EV motors, industrial drives, and automated control equipment.",
    "key_skills": [
      "Power Systems Analysis & Load Flow (ETAP, PSCAD)",
      "Electrical Machines & Motor Drives (MATLAB / Simulink)",
      "Power Electronics Converter Design (Inverters, DC-DC, PWM)",
      "Control Systems & PLC/SCADA Automation",
      "Switchgear, Protection Relays & Substation Design",
      "Renewable Energy Integration (Solar PV, Wind, Battery Storage)"
    ],
    "subjects_taught": [
      "Circuit Theory & Networks",
      "Electrical Machines I & II",
      "Power Systems Engineering",
      "Power Electronics",
      "Control Systems Engineering",
      "Microprocessors & Microcontrollers"
    ],
    "typical_employers": [
      "Siemens India",
      "ABB",
      "Schneider Electric",
      "Power Grid Corporation (PGCIL)",
      "BHEL",
      "Tata Power",
      "NTPC",
      "L&T Electrical"
    ],
    "specializations": [
      {
        "id": "eee-power",
        "name": "Power Systems & Renewable Energy",
        "aliases": [
          "Power Systems"
        ],
        "skillsGained": [
          "Smart Grids",
          "ETAP"
        ],
        "typicalRoles": [
          "Power Systems Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-eee-car-1",
        "degree_id": "btech-eee",
        "role_title": "Power Systems / Electrical Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in transmission networks, fault analysis, and power electronics directly maps to substation switchgear sizing, cable scheduling, and protection coordination.",
        "indicative_salary": {
          "min": 5.2,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Electrical Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ETAP",
          "Power System Protection",
          "MATLAB",
          "Switchgear"
        ],
        "top_employers": [
          "Siemens",
          "ABB",
          "Schneider Electric",
          "Tata Power"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eee-car-2",
        "degree_id": "btech-eee",
        "role_title": "EV Powertrain / Motor Control Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Combines electrical machines, inverter power electronics, and closed-loop control systems into developing traction motors and battery management systems (BMS).",
        "indicative_salary": {
          "min": 5.8,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor EV Engineering Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Motor Control (FOC)",
          "Inverters",
          "Simulink",
          "CAN Protocol"
        ],
        "top_employers": [
          "Ather Energy",
          "Ola Electric",
          "Tata Motors EV",
          "Bosch"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eee-car-3",
        "degree_id": "btech-eee",
        "role_title": "Chief Electrical Officer / Vice President - Energy Infrastructure",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs multi-gigawatt renewable energy plants, high-voltage transmission lines, and national grid synchronization assets.",
        "indicative_salary": {
          "min": 25.0,
          "max": 52.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Energy Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Grid Integration",
          "High Voltage Engineering",
          "Energy Trading",
          "Capex Governance"
        ],
        "top_employers": [
          "Renewable Energy IPPs",
          "National Grid Utilities",
          "Global Power MNCs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-eee-hs-1",
        "degree_id": "btech-eee",
        "program_name": "M.Tech in Power Electronics & Drives / Smart Grids",
        "level": "PG",
        "entrance_exams": [
          "GATE (EE paper)"
        ],
        "eligibility_rule": "B.Tech in EEE with valid GATE EE score and min 60% aggregate for subsidized IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Delhi",
          "IIT Madras",
          "IIT Bombay",
          "IISc Bangalore"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eee-hs-2",
        "degree_id": "btech-eee",
        "program_name": "MS in Sustainable Electrical Energy Abroad (Germany, Netherlands)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year accredited degree in Electrical Engineering with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TU Delft",
          "RWTH Aachen",
          "TU Eindhoven"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-eee-cert-1",
        "degree_id": "btech-eee",
        "cert_name": "ETAP Power System Analysis Certification",
        "provider": "Operation Technology (ETAP)",
        "domain": "Power Systems & Load Flow",
        "level": "Intermediate",
        "prerequisites": [
          "Electrical networks, single-line diagrams"
        ],
        "official_url": "https://etap.com",
        "sourceUrl": "https://etap.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-eee-cert-2",
        "degree_id": "btech-eee",
        "cert_name": "PLC & SCADA Industrial Automation Professional",
        "provider": "Siemens / Schneider Academy",
        "domain": "Industrial Automation",
        "level": "Intermediate",
        "prerequisites": [
          "Relay logic, ladder programming"
        ],
        "official_url": "https://www.siemens.com",
        "sourceUrl": "https://www.siemens.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-eee-cert-3",
        "degree_id": "btech-eee",
        "cert_name": "Solar PV System Design Professional (NABCEP Prep)",
        "provider": "GWEC / NISE",
        "domain": "Solar & Renewable Energy",
        "level": "Intermediate",
        "prerequisites": [
          "Solar irradiance, inverter sizing, PVsyst"
        ],
        "official_url": "https://nise.res.in",
        "sourceUrl": "https://nise.res.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-eee-govt-1",
        "degree_id": "btech-eee",
        "exam_or_post_name": "UPSC Engineering Services Examination (ESE) \u2013 Electrical Branch",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eee-govt-2",
        "degree_id": "btech-eee",
        "exam_or_post_name": "Power Grid Corporation / NTPC / BHEL Recruitment via GATE",
        "conducting_body": "PSU Consortium",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.powergrid.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-eee-sw-1",
        "degree_id": "btech-eee",
        "target_role": "Embedded Firmware Engineer (IoT & Automotive)",
        "pivot_reason": "Applies microcontroller architectures, ADC/DAC conversions, and hardware interrupts into firmware development in C/C++.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Embedded C & ARM Cortex Architecture",
            "type": "course",
            "detail": "Master bare-metal programming on STM32 microcontrollers.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "RTOS & Communication Protocols (CAN, I2C, SPI)",
            "type": "course",
            "detail": "Implement FreeRTOS tasks and sensor telemetry pipelines.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Battery Telemetry / Sensor Node Project",
            "type": "portfolio",
            "detail": "Build a live IoT battery monitoring device uploading to AWS IoT Core.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "Arm Accredited Engineer (AAE)"
        ],
        "why_feasible": "Electrical engineers thoroughly understand transistor timing, signals, and board-level circuitry.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-eee-ent-1",
        "degree_id": "btech-eee",
        "idea_title": "Commercial Solar EPC & Energy Storage Solutions",
        "description": "Design, procure, install, and commission rooftop solar PV and lithium battery storage systems for industrial factories seeking net-zero compliance.",
        "first_milestones": [
          "Complete 5 net-metered rooftop solar feasibility audits.",
          "Partner with Tier-1 solar module and inverter distributors.",
          "Secure first 100kW rooftop installation contract."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-eee",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Network Theorems & Electrical Machines",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master circuit analysis and machine winding tests.",
              "Learn MATLAB Simulink motor simulations.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Complete single-phase and three-phase lab experiments."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Power Systems, Power Electronics & Substation Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master ETAP single-line load flow modeling.",
              "Complete 6-8 week substation / industrial plant training.",
              "Begin GATE EE prep."
            ],
            "milestone": "Complete substation internship report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Placements & GATE Exam",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Appear for GATE EE examination.",
              "Participate in core placement drives (Siemens, ABB, PGCIL).",
              "Design EV motor drive or solar inverter for capstone."
            ],
            "milestone": "Secure core electrical engineering placement."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-eee",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Power & Automation Portfolio Credentialing",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 3 MATLAB power system models on GitHub/LinkedIn.",
              "Earn ETAP or PLC/SCADA certification.",
              "Review technical interview topics in machines and protection."
            ],
            "milestone": "Verified electrical engineering portfolio online."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Core Power & EV Firms",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Electrical GET openings weekly.",
              "Connect with electrical design leads on LinkedIn.",
              "Attend regional power conference job fairs."
            ],
            "milestone": "Secure 3 to 5 technical design and plant interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate compensation, site allowance, and project domain.",
              "Review Central Electricity Authority (CEA) safety regulations.",
              "Establish 1-year promotion milestones."
            ],
            "milestone": "Commence electrical engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-ece",
    "id": "btech-ece",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Electronics & Communication Engineering",
    "shortName": "B.Tech ECE",
    "aliases": [
      "BTech ECE",
      "BE ECE",
      "Electronics and Communication",
      "B.E. ECE",
      "B.Tech Electronics",
      "telecom engineer",
      "btech-ece"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A versatile 4-year engineering program that bridges semiconductor physics, analog and digital electronics, VLSI design, embedded microprocessors, digital signal processing (DSP), and wireless communication networks (5G/6G, satellite, optical). Graduates lead innovation in semiconductor chips, consumer electronics, telecommunications, and defense aerospace systems.",
    "key_skills": [
      "VLSI Design & Hardware Description Languages (Verilog, SystemVerilog)",
      "Digital Signal Processing (DSP) & Image Processing (MATLAB)",
      "Embedded Systems & Firmware Development (ARM Cortex, C/C++)",
      "RF, Antenna Design & Microwave Systems (HFSS)",
      "Wireless Communication Standards (5G-NR, LTE, Wi-Fi, Bluetooth)",
      "PCB Design & Signal Integrity (Altium Designer, KiCAD)"
    ],
    "subjects_taught": [
      "Analog & Digital Electronic Circuits",
      "Signals and Systems",
      "Digital Signal Processing",
      "Microprocessors & Embedded Controllers",
      "VLSI Design & Semiconductor Physics",
      "Antenna & Microwave Propagation",
      "Wireless & Mobile Communication"
    ],
    "typical_employers": [
      "Intel",
      "Qualcomm",
      "Texas Instruments",
      "Broadcom",
      "NXP Semiconductors",
      "Samsung Semiconductor",
      "Cisco",
      "Bharat Electronics (BEL)",
      "ISRO"
    ],
    "specializations": [
      {
        "id": "ece-vlsi",
        "name": "VLSI Design & Microelectronics",
        "aliases": [
          "VLSI"
        ],
        "skillsGained": [
          "SystemVerilog",
          "RTL Verification",
          "Cadence EDA"
        ],
        "typicalRoles": [
          "VLSI Design Engineer",
          "Physical Design Trainee"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-ece-car-1",
        "degree_id": "btech-ece",
        "role_title": "VLSI Design & RTL Verification Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in digital design, semiconductor physics, and Verilog HDL translates directly into writing synthesizable RTL code and validating ASIC/FPGA chip logic.",
        "indicative_salary": {
          "min": 7.0,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Semiconductor India Salary Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "SystemVerilog",
          "UVM",
          "Verilog",
          "Cadence/Synopsys Tools"
        ],
        "top_employers": [
          "Qualcomm",
          "Intel",
          "Texas Instruments",
          "MediaTek"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-ece-car-2",
        "degree_id": "btech-ece",
        "role_title": "Embedded Systems & IoT Firmware Developer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Combines microcontroller architectures, communication protocols (SPI, I2C, UART), and RTOS into programming real-time consumer and automotive devices.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Embedded Index 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Embedded C",
          "ARM Cortex",
          "FreeRTOS",
          "Altium PCB"
        ],
        "top_employers": [
          "Bosch",
          "Continental",
          "Samsung R&D",
          "Visteon"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-ece-car-3",
        "degree_id": "btech-ece",
        "role_title": "Chief Technology Officer / Senior Director of Silicon Engineering",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs multi-million dollar tape-outs, 3nm/5nm sub-micron silicon fabrication, and high-frequency RF transceivers across global semiconductor teams.",
        "indicative_salary": {
          "min": 28.0,
          "max": 70.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Semiconductor Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Tape-out Governance",
          "Silicon Architecture",
          "Physical Design Closure",
          "Engineering Leadership"
        ],
        "top_employers": [
          "Global Semiconductor OEMs",
          "Fabless Chip Companies",
          "Telecom Conglomerates"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-ece-hs-1",
        "degree_id": "btech-ece",
        "program_name": "M.Tech in VLSI Design / Embedded Systems / Telecommunications",
        "level": "PG",
        "entrance_exams": [
          "GATE (EC paper)"
        ],
        "eligibility_rule": "B.Tech in ECE with valid GATE EC score and min 60% marks for subsidized IIT/NIT seats with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Madras",
          "IIT Kharagpur",
          "IISc Bangalore",
          "IIT Bombay"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-ece-hs-2",
        "degree_id": "btech-ece",
        "program_name": "MS in Electrical & Computer Engineering Abroad (US, Taiwan, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year ECE degree with min 65%+ marks; top destination universities provide direct access to global semiconductor foundries.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Purdue University",
          "National Taiwan University",
          "Georgia Tech",
          "TU Munich"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-ece-cert-1",
        "degree_id": "btech-ece",
        "cert_name": "Certified SystemVerilog & UVM Professional",
        "provider": "Maven Silicon / Synopsys Academy",
        "domain": "VLSI Verification",
        "level": "Intermediate",
        "prerequisites": [
          "Digital logic design, Verilog HDL"
        ],
        "official_url": "https://www.maven-silicon.com",
        "sourceUrl": "https://www.maven-silicon.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-ece-cert-2",
        "degree_id": "btech-ece",
        "cert_name": "Embedded Linux & Device Driver Development",
        "provider": "Linux Foundation",
        "domain": "Systems Software",
        "level": "Intermediate",
        "prerequisites": [
          "C programming, OS concepts"
        ],
        "official_url": "https://training.linuxfoundation.org",
        "sourceUrl": "https://training.linuxfoundation.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-ece-cert-3",
        "degree_id": "btech-ece",
        "cert_name": "Altium Essentials PCB Design Certification",
        "provider": "Altium",
        "domain": "Hardware PCB Engineering",
        "level": "Intermediate",
        "prerequisites": [
          "Schematic capture, board layout, DRC"
        ],
        "official_url": "https://www.altium.com",
        "sourceUrl": "https://www.altium.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-ece-govt-1",
        "degree_id": "btech-ece",
        "exam_or_post_name": "Scientist/Engineer 'SC' (Electronics) \u2013 ISRO / DRDO / BEL",
        "conducting_body": "ISRO ICRB / RAC DRDO",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-ece-govt-2",
        "degree_id": "btech-ece",
        "exam_or_post_name": "UPSC Engineering Services Examination (ESE) \u2013 Electronics & Telecom",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-ece-sw-1",
        "degree_id": "btech-ece",
        "target_role": "High-Performance Software Engineer / Backend SDE",
        "pivot_reason": "Translates low-level memory comprehension, computer architecture, and algorithm skills into building scalable backend web and distributed applications.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Data Structures & Java/Go",
            "type": "course",
            "detail": "Solve 150+ coding problems focusing on arrays, trees, and hashing.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "System Design & Databases",
            "type": "course",
            "detail": "Learn PostgreSQL, Redis caching, and microservice APIs.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Production Web Project",
            "type": "portfolio",
            "detail": "Deploy a multi-user scalable web service on AWS/GCP.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "AWS Certified Developer Associate"
        ],
        "why_feasible": "ECE engineers understand hardware registers and memory caching, producing exceptionally memory-efficient code.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-ece-ent-1",
        "degree_id": "btech-ece",
        "idea_title": "Custom IoT Sensor Hardware & PCB Prototyping Lab",
        "description": "Design and manufacture proprietary connected sensor telemetry boards, environmental monitors, and asset trackers for agriculture and logistics clients.",
        "first_milestones": [
          "Design customized multi-layer PCB and fabricate initial 50 units.",
          "Integrate with 4G/NB-IoT cellular connectivity and cloud dashboard.",
          "Secure ongoing manufacturing contracts with 3 logistics providers."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-ece",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Electronic Devices & Digital Design",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master circuit simulations using LTSpice and digital Verilog modeling.",
              "Program microcontrollers (Arduino, STM32).",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Fabricate first custom hardware PCB board."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: VLSI, Embedded & Summer Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn SystemVerilog or Embedded Linux.",
              "Complete 6-8 week semiconductor or IoT internship.",
              "Begin GATE EC preparation."
            ],
            "milestone": "Complete industry internship and publish verified RTL code."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Semiconductor Placement & GATE",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in dream semiconductor drives (Intel, Qualcomm, Texas Instruments).",
              "Appear for GATE EC exam.",
              "Complete FPGA hardware capstone."
            ],
            "milestone": "Secure Tier-1 semiconductor or telecom placement."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-ece",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Silicon & Hardware Portfolio Polish",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 2 verified SystemVerilog testbenches or embedded projects on GitHub.",
              "Earn SystemVerilog / UVM or Altium PCB certification.",
              "Practice technical interview questions in digital logic."
            ],
            "milestone": "Verified silicon verification portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Semiconductor & Tech Firms",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Silicon and Embedded GET roles weekly.",
              "Network with silicon engineers on LinkedIn.",
              "Attend VLSI design symposiums."
            ],
            "milestone": "Secure 3 to 5 technical semiconductor and embedded interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate compensation, tape-out exposure, and tool licenses.",
              "Pre-read team EDA tool flows.",
              "Establish 1-year promotion milestones."
            ],
            "milestone": "Commence silicon engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-chem",
    "id": "btech-chem",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Chemical Engineering",
    "shortName": "B.Tech Chemical",
    "aliases": [
      "BTech Chemical",
      "BE Chemical",
      "Chemical Engineering",
      "B.E. Chemical",
      "btech-chem"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A 4-year engineering discipline focused on chemical thermodynamics, mass and heat transfer, reaction kinetics, process control, and plant design. Chemical engineers scale lab reactions into continuous industrial plants for petroleum, pharmaceuticals, fertilizers, polymers, and specialty chemicals.",
    "key_skills": [
      "Process Simulation (Aspen Plus, HYSYS)",
      "Heat & Mass Transfer Sizing",
      "Chemical Reaction Engineering (CRE)",
      "Piping & Instrumentation Diagrams (P&ID)",
      "Industrial Plant Safety (HAZOP)",
      "Process Dynamics & Control"
    ],
    "subjects_taught": [
      "Chemical Engineering Thermodynamics",
      "Fluid Flow Operations",
      "Heat Transfer Operations",
      "Mass Transfer Operations",
      "Chemical Reaction Engineering",
      "Process Equipment Design",
      "Plant Safety & HAZOP"
    ],
    "typical_employers": [
      "Reliance Industries",
      "Indian Oil (IOCL)",
      "Bharat Petroleum (BPCL)",
      "Hindustan Petroleum (HPCL)",
      "UPL",
      "BASF",
      "Dr. Reddy's",
      "L&T Hydrocarbon"
    ],
    "specializations": [
      {
        "id": "chem-petro",
        "name": "Petroleum & Petrochemical Refining",
        "aliases": [
          "Petrochem"
        ],
        "skillsGained": [
          "Distillation Column Sizing",
          "Cracking Kinetics"
        ],
        "typicalRoles": [
          "Petrochemical Process Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-chem-car-1",
        "degree_id": "btech-chem",
        "role_title": "Process Design / Simulation Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in mass transfer, distillation column design, and Aspen HYSYS simulation directly maps into designing industrial chemical reactors and continuous separation units.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Chemical Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Aspen HYSYS",
          "Heat Exchanger Sizing",
          "P&ID",
          "Mass Balance"
        ],
        "top_employers": [
          "Reliance",
          "Fluor",
          "Technip Energies",
          "L&T Hydrocarbon"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-chem-car-2",
        "degree_id": "btech-chem",
        "role_title": "Refinery Operations / Production Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Reaction engineering, fluid mechanics, and plant safety modules prepare you directly for managing continuous catalytic cracking and petrochemical refinery units.",
        "indicative_salary": {
          "min": 5.0,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Chemical Operations 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Plant Operations",
          "HAZOP Analysis",
          "DCS Monitoring",
          "Safety Protocols"
        ],
        "top_employers": [
          "IOCL",
          "BPCL",
          "Nayara Energy",
          "Tata Chemicals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-chem-car-3",
        "degree_id": "btech-chem",
        "role_title": "Vice President - Petrochemical Plant Operations",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leads multi-billion dollar refinery operations, catalyst life cycle replacement, environmental carbon emission compliance, and mega-turnarounds.",
        "indicative_salary": {
          "min": 26.0,
          "max": 55.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Energy Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Refinery Economics",
          "Capex Strategy",
          "Process Safety Management",
          "Executive Leadership"
        ],
        "top_employers": [
          "Global Oil & Gas Majors",
          "Chemical Conglomerates",
          "EPC EPC Contractors"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-chem-hs-1",
        "degree_id": "btech-chem",
        "program_name": "M.Tech in Chemical Engineering / Process Systems",
        "level": "PG",
        "entrance_exams": [
          "GATE (CH paper)"
        ],
        "eligibility_rule": "B.Tech in Chemical Engineering with valid GATE CH score and min 60% marks for IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "ICT Mumbai",
          "IIT Kanpur",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-chem-hs-2",
        "degree_id": "btech-chem",
        "program_name": "MS in Chemical & Biomolecular Engineering Abroad (US, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "TOEFL / IELTS"
        ],
        "eligibility_rule": "4-year chemical engineering degree with min 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Delft University of Technology",
          "TU Munich",
          "UC Berkeley"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-chem-cert-1",
        "degree_id": "btech-chem",
        "cert_name": "Aspen Plus Process Modeling Certification",
        "provider": "AspenTech",
        "domain": "Chemical Process Simulation",
        "level": "Intermediate",
        "prerequisites": [
          "Thermodynamics, phase equilibria, distillation"
        ],
        "official_url": "https://www.aspentech.com",
        "sourceUrl": "https://www.aspentech.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-chem-cert-2",
        "degree_id": "btech-chem",
        "cert_name": "Certified HAZOP Study Leader / Process Safety",
        "provider": "TUV Rheinland",
        "domain": "Industrial Safety & Risk Assessment",
        "level": "Intermediate",
        "prerequisites": [
          "P&ID diagrams, hazard identification"
        ],
        "official_url": "https://www.tuv.com",
        "sourceUrl": "https://www.tuv.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-chem-cert-3",
        "degree_id": "btech-chem",
        "cert_name": "Certified Energy Manager (CEM)",
        "provider": "Bureau of Energy Efficiency (BEE)",
        "domain": "Industrial Energy Optimization",
        "level": "Intermediate",
        "prerequisites": [
          "Thermodynamic efficiency, boiler audits"
        ],
        "official_url": "https://beeindia.gov.in",
        "sourceUrl": "https://beeindia.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-chem-govt-1",
        "degree_id": "btech-chem",
        "exam_or_post_name": "PSU Recruitment via GATE \u2013 IOCL / ONGC / BPCL / GAIL / HPCL",
        "conducting_body": "Maharatna PSUs",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://iocl.com",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-chem-govt-2",
        "degree_id": "btech-chem",
        "exam_or_post_name": "BARC Scientific Officer (OCES/DGFS) \u2013 Chemical Branch",
        "conducting_body": "Bhabha Atomic Research Centre",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 26,
            "obc": 29,
            "sc_st": 31
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://barc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-chem-sw-1",
        "degree_id": "btech-chem",
        "target_role": "Environmental Sustainability & ESG Consultant",
        "pivot_reason": "Applies mass balance, carbon emission calculations, and environmental regulations into corporate ESG decarbonization strategy.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Carbon Accounting & GHG Protocol",
            "type": "course",
            "detail": "Master Scope 1, 2, and 3 carbon foot-printing for industrial facilities.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "GRI & ESG Reporting Standards",
            "type": "course",
            "detail": "Study Global Reporting Initiative and BRSR frameworks.",
            "estimatedMonths": 1
          },
          {
            "step": 3,
            "title": "Industrial Decarbonization Audit Case Study",
            "type": "portfolio",
            "detail": "Publish a life-cycle carbon audit of a chemical or manufacturing process.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "4 Months",
        "recommended_certs": [
          "GRI Certified Sustainability Professional"
        ],
        "why_feasible": "Chemical engineers know exact stoichiometric balances and thermodynamics required for genuine carbon auditing.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-chem-ent-1",
        "degree_id": "btech-chem",
        "idea_title": "Specialty Bio-Solvents & Green Chemical Formulation Unit",
        "description": "Produce eco-friendly bio-based cleaning chemicals, non-toxic agricultural adjuvants, and biodegradable degreasers from agricultural byproducts.",
        "first_milestones": [
          "Formulate biodegradable solvent in lab and test efficacy against petroleum benchmarks.",
          "Secure chemical patent/trademark and Pollution Control Board consent to establish.",
          "Supply initial 5 tonnes to industrial paint and textile manufacturers."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-chem",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Material Balances & Thermodynamics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master stoichiometric calculations and thermodynamic property prediction.",
              "Learn Aspen Plus simulation basics.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Complete heat and material balance for a chemical plant."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Unit Operations & Refinery Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master distillation column design and heat exchanger networks.",
              "Complete 6-8 week refinery or pharma plant internship.",
              "Begin GATE CH preparation."
            ],
            "milestone": "Complete chemical plant internship report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Placements & GATE Examination",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Appear for GATE CH exam.",
              "Participate in core chemical placement drives (Reliance, BASF, IOCL).",
              "Complete plant design capstone."
            ],
            "milestone": "Secure core chemical engineering placement or PSU selection."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-chem",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Process Simulation Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile 3 complete Aspen HYSYS simulation case studies.",
              "Earn AspenTech or HAZOP certification.",
              "Review technical interview questions in mass transfer."
            ],
            "milestone": "Verified process engineering portfolio online."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Chemical & Energy Firms",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Chemical GET openings weekly.",
              "Network with process leads on LinkedIn.",
              "Attend chemical engineering seminars."
            ],
            "milestone": "Secure 3 to 5 technical design and plant interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate plant vs EPC design consulting path.",
              "Review process safety and OSHA chemical handling protocols.",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence chemical engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-biomedical",
    "id": "btech-biomedical",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Biomedical Engineering",
    "shortName": "B.Tech Biomedical",
    "aliases": [
      "BTech Biomedical",
      "BE Biomedical",
      "Biomedical Engineering",
      "Bioengineering",
      "btech-biomed",
      "btech-biomed",
      "btech-biomedical",
      "Biomedical Engineering"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "An interdisciplinary engineering discipline combining human anatomy and physiology with electronics, biomechanics, medical imaging, biomaterials, and embedded clinical devices. Biomedical engineers design and maintain MRI systems, pacemakers, surgical robotics, ventilators, and smart diagnostic health sensors.",
    "key_skills": [
      "Medical Device Design & Prototyping (ISO 13485)",
      "Biosignal Processing (ECG, EEG, EMG in MATLAB)",
      "Medical Imaging Systems (MRI, CT, Ultrasound)",
      "Clinical Biomaterials & Biocompatibility Testing",
      "Biomechanics & Prosthetic Design (FEA in ANSYS)",
      "Hospital Healthcare Technology Management & Calibration"
    ],
    "subjects_taught": [
      "Human Anatomy & Physiology for Engineers",
      "Biomedical Instrumentation & Sensors",
      "Biosignal Processing",
      "Medical Imaging Systems",
      "Biomaterials & Tissue Engineering",
      "Biomechanics & Rehabilitation Engineering",
      "Hospital Safety & Medical Device Regulatory Affairs"
    ],
    "typical_employers": [
      "GE Healthcare",
      "Siemens Healthineers",
      "Philips Healthcare",
      "Medtronic",
      "Johnson & Johnson MedTech",
      "Stryker",
      "Apollo Hospitals Group",
      "Fortis Healthcare"
    ],
    "specializations": [
      {
        "id": "biomed-devices",
        "name": "Medical Devices & Implants",
        "aliases": [
          "MedTech"
        ],
        "skillsGained": [
          "ISO 13485",
          "Implantable Sensors"
        ],
        "typicalRoles": [
          "Biomedical R&D Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-biomed-car-1",
        "degree_id": "btech-biomedical",
        "role_title": "Medical Device R&D / Product Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in biomedical instrumentation, biosensors, and FDA/CDSCO device regulations maps directly into developing hospital diagnostic monitors and patient therapeutic hardware.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "MedTech India Salary Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ISO 13485",
          "Biomedical Sensors",
          "CAD/SolidWorks",
          "Signal Processing"
        ],
        "top_employers": [
          "GE Healthcare",
          "Philips",
          "Medtronic",
          "Siemens Healthineers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biomed-car-2",
        "degree_id": "btech-biomedical",
        "role_title": "Hospital Biomedical Clinical Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Combines equipment calibration, electrical safety checks, and vendor management into directing hospital ICUs, catheterization labs, and diagnostic radiology fleets.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.2,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Hospital Engineering 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Calibration",
          "NABH Compliance",
          "Equipment Maintenance",
          "Safety Auditing"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Max Healthcare",
          "Fortis",
          "Manipal Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biomed-car-3",
        "degree_id": "btech-biomedical",
        "role_title": "Vice President - MedTech Operations & Regulatory Affairs",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs global clinical trial approvals, multi-national CE/FDA regulatory submissions, and high-volume medical device factory operations.",
        "indicative_salary": {
          "min": 24.0,
          "max": 50.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Healthcare Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "FDA 510(k) Clearance",
          "Clinical Trials Oversight",
          "MedTech Strategy",
          "Engineering Leadership"
        ],
        "top_employers": [
          "Global Medical Device Giants",
          "Surgical Robotics MNCs",
          "Diagnostics Leaders"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-biomed-hs-1",
        "degree_id": "btech-biomedical",
        "program_name": "M.Tech in Biomedical Engineering / Medical Nanotechnology",
        "level": "PG",
        "entrance_exams": [
          "GATE (BM paper)"
        ],
        "eligibility_rule": "B.Tech in Biomedical/ECE/EE with valid GATE BM score and min 60% marks for subsidized IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Delhi",
          "IIT Madras",
          "IISc Bangalore"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biomed-hs-2",
        "degree_id": "btech-biomedical",
        "program_name": "MS in Bioengineering Abroad (US, Switzerland, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "TOEFL / IELTS"
        ],
        "eligibility_rule": "4-year engineering degree with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Johns Hopkins University",
          "ETH Zurich",
          "Georgia Tech"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-biomed-cert-1",
        "degree_id": "btech-biomedical",
        "cert_name": "ISO 13485 Lead Auditor \u2013 Medical Devices QMS",
        "provider": "BSI / TUV SUD",
        "domain": "Medical Device Regulatory Compliance",
        "level": "Intermediate",
        "prerequisites": [
          "Medical device lifecycle, quality management systems"
        ],
        "official_url": "https://www.bsigroup.com",
        "sourceUrl": "https://www.bsigroup.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-biomed-cert-2",
        "degree_id": "btech-biomedical",
        "cert_name": "Certified Biomedical Equipment Technician (CBET)",
        "provider": "AAMI (Association for Advancement of Medical Instrumentation)",
        "domain": "Clinical Engineering & Calibration",
        "level": "Intermediate",
        "prerequisites": [
          "Electrical safety, physiological monitors"
        ],
        "official_url": "https://www.aami.org",
        "sourceUrl": "https://www.aami.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-biomed-cert-3",
        "degree_id": "btech-biomedical",
        "cert_name": "Medical Imaging Signal Analysis with MATLAB",
        "provider": "MathWorks",
        "domain": "Biomedical Signal & Image Processing",
        "level": "Beginner",
        "prerequisites": [
          "Signals and systems, basic MATLAB"
        ],
        "official_url": "https://www.mathworks.com",
        "sourceUrl": "https://www.mathworks.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-biomed-govt-1",
        "degree_id": "btech-biomedical",
        "exam_or_post_name": "Medical Device Officer / Drug Inspector (Medical Devices) \u2013 CDSCO",
        "conducting_body": "UPSC / Central Drugs Standard Control Organisation",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://cdsco.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biomed-govt-2",
        "degree_id": "btech-biomedical",
        "exam_or_post_name": "Biomedical Engineer in AIIMS / Central Government Hospitals",
        "conducting_body": "AIIMS / Ministry of Health",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://aiimsexams.ac.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-biomed-sw-1",
        "degree_id": "btech-biomedical",
        "target_role": "Healthcare AI & Medical Computer Vision Engineer",
        "pivot_reason": "Transfers medical radiology physics and 2D/3D image slice comprehension into training deep learning models for automated CT/MRI tumor segmentation.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Deep Learning for Healthcare Images (PyTorch)",
            "type": "course",
            "detail": "Master convolutional neural networks (U-Net, ResNet) on DICOM data.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "DICOM Processing & MONAI Framework",
            "type": "course",
            "detail": "Learn MONAI (Medical Open Network for AI) for medical image pipelines.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Organ/Tumor Segmentation Model Portfolio",
            "type": "portfolio",
            "detail": "Train and publish an open-source brain tumor segmentation pipeline.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "Coursera AI for Medicine Specialization"
        ],
        "why_feasible": "Biomedical engineers understand clinical radiology pathology and image artifacts that generic computer science coders misunderstand.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-biomed-ent-1",
        "degree_id": "btech-biomedical",
        "idea_title": "Point-of-Care Diagnostic Medical Device Startup",
        "description": "Develop portable, battery-powered diagnostic hardware for rural primary healthcare centers (such as low-cost ECG analyzers or optical hemoglobinometers).",
        "first_milestones": [
          "Build working hardware prototype and validate against commercial lab standards.",
          "Complete electrical safety testing (IEC 60601-1) in accredited lab.",
          "Apply for BIRAC BIG grant for clinical validation."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-biomedical",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Physiology & Biomedical Sensors",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master circuit simulation of bio-amplifiers (ECG/EMG filters).",
              "Learn MATLAB biosignal processing.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Build operational 3-lead ECG amplifier circuit."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Medical Imaging & Hospital Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master MRI/CT image reconstruction algorithms.",
              "Complete 6-8 week hospital clinical engineering internship.",
              "Begin GATE BM prep."
            ],
            "milestone": "Complete hospital equipment calibration report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: MedTech Placements & Capstone Device",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in MedTech recruitment drives (GE, Philips, Siemens).",
              "Appear for GATE BM examination.",
              "Fabricate working patient diagnostic capstone device."
            ],
            "milestone": "Secure Tier-1 MedTech placement or M.Tech admission."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-biomedical",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: MedTech Portfolio & Regulatory Credentialing",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 2 biomedical signal/device projects on GitHub with schematic diagrams.",
              "Earn ISO 13485 or CBET certification.",
              "Practice technical interview questions in sensors and medical safety."
            ],
            "milestone": "Verified MedTech engineering portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Medical Device OEMs & Hospitals",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Biomedical GET and Clinical Engineer openings weekly.",
              "Connect with hospital biomedical directors on LinkedIn.",
              "Attend MedTech innovation conferences."
            ],
            "milestone": "Secure 3 to 5 technical design and clinical interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate R&D device design vs hospital clinical engineering career path.",
              "Review hospital safety standards (NABH/JCI).",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence biomedical engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-electronics",
    "id": "btech-electronics",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Electronics & Instrumentation Engineering",
    "shortName": "B.Tech Instrumentation",
    "aliases": [
      "BTech EIE",
      "BE Instrumentation",
      "Electronics and Instrumentation",
      "B.Tech ICE",
      "Instrumentation Engineering",
      "btech-eie",
      "btech-eie",
      "btech-electronics",
      "Electronics & Instrumentation Engineering"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A specialized 4-year engineering discipline focused on sensor design, industrial process control, automated instrumentation, transducer physics, and Distributed Control Systems (DCS). Instrumentation engineers automate oil refineries, chemical plants, nuclear power stations, and pharmaceutical production facilities.",
    "key_skills": [
      "Industrial Automation & PLC Programming (Siemens, Allen-Bradley)",
      "Distributed Control Systems (DCS) (Honeywell Experion, Emerson DeltaV)",
      "Process Control Loop Tuning (PID, Cascade, Feedforward)",
      "Sensor & Transducer Calibration (Temperature, Pressure, Flow, Level)",
      "SCADA Architecture & Industrial Fieldbus (Modbus, Profibus, Foundation Fieldbus)",
      "Safety Instrumented Systems (SIS & SIL Rating in IEC 61508)"
    ],
    "subjects_taught": [
      "Transducer Engineering & Industrial Sensors",
      "Industrial Instrumentation",
      "Process Control Engineering",
      "Control Systems",
      "PLC, SCADA & Distributed Control Systems",
      "Biomedical & Analytical Instrumentation",
      "Safety Instrumented Systems"
    ],
    "typical_employers": [
      "Honeywell Automation",
      "Yokogawa India",
      "Emerson",
      "ABB",
      "Rockwell Automation",
      "Siemens",
      "IOCL",
      "NTPC",
      "Reliance Industries"
    ],
    "specializations": [
      {
        "id": "eie-automation",
        "name": "Process Automation & Robotics",
        "aliases": [
          "Industrial Automation"
        ],
        "skillsGained": [
          "DCS Systems",
          "SIL Sizing"
        ],
        "typicalRoles": [
          "Process Automation Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-eie-car-1",
        "degree_id": "btech-electronics",
        "role_title": "Instrumentation & Control (I&C) Project Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in transducer physics, control loop tuning, and PLC/SCADA translates directly into sizing industrial field transmitters and configuring automated control loops.",
        "indicative_salary": {
          "min": 5.2,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Instrumentation Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PLC Programming",
          "SCADA",
          "PID Tuning",
          "P&ID Diagrams"
        ],
        "top_employers": [
          "Honeywell",
          "Yokogawa",
          "Emerson",
          "ABB"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eie-car-2",
        "degree_id": "btech-electronics",
        "role_title": "Plant Automation / DCS Maintenance Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Combines distributed control systems (DCS), safety interlocks, and sensor telemetry into operating continuous oil refineries, steel mills, and chemical plants.",
        "indicative_salary": {
          "min": 4.8,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Plant Automation Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "DCS (DeltaV/Honeywell)",
          "Fieldbus Protocols",
          "Calibration",
          "Loop Checks"
        ],
        "top_employers": [
          "Reliance",
          "Tata Steel",
          "IOCL",
          "Vedanta"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eie-car-3",
        "degree_id": "btech-electronics",
        "role_title": "Chief Automation Officer / General Manager - I&C",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs enterprise-wide industrial automation transformations, OT cybersecurity, smart factory IoT integrations, and multi-plant SCADA architectures.",
        "indicative_salary": {
          "min": 24.0,
          "max": 48.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Automation Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "OT Cybersecurity",
          "DCS Migration",
          "Industry 4.0",
          "Engineering Leadership"
        ],
        "top_employers": [
          "Global Automation MNCs",
          "Heavy Industrial Conglomerates",
          "EPC EPC Contractors"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-eie-hs-1",
        "degree_id": "btech-electronics",
        "program_name": "M.Tech in Process Control & Instrumentation / Sensor Systems",
        "level": "PG",
        "entrance_exams": [
          "GATE (IN paper)"
        ],
        "eligibility_rule": "B.Tech in EIE/ICE/ECE with valid GATE IN score and min 60% aggregate for subsidized IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "IIT Roorkee",
          "NIT Trichy",
          "IISc Bangalore"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eie-hs-2",
        "degree_id": "btech-electronics",
        "program_name": "MS in Industrial Control & Automation Abroad (Germany, US)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year engineering degree with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TU Munich",
          "University of Stuttgart",
          "Texas A&M University"
        ],
        "sourceUrl": "https://www.daad.de",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-eie-cert-1",
        "degree_id": "btech-electronics",
        "cert_name": "Certified Automation Professional (CAP)",
        "provider": "ISA (International Society of Automation)",
        "domain": "Industrial Automation & Control",
        "level": "Intermediate",
        "prerequisites": [
          "Process control, industrial networking, safety"
        ],
        "official_url": "https://www.isa.org",
        "sourceUrl": "https://www.isa.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-eie-cert-2",
        "degree_id": "btech-electronics",
        "cert_name": "Functional Safety Engineer (TUV Rheinland SIL)",
        "provider": "TUV Rheinland",
        "domain": "Functional Safety & SIL Sizing",
        "level": "Advanced",
        "prerequisites": [
          "Safety instrumented systems, IEC 61508"
        ],
        "official_url": "https://www.tuv.com",
        "sourceUrl": "https://www.tuv.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-eie-cert-3",
        "degree_id": "btech-electronics",
        "cert_name": "Rockwell Automation Studio 5000 PLC Specialist",
        "provider": "Rockwell Automation",
        "domain": "Programmable Logic Controllers",
        "level": "Intermediate",
        "prerequisites": [
          "Ladder logic, motion control"
        ],
        "official_url": "https://www.rockwellautomation.com",
        "sourceUrl": "https://www.rockwellautomation.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-eie-govt-1",
        "degree_id": "btech-electronics",
        "exam_or_post_name": "PSU Recruitment via GATE \u2013 ONGC / NTPC / IOCL / GAIL (Instrumentation)",
        "conducting_body": "PSU Consortium",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ongcindia.com",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-eie-govt-2",
        "degree_id": "btech-electronics",
        "exam_or_post_name": "ISRO Scientist/Engineer 'SC' (Instrumentation)",
        "conducting_body": "ISRO ICRB",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-eie-sw-1",
        "degree_id": "btech-electronics",
        "target_role": "Industrial IoT (IIoT) & Smart Factory Solutions Architect",
        "pivot_reason": "Bridges industrial sensor fieldbuses (Modbus/OPC-UA) with cloud IoT platforms (AWS IoT SiteWise, Azure IoT Hub) and edge analytics.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "OPC-UA & Industrial Edge Gateways",
            "type": "course",
            "detail": "Connect industrial PLCs to edge computing gateways using MQTT and Node-RED.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "AWS IoT Core & Industrial Telemetry",
            "type": "course",
            "detail": "Configure time-series databases (InfluxDB) and digital twin models.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Live Factory Digital Twin Case Study",
            "type": "portfolio",
            "detail": "Publish a live telemetry dashboard monitoring motor temperature and vibration.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "AWS Certified IoT Specialist Prep"
        ],
        "why_feasible": "Instrumentation engineers uniquely understand sensor noise, industrial protocols, and physical plant limitations.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-eie-ent-1",
        "degree_id": "btech-electronics",
        "idea_title": "Industrial Calibration & Energy Audit Consultancy",
        "description": "Establish an accredited on-site instrument calibration service verifying flow meters, thermal sensors, and pressure safety relief valves for manufacturing plants.",
        "first_milestones": [
          "Procure precision calibrators (Fluke/Beamex) and obtain NABL certification.",
          "Secure annual calibration contracts with 10 chemical and food manufacturing facilities.",
          "Expand into automated continuous emission monitoring systems (CEMS)."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-electronics",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Transducers & Electronic Circuits",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master sensor characteristics (thermocouples, RTDs, strain gauges).",
              "Learn PLC ladder logic programming.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Program and simulate a multi-stage industrial batch process in PLC."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Process Control & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master PID tuning and DCS interface design.",
              "Complete 6-8 week refinery or power plant instrumentation internship.",
              "Begin GATE IN preparation."
            ],
            "milestone": "Complete plant instrumentation calibration report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Automation Placements & GATE",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in automation placement drives (Honeywell, Yokogawa, Emerson).",
              "Appear for GATE IN exam.",
              "Construct working sensor telemetry capstone."
            ],
            "milestone": "Secure core instrumentation engineering placement."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-electronics",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Automation Portfolio & ISA Credentialing",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document 3 PLC/SCADA projects with ladder logic and HMI screens on GitHub/LinkedIn.",
              "Earn Rockwell PLC or ISA certification.",
              "Practice technical interview topics in loop tuning and fieldbus."
            ],
            "milestone": "Verified industrial automation portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Core Automation OEMs & Plants",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Instrumentation GET openings weekly.",
              "Network with plant automation managers on LinkedIn.",
              "Attend industrial automation trade expos."
            ],
            "milestone": "Secure 3 to 5 technical design and plant interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate automation vendor vs plant maintenance career path.",
              "Review industrial functional safety guidelines.",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence instrumentation engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-aero",
    "id": "btech-aero",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Aerospace & Aeronautical Engineering",
    "shortName": "B.Tech Aerospace",
    "aliases": [
      "BTech Aerospace",
      "BE Aeronautical",
      "Aeronautical Engineering",
      "Aerospace Engineering",
      "B.Tech Aero",
      "rocket engineer",
      "btech-aero"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A high-technology 4-year engineering discipline focused on aerodynamics, aircraft structures, propulsion engines, orbital mechanics, flight dynamics, and avionics control. Aerospace engineers design civilian commercial airliners, military combat jets, space launch vehicles, satellites, and unmanned aerial vehicles (UAVs / drones).",
    "key_skills": [
      "Aerodynamic CFD Modeling (ANSYS Fluent, OpenFOAM)",
      "Aerospace Structural Analysis & Composite Materials (Nastran/Patran)",
      "Gas Turbine & Rocket Propulsion Engine Sizing",
      "Flight Mechanics, Orbital Dynamics & Navigation (MATLAB / GMAT)",
      "Avionics, Autopilot & Drone Flight Controllers (PX4, ArduPilot)",
      "Spacecraft Systems Engineering & Thermal Vacuum Testing"
    ],
    "subjects_taught": [
      "Low & High Speed Aerodynamics",
      "Aircraft Structures & Aeroelasticity",
      "Aerospace Propulsion & Rocketry",
      "Flight Mechanics & Stability Control",
      "Avionics & Navigation Systems",
      "Spacecraft Systems & Orbital Mechanics",
      "Computational Fluid Dynamics"
    ],
    "typical_employers": [
      "Hindustan Aeronautics (HAL)",
      "ISRO",
      "DRDO",
      "Airbus India",
      "Boeing India",
      "Collins Aerospace",
      "Tata Advanced Systems (TASL)",
      "IdeaForge Drones",
      "Skyroot Aerospace"
    ],
    "specializations": [
      {
        "id": "aero-propulsion",
        "name": "Rocketry & Propulsion",
        "aliases": [
          "Propulsion"
        ],
        "skillsGained": [
          "Rocket Combustion",
          "Turbomachinery"
        ],
        "typicalRoles": [
          "Propulsion Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-aero-car-1",
        "degree_id": "btech-aero",
        "role_title": "Aerodynamicist / CFD Analysis Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in compressible aerodynamics, boundary layer theory, and computational fluid dynamics qualifies you directly for airframe lift/drag optimization.",
        "indicative_salary": {
          "min": 6.0,
          "max": 12.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Aerospace India Salary Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ANSYS Fluent",
          "OpenFOAM",
          "Aerodynamics",
          "MATLAB"
        ],
        "top_employers": [
          "Airbus",
          "Boeing India",
          "Collins Aerospace",
          "HAL"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aero-car-2",
        "degree_id": "btech-aero",
        "role_title": "Drone Systems & Autopilot Guidance Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Combines flight dynamics, control systems, and UAV telemetry into programming autonomous guidance algorithms for commercial and defense drones.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Drone Industry Index 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PX4 Autopilot",
          "ROS",
          "Flight Testing",
          "Avionics"
        ],
        "top_employers": [
          "IdeaForge",
          "Garuda Aerospace",
          "TASL",
          "Adani Defence"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aero-car-3",
        "degree_id": "btech-aero",
        "role_title": "Chief Aircraft Architect / Director of Aerospace Programs",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leads complete aircraft or space vehicle certification, structural airworthiness approvals, and multi-disciplinary aerospace development programs.",
        "indicative_salary": {
          "min": 26.0,
          "max": 58.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page Aerospace Report 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Airworthiness Certification",
          "DGCA / FAA Regulations",
          "Systems Engineering",
          "Program Leadership"
        ],
        "top_employers": [
          "Global Aerospace OEMs",
          "NewSpace Launch Unicorns",
          "Defense Aerospace Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-aero-hs-1",
        "degree_id": "btech-aero",
        "program_name": "M.Tech in Aerospace Engineering / Hypersonics / Propulsion",
        "level": "PG",
        "entrance_exams": [
          "GATE (AE paper)"
        ],
        "eligibility_rule": "B.Tech in Aerospace/Mechanical with valid GATE AE score and min 60% aggregate for subsidized IIT/IISc admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Bombay",
          "IIT Madras",
          "IIT Kanpur"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aero-hs-2",
        "degree_id": "btech-aero",
        "program_name": "MS in Aerospace Engineering Abroad (US, France, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year engineering degree with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "ISAE-Supaero France",
          "TU Delft",
          "Purdue University",
          "Georgia Tech"
        ],
        "sourceUrl": "https://www.isae-supaero.fr",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-aero-cert-1",
        "degree_id": "btech-aero",
        "cert_name": "DGCA Certified Remote Pilot License (Drone Pilot)",
        "provider": "DGCA Approved Remote Pilot Training Organizations (RPTO)",
        "domain": "Drone Aviation & Flight Operations",
        "level": "Beginner",
        "prerequisites": [
          "Class 10+2 passing, medical fitness"
        ],
        "official_url": "https://digitalsky.dgca.gov.in",
        "sourceUrl": "https://digitalsky.dgca.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Low (<5k)"
      },
      {
        "id": "btech-aero-cert-2",
        "degree_id": "btech-aero",
        "cert_name": "Siemens Simcenter STAR-CCM+ Aerodynamic Specialist",
        "provider": "Siemens Digital Industries",
        "domain": "CFD & Thermal Aerodynamics",
        "level": "Intermediate",
        "prerequisites": [
          "Fluid mechanics, compressible flow"
        ],
        "official_url": "https://www.siemens.com",
        "sourceUrl": "https://www.siemens.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-aero-cert-3",
        "degree_id": "btech-aero",
        "cert_name": "MSC Nastran & Patran Aerospace Structural FEA",
        "provider": "Hexagon / MSC Software",
        "domain": "Aerospace Composite Structures",
        "level": "Intermediate",
        "prerequisites": [
          "Strength of materials, composite lamina"
        ],
        "official_url": "https://hexagon.com",
        "sourceUrl": "https://hexagon.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-aero-govt-1",
        "degree_id": "btech-aero",
        "exam_or_post_name": "ISRO Scientist/Engineer 'SC' (Aerospace)",
        "conducting_body": "ISRO ICRB",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aero-govt-2",
        "degree_id": "btech-aero",
        "exam_or_post_name": "DRDO Scientist 'B' (Aeronautical) via GATE",
        "conducting_body": "RAC DRDO",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rac.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-aero-sw-1",
        "degree_id": "btech-aero",
        "target_role": "Automotive Aerodynamicist & Thermal Management Engineer",
        "pivot_reason": "Applies external aerodynamic flow modeling and computational fluid dynamics to reduce EV drag coefficients and optimize battery cooling airflow.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Automotive Surface Modeling (Class A)",
            "type": "course",
            "detail": "Master automotive aerodynamic surface styling in CATIA.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Vehicle Underbody CFD Simulation",
            "type": "portfolio",
            "detail": "Simulate full-car aerodynamic drag reduction using OpenFOAM.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Wind Tunnel Testing Methodology",
            "type": "course",
            "detail": "Study physical aerodynamic wind tunnel scale testing.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "5 Months",
        "recommended_certs": [
          "ANSYS CFD Certified Associate"
        ],
        "why_feasible": "Aerospace engineers possess the highest mathematical fluid dynamics competency of all engineering streams.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-aero-ent-1",
        "degree_id": "btech-aero",
        "idea_title": "Autonomous Drone Surveying & Agrispray UAV Manufacturing",
        "description": "Design, assemble, type-certify, and market DGCA-compliant enterprise drones for agricultural crop health mapping, mining volumetric surveys, and infrastructure inspection.",
        "first_milestones": [
          "Build carbon-fiber quadcopter prototype and integrate PX4 autopilot.",
          "Obtain DGCA Type Certification under Drone Rules 2021.",
          "Sign survey contracts with 5 mining or solar plant developers."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-aero",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Fluid Mechanics & Aerodynamic Theory",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master airfoil lift/drag polar generation and low-speed wind tunnel testing.",
              "Model aircraft components in 3D CAD.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Design and simulate an NACA airfoil polar in OpenFOAM."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Propulsion, Aircraft Structures & HAL/ISRO Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master supersonic nozzle sizing and composite FEA.",
              "Complete 6-8 week aerospace research or defense internship.",
              "Begin GATE AE prep."
            ],
            "milestone": "Complete aerospace research internship paper."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Core Aerospace Hiring & GATE Exam",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in aerospace placement drives (HAL, Boeing, Airbus, Skyroot).",
              "Appear for GATE AE exam.",
              "Complete UAV flight test capstone."
            ],
            "milestone": "Secure core aerospace engineering placement or ISRO selection."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-aero",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: CFD & Flight Simulation Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 3 detailed aerodynamic CFD studies on GitHub/GrabCAD.",
              "Earn DGCA Drone Pilot or Siemens STAR-CCM+ certification.",
              "Review technical interview topics in gas dynamics."
            ],
            "milestone": "Verified aerospace portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Aerospace & Drone OEMs",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Aerospace GET openings weekly.",
              "Network with aerospace leads on LinkedIn.",
              "Attend national aerospace symposiums."
            ],
            "milestone": "Secure 3 to 5 technical design and flight interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate commercial aviation vs defense/space launch career path.",
              "Review aircraft airworthiness certification standards.",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence aerospace engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-environmental",
    "id": "btech-environmental",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Environmental Engineering",
    "shortName": "B.Tech Environmental",
    "aliases": [
      "BTech Environmental",
      "BE Environmental",
      "Environmental Engineering",
      "B.E. Environmental",
      "btech-enviro",
      "btech-enviro",
      "btech-environmental",
      "Environmental Engineering"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A 4-year engineering discipline focused on water and wastewater treatment, air pollution monitoring, solid waste management, environmental impact assessment (EIA), and climate sustainability. Environmental engineers design municipal treatment plants, industrial effluent zero-liquid-discharge (ZLD) systems, and urban pollution control architectures.",
    "key_skills": [
      "Water & Industrial Wastewater Treatment Design (STP/ETP/RO)",
      "Air Pollution Modeling & Dispersion Analysis (AERMOD)",
      "Environmental Impact Assessment (EIA) & Statutory Clearance",
      "Solid & Hazardous Waste Remediation",
      "Environmental Auditing & ISO 14001 Compliance",
      "Carbon Footprint Accounting & Life Cycle Assessment (LCA)"
    ],
    "subjects_taught": [
      "Environmental Chemistry & Microbiology",
      "Water Supply Engineering",
      "Wastewater Treatment & Disposal",
      "Air Pollution Control & Noise Engineering",
      "Solid & Hazardous Waste Management",
      "Environmental Impact Assessment & Environmental Law",
      "Industrial Waste Treatment & Clean Technologies"
    ],
    "typical_employers": [
      "L&T Water",
      "Thermax",
      "Suez India",
      "Veolia",
      "Tata Consulting Engineers",
      "Central Pollution Control Board (CPCB)",
      "Environmental Consultancies",
      "Ramky Enviro"
    ],
    "specializations": [
      {
        "id": "enviro-waste",
        "name": "Wastewater & Industrial Effluent Engineering",
        "aliases": [
          "Water Treatment"
        ],
        "skillsGained": [
          "ETP Sizing",
          "Membrane Bioreactors"
        ],
        "typicalRoles": [
          "Wastewater Design Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-enviro-car-1",
        "degree_id": "btech-environmental",
        "role_title": "Water & Wastewater Treatment Plant Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in biological wastewater treatment, hydraulic sizing, and membrane separation qualifies you directly for designing municipal and industrial ETP/STP facilities.",
        "indicative_salary": {
          "min": 4.8,
          "max": 9.2,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Water Engineering 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ETP/STP Sizing",
          "Hydraulic Flow",
          "AutoCAD",
          "Water Quality"
        ],
        "top_employers": [
          "Suez",
          "Veolia",
          "Thermax",
          "L&T Water"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-enviro-car-2",
        "degree_id": "btech-environmental",
        "role_title": "Environmental Impact Assessment (EIA) Consultant",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Environmental legislation, baseline air/water sampling, and socioeconomic impact assessment prepare you for securing statutory MoEFCC environmental clearances.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Glassdoor Environmental Consulting 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "EIA Studies",
          "MoEFCC Clearances",
          "AERMOD Dispersion",
          "GIS"
        ],
        "top_employers": [
          "Tata Consulting Engineers",
          "AECOM",
          "ERM India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-enviro-car-3",
        "degree_id": "btech-environmental",
        "role_title": "Chief Sustainability Officer / VP - Environmental Compliance",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directs corporate zero-liquid-discharge compliance, global Science Based Targets (SBTi) decarbonization, and ESG investor disclosures.",
        "indicative_salary": {
          "min": 22.0,
          "max": 46.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Michael Page ESG Guide 2025 (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Net-Zero Strategy",
          "Corporate ESG",
          "Statutory Compliance",
          "Leadership"
        ],
        "top_employers": [
          "Global Manufacturing Conglomerates",
          "Infrastructure Developers",
          "Mining Giants"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-enviro-hs-1",
        "degree_id": "btech-environmental",
        "program_name": "M.Tech in Environmental Engineering & Management",
        "level": "PG",
        "entrance_exams": [
          "GATE (ES / CE paper)"
        ],
        "eligibility_rule": "B.Tech in Environmental/Civil/Chemical with valid GATE score and min 60% aggregate for subsidized IIT/NIT admissions with \u20b912,400/month stipend.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Kharagpur",
          "IIT Roorkee",
          "IIT Delhi"
        ],
        "sourceUrl": "https://gate2025.iitr.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-enviro-hs-2",
        "degree_id": "btech-environmental",
        "program_name": "MS in Environmental & Resource Management Abroad (Netherlands, Germany)",
        "level": "PG",
        "entrance_exams": [
          "GRE",
          "IELTS / TOEFL"
        ],
        "eligibility_rule": "4-year engineering degree with minimum 65%+ marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TU Delft",
          "Wageningen University",
          "ETH Zurich"
        ],
        "sourceUrl": "https://www.wur.nl",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-enviro-cert-1",
        "degree_id": "btech-environmental",
        "cert_name": "ISO 14001:2015 Lead Auditor (EMS)",
        "provider": "IRCA / TUV SUD",
        "domain": "Environmental Management Systems",
        "level": "Intermediate",
        "prerequisites": [
          "Environmental auditing principles, ISO standards"
        ],
        "official_url": "https://www.tuv.com",
        "sourceUrl": "https://www.tuv.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-enviro-cert-2",
        "degree_id": "btech-environmental",
        "cert_name": "Certified Sustainability & Climate Risk (SCR)",
        "provider": "GARP",
        "domain": "Climate Risk & ESG",
        "level": "Intermediate",
        "prerequisites": [
          "Climate policy, greenhouse gas accounting"
        ],
        "official_url": "https://www.garp.org/scr",
        "sourceUrl": "https://www.garp.org/scr",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-enviro-cert-3",
        "degree_id": "btech-environmental",
        "cert_name": "QCI-NABET Functional Area Expert (FAE) - Water Pollution",
        "provider": "Quality Council of India (QCI)",
        "domain": "EIA Regulatory Clearances",
        "level": "Intermediate",
        "prerequisites": [
          "Environmental legislation, EIA manual"
        ],
        "official_url": "https://nabet.qci.org.in",
        "sourceUrl": "https://nabet.qci.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-enviro-govt-1",
        "degree_id": "btech-environmental",
        "exam_or_post_name": "Central Pollution Control Board (CPCB) Scientist 'B'",
        "conducting_body": "Central Pollution Control Board",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://cpcb.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-enviro-govt-2",
        "degree_id": "btech-environmental",
        "exam_or_post_name": "State Pollution Control Board Assistant Environmental Engineer (AEE)",
        "conducting_body": "State PSCs",
        "eligibility_rule": {
          "degreeFamily": "engineering",
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          }
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://cpcb.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-enviro-sw-1",
        "degree_id": "btech-environmental",
        "target_role": "Corporate ESG & Climate Risk Analyst",
        "pivot_reason": "Applies environmental baseline data, carbon accounting, and regulatory compliance into investor ESG rating frameworks.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Corporate GHG Protocol Accounting",
            "type": "course",
            "detail": "Master Scope 1, 2, 3 carbon footprint calculation methodologies.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "ESG Ratings (MSCI, DJSI, CDP)",
            "type": "course",
            "detail": "Analyze ESG questionnaire disclosure standards for corporate equity.",
            "estimatedMonths": 1
          },
          {
            "step": 3,
            "title": "Corporate Decarbonization Roadmap",
            "type": "portfolio",
            "detail": "Publish a net-zero transition roadmap for an industrial enterprise.",
            "estimatedMonths": 1
          }
        ],
        "typical_duration": "4 Months",
        "recommended_certs": [
          "GARP Sustainability and Climate Risk (SCR)"
        ],
        "why_feasible": "Environmental engineers uniquely understand actual thermodynamic emissions rather than relying on generic software estimates.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-enviro-ent-1",
        "degree_id": "btech-environmental",
        "idea_title": "Modular Sewage & Effluent Recycling Solutions (Compact STP/ETP)",
        "description": "Fabricate packaged, containerized membrane bioreactor (MBR) sewage treatment units for residential apartments, hotels, and industrial parks.",
        "first_milestones": [
          "Design 10 KLD modular containerized MBR treatment plant.",
          "Establish supply chain for aerators, pumps, and ultrafiltration membranes.",
          "Secure first installation contract with a commercial hospital or resort."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Up to \u20b920 Lakhs grant for prototype validation.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "CGTMSE Collateral-Free Loan",
            "agency": "Ministry of MSME",
            "benefits": "Credit guarantee up to \u20b92 Crores for precision tech tooling.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-environmental",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Environmental Chemistry & Water Lab",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master water quality parameter testing (BOD, COD, TDS, Heavy Metals).",
              "Model basic pipe network flow in EPANET.",
              "Maintain CGPA > 7.5."
            ],
            "milestone": "Complete comprehensive river or industrial effluent characterization study."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Wastewater Treatment Design & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master biological treatment kinetic modeling (activated sludge, SBR).",
              "Complete 6-8 week STP/ETP plant design internship.",
              "Begin GATE ES preparation."
            ],
            "milestone": "Complete wastewater treatment design project report."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Environmental Engineering Placements & GATE",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in water infrastructure placement drives (Suez, L&T Water).",
              "Appear for GATE ES exam.",
              "Complete EIA capstone study for an industrial zone."
            ],
            "milestone": "Secure core environmental placement or CPCB selection."
          }
        ]
      },
      "completed": {
        "degree_id": "btech-environmental",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Phase 1: Environmental Project Portfolio & ISO Credentialing",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish 3 detailed ETP design and EIA calculation reports on LinkedIn.",
              "Earn ISO 14001 or GARP SCR certification.",
              "Review technical interview topics in water and air treatment."
            ],
            "milestone": "Verified environmental portfolio live."
          },
          {
            "stepNumber": 2,
            "title": "Phase 2: Target Water Infrastructure & ESG Firms",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to 15 Environmental GET and Consulting openings weekly.",
              "Network with sustainability directors on LinkedIn.",
              "Attend environmental tech expos."
            ],
            "milestone": "Secure 3 to 5 technical design and consulting interviews."
          },
          {
            "stepNumber": 3,
            "title": "Phase 3: Offer Acceptance & Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Evaluate water treatment plant design vs corporate ESG consulting.",
              "Review statutory pollution control board norms.",
              "Establish 1-year progression goals."
            ],
            "milestone": "Commence environmental engineering role."
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-agri",
    "id": "btech-agri",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Agricultural Engineering",
    "shortName": "B.Tech Agri Engg",
    "aliases": [
      "BTech Agricultural Engineering",
      "BE Agricultural Engineering",
      "Farm Machinery Engineering",
      "B.Tech Agri",
      "btech-agri"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "ICAR",
    "overview": "A specialized 4-year engineering program that integrates mechanical, civil, electrical, and chemical engineering principles with agricultural science. Students master farm machinery design, precision irrigation systems, post-harvest processing, and renewable agro-energy technologies.",
    "key_skills": [
      "Tractor & Agricultural Machinery Design",
      "Micro-Irrigation & Water Resource Engineering",
      "Post-Harvest Processing & Cold Chain Systems",
      "GIS & Remote Sensing for Precision Farming",
      "AutoCAD & SolidWorks Agro-Equipment Modeling",
      "Soil Mechanics & Watershed Conservation"
    ],
    "subjects_taught": [
      "Farm Machinery & Power Engineering",
      "Soil and Water Conservation Engineering",
      "Post Harvest Engineering & Food Processing",
      "Irrigation & Drainage Engineering",
      "Renewable Energy Sources in Agriculture",
      "Design of Agricultural Tractors"
    ],
    "typical_employers": [
      "Mahindra & Mahindra Farm Equipment",
      "John Deere India",
      "Jain Irrigation Systems",
      "TAFE",
      "ITC Agri Business",
      "NABARD",
      "FCI"
    ],
    "specializations": [
      {
        "id": "agri-machinery",
        "name": "Farm Power & Machinery",
        "aliases": [
          "Tractor Engineering"
        ],
        "skillsGained": [
          "Hydraulics",
          "Powertrain Design"
        ],
        "typicalRoles": [
          "Machinery Design Engineer"
        ]
      },
      {
        "id": "agri-irrigation",
        "name": "Soil & Water Conservation",
        "aliases": [
          "Irrigation Tech"
        ],
        "skillsGained": [
          "Drip Irrigation",
          "Hydrology"
        ],
        "typicalRoles": [
          "Irrigation Project Engineer"
        ]
      }
    ],
    "sourceUrl": "https://icar.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-agri-c1",
        "degree_id": "btech-agri",
        "role_title": "Agricultural Machinery Design Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in farm machinery mechanics, powertrains, and kinematics directly qualifies you for designing tractors and precision implements.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AMCAT / Industry Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "SolidWorks",
          "Tractor Powertrain",
          "Hydraulics",
          "DFM"
        ],
        "top_employers": [
          "John Deere",
          "Mahindra Tractors",
          "TAFE",
          "Escorts Kubota"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-agri-c2",
        "degree_id": "btech-agri",
        "role_title": "Irrigation Systems & Micro-Drainage Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Training in pressurized micro-irrigation, pipe hydraulics, and soil-water relationships maps directly to large-scale drip and sprinkler project execution.",
        "indicative_salary": {
          "min": 4.0,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AgroEngineering Digest (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "AutoCAD",
          "Hydraulic Sizing",
          "Drip Design",
          "Soil Water Dynamics"
        ],
        "top_employers": [
          "Jain Irrigation",
          "Netafim India",
          "EPC Mahindra"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-agri-c3",
        "degree_id": "btech-agri",
        "role_title": "Chief Agro-Industrial Operations Manager",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Comprehensive mastery of post-harvest handling, bulk storage, and agro-processing equipment enables leadership of industrial processing plants and seed hubs.",
        "indicative_salary": {
          "min": 14.0,
          "max": 26.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Agro Industry Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Plant Operations",
          "Cold Chain Logistics",
          "Agro-Equipment R&D",
          "P&L Management"
        ],
        "top_employers": [
          "ITC Foods",
          "Cargill India",
          "Adani Agri Logistics",
          "Olam Agro"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-agri-hs1",
        "degree_id": "btech-agri",
        "program_name": "M.Tech in Farm Machinery and Power Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (AG)",
          "ICAR AIEEA-PG"
        ],
        "eligibility_rule": "B.Tech Agricultural Engineering / Mechanical Engineering with minimum 60% aggregate or 6.5 OGPA on 10-point scale.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "Punjab Agricultural University",
          "TNAU Coimbatore",
          "IARI New Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-agri-hs2",
        "degree_id": "btech-agri",
        "program_name": "M.Tech in Soil & Water Conservation Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (AG)",
          "ICAR AIEEA-PG"
        ],
        "eligibility_rule": "B.Tech Agricultural Engineering / Civil Engineering with minimum 60% aggregate or equivalent.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "GBPUAT Pantnagar",
          "PAU Ludhiana",
          "CAET Junagadh"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-agri-ct1",
        "degree_id": "btech-agri",
        "cert_name": "Certified Precision Agriculture Specialist",
        "provider": "International Society of Precision Agriculture",
        "domain": "Precision Agriculture",
        "level": "Intermediate",
        "prerequisites": [
          "B.Tech degree or student status",
          "GIS fundamentals"
        ],
        "official_url": "https://www.ispag.org",
        "sourceUrl": "https://www.ispag.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-agri-ct2",
        "degree_id": "btech-agri",
        "cert_name": "Certified Micro-Irrigation Design Engineer",
        "provider": "Jain Irrigation Training Institute",
        "domain": "Irrigation Engineering",
        "level": "Intermediate",
        "prerequisites": [
          "Fluid Mechanics knowledge"
        ],
        "official_url": "https://www.jains.com",
        "sourceUrl": "https://www.jains.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-agri-ct3",
        "degree_id": "btech-agri",
        "cert_name": "GIS & Remote Sensing for Agriculture Certification",
        "provider": "ISRO - IIRS Dehradun",
        "domain": "Geospatial Agtech",
        "level": "Advanced",
        "prerequisites": [
          "Basic Earth Sciences or Engineering"
        ],
        "official_url": "https://www.iirs.gov.in",
        "sourceUrl": "https://www.iirs.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-agri-gv1",
        "degree_id": "btech-agri",
        "exam_or_post_name": "Agricultural Research Service (ARS) / NET - Farm Machinery",
        "conducting_body": "ASRB / ICAR",
        "eligibility_rule": {
          "degreeFamily": "Agricultural Engineering",
          "allowedDegrees": [
            "B.Tech Agri Engg + M.Tech AG"
          ],
          "mandatorySubjects": [
            "Farm Machinery",
            "Agro-Energy"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Notification ASRB ARS-2025. Age relaxed as per GOI norms."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://asrb.org.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-agri-gv2",
        "degree_id": "btech-agri",
        "exam_or_post_name": "Assistant Engineer (Agricultural Engineering) - State PSCs",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Agricultural Engineering",
          "allowedDegrees": [
            "B.Tech Agricultural Engineering"
          ],
          "mandatorySubjects": [
            "Agri Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Recruited for State Agriculture & Water Resources Departments."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-agri-sw1",
        "degree_id": "btech-agri",
        "target_role": "Agtech IoT & Drone Solutions Architect",
        "pivot_reason": "Leverage domain understanding of crops and farm mechanization into software-driven precision agriculture and drone telemetry.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Drone Pilot Certification (DGCA Remote Pilot License)",
            "type": "cert",
            "detail": "Obtain DGCA remote pilot license for agricultural spraying and mapping.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Python & IoT Telemetry for Edge Devices",
            "type": "course",
            "detail": "Master Raspberry Pi/ESP32 sensor telemetry for soil moisture and NDVI imaging.",
            "estimatedMonths": 4
          },
          {
            "step": 3,
            "title": "Agtech Drone Startup Capstone",
            "type": "portfolio",
            "detail": "Build end-to-end multispectral orchard mapping system with aerial flight logs.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "DGCA Remote Pilot License",
          "Python for Data Science"
        ],
        "why_feasible": "Direct synergy between agricultural machinery systems and autonomous aerial agricultural spraying.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-agri-ent1",
        "degree_id": "btech-agri",
        "idea_title": "Custom Hiring & Precision Agro-Service Enterprise",
        "description": "Setup a rural tech-enabled farm machinery rental and smart drone spraying service for smallholder farming clusters.",
        "first_milestones": [
          "Acquire 2 high-capacity modern tractors and 1 DGCA-approved ag-drone under state subsidy.",
          "Onboard 150 local farmers via mobile booking app for automated tillage and spraying.",
          "Achieve break-even by harvest season with structured operating lease contracts."
        ],
        "relevant_schemes": [
          {
            "name": "Sub-Mission on Agricultural Mechanization (SMAM)",
            "agency": "Ministry of Agriculture & Farmers Welfare",
            "benefits": "Up to 40-50% subsidy on establishment of Custom Hiring Centres (CHC).",
            "sourceUrl": "https://agrimachinery.nic.in"
          },
          {
            "name": "Agriculture Infrastructure Fund (AIF)",
            "agency": "Department of Agriculture & Farmers Welfare",
            "benefits": "Interest subvention of 3% per annum up to 2 Crore for post-harvest infrastructure.",
            "sourceUrl": "https://agriinfra.dac.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-agri",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Foundational Engineering & Farm Machinery Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master engineering drawing, CAD, and agricultural tractor mechanics.",
              "Complete field workshop on diesel engines and seed drills."
            ],
            "milestone": "First CAD implement model completed"
          },
          {
            "stepNumber": 2,
            "title": "Precision Irrigation & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Lead summer internship at tractor OEM (John Deere/Mahindra) or Jain Irrigation.",
              "Complete DGCA drone spraying orientation and post-harvest lab."
            ],
            "milestone": "Summer industrial internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "Final Design Project & GATE AG Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Publish capstone on automated harvester or smart drip system.",
              "Prepare rigorously for GATE (AG) and campus placements."
            ],
            "milestone": "GATE AG qualification & placement offer"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-agri",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Technical Resume Polish & Agro-Equipment Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Consolidate tractor/implement CAD designs and project reports into GitHub/Behance.",
              "Review fundamentals of thermodynamics and hydraulic circuits."
            ],
            "milestone": "Polished portfolio of farm equipment CAD models"
          },
          {
            "stepNumber": 2,
            "title": "Direct OEM & Agtech Job Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to Mahindra, John Deere, Netafim, and agtech startups.",
              "Participate in technical interviews and machine design tests."
            ],
            "milestone": "3+ Interview rounds completed"
          },
          {
            "stepNumber": 3,
            "title": "Role Onboarding & Field Project Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Accept design/service engineer offer and begin field engineering assignments.",
              "Explore ARS/M.Tech evening research avenues."
            ],
            "milestone": "Successful probation completion as Agro Engineer"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-biotech",
    "id": "btech-biotech",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Biotechnology",
    "shortName": "B.Tech Biotech",
    "aliases": [
      "BTech Biotechnology",
      "BE Biotechnology",
      "Industrial Biotechnology",
      "B.Tech Bio Tech",
      "btech-biotech"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A 4-year engineering discipline bridging molecular biology, biochemistry, and bioprocess engineering. It trains students in bioreactor design, genetic engineering, recombinant DNA technology, enzyme kinetics, and downstream processing for biopharmaceuticals and industrial bioproducts.",
    "key_skills": [
      "Bioreactor Operation & Bioprocess Optimization",
      "Recombinant DNA Technology & Molecular Cloning",
      "Downstream Processing & Chromatography (HPLC/FPLC)",
      "Bioinformatics & Molecular Docking (PyMOL, BLAST)",
      "Microbial Fermentation & Cell Culture Techniques",
      "Regulatory Affairs & cGMP Compliance in Biopharma"
    ],
    "subjects_taught": [
      "Bioprocess Engineering & Bioreactor Design",
      "Molecular Biology & Genetic Engineering",
      "Biochemical Thermodynamics & Kinetics",
      "Downstream Processing",
      "Immunotechnology & Cell Culture",
      "Bioinformatics & Computational Biology"
    ],
    "typical_employers": [
      "Biocon",
      "Serum Institute of India",
      "Dr. Reddy's Laboratories",
      "Bharat Biotech",
      "Novozymes",
      "Syngene International",
      "Reliance Life Sciences"
    ],
    "specializations": [
      {
        "id": "biotech-pharma",
        "name": "Biopharmaceutical Engineering",
        "aliases": [
          "Biopharma"
        ],
        "skillsGained": [
          "Monoclonal Antibodies",
          "cGMP"
        ],
        "typicalRoles": [
          "Bioprocess Engineer"
        ]
      },
      {
        "id": "biotech-bioinfo",
        "name": "Computational Biology & Genomics",
        "aliases": [
          "Bioinformatics"
        ],
        "skillsGained": [
          "Next-Gen Sequencing",
          "Python for Biology"
        ],
        "typicalRoles": [
          "Bioinformatics Scientist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-biotech-c1",
        "degree_id": "btech-biotech",
        "role_title": "Upstream / Downstream Bioprocess Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in bioreactor operation, fermentation kinetics, and chromatography directly prepares you for vaccine and biologic manufacturing.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Biotech Talent Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Fermentation",
          "HPLC",
          "Bioreactor Control",
          "cGMP"
        ],
        "top_employers": [
          "Biocon",
          "Serum Institute",
          "Syngene",
          "Dr. Reddy's"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biotech-c2",
        "degree_id": "btech-biotech",
        "role_title": "Associate Bioinformatics Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Computational biology, sequence alignment algorithms, and Python data structures map directly into genomic variant analysis pipelines.",
        "indicative_salary": {
          "min": 4.0,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "BioSpectrum Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Python",
          "R for Genomics",
          "BLAST",
          "NGS Pipelines"
        ],
        "top_employers": [
          "Thermo Fisher",
          "Strand Life Sciences",
          "MedGenome"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biotech-c3",
        "degree_id": "btech-biotech",
        "role_title": "Principal Scientist / Biomanufacturing Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Mastery of scale-up engineering, sterile facility compliance, and molecular tech transfers qualifies you for commanding full biomanufacturing plants.",
        "indicative_salary": {
          "min": 16.0,
          "max": 32.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharma Leadership Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Scale-up Operations",
          "FDA cGMP Audit",
          "Tech Transfer",
          "Biological CMC"
        ],
        "top_employers": [
          "Novozymes",
          "Biocon Biologics",
          "Bharat Biotech"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-biotech-hs1",
        "degree_id": "btech-biotech",
        "program_name": "M.Tech in Biotechnology / Bioprocess Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (BT)"
        ],
        "eligibility_rule": "B.Tech Biotechnology / Biochemical Engineering with minimum 60% aggregate or 6.5 CGPA.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Delhi",
          "IIT Kharagpur",
          "IIT Madras",
          "ICT Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biotech-hs2",
        "degree_id": "btech-biotech",
        "program_name": "MS / Ph.D. in Molecular Bioengineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (BT)",
          "DBT-BET (JRF)"
        ],
        "eligibility_rule": "B.Tech in Biotechnology or allied field with valid GATE/DBT-BET scorecard.",
        "typical_duration": "2-5 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Bombay",
          "NCBS Bengaluru",
          "JNU New Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-biotech-ct1",
        "degree_id": "btech-biotech",
        "cert_name": "Certified cGMP Biomanufacturing Professional",
        "provider": "BioXcellence / ISPE",
        "domain": "Biopharma Compliance",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in Biotech or Chem Engg"
        ],
        "official_url": "https://ispe.org",
        "sourceUrl": "https://ispe.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-biotech-ct2",
        "degree_id": "btech-biotech",
        "cert_name": "Next-Generation Sequencing (NGS) Data Analysis",
        "provider": "EMBL-EBI / Coursera",
        "domain": "Bioinformatics",
        "level": "Advanced",
        "prerequisites": [
          "Linux Shell",
          "Basic Genomics"
        ],
        "official_url": "https://www.ebi.ac.uk",
        "sourceUrl": "https://www.ebi.ac.uk",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-biotech-ct3",
        "degree_id": "btech-biotech",
        "cert_name": "Molecular Docking & Drug Design Specialist",
        "provider": "Biotech Consortium India Limited (BCIL)",
        "domain": "Computational Drug Discovery",
        "level": "Intermediate",
        "prerequisites": [
          "Biochemistry fundamentals"
        ],
        "official_url": "https://www.bcil.nic.in",
        "sourceUrl": "https://www.bcil.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-biotech-gv1",
        "degree_id": "btech-biotech",
        "exam_or_post_name": "DBT-JRF / Biotechnology Eligibility Test (BET)",
        "conducting_body": "Department of Biotechnology (DBT)",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "B.Tech Biotechnology",
            "M.Sc Biotechnology"
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
          "notes": "Fellowship for research in DBT autonomous institutions."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://dbtindia.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-biotech-gv2",
        "degree_id": "btech-biotech",
        "exam_or_post_name": "Patent Examiner (Biotechnology) - CGPDTM",
        "conducting_body": "Ministry of Commerce and Industry",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "B.Tech Biotechnology"
          ],
          "mandatorySubjects": [
            "Biotechnology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Recruited as Group 'A' Gazetted Officer for patent examination."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ipindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-biotech-sw1",
        "degree_id": "btech-biotech",
        "target_role": "Healthtech Data Scientist",
        "pivot_reason": "Pivot biological domain knowledge and statistical experiments into electronic health records (EHR) and clinical trial data science.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Advanced Python & SQL for Clinical Data",
            "type": "course",
            "detail": "Master clinical dataset cleaning, MedDRA coding, and SQL querying.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Statistical Machine Learning in Healthcare",
            "type": "course",
            "detail": "Build predictive disease survival curves and patient cohort clustering models.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Clinical Trial Predictor Capstone",
            "type": "portfolio",
            "detail": "Deploy full-stack web dashboard predicting trial attrition from public FDA databases.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Python Data Science Specialist",
          "GCP Healthcare Data Analyst"
        ],
        "why_feasible": "Biotech curriculum provides deep grounding in experimental biology, pharmacology, and biostatistics.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-biotech-ent1",
        "degree_id": "btech-biotech",
        "idea_title": "Synthetic Biology / Microbial Enzyme Formulation Startup",
        "description": "Develop specialized microbial enzymes for industrial wastewater remediation and food processing waste valorization.",
        "first_milestones": [
          "Screen and isolate high-yield microbial strains in an incubator laboratory.",
          "File provisional patent on the enzyme extraction formula with BIRAC grant assistance.",
          "Pilot trial with a textile or dairy processing facility for organic effluent breakdown."
        ],
        "relevant_schemes": [
          {
            "name": "Biotechnology Ignition Grant (BIG)",
            "agency": "BIRAC / Department of Biotechnology",
            "benefits": "Up to INR 50 Lakhs grant-in-aid for high-risk biotechnology startups.",
            "sourceUrl": "https://birac.nic.in"
          },
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Proof of concept and prototype funding up to 20 Lakhs.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-biotech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Molecular Foundations & Wet Lab Techniques",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master microbiology plating, PCR, gel electrophoresis, and biostatistics.",
              "Gain basic fluency in Python and biological databases (NCBI/UniProt)."
            ],
            "milestone": "Certified in sterile microbiological techniques"
          },
          {
            "stepNumber": 2,
            "title": "Bioreactor Operations & Industrial Fermentation",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct summer training at biopharma plant (Biocon/Serum) or research lab (CCMB).",
              "Operate bench-top fermenters and HPLC analytical columns."
            ],
            "milestone": "Industrial training internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "GATE BT Preparation & Capstone Research",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Execute final-year wet-lab project on recombinant protein or enzyme kinetics.",
              "Target 99+ percentile in GATE (BT) or DBT-BET exam."
            ],
            "milestone": "GATE BT qualification & published project report"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-biotech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Structuring & Analytical Skill Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile lab protocols, instrument handling proficiencies (HPLC/FPLC/PCR), and research abstract.",
              "Revise fundamental biochemical kinetics and cGMP principles."
            ],
            "milestone": "Biopharma-tailored technical resume"
          },
          {
            "stepNumber": 2,
            "title": "Biopharma Placement Applications & Interviews",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to QC/QA, Upstream, and Downstream openings at top biopharma employers.",
              "Participate in technical assessments and scientific case studies."
            ],
            "milestone": "3+ Interview selections"
          },
          {
            "stepNumber": 3,
            "title": "Bioprocess Trainee Onboarding & Specialization",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Begin role as bioprocess engineer or analytical scientist.",
              "Plan long-term track toward senior biomanufacturing or MS/PhD."
            ],
            "milestone": "Confirmed corporate placement in biomanufacturing"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-aids",
    "id": "btech-aids",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Artificial Intelligence & Data Science",
    "shortName": "B.Tech AI & DS",
    "aliases": [
      "BTech AI",
      "B.Tech Data Science",
      "AI and ML",
      "Machine Learning Engineering",
      "Artificial Intelligence",
      "AI DS",
      "btech-aids"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "An engineering curriculum dedicated to the mathematical and algorithmic foundations of artificial intelligence, statistical machine learning, deep learning, and big data systems. It trains students to architect end-to-end data pipelines, train neural networks, and deploy scalable AI models into production.",
    "key_skills": [
      "Deep Learning & Neural Network Architecture (PyTorch, TensorFlow)",
      "Statistical Modeling & Applied Machine Learning (Scikit-Learn)",
      "Big Data Engineering & Distributed Computing (Apache Spark, Kafka)",
      "Natural Language Processing & Large Language Models (LLMs)",
      "Data Pipeline Engineering & Cloud Data Warehouses (Snowflake, BigQuery)",
      "Computer Vision & Convolutional Architectures (OpenCV)"
    ],
    "subjects_taught": [
      "Mathematical Foundations for Data Science (Linear Algebra, Calculus, Probability)",
      "Machine Learning Algorithms & Optimization",
      "Deep Learning & Cognitive Computing",
      "Big Data Technologies & Distributed Systems",
      "Natural Language Processing & Computer Vision",
      "MLOps: Model Deployment & Monitoring"
    ],
    "typical_employers": [
      "Amazon Web Services",
      "Microsoft AI",
      "Google",
      "NVIDIA",
      "Fractal Analytics",
      "Mu Sigma",
      "Flipkart",
      "Accenture AI"
    ],
    "specializations": [
      {
        "id": "aids-genai",
        "name": "Generative AI & LLM Systems",
        "aliases": [
          "GenAI"
        ],
        "skillsGained": [
          "LangChain",
          "Vector Databases",
          "Fine-Tuning"
        ],
        "typicalRoles": [
          "GenAI Engineer"
        ]
      },
      {
        "id": "aids-mlops",
        "name": "MLOps & Cloud Infrastructure",
        "aliases": [
          "ML Engineering"
        ],
        "skillsGained": [
          "Docker",
          "Kubeflow",
          "MLflow"
        ],
        "typicalRoles": [
          "MLOps Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-aids-c1",
        "degree_id": "btech-aids",
        "role_title": "Machine Learning Engineer / Data Scientist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your mathematical training in linear algebra, gradient descent optimization, and PyTorch directly qualifies you for developing predictive ML models.",
        "indicative_salary": {
          "min": 7.5,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "NASSCOM AI Talent Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PyTorch",
          "Python",
          "SQL",
          "Scikit-Learn"
        ],
        "top_employers": [
          "Fractal",
          "Amazon",
          "Flipkart",
          "Tiger Analytics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aids-c2",
        "degree_id": "btech-aids",
        "role_title": "Big Data Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Big data coursework, Spark distributed computing, and data pipeline orchestration map directly to constructing modern analytics data lakes.",
        "indicative_salary": {
          "min": 6.5,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Tech Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Apache Spark",
          "Kafka",
          "SQL",
          "AWS Redshift"
        ],
        "top_employers": [
          "Walmart Global Tech",
          "Infosys",
          "Cognizant",
          "TCS"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aids-c3",
        "degree_id": "btech-aids",
        "role_title": "Principal AI Architect / Head of Data Science",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "End-to-end expertise in training large multi-modal models, enterprise ML governance, and high-throughput vector architectures qualifies you to direct company-wide AI strategy.",
        "indicative_salary": {
          "min": 22.0,
          "max": 48.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Top Executive Tech Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Enterprise AI Architecture",
          "ML Governance",
          "Cloud AI Strategy",
          "Team Leadership"
        ],
        "top_employers": [
          "Microsoft",
          "Google",
          "Adobe",
          "Global Capability Centers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-aids-hs1",
        "degree_id": "btech-aids",
        "program_name": "M.Tech in Artificial Intelligence / Data Science",
        "level": "PG",
        "entrance_exams": [
          "GATE (DA / CS)"
        ],
        "eligibility_rule": "B.Tech in AI/DS, CSE, or related engineering branch with minimum 60% aggregate or 6.5 CGPA.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IISc Bangalore",
          "IIT Hyderabad",
          "IIT Madras",
          "IIT Bombay"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aids-hs2",
        "degree_id": "btech-aids",
        "program_name": "MS in Machine Learning & Robotics (Abroad/India)",
        "level": "PG",
        "entrance_exams": [
          "GATE (DA)",
          "GRE"
        ],
        "eligibility_rule": "Four-year undergraduate degree in engineering with strong mathematical and programming foundation.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Carnegie Mellon",
          "Georgia Tech",
          "TU Munich",
          "NUS Singapore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-aids-ct1",
        "degree_id": "btech-aids",
        "cert_name": "AWS Certified Machine Learning - Specialty",
        "provider": "Amazon Web Services",
        "domain": "Cloud AI",
        "level": "Advanced",
        "prerequisites": [
          "AWS fundamentals",
          "1+ year ML experience"
        ],
        "official_url": "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
        "sourceUrl": "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-aids-ct2",
        "degree_id": "btech-aids",
        "cert_name": "TensorFlow Developer Certificate",
        "provider": "Google",
        "domain": "Deep Learning",
        "level": "Intermediate",
        "prerequisites": [
          "Python",
          "Neural Networks"
        ],
        "official_url": "https://www.tensorflow.org/certificate",
        "sourceUrl": "https://www.tensorflow.org/certificate",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-aids-ct3",
        "degree_id": "btech-aids",
        "cert_name": "Databricks Certified Data Engineer Professional",
        "provider": "Databricks",
        "domain": "Big Data Engineering",
        "level": "Advanced",
        "prerequisites": [
          "Spark",
          "Delta Lake"
        ],
        "official_url": "https://www.databricks.com/learn/certification",
        "sourceUrl": "https://www.databricks.com/learn/certification",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-aids-gv1",
        "degree_id": "btech-aids",
        "exam_or_post_name": "Scientist / Engineer 'SC' (Computer Science & AI) - ISRO",
        "conducting_body": "ISRO Centralised Recruitment Board (ICRB)",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech AI & Data Science",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Algorithms",
            "Machine Learning",
            "Mathematics"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "ICRB centralized written exam + technical interview."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-aids-gv2",
        "degree_id": "btech-aids",
        "exam_or_post_name": "Data Scientist / Technical Officer - NIC & MeitY",
        "conducting_body": "National Informatics Centre (NIC)",
        "eligibility_rule": {
          "degreeFamily": "Engineering & Technology",
          "allowedDegrees": [
            "B.Tech AI & DS",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Data Science",
            "Databases"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Recruited for national government AI & analytics missions."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-aids-sw1",
        "degree_id": "btech-aids",
        "target_role": "Quant Algorithmic Trader / Financial Engineer",
        "pivot_reason": "Apply statistical modeling, time-series forecasting, and stochastic calculus to high-frequency quantitative trading strategies.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Stochastic Calculus & Time-Series Modeling",
            "type": "course",
            "detail": "Master ARIMA, GARCH, and Monte Carlo risk simulations in Python/C++.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Algorithmic Backtesting Framework",
            "type": "portfolio",
            "detail": "Build high-throughput execution backtesting engine utilizing live market websocket feeds.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "CFA Level 1 or CQF Certification",
            "type": "cert",
            "detail": "Earn financial markets accreditation in quantitative investment management.",
            "estimatedMonths": 4
          }
        ],
        "typical_duration": "10 Months",
        "recommended_certs": [
          "CQF (Certificate in Quantitative Finance)",
          "CFA Level 1"
        ],
        "why_feasible": "Data science linear algebra and statistical inference map exceptionally well to algorithmic finance.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-aids-ent1",
        "degree_id": "btech-aids",
        "idea_title": "Vertical B2B Generative AI SaaS Platform",
        "description": "Build an industry-specialized generative AI copilot (for legal contract drafting or medical diagnostic summaries) using proprietary fine-tuned SLMs.",
        "first_milestones": [
          "Develop prototype with open-weights models and custom retrieval-augmented generation (RAG).",
          "Conduct beta testing with 10 law firms or healthcare clinics under NDA.",
          "Raise pre-seed funding or onboard 5 annual recurring revenue (ARR) enterprise contracts."
        ],
        "relevant_schemes": [
          {
            "name": "IndiaAI Mission",
            "agency": "Ministry of Electronics and Information Technology (MeitY)",
            "benefits": "Subsidized GPU compute access and seed funding grants for indigenous AI startups.",
            "sourceUrl": "https://indiaai.gov.in"
          },
          {
            "name": "NASSCOM DeepTech Club",
            "agency": "NASSCOM",
            "benefits": "Mentorship, VC demo days, and enterprise corporate connect.",
            "sourceUrl": "https://nasscom.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-aids",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Mathematical Foundations & Core Algorithms",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master multivariate calculus, linear algebra, probability, and Python/C++.",
              "Implement classic algorithms and regression/classification models from scratch."
            ],
            "milestone": "First Kaggle competition participation & GitHub portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Deep Learning & Big Data Systems",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Train CNN, Transformer, and LSTM architectures on cloud GPUs (Colab/AWS).",
              "Complete 2-month summer internship in machine learning or data pipeline engineering."
            ],
            "milestone": "Industrial ML internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "GATE DA Preparation & Capstone AI Project",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Build production-ready multimodal model with Dockerized API deployment.",
              "Target high rank in GATE Data Science & AI (DA) paper."
            ],
            "milestone": "GATE DA qualification & functional ML deployment"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-aids",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Model Portfolio Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Structure GitHub repository with live model demos (HuggingFace Spaces).",
              "Review fundamental ML math and system design interview questions."
            ],
            "milestone": "Comprehensive AI engineer portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Campus Placements & DeepTech Interviews",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to AI research labs, fintech analytics firms, and tech majors.",
              "Solve live algorithmic coding and model architecture whiteboard challenges."
            ],
            "milestone": "Multiple placement offers secured"
          },
          {
            "stepNumber": 3,
            "title": "Professional ML Engineer Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join engineering team, monitor live production models, and automate MLOps.",
              "Pursue advanced AWS/GCP specialty certifications."
            ],
            "milestone": "Successful completion of first enterprise AI project"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-it",
    "id": "btech-it",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Information Technology",
    "shortName": "B.Tech IT",
    "aliases": [
      "BTech IT",
      "BE IT",
      "B.Tech Information Science",
      "Information Technology Engineering",
      "btech-it"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A 4-year engineering program centered on enterprise software development, database architecture, network security, web services, and cloud infrastructure management. It trains engineers to bridge core business workflows with secure, resilient, and scalable computing environments.",
    "key_skills": [
      "Enterprise Java & Spring Boot Web Frameworks",
      "Relational Database Administration & Query Optimization (PostgreSQL, Oracle)",
      "Network Administration & Enterprise Cybersecurity",
      "Cloud Solutions Architecture (AWS / Azure)",
      "DevOps, Continuous Delivery & Docker Containers",
      "Full-Stack Web Engineering (React, Node.js)"
    ],
    "subjects_taught": [
      "Data Structures & Object-Oriented Programming",
      "Database Management & Distributed Information Systems",
      "Computer Networks & Network Security",
      "Web Technologies & Cloud Computing",
      "Software Project Management & Agile Methodologies",
      "Information Security & Cryptography"
    ],
    "typical_employers": [
      "Cognizant",
      "TCS",
      "Infosys",
      "Wipro",
      "Accenture",
      "Oracle",
      "SAP Labs",
      "Capgemini"
    ],
    "specializations": [
      {
        "id": "it-cloud",
        "name": "Cloud Computing & DevOps",
        "aliases": [
          "Cloud IT"
        ],
        "skillsGained": [
          "AWS",
          "Kubernetes",
          "CI/CD"
        ],
        "typicalRoles": [
          "Cloud Engineer"
        ]
      },
      {
        "id": "it-cyber",
        "name": "Information & Network Security",
        "aliases": [
          "IT Security"
        ],
        "skillsGained": [
          "Penetration Testing",
          "SIEM"
        ],
        "typicalRoles": [
          "IT Security Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-it-c1",
        "degree_id": "btech-it",
        "role_title": "Enterprise Software Engineer / Full Stack Developer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your core curriculum in database systems, Java web services, and web frameworks directly maps to building business-critical enterprise applications.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "NASSCOM Tech Placements Guide (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Java",
          "Spring Boot",
          "React",
          "PostgreSQL"
        ],
        "top_employers": [
          "Cognizant",
          "Accenture",
          "TCS",
          "Wipro"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-it-c2",
        "degree_id": "btech-it",
        "role_title": "Cloud Infrastructure & Systems Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Operating systems, computer networks, and cloud virtualization modules qualify you for managing multi-region enterprise server fleets.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox IT Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "AWS",
          "Linux Administration",
          "Terraform",
          "Docker"
        ],
        "top_employers": [
          "Oracle Cloud",
          "Infosys",
          "Mindtree",
          "Capgemini"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-it-c3",
        "degree_id": "btech-it",
        "role_title": "Director of Enterprise IT & Cloud Infrastructure",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Mastery of corporate IT governance, hybrid-cloud migration, and cybersecurity controls qualifies you to lead IT infrastructure for global operations.",
        "indicative_salary": {
          "min": 18.0,
          "max": 36.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Global IT Leadership Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "IT Governance (ITIL)",
          "Cloud Cost Optimization (FinOps)",
          "Vendor Management",
          "Enterprise Security"
        ],
        "top_employers": [
          "SAP Labs",
          "Oracle",
          "Deloitte",
          "Standard Chartered"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-it-hs1",
        "degree_id": "btech-it",
        "program_name": "M.Tech in Information Technology / Network Engineering",
        "level": "PG",
        "entrance_exams": [
          "GATE (CS / IT)"
        ],
        "eligibility_rule": "B.Tech in IT / CSE or equivalent with minimum 60% aggregate or 6.5 CGPA.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "IIIT Allahabad",
          "NIT Surathkal",
          "IIIT Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-it-hs2",
        "degree_id": "btech-it",
        "program_name": "MS in Information Systems / Cybersecurity",
        "level": "PG",
        "entrance_exams": [
          "GATE (CS)",
          "GRE"
        ],
        "eligibility_rule": "4-year Bachelor's degree in Engineering with solid computer science and mathematics coursework.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Carnegie Mellon (MISM)",
          "University of Washington",
          "BITS Pilani",
          "IIT Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-it-ct1",
        "degree_id": "btech-it",
        "cert_name": "AWS Certified Solutions Architect - Associate",
        "provider": "Amazon Web Services",
        "domain": "Cloud Computing",
        "level": "Intermediate",
        "prerequisites": [
          "Basic cloud familiarity"
        ],
        "official_url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        "sourceUrl": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-it-ct2",
        "degree_id": "btech-it",
        "cert_name": "CompTIA Security+ Certification",
        "provider": "CompTIA",
        "domain": "Cybersecurity",
        "level": "Intermediate",
        "prerequisites": [
          "Networking fundamentals"
        ],
        "official_url": "https://www.comptia.org/certifications/security",
        "sourceUrl": "https://www.comptia.org/certifications/security",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-it-ct3",
        "degree_id": "btech-it",
        "cert_name": "Oracle Certified Professional: Java SE Developer",
        "provider": "Oracle",
        "domain": "Software Development",
        "level": "Advanced",
        "prerequisites": [
          "Java programming experience"
        ],
        "official_url": "https://education.oracle.com",
        "sourceUrl": "https://education.oracle.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-it-gv1",
        "degree_id": "btech-it",
        "exam_or_post_name": "National Informatics Centre (NIC) - Scientific/Technical Assistant",
        "conducting_body": "NIC / NIELIT",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech IT",
            "B.Tech CSE"
          ],
          "mandatorySubjects": [
            "Computer Networks",
            "DBMS",
            "Operating Systems"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Written examination conducted by NIELIT for central government IT infrastructure."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.calicut.nielit.in/nic21/",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-it-gv2",
        "degree_id": "btech-it",
        "exam_or_post_name": "IBPS Specialist Officer (IT Officer Scale I)",
        "conducting_body": "IBPS",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech IT",
            "B.Tech CSE",
            "B.Tech ECE"
          ],
          "mandatorySubjects": [
            "Computer Science / IT"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Annual recruitment for IT Officers in all Public Sector Banks."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ibps.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-it-sw1",
        "degree_id": "btech-it",
        "target_role": "Technical Product Manager (SaaS / FinTech)",
        "pivot_reason": "Leverage IT systems architectural awareness and software delivery experience into end-to-end product roadmapping and backlog management.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Product Strategy & User Research Foundations",
            "type": "course",
            "detail": "Learn customer journey mapping, OKR definition, and product analytics (Mixpanel/Amplitude).",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Agile Scrum Product Owner (CSPO) Certification",
            "type": "cert",
            "detail": "Earn industry-recognized CSPO or PSPO certification in agile backlog execution.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Product Teardown & PRD Capstone",
            "type": "portfolio",
            "detail": "Draft end-to-end Product Requirement Document (PRD) for high-traffic mobile payment app.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Scrum Product Owner (CSPO)",
          "Product Analytics Certification"
        ],
        "why_feasible": "IT graduates understand software architecture constraints, making technical feasibility estimation natural.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-it-ent1",
        "degree_id": "btech-it",
        "idea_title": "Managed Cloud Security & IT Modernization Agency",
        "description": "Provide turnkey cybersecurity audits, cloud migration, and automated backup compliance for mid-sized healthcare and banking firms.",
        "first_milestones": [
          "Acquire AWS Consulting Partner and ISO 27001 internal auditor accreditation.",
          "Execute pilot security assessment and disaster-recovery setup for 3 regional hospital chains.",
          "Transition clients onto monthly recurring managed security service retainers."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax exemptions under Section 80-IAC and fast-tracked intellectual property filings.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "Stand Up India Scheme",
            "agency": "SIDBI",
            "benefits": "Bank loans between 10 Lakhs and 1 Crore for tech and service ventures.",
            "sourceUrl": "https://www.standupmitra.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-it",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Object-Oriented Programming & Web Fundamentals",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master data structures, Java/Python programming, and SQL database design.",
              "Build dynamic web applications using React and Node.js."
            ],
            "milestone": "Full-stack web application hosted on GitHub"
          },
          {
            "stepNumber": 2,
            "title": "Database Optimization & Cloud Deployment",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn AWS cloud deployment, containerization with Docker, and CI/CD pipelines.",
              "Complete 8-week summer internship at an IT services or product company."
            ],
            "milestone": "Summer software internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "GATE Preparation & Enterprise Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Develop secure distributed microservices application with PostgreSQL.",
              "Prepare for campus placements and technical coding rounds."
            ],
            "milestone": "Enterprise capstone project completed & placed"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-it",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Architecture & IT Skill Alignment",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document software frameworks, database schemas, and cloud deployment links.",
              "Review core computer networking protocols and relational normalization."
            ],
            "milestone": "Industry-ready IT software resume"
          },
          {
            "stepNumber": 2,
            "title": "Campus Placements & Corporate Coding Rounds",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Participate in campus placement tests and technical coding challenges.",
              "Complete behavioral and system design interview rounds."
            ],
            "milestone": "Job offers secured from enterprise IT firms"
          },
          {
            "stepNumber": 3,
            "title": "Enterprise IT Onboarding & Professional Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Begin full-time software developer role with assigned client projects.",
              "Complete AWS Solutions Architect Associate certification."
            ],
            "milestone": "Completed onboarding milestones & professional certification"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-robotics",
    "id": "btech-robotics",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Robotics & Automation",
    "shortName": "B.Tech Robotics",
    "aliases": [
      "BTech Robotics",
      "BE Robotics",
      "Robotics Engineering",
      "Mechatronics & Automation",
      "btech-robotics"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A multidisciplinary 4-year engineering discipline combining mechanical kinematics, electrical actuators, embedded microcontrollers, and computer vision. Students learn to design, simulate, program, and deploy autonomous mobile robots, robotic manipulators, and automated industrial assembly lines.",
    "key_skills": [
      "Robot Operating System (ROS / ROS2) & C++",
      "Forward & Inverse Kinematics / Dynamics Simulation",
      "Computer Vision for Autonomous Guidance (OpenCV, YOLO)",
      "Microcontroller & Embedded Programming (STM32, Arduino, ESP32)",
      "PLC Programming & Industrial SCADA Systems",
      "Sensor Fusion & SLAM (LiDAR, IMU, Odometry)"
    ],
    "subjects_taught": [
      "Robotic Kinematics, Dynamics & Trajectory Planning",
      "Microcontrollers & Embedded Systems",
      "Computer Vision & Pattern Recognition",
      "Industrial Automation & PLC/SCADA",
      "Control Systems Engineering & State-Space Control",
      "Robot Operating System (ROS) & Simulation (Gazebo)"
    ],
    "typical_employers": [
      "ABB India",
      "FANUC India",
      "KUKA Robotics",
      "Tata Advanced Systems",
      "GreyOrange",
      "Addverb Technologies",
      "Tesla",
      "Schneider Electric"
    ],
    "specializations": [
      {
        "id": "robotics-autonomous",
        "name": "Autonomous Mobile Robots (AMR)",
        "aliases": [
          "AMR Tech"
        ],
        "skillsGained": [
          "SLAM",
          "LiDAR",
          "Path Planning"
        ],
        "typicalRoles": [
          "Robotics Software Engineer"
        ]
      },
      {
        "id": "robotics-industrial",
        "name": "Industrial Automation & Cobots",
        "aliases": [
          "Industrial Robotics"
        ],
        "skillsGained": [
          "PLC",
          "FANUC TP",
          "Pneumatics"
        ],
        "typicalRoles": [
          "Automation Integration Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-robotics-c1",
        "degree_id": "btech-robotics",
        "role_title": "Robotics Software Engineer (ROS / Navigation)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in ROS2, path planning algorithms (A*, Dijkstra), and C++ directly qualifies you for autonomous mobile robot navigation software.",
        "indicative_salary": {
          "min": 6.0,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Robotics India Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "C++",
          "ROS2",
          "SLAM",
          "Linux"
        ],
        "top_employers": [
          "GreyOrange",
          "Addverb",
          "Tata Advanced Systems",
          "Hi-Tech Robotic Systemz"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-robotics-c2",
        "degree_id": "btech-robotics",
        "role_title": "Industrial Automation & PLC Integration Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Mastery of PLC ladder logic, industrial fieldbuses, and robotic arm programming prepares you for factory automation deployments.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "AmbitionBox Automation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PLC (Siemens/Rockwell)",
          "SCADA",
          "Industrial Wiring",
          "Pneumatics"
        ],
        "top_employers": [
          "ABB",
          "FANUC",
          "Schneider Electric",
          "L&T"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-robotics-c3",
        "degree_id": "btech-robotics",
        "role_title": "VP of Robotics Engineering / Automation Systems",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing large-scale warehouse robotics fleets, custom robot design, and safety compliance qualifies you for heading advanced automation business units.",
        "indicative_salary": {
          "min": 20.0,
          "max": 42.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Executive Engineering Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Robotics Fleet Management",
          "System Architecture",
          "Safety Standards (ISO 10218)",
          "P&L Leadership"
        ],
        "top_employers": [
          "Addverb",
          "GreyOrange",
          "Amazon Robotics",
          "Reliance Retail Logistics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-robotics-hs1",
        "degree_id": "btech-robotics",
        "program_name": "M.Tech in Robotics & Autonomous Systems",
        "level": "PG",
        "entrance_exams": [
          "GATE (ME / EC / CS)"
        ],
        "eligibility_rule": "B.Tech in Robotics, Mechatronics, Mechanical, ECE, or CSE with minimum 60% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kanpur",
          "IIT Madras",
          "IISc Bangalore",
          "IIIT Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-robotics-hs2",
        "degree_id": "btech-robotics",
        "program_name": "MS in Robotics Engineering (International / India)",
        "level": "PG",
        "entrance_exams": [
          "GATE",
          "GRE"
        ],
        "eligibility_rule": "Undergraduate degree in robotics, mechanical, electrical, or computer science engineering.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Carnegie Mellon (Robotics Institute)",
          "ETH Zurich",
          "University of Michigan",
          "IIT Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-robotics-ct1",
        "degree_id": "btech-robotics",
        "cert_name": "ROS2 for Beginners & Advanced Nav2 Certification",
        "provider": "Open Robotics / Coursera",
        "domain": "Robotics Software",
        "level": "Intermediate",
        "prerequisites": [
          "C++",
          "Linux Basics"
        ],
        "official_url": "https://www.ros.org",
        "sourceUrl": "https://www.ros.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-robotics-ct2",
        "degree_id": "btech-robotics",
        "cert_name": "Certified PLC Programmer (Siemens TIA Portal)",
        "provider": "Siemens SITRAIN",
        "domain": "Industrial Automation",
        "level": "Intermediate",
        "prerequisites": [
          "Basic Electrical Circuits"
        ],
        "official_url": "https://www.siemens.com/sitrain",
        "sourceUrl": "https://www.siemens.com/sitrain",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-robotics-ct3",
        "degree_id": "btech-robotics",
        "cert_name": "Computer Vision for Robotics Specialist",
        "provider": "OpenCV.org / DeepLearning.AI",
        "domain": "Machine Vision",
        "level": "Advanced",
        "prerequisites": [
          "Python",
          "Linear Algebra"
        ],
        "official_url": "https://opencv.org",
        "sourceUrl": "https://opencv.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-robotics-gv1",
        "degree_id": "btech-robotics",
        "exam_or_post_name": "DRDO Scientist 'B' (Mechatronics / Robotics)",
        "conducting_body": "DRDO / RAC",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech Robotics",
            "B.Tech Mechatronics",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Robotics",
            "Control Systems"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Recruitment through valid GATE score followed by technical interview at RAC."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rac.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-robotics-gv2",
        "degree_id": "btech-robotics",
        "exam_or_post_name": "Scientist / Engineer 'SC' (Control Systems) - ISRO",
        "conducting_body": "ISRO Centralised Recruitment Board",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "B.Tech Robotics",
            "B.Tech Mechanical",
            "B.Tech ECE"
          ],
          "mandatorySubjects": [
            "Control Systems",
            "Kinematics"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 28,
            "obc": 31,
            "sc_st": 33
          },
          "notes": "Centralized written examination conducted by ICRB."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.isro.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-robotics-sw1",
        "degree_id": "btech-robotics",
        "target_role": "Autonomous Vehicle (AV) Perception Engineer",
        "pivot_reason": "Transition robot navigation and computer vision expertise into self-driving cars, ADAS software, and automotive lidar perception.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Automotive Sensor Fusion & Point Cloud Processing",
            "type": "course",
            "detail": "Learn Point Cloud Library (PCL), 3D bounding box detection, and Kalman filtering.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Deep Learning for Computer Vision (3D Object Detection)",
            "type": "course",
            "detail": "Train PointNet and BEV (Bird's Eye View) perception models.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "ADAS Perception Pipeline Simulation",
            "type": "portfolio",
            "detail": "Implement end-to-end obstacle detection and avoidance in CARLA simulator.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Udacity Self-Driving Car Engineer",
          "NVIDIA Deep Learning Institute"
        ],
        "why_feasible": "Strong intersection of ROS, computer vision, kinematics, and real-time C++ control systems.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-robotics-ent1",
        "degree_id": "btech-robotics",
        "idea_title": "Warehouse Automation / Autonomous Tugger Startup",
        "description": "Manufacture compact autonomous mobile robots (AMRs) for automated material handling in tier-2 manufacturing hubs.",
        "first_milestones": [
          "Construct functional 200kg-payload AMR prototype with ROS2 navigation and LiDAR.",
          "Demonstrate prototype at 3 automotive component factories in an industrial corridor.",
          "Secure first commercial paid pilot and apply for BIRAC / Startup India Seed funding."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Grant of up to 20 Lakhs for prototype validation and trial deployments.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "Technology Development Fund (TDF)",
            "agency": "DRDO",
            "benefits": "Financial support up to 50 Crore for defense and industrial robotics innovation.",
            "sourceUrl": "https://tdf.drdo.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-robotics",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "C++ Systems, Electronics & Kinematics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master modern C++, Linux command line, microcontroller interfacing, and kinematics.",
              "Build an omnidirectional mobile robot with ultrasonic and IMU sensors."
            ],
            "milestone": "Functional dual-wheel differential drive robot built"
          },
          {
            "stepNumber": 2,
            "title": "ROS2 Navigation & Vision Integration",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Implement SLAM mapping with 2D LiDAR and ROS2 Navigation (Nav2) stack.",
              "Complete summer internship at robotics startup or automation systems integrator."
            ],
            "milestone": "Autonomous navigation demo video & internship report"
          },
          {
            "stepNumber": 3,
            "title": "Industrial Robot Arm Simulation & Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Simulate 6-DOF robotic manipulator in Gazebo and program pick-and-place trajectories.",
              "Prepare for technical interviews in robotics algorithms, C++, and control systems."
            ],
            "milestone": "Robotics placement offer & capstone project complete"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-robotics",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Technical Portfolio Compilation & ROS Packages",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Publish ROS2 packages to GitHub with clear READMEs, simulation launches, and videos.",
              "Revise state-space control, kinematics matrices, and computer vision filters."
            ],
            "milestone": "Public GitHub portfolio of robotics projects"
          },
          {
            "stepNumber": 2,
            "title": "Targeted Robotics Company Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to warehouse automation companies, defense contractors, and automotive OEMs.",
              "Demonstrate simulation packages during live technical interviews."
            ],
            "milestone": "Multiple job offers in robotics engineering"
          },
          {
            "stepNumber": 3,
            "title": "Robotics Engineer Onboarding & Field Testing",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join engineering team, configure hardware-in-the-loop (HIL) testing, and tune robots.",
              "Pursue advanced industrial certifications in functional safety."
            ],
            "milestone": "Autonomous robot deployed in customer production site"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-marine",
    "id": "btech-marine",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Marine Engineering",
    "shortName": "B.Tech Marine",
    "aliases": [
      "BTech Marine",
      "BE Marine Engineering",
      "Merchant Navy Engineer",
      "Marine Engineer",
      "btech-marine"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A specialized 4-year maritime engineering discipline approved by the Directorate General of Shipping (DGS). It equips students with the technical and practical competencies to operate, maintain, and troubleshoot large marine propulsion engines, boilers, refrigeration plants, and shipboard electrical systems aboard commercial ocean-going vessels.",
    "key_skills": [
      "Marine Two-Stroke & Four-Stroke Diesel Engine Maintenance",
      "Shipboard Auxiliary Machinery & Steam Boiler Operations",
      "Marine Electrical Systems & High-Voltage Automation",
      "Naval Architecture & Ship Stability Calculations",
      "Refrigeration, Air Conditioning & Oily Water Separator (OWS)",
      "STCW Safety Protocols & Maritime Pollution (MARPOL) Compliance"
    ],
    "subjects_taught": [
      "Marine Diesel Engines & Gas Turbines",
      "Marine Auxiliary Machinery & Boilers",
      "Ship Construction & Naval Architecture",
      "Marine Electrical Machinery & Automation",
      "Safety of Life at Sea (SOLAS) & MARPOL Regulations",
      "Control Engineering & Engine Room Simulators"
    ],
    "typical_employers": [
      "Maersk Line",
      "Anglo-Eastern Ship Management",
      "Fleet Management Limited",
      "Scorpio Ship Management",
      "Synergy Marine Group",
      "Teekay Shipping",
      "Shipping Corporation of India (SCI)"
    ],
    "specializations": [
      {
        "id": "marine-operations",
        "name": "Shipboard Operations & Watchkeeping",
        "aliases": [
          "Marine Watch"
        ],
        "skillsGained": [
          "Watchkeeping",
          "Engine Overhaul"
        ],
        "typicalRoles": [
          "Junior Marine Engineer"
        ]
      },
      {
        "id": "marine-offshore",
        "name": "Offshore Rig & Subsea Engineering",
        "aliases": [
          "Offshore Engineering"
        ],
        "skillsGained": [
          "DP Systems",
          "Hydraulics"
        ],
        "typicalRoles": [
          "Offshore Maintenance Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.dgshipping.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-marine-c1",
        "degree_id": "btech-marine",
        "role_title": "Junior Marine Engineer / Fourth Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your mandatory DGS-approved curriculum and simulator training qualify you directly for sailing as an engine watchkeeping officer aboard foreign-going ships.",
        "indicative_salary": {
          "min": 8.0,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "International Maritime Health & Pay Index (Tax-Free USD converted) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Marine Diesel Engines",
          "Watchkeeping",
          "Pumps & Purifiers",
          "STCW"
        ],
        "top_employers": [
          "Anglo-Eastern",
          "Fleet Management",
          "Maersk",
          "Synergy Marine"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-marine-c2",
        "degree_id": "btech-marine",
        "role_title": "Shipyard Quality & Survey Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Naval architecture, structural metallurgy, and marine survey regulations map directly to dry-dock ship repair and new vessel fabrication yards.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Maritime Industry Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Hull Inspection",
          "Non-Destructive Testing (NDT)",
          "Welding Codes",
          "Class Rules"
        ],
        "top_employers": [
          "Cochin Shipyard",
          "Mazagon Dock",
          "L&T Shipbuilding",
          "Garden Reach"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-marine-c3",
        "degree_id": "btech-marine",
        "role_title": "Chief Engineer (Foreign-Going Merchant Vessel)",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Holding a Class-1 Marine Chief Engineer Certificate of Competency (COC) authorizes full command of multi-million dollar ship engine rooms globally.",
        "indicative_salary": {
          "min": 36.0,
          "max": 80.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Global Merchant Marine Chief Engineer Pay Scale (Tax-Exempt) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Class-1 COC",
          "Complete Propulsion Overhaul",
          "MARPOL Compliance",
          "Vessel Safety Management"
        ],
        "top_employers": [
          "Maersk",
          "Anglo-Eastern",
          "Fleet Management",
          "Euronav"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-marine-hs1",
        "degree_id": "btech-marine",
        "program_name": "M.Tech in Marine Engineering / Naval Architecture",
        "level": "PG",
        "entrance_exams": [
          "GATE (NM / ME)"
        ],
        "eligibility_rule": "B.Tech in Marine Engineering / Naval Architecture / Mechanical Engineering with minimum 60% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Kharagpur",
          "IIT Madras",
          "Indian Maritime University (IMU)",
          "CUSAT Kochi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-marine-hs2",
        "degree_id": "btech-marine",
        "program_name": "Chief Engineer Certificate of Competency (Class 1 Marine COC)",
        "level": "Professional",
        "entrance_exams": [
          "DGS MEO Class Exam"
        ],
        "eligibility_rule": "Approved sea-time sailing as 2nd Engineer (minimum 12-18 months) plus passing DGS oral and written examinations.",
        "typical_duration": "1 Year Course + Exams",
        "top_institutes": [
          "Directorate General of Shipping approved maritime training institutes (LBS, IMU, AMET)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-marine-ct1",
        "degree_id": "btech-marine",
        "cert_name": "STCW Mandatory Basic Safety Training (BST)",
        "provider": "Directorate General of Shipping",
        "domain": "Maritime Safety",
        "level": "Beginner",
        "prerequisites": [
          "Medical fitness certificate (DGS approved)"
        ],
        "official_url": "https://www.dgshipping.gov.in",
        "sourceUrl": "https://www.dgshipping.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-marine-ct2",
        "degree_id": "btech-marine",
        "cert_name": "MEO Class IV Certificate of Competency (Part A & B)",
        "provider": "DG Shipping / Ministry of Ports, Shipping and Waterways",
        "domain": "Marine Competency",
        "level": "Intermediate",
        "prerequisites": [
          "B.Tech Marine Engineering degree",
          "TAR Book completion"
        ],
        "official_url": "https://www.dgshipping.gov.in",
        "sourceUrl": "https://www.dgshipping.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-marine-ct3",
        "degree_id": "btech-marine",
        "cert_name": "High Voltage Safety & Switchgear Certification",
        "provider": "Approved Maritime Training Institutes",
        "domain": "Marine Electrical",
        "level": "Advanced",
        "prerequisites": [
          "Marine Engineering degree or sea time"
        ],
        "official_url": "https://www.dgshipping.gov.in",
        "sourceUrl": "https://www.dgshipping.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-marine-gv1",
        "degree_id": "btech-marine",
        "exam_or_post_name": "Engineer & Ship Surveyor - Directorate General of Shipping",
        "conducting_body": "UPSC / Ministry of Ports, Shipping and Waterways",
        "eligibility_rule": {
          "degreeFamily": "Marine Engineering",
          "allowedDegrees": [
            "B.Tech Marine Engineering + Class 1 COC"
          ],
          "mandatorySubjects": [
            "Marine Engineering",
            "Naval Architecture"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 40,
            "obc": 43,
            "sc_st": 45
          },
          "notes": "Gazetted Class I central government post conducting statutory ship surveys."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-marine-gv2",
        "degree_id": "btech-marine",
        "exam_or_post_name": "Indian Navy - Sub-Lieutenant (Naval Architecture / Marine Engineering)",
        "conducting_body": "Indian Navy",
        "eligibility_rule": {
          "degreeFamily": "Marine / Mechanical Engineering",
          "allowedDegrees": [
            "B.Tech Marine",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Engineering Fundamentals"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 24,
            "obc": 24,
            "sc_st": 24
          },
          "notes": "Direct entry technical officer branch via SSB interview."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.joinindiannavy.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-marine-sw1",
        "degree_id": "btech-marine",
        "target_role": "Thermal Power Plant / Heavy Energy Operations Manager",
        "pivot_reason": "Transition shipboard boiler, turbine, and auxiliary pump operations into onshore combined-cycle power plants or refinery utility units.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Boiler Operation Engineer (BOE) Examination",
            "type": "cert",
            "detail": "Prepare for state boiler directorate exam to become certified Boiler Operation Engineer.",
            "estimatedMonths": 4
          },
          {
            "step": 2,
            "title": "SCADA & Industrial Distributed Control Systems (DCS)",
            "type": "course",
            "detail": "Learn Yokogawa/Honeywell DCS architectures used in modern power plants.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Power Plant Performance & Heat Rate Auditing",
            "type": "portfolio",
            "detail": "Conduct thermodynamic cycle calculations and steam balance optimization case study.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Boiler Operation Engineer (BOE)",
          "Certified Energy Auditor (BEE)"
        ],
        "why_feasible": "Marine engineers have hundreds of hours of hands-on boiler, steam turbine, and diesel generator operation experience.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-marine-ent1",
        "degree_id": "btech-marine",
        "idea_title": "Marine Technical Consultancy & Dry-Dock Repair Service",
        "description": "Offer specialized marine technical superintendence, pre-purchase vessel inspections, and non-destructive ultrasonic hull testing for shipping lines.",
        "first_milestones": [
          "Acquire classification society certified ultrasonic thickness gauging equipment.",
          "Establish technical agency agreements with 5 coastal ship repair facilities.",
          "Complete first 3 vessel pre-docking condition surveys for coastal vessel owners."
        ],
        "relevant_schemes": [
          {
            "name": "Sagarmala Maritime Startup Initiative",
            "agency": "Ministry of Ports, Shipping and Waterways",
            "benefits": "Incentives, incubation, and direct coastal port commercial contracts.",
            "sourceUrl": "https://sagarmala.gov.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA / Government of India",
            "benefits": "Loans up to 10 Lakhs for specialized diagnostic testing equipment.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-marine",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Mechanical Engineering & Marine Workshop Practice",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master engineering drawing, machining, welding, and marine diesel fundamentals.",
              "Complete mandatory DGS physical fitness and eye examination."
            ],
            "milestone": "Cleared 1st year maritime workshop assessments"
          },
          {
            "stepNumber": 2,
            "title": "Shipboard Systems & Engine Simulator Training",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Train on full-mission engine room simulators and marine auxiliary circuits.",
              "Obtain continuous discharge certificate (CDC) and complete STCW safety courses."
            ],
            "milestone": "CDC issued & simulator training passed"
          },
          {
            "stepNumber": 3,
            "title": "MEO Class IV Preparation & Campus Sponsorship",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Complete pre-sea engine cadet orientation and company cadetship interviews.",
              "Rigorously study marine safety regulations, SOLAS, and MARPOL conventions."
            ],
            "milestone": "Sponsored cadetship with shipping line"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-marine",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Pre-Sea Documentation & Medical Endorsement",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Verify yellow fever vaccination, passport validity, and US C1/D visa readiness.",
              "Review marine diesel engine troubleshooting procedures and emergency checklists."
            ],
            "milestone": "Ready for sea deployment onboard merchant vessel"
          },
          {
            "stepNumber": 2,
            "title": "Sea Cadetship & 6-Month Onboard Training",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Board commercial vessel as engine cadet to log required sailing engine-room watch hours.",
              "Complete Onboard Training Record (TAR) Book under Chief Engineer supervision."
            ],
            "milestone": "TAR Book completed with required sea hours"
          },
          {
            "stepNumber": 3,
            "title": "MEO Class IV COC Oral Exam & Promotion to 4th Engineer",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Clear DGS written and oral examination for Marine Engineering Officer Class IV.",
              "Receive Certificate of Competency and sign on as 4th Engineer."
            ],
            "milestone": "Commissioned Fourth Engineer on foreign-going vessel"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-mining",
    "id": "btech-mining",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Mining Engineering",
    "shortName": "B.Tech Mining",
    "aliases": [
      "BTech Mining",
      "BE Mining Engineering",
      "Mineral Engineering",
      "Mining Technology",
      "btech-mining"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A 4-year engineering program covering surface and underground mineral extraction, rock mechanics, mine ventilation, drilling and blasting technology, and mine surveying. It trains engineers to plan, extract, and process essential mineral resources safely, economically, and with environmental stewardship under DGMS statutory frameworks.",
    "key_skills": [
      "Surface & Underground Mine Planning Software (Surpac, Datamine)",
      "Rock Mechanics, Slope Stability & Strata Control",
      "Drilling, Controlled Blasting & Explosives Engineering",
      "Underground Mine Ventilation & Gas Detection Systems",
      "Mine Safety Legislation & DGMS Statutory Compliance",
      "Mineral Beneficiation & Material Handling Systems"
    ],
    "subjects_taught": [
      "Surface Mining Technology & Heavy Earth Moving Machinery (HEMM)",
      "Underground Coal & Metal Mining Methods",
      "Rock Mechanics & Ground Control",
      "Mine Ventilation & Environmental Engineering",
      "Drilling & Blasting Technology",
      "Mine Surveying & Mine Legislation (Mines Act 1952)"
    ],
    "typical_employers": [
      "Coal India Limited (CIL)",
      "Hindustan Zinc Limited (Vedanta)",
      "Tata Steel Mining",
      "NMDC Limited",
      "Adani Natural Resources",
      "UCIL",
      "Rio Tinto"
    ],
    "specializations": [
      {
        "id": "mining-surface",
        "name": "Opencast Mining & Heavy Machinery",
        "aliases": [
          "Surface Mining"
        ],
        "skillsGained": [
          "HEMM Deployment",
          "Slope Stability"
        ],
        "typicalRoles": [
          "Assistant Mine Manager (Opencast)"
        ]
      },
      {
        "id": "mining-ventilation",
        "name": "Underground Ventilation & Safety",
        "aliases": [
          "Mine Safety"
        ],
        "skillsGained": [
          "Ventilation Networks",
          "Gas Analysis"
        ],
        "typicalRoles": [
          "Ventilation & Safety Officer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-mining-c1",
        "degree_id": "btech-mining",
        "role_title": "Mining Management Trainee / Assistant Mine Manager",
        "tier": "entry",
        "employer_type": "psu",
        "career_type": "Direct",
        "match_rationale": "Your degree in mining engineering and familiarity with the Mines Act directly qualifies you for recruitment into Coal India Limited and mining PSUs.",
        "indicative_salary": {
          "min": 6.5,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Coal India Management Trainee Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Mine Planning",
          "Mines Act 1952",
          "Blasting Safety",
          "HEMM"
        ],
        "top_employers": [
          "Coal India Limited",
          "NMDC",
          "Tata Steel",
          "Hindustan Zinc"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mining-c2",
        "degree_id": "btech-mining",
        "role_title": "Mine Planning & Geological Modeling Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Rock mechanics, 3D block modeling, and reserve estimation coursework prepare you for computerized mine design in corporate engineering offices.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Mining Industry Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Surpac",
          "Datamine",
          "Block Modeling",
          "Ore Estimation"
        ],
        "top_employers": [
          "Vedanta",
          "Adani Natural Resources",
          "Epiroc",
          "Caterpillar"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mining-c3",
        "degree_id": "btech-mining",
        "role_title": "First Class Mine Manager / Head of Mining Operations",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Holding the statutory First Class Manager's Certificate of Competency (FCC) grants legal responsibility and executive authority over mega open-pit or underground mines.",
        "indicative_salary": {
          "min": 18.0,
          "max": 38.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Executive Mining Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "First Class Mine Manager COC",
          "DGMS Compliance",
          "Large-scale Production Planning",
          "Safety Leadership"
        ],
        "top_employers": [
          "Tata Steel",
          "Vedanta",
          "Coal India",
          "Rio Tinto"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-mining-hs1",
        "degree_id": "btech-mining",
        "program_name": "M.Tech in Mining Engineering / Rock Mechanics",
        "level": "PG",
        "entrance_exams": [
          "GATE (MN)"
        ],
        "eligibility_rule": "B.Tech in Mining Engineering with minimum 60% marks or 6.5 CGPA.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT (ISM) Dhanbad",
          "IIT Kharagpur",
          "IIT (BHU) Varanasi",
          "NIT Rourkela"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mining-hs2",
        "degree_id": "btech-mining",
        "program_name": "First Class Manager's Certificate of Competency (FCC)",
        "level": "Professional",
        "entrance_exams": [
          "DGMS Examination"
        ],
        "eligibility_rule": "Degree in Mining Engineering plus minimum 2 years of practical underground/opencast mine operational experience.",
        "typical_duration": "Statutory Examination",
        "top_institutes": [
          "Directorate General of Mines Safety (DGMS), Dhanbad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-mining-ct1",
        "degree_id": "btech-mining",
        "cert_name": "Second Class Manager's Certificate of Competency (SCC)",
        "provider": "Directorate General of Mines Safety (DGMS)",
        "domain": "Statutory Mine Management",
        "level": "Intermediate",
        "prerequisites": [
          "B.Tech Mining degree",
          "1 year practical mine experience"
        ],
        "official_url": "https://dgms.gov.in",
        "sourceUrl": "https://dgms.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-mining-ct2",
        "degree_id": "btech-mining",
        "cert_name": "Certified Mine Planning Specialist (Surpac / Datamine)",
        "provider": "Dassault Syst\u00e8mes / Datamine",
        "domain": "Mine Geology & Planning",
        "level": "Intermediate",
        "prerequisites": [
          "Mine surveying fundamentals"
        ],
        "official_url": "https://www.3ds.com",
        "sourceUrl": "https://www.3ds.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-mining-ct3",
        "degree_id": "btech-mining",
        "cert_name": "Gas Testing Certificate of Competency",
        "provider": "DGMS Dhanbad",
        "domain": "Mine Safety",
        "level": "Beginner",
        "prerequisites": [
          "Valid first aid certificate"
        ],
        "official_url": "https://dgms.gov.in",
        "sourceUrl": "https://dgms.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-mining-gv1",
        "degree_id": "btech-mining",
        "exam_or_post_name": "Deputy Controller of Mines / Inspector of Mines",
        "conducting_body": "UPSC / DGMS",
        "eligibility_rule": {
          "degreeFamily": "Mining Engineering",
          "allowedDegrees": [
            "B.Tech Mining + First Class COC"
          ],
          "mandatorySubjects": [
            "Mining Engineering"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Group 'A' Gazetted Officer post enforcing statutory safety standards across all Indian mines."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-mining-gv2",
        "degree_id": "btech-mining",
        "exam_or_post_name": "Coal India Limited - Management Trainee (Mining)",
        "conducting_body": "Coal India Limited / GATE",
        "eligibility_rule": {
          "degreeFamily": "Mining Engineering",
          "allowedDegrees": [
            "B.Tech Mining"
          ],
          "mandatorySubjects": [
            "Mining Engineering (GATE MN)"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Annual recruitment of several hundred mining engineers based on GATE (MN) scores."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.coalindia.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-mining-sw1",
        "degree_id": "btech-mining",
        "target_role": "Tunneling & Underground Infrastructure Engineer",
        "pivot_reason": "Leverage rock mechanics, drilling, blasting, and ground support competencies into metro rail underground tunneling and hydro-power caverns.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Tunnel Boring Machine (TBM) Operations & New Austrian Tunneling Method (NATM)",
            "type": "course",
            "detail": "Learn TBM mechanics, shotcrete support design, and geotechnical instrumentation.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Rock Mass Rating (RMR & Q-System) Field Analysis",
            "type": "portfolio",
            "detail": "Perform empirical rock classification and cavern support sizing for a rail tunnel.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Underground Metro Project Site Engineering Internship",
            "type": "internship",
            "detail": "Work with civil tunneling contractor on underground shaft and tunnel alignment.",
            "estimatedMonths": 3
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Underground Construction Specialist",
          "Geotechnical Instrumentation Certificate"
        ],
        "why_feasible": "Mining engineers possess superior training in rock mechanics and underground strata stabilization compared to general civil engineers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-mining-ent1",
        "degree_id": "btech-mining",
        "idea_title": "Drone-Based Mine Surveying & Volumetric Auditing Enterprise",
        "description": "Offer automated DGMS-compliant aerial volumetric stockpile audits, bench slope stability thermography, and boundary demarcation.",
        "first_milestones": [
          "Acquire DGCA-type certified surveying drone and photogrammetry modeling software.",
          "Execute pilot stockpile inventory verification contracts for 3 stone quarries or coal washeries.",
          "Provide automated monthly volumetric digital twin reports on annual subscription basis."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax exemptions and seed capital matchmaking.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "PMEGP (Prime Minister's Employment Generation Programme)",
            "agency": "KVIC / MSME",
            "benefits": "Subsidies up to 35% on capital equipment purchases for rural/semi-urban survey ventures.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-mining",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Geology, Engineering Drawing & Mine Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master mining geology, engineering mechanics, mineralogy, and mine surveying.",
              "Complete 1-month vocational underground mine training during summer."
            ],
            "milestone": "Vocational mine training certificate obtained"
          },
          {
            "stepNumber": 2,
            "title": "Rock Mechanics, Blasting & Mine Planning Software",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study ground support systems, explosives handling, and Surpac 3D modeling.",
              "Complete 2-month summer internship at Coal India or Tata Steel opencast mine."
            ],
            "milestone": "Summer internship completion and Surpac model"
          },
          {
            "stepNumber": 3,
            "title": "GATE MN Preparation & DGMS Gas Testing Exam",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare thoroughly for GATE (MN) syllabus and DGMS gas testing certification.",
              "Design final-year capstone on slope stability or ventilation network optimization."
            ],
            "milestone": "GATE MN qualification & gas testing certificate"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-mining",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Statutory Documentation & Mining Resume Finalization",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document mine visit logs, vocational training certificates, and software competencies.",
              "Review the Mines Act 1952, Coal Mines Regulations, and safety protocols."
            ],
            "milestone": "DGMS-compliant mining technical resume"
          },
          {
            "stepNumber": 2,
            "title": "PSU Management Trainee & Corporate Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to Coal India, NMDC, Vedanta, and cement limestone operations.",
              "Participate in technical interviews and group discussions."
            ],
            "milestone": "Selection in PSU / top mining company"
          },
          {
            "stepNumber": 3,
            "title": "Assistant Mine Manager Trainee & FCC Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join mine site, lead shift operations, and complete statutory logbooks.",
              "Prepare for DGMS Second Class and First Class Manager's COC exams."
            ],
            "milestone": "Promoted to full Assistant Mine Manager"
          }
        ]
      }
    }
  },
  {
    "degree_id": "btech-petroleum",
    "id": "btech-petroleum",
    "familyId": "engineering",
    "name": "Bachelor of Technology in Petroleum Engineering",
    "shortName": "B.Tech Petroleum",
    "aliases": [
      "BTech Petroleum",
      "BE Petroleum Engineering",
      "Oil & Gas Engineering",
      "Petroleum Technology",
      "btech-petroleum"
    ],
    "level": "UG",
    "discipline": "Engineering & Technology",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A specialized 4-year engineering discipline focused on the exploration, drilling, reservoir modeling, and production of oil and natural gas. It trains students in subsurface fluid flow, well completion, enhanced oil recovery (EOR), pipeline transport, and carbon capture and storage (CCS) systems.",
    "key_skills": [
      "Reservoir Simulation & Well Test Analysis (Eclipse, Petrel)",
      "Drilling Engineering, Well Planning & Blowout Prevention (BOP)",
      "Production Operations & Artificial Lift System Optimization",
      "Petrophysics, Well Logging & Subsurface Formation Evaluation",
      "Pipeline Hydraulics & Surface Production Facility Design",
      "Health, Safety and Environmental (HSE) Regulations in Upstream Oil & Gas"
    ],
    "subjects_taught": [
      "Petroleum Reservoir Engineering & Fluid Mechanics",
      "Drilling Engineering & Well Completion",
      "Petroleum Production Engineering & Artificial Lift",
      "Formation Evaluation & Well Logging",
      "Enhanced Oil Recovery (EOR) Methods",
      "Offshore Drilling & Production Operations"
    ],
    "typical_employers": [
      "Oil and Natural Gas Corporation (ONGC)",
      "Oil India Limited (OIL)",
      "Schlumberger (SLB)",
      "Halliburton",
      "Baker Hughes",
      "Reliance Industries (E&P)",
      "Cairn Oil & Gas (Vedanta)"
    ],
    "specializations": [
      {
        "id": "petro-reservoir",
        "name": "Reservoir Simulation & Characterization",
        "aliases": [
          "Reservoir Engineering"
        ],
        "skillsGained": [
          "Eclipse",
          "History Matching"
        ],
        "typicalRoles": [
          "Reservoir Engineer"
        ]
      },
      {
        "id": "petro-drilling",
        "name": "Drilling & Well Operations",
        "aliases": [
          "Drilling Engineering"
        ],
        "skillsGained": [
          "Mud Hydraulics",
          "BOP Operations"
        ],
        "typicalRoles": [
          "Drilling Engineer"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "btech-petroleum-c1",
        "degree_id": "btech-petroleum",
        "role_title": "Graduate Trainee Engineer (Reservoir / Drilling)",
        "tier": "entry",
        "employer_type": "psu",
        "career_type": "Direct",
        "match_rationale": "Your degree in petroleum engineering and fluid mechanics qualifies you for recruitment into ONGC, Oil India, and oilfield service majors.",
        "indicative_salary": {
          "min": 8.5,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "ONGC Graduate Trainee Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Reservoir Engineering",
          "Well Logging",
          "Drilling Fluid",
          "Petrophysics"
        ],
        "top_employers": [
          "ONGC",
          "Oil India",
          "SLB",
          "Halliburton",
          "Cairn"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-petroleum-c2",
        "degree_id": "btech-petroleum",
        "role_title": "Production & Well Stimulation Engineer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Knowledge of artificial lift, hydraulic fracturing, and surface separation facilities maps directly to maintaining production rates at onshore fields.",
        "indicative_salary": {
          "min": 6.5,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Petroleum Industry Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Artificial Lift (ESP/Gas Lift)",
          "Acidizing",
          "Piping Hydraulics",
          "HSE"
        ],
        "top_employers": [
          "Cairn Oil & Gas",
          "Baker Hughes",
          "Reliance Industries"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-petroleum-c3",
        "degree_id": "btech-petroleum",
        "role_title": "Asset General Manager / Subsurface Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leadership in multi-field development plans, offshore production platforms, and capital budgeting qualifies you to direct upstream energy assets.",
        "indicative_salary": {
          "min": 24.0,
          "max": 55.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Upstream Energy Executive Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Field Development Planning (FDP)",
          "Capex Allocation",
          "Subsurface Risk Assessment",
          "Joint Venture Management"
        ],
        "top_employers": [
          "SLB",
          "Cairn",
          "Reliance E&P",
          "TotalEnergies"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "btech-petroleum-hs1",
        "degree_id": "btech-petroleum",
        "program_name": "M.Tech in Petroleum Engineering / Energy Transition",
        "level": "PG",
        "entrance_exams": [
          "GATE (PE)"
        ],
        "eligibility_rule": "B.Tech in Petroleum Engineering or Chemical Engineering with minimum 60% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT (ISM) Dhanbad",
          "IIT Madras",
          "RGIPT Jais",
          "Pandit Deendayal Energy University (PDEU)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-petroleum-hs2",
        "degree_id": "btech-petroleum",
        "program_name": "MS in Subsurface Energy & Carbon Storage",
        "level": "PG",
        "entrance_exams": [
          "GATE (PE)",
          "GRE"
        ],
        "eligibility_rule": "4-year Bachelor's degree in Petroleum, Chemical, or Earth Sciences.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "University of Texas at Austin",
          "Colorado School of Mines",
          "Imperial College London",
          "TU Delft"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "btech-petroleum-ct1",
        "degree_id": "btech-petroleum",
        "cert_name": "IWCF Well Control Certification (Drilling / Well Intervention)",
        "provider": "International Well Control Forum (IWCF)",
        "domain": "Well Safety",
        "level": "Intermediate",
        "prerequisites": [
          "Petroleum engineering background"
        ],
        "official_url": "https://www.iwcf.org",
        "sourceUrl": "https://www.iwcf.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-petroleum-ct2",
        "degree_id": "btech-petroleum",
        "cert_name": "Petrel & Eclipse Reservoir Simulation Specialist",
        "provider": "SLB Software",
        "domain": "Reservoir Modeling",
        "level": "Advanced",
        "prerequisites": [
          "Petrophysics and reservoir concepts"
        ],
        "official_url": "https://www.software.slb.com",
        "sourceUrl": "https://www.software.slb.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "btech-petroleum-ct3",
        "degree_id": "btech-petroleum",
        "cert_name": "NEBOSH International General Certificate in Occupational Health & Safety",
        "provider": "NEBOSH UK",
        "domain": "HSE Safety",
        "level": "Intermediate",
        "prerequisites": [
          "Open to all engineering students"
        ],
        "official_url": "https://www.nebosh.org.uk",
        "sourceUrl": "https://www.nebosh.org.uk",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "btech-petroleum-gv1",
        "degree_id": "btech-petroleum",
        "exam_or_post_name": "ONGC Graduate Trainee (AEE - Reservoir / Drilling / Production)",
        "conducting_body": "ONGC / GATE",
        "eligibility_rule": {
          "degreeFamily": "Petroleum Engineering",
          "allowedDegrees": [
            "B.Tech Petroleum Engineering"
          ],
          "mandatorySubjects": [
            "Petroleum Engineering (GATE PE)"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Class I Executive recruitment directly through GATE Petroleum Engineering (PE) paper."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ongcindia.com",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "btech-petroleum-gv2",
        "degree_id": "btech-petroleum",
        "exam_or_post_name": "Oil India Limited - Senior Officer (Petroleum)",
        "conducting_body": "Oil India Limited / GATE",
        "eligibility_rule": {
          "degreeFamily": "Petroleum Engineering",
          "allowedDegrees": [
            "B.Tech Petroleum"
          ],
          "mandatorySubjects": [
            "Petroleum Engineering"
          ],
          "minMarksPercent": 65,
          "ageLimitRule": {
            "general": 29,
            "obc": 32,
            "sc_st": 34
          },
          "notes": "Recruitment of upstream executives based on GATE score."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.oil-india.com",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "btech-petroleum-sw1",
        "degree_id": "btech-petroleum",
        "target_role": "Geothermal Energy & Carbon Capture (CCUS) Specialist",
        "pivot_reason": "Pivot subsurface reservoir simulation and deep well drilling competencies into geothermal energy production and geological CO2 sequestration.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Carbon Capture, Utilization & Storage (CCUS) Reservoir Mechanics",
            "type": "course",
            "detail": "Learn saline aquifer CO2 trapping mechanisms and pressure-transient monitoring.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Deep Geothermal Well Thermodynamics",
            "type": "course",
            "detail": "Model subsurface enthalpy, fractured reservoir flow, and binary power cycle generation.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Subsurface CO2 Plume Simulation Project",
            "type": "portfolio",
            "detail": "Simulate 30-year CO2 injection plume behavior using TOUGH2 or open-source reservoir tools.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "CCUS Subsurface Specialist Certificate",
          "Geothermal Project Development"
        ],
        "why_feasible": "Identical physics: subsurface fluid flow, porous media mechanics, and deep drilling apply directly to clean geothermal and carbon storage.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "btech-petroleum-ent1",
        "degree_id": "btech-petroleum",
        "idea_title": "Industrial Methane Leak Detection & Flaring Mitigation Audit",
        "description": "Provide optical gas imaging (OGI) and IoT acoustic leak detection to oil & gas refineries and city gas distribution networks.",
        "first_milestones": [
          "Acquire calibrated FLIR optical gas imaging camera and methane laser sensor.",
          "Execute pipeline corridor leak audit pilots for 2 state gas distribution companies.",
          "Generate automated ESG carbon-credit and fugitive-emission reduction reports."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax benefits and cleantech startup seed capital.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "Oil PSUs Start-up Fund (ONGC / IOCL)",
            "agency": "Ministry of Petroleum and Natural Gas",
            "benefits": "Specialized equity investment and mentoring fund for oil and gas innovations.",
            "sourceUrl": "https://mopng.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "btech-petroleum",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Petroleum Geology & Fluid Thermodynamics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master geology, organic chemistry, thermodynamics, and petroleum fluid mechanics.",
              "Complete field visit to drilling rig or regional oil exploration hub."
            ],
            "milestone": "Rig field visit report completed"
          },
          {
            "stepNumber": 2,
            "title": "Reservoir Simulation & Drilling Engineering",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn well logging, reservoir numerical simulation (Eclipse), and mud engineering.",
              "Complete 2-month summer internship at ONGC, Oil India, or Schlumberger."
            ],
            "milestone": "Summer internship at upstream operator"
          },
          {
            "stepNumber": 3,
            "title": "GATE PE Preparation & Capstone Field Development",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare rigorously for GATE (PE) examination.",
              "Execute final-year capstone project on hydraulic fracturing or EOR polymer flooding."
            ],
            "milestone": "High GATE PE score & published field plan"
          }
        ]
      },
      "completed": {
        "degree_id": "btech-petroleum",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "HSE Certification & Petroleum Portfolio Polish",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Complete IWCF or NEBOSH certification and review well control fundamentals.",
              "Structure technical portfolio emphasizing reservoir simulation runs and logging interpretations."
            ],
            "milestone": "Petroleum engineering resume with software proficiency"
          },
          {
            "stepNumber": 2,
            "title": "PSU & Multinational Oilfield Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to ONGC, Oil India, SLB, Halliburton, and Baker Hughes.",
              "Participate in technical assessments and behavioral interviews."
            ],
            "milestone": "Job offer secured from upstream operator"
          },
          {
            "stepNumber": 3,
            "title": "Graduate Trainee Onboarding & Well Site Posting",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Undergo offshore/onshore rig safety induction and wellsite training.",
              "Track professional competencies toward Senior Reservoir/Drilling Engineer."
            ],
            "milestone": "First successful well operation completed"
          }
        ]
      }
    }
  },
  {
    "degree_id": "polytechnic-mech",
    "id": "polytechnic-mech",
    "familyId": "engineering",
    "name": "Diploma in Mechanical Engineering",
    "shortName": "Polytechnic Mechanical",
    "aliases": [
      "Polytechnic Mechanical",
      "Diploma Mechanical",
      "Diploma in ME",
      "Polytechnic in Mechanical Engineering",
      "polytechnic-mech"
    ],
    "level": "Diploma",
    "discipline": "Engineering & Technology",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "AICTE",
    "overview": "A 3-year technical polytechnic diploma program focusing on hands-on workshop technologies, machine tool operations, computer-aided drafting (CAD), thermal systems, and plant maintenance. It prepares technical supervisors, junior engineers, and CNC programmers for rapid deployment in manufacturing and production plants.",
    "key_skills": [
      "CNC Machine Programming & G-Code / M-Code Operations",
      "Computer Aided Drafting & 3D Modeling (AutoCAD, SolidWorks)",
      "Machining, Milling, Lathe Operations & Fabrication",
      "Preventive & Breakdown Plant Maintenance",
      "Metrology, Quality Inspection & Vernier/Micrometer Measuring",
      "Hydraulic & Pneumatic Circuit Assembly"
    ],
    "subjects_taught": [
      "Workshop Technology & Manufacturing Processes",
      "Machine Drawing & Computer Aided Design (CAD)",
      "Thermal Engineering & Applied Thermodynamics",
      "Fluid Mechanics & Pneumatic Machinery",
      "Theory of Machines & Strength of Materials",
      "Industrial Management & Plant Maintenance"
    ],
    "typical_employers": [
      "Tata Motors",
      "Maruti Suzuki India",
      "Larsen & Toubro",
      "Mahindra & Mahindra",
      "Bajaj Auto",
      "Bharat Forge",
      "Indian Railways"
    ],
    "specializations": [
      {
        "id": "poly-mech-cnc",
        "name": "Tool & Die / CNC Programming",
        "aliases": [
          "CNC Specialist"
        ],
        "skillsGained": [
          "G-Code",
          "CAM Programming"
        ],
        "typicalRoles": [
          "CNC Machine Programmer"
        ]
      },
      {
        "id": "poly-mech-maint",
        "name": "Plant & Equipment Maintenance",
        "aliases": [
          "Maintenance Tech"
        ],
        "skillsGained": [
          "Hydraulics",
          "Bearing Overhaul"
        ],
        "typicalRoles": [
          "Maintenance Supervisor"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "poly-mech-c1",
        "degree_id": "polytechnic-mech",
        "role_title": "Junior Engineer (JE) / Production Supervisor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Hands-on training in machine tools, assembly line operations, and workshop technology directly prepares you for shop-floor supervisory roles.",
        "indicative_salary": {
          "min": 2.8,
          "max": 5.2,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Automotive Component Manufacturers Association (ACMA) Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Shop Floor Management",
          "AutoCAD",
          "Lathe/Milling",
          "5S Methodology"
        ],
        "top_employers": [
          "Maruti Suzuki",
          "Tata Motors",
          "L&T",
          "Bajaj Auto"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-mech-c2",
        "degree_id": "polytechnic-mech",
        "role_title": "CNC Programmer & Quality Inspector",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Proficiency in G-code, dimensional metrology, and engineering drawing interpretation qualifies you for precision CNC toolrooms.",
        "indicative_salary": {
          "min": 3.0,
          "max": 5.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Toolroom Industry Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "CNC G-Code",
          "SolidWorks",
          "Coordinate Measuring Machine (CMM)",
          "GD&T"
        ],
        "top_employers": [
          "Bharat Forge",
          "Sundaram Fasteners",
          "Bosch India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-mech-c3",
        "degree_id": "polytechnic-mech",
        "role_title": "Senior Plant Maintenance Superintendent",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of practical machine troubleshooting, hydraulic circuit overhaul, and preventive scheduling qualifies you for heading facility maintenance.",
        "indicative_salary": {
          "min": 8.5,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Industrial Supervisory Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Total Productive Maintenance (TPM)",
          "Root Cause Analysis",
          "Pneumatics/Hydraulics",
          "Team Management"
        ],
        "top_employers": [
          "Tata Steel",
          "JSW Steel",
          "L&T Heavy Engineering"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "poly-mech-hs1",
        "degree_id": "polytechnic-mech",
        "program_name": "B.Tech in Mechanical Engineering (Lateral Entry to 2nd Year)",
        "level": "UG",
        "entrance_exams": [
          "State Lateral Entry Entrance Tests (LEET, JELET, ECET)"
        ],
        "eligibility_rule": "Passed 3-year Diploma in Mechanical Engineering with minimum 45-50% marks from an AICTE-approved institution.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "State Government Engineering Colleges",
          "NITs (select)",
          "Reputed Autonomous Universities"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-mech-hs2",
        "degree_id": "polytechnic-mech",
        "program_name": "Advanced Diploma in Tool & Die Making",
        "level": "Diploma",
        "entrance_exams": [
          "MSME Tool Room Entrance Exam"
        ],
        "eligibility_rule": "Diploma in Mechanical / Production Engineering with minimum 50% aggregate.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "Central Tool Room & Training Centre (CTTC)",
          "Indo-German Tool Room (IGTR)",
          "NTTF"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "poly-mech-ct1",
        "degree_id": "polytechnic-mech",
        "cert_name": "Certified CNC Milling & Turning Programmer",
        "provider": "MSME Indo-German Tool Room",
        "domain": "Precision Machining",
        "level": "Intermediate",
        "prerequisites": [
          "Diploma in Mechanical or ITI"
        ],
        "official_url": "https://www.msme.gov.in",
        "sourceUrl": "https://www.msme.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-mech-ct2",
        "degree_id": "polytechnic-mech",
        "cert_name": "AutoCAD & SolidWorks Professional Mechanical Drafter",
        "provider": "Autodesk / Dassault Syst\u00e8mes",
        "domain": "Computer-Aided Design",
        "level": "Beginner",
        "prerequisites": [
          "Basic machine drawing knowledge"
        ],
        "official_url": "https://www.autodesk.com",
        "sourceUrl": "https://www.autodesk.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-mech-ct3",
        "degree_id": "polytechnic-mech",
        "cert_name": "Non-Destructive Testing (NDT Level II - UT/MPT/DPT)",
        "provider": "ISNT / ASNT",
        "domain": "Quality Inspection",
        "level": "Intermediate",
        "prerequisites": [
          "Diploma in engineering"
        ],
        "official_url": "https://www.isnt.org.in",
        "sourceUrl": "https://www.isnt.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "poly-mech-gv1",
        "degree_id": "polytechnic-mech",
        "exam_or_post_name": "SSC Junior Engineer (JE) - Mechanical",
        "conducting_body": "Staff Selection Commission (SSC)",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "Diploma in Mechanical Engineering",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Mechanical Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Recruited for Central Water Commission, CPWD, and Military Engineer Services (MES)."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-mech-gv2",
        "degree_id": "polytechnic-mech",
        "exam_or_post_name": "Railway Recruitment Board (RRB) Junior Engineer - Mechanical",
        "conducting_body": "Railway Recruitment Control Board",
        "eligibility_rule": {
          "degreeFamily": "Engineering",
          "allowedDegrees": [
            "Diploma in Mechanical",
            "B.Tech Mechanical"
          ],
          "mandatorySubjects": [
            "Mechanical Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 33,
            "obc": 36,
            "sc_st": 38
          },
          "notes": "Junior Engineer roles across Indian Railways workshops and locomotive sheds."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.rrbcdg.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "poly-mech-sw1",
        "degree_id": "polytechnic-mech",
        "target_role": "Robotic Welding & Industrial Automation Programmer",
        "pivot_reason": "Transition conventional fabrication and machining expertise into programming robotic welding cells and factory automation cobots.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Robotic Welding Cell Setup & Programming (FANUC / KUKA)",
            "type": "course",
            "detail": "Learn teach-pendant robot programming for automated MIG/TIG welding paths.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "PLC & Pneumatic Sensors Interface",
            "type": "course",
            "detail": "Wire proximity sensors and program basic pneumatic clamping sequences on PLC.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Robotic Fabrication Line Pilot",
            "type": "internship",
            "detail": "Assist integration team on an automotive chassis robotic welding assembly line.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Robotic Welding Operator Certificate",
          "Basic PLC Programming"
        ],
        "why_feasible": "Mechanical diploma holders know welding metallurgy, fixtures, and tolerances, making automated welding transition seamless.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "poly-mech-ent1",
        "degree_id": "polytechnic-mech",
        "idea_title": "Precision Job-Work & Toolroom Machining Enterprise",
        "description": "Establish a computerized lathe, milling, and fabrication job-work unit supplying machined components to regional tier-1 automotive suppliers.",
        "first_milestones": [
          "Acquire 1 refurbished CNC turning center and 1 manual universal milling machine under MSME scheme.",
          "Obtain vendor registration with 3 local engineering and fabrication companies.",
          "Deliver first batch of precision pins, bushes, and hydraulic manifolds."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP (Prime Minister's Employment Generation Programme)",
            "agency": "KVIC / MSME",
            "benefits": "Margin money subsidy of up to 25-35% on project cost up to 50 Lakhs.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "MUDRA Yojana (Kishor / Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Collateral-free loans up to 10 Lakhs for machinery acquisition.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "polytechnic-mech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Workshop Hand Tools & Mechanical Drafting",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master bench-work, fitting, welding, lathe operations, and machine drafting.",
              "Learn 2D Drafting in AutoCAD."
            ],
            "milestone": "Completed workshop fitting and 2D machine assembly drawing"
          },
          {
            "stepNumber": 2,
            "title": "Thermal Lab & CNC Programming Practice",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Operate CNC turning machines and calculate cutting speeds/feeds.",
              "Complete 1-month mandatory industrial internship at manufacturing company."
            ],
            "milestone": "Industrial training internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "Final Year Capstone Fabrication & Placement Drives",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Fabricate working mechanical prototype (e.g. pneumatic sheet cutter or motorized cart).",
              "Prepare for campus interviews and state lateral entry entrance tests."
            ],
            "milestone": "Polytechnic diploma completed with campus placement offer"
          }
        ]
      },
      "completed": {
        "degree_id": "polytechnic-mech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Preparation & Metrology Skill Documentation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document machine tool proficiencies, CAD certifications, and safety practices.",
              "Review engineering drawing symbols, limits, fits, and tolerances."
            ],
            "milestone": "Polished diploma technician resume"
          },
          {
            "stepNumber": 2,
            "title": "Campus Placement Drives & Government JE Preparation",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to Tata Motors, Maruti Suzuki, L&T, and state junior engineer exams.",
              "Practice technical multiple-choice questions for SSC-JE / RRB-JE."
            ],
            "milestone": "Selection as Diploma Engineer Trainee (DET)"
          },
          {
            "stepNumber": 3,
            "title": "Diploma Engineer Trainee Onboarding & Lateral Entry",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join company as DET, oversee shop floor shifts, and master quality audits.",
              "Optionally enroll in B.Tech Mechanical evening/lateral entry degree."
            ],
            "milestone": "Completed DET probation with permanent absorption"
          }
        ]
      }
    }
  },
  {
    "degree_id": "polytechnic-civil",
    "id": "polytechnic-civil",
    "familyId": "engineering",
    "name": "Diploma in Civil Engineering",
    "shortName": "Polytechnic Civil",
    "aliases": [
      "Polytechnic Civil",
      "Diploma Civil",
      "Diploma in CE",
      "Polytechnic in Civil Engineering",
      "polytechnic-civil"
    ],
    "level": "Diploma",
    "discipline": "Engineering & Technology",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "AICTE",
    "overview": "A 3-year polytechnic diploma program training students in building construction practices, Total Station surveying, quantity surveying, concrete technology, and site supervision. It prepares site supervisors, junior civil engineers, and CAD draftspersons for residential, commercial, and highway infrastructure projects.",
    "key_skills": [
      "Total Station & Digital Theodolite Surveying",
      "Building Drafting & Architectural CAD (AutoCAD Civil)",
      "Quantity Surveying, Estimating & Costing (BOQ Preparation)",
      "Reinforced Concrete Quality Control & Slump/Compressive Testing",
      "Site Supervision, Bar Bending Schedule (BBS) & Labor Management",
      "Highway & Road Construction Quality Inspection"
    ],
    "subjects_taught": [
      "Building Construction & Materials",
      "Surveying & Leveling (Theory & Camp)",
      "Concrete Technology & Soil Mechanics",
      "Estimating, Costing & Valuation",
      "Design of Reinforced Concrete Structures",
      "Transportation Engineering & Water Supply"
    ],
    "typical_employers": [
      "Larsen & Toubro Construction",
      "Shapoorji Pallonji",
      "Tata Projects",
      "Afcons Infrastructure",
      "DLF",
      "State PWD",
      "National Highways Authority of India (NHAI) contractors"
    ],
    "specializations": [
      {
        "id": "poly-civil-site",
        "name": "Building Construction & Site Supervision",
        "aliases": [
          "Site Civil"
        ],
        "skillsGained": [
          "Site Supervision",
          "BBS"
        ],
        "typicalRoles": [
          "Civil Site Supervisor"
        ]
      },
      {
        "id": "poly-civil-survey",
        "name": "Total Station Surveying & GIS",
        "aliases": [
          "Land Surveyor"
        ],
        "skillsGained": [
          "Total Station",
          "Contour Mapping"
        ],
        "typicalRoles": [
          "Land Surveyor"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "poly-civil-c1",
        "degree_id": "polytechnic-civil",
        "role_title": "Junior Engineer (JE) / Civil Site Supervisor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Comprehensive training in concrete testing, bar bending schedules, and site supervision directly qualifies you for real-estate and infrastructure sites.",
        "indicative_salary": {
          "min": 2.8,
          "max": 5.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Construction Industry Development Council (CIDC) Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Site Supervision",
          "Bar Bending Schedule",
          "Concrete Testing",
          "AutoCAD"
        ],
        "top_employers": [
          "L&T Construction",
          "Shapoorji Pallonji",
          "Tata Projects",
          "Sobha Developers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-civil-c2",
        "degree_id": "polytechnic-civil",
        "role_title": "Quantity Estimator & Billing Supervisor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Coursework in estimating, costing, and bill-of-quantities (BOQ) preparation enables accurate measurement and subcontractor billing verification.",
        "indicative_salary": {
          "min": 3.0,
          "max": 5.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Civil Contractor Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "BOQ Preparation",
          "Measurement Book (MB)",
          "MS Excel",
          "Cost Estimation"
        ],
        "top_employers": [
          "Afcons",
          "Dilip Buildcon",
          "NCC Urban",
          "Ahluwalia Contracts"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-civil-c3",
        "degree_id": "polytechnic-civil",
        "role_title": "Chief Site Execution Superintendent",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of managing large highway or commercial structural execution, vendor billing, and labor teams qualifies you for site management.",
        "indicative_salary": {
          "min": 8.0,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Construction Supervisory Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Project Execution",
          "Subcontractor P&L",
          "Quality Audits",
          "Safety Compliance"
        ],
        "top_employers": [
          "L&T Construction",
          "Tata Projects",
          "J. Kumar Infraprojects"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "poly-civil-hs1",
        "degree_id": "polytechnic-civil",
        "program_name": "B.Tech in Civil Engineering (Lateral Entry to 2nd Year)",
        "level": "UG",
        "entrance_exams": [
          "State Lateral Entry Entrance Tests (LEET, JELET, ECET)"
        ],
        "eligibility_rule": "Passed 3-year Diploma in Civil Engineering with minimum 45-50% marks from an AICTE-approved polytechnic.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "State Government Engineering Colleges",
          "Reputed Autonomous Universities",
          "NITs (select)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-civil-hs2",
        "degree_id": "polytechnic-civil",
        "program_name": "Post Diploma in Construction Project Management / Advanced Surveying",
        "level": "Diploma",
        "entrance_exams": [
          "Institutional Merit / Test"
        ],
        "eligibility_rule": "Diploma in Civil Engineering with minimum 50% aggregate.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "National Institute of Construction Management and Research (NICMAR)",
          "State Technical Boards"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "poly-civil-ct1",
        "degree_id": "polytechnic-civil",
        "cert_name": "Certified Total Station & GPS Land Surveyor",
        "provider": "State Survey Training Institute / MSME",
        "domain": "Land Surveying",
        "level": "Beginner",
        "prerequisites": [
          "Diploma in Civil or 10+2"
        ],
        "official_url": "https://www.msme.gov.in",
        "sourceUrl": "https://www.msme.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-civil-ct2",
        "degree_id": "polytechnic-civil",
        "cert_name": "AutoCAD Civil 3D & Building Estimation Specialist",
        "provider": "Autodesk Certified Training Partner",
        "domain": "Structural CAD",
        "level": "Intermediate",
        "prerequisites": [
          "Civil engineering drawing basics"
        ],
        "official_url": "https://www.autodesk.com",
        "sourceUrl": "https://www.autodesk.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-civil-ct3",
        "degree_id": "polytechnic-civil",
        "cert_name": "Quality Control & Concrete Testing Technician",
        "provider": "National Accreditation Board for Testing and Calibration Laboratories (NABL)",
        "domain": "Material Testing",
        "level": "Intermediate",
        "prerequisites": [
          "Diploma in Civil Engineering"
        ],
        "official_url": "https://nabl-india.org",
        "sourceUrl": "https://nabl-india.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "poly-civil-gv1",
        "degree_id": "polytechnic-civil",
        "exam_or_post_name": "SSC Junior Engineer (JE) - Civil",
        "conducting_body": "Staff Selection Commission (SSC)",
        "eligibility_rule": {
          "degreeFamily": "Civil Engineering",
          "allowedDegrees": [
            "Diploma in Civil Engineering",
            "B.Tech Civil"
          ],
          "mandatorySubjects": [
            "Civil Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government recruitment for CPWD, MES, and Central Water Commission."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-civil-gv2",
        "degree_id": "polytechnic-civil",
        "exam_or_post_name": "State PWD / Irrigation Department Junior Engineer (Civil)",
        "conducting_body": "State Public Service Commissions / Subordinate Services",
        "eligibility_rule": {
          "degreeFamily": "Civil Engineering",
          "allowedDegrees": [
            "Diploma in Civil Engineering"
          ],
          "mandatorySubjects": [
            "Civil Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Permanent junior engineer cadre in state public works and municipal departments."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "poly-civil-sw1",
        "degree_id": "polytechnic-civil",
        "target_role": "BIM (Building Information Modeling) Modeler",
        "pivot_reason": "Transition 2D site drawings into 3D Revit architectural and structural models with clash detection and 4D construction scheduling.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Autodesk Revit Architecture & Structure Mastery",
            "type": "course",
            "detail": "Learn parametric family creation, structural reinforcement detailing, and BIM levels.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Navisworks Clash Detection & Coordination",
            "type": "course",
            "detail": "Run MEP vs Structural interference reports and generate coordination matrices.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Multi-Story Residential BIM Capstone",
            "type": "portfolio",
            "detail": "Deliver complete 3D Revit structural model with automated bill of materials.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Autodesk Certified Professional: Revit Structure",
          "BIM Coordinator Certificate"
        ],
        "why_feasible": "Civil diploma holders understand real physical construction details, giving them a distinct advantage over pure software draftspersons.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "poly-civil-ent1",
        "degree_id": "polytechnic-civil",
        "idea_title": "Civil Contracting & Total Station Surveying Agency",
        "description": "Offer land demarcation, contour mapping, building layout setting, and small-scale commercial/residential civil execution.",
        "first_milestones": [
          "Acquire a modern refurbished Total Station and automatic digital level.",
          "Obtain Class-IV contractor registration with local municipal council or PWD.",
          "Execute layout setting and construction supervision for 5 private villa projects."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / Ministry of MSME",
            "benefits": "Up to 25-35% subsidy on survey instrument and construction equipment loans.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "MUDRA Loan (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Collateral-free working capital loans up to 10 Lakhs.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "polytechnic-civil",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Building Materials, Drafting & Levelling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master building materials, chain surveying, plane table, and 2D AutoCAD civil drafting.",
              "Conduct field leveling exercises and concrete slump tests."
            ],
            "milestone": "Completed surveying field camp and CAD drafting portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Total Station Survey & Concrete Tech Lab",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Operate digital theodolite and Total Station for contour and layout marking.",
              "Complete 1-month summer site internship with a residential or highway contractor."
            ],
            "milestone": "Summer site training internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "Estimating, Costing & Capstone Model",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare complete estimates, rate analysis, and Bar Bending Schedule (BBS) for G+2 building.",
              "Prepare for state junior engineer exams and campus recruitment."
            ],
            "milestone": "Diploma completed with campus supervisor offer"
          }
        ]
      },
      "completed": {
        "degree_id": "polytechnic-civil",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Site Resume & Portfolio Preparation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document Total Station competencies, concrete testing certifications, and site experience.",
              "Review structural drawing notations, mix designs, and safety standards."
            ],
            "milestone": "Site-ready civil diploma engineer resume"
          },
          {
            "stepNumber": 2,
            "title": "Site Interviews & Government JE Exam Prep",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Diploma Engineer Trainee (DET) positions with L&T, Shapoorji, and Tata Projects.",
              "Solve past year questions for SSC-JE and State PWD JE examinations."
            ],
            "milestone": "Placement offer secured as Civil Site Engineer"
          },
          {
            "stepNumber": 3,
            "title": "Field Site Engineering & Career Progression",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead site work packages, inspect rebar before casting, and manage sub-contractors.",
              "Explore B.Tech lateral entry or advanced BIM certifications."
            ],
            "milestone": "Successful completion of first structural building casting"
          }
        ]
      }
    }
  },
  {
    "degree_id": "polytechnic-eee",
    "id": "polytechnic-eee",
    "familyId": "engineering",
    "name": "Diploma in Electrical & Electronics Engineering",
    "shortName": "Polytechnic EEE",
    "aliases": [
      "Polytechnic EEE",
      "Diploma EEE",
      "Diploma in Electrical",
      "Polytechnic in Electrical Engineering",
      "polytechnic-eee"
    ],
    "level": "Diploma",
    "discipline": "Engineering & Technology",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "AICTE",
    "overview": "A 3-year polytechnic diploma program providing rigorous training in electrical machine operations, power distribution, panel wiring, industrial motor drives, and electronic control circuits. It prepares electrical supervisors, maintenance engineers, and substation operators for power utilities, metro systems, and manufacturing industries.",
    "key_skills": [
      "Industrial Panel Wiring, Switchgear & Contactor Assembly",
      "AC/DC Motor Overhaul, Starters & Variable Frequency Drives (VFD)",
      "Substation Equipment Maintenance & Transformer Oil Testing",
      "Electrical CAD & Single Line Diagram (SLD) Drafting",
      "Power Factor Correction & Energy Metering Audits",
      "Safety Grounding, Earthing Testing & Indian Electricity Rules (IE Rules)"
    ],
    "subjects_taught": [
      "Electrical Circuits & Network Analysis",
      "Electrical Machines (Transformers, Alternators, Induction Motors)",
      "Power System Generation, Transmission & Distribution",
      "Analog & Digital Electronics",
      "Switchgear, Protection & Indian Electricity (IE) Rules",
      "Industrial Automation, PLC & Electrical Estimation"
    ],
    "typical_employers": [
      "State Electricity Distribution Companies (DISCOMs)",
      "Schneider Electric",
      "Siemens India",
      "ABB India",
      "L&T Electrical & Automation",
      "Delhi Metro Rail Corporation (DMRC)",
      "BHEL"
    ],
    "specializations": [
      {
        "id": "poly-eee-power",
        "name": "Power Distribution & Substation Operations",
        "aliases": [
          "Substation EEE"
        ],
        "skillsGained": [
          "Substation Maintenance",
          "Switchgear"
        ],
        "typicalRoles": [
          "Substation Operator / Junior Engineer"
        ]
      },
      {
        "id": "poly-eee-industrial",
        "name": "Industrial Panel Wiring & Motor Drives",
        "aliases": [
          "Industrial Electrician"
        ],
        "skillsGained": [
          "VFDs",
          "Panel Assembly"
        ],
        "typicalRoles": [
          "Electrical Maintenance Supervisor"
        ]
      }
    ],
    "sourceUrl": "https://www.aicte-india.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "poly-eee-c1",
        "degree_id": "polytechnic-eee",
        "role_title": "Junior Engineer (JE) / Electrical Maintenance Supervisor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Training in motor winding, control panel wiring, and switchgear operation directly qualifies you for industrial electrical maintenance.",
        "indicative_salary": {
          "min": 2.8,
          "max": 5.2,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Electrical Equipment Industry Association (IEEMA) Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Panel Wiring",
          "Motor Control",
          "VFD Tuning",
          "IE Rules"
        ],
        "top_employers": [
          "Schneider Electric",
          "Siemens",
          "L&T",
          "ABB",
          "Tata Power"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-eee-c2",
        "degree_id": "polytechnic-eee",
        "role_title": "Solar PV Installation & Commissioning Technician",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Knowledge of inverters, DC string combiners, grounding, and grid-tied systems enables rapid commissioning of rooftop and commercial solar plants.",
        "indicative_salary": {
          "min": 3.0,
          "max": 5.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Renewable Energy Employment Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Solar PV Layout",
          "String Inverters",
          "Earthing Pit Testing",
          "Net Metering"
        ],
        "top_employers": [
          "Tata Power Solar",
          "Adani Solar",
          "Waaree",
          "Vikram Solar"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-eee-c3",
        "degree_id": "polytechnic-eee",
        "role_title": "Chief Electrical Installation Superintendent",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Holding an 'A' Grade Electrical Supervisor License and 10+ years of substation and HT panel commissioning qualifies you for managing heavy industrial electrification.",
        "indicative_salary": {
          "min": 8.5,
          "max": 17.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Industrial Electrical Supervisory Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "A-Grade Electrical License",
          "HT Substation Maintenance",
          "Transformer Overhaul",
          "Statutory Safety Audits"
        ],
        "top_employers": [
          "L&T Construction",
          "ABB",
          "BHEL",
          "JSW Energy"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "poly-eee-hs1",
        "degree_id": "polytechnic-eee",
        "program_name": "B.Tech in Electrical & Electronics Engineering (Lateral Entry to 2nd Year)",
        "level": "UG",
        "entrance_exams": [
          "State Lateral Entry Entrance Tests (LEET, JELET, ECET)"
        ],
        "eligibility_rule": "Passed 3-year Diploma in Electrical Engineering with minimum 45-50% marks from an AICTE-approved polytechnic.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "State Government Engineering Colleges",
          "Reputed Autonomous Universities",
          "NITs (select)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-eee-hs2",
        "degree_id": "polytechnic-eee",
        "program_name": "Electrical Supervisor Competency Certificate ('A' Grade License)",
        "level": "Professional",
        "entrance_exams": [
          "State Electrical Licensing Board Examination"
        ],
        "eligibility_rule": "Diploma in Electrical Engineering plus required practical electrical installation experience.",
        "typical_duration": "Statutory License",
        "top_institutes": [
          "State Electrical Licensing Boards / Chief Electrical Inspectorate"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "poly-eee-ct1",
        "degree_id": "polytechnic-eee",
        "cert_name": "Certified Industrial Automation Specialist (PLC & SCADA)",
        "provider": "Schneider Electric / Siemens Training",
        "domain": "Industrial Automation",
        "level": "Intermediate",
        "prerequisites": [
          "Basic electrical circuit knowledge"
        ],
        "official_url": "https://www.schneider-electric.co.in",
        "sourceUrl": "https://www.schneider-electric.co.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-eee-ct2",
        "degree_id": "polytechnic-eee",
        "cert_name": "Solar PV Rooftop Grid-Connected System Designer",
        "provider": "National Institute of Solar Energy (NISE) - Suryamitra",
        "domain": "Renewable Energy",
        "level": "Beginner",
        "prerequisites": [
          "Diploma in Electrical / Electronics"
        ],
        "official_url": "https://nise.res.in",
        "sourceUrl": "https://nise.res.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "poly-eee-ct3",
        "degree_id": "polytechnic-eee",
        "cert_name": "Electrical CAD & Control Panel Drafting Specialist",
        "provider": "Autodesk Certified Partner",
        "domain": "Electrical Drafting",
        "level": "Beginner",
        "prerequisites": [
          "Circuit theory fundamentals"
        ],
        "official_url": "https://www.autodesk.com",
        "sourceUrl": "https://www.autodesk.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "poly-eee-gv1",
        "degree_id": "polytechnic-eee",
        "exam_or_post_name": "SSC Junior Engineer (JE) - Electrical",
        "conducting_body": "Staff Selection Commission (SSC)",
        "eligibility_rule": {
          "degreeFamily": "Electrical Engineering",
          "allowedDegrees": [
            "Diploma in Electrical Engineering",
            "B.Tech EEE"
          ],
          "mandatorySubjects": [
            "Electrical Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government recruitment for CPWD, Military Engineer Services (MES), and Central Water Commission."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "poly-eee-gv2",
        "degree_id": "polytechnic-eee",
        "exam_or_post_name": "State DISCOM Junior Engineer (Electrical) / Substation Operator",
        "conducting_body": "State Electricity Transmission & Distribution Corporations",
        "eligibility_rule": {
          "degreeFamily": "Electrical Engineering",
          "allowedDegrees": [
            "Diploma in Electrical Engineering"
          ],
          "mandatorySubjects": [
            "Electrical Engineering"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Junior Engineer roles across state transmission, distribution, and thermal generation utilities."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "poly-eee-sw1",
        "degree_id": "polytechnic-eee",
        "target_role": "Electric Vehicle (EV) Charging Infrastructure & Powertrain Technician",
        "pivot_reason": "Apply knowledge of DC power conversion, battery management systems (BMS), and high-voltage safety to EV fast charging stations and battery pack testing.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Electric Vehicle Architecture & Lithium Battery Safety",
            "type": "course",
            "detail": "Master battery cell balancing, thermal runaway prevention, and high-voltage DC interlocks.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "CCS2 / CHAdeMO DC Fast Charger Commissioning",
            "type": "course",
            "detail": "Learn OCPP communication protocols, power conversion modules, and transformer grid tie-ins.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "EV Charging Station Fleet Commissioning Internship",
            "type": "internship",
            "detail": "Hands-on installation and testing of 60kW/120kW public EV chargers.",
            "estimatedMonths": 3
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "EV High-Voltage Safety Certification",
          "Certified EV Charging Infrastructure Technician"
        ],
        "why_feasible": "Electrical diploma holders already master AC/DC conversions, earthing, contactors, and high current safety.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "poly-eee-ent1",
        "degree_id": "polytechnic-eee",
        "idea_title": "Rooftop Solar & Industrial Electrical Contracting Enterprise",
        "description": "Offer residential rooftop solar EPC (Engineering, Procurement, Construction) and commercial panel wiring and safety audits.",
        "first_milestones": [
          "Acquire electrical contractor license from the State Electrical Licensing Board.",
          "Empanel under the PM Surya Ghar: Muft Bijli Yojana for subsidized residential rooftop installations.",
          "Complete first 10 grid-connected rooftop solar installations with net-metering."
        ],
        "relevant_schemes": [
          {
            "name": "PM Surya Ghar: Muft Bijli Yojana",
            "agency": "Ministry of New and Renewable Energy (MNRE)",
            "benefits": "Direct financial subsidies and high consumer demand for empanelled vendors.",
            "sourceUrl": "https://pmsuryaghar.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Subsidy up to 35% on tools, diagnostic meters, and installation transport vehicles.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "polytechnic-eee",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Circuit Theory, Electrical Machines & Safety",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Ohm's law, AC circuits, single-phase transformers, and DC motors.",
              "Practice wiring lighting circuits and electrical safety grounding."
            ],
            "milestone": "Completed motor bench testing and circuit wiring"
          },
          {
            "stepNumber": 2,
            "title": "Power Systems, Motor Drives & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study 3-phase induction motors, VFD motor control, and power distribution.",
              "Complete 1-month summer industrial training at power substation or factory."
            ],
            "milestone": "Industrial electrical training certificate"
          },
          {
            "stepNumber": 3,
            "title": "Panel Wiring Capstone & State Exam Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Design and wire industrial motor starter panel with overload and phase protection.",
              "Prepare for state DISCOM junior engineer exams and campus recruitment."
            ],
            "milestone": "Diploma completed with campus placement offer"
          }
        ]
      },
      "completed": {
        "degree_id": "polytechnic-eee",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Electrical Resume & Licensing Preparation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document multimeter, clamp meter, and megger insulation testing proficiencies.",
              "Apply for State Electrical Wireman / Supervisor license exam."
            ],
            "milestone": "Certified electrical diploma resume"
          },
          {
            "stepNumber": 2,
            "title": "Campus Placement & DISCOM Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to Tata Power, Schneider, Siemens, and state DISCOM junior engineer exams.",
              "Practice technical objective questions on machines and power systems."
            ],
            "milestone": "Selected as Junior Electrical Engineer"
          },
          {
            "stepNumber": 3,
            "title": "Electrical Site Onboarding & Professional Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Assume responsibility for plant electrical operations or substation watch.",
              "Pursue B.Tech lateral entry or advanced solar/automation certifications."
            ],
            "milestone": "Promoted to full Electrical Maintenance Supervisor"
          }
        ]
      }
    }
  }
];
