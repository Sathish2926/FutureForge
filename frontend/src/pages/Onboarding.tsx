import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'education', title: 'Education Level', fields: ['current_level', 'marks'] },
  { id: 'interests', title: 'Interests & Skills', fields: ['interests', 'skills'] },
  { id: 'preferences', title: 'Preferences', fields: ['budget', 'location', 'gov_private'] },
];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    current_level: '', marks: '', interests: '', skills: '', budget: '', location: '', gov_private: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit data
      console.log('Submitting onboarding data', formData);
      navigate('/assessment');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <span key={step.id} className={`text-sm font-medium ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.title}
              </span>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="glass-card p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h2 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h2>
              
              <div className="space-y-4">
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Highest Education Level</label>
                      <Input name="current_level" value={formData.current_level} onChange={handleInputChange} placeholder="e.g. 12th Grade, B.Tech" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Percentage / CGPA</label>
                      <Input name="marks" type="number" value={formData.marks} onChange={handleInputChange} placeholder="e.g. 92, 8.5" />
                    </div>
                  </>
                )}
                
                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Core Interests (comma separated)</label>
                      <Input name="interests" value={formData.interests} onChange={handleInputChange} placeholder="e.g. Technology, Art, Finance" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Current Skills (comma separated)</label>
                      <Input name="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g. Python, Communication, Design" />
                    </div>
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Yearly Budget (INR)</label>
                      <Input name="budget" type="number" value={formData.budget} onChange={handleInputChange} placeholder="e.g. 500000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Preferred Location</label>
                      <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Mumbai, Bangalore" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <label className="text-sm text-muted-foreground">Institution Preference</label>
                      <select 
                        name="gov_private" 
                        value={formData.gov_private} 
                        onChange={handleInputChange}
                        className="w-full bg-background border border-border rounded-md p-2 text-foreground"
                      >
                        <option value="">Select preference</option>
                        <option value="gov">Government</option>
                        <option value="private">Private</option>
                        <option value="any">No Preference</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="bg-background/50">
              Back
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white">
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
