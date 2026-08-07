import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { appRoutes } from './routes';
import { routePaths } from './constants/routes';
import { PagePlaceholder } from './components/common/PagePlaceholder';

// ── Lazy-loaded pages ───────────────────────────────────────────
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const CareerDNAWizard = lazy(() => import('./pages/CareerDNA'));
const RecommendationPage = lazy(() => import('./pages/Recommendation').then(m => ({ default: m.RecommendationPage })));
const RecommendationDetailPage = lazy(() => import('./pages/Recommendation/RecommendationDetail'));
const CareerIntelligencePage = lazy(() => import('./pages/CareerIntelligence'));
const RoadmapPage = lazy(() => import('./pages/Roadmap').then(m => ({ default: m.RoadmapPage })));
const RoadmapExecutionHub = lazy(() => import('./pages/Roadmap/ExecutionHub'));
const ChatPage = lazy(() => import('./pages/Chat'));
const WhatIfSimulator = lazy(() => import('./pages/WhatIfSimulator'));
const CollegeFinder = lazy(() => import('./pages/CollegeFinder'));
const OnboardingPage = lazy(() => import('./pages/Onboarding'));
const CareerExplorer = lazy(() => import('./pages/CareerExplorer'));
const ProfilePage = lazy(() => import('./pages/Profile').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('./pages/Settings').then(m => ({ default: m.SettingsPage })));
const ScholarshipDashboardPage = lazy(() => import('./pages/Scholarships').then(m => ({ default: m.ScholarshipDashboardPage })));
const ScholarshipProfilePage = lazy(() => import('./pages/Scholarships/ScholarshipProfilePage').then(m => ({ default: m.ScholarshipProfilePage })));
const ScholarshipRecommendationsPage = lazy(() => import('./pages/Scholarships/ScholarshipRecommendationsPage').then(m => ({ default: m.ScholarshipRecommendationsPage })));
const ScholarshipDetailPage = lazy(() => import('./pages/Scholarships/ScholarshipDetailPage').then(m => ({ default: m.ScholarshipDetailPage })));
const ScholarshipBookmarksPage = lazy(() => import('./pages/Scholarships/ScholarshipBookmarksPage').then(m => ({ default: m.ScholarshipBookmarksPage })));

// ── Loading Fallback ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground animate-pulse">Loading...</span>
      </div>
    </div>
  );
}

// ── Route → Component mapping ────────────────────────────────────
const scholarshipRoutes: Record<string, React.ReactNode> = {
  [routePaths.scholarships]: <ScholarshipDashboardPage />,
  [routePaths.scholarshipProfile]: <ScholarshipProfilePage />,
  [routePaths.scholarshipRecommendations]: <ScholarshipRecommendationsPage />,
  [routePaths.scholarshipDetail]: <ScholarshipDetailPage />,
  [routePaths.scholarshipBookmarks]: <ScholarshipBookmarksPage />,
  [routePaths.recommendations]: <RecommendationPage />,
};

const otherRoutes: Record<string, React.ReactNode> = {
  [routePaths.dashboard]: <DashboardPage />,
  [routePaths.profile]: <ProfilePage />,
  [routePaths.careerDNA]: <CareerDNAWizard />,
  [routePaths.careerDetails]: <CareerIntelligencePage />,
  [routePaths.chatbot]: <ChatPage />,
  [routePaths.simulator]: <WhatIfSimulator />,
  [routePaths.colleges]: <CollegeFinder />,
  [routePaths.roadmap]: <RoadmapPage />,
  [routePaths.roadmapExecution]: <RoadmapExecutionHub />,
  [routePaths.settings]: <SettingsPage />,
  [routePaths.recommendationDetail]: <RecommendationDetailPage />,
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default App;
