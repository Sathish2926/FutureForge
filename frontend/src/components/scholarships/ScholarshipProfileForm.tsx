import { useState } from "react";
import { 
  GraduationCap, MapPin, IndianRupee, Sparkles, 
  CheckCircle2, ArrowRight, ArrowLeft, Save, AlertCircle, Info,
  BookOpen, Award, Check, Edit3, ShieldAlert
} from "lucide-react";

interface ProfileFormProps {
  initialData: any;
  initialStep?: number;
  onSave: (data: any) => Promise<void>;
  onComplete: () => void;
}

const COURSE_SUGGESTIONS: Record<string, string[]> = {
  "Class 10": [
    "State Board SSLC (Tamil Nadu)",
    "CBSE Class 10 Secondary",
    "ICSE Class 10",
    "Matriculation 10th",
    "Other Secondary Board"
  ],
  "Class 11": [
    "Higher Secondary 1st Year (Physics, Chemistry, Maths, Biology)",
    "Higher Secondary 1st Year (Physics, Chemistry, Maths, Computer)",
    "Higher Secondary 1st Year (Commerce, Accountancy, Economics)",
    "Higher Secondary 1st Year (Arts & Humanities)",
    "Vocational Stream 11th"
  ],
  "Class 12": [
    "Higher Secondary HSC (Science - PCM)",
    "Higher Secondary HSC (Science - PCB)",
    "Higher Secondary HSC (Commerce & Accountancy)",
    "Higher Secondary HSC (Arts & Humanities)",
    "Vocational Stream 12th"
  ],
  "Diploma": [
    "Diploma in Computer Engineering",
    "Diploma in Mechanical Engineering",
    "Diploma in Electrical & Electronics Engineering",
    "Diploma in Civil Engineering",
    "Diploma in Electronics & Communication",
    "Diploma in Pharmacy (D.Pharm)",
    "ITI Fitter",
    "ITI Electrician",
    "Other Technical Diploma"
  ],
  "Undergraduate": [
    "B.Tech / B.E Computer Science & Engineering",
    "B.Tech / B.E Artificial Intelligence & Data Science",
    "B.Tech / B.E Electronics & Communication",
    "B.Tech / B.E Mechanical Engineering",
    "B.Tech / B.E Civil Engineering",
    "B.Sc Physics",
    "B.Sc Chemistry",
    "B.Sc Mathematics",
    "B.Sc Computer Science / IT",
    "B.Sc Biotechnology",
    "B.Sc Agriculture",
    "B.Com (General / Corporate)",
    "B.A English / Economics / History",
    "BBA (Bachelor of Business Administration)",
    "BCA (Bachelor of Computer Applications)",
    "MBBS (Medicine)",
    "BDS (Dental)",
    "B.Pharm (Pharmacy)",
    "B.Arch (Architecture)",
    "Law (B.A LL.B / BBA LL.B)"
  ],
  "Postgraduate": [
    "M.Tech / M.E Computer Science",
    "M.Tech / M.E VLSI & Embedded Systems",
    "M.Sc Physics / Chemistry / Mathematics",
    "M.Sc Data Science & AI",
    "M.Com (Master of Commerce)",
    "M.A Economics / English",
    "MBA (Master of Business Administration)",
    "MCA (Master of Computer Applications)",
    "MD / MS (Medical PG)",
    "M.Pharm (Master of Pharmacy)"
  ],
  "PhD / Research": [
    "Ph.D in Engineering & Technology",
    "Ph.D in Basic & Natural Sciences",
    "Ph.D in Arts, Humanities & Social Sciences",
    "Ph.D in Management & Business Studies",
    "Postdoctoral Research Fellowship"
  ],
  "Other": [
    "Professional Certificate Course",
    "Vocational Skill Diploma",
    "Chartered Accountancy (CA Foundation/Inter)",
    "Other Specialized Course"
  ]
};

const INDIAN_STATES = [
  "Tamil Nadu", "Andhra Pradesh", "Karnataka", "Kerala", "Telangana",
  "Maharashtra", "Delhi", "Uttar Pradesh", "West Bengal", "Gujarat",
  "Rajasthan", "Madhya Pradesh", "Bihar", "Punjab", "Haryana",
  "Odisha", "Assam", "Jharkhand", "Chhattisgarh", "Uttarakhand",
  "Himachal Pradesh", "Jammu and Kashmir", "Goa", "Puducherry", "Other State"
];

const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

export default function ScholarshipProfileForm({ initialData, initialStep = 1, onSave, onComplete }: ProfileFormProps) {
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState<any>(() => ({
    education_level: "Undergraduate",
    course_name: "",
    stream: "Engineering & Technology",
    year_of_study: "1st Year",
    previous_qualification: "Class 12",
    grading_system: "percentage",
    previous_marks_percent: null,
    previous_cgpa: null,
    passing_year: 2025,
    institution_name: "",
    institution_type: "government",
    study_mode: "full-time",
    academic_year_needed: "2026-27",
    admission_status: "confirmed",
    country: "India",
    state: "Tamil Nadu",
    current_study_state: "Tamil Nadu",
    permanent_state: "Tamil Nadu",
    domicile_state: "Tamil Nadu",
    district: "Chennai",
    has_domicile_certificate: true,
    social_category: "General",
    has_community_certificate: true,
    annual_family_income: null,
    has_income_certificate: true,
    income_certificate_valid: true,
    gender: "female",
    has_disability: false,
    disability_percentage: null,
    has_disability_certificate: false,
    is_first_generation_graduate: false,
    is_single_girl_child: false,
    is_orphan_or_single_parent: false,
    is_hosteller: false,
    is_ex_servicemen_family: false,
    studied_govt_school_tn: false,
    sports_cultural_quota: false,
    entrance_exam_qualified: "",
    academic_achievements: "",
    has_completed_onboarding: true,
    ...(initialData || {})
  }));

  const [courseSearch, setCourseSearch] = useState("");
  const [showCustomCourse, setShowCustomCourse] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Convert CGPA preview
  const getConvertedPercentage = () => {
    if (formData.grading_system === "percentage") {
      return formData.previous_marks_percent ? `${formData.previous_marks_percent}%` : "Not entered";
    }
    if (formData.grading_system === "cgpa_10" && formData.previous_cgpa) {
      const calc = (parseFloat(formData.previous_cgpa) * 9.5).toFixed(1);
      return `${formData.previous_cgpa}/10.0 CGPA (AICTE conversion: ${calc}%)`;
    }
    if (formData.grading_system === "cgpa_4" && formData.previous_cgpa) {
      const calc = (parseFloat(formData.previous_cgpa) * 25.0).toFixed(1);
      return `${formData.previous_cgpa}/4.0 CGPA (US conversion: ${calc}%)`;
    }
    return "Not entered";
  };

  const validateCurrentStep = (targetStep: number): boolean => {
    const errors: string[] = [];
    if (targetStep === 1) {
      if (!formData.education_level) errors.push("Please select your current education level.");
    } else if (targetStep === 2) {
      if (formData.grading_system === "percentage") {
        if (formData.previous_marks_percent !== null && formData.previous_marks_percent !== undefined) {
          const val = parseFloat(formData.previous_marks_percent);
          if (isNaN(val) || val < 0 || val > 100) {
            errors.push("Percentage must be a valid number between 0% and 100%.");
          }
        }
      } else if (formData.grading_system === "cgpa_10") {
        if (formData.previous_cgpa !== null && formData.previous_cgpa !== undefined) {
          const val = parseFloat(formData.previous_cgpa);
          if (isNaN(val) || val < 0 || val > 10) {
            errors.push("10-Point CGPA must be between 0.0 and 10.0.");
          }
        }
      } else if (formData.grading_system === "cgpa_4") {
        if (formData.previous_cgpa !== null && formData.previous_cgpa !== undefined) {
          const val = parseFloat(formData.previous_cgpa);
          if (isNaN(val) || val < 0 || val > 4) {
            errors.push("4-Point CGPA must be between 0.0 and 4.0.");
          }
        }
      }
    } else if (targetStep === 3) {
      if (formData.annual_family_income !== null && formData.annual_family_income !== undefined) {
        const inc = parseFloat(formData.annual_family_income);
        if (isNaN(inc) || inc < 0) {
          errors.push("Annual family income cannot be negative.");
        }
      }
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = async () => {
    if (!validateCurrentStep(step)) return;

    if (step < 6) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Final submission from Step 6 Review
      setSaving(true);
      try {
        const payloadToSave = {
          ...formData,
          has_completed_onboarding: true
        };
        await onSave(payloadToSave);
        setSavedSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const currentLevel = formData.education_level || "Undergraduate";
  const availableCourses = (COURSE_SUGGESTIONS[currentLevel] || []).filter(c => 
    c.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
      {/* Step Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-brand-50/20 to-slate-50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
              Step {step} of 6 • Guided Profile Discovery
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading mt-2">
              {step === 1 && "Step 1: Education Profile"}
              {step === 2 && "Step 2: Academic Details"}
              {step === 3 && "Step 3: Financial Details"}
              {step === 4 && "Step 4: Location & Domicile"}
              {step === 5 && "Step 5: Conditional Eligibility Questions"}
              {step === 6 && "Step 6: Review & Confirmation"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {step === 1 && "Specify your current level, qualification, stream, and institution details."}
              {step === 2 && "Record your previous marks, grading system, and entrance exam credentials."}
              {step === 3 && "Government means-tested criteria. Used only for official cutoff thresholds."}
              {step === 4 && "Nativity and domicile state determine state-specific vs All-India eligibility."}
              {step === 5 && "Optional criteria for targeted welfare (First-Graduate, TN Govt School, PWD, etc.)."}
              {step === 6 && "Verify your profile details before invoking the deterministic recommendation engine."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving}
            className="btn-secondary text-xs py-2 px-4 self-start md:self-auto flex items-center gap-2 shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Saving..." : savedSuccess ? "Draft Saved!" : "Save Draft"}
          </button>
        </div>

        {/* Stepper Progress Bar (6 Steps) */}
        <div className="grid grid-cols-6 gap-1.5 md:gap-2">
          {[
            { id: 1, label: "Education", icon: GraduationCap },
            { id: 2, label: "Academic", icon: BookOpen },
            { id: 3, label: "Financial", icon: IndianRupee },
            { id: 4, label: "Location", icon: MapPin },
            { id: 5, label: "Conditional", icon: Sparkles },
            { id: 6, label: "Review", icon: CheckCircle2 },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (validateCurrentStep(step)) setStep(item.id);
              }}
              className={`flex items-center justify-center sm:justify-start gap-1.5 p-2 rounded-xl transition text-left ${
                step === item.id
                  ? "bg-brand-600 text-white shadow-sm font-semibold"
                  : step > item.id
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="text-xs hidden md:inline truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Validation alert if any */}
      {validationErrors.length > 0 && (
        <div className="mx-6 md:mx-8 mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <span className="font-bold">Please check the following before continuing:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Step Contents */}
      <div className="p-6 md:p-8 space-y-6">

        {/* ============================================================= */}
        {/* STEP 1: EDUCATION DETAILS                                     */}
        {/* ============================================================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Current Education Level <span className="text-rose-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.education_level || "Undergraduate"}
                  onChange={(e) => {
                    updateField("education_level", e.target.value);
                    setCourseSearch("");
                    setShowCustomCourse(false);
                  }}
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Diploma">Diploma / ITI</option>
                  <option value="Undergraduate">Undergraduate (UG Degree)</option>
                  <option value="Postgraduate">Postgraduate (PG Degree)</option>
                  <option value="PhD / Research">PhD / Research</option>
                  <option value="Other">Other</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Select your current enrolled stage or the level for which you seek funding.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Stream or Discipline
                </label>
                <select
                  className="input-field"
                  value={formData.stream || "Engineering & Technology"}
                  onChange={(e) => updateField("stream", e.target.value)}
                >
                  <option value="Engineering & Technology">Engineering & Technology</option>
                  <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                  <option value="Basic & Natural Sciences">Basic & Natural Sciences (Physics, Chemistry, Maths, Bio)</option>
                  <option value="Arts, Humanities & Social Sciences">Arts, Humanities & Social Sciences</option>
                  <option value="Commerce & Management">Commerce & Management</option>
                  <option value="Law & Legal Studies">Law & Legal Studies</option>
                  <option value="Agriculture & Veterinary">Agriculture & Veterinary</option>
                  <option value="School Education">School Education (Science/Arts/Commerce)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Course Selection (Dependent on Education Level) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Current Course / Qualification <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowCustomCourse(!showCustomCourse)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-semibold"
                >
                  {showCustomCourse ? "Choose from standard list" : "Enter other course name"}
                </button>
              </div>

              {!showCustomCourse ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Search courses or pick below..."
                    className="input-field text-sm"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />
                  <div className="max-h-44 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-white space-y-1">
                    {availableCourses.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => updateField("course_name", c)}
                        className={`w-full text-left text-xs p-2 rounded-lg transition flex items-center justify-between ${
                          formData.course_name === c
                            ? "bg-brand-50 text-brand-700 font-bold border border-brand-200"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{c}</span>
                        {formData.course_name === c && <Check className="w-3.5 h-3.5 text-brand-600" />}
                      </button>
                    ))}
                    {availableCourses.length === 0 && (
                      <div className="text-xs text-slate-400 p-2">
                        No match found. Click "Enter other course name" above.
                      </div>
                    )}
                  </div>
                  {formData.course_name && (
                    <div className="text-xs text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      Selected: <strong>{formData.course_name}</strong>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. B.Tech Artificial Intelligence, B.Sc Forensic Science..."
                    value={formData.course_name || ""}
                    onChange={(e) => updateField("course_name", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Current Year of Study
                </label>
                <select
                  className="input-field"
                  value={formData.year_of_study || "1st Year"}
                  onChange={(e) => updateField("year_of_study", e.target.value)}
                >
                  <option value="1st Year">1st Year / Fresh Admission</option>
                  <option value="2nd Year">2nd Year / Lateral Entry</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Academic Year Needed
                </label>
                <select
                  className="input-field"
                  value={formData.academic_year_needed || "2026-27"}
                  onChange={(e) => updateField("academic_year_needed", e.target.value)}
                >
                  <option value="2026-27">2026-27 (Upcoming / Active Cycle)</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Admission Status
                </label>
                <select
                  className="input-field"
                  value={formData.admission_status || "confirmed"}
                  onChange={(e) => updateField("admission_status", e.target.value)}
                >
                  <option value="confirmed">Confirmed Admission</option>
                  <option value="seeking_admission">Seeking Admission / Counseling</option>
                  <option value="lateral_entry">Lateral Entry Admission</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Institution Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Anna University, Madras Medical College, IIT Madras"
                  value={formData.institution_name || ""}
                  onChange={(e) => updateField("institution_name", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Institution Type
                </label>
                <select
                  className="input-field"
                  value={formData.institution_type || "government"}
                  onChange={(e) => updateField("institution_type", e.target.value)}
                >
                  <option value="government">Government Institution / University</option>
                  <option value="government-aided">Government-Aided College</option>
                  <option value="private">Private / Self-Financing College</option>
                  <option value="other">Other Recognized Body</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Study Mode
                </label>
                <select
                  className="input-field"
                  value={formData.study_mode || "full-time"}
                  onChange={(e) => updateField("study_mode", e.target.value)}
                >
                  <option value="full-time">Full-time Regular</option>
                  <option value="part-time">Part-time</option>
                  <option value="distance">Distance / Correspondence</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 2: ACADEMIC DETAILS                                      */}
        {/* ============================================================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-start gap-3 text-xs text-brand-900">
              <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong>Grading System Support:</strong> Academic merit criteria in India compare marks either by 
                percentage or official conversion formulas. When CGPA is entered, FutureForge utilizes the standard 
                AICTE conversion factor (10.0 scale × 9.5) to reliably determine threshold eligibility.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Latest Completed Qualification <span className="text-rose-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.previous_qualification || "Class 12"}
                  onChange={(e) => updateField("previous_qualification", e.target.value)}
                >
                  <option value="Class 10">Class 10 (SSLC / Matriculation)</option>
                  <option value="Class 12">Class 12 (Higher Secondary / HSC)</option>
                  <option value="Diploma">Diploma / Polytechnic</option>
                  <option value="Undergraduate">Undergraduate Degree</option>
                  <option value="Postgraduate">Postgraduate Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Passing Year
                </label>
                <select
                  className="input-field"
                  value={formData.passing_year || 2025}
                  onChange={(e) => updateField("passing_year", parseInt(e.target.value))}
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grading System Selector */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Grading System <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "percentage", label: "Percentage (%)", desc: "e.g. 84.5%" },
                  { id: "cgpa_10", label: "10-Point CGPA", desc: "e.g. 8.8 / 10.0" },
                  { id: "cgpa_4", label: "4-Point CGPA", desc: "e.g. 3.6 / 4.0" },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => updateField("grading_system", g.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      formData.grading_system === g.id
                        ? "border-brand-500 bg-brand-50/70 text-brand-900 font-semibold ring-1 ring-brand-500"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold">{g.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>

              {formData.grading_system === "percentage" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Academic Marks Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    className="input-field"
                    placeholder="e.g. 82.5"
                    value={formData.previous_marks_percent !== null && formData.previous_marks_percent !== undefined ? formData.previous_marks_percent : ""}
                    onChange={(e) => updateField("previous_marks_percent", e.target.value ? parseFloat(e.target.value) : null)}
                  />
                </div>
              )}

              {formData.grading_system !== "percentage" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Cumulative Grade Point Average (CGPA)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={formData.grading_system === "cgpa_10" ? "10" : "4"}
                    className="input-field"
                    placeholder={formData.grading_system === "cgpa_10" ? "e.g. 8.65" : "e.g. 3.50"}
                    value={formData.previous_cgpa !== null && formData.previous_cgpa !== undefined ? formData.previous_cgpa : ""}
                    onChange={(e) => updateField("previous_cgpa", e.target.value ? parseFloat(e.target.value) : null)}
                  />
                  <div className="text-xs text-brand-700 bg-brand-50 p-2.5 rounded-xl border border-brand-100 mt-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span>Normalized Equivalency: <strong>{getConvertedPercentage()}</strong></span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Entrance Examinations Qualified (Optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. JEE Main, NEET UG, NMMS, GATE, TNEA"
                  value={formData.entrance_exam_qualified || ""}
                  onChange={(e) => updateField("entrance_exam_qualified", e.target.value)}
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Required for merit-cum-means or entrance-linked scholarships.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Academic Achievements & Board Ranks (Optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Top 1% in Class 12 State Board, District Topper"
                  value={formData.academic_achievements || ""}
                  onChange={(e) => updateField("academic_achievements", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 3: FINANCIAL DETAILS                                     */}
        {/* ============================================================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <IndianRupee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Means-Tested Transparency:</strong> Many government scholarships have statutory annual family 
                income ceilings (e.g. ₹2,50,000 for Post-Matric SC/ST; ₹8,00,000 for Central Sector / AICTE).
                We never ask for bank account numbers, passwords, or OTPs.
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Approximate Annual Family Income Range <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Below ₹1.0 Lakh", amount: 90000, desc: "Qualifies for highest welfare tiers" },
                  { label: "₹1.0L – ₹2.5 Lakhs", amount: 180000, desc: "Post-Matric & State welfare cutoff" },
                  { label: "₹2.5L – ₹4.5 Lakhs", amount: 350000, desc: "BC/MBC & Central Sector limit" },
                  { label: "₹4.5L – ₹8.0 Lakhs", amount: 600000, desc: "AICTE Pragati / EWS cutoff" },
                  { label: "Above ₹8.0 Lakhs", amount: 950000, desc: "Merit-only & Institutional grants" },
                  { label: "Prefer not to disclose", amount: null, desc: "Income-restricted schemes marked unknown" },
                ].map((item, idx) => {
                  const isSelected = item.amount === null 
                    ? formData.annual_family_income === null && formData.income_undisclosed
                    : formData.annual_family_income === item.amount;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (item.amount === null) {
                          updateField("annual_family_income", null);
                          updateField("income_undisclosed", true);
                        } else {
                          updateField("annual_family_income", item.amount);
                          updateField("income_undisclosed", false);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        isSelected
                          ? "border-brand-500 bg-brand-50 text-brand-900 font-bold ring-1 ring-brand-500"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Exact Annual Family Income (Optional INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    className="input-field pl-8"
                    placeholder="e.g. 180000"
                    value={formData.annual_family_income !== null && formData.annual_family_income !== undefined ? formData.annual_family_income : ""}
                    onChange={(e) => {
                      const val = e.target.value ? parseFloat(e.target.value) : null;
                      updateField("annual_family_income", val);
                      updateField("income_undisclosed", false);
                    }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Enables precise matching against published government order thresholds.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Income Certificate Availability
                </label>
                <select
                  className="input-field"
                  value={formData.has_income_certificate ? "yes" : "no"}
                  onChange={(e) => updateField("has_income_certificate", e.target.value === "yes")}
                >
                  <option value="yes">Yes, Revenue Authority Certificate Available / In Validity</option>
                  <option value="no">Pending / Not Yet Obtained</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 4: LOCATION AND DOMICILE                                 */}
        {/* ============================================================= */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong>Domicile Distinction:</strong> Your state of study is where your college is located, 
                whereas your <strong>Domicile / Nativity State</strong> is your permanent domicile. State welfare 
                grants (such as Tamil Nadu DCE scholarships) require permanent domicile or nativity status.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Domicile / Nativity State <span className="text-rose-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.domicile_state || "Tamil Nadu"}
                  onChange={(e) => updateField("domicile_state", e.target.value)}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Authorizes state-specific welfare and Directorate of Collegiate Education schemes.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Current State of Study <span className="text-rose-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.current_study_state || "Tamil Nadu"}
                  onChange={(e) => {
                    updateField("current_study_state", e.target.value);
                    updateField("state", e.target.value);
                  }}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  District (Home or Study)
                </label>
                {formData.domicile_state === "Tamil Nadu" ? (
                  <select
                    className="input-field"
                    value={formData.district || "Chennai"}
                    onChange={(e) => updateField("district", e.target.value)}
                  >
                    {TN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter district name"
                    value={formData.district || ""}
                    onChange={(e) => updateField("district", e.target.value)}
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Domicile / Nativity Certificate Availability
                </label>
                <select
                  className="input-field"
                  value={formData.has_domicile_certificate ? "yes" : "no"}
                  onChange={(e) => updateField("has_domicile_certificate", e.target.value === "yes")}
                >
                  <option value="yes">Yes, Domicile / Nativity Certificate Available</option>
                  <option value="no">Not Available / Can Obtain on Admission</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 5: CONDITIONAL ELIGIBILITY QUESTIONS                     */}
        {/* ============================================================= */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-brand-900 text-xs flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong>Targeted Welfare Inquiries:</strong> These questions unlock specialized government schemes 
                (such as Tamil Nadu's Pudhumai Penn, First-Generation Graduate fee concessions, AICTE Pragati, 
                and minority stipends). All fields are optional and treated confidentially.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Social Category / Community
                </label>
                <select
                  className="input-field"
                  value={formData.social_category || "General"}
                  onChange={(e) => updateField("social_category", e.target.value)}
                >
                  <option value="General">General / Open Category (OC)</option>
                  <option value="BC">Backward Class (BC) - Tamil Nadu & Central</option>
                  <option value="MBC / DNC">Most Backward Class / Denotified Community (MBC / DNC)</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                  <option value="Minority">Religious Minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Gender
                </label>
                <select
                  className="input-field"
                  value={formData.gender || "prefer_not_to_say"}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="female">Female (Matches Pudhumai Penn, AICTE Pragati, Single Girl Child)</option>
                  <option value="male">Male (Matches Tamil Pudhalvan, General, and Merit Schemes)</option>
                  <option value="transgender">Transgender (Qualifies for Special State Welfare)</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Tamil Nadu Govt School Flag (Critical for Pudhumai Penn & Tamil Pudhalvan) */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.studied_govt_school_tn || false}
                  onChange={(e) => updateField("studied_govt_school_tn", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-bold text-emerald-950 block">
                    Studied in Tamil Nadu Government School from Class 6 to 12
                  </span>
                  <span className="text-xs text-emerald-700 leading-relaxed block mt-0.5">
                    Unlocks Tamil Nadu Moovalur Ramamirtham Ammaiyar <strong>Pudhumai Penn</strong> scheme (₹1,000/month for female UG students) 
                    and <strong>Tamil Pudhalvan</strong> scheme (₹1,000/month for male UG students).
                  </span>
                </div>
              </label>
            </div>

            {/* Special Condition Checkboxes */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_first_generation_graduate || false}
                    onChange={(e) => updateField("is_first_generation_graduate", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">First-Generation Graduate</span>
                    <span className="text-[11px] text-slate-500 block">
                      First person in the direct family to pursue a university degree (qualifies for Tamil Nadu tuition concessions).
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_single_girl_child || false}
                    onChange={(e) => updateField("is_single_girl_child", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Single Girl Child</span>
                    <span className="text-[11px] text-slate-500 block">
                      Qualifies for UGC PG Indira Gandhi Single Girl Child fellowship and CBSE merit awards.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.has_disability || false}
                    onChange={(e) => updateField("has_disability", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Person with Benchmark Disability (PwD)</span>
                    <span className="text-[11px] text-slate-500 block">
                      Disability of 40% or more (qualifies for AICTE Saksham and National PwD scholarships).
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_orphan_or_single_parent || false}
                    onChange={(e) => updateField("is_orphan_or_single_parent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Orphan or Single-Parent Ward</span>
                    <span className="text-[11px] text-slate-500 block">
                      Qualifies for AICTE Swanath scheme and institutional emergency grants.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_hosteller || false}
                    onChange={(e) => updateField("is_hosteller", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Hostel Resident (Hosteller)</span>
                    <span className="text-[11px] text-slate-500 block">
                      Unlocks higher maintenance allowance brackets in post-matric schemes.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_ex_servicemen_family || false}
                    onChange={(e) => updateField("is_ex_servicemen_family", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Ward of Armed Forces / Ex-Servicemen</span>
                    <span className="text-[11px] text-slate-500 block">
                      Qualifies for Prime Minister’s Scholarship Scheme (PMSS) for CAPF & Assam Rifles.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 6: REVIEW PROFILE                                        */}
        {/* ============================================================= */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 text-brand-950 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong>Review Your Profile:</strong> Below is a summary of the facts that will be evaluated 
                against verified scholarship eligibility criteria. You can edit any individual section directly 
                before requesting recommendations.
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Card 1: Education */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-700">
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    1. Education Details
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Level:</span>
                    <span className="font-semibold text-slate-800">{formData.education_level || "Not set"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Course:</span>
                    <span className="font-semibold text-slate-800">{formData.course_name || "General"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Year of Study:</span>
                    <span className="font-semibold text-slate-800">{formData.year_of_study || "1st Year"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Institution:</span>
                    <span className="font-semibold text-slate-800 truncate block">{formData.institution_name || "Government"}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Academic */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-700">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    2. Academic Details
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Grading Score:</span>
                    <span className="font-semibold text-slate-800">{getConvertedPercentage()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Previous Exam:</span>
                    <span className="font-semibold text-slate-800">{formData.previous_qualification || "Class 12"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Passing Year:</span>
                    <span className="font-semibold text-slate-800">{formData.passing_year || 2025}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Entrance Exam:</span>
                    <span className="font-semibold text-slate-800">{formData.entrance_exam_qualified || "None"}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Financial */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-700">
                    <IndianRupee className="w-4 h-4 text-brand-600" />
                    3. Financial Details
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Family Income:</span>
                    <span className="font-semibold text-slate-800">
                      {formData.annual_family_income ? `₹${formData.annual_family_income.toLocaleString()}` : "Undisclosed"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Income Certificate:</span>
                    <span className="font-semibold text-slate-800">{formData.has_income_certificate ? "Available" : "Pending"}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Location */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-700">
                    <MapPin className="w-4 h-4 text-brand-600" />
                    4. Location & Domicile
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Domicile State:</span>
                    <span className="font-semibold text-slate-800">{formData.domicile_state || "Tamil Nadu"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Study State:</span>
                    <span className="font-semibold text-slate-800">{formData.current_study_state || "Tamil Nadu"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">District:</span>
                    <span className="font-semibold text-slate-800">{formData.district || "Chennai"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Certificate:</span>
                    <span className="font-semibold text-slate-800">{formData.has_domicile_certificate ? "Available" : "Pending"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Conditional Flags */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-700">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  5. Conditional & Welfare Criteria
                </div>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium">
                  Category: <strong>{formData.social_category || "General"}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium">
                  Gender: <strong>{formData.gender || "Not specified"}</strong>
                </span>
                {formData.studied_govt_school_tn && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                    ✓ TN Govt School (Class 6-12)
                  </span>
                )}
                {formData.is_first_generation_graduate && (
                  <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 border border-brand-200 font-bold">
                    ✓ First-Gen Graduate
                  </span>
                )}
                {formData.is_single_girl_child && (
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bold">
                    ✓ Single Girl Child
                  </span>
                )}
                {formData.has_disability && (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    ✓ PwD Benchmark
                  </span>
                )}
                {formData.is_hosteller && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-bold">
                    ✓ Hosteller
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {step === 6 ? "Edit My Details" : "Previous Step"}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {step === 6 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary text-xs py-3 px-5 w-full sm:w-auto"
              >
                Edit My Details
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={saving}
              className="btn-primary text-xs py-3 px-6 flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
            >
              {step < 6 ? (
                <>
                  <span>Next: {step === 1 ? "Academic Details" : step === 2 ? "Financial Details" : step === 3 ? "Location" : step === 4 ? "Conditional Criteria" : "Review Profile"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{saving ? "Evaluating Profile..." : "Find My Scholarships"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
