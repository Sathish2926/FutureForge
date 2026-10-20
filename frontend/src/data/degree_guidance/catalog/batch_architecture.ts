import { UniversalDegreeRecord } from "./types";

export const ARCHITECTURE_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "barch",
    "id": "barch",
    "familyId": "architecture_planning",
    "name": "Bachelor of Architecture",
    "shortName": "B.Arch",
    "aliases": [
      "BArch",
      "B.Arch.",
      "Bachelor in Architecture",
      "Architecture graduate",
      "Architect",
      "barch"
    ],
    "level": "UG",
    "discipline": "Architecture & Planning",
    "duration": "5 Years (10 Semesters)",
    "durationYears": 5,
    "regulator": "COA",
    "overview": "A statutory 5-year professional architectural program regulated by the Council of Architecture (COA). It integrates creative spatial design studio projects, structural engineering, building construction materials, architectural history, climate-responsive bioclimatic design, and building bye-laws with a mandatory 1-year professional architectural office training.",
    "key_skills": [
      "Architectural Spatial Concept Design & Design Studio Synthesis",
      "Building Information Modeling (BIM) & 3D Visualization (Revit, Rhino, Lumion)",
      "Working Drawings, Structural Detailing & Municipal Submission Plans",
      "Climate-Responsive Bioclimatic Architecture & Solar Passive Design",
      "Building Construction Technology, Materials & HVAC/MEP Coordination",
      "Council of Architecture Professional Practice Code & Building Bye-Laws"
    ],
    "subjects_taught": [
      "Architectural Design Studios (Semesters 1 through 10)",
      "Building Materials and Construction Technology",
      "History of Indian and Western Architecture",
      "Structural Design in Architecture (RCC & Steel)",
      "Climate-Responsive Architecture & Environmental Services",
      "Building Services (Plumbing, Electrical, HVAC, Fire Safety)",
      "Professional Practice, Building Bye-Laws & Valuation",
      "Mandatory Practical Architectural Office Training (Semester 9/10)"
    ],
    "typical_employers": [
      "Architectural Design Firms (Hafeez Contractor, Sanjay Puri, Morphogenesis)",
      "Multinational Engineering Consultancies (Atkins, AECOM, WSP)",
      "Real Estate Developers (DLF, Godrej Properties, Prestige)",
      "Government Agencies (CPWD, NBCC, Housing Boards)",
      "Independent Registered Architectural Practice"
    ],
    "specializations": [
      {
        "id": "barch-sustainable",
        "name": "Sustainable & Bioclimatic Architecture",
        "aliases": [
          "Green Building"
        ],
        "skillsGained": [
          "Energy Simulation",
          "GRIHA"
        ],
        "typicalRoles": [
          "Sustainability Architect"
        ]
      },
      {
        "id": "barch-urban",
        "name": "Urban Design & Mixed-Use Complexes",
        "aliases": [
          "Urban Design"
        ],
        "skillsGained": [
          "Master Planning",
          "Spatial Density"
        ],
        "typicalRoles": [
          "Project Architect"
        ]
      }
    ],
    "sourceUrl": "https://www.coa.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bar-c1",
        "degree_id": "barch",
        "role_title": "Junior Architect / Project Architect",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "COA registration, working drawing drafting, Revit BIM modeling, and municipal submission expertise qualify you directly for architectural studios.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Council of Architecture Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Revit BIM",
          "Working Drawings",
          "Municipal Sanctions",
          "Lumion"
        ],
        "top_employers": [
          "Morphogenesis",
          "Sanjay Puri Architects",
          "Hafeez Contractor",
          "AECOM"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bar-c2",
        "degree_id": "barch",
        "role_title": "Assistant Architect - Central Public Works Department (CPWD)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "Statutory Council of Architecture registration qualifies you for central and state public works architectural cadres.",
        "indicative_salary": {
          "min": 7.5,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "UPSC Engineering & Architecture Services (Level 10) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Government Buildings",
          "CPWD Works Manual",
          "BIM Compliance",
          "Green Rating"
        ],
        "top_employers": [
          "CPWD",
          "Military Engineer Services (MES)",
          "NBCC India"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bar-c3",
        "degree_id": "barch",
        "role_title": "Principal Architect / Architectural Studio Partner",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Decades of award-winning architectural building execution, commanding institutional master plans, and signature public structures qualify you for studio principalship.",
        "indicative_salary": {
          "min": 25.0,
          "max": 75.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Institute of Architects Principal Earnings Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Master Planning",
          "Client CXO Presentations",
          "Signature Architecture",
          "Studio Governance"
        ],
        "top_employers": [
          "Independent Architectural Practice",
          "National Design Studios"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bar-hs1",
        "degree_id": "barch",
        "program_name": "Master of Architecture (M.Arch in Sustainable Architecture / Urban Design)",
        "level": "PG",
        "entrance_exams": [
          "GATE (AR)",
          "Institutional University Entrance"
        ],
        "eligibility_rule": "Bachelor of Architecture (B.Arch) with minimum 50% marks from a COA-recognized institution; admission is via GATE (Architecture & Planning) or individual university tests, never NATA (which is for B.Arch).",
        "typical_duration": "2 Years",
        "top_institutes": [
          "School of Planning and Architecture (SPA New Delhi)",
          "CEPT University Ahmedabad",
          "SPA Bhopal",
          "IIT Roorkee"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bar-hs2",
        "degree_id": "barch",
        "program_name": "Master of Urban Design (M.U.D.) / Urban Planning (M.Plan)",
        "level": "PG",
        "entrance_exams": [
          "GATE (AR)",
          "Institutional Tests"
        ],
        "eligibility_rule": "B.Arch degree from a COA-recognized institution with valid GATE or CEPT entrance score.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "CEPT University",
          "SPA New Delhi",
          "SPA Vijayawada",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bar-ct1",
        "degree_id": "barch",
        "cert_name": "Council of Architecture (COA) Registration Certificate",
        "provider": "Council of Architecture",
        "domain": "Statutory Practice License",
        "level": "Beginner",
        "prerequisites": [
          "B.Arch degree from recognized institution"
        ],
        "official_url": "https://www.coa.gov.in",
        "sourceUrl": "https://www.coa.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bar-ct2",
        "degree_id": "barch",
        "cert_name": "IGBC Accredited Professional (IGBC AP) / GRIHA Certified Professional",
        "provider": "Indian Green Building Council (IGBC) / TERI",
        "domain": "Green Building",
        "level": "Intermediate",
        "prerequisites": [
          "B.Arch degree or final year student"
        ],
        "official_url": "https://igbc.in",
        "sourceUrl": "https://igbc.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bar-ct3",
        "degree_id": "barch",
        "cert_name": "Autodesk Certified Professional in Revit for Architectural Design",
        "provider": "Autodesk",
        "domain": "BIM Architecture",
        "level": "Intermediate",
        "prerequisites": [
          "Revit modeling proficiency"
        ],
        "official_url": "https://www.autodesk.com",
        "sourceUrl": "https://www.autodesk.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bar-gv1",
        "degree_id": "barch",
        "exam_or_post_name": "Assistant Architect - Central Public Works Department (CPWD)",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Architecture",
          "allowedDegrees": [
            "Degree in Architecture (B.Arch) + COA Registration"
          ],
          "mandatorySubjects": [
            "Architectural Design",
            "Building Construction",
            "History of Architecture"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "UPSC recruits permanent Assistant Architects designing national government buildings and central secretariats."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bar-gv2",
        "degree_id": "barch",
        "exam_or_post_name": "Architect - Military Engineer Services (MES) / DDA",
        "conducting_body": "UPSC / Delhi Development Authority",
        "eligibility_rule": {
          "degreeFamily": "Architecture",
          "allowedDegrees": [
            "B.Arch with permanent COA registration"
          ],
          "mandatorySubjects": [
            "Building Codes",
            "Architectural Design"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Gazetted architectural posts managing defense infrastructure and municipal master planning."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bar-sw1",
        "degree_id": "barch",
        "target_role": "Computational Design & Parametric Fa\u00e7ade Specialist",
        "pivot_reason": "Translate spatial geometry, solar radiation vectors, and structural grids into algorithmic parametric fa\u00e7ades using Grasshopper and Rhino.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Parametric Modeling in Rhino & Grasshopper",
            "type": "course",
            "detail": "Master visual scripting, attractor points, voronoi tessellation, and complex panel subdivision.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Environmental Simulation (Ladybug & Honeybee)",
            "type": "course",
            "detail": "Simulate solar daylighting, glare analysis, and thermal facade heat gains directly inside Grasshopper.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Complex Kinetic Kinetic Fa\u00e7ade Capstone",
            "type": "portfolio",
            "detail": "Deliver fully parametric, solar-responsive building envelope model with fabrication shop drawings.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Parametric Design Specialist",
          "Grasshopper Advanced Certification"
        ],
        "why_feasible": "Architects have five years of spatial volume and daylighting training, making computational parametric envelope design a high-paying natural specialty.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bar-ent1",
        "degree_id": "barch",
        "idea_title": "Independent Architectural Design Studio & Interior Practice",
        "description": "Establish a registered architectural practice providing turnkey residential villas, boutique commercial workspaces, and green building certifications.",
        "first_milestones": [
          "Register with Council of Architecture and obtain statutory Architect seal and letterhead.",
          "Build an online portfolio of 4 conceptual building designs and working drawing sets.",
          "Secure first 3 residential villa architectural design and site supervision commissions."
        ],
        "relevant_schemes": [
          {
            "name": "Council of Architecture Practice Guidelines",
            "agency": "Council of Architecture",
            "benefits": "Statutory minimum fee scales and professional practice legal protections.",
            "sourceUrl": "https://www.coa.gov.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for professional design workstations and plotting equipment.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "barch",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Design Fundamentals, Geometry & Manual Drafting",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master orthographic projections, axonometric views, perspective drawing, and architectural model making.",
              "Present basic spatial design studio schemes before external academic juries."
            ],
            "milestone": "Foundational design studio portfolio and physical models verified"
          },
          {
            "stepNumber": 2,
            "title": "Building Construction, Revit BIM & Climate Studio",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Draft complete construction details (foundations, staircases, curtain walls) and learn Revit BIM modeling.",
              "Design climate-responsive bioclimatic housing and public institutional buildings."
            ],
            "milestone": "Advanced working drawing set and climate simulation report completed"
          },
          {
            "stepNumber": 3,
            "title": "Professional Office Training & Thesis Project",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Complete mandatory 6-month or 1-year architectural office training at an established architectural firm.",
              "Execute comprehensive final-year individual architectural design thesis on a complex public building."
            ],
            "milestone": "Architectural thesis jury clearance and degree completion"
          }
        ]
      },
      "completed": {
        "degree_id": "barch",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "COA Registration & Architectural Portfolio Compilation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Obtain permanent registration number with Council of Architecture (CA/XXXX/XXXXX).",
              "Compile comprehensive architectural design portfolio featuring thesis, working drawings, and 3D renders."
            ],
            "milestone": "Registered Architect professional resume and design portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Studio Applications & Government CPWD Recruitment",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for project architect openings at leading architectural studios and developer design teams.",
              "Appear for UPSC Assistant Architect or state public works recruitment exams."
            ],
            "milestone": "Appointment letter secured as Junior Architect"
          },
          {
            "stepNumber": 3,
            "title": "Architect Onboarding & Site Project Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Issue working drawings to contractors, coordinate structural/MEP consultants, and supervise site casting.",
              "Progress toward Senior Project Architect or launch independent private practice."
            ],
            "milestone": "First completed physical building constructed and inaugurated"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bplan",
    "id": "bplan",
    "familyId": "architecture_planning",
    "name": "Bachelor of Planning",
    "shortName": "B.Plan",
    "aliases": [
      "BPlan",
      "B.Plan.",
      "Bachelor in Planning",
      "Urban Planning graduate",
      "Town Planning degree",
      "bplan"
    ],
    "level": "UG",
    "discipline": "Architecture & Planning",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "AICTE",
    "overview": "A specialized 4-year urban development program recognized by the Institute of Town Planners, India (ITPI) and AICTE. It covers land-use planning, transportation modeling, regional planning, GIS spatial analytics, housing economics, urban infrastructure networks, and environmental policy for smart cities and metropolitan regional authorities.",
    "key_skills": [
      "Urban Master Planning, Zoning Regulations & Development Control Rules (DCR)",
      "Geographic Information Systems (GIS) Spatial Mapping (ArcGIS, QGIS)",
      "Transportation Planning, Traffic Volume Counts & Transit-Oriented Design (TOD)",
      "Demographic Projections, Housing Needs Analysis & Social Infrastructure",
      "Environmental Impact Assessment (EIA) for Regional Mega-Projects",
      "Municipal Governance, Urban Local Body (ULB) Finance & Smart City Policies"
    ],
    "subjects_taught": [
      "Evolution of Human Settlements & Planning History",
      "Planning Studio I through VIII (Neighborhood, Master Plan, Regional Plan)",
      "Geoinformatics for Planning (GIS & Remote Sensing)",
      "Transportation Planning, Traffic Engineering & Transit Systems",
      "Housing, Slum Redevelopment & Real Estate Economics",
      "Infrastructure Planning (Water, Drainage, Solid Waste & Energy)",
      "Planning Legislation, Urban Governance & Development Management",
      "Graduation Planning Thesis & Professional Office Internship"
    ],
    "typical_employers": [
      "Urban Development Authorities (DDA, BDA, MMRDA, HUDA)",
      "Town and Country Planning Departments (TCPD)",
      "Urban Planning Consultancies (CRISIL Infrastructure, LEA Associates, IPE Global)",
      "Smart City Special Purpose Vehicles (SPVs)",
      "Metro Rail Corporations & Transportation Consultancies"
    ],
    "specializations": [
      {
        "id": "bplan-transport",
        "name": "Transportation & Transit-Oriented Planning",
        "aliases": [
          "Transport Planning"
        ],
        "skillsGained": [
          "Traffic Simulation",
          "Metro Corridor"
        ],
        "typicalRoles": [
          "Transport Planner"
        ]
      },
      {
        "id": "bplan-regional",
        "name": "Urban Governance & Master Planning",
        "aliases": [
          "Master Planning"
        ],
        "skillsGained": [
          "Zoning Maps",
          "DCR Codes"
        ],
        "typicalRoles": [
          "Urban Planner"
        ]
      }
    ],
    "sourceUrl": "https://www.itpi.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bpl-c1",
        "degree_id": "bplan",
        "role_title": "Assistant Town Planner / Urban Planning Associate",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "GIS zoning maps, development control regulations (DCR), and master planning studio training qualify you directly for municipal development authorities.",
        "indicative_salary": {
          "min": 5.5,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Town Planning Commission Level 10 Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "GIS Mapping",
          "Master Plan Analysis",
          "Zoning Bylaws",
          "Traffic Surveys"
        ],
        "top_employers": [
          "MMRDA",
          "DDA",
          "Town and Country Planning Department",
          "Smart City SPVs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpl-c2",
        "degree_id": "bplan",
        "role_title": "Urban Infrastructure & GIS Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Spatial analysis, demographic projections, and utility network design map directly into global infrastructure consultancies.",
        "indicative_salary": {
          "min": 5.0,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Infrastructure Advisory Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ArcGIS",
          "QGIS",
          "Demographic Modeling",
          "Infrastructure Feasibility"
        ],
        "top_employers": [
          "IPE Global",
          "CRISIL Advisory",
          "PwC Urban Practice",
          "LEA Associates"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpl-c3",
        "degree_id": "bplan",
        "role_title": "Chief Urban Planner / Metropolitan Planning Director",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Leading statutory 20-year metropolitan master plans, transit-oriented development corridors, and smart city infrastructure qualifies you for chief town planner rank.",
        "indicative_salary": {
          "min": 20.0,
          "max": 48.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Town Planning Administrative Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Metropolitan Master Plan",
          "Transit Corridors",
          "Cabinet Urban Policy",
          "Executive Leadership"
        ],
        "top_employers": [
          "Metropolitan Development Authorities",
          "Ministry of Housing and Urban Affairs (MoHUA)"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bpl-hs1",
        "degree_id": "bplan",
        "program_name": "Master of Planning (M.Plan in Urban / Transport / Environmental Planning)",
        "level": "PG",
        "entrance_exams": [
          "GATE (AR / PE)"
        ],
        "eligibility_rule": "Bachelor's degree in Planning (B.Plan) or Architecture with minimum 55% marks; admission via GATE.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "School of Planning and Architecture (SPA New Delhi)",
          "CEPT University Ahmedabad",
          "SPA Bhopal",
          "IIT Kharagpur"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpl-hs2",
        "degree_id": "bplan",
        "program_name": "M.Sc in Urban Policy / Smart Cities (International)",
        "level": "PG",
        "entrance_exams": [
          "International Applications"
        ],
        "eligibility_rule": "Four-year undergraduate degree in planning with strong portfolio.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "UCL Bartlett (London)",
          "LSE Cities",
          "National University of Singapore (NUS)",
          "TU Delft"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bpl-ct1",
        "degree_id": "bplan",
        "cert_name": "ITPI Associate Membership (AITP)",
        "provider": "Institute of Town Planners, India (ITPI)",
        "domain": "Professional Town Planning License",
        "level": "Beginner",
        "prerequisites": [
          "B.Plan degree from ITPI recognized institution"
        ],
        "official_url": "https://www.itpi.org.in",
        "sourceUrl": "https://www.itpi.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bpl-ct2",
        "degree_id": "bplan",
        "cert_name": "ESRI ArcGIS Spatial Analysis & Urban Analyst Professional",
        "provider": "ESRI",
        "domain": "GIS Mapping",
        "level": "Intermediate",
        "prerequisites": [
          "GIS familiarity"
        ],
        "official_url": "https://www.esri.com",
        "sourceUrl": "https://www.esri.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bpl-ct3",
        "degree_id": "bplan",
        "cert_name": "Transit-Oriented Development (TOD) & Sustainable Urban Mobility",
        "provider": "World Bank Group / WRI India",
        "domain": "Urban Transport",
        "level": "Beginner",
        "prerequisites": [
          "Urban planning student or professional"
        ],
        "official_url": "https://wri-india.org",
        "sourceUrl": "https://wri-india.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bpl-gv1",
        "degree_id": "bplan",
        "exam_or_post_name": "State PSC - Assistant Town Planner (ATP)",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Urban Planning",
          "allowedDegrees": [
            "B.Plan / M.Plan / Degree in Town Planning"
          ],
          "mandatorySubjects": [
            "Town Planning",
            "Planning Legislation",
            "Transportation"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State gazetted officer cadre heading regional planning offices and municipal town planning approvals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpl-gv2",
        "degree_id": "bplan",
        "exam_or_post_name": "Town Planning Officer / Planning Assistant - DDA / MMRDA",
        "conducting_body": "Delhi Development Authority / MMRDA",
        "eligibility_rule": {
          "degreeFamily": "Planning",
          "allowedDegrees": [
            "Bachelor of Planning (B.Plan)"
          ],
          "mandatorySubjects": [
            "Urban Planning",
            "GIS"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Recruitment for metropolitan planning teams executing statutory master plan modifications."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://dda.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bpl-sw1",
        "degree_id": "bplan",
        "target_role": "Geospatial Data Scientist & Urban Analytics Lead",
        "pivot_reason": "Bridge GIS spatial mapping, land-use databases, and census demographics into machine-learning driven urban mobility and retail real estate expansion forecasting.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Spatial Python & GeoPandas / PostGIS Mastery",
            "type": "course",
            "detail": "Master spatial queries, vector buffering, polygon overlays, and GeoJSON in Python.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Mobility Analytics & Machine Learning on Spatial Data",
            "type": "course",
            "detail": "Model traffic congestion, retail store catchment trade areas, and pedestrian density.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Commercial Retail Site Selection Engine Capstone",
            "type": "portfolio",
            "detail": "Deliver end-to-end spatial suitability model predicting footfalls and revenues for store expansion.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Spatial Data Scientist",
          "PostGIS Database Administrator"
        ],
        "why_feasible": "Urban planners already understand demographic layers, commuting patterns, and spatial zoning, making geospatial data science a natural fit.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bpl-ent1",
        "degree_id": "bplan",
        "idea_title": "Urban Spatial Planning & GIS Feasibility Consultancy",
        "description": "Offer GIS mapping, master plan conformity studies, environmental clearance dossiers, and layout approvals for real estate developers and infrastructure contractors.",
        "first_milestones": [
          "Acquire commercial GIS software licenses and high-precision GPS survey units.",
          "Empanel as registered planning consultant with regional town planning bodies.",
          "Deliver 5 statutory layout approval submissions and GIS flood-risk analysis reports."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Incentives and incubator support for urban tech ventures.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for specialized GIS workstations and plotting systems.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bplan",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Planning History, Neighborhood Studio & GIS Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master human settlements history, demographic statistics, spatial surveying, and QGIS mapping.",
              "Complete neighborhood planning studio project including physical and household surveys."
            ],
            "milestone": "Neighborhood planning survey report and GIS land-use map verified"
          },
          {
            "stepNumber": 2,
            "title": "Master Planning, Transport Studies & Summer Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study transit modeling, traffic counts, housing economics, and development control regulations.",
              "Complete mandatory summer internship at an urban development authority (DDA/MMRDA) or consulting firm."
            ],
            "milestone": "Urban planning summer internship completion certificate"
          },
          {
            "stepNumber": 3,
            "title": "Regional Planning, Planning Thesis & GATE Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare comprehensive 20-year metropolitan master plan studio project.",
              "Execute final-year planning thesis on transit-oriented development, climate resilience, or informal settlements."
            ],
            "milestone": "Graduation planning thesis jury clearance & portfolio"
          }
        ]
      },
      "completed": {
        "degree_id": "bplan",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "ITPI Associate Membership & Resume Compilation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Apply for Associate Membership with Institute of Town Planners, India (AITP).",
              "Document GIS proficiencies (ArcGIS, QGIS), demographic modeling, and master planning studios."
            ],
            "milestone": "Professional urban planner resume and project portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Town Planning Commission & Consultancy Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Assistant Town Planner positions in state PSCs and urban planning consultancies.",
              "Present planning studio maps and answer questions on planning legislation during interviews."
            ],
            "milestone": "Appointment letter secured as Assistant Town Planner"
          },
          {
            "stepNumber": 3,
            "title": "Urban Planner Onboarding & Master Plan Implementation",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join town planning office, review land-use change requests, and verify zoning compliance.",
              "Pursue M.Plan via GATE or lead regional master plan revisions."
            ],
            "milestone": "Approved first statutory urban layout plan"
          }
        ]
      }
    }
  }
];
