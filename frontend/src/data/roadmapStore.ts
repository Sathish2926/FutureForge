import { UserRoadmap } from "./roadmapTypes";

export const MAX_USER_ROADMAPS = 10;
const STORAGE_PREFIX = "futureforge_user_roadmaps_v2";
const ACTIVE_ID_KEY = "futureforge_active_roadmap_id_v2";
const RECENT_SEARCHES_KEY = "futureforge_recent_searches_v2";
const MISSING_REQUESTS_KEY = "futureforge_missing_career_requests_v2";

function getStorageKey(userId: string = "current_user"): string {
  return `${STORAGE_PREFIX}_${userId}`;
}

export function loadUserRoadmaps(userId: string = "current_user"): UserRoadmap[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load user roadmaps from localStorage:", e);
    return [];
  }
}

export function saveUserRoadmaps(roadmaps: UserRoadmap[], userId: string = "current_user"): void {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(roadmaps));
  } catch (e) {
    console.error("Failed to save user roadmaps to localStorage:", e);
  }
}

export function getActiveRoadmapId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_ID_KEY);
  } catch {
    return null;
  }
}

export function setActiveRoadmapId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
  } catch {
    // ignore
  }
}

export function createUserRoadmap(
  careerId: string,
  nickname?: string,
  startingStepIndex: number = 0,
  userId: string = "current_user"
): { roadmap?: UserRoadmap; error?: string } {
  const existing = loadUserRoadmaps(userId);

  if (existing.length >= MAX_USER_ROADMAPS) {
    return {
      error: `You have reached the maximum limit of ${MAX_USER_ROADMAPS} roadmaps. Please delete an existing roadmap before creating a new one.`
    };
  }

  const now = new Date().toISOString();
  const newRoadmap: UserRoadmap = {
    id: `ur-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId,
    careerId,
    createdAt: now,
    updatedAt: now,
    currentStepIndex: startingStepIndex,
    completedStepIds: startingStepIndex > 0 ? Array.from({ length: startingStepIndex }, (_, i) => `${careerId}-step-${i + 1}`) : [],
    nickname: nickname?.trim() || undefined
  };

  const updated = [newRoadmap, ...existing];
  saveUserRoadmaps(updated, userId);
  setActiveRoadmapId(newRoadmap.id);

  return { roadmap: newRoadmap };
}

export function updateUserRoadmapProgress(
  roadmapId: string,
  currentStepIndex: number,
  completedStepIds?: string[],
  userId: string = "current_user"
): UserRoadmap | null {
  const existing = loadUserRoadmaps(userId);
  const target = existing.find(r => r.id === roadmapId);
  if (!target) return null;

  target.currentStepIndex = currentStepIndex;
  if (completedStepIds) {
    target.completedStepIds = completedStepIds;
  }
  target.updatedAt = new Date().toISOString();

  saveUserRoadmaps(existing, userId);
  return target;
}

export function renameUserRoadmap(
  roadmapId: string,
  newNickname: string,
  userId: string = "current_user"
): UserRoadmap | null {
  const existing = loadUserRoadmaps(userId);
  const target = existing.find(r => r.id === roadmapId);
  if (!target) return null;

  target.nickname = newNickname.trim() || undefined;
  target.updatedAt = new Date().toISOString();

  saveUserRoadmaps(existing, userId);
  return target;
}

export function deleteUserRoadmap(
  roadmapId: string,
  userId: string = "current_user"
): { success: boolean; deletedRoadmap?: UserRoadmap } {
  const existing = loadUserRoadmaps(userId);
  const target = existing.find(r => r.id === roadmapId);
  if (!target) return { success: false };

  const filtered = existing.filter(r => r.id !== roadmapId);
  saveUserRoadmaps(filtered, userId);

  const activeId = getActiveRoadmapId();
  if (activeId === roadmapId) {
    // If active was deleted, point to most recently updated remaining or null
    if (filtered.length > 0) {
      filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setActiveRoadmapId(filtered[0].id);
    } else {
      setActiveRoadmapId(null);
    }
  }

  return { success: true, deletedRoadmap: target };
}

export function restoreUserRoadmap(roadmap: UserRoadmap, userId: string = "current_user"): boolean {
  const existing = loadUserRoadmaps(userId);
  if (existing.some(r => r.id === roadmap.id)) return false;
  if (existing.length >= MAX_USER_ROADMAPS) return false;

  const updated = [roadmap, ...existing];
  saveUserRoadmaps(updated, userId);
  setActiveRoadmapId(roadmap.id);
  return true;
}

export function calculateProgressPercent(currentStepIndex: number, totalSteps: number, completedCount: number): number {
  if (totalSteps <= 0) return 0;
  // Progress takes into account marked completed steps and current position
  const effectiveDone = Math.max(completedCount, currentStepIndex);
  const pct = Math.round((effectiveDone / totalSteps) * 100);
  return Math.min(100, Math.max(0, pct));
}

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  const clean = term.trim();
  if (!clean || clean.length < 2) return;
  try {
    const current = getRecentSearches().filter(t => t.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...current].slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function recordMissingCareerRequest(query: string, notes?: string, email?: string): void {
  try {
    const raw = localStorage.getItem(MISSING_REQUESTS_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift({
      id: `req-${Date.now()}`,
      query,
      notes,
      email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(MISSING_REQUESTS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getMissingCareerRequests(): Array<{ id: string; query: string; notes?: string; email?: string; timestamp: string }> {
  try {
    const raw = localStorage.getItem(MISSING_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
