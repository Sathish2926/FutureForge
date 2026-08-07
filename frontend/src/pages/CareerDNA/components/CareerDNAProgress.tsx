import { motion } from 'framer-motion';
import { Check, Dna, User, GraduationCap, Zap, Heart, Brain, BookOpen, Target, Settings2, FileCheck } from 'lucide-react';
import { cn } from '../../../lib/utils';

const STEP_META = [
  { icon: Dna, label: 'Welcome', time: 0 },
  { icon: User, label: 'Profile Type', time: 1 },
  { icon: GraduationCap, label: 'Academic', time: 2 },
  { icon: Zap, label: 'Skills', time: 1 },
  { icon: Heart, label: 'Interests', time: 1 },
  { icon: Brain, label: 'Personality', time: 2 },
  { icon: BookOpen, label: 'Learning', time: 1 },
  { icon: Target, label: 'Goals', time: 1 },
  { icon: Settings2, label: 'Preferences', time: 1 },
  { icon: FileCheck, label: 'DNA Report', time: 0 },
];

interface Props {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
}

export default function CareerDNAProgress({ currentStep, totalSteps, completionPercentage }: Props) {
  const estimatedMinutesLeft = STEP_META.slice(currentStep).reduce((sum, s) => sum + s.time, 0);

  return (
    <div className="w-full mb-6">
      {/* Top info bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            Step {currentStep} of {totalSteps - 1}
          </span>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {STEP_META[currentStep - 1]?.label || ''}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {estimatedMinutesLeft > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              ⏱ ~{estimatedMinutesLeft} min left
            </span>
          )}
          <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#2D305A] via-[#4f46e5] to-[#E2E2FA] rounded-full"
        />
      </div>

      {/* Step dots (hidden on mobile, visible on md+) */}
      <div className="hidden md:flex items-center justify-between px-1">
        {STEP_META.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const Icon = step.icon;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 relative group">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                  isCompleted
                    ? 'bg-[#2D305A] border-[#2D305A] text-white shadow-md'
                    : isCurrent
                    ? 'bg-white border-[#2D305A] text-[#2D305A] shadow-[0_0_12px_rgba(45,48,90,0.3)]'
                    : 'bg-muted/40 border-border text-muted-foreground/50'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors whitespace-nowrap',
                  isCurrent ? 'text-[#2D305A] font-semibold' : isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/50'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
