import { useEffect, useState } from "react";
import { api } from "../api/client";
import { UserCircle, Settings, CheckCircle2, Circle, Save, User, MapPin, GraduationCap, Briefcase, CreditCard } from "lucide-react";

export default function Profile() {
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  function load() {
    api.getProfile().then((res) => {
      setData(res);
      setForm({
        name: res.profile.name || "",
        state: res.profile.state || "",
        education_stage: res.profile.education_stage || "",
        preferred_location: res.profile.preferred_location || "",
        family_income_band: res.profile.financial_profile?.family_income_band || "prefer_not_to_say",
        budget_band: res.profile.financial_profile?.budget_band || "not_specified",
      });
    });
  }
  useEffect(load, []);

  async function save() {
    setSaving(true);
    try {
      await api.updateProfile(form);
      load();
    } finally {
      setSaving(false);
    }
  }

  if (!data) return (
    <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
      <div className="h-48 bg-slate-200/60 rounded-3xl"></div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="h-96 bg-slate-200/60 rounded-3xl"></div>
        <div className="md:col-span-2 h-96 bg-slate-200/60 rounded-3xl"></div>
      </div>
    </div>
  );

  const completion = data.profile?.completion || {
    required_sections: [],
    optional_sections: [],
    summary: { required_completed: 0, required_total: 0, optional_completed: 0, optional_total: 0 },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl font-bold font-heading shadow-inner">
            {data.profile.name ? data.profile.name.charAt(0).toUpperCase() : <User className="w-10 h-10 text-brand-100" />}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-heading mb-2">
              {data.profile.name || "Your Profile"}
            </h1>
            <div className="flex items-center gap-4 text-brand-200 text-sm font-medium">
              {data.profile.state && <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {data.profile.state}</span>}
              <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4"/> Student Profile</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-64">
          <div className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-right">Completion</div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div className="bg-brand-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ width: `${data.completeness_percent}%` }} />
            </div>
            <span className="font-bold text-xl">{data.completeness_percent}%</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="card">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" /> Profile Status
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  Required ({completion.summary.required_completed}/{completion.summary.required_total})
                </div>
                <div className="space-y-3">
                  {(completion.required_sections || []).map((section: any) => (
                    <div key={section.id} className="flex items-center gap-3 text-sm">
                      {section.completed ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0"></div>
                      )}
                      <span className={section.completed ? "font-semibold text-slate-700" : "font-medium text-slate-500"}>{section.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(completion.optional_sections || []).length > 0 && (
                <div className="pt-5 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    Optional ({completion.summary.optional_completed}/{completion.summary.optional_total})
                  </div>
                  <div className="space-y-3">
                    {(completion.optional_sections || []).map((section: any) => (
                      <div key={section.id} className="flex items-center gap-3 text-sm">
                        {section.completed ? (
                          <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0"></div>
                        )}
                        <span className={section.completed ? "font-semibold text-slate-700" : "font-medium text-slate-500"}>{section.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-500" /> Interests
            </div>
            <div className="flex flex-wrap gap-2">
              {data.profile.interests?.length ? data.profile.interests.map((i: string) => (
                <span key={i} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-lg border border-brand-100 shadow-sm">
                  {i}
                </span>
              )) : (
                <div className="w-full p-4 rounded-xl border-2 border-dashed border-slate-200 text-center">
                  <span className="text-sm font-medium text-slate-500 block mb-2">None added yet.</span>
                  <a href="/career-dna" className="text-sm font-bold text-brand-600 hover:text-brand-700">Complete Career DNA &rarr;</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="card">
            <div className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-5 font-heading">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-slate-600" />
              </div>
              General Settings
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Full Name</label>
                <input className="input shadow-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Education Stage</label>
                <select className="input shadow-sm" value={form.education_stage} onChange={(e) => setForm({ ...form, education_stage: e.target.value })}>
                  <option value="">Select stage...</option>
                  <option value="class10">Class 10</option>
                  <option value="class12">Class 11/12</option>
                  <option value="diploma">Diploma</option>
                  <option value="ug">Undergraduate</option>
                  <option value="pg">Postgraduate</option>
                  <option value="phd">PhD / Research</option>
                  <option value="professional">Working professional</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Home State</label>
                <input className="input shadow-sm" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Preferred Location</label>
                <input className="input shadow-sm" placeholder="City or State" value={form.preferred_location} onChange={(e) => setForm({ ...form, preferred_location: e.target.value })} />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-2 font-heading">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                </div>
                Financial Profile
              </div>
              <p className="text-sm text-slate-500 mb-6 font-medium ml-13">Used confidentially for scholarship matching and college budgeting.</p>
              
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Family Income Band</label>
                  <select className="input shadow-sm bg-white" value={form.family_income_band} onChange={(e) => setForm({ ...form, family_income_band: e.target.value })}>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                    <option value="below_2.5L">Below ₹2.5L / year</option>
                    <option value="2.5-8L">₹2.5L - ₹8L / year</option>
                    <option value="8L+">Above ₹8L / year</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">Education Budget</label>
                  <select className="input shadow-sm bg-white" value={form.budget_band} onChange={(e) => setForm({ ...form, budget_band: e.target.value })}>
                    <option value="not_specified">Not specified</option>
                    <option value="low">Low (Govt. / Low-fee)</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Private institutions)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 flex justify-end">
              <button className="btn-primary text-lg px-8 py-3" onClick={save} disabled={saving}>
                {saving ? "Saving changes..." : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
