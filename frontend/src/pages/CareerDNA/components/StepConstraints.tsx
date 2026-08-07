import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { cn } from '../../../lib/utils';

const FINANCIAL_PREFERENCES = [
  { label: 'Needs Scholarship', emoji: '🎓', value: 'needs_scholarship' },
  { label: 'Self-Funded', emoji: '💰', value: 'self_funded' },
  { label: 'Loan Ready', emoji: '🏦', value: 'loan_ready' },
  { label: 'Flexible', emoji: '🔄', value: 'flexible' },
];

export default function StepConstraints({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [financialPref, setFinancialPref] = useState<string>(initialData.financial_background || '');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onBack();
  };

  const handleSubmit = () => {
    onNext({
      financial_background: financialPref,
    });
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Financial Approach</h2>
        <p className="text-muted-foreground">How are you planning to fund your upcoming education or upskilling?</p>
      </div>

      <div className="space-y-8 mb-10">
        {/* Financial Preference */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-[#2D305A]" />
            <h3 className="font-semibold text-foreground">Funding Strategy</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FINANCIAL_PREFERENCES.map(({ label, emoji, value }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFinancialPref(value)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-2',
                  financialPref === value
                    ? 'bg-[#2D305A]/10 border-[#2D305A] shadow-md'
                    : 'bg-white/50 border-border hover:bg-[#E2E2FA]/20'
                )}
              >
                <span className="text-2xl">{emoji}</span>
                <span className={cn('font-medium text-xs', financialPref === value ? 'text-[#2D305A]' : 'text-foreground')}>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleSubmit} disabled={!financialPref} className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
