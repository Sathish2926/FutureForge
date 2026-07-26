import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ExternalLink,
  IndianRupee,
  RefreshCw,
  Sparkles,
  Filter,
  Search,
  Calendar,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  X,
  MapPin
} from 'lucide-react';
import { fetchScholarshipRecommendations, toggleScholarshipBookmark } from '../../services/scholarships';
import { auth } from '../../lib/firebase';
import type { ScholarshipRecommendation } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

function scoreTone(score: number) {
  if (score >= 80) return 'from-primary to-accent';
  if (score >= 60) return 'from-secondary to-purple-500';
  return 'from-slate-500 to-slate-400';
}

function RecommendationCard({
  rec,
  onBookmark,
  onDetail,
}: {
  rec: ScholarshipRecommendation;
  onBookmark: () => void;
  onDetail: () => void;
}) {
  return (
    <motion.div 
      variants={fadeUp} 
      className="glass-card border-border shadow-sm group flex flex-col h-full border border-border hover:border-primary/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success border border-success/20">
            <Sparkles className="w-3 h-3" />
            {rec.match_score.toFixed(0)}% Match
          </span>
          {rec.can_apply === 'YES' && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground border border-border">
              Eligible
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          className={`p-2 rounded-full transition-colors ${rec.is_bookmarked ? 'bg-primary/20 text-primary' : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'}`}
        >
          {rec.is_bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="mb-4 flex-1 cursor-pointer" onClick={onDetail}>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {rec.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Briefcase className="w-4 h-4" />
          <span className="truncate">{rec.provider ?? 'Independent Provider'}</span>
        </div>
        {rec.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{rec.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
          <p className="text-lg font-bold text-foreground flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {formatAmount(rec.amount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Deadline</p>
          <p className="text-sm font-medium text-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary" />
            {rec.deadline ? new Date(rec.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Rolling'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={onDetail} className="flex-1 bg-white text-background hover:bg-white/90">
          View Details
        </Button>
        {rec.official_apply_link && (
          <Button variant="outline" className="flex-none px-3 bg-background border-border" onClick={() => window.open(rec.official_apply_link || '', '_blank')}>
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function ScholarshipRecommendationsPage() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<ScholarshipRecommendation[]>([]);
  const [filtered, setFiltered] = useState<ScholarshipRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'amount' | 'name'>('score');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    eligibleOnly: true,
    minAmount: '',
  });

  const loadRecommendations = async () => {
    try {
      const user = auth.currentUser;
      if (!user) { navigate('/login'); return; }
      const token = await user.getIdToken();
      const data = await fetchScholarshipRecommendations(token);
      setRecommendations(data);
      setFiltered(data);
      setError('');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const resp = err as { response?: { status?: number; data?: { detail?: string } } };
        if (resp.response?.status === 404) {
          setError('profile_missing');
        } else {
          setError(resp.response?.data?.detail || 'Failed to load recommendations.');
        }
      } else {
        setError('Failed to load recommendations.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadRecommendations(); }, []);

  useEffect(() => {
    let results = [...recommendations];
    
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (r) => r.title.toLowerCase().includes(q) || (r.provider ?? '').toLowerCase().includes(q)
      );
    }
    
    // Custom Filters
    if (filters.eligibleOnly) {
      results = results.filter(r => r.can_apply === 'YES');
    }
    if (filters.minAmount) {
      results = results.filter(r => r.amount >= parseInt(filters.minAmount));
    }

    // Sort
    if (sortBy === 'amount') results.sort((a, b) => b.amount - a.amount);
    else if (sortBy === 'name') results.sort((a, b) => a.title.localeCompare(b.title));
    else results.sort((a, b) => b.match_score - a.match_score);
    
    setFiltered(results);
  }, [searchQuery, sortBy, filters, recommendations]);

  const handleBookmark = async (scholarshipId: number) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      await toggleScholarshipBookmark(token, scholarshipId);
      setRecommendations((prev) =>
        prev.map((r) =>
          r.scholarship_id === scholarshipId ? { ...r, is_bookmarked: !r.is_bookmarked } : r
        )
      );
    } catch { /* silent */ }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadRecommendations();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin-reverse"></div>
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <div className="relative border-b border-border bg-card/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
        <div className="container mx-auto px-6 py-8 relative">
          <button onClick={() => navigate('/scholarships')} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-4 w-4" />
                AI-Powered Matches
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                Scholarship Explorer
              </h1>
              <p className="text-lg text-muted-foreground">
                Found {filtered.length} opportunities tailored to your profile
              </p>
            </div>
            
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-background hover:bg-muted border border-border text-foreground shadow-none"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Matches
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div 
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 320 }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="lg:w-80 shrink-0"
              >
                <div className="glass-card border-border shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-primary" />
                      Filters
                    </h3>
                    <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setShowFilters(false)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search name or provider..." 
                          className="pl-9 bg-background/50 border-border"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">Sort By</label>
                      <div className="flex flex-col gap-2">
                        {(['score', 'amount', 'name'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => setSortBy(s)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors ${sortBy === s ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-background/50 text-muted-foreground border border-border hover:border-border'}`}
                          >
                            {s === 'score' ? 'Highest Match Score' : s === 'amount' ? 'Highest Amount' : 'Alphabetical (A-Z)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">Minimum Amount (₹)</label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 50000" 
                        className="bg-background/50 border-border"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-10 h-6 rounded-full transition-colors relative ${filters.eligibleOnly ? 'bg-primary' : 'bg-slate-700'}`}>
                          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.eligibleOnly ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={filters.eligibleOnly}
                          onChange={(e) => setFilters({...filters, eligibleOnly: e.target.checked})}
                        />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Show Eligible Only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 lg:hidden">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full bg-card border-border text-foreground">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Show Filters
              </Button>
            </div>

            {error === 'profile_missing' ? (
              <div className="glass-card border-border shadow-sm text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Profile Required</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Complete your scholarship eligibility profile to unlock personalized AI-driven recommendations.
                </p>
                <Button size="lg" onClick={() => navigate('/scholarships/profile')} className="bg-amber-500 hover:bg-amber-600 text-foreground">
                  Create Profile Now
                </Button>
              </div>
            ) : error ? (
              <div className="glass-card border-border shadow-sm border-destructive/30 text-center py-12">
                <p className="text-lg font-bold text-destructive mb-2">Error loading recommendations</p>
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="glass-card border-border shadow-sm text-center py-20 border-dashed border-2 border-border bg-transparent shadow-none">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No matches found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to see more results.</p>
                <Button variant="outline" onClick={() => {setSearchQuery(''); setFilters({eligibleOnly: false, minAmount: ''})}} className="mt-6 bg-background border-border">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
              >
                {filtered.map((rec) => (
                  <RecommendationCard
                    key={rec.scholarship_id}
                    rec={rec}
                    onBookmark={() => handleBookmark(rec.scholarship_id)}
                    onDetail={() => navigate(`/scholarships/${rec.scholarship_id}`)}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
