import React, { useState } from "react";
import { 
  Bookmark, Clock, CheckCircle2, AlertCircle, ArrowUpRight, 
  Trash2, Edit3, Save, ExternalLink, ShieldCheck, FileText, Bell 
} from "lucide-react";

interface TrackedScholarship {
  id: number;
  scholarship_id: number;
  name: string;
  provider: string;
  benefit: string;
  benefit_amount_inr?: number;
  status: string;
  application_reference_no?: string;
  notes?: string;
  deadline_reminder?: boolean;
  application_close_date?: string;
  official_application_url?: string;
  verification_status?: string;
  saved_date?: string;
}

interface ApplicationTrackerProps {
  items: TrackedScholarship[];
  onUpdateStatus: (scholarshipId: number, payload: any) => Promise<void>;
  onRemove: (scholarshipId: number) => Promise<void>;
  onViewDetails: (scholarshipId: number) => void;
}

const STATUS_OPTIONS = [
  { value: "saved", label: "Saved for Later" },
  { value: "checking_eligibility", label: "Checking Eligibility" },
  { value: "preparing_documents", label: "Preparing Documents" },
  { value: "ready_to_apply", label: "Ready to Apply" },
  { value: "applied", label: "Application Submitted" },
  { value: "institution_verification_pending", label: "Institution Verification Pending" },
  { value: "provider_verification_pending", label: "Provider Verification Pending" },
  { value: "awarded", label: "Awarded / Sanctioned" },
  { value: "rejected", label: "Rejected" },
  { value: "not_pursuing", label: "Not Pursuing" }
];

const STATUS_COLORS: Record<string, string> = {
  "saved": "bg-slate-100 text-slate-700 border-slate-200",
  "checking_eligibility": "bg-blue-50 text-blue-700 border-blue-200",
  "preparing_documents": "bg-amber-50 text-amber-700 border-amber-200",
  "ready_to_apply": "bg-purple-50 text-purple-700 border-purple-200",
  "applied": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "institution_verification_pending": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "provider_verification_pending": "bg-teal-50 text-teal-700 border-teal-200",
  "awarded": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "rejected": "bg-rose-50 text-rose-700 border-rose-200",
  "not_pursuing": "bg-slate-100 text-slate-500 border-slate-200"
};

export default function ApplicationTracker({
  items,
  onUpdateStatus,
  onRemove,
  onViewDetails
}: ApplicationTrackerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRefNo, setEditRefNo] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editReminder, setEditReminder] = useState(true);

  const startEdit = (item: TrackedScholarship) => {
    setEditingId(item.scholarship_id);
    setEditRefNo(item.application_reference_no || "");
    setEditNotes(item.notes || "");
    setEditReminder(item.deadline_reminder !== false);
  };

  const saveEdit = async (scholarshipId: number, currentStatus: string) => {
    await onUpdateStatus(scholarshipId, {
      status: currentStatus,
      application_reference_no: editRefNo,
      notes: editNotes,
      deadline_reminder: editReminder
    });
    setEditingId(null);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">No Tracked Scholarships Yet</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          As you discover eligible scholarships, click <strong>"Track / Save"</strong> to manage your application deadlines, store application reference numbers, and track status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/60 text-xs text-blue-900 leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Privacy & Submission Notice:</strong> FutureForge helps you organize and track your application milestones. 
          Marking an application as "Submitted" is based on your own confirmation after submitting on the official government portal.
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item) => {
          const isEditing = editingId === item.scholarship_id;
          const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS["saved"];

          return (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className={`text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border cursor-pointer ${statusStyle}`}
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.scholarship_id, { status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="text-slate-900 bg-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {item.application_close_date && (
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" /> Deadline: {item.application_close_date}
                    </span>
                  )}
                </div>

                <h4 
                  onClick={() => onViewDetails(item.scholarship_id)}
                  className="text-lg md:text-xl font-bold text-slate-900 font-heading hover:text-brand-600 cursor-pointer leading-snug"
                >
                  {item.name}
                </h4>

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{item.provider}</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">{item.benefit}</span>
                </div>

                {/* Edit Mode vs Display Mode for Ref Number & Notes */}
                {isEditing ? (
                  <div className="space-y-3 pt-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Application Reference / Acknowledgement Number
                      </label>
                      <input
                        type="text"
                        className="input-field text-xs py-2"
                        placeholder="e.g. TN2026SCH123456"
                        value={editRefNo}
                        onChange={(e) => setEditRefNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Personal Application Notes
                      </label>
                      <textarea
                        rows={2}
                        className="input-field text-xs py-2"
                        placeholder="e.g. Submitted bonafide to college nodal officer on Oct 10."
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`remind_${item.id}`}
                        checked={editReminder}
                        onChange={(e) => setEditReminder(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-600"
                      />
                      <label htmlFor={`remind_${item.id}`} className="text-xs text-slate-700">
                        Enable deadline reminder notification
                      </label>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="btn-secondary text-xs py-1.5 px-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(item.scholarship_id, item.status)}
                        className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs space-y-1 pt-1">
                    {item.application_reference_no && (
                      <div className="text-slate-700">
                        <span className="font-semibold text-slate-500">Application Ref:</span>{" "}
                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">
                          {item.application_reference_no}
                        </span>
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-xs font-semibold text-slate-600 hover:text-brand-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Info
                  </button>
                )}

                {item.official_application_url && (
                  <a
                    href={item.official_application_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 shadow-2xs"
                  >
                    Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onRemove(item.scholarship_id)}
                  className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition"
                  title="Remove from tracker"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
