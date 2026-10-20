import React, { useState, useRef, useEffect } from "react";
import { DegreeCluster, CHATBOT_INTENTS_DATA } from "./GraduateNavigatorData";
import { Degree } from "../../data/degree_guidance/types";
import { EnhancedJobOutcome } from "../../data/degree_guidance/clusterAdapter";
import { Bot, Send, Sparkles, User, RefreshCw, ChevronRight, HelpCircle } from "lucide-react";

interface GraduateAiChatProps {
  currentCluster: DegreeCluster;
  degreeStatus: "pursuing" | "completed";
  degree?: Degree;
  enhancedJobs?: EnhancedJobOutcome[];
  onSelectTab: (tabId: string) => void;
  onSetDegree?: (degreeQuery: string) => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickAction?: { label: string; tabId: string };
}

export default function GraduateAiChat({
  currentCluster,
  degreeStatus,
  degree,
  enhancedJobs = [],
  onSelectTab,
  onSetDegree,
}: GraduateAiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Hello! I am your **FutureForge AI Navigator**. I see you are exploring pathways for **${degree?.name || currentCluster.name}** (${degreeStatus === "pursuing" ? "Currently Pursuing" : "Recent Graduate"}). How can I guide you today?\n\nTip: You can type natural commands like \`set_degree B.Tech Mech\`, \`show careers\`, \`show govt exams\`, \`show roadmap\`, or \`explain Software Engineer\`!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPrompts = [
    { label: "Show Jobs & Careers", query: "show careers" },
    { label: "Show Master's Options", query: "show higher ed" },
    { label: "Eligible Govt Exams", query: "show govt exams" },
    { label: "View Roadmap", query: "show roadmap" },
    { label: "Switch to B.Tech Mech", query: "set_degree B.Tech Mechanical" },
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { sender: "user", text: userText, timestamp: time };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate smart progressive disclosure responses
    setTimeout(() => {
      const lower = userText.toLowerCase().trim();
      let matchedResponse = "";
      let action: { label: string; tabId: string } | undefined;

      // 1. Intent: set_degree [text] or switch degree to [text]
      const setDegreeMatch = lower.match(/^(?:set_degree|set degree|switch to|switch degree to|change degree to)\s+(.+)$/i);
      if (setDegreeMatch && setDegreeMatch[1]) {
        const targetDegreeText = setDegreeMatch[1].trim();
        if (onSetDegree) {
          onSetDegree(targetDegreeText);
          matchedResponse = `✅ I have searched and updated your active degree anchor to **"${targetDegreeText}"**. The career recommendations, government exams, and step-by-step roadmap below have automatically re-synchronized on this page!`;
          action = { label: "View Updated Pathways", tabId: "outcomes" };
        } else {
          matchedResponse = `Degree change requested for **${targetDegreeText}**. Please use the search bar at the top of the page.`;
        }
      }
      // 2. Intent: show careers / show jobs
      else if (lower.includes("show careers") || lower.includes("show jobs") || lower === "careers" || lower === "jobs") {
        onSelectTab("jobs");
        matchedResponse = `Opening the **Jobs & Careers** section below. Here you will find verified direct, bridge, and regulated roles matching **${degree?.shortName || currentCluster.shortTitle}** with salary benchmarks and required skill gaps.`;
        action = { label: "View Jobs & Careers", tabId: "jobs" };
      }
      // 3. Intent: show higher ed / show masters
      else if (lower.includes("show higher ed") || lower.includes("show masters") || lower.includes("higher education") || lower.includes("postgraduate")) {
        onSelectTab("higher_ed");
        matchedResponse = `Displaying **Higher Studies & Master's** pathways below. You can explore relevant PG degrees (M.Tech, M.Sc, MBA, Ph.D) alongside entrance exam eligibility rules and funding options.`;
        action = { label: "Explore Higher Ed", tabId: "higher_ed" };
      }
      // 4. Intent: show govt / show govt exams
      else if (lower.includes("show govt") || lower.includes("government exams") || lower.includes("govt exams") || lower.includes("public sector")) {
        onSelectTab("govt");
        matchedResponse = `Filtering **Government & Public Sector** competitive exams below. All criteria (age limits, category relaxations, and educational requisites) are computed via our deterministic rule engine.`;
        action = { label: "View Govt Exams", tabId: "govt" };
      }
      // 5. Intent: show certs / certifications
      else if (lower.includes("show cert") || lower.includes("certifications") || lower.includes("credentials")) {
        onSelectTab("certs");
        matchedResponse = `Displaying **Industry & Statutory Certifications** below to accelerate your domain credibility and placement prospects.`;
        action = { label: "View Certifications", tabId: "certs" };
      }
      // 6. Intent: show switch / career switch
      else if (lower.includes("show switch") || lower.includes("career switch") || lower.includes("pivot")) {
        onSelectTab("switch");
        matchedResponse = `Opening **Career Switches & Non-Linear Transitions** below. Learn how to bridge your foundational degree skills into high-demand alternative tracks.`;
        action = { label: "View Career Switches", tabId: "switch" };
      }
      // 7. Intent: show roadmap
      else if (lower.includes("show roadmap") || lower.includes("open roadmap") || lower === "roadmap") {
        onSelectTab("roadmap");
        matchedResponse = `Navigating to your **Step-by-Step Personalized Roadmap** (${degreeStatus === "pursuing" ? "Semester-by-Semester Milestones" : "Post-Graduation Career Transition Runway"}).`;
        action = { label: "View Roadmap", tabId: "roadmap" };
      }
      // 8. Intent: explain [role]
      else if (lower.startsWith("explain ") || lower.startsWith("why ")) {
        const queryRole = lower.replace(/^(explain|why)\s+/i, "").replace(/role/i, "").trim();
        const matchedJob = enhancedJobs.find(
          (j) =>
            j.role.toLowerCase().includes(queryRole) ||
            queryRole.includes(j.role.toLowerCase()) ||
            (j.id && j.id.toLowerCase().includes(queryRole))
        );

        if (matchedJob) {
          matchedResponse = `### 🎯 Rationale for **${matchedJob.role}** (${matchedJob.careerType})\n\n` +
            `• **Why it matches:** ${matchedJob.whyAppears}\n` +
            `• **Your Transferable Skills (✓):** ${matchedJob.transferableSkills.slice(0, 4).join(", ")}\n` +
            `• **Target Skills to Build (○):** ${matchedJob.missingSkills.slice(0, 3).join(", ")}\n` +
            `• **Recommended Next Action:** ${matchedJob.suggestedNextAction}\n` +
            `• **Indicative Compensation:** ${matchedJob.salaryRange}`;
          action = { label: `Explore ${matchedJob.role}`, tabId: "jobs" };
        } else {
          matchedResponse = `I looked for **${queryRole}** in the active degree profile. While it may not be a primary direct fit for ${degree?.shortName || currentCluster.shortTitle}, graduates often bridge into related roles via targeted certifications and portfolio projects. Check the **Jobs & Careers** or **Career Switches** tab below for detailed pathways!`;
          action = { label: "View All Careers", tabId: "jobs" };
        }
      }
      // 9. Knowledge Base & General Fallbacks
      else {
        const foundIntent = CHATBOT_INTENTS_DATA.find((intent) =>
          intent.keywords.some((kw) => lower.includes(kw))
        );

        if (foundIntent) {
          matchedResponse = foundIntent.response(currentCluster, degreeStatus);
          if (lower.includes("cert") || lower.includes("skill")) action = { label: "View Skill Ladder", tabId: "skills" };
          else if (lower.includes("higher") || lower.includes("master")) action = { label: "Explore Higher Ed", tabId: "higher_ed" };
          else action = { label: "View Roadmaps & Milestones", tabId: "roadmap" };
        } else {
          matchedResponse = `That's a thoughtful question regarding **${degree?.name || currentCluster.name}**. In our database, graduates who balance strong fundamental coursework with verified project deliverables and 1–2 recognized certifications consistently secure higher placement packages.\n\nYou can explore our step-by-step **Roadmap**, check off the **Internship Checklist**, or view specific entry roles in the **Decision Outcomes** tab!`;
          action = { label: "Explore Roadmaps", tabId: "roadmap" };
        }
      }

      const botMsg: Message = {
        sender: "bot",
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickAction: action,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 350);
  };

  return (
    <div className="card border-slate-200/80 bg-white rounded-3xl shadow-sm flex flex-col h-[560px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Bot className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm font-heading">FutureForge AI Navigator</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-300">Context: {currentCluster.shortTitle} • {degreeStatus === "pursuing" ? "Pursuing" : "Graduate"}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                sender: "bot",
                text: `Reset! Ready to guide your journey for **${currentCluster.name}**. What would you like to explore?`,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
          }}
          className="text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Instant Queries:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all shrink-0 text-[11px] font-medium shadow-2xs whitespace-nowrap"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 text-xs leading-relaxed ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.sender === "bot" && (
              <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] md:max-w-[75%] p-3.5 rounded-2xl ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-xs shadow-sm"
                  : "bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-2xs"
              }`}
            >
              <div className="whitespace-pre-line prose-xs">
                {m.text}
              </div>

              {m.quickAction && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Related view:</span>
                  <button
                    onClick={() => onSelectTab(m.quickAction!.tabId)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
                  >
                    <span>{m.quickAction.label}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div
                className={`text-[9px] mt-1.5 ${
                  m.sender === "user" ? "text-indigo-200 text-right" : "text-slate-400"
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === "user" && (
              <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${currentCluster.shortTitle} career roadmaps, pivots, or salaries...`}
          className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
