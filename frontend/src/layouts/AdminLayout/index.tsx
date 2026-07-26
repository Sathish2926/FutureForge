import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarPlaceholder } from '../../components/layout/SidebarPlaceholder';
import { TopNavPlaceholder } from '../../components/layout/TopNavPlaceholder';
import { adminNavigation } from '../../constants/navigation';
import { auth } from '../../lib/firebase';
import { routePaths } from '../../constants/routes';

export function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        navigate(routePaths.login);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarPlaceholder title="FutureForge Admin" items={adminNavigation} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavPlaceholder title="Admin Dashboard" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
