import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { startCareerDNA, fetchCareerDNAProgress, saveCareerDNAStep, completeCareerDNA } from '../../services/careerdna';
import type { CareerDNAResponse } from '../../types';
import { routePaths } from '../../constants/routes';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';

// Step Components
import StepWelcome from './components/StepWelcome';
import StepUserType from './components/StepUserType';
import StepAcademic from './components/StepAcademic';
import StepSkills from './components/StepSkills';
import StepInterests from './components/StepInterests';
import StepPersonality from './components/StepPersonality';
import StepLearning from './components/StepLearning';
import StepGoals from './components/StepGoals';
import StepConstraints from './components/StepConstraints';
import StepSummary from './components/StepSummary';
import CareerDNAProgress from './components/CareerDNAProgress';

export default function CareerDNAWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [dna, setDna] = useState<CareerDNAResponse | null>(null);
  
  // Data stores for the wizard (allows navigating back without losing local state before save)
  const [wizardData, setWizardData] = useState<any>({});

  useEffect(() => {
    async function load() {
      try {
        if (!auth.currentUser) {
          navigate(routePaths.login);
          return;
        }
        let progress = await fetchCareerDNAProgress().catch(() => null);
        if (!progress) {
          progress = await startCareerDNA();
        }
        setDna(progress);
        
        if (progress.is_completed) {
          setStep(10); // Go to summary
        } else {
          setStep(Math.max(1, progress.last_completed_step));
        }
      } catch (e) {
        toast("Failed to load Career DNA progress", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate, toast]);

  const handleNext = async (stepData: any) => {
    setLoading(true);
    try {
      // Save local state
      const newData = { ...wizardData, ...stepData };
      setWizardData(newData);
      
      // Save to backend if it's a data-gathering step
      if (step > 1 && step < 10) {
        await saveCareerDNAStep(step, stepData);
      }
      
      if (step < 10) {
        setStep(step + 1);
        if (dna) {
          setDna({
             ...dna, 
             last_completed_step: Math.max(dna.last_completed_step, step + 1),
             completion_percentage: Math.floor(((step) / 10) * 100),
             user_type: step === 2 && stepData.user_type ? stepData.user_type : dna.user_type
          });
        }
      }
    } catch (e) {
      toast("Failed to save progress", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await completeCareerDNA();
      toast("Career DNA Mapping Complete!", "success");
      navigate(routePaths.dashboard);
    } catch {
      toast("Failed to complete Career DNA", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !dna) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <StepWelcome onNext={handleNext} />;
      case 2: return <StepUserType initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 3: return <StepAcademic userType={dna?.user_type || wizardData.user_type} initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 4: return <StepSkills initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 5: return <StepInterests initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 6: return <StepPersonality initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 7: return <StepLearning initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 8: return <StepGoals initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 9: return <StepConstraints initialData={wizardData} onNext={handleNext} onBack={handleBack} />;
      case 10: return <StepSummary data={wizardData} onComplete={handleComplete} onEdit={(s) => setStep(s)} />;
      default: return <StepWelcome onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col pt-16">
      {/* Background styling matching existing app */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="w-full max-w-4xl mx-auto px-4 z-10 flex-1 flex flex-col py-8">
        {step > 1 && step < 10 && (
           <CareerDNAProgress currentStep={step} totalSteps={10} completionPercentage={dna?.completion_percentage || 0} />
        )}
        
        <div className="flex-1 flex flex-col relative justify-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
