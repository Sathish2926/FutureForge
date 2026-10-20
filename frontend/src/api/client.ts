function getBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) return "/api";
  const trimmed = envUrl.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const BASE = getBaseUrl();

export function getToken(): string | null {
  return sessionStorage.getItem("cp_token");
}

export function setToken(token: string) {
  sessionStorage.setItem("cp_token", token);
}

export function clearToken() {
  sessionStorage.removeItem("cp_token");
}



async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let detail = "Request failed";
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ---- Auth ----
  register: (email: string, password: string, name: string) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ email, password, name }) }),
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  firebaseAuth: (email: string, name?: string, uid?: string, idToken?: string) =>
    request("/auth/firebase", {
      method: "POST",
      body: JSON.stringify({ email, name, uid, id_token: idToken }),
    }),
  me: () => request("/auth/me"),

  // ---- Profile ----
  getProfile: () => request("/profile"),
  updateProfile: (payload: any) => request("/profile", { method: "PATCH", body: JSON.stringify(payload) }),

  // ---- Careers ----
  listCareers: (q?: string) => request(`/careers${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getCareer: (slug: string) => request(`/careers/${slug}`),
  getRecommendations: (career_slug?: string, top_n = 5) =>
    request("/careers/recommendations", { method: "POST", body: JSON.stringify({ career_slug, top_n }) }),

  // ---- Colleges ----
  listColleges: (params?: Record<string, any>) => {
    if (!params) return request("/colleges");
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.append(k, String(v));
    });
    const qStr = query.toString();
    return request(`/colleges${qStr ? `?${qStr}` : ""}`);
  },
  getCollege: (id: string | number) => request(`/colleges/${id}`),
  getCollegeCourses: (id: string | number) => request(`/colleges/${id}/courses`),
  recommendColleges: (payload?: any) => request("/colleges/recommendations", { method: "POST", body: payload ? JSON.stringify(payload) : undefined }),
  searchColleges: (payload: any) => request("/colleges/search", { method: "POST", body: JSON.stringify(payload) }),
  getSavedColleges: () => request("/saved/colleges"),
  unsaveCollege: (id: string | number) => request(`/saved/colleges/${id}`, { method: "DELETE" }),


  // ---- Scholarships ----
  listScholarships: (filters?: { level?: string; state?: string; category?: string; provider_category?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (filters?.level) q.append("level", filters.level);
    if (filters?.state) q.append("state", filters.state);
    if (filters?.category) q.append("category", filters.category);
    if (filters?.provider_category) q.append("provider_category", filters.provider_category);
    if (filters?.search) q.append("search", filters.search);
    const qs = q.toString();
    return request(`/scholarships${qs ? `?${qs}` : ""}`);
  },
  getScholarship: (id: number) => request(`/scholarships/${id}`),
  getScholarshipProfile: () => request("/scholarships/user/profile"),
  saveScholarshipProfile: (profile: any) => request("/scholarships/user/profile", { method: "POST", body: JSON.stringify(profile) }),
  recommendScholarships: () => request("/scholarships/recommendations", { method: "POST" }),
  getSavedScholarships: () => request("/scholarships/user/saved"),
  updateSavedScholarship: (id: number, payload?: any) => request(`/scholarships/user/saved/${id}`, { method: "POST", body: payload ? JSON.stringify(payload) : undefined }),
  unsaveScholarship: (id: number) => request(`/scholarships/user/saved/${id}`, { method: "DELETE" }),
  explainScholarshipAI: (scholarshipId: number, query: string, context?: any) =>
    request("/scholarships/ai-explain", { method: "POST", body: JSON.stringify({ scholarship_id: scholarshipId, query, context }) }),
  adminCreateScholarship: (payload: any) => request("/scholarships/admin/scholarships", { method: "POST", body: JSON.stringify(payload) }),
  adminUpdateScholarship: (id: number, payload: any) => request(`/scholarships/admin/scholarships/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  adminVerifyScholarship: (id: number, status: string, notes?: string, sourceUrl?: string) => {
    const q = new URLSearchParams({ status_update: status });
    if (notes) q.append("notes", notes);
    if (sourceUrl) q.append("source_url", sourceUrl);
    return request(`/scholarships/admin/scholarships/${id}/verify?${q.toString()}`, { method: "POST" });
  },
  adminGetAuditLog: () => request("/scholarships/admin/audit-log"),
  adminGetQualityCheck: () => request("/scholarships/admin/quality-check"),

  // ---- Roadmap ----
  getRoadmaps: () => request("/roadmaps"),
  getPremadeRoadmaps: () => request("/roadmaps/premade"),
  generateRoadmap: (opts: { career_slug?: string; goal_text?: string }) =>
    request("/roadmaps", { method: "POST", body: JSON.stringify(opts) }),
  requestNewRoadmap: (data: { career_name: string; notes?: string; user_email?: string }) =>
    request("/roadmaps/request-new", { method: "POST", body: JSON.stringify(data) }),
  deleteRoadmap: (id: number) => request(`/roadmaps/${id}`, { method: "DELETE" }),
  updateProgress: (step_id: number, status: string) =>
    request("/roadmaps/progress", { method: "POST", body: JSON.stringify({ step_id, status }) }),
  submitAssessment: (step_id: number, answers: Record<string, any>) =>
    request(`/roadmaps/steps/${step_id}/assess`, { method: "POST", body: JSON.stringify({ answers, step_id }) }),

  // ---- AI Chat ----
  chat: (message: string, conversation_id?: number, stage?: string) =>
    request("/ai/chat", { method: "POST", body: JSON.stringify({ message, conversation_id, stage }) }),

  // ---- Career DNA ----
  listCareerDnaStages: () => request("/career-dna/stages"),
  getCareerDnaQuestions: (stage: string) => request(`/career-dna/questions?stage=${encodeURIComponent(stage)}`),
  getNextAdaptiveQuestion: (stage: string, answers: Record<string, any>) =>
    request("/career-dna/adaptive-next", { method: "POST", body: JSON.stringify({ stage, answers }) }),
  submitCareerDna: (stage: string, answers: Record<string, any>) =>
    request("/career-dna/submit", { method: "POST", body: JSON.stringify({ stage, answers }) }),
  listMyCareerDna: () => request("/career-dna"),
  getMyCareerDnaForStage: (stage: string) => request(`/career-dna/${encodeURIComponent(stage)}`),
  getCareerDnaExperiments: () => request("/career-dna/experiments"),
  submitCareerDnaExperiment: (experiment_id: string, selected_option: string) =>
    request("/career-dna/experiment", { method: "POST", body: JSON.stringify({ experiment_id, selected_option }) }),
  resolveTargetRole: (target_role: string) =>
    request("/career-dna/resolve-target", { method: "POST", body: JSON.stringify({ target_role }) }),
  getWhyAnalysis: (stage: string, payload: any) =>
    request(`/career-dna/why?stage=${encodeURIComponent(stage)}`, { method: "POST", body: JSON.stringify(payload) }),
  correctCareerDna: (stage: string, corrected_signals: Record<string, any>) =>
    request("/career-dna/correct", { method: "POST", body: JSON.stringify({ stage, corrected_signals }) }),
  getCanonicalCareerDna: (stage: string) =>
    request(`/career-dna/${encodeURIComponent(stage)}/canonical`),

  // ---- Working Professionals Planner ----
  getProfessionalProfile: () => request("/career-dna/professional/profile"),
  saveProfessionalProfile: (data: any) =>
    request("/career-dna/professional/profile", { method: "POST", body: JSON.stringify(data) }),
  getProfessionalRecommendations: () => request("/career-dna/professional/recommendations"),
  getProfessionalSkillGap: (target_role: string) =>
    request(`/career-dna/professional/gap-analysis?target_role=${encodeURIComponent(target_role)}`, { method: "POST" }),
  generateProfessionalPlan: (target_role: string) =>
    request("/career-dna/professional/plans", { method: "POST", body: JSON.stringify({ target_role }) }),
  listProfessionalPlans: () => request("/career-dna/professional/plans"),
  getProfessionalPlan: (plan_id: number) => request(`/career-dna/professional/plans/${plan_id}`),
  activateProfessionalPlan: (plan_id: number) =>
    request(`/career-dna/professional/plans/${plan_id}/activate`, { method: "POST" }),
  updateProfessionalStep: (plan_id: number, step_id: number, data: { completion_status?: string; user_notes?: string }) =>
    request(`/career-dna/professional/plans/${plan_id}/steps/${step_id}`, { method: "PATCH", body: JSON.stringify(data) }),
  updateProfessionalChecklist: (plan_id: number, checklist_items: any[]) =>
    request(`/career-dna/professional/plans/${plan_id}/checklist`, { method: "PATCH", body: JSON.stringify({ checklist_items }) }),
  getProfessionalResources: (skill?: string, cost_type?: string) => {
    const params = new URLSearchParams();
    if (skill) params.append("skill", skill);
    if (cost_type) params.append("cost_type", cost_type);
    const qs = params.toString();
    return request(`/career-dna/professional/resources${qs ? `?${qs}` : ""}`);
  },
  queryProfessionalAssistant: (query: string, plan_id?: number) =>
    request("/career-dna/professional/assistant", { method: "POST", body: JSON.stringify({ query, plan_id }) }),
  parseNaturalLanguageProfile: (profile_text: string) =>
    request("/career-dna/professional/profile/parse-natural-language", { method: "POST", body: JSON.stringify({ profile_text }) }),
  submitGuidanceRequest: (data: { career_topic: string; category?: string; user_context?: any; reason?: string }) =>
    request("/career-dna/professional/guidance-requests", { method: "POST", body: JSON.stringify(data) }),
  listGuidanceRequests: () => request("/career-dna/professional/guidance-requests"),

  // ---- Dashboard ----
  getDashboard: () => request("/dashboard"),

  // ---- Recommendations ----
  getHigherStudyRecommendations: (stage?: string) => request(`/recommendations/higher-study${stage ? `?stage=${encodeURIComponent(stage)}` : ""}`),
  getCareerRecommendations: () => request("/recommendations/career"),
  selectRecommendationItem: (recId: number, itemId: number) =>
    request(`/recommendations/${recId}/select`, { method: "POST", body: JSON.stringify({ item_id: itemId }) }),
  reassessRecommendations: (type: string = "higher_study") =>
    request(`/recommendations/reassess?recommendation_type=${encodeURIComponent(type)}`, { method: "POST" }),

  // ---- Saved ----
  saveCollege: (id: string | number) => request(`/saved/colleges/${id}`, { method: "POST" }),
  saveScholarship: (id: number) => request(`/saved/scholarships/${id}`, { method: "POST" }),

  // ---- Class 10 Pathway Catalog ----
  getTierANodes: () => request("/career-catalog/tier-a"),
  getTierBNodes: (parentId?: string, anyStream?: boolean) => {
    const q = new URLSearchParams();
    if (parentId) q.append("parent_id", parentId);
    if (anyStream !== undefined) q.append("any_stream", String(anyStream));
    const qs = q.toString();
    return request(`/career-catalog/tier-b${qs ? `?${qs}` : ""}`);
  },
  getCatalogNode: (nodeId: string) => request(`/career-catalog/node/${encodeURIComponent(nodeId)}`),
  getAllCatalogNodes: () => request("/career-catalog/all"),

  // ---- Class 10 Pathway Co-Pilot ----
  copilotChat: (payload: {
    message: string;
    current_screen?: string;
    current_tier_a_id?: string | null;
    current_leaf_id?: string | null;
    marks_profile?: any;
    event?: any;
    disable_grounding?: boolean;
  }) => request("/class10-copilot/chat", { method: "POST", body: JSON.stringify(payload) }),
  copilotEvent: (payload: {
    event: any;
    current_screen?: string;
    current_tier_a_id?: string | null;
    current_leaf_id?: string | null;
    marks_profile?: any;
  }) => request("/class10-copilot/event", { method: "POST", body: JSON.stringify(payload) }),
};
