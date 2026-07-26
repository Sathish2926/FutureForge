import { Button } from '../../../components/ui/button';
import { ArrowLeft, CheckCircle2, Award, Briefcase, Brain, Heart, GraduationCap } from 'lucide-react';

export default function StepSummary({ data, onComplete, onEdit }: { data: any, onComplete: () => void, onEdit: (step: number) => void }) {
  
  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Career DNA Preview</h2>
      <p className="text-muted-foreground text-center mb-10">Your profile has been successfully mapped. Review the details below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-background border border-border rounded-xl p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-foreground font-medium flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-primary" /> Profile Type</h3>
            <button onClick={() => onEdit(2)} className="text-xs text-primary hover:underline">Edit</button>
          </div>
          <p className="text-muted-foreground">{data.user_type || 'Not specified'}</p>
        </div>
        
        <div className="bg-background border border-border rounded-xl p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-foreground font-medium flex items-center"><Award className="w-4 h-4 mr-2 text-amber-400" /> Skills</h3>
            <button onClick={() => onEdit(4)} className="text-xs text-primary hover:underline">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills?.slice(0, 5).map((s: string) => (
              <span key={s} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">{s}</span>
            ))}
            {data.skills?.length > 5 && <span className="text-xs text-muted-foreground">+{data.skills.length - 5} more</span>}
            {!data.skills?.length && <span className="text-muted-foreground text-sm">None selected</span>}
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-foreground font-medium flex items-center"><Heart className="w-4 h-4 mr-2 text-rose-400" /> Interests</h3>
            <button onClick={() => onEdit(5)} className="text-xs text-primary hover:underline">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.interests?.map((i: string) => (
              <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">{i}</span>
            ))}
            {!data.interests?.length && <span className="text-muted-foreground text-sm">None selected</span>}
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-foreground font-medium flex items-center"><Brain className="w-4 h-4 mr-2 text-cyan-400" /> Learning Style</h3>
            <button onClick={() => onEdit(7)} className="text-xs text-primary hover:underline">Edit</button>
          </div>
          <p className="text-muted-foreground">{data.learning_style || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={() => onEdit(9)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={onComplete} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
