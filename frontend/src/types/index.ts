export type RouteItem = {
  path: string;
  title: string;
  description: string;
};

// ── User Profile ─────────────────────────────────────────────────

export type UserProfile = {
  id: number;
  user_id: number;
  career_dna_completed: boolean;
  education_level: string | null;
  institution: string | null;
  marks: number | null;
  state: string | null;
  location: string | null;
  community: string | null;
  gender: string | null;
  dob: string | null;
  family_income: number | null;
  has_disability: boolean;
  skills: string[] | null;
  interests: string[] | null;
  budget: number | null;
  preferred_location: string | null;
  career_goal: string | null;
  occupation: string | null;
  learning_style: string | null;
  languages: string[] | null;
  financial_background: string | null;
  hostel_requirement: boolean;
  gov_or_private: string | null;
};

// ── Career DNA ───────────────────────────────────────────────────

export type CareerDNAAcademic = {
  board?: string;
  stream?: string;
  favorite_subjects?: string[];
  weak_subjects?: string[];
  dream_stream?: string;
  coaching?: boolean;
  entrance_exam?: string;
  preferred_degree?: string;
  degree?: string;
  department?: string;
  cgpa?: number;
  backlogs?: number;
  projects?: number;
  internships?: number;
  industry?: string;
  experience_years?: number;
  current_role?: string;
  salary_range?: string;
  certifications?: string[];
};

export type CareerDNAResponse = {
  id: number;
  user_id: number;
  user_type: string | null;
  completion_percentage: number;
  last_completed_step: number;
  is_completed: boolean;
  analytical: number;
  creativity: number;
  leadership: number;
  programming: number;
  problem_solving: number;
  communication: number;
  critical_thinking: number;
  teamwork: number;
  entrepreneurship: number;
  learning_ability: number;
};

// ── AI Recommendations ───────────────────────────────────────────

export type CareerBrief = {
  id: number;
  title: string;
  description: string | null;
  industry: string | null;
  base_salary_min: number | null;
  base_salary_max: number | null;
  demand_score: number | null;
  difficulty: string | null;
};

export type RecommendationResponse = {
  id: number;
  user_id: number;
  career_id: number;
  version: number;
  match_percentage: number;
  confidence_score: number;
  why_recommended: string | null;
  why_not_others: string | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  missing_skills: string[] | null;
  learning_suggestions: string[] | null;
  career: CareerBrief | null;
  created_at: string | null;
};

// ── Career Intelligence ──────────────────────────────────────────

export type CareerDetail = {
  responsibilities: string[] | null;
  daily_work: string | null;
  growth_opportunities: string | null;
  work_environment: string | null;
  work_life_balance: string | null;
  remote_opportunities: string | null;
};

export type CareerInsight = {
  automation_risk: string | null;
  industry_growth: string | null;
  top_hiring_industries: string[] | null;
  global_opportunities: string | null;
};

export type CareerTimeline = {
  stage_order: number;
  stage_name: string;
  estimated_months: number;
  description: string;
};

export type CareerLearningResource = {
  level: string;
  type: string;
  title: string;
  url: string | null;
  description: string | null;
};

export type CareerIntelligenceResponse = {
  career: CareerBrief;
  detail: CareerDetail | null;
  insight: CareerInsight | null;
  timeline: CareerTimeline[] | null;
  learning_resources: CareerLearningResource[] | null;
  is_bookmarked: boolean;
};

export type MatchAnalysisResponse = {
  overall_match: number;
  skill_match: number;
  interest_match: number;
  personality_match: number;
  goal_match: number;
  budget_match: number;
  location_match: number;
};

export type CareerSkillGap = {
  skill_name: string;
  importance: number;
  difficulty: string;
  estimated_learning_time: string;
  user_has_skill: boolean;
};

// ── Education Intelligence (KMS) ─────────────────────────────────

export type EntranceExamDetail = {
  id: number;
  name: string;
  full_name: string | null;
  difficulty: string | null;
  eligibility: string | null;
  syllabus: Record<string, any> | null;
  preparation_tips: string | null;
  official_website: string | null;
};

export type CertificationBase = {
  id: number;
  name: string;
  provider_name: string | null;
  level: string | null;
  url: string | null;
};

// ── Roadmap Execution ──────────────────────────────────────────

export type LearningPlanBase = {
  id: number;
  skill_name: string;
  status: string;
  estimated_hours: number | null;
  resource_type: string | null;
  resource_link: string | null;
};

export type ProjectRecommendationBase = {
  id: number;
  title: string;
  level: string;
  description: string | null;
  github_link_idea: string | null;
  is_completed: boolean;
};

export type RoadmapMilestoneBase = {
  id: number;
  title: string;
  description: string | null;
  sequence_order: number;
  difficulty: string | null;
  status: string;
  target_date: string | null;
  completed_at: string | null;
  learning_plans: LearningPlanBase[] | null;
  projects: ProjectRecommendationBase[] | null;
};

export type RoadmapBase = {
  id: number;
  career_id: number;
  title: string;
  description: string | null;
  estimated_completion_months: number;
  completion_percentage: number;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  milestones: RoadmapMilestoneBase[] | null;
};

// ── Scholarship Profile ──────────────────────────────────────────

export type ScholarshipProfile = {
  id: number;
  user_id: number;
  academic_stage: string;
  current_course: string | null;
  current_year: number | null;
  state: string | null;
  district: string | null;
  community: string | null;
  gender: string | null;
  nationality: string;
  annual_family_income: number | null;
  parent_occupation: string | null;
  percentage_cgpa: number | null;
  has_disability: boolean;
  is_first_graduate: boolean;
  is_hosteller: boolean;
  is_government_institution: boolean;
  is_orphan: boolean;
  is_single_girl_child: boolean;
  is_minority: boolean;
  institution_name: string | null;
  university: string | null;
  institution_type: string | null;
  additional_info: string | null;
  profile_completion: number;
  created_at: string | null;
  updated_at: string | null;
};

export type ScholarshipProfileCreate = Omit<ScholarshipProfile, 'id' | 'user_id' | 'profile_completion' | 'created_at' | 'updated_at'>;

export type ScholarshipProfileUpdate = Partial<ScholarshipProfileCreate>;

// ── Scholarship Recommendation ───────────────────────────────────

export type ScholarshipRecommendation = {
  scholarship_id: number;
  title: string;
  description: string | null;
  amount: number;
  provider: string | null;
  match_score: number;
  eligibility_status: string;
  recommendation_reasons: string[];
  matched_criteria: string[];
  optional_criteria: string[];
  can_apply: string;
  not_eligible_reason: string | null;
  official_apply_link: string | null;
  deadline: string | null;
  required_documents: string[];
  multiple_application_rule: string | null;
  combining_restrictions: string | null;
  application_mode: string | null;
  application_policy: string | null;
  eligibility_summary: string | null;
  contact_information: Record<string, string> | null;
  faq_url: string | null;
  benefits: string | null;
  renewal_available: boolean;
  is_bookmarked: boolean;
};

// ── Scholarship Detail ───────────────────────────────────────────

export type ScholarshipDetail = {
  id: number;
  title: string;
  description: string | null;
  provider: string | null;
  amount: number;
  benefits: string | null;
  scholarship_type: string | null;
  country: string;
  course_level: string | null;
  course_name: string | null;
  education_level: string | null;
  minimum_percentage: number | null;
  maximum_family_income: number | null;
  income_limit: number | null;
  minimum_marks: number | null;
  age_min: number | null;
  age_max: number | null;
  community: string | null;
  gender: string | null;
  state: string | null;
  disability_required: boolean;
  eligibility_summary: string | null;
  application_mode: string | null;
  deadline: string | null;
  application_start_date: string | null;
  application_end_date: string | null;
  official_link: string | null;
  official_url: string | null;
  official_notification_url: string | null;
  required_documents: string[];
  renewal_available: boolean;
  selection_process: string | null;
  contact_information: Record<string, string> | null;
  application_policy: string | null;
  compatible_with_other_schemes: string | null;
  restrictions_on_combining: string | null;
  faq_url: string | null;
  is_active: boolean;
  is_bookmarked: boolean;
};

// ── Bookmark ─────────────────────────────────────────────────────

export type ScholarshipBookmark = {
  id: number;
  user_id: number;
  scholarship_id: number;
  status: string;
  notes: string | null;
  created_at: string | null;
};

// ── Dashboard ────────────────────────────────────────────────────

export type ScholarshipDashboard = {
  total_recommendations: number;
  total_bookmarks: number;
  upcoming_deadlines: number;
  profile_completion: number;
  average_match_score: number;
  top_recommendations: ScholarshipRecommendation[];
  recent_bookmarks: ScholarshipBookmark[];
  missing_documents: string[];
};

// ── Notifications ────────────────────────────────────────────────

export type NotificationBase = {
  id: number;
  title: string;
  message: string;
  type: string;
  priority: string;
  action_url: string | null;
  is_read: boolean;
  created_at: string | null;
};

// ── AI Career Coach ─────────────────────────────────────────────

export type ChatMessageBase = {
  id: number;
  role: string;
  content: string;
  created_at: string | null;
};

export type ChatSessionBase = {
  id: number;
  title: string;
  mode: string;
  language: string;
  created_at: string | null;
  updated_at: string | null;
};

export type ChatSessionDetail = ChatSessionBase & {
  messages: ChatMessageBase[];
};
