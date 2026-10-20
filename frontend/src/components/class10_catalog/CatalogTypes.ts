export interface EligibilityInfo {
  stream_required: string | null;
  min_marks_note: string | null;
  entrance_exam: string | null;
  age_limit: string | null;
}

export interface CatalogNode {
  id: string;
  tier: "A" | "B";
  name: string;
  one_line_description?: string;
  parent_id: string | null;
  eligibility: EligibilityInfo;
  duration: string | null;
  typical_qualification: string | null;
  feeds_from: string[];
  keeps_open: string[];
  reversibility: "easy" | "moderate" | "hard" | null;
  reversibility_note: string | null;
  cost_tier: "low" | "medium" | "high" | null;
  cost_range_note?: string | null;
  elective_modifiers_tag?: string | null;
  non_degree_alt: string | null;
  source_verified: boolean;
  last_verified_date: string;
  sources: string[];
  detail_status: "verified" | "partial" | "pending";
}

export interface MarksProfile {
  overall_percent?: number | null;
  math_performance?: "Struggling" | "Okay" | "Strong" | null;
  science_performance?: "Struggling" | "Okay" | "Strong" | null;
}

export interface SortingPreferences {
  breadthPreference?: "open" | "specific" | null;
  pacePreference?: "school" | "hands_on" | null;
  clarityPreference?: "goal" | "exploring" | null;
}
