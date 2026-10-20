import { useState, useRef, useEffect } from "react";
import {
  ExternalLink, MoreVertical, Edit2, Trash2, ShieldCheck, Trophy, ArrowRight,
  Sparkles, Check, Info, Compass
} from "lucide-react";
import { Career, UserRoadmap } from "../../data/roadmapTypes";
import { getGroupTheme } from "../../data/roadmapTheme";

interface Props {
  career: Career;
  userRoadmap: UserRoadmap;
  selectedStepIndex: number;
  onSelectStepIndex: (index: number) => void;
  onRenameRoadmap: (roadmapId: string, newNickname: string) => void;
  onDeleteRoadmap: (roadmapId: string, name: string) => void;
  onOpenRegistry: () => void;
}

export default function RoadmapHeroHeader({
  career,
  userRoadmap,
  selectedStepIndex,
  onSelectStepIndex,
  onRenameRoadmap,
  onDeleteRoadmap,
  onOpenRegistry
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(userRoadmap.nickname || "");
  const [showVerifyPopover, setShowVerifyPopover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const theme = getGroupTheme(career.group);
  const steps = career.steps || [];
  const currentStepIndex = Math.min(userRoadmap.currentStepIndex, steps.length);
  const isGoalReached = currentStepIndex >= steps.length;

  const completedCount = steps.filter((s, idx) =>
    userRoadmap.completedStepIds?.includes(s.id) || idx < currentStepIndex
  ).length;

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((completedCount / steps.length) * 100))
  );

  // Next up step
  const nextStep = !isGoalReached ? steps[currentStepIndex] : null;

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowVerifyPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    onRenameRoadmap(userRoadmap.id, nicknameInput.trim());
    setIsRenameModalOpen(false);
  };

  const displayName = userRoadmap.nickname || career.name;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md transition-all">
      {/* Top row: Title, Badges, Kebab menu */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-start gap-4">
          {/* Accent Tile with Career Icon */}
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-md ${theme.tileBg} ${theme.tileText}`}
          >
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 min-w-0">
            {/* Group badge and Verification chip */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
              >
                {career.group}
              </span>

              {/* Verified chip with popover */}
              <div className="relative" ref={popoverRef}>
                <button
                  type="button"
                  onClick={() => setShowVerifyPopover(!showVerifyPopover)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                  title="Click to view verification details"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified {career.lastReviewed}</span>
                </button>

                {showVerifyPopover && (
                  <div className="absolute left-0 top-full mt-2 w-72 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-30 text-xs space-y-2 animate-scale-up">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Curriculum & Audit Details
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 space-y-1">
                      <div>Authority: <strong>{career.sourceDomain}</strong></div>
                      <div>Review Owner: <strong>{career.reviewOwner}</strong></div>
                      <div>Cycle: <strong>Annual 2026 Audit (Valid)</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowVerifyPopover(false);
                        onOpenRegistry();
                      }}
                      className="text-brand-600 dark:text-brand-400 font-bold hover:underline block pt-1"
                    >
                      Open Full Audit Registry →
                    </button>
                  </div>
                )}
              </div>

              {/* Official Source link */}
              {career.sourceDomain && (
                <a
                  href={`https://${career.sourceDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 hover:border-brand-200 transition-colors"
                >
                  <span>{career.sourceDomain}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}
            </div>

            {/* Large Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              {displayName}
            </h1>
            {userRoadmap.nickname && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target Pathway: <span className="font-semibold text-slate-700 dark:text-slate-300">{career.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions Kebab Menu */}
        <div className="relative shrink-0 self-start" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Roadmap actions menu"
            aria-expanded={isMenuOpen}
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-30 animate-slide-up text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsRenameModalOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Rename Roadmap</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDeleteRoadmap(userRoadmap.id, displayName);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Roadmap</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              Current Journey Progress
            </span>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {isGoalReached ? "Goal Reached!" : `Step ${currentStepIndex + 1} of ${steps.length}`}
              </span>
              <span className={`text-base font-bold ${theme.accentText}`}>
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>{completedCount} milestones cleared</span>
            <span className="mx-1.5">•</span>
            <span>{Math.max(0, steps.length - completedCount)} remaining</span>
          </div>
        </div>

        {/* Segmented Progress Bar (one clickable segment per step) */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Roadmap completion progress"
          className="grid gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, idx) => {
            const isCompleted = userRoadmap.completedStepIds?.includes(step.id) || idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isSelected = idx === selectedStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStepIndex(idx)}
                aria-label={`Step ${idx + 1}: ${step.title}. ${isCompleted ? "Completed" : isCurrent ? "Current step" : "Upcoming"}`}
                className={`h-3 rounded-xl transition-all duration-300 relative group cursor-pointer focus:outline-none focus:ring-2 ${theme.ringColor} ${
                  isCompleted
                    ? "bg-emerald-500 dark:bg-emerald-600 shadow-xs"
                    : isCurrent
                    ? `${theme.progressFill} animate-pulse shadow-sm`
                    : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
                } ${isSelected ? "ring-2 ring-slate-900 dark:ring-white" : ""}`}
                title={`Step ${idx + 1}: ${step.title}`}
              />
            );
          })}
        </div>

        {/* "Next Up" Immediate Action Callout */}
        {nextStep ? (
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-xs ${theme.accentBg}`}>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <div className="truncate">
                <span className="font-bold text-slate-500 dark:text-slate-400 mr-1.5 uppercase tracking-wider text-[10px]">
                  Next Up:
                </span>
                <span className="font-bold text-slate-900 dark:text-white truncate">
                  {nextStep.title}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectStepIndex(currentStepIndex)}
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline shrink-0 text-xs"
            >
              View Step →
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-3.5 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
            <Trophy className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              All roadmap milestones completed. You have unlocked destination readiness!
            </span>
          </div>
        )}
      </div>

      {/* Rename Roadmap Modal */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-scale-up">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Rename Roadmap
            </h3>
            <form onSubmit={handleSaveRename} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Roadmap Nickname
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder="e.g. Plan A, Target 2026"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRenameModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-4 text-xs font-semibold"
                >
                  Save Nickname
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
