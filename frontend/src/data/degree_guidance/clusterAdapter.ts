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
import { resolveDegreeGuidance, ResolvedDegreeGuidance } from "./guidanceResolver";
import {
  DegreeCluster,
  JobOutcome,
  HigherEdOutcome,
  CertificationOutcome,
  GovtExamOutcome,
  EntrepreneurshipOutcome,
  CareerSwitchOutcome
} from "../../components/graduate_navigator/GraduateNavigatorData";

export interface RoadmapStepItem {
  phase: string;
  timeframe: string;
  focus: string;
  deliverables: string[];
  exitMilestone: string;
}

export type CareerTypeLabel =
  | "Direct"
  | "Related / Bridge"
  | "Advanced / Higher Study"
  | "Regulated"
  | "Exploratory";

export interface EnhancedJobOutcome extends JobOutcome {
  id: string;
  careerType: CareerTypeLabel;
  whyAppears: string;
  transferableSkills: string[];
  missingSkills: string[];
  suggestedNextAction: string;
  linkedCareerId?: string;
  employerType?: "private" | "psu" | "government" | "self";
}

export interface EnhancedGovtOutcome extends GovtExamOutcome {
  id: string;
  verdict: "ELIGIBLE" | "CHECK_NOTIFICATION" | "NOT_ELIGIBLE";
  verdictHeadline: string;
  ageRunway?: number;
  officialUrl: string;
  recruitingBody: string;
  failingRules: string[];
  passingRules: string[];
  notes?: string;
}

export interface EnhancedHigherEdOutcome extends HigherEdOutcome {
  id: string;
  program: string;
  eligibilityVerdict?: string;
  entranceExamsDetails: { name: string; verdict: string }[];
  officialUrl?: string;
}

export interface EnhancedCertOutcome extends CertificationOutcome {
  id: string;
  prerequisites: string[];
  officialUrl: string;
  recognition: string;
}

export interface EnhancedSwitchOutcome extends CareerSwitchOutcome {
  id: string;
  existingFoundation: string;
  bridgeSkills: string[];
  suggestedPortfolio: string;
  potentialTargetRoles: string[];
}

export interface UniversalGuidanceViewData {
  degree: Degree;
  family: DegreeFamily;
  userRecord: UserDegreeRecord;
  resolved: ResolvedDegreeGuidance;
  cluster: DegreeCluster;
  enhancedJobs: EnhancedJobOutcome[];
  enhancedGovt: EnhancedGovtOutcome[];
  enhancedHigherEd: EnhancedHigherEdOutcome[];
  enhancedCerts: EnhancedCertOutcome[];
  enhancedSwitches: EnhancedSwitchOutcome[];
  roadmaps: RoadmapStepItem[];
  isProvisional: boolean;
}

/**
 * Categorize career role into Direct, Related, Advanced, Regulated, or Exploratory
 */
function classifyCareerType(roleTitle: string, degree: Degree, family: DegreeFamily): CareerTypeLabel {
  const lowerRole = roleTitle.toLowerCase();
  const lowerDeg = degree.name.toLowerCase();

  if (/\b(doctor|physician|surgeon|advocate|lawyer|pharmacist|registered nurse|chartered accountant|architect)\b/i.test(lowerRole)) {
    return "Regulated";
  }
  if (/\b(researcher|scientist|professor|phd|lead specialist|principal)\b/i.test(lowerRole)) {
    return "Advanced / Higher Study";
  }
  if (family.defaultPrivateCareers.some(c => c.title.toLowerCase() === lowerRole)) {
    return "Direct";
  }
  if (/\b(analyst|consultant|manager|specialist|designer|engineer)\b/i.test(lowerRole)) {
    return "Related / Bridge";
  }
  return "Exploratory";
}

/**
 * Determine transferable vs missing skills for a target occupation
 */
function analyzeSkillGaps(degree: Degree, occupation: Occupation): {
  transferable: string[];
  missing: string[];
} {
  const degreeSkills = new Set(degree.skillsGained.map((s) => s.toLowerCase()));
  const transferable: string[] = [];
  const missing: string[] = [];

  occupation.skills.forEach((skill) => {
    const sLower = skill.toLowerCase();
    const hasOverlap = Array.from(degreeSkills).some((ds) => ds.includes(sLower) || sLower.includes(ds));
    if (hasOverlap) {
      transferable.push(skill);
    } else {
      missing.push(skill);
    }
  });

  // Fallbacks if lists are empty
  if (transferable.length === 0) {
    transferable.push(degree.skillsGained[0] || "Foundational Analytical Thinking");
    if (degree.skillsGained[1]) transferable.push(degree.skillsGained[1]);
  }
  if (missing.length === 0) {
    missing.push("Production-Grade Project Implementation", "Technical Interview Prep & System Portfolio");
  }

  return { transferable, missing };
}

/**
 * Concrete next action based on career type & status
 */
function buildNextAction(
  careerType: CareerTypeLabel,
  roleTitle: string,
  userStatus: string
): string {
  if (userStatus === "pursuing") {
    return `Master core degree subjects while spending 1 hour daily building 1 hands-on sample project for ${roleTitle}.`;
  }
  if (careerType === "Regulated") {
    return `Complete statutory council internship hours and register with the state licensing board.`;
  }
  if (careerType === "Advanced / Higher Study") {
    return `Review previous 3 years' entrance test questions (GATE / CUET-PG / NET) and identify target university labs.`;
  }
  if (careerType === "Related / Bridge") {
    return `Complete 1 capstone project bridging your degree foundation to ${roleTitle} and publish live on GitHub / portfolio.`;
  }
  return `Build one production-style project demonstrating real-world workflow and publish it with documentation on GitHub / portfolio.`;
}

/**
 * Adapts any Degree + UserDegreeRecord into a unified, rich representation
 */
export function buildUniversalGuidance(
  degree: Degree,
  userRecord: UserDegreeRecord,
  secondaryDegree?: Degree
): UniversalGuidanceViewData {
  const resolved = resolveDegreeGuidance(degree, userRecord);
  const family = resolved.family;
  const isProvisional = Boolean(degree.meta?.needsVerification || degree.id.startsWith("custom-"));

  // 1. Enhanced Jobs
  const enhancedJobs: EnhancedJobOutcome[] = resolved.privateCareers.map((occ) => {
    const careerType = classifyCareerType(occ.title, degree, family);
    const { transferable, missing } = analyzeSkillGaps(degree, occ);
    const whyAppears = `${degree.shortName} provides grounding in ${degree.subjectsTaught.slice(0, 2).join(" & ")}, giving you direct transferable foundations for ${occ.title}.`;
    const suggestedNextAction = buildNextAction(careerType, occ.title, userRecord.status);

    const salaryMin = occ.indicativeSalary?.minLPA || 4;
    const salaryMax = occ.indicativeSalary?.maxLPA || 8;
    const salaryRange = `₹${salaryMin} - ₹${salaryMax} LPA (Indicative • ${occ.indicativeSalary?.year || 2025})`;

    return {
      id: occ.id,
      role: occ.title,
      salaryRange,
      description: occ.description,
      topEmployers: occ.topEmployers || ["Leading Industry Enterprises"],
      keySkills: occ.skills || [],
      fitReason: whyAppears,
      careerType,
      whyAppears,
      transferableSkills: transferable,
      missingSkills: missing,
      suggestedNextAction,
      linkedCareerId: occ.linkedCareerId,
      employerType: occ.employerType
    };
  });

  // 2. Enhanced Government Posts & Exams
  const enhancedGovt: EnhancedGovtOutcome[] = resolved.govtPosts.map((gpItem) => {
    const exam = gpItem.exam;
    const eligibility = gpItem.eligibility;

    const conducting = gpItem.post.recruitingBody || exam?.conductingBody || "Staff Selection / Union Public Service";
    const examName = exam ? `${exam.name} (${exam.acronym})` : gpItem.post.post;

    return {
      id: gpItem.post.id,
      examName,
      conductingBody: conducting,
      targetPosts: gpItem.post.post,
      eligibilityNote: eligibility.headline,
      prepStrategy: exam?.pattern || "General Studies, Quantitative Aptitude, English & Domain Reasoning syllabus.",
      verdict: eligibility.verdict,
      verdictHeadline: eligibility.headline,
      ageRunway: eligibility.ageCalculated?.ageRunwayYears,
      officialUrl: exam?.officialUrl || gpItem.post.meta.sourceUrl,
      recruitingBody: conducting,
      failingRules: eligibility.failingRules || [],
      passingRules: eligibility.passingRules || [],
      notes: exam?.notes
    };
  });

  // 3. Enhanced Higher Education
  const enhancedHigherEd: EnhancedHigherEdOutcome[] = resolved.higherStudies.map((hsItem) => {
    const study = hsItem.study;
    const examsList = hsItem.exams.map((e) => ({
      name: e.exam.acronym,
      verdict: e.eligibility.verdict
    }));

    return {
      id: study.id,
      degree: study.program,
      program: study.program,
      duration: `${study.durationYears} Years (${study.level})`,
      specialization: study.topInstitutesIndia?.slice(0, 2).join(", ") || "Advanced Specialization",
      entranceExams: examsList.map((e) => e.name),
      admissionNotes: `Eligibility: min ${study.eligibilityRules.minMarksPercent || 50}% marks. Top institutes: ${(study.topInstitutesIndia || []).slice(0, 3).join(", ")}.`,
      entranceExamsDetails: examsList,
      officialUrl: study.meta.sourceUrl
    };
  });

  // 4. Enhanced Certifications
  const enhancedCerts: EnhancedCertOutcome[] = resolved.certifications.map((c) => ({
    id: c.id,
    name: c.name,
    provider: c.provider,
    level: c.level,
    estimatedTime: c.costBand === "Free" ? "Free / Self-paced" : `${c.costBand} • 2-3 Months`,
    relevance: `Validates practical ${c.domain} competence recognized by recruiters.`,
    linkNote: `Official URL: ${c.officialUrl}`,
    prerequisites: c.prerequisites || ["Basic degree curriculum"],
    officialUrl: c.officialUrl,
    recognition: c.recognition
  }));

  // 5. Enhanced Career Switches
  const enhancedSwitches: EnhancedSwitchOutcome[] = resolved.switchPaths.map((sw) => ({
    id: sw.id,
    targetField: sw.toOccupationTitle,
    transitionTime: sw.typicalDuration,
    pivotReason: sw.whyFeasible,
    bridgeCourses: sw.bridgeSteps.map((b) => `${b.title} (${b.estimatedMonths}m)`),
    existingFoundation: `${family.name} grounding`,
    bridgeSkills: sw.bridgeSteps.map((b) => b.title),
    suggestedPortfolio: `Complete ${sw.bridgeSteps[sw.bridgeSteps.length - 1]?.detail || "2 portfolio projects"}`,
    potentialTargetRoles: [sw.toOccupationTitle, `Associate ${sw.toOccupationTitle}`]
  }));

  // 6. Status-Aware 4-Step Roadmaps
  const roadmaps: RoadmapStepItem[] = resolved.timelinePhases.map((phase, idx) => ({
    phase: `Step ${idx + 1}: ${phase.title}`,
    timeframe: phase.timeframe,
    focus: phase.focus,
    deliverables: phase.tasks,
    exitMilestone: phase.milestone
  }));

  // Ensure at least 4 clear steps if less
  if (roadmaps.length < 4) {
    roadmaps.push({
      phase: `Step ${roadmaps.length + 1}: Continuous Upskilling & Senior Advancement`,
      timeframe: "Months 12 - 24",
      focus: "Domain Leadership, Certifications & Higher Roles",
      deliverables: [
        "Earn 1 advanced specialty credential",
        "Lead technical delivery on cross-functional initiatives",
        "Mentor junior peers and publish thought leadership"
      ],
      exitMilestone: "Mid-level Promotion / Higher Band Placement"
    });
  }

  const clusterIcon = (
    family.id === "computing" ? "code" :
    family.id === "engineering" ? "cpu" :
    family.id === "commerce" ? "briefcase" :
    family.id === "arts_humanities" || family.id === "education" ? "book" :
    family.id === "design_creative" ? "palette" :
    family.id === "pure_sciences" || family.id === "agriculture" ? "flask" :
    family.id === "health_medicine" ? "pill" :
    family.id === "vocational" ? "wrench" : "compass"
  ) as DegreeCluster["iconType"];

  const pursuingPhase1 = {
    title: resolved.timelinePhases[0]?.title || "Phase 1: Academic & Coding / Lab Foundation",
    timeframe: resolved.timelinePhases[0]?.timeframe || "Years 1 & 2 (Semesters 1 - 4)",
    tasks: resolved.timelinePhases[0]?.tasks || ["Master core syllabus (>7.5 CGPA)", "Build initial sample project", "Earn beginner domain certification"],
    milestone: resolved.timelinePhases[0]?.milestone || "Foundational Certificate cleared"
  };
  const pursuingPhase2 = {
    title: resolved.timelinePhases[1]?.title || "Phase 2: Industry Specialization & Pre-Final Internships",
    timeframe: resolved.timelinePhases[1]?.timeframe || "Year 3 (Semesters 5 - 6)",
    tasks: resolved.timelinePhases[1]?.tasks || ["Secure summer internship", "Prepare for entrance exams", "Publish portfolio projects"],
    milestone: resolved.timelinePhases[1]?.milestone || "Summer Internship Completed"
  };
  const pursuingPhase3 = {
    title: resolved.timelinePhases[2]?.title || "Phase 3: Campus Placements & Competitive Launch",
    timeframe: resolved.timelinePhases[2]?.timeframe || "Year 4 (Semesters 7 - 8)",
    tasks: resolved.timelinePhases[2]?.tasks || ["Participate in hiring drives", "Appear for entrance exams", "Submit capstone thesis"],
    milestone: resolved.timelinePhases[2]?.milestone || "Degree Awarded with First Class Honours"
  };

  const completedPhase1 = {
    title: "Phase 1: Resume Tailoring & Direct Applications",
    timeframe: "Month 1 - Month 3",
    tasks: ["Tailor resume with quantified project outcomes", "Apply to 15 verified openings weekly", "Mock technical interview drills"],
    milestone: "First Round of Interviews Secured"
  };
  const completedPhase2 = {
    title: "Phase 2: Industry Credential & Portfolio Deepening",
    timeframe: "Month 4 - Month 6",
    tasks: ["Earn 1 professional industry credential", "Deploy live client/case study project", "Target off-campus alumni referrals"],
    milestone: "Verified Portfolio & Assessment Clearance"
  };
  const completedPhase3 = {
    title: "Phase 3: Offer Negotiation & Workplace Onboarding",
    timeframe: "Month 7 - Month 9",
    tasks: ["Evaluate compensation structures & equity", "Complete statutory pre-joining background check", "Continuous upskilling in production tools"],
    milestone: "Full-Time Placement Onboarding Completed"
  };

  const cluster: DegreeCluster = {
    id: degree.id,
    name: degree.name,
    shortTitle: degree.shortName,
    typicalDuration: `${degree.structure?.durationStandardYears || 3} Years`,
    iconType: clusterIcon,
    overview: `${degree.name} develops core expertise in ${degree.subjectsTaught.slice(0, 3).join(", ")}. It prepares graduates for direct technical execution, public examinations, and specialized post-graduate studies.`,
    metrics: {
      medianStartingSalary: enhancedJobs[0]?.salaryRange || "₹4 - 7 LPA",
      highDemandSectors: [family.name, "Public Sector", "Enterprise Consulting"],
      avgTimeToOutcome: "3–6 months",
      avgPlacementRate: "72% - 85%"
    },
    jobs: enhancedJobs,
    higherEducation: enhancedHigherEd,
    certifications: enhancedCerts,
    entrepreneurship: (family.defaultPrivateCareers || []).slice(0, 2).map((c, i) => ({
      title: i === 0 ? `${degree.shortName} Independent Consultancy / Agency` : `Specialized Tech / Service Venture in ${family.name}`,
      description: `Leverage your training in ${degree.subjectsTaught[0] || 'Core Domain'} to deliver targeted advisory, freelance client work, or venture solutions.`,
      platformOrEcosystem: "Startup India / GeM Portal / LinkedIn Services / MSME Udyam",
      initialSteps: [
        "Register MSME Udyam certificate (Free)",
        "Build 3 client portfolio case studies demonstrating measurable ROI",
        "Apply for DST / Startup India Seed Fund Scheme"
      ]
    })),
    govtExams: enhancedGovt,
    careerSwitch: enhancedSwitches,
    skillLadder: {
      foundation: {
        technical: degree.subjectsTaught.slice(0, 3),
        soft: ["Analytical Reasoning", "Written Documentation"],
        courses: ["Foundational Degree Curriculum", "NPTEL Core Elective"]
      },
      intermediate: {
        technical: degree.skillsGained.slice(0, 3),
        soft: ["Team Collaboration", "Problem Deconstruction"],
        courses: [enhancedCerts[0]?.name || "Industry Micro-Credential", "Capstone Project Lab"]
      },
      advanced: {
        technical: ["System Design & Production Workflows", "Regulatory Compliance & Auditing"],
        soft: ["Cross-functional Leadership", "Strategic Decision-making"],
        courses: ["Advanced Specialization Track", "Professional Body Licensure"]
      }
    },
    roadmaps: {
      pursuing: {
        phase1: pursuingPhase1,
        phase2: pursuingPhase2,
        phase3: pursuingPhase3
      },
      completed: {
        phase1: completedPhase1,
        phase2: completedPhase2,
        phase3: completedPhase3
      }
    }
  };

  return {
    degree,
    family,
    userRecord,
    resolved,
    cluster,
    enhancedJobs,
    enhancedGovt,
    enhancedHigherEd,
    enhancedCerts,
    enhancedSwitches,
    roadmaps,
    isProvisional
  };
}
