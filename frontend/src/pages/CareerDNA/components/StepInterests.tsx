import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const INTERESTS = [
  { id: 'Engineering', emoji: '⚙️' },
  { id: 'Business', emoji: '💼' },
  { id: 'Healthcare', emoji: '🏥' },
  { id: 'Teaching', emoji: '📚' },
  { id: 'Creative Arts', emoji: '🎨' },
  { id: 'Research', emoji: '🔬' },
  { id: 'Law', emoji: '⚖️' },
  { id: 'Government', emoji: '🏛️' },
  { id: 'Sports', emoji: '⚽' },
  { id: 'Technology', emoji: '💻' },
  { id: 'Agriculture', emoji: '🌱' },
  { id: 'Environment', emoji: '🌍' },
  { id: 'Media', emoji: '📸' },
  { id: 'Entrepreneurship', emoji: '🚀' },
  { id: 'Travel', emoji: '✈️' }
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

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Your Interests</h2>
      <p className="text-muted-foreground text-center mb-8">What activities do you genuinely enjoy?</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {INTERESTS.map(({id, emoji}) => {
          const isSelected = interests.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleInterest(id)}
              className={cn(
                "p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200",
                isSelected 
                  ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                  : "bg-background border-border text-muted-foreground hover:bg-muted hover:border-border"
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm font-medium text-center">{id}</span>
            </button>
          )
        })}
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => onNext({ interests })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
