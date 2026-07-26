import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { appRoutes } from './routes';
import { routePaths } from './constants/routes';
import { PagePlaceholder } from './components/common/PagePlaceholder';
import { RecommendationPage } from './pages/Recommendation';
import { ScholarshipDashboardPage } from './pages/Scholarships';
import { ScholarshipProfilePage } from './pages/Scholarships/ScholarshipProfilePage';
import { ScholarshipRecommendationsPage } from './pages/Scholarships/ScholarshipRecommendationsPage';
import { ScholarshipDetailPage } from './pages/Scholarships/ScholarshipDetailPage';
import { ScholarshipBookmarksPage } from './pages/Scholarships/ScholarshipBookmarksPage';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/Dashboard';
import { AssessmentPage } from './pages/Assessment';
import CareerExplorer from './pages/CareerExplorer';
import ChatPage from './pages/Chat';
import CollegeFinder from './pages/CollegeFinder';
import OnboardingPage from './pages/Onboarding';
import RoadmapsPage from './pages/Roadmaps';

const scholarshipRoutes: Record<string, React.ReactNode> = {
  [routePaths.scholarships]: <ScholarshipDashboardPage />,
  [routePaths.scholarshipProfile]: <ScholarshipProfilePage />,
  [routePaths.scholarshipRecommendations]: <ScholarshipRecommendationsPage />,
  [routePaths.scholarshipDetail]: <ScholarshipDetailPage />,
  [routePaths.scholarshipBookmarks]: <ScholarshipBookmarksPage />,
  [routePaths.recommendations]: <RecommendationPage />,
};

import { RoadmapPage } from './pages/Roadmap';
import RoadmapExecutionHub from './pages/Roadmap/ExecutionHub';
import CareerDNAWizard from './pages/CareerDNA';
import CareerIntelligencePage from './pages/CareerIntelligence';
import WhatIfSimulator from './pages/WhatIfSimulator';

const otherRoutes: Record<string, React.ReactNode> = {
  [routePaths.dashboard]: <DashboardPage />,
  [routePaths.profile]: <ProfilePage />,
  [routePaths.assessment]: <AssessmentPage />,
  [routePaths.careerDNA]: <CareerDNAWizard />,
  [routePaths.careerDetails]: <CareerIntelligencePage />,
  [routePaths.chatbot]: <ChatPage />,
  [routePaths.simulator]: <WhatIfSimulator />,
  [routePaths.colleges]: <CollegeFinder />,
  [routePaths.roadmap]: <RoadmapPage />,
  [routePaths.roadmapExecution]: <RoadmapExecutionHub />,
  [routePaths.settings]: <SettingsPage />,
};

import { AuthLayout } from './layouts/AuthLayout';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routePaths.home} element={<Landing />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={routePaths.login} element={<Login />} />
        <Route path={routePaths.register} element={<Register />} />
      </Route>
      <Route element={<DashboardLayout />}>
        {appRoutes.userRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              scholarshipRoutes[route.path]
                ? scholarshipRoutes[route.path]
                : otherRoutes[route.path]
                ? otherRoutes[route.path]
                : <PagePlaceholder title={route.title} description={route.description} />
            }
          />
        ))}
      </Route>
      <Route element={<AdminLayout />}>
        {appRoutes.adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<PagePlaceholder title={route.title} description={route.description} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={routePaths.home} replace />} />
    </Routes>
  );
}

export default App;
