import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileText,
  IndianRupee,
  Info,
  LinkIcon,
  Mail,
  MapPin,
  RefreshCcw,
  Shield,
  Users,
  XCircle,
  GraduationCap,
  Briefcase,
  Calendar
} from 'lucide-react';
import { fetchScholarshipDetail, toggleScholarshipBookmark } from '../../services/scholarships';
import { auth } from '../../lib/firebase';
import type { ScholarshipDetail } from '../../types';
import { Button } from '../../components/ui/button';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

function DetailCard({ title, icon, children, className = "" }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card border-border shadow-sm ${className}`}>
      <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground border-b border-border pb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      <div className="text-base text-foreground">{value}</div>
    </div>
  );
}

export function ScholarshipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<ScholarshipDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) { navigate('/login'); return; }
        const token = await user.getIdToken();
        const data = await fetchScholarshipDetail(token, Number(id));
        setScholarship(data);
      } catch {
        setError('Failed to load scholarship details.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  const handleBookmark = async () => {
    if (!scholarship) return;
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      await toggleScholarshipBookmark(token, scholarship.id);
      setScholarship((prev) => prev ? { ...prev, is_bookmarked: !prev.is_bookmarked } : prev);
    } catch { /* silent */ }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <div className="glass-card border-border shadow-sm max-w-md mx-auto mt-20 text-center py-12 border-destructive/30">
          <XCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Not Found</h2>
          <p className="text-muted-foreground">{error || 'Scholarship not found'}</p>
        </div>
      </div>
    );
  }

  const s = scholarship;
  const compatLabel = s.compatible_with_other_schemes?.toLowerCase().includes('one')
    ? { text: 'ONE_ONLY', desc: 'This scholarship cannot be combined with other scholarships', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' }
    : s.compatible_with_other_schemes?.toLowerCase().includes('conditional')
    ? { text: 'CONDITIONAL', desc: s.restrictions_on_combining || 'Subject to conditions', color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' }
    : { text: 'MULTIPLE_ALLOWED', desc: 'Can be applied together with other scholarships', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky Top Bar for Mobile */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 md:hidden flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-foreground truncate max-w-[200px]">{s.title}</span>
        <button onClick={handleBookmark} className={`p-2 -mr-2 ${s.is_bookmarked ? 'text-primary' : 'text-muted-foreground'}`}>
          {s.is_bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Large Hero Section */}
      <div className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10 -z-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 blur-[100px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Scholarships
          </button>

          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {s.is_active ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1 text-sm font-semibold text-success border border-success/20">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  Accepting Applications
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-sm font-semibold text-destructive border border-destructive/20">
                  Closed
                </span>
              )}
              {s.renewal_available && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                  <RefreshCcw className="w-3.5 h-3.5" /> Renewable
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {s.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg mb-8">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-muted-foreground" />
                {s.provider ?? 'Independent Provider'}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                {s.state || s.country || 'Any Location'}
              </div>
            </div>

            {s.description && (
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {s.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content (Left) */}
          <div className="w-full lg:w-2/3 space-y-8">
            <DetailCard title="Eligibility Criteria" icon={<Shield className="w-5 h-5" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <InfoItem label="Education Level" value={s.education_level || s.course_level} />
                <InfoItem label="Course/Degree" value={s.course_name} />
                <InfoItem label="Minimum Percentage" value={s.minimum_percentage ? `${s.minimum_percentage}%` : null} />
                <InfoItem label="Max Family Income" value={s.maximum_family_income ? `₹${formatAmount(s.maximum_family_income)}` : null} />
                <InfoItem label="Community / Category" value={s.community} />
                <InfoItem label="Gender Restriction" value={s.gender} />
                <InfoItem label="Age Limit" value={s.age_min || s.age_max ? `${s.age_min ?? 'No min'} - ${s.age_max ?? 'No max'} years` : null} />
                <InfoItem label="Disability Requirement" value={s.disability_required ? 'Required' : 'Not required'} />
              </div>
              {s.eligibility_summary && (
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-muted-foreground leading-relaxed">
                  <div className="font-semibold text-primary mb-2">Summary</div>
                  {s.eligibility_summary}
                </div>
              )}
            </DetailCard>

            <DetailCard title="Application Details" icon={<CalendarClock className="w-5 h-5" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <InfoItem label="Application Mode" value={s.application_mode} />
                <InfoItem label="Selection Process" value={s.selection_process} />
                <InfoItem label="Start Date" value={s.application_start_date ? new Date(s.application_start_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) : null} />
                <InfoItem label="End Date" value={s.application_end_date ? new Date(s.application_end_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) : null} />
              </div>
            </DetailCard>

            {(s.benefits || (s.required_documents ?? []).length > 0) && (
              <DetailCard title="Benefits & Requirements" icon={<FileText className="w-5 h-5" />}>
                {s.benefits && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-foreground mb-3">What you'll receive</h4>
                    <p className="text-muted-foreground leading-relaxed">{s.benefits}</p>
                  </div>
                )}
                
                {(s.required_documents ?? []).length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Required Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {s.required_documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-muted-foreground text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </DetailCard>
            )}

            <DetailCard title="Additional Information" icon={<Info className="w-5 h-5" />}>
              <div className="mb-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Multiple Application Rule</div>
                <div className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 ${compatLabel.color}`}>
                  <Users className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{compatLabel.text.replace('_', ' ')}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{compatLabel.desc}</p>
              </div>

              {s.contact_information && Object.keys(s.contact_information).length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Contact Provider</h4>
                  <div className="grid gap-3">
                    {Object.entries(s.contact_information).map(([k, v]) => (
                      <div key={k} className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm text-muted-foreground capitalize">{k}</div>
                          <div className="text-foreground">{v}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DetailCard>
          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-32">
            <div className="glass-card border-border shadow-sm bg-primary/10 border-primary/20">
              <div className="text-center mb-6">
                <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Award Amount</div>
                <div className="text-5xl font-bold text-foreground flex items-center justify-center gap-1">
                  <IndianRupee className="w-8 h-8 text-primary" />
                  {formatAmount(s.amount)}
                </div>
                <div className="text-muted-foreground text-sm mt-2">{s.scholarship_type}</div>
              </div>

              <div className="flex flex-col gap-3">
                {s.official_url || s.official_link ? (
                  <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(79,70,229,0.3)]" onClick={() => window.open(s.official_url || s.official_link || '', '_blank')}>
                    Apply on Official Site
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button size="lg" disabled className="w-full text-lg h-14 bg-background text-muted-foreground">
                    Application Link Unavailable
                  </Button>
                )}
                
                <Button size="lg" variant="outline" onClick={handleBookmark} className={`w-full h-14 border-border ${s.is_bookmarked ? 'bg-muted text-foreground' : 'bg-transparent text-muted-foreground hover:bg-background hover:text-foreground'}`}>
                  {s.is_bookmarked ? <BookmarkCheck className="w-5 h-5 mr-2" /> : <Bookmark className="w-5 h-5 mr-2" />}
                  {s.is_bookmarked ? 'Saved to Bookmarks' : 'Save for Later'}
                </Button>
              </div>

              {s.deadline && (
                <div className="mt-6 flex items-center justify-center gap-2 text-amber-500 bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Deadline: {new Date(s.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </div>

            {s.faq_url && (
              <a href={s.faq_url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="glass-card border-border shadow-sm flex items-center justify-between p-4 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Info className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Have questions?</div>
                      <div className="text-sm text-muted-foreground">Read the official FAQ</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border lg:hidden z-50">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          {s.official_url || s.official_link ? (
            <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base" onClick={() => window.open(s.official_url || s.official_link || '', '_blank')}>
              Apply Now
            </Button>
          ) : (
            <Button disabled className="flex-1 h-12 bg-background text-muted-foreground">
              Unavailable
            </Button>
          )}
          <Button variant="outline" className={`w-12 h-12 p-0 border-border ${s.is_bookmarked ? 'bg-primary/20 text-primary border-primary/30' : 'bg-card text-muted-foreground'}`} onClick={handleBookmark}>
            {s.is_bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
