import { Link } from "react-router-dom";
import { Sparkles, Map, GraduationCap, Award, Compass, MessageCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <header className="px-6 py-5 flex justify-between items-center max-w-7xl mx-auto w-full z-10 relative">
        <div className="font-bold text-slate-900 text-2xl flex items-center gap-3 font-heading">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl shadow-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          FutureForge
        </div>
        <Link to="/login" className="btn-primary shadow-lg shadow-brand-500/20">Sign in</Link>
      </header>

      <main className="flex-1 relative">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <section className="pt-20 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-bold uppercase tracking-widest border border-brand-100 shadow-sm mx-auto">
              <Sparkles className="w-4 h-4" /> Next Generation EdTech
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 font-heading leading-[1.1]">
              Shape your path.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Forge your future.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Personalized career and education guidance for every stage of your journey. No generic advice — just your unique path.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <Link to="/login" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-brand-500/20 group">
                Start your journey <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">&rarr;</span>
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4 bg-white/50 backdrop-blur-sm border-slate-200/80">
                Explore careers
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative z-10 border-t border-slate-100 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Everything you need to succeed</h2>
              <p className="mt-4 text-lg text-slate-500">A complete ecosystem for career discovery and planning.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: "Career DNA", desc: "Discover your unique learning signals and matches through our premium assessment.", color: "bg-purple-50 text-purple-600" },
                { icon: Compass, title: "Career Discovery", desc: "Explore thousands of careers with detailed pathways, requirements and insights.", color: "bg-blue-50 text-blue-600" },
                { icon: Map, title: "Actionable Roadmaps", desc: "Turn your career goals into step-by-step journeys you can track and execute.", color: "bg-emerald-50 text-emerald-600" },
                { icon: GraduationCap, title: "College Finder", desc: "Match with colleges based on your academic profile, budget and goals.", color: "bg-amber-50 text-amber-600" },
                { icon: Award, title: "Scholarships", desc: "Find matched funding opportunities based on deterministic eligibility checks.", color: "bg-rose-50 text-rose-600" },
                { icon: MessageCircle, title: "AI Advisor", desc: "Get 24/7 personalized guidance based on your profile and career data.", color: "bg-indigo-50 text-indigo-600" },
              ].map((f, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-3 mb-6 font-heading font-bold text-white text-xl">
            <Sparkles className="w-5 h-5" /> FutureForge
          </div>
          <p className="text-sm max-w-md mx-auto leading-relaxed">
            Recommendations reflect profile fit, not guaranteed outcomes. Always verify eligibility, deadlines and fees on official sources.
          </p>
        </div>
      </footer>
    </div>
  );
}
