import React, { useState } from "react";
import { 
  X, Building2, CheckCircle2, ShieldAlert, XCircle, Award, 
  Clock, ExternalLink, BookmarkPlus, ArrowUpRight, FileCheck, 
  Sparkles, Layers, FileText, ChevronRight, HelpCircle 
} from "lucide-react";

interface DetailsModalProps {
  scholarship: any;
  breakdown?: any[];
  matchingReasons?: string[];
  failedReasons?: string[];
  eligibilityStatus?: string;
  onClose: () => void;
  onSave: (id: number) => void;
  isSaved?: boolean;
  defaultTab?: string;
}

export default function ScholarshipDetailsModal({
  scholarship,
  breakdown = [],
  matchingReasons = [],
  failedReasons = [],
  eligibilityStatus = "POTENTIALLY_ELIGIBLE",
  onClose,
  onSave,
  isSaved = false,
  defaultTab = "overview"
}: DetailsModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!scholarship) return null;

  const reqDocs = Array.isArray(scholarship.required_documents) 
    ? scholarship.required_documents 
    : typeof scholarship.required_documents === "string" 
    ? JSON.parse(scholarship.required_documents || "[]") 
    : [];

  const appSteps = Array.isArray(scholarship.application_steps)
    ? scholarship.application_steps
    : typeof scholarship.application_steps === "string"
    ? JSON.parse(scholarship.application_steps || "[]")
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/60 px-3 py-1 rounded-full">
                {scholarship.provider_category ? scholarship.provider_category.replace("_", " ").toUpperCase() : "GOVERNMENT SCHEME"}
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                scholarship.verification_status === "VERIFIED_ACTIVE" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {scholarship.verification_status || "VERIFIED"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-heading leading-tight">
              {scholarship.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{scholarship.provider}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-100 px-6 md:px-8 bg-white flex overflow-x-auto scrollbar-none gap-2">
          {[
            { id: "overview", label: "Overview & Match" },
            { id: "eligibility", label: "Eligibility Breakdown" },
            { id: "benefits", label: "Benefits & Allowances" },
            { id: "documents", label: "Required Documents" },
            { id: "how-to-apply", label: "How to Apply" },
            { id: "official-links", label: "Official Portal" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-3 text-xs md:text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
          {/* TAB 1: OVERVIEW & MATCH */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* SECTION A: OVERVIEW */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Scheme Overview</h4>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {scholarship.description || "Official scholarship scheme to support students in higher education."}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mt-5">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Target Levels</span>
                    <div className="text-sm font-bold text-slate-900">{scholarship.education_levels || "All Levels"}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Geographic Coverage</span>
                    <div className="text-sm font-bold text-slate-900">
                      {scholarship.geographic_coverage === "tamil_nadu" ? "Tamil Nadu Only" : "All India"}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Academic Year</span>
                    <div className="text-sm font-bold text-slate-900">{scholarship.academic_year || "2026-27"}</div>
                  </div>
                </div>
              </div>

              {/* SECTION B: WHY THIS SCHOLARSHIP MATCHES YOU */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  Why This Scholarship Matches Your Profile
                </h4>

                {matchingReasons && matchingReasons.length > 0 ? (
                  <div className="space-y-2.5">
                    {matchingReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-emerald-900">{reason}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Review the eligibility criteria tab to verify individual criteria against your profile.
                  </p>
                )}

                {failedReasons && failedReasons.length > 0 && (
                  <div className="mt-4 space-y-2.5">
                    <span className="text-xs font-bold text-rose-800 block">Non-matching conditions:</span>
                    {failedReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-rose-50/60 rounded-xl border border-rose-100/60">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-rose-900">{reason}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE ELIGIBILITY REQUIREMENTS TABLE (SECTION C) */}
          {activeTab === "eligibility" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Condition-by-Condition Evaluation
                </h4>
                <p className="text-xs text-slate-500">
                  Every mandatory requirement is evaluated deterministically using verified official scheme criteria.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Requirement</th>
                      <th className="py-3 px-4">Official Scheme Rule</th>
                      <th className="py-3 px-4">Your Profile Info</th>
                      <th className="py-3 px-4">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {breakdown && breakdown.length > 0 ? (
                      breakdown.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-semibold text-slate-900">
                            {row.name}
                            {row.is_mandatory && <span className="text-rose-500 ml-1 font-bold">*</span>}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{row.rule_description}</td>
                          <td className="py-3.5 px-4 text-slate-800 font-medium">{row.user_data}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              row.result === "PASS"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : row.result === "FAIL"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}>
                              {row.result}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400 text-xs">
                          No rule evaluations recorded for this scheme.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BENEFITS & ALLOWANCES (SECTION D) */}
          {activeTab === "benefits" && (
            <div className="space-y-6">
              <div className="p-6 bg-brand-50/50 rounded-2xl border border-brand-100">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">
                  Primary Benefit Description
                </span>
                <div className="text-xl md:text-2xl font-bold text-slate-900 font-heading">
                  {scholarship.benefit || scholarship.benefit_description}
                </div>
                {scholarship.benefit_amount_inr && (
                  <div className="text-sm font-semibold text-brand-700 mt-1">
                    Direct Financial Assistance: ₹{scholarship.benefit_amount_inr.toLocaleString()} / academic year
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Benefit Type</span>
                  <div className="text-sm font-bold text-slate-800 capitalize">
                    {scholarship.benefit_type ? scholarship.benefit_type.replace(/_/g, " ") : "Direct Scholarship"}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Coverage Duration</span>
                  <div className="text-sm font-bold text-slate-800">
                    {scholarship.benefit_duration || "Entire course duration"}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Renewal Requirements</h4>
                <div className="text-sm text-slate-700 p-4 bg-slate-50 rounded-2xl border border-slate-100 leading-relaxed">
                  {scholarship.renewal_requirements || "Regular attendance (minimum 75%) and passing grades in the annual/semester university examinations."}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Disbursement Method</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct Benefit Transfer (DBT) directly into the student's individual bank savings account mapped to Aadhaar via NPCI. No third-party or intermediary involvement.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: REQUIRED DOCUMENTS CHECKLIST (SECTION E) */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Official Document Checklist
                </h4>
                <p className="text-xs text-slate-500">
                  Confirmed from official government gazette / scheme guidelines. Keep self-attested digital copies ready for portal upload.
                </p>
              </div>

              <div className="space-y-3">
                {reqDocs && reqDocs.length > 0 ? (
                  reqDocs.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
                      <FileCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{doc.name}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            doc.mandatory 
                              ? "bg-rose-50 text-rose-700 border border-rose-200" 
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {doc.mandatory ? "Mandatory" : "Optional / Institutional"}
                          </span>
                          {doc.confirmed && (
                            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              Officially Confirmed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{doc.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Standard documents: Marksheets, Bonafide, Aadhaar, Income Proof.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: HOW TO AVAIL / APPLY (SECTION F) */}
          {activeTab === "how-to-apply" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Step-by-Step Application Guide
                </h4>
                <p className="text-xs text-slate-500">
                  Follow these steps to submit your verified application through the authorized government portal.
                </p>
              </div>

              <div className="space-y-4">
                {appSteps && appSteps.length > 0 ? (
                  appSteps.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white">
                      <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0 text-xs">
                        {step.step_number || idx + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{step.title}</h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.instruction}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Application instructions available on the official portal.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: OFFICIAL LINKS & VERIFICATION (SECTION G) */}
          {activeTab === "official-links" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Official Portal & Source Traceability
                </h4>
                <p className="text-xs text-slate-500">
                  Direct official endpoints. FutureForge connects you directly with government authorities.
                </p>
              </div>

              <div className="space-y-4">
                {scholarship.official_application_url && (
                  <div className="p-5 bg-brand-50/60 rounded-2xl border border-brand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 block mb-1">
                        Official Application Portal
                      </span>
                      <div className="text-base font-bold text-slate-900">
                        {scholarship.application_portal_name || "Authorized Online Portal"}
                      </div>
                      <span className="text-xs text-slate-500">{scholarship.official_application_url}</span>
                    </div>

                    <a
                      href={scholarship.official_application_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-xs py-2.5 px-4 self-start sm:self-auto flex items-center gap-2 shrink-0 shadow-sm"
                    >
                      Open Official Portal <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {scholarship.official_info_url && (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                        Official Scheme Guidelines & Government Orders
                      </span>
                      <div className="text-base font-bold text-slate-900">
                        {scholarship.source_name || "Department Guidelines"}
                      </div>
                      <span className="text-xs text-slate-500">{scholarship.official_info_url}</span>
                    </div>

                    <a
                      href={scholarship.official_info_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2.5 px-4 self-start sm:self-auto flex items-center gap-2 shrink-0"
                    >
                      View Scheme Guidelines <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                <strong>Important Advisory:</strong> Government scholarship applications in India are free of cost. 
                Never pay processing fees or share bank account passwords or OTPs with unauthorized intermediaries.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-600" />
            <span>Verified Source: <strong>{scholarship.source_name || "National Portal"}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSave(scholarship.id)}
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              {isSaved ? "Saved in Tracker" : "Track / Save"}
            </button>

            {scholarship.official_application_url && (
              <a
                href={scholarship.official_application_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 shadow-sm"
              >
                Apply on Official Portal <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
