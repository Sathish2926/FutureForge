import { UniversalDegreeRecord } from "./types";

export const SCIENCES_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "bsc-physics",
    "id": "bsc-physics",
    "familyId": "science",
    "name": "Bachelor of Science in Physics",
    "shortName": "B.Sc Physics",
    "aliases": [
      "BSc Physics",
      "B.Sc. Physics",
      "BSc (Hons) Physics",
      "Physics graduate",
      "bsc-physics"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A rigorous undergraduate program in classical mechanics, electromagnetism, quantum mechanics, statistical thermodynamics, optics, and solid-state physics. It cultivates analytical problem-solving, mathematical modeling, and experimental measurement competencies essential for scientific research and technology sectors.",
    "key_skills": [
      "Mathematical Physics & Differential Equations",
      "Quantum Mechanics & Wavefunction Formalism",
      "Classical Electrodynamics & Circuit Analysis",
      "Optics, Laser Spectroscopy & Interferometry",
      "Computational Physics & Numerical Methods (Python / MATLAB)",
      "Precision Instrumentation & Error Analysis"
    ],
    "subjects_taught": [
      "Classical Mechanics & Relativity",
      "Electricity, Magnetism & Electromagnetic Theory",
      "Quantum Mechanics & Atomic Physics",
      "Thermal Physics & Statistical Mechanics",
      "Solid State Physics & Semiconductor Devices",
      "Digital Electronics & Computational Physics"
    ],
    "typical_employers": [
      "Bhabha Atomic Research Centre (BARC)",
      "ISRO",
      "DRDO",
      "Semiconductor Labs",
      "National Physical Laboratory (NPL)",
      "Optics & Sensor Manufacturers",
      "Tech Analytics Firms"
    ],
    "specializations": [
      {
        "id": "phys-astrophysics",
        "name": "Astrophysics & Space Science",
        "aliases": [
          "Space Physics"
        ],
        "skillsGained": [
          "Radio Astronomy",
          "Orbital Mechanics"
        ],
        "typicalRoles": [
          "Scientific Assistant",
          "Observatory Analyst"
        ]
      },
      {
        "id": "phys-electronics",
        "name": "Applied Electronics & Instrumentation",
        "aliases": [
          "Applied Physics"
        ],
        "skillsGained": [
          "Sensor Interfacing",
          "Signal Processing"
        ],
        "typicalRoles": [
          "Instrumentation Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-phy-c1",
        "degree_id": "bsc-physics",
        "role_title": "Scientific Assistant / Laboratory Analyst",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Your training in optical spectrometry, vacuum systems, and precision electronic measurements directly qualifies you for national laboratories.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "CSIR / Govt Level 6 Pay Matrix (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Optical Spectrometry",
          "Oscilloscopes",
          "Calibration",
          "Vacuum Systems"
        ],
        "top_employers": [
          "BARC",
          "DRDO",
          "CSIR Labs",
          "Inter-University Accelerator Centre"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-phy-c2",
        "degree_id": "bsc-physics",
        "role_title": "Optical & Sensor Metrology Technician",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Wave optics, laser physics, and thin-film interferometry coursework maps directly to testing and calibrating precision optical sensors.",
        "indicative_salary": {
          "min": 4.0,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Optoelectronics Industry Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Interferometry",
          "Laser Safety",
          "Sensor Calibration",
          "MATLAB"
        ],
        "top_employers": [
          "Carl Zeiss India",
          "Thorlabs",
          "Optics Fabrication Startups"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-phy-c3",
        "degree_id": "bsc-physics",
        "role_title": "Chief Quantum Hardware / Semiconductor Metrology Lead",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Advanced mastery of solid-state crystallography, cryogenic physics, and quantum transport qualifies you to lead R&D in quantum computing and semiconductor fabrication.",
        "indicative_salary": {
          "min": 18.0,
          "max": 36.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Semiconductor R&D Executive Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Solid State Physics",
          "Cryogenics",
          "Cleanroom Fabrication",
          "Quantum Hardware"
        ],
        "top_employers": [
          "Applied Materials",
          "IBM Quantum",
          "Tata Electronics Semiconductor (TEPL)"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-phy-hs1",
        "degree_id": "bsc-physics",
        "program_name": "M.Sc in Physics",
        "level": "PG",
        "entrance_exams": [
          "IIT JAM (PH)",
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Physics as a major subject for at least two years and Mathematics for at least one year with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Kanpur",
          "IISc Bangalore",
          "Delhi University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-phy-hs2",
        "degree_id": "bsc-physics",
        "program_name": "Integrated Ph.D. in Physical Sciences",
        "level": "Integrated",
        "entrance_exams": [
          "JEST",
          "IIT JAM (PH)"
        ],
        "eligibility_rule": "B.Sc Physics with first-class marks and high percentile in JEST or JAM.",
        "typical_duration": "5-6 Years",
        "top_institutes": [
          "TIFR Mumbai",
          "IISc Bangalore",
          "RRI Bengaluru",
          "IMSc Chennai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-phy-ct1",
        "degree_id": "bsc-physics",
        "cert_name": "Certified Computational Physics & Python Modeling",
        "provider": "Coursera / IBM",
        "domain": "Computational Science",
        "level": "Intermediate",
        "prerequisites": [
          "Calculus and basic Python"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-phy-ct2",
        "degree_id": "bsc-physics",
        "cert_name": "Laser Safety & Optoelectronics Specialist",
        "provider": "Laser Institute of America (LIA)",
        "domain": "Optical Safety",
        "level": "Beginner",
        "prerequisites": [
          "Basic wave optics"
        ],
        "official_url": "https://www.lia.org",
        "sourceUrl": "https://www.lia.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-phy-ct3",
        "degree_id": "bsc-physics",
        "cert_name": "LabVIEW Certified Associate Developer (CLAD)",
        "provider": "National Instruments (NI)",
        "domain": "Instrumentation",
        "level": "Intermediate",
        "prerequisites": [
          "Circuits and sensors"
        ],
        "official_url": "https://www.ni.com",
        "sourceUrl": "https://www.ni.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-phy-gv1",
        "degree_id": "bsc-physics",
        "exam_or_post_name": "BARC Scientific Assistant (Physics) / OCES-DGFS",
        "conducting_body": "Bhabha Atomic Research Centre",
        "eligibility_rule": {
          "degreeFamily": "Science",
          "allowedDegrees": [
            "B.Sc Physics + M.Sc Physics"
          ],
          "mandatorySubjects": [
            "Physics",
            "Mathematics"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 26,
            "obc": 29,
            "sc_st": 31
          },
          "notes": "OCES recruitment through GATE (PH) or BARC online entrance exam."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.barcocesexam.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-phy-gv2",
        "degree_id": "bsc-physics",
        "exam_or_post_name": "Meteorological Assistant / Scientific Assistant - IMD",
        "conducting_body": "SSC / India Meteorological Department",
        "eligibility_rule": {
          "degreeFamily": "Science",
          "allowedDegrees": [
            "B.Sc Physics"
          ],
          "mandatorySubjects": [
            "Physics",
            "Mathematics"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Staff Selection Commission conducts the Scientific Assistant (IMD) examination."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-phy-sw1",
        "degree_id": "bsc-physics",
        "target_role": "Quantitative Financial Risk Analyst",
        "pivot_reason": "Apply statistical mechanics, stochastic differential equations, and differential modeling to pricing financial options and market volatility modeling.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Stochastic Calculus & Black-Scholes PDE Modeling",
            "type": "course",
            "detail": "Connect diffusion differential equations to option pricing and risk simulations.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Python Quantitative Finance Frameworks (QuantLib)",
            "type": "course",
            "detail": "Implement Monte Carlo simulations and interest rate yield curve fitting in Python.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Algorithmic Risk Management Capstone",
            "type": "portfolio",
            "detail": "Model portfolio Value-at-Risk (VaR) and stress-testing on live equities data.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "CQF (Certificate in Quantitative Finance)",
          "FRM Part I"
        ],
        "why_feasible": "Physicists invented financial econophysics; Brownian motion models in physics map directly to financial asset dynamics.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-phy-ent1",
        "degree_id": "bsc-physics",
        "idea_title": "Precision Optical Inspection & Calibration Laboratory",
        "description": "Establish an NABL-accredited optical testing lab providing laser calibration, lens surface metrology, and lux-level lighting certification.",
        "first_milestones": [
          "Acquire calibrated spectrometer, optical power meter, and laser alignment benches.",
          "Achieve NABL accreditation under ISO/IEC 17025 for optical measurements.",
          "Contract with regional LED luminaire manufacturers and educational labs for annual calibration."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Proof of concept and instrumentation acquisition funding.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE)",
            "agency": "Ministry of MSME",
            "benefits": "Collateral-free credit up to 2 Crore for setting up testing laboratories.",
            "sourceUrl": "https://www.cgtmse.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-physics",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Mechanics, Electromagnetism & Lab Practicals",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Newtonian mechanics, vector calculus, wave optics, and basic electrical circuits.",
              "Perform experiments in spectrometer prism dispersion and galvanometer calibration."
            ],
            "milestone": "Physics laboratory record completed with precision error analysis"
          },
          {
            "stepNumber": 2,
            "title": "Quantum Mechanics, Solid State & Computational Lab",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study Schr\u00f6dinger wave equations, semiconductor band gaps, and Python numerical modeling.",
              "Complete summer research fellowship (SRFP) at IASc/INSA/TIFR."
            ],
            "milestone": "Summer research fellowship project report"
          },
          {
            "stepNumber": 3,
            "title": "IIT JAM (PH) / JEST Preparation & Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Rigorously practice past 10 years of IIT JAM and JEST question papers.",
              "Complete final-year experimental project on thin films or photoelectric effect."
            ],
            "milestone": "High percentile in IIT JAM (PH) or campus placement"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-physics",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Drafting & Scientific Software Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document mathematical physics modeling in Python, LabVIEW, and LaTeX typesetting.",
              "Review fundamental physics interview questions across classical mechanics and electromagnetism."
            ],
            "milestone": "Polished scientific resume with GitHub code repository"
          },
          {
            "stepNumber": 2,
            "title": "Research Institute / Industry Placement Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for scientific assistant vacancies in national labs and optoelectronics firms.",
              "Attend technical interviews and laboratory demonstration rounds."
            ],
            "milestone": "Offer secured as Scientific Officer or Optical Specialist"
          },
          {
            "stepNumber": 3,
            "title": "Onboarding & Advanced PG Research Alignment",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join laboratory, calibrate instruments, and maintain laboratory notebooks.",
              "Pursue M.Sc / Ph.D. qualifying pathways."
            ],
            "milestone": "Successfully completed initial research probation"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-chemistry",
    "id": "bsc-chemistry",
    "familyId": "science",
    "name": "Bachelor of Science in Chemistry",
    "shortName": "B.Sc Chemistry",
    "aliases": [
      "BSc Chemistry",
      "B.Sc. Chemistry",
      "BSc (Hons) Chemistry",
      "Chemical Sciences graduate",
      "bsc-chemistry"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A foundational degree covering inorganic, organic, and physical chemistry, analytical instrumentation, and spectroscopic elucidation. Students gain hands-on proficiency in chemical synthesis, chromatographic separations, chemical kinetics, and quality testing essential for pharmaceuticals, agrochemicals, and polymers.",
    "key_skills": [
      "Synthetic Organic Reactions & Mechanism Pathways",
      "Analytical Spectroscopy (UV-Vis, FTIR, NMR, Mass Spectrometry)",
      "Titrimetric & Gravimetric Chemical Analysis",
      "Chromatographic Techniques (TLC, HPLC, Gas Chromatography)",
      "Chemical Thermodynamics, Kinetics & Electrochemistry",
      "Laboratory Safety (OSHA) & Hazardous Waste Management"
    ],
    "subjects_taught": [
      "Organic Reaction Mechanisms & Stereochemistry",
      "Coordination Chemistry & Transition Metals",
      "Chemical Thermodynamics & Chemical Kinetics",
      "Analytical Chemistry & Instrumental Methods",
      "Spectroscopy (NMR, IR, UV-Vis, Mass)",
      "Polymer Chemistry & Industrial Chemistry"
    ],
    "typical_employers": [
      "Dr. Reddy's Laboratories",
      "Sun Pharmaceutical",
      "Cipla",
      "Pidilite Industries",
      "Asian Paints",
      "BASF India",
      "Geological Survey of India (GSI)"
    ],
    "specializations": [
      {
        "id": "chem-analytical",
        "name": "Analytical & Quality Chemistry",
        "aliases": [
          "Quality Control Chem"
        ],
        "skillsGained": [
          "HPLC",
          "Dissolution Testing"
        ],
        "typicalRoles": [
          "Quality Control (QC) Chemist"
        ]
      },
      {
        "id": "chem-industrial",
        "name": "Industrial & Polymer Chemistry",
        "aliases": [
          "Polymer Chem"
        ],
        "skillsGained": [
          "Polymerization",
          "Formulation"
        ],
        "typicalRoles": [
          "Formulation Chemist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-chm-c1",
        "degree_id": "bsc-chemistry",
        "role_title": "Quality Control (QC) / Analytical Chemist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Wet chemistry titrations, assay determination, and UV-Vis spectroscopy directly qualify you for pharmaceutical QC laboratories.",
        "indicative_salary": {
          "min": 3.5,
          "max": 6.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Pharma Quality Association Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "HPLC",
          "Titration",
          "GMP Documentation",
          "UV-Vis"
        ],
        "top_employers": [
          "Cipla",
          "Sun Pharma",
          "Dr. Reddy's",
          "Lupin"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-chm-c2",
        "degree_id": "bsc-chemistry",
        "role_title": "Junior Formulation / R&D Chemist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Training in organic synthesis, solubility parameters, and emulsification maps directly to agrochemical and coating formulation labs.",
        "indicative_salary": {
          "min": 3.8,
          "max": 7.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Chemical Industry Talent Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Organic Synthesis",
          "Formulation",
          "TLC",
          "Viscometry"
        ],
        "top_employers": [
          "Asian Paints",
          "Pidilite",
          "UPL Limited",
          "Aarti Industries"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-chm-c3",
        "degree_id": "bsc-chemistry",
        "role_title": "Head of Quality Assurance & Regulatory Compliance",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Mastery of US-FDA 21 CFR Part 11 compliance, impurity profiling, and analytical method validation qualifies you to lead plant quality operations.",
        "indicative_salary": {
          "min": 16.0,
          "max": 32.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharma Executive Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Method Validation",
          "US-FDA Audit Readiness",
          "GLP/GMP Systems",
          "Team Leadership"
        ],
        "top_employers": [
          "Sun Pharma",
          "Cipla",
          "Divi's Laboratories"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-chm-hs1",
        "degree_id": "bsc-chemistry",
        "program_name": "M.Sc in Chemistry (Organic / Analytical / Physical)",
        "level": "PG",
        "entrance_exams": [
          "IIT JAM (CY)",
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Chemistry as a major subject for at least two years with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Delhi",
          "University of Hyderabad",
          "ICT Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-chm-hs2",
        "degree_id": "bsc-chemistry",
        "program_name": "Integrated Ph.D. in Chemical Sciences",
        "level": "Integrated",
        "entrance_exams": [
          "IIT JAM (CY)",
          "JEST"
        ],
        "eligibility_rule": "B.Sc in Chemistry with high JAM score and strong research aptitude.",
        "typical_duration": "5-6 Years",
        "top_institutes": [
          "IISc Bangalore",
          "TIFR Mumbai",
          "IISER Pune",
          "NCL Pune"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-chm-ct1",
        "degree_id": "bsc-chemistry",
        "cert_name": "HPLC & Gas Chromatography Method Development Specialist",
        "provider": "Waters Corporation / Agilent Learning",
        "domain": "Analytical Instrumentation",
        "level": "Intermediate",
        "prerequisites": [
          "B.Sc Chemistry degree or student"
        ],
        "official_url": "https://www.agilent.com",
        "sourceUrl": "https://www.agilent.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-chm-ct2",
        "degree_id": "bsc-chemistry",
        "cert_name": "Certified Good Laboratory Practice (GLP) Professional",
        "provider": "Quality Council of India (QCI)",
        "domain": "Quality Systems",
        "level": "Beginner",
        "prerequisites": [
          "Chemistry/Science background"
        ],
        "official_url": "https://qcin.org",
        "sourceUrl": "https://qcin.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-chm-ct3",
        "degree_id": "bsc-chemistry",
        "cert_name": "Cheminformatics & Computational Chemistry",
        "provider": "Coursera / Royal Society of Chemistry",
        "domain": "Computational Chemistry",
        "level": "Intermediate",
        "prerequisites": [
          "Basic organic chemistry"
        ],
        "official_url": "https://www.rsc.org",
        "sourceUrl": "https://www.rsc.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-chm-gv1",
        "degree_id": "bsc-chemistry",
        "exam_or_post_name": "Combined Geo-Scientist Examination (Chemist Group 'A')",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Chemical Sciences",
          "allowedDegrees": [
            "B.Sc Chemistry + M.Sc Chemistry"
          ],
          "mandatorySubjects": [
            "Chemistry",
            "Analytical Chemistry"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "UPSC annual recruitment for Geological Survey of India and Central Ground Water Board."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-chm-gv2",
        "degree_id": "bsc-chemistry",
        "exam_or_post_name": "Junior Chemical Assistant / Scientific Assistant - Ordnance Factories / BIS",
        "conducting_body": "Bureau of Indian Standards (BIS)",
        "eligibility_rule": {
          "degreeFamily": "Chemical Sciences",
          "allowedDegrees": [
            "B.Sc Chemistry"
          ],
          "mandatorySubjects": [
            "Chemistry"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Recruited for testing materials and products against Indian Standards."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.bis.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-chm-sw1",
        "degree_id": "bsc-chemistry",
        "target_role": "Patent Analyst / IP Specialist in Chemicals & Pharma",
        "pivot_reason": "Translate organic molecular reaction understanding and formulation knowledge into prior-art searches and patent drafting.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Indian Patent Agent Examination Preparation",
            "type": "cert",
            "detail": "Study the Indian Patents Act 1970 and patent drafting conventions.",
            "estimatedMonths": 4
          },
          {
            "step": 2,
            "title": "Chemical Structure Search (SciFinder & STN)",
            "type": "course",
            "detail": "Master Markush structure searches and chemical prior art landscapes.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Patent Invalidation & FTO Search Capstone",
            "type": "portfolio",
            "detail": "Perform Freedom-To-Operate (FTO) patent report for an active pharmaceutical ingredient.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Indian Patent Agent License",
          "WIPO Intellectual Property Certificate"
        ],
        "why_feasible": "Chemistry graduates have the exact technical scientific fluency required to decipher pharmaceutical patent claims.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-chm-ent1",
        "degree_id": "bsc-chemistry",
        "idea_title": "Green Cleaning Formulation & Specialty Surfactant Enterprise",
        "description": "Develop biodegradable, plant-derived industrial degreasers and enzyme-based institutional cleaning solutions.",
        "first_milestones": [
          "Formulate stable non-toxic eco-degreaser in benchtop laboratory.",
          "Secure BIS quality certification and trademark registration.",
          "Supply pilot batches to 10 commercial laundries or industrial workshops."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on machinery and chemical formulation equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Proof of concept and trial batch production financing.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-chemistry",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Inorganic, Organic & Volumetric Laboratory",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master stoichiometry, volumetric titrations, functional group tests, and safety protocols.",
              "Synthesize standard organic derivatives and maintain chemical balance sheets."
            ],
            "milestone": "Laboratory practical exams cleared with accurate quantitative analysis"
          },
          {
            "stepNumber": 2,
            "title": "Spectroscopy, Kinetics & Analytical Instruments",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn UV-Vis spectrophotometry, TLC chromatography, and NMR spectral analysis.",
              "Complete 1-month summer industrial training at pharmaceutical or chemical plant."
            ],
            "milestone": "Industrial training internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "IIT JAM (CY) Preparation & Capstone Synthesis",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Solve previous 10 years of IIT JAM Chemistry papers and CSIR chemical questions.",
              "Complete final-year synthesis capstone project with spectral characterization."
            ],
            "milestone": "IIT JAM CY qualification & research project completed"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-chemistry",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Wet Lab Competency Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document HPLC, UV-Vis, titration, and standard operating procedure (SOP) proficiencies.",
              "Review fundamental reaction mechanisms (SN1, SN2, aldol) and chemical kinetics."
            ],
            "milestone": "Pharma-aligned QC chemist resume"
          },
          {
            "stepNumber": 2,
            "title": "Pharmaceutical Placement Drives & Lab Tests",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for QC/QA trainee chemist roles at pharmaceutical and agrochemical firms.",
              "Perform live titrations and analytical calculations during technical interviews."
            ],
            "milestone": "Job offer secured from major pharmaceutical manufacturer"
          },
          {
            "stepNumber": 3,
            "title": "QC Chemist Onboarding & Regulatory GLP Mastery",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join analytical lab, log batch samples into LIMS, and complete cGMP training.",
              "Plan long-term track toward M.Sc or analytical method development."
            ],
            "milestone": "Successful completion of first analytical batch release"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-maths",
    "id": "bsc-maths",
    "familyId": "science",
    "name": "Bachelor of Science in Mathematics",
    "shortName": "B.Sc Mathematics",
    "aliases": [
      "BSc Maths",
      "B.Sc. Mathematics",
      "BSc (Hons) Mathematics",
      "Maths graduate",
      "bsc-maths"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A rigorous undergraduate program in abstract algebra, real and complex analysis, differential equations, linear algebra, and topology. It trains students in deductive mathematical reasoning, proof construction, optimization algorithms, and quantitative modeling applicable across academia, tech, finance, and cryptography.",
    "key_skills": [
      "Linear Algebra & Matrix Decompositions (Eigenvalues, SVD)",
      "Real & Complex Mathematical Analysis",
      "Abstract Algebra (Group Theory, Ring Theory, Fields)",
      "Ordinary & Partial Differential Equations",
      "Optimization Theory & Linear Programming (LPP)",
      "Statistical Modeling & Python/R Scientific Computing"
    ],
    "subjects_taught": [
      "Calculus & Analytical Geometry",
      "Real Analysis & Metric Spaces",
      "Linear Algebra & Vector Spaces",
      "Group Theory & Abstract Algebra",
      "Numerical Analysis & Scientific Computing",
      "Probability Theory & Mathematical Statistics"
    ],
    "typical_employers": [
      "Goldman Sachs",
      "Morgan Stanley",
      "Mu Sigma",
      "Fractal Analytics",
      "National Statistical Office (NSO)",
      "TCS Research",
      "KPMG Analytics"
    ],
    "specializations": [
      {
        "id": "math-applied",
        "name": "Applied Mathematics & Scientific Computing",
        "aliases": [
          "Applied Maths"
        ],
        "skillsGained": [
          "Numerical Methods",
          "Python SciPy"
        ],
        "typicalRoles": [
          "Quantitative Analyst"
        ]
      },
      {
        "id": "math-stats",
        "name": "Mathematical Statistics & Actuarial Math",
        "aliases": [
          "Actuarial Maths"
        ],
        "skillsGained": [
          "Probability",
          "Life Contingencies"
        ],
        "typicalRoles": [
          "Actuarial Trainee"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-mth-c1",
        "degree_id": "bsc-maths",
        "role_title": "Data & Statistical Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Your coursework in probability distributions, matrix algebra, and linear regression maps directly to statistical modeling and business analytics.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Analytics India Magazine Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Python",
          "SQL",
          "Linear Regression",
          "Hypothesis Testing"
        ],
        "top_employers": [
          "Mu Sigma",
          "Fractal",
          "LatentView",
          "EY Analytics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mth-c2",
        "degree_id": "bsc-maths",
        "role_title": "Actuarial Trainee / Risk Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Stochastic probability, compound interest theory, and calculus form the core knowledge required for passing Actuarial Society exams.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Institute of Actuaries of India Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Probability",
          "Life Contingencies",
          "Excel Modeling",
          "R"
        ],
        "top_employers": [
          "Swiss Re",
          "Munich Re",
          "Milliman",
          "Willis Towers Watson"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mth-c3",
        "degree_id": "bsc-maths",
        "role_title": "Chief Quantitative Strategist / Head of Analytics",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Deep mathematical mastery of stochastic calculus, graph theory, and algorithmic optimization qualifies you to direct quantitative trading or enterprise analytics.",
        "indicative_salary": {
          "min": 20.0,
          "max": 45.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Global Quantitative Finance Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Stochastic Calculus",
          "Portfolio Optimization",
          "Machine Learning Theory",
          "Leadership"
        ],
        "top_employers": [
          "Goldman Sachs",
          "Citadel Securities",
          "J.P. Morgan"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-mth-hs1",
        "degree_id": "bsc-maths",
        "program_name": "M.Sc in Mathematics / Applied Mathematics",
        "level": "PG",
        "entrance_exams": [
          "IIT JAM (MA)",
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Mathematics as a subject for at least two years with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Kanpur",
          "Delhi University",
          "IISc Bangalore"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mth-hs2",
        "degree_id": "bsc-maths",
        "program_name": "M.Stat / M.Math (Indian Statistical Institute)",
        "level": "PG",
        "entrance_exams": [
          "ISI Admission Test"
        ],
        "eligibility_rule": "Bachelor's degree in Mathematics or Statistics with high quantitative aptitude.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Indian Statistical Institute (ISI Kolkata/Bangalore)",
          "Chennai Mathematical Institute (CMI)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-mth-ct1",
        "degree_id": "bsc-maths",
        "cert_name": "Actuarial Core Mathematics (CM1 / CS1)",
        "provider": "Institute and Faculty of Actuaries (IFoA) / IAI",
        "domain": "Actuarial Science",
        "level": "Intermediate",
        "prerequisites": [
          "10+2 Mathematics or B.Sc Maths"
        ],
        "official_url": "https://www.actuariesindia.org",
        "sourceUrl": "https://www.actuariesindia.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-mth-ct2",
        "degree_id": "bsc-maths",
        "cert_name": "Applied Data Science with Python Specialization",
        "provider": "University of Michigan / Coursera",
        "domain": "Data Science",
        "level": "Intermediate",
        "prerequisites": [
          "Python and linear algebra"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-mth-ct3",
        "degree_id": "bsc-maths",
        "cert_name": "Deep Learning Foundations (Linear Algebra for ML)",
        "provider": "DeepLearning.AI",
        "domain": "Machine Learning Math",
        "level": "Beginner",
        "prerequisites": [
          "Vectors, matrices, calculus"
        ],
        "official_url": "https://www.deeplearning.ai",
        "sourceUrl": "https://www.deeplearning.ai",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-mth-gv1",
        "degree_id": "bsc-maths",
        "exam_or_post_name": "Indian Statistical Service (ISS) Examination",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Mathematical Sciences",
          "allowedDegrees": [
            "B.Sc with Statistics / Mathematics as one subject"
          ],
          "mandatorySubjects": [
            "Mathematics",
            "Statistics"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Premier Group 'A' central service under Ministry of Statistics and Programme Implementation."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mth-gv2",
        "degree_id": "bsc-maths",
        "exam_or_post_name": "SSC Combined Graduate Level (Statistical Investigator Gr. II)",
        "conducting_body": "SSC",
        "eligibility_rule": {
          "degreeFamily": "Mathematical Sciences",
          "allowedDegrees": [
            "Bachelor's Degree with Mathematics or Statistics"
          ],
          "mandatorySubjects": [
            "Mathematics / Statistics"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Specialist paper in Statistics / Mathematics as part of SSC CGL."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-mth-sw1",
        "degree_id": "bsc-maths",
        "target_role": "Machine Learning / Deep Learning Research Engineer",
        "pivot_reason": "Bridge rigorous linear algebra, gradient optimization, and probability into training and optimizing modern deep neural networks.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Python & Data Structures Mastery",
            "type": "course",
            "detail": "Master algorithmic complexity (Big-O), OOP, and Python scientific stack (NumPy/Pandas).",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Deep Learning Mathematics & PyTorch",
            "type": "course",
            "detail": "Implement backpropagation, matrix autograd, and transformer attention heads from scratch.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Generative Modeling Capstone",
            "type": "portfolio",
            "detail": "Train custom variational autoencoder (VAE) or diffusion model on benchmark datasets.",
            "estimatedMonths": 3
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "PyTorch Deep Learning Specialist",
          "AWS Certified Machine Learning"
        ],
        "why_feasible": "Modern AI is applied linear algebra, multivariate calculus, and probability; mathematicians master the core theory faster than anyone else.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-mth-ent1",
        "degree_id": "bsc-maths",
        "idea_title": "Operations Research & Logistics Optimization Consultancy",
        "description": "Offer mathematical optimization algorithms (linear programming, vehicle routing, and warehouse bin-packing) for logistics and supply chain startups.",
        "first_milestones": [
          "Build prototype vehicle route optimization solver using Python PuLP / OR-Tools.",
          "Pilot the solver with 2 regional courier or milk distribution companies to cut diesel costs by 15%.",
          "Package the optimization model into a cloud-hosted API subscription."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Access to intellectual property fast-tracking and incubator matchmaking.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "MSME Innovation Scheme",
            "agency": "Ministry of MSME",
            "benefits": "Financial support for commercializing software and algorithm innovations.",
            "sourceUrl": "https://innovative.msme.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-maths",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Calculus, Linear Algebra & Proof Techniques",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master multivariable calculus, vector spaces, matrix factorizations, and mathematical induction.",
              "Learn Python programming and NumPy for numerical mathematical experiments."
            ],
            "milestone": "Proof construction portfolio and linear algebra solutions"
          },
          {
            "stepNumber": 2,
            "title": "Real Analysis, Abstract Algebra & Statistical Modeling",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Master epsilon-delta continuity, compact sets, group theory, and probability distributions.",
              "Participate in national mathematics competitions (MTTS, Madhava)."
            ],
            "milestone": "MTTS mathematics camp completion certificate"
          },
          {
            "stepNumber": 3,
            "title": "IIT JAM (MA) / ISI Preparation & Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare rigorously for IIT JAM Mathematics and ISI M.Stat entrance tests.",
              "Complete final-year project on numerical differential equations or graph theory."
            ],
            "milestone": "JAM MA qualification or analytics corporate placement"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-maths",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Quantitative Skill Mapping",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document mathematical proofs, Python numerical models, and statistical tests.",
              "Practice coding algorithms, dynamic programming, and statistical case interviews."
            ],
            "milestone": "Analytics and quantitative finance resume"
          },
          {
            "stepNumber": 2,
            "title": "Quantitative Placement Drives & Actuarial Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to analytics consultancies, actuarial firms, and fintech data teams.",
              "Solve live quantitative problem-solving and mathematical reasoning challenges."
            ],
            "milestone": "Selected for quantitative analyst role"
          },
          {
            "stepNumber": 3,
            "title": "Onboarding & Professional Modeling Specialization",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Begin analytics or actuarial role, automate data workflows, and run predictive regressions.",
              "Continue actuarial exam papers or plan higher studies."
            ],
            "milestone": "Successfully deployed first statistical business model"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-biology",
    "id": "bsc-biology",
    "familyId": "science",
    "name": "Bachelor of Science in Biology / Life Sciences",
    "shortName": "B.Sc Biology",
    "aliases": [
      "BSc Biology",
      "B.Sc. Life Sciences",
      "BSc Botany & Zoology",
      "Biological Sciences graduate",
      "bsc-biology"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A foundational biological degree encompassing animal physiology, plant biology, cell biology, genetics, ecology, and evolutionary science. It equips students with hands-on microscopy, tissue culture, physiological assay, and field taxonomy skills vital for biomedical research, environmental conservation, and education.",
    "key_skills": [
      "Cell Biology & Molecular Genetics Techniques",
      "Microscopy (Brightfield, Phase Contrast, Fluorescence)",
      "Plant & Animal Tissue Histology & Staining",
      "Ecology, Biodiversity Sampling & Taxonomic Identification",
      "Basic Biochemical Assays (Protein Estimation, Enzyme Activity)",
      "Laboratory Biosafety Protocols (BSL-1 / BSL-2)"
    ],
    "subjects_taught": [
      "Cell Biology & Genetics",
      "Comparative Animal Physiology & Anatomy",
      "Plant Physiology, Morphology & Taxonomy",
      "Ecology, Environmental Biology & Evolution",
      "Biochemistry & Molecular Biology",
      "Immunology & Developmental Biology"
    ],
    "typical_employers": [
      "Zoological Survey of India (ZSI)",
      "Botanical Survey of India (BSI)",
      "Wildlife Institute of India (WII)",
      "Clinical Research Organizations (CROs)",
      "Diagnostics Laboratories",
      "EdTech / Schools"
    ],
    "specializations": [
      {
        "id": "bio-molecular",
        "name": "Molecular & Cellular Biology",
        "aliases": [
          "Cell Biology"
        ],
        "skillsGained": [
          "PCR",
          "Gel Electrophoresis"
        ],
        "typicalRoles": [
          "Research Assistant"
        ]
      },
      {
        "id": "bio-ecology",
        "name": "Ecology & Wildlife Conservation",
        "aliases": [
          "Wildlife"
        ],
        "skillsGained": [
          "GPS Tracking",
          "Camera Trapping"
        ],
        "typicalRoles": [
          "Conservation Biologist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-bio-c1",
        "degree_id": "bsc-biology",
        "role_title": "Junior Research Assistant / Laboratory Technician",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Microscopy, specimen preservation, and histological staining coursework directly qualifies you for research positions in university and government labs.",
        "indicative_salary": {
          "min": 3.2,
          "max": 5.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Government Project Assistant Remuneration Norms (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Microscopy",
          "Specimen Preservation",
          "Staining",
          "Lab Safety"
        ],
        "top_employers": [
          "ZSI",
          "BSI",
          "CSIR-CDRI",
          "ICMR Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bio-c2",
        "degree_id": "bsc-biology",
        "role_title": "Clinical Research Coordinator (CRC)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Related",
        "match_rationale": "Understanding human physiology, medical terminology, and biological ethics prepares you for patient consent and trial documentation at hospital sites.",
        "indicative_salary": {
          "min": 3.6,
          "max": 6.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Clinical Research Society Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ICH-GCP",
          "Clinical Protocol",
          "Patient Consent",
          "Medical Terminology"
        ],
        "top_employers": [
          "IQVIA",
          "Parexel",
          "Syneos Health",
          "Apollo Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bio-c3",
        "degree_id": "bsc-biology",
        "role_title": "Principal Conservation Scientist / Wildlife Project Director",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Extensive expertise in ecological habitat restoration, species conservation action plans, and wildlife policy qualifies you to lead major conservation reserves.",
        "indicative_salary": {
          "min": 12.0,
          "max": 24.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Conservation Scientist Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Wildlife Protection Act 1972",
          "Habitat Management",
          "Biodiversity Auditing",
          "Team Leadership"
        ],
        "top_employers": [
          "Wildlife Trust of India",
          "WWF India",
          "State Forest Departments"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-bio-hs1",
        "degree_id": "bsc-biology",
        "program_name": "M.Sc in Zoology / Botany / Life Sciences",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Biology / Botany / Zoology as major subjects with minimum 50% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Delhi University",
          "Banaras Hindu University (BHU)",
          "Jawaharlal Nehru University (JNU)",
          "University of Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bio-hs2",
        "degree_id": "bsc-biology",
        "program_name": "M.Sc in Wildlife Biology & Conservation",
        "level": "PG",
        "entrance_exams": [
          "National Entrance Exam (NCBS)"
        ],
        "eligibility_rule": "Bachelor's degree in any branch of biological sciences with minimum 50% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "National Centre for Biological Sciences (NCBS)",
          "Wildlife Institute of India (WII Dehradun)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-bio-ct1",
        "degree_id": "bsc-biology",
        "cert_name": "ICH-GCP Clinical Research Certification",
        "provider": "NIDA Clinical Trials Network",
        "domain": "Clinical Research",
        "level": "Beginner",
        "prerequisites": [
          "Life sciences background"
        ],
        "official_url": "https://gcp.nidatraining.org",
        "sourceUrl": "https://gcp.nidatraining.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-bio-ct2",
        "degree_id": "bsc-biology",
        "cert_name": "GIS for Wildlife Conservation & Biodiversity Mapping",
        "provider": "ESRI / Coursera",
        "domain": "Geospatial Ecology",
        "level": "Intermediate",
        "prerequisites": [
          "Basic computer skills"
        ],
        "official_url": "https://www.esri.com",
        "sourceUrl": "https://www.esri.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-bio-ct3",
        "degree_id": "bsc-biology",
        "cert_name": "Laboratory Animal Handling & Ethics Certification",
        "provider": "Committee for the Purpose of Control and Supervision of Experiments on Animals (CPCSEA)",
        "domain": "Biomedical Ethics",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in biological sciences"
        ],
        "official_url": "https://cpcsea.nic.in",
        "sourceUrl": "https://cpcsea.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-bio-gv1",
        "degree_id": "bsc-biology",
        "exam_or_post_name": "Zoological Survey of India (ZSI) / BSI - Botanical/Zoological Assistant",
        "conducting_body": "SSC Selection Posts",
        "eligibility_rule": {
          "degreeFamily": "Life Sciences",
          "allowedDegrees": [
            "B.Sc with Botany / Zoology"
          ],
          "mandatorySubjects": [
            "Zoology / Botany"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "SSC conducts national selection posts examination for Group 'B' non-gazetted technical cadres."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ssc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bio-gv2",
        "degree_id": "bsc-biology",
        "exam_or_post_name": "State Forest Service (ACF / Forest Ranger)",
        "conducting_body": "State Public Service Commissions / UPSC IFoS",
        "eligibility_rule": {
          "degreeFamily": "Natural Sciences",
          "allowedDegrees": [
            "B.Sc with at least one subject among Botany, Zoology, Chemistry, Physics"
          ],
          "mandatorySubjects": [
            "Botany / Zoology / Chemistry"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Rigorous physical endurance test plus written examination in science subjects."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-bio-sw1",
        "degree_id": "bsc-biology",
        "target_role": "Medical Science Liaison / Healthcare Content Specialist",
        "pivot_reason": "Leverage comprehensive understanding of human physiology and disease pathology into medical communications, health tech writing, and doctor liaison.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Medical Writing & Publication Ethics (AMWA / EMWA Standards)",
            "type": "course",
            "detail": "Learn regulatory medical writing, manuscript preparation, and Cochrane review methods.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Pharmacology & Therapeutic Areas Deep Dive",
            "type": "course",
            "detail": "Master clinical trial endpoints in oncology, immunology, and metabolic diseases.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Clinical Trial Plain-Language Summary Portfolio",
            "type": "portfolio",
            "detail": "Author 3 peer-reviewed journal summaries and medical infographics for clinical audiences.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Medical Publication Professional (CMPP)",
          "Medical Writing Foundation"
        ],
        "why_feasible": "Biology graduates possess foundational knowledge of anatomy, immunology, and pathology, eliminating the steep learning curve faced by non-science writers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-bio-ent1",
        "degree_id": "bsc-biology",
        "idea_title": "Commercial Plant Tissue Culture & Micropropagation Nursery",
        "description": "Produce virus-free, high-yielding ornamental plants (orchids, anthuriums) and fruit crop saplings (banana, teak) using sterile tissue culture.",
        "first_milestones": [
          "Set up small-scale laminar flow hood, autoclave, and climate-controlled growth room.",
          "Successfully micropropagate 5,000 tissue-cultured banana or orchid plantlets.",
          "Contract with regional commercial orchards and nursery distributors for wholesale sapling supply."
        ],
        "relevant_schemes": [
          {
            "name": "National Horticulture Board (NHB) Scheme",
            "agency": "Ministry of Agriculture & Farmers Welfare",
            "benefits": "Capital investment subsidy up to 40% for commercial tissue culture units.",
            "sourceUrl": "https://nhb.gov.in"
          },
          {
            "name": "MUDRA Loan (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Collateral-free business loans up to 10 Lakhs.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-biology",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Plant & Animal Diversity & Dissections",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master taxonomic classification, histological slide preparation, and microscope handling.",
              "Document local fauna and flora through an illustrated botanical/zoological herbarium."
            ],
            "milestone": "Herbarium and histology record verified"
          },
          {
            "stepNumber": 2,
            "title": "Cell Biology, Genetics & Physiology Lab",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform cell division staging (mitosis/meiosis), blood grouping, and enzyme assays.",
              "Complete summer internship at a research lab, botanical garden, or clinical diagnostic center."
            ],
            "milestone": "Summer research/diagnostic internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "CUET-PG Entrance Preparation & Final Project",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for CUET-PG Life Sciences / Zoology / Botany entrance tests.",
              "Execute final-year capstone on water pollution bioindicators or plant physiology."
            ],
            "milestone": "CUET-PG qualification & research project submission"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-biology",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Scientific Resume Drafting & Lab Skills Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document microscopy, sterile lab technique, and clinical data skills.",
              "Review fundamentals of genetics, immunology, and endocrinology."
            ],
            "milestone": "Life sciences technical resume"
          },
          {
            "stepNumber": 2,
            "title": "Diagnostic / CRO Placement Drives & State Exams",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for laboratory technician and clinical research coordinator roles.",
              "Appear for State Forest Service or staff selection board technical exams."
            ],
            "milestone": "Placement offer secured as CRC or Lab Technician"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Onboarding & Research Career Path",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join clinical site or analytical testing team; master GCP/GLP compliance.",
              "Pursue higher studies (M.Sc / Ph.D.) or specialized clinical certifications."
            ],
            "milestone": "Permanent absorption into research team"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-biotech",
    "id": "bsc-biotech",
    "familyId": "science",
    "name": "Bachelor of Science in Biotechnology",
    "shortName": "B.Sc Biotechnology",
    "aliases": [
      "BSc Biotechnology",
      "B.Sc. Bio-tech",
      "BSc Biotech",
      "BSc (Hons) Biotechnology",
      "bsc-biotech"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "An interdisciplinary science degree merging molecular biology, genetics, microbiology, and biochemical engineering. Students acquire hands-on laboratory expertise in recombinant DNA technology, PCR amplification, microbial fermentation, cell culture, and bioinformatics for biopharmaceuticals, agriculture, and industrial enzymes.",
    "key_skills": [
      "Recombinant DNA Technology & Molecular Cloning",
      "Polymerase Chain Reaction (PCR) & Agarose Gel Electrophoresis",
      "Aseptic Microbial Culturing & Fermentation Techniques",
      "Enzyme Kinetics & Protein Purification (PAGE, Chromatography)",
      "Bioinformatics Sequence Analysis (BLAST, FASTA, ClustalW)",
      "Plant & Animal Cell Culture Maintenance"
    ],
    "subjects_taught": [
      "Molecular Biology & Genetic Engineering",
      "Microbiology & Industrial Fermentation",
      "Biochemistry & Enzymology",
      "Immunology & Diagnostic Technologies",
      "Bioinformatics & Computational Genomics",
      "Plant & Animal Biotechnology"
    ],
    "typical_employers": [
      "Biocon",
      "Serum Institute of India",
      "Syngene International",
      "Bharat Biotech",
      "Dr. Reddy's Laboratories",
      "MedGenome",
      "Thermo Fisher Scientific"
    ],
    "specializations": [
      {
        "id": "bsc-biotech-pharma",
        "name": "Biopharmaceuticals & Medical Biotech",
        "aliases": [
          "Medical Biotech"
        ],
        "skillsGained": [
          "ELISA",
          "Western Blot"
        ],
        "typicalRoles": [
          "QC/QA Analyst"
        ]
      },
      {
        "id": "bsc-biotech-agri",
        "name": "Agricultural & Environmental Biotech",
        "aliases": [
          "Agri Biotech"
        ],
        "skillsGained": [
          "Plant Tissue Culture",
          "Biofertilizers"
        ],
        "typicalRoles": [
          "Plant Biotech Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-bt-c1",
        "degree_id": "bsc-biotech",
        "role_title": "Junior Laboratory Analyst (QC / Microbiology)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Sterile culturing, bioassays, and ELISA techniques directly qualify you for testing biopharmaceuticals and vaccines in quality laboratories.",
        "indicative_salary": {
          "min": 3.6,
          "max": 6.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Biotech Industry Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ELISA",
          "Microbial Testing",
          "Aseptic Technique",
          "SOP Documentation"
        ],
        "top_employers": [
          "Biocon",
          "Serum Institute",
          "Syngene",
          "Bharat Biotech"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bt-c2",
        "degree_id": "bsc-biotech",
        "role_title": "Junior Genomics / Molecular Biology Technician",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "DNA extraction, PCR amplification, and gel imaging coursework prepare you for processing patient samples in high-throughput diagnostic labs.",
        "indicative_salary": {
          "min": 3.8,
          "max": 7.2,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "BioSpectrum Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "DNA Extraction",
          "PCR",
          "Gel Electrophoresis",
          "Sample Logging"
        ],
        "top_employers": [
          "MedGenome",
          "Strand Life Sciences",
          "Metropolis Healthcare"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bt-c3",
        "degree_id": "bsc-biotech",
        "role_title": "Head of Analytical Development / Biomanufacturing QC",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Deep mastery of regulatory biological assays, mass spectrometry of proteins, and international pharmacopeial compliance qualifies you to lead analytics.",
        "indicative_salary": {
          "min": 15.0,
          "max": 30.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Biotech Leadership Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Method Validation",
          "ICH Guidelines",
          "Protein Analytics",
          "Audit Leadership"
        ],
        "top_employers": [
          "Biocon Biologics",
          "Serum Institute",
          "Novozymes"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-bt-hs1",
        "degree_id": "bsc-biotech",
        "program_name": "M.Sc in Biotechnology",
        "level": "PG",
        "entrance_exams": [
          "IIT JAM (BT)",
          "CUET-PG",
          "GAT-B"
        ],
        "eligibility_rule": "Bachelor's degree in Biotechnology / Biological Sciences / Physical Sciences with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Roorkee",
          "JNU New Delhi",
          "ICT Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bt-hs2",
        "degree_id": "bsc-biotech",
        "program_name": "M.Sc in Bioinformatics & Computational Biology",
        "level": "PG",
        "entrance_exams": [
          "GAT-B",
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree in Biotechnology or allied biological science with mathematics/computing familiarity.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Pondicherry University",
          "IBAB Bengaluru",
          "Pune University",
          "IIIT Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-bt-ct1",
        "degree_id": "bsc-biotech",
        "cert_name": "Certified Molecular Diagnostics Specialist (PCR & NGS)",
        "provider": "Thermo Fisher Scientific / Coursera",
        "domain": "Molecular Diagnostics",
        "level": "Intermediate",
        "prerequisites": [
          "Molecular biology basics"
        ],
        "official_url": "https://www.thermofisher.com",
        "sourceUrl": "https://www.thermofisher.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-bt-ct2",
        "degree_id": "bsc-biotech",
        "cert_name": "Computational Genomics & Python for Life Scientists",
        "provider": "UC San Diego / Coursera",
        "domain": "Bioinformatics",
        "level": "Intermediate",
        "prerequisites": [
          "Basic genetics and Python"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-bt-ct3",
        "degree_id": "bsc-biotech",
        "cert_name": "Good Manufacturing Practices (cGMP) for Biologics",
        "provider": "ISPE / BioXcellence",
        "domain": "Biomanufacturing Compliance",
        "level": "Beginner",
        "prerequisites": [
          "Biotech student or graduate"
        ],
        "official_url": "https://ispe.org",
        "sourceUrl": "https://ispe.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-bt-gv1",
        "degree_id": "bsc-biotech",
        "exam_or_post_name": "Graduate Aptitude Test - Biotechnology (GAT-B) / DBT-JRF",
        "conducting_body": "Regional Centre for Biotechnology (RCB) / DBT",
        "eligibility_rule": {
          "degreeFamily": "Biotechnology",
          "allowedDegrees": [
            "B.Sc Biotechnology",
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
          "notes": "National entrance exam with monthly government fellowship for DBT-supported PG programs."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://rcb.res.in/GATB/",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-bt-gv2",
        "degree_id": "bsc-biotech",
        "exam_or_post_name": "Food Safety and Standards Authority of India (FSSAI) - Technical Officer",
        "conducting_body": "FSSAI",
        "eligibility_rule": {
          "degreeFamily": "Biological Sciences",
          "allowedDegrees": [
            "Degree in Biotechnology / Biochemistry / Food Tech"
          ],
          "mandatorySubjects": [
            "Biotechnology",
            "Microbiology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Statutory central agency ensuring food safety and testing compliance."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.fssai.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-bt-sw1",
        "degree_id": "bsc-biotech",
        "target_role": "Clinical Data Analyst / Bio-Statistician",
        "pivot_reason": "Pivot biological lab knowledge and experimental control design into electronic data capture (EDC), clinical trial analytics, and SAS programming.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Base & Advanced SAS Programming for Clinical Trials",
            "type": "course",
            "detail": "Master SAS procedures, data step manipulations, and CDISC SDTM / ADaM data standards.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Biostatistics & Clinical Trial Study Design",
            "type": "course",
            "detail": "Learn Kaplan-Meier survival curves, p-value calculations, and clinical endpoints.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Mock Clinical Trial Analysis Capstone",
            "type": "portfolio",
            "detail": "Generate production-ready clinical tables, listings, and figures (TLFs) using SAS/R.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Base SAS Programmer",
          "CDISC Standards Certified"
        ],
        "why_feasible": "Biotech graduates already understand clinical trial phases, biological biomarkers, and experimental controls, making clinical data analysis natural.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-bt-ent1",
        "degree_id": "bsc-biotech",
        "idea_title": "Microbial Biofertilizer & Biopesticide Manufacturing Enterprise",
        "description": "Manufacture certified Azotobacter, Rhizobium, and Trichoderma organic biofertilizers for organic horticulture and vegetable clusters.",
        "first_milestones": [
          "Acquire 100-liter pilot fermenter, laminar flow hood, and packaging sealer.",
          "Obtain commercial biofertilizer manufacturing license under the Fertilizer Control Order (FCO).",
          "Establish retail dealership agreements with 15 rural agro-input centers."
        ],
        "relevant_schemes": [
          {
            "name": "BIRAC Biotechnology Ignition Grant (BIG)",
            "agency": "BIRAC / Department of Biotechnology",
            "benefits": "Up to 50 Lakhs grant-in-aid for innovative biotechnology startups.",
            "sourceUrl": "https://birac.nic.in"
          },
          {
            "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
            "agency": "Ministry of Agriculture",
            "benefits": "Market support and cluster procurement of certified bio-inputs.",
            "sourceUrl": "https://pgsindia-ncof.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-biotech",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Molecular Biology & Sterile Wet Lab Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master sterile plating, autoclaving, plasmid DNA isolation, and spectrophotometry.",
              "Learn bioinformatics tools (NCBI, BLAST, and multiple sequence alignment)."
            ],
            "milestone": "Successful DNA extraction and gel electrophoresis photo log"
          },
          {
            "stepNumber": 2,
            "title": "Recombinant DNA, Fermentation & Industrial Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Clone DNA fragments into bacterial vectors and operate benchtop fermenters.",
              "Complete summer training at an established biopharma firm (Biocon/Serum) or research institute."
            ],
            "milestone": "Industrial training internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "IIT JAM (BT) / GAT-B Preparation & Research Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Practice previous question papers of IIT JAM (BT) and GAT-B.",
              "Execute final-year capstone project on recombinant protein expression or enzyme purification."
            ],
            "milestone": "JAM/GAT-B qualification & published capstone report"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-biotech",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Bioprocess Competency Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document PCR, ELISA, SDS-PAGE, and cell culture competencies.",
              "Review fundamental biochemistry, immunology, and genetic engineering principles."
            ],
            "milestone": "Industry-ready biotechnology resume"
          },
          {
            "stepNumber": 2,
            "title": "Biopharma Placement Drives & Diagnostic Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to quality control, microbiology, and molecular diagnostic technician openings.",
              "Demonstrate sterile technique knowledge and troubleshooting in technical interviews."
            ],
            "milestone": "Job offer secured from biotechnology employer"
          },
          {
            "stepNumber": 3,
            "title": "QC Laboratory Onboarding & Career Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Undergo cGMP orientation, handle batch assays, and record findings in electronic lab books.",
              "Plan M.Sc Biotechnology or clinical data specialization."
            ],
            "milestone": "Successful completion of first industrial validation run"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-microbiology",
    "id": "bsc-microbiology",
    "familyId": "science",
    "name": "Bachelor of Science in Microbiology",
    "shortName": "B.Sc Microbiology",
    "aliases": [
      "BSc Microbiology",
      "B.Sc. Microbiology",
      "Microbiology graduate",
      "BSc Micro",
      "bsc-microbiology"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A specialized life sciences discipline dedicated to the study of bacteria, viruses, fungi, and protozoa. It trains students in microbial isolation, Gram staining, antibiotic susceptibility testing, sterility validation, environmental monitoring, and food safety standards.",
    "key_skills": [
      "Aseptic Microbial Isolation & Pure Culture Techniques",
      "Differential & Gram Staining, Fluorescent Microscopy",
      "Antibiotic Sensitivity Testing (Kirby-Bauer Disc Diffusion)",
      "Environmental Monitoring & Cleanroom Settle Plate Sampling",
      "Endotoxin Testing (LAL Assay) & Bioburden Determination",
      "Industrial Fermentation & Beverage/Dairy Quality Control"
    ],
    "subjects_taught": [
      "Bacteriology & Microbial Systematics",
      "Virology, Mycology & Phycology",
      "Microbial Physiology, Metabolism & Genetics",
      "Immunology & Medical Microbiology",
      "Food, Dairy & Agricultural Microbiology",
      "Industrial Microbiology & Quality Control"
    ],
    "typical_employers": [
      "Sun Pharma",
      "Cipla",
      "Amul (GCMMF)",
      "Nestle India",
      "Carlsberg / United Breweries",
      "Metropolis Healthcare",
      "National Institute of Virology (NIV)"
    ],
    "specializations": [
      {
        "id": "micro-pharma",
        "name": "Pharmaceutical Microbiology & Cleanrooms",
        "aliases": [
          "Pharma Micro"
        ],
        "skillsGained": [
          "LAL Test",
          "Bioburden"
        ],
        "typicalRoles": [
          "Microbiologist QC"
        ]
      },
      {
        "id": "micro-food",
        "name": "Food & Beverage Safety",
        "aliases": [
          "Food Micro"
        ],
        "skillsGained": [
          "Pathogen Testing",
          "HACCP"
        ],
        "typicalRoles": [
          "Food Microbiologist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-mc-c1",
        "degree_id": "bsc-microbiology",
        "role_title": "Quality Control Microbiologist (Pharma / Food)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Aseptic environmental monitoring, sterility testing, and microbial identification coursework directly qualify you for regulated manufacturing.",
        "indicative_salary": {
          "min": 3.4,
          "max": 6.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharma & Food Microbiologist Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Sterility Testing",
          "Bioburden",
          "LAL Test",
          "Cleanroom Monitoring"
        ],
        "top_employers": [
          "Cipla",
          "Dr. Reddy's",
          "Amul",
          "Nestle"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mc-c2",
        "degree_id": "bsc-microbiology",
        "role_title": "Medical Diagnostic Microbiologist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Pathogen culture plating, antibiotic sensitivity testing (AST), and biochemical identification enable immediate placement in pathology labs.",
        "indicative_salary": {
          "min": 3.2,
          "max": 6.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Diagnostic Healthcare Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Pathogen Plating",
          "AST",
          "Gram Staining",
          "Automated Culture (VITEK)"
        ],
        "top_employers": [
          "Dr Lal PathLabs",
          "Metropolis",
          "SRL Diagnostics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mc-c3",
        "degree_id": "bsc-microbiology",
        "role_title": "Chief Sterility Assurance & Contamination Control Lead",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Mastery of cleanroom airflow qualification, root-cause microbial investigations, and FDA 483 audit defense qualifies you to lead global sterility assurance.",
        "indicative_salary": {
          "min": 16.0,
          "max": 32.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Quality Executive Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Cleanroom ISO 14644",
          "Sterility Assurance",
          "Regulatory Inspection Defense",
          "Team Leadership"
        ],
        "top_employers": [
          "Biocon",
          "Serum Institute",
          "AstraZeneca India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-mc-hs1",
        "degree_id": "bsc-microbiology",
        "program_name": "M.Sc in Microbiology / Applied Microbiology",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Microbiology or any biological science with minimum 50-55% aggregate.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Delhi University",
          "Jawaharlal Nehru University",
          "Banaras Hindu University",
          "Panjab University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mc-hs2",
        "degree_id": "bsc-microbiology",
        "program_name": "M.Sc in Food Microbiology & Safety",
        "level": "PG",
        "entrance_exams": [
          "CFTRI Entrance Exam",
          "CUET-PG"
        ],
        "eligibility_rule": "B.Sc in Microbiology, Food Science, or Biotechnology with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "CSIR-CFTRI Mysore",
          "National Dairy Research Institute (NDRI)",
          "PIMS"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-mc-ct1",
        "degree_id": "bsc-microbiology",
        "cert_name": "HACCP & ISO 22000 Food Safety Internal Auditor",
        "provider": "BSI / Quality Council of India",
        "domain": "Food Safety",
        "level": "Intermediate",
        "prerequisites": [
          "Science degree"
        ],
        "official_url": "https://www.bsigroup.com",
        "sourceUrl": "https://www.bsigroup.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-mc-ct2",
        "degree_id": "bsc-microbiology",
        "cert_name": "Pharmaceutical Water Testing & Cleanroom Monitoring",
        "provider": "PDA (Parenteral Drug Association)",
        "domain": "Sterility Assurance",
        "level": "Intermediate",
        "prerequisites": [
          "Microbiology background"
        ],
        "official_url": "https://www.pda.org",
        "sourceUrl": "https://www.pda.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-mc-ct3",
        "degree_id": "bsc-microbiology",
        "cert_name": "Infection Control & Biomedical Waste Management",
        "provider": "WHO / Coursera",
        "domain": "Healthcare Safety",
        "level": "Beginner",
        "prerequisites": [
          "Open to health/science students"
        ],
        "official_url": "https://www.who.int",
        "sourceUrl": "https://www.who.int",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-mc-gv1",
        "degree_id": "bsc-microbiology",
        "exam_or_post_name": "Food Safety Officer (FSO) - State Food Safety Departments",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Food / Life Sciences",
          "allowedDegrees": [
            "B.Sc with Microbiology / Chemistry / Food Tech"
          ],
          "mandatorySubjects": [
            "Microbiology",
            "Food Technology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State PSC recruitment enforcing the Food Safety and Standards Act 2006."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-mc-gv2",
        "degree_id": "bsc-microbiology",
        "exam_or_post_name": "Technical Assistant / Microbiologist - National Institute of Virology (ICMR)",
        "conducting_body": "ICMR / NIV Pune",
        "eligibility_rule": {
          "degreeFamily": "Microbiology / Life Sciences",
          "allowedDegrees": [
            "B.Sc Microbiology"
          ],
          "mandatorySubjects": [
            "Microbiology",
            "Virology"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government scientific technical post under Indian Council of Medical Research."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.niv.icmr.org.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-mc-sw1",
        "degree_id": "bsc-microbiology",
        "target_role": "Brewery & Craft Beer Fermentation Master",
        "pivot_reason": "Translate yeast physiology, anaerobic fermentation kinetics, and aseptic contamination control into commercial craft brewing and beverage production.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Brewing Science & Yeast Microbiology",
            "type": "course",
            "detail": "Learn wort aeration, pitching rates, gravity monitoring, and diacetyl control.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Institute of Brewing & Distilling (IBD) General Certificate",
            "type": "cert",
            "detail": "Obtain globally recognized IBD General Certificate in Brewing.",
            "estimatedMonths": 3
          },
          {
            "step": 3,
            "title": "Commercial Microbrewery Recipe Formulation",
            "type": "portfolio",
            "detail": "Formulate, brew, and lab-analyze a 500-liter batch of clean craft ale.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "IBD General Certificate in Brewing",
          "HACCP Food Safety"
        ],
        "why_feasible": "Brewing is controlled microbial fermentation; microbiologists manage yeast viability and bacterial contamination better than anyone else.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-mc-ent1",
        "degree_id": "bsc-microbiology",
        "idea_title": "Water & Food Microbiology Testing Laboratory",
        "description": "Establish a certified analytical testing lab offering drinking water bacterial pathogen screening, dairy testing, and restaurant hygiene audits.",
        "first_milestones": [
          "Set up laminar flow chamber, colony counter, autoclave, and incubator bank.",
          "Empanel under local municipality for drinking water potability testing.",
          "Onboard 25 local food manufacturing businesses and hotels for routine monthly testing."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / Ministry of MSME",
            "benefits": "Up to 35% capital subsidy on laboratory equipment purchases.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "Stand Up India Scheme",
            "agency": "SIDBI",
            "benefits": "Bank loans between 10 Lakhs and 1 Crore for greenfield testing laboratories.",
            "sourceUrl": "https://www.standupmitra.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-microbiology",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Aseptic Plating, Staining & Culture Media",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master agar preparation, streak plating, Gram staining, and microscope calibration.",
              "Maintain pure culture slants of model bacteria (E. coli, B. subtilis)."
            ],
            "milestone": "Gram staining and colony morphology log completed"
          },
          {
            "stepNumber": 2,
            "title": "Antibiotic Testing, Immunology & Fermentation",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct antibiotic zone-of-inhibition tests, ELISA, and bacterial growth curve modeling.",
              "Complete 1-month summer internship at a dairy, brewery, or diagnostic microbiology lab."
            ],
            "milestone": "Industrial microbiology internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "CUET-PG Preparation & Sterility Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for CUET-PG Microbiology and ICMR technical assistant entrance exams.",
              "Execute final-year capstone project on antimicrobial resistance or food spoilage control."
            ],
            "milestone": "CUET-PG qualification & completed capstone"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-microbiology",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Preparation & Cleanroom Skill Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document sterility testing, media preparation, and bioburden calculation proficiencies.",
              "Review regulatory guidelines (USP <71> Sterility Tests, US-FDA cGMP)."
            ],
            "milestone": "Microbiology industry resume"
          },
          {
            "stepNumber": 2,
            "title": "Pharmaceutical & Food Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to quality control microbiology openings at pharma, beverage, and diagnostic firms.",
              "Perform live plating and aseptic demonstration during laboratory interviews."
            ],
            "milestone": "Job offer secured from pharmaceutical manufacturer"
          },
          {
            "stepNumber": 3,
            "title": "QC Microbiologist Onboarding & Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join quality team, execute routine environmental monitoring, and maintain incubators.",
              "Pursue higher studies (M.Sc) or advanced food safety auditor credentials."
            ],
            "milestone": "Independent sign-off on sterility release batches"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-environmental",
    "id": "bsc-environmental",
    "familyId": "science",
    "name": "Bachelor of Science in Environmental Science",
    "shortName": "B.Sc Environmental Science",
    "aliases": [
      "BSc Environmental Science",
      "B.Sc. Environmental Science",
      "BSc Environmental Studies",
      "Environmental Studies graduate",
      "bsc-environmental"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "An interdisciplinary science program covering ecology, atmospheric chemistry, water and soil pollution analysis, Environmental Impact Assessment (EIA), waste management, and environmental law. It trains environmental analysts, sustainability consultants, and conservation officers to solve ecological crises.",
    "key_skills": [
      "Water, Air & Soil Chemical Quality Testing (BOD, COD, PM2.5, Heavy Metals)",
      "Environmental Impact Assessment (EIA) & MoEFCC Notification Compliance",
      "GIS & Remote Sensing for Land-Use & Watershed Mapping (QGIS)",
      "Solid & Hazardous Waste Management Protocols",
      "Environmental Law, ISO 14001 Standards & Corporate ESG Auditing",
      "Biodiversity Indexing & Carbon Footprint Calculation"
    ],
    "subjects_taught": [
      "Ecology, Ecosystems & Natural Resource Management",
      "Air, Water, Soil & Noise Pollution Chemistry",
      "Environmental Impact Assessment (EIA) & Auditing",
      "Waste Management & Remediation Technologies",
      "Geospatial Technologies (GIS & Remote Sensing)",
      "Environmental Legislation, Policy & Sustainability"
    ],
    "typical_employers": [
      "Central Pollution Control Board (CPCB)",
      "State Pollution Control Boards (SPCBs)",
      "National Environmental Engineering Research Institute (NEERI)",
      "Tata Sustainability Group",
      "ERM India",
      "Adani Green Energy",
      "PwC ESG Consulting"
    ],
    "specializations": [
      {
        "id": "enviro-esg",
        "name": "Corporate Sustainability & ESG",
        "aliases": [
          "ESG Analyst"
        ],
        "skillsGained": [
          "GRI Standards",
          "Scope 1-3 Emissions"
        ],
        "typicalRoles": [
          "ESG Associate"
        ]
      },
      {
        "id": "enviro-pollution",
        "name": "Pollution Monitoring & Environmental Testing",
        "aliases": [
          "Pollution Testing"
        ],
        "skillsGained": [
          "Stack Monitoring",
          "Effluent Testing"
        ],
        "typicalRoles": [
          "Environmental Analyst"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-env-c1",
        "degree_id": "bsc-environmental",
        "role_title": "Environmental Monitoring Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Water quality testing (BOD/COD), ambient air sampling, and stack monitoring coursework qualify you for environmental testing laboratories.",
        "indicative_salary": {
          "min": 3.5,
          "max": 6.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Environmental Laboratory Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "BOD/COD",
          "Air Sampling",
          "Spectrophotometry",
          "CPCB Norms"
        ],
        "top_employers": [
          "SGS India",
          "Bureau Veritas",
          "TUV SUD",
          "State PCB Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-env-c2",
        "degree_id": "bsc-environmental",
        "role_title": "Junior Sustainability & ESG Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Carbon footprinting, life-cycle analysis, and environmental policy knowledge enable corporate sustainability and BRSR report preparation.",
        "indicative_salary": {
          "min": 4.2,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "ESG & Sustainability Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "BRSR",
          "Carbon Accounting",
          "GRI Framework",
          "GHG Protocol"
        ],
        "top_employers": [
          "PwC",
          "EY",
          "Tata Sustainability Group",
          "KPMG"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-env-c3",
        "degree_id": "bsc-environmental",
        "role_title": "Director of Corporate Sustainability & Environmental Affairs",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Mastery of multi-site environmental compliance, Net-Zero transition strategies, and EIA regulatory clearances qualifies you for corporate leadership.",
        "indicative_salary": {
          "min": 16.0,
          "max": 35.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Corporate ESG Leadership Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Net-Zero Strategy",
          "EIA Clearances",
          "ISO 14001",
          "Executive Governance"
        ],
        "top_employers": [
          "Tata Steel",
          "Adani Group",
          "Reliance Industries",
          "ERM"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-env-hs1",
        "degree_id": "bsc-environmental",
        "program_name": "M.Sc in Environmental Science & Technology",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree in Environmental Science or any physical/biological science with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Jawaharlal Nehru University (JNU)",
          "Delhi University",
          "TERI School of Advanced Studies",
          "BHU Varanasi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-env-hs2",
        "degree_id": "bsc-environmental",
        "program_name": "M.Sc / MBA in Sustainability Management",
        "level": "PG",
        "entrance_exams": [
          "CAT",
          "XAT",
          "CUET-PG"
        ],
        "eligibility_rule": "Graduate degree with interest in corporate sustainability and resource management.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Xavier University Bhubaneswar (XSRM)",
          "TERI SAS",
          "IIM Lucknow (SM)",
          "NITIE/IIM Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-env-ct1",
        "degree_id": "bsc-environmental",
        "cert_name": "ISO 14001:2015 Environmental Management Lead Auditor",
        "provider": "IRCA / BSI",
        "domain": "Environmental Management",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in science or engineering"
        ],
        "official_url": "https://www.bsigroup.com",
        "sourceUrl": "https://www.bsigroup.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-env-ct2",
        "degree_id": "bsc-environmental",
        "cert_name": "Certified Carbon Footprint / GHG Accounting Specialist",
        "provider": "Greenhouse Gas Management Institute (GHGMI)",
        "domain": "Carbon Accounting",
        "level": "Intermediate",
        "prerequisites": [
          "Basic environmental science"
        ],
        "official_url": "https://ghginstitute.org",
        "sourceUrl": "https://ghginstitute.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-env-ct3",
        "degree_id": "bsc-environmental",
        "cert_name": "QGIS for Environmental Analysis & Mapping",
        "provider": "Coursera / QGIS Foundation",
        "domain": "Geospatial Analysis",
        "level": "Beginner",
        "prerequisites": [
          "Basic computer skills"
        ],
        "official_url": "https://www.qgis.org",
        "sourceUrl": "https://www.qgis.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-env-gv1",
        "degree_id": "bsc-environmental",
        "exam_or_post_name": "Central Pollution Control Board (CPCB) - Junior Scientific Assistant",
        "conducting_body": "CPCB / MoEFCC",
        "eligibility_rule": {
          "degreeFamily": "Environmental Sciences",
          "allowedDegrees": [
            "B.Sc with Chemistry / Environmental Science"
          ],
          "mandatorySubjects": [
            "Environmental Science",
            "Chemistry"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government scientific body conducting direct recruitment test."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://cpcb.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-env-gv2",
        "degree_id": "bsc-environmental",
        "exam_or_post_name": "State Pollution Control Board (SPCB) - Assistant Environmental Officer",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Environmental Science",
          "allowedDegrees": [
            "B.Sc Environmental Science",
            "B.Tech Environmental"
          ],
          "mandatorySubjects": [
            "Pollution Control",
            "Environmental Science"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Statutory state cadre conducting industrial compliance inspections."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-env-sw1",
        "degree_id": "bsc-environmental",
        "target_role": "Renewable Energy Project Siting & Environmental GIS Specialist",
        "pivot_reason": "Combine environmental impact constraints with GIS spatial analysis to identify and de-risk sites for utility-scale solar and wind farms.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Advanced Spatial Multi-Criteria Evaluation in QGIS",
            "type": "course",
            "detail": "Model slope, forest buffers, transmission line proximity, and ecological exclusion zones.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Renewable Energy Regulatory Clearance Frameworks",
            "type": "course",
            "detail": "Master MoEFCC forest clearance, coastal regulation zone (CRZ), and eco-sensitive zone rules.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "100MW Solar Park Siting Capstone",
            "type": "portfolio",
            "detail": "Deliver comprehensive GIS site-suitability and environmental screening report for a solar project.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "ESRI ArcGIS Specialist",
          "Certified Environmental Auditor"
        ],
        "why_feasible": "Environmental graduates possess direct understanding of protected habitats, river basins, and regulatory clearance bottlenecks.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-env-ent1",
        "degree_id": "bsc-environmental",
        "idea_title": "Industrial Environmental Compliance & Waste Audit Consultancy",
        "description": "Offer statutory pollution return filings, Form-V environmental statements, hazardous waste manifest audits, and rainwater harvesting designs for MSMEs.",
        "first_milestones": [
          "Acquire portable water testing kit, sound level meter, and stack sampler.",
          "Empanel with regional industrial associations (MIDC/GIDC/RIICO).",
          "Sign annual compliance service retainers with 10 manufacturing units."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax benefits and incubation support for cleantech ventures.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% subsidy on diagnostic instruments and environmental survey vehicles.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-environmental",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Ecology, Environmental Chemistry & Sampling",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master water pH, turbidity, dissolved oxygen, and soil texture testing.",
              "Learn QGIS mapping for local water bodies and land cover."
            ],
            "milestone": "Water quality testing and spatial mapping report completed"
          },
          {
            "stepNumber": 2,
            "title": "Pollution Analysis, EIA Methods & Summer Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform air sampling, BOD/COD effluent tests, and draft sample EIA matrices.",
              "Complete 1-month summer internship at a State PCB lab, NEERI, or environmental consultancy."
            ],
            "milestone": "Summer environmental internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "CUET-PG Preparation & ESG Capstone Project",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for CUET-PG Environmental Science entrance tests.",
              "Execute final-year capstone project on microplastic contamination or industrial effluent treatment."
            ],
            "milestone": "CUET-PG qualification & completed capstone"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-environmental",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Environmental Testing Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document instrument handling (spectrophotometer, sound meter), GIS, and ISO 14001 proficiencies.",
              "Review environmental protection acts (Air, Water, Environment Protection Act 1986)."
            ],
            "milestone": "Industry-ready environmental resume"
          },
          {
            "stepNumber": 2,
            "title": "Consultancy & SPCB Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for junior analyst and ESG consultant positions with consultancies and testing labs.",
              "Participate in technical assessments on pollution control parameters."
            ],
            "milestone": "Job offer secured from environmental consultancy"
          },
          {
            "stepNumber": 3,
            "title": "Consultant Onboarding & ESG Specialization",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join environmental team, draft compliance reports, and conduct site inspections.",
              "Pursue GRI sustainability reporting or lead auditor certifications."
            ],
            "milestone": "Completed first independent environmental audit report"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-stats",
    "id": "bsc-stats",
    "familyId": "science",
    "name": "Bachelor of Science in Statistics",
    "shortName": "B.Sc Statistics",
    "aliases": [
      "BSc Statistics",
      "B.Sc. Statistics",
      "BSc Stats",
      "BSc (Hons) Statistics",
      "bsc-stats"
    ],
    "level": "UG",
    "discipline": "Pure & Applied Sciences",
    "duration": "3 to 4 Years (NEP FYUP)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A specialized quantitative degree focused on probability theory, statistical inference, regression modeling, sample surveys, design of experiments, and time-series forecasting. It equips students with the mathematical rigor and data processing skills required for data science, market research, biostatistics, and official government statistics.",
    "key_skills": [
      "Statistical Inference & Hypothesis Testing (Parametric & Non-Parametric)",
      "Probability Distributions & Stochastic Processes",
      "Linear & Logistic Regression, ANOVA & Multivariate Analysis",
      "Time Series Analysis & Forecasting (ARIMA, Exponential Smoothing)",
      "Statistical Programming in R & Python",
      "Sample Survey Design & Stratified Sampling Methods"
    ],
    "subjects_taught": [
      "Descriptive Statistics & Probability Theory",
      "Statistical Inference (Estimation & Hypothesis Testing)",
      "Sampling Distributions & Sample Survey Designs",
      "Design of Experiments & Analysis of Variance (ANOVA)",
      "Time Series Analysis & Econometric Modeling",
      "Statistical Computing using R & Python"
    ],
    "typical_employers": [
      "National Statistical Office (NSO)",
      "Reserve Bank of India (RBI)",
      "Mu Sigma",
      "Fractal Analytics",
      "IQVIA (Biostatistics)",
      "NielsenIQ",
      "Deloitte Analytics",
      "Kaggle / Tech Startups"
    ],
    "specializations": [
      {
        "id": "stats-biostats",
        "name": "Biostatistics & Clinical Trials",
        "aliases": [
          "Clinical Stats"
        ],
        "skillsGained": [
          "Survival Analysis",
          "Clinical SAS"
        ],
        "typicalRoles": [
          "Biostatistician Trainee"
        ]
      },
      {
        "id": "stats-datascience",
        "name": "Data Science & Predictive Modeling",
        "aliases": [
          "Predictive Analytics"
        ],
        "skillsGained": [
          "Machine Learning",
          "R/Python"
        ],
        "typicalRoles": [
          "Junior Data Scientist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bsc-st-c1",
        "degree_id": "bsc-stats",
        "role_title": "Statistical Analyst / Junior Data Scientist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Rigorous training in probability, regression analysis, and R/Python directly qualifies you for corporate analytics and predictive modeling.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Analytics India Magazine Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "R Programming",
          "Python",
          "Regression Modeling",
          "SQL"
        ],
        "top_employers": [
          "Fractal",
          "Mu Sigma",
          "LatentView",
          "Tiger Analytics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-st-c2",
        "degree_id": "bsc-stats",
        "role_title": "Associate Biostatistician",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "ANOVA, survival analysis, and hypothesis testing coursework prepare you for clinical trial data analysis at multinational CROs.",
        "indicative_salary": {
          "min": 4.8,
          "max": 10.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Biostatistics Employment Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Biostatistics",
          "Survival Analysis",
          "R",
          "Clinical Data"
        ],
        "top_employers": [
          "IQVIA",
          "Parexel",
          "Novartis",
          "Syneos Health"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-st-c3",
        "degree_id": "bsc-stats",
        "role_title": "Director of Advanced Analytics / Chief Statistician",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading enterprise statistical architecture, experimentation platforms (A/B testing at scale), and risk models qualifies you for executive data leadership.",
        "indicative_salary": {
          "min": 22.0,
          "max": 50.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Top Executive Analytics Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Enterprise A/B Testing",
          "Econometric Modeling",
          "Executive Storytelling",
          "P&L Analytics"
        ],
        "top_employers": [
          "Amazon",
          "Flipkart",
          "NielsenIQ",
          "Mastercard"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bsc-st-hs1",
        "degree_id": "bsc-stats",
        "program_name": "Master of Statistics (M.Stat)",
        "level": "PG",
        "entrance_exams": [
          "ISI Admission Test"
        ],
        "eligibility_rule": "Bachelor's degree with Statistics as a full subject with minimum 55% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Indian Statistical Institute (ISI Kolkata/Delhi)",
          "Chennai Mathematical Institute (CMI)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-st-hs2",
        "degree_id": "bsc-stats",
        "program_name": "M.Sc in Statistics",
        "level": "PG",
        "entrance_exams": [
          "IIT JAM (MS)",
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree with Statistics or Mathematics as a major subject for at least two years.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "IIT Bombay",
          "IIT Kanpur",
          "Delhi University",
          "University of Hyderabad"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bsc-st-ct1",
        "degree_id": "bsc-stats",
        "cert_name": "Statistical Inference & Data Analysis in R",
        "provider": "Johns Hopkins University / Coursera",
        "domain": "Statistical Computing",
        "level": "Intermediate",
        "prerequisites": [
          "Basic statistics"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-st-ct2",
        "degree_id": "bsc-stats",
        "cert_name": "Certified Actuarial Analyst (CS1 - Actuarial Statistics)",
        "provider": "Institute and Faculty of Actuaries (IFoA) / IAI",
        "domain": "Actuarial Science",
        "level": "Intermediate",
        "prerequisites": [
          "Probability and statistics"
        ],
        "official_url": "https://www.actuariesindia.org",
        "sourceUrl": "https://www.actuariesindia.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bsc-st-ct3",
        "degree_id": "bsc-stats",
        "cert_name": "Google Advanced Data Analytics Professional Certificate",
        "provider": "Google",
        "domain": "Data Analytics",
        "level": "Intermediate",
        "prerequisites": [
          "Python and statistics"
        ],
        "official_url": "https://grow.google/certificates/data-analytics/",
        "sourceUrl": "https://grow.google/certificates/data-analytics/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bsc-st-gv1",
        "degree_id": "bsc-stats",
        "exam_or_post_name": "Indian Statistical Service (ISS) Examination",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Statistics",
          "allowedDegrees": [
            "Bachelor's Degree with Statistics / Mathematical Statistics as one subject"
          ],
          "mandatorySubjects": [
            "Statistics",
            "Sample Surveys"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "UPSC premier Group 'A' service staffing the National Statistical Office and central ministries."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bsc-st-gv2",
        "degree_id": "bsc-stats",
        "exam_or_post_name": "Reserve Bank of India (RBI) Grade 'B' - DSIM (Statistics)",
        "conducting_body": "Reserve Bank of India",
        "eligibility_rule": {
          "degreeFamily": "Statistics / Mathematical Statistics",
          "allowedDegrees": [
            "B.Sc with Statistics + M.Sc Statistics"
          ],
          "mandatorySubjects": [
            "Statistics",
            "Econometrics"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Department of Statistics and Information Management (DSIM) cadre in RBI."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.rbi.org.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bsc-st-sw1",
        "degree_id": "bsc-stats",
        "target_role": "A/B Testing & Growth Experimentation Lead",
        "pivot_reason": "Apply statistical hypothesis testing, power analysis, and multi-armed bandit algorithms to product conversion rate optimization (CRO) in tech apps.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Online Controlled Experiments & Sample Size Sizing",
            "type": "course",
            "detail": "Learn minimum detectable effect (MDE), p-hacking prevention, and variance reduction techniques (CUPED).",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Product Analytics & Event Tracking (Amplitude / Mixpanel)",
            "type": "course",
            "detail": "Instrument user event funnels and cohort retention curves.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "High-Velocity A/B Testing Framework Capstone",
            "type": "portfolio",
            "detail": "Build automated statistical significance reporting dashboard for a mobile checkout experiment.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Reforge Experimentation Certification",
          "Google Analytics 4 Certified"
        ],
        "why_feasible": "Statisticians have the mathematical rigor to design clean, statistically valid experiments and avoid false positives that cost millions.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-st-ent1",
        "degree_id": "bsc-stats",
        "idea_title": "Market Research & Consumer Survey Intelligence Agency",
        "description": "Offer statistically rigorous consumer sentiment surveys, stratified polling, and retail footfall econometric forecasting.",
        "first_milestones": [
          "Build digital survey sampling tool with demographic quota weighting.",
          "Execute retail perception study for 5 regional supermarket chains.",
          "Publish quarterly consumer confidence barometer reports to acquire corporate retainers."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Incentives and seed support for data analytics ventures.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "MSME Innovation Scheme",
            "agency": "Ministry of MSME",
            "benefits": "Financial aid for developing proprietary survey data platforms.",
            "sourceUrl": "https://innovative.msme.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-stats",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Probability Distributions & Descriptive R Code",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master probability axioms, discrete/continuous distributions, and exploratory data analysis in R.",
              "Compute summary statistics and visualize distributions with ggplot2."
            ],
            "milestone": "Statistical computing portfolio in R"
          },
          {
            "stepNumber": 2,
            "title": "Inference, Regression & Survey Sampling",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn maximum likelihood estimation, confidence intervals, linear models, and stratified sampling.",
              "Complete 1-month summer analytics internship at market research or fintech firm."
            ],
            "milestone": "Summer analytics internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "IIT JAM (MS) / ISS Preparation & Placements",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for IIT JAM Mathematical Statistics (MS) and UPSC ISS exams.",
              "Execute final-year time series forecasting or regression capstone."
            ],
            "milestone": "High JAM MS score or corporate analytics offer"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-stats",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Quantitative Interview Prep",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document statistical testing methodologies, R/Python scripts, and econometric models.",
              "Practice case interviews on A/B testing, regression diagnostics, and SQL queries."
            ],
            "milestone": "Industry-ready statistical data analyst resume"
          },
          {
            "stepNumber": 2,
            "title": "Campus Placements & Deep Analytics Hiring",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply to analytics consultancies, clinical CROs, and statistical government exams.",
              "Solve live statistical problem-solving tests during interviews."
            ],
            "milestone": "Selected as Statistical Analyst"
          },
          {
            "stepNumber": 3,
            "title": "Corporate Onboarding & Modeling Deployment",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join data team, validate production statistical models, and present executive insights.",
              "Pursue M.Stat or specialized machine learning credentials."
            ],
            "milestone": "Successful deployment of first production predictive model"
          }
        ]
      }
    }
  }
];
