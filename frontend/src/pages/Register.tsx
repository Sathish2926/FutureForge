import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, MapPin, Calendar, Users, GraduationCap, Briefcase } from 'lucide-react';
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

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', state: '', district: '', language: '',
    userType: '',
    institution: '', board: '', marks: '',
    college: '', degree: '', department: '', cgpa: '',
    company: '', experience: '', industry: '',
    email: '', password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 4) {
      handleNext();
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: `${formData.firstName} ${formData.lastName}` });
      await sendEmailVerification(userCredential.user);
      
      // Store additional details via API later, for now route to profile
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

  const isSchool = ['10th', '11th', '12th', 'diploma'].includes(formData.userType);
  const isCollege = ['ug', 'pg'].includes(formData.userType);
  const isPro = ['professional', 'switcher'].includes(formData.userType);

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Dynamic light theme background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/30 rounded-bl-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/20 rounded-tr-[100%] blur-[120px] pointer-events-none" />

      {/* Left panel - Branding */}
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

      {/* Right panel - Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 sm:p-12 z-10 relative">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-border0 p-8 sm:p-12">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {step === 1 && "Personal Details"}
                {step === 2 && "Who are you?"}
                {step === 3 && "Academic/Work Profile"}
                {step === 4 && "Create Credentials"}
              </h2>
              <div className="text-sm font-medium text-muted-foreground">Step {step} of 4</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
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
                      <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Last Name</label>
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Date of Birth</label>
                      <Input type="date" name="dob" value={formData.dob} onChange={handleChange} className="h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-14 px-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">State</label>
                      <Input name="state" value={formData.state} onChange={handleChange} placeholder="Tamil Nadu" className="h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">District</label>
                      <Input name="district" value={formData.district} onChange={handleChange} placeholder="Chennai" className="h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {USER_TYPES.map(type => (
                      <div 
                        key={type.id} 
                        onClick={() => setFormData({...formData, userType: type.id})}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${formData.userType === type.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-background hover:border-primary/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.userType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          <type.icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-foreground">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  {isSchool && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">School / Institution</label>
                        <Input name="institution" value={formData.institution} onChange={handleChange} placeholder="DPS" className="h-14 rounded-xl bg-background" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Board</label>
                          <select name="board" value={formData.board} onChange={handleChange} className="w-full h-14 px-4 rounded-xl bg-background border border-border focus:border-primary outline-none" required>
                            <option value="">Select</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="State">State Board</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Percentage / Grade</label>
                          <Input name="marks" value={formData.marks} onChange={handleChange} placeholder="95%" className="h-14 rounded-xl bg-background" required />
                        </div>
                      </div>
                    </>
                  )}
                  {isCollege && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">College / University</label>
                        <Input name="college" value={formData.college} onChange={handleChange} placeholder="Anna University" className="h-14 rounded-xl bg-background" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Degree</label>
                          <Input name="degree" value={formData.degree} onChange={handleChange} placeholder="B.Tech" className="h-14 rounded-xl bg-background" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Department</label>
                          <Input name="department" value={formData.department} onChange={handleChange} placeholder="Computer Science" className="h-14 rounded-xl bg-background" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">CGPA</label>
                        <Input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="8.5" className="h-14 rounded-xl bg-background" required />
                      </div>
                    </>
                  )}
                  {isPro && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Current Company</label>
                        <Input name="company" value={formData.company} onChange={handleChange} placeholder="Tech Corp" className="h-14 rounded-xl bg-background" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Years of Experience</label>
                          <Input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="3" className="h-14 rounded-xl bg-background" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Industry</label>
                          <Input name="industry" value={formData.industry} onChange={handleChange} placeholder="IT / Software" className="h-14 rounded-xl bg-background" required />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="pl-12 h-14 rounded-xl bg-background border-border focus:border-primary" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="pl-12 h-14 rounded-xl bg-background border-border focus:border-primary" required />
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
              
              <Button type="submit" className="h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" disabled={loading || (step === 2 && !formData.userType)}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : step === 4 ? (
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
