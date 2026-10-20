export type DegreeLevel =
  | "Diploma"
  | "UG"
  | "PG"
  | "Integrated"
  | "Doctoral"
  | "Professional"
  | "Vocational";

export type Regulator =
  | "UGC"
  | "AICTE"
  | "NMC"
  | "DCI"
  | "PCI"
  | "BCI"
  | "COA"
  | "NCTE"
  | "ICAR"
  | "INC"
  | "RCI"
  | "NCVET"
  | "NCHMCT"
  | "STATE_BOARD"
  | "NCH"
  | "NCISM";

export type DegreeStatus =
  | "pursuing"
  | "completed";

export type StudyMode =
  | "regular"
  | "distance" // e.g. IGNOU
  | "online"   // UGC-DEB recognised
  | "lateral_entry"; // Diploma to B.Tech

export type SocialCategory =
  | "general"
  | "obc"
  | "sc_st"
  | "ews";

export interface NepExitStructure {
  year1Certificate?: string;
  year2Diploma?: string;
  year3Degree?: string;
  year4HonoursResearch?: string;
  durationStandardYears: number;
  durationVariants?: string[];
}

export interface IndicativeSalary {
  minLPA: number;
  maxLPA: number;
  unit: string; // e.g. "LPA (INR)"
  region: string; // e.g. "Pan-India / Metro"
  year: number; // e.g. 2025
  source: string; // e.g. "NASSCOM / AmbitionBox / Industry Survey"
  sourceUrl: string;
}

export interface VerificationMeta {
  sourceUrl: string;
  retrievedOn: string; // ISO date e.g. "2025-06-15"
  verifier: string;
  confidence: "high" | "medium" | "low";
  needsVerification?: boolean;
  isAicteApproved?: boolean;
  isUgcRecognized?: boolean;
  isNep2020Compliant?: boolean;
  sourceConfidence?: string;
}

export interface Specialization {
  id: string;
  name: string;
  aliases: string[];
  skillsGained: string[];
  typicalRoles: string[];
}

export interface Degree {
  id: string;
  familyId: string;
  name: string;
  shortName: string;
  aliases: string[];
  level: DegreeLevel;
  regulator: Regulator;
  structure: NepExitStructure;
  subjectsTaught: string[];
  skillsGained: string[];
  typicalEmployers: string[];
  specializations?: Specialization[];
  isCommon?: boolean;
  // Overrides can replace family defaults
  customPrivateCareers?: Occupation[];
  customGovtPosts?: GovPost[];
  customHigherStudies?: HigherStudy[];
  customCertifications?: Certification[];
  customSwitchPaths?: SwitchPath[];
  meta: VerificationMeta;
}

export interface DegreeFamily {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  defaultRegulator: Regulator;
  defaultLevel: DegreeLevel;
  defaultStructure: NepExitStructure;
  defaultSubjects: string[];
  defaultSkills: string[];
  defaultEmployers: string[];
  defaultPrivateCareers: Occupation[];
  defaultGovtPosts: GovPost[];
  defaultHigherStudies: HigherStudy[];
  defaultCertifications: Certification[];
  defaultSwitchPaths: SwitchPath[];
  meta: VerificationMeta;
}

export interface Occupation {
  id: string;
  title: string;
  sector: string;
  employerType: "private" | "psu" | "government" | "self";
  isEntryLevel: boolean;
  requiredDegreeRules: {
    allowedDegreeFamilies: string[];
    allowedDegreeIds?: string[];
    minMarksPercent?: number;
  };
  skills: string[];
  indicativeSalary: IndicativeSalary;
  description: string;
  topEmployers: string[];
  linkedCareerId?: string; // links to FutureForge career ID in careers.json
  meta: VerificationMeta;
}

export interface AgeLimitRule {
  general: number;
  obc: number;
  sc_st: number;
  ews?: number;
  minAge?: number;
}

export interface AttemptLimitRule {
  general: number;
  obc: number;
  sc_st: number; // usually 99 (unlimited)
}

export interface GovPost {
  id: string;
  post: string;
  department: string;
  recruitingBody: string; // e.g. "UPSC", "SSC", "IBPS", "State PSC", "TNPSC", "RRB"
  examId: string; // references Exam.id
  payLevel?: string; // e.g. "Level 10 (7th CPC)", "Level 7 (7th CPC)"
  eligibilityRules: {
    allowedDegreeFamilies: string[];
    allowedDegreeIds?: string[];
    anyRecognizedGraduate: boolean;
    mandatorySubjects?: string[];
    minMarksPercent?: number;
  };
  ageLimitRules: AgeLimitRule;
  attempts?: AttemptLimitRule;
  level: "central" | "state";
  stateName?: string;
  indicativeSalary?: IndicativeSalary;
  meta: VerificationMeta;
}

export type ExamPurpose =
  | "ug_entry"
  | "pg_entry"
  | "govt_job"
  | "licence"
  | "eligibility_test";

export interface Exam {
  id: string;
  name: string;
  acronym: string;
  conductingBody: string;
  purpose: ExamPurpose;
  eligibilityRules: {
    degreeFamilies: string[];
    allowedDegrees?: string[];
    anyRecognizedGraduate?: boolean;
    finalYearStudentsEligible: boolean;
    mandatorySubjects?: string[];
    minMarks?: {
      general: number;
      reserved: number;
    };
    ageRange?: {
      min?: number;
      maxGeneral?: number;
      maxObc?: number;
      maxScSt?: number;
    };
    maxAttempts?: AttemptLimitRule;
  };
  pattern: string;
  mode: "cbt" | "pen_paper" | "hybrid" | "interview";
  frequency: string; // e.g. "Once a year (May)", "Twice a year"
  typicalMonths: string[]; // e.g. ["May", "June"]
  officialUrl: string;
  lastVerified: string;
  expiresAt: string; // 6 months validation window
  needsVerification?: boolean;
  notes?: string;
}

export interface AbroadRequirements {
  gre?: boolean;
  gmat?: boolean;
  ielts_toefl?: string; // e.g. "6.5+ IELTS or 90+ TOEFL"
  pte?: boolean;
  workExperienceYears?: number;
  notes?: string;
}

export interface HigherStudy {
  id: string;
  program: string;
  level: "UG" | "PG" | "Doctoral" | "Executive" | "Integrated";
  durationYears: number;
  entranceExamIds: string[];
  eligibilityRules: {
    allowedDegreeFamilies: string[];
    allowedDegreeIds?: string[];
    minMarksPercent?: number;
    mandatoryPrerequisites?: string[];
  };
  fundingOptions: string[]; // e.g. ["AICTE PG Scholarship (₹12,400/mo)", "PMRF (₹70k-80k/mo)", "University Fellowship", "Self-funded"]
  abroadRequirements?: AbroadRequirements;
  topInstitutesIndia?: string[];
  topDestinationsAbroad?: string[];
  meta: VerificationMeta;
}

export interface Certification {
  id: string;
  name: string;
  provider: string; // e.g. "AWS", "Microsoft", "ICAI", "Council of Architecture", "NPTEL/SWAYAM"
  domain: string; // e.g. "Cloud & DevOps", "Finance & Accounting", "Healthcare & Licensure"
  level: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  costBand: "Free" | "Low (<5k)" | "Medium (5k-20k)" | "High (>20k)";
  validityYears?: number; // undefined = lifetime
  examMode: "Online" | "Offline" | "Proctored";
  recognition: "industry" | "india_regulated" | "global";
  officialUrl: string;
  renewalRules?: string;
  meta: VerificationMeta;
}

export interface BridgeStep {
  step: number;
  title: string;
  type: "course" | "cert" | "portfolio" | "internship";
  detail: string;
  estimatedMonths: number;
  sourceUrl?: string;
}

export interface SwitchPath {
  id: string;
  fromDegreeFamily: string;
  toOccupationTitle: string;
  bridgeSteps: BridgeStep[];
  typicalDuration: string;
  whyFeasible: string;
  growthPotential: "high" | "moderate";
}

export interface Scheme {
  id: string;
  name: string;
  category: "fellowship" | "scholarship" | "entrepreneurship" | "incubation";
  agency: string; // e.g. "DST / Ministry of Science & Tech", "Ministry of MSME", "Startup India"
  targetAudience: string;
  benefits: string; // e.g. "₹50 Lakhs seed loan", "₹12,400/month stipend", "₹10 Lakhs grant"
  eligibilityRules: string;
  officialUrl: string;
  meta: VerificationMeta;
}

export interface UserDegreeRecord {
  degreeId: string;
  specialization?: string;
  status: DegreeStatus;
  enrollmentStatus?: DegreeStatus;
  degreeName?: string;
  academicLevel?: string;
  yearOrSemester?: string; // e.g. "3rd Year" or "Sem 6"
  completionYear?: number; // e.g. 2024
  mode: StudyMode;
  marksPercent?: number; // Optional
  dob?: string; // Optional ISO YYYY-MM-DD
  category?: SocialCategory; // Optional
  state?: string; // Optional domicile
}

export interface UserProfileContext {
  degrees: UserDegreeRecord[];
  activeDegreeIndex: number;
}

export type EligibilityVerdict =
  | "ELIGIBLE"
  | "CHECK_NOTIFICATION"
  | "NOT_ELIGIBLE";

export interface RuleEngineResult {
  verdict: EligibilityVerdict;
  headline: string;
  failingRules: string[];
  passingRules: string[];
  guidanceNotes: string[];
  ageCalculated?: {
    userAgeYears?: number;
    maxAgeAllowed?: number;
    minAgeAllowed?: number;
    ageRunwayYears?: number;
  };
}
