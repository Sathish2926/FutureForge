import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function StepGoals({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [careerGoal, setCareerGoal] = useState<string>(initialData.career_goal || '');

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Career Goals</h2>
      <p className="text-muted-foreground text-center mb-8">What are your long term objectives?</p>
      
      <div className="space-y-6 mb-10">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Ultimate Career Goal</label>
          <Input 
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            placeholder="e.g. Become a AI Researcher, Start my own agency..." 
            className="bg-background border-border text-foreground"
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          onClick={() => onNext({ career_goal: careerGoal })}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
