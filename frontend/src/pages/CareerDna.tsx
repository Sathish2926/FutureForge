import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import ProfessionalCareerDna from "../components/ProfessionalCareerDna";
import { Class10PathwayCatalog } from "../components/class10_catalog/Class10PathwayCatalog";
import GraduateCareerNavigator from "../components/graduate_navigator/GraduateCareerNavigator";
import { Compass, GraduationCap, Briefcase, School } from "lucide-react";

const STAGE_LABELS: Record<string, string> = {
  class10: "Class 10 (Post-Secondary)",
  ug: "College Degree / Graduate",
  job_switcher: "Working Professional",
};

function normalizeCareerDnaStage(stage?: string | null): string {
  if (!stage) return "ug";
  const normalized = stage.toLowerCase();
  if (normalized === "class10" || normalized === "10th") return "class10";
  if (normalized === "professional" || normalized === "job_switcher") return "job_switcher";
  return "ug";
}

const STAGE_HEADERS: Record<string, { title: string; subtitle: string; resultLabel: string }> = {
  class10: {
    title: "Explore Pathways & Streams after Class 10",
    subtitle: "Browse verified academic, technical, and vocational pathways with transparent entry facts, duration, and reversibility.",
    resultLabel: "Pathways",
  },
  ug: {
    title: "College Degree & Graduate Career Navigator",
    subtitle: "Discover high-ROI career tracks, master's programs, certifications, and step-by-step roadmaps tailored for degree students and graduates.",
    resultLabel: "Degree Pathways",
  },
  job_switcher: {
    title: "Explore your next career move",
    subtitle: "Leverage your experience to transition or advance in your career.",
    resultLabel: "Career Growth & Transition Options",
  },
};

export default function CareerDna() {
  const [searchParams] = useSearchParams();
  const queryStage = searchParams.get("stage");
  const [stage, setStage] = useState<string>(() => normalizeCareerDnaStage(queryStage));
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [guidance, setGuidance] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);



  // Initial mount: detect user profile stage and existing responses
  useEffect(() => {
    Promise.all([
      api.listMyCareerDna().catch(() => []),
      api.getDashboard().catch(() => null),
    ]).then(([myDnaList, dashData]) => {
      const completedMap: Record<string, boolean> = {};
      let preferredStage = "";

      if (Array.isArray(myDnaList)) {
        myDnaList.forEach((r: any) => {
          if (r.answers && Object.keys(r.answers).length > 0) {
            completedMap[r.stage] = true;
            if (!preferredStage) preferredStage = r.stage;
          }
        });
      }

      setCompletedStages(completedMap);

      if (!queryStage) {
        const userStage = normalizeCareerDnaStage(dashData?.profile?.education_stage || preferredStage);
        setStage(userStage);
      }
    });
  }, []);

  useEffect(() => {
    if (queryStage) {
      setStage(normalizeCareerDnaStage(queryStage));
    }
  }, [queryStage]);

  useEffect(() => {
    setGuidance(null);
    setAnswers({});
    setCurrentStepIndex(0);
    setLoading(true);

    if (stage === "class10") {
      api.getMyCareerDnaForStage("class10").catch(() => null)
        .then((existing) => {
          if (existing && existing.answers && Object.keys(existing.answers).length > 0) {
            setCompletedStages((prev) => ({ ...prev, class10: true }));
          }
        })
        .finally(() => setLoading(false));
      return;
    }

    if (stage === "class12") {
      api.getMyCareerDnaForStage("class12")
        .then((existing) => {
          if (existing && existing.answers && Object.keys(existing.answers).length > 0) {
            setAnswers(existing.answers || {});
            setGuidance(existing.guidance);
            setCompletedStages((prev) => ({ ...prev, class12: true }));
          }
        })
        .catch(() => null)
        .finally(() => setLoading(false));
      return;
    }

    if (stage === "ug" || stage === "job_switcher") {
      setLoading(false);
      return;
    }

    Promise.all([
      api.getCareerDnaQuestions(stage),
      api.getMyCareerDnaForStage(stage).catch(() => null),
    ])
      .then(([q, existing]) => {
        setQuestions(q.questions || []);
        if (existing && existing.answers && Object.keys(existing.answers).length > 0) {
          setAnswers(existing.answers || {});
          setGuidance(existing.guidance);
          setCurrentStepIndex(q.questions ? q.questions.length : 0);
          setCompletedStages((prev) => ({ ...prev, [stage]: true }));
        }
      })
      .finally(() => setLoading(false));
  }, [stage]);

  function setAnswer(id: string, value: any) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMulti(id: string, option: string) {
    setAnswers((prev) => {
      const current: string[] = prev[id] || [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [id]: next };
    });
  }

  async function submit() {
    setSubmitting(true);
    try {
      const result = await api.submitCareerDna(stage, answers);
      setGuidance(result.guidance);
      setCurrentStepIndex(questions.length);
    } catch (err: any) {
      console.error("Failed to submit assessment:", err);
      alert(err?.message || "Failed to submit assessment. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }


  const handleNext = () => {
    if (currentStepIndex < filteredQuestions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      submit();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const headerContent = STAGE_HEADERS[stage];

  const filteredQuestions = questions.filter((question) => {
    if (question.id === "target_role" && answers.target_role_status !== "Yes") {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (currentStepIndex >= filteredQuestions.length) {
      setCurrentStepIndex(Math.max(0, filteredQuestions.length - 1));
    }
  }, [currentStepIndex, filteredQuestions.length]);

  const currentQ = filteredQuestions[currentStepIndex] || filteredQuestions[0];

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto animate-fade-in">
      {/* Universal Cohort & Stage Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold font-heading text-white">
                Choose Your Educational & Career Stage
              </h2>
              <p className="text-xs text-slate-400">
                Select your path to unlock customized roadmaps, skill ladders, and guidance
              </p>
            </div>
          </div>

        </div>

        {/* 3 Main Highlighted Cohort Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 1. Class 10 */}
          <button
            type="button"
            onClick={() => setStage("class10")}
            className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between group ${stage === "class10"
                ? "bg-gradient-to-br from-blue-950/80 to-slate-900 border-blue-400 ring-2 ring-blue-400/50 shadow-lg"
                : "bg-slate-800/70 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              {stage === "class10" ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500 text-white">
                  Active
                </span>
              ) : completedStages.class10 ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Saved
                </span>
              ) : null}
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading group-hover:text-blue-300 transition-colors">
                Class 10 (Post-Secondary)
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                12 Foundation Streams (PCM, PCB, Commerce, Arts), Polytechnics & ITI Trade Certifications.
              </p>
            </div>
          </button>

          {/* 2. College Degree / Graduate */}
          <button
            type="button"
            onClick={() => setStage("ug")}
            className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between group ${stage === "ug"
                ? "bg-gradient-to-br from-brand-950/80 to-slate-900 border-brand-400 ring-2 ring-brand-400/50 shadow-lg"
                : "bg-slate-800/70 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center justify-center">
                <School className="w-5 h-5" />
              </div>
              {stage === "ug" ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500 text-white">
                  Active
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Degree Navigator
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading group-hover:text-brand-300 transition-colors">
                College Degree / Graduate
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                9 Degree Clusters (CS, B.Tech, B.Com, Design, etc.), Timelines, Skill Ladders, Templates & AI Chat.
              </p>
            </div>
          </button>

          {/* 3. Working Professional */}
          <button
            type="button"
            onClick={() => setStage("job_switcher")}
            className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between group ${stage === "job_switcher"
                ? "bg-gradient-to-br from-emerald-950/80 to-slate-900 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg"
                : "bg-slate-800/70 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              {stage === "job_switcher" ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  Active
                </span>
              ) : completedStages.job_switcher ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Saved
                </span>
              ) : null}
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading group-hover:text-emerald-300 transition-colors">
                Working Professional
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Career Transition Diagnostic, Role-to-Role Skill Gap Mapping, and Strategic Career Progression.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Stage Header Info (Dynamic for active stage) */}
      <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight font-heading">
              {headerContent.title}
            </h1>
          </div>
          <p className="text-slate-500 text-base">
            {headerContent.subtitle}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="card space-y-6 animate-pulse border-slate-200 max-w-3xl mx-auto">
          <div className="h-4 bg-slate-200 w-1/4 rounded-full"></div>
          <div className="h-8 bg-slate-200 w-3/4 rounded-lg mt-8"></div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="h-16 bg-slate-200 rounded-xl"></div>
            <div className="h-16 bg-slate-200 rounded-xl"></div>
            <div className="h-16 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Class 10 Pathway Catalog */}
          {stage === "class10" && (
            <div className="mt-4">
              <Class10PathwayCatalog />
            </div>
          )}

          {/* College Degree / Graduate Career Navigator */}
          {stage === "ug" && (
            <div className="mt-4">
              <GraduateCareerNavigator />
            </div>
          )}

          {/* Working Professional Assessment */}
          {stage === "job_switcher" && (
            <div className="mt-4">
              <ProfessionalCareerDna />
            </div>
          )}

        </>
      )}
    </div>
  );
}
