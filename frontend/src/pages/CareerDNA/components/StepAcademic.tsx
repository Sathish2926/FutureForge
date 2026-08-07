import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft, GraduationCap, Briefcase, School } from 'lucide-react';
import { cn } from '../../../lib/utils';

const BOARDS = ['CBSE', 'State Board', 'ICSE', 'IB', 'NIOS', 'Other'];
const STREAMS_12 = ['Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce', 'Arts / Humanities', 'Vocational'];
const SALARY_RANGES = ['0-5 LPA', '5-10 LPA', '10-20 LPA', '20-40 LPA', '40+ LPA'];

export default function StepAcademic({ userType, initialData, onNext, onBack }: { userType: string, initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [formData, setFormData] = useState<any>(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectValue = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const isSchool = userType?.includes('10th') || userType?.includes('11th') || userType?.includes('12th');
  const isCollege = userType?.includes('Undergraduate') || userType?.includes('Postgraduate') || userType?.includes('Diploma');
  const isProfessional = userType?.includes('Professional') || userType?.includes('Job Seeker') || userType?.includes('Switcher');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onNext(formData);
    if (e.key === 'Escape') onBack();
  };

  const SectionIcon = isSchool ? School : isCollege ? GraduationCap : Briefcase;
  const sectionTitle = isSchool ? 'School Details' : isCollege ? 'College Profile' : 'Professional Profile';

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#2D305A]/10 to-[#E2E2FA]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#2D305A]/20">
          <SectionIcon className="w-7 h-7 text-[#2D305A]" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{sectionTitle}</h2>
        <p className="text-muted-foreground">Tell us about your current academic or career status.</p>
      </div>

      <div className="space-y-6 mb-10">
        {isSchool && (
          <>
            {/* Board Selection */}
            <div className="bg-background border border-border rounded-xl p-5">
              <label className="text-sm font-semibold text-foreground mb-3 block">Education Board</label>
              <div className="flex flex-wrap gap-2">
                {BOARDS.map(board => (
                  <button
                    key={board}
                    onClick={() => selectValue('board', board)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all',
                      formData.board === board
                        ? 'bg-[#2D305A]/10 border-[#2D305A] text-[#2D305A] shadow-sm'
                        : 'bg-white/50 border-border text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {board}
                  </button>
                ))}
              </div>
            </div>

            {/* Stream for 12th & 11th */}
            {(userType?.includes('12th') || userType?.includes('11th')) && (
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-3 block">Stream</label>
                <div className="flex flex-wrap gap-2">
                  {STREAMS_12.map(stream => (
                    <button
                      key={stream}
                      onClick={() => selectValue('stream', stream)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all',
                        formData.stream === stream
                          ? 'bg-[#2D305A]/10 border-[#2D305A] text-[#2D305A] shadow-sm'
                          : 'bg-white/50 border-border text-muted-foreground hover:bg-muted'
                      )}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Dream Course / Stream</label>
                <Input name="dream_stream" value={formData.dream_stream || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. Computer Science" />
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Target Entrance Exam</label>
                <Input name="entrance_exam" value={formData.entrance_exam || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. JEE, NEET (optional)" />
              </div>
            </div>
          </>
        )}

        {isCollege && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Degree</label>
                <Input name="degree" value={formData.degree || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. B.Tech, B.Sc, BCA" />
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Department / Major</label>
                <Input name="department" value={formData.department || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. Computer Science" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Current CGPA</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0" max="10" step="0.1"
                    value={formData.cgpa || 0}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#2D305A]"
                  />
                  <span className="text-lg font-bold text-[#2D305A] min-w-[45px] text-right">
                    {formData.cgpa ? parseFloat(formData.cgpa).toFixed(1) : '0.0'}
                  </span>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Number of Internships</label>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, '4+'].map((num) => (
                    <button
                      key={String(num)}
                      onClick={() => setFormData({ ...formData, internships: typeof num === 'string' ? 4 : num })}
                      className={cn(
                        'w-12 h-12 rounded-xl border-2 font-bold transition-all',
                        (formData.internships === num || (num === '4+' && formData.internships >= 4))
                          ? 'bg-[#2D305A] text-white border-[#2D305A]'
                          : 'bg-white/50 border-border text-foreground hover:bg-muted'
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {isProfessional && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Industry</label>
                <Input name="industry" value={formData.industry || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. IT, Finance, Healthcare" />
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">Current Role</label>
                <Input name="current_role" value={formData.current_role || ''} onChange={handleChange} className="bg-white/60 border-border text-foreground" placeholder="e.g. Software Engineer" />
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5">
              <label className="text-sm font-semibold text-foreground mb-2 block">Years of Experience</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0" max="30" step="0.5"
                  value={formData.experience_years || 0}
                  onChange={(e) => setFormData({ ...formData, experience_years: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#2D305A]"
                />
                <span className="text-lg font-bold text-[#2D305A] min-w-[55px] text-right">
                  {formData.experience_years ? parseFloat(formData.experience_years).toFixed(1) : '0'} yr
                </span>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5">
              <label className="text-sm font-semibold text-foreground mb-3 block">Current Salary Range</label>
              <div className="flex flex-wrap gap-3">
                {SALARY_RANGES.map(range => (
                  <button
                    key={range}
                    onClick={() => selectValue('salary_range', range)}
                    className={cn(
                      'px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all',
                      formData.salary_range === range
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                        : 'bg-white/50 border-border text-foreground hover:bg-emerald-50/30'
                    )}
                  >
                    ₹{range}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => onNext(formData)} className="bg-[#2D305A] hover:bg-[#2D305A]/90 text-white shadow-md">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
