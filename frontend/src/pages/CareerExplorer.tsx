import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { Search, Compass, Briefcase, Stethoscope, Landmark, Landmark as Bank, Monitor, Factory, GraduationCap, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const CATEGORIES = [
  { name: "All", icon: Compass },
  { name: "Technology", icon: Monitor },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Science", icon: Factory },
  { name: "Engineering", icon: Factory },
  { name: "Law", icon: Landmark },
  { name: "Finance", icon: Bank },
  { name: "Education", icon: GraduationCap },
  { name: "Design", icon: Sparkles },
  { name: "Business", icon: Briefcase },
];

export default function CareerExplorer() {
  const [careers, setCareers] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listCareers().then(setCareers).finally(() => setLoading(false));
  }, []);

  const filtered = careers.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(q.toLowerCase()) || c.sector.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.sector.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div className="flex flex-col md:items-center text-center max-w-3xl mx-auto space-y-5 mb-10">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-brand-600 shadow-sm border border-brand-100/50">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-heading">Explore Careers</h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Discover careers that match your interests, strengths and ambitions. Find your perfect pathway.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          </div>
          <input 
            className="block w-full bg-white border border-slate-200 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all text-lg placeholder:text-slate-400 text-slate-700 font-medium" 
            placeholder="Search careers, industries, or keywords..." 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {q && (
              <button 
                onClick={() => setQ("")}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-3 pb-4 md:flex-wrap md:justify-center hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mt-8">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border shadow-sm ${
                isActive 
                  ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20" 
                  : "bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <cat.icon className={`w-4 h-4 ${isActive ? "text-slate-300" : "text-slate-400"}`} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mt-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-200/60 rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((c) => (
            <Link key={c.slug} to={`/careers/${c.slug}`} className="card card-hover flex flex-col p-8 group cursor-pointer border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-start justify-between mb-5">
                <div className="badge badge-brand">{c.sector}</div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 group-hover:scale-110 transition-all border border-slate-100 group-hover:border-brand-100">
                  <Compass className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 font-heading group-hover:text-brand-700 transition-colors mb-3 leading-tight">{c.name}</h2>
              <p className="text-slate-500 line-clamp-3 flex-1 text-sm leading-relaxed">{c.description}</p>
              
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between font-semibold text-brand-600">
                <span>Explore pathway</span>
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center glass-panel rounded-3xl border border-slate-200/60">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">No careers found</h3>
              <p className="text-slate-500 mt-2 text-lg">Try adjusting your search terms or category filter.</p>
              <button 
                onClick={() => { setQ(""); setActiveCategory("All"); }}
                className="mt-6 btn-secondary"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
