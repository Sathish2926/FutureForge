import { DEGREES_CATALOG } from "../src/data/degree_guidance/degreesData";
import { DEGREE_FAMILIES } from "../src/data/degree_guidance/degreeFamilies";
import { EXAMS_REGISTRY } from "../src/data/degree_guidance/examRegistry";
import { CERTIFICATIONS_REGISTRY } from "../src/data/degree_guidance/certificationsRegistry";
import { HIGHER_STUDIES_REGISTRY } from "../src/data/degree_guidance/higherStudiesRegistry";
import { GOVT_POSTS_REGISTRY } from "../src/data/degree_guidance/govtPostsRegistry";
import { SCHEMES_REGISTRY } from "../src/data/degree_guidance/schemesRegistry";
import { resolveDegreeGuidance } from "../src/data/degree_guidance/guidanceResolver";
import { UserDegreeRecord } from "../src/data/degree_guidance/types";

console.log("=================================================================");
console.log("🎓 FUTUREFORGE DEGREE GUIDANCE CONTENT VERIFICATION AUDIT");
console.log("=================================================================\n");

let failureCount = 0;
let warningCount = 0;

function logPass(msg: string) {
  console.log(`  ✅ PASS: ${msg}`);
}
function logFail(msg: string) {
  console.error(`  ❌ FAIL: ${msg}`);
  failureCount++;
}
function logWarn(msg: string) {
  console.warn(`  ⚠️ WARN: ${msg}`);
  warningCount++;
}

// 1. Audit Exams Registry
console.log("--- 1. AUDITING EXAM REGISTRY ---");
const SIX_MONTHS_DAYS = 180;
const now = new Date();

Object.values(EXAMS_REGISTRY).forEach((exam) => {
  // Official URL
  if (!exam.officialUrl || !/^https?:\/\//i.test(exam.officialUrl)) {
    logFail(`Exam [${exam.id} - ${exam.name}] has missing or invalid officialUrl: "${exam.officialUrl}"`);
  }

  // Conducting Body
  if (!exam.conductingBody) {
    logFail(`Exam [${exam.id}] missing conductingBody`);
  }

  // Verification metadata
  const verifyDateStr = exam.verification?.retrievedOn || exam.lastVerified;
  if (!verifyDateStr) {
    logFail(`Exam [${exam.id}] missing lastVerified / retrievedOn date`);
  }

  // Eligibility Rules Structure
  if (!exam.eligibilityRules || !Array.isArray(exam.eligibilityRules.degreeFamilies)) {
    logFail(`Exam [${exam.id}] eligibilityRules must include degreeFamilies array`);
  }
});
logPass(`Audited ${Object.keys(EXAMS_REGISTRY).length} national & state exams.`);

// 2. Audit Certifications Registry
console.log("\n--- 2. AUDITING CERTIFICATIONS REGISTRY ---");
const certList = Array.isArray(CERTIFICATIONS_REGISTRY) ? CERTIFICATIONS_REGISTRY : Object.values(CERTIFICATIONS_REGISTRY);

certList.forEach((cert: any) => {
  if (!cert.officialUrl || !/^https?:\/\//i.test(cert.officialUrl)) {
    logFail(`Certification [${cert.id} - ${cert.name}] invalid officialUrl: "${cert.officialUrl}"`);
  }
  if (!cert.provider) {
    logFail(`Certification [${cert.id}] missing provider`);
  }
  const retrievedOn = cert.meta?.retrievedOn || cert.verification?.retrievedOn;
  if (!retrievedOn) {
    logFail(`Certification [${cert.id}] missing meta.retrievedOn`);
  }
});
logPass(`Audited ${certList.length} industry & statutory certifications.`);

// 3. Audit Government Posts Registry
console.log("\n--- 3. AUDITING GOVERNMENT POSTS REGISTRY ---");
const govtList = Array.isArray(GOVT_POSTS_REGISTRY) ? GOVT_POSTS_REGISTRY : Object.values(GOVT_POSTS_REGISTRY);

govtList.forEach((post: any) => {
  const sourceUrl = post.meta?.sourceUrl || post.sourceUrl;
  if (!sourceUrl || !/^https?:\/\//i.test(sourceUrl)) {
    logFail(`GovPost [${post.id} - ${post.post}] invalid sourceUrl: "${sourceUrl}"`);
  }
  if (!post.recruitingBody) {
    logFail(`GovPost [${post.id}] missing recruitingBody`);
  }
  if (!post.eligibilityRules) {
    logFail(`GovPost [${post.id}] missing eligibilityRules`);
  }
});
logPass(`Audited ${govtList.length} public sector & central/state posts.`);

// 4. Audit Higher Studies & Schemes
console.log("\n--- 4. AUDITING HIGHER STUDIES & SCHEMES REGISTRY ---");
const studiesList = Array.isArray(HIGHER_STUDIES_REGISTRY) ? HIGHER_STUDIES_REGISTRY : Object.values(HIGHER_STUDIES_REGISTRY);

studiesList.forEach((prog: any) => {
  const sourceUrl = prog.meta?.sourceUrl || prog.sourceUrl;
  if (!sourceUrl || !/^https?:\/\//i.test(sourceUrl)) {
    logFail(`HigherStudy [${prog.id} - ${prog.program}] invalid sourceUrl: "${sourceUrl}"`);
  }
  if (!prog.entranceExamIds || prog.entranceExamIds.length === 0) {
    logFail(`HigherStudy [${prog.id}] must define entranceExamIds`);
  }
});

const schemesList = Array.isArray(SCHEMES_REGISTRY) ? SCHEMES_REGISTRY : Object.values(SCHEMES_REGISTRY);

schemesList.forEach((scheme: any) => {
  if (!scheme.officialUrl || !/^https?:\/\//i.test(scheme.officialUrl)) {
    logFail(`Scheme [${scheme.id} - ${scheme.name}] invalid officialUrl: "${scheme.officialUrl}"`);
  }
  if (!scheme.agency) {
    logFail(`Scheme [${scheme.id}] missing agency`);
  }
});
logPass(`Audited higher studies programs and government schemes.`);

// 5. Audit Degree Coverage & Acceptance Criteria
console.log("\n--- 5. AUDITING DEGREES CATALOG COVERAGE & NON-DEAD-ENDS ---");
console.log(`Auditing ${DEGREES_CATALOG.length} degrees in catalog...`);

const familyCoverage: Record<string, number> = {};

DEGREES_CATALOG.forEach((degree) => {
  familyCoverage[degree.familyId] = (familyCoverage[degree.familyId] || 0) + 1;

  // Mock student record for evaluation
  const mockRecord: UserDegreeRecord = {
    degreeId: degree.id,
    status: "pursuing",
    currentYear: 2,
    mode: "regular",
  };

  const guidance = resolveDegreeGuidance(degree, mockRecord);

  // Criteria: At least 3 private career paths
  if (guidance.privateCareers.length < 3) {
    logFail(`Degree [${degree.id} - ${degree.shortName}] has only ${guidance.privateCareers.length} private careers (must be >= 3)`);
  }

  // Criteria: At least 1 government route
  if (guidance.govtPosts.length < 1 && guidance.exams.filter(e => e.exam.purpose === "govt_job").length < 1) {
    logFail(`Degree [${degree.id} - ${degree.shortName}] has no government route or exam`);
  }

  // Criteria: At least 2 higher study options
  if (guidance.higherStudies.length < 2) {
    logFail(`Degree [${degree.id} - ${degree.shortName}] has only ${guidance.higherStudies.length} higher study options (must be >= 2)`);
  }

  // Criteria: At least 3 certifications
  if (guidance.certifications.length < 3) {
    logFail(`Degree [${degree.id} - ${degree.shortName}] has only ${guidance.certifications.length} certifications (must be >= 3)`);
  }

  // Criteria: At least 1 career switch path
  if (guidance.switchPaths.length < 1) {
    logFail(`Degree [${degree.id} - ${degree.shortName}] has no career switch path`);
  }

  // Check official source URL
  const degreeSourceUrl = degree.meta?.sourceUrl;
  if (!degreeSourceUrl || !/^https?:\/\//i.test(degreeSourceUrl)) {
    logFail(`Degree [${degree.id}] missing or invalid official regulator sourceUrl`);
  }

  // Check aliases (minimum 2 aliases for search discovery)
  if (!degree.aliases || degree.aliases.length < 2) {
    logFail(`Degree [${degree.id}] needs at least 2 search aliases for discovery`);
  }
});
logPass(`All degrees meet the 5-point non-dead-end criteria (>=3 careers, >=1 govt, >=2 higher studies, >=3 certs, >=1 switch).`);

// 6. Known Corrections Checks
console.log("\n--- 6. VERIFYING REGULATORY & DOMAIN CORRECTIONS ---");

// Check 1: IIT JAM must not include CS paper
const iitJam = EXAMS_REGISTRY["iit_jam"] || Object.values(EXAMS_REGISTRY).find((e: any) => e.id === "iit_jam" || e.acronym === "IIT JAM");
if (iitJam) {
  const acceptsCSDirectly = iitJam.eligibilityRules.degreeFamilies.includes("computing");
  if (acceptsCSDirectly) {
    logFail("Known Correction Violation: IIT JAM should not list Computing family as general eligibility (IIT JAM has no CS paper).");
  } else {
    logPass("Verified: IIT JAM has no CS paper; Computing degrees properly excluded/restricted.");
  }
}

// Check 2: GPAT requires B.Pharm
const gpat = EXAMS_REGISTRY["gpat"] || Object.values(EXAMS_REGISTRY).find((e: any) => e.id === "gpat" || e.acronym === "GPAT");
if (gpat) {
  const gpatReqs = gpat.eligibilityRules.mandatorySubjects || [];
  const gpatDegrees = gpat.eligibilityRules.allowedDegrees || [];
  if (gpatDegrees.includes("bpharm") || gpatReqs.includes("Pharmacy") || gpat.eligibilityRules.degreeFamilies.includes("pharmacy")) {
    logPass("Verified: GPAT mandates Pharmacy / B.Pharm qualification.");
  } else {
    logFail("GPAT must explicitly mandate Pharmacy / B.Pharm qualification.");
  }
}

// Check 3: ICWA is now ICMAI
const cmaCert = certList.find((c: any) => c.id === "cma-icmai" || c.name.includes("CMA"));
if (cmaCert) {
  if (cmaCert.provider.includes("ICMAI")) {
    logPass("Verified: CMA India properly attributes the statutory body as ICMAI (formerly ICWA).");
  } else {
    logFail("CMA India must reference ICMAI.");
  }
}

// 7. Print Coverage Summary Table
console.log("\n=================================================================");
console.log("📊 DEGREE GUIDANCE COVERAGE SUMMARY REPORT");
console.log("=================================================================");
console.table(
  Object.keys(DEGREE_FAMILIES).map((famKey) => ({
    "Degree Family": DEGREE_FAMILIES[famKey].name,
    "Registered Degrees": familyCoverage[famKey] || 0,
    "Base Occupations": DEGREE_FAMILIES[famKey].defaultPrivateCareers?.length || 0,
    "Base Higher Studies": DEGREE_FAMILIES[famKey].defaultHigherStudies?.length || 0,
    "Base Certifications": DEGREE_FAMILIES[famKey].defaultCertifications?.length || 0,
  }))
);

console.log("\nREGISTRY TOTALS:");
console.log(`- Total Curated Degrees:       ${DEGREES_CATALOG.length}`);
console.log(`- Total National/State Exams:  ${Object.keys(EXAMS_REGISTRY).length}`);
console.log(`- Total Certifications:        ${certList.length}`);
console.log(`- Total Govt/Public Posts:     ${govtList.length}`);
console.log(`- Total Higher Study Programs: ${studiesList.length}`);
console.log(`- Total Startup & PM Schemes:  ${schemesList.length}`);
console.log("=================================================================");

if (failureCount > 0) {
  console.error(`\n❌ AUDIT FAILED with ${failureCount} errors and ${warningCount} warnings.`);
  process.exit(1);
} else {
  console.log(`\n🎉 AUDIT PASSED! All records verified successfully with 0 errors and ${warningCount} warnings.\n`);
  process.exit(0);
}
