import React from "react";
import { DegreeCluster } from "./GraduateNavigatorData";
import { Clock, CheckCircle2, Flag, ArrowRight, TrendingUp, Calendar, Target, Award } from "lucide-react";

interface GraduateRoadmapViewProps {
  currentCluster: DegreeCluster;
  degreeStatus: "pursuing" | "completed";
}

export default function GraduateRoadmapView({
  currentCluster,
  degreeStatus,
}: GraduateRoadmapViewProps) {
  const roadmapData = currentCluster.roadmaps[degreeStatus];

  const phases = [
    { key: "phase1", ...roadmapData.phase1, stepNum: "01", color: "indigo" },
    { key: "phase2", ...roadmapData.phase2, stepNum: "02", color: "purple" },
    { key: "phase3", ...roadmapData.phase3, stepNum: "03", color: "emerald" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Target className="w-3.5 h-3.5 text-indigo-300" />
            <span>Phased Career Roadmap • {degreeStatus === "pursuing" ? "Undergraduate Track" : "Recent Graduate Track"}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-heading">
            {currentCluster.name} Execution Plan
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {degreeStatus === "pursuing"
              ? "Structured semester-by-semester milestones to maximize your placement readiness, summer internship conversion, and graduate portfolio."
              : "Direct post-graduate sprint covering portfolio consolidation, high-volume targeted applications, and interview onboarding."}
          </p>
        </div>

        {/* Quick Benchmarks */}
        <div className="grid grid-cols-2 gap-3 shrink-0 text-xs">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-center">
            <div className="text-[11px] text-slate-300">Avg Time to Offer</div>
            <div className="text-base font-bold text-white mt-0.5">{currentCluster.metrics.avgTimeToOutcome}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-center">
            <div className="text-[11px] text-slate-300">Median Package</div>
            <div className="text-base font-bold text-emerald-300 mt-0.5">{currentCluster.metrics.medianStartingSalary.split("/")[0]}</div>
          </div>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500">
        {phases.map((p, idx) => (
          <div key={idx} className="relative group">
            {/* Step Marker Dot */}
            <div
              className={`absolute -left-6 md:-left-10 top-0 w-7 h-7 md:w-9 md:h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-110 ${
                p.color === "indigo"
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : p.color === "purple"
                  ? "bg-purple-600 text-white ring-4 ring-purple-100"
                  : "bg-emerald-600 text-white ring-4 ring-emerald-100"
              }`}
            >
              {p.stepNum}
            </div>

            {/* Phase Card */}
            <div className="card p-6 md:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Phase {p.stepNum}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mt-0.5">
                    {p.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{p.timeframe}</span>
                </div>
              </div>

              {/* Action Tasks */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Strategic Tasks & Actions:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {p.tasks.map((task, tidx) => (
                    <div
                      key={tidx}
                      className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed hover:bg-white hover:shadow-2xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tangible Milestone Badge */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-xs text-amber-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-amber-950">Target Milestone Deliverable: </span>
                  <span>{p.milestone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
