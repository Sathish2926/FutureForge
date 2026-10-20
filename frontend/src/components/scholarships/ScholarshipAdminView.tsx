import React, { useEffect, useState } from "react";
import { 
  Shield, CheckCircle2, AlertTriangle, Link2, RefreshCw, 
  History, Clock, Search, ArrowUpRight, Award 
} from "lucide-react";
import { api } from "../../api/client";

export default function ScholarshipAdminView() {
  const [qualityData, setQualityData] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState("");

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [qData, logs, schList] = await Promise.all([
        api.adminGetQualityCheck().catch(() => null),
        api.adminGetAuditLog().catch(() => []),
        api.listScholarships().catch(() => [])
      ]);
      setQualityData(qData);
      setAuditLogs(logs || []);
      setScholarships(schList || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleVerify = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      await api.adminVerifyScholarship(
        id, 
        newStatus, 
        "Verified against official portal gazette notification", 
        "https://scholarships.gov.in"
      );
      setStatusMsg(`Scholarship status updated to ${newStatus}`);
      await loadAdminData();
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      alert("Failed to update verification status. Admin credentials required.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-brand-500" />
        <p className="text-sm">Loading scholarship curation registry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {statusMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          {statusMsg}
        </div>
      )}

      {/* Quality Check Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
            Total Schemes in Registry
          </span>
          <div className="text-2xl font-bold text-slate-900 font-heading">
            {qualityData?.total_records || scholarships.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
            Needing Re-Verification
          </span>
          <div className="text-2xl font-bold text-amber-700 font-heading">
            {qualityData?.needing_reverification_count || 0}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 block mb-1">
            Past Deadlines Flagged
          </span>
          <div className="text-2xl font-bold text-rose-700 font-heading">
            {qualityData?.expired_deadlines_count || 0}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
            Missing Direct Links
          </span>
          <div className="text-2xl font-bold text-slate-700 font-heading">
            {qualityData?.missing_links_count || 0}
          </div>
        </div>
      </div>

      {/* Manage Verification Status Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Verified Scholarship Catalogue</h3>
            <p className="text-xs text-slate-500">Audit status, update official deadlines, and maintain source traceability.</p>
          </div>
          <button
            type="button"
            onClick={loadAdminData}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholarships.slice(0, 15).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 truncate max-w-[180px]">
                    {s.provider}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      s.verification_status === "VERIFIED_ACTIVE"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {s.verification_status || "NEEDS_REVERIFICATION"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {s.application_close_date || "Annual cycle"}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      disabled={updatingId === s.id}
                      onClick={() => handleVerify(s.id, "VERIFIED_ACTIVE")}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[11px] font-semibold transition"
                    >
                      Mark Active
                    </button>
                    <button
                      type="button"
                      disabled={updatingId === s.id}
                      onClick={() => handleVerify(s.id, "VERIFIED_CLOSED")}
                      className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-[11px] font-semibold transition"
                    >
                      Mark Closed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit History Log */}
      {auditLogs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-heading mb-4">
            <History className="w-5 h-5 text-brand-600" />
            <span>Verification Audit Log History</span>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 8).map((log) => (
              <div key={log.id} className="text-xs p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-800">{log.scholarship_name}:</span>{" "}
                  <span className="text-slate-600">Updated {log.field_name} to </span>
                  <span className="font-semibold text-brand-700">{log.new_value}</span>
                  {log.verification_notes && (
                    <span className="text-slate-400 block sm:inline sm:ml-2">({log.verification_notes})</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 shrink-0">
                  {log.verified_by} • {log.timestamp ? new Date(log.timestamp).toLocaleDateString() : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
