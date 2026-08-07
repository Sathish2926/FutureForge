import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Code2, BookOpen, RefreshCw, Trophy, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';
import { fetchUserRoadmaps, generateRoadmap, completeMilestone } from '../../../services/roadmap';
import type { RoadmapBase } from '../../../types';
import { cn } from '../../../lib/utils';

interface Props {
  careerId: number;
}

export default function RoadmapEmbed({ careerId }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapBase | null>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const roadmaps = await fetchUserRoadmaps();
        const found = roadmaps.find(r => r.career_id === careerId);
        if (found) {
          setRoadmap(found);
          const active = found.milestones?.find(m => m.status !== 'completed') || found.milestones?.[0];
          if (active) setActiveMilestoneId(active.id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [careerId]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await generateRoadmap(careerId);
      setRoadmap(res);
      toast("Execution roadmap generated successfully!", "success");
      const active = res.milestones?.find(m => m.status !== 'completed') || res.milestones?.[0];
      if (active) setActiveMilestoneId(active.id);
    } catch (e) {
      toast("Failed to generate roadmap", "error");
    } finally {
      setGenerating(false);
    }
  };

  const handleComplete = async (milestoneId: number) => {
    try {
      await completeMilestone(milestoneId, 'completed');
      toast("Milestone completed! Keep up the great work. 🎉", "success");
      
      setRoadmap(prev => {
        if (!prev) return prev;
        const newMilestones = prev.milestones?.map(m => m.id === milestoneId ? { ...m, status: 'completed' } : m) || [];
        const completedCount = newMilestones.filter(m => m.status === 'completed').length;
        const totalCount = newMilestones.length;
        const newPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        
        return { ...prev, milestones: newMilestones, completion_percentage: newPercentage };
      });
      
      // Auto-advance to next incomplete
      setTimeout(() => {
        setRoadmap(current => {
          if (!current) return current;
          const nextIncomplete = current.milestones?.find(m => m.status !== 'completed');
          if (nextIncomplete) setActiveMilestoneId(nextIncomplete.id);
          return current;
        });
      }, 1000);
      
    } catch (e) {
      toast("Failed to update milestone status", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#2D305A]/30 border-t-[#2D305A] rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading execution tracker...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="glass-card border-border shadow-sm p-12 text-center bg-gradient-to-br from-[#2D305A]/5 to-[#E2E2FA]/10">
        <Trophy className="w-16 h-16 text-[#2D305A] mx-auto mb-6 opacity-80" />
        <h2 className="text-2xl font-bold text-foreground mb-3">No Execution Roadmap Yet</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Transform this career path into actionable steps. Our AI will generate a personalized curriculum, project ideas, and milestones tailored to your current skill level.
        </p>
        <Button 
          onClick={handleGenerate} 
          disabled={generating} 
          size="lg"
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-lg shadow-[#2D305A]/20"
        >
          {generating ? (
            <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating Roadmap...</>
          ) : (
            <><Zap className="w-5 h-5 mr-2" /> Generate Execution Roadmap</>
          )}
        </Button>
      </div>
    );
  }

  const activeMilestone = roadmap.milestones?.find(m => m.id === activeMilestoneId);
  const isFullyCompleted = roadmap.completion_percentage === 100;

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="glass-card border-border shadow-sm p-8 bg-gradient-to-br from-white to-[#E2E2FA]/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#F4C7E6]/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{roadmap.title}</h2>
            <p className="text-muted-foreground max-w-xl">{roadmap.description}</p>
          </div>
          <div className="flex flex-col items-end min-w-[200px] bg-white/60 p-4 rounded-xl border border-border">
            <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-[#2D305A] mb-2">{roadmap.completion_percentage}%</div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${roadmap.completion_percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={cn("h-full rounded-full", isFullyCompleted ? "bg-emerald-500" : "bg-gradient-to-r from-[#2D305A] to-[#4f46e5]")} 
              />
            </div>
          </div>
        </div>
      </div>

      {isFullyCompleted && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
          <Trophy className="w-10 h-10 text-emerald-500 shrink-0" />
          <div>
            <h3 className="text-lg font-bold">Incredible Work!</h3>
            <p className="text-emerald-700 text-sm">You have completed all milestones in this roadmap. You are now fully equipped for this career path.</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Vertical Stepper */}
        <div className="lg:col-span-4 glass-card border-border shadow-sm p-6 max-h-[800px] overflow-y-auto">
          <h3 className="text-lg font-bold text-foreground mb-6 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">Journey</h3>
          <div className="relative border-l-2 border-muted ml-4 space-y-6 pb-4">
            {roadmap.milestones?.map((milestone, idx) => {
              const isActive = activeMilestoneId === milestone.id;
              const isCompleted = milestone.status === 'completed';
              return (
                <div 
                  key={milestone.id} 
                  onClick={() => setActiveMilestoneId(milestone.id)}
                  className="relative pl-8 cursor-pointer group"
                >
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute -left-[13px] top-0 rounded-full border-[3px] transition-all duration-300 flex items-center justify-center w-6 h-6",
                    isCompleted ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]" : 
                    isActive ? "bg-white border-[#2D305A] text-[#2D305A] shadow-[0_0_12px_rgba(45,48,90,0.3)] scale-110" : "bg-muted border-border"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  
                  {/* Content */}
                  <div className={cn("transition-all duration-300 p-3 rounded-xl", isActive ? "bg-[#2D305A]/5 border border-[#2D305A]/10" : "hover:bg-muted/50")}>
                    <h4 className={cn(
                      "font-semibold text-sm transition-colors mb-1", 
                      isActive ? "text-[#2D305A]" : isCompleted ? "text-foreground line-through opacity-70" : "text-foreground"
                    )}>
                      {milestone.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Milestone Detail */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeMilestone ? (
              <motion.div 
                key={activeMilestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Milestone Header */}
                <div className="glass-card border-border shadow-md p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 relative z-10">
                    <div>
                      <span className={cn(
                        "px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3 inline-block border",
                        activeMilestone.difficulty === 'Advanced' ? "bg-rose-50 text-rose-700 border-rose-200" :
                        activeMilestone.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                      )}>
                        {activeMilestone.difficulty || 'Core'}
                      </span>
                      <h2 className="text-3xl font-bold text-foreground mb-3">{activeMilestone.title}</h2>
                    </div>
                    {activeMilestone.status !== 'completed' ? (
                      <Button 
                        onClick={() => handleComplete(activeMilestone.id)} 
                        className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-lg shrink-0 w-full sm:w-auto"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Mark Completed
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold px-5 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">
                        <CheckCircle2 className="w-5 h-5" /> Completed
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed relative z-10">{activeMilestone.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Learning Curriculum */}
                  <div className="glass-card border-border shadow-sm p-6 border-t-4 border-t-blue-400">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" /> Curriculum
                    </h3>
                    {activeMilestone.learning_plans && activeMilestone.learning_plans.length > 0 ? (
                      <ul className="space-y-3">
                        {activeMilestone.learning_plans.map((lp, i) => (
                          <li key={i} className="bg-background border border-border p-4 rounded-xl flex items-start gap-3 hover:border-blue-200 transition-colors">
                            <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</div>
                            <div>
                              <div className="font-semibold text-foreground text-sm">{lp.skill_name}</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> ~{lp.estimated_hours} hours
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-8">No specific curriculum items mapped.</p>
                    )}
                  </div>

                  {/* Projects & Execution */}
                  <div className="glass-card border-border shadow-sm p-6 border-t-4 border-t-purple-400">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-purple-500" /> Execution Projects
                    </h3>
                    {activeMilestone.projects && activeMilestone.projects.length > 0 ? (
                      <ul className="space-y-4">
                        {activeMilestone.projects.map((proj, i) => (
                          <li key={i} className="bg-background border border-border p-5 rounded-xl hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                            <div className="font-bold text-foreground text-sm mb-1">{proj.title}</div>
                            <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{proj.description}</div>
                            {proj.github_link_idea && (
                              <a href={proj.github_link_idea} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
                                View Reference <Zap className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-8">No projects recommended for this stage.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card border-border shadow-sm p-12 text-center h-full flex flex-col items-center justify-center text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a milestone from the journey to view details.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
