import { useEffect, useState } from "react";
import {
  ExternalLink, Calendar, Target, Check, AlertTriangle, ArrowRight,
  ChevronLeft, ChevronRight, Info, ShieldCheck, Sparkles, Trophy
} from "lucide-react";
import { Career, Step, UserRoadmap } from "../../data/roadmapTypes";
import StepTypeBadge from "./StepTypeBadge";
import { getGroupTheme } from "../../data/roadmapTheme";

interface Props {
  career: Career;
  userRoadmap: UserRoadmap;
  selectedStepIndex: number;
  onSelectStepIndex: (index: number) => void;
  onUpdatePosition: (newStepIndex: number) => void;
  onToggleStepCompleted: (stepId: string) => void;
}

export default function StepDetailPanel({
  career,
  userRoadmap,
  selectedStepIndex,
  onSelectStepIndex,
  onUpdatePosition,
  onToggleStepCompleted
}: Props) {
  const [animating, setAnimating] = useState(false);

  const theme = getGroupTheme(career.group);
  const steps = career.steps || [];
  const currentStepIndex = Math.min(userRoadmap.currentStepIndex, steps.length);
  const totalNodes = steps.length + 1; // steps + destination

  const isDestinationSelected = selectedStepIndex >= steps.length;
  const activeStep: Step | null = !isDestinationSelected ? steps[selectedStepIndex] : null;

  // Animate briefly on step change
  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 200);
    return () => clearTimeout(t);
  }, [selectedStepIndex]);

  // Global Left/Right arrow key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onSelectStepIndex(Math.max(0, selectedStepIndex - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onSelectStepIndex(Math.min(totalNodes - 1, selectedStepIndex + 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStepIndex, totalNodes, onSelectStepIndex]);

  const isCurrentPosition = selectedStepIndex === currentStepIndex;
  const isStepCompleted = activeStep
    ? userRoadmap.completedStepIds?.includes(activeStep.id) || selectedStepIndex < currentStepIndex
    : currentStepIndex >= steps.length;

  const formatReviewDate = (iso?: string) => {
    if (!iso) return "June 2026";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch {
      return "June 2026";
    }
  };

  return (
    <div className="space-y-4">
      {/* Detail Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md relative overflow-hidden transition-all">
        {/* Navigation Step Arrows Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
              {isDestinationSelected ? "★" : selectedStepIndex + 1}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              {isDestinationSelected ? "Final Goal" : `Milestone ${selectedStepIndex + 1} of ${steps.length}`}
            </span>
            {isCurrentPosition && (
              <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[10px] font-bold uppercase tracking-wider border border-brand-200 dark:border-brand-800">
                Current Position
              </span>
            )}
            {isStepCompleted && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3" /> Done
              </span>
            )}
          </div>

          {/* Stepper Arrow controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectStepIndex(Math.max(0, selectedStepIndex - 1))}
              disabled={selectedStepIndex === 0}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous milestone (Left arrow)"
              title="Previous milestone (Left arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-medium px-1">
              {selectedStepIndex + 1}/{totalNodes}
            </span>
            <button
              type="button"
              onClick={() => onSelectStepIndex(Math.min(totalNodes - 1, selectedStepIndex + 1))}
              disabled={selectedStepIndex >= totalNodes - 1}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next milestone (Right arrow)"
              title="Next milestone (Right arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content with smooth animated transition */}
        <div className={`space-y-5 transition-opacity duration-200 ${animating ? "opacity-40 translate-y-1" : "opacity-100 translate-y-0"}`}>
          {isDestinationSelected ? (
            /* Destination Node Inspector */
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StepTypeBadge detailKind="destination" size="md" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
                You are a {career.name}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                You have fulfilled all sequential entrance examinations, formal accredited degree requirements, practical rotational training, and professional council licensures to enter the field.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onUpdatePosition(steps.length)}
                  className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" /> Mark Goal As Reached
                </button>
              </div>
            </div>
          ) : activeStep ? (
            /* Standard Step Inspector */
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <StepTypeBadge detailKind={activeStep.detailKind} size="md" />
                {activeStep.minAge && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Min Age: {activeStep.minAge} yrs
                  </span>
                )}
                {activeStep.needsVerification && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Needs Verification
                  </span>
                )}
              </div>

              {/* Title (Never truncated!) */}
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
                {activeStep.title}
              </h2>

              {/* Detail text */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 md:p-5 border border-slate-200/60 dark:border-slate-700/60 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeStep.detail}
              </div>

              {/* Metadata row: Official Source & Last Reviewed */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                {activeStep.officialSourceUrl && (
                  <a
                    href={activeStep.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 underline"
                  >
                    <span>Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last reviewed {formatReviewDate(activeStep.lastReviewed)}</span>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row gap-3">
                {isCurrentPosition ? (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleStepCompleted(activeStep.id);
                      onUpdatePosition(selectedStepIndex + 1);
                      if (selectedStepIndex + 1 < totalNodes) {
                        onSelectStepIndex(selectedStepIndex + 1);
                      }
                    }}
                    className="btn-primary flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Mark this step done & Advance →</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onUpdatePosition(selectedStepIndex)}
                    className="btn-primary flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Target className="w-4 h-4" />
                    <span>Move my position here</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onToggleStepCompleted(activeStep.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-semibold border transition-all ${
                    userRoadmap.completedStepIds?.includes(activeStep.id)
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                  }`}
                >
                  {userRoadmap.completedStepIds?.includes(activeStep.id)
                    ? "Mark Incomplete"
                    : "Mark Step Done ✓"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Subtle Standing Regulatory Disclaimer Info Banner */}
      <div className="bg-slate-50 dark:bg-slate-850/80 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Standing Disclaimer:</strong> Exam dates, eligibility criteria, seat quotas, and cut-offs change annually. Always verify requirements on the official authority website before registering or applying.
        </p>
      </div>
    </div>
  );
}
