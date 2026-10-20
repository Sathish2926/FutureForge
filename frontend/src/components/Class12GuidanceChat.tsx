import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import {
  Sparkles,
  Send,
  Compass,
  GraduationCap,
  Briefcase,
  Award,
  Lightbulb,
  Palette,
  Globe,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Check,
  Zap,
} from "lucide-react";

interface StructuredRec {
  path_category?: string;
  title: string;
  why_this_fits: string;
  fit_confidence?: "low" | "medium" | "high";
  specializations?: string[] | null;
  realistic_requirements?: string;
  next_action_this_week?: string;
  alt_path?: string | null;
}

interface SignalState {
  stream?: string | null;
  subject_affinity?: string | null;
  enjoyed_or_disliked?: string | null;
  work_style?: string | null;
  motivation_or_constraint?: string | null;
  signals_captured_count?: number;
  threshold_met?: boolean;
}

interface StructuredData {
  reply_to_student?: string;
  signal_state?: SignalState;
  signal_summary?: {
    captured_signals?: string[];
    open_signals?: string[];
    confidence?: string;
  };
  flags?: {
    off_scope?: boolean;
    needs_human_support?: boolean;
    contradiction_detected?: boolean;
    is_followup_on_existing_recommendations?: boolean;
  };
  recommendations?: StructuredRec[];
  priority_pick?: string | null;
  next_step?: {
    type?: "question" | "action";
    content?: string;
    quick_replies?: string[];
  };
  blocks?: any[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  structured?: StructuredData;
}

const CATEGORY_META: Record<string, { label: string; icon: any; color: string; badge: string }> = {
  degree: {
    label: "Traditional Degree",
    icon: GraduationCap,
    color: "from-blue-600 to-indigo-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  skill_vocational: {
    label: "Skill / Vocational / Diploma",
    icon: Briefcase,
    color: "from-amber-600 to-orange-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  government_exam: {
    label: "Govt / Competitive Exam",
    icon: Award,
    color: "from-emerald-600 to-teal-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  entrepreneurship: {
    label: "Entrepreneurship & Trade",
    icon: Lightbulb,
    color: "from-purple-600 to-pink-600",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  creative_sports: {
    label: "Creative, Media & Arts",
    icon: Palette,
    color: "from-rose-600 to-red-600",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  study_abroad: {
    label: "Study Abroad",
    icon: Globe,
    color: "from-cyan-600 to-blue-600",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  structured_exploration: {
    label: "Structured Gap / Trial Path",
    icon: HelpCircle,
    color: "from-slate-600 to-slate-800",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

const INITIAL_QUICK_REPLIES = [
  "I studied Science (PCMB)",
  "I took Science (PCM / CS)",
  "I took Science (PCB)",
  "I studied Commerce with Maths",
  "I took Commerce without Maths",
  "I studied Humanities / Arts",
  "Something else — I'll type it",
];

export default function Class12GuidanceChat({ onReset }: { onReset?: () => void }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content:
        "Hello! I am your FutureForge Career Guide for Class 12.\n\n" +
        "Instead of generic quizzes, we discover what genuinely fits you across 7 full pathways: degrees, vocational skill diplomas, competitive & defense exams, entrepreneurship, creative arts, and study abroad.\n\n" +
        "To get started, tell me: which stream did you take in 12th, or tap one of the quick options below?",
      structured: {
        next_step: {
          type: "question",
          content: "Which stream did you study in 12th?",
          quick_replies: INITIAL_QUICK_REPLIES,
        },
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [convId, setConvId] = useState<number | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  // Extract latest signal state across conversation
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const latestSignalState = lastAssistantMsg?.structured?.signal_state;
  const currentQuickReplies =
    lastAssistantMsg?.structured?.next_step?.quick_replies || INITIAL_QUICK_REPLIES;

  async function handleSend(textToSend?: string) {
    const text = (textToSend !== undefined ? textToSend : input).trim();
    if (!text || sending) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await api.chat(text, convId, "class12");
      setConvId(res.conversation_id);

      const assistantMsg: ChatMessage = {
        id: "msg_ai_" + Date.now(),
        role: "assistant",
        content: res.reply,
        structured: res.structured,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          role: "assistant",
          content:
            "I ran into an issue connecting to the guidance service. Please check your network and try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleQuickReplyClick(chip: string) {
    if (chip.toLowerCase().includes("something else") || chip.toLowerCase().includes("type it")) {
      inputRef.current?.focus();
      return;
    }
    handleSend(chip);
  }

  function handleRestart() {
    setMessages([
      {
        id: "initial_reset_" + Date.now(),
        role: "assistant",
        content:
          "Ready for a fresh start! Which stream did you study in 12th, or what kind of career direction are you curious about?",
        structured: {
          next_step: {
            type: "question",
            content: "Which stream did you study in 12th?",
            quick_replies: INITIAL_QUICK_REPLIES,
          },
        },
      },
    ]);
    setConvId(undefined);
    setInput("");
    if (onReset) onReset();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner & Signal Calibration Meter */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> 12th-Completed Adaptive Guide
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading">
              FutureForge Post-12th Career Guide
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-2xl">
              Conversational guidance scanning 7 pathways with memory retention and signal calibration.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="self-start md:self-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Guide
          </button>
        </div>

        {/* Live Signal Discovery Bar */}
        {latestSignalState && (
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">
                Signal Calibration:
              </span>
              <span className="font-bold px-2 py-0.5 rounded-full bg-white/10 text-indigo-300">
                {latestSignalState.signals_captured_count || 0} / 3 Signals
              </span>
            </div>

            {latestSignalState.stream && (
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-medium">
                Stream: {latestSignalState.stream}
              </span>
            )}

            {latestSignalState.threshold_met ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Check className="w-3 h-3" /> Threshold Met • Recommendations Ready
              </span>
            ) : (
              <span className="text-amber-300 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Gathering signals (at least 3 needed before unlocking recommendations)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div className="card p-0 flex flex-col h-[700px] overflow-hidden border-slate-200/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] bg-white rounded-3xl">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/40">
          {messages.map((m) => {
            const isUser = m.role === "user";
            const s = m.structured;
            const recs = s?.recommendations || [];

            return (
              <div key={m.id} className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                    isUser
                      ? "bg-slate-900 text-white"
                      : "bg-gradient-to-br from-indigo-600 to-brand-700 text-white"
                  }`}
                >
                  {isUser ? <GraduationCap className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                </div>

                <div className="space-y-4 max-w-[88%] md:max-w-[80%]">
                  {/* Text bubble */}
                  <div
                    className={`text-[15px] md:text-base leading-relaxed px-6 py-4 rounded-2xl whitespace-pre-wrap shadow-sm ${
                      isUser
                        ? "bg-brand-600 text-white rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>

                  {/* Priority Pick Banner */}
                  {s?.priority_pick && (
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 text-amber-950 flex items-start gap-3 shadow-sm animate-fade-in">
                      <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                          Priority Pick
                        </div>
                        <p className="text-sm font-semibold mt-0.5">{s.priority_pick}</p>
                      </div>
                    </div>
                  )}

                  {/* Structured Recommendation Cards (Only shown when threshold met & recs exist) */}
                  {recs.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                        Synthesized Pathways ({recs.length})
                      </div>
                      <div className="grid grid-cols-1 gap-3.5">
                        {recs.map((rec, idx) => {
                          const cat = rec.path_category || "degree";
                          const meta = CATEGORY_META[cat] || CATEGORY_META.degree;
                          const Icon = meta.icon;

                          return (
                            <div
                              key={idx}
                              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    <span
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.badge}`}
                                    >
                                      <Icon className="w-3.5 h-3.5" />
                                      {meta.label}
                                    </span>
                                    {rec.fit_confidence && (
                                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                        {rec.fit_confidence} confidence
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                                    {rec.title}
                                  </h4>
                                </div>

                                <button
                                  onClick={() =>
                                    navigate("/roadmap", { state: { goal_text: rec.title } })
                                  }
                                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 shrink-0"
                                >
                                  Roadmap <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="text-sm text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100 leading-relaxed">
                                <span className="font-semibold text-slate-900">Why this fits you: </span>
                                {rec.why_this_fits}
                              </div>

                              {rec.specializations && rec.specializations.length > 0 && (
                                <div className="space-y-1.5 pt-0.5">
                                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                    Target Specializations
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {rec.specializations.map((spec, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className="px-2.5 py-1 rounded-lg bg-indigo-50/90 text-indigo-700 border border-indigo-200/70 text-xs font-semibold"
                                      >
                                        {spec}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {rec.alt_path && (
                                <div className="text-xs text-amber-900 bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2.5">
                                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div className="space-y-0.5">
                                    <span className="font-bold text-amber-800">Alternative Fast-Track / Non-Degree Route: </span>
                                    <span>{rec.alt_path}</span>
                                  </div>
                                </div>
                              )}

                              {rec.realistic_requirements && (
                                <div className="text-xs text-slate-600 flex items-start gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-slate-700">Requirements: </strong>
                                    {rec.realistic_requirements}
                                  </span>
                                </div>
                              )}

                              {rec.next_action_this_week && (
                                <div className="text-xs text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 p-2.5 rounded-xl flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold">Next action this week: </span>
                                    {rec.next_action_this_week}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Next Step Question / Action Callout */}
                  {s?.next_step && s.next_step.content && (
                    <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 text-indigo-950 text-sm">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                        {s.next_step.type === "question" ? "Next Exploration Step" : "Action Step"}
                      </div>
                      <p className="font-medium">{s.next_step.content}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {sending && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-brand-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Compass className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-tl-sm flex gap-2.5 items-center shadow-sm text-slate-500 text-sm">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="font-medium ml-1">Scanning pathway landscape & synthesizing signals...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Contextual Quick-Reply Chips */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-100 space-y-3.5">
          {/* Quick Reply Chips (Per Quick-Reply Rule) */}
          {currentQuickReplies && currentQuickReplies.length > 0 && !sending && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Tap a quick reply:
              </div>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pt-0.5">
                {currentQuickReplies.map((chip, idx) => {
                  const isOther =
                    chip.toLowerCase().includes("something else") ||
                    chip.toLowerCase().includes("type it");
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickReplyClick(chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs text-left ${
                        isOther
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 italic"
                          : "bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 border-indigo-200/80 hover:border-indigo-300"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Text Input */}
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-[15px] font-medium placeholder:text-slate-400"
              placeholder="Type your response or question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={sending}
            />
            <button
              className="absolute right-2 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:active:scale-100 active:scale-95 shadow-sm"
              onClick={() => handleSend()}
              disabled={sending || !input.trim()}
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
