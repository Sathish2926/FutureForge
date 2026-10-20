import { UniversalDegreeRecord } from "./types";

export const EDUCATION_DEGREES: UniversalDegreeRecord[] = [
  {
    "degree_id": "bed",
    "id": "bed",
    "familyId": "education",
    "name": "Bachelor of Education",
    "shortName": "B.Ed.",
    "aliases": [
      "B.Ed",
      "BEd",
      "Bachelor of Education",
      "Teacher Training",
      "bed"
    ],
    "level": "UG",
    "discipline": "Education & Pedagogy",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "NCTE",
    "overview": "A mandatory professional teacher education program recognized by the National Council for Teacher Education (NCTE). It trains graduates in instructional pedagogy, child psychology, learning theories, inclusive education, educational evaluation, and classroom management for secondary and senior secondary schools.",
    "key_skills": [
      "Pedagogical Instruction Design & Lesson Plan Construction",
      "Child Psychology, Cognitive Development & Learning Styles",
      "Classroom Management, Formative & Summative Assessment",
      "Inclusive Education & Differentiated Learning Strategies",
      "Educational Technology (EdTech) Integration & Smart Classrooms",
      "Diagnostic Teaching & Remedial Learning Intervention"
    ],
    "subjects_taught": [
      "Childhood and Growing Up (Educational Psychology)",
      "Contemporary India and Education & National Education Policy",
      "Learning and Teaching Theories & Cognition",
      "Pedagogy of School Subject I & II (Science, Maths, Social Science, Languages)",
      "Assessment for Learning & Evaluation Metrics",
      "Creating an Inclusive School & Gender Studies",
      "School Internship & Reflective Teaching Practicum"
    ],
    "typical_employers": [
      "Kendriya Vidyalaya Sangathan (KVS)",
      "Navodaya Vidyalaya Samiti (NVS)",
      "Delhi Subordinate Services Selection Board (DSSSB)",
      "State Government Secondary Schools",
      "Top Private K-12 Chains (DPS, DAV, Ryan)",
      "EdTech Learning Platforms"
    ],
    "specializations": [
      {
        "id": "bed-stem",
        "name": "STEM & Mathematics Pedagogy",
        "aliases": [
          "Science Pedagogy"
        ],
        "skillsGained": [
          "STEM Inquiry",
          "Lab Demonstrations"
        ],
        "typicalRoles": [
          "Trained Graduate Teacher (TGT) Science/Maths"
        ]
      },
      {
        "id": "bed-humanities",
        "name": "Social Science & Language Pedagogy",
        "aliases": [
          "Social Science Pedagogy"
        ],
        "skillsGained": [
          "Critical Thinking",
          "Language Acquisition"
        ],
        "typicalRoles": [
          "TGT Social Studies / English"
        ]
      }
    ],
    "sourceUrl": "https://ncte.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bed-c1",
        "degree_id": "bed",
        "role_title": "Trained Graduate Teacher (TGT) / Secondary Teacher",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "NCTE-mandated school subject pedagogy, classroom management, and learning assessment directly qualify you for government TGT posts.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "7th Central Pay Commission (Level 7) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Lesson Planning",
          "Classroom Delivery",
          "Formative Assessment",
          "NEP 2020"
        ],
        "top_employers": [
          "Kendriya Vidyalaya",
          "Navodaya Vidyalaya",
          "State Government Schools"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bed-c2",
        "degree_id": "bed",
        "role_title": "Senior Secondary School Teacher (PGT - with Master's)",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Combining disciplinary mastery with pedagogical methodologies and adolescent guidance enables senior secondary high school instruction.",
        "indicative_salary": {
          "min": 4.0,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Private School Educators Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Curriculum Delivery",
          "Board Exam Prep",
          "Adolescent Mentoring",
          "Smart Class"
        ],
        "top_employers": [
          "Delhi Public School",
          "DAV Public Schools",
          "The Heritage School"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bed-c3",
        "degree_id": "bed",
        "role_title": "School Principal / Director of Academic Pedagogy",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of academic leadership, curriculum design, institutional CBSE/ICSE affiliation management, and teacher training qualifies you for school principalship.",
        "indicative_salary": {
          "min": 14.0,
          "max": 30.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "K-12 Leadership Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "School Administration",
          "CBSE Affiliation Norms",
          "Curriculum Strategy",
          "Faculty Development"
        ],
        "top_employers": [
          "Top International K-12 Schools",
          "Heritage Xperiential",
          "Ryan International"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bed-hs1",
        "degree_id": "bed",
        "program_name": "Master of Education (M.Ed.)",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG",
          "State M.Ed Entrance Tests"
        ],
        "eligibility_rule": "B.Ed. / B.El.Ed. / D.El.Ed. with undergraduate degree with minimum 50% marks from an NCTE-recognized institution.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Central Institute of Education (CIE Delhi University)",
          "BHU Varanasi",
          "Jamia Millia Islamia",
          "Regional Institutes of Education (NCERT)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bed-hs2",
        "degree_id": "bed",
        "program_name": "Master of Arts in Education (M.A. Education)",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG",
          "TISS-NET"
        ],
        "eligibility_rule": "Bachelor's degree in any discipline with preference for education and social sciences.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Tata Institute of Social Sciences (TISS)",
          "Azim Premji University",
          "Delhi University"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bed-ct1",
        "degree_id": "bed",
        "cert_name": "Central Teacher Eligibility Test (CTET Paper II - Elementary)",
        "provider": "Central Board of Secondary Education (CBSE)",
        "domain": "Statutory Teacher Eligibility",
        "level": "Beginner",
        "prerequisites": [
          "B.Ed or final year student"
        ],
        "official_url": "https://ctet.nic.in",
        "sourceUrl": "https://ctet.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bed-ct2",
        "degree_id": "bed",
        "cert_name": "Google Certified Educator (Level 1 & 2)",
        "provider": "Google for Education",
        "domain": "Educational Technology",
        "level": "Beginner",
        "prerequisites": [
          "Basic internet and Google tools"
        ],
        "official_url": "https://edu.google.com/teacher-center/certifications/",
        "sourceUrl": "https://edu.google.com/teacher-center/certifications/",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bed-ct3",
        "degree_id": "bed",
        "cert_name": "Certificate in Special Education & Inclusive Classrooms",
        "provider": "Rehabilitation Council of India (RCI) / Coursera",
        "domain": "Inclusive Education",
        "level": "Intermediate",
        "prerequisites": [
          "Teacher training background"
        ],
        "official_url": "https://rehabcouncil.nic.in",
        "sourceUrl": "https://rehabcouncil.nic.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bed-gv1",
        "degree_id": "bed",
        "exam_or_post_name": "Kendriya Vidyalaya Sangathan (KVS) - Trained Graduate Teacher (TGT)",
        "conducting_body": "KVS / CBSE",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "B.Ed + CTET Paper II Qualified"
          ],
          "mandatorySubjects": [
            "Teaching Methodology",
            "Concerned Subject"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Nationwide centralized recruitment for teachers across all central government Kendriya Vidyalayas."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://kvsangathan.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bed-gv2",
        "degree_id": "bed",
        "exam_or_post_name": "Delhi Subordinate Services Selection Board (DSSSB) - TGT",
        "conducting_body": "DSSSB Delhi",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "B.Ed + CTET Paper II"
          ],
          "mandatorySubjects": [
            "Subject Pedagogy",
            "General Awareness"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Recruitment for Directorate of Education, Government of NCT of Delhi."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://dsssb.delhi.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bed-sw1",
        "degree_id": "bed",
        "target_role": "EdTech Instructional Designer & Curriculum Architect",
        "pivot_reason": "Translate lesson planning, Bloom's taxonomy, and formative assessment design into digital learning modules and gamified educational app software.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Instructional Design Models (ADDIE, SAM) & Storyboarding",
            "type": "course",
            "detail": "Learn learning objectives mapping, interactive branching scenarios, and microlearning.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "E-Learning Authoring Tools (Articulate Storyline 360)",
            "type": "course",
            "detail": "Build interactive software simulations, SCORM-compliant quizzes, and LMS modules.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Interactive STEM Learning Module Capstone",
            "type": "portfolio",
            "detail": "Deliver complete gamified 10-lesson interactive science module for an EdTech platform.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Articulate Storyline Certified Associate",
          "Instructional Design Certificate"
        ],
        "why_feasible": "Teachers possess deep psychological understanding of how students actually learn, making them far better instructional designers than generic digital animators.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bed-ent1",
        "degree_id": "bed",
        "idea_title": "Remedial Learning & STEM After-School Academy",
        "description": "Establish a tech-enabled experiential learning and remedial learning center for children struggling with foundational numeracy and reading literacy.",
        "first_milestones": [
          "Set up learning studio with hands-on manipulatives, phonics kits, and digital tablets.",
          "Conduct diagnostic literacy assessments for 100 students in the local community.",
          "Achieve steady enrollment of 60 students in structured after-school remediation batches."
        ],
        "relevant_schemes": [
          {
            "name": "NIPUN Bharat Mission",
            "agency": "Ministry of Education",
            "benefits": "Curriculum resources and community foundation learning advocacy.",
            "sourceUrl": "https://dsel.education.gov.in"
          },
          {
            "name": "MUDRA Scheme (Shishu / Kishore)",
            "agency": "MUDRA Bank",
            "benefits": "Low-interest loans up to 5 Lakhs for educational equipment.",
            "sourceUrl": "https://www.mudra.org.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bed",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Child Psychology, Pedagogy & Micro-Teaching",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master Bloom's taxonomy, constructivist learning, and simulated micro-teaching with peers.",
              "Design structured lesson plans with audio-visual aids and clear learning outcomes."
            ],
            "milestone": "Micro-teaching demonstration and lesson plan record verified"
          },
          {
            "stepNumber": 2,
            "title": "School Internship & Teaching Practicum",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Conduct daily classroom teaching at an assigned government or private practice school.",
              "Complete 16-week mandatory school internship, student case study, and diagnostic remedial test."
            ],
            "milestone": "School internship logbook and mentoring appraisal completed"
          },
          {
            "stepNumber": 3,
            "title": "CTET Examination & Teacher Recruitment Preparation",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Clear CTET Paper II (Elementary) with high percentile in pedagogy and subject domain.",
              "Prepare for KVS, NVS, and state TGT recruitment examinations."
            ],
            "milestone": "CTET Paper II qualification certificate secured"
          }
        ]
      },
      "completed": {
        "degree_id": "bed",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Teaching Portfolio & Resume Refinement",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile lesson plans, rubrics, innovative teaching aids, and video teaching clips.",
              "Review educational policies (NEP 2020, RTE Act 2009) and inclusive teaching strategies."
            ],
            "milestone": "Professional secondary educator portfolio"
          },
          {
            "stepNumber": 2,
            "title": "KVS / Private School Teacher Placement Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for TGT teaching vacancies in leading school chains and central school boards.",
              "Conduct live demo teaching sessions and face interview panels."
            ],
            "milestone": "Appointment letter secured as Secondary School Teacher"
          },
          {
            "stepNumber": 3,
            "title": "Teacher Onboarding & Continuous Professional Development",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join school faculty, take independent charge of classes, and mentor students.",
              "Engage in NISHTHA teacher training modules and pursue M.Ed. programs."
            ],
            "milestone": "Completed successful academic year with high student outcomes"
          }
        ]
      }
    }
  },
  {
    "degree_id": "bped",
    "id": "bped",
    "familyId": "education",
    "name": "Bachelor of Physical Education",
    "shortName": "B.P.Ed.",
    "aliases": [
      "BPED",
      "B.P.Ed",
      "Bachelor of Physical Education",
      "Physical Education Teacher",
      "bped"
    ],
    "level": "UG",
    "discipline": "Education & Pedagogy",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "NCTE",
    "overview": "A specialized professional teacher education program recognized by NCTE for training physical education teachers, sports coaches, and athletic directors. It covers exercise physiology, sports biomechanics, kinesiology, athletic injury management, tournament officiating, and adapted physical education.",
    "key_skills": [
      "Sports Officiating, Rules & Tournament Organization",
      "Exercise Physiology, Conditioning & Athletic Training",
      "Sports Biomechanics, Kinematics & Movement Analysis",
      "First Aid, CPR & Sports Injury Prevention / Rehabilitation",
      "Physical Fitness Testing & Motor Ability Assessment",
      "Adapted Physical Education for Children with Special Needs"
    ],
    "subjects_taught": [
      "History, Principles & Foundation of Physical Education",
      "Anatomy, Physiology & Exercise Physiology",
      "Kinesiology & Biomechanics in Sports",
      "Methods of Teaching in Physical Education & Track & Field",
      "Sports Nutrition, Weight Management & Athletic Conditioning",
      "Sports Training, Officiating & Sports Management"
    ],
    "typical_employers": [
      "Sports Authority of India (SAI)",
      "Kendriya Vidyalaya Sangathan (KVS - PET)",
      "Armed Forces & Paramilitary Forces (Sports Cadre)",
      "Private K-12 Schools (Physical Education Department)",
      "Professional Sports Academies & Fitness Franchises"
    ],
    "specializations": [
      {
        "id": "bped-coaching",
        "name": "Sports Coaching & Athletic Conditioning",
        "aliases": [
          "Athletic Coaching"
        ],
        "skillsGained": [
          "Tactical Drills",
          "Periodization"
        ],
        "typicalRoles": [
          "Sports Coach"
        ]
      },
      {
        "id": "bped-fitness",
        "name": "Fitness Management & Exercise Science",
        "aliases": [
          "Fitness Training"
        ],
        "skillsGained": [
          "Strength Training",
          "Rehabilitation"
        ],
        "typicalRoles": [
          "Fitness Director"
        ]
      }
    ],
    "sourceUrl": "https://ncte.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "bped-c1",
        "degree_id": "bped",
        "role_title": "Physical Education Teacher (PET) - Secondary / Senior Secondary",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "NCTE-mandated physical training curriculum, sports coaching, and school tournament management directly qualify you for government PET vacancies.",
        "indicative_salary": {
          "min": 4.5,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "7th Pay Commission Pay Matrix (Level 7) (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Sports Officiating",
          "Physical Drills",
          "Athletic Safety",
          "Fitness Testing"
        ],
        "top_employers": [
          "Kendriya Vidyalaya",
          "Navodaya Vidyalaya",
          "State Government Schools"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bped-c2",
        "degree_id": "bped",
        "role_title": "Strength & Conditioning Coach / Sports Academy Trainer",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Exercise physiology, biomechanics, and athletic periodization coursework prepare you for junior national athletes and commercial academies.",
        "indicative_salary": {
          "min": 4.0,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Sports Training Industry Report (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Periodization",
          "Strength Training",
          "Injury Prevention",
          "Agility Drills"
        ],
        "top_employers": [
          "Sports Authority of India (SAI)",
          "Reliance Foundation Youth Sports",
          "Jindal Sports (JSW)"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bped-c3",
        "degree_id": "bped",
        "role_title": "Director of Physical Education & Sports / High-Performance Lead",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Over a decade of collegiate sports administration, national games management, and Olympic sports development qualifies you for high-performance leadership.",
        "indicative_salary": {
          "min": 14.0,
          "max": 32.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Collegiate Sports Director Salary Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "High Performance Training",
          "Sports Budgeting",
          "National Federation Liaison",
          "Strategic Leadership"
        ],
        "top_employers": [
          "Universities",
          "State Sports Directorates",
          "National Sports Federations"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "bped-hs1",
        "degree_id": "bped",
        "program_name": "Master of Physical Education (M.P.Ed.)",
        "level": "PG",
        "entrance_exams": [
          "CUET-PG",
          "LNIPE Entrance Exam"
        ],
        "eligibility_rule": "B.P.Ed. degree from an NCTE-recognized institution with minimum 50% marks.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Lakshmibai National Institute of Physical Education (LNIPE Gwalior)",
          "Indira Gandhi Institute of Physical Education (Delhi University)",
          "BHU Varanasi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bped-hs2",
        "degree_id": "bped",
        "program_name": "Diploma in Sports Coaching (NIS Coaching Diploma)",
        "level": "PG",
        "entrance_exams": [
          "Netaji Subhas National Institute of Sports (NS NIS Patiala) Entrance"
        ],
        "eligibility_rule": "Graduate degree with high-level sports achievement (state/national participation).",
        "typical_duration": "1 Year",
        "top_institutes": [
          "NS NIS Patiala",
          "SAI Regional Centres (Bangalore, Kolkata)"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "bped-ct1",
        "degree_id": "bped",
        "cert_name": "Certified Strength & Conditioning Specialist (CSCS)",
        "provider": "National Strength and Conditioning Association (NSCA)",
        "domain": "Strength & Conditioning",
        "level": "Advanced",
        "prerequisites": [
          "Degree in physical education or kinesiology"
        ],
        "official_url": "https://www.nsca.com",
        "sourceUrl": "https://www.nsca.com",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bped-ct2",
        "degree_id": "bped",
        "cert_name": "Sports First Aid & Automated External Defibrillator (AED)",
        "provider": "Red Cross / St. John Ambulance",
        "domain": "Sports Medicine",
        "level": "Beginner",
        "prerequisites": [
          "Open to physical education students"
        ],
        "official_url": "https://www.redcross.org",
        "sourceUrl": "https://www.redcross.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "bped-ct3",
        "degree_id": "bped",
        "cert_name": "National Federation Officiating Certificate (Athletics / Football / Cricket)",
        "provider": "Athletics Federation of India (AFI) / AIFF",
        "domain": "Sports Officiating",
        "level": "Intermediate",
        "prerequisites": [
          "B.P.Ed or active athlete"
        ],
        "official_url": "https://indianathletics.in",
        "sourceUrl": "https://indianathletics.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "bped-gv1",
        "degree_id": "bped",
        "exam_or_post_name": "Kendriya Vidyalaya Sangathan (KVS) - Physical Education Teacher (TGT P&HE)",
        "conducting_body": "KVS / CBSE",
        "eligibility_rule": {
          "degreeFamily": "Physical Education",
          "allowedDegrees": [
            "Bachelor's Degree in Physical Education (B.P.Ed)"
          ],
          "mandatorySubjects": [
            "Physical Education",
            "Sports Science"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Central government recruitment for Physical and Health Education teachers across KVS."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://kvsangathan.nic.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "bped-gv2",
        "degree_id": "bped",
        "exam_or_post_name": "Sports Authority of India (SAI) - Assistant Coach",
        "conducting_body": "SAI / Ministry of Youth Affairs and Sports",
        "eligibility_rule": {
          "degreeFamily": "Physical Education / Sports",
          "allowedDegrees": [
            "B.P.Ed + Diploma in Sports Coaching (NIS)"
          ],
          "mandatorySubjects": [
            "Concerned Sport Discipline"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Government sports coaching positions across SAI national centres of excellence."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://sportsauthorityofindia.nic.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "bped-sw1",
        "degree_id": "bped",
        "target_role": "Corporate Wellness & Ergonomics Consultant",
        "pivot_reason": "Channel kinesiology, postural correction, and physical conditioning into designing corporate workplace movement programs and ergonomic injury prevention.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Corporate Ergonomics Assessment & Posture Analysis",
            "type": "course",
            "detail": "Learn desk ergonomics, repetitive strain injury (RSI) prevention, and workspace auditing.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Corporate Wellness Program Design & Health Metrics",
            "type": "course",
            "detail": "Develop active breaks, metabolic fitness challenges, and corporate biometric tracking.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Corporate Ergonomics Audit Capstone",
            "type": "portfolio",
            "detail": "Conduct full ergonomic risk and wellness assessment for a 300-person tech company.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Ergonomics Assessment Specialist (CEAS)",
          "Corporate Wellness Coach"
        ],
        "why_feasible": "Physical education graduates master human body mechanics, movement analysis, and athletic physiology, making ergonomic evaluation second nature.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "bped-ent1",
        "degree_id": "bped",
        "idea_title": "Grassroots Sports Academy & Youth Athletic Conditioning Center",
        "description": "Establish a multisport grassroots coaching academy (football, athletics, badminton) providing scientific athletic conditioning and tournament scouting.",
        "first_milestones": [
          "Lease ground facility or school sports complex during non-school hours.",
          "Acquire agility ladders, plyometric boxes, timing gates, and sports gear.",
          "Enroll 80 youth athletes across structured age-category training batches."
        ],
        "relevant_schemes": [
          {
            "name": "Khelo India Scheme",
            "agency": "Ministry of Youth Affairs and Sports",
            "benefits": "Accreditation and talent scouting infrastructure grants for grassroots academies.",
            "sourceUrl": "https://kheloindia.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on athletic training equipment loans.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "bped",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Anatomy, Track & Field Drills & Calisthenics",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Master cardiovascular conditioning, track and field mechanics, rules of major sports, and anatomy.",
              "Perform daily athletic training drills and referee simulated practice matches."
            ],
            "milestone": "Athletic fitness assessment log and officiating record verified"
          },
          {
            "stepNumber": 2,
            "title": "Kinesiology, Sports Injuries & School Teaching Practicum",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Learn sports massage, first aid, injury strapping, and biomechanical video analysis.",
              "Complete mandatory school physical education teaching internship at an assigned K-12 school."
            ],
            "milestone": "School physical education teaching practicum certificate"
          },
          {
            "stepNumber": 3,
            "title": "KVS PET / NIS Entrance Preparation & Capstone",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for central government physical education teacher exams (KVS/NVS) and NIS Coaching Diploma.",
              "Conduct fitness battery tests (AAHPERD Youth Fitness Test) on high school cohorts."
            ],
            "milestone": "Physical education competitive exam clearance & fitness portfolio"
          }
        ]
      },
      "completed": {
        "degree_id": "bped",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Resume Refinement & Sports Certification Audit",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Document sports officiating licenses, NIS credentials, CPR certifications, and athletic achievements.",
              "Review rules and regulations of international sports federations (FIFA, World Athletics, ICC)."
            ],
            "milestone": "Professional physical educator and sports coach resume"
          },
          {
            "stepNumber": 2,
            "title": "School Board & Sports Academy Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Physical Education Teacher (PET) and assistant sports coach positions.",
              "Demonstrate physical fitness, whistle mechanics, and coaching command during practical trials."
            ],
            "milestone": "Appointment letter secured as Physical Education Teacher"
          },
          {
            "stepNumber": 3,
            "title": "PET Onboarding & Interschool Tournament Leadership",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Lead school athletic teams, organize annual sports day, and coach medal-winning squads.",
              "Pursue M.P.Ed. or NIS coaching specialization."
            ],
            "milestone": "School sports team won regional CBSE/inter-school championship"
          }
        ]
      }
    }
  },
  {
    "degree_id": "ma-education",
    "id": "ma-education",
    "familyId": "education",
    "name": "Master of Arts in Education",
    "shortName": "M.A. Education",
    "aliases": [
      "MA Education",
      "M.A. in Education",
      "Education Policy Graduate",
      "ma-education"
    ],
    "level": "PG",
    "discipline": "Education & Pedagogy",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "UGC",
    "overview": "A postgraduate scholarly and policy program investigating education as a social institution. It covers philosophy of education, sociology of schooling, comparative education systems, educational policy formulation, curriculum studies, and qualitative/quantitative educational research methodologies.",
    "key_skills": [
      "Educational Policy Formulation & Reform Analysis (NEP 2020)",
      "Curriculum Deconstruction, Textbook Analysis & Syllabus Design",
      "Qualitative & Quantitative Educational Research Methodologies",
      "Sociology & Philosophy of Knowledge and Pedagogic Discourse",
      "Teacher Professional Development & Educational Mentoring",
      "Monitoring and Evaluation (M&E) for Large-Scale Education Programs"
    ],
    "subjects_taught": [
      "Philosophical Perspectives on Education",
      "Sociological Foundations of Schooling and Society",
      "Psychology of Learning and Human Development",
      "Curriculum Studies, Pedagogy and Assessment",
      "Research Methodology in Education (Mixed Methods)",
      "Educational Policy, Planning and Economics of Education"
    ],
    "typical_employers": [
      "National Council of Educational Research and Training (NCERT)",
      "State Councils of Educational Research and Training (SCERTs)",
      "Educational Foundations (Azim Premji Foundation, Pratham, Central Square Foundation)",
      "Policy Think Tanks & UNESCO",
      "Curriculum Publishing Houses"
    ],
    "specializations": [
      {
        "id": "ma-edu-policy",
        "name": "Educational Policy & Governance",
        "aliases": [
          "Ed Policy"
        ],
        "skillsGained": [
          "Policy Analysis",
          "RTE Implementation"
        ],
        "typicalRoles": [
          "Education Policy Specialist"
        ]
      },
      {
        "id": "ma-edu-curric",
        "name": "Curriculum Design & Pedagogic Research",
        "aliases": [
          "Curriculum Studies"
        ],
        "skillsGained": [
          "Textbook Design",
          "Pedagogic Evaluation"
        ],
        "typicalRoles": [
          "Curriculum Developer"
        ]
      }
    ],
    "sourceUrl": "https://www.ugc.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "ma-edu-c1",
        "degree_id": "ma-education",
        "role_title": "Education Research Associate / Program Manager",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Rigorous training in educational sociology, curriculum analysis, and mixed research methods directly qualifies you for education foundations.",
        "indicative_salary": {
          "min": 4.5,
          "max": 9.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Development & Education Sector Pay Survey (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Curriculum Research",
          "Field Assessment",
          "Teacher Training",
          "Program Evaluation"
        ],
        "top_employers": [
          "Azim Premji Foundation",
          "Pratham",
          "Central Square Foundation",
          "Kaivalya Education"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-edu-c2",
        "degree_id": "ma-education",
        "role_title": "Curriculum Developer & Textbook Author",
        "tier": "entry",
        "employer_type": "private",
        "career_type": "Direct",
        "match_rationale": "Curriculum deconstruction, child development theories, and learning outcome alignment coursework map directly to K-12 publishing.",
        "indicative_salary": {
          "min": 4.2,
          "max": 8.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Educational Publishing Industry Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Textbook Writing",
          "Learning Outcomes",
          "Instructional Design",
          "Teacher Guides"
        ],
        "top_employers": [
          "Oxford University Press",
          "Cambridge University Press India",
          "Lead School"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-edu-c3",
        "degree_id": "ma-education",
        "role_title": "Director of Educational Policy / Chief Education Officer",
        "tier": "senior",
        "employer_type": "private",
        "career_type": "Advanced",
        "match_rationale": "Directing large-scale state schooling transformation, national curriculum frameworks, and donor funding qualifies you for apex education leadership.",
        "indicative_salary": {
          "min": 16.0,
          "max": 36.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Educational Leadership Compensation Index (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "State Schooling Reform",
          "National Curriculum Framework (NCF)",
          "Donor Partnerships",
          "Executive Governance"
        ],
        "top_employers": [
          "NITI Aayog (Education)",
          "World Bank Education",
          "Central Square Foundation"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "ma-edu-hs1",
        "degree_id": "ma-education",
        "program_name": "Ph.D. in Education / Education Policy",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET (Education) / JRF"
        ],
        "eligibility_rule": "Master's degree in Education with minimum 55% marks (50% for reserved categories).",
        "typical_duration": "3-5 Years",
        "top_institutes": [
          "National Institute of Educational Planning and Administration (NIEPA)",
          "Delhi University (CIE)",
          "TISS Mumbai",
          "JNU"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-edu-hs2",
        "degree_id": "ma-education",
        "program_name": "Master in Public Policy (Education Focus)",
        "level": "PG",
        "entrance_exams": [
          "Institutional Applications / GRE"
        ],
        "eligibility_rule": "Postgraduate or undergraduate degree with strong academic record.",
        "typical_duration": "1-2 Years",
        "top_institutes": [
          "Harvard Graduate School of Education",
          "Columbia University (Teachers College)",
          "UCL Institute of Education"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "ma-edu-ct1",
        "degree_id": "ma-education",
        "cert_name": "UGC-NET (Education) National Eligibility for Assistant Professor",
        "provider": "National Testing Agency (NTA)",
        "domain": "Higher Education Teaching",
        "level": "Advanced",
        "prerequisites": [
          "Master's in Education or final year"
        ],
        "official_url": "https://ugcnet.nta.ac.in",
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-edu-ct2",
        "degree_id": "ma-education",
        "cert_name": "Designing Effective Education Systems & Policy Evaluation",
        "provider": "World Bank Group / edX",
        "domain": "Education Policy",
        "level": "Intermediate",
        "prerequisites": [
          "Bachelor's or Master's in social sciences"
        ],
        "official_url": "https://www.edx.org",
        "sourceUrl": "https://www.edx.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "ma-edu-ct3",
        "degree_id": "ma-education",
        "cert_name": "Monitoring & Evaluation in Education Projects",
        "provider": "UNICEF / Coursera",
        "domain": "Program Evaluation",
        "level": "Intermediate",
        "prerequisites": [
          "Education or development background"
        ],
        "official_url": "https://www.coursera.org",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "ma-edu-gv1",
        "degree_id": "ma-education",
        "exam_or_post_name": "Assistant Professor (Education) - State Universities & Colleges",
        "conducting_body": "State Public Service Commissions / UGC",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "M.A. Education + UGC-NET (Education)"
          ],
          "mandatorySubjects": [
            "Education",
            "Pedagogy"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 40,
            "obc": 43,
            "sc_st": 45
          },
          "notes": "Permanent collegiate teaching positions in university departments of education."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "ma-edu-gv2",
        "degree_id": "ma-education",
        "exam_or_post_name": "SCERT / DIET Senior Lecturer (Curriculum & Teacher Education)",
        "conducting_body": "State Education Departments / State PSCs",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "Master's in Education (M.A. Education / M.Ed.)"
          ],
          "mandatorySubjects": [
            "Teacher Education",
            "Curriculum"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "District Institutes of Education and Training (DIET) academic faculty training school teachers."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "ma-edu-sw1",
        "degree_id": "ma-education",
        "target_role": "Corporate Learning & Development (L&D) Strategy Manager",
        "pivot_reason": "Channel adult learning pedagogy, skill competency mapping, and training evaluation (Kirkpatrick model) into heading corporate employee upskilling.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Corporate Competency Mapping & Kirkpatrick Evaluation",
            "type": "course",
            "detail": "Master employee skill gap audits, 4-level training impact metrics, and learning ROI.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "Enterprise Learning Management Systems (LMS) Administration",
            "type": "course",
            "detail": "Configure Cornerstone OnDemand, Docebo, and Workday Learning modules.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Corporate Leadership Upskilling Program Capstone",
            "type": "portfolio",
            "detail": "Design complete 6-month management development curriculum and evaluation framework for an IT firm.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Professional in Talent Development (CPTD)",
          "L&D Specialist Certificate"
        ],
        "why_feasible": "Education scholars understand learning retention, motivation, and pedagogic design far better than traditional HR generalists.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "ma-edu-ent1",
        "degree_id": "ma-education",
        "idea_title": "Teacher Professional Development & School Quality Audit Agency",
        "description": "Offer structured in-service teacher pedagogical upskilling workshops and CBSE school quality accreditation assessments.",
        "first_milestones": [
          "Develop 5 modular teacher training workshops aligned with NEP 2020 competency-based learning.",
          "Contract with 10 private school management boards for annual teacher training retainers.",
          "Publish verified learning outcome improvement reports for client schools."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax benefits and incubation support.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "NITI Aayog Atal Innovation Mission",
            "agency": "NITI Aayog",
            "benefits": "Support for educational technology and pedagogical innovation ventures.",
            "sourceUrl": "https://aim.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "ma-education",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Philosophy, Sociology & Educational Discourse",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Study Ivan Illich, Paulo Freire, John Dewey, and Indian education commissions (Kothari, NEP 2020).",
              "Conduct ethnographic observations in rural schools and write field analysis papers."
            ],
            "milestone": "Ethnographic school study and philosophical essay verified"
          },
          {
            "stepNumber": 2,
            "title": "Curriculum Studies, Research Methods & Foundation Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Design empirical research tools (interview schedules, classroom observation rubrics).",
              "Complete 2-month summer internship at an educational NGO (Azim Premji Foundation, Pratham)."
            ],
            "milestone": "Summer educational research internship certificate"
          },
          {
            "stepNumber": 3,
            "title": "UGC-NET (Education) / JRF Clearance & Master's Thesis",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Prepare for UGC-NET (Education) to qualify for Assistant Professor and JRF fellowship.",
              "Author empirical Master's thesis on teacher autonomy or foundational literacy implementation."
            ],
            "milestone": "UGC-NET JRF qualified & Master's thesis defended"
          }
        ]
      },
      "completed": {
        "degree_id": "ma-education",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Scholarly Resume Refinement & Policy Paper Compilation",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile policy briefs, published articles in educational journals, and research toolkits.",
              "Review RTE Act, National Curriculum Framework (NCF), and school assessment metrics."
            ],
            "milestone": "Education policy and research specialist resume"
          },
          {
            "stepNumber": 2,
            "title": "Education Foundation & Think Tank Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for research associate, policy analyst, and curriculum developer roles.",
              "Present research methodology and policy synthesis during technical interviews."
            ],
            "milestone": "Job offer secured from national education foundation"
          },
          {
            "stepNumber": 3,
            "title": "Education Specialist Onboarding & Doctoral Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join education team, conduct district school baseline surveys, and design teacher workshops.",
              "Plan Ph.D. registration or state DIET faculty applications."
            ],
            "milestone": "Published policy report influencing district educational strategy"
          }
        ]
      }
    }
  },
  {
    "degree_id": "med",
    "id": "med",
    "familyId": "education",
    "name": "Master of Education",
    "shortName": "M.Ed.",
    "aliases": [
      "M.Ed",
      "MEd",
      "Master of Education",
      "Teacher Educator",
      "med"
    ],
    "level": "PG",
    "discipline": "Education & Pedagogy",
    "duration": "2 Years (4 Semesters)",
    "durationYears": 2,
    "regulator": "NCTE",
    "overview": "The apex professional teacher education program recognized by the National Council for Teacher Education (NCTE). It is designed to prepare teacher educators, educational administrators, curriculum specialists, and school supervisors by combining advanced pedagogical theory, educational technology, teacher education curriculum design, and rigorous empirical research.",
    "key_skills": [
      "Teacher Education Curriculum & Pre-Service Teacher Mentoring",
      "Advanced Educational Psychology & Cognitive Learning Models",
      "Standardized Test Construction, Psychometric Item Analysis & Rubrics",
      "Educational Leadership, School Supervision & Institutional Accreditation",
      "Quantitative & Qualitative Educational Statistical Research (SPSS)",
      "Special Education Needs & Inclusive Educational Policy Implementation"
    ],
    "subjects_taught": [
      "Historical, Political and Economic Perspectives on Education",
      "Advanced Educational Psychology & Psychology of Learning",
      "Teacher Education: Pre-Service and In-Service Perspectives",
      "Curriculum Studies & Instructional Design",
      "Advanced Educational Research Methodologies and Statistics",
      "Educational Management, Administration and Leadership",
      "Dissertation and Teacher Education Institutional Internship"
    ],
    "typical_employers": [
      "Colleges of Teacher Education (B.Ed. Colleges)",
      "SCERTs and District Institutes of Education & Training (DIETs)",
      "NCERT (National Council of Educational Research & Training)",
      "School Education Boards (CBSE, State Boards)",
      "K-12 School Groups (Head of Academics)"
    ],
    "specializations": [
      {
        "id": "med-teacheredu",
        "name": "Teacher Education & Faculty Development",
        "aliases": [
          "Teacher Educator"
        ],
        "skillsGained": [
          "Teacher Mentoring",
          "Pedagogy"
        ],
        "typicalRoles": [
          "Assistant Professor of Education"
        ]
      },
      {
        "id": "med-admin",
        "name": "Educational Administration & Leadership",
        "aliases": [
          "School Leadership"
        ],
        "skillsGained": [
          "School Governance",
          "Accreditation"
        ],
        "typicalRoles": [
          "Academic Vice Principal / Director"
        ]
      }
    ],
    "sourceUrl": "https://ncte.gov.in",
    "lastReviewed": "2026-08-15",
    "career_paths": [
      {
        "id": "med-c1",
        "degree_id": "med",
        "role_title": "Assistant Professor of Education / Teacher Educator",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "NCTE-prescribed qualification for training B.Ed. and D.El.Ed. student teachers in university education departments and B.Ed. colleges.",
        "indicative_salary": {
          "min": 5.5,
          "max": 10.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "UGC 7th Pay Commission Assistant Professor Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "Teacher Training",
          "Pedagogy Delivery",
          "Dissertation Guidance",
          "NCTE Norms"
        ],
        "top_employers": [
          "Colleges of Education",
          "State Universities",
          "Central Universities"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "med-c2",
        "degree_id": "med",
        "role_title": "DIET Senior Lecturer / Curriculum Specialist",
        "tier": "entry",
        "employer_type": "government",
        "career_type": "Direct",
        "match_rationale": "Mastery of teacher education curriculum, foundational literacy assessments, and state school monitoring prepares you for DIETs.",
        "indicative_salary": {
          "min": 5.0,
          "max": 9.5,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "State Education Cadre Gazetted Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "In-Service Training",
          "District School Monitoring",
          "Textbook Development",
          "Action Research"
        ],
        "top_employers": [
          "State DIETs",
          "SCERT",
          "State School Boards"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "med-c3",
        "degree_id": "med",
        "role_title": "Dean of Education / Director of Teacher Education",
        "tier": "senior",
        "employer_type": "government",
        "career_type": "Advanced",
        "match_rationale": "Leading university faculty of education, directing NCTE institutional accreditations, and supervising Ph.D. dissertations qualifies you for apex academic deanships.",
        "indicative_salary": {
          "min": 18.0,
          "max": 38.0,
          "unit": "LPA (INR)",
          "region": "Pan-India / Metro",
          "year": 2025,
          "source": "Senior Professor / Dean UGC Level 14 Pay Scale (indicative \u2014 varies by employer, location and market conditions)"
        },
        "skills": [
          "NCTE Accreditation Leadership",
          "University Senate Governance",
          "Doctoral Supervision",
          "Policy Advisory"
        ],
        "top_employers": [
          "Central Universities",
          "NCERT",
          "National Institute of Educational Planning"
        ],
        "sourceUrl": "https://www.nasscom.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "higher_studies": [
      {
        "id": "med-hs1",
        "degree_id": "med",
        "program_name": "Ph.D. in Education",
        "level": "Doctoral",
        "entrance_exams": [
          "UGC-NET / JRF (Education)"
        ],
        "eligibility_rule": "Master of Education (M.Ed.) with minimum 55% marks from an NCTE-recognized institution.",
        "typical_duration": "3-5 Years",
        "top_institutes": [
          "Central Institute of Education (Delhi University)",
          "Jamia Millia Islamia",
          "BHU Varanasi",
          "Panjab University Chandigarh"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "med-hs2",
        "degree_id": "med",
        "program_name": "Post-Doctoral Fellowship in Educational Administration",
        "level": "Doctoral",
        "entrance_exams": [
          "ICSSR Fellowships"
        ],
        "eligibility_rule": "Ph.D. in Education with published research in indexed educational journals.",
        "typical_duration": "2 Years",
        "top_institutes": [
          "Indian Council of Social Science Research (ICSSR)",
          "NIEPA New Delhi"
        ],
        "sourceUrl": "https://www.ugc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "certifications": [
      {
        "id": "med-ct1",
        "degree_id": "med",
        "cert_name": "UGC-NET (Education) Assistant Professor & JRF",
        "provider": "National Testing Agency (NTA)",
        "domain": "National Eligibility",
        "level": "Advanced",
        "prerequisites": [
          "M.Ed. degree or in final semester"
        ],
        "official_url": "https://ugcnet.nta.ac.in",
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "med-ct2",
        "degree_id": "med",
        "cert_name": "Certificate in Educational Leadership & School Management",
        "provider": "National Institute of Educational Planning and Administration (NIEPA)",
        "domain": "Educational Leadership",
        "level": "Intermediate",
        "prerequisites": [
          "M.Ed. or school principals"
        ],
        "official_url": "https://www.niepa.ac.in",
        "sourceUrl": "https://www.niepa.ac.in",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      },
      {
        "id": "med-ct3",
        "degree_id": "med",
        "cert_name": "Advanced Psychometrics & Standardized Test Construction",
        "provider": "ETS / Coursera",
        "domain": "Educational Assessment",
        "level": "Intermediate",
        "prerequisites": [
          "M.Ed. background"
        ],
        "official_url": "https://www.ets.org",
        "sourceUrl": "https://www.ets.org",
        "lastReviewed": "2026-08-15",
        "costBand": "Medium (5k-20k)"
      }
    ],
    "government_exams": [
      {
        "id": "med-gv1",
        "degree_id": "med",
        "exam_or_post_name": "UGC-NET (Education) / Junior Research Fellowship (JRF)",
        "conducting_body": "UGC / NTA",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "M.Ed."
          ],
          "mandatorySubjects": [
            "Education",
            "Teacher Education"
          ],
          "minMarksPercent": 55,
          "ageLimitRule": {
            "general": 30,
            "obc": 33,
            "sc_st": 35
          },
          "notes": "Mandatory national qualification for recruitment as Assistant Professor in B.Ed. training colleges."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://ugcnet.nta.ac.in",
        "lastReviewed": "2026-08-15"
      },
      {
        "id": "med-gv2",
        "degree_id": "med",
        "exam_or_post_name": "State Education Service (Class II) - Sub-Divisional Education Officer / Inspector of Schools",
        "conducting_body": "State Public Service Commissions",
        "eligibility_rule": {
          "degreeFamily": "Education",
          "allowedDegrees": [
            "M.Ed.",
            "B.Ed. with Teaching Experience"
          ],
          "mandatorySubjects": [
            "Educational Administration",
            "School Inspection"
          ],
          "minMarksPercent": 50,
          "ageLimitRule": {
            "general": 35,
            "obc": 38,
            "sc_st": 40
          },
          "notes": "Gazetted administrative officer inspecting secondary schools and enforcing state educational codes."
        },
        "is_generalist_fallback": false,
        "sourceUrl": "https://upsc.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "career_switch": [
      {
        "id": "med-sw1",
        "degree_id": "med",
        "target_role": "Educational Assessment & Psychometric Testing Director",
        "pivot_reason": "Apply classical test theory, item response theory (IRT), and standardized psychometric item development to heading examinations in testing agencies.",
        "bridge_steps": [
          {
            "step": 1,
            "title": "Item Response Theory (IRT) & Test Psychometrics",
            "type": "course",
            "detail": "Master item difficulty, discrimination index, differential item functioning (DIF), and test equating.",
            "estimatedMonths": 2
          },
          {
            "step": 2,
            "title": "R / Python for Psychometric Data Analysis",
            "type": "course",
            "detail": "Use packages (mirt, lme4) to calibrate test items and model latent educational ability.",
            "estimatedMonths": 2
          },
          {
            "step": 3,
            "title": "Standardized National Test Battery Capstone",
            "type": "portfolio",
            "detail": "Construct and statistically calibrate a 100-item standardized high school cognitive ability assessment.",
            "estimatedMonths": 2
          }
        ],
        "typical_duration": "6 Months",
        "recommended_certs": [
          "Certified Psychometric Testing Specialist",
          "Advanced Educational Measurement"
        ],
        "why_feasible": "M.Ed. graduates have explicit graduate training in educational statistics and test item construction, making psychometric examination design a natural career.",
        "sourceUrl": "https://www.coursera.org",
        "lastReviewed": "2026-08-15"
      }
    ],
    "entrepreneurship": [
      {
        "id": "med-ent1",
        "degree_id": "med",
        "idea_title": "Pre-Service & In-Service Teacher Training Academy",
        "description": "Establish a professional institute preparing teacher candidates for CTET, state teacher recruitment examinations, and innovative pedagogical practices.",
        "first_milestones": [
          "Author comprehensive CTET and teacher recruitment preparation study guides.",
          "Launch hybrid weekend coaching and practical teaching simulation batches.",
          "Train 200 aspiring teachers with a verified 80%+ clearance rate in state teacher eligibility tests."
        ],
        "relevant_schemes": [
          {
            "name": "Startup India Hub",
            "agency": "DPIIT",
            "benefits": "Tax benefits and education incubator support.",
            "sourceUrl": "https://www.startupindia.gov.in"
          },
          {
            "name": "PMEGP Scheme",
            "agency": "KVIC / MSME",
            "benefits": "Up to 35% margin money subsidy on educational technology equipment.",
            "sourceUrl": "https://www.kviconline.gov.in"
          }
        ],
        "sourceUrl": "https://www.startupindia.gov.in",
        "lastReviewed": "2026-08-15"
      }
    ],
    "roadmap_template": {
      "pursuing": {
        "degree_id": "med",
        "status": "pursuing",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Advanced Psychological Models & Teacher Education",
            "timeframe": "Semesters 1\u20134",
            "tag": "skill-building",
            "description": "Core foundation and academic coursework.",
            "tasks": [
              "Study pre-service teacher models, Vygotsky's cultural-historical theory, and NCTE norms.",
              "Observe and evaluate B.Ed. student teacher classroom practice."
            ],
            "milestone": "Teacher education observation journal and rubrics verified"
          },
          {
            "stepNumber": 2,
            "title": "Statistical Methods, Psychometrics & B.Ed. College Internship",
            "timeframe": "Semesters 5\u20136",
            "tag": "internship",
            "description": "Practical training, certifications, and summer internship.",
            "tasks": [
              "Run ANOVA, factor analysis, and regression modeling for educational data.",
              "Complete 1-month mandatory internship in a College of Teacher Education (CTE), mentoring B.Ed. trainees."
            ],
            "milestone": "Teacher education college internship completion certificate"
          },
          {
            "stepNumber": 3,
            "title": "UGC-NET (Education) / JRF Preparation & M.Ed. Thesis",
            "timeframe": "Semesters 7\u20138",
            "tag": "exam-prep",
            "description": "Final placements, competitive exams, and capstone project.",
            "tasks": [
              "Rigorously prepare for UGC-NET (Education) paper I & II.",
              "Author empirical M.Ed. dissertation on teacher professional burnout or digital assessment validity."
            ],
            "milestone": "UGC-NET JRF qualified & M.Ed. dissertation defended"
          }
        ]
      },
      "completed": {
        "degree_id": "med",
        "status": "completed",
        "phases": [
          {
            "stepNumber": 1,
            "title": "Scholarly Academic Resume & Research Portfolio",
            "timeframe": "Months 1\u20132",
            "tag": "skill-building",
            "description": "Portfolio enhancement and credential audit.",
            "tasks": [
              "Compile research papers, conference presentations, and psychometric instruments.",
              "Review NCTE regulations for teacher education colleges and UGC recruitment criteria."
            ],
            "milestone": "Collegiate teacher educator professional resume"
          },
          {
            "stepNumber": 2,
            "title": "University & College of Education Recruitment Drives",
            "timeframe": "Months 3\u20134",
            "tag": "application",
            "description": "Structured job applications and technical interview prep.",
            "tasks": [
              "Apply for Assistant Professor of Education positions across universities and B.Ed. colleges.",
              "Present dissertation findings and conduct demo lectures during selection committees."
            ],
            "milestone": "Appointment letter secured as Assistant Professor of Education"
          },
          {
            "stepNumber": 3,
            "title": "Faculty Onboarding & Doctoral Research Track",
            "timeframe": "Months 5\u20136",
            "tag": "decision",
            "description": "Offer evaluation and professional onboarding.",
            "tasks": [
              "Join university education department, teach M.Ed./B.Ed. scholars, and publish in UGC-CARE journals.",
              "Secure university Ph.D. guide recognition and supervise doctoral students."
            ],
            "milestone": "Recognized as Ph.D. Research Guide in Education"
          }
        ]
      }
    }
  }
];
