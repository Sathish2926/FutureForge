import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Sparkles, Briefcase, GraduationCap, Wifi, Bookmark, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { RecommendationResponse } from '../../../types';
import { cn } from '../../../lib/utils';

interface Props {
  recommendation: RecommendationResponse;
  onViewDetails: (rec: RecommendationResponse) => void;
  onGenerateRoadmap?: (careerId: number) => void;
  onBookmark?: (careerId: number) => void;
}

const INDUSTRY_EMOJIS: Record<string, string> = {
  'Technology': '💻', 'Tech': '💻', 'Healthcare': '🏥', 'Finance': '💰',
  'Education': '📚', 'Engineering': '⚙️', 'Design': '🎨', 'Marketing': '📊',
  'Science': '🔬', 'Law': '⚖️', 'Media': '📸', 'Agriculture': '🌱',
};

export default function RecommendationCard({ recommendation, onViewDetails, onGenerateRoadmap, onBookmark }: Props) {
  const navigate = useNavigate();
  const { career, match_percentage, confidence_score, why_recommended, missing_skills } = recommendation;

  if (!career) return null;

  const emoji = Object.entries(INDUSTRY_EMOJIS).find(([key]) => career.industry?.includes(key))?.[1] || '🎯';
  const matchColor = match_percentage >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                     match_percentage >= 60 ? 'text-[#2D305A] bg-[#E2E2FA] border-[#2D305A]/20' :
                     'text-amber-600 bg-amber-50 border-amber-200';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card border-border shadow-sm flex flex-col h-full bg-white/70 border border-border hover:border-[#2D305A]/40 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#2D305A]/5 rounded-full blur-[50px] group-hover:bg-[#2D305A]/10 transition-all pointer-events-none" />

      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Header: Icon + Match */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#E2E2FA] to-[#F4C7E6]/30 rounded-2xl flex items-center justify-center border border-[#2D305A]/10 text-2xl shadow-sm">
            {emoji}
          </div>
          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full border', matchColor)}>
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{match_percentage}%</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-[#2D305A] transition-colors">{career.title}</h3>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {career.industry && (
            <span className="px-2 py-0.5 bg-[#2D305A]/5 text-[#2D305A] rounded text-[10px] font-semibold border border-[#2D305A]/10">
              {career.industry}
            </span>
          )}
          {career.difficulty && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-medium">
              {career.difficulty}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {why_recommended || career.description || 'AI-powered career match based on your Career DNA.'}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-background rounded-lg p-2.5 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="w-3 h-3" /> Demand
            </div>
            <div className="font-bold text-sm text-foreground">{career.demand_score || 'N/A'}/10</div>
          </div>
          <div className="bg-background rounded-lg p-2.5 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Zap className="w-3 h-3" /> Confidence
            </div>
            <div className="font-bold text-sm text-foreground">{confidence_score}%</div>
          </div>
          <div className="bg-background rounded-lg p-2.5 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Briefcase className="w-3 h-3" /> Salary
            </div>
            <div className="font-bold text-sm text-foreground">
              ₹{career.base_salary_min || '?'}L–{career.base_salary_max || '?'}L
            </div>
          </div>
          <div className="bg-background rounded-lg p-2.5 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <GraduationCap className="w-3 h-3" /> Skills Gap
            </div>
            <div className="font-bold text-sm text-foreground">{missing_skills?.length || 0} skills</div>
          </div>
        </div>

        {/* Missing skills preview */}
        {missing_skills && missing_skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {missing_skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-medium border border-amber-200">
                {skill}
              </span>
            ))}
            {missing_skills.length > 3 && (
              <span className="text-[10px] text-muted-foreground self-center">+{missing_skills.length - 3} more</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/recommendations/${recommendation.id}`)}
            className="flex-1 bg-[#2D305A] hover:bg-[#2D305A]/90 text-white text-sm shadow-md"
            size="sm"
          >
            View Report <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
          <Button
            onClick={() => navigate(`/careers/${career.id}`)}
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-muted"
          >
            Career Hub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
