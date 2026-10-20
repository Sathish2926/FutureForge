import { useEffect, useState } from "react";
import { api } from "../api/client";
import {
  GraduationCap,
  MapPin,
  Building2,
  BookmarkPlus,
  BookmarkCheck,
  ExternalLink,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Award,
  DollarSign,
  TrendingUp,
  X,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface CollegeRecommendationItem {
  college_id: number | string;
  college_name: string;
  course: string;
  domain: string;
  state: string;
  city: string;
  location: string;
  institution_type: string;
  annual_fee_inr: number;
  estimated_total_annual_cost_inr: number;
  average_package_lpa: number;
  avg_package_lpa?: number;
  placement_rate_pct: number;
  match_score: number;
  match_level: string;
  budget_fit_status: string;
  ctc_fit_status?: string;
  desired_ctc?: number;
  eligibility_status?: string;
  entrance_exam: string;
  entrance_exam_status: string;
  hostel_available: boolean;
  nirf_rank?: number;
  rating: number;
  why_fit: string[];
  tradeoffs: string[];
  verification_status: string;
  verification_required: string;
  is_location_match: boolean;
}

const TIER_BADGES: Record<string, string> = {
  "Best Match": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Strong Match": "bg-indigo-100 text-indigo-800 border-indigo-300",
  "Good Match": "bg-blue-100 text-blue-800 border-blue-300",
  "Reach": "bg-amber-100 text-amber-800 border-amber-300",
};

const BUDGET_STATUS_BADGES: Record<string, string> = {
  "Within Budget": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Stretch": "bg-amber-50 text-amber-700 border-amber-200",
  "Over Budget": "bg-rose-50 text-rose-700 border-rose-200",
};

const CTC_CHIP_OPTIONS = [
  { value: "", label: "✨ Any CTC (No Filter)", sub: "All Packages" },
  { value: "4", label: "₹4+ LPA", sub: "Standard Entry" },
  { value: "6", label: "₹6+ LPA", sub: "Industry Avg" },
  { value: "8", label: "₹8+ LPA", sub: "Above Avg" },
  { value: "10", label: "₹10+ LPA", sub: "High Growth" },
  { value: "12", label: "₹12+ LPA", sub: "Premium Tier" },
  { value: "15", label: "₹15+ LPA", sub: "Product / Top Tech" },
  { value: "20", label: "₹20+ LPA", sub: "Elite Tier-1" },
  { value: "25", label: "₹25+ LPA", sub: "Apex CTC" },
];

const DOMAIN_COURSE_PRESETS: Record<string, string[]> = {
  "Engineering & Technology": [
    "Computer Science",
    "AI & Data Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Biotechnology",
  ],
  "Management & Business": [
    "MBA / Business Admin",
    "Finance",
    "Marketing",
    "Business Analytics",
    "Human Resource Management",
    "Operations Management",
  ],
  "Medicine & Healthcare": [
    "MBBS",
    "B.Pharm (Pharmacy)",
    "BDS (Dental)",
    "Nursing",
    "Physiotherapy",
    "Allied Health Sciences",
  ],
  "Arts & Science / General": [
    "B.Sc Computer Science",
    "B.Sc Mathematics",
    "B.Sc Physics",
    "B.Com (Finance)",
    "B.A Economics",
    "BCA",
  ],
  "Law & Legal Studies": [
    "BA LLB",
    "BBA LLB",
    "Corporate Law",
    "Constitutional Law",
  ],
  "Architecture & Design": [
    "B.Arch",
    "Interior Design",
    "Product Design",
    "Urban Planning",
  ],
  "Agriculture & Life Sciences": [
    "B.Sc Agriculture",
    "Horticulture",
    "Food Technology",
    "Agricultural Engineering",
  ],
};

const INDIAN_STATES = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Telangana",
  "Uttar Pradesh",
  "Gujarat",
  "Kerala",
  "Andhra Pradesh",
  "West Bengal",
  "Punjab",
  "Rajasthan",
  "Madhya Pradesh",
  "Haryana",
  "Bihar",
  "Odisha",
  "Assam",
  "Uttarakhand",
  "Goa",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Chhattisgarh",
  "Chandigarh",
  "Puducherry",
  "Tripura",
  "Meghalaya",
  "Manipur",
  "Arunachal Pradesh",
  "Sikkim",
  "Andaman and Nicobar Islands",
];

export default function Colleges() {
  const [activeTab, setActiveTab] = useState<"best" | "budget" | "placement" | "location" | "catalog">("best");
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const [savedIds, setSavedIds] = useState<Set<number | string>>(new Set());
  const [selectedCollegeDetail, setSelectedCollegeDetail] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Preference Form Inputs (Focused on Career Targets, Budget & Desired CTC)
  const [formData, setFormData] = useState({
    domain: "Engineering & Technology",
    desired_course: "Computer Science",
    desired_ctc: "", // default: no CTC filter
    annual_budget: "200000",
    preferred_state: "Tamil Nadu",
    preferred_city: "",
    government_private_preference: "no_preference",
    hostel_required: true,
  });

  const [resultLimit, setResultLimit] = useState<number>(10);

  // Catalog Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("");
  const [selectedInstTypeFilter, setSelectedInstTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("fees_asc");

  // Load recommendations and saved colleges on mount
  useEffect(() => {
    fetchRecommendations();
    fetchSavedColleges();
  }, []);

  const fetchRecommendations = async (overrideForm?: any) => {
    setLoading(true);
    try {
      const activeForm = overrideForm || formData;
      const ctcRaw = activeForm.desired_ctc;
      const ctcNum = ctcRaw && ctcRaw !== "any" && ctcRaw !== "all" && ctcRaw !== "" ? Number(ctcRaw) : undefined;
      const courseRaw = (activeForm.desired_course || "").trim();
      const courseVal = courseRaw.toLowerCase() === "any" || courseRaw.toLowerCase() === "all" ? "" : courseRaw;

      const payload = {
        ...activeForm,
        desired_course: courseVal,
        desired_ctc: ctcNum,
        placement_average_ctc: ctcNum,
        annual_budget: Number(activeForm.annual_budget) || 200000,
        limit: resultLimit,
      };
      const data = await api.recommendColleges(payload);
      setRecommendations(data);
    } catch (err) {
      console.error("Failed to load recommendations:", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchSavedColleges = async () => {
    try {
      const saved = await api.getSavedColleges();
      if (Array.isArray(saved)) {
        setSavedIds(new Set(saved.map((s: any) => s.id)));
      }
    } catch {
      /* user may be unauthenticated */
    }
  };

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        search: searchQuery,
        domain: selectedDomainFilter,
        state: selectedStateFilter,
        institution_type: selectedInstTypeFilter,
        sort_by: sortBy,
        limit: 50,
      };
      const res = await api.listColleges(params);
      if (res && res.items) {
        setCatalogItems(res.items);
      }
    } catch (err) {
      console.error("Failed to load catalog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "catalog") {
      fetchCatalog();
    }
  }, [activeTab, searchQuery, selectedDomainFilter, selectedStateFilter, selectedInstTypeFilter, sortBy]);

  const handleToggleSave = async (collegeId: number) => {
    const isSaved = savedIds.has(collegeId);
    try {
      if (isSaved) {
        await api.unsaveCollege(collegeId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(collegeId);
          return next;
        });
      } else {
        await api.saveCollege(collegeId);
        setSavedIds((prev) => new Set(prev).add(collegeId));
      }
    } catch (err) {
      console.error("Failed to update saved college:", err);
    }
  };

  const handleOpenDetail = async (collegeId: number) => {
    try {
      const data = await api.getCollege(collegeId);
      setSelectedCollegeDetail(data);
      setDetailModalOpen(true);
    } catch (err) {
      console.error("Failed to get college details:", err);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecommendations();
  };

  const renderCollegeCard = (item: CollegeRecommendationItem | any, idx: number) => {
    const collegeId = item.college_id || item.id;
    const isSaved = savedIds.has(collegeId);
    const score = item.match_score || 85.0;
    const tier = item.match_level || "Best Match";

    return (
      <div
        key={collegeId || idx}
        className="card card-hover flex flex-col justify-between overflow-hidden border-slate-200/80 bg-white p-0 shadow-sm rounded-2xl hover:shadow-md transition-all"
      >
        {/* Card Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/40">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">{item.college_name || item.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                  <span className="capitalize px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">{item.institution_type}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location || `${item.city}, ${item.state}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleToggleSave(collegeId)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-white text-slate-400 border-slate-200 hover:text-slate-600"
              }`}
              title={isSaved ? "Saved" : "Save College"}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
            </button>
          </div>

          {/* Score & Tier Header Row */}
          <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${TIER_BADGES[tier] || TIER_BADGES["Best Match"]}`}>
                {tier}
              </span>
              {item.nirf_rank && (
                <span className="px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> NIRF #{item.nirf_rank}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Match</span>
              <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-sm">
                {score}%
              </div>
            </div>
          </div>
        </div>

        {/* Card Body - Key Metrics */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 font-medium mb-0.5">Annual Fee</div>
              <div className="font-bold text-slate-900 text-sm">
                {(() => {
                  const min = item.annual_fee_min_inr;
                  const max = item.annual_fee_max_inr || item.annual_fee_inr;
                  if (min && max && min !== max) {
                    return `₹${(min / 1000).toFixed(0)}k - ₹${(max / 1000).toFixed(0)}k`;
                  }
                  const fee = max || min || 50000;
                  return `₹${(fee / 1000).toFixed(0)}k`;
                })()}{" "}
                <span className="text-[10px] text-slate-400 font-normal">/yr</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 font-medium mb-0.5">Avg Package</div>
              <div className="font-bold text-slate-900 text-sm">
                ₹{item.average_package_lpa || item.avg_package_lpa || 4.0} LPA
              </div>
            </div>
          </div>

          {/* Badges Bar */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {item.budget_fit_status && (
              <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${BUDGET_STATUS_BADGES[item.budget_fit_status] || "bg-slate-100 text-slate-600"}`}>
                {item.budget_fit_status === "Within Budget" ? "✓ Within Budget" : item.budget_fit_status}
              </span>
            )}
            {item.ctc_fit_status ? (
              <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${
                item.ctc_fit_status.includes("Exceeds") || item.ctc_fit_status.includes("Met")
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : item.ctc_fit_status.includes("Near")
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}>
                🎯 {item.ctc_fit_status}
              </span>
            ) : item.eligibility_status && (
              <span className="px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200 text-[11px] font-semibold">
                ✓ {item.eligibility_status}
              </span>
            )}
            {item.verification_status && (
              <span
                className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${
                  item.verification_status === "Verified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {item.verification_status === "Verified" ? "✓ Verified Data" : "⚡ Estimated Data"}
              </span>
            )}
          </div>

          {/* Why it matches list */}
          {item.why_fit && item.why_fit.length > 0 && (
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs">
              <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Why this matches you
              </div>
              <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                {item.why_fit.slice(0, 2).map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tradeoffs list */}
          {item.tradeoffs && item.tradeoffs.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs">
              <div className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Key Considerations
              </div>
              <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                {item.tradeoffs.slice(0, 1).map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
          <button
            onClick={() => handleOpenDetail(collegeId)}
            className="w-full btn-secondary text-xs py-2.5 flex items-center justify-center gap-1.5 font-semibold text-slate-700 hover:text-indigo-600"
          >
            View Details & Courses <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:items-center text-center max-w-3xl mx-auto space-y-4 mb-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-heading">
          College Recommendation Engine
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Deterministic multi-factor matching across <strong className="text-indigo-600 font-semibold">1,475 Curated Indian Colleges</strong> based on your academic profile, budget, location preferences, and career targets.
        </p>
      </div>

      {/* Preferences Form Collapsible / Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 font-heading">Student Preference & Recommendation Profile</h2>
          </div>
          <button
            onClick={() => fetchRecommendations()}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 text-indigo-600 hover:bg-indigo-50 border-indigo-200"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-calculate Match Scores
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
          {/* Top Row: Stream, Budget, State, Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Stream / Domain</label>
              <select
                value={formData.domain}
                onChange={(e) => {
                  const updated = {
                    ...formData,
                    domain: e.target.value,
                    desired_course: "",
                  };
                  setFormData(updated);
                  fetchRecommendations(updated);
                }}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200 font-medium"
              >
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Arts & Science / General">Arts & Science / General</option>
                <option value="Multidisciplinary University">Multidisciplinary University</option>
                <option value="Management & Business">Management & Business</option>
                <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Law & Legal Studies">Law & Legal Studies</option>
                <option value="Agriculture & Life Sciences">Agriculture & Life Sciences</option>
                <option value="Architecture & Design">Architecture & Design</option>
                <option value="Dental & Oral Health">Dental & Oral Health</option>
                <option value="Education & Teaching">Education & Teaching</option>
                <option value="Pure Science & Research">Pure Science & Research</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Annual Budget (INR)</label>
              <select
                value={formData.annual_budget}
                onChange={(e) => {
                  const updated = { ...formData, annual_budget: e.target.value };
                  setFormData(updated);
                  fetchRecommendations(updated);
                }}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200"
              >
                <option value="50000">Up to ₹50,000 / year</option>
                <option value="100000">Up to ₹1,00,000 / year</option>
                <option value="200000">Up to ₹2,00,000 / year</option>
                <option value="350000">Up to ₹3,50,000 / year</option>
                <option value="500000">Up to ₹5,00,000 / year</option>
                <option value="1000000">₹10,00,000+ / year</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred State</label>
              <select
                value={formData.preferred_state}
                onChange={(e) => {
                  const updated = { ...formData, preferred_state: e.target.value };
                  setFormData(updated);
                  fetchRecommendations(updated);
                }}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200 font-medium"
              >
                <option value="">All India (No State Filter)</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Govt vs Private Preference</label>
              <select
                value={formData.government_private_preference}
                onChange={(e) => {
                  const updated = { ...formData, government_private_preference: e.target.value };
                  setFormData(updated);
                  fetchRecommendations(updated);
                }}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200"
              >
                <option value="no_preference">No Preference (Fair Evaluation)</option>
                <option value="government">Government Institutes Preferred</option>
                <option value="private">Private / Deemed Universities Preferred</option>
              </select>
            </div>
          </div>

          {/* Desired Placement CTC (Average Package) - Chip Selection */}
          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Desired Placement CTC (Average Package)
              </label>
              <span className="text-[11px] text-indigo-600 font-medium">
                {formData.desired_ctc ? `Filter: ₹${formData.desired_ctc}+ LPA` : "No CTC Filter Applied"}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {CTC_CHIP_OPTIONS.map((opt) => {
                const isSelected = formData.desired_ctc === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      const updated = { ...formData, desired_ctc: opt.value };
                      setFormData(updated);
                      fetchRecommendations(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-sm shadow-indigo-200 ring-2 ring-indigo-300"
                        : "bg-white text-slate-700 hover:bg-indigo-50/70 border-slate-200"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desired Course / Branch - Chip Selection + Custom Input */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Desired Course / Branch
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {formData.desired_course ? `Selected: ${formData.desired_course}` : "All Branches Evaluated"}
              </span>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const updated = { ...formData, desired_course: "" };
                  setFormData(updated);
                  fetchRecommendations(updated);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  !formData.desired_course
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {!formData.desired_course && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                <span>✨ Any Course / All Branches</span>
              </button>

              {(DOMAIN_COURSE_PRESETS[formData.domain] || DOMAIN_COURSE_PRESETS["Engineering & Technology"]).map((courseName) => {
                const isSelected = formData.desired_course.toLowerCase() === courseName.toLowerCase();
                return (
                  <button
                    key={courseName}
                    type="button"
                    onClick={() => {
                      const updated = { ...formData, desired_course: courseName };
                      setFormData(updated);
                      fetchRecommendations(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200"
                        : "bg-white text-slate-700 hover:bg-indigo-50 border-slate-200"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>{courseName}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Branch Search Input */}
            <div className="relative pt-1">
              <input
                type="text"
                value={formData.desired_course}
                onChange={(e) => {
                  const updated = { ...formData, desired_course: e.target.value };
                  setFormData(updated);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fetchRecommendations();
                  }
                }}
                className="w-full pl-3 pr-8 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200 text-xs"
                placeholder="Or type custom course / specialization (e.g. Cyber Security, Robotics, Aviation)..."
              />
              {formData.desired_course && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...formData, desired_course: "" };
                    setFormData(updated);
                    fetchRecommendations(updated);
                  }}
                  className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Clear course selection"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 btn-primary py-2.5 text-xs flex items-center justify-center gap-2 font-bold shadow-md shadow-indigo-100"
            >
              <Sparkles className="w-4 h-4" /> Get Recommendations
            </button>
          </div>
        </form>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("best")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === "best"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" /> Best Overall Matches
          </button>

          <button
            onClick={() => setActiveTab("budget")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === "budget"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <DollarSign className="w-4 h-4" /> Best Budget Fits
          </button>

          <button
            onClick={() => setActiveTab("placement")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === "placement"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Top Placement & ROI
          </button>

          <button
            onClick={() => setActiveTab("location")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === "location"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <MapPin className="w-4 h-4" /> Location Matches
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === "catalog"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Search className="w-4 h-4" /> Search All 1,475 Colleges
          </button>
        </div>
      </div>

      {/* Catalog Search Controls (Only shown when Catalog tab is active) */}
      {activeTab === "catalog" && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search college, city, course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-xl bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                value={selectedDomainFilter}
                onChange={(e) => setSelectedDomainFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-white border-slate-200 font-medium"
              >
                <option value="">All 12 Disciplines</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Arts & Science / General">Arts & Science / General</option>
                <option value="Multidisciplinary University">Multidisciplinary University</option>
                <option value="Management & Business">Management & Business</option>
                <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Law & Legal Studies">Law & Legal Studies</option>
                <option value="Agriculture & Life Sciences">Agriculture & Life Sciences</option>
                <option value="Architecture & Design">Architecture & Design</option>
                <option value="Dental & Oral Health">Dental & Oral Health</option>
                <option value="Education & Teaching">Education & Teaching</option>
                <option value="Pure Science & Research">Pure Science & Research</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Filter by State (e.g. Tamil Nadu)..."
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-white border-slate-200"
              />
            </div>

            <div>
              <select
                value={selectedInstTypeFilter}
                onChange={(e) => setSelectedInstTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-white border-slate-200 font-medium"
              >
                <option value="">All Institution Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="deemed">Deemed University</option>
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-white border-slate-200 font-semibold"
              >
                <option value="fees_asc">Sort: Lowest Fees First</option>
                <option value="fees_desc">Sort: Highest Fees First</option>
                <option value="placement_desc">Sort: Highest Placement Rate</option>
                <option value="avg_package_desc">Sort: Highest Avg Package</option>
                <option value="rating_desc">Sort: Highest Selection Score</option>
                <option value="name_asc">Sort: Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Content Area */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-slate-200/60 rounded-2xl"></div>
          ))}
        </div>
      ) : activeTab === "catalog" ? (
        <div>
          <div className="text-xs text-slate-500 mb-4 font-semibold">
            Showing {catalogItems.length} colleges matching your search criteria
          </div>
          {catalogItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No colleges found</h3>
              <p className="text-slate-500 text-xs mt-1">Try resetting search filters or keywords.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogItems.map((item, i) => renderCollegeCard(item, i))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {activeTab === "best" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Top {resultLimit} Best Overall Matches</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <span>Show:</span>
                    <select
                      value={resultLimit}
                      onChange={(e) => {
                        const lim = Number(e.target.value);
                        setResultLimit(lim);
                        fetchRecommendations({ ...formData, limit: lim });
                      }}
                      className="px-2 py-1 border rounded-lg bg-white border-slate-200 text-indigo-600 font-bold text-xs"
                    >
                      <option value={10}>Top 10 Colleges</option>
                      <option value={20}>Top 20 Colleges</option>
                      <option value={50}>Top 50 Colleges</option>
                    </select>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Evaluated 1,475 colleges</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations?.best_matches?.slice(0, resultLimit).map((item: any, i: number) => renderCollegeCard(item, i))}
              </div>
            </div>
          )}

          {activeTab === "budget" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Top {resultLimit} Colleges Within Annual Budget Threshold</h3>
                <span className="text-xs text-slate-500">Sorted by fee affordability</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations?.best_budget_fits?.slice(0, resultLimit).map((item: any, i: number) => renderCollegeCard(item, i))}
              </div>
            </div>
          )}

          {activeTab === "placement" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Top {resultLimit} Placement & Desired CTC ({formData.desired_ctc} LPA) Fits</h3>
                <span className="text-xs text-slate-500">Prioritizing verified CTC benchmarks</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations?.best_placement_roi?.slice(0, resultLimit).map((item: any, i: number) => renderCollegeCard(item, i))}
              </div>
            </div>
          )}


          {activeTab === "location" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Top {resultLimit} Colleges Located in {formData.preferred_state || "Preferred Location"}</h3>
                <span className="text-xs text-slate-500">Regional proximity prioritized</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations?.location_matches?.slice(0, resultLimit).map((item: any, i: number) => renderCollegeCard(item, i))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {detailModalOpen && selectedCollegeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setDetailModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6 pr-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-xs capitalize">
                  {selectedCollegeDetail.institution_type} Institute
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-heading mt-1">{selectedCollegeDetail.name}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedCollegeDetail.city}, {selectedCollegeDetail.state}</span>
                  {selectedCollegeDetail.nirf_rank && (
                    <span className="ml-2 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      NIRF #{selectedCollegeDetail.nirf_rank}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-slate-400 font-medium">Annual Fee Range</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedCollegeDetail.annual_fee_min_inr && selectedCollegeDetail.annual_fee_max_inr && selectedCollegeDetail.annual_fee_min_inr !== selectedCollegeDetail.annual_fee_max_inr
                    ? `₹${(selectedCollegeDetail.annual_fee_min_inr / 1000).toFixed(0)}k - ₹${(selectedCollegeDetail.annual_fee_max_inr / 1000).toFixed(0)}k`
                    : `₹${((selectedCollegeDetail.annual_fee_max_inr || selectedCollegeDetail.annual_fee_inr || 50000) / 1000).toFixed(0)}k`}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-slate-400 font-medium">Avg Package</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  ₹{selectedCollegeDetail.avg_package_lpa || 4.0} LPA
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-slate-400 font-medium">Placement %</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedCollegeDetail.placement_rate_pct_est || 65}%
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-slate-400 font-medium">Hostel Facility</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedCollegeDetail.hostel_available ? "Available" : "Not Offered"}
                </div>
              </div>
            </div>

            {/* Detailed Info Sections */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <h4 className="font-bold text-indigo-900 text-sm mb-2">Admission Route & Eligibility</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                  <div><strong className="text-slate-900">Admission Route:</strong> {selectedCollegeDetail.common_admission_route}</div>
                  <div><strong className="text-slate-900">Domain Group:</strong> {selectedCollegeDetail.domain_group}</div>
                </div>
              </div>

              {/* Courses & Programs Offered */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Courses & Program Specializations Offered</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedCollegeDetail.programs && selectedCollegeDetail.programs.length > 0 ? (
                    selectedCollegeDetail.programs.map((p: any, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{p.branch}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Category: {p.course_category || "Regular"} • Intake: {p.approved_intake || "N/A"} seats
                          </div>
                        </div>
                        {p.accredited && (
                          <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            {p.accredited}
                          </span>
                        )}
                      </div>
                    ))
                  ) : selectedCollegeDetail.courses && selectedCollegeDetail.courses.length > 0 ? (
                    selectedCollegeDetail.courses.map((c: any, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{c.course}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Level: {c.degree_level} • Entrance: {c.entrance_exam || "Merit"}
                          </div>
                        </div>
                        <div className="text-slate-900 font-bold">
                          ₹{((c.annual_fees_inr || 50000) / 1000).toFixed(0)}k/yr
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-slate-500 bg-slate-50 rounded-xl">Standard degree programs offered in {selectedCollegeDetail.domain_group}</div>
                  )}
                </div>
              </div>

              {/* Data Verification Footer */}
              <div className="p-3 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-between text-[11px]">
                <span>Data Source Provider: {selectedCollegeDetail.source_provider}</span>
                <span>Verification Status: {selectedCollegeDetail.verification_status}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              {selectedCollegeDetail.website ? (
                <a
                  href={selectedCollegeDetail.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  Visit Official Website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div></div>
              )}
              <button onClick={() => setDetailModalOpen(false)} className="btn-secondary text-xs py-2 px-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
