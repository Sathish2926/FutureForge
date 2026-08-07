import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, Clock, Target, Loader2, Sparkles, RefreshCw, BarChart, Trash2, Copy, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { fetchUserRoadmaps, generateRoadmap } from '../../services/roadmap';
import type { RoadmapBase } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/toast';
import { cn } from '../../lib/utils';

// Helper to format date relative to now
function timeAgo(dateString: string | null | undefined) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
}

export function RoadmapPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [roadmaps, setRoadmaps] = useState<RoadmapBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  
  // Modal form states
  const [customGoal, setCustomGoal] = useState("");
  const [timeline, setTimeline] = useState("Standard (12 Months)");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [priority, setPriority] = useState("Balanced");

  const load = async () => {
    try {
      const data = await fetchUserRoadmaps();
      setRoadmaps(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openGenerateModal = () => {
    setCustomGoal(profile?.career_goal || "");
    setShowGenerateModal(true);
  };

  const handleGenerate = async () => {
    if (!customGoal.trim()) {
      toast("Please enter a destination career", "error");
      return;
    }
    
    setGenerating(true);
    setShowGenerateModal(false);
    
    try {
      const newRoadmap = await generateRoadmap({
        targetCareer: customGoal,
        timeline,
        skillLevel,
        priority
      });
      toast("Roadmap successfully generated!", "success");
      setRoadmaps(prev => [newRoadmap, ...prev]);
      navigate(`/roadmap/${newRoadmap.id}`);
    } catch (e: any) {
      console.error('Roadmap generate error:', e);
      toast("Failed to generate roadmap", "error");
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    // Assuming backend delete exists, otherwise we just hide it optimistically for now
    // await apiClient.delete(`/roadmap/${id}`)
    setRoadmaps(prev => prev.filter(r => r.id !== id));
    toast("Roadmap archived", "success");
  };

  const handleDuplicate = async (e: React.MouseEvent, roadmap: RoadmapBase) => {
    e.stopPropagation();
    setCustomGoal(roadmap.title.replace(" Roadmap", ""));
    setShowGenerateModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 flex items-center gap-3">
              <Map className="w-10 h-10 text-primary" />
              Career Roadmaps
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Manage your personalized AI execution plans. Create multiple roadmaps to compare different career paths or specialties.
            </p>
          </div>
          
          <Button 
            disabled={generating} 
            onClick={openGenerateModal} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 rounded-2xl shadow-lg shadow-primary/25 text-lg"
          >
            {generating ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : <Sparkles className="w-6 h-6 mr-2" />} 
            {generating ? 'Engine Computing...' : 'Create New Roadmap'}
          </Button>
        </div>

        {showGenerateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="glass-card p-8 sm:p-10 rounded-[2rem] max-w-xl w-full border border-border shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Configure Roadmap</h2>
                  <p className="text-muted-foreground text-sm">Fine-tune the AI generation parameters</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Destination Career</label>
                  <input 
                    type="text" 
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="e.g. AI Engineer, IAS Officer, UI Designer"
                    className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Target Timeline</label>
                    <select 
                      value={timeline} 
                      onChange={e => setTimeline(e.target.value)}
                      className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option>Accelerated (3-6 Months)</option>
                      <option>Standard (12 Months)</option>
                      <option>Long-Term (2+ Years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Current Level</label>
                    <select 
                      value={skillLevel} 
                      onChange={e => setSkillLevel(e.target.value)}
                      className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option>Complete Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Priority Focus</label>
                  <select 
                    value={priority} 
                    onChange={e => setPriority(e.target.value)}
                    className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>Balanced (Theory + Projects)</option>
                    <option>Project-Heavy (Portfolio Building)</option>
                    <option>Exam-Focused (Competitive)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => setShowGenerateModal(false)} className="flex-1 h-12 rounded-xl">Cancel</Button>
                <Button onClick={handleGenerate} className="flex-1 bg-primary text-primary-foreground h-12 rounded-xl">
                  Generate Mission
                </Button>
              </div>
            </div>
          </div>
        )}

        {roadmaps.length === 0 ? (
          <div className="glass-card border-border shadow-sm py-20 text-center max-w-2xl mx-auto rounded-[2rem]">
            <Target className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold text-foreground mb-4">No Active Roadmaps</h2>
            <p className="text-muted-foreground mb-8 text-lg px-8">
              You haven't generated any execution plans yet. Click below to engage the AI engine and compute a customized path from your current position to your ultimate goal.
            </p>
            <Button onClick={openGenerateModal} size="lg" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Sparkles className="w-5 h-5 mr-2" /> Start First Roadmap
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmaps.map(roadmap => (
              <div 
                key={roadmap.id} 
                onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                className="group relative glass-card p-6 sm:p-8 rounded-[2rem] border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer bg-card/60 overflow-hidden flex flex-col h-full"
              >
                {/* Status Indicator */}
                <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-16 -mt-16 transition-colors opacity-20", 
                  roadmap.completion_percentage >= 100 ? "bg-emerald-500" : "bg-primary"
                )} />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-bold text-xl shadow-sm">
                      {roadmap.title.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {timeAgo(roadmap.created_at)}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">{roadmap.title}</h3>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-8 line-clamp-2 flex-1">{roadmap.description}</p>
                
                <div className="space-y-6 relative z-10 mt-auto">
                  
                  <div className="bg-background/50 p-4 rounded-2xl border border-border">
                    <div className="flex justify-between text-sm font-bold text-foreground mb-3">
                      <span>Overall Progress</span>
                      <span className={roadmap.completion_percentage >= 100 ? "text-emerald-500" : "text-primary"}>
                        {roadmap.completion_percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", roadmap.completion_percentage >= 100 ? "bg-emerald-500" : "bg-primary")} 
                        style={{ width: `${roadmap.completion_percentage}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <BarChart className="w-4 h-4 text-primary" />
                      {roadmap.estimated_completion_months} Months Est.
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted rounded-full" onClick={(e) => handleDuplicate(e, roadmap)}>
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-full" onClick={(e) => handleDelete(e, roadmap.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-primary/10 hover:bg-primary/20 text-primary rounded-full ml-1" onClick={() => navigate(`/roadmap/${roadmap.id}`)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
