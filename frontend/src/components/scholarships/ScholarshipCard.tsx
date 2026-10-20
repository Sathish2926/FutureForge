import React from "react";
import { 
  Building2, CheckCircle2, ShieldAlert, XCircle, Clock, 
  ExternalLink, BookmarkPlus, ArrowUpRight, Award, Info, FileText 
} from "lucide-react";

interface ScholarshipCardProps {
  scholarship: any;
  eligibilityStatus?: string;
  applicationPeriodStatus?: string;
  applicationPeriodLabel?: string;
  matchScore?: number;
  breakdown?: any[];
  matchingReasons?: string[];
  failedReasons?: string[];
  missingRequirements?: string[];
  onViewDetails: (sch: any, tab?: string) => void;
  onSave: (id: number) => void;
  isSaved?: boolean;
}

const ELIGIBILITY_BADGES: Record<string, { bg: string; text: string; border: string; icon: any; label: string }> = {
  "ELIGIBLE": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle2,
    label: "Eligible"
  },
  "Likely Eligible": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle2,
    label: "Eligible"
  },
  "POTENTIALLY_ELIGIBLE": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: ShieldAlert,
    label: "Potentially Eligible"
  },
  "Eligibility Needs Verification": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: ShieldAlert,
    label: "Potentially Eligible"
  },
  "INELIGIBLE": {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: XCircle,
    label: "Ineligible"
  },
  "Not Eligible": {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: XCircle,
    label: "Ineligible"
  },
  "UNVERIFIED": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: Info,
    label: "Status Not Verified"
  }
};

const PROVIDER_CATEGORY_LABELS: Record<string, string> = {
  "central_govt": "Central Government Scheme",
  "state_govt": "Tamil Nadu State Scheme",
  "corporate_csr": "Corporate CSR Scholarship",
  "foundation": "Private Foundation",
  "institutional": "Institutional"
};

export default function ScholarshipCard({
  scholarship,
  eligibilityStatus = "POTENTIALLY_ELIGIBLE",
  applicationPeriodStatus = "OPEN",
  applicationPeriodLabel = "Application Open — Officially Confirmed",
  matchScore,
  breakdown,
  matchingReasons,
  failedReasons,
  missingRequirements,
  onViewDetails,
  onSave,
  isSaved = false
}: ScholarshipCardProps) {
  const badgeConfig = ELIGIBILITY_BADGES[eligibilityStatus] || ELIGIBILITY_BADGES["POTENTIALLY_ELIGIBLE"];
  const BadgeIcon = badgeConfig.icon;

  const isClosed = applicationPeriodStatus === "CLOSED";
  const isOpen = applicationPeriodStatus === "OPEN";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-md transition overflow-hidden flex flex-col md:flex-row">
      {/* Main Content Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* Eligibility Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${badgeConfig.bg} ${badgeConfig.text} ${badgeConfig.border}`}>
              <BadgeIcon className="w-3.5 h-3.5" />
              {badgeConfig.label}
            </span>

            {/* Application Period Status */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isClosed
                ? "bg-rose-50 text-rose-700 border border-rose-200"
                : isOpen
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}>
              <Clock className="w-3.5 h-3.5" />
              {applicationPeriodLabel}
            </span>

            {/* Provider Type */}
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {PROVIDER_CATEGORY_LABELS[scholarship.provider_category] || "Government Scheme"}
            </span>

            {matchScore !== undefined && matchScore > 0 && eligibilityStatus !== "INELIGIBLE" && (
              <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200/60 px-2.5 py-1 rounded-full ml-auto">
                {matchScore}% Profile Fit
              </span>
            )}
          </div>

          {/* Scholarship Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-heading leading-snug mb-2">
            {scholarship.name}
          </h3>

          {/* Provider */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-5">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{scholarship.provider}</span>
          </div>

          {/* Benefit Highlight Box */}
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Scholarship Benefit
              </span>
              <div className="text-base font-bold text-slate-900 leading-tight">
                {scholarship.benefit || scholarship.benefit_description}
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Eligible Levels & Scope
              </span>
              <div className="text-sm font-semibold text-slate-700 truncate">
                {scholarship.education_levels || "Higher Education"} 
                {scholarship.geographic_coverage === "tamil_nadu" ? " (Tamil Nadu Native)" : " (All India)"}
              </div>
            </div>
          </div>

          {/* Why it matches or fails snippet */}
          {matchingReasons && matchingReasons.length > 0 && eligibilityStatus !== "INELIGIBLE" && (
            <div className="text-xs text-emerald-800 bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/60 mb-2">
              <div className="font-semibold text-emerald-900 mb-0.5">Why this matches you:</div>
              <p className="truncate">{matchingReasons[0]}</p>
            </div>
          )}

          {failedReasons && failedReasons.length > 0 && eligibilityStatus === "INELIGIBLE" && (
            <div className="text-xs text-rose-800 bg-rose-50/50 rounded-xl p-3 border border-rose-100/60 mb-2">
              <div className="font-semibold text-rose-900 mb-0.5">Condition not met:</div>
              <p className="truncate">{failedReasons[0]}</p>
            </div>
          )}
        </div>

        {/* Verification Source Citation */}
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
          <Award className="w-3.5 h-3.5 text-brand-500" />
          <span>Source: <strong>{scholarship.source_name || "Official Government Guidelines"}</strong></span>
          {scholarship.last_verified && (
            <span className="text-slate-400 ml-auto">Verified</span>
          )}
        </div>
      </div>

      {/* Action Sidebar / Card Footer */}
      <div className="bg-slate-50/60 p-6 md:p-8 md:w-72 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
            Application Deadline
          </span>
          <div className="text-base font-bold text-slate-900 font-heading mb-1">
            {scholarship.application_close_date || "Check Official Portal"}
          </div>
          <span className="text-[11px] text-slate-500 block mb-6">
            {scholarship.deadline_verification_status === "confirmed" ? "Verified via Portal" : "Tentative / Annual Cycle"}
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onViewDetails(scholarship, "eligibility")}
            className="btn-primary w-full text-xs py-2.5 justify-center flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Eligibility Details
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(scholarship, "how-to-apply")}
            className="btn-secondary w-full text-xs py-2.5 justify-center flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            How to Apply
          </button>

          <button
            type="button"
            onClick={() => onSave(scholarship.id)}
            className={`w-full text-xs py-2.5 px-3 rounded-xl font-semibold border flex items-center justify-center gap-1.5 transition ${
              isSaved
                ? "bg-brand-50 text-brand-700 border-brand-200"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            {isSaved ? "Saved in Tracker" : "Track / Save"}
          </button>

          {scholarship.official_application_url || scholarship.official_info_url ? (
            <a
              href={scholarship.official_application_url || scholarship.official_info_url}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-slate-500 hover:text-brand-600 flex items-center justify-center gap-1 pt-1 text-center"
            >
              Official Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-400 block text-center pt-1">
              Official application link not verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
