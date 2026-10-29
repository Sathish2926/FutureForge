import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { api } from "../../api/client";
import { MarksProfile, CatalogNode } from "./CatalogTypes";
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Compass,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Loader2,
  ChevronRight,
  Bot
} from "lucide-react";

export interface UiAction {
  type: "HIGHLIGHT_CARDS" | "NAVIGATE_TO" | "NONE";
  screen?: "landing" | "drill_in" | "detail" | "goals" | null;
  tier_a_id?: string | null;
  leaf_id?: string | null;
  highlight_ids?: string[] | null;
}

export interface CandidateNode {
  id: string;
  name?: string;
  detail_status: "verified" | "partial" | "pending";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  ui_action?: UiAction;
  candidate_nodes?: CandidateNode[];
  quick_replies?: string[];
}

interface Class10CoPilotDrawerProps {
  currentScreen: "landing" | "drill_in" | "detail" | "goals";
  currentTierAId?: string | null;
  currentLeafId?: string | null;
  marksProfile: MarksProfile | null;
  allNodes: CatalogNode[];
  onExecuteUiAction: (action: UiAction) => void;
  onNavigateDirectToNodeId: (nodeId: string) => void;
  lastUserEvent?: { type: string; node_id?: string; screen?: string; tier_a_id?: string | null } | null;
}

export const Class10CoPilotDrawer: React.FC<Class10CoPilotDrawerProps> = ({
  currentScreen,
  currentTierAId,
  currentLeafId,
  marksProfile,
  allNodes,
  onExecuteUiAction,
  onNavigateDirectToNodeId,
  lastUserEvent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimizedMobile, setIsMinimizedMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting turn on first open or mount
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: "initial_greeting",
        sender: "assistant",
        text: "👋 Hi! I'm your **Class 10 Pathway Guide**. I can navigate the catalog with you, explain real subject requirements, and compare pathways based on verified facts.\n\nWhat subjects or careers are you most interested in exploring?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quick_replies: [
          "Technology & Engineering",
          "Medical & Healthcare",
          "Business & CA",
          "Government Exams / UPSC",
          "Practical Hands-on Trades (Diploma / ITI)",
          "Something else — I'll type it",
        ],
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // React to User Manual UI Clicks (UI drives the AI)
  useEffect(() => {
    if (lastUserEvent && isOpen) {
      handleSendEvent(lastUserEvent);
    }
  }, [lastUserEvent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Keyboard shortcut: Press Escape to close assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendEvent = async (eventPayload: any) => {
    setLoading(true);
    try {
      const res = await api.copilotEvent({
        event: eventPayload,
        current_screen: currentScreen,
        current_tier_a_id: currentTierAId,
        current_leaf_id: currentLeafId,
        marks_profile: marksProfile,
      });

      if (res && res.message) {
        const aiMsg: ChatMessage = {
          id: String(Date.now()),
          sender: "assistant",
          text: res.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ui_action: res.ui_action,
          candidate_nodes: res.candidate_nodes,
          quick_replies: res.quick_replies,
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (res.ui_action && res.ui_action.type !== "NONE") {
          onExecuteUiAction(res.ui_action);
        }
      }
    } catch (err) {
      console.warn("Could not process co-pilot event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await api.copilotChat({
        message: text,
        current_screen: currentScreen,
        current_tier_a_id: currentTierAId,
        current_leaf_id: currentLeafId,
        marks_profile: marksProfile,
      });

      if (res) {
        const aiMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: "assistant",
          text: res.message || "Here are the options based on the catalog.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ui_action: res.ui_action,
          candidate_nodes: res.candidate_nodes,
          quick_replies: res.quick_replies,
        };
        setMessages((prev) => [...prev, aiMsg]);

        // Drive UI if action is present
        if (res.ui_action && res.ui_action.type !== "NONE") {
          onExecuteUiAction(res.ui_action);
        }
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "assistant",
        text: "I'm having a slight connection issue retrieving the pathway data. You can continue browsing directly on the page.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply.includes("I'll type it")) {
      const inputEl = document.getElementById("copilot-input");
      inputEl?.focus();
      return;
    }
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Collapsed Trigger Pill / Button (Floating on Bottom Right) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimizedMobile(false);
          }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 transition-all duration-200 border border-indigo-400/40 animate-bounce-subtle"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Ask AI Guide</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </button>
      )}

      {/* Slide-out Drawer Panel (Desktop: Right Drawer, Mobile: Bottom Sheet Overlay) */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex justify-end animate-fade-in">
            {/* Backdrop across full screen */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            />

            <aside
              className="relative z-10 w-full md:w-[420px] lg:w-[460px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full animate-slide-left transition-all duration-300"
            >
              {/* Header with prominent, always-visible Close button */}
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between shrink-0 shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shrink-0 shadow-2xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                      Pathway Co-Pilot
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-300 dark:border-emerald-800 shrink-0">
                        Grounded
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Class 10 Direction & Navigation</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-200/90 hover:bg-slate-300 active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs border border-slate-300/80 dark:border-slate-700"
                    title="Close Assistant"
                    aria-label="Close Assistant"
                  >
                    <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

            {/* If Minimized on Mobile, show compact banner */}
            {isMinimizedMobile ? (
              <div
                onClick={() => setIsMinimizedMobile(false)}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-between cursor-pointer text-xs font-semibold text-indigo-700 dark:text-indigo-300 md:hidden"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  AI Guide active — tap to reopen chat
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            ) : (
              <>
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-2`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/10"
                            : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      {/* Candidate Nodes Mentioned */}
                      {msg.candidate_nodes && msg.candidate_nodes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pl-1 max-w-[95%]">
                          {msg.candidate_nodes.map((cand) => (
                            <button
                              key={cand.id}
                              onClick={() => onNavigateDirectToNodeId(cand.id)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors shadow-2xs"
                            >
                              <Compass className="w-3 h-3 text-indigo-500" />
                              <span>{cand.name || cand.id.replace(/_/g, " ")}</span>
                              {cand.detail_status === "verified" ? (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                              ) : (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">⚠</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quick Reply Chips (Only for latest assistant message) */}
                      {msg.sender === "assistant" &&
                        msg.id === messages[messages.length - 1]?.id &&
                        msg.quick_replies &&
                        msg.quick_replies.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1.5 pl-1 animate-fadeIn">
                            {msg.quick_replies.map((reply, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReply(reply)}
                                disabled={loading}
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all text-left"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit text-xs text-slate-500 dark:text-slate-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      <span>Checking pathway catalog & entry criteria...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Footer */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      id="copilot-input"
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask about streams, exams, reversibility..."
                      className="flex-1 px-3.5 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || loading}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="mt-1.5 text-[10px] text-center text-slate-400">
                    Grounded directly in AICTE, NMC, NTA & DGT official criteria.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>,
        document.body
      )}
    </>
  );
};

export default Class10CoPilotDrawer;
