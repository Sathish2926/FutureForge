import { useState, useEffect, useRef, useId } from "react";
import { Search, X, Compass, ArrowRight, Clock, Send, Sparkles, AlertCircle, Check } from "lucide-react";
import { Career } from "../../data/roadmapTypes";
import { searchCareers, getClosestFallbackCareers, SearchMatch } from "../../data/searchUtility";
import { getRecentSearches, addRecentSearch, recordMissingCareerRequest } from "../../data/roadmapStore";
import { getGroupTheme } from "../../data/roadmapTheme";
import StepTypeBadge from "./StepTypeBadge";

interface Props {
  careers: Career[];
  onConfirmCareer: (career: Career, nickname?: string) => void;
  maxReached?: boolean;
}

export default function RoadmapSearchBox({ careers, onConfirmCareer, maxReached = false }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Preview card state (with first 3 steps as mini-trail)
  const [previewCareer, setPreviewCareer] = useState<Career | null>(null);
  const [nicknameInput, setNicknameInput] = useState("");

  // Missing career request modal
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestQuery, setRequestQuery] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Load recent searches
  const refreshRecent = () => {
    setRecentSearches(getRecentSearches().slice(0, 5));
  };

  useEffect(() => {
    refreshRecent();
  }, []);

  // Keyboard shortcut: '/' focuses search input
  useEffect(() => {
    function handleGlobalSlash(e: KeyboardEvent) {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleGlobalSlash);
    return () => window.removeEventListener("keydown", handleGlobalSlash);
  }, []);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 180);
    return () => clearTimeout(handler);
  }, [query]);

  // Execute search
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed || trimmed.length < 2) {
      setMatches([]);
      setActiveIndex(-1);
      setValidationError(null);
      return;
    }

    if (!/[a-zA-Z]/.test(trimmed)) {
      setMatches([]);
      setValidationError("Please enter letters or a valid career title to search.");
      return;
    }

    setValidationError(null);
    const results = searchCareers(trimmed, careers);
    setMatches(results);
    setActiveIndex(results.length > 0 ? 0 : -1);
    setIsDropdownOpen(true);
  }, [debouncedQuery, careers]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCareer = (career: Career) => {
    addRecentSearch(career.name);
    refreshRecent();
    setIsDropdownOpen(false);
    setPreviewCareer(career);
    setNicknameInput("");
    setQuery("");
  };

  const handleConfirmCreate = () => {
    if (!previewCareer) return;
    onConfirmCareer(previewCareer, nicknameInput.trim() || undefined);
    setPreviewCareer(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
      return;
    }

    if (!isDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (matches.length > 0) {
        setActiveIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (matches.length > 0) {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim().length === 0) {
        setValidationError("Type a career to search.");
        return;
      }
      if (matches.length > 0 && activeIndex >= 0 && activeIndex < matches.length) {
        handleSelectCareer(matches[activeIndex].career);
      } else if (matches.length > 0) {
        handleSelectCareer(matches[0].career);
      } else {
        setRequestQuery(query.trim());
        setShowRequestModal(true);
      }
    }
  };

  const fallbackCareers = query.trim().length >= 2 && matches.length === 0
    ? getClosestFallbackCareers(query, careers)
    : [];

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={containerRef}>
      {/* Hero-style Search Input Box with Focus Glow & '/' Hint */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15 dark:focus-within:ring-brand-500/25 transition-all p-1.5 flex items-center">
        <div className="pl-3.5 pr-2 text-slate-400 dark:text-slate-500 flex items-center justify-center">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isDropdownOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && matches[activeIndex]
              ? `career-option-${matches[activeIndex].career.id}`
              : undefined
          }
          className="w-full py-2.5 px-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-base md:text-lg focus:outline-none border-none"
          placeholder="Search a career, job title, degree or exam..."
          value={query}
          onFocus={() => {
            refreshRecent();
            setIsDropdownOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setValidationError(null);
          }}
          onKeyDown={handleKeyDown}
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setMatches([]);
              setIsDropdownOpen(false);
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg mr-1 cursor-pointer"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 mr-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs">
            /
          </kbd>
        )}
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite">
        {matches.length > 0 ? `${matches.length} matching careers found. Use arrow keys to navigate.` : ""}
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl px-3.5 py-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Suggestion Dropdown (Combobox Listbox) */}
      {isDropdownOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl z-40 overflow-hidden animate-slide-up max-h-96 flex flex-col"
        >
          {/* Empty query: Show ONLY recent searches (max 5); no full career list! */}
          {!query.trim() && (
            <div className="p-4">
              {recentSearches.length > 0 ? (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Recent Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-700 dark:hover:text-brand-300 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-400 dark:text-slate-500">
                  Type a career, degree (e.g. MBBS, B.Tech, CA), or entrance exam (e.g. NEET, UPSC, GATE).
                </div>
              )}
            </div>
          )}

          {/* Results: Top 8 matches */}
          {query.trim().length >= 2 && matches.length > 0 && (
            <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Top Matches ({matches.length})</span>
                <span>Press Enter to select</span>
              </div>
              {matches.map((item, idx) => {
                const isSelected = idx === activeIndex;
                const groupTheme = getGroupTheme(item.career.group);

                return (
                  <div
                    key={item.career.id}
                    id={`career-option-${item.career.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCareer(item.career)}
                    className={`p-3.5 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-brand-50/80 dark:bg-slate-800 text-brand-900 dark:text-white"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.career.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${groupTheme.badgeBg} ${groupTheme.badgeText} ${groupTheme.badgeBorder}`}
                        >
                          {item.career.group}
                        </span>
                      </div>
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        Matched: {item.matchedText}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.career.steps.length} verified steps • Reviewed {item.career.lastReviewed}
                      </p>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-brand-600 translate-x-1" : "text-slate-300 dark:text-slate-600"}`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* No matches */}
          {query.trim().length >= 2 && matches.length === 0 && !validationError && (
            <div className="p-6 text-center space-y-4">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No roadmap for &lsquo;{query}&rsquo; yet.
              </p>

              {fallbackCareers.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">Did you mean one of these?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {fallbackCareers.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectCareer(c)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        {c.name} ({c.group})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setRequestQuery(query.trim());
                    setShowRequestModal(true);
                    setIsDropdownOpen(false);
                  }}
                  className="btn-primary py-2 px-4 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request this career
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PREVIEW CARD: Shows first 3 steps as mini-trail before creating */}
      {previewCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-850 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-700 relative animate-scale-up space-y-5">
            <button
              onClick={() => setPreviewCareer(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Cancel preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center shadow-md font-bold text-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[10px] font-bold uppercase tracking-wider border border-brand-100 dark:border-brand-800">
                  {previewCareer.group}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                  {previewCareer.name}
                </h3>
              </div>
            </div>

            {/* Mini Trail Preview (First 3 Steps) */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Pathway Preview (First 3 Milestones)</span>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">{previewCareer.steps.length} Steps Total</span>
              </div>

              <div className="space-y-2">
                {previewCareer.steps.slice(0, 3).map((st, i) => (
                  <div key={st.id} className="flex items-start gap-2.5 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-750 text-xs">
                    <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{st.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{st.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Nickname input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Optional Roadmap Nickname
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900 dark:text-white text-sm font-medium"
                placeholder="e.g. My 2026 Target, Backup Plan, Primary Focus"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
            </div>

            {maxReached && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                You have reached the maximum limit of 10 active roadmaps. Delete an existing roadmap to create a new one.
              </div>
            )}

            {/* Confirmation Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreviewCareer(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCreate}
                disabled={maxReached}
                className="btn-primary px-5 py-2 text-sm font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Create Roadmap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-850 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 relative animate-scale-up space-y-4">
            <button
              onClick={() => {
                setShowRequestModal(false);
                setRequestSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Request a New Roadmap
              </h3>
            </div>

            {requestSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 text-center space-y-2">
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Request Recorded!</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Thank you. We have logged your request for &lsquo;{requestQuery}&rsquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestSubmitted(false);
                  }}
                  className="btn-primary mt-2 py-1.5 px-4 text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!requestQuery.trim()) return;
                  recordMissingCareerRequest(requestQuery.trim(), requestNotes.trim(), requestEmail.trim());
                  setRequestSubmitted(true);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Career Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    value={requestQuery}
                    onChange={(e) => setRequestQuery(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Specializations / Notes
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm resize-none focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    placeholder="Specific exam or state..."
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    placeholder="name@example.com"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
