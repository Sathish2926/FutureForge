import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Briefcase, GraduationCap, Calendar, Edit3, Save, X, Globe, BookOpen, UserCircle, Building2 } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { fetchUserProfile, updateUserProfile } from '../../services/profile';
import type { UserProfile } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/toast';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export function ProfilePage() {
  const { toast } = useToast();
  const user = auth.currentUser;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchUserProfile();
        setProfile(p);
        setFormData(p);
      } catch {
        // Init empty form data if not exists
        setFormData({});
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const p = await updateUserProfile(formData);
      setProfile(p);
      setFormData(p);
      setIsEditing(false);
      toast("Profile updated successfully.", "success");
    } catch (err: any) {
      const errMsg = err.response?.data?.detail || "Failed to update profile.";
      toast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile && !isEditing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto pb-20">
      <motion.div {...fadeUp} className="glass-card border-border shadow-sm bg-gradient-to-br from-primary/5 via-card to-secondary/10 border-border relative overflow-hidden mb-8">
        <div className="absolute right-0 top-0 w-60 h-60 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
              {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{user?.displayName || 'User'}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="bg-background/50 border-border hover:bg-muted text-foreground shrink-0 shadow-sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <div className="glass-card border-border shadow-sm relative border-border">
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<UserCircle />} label="Full Name" value={user?.displayName || 'Not provided'} />
                <InfoItem icon={<Calendar />} label="Date of Birth" value={profile?.dob || 'Not provided'} />
                <InfoItem icon={<User />} label="Gender" value={profile?.gender || 'Not provided'} />
                <InfoItem icon={<MapPin />} label="Location" value={profile?.location || 'Not provided'} />
                <InfoItem icon={<Globe />} label="Preferred Language" value={profile?.languages?.[0] || 'English'} />
              </div>

              <h3 className="text-xl font-bold text-foreground mt-10 mb-6 border-b border-border pb-4">Academic & Career</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<GraduationCap />} label="Education Level" value={profile?.education_level || 'Not provided'} />
                <InfoItem icon={<Building2 />} label="Institution" value={profile?.institution || 'Not provided'} />
                <InfoItem icon={<Briefcase />} label="Occupation" value={profile?.occupation || 'Not provided'} />
                <InfoItem icon={<BookOpen />} label="Career Goal" value={profile?.career_goal || 'Not provided'} />
              </div>
              <h3 className="text-xl font-bold text-foreground mt-10 mb-6 border-b border-border pb-4">Financial Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<UserCircle />} label="Family Income Range" value={profile?.family_income?.toString() || 'Not provided'} />
                <InfoItem icon={<UserCircle />} label="Budget" value={profile?.budget?.toString() || 'Not provided'} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
               <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4">Edit Profile</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth (Locked from Signup)</label>
                    <Input type="date" name="dob" value={formData.dob || ''} disabled className="bg-muted border-border text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Gender (Locked from Signup)</label>
                    <select name="gender" value={formData.gender || ''} disabled className="w-full h-10 px-3 py-2 rounded-md bg-muted border border-border text-muted-foreground">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Location (City, State)</label>
                    <Input name="location" value={formData.location || ''} onChange={handleChange} placeholder="e.g. Chennai, Tamil Nadu" className="bg-background border-border text-foreground focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Preferred Language (Locked from Signup)</label>
                    <select name="languages" value={formData.languages?.[0] || 'English'} disabled className="w-full h-10 px-3 py-2 rounded-md bg-muted border border-border text-muted-foreground">
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Malayalam">Malayalam</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Education Level (Locked from Signup)</label>
                    <select name="education_level" value={formData.education_level || ''} disabled className="w-full h-10 px-3 py-2 rounded-md bg-muted border border-border text-muted-foreground">
                      <option value="">Select Level</option>
                      <option value="10th">10th Standard</option>
                      <option value="12th">12th Standard</option>
                      <option value="UG">Undergraduate (UG)</option>
                      <option value="PG">Postgraduate (PG)</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Institution / Company</label>
                    <Input name="institution" value={formData.institution || ''} onChange={handleChange} placeholder="Name" className="bg-background border-border text-foreground focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Occupation (Locked from Signup)</label>
                    <Input name="occupation" value={formData.occupation || ''} disabled className="bg-muted border-border text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Career Goal (Locked from Signup)</label>
                    <Input name="career_goal" value={formData.career_goal || ''} disabled className="bg-muted border-border text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Family Income Range (Locked from Signup)</label>
                    <select name="family_income" value={formData.family_income || ''} disabled className="w-full h-10 px-3 py-2 rounded-md bg-muted border border-border text-muted-foreground">
                      <option value="">Select Range</option>
                      <option value="100000">Below 2 Lakhs</option>
                      <option value="300000">2-5 Lakhs</option>
                      <option value="700000">5-10 Lakhs</option>
                      <option value="1500000">Above 10 Lakhs</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Budget for Education/Courses</label>
                    <Input name="budget" type="number" value={formData.budget || ''} onChange={handleChange} placeholder="Budget in Rs." className="bg-background border-border text-foreground focus:border-primary" />
                  </div>
               </div>
               
               <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                 <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground hover:bg-muted" disabled={loading}>
                   <X className="w-4 h-4 mr-2" /> Cancel
                 </Button>
                 <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" disabled={loading}>
                   {loading ? (
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                   ) : (
                     <Save className="w-4 h-4 mr-2" />
                   )}
                   Save Changes
                 </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-bold text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
