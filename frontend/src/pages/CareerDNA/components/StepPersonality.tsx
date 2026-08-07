import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SCENARIOS = [
  {
    key: 'work_environment',
    question: 'Your ideal work setting is...',
    type: 'either-or' as const,
    options: [
      { label: 'Working Solo', emoji: '🧘', desc: 'Focused, independent deep work' },
      { label: 'Small Team', emoji: '👥', desc: 'Close-knit collaborative group' },
      { label: 'Large Team', emoji: '🏢', desc: 'Dynamic organization with many roles' },
    ],
  },
  {
    key: 'problem_approach',
    question: 'You naturally gravitate towards...',
    type: 'either-or' as const,
    options: [
      { label: 'Solving Problems', emoji: '🧩', desc: 'Logical analysis & debugging' },
      { label: 'Creating Ideas', emoji: '💡', desc: 'Innovation & brainstorming' },
      { label: 'Managing People', emoji: '👔', desc: 'Leading teams & coordination' },
    ],
  },
  {
    key: 'risk_appetite',
    question: 'When it comes to career risks...',
    type: 'likert' as const,
    labels: ['Play it safe', 'Calculated risks', 'Bold & fearless'],
  },
  {
    key: 'challenge_response',
    question: 'Facing a tough challenge, you...',
    type: 'either-or' as const,
    options: [
      { label: 'Analyze First', emoji: '📊', desc: 'Break it down systematically' },
      { label: 'Experiment', emoji: '🧪', desc: 'Try things and iterate' },
      { label: 'Ask Others', emoji: '🙋', desc: 'Seek advice and collaborate' },
    ],
  },
  {
    key: 'deadline',
    question: 'Approaching a deadline, you...',
    type: 'either-or' as const,
    options: [
      { label: 'Plan Ahead', emoji: '📅', desc: 'Structured schedule, early finish' },
      { label: 'Under Pressure', emoji: '⚡', desc: 'Thrive when time is tight' },
      { label: 'Delegate Tasks', emoji: '🤝', desc: 'Distribute and coordinate' },
    ],
  },
  {
    key: 'leadership_style',
    question: 'Your natural leadership style is...',
    type: 'either-or' as const,
    options: [
      { label: 'Lead by Example', emoji: '🏆', desc: 'Show the way through action' },
      { label: 'Inspire & Motivate', emoji: '🔥', desc: 'Energize others with vision' },
      { label: 'Strategic Planner', emoji: '♟️', desc: 'Organize and optimize systems' },
    ],
  },
  {
    key: 'communication_style',
    question: 'You communicate best by...',
    type: 'likert' as const,
    labels: ['Written / Detailed', 'Balanced', 'Verbal / Spontaneous'],
  },
];

export default function StepPersonality({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const prev = initialData.answers || [];
    const map: Record<string, string> = {};
    prev.forEach((ans: any) => {
      map[ans.scenario_key] = ans.selected_option;
    });
    return map;
  });

  const [activeScenario, setActiveScenario] = useState(0);

  const handleSelect = (scenarioKey: string, option: string) => {
    setAnswers({ ...answers, [scenarioKey]: option });
    // Auto-advance to next scenario after selection
    setTimeout(() => {
      if (activeScenario < SCENARIOS.length - 1) {
        setActiveScenario(activeScenario + 1);
      }
    }, 400);
  };

  const handleNext = () => {
    const formattedAnswers = Object.entries(answers).map(([scenario_key, selected_option]) => ({
      scenario_key,
      selected_option,
    }));
    onNext({ answers: formattedAnswers });
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = SCENARIOS.every(s => answers[s.key]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isComplete) handleNext();
    if (e.key === 'Escape') onBack();
  };

  const currentScenario = SCENARIOS[activeScenario];

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Personality & Work Style</h2>
        <p className="text-muted-foreground">Short scenarios to understand your natural inclinations.</p>
      </div>

      {/* Scenario progress dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {SCENARIOS.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setActiveScenario(idx)}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2',
              answers[s.key]
                ? 'bg-[#2D305A] border-[#2D305A] text-white'
                : idx === activeScenario
                ? 'bg-white border-[#2D305A] text-[#2D305A] shadow-md'
                : 'bg-muted/50 border-border text-muted-foreground'
            )}
          >
            {answers[s.key] ? '✓' : idx + 1}
          </button>
        ))}
      </div>

      {/* Active scenario */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="mb-8"
        >
          <div className="bg-background border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">{currentScenario.question}</h3>

            {currentScenario.type === 'either-or' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentScenario.options!.map((option) => (
                  <motion.button
                    key={option.label}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(currentScenario.key, option.label)}
                    className={cn(
                      'p-5 rounded-xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-2',
                      answers[currentScenario.key] === option.label
                        ? 'bg-[#2D305A]/10 border-[#2D305A] shadow-[0_0_16px_rgba(45,48,90,0.15)]'
                        : 'bg-white/50 border-border hover:bg-[#E2E2FA]/20 hover:border-[#2D305A]/30'
                    )}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className={cn(
                      'font-semibold text-sm',
                      answers[currentScenario.key] === option.label ? 'text-[#2D305A]' : 'text-foreground'
                    )}>
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{option.desc}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {currentScenario.type === 'likert' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-muted-foreground px-2 mb-2">
                  {currentScenario.labels!.map(label => (
                    <span key={label} className="text-center max-w-[100px]">{label}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  {[1, 2, 3, 4, 5].map(val => {
                    const isSelected = answers[currentScenario.key] === String(val);
                    return (
                      <motion.button
                        key={val}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSelect(currentScenario.key, String(val))}
                        className={cn(
                          'flex-1 h-14 rounded-xl border-2 font-bold transition-all duration-300',
                          isSelected
                            ? 'bg-[#2D305A] border-[#2D305A] text-white shadow-lg scale-110'
                            : 'bg-white/50 border-border text-muted-foreground hover:bg-[#E2E2FA]/30 hover:border-[#2D305A]/30'
                        )}
                      >
                        {val}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows for scenarios */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setActiveScenario(Math.max(0, activeScenario - 1))}
              disabled={activeScenario === 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              ← Previous question
            </button>
            <button
              onClick={() => setActiveScenario(Math.min(SCENARIOS.length - 1, activeScenario + 1))}
              disabled={activeScenario === SCENARIOS.length - 1}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors flex items-center gap-1"
            >
              Next question <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Answer progress */}
      <div className="text-center mb-6">
        <span className={cn(
          'text-sm font-medium',
          isComplete ? 'text-emerald-600' : 'text-muted-foreground'
        )}>
          {answeredCount} of {SCENARIOS.length} answered {isComplete && '✓'}
        </span>
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext} disabled={!isComplete} className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
