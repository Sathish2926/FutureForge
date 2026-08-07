import { routePaths } from './routes';
import { LayoutDashboard, Compass, BookOpen, GraduationCap, Briefcase, Brain, Target, Award, Rocket, LineChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
};

export type OccupationConfig = {
  modules: string[];
  navItems: NavItem[];
  dashboardWidgets: string[];
};

export const OCCUPATION_CONFIG: Record<string, OccupationConfig> = {
  '10th': {
    modules: ['Dashboard', 'Career DNA', 'Streams', 'Scholarships', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Streams', path: routePaths.careerDetails, icon: Target }, // Placeholder for Streams module route if any
      { title: 'Scholarships', path: routePaths.scholarships, icon: Award },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'roadmap_progress', 'scholarships'],
  },
  '12th': {
    modules: ['Dashboard', 'Career DNA', 'College Recommendation', 'Scholarships', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'College Finder', path: routePaths.colleges, icon: GraduationCap },
      { title: 'Scholarships', path: routePaths.scholarships, icon: Award },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'top_career', 'college_match', 'scholarships', 'roadmap_progress'],
  },
  'UG': {
    modules: ['Dashboard', 'Career DNA', 'Career Recommendation', 'Colleges', 'Scholarships', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Careers', path: routePaths.recommendations, icon: Compass },
      { title: 'Higher Studies', path: routePaths.colleges, icon: GraduationCap },
      { title: 'Scholarships', path: routePaths.scholarships, icon: Award },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'top_career', 'skill_gap', 'roadmap_progress'],
  },
  'PG': {
    modules: ['Dashboard', 'Career DNA', 'Career Recommendation', 'Research', 'Scholarships', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Careers', path: routePaths.recommendations, icon: Compass },
      { title: 'Research / PhD', path: routePaths.colleges, icon: BookOpen },
      { title: 'Scholarships', path: routePaths.scholarships, icon: Award },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'top_career', 'roadmap_progress'],
  },
  'Diploma': {
    modules: ['Dashboard', 'Career DNA', 'Career Recommendation', 'Scholarships', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Careers', path: routePaths.recommendations, icon: Compass },
      { title: 'Scholarships', path: routePaths.scholarships, icon: Award },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'top_career', 'roadmap_progress'],
  },
  'Working Professional': {
    modules: ['Dashboard', 'Career DNA', 'Career Growth', 'Skill Gap', 'Learning', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Career Growth', path: routePaths.recommendations, icon: LineChart },
      { title: 'Upskilling', path: routePaths.colleges, icon: BookOpen }, // Re-using college path for upskilling temporarily
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'salary_growth', 'skill_gap', 'roadmap_progress'],
  },
  'Career Switcher': {
    modules: ['Dashboard', 'Career DNA', 'Career Growth', 'Skill Gap', 'Learning', 'Roadmap'],
    navItems: [
      { title: 'Dashboard', path: routePaths.dashboard, icon: LayoutDashboard },
      { title: 'Career DNA', path: routePaths.careerDNA, icon: Brain },
      { title: 'Career Growth', path: routePaths.recommendations, icon: LineChart },
      { title: 'Upskilling', path: routePaths.colleges, icon: BookOpen },
      { title: 'Roadmap', path: routePaths.roadmap, icon: Rocket },
    ],
    dashboardWidgets: ['onboarding', 'career_identity', 'skill_gap', 'roadmap_progress'],
  },
};

export function getOccupationConfig(education_level?: string, occupation?: string): OccupationConfig {
  if (occupation === 'Working Professional' || occupation === 'Career Switcher') {
    return OCCUPATION_CONFIG[occupation];
  }
  if (education_level) {
    if (['10th', '11th', '12th'].includes(education_level) || education_level === 'Diploma') {
        if (education_level === '10th') return OCCUPATION_CONFIG['10th'];
        if (education_level === '11th' || education_level === '12th') return OCCUPATION_CONFIG['12th'];
        return OCCUPATION_CONFIG['Diploma'];
    }
    return OCCUPATION_CONFIG[education_level] || OCCUPATION_CONFIG['UG'];
  }
  return OCCUPATION_CONFIG['UG'];
}
