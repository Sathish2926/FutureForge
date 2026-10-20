import React, { useState, useMemo } from "react";
import { Search, Compass, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Layers } from "lucide-react";
import { CatalogNode } from "./CatalogTypes";

interface Screen5Props {
  nodes: CatalogNode[];
  onSelectNode: (node: CatalogNode) => void;
  onBackToLanding: () => void;
}

export const Screen5LongTermGoals: React.FC<Screen5Props> = ({
  nodes,
  onSelectNode,
  onBackToLanding,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "any_stream" | "stream_specific">("all");

  // Determine which nodes belong on Screen 5:
  // Tier B nodes or goal clusters. If feeds_from is broad (>= 6 streams or includes "all" or parent_id is null/goal), it's "any stream".
  const goalNodes = useMemo(() => {
    return nodes.filter((n) => n.tier === "B");
  }, [nodes]);

  const filteredGoals = useMemo(() => {
    return goalNodes.filter((node) => {
      const isAnyStream = !node.parent_id || node.feeds_from?.length >= 6;
      
      if (activeFilter === "any_stream" && !isAnyStream) return false;
      if (activeFilter === "stream_specific" && isAnyStream) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        node.name.toLowerCase().includes(term) ||
        (node.one_line_description && node.one_line_description.toLowerCase().includes(term)) ||
        (node.eligibility?.entrance_exam && node.eligibility.entrance_exam.toLowerCase().includes(term)) ||
        (node.eligibility?.stream_required && node.eligibility.stream_required.toLowerCase().includes(term))
      );
    });
  }, [goalNodes, activeFilter, searchTerm]);

  const getStreamRequirementInfo = (node: CatalogNode) => {
    const isAnyStream = !node.parent_id || (node.feeds_from && node.feeds_from.length >= 6);
    if (isAnyStream) {
      return {
        isAnyStream: true,
        label: "Works from any stream",
        subLabel: "Open to Arts, Commerce, Science, & Vocational backgrounds",
      };
    }

    // Specific stream
    const req = node.eligibility?.stream_required || (node.parent_id ? node.parent_id.replace(/_/g, " ").toUpperCase() : "Specific stream required");
    return {
      isAnyStream: false,
      label: `Requires: ${req}`,
      subLabel: "Specific Class 11-12 subject prerequisites apply",
    };
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Destination-First Explorer
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Long-Term Career Goals & Pathways
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have a dream career in mind? Discover whether your target profession requires a specialized stream or if it is fully accessible from <strong>any</strong> Class 11 stream.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="text-xs sm:text-sm font-medium text-indigo-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              ← Back to Stream & Pathway Categories
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            All Goals ({goalNodes.length})
          </button>
          <button
            onClick={() => setActiveFilter("any_stream")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === "any_stream"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Works From Any Stream
          </button>
          <button
            onClick={() => setActiveFilter("stream_specific")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === "stream_specific"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            <Layers className="w-4 h-4" /> Stream-Specific
          </button>
        </div>

        {/* Search Box */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search careers, exams (e.g. UPSC, NDA, Pilot)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
      </div>

      {/* Grid of Career Goals */}
      {filteredGoals.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center space-y-3">
          <Compass className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No career pathways match your query</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Try broadening your search term or selecting a different filter.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("all");
            }}
            className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((node) => {
            const streamInfo = getStreamRequirementInfo(node);
            const isAnyStream = streamInfo.isAnyStream;

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-500/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Stream Requirement Tag */}
                  <div className="flex items-center justify-between gap-2">
                    {isAnyStream ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Works from any stream
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600/60">
                        <AlertCircle className="w-3.5 h-3.5 text-indigo-500" />
                        {streamInfo.label}
                      </span>
                    )}

                    {node.detail_status === "verified" && (
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Verified</span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {node.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {node.one_line_description || "Detailed pathway with structured eligibility and qualifications."}
                    </p>
                  </div>

                  {/* Key Fact Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                    {node.duration && (
                      <div className="bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Duration</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{node.duration}</span>
                      </div>
                    )}
                    {node.eligibility?.entrance_exam ? (
                      <div className="bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Entrance Exam</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{node.eligibility.entrance_exam}</span>
                      </div>
                    ) : node.typical_qualification ? (
                      <div className="bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Qualification</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{node.typical_qualification}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Bottom Action / Link */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>View Details & Verification</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
