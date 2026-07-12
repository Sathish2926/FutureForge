import { Outlet } from 'react-router-dom';
import { SidebarPlaceholder } from '../../components/layout/SidebarPlaceholder';
import { TopNavPlaceholder } from '../../components/layout/TopNavPlaceholder';
import { adminNavigation } from '../../constants/navigation';

export function AdminLayout() {
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
