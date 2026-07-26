import { Button } from '../../../components/ui/button';
import { Dna, ArrowRight, Clock, Target, Sparkles } from 'lucide-react';

export default function StepWelcome({ onNext }: { onNext: (data: any) => void }) {
  return (
    <div className="glass-card border-border shadow-sm text-center py-12 px-6">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 shadow-[0_0_40px_rgba(79,70,229,0.3)]">
        <Dna className="w-12 h-12 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Career DNA</span>
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        FutureForge's Career DNA is an AI-powered profiling engine. We look beyond basic aptitude to understand your unique blend of skills, interests, and aspirations, generating highly personalized career roadmaps and scholarship recommendations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
        <div className="bg-background border border-border rounded-xl p-5 flex flex-col items-center">
          <Clock className="w-8 h-8 text-secondary mb-3" />
          <h3 className="text-foreground font-medium mb-1">5-7 Minutes</h3>
          <p className="text-sm text-muted-foreground">Quick & adaptive questions</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-5 flex flex-col items-center">
          <Target className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="text-foreground font-medium mb-1">Personalized</h3>
          <p className="text-sm text-muted-foreground">Adapts to your profile</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-5 flex flex-col items-center">
          <Sparkles className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-foreground font-medium mb-1">Autosaved</h3>
          <p className="text-sm text-muted-foreground">Resume anytime</p>
        </div>
      </div>
      
      <Button 
        onClick={() => onNext({})}
        size="lg" 
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full group transition-all duration-300"
      >
        Let's Begin
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
