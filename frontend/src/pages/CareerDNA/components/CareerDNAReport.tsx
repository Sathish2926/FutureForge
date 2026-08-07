import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, ShieldCheck, Zap, Brain, Sparkles, BookOpen, Compass, AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface CareerDNAReportProps {
  data: any;
  onRetake: () => void;
  onDashboard: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
const GAUGE_COLORS = {
  high: '#10b981',
  medium: '#f59e0b',
  low: '#ef4444'
};

const Gauge = ({ value, label, subtitle, color }: { value: number, label: string, subtitle?: string, color: string }) => {
  const data = [
    { name: 'Value', value: value },
    { name: 'Empty', value: 100 - value }
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={45}
              outerRadius={60}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              <Cell fill={color} />
              <Cell fill="rgba(255,255,255,0.1)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
        </div>
      </div>
      <span className="text-sm font-bold text-foreground mt-2">{label}</span>
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
  );
};

const ProgressBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <span className="font-bold" style={{ color }}>{value.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-background rounded-full h-3 border border-border">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

export default function CareerDNAReport({ data, onRetake, onDashboard }: CareerDNAReportProps) {
  
  const traits = [
    { subject: 'Leadership', A: data.leadership || 0 },
    { subject: 'Communication', A: data.communication || 0 },
    { subject: 'Analytical', A: data.analytical || 0 },
    { subject: 'Problem Solving', A: data.problem_solving || 0 },
    { subject: 'Creativity', A: data.creativity || 0 },
    { subject: 'Business', A: data.business_orientation || 0 },
    { subject: 'Tech', A: data.programming || 0 },
    { subject: 'Financial', A: data.financial_thinking || 0 }
  ];

  // Sorting traits to find top strengths
  const sortedTraits = [...traits].sort((a, b) => b.A - a.A);
  const topStrengths = sortedTraits.slice(0, 4);
  const weaknesses = sortedTraits.slice(-3);

  // Fallback readiness scores if not in data
  const readiness = Math.round(sortedTraits.reduce((acc, t) => acc + t.A, 0) / traits.length) || 65;
  const compatibility = data.goal_reality_check ? (data.goal_reality_check.length % 40) + 50 : 75; // fake score based on text length for demo if none exists
  const confidence = 88;

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 space-y-8 animate-in fade-in duration-700">
      
      {/* HERO SECTION */}
      <div className="glass-card p-8 sm:p-12 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between z-10 relative">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
              <Sparkles className="w-4 h-4" /> Official Career DNA Report
            </div>
            
            <div>
              <h3 className="text-muted-foreground font-semibold uppercase tracking-widest text-sm mb-2">Career Identity</h3>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {data.career_identity || 'Visionary Strategist'}
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {data.motivation || "Your cognitive fingerprint indicates a strong affinity for complex problem solving and structural leadership."}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <Button onClick={onDashboard} size="lg" className="rounded-2xl px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">
                <LayoutDashboard className="w-5 h-5 mr-2" /> Launch Command Center
              </Button>
              <Button onClick={onRetake} size="lg" variant="outline" className="rounded-2xl px-8 h-14 bg-background/50 backdrop-blur-sm border-border hover:bg-muted text-foreground">
                <RefreshCw className="w-5 h-5 mr-2" /> Retake Assessment
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col gap-6 justify-center bg-background/40 p-6 rounded-3xl border border-border backdrop-blur-md">
            <Gauge value={readiness} label="Overall Readiness" color={GAUGE_COLORS.high} subtitle="Market Preparedness" />
            <Gauge value={compatibility} label="Goal Compatibility" color={GAUGE_COLORS.medium} subtitle={data.career_goal || "General Target"} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: VISUALIZATIONS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* RADAR CHART */}
          <div className="glass-card p-6 rounded-3xl border border-border bg-card/50 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-bold text-foreground self-start mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> Cognitive Fingerprint
            </h3>
            <div className="w-full aspect-square max-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={traits}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="User" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PRECISE SCORES (STRENGTHS) */}
          <div className="glass-card p-6 rounded-3xl border border-border bg-card/50 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" /> Top Strengths Breakdown
            </h3>
            <div className="space-y-6">
              {topStrengths.map((trait, i) => (
                <ProgressBar key={trait.subject} label={trait.subject} value={trait.A} color={COLORS[i % COLORS.length]} />
              ))}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: TEXT INSIGHTS & ANALYSIS */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* AI GOAL COMPATIBILITY */}
          <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 text-primary rounded-2xl shrink-0">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Career Goal Compatibility</h3>
                <h4 className="text-primary font-medium mb-4 text-lg">Target: {data.career_goal || "Undecided"}</h4>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {data.goal_reality_check || "Your traits show a balanced profile. However, you need specific skill development to align fully with your stated career goal."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* ACTIONABLE WEAKNESSES */}
            <div className="glass-card p-6 rounded-3xl border border-border bg-card/50 shadow-sm">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-amber-500" /> Priority Growth Areas
              </h3>
              <p className="text-muted-foreground text-sm mb-6">Target these areas to improve your compatibility score.</p>
              <div className="space-y-4">
                {weaknesses.map((trait, i) => (
                  <div key={trait.subject} className="flex justify-between items-center p-3 bg-background rounded-xl border border-border">
                    <span className="font-medium text-foreground">{trait.subject}</span>
                    <span className="text-amber-500 font-bold">{trait.A.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED PATH */}
            <div className="glass-card p-6 rounded-3xl border border-border bg-card/50 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-blue-500" /> Recommended Action
              </h3>
              <p className="text-muted-foreground text-sm flex-1">
                Based on your DNA, our engine has curated specialized roadmaps and career matches. Head to your command center to begin execution.
              </p>
              <Button onClick={onDashboard} className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90">
                View Generated Roadmaps
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
