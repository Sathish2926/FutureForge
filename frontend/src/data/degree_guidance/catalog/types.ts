/**
 * Core Universal Degree Guidance Data Types
 * Conforms to Section 1 & Section 3 mandatory completeness specifications.
 */

export type DegreeLevel =
  | "UG"
  | "PG"
  | "Integrated"
  | "Doctoral"
  | "Professional"
  | "Vocational"
  | "Diploma";

export type DegreeDiscipline =
  | "Computing & IT"
  | "Engineering & Technology"
  | "Pure & Applied Sciences"
  | "Arts, Humanities & Social Sciences"
  | "Commerce, Business & Management"
  | "Law & Legal Studies"
  | "Education & Pedagogy"
  | "Medicine & Health Sciences"
  | "Design & Creative Arts"
  | "Vocational & Applied Trades"
  | "Agriculture & Allied Sciences"
  | "Architecture & Planning";

export type Regulator =
  | "UGC"
  | "AICTE"
  | "NMC"
  | "DCI"
  | "PCI"
  | "BCI"
  | "COA"
  | "ICAR"
  | "INC"
  | "NCTE"
  | "RCI"
  | "VCI"
  | "NCVET"
  | "NCHMCT"
  | "STATE_BOARD"
  | "NCH"
  | "NCISM";

export type CareerTypeTag =
  | "Direct"
  | "Related"
  | "Advanced"
  | "Regulated"
  | "Exploratory";

export interface IndicativeSalary {
  min: number;
  max: number;
  unit: string; // e.g. "LPA (INR)"
  region: string; // e.g. "Pan-India / Metro"
  year: number; // e.g. 2025
  source: string; // e.g. "NASSCOM / AmbitionBox / Industry Survey"
}

export interface CareerPathEntry {
  id: string;
  degree_id: string;
  role_title: string;
  tier: "entry" | "senior";
  employer_type: "private" | "psu" | "government" | "self";
  match_rationale: string; // Must reference actual curriculum subjects/skills
  indicative_salary: IndicativeSalary;
  sourceUrl: string;
  lastReviewed: string; // ISO date e.g. "2026-08-15"
  career_type: CareerTypeTag;
  skills: string[];
  top_employers: string[];
}

export interface HigherStudyEntry {
  id: string;
  degree_id: string;
  program_name: string;
  level: "PG" | "Doctoral" | "Executive" | "Integrated" | "UG" | "Diploma" | "Professional" | "Super-Specialty" | "Fellowship";
  entrance_exams: string[];
  eligibility_rule: string;
  typical_duration: string; // e.g. "2 Years"
  sourceUrl: string;
  lastReviewed: string;
  top_institutes?: string[];
}

export interface CertificationEntry {
  id: string;
  degree_id: string;
  cert_name: string;
  provider: string;
  domain: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  official_url: string;
  sourceUrl: string;
  lastReviewed: string;
  costBand?: "Free" | "Low (<5k)" | "Medium (5k-20k)" | "High (>20k)";
}

export interface GovtExamEligibilityRule {
  degreeFamily?: string;
  allowedDegrees?: string[];
  mandatorySubjects?: string[];
  minMarksPercent?: number;
  ageLimitRule?: {
    general: number;
    obc: number;
    sc_st: number;
  };
  categoryRelaxation?: string;
  notes?: string;
}

export interface GovernmentExamEntry {
  id: string;
  degree_id: string;
  exam_or_post_name: string;
  conducting_body: string;
  eligibility_rule: GovtExamEligibilityRule | string;
  is_generalist_fallback?: boolean;
  sourceUrl: string;
  lastReviewed: string; // Max 6 months old
}

export interface BridgeStep {
  step: number;
  title: string;
  type: "course" | "cert" | "portfolio" | "internship";
  detail: string;
  estimatedMonths: number;
  sourceUrl?: string;
}

export interface CareerSwitchEntry {
  id: string;
  degree_id: string;
  target_role: string;
  pivot_reason: string;
  bridge_steps: BridgeStep[];
  typical_duration: string;
  recommended_certs: string[];
  why_feasible: string;
  sourceUrl: string;
  lastReviewed: string;
}

export interface EntrepreneurshipScheme {
  name: string;
  agency: string;
  benefits: string;
  sourceUrl: string;
}

export interface EntrepreneurshipEntry {
  id: string;
  degree_id: string;
  idea_title: string;
  description: string;
  first_milestones: string[];
  relevant_schemes: EntrepreneurshipScheme[];
  sourceUrl: string;
  lastReviewed: string;
}

export type RoadmapStepTag =
  | "skill-building"
  | "internship"
  | "certification"
  | "exam-prep"
  | "application"
  | "decision";

export interface RoadmapPhaseStep {
  stepNumber: number;
  title: string;
  timeframe: string; // e.g. "Months 1-6" or "Semesters 1-2"
  tag: RoadmapStepTag;
  description: string;
  tasks: string[];
  milestone: string;
}

export interface DegreeRoadmapTemplate {
  degree_id: string;
  status: "pursuing" | "completed";
  phases: RoadmapPhaseStep[];
}

export interface SpecializationEntry {
  id: string;
  name: string;
  aliases: string[];
  skillsGained: string[];
  typicalRoles: string[];
}

export interface UniversalDegreeRecord {
  degree_id: string;
  id: string; // matches degree_id for backward compatibility
  familyId: string;
  name: string;
  shortName: string;
  aliases: string[];
  level: DegreeLevel;
  discipline: DegreeDiscipline;
  duration: string; // e.g. "4 Years", "3 Years"
  durationYears: number;
  regulator: Regulator;
  overview: string; // 2-4 sentences grounded in curriculum
  key_skills: string[]; // concrete skills
  subjects_taught: string[];
  typical_employers: string[];
  specializations: SpecializationEntry[];
  sourceUrl: string;
  lastReviewed: string;
  needsVerification?: boolean;

  // 8 Mandatory Guidance Sections (Section 3)
  career_paths: CareerPathEntry[];
  higher_studies: HigherStudyEntry[];
  certifications: CertificationEntry[];
  government_exams: GovernmentExamEntry[];
  career_switch: CareerSwitchEntry[];
  entrepreneurship: EntrepreneurshipEntry[];
  roadmap_template: {
    pursuing: DegreeRoadmapTemplate;
    completed: DegreeRoadmapTemplate;
  };
}

export interface UnmatchedDegreeInput {
  id: string;
  raw_query: string;
  timestamp: string;
  resolved_to: string | null;
  frequency: number;
  inferred_discipline?: string;
  status: "pending" | "resolved" | "ignored";
}
