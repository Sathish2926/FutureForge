import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const LEARNING_STYLES = [
  { id: 'Videos', emoji: '🎬', desc: 'YouTube, courses, visual explanations', color: 'from-red-50 to-rose-50 border-red-200' },
  { id: 'Books & Articles', emoji: '📖', desc: 'Deep reading, textbooks, blogs', color: 'from-blue-50 to-indigo-50 border-blue-200' },
  { id: 'Hands-on Projects', emoji: '🛠️', desc: 'Learning by building real things', color: 'from-amber-50 to-orange-50 border-amber-200' },
  { id: 'Mentorship', emoji: '🧑‍🏫', desc: 'One-on-one guidance from experts', color: 'from-emerald-50 to-teal-50 border-emerald-200' },
  { id: 'Practice & Drills', emoji: '🎯', desc: 'Repetitive exercises, problem sets', color: 'from-purple-50 to-violet-50 border-purple-200' },
  { id: 'Online Courses', emoji: '💻', desc: 'Structured platforms like Coursera, Udemy', color: 'from-cyan-50 to-sky-50 border-cyan-200' },
  { id: 'Community Learning', emoji: '👥', desc: 'Study groups, forums, workshops', color: 'from-pink-50 to-rose-50 border-pink-200' },
  { id: 'Self-Exploration', emoji: '🧭', desc: 'Experimenting independently at own pace', color: 'from-lime-50 to-green-50 border-lime-200' },
];

export default function StepLearning({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [learningStyle, setLearningStyle] = useState<string>(initialData.learning_style || '');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && learningStyle) onNext({ learning_style: learningStyle });
    if (e.key === 'Escape') onBack();
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">How do you learn best?</h2>
        <p className="text-muted-foreground">Select your primary learning preference. We'll tailor your roadmap resources accordingly.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {LEARNING_STYLES.map(({ id, emoji, desc, color }, i) => {
          const isSelected = learningStyle === id;
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setLearningStyle(id)}
              className={cn(
                'p-5 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 text-center relative overflow-hidden group',
                isSelected
                  ? 'bg-gradient-to-br from-[#2D305A]/10 to-[#E2E2FA]/20 border-[#2D305A] shadow-[0_0_20px_rgba(45,48,90,0.15)] scale-[1.03]'
                  : `bg-gradient-to-br ${color} hover:scale-[1.03] hover:shadow-md`
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2D305A] text-white flex items-center justify-center"
                >
                  <span className="text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className={cn(
                'font-semibold text-sm transition-colors',
                isSelected ? 'text-[#2D305A]' : 'text-foreground'
              )}>
                {id}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">{desc}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={() => onNext({ learning_style: learningStyle })}
          disabled={!learningStyle}
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
