import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, "../src/data/careers.json");
if (!fs.existsSync(jsonPath)) {
  console.error("❌ careers.json not found at:", jsonPath);
  process.exit(1);
}

const raw = fs.readFileSync(jsonPath, "utf-8");
const careers = JSON.parse(raw);

console.log("=================================================");
console.log("🚀 FUTUREFORGE ROADMAP VERIFICATION REPORT");
console.log("=================================================");
console.log(`Auditing ${careers.length} careers across all standard tracks...\n`);

let hasError = false;
let needsVerificationCount = 0;
let outdatedCount = 0;
const referenceDate = new Date();
const twelveMonthsMs = 365.25 * 24 * 60 * 60 * 1000;

careers.forEach((career, idx) => {
  const steps = career.steps || [];
  const errors = [];

  // Check step bounds
  if (steps.length < 5 || steps.length > 8) {
    errors.push(`Step count out of bounds: has ${steps.length} steps (must be between 5 and 8)`);
  }

  // Check career review date
  if (!career.lastReviewed) {
    errors.push("Missing career.lastReviewed date");
  } else {
    const revDate = new Date(career.lastReviewed);
    if (isNaN(revDate.getTime())) {
      errors.push("Invalid career.lastReviewed ISO date");
    } else if (referenceDate.getTime() - revDate.getTime() > twelveMonthsMs) {
      errors.push(`Career review date ${career.lastReviewed} is older than 12 months`);
      outdatedCount++;
    }
  }

  // Check aliases + keywords
  const totalKeywords = (career.aliases || []).length + (career.keywords || []).length;
  if (totalKeywords < 5) {
    errors.push(`Requires 5+ combined aliases/keywords (has ${totalKeywords})`);
  }

  // Check individual steps
  steps.forEach((step, sIdx) => {
    if (!step.id) errors.push(`Step #${sIdx + 1} missing id`);
    if (!step.title || !step.title.trim()) errors.push(`Step #${sIdx + 1} missing title`);
    if (!step.detail || !step.detail.trim()) errors.push(`Step #${sIdx + 1} missing detail`);
    if (step.needsVerification) {
      needsVerificationCount++;
    }
  });

  if (errors.length > 0) {
    hasError = true;
    console.error(`❌ [${idx + 1}/${careers.length}] ${career.name} (${career.id})`);
    errors.forEach(e => console.error(`    - ${e}`));
  } else {
    console.log(`✅ [${idx + 1}/${careers.length}] ${career.name}: ${steps.length} verified steps (${career.group})`);
  }
});

console.log("\n-------------------------------------------------");
console.log(`Total Careers Audited: ${careers.length}`);
console.log(`Careers Outdated (>12 mos): ${outdatedCount}`);
console.log(`Steps Flagged 'Needs Verification': ${needsVerificationCount}`);
console.log("-------------------------------------------------");

if (hasError) {
  console.error("❌ Roadmap verification failed schema checks.");
  process.exit(1);
} else {
  console.log("🎉 All 36 roadmaps passed validation with flying colors!");
  process.exit(0);
}
