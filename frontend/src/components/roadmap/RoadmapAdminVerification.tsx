import { useState } from "react";
import { ShieldCheck, AlertTriangle, ExternalLink, CheckCircle2, RefreshCw, BookOpen } from "lucide-react";
import { Career } from "../../data/roadmapTypes";

interface Props {
  careers: Career[];
}

export default function RoadmapAdminVerification({ careers }: Props) {
  const [filterNeedsVerification, setFilterNeedsVerification] = useState(false);
  const [selectedCareerId, setSelectedCareerId] = useState<string>(careers[0]?.id || "");

  const flaggedCareers = careers.filter(c =>
    c.steps.some(s => s.needsVerification)
  );

  const activeCareer = careers.find(c => c.id === selectedCareerId) || careers[0];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Curriculum & Audit Registry
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900">
            Roadmap Verification & Regulatory Changelog
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tracking {careers.length} official careers, regulatory authorities, review cycles, and pending audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterNeedsVerification(!filterNeedsVerification)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              filterNeedsVerification
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {filterNeedsVerification ? "Show All Careers" : `Needs Verification (${flaggedCareers.length})`}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Career Selector List */}
        <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
          {(filterNeedsVerification ? flaggedCareers : careers).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCareerId(c.id)}
              className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                c.id === selectedCareerId
                  ? "bg-brand-50 text-brand-900 border border-brand-300 shadow-xs"
                  : "hover:bg-slate-50 text-slate-700 border border-transparent"
              }`}
            >
              <div className="truncate">
                <span className="font-bold block truncate">{c.name}</span>
                <span className="text-[10px] text-slate-400">{c.group} • {c.steps.length} steps</span>
              </div>
              {c.steps.some(s => s.needsVerification) ? (
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Step needs verification"></span>
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Career Audit Card */}
        {activeCareer && (
          <div className="md:col-span-2 bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-700 tracking-wider">
                  {activeCareer.group}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading">
                  {activeCareer.name}
                </h4>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>Owner: <span className="font-semibold text-slate-800">{activeCareer.reviewOwner}</span></div>
                <div>Last Reviewed: <span className="font-semibold text-slate-800">{activeCareer.lastReviewed}</span></div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Step-by-Step Regulatory Sources
              </h5>
              <div className="space-y-2">
                {activeCareer.steps.map((st, i) => (
                  <div key={st.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-3 shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-100 font-bold flex items-center justify-center text-[10px] text-slate-600">
                          {i + 1}
                        </span>
                        <span className="font-bold text-slate-900">{st.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-600">
                          {st.detailKind}
                        </span>
                        {st.needsVerification && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" /> Needs Review
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed pl-7">
                        {st.detail}
                      </p>
                    </div>

                    {st.officialSourceUrl && (
                      <a
                        href={st.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 p-1 rounded-lg hover:bg-brand-50 shrink-0"
                        title={st.officialSourceUrl}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Changelog section */}
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-200/60">
              <span className="font-bold text-slate-700">Latest Regulatory Alignment:</span> Updated to current National Testing Agency (NTA), Council of Architecture, and National Medical Commission guidelines for the 2026-2027 academic session.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
