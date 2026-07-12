import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarPlaceholderProps = {
  title: string;
  items: Array<{ label: string; path: string }>;
  footer?: ReactNode;
};

export function SidebarPlaceholder({ title, items, footer }: SidebarPlaceholderProps) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100">
      <div className="mb-8">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-slate-400">Navigation placeholder</div>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 text-sm transition-colors',
                isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </aside>
  );
}
