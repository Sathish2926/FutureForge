import { UNIVERSAL_DEGREES_CATALOG, searchUniversalDegrees, getUniversalDegreeById } from "../src/data/degree_guidance/catalog";

console.log("Testing Universal Degrees Catalog Import...");
console.log(`Total degrees loaded: ${UNIVERSAL_DEGREES_CATALOG.length}`);

// Test search
const searchTests = ["b.sc cs", "mbbs", "btech mechanical", "mca", "b.arch", "m.com", "agriculture", "bdes"];
for (const term of searchTests) {
  const results = searchUniversalDegrees(term);
  console.log(`Search "${term}" -> ${results.length} results: ${results.slice(0, 3).map(r => r.shortName).join(", ")}`);
}

// Test specific lookups
const bscCs = getUniversalDegreeById("bsc-cs");
console.log(`Lookup 'bsc-cs': ${bscCs ? bscCs.name : "NOT FOUND"}`);

const march = getUniversalDegreeById("march");
console.log(`Lookup 'march': ${march ? march.name : "NOT FOUND"}`);

console.log("Catalog import test completed successfully!");
