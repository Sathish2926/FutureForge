import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowLeft, Code2, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { fetchRoadmap, completeMilestone } from '../../services/roadmap';
import type { RoadmapBase, RoadmapMilestoneBase } from '../../types';
import { cn } from '../../lib/utils';

export default function RoadmapExecutionHub() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapBase | null>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data = await fetchRoadmap(parseInt(id));
        setRoadmap(data);
        if (data.milestones && data.milestones.length > 0) {
          // Find first pending or in_progress, else default to first
          const active = data.milestones.find(m => m.status !== 'completed') || data.milestones[0];
          setActiveMilestoneId(active.id);
        }
      } catch (e) {
        toast("Failed to load execution hub", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, toast]);

  const handleComplete = async (milestoneId: number) => {
    try {
      await completeMilestone(milestoneId, 'completed');
      toast("Milestone completed! Keep up the great work.", "success");
      // Optimistic update
      setRoadmap(prev => {
        if (!prev) return prev;
        const newMilestones = prev.milestones?.map(m => m.id === milestoneId ? { ...m, status: 'completed' } : m) || null;
        return { ...prev, milestones: newMilestones };
      });
    } catch (e) {
      toast("Failed to update milestone status", "error");
    }
  };

  if (loading || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const activeMilestone = roadmap.milestones?.find(m => m.id === activeMilestoneId);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Roadmaps
          </button>
          
          <div className="glass-card border-border shadow-sm p-8 flex flex-col md:flex-row justify-between gap-6 border-primary/20 bg-primary/5">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{roadmap.title}</h1>
              <p className="text-muted-foreground max-w-2xl">{roadmap.description}</p>
            </div>
            <div className="flex flex-col items-end min-w-[200px]">
              <div className="text-sm text-muted-foreground mb-2">Overall Progress</div>
              <div className="text-3xl font-bold text-foreground mb-3">{roadmap.completion_percentage}%</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${roadmap.completion_percentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Vertical Stepper (Sidebar) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-6">Milestones</h3>
            <div className="relative border-l-2 border-border ml-4 space-y-8 pb-4">
              {roadmap.milestones?.map((milestone, idx) => {
                const isActive = activeMilestoneId === milestone.id;
                const isCompleted = milestone.status === 'completed';
                return (
                  <div 
                    key={milestone.id} 
                    onClick={() => setActiveMilestoneId(milestone.id)}
                    className="relative pl-6 cursor-pointer group"
                  >
                    <div className={cn(
                      "absolute -left-[11px] top-1 rounded-full border-4 transition-colors",
                      isCompleted ? "bg-emerald-500 border-emerald-500/30 text-foreground" : 
                      isActive ? "bg-primary border-primary/30" : "bg-background border-border"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-foreground m-0.5" /> : <Circle className="w-5 h-5 text-transparent m-0" />}
                    </div>
                    <div>
                      <h4 className={cn("font-bold transition-colors", isActive ? "text-primary text-lg" : isCompleted ? "text-muted-foreground text-lg" : "text-muted-foreground text-lg group-hover:text-muted-foreground")}>
                        {idx + 1}. {milestone.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Details */}
          <div className="lg:col-span-8">
            {activeMilestone ? (
              <motion.div 
                key={activeMilestone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="glass-card border-border shadow-sm p-8 border border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs font-bold uppercase tracking-wider mb-3 inline-block border border-border">
                        {activeMilestone.difficulty || 'Core'}
                      </span>
                      <h2 className="text-3xl font-bold text-foreground mb-3">{activeMilestone.title}</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">{activeMilestone.description}</p>
                    </div>
                    {activeMilestone.status !== 'completed' ? (
                      <Button onClick={() => handleComplete(activeMilestone.id)} className="bg-emerald-500 hover:bg-emerald-600 text-foreground shrink-0">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Completed
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5" /> Completed
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Learning Plans */}
                  <div className="glass-card border-border shadow-sm p-6 bg-blue-500/5 border border-blue-500/10">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" /> Required Knowledge
                    </h3>
                    {activeMilestone.learning_plans && activeMilestone.learning_plans.length > 0 ? (
                      <ul className="space-y-3">
                        {activeMilestone.learning_plans.map((lp, i) => (
                          <li key={i} className="bg-background border border-border p-4 rounded-xl">
                            <div className="font-bold text-foreground">{lp.skill_name}</div>
                            <div className="text-sm text-muted-foreground mt-1">Est. Time: {lp.estimated_hours} hours</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm">No specific curriculum items mapped yet.</p>
                    )}
                  </div>

                  {/* Projects */}
                  <div className="glass-card border-border shadow-sm p-6 bg-purple-500/5 border border-purple-500/10">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5" /> Project Ideas
                    </h3>
                    {activeMilestone.projects && activeMilestone.projects.length > 0 ? (
                      <ul className="space-y-4">
                        {activeMilestone.projects.map((proj, i) => (
                          <li key={i} className="bg-background border border-border p-4 rounded-xl hover:bg-muted transition-colors">
                            <div className="font-bold text-foreground mb-1">{proj.title}</div>
                            <div className="text-sm text-muted-foreground mb-2">{proj.description}</div>
                            {proj.github_link_idea && (
                              <a href={proj.github_link_idea} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                View Reference &rarr;
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm">No specific projects recommended for this stage.</p>
                    )}
                  </div>
                  
                </div>
              </motion.div>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  );
}
