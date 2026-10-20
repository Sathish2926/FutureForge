import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Map as MapIcon, RotateCcw, ShieldCheck, Compass, Sparkles, Check
} from "lucide-react";
import { CAREERS } from "../data/careersData";
import { Career, UserRoadmap } from "../data/roadmapTypes";
import {
  loadUserRoadmaps,
  createUserRoadmap,
  updateUserRoadmapProgress,
  renameUserRoadmap,
  deleteUserRoadmap,
  restoreUserRoadmap,
  getActiveRoadmapId,
  setActiveRoadmapId,
  MAX_USER_ROADMAPS
} from "../data/roadmapStore";
import { searchCareers } from "../data/searchUtility";
import RoadmapSearchBox from "../components/roadmap/RoadmapSearchBox";
import RoadmapHeroHeader from "../components/roadmap/RoadmapHeroHeader";
import RoadmapWindingTrail from "../components/roadmap/RoadmapWindingTrail";
import StepDetailPanel from "../components/roadmap/StepDetailPanel";
import MyRoadmapsPanel from "../components/roadmap/MyRoadmapsPanel";
import RoadmapAdminVerification from "../components/roadmap/RoadmapAdminVerification";

interface UndoState {
  deletedRoadmap: UserRoadmap;
  displayName: string;
  timeoutId: any;
}

export default function Roadmap() {
  const location = useLocation();
  const [userRoadmaps, setUserRoadmaps] = useState<UserRoadmap[]>([]);
  const [activeRoadmapIdState, setActiveRoadmapIdState] = useState<string | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAdminRegistry, setShowAdminRegistry] = useState(false);
  const undoTimerRef = useRef<any>(null);

  // Map careers by ID
  const careersMap = useMemo(() => {
    const map = new Map<string, Career>();
    CAREERS.forEach((c: Career) => map.set(c.id, c));
    return map;
  }, []);

  // Initial load
  useEffect(() => {
    const saved = loadUserRoadmaps();
    setUserRoadmaps(saved);

    const lastActiveId = getActiveRoadmapId();
    if (lastActiveId && saved.some((r: UserRoadmap) => r.id === lastActiveId)) {
      setActiveRoadmapIdState(lastActiveId);
    } else if (saved.length > 0) {
      setActiveRoadmapIdState(saved[0].id);
      setActiveRoadmapId(saved[0].id);
    }
  }, []);

  // When active roadmap changes, default selection to current step
  const activeRoadmap = useMemo(() => {
    if (!activeRoadmapIdState) return null;
    return userRoadmaps.find(r => r.id === activeRoadmapIdState) || null;
  }, [userRoadmaps, activeRoadmapIdState]);

  const activeCareer = useMemo(() => {
    if (!activeRoadmap) return null;
    return careersMap.get(activeRoadmap.careerId) || null;
  }, [activeRoadmap, careersMap]);

  useEffect(() => {
    if (activeRoadmap) {
      setSelectedStepIndex(activeRoadmap.currentStepIndex);
    }
  }, [activeRoadmapIdState]);

  // Handle route state from other pages
  useEffect(() => {
    const goalText = (location.state as any)?.goal_text;
    if (goalText && typeof goalText === "string") {
      const matches = searchCareers(goalText, CAREERS);
      if (matches.length > 0) {
        const topCareer = matches[0].career;
        const existing = userRoadmaps.find(r => r.careerId === topCareer.id);
        if (existing) {
          setActiveRoadmapIdState(existing.id);
          setActiveRoadmapId(existing.id);
          setSelectedStepIndex(existing.currentStepIndex);
        } else if (userRoadmaps.length < MAX_USER_ROADMAPS) {
          const res = createUserRoadmap(topCareer.id, goalText !== topCareer.name ? goalText : undefined);
          if (res.roadmap) {
            setUserRoadmaps(loadUserRoadmaps());
            setActiveRoadmapIdState(res.roadmap.id);
            setSelectedStepIndex(res.roadmap.currentStepIndex);
            showToast(`Created roadmap for ${topCareer.name}`);
          }
        }
      }
    }
  }, [location.state]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Create new roadmap
  const handleConfirmCareer = (career: Career, nickname?: string) => {
    const res = createUserRoadmap(career.id, nickname);
    if (res.roadmap) {
      const updated = loadUserRoadmaps();
      setUserRoadmaps(updated);
      setActiveRoadmapIdState(res.roadmap.id);
      setSelectedStepIndex(res.roadmap.currentStepIndex);
      showToast(`Created roadmap for ${career.name}`);
    } else if (res.error) {
      alert(res.error);
    }
  };

  // Switch roadmap
  const handleSelectRoadmap = (id: string) => {
    setActiveRoadmapIdState(id);
    setActiveRoadmapId(id);
    const target = userRoadmaps.find(r => r.id === id);
    if (target) {
      setSelectedStepIndex(target.currentStepIndex);
    }
  };

  // Rename roadmap
  const handleRenameRoadmap = (id: string, newNickname: string) => {
    const updated = renameUserRoadmap(id, newNickname);
    if (updated) {
      setUserRoadmaps(loadUserRoadmaps());
      showToast("Roadmap nickname updated");
    }
  };

  // Delete roadmap with 8-second undo
  const handleDeleteRoadmap = (id: string, displayName: string) => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    const { success, deletedRoadmap } = deleteUserRoadmap(id);
    if (!success || !deletedRoadmap) return;

    const remaining = loadUserRoadmaps();
    setUserRoadmaps(remaining);
    const nextActive = getActiveRoadmapId();
    setActiveRoadmapIdState(nextActive);
    if (nextActive) {
      const nTarget = remaining.find(r => r.id === nextActive);
      if (nTarget) setSelectedStepIndex(nTarget.currentStepIndex);
    }

    const timeoutId = setTimeout(() => {
      setUndoState(null);
    }, 8000);
    undoTimerRef.current = timeoutId;

    setUndoState({
      deletedRoadmap,
      displayName,
      timeoutId
    });
  };

  // Undo delete
  const handleUndoDelete = () => {
    if (!undoState) return;
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    restoreUserRoadmap(undoState.deletedRoadmap);
    const restored = loadUserRoadmaps();
    setUserRoadmaps(restored);
    setActiveRoadmapIdState(undoState.deletedRoadmap.id);
    setSelectedStepIndex(undoState.deletedRoadmap.currentStepIndex);
    setUndoState(null);
    showToast(`Restored ${undoState.displayName} roadmap`);
  };

  // Move position
  const handleUpdatePosition = (newStepIndex: number) => {
    if (!activeRoadmap) return;
    const updated = updateUserRoadmapProgress(activeRoadmap.id, newStepIndex);
    if (updated) {
      setUserRoadmaps(loadUserRoadmaps());
      setSelectedStepIndex(newStepIndex);
    }
  };

  // Toggle step completion
  const handleToggleStepCompleted = (stepId: string) => {
    if (!activeRoadmap) return;
    const currentCompleted = activeRoadmap.completedStepIds || [];
    const isCompleted = currentCompleted.includes(stepId);
    const nextCompleted = isCompleted
      ? currentCompleted.filter((id: string) => id !== stepId)
      : [...currentCompleted, stepId];

    const updated = updateUserRoadmapProgress(
      activeRoadmap.id,
      activeRoadmap.currentStepIndex,
      nextCompleted
    );
    if (updated) {
      setUserRoadmaps(loadUserRoadmaps());
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-7xl mx-auto px-4 md:px-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center shadow-md font-bold shrink-0">
            <MapIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              Career Roadmaps
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified curriculum milestones across {CAREERS.length} careers with step-by-step guidance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdminRegistry(!showAdminRegistry)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              showAdminRegistry
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{showAdminRegistry ? "Hide Registry" : "Verification Registry"}</span>
          </button>
        </div>
      </div>

      {/* Admin Audit & Verification Panel */}
      {showAdminRegistry && (
        <div className="animate-slide-up">
          <RoadmapAdminVerification careers={CAREERS} />
        </div>
      )}

      {/* Hero Search Box */}
      <div className="py-1">
        <RoadmapSearchBox
          careers={CAREERS}
          onConfirmCareer={handleConfirmCareer}
          maxReached={userRoadmaps.length >= MAX_USER_ROADMAPS}
        />
      </div>

      {/* Main Layout: Sidebar + Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Column: My Roadmaps */}
        <div className="w-full xl:w-72 shrink-0 space-y-4">
          <MyRoadmapsPanel
            roadmaps={userRoadmaps}
            careersMap={careersMap}
            activeRoadmapId={activeRoadmapIdState}
            onSelectRoadmap={handleSelectRoadmap}
            onDeleteRoadmap={handleDeleteRoadmap}
            onRenameRoadmap={(id) => {
              const current = userRoadmaps.find(r => r.id === id);
              const name = prompt("Enter new nickname for this roadmap:", current?.nickname || "");
              if (name !== null) {
                handleRenameRoadmap(id, name);
              }
            }}
            onOpenSearch={() => {
              window.scrollTo({ top: 90, behavior: "smooth" });
            }}
          />
        </div>

        {/* Right Content Area: Active Roadmap Hero, Trail, and Detail Panel */}
        <div className="flex-1 min-w-0 space-y-6 w-full">
          {activeRoadmap && activeCareer ? (
            <>
              {/* Hero Header with Segmented Progress */}
              <RoadmapHeroHeader
                career={activeCareer}
                userRoadmap={activeRoadmap}
                selectedStepIndex={selectedStepIndex}
                onSelectStepIndex={(idx) => setSelectedStepIndex(idx)}
                onRenameRoadmap={handleRenameRoadmap}
                onDeleteRoadmap={handleDeleteRoadmap}
                onOpenRegistry={() => setShowAdminRegistry(true)}
              />

              {/* Winding Milestone Trail */}
              <RoadmapWindingTrail
                career={activeCareer}
                userRoadmap={activeRoadmap}
                selectedStepIndex={selectedStepIndex}
                onSelectStepIndex={(idx) => setSelectedStepIndex(idx)}
                onUpdatePosition={handleUpdatePosition}
              />

              {/* Always-Visible Step Detail Panel */}
              <StepDetailPanel
                career={activeCareer}
                userRoadmap={activeRoadmap}
                selectedStepIndex={selectedStepIndex}
                onSelectStepIndex={(idx) => setSelectedStepIndex(idx)}
                onUpdatePosition={handleUpdatePosition}
                onToggleStepCompleted={handleToggleStepCompleted}
              />
            </>
          ) : (
            /* Empty State */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-16 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-slate-800 border border-brand-100 dark:border-slate-700 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-xs">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Search a career to create your first roadmap
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                Type any destination career above (e.g. <em>Doctor, Chartered Accountant, Software Engineer, Pilot</em>) to map your exact entrance exams, degree pathways, and professional licensure.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating 8-Second Undo Toast */}
      {undoState && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up">
          <div className="text-xs">
            <span className="font-semibold block">{undoState.displayName} roadmap deleted.</span>
            <span className="text-slate-400 text-[11px]">Will be removed permanently in a few seconds.</span>
          </div>
          <button
            type="button"
            onClick={handleUndoDelete}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Undo
          </button>
        </div>
      )}

      {/* General Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-slide-up text-xs font-medium">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
