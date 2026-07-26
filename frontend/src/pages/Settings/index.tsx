import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Shield,
  Palette,
  User,
  Moon,
  Sun,
  Mail,
  Smartphone,
  Globe,
  Eye,
  Lock,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { Button } from '../../components/ui/button';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function SettingToggle({ label, description, enabled, onChange }: {
  label: string; description: string; enabled: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? 'bg-primary' : 'bg-slate-700'
        }`}
      >
        <div
          className={`absolute h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function SettingLink({ icon, label, description, onClick }: {
  icon: React.ReactNode; label: string; description: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 py-4 border-b border-border last:border-0 group hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-muted-foreground transition-colors" />
    </button>
  );
}

export function SettingsPage() {
  const user = auth.currentUser;
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto pb-20">
      <motion.div {...fadeUp}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Settings className="w-7 h-7 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account preferences and notification settings.</p>
        </div>

        {/* Account */}
        <div className="glass-card border-border shadow-sm mb-6">
          <h3 className="text-lg font-bold text-foreground mb-1 pb-4 border-b border-border flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Account
          </h3>
          <div className="py-4 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{user?.displayName || 'User'}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{user?.email}</div>
            </div>
            <Button variant="outline" size="sm" className="bg-background border-border text-muted-foreground hover:bg-muted">
              Edit
            </Button>
          </div>
          <SettingLink
            icon={<Lock className="w-5 h-5" />}
            label="Change Password"
            description="Update your account password"
          />
          <SettingLink
            icon={<Shield className="w-5 h-5" />}
            label="Two-Factor Authentication"
            description="Add an extra layer of security"
          />
        </div>

        {/* Notifications */}
        <div className="glass-card border-border shadow-sm mb-6">
          <h3 className="text-lg font-bold text-foreground mb-1 pb-4 border-b border-border flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            Notifications
          </h3>
          <SettingToggle
            label="Email Notifications"
            description="Receive scholarship updates via email"
            enabled={emailNotifs}
            onChange={setEmailNotifs}
          />
          <SettingToggle
            label="Push Notifications"
            description="Browser push notifications for new matches"
            enabled={pushNotifs}
            onChange={setPushNotifs}
          />
          <SettingToggle
            label="Deadline Alerts"
            description="Get notified before scholarship deadlines"
            enabled={deadlineAlerts}
            onChange={setDeadlineAlerts}
          />
          <SettingToggle
            label="Weekly Digest"
            description="Receive a weekly summary of new scholarships"
            enabled={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </div>

        {/* Appearance */}
        <div className="glass-card border-border shadow-sm mb-6">
          <h3 className="text-lg font-bold text-foreground mb-1 pb-4 border-b border-border flex items-center gap-2">
            <Palette className="w-5 h-5 text-secondary" />
            Appearance
          </h3>
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <div>
                <div className="text-sm font-medium text-foreground">Dark Mode</div>
                <div className="text-xs text-muted-foreground mt-0.5">Toggle dark/light theme</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-primary' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <SettingLink
            icon={<Globe className="w-5 h-5" />}
            label="Language"
            description="English (India)"
          />
        </div>

        {/* Privacy */}
        <div className="glass-card border-border shadow-sm mb-6">
          <h3 className="text-lg font-bold text-foreground mb-1 pb-4 border-b border-border flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-500" />
            Privacy
          </h3>
          <SettingLink
            icon={<Eye className="w-5 h-5" />}
            label="Profile Visibility"
            description="Control who can see your profile information"
          />
          <SettingLink
            icon={<Shield className="w-5 h-5" />}
            label="Data & Privacy"
            description="Download or delete your data"
          />
        </div>

        {/* Danger Zone */}
        <div className="glass-card border-border shadow-sm border-destructive/20 bg-destructive/5">
          <h3 className="text-lg font-bold text-foreground mb-1 pb-4 border-b border-destructive/10 flex items-center gap-2">
            <Shield className="w-5 h-5 text-destructive" />
            Danger Zone
          </h3>
          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Delete Account</div>
              <div className="text-xs text-muted-foreground mt-0.5">Permanently delete your account and all data</div>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
