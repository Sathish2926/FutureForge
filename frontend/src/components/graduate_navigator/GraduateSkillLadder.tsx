import React, { useState } from "react";
import { DegreeCluster } from "./GraduateNavigatorData";
import { Layers, CheckCircle, BookOpen, Award, ExternalLink, Sparkles, Zap, ShieldCheck } from "lucide-react";

interface GraduateSkillLadderProps {
  currentCluster: DegreeCluster;
}

export default function GraduateSkillLadder({ currentCluster }: GraduateSkillLadderProps) {
  const [activeTier, setActiveTier] = useState<"all" | "foundation" | "intermediate" | "advanced">("all");
  const { skillLadder, certifications } = currentCluster;

  const rungs = [
    {
      id: "foundation",
      level: "Level 1: Foundation (Year 1–2 / Basics)",
      tag: "Foundational Capabilities",
      color: "from-blue-500/10 to-indigo-500/10 border-indigo-200",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      data: skillLadder.foundation,
    },
    {
      id: "intermediate",
      level: "Level 2: Intermediate (Pre-Final / Core Industry)",
      tag: "Industry Core Stack",
      color: "from-indigo-500/10 to-purple-500/10 border-purple-200",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      data: skillLadder.intermediate,
    },
    {
      id: "advanced",
      level: "Level 3: Advanced (Final Year / Production Specialization)",
      tag: "High-Value Specialization",
      color: "from-purple-500/10 to-emerald-500/10 border-emerald-200",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      data: skillLadder.advanced,
    },
  ];

  const filteredRungs = activeTier === "all" ? rungs : rungs.filter((r) => r.id === activeTier);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            3-Tier Skill Ladder & Micro-Credentials
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Progressive competency ladder mapping technical mastery, 21st-century soft skills, and recognized industry credentials for {currentCluster.shortTitle}.
          </p>
        </div>

        {/* Tier filter pill buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTier("all")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTier === "all" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All 3 Levels
          </button>
          <button
            onClick={() => setActiveTier("foundation")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTier === "foundation" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Foundation
          </button>
          <button
            onClick={() => setActiveTier("intermediate")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTier === "intermediate" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setActiveTier("advanced")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTier === "advanced" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Rung Cards */}
      <div className="space-y-6">
        {filteredRungs.map((rung) => (
          <div
            key={rung.id}
            className={`card p-6 md:p-8 rounded-3xl border bg-gradient-to-r ${rung.color} bg-white shadow-sm hover:shadow-md transition-all space-y-6`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${rung.badgeColor}`}>
                  {rung.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading mt-1.5">
                  {rung.level}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Technical Skills */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>Technical Proficiencies</span>
                </div>
                <div className="space-y-1.5">
                  {rung.data.technical.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2 shadow-2xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>21st-Century Soft Skills</span>
                </div>
                <div className="space-y-1.5">
                  {rung.data.soft.map((soft, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2 shadow-2xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>{soft}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Course Modules */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Curated Learning Resources</span>
                </div>
                <div className="space-y-1.5">
                  {rung.data.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <span className="font-medium truncate">{course}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Industry Standard Certifications Grid */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-indigo-300" />
              <span>Employer Verified Micro-Credentials</span>
            </div>
            <h3 className="text-xl font-bold font-heading mt-1 text-white">
              Gold-Standard Certifications for {currentCluster.shortTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Industry-standard qualifications that boost placement probability and starting salary benchmarks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-200 text-[10px] font-bold uppercase tracking-wider">
                    {cert.level}
                  </span>
                  <span className="text-[11px] text-slate-400">{cert.estimatedTime}</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-snug">{cert.name}</h4>
                <div className="text-[11px] text-indigo-300 font-medium">Provider: {cert.provider}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{cert.relevance}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-300">
                <span className="text-[11px] font-mono text-slate-400 truncate">{cert.linkNote}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
