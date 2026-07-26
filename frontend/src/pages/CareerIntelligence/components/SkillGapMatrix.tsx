import { CheckCircle2, Clock, Target, AlertCircle } from 'lucide-react';
import type { CareerSkillGap } from '../../../types';
import { cn } from '../../../lib/utils';

interface Props {
  gaps: CareerSkillGap[];
}

export default function SkillGapMatrix({ gaps }: Props) {
  const haveSkills = gaps.filter(g => g.user_has_skill);
  const needSkills = gaps.filter(g => !g.user_has_skill);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
        <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Skills You Have
        </h3>
        <div className="space-y-3">
          {haveSkills.map((s, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 flex justify-between items-center">
              <span className="text-foreground font-medium">{s.skill_name}</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Match</span>
            </div>
          ))}
          {haveSkills.length === 0 && <p className="text-muted-foreground text-sm">No direct matching skills found.</p>}
        </div>
      </div>

      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
        <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" /> Skills to Acquire
        </h3>
        <div className="space-y-3">
          {needSkills.map((s, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="text-foreground font-medium">{s.skill_name}</span>
                <span className={cn(
                  "text-xs px-2 py-1 rounded font-medium",
                  s.importance > 0.8 ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                )}>
                  {s.importance > 0.8 ? "High Priority" : "Medium Priority"}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {s.difficulty}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.estimated_learning_time}</span>
              </div>
            </div>
          ))}
          {needSkills.length === 0 && <p className="text-muted-foreground text-sm">You have all the required baseline skills!</p>}
        </div>
      </div>
    </div>
  );
}
