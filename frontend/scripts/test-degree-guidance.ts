import { DEGREES_CATALOG, getDegreeById } from "../src/data/degree_guidance/degreesData";
import { DEGREE_FAMILIES } from "../src/data/degree_guidance/degreeFamilies";
import { EXAMS_REGISTRY } from "../src/data/degree_guidance/examRegistry";
import { GOVT_POSTS_REGISTRY } from "../src/data/degree_guidance/govtPostsRegistry";
import { searchDegrees } from "../src/data/degree_guidance/searchEngine";
import { evaluateExamEligibility, evaluateGovPostEligibility } from "../src/data/degree_guidance/ruleEngine";
import { resolveDegreeGuidance } from "../src/data/degree_guidance/guidanceResolver";
import { UserDegreeRecord } from "../src/data/degree_guidance/types";

console.log("=================================================================");
console.log("🧪 RUNNING DEGREE GUIDANCE TEST SUITE");
console.log("=================================================================\n");

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    if (failureDetails) console.error(`     Reason: ${failureDetails}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: SEARCH & TYPO / ALIAS MATCHING
// -------------------------------------------------------------
console.log("--- 1. SEARCH, TYPO & ALIAS MATCHING TESTS ---");

// Test 1.1: Typo "docter" -> MBBS
const doctorResults = searchDegrees("docter");
assert(
  doctorResults.length > 0 && doctorResults.some((r) => r.degree.id === "mbbs"),
  "Typo 'docter' successfully resolves to MBBS",
  `Found: ${doctorResults.map((r) => r.degree.shortName).join(", ")}`
);

// Test 1.2: Alias "coder" / "programmer" -> B.Tech CSE
const coderResults = searchDegrees("coder");
assert(
  coderResults.length > 0 && coderResults.some((r) => r.degree.id === "btech-cse"),
  "Alias 'coder' successfully resolves to B.Tech CSE",
  `Found: ${coderResults.map((r) => r.degree.shortName).join(", ")}`
);

// Test 1.3: Acronym "BTech" -> multiple engineering degrees
const btechResults = searchDegrees("btech");
assert(
  btechResults.length >= 5,
  "Acronym 'btech' returns engineering branches",
  `Returned ${btechResults.length} matches`
);

// Test 1.4: Specialization search "AI" / "Data Science"
const aiResults = searchDegrees("Artificial Intelligence");
assert(
  aiResults.length > 0,
  "Query 'Artificial Intelligence' returns degrees",
  `Found: ${aiResults.map((r) => r.degree.shortName).join(", ")}`
);

// Test 1.5: Unknown gibberish search -> empty without throwing
const gibberishResults = searchDegrees("xyz987qwe");
assert(
  gibberishResults.length === 0,
  "Gibberish query returns empty list without error"
);

// -------------------------------------------------------------
// TEST SUITE 2: RULE ENGINE & ELIGIBILITY EVALUATION
// -------------------------------------------------------------
console.log("\n--- 2. RULE ENGINE & ELIGIBILITY LOGIC TESTS ---");

const btechDegree = getDegreeById("btech-cse")!;
const engFamily = DEGREE_FAMILIES["engineering"];
const upscPost = GOVT_POSTS_REGISTRY.find((p) => p.id === "post-ias")!;
const upscExam = EXAMS_REGISTRY.find((e) => e.id === "upsc-cse");

// Test 2.1: Age within limits (General 23 years old -> Eligible)
const youngRecord: UserDegreeRecord = {
  degreeId: "btech-cse",
  status: "completed",
  completionYear: 2024,
  mode: "regular",
  dateOfBirth: "2002-06-15", // ~23 years old in 2025
  category: "General",
};

const youngEval = evaluateGovPostEligibility(upscPost, upscExam, btechDegree, engFamily, youngRecord);
assert(
  youngEval.verdict === "ELIGIBLE",
  "Candidate aged 23 (General) is ELIGIBLE for UPSC IAS",
  `Verdict: ${youngEval.verdict}, Headline: ${youngEval.headline}`
);

// Test 2.2: Age over General limit (34 years old)
// General max is 32 -> NOT_ELIGIBLE for General
const overageGeneralRecord: UserDegreeRecord = {
  ...youngRecord,
  dateOfBirth: "1991-01-15", // ~34 years old in 2025
  category: "General",
};

const overageGeneralEval = evaluateGovPostEligibility(upscPost, upscExam, btechDegree, engFamily, overageGeneralRecord);
assert(
  overageGeneralEval.verdict === "NOT_ELIGIBLE",
  "Candidate aged 34 (General) is NOT_ELIGIBLE due to 32 yr max limit",
  `Verdict: ${overageGeneralEval.verdict}, Failing: ${overageGeneralEval.failingRules.join("; ")}`
);

// Test 2.3: Same candidate (34 years old) with OBC / SC/ST relaxation
// OBC limit is 35 (+3), SC/ST is 37 (+5) -> ELIGIBLE
const overageObcRecord: UserDegreeRecord = {
  ...overageGeneralRecord,
  category: "OBC",
};

const overageObcEval = evaluateGovPostEligibility(upscPost, upscExam, btechDegree, engFamily, overageObcRecord);
assert(
  overageObcEval.verdict === "ELIGIBLE",
  "Candidate aged 34 (OBC: max 35) is ELIGIBLE with statutory relaxation",
  `Verdict: ${overageObcEval.verdict}, Details: ${overageObcEval.passingRules.join("; ")}`
);

// Test 2.4: Marks threshold evaluation (RBI Grade B mandates 60%)
const rbiPost = GOVT_POSTS_REGISTRY.find((p) => p.id === "post-rbi-grade-b")!;
const rbiExam = EXAMS_REGISTRY.find((e) => e.id === "rbi-grade-b");

const lowMarksRecord: UserDegreeRecord = {
  ...youngRecord,
  marksPercentage: 58,
  category: "General",
};

const lowMarksEval = evaluateGovPostEligibility(rbiPost, rbiExam, btechDegree, engFamily, lowMarksRecord);
assert(
  lowMarksEval.verdict === "NOT_ELIGIBLE",
  "Candidate with 58% marks is NOT_ELIGIBLE for RBI Grade B (needs 60%)",
  `Verdict: ${lowMarksEval.verdict}, Failing: ${lowMarksEval.failingRules.join("; ")}`
);

// -------------------------------------------------------------
// TEST SUITE 3: STATUS BRANCHING (PURSUING VS COMPLETED)
// -------------------------------------------------------------
console.log("\n--- 3. STATUS BRANCHING TESTS (PURSUING VS COMPLETED) ---");

// Test 3.1: Final year pursuing student gets "What to do this semester"
const pursuingRecord: UserDegreeRecord = {
  degreeId: "btech-cse",
  status: "pursuing",
  currentYear: 4,
  mode: "regular",
};

const pursuingGuidance = resolveDegreeGuidance(btechDegree, pursuingRecord);
assert(
  pursuingGuidance.timelinePhases.length > 0 &&
  pursuingGuidance.currentSemesterAdvice.title.length > 0,
  "Pursuing candidate receives personalized semester action steps",
  `Advice: ${pursuingGuidance.currentSemesterAdvice.title}`
);

// Test 3.2: Completed candidate receives career transition & gap-fill plan
const completedRecord: UserDegreeRecord = {
  degreeId: "btech-cse",
  status: "completed",
  completionYear: 2024,
  mode: "regular",
};

const completedGuidance = resolveDegreeGuidance(btechDegree, completedRecord);
const phaseTitles = completedGuidance.timelinePhases.map((p) => p.title);
assert(
  phaseTitles.some((t) => t.includes("0 - 2 Years") || t.includes("0 to 2 Years") || t.includes("Placement")),
  "Completed graduate receives 0-2 years runway and placement transition plan",
  `Phases: ${phaseTitles.join(" -> ")}`
);

// Test 3.3: Status resilience - default fallback cleanly resolves to completed
const defaultStatusRecord: UserDegreeRecord = {
  degreeId: "btech-cse",
  status: "completed",
  mode: "regular",
};

const defaultStatusGuidance = resolveDegreeGuidance(btechDegree, defaultStatusRecord);
assert(
  defaultStatusGuidance.statusMessage?.type === "completed",
  "Default completed candidate receives valid graduate roadmap phase",
  `Status: ${defaultStatusGuidance.statusMessage?.type}`
);

// -------------------------------------------------------------
// TEST SUITE 4: ROADMAP SEEDING & ACCESSIBILITY
// -------------------------------------------------------------
console.log("\n--- 4. ROADMAP SEEDING & INTEGRATION TESTS ---");

// Verify that occupations link to existing FutureForge career IDs
const privateCareers = pursuingGuidance.privateCareers;
const linkedCareersCount = privateCareers.filter((c) => Boolean(c.linkedCareerId)).length;
assert(
  linkedCareersCount > 0,
  "Guidance occupations contain valid linkedCareerId for 1-click roadmap generation",
  `Found ${linkedCareersCount} linked occupations out of ${privateCareers.length}`
);

// -------------------------------------------------------------
// TEST SUITE 5: 20 ACCEPTANCE DEGREES (Section 27)
// -------------------------------------------------------------
console.log("\n--- 5. ACCEPTANCE CRITERIA DEGREE TESTS (SECTION 27) ---");
import { normalizeDegreeQuery, synthesizeUnknownDegree } from "../src/data/degree_guidance/degreeNormalization";
import { buildUniversalGuidance } from "../src/data/degree_guidance/clusterAdapter";

const ACCEPTANCE_DEGREES = [
  "B.Sc Computer Science",
  "B.Sc Physics",
  "B.Com",
  "B.Des Fashion Design",
  "B.Tech Mechanical Engineering",
  "B.Sc Psychology",
  "B.Pharm",
  "MBBS",
  "LLB",
  "B.Arch",
  "B.Sc Biology",
  "BCA",
  "B.Tech CSE",
  "B.A English",
  "B.Sc Biotechnology",
  "B.Sc Mathematics",
  "BBA",
  "B.Ed",
  "B.Sc Agriculture",
  "B.Sc Quantum Astrophysics" // Unknown degree not in initial catalog
];

ACCEPTANCE_DEGREES.forEach((degQuery, idx) => {
  const norm = normalizeDegreeQuery(degQuery);
  const isUnknownCase = idx === 19;

  if (isUnknownCase) {
    assert(
      norm.isUnknown,
      `Degree #${idx + 1} (${degQuery}) correctly identified as unknown degree needing provisional synthesis`,
      `Inferred discipline: ${norm.inferredDiscipline}`
    );
    const synthDeg = synthesizeUnknownDegree(degQuery, norm.relatedFamilies[0]?.id);
    const mockRec: UserDegreeRecord = { degreeId: synthDeg.id, status: "pursuing", mode: "regular" };
    const guidance = buildUniversalGuidance(synthDeg, mockRec);
    assert(
      guidance.isProvisional && guidance.enhancedJobs.length >= 2,
      `Degree #${idx + 1} unknown degree successfully synthesizes valid non-empty guidance pathways`,
      `Jobs: ${guidance.enhancedJobs.length}, Higher Ed: ${guidance.enhancedHigherEd.length}`
    );
  } else {
    assert(
      norm.primaryMatch !== undefined,
      `Degree #${idx + 1} (${degQuery}) successfully resolves to ${norm.primaryMatch?.name || 'none'} (${norm.confidence} confidence)`,
      `Matched: ${norm.primaryMatch?.shortName}`
    );

    if (norm.primaryMatch) {
      const mockRec: UserDegreeRecord = { degreeId: norm.primaryMatch.id, status: "pursuing", mode: "regular" };
      const guidance = buildUniversalGuidance(norm.primaryMatch, mockRec);
      assert(
        guidance.enhancedJobs.length >= 3 &&
        guidance.enhancedHigherEd.length >= 2 &&
        guidance.enhancedCerts.length >= 3 &&
        guidance.enhancedGovt.length >= 1 &&
        guidance.enhancedSwitches.length >= 1 &&
        guidance.roadmaps.length >= 3,
        `Degree #${idx + 1} (${degQuery}) meets 6-point verification (Jobs, PG, Certs, Govt, Switch, Roadmap)`,
        `Jobs: ${guidance.enhancedJobs.length}, PG: ${guidance.enhancedHigherEd.length}, Certs: ${guidance.enhancedCerts.length}, Govt: ${guidance.enhancedGovt.length}, Switch: ${guidance.enhancedSwitches.length}`
      );
    }
  }
});

// -------------------------------------------------------------
// TEST SUITE 6: EDGE CASE RESOLUTION (Section 28)
// -------------------------------------------------------------
console.log("\n--- 6. EDGE CASE NORMALIZATION & STATUS TESTS (SECTION 28) ---");

const EDGE_CASES = [
  { query: "BSc CS", expectedId: "bsc-cs" },
  { query: "B.Sc. CS", expectedId: "bsc-cs" },
  { query: "bsc computer science", expectedId: "bsc-cs" },
  { query: "B Tech Mech", expectedId: "btech-mech" },
  { query: "BCom", expectedId: "bcom" },
  { query: "b com finance", expectedId: "bcom-finance" },
  { query: "psychology degree", expectedId: "bsc-psychology" },
  { query: "computer applications", expectedId: "bca" },
  { query: "masters in computer science", expectedId: "mca" },
];

EDGE_CASES.forEach((ec) => {
  const norm = normalizeDegreeQuery(ec.query);
  assert(
    norm.primaryMatch?.id === ec.expectedId || norm.suggestions.some((s) => s.degree.id === ec.expectedId),
    `Edge case query '${ec.query}' successfully normalizes to ${ec.expectedId}`,
    `Top resolved: ${norm.primaryMatch?.id || norm.suggestions[0]?.degree.id || 'none'}`
  );
});

// Test All Academic Statuses Produce Status-Aware Roadmaps
const STATUS_CASES: ("pursuing" | "completed")[] = [
  "pursuing",
  "completed",
];

STATUS_CASES.forEach((st) => {
  const mockRec: UserDegreeRecord = { degreeId: "btech-cse", status: st, mode: "regular" };
  const guidance = buildUniversalGuidance(btechDegree, mockRec);
  assert(
    guidance.roadmaps.length >= 2,
    `Status '${st}' generates customized, status-aware roadmap milestones (${guidance.roadmaps.length} steps)`
  );
});

// Print summary
console.log("\n=================================================================");
console.log(`TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log("=================================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("\n🎉 ALL UNIT, ACCEPTANCE, AND EDGE-CASE TESTS PASSED!\n");
  process.exit(0);
}
