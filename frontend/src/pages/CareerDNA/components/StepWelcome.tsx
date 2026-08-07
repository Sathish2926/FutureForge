import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Dna, ArrowRight, Clock, Target, Sparkles, Shield, Keyboard } from 'lucide-react';

const FEATURES = [
  { icon: Clock, title: '5–7 Minutes', desc: 'Quick & adaptive questions', color: 'text-[#F4C7E6]', bg: 'bg-[#F4C7E6]/10 border-[#F4C7E6]/20' },
  { icon: Target, title: 'Personalized', desc: 'Adapts to your profile type', color: 'text-amber-400', bg: 'bg-amber-50 border-amber-200' },
  { icon: Shield, title: 'Autosaved', desc: 'Resume anytime, anywhere', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' },
  { icon: Keyboard, title: 'Keyboard Friendly', desc: 'Press Enter to continue', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
];

const floatVariant = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
};

export default function StepWelcome({ onNext }: { onNext: (data: any) => void }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onNext({});
  };

  return (
    <div className="glass-card border-border shadow-sm text-center py-12 px-6 relative overflow-hidden" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D305A]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F4C7E6]/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E2E2FA]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={floatVariant}
        animate="animate"
        className="w-28 h-28 mx-auto bg-gradient-to-br from-[#2D305A]/20 to-[#E2E2FA]/30 rounded-full flex items-center justify-center mb-8 border-2 border-[#2D305A]/20 shadow-[0_0_60px_rgba(45,48,90,0.2)] relative"
      >
        <Dna className="w-14 h-14 text-[#2D305A]" />
        {/* Orbiting sparkle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full"
        >
          <Sparkles className="w-4 h-4 text-[#F4C7E6] absolute -top-1 left-1/2 -translate-x-1/2" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Discover Your{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D305A] to-[#4f46e5]">
          Career DNA
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        FutureForge's Career DNA is an AI-powered profiling engine that goes beyond basic aptitude.
        We understand your unique blend of skills, interests, personality and aspirations to generate
        highly personalized career roadmaps.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
      >
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`${feat.bg} border rounded-xl p-5 flex flex-col items-center gap-2 hover:scale-[1.03] transition-transform`}
          >
            <feat.icon className={`w-7 h-7 ${feat.color}`} />
            <h3 className="text-foreground font-semibold text-sm">{feat.title}</h3>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <Button
          onClick={() => onNext({})}
          size="lg"
          className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white px-12 py-6 text-lg rounded-full group transition-all duration-300 shadow-[0_4px_24px_rgba(45,48,90,0.3)] hover:shadow-[0_8px_32px_rgba(45,48,90,0.4)]"
        >
          Let's Begin
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-xs text-muted-foreground mt-4">Press Enter ↵ to start</p>
      </motion.div>
    </div>
  );
}
