import React from "react";
import {
  ChevronLeft,
  GraduationCap,
  ExternalLink,
  BookOpen,
  Clock,
  Award,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { CatalogNode, MarksProfile } from "./CatalogTypes";

interface Screen4LeafDetailProps {
  node: CatalogNode;
  allNodes: CatalogNode[];
  onNavigateToNode: (nodeId: string) => void;
  onBack: () => void;
  marksProfile: MarksProfile | null;
}

export default function Screen4LeafDetail({
  node,
  allNodes,
  onNavigateToNode,
  onBack,
  marksProfile,
}: Screen4LeafDetailProps) {
  const isPending = node.detail_status === "pending";
  const isPartial = node.detail_status === "partial";
  const isVerified = node.detail_status === "verified";

  // Check if this node is academically demanding and if marks note should be displayed
  const shouldShowAcademicFactNote = Boolean(
    marksProfile &&
    (marksProfile.math_performance === "Struggling" ||
      marksProfile.science_performance === "Struggling" ||
      (marksProfile.overall_percent !== undefined && marksProfile.overall_percent !== null && marksProfile.overall_percent < 60)) &&
    (node.id.includes("btech") ||
      node.id.includes("mbbs") ||
      node.id.includes("bds") ||
      node.id.includes("barch") ||
      node.id.includes("chartered_accountancy") ||
      node.id.includes("actuarial"))
  );

  const getReversibilityLabel = (rev: string | null) => {
    if (rev === "easy") return "Easy to switch later";
    if (rev === "moderate") return "Some cost to switch later";
    if (rev === "hard") return "Harder to switch later";
    return "Not yet confirmed — check official regulatory body directly";
  };

  const getCostLabel = (cost: string | null) => {
    if (cost === "low") return "Low (Government funded / nominal fee structure)";
    if (cost === "medium") return "Moderate (Standard university & state tuition)";
    if (cost === "high") return "High (Professional private colleges / extensive material & training costs)";
    return "Not yet confirmed — check official college fee schedules directly";
  };

  // Helper for partial fields
  const renderFieldOrFallback = (val: string | null | undefined, authorityName = "official regulatory body") => {
    if (val && val.trim()) return val;
    return `Not yet confirmed — check ${authorityName} directly`;
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-16 text-xs">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="btn-secondary py-2 px-3.5 text-xs font-bold flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Previous Screen
        </button>

        <div className="flex items-center gap-2">
          {isVerified && (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Regulatory Data
            </span>
          )}
          {isPartial && (
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-600" /> Partial Data (Pending Full Verification)
            </span>
          )}
          {isPending && (
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
              Pending Details
            </span>
          )}
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-medium">
          <GraduationCap className="w-4 h-4" />
          <span>
            {node.parent_id
              ? `Under: ${allNodes.find((n) => n.id === node.parent_id)?.name || node.parent_id}`
              : "Direct Post-10th / Cross-Stream Pathway"}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">{node.name}</h1>
        {node.typical_qualification && (
          <p className="text-slate-300 text-xs md:text-sm">
            Typical Qualification: <strong className="text-white">{node.typical_qualification}</strong>
          </p>
        )}
      </div>

      {/* Academic Requirement Fact Note (Marks Layer - Neutral Fact Note Only) */}
      {shouldShowAcademicFactNote && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950 mb-0.5">Prerequisite Academic Rigour Fact</div>
            <div>
              This typically needs consistently strong Math/Science performance — based on what you entered, this may take real extra effort.
            </div>
          </div>
        </div>
      )}

      {/* BRANCH 1: PENDING STATUS */}
      {isPending && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Pathway Under Verification
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            This path exists — full details are still being verified. Check back soon, or search '{node.name} eligibility India' for now.
          </p>
        </div>
      )}

      {/* BRANCH 2 & 3: VERIFIED AND PARTIAL DETAILS */}
      {!isPending && (
        <div className="space-y-6">
          {/* Eligibility & Examination Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Eligibility & Admission Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Stream & Subject Prerequisites
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {renderFieldOrFallback(node.eligibility?.stream_required)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Minimum Marks / Cutoff Guidelines
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {renderFieldOrFallback(node.eligibility?.min_marks_note)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Key Entrance Examination(s)
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {renderFieldOrFallback(node.eligibility?.entrance_exam, "National Testing Agency / College authorities")}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Age Limit & Criteria
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {renderFieldOrFallback(node.eligibility?.age_limit)}
                </p>
              </div>
            </div>
          </div>

          {/* Program Duration & Career Mobility */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-indigo-600" />
              Duration, Cost & Career Mobility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Typical Duration
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {renderFieldOrFallback(node.duration)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Financial Commitment
                </span>
                <p className="text-slate-900 font-medium text-xs">
                  {getCostLabel(node.cost_tier)}
                </p>
              </div>
            </div>

            {/* Reversibility Note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Career Reversibility & Switchability Context ({getReversibilityLabel(node.reversibility)})
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                {renderFieldOrFallback(node.reversibility_note)}
              </p>
            </div>

            {/* Non-degree Alternative */}
            {node.non_degree_alt && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-700">
                    Non-Degree / Vocational Alternative
                  </span>
                  <p className="font-semibold text-xs mt-0.5">{node.non_degree_alt}</p>
                </div>
              </div>
            )}
          </div>

          {/* Keeps Open Next Steps (Tappable Cross-Tier Navigation Chips) */}
          {node.keeps_open && node.keeps_open.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-100 pb-3">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Subsequent Pathways Kept Open (Tap to inspect)
              </h2>
              <p className="text-xs text-slate-500">
                Completing this node provides direct or lateral progression into these branches:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {node.keeps_open.map((targetId) => {
                  const targetNode = allNodes.find((n) => n.id === targetId);
                  const label = targetNode ? targetNode.name : targetId.replace(/_/g, " ");

                  return (
                    <button
                      key={targetId}
                      onClick={() => onNavigateToNode(targetId)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{label}</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sourcing & Verification Block */}
          <div className="p-6 rounded-3xl bg-slate-50/60 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Information Sourcing & Auditing
              </span>
              <span className="text-[11px] text-slate-500">
                Last Verified: {node.last_verified_date || "2026-09-27"}
              </span>
            </div>

            {node.sources && node.sources.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-600">Referenced Official Authorities:</span>
                <ul className="space-y-1 pl-1">
                  {node.sources.map((url, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 font-medium text-xs break-all"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span>{url}</span>
                      </a>
                      {!node.source_verified && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold shrink-0">
                          unofficial source — pending verification
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Official regulatory gazette links being mapped directly.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
