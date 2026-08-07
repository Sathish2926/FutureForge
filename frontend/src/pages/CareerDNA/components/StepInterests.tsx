import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const INTERESTS = [
  { id: 'Engineering', emoji: '⚙️', color: 'from-slate-100 to-slate-50 border-slate-200', desc: 'Building systems & solving problems' },
  { id: 'Business', emoji: '💼', color: 'from-amber-50 to-orange-50 border-amber-200', desc: 'Strategy, finance & entrepreneurship' },
  { id: 'Healthcare', emoji: '🏥', color: 'from-red-50 to-rose-50 border-red-200', desc: 'Medicine, wellness & patient care' },
  { id: 'Teaching', emoji: '📚', color: 'from-emerald-50 to-green-50 border-emerald-200', desc: 'Educating & mentoring others' },
  { id: 'Creative Arts', emoji: '🎨', color: 'from-pink-50 to-fuchsia-50 border-pink-200', desc: 'Design, music, film & writing' },
  { id: 'Research', emoji: '🔬', color: 'from-cyan-50 to-sky-50 border-cyan-200', desc: 'Scientific discovery & innovation' },
  { id: 'Law', emoji: '⚖️', color: 'from-yellow-50 to-amber-50 border-yellow-200', desc: 'Justice, policy & legal practice' },
  { id: 'Government', emoji: '🏛️', color: 'from-indigo-50 to-blue-50 border-indigo-200', desc: 'Public service & administration' },
  { id: 'Sports', emoji: '⚽', color: 'from-lime-50 to-green-50 border-lime-200', desc: 'Athletics, coaching & management' },
  { id: 'Technology', emoji: '💻', color: 'from-violet-50 to-purple-50 border-violet-200', desc: 'Software, AI & digital innovation' },
  { id: 'Agriculture', emoji: '🌱', color: 'from-emerald-50 to-teal-50 border-emerald-200', desc: 'Farming, food science & ecology' },
  { id: 'Environment', emoji: '🌍', color: 'from-teal-50 to-cyan-50 border-teal-200', desc: 'Sustainability & conservation' },
  { id: 'Media', emoji: '📸', color: 'from-orange-50 to-red-50 border-orange-200', desc: 'Journalism, broadcasting & content' },
  { id: 'Entrepreneurship', emoji: '🚀', color: 'from-purple-50 to-indigo-50 border-purple-200', desc: 'Starting & scaling ventures' },
  { id: 'Travel & Hospitality', emoji: '✈️', color: 'from-sky-50 to-blue-50 border-sky-200', desc: 'Tourism, events & management' },
  { id: 'Social Work', emoji: '🤝', color: 'from-rose-50 to-pink-50 border-rose-200', desc: 'Community development & welfare' },
];

export default function StepInterests({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [interests, setInterests] = useState<string[]>(initialData.interests || []);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && interests.length > 0) onNext({ interests });
    if (e.key === 'Escape') onBack();
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-5xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">What excites you?</h2>
        <p className="text-muted-foreground">Pick the fields that genuinely interest you. Select at least 2.</p>
      </div>

      {/* Count badge */}
      <div className="flex justify-center mb-6">
        <div className={cn(
          'px-4 py-2 rounded-full text-sm font-semibold transition-all',
          interests.length >= 2 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-muted text-muted-foreground'
        )}>
          {interests.length} selected {interests.length >= 2 ? '✓' : '(min 2)'}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {INTERESTS.map(({ id, emoji, color, desc }, i) => {
          const isSelected = interests.includes(id);
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggleInterest(id)}
              className={cn(
                'p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group',
                isSelected
                  ? 'bg-gradient-to-br from-[#2D305A]/10 to-[#E2E2FA]/20 border-[#2D305A] shadow-[0_0_16px_rgba(45,48,90,0.15)] scale-[1.03]'
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
                'text-sm font-semibold text-center transition-colors',
                isSelected ? 'text-[#2D305A]' : 'text-foreground'
              )}>
                {id}
              </span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight hidden sm:block">{desc}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={() => onNext({ interests })}
          disabled={interests.length < 2}
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
