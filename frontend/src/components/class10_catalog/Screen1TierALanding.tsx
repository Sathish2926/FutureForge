import React, { useState, useMemo } from "react";
import {
  Compass,
  ArrowRight,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Calculator,
  RefreshCw,
  Target,
  Layers,
  BookOpen,
  Info,
  CheckCircle2,
  Laptop,
  Briefcase,
  TrendingUp,
  Palette,
  Wrench,
  Stethoscope,
  Binary,
  Cpu,
} from "lucide-react";
import { CatalogNode, SortingPreferences, MarksProfile } from "./CatalogTypes";

interface Screen1TierALandingProps {
  nodes: CatalogNode[];
  onSelectTierA: (node: CatalogNode) => void;
  onOpenLongTermGoals: () => void;
  onOpenMarksModal: () => void;
  marksProfile: MarksProfile | null;
  highlightedNodeIds?: string[];
}

export default function Screen1TierALanding({
  nodes,
  onSelectTierA,
  onOpenLongTermGoals,
  onOpenMarksModal,
  marksProfile,
  highlightedNodeIds = [],
}: Screen1TierALandingProps) {
  const [sortingPrefs, setSortingPrefs] = useState<SortingPreferences>({
    breadthPreference: null,
    pacePreference: null,
    clarityPreference: null,
  });

  const [sortingTapsOpen, setSortingTapsOpen] = useState(false);

  // Sorting logic based purely on client-side taps without filtering or hiding any node
  const sortedNodes = useMemo(() => {
    const list = [...nodes];
    if (!sortingPrefs.breadthPreference && !sortingPrefs.pacePreference && !sortingPrefs.clarityPreference) {
      return list;
    }

    return list.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // 1. Breadth: "open" favors PCMB / Commerce with Maths / Science PCM / Science CS / Commerce CA IP vs "specific" favors ITI / Diploma / PCB / Vocational / Arts Design
      if (sortingPrefs.breadthPreference === "open") {
        if (["science_pcmb", "science_pcm", "science_cs", "commerce_math", "commerce_ca_ip"].includes(a.id)) scoreA += 3;
        if (["science_pcmb", "science_pcm", "science_cs", "commerce_math", "commerce_ca_ip"].includes(b.id)) scoreB += 3;
      } else if (sortingPrefs.breadthPreference === "specific") {
        if (["iti", "diploma_polytechnic", "science_pcb", "vocational_stream", "arts_design_sports"].includes(a.id)) scoreA += 3;
        if (["iti", "diploma_polytechnic", "science_pcb", "vocational_stream", "arts_design_sports"].includes(b.id)) scoreB += 3;
      }

      // 2. Pace: "hands_on" prioritizes Diploma, ITI & Vocational vs "school" prioritizes 11th/12th
      if (sortingPrefs.pacePreference === "hands_on") {
        if (["diploma_polytechnic", "iti", "vocational_stream"].includes(a.id)) scoreA += 4;
        if (["diploma_polytechnic", "iti", "vocational_stream"].includes(b.id)) scoreB += 4;
      } else if (sortingPrefs.pacePreference === "school") {
        if (!["diploma_polytechnic", "iti"].includes(a.id)) scoreA += 2;
        if (!["diploma_polytechnic", "iti"].includes(b.id)) scoreB += 2;
      }

      // 3. Clarity: "exploring" favors Humanities & General Commerce & Commerce CA IP vs "goal" favors technical, vocational, design, medical & law
      if (sortingPrefs.clarityPreference === "exploring") {
        if (["humanities", "commerce_nomath", "commerce_ca_ip", "science_pcmb"].includes(a.id)) scoreA += 2;
        if (["humanities", "commerce_nomath", "commerce_ca_ip", "science_pcmb"].includes(b.id)) scoreB += 2;
      } else if (sortingPrefs.clarityPreference === "goal") {
        if (["science_cs", "vocational_stream", "arts_design_sports", "science_pcm", "science_pcb", "diploma_polytechnic", "iti", "commerce_math"].includes(a.id)) scoreA += 2;
        if (["science_cs", "vocational_stream", "arts_design_sports", "science_pcm", "science_pcb", "diploma_polytechnic", "iti", "commerce_math"].includes(b.id)) scoreB += 2;
      }

      return scoreB - scoreA;
    });
  }, [nodes, sortingPrefs]);

  const hasActiveSort = Boolean(
    sortingPrefs.breadthPreference || sortingPrefs.pacePreference || sortingPrefs.clarityPreference
  );

  const getStreamIcon = (id: string) => {
    switch (id) {
      case "science_cs":
        return <Laptop className="w-6 h-6 text-indigo-600" />;
      case "science_pcm":
        return <Cpu className="w-6 h-6 text-indigo-600" />;
      case "science_pcb":
        return <Stethoscope className="w-6 h-6 text-indigo-600" />;
      case "science_pcmb":
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
      case "commerce_math":
        return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      case "commerce_nomath":
        return <Briefcase className="w-6 h-6 text-indigo-600" />;
      case "commerce_ca_ip":
        return <Binary className="w-6 h-6 text-indigo-600" />;
      case "humanities":
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
      case "arts_design_sports":
        return <Palette className="w-6 h-6 text-indigo-600" />;
      case "vocational_stream":
      case "iti":
      case "diploma_polytechnic":
        return <Wrench className="w-6 h-6 text-indigo-600" />;
      default:
        return <GraduationCap className="w-6 h-6 text-indigo-600" />;
    }
  };

  const getElectiveTag = (node: CatalogNode): string | null => {
    if (node.elective_modifiers_tag) return node.elective_modifiers_tag;
    if (["science_pcm", "commerce_math", "commerce_nomath"].includes(node.id)) {
      return "+ Computer Science / IP available";
    }
    return null;
  };

  const streamCount = sortedNodes.length;

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            Class 10 Post-Secondary Pathway Catalog
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">
            {streamCount} Direct Educational Streams After 10th
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Every pathway after Class 10 is an equal and valid foundation. Explore academic streams, technical polytechnics, creative arts, and vocational trade certifications with transparent facts on duration, eligibility, and next steps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap md:flex-col gap-2.5 z-10 shrink-0">
          <button
            onClick={onOpenLongTermGoals}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Target className="w-4 h-4" /> Browse Long-Term Goals
          </button>

          <button
            onClick={onOpenMarksModal}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Calculator className="w-4 h-4 text-indigo-300" />
            {marksProfile?.overall_percent
              ? `Marks: ${marksProfile.overall_percent}%`
              : "Add 10th Marks (Optional)"}
          </button>
        </div>
      </div>

      {/* Screen 2: Optional Sorting Taps Accordion / Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSortingTapsOpen(!sortingTapsOpen)}
            className="flex items-center gap-2 font-bold text-slate-800 text-xs hover:text-indigo-600 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Optional Preference Sorting (Re-orders cards for this session)</span>
            <span className="text-[11px] font-normal text-slate-500">
              {hasActiveSort ? "• Preferences Active" : "• Tap to reorder"}
            </span>
          </button>

          {hasActiveSort && (
            <button
              onClick={() =>
                setSortingPrefs({
                  breadthPreference: null,
                  pacePreference: null,
                  clarityPreference: null,
                })
              }
              className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Order
            </button>
          )}
        </div>

        {sortingTapsOpen && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-fade-in">
            {/* Tap 1 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-700 text-[11px]">1. Breadth of Options</div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      breadthPreference: p.breadthPreference === "open" ? null : "open",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.breadthPreference === "open"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Keep options open
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      breadthPreference: p.breadthPreference === "specific" ? null : "specific",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.breadthPreference === "specific"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Move to specific field
                </button>
              </div>
            </div>

            {/* Tap 2 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-700 text-[11px]">2. Learning Pace & Style</div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      pacePreference: p.pacePreference === "school" ? null : "school",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.pacePreference === "school"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Stay in school 2 yrs
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      pacePreference: p.pacePreference === "hands_on" ? null : "hands_on",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.pacePreference === "hands_on"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Start hands-on sooner
                </button>
              </div>
            </div>

            {/* Tap 3 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-700 text-[11px]">3. Target Certainty</div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      clarityPreference: p.clarityPreference === "goal" ? null : "goal",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.clarityPreference === "goal"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Specific goal in mind
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSortingPrefs((p) => ({
                      ...p,
                      clarityPreference: p.clarityPreference === "exploring" ? null : "exploring",
                    }))
                  }
                  className={`p-2 rounded-lg text-center text-[11px] font-semibold border transition-all ${
                    sortingPrefs.clarityPreference === "exploring"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Genuinely exploring
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen 1 Cards Grid: Dynamic Equal-Weight Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            All {streamCount} Tier-A Foundation Choices
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing all {streamCount} pathways equally
          </span>
        </div>

        {/* 
          CRITICAL REQUIREMENT:
          All streams must have the EXACT SAME visual size/style/position pattern with equal weighting.
          Rendered in a 4-column desktop, 2-column tablet, 1-column mobile responsive grid.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedNodes.map((node) => {
            const isHighlighted = highlightedNodeIds.includes(node.id);
            const electiveTag = getElectiveTag(node);

            return (
              <div
                key={node.id}
                onClick={() => onSelectTierA(node)}
                className={`group card card-hover flex flex-col justify-between p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                  isHighlighted
                    ? "border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-50/20 shadow-lg shadow-indigo-500/10"
                    : "border-slate-200/80 bg-white shadow-sm hover:shadow-lg hover:border-indigo-300"
                }`}
              >
                <div className="space-y-4">
                  {/* Card Icon & Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:scale-105 transition-transform">
                      {getStreamIcon(node.id)}
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Name & One-line Description */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-heading group-hover:text-indigo-600 transition-colors leading-snug">
                      {node.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                      {node.one_line_description || "Exploration of foundational subject clusters and next-stage options."}
                    </p>
                  </div>

                  {/* Elective Modifiers Tag (e.g. Science-PCM, Commerce with/without Maths) */}
                  {electiveTag && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50/80 border border-indigo-100 text-[11px] font-semibold text-indigo-700">
                      <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{electiveTag}</span>
                    </div>
                  )}

                  {/* Cost Range Note (Rendered as plain text prose, NOT as a badge) */}
                  {node.cost_range_note && (
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-normal">
                      <span className="font-semibold text-slate-700">Cost context: </span>
                      {node.cost_range_note}
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                  <span>Explore Pathways & Leaf Nodes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Board Variance Advisory Note */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start sm:items-center gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <span className="font-semibold text-slate-800">Stream Advisory:</span> Stream names and combinations vary by board (CBSE / State / ICSE); verify with your school.
          </p>
        </div>
      </div>
    </div>
  );
}

