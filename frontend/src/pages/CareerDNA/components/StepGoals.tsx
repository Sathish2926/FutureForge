import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft, TrendingUp, Scale, Clock, BrainCircuit } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SALARY_EXPECTATIONS = [
  { label: '₹3-6 LPA', value: '3-6 LPA', desc: 'Entry-level' },
  { label: '₹6-12 LPA', value: '6-12 LPA', desc: 'Mid-level' },
  { label: '₹12-25 LPA', value: '12-25 LPA', desc: 'Senior' },
  { label: '₹25-50 LPA', value: '25-50 LPA', desc: 'Lead/Expert' },
  { label: '₹50L+', value: '50+ LPA', desc: 'Executive' },
];

const WORK_LIFE = [
  { label: 'Work-first', emoji: '💼', desc: 'Career growth is priority' },
  { label: 'Balanced', emoji: '⚖️', desc: 'Equal work & personal time' },
  { label: 'Life-first', emoji: '🌿', desc: 'Flexibility & wellbeing first' },
];

const TIMELINE = [
  { label: '6 months', value: '6_months' },
  { label: '1 year', value: '1_year' },
  { label: '2-3 years', value: '2_3_years' },
  { label: '5+ years', value: '5_years' },
];

const CONFIDENCE_LEVELS = [
  { label: 'No Idea', value: 'No Idea', emoji: '🤷' },
  { label: 'Exploring', value: 'Exploring', emoji: '🔍' },
  { label: 'Shortlisted', value: 'Shortlisted', emoji: '📝' },
  { label: 'Completely Sure', value: 'Completely Sure', emoji: '🎯' },
];

export default function StepGoals({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [confidence, setConfidence] = useState<string>(initialData.career_confidence || '');
  const [salaryExpectation, setSalaryExpectation] = useState<string>(initialData.salary_expectation || '');
  const [workLifeBalance, setWorkLifeBalance] = useState<string>(initialData.work_life_balance || '');
  const [goalTimeline, setGoalTimeline] = useState<string>(initialData.goal_timeline || '');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onNext({ career_confidence: confidence, salary_expectation: salaryExpectation, work_life_balance: workLifeBalance, goal_timeline: goalTimeline });
    if (e.key === 'Escape') onBack();
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Career Aspirations</h2>
        <p className="text-muted-foreground">We know your ultimate career goal. Tell us more about your priorities.</p>
      </div>

      <div className="space-y-8 mb-10">
        {/* Confidence Level */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-foreground">How certain are you about your career goal?</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CONFIDENCE_LEVELS.map(({ label, value, emoji }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setConfidence(value)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-2',
                  confidence === value
                    ? 'bg-purple-50 border-purple-400 text-purple-700 shadow-md'
                    : 'bg-white/50 border-border text-foreground hover:bg-purple-50/30'
                )}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-semibold text-sm">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Salary Expectation */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-foreground">Expected Salary Range</h3>
            <span className="text-xs text-muted-foreground">(in 5 years)</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {SALARY_EXPECTATIONS.map(({ label, value, desc }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSalaryExpectation(value)}
                className={cn(
                  'px-4 py-3 rounded-xl border-2 transition-all duration-200 text-center min-w-[90px]',
                  salaryExpectation === value
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-md'
                    : 'bg-white/50 border-border text-foreground hover:bg-emerald-50/30'
                )}
              >
                <div className="font-bold text-sm">{label}</div>
                <div className="text-[10px] text-muted-foreground">{desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Work-Life Balance */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-[#F4C7E6]" />
            <h3 className="font-semibold text-foreground">Work-Life Priority</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {WORK_LIFE.map(({ label, emoji, desc }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setWorkLifeBalance(label)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-2',
                  workLifeBalance === label
                    ? 'bg-[#2D305A]/10 border-[#2D305A] shadow-md'
                    : 'bg-white/50 border-border hover:bg-[#E2E2FA]/20'
                )}
              >
                <span className="text-2xl">{emoji}</span>
                <span className={cn('font-semibold text-sm', workLifeBalance === label ? 'text-[#2D305A]' : 'text-foreground')}>{label}</span>
                <span className="text-[10px] text-muted-foreground">{desc}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Goal Timeline */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">When do you want to achieve your goal?</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {TIMELINE.map(({ label, value }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setGoalTimeline(value)}
                className={cn(
                  'px-5 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200',
                  goalTimeline === value
                    ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-md'
                    : 'bg-white/50 border-border text-foreground hover:bg-blue-50/30'
                )}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={() => onNext({ career_confidence: confidence, salary_expectation: salaryExpectation, work_life_balance: workLifeBalance, goal_timeline: goalTimeline })}
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
