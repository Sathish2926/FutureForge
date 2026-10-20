import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { ArrowLeft, Compass, Target, Map as MapIcon, GraduationCap, Building2, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CareerDetail() {
  const { slug } = useParams();
  const [career, setCareer] = useState<any>(null);
  const [match, setMatch] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    api.getCareer(slug).then(setCareer);
    api.getRecommendations(slug, 1).then((res) => setMatch(res[0]));
  }, [slug]);

  if (!career) {
    return (
      <div className="space-y-8 animate-pulse max-w-4xl mx-auto">
        <div className="h-8 w-24 bg-slate-200 rounded"></div>
        <div className="h-12 w-3/4 bg-slate-200 rounded"></div>
        <div className="h-32 bg-slate-200 rounded-2xl"></div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  async function buildRoadmap() {
    await api.generateRoadmap({ career_slug: slug! });
    navigate("/roadmap");
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Explorer
      </Link>

      <div className="space-y-8">
        <header className="space-y-4">
          <div className="badge bg-brand-50 text-brand-700">{career.sector}</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{career.name}</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">{career.description}</p>
        </header>

        {match && (
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Target className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-3">
                    <Compass className="w-3 h-3" /> Profile Match
                  </div>
                  <h2 className="text-2xl font-bold">Is this path for you?</h2>
                </div>
                <div className="flex flex-col items-center bg-white/10 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-md">
                  <div className="text-xl font-bold text-white uppercase tracking-wide text-center">
                    {match.match_score >= 80 ? "Strong Alignment" : match.match_score >= 60 ? "Promising Direction" : "Worth Exploring"}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-300 font-bold mt-1">Evidence Alignment</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="font-semibold text-emerald-400 uppercase tracking-wider text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Why this fits you
                  </div>
                  <p className="text-slate-200 leading-relaxed">{match.reasoning.evidence}. {match.reasoning.match_summary}</p>
                </div>
                <div className="space-y-3">
                  <div className="font-semibold text-amber-400 uppercase tracking-wider text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Trade-offs to consider
                  </div>
                  <p className="text-slate-200 leading-relaxed">{match.reasoning.tradeoffs}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                <span>Confidence: {match.reasoning.confidence}</span>
                <span>{match.reasoning.disclaimer}</span>
              </div>
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card md:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Key Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <GraduationCap className="w-4 h-4" /> Degrees
                </div>
                <div className="text-slate-700 font-medium">{career.relevant_degrees || "Not specified"}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" /> Subjects
                </div>
                <div className="text-slate-700 font-medium">{career.recommended_subjects || "Not specified"}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" /> Exams
                </div>
                <div className="text-slate-700 font-medium">{career.common_entrance_exams || "Not specified"}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" /> Govt. Opps
                </div>
                <div className="text-slate-700 font-medium">{career.government_opportunities || "Not specified"}</div>
              </div>
            </div>
          </div>

          <div className="card bg-brand-50 border-brand-100 flex flex-col justify-center text-center p-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-brand-600">
              <MapIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Ready to plan?</h3>
            <p className="text-sm text-slate-600 mb-6">Generate a step-by-step roadmap to achieve this career goal.</p>
            <button className="btn-primary w-full" onClick={buildRoadmap}>
              Add to my roadmap
            </button>
          </div>
        </div>

        {career.pathways?.length > 0 && (
          <section className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-slate-900">How to get there</h2>
            <p className="text-slate-600 text-lg">Common educational and professional pathways for this career.</p>
            
            <div className="space-y-6">
              {career.pathways.map((p: any) => (
                <div key={p.route_type} className="card p-0 overflow-hidden">
                  <div className="bg-slate-50 p-6 border-b border-slate-100">
                    <div className="badge bg-white text-slate-600 border border-slate-200 mb-3">{p.route_type}</div>
                    <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className="relative border-l-2 border-brand-100 ml-3 md:ml-4 space-y-8 py-2">
                      {p.steps.map((s: any, i: number) => (
                        <div key={i} className="relative pl-6 md:pl-8">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-brand-500"></div>
                          <div className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-1">{s.stage}</div>
                          <div className="text-lg font-medium text-slate-900 mb-2">{s.action}</div>
                          <div className="text-slate-600 leading-relaxed">{s.why}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
