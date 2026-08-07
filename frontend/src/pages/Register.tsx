import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, Sparkles, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { routePaths } from '../constants/routes';

const USER_TYPES = [
  { id: '10th', label: 'Class 10 Student', icon: GraduationCap },
  { id: '11th', label: 'Class 11 Student', icon: GraduationCap },
  { id: '12th', label: 'Class 12 Student', icon: GraduationCap },
  { id: 'diploma', label: 'Diploma Student', icon: GraduationCap },
  { id: 'ug', label: 'Undergraduate', icon: GraduationCap },
  { id: 'pg', label: 'Postgraduate', icon: GraduationCap },
  { id: 'professional', label: 'Working Professional', icon: Briefcase },
  { id: 'switcher', label: 'Career Switcher', icon: Briefcase },
];

const COMMUNITIES = ['General', 'OBC', 'SC', 'ST', 'Other'];
const GENDERS = ['Male', 'Female', 'Other'];
const LANGUAGES = ['English', 'Tamil', 'Hindi', 'Telugu', 'Malayalam', 'Kannada'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', userType: '', email: '', password: '',
    dob: '', gender: '', state: '', district: '', community: '', family_income: '', languages: 'English',
    current_course: '', college: '', career_goal: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) {
      handleNext();
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: `${formData.firstName} ${formData.lastName}` });
      await sendEmailVerification(userCredential.user);
      
      let education_level = '';
      let occupation = 'Student';
      if (formData.userType === '10th') education_level = '10th';
      else if (['11th', '12th'].includes(formData.userType)) education_level = '12th';
      else if (formData.userType === 'diploma') education_level = 'Diploma';
      else if (formData.userType === 'ug') education_level = 'UG';
      else if (formData.userType === 'pg') education_level = 'PG';
      else if (formData.userType === 'professional') {
        occupation = 'Working Professional';
      }
      else if (formData.userType === 'switcher') {
        occupation = 'Career Switcher';
      }

      try {
        const { apiClient } = await import('../services/http');
        
        await apiClient.post('/auth/register', {
          user_type: formData.userType,
          education_level,
          occupation,
          dob: formData.dob,
          gender: formData.gender,
          state: formData.state,
          district: formData.district,
          community: formData.community,
          family_income: parseFloat(formData.family_income) || 0,
          languages: [formData.languages],
          current_course: formData.current_course,
          college: formData.college,
          career_goal: formData.career_goal
        });
      } catch (e) {
        console.error('Failed to sync profile data:', e);
        // Clean up Firebase user if DB transaction fails
        await userCredential.user.delete();
        throw new Error('Failed to initialize account. Please try again.');
      }
      
      navigate(routePaths.profile);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/30 rounded-bl-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/20 rounded-tr-[100%] blur-[120px] pointer-events-none" />

      <div className="hidden lg:flex flex-col justify-center w-1/3 bg-primary text-primary-foreground p-12 relative overflow-hidden z-10 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2564')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-sm">
          <Link to={routePaths.home} className="inline-flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition-colors">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">FutureForge</span>
          </Link>
          <h1 className="text-4xl font-bold mb-6 leading-tight">Shape Your <br/>Destiny</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Join thousands of students and professionals mapping out their dream careers with AI-powered intelligence.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 sm:p-12 z-10 relative">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-border0 p-8 sm:p-12 h-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {step === 1 && "Basic Info & Role"}
                {step === 2 && "Personal Details"}
                {step === 3 && "Academic & Account"}
              </h2>
              <div className="text-sm font-medium text-muted-foreground">Step {step} of 3</div>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">First Name</label>
                      <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Last Name</label>
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-semibold text-foreground">What is your current occupation status?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                      {USER_TYPES.map(type => (
                        <div 
                          key={type.id} 
                          onClick={() => setFormData({...formData, userType: type.id})}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 text-center ${formData.userType === type.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-background hover:border-primary/50'}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.userType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            <type.icon className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-foreground text-xs">{type.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Date of Birth</label>
                      <Input name="dob" type="date" value={formData.dob} onChange={handleChange} className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 px-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary" required>
                        <option value="">Select Gender</option>
                        {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">State</label>
                      <Input name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Tamil Nadu" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">District</label>
                      <Input name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Chennai" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Community Category</label>
                      <select name="community" value={formData.community} onChange={handleChange} className="w-full h-12 px-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary" required>
                        <option value="">Select Category</option>
                        {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Annual Family Income</label>
                      <select name="family_income" value={formData.family_income} onChange={handleChange} className="w-full h-12 px-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary" required>
                        <option value="">Select Income Range</option>
                        <option value="100000">Below 2 Lakhs</option>
                        <option value="300000">2-5 Lakhs</option>
                        <option value="700000">5-10 Lakhs</option>
                        <option value="1500000">Above 10 Lakhs</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Current Course / Degree</label>
                      <Input name="current_course" value={formData.current_course} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">College / School</label>
                      <Input name="college" value={formData.college} onChange={handleChange} placeholder="e.g. Anna University" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Ultimate Career Goal</label>
                      <Input name="career_goal" value={formData.career_goal} onChange={handleChange} placeholder="e.g. Software Engineer, IAS" className="h-12 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Preferred Language</label>
                      <select name="languages" value={formData.languages} onChange={handleChange} className="w-full h-12 px-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary" required>
                        {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2 mt-4 pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold text-foreground mb-4">Account Credentials</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="pl-12 h-12 rounded-xl bg-background border-border focus:border-primary" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="pl-12 h-12 rounded-xl bg-background border-border focus:border-primary" minLength={6} required />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrev} className="h-12 px-6 rounded-xl border-border text-foreground hover:bg-muted">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : <div />}
              
              <Button 
                type="submit" 
                className="h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" 
                disabled={loading || (step === 1 && (!formData.firstName || !formData.lastName || !formData.userType))}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : step === 3 ? (
                  'Complete Setup'
                ) : (
                  <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
            Already have an account? <Link to={routePaths.login} className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
