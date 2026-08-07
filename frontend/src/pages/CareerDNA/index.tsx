import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { 
  startAdaptiveSession, 
  getNextAdaptiveQuestions, 
  submitAdaptiveAnswer, 
  completeAdaptiveSession, 
  fetchCareerDNAProgress,
  fetchSessionStatus
} from '../../services/careerdna';
import { updateUserProfile } from '../../services/profile';
import { routePaths } from '../../constants/routes';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { Sparkles, BrainCircuit, ArrowRight, Loader2, CheckCircle2, TrendingUp, Target, ShieldCheck } from 'lucide-react';
import CareerDNAProgress from './components/CareerDNAProgress';
import CareerDNAReport from './components/CareerDNAReport';

export default function CareerDNAWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<'WELCOME' | 'BASELINE' | 'ASSESSMENT' | 'RESULTS'>('WELCOME');
  const [sessionStatus, setSessionStatus] = useState<'NOT_STARTED' | 'IN_PROGRESS'>('NOT_STARTED');
  
  // Adaptive State
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  
  const [resultsData, setResultsData] = useState<any>(null);
  
  // Baseline Form State
  const [baseline, setBaseline] = useState({ education_level: '', career_goal: '' });

  useEffect(() => {
    async function checkState() {
      if (!auth.currentUser) {
        navigate(routePaths.login);
        return;
      }
      try {
        const results = await fetchCareerDNAProgress().catch(() => null);
        if (results && results.is_completed) {
          setResultsData(results);
          setStage('RESULTS');
        } else {
          const statusRes = await fetchSessionStatus().catch(() => ({ status: 'NOT_STARTED' }));
          setSessionStatus(statusRes.status as 'NOT_STARTED' | 'IN_PROGRESS');
          setStage('WELCOME');
        }
      } catch (e) {
        const statusRes = await fetchSessionStatus().catch(() => ({ status: 'NOT_STARTED' }));
        setSessionStatus(statusRes.status as 'NOT_STARTED' | 'IN_PROGRESS');
        setStage('WELCOME');
      } finally {
        setLoading(false);
      }
    }
    checkState();
  }, [navigate]);

  const handleStartBaseline = async () => {
    if (sessionStatus === 'IN_PROGRESS') {
      // Direct resume
      setLoading(true);
      try {
        const sessionData = await startAdaptiveSession();
        setSessionId(sessionData.session_id);
        setQuestions(sessionData.questions || []);
        setAnsweredCount(sessionData.last_completed_step || 0);
        setStartTime(Date.now());
        setStage('ASSESSMENT');
      } catch (e) {
        toast("Failed to resume session.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      setStage('BASELINE');
    }
  };

  const submitBaseline = async () => {
    if (!baseline.education_level || !baseline.career_goal) {
      toast("Please complete all fields to personalize your assessment.", "error");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(baseline);
      const sessionData = await startAdaptiveSession();
      setSessionId(sessionData.session_id);
      setQuestions(sessionData.questions || []);
      setAnsweredCount(sessionData.last_completed_step || 0);
      setStartTime(Date.now());
      setStage('ASSESSMENT');
    } catch (e) {
      toast("Failed to start session. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (optionId: number) => {
    if (!sessionId) return;
    
    const timeTaken = Date.now() - startTime;
    const currentQ = questions[currentQuestionIndex];
    
    setLoading(true);
    try {
      await submitAdaptiveAnswer(sessionId, currentQ.id, optionId, timeTaken);
      setAnsweredCount(prev => prev + 1);
      
      // If we have more questions in the local buffer, just move to next
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setStartTime(Date.now());
        setLoading(false);
      } else {
        // We exhausted the buffer, fetch next batch
        const nextBatch = await getNextAdaptiveQuestions(sessionId);
        if (nextBatch.questions && nextBatch.questions.length > 0) {
          setQuestions(nextBatch.questions);
          setCurrentQuestionIndex(0);
          setStartTime(Date.now());
          setLoading(false);
        } else {
          // No more questions! Complete it.
          await handleComplete(sessionId);
        }
      }
    } catch (e) {
      toast("Failed to save answer.", "error");
      setLoading(false);
    }
  };

  const { refreshProfile } = useAuth();
  
  const handleComplete = async (sId: number) => {
    try {
      await completeAdaptiveSession(sId);
      const res = await fetchCareerDNAProgress();
      await refreshProfile();
      setResultsData(res);
      setStage('RESULTS');
      toast("Career DNA Mapping Complete! AI summary generated.", "success");
    } catch (e) {
      toast("Failed to complete analysis.", "error");
      setLoading(false);
    }
  };

  if (loading && stage === 'WELCOME') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col pt-16">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="w-full max-w-4xl mx-auto px-4 z-10 flex-1 flex flex-col py-8">
        
        {stage === 'ASSESSMENT' && (
          <div className="mb-8">
             <CareerDNAProgress currentStep={answeredCount} totalSteps={answeredCount + questions.length} completionPercentage={Math.min(100, Math.floor((answeredCount / (answeredCount + 5)) * 100))} />
             <p className="text-center text-sm text-muted-foreground mt-2">Adaptive Question {answeredCount + 1}</p>
          </div>
        )}

        <div className="flex-1 flex flex-col relative justify-center">
          <AnimatePresence mode="wait">
            
            {stage === 'WELCOME' && (
              <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BrainCircuit className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">Adaptive Career DNA</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  This isn't a standard quiz. Our AI engine will adapt the questions in real-time based on your goals and background to build your unique professional identity.
                </p>
                <Button onClick={handleStartBaseline} size="lg" className="h-14 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90">
                  {sessionStatus === 'IN_PROGRESS' ? 'Resume Assessment' : 'Begin Mapping'} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {stage === 'BASELINE' && (
              <motion.div key="baseline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-xl mx-auto w-full glass-card p-8 rounded-3xl border border-border bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-2">Let's set a baseline</h2>
                <p className="text-muted-foreground mb-8">This helps our AI queue the right assessment modules for you.</p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Current Education Level</label>
                    <select 
                      className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
                      value={baseline.education_level}
                      onChange={(e) => setBaseline({...baseline, education_level: e.target.value})}
                    >
                      <option value="">Select Level</option>
                      <option value="10th">10th Grade</option>
                      <option value="12th">12th Grade</option>
                      <option value="UG">Undergraduate / College</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Ultimate Career Goal</label>
                    <input 
                      type="text"
                      className="w-full p-4 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="e.g. Software Engineer, IAS, MBA"
                      value={baseline.career_goal}
                      onChange={(e) => setBaseline({...baseline, career_goal: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={submitBaseline} disabled={loading} size="lg" className="w-full h-14 rounded-xl mt-4">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Adaptive Questions'}
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === 'ASSESSMENT' && questions.length > 0 && (
              <motion.div key={`q-${questions[currentQuestionIndex].id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl mx-auto w-full">
                <div className="glass-card p-8 sm:p-10 rounded-3xl border border-border bg-card/50 shadow-lg">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                    {questions[currentQuestionIndex].category}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 leading-tight">
                    {questions[currentQuestionIndex].text}
                  </h2>
                  
                  <div className="grid gap-4">
                    {questions[currentQuestionIndex].options.map((opt: any) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerSubmit(opt.id)}
                        disabled={loading}
                        className="flex items-center text-left gap-4 p-5 rounded-2xl border-2 border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all group disabled:opacity-50"
                      >
                        {opt.emoji && <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{opt.emoji}</span>}
                        <span className="text-lg font-medium text-foreground">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                  {loading && <div className="mt-6 flex justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                </div>
              </motion.div>
            )}

            {stage === 'RESULTS' && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                <CareerDNAReport 
                  data={resultsData} 
                  onRetake={() => {
                    setStage('BASELINE');
                  }}
                  onDashboard={() => navigate(routePaths.dashboard)}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
