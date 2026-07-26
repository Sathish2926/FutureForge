import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  BookmarkX,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ExternalLink,
  IndianRupee,
  Briefcase
} from 'lucide-react';
import {
  fetchScholarshipBookmarks,
  fetchScholarshipDetail,
  toggleScholarshipBookmark,
} from '../../services/scholarships';
import { auth } from '../../lib/firebase';
import type { ScholarshipBookmark, ScholarshipDetail } from '../../types';
import { Button } from '../../components/ui/button';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20, scale: 0.95 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

type BookmarkWithDetail = ScholarshipBookmark & { detail?: ScholarshipDetail };

export function ScholarshipBookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkWithDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) { navigate('/login'); return; }
        const token = await user.getIdToken();
        const bms = await fetchScholarshipBookmarks(token);

        // Fetch details for each bookmark
        const enriched = await Promise.all(
          bms.map(async (bm) => {
            try {
              const detail = await fetchScholarshipDetail(token, bm.scholarship_id);
              return { ...bm, detail };
            } catch {
              return bm;
            }
          })
        );
        setBookmarks(enriched);
      } catch {
        /* error */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  const handleRemove = async (scholarshipId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      await toggleScholarshipBookmark(token, scholarshipId);
      setBookmarks((prev) => prev.filter((b) => b.scholarship_id !== scholarshipId));
    } catch { /* silent */ }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Premium Header */}
      <div className="relative border-b border-border bg-card/30 backdrop-blur-xl z-10">
        <div className="container mx-auto px-6 py-8 relative">
          <button onClick={() => navigate('/scholarships')} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Bookmark className="h-4 w-4 fill-primary/20" />
                Saved Scholarships
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                Your Collection
              </h1>
              <p className="text-lg text-muted-foreground">
                You have {bookmarks.length} scholarship{bookmarks.length !== 1 ? 's' : ''} saved for later
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-12 relative z-10">
        {bookmarks.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card border-border shadow-sm text-center py-20 border-dashed border-2 border-border bg-transparent shadow-none">
            <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center mx-auto mb-6">
              <BookmarkX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No saved scholarships</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Explore your personalized recommendations and save the ones you are interested in applying for.
            </p>
            <Button size="lg" onClick={() => navigate('/scholarships/recommendations')} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              Browse Recommendations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-4">
            <AnimatePresence>
              {bookmarks.map((bm) => (
                <motion.div
                  key={bm.id}
                  variants={fadeUp}
                  layout
                  className="glass-card border-border shadow-sm p-6 group cursor-pointer hover:border-primary/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                  onClick={() => navigate(`/scholarships/${bm.scholarship_id}`)}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${bm.status === 'applied' ? 'bg-success/20 text-success border-success/20' : bm.status === 'rejected' ? 'bg-destructive/20 text-destructive border-destructive/20' : 'bg-primary/20 text-primary border-primary/30'}`}>
                        {bm.status.charAt(0).toUpperCase() + bm.status.slice(1)}
                      </span>
                      {bm.created_at && (
                        <span className="text-xs text-muted-foreground font-medium">
                          Saved on {new Date(bm.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {bm.detail?.title ?? `Scholarship #${bm.scholarship_id}`}
                    </h3>
                    
                    {bm.detail && (
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          {bm.detail.provider ?? 'Independent Provider'}
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600"></div>
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          <IndianRupee className="w-4 h-4 text-primary" />
                          {formatAmount(bm.detail.amount)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0 border-t border-border md:border-t-0 pt-4 md:pt-0">
                    <Button 
                      className="flex-1 md:flex-none bg-white text-background hover:bg-white/90"
                      onClick={(e) => { e.stopPropagation(); navigate(`/scholarships/${bm.scholarship_id}`); }}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-12 px-0 bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive hover:text-foreground"
                      onClick={(e) => handleRemove(bm.scholarship_id, e)}
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
