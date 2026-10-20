import { Degree, DegreeFamily } from "./types";
import { DEGREES_DATA } from "./degreesData";
import { DEGREE_FAMILIES } from "./degreeFamilies";

export interface DegreeSearchResult {
  degree: Degree;
  family: DegreeFamily;
  score: number;
  matchType: "exact_acronym" | "name_prefix" | "alias" | "typo" | "family";
  matchSnippet?: string;
}

/**
 * Standard Levenshtein Distance for typo matching
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

/**
 * Normalizes query string: trims, lowercases, removes dots and extra dashes
 */
export function normalizeQuery(q: string): string {
  return q.toLowerCase().replace(/[.\-_/]/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Search degrees across names, acronyms, aliases, and typos.
 * Strictly returns empty array on empty query or queries < 2 chars.
 */
export function searchDegrees(
  query: string,
  degrees: Degree[] = DEGREES_DATA,
  families: Record<string, DegreeFamily> = DEGREE_FAMILIES
): DegreeSearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const normQuery = normalizeQuery(trimmed);
  const results: DegreeSearchResult[] = [];
  const seenDegreeIds = new Set<string>();

  for (const deg of degrees) {
    const family = families[deg.familyId] || DEGREE_FAMILIES.engineering;
    let bestScore = 0;
    let matchType: DegreeSearchResult["matchType"] = "alias";
    let matchSnippet = "";

    const normName = normalizeQuery(deg.name);
    const normShort = normalizeQuery(deg.shortName);

    // 1. Exact acronym / short name match
    if (normShort === normQuery || deg.shortName.toLowerCase() === trimmed.toLowerCase()) {
      bestScore = 100;
      matchType = "exact_acronym";
      matchSnippet = `Exact match: ${deg.shortName}`;
    }
    // 2. Short name starts with query or query starts with short name
    else if (normShort.startsWith(normQuery)) {
      bestScore = 92;
      matchType = "exact_acronym";
      matchSnippet = `Acronym match: ${deg.shortName}`;
    } else if (normQuery.startsWith(normShort)) {
      bestScore = 92;
      matchType = "exact_acronym";
      matchSnippet = `Prefix match: ${deg.shortName}`;
    } else if (normQuery.includes(normShort)) {
      bestScore = 88;
      matchType = "exact_acronym";
      matchSnippet = `Matched: ${deg.shortName}`;
    }
    // 3. Full name starts with query or contains query
    else if (normName.startsWith(normQuery)) {
      bestScore = 90;
      matchType = "name_prefix";
      matchSnippet = `Degree name: ${deg.name}`;
    } else if (normName.includes(normQuery)) {
      bestScore = 80;
      matchType = "name_prefix";
      matchSnippet = `Includes: ${deg.name}`;
    }

    // 4. Aliases matching
    if (deg.aliases && deg.aliases.length > 0) {
      for (const alias of deg.aliases) {
        const normAlias = normalizeQuery(alias);
        if (normAlias === normQuery) {
          if (bestScore < 95) {
            bestScore = 95;
            matchType = "alias";
            matchSnippet = `Alias match: "${alias}" → ${deg.shortName}`;
          }
          break;
        } else if (normQuery.startsWith(normAlias) || normAlias.startsWith(normQuery)) {
          if (bestScore < 88) {
            bestScore = 88;
            matchType = "alias";
            matchSnippet = `Matched alias: "${alias}"`;
          }
        } else if (normAlias.includes(normQuery) || normQuery.includes(normAlias)) {
          if (bestScore < 75) {
            bestScore = 75;
            matchType = "alias";
            matchSnippet = `Matched alias: "${alias}"`;
          }
        }
      }
    }

    // 5. Family matching (e.g. searching "Engineering", "Medicine", "Law")
    const normFamName = normalizeQuery(family.name);
    if (normFamName.includes(normQuery)) {
      if (bestScore < 65) {
        bestScore = 65;
        matchType = "family";
        matchSnippet = `Part of ${family.name}`;
      }
    }

    // 6. Typo Tolerance (Levenshtein Distance <= 2)
    if (bestScore === 0 && normQuery.length >= 4) {
      // Check against shortName
      const distShort = levenshteinDistance(normQuery, normShort);
      if (distShort <= 2) {
        bestScore = 70 - distShort * 10;
        matchType = "typo";
        matchSnippet = `Did you mean ${deg.shortName}?`;
      } else {
        // Check against aliases (e.g. "docter" -> "doctor")
        for (const alias of deg.aliases || []) {
          const normAlias = normalizeQuery(alias);
          if (normAlias.length >= 4) {
            const distAlias = levenshteinDistance(normQuery, normAlias);
            if (distAlias <= 2) {
              const typoScore = 68 - distAlias * 10;
              if (typoScore > bestScore) {
                bestScore = typoScore;
                matchType = "typo";
                matchSnippet = `Typo match: "${trimmed}" → ${deg.shortName} (${alias})`;
              }
            }
          }
        }
      }
    }

    if (bestScore > 0 && !seenDegreeIds.has(deg.id)) {
      seenDegreeIds.add(deg.id);
      results.push({
        degree: deg,
        family,
        score: bestScore,
        matchType,
        matchSnippet
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 10);
}
