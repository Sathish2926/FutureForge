import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft, GraduationCap, BookOpen, Briefcase, Repeat, Search, School } from 'lucide-react';
import { cn } from '../../../lib/utils';

const USER_TYPES = [
  { id: '10th Student', icon: School, emoji: '📖', desc: 'Exploring options after 10th grade', color: 'from-blue-500/10 to-blue-600/5 border-blue-300' },
  { id: '11th / 12th Student', icon: School, emoji: '🎓', desc: 'Preparing for board exams & entrance tests', color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-300' },
  { id: 'Diploma', icon: BookOpen, emoji: '📋', desc: 'Pursuing or completed a diploma course', color: 'from-teal-500/10 to-teal-600/5 border-teal-300' },
  { id: 'Undergraduate', icon: GraduationCap, emoji: '🏫', desc: 'Currently pursuing a Bachelor\'s degree', color: 'from-purple-500/10 to-purple-600/5 border-purple-300' },
  { id: 'Postgraduate', icon: GraduationCap, emoji: '🎯', desc: 'Pursuing or completed a Master\'s degree', color: 'from-violet-500/10 to-violet-600/5 border-violet-300' },
  { id: 'Job Seeker', icon: Search, emoji: '🔍', desc: 'Looking for your first or next opportunity', color: 'from-amber-500/10 to-amber-600/5 border-amber-300' },
  { id: 'Working Professional', icon: Briefcase, emoji: '💼', desc: 'Currently employed and looking to grow', color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-300' },
  { id: 'Career Switcher', icon: Repeat, emoji: '🔄', desc: 'Transitioning to a different career path', color: 'from-rose-500/10 to-rose-600/5 border-rose-300' },
];

export default function StepUserType({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [selected, setSelected] = useState<string>(initialData.user_type || '');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selected) onNext({ user_type: selected });
    if (e.key === 'Escape') onBack();
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D305A]/10 text-[#2D305A] rounded-full text-xs font-semibold mb-4">
          Step 1 of 9
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">Who are you?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select your current stage. This adapts all future questions to be relevant to your specific situation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {USER_TYPES.map((type, i) => {
          const isSelected = selected === type.id;
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(type.id)}
              className={cn(
                'p-5 rounded-xl border-2 text-left transition-all duration-300 group relative overflow-hidden',
                isSelected
                  ? 'bg-gradient-to-br from-[#2D305A]/15 to-[#E2E2FA]/20 border-[#2D305A] shadow-[0_0_20px_rgba(45,48,90,0.15)] scale-[1.02]'
                  : `bg-gradient-to-br ${type.color} hover:scale-[1.02] hover:shadow-md`
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedIndicator"
                  className="absolute inset-0 bg-[#2D305A]/5 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <span className="text-3xl block mb-3">{type.emoji}</span>
                <h3 className={cn(
                  'font-semibold text-sm mb-1 transition-colors',
                  isSelected ? 'text-[#2D305A]' : 'text-foreground'
                )}>
                  {type.id}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={() => onNext({ user_type: selected })}
          disabled={!selected}
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
