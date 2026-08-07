import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bookmark, TrendingUp, AlertCircle, Briefcase, 
  GraduationCap, Map, BookOpen, Target, ShieldAlert, Sparkles 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { useToast } from '../../components/ui/toast';
import { fetchCareerIntelligence, fetchMatchAnalysis, fetchSkillGap, toggleCareerBookmark } from '../../services/careerIntelligence';
import { fetchExamsForCareer, fetchCertificationsForCareer } from '../../services/education';
import type { CareerIntelligenceResponse, MatchAnalysisResponse, CareerSkillGap, EntranceExamDetail, CertificationBase } from '../../types';
import { cn } from '../../lib/utils';

import MatchAnalysisRadar from './components/MatchAnalysisRadar';
import SkillGapMatrix from './components/SkillGapMatrix';
import RoadmapEmbed from './components/RoadmapEmbed';

type Tab = 'overview' | 'skills' | 'learning' | 'roadmap';

const TABS: { id: Tab, label: string, icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'skills', label: 'Skills & Match', icon: ShieldAlert },
  { id: 'learning', label: 'Learning & Exams', icon: BookOpen },
  { id: 'roadmap', label: 'Execution Roadmap', icon: Map },
];

export default function CareerHubPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CareerIntelligenceResponse | null>(null);
  const [matchData, setMatchData] = useState<MatchAnalysisResponse | null>(null);
  const [gaps, setGaps] = useState<CareerSkillGap[]>([]);
  const [exams, setExams] = useState<EntranceExamDetail[]>([]);
  const [certs, setCerts] = useState<CertificationBase[]>([]);
  const [isBookmarking, setIsBookmarking] = useState(false);
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const parsedId = parseInt(id);
        const [intel, match, skillGaps, careerExams, careerCerts] = await Promise.all([
          fetchCareerIntelligence(parsedId),
          fetchMatchAnalysis(parsedId),
          fetchSkillGap(parsedId),
          fetchExamsForCareer(parsedId),
          fetchCertificationsForCareer(parsedId)
        ]);
        setData(intel);
        setMatchData(match);
        setGaps(skillGaps);
        setExams(careerExams);
        setCerts(careerCerts);
      } catch (e: any) {
        toast("Failed to load career hub", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, toast]);

  const handleBookmark = async () => {
    if (!id || !data) return;
    setIsBookmarking(true);
    try {
      const res = await toggleCareerBookmark(parseInt(id));
      setData({ ...data, is_bookmarked: res.status === 'added' });
      toast(res.status === 'added' ? "Saved to Bookmarks" : "Removed from Bookmarks", "success");
    } catch {
      toast("Failed to update bookmark", "error");
    } finally {
      setIsBookmarking(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 pt-24 space-y-8">
        <Skeleton className="h-64 w-full rounded-3xl bg-muted" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-full bg-muted" />
          <Skeleton className="h-12 w-32 rounded-full bg-muted" />
          <Skeleton className="h-12 w-32 rounded-full bg-muted" />
        </div>
        <Skeleton className="h-96 w-full rounded-3xl bg-muted" />
      </div>
    );
  }

  if (!data || !matchData) return <div className="pt-24 text-center">Career not found.</div>;

  const { career, detail, insight } = data;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="glass-card border-border shadow-lg p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#2D305A]/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#2D305A]/10 text-[#2D305A] border border-[#2D305A]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    {career.industry || 'General'}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground border border-border rounded-full text-xs font-medium">
                    Difficulty: {career.difficulty || 'Medium'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{career.title}</h1>
                <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                  {career.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 min-w-[200px]">
                <div className="bg-white/60 border border-border rounded-2xl p-5 text-center shadow-sm">
                  <div className="text-3xl font-bold text-[#2D305A] mb-1 flex justify-center items-center gap-2">
                    {matchData.overall_match}% <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Overall Match</div>
                </div>
                <Button 
                  onClick={handleBookmark} 
                  disabled={isBookmarking}
                  variant={data.is_bookmarked ? "default" : "outline"} 
                  className={cn("w-full shadow-sm", data.is_bookmarked ? "bg-[#2D305A] hover:bg-[#2D305A]/90 text-white" : "border-border text-foreground hover:bg-muted")}
                >
                  <Bookmark className={cn("w-4 h-4 mr-2", data.is_bookmarked ? "fill-current" : "")} />
                  {data.is_bookmarked ? "Saved to Profile" : "Save Career"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2 sticky top-20 z-20 bg-background/80 backdrop-blur-md pt-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border-2",
                activeTab === tab.id
                  ? "bg-[#2D305A] text-white border-[#2D305A] shadow-md shadow-[#2D305A]/20"
                  : "bg-white/60 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-white" : "text-muted-foreground")} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section className="glass-card border-border shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-[#2D305A]" /> Core Responsibilities
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detail?.responsibilities?.map((res, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white/50 p-4 rounded-xl border border-border">
                          <span className="text-[#2D305A] mt-0.5">•</span>
                          <span className="text-muted-foreground text-sm leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="glass-card border-border shadow-sm p-8 bg-gradient-to-br from-amber-500/5 to-rose-500/5">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" /> Market Insights
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-white/70 p-4 rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Salary Range</div>
                        <div className="text-2xl font-bold text-foreground">
                          ₹{career.base_salary_min || 'N/A'}L <span className="text-lg text-muted-foreground font-normal">to</span> ₹{career.base_salary_max || 'N/A'}L
                        </div>
                      </div>
                      <div className="bg-white/70 p-4 rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Demand Score</div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Future Outlook</span>
                          <span className="text-sm font-bold text-emerald-600">{career.demand_score}/10</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(career.demand_score || 0) * 10}%` }} />
                        </div>
                      </div>
                      <div className="bg-white/70 p-4 rounded-xl border border-border flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Automation Risk</div>
                          <div className="text-sm font-bold text-foreground">{insight?.automation_risk || 'Low Risk'}</div>
                        </div>
                        <AlertCircle className="w-6 h-6 text-rose-400" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* ── SKILLS & MATCH TAB ── */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <section className="glass-card border-border shadow-sm p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-6 text-center">Match Profile Breakdown</h3>
                    <div className="flex-1 flex items-center justify-center min-h-[300px]">
                      <MatchAnalysisRadar data={matchData} />
                    </div>
                  </section>
                </div>
                <div className="lg:col-span-2">
                  <section className="glass-card border-border shadow-sm p-8 h-full">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-emerald-500" /> Skill Gap Matrix
                    </h2>
                    <SkillGapMatrix gaps={gaps} />
                  </section>
                </div>
              </div>
            )}

            {/* ── LEARNING & EXAMS TAB ── */}
            {activeTab === 'learning' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="glass-card border-border shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-sm border border-blue-100">E</span>
                    Entrance Exams
                  </h2>
                  {exams.length > 0 ? (
                    <div className="space-y-4">
                      {exams.map(exam => (
                        <div key={exam.id} className="bg-white/60 border border-border p-5 rounded-xl hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">{exam.name}</h3>
                            <span className="px-2.5 py-1 bg-white shadow-sm text-xs text-muted-foreground rounded-md border border-border">Difficulty: {exam.difficulty || 'N/A'}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{exam.full_name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/50 border border-border p-8 rounded-xl text-center border-dashed">
                      <p className="text-muted-foreground">No specific entrance exams mapped.</p>
                    </div>
                  )}
                </section>

                <section className="glass-card border-border shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold shadow-sm border border-purple-100">C</span>
                    Certifications
                  </h2>
                  {certs.length > 0 ? (
                    <div className="space-y-4">
                      {certs.map(cert => (
                        <div key={cert.id} className="bg-white/60 border border-border p-5 rounded-xl hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">{cert.name}</h3>
                            <span className="px-2.5 py-1 bg-white shadow-sm text-xs text-muted-foreground rounded-md border border-border">{cert.level || 'Beginner'}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Provider: {cert.provider_name}</p>
                          {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline">
                              View details &rarr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/50 border border-border p-8 rounded-xl text-center border-dashed">
                      <p className="text-muted-foreground">No certifications mapped yet.</p>
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* ── EXECUTION ROADMAP TAB ── */}
            {activeTab === 'roadmap' && (
              <RoadmapEmbed careerId={parseInt(id!)} />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
