import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  GraduationCap,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
  Cpu,
  BookOpen,
  Briefcase,
  Layers,
  Palette
} from "lucide-react";
import { Degree, DegreeFamily } from "../../data/degree_guidance/types";
import { DEGREES_DATA } from "../../data/degree_guidance/degreesData";
import { DEGREE_FAMILIES } from "../../data/degree_guidance/degreeFamilies";
import {
  normalizeDegreeQuery,
  synthesizeUnknownDegree,
  logUnmatchedDegreeQuery,
  DegreeNormalizationResult
} from "../../data/degree_guidance/degreeNormalization";
import { DegreeSearchResult } from "../../data/degree_guidance/searchEngine";

interface UniversalDegreeSearchProps {
  selectedDegree: Degree | null;
  onSelectDegree: (degree: Degree, isCustom?: boolean) => void;
  isEditing: boolean;
  onStartEditing: () => void;
  onCancelEditing: () => void;
}

const EXAMPLE_DEGREES = [
  "B.Sc Computer Science",
  "B.Com",
  "B.Tech Mechanical Engineering",
  "B.Sc Psychology",
  "B.Des Fashion Design",
  "BA English",
  "B.Pharm",
  "MBBS",
  "LLB",
  "MCA",
  "M.Sc Biotechnology"
];

export default function UniversalDegreeSearch({
  selectedDegree,
  onSelectDegree,
  isEditing,
  onStartEditing,
  onCancelEditing
}: UniversalDegreeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [normResult, setNormResult] = useState<DegreeNormalizationResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced normalization
  useEffect(() => {
    if (!searchQuery.trim()) {
      setNormResult(null);
      return;
    }

    const timer = setTimeout(() => {
      const res = normalizeDegreeQuery(searchQuery, DEGREES_DATA);
      setNormResult(res);
      setHighlightedIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (degree: Degree) => {
    setSearchQuery("");
    setIsFocused(false);
    onSelectDegree(degree, false);
  };

  const handleUseCustomDegree = () => {
    if (!searchQuery.trim()) return;
    const provisional = synthesizeUnknownDegree(
      searchQuery,
      normResult?.relatedFamilies?.[0]?.id
    );

    logUnmatchedDegreeQuery(
      searchQuery,
      normResult?.inferredDiscipline || "Interdisciplinary",
      normResult?.inferredLevel || "UG",
      "used_custom",
      provisional.id
    );

    setSearchQuery("");
    setIsFocused(false);
    onSelectDegree(provisional, true);
  };

  const handlePickRelated = (deg: Degree) => {
    logUnmatchedDegreeQuery(
      searchQuery,
      normResult?.inferredDiscipline || "Interdisciplinary",
      normResult?.inferredLevel || "UG",
      "picked_related",
      deg.id
    );
    handleSelect(deg);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!normResult || normResult.suggestions.length === 0) {
      if (e.key === "Enter" && normResult?.isUnknown) {
        e.preventDefault();
        handleUseCustomDegree();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < normResult.suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && normResult.suggestions[highlightedIndex]) {
        handleSelect(normResult.suggestions[highlightedIndex].degree);
      } else if (normResult.primaryMatch && normResult.confidence === "HIGH") {
        handleSelect(normResult.primaryMatch);
      } else if (normResult.isUnknown) {
        handleUseCustomDegree();
      }
    }
  };

  // If a degree is selected and we're not actively editing it
  if (selectedDegree && !isEditing) {
    const family = DEGREE_FAMILIES[selectedDegree.familyId] || DEGREE_FAMILIES.engineering;
    return (
      <div className="card p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              YOUR DEGREE
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {family.name}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-heading">
            {selectedDegree.name}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {selectedDegree.shortName}
            </span>
            <span>•</span>
            <span>{selectedDegree.level}</span>
            <span>•</span>
            <span>Regulated by {selectedDegree.regulator}</span>
            <span>•</span>
            <span>Standard Duration: {selectedDegree.structure?.durationStandardYears || 3} Years</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartEditing}
          className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 text-indigo-700 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 self-start md:self-center"
        >
          <span>Change Degree</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8 rounded-3xl border border-indigo-100 bg-gradient-to-b from-white via-indigo-50/20 to-white shadow-md space-y-6 relative">
      {/* Header section matching exact prompt structure */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            YOUR DEGREE
          </span>

          {selectedDegree && isEditing && (
            <button
              type="button"
              onClick={onCancelEditing}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 p-1 rounded-lg"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-heading">
          Tell us what you're studying or what you've completed.
        </h2>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Search or enter your degree to unlock personalized guidance.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-indigo-500 absolute left-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search your degree... (e.g. B.Sc Computer Science, B.Com, B.Tech Mech, LLB)"
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-indigo-200/80 focus:border-indigo-600 bg-white text-slate-900 placeholder:text-slate-400 text-sm md:text-base font-medium shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setNormResult(null);
                inputRef.current?.focus();
              }}
              className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {isFocused && searchQuery.trim().length >= 2 && normResult && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
          >
            {/* Direct / Autocomplete matches */}
            {normResult.suggestions.length > 0 && (
              <div className="p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Suggested Programs ({normResult.suggestions.length})</span>
                  <span className="text-[10px] text-indigo-600 font-semibold lowercase">
                    {normResult.confidence} confidence
                  </span>
                </div>

                {normResult.suggestions.map((item, idx) => {
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <button
                      key={item.degree.id}
                      type="button"
                      onClick={() => handleSelect(item.degree)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 ${
                        isHighlighted
                          ? "bg-indigo-50 text-indigo-950 border border-indigo-200/80"
                          : "hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 truncate">
                            {item.degree.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                            {item.degree.shortName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{item.family.name}</span>
                          <span>•</span>
                          <span>{item.degree.structure?.durationStandardYears || 3} yrs</span>
                          {item.matchSnippet && (
                            <>
                              <span>•</span>
                              <span className="text-indigo-600 font-medium text-[11px]">
                                {item.matchSnippet}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center text-indigo-600 font-semibold text-xs gap-1">
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* UNKNOWN DEGREE HANDLING (Section 6) */}
            {normResult.isUnknown && (
              <div className="p-4 bg-slate-50/80 border-t border-slate-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      We couldn't find an exact match.
                    </h4>
                    <p className="text-xs text-slate-600">
                      Your degree:{" "}
                      <span className="font-semibold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        "{normResult.query}"
                      </span>
                    </p>
                    <p className="text-xs text-slate-500">
                      Possible related areas:{" "}
                      <span className="font-medium text-slate-700">
                        {normResult.inferredDiscipline}
                      </span>{" "}
                      ({normResult.inferredLevel})
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleUseCustomDegree}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Use this degree</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {normResult.suggestions.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handlePickRelated(normResult.suggestions[0].degree)}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all"
                    >
                      Choose related: {normResult.suggestions[0].degree.shortName}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Examples Grid as required by prompt */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Examples
        </span>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_DEGREES.map((eg) => (
            <button
              key={eg}
              type="button"
              onClick={() => {
                setSearchQuery(eg);
                inputRef.current?.focus();
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700 text-xs font-medium transition-all shadow-2xs"
            >
              {eg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
