import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Calculator, Sparkles, AlertCircle } from "lucide-react";
import { MarksProfile } from "./CatalogTypes";

interface MarksLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  marksProfile: MarksProfile | null;
  onSaveMarks: (profile: MarksProfile | null) => void;
}

export default function MarksLayerModal({
  isOpen,
  onClose,
  marksProfile,
  onSaveMarks,
}: MarksLayerModalProps) {
  const [percent, setPercent] = useState<string>(
    marksProfile?.overall_percent ? String(marksProfile.overall_percent) : ""
  );
  const [math, setMath] = useState<"Struggling" | "Okay" | "Strong" | "">(
    marksProfile?.math_performance || ""
  );
  const [science, setScience] = useState<"Struggling" | "Okay" | "Strong" | "">(
    marksProfile?.science_performance || ""
  );

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const num = percent.trim() ? parseFloat(percent) : null;
    if (!num && !math && !science) {
      onSaveMarks(null);
    } else {
      onSaveMarks({
        overall_percent: num,
        math_performance: math ? (math as "Struggling" | "Okay" | "Strong") : null,
        science_performance: science ? (science as "Struggling" | "Okay" | "Strong") : null,
      });
    }
    onClose();
  };

  const handleClear = () => {
    setPercent("");
    setMath("");
    setScience("");
    onSaveMarks(null);
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">
                Academic Performance Context (Optional)
              </h3>
              <p className="text-xs text-slate-500">
                Purely informational — never used to restrict your browsing or filter paths
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              10th Standard Overall Percentage (Actual or Expected)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder="e.g. 82.5"
              className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 border-slate-200 text-slate-900 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">
              Mathematics Comfort & Performance
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Struggling", "Okay", "Strong"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setMath(math === level ? "" : level)}
                  className={`py-2.5 px-3 rounded-xl border font-semibold text-xs transition-all ${
                    math === level
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">
              Science Comfort & Performance
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Struggling", "Okay", "Strong"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setScience(science === level ? "" : level)}
                  className={`py-2.5 px-3 rounded-xl border font-semibold text-xs transition-all ${
                    science === level
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-[11px] leading-relaxed flex gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If provided, this enables neutral factual notes on demanding courses regarding prerequisites. If omitted, no academic notes appear anywhere.
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
            >
              Clear Marks
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary py-2 px-4 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary py-2 px-5 text-xs font-bold shadow-md shadow-indigo-100"
              >
                Save Context
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
