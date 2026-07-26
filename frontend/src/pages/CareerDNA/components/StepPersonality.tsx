import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SCENARIOS = [
  {
    key: 'work_environment',
    question: 'You prefer...',
    options: ['Working alone', 'Small Team', 'Large Team']
  },
  {
    key: 'problem_approach',
    question: 'You enjoy...',
    options: ['Solving Problems', 'Creating Ideas', 'Managing People']
  },
  {
    key: 'challenge_response',
    question: 'When facing a challenge...',
    options: ['Analyze', 'Experiment', 'Ask others']
  },
  {
    key: 'deadline',
    question: 'Approaching a deadline, you...',
    options: ['Plan ahead', 'Thrive under pressure', 'Delegate tasks']
  }
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

  const handleSelect = (scenarioKey: string, option: string) => {
    setAnswers({ ...answers, [scenarioKey]: option });
  };

  const handleNext = () => {
    const formattedAnswers = Object.entries(answers).map(([scenario_key, selected_option]) => ({
      scenario_key,
      selected_option
    }));
    onNext({ answers: formattedAnswers });
  };

  const isComplete = SCENARIOS.every(s => answers[s.key]);

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Personality & Traits</h2>
      <p className="text-muted-foreground text-center mb-8">Short scenarios to understand your natural inclinations.</p>
      
      <div className="space-y-8 mb-10">
        {SCENARIOS.map((scenario) => (
          <div key={scenario.key} className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">{scenario.question}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenario.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(scenario.key, option)}
                  className={cn(
                    "p-3 rounded-lg border text-sm font-medium transition-all duration-200",
                    answers[scenario.key] === option
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(79,70,229,0.3)]" 
                      : "bg-background border-border text-muted-foreground hover:bg-muted hover:border-border"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext} disabled={!isComplete} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
