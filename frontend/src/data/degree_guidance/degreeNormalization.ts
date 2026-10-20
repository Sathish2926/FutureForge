import { Degree, DegreeFamily, DegreeLevel } from "./types";
import { DEGREES_DATA } from "./degreesData";
import { DEGREE_FAMILIES } from "./degreeFamilies";
import { searchDegrees, DegreeSearchResult, levenshteinDistance, normalizeQuery } from "./searchEngine";

export type NormalizationConfidence = "HIGH" | "MEDIUM" | "LOW";

export interface DegreeNormalizationResult {
  query: string;
  normalizedQuery: string;
  confidence: NormalizationConfidence;
  primaryMatch?: Degree;
  family?: DegreeFamily;
  suggestions: DegreeSearchResult[];
  isUnknown: boolean;
  inferredLevel: DegreeLevel;
  inferredDiscipline: string;
  relatedFamilies: DegreeFamily[];
}

export interface UnmatchedDegreeLog {
  id: string;
  query: string;
  inferredDiscipline: string;
  inferredLevel: DegreeLevel;
  timestamp: string;
  resolvedAction: "used_custom" | "picked_related" | "abandoned";
  chosenDegreeId?: string;
}

const STORAGE_KEY_UNMATCHED = "futureforge_unmatched_degree_logs";

/**
 * Standardize common abbreviations, prefixes, and punctuation
 */
export function cleanDegreeText(raw: string): string {
  let cleaned = raw.trim();
  // Standardize multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ");
  return cleaned;
}

/**
 * Infer level from text
 */
export function inferDegreeLevel(text: string): DegreeLevel {
  const lower = text.toLowerCase();
  if (/\b(m\.?sc|m\.?tech|mba|mca|llm|m\.?ed|m\.?des|m\.?pharm|md|ms|master)\b/i.test(lower)) {
    return "PG";
  }
  if (/\b(ph\.?d|doctorate|doctoral)\b/i.test(lower)) {
    return "Doctoral";
  }
  if (/\b(diploma|polytechnic|iti|vocational|trade)\b/i.test(lower)) {
    return "Diploma";
  }
  if (/\b(integrated|dual)\b/i.test(lower)) {
    return "Integrated";
  }
  return "UG";
}

/**
 * Infer discipline & related families from keywords
 */
export function inferDisciplineAndFamilies(text: string): {
  discipline: string;
  families: DegreeFamily[];
} {
  const lower = text.toLowerCase();

  if (/\b(cs|computer|software|coding|it|ai|ml|data science|cyber|web|app|cloud)\b/i.test(lower)) {
    return {
      discipline: "Computing & Information Technology",
      families: [DEGREE_FAMILIES.computing, DEGREE_FAMILIES.engineering].filter(Boolean),
    };
  }
  if (/\b(mech|civil|eee|ece|electrical|electronics|robotics|aerospace|automobile|chemical|mining|marine|engineer|tech)\b/i.test(lower)) {
    return {
      discipline: "Engineering & Applied Technology",
      families: [DEGREE_FAMILIES.engineering, DEGREE_FAMILIES.computing].filter(Boolean),
    };
  }
  if (/\b(commerce|bcom|bba|finance|account|bank|tax|business|management|mkt|marketing|hr)\b/i.test(lower)) {
    return {
      discipline: "Commerce, Business & Management",
      families: [DEGREE_FAMILIES.commerce].filter(Boolean),
    };
  }
  if (/\b(mbbs|bds|medic|health|clinic|nurs|physio|pharm|dent|ayush|bams|bhms)\b/i.test(lower)) {
    return {
      discipline: "Medicine & Healthcare Sciences",
      families: [DEGREE_FAMILIES.health_medicine, DEGREE_FAMILIES.pure_sciences].filter(Boolean),
    };
  }
  if (/\b(law|llb|legal|jur|court|advocate|bar|judiciary)\b/i.test(lower)) {
    return {
      discipline: "Law & Legal Jurisprudence",
      families: [DEGREE_FAMILIES.law].filter(Boolean),
    };
  }
  if (/\b(design|fashion|graphic|ux|ui|product|interior|animation|arch|architecture|creative)\b/i.test(lower)) {
    return {
      discipline: "Design, Architecture & Creative Arts",
      families: [DEGREE_FAMILIES.design_creative, DEGREE_FAMILIES.engineering].filter(Boolean),
    };
  }
  if (/\b(psychology|psy|sociology|pol|political|history|english|lit|literature|philosophy|journalism|media|arts)\b/i.test(lower)) {
    return {
      discipline: "Arts, Humanities & Social Sciences",
      families: [DEGREE_FAMILIES.arts_humanities].filter(Boolean),
    };
  }
  if (/\b(physics|chemistry|math|mathematics|stats|statistics|biology|botany|zoology|biotech|microbio|science)\b/i.test(lower)) {
    return {
      discipline: "Pure & Applied Natural Sciences",
      families: [DEGREE_FAMILIES.pure_sciences, DEGREE_FAMILIES.computing].filter(Boolean),
    };
  }
  if (/\b(agri|agriculture|horticulture|forestry|fishery|farm|soil)\b/i.test(lower)) {
    return {
      discipline: "Agriculture & Allied Sciences",
      families: [DEGREE_FAMILIES.agriculture, DEGREE_FAMILIES.pure_sciences].filter(Boolean),
    };
  }
  if (/\b(bed|education|teaching|pedagogy|teacher|special ed)\b/i.test(lower)) {
    return {
      discipline: "Education & Pedagogy",
      families: [DEGREE_FAMILIES.education, DEGREE_FAMILIES.arts_humanities].filter(Boolean),
    };
  }
  if (/\b(hotel|hospitality|tourism|travel|culinary|chef|catering)\b/i.test(lower)) {
    return {
      discipline: "Hospitality & Tourism Management",
      families: [DEGREE_FAMILIES.hospitality, DEGREE_FAMILIES.commerce].filter(Boolean),
    };
  }
  if (/\b(polytechnic|diploma|iti|fitter|welder|machinist|electrician|vocational|bvoc)\b/i.test(lower)) {
    return {
      discipline: "Vocational & Polytechnic Trades",
      families: [DEGREE_FAMILIES.vocational, DEGREE_FAMILIES.engineering].filter(Boolean),
    };
  }

  // Fallback
  return {
    discipline: "Interdisciplinary & General Studies",
    families: [DEGREE_FAMILIES.arts_humanities, DEGREE_FAMILIES.commerce, DEGREE_FAMILIES.pure_sciences].filter(Boolean),
  };
}

/**
 * Normalizes user degree query with confidence scoring & alias mapping
 */
export function normalizeDegreeQuery(
  rawInput: string,
  catalog: Degree[] = DEGREES_DATA
): DegreeNormalizationResult {
  const query = cleanDegreeText(rawInput);
  const norm = normalizeQuery(query);
  const inferredLevel = inferDegreeLevel(query);
  const { discipline: inferredDiscipline, families: relatedFamilies } = inferDisciplineAndFamilies(query);

  if (!query || query.length < 2) {
    return {
      query,
      normalizedQuery: norm,
      confidence: "LOW",
      suggestions: [],
      isUnknown: false,
      inferredLevel,
      inferredDiscipline,
      relatedFamilies,
    };
  }

  // Search degrees catalog
  const suggestions = searchDegrees(query, catalog, DEGREE_FAMILIES);

  // Confidence assessment
  let confidence: NormalizationConfidence = "LOW";
  let primaryMatch: Degree | undefined;
  let family: DegreeFamily | undefined;
  let isUnknown = false;

  if (suggestions.length > 0) {
    const top = suggestions[0];

    // High confidence if:
    // 1. Exact acronym or short name match (score 100)
    // 2. Score >= 85 and is clearly ahead of 2nd suggestion
    if (top.score >= 85) {
      confidence = "HIGH";
      primaryMatch = top.degree;
      family = top.family;
    } else if (top.score >= 55) {
      confidence = "MEDIUM";
      primaryMatch = top.degree;
      family = top.family;
    } else {
      confidence = "LOW";
      isUnknown = true;
    }
  } else {
    confidence = "LOW";
    isUnknown = true;
  }

  return {
    query,
    normalizedQuery: norm,
    confidence,
    primaryMatch,
    family,
    suggestions,
    isUnknown,
    inferredLevel,
    inferredDiscipline,
    relatedFamilies,
  };
}

/**
 * Synthesizes a provisional Degree object for unknown / rare degrees
 * without inventing facts, anchoring onto the chosen or inferred degree family.
 */
export function synthesizeUnknownDegree(
  rawTitle: string,
  chosenFamilyId?: string
): Degree {
  const cleanedTitle = cleanDegreeText(rawTitle);
  const inferredLevel = inferDegreeLevel(cleanedTitle);
  const { discipline, families } = inferDisciplineAndFamilies(cleanedTitle);

  const selectedFamily = (chosenFamilyId && DEGREE_FAMILIES[chosenFamilyId])
    ? DEGREE_FAMILIES[chosenFamilyId]
    : families[0] || DEGREE_FAMILIES.arts_humanities;

  const durationStandardYears = inferredLevel === "PG" ? 2 : inferredLevel === "Diploma" ? 3 : selectedFamily.defaultStructure?.durationStandardYears || 3;

  const provisionalDegree: Degree = {
    id: `custom-${normalizeQuery(cleanedTitle).replace(/\s+/g, "-")}`,
    familyId: selectedFamily.id,
    name: cleanedTitle,
    shortName: cleanedTitle,
    aliases: [cleanedTitle, `${cleanedTitle} (${selectedFamily.name})`],
    level: inferredLevel,
    regulator: selectedFamily.defaultRegulator || "UGC",
    structure: {
      durationStandardYears,
      year1Certificate: `Certificate in ${discipline} Fundamentals`,
      year2Diploma: `Diploma in Applied ${discipline}`,
      year3Degree: `Bachelor's Degree in ${cleanedTitle}`,
      year4HonoursResearch: `${cleanedTitle} (Honours / Research)`,
      durationVariants: [`${durationStandardYears} Years (Standard)`]
    },
    subjectsTaught: [
      `${discipline} Core Foundations`,
      "Analytical & Methodological Frameworks",
      "Applied Industry Practicum & Seminar",
      "Ethics, Regulatory & Professional Standards",
      "Interdisciplinary Elective / Project"
    ],
    skillsGained: [
      "Critical Problem Framing",
      "Domain Analytical Methodology",
      "Technical / Professional Documentation",
      "Collaborative Project Execution"
    ],
    typicalEmployers: [
      "Domain Consulting & Research Firms",
      "Corporate Enterprise Departments",
      "Regional & Central Statutory Organizations",
      "Specialized Services Agencies"
    ],
    meta: {
      sourceUrl: "https://www.ugc.gov.in",
      retrievedOn: new Date().toISOString().split("T")[0],
      verifier: "User Custom Degree Input (Provisional Guidance State)",
      confidence: "low",
      needsVerification: true
    }
  };

  return provisionalDegree;
}

/**
 * Log unmatched degree query to localStorage for Admin review
 */
export function logUnmatchedDegreeQuery(
  query: string,
  inferredDiscipline: string,
  inferredLevel: DegreeLevel,
  resolvedAction: "used_custom" | "picked_related" | "abandoned",
  chosenDegreeId?: string
): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const raw = window.localStorage.getItem(STORAGE_KEY_UNMATCHED);
    const existing: UnmatchedDegreeLog[] = raw ? JSON.parse(raw) : [];

    const newLog: UnmatchedDegreeLog = {
      id: `unm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      query: cleanDegreeText(query),
      inferredDiscipline,
      inferredLevel,
      timestamp: new Date().toISOString(),
      resolvedAction,
      chosenDegreeId
    };

    // Avoid duplicates within short interval
    const filtered = existing.filter(
      (item) => item.query.toLowerCase() !== newLog.query.toLowerCase()
    );
    filtered.unshift(newLog);

    window.localStorage.setItem(
      STORAGE_KEY_UNMATCHED,
      JSON.stringify(filtered.slice(0, 50))
    );
  } catch (e) {
    console.warn("Could not log unmatched degree to localStorage:", e);
  }
}

/**
 * Retrieve logged unmatched degrees for Admin portal
 */
export function getUnmatchedDegreeLogs(): UnmatchedDegreeLog[] {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(STORAGE_KEY_UNMATCHED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
