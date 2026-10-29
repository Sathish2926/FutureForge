import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { 
  Award, Sparkles, Search, BookmarkCheck, 
  HelpCircle, Shield, CheckCircle2, AlertCircle, RefreshCw, 
  Layers, PlusCircle, ArrowRight, UserCheck, Calendar, Clock,
  FileQuestion, ExternalLink, ChevronRight, Filter, AlertTriangle
} from "lucide-react";
import { api } from "../api/client";

import ScholarshipCard from "../components/scholarships/ScholarshipCard";
import ScholarshipProfileForm from "../components/scholarships/ScholarshipProfileForm";
import ScholarshipDetailsModal from "../components/scholarships/ScholarshipDetailsModal";
import ApplicationTracker from "../components/scholarships/ApplicationTracker";
import ScholarshipAICopilot from "../components/scholarships/ScholarshipAICopilot";
import ScholarshipAdminView from "../components/scholarships/ScholarshipAdminView";

export default function Scholarships() {
  const [activeTab, setActiveTab] = useState<"matches" | "profile" | "tracker" | "catalog" | "admin">("matches");
  const [profileFormStep, setProfileFormStep] = useState<number>(1);
  
  // Data states
  const [recData, setRecData] = useState<any>(null);
  const [catalog, setCatalog] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [hasCompletedProfile, setHasCompletedProfile] = useState<boolean>(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardSection, setDashboardSection] = useState<"all" | "eligible" | "potentially" | "open" | "upcoming">("all");

  // Modals & Assistant
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [modalDefaultTab, setModalDefaultTab] = useState("overview");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotSch, setCopilotSch] = useState<{ id?: number; name?: string }>({});

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [recs, profResp, saved, allSchs] = await Promise.all([
        api.recommendScholarships().catch(() => null),
        api.getScholarshipProfile().catch(() => null),
        api.getSavedScholarships().catch(() => []),
        api.listScholarships().catch(() => [])
      ]);
      setRecData(recs);
      setProfileData(profResp?.profile || null);
      setHasCompletedProfile(Boolean(profResp?.has_completed_scholarship_profile));
      setSavedItems(saved || []);
      setCatalog(allSchs || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveProfile = async (newProfile: any) => {
    await api.saveScholarshipProfile(newProfile);
    setProfileData(newProfile);
    setHasCompletedProfile(true);
    // Reload recommendations with fresh profile data
    const recs = await api.recommendScholarships();
    setRecData(recs);
  };

  const handleSaveScholarship = async (scholarshipId: number) => {
    try {
      await api.updateSavedScholarship(scholarshipId, { status: "saved" });
      const updated = await api.getSavedScholarships();
      setSavedItems(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTracking = async (scholarshipId: number, payload: any) => {
    await api.updateSavedScholarship(scholarshipId, payload);
    const updated = await api.getSavedScholarships();
    setSavedItems(updated);
  };

  const handleRemoveSaved = async (scholarshipId: number) => {
    await api.unsaveScholarship(scholarshipId);
    setSavedItems((prev) => prev.filter((i) => i.scholarship_id !== scholarshipId));
  };

  const handleOpenDetails = (scholarship: any, tab: string = "overview") => {
    setSelectedScholarship(scholarship);
    setModalDefaultTab(tab);

    // Look up evaluation if in recData
    const matchItem = recData?.results?.find((r: any) => r.scholarship.id === scholarship.id);
    setSelectedEvaluation(matchItem || null);
  };

  const handleOpenCopilot = (schId?: number, schName?: string) => {
    setCopilotSch({ id: schId, name: schName });
    setCopilotOpen(true);
  };

  const handleJumpToProfileStep = (stepNumber: number) => {
    setProfileFormStep(stepNumber);
    setActiveTab("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Partition recommendations into structured sections
  const allResults = recData?.results || [];
  
  // Filter by search query if typed
  const searchFiltered = allResults.filter((item: any) => {
    if (!searchTerm) return true;
    const s = item.scholarship;
    const q = searchTerm.toLowerCase();
    const corpus = `${s.name} ${s.provider} ${s.description || ""} ${s.eligible_courses || ""}`.toLowerCase();
    return corpus.includes(q);
  });

  const eligibleItems = searchFiltered.filter((i: any) => i.eligibility_status === "ELIGIBLE");
  const potentiallyEligibleItems = searchFiltered.filter((i: any) => i.eligibility_status === "POTENTIALLY_ELIGIBLE");
  const openApplications = searchFiltered.filter((i: any) => i.application_period_status === "OPEN");
  const upcomingOpportunities = searchFiltered.filter((i: any) => i.application_period_status === "UPCOMING");
  const unverifiedOpportunities = searchFiltered.filter((i: any) => i.eligibility_status === "UNVERIFIED");

  const savedScholarshipIds = new Set(savedItems.map((i) => i.scholarship_id));

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:items-center text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-brand-600" />
          Verified Indian & Tamil Nadu Schemes
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-heading leading-tight">
          Find Scholarships That Fit Your Journey
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
          Tell us about your education and circumstances. FutureForge will check your profile against 
          scholarship requirements and help you discover suitable opportunities.
        </p>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex justify-center border-b border-slate-200/80">
        <div className="flex overflow-x-auto gap-2 p-1 bg-slate-100/80 rounded-2xl">
          {[
            { id: "matches", label: "Personalized Results", icon: Sparkles, count: hasCompletedProfile ? eligibleItems.length : undefined },
            { id: "profile", label: "My Eligibility Profile", icon: UserCheck },
            { id: "tracker", label: "Saved & Tracked", icon: BookmarkCheck, count: savedItems.length },
            { id: "catalog", label: "Explore Scholarships", icon: Layers, count: catalog.length },
            { id: "admin", label: "Audit & Curation", icon: Shield },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap ${
                activeTab === t.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
              {t.count !== undefined && t.count > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === t.id ? "bg-brand-50 text-brand-700" : "bg-slate-200 text-slate-700"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: MATCHES & DASHBOARD (OR ONBOARDING LANDING IF NOT COMPLETED) */}
      {/* =================================================================== */}
      {activeTab === "matches" && (
        <div className="space-y-8">
          {/* LANDING SECTION (Displayed when user has not yet completed their profile) */}
          {!hasCompletedProfile ? (
            <div className="bg-gradient-to-br from-white via-brand-50/20 to-emerald-50/20 rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-brand-500 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-heading">
                  Find Scholarships That Fit Your Journey
                </h2>
                <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Tell us about your education and circumstances. FutureForge will check your profile against 
                  scholarship requirements and help you discover suitable opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileFormStep(1);
                    setActiveTab("profile");
                  }}
                  className="btn-primary py-3.5 px-8 text-sm flex items-center justify-center gap-2.5 w-full sm:w-auto shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Find My Scholarships</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("catalog")}
                  className="btn-secondary py-3.5 px-8 text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Explore Scholarships</span>
                </button>
              </div>

              {/* Informative Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 text-left">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-800">1. Deterministic Engine</div>
                  <div className="text-[11px] text-slate-500">Evaluates actual criteria (income, CGPA, domicile) without guessing.</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-800">2. Tamil Nadu & Central</div>
                  <div className="text-[11px] text-slate-500">Covers Pudhumai Penn, Tamil Pudhalvan, NSP, and AICTE grants.</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-1">
                  <div className="text-xs font-bold text-slate-800">3. Verified Official Links</div>
                  <div className="text-[11px] text-slate-500">Directs exclusively to authorized government and provider portals.</div>
                </div>
              </div>
            </div>
          ) : (
            /* COMPLETED PROFILE DASHBOARD */
            <div className="space-y-8">
              {/* Dashboard Summary: Separate, Uncombined Counters (Spec §8) */}
              {recData?.summary && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div 
                    onClick={() => setDashboardSection("eligible")}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      dashboardSection === "eligible" ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200" : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                      Eligible Scholarships
                    </span>
                    <div className="text-2xl font-bold text-emerald-900 font-heading">
                      {recData.summary.eligible_count}
                    </div>
                    <span className="text-[11px] text-slate-400">All rules verified</span>
                  </div>

                  <div 
                    onClick={() => setDashboardSection("potentially")}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      dashboardSection === "potentially" ? "bg-amber-50 border-amber-300 ring-2 ring-amber-200" : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                      Potentially Eligible
                    </span>
                    <div className="text-2xl font-bold text-amber-900 font-heading">
                      {recData.summary.potentially_eligible_count}
                    </div>
                    <span className="text-[11px] text-slate-400">Known details match</span>
                  </div>

                  <div 
                    onClick={() => handleJumpToProfileStep(4)}
                    className="p-4 rounded-2xl border bg-white border-slate-200/80 hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                      Additional Info Needed
                    </span>
                    <div className="text-2xl font-bold text-indigo-900 font-heading">
                      {potentiallyEligibleItems.reduce((acc: number, item: any) => acc + (item.missing_requirements?.length || 0), 0)}
                    </div>
                    <span className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
                      Complete profile <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div 
                    onClick={() => setDashboardSection("open")}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      dashboardSection === "open" ? "bg-brand-50 border-brand-300 ring-2 ring-brand-200" : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 block mb-1">
                      Applications Open
                    </span>
                    <div className="text-2xl font-bold text-brand-900 font-heading">
                      {recData.summary.open_count}
                    </div>
                    <span className="text-[11px] text-slate-400">Confirmed open</span>
                  </div>

                  <div 
                    onClick={() => setDashboardSection("upcoming")}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      dashboardSection === "upcoming" ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200" : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                      Upcoming Opportunities
                    </span>
                    <div className="text-2xl font-bold text-blue-900 font-heading">
                      {recData.summary.upcoming_count}
                    </div>
                    <span className="text-[11px] text-slate-400">Published cycle</span>
                  </div>

                  <div className="p-4 rounded-2xl border bg-white border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                      Needs Verification
                    </span>
                    <div className="text-2xl font-bold text-slate-700 font-heading">
                      {recData.summary.unverified_count}
                    </div>
                    <span className="text-[11px] text-slate-400">Awaiting official circular</span>
                  </div>
                </div>
              )}

              {/* Search & Quick Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search your matches by name, course..."
                    className="input-field text-xs pl-10 py-2.5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {[
                    { id: "all", label: "All Recommended" },
                    { id: "eligible", label: `Best Matches (${eligibleItems.length})` },
                    { id: "potentially", label: `You May Qualify (${potentiallyEligibleItems.length})` },
                    { id: "open", label: `Applications Open (${openApplications.length})` },
                    { id: "upcoming", label: `Upcoming (${upcomingOpportunities.length})` },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setDashboardSection(filter.id as any)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition ${
                        dashboardSection === filter.id
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileFormStep(1);
                      setActiveTab("profile");
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* SECTION A: BEST MATCHES FOR YOU (Confirmed Eligible) */}
              {(dashboardSection === "all" || dashboardSection === "eligible") && eligibleItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <h3 className="text-lg font-bold text-slate-900 font-heading">
                        Section A: Best Matches for You
                      </h3>
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                        {eligibleItems.length} Confirmed Eligible
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">Ranked by rule suitability</span>
                  </div>

                  <div className="space-y-4">
                    {eligibleItems.map((item: any) => (
                      <ScholarshipCard
                        key={item.scholarship.id}
                        scholarship={item.scholarship}
                        eligibilityStatus={item.eligibility_status}
                        applicationPeriodStatus={item.application_period_status}
                        applicationPeriodLabel={item.application_period_label}
                        matchScore={item.match_score}
                        breakdown={item.breakdown}
                        matchingReasons={item.matching_reasons}
                        failedReasons={item.failed_reasons}
                        missingRequirements={item.missing_requirements}
                        onViewDetails={handleOpenDetails}
                        onSave={handleSaveScholarship}
                        isSaved={savedScholarshipIds.has(item.scholarship.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION B: YOU MAY QUALIFY (Potentially Eligible with Missing Detail Action) */}
              {(dashboardSection === "all" || dashboardSection === "potentially") && potentiallyEligibleItems.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <h3 className="text-lg font-bold text-slate-900 font-heading">
                        Section B: You May Qualify
                      </h3>
                      <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-100">
                        {potentiallyEligibleItems.length} Schemes Awaiting Confirmation
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">Supply details to confirm</span>
                  </div>

                  <div className="space-y-4">
                    {potentiallyEligibleItems.map((item: any) => (
                      <div key={item.scholarship.id} className="space-y-2">
                        {/* Callout of exact missing details */}
                        {item.missing_requirements && item.missing_requirements.length > 0 && (
                          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
                            <div className="flex items-center gap-2">
                              <FileQuestion className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>
                                <strong>Action Needed for {item.scholarship.name}:</strong>{" "}
                                {item.missing_requirements.join(" • ")}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const firstMissing = item.missing_requirements[0] || "";
                                if (firstMissing.toLowerCase().includes("domicile")) handleJumpToProfileStep(4);
                                else if (firstMissing.toLowerCase().includes("income")) handleJumpToProfileStep(3);
                                else if (firstMissing.toLowerCase().includes("community") || firstMissing.toLowerCase().includes("category")) handleJumpToProfileStep(5);
                                else handleJumpToProfileStep(2);
                              }}
                              className="btn-secondary text-[11px] py-1 px-3 self-start sm:self-auto shrink-0 bg-white border-amber-200 hover:bg-amber-100/50"
                            >
                              Supply Detail →
                            </button>
                          </div>
                        )}

                        <ScholarshipCard
                          scholarship={item.scholarship}
                          eligibilityStatus={item.eligibility_status}
                          applicationPeriodStatus={item.application_period_status}
                          applicationPeriodLabel={item.application_period_label}
                          matchScore={item.match_score}
                          breakdown={item.breakdown}
                          matchingReasons={item.matching_reasons}
                          failedReasons={item.failed_reasons}
                          missingRequirements={item.missing_requirements}
                          onViewDetails={handleOpenDetails}
                          onSave={handleSaveScholarship}
                          isSaved={savedScholarshipIds.has(item.scholarship.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION C: APPLICATIONS OPEN */}
              {dashboardSection === "open" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                    <Clock className="w-4 h-4 text-brand-600" />
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Section C: Applications Open
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {openApplications.map((item: any) => (
                      <ScholarshipCard
                        key={item.scholarship.id}
                        scholarship={item.scholarship}
                        eligibilityStatus={item.eligibility_status}
                        applicationPeriodStatus={item.application_period_status}
                        applicationPeriodLabel={item.application_period_label}
                        matchScore={item.match_score}
                        breakdown={item.breakdown}
                        matchingReasons={item.matching_reasons}
                        failedReasons={item.failed_reasons}
                        missingRequirements={item.missing_requirements}
                        onViewDetails={handleOpenDetails}
                        onSave={handleSaveScholarship}
                        isSaved={savedScholarshipIds.has(item.scholarship.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION D: UPCOMING OPPORTUNITIES */}
              {dashboardSection === "upcoming" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Section D: Upcoming Opportunities
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {upcomingOpportunities.map((item: any) => (
                      <ScholarshipCard
                        key={item.scholarship.id}
                        scholarship={item.scholarship}
                        eligibilityStatus={item.eligibility_status}
                        applicationPeriodStatus={item.application_period_status}
                        applicationPeriodLabel={item.application_period_label}
                        matchScore={item.match_score}
                        breakdown={item.breakdown}
                        matchingReasons={item.matching_reasons}
                        failedReasons={item.failed_reasons}
                        missingRequirements={item.missing_requirements}
                        onViewDetails={handleOpenDetails}
                        onSave={handleSaveScholarship}
                        isSaved={savedScholarshipIds.has(item.scholarship.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION F: NO MATCHES YET (Honest Fallback) */}
              {eligibleItems.length === 0 && potentiallyEligibleItems.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Section F: No Matches Yet</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Based on your verified criteria, no active schemes currently match your specific education level, 
                    course, or income limit. We never fabricate results to fill your dashboard.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleJumpToProfileStep(1)}
                      className="btn-primary text-xs py-2.5 px-6"
                    >
                      Review & Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("catalog")}
                      className="btn-secondary text-xs py-2.5 px-6"
                    >
                      Browse General Directory
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: PROFILE COLLECTION FLOW (6 STEPS)                           */}
      {/* =================================================================== */}
      {activeTab === "profile" && (
        <div className="max-w-3xl mx-auto">
          <ScholarshipProfileForm
            initialData={profileData}
            initialStep={profileFormStep}
            onSave={handleSaveProfile}
            onComplete={() => {
              setActiveTab("matches");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: APPLICATION TRACKER (SECTION E: SAVED SCHOLARSHIPS)         */}
      {/* =================================================================== */}
      {activeTab === "tracker" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-slate-200/80 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Section E: Saved Scholarships & Application Tracker
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Track your real progress across document verification, portal submissions, and scholarship awards.
            </p>
          </div>

          <ApplicationTracker
            items={savedItems}
            onUpdateStatus={handleUpdateTracking}
            onRemove={handleRemoveSaved}
            onViewDetails={(id) => {
              const sch = catalog.find((s) => s.id === id) || allResults.find((r: any) => r.scholarship.id === id)?.scholarship;
              if (sch) handleOpenDetails(sch);
            }}
          />
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: GENERAL DIRECTORY (EXPLORE SCHOLARSHIPS)                    */}
      {/* =================================================================== */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Informative Notice (Part 2 specification compliance) */}
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-start gap-3 text-xs text-brand-900">
            <Layers className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <strong>General Scheme Directory:</strong> You are currently browsing the complete catalog of 
              verified opportunities. This view does not perform personalized profile eligibility checks. 
              {!hasCompletedProfile && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileFormStep(1);
                    setActiveTab("profile");
                  }}
                  className="ml-2 font-bold text-brand-700 underline hover:text-brand-900"
                >
                  Complete your profile to unlock personalized matching →
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search across all Indian & Tamil Nadu schemes..."
                className="input-field text-xs pl-10 py-2.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Showing {catalog.length} verified schemes
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {catalog
              .filter((s) => {
                if (!searchTerm) return true;
                const q = searchTerm.toLowerCase();
                return `${s.name} ${s.provider} ${s.education_levels || ""}`.toLowerCase().includes(q);
              })
              .map((sch) => (
                <div key={sch.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                        {sch.provider_category || "GOVT"}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {sch.verification_status || "VERIFIED"}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 font-heading mb-1">{sch.name}</h4>
                    <p className="text-xs text-slate-500 mb-4">{sch.provider}</p>
                    <div className="text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                      {sch.benefit || sch.benefit_description}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(sch)}
                      className="btn-secondary text-xs py-2 px-3 flex-1 justify-center"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveScholarship(sch.id)}
                      className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition"
                      title="Save scholarship"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: ADMINISTRATION & AUDIT TRAIL                                */}
      {/* =================================================================== */}
      {activeTab === "admin" && (
        <div>
          <ScholarshipAdminView />
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          breakdown={selectedEvaluation?.breakdown || []}
          matchingReasons={selectedEvaluation?.matching_reasons || []}
          failedReasons={selectedEvaluation?.failed_reasons || []}
          eligibilityStatus={selectedEvaluation?.eligibility_status || "POTENTIALLY_ELIGIBLE"}
          onClose={() => setSelectedScholarship(null)}
          onSave={handleSaveScholarship}
          isSaved={savedScholarshipIds.has(selectedScholarship.id)}
          defaultTab={modalDefaultTab}
        />
      )}

      {/* FLOATING AI COPILOT BUTTON & DRAWER */}
      {copilotOpen ? (
        createPortal(
          <div className="fixed bottom-6 right-6 z-[90] w-[360px] sm:w-[420px] max-w-[calc(100vw-2rem)] shadow-2xl animate-fade-in">
            <ScholarshipAICopilot
              scholarshipId={copilotSch.id || selectedScholarship?.id || (recData?.results?.[0]?.scholarship?.id)}
              scholarshipName={copilotSch.name || selectedScholarship?.name || (recData?.results?.[0]?.scholarship?.name)}
              onClose={() => setCopilotOpen(false)}
            />
          </div>,
          document.body
        )
      ) : (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            type="button"
            onClick={() => handleOpenCopilot()}
            className="flex items-center gap-2.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white font-bold text-xs py-3.5 px-5 rounded-full shadow-lg hover:shadow-xl transition hover:scale-105 border border-white/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>Scholarship AI Assistant</span>
          </button>
        </div>
      )}
    </div>
  );
}
