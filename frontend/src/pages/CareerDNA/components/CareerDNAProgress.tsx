import { motion } from 'framer-motion';

export default function CareerDNAProgress({ currentStep, totalSteps, completionPercentage }: { currentStep: number, totalSteps: number, completionPercentage: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
      </div>
      <div className="h-2 w-full bg-background rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
    </div>
  );
}
