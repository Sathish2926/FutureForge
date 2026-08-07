import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, BookOpen, MapPin, Sparkles, ChevronRight, Award, Compass, MessageSquare, Bot } from 'lucide-react';
import { Button } from '../components/ui/button';
import { auth } from '../lib/firebase';
import { fetchScholarshipDashboard } from '../services/scholarships';
import { fetchUserRoadmaps } from '../services/roadmap';
import { fetchRecommendations } from '../services/recommendations';
import type { ScholarshipDashboard as DashboardData, RoadmapBase, RecommendationResponse } from '../types';
import { getOccupationConfig } from '../constants/occupationConfig';
import { useAuth } from '../context/AuthContext';
import { fetchCareerDNAProgress } from '../services/careerdna';
import type { CareerDNAResponse } from '../types';
import { routePaths } from '../constants/routes';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const Dashboard: React.FC = () => {
  const { firebaseUser, profile } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [scholarshipData, setScholarshipData] = useState<DashboardData | null>(null);
  const [roadmaps, setRoadmaps] = useState<RoadmapBase[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
  const [careerDNA, setCareerDNA] = useState<CareerDNAResponse | null>(null);

  useEffect(() => {
    async function load() {
      if (!firebaseUser) return;
      try {
        const token = await firebaseUser.getIdToken();
        const [schData, rdmapData, recData, dnaData] = await Promise.allSettled([
          fetchScholarshipDashboard(token),
          fetchUserRoadmaps(),
          fetchRecommendations(),
          fetchCareerDNAProgress()
        ]);
        
        if (schData.status === 'fulfilled') setScholarshipData(schData.value);
        if (rdmapData.status === 'fulfilled') setRoadmaps(rdmapData.value);
        if (recData.status === 'fulfilled') setRecommendations(recData.value);
        if (dnaData.status === 'fulfilled') setCareerDNA(dnaData.value);
        
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [firebaseUser]);

  const activeRoadmap = roadmaps.length > 0 ? roadmaps[0] : null;
  const topCareer = recommendations.length > 0 ? recommendations[0] : null;
  const config = profile ? getOccupationConfig(profile.education_level || undefined, profile.occupation || undefined) : null;
  const widgets = config?.dashboardWidgets || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-border shadow-sm bg-gradient-to-br from-primary/5 via-card to-secondary/10 border-border relative overflow-hidden shadow-sm"
      >
        <div className="absolute right-0 top-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Career Command Center
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome, {firebaseUser?.displayName?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Your AI-powered ecosystem is ready. Track your roadmaps, explore matched careers, and consult your AI Career Coach.
            </p>
          </div>
          
          <Button onClick={() => navigate(routePaths.chatbot)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shrink-0">
            <Bot className="w-4 h-4 mr-2" />
            Talk to AI Coach
          </Button>
        </div>
      </motion.div>

      {(!profile?.career_dna_completed) ? (
        <div className="glass-card border-border shadow-sm p-10 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Compass className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Complete Your Career DNA</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Unlock personalized recommendations, AI coaching, and a tailored dashboard by completing your Career DNA profile.
          </p>
          <Button onClick={() => navigate(routePaths.careerDNA)} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkles className="w-5 h-5 mr-2" /> Start Career DNA
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Feed) */}
          <div className="lg:col-span-2 space-y-8">
            
            {widgets.includes('roadmap_progress') && (
              <div className="glass-card border-border shadow-sm p-6 border-border relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px] -z-10" />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-500" /> Current Execution Roadmap
                  </h2>
                  <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => navigate(routePaths.roadmap)}>
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                {activeRoadmap ? (
                  <div onClick={() => navigate(`/roadmap/${activeRoadmap.id}`)} className="cursor-pointer group">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors">{activeRoadmap.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground mt-4 mb-2">
                      <span>Progress</span>
                      <span className="text-emerald-600 font-bold">{activeRoadmap.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-1000" style={{ width: `${activeRoadmap.completion_percentage}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-border rounded-xl bg-background">
                    <p className="text-muted-foreground mb-4">No active roadmaps found.</p>
                    <Button onClick={() => navigate(routePaths.recommendations)} variant="outline" className="text-foreground border-border hover:bg-muted">Generate Roadmap</Button>
                  </div>
                )}
              </div>
            )}

            {widgets.includes('top_career') && (
              <div className="glass-card border-border shadow-sm p-6 border-border shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-primary" /> Top Career Match
                </h2>
                {topCareer ? (
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors cursor-pointer shadow-sm hover:shadow" onClick={() => navigate(`/careers/${topCareer.career?.id || topCareer.career_id}`)}>
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20 shrink-0">
                      <span className="text-2xl font-bold text-primary">{topCareer.match_percentage.toFixed(0)}%</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{topCareer.career?.title || 'Recommended Career'}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{topCareer.why_recommended}</p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border">{topCareer.career?.industry || 'General'}</span>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border">{topCareer.career?.difficulty || 'Moderate'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-border rounded-xl bg-background">
                    <p className="text-muted-foreground mb-4">No top career matches generated yet.</p>
                    <Button onClick={() => navigate(routePaths.recommendations)} variant="outline" className="text-foreground border-border hover:bg-muted">Generate Matches</Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* AI Coach Mini */}
            <div className="glass-card border-border shadow-sm p-6 bg-gradient-to-br from-primary/5 to-transparent border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">AI Mentor Standby</h3>
              <p className="text-sm text-muted-foreground mb-4">I am ready to help you plan your next move. What should we focus on?</p>
              <Button onClick={() => navigate(routePaths.chatbot)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <MessageSquare className="w-4 h-4 mr-2" /> Open Chat
              </Button>
            </div>

            {/* Quick Stats - Scholarships */}
            {widgets.includes('scholarships') && (
              <div className="glass-card border-border shadow-sm p-6 border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" /> Opportunities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background border border-border text-center shadow-sm">
                    <div className="text-2xl font-bold text-foreground mb-1">{scholarshipData?.total_recommendations || 0}</div>
                    <div className="text-xs text-muted-foreground font-medium">Matched Scholarships</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border text-center shadow-sm">
                    <div className="text-2xl font-bold text-amber-500 mb-1">{scholarshipData?.upcoming_deadlines || 0}</div>
                    <div className="text-xs text-muted-foreground font-medium">Deadlines Approaching</div>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => navigate(routePaths.scholarships)} className="w-full mt-4 text-muted-foreground hover:text-foreground hover:bg-muted">
                  View Scholarship Hub <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
