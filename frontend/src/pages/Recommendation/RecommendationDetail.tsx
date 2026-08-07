import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Target, ShieldAlert, CheckCircle2, XCircle, Lightbulb, BookOpen,
  Sparkles, TrendingUp, Briefcase, GraduationCap, Clock, ArrowRight, Zap, Map
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { fetchRecommendations } from '../../services/recommendations';
import type { RecommendationResponse } from '../../types';

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function RecommendationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rec, setRec] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const recommendations = await fetchRecommendations();
        const found = recommendations.find((r: RecommendationResponse) => String(r.id) === id);
        if (found) setRec(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl bg-muted" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-2xl bg-muted" />
          <Skeleton className="h-48 rounded-2xl bg-muted" />
        </div>
        <Skeleton className="h-40 rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!rec || !rec.career) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recommendation not found</h2>
        <Button onClick={() => navigate('/recommendations')} variant="outline">Back to Recommendations</Button>
      </div>
    );
  }

  const { career, match_percentage, confidence_score, why_recommended, why_not_others, strengths, weaknesses, missing_skills, learning_suggestions } = rec;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 pb-16">
      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate('/recommendations')} className="text-muted-foreground hover:text-foreground -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> All Recommendations
      </Button>

      {/* Hero Banner */}
      <motion.div {...fadeIn} className="glass-card border-border shadow-lg p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D305A]/5 via-transparent to-[#F4C7E6]/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D305A]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E2E2FA] to-[#F4C7E6]/30 flex items-center justify-center border-2 border-[#2D305A]/10 shadow-lg shrink-0">
            <span className="text-4xl">{career.industry?.includes('Tech') ? '💻' : '🎯'}</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{career.title}</h1>
              <span className="px-3 py-1 bg-[#2D305A]/10 text-[#2D305A] rounded-full text-sm font-bold border border-[#2D305A]/20">
                {match_percentage}% Match
              </span>
            </div>
            <p className="text-muted-foreground max-w-xl">{career.description || 'AI-recommended career path based on your Career DNA analysis.'}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {career.industry && <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium border border-border">{career.industry}</span>}
              {career.difficulty && <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium border border-border">{career.difficulty} Entry</span>}
              {career.base_salary_min && career.base_salary_max && <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">₹{career.base_salary_min}L – ₹{career.base_salary_max}L / yr</span>}
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
          <div className="bg-white/60 rounded-xl p-4 border border-border text-center">
            <Sparkles className="w-5 h-5 text-[#2D305A] mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{match_percentage}%</div>
            <div className="text-xs text-muted-foreground">Match Score</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-border text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{confidence_score}%</div>
            <div className="text-xs text-muted-foreground">AI Confidence</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-border text-center">
            <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{career.demand_score || '—'}/10</div>
            <div className="text-xs text-muted-foreground">Market Demand</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-border text-center">
            <GraduationCap className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-foreground">{missing_skills?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Skills to Learn</div>
          </div>
        </div>
      </motion.div>

      {/* Why This Career */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="glass-card border-border shadow-sm p-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#2D305A]" /> Why This Career Fits You
        </h2>
        <div className="bg-background border border-border rounded-xl p-5 text-muted-foreground leading-relaxed">
          {why_recommended || 'Based on your Career DNA analysis, this career aligns with your skills, interests, and personality profile.'}
        </div>
      </motion.div>

      {/* Alternative Perspective */}
      <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="glass-card border-border shadow-sm p-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" /> Alternative Perspective
        </h2>
        <div className="bg-background border border-border rounded-xl p-5 text-muted-foreground leading-relaxed">
          {why_not_others || 'While other careers may share similarities, this path offers the strongest alignment with your unique profile combination.'}
        </div>
      </motion.div>

      {/* Strengths & Weaknesses */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card border-border shadow-sm p-6 border-l-4 border-l-emerald-400">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Your Strengths
          </h3>
          <ul className="space-y-3">
            {strengths?.map((s, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-xs text-emerald-600 font-bold">{i + 1}</span>
                {s}
              </motion.li>
            ))}
            {!strengths?.length && <p className="text-muted-foreground text-sm">No specific strengths identified yet.</p>}
          </ul>
        </div>

        <div className="glass-card border-border shadow-sm p-6 border-l-4 border-l-rose-400">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500" /> Challenges & Risks
          </h3>
          <ul className="space-y-3">
            {weaknesses?.map((w, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-xs text-rose-600 font-bold">{i + 1}</span>
                {w}
              </motion.li>
            ))}
            {!weaknesses?.length && <p className="text-muted-foreground text-sm">No significant challenges identified.</p>}
          </ul>
        </div>
      </motion.div>

      {/* Missing Skills */}
      <motion.div {...fadeIn} transition={{ delay: 0.25 }} className="glass-card border-border shadow-sm p-8">
        <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" /> Skills You Need to Acquire
        </h2>
        <div className="flex flex-wrap gap-3">
          {missing_skills?.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="px-4 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              {skill}
            </motion.span>
          ))}
          {!missing_skills?.length && <span className="text-muted-foreground text-sm">All key skills covered! 🎉</span>}
        </div>
      </motion.div>

      {/* Suggested Learning Path */}
      <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="glass-card border-border shadow-sm p-8">
        <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-500" /> Suggested Learning Path
        </h2>
        <div className="space-y-4">
          {learning_suggestions?.map((suggestion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="bg-background border border-border p-5 rounded-xl flex gap-4 items-start hover:border-cyan-200 transition-colors"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 font-bold border border-cyan-200 shadow-sm">
                {i + 1}
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{suggestion}</p>
            </motion.div>
          ))}
          {!learning_suggestions?.length && <p className="text-muted-foreground text-sm">No specific learning steps suggested yet.</p>}
        </div>
      </motion.div>

      {/* CTA Actions */}
      <motion.div {...fadeIn} transition={{ delay: 0.35 }} className="glass-card border-border shadow-sm p-8 bg-gradient-to-br from-[#2D305A]/5 to-[#E2E2FA]/10">
        <h2 className="text-xl font-bold text-foreground mb-2">Ready to take action?</h2>
        <p className="text-muted-foreground mb-6">Explore the full career hub or generate a personalized execution roadmap.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate(`/careers/${career.id}`)}
            size="lg"
            className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-[0_4px_20px_rgba(45,48,90,0.3)] flex-1"
          >
            <Map className="w-5 h-5 mr-2" /> Open Career Hub
          </Button>
          <Button
            onClick={() => navigate('/recommendations')}
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-muted flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
