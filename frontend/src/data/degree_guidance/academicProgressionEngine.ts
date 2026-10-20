import { Degree, UserDegreeRecord, DegreeLevel } from "./types";

export type AcademicLevel = "10th" | "12th" | "Diploma" | "UG" | "PG" | "Doctoral" | "PostDoctoral";

export interface NormalizedDegreeIdentity {
  level: AcademicLevel;
  levelRank: number; // 0: 10th, 1: 12th/Diploma, 2: UG/Professional, 3: PG, 4: Doctoral, 5: PostDoctoral
  qualification: string; // e.g. "M.Tech", "B.Tech", "MCA", "Ph.D", "Diploma"
  discipline: string; // e.g. "Computer Science & Engineering"
  disciplineCategory: CanonicalDiscipline;
  specialization?: string;
  isTerminalDegree: boolean;
}

export type CanonicalDiscipline =
  | "computer_science"
  | "core_engineering"
  | "management_commerce"
  | "medicine_health"
  | "law"
  | "pure_sciences"
  | "arts_humanities"
  | "design_architecture"
  | "education"
  | "agriculture"
  | "vocational_trades"
  | "general_interdisciplinary";

export interface ProgressionValidationResult {
  valid: boolean;
  category: "direct_progression" | "research" | "career_transition" | "specialization_pivot" | "ineligible";
  rejectionReason?: string;
  rejectionCode?:
    | "EXACT_SAME_QUALIFICATION"
    | "SAME_LEVEL_NOT_ALLOWED"
    | "LOWER_ACADEMIC_LEVEL"
    | "DISCIPLINE_MISMATCH"
    | "MISSING_PREREQUISITES"
    | "INCOMPLETE_QUALIFICATION";
  academicLevelMatch: boolean;
  disciplineMatch: boolean;
  prerequisiteStatus: "SATISFIED" | "PARTIAL" | "NOT_SATISFIED";
  whyRecommended: string[];
  eligibilityExplanation: string;
  actionAdvice: string;
}

/**
 * Level Rank Hierarchy Map:
 * 0: 10th (Secondary)
 * 1: 12th / Polytechnic Diploma (Higher Secondary / Technical Diploma)
 * 2: UG / Professional First Degree (B.Tech, B.Sc, B.Com, MBBS, LLB)
 * 3: PG (M.Tech, M.Sc, MBA, MCA, MD/MS, LLM)
 * 4: Doctoral (Ph.D, Fellow Programme in Management)
 * 5: Post-Doctoral (PDF, Research Fellowships)
 */
export const LEVEL_RANKS: Record<AcademicLevel, number> = {
  "10th": 0,
  "12th": 1,
  "Diploma": 1,
  "UG": 2,
  "PG": 3,
  "Doctoral": 4,
  "PostDoctoral": 5,
};

/**
 * Normalizes any degree string, degree object, or user record into a standardized identity.
 */
export function normalizeQualification(
  rawInput: string | Degree | UserDegreeRecord,
  supplementaryDegree?: Degree
): NormalizedDegreeIdentity {
  let name = "";
  let shortName = "";
  let levelStr = "";
  let specialization = "";

  if (typeof rawInput === "string") {
    name = rawInput;
  } else if ("degreeId" in rawInput) {
    specialization = rawInput.specialization || "";
    if (supplementaryDegree) {
      name = supplementaryDegree.name;
      shortName = supplementaryDegree.shortName;
      levelStr = supplementaryDegree.level;
    } else {
      name = rawInput.degreeId;
    }
  } else {
    name = rawInput.name;
    shortName = rawInput.shortName;
    levelStr = rawInput.level;
  }

  const text = `${name} ${shortName} ${specialization}`.toLowerCase();

  // 1. Determine Level & LevelRank
  let level: AcademicLevel = "UG";
  if (/\b(post[\s-]?doc|post[\s-]?doctoral)\b/i.test(text)) {
    level = "PostDoctoral";
  } else if (/\b(ph\.?d|doctor of philosophy|doctorate|doctoral|fpm)\b/i.test(text)) {
    level = "Doctoral";
  } else if (/\b(m\.?tech|m\.?e\b|m\.?sc|mba|mca|llm|m\.?ed|m\.?des|m\.?pharm|md|ms\b|master|pg\b|post[\s-]?graduate)\b/i.test(text) || levelStr === "PG") {
    level = "PG";
  } else if (/\b(diploma|polytechnic|iti|vocational)\b/i.test(text) || levelStr === "Diploma") {
    level = "Diploma";
  } else if (/\b(10th|class 10|matriculation|secondary)\b/i.test(text)) {
    level = "10th";
  } else if (/\b(12th|class 12|hsc|higher secondary|intermediate|10\+2)\b/i.test(text)) {
    level = "12th";
  } else {
    level = "UG";
  }

  // 2. Determine Standardized Qualification Title
  let qualification = "Bachelor's Degree";
  if (level === "Doctoral") {
    qualification = "Ph.D";
  } else if (level === "PostDoctoral") {
    qualification = "Post-Doctoral";
  } else if (/\bm\.?tech\b|\bmaster of technology\b/i.test(text)) {
    qualification = "M.Tech";
  } else if (/\bm\.?e\b|\bmaster of engineering\b/i.test(text)) {
    qualification = "M.E.";
  } else if (/\bmba\b|\bmaster of business\b/i.test(text)) {
    qualification = "MBA";
  } else if (/\bmca\b|\bmaster of computer applications\b/i.test(text)) {
    qualification = "MCA";
  } else if (/\bm\.?sc\b|\bmaster of science\b/i.test(text)) {
    qualification = "M.Sc";
  } else if (/\bll\.?m\b/i.test(text)) {
    qualification = "LL.M";
  } else if (/\bmd\b|\bdoctor of medicine\b/i.test(text)) {
    qualification = "MD";
  } else if (/\bms\b|\bmaster of surgery\b/i.test(text)) {
    qualification = "MS (Surgery)";
  } else if (/\bm\.?des\b/i.test(text)) {
    qualification = "M.Des";
  } else if (/\bm\.?ed\b/i.test(text)) {
    qualification = "M.Ed";
  } else if (/\bm\.?com\b/i.test(text)) {
    qualification = "M.Com";
  } else if (/\bm\.?a\b|\bmaster of arts\b/i.test(text)) {
    qualification = "M.A";
  } else if (/\bb\.?tech\b|\bbachelor of technology\b/i.test(text)) {
    qualification = "B.Tech";
  } else if (/\bb\.?e\b|\bbachelor of engineering\b/i.test(text)) {
    qualification = "B.E.";
  } else if (/\bbca\b|\bbachelor of computer applications\b/i.test(text)) {
    qualification = "BCA";
  } else if (/\bb\.?sc\b|\bbachelor of science\b/i.test(text)) {
    qualification = "B.Sc";
  } else if (/\bmbbs\b/i.test(text)) {
    qualification = "MBBS";
  } else if (/\bll\.?b\b/i.test(text)) {
    qualification = "LL.B";
  } else if (/\bbba\b/i.test(text)) {
    qualification = "BBA";
  } else if (/\bb\.?com\b/i.test(text)) {
    qualification = "B.Com";
  } else if (/\bb\.?a\b|\bbachelor of arts\b/i.test(text)) {
    qualification = "B.A";
  } else if (level === "Diploma") {
    qualification = "Polytechnic Diploma";
  } else if (level === "12th") {
    qualification = "Class 12 (10+2)";
  } else if (level === "10th") {
    qualification = "Class 10";
  }

  // 3. Determine Canonical Discipline
  let disciplineCategory: CanonicalDiscipline = "general_interdisciplinary";
  let discipline = "General Academic";

  // Check Computer Science / IT FIRST to avoid generic "engineering" false matches
  if (/\b(cs|cse|computer|software|it\b|information technology|artificial intelligence|ai\b|data science|machine learning|cyber|cloud|distributed systems)\b/i.test(text)) {
    disciplineCategory = "computer_science";
    discipline = "Computer Science & Engineering";
  } else if (/\b(mech|mechanical|thermal|cad|cam|civil|structural|electrical|eee|ece|electronics|robotics|aerospace|automobile|chemical|mining|materials)\b/i.test(text)) {
    disciplineCategory = "core_engineering";
    discipline = "Core Engineering & Technology";
  } else if (/\b(management|mba|business|finance|accounting|commerce|bcom|bba|marketing|hr\b|banking|tax)\b/i.test(text)) {
    disciplineCategory = "management_commerce";
    discipline = "Commerce & Management";
  } else if (/\b(mbbs|doctor|medicine|clinical|surgery|pediatrics|radiology|nursing|physiotherapy|dentistry|dental|bds|bpt|pharmacy|bpharm|ayush)\b/i.test(text)) {
    disciplineCategory = "medicine_health";
    discipline = "Medicine & Health Sciences";
  } else if (/\b(law|llb|llm|legal|judiciary|advocate|court|jurisprudence)\b/i.test(text)) {
    disciplineCategory = "law";
    discipline = "Law & Legal Studies";
  } else if (/\b(physics|chemistry|mathematics|maths|stats|statistics|biology|botany|zoology|biotech|biotechnology|life science)\b/i.test(text)) {
    disciplineCategory = "pure_sciences";
    discipline = "Pure & Natural Sciences";
  } else if (/\b(design|fashion|visual|interior|animation|architecture|barch|mdes|bdes)\b/i.test(text)) {
    disciplineCategory = "design_architecture";
    discipline = "Design & Architecture";
  } else if (/\b(english|history|psychology|sociology|political|philosophy|literature|journalism|media|arts)\b/i.test(text)) {
    disciplineCategory = "arts_humanities";
    discipline = "Arts & Humanities";
  } else if (/\b(education|teaching|bed|med|pedagogy)\b/i.test(text)) {
    disciplineCategory = "education";
    discipline = "Education & Teaching";
  } else if (/\b(agriculture|agri|horticulture|forestry|farming)\b/i.test(text)) {
    disciplineCategory = "agriculture";
    discipline = "Agricultural Sciences";
  } else if (/\b(iti|polytechnic|fitter|welder|machinist|electrician)\b/i.test(text)) {
    disciplineCategory = "vocational_trades";
    discipline = "Vocational & Polytechnic Trades";
  }

  return {
    level,
    levelRank: LEVEL_RANKS[level],
    qualification,
    discipline,
    disciplineCategory,
    specialization: specialization || undefined,
    isTerminalDegree: level === "Doctoral" || level === "PostDoctoral",
  };
}

/**
 * Returns allowed next-stage level ranks for a given academic level rank.
 */
export function getEligibleNextLevels(currentLevelRank: number): number[] {
  switch (currentLevelRank) {
    case 0: // 10th
      return [1]; // 12th or Diploma
    case 1: // 12th or Diploma
      return [2]; // UG / Lateral Entry
    case 2: // UG
      return [3, 4]; // PG or Direct Ph.D with high CGPA/PMRF
    case 3: // PG
      return [4]; // Ph.D / Doctoral
    case 4: // Doctoral
      return [5]; // Post-Doctoral / Research Fellowship
    default:
      return [];
  }
}

/**
 * Primary Quality Control Validator:
 * Evaluates whether a Candidate Higher Study option is legitimate for the User's profile.
 * Applies HARD RULES:
 * 1. candidate.level < current.level -> STRICT REJECT (Never recommend lower level)
 * 2. candidate.qualification == current.qualification AND discipline is same/similar -> STRICT REJECT
 * 3. candidate.level == current.level -> NOT Higher Studies (must be classified as specialization_pivot)
 * 4. Checks discipline compatibility and prerequisites.
 */
export function validateRecommendation(
  candidateInput: {
    id: string;
    program: string;
    level: string;
    durationYears?: number;
    eligibilityRules?: any;
    qualification?: string;
    discipline?: string;
    category?: string;
  },
  userRecord: UserDegreeRecord,
  userDegree: Degree,
  previousCompletedDegree?: Degree,
  explicitAllowSameLevelPivot: boolean = false
): ProgressionValidationResult {
  const currentIdentity = normalizeQualification(userDegree, userDegree);
  const candidateIdentity = normalizeQualification(candidateInput.program);

  // Status awareness check
  const userStatus = userRecord.status === "pursuing" ? "pursuing" : "completed";
  const isPursuing = userStatus === "pursuing";
  const isCompleted = !isPursuing;

  let qualifyingIdentity = currentIdentity;

  const whyRecommended: string[] = [];
  const currentRank = qualifyingIdentity.levelRank;
  const candidateRank = candidateIdentity.levelRank;

  // RULE 1: EXACT SAME DEGREE OR QUALIFICATION CHECK (HARD REJECTION)
  const isExactSameQualification =
    candidateIdentity.qualification === currentIdentity.qualification &&
    candidateIdentity.disciplineCategory === currentIdentity.disciplineCategory;

  if (isExactSameQualification) {
    return {
      valid: false,
      category: "ineligible",
      rejectionCode: "EXACT_SAME_QUALIFICATION",
      rejectionReason: `Cannot recommend ${candidateInput.program} because you already hold or are pursuing this exact qualification (${currentIdentity.qualification} in ${currentIdentity.discipline}). Higher studies must represent a valid next academic stage.`,
      academicLevelMatch: false,
      disciplineMatch: true,
      prerequisiteStatus: "NOT_SATISFIED",
      whyRecommended: [],
      eligibilityExplanation: "Ineligible: Exact same degree already selected.",
      actionAdvice: "Explore doctoral research or professional certifications instead of repeating the same degree.",
    };
  }

  // RULE 2: LOWER ACADEMIC LEVEL CHECK (HARD REJECTION)
  if (candidateRank < currentRank) {
    return {
      valid: false,
      category: "ineligible",
      rejectionCode: "LOWER_ACADEMIC_LEVEL",
      rejectionReason: `Cannot recommend ${candidateInput.program} (${candidateIdentity.level}) as higher studies for a ${currentIdentity.level} qualification. Higher studies only progresses upward in academic hierarchy.`,
      academicLevelMatch: false,
      disciplineMatch: candidateIdentity.disciplineCategory === currentIdentity.disciplineCategory,
      prerequisiteStatus: "NOT_SATISFIED",
      whyRecommended: [],
      eligibilityExplanation: `Ineligible: ${candidateIdentity.level} is lower than your current qualification level (${currentIdentity.level}).`,
      actionAdvice: "If seeking a career reset, explore specialized diplomas under career switch, not higher studies.",
    };
  }

  // RULE 3: SAME LEVEL CHECK (SEPARATE SPECIALIZATION PIVOT)
  if (candidateRank === currentRank) {
    if (!explicitAllowSameLevelPivot) {
      return {
        valid: false,
        category: "specialization_pivot",
        rejectionCode: "SAME_LEVEL_NOT_ALLOWED",
        rejectionReason: `${candidateInput.program} is at the same academic level (${candidateIdentity.level}) as your current qualification. It is classified as an Alternative Academic Specialization, not Higher Studies.`,
        academicLevelMatch: false,
        disciplineMatch: candidateIdentity.disciplineCategory === currentIdentity.disciplineCategory,
        prerequisiteStatus: "SATISFIED",
        whyRecommended: [],
        eligibilityExplanation: `Same-level program: classified as an academic pivot / lateral specialization.`,
        actionAdvice: "Switch to 'Alternative Academic Specialization' view to explore same-level pivots.",
      };
    }
  }

  // RULE 4: DISCIPLINE COMPATIBILITY CHECK
  let disciplineMatch = false;
  const allowedDegreeIds: string[] = candidateInput.eligibilityRules?.allowedDegreeIds || [];
  const allowedFamilies: string[] = candidateInput.eligibilityRules?.allowedDegreeFamilies || [];

  if (allowedDegreeIds.length > 0) {
    // If specific degree IDs are explicitly targeted, check exact match
    if (
      allowedDegreeIds.includes(userDegree.id) ||
      allowedDegreeIds.includes((userDegree as any).degree_id) ||
      allowedDegreeIds.some((id) => id.toLowerCase() === userDegree.id.toLowerCase())
    ) {
      disciplineMatch = true;
      whyRecommended.push(`Direct prerequisite qualification alignment for ${userDegree.name}`);
    }
  }

  if (!disciplineMatch) {
    if (candidateIdentity.disciplineCategory === qualifyingIdentity.disciplineCategory) {
      disciplineMatch = true;
      whyRecommended.push(`Direct alignment with your ${qualifyingIdentity.discipline} foundation`);
    } else if (
      // Open interdisciplinary MBA / Management programs for any graduate
      (candidateInput.id.includes("mba") ||
        candidateInput.program.toLowerCase().includes("mba") ||
        candidateInput.program.toLowerCase().includes("management")) &&
      qualifyingIdentity.levelRank >= 2
    ) {
      disciplineMatch = true;
      whyRecommended.push("Management & executive leadership transition route for degree graduates");
    } else if (
      // Interdisciplinary design (M.Des / CEED) for technical and creative graduates
      (candidateInput.id.includes("mdes") ||
        candidateInput.program.toLowerCase().includes("design") ||
        candidateInput.id.includes("ceed")) &&
      qualifyingIdentity.levelRank >= 2
    ) {
      disciplineMatch = true;
      whyRecommended.push("Interdisciplinary product and industrial design gateway");
    } else if (
      // Computational Science / Data Science bridge only for Pure Science Math/Stats graduates
      candidateIdentity.disciplineCategory === "computer_science" &&
      qualifyingIdentity.disciplineCategory === "pure_sciences" &&
      (userDegree.name.toLowerCase().includes("math") ||
        userDegree.name.toLowerCase().includes("stat") ||
        userDegree.name.toLowerCase().includes("physics"))
    ) {
      disciplineMatch = true;
      whyRecommended.push("Interdisciplinary research intersection in computing, math & computational science");
    } else if (allowedFamilies.includes("all_graduates") && qualifyingIdentity.levelRank >= 2) {
      disciplineMatch = true;
      whyRecommended.push(`Statutorily eligible for graduates of ${userDegree.name}`);
    }
  }

  if (!disciplineMatch) {
    return {
      valid: false,
      category: "ineligible",
      rejectionCode: "DISCIPLINE_MISMATCH",
      rejectionReason: `Requires background in ${candidateIdentity.discipline}, which does not match your degree in ${qualifyingIdentity.discipline}.`,
      academicLevelMatch: true,
      disciplineMatch: false,
      prerequisiteStatus: "NOT_SATISFIED",
      whyRecommended: [],
      eligibilityExplanation: "Ineligible: Incompatible discipline prerequisites.",
      actionAdvice: "Focus on higher study options within your disciplinary domain.",
    };
  }

  // RULE 5: ACADEMIC LEVEL PROGRESSION CHECK (STRICT ENFORCEMENT)
  const eligibleRanks = getEligibleNextLevels(currentRank);
  const isDirectNextLevel = eligibleRanks.includes(candidateRank);

  if (!isDirectNextLevel && !(candidateRank === currentRank && explicitAllowSameLevelPivot)) {
    return {
      valid: false,
      category: "ineligible",
      rejectionCode: candidateRank < currentRank ? "LOWER_ACADEMIC_LEVEL" : "SAME_LEVEL_NOT_ALLOWED",
      rejectionReason: `Academic progression requires an upward progression level (${eligibleRanks
        .map((r) => Object.keys(LEVEL_RANKS).find((k) => LEVEL_RANKS[k as AcademicLevel] === r))
        .filter(Boolean)
        .join(" or ")}) from your current ${qualifyingIdentity.level} qualification.`,
      academicLevelMatch: false,
      disciplineMatch: true,
      prerequisiteStatus: "NOT_SATISFIED",
      whyRecommended: [],
      eligibilityExplanation: `Ineligible: ${candidateIdentity.level} is not a valid next academic stage following your ${qualifyingIdentity.level}.`,
      actionAdvice: "Higher study options must follow statutory academic hierarchy (Diploma -> UG -> PG/Master's -> Doctoral -> Post-Doctoral).",
    };
  }

  if (isDirectNextLevel) {
    whyRecommended.unshift(`Valid next academic level: ${candidateIdentity.level} following your ${qualifyingIdentity.level}`);
  } else if (candidateRank === currentRank && explicitAllowSameLevelPivot) {
    whyRecommended.unshift(`Same-level academic pivot into specialized domain`);
  }

  // RULE 6: PREREQUISITES VALIDATION
  let prerequisiteStatus: "SATISFIED" | "PARTIAL" | "NOT_SATISFIED" = "SATISFIED";
  const mandatoryPrereqs: string[] = candidateInput.eligibilityRules?.mandatoryPrerequisites || [];

  if (mandatoryPrereqs.length > 0) {
    whyRecommended.push(`Prerequisite qualification criteria satisfied (${qualifyingIdentity.qualification})`);
  }

  // Determine Categorization
  let category: ProgressionValidationResult["category"] = "direct_progression";
  if (
    candidateInput.program.toLowerCase().includes("research") ||
    candidateInput.program.toLowerCase().includes("fellowship") ||
    candidateInput.id.includes("pmrf") ||
    candidateInput.id.includes("jrf") ||
    candidateIdentity.level === "Doctoral" ||
    candidateIdentity.level === "PostDoctoral"
  ) {
    category = "research";
  } else if (
    candidateInput.program.toLowerCase().includes("mba") ||
    candidateInput.program.toLowerCase().includes("management")
  ) {
    category = "career_transition";
  } else if (candidateRank === currentRank) {
    category = "specialization_pivot";
  }

  // Status-aware explanation and advice
  let actionAdvice = "";
  let eligibilityExplanation = "";

  if (isPursuing) {
    eligibilityExplanation = `Eligible upon completion of your ongoing ${currentIdentity.qualification} degree. Final year students are typically eligible to sit for entrance gateways.`;
    actionAdvice = `Recommended next step after completing ${currentIdentity.qualification}: Prepare for national entrance exams during final year.`;
  } else {
    eligibilityExplanation = `Directly eligible based on completed ${currentIdentity.qualification} degree.`;
    actionAdvice = "Ready to apply through current admission cycles and entrance score counselling.";
  }

  return {
    valid: true,
    category,
    academicLevelMatch: true,
    disciplineMatch: true,
    prerequisiteStatus,
    whyRecommended,
    eligibilityExplanation,
    actionAdvice,
  };
}
