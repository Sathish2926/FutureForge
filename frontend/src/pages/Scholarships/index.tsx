import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  Bookmark,
  CalendarClock,
  ChevronRight,
  FileCheck2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  UserCheck,
  AlertCircle,
  IndianRupee,
  MapPin,
  Briefcase
} from 'lucide-react';
import { fetchScholarshipDashboard, fetchScholarshipProfile } from '../../services/scholarships';
import { auth } from '../../lib/firebase';
import type { ScholarshipDashboard, ScholarshipProfile } from '../../types';
import { Button } from '../../components/ui/button';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

function StatCard({ icon, label, value, desc }: { icon: React.ReactNode, label: string, value: string | number, desc: string }) {
  return (
    <motion.div variants={fadeUp} className="glass-card border-border shadow-sm flex flex-col p-6 group">
      <div className="flex items-center gap-3 text-muted-foreground mb-4">
        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </motion.div>
  );
}

export function ScholarshipDashboardPage() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<ScholarshipDashboard | null>(null);
  const [profile, setProfile] = useState<ScholarshipProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) { navigate('/login'); return; }
        const token = await user.getIdToken();

        try {
          const p = await fetchScholarshipProfile(token);
          setProfile(p);
          setHasProfile(true);
        } catch { setHasProfile(false); }

        try {
          const d = await fetchScholarshipDashboard(token);
          setDashboard(d);
        } catch { /* silent */ }
      } catch {
        /* auth error */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-border bg-card/30 backdrop-blur-xl pt-8 pb-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <GraduationCap className="h-4 w-4" />
                Scholarship Intelligence
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Your Scholarship Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Personalized scholarship recommendations and financial aid tracking powered by AI.
              </p>
            </div>
            
            {hasProfile && (
              <Button onClick={() => navigate('/scholarships/recommendations')} className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(79,70,229,0.3)] shrink-0">
                <Sparkles className="w-4 h-4 mr-2" />
                View All Matches
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Profile Alert */}
        {!hasProfile && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-10">
            <div className="glass-card border-border shadow-sm bg-amber-500/10 border-amber-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Complete Your Scholarship Profile</h3>
                  <p className="text-muted-foreground">Create your eligibility profile to unlock our AI engine and receive personalized scholarship recommendations tailored to you.</p>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate('/scholarships/profile')} className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-foreground shrink-0">
                <UserCheck className="w-5 h-5 mr-2" />
                Create Profile Now
              </Button>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={<Award className="w-5 h-5" />} 
            label="Recommendations" 
            value={dashboard?.total_recommendations ?? 0} 
            desc="Eligible scholarships found" 
          />
          <StatCard 
            icon={<Bookmark className="w-5 h-5" />} 
            label="Saved" 
            value={dashboard?.total_bookmarks ?? 0} 
            desc="Bookmarked scholarships" 
          />
          <StatCard 
            icon={<CalendarClock className="w-5 h-5" />} 
            label="Deadlines" 
            value={dashboard?.upcoming_deadlines ?? 0} 
            desc="Upcoming closing dates" 
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Avg Match" 
            value={`${dashboard?.average_match_score?.toFixed(0) ?? 0}%`} 
            desc="Average compatibility score" 
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Left 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Top Recommendations</h2>
              {hasProfile && (
                <button onClick={() => navigate('/scholarships/recommendations')} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {!hasProfile ? (
              <div className="glass-card border-border shadow-sm text-center py-16 border-dashed border-2 border-border bg-transparent shadow-none">
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Unlock Recommendations</h3>
                <p className="text-muted-foreground">Complete your profile to see tailored scholarship matches.</p>
              </div>
            ) : (dashboard?.top_recommendations ?? []).length === 0 ? (
              <div className="glass-card border-border shadow-sm text-center py-16 border-dashed border-2 border-border bg-transparent shadow-none">
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground">We couldn't find any matches. Check back later or update your profile.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboard?.top_recommendations.map((rec) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={rec.scholarship_id} 
                    className="glass-card border-border shadow-sm p-5 group cursor-pointer hover:border-primary/40 transition-colors"
                    onClick={() => navigate(`/scholarships/${rec.scholarship_id}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-semibold text-success border border-success/20">
                            Eligible
                          </span>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                            {rec.match_score.toFixed(0)}% Match
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{rec.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> {rec.provider ?? 'Independent'}
                        </div>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Amount</div>
                        <div className="text-xl font-bold text-foreground flex items-center gap-1 sm:justify-end">
                          <IndianRupee className="w-5 h-5 text-primary" />
                          {formatAmount(rec.amount)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Area (Right 1/3) */}
          <div className="space-y-8">
            {hasProfile && profile && (
              <div className="glass-card border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-6">Profile Completion</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-bold text-primary">{profile.profile_completion.toFixed(0)}%</span>
                </div>
                <div className="h-2.5 w-full bg-background rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000" style={{ width: `${profile.profile_completion}%` }}></div>
                </div>
                
                <Button variant="outline" className="w-full bg-background border-border hover:bg-muted" onClick={() => navigate('/scholarships/profile')}>
                  Edit Profile
                </Button>
              </div>
            )}

            {hasProfile && (
              <div className="glass-card border-border shadow-sm border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck2 className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-foreground">Missing Documents</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">You may need these for upcoming applications based on your profile.</p>
                
                {(dashboard?.missing_documents ?? []).length > 0 ? (
                  <ul className="space-y-2">
                    {dashboard?.missing_documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-background">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-medium flex items-center justify-center">
                    All required documents ready! ✓
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
