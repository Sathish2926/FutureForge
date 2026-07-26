import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const USER_TYPES = [
  '10th Student',
  '11th Student',
  '12th Student',
  'Diploma',
  'Undergraduate',
  'Postgraduate',
  'Job Seeker',
  'Working Professional',
  'Career Switcher'
];

export default function StepUserType({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [selected, setSelected] = useState<string>(initialData.user_type || '');

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Who are you?</h2>
      <p className="text-muted-foreground text-center mb-8">This determines the path of your Career DNA.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {USER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={cn(
              "p-4 rounded-xl border text-left transition-all duration-200",
              selected === type 
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                : "bg-background border-border text-muted-foreground hover:bg-muted hover:border-border"
            )}
          >
            <span className="block font-medium">{type}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          onClick={() => onNext({ user_type: selected })}
          disabled={!selected}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
