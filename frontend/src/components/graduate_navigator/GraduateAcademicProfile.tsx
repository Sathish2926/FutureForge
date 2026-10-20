import React, { useState } from "react";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sliders
} from "lucide-react";
import { Degree, DegreeStatus, StudyMode, SocialCategory } from "../../data/degree_guidance/types";
import { DEGREE_FAMILIES } from "../../data/degree_guidance/degreeFamilies";

export interface GraduateAcademicProfileData {
  status: DegreeStatus;
  yearOrSemester?: string;
  completionYear?: number;
  // Optional fields
  specialization?: string;
  university?: string;
  studyMode: StudyMode;
  marksPercent?: number;
  category?: SocialCategory;
}

interface GraduateAcademicProfileProps {
  degree: Degree;
  profile: GraduateAcademicProfileData;
  onChangeProfile: (updated: Partial<GraduateAcademicProfileData>) => void;
  onChangeDegree: () => void;
}

export default function GraduateAcademicProfile({
  degree,
  profile,
  onChangeProfile,
  onChangeDegree
}: GraduateAcademicProfileProps) {
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const family = DEGREE_FAMILIES[degree.familyId] || DEGREE_FAMILIES.engineering;

  return (
    <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 animate-fade-in">
      {/* Header bar with Degree & Change Degree */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              YOUR ACADEMIC PROFILE
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {family.name}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <span>{degree.name}</span>
            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600">
              {degree.shortName}
            </span>
          </h3>
        </div>

        <button
          type="button"
          onClick={onChangeDegree}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200 px-3.5 py-2 rounded-xl transition-all self-start sm:self-center"
        >
          Change Degree
        </button>
      </div>

      {/* Degree Status Selector (Pursuing, Completed ONLY) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <span>Current Academic / Professional Status</span>
          <span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
          {[
            { id: "pursuing", label: "Pursuing", desc: "Currently in college" },
            { id: "completed", label: "Completed", desc: "Graduated fresher" },
          ].map((item) => {
            const isSelected = profile.status === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeProfile({ status: item.id as DegreeStatus })}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold ring-2 ring-indigo-500/20 shadow-xs"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-semibold"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className="text-[11px] text-slate-400 font-normal">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* If Completed: Graduation Year */}
      {profile.status === "completed" && (
        <div className="p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-900 block">
              Year of Graduation
            </span>
            <span className="text-[11px] text-slate-500">
              Helps determine age runway for government exams and off-campus batch eligibility.
            </span>
          </div>

          <select
            value={profile.completionYear || new Date().getFullYear()}
            onChange={(e) => onChangeProfile({ completionYear: parseInt(e.target.value, 10) })}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shrink-0"
          >
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
              <option key={yr} value={yr}>
                {yr} {yr >= 2025 ? "(Recent Batch)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Collapsible Optional Academic Details */}
      <div className="border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => setShowOptionalFields((p) => !p)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>{showOptionalFields ? "Hide" : "Add"} Optional Details (Specialization, University, Study Mode, Marks %, Category)</span>
          {showOptionalFields ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showOptionalFields && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Specialization / Major
              </label>
              <input
                type="text"
                value={profile.specialization || ""}
                onChange={(e) => onChangeProfile({ specialization: e.target.value })}
                placeholder="e.g. AI / Finance / Structural"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                University / College
              </label>
              <input
                type="text"
                value={profile.university || ""}
                onChange={(e) => onChangeProfile({ university: e.target.value })}
                placeholder="e.g. Anna University / DU"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Study Mode
              </label>
              <select
                value={profile.studyMode}
                onChange={(e) => onChangeProfile({ studyMode: e.target.value as StudyMode })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="regular">Regular / Full-Time</option>
                <option value="distance">Distance (IGNOU/State Open)</option>
                <option value="online">Online (UGC-DEB)</option>
                <option value="lateral_entry">Lateral Entry (Diploma to Degree)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Marks % (Rule Engine Check)
              </label>
              <input
                type="number"
                min={30}
                max={100}
                value={profile.marksPercent || ""}
                onChange={(e) => onChangeProfile({ marksPercent: parseFloat(e.target.value) || undefined })}
                placeholder="e.g. 68"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Social Category (Govt Relaxations)
              </label>
              <select
                value={profile.category || "general"}
                onChange={(e) => onChangeProfile({ category: e.target.value as SocialCategory })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="general">General (Unreserved)</option>
                <option value="obc">OBC (+3 Years Age Relaxation)</option>
                <option value="sc_st">SC / ST (+5 Years Age Relaxation)</option>
                <option value="ews">EWS (Economically Weaker Section)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
