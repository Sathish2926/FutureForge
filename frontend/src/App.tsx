import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { appRoutes } from './routes';
import { routePaths } from './constants/routes';
import { PagePlaceholder } from './components/common/PagePlaceholder';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routePaths.home} element={<PagePlaceholder title="Landing" description="Public landing page placeholder." />} />
        <Route path={routePaths.login} element={<PagePlaceholder title="Login" description="Authentication entry placeholder." />} />
        <Route path={routePaths.register} element={<PagePlaceholder title="Register" description="Account creation placeholder." />} />
      </Route>
      <Route element={<DashboardLayout />}>
        {appRoutes.userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<PagePlaceholder title={route.title} description={route.description} />} />
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
