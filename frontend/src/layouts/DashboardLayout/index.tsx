import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  Bookmark,
  User,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Compass,
  BookOpen,
  MessageSquare,
  MapPin,
  Award,
} from 'lucide-react';
import { routePaths } from '../../constants/routes';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: routePaths.dashboard },
  { icon: GraduationCap, label: 'Scholarships', path: routePaths.scholarships },
  { icon: Bookmark, label: 'Saved', path: routePaths.scholarshipBookmarks },
  { icon: Award, label: 'Recommendations', path: routePaths.scholarshipRecommendations },
];

const moduleNavItems = [
  { icon: Compass, label: 'Career DNA', path: routePaths.careerDNA },
  { icon: BookOpen, label: 'Assessment', path: routePaths.assessment },
  { icon: MapPin, label: 'Colleges', path: routePaths.colleges },
  { icon: MapPin, label: 'Roadmap', path: routePaths.roadmap },
  { icon: MessageSquare, label: 'AI Chat', path: routePaths.chatbot },
];

const bottomNavItems = [
  { icon: User, label: 'Profile', path: routePaths.profile },
  { icon: Settings, label: 'Settings', path: routePaths.settings },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        navigate(routePaths.login);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(routePaths.home);
    } catch {
      // silent
    }
  };

  const sidebarWidth = sidebarCollapsed ? 'w-[72px]' : 'w-72';

  const currentPageTitle = () => {
    const allItems = [...mainNavItems, ...moduleNavItems, ...bottomNavItems];
    const match = allItems.find(item =>
      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    return match?.label || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 flex h-screen flex-col border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300 ${sidebarWidth} ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-border px-4 ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <Link to={routePaths.dashboard} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold text-foreground">
                FutureForge
              </span>
            )}
          </Link>
          <button
            className="lg:hidden ml-auto p-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8 scrollbar-hide">
          {/* Main */}
          <div>
            {!sidebarCollapsed && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3 px-3">
                Main
              </p>
            )}
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => {
                    const base = `flex items-center gap-3 rounded-xl transition-all duration-200 group ${
                      sidebarCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                    }`;
                    return isActive
                      ? `${base} bg-primary/10 text-primary border border-primary/20 shadow-sm`
                      : `${base} text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent`;
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div>
            {!sidebarCollapsed && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3 px-3">
                Explore
              </p>
            )}
            <div className="space-y-1">
              {moduleNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => {
                    const base = `flex items-center gap-3 rounded-xl transition-all duration-200 ${
                      sidebarCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                    }`;
                    return isActive
                      ? `${base} bg-background text-foreground border border-border shadow-sm`
                      : `${base} text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent`;
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border px-3 py-4 space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                const base = `flex items-center gap-3 rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                }`;
                return isActive
                  ? `${base} bg-background text-foreground shadow-sm border border-border`
                  : `${base} text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent`;
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-rose-500/10 hover:text-rose-600 transition-all duration-200 border border-transparent ${
              sidebarCollapsed ? 'justify-center px-3' : ''
            }`}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          {/* User Info */}
          {!sidebarCollapsed && user && (
            <div className="mt-4 p-3 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                  {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{user.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Nav */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">{currentPageTitle()}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-xl bg-background border border-border pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <kbd className="absolute right-3 bg-muted border border-border rounded px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
            </button>

            {/* User Avatar */}
            <Link
              to={routePaths.profile}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-md hover:ring-2 hover:ring-primary/50 transition-all"
            >
              {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
