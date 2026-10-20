import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Rocket, Sparkles } from "lucide-react";

const STAGE_QUESTIONS: Record<string, string[]> = {
  class10: ["Favorite subjects", "What do you enjoy doing outside class?", "Preferred career area (if any)"],
  class12: ["Stream (PCM/PCB/Commerce/Arts)", "Entrance exams you're considering", "Preferred degree"],
  ug: ["Degree & branch", "Skills you already have", "Target job or higher study"],
  professional: ["Current role & industry", "Years of experience", "Target role you're aiming for"],
};

const STAGE_ICONS: Record<string, any> = {
  class10: BookOpen,
  class12: GraduationCap,
  ug: Rocket,
  professional: Briefcase,
};

export default function Onboarding() {
  const [stage, setStage] = useState<string>("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function finish() {
    setSaving(true);
    try {
      await api.updateProfile({
        name,
        state,
        education_stage: stage,
        interests: Object.values(answers).filter(Boolean).slice(0, 3),
      });
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  if (!stage) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center max-w-3xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Let's set up your profile</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            First, where are you in your education journey? This decides which questions we ask next — no generic 30-question forms here.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {[
            ["class10", "Class 10", "Starting your journey"],
            ["class12", "Class 11/12", "Preparing for higher ed"],
            ["ug", "Undergraduate", "In college or university"],
            ["professional", "Working Professional", "Looking to advance or switch"],
          ].map(([val, label, desc]) => {
            const Icon = STAGE_ICONS[val];
            return (
              <button 
                key={val} 
                onClick={() => setStage(val)} 
                className="card card-hover flex flex-col items-start p-6 text-left group border-slate-200"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-lg text-slate-900 group-hover:text-brand-700 transition-colors">{label}</div>
                <div className="text-sm text-slate-500 mt-1">{desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const questions = STAGE_QUESTIONS[stage] || STAGE_QUESTIONS.ug;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-2xl mx-auto px-4">
      <div className="mb-10 animate-fade-in">
        <button onClick={() => setStage("")} className="text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
          ← Back to stages
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Tell us a bit more</h1>
        <p className="text-lg text-slate-500">
          Just what's relevant for your stage — you can add more detail on your Profile page anytime.
        </p>
      </div>

      <div className="card p-6 md:p-8 space-y-6 animate-fade-in shadow-sm border-slate-200" style={{ animationDelay: "0.1s" }}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Your name</label>
            <input className="input" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">State / Region</label>
            <input className="input" placeholder="e.g. Maharashtra" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-6">
          <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Stage Details</div>
          {questions.map((q) => (
            <div key={q} className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">{q}</label>
              <input
                className="input"
                placeholder="Type your answer..."
                value={answers[q] || ""}
                onChange={(e) => setAnswers({ ...answers, [q]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button className="btn-primary w-full py-3" onClick={finish} disabled={saving || !name}>
            {saving ? "Setting up your workspace..." : (
              <>Go to my dashboard <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
