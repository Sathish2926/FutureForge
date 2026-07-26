import { motion } from 'framer-motion';
import { Target, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { RecommendationResponse } from '../../../types';

interface Props {
  recommendation: RecommendationResponse;
  onViewDetails: (rec: RecommendationResponse) => void;
}

export default function RecommendationCard({ recommendation, onViewDetails }: Props) {
  const { career, match_percentage, confidence_score } = recommendation;
  
  if (!career) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card border-border shadow-sm flex flex-col h-full bg-background border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all pointer-events-none" />
      
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border text-2xl">
            {career.industry?.includes('Tech') ? '💻' : '🎯'}
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">{match_percentage}% Match</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">{career.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
          {career.description || recommendation.why_recommended}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Demand Score</span>
            <span className="text-foreground font-medium">{career.demand_score}/10</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> AI Confidence</span>
            <span className="text-foreground font-medium">{confidence_score}%</span>
          </div>
        </div>
        
        <Button onClick={() => onViewDetails(recommendation)} className="w-full bg-muted hover:bg-white/20 text-foreground border border-border">
          View Detailed Insights
        </Button>
      </div>
    </motion.div>
  );
}
