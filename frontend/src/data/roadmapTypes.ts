export type DetailKind = "exam" | "course" | "licence" | "skill" | "milestone";

export interface Step {
  id: string;
  title: string;
  detail: string;
  detailKind: DetailKind;
  officialSourceUrl?: string;
  minAge?: number;
  lastReviewed: string; // ISO date YYYY-MM-DD
  needsVerification?: boolean;
}

export interface Career {
  id: string;
  name: string;
  icon: string;
  group: string;
  aliases: string[];
  keywords: string[];
  sourceDomain: string;
  lastReviewed: string; // ISO date YYYY-MM-DD
  reviewOwner: string;
  steps: Step[];
}

export interface UserRoadmap {
  id: string;
  userId: string;
  careerId: string;
  createdAt: string;
  updatedAt: string;
  currentStepIndex: number;
  completedStepIds: string[];
  nickname?: string;
}

export interface ValidationIssue {
  careerId: string;
  careerName: string;
  field: string;
  message: string;
}
