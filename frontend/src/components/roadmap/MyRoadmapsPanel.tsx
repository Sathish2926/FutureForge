import { useState, useRef, useEffect } from "react";
import { Plus, Compass, MoreVertical, Edit2, Trash2, Clock, Sparkles } from "lucide-react";
import { Career, UserRoadmap } from "../../data/roadmapTypes";
import { calculateProgressPercent, MAX_USER_ROADMAPS } from "../../data/roadmapStore";
import { formatRelativeTime, getGroupTheme } from "../../data/roadmapTheme";

interface Props {
  roadmaps: UserRoadmap[];
  careersMap: Map<string, Career>;
  activeRoadmapId: string | null;
  onSelectRoadmap: (id: string) => void;
  onDeleteRoadmap: (id: string, name: string) => void;
  onRenameRoadmap: (id: string, currentName: string) => void;
  onOpenSearch: () => void;
}

// Mini SVG Circular Progress Ring
function ProgressRing({ percent, strokeColor = "#2563eb", size = 26, strokeWidth = 3 }: { percent: number; strokeColor?: string; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>
    </div>
  );
}

export default function MyRoadmapsPanel({
  roadmaps,
  careersMap,
  activeRoadmapId,
  onSelectRoadmap,
  onDeleteRoadmap,
  onRenameRoadmap,
  onOpenSearch
}: Props) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    function handleOutsideClick() {
      setActiveMenuId(null);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="space-y-4">
      {/* MOBILE & TABLET HORIZONTAL SWITCHER (< xl) */}
      <div className="block xl:hidden bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs font-bold font-heading text-slate-900 dark:text-white flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>My Roadmaps</span>
            <span className="text-[10px] text-slate-400 font-normal">({roadmaps.length}/{MAX_USER_ROADMAPS})</span>
          </span>
          <button
            type="button"
            onClick={onOpenSearch}
            disabled={roadmaps.length >= MAX_USER_ROADMAPS}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1 disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" /> New
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {roadmaps.map((r) => {
            const career = careersMap.get(r.careerId);
            const displayName = r.nickname || career?.name || "Roadmap";
            const isActive = r.id === activeRoadmapId;
            const theme = getGroupTheme(career?.group);
            const totalSteps = career?.steps?.length || 6;
            const progress = calculateProgressPercent(r.currentStepIndex, totalSteps, r.completedStepIds?.length || 0);

            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelectRoadmap(r.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md dark:bg-brand-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                <ProgressRing percent={progress} strokeColor={isActive ? "#ffffff" : theme.hex} size={20} strokeWidth={2.5} />
                <span className="truncate max-w-[130px]">{displayName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP SIDEBAR PANEL (>= xl) */}
      <div className="hidden xl:block bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
        {/* Title row on one single line with count badge */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white font-heading text-base whitespace-nowrap">
              My roadmaps
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              {roadmaps.length}/{MAX_USER_ROADMAPS}
            </span>
          </div>
        </div>

        {/* Full-width "New roadmap" button with plus icon and NO text wrapping */}
        <button
          type="button"
          onClick={onOpenSearch}
          disabled={roadmaps.length >= MAX_USER_ROADMAPS}
          className="btn-primary w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-sm disabled:opacity-50 cursor-pointer"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">New roadmap</span>
        </button>

        {roadmaps.length === 0 ? (
          <div className="text-center py-10 px-4 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Search a career to create your first roadmap
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
            {roadmaps.map((r) => {
              const career = careersMap.get(r.careerId);
              const careerName = career?.name || r.careerId;
              const displayName = r.nickname || careerName;
              const isActive = r.id === activeRoadmapId;
              const theme = getGroupTheme(career?.group);
              const totalSteps = career?.steps?.length || 6;
              const progress = calculateProgressPercent(r.currentStepIndex, totalSteps, r.completedStepIds?.length || 0);
              const isMenuOpen = activeMenuId === r.id;

              return (
                <div
                  key={r.id}
                  onClick={() => onSelectRoadmap(r.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isActive
                      ? "bg-brand-50/80 dark:bg-slate-800/90 border-brand-300 dark:border-brand-700 shadow-sm border-l-4 border-l-brand-600"
                      : "bg-slate-50/70 dark:bg-slate-850 border-slate-200/70 dark:border-slate-800 hover:bg-slate-100/70 hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Header: Title + Progress Ring + Kebab */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 pr-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={displayName}>
                          {displayName}
                        </h4>
                        {r.nickname && (
                          <span className="text-[10px] text-slate-400 block truncate">
                            {careerName}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <ProgressRing percent={progress} strokeColor={theme.hex} size={24} strokeWidth={3} />

                        {/* Kebab Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(isMenuOpen ? null : r.id);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 opacity-80 group-hover:opacity-100 transition-opacity focus:opacity-100 cursor-pointer"
                            aria-label={`Options for ${displayName}`}
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {isMenuOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-30 text-xs animate-slide-up"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onRenameRoadmap(r.id, displayName);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 font-medium"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Rename</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onDeleteRoadmap(r.id, displayName);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-1.5 font-medium"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step progress & relative time footer */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Step {Math.min(r.currentStepIndex + 1, totalSteps)} of {totalSteps}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {formatRelativeTime(r.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
