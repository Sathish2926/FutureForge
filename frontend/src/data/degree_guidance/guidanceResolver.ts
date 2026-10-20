import {
  Degree,
  DegreeFamily,
  UserDegreeRecord,
  Occupation,
  GovPost,
  HigherStudy,
  Certification,
  SwitchPath,
  RuleEngineResult
} from "./types";
import { DEGREE_FAMILIES } from "./degreeFamilies";
import { EXAMS_REGISTRY } from "./examRegistry";
import { SCHEMES_REGISTRY } from "./schemesRegistry";
import { HIGHER_STUDIES_REGISTRY } from "./higherStudiesRegistry";
import { getDegreeById, DEGREES_DATA } from "./degreesData";
import { UNIVERSAL_DEGREES_BY_ID, UNIVERSAL_DEGREES_CATALOG } from "./catalog";
import { evaluateExamEligibility, evaluateGovPostEligibility } from "./ruleEngine";
import {
  normalizeQualification,
  validateRecommendation,
  NormalizedDegreeIdentity,
  ProgressionValidationResult
} from "./academicProgressionEngine";

export interface EvaluatedGovPost {
  post: GovPost;
  exam?: (typeof EXAMS_REGISTRY)[0];
  eligibility: RuleEngineResult;
}

export interface EvaluatedHigherStudy {
  study: HigherStudy;
  exams: {
    exam: (typeof EXAMS_REGISTRY)[0];
    eligibility: RuleEngineResult;
  }[];
  validation?: ProgressionValidationResult;
}

export interface TimelinePhase {
  title: string;
  timeframe: string;
  focus: string;
  tasks: string[];
  milestone: string;
  isCurrentPhase?: boolean;
}

export interface ResolvedDegreeGuidance {
  degree: Degree;
  family: DegreeFamily;
  user: UserDegreeRecord;
  normalizedIdentity: NormalizedDegreeIdentity;
  previousDegree?: Degree;
  privateCareers: Occupation[];
  govtPosts: EvaluatedGovPost[];
  higherStudies: EvaluatedHigherStudy[];
  alternativeSpecializations: EvaluatedHigherStudy[]; // Same-level specialization pivots
  certifications: Certification[];
  switchPaths: SwitchPath[];
  schemes: typeof SCHEMES_REGISTRY;
  timelinePhases: TimelinePhase[];
  currentSemesterAdvice: {
    title: string;
    description: string;
    top3Actions: string[];
  };
  statusMessage?: {
    type: "pursuing" | "completed";
    title: string;
    description: string;
  };
  nepExitOptions?: {
    certYear1?: string;
    dipYear2?: string;
    degYear3?: string;
    honsYear4?: string;
  };
  skillChecklist: {
    category: string;
    skills: string[];
  }[];
  anyGraduateSafetyNet: {
    summary: string;
    routes: string[];
  };
}

export function resolveDegreeGuidance(
  degreeOrId: Degree | string,
  user: UserDegreeRecord,
  previousDegree?: Degree
): ResolvedDegreeGuidance {
  const degree = typeof degreeOrId === "string" ? getDegreeById(degreeOrId) || DEGREES_DATA[0] : degreeOrId;
  const previousCompletedDegree = previousDegree;
  const family = DEGREE_FAMILIES[degree.familyId] || DEGREE_FAMILIES.engineering;
  const normalizedIdentity = normalizeQualification(degree, degree);

  // Look up rich degree record from Universal Catalog
  const catalogRecord =
    UNIVERSAL_DEGREES_BY_ID[degree.id] ||
    UNIVERSAL_DEGREES_BY_ID[degree.id.toLowerCase()] ||
    UNIVERSAL_DEGREES_CATALOG.find(
      (d) =>
        d.degree_id === degree.id ||
        d.id === degree.id ||
        d.name.toLowerCase() === degree.name.toLowerCase() ||
        d.shortName?.toLowerCase() === degree.shortName?.toLowerCase()
    );

  // 1. Discipline-Aware Career Filtering
  let privateCareers: Occupation[] = [];

  if (degree.customPrivateCareers && degree.customPrivateCareers.length > 0) {
    privateCareers = degree.customPrivateCareers;
  } else if (catalogRecord?.career_paths && catalogRecord.career_paths.length > 0) {
    privateCareers = catalogRecord.career_paths.map((cp) => ({
      id: cp.id,
      title: cp.role_title,
      sector: degree.name,
      employerType: (cp.employer_type === "psu" ? "psu" : "private") as any,
      isEntryLevel: cp.tier === "entry",
      requiredDegreeRules: {
        allowedDegreeFamilies: [degree.familyId],
        allowedDegreeIds: [degree.id],
      },
      skills: cp.skills || [],
      indicativeSalary: {
        minLPA: cp.indicative_salary?.min ?? 4,
        maxLPA: cp.indicative_salary?.max ?? 8,
        unit: cp.indicative_salary?.unit ?? "LPA",
        region: cp.indicative_salary?.region ?? "Pan-India / Metro",
        year: cp.indicative_salary?.year ?? 2025,
        source: cp.indicative_salary?.source ?? "Industry Benchmark",
        sourceUrl: cp.sourceUrl ?? "https://www.aicte-india.org",
      },
      description: cp.match_rationale,
      topEmployers: cp.top_employers || [],
      meta: {
        sourceUrl: cp.sourceUrl || "https://www.aicte-india.org",
        retrievedOn: cp.lastReviewed || "2026-08-15",
        verifier: "Curriculum Alignment",
        confidence: "high",
      },
    }));
  } else {
    privateCareers = family.defaultPrivateCareers;
  }

  // Filter out core mechanical/civil GET careers from pure computer science profiles
  if (normalizedIdentity.disciplineCategory === "computer_science") {
    privateCareers = privateCareers.filter((occ) => {
      const skillsText = (occ.skills || []).join(" ").toLowerCase();
      const titleText = (occ.title || "").toLowerCase();
      // Exclude AutoCAD / Thermodynamics / Structural mechanics from CSE careers
      if (
        (skillsText.includes("autocad") ||
          skillsText.includes("thermodynamics") ||
          skillsText.includes("solidworks")) &&
        !titleText.includes("computer") &&
        !titleText.includes("software")
      ) {
        return false;
      }
      return true;
    });
  }

  // 2. Evaluate Govt Posts through Rule Engine
  const rawGovtPosts: GovPost[] =
    degree.customGovtPosts && degree.customGovtPosts.length > 0
      ? degree.customGovtPosts
      : (family.defaultGovtPosts || []).filter(Boolean);

  const govtPosts: EvaluatedGovPost[] = rawGovtPosts
    .filter((post): post is GovPost => Boolean(post && post.id))
    .map((post) => {
      const exam = EXAMS_REGISTRY.find((e) => e.id === post.examId);
      const eligibility = evaluateGovPostEligibility(post, exam, degree, family, user);
      return { post, exam, eligibility };
    });

  // 3. Academic Progression Engine: Filter & Validate Higher Studies
  const catalogHigherStudies: HigherStudy[] = (catalogRecord?.higher_studies || []).map((hs) => {
    const examIds = (hs.entrance_exams || []).map((e) => {
      const eLower = e.toLowerCase();
      if (eLower.includes("gate")) return "exam-gate";
      if (eLower.includes("cat")) return "exam-cat";
      if (eLower.includes("gre")) return "exam-gre";
      if (eLower.includes("cuet")) return "exam-cuet-pg";
      if (eLower.includes("ceed")) return "exam-ceed";
      if (eLower.includes("ugc") || eLower.includes("net")) return "exam-ugc-net";
      return "exam-gate";
    });
    return {
      id: hs.id,
      program: hs.program_name,
      level: (hs.level === "Doctoral" ? "Doctoral" : "PG") as any,
      durationYears: hs.typical_duration?.includes("4") ? 4 : 2,
      entranceExamIds: examIds,
      eligibilityRules: {
        allowedDegreeFamilies: [degree.familyId],
        allowedDegreeIds: [degree.id],
        minMarksPercent: 60,
        mandatoryPrerequisites: [degree.name],
      },
      fundingOptions: ["AICTE PG Scholarship (₹12,400/mo)", "University Fellowship", "Self-funded"],
      topInstitutesIndia: hs.top_institutes || [],
      meta: {
        sourceUrl: hs.sourceUrl || "https://www.aicte-india.org",
        retrievedOn: hs.lastReviewed || "2026-08-15",
        verifier: "University Admission Guidelines",
        confidence: "high",
      },
    };
  });

  const rawHigherStudies: HigherStudy[] = [
    ...catalogHigherStudies,
    ...(degree.customHigherStudies || []),
    ...(family.defaultHigherStudies || []),
    ...HIGHER_STUDIES_REGISTRY,
  ];

  // Deduplicate by program id
  const seenIds = new Set<string>();
  const uniqueCandidateStudies: HigherStudy[] = [];
  for (const s of rawHigherStudies) {
    if (s && s.id && !seenIds.has(s.id)) {
      seenIds.add(s.id);
      uniqueCandidateStudies.push(s);
    }
  }

  const validHigherStudiesList: EvaluatedHigherStudy[] = [];
  const alternativeSpecializationsList: EvaluatedHigherStudy[] = [];

  for (const study of uniqueCandidateStudies) {
    // 3a. Validate for Direct Higher Studies
    const validation = validateRecommendation(study, user, degree, previousDegree, false);

    const exams = (study.entranceExamIds || [])
      .map(examId => {
        const exam = EXAMS_REGISTRY.find(e => e.id === examId);
        if (!exam) return null;
        const eligibility = evaluateExamEligibility(exam, degree, family, user);
        return { exam, eligibility };
      })
      .filter((item): item is { exam: (typeof EXAMS_REGISTRY)[0]; eligibility: RuleEngineResult } => item !== null);

    if (validation.valid) {
      validHigherStudiesList.push({ study, exams, validation });
    } else if (validation.category === "specialization_pivot") {
      // 3b. Validate for Alternative Specialization Pivot
      const pivotValidation = validateRecommendation(study, user, degree, previousDegree, true);
      alternativeSpecializationsList.push({ study, exams, validation: pivotValidation });
    }
  }

  // Rank valid higher studies: direct_progression first, then research, then career_transition
  const categoryPriority: Record<string, number> = {
    direct_progression: 1,
    research: 2,
    career_transition: 3,
    specialization_pivot: 4,
    ineligible: 5
  };

  validHigherStudiesList.sort((a, b) => {
    const catA = a.validation?.category || "direct_progression";
    const catB = b.validation?.category || "direct_progression";
    return (categoryPriority[catA] || 99) - (categoryPriority[catB] || 99);
  });

  let certifications: Certification[] = [];
  if (degree.customCertifications && degree.customCertifications.length > 0) {
    certifications = degree.customCertifications;
  } else if (catalogRecord?.certifications && catalogRecord.certifications.length > 0) {
    certifications = catalogRecord.certifications.map((c) => ({
      id: c.id,
      name: c.cert_name,
      provider: c.provider,
      domain: c.domain,
      level: c.level,
      costBand: (c.costBand as any) || "Medium (5k-20k)",
      prerequisites: c.prerequisites || [],
      examMode: "Online",
      recognition: "industry",
      officialUrl: c.official_url || c.sourceUrl || "https://www.aicte-india.org",
      validityYears: 3,
      meta: {
        sourceUrl: c.sourceUrl || "https://www.aicte-india.org",
        retrievedOn: c.lastReviewed || "2026-08-15",
        verifier: "Statutory / Industry Body",
        confidence: "high",
      },
    }));
  } else {
    certifications = (family.defaultCertifications || []).filter(Boolean);
  }

  const switchPaths: SwitchPath[] = (degree.customSwitchPaths && degree.customSwitchPaths.length > 0
    ? degree.customSwitchPaths
    : family.defaultSwitchPaths || []).filter(Boolean);

  // 4. Status-Aware Advice and Warnings (Streamlined: Pursuing vs Completed)
  const userStatus = user.status === "pursuing" ? "pursuing" : "completed";
  const isPursuing = userStatus === "pursuing";

  const standardYears = degree.structure?.durationStandardYears || 3;

  let timelinePhases: TimelinePhase[] = [];
  let currentSemesterAdvice: ResolvedDegreeGuidance["currentSemesterAdvice"] = {
    title: "Focus on Foundational Competency",
    description: "Build deep subject fluency and publish practical project artifacts.",
    top3Actions: [
      "Master core degree subjects and maintain consistent grades (>65%).",
      "Build hands-on projects to anchor your portfolio.",
      "Explore industry certifications to stand out during campus drives."
    ]
  };

  let statusMessage: ResolvedDegreeGuidance["statusMessage"] = undefined;

  if (isPursuing) {
    statusMessage = {
      type: "pursuing",
      title: `Currently Enrolled in ${degree.shortName}`,
      description: `Showing future next-step options to prepare for after completing your ${degree.shortName}.`
    };

    timelinePhases = [
      {
        title: "Phase 1: Foundational Academics & Hands-on Labs",
        timeframe: "Years 1 & 2 (Semesters 1 - 4)",
        focus: "Fundamentals, Core Curriculum & Initial Certifications",
        tasks: [
          "Complete core foundational subjects with strong GPA (>7.5 CGPA).",
          "Identify your primary specialization track.",
          "Publish 2 mini-projects with public GitHub repositories."
        ],
        milestone: "Solid Core Foundation & 2 Verified Projects",
        isCurrentPhase: true
      },
      {
        title: "Phase 2: Advanced Specialization & Entrance Exam Preparation",
        timeframe: `Final Year (${user.yearOrSemester || "Sem 7 & 8"})`,
        focus: "GATE / NET / Placement Drives & Dissertation Thesis",
        tasks: [
          "Appear for national entrance gateways (GATE / UGC-NET / CAT).",
          "Complete master dissertation or capstone thesis with novel artifacts.",
          "Participate in university campus placements."
        ],
        milestone: "Degree Awarded + Entrance Gateway Cleared / Campus Offer"
      }
    ];

    currentSemesterAdvice = {
      title: `Action Plan: ${user.yearOrSemester || "Current Year"} in ${degree.shortName}`,
      description: `Prepare proactively for next academic milestones after ${degree.shortName}.`,
      top3Actions: [
        "Maintain strong grades (>70%) to meet prerequisite cut-offs for Ph.D / Master's programs.",
        "Begin entrance exam syllabus coverage (GATE / UGC-NET) 8-12 months ahead.",
        "Formulate research proposal or final-year thesis topic early with faculty advisors."
      ]
    };
  } else {
    // Completed
    statusMessage = {
      type: "completed",
      title: `Graduated with ${degree.shortName}`,
      description: `Your qualifications are completed. Review legitimate next academic stages or senior industry advancement.`
    };

    const graduationYear = user.completionYear || new Date().getFullYear();
    const yearsSinceGrad = Math.max(0, new Date().getFullYear() - graduationYear);

    timelinePhases = [
      {
        title: yearsSinceGrad <= 2 ? "Early Career & Higher Studies Acceleration (0 - 2 Years)" : "Senior Advancement & Doctoral Leadership (2+ Years)",
        timeframe: yearsSinceGrad <= 2 ? "First 24 Months" : "Ongoing Professional Growth",
        focus: yearsSinceGrad <= 2 ? "Doctoral Applications, Research Proposals & Corporate Acceleration" : "Executive Ph.D., Industry Leadership & Global Fellowships",
        tasks: yearsSinceGrad <= 2
          ? [
              "Submit applications for Ph.D / research fellowships at premier institutes.",
              "Target Level 10 government scientific cadres (Scientist-B at ISRO/DRDO).",
              "Maintain active publication record or open-source software contributions."
            ]
          : [
              "Evaluate Executive Ph.D / DBA programs for corporate leadership pivot.",
              "Pursue senior fellowships and international research residencies.",
              "Mentor junior engineers and publish industry whitepapers."
            ],
        milestone: yearsSinceGrad <= 2 ? "Ph.D Admission Confirmed or Senior R&D Role" : "Executive Doctoral Awarded / Tech Leadership",
        isCurrentPhase: true
      }
    ];

    currentSemesterAdvice = {
      title: `Strategic Plan for ${degree.shortName} Graduate`,
      description: "Leverage your completed qualification for doctoral research, scientific officership, or senior compensation.",
      top3Actions: [
        "Submit research proposals to institutes with active doctoral admission cycles.",
        "Check GATE / NET score validity window (GATE valid for 3 years).",
        "Evaluate compensation against market percentiles for postgraduates."
      ]
    };
  }

  // 5. NEP Exit Structure
  const nepExitOptions = degree.structure ? {
    certYear1: degree.structure.year1Certificate,
    dipYear2: degree.structure.year2Diploma,
    degYear3: degree.structure.year3Degree,
    honsYear4: degree.structure.year4HonoursResearch
  } : undefined;

  // 6. Interactive Skill Checklist
  const skillChecklist = [
    {
      category: "Foundational Degree Competencies",
      skills: (degree.subjectsTaught || []).slice(0, 4)
    },
    {
      category: "Practical Industry Tools & Technologies",
      skills: (degree.skillsGained || []).slice(0, 4)
    },
    {
      category: "Professional & Leadership Capabilities",
      skills: [
        "Structured Problem Solving & Root Cause Analysis",
        "Technical Documentation & Business Writing",
        "Cross-functional Team Collaboration",
        "Time Management & Agile Sprint Cadence"
      ]
    }
  ];

  // 7. Universal Safety Net ("Any-Graduate" Pathways)
  const anyGraduateSafetyNet = {
    summary: "FutureForge Guarantee: No degree is a dead end. Every UGC/AICTE recognized graduate in India is legally eligible for premier civil, banking, corporate, and higher education routes.",
    routes: [
      "UPSC Civil Services (IAS / IPS / IFS) — Level 10 central officership",
      "SSC CGL (ASO in MEA / Income Tax Inspector) — Level 7 central posts",
      "Banking Officers (IBPS PO / SBI PO / RBI Grade B) — Prestigious BFSI careers",
      "MBA via CAT / XAT / CMAT — High-ROI business management transition",
      "3-Year LL.B — Pivot into corporate law, advocacy, or judiciary",
      "B.Ed / Teaching — Central (KVS/NVS via CTET) and state school professorships",
      "Digital Marketing, Product Management & Data Analytics — Skill-based tech hiring"
    ]
  };

  return {
    degree,
    family,
    user,
    normalizedIdentity,
    previousDegree,
    privateCareers,
    govtPosts,
    higherStudies: validHigherStudiesList,
    alternativeSpecializations: alternativeSpecializationsList,
    certifications,
    switchPaths,
    schemes: SCHEMES_REGISTRY,
    timelinePhases,
    currentSemesterAdvice,
    statusMessage,
    nepExitOptions,
    skillChecklist,
    anyGraduateSafetyNet
  };
}
