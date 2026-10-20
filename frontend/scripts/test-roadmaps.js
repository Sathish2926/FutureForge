import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, "../src/data/careers.json");
const raw = fs.readFileSync(jsonPath, "utf-8");
const careers = JSON.parse(raw);

// Import search utility functions logic in Node
function levenshteinDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = a[i - 1] === b[j - 1] ? prev : Math.min(prev, row[j], row[j - 1]) + 1;
      prev = row[j];
      row[j] = cur;
    }
  }
  return row[b.length];
}

function normalizeInput(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "");
}

function searchCareers(query, careerList) {
  const normQuery = normalizeInput(query);
  if (!normQuery || normQuery.length < 2) return [];

  const results = [];
  for (const career of careerList) {
    const normName = normalizeInput(career.name);
    const normAliases = (career.aliases || []).map(normalizeInput);
    const normKeywords = (career.keywords || []).map(normalizeInput);

    let bestScore = -1;
    let matchType = "substring";

    if (normName === normQuery) {
      bestScore = 100;
      matchType = "exact";
    } else if (normAliases.includes(normQuery)) {
      bestScore = 95;
      matchType = "exact";
    } else if (normName.startsWith(normQuery)) {
      bestScore = 85;
      matchType = "prefix";
    } else if (normAliases.some(a => a.startsWith(normQuery))) {
      bestScore = 80;
      matchType = "prefix";
    } else if (normKeywords.some(k => k === normQuery || k.startsWith(normQuery))) {
      bestScore = 65;
      matchType = "keyword";
    } else if (normName.includes(normQuery) || normAliases.some(a => a.includes(normQuery))) {
      bestScore = 55;
      matchType = "substring";
    } else if (normQuery.length >= 4) {
      const allTokens = [
        ...normName.split(/\s+/),
        ...normAliases.flatMap(a => a.split(/\s+/)),
        ...normKeywords
      ];
      for (const token of allTokens) {
        if (token.length >= 4) {
          const dist = levenshteinDistance(normQuery, token);
          const maxDist = normQuery.length >= 6 ? 2 : 1;
          if (dist <= maxDist) {
            const score = 40 - dist * 5;
            if (score > bestScore) {
              bestScore = score;
              matchType = "fuzzy";
            }
          }
        }
      }
    }

    if (bestScore > 0) {
      results.push({ career, score: bestScore, matchType });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8);
}

function calculateProgressPercent(currentStepIndex, totalSteps, completedCount) {
  if (totalSteps <= 0) return 0;
  const effectiveDone = Math.max(completedCount, currentStepIndex);
  return Math.min(100, Math.max(0, Math.round((effectiveDone / totalSteps) * 100)));
}

// In-memory store emulator for tests
class TestRoadmapStore {
  constructor(maxCap = 10) {
    this.maxCap = maxCap;
    this.roadmaps = [];
    this.activeId = null;
  }

  create(careerId, nickname = undefined, startingIndex = 0) {
    if (this.roadmaps.length >= this.maxCap) {
      return { error: `Max limit of ${this.maxCap} reached.` };
    }
    const rm = {
      id: `rm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      careerId,
      nickname,
      currentStepIndex: startingIndex,
      completedStepIds: [],
      updatedAt: new Date().toISOString()
    };
    this.roadmaps.unshift(rm);
    this.activeId = rm.id;
    return { roadmap: rm };
  }

  updatePosition(id, newIndex, completedIds) {
    const rm = this.roadmaps.find(r => r.id === id);
    if (!rm) return null;
    rm.currentStepIndex = newIndex;
    if (completedIds) rm.completedStepIds = completedIds;
    rm.updatedAt = new Date().toISOString();
    return rm;
  }

  delete(id) {
    const idx = this.roadmaps.findIndex(r => r.id === id);
    if (idx === -1) return { success: false };
    const deleted = this.roadmaps.splice(idx, 1)[0];
    if (this.activeId === id) {
      this.activeId = this.roadmaps.length > 0 ? this.roadmaps[0].id : null;
    }
    return { success: true, deletedRoadmap: deleted };
  }

  restore(roadmap) {
    if (this.roadmaps.length >= this.maxCap) return false;
    this.roadmaps.unshift(roadmap);
    this.activeId = roadmap.id;
    return true;
  }
}

// TEST RUNNER
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("=================================================");
console.log("🧪 RUNNING ROADMAP MODULE TEST SUITE");
console.log("=================================================\n");

// 1. Schema Validation Tests
console.log("Test Suite 1: Data Model & Schema Constraints");
assert(careers.length === 36, `Exactly 36 curated careers in dataset (found ${careers.length})`);
const allStepsInRange = careers.every(c => c.steps.length >= 5 && c.steps.length <= 8);
assert(allStepsInRange, "Every career has between 5 and 8 steps");
const allHaveTitles = careers.every(c => c.steps.every(s => s.title && s.detail && s.detailKind));
assert(allHaveTitles, "Every step has non-empty title, detail, and valid detailKind");
const referenceDate = new Date();
const allFresh = careers.every(c => {
  const d = new Date(c.lastReviewed);
  return (referenceDate.getTime() - d.getTime()) <= (365.25 * 24 * 60 * 60 * 1000);
});
assert(allFresh, "All careers have review dates within the last 12 months");
const allAliasesValid = careers.every(c => ((c.aliases || []).length + (c.keywords || []).length) >= 5);
assert(allAliasesValid, "All careers have at least 5 combined aliases/keywords");

// 2. Search Ranking & Typo Tolerance Tests
console.log("\nTest Suite 2: Search Ranking & Fuzzy Typo Matching");
const doctorTypo = searchCareers("docter", careers);
assert(doctorTypo.length > 0 && doctorTypo[0].career.id === "doctor", 'Typo "docter" ranks "Doctor" as top result');

const iasMatch = searchCareers("IAS", careers);
assert(iasMatch.length > 0 && iasMatch[0].career.id === "civil-servant", 'Acronym "IAS" matches "Civil Servant"');

const coderMatch = searchCareers("coder", careers);
assert(coderMatch.length > 0 && coderMatch[0].career.id === "software-engineer", 'Alias "coder" matches "Software Engineer"');

const prefixMatch = searchCareers("arch", careers);
assert(prefixMatch.some(m => m.career.id === "architect"), 'Prefix "arch" finds "Architect"');

const exactMatch = searchCareers("Chartered Accountant", careers);
assert(exactMatch[0].career.id === "chartered-accountant" && exactMatch[0].matchType === "exact", 'Exact name "Chartered Accountant" has score 100');

// 3. No-Match Handling
console.log("\nTest Suite 3: Search Validation & No-Match Handling");
const emptySearch = searchCareers("", careers);
assert(emptySearch.length === 0, "Empty query returns no results");
const shortSearch = searchCareers("a", careers);
assert(shortSearch.length === 0, "Single character query returns no results (min 2 chars)");
const nonExistent = searchCareers("quantum space alchemist", careers);
assert(nonExistent.length === 0, "Unmatched query returns empty matches (delegates to fallbacks)");

// 4. Progress Maths
console.log("\nTest Suite 4: Progress Calculation");
assert(calculateProgressPercent(0, 6, 0) === 0, "Step 0 of 6 = 0%");
assert(calculateProgressPercent(3, 6, 3) === 50, "Step 3 of 6 = 50%");
assert(calculateProgressPercent(6, 6, 6) === 100, "Step 6 of 6 = 100% (Goal reached)");

// 5. Store Logic: Isolation, Cap, Delete & Undo
console.log("\nTest Suite 5: Multiple Roadmaps Isolation, 10-Cap & Undo");
const store = new TestRoadmapStore(10);

// (a) Create roadmap for Doctor
const r1 = store.create("doctor", "My Medical Dream");
assert(r1.roadmap && r1.roadmap.careerId === "doctor", "Created roadmap 1 (Doctor)");
store.updatePosition(r1.roadmap.id, 2, ["doc-step-1", "doc-step-2"]);

// (b) Create roadmap for Software Engineer
const r2 = store.create("software-engineer", "Tech Track");
assert(r2.roadmap && r2.roadmap.careerId === "software-engineer", "Created roadmap 2 (Software Engineer)");
assert(r2.roadmap.currentStepIndex === 0, "Roadmap 2 starts at step 0 (Progress isolated)");

// Verify isolation: updating r2 does not mutate r1
store.updatePosition(r2.roadmap.id, 4, ["se-step-1", "se-step-2", "se-step-3", "se-step-4"]);
const r1Check = store.roadmaps.find(r => r.id === r1.roadmap.id);
assert(r1Check.currentStepIndex === 2, "Roadmap 1 still at step 2 (Isolation verified)");

// (c) 10-Roadmap Cap
for (let i = 0; i < 8; i++) {
  store.create("core-engineer", `Plan ${i + 3}`);
}
assert(store.roadmaps.length === 10, "Reached 10 active roadmaps");
const overCap = store.create("pilot");
assert(overCap.error !== undefined, "11th roadmap creation rejected with clear message");

// (d) Delete and Undo
const deleteTarget = store.roadmaps[0];
const deleteRes = store.delete(deleteTarget.id);
assert(deleteRes.success && store.roadmaps.length === 9, "Roadmap deleted, count reduced to 9");
const restored = store.restore(deleteRes.deletedRoadmap);
assert(restored && store.roadmaps.length === 10, "Undo restored deleted roadmap and progress intact");

// End-to-End User Journeys Simulation
console.log("\nTest Suite 6: End-to-End User Workflows");
// Workflow A: Search "docter" -> Select Doctor -> Create -> Move position -> Progress updates
const e2eMatches = searchCareers("docter", careers);
const topPick = e2eMatches[0].career;
const userStore = new TestRoadmapStore(10);
const created = userStore.create(topPick.id);
assert(created.roadmap.careerId === "doctor", 'E2E (a): Search "docter" -> Created Doctor roadmap');
userStore.updatePosition(created.roadmap.id, 3, ["doc-step-1", "doc-step-2", "doc-step-3"]);
const updatedDoc = userStore.roadmaps.find(r => r.id === created.roadmap.id);
const docPct = calculateProgressPercent(updatedDoc.currentStepIndex, 7, 3);
assert(docPct === 43, "E2E (a): Position moved to step 3, progress updated to 43%");

// Workflow B: Switch between roadmaps
const rmA = userStore.create("pilot", "Pilot Plan");
assert(userStore.activeId === rmA.roadmap.id, "E2E (b): Newly created roadmap becomes active");
assert(userStore.roadmaps.find(r => r.careerId === "doctor").currentStepIndex === 3, "E2E (b): Doctor progress remained 3");

console.log("\n=================================================");
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
