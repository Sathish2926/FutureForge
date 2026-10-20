import { getDegreeById } from "../src/data/degree_guidance/degreesData";
import { resolveDegreeGuidance } from "../src/data/degree_guidance/guidanceResolver";
import { UserDegreeRecord } from "../src/data/degree_guidance/types";

console.log("=================================================================");
console.log("🧪 FUTUREFORGE — ACADEMIC PROGRESSION & HIGHER STUDIES ACCEPTANCE TESTS");
console.log("=================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    if (failureDetails) console.error(`     Reason: ${failureDetails}`);
    failed++;
  }
}

// -------------------------------------------------------------
// Test 1: M.Tech CSE -> Higher Studies
// Expected: Ph.D / Doctoral / valid next-level options
// Must NOT contain: M.Tech CSE
// -------------------------------------------------------------
console.log("\n--- TEST 1: M.Tech CSE -> Higher Studies (Excludes duplicate M.Tech) ---");
const mtechGuidance = resolveDegreeGuidance("mtech-cse", {
  degreeId: "mtech-cse",
  degreeName: "M.Tech CSE",
  academicLevel: "postgraduate",
  enrollmentStatus: "completed",
});

const mtechHigherStudies = mtechGuidance.higherStudies;
console.log(`Higher Studies returned (${mtechHigherStudies.length}):`);
mtechHigherStudies.forEach((hs) => console.log(` - [${hs.study.level}] ${hs.study.program} (ID: ${hs.study.id})`));

assert(
  mtechHigherStudies.length > 0,
  "M.Tech CSE has valid higher studies recommendations"
);

assert(
  !mtechHigherStudies.some((hs) => hs.study.id === "mtech-cse" || hs.study.program.toLowerCase().includes("m.tech in computer science")),
  "HARD RULE: Higher Studies must NEVER recommend M.Tech CSE to an M.Tech CSE graduate",
  `Found: ${mtechHigherStudies.map((hs) => hs.study.program).join(", ")}`
);

assert(
  mtechHigherStudies.some((hs) => hs.study.level === "Doctoral" || hs.study.id.startsWith("phd-") || hs.study.program.includes("Ph.D")),
  "Higher Studies contains Doctoral / Ph.D programs for M.Tech CSE"
);

const topHs = mtechHigherStudies[0];
assert(
  Boolean(topHs.validation?.whyRecommended && topHs.validation?.eligibilityExplanation && topHs.validation?.actionAdvice),
  "Factual explainability fields (whyRecommended, eligibilityExplanation, actionAdvice) are populated"
);

// -------------------------------------------------------------
// Test 2: B.Tech CSE -> Higher Studies
// Expected: M.Tech / MS / relevant PG / MBA
// -------------------------------------------------------------
console.log("\n--- TEST 2: B.Tech CSE -> Higher Studies ---");
const btechGuidance = resolveDegreeGuidance("btech-cse", {
  degreeId: "btech-cse",
  degreeName: "B.Tech CSE",
  academicLevel: "undergraduate",
  enrollmentStatus: "completed",
});
const btechHs = btechGuidance.higherStudies;
console.log(`B.Tech CSE Higher Studies returned (${btechHs.length}):`);
btechHs.forEach((hs) => console.log(` - [${hs.study.level}] ${hs.study.program}`));

assert(
  btechHs.some((hs) => hs.study.program.includes("M.Tech") || hs.study.program.includes("MS") || hs.study.program.includes("MBA")),
  "B.Tech CSE recommends Master's level programs (M.Tech, MS, MBA)"
);

assert(
  !btechHs.some((hs) => hs.study.program.startsWith("B.Tech") || hs.study.program.startsWith("BCA") || hs.study.program.startsWith("B.Sc")),
  "B.Tech CSE does NOT recommend undergraduate degrees as Higher Studies"
);

// -------------------------------------------------------------
// Test 3: M.Sc CS -> Higher Studies
// Expected: Ph.D / valid advanced programs
// -------------------------------------------------------------
console.log("\n--- TEST 3: M.Sc CS -> Higher Studies ---");
const mscGuidance = resolveDegreeGuidance("msc-cs", {
  degreeId: "msc-cs",
  degreeName: "M.Sc CS",
  academicLevel: "postgraduate",
  enrollmentStatus: "completed",
});
const mscHs = mscGuidance.higherStudies;
console.log(`M.Sc CS Higher Studies returned (${mscHs.length}):`);
mscHs.forEach((hs) => console.log(` - [${hs.study.level}] ${hs.study.program}`));

assert(
  mscHs.some((hs) => hs.study.level === "Doctoral" || hs.study.program.includes("Ph.D") || hs.study.id.startsWith("phd-")),
  "M.Sc CS recommends Ph.D / Doctoral options"
);

assert(
  !mscHs.some((hs) => hs.study.id === "msc-cs" || hs.study.program.toLowerCase().includes("m.sc in computer science")),
  "M.Sc CS does NOT recommend M.Sc CS back to the user"
);

// -------------------------------------------------------------
// Test 4: Ph.D CSE -> Higher Studies
// Expected: No ordinary Master's recommendation
// -------------------------------------------------------------
console.log("\n--- TEST 4: Ph.D CSE -> Higher Studies (No ordinary Master's) ---");
const phdGuidance = resolveDegreeGuidance("phd-cse", {
  degreeId: "phd-cse",
  degreeName: "Ph.D in CSE",
  academicLevel: "postgraduate",
  enrollmentStatus: "completed",
});
const phdHs = phdGuidance.higherStudies;
console.log(`Ph.D CSE Higher Studies returned (${phdHs.length}):`);
phdHs.forEach((hs) => console.log(` - [${hs.study.level}] ${hs.study.program}`));

assert(
  phdHs.length > 0 && phdHs.every((hs) => !hs.study.program.includes("M.Tech") && !hs.study.program.includes("MCA") && !hs.study.program.includes("B.Tech")),
  "Ph.D CSE receives Post-Doctoral / Fellowships and NO ordinary Master's or Bachelor's degrees"
);

// -------------------------------------------------------------
// Test 5: M.Tech CSE -> Careers
// Expected: Software Engineer, AI/ML, Cloud, Systems, Research R&D
// No unrelated Mechanical/Civil Core GET
// -------------------------------------------------------------
console.log("\n--- TEST 5: M.Tech CSE -> Careers (Discipline-Aware) ---");
const mtechCareers = mtechGuidance.privateCareers;
console.log(`M.Tech CSE Private Careers (${mtechCareers.length}):`);
mtechCareers.forEach((c) => console.log(` - ${c.title} (${c.sector})`));

assert(
  mtechCareers.some((c) => c.title.includes("Architect") || c.title.includes("AI") || c.title.includes("Cloud") || c.title.includes("Security") || c.title.includes("Scientist")),
  "M.Tech CSE careers prioritize advanced Computing, AI, Cloud, and Systems roles"
);

assert(
  !mtechCareers.some((c) => c.title.toLowerCase().includes("core & automation") || c.title.toLowerCase().includes("mechanical") || c.title.toLowerCase().includes("thermodynamics")),
  "M.Tech CSE careers do NOT contain unrelated Core Mechanical/Civil GET roles"
);

// -------------------------------------------------------------
// Test 6: M.Tech CSE Pursuing vs Completed Status Handling
// Expected: Pursuing receives enrolled semester milestones, Completed receives graduate milestones
// -------------------------------------------------------------
console.log("\n--- TEST 6: M.Tech CSE Pursuing vs Completed Status Handling ---");
const pursuingRecord: UserDegreeRecord = {
  degreeId: "mtech-cse",
  degreeName: "M.Tech Computer Science & Engineering",
  academicLevel: "postgraduate",
  status: "pursuing",
  mode: "regular",
};

const completedRecord: UserDegreeRecord = {
  degreeId: "mtech-cse",
  degreeName: "M.Tech Computer Science & Engineering",
  academicLevel: "postgraduate",
  status: "completed",
  completionYear: 2024,
  mode: "regular",
};

const pursuingGuidance = resolveDegreeGuidance("mtech-cse", pursuingRecord);
const completedGuidance = resolveDegreeGuidance("mtech-cse", completedRecord);

assert(
  pursuingGuidance.statusMessage?.type === "pursuing",
  "Pursuing student receives statusMessage with type 'pursuing'"
);

assert(
  completedGuidance.statusMessage?.type === "completed",
  "Completed graduate receives statusMessage with type 'completed'"
);

assert(
  pursuingGuidance.timelinePhases.some((p) => p.title.includes("Advanced Specialization") || p.title.includes("Entrance Exam")),
  "Pursuing student receives entrance exam preparation and thesis milestones"
);

assert(
  completedGuidance.timelinePhases.some((p) => p.title.includes("Early Career") || p.title.includes("Doctoral")),
  "Completed graduate receives early career and doctoral advancement milestones"
);

console.log("\n=================================================================");
console.log(`📊 FINAL TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=================================================================\n");

if (failed > 0) {
  process.exit(1);
}
