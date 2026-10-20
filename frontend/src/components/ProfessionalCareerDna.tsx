import React, { useState, useEffect } from "react";
import {
  Compass, CheckCircle2, Circle, Clock, BookOpen, AlertCircle,
  Briefcase, TrendingUp, Sparkles, ArrowRight, ChevronRight,
  ExternalLink, RotateCcw, Brain, Check, Filter, MessageSquare,
  FileText, Award, Layers, DollarSign, Target, ChevronDown, ChevronUp, Send,
  HelpCircle, Info
} from "lucide-react";
import { api } from "../api/client";
import ProfessionalAICopilot from "./ProfessionalAICopilot";

interface Props {
  questions?: any[];
  answers?: Record<string, any>;
  guidance?: any;
  currentStepIndex?: number;
  submitting?: boolean;
  setAnswer?: (id: string, value: any) => void;
  toggleMulti?: (id: string, option: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onRetake?: () => void;
}

const SKILLS_BY_DOMAIN: Record<string, string[]> = {
  "Marketing & Growth": [
    "SEO & Organic Growth", "Content Marketing", "Google Analytics / GA4",
    "Performance Marketing", "Paid Advertising / Meta Ads", "Conversion Rate Optimization (CRO)",
    "Email & Marketing Automation", "B2B Lead Generation", "Copywriting",
  ],
  "Sales & Business Development": [
    "Sales & Prospecting", "CRM Management", "Pipeline Management",
    "Client Discovery & Pitching", "Contract Negotiation", "Account Management",
  ],
  "Customer Success & Support": [
    "Customer Success", "Customer Onboarding", "Account Health Analysis",
  ],
  "Testing & QA": [
    "Manual Testing", "Test Case Design", "Bug Reporting",
    "Automation Testing", "Selenium WebDriver", "Playwright", "API Testing", "Postman",
  ],
  "Software Development": [
    "Python", "JavaScript", "SQL", "Database Design",
    "Git", "Docker", "Linux", "REST APIs",
  ],
  "Data & Analytics": [
    "Data Analysis", "Power BI", "Tableau", "Excel",
  ],
  "Design": [
    "UI/UX Design", "Figma", "Wireframing",
  ],
  "HR & People": [
    "HR Lifecycle", "People Analytics", "Recruitment",
  ],
  "Finance & Accounting": [
    "Financial Reporting", "Bookkeeping", "Financial Modeling",
  ],
};

// Flat list for backward compatibility
const COMMON_SKILLS = Object.values(SKILLS_BY_DOMAIN).flat();

const TOOLS_BY_DOMAIN: Record<string, string[]> = {
  "Marketing & Analytics": [
    "Google Analytics 4", "Google Ads", "Meta Ads Manager", "Google Search Console",
    "Semrush / Ahrefs", "HubSpot CRM", "Mailchimp",
  ],
  "Sales & CRM": [
    "Salesforce", "LinkedIn Sales Navigator", "Trello",
  ],
  "Development & DevOps": [
    "VS Code", "Git / GitHub", "Docker", "Selenium",
    "Playwright", "Postman", "Jira",
  ],
  "Data & BI Tools": [
    "MS Excel", "Power BI", "Tableau", "PostgreSQL", "MySQL",
  ],
  "Design Tools": [
    "Figma",
  ],
  "Infrastructure": [
    "Linux / Bash", "AWS", "Google Cloud",
  ],
};

const COMMON_TOOLS = Object.values(TOOLS_BY_DOMAIN).flat();

const CAREER_GOAL_OPTIONS = [
  "Switch to a different job",
  "Change industry",
  "Get promoted in current company",
  "Improve salary prospects",
  "Become a specialist in the current field",
  "Move into a leadership or management role",
  "Return to work after a career break",
  "Explore suitable career options",
  "Improve skills for the current job"
];


export default function ProfessionalCareerDna(_props: Props) {
  // Navigation tabs within Working Professionals
  const [activeTab, setActiveTab] = useState<
    "overview" | "skill_gap" | "explore" | "resources" | "checklist" | "onboarding"
  >("overview");

  // Floating AI Copilot State (Mirroring Scholarship & Graduate Assistant pattern)
  const [copilotOpen, setCopilotOpen] = useState(false);

  // State
  const [profile, setProfile] = useState<any>(null);
  const [activePlan, setActivePlan] = useState<any>(null);
  const [plansList, setPlansList] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [skillGapData, setSkillGapData] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Natural Language Profile Parsing State
  const [nlpText, setNlpText] = useState("");
  const [nlpParsing, setNlpParsing] = useState(false);
  const [nlpMessage, setNlpMessage] = useState<string | null>(null);

  // Recommendations Category Filter
  const [selectedRecCategory, setSelectedRecCategory] = useState<string>("All");

  // Onboarding Form Wizard State
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    current_job_title: "",
    current_industry: "",
    years_experience: 2,
    employment_type: "Full-time",
    highest_qualification: "Bachelor's Degree",
    degree_specialization: "",
    current_skills: [],
    tools_technologies: [],
    responsibilities: "",
    certifications: [],
    career_goals: ["Switch to a different job"],
    target_pathway: "known_target",
    target_role: "",
    target_industry: "",
    preferred_location: "",
    preferred_work_arrangement: "No Preference",
    target_salary_range: "",
    weekly_learning_hours: 5,
    preferred_learning_format: "Mixed",
    learning_budget: "Free Only",
    preferred_language: "English",
    target_timeline: "Medium-term",
    current_salary: "",
  });

  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customToolInput, setCustomToolInput] = useState("");
  const [customCertInput, setCustomCertInput] = useState("");



  // Notes state for steps
  const [editingNotesStepId, setEditingNotesStepId] = useState<number | null>(null);
  const [stepNoteText, setStepNoteText] = useState("");

  // Load existing profile & plans
  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const prof = await api.getProfessionalProfile().catch(() => null);
      if (prof && prof.current_job_title) {
        setProfile(prof);
        setFormData({
          current_job_title: prof.current_job_title || "",
          current_industry: prof.current_industry || "",
          years_experience: prof.years_experience ?? 2,
          employment_type: prof.employment_type || "Full-time",
          highest_qualification: prof.highest_qualification || "Bachelor's Degree",
          degree_specialization: prof.degree_specialization || "",
          current_skills: prof.current_skills || [],
          tools_technologies: prof.tools_technologies || [],
          responsibilities: prof.responsibilities || "",
          certifications: prof.certifications || [],
          career_goals: prof.career_goals || ["Switch to a different job"],
          target_pathway: prof.target_pathway || "known_target",
          target_role: prof.target_role || "",
          target_industry: prof.target_industry || "",
          preferred_location: prof.preferred_location || "",
          preferred_work_arrangement: prof.preferred_work_arrangement || "No Preference",
          target_salary_range: prof.target_salary_range || "",
          weekly_learning_hours: prof.weekly_learning_hours ?? 5,
          preferred_learning_format: prof.preferred_learning_format || "Mixed",
          learning_budget: prof.learning_budget || "Free Only",
          preferred_language: prof.preferred_language || "English",
          target_timeline: prof.target_timeline || "Medium-term",
          current_salary: prof.current_salary || "",
        });

        // Load plans
        const plans = await api.listProfessionalPlans().catch(() => []);
        setPlansList(plans || []);
        if (plans && plans.length > 0) {
          const active = plans.find((p: any) => p.status === "active") || plans[0];
          const latestPlan = await api.getProfessionalPlan(active.id).catch(() => null);
          setActivePlan(latestPlan);
          if (latestPlan && latestPlan.target_role) {
            const gap = await api.getProfessionalSkillGap(latestPlan.target_role).catch(() => null);
            setSkillGapData(gap);
          }
          setActiveTab("overview");
        } else if (prof.target_role) {
          // Generate initial plan if target role exists
          const plan = await api.generateProfessionalPlan(prof.target_role).catch(() => null);
          setActivePlan(plan);
          if (plan && plan.target_role) {
            const gap = await api.getProfessionalSkillGap(plan.target_role).catch(() => null);
            setSkillGapData(gap);
          }
          const updatedPlans = await api.listProfessionalPlans().catch(() => []);
          setPlansList(updatedPlans || []);
          setActiveTab("overview");
        } else {
          // No plan yet, load recommendations
          const recs = await api.getProfessionalRecommendations().catch(() => []);
          setRecommendations(recs || []);
          setActiveTab("explore");
        }
      } else {
        // No profile yet, go to onboarding form
        setActiveTab("onboarding");
      }

      // Preload verified resources
      const resList = await api.getProfessionalResources().catch(() => []);
      setResources(resList || []);
    } catch (err: any) {
      console.error("Error loading professional planner data:", err);
      setErrorMsg("Failed to load your career profile. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Tag helpers for onboarding
  const toggleSkill = (skill: string) => {
    setFormData((prev: any) => {
      const exists = prev.current_skills.includes(skill);
      return {
        ...prev,
        current_skills: exists
          ? prev.current_skills.filter((s: string) => s !== skill)
          : [...prev.current_skills, skill],
      };
    });
  };

  const addCustomSkill = () => {
    const val = customSkillInput.trim();
    if (val && !formData.current_skills.includes(val)) {
      setFormData((prev: any) => ({ ...prev, current_skills: [...prev.current_skills, val] }));
      setCustomSkillInput("");
    }
  };

  const toggleTool = (tool: string) => {
    setFormData((prev: any) => {
      const exists = prev.tools_technologies.includes(tool);
      return {
        ...prev,
        tools_technologies: exists
          ? prev.tools_technologies.filter((t: string) => t !== tool)
          : [...prev.tools_technologies, tool],
      };
    });
  };

  const addCustomTool = () => {
    const val = customToolInput.trim();
    if (val && !formData.tools_technologies.includes(val)) {
      setFormData((prev: any) => ({ ...prev, tools_technologies: [...prev.tools_technologies, val] }));
      setCustomToolInput("");
    }
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev: any) => {
      const exists = prev.career_goals.includes(goal);
      return {
        ...prev,
        career_goals: exists
          ? prev.career_goals.filter((g: string) => g !== goal)
          : [...prev.career_goals, goal],
      };
    });
  };

  const addCustomCert = () => {
    const val = customCertInput.trim();
    if (val && !formData.certifications.includes(val)) {
      setFormData((prev: any) => ({ ...prev, certifications: [...prev.certifications, val] }));
      setCustomCertInput("");
    }
  };

  const handleParseNlp = async () => {
    if (!nlpText.trim()) return;
    try {
      setNlpParsing(true);
      setNlpMessage(null);
      const res = await api.parseNaturalLanguageProfile(nlpText);
      if (res && res.extracted_profile) {
        const ep = res.extracted_profile;
        setFormData((prev: any) => ({
          ...prev,
          current_job_title: ep.current_job_title || prev.current_job_title,
          current_industry: ep.current_industry || prev.current_industry,
          years_experience: ep.years_experience !== undefined ? ep.years_experience : prev.years_experience,
          current_skills: Array.from(new Set([...prev.current_skills, ...(ep.current_skills || [])])),
          tools_technologies: Array.from(new Set([...prev.tools_technologies, ...(ep.tools_technologies || [])])),
          responsibilities: ep.responsibilities || prev.responsibilities,
          target_role: ep.target_role || prev.target_role,
        }));
        setNlpMessage(`Parsed profile: detected ${ep.current_skills?.length || 0} skills, ${ep.tools_technologies?.length || 0} tools.`);
      }
    } catch (err: any) {
      setNlpMessage("Could not parse profile text. Please enter details manually.");
    } finally {
      setNlpParsing(false);
    }
  };

  // Submit onboarding form
  const handleSaveProfile = async () => {
    if (!formData.current_job_title.trim() || !formData.current_industry.trim()) {
      alert("Please provide your current job title and industry.");
      return;
    }
    setActionLoading(true);
    try {
      const savedProf = await api.saveProfessionalProfile(formData);
      setProfile(savedProf);

      if (formData.target_pathway === "known_target" && formData.target_role.trim()) {
        const plan = await api.generateProfessionalPlan(formData.target_role.trim());
        setActivePlan(plan);
        const gap = await api.getProfessionalSkillGap(formData.target_role.trim()).catch(() => null);
        setSkillGapData(gap);
        const plans = await api.listProfessionalPlans().catch(() => []);
        setPlansList(plans || []);
        setActiveTab("overview");
      } else {
        const recs = await api.getProfessionalRecommendations().catch(() => []);
        setRecommendations(recs || []);
        setActiveTab("explore");
      }
    } catch (err: any) {
      console.error("Save profile error:", err);
      alert(err.message || "Failed to save profile.");
    } finally {
      setActionLoading(false);
    }
  };

  // Select a recommended career and generate roadmap (preserves existing saved plans in history)
  const handleSelectRecommendedRole = async (roleTitle: string) => {
    setActionLoading(true);
    try {
      const plan = await api.generateProfessionalPlan(roleTitle);
      setActivePlan(plan);
      const gap = await api.getProfessionalSkillGap(roleTitle).catch(() => null);
      setSkillGapData(gap);
      const updatedProf = await api.getProfessionalProfile();
      setProfile(updatedProf);
      const plans = await api.listProfessionalPlans().catch(() => []);
      setPlansList(plans || []);
      setActiveTab("overview");
    } catch (err: any) {
      alert(err.message || "Failed to generate roadmap for role.");
    } finally {
      setActionLoading(false);
    }
  };

  // Switch between saved plans without data loss
  const handleSwitchPlan = async (planId: number) => {
    setActionLoading(true);
    try {
      const switched = await api.activateProfessionalPlan(planId);
      setActivePlan(switched);
      if (switched && switched.target_role) {
        const gap = await api.getProfessionalSkillGap(switched.target_role).catch(() => null);
        setSkillGapData(gap);
      }
      const plans = await api.listProfessionalPlans().catch(() => []);
      setPlansList(plans || []);
    } catch (err: any) {
      alert(err.message || "Failed to switch plan.");
    } finally {
      setActionLoading(false);
    }
  };

  // Quick confirm an unknown skill from the Skill Gap diagnostic
  const handleConfirmUnknownSkill = async (skillName: string) => {
    setActionLoading(true);
    try {
      const currentSkills = profile?.current_skills || [];
      if (!currentSkills.includes(skillName)) {
        const updatedSkills = [...currentSkills, skillName];
        const updatedProf = await api.saveProfessionalProfile({
          ...formData,
          ...profile,
          current_skills: updatedSkills
        });
        setProfile(updatedProf);
        setFormData((prev: any) => ({ ...prev, current_skills: updatedSkills }));
        // Recalculate skill gap & recommendations
        if (activePlan?.target_role) {
          const gap = await api.getProfessionalSkillGap(activePlan.target_role).catch(() => null);
          setSkillGapData(gap);
        }
        const recs = await api.getProfessionalRecommendations().catch(() => []);
        setRecommendations(recs || []);
      }
    } catch (err: any) {
      alert(err.message || "Failed to confirm skill.");
    } finally {
      setActionLoading(false);
    }
  };

  // Step Status toggle
  const handleToggleStepStatus = async (stepId: number, nextStatus: string) => {
    if (!activePlan) return;
    try {
      await api.updateProfessionalStep(activePlan.id, stepId, { completion_status: nextStatus });
      // Update local state
      setActivePlan((prev: any) => {
        if (!prev) return prev;
        const updatedSteps = prev.steps.map((s: any) =>
          s.id === stepId ? { ...s, completion_status: nextStatus } : s
        );
        const completed = updatedSteps.filter((s: any) => s.completion_status === "completed").length;
        const total = updatedSteps.length;
        return {
          ...prev,
          steps: updatedSteps,
          completed_steps: completed,
          progress_pct: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      });
    } catch (err) {
      console.error("Failed to update step:", err);
    }
  };

  // Save Step Note
  const handleSaveStepNote = async (stepId: number) => {
    if (!activePlan) return;
    try {
      await api.updateProfessionalStep(activePlan.id, stepId, { user_notes: stepNoteText });
      setActivePlan((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          steps: prev.steps.map((s: any) => (s.id === stepId ? { ...s, user_notes: stepNoteText } : s)),
        };
      });
      setEditingNotesStepId(null);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  // Toggle checklist item
  const handleToggleChecklistItem = async (itemIndex: number) => {
    if (!activePlan || !activePlan.checklist_items) return;
    const updated = activePlan.checklist_items.map((it: any, idx: number) =>
      idx === itemIndex ? { ...it, completed: !it.completed } : it
    );
    setActivePlan((prev: any) => ({ ...prev, checklist_items: updated }));
    try {
      await api.updateProfessionalChecklist(activePlan.id, updated);
    } catch (err) {
      console.error("Checklist update failed:", err);
    }
  };



  if (loading) {
    return (
      <div className="card p-12 text-center border-slate-200 animate-pulse space-y-4 max-w-4xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/20 mx-auto flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-brand-600 animate-spin" />
        </div>
        <h3 className="text-xl font-bold font-heading text-slate-800">
          Loading Working Professional Career Growth & Transition Planner...
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Analyzing your experience, verifying skill matrices, and configuring your personalized guidance.
        </p>
      </div>
    );
  }

  // =========================================================================
  // RENDER: ONBOARDING / PROFILE EDIT WIZARD
  // =========================================================================
  if (activeTab === "onboarding") {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
        {/* Wizard Banner */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shrink-0">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Working Professional Assessment
              </span>
              <span className="text-xs text-slate-400 font-medium">Step {formStep} of 4</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 mt-1">
              Career Growth & Transition Planner Setup
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Provide your actual experience and targets to generate an actionable, evidence-based roadmap.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(formStep / 4) * 100}%` }}
          />
        </div>

        <div className="card p-6 md:p-8 border-slate-200 shadow-sm space-y-6">
          {/* STEP 1: Current Profile */}
          {formStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-heading text-slate-900">
                  Step 1: Your Current Professional Profile
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tell us where you are today. We use this to compute transferable capabilities.
                </p>
              </div>

              {/* Natural Language Smart Fill Box */}
              <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Smart Profile Fill (Paste Bio, Resume, or Free Text)
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-700 bg-brand-100 font-semibold px-2 py-0.5 rounded">
                    Optional AI Assistant
                  </span>
                </div>
                <textarea
                  rows={3}
                  className="input w-full text-xs font-sans resize-none"
                  placeholder="e.g. I am a digital marketer with 2 years of experience in content strategy and SEO. I also have teaching experience, strong communication skills, and work with Google Analytics and basic SQL."
                  value={nlpText}
                  onChange={(e) => setNlpText(e.target.value)}
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">
                    {nlpMessage || "Extracts your roles, skills, and tools into structured profile fields."}
                  </span>
                  <button
                    type="button"
                    disabled={nlpParsing || !nlpText.trim()}
                    onClick={handleParseNlp}
                    className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                  >
                    {nlpParsing ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {nlpParsing ? "Analyzing..." : "Auto-Fill with AI"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Job Title / Role *
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Manual Tester, Junior Developer, Accountant"
                    value={formData.current_job_title}
                    onChange={(e) => setFormData({ ...formData, current_job_title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Industry *
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Software & IT, Finance, Retail, Healthcare"
                    value={formData.current_industry}
                    onChange={(e) => setFormData({ ...formData, current_industry: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Total Work Experience (Years) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    className="input w-full"
                    value={formData.years_experience}
                    onChange={(e) => setFormData({ ...formData, years_experience: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <select
                    className="input w-full"
                    value={formData.employment_type}
                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. B.Tech, B.Com, MCA, MBA, Diploma"
                    value={formData.highest_qualification}
                    onChange={(e) => setFormData({ ...formData, highest_qualification: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Degree or Specialization (Optional)
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Computer Science, Accounting, Electronics"
                    value={formData.degree_specialization}
                    onChange={(e) => setFormData({ ...formData, degree_specialization: e.target.value })}
                  />
                </div>
              </div>

              {/* Skills Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Skills You Actually Possess
                </label>
                <p className="text-xs text-slate-500 mb-1">
                  Only select skills you can confidently demonstrate in an interview or on the job. Do not select skills from other domains unless you genuinely have them.
                </p>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-3 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Your recommendations and skill analysis are based entirely on what you select here. Selecting skills you do not possess will produce inaccurate career guidance.</span>
                </div>
                <div className="space-y-3 mb-3">
                  {Object.entries(SKILLS_BY_DOMAIN).map(([domain, skills]) => (
                    <div key={domain}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{domain}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((sk) => {
                          const selected = formData.current_skills.includes(sk);
                          return (
                            <button
                              key={sk}
                              type="button"
                              onClick={() => toggleSkill(sk)}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                                selected
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                              }`}
                            >
                              {selected ? "✓ " : "+ "}
                              {sk}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input flex-1 text-sm py-2"
                    placeholder="Add custom skill (e.g. Regression Testing, Kubectl)"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomSkill();
                      }
                    }}
                  />
                  <button type="button" onClick={addCustomSkill} className="btn-secondary text-xs px-3">
                    Add
                  </button>
                </div>
                {formData.current_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.current_skills.map((s: string) => (
                      <span key={s} className="badge bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        {s}
                        <button type="button" onClick={() => toggleSkill(s)} className="text-slate-400 hover:text-rose-500 font-bold">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tools & Technologies */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tools & Technologies Used in Your Role
                </label>
                <div className="space-y-3 mb-2">
                  {Object.entries(TOOLS_BY_DOMAIN).map(([domain, tools]) => (
                    <div key={domain}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{domain}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tools.map((tl) => {
                          const selected = formData.tools_technologies.includes(tl);
                          return (
                            <button
                              key={tl}
                              type="button"
                              onClick={() => toggleTool(tl)}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                                selected
                                  ? "bg-brand-600 text-white border-brand-600"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-300"
                              }`}
                            >
                              {selected ? "✓ " : "+ "}
                              {tl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input flex-1 text-sm py-2"
                    placeholder="Add custom tool (e.g. Jenkins, Splunk, Excel Pivot)"
                    value={customToolInput}
                    onChange={(e) => setCustomToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTool();
                      }
                    }}
                  />
                  <button type="button" onClick={addCustomTool} className="btn-secondary text-xs px-3">
                    Add
                  </button>
                </div>
              </div>

              {/* Responsibilities in own words */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Main Job Responsibilities (In Your Own Words)
                </label>
                <textarea
                  rows={3}
                  className="input w-full text-sm"
                  placeholder="Describe your day-to-day responsibilities, e.g. Executing manual test cases, logging defects in Jira, preparing monthly audit schedules..."
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Professional Certifications (If Any)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input flex-1 text-sm py-2"
                    placeholder="e.g. ISTQB Foundation, AWS Cloud Practitioner, PMP"
                    value={customCertInput}
                    onChange={(e) => setCustomCertInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomCert();
                      }
                    }}
                  />
                  <button type="button" onClick={addCustomCert} className="btn-secondary text-xs px-3">
                    Add
                  </button>
                </div>
                {formData.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.certifications.map((c: string) => (
                      <span key={c} className="badge bg-emerald-50 text-emerald-800 text-xs px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Career Goals */}
          {formStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-heading text-slate-900">
                  Step 2: What Do You Want to Achieve?
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select all the career objectives that reflect your immediate or medium-term ambitions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CAREER_GOAL_OPTIONS.map((goal) => {
                  const checked = formData.career_goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        checked
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          checked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300"
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-sm">{goal}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Target Career Pathways */}
          {formStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-heading text-slate-900">
                  Step 3: Target Career Direction
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Do you already have a target role in mind, or would you like recommendations based on your experience?
                </p>
              </div>

              {/* Pathway Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, target_pathway: "known_target" })}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    formData.target_pathway === "known_target"
                      ? "bg-brand-50 border-brand-500 ring-2 ring-brand-200"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-5 h-5 text-brand-600" />
                    <h3 className="font-bold text-slate-900 text-base">Pathway 1: I Know My Target Career</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Specify the role you want (e.g. Automation Tester, Backend Developer). We will calculate your exact skill gaps and build a roadmap.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, target_pathway: "help_me_choose", target_role: "" })}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    formData.target_pathway === "help_me_choose"
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Compass className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-base">Pathway 2: Help Me Choose My Next Career</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    We will analyze your current experience, skills, and goals to recommend matching lateral moves, promotions, and transitions.
                  </p>
                </button>
              </div>

              {/* Fields if Pathway 1 */}
              {formData.target_pathway === "known_target" && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Job Title *
                      </label>
                      <input
                        type="text"
                        className="input w-full bg-white"
                        placeholder="e.g. Automation Tester, Financial Analyst, Cloud Support Engineer"
                        value={formData.target_role}
                        onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Industry (Optional)
                      </label>
                      <input
                        type="text"
                        className="input w-full bg-white"
                        placeholder="e.g. Software & IT, FinTech, E-commerce"
                        value={formData.target_industry}
                        onChange={(e) => setFormData({ ...formData, target_industry: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Work Arrangement
                      </label>
                      <select
                        className="input w-full bg-white"
                        value={formData.preferred_work_arrangement}
                        onChange={(e) => setFormData({ ...formData, preferred_work_arrangement: e.target.value })}
                      >
                        <option value="No Preference">No Preference</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Location (Optional)
                      </label>
                      <input
                        type="text"
                        className="input w-full bg-white"
                        placeholder="e.g. Bangalore, Hyderabad, Remote"
                        value={formData.preferred_location}
                        onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Salary Range (Optional)
                      </label>
                      <input
                        type="text"
                        className="input w-full bg-white"
                        placeholder="e.g. 10 - 15 LPA"
                        value={formData.target_salary_range}
                        onChange={(e) => setFormData({ ...formData, target_salary_range: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Learning Preferences */}
          {formStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-heading text-slate-900">
                  Step 4: Learning Preferences & Commitments
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  We calculate realistic roadmap milestones and duration estimates using your available study bandwidth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Available Learning Time Per Week: <span className="text-emerald-700 font-bold">{formData.weekly_learning_hours} hrs/week</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    step="1"
                    className="w-full accent-emerald-600 mt-2"
                    value={formData.weekly_learning_hours}
                    onChange={(e) => setFormData({ ...formData, weekly_learning_hours: parseInt(e.target.value) || 5 })}
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>2 hrs (Light)</span>
                    <span>5 hrs (Standard)</span>
                    <span>15+ hrs (Intensive)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Learning Budget
                  </label>
                  <select
                    className="input w-full"
                    value={formData.learning_budget}
                    onChange={(e) => setFormData({ ...formData, learning_budget: e.target.value })}
                  >
                    <option value="Free Only">Free Only (Official Docs, Free Audits, Open Source)</option>
                    <option value="Low Budget">Low Budget (Budget Certifications / Self-Paced)</option>
                    <option value="Flexible Budget">Flexible Budget</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Learning Format
                  </label>
                  <select
                    className="input w-full"
                    value={formData.preferred_learning_format}
                    onChange={(e) => setFormData({ ...formData, preferred_learning_format: e.target.value })}
                  >
                    <option value="Mixed">Mixed (Videos + Docs + Practical Tasks)</option>
                    <option value="Practical Projects">Practical Hands-on Projects</option>
                    <option value="Documentation">Official Documentation & Articles</option>
                    <option value="Guided Courses">Guided Online Courses</option>
                    <option value="Videos">Video Tutorials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Timeline
                  </label>
                  <select
                    className="input w-full"
                    value={formData.target_timeline}
                    onChange={(e) => setFormData({ ...formData, target_timeline: e.target.value })}
                  >
                    <option value="Short-term">Short-term (3 - 6 months)</option>
                    <option value="Medium-term">Medium-term (6 - 12 months)</option>
                    <option value="Flexible">Flexible / Ongoing Upskilling</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={formStep === 1 || actionLoading}
              onClick={() => setFormStep((prev) => Math.max(1, prev - 1))}
              className="btn-ghost text-sm"
            >
              Back
            </button>

            {formStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (formStep === 1 && (!formData.current_job_title.trim() || !formData.current_industry.trim())) {
                    alert("Please provide your current job title and industry before proceeding.");
                    return;
                  }
                  if (formStep === 3 && formData.target_pathway === "known_target" && !formData.target_role.trim()) {
                    alert("Please specify your target job title or switch to 'Help Me Choose'.");
                    return;
                  }
                  setFormStep((prev) => Math.min(4, prev + 1));
                }}
                className="btn-primary text-sm px-6 flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleSaveProfile}
                className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-sm px-7 flex items-center gap-2"
              >
                {actionLoading ? "Generating Your Plan..." : "Generate Personalized Plan"}
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: MAIN PROFESSIONAL PLANNER DASHBOARD
  // =========================================================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Top Banner & Quick Stats */}
      <div className="card p-6 md:p-8 bg-slate-900 border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Working Professional Career Growth Hub
              </span>
              <span className="text-xs text-slate-400">
                {profile?.current_job_title} · {profile?.years_experience} yrs exp
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
              {activePlan?.target_role ? `Transition Plan: ${activePlan.target_role}` : "Career Growth & Transition Planner"}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl line-clamp-2">
              {profile?.profile_summary || "Personalized role-to-skill gap analysis, curated roadmaps, and progress tracking."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setFormStep(1);
                setActiveTab("onboarding");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Roadmap & Progress
          </button>

          <button
            onClick={() => setActiveTab("skill_gap")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "skill_gap"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Skill Gap Analyzer
          </button>

          <button
            onClick={() => {
              if (recommendations.length === 0) {
                api.getProfessionalRecommendations().then(setRecommendations);
              }
              setActiveTab("explore");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "explore"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Career Recommendations
          </button>

          <button
            onClick={() => setActiveTab("resources")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "resources"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Learning Resources
          </button>

          <button
            type="button"
            onClick={() => setCopilotOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md hover:shadow-lg hover:scale-105 ml-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            <span>Ask AI Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "checklist"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Transition Checklist
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* =====================================================================
          TAB 1: ROADMAP & PROGRESS OVERVIEW
          ===================================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Target Role & Saved Plans Switcher Bar */}
          <div className="card p-4 md:p-5 bg-white border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Primary Target Career Plan
                  </span>
                  {activePlan?.status && (
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Status: {activePlan.status}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                  {activePlan?.target_role || profile?.target_role || "Career Plan"}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {plansList && plansList.length > 1 && (
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-semibold px-2">Saved Plans:</span>
                  {plansList.map((p: any) => (
                    <button
                      key={p.id}
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleSwitchPlan(p.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        p.id === activePlan?.id
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.target_role} ({p.progress_pct ?? 0}%)
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (recommendations.length === 0) {
                    api.getProfessionalRecommendations().then(setRecommendations);
                  }
                  setActiveTab("explore");
                }}
                className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
                Explore Other Careers
              </button>
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="card p-6 border-slate-200 shadow-sm bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Roadmap Progress</span>
                <h2 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                  Overall Completion Status
                </h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black font-heading text-emerald-600">
                  {activePlan?.progress_pct ?? 0}%
                </span>
                <p className="text-xs text-slate-400">
                  {activePlan?.completed_steps ?? 0} of {activePlan?.total_steps ?? 0} steps completed
                </p>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${activePlan?.progress_pct ?? 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">Weekly Commitment</span>
                <strong className="text-slate-800">{profile?.weekly_learning_hours || 5} hours / week</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Learning Budget</span>
                <strong className="text-slate-800">{profile?.learning_budget || "Free Only"}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Estimated Timeline</span>
                <strong className="text-slate-800">{activePlan?.timeline_estimate || "4-6 months"}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Profile Match Score</span>
                <strong className="text-emerald-700">{activePlan?.match_score ?? 0}% Match</strong>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Note: Profile match score reflects alignment with target curriculum and verified skills, not probability of getting hired.
              </span>
            </div>
          </div>

          {/* Step-by-Step Roadmap Stages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                Personalized Step-by-Step Transition Plan
              </h2>
              <span className="text-xs text-slate-500">
                Tap steps to mark progress or log personal notes
              </span>
            </div>

            {(!activePlan?.steps || activePlan.steps.length === 0) ? (
              <div className="card p-10 text-center border-slate-200">
                <p className="text-slate-500">No active plan steps found. Select a target role to generate your roadmap.</p>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="btn-primary mt-4 text-xs px-4"
                >
                  Explore Recommended Roles
                </button>
              </div>
            ) : (
              activePlan.steps.map((step: any) => {
                const isCompleted = step.completion_status === "completed";
                const isInProgress = step.completion_status === "in_progress";
                const isEditingNotes = editingNotesStepId === step.id;

                return (
                  <div
                    key={step.id}
                    className={`card p-5 md:p-6 border transition-all ${
                      isCompleted
                        ? "bg-emerald-50/40 border-emerald-200"
                        : isInProgress
                        ? "bg-amber-50/30 border-amber-200 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {step.stage_name}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              step.priority === "High"
                                ? "bg-rose-100 text-rose-700"
                                : step.priority === "Medium"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {step.priority} Priority
                          </span>
                          {step.estimated_duration && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {step.estimated_duration}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold font-heading text-slate-900">
                          {step.order_index}. {step.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {step.explanation}
                        </p>

                        {/* Practical Task Callout */}
                        {step.practical_task && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                            <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-slate-900 block mb-0.5">Practical Evidence Task:</strong>
                              <span>{step.practical_task}</span>
                            </div>
                          </div>
                        )}

                        {/* Resource Button */}
                        {step.resource_url && (
                          <div className="pt-1">
                            <a
                              href={step.resource_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                              <span>{step.resource_title || "Verified Learning Resource"}</span>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 rounded">
                                {step.resource_cost || "Free"}
                              </span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            type="button"
                            onClick={() => handleToggleStepStatus(step.id, "not_started")}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                              step.completion_status === "not_started"
                                ? "bg-white text-slate-800 shadow-sm font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            To Do
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleStepStatus(step.id, "in_progress")}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                              isInProgress
                                ? "bg-amber-500 text-white shadow-sm font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleStepStatus(step.id, "completed")}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                              isCompleted
                                ? "bg-emerald-600 text-white shadow-sm font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            ✓ Done
                          </button>
                        </div>

                        {/* User Notes Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isEditingNotes) {
                              setEditingNotesStepId(null);
                            } else {
                              setEditingNotesStepId(step.id);
                              setStepNoteText(step.user_notes || "");
                            }
                          }}
                          className="text-xs text-brand-600 hover:text-brand-700 font-semibold mt-1"
                        >
                          {step.user_notes ? "Edit Note" : "+ Add Note"}
                        </button>
                      </div>
                    </div>

                    {/* Personal Notes Display & Editor */}
                    {step.user_notes && !isEditingNotes && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                        <strong>My Note:</strong> {step.user_notes}
                      </div>
                    )}

                    {isEditingNotes && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                        <textarea
                          rows={2}
                          className="input w-full text-xs"
                          placeholder="Record your progress, links to exercises, or notes for this step..."
                          value={stepNoteText}
                          onChange={(e) => setStepNoteText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingNotesStepId(null)}
                            className="btn-ghost text-xs py-1"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveStepNote(step.id)}
                            className="btn-primary text-xs py-1 px-3"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: SKILL GAP ANALYZER
          ===================================================================== */}
      {activeTab === "skill_gap" && (
        <div className="space-y-6">
          {/* Header Card with Radial Score */}
          <div className="card p-6 md:p-8 border-slate-200 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Diagnostic Breakdown
                </span>
                <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
                  Skill Gap Analysis for {activePlan?.target_role || profile?.target_role || "Target Role"}
                </h2>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">
                  {skillGapData?.match_score_explanation ||
                    "Compares your current verified competencies against target industry requirements."}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl shrink-0">
                <div className="text-center">
                  <span className="text-3xl font-black font-heading text-emerald-700">
                    {skillGapData?.match_score ?? activePlan?.match_score ?? 0}%
                  </span>
                  <p className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider">
                    Profile-to-Role Match
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Diagnostic Notice: Match score evaluates verified profile skills against curated role curriculum. It does not calculate or guarantee hiring probability.
              </span>
            </div>

            {/* Case D: Unsupported Career Banner */}
            {skillGapData?.status === "unsupported_career" && (
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-amber-950">Career Guidance Limitation Notice</h3>
                    <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                      {skillGapData.unsupported_message ||
                        "This career is not yet supported in our verified knowledge base. To maintain strict standards of accuracy, we do not fabricate skills or roadmaps."}
                    </p>
                    {skillGapData.request_id && (
                      <div className="mt-2 text-xs font-mono bg-white/80 px-3 py-1.5 rounded-lg border border-amber-300 inline-block text-amber-900">
                        Tracking Request ID: <strong>{skillGapData.request_id}</strong> (Recorded for knowledge base curation)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Case B: Knowledge Base Verification Notice */}
            {skillGapData?.verification_notice && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5 mt-4">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-blue-950 block">Knowledge Base Verification Notice:</strong>
                  <p className="mt-0.5 leading-relaxed">{skillGapData.verification_notice}</p>
                </div>
              </div>
            )}

            {/* Case C: Missing Information Questions */}
            {skillGapData?.missing_information_questions && skillGapData.missing_information_questions.length > 0 && (
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
                  <strong className="font-bold text-purple-950">Targeted Profile Details Needed:</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {skillGapData.missing_information_questions.map((q: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-white rounded-lg border border-purple-100 shadow-2xs">
                      <p className="text-[11px] font-semibold text-slate-800">{q.question}</p>
                      <span className="text-[10px] text-purple-600 italic block mt-0.5">{q.why_it_matters}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Skills Incomplete Warning Banner */}
            {skillGapData?.missing_information_prompt && !skillGapData?.missing_information_questions?.length && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-950 block text-xs">Profile Skills Incomplete:</strong>
                    <p className="mt-0.5 leading-relaxed">{skillGapData.missing_information_prompt}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormStep(1);
                    setActiveTab("onboarding");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition-colors"
                >
                  Update Profile Skills
                </button>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-4 text-xs text-slate-600">
              <strong className="text-slate-900 block mb-0.5">Transferability Evaluation:</strong>
              {skillGapData?.transferability_summary ||
                "Your existing professional experience provides strong domain foundations. Focus your available time on high-priority missing technical tools."}
            </div>
          </div>

          {/* 5 Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Confirmed Existing Skills */}
            <div className="card p-6 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold font-heading text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Confirmed Skills (Profile-Verified)
                </h3>
                <span className="badge bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {skillGapData?.existing_skills?.length || 0} Confirmed
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Skills you explicitly confirmed in your profile that directly transfer to this role.
              </p>
              <div className="space-y-3">
                {(!skillGapData?.existing_skills || skillGapData.existing_skills.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No confirmed matching skills recorded in profile yet.</p>
                ) : (
                  skillGapData.existing_skills.map((sk: any) => (
                    <div key={sk.skill_name} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-emerald-950 font-bold">{sk.skill_name}</strong>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Confirmed Transferable
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{sk.why_it_matters}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 2. Skills to Improve */}
            <div className="card p-6 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Skills to Deepen / Improve
                </h3>
                <span className="badge bg-amber-100 text-amber-800 text-xs font-bold">
                  {skillGapData?.skills_to_improve?.length || 0} Identified
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Skills where you have initial familiarity but need deeper production mastery for this role.
              </p>
              <div className="space-y-3">
                {(!skillGapData?.skills_to_improve || skillGapData.skills_to_improve.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No partial skills identified.</p>
                ) : (
                  skillGapData.skills_to_improve.map((sk: any) => (
                    <div key={sk.skill_name} className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-amber-950 font-bold">{sk.skill_name}</strong>
                        <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          Deepen Mastery
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{sk.why_it_matters}</p>
                      {sk.suggested_resource && (
                        <a
                          href={sk.suggested_resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-brand-600 font-semibold flex items-center gap-1 mt-2 hover:underline"
                        >
                          <BookOpen className="w-3 h-3" /> Recommended Guide: {sk.suggested_resource.title}
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. Missing Skills */}
            <div className="card p-6 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold font-heading text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  Missing Skills (Core Curriculum Gaps)
                </h3>
                <span className="badge bg-rose-100 text-rose-800 text-xs font-bold">
                  {skillGapData?.missing_skills?.length || 0} Priority Gaps
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Essential role competencies not currently found in your profile that must be acquired.
              </p>
              <div className="space-y-3">
                {(!skillGapData?.missing_skills || skillGapData.missing_skills.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No missing core competencies detected.</p>
                ) : (
                  skillGapData.missing_skills.map((sk: any) => (
                    <div key={sk.skill_name} className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-rose-950 font-bold">{sk.skill_name}</strong>
                        <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          {sk.recommended_priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{sk.why_it_matters}</p>
                      {sk.suggested_resource && (
                        <a
                          href={sk.suggested_resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-brand-600 font-semibold flex items-center gap-1 mt-2 hover:underline"
                        >
                          <BookOpen className="w-3 h-3" /> Start Learning: {sk.suggested_resource.title}
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 4. Recommended Additional Skills */}
            <div className="card p-6 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  Recommended Additional Skills
                </h3>
                <span className="badge bg-indigo-100 text-indigo-800 text-xs font-bold">
                  {skillGapData?.recommended_additional?.length || 0} Value-Adds
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Complementary tools that distinguish your application from other candidates.
              </p>
              <div className="space-y-3">
                {(!skillGapData?.recommended_additional || skillGapData.recommended_additional.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No additional secondary skills listed.</p>
                ) : (
                  skillGapData.recommended_additional.map((sk: any) => (
                    <div key={sk.skill_name} className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-indigo-950 font-bold">{sk.skill_name}</strong>
                        <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                          Value-Add
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{sk.why_it_matters}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 5. Unknown / Unconfirmed Skills Section (Prominent Diagnostic) */}
            {skillGapData?.unknown_skills && skillGapData.unknown_skills.length > 0 && (
              <div className="card p-6 border-purple-200 bg-purple-50/30 md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold font-heading text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    Unknown / Unconfirmed Skills (Requires Confirmation)
                  </h3>
                  <span className="badge bg-purple-100 text-purple-800 text-xs font-bold">
                    {skillGapData.unknown_skills.length} To Confirm
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  These competencies are required for your target role, but your profile has not yet indicated your proficiency.
                  We never assume you have or lack them solely from your job title. Confirm if you have experience with these skills:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skillGapData.unknown_skills.map((sk: any) => (
                    <div key={sk.skill_name} className="p-4 rounded-xl bg-white border border-purple-100 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-slate-900">{sk.skill_name}</strong>
                        <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          Proficiency Unknown
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{sk.why_it_matters}</p>
                      {sk.follow_up_prompt && (
                        <p className="text-xs italic text-purple-900 bg-purple-50/70 p-2 rounded-lg border border-purple-100">
                          ❓ {sk.follow_up_prompt}
                        </p>
                      )}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => handleConfirmUnknownSkill(sk.skill_name)}
                          className="btn-primary bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> I Have This Skill
                        </button>
                        {sk.suggested_resource && (
                          <a
                            href={sk.suggested_resource.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-slate-500 hover:text-purple-600 font-medium flex items-center gap-1"
                          >
                            <BookOpen className="w-3 h-3" /> View Primer
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: CAREER OPTIONS RECOMMENDATIONS
          ===================================================================== */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          <div className="card p-6 border-slate-200 bg-white">
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Alternative Career Recommendations (Explore Other Pathways)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Curated adjacent and transition pathways based on your profile ({profile?.current_job_title}, {profile?.years_experience} years in {profile?.current_industry}).
              Prioritizes realistic adjacent growth paths before major career transitions.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Transparent Scoring: Match scores evaluate confirmed skills (50%), domain experience (25%), career goals (15%), and tools (10%). They are not hiring probabilities.
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-700 mr-1">Pathway Category:</span>
              {[
                { id: "All", label: "All Pathways" },
                { id: "Closely Related", label: "A. Closely Related" },
                { id: "Career Growth", label: "B. Career Growth" },
                { id: "Transition", label: "C. Career Transition" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedRecCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedRecCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(selectedRecCategory === "All"
              ? recommendations
              : recommendations.filter((r) =>
                  (r.recommendation_category || "").toLowerCase().includes(selectedRecCategory.toLowerCase()) ||
                  (r.move_type || "").toLowerCase().includes(selectedRecCategory.toLowerCase())
                )
            ).map((rec) => (
              <div key={rec.slug} className="card p-6 border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {rec.recommendation_category || rec.move_type}
                        </span>
                        {rec.feasibility && (
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              rec.feasibility === "High"
                                ? "bg-green-100 text-green-800"
                                : rec.feasibility === "Medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {rec.feasibility} Feasibility
                          </span>
                        )}
                        {rec.estimated_duration && (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Est. {rec.estimated_duration}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold font-heading text-slate-900 mt-1">
                        {rec.role_title}
                      </h3>
                      <p className="text-xs text-slate-400">{rec.industry}</p>
                    </div>
                    <span className="text-base font-black font-heading text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl shrink-0">
                      {rec.match_score}% Match
                    </span>
                  </div>

                  {/* 4-Part Transparent Score Breakdown */}
                  {rec.score_breakdown && (
                    <div className="grid grid-cols-4 gap-1.5 text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                      <div>
                        <span className="text-slate-400 block">Skills</span>
                        <strong className="text-slate-800">{rec.score_breakdown.skills_score}/50</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Exp & Ind</span>
                        <strong className="text-slate-800">{rec.score_breakdown.experience_score}/25</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Goals</span>
                        <strong className="text-slate-800">{rec.score_breakdown.goal_alignment_score || rec.score_breakdown.goals_score}/15</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Tools</span>
                        <strong className="text-slate-800">{rec.score_breakdown.tools_score || rec.score_breakdown.tools_quals_score}/10</strong>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div>
                      <strong className="text-slate-800">Why it fits you: </strong>
                      <span className="text-slate-600">{rec.why_it_fits}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Transferable Skills: </strong>
                      {rec.transferable_skills && rec.transferable_skills.length > 0 ? (
                        <span className="text-emerald-700 font-medium">{rec.transferable_skills.join(", ")}</span>
                      ) : (
                        <span className="text-slate-400 italic">No confirmed transferable skills in profile</span>
                      )}
                    </div>
                    <div>
                      <strong className="text-slate-800">Skills to Build: </strong>
                      {rec.skills_to_develop && rec.skills_to_develop.length > 0 ? (
                        <span className="text-amber-700 font-medium">{rec.skills_to_develop.join(", ")}</span>
                      ) : (
                        <span className="text-slate-400 italic">Curated role prerequisites</span>
                      )}
                    </div>
                    {rec.source_references && rec.source_references.length > 0 && (
                      <div className="pt-1 text-[10px] text-slate-400 border-t border-slate-200/60 flex items-center justify-between">
                        <span>Verified: {rec.last_verified || "2026-03-15"}</span>
                        <span>Source: {rec.source_references.map((s: any) => s.source || s.name || "Verified KB").join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Preserves existing plan in saved history</span>
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleSelectRecommendedRole(rec.role_title)}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
                  >
                    Select Role & Build Roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: VERIFIED LEARNING RESOURCES
          ===================================================================== */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="card p-6 border-slate-200 bg-white">
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Verified Learning Resources
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Curated official documentation, interactive courseware, and hands-on platforms mapped to your target career requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((res) => (
              <div key={res.id} className="card p-5 border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {res.cost_type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{res.provider}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm font-heading leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3">
                    {res.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Skill: {res.related_skill}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    Open Resource <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* =====================================================================
          TAB 6: TRANSITION & RESUME CHECKLIST
          ===================================================================== */}
      {activeTab === "checklist" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="card p-6 border-slate-200 bg-white">
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Career Transition & Job Readiness Checklist
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Concrete milestones to prepare your portfolio, resume, and interview stories before applying.
            </p>
          </div>

          <div className="card p-6 border-slate-200 bg-white space-y-3">
            {(!activePlan?.checklist_items || activePlan.checklist_items.length === 0) ? (
              <p className="text-xs text-slate-500">No checklist items available for this plan.</p>
            ) : (
              activePlan.checklist_items.map((item: any, idx: number) => (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => handleToggleChecklistItem(idx)}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    item.completed
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-900 line-through opacity-80"
                      : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      item.completed ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300"
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5" />}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* FLOATING AI COPILOT BUTTON & DRAWER (EXACT SAME PATTERN AS SCHOLARSHIP AND GRADUATE) */}
      <div className="fixed bottom-6 right-6 z-40">
        {copilotOpen ? (
          <div className="w-[360px] sm:w-[420px] shadow-2xl animate-fade-in">
            <ProfessionalAICopilot
              profile={profile}
              activePlan={activePlan}
              onClose={() => setCopilotOpen(false)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-full shadow-xl hover:shadow-2xl transition hover:scale-105 border border-emerald-400/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
            <span>Career AI Assistant</span>
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          </button>
        )}
      </div>
    </div>
  );
}
