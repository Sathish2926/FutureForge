import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, TrendingUp, AlertCircle, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { routePaths } from '../../constants/routes';
import { fetchCareerIntelligence, fetchMatchAnalysis, fetchSkillGap, toggleCareerBookmark } from '../../services/careerIntelligence';
import { fetchExamsForCareer, fetchCertificationsForCareer } from '../../services/education';
import { generateRoadmap } from '../../services/roadmap';
import type { CareerIntelligenceResponse, MatchAnalysisResponse, CareerSkillGap, EntranceExamDetail, CertificationBase } from '../../types';

import MatchAnalysisRadar from './components/MatchAnalysisRadar';
import SkillGapMatrix from './components/SkillGapMatrix';

export default function CareerIntelligencePage() {
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
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

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
        toast("Failed to load career intelligence", "error");
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

  const handleGenerateRoadmap = async () => {
    if (!id) return;
    setIsGeneratingRoadmap(true);
    try {
      const res = await generateRoadmap(parseInt(id));
      toast("Roadmap generated successfully!", "success");
      navigate(`/roadmap/${res.id}`);
    } catch {
      toast("Failed to generate roadmap", "error");
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  if (loading || !data || !matchData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const { career, detail, insight } = data;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Recommendations
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-background border border-border p-8 rounded-2xl">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider">
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
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="bg-background border border-border rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{matchData.overall_match}%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Overall Match</div>
              </div>
              <Button 
                onClick={handleBookmark} 
                disabled={isBookmarking}
                variant={data.is_bookmarked ? "default" : "outline"} 
                className={data.is_bookmarked ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                {data.is_bookmarked ? "Bookmarked" : "Save Career"}
              </Button>
              <Button
                onClick={handleGenerateRoadmap}
                disabled={isGeneratingRoadmap}
                className="bg-emerald-500 hover:bg-emerald-600 text-foreground shadow-lg shadow-emerald-500/25"
              >
                {isGeneratingRoadmap ? "Generating..." : "Generate Execution Roadmap"}
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Responsibilities */}
            <section className="glass-card border-border shadow-sm p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" /> Core Responsibilities
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detail?.responsibilities?.map((res, i) => (
                  <li key={i} className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="text-muted-foreground text-sm">{res}</span>
                  </li>
                ))}
                {!detail?.responsibilities && <p className="text-muted-foreground">Standard responsibilities apply for this role.</p>}
              </ul>
            </section>

            {/* Skill Gap */}
            <section className="glass-card border-border shadow-sm p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-emerald-400" /> Skill Gap Analysis
              </h2>
              <SkillGapMatrix gaps={gaps} />
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Match Radar */}
            <section className="glass-card border-border shadow-sm p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">Match Breakdown</h3>
              <MatchAnalysisRadar data={matchData} />
            </section>

            {/* Career Insights */}
            <section className="glass-card border-border shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" /> Market Insights
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase mb-1">Expected Salary Range</div>
                  <div className="font-bold text-foreground bg-background border border-border px-4 py-2 rounded-lg">
                    ₹{career.base_salary_min || 'N/A'}L - ₹{career.base_salary_max || 'N/A'}L
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-muted-foreground uppercase mb-1">Automation Risk</div>
                  <div className="flex items-center gap-2 font-medium text-foreground bg-background border border-border px-4 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    {insight?.automation_risk || 'Low Risk'}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase mb-1">Future Demand Score</div>
                  <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-2.5 rounded-full" 
                      style={{ width: `${(career.demand_score || 0) * 10}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-muted-foreground mt-1">{career.demand_score}/10</div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* KMS Integration Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Related Exams */}
          <section className="glass-card border-border shadow-sm p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">E</span>
              Required Entrance Exams
            </h2>
            {exams.length > 0 ? (
              <div className="space-y-4">
                {exams.map(exam => (
                  <div key={exam.id} className="bg-background border border-border p-5 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{exam.name}</h3>
                      <span className="px-2.5 py-1 bg-muted text-xs text-muted-foreground rounded-md">Difficulty: {exam.difficulty || 'N/A'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{exam.full_name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background border border-border p-6 rounded-xl text-center">
                <p className="text-muted-foreground">No specific entrance exams required or mapped yet.</p>
              </div>
            )}
          </section>

          {/* Related Certifications */}
          <section className="glass-card border-border shadow-sm p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">C</span>
              Recommended Certifications
            </h2>
            {certs.length > 0 ? (
              <div className="space-y-4">
                {certs.map(cert => (
                  <div key={cert.id} className="bg-background border border-border p-5 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cert.name}</h3>
                      <span className="px-2.5 py-1 bg-muted text-xs text-muted-foreground rounded-md">{cert.level || 'Beginner'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">Provider: {cert.provider_name}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        View Certification &rarr;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background border border-border p-6 rounded-xl text-center">
                <p className="text-muted-foreground">No specific certifications mapped yet.</p>
              </div>
            )}
          </section>

        </div>

      </div>
    </div>
  );
}
