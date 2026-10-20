import { Career } from "./roadmapTypes";

export interface SearchMatch {
  career: Career;
  score: number;
  matchType: "exact" | "prefix" | "word-start" | "keyword" | "substring" | "fuzzy";
  matchedText: string;
}

export function levenshteinDistance(a: string, b: string): number {
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

export function normalizeInput(input: string): string {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "");
}

export function searchCareers(query: string, careers: Career[]): SearchMatch[] {
  const normQuery = normalizeInput(query);
  if (!normQuery || normQuery.length < 2) return [];

  const results: SearchMatch[] = [];

  for (const career of careers) {
    const normName = normalizeInput(career.name);
    const normAliases = (career.aliases || []).map(normalizeInput);
    const normKeywords = (career.keywords || []).map(normalizeInput);
    const stepTitles = (career.steps || []).map(s => normalizeInput(s.title));

    let bestScore = -1;
    let matchType: SearchMatch["matchType"] = "substring";
    let matchedText = career.name;

    // 1. Exact match on name
    if (normName === normQuery) {
      bestScore = 100;
      matchType = "exact";
      matchedText = career.name;
    }
    // 2. Exact match on aliases
    else if (normAliases.includes(normQuery)) {
      bestScore = 95;
      matchType = "exact";
      const original = career.aliases.find(a => normalizeInput(a) === normQuery) || normQuery;
      matchedText = `${original} → ${career.name}`;
    }
    // 3. Prefix match on name
    else if (normName.startsWith(normQuery)) {
      bestScore = 85;
      matchType = "prefix";
      matchedText = career.name;
    }
    // 4. Prefix match on aliases
    else if (normAliases.some(a => a.startsWith(normQuery))) {
      bestScore = 80;
      matchType = "prefix";
      const match = career.aliases.find(a => normalizeInput(a).startsWith(normQuery));
      matchedText = `${match} → ${career.name}`;
    }
    // 5. Word-start match on name
    else if (normName.split(/\s+/).some(w => w.startsWith(normQuery))) {
      bestScore = 75;
      matchType = "word-start";
      matchedText = career.name;
    }
    // 6. Word-start on aliases
    else if (normAliases.some(a => a.split(/\s+/).some(w => w.startsWith(normQuery)))) {
      bestScore = 70;
      matchType = "word-start";
      const match = career.aliases.find(a => normalizeInput(a).split(/\s+/).some(w => w.startsWith(normQuery)));
      matchedText = `${match} → ${career.name}`;
    }
    // 7. Keyword match (exam names, degrees e.g. "IAS", "NEET", "MBBS")
    else if (normKeywords.some(k => k === normQuery || k.startsWith(normQuery))) {
      bestScore = 65;
      matchType = "keyword";
      const match = career.keywords.find(k => normalizeInput(k) === normQuery || normalizeInput(k).startsWith(normQuery));
      matchedText = `${match} → ${career.name}`;
    }
    // 8. Step title keywords match (e.g. "B.Des", "AIBE", "CTET", "DGCA")
    else if (stepTitles.some(st => st.includes(normQuery))) {
      bestScore = 60;
      matchType = "keyword";
      const match = career.steps.find(s => normalizeInput(s.title).includes(normQuery));
      matchedText = `${match?.title} → ${career.name}`;
    }
    // 9. Substring match on name or alias
    else if (normName.includes(normQuery)) {
      bestScore = 55;
      matchType = "substring";
      matchedText = career.name;
    } else if (normAliases.some(a => a.includes(normQuery))) {
      bestScore = 50;
      matchType = "substring";
      const match = career.aliases.find(a => normalizeInput(a).includes(normQuery));
      matchedText = `${match} → ${career.name}`;
    } else if (normKeywords.some(k => k.includes(normQuery))) {
      bestScore = 45;
      matchType = "substring";
      const match = career.keywords.find(k => normalizeInput(k).includes(normQuery));
      matchedText = `${match} → ${career.name}`;
    }
    // 10. Fuzzy match (tolerating typos for words >= 5 letters, edit distance <= 2)
    else if (normQuery.length >= 4) {
      // Check against name words and aliases
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
              matchedText = `${token} ≈ ${career.name}`;
            }
          }
        }
      }
    }

    if (bestScore > 0) {
      results.push({
        career,
        score: bestScore,
        matchType,
        matchedText
      });
    }
  }

  // Sort descending by score, tiebreak alphabetically by career name
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.career.name.localeCompare(b.career.name);
  });

  return results.slice(0, 8);
}

export function getClosestFallbackCareers(query: string, careers: Career[]): Career[] {
  const normQuery = normalizeInput(query);
  if (!normQuery) return careers.slice(0, 3);

  // Score each career by closest distance across all words
  const scored = careers.map((career) => {
    let minDist = 999;
    const candidates = [
      career.name.toLowerCase(),
      ...career.aliases.map(a => a.toLowerCase()),
      ...career.keywords.map(k => k.toLowerCase()),
      career.group.toLowerCase()
    ];

    for (const cand of candidates) {
      const dist = levenshteinDistance(normQuery, cand.slice(0, Math.max(normQuery.length, cand.length)));
      if (dist < minDist) minDist = dist;
    }
    return { career, dist: minDist };
  });

  scored.sort((a, b) => a.dist - b.dist);
  return scored.slice(0, 3).map(s => s.career);
}
