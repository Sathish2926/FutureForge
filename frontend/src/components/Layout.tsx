import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { clearToken } from "../api/client";
import {
  LayoutDashboard, Sparkles, Map,
  GraduationCap, Award, User, LogOut,
  Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../api/client";

const navGroups = [
  {
    title: "DISCOVER",
    links: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/career-dna", label: "Career DNA", icon: Sparkles },
    ]
  },
  {
    title: "PLAN",
    links: [
      { to: "/roadmap", label: "Roadmap", icon: Map },
      { to: "/colleges", label: "Colleges", icon: GraduationCap },
      { to: "/scholarships", label: "Scholarships", icon: Award },
    ]
  }
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => { });
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path === "/career-dna") return "Career DNA";
    if (path.startsWith("/careers")) return "Careers";
    if (path === "/roadmap") return "Your Roadmap";
    if (path === "/colleges") return "Colleges";
    if (path === "/scholarships") return "Scholarships";
    if (path === "/profile") return "Your Profile";
    return "FutureForge";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
      <nav className="md:w-72 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800 flex flex-col md:h-screen sticky top-0 z-50">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white text-2xl tracking-tight font-heading">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl shadow-[0_4px_10px_rgba(37,99,235,0.3)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            FutureForge
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 ml-12">Shape your path. Forge your future.</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">
                {group.title}
              </div>
              <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1.5 pb-2 md:pb-0 hide-scrollbar">
                {group.links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `whitespace-nowrap flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group relative ${isActive
                        ? "bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-600 rounded-r-full"></div>}
                        <l.icon className={`w-5 h-5 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"} transition-colors`} />
                        {l.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">
            ACCOUNT
          </div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all w-full group relative ${isActive ? "bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-600 rounded-r-full"></div>}
                <User className={`w-5 h-5 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"}`} />
                Profile
              </>
            )}
          </NavLink>
          <button
            onClick={() => { clearToken(); navigate("/"); }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-400 transition-all w-full mt-1 group"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Sign out
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between px-6 md:px-10 shrink-0 z-40 sticky top-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">{getPageTitle()}</h1>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </button>
            <NavLink to="/profile" className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 pr-4 rounded-full transition-colors border border-slate-200/60 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-sm">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden md:block">
                {profile?.name || "User"}
              </span>
            </NavLink>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950">
          <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
