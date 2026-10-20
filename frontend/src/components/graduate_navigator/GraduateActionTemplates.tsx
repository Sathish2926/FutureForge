import React, { useState } from "react";
import { ACTION_TEMPLATES } from "./GraduateNavigatorData";
import { Mail, CheckSquare, FileText, Copy, Check, Sparkles, Send, ShieldCheck, BookmarkCheck } from "lucide-react";

export default function GraduateActionTemplates() {
  const [activeTab, setActiveTab] = useState<"email" | "internship" | "portfolio">("email");
  const [copied, setCopied] = useState(false);

  // Checklist states
  const [internshipChecked, setInternshipChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("cp_graduate_internship_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [portfolioChecked, setPortfolioChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("cp_graduate_portfolio_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleInternship = (id: string) => {
    const updated = { ...internshipChecked, [id]: !internshipChecked[id] };
    setInternshipChecked(updated);
    try {
      localStorage.setItem("cp_graduate_internship_checks", JSON.stringify(updated));
    } catch {}
  };

  const togglePortfolio = (id: string) => {
    const updated = { ...portfolioChecked, [id]: !portfolioChecked[id] };
    setPortfolioChecked(updated);
    try {
      localStorage.setItem("cp_graduate_portfolio_checks", JSON.stringify(updated));
    } catch {}
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        `Subject: ${ACTION_TEMPLATES.coldEmail.subject}\n\n${ACTION_TEMPLATES.coldEmail.body}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  const internshipCompletedCount = Object.values(internshipChecked).filter(Boolean).length;
  const portfolioCompletedCount = Object.values(portfolioChecked).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-indigo-600" />
            Transition Strategies & Actionable Templates
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Proven templates, checklists, and outreach frameworks to bridge the gap between classroom theory and competitive employment.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("email")}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "email" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Outreach Email</span>
          </button>
          <button
            onClick={() => setActiveTab("internship")}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "internship" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Internship Checklist ({internshipCompletedCount}/{ACTION_TEMPLATES.internshipChecklist.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "portfolio" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Portfolio Guide ({portfolioCompletedCount}/{ACTION_TEMPLATES.portfolioChecklist.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Cold Email Template */}
      {activeTab === "email" && (
        <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Appendix Template A
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                {ACTION_TEMPLATES.coldEmail.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {ACTION_TEMPLATES.coldEmail.description}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                copied
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Email</span>
                </>
              )}
            </button>
          </div>

          {/* Email Preview Container */}
          <div className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-4">
            <div className="pb-3 border-b border-slate-200 text-slate-600">
              <span className="font-bold text-slate-900">Subject: </span>
              {ACTION_TEMPLATES.coldEmail.subject}
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 leading-relaxed">
              {ACTION_TEMPLATES.coldEmail.body}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 space-y-1">
            <span className="font-bold">Pro Tip for Undergraduates:</span> Always customize the second paragraph with a specific metric or verified repo. Mentioning an actual product feature of the recipient increases positive reply rates from 6% to over 32%.
          </div>
        </div>
      )}

      {/* Tab 2: Internship Preparation Checklist */}
      {activeTab === "internship" && (
        <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold">
                <CheckSquare className="w-3 h-3 text-purple-600" />
                Appendix Checklist B
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                Internship Preparation & Placement Readiness Checklist
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check off items as you complete them to track your placement preparedness. Progress is saved automatically.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">
                  {internshipCompletedCount} of {ACTION_TEMPLATES.internshipChecklist.length} Completed
                </div>
                <div className="w-32 h-2 rounded-full bg-slate-100 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: `${(internshipCompletedCount / ACTION_TEMPLATES.internshipChecklist.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTION_TEMPLATES.internshipChecklist.map((item) => {
              const isChecked = !!internshipChecked[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleInternship(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? "bg-indigo-50/40 border-indigo-200 text-indigo-950"
                      : "bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <p className={`text-xs leading-relaxed ${isChecked ? "font-semibold text-indigo-900" : ""}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Portfolio Development Checklist */}
      {activeTab === "portfolio" && (
        <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <FileText className="w-3 h-3 text-emerald-600" />
                Appendix Checklist C
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                Portfolio Development & Showcase Quality Guide
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Whether for software GitHub repos, design portfolios, or financial models, ensure your public assets meet industry hiring standards.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">
                  {portfolioCompletedCount} of {ACTION_TEMPLATES.portfolioChecklist.length} Completed
                </div>
                <div className="w-32 h-2 rounded-full bg-slate-100 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{
                      width: `${(portfolioCompletedCount / ACTION_TEMPLATES.portfolioChecklist.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTION_TEMPLATES.portfolioChecklist.map((item) => {
              const isChecked = !!portfolioChecked[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => togglePortfolio(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? "bg-emerald-50/40 border-emerald-200 text-emerald-950"
                      : "bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <p className={`text-xs leading-relaxed ${isChecked ? "font-semibold text-emerald-900" : ""}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
