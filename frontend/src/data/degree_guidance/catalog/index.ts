import { UniversalDegreeRecord } from "./types";
import { COMPUTING_DEGREES } from "./batch_computing";
import { ENGINEERING_DEGREES } from "./batch_engineering";
import { SCIENCES_DEGREES } from "./batch_sciences";
import { ARTS_DEGREES } from "./batch_arts";
import { COMMERCE_DEGREES } from "./batch_commerce";
import { LAW_DEGREES } from "./batch_law";
import { EDUCATION_DEGREES } from "./batch_education";
import { HEALTH_DEGREES } from "./batch_health";
import { DESIGN_VOCATIONAL_DEGREES } from "./batch_design_vocational";
import { AGRICULTURE_DEGREES } from "./batch_agriculture";
import { ARCHITECTURE_DEGREES } from "./batch_architecture";
import { POSTGRADUATE_DEGREES } from "./batch_postgraduate";

export * from "./types";
export {
  COMPUTING_DEGREES,
  ENGINEERING_DEGREES,
  SCIENCES_DEGREES,
  ARTS_DEGREES,
  COMMERCE_DEGREES,
  LAW_DEGREES,
  EDUCATION_DEGREES,
  HEALTH_DEGREES,
  DESIGN_VOCATIONAL_DEGREES,
  AGRICULTURE_DEGREES,
  ARCHITECTURE_DEGREES,
  POSTGRADUATE_DEGREES
};

export const UNIVERSAL_DEGREES_CATALOG: UniversalDegreeRecord[] = [
  ...COMPUTING_DEGREES,
  ...ENGINEERING_DEGREES,
  ...SCIENCES_DEGREES,
  ...ARTS_DEGREES,
  ...COMMERCE_DEGREES,
  ...LAW_DEGREES,
  ...EDUCATION_DEGREES,
  ...HEALTH_DEGREES,
  ...DESIGN_VOCATIONAL_DEGREES,
  ...AGRICULTURE_DEGREES,
  ...ARCHITECTURE_DEGREES,
  ...POSTGRADUATE_DEGREES
];

export const UNIVERSAL_DEGREES_BY_ID: Record<string, UniversalDegreeRecord> = UNIVERSAL_DEGREES_CATALOG.reduce((acc, deg) => {
  acc[deg.degree_id] = deg;
  if (deg.id && deg.id !== deg.degree_id) {
    acc[deg.id] = deg;
  }
  return acc;
}, {} as Record<string, UniversalDegreeRecord>);

/**
 * Normalizes input string for search matching:
 * trims, lowercases, removes punctuation / dots / hyphens
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[.\-_/\\()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Searches the 98-degree catalog by degree name, shortName, aliases, or degree_id.
 * Ranked by exact match, prefix match, and substring match.
 */
export function searchUniversalDegrees(rawQuery: string): UniversalDegreeRecord[] {
  const q = normalizeQuery(rawQuery);
  if (!q) return [];

  const exactMatches: UniversalDegreeRecord[] = [];
  const prefixMatches: UniversalDegreeRecord[] = [];
  const keywordMatches: UniversalDegreeRecord[] = [];
  const seenIds = new Set<string>();

  for (const deg of UNIVERSAL_DEGREES_CATALOG) {
    const normName = normalizeQuery(deg.name);
    const normShort = normalizeQuery(deg.shortName);
    const normId = normalizeQuery(deg.degree_id);
    const normAliases = (deg.aliases || []).map(a => normalizeQuery(a));

    const allTerms = [normName, normShort, normId, ...normAliases];

    // 1. Exact match on any alias or name
    if (allTerms.some(t => t === q)) {
      if (!seenIds.has(deg.degree_id)) {
        seenIds.add(deg.degree_id);
        exactMatches.push(deg);
      }
      continue;
    }

    // 2. Prefix match (e.g. "b sc", "btech", "m tech")
    if (allTerms.some(t => t.startsWith(q) || q.startsWith(t))) {
      if (!seenIds.has(deg.degree_id)) {
        seenIds.add(deg.degree_id);
        prefixMatches.push(deg);
      }
      continue;
    }

    // 3. Substring or multi-keyword match
    const qWords = q.split(" ").filter(w => w.length > 0);
    const matchesAllWords = qWords.every(word =>
      allTerms.some(term => term.includes(word))
    );

    if (matchesAllWords) {
      if (!seenIds.has(deg.degree_id)) {
        seenIds.add(deg.degree_id);
        keywordMatches.push(deg);
      }
    }
  }

  return [...exactMatches, ...prefixMatches, ...keywordMatches];
}

/**
 * Lookup by degree_id or alias
 */
export function getUniversalDegreeById(idOrAlias: string): UniversalDegreeRecord | undefined {
  if (!idOrAlias) return undefined;
  const direct = UNIVERSAL_DEGREES_BY_ID[idOrAlias];
  if (direct) return direct;

  const normalized = normalizeQuery(idOrAlias);
  return UNIVERSAL_DEGREES_CATALOG.find(d =>
    d.degree_id === idOrAlias ||
    normalizeQuery(d.name) === normalized ||
    normalizeQuery(d.shortName) === normalized ||
    (d.aliases || []).some(a => normalizeQuery(a) === normalized)
  );
}
