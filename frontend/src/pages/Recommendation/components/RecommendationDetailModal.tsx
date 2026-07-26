import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, Lightbulb, BookOpen, Target, ShieldAlert } from 'lucide-react';
import type { RecommendationResponse } from '../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recommendation: RecommendationResponse | null;
}

export default function RecommendationDetailModal({ isOpen, onClose, recommendation }: Props) {
  if (!isOpen || !recommendation || !recommendation.career) return null;

  const { career, why_recommended, why_not_others, strengths, weaknesses, missing_skills, learning_suggestions } = recommendation;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex justify-between items-start bg-background/50">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{career.title}</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-primary/20 text-primary px-2.5 py-1 rounded-md font-medium border border-primary/20">
                  {recommendation.match_percentage}% Match
                </span>
                {career.base_salary_min && career.base_salary_max && (
                  <span className="bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border">
                    ₹{career.base_salary_min}L - ₹{career.base_salary_max}L / yr
                  </span>
                )}
                {career.difficulty && (
                  <span className="bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border">
                    {career.difficulty} Entry
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-background hover:bg-muted rounded-lg text-muted-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
            
            <section>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Why this career?
              </h3>
              <p className="text-muted-foreground leading-relaxed bg-background p-4 rounded-xl border border-border">
                {why_recommended || "No specific insight provided."}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Alternative Perspective
              </h3>
              <p className="text-muted-foreground leading-relaxed bg-background p-4 rounded-xl border border-border">
                {why_not_others || "No alternative insight provided."}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Your Strengths
                </h3>
                <ul className="space-y-2">
                  {strengths?.map((s, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span> {s}
                    </li>
                  ))}
                  {!strengths?.length && <p className="text-muted-foreground text-sm">None listed.</p>}
                </ul>
              </section>

              <section className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                <h3 className="text-rose-400 font-bold mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Weaknesses / Risks
                </h3>
                <ul className="space-y-2">
                  {weaknesses?.map((w, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span> {w}
                    </li>
                  ))}
                  {!weaknesses?.length && <p className="text-muted-foreground text-sm">None listed.</p>}
                </ul>
              </section>
            </div>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" /> Missing Skills to Acquire
              </h3>
              <div className="flex flex-wrap gap-2">
                {missing_skills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
                {!missing_skills?.length && <span className="text-muted-foreground">None identified.</span>}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" /> Suggested Learning Path
              </h3>
              <ul className="space-y-3">
                {learning_suggestions?.map((suggestion, i) => (
                  <li key={i} className="bg-background border border-border p-4 rounded-xl text-muted-foreground text-sm flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      {i + 1}
                    </span>
                    {suggestion}
                  </li>
                ))}
                {!learning_suggestions?.length && <p className="text-muted-foreground">No specific steps suggested.</p>}
              </ul>
            </section>
            
            <div className="pt-4 pb-2 border-t border-border flex justify-end">
              <a 
                href={`/careers/${career.id}`} 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
              >
                Open Full Career Hub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
