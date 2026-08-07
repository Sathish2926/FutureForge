import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ArrowLeft, Code2, BookOpen, Clock, Target, PlayCircle, Trophy, Sparkles, Award, FileBadge } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { fetchRoadmap, completeMilestone } from '../../services/roadmap';
import type { RoadmapBase } from '../../types';
import { cn } from '../../lib/utils';
import { apiClient } from '../../services/http';

export default function RoadmapExecutionHub() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapBase | null>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'phases' | 'overview'>('phases');

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data = await fetchRoadmap(parseInt(id));
        setRoadmap(data);
        if (data.milestones && data.milestones.length > 0) {
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

  const handleCompleteTask = async (taskId: number, isProject: boolean, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      if (isProject) {
        toast(`Project marked as ${newStatus}`, "success");
      } else {
        await apiClient.put(`/roadmap/tasks/${taskId}/progress?status=${newStatus}`);
        toast(`Task marked as ${newStatus}`, "success");
      }
      
      setRoadmap(prev => {
        if (!prev) return prev;
        const ms = prev.milestones?.map(m => {
          if (m.id !== activeMilestoneId) return m;
          if (isProject) {
            return {
              ...m,
              projects: m.projects?.map(p => p.id === taskId ? { ...p, is_completed: newStatus === 'completed' } : p)
            };
          } else {
            return {
              ...m,
              learning_plans: m.learning_plans?.map(l => l.id === taskId ? { ...l, status: newStatus } : l)
            };
          }
        });
        return { ...prev, milestones: ms };
      });
    } catch (e) {
      toast("Failed to update task", "error");
    }
  };

  const handleCompleteMilestone = async (milestoneId: number) => {
    try {
      const res = await completeMilestone(milestoneId, 'completed');
      toast("Phase completed! Engine advancing.", "success");
      
      setRoadmap(prev => {
        if (!prev) return prev;
        const newMilestones = prev.milestones?.map(m => m.id === milestoneId ? { ...m, status: 'completed' } : m) || null;
        return { ...prev, milestones: newMilestones, completion_percentage: res.completion || prev.completion_percentage };
      });
      
      if (roadmap && roadmap.milestones) {
        const currentIndex = roadmap.milestones.findIndex(m => m.id === milestoneId);
        if (currentIndex < roadmap.milestones.length - 1) {
          setActiveMilestoneId(roadmap.milestones[currentIndex + 1].id);
        }
      }
    } catch (e) {
      toast("Failed to complete phase", "error");
    }
  };

  if (loading || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const activeMilestone = roadmap.milestones?.find(m => m.id === activeMilestoneId);
  const isFullyComplete = roadmap.completion_percentage >= 100;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-8">
          <button onClick={() => navigate('/roadmap')} className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </button>
          
          <div className="glass-card border-border shadow-2xl p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-10 rounded-[2rem] border-primary/20 bg-card/60 backdrop-blur-xl relative overflow-hidden">
            {isFullyComplete && (
              <div className="absolute inset-0 bg-emerald-500/5 z-0" />
            )}
            <div className="z-10 flex-1">
              <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider mb-4",
                isFullyComplete ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-primary/10 border-primary/20 text-primary"
              )}>
                {isFullyComplete ? <Award className="w-4 h-4" /> : <Target className="w-4 h-4" />} 
                {isFullyComplete ? 'Career Goal Mastered' : 'AI Execution Engine'}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">{roadmap.title}</h1>
              
              {/* Tabs */}
              <div className="flex items-center gap-2 mt-6">
                <Button 
                  variant={activeTab === 'phases' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('phases')}
                  className={activeTab === 'phases' ? 'rounded-xl shadow-lg shadow-primary/25' : 'rounded-xl'}
                >
                  Execution Plan
                </Button>
                <Button 
                  variant={activeTab === 'overview' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('overview')}
                  className={activeTab === 'overview' ? 'rounded-xl shadow-lg shadow-primary/25' : 'rounded-xl'}
                >
                  AI Overview & Readiness
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-start lg:items-end min-w-[250px] z-10 p-6 bg-background/50 rounded-3xl border border-border relative overflow-hidden">
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Engine Progress</div>
              <div className={cn("text-5xl font-black mb-4", isFullyComplete ? "text-emerald-500" : "text-primary")}>
                {roadmap.completion_percentage.toFixed(0)}%
              </div>
              <div className="w-full bg-background rounded-full h-3 border border-border overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${roadmap.completion_percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn("h-full rounded-full", isFullyComplete ? "bg-emerald-500" : "bg-primary")} 
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="w-4 h-4" /> Est. Time: {roadmap.estimated_completion_months} months
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="glass-card p-8 rounded-[2rem] border border-border bg-card/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" /> AI Career Summary
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {roadmap.description}
              </p>
            </div>
            
            <div className="space-y-8">
              {isFullyComplete && (
                <div className="glass-card p-8 rounded-[2rem] border border-emerald-500/30 bg-emerald-500/5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-16 -mt-16" />
                  <Trophy className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Roadmap Completed!</h3>
                  <p className="text-muted-foreground mb-6">You have mastered all the required skills and phases for this career path.</p>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-foreground w-full rounded-xl h-12 shadow-lg shadow-emerald-500/25">
                    <FileBadge className="w-5 h-5 mr-2" /> Download Certificate
                  </Button>
                </div>
              )}
              
              <div className="glass-card p-8 rounded-[2rem] border border-border bg-card/50">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-500" /> Milestone Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
                    <span className="font-bold">Total Phases</span>
                    <span className="text-xl">{roadmap.milestones?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
                    <span className="font-bold">Completed Phases</span>
                    <span className="text-xl text-emerald-500">{roadmap.milestones?.filter(m => m.status === 'completed').length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
                    <span className="font-bold">Pending Phases</span>
                    <span className="text-xl text-amber-500">{roadmap.milestones?.filter(m => m.status !== 'completed').length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'phases' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: VERTICAL TIMELINE */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-2xl font-bold text-foreground mb-8 px-2">Mission Phases</h3>
              <div className="relative ml-6 space-y-2 pb-4">
                <div className="absolute top-4 bottom-4 -left-[23px] w-1 bg-border rounded-full" />
                
                {roadmap.milestones?.map((milestone, idx) => {
                  const isActive = activeMilestoneId === milestone.id;
                  const isCompleted = milestone.status === 'completed';
                  
                  return (
                    <div 
                      key={milestone.id} 
                      onClick={() => setActiveMilestoneId(milestone.id)}
                      className={cn(
                        "relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group border",
                        isActive ? "bg-card border-primary/40 shadow-lg shadow-primary/5" : "bg-transparent border-transparent hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "absolute -left-[37px] top-6 rounded-full border-4 transition-all duration-500 flex items-center justify-center bg-background",
                        isCompleted ? "border-emerald-500 w-8 h-8 -ml-1 -mt-1" : 
                        isActive ? "border-primary w-8 h-8 -ml-1 -mt-1 shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "border-border w-6 h-6"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute" /> : 
                         isActive ? <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" /> : null}
                      </div>
                      
                      <div>
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Phase {idx + 1}</div>
                        <h4 className={cn("font-bold text-lg transition-colors", isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                          {milestone.title}
                        </h4>
                        {isActive && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {milestone.description}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: ACTIVE PHASE DETAILS */}
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
                    {/* Phase Header */}
                    <div className="glass-card border-border shadow-xl p-8 sm:p-10 rounded-[2rem] border-t border-border bg-card relative overflow-hidden">
                      <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-16 -mt-16 transition-colors", 
                        activeMilestone.status === 'completed' ? "bg-emerald-500/20" : "bg-primary/20"
                      )} />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                        <div className="flex-1">
                          <span className="px-3 py-1 bg-background text-muted-foreground rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-border shadow-sm">
                            {activeMilestone.difficulty || 'Core Requirement'}
                          </span>
                          <h2 className="text-3xl font-bold text-foreground mb-4">{activeMilestone.title}</h2>
                          <p className="text-muted-foreground text-lg leading-relaxed">{activeMilestone.description}</p>
                        </div>
                        
                        {activeMilestone.status !== 'completed' ? (
                          <Button onClick={() => handleCompleteMilestone(activeMilestone.id)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-2xl shadow-lg shadow-primary/25 h-14 px-8">
                            <CheckCircle2 className="w-5 h-5 mr-2" /> Complete Phase
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-500 font-bold px-6 py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shrink-0">
                            <Trophy className="w-6 h-6" /> Phase Cleared
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      
                      {/* Actionable Tasks */}
                      <div className="glass-card border-border shadow-sm p-8 rounded-3xl bg-card border border-border flex flex-col">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                          <BookOpen className="w-6 h-6 text-blue-500" /> Action Items
                        </h3>
                        {activeMilestone.learning_plans && activeMilestone.learning_plans.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {activeMilestone.learning_plans.map((lp) => {
                              const isDone = lp.status === 'completed';
                              return (
                                <div key={lp.id} className={cn("p-5 rounded-2xl border transition-all duration-300", 
                                  isDone ? "bg-emerald-500/5 border-emerald-500/20" : "bg-background border-border hover:border-blue-500/30 shadow-sm"
                                )}>
                                  <div className="flex items-start gap-4">
                                    <button onClick={() => handleCompleteTask(lp.id, false, lp.status)} className="mt-0.5 shrink-0">
                                      {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-muted-foreground hover:text-blue-500 transition-colors" />}
                                    </button>
                                    <div className="flex-1">
                                      <div className={cn("font-bold text-base transition-colors line-clamp-2", isDone ? "text-emerald-700/70 dark:text-emerald-400/70 line-through" : "text-foreground")}>
                                        {lp.skill_name}
                                      </div>
                                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs font-medium">
                                        <span className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5" /> {lp.estimated_hours}h</span>
                                        {lp.resource_type && (
                                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md border border-blue-500/20">{lp.resource_type}</span>
                                        )}
                                        {lp.resource_link && (
                                          <a href={lp.resource_link.startsWith('http') ? lp.resource_link : `https://${lp.resource_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1 ml-auto">
                                            <PlayCircle className="w-4 h-4" /> Start
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-2xl p-6 text-muted-foreground text-sm text-center">
                            No tasks mapped for this phase.
                          </div>
                        )}
                      </div>

                      {/* Projects */}
                      <div className="glass-card border-border shadow-sm p-8 rounded-3xl bg-card border border-border flex flex-col">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                          <Code2 className="w-6 h-6 text-purple-500" /> Project Milestones
                        </h3>
                        {activeMilestone.projects && activeMilestone.projects.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {activeMilestone.projects.map((proj) => {
                              const isDone = proj.is_completed;
                              return (
                                <div key={proj.id} className={cn("p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden", 
                                  isDone ? "bg-emerald-500/5 border-emerald-500/20" : "bg-gradient-to-br from-background to-muted/20 border-border hover:border-purple-500/30 shadow-sm"
                                )}>
                                  <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                      <button onClick={() => handleCompleteTask(proj.id, true, isDone ? 'completed' : 'pending')}>
                                        {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-muted-foreground hover:text-purple-500 transition-colors" />}
                                      </button>
                                      <div className={cn("font-black text-xl", isDone ? "text-emerald-700/70 dark:text-emerald-400/70 line-through" : "text-foreground")}>{proj.title}</div>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-purple-500 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20 shadow-sm">
                                      {proj.level}
                                    </span>
                                  </div>
                                  <p className="text-base text-muted-foreground leading-relaxed ml-10 relative z-10">{proj.description}</p>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-2xl p-6 text-muted-foreground text-sm text-center">
                            No projects recommended for this phase.
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
