import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  X,
  Compass,
  Layers,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { api } from "../api/client";

interface ProfessionalAICopilotProps {
  profile?: any;
  activePlan?: any;
  onClose?: () => void;
  onNavigateTab?: (tab: "overview" | "skill_gap" | "explore" | "resources" | "checklist") => void;
}

interface Message {
  sender: "user" | "assistant";
  text: string;
  source?: string;
  timestamp?: string;
  quickAction?: { label: string; tab: "overview" | "skill_gap" | "explore" | "resources" | "checklist" };
}

export default function ProfessionalAICopilot({
  profile,
  activePlan,
  onClose,
  onNavigateTab,
}: ProfessionalAICopilotProps) {
  const currentTitle = profile?.current_job_title || "Working Professional";
  const targetRole = activePlan?.target_role || profile?.target_role || "Career Growth";
  const weeklyHours = profile?.weekly_learning_hours ?? 5;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: `Hello! I am your **FutureForge Career Transition Advisor**. I see you are working as a **${currentTitle}** targeting **${targetRole}** with a commitment of **${weeklyHours} hours/week**.\n\nAsk me anything about your skill gaps, transferable skills, how to schedule your weekly learning time, or how to target promotions!`,
      source: "FutureForge Career Knowledge Base",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isDoctor =
    currentTitle.toLowerCase().includes("doctor") ||
    currentTitle.toLowerCase().includes("physician") ||
    currentTitle.toLowerCase().includes("mbbs") ||
    currentTitle.toLowerCase().includes("clinic") ||
    currentTitle.toLowerCase().includes("medical");

  const quickChips = isDoctor
    ? [
        "I'm currently a doctor, what can I switch to?",
        "Which non-clinical healthcare roles fit me?",
        "Can I switch to clinical research (CRA) or MSL?",
        "Which of my clinical skills are transferable?",
        `How to balance ${weeklyHours} hrs/week?`,
        "Explain my transition roadmap",
      ]
    : [
        "What can I switch my career to?",
        "Why was this role recommended for me?",
        "Which of my skills are transferable?",
        `How to balance ${weeklyHours} hrs/week?`,
        "What are my biggest skill gaps?",
        "How should I approach a promotion?",
        "Explain my roadmap milestones",
      ];

  const renderFormattedText = (rawText: string) => {
    const paragraphs = rawText.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      const lines = para.split("\n");
      return (
        <div key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
          {lines.map((line, lIdx) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
            const isNumber = /^\d+\.\s/.test(line.trim());
            return (
              <div
                key={lIdx}
                className={`${isBullet || isNumber ? "pl-2 py-0.5" : ""} leading-relaxed`}
              >
                {parts.map((part, partIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={partIdx} className="font-bold text-slate-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return <span key={partIdx}>{part}</span>;
                })}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg = queryText.trim();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { sender: "user", text: userMsg, timestamp: time }]);
    setInputQuery("");
    setLoading(true);

    try {
      const lower = userMsg.toLowerCase();
      let quickAction: Message["quickAction"] = undefined;

      if (lower.includes("show roadmap") || lower.includes("view roadmap") || lower.includes("open roadmap")) {
        quickAction = { label: "Open Roadmap", tab: "overview" };
      } else if (lower.includes("skill gap") || lower.includes("missing skills")) {
        quickAction = { label: "Open Skill Gap Analyzer", tab: "skill_gap" };
      } else if (lower.includes("recommend") || lower.includes("other career") || lower.includes("pathway") || lower.includes("switch")) {
        quickAction = { label: "Explore Recommendations", tab: "explore" };
      } else if (lower.includes("resource") || lower.includes("course") || lower.includes("material")) {
        quickAction = { label: "Browse Learning Resources", tab: "resources" };
      } else if (lower.includes("checklist") || lower.includes("resume") || lower.includes("linkedin")) {
        quickAction = { label: "View Transition Checklist", tab: "checklist" };
      }

      const res = await api.queryProfessionalAssistant(userMsg, activePlan?.id);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: res.reply,
          source: res.source || "FutureForge Career Engine",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickAction,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "I experienced a temporary issue accessing the career knowledge base. Please try rephrasing your question.",
          source: "Assistant Error",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col h-[560px] max-h-[calc(100vh-6rem)] transition-all">
      {/* Header (Matching Scholarship Copilot Gradient with Professional Theme) */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold font-heading truncate">Career AI Copilot</div>
            <div className="text-[11px] text-white/85 truncate max-w-[210px]">
              {currentTitle} → {targetRole}
            </div>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-white transition text-xs font-bold shrink-0 ml-2 shadow-xs border border-white/20"
            title="Close Assistant"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        )}
      </div>

      {/* Suggested Query Chips */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex overflow-x-auto gap-1.5 hide-scrollbar scrollbar-none shrink-0">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => sendQuery(chip)}
            className="text-[11px] font-semibold whitespace-nowrap bg-white text-slate-700 border border-slate-200/90 hover:border-emerald-300 hover:text-emerald-700 px-3 py-1.5 rounded-full transition shadow-2xs hover:bg-emerald-50/50"
          >
            💡 {chip}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 overflow-y-auto flex-1 space-y-3.5 bg-slate-50/50 custom-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                m.sender === "user"
                  ? "bg-slate-200 text-slate-700"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
              }`}
            >
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                m.sender === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none shadow-sm"
                  : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-xs"
              }`}
            >
              {m.sender === "user" ? <div>{m.text}</div> : renderFormattedText(m.text)}

              {/* Action Button inside Bot Message */}
              {m.quickAction && onNavigateTab && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab(m.quickAction!.tab);
                      if (onClose) onClose();
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 transition"
                  >
                    <span>{m.quickAction.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Grounded Source Tag */}
              {m.source && (
                <div className="text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>{m.source}</span>
                  {m.timestamp && <span>{m.timestamp}</span>}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 p-2 bg-white/70 rounded-xl border border-slate-200 w-fit">
            <Bot className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Consulting verified career pathways & skill frameworks...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuery(inputQuery);
        }}
        className="p-3 border-t border-slate-200/90 bg-white flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          className="input-field text-xs py-2 px-3 flex-1 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
          placeholder="Ask about skill gaps, weekly schedule, or promotion..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="btn-primary text-xs p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition shadow-sm"
          title="Send Query"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
