import { BreadcrumbPlaceholder } from './BreadcrumbPlaceholder';
import { NotificationPlaceholder } from './NotificationPlaceholder';
import { UserMenuPlaceholder } from './UserMenuPlaceholder';

type TopNavPlaceholderProps = {
  title: string;
};

export function TopNavPlaceholder({ title }: TopNavPlaceholderProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">{title}</p>
        <BreadcrumbPlaceholder />
      </div>
      <div className="flex items-center gap-3">
        <NotificationPlaceholder />
        <UserMenuPlaceholder />
      </div>
    </header>
  );
}
