import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SUGGESTED_SKILLS = [
  'Programming', 'Communication', 'Leadership', 'Design', 'Teaching', 
  'Writing', 'Problem Solving', 'Mathematics', 'Business', 'Marketing', 
  'Finance', 'Management', 'Public Speaking', 'Research', 'Networking', 
  'Cloud', 'AI', 'Cyber Security', 'Data Analysis'
];

export default function StepSkills({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [skills, setSkills] = useState<string[]>(initialData.skills || []);
  const [customSkill, setCustomSkill] = useState('');

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills([...skills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Your Skills</h2>
      <p className="text-muted-foreground text-center mb-8">Select what you're good at or want to be good at.</p>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {SUGGESTED_SKILLS.map((skill) => {
          const isSelected = skills.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
                  : "bg-background border-border text-muted-foreground hover:bg-muted hover:border-border"
              )}
            >
              {skill}
            </button>
          )
        })}
        {/* Render custom skills that are not in suggested */}
        {skills.filter(s => !SUGGESTED_SKILLS.includes(s)).map(skill => (
           <button
             key={skill}
             onClick={() => toggleSkill(skill)}
             className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]"
           >
             {skill}
           </button>
        ))}
      </div>
      
      <form onSubmit={addCustomSkill} className="flex gap-2 max-w-md mx-auto mb-10">
        <Input 
          value={customSkill} 
          onChange={(e) => setCustomSkill(e.target.value)} 
          placeholder="Add custom skill..." 
          className="bg-background border-border text-foreground"
        />
        <Button type="submit" variant="outline" className="bg-background border-border text-foreground hover:bg-muted">
          <Plus className="w-4 h-4" />
        </Button>
      </form>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => onNext({ skills })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
