import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepConstraints({ initialData, onNext, onBack }: { initialData: any, onNext: (data: any) => void, onBack: () => void }) {
  const [formData, setFormData] = useState<any>(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass-card border-border shadow-sm py-10 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Constraints & Logistics</h2>
      <p className="text-muted-foreground text-center mb-8">This helps us filter out recommendations that won't work for you.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Preferred Location</label>
          <Input name="preferred_location" value={formData.preferred_location || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="e.g. Any, Bangalore, Remote" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Budget for Education/Courses</label>
          <Input type="number" name="budget" value={formData.budget || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="Total Budget in INR" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Annual Family Income</label>
          <Input type="number" name="family_income" value={formData.family_income || ''} onChange={handleChange} className="bg-background border-border text-foreground" placeholder="In INR (for Scholarships)" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Preferred Language</label>
          <select name="languages" value={formData.languages?.[0] || 'English'} onChange={(e) => setFormData({...formData, languages: [e.target.value]})} className="w-full h-10 px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
          </select>
        </div>
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
