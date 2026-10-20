import { UniversalDegreeRecord } from "./types";

export const HEALTH_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "mbbs",
    "id": "mbbs",
    "familyId": "medicine_health",
    "name": "Bachelor of Medicine & Bachelor of Surgery",
    "shortName": "MBBS",
    "aliases": [
      "MBBS",
      "M.B.B.S.",
      "Bachelor of Medicine",
      "Doctor of Medicine",
      "mbbs"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5.5 Years (4.5 Years Academics + 1 Year CRMI)",
    "durationYears": 5,
    "regulator": "NMC",
    "overview": "The premier undergraduate medical program regulated by the National Medical Commission (NMC). It integrates pre-clinical anatomy and physiology, paraclinical pharmacology and pathology, and extensive clinical rotations across internal medicine, general surgery, pediatrics, and obstetrics/gynecology with a mandatory one-year rotatory internship.",
    "key_skills": [
      "Clinical Diagnostic Reasoning & Comprehensive Physical Examination",
      "Emergency Resuscitation (BLS / ACLS) & Acute Triage Protocol",
      "Pharmacotherapeutics, Rational Drug Prescription & Antibiotic Stewardship",
      "Minor Surgical Procedures (Suturing, Cannulation, Debridement)",
      "Patient Communication, Informed Consent & Medical Ethics",
      "Public Health Surveillance & Preventive Epidemic Management"
    ],
    "subjects_taught": [
      "Human Anatomy, Embryology & Histology",
      "Human Physiology & Medical Biochemistry",
      "Pathology, Microbiology & Forensic Medicine",
      "Pharmacology & Therapeutics",
      "General Medicine, Dermatology & Psychiatry",
      "General Surgery, Orthopedics & Ophthalmology",
      "Obstetrics, Gynecology & Pediatrics",
      "Compulsory Rotatory Medical Internship (CRMI - 12 Months)"
    ],
    "typical_employers": [
      "Central & State Government Hospitals",
      "Apollo Hospitals",
      "Fortis Healthcare",
      "Max Healthcare",
      "Armed Forces Medical Services (AFMS)",
      "Primary Health Centres (PHCs)",
      "World Health Organization (WHO India)"
    ],
    "specializations": [
      {
        "id": "mbbs-clinical",
        "name": "General Clinical Practice & Primary Care",
        "aliases": [
          "General Physician"
        ],
        "skillsGained": [
          "Outpatient Care",
          "Chronic Disease Mgmt"
        ],
        "typicalRoles": [
          "Medical Officer (MO)"
        ]
      },
      {
        "id": "mbbs-emergency",
        "name": "Emergency & Critical Care Medicine",
        "aliases": [
          "ER Medicine"
        ],
        "skillsGained": [
          "ACLS",
          "Trauma Care"
        ],
        "typicalRoles": [
          "Emergency Resident"
        ]
      }
    ],
    "sourceUrl": "https://www.nmc.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "mbbs-c1",
        "degree_id": "mbbs",
        "role_title": "Medical Officer (MO) / General Duty Medical Officer (GDMO)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "NMC permanent state medical council registration and one-year CRMI directly qualify you for government hospitals and primary health centers.",
        "indicative_salary": {
          "min": 9.0,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Central Health Service Pay Scale (Level 10 + NPA) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Diagnosis",
          "Outpatient Care",
          "Emergency Triage",
          "NMC Registration"
        ],
        "top_employers": [
          "State Health Services",
          "Central Government Health Scheme (CGHS)",
          "Railway Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mbbs-c2",
        "degree_id": "mbbs",
        "role_title": "Junior Clinical Resident (Internal Medicine / Surgery)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "Clinical bedside rotations, inpatient ward management, and emergency room resuscitation enable immediate ICU/ward hospital residency.",
        "indicative_salary": {
          "min": 8.5,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Corporate Healthcare Resident Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Ward Management",
          "ICU Monitoring",
          "ACLS",
          "Clinical Case Records"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Max Healthcare",
          "Fortis",
          "Medanta"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mbbs-c3",
        "degree_id": "mbbs",
        "role_title": "Chief Medical Superintendent / Hospital Medical Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Post-graduate clinical specialization (MD/MS) and decades of clinical governance, NABH hospital accreditations, and medical administration qualify you for hospital directorship.",
        "indicative_salary": {
          "min": 30.0,
          "max": 80.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Medical Director Executive Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Governance",
          "NABH Accreditations",
          "Hospital Operations",
          "Medicolegal Leadership"
        ],
        "top_employers": [
          "Apollo Hospitals Group",
          "Manipal Hospitals",
          "Max Healthcare"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "mbbs-hs1",
        "degree_id": "mbbs",
        "program_name": "MD / MS Post Graduate Medical Specialization",
        "level": "PG",
        "entrance_exams": [
          "NEET-PG",
          "INI-CET"
        ],
        "eligibility_rule": "MBBS degree with permanent NMC / State Medical Council registration and completion of 1-year rotatory internship.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "AIIMS New Delhi",
          "PGI Chandigarh",
          "JIPMER Puducherry",
          "CMC Vellore",
          "Maulana Azad Medical College"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mbbs-hs2",
        "degree_id": "mbbs",
        "program_name": "DNB (Diplomate of National Board)",
        "level": "PG",
        "entrance_exams": [
          "NEET-PG"
        ],
        "eligibility_rule": "MBBS with recognized rotatory internship completion.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "National Board of Examinations (NBE accredited super-specialty hospitals)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "mbbs-ct1",
        "degree_id": "mbbs",
        "cert_name": "Advanced Cardiovascular Life Support (ACLS & BLS)",
        "provider": "American Heart Association (AHA)",
        "domain": "Emergency Medicine",
        "level": "Beginner",
        "prerequisites": [
          "Medical graduate or CRMI intern"
        ],
        "official_url": "https://cpr.heart.org",
        "sourceUrl": "https://cpr.heart.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mbbs-ct2",
        "degree_id": "mbbs",
        "cert_name": "Advanced Trauma Life Support (ATLS)",
        "provider": "American College of Surgeons (ACS)",
        "domain": "Trauma Resuscitation",
        "level": "Intermediate",
        "prerequisites": [
          "MBBS degree holder"
        ],
        "official_url": "https://www.facs.org/quality-programs/trauma/education/atls/",
        "sourceUrl": "https://www.facs.org/quality-programs/trauma/education/atls/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "mbbs-ct3",
        "degree_id": "mbbs",
        "cert_name": "Post Graduate Program in Diabetology (PGPD)",
        "provider": "Johns Hopkins Medicine / BMJ",
        "domain": "Chronic Disease Management",
        "level": "Intermediate",
        "prerequisites": [
          "MBBS degree with registration"
        ],
        "official_url": "https://www.hopkinsmedicine.org",
        "sourceUrl": "https://www.hopkinsmedicine.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "mbbs-gv1",
        "degree_id": "mbbs",
        "exam_or_post_name": "UPSC Combined Medical Services (CMS) Examination",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "Medical Sciences",
          "allowedDegrees": [
            "MBBS"
          ],
          "mandatorySubjects": [
            "General Medicine",
            "Pediatrics",
            "Surgery",
            "OBGYN"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "UPSC annual recruitment for Assistant Divisional Medical Officers (ADMO) in Indian Railways, CGHS, and Municipal Corporations."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "mbbs-gv2",
        "degree_id": "mbbs",
        "exam_or_post_name": "Armed Forces Medical Services (AFMS) - Short Service Commission Officer",
        "conducting_body": "AFMS / Ministry of Defence",
        "eligibility_rule": {
          "degreeFamily": "Medical Sciences",
          "allowedDegrees": [
            "MBBS with permanent registration"
          ],
          "mandatorySubjects": [
            "Clinical Medicine"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 30,
            "sc_st": 30
          },
          "notes": "Commissioned as Captain in the Army Medical Corps (AMC) serving military hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.afms.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "mbbs-sw1",
        "degree_id": "mbbs",
        "target_role": "Digital Health Product Manager & Clinical AI Advisor",
        "pivot_reason": "Translate clinical diagnostic reasoning, electronic medical record (EMR) workflows, and medical safety regulations into clinical AI decision-support algorithms.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Health Informatics & EMR Interoperability (FHIR / HL7 Standards)",
            "type": "course",
            "detail": "Master clinical ontologies (SNOMED-CT, ICD-10), EMR data structures, and FHIR APIs.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Clinical AI Validation & Software as Medical Device (SaMD) Regulations",
            "type": "course",
            "detail": "Learn FDA/CDSCO software validation, sensitivity/specificity clinical metrics, and algorithmic bias.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Clinical Diagnostic AI Protocol Capstone",
            "type": "portfolio",
            "detail": "Deliver clinical evaluation protocol for an AI algorithm triaging chest X-ray pneumothorax in triage.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Clinical Informatics Certificate",
          "SaMD Regulatory Specialist"
        ],
        "why_feasible": "Physicians understand real patient risks, clinical bedside constraints, and medical malpractice laws, making them the ultimate clinical tech navigators.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "mbbs-ent1",
        "degree_id": "mbbs",
        "idea_title": "Multi-Specialty Day-Care PolyClinic & Diagnostics Center",
        "description": "Establish a tech-enabled outpatient primary polyclinic featuring routine consultations, minor surgical procedures, day-care IV therapy, and digital laboratory diagnostics.",
        "first_milestones": [
          "Acquire municipal Clinical Establishments Act license and biomedical waste authorization.",
          "Empanel visiting specialist consultants (cardiology, orthopedics, pediatrics, gynecology).",
          "Onboard 500 family health subscriptions generating recurring outpatient visits."
        ],
        "relevant_schemes": [
          {
            "name": "Clinical Establishments Registration",
            "agency": "Ministry of Health & Family Welfare",
            "benefits": "Statutory recognition and quality standard accreditation.",
            "sourceUrl": "https://clinicalestablishments.gov.in"
          },
          {
            "name": "MUDRA Loan (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for diagnostic and clinic establishment.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "mbbs",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Pre-Clinical Foundations & Dissection Practicals",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master human cadaveric dissection, physiological recordings, and biochemical diagnostic assays.",
              "Pass First Professional MBBS university examinations with high distinctions."
            ],
            "milestone": "First Professional MBBS examination cleared"
          },
          {
            "stepNumber": 2,
            "title": "Para-Clinical Labs & Clinical Ward Postings",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study pathology histology, drug pharmacokinetics, and antimicrobial susceptibility.",
              "Begin daily bedside ward postings: taking patient clinical histories and physical signs."
            ],
            "milestone": "Second Professional MBBS examination cleared with clinical logbook"
          },
          {
            "stepNumber": 3,
            "title": "Final Clinical Postings, NEET-PG Prep & CRMI Internship",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Complete intense clinical rotations across internal medicine, general surgery, pediatrics, and OBGYN.",
              "Complete 12-month Compulsory Rotatory Medical Internship (CRMI) and prepare for NEET-PG / INI-CET."
            ],
            "milestone": "CRMI completion certificate and NMC permanent registration"
          }
        ]
      },
      "completed": {
        "degree_id": "mbbs",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Medical Council Registration & Resident Resume",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent state medical council registration number and medical indemnity insurance.",
              "Review emergency management protocols, ACLS algorithms, and drug dosages."
            ],
            "milestone": "NMC-registered medical practitioner resume"
          },
          {
            "stepNumber": 2,
            "title": "NET-PG Counseling & Residency / MO Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Participate in centralized medical PG counseling or apply for UPSC CMS and hospital MO vacancies.",
              "Complete clinical skills demonstration and panel interviews."
            ],
            "milestone": "Allotment of PG clinical seat or appointment as Medical Officer"
          },
          {
            "stepNumber": 3,
            "title": "Medical Officer / Resident Onboarding & Clinical Mastery",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Assume patient ward and emergency room charge; manage clinical care plans under consultants.",
              "Progress toward specialty board certifications (MD/MS/DNB)."
            ],
            "milestone": "Independent emergency shift management completed"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bds",
    "id": "bds",
    "familyId": "medicine_health",
    "name": "Bachelor of Dental Surgery",
    "shortName": "BDS",
    "aliases": [
      "BDS",
      "B.D.S.",
      "Bachelor of Dental Surgery",
      "Dental graduate",
      "bds"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5 Years (4 Years Academics + 1 Year Internship)",
    "durationYears": 5,
    "regulator": "DCI",
    "overview": "The statutory undergraduate dental program regulated by the Dental Council of India (DCI). It trains dental surgeons in oral anatomy, restorative conservative dentistry, endodontics, prosthodontics, periodontics, oral and maxillofacial surgery, and pediatric dentistry with a mandatory one-year clinical rotatory internship.",
    "key_skills": [
      "Conservative Dental Restorations & Composite Filling Techniques",
      "Root Canal Treatment (RCT) & Rotary Endodontics",
      "Tooth Extractions, Impaction Surgeries & Local Anesthesia Administration",
      "Prosthetic Rehabilitation (Crowns, Bridges, Complete & Removable Dentures)",
      "Periodontal Scaling, Root Planing & Gingival Flap Procedures",
      "Dental Radiology Interpretation (IOPA, OPG, CBCT)"
    ],
    "subjects_taught": [
      "Dental Anatomy, Embryology & Oral Histology",
      "General Human Anatomy & General Human Physiology",
      "General Pathology, Microbiology & Dental Materials",
      "Oral Pathology & Oral Microbiology",
      "Conservative Dentistry & Endodontics",
      "Oral & Maxillofacial Surgery & Local Anesthesia",
      "Prosthodontics, Crown & Bridge",
      "Periodontology, Orthodontics & Pediatric Dentistry"
    ],
    "typical_employers": [
      "Private Dental Clinics & Chains (Clove Dental, Sabka Dentist)",
      "Government Dental Colleges & Civil Hospitals",
      "Armed Forces Dental Corps",
      "Medical Device & Dental Implant Companies (Straumann, Dentsply Sirona)",
      "Public Health Dental Programs"
    ],
    "specializations": [
      {
        "id": "bds-conservative",
        "name": "Conservative Dentistry & Endodontics",
        "aliases": [
          "Endodontics"
        ],
        "skillsGained": [
          "Rotary RCT",
          "Aesthetic Restorations"
        ],
        "typicalRoles": [
          "General Dental Surgeon"
        ]
      },
      {
        "id": "bds-surgery",
        "name": "Oral & Maxillofacial Surgery",
        "aliases": [
          "Oral Surgery"
        ],
        "skillsGained": [
          "Surgical Extractions",
          "Suturing"
        ],
        "typicalRoles": [
          "Junior Dental Surgeon"
        ]
      }
    ],
    "sourceUrl": "https://dciindia.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bds-c1",
        "degree_id": "bds",
        "role_title": "Associate Dental Surgeon",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "DCI registration, rotatory clinical internship, and restorative clinical competencies qualify you for dental clinic chains.",
        "indicative_salary": {
          "min": 3.6,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Dental Practitioners Association Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Root Canal",
          "Composite Restorations",
          "Extractions",
          "Patient Counseling"
        ],
        "top_employers": [
          "Clove Dental",
          "Sabka Dentist",
          "Private Polyclinics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bds-c2",
        "degree_id": "bds",
        "role_title": "Government Dental Surgeon / Medical Officer (Dental)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "Statutory state dental council registration qualifies you for state public service dental hospital vacancies.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Health Commission Level 10 Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Dental Surgeries",
          "OPD Operations",
          "Oral Cancer Screening",
          "Public Dental Health"
        ],
        "top_employers": [
          "State Health Services",
          "ESI Dental Hospitals",
          "District Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bds-c3",
        "degree_id": "bds",
        "role_title": "Consultant Maxillofacial / Implantologist & Practice Owner",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Post-graduate MDS degree, advanced bone grafting, and dental implantology qualifications qualify you to direct high-revenue private implant centers.",
        "indicative_salary": {
          "min": 18.0,
          "max": 45.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Dental Specialists Income Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Full Arch Implants",
          "CBCT Guided Surgery",
          "Aesthetic Veneers",
          "Clinic P&L Management"
        ],
        "top_employers": [
          "Specialty Implant Centers",
          "Private Dental Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bds-hs1",
        "degree_id": "bds",
        "program_name": "Master of Dental Surgery (MDS)",
        "level": "PG",
        "entrance_exams": [
          "NEET-MDS"
        ],
        "eligibility_rule": "BDS degree from a DCI-recognized institution with permanent State Dental Council registration and completion of internship.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "Maulana Azad Institute of Dental Sciences (MAIDS Delhi)",
          "Manipal College of Dental Sciences",
          "King George's Medical University (KGMU)",
          "Govt Dental College Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bds-hs2",
        "degree_id": "bds",
        "program_name": "Fellowship in Oral Implantology / Aesthetic Dentistry",
        "level": "Professional",
        "entrance_exams": [
          "Institutional Entrance / Merit"
        ],
        "eligibility_rule": "BDS degree with clinical experience.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "International Congress of Oral Implantologists (ICOI)",
          "DCI Recognized Dental Colleges"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bds-ct1",
        "degree_id": "bds",
        "cert_name": "Rotary Endodontics & Single-Visit RCT Mastery",
        "provider": "Indian Endodontic Society / Dentsply",
        "domain": "Endodontics",
        "level": "Intermediate",
        "prerequisites": [
          "BDS graduate or intern"
        ],
        "official_url": "https://www.dentsplysirona.com",
        "sourceUrl": "https://www.dentsplysirona.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bds-ct2",
        "degree_id": "bds",
        "cert_name": "Basics of Oral Implantology & CBCT Planning",
        "provider": "Osstem Dental / Nobel Biocare",
        "domain": "Implantology",
        "level": "Intermediate",
        "prerequisites": [
          "BDS degree holder"
        ],
        "official_url": "https://www.nobelbiocare.com",
        "sourceUrl": "https://www.nobelbiocare.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bds-ct3",
        "degree_id": "bds",
        "cert_name": "Clear Aligner & Digital Orthodontic Therapy",
        "provider": "Invisalign / ClearPath",
        "domain": "Orthodontics",
        "level": "Beginner",
        "prerequisites": [
          "Dental license holder"
        ],
        "official_url": "https://www.invisalign.com",
        "sourceUrl": "https://www.invisalign.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bds-gv1",
        "degree_id": "bds",
        "exam_or_post_name": "State PSC Dental Surgeon Examination",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Dental Surgery",
          "allowedDegrees": [
            "BDS with State Dental Council Registration"
          ],
          "mandatorySubjects": [
            "Dental Surgery",
            "Oral Pathology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State civil medical recruitment for permanent Dental Surgeon posts in government hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bds-gv2",
        "degree_id": "bds",
        "exam_or_post_name": "Army Dental Corps (AD Corps) - Short Service Commission",
        "conducting_body": "Indian Army / Armed Forces Medical Services",
        "eligibility_rule": {
          "degreeFamily": "Dental Surgery",
          "allowedDegrees": [
            "BDS with minimum 55% marks + NEET-MDS score"
          ],
          "mandatorySubjects": [
            "Clinical Dentistry"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 45,
            "obc": 45,
            "sc_st": 45
          },
          "notes": "Commissioned as Captain in the Army Dental Corps serving military personnel."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.joinindianarmy.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bds-sw1",
        "degree_id": "bds",
        "target_role": "Dental CAD/CAM Digital Design & Clear Aligner Specialist",
        "pivot_reason": "Apply occlusal biomechanics, dental anatomy, and smile aesthetics to designing digital clear aligners and 3D printed crown/bridge restorations.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Dental CAD Software Mastery (3Shape / exocad)",
            "type": "course",
            "detail": "Master digital margin line tracing, virtual teeth wax-up, and crown/bridge design.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Digital Clear Aligner Staging & Orthodontic Biomechanics",
            "type": "course",
            "detail": "Plan tooth movements, attachment placements, and IPR staging protocols.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Full-Mouth Digital Smile Design Capstone",
            "type": "portfolio",
            "detail": "Deliver complete 3D printable aligner treatment plan and crown CAD design from patient intraoral scans.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified 3Shape CAD Designer",
          "Clear Aligner Treatment Planner"
        ],
        "why_feasible": "Dentists possess the biological understanding of bone biology, tooth roots, and occlusion that digital technicians lack.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bds-ent1",
        "degree_id": "bds",
        "idea_title": "Modern Digital Dental Clinic & Aesthetic Studio",
        "description": "Establish a clean, digital dental practice equipped with an intraoral scanner, digital RVG sensor, and rotary endodontics engine.",
        "first_milestones": [
          "Acquire dental chair, autoclave, RVG X-ray, and rotary motor under equipment financing.",
          "Register practice with State Dental Council and local municipal health authorities.",
          "Launch community oral health camp to build initial 200 patient treatment cards."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on dental clinic equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for setting up professional medical clinics.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bds",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Pre-Clinical Tooth Carving & Anatomy",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master wax carving of dental crowns, plaster teeth models, and dental material setting times.",
              "Pass First Professional BDS university practicals in dental anatomy and physiology."
            ],
            "milestone": "Dental carving and histology record verified"
          },
          {
            "stepNumber": 2,
            "title": "Pre-Clinical Prosthetics & Phantom Head Operative",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Perform cavity preparations on phantom head typodont jaws and complete complete-denture fabrication.",
              "Learn pathological lesion identification and oral microbiology."
            ],
            "milestone": "Phantom head operative and prosthetics test cleared"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Postings & Rotatory Internship",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Execute tooth restorations, scaling, simple extractions, and complete dentures on live clinical patients.",
              "Complete 12-month rotatory dental internship and prepare for NEET-MDS."
            ],
            "milestone": "Rotatory internship certificate and State Dental Council registration"
          }
        ]
      },
      "completed": {
        "degree_id": "bds",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Dental Council Registration & Clinical Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent state dental council registration and clinical indemnity policy.",
              "Document portfolio of completed endodontic, restorative, and prosthodontic cases."
            ],
            "milestone": "Registered dental surgeon professional resume"
          },
          {
            "stepNumber": 2,
            "title": "Clinic Associate Hiring & NEET-MDS Counseling",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for associate dentist positions in corporate dental chains and private polyclinics.",
              "Participate in NEET-MDS counseling for post-graduate dental specialty seats."
            ],
            "milestone": "Employment offer secured as Associate Dental Surgeon"
          },
          {
            "stepNumber": 3,
            "title": "Independent Dental Practice & Specialty Growth",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage patient caseload, perform single-visit RCTs, and supervise clinic sterilization.",
              "Pursue implantology fellowship or establish independent private practice."
            ],
            "milestone": "Successfully performed over 100 independent dental procedures"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bpharm",
    "id": "bpharm",
    "familyId": "medicine_health",
    "name": "Bachelor of Pharmacy",
    "shortName": "B.Pharm",
    "aliases": [
      "BPharm",
      "B.Pharmacy",
      "Bachelor of Pharmacy",
      "Pharmacy graduate",
      "bpharm"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "PCI",
    "overview": "A professional pharmaceutical science degree regulated by the Pharmacy Council of India (PCI). It covers pharmaceutics, medicinal chemistry, pharmacology, pharmacognosy, pharmaceutical analysis, and regulatory affairs. It prepares registered pharmacists, formulation scientists, drug inspectors, and quality assurance associates.",
    "key_skills": [
      "Pharmaceutical Formulation Design (Tablets, Capsules, Injectables)",
      "Drug Assay & Instrumental Quality Control (HPLC, UV-Vis, Dissolution)",
      "Pharmacology, Mechanism of Drug Action & Toxicology Screening",
      "Medicinal Chemistry & Structure-Activity Relationship (SAR)",
      "Regulatory Affairs, Pharmacopeial Standards (IP, BP, USP) & cGMP",
      "Clinical Pharmacy, Adverse Drug Reaction (ADR) Monitoring & Dispensing"
    ],
    "subjects_taught": [
      "Pharmaceutics & Industrial Pharmacy",
      "Pharmaceutical Chemistry & Medicinal Chemistry",
      "Pharmacology & Pharmacotherapeutics",
      "Pharmacognosy & Phytochemistry",
      "Pharmaceutical Analysis & Quality Assurance",
      "Pharmacy Practice, Jurisprudence & Regulatory Science",
      "Novel Drug Delivery Systems (NDDS) & Biopharmaceutics"
    ],
    "typical_employers": [
      "Sun Pharmaceutical Industries",
      "Dr. Reddy's Laboratories",
      "Cipla",
      "Lupin",
      "Zydus Lifesciences",
      "State Drugs Control Departments",
      "Hospital Pharmacy Departments (Apollo, Max)"
    ],
    "specializations": [
      {
        "id": "bpharm-formulation",
        "name": "Formulation & Industrial Pharmaceutics",
        "aliases": [
          "Formulation R&D"
        ],
        "skillsGained": [
          "Granulation",
          "Tablet Coating"
        ],
        "typicalRoles": [
          "Formulation Scientist Trainee"
        ]
      },
      {
        "id": "bpharm-regulatory",
        "name": "Regulatory Affairs & Pharmacovigilance",
        "aliases": [
          "Pharma Regulatory"
        ],
        "skillsGained": [
          "DMF Filing",
          "Safety Narratives"
        ],
        "typicalRoles": [
          "Drug Safety Associate"
        ]
      }
    ],
    "sourceUrl": "https://www.pci.nic.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bph-c1",
        "degree_id": "bpharm",
        "role_title": "Quality Assurance (QA) / QC Analyst",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Pharmacopeial monograph analysis, dissolution testing, and cGMP documentation coursework directly qualify you for pharmaceutical manufacturing plants.",
        "indicative_salary": {
          "min": 3.6,
          "max": 6.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Pharma Quality Personnel Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "HPLC",
          "Dissolution Testing",
          "cGMP",
          "SOP Writing"
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
        "id": "bph-c2",
        "degree_id": "bpharm",
        "role_title": "Drug Safety / Pharmacovigilance Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Pharmacology mechanisms, adverse drug reaction monitoring, and MedDRA coding prepare you for clinical safety desks.",
        "indicative_salary": {
          "min": 4.0,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharmacovigilance Industry Salary Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Pharmacovigilance",
          "ICSR Processing",
          "MedDRA",
          "Regulatory Submissions"
        ],
        "top_employers": [
          "IQVIA",
          "Cognizant Life Sciences",
          "Novartis",
          "Parexel"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bph-c3",
        "degree_id": "bpharm",
        "role_title": "Vice President of Global Regulatory Affairs & Formulation R&D",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Managing international US-FDA Abbreviated New Drug Applications (ANDA), European dossiers, and clinical bioequivalence qualifies you for C-suite pharmaceutical leadership.",
        "indicative_salary": {
          "min": 20.0,
          "max": 50.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Pharma R&D Leadership Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "ANDA Filings",
          "Global Regulatory Strategy",
          "FDA Inspection Audits",
          "Portfolio P&L"
        ],
        "top_employers": [
          "Dr. Reddy's",
          "Zydus",
          "Sun Pharma",
          "Biocon"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bph-hs1",
        "degree_id": "bpharm",
        "program_name": "Master of Pharmacy (M.Pharm in Pharmaceutics / Pharmacology)",
        "level": "PG",
        "entrance_exams": [
          "GPAT",
          "NIPER JEE"
        ],
        "eligibility_rule": "B.Pharm degree from a PCI-approved institution with minimum 55% aggregate marks; GPAT is the statutory entrance test for M.Pharm.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "National Institute of Pharmaceutical Education and Research (NIPER Mohali/Hyderabad)",
          "ICT Mumbai",
          "BITS Pilani",
          "Jamia Hamdard"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bph-hs2",
        "degree_id": "bpharm",
        "program_name": "MBA in Pharmaceutical Management",
        "level": "PG",
        "entrance_exams": [
          "CAT",
          "CMAT",
          "NMAT"
        ],
        "eligibility_rule": "Bachelor's in Pharmacy or Science; note GPAT is for M.Pharm, while CAT/CMAT are for MBA in Pharma.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "NIPER (MBA Pharma)",
          "NMIMS Mumbai (Pharma Tech)",
          "IIHMR Jaipur",
          "Jamia Hamdard"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bph-ct1",
        "degree_id": "bpharm",
        "cert_name": "Certified Pharmacovigilance Professional (CPVP)",
        "provider": "Clinical Research Society / Coursera",
        "domain": "Pharmacovigilance",
        "level": "Intermediate",
        "prerequisites": [
          "Pharmacy or life sciences graduate"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bph-ct2",
        "degree_id": "bpharm",
        "cert_name": "Regulatory Affairs & eCTD Dossier Submission",
        "provider": "DIA (Drug Information Association)",
        "domain": "Regulatory Science",
        "level": "Intermediate",
        "prerequisites": [
          "B.Pharm or M.Pharm"
        ],
        "official_url": "https://www.diaglobal.org",
        "sourceUrl": "https://www.diaglobal.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bph-ct3",
        "degree_id": "bpharm",
        "cert_name": "Good Manufacturing Practices (cGMP) for Finished Pharmaceuticals",
        "provider": "ISPE / Quality Council of India",
        "domain": "Quality Systems",
        "level": "Beginner",
        "prerequisites": [
          "Pharmacy student or professional"
        ],
        "official_url": "https://ispe.org",
        "sourceUrl": "https://ispe.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bph-gv1",
        "degree_id": "bpharm",
        "exam_or_post_name": "Drug Inspector / Assistant Drugs Controller",
        "conducting_body": "UPSC / State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Pharmacy",
          "allowedDegrees": [
            "B.Pharm with 18 months manufacturing/testing experience in Schedule C/C1 drugs"
          ],
          "mandatorySubjects": [
            "Pharmaceutical Chemistry",
            "Pharmacology",
            "Drug Jurisprudence"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Statutory regulatory officers enforcing the Drugs and Cosmetics Act 1940 across India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bph-gv2",
        "degree_id": "bpharm",
        "exam_or_post_name": "Government Pharmacist - Railways / ESIC / CGHS",
        "conducting_body": "Railway Recruitment Board (RRB) / ESIC",
        "eligibility_rule": {
          "degreeFamily": "Pharmacy",
          "allowedDegrees": [
            "Diploma in Pharmacy / B.Pharm + Registered Pharmacist with State Pharmacy Council"
          ],
          "mandatorySubjects": [
            "Pharmacy Practice"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Central government healthcare pharmacist positions dispensing and managing hospital drug stores."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.rrbcdg.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bph-sw1",
        "degree_id": "bpharm",
        "target_role": "Pharmaceutical Medical Science Liaison (MSL)",
        "pivot_reason": "Combine deep pharmacological understanding of drug action, receptor targets, and clinical trial results to interface with key opinion leader (KOL) physicians.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Clinical Trial Protocol Design & Clinical Biostatistics",
            "type": "course",
            "detail": "Master clinical trial phases, primary/secondary endpoints, and statistical significance interpretation.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Scientific Presentation & KOL Relationship Management",
            "type": "course",
            "detail": "Deliver complex pharmacological data presentations to specialist physicians and hospital boards.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Oncology / Immunology Drug Monograph Capstone",
            "type": "portfolio",
            "detail": "Author an evidence-based clinical dossier comparing a new biologic against current standard of care.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Board Certified Medical Affairs Specialist (BCMAS)",
          "Medical Writing Certificate"
        ],
        "why_feasible": "Pharmacists know drug interactions, receptor pharmacodynamics, and pharmacokinetics better than general science graduates.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bph-ent1",
        "degree_id": "bpharm",
        "idea_title": "Digital Retail Pharmacy & Surgical Supplies Distribution Enterprise",
        "description": "Establish a licensed community pharmacy with automated prescription refills, temperature-controlled cold-chain insulin storage, and home delivery.",
        "first_milestones": [
          "Obtain Retail Drug License (Form 20/21) from State Drugs Control Administration.",
          "Establish direct wholesale distributorship with 10 leading pharmaceutical manufacturers.",
          "Build a community client base of 300 chronic medication subscribers."
        ],
        "relevant_schemes": [
          {
            "name": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
            "agency": "Pharmaceuticals & Medical Devices Bureau of India (PMBI)",
            "benefits": "Financial incentives up to 5 Lakhs for opening Jan Aushadhi Kendra retail stores.",
            "sourceUrl": "https://janaushadhi.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Subsidy up to 35% on pharmacy fixtures, refrigerators, and inventory systems.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bpharm",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Pharmaceutics, Organic Chemistry & Wet Lab Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master pharmaceutical calculations, dispensing solutions, synthesis of simple organic drugs, and titrations.",
              "Perform lab assays and maintain official laboratory notebooks."
            ],
            "milestone": "Passed 1st year university pharmaceutical chemistry practicals"
          },
          {
            "stepNumber": 2,
            "title": "Pharmacology, Instrumental Analysis & Industrial Training",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study drug action mechanisms, HPLC chromatography, and tablet dissolution profiles.",
              "Complete mandatory 1-month industrial training in a pharmaceutical manufacturing unit."
            ],
            "milestone": "Industrial training completion certificate from GMP manufacturing plant"
          },
          {
            "stepNumber": 3,
            "title": "GPAT Examination Preparation & Capstone Project",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Rigorously prepare for GPAT (Graduate Pharmacy Aptitude Test) for M.Pharm admissions.",
              "Execute final-year experimental project on novel drug formulation or analytical method validation."
            ],
            "milestone": "GPAT qualification & published capstone dissertation"
          }
        ]
      },
      "completed": {
        "degree_id": "bpharm",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "State Pharmacy Council Registration & Resume Polish",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Register as Registered Pharmacist with State Pharmacy Council and receive license certificate.",
              "Compile technical proficiencies in HPLC, dissolution, pharmacovigilance, and cGMP."
            ],
            "milestone": "Registered Pharmacist professional resume"
          },
          {
            "stepNumber": 2,
            "title": "Pharmaceutical Campus Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for QA/QC, formulation R&D, and pharmacovigilance trainee positions.",
              "Demonstrate chromatography calculations and drug stability testing in interviews."
            ],
            "milestone": "Job offer secured from leading pharmaceutical corporation"
          },
          {
            "stepNumber": 3,
            "title": "Pharma Officer Onboarding & Career Specialization",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join industrial formulation plant or safety desk; complete cGMP validation modules.",
              "Pursue M.Pharm through GPAT or specialize in global regulatory affairs."
            ],
            "milestone": "Independent sign-off on analytical batch release records"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bsc-nursing",
    "id": "bsc-nursing",
    "familyId": "medicine_health",
    "name": "Bachelor of Science in Nursing",
    "shortName": "B.Sc Nursing",
    "aliases": [
      "BSc Nursing",
      "B.Sc. Nursing",
      "Nursing graduate",
      "Registered Nurse",
      "bsc-nursing"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "4 Years (8 Semesters)",
    "durationYears": 4,
    "regulator": "INC",
    "overview": "A professional nursing and patient-care degree governed by the Indian Nursing Council (INC). It equips students with comprehensive clinical competencies in medical-surgical nursing, critical care, maternal and child healthcare, community health, and pharmacology with mandatory intensive bedside clinical rotations.",
    "key_skills": [
      "Intensive Critical Care & Hemodynamic Patient Monitoring",
      "Safe Medication Administration (IV / IM / Subcutaneous) & Infusion Titration",
      "Infection Control, Sterile Wound Dressing & Aseptic Techniques",
      "Maternal-Child Health Nursing & Labor Room Management",
      "Emergency Resuscitation (BLS / ACLS) & Patient Triage",
      "Nursing Care Plan Documentation & Electronic Health Record (EHR) Logging"
    ],
    "subjects_taught": [
      "Applied Anatomy, Physiology & Biochemistry",
      "Nursing Foundations & Patient Care Techniques",
      "Applied Microbiology & Infection Control",
      "Pharmacology, Pathology & Genetics for Nurses",
      "Medical-Surgical Nursing (Adult & Geriatric Care)",
      "Child Health Nursing (Pediatrics) & Mental Health Nursing",
      "Midwifery and Obstetrical Nursing",
      "Community Health Nursing & Healthcare Management"
    ],
    "typical_employers": [
      "AIIMS & Central Government Hospitals",
      "Apollo Hospitals Group",
      "Fortis Healthcare",
      "Max Healthcare",
      "National Health Mission (NHM)",
      "NHS Hospitals (United Kingdom)",
      "International Healthcare Systems (US, Canada, Gulf)"
    ],
    "specializations": [
      {
        "id": "nursing-critical",
        "name": "Critical Care & ICU Nursing",
        "aliases": [
          "ICU Nursing"
        ],
        "skillsGained": [
          "Ventilator Management",
          "Arterial Lines"
        ],
        "typicalRoles": [
          "Critical Care Staff Nurse"
        ]
      },
      {
        "id": "nursing-ot",
        "name": "Operation Theatre & Surgical Nursing",
        "aliases": [
          "OT Nursing"
        ],
        "skillsGained": [
          "Scrub Technique",
          "Surgical Assisting"
        ],
        "typicalRoles": [
          "OT Staff Nurse"
        ]
      }
    ],
    "sourceUrl": "https://www.indiannursingcouncil.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "nur-c1",
        "degree_id": "bsc-nursing",
        "role_title": "Nursing Officer / Staff Nurse (Level 7)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "INC registration as Registered Nurse & Registered Midwife (RN & RM) directly qualifies you for central government hospital vacancies.",
        "indicative_salary": {
          "min": 8.5,
          "max": 15.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Central Government 7th CPC (Level 7 + Allowances) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Patient Assessment",
          "Medication Admin",
          "ICU Protocol",
          "Nursing Records"
        ],
        "top_employers": [
          "AIIMS",
          "Safdarjung Hospital",
          "Railway Hospitals",
          "JIPMER"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "nur-c2",
        "degree_id": "bsc-nursing",
        "role_title": "Critical Care & Emergency Staff Nurse",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "Ventilator monitoring, IV infusions, and sterile clinical techniques map directly into multi-specialty corporate ICUs.",
        "indicative_salary": {
          "min": 4.0,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Private Hospital Nursing Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Ventilator Monitoring",
          "Emergency Resuscitation",
          "Infusion Pumps",
          "NABH"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Max Healthcare",
          "Medanta",
          "Fortis"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "nur-c3",
        "degree_id": "bsc-nursing",
        "role_title": "Chief Nursing Officer (CNO) / Director of Nursing Services",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Decades of managing hospital nursing departments, NABH/JCI clinical quality standards, and hundreds of nursing staff qualify you for CNO leadership.",
        "indicative_salary": {
          "min": 16.0,
          "max": 35.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Chief Nursing Officer Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Nursing Administration",
          "JCI Accreditations",
          "Clinical Staffing Ratios",
          "Patient Safety Policy"
        ],
        "top_employers": [
          "Apollo Hospitals Group",
          "Manipal Hospitals",
          "Max Healthcare"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "nur-hs1",
        "degree_id": "bsc-nursing",
        "program_name": "M.Sc in Nursing (Critical Care / Community Health / OBGYN)",
        "level": "PG",
        "entrance_exams": [
          "AIIMS M.Sc Nursing Entrance",
          "State PG Nursing CET"
        ],
        "eligibility_rule": "B.Sc Nursing with minimum 55% aggregate marks and minimum 1 year of clinical work experience.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "AIIMS New Delhi",
          "CMC Vellore",
          "PGIMER Chandigarh",
          "NIMHANS Bengaluru"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "nur-hs2",
        "degree_id": "bsc-nursing",
        "program_name": "Registered Nurse Licensure Abroad (NCLEX-RN / OET)",
        "level": "Professional",
        "entrance_exams": [
          "NCLEX-RN (USA/Canada)",
          "NMC UK CBT/OSCE"
        ],
        "eligibility_rule": "B.Sc Nursing degree and state nursing council registration; passing English language proficiency (IELTS/OET).",
        "typical_duration": "International Licensure",
        "top_institutes": [
          "US State Nursing Boards",
          "Nursing and Midwifery Council (NMC UK)",
          "AHPRA Australia"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "nur-ct1",
        "degree_id": "bsc-nursing",
        "cert_name": "Basic & Advanced Cardiac Life Support (BLS & ACLS Provider)",
        "provider": "American Heart Association (AHA)",
        "domain": "Emergency Resuscitation",
        "level": "Beginner",
        "prerequisites": [
          "Nursing student or registered nurse"
        ],
        "official_url": "https://cpr.heart.org",
        "sourceUrl": "https://cpr.heart.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "nur-ct2",
        "degree_id": "bsc-nursing",
        "cert_name": "Infection Prevention & Control in Healthcare",
        "provider": "World Health Organization (WHO) / Coursera",
        "domain": "Infection Control",
        "level": "Beginner",
        "prerequisites": [
          "Healthcare background"
        ],
        "official_url": "https://www.who.int",
        "sourceUrl": "https://www.who.int",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "nur-ct3",
        "degree_id": "bsc-nursing",
        "cert_name": "Certified Critical Care Registered Nurse (CCRN)",
        "provider": "AACN",
        "domain": "Critical Care",
        "level": "Advanced",
        "prerequisites": [
          "RN license + clinical ICU hours"
        ],
        "official_url": "https://www.aacn.org",
        "sourceUrl": "https://www.aacn.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "nur-gv1",
        "degree_id": "bsc-nursing",
        "exam_or_post_name": "NORCET (Nursing Officer Recruitment Common Eligibility Test)",
        "conducting_body": "AIIMS New Delhi",
        "eligibility_rule": {
          "degreeFamily": "Nursing",
          "allowedDegrees": [
            "B.Sc (Hons) Nursing / B.Sc Nursing from INC-recognized institute"
          ],
          "mandatorySubjects": [
            "Nursing Science",
            "Clinical Skills"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Centralized national examination recruiting Nursing Officers across all AIIMS institutions in India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://norcet.aiimsexams.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "nur-gv2",
        "degree_id": "bsc-nursing",
        "exam_or_post_name": "Military Nursing Service (MNS) - Short Service Commission Officer",
        "conducting_body": "Armed Forces Medical Services",
        "eligibility_rule": {
          "degreeFamily": "Nursing",
          "allowedDegrees": [
            "B.Sc Nursing + Registered Nurse"
          ],
          "mandatorySubjects": [
            "Nursing Science"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 35,
            "sc_st": 35
          },
          "notes": "Commissioned as Lieutenant in the Indian Military Nursing Service."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.joinindianarmy.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "nur-sw1",
        "degree_id": "bsc-nursing",
        "target_role": "Clinical Documentation Specialist & Medical Auditor",
        "pivot_reason": "Translate clinical nursing notes, chart audits, and diagnostic terminology into hospital insurance claims review and medical coding.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Certified Inpatient Coder (CIC) & ICD-10-CM / PCS",
            "type": "course",
            "detail": "Master inpatient diagnostic coding, surgical procedure codes, and DRG assignment.",
            "estimatedMonths": 3
          },
          {
            "step": 2,
            "title": "Clinical Documentation Improvement (CDI) Protocols",
            "type": "course",
            "detail": "Identify chart ambiguities, physician query protocols, and denial reduction.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Hospital Medical Chart Audit Capstone",
            "type": "portfolio",
            "detail": "Conduct full revenue cycle and clinical documentation audit on 100 inpatient surgical records.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "7 Months",
        "recommended_certs": [
          "Certified Documentation Improvement Practitioner (CDIP)",
          "AAPC Certified Inpatient Coder"
        ],
        "why_feasible": "Nurses review clinical charts daily and intuitively spot missing diagnoses that non-clinical coders overlook.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bsc-nur-ent1",
        "degree_id": "bsc-nursing",
        "idea_title": "Home Healthcare & Post-Operative Nursing Agency",
        "description": "Provide trained home nursing care, geriatric assisted living support, tracheostomy care, and post-discharge rehabilitation services.",
        "first_milestones": [
          "Empanel 10 certified registered nurses and nursing assistants.",
          "Partner with discharge coordinators at 3 regional tertiary hospitals.",
          "Deliver personalized clinical care plans for 30 monthly homebound patients."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Healthcare startup recognition and tax incentives.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "Stand Up India Scheme",
            "agency": "SIDBI",
            "benefits": "Loans between 10 Lakhs and 1 Crore for healthcare service setups.",
            "sourceUrl": "https://www.standupmitra.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bsc-nursing",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Foundations & Nursing Lab Skills",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master vital signs, bed-making, catheterization, intramuscular injections, and patient communication.",
              "Complete foundation nursing practical assessments on medical mannequins."
            ],
            "milestone": "Cleared 1st year clinical foundation OSCE tests"
          },
          {
            "stepNumber": 2,
            "title": "Medical-Surgical Postings & Ward Care",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Handle bedside patient care plans, wound dressings, IV canulation, and medication administration.",
              "Complete clinical postings in general medical, surgical, and pediatric wards."
            ],
            "milestone": "Ward posting clinical assessment logbook verified"
          },
          {
            "stepNumber": 3,
            "title": "Critical Care, Midwifery & Community Health",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Conduct safe deliveries in labor room rotations and manage ICU ventilator monitoring.",
              "Complete rural community health nursing survey and home visits."
            ],
            "milestone": "Midwifery casebook completed and verified by nursing superintendent"
          }
        ]
      },
      "completed": {
        "degree_id": "bsc-nursing",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "State Nursing Council Registration & NCLEX/NORCET Prep",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Obtain permanent Registered Nurse & Registered Midwife (RN & RM) registration.",
              "Prepare for AIIMS NORCET entrance exam or international licensing (NCLEX-RN)."
            ],
            "milestone": "RN & RM registration certificate and test preparation complete"
          },
          {
            "stepNumber": 2,
            "title": "Hospital Recruitment Drives & NORCET Ranking",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for nursing officer positions across AIIMS, central hospitals, and corporate hospital networks.",
              "Demonstrate emergency resuscitation and medication safety during clinical interviews."
            ],
            "milestone": "Appointment letter secured as Nursing Officer"
          },
          {
            "stepNumber": 3,
            "title": "Staff Nurse Onboarding & Advanced Critical Care Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join critical care unit or general medical ward; manage independent patient assignments.",
              "Pursue M.Sc Nursing or international placement via NCLEX-RN."
            ],
            "milestone": "Completed first year of hospital service with clinical excellence"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bpt",
    "id": "bpt",
    "familyId": "medicine_health",
    "name": "Bachelor of Physiotherapy",
    "shortName": "BPT",
    "aliases": [
      "BPT",
      "B.P.T.",
      "Bachelor of Physical Therapy",
      "Physiotherapy graduate",
      "bpt"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "4.5 Years (4 Years Academics + 6 Months Internship)",
    "durationYears": 4.5,
    "regulator": "UGC",
    "overview": "A comprehensive healthcare program in physical therapy, biomechanics, exercise therapy, electrotherapy, orthopedics, neurology, and cardiopulmonary rehabilitation. It equips students to evaluate musculoskeletal and neurological movement dysfunction, restore mobility, and manage sports injuries.",
    "key_skills": [
      "Manual Therapy Techniques (Mulligan, Maitland Joint Mobilization)",
      "Electrotherapeutic Modalities (IFT, TENS, Ultrasound, Laser Therapy)",
      "Neurological Rehabilitation (Bobath, PNF, Stroke Gait Training)",
      "Musculoskeletal Assessment & Postural Correction Exercises",
      "Cardiopulmonary Chest Physiotherapy & Post-Surgical Mobilization",
      "Sports Injury Rehabilitation & Functional Taping (Kinesio Taping)"
    ],
    "subjects_taught": [
      "Human Anatomy, Physiology & Biochemistry",
      "Biomechanics & Kinesiology of Human Movement",
      "Exercise Therapy & Electrotherapy (Theory & Practicals)",
      "General Medicine, General Surgery & Pharmacology",
      "Orthopedics & Traumatology Physiotherapy",
      "Neurology & Neurosurgery Physiotherapy",
      "Cardiorespiratory Physiotherapy & ICU Rehabilitation",
      "Compulsory 6-Month Rotatory Clinical Internship"
    ],
    "typical_employers": [
      "Multi-Specialty Private Hospitals (Apollo, Fortis, Max)",
      "Orthopedic & Joint Replacement Centers",
      "Sports Rehabilitation Centers & National Sports Teams",
      "Neurological Rehabilitation Institutes",
      "Private Physiotherapy Clinics",
      "Armed Forces Rehabilitation Centres"
    ],
    "specializations": [
      {
        "id": "bpt-ortho",
        "name": "Orthopedic & Sports Physiotherapy",
        "aliases": [
          "Sports Physio"
        ],
        "skillsGained": [
          "Joint Mobilization",
          "Kinesio Taping"
        ],
        "typicalRoles": [
          "Sports Physiotherapist"
        ]
      },
      {
        "id": "bpt-neuro",
        "name": "Neurological Rehabilitation",
        "aliases": [
          "Neuro Physio"
        ],
        "skillsGained": [
          "Stroke Rehab",
          "Balance Training"
        ],
        "typicalRoles": [
          "Neuro Physiotherapist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bpt-c1",
        "degree_id": "bpt",
        "role_title": "Consultant Physiotherapist / Clinical Specialist",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Comprehensive training in manual mobilization, electrotherapy, and exercise prescription qualifies you directly for hospital OPDs.",
        "indicative_salary": {
          "min": 3.6,
          "max": 7.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Association of Physiotherapists Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Manual Therapy",
          "Electrotherapy",
          "Exercise Prescription",
          "Pain Management"
        ],
        "top_employers": [
          "Apollo Hospitals",
          "Max Healthcare",
          "Fortis",
          "Private Clinics"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpt-c2",
        "degree_id": "bpt",
        "role_title": "Sports Team Physiotherapist / Athletic Rehabilitation Lead",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Sports biomechanics, functional kinetic chain assessment, and acute injury management prepare you for elite sports leagues.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Sports Medicine Industry Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Sports Taping",
          "ACL Rehab",
          "Return to Play Protocols",
          "Cryotherapy"
        ],
        "top_employers": [
          "BCCI / IPL Teams",
          "ISL Football Clubs",
          "Jindal Sports Institute"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpt-c3",
        "degree_id": "bpt",
        "role_title": "Head of Rehabilitation Services / Director of Physiotherapy",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Holding an MPT qualification and leading hospital rehabilitation departments, robotic gait clinics, and multi-disciplinary teams qualifies you for department directorship.",
        "indicative_salary": {
          "min": 16.0,
          "max": 36.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Physiotherapy Leadership Compensation Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Robotic Rehabilitation",
          "Clinical Protocols",
          "Department P&L",
          "Staff Mentoring"
        ],
        "top_employers": [
          "Medanta The Medicity",
          "Kokilaben Hospital",
          "Manipal Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bpt-hs1",
        "degree_id": "bpt",
        "program_name": "Master of Physiotherapy (MPT in Orthopedics / Neurology / Sports / Cardiopulmonary)",
        "level": "PG",
        "entrance_exams": [
          "State PG Physiotherapy CET",
          "Institutional Entrance Tests"
        ],
        "eligibility_rule": "Bachelor of Physiotherapy (BPT) with minimum 50% aggregate marks and completion of 6 months compulsory rotatory internship; MPT strictly requires a BPT degree.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "All India Institute of Physical Medicine and Rehabilitation (AIIPMR Mumbai)",
          "Manipal College of Health Professions",
          "Jamia Hamdard Delhi",
          "KEM Hospital Mumbai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpt-hs2",
        "degree_id": "bpt",
        "program_name": "Master of Science in Sports Medicine / Kinesiology (Global)",
        "level": "PG",
        "entrance_exams": [
          "International University Applications"
        ],
        "eligibility_rule": "Bachelor of Physiotherapy degree with clinical internship.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "University of Melbourne",
          "Loughborough University (UK)",
          "University of Sydney"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bpt-ct1",
        "degree_id": "bpt",
        "cert_name": "Certified Dry Needling Practitioner (CDNP)",
        "provider": "Dry Needling Institute / David G. Simons Academy",
        "domain": "Myofascial Therapy",
        "level": "Intermediate",
        "prerequisites": [
          "BPT degree or final year intern"
        ],
        "official_url": "https://www.myopainseminars.com",
        "sourceUrl": "https://www.myopainseminars.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bpt-ct2",
        "degree_id": "bpt",
        "cert_name": "Certified Mulligan Practitioner (CMP - Manual Therapy)",
        "provider": "Mulligan Concept Teachers Association",
        "domain": "Manual Therapy",
        "level": "Advanced",
        "prerequisites": [
          "BPT degree holder"
        ],
        "official_url": "https://bmulligan.com",
        "sourceUrl": "https://bmulligan.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bpt-ct3",
        "degree_id": "bpt",
        "cert_name": "Certified Kinesio Taping Practitioner (CKTP)",
        "provider": "Kinesio Taping Association International",
        "domain": "Sports Medicine",
        "level": "Intermediate",
        "prerequisites": [
          "Physiotherapy student or professional"
        ],
        "official_url": "https://kinesiotaping.com",
        "sourceUrl": "https://kinesiotaping.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bpt-gv1",
        "degree_id": "bpt",
        "exam_or_post_name": "Physiotherapist - Central Government Hospitals / ESIC / Railways",
        "conducting_body": "UPSC / RRB / ESIC",
        "eligibility_rule": {
          "degreeFamily": "Physiotherapy",
          "allowedDegrees": [
            "BPT with recognized internship"
          ],
          "mandatorySubjects": [
            "Physiotherapy in Orthopedics",
            "Neurology",
            "Cardiorespiratory"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Central government recruitment for permanent Physiotherapists in central health schemes and railway hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bpt-gv2",
        "degree_id": "bpt",
        "exam_or_post_name": "Physiotherapist - Armed Forces Artificial Limb Centre (ALC)",
        "conducting_body": "Ministry of Defence",
        "eligibility_rule": {
          "degreeFamily": "Physiotherapy / Prosthetics",
          "allowedDegrees": [
            "BPT"
          ],
          "mandatorySubjects": [
            "Rehabilitation Physiotherapy"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Rehabilitation specialist serving wounded military personnel at Artificial Limb Centre Pune."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.mod.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bpt-sw1",
        "degree_id": "bpt",
        "target_role": "Clinical Biomechanics & Motion Capture (MoCap) Specialist",
        "pivot_reason": "Translate anatomical movement kinematics, muscle firing patterns, and gait analysis into high-tech 3D optical motion capture laboratories.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "3D Motion Capture & Force Plate Biomechanical Analysis",
            "type": "course",
            "detail": "Master Vicon optical systems, inverse dynamics, and joint moment calculations.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Electromyography (EMG) Signal Analysis in MATLAB/Python",
            "type": "course",
            "detail": "Process surface EMG signals, muscle activation timings, and fatigue indices.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Clinical Gait Analysis Lab Report Capstone",
            "type": "portfolio",
            "detail": "Conduct full 3D lower-limb kinematic and kinetic gait evaluation for a cerebral palsy patient.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Clinical Gait Analysis Specialist",
          "Biomechanical Assessment Certificate"
        ],
        "why_feasible": "Physiotherapists understand joint angles, moments, and functional anatomy far deeper than pure software programmers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bpt-ent1",
        "degree_id": "bpt",
        "idea_title": "Advanced Spine, Sports & Pain Rehabilitation Studio",
        "description": "Establish a specialized private clinic offering computerized spinal decompression, cryotherapy, dry needling, and sports performance training.",
        "first_milestones": [
          "Acquire laser therapy unit, combo electrotherapy machine, traction table, and rehabilitation gym gear.",
          "Empanel with regional orthopedic and neurosurgeons for post-operative patient referrals.",
          "Achieve a steady daily patient caseload of 25 treatment sessions within 6 months."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on electrotherapy and clinical rehabilitation equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for setting up private physiotherapy clinics.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bpt",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Biomechanics & Electrotherapy Foundations",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master bones, joint axes, muscle origins/insertions, and electrical physics.",
              "Practice manual muscle testing (MMT) and goniometric joint range-of-motion assessments."
            ],
            "milestone": "Anatomical palpation and goniometry record verified"
          },
          {
            "stepNumber": 2,
            "title": "Exercise Therapy, Pathology & Hospital Postings",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study joint mobilization, neurological facilitation techniques (PNF), and cardiopulmonary therapy.",
              "Complete hospital clinical ward postings in orthopedic and neurology departments."
            ],
            "milestone": "Clinical hospital posting evaluation log verified"
          },
          {
            "stepNumber": 3,
            "title": "Compulsory 6-Month Rotatory Internship & Specialty Prep",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Complete intensive 6-month clinical internship rotating across ICU, orthopedics, neuro, and burns wards.",
              "Prepare for state MPT entrance examinations and advanced manual therapy certifications."
            ],
            "milestone": "6-Month rotatory clinical internship certificate"
          }
        ]
      },
      "completed": {
        "degree_id": "bpt",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Professional Resume Refinement & Clinical Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document manual therapy proficiencies, dry needling credentials, and case histories.",
              "Review orthopedic examination tests, stroke rehabilitation guidelines, and electrotherapy parameters."
            ],
            "milestone": "Professional clinical physiotherapist resume"
          },
          {
            "stepNumber": 2,
            "title": "Hospital & Sports Clinic Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for consultant physiotherapist vacancies in leading hospitals and rehabilitation centers.",
              "Demonstrate joint mobilization and clinical evaluation during practical interviews."
            ],
            "milestone": "Appointment letter secured as Clinical Physiotherapist"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Specialist Onboarding & MPT Advancement",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage outpatient and inpatient rehabilitation caseloads; track recovery metrics.",
              "Enroll in Master of Physiotherapy (MPT) in chosen specialty."
            ],
            "milestone": "Successfully rehabilitated 100+ complex post-operative patients"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bmlt",
    "id": "bmlt",
    "familyId": "medicine_health",
    "name": "Bachelor of Medical Laboratory Technology",
    "shortName": "BMLT",
    "aliases": [
      "BMLT",
      "B.M.L.T.",
      "B.Sc Medical Laboratory Technology",
      "Medical Lab Tech",
      "bmlt"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "3 to 4 Years (Including Clinical Internship)",
    "durationYears": 3,
    "regulator": "UGC",
    "overview": "A vital paramedical healthcare program providing rigorous training in clinical pathology, hematology, medical microbiology, clinical biochemistry, histopathology, and blood banking. It trains medical laboratory technologists to operate automated analyzers, perform diagnostic testing, and maintain NABL quality standards.",
    "key_skills": [
      "Automated Hematology & Biochemistry Analyzer Operations",
      "Clinical Microbiology Pathogen Culturing & Antibiotic Sensitivity (AST)",
      "Histopathological Tissue Processing, Microtome Sectioning & Staining",
      "Blood Banking, Cross-Matching & Component Separation",
      "Quality Control (QC), Calibration & Levey-Jennings Chart Analysis",
      "Molecular Diagnostic Assays (Real-Time PCR, ELISA)"
    ],
    "subjects_taught": [
      "Human Anatomy & Physiology for Laboratory Science",
      "Clinical Biochemistry & Metabolic Diagnostics",
      "Hematology & Immunohematology (Blood Banking)",
      "Clinical Microbiology, Mycology & Parasitology",
      "Histopathology & Cytopathology Techniques",
      "Molecular Biology & Advanced Diagnostic Techniques",
      "Laboratory Management, Biosafety & NABL Quality Standards"
    ],
    "typical_employers": [
      "Diagnostic Chains (Dr Lal PathLabs, Metropolis Healthcare, SRL)",
      "Multi-Specialty Private Hospitals",
      "Government Medical College Laboratories",
      "Blood Banks & Red Cross Blood Centres",
      "Clinical Research Organizations (CROs)"
    ],
    "specializations": [
      {
        "id": "bmlt-biochem",
        "name": "Clinical Biochemistry & Automated Platforms",
        "aliases": [
          "Clinical Biochem"
        ],
        "skillsGained": [
          "Spectrophotometry",
          "Analyzer Calibration"
        ],
        "typicalRoles": [
          "Biochemistry Technologist"
        ]
      },
      {
        "id": "bmlt-bloodbank",
        "name": "Immunohematology & Blood Banking",
        "aliases": [
          "Blood Bank Tech"
        ],
        "skillsGained": [
          "Cross-Matching",
          "Apheresis"
        ],
        "typicalRoles": [
          "Blood Bank Technologist"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bmlt-c1",
        "degree_id": "bmlt",
        "role_title": "Medical Laboratory Technologist / Lab Supervisor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Automated blood cell counting, biochemical analyzer calibration, and slide staining coursework qualify you directly for diagnostic pathology chains.",
        "indicative_salary": {
          "min": 3.2,
          "max": 5.8,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Diagnostic Industry Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Hematology Analyzers",
          "ELISA",
          "Phlebotomy",
          "NABL Standards"
        ],
        "top_employers": [
          "Dr Lal PathLabs",
          "Metropolis",
          "SRL Diagnostics",
          "Max Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bmlt-c2",
        "degree_id": "bmlt",
        "role_title": "Government Lab Technician (Civil Hospitals / ESIC / Railways)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Statutory paramedical qualification directly prepares you for recruitment in central and state government hospital laboratories.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "7th Pay Commission Level 5 Pay Matrix (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Pathology",
          "Sample Processing",
          "Microscopy",
          "Blood Grouping"
        ],
        "top_employers": [
          "ESIC Hospitals",
          "Railway Hospitals",
          "AIIMS Labs"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bmlt-c3",
        "degree_id": "bmlt",
        "role_title": "Chief Laboratory Operations Manager / Quality Manager",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of directing multi-specialty central diagnostic processing units and achieving NABL ISO 15189 accreditations qualifies you for operations leadership.",
        "indicative_salary": {
          "min": 12.0,
          "max": 26.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Diagnostic Laboratory Management Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "NABL ISO 15189",
          "Lab Automation",
          "LIMS Architecture",
          "Vendor Negotiations"
        ],
        "top_employers": [
          "Dr Lal PathLabs Central Lab",
          "Metropolis",
          "Thyrocare"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bmlt-hs1",
        "degree_id": "bmlt",
        "program_name": "M.Sc in Medical Laboratory Technology (MMLT)",
        "level": "PG",
        "entrance_exams": [
          "Institutional PG Entrance Exams"
        ],
        "eligibility_rule": "BMLT degree from a recognized university with minimum 50-55% aggregate marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Jamia Hamdard",
          "Manipal College of Health Professions",
          "NIMS University",
          "Amity University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bmlt-hs2",
        "degree_id": "bmlt",
        "program_name": "M.Sc in Medical Microbiology / Clinical Biochemistry",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree in Medical Laboratory Technology or allied medical science.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "JIPMER Puducherry",
          "KMC Manipal",
          "Delhi University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bmlt-ct1",
        "degree_id": "bmlt",
        "cert_name": "Internal Auditor & Quality Management Systems (ISO 15189:2022)",
        "provider": "Quality Council of India (QCI) / NABL",
        "domain": "Quality Standards",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in medical lab technology"
        ],
        "official_url": "https://qcin.org",
        "sourceUrl": "https://qcin.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bmlt-ct2",
        "degree_id": "bmlt",
        "cert_name": "Real-Time PCR & Molecular Diagnostic Techniques",
        "provider": "ICMR / National Institute of Virology",
        "domain": "Molecular Diagnostics",
        "level": "Intermediate",
        "prerequisites": [
          "BMLT or science degree"
        ],
        "official_url": "https://www.icmr.gov.in",
        "sourceUrl": "https://www.icmr.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bmlt-ct3",
        "degree_id": "bmlt",
        "cert_name": "Certified Phlebotomy Technician (CPT)",
        "provider": "National Healthcareer Association (NHA)",
        "domain": "Phlebotomy",
        "level": "Beginner",
        "prerequisites": [
          "Medical lab tech student"
        ],
        "official_url": "https://www.nhanow.com",
        "sourceUrl": "https://www.nhanow.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bmlt-gv1",
        "degree_id": "bmlt",
        "exam_or_post_name": "Railway Recruitment Board (RRB) - Laboratory Superintendent",
        "conducting_body": "Railway Recruitment Control Board",
        "eligibility_rule": {
          "degreeFamily": "Medical Laboratory Technology",
          "allowedDegrees": [
            "B.Sc with Medical Laboratory Technology (BMLT)"
          ],
          "mandatorySubjects": [
            "Laboratory Technology",
            "Pathology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 33,
            "obc": 36,
            "sc_st": 38
          },
          "notes": "Central railway hospital paramedical technical staff post with gazetted progression."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.rrbcdg.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bmlt-gv2",
        "degree_id": "bmlt",
        "exam_or_post_name": "ESIC / AIIMS - Medical Laboratory Technologist",
        "conducting_body": "ESIC / AIIMS",
        "eligibility_rule": {
          "degreeFamily": "Medical Lab Technology",
          "allowedDegrees": [
            "BMLT with registered hospital internship"
          ],
          "mandatorySubjects": [
            "Clinical Biochemistry",
            "Hematology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central government recruitment for technical staff in premier teaching and research hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.esic.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bmlt-sw1",
        "degree_id": "bmlt",
        "target_role": "In Vitro Diagnostics (IVD) Application Specialist",
        "pivot_reason": "Transition laboratory analyzer troubleshooting and reagent testing expertise into working for multinational diagnostic equipment manufacturers (Roche, Abbott, Sysmex).",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Diagnostic Instrumentation Architecture & Troubleshooting",
            "type": "course",
            "detail": "Learn optical flow cytometry, chemiluminescence (CLIA), and liquid chromatography maintenance.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Customer Demonstration & Assay Method Validation",
            "type": "course",
            "detail": "Master customer training, correlation studies, and reagent validation protocols.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "IVD Equipment Installation & Clinical Verification Capstone",
            "type": "portfolio",
            "detail": "Deliver full IQ/OQ/PQ validation protocol documentation for an automated 5-part hematology analyzer.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "IVD Application Specialist Certificate",
          "Medical Equipment Validation"
        ],
        "why_feasible": "Laboratory technologists have real hands-on experience running samples and managing machine error codes, making them superior equipment trainers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bmlt-ent1",
        "degree_id": "bmlt",
        "idea_title": "Authorized Diagnostic Collection Center & Specialized Testing Hub",
        "description": "Establish a tech-enabled diagnostic collection hub with automated cold-chain sample logistics partnered with accredited central pathology labs.",
        "first_milestones": [
          "Acquire automated centrifuge, phlebotomy chairs, barcode scanners, and cold-chain sample transport boxes.",
          "Sign primary franchisee partnership with an NABL-accredited diagnostic brand.",
          "Execute daily home sample collection for 40 local residential patients."
        ],
        "relevant_schemes": [
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Margin money subsidy up to 35% on diagnostic collection equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          },
          {
            "name": "MUDRA Scheme (Kishore)",
            "agency": "MUDRA Bank",
            "benefits": "Collateral-free working capital loan up to 5 Lakhs.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bmlt",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Hematology Basics & Phlebotomy",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master venous blood collection, peripheral blood smear preparation, and Leishman staining.",
              "Perform manual cell counts using a hemocytometer under guidance."
            ],
            "milestone": "Peripheral smear staining and manual cell count log verified"
          },
          {
            "stepNumber": 2,
            "title": "Biochemistry, Microbiology & Clinical Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Operate spectrophotometers, run liver function tests, and culture urine bacterial pathogens.",
              "Complete mandatory clinical internship across hospital laboratory departments."
            ],
            "milestone": "Hospital laboratory internship completion certificate"
          },
          {
            "stepNumber": 3,
            "title": "NABL Quality Standards & Exam Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Study ISO 15189 quality control protocols, Westgard rules, and molecular PCR diagnostics.",
              "Prepare for government hospital laboratory technician recruitment exams."
            ],
            "milestone": "Laboratory technologist competitive exam preparation complete"
          }
        ]
      },
      "completed": {
        "degree_id": "bmlt",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Instrumentation Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document analyzer proficiencies (CLIA, HPLC, automated coagulation), and NABL training.",
              "Review abnormal peripheral blood smear morphologies and quality control charts."
            ],
            "milestone": "Diagnostic laboratory technologist resume"
          },
          {
            "stepNumber": 2,
            "title": "Hospital & Diagnostic Chain Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for laboratory technologist openings at top hospital networks and diagnostic chains.",
              "Demonstrate pipetting accuracy, analyzer calibration, and slide interpretation in interviews."
            ],
            "milestone": "Appointment letter secured as Laboratory Technologist"
          },
          {
            "stepNumber": 3,
            "title": "Technologist Onboarding & Laboratory Advancement",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join laboratory operations, run daily quality calibrations, and verify patient test releases.",
              "Pursue MMLT or specialized molecular diagnostics credentials."
            ],
            "milestone": "Independent sign-off on automated clinical pathology releases"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bhms",
    "id": "bhms",
    "familyId": "medicine_health",
    "name": "Bachelor of Homeopathic Medicine and Surgery",
    "shortName": "BHMS",
    "aliases": [
      "BHMS",
      "B.H.M.S.",
      "Homeopathy graduate",
      "Homeopathic Doctor",
      "bhms"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5.5 Years (4.5 Years Academics + 1 Year Internship)",
    "durationYears": 5,
    "regulator": "NCH",
    "overview": "A statutory holistic healthcare program governed by the National Commission for Homoeopathy (NCH). It integrates classical homeopathic philosophy (Organon of Medicine), homeopathic materia medica, and repertorization with full modern medical science subjects (anatomy, physiology, pathology, surgery, obstetrics) and a mandatory 1-year clinical internship.",
    "key_skills": [
      "Homeopathic Case Taking & Individualized Constitutional Assessment",
      "Repertorization (Kent, Boenninghausen, Boger) & Miasmatic Analysis",
      "Materia Medica Comparative Drug Picture Differentiation",
      "Clinical Diagnostic Examination & Differential Medical Diagnosis",
      "Emergency Triage & Safe Integrational Patient Referral",
      "Homeopathic Pharmacy, Posology & Potency Selection"
    ],
    "subjects_taught": [
      "Anatomy, Histology & Physiology with Biochemistry",
      "Organon of Medicine & Homeopathic Philosophy",
      "Homeopathic Pharmacy & Pharmacodynamics",
      "Homeopathic Materia Medica & Therapeutics",
      "Pathology, Microbiology & Forensic Medicine",
      "Surgery, ENT, Ophthalmology & Dental Diseases",
      "Obstetrics, Gynecology & Infant Care",
      "Repertory and Case Taking",
      "Compulsory 1-Year Clinical Rotatory Internship"
    ],
    "typical_employers": [
      "Central Council for Research in Homoeopathy (CCRH)",
      "Ministry of AYUSH",
      "State Government Homeopathic Dispensaries & Hospitals",
      "Private Homeopathic Clinics & Polyclinics",
      "Homeopathic Pharmaceutical Manufacturers (Dr. Reckeweg, Schwabe, SBL)"
    ],
    "specializations": [
      {
        "id": "bhms-chronic",
        "name": "Chronic Disease & Constitutional Practice",
        "aliases": [
          "Constitutional Homeopathy"
        ],
        "skillsGained": [
          "Miasm Analysis",
          "Repertory"
        ],
        "typicalRoles": [
          "Homeopathic Physician"
        ]
      },
      {
        "id": "bhms-pharma",
        "name": "Homeopathic Drug Standardization & R&D",
        "aliases": [
          "Homeopathic Pharmacy"
        ],
        "skillsGained": [
          "Drug Proving",
          "Pharmacopeia"
        ],
        "typicalRoles": [
          "Technical Advisor"
        ]
      }
    ],
    "sourceUrl": "https://www.nch.org.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bhm-c1",
        "degree_id": "bhms",
        "role_title": "Homeopathic Medical Officer (HMO)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "NCH registration and 1-year clinical rotatory internship qualify you directly for state and AYUSH government dispensaries.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Health Commission Level 10 Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Case Taking",
          "Repertorization",
          "Outpatient Care",
          "AYUSH Protocols"
        ],
        "top_employers": [
          "State AYUSH Departments",
          "CGHS Homeopathic Units",
          "National Health Mission"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bhm-c2",
        "degree_id": "bhms",
        "role_title": "Clinical Research Associate (AYUSH)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Homeopathic drug proving protocols, clinical documentation, and pathology knowledge qualify you for central research councils.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "CCRH Junior Research Fellow Pay Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Clinical Research",
          "Drug Proving",
          "Case Documentation",
          "Epidemiology"
        ],
        "top_employers": [
          "Central Council for Research in Homoeopathy (CCRH)",
          "AYUSH Research Units"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bhm-c3",
        "degree_id": "bhms",
        "role_title": "Consultant Homeopathic Physician & Private Clinic Director",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of successful chronic disease management (autoimmune, dermatological, respiratory) and constitutional practice qualifies you for a premier independent clinic.",
        "indicative_salary": {
          "min": 12.0,
          "max": 32.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Homeopathic Consultant Income Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Constitutional Prescribing",
          "Pediatric Homeopathy",
          "Practice Management",
          "Public Lectures"
        ],
        "top_employers": [
          "Private Homeopathic Clinics",
          "Holistic Wellness Centers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bhm-hs1",
        "degree_id": "bhms",
        "program_name": "MD (Homoeopathy)",
        "level": "PG",
        "entrance_exams": [
          "AIAPGET (All India AYUSH Post Graduate Entrance Test)"
        ],
        "eligibility_rule": "BHMS degree from an NCH-recognized institution with permanent State Homeopathic Council registration and completion of internship.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "National Institute of Homoeopathy (NIH Kolkata)",
          "Nehru Homoeopathic Medical College (Delhi)",
          "Government Homoeopathic Medical College Bengaluru"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bhm-hs2",
        "degree_id": "bhms",
        "program_name": "Master of Public Health (MPH)",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG",
          "Institutional Entrance Tests"
        ],
        "eligibility_rule": "Bachelor's degree in any clinical health science (MBBS/BDS/BHMS/BAMS).",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TISS Mumbai",
          "Indian Institute of Public Health (IIPH)",
          "AIIMS"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bhm-ct1",
        "degree_id": "bhms",
        "cert_name": "Advanced Repertorization & RadarOpus Software Specialist",
        "provider": "RadarOpus / Homeopathic Software Academy",
        "domain": "Digital Repertory",
        "level": "Intermediate",
        "prerequisites": [
          "BHMS student or doctor"
        ],
        "official_url": "https://www.radaropus.com",
        "sourceUrl": "https://www.radaropus.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bhm-ct2",
        "degree_id": "bhms",
        "cert_name": "Clinical Nutrition & Lifestyle Medicine in Chronic Diseases",
        "provider": "Coursera / Stanford Medicine",
        "domain": "Lifestyle Medicine",
        "level": "Beginner",
        "prerequisites": [
          "Healthcare background"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bhm-ct3",
        "degree_id": "bhms",
        "cert_name": "Clinical Research & Pharmacovigilance for AYUSH",
        "provider": "Ministry of AYUSH / CCRH",
        "domain": "Clinical Research",
        "level": "Intermediate",
        "prerequisites": [
          "AYUSH graduate"
        ],
        "official_url": "https://ccrhindia.nic.in",
        "sourceUrl": "https://ccrhindia.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bhm-gv1",
        "degree_id": "bhms",
        "exam_or_post_name": "UPSC / State PSC - Homeopathic Medical Officer (HMO)",
        "conducting_body": "UPSC / State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Homeopathy",
          "allowedDegrees": [
            "BHMS with permanent registration in State / Central Register of Homoeopathy"
          ],
          "mandatorySubjects": [
            "Homeopathic Materia Medica",
            "Organon of Medicine",
            "Practice of Medicine"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "UPSC recruits HMOs for Central Government Health Scheme (CGHS) dispensaries across major cities."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bhm-gv2",
        "degree_id": "bhms",
        "exam_or_post_name": "Research Officer (Homoeopathy) - CCRH",
        "conducting_body": "Central Council for Research in Homoeopathy / Ministry of AYUSH",
        "eligibility_rule": {
          "degreeFamily": "Homeopathy",
          "allowedDegrees": [
            "BHMS / MD (Hom)"
          ],
          "mandatorySubjects": [
            "Homeopathy",
            "Clinical Research"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Group 'A' research scientist cadre conducting clinical trials and drug standardizations."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ccrhindia.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bhm-sw1",
        "degree_id": "bhms",
        "target_role": "Integrative Wellness Consultant & Health Coach",
        "pivot_reason": "Combine holistic chronic disease understanding, nutritional counseling, and patient lifestyle modification into corporate and resort wellness consulting.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Integrative Health & Functional Medicine Fundamentals",
            "type": "course",
            "detail": "Master systemic inflammation biomarkers, gut microbiome health, and functional food nutrition.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Corporate Health Coaching & Behavior Change Psychology",
            "type": "course",
            "detail": "Learn motivational interviewing, stress reduction, and habit formation science.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Corporate Wellness Lifestyle Program Capstone",
            "type": "portfolio",
            "detail": "Deliver complete 12-week chronic metabolic reversal and stress coaching blueprint.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Health & Wellness Coach",
          "Integrative Medicine Certificate"
        ],
        "why_feasible": "Homeopathic doctors already spend hours understanding individual patient emotional and physical lifestyles, making health coaching natural.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bhm-ent1",
        "degree_id": "bhms",
        "idea_title": "Private Classical Homeopathic & Holistic Healing Clinic",
        "description": "Establish a specialized private clinic focusing on chronic skin diseases, pediatric allergies, and stress-related conditions.",
        "first_milestones": [
          "Acquire municipal clinic registration and set up digital repertory software (RadarOpus).",
          "Stock high-grade sealed homeopathic mother tinctures and potencies from licensed manufacturers.",
          "Build a community caseload of 150 active chronic patients through health camps."
        ],
        "relevant_schemes": [
          {
            "name": "National AYUSH Mission",
            "agency": "Ministry of AYUSH",
            "benefits": "Support for setting up integrated AYUSH treatment facilities.",
            "sourceUrl": "https://ayush.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Margin money subsidy up to 35% on clinic fixtures and inventory.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bhms",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Physiology & Organon Foundations",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master human anatomy, physiological mechanisms, and Hahnemann's Organon of Medicine principles.",
              "Pass First Professional BHMS university examinations with viva evaluations."
            ],
            "milestone": "Organon aphorisms and pharmacy practical record verified"
          },
          {
            "stepNumber": 2,
            "title": "Materia Medica, Pathology & Bedside Case Taking",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study drug pictures of polycrest remedies and clinical disease signs in hospital wards.",
              "Learn Kent's repertory schema and practical patient case taking."
            ],
            "milestone": "Hospital clinical ward case taking logbook completed"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Rotatory Internship & AIAPGET Prep",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Rotate across general medicine, surgery, obstetrics, and homeopathic outpatient departments.",
              "Complete 1-year clinical internship and prepare for AIAPGET post-graduate entrance."
            ],
            "milestone": "Internship completion certificate and State Council registration"
          }
        ]
      },
      "completed": {
        "degree_id": "bhms",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Council Registration & Professional Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent state homeopathic council registration number.",
              "Review comparative materia medica, repertorial rubrics, and clinical medicine guidelines."
            ],
            "milestone": "Registered Homeopathic Physician professional resume"
          },
          {
            "stepNumber": 2,
            "title": "Government HMO Exams & Private Clinic Setup",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for UPSC / State PSC Homeopathic Medical Officer vacancies.",
              "Plan location, drug inventory, and digital software for private clinical practice."
            ],
            "milestone": "Appointment letter secured as HMO or clinic launched"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Practice Onboarding & Advanced MDS/Research Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage daily patient OPD caseload, prescribe individualized remedies, and track follow-ups.",
              "Pursue MD (Homoeopathy) via AIAPGET or establish recognized clinical research projects."
            ],
            "milestone": "Successfully managed 100+ chronic patient cases"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bams",
    "id": "bams",
    "familyId": "medicine_health",
    "name": "Bachelor of Ayurvedic Medicine and Surgery",
    "shortName": "BAMS",
    "aliases": [
      "BAMS",
      "B.A.M.S.",
      "Ayurvedic Doctor",
      "Ayurveda graduate",
      "bams"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5.5 Years (4.5 Years Academics + 1 Year Internship)",
    "durationYears": 5,
    "regulator": "NCISM",
    "overview": "The premier undergraduate Ayurvedic medical program governed by the National Commission for Indian System of Medicine (NCISM). It seamlessly integrates classical Ayurvedic literature (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya) and Panchakarma therapies with full modern medical science (anatomy, physiology, pharmacology, general surgery, obstetrics/gynecology) and a mandatory 1-year rotatory clinical internship.",
    "key_skills": [
      "Ayurvedic Clinical Diagnostics (Nadi Pariksha - Pulse Diagnosis, Ashtavidha Pariksha)",
      "Panchakarma Therapies Execution (Vamana, Virechana, Basti, Nasya, Raktamokshana)",
      "Classical Formulation Dispensing (Kashayams, Arishtams, Bhasmas, Ghrithams)",
      "Dravyaguna Herb Identification & Pharmacological Mechanism",
      "Para-Surgical Procedures (Ksharasutra in Fistula, Agnikarma in Pain)",
      "Integrative Patient Care & Lifestyle Medicine (Dinacharya, Ritucharya)"
    ],
    "subjects_taught": [
      "Sanskrit, Padartha Vijnana & Samhita Adhyayana",
      "Kriya Sharira (Physiology) & Rachana Sharira (Anatomy)",
      "Dravyaguna Vijnana (Ayurvedic Pharmacology & Herbs)",
      "Rasa Shastra & Bhaishajya Kalpana (Formulations & Pharmacy)",
      "Roga Nidana (Pathology & Diagnostic Methodology)",
      "Kaya Chikitsa (Internal Medicine) & Panchakarma",
      "Shalya Tantra (Surgery) & Shalakya Tantra (ENT & Eye)",
      "Prasuti Tantra evum Stri Roga (Obstetrics & Gynecology)",
      "Compulsory 1-Year Rotatory Clinical Internship"
    ],
    "typical_employers": [
      "Ministry of AYUSH & State Government Ayurvedic Hospitals",
      "Central Council for Research in Ayurvedic Sciences (CCRAS)",
      "Panchakarma Wellness Resorts & Ayurvedic Retreats",
      "Ayurvedic Pharmaceutical Giants (Dabur, Himalaya Wellness, Patanjali, Kottakkal Arya Vaidya Sala)",
      "Private Ayurvedic Clinics & Integrative Hospitals"
    ],
    "specializations": [
      {
        "id": "bams-panchakarma",
        "name": "Panchakarma & Detoxification Therapies",
        "aliases": [
          "Panchakarma"
        ],
        "skillsGained": [
          "Detox Regimens",
          "Ksharasutra"
        ],
        "typicalRoles": [
          "Panchakarma Specialist"
        ]
      },
      {
        "id": "bams-dravyaguna",
        "name": "Herbal Medicine & Ayurvedic Pharmacology",
        "aliases": [
          "Dravyaguna"
        ],
        "skillsGained": [
          "Herb Identification",
          "Formulations"
        ],
        "typicalRoles": [
          "Ayurvedic R&D Scientist"
        ]
      }
    ],
    "sourceUrl": "https://www.ncismindia.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bam-c1",
        "degree_id": "bams",
        "role_title": "Ayurvedic Medical Officer (AMO)",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "NCISM registration and 1-year clinical internship directly qualify you for government Ayurvedic hospitals and dispensary positions.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Health Commission Level 10 Pay Matrix (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Nadi Pariksha",
          "Kaya Chikitsa",
          "Panchakarma",
          "Dispensary Ops"
        ],
        "top_employers": [
          "State AYUSH Directorates",
          "National Health Mission",
          "CGHS Ayurvedic Units"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bam-c2",
        "degree_id": "bams",
        "role_title": "Chief Panchakarma Physician & Wellness Resort Doctor",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "Panchakarma detox procedures, dosha assessment, and herbal therapy enable high-demand roles in luxury wellness retreats.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Ayurvedic Wellness Resort Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Panchakarma Protocols",
          "Ayurvedic Dietetics",
          "Stress Detox",
          "Client Care"
        ],
        "top_employers": [
          "Kottakkal Arya Vaidya Sala",
          "Ananda in the Himalayas",
          "Somatheeram",
          "Kairali"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bam-c3",
        "degree_id": "bams",
        "role_title": "Chief Ayurvedic Consultant & Research Director",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Holding an MD (Ayurveda), managing multi-center clinical trials, and commanding private hospital networks qualify you for apex Ayurvedic leadership.",
        "indicative_salary": {
          "min": 18.0,
          "max": 42.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Ayurvedic Leadership Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Integrative Medicine",
          "Clinical Drug Trials",
          "Hospital Governance",
          "Classical Formulations"
        ],
        "top_employers": [
          "Himalaya Wellness",
          "Patanjali Research Institute",
          "Dabur R&D"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bam-hs1",
        "degree_id": "bams",
        "program_name": "MD / MS (Ayurveda) Post Graduate Specialization",
        "level": "PG",
        "entrance_exams": [
          "AIAPGET (Ayurveda)"
        ],
        "eligibility_rule": "BAMS degree from an NCISM-recognized institution with permanent State Ayurvedic Council registration and completion of internship.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "National Institute of Ayurveda (NIA Jaipur)",
          "All India Institute of Ayurveda (AIIA New Delhi)",
          "Institute of Teaching and Research in Ayurveda (ITRA Jamnagar)",
          "BHU Varanasi (Faculty of Ayurveda)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bam-hs2",
        "degree_id": "bams",
        "program_name": "Master of Public Health (MPH) / Clinical Research",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Graduate degree in clinical systems of medicine (MBBS/BAMS/BHMS).",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TISS Mumbai",
          "Indian Institute of Public Health (IIPH)",
          "NIMHANS"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bam-ct1",
        "degree_id": "bams",
        "cert_name": "Ksharasutra & Anorectal Para-Surgical Techniques",
        "provider": "National Academy of Ayurveda (Rashtriya Ayurveda Vidyapeeth)",
        "domain": "Para-Surgical Procedures",
        "level": "Intermediate",
        "prerequisites": [
          "BAMS degree holder"
        ],
        "official_url": "https://ravdelhi.nic.in",
        "sourceUrl": "https://ravdelhi.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bam-ct2",
        "degree_id": "bams",
        "cert_name": "Pulse Diagnosis (Nadi Pariksha) Mastery Program",
        "provider": "Ayurveda Academy / International Academy of Ayurveda",
        "domain": "Diagnostic Methods",
        "level": "Intermediate",
        "prerequisites": [
          "BAMS student or doctor"
        ],
        "official_url": "https://www.ayurveda-academy.com",
        "sourceUrl": "https://www.ayurveda-academy.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bam-ct3",
        "degree_id": "bam-c1",
        "cert_name": "Good Agricultural & Collection Practices (GACP) for Medicinal Plants",
        "provider": "National Medicinal Plants Board (NMPB)",
        "domain": "Herbal Quality",
        "level": "Beginner",
        "prerequisites": [
          "BAMS or botanist"
        ],
        "official_url": "https://nmpb.nic.in",
        "sourceUrl": "https://nmpb.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bam-gv1",
        "degree_id": "bams",
        "exam_or_post_name": "UPSC / State PSC - Ayurvedic Medical Officer (AMO)",
        "conducting_body": "UPSC / State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Ayurvedic Medicine",
          "allowedDegrees": [
            "BAMS with permanent registration in State / Central Register of Indian Medicine"
          ],
          "mandatorySubjects": [
            "Kaya Chikitsa",
            "Dravyaguna",
            "Shalya Tantra"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "UPSC recruits AMOs for Central Government Health Scheme dispensaries across India."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bam-gv2",
        "degree_id": "bams",
        "exam_or_post_name": "Research Officer (Ayurveda) - CCRAS",
        "conducting_body": "Central Council for Research in Ayurvedic Sciences / Ministry of AYUSH",
        "eligibility_rule": {
          "degreeFamily": "Ayurveda",
          "allowedDegrees": [
            "BAMS / MD (Ayurveda)"
          ],
          "mandatorySubjects": [
            "Ayurveda",
            "Clinical Pharmacology"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government research scientist cadre conducting clinical trials and herbal standardizations."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ccras.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bam-sw1",
        "degree_id": "bams",
        "target_role": "Nutraceutical & Herbal Formulation R&D Scientist",
        "pivot_reason": "Channel Dravyaguna herbology, phytochemical extract standardization, and bioavailability knowledge into designing functional foods and herbal supplements.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Nutraceutical Formulation Science & FSSAI Standards",
            "type": "course",
            "detail": "Master botanical extract standardization (curcumin, withanolides), FSSAI food supplement rules, and stability testing.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Clinical Efficacy Documentation & Claim Substantiation",
            "type": "course",
            "detail": "Draft human trial protocols proving safety and efficacy for dietary supplements.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Botanical Wellness Supplement Product Dossier Capstone",
            "type": "portfolio",
            "detail": "Formulate a standardized adaptogenic botanical supplement with stability and safety testing dossier.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Nutraceutical Formulation Specialist",
          "Regulatory Compliance Certificate"
        ],
        "why_feasible": "BAMS doctors possess millennia of codified botanical pharmacopeia knowledge, giving them an unmatched advantage in herbal product development.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bam-ent1",
        "degree_id": "bams",
        "idea_title": "Ayurvedic Panchakarma Clinic & Authentic Wellness Therapy Centre",
        "description": "Establish a full-fledged Panchakarma day-care center offering authentic Abhyanga, Shirodhara, Basti, and customized herbal consultations.",
        "first_milestones": [
          "Acquire wooden Droni massage tables, Shirodhara vessels, steam chambers, and sterile Ksharasutra threads.",
          "Empanel certified Panchakarma therapists and register with local health authorities.",
          "Attract 80 monthly therapy patients through community wellness programs."
        ],
        "relevant_schemes": [
          {
            "name": "National AYUSH Mission (NAM)",
            "agency": "Ministry of AYUSH",
            "benefits": "Financial assistance for establishing state-of-the-art AYUSH wellness centers.",
            "sourceUrl": "https://ayush.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Subsidy up to 35% on clinical equipment and therapy chambers.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bams",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Sanskrit, Anatomy & Ayurvedic Fundamentals",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Sanskrit verses of Ashtanga Hridaya, Tridosha theory, and human anatomy dissection.",
              "Pass First Professional BAMS university written and viva examinations."
            ],
            "milestone": "Sanskrit translation and anatomical dissection record verified"
          },
          {
            "stepNumber": 2,
            "title": "Dravyaguna, Formulations & Hospital Ward Postings",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Identify 200 medicinal herbs, prepare classical formulations (tailams, churna), and examine patients in hospital wards.",
              "Learn pulse examination (Nadi Pariksha) under guidance of Ayurvedic vaidyas."
            ],
            "milestone": "Herbal garden field visit report and clinical ward logbook verified"
          },
          {
            "stepNumber": 3,
            "title": "Panchakarma Training, AIAPGET Prep & Internship",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Administer Panchakarma detox therapies and perform minor para-surgical procedures (Ksharasutra).",
              "Complete 12-month rotatory clinical internship and prepare for AIAPGET post-graduate entrance."
            ],
            "milestone": "Internship completion certificate and State Council registration"
          }
        ]
      },
      "completed": {
        "degree_id": "bams",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Ayurvedic Council Registration & Clinical Resume",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent state board of Ayurvedic medicine registration.",
              "Review classical texts (Charaka, Sushruta), drug indications, and differential diagnosis."
            ],
            "milestone": "Registered Ayurvedic Doctor professional resume"
          },
          {
            "stepNumber": 2,
            "title": "AMO Recruitment Exams & Panchakarma Center Setup",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for UPSC / State PSC Ayurvedic Medical Officer positions.",
              "Plan clinic setup, panchakarma therapy tables, and herbal pharmacy stock."
            ],
            "milestone": "Appointment letter secured as AMO or private center launched"
          },
          {
            "stepNumber": 3,
            "title": "Clinical Practice Onboarding & MD (Ayurveda) Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage daily patient consultations, prescribe classical formulations, and track Panchakarma results.",
              "Pursue MD (Ayurveda) in Kayachikitsa or Panchakarma via AIAPGET."
            ],
            "milestone": "Successfully treated 100+ patients with classical therapies"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bnys",
    "id": "bnys",
    "familyId": "medicine_health",
    "name": "Bachelor of Naturopathy & Yogic Sciences",
    "shortName": "BNYS",
    "aliases": [
      "BNYS",
      "B.N.Y.S.",
      "Doctor of Naturopathy",
      "Naturopathy and Yoga",
      "bnys"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5.5 Years (4.5 Years Academics + 1 Year Internship)",
    "durationYears": 5,
    "regulator": "UGC",
    "overview": "A statutory drugless holistic medical program combining natural lifestyle therapies, clinical nutrition, hydrotherapy, and acupuncture with modern medical sciences including anatomy, physiology, and pathology. It incorporates therapeutic yogic practices, clinical diagnostics, and a mandatory 1-year clinical rotatory hospital internship. Graduates are registered practitioners equipped to treat chronic lifestyle diseases, spinal disorders, and metabolic conditions.",
    "key_skills": [
      "Clinical Naturopathy Treatment Design (Hydrotherapy, Mud, Heliotherapy)",
      "Therapeutic Yoga Prescription for Chronic Metabolic & Spinal Disorders",
      "Dietetics, Fasting Therapy & Clinical Nutritional Medicine",
      "Acupuncture, Acupressure & Reflexology Point Stimulation",
      "Clinical Examination & Differential Medical Diagnosis",
      "Stress Management, Mindfulness & Psychoneuroimmunology Coaching"
    ],
    "subjects_taught": [
      "Human Anatomy, Physiology & Biochemistry",
      "Philosophy & Practice of Naturopathy",
      "Yoga Philosophy, Asanas, Pranayama & Kriyas",
      "Pathology, Microbiology & Forensic Medicine",
      "Hydrotherapy, Mud Therapy & Chromotherapy",
      "Nutrition, Dietetics & Fasting Therapy",
      "Acupuncture, Acupressure & Physical Medicine",
      "Clinical Medicine, Obstetrics & Gynecology",
      "Compulsory 1-Year Clinical Rotatory Internship"
    ],
    "typical_employers": [
      "Ministry of AYUSH & State Government Naturopathy Hospitals",
      "National Institute of Naturopathy (NIN Pune)",
      "Jindal Naturecure Institute (Bengaluru)",
      "Luxury Wellness Resorts & Destination Spas",
      "Integrative Pain Management Clinics"
    ],
    "specializations": [
      {
        "id": "bnys-yoga",
        "name": "Yoga Therapy & Mind-Body Medicine",
        "aliases": [
          "Yoga Therapy"
        ],
        "skillsGained": [
          "Pranayama Therapy",
          "Biofeedback"
        ],
        "typicalRoles": [
          "Chief Yoga Physician"
        ]
      },
      {
        "id": "bnys-diet",
        "name": "Clinical Nutrition & Fasting Therapy",
        "aliases": [
          "Clinical Dietetics"
        ],
        "skillsGained": [
          "Fasting Protocols",
          "Nutritional Medicine"
        ],
        "typicalRoles": [
          "Naturopathic Consultant"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bny-c1",
        "degree_id": "bnys",
        "role_title": "Naturopathic Medical Officer (NMO) - Government Health Services",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "Statutory State AYUSH Council registration and 1-year clinical internship qualify you for government naturopathy hospitals and wellness units.",
        "indicative_salary": {
          "min": 5.5,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State AYUSH Pay Scale (Level 10) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Hydrotherapy",
          "Yoga Therapy",
          "Diet Planning",
          "Clinical Diagnostics"
        ],
        "top_employers": [
          "State AYUSH Departments",
          "National Health Mission",
          "CGHS Wellness Centres"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bny-c2",
        "degree_id": "bnys",
        "role_title": "Chief Wellness Physician (Luxury Wellness Resorts)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Prescribing comprehensive detoxification diets, hydrotherapy packs, and therapeutic yoga enables leadership in destination spas.",
        "indicative_salary": {
          "min": 5.0,
          "max": 11.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Luxury Wellness Industry Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Detox Protocols",
          "Acupuncture",
          "Fasting Supervision",
          "Guest Consultations"
        ],
        "top_employers": [
          "Jindal Naturecure",
          "Vana Retreat",
          "Soukya",
          "Atmantan"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bny-c3",
        "degree_id": "bnys",
        "role_title": "Director of Integrative Medicine & Naturopathic Hospital",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of clinical natural lifestyle interventions, metabolic syndrome reversals, and institutional leadership qualifies you for hospital directorship.",
        "indicative_salary": {
          "min": 15.0,
          "max": 35.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Integrative Medicine Director Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Lifestyle Reversal",
          "P&L Management",
          "Integrative Protocols",
          "Clinical Team Leadership"
        ],
        "top_employers": [
          "Private Naturopathy Hospitals",
          "Destination Wellness Spas"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bny-hs1",
        "degree_id": "bnys",
        "program_name": "MD in Naturopathy / Clinical Yoga",
        "level": "PG",
        "entrance_exams": [
          "State PG Naturopathy Entrance Exam"
        ],
        "eligibility_rule": "BNYS degree from a recognized university with completion of 1-year rotatory clinical internship.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "National Institute of Naturopathy (NIN Pune)",
          "SDM College of Naturopathy (Ujire)",
          "Government Nature Cure College (Hyderabad)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bny-hs2",
        "degree_id": "bnys",
        "program_name": "Master of Public Health (MPH)",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG"
        ],
        "eligibility_rule": "Bachelor's degree in clinical health sciences (BNYS/MBBS/BAMS).",
        "typical_duration": "2 Years",
        "top_institutes": [
          "TISS Mumbai",
          "Indian Institute of Public Health (IIPH)",
          "Manipal Academy"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bny-ct1",
        "degree_id": "bnys",
        "cert_name": "Yoga Therapy Certification (Level 3 - Yoga Teacher / Therapist)",
        "provider": "Yoga Certification Board (YCB) / Ministry of AYUSH",
        "domain": "Yoga Therapy",
        "level": "Intermediate",
        "prerequisites": [
          "BNYS student or graduate"
        ],
        "official_url": "https://yogacertificationboard.nic.in",
        "sourceUrl": "https://yogacertificationboard.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bny-ct2",
        "degree_id": "bnys",
        "cert_name": "Clinical Acupuncture Practitioner",
        "provider": "Indian Academy of Acupuncture Science",
        "domain": "Acupuncture",
        "level": "Intermediate",
        "prerequisites": [
          "BNYS degree holder"
        ],
        "official_url": "https://www.acupunctureindia.org",
        "sourceUrl": "https://www.acupunctureindia.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bny-ct3",
        "degree_id": "bnys",
        "cert_name": "Lifestyle Medicine Practitioner Certification",
        "provider": "Indian Society of Lifestyle Medicine (ISLM)",
        "domain": "Lifestyle Medicine",
        "level": "Intermediate",
        "prerequisites": [
          "Health science graduate"
        ],
        "official_url": "https://islm.org.in",
        "sourceUrl": "https://islm.org.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bny-gv1",
        "degree_id": "bnys",
        "exam_or_post_name": "State PSC - Naturopathy Medical Officer (NMO)",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Naturopathy & Yoga",
          "allowedDegrees": [
            "BNYS with registration in State AYUSH Medical Board"
          ],
          "mandatorySubjects": [
            "Naturopathy",
            "Yoga Therapy",
            "Clinical Medicine"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State civil medical recruitment for permanent Naturopathic Medical Officer posts in district hospitals."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bny-gv2",
        "degree_id": "bnys",
        "exam_or_post_name": "National Institute of Naturopathy (NIN) - Research Officer",
        "conducting_body": "NIN Pune / Ministry of AYUSH",
        "eligibility_rule": {
          "degreeFamily": "Naturopathy",
          "allowedDegrees": [
            "BNYS / MD Naturopathy"
          ],
          "mandatorySubjects": [
            "Naturopathic Medicine"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government scientific research cadre investigating lifestyle medicine and fasting therapies."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://punenin.ayush.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bny-sw1",
        "degree_id": "bnys",
        "target_role": "Executive Metabolic Health & Diabetes Reversal Coach",
        "pivot_reason": "Apply low-glycemic dietary planning, intermittent fasting schedules, and therapeutic yoga to managing digital diabetes reversal programs.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Continuous Glucose Monitoring (CGM) & Metabolic Analytics",
            "type": "course",
            "detail": "Master real-time glycemic variability, insulin resistance biomarkers, and metabolic scoring.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Digital Behavioral Coaching & Tele-Health Protocol",
            "type": "course",
            "detail": "Learn remote patient engagement, meal photo logging, and habit formation software.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Type-2 Diabetes Reversal Protocol Capstone",
            "type": "portfolio",
            "detail": "Deliver complete 16-week natural lifestyle and nutrition plan lowering HbA1c below 6.0%.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Diabetes Educator (CDE)",
          "Metabolic Health Specialist"
        ],
        "why_feasible": "BNYS doctors specialize in non-drug lifestyle reversal and fasting science, making them the most qualified coaches for digital health startups.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bny-ent1",
        "degree_id": "bnys",
        "idea_title": "Integrated Naturopathy Day-Care & Therapeutic Yoga Studio",
        "description": "Establish a natural treatment center equipped with steam cabinets, mud therapy facilities, hydrotherapy baths, and customized therapeutic yoga rooms.",
        "first_milestones": [
          "Acquire spinal spray units, hip-bath tubs, full-body steam boxes, and acupuncture gear.",
          "Register clinic with State AYUSH board and local municipal health authorities.",
          "Onboard 60 monthly chronic lifestyle members for hypertension and back-pain therapy."
        ],
        "relevant_schemes": [
          {
            "name": "National AYUSH Mission",
            "agency": "Ministry of AYUSH",
            "benefits": "Grants and promotional support for accredited naturopathy centers.",
            "sourceUrl": "https://ayush.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on hydrotherapy and yoga studio equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bnys",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Physiology & Philosophy of Nature Cure",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master human anatomy, physiological homeostatic mechanisms, and vital energy laws.",
              "Learn Shatkriyas (Jala Neti, Sutra Neti, Dhauti) and classical Hatha Yoga asanas."
            ],
            "milestone": "Shatkriya mastery and anatomical dissection record verified"
          },
          {
            "stepNumber": 2,
            "title": "Hydrotherapy, Dietetics & Clinical Diagnostics",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study therapeutic applications of packs, baths, enemas, clinical fasting, and medical diagnostics.",
              "Complete clinical ward observer postings at teaching hospital nature-cure wards."
            ],
            "milestone": "Clinical posting logbook and diet plan portfolio verified"
          },
          {
            "stepNumber": 3,
            "title": "Acupuncture, Clinical Rotatory Internship & Exam Prep",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Administer acupuncture needle stimulation, therapeutic yoga classes, and manage patient charts.",
              "Complete 12-month compulsory rotatory clinical internship and prepare for State AMO exams."
            ],
            "milestone": "Internship completion certificate and State AYUSH registration"
          }
        ]
      },
      "completed": {
        "degree_id": "bnys",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "AYUSH Council Registration & Clinical Resume",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent state medical council registration as Naturopathy Doctor.",
              "Review natural therapy protocols, contraindications, and emergency referral guidelines."
            ],
            "milestone": "Registered Naturopathic Physician professional resume"
          },
          {
            "stepNumber": 2,
            "title": "Government AMO Recruitment & Wellness Centre Applications",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for State PSC Naturopathy Medical Officer posts and luxury resort wellness roles.",
              "Demonstrate pulse examination, acupuncture point location, and therapeutic yoga."
            ],
            "milestone": "Appointment letter secured as Naturopathic Physician"
          },
          {
            "stepNumber": 3,
            "title": "Physician Onboarding & Advanced Clinical Mastery",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage outpatient natural lifestyle therapies, supervise fasting retreats, and track biomarkers.",
              "Pursue MD in Naturopathy or establish recognized lifestyle clinical practice."
            ],
            "milestone": "Successfully guided 100+ chronic disease patients to natural recovery"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bvsc",
    "id": "bvsc",
    "familyId": "medicine_health",
    "name": "Bachelor of Veterinary Science & Animal Husbandry",
    "shortName": "B.V.Sc. & A.H.",
    "aliases": [
      "BVSc",
      "B.V.Sc",
      "BVSc & AH",
      "Veterinary Doctor",
      "Veterinary Medicine graduate",
      "bvsc"
    ],
    "level": "UG",
    "discipline": "Medicine & Health Sciences",
    "duration": "5.5 Years (4.5 Years Academics + 1 Year Internship)",
    "durationYears": 5,
    "regulator": "VCI",
    "overview": "A statutory professional veterinary medicine and surgical program governed by the Veterinary Council of India (VCI). It trains veterinary surgeons in veterinary anatomy, animal physiology, veterinary pharmacology, livestock production management, animal genetics, veterinary surgery, and epidemiology with a mandatory 1-year clinical rotatory internship.",
    "key_skills": [
      "Veterinary Clinical Diagnosis & Physical Examination of Animals",
      "Veterinary Surgical Procedures (Spay/Neuter, Cesarean, Fracture Pinning)",
      "Livestock Disease Prevention, Vaccination Schedules & Biosecurity",
      "Animal Reproduction, Artificial Insemination & Theriogenology",
      "Zoonotic Disease Surveillance & One-Health Epidemiological Control",
      "Veterinary Pharmacology, Anesthesia Induction & Drug Dosages"
    ],
    "subjects_taught": [
      "Veterinary Anatomy, Embryology & Histology",
      "Veterinary Physiology & Biochemistry",
      "Livestock Production Management & Animal Nutrition",
      "Veterinary Microbiology, Pathology & Parasitology",
      "Veterinary Pharmacology & Toxicology",
      "Veterinary Surgery, Radiology & Anesthesiology",
      "Veterinary Gynaecology, Obstetrics & Artificial Insemination",
      "Veterinary Medicine, Public Health & Epidemiology",
      "Compulsory 1-Year Clinical Rotatory Internship"
    ],
    "typical_employers": [
      "State Animal Husbandry & Veterinary Departments",
      "Companion Animal Veterinary Hospitals",
      "Livestock Breeding Farms & Dairy Cooperatives (Amul, NDDB)",
      "Pharmaceutical Animal Health Divisions (Zoetis, Boehringer Ingelheim)",
      "Wildlife Sanctuaries & Zoological Parks (Central Zoo Authority)"
    ],
    "specializations": [
      {
        "id": "bvsc-companion",
        "name": "Small Animal Clinical Medicine & Surgery",
        "aliases": [
          "Pet Practice"
        ],
        "skillsGained": [
          "Soft Tissue Surgery",
          "Canine Medicine"
        ],
        "typicalRoles": [
          "Companion Animal Veterinarian"
        ]
      },
      {
        "id": "bvsc-livestock",
        "name": "Large Animal Medicine & Dairy Herd Health",
        "aliases": [
          "Dairy Vet"
        ],
        "skillsGained": [
          "Herd Fertility",
          "Bovine Surgery"
        ],
        "typicalRoles": [
          "Veterinary Officer (Livestock)"
        ]
      }
    ],
    "sourceUrl": "https://vci.dadf.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "vet-c1",
        "degree_id": "bvsc",
        "role_title": "Veterinary Assistant Surgeon (VAS) / Veterinary Officer",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Regulated",
        "match_rationale": "VCI registration and 1-year clinical internship qualify you directly for gazetted state veterinary hospital cadre.",
        "indicative_salary": {
          "min": 6.5,
          "max": 12.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Veterinary Services Level 10 Pay Scale (with NPA) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Large Animal Surgery",
          "Vaccination",
          "Herd Health",
          "Artificial Insemination"
        ],
        "top_employers": [
          "State Animal Husbandry Departments",
          "Government Veterinary Hospitals"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "vet-c2",
        "degree_id": "bvsc",
        "role_title": "Companion Animal (Pet) Clinical Veterinarian",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Regulated",
        "match_rationale": "Canine and feline medicine, vaccination protocols, and soft-tissue surgery enable high-demand roles in urban pet hospitals.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Small Animal Veterinary Association Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Pet Surgery",
          "Canine Radiology",
          "Dental Scaling",
          "Dermatology"
        ],
        "top_employers": [
          "MaxiZoo",
          "Cessna Lifeline",
          "Private Pet Hospitals",
          "Furry Paws Clinic"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "vet-c3",
        "degree_id": "bvsc",
        "role_title": "Chief Veterinary Officer / Director of Animal Husbandry",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Holding an MVSc and leading statewide livestock disease eradication, dairy breeding policies, and veterinary public health qualifies you for director-general rank.",
        "indicative_salary": {
          "min": 18.0,
          "max": 45.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Veterinary Administrative Officer Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Livestock Policy",
          "Epidemic Containment (FMD)",
          "State Veterinary Budgeting",
          "Executive Command"
        ],
        "top_employers": [
          "State Animal Husbandry Directorates",
          "Ministry of Fisheries, Animal Husbandry & Dairying"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "vet-hs1",
        "degree_id": "bvsc",
        "program_name": "Master of Veterinary Science (M.V.Sc.)",
        "level": "PG",
        "entrance_exams": [
          "ICAR AIEEA-PG (Veterinary)"
        ],
        "eligibility_rule": "B.V.Sc. & A.H. degree from a VCI-recognized institution with minimum 6.0/10.0 OGPA or 60% aggregate marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Indian Veterinary Research Institute (IVRI Bareilly)",
          "National Dairy Research Institute (NDRI Karnal)",
          "Guru Angad Dev Veterinary University (GADVASU Ludhiana)",
          "TANUVAS Chennai"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "vet-hs2",
        "degree_id": "bvsc",
        "program_name": "Master / Ph.D. in Veterinary Surgery & Radiology (Abroad / India)",
        "level": "Doctoral",
        "entrance_exams": [
          "GRE / ICAR AICE-JRF"
        ],
        "eligibility_rule": "M.V.Sc. degree in Veterinary Surgery or related discipline.",
        "typical_duration": "3 Years",
        "top_institutes": [
          "Royal Veterinary College London",
          "Cornell University College of Veterinary Medicine",
          "IVRI Bareilly"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "vet-ct1",
        "degree_id": "bvsc",
        "cert_name": "Small Animal Orthopedic & Soft Tissue Surgery Certification",
        "provider": "World Small Animal Veterinary Association (WSAVA)",
        "domain": "Veterinary Surgery",
        "level": "Intermediate",
        "prerequisites": [
          "BVSc degree holder"
        ],
        "official_url": "https://wsava.org",
        "sourceUrl": "https://wsava.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "vet-ct2",
        "degree_id": "bvsc",
        "cert_name": "Ultrasonography & Echocardiography in Veterinary Practice",
        "provider": "Veterinary Ultrasound Society / Esaote",
        "domain": "Veterinary Radiology",
        "level": "Intermediate",
        "prerequisites": [
          "Registered veterinary doctor"
        ],
        "official_url": "https://www.esaote.com",
        "sourceUrl": "https://www.esaote.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "vet-ct3",
        "degree_id": "bvsc",
        "cert_name": "Wildlife Capture, Immobilization & Healthcare",
        "provider": "Wildlife Institute of India (WII) / ZSL",
        "domain": "Wildlife Medicine",
        "level": "Intermediate",
        "prerequisites": [
          "Veterinary graduate"
        ],
        "official_url": "https://wii.gov.in",
        "sourceUrl": "https://wii.gov.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "vet-gv1",
        "degree_id": "bvsc",
        "exam_or_post_name": "State PSC - Veterinary Assistant Surgeon (VAS)",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Veterinary Science",
          "allowedDegrees": [
            "B.V.Sc. & A.H. with State Veterinary Council Registration"
          ],
          "mandatorySubjects": [
            "Veterinary Clinical Medicine",
            "Animal Reproduction",
            "Surgery"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State civil services gazetted officer post heading government veterinary hospitals and dispensaries."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "vet-gv2",
        "degree_id": "bvsc",
        "exam_or_post_name": "Remount Veterinary Corps (RVC) - Commissioned Officer",
        "conducting_body": "Indian Army",
        "eligibility_rule": {
          "degreeFamily": "Veterinary Science",
          "allowedDegrees": [
            "B.V.Sc. & A.H. from recognized university"
          ],
          "mandatorySubjects": [
            "Veterinary Medicine",
            "Equine & Canine Surgery"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 32,
            "obc": 32,
            "sc_st": 32
          },
          "notes": "Direct commission as Captain in the Indian Army managing military working dogs and cavalry equines."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.joinindianarmy.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "vet-sw1",
        "degree_id": "bvsc",
        "target_role": "Animal Health Pharmaceutical Product & Regulatory Manager",
        "pivot_reason": "Apply veterinary pharmacology, dosage form kinetics, and target animal safety to leading animal vaccine and pharmaceutical drug launches.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Veterinary Pharmaceutical Regulatory Submissions (Vich Standards)",
            "type": "course",
            "detail": "Master veterinary pharmacopeia, target animal safety trials, and CDSCO veterinary drug licensing.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Veterinary Product Marketing & Technical Advisory",
            "type": "course",
            "detail": "Learn field clinical trials management, veterinary conference presentations, and livestock economics.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Veterinary Biological Dossier Capstone",
            "type": "portfolio",
            "detail": "Draft complete technical marketing and regulatory summary for a novel canine monoclonal antibody.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Veterinary Regulatory Specialist",
          "Animal Health Product Management"
        ],
        "why_feasible": "Veterinarians know real farm and pet diseases, dosage calculations, and farmer economics, making them premier animal health product managers.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "vet-ent1",
        "degree_id": "bvsc",
        "idea_title": "State-of-the-Art Companion Animal Specialty Hospital & Diagnostic Lab",
        "description": "Establish a full-service private pet hospital offering computerized digital X-ray, in-house hematology, gas anesthesia surgery, and emergency boarding.",
        "first_milestones": [
          "Acquire veterinary surgical table, inhalation isoflurane anesthesia machine, digital X-ray, and boarding suites.",
          "Register hospital with State Veterinary Council and local municipal corporation.",
          "Build a recurring patient register of 300 urban companion animals within 6 months."
        ],
        "relevant_schemes": [
          {
            "name": "Animal Husbandry Infrastructure Development Fund (AHIDF)",
            "agency": "Department of Animal Husbandry & Dairying",
            "benefits": "3% interest subvention and credit guarantee for animal healthcare infrastructure.",
            "sourceUrl": "https://ahidf.udyamimitra.in"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for veterinary equipment and clinics.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bvsc",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Veterinary Anatomy, Animal Handling & Physiology",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master bone osteology of cattle and dogs, animal restraint techniques, and histology.",
              "Pass First Professional B.V.Sc. & A.H. university practicals with live animal examinations."
            ],
            "milestone": "Osteology identification and practical physiology log verified"
          },
          {
            "stepNumber": 2,
            "title": "Pathology, Pharmacology & Animal Farm Training",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study tissue gross pathology, antibiotic dosages, and livestock management practices on university dairy farms.",
              "Complete live rectal palpation and artificial insemination practicals."
            ],
            "milestone": "Farm management and pathology logbook verified"
          },
          {
            "stepNumber": 3,
            "title": "Veterinary Surgery, Clinical Medicine & Rotatory Internship",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Perform routine surgeries (spay, castrations, wound repair) and administer general anesthesia.",
              "Complete 12-month clinical rotatory internship across polyclinics, poultry farms, and zoo hospitals."
            ],
            "milestone": "Internship completion certificate and VCI permanent registration"
          }
        ]
      },
      "completed": {
        "degree_id": "bvsc",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Veterinary Council Registration & Surgery Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Secure permanent registration with Veterinary Council of India (VCI) and State Council.",
              "Document surgical case logs, anesthetic protocols, and radiographic interpretations."
            ],
            "milestone": "Registered Veterinary Surgeon professional resume"
          },
          {
            "stepNumber": 2,
            "title": "State VAS Exam & Pet Hospital Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for State PSC Veterinary Assistant Surgeon (VAS) gazetted exams and pet clinic roles.",
              "Demonstrate animal physical examination and surgical suturing during practical interviews."
            ],
            "milestone": "Appointment letter secured as Veterinary Surgeon"
          },
          {
            "stepNumber": 3,
            "title": "Veterinary Officer Onboarding & Advanced Surgical Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Manage hospital clinical operations, lead mass vaccination campaigns, and treat complex surgeries.",
              "Pursue M.V.Sc. through ICAR AIEEA-PG in Veterinary Surgery or Medicine."
            ],
            "milestone": "Successfully performed 150+ animal medical and surgical procedures"
          }
        ]
      }
    }
  }
];
