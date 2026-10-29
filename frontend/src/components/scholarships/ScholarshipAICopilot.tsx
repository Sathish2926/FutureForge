import React, { useState, useEffect } from "react";
import { 
  Sparkles, Send, Bot, User, CheckCircle2, AlertCircle, 
  HelpCircle, FileText, ArrowRight, X 
} from "lucide-react";
import { api } from "../../api/client";

interface AICopilotProps {
  scholarshipId?: number;
  scholarshipName?: string;
  onClose?: () => void;
}

export default function ScholarshipAICopilot({
  scholarshipId,
  scholarshipName,
  onClose
}: AICopilotProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: scholarshipName
        ? `Hello! I'm your FutureForge Scholarship Assistant. Ask me anything about **${scholarshipName}** — such as required documents, how to apply, or why you qualify.`
        : "Hello! I'm your FutureForge Scholarship Assistant. How can I help you find and apply for verified scholarships across India and Tamil Nadu?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

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

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg = queryText.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInputQuery("");
    setLoading(true);

    try {
      if (scholarshipId) {
        const res = await api.explainScholarshipAI(scholarshipId, userMsg);
        setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
      } else {
        // Generic guidance fallback
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "To give you exact rules and required documents, please click **'Eligibility Details'** or **'How to Apply'** on any scholarship card, or complete your 5-step Scholarship Profile."
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble verifying that detail from the official records. Please refer directly to the scheme information link."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col h-[540px] max-h-[calc(100vh-6rem)]">
      {/* Header with prominent Close button */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold font-heading truncate">Scholarship AI Assistant</div>
            <div className="text-[11px] text-white/80 truncate max-w-[210px]">
              {scholarshipName || "Verified Government Guidance"}
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
      {scholarshipId && (
        <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex overflow-x-auto gap-2 hide-scrollbar scrollbar-none shrink-0">
          {[
            "What documents do I need?",
            "How do I apply step by step?",
            "Why am I eligible?",
            "What is the income certificate rule?"
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendQuery(chip)}
              className="text-[11px] font-semibold whitespace-nowrap bg-white text-slate-700 border border-slate-200/80 hover:border-brand-300 hover:text-brand-600 px-3 py-1.5 rounded-full transition shadow-2xs hover:bg-brand-50/40"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                m.role === "user"
                  ? "bg-slate-200 text-slate-700"
                  : "bg-brand-50 text-brand-600 border border-brand-100"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                m.role === "user"
                  ? "bg-brand-500 text-white rounded-tr-none"
                  : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <Bot className="w-4 h-4 animate-spin text-brand-500" />
            <span>Consulting verified scheme guidelines...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuery(inputQuery);
        }}
        className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          className="input-field text-xs py-2 px-3 flex-1"
          placeholder="Ask a question about this scholarship..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="btn-primary text-xs p-2.5 rounded-xl disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
