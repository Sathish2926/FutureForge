export interface GroupTheme {
  name: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentBg: string;
  accentText: string;
  accentGradient: string;
  progressFill: string;
  ringColor: string;
  hex: string;
  tileBg: string;
  tileText: string;
}

export const CAREER_GROUP_THEMES: Record<string, GroupTheme> = {
  Tech: {
    name: "Tech",
    badgeBg: "bg-blue-50 dark:bg-blue-950/50",
    badgeText: "text-blue-800 dark:text-blue-200",
    badgeBorder: "border-blue-200 dark:border-blue-800",
    accentBg: "bg-blue-500",
    accentText: "text-blue-600 dark:text-blue-400",
    accentGradient: "from-blue-600 to-indigo-600",
    progressFill: "bg-gradient-to-r from-blue-600 to-indigo-600",
    ringColor: "ring-blue-400",
    hex: "#2563eb",
    tileBg: "bg-blue-100 dark:bg-blue-900/60",
    tileText: "text-blue-700 dark:text-blue-200"
  },
  Health: {
    name: "Health",
    badgeBg: "bg-rose-50 dark:bg-rose-950/50",
    badgeText: "text-rose-800 dark:text-rose-200",
    badgeBorder: "border-rose-200 dark:border-rose-800",
    accentBg: "bg-rose-500",
    accentText: "text-rose-600 dark:text-rose-400",
    accentGradient: "from-rose-500 to-pink-600",
    progressFill: "bg-gradient-to-r from-rose-500 to-pink-600",
    ringColor: "ring-rose-400",
    hex: "#e11d48",
    tileBg: "bg-rose-100 dark:bg-rose-900/60",
    tileText: "text-rose-700 dark:text-rose-200"
  },
  Finance: {
    name: "Finance",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
    badgeText: "text-emerald-800 dark:text-emerald-200",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    accentBg: "bg-emerald-500",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentGradient: "from-emerald-600 to-teal-600",
    progressFill: "bg-gradient-to-r from-emerald-600 to-teal-600",
    ringColor: "ring-emerald-400",
    hex: "#059669",
    tileBg: "bg-emerald-100 dark:bg-emerald-900/60",
    tileText: "text-emerald-700 dark:text-emerald-200"
  },
  "Law & Government": {
    name: "Law & Government",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/50",
    badgeText: "text-indigo-800 dark:text-indigo-200",
    badgeBorder: "border-indigo-200 dark:border-indigo-800",
    accentBg: "bg-indigo-600",
    accentText: "text-indigo-600 dark:text-indigo-400",
    accentGradient: "from-indigo-600 to-purple-600",
    progressFill: "bg-gradient-to-r from-indigo-600 to-purple-600",
    ringColor: "ring-indigo-400",
    hex: "#4f46e5",
    tileBg: "bg-indigo-100 dark:bg-indigo-900/60",
    tileText: "text-indigo-700 dark:text-indigo-200"
  },
  Creative: {
    name: "Creative",
    badgeBg: "bg-violet-50 dark:bg-violet-950/50",
    badgeText: "text-violet-800 dark:text-violet-200",
    badgeBorder: "border-violet-200 dark:border-violet-800",
    accentBg: "bg-violet-500",
    accentText: "text-violet-600 dark:text-violet-400",
    accentGradient: "from-violet-600 to-fuchsia-600",
    progressFill: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
    ringColor: "ring-violet-400",
    hex: "#7c3aed",
    tileBg: "bg-violet-100 dark:bg-violet-900/60",
    tileText: "text-violet-700 dark:text-violet-200"
  },
  "Engineering & Trades": {
    name: "Engineering & Trades",
    badgeBg: "bg-amber-50 dark:bg-amber-950/50",
    badgeText: "text-amber-800 dark:text-amber-200",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    accentBg: "bg-amber-500",
    accentText: "text-amber-700 dark:text-amber-400",
    accentGradient: "from-amber-500 to-orange-600",
    progressFill: "bg-gradient-to-r from-amber-500 to-orange-600",
    ringColor: "ring-amber-400",
    hex: "#d97706",
    tileBg: "bg-amber-100 dark:bg-amber-900/60",
    tileText: "text-amber-800 dark:text-amber-200"
  },
  "Education & Science": {
    name: "Education & Science",
    badgeBg: "bg-teal-50 dark:bg-teal-950/50",
    badgeText: "text-teal-800 dark:text-teal-200",
    badgeBorder: "border-teal-200 dark:border-teal-800",
    accentBg: "bg-teal-500",
    accentText: "text-teal-600 dark:text-teal-400",
    accentGradient: "from-teal-600 to-cyan-600",
    progressFill: "bg-gradient-to-r from-teal-600 to-cyan-600",
    ringColor: "ring-teal-400",
    hex: "#0d9488",
    tileBg: "bg-teal-100 dark:bg-teal-900/60",
    tileText: "text-teal-700 dark:text-teal-200"
  },
  Business: {
    name: "Business",
    badgeBg: "bg-orange-50 dark:bg-orange-950/50",
    badgeText: "text-orange-800 dark:text-orange-200",
    badgeBorder: "border-orange-200 dark:border-orange-800",
    accentBg: "bg-orange-500",
    accentText: "text-orange-600 dark:text-orange-400",
    accentGradient: "from-orange-500 to-amber-600",
    progressFill: "bg-gradient-to-r from-orange-500 to-amber-600",
    ringColor: "ring-orange-400",
    hex: "#ea580c",
    tileBg: "bg-orange-100 dark:bg-orange-900/60",
    tileText: "text-orange-700 dark:text-orange-200"
  },
  "Defence & Aviation": {
    name: "Defence & Aviation",
    badgeBg: "bg-slate-100 dark:bg-slate-800/80",
    badgeText: "text-slate-800 dark:text-slate-200",
    badgeBorder: "border-slate-300 dark:border-slate-700",
    accentBg: "bg-slate-700",
    accentText: "text-slate-700 dark:text-slate-300",
    accentGradient: "from-slate-700 to-slate-900",
    progressFill: "bg-gradient-to-r from-slate-700 to-slate-900",
    ringColor: "ring-slate-400",
    hex: "#334155",
    tileBg: "bg-slate-200 dark:bg-slate-800",
    tileText: "text-slate-800 dark:text-slate-100"
  }
};

export function getGroupTheme(groupName?: string): GroupTheme {
  if (!groupName) return CAREER_GROUP_THEMES.Tech;
  return CAREER_GROUP_THEMES[groupName] || CAREER_GROUP_THEMES.Tech;
}

export interface StepBadgeConfig {
  label: string;
  badgeClass: string;
  iconName: "exam" | "course" | "skill" | "licence" | "milestone" | "destination";
}

export const STEP_BADGE_CONFIG: Record<string, StepBadgeConfig> = {
  exam: {
    label: "Entrance Exam",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-800",
    iconName: "exam"
  },
  course: {
    label: "Course / Degree",
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800",
    iconName: "course"
  },
  skill: {
    label: "Skill & Project",
    badgeClass: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800",
    iconName: "skill"
  },
  licence: {
    label: "Licence / Reg.",
    badgeClass: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800",
    iconName: "licence"
  },
  milestone: {
    label: "Milestone",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800",
    iconName: "milestone"
  },
  destination: {
    label: "Destination Goal",
    badgeClass: "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700",
    iconName: "destination"
  }
};

export function getStepBadge(kind?: string): StepBadgeConfig {
  if (!kind) return STEP_BADGE_CONFIG.milestone;
  return STEP_BADGE_CONFIG[kind] || STEP_BADGE_CONFIG.milestone;
}

export function formatRelativeTime(iso?: string): string {
  if (!iso) return "Recently";
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHour / 24);

    if (diffDays > 30) {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    if (diffDays >= 1) {
      return `${diffDays}d ago`;
    }
    if (diffHour >= 1) {
      return `${diffHour}h ago`;
    }
    if (diffMin >= 1) {
      return `${diffMin}m ago`;
    }
    return "Just now";
  } catch {
    return "Recently";
  }
}
