import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Check, Trophy, Target, ArrowRight, ChevronRight, ChevronLeft, Sparkles, ExternalLink } from "lucide-react";
import { Career, Step, UserRoadmap } from "../../data/roadmapTypes";
import StepTypeBadge from "./StepTypeBadge";
import { getGroupTheme } from "../../data/roadmapTheme";

interface Props {
  career: Career;
  userRoadmap: UserRoadmap;
  selectedStepIndex: number;
  onSelectStepIndex: (index: number) => void;
  onUpdatePosition: (newStepIndex: number) => void;
}

interface NodeCoord {
  index: number;
  cx: number;
  cy: number;
  isFinal: boolean;
}

interface PathSegment {
  fromIndex: number;
  toIndex: number;
  d: string;
  isCompleted: boolean;
  chevron?: {
    x: number;
    y: number;
    rotation: number;
  };
}

export default function RoadmapWindingTrail({
  career,
  userRoadmap,
  selectedStepIndex,
  onSelectStepIndex,
  onUpdatePosition
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [columnsPerRow, setColumnsPerRow] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [segments, setSegments] = useState<PathSegment[]>([]);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const theme = getGroupTheme(career.group);
  const steps = career.steps || [];
  const totalNodesCount = steps.length + 1; // 0 to N-1 are steps, N is destination
  const currentStepIndex = Math.min(userRoadmap.currentStepIndex, steps.length);
  const isGoalReached = currentStepIndex >= steps.length;

  // Responsive column detection
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) {
        setIsMobile(true);
        setColumnsPerRow(1);
      } else if (width < 1024) {
        setIsMobile(false);
        setColumnsPerRow(3);
      } else {
        setIsMobile(false);
        setColumnsPerRow(4);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Goal reach celebration trigger
  useEffect(() => {
    if (isGoalReached) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [isGoalReached]);

  // Auto-scroll current node into view
  useEffect(() => {
    const targetIdx = Math.min(currentStepIndex, totalNodesCount - 1);
    const el = nodeRefs.current[targetIdx];
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [currentStepIndex, totalNodesCount]);

  // Serpentine node placement rows
  // On even rows: left to right (col 0 -> col C-1)
  // On odd rows: right to left (col C-1 -> col 0)
  const rows: Array<Array<{ index: number; step?: Step; isFinal: boolean }>> = [];
  for (let i = 0; i < totalNodesCount; i += columnsPerRow) {
    const chunk: Array<{ index: number; step?: Step; isFinal: boolean }> = [];
    for (let j = 0; j < columnsPerRow && i + j < totalNodesCount; j++) {
      const nodeIndex = i + j;
      if (nodeIndex < steps.length) {
        chunk.push({ index: nodeIndex, step: steps[nodeIndex], isFinal: false });
      } else {
        chunk.push({ index: nodeIndex, isFinal: true });
      }
    }
    rows.push(chunk);
  }

  // Recompute SVG path segments on layout / resize
  const computeSvgPaths = () => {
    if (isMobile || !containerRef.current) {
      setSegments([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const coords: NodeCoord[] = [];

    for (let i = 0; i < totalNodesCount; i++) {
      const nodeEl = nodeRefs.current[i];
      if (nodeEl) {
        const rect = nodeEl.getBoundingClientRect();
        coords.push({
          index: i,
          cx: rect.left + rect.width / 2 - containerRect.left,
          cy: rect.top + rect.height / 2 - containerRect.top,
          isFinal: i === steps.length
        });
      }
    }

    if (coords.length < 2) return;

    const newSegments: PathSegment[] = [];

    for (let i = 0; i < coords.length - 1; i++) {
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const isCompleted = i < currentStepIndex;

      // Check if p1 and p2 are on the same row or row turn
      const dy = Math.abs(p2.cy - p1.cy);

      if (dy < 30) {
        // Horizontal straight segment
        const d = `M ${p1.cx} ${p1.cy} L ${p2.cx} ${p2.cy}`;
        const midX = (p1.cx + p2.cx) / 2;
        const midY = (p1.cy + p2.cy) / 2;
        // Rotation: 0 if left-to-right, 180 if right-to-left
        const rotation = p2.cx > p1.cx ? 0 : 180;

        newSegments.push({
          fromIndex: i,
          toIndex: i + 1,
          d,
          isCompleted,
          chevron: { x: midX, y: midY, rotation }
        });
      } else {
        // Row turn: smooth curved Bézier arc
        const isRightTurn = p1.cx > containerRect.width / 2;
        const arcSpread = 48;
        const cp1x = isRightTurn ? p1.cx + arcSpread : p1.cx - arcSpread;
        const cp2x = isRightTurn ? p2.cx + arcSpread : p2.cx - arcSpread;

        const d = `M ${p1.cx} ${p1.cy} C ${cp1x} ${p1.cy}, ${cp2x} ${p2.cy}, ${p2.cx} ${p2.cy}`;
        const midX = isRightTurn ? p1.cx + arcSpread * 0.75 : p1.cx - arcSpread * 0.75;
        const midY = (p1.cy + p2.cy) / 2;

        newSegments.push({
          fromIndex: i,
          toIndex: i + 1,
          d,
          isCompleted,
          chevron: { x: midX, y: midY, rotation: 90 }
        });
      }
    }

    setSegments(newSegments);
  };

  useLayoutEffect(() => {
    computeSvgPaths();
  }, [columnsPerRow, isMobile, totalNodesCount, currentStepIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      computeSvgPaths();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [columnsPerRow, isMobile, totalNodesCount]);

  return (
    <div id="milestone-trail-section" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-200/80 dark:border-slate-800 shadow-md relative overflow-hidden transition-all">
      {/* Subtle Confetti Celebration on Goal Reached */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden animate-fade-in">
          <div className="absolute top-4 bg-emerald-500 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-4 h-4" /> Goal Reached Celebration!
          </div>
        </div>
      )}

      {/* Header and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <span>Milestone Trail</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {totalNodesCount} Nodes
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Follow the winding trail from educational foundation to full professional qualification.
          </p>
        </div>

        {/* Legend with high contrast dots and icons */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <span>Done</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full ${theme.accentBg} text-white flex items-center justify-center text-[10px] ring-2 ${theme.ringColor} animate-pulse`}>
              ●
            </span>
            <span>You are here</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 flex items-center justify-center text-[9px] font-bold">
              3
            </span>
            <span>Upcoming</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
              ★
            </span>
            <span>Goal</span>
          </span>
        </div>
      </div>

      {/* MOBILE VIEW (<640px): Vertical Timeline with full-width cards */}
      {isMobile ? (
        <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 dark:border-slate-800 ml-3 py-2">
          {Array.from({ length: totalNodesCount }).map((_, idx) => {
            const isFinal = idx === steps.length;
            const step = !isFinal ? steps[idx] : null;
            const isCompleted = isFinal
              ? isGoalReached
              : userRoadmap.completedStepIds?.includes(step?.id || "") || idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isSelected = idx === selectedStepIndex;

            return (
              <div key={idx} className="relative group">
                {/* Timeline node marker on the vertical line */}
                <button
                  type="button"
                  onClick={() => onSelectStepIndex(idx)}
                  aria-label={`${isFinal ? `Destination: ${career.name}` : step?.title}. Status: ${
                    isCompleted ? "Completed" : isCurrent ? "Current" : "Upcoming"
                  }`}
                  className={`absolute -left-[37px] top-4 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950"
                      : isCurrent
                      ? `${theme.accentBg} text-white ring-4 ${theme.ringColor} animate-pulse`
                      : isFinal
                      ? "bg-amber-500 text-white ring-4 ring-amber-100"
                      : "bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isFinal ? <Trophy className="w-4 h-4" /> : isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </button>

                {/* Step Card Beside the line */}
                <div
                  onClick={() => onSelectStepIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-brand-50/80 dark:bg-slate-800 border-brand-400 shadow-md ring-2 ring-brand-300"
                      : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <StepTypeBadge detailKind={isFinal ? "destination" : step?.detailKind} />
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500 text-white">
                        You Are Here
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {isFinal ? `You are a ${career.name}` : step?.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {isFinal ? "Official qualification and professional entry." : step?.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DESKTOP & TABLET VIEW: Serpentine Winding Trail with Continuous SVG */
        <div className="relative py-4" ref={containerRef}>
          {/* Continuous SVG Canvas Behind Nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor={theme.hex} />
              </linearGradient>
            </defs>

            {segments.map((seg, sIdx) => (
              <g key={sIdx}>
                {/* Track Line */}
                <path
                  d={seg.d}
                  fill="none"
                  stroke={seg.isCompleted ? "url(#completedGradient)" : "#cbd5e1"}
                  strokeWidth="4"
                  strokeDasharray={seg.isCompleted ? "none" : "6 6"}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Direction Chevron */}
                {seg.chevron && (
                  <g
                    transform={`translate(${seg.chevron.x}, ${seg.chevron.y}) rotate(${seg.chevron.rotation})`}
                  >
                    <polygon
                      points="-4,-4 2,0 -4,4"
                      fill={seg.isCompleted ? theme.hex : "#94a3b8"}
                    />
                  </g>
                )}
              </g>
            ))}
          </svg>

          {/* Serpentine Grid Nodes */}
          <div className="space-y-24 relative z-10">
            {rows.map((row, rowIndex) => {
              const isReverseRow = rowIndex % 2 === 1;
              // On odd rows, reverse order for snake trail
              const displayNodes = isReverseRow ? [...row].reverse() : row;

              return (
                <div
                  key={rowIndex}
                  className="grid gap-6 items-start"
                  style={{
                    gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))`
                  }}
                >
                  {displayNodes.map((node) => {
                    const isCompleted = node.isFinal
                      ? isGoalReached
                      : userRoadmap.completedStepIds?.includes(node.step?.id || "") || node.index < currentStepIndex;
                    const isCurrent = node.index === currentStepIndex;
                    const isSelected = node.index === selectedStepIndex;
                    const isHovered = node.index === hoveredNodeIndex;

                    const titleText = node.isFinal ? `You are a ${career.name}` : node.step?.title || "";

                    return (
                      <div key={node.index} className="flex flex-col items-center text-center relative group">
                        {/* Circular Node Button */}
                        <div className="relative">
                          <button
                            ref={(el) => {
                              nodeRefs.current[node.index] = el;
                            }}
                            type="button"
                            onClick={() => onSelectStepIndex(node.index)}
                            onMouseEnter={() => setHoveredNodeIndex(node.index)}
                            onMouseLeave={() => setHoveredNodeIndex(null)}
                            aria-label={`Step ${node.index + 1}: ${titleText}. ${
                              isCompleted ? "Completed" : isCurrent ? "Current position" : "Upcoming"
                            }`}
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center font-bold text-sm md:text-base transition-all duration-200 cursor-pointer relative focus:outline-none focus:ring-4 ${theme.ringColor} ${
                              isCompleted
                                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-4 ring-emerald-100 dark:ring-emerald-950 hover:-translate-y-1"
                                : isCurrent
                                ? `${theme.accentBg} text-white shadow-xl shadow-brand-500/30 ring-4 ${theme.ringColor} hover:-translate-y-1 animate-pulse`
                                : node.isFinal
                                ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-100 hover:-translate-y-1"
                                : "bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 hover:-translate-y-1"
                            } ${isSelected ? "ring-4 ring-slate-900 dark:ring-white scale-105" : ""}`}
                          >
                            {node.isFinal ? (
                              <Trophy className="w-7 h-7" />
                            ) : isCompleted ? (
                              <Check className="w-7 h-7 stroke-[3]" />
                            ) : isCurrent ? (
                              <Target className="w-7 h-7" />
                            ) : (
                              <span>{node.index + 1}</span>
                            )}

                            {/* "You are here" Floating Beacon Pin */}
                            {isCurrent && (
                              <span className="absolute -top-4 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap z-20 animate-bounce">
                                You are here
                              </span>
                            )}
                          </button>

                          {/* Hover Tooltip showing full title */}
                          {isHovered && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-2xl z-40 pointer-events-none animate-slide-up text-center">
                              <span className="font-semibold block">{titleText}</span>
                              <span className="text-[10px] text-slate-400 mt-0.5 block">
                                Click to inspect details
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Node Label (Max 3 lines, ~160px width, never truncated) */}
                        <div className="mt-3.5 w-full max-w-[160px] space-y-1.5 flex flex-col items-center">
                          <StepTypeBadge
                            detailKind={node.isFinal ? "destination" : node.step?.detailKind}
                            size="sm"
                          />
                          <h3
                            className={`text-xs font-bold leading-snug line-clamp-3 text-balance ${
                              isCurrent
                                ? "text-brand-700 dark:text-brand-400 font-extrabold"
                                : isCompleted
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {titleText}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
