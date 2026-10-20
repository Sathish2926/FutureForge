import React, { useState, useEffect } from "react";
import { api } from "../../api/client";
import { CatalogNode, MarksProfile } from "./CatalogTypes";
import Screen1TierALanding from "./Screen1TierALanding";
import Screen3TierADrillIn from "./Screen3TierADrillIn";
import Screen4LeafDetail from "./Screen4LeafDetail";
import { Screen5LongTermGoals } from "./Screen5LongTermGoals";
import MarksLayerModal from "./MarksLayerModal";
import Class10CoPilotDrawer, { UiAction } from "./Class10CoPilotDrawer";
import { Loader2, RefreshCw } from "lucide-react";

export const Class10PathwayCatalog: React.FC = () => {
  const [allNodes, setAllNodes] = useState<CatalogNode[]>([]);
  const [tierANodes, setTierANodes] = useState<CatalogNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<"landing" | "drill_in" | "detail" | "goals">("landing");
  const [selectedTierANode, setSelectedTierANode] = useState<CatalogNode | null>(null);
  const [selectedLeafNode, setSelectedLeafNode] = useState<CatalogNode | null>(null);
  const [historyStack, setHistoryStack] = useState<Array<{ screen: "landing" | "drill_in" | "detail" | "goals"; tierA?: CatalogNode | null; leaf?: CatalogNode | null }>>([]);

  // AI Co-Pilot Highlighting & Event Sync
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [lastUserEvent, setLastUserEvent] = useState<{ type: string; node_id?: string; screen?: string; tier_a_id?: string | null } | null>(null);

  // Marks Layer State
  const [marksProfile, setMarksProfile] = useState<MarksProfile | null>(() => {
    try {
      const saved = localStorage.getItem("cp_class10_marks_profile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);

  const fetchCatalog = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: CatalogNode[] = await api.getAllCatalogNodes();
      setAllNodes(data);
      setTierANodes(data.filter((n) => n.tier === "A"));
    } catch (err: any) {
      console.error("Failed to load catalog data:", err);
      setError(err.message || "Failed to load pathway catalog. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleSaveMarksProfile = (profile: MarksProfile | null) => {
    setMarksProfile(profile);
    try {
      if (profile) {
        localStorage.setItem("cp_class10_marks_profile", JSON.stringify(profile));
      } else {
        localStorage.removeItem("cp_class10_marks_profile");
      }
    } catch (e) {
      console.warn("Could not persist marks profile to localStorage", e);
    }
  };

  // Navigation handlers
  const pushState = (screen: "landing" | "drill_in" | "detail" | "goals", tierA?: CatalogNode | null, leaf?: CatalogNode | null) => {
    setHistoryStack((prev) => [...prev, { screen: currentScreen, tierA: selectedTierANode, leaf: selectedLeafNode }]);
    setCurrentScreen(screen);
    if (tierA !== undefined) setSelectedTierANode(tierA);
    if (leaf !== undefined) setSelectedLeafNode(leaf);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTierA = (tierANode: CatalogNode) => {
    setLastUserEvent({ type: "USER_CLICKED_NODE", node_id: tierANode.id, screen: "drill_in", tier_a_id: tierANode.id });
    pushState("drill_in", tierANode, null);
  };

  const handleSelectLeafNode = (leafNode: CatalogNode) => {
    setLastUserEvent({ type: "USER_CLICKED_NODE", node_id: leafNode.id, screen: "detail", tier_a_id: selectedTierANode?.id });
    pushState("detail", selectedTierANode, leafNode);
  };

  const handleNavigateDirectToNodeId = (targetId: string) => {
    const targetNode = allNodes.find((n) => n.id === targetId);
    if (targetNode) {
      const parentNode = targetNode.parent_id ? allNodes.find((n) => n.id === targetNode.parent_id) || null : null;
      setLastUserEvent({ type: "USER_CLICKED_NODE", node_id: targetId, screen: "detail", tier_a_id: parentNode?.id });
      pushState("detail", parentNode, targetNode);
    }
  };

  const handleGoToGoals = () => {
    setLastUserEvent({ type: "USER_OPENED_SCREEN", screen: "goals" });
    pushState("goals", null, null);
  };

  const handleBack = () => {
    if (historyStack.length > 0) {
      const previous = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, prev.length - 1));
      setCurrentScreen(previous.screen);
      setSelectedTierANode(previous.tierA || null);
      setSelectedLeafNode(previous.leaf || null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentScreen("landing");
      setSelectedTierANode(null);
      setSelectedLeafNode(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Execute UI actions dispatched by the AI Co-Pilot
  const handleExecuteUiAction = (action: UiAction) => {
    if (!action || action.type === "NONE") return;

    if (action.highlight_ids && action.highlight_ids.length > 0) {
      setHighlightedNodeIds(action.highlight_ids);
    }

    if (action.type === "NAVIGATE_TO") {
      if (action.leaf_id) {
        const leaf = allNodes.find((n) => n.id === action.leaf_id);
        if (leaf) {
          const parent = leaf.parent_id ? allNodes.find((n) => n.id === leaf.parent_id) || null : null;
          pushState("detail", parent, leaf);
          return;
        }
      }

      if (action.tier_a_id) {
        const tierA = allNodes.find((n) => n.id === action.tier_a_id);
        if (tierA) {
          pushState("drill_in", tierA, null);
          return;
        }
      }

      if (action.screen === "goals") {
        pushState("goals", null, null);
      } else if (action.screen === "landing") {
        setCurrentScreen("landing");
        setSelectedTierANode(null);
        setSelectedLeafNode(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[450px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Loading Class 10 Pathway Catalog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Unable to Load Pathway Catalog</h2>
        <p className="text-sm text-slate-500 max-w-md">{error}</p>
        <button
          onClick={fetchCatalog}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 relative">
      {/* Screen 1: Tier-A Landing */}
      {currentScreen === "landing" && (
        <Screen1TierALanding
          nodes={tierANodes}
          marksProfile={marksProfile}
          highlightedNodeIds={highlightedNodeIds}
          onOpenMarksModal={() => setIsMarksModalOpen(true)}
          onSelectTierA={handleSelectTierA}
          onOpenLongTermGoals={handleGoToGoals}
        />
      )}

      {/* Screen 3: Tier-A Drill-in / Leaf List */}
      {currentScreen === "drill_in" && selectedTierANode && (
        <Screen3TierADrillIn
          parentTierA={selectedTierANode}
          leafNodes={
            selectedTierANode.id === "science_pcmb"
              ? allNodes.filter(
                  (n) => n.tier === "B" && (n.parent_id === "science_pcmb" || n.feeds_from?.includes("science_pcmb"))
                )
              : allNodes.filter((n) => n.parent_id === selectedTierANode.id)
          }
          marksProfile={marksProfile}
          highlightedNodeIds={highlightedNodeIds}
          onSelectLeaf={handleSelectLeafNode}
          onBack={handleBack}
        />
      )}

      {/* Screen 4: Leaf Detail View */}
      {currentScreen === "detail" && selectedLeafNode && (
        <Screen4LeafDetail
          node={selectedLeafNode}
          allNodes={allNodes}
          marksProfile={marksProfile}
          onBack={handleBack}
          onNavigateToNode={handleNavigateDirectToNodeId}
        />
      )}

      {/* Screen 5: Long-Term Goals Cluster */}
      {currentScreen === "goals" && (
        <Screen5LongTermGoals
          nodes={allNodes}
          onSelectNode={(node) => pushState("detail", null, node)}
          onBackToLanding={() => {
            setCurrentScreen("landing");
            setHistoryStack([]);
          }}
        />
      )}

      {/* Marks Layer Modal (Cross-cutting) */}
      <MarksLayerModal
        isOpen={isMarksModalOpen}
        onClose={() => setIsMarksModalOpen(false)}
        marksProfile={marksProfile}
        onSaveMarks={handleSaveMarksProfile}
      />

      {/* AI Pathway Co-Pilot Drawer (Bi-directional Navigation Assistant) */}
      <Class10CoPilotDrawer
        currentScreen={currentScreen}
        currentTierAId={selectedTierANode?.id}
        currentLeafId={selectedLeafNode?.id}
        marksProfile={marksProfile}
        allNodes={allNodes}
        onExecuteUiAction={handleExecuteUiAction}
        onNavigateDirectToNodeId={handleNavigateDirectToNodeId}
        lastUserEvent={lastUserEvent}
      />
    </div>
  );
};

export default Class10PathwayCatalog;
