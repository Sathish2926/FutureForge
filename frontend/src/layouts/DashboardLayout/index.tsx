import { Outlet } from 'react-router-dom';
import { SidebarPlaceholder } from '../../components/layout/SidebarPlaceholder';
import { TopNavPlaceholder } from '../../components/layout/TopNavPlaceholder';
import { userNavigation } from '../../constants/navigation';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarPlaceholder title="FutureForge" items={userNavigation} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavPlaceholder title="User Dashboard" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
