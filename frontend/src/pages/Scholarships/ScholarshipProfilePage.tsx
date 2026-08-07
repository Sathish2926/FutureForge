import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  Users,
  Wallet,
  Building2,
  Shield,
  Save,
  Sparkles
} from 'lucide-react';
import {
  createScholarshipProfile,
  fetchScholarshipProfile,
  updateScholarshipProfile,
} from '../../services/scholarships';
import { auth } from '../../lib/firebase';
import type { ScholarshipProfileCreate } from '../../types';
import { Button } from '../../components/ui/button';

const STEPS = [
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Academic' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Location' },
  { icon: <Users className="w-5 h-5" />, label: 'Demographics' },
  { icon: <Wallet className="w-5 h-5" />, label: 'Financial' },
  { icon: <Building2 className="w-5 h-5" />, label: 'Institution' },
  { icon: <Shield className="w-5 h-5" />, label: 'Status' },
];

const ACADEMIC_STAGES = [
  { value: 'class_10', label: 'Class 10' },
  { value: 'class_12', label: 'Class 12' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'ug', label: 'Undergraduate (UG)' },
  { value: 'pg', label: 'Postgraduate (PG)' },
];

const COMMUNITIES = ['SC', 'ST', 'BC', 'MBC', 'OBC', 'General', 'Minority'];
const GENDERS = ['Male', 'Female', 'Other'];
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[] | string[]; placeholder?: string;
}) {
  const opts = typeof options[0] === 'string'
    ? (options as string[]).map(o => ({ value: o, label: o }))
    : options as { value: string; label: string }[];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground ml-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 rounded-xl border border-border bg-background/50 px-4 text-base text-foreground outline-none transition-all hover:border-border focus:border-primary focus:bg-background/80"
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function InputField({ label, type = 'text', value, onChange, placeholder }: {
  label: string; type?: string; value: string | number; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground ml-1">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 rounded-xl border border-border bg-background/50 px-4 text-base text-foreground outline-none transition-all hover:border-border focus:border-primary focus:bg-background/80 placeholder:text-muted-foreground"
      />
    </div>
  );
}

function ToggleField({ label, value, onChange, description }: {
  label: string; value: boolean; onChange: (v: boolean) => void; description?: string;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl border p-5 transition-all ${value ? 'border-primary/50 bg-primary/10' : 'border-border bg-background/50 hover:bg-background/80 hover:border-border'}`}
      onClick={() => onChange(!value)}
    >
      <div>
        <div className="text-base font-medium text-foreground">{label}</div>
        {description && <div className="mt-1 text-sm text-muted-foreground">{description}</div>}
      </div>
      <div className={`relative flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${value ? 'bg-primary' : 'bg-slate-700'}`}>
        <div className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </div>
    </div>
  );
}

export function ScholarshipProfilePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState<ScholarshipProfileCreate>({
    academic_stage: '',
    current_course: null,
    current_year: null,
    state: null,
    district: null,
    community: null,
    gender: null,
    nationality: 'Indian',
    annual_family_income: null,
    parent_occupation: null,
    percentage_cgpa: null,
    has_disability: false,
    is_first_graduate: false,
    is_hosteller: false,
    is_government_institution: false,
    is_orphan: false,
    is_single_girl_child: false,
    is_minority: false,
    institution_name: null,
    university: null,
    institution_type: null,
    additional_info: null,
  });

  const updateField = <K extends keyof ScholarshipProfileCreate>(key: K, value: ScholarshipProfileCreate[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) { navigate('/login'); return; }
        const token = await user.getIdToken();
        const profile = await fetchScholarshipProfile(token);
        setForm({
          academic_stage: profile.academic_stage,
          current_course: profile.current_course,
          current_year: profile.current_year,
          state: profile.state,
          district: profile.district,
          community: profile.community,
          gender: profile.gender,
          nationality: profile.nationality,
          annual_family_income: profile.annual_family_income,
          parent_occupation: profile.parent_occupation,
          percentage_cgpa: profile.percentage_cgpa,
          has_disability: profile.has_disability,
          is_first_graduate: profile.is_first_graduate,
          is_hosteller: profile.is_hosteller,
          is_government_institution: profile.is_government_institution,
          is_orphan: profile.is_orphan,
          is_single_girl_child: profile.is_single_girl_child,
          is_minority: profile.is_minority,
          institution_name: profile.institution_name,
          university: profile.university,
          institution_type: profile.institution_type,
          additional_info: profile.additional_info,
        });
        setIsEditing(true);
      } catch {
        setIsEditing(false);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  const handleSave = async () => {
    if (!form.academic_stage) {
      setError('Please select your academic stage.');
      setStep(0);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      if (isEditing) {
        await updateScholarshipProfile(token, form);
      } else {
        await createScholarshipProfile(token, form);
      }
      setSaved(true);
      setTimeout(() => navigate('/scholarships'), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save profile.';
      setError(msg);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="relative z-10 w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center z-10">
          Profile Analysis Complete
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-muted-foreground text-center z-10 max-w-md">
          Our AI is mapping your eligibility against thousands of scholarships. Redirecting to your dashboard...
        </motion.p>
      </div>
    );
  }

  const stepContent = [
    // Step 0: Academic
    (
      <motion.div key="academic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
        <SelectField label="Academic Stage *" value={form.academic_stage} onChange={(v) => updateField('academic_stage', v)} options={ACADEMIC_STAGES} />
        {!['class_10', 'class_12'].includes(form.academic_stage) && (
          <>
            <InputField label="Current Course" value={form.current_course ?? ''} onChange={(v) => updateField('current_course', v || null)} placeholder="e.g. B.Tech Computer Science" />
            <InputField label="Current Year" type="number" value={form.current_year ?? ''} onChange={(v) => updateField('current_year', v ? parseInt(v) : null)} placeholder="e.g. 2" />
          </>
        )}
        <InputField label={['class_10', 'class_12'].includes(form.academic_stage) ? "Percentage / Marks" : "Percentage / CGPA"} type="number" value={form.percentage_cgpa ?? ''} onChange={(v) => updateField('percentage_cgpa', v ? parseFloat(v) : null)} placeholder={['class_10', 'class_12'].includes(form.academic_stage) ? "e.g. 95" : "e.g. 85.5"} />
      </motion.div>
    ),
    // Step 1: Location
    (
      <motion.div key="location" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
        <SelectField label="State" value={form.state ?? ''} onChange={(v) => updateField('state', v || null)} options={INDIAN_STATES} />
        <InputField label="District" value={form.district ?? ''} onChange={(v) => updateField('district', v || null)} placeholder="e.g. Chennai" />
        <InputField label="Nationality" value={form.nationality ?? 'Indian'} onChange={(v) => updateField('nationality', v)} placeholder="Indian" />
      </motion.div>
    ),
    // Step 2: Demographics
    (
      <motion.div key="demographics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
        <SelectField label="Community / Category" value={form.community ?? ''} onChange={(v) => updateField('community', v || null)} options={COMMUNITIES} />
        <SelectField label="Gender" value={form.gender ?? ''} onChange={(v) => updateField('gender', v || null)} options={GENDERS} />
      </motion.div>
    ),
    // Step 3: Financial
    (
      <motion.div key="financial" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
        <InputField label="Annual Family Income (₹)" type="number" value={form.annual_family_income ?? ''} onChange={(v) => updateField('annual_family_income', v ? parseFloat(v) : null)} placeholder="e.g. 250000" />
        <InputField label="Parent Occupation" value={form.parent_occupation ?? ''} onChange={(v) => updateField('parent_occupation', v || null)} placeholder="e.g. Farmer, Teacher, Business" />
      </motion.div>
    ),
    // Step 4: Institution
    (
      <motion.div key="institution" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
        <InputField label="Institution Name" value={form.institution_name ?? ''} onChange={(v) => updateField('institution_name', v || null)} placeholder={['class_10', 'class_12'].includes(form.academic_stage) ? "e.g. Delhi Public School" : "e.g. Anna University"} />
        <InputField label={['class_10', 'class_12'].includes(form.academic_stage) ? "Board" : "University"} value={form.university ?? ''} onChange={(v) => updateField('university', v || null)} placeholder={['class_10', 'class_12'].includes(form.academic_stage) ? "e.g. CBSE or State Board" : "e.g. Anna University"} />
        <SelectField label="Institution Type" value={form.institution_type ?? ''} onChange={(v) => updateField('institution_type', v || null)} options={[{ value: 'government', label: 'Government' }, { value: 'private', label: 'Private' }, { value: 'aided', label: 'Government Aided' }]} />
      </motion.div>
    ),
    // Step 5: Status
    (
      <motion.div key="status" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
        <ToggleField label="Disability Status" value={form.has_disability} onChange={(v) => updateField('has_disability', v)} description="Do you have any physical disability?" />
        <ToggleField label="First Graduate" value={form.is_first_graduate} onChange={(v) => updateField('is_first_graduate', v)} description="Are you the first in your family to pursue higher education?" />
        <ToggleField label="Hosteller" value={form.is_hosteller} onChange={(v) => updateField('is_hosteller', v)} description="Are you currently staying in a hostel?" />
        <ToggleField label="Government Institution" value={form.is_government_institution} onChange={(v) => updateField('is_government_institution', v)} description="Do you study in a government institution?" />
        <ToggleField label="Orphan Status" value={form.is_orphan} onChange={(v) => updateField('is_orphan', v)} description="Are you an orphan?" />
        <ToggleField label="Single Girl Child" value={form.is_single_girl_child} onChange={(v) => updateField('is_single_girl_child', v)} description="Are you a single girl child?" />
        <ToggleField label="Minority Status" value={form.is_minority} onChange={(v) => updateField('is_minority', v)} description="Do you belong to a minority community?" />
      </motion.div>
    ),
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-6">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <button onClick={() => navigate('/scholarships')} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {isEditing ? 'Update' : 'Complete'} Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">Help our AI engine find the perfect scholarships for you</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-background rounded-full z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500 ease-in-out" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}></div>
          
          <div className="flex justify-between relative z-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setStep(i)}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${i === step ? 'bg-primary text-primary-foreground scale-110' : i < step ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-card border border-border text-muted-foreground'}`}>
                  {i < step ? <CheckCircle2 className="w-6 h-6" /> : s.icon}
                </div>
                <span className={`text-xs font-medium hidden md:block ${i === step ? 'text-foreground' : i < step ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card border-border shadow-sm p-6 md:p-10 border-border relative">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              {STEPS[step].icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{STEPS[step].label} Details</h2>
              <p className="text-sm text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {stepContent[step]}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="bg-background/50 border-border text-foreground w-32"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-32"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Profile' : 'Save Profile'}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
