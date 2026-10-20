import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  GraduationCap,
  ArrowRight,
  Clock,
  BookOpen,
  HelpCircle,
  AlertCircle,
  FileText,
  Sparkles,
  Layers,
  Cpu,
  Stethoscope,
  Laptop,
  Briefcase,
  TrendingUp,
  Palette,
  Wrench,
  Binary,
} from "lucide-react";
import { CatalogNode, MarksProfile } from "./CatalogTypes";

interface Screen3TierADrillInProps {
  parentTierA: CatalogNode;
  leafNodes: CatalogNode[];
  onSelectLeaf: (leaf: CatalogNode) => void;
  onBack: () => void;
  marksProfile: MarksProfile | null;
  highlightedNodeIds?: string[];
}

export default function Screen3TierADrillIn({
  parentTierA,
  leafNodes,
  onSelectLeaf,
  onBack,
  marksProfile,
  highlightedNodeIds = [],
}: Screen3TierADrillInProps) {
  const [activeTab, setActiveTab] = useState<"all" | "interdisciplinary" | "engineering" | "medical">("all");

  const isPCMB = parentTierA.id === "science_pcmb";

  const getStreamIcon = (id: string) => {
    switch (id) {
      case "science_cs":
        return <Laptop className="w-6 h-6 text-indigo-300" />;
      case "science_pcm":
        return <Cpu className="w-6 h-6 text-indigo-300" />;
      case "science_pcb":
        return <Stethoscope className="w-6 h-6 text-indigo-300" />;
      case "science_pcmb":
        return <Sparkles className="w-6 h-6 text-indigo-300" />;
      case "commerce_math":
        return <TrendingUp className="w-6 h-6 text-indigo-300" />;
      case "commerce_nomath":
        return <Briefcase className="w-6 h-6 text-indigo-300" />;
      case "commerce_ca_ip":
        return <Binary className="w-6 h-6 text-indigo-300" />;
      case "humanities":
        return <BookOpen className="w-6 h-6 text-indigo-300" />;
      case "arts_design_sports":
        return <Palette className="w-6 h-6 text-indigo-300" />;
      case "vocational_stream":
      case "iti":
      case "diploma_polytechnic":
        return <Wrench className="w-6 h-6 text-indigo-300" />;
      default:
        return <GraduationCap className="w-6 h-6 text-indigo-300" />;
    }
  };

  const filteredLeaves = useMemo(() => {
    if (!isPCMB || activeTab === "all") return leafNodes;
    if (activeTab === "interdisciplinary") {
      return leafNodes.filter(
        (n) =>
          n.parent_id === "science_pcmb" ||
          ["btech_biomedical_engineering", "btech_biotechnology_pcmb", "btech_agricultural_engineering", "btech_food_technology", "bsc_biophysics", "bpharm", "bsc_biotechnology"].includes(n.id)
      );
    }
    if (activeTab === "engineering") {
      return leafNodes.filter((n) => n.parent_id === "science_pcm" || n.id.startsWith("btech_"));
    }
    if (activeTab === "medical") {
      return leafNodes.filter(
        (n) =>
          n.parent_id === "science_pcb" ||
          ["mbbs", "bds", "bams", "bhms", "bpharm", "bsc_nursing", "bpt", "bsc_agriculture", "bvsc_veterinary"].includes(n.id)
      );
    }
    return leafNodes;
  }, [leafNodes, isPCMB, activeTab]);

  const getReversibilityLabel = (rev: string | null) => {
    if (rev === "easy") return "Easy to switch later";
    if (rev === "moderate") return "Some cost to switch later";
    if (rev === "hard") return "Harder to switch later";
    return "Switchability under review";
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Navigation & Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="btn-secondary py-2 px-3.5 text-xs font-bold flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Streams
        </button>
      </div>

      {/* Stream Overview Header Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            {getStreamIcon(parentTierA.id)}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">{parentTierA.name}</h1>
            <p className="text-xs text-indigo-200 mt-0.5">Foundational Pathway & Branch Catalog</p>
          </div>
        </div>

        {parentTierA.one_line_description && (
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-4xl">
            {parentTierA.one_line_description}
          </p>
        )}

        {isPCMB && (
          <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-500/30 text-xs text-indigo-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Dual-Domain Advantage (PCM + PCB):</p>
              <p className="mt-0.5 text-indigo-200 leading-relaxed">
                PCMB students qualify for 100% of engineering entrance exams (JEE Main, BITSAT) AND medical/life sciences exams (NEET-UG, ICAR, CUET-UG), plus high-growth hybrid fields like Biomedical Engineering, Computational Biology, and Agritech.
              </p>
            </div>
          </div>
        )}

        {parentTierA.cost_range_note && (
          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span className="font-semibold text-slate-300">Cost context: </span>
            {parentTierA.cost_range_note}
          </div>
        )}
      </div>

      {/* PCMB Filter Tabs */}
      {isPCMB && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> All PCMB Pathways ({leafNodes.length})
          </button>
          <button
            onClick={() => setActiveTab("interdisciplinary")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "interdisciplinary"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> PCMB Interdisciplinary
          </button>
          <button
            onClick={() => setActiveTab("engineering")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "engineering"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-500" /> Engineering & Tech Tracks (PCM)
          </button>
          <button
            onClick={() => setActiveTab("medical")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "medical"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-emerald-500" /> Medical & Bio Tracks (PCB)
          </button>
        </div>
      )}

      {/* Leaf List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 font-heading">
          Available Courses & Target Branches ({filteredLeaves.length})
        </h2>
        <span className="text-xs text-slate-500">Tap any program to view verified eligibility</span>
      </div>

      {/* Leaf Nodes List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeaves.map((leaf) => {
          const isPending = leaf.detail_status === "pending";
          const examText = leaf.eligibility?.entrance_exam || "No entrance exam required";
          const isHighlighted = highlightedNodeIds.includes(leaf.id);

          return (
            <div
              key={leaf.id}
              onClick={() => onSelectLeaf(leaf)}
              className={`card card-hover p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isHighlighted
                  ? "border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-50/20 shadow-md shadow-indigo-500/10"
                  : "border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:border-indigo-300"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm font-heading leading-snug hover:text-indigo-600 transition-colors">
                    {leaf.name}
                  </h3>
                  {leaf.detail_status === "verified" && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold shrink-0">
                      Verified
                    </span>
                  )}
                  {leaf.detail_status === "partial" && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold shrink-0">
                      Partial Data
                    </span>
                  )}
                  {isPending && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold shrink-0">
                      Pending Details
                    </span>
                  )}
                </div>

                {/* Plain-text Duration and Exam */}
                {!isPending ? (
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{leaf.duration || "Duration under review"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{examText}</span>
                    </div>

                    {/* Plain-text Reversibility Label (Never a score/percentage/color gauge) */}
                    <div className="pt-2 text-[11px] text-slate-500 font-medium">
                      Switchability:{" "}
                      <span className="font-semibold text-slate-700">
                        {getReversibilityLabel(leaf.reversibility)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Full program details and entrance requirements currently being verified.
                  </p>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>View Full Path Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
