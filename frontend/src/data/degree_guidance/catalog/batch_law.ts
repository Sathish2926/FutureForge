import { UniversalDegreeRecord } from "./types";

export const LAW_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "llb",
    "id": "llb",
    "familyId": "law",
    "name": "Bachelor of Laws (3-Year)",
    "shortName": "LL.B. (3-Year)",
    "aliases": [
      "LLB",
      "LL.B.",
      "Bachelor of Law",
      "3-Year LLB",
      "Law Graduate",
      "llb"
    ],
    "level": "UG",
    "discipline": "Law & Legal Studies",
    "duration": "3 Years (6 Semesters)",
    "durationYears": 3,
    "regulator": "BCI",
    "overview": "A professional graduate-entry legal program governed by the Bar Council of India (BCI). It provides rigorous doctrinal and courtroom training in constitutional law, criminal jurisprudence, civil procedure, contracts, corporate law, and trial advocacy, leading to statutory enrollment as an Advocate.",
    "key_skills": [
      "Legal Drafting, Pleadings & Conveyancing (Civil & Criminal)",
      "Statutory Interpretation, Case Law Research & Legal Precedent",
      "Moot Court Oral Advocacy, Cross-Examination & Trial Procedure",
      "Constitutional Law & Writ Jurisdiction (Articles 32 & 226)",
      "Commercial Contract Review, Indemnity & Arbitration Clauses",
      "Bar Council of India Professional Ethics & Advocate Standards"
    ],
    "subjects_taught": [
      "Constitutional Law of India (Parts I & II)",
      "Law of Crimes (Indian Penal Code / Bharatiya Nyaya Sanhita)",
      "Code of Civil Procedure (CPC) & Law of Limitation",
      "Code of Criminal Procedure (CrPC / BNSS) & Law of Evidence",
      "Law of Contracts & Specific Relief Act",
      "Company Law & Commercial Arbitration",
      "Drafting, Pleading and Conveyancing Practicals"
    ],
    "typical_employers": [
      "Chambers of Senior Advocates (High Courts & Supreme Court)",
      "Tier-1 Law Firms (Shardul Amarchand, Cyril Amarchand, Khaitan & Co, Trilegal)",
      "Corporate In-House Legal Counsel",
      "Public Sector Undertakings (PSU Legal Wings)",
      "State Judicial Services"
    ],
    "specializations": [
      {
        "id": "llb-litigation",
        "name": "Civil & Criminal Trial Litigation",
        "aliases": [
          "Court Litigation"
        ],
        "skillsGained": [
          "Cross-Examination",
          "Bail Hearings"
        ],
        "typicalRoles": [
          "Associate Advocate"
        ]
      },
      {
        "id": "llb-corporate",
        "name": "Corporate Law & Transactional Advisory",
        "aliases": [
          "Corporate Law"
        ],
        "skillsGained": [
          "M&A Due Diligence",
          "Contract Drafting"
        ],
        "typicalRoles": [
          "Corporate Legal Associate"
        ]
      }
    ],
    "sourceUrl": "https://www.barcouncilofindia.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "llb-c1",
        "degree_id": "llb",
        "role_title": "Litigation Associate / Junior Advocate",
        "tier": "entry",
        "employer_type": "self",
        "career_type": "Regulated",
        "match_rationale": "Training in CPC, CrPC, criminal defense, and trial advocacy directly qualifies you for enrollment with the State Bar Council and court practice.",
        "indicative_salary": {
          "min": 3.6,
          "max": 7.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Bar Council of India Remuneration Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Trial Court Practice",
          "Bail Applications",
          "Pleadings",
          "Legal Research"
        ],
        "top_employers": [
          "Senior Advocate Chambers",
          "District Courts",
          "High Court Litigation Teams"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "llb-c2",
        "degree_id": "llb",
        "role_title": "Corporate Legal Associate / In-House Counsel",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Company law, commercial contracts, and arbitration coursework map directly into law firm corporate practices and enterprise legal teams.",
        "indicative_salary": {
          "min": 6.5,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Top Law Firms Associate Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Contract Review",
          "M&A Due Diligence",
          "Corporate Compliance",
          "Arbitration"
        ],
        "top_employers": [
          "Shardul Amarchand Mangaldas",
          "Khaitan & Co",
          "ICICI Bank Legal",
          "Tata Sons Legal"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "llb-c3",
        "degree_id": "llb",
        "role_title": "Designated Senior Advocate / Law Firm Equity Partner",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Distinguished constitutional argumentation, landmark high court and supreme court appearances, and decades of legal scholarship qualify you for Senior Advocate designation.",
        "indicative_salary": {
          "min": 25.0,
          "max": 75.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Advocate Fee Survey (Indicative Bar Bench Reports) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Constitutional Writs",
          "Supreme Court Advocacy",
          "Arbitral Tribunal Leadership",
          "Chambers Management"
        ],
        "top_employers": [
          "Supreme Court of India",
          "High Courts of India",
          "Premier Law Partnerships"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "llb-hs1",
        "degree_id": "llb",
        "program_name": "Master of Laws (LL.M.)",
        "level": "PG",
        "entrance_exams": [
          "CLAT-PG",
          "AILET-PG",
          "CUET-PG"
        ],
        "eligibility_rule": "LL.B. degree from a BCI-recognized university with minimum 50% aggregate marks.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "NLSIU Bengaluru",
          "NALSAR Hyderabad",
          "Faculty of Law Delhi University",
          "WBNUJS Kolkata"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "llb-hs2",
        "degree_id": "llb",
        "program_name": "Civil Judge (Junior Division) / Judicial Magistrate (Judicial Services)",
        "level": "Professional",
        "entrance_exams": [
          "State Judicial Services Examination (PCS-J)"
        ],
        "eligibility_rule": "Degree in Law from a recognized university; enrollment as an advocate with the State Bar Council.",
        "typical_duration": "Competitive State Exam",
        "top_institutes": [
          "State High Courts / Public Service Commissions"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "llb-ct1",
        "degree_id": "llb",
        "cert_name": "All India Bar Examination (AIBE)",
        "provider": "Bar Council of India (BCI)",
        "domain": "Statutory Advocacy License",
        "level": "Beginner",
        "prerequisites": [
          "LL.B. degree and provisional state enrollment"
        ],
        "official_url": "https://www.allindiabarexamination.com",
        "sourceUrl": "https://www.allindiabarexamination.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "llb-ct2",
        "degree_id": "llb",
        "cert_name": "Arbitration & Mediation Practitioner Certificate",
        "provider": "Chartered Institute of Arbitrators (CIArb) / BIMACC",
        "domain": "Alternative Dispute Resolution",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in law or enrolled advocate"
        ],
        "official_url": "https://www.ciarb.org",
        "sourceUrl": "https://www.ciarb.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "llb-ct3",
        "degree_id": "llb",
        "cert_name": "Corporate Law & Mergers & Acquisitions Drafting",
        "provider": "National Law School (NLSIU DED)",
        "domain": "Corporate Law",
        "level": "Intermediate",
        "prerequisites": [
          "Law student or graduate"
        ],
        "official_url": "https://ded.nls.ac.in",
        "sourceUrl": "https://ded.nls.ac.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "llb-gv1",
        "degree_id": "llb",
        "exam_or_post_name": "State Judicial Services Examination (Civil Judge Junior Division / PCS-J)",
        "conducting_body": "State High Courts & State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "LL.B. (3-Year)",
            "BA LLB",
            "BBA LLB"
          ],
          "mandatorySubjects": [
            "Civil Law",
            "Criminal Law",
            "Constitutional Law"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State judicial cadre entry directly as Judicial Magistrate / Civil Judge."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "llb-gv2",
        "degree_id": "llb",
        "exam_or_post_name": "Assistant Public Prosecutor (APP) / Directorate of Prosecution",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "LL.B."
          ],
          "mandatorySubjects": [
            "Criminal Procedure Code",
            "Evidence Act"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Government prosecutors representing the State in criminal trials in Magistrate courts."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "llb-sw1",
        "degree_id": "llb",
        "target_role": "Corporate Governance & Company Secretary (CS)",
        "pivot_reason": "Combine corporate legal jurisprudence, board secretarial practices, and SEBI compliance to manage corporate board secretarial functions.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "ICSI Executive & Professional Modules",
            "type": "cert",
            "detail": "Prepare for ICSI company secretary modules covering secretarial audit and board governance.",
            "estimatedMonths": 4
          },
          {
            "step": 2,
            "title": "SEBI Listing Regulations (LODR) & Insider Trading Rules",
            "type": "course",
            "detail": "Master stock exchange disclosure filings, material event disclosures, and quarterly compliance.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Board Resolution & Secretarial Audit Portfolio",
            "type": "portfolio",
            "detail": "Draft complete annual corporate secretarial audit and board minutes documentation for a listed firm.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "8 Months",
        "recommended_certs": [
          "Company Secretary (CS) - ICSI",
          "SEBI Compliance Specialist"
        ],
        "why_feasible": "Law graduates already master company law, making corporate secretarial statutory compliance straightforward.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "llb-ent1",
        "degree_id": "llb",
        "idea_title": "Independent Law Chambers & Corporate Legal Advisory Firm",
        "description": "Establish a full-service dispute resolution, civil litigation, and commercial contract drafting law chambers.",
        "first_milestones": [
          "Clear AIBE, secure permanent Certificate of Practice, and set up chambers office.",
          "Empanel with 5 cooperative banks and real estate firms for legal title search reports.",
          "Build an active litigation caseload in district courts and state consumer forums."
        ],
        "relevant_schemes": [
          {
            "name": "Bar Council Welfare Fund",
            "agency": "State Bar Councils",
            "benefits": "Welfare scheme coverage, library access, and professional advocacy support.",
            "sourceUrl": "https://www.barcouncilofindia.org"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for setting up professional legal offices and digital law libraries.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "llb",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Constitutional Law, Crimes & Legal Research",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Indian constitution, IPC/BNS offenses, contract law, and online case research (SCC Online, Manupatra).",
              "Draft basic legal notices and participate in internal moot court competitions."
            ],
            "milestone": "First moot court memorial and legal notice portfolio"
          },
          {
            "stepNumber": 2,
            "title": "Civil & Criminal Procedure, Trial Mooting & Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study CPC, CrPC, law of evidence, and cross-examination strategies.",
              "Complete mandatory summer internship under a Senior Advocate or trial court litigation lawyer."
            ],
            "milestone": "Trial court litigation internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "Bar Enrollment, AIBE Preparation & Judicial Services",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Complete drafting, pleading, and conveyancing practical submissions.",
              "Enroll provisionally with State Bar Council and prepare for the All India Bar Examination (AIBE)."
            ],
            "milestone": "Provisional Bar Council enrollment and AIBE clearance"
          }
        ]
      },
      "completed": {
        "degree_id": "llb",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advocate Resume Refinement & Legal Research Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document litigation filings, contract drafting, legal research tools, and court appearances.",
              "Review fundamentals of procedural codes, writ petition formats, and professional ethics."
            ],
            "milestone": "Professional courtroom advocate resume"
          },
          {
            "stepNumber": 2,
            "title": "Chambers Joining / Judicial Services Examination",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Join established senior litigation chambers or appear for State Judicial Services prelims.",
              "Participate in law firm interviews for junior associate positions."
            ],
            "milestone": "Chambers junior advocate appointment letter secured"
          },
          {
            "stepNumber": 3,
            "title": "Active Courtroom Advocacy & Independent Briefs",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Argue bail matters, argue interim applications, and handle cross-examinations in court.",
              "Prepare for AOR (Advocate-on-Record) or Senior State Judicial Services."
            ],
            "milestone": "Argued first independent trial court matter successfully"
          }
        ]
      }
    }
  },
  {
    "degree_id": "ba-llb",
    "id": "ba-llb",
    "familyId": "law",
    "name": "Bachelor of Arts & Bachelor of Laws (5-Year Integrated)",
    "shortName": "B.A. LL.B. (Hons)",
    "aliases": [
      "BA LLB",
      "B.A. LL.B.",
      "BA LLB Hons",
      "Integrated Law",
      "ba-llb"
    ],
    "level": "Integrated",
    "discipline": "Law & Legal Studies",
    "duration": "5 Years (10 Semesters)",
    "durationYears": 5,
    "regulator": "BCI",
    "overview": "A 5-year integrated double degree merging humanities disciplines (political science, sociology, history) with legal education. It trains students in constitutional law, international law, corporate mergers, intellectual property, trial advocacy, and arbitration.",
    "key_skills": [
      "National & International Moot Court Oral Advocacy",
      "Corporate Mergers & Acquisitions (M&A) Due Diligence",
      "Commercial Contract Drafting & Cross-Border Arbitration",
      "Constitutional Interpretation & Public Interest Litigation (PIL)",
      "Intellectual Property Rights (IPR) Prosecution & Licensing",
      "Advanced Legal Scholarly Research & Law Review Publishing"
    ],
    "subjects_taught": [
      "Political Science, Sociology & Legal History",
      "Law of Torts, Consumer Protection & Motor Vehicles Act",
      "Law of Contracts & Specific Relief",
      "Constitutional Law & Administrative Law",
      "Corporate Law & Competition Law",
      "Public International Law & Human Rights",
      "Civil Procedure Code, Criminal Procedure & Evidence",
      "Intellectual Property Rights & International Commercial Arbitration"
    ],
    "typical_employers": [
      "Tier-1 Law Firms (Cyril Amarchand Mangaldas, Shardul Amarchand, Khaitan & Co, AZB & Partners)",
      "Magic Circle & US International Law Firms",
      "In-House Legal Departments (Google, Amazon, Reliance, Tata)",
      "Supreme Court & High Court Chambers",
      "State Judicial Services"
    ],
    "specializations": [
      {
        "id": "ballb-corp",
        "name": "Corporate Law, M&A & Private Equity",
        "aliases": [
          "Corporate Law"
        ],
        "skillsGained": [
          "Due Diligence",
          "Share Purchase Agreements"
        ],
        "typicalRoles": [
          "Corporate Law Associate"
        ]
      },
      {
        "id": "ballb-dispute",
        "name": "Dispute Resolution & Commercial Arbitration",
        "aliases": [
          "Dispute Resolution"
        ],
        "skillsGained": [
          "Arbitral Filings",
          "Commercial Suits"
        ],
        "typicalRoles": [
          "Dispute Resolution Associate"
        ]
      }
    ],
    "sourceUrl": "https://www.barcouncilofindia.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "ba-llb-c1",
        "degree_id": "ba-llb",
        "role_title": "Corporate Law Associate (Tier-1 Law Firm)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Training in corporate mergers, competition law, and transaction documentation directly qualifies you for top law firm corporate practice desks.",
        "indicative_salary": {
          "min": 11.0,
          "max": 18.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "National Law Universities Placement Consortium Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "M&A Due Diligence",
          "Shareholders Agreements",
          "SEBI Compliance",
          "Contract Drafting"
        ],
        "top_employers": [
          "Cyril Amarchand Mangaldas",
          "Shardul Amarchand",
          "Khaitan & Co",
          "AZB & Partners"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ba-llb-c2",
        "degree_id": "ba-llb",
        "role_title": "Litigation & Commercial Dispute Associate",
        "tier": "entry",
        "employer_type": "self",
        "career_type": "Direct",
        "match_rationale": "Moot court advocacy, civil procedure, and commercial arbitration coursework map directly into high-stakes commercial disputes.",
        "indicative_salary": {
          "min": 6.5,
          "max": 13.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Commercial Litigation Bar Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Commercial Arbitration",
          "Writ Petitions",
          "High Court Litigation",
          "Injunctions"
        ],
        "top_employers": [
          "Luthra and Luthra",
          "Trilegal",
          "Senior Counsel Chambers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ba-llb-c3",
        "degree_id": "ba-llb",
        "role_title": "Senior Equity Partner / Head of Corporate Practice",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Leading billion-dollar cross-border acquisitions, joint ventures, and private equity investments qualifies you for equity partnership in top law firms.",
        "indicative_salary": {
          "min": 35.0,
          "max": 100.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Indian Corporate Legal Partner Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Cross-Border M&A",
          "Private Equity Deals",
          "Firm Equity Governance",
          "Client Relationship"
        ],
        "top_employers": [
          "Cyril Amarchand",
          "AZB & Partners",
          "Trilegal",
          "Khaitan & Co"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "ba-llb-hs1",
        "degree_id": "ba-llb",
        "program_name": "Master of Laws (LL.M. Abroad / India)",
        "level": "PG",
        "entrance_exams": [
          "CLAT-PG",
          "LSAT",
          "Direct University Applications"
        ],
        "eligibility_rule": "5-Year Integrated LL.B. with minimum 55% aggregate marks.",
        "typical_duration": "1 Year",
        "top_institutes": [
          "Harvard Law School",
          "Oxford University (BCL)",
          "Cambridge University",
          "NLSIU Bengaluru"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ba-llb-hs2",
        "degree_id": "ba-llb",
        "program_name": "Civil Judge (Junior Division) / Judicial Magistrate",
        "level": "Professional",
        "entrance_exams": [
          "State Judicial Services Examination"
        ],
        "eligibility_rule": "Graduation in Law; enrollment as an advocate.",
        "typical_duration": "Competitive State Exam",
        "top_institutes": [
          "Delhi Judicial Services",
          "Maharashtra Judicial Services",
          "UP PCS-J"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "ba-llb-ct1",
        "degree_id": "ba-llb",
        "cert_name": "All India Bar Examination (AIBE) Certificate of Practice",
        "provider": "Bar Council of India (BCI)",
        "domain": "Statutory License",
        "level": "Beginner",
        "prerequisites": [
          "LL.B. degree from BCI recognized institution"
        ],
        "official_url": "https://www.allindiabarexamination.com",
        "sourceUrl": "https://www.allindiabarexamination.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ba-llb-ct2",
        "degree_id": "ba-llb",
        "cert_name": "Certificate in International Commercial Arbitration",
        "provider": "Singapore International Arbitration Centre (SIAC) / CIArb",
        "domain": "Commercial Arbitration",
        "level": "Advanced",
        "prerequisites": [
          "Law degree or student"
        ],
        "official_url": "https://siac.org.sg",
        "sourceUrl": "https://siac.org.sg",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ba-llb-ct3",
        "degree_id": "ba-llb",
        "cert_name": "WIPO General Course on Intellectual Property (DL-101)",
        "provider": "World Intellectual Property Organization (WIPO)",
        "domain": "Intellectual Property",
        "level": "Beginner",
        "prerequisites": [
          "Open to law students"
        ],
        "official_url": "https://welc.wipo.int",
        "sourceUrl": "https://welc.wipo.int",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "ba-llb-gv1",
        "degree_id": "ba-llb",
        "exam_or_post_name": "State Judicial Services Examination (PCS-J)",
        "conducting_body": "State High Courts & State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "BA LLB",
            "BBA LLB",
            "LL.B."
          ],
          "mandatorySubjects": [
            "Civil Law",
            "Criminal Law",
            "Constitutional Law"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "State judicial cadre entry directly as Judicial Magistrate First Class."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ba-llb-gv2",
        "degree_id": "ba-llb",
        "exam_or_post_name": "SEBI Grade 'A' (Legal Stream) Officer",
        "conducting_body": "Securities and Exchange Board of India (SEBI)",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "Bachelor's Degree in Law (3-Year or 5-Year)"
          ],
          "mandatorySubjects": [
            "Securities Law",
            "Company Law",
            "Constitutional Law"
          ],
          "minMarksPercent": 0,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Central regulatory authority regulating Indian stock exchanges and capital markets."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.sebi.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "ba-llb-sw1",
        "degree_id": "ba-llb",
        "target_role": "Fintech Regulatory Compliance & Licensing Director",
        "pivot_reason": "Channel banking law, payment systems regulations (RBI PSS Act), and data privacy jurisprudence into leading regulatory compliance at fintech unicorns.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "RBI Digital Lending & Payment Aggregator Master Directions",
            "type": "course",
            "detail": "Master RBI licensing rules for Payment Aggregators (PA), NBFCs, and Account Aggregators.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Digital Personal Data Protection Act (DPDPA 2023) Audit",
            "type": "course",
            "detail": "Implement data fiduciary compliance, user consent managers, and data localization protocols.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Fintech Regulatory Licensing Application Capstone",
            "type": "portfolio",
            "detail": "Draft complete RBI Payment Aggregator license application dossier and risk policy for a startup.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Information Privacy Professional (CIPP/A)",
          "Fintech Regulatory Specialist"
        ],
        "why_feasible": "BA LLB graduates understand both constitutional administrative law and financial regulation, making them the premier choice for fintech regulatory counsel.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "ba-llb-ent1",
        "degree_id": "ba-llb",
        "idea_title": "Boutique Corporate Legal Tech & Contract Automation Venture",
        "description": "Build an AI-powered contract abstraction and due-diligence review platform for law firms and corporate legal departments.",
        "first_milestones": [
          "Curate training datasets of standard commercial contracts (NDAs, MSAs, SPAs).",
          "Develop automated redlining and deviation identification algorithms against corporate playbooks.",
          "Pilot the software with 5 mid-tier law firms to accelerate contract review by 60%."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Seed Fund Scheme",
            "agency": "DPIIT",
            "benefits": "Proof of concept and software commercialization grant.",
            "sourceUrl": "https://seedfund.startupindia.gov.in"
          },
          {
            "name": "NASSCOM DeepTech Club",
            "agency": "NASSCOM",
            "benefits": "Enterprise tech client access and venture mentorship.",
            "sourceUrl": "https://nasscom.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "ba-llb",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Humanities, Constitutional Law & Moot Basics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master political philosophy, sociology, torts, and legal writing.",
              "Participate in intra-university moot court competitions and publish case notes."
            ],
            "milestone": "First moot court memorial and published case commentary"
          },
          {
            "stepNumber": 2,
            "title": "Contracts, Company Law & Tier-1 Law Firm Internships",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study corporate law, competition law, and commercial drafting.",
              "Complete mandatory summer internships at NGOs, trial courts, and corporate law firms."
            ],
            "milestone": "Tier-1 law firm summer internship assessment"
          },
          {
            "stepNumber": 3,
            "title": "Criminal & Civil Procedure, International Law & Moots",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Participate in national/international moot court competitions (Jessup, Stetson).",
              "Complete internships at senior advocate chambers and corporate legal departments."
            ],
            "milestone": "National moot court award or published law review article"
          }
        ]
      },
      "completed": {
        "degree_id": "ba-llb",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Corporate Law Firm Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile moot court memorials, law review papers, and transactional internship logs.",
              "Review corporate M&A due diligence checklists and regulatory compliance standards."
            ],
            "milestone": "Tier-1 law firm-ready legal resume"
          },
          {
            "stepNumber": 2,
            "title": "Day Zero Placements & Provisional Bar Registration",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Participate in Day Zero campus interviews for corporate and dispute practices.",
              "Provisionally enroll with State Bar Council and register for AIBE."
            ],
            "milestone": "Placement offer secured from Tier-1 law firm"
          },
          {
            "stepNumber": 3,
            "title": "AIBE Certification & Law Firm Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Clear All India Bar Examination and receive permanent Certificate of Practice.",
              "Join law firm corporate or dispute resolution team as 1st Year Associate."
            ],
            "milestone": "First transactional closing or court hearing completed"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bba-llb",
    "id": "bba-llb",
    "familyId": "law",
    "name": "Bachelor of Business Administration & Bachelor of Laws (5-Year Integrated)",
    "shortName": "BBA LL.B. (Hons)",
    "aliases": [
      "BBA LLB",
      "B.B.A. LL.B.",
      "BBA LLB Hons",
      "Business Law Integrated",
      "bba-llb"
    ],
    "level": "Integrated",
    "discipline": "Law & Legal Studies",
    "duration": "5 Years (10 Semesters)",
    "durationYears": 5,
    "regulator": "BCI",
    "overview": "A 5-year integrated professional program combining business management principles (finance, marketing, human resources) with legal training. It equips students to navigate complex corporate transactions, insolvency proceedings (IBC), mergers, tax structures, and international business regulations.",
    "key_skills": [
      "Corporate Mergers, Acquisitions & Joint Venture Structuring",
      "Insolvency and Bankruptcy Code (IBC) Proceedings & Debt Restructuring",
      "Financial Statement Interpretation & Corporate Valuation for Lawyers",
      "Commercial Arbitration & Cross-Border Contract Negotiations",
      "Competition & Antitrust Regulatory Enforcement (CCI)",
      "Banking Regulations, Securities Laws & Capital Markets (SEBI)"
    ],
    "subjects_taught": [
      "Principles of Management, Marketing & Financial Accounting",
      "Law of Contracts, Torts & Consumer Protection",
      "Corporate Law & Securities Regulations",
      "Insolvency and Bankruptcy Law & Corporate Restructuring",
      "Competition Law & Foreign Exchange Management (FEMA)",
      "Banking Law & Negotiable Instruments Act",
      "Civil & Criminal Procedure Codes and Evidence",
      "Taxation Law (Corporate Income Tax & GST)"
    ],
    "typical_employers": [
      "Tier-1 Law Firms (Khaitan & Co, Cyril Amarchand, Shardul Amarchand, Trilegal)",
      "Big 4 Accounting & Legal Advisory (PwC, EY, Deloitte, KPMG)",
      "In-House Legal Teams of Multi-National Corporates",
      "Insolvency Resolution Professional (IRP) Firms",
      "Investment Banks & Private Equity Funds"
    ],
    "specializations": [
      {
        "id": "bballb-banking",
        "name": "Banking, Finance & Insolvency Law",
        "aliases": [
          "Banking Law"
        ],
        "skillsGained": [
          "IBC Filings",
          "Loan Syndication Agreements"
        ],
        "typicalRoles": [
          "Banking & Finance Legal Associate"
        ]
      },
      {
        "id": "bballb-corporate",
        "name": "Corporate Governance & Securities Law",
        "aliases": [
          "Securities Law"
        ],
        "skillsGained": [
          "SEBI Filings",
          "IPO Prospectus Drafting"
        ],
        "typicalRoles": [
          "Capital Markets Associate"
        ]
      }
    ],
    "sourceUrl": "https://www.barcouncilofindia.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bba-llb-c1",
        "degree_id": "bba-llb",
        "role_title": "Banking & Finance Legal Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Syndicated loan documentation, project finance, and banking regulation coursework directly qualify you for law firm banking practices.",
        "indicative_salary": {
          "min": 10.5,
          "max": 17.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Corporate Law Placement Consortium Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Loan Agreements",
          "Security Creation",
          "FEMA Compliance",
          "Project Finance"
        ],
        "top_employers": [
          "Khaitan & Co",
          "Trilegal",
          "Shardul Amarchand",
          "HDFC Bank Legal"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bba-llb-c2",
        "degree_id": "bba-llb",
        "role_title": "Insolvency & Debt Restructuring Associate",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Detailed training in the Insolvency and Bankruptcy Code (IBC 2016) and NCLT litigation prepares you for debt resolution advisory.",
        "indicative_salary": {
          "min": 9.0,
          "max": 16.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Insolvency Law Industry Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "NCLT Pleadings",
          "IBC Claims Verification",
          "Resolution Plans",
          "Liquidation"
        ],
        "top_employers": [
          "Alvarez & Marsal",
          "Shardul Amarchand",
          "Dua Associates",
          "Grant Thornton"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bba-llb-c3",
        "degree_id": "bba-llb",
        "role_title": "General Counsel (GC) / Chief Legal Officer",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Dual mastery of corporate business P&L dynamics and legal risk mitigation qualifies you for top General Counsel positions at global conglomerates.",
        "indicative_salary": {
          "min": 30.0,
          "max": 85.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "General Counsel India Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Enterprise Legal Risk",
          "Boardroom Governance",
          "M&A Negotiations",
          "Regulatory Defense"
        ],
        "top_employers": [
          "Tata Sons",
          "Reliance Industries",
          "Infosys",
          "Adani Group"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bba-llb-hs1",
        "degree_id": "bba-llb",
        "program_name": "Master of Laws (LL.M. in Corporate & Commercial Law)",
        "level": "PG",
        "entrance_exams": [
          "CLAT-PG",
          "Direct Global Applications"
        ],
        "eligibility_rule": "5-Year Integrated Law degree with minimum 55% marks.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "NLSIU Bengaluru",
          "NALSAR Hyderabad",
          "London School of Economics (LL.M.)",
          "New York University (NYU Law)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bba-llb-hs2",
        "degree_id": "bba-llb",
        "program_name": "Insolvency Professional Examination (Insolvency Bankruptcy Board of India)",
        "level": "Professional",
        "entrance_exams": [
          "IBBI Exam"
        ],
        "eligibility_rule": "Degree in Law with 10 years experience or post-graduate legal practice.",
        "typical_duration": "Professional Credential",
        "top_institutes": [
          "Insolvency and Bankruptcy Board of India (IBBI)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bba-llb-ct1",
        "degree_id": "bba-llb",
        "cert_name": "All India Bar Examination (AIBE) Certificate",
        "provider": "Bar Council of India",
        "domain": "Advocate License",
        "level": "Beginner",
        "prerequisites": [
          "Integrated law degree"
        ],
        "official_url": "https://www.allindiabarexamination.com",
        "sourceUrl": "https://www.allindiabarexamination.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bba-llb-ct2",
        "degree_id": "bba-llb",
        "cert_name": "Certificate in Mergers & Acquisitions and Due Diligence",
        "provider": "National Law University / Enhelion",
        "domain": "M&A Law",
        "level": "Intermediate",
        "prerequisites": [
          "Law degree or student"
        ],
        "official_url": "https://enhelion.com",
        "sourceUrl": "https://enhelion.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bba-llb-ct3",
        "degree_id": "bba-llb",
        "cert_name": "Insolvency & Bankruptcy Code Practice Specialist",
        "provider": "Indian Institute of Corporate Affairs (IICA)",
        "domain": "Insolvency Law",
        "level": "Intermediate",
        "prerequisites": [
          "Law or finance degree"
        ],
        "official_url": "https://iica.nic.in",
        "sourceUrl": "https://iica.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bba-llb-gv1",
        "degree_id": "bba-llb",
        "exam_or_post_name": "Law Officer - Public Sector Banks (IBPS SO Legal)",
        "conducting_body": "IBPS",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "Bachelor's Degree in Law (LLB / Integrated LLB)"
          ],
          "mandatorySubjects": [
            "Banking Law",
            "Commercial Law"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Specialist legal officer scale I managing legal recovery and SARFAESI compliance for public sector banks."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.ibps.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bba-llb-gv2",
        "degree_id": "bba-llb",
        "exam_or_post_name": "Competition Commission of India (CCI) - Research Associate (Law)",
        "conducting_body": "CCI / Ministry of Corporate Affairs",
        "eligibility_rule": {
          "degreeFamily": "Law",
          "allowedDegrees": [
            "Degree in Law with specialization in Corporate/Competition Law"
          ],
          "mandatorySubjects": [
            "Competition Law",
            "Corporate Law"
          ],
          "minMarksPercent": 60,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Statutory central authority investigating antitrust and anti-competitive trade practices."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://www.cci.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bba-llb-sw1",
        "degree_id": "bba-llb",
        "target_role": "Private Equity Deal Structuring & Term Sheet Negotiator",
        "pivot_reason": "Leverage financial acumen, shareholder agreement mechanics, and minority protection clauses into structuring venture capital and private equity deals.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Private Equity Investment Agreements & Governance",
            "type": "course",
            "detail": "Draft Share Subscription Agreements (SSA), Shareholders Agreements (SHA), and affirmative voting rights.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Financial Due Diligence & Valuation Metrics",
            "type": "course",
            "detail": "Learn EBITDA adjustments, enterprise value to equity bridge, and representations/warranties.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "PE Investment Agreement Redline Capstone",
            "type": "portfolio",
            "detail": "Deliver complete redlined draft of an SHA representing a growth-stage private equity investor.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "PE Deal Structuring Specialist",
          "Advanced Corporate Contracts"
        ],
        "why_feasible": "BBA LLB graduates combine commercial financial knowledge with ironclad legal drafting, making them ideal deal navigators.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bba-llb-ent1",
        "degree_id": "bba-llb",
        "idea_title": "Corporate Governance & Compliance Automation Firm",
        "description": "Offer outsourced company secretarial audit, board resolution tracking, and SEBI/FEMA statutory filing management for high-growth tech firms.",
        "first_milestones": [
          "Build a digital compliance calendar and statutory board documentation repository.",
          "Onboard 10 venture-funded startups as monthly corporate governance retainers.",
          "Scale service to handle foreign direct investment (FDI) reporting on the RBI FIRMS portal."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Incentives and regulatory assistance.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "Stand Up India Scheme",
            "agency": "SIDBI",
            "benefits": "Bank loans between 10 Lakhs and 1 Crore for setting up legal professional firms.",
            "sourceUrl": "https://www.standupmitra.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bba-llb",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Business Principles, Contracts & Legal Writing",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master management economics, financial accounting, torts, and legal writing methods.",
              "Draft commercial contracts and participate in corporate moot competitions."
            ],
            "milestone": "Commercial contract drafting portfolio verified"
          },
          {
            "stepNumber": 2,
            "title": "Corporate Law, Banking & Law Firm Internships",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study company law, banking regulations, and commercial arbitration frameworks.",
              "Complete summer internships at national corporate law firms or corporate legal teams."
            ],
            "milestone": "Law firm corporate internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "M&A, IBC Practice & Capital Markets Moots",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Learn insolvency resolution procedures, cross-border mergers, and SEBI regulations.",
              "Compete in corporate restructuring or arbitration national moot court competitions."
            ],
            "milestone": "National corporate moot court award / paper publication"
          }
        ]
      },
      "completed": {
        "degree_id": "bba-llb",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Corporate Deal Resume & Placement Preparation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile transaction summaries, due diligence checklists, and commercial drafting samples.",
              "Review Indian Companies Act 2013 and SEBI takeover regulations."
            ],
            "milestone": "Corporate finance law resume"
          },
          {
            "stepNumber": 2,
            "title": "Corporate Day Zero Placements & Bar Enrollment",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Participate in Day Zero law firm campus interviews for corporate and finance desks.",
              "Provisionally enroll with State Bar Council and register for AIBE."
            ],
            "milestone": "Tier-1 corporate law firm placement offer secured"
          },
          {
            "stepNumber": 3,
            "title": "AIBE Certification & Associate Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Pass All India Bar Examination and receive permanent Certificate of Practice.",
              "Join corporate transactional practice desk, conduct due diligence, and draft agreements."
            ],
            "milestone": "Completed first live corporate deal closing"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bcom-llb",
    "id": "bcom-llb",
    "familyId": "law",
    "name": "Bachelor of Commerce & Bachelor of Laws (5-Year Integrated)",
    "shortName": "B.Com LL.B. (Hons)",
    "aliases": [
      "BCom LLB",
      "B.Com. LL.B.",
      "BCom LLB Hons",
      "Taxation Law Integrated",
      "bcom-llb"
    ],
    "level": "Integrated",
    "discipline": "Law & Legal Studies",
    "duration": "5 Years (10 Semesters)",
    "durationYears": 5,
    "regulator": "BCI",
    "overview": "A specialized 5-year integrated double degree merging commercial accountancy, financial auditing, and taxation with full legal jurisprudence. It equips candidates to excel in corporate tax litigation, GST tribunals, customs law, white-collar crime defense, and commercial arbitration.",
    "key_skills": [
      "Corporate Direct & Indirect Tax Litigation (ITAT, GST Tribunals)",
      "Financial Statement Auditing & Accounting Evidence for Courtrooms",
      "Customs, Foreign Trade Policy & Cross-Border Transfer Pricing",
      "White-Collar Economic Crime Defense & PMLA Investigations",
      "Commercial Arbitration & Recovery Proceedings (DRT / NCLT)",
      "Corporate Mergers, Demergers & Stamp Duty Structuring"
    ],
    "subjects_taught": [
      "Financial Accounting & Corporate Financial Reporting",
      "Auditing Principles & Cost Accounting",
      "Law of Contracts & Specific Relief Act",
      "Corporate Law & Securities Regulations",
      "Direct Tax Law & Income Tax Appellate Procedures",
      "Indirect Tax Law: GST, Customs & International Trade",
      "Economic Offenses, Prevention of Money Laundering Act (PMLA)",
      "Civil & Criminal Procedure and Law of Evidence"
    ],
    "typical_employers": [
      "Big 4 Tax & Legal Advisory (Deloitte, PwC, EY, KPMG)",
      "Specialized Tax Law Chambers (ITAT / High Court)",
      "Tier-1 Law Firms (Direct & Indirect Tax Teams)",
      "Corporate Taxation Departments",
      "Enforcement Directorate / Revenue Service Support"
    ],
    "specializations": [
      {
        "id": "bcomllb-tax",
        "name": "Tax Litigation & Appellate Advocacy",
        "aliases": [
          "Tax Law"
        ],
        "skillsGained": [
          "ITAT Appeals",
          "GST Writ Petitions"
        ],
        "typicalRoles": [
          "Tax Litigation Associate"
        ]
      },
      {
        "id": "bcomllb-whitecollar",
        "name": "White-Collar Crime & Financial Fraud",
        "aliases": [
          "White Collar Defense"
        ],
        "skillsGained": [
          "PMLA Defense",
          "SFIO Inquiries"
        ],
        "typicalRoles": [
          "Financial Fraud Legal Specialist"
        ]
      }
    ],
    "sourceUrl": "https://www.barcouncilofindia.org",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bcom-llb-c1",
        "degree_id": "bcom-llb",
        "role_title": "Taxation Legal Associate (Direct / Indirect Tax)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Combining financial accounting with tax law directly qualifies you for handling corporate tax appeals before Commissioners and ITAT.",
        "indicative_salary": {
          "min": 7.0,
          "max": 14.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Tax Law Industry Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Tax Appeals",
          "GST Tribunals",
          "Transfer Pricing",
          "Legal Drafting"
        ],
        "top_employers": [
          "Deloitte Tax",
          "EY Tax",
          "Khaitan & Co",
          "Lakshmikumaran & Sridharan"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bcom-llb-c2",
        "degree_id": "bcom-llb",
        "role_title": "White-Collar Defense & Financial Regulatory Associate",
        "tier": "entry",
        "employer_type": "self",
        "career_type": "Direct",
        "match_rationale": "Auditing methods, forensic ledger evidence, and corporate crime statutes prepare you for handling PMLA and SFIO financial inquiries.",
        "indicative_salary": {
          "min": 6.5,
          "max": 13.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "White-Collar Defense Compensation Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "PMLA Proceedings",
          "ED Inquiries",
          "Forensic Accounting",
          "Bail Applications"
        ],
        "top_employers": [
          "Senior Tax Counsel Chambers",
          "Shardul Amarchand",
          "Boutique Criminal Law Chambers"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bcom-llb-c3",
        "degree_id": "bcom-llb",
        "role_title": "Senior Tax Partner / Designated Tax Senior Counsel",
        "tier": "senior",
        "employer_type": "self",
        "career_type": "Advanced",
        "match_rationale": "Commanding multi-crore transfer pricing disputes, High Court tax writ petitions, and Supreme Court constitutional tax benches qualifies you for top tax leadership.",
        "indicative_salary": {
          "min": 30.0,
          "max": 90.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Tax Counsel Earnings Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Supreme Court Tax Benches",
          "Transfer Pricing Appeals",
          "High-Stakes Arbitrations",
          "Chambers Management"
        ],
        "top_employers": [
          "Supreme Court Bar",
          "Lakshmikumaran & Sridharan",
          "PwC Legal"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bcom-llb-hs1",
        "degree_id": "bcom-llb",
        "program_name": "Master of Laws (LL.M. in International Taxation / Corporate Law)",
        "level": "PG",
        "entrance_exams": [
          "CLAT-PG",
          "International Applications"
        ],
        "eligibility_rule": "5-Year Integrated Law degree with minimum 55% aggregate marks.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "Leiden University (International Tax)",
          "Vienna University of Economics",
          "NLSIU Bengaluru",
          "WBNUJS Kolkata"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bcom-llb-hs2",
        "degree_id": "bcom-llb",
        "program_name": "Chartered Accountancy (CA) / Company Secretary (CS)",
        "level": "Professional",
        "entrance_exams": [
          "ICAI",
          "ICSI"
        ],
        "eligibility_rule": "Commerce and law graduates receive exemptions and direct entry into intermediate professional levels.",
        "typical_duration": "2-3 Years",
        "top_institutes": [
          "Institute of Chartered Accountants of India (ICAI)",
          "ICSI"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bcom-llb-ct1",
        "degree_id": "bcom-llb",
        "cert_name": "All India Bar Examination (AIBE) Certificate",
        "provider": "Bar Council of India",
        "domain": "Advocate License",
        "level": "Beginner",
        "prerequisites": [
          "Law graduate"
        ],
        "official_url": "https://www.allindiabarexamination.com",
        "sourceUrl": "https://www.allindiabarexamination.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bcom-llb-ct2",
        "degree_id": "bcom-llb",
        "cert_name": "Advanced Certificate in International Tax & Transfer Pricing",
        "provider": "Chartered Institute of Taxation (CIOT UK) - ADIT",
        "domain": "International Tax",
        "level": "Advanced",
        "prerequisites": [
          "Degree in law or accounting"
        ],
        "official_url": "https://www.tax.org.uk/adit",
        "sourceUrl": "https://www.tax.org.uk/adit",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bcom-llb-ct3",
        "degree_id": "bcom-llb",
        "cert_name": "Certified Anti-Money Laundering Specialist (ACAMS)",
        "provider": "ACAMS",
        "domain": "Financial Crime",
        "level": "Intermediate",
        "prerequisites": [
          "Degree in commerce or law"
        ],
        "official_url": "https://www.acams.org",
        "sourceUrl": "https://www.acams.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bcom-llb-gv1",
        "degree_id": "bcom-llb",
        "exam_or_post_name": "Income Tax Appellate Tribunal (ITAT) - Judicial Member",
        "conducting_body": "Ministry of Law & Justice / Appointments Committee of Cabinet",
        "eligibility_rule": {
          "degreeFamily": "Law / Taxation",
          "allowedDegrees": [
            "Degree in Law + 10 Years Practice as Tax Advocate"
          ],
          "mandatorySubjects": [
            "Direct Taxes",
            "Constitutional Law"
          ],
          "minMarksPercent": 0,
          "ageLimitRule": {
            "general": 50,
            "obc": 50,
            "sc_st": 50
          },
          "notes": "Statutory appellate judicial body hearing direct tax appeals against Commissioner orders."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://itat.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bcom-llb-gv2",
        "degree_id": "bcom-llb",
        "exam_or_post_name": "Indian Revenue Service (IRS - Income Tax & Customs) via UPSC CSE",
        "conducting_body": "UPSC",
        "eligibility_rule": {
          "degreeFamily": "General Graduate",
          "allowedDegrees": [
            "Any Bachelor's Degree; law & commerce is ideal background"
          ],
          "mandatorySubjects": [
            "Law / Commerce (Optional Paper)"
          ],
          "minMarksPercent": 0,
          "ageLimitRule": {
            "general": 32,
            "obc": 35,
            "sc_st": 37
          },
          "notes": "Premier Group 'A' service administering direct taxes, GST, and customs across India."
        },
        "is_generalist_fallback": true,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bcom-llb-sw1",
        "degree_id": "bcom-llb",
        "target_role": "Corporate M&A Tax Structuring Specialist",
        "pivot_reason": "Apply balance-sheet demerger mechanics, capital gains tax exemptions (Section 47 of Income Tax Act), and stamp duty laws to structuring tax-neutral corporate mergers.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Corporate Demergers & Slump Sale Tax Structuring",
            "type": "course",
            "detail": "Master tax neutral corporate reorganizations, Section 72A loss carry-forward, and NCLT approval schemes.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Cross-Border Tax Treaties & DTAA Structuring",
            "type": "course",
            "detail": "Learn Double Taxation Avoidance Agreements (DTAA), BEPS Action Plans, and General Anti-Avoidance Rules (GAAR).",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Corporate Tax Structuring Memo Capstone",
            "type": "portfolio",
            "detail": "Author complete tax step-plan memorandum for an Indian enterprise acquiring a European software subsidiary.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Advanced International Tax Certificate",
          "M&A Structuring Specialist"
        ],
        "why_feasible": "B.Com LL.B. graduates uniquely speak both the accountant's financial language and the attorney's statutory interpretation language.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bcom-llb-ent1",
        "degree_id": "bcom-llb",
        "idea_title": "Tax Litigation & Appellate Advisory Practice",
        "description": "Establish a specialized legal chambers focusing exclusively on GST dispute appeals, corporate income tax tribunal representation, and customs clearances.",
        "first_milestones": [
          "Set up tax research library with complete ITAT and High Court tax reporter series.",
          "Empanel with 20 Chartered Accountant firms as their outsourced litigation counsel for tribunal hearings.",
          "Build an active tax appellate practice before the Commissioner (Appeals) and Appellate Tribunals."
        ],
        "relevant_schemes": [
          {
            "name": "Bar Council Welfare Scheme",
            "agency": "State Bar Councils",
            "benefits": "Advocate social security and professional legal practice support.",
            "sourceUrl": "https://www.barcouncilofindia.org"
          },
          {
            "name": "MUDRA Scheme (Tarun)",
            "agency": "MUDRA Bank",
            "benefits": "Loans up to 10 Lakhs for establishing professional legal advisory offices.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bcom-llb",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Accounting Ledgers, Commercial Law & Research",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master financial accounting, company law, contracts, and legal citation formats.",
              "Draft sample commercial agreements and analyze audited balance sheets."
            ],
            "milestone": "Audited balance sheet review and legal memorandum verified"
          },
          {
            "stepNumber": 2,
            "title": "Direct Taxes, Corporate Law & Tax Firm Internships",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Study corporate income tax, transfer pricing, and SEBI regulations.",
              "Complete summer internships at a Big 4 tax practice or specialized tax litigation chambers."
            ],
            "milestone": "Tax practice summer internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "GST Litigation, White-Collar Crime & National Moots",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Learn GST appellate procedure, PMLA anti-money laundering frameworks, and court advocacy.",
              "Participate in national tax moot court competitions and publish tax law articles."
            ],
            "milestone": "National tax moot award and published tax commentary"
          }
        ]
      },
      "completed": {
        "degree_id": "bcom-llb",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Tax Law Resume Compilation & Placement Drives",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document tax litigation briefs, financial accounting proficiencies, and transfer pricing case studies.",
              "Review fundamental direct tax case laws and GST procedural sections."
            ],
            "milestone": "Taxation law practice resume"
          },
          {
            "stepNumber": 2,
            "title": "Day Zero Tax Placements & Bar Enrollment",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Participate in campus placement interviews with Big 4 tax practices and tier-1 law firms.",
              "Provisionally enroll with State Bar Council and register for AIBE."
            ],
            "milestone": "Placement offer secured from Big 4 tax or law firm"
          },
          {
            "stepNumber": 3,
            "title": "AIBE Certification & Tax Associate Onboarding",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Pass All India Bar Examination and receive permanent Certificate of Practice.",
              "Join tax practice desk, draft appellate replies, and appear before tax commissioners."
            ],
            "milestone": "Argued first tax appeal before Appellate Commissioner"
          }
        ]
      }
    }
  }
];
