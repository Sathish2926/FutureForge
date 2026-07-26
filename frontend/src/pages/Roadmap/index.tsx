import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, Clock, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { fetchUserRoadmaps } from '../../services/roadmap';
import type { RoadmapBase } from '../../types';

export function RoadmapPage() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<RoadmapBase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUserRoadmaps();
        setRoadmaps(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Map className="w-8 h-8 text-primary" />
              Your Career Roadmaps
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Track your execution plans. Every roadmap is personalized to your current skill level and career goals.
            </p>
          </div>
          
          <Button onClick={() => navigate('/recommendations')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> New Roadmap
          </Button>
        </div>

        {roadmaps.length === 0 ? (
          <div className="glass-card border-border shadow-sm py-16 text-center max-w-2xl mx-auto">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">No Active Roadmaps</h2>
            <p className="text-muted-foreground mb-6">
              You haven't generated any execution plans yet. Head over to your career recommendations to start building one.
            </p>
            <Button onClick={() => navigate('/recommendations')} variant="outline" className="border-border text-foreground hover:bg-muted">
              View Recommendations
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map(roadmap => (
              <div key={roadmap.id} className="glass-card border-border shadow-sm p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => navigate(`/roadmap/${roadmap.id}`)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {roadmap.title.charAt(0)}
                  </div>
                  <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                    {roadmap.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{roadmap.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{roadmap.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Progress</span>
                      <span>{roadmap.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${roadmap.completion_percentage}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    Estimated: {roadmap.estimated_completion_months} months
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
