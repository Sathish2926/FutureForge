import { UNIVERSAL_DEGREES_CATALOG } from "../src/data/degree_guidance/catalog";
import { UniversalDegreeRecord } from "../src/data/degree_guidance/catalog/types";

console.log("=================================================================");
console.log("🎓 FUTUREFORGE MANDATORY DEGREE GUIDANCE VERIFICATION AUDIT (CI)");
console.log("=================================================================\n");

let failureCount = 0;
let warningCount = 0;
const auditedDegrees = UNIVERSAL_DEGREES_CATALOG;

const CURRENT_DATE = new Date("2026-09-29T00:00:00Z");
const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

function logFail(degId: string, rule: string, details: string) {
  console.error(`  ❌ [${degId}] FAIL: ${rule} -> ${details}`);
  failureCount++;
}

function logWarn(degId: string, rule: string, details: string) {
  console.warn(`  ⚠️ [${degId}] WARN: ${rule} -> ${details}`);
  warningCount++;
}

console.log(`Auditing ${auditedDegrees.length} degrees for Section 3 completeness and Section 4 accuracy...\n`);

for (const deg of auditedDegrees) {
  const id = deg.degree_id || deg.id;

  // 1. Overview + Key Skills
  const sentences = (deg.overview || "").split(".").filter(s => s.trim().length > 0);
  if (sentences.length < 2) {
    logFail(id, "Overview", `Overview must have 2-4 sentences grounded in curriculum (got ${sentences.length})`);
  }
  if (!deg.key_skills || deg.key_skills.length < 5) {
    logFail(id, "Key Skills", `key_skills must have >= 5 real skills (got ${deg.key_skills?.length || 0})`);
  }

  // 2. Career Paths (>= 3, entry + senior, match_rationale, salary, sourceUrl, lastReviewed)
  const careers = deg.career_paths || [];
  if (careers.length < 3) {
    logFail(id, "Career Paths Count", `Must have >= 3 career paths (got ${careers.length})`);
  }
  const hasEntry = careers.some(c => c.tier === "entry");
  const hasSenior = careers.some(c => c.tier === "senior");
  if (!hasEntry || !hasSenior) {
    logFail(id, "Career Paths Tiers", `Must contain both entry and senior tier (hasEntry=${hasEntry}, hasSenior=${hasSenior})`);
  }
  for (let i = 0; i < careers.length; i++) {
    const c = careers[i];
    if (!c.match_rationale || c.match_rationale.length < 20) {
      logFail(id, `Career[${i}] Rationale`, `match_rationale missing or too short (length: ${c.match_rationale?.length || 0})`);
    }
    const sal = c.indicative_salary;
    if (!sal || !sal.region || !sal.year || !sal.source) {
      logFail(id, `Career[${i}] Salary`, "Missing region/year/source in indicative_salary");
    }
    if (!c.sourceUrl || !/^https?:\/\//i.test(c.sourceUrl)) {
      logFail(id, `Career[${i}] SourceUrl`, `Invalid sourceUrl: "${c.sourceUrl}"`);
    }
    if (!c.lastReviewed) {
      logFail(id, `Career[${i}] LastReviewed`, "Missing lastReviewed date");
    }
  }

  // 3. Higher Studies (>= 2, entrance_exams, eligibility_rule, sourceUrl)
  const hs = deg.higher_studies || [];
  if (hs.length < 2) {
    logFail(id, "Higher Studies Count", `Must have >= 2 higher studies entries (got ${hs.length})`);
  }
  for (let i = 0; i < hs.length; i++) {
    const h = hs[i];
    if (!h.entrance_exams || h.entrance_exams.length === 0) {
      logFail(id, `HigherStudy[${i}] Exams`, "Must specify entrance_exams");
    }
    if (!h.eligibility_rule || h.eligibility_rule.length < 10) {
      logFail(id, `HigherStudy[${i}] Eligibility`, `Missing or too short eligibility_rule: "${h.eligibility_rule}"`);
    }
    if (!h.sourceUrl || !/^https?:\/\//i.test(h.sourceUrl)) {
      logFail(id, `HigherStudy[${i}] SourceUrl`, `Invalid sourceUrl: "${h.sourceUrl}"`);
    }
  }

  // 4. Certifications (>= 3, provider, domain, prereqs, official_url)
  const certs = deg.certifications || [];
  if (certs.length < 3) {
    logFail(id, "Certifications Count", `Must have >= 3 certifications (got ${certs.length})`);
  }
  for (let i = 0; i < certs.length; i++) {
    const ct = certs[i];
    if (!ct.provider || !ct.domain) {
      logFail(id, `Cert[${i}] Provider/Domain`, "Missing provider or domain");
    }
    if (!ct.official_url || !/^https?:\/\//i.test(ct.official_url)) {
      logFail(id, `Cert[${i}] Official URL`, `Invalid official_url: "${ct.official_url}"`);
    }
  }

  // 5. Government Exams (>= 1, conducting_body, eligibility_rule, sourceUrl, lastReviewed <= 6 months)
  const gov = deg.government_exams || [];
  if (gov.length < 1) {
    logFail(id, "Govt Exams Count", `Must have >= 1 government exam or fallback (got ${gov.length})`);
  }
  for (let i = 0; i < gov.length; i++) {
    const g = gov[i];
    if (!g.conducting_body || !g.eligibility_rule) {
      logFail(id, `Govt[${i}] Body/Eligibility`, "Missing conducting_body or eligibility_rule");
    }
    if (!g.sourceUrl || !/^https?:\/\//i.test(g.sourceUrl)) {
      logFail(id, `Govt[${i}] SourceUrl`, `Invalid sourceUrl: "${g.sourceUrl}"`);
    }
    if (!g.lastReviewed) {
      logFail(id, `Govt[${i}] LastReviewed`, "Missing lastReviewed date");
    } else {
      const reviewedDate = new Date(g.lastReviewed);
      const ageMs = CURRENT_DATE.getTime() - reviewedDate.getTime();
      if (ageMs > SIX_MONTHS_MS) {
        logWarn(id, `Govt[${i}] Review Freshness`, `Reviewed on ${g.lastReviewed}, older than 6 months relative to ${CURRENT_DATE.toISOString().slice(0, 10)}`);
      }
    }
  }

  // 6. Career Switch (>= 1, >= 2 bridge_steps)
  const sw = deg.career_switch || [];
  if (sw.length < 1) {
    logFail(id, "Career Switch Count", `Must have >= 1 career switch path (got ${sw.length})`);
  }
  for (let i = 0; i < sw.length; i++) {
    const s = sw[i];
    if (!s.target_role || !s.bridge_steps || s.bridge_steps.length < 2) {
      logFail(id, `Switch[${i}] Bridge Steps`, `Must have >= 2 bridge_steps (got ${s.bridge_steps?.length || 0})`);
    }
  }

  // 7. Entrepreneurship (>= 1, >= 2 first_milestones, relevant_schemes)
  const ent = deg.entrepreneurship || [];
  if (ent.length < 1) {
    logFail(id, "Entrepreneurship Count", `Must have >= 1 entrepreneurship entry (got ${ent.length})`);
  }
  for (let i = 0; i < ent.length; i++) {
    const e = ent[i];
    if (!e.first_milestones || e.first_milestones.length < 2) {
      logFail(id, `Entrepreneurship[${i}] Milestones`, `Must have >= 2 first_milestones (got ${e.first_milestones?.length || 0})`);
    }
    if (!e.relevant_schemes || e.relevant_schemes.length === 0) {
      logFail(id, `Entrepreneurship[${i}] Schemes`, "Must define relevant_schemes");
    }
  }

  // 8. Roadmap Template (pursuing and completed, >= 3 phases each)
  const rdm = deg.roadmap_template;
  if (!rdm || !rdm.pursuing || !rdm.completed) {
    logFail(id, "Roadmap Template", "Must define both 'pursuing' and 'completed' roadmap templates");
  } else {
    const pPhases = rdm.pursuing.phases || [];
    const cPhases = rdm.completed.phases || [];
    if (pPhases.length < 3 || cPhases.length < 3) {
      logFail(id, "Roadmap Phases", `Roadmap phases must be >= 3 each (pursuing: ${pPhases.length}, completed: ${cPhases.length})`);
    }
  }

  // Section 4 Accuracy Checks
  // A. IIT JAM in CS
  if (["bsc-cs", "bca", "msc-cs"].includes(id)) {
    for (const h of hs) {
      const examsStr = (h.entrance_exams || []).join(" ");
      if (/IIT\s*JAM|JAM/i.test(examsStr)) {
        logFail(id, "Section 4 Accuracy (IIT JAM)", `IIT JAM listed for Computer Science degree ${id}: ${examsStr}`);
      }
    }
  }

  // B. MPT only for BPT
  if (id !== "bpt") {
    for (const h of hs) {
      if (/^MPT\b|Master of Physiotherapy/i.test(h.program_name)) {
        logFail(id, "Section 4 Accuracy (MPT)", `MPT listed for non-BPT degree ${id}`);
      }
    }
  }

  // C. GPAT only for M.Pharm
  for (const h of hs) {
    const examsStr = (h.entrance_exams || []).join(" ");
    if (/MBA/i.test(h.program_name) && /GPAT/i.test(examsStr)) {
      logFail(id, "Section 4 Accuracy (GPAT)", `GPAT listed for MBA in degree ${id}`);
    }
  }

  // D. M.Arch entrance is GATE / university, NOT NATA, NOT CEED
  if (["march", "barch"].includes(id)) {
    for (const h of hs) {
      const examsStr = (h.entrance_exams || []).join(" ");
      if (/M\.?Arch/i.test(h.program_name) && /NATA/i.test(examsStr)) {
        logFail(id, "Section 4 Accuracy (M.Arch Entrance)", "NATA listed for M.Arch entrance");
      }
      if (/M\.?Arch/i.test(h.program_name) && /CEED/i.test(examsStr)) {
        logFail(id, "Section 4 Accuracy (M.Arch Entrance)", "CEED listed for M.Arch entrance");
      }
    }
  }

  // E. Standalone AIIMS PG merged into NEET-PG / INI-CET
  for (const h of hs) {
    const examsStr = (h.entrance_exams || []).join(" ");
    if (/\bAIIMS\s+PG\b/i.test(examsStr) && !/INI-CET|NEET-PG/i.test(examsStr)) {
      logFail(id, "Section 4 Accuracy (AIIMS PG)", "Standalone AIIMS PG listed without INI-CET / NEET-PG merge reference");
    }
  }
}

console.log("\n=================================================================");
console.log("📊 AUDIT RESULTS SUMMARY");
console.log("=================================================================");
console.log(`- Total Degrees Audited:      ${auditedDegrees.length}`);
console.log(`- Validation Failures:        ${failureCount}`);
console.log(`- Warnings:                   ${warningCount}`);
console.log("=================================================================");

if (failureCount > 0) {
  console.error(`\n❌ VERIFICATION AUDIT FAILED with ${failureCount} errors.`);
  process.exit(1);
} else {
  console.log(`\n🎉 VERIFICATION AUDIT PASSED! All ${auditedDegrees.length} degrees met 100% of Section 3 and Section 4 mandatory criteria with 0 failures.\n`);
  process.exit(0);
}
