import { routePaths } from './routes';

export const publicNavigation = [
  { label: 'Home', path: routePaths.home },
  { label: 'Login', path: routePaths.login },
  { label: 'Register', path: routePaths.register },
];

export const userNavigation = [
  { label: 'Dashboard', path: routePaths.dashboard },
  { label: 'Profile', path: routePaths.profile },
  { label: 'Assessment', path: routePaths.assessment },
  { label: 'Career DNA', path: routePaths.careerDNA },
  { label: 'Recommendations', path: routePaths.recommendations },
  { label: 'Colleges', path: routePaths.colleges },
  { label: 'Scholarships', path: routePaths.scholarships },
  { label: 'Roadmap', path: routePaths.roadmap },
  { label: 'Chatbot', path: routePaths.chatbot },
  { label: 'Settings', path: routePaths.settings },
];

export const adminNavigation = [
  { label: 'Admin', path: routePaths.admin.home },
  { label: 'Users', path: routePaths.admin.users },
  { label: 'Questions', path: routePaths.admin.questions },
  { label: 'Colleges', path: routePaths.admin.colleges },
  { label: 'Scholarships', path: routePaths.admin.scholarships },
  { label: 'Reports', path: routePaths.admin.reports },
];
