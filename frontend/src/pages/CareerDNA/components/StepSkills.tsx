import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft, Plus, X, Star } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SKILL_CATEGORIES = [
  {
    category: '💻 Technical',
    skills: ['Programming', 'Web Development', 'Data Analysis', 'Cloud Computing', 'AI / ML', 'Cyber Security', 'Mobile Development', 'Database Management']
  },
  {
    category: '🗣️ Communication',
    skills: ['Public Speaking', 'Writing', 'Presentation', 'Negotiation', 'Teaching', 'Storytelling']
  },
  {
    category: '🧠 Analytical',
    skills: ['Problem Solving', 'Critical Thinking', 'Research', 'Mathematics', 'Decision Making', 'Data Interpretation']
  },
  {
    category: '🎨 Creative',
    skills: ['Design', 'Content Creation', 'Photography', 'Video Editing', 'UX/UI Design', 'Branding']
  },
  {
    category: '📊 Business',
    skills: ['Marketing', 'Finance', 'Management', 'Entrepreneurship', 'Sales', 'Consulting', 'Project Management']
  },
  {
    category: '🤝 Interpersonal',
    skills: ['Leadership', 'Teamwork', 'Networking', 'Mentoring', 'Conflict Resolution', 'Empathy']
  },
];

export default function StepSkills({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [skills, setSkills] = useState<string[]>(initialData.skills || []);
  const [customSkill, setCustomSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !customSkill && skills.length > 0) onNext({ skills });
    if (e.key === 'Escape') onBack();
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-4xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Skills & Strengths</h2>
        <p className="text-muted-foreground">Select what you're good at or passionate about learning.</p>
      </div>

      {/* Selected skills count */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={cn(
          'px-4 py-2 rounded-full text-sm font-semibold transition-all',
          skills.length > 0 ? 'bg-[#2D305A]/10 text-[#2D305A]' : 'bg-muted text-muted-foreground'
        )}>
          {skills.length} skills selected
        </div>
        {skills.length >= 3 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-500 text-sm font-medium">
            ✓ Great selection!
          </motion.span>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(idx)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
              activeCategory === idx
                ? 'bg-[#2D305A] text-white border-[#2D305A] shadow-md'
                : 'bg-white/60 border-border text-muted-foreground hover:bg-muted'
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Skills grid for active category */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap gap-3 justify-center mb-6 min-h-[100px]"
        >
          {SKILL_CATEGORIES[activeCategory].skills.map((skill, i) => {
            const isSelected = skills.includes(skill);
            return (
              <motion.button
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggleSkill(skill)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2 flex items-center gap-2',
                  isSelected
                    ? 'bg-[#2D305A] text-white border-[#2D305A] shadow-[0_0_12px_rgba(45,48,90,0.3)] scale-105'
                    : 'bg-white/70 border-border text-foreground hover:bg-[#E2E2FA]/30 hover:border-[#2D305A]/30 hover:scale-105'
                )}
              >
                {isSelected && <Star className="w-3 h-3 fill-current" />}
                {skill}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selected skills preview */}
      {skills.length > 0 && (
        <div className="bg-background/50 border border-border rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Selected Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#2D305A]/10 text-[#2D305A] rounded-full text-xs font-medium border border-[#2D305A]/20"
              >
                {skill}
                <button onClick={() => toggleSkill(skill)} className="hover:text-destructive transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Custom skill input */}
      <form onSubmit={addCustomSkill} className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add a custom skill..."
          className="bg-white/60 border-border text-foreground"
        />
        <Button type="submit" variant="outline" className="bg-white/60 border-border text-foreground hover:bg-muted shrink-0">
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => onNext({ skills })} className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
