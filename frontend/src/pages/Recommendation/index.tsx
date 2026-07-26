import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { routePaths } from '../../constants/routes';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { fetchRecommendations, generateRecommendations } from '../../services/recommendations';
import type { RecommendationResponse } from '../../types';

import RecommendationCard from './components/RecommendationCard';
import RecommendationDetailModal from './components/RecommendationDetailModal';

export function RecommendationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
  const [selectedRec, setSelectedRec] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!auth.currentUser) {
          navigate(routePaths.login);
          return;
        }
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (e: any) {
        toast(e.response?.data?.detail || "Failed to load recommendations", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate, toast]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateRecommendations();
      setRecommendations(data);
      toast("Recommendations generated successfully!", "success");
    } catch (e: any) {
      toast(e.response?.data?.detail || "Failed to generate recommendations", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              AI Career Recommendations
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Based on your Career DNA profile, our AI has mapped out the best potential career paths for you, providing transparent scoring and personalized insights.
            </p>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            {isGenerating ? (
              <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Analyzing Profile...</>
            ) : (
              <><RefreshCw className="w-5 h-5 mr-2" /> Regenerate Analysis</>
            )}
          </Button>
        </div>

        {recommendations.length === 0 ? (
          <div className="glass-card border-border shadow-sm py-16 text-center max-w-2xl mx-auto border-dashed border-border bg-background">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-bold text-foreground mb-2">No Recommendations Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't generated any AI recommendations based on your Career DNA. 
              Click below to initiate the analysis engine.
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isGenerating ? "Analyzing..." : "Generate Insights"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <RecommendationCard 
                  recommendation={rec} 
                  onViewDetails={setSelectedRec} 
                />
              </motion.div>
            ))}
          </div>
        )}

      </div>

      <RecommendationDetailModal 
        isOpen={!!selectedRec}
        onClose={() => setSelectedRec(null)}
        recommendation={selectedRec}
      />
    </div>
  );
}
