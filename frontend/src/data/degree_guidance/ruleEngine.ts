import {
  Exam,
  GovPost,
  Degree,
  DegreeFamily,
  UserDegreeRecord,
  RuleEngineResult,
  EligibilityVerdict,
  SocialCategory
} from "./types";

/**
 * Calculates accurate age in completed years from an ISO DOB string (YYYY-MM-DD).
 */
export function calculateAge(dobIso?: string, referenceDate: Date = new Date()): number | undefined {
  if (!dobIso) return undefined;
  const birth = new Date(dobIso);
  if (isNaN(birth.getTime())) return undefined;

  let age = referenceDate.getFullYear() - birth.getFullYear();
  const m = referenceDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && referenceDate.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
}

/**
 * Normalizes year or semester string to determine whether student is in final year.
 */
export function isFinalYearOrLater(yearOrSem?: string, durationYears: number = 3): boolean {
  if (!yearOrSem) return true; // optimistic default
  const lower = yearOrSem.toLowerCase();
  
  if (lower.includes("final") || lower.includes("last")) return true;
  
  // Semester checks
  if (lower.includes("sem 8") || lower.includes("sem 7")) return true;
  if (durationYears === 3 && (lower.includes("sem 5") || lower.includes("sem 6"))) return true;
  if (durationYears === 2 && (lower.includes("sem 3") || lower.includes("sem 4"))) return true;
  if (durationYears === 5 && (lower.includes("sem 9") || lower.includes("sem 10"))) return true;

  // Year checks
  if (lower.includes(`year ${durationYears}`) || lower.includes(`${durationYears}th year`) || lower.includes(`${durationYears}rd year`)) return true;
  if (durationYears === 4 && (lower.includes("4th year") || lower.includes("year 4") || lower.includes("fourth year"))) return true;
  if (durationYears === 3 && (lower.includes("3rd year") || lower.includes("year 3") || lower.includes("third year"))) return true;
  if (durationYears === 5 && (lower.includes("5th year") || lower.includes("year 5") || lower.includes("fifth year"))) return true;

  return false;
}

/**
 * Main Rule Engine Function:
 * Evaluates exam eligibility against candidate profile and degree rules.
 */
export function evaluateExamEligibility(
  exam: Exam,
  degree: Degree,
  family: DegreeFamily,
  user: UserDegreeRecord
): RuleEngineResult {
  const passingRules: string[] = [];
  const failingRules: string[] = [];
  const guidanceNotes: string[] = [];

  const rawCat = String(user.category || "general").toLowerCase();
  const userCategory: SocialCategory = rawCat.includes("obc")
    ? "obc"
    : rawCat.includes("sc") || rawCat.includes("st")
    ? "sc_st"
    : rawCat.includes("ews")
    ? "ews"
    : "general";

  const rawDob = user.dob || (user as any).dateOfBirth;
  const userAge = calculateAge(rawDob);
  const userMarks = user.marksPercent !== undefined ? user.marksPercent : (user as any).marksPercentage;

  const durationYears = degree.structure?.durationStandardYears || 3;
  const isFinalYear = isFinalYearOrLater(user.yearOrSemester, durationYears);

  // 1. DEGREE / ACADEMIC QUALIFICATION RULE
  const isAnyGraduateExam = exam.eligibilityRules.anyRecognizedGraduate === true;
  const isFamilyAllowed = exam.eligibilityRules.degreeFamilies.includes(family.id) ||
    exam.eligibilityRules.degreeFamilies.includes("all_graduates") ||
    isAnyGraduateExam;
  const isDegreeAllowed = !exam.eligibilityRules.allowedDegrees ||
    exam.eligibilityRules.allowedDegrees.includes(degree.id);

  // Known specific academic constraints
  let customRuleViolation: string | null = null;
  if (exam.id === "iit-jam" && (degree.id === "btech-cse" || degree.id === "bca" || degree.id === "bsc-cs")) {
    customRuleViolation = "IIT JAM does not conduct a Computer Science paper (candidates appear for Mathematics or Mathematical Statistics papers, or consider GATE / NIMCET).";
  }
  if (exam.id === "mpt-cet" && degree.id !== "bpt") {
    customRuleViolation = "Master of Physiotherapy (MPT) strictly requires a completed Bachelor of Physiotherapy (BPT) with compulsory internship.";
  }
  if (exam.id === "gpat" && degree.id !== "bpharm") {
    customRuleViolation = "GPAT entrance strictly requires B.Pharm graduation.";
  }

  if (customRuleViolation) {
    failingRules.push(customRuleViolation);
  } else if (isAnyGraduateExam) {
    passingRules.push(`Eligible via "Any Recognized Graduate" pathway (${degree.name}).`);
  } else if (isFamilyAllowed && isDegreeAllowed) {
    passingRules.push(`Eligible discipline: ${degree.name} in ${family.name}.`);
  } else {
    failingRules.push(
      `Discipline requirement not met: Requires degree in [${exam.eligibilityRules.degreeFamilies.join(", ")}], while current degree is ${degree.name}.`
    );
  }

  // 2. STATUS & STAGE RULE
  if (user.status === "pursuing") {
    if (exam.eligibilityRules.finalYearStudentsEligible) {
      if (isFinalYear) {
        passingRules.push("Final year appearing: Eligible to sit for exam (provisional entry).");
      } else {
        guidanceNotes.push(
          `Currently in ${user.yearOrSemester || "early year"}. You become eligible to sit for ${exam.acronym || exam.name} in your final year (Year ${durationYears}). Great time for foundation prep!`
        );
      }
    } else {
      failingRules.push("Exam requires completed degree prior to application registration date.");
    }
  } else {
    passingRules.push("Degree completed: Meets full graduation qualification.");
  }

  // 3. MINIMUM MARKS % RULE
  const minMarksRequired = exam.eligibilityRules.minMarks
    ? (userCategory === "sc_st" || userCategory === "obc"
        ? (exam.eligibilityRules.minMarks.reserved ?? exam.eligibilityRules.minMarks.general)
        : exam.eligibilityRules.minMarks.general)
    : undefined;

  if (minMarksRequired !== undefined) {
    if (userMarks !== undefined) {
      if (userMarks >= minMarksRequired) {
        passingRules.push(`Marks requirement met: Scored ${userMarks}% (Minimum required: ${minMarksRequired}%).`);
      } else {
        failingRules.push(
          `Minimum aggregate marks not met: Scored ${userMarks}%, but ${exam.acronym || exam.name} mandates minimum ${minMarksRequired}% for ${userCategory.toUpperCase()} category.`
        );
      }
    } else {
      guidanceNotes.push(
        `Marks threshold: Requires minimum ${minMarksRequired}% aggregate in graduation (${userCategory.toUpperCase()} category). Add marks % to confirm.`
      );
    }
  }

  // 4. AGE LIMIT RULE & RUNWAY CALCULATION
  let ageCalculatedInfo: RuleEngineResult["ageCalculated"] = undefined;
  const ageRange = exam.eligibilityRules.ageRange;

  if (ageRange) {
    let maxAllowed = ageRange.maxGeneral;
    if (userCategory === "obc" && ageRange.maxObc) {
      maxAllowed = ageRange.maxObc;
    } else if (userCategory === "obc" && maxAllowed) {
      maxAllowed += 3; // Standard central govt 3-year OBC relaxation
    } else if (userCategory === "sc_st" && ageRange.maxScSt) {
      maxAllowed = ageRange.maxScSt;
    } else if (userCategory === "sc_st" && maxAllowed) {
      maxAllowed += 5; // Standard central govt 5-year SC/ST relaxation
    }

    const minAllowed = ageRange.min;

    if (userAge !== undefined) {
      const runway = maxAllowed !== undefined ? Math.max(0, maxAllowed - userAge) : undefined;
      ageCalculatedInfo = {
        userAgeYears: userAge,
        maxAgeAllowed: maxAllowed,
        minAgeAllowed: minAllowed,
        ageRunwayYears: runway
      };

      if (minAllowed !== undefined && userAge < minAllowed) {
        failingRules.push(`Minimum age requirement: Must be at least ${minAllowed} years old (Current age: ${userAge}).`);
      } else if (maxAllowed !== undefined && userAge > maxAllowed) {
        failingRules.push(
          `Upper age limit exceeded: Maximum age for ${userCategory.toUpperCase()} category is ${maxAllowed} years (Current age: ${userAge}).`
        );
      } else {
        passingRules.push(
          `Age eligible: ${userAge} years old (Permitted range: ${minAllowed || 18} to ${maxAllowed || "No limit"} for ${userCategory.toUpperCase()}). Runway: ${runway} years remaining.`
        );
      }
    } else {
      guidanceNotes.push(
        `Age limit applies: Max ${maxAllowed || "specified in notification"} years for ${userCategory.toUpperCase()} category${minAllowed ? ` (Min ${minAllowed} years)` : ""}. Add Date of Birth in profile to verify exact runway.`
      );
    }
  }

  // 5. ATTEMPTS LIMIT
  if (exam.eligibilityRules.maxAttempts) {
    const maxAtt = userCategory === "general"
      ? exam.eligibilityRules.maxAttempts.general
      : userCategory === "obc"
      ? exam.eligibilityRules.maxAttempts.obc
      : exam.eligibilityRules.maxAttempts.sc_st;
    
    guidanceNotes.push(
      `Attempt limit: ${maxAtt >= 90 ? "Unlimited attempts up to upper age limit" : `${maxAtt} attempts permitted for ${userCategory.toUpperCase()}`}.`
    );
  }

  // DETERMINE FINAL VERDICT
  let verdict: EligibilityVerdict = "ELIGIBLE";
  let headline = "Fully Eligible Based on Rules";

  if (failingRules.length > 0) {
    verdict = "NOT_ELIGIBLE";
    headline = failingRules[0];
  } else if (guidanceNotes.some(g => g.includes("Add marks %") || g.includes("Add Date of Birth") || g.includes("early year"))) {
    verdict = "CHECK_NOTIFICATION";
    headline = "Likely Eligible — Confirm Optional Fields";
  }

  return {
    verdict,
    headline,
    failingRules,
    passingRules,
    guidanceNotes,
    ageCalculated: ageCalculatedInfo
  };
}

/**
 * Evaluates eligibility for a Government Post based on post rules and associated exam.
 */
export function evaluateGovPostEligibility(
  post: GovPost,
  exam: Exam | undefined,
  degree: Degree,
  family: DegreeFamily,
  user: UserDegreeRecord
): RuleEngineResult {
  if (exam) {
    const examResult = evaluateExamEligibility(exam, degree, family, user);
    // Add post-specific context
    if (post.level === "state" && post.stateName && user.state) {
      if (user.state.toLowerCase() !== post.stateName.toLowerCase()) {
        examResult.guidanceNotes.push(
          `State domicile note: This is a ${post.stateName} recruitment. Non-domicile candidates may be treated as Open/General category regardless of home state reservation.`
        );
      } else {
        examResult.passingRules.push(`State domicile matched: ${post.stateName}.`);
      }
    }
    return examResult;
  }

  // Direct recruitment post without separate exam registry record
  const userCategory: SocialCategory = user.category || "general";
  const userAge = calculateAge(user.dob);
  const passingRules: string[] = [];
  const failingRules: string[] = [];
  const guidanceNotes: string[] = [];

  const isFamilyAllowed = post.eligibilityRules.allowedDegreeFamilies.includes(family.id) ||
    post.eligibilityRules.anyRecognizedGraduate;

  if (isFamilyAllowed) {
    passingRules.push(`Eligible degree: ${degree.name} for ${post.post}.`);
  } else {
    failingRules.push(`Requires qualification in [${post.eligibilityRules.allowedDegreeFamilies.join(", ")}].`);
  }

  const maxAllowed = userCategory === "obc"
    ? post.ageLimitRules.obc
    : userCategory === "sc_st"
    ? post.ageLimitRules.sc_st
    : post.ageLimitRules.general;

  if (userAge !== undefined) {
    if (userAge > maxAllowed) {
      failingRules.push(`Exceeds age limit of ${maxAllowed} years (Candidate age: ${userAge}).`);
    } else {
      passingRules.push(`Meets age limit (Max ${maxAllowed} for ${userCategory.toUpperCase()}).`);
    }
  } else {
    guidanceNotes.push(`Upper age limit: ${maxAllowed} years for ${userCategory.toUpperCase()}.`);
  }

  const verdict: EligibilityVerdict = failingRules.length > 0 ? "NOT_ELIGIBLE" : "ELIGIBLE";
  return {
    verdict,
    headline: failingRules.length > 0 ? failingRules[0] : "Eligible for this post",
    failingRules,
    passingRules,
    guidanceNotes
  };
}
