import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Rocket,
  Landmark,
  Shuffle,
  Compass,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  ExternalLink,
  Bot,
  SlidersHorizontal,
  BookmarkCheck,
  Check,
  Circle,
  AlertTriangle,
  ArrowRight,
  Building,
  Target
} from "lucide-react";
import { Degree, DegreeStatus, UserDegreeRecord } from "../../data/degree_guidance/types";
import { DEGREES_DATA, getDegreeById } from "../../data/degree_guidance/degreesData";
import { DEGREE_FAMILIES } from "../../data/degree_guidance/degreeFamilies";
import { buildUniversalGuidance, CareerTypeLabel } from "../../data/degree_guidance/clusterAdapter";
import { normalizeDegreeQuery, synthesizeUnknownDegree } from "../../data/degree_guidance/degreeNormalization";
import UniversalDegreeSearch from "./UniversalDegreeSearch";
import GraduateAcademicProfile, { GraduateAcademicProfileData } from "./GraduateAcademicProfile";
import GraduateRoadmapView from "./GraduateRoadmapView";
import GraduateSkillLadder from "./GraduateSkillLadder";
import GraduateActionTemplates from "./GraduateActionTemplates";
import GraduateAiChat from "./GraduateAiChat";

export default function GraduateCareerNavigator() {
  const navigate = useNavigate();

  // 1. Degree Selection State
  const defaultDegree = useMemo(() => getDegreeById("bsc-cs") || DEGREES_DATA[0], []);
  const [selectedDegree, setSelectedDegree] = useState<Degree>(defaultDegree);
  const [isEditingDegree, setIsEditingDegree] = useState<boolean>(false);

  const handleAiSetDegree = (query: string) => {
    const norm = normalizeDegreeQuery(query);
    if (norm.primaryMatch) {
      setSelectedDegree(norm.primaryMatch);
      setIsEditingDegree(false);
    } else if (norm.suggestions.length > 0) {
      setSelectedDegree(norm.suggestions[0].degree);
      setIsEditingDegree(false);
    } else {
      const provisional = synthesizeUnknownDegree(query, norm.relatedFamilies[0]?.id);
      setSelectedDegree(provisional);
      setIsEditingDegree(false);
    }
  };

  // 2. Academic Profile State (Section 7)
  const [academicProfile, setAcademicProfile] = useState<GraduateAcademicProfileData>({
    status: "pursuing",
    completionYear: 2025,
    studyMode: "regular",
    specialization: "",
    university: "",
    category: "general"
  });

  // 3. Navigation Tabs
  const [activeMainTab, setActiveMainTab] = useState<
    "outcomes" | "roadmap" | "skills" | "templates" | "ai_chat"
  >("outcomes");

  // 4. Outcomes Filter
  const [outcomeFilter, setOutcomeFilter] = useState<
    "all" | "jobs" | "higher_ed" | "certs" | "entrepreneurship" | "govt" | "switch"
  >("all");

  // Convert profile to UserDegreeRecord for rule-engine resolution
  const userRecord: UserDegreeRecord = useMemo(() => ({
    degreeId: selectedDegree.id,
    status: academicProfile.status,
    yearOrSemester: academicProfile.yearOrSemester,
    completionYear: academicProfile.completionYear,
    mode: academicProfile.studyMode,
    marksPercent: academicProfile.marksPercent,
    category: academicProfile.category,
    specialization: academicProfile.specialization
  }), [selectedDegree, academicProfile]);

  // Unified Guidance Resolution
  const universalGuidance = useMemo(() => {
    return buildUniversalGuidance(selectedDegree, userRecord);
  }, [selectedDegree, userRecord]);

  const {
    family,
    cluster,
    enhancedJobs,
    enhancedGovt,
    enhancedHigherEd,
    enhancedCerts,
    enhancedSwitches,
    isProvisional
  } = universalGuidance;

  const handleSelectDegree = (deg: Degree) => {
    setSelectedDegree(deg);
    setIsEditingDegree(false);
  };

  const handleUpdateProfile = (updated: Partial<GraduateAcademicProfileData>) => {
    setAcademicProfile((prev) => ({ ...prev, ...updated }));
  };

  const getCareerBadgeColor = (type: CareerTypeLabel) => {
    switch (type) {
      case "Direct":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Related / Bridge":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "Regulated":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Advanced / Higher Study":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      default:
        return "bg-sky-50 text-sky-700 border-sky-200/80";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-16">
      {/* Top Hero Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md border border-white/15">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
            <span>Universal Degree Guidance Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Map Any Degree to Jobs, Master's & High-ROI Pathways
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Search or enter any undergraduate, postgraduate, or vocational qualification to unlock verified career tracks, rule-based government exams, and personalized action roadmaps on the same page.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs space-y-2 shrink-0 lg:w-72">
          <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
            Active Academic Anchor
          </span>
          <div className="font-bold text-sm text-white truncate">
            {selectedDegree.shortName}
          </div>
          <div className="text-[11px] text-slate-300 flex items-center justify-between">
            <span>Status: <span className="capitalize text-indigo-200 font-semibold">{academicProfile.status}</span></span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-semibold">
              {family.defaultLevel}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SEARCH-FIRST DEGREE INPUT (Sections 1 & 3) */}
      <UniversalDegreeSearch
        selectedDegree={selectedDegree}
        onSelectDegree={handleSelectDegree}
        isEditing={isEditingDegree}
        onStartEditing={() => setIsEditingDegree(true)}
        onCancelEditing={() => setIsEditingDegree(false)}
      />

      {/* SECTION 2: ACADEMIC PROFILE (Section 7) */}
      <GraduateAcademicProfile
        degree={selectedDegree}
        profile={academicProfile}
        onChangeProfile={handleUpdateProfile}
        onChangeDegree={() => setIsEditingDegree(true)}
      />

      {/* SECTION 3: DEGREE UNDERSTANDING (Section 8) */}
      <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-5 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              DEGREE UNDERSTANDING
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 font-heading">
              {family.name}
            </h3>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              {family.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 shrink-0">
            <span>Regulator: <strong className="text-slate-800">{selectedDegree.regulator}</strong></span>
            <span>•</span>
            <span>Duration: <strong className="text-slate-800">{selectedDegree.structure?.durationStandardYears || 3} Years</strong></span>
          </div>
        </div>

        {/* Provisional Banner if unknown degree */}
        {isProvisional && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Provisional Guidance State</span>
              <p className="leading-relaxed text-amber-800">
                "{selectedDegree.name}" was synthesized using the closest verified discipline framework ({family.name}). Official university curriculum and statutory recognition rules should be verified before applying.
              </p>
            </div>
          </div>
        )}

        {/* Commonly Developed Competencies */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Your degree commonly develops:
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedDegree.skillsGained.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-900 border border-indigo-100"
              >
                <Check className="w-3.5 h-3.5 text-indigo-600" />
                <span>{skill}</span>
              </span>
            ))}
            {selectedDegree.subjectsTaught.slice(0, 3).map((subj, idx) => (
              <span
                key={`subj-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200"
              >
                <span>{subj}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Status Advice Snippet */}
        {universalGuidance.resolved.currentSemesterAdvice && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5 max-w-2xl">
              <span className="font-bold text-slate-900">
                {universalGuidance.resolved.currentSemesterAdvice.title}
              </span>
              <p className="text-slate-600">
                {universalGuidance.resolved.currentSemesterAdvice.description}
              </p>
            </div>
            <div className="text-[11px] text-indigo-700 font-semibold bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shrink-0">
              {universalGuidance.resolved.currentSemesterAdvice.top3Actions[0]}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: FUTUREFORGE GUIDANCE MAIN NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-bold no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveMainTab("outcomes")}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeMainTab === "outcomes"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Decision Pathways & Outcomes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("roadmap")}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeMainTab === "roadmap"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>Step-by-Step Roadmaps</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("skills")}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeMainTab === "skills"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>3-Tier Skill Ladder</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("templates")}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeMainTab === "templates"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BookmarkCheck className="w-4 h-4 text-indigo-400" />
          <span>Action Templates & Checklists</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("ai_chat")}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeMainTab === "ai_chat"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>FutureForge AI Navigator</span>
        </button>
      </div>

      {/* TAB CONTENT 1: DECISION PATHWAYS & OUTCOMES */}
      {activeMainTab === "outcomes" && (
        <div className="space-y-6">
          {/* Dynamic Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold no-scrollbar">
            <button
              type="button"
              onClick={() => setOutcomeFilter("all")}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                outcomeFilter === "all"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Pathways
            </button>

            {enhancedJobs.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("jobs")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "jobs"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Jobs & Careers ({enhancedJobs.length})</span>
              </button>
            )}

            {enhancedHigherEd.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("higher_ed")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "higher_ed"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Higher Studies ({enhancedHigherEd.length})</span>
              </button>
            )}

            {enhancedCerts.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("certs")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "certs"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certifications ({enhancedCerts.length})</span>
              </button>
            )}

            {enhancedGovt.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("govt")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "govt"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Government & Public Sector ({enhancedGovt.length})</span>
              </button>
            )}

            {enhancedSwitches.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("switch")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "switch"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Career Switches ({enhancedSwitches.length})</span>
              </button>
            )}

            {cluster.entrepreneurship.length > 0 && (
              <button
                type="button"
                onClick={() => setOutcomeFilter("entrepreneurship")}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  outcomeFilter === "entrepreneurship"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Entrepreneurship ({cluster.entrepreneurship.length})</span>
              </button>
            )}
          </div>

          {/* 1. JOBS & CAREERS SECTION (Section 10) */}
          {(outcomeFilter === "all" || outcomeFilter === "jobs") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  <span>Relevant Career Pathways</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Explainable matching • No fake AI percentages
                </span>
              </div>

              {enhancedJobs.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  We don't currently have enough verified pathways for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="card p-6 rounded-3xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Header: Title + Career Type Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-base text-slate-900 font-heading">
                              {job.role}
                            </h4>
                            <span className="text-xs font-bold text-emerald-600 mt-0.5 inline-block">
                              {job.salaryRange}
                            </span>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider shrink-0 ${getCareerBadgeColor(
                              job.careerType
                            )}`}
                          >
                            {job.careerType}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Why it appears for this degree */}
                        <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950">
                          <span className="font-bold">Why it appears: </span>
                          <span className="leading-relaxed">{job.whyAppears}</span>
                        </div>

                        {/* Transferable vs Missing Skills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                            <span className="font-bold text-emerald-900 block text-[11px]">
                              You already have:
                            </span>
                            {job.transferableSkills.map((sk) => (
                              <div
                                key={sk}
                                className="flex items-center gap-1.5 text-emerald-800 text-[11px]"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate">{sk}</span>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
                            <span className="font-bold text-amber-900 block text-[11px]">
                              Build next:
                            </span>
                            {job.missingSkills.map((sk) => (
                              <div
                                key={sk}
                                className="flex items-center gap-1.5 text-amber-800 text-[11px]"
                              >
                                <Circle className="w-2.5 h-2.5 text-amber-600 fill-amber-600 shrink-0" />
                                <span className="truncate">{sk}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Top Employers */}
                        <div className="text-[11px] text-slate-600">
                          <span className="font-bold text-slate-700">Top Employers: </span>
                          <span>{job.topEmployers.join(", ")}</span>
                        </div>

                        {/* Suggested Next Action */}
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                          <span className="font-bold text-slate-900">Next Action: </span>
                          <span>{job.suggestedNextAction}</span>
                        </div>
                      </div>

                      {/* Action Button: Create Roadmap */}
                      <button
                        type="button"
                        onClick={() => {
                          if (job.linkedCareerId) {
                            navigate(`/roadmap?careerId=${job.linkedCareerId}`);
                          } else {
                            setActiveMainTab("roadmap");
                          }
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Create Roadmap for {job.role}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. HIGHER STUDIES SECTION (Section 11) */}
          {(outcomeFilter === "all" || outcomeFilter === "higher_ed") && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <span>Higher Studies & Specializations</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Verified degree eligibility
                </span>
              </div>

              {enhancedHigherEd.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  We don't currently have enough verified pathways for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {enhancedHigherEd.map((he) => (
                    <div
                      key={he.id}
                      className="card p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                            {he.duration}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 font-heading leading-snug">
                          {he.program}
                        </h4>

                        <p className="text-xs text-slate-600 font-medium">
                          Focus: {he.specialization}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1.5">
                          <div>
                            <span className="font-bold text-slate-900">Entrance Exams: </span>
                            <span className="text-purple-700 font-semibold">
                              {he.entranceExams.length > 0 ? he.entranceExams.join(", ") : "Direct University Merit"}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900">Admission Notes: </span>
                            <span>{he.admissionNotes}</span>
                          </div>
                        </div>
                      </div>

                      {he.officialUrl && (
                        <a
                          href={he.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 pt-2 border-t border-slate-100"
                        >
                          <span>Official University Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. CERTIFICATIONS SECTION (Section 13) */}
          {(outcomeFilter === "all" || outcomeFilter === "certs") && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Degree-Relevant Certifications</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Verified providers & statutory bodies
                </span>
              </div>

              {enhancedCerts.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  We don't currently have enough verified pathways for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {enhancedCerts.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                            {c.level}
                          </span>
                          <span className="text-[11px] text-slate-400">{c.estimatedTime}</span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                        <div className="text-[11px] text-indigo-600 font-medium">
                          Provider: {c.provider}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{c.relevance}</p>
                      </div>

                      <a
                        href={c.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 pt-2 border-t border-slate-100"
                      >
                        <span>Official Certification Provider</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. GOVERNMENT & PUBLIC SECTOR (RULE-BASED) (Section 12) */}
          {(outcomeFilter === "all" || outcomeFilter === "govt") && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Government & Public Sector Competitive Exams
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 self-start sm:self-auto">
                  Deterministic Rule Engine
                </span>
              </div>

              {/* Official Standing Disclaimer required by Section 12 */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Official Standing Notice:</strong> Eligibility and dates can change by official notification. Verify the current official notification before applying.
                </p>
              </div>

              {enhancedGovt.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  We don't currently have enough verified pathways for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedGovt.map((ge) => {
                    const isEligible = ge.verdict === "ELIGIBLE";
                    const isCheck = ge.verdict === "CHECK_NOTIFICATION";
                    return (
                      <div
                        key={ge.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 font-heading">
                              {ge.examName}
                            </h4>
                            <span className="text-xs text-slate-600 font-medium">
                              Post: {ge.targetPosts}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md shrink-0">
                            {ge.recruitingBody}
                          </span>
                        </div>

                        {/* Stored Rule-Engine Evaluation Verdict */}
                        <div
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                            isEligible
                              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                              : isCheck
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : "bg-rose-50 text-rose-900 border-rose-200"
                          }`}
                        >
                          {isEligible ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <span>
                            {isEligible
                              ? "✓ Appears eligible based on stored rules"
                              : isCheck
                              ? "⚠ Additional condition/notification verification required"
                              : "✕ Does not meet stored qualification rule"}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1">
                          <p>{ge.eligibilityNote}</p>
                          {ge.ageRunway !== undefined && (
                            <p className="text-[11px] text-indigo-700 font-medium">
                              Age Runway: {ge.ageRunway} years remaining ({academicProfile.category || "General"} category)
                            </p>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="font-semibold text-slate-900">Exam Pattern: </span>
                          <span>{ge.prepStrategy}</span>
                        </div>

                        {ge.officialUrl && (
                          <a
                            href={ge.officialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100"
                          >
                            <span>Official Notification Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 5. CAREER SWITCH SECTION (Section 14) */}
          {(outcomeFilter === "all" || outcomeFilter === "switch") && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Shuffle className="w-5 h-5 text-rose-600" />
                  <span>Realistic Career Switches</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Explainable bridge pathways
                </span>
              </div>

              {enhancedSwitches.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  We don't currently have enough verified pathways for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedSwitches.map((cs) => (
                    <div
                      key={cs.id}
                      className="p-5 rounded-2xl border border-rose-200/80 bg-rose-50/20 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 font-heading">
                          {selectedDegree.shortName} → {cs.targetField}
                        </h4>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                          Est. {cs.transitionTime}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {cs.pivotReason}
                      </p>

                      <div className="p-3 rounded-xl bg-white border border-rose-100 space-y-1.5 text-xs text-slate-700">
                        <div>
                          <span className="font-bold text-slate-900">Existing Foundation: </span>
                          <span>{cs.existingFoundation}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900">Bridge Skills to Learn: </span>
                          <span className="text-rose-700 font-medium">{cs.bridgeSkills.join(" • ")}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900">Portfolio Proof: </span>
                          <span>{cs.suggestedPortfolio}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. ENTREPRENEURSHIP SECTION */}
          {(outcomeFilter === "all" || outcomeFilter === "entrepreneurship") && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-amber-600" />
                  <span>Entrepreneurship & Specialized Ventures</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cluster.entrepreneurship.map((ent, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/20 to-orange-50/20 space-y-3"
                  >
                    <h4 className="font-bold text-sm text-slate-900 font-heading">{ent.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{ent.description}</p>
                    <div className="text-xs text-amber-900 font-medium">
                      <span className="font-bold">Ecosystem Platforms: </span>{ent.platformOrEcosystem}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700">Initial Milestone Steps:</span>
                      {ent.initialSteps.map((st, sidx) => (
                        <div key={sidx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: STEP-BY-STEP ROADMAPS */}
      {activeMainTab === "roadmap" && (
        <GraduateRoadmapView
          currentCluster={cluster}
          degreeStatus={academicProfile.status === "completed" ? "completed" : "pursuing"}
        />
      )}

      {/* TAB CONTENT 3: 3-TIER SKILL LADDER */}
      {activeMainTab === "skills" && (
        <GraduateSkillLadder currentCluster={cluster} />
      )}

      {/* TAB CONTENT 4: ACTION TEMPLATES & CHECKLISTS */}
      {activeMainTab === "templates" && (
        <GraduateActionTemplates />
      )}

      {/* TAB CONTENT 5: AI NAVIGATOR CHAT */}
      {activeMainTab === "ai_chat" && (
        <GraduateAiChat
          currentCluster={cluster}
          degree={selectedDegree}
          enhancedJobs={enhancedJobs}
          degreeStatus={academicProfile.status === "completed" ? "completed" : "pursuing"}
          onSetDegree={handleAiSetDegree}
          onSelectTab={(tabId) => {
            if (tabId === "outcomes") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("all");
            } else if (tabId === "jobs") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("jobs");
            } else if (tabId === "higher_ed") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("higher_ed");
            } else if (tabId === "certs") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("certs");
            } else if (tabId === "govt") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("govt");
            } else if (tabId === "switch") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("switch");
            } else if (tabId === "entrepreneurship") {
              setActiveMainTab("outcomes");
              setOutcomeFilter("entrepreneurship");
            } else {
              setActiveMainTab(tabId as any);
            }
          }}
        />
      )}
    </div>
  );
}
