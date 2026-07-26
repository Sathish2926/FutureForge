import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepAcademic({ userType, initialData, onNext, onBack }: { userType: string, initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [formData, setFormData] = useState<any>(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to determine what to show
  const isSchool = userType?.includes('10th') || userType?.includes('11th') || userType?.includes('12th');
  const isCollege = userType?.includes('Undergraduate') || userType?.includes('Postgraduate') || userType?.includes('Diploma');
  const isProfessional = userType?.includes('Professional') || userType?.includes('Job Seeker') || userType?.includes('Switcher');

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Academic & Career Profile</h2>
      <p className="text-muted-foreground text-center mb-8">Tell us about your current status.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {isSchool && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Board</label>
              <select name="board" value={formData.board || ''} onChange={handleChange} className="w-full h-10 px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {userType?.includes('12th') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Stream</label>
                <select name="stream" value={formData.stream || ''} onChange={handleChange} className="w-full h-10 px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Stream</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Science (PCB)">Science (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Dream Stream / Course</label>
              <Input name="dream_stream" value={formData.dream_stream || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Target Entrance Exam</label>
              <Input name="entrance_exam" value={formData.entrance_exam || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. JEE, NEET (optional)" />
            </div>
          </>
        )}

        {isCollege && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Degree</label>
              <Input name="degree" value={formData.degree || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. B.Tech, B.Sc" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Department / Major</label>
              <Input name="department" value={formData.department || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Current CGPA</label>
              <Input type="number" step="0.1" name="cgpa" value={formData.cgpa || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="Out of 10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Number of Internships</label>
              <Input type="number" name="internships" value={formData.internships || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. 2" />
            </div>
          </>
        )}

        {isProfessional && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Industry</label>
              <Input name="industry" value={formData.industry || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. IT, Finance, Healthcare" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Current Role</label>
              <Input name="current_role" value={formData.current_role || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. Software Engineer" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
              <Input type="number" step="0.5" name="experience_years" value={formData.experience_years || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. 3.5" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Salary Range</label>
              <select name="salary_range" value={formData.salary_range || ''} onChange={handleChange} className="w-full h-10 px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select Range</option>
                <option value="0-5 LPA">0 - 5 LPA</option>
                <option value="5-10 LPA">5 - 10 LPA</option>
                <option value="10-20 LPA">10 - 20 LPA</option>
                <option value="20+ LPA">20+ LPA</option>
              </select>
            </div>
          </>
        )}
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => onNext(formData)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
