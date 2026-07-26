import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, GitCompare, Building, GraduationCap, Coins, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { runCareerSimulation, type SimulationResponse, type SimulationRequest } from '../services/simulator';

const PRESETS = [
  {
    id: 'degree',
    title: 'BCA vs B.Tech',
    icon: GraduationCap,
    desc: 'Compare computer science degree paths',
    req: {
      scenario_a: { label: 'BCA', changes: { degree: 'BCA' } },
      scenario_b: { label: 'B.Tech', changes: { degree: 'B.Tech CS' } }
    }
  },
  {
    id: 'location',
    title: 'Chennai vs Bengaluru',
    icon: Building,
    desc: 'See how location impacts your tech career',
    req: {
      scenario_a: { label: 'Chennai', changes: { location: 'Chennai' } },
      scenario_b: { label: 'Bengaluru', changes: { location: 'Bengaluru' } }
    }
  },
  {
    id: 'budget',
    title: 'Low vs High Budget',
    icon: Coins,
    desc: 'Compare college tier possibilities',
    req: {
      scenario_a: { label: '₹1 Lakh Budget', changes: { budget: 100000 } },
      scenario_b: { label: '₹10 Lakh Budget', changes: { budget: 1000000 } }
    }
  }
];

export default function WhatIfSimulator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleSimulate = async (id: string, req: SimulationRequest) => {
    setActivePreset(id);
    setLoading(true);
    setResult(null);
    try {
      const res = await runCareerSimulation(req);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderScenarioResult = (scenario: any, gradient: string) => (
    <div className="glass-card border-border shadow-sm flex-1 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} rounded-full blur-[60px] -z-10`} />
      <h3 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4">{scenario.label}</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Metrics</h4>
          <div className="space-y-3">
            {scenario.metrics.map((m: any, i: number) => (
              <div key={i} className="bg-background p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">{m.category}</div>
                <div className="text-sm font-medium text-foreground">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Career Paths</h4>
          <div className="flex flex-wrap gap-2">
            {scenario.career_paths?.map((c: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">{c}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Top Colleges</h4>
          <ul className="space-y-2">
            {scenario.recommended_colleges?.map((c: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="glass-card border-border shadow-sm bg-gradient-to-r from-purple-500/10 via-primary/10 to-blue-500/10 border-primary/20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <GitCompare className="w-3 h-3" />
          AI Scenario Engine
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">What-If Career Simulator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Instantly simulate how major life decisions—like changing your degree, location, or budget—will alter your future career trajectory.
        </p>
      </div>

      {/* Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRESETS.map((preset) => (
          <div 
            key={preset.id} 
            onClick={() => handleSimulate(preset.id, preset.req)}
            className={`glass-card border-border shadow-sm cursor-pointer transition-all ${activePreset === preset.id ? 'border-primary shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'hover:border-border hover:bg-background'}`}
          >
            <preset.icon className={`w-8 h-8 mb-4 ${activePreset === preset.id ? 'text-primary' : 'text-muted-foreground'}`} />
            <h3 className="text-lg font-bold text-foreground mb-2">{preset.title}</h3>
            <p className="text-sm text-muted-foreground">{preset.desc}</p>
          </div>
        ))}
      </div>

      {/* Results Area */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center text-primary">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-muted-foreground font-medium animate-pulse">Running AI simulation models...</p>
        </div>
      )}

      <AnimatePresence>
        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Conclusion */}
            <div className="glass-card border-border shadow-sm bg-primary/10 border-primary/20 text-center">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-2">AI Verdict</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">{result.ai_conclusion}</p>
            </div>

            {/* Split View */}
            <div className="flex flex-col md:flex-row gap-6">
              {renderScenarioResult(result.scenario_a_result, 'bg-emerald-500/20')}
              <div className="hidden md:flex items-center justify-center -mx-3 z-10">
                <div className="w-10 h-10 rounded-full bg-background border-4 border-background flex items-center justify-center text-muted-foreground font-bold text-sm">
                  VS
                </div>
              </div>
              {renderScenarioResult(result.scenario_b_result, 'bg-blue-500/20')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
