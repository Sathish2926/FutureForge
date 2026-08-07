import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, CheckCircle2, Award, Brain, Heart, GraduationCap, Sparkles, Target, Zap, Shield, TrendingUp, BookOpen, MapPin, Globe } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

// Derive scores from wizard data
function deriveScores(data: any) {
  const skillCount = data.skills?.length || 0;
  const interestCount = data.interests?.length || 0;
  const answerCount = data.answers?.length || 0;
  const hasGoal = data.career_goal ? 1 : 0;

  return {
    analytical: Math.min(100, 40 + skillCount * 5 + (data.skills?.some((s: string) => ['Problem Solving', 'Critical Thinking', 'Data Analysis', 'Research', 'Mathematics'].includes(s)) ? 20 : 0)),
    creativity: Math.min(100, 30 + (data.skills?.some((s: string) => ['Design', 'Content Creation', 'UX/UI Design', 'Branding'].includes(s)) ? 30 : 0) + (data.interests?.includes('Creative Arts') ? 20 : 0)),
    leadership: Math.min(100, 25 + (data.answers?.find((a: any) => a.scenario_key === 'leadership_style') ? 25 : 0) + (data.skills?.some((s: string) => ['Leadership', 'Management', 'Project Management'].includes(s)) ? 25 : 0)),
    technical: Math.min(100, 20 + (data.skills?.some((s: string) => ['Programming', 'Web Development', 'AI / ML', 'Cloud Computing', 'Database Management'].includes(s)) ? 40 : 0) + (data.interests?.includes('Technology') ? 15 : 0)),
    communication: Math.min(100, 30 + (data.skills?.some((s: string) => ['Public Speaking', 'Writing', 'Presentation', 'Negotiation'].includes(s)) ? 30 : 0) + (data.answers?.find((a: any) => a.scenario_key === 'communication_style') ? 15 : 0)),
    entrepreneurship: Math.min(100, 20 + (data.interests?.includes('Entrepreneurship') ? 35 : 0) + (data.skills?.some((s: string) => ['Sales', 'Marketing', 'Business'].includes(s)) ? 20 : 0)),
    goalClarity: Math.min(100, hasGoal * 40 + (data.salary_expectation ? 20 : 0) + (data.goal_timeline ? 20 : 0) + (data.work_life_balance ? 20 : 0)),
    adaptability: Math.min(100, 50 + answerCount * 5),
  };
}

function derivePersonality(data: any) {
  const workEnv = data.answers?.find((a: any) => a.scenario_key === 'work_environment')?.selected_option || 'Balanced';
  const problemApproach = data.answers?.find((a: any) => a.scenario_key === 'problem_approach')?.selected_option || 'Solving Problems';
  const riskRaw = data.answers?.find((a: any) => a.scenario_key === 'risk_appetite')?.selected_option || '3';
  const risk = parseInt(riskRaw) || 3;

  let type = 'The Strategist';
  let desc = 'You approach challenges methodically, with a blend of analytical thinking and practical execution.';
  if (problemApproach === 'Creating Ideas') {
    type = 'The Innovator';
    desc = 'You thrive on creative thinking and love generating new ideas and solutions.';
  } else if (problemApproach === 'Managing People') {
    type = 'The Leader';
    desc = 'You naturally gravitate toward organizing people and driving teams toward goals.';
  }
  if (risk >= 4) {
    type = 'The Trailblazer';
    desc = 'Bold and fearless, you embrace risk and love pushing boundaries.';
  }

  return { type, desc, riskLevel: risk, workEnv };
}

const COLORS = ['#2D305A', '#4f46e5', '#7c3aed', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316'];

export default function StepSummary({ data, onComplete, onEdit }: { data: any, onComplete: () => void, onEdit: (step: number) => void }) {
  const scores = useMemo(() => deriveScores(data), [data]);
  const personality = useMemo(() => derivePersonality(data), [data]);

  const radarData = [
    { subject: 'Analytical', value: scores.analytical },
    { subject: 'Creativity', value: scores.creativity },
    { subject: 'Leadership', value: scores.leadership },
    { subject: 'Technical', value: scores.technical },
    { subject: 'Communication', value: scores.communication },
    { subject: 'Entrepreneurship', value: scores.entrepreneurship },
    { subject: 'Goal Clarity', value: scores.goalClarity },
    { subject: 'Adaptability', value: scores.adaptability },
  ];

  const confidenceScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

  const interestData = (data.interests || []).map((interest: string, i: number) => ({
    name: interest,
    value: 1,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Banner */}
      <motion.div {...fadeIn} className="glass-card border-border shadow-lg p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D305A]/5 via-transparent to-[#F4C7E6]/10 pointer-events-none" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D305A] to-[#4f46e5]">Career DNA</span> Report
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Based on your responses, we've mapped your unique career profile. Here's your comprehensive DNA analysis.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personality Card */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="glass-card border-border shadow-sm p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Brain className="w-6 h-6 text-[#2D305A]" /> Personality Type
                </h2>
              </div>
              <button onClick={() => onEdit(6)} className="text-xs text-[#2D305A] hover:underline">Edit</button>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2D305A]/10 to-[#E2E2FA]/30 flex items-center justify-center border border-[#2D305A]/20 shrink-0">
                <span className="text-4xl">{personality.type === 'The Innovator' ? '💡' : personality.type === 'The Leader' ? '👔' : personality.type === 'The Trailblazer' ? '🚀' : '♟️'}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2D305A] mb-2">{personality.type}</h3>
                <p className="text-muted-foreground leading-relaxed">{personality.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-[#2D305A]/10 text-[#2D305A] rounded-full text-xs font-medium">
                    {personality.workEnv} Worker
                  </span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
                    Risk: {'●'.repeat(personality.riskLevel)}{'○'.repeat(5 - personality.riskLevel)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Strength Radar */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="glass-card border-border shadow-sm p-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-amber-500" /> Strength DNA Radar
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(45,48,90,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Radar
                    name="Strength"
                    dataKey="value"
                    stroke="#2D305A"
                    strokeWidth={2}
                    fill="#2D305A"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Key Strengths & Growth Areas */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card border-border shadow-sm p-6 border-l-4 border-l-emerald-400">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> Key Strengths
              </h3>
              <ul className="space-y-3">
                {Object.entries(scores)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span className="text-sm text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${value}%` }} />
                        </div>
                        <span className="text-xs text-emerald-600 font-bold">{value}%</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="glass-card border-border shadow-sm p-6 border-l-4 border-l-amber-400">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" /> Growth Areas
              </h3>
              <ul className="space-y-3">
                {Object.entries(scores)
                  .sort(([,a], [,b]) => a - b)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span className="text-sm text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${value}%` }} />
                        </div>
                        <span className="text-xs text-amber-600 font-bold">{value}%</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Confidence Score */}
          <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="glass-card border-border shadow-sm p-6 text-center">
            <h3 className="font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-[#2D305A]" /> Career Confidence
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E2FA" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="#2D305A" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${confidenceScore * 2.64} 264`}
                  initial={{ strokeDasharray: '0 264' }}
                  animate={{ strokeDasharray: `${confidenceScore * 2.64} 264` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-[#2D305A]">{confidenceScore}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Based on completeness and clarity of your responses</p>
          </motion.div>

          {/* Profile Summary */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="glass-card border-border shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#2D305A]" /> Profile
              </h3>
              <button onClick={() => onEdit(2)} className="text-xs text-[#2D305A] hover:underline">Edit</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium text-foreground">{data.user_type || '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Goal</span>
                <span className="font-medium text-foreground truncate max-w-[160px]">{data.career_goal || '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Learning</span>
                <span className="font-medium text-foreground">{data.learning_style || '—'}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeIn} transition={{ delay: 0.25 }} className="glass-card border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Skills
              </h3>
              <button onClick={() => onEdit(4)} className="text-xs text-[#2D305A] hover:underline">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((s: string) => (
                <span key={s} className="px-2.5 py-1 bg-[#2D305A]/10 text-[#2D305A] rounded-full text-xs font-medium">{s}</span>
              ))}
              {!data.skills?.length && <span className="text-muted-foreground text-sm">None selected</span>}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="glass-card border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" /> Interests
              </h3>
              <button onClick={() => onEdit(5)} className="text-xs text-[#2D305A] hover:underline">Edit</button>
            </div>
            {interestData.length > 0 ? (
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={interestData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
                      {interestData.map((entry: any, idx: number) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {data.interests?.map((i: string, idx: number) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: `${COLORS[idx % COLORS.length]}15`, color: COLORS[idx % COLORS.length] }}>{i}</span>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div {...fadeIn} transition={{ delay: 0.35 }} className="glass-card border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" /> Preferences
              </h3>
              <button onClick={() => onEdit(9)} className="text-xs text-[#2D305A] hover:underline">Edit</button>
            </div>
            <div className="space-y-2 text-sm">
              {data.preferred_location && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{data.preferred_location}</span>
                </div>
              )}
              {data.languages?.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium text-foreground">{data.languages?.join(', ')}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Summary */}
      <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="glass-card border-border shadow-sm p-8 bg-gradient-to-br from-[#2D305A]/5 to-[#E2E2FA]/10">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-[#2D305A]" /> AI Summary
        </h2>
        <div className="bg-white/60 border border-border rounded-xl p-6 text-muted-foreground leading-relaxed">
          <p>
            Based on your Career DNA mapping, you are a <strong className="text-foreground">{personality.type}</strong> with a strong affinity for
            {' '}<strong className="text-foreground">{data.interests?.slice(0, 2).join(' and ') || 'multiple fields'}</strong>.
            Your top skills in <strong className="text-foreground">{data.skills?.slice(0, 2).join(' and ') || 'your selected areas'}</strong> position you well for careers that require
            {scores.analytical > 60 ? ' analytical thinking,' : ''}
            {scores.creativity > 60 ? ' creative problem-solving,' : ''}
            {scores.leadership > 60 ? ' leadership capabilities,' : ''} and
            {scores.technical > 60 ? ' technical expertise' : ' a diverse skill set'}.
          </p>
          <p className="mt-3">
            You prefer <strong className="text-foreground">{data.learning_style || 'flexible'}</strong> learning and aim to achieve your goal of
            {' '}<strong className="text-foreground">{data.career_goal || 'career growth'}</strong>
            {data.goal_timeline ? ` within ${data.goal_timeline.replace('_', ' ')}` : ''}.
            Your Career Confidence Score of <strong className="text-[#2D305A]">{confidenceScore}%</strong> indicates a{' '}
            {confidenceScore >= 70 ? 'strong foundation' : 'developing profile'} for career matching.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <Button variant="ghost" onClick={() => onEdit(9)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Edit
        </Button>
        <Button
          onClick={onComplete}
          size="lg"
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white px-10 shadow-[0_4px_24px_rgba(45,48,90,0.3)] hover:shadow-[0_8px_32px_rgba(45,48,90,0.4)]"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Complete & View AI Recommendations
        </Button>
      </motion.div>
    </div>
  );
}
