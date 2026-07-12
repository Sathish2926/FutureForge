import { routePaths } from '../constants/routes';

export const appRoutes = {
  userRoutes: [
    { path: routePaths.dashboard, title: 'Dashboard', description: 'User dashboard placeholder.' },
    { path: routePaths.profile, title: 'Profile', description: 'Profile page placeholder.' },
    { path: routePaths.assessment, title: 'Assessment', description: 'Assessment page placeholder.' },
    { path: routePaths.careerDNA, title: 'Career DNA', description: 'Career DNA page placeholder.' },
    { path: routePaths.recommendations, title: 'Recommendations', description: 'Recommendations page placeholder.' },
    { path: routePaths.colleges, title: 'Colleges', description: 'Colleges page placeholder.' },
    { path: routePaths.scholarships, title: 'Scholarships', description: 'Scholarships page placeholder.' },
    { path: routePaths.roadmap, title: 'Roadmap', description: 'Roadmap page placeholder.' },
    { path: routePaths.chatbot, title: 'Chatbot', description: 'Chatbot page placeholder.' },
    { path: routePaths.settings, title: 'Settings', description: 'Settings page placeholder.' },
  ],
  adminRoutes: [
    { path: routePaths.admin.home, title: 'Admin', description: 'Admin dashboard placeholder.' },
    { path: routePaths.admin.users, title: 'Admin Users', description: 'User management placeholder.' },
    { path: routePaths.admin.questions, title: 'Admin Questions', description: 'Question bank placeholder.' },
    { path: routePaths.admin.colleges, title: 'Admin Colleges', description: 'College management placeholder.' },
    { path: routePaths.admin.scholarships, title: 'Admin Scholarships', description: 'Scholarship management placeholder.' },
    { path: routePaths.admin.reports, title: 'Admin Reports', description: 'Reporting placeholder.' },
  ],
};
