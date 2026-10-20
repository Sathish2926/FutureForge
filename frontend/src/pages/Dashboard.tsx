import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import {
  Sparkles, Target, Map, ArrowRight, BookOpen, Clock, AlertCircle, ChevronRight, User, CheckCircle2
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = () => {
    setLoading(true);
    setError(null);
    api.getDashboard()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load dashboard data.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-slate-200/60 rounded-3xl w-full"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-200/60 rounded-3xl"></div>
          <div className="h-40 bg-slate-200/60 rounded-3xl"></div>
          <div className="h-40 bg-slate-200/60 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-3xl max-w-xl mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Dashboard</h3>
        <p className="text-slate-600 text-sm mb-6">{error || "Something went wrong while fetching your dashboard data."}</p>
        <button onClick={fetchDashboard} className="btn-primary">
          Retry Loading
        </button>
      </div>
    );
  }


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-brand-900 to-slate-900 rounded-[2rem] p-8 md:p-10 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-heading">
            {getGreeting()}, {data.greeting_name || "Future Forger"} <span className="inline-block hover:animate-bounce origin-bottom">👋</span>
          </h1>
          <p className="text-brand-100 mt-2 text-lg">Let's shape your next step.</p>
        </div>

        {data.profile_completeness_percent < 100 ? (
          <Link to="/profile" className="relative z-10 group flex flex-col justify-center px-6 py-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all md:w-80 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white flex items-center gap-2"><User className="w-4 h-4" /> Profile Completion</span>
              <span className="text-sm font-bold text-brand-300">{data.profile_completeness_percent}%</span>
            </div>
            <div className="w-full bg-slate-900/50 rounded-full h-2 mb-4 overflow-hidden border border-white/10">
              <div className="bg-gradient-to-r from-brand-400 to-brand-300 h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ width: `${data.profile_completeness_percent}%` }}></div>
            </div>
            <div className="text-xs text-white/90 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Complete your profile <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ) : (
          <div className="relative z-10 flex flex-col justify-center px-6 py-5 bg-emerald-500/10 backdrop-blur-md rounded-2xl border border-emerald-500/20 md:w-80">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="font-bold text-white text-lg">Profile Complete</div>
                <div className="text-emerald-200/80 text-xs mt-0.5">Your matches are fully personalized</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section>
        <div className="flex items-center gap-2 mb-5 px-1">
          <Target className="w-5 h-5 text-brand-600" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Your Career Snapshot</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Link to="/career-dna" className="card card-hover flex flex-col group p-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Career DNA</h3>
            <p className="text-sm text-slate-500 mt-2 flex-1 leading-relaxed">
              {data.education_stage ? "Your personalized profile has been assessed." : "Take your assessment to unlock insights."}
            </p>
            <div className="text-sm font-bold text-brand-600 mt-5 flex items-center gap-1.5 group-hover:text-brand-700 transition-colors">
              {data.education_stage ? "Review insights" : "Start now"} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/careers" className="card card-hover flex flex-col group p-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Top Match</h3>
            <p className="text-sm text-slate-500 mt-2 flex-1 leading-relaxed">
              {data.top_career_matches?.[0]?.career_name || "Explore to find careers that match your profile."}
            </p>
            <div className="text-sm font-bold text-brand-600 mt-5 flex items-center gap-1.5 group-hover:text-brand-700 transition-colors">
              {data.top_career_matches?.length ? "View top careers" : "Explore careers"} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/roadmap" className="card card-hover flex flex-col group p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Active Roadmap</h3>
            <p className="text-sm text-slate-500 mt-2 flex-1 leading-relaxed">
              {data.primary_career_goal ? `You are currently ${data.active_roadmap_completion_percent}% through your journey.` : "No active roadmap to track your progress."}
            </p>
            <div className="text-sm font-bold text-brand-600 mt-5 flex items-center gap-1.5 group-hover:text-brand-700 transition-colors">
              {data.primary_career_goal ? "Continue roadmap" : "Build roadmap"} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-5 px-1">
            <Clock className="w-5 h-5 text-brand-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Your Next Steps</h2>
          </div>
          <div className="card p-0 overflow-hidden shadow-sm">
            <ul className="divide-y divide-slate-100">
              {data.next_actions?.slice(0, 3).map((a: any, i: number) => (
                <li key={i} className="p-5 flex items-center gap-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{a.title}</div>
                    <div className="text-sm text-slate-500 mt-1">{a.stage}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
                </li>
              ))}
              {(!data.next_actions || data.next_actions.length === 0) && (
                <li className="p-10 text-center text-slate-500 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg">Explore Career Explorer to get started on your path.</p>
                  <Link to="/careers" className="btn-secondary mt-4">Explore Careers</Link>
                </li>
              )}
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Top Career Matches</h2>
            </div>
            <Link to="/careers" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center group">
              View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {data.top_career_matches?.map((m: any) => (
              <Link key={m.career_slug} to={`/careers/${m.career_slug}`} className="card p-5 flex items-center justify-between card-hover group border-l-4 border-l-brand-500">
                <div>
                  <div className="font-bold text-slate-900 text-lg group-hover:text-brand-700 transition-colors mb-1">{m.career_name}</div>
                  <div className="text-sm text-slate-500">Based on your profile</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase tracking-wider">
                      {m.alignment_label || (m.match_score >= 80 ? "Strong Alignment" : m.match_score >= 60 ? "Promising" : "Worth Exploring")}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Evidence Alignment</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors border border-slate-100">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                  </div>
                </div>
              </Link>
            ))}
            {(!data.top_career_matches || data.top_career_matches.length === 0) && (
              <div className="card p-10 text-center text-slate-500 flex flex-col items-center justify-center border-dashed border-2">
                <Target className="w-10 h-10 text-slate-300 mb-4" />
                <p className="text-lg">Complete your Career DNA to see personalized matches.</p>
                <Link to="/career-dna" className="btn-primary mt-4">Start Assessment</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/*
[
  {
    "slug": "chartered-accountant",
    "name": "Chartered Accountant (CA)",
    "sector": "Business & Finance",
    "description": "Licensed professional who audits financial statements, manages taxation, and advises on financial compliance and strategy.",
    "recommended_subjects": "Commerce, Mathematics/Accountancy",
    "common_entrance_exams": "ICAI CA Foundation, CA Intermediate, CA Final",
    "relevant_degrees": "B.Com (parallel), CA is a professional certification not a university degree",
    "typical_progression": "Articleship Trainee → Qualified CA (Associate) → Senior CA / Partner → Fellow Member (FCA) / CFO",
    "industry_sectors": "Audit Firms, Banking, Corporate Finance, Taxation Consultancies, Big 4 Firms",
    "government_opportunities": "CAG offices, Income Tax Department (via specific recruitment), PSU finance divisions",
    "higher_study_routes": "ICAI's own postgraduate diplomas, CFA, ACCA, MBA Finance for corporate roles",
    "skill_building_timeline": "4.5-5 years including articleship",
    "skills": [
      { "name": "Financial Accounting", "priority": "core" },
      { "name": "Taxation & Auditing", "priority": "core" },
      { "name": "Corporate & Business Law", "priority": "core" },
      { "name": "Costing & Financial Management", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.97,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "class12",
          "title": "CA Foundation Preparation",
          "skill_name": "Financial Accounting",
          "estimated_time": "4-6 months",
          "why": "CA Foundation is the mandatory entry gate testing accounting, law, quantitative aptitude, and economics basics.",
          "prerequisites": [],
          "actions": [
            "Register with ICAI after Class 12 and study the four Foundation papers (Accounting, Business Law, Quant Aptitude, Business Economics).",
            "Build strong fundamentals in double-entry bookkeeping, journal entries, and financial statement preparation.",
            "Solve past 5 years of ICAI Foundation question papers under timed conditions."
          ],
          "resources": [
            { "title": "ICAI Official BOS Study Material", "url": "https://www.icai.org/", "resource_type": "doc", "estimated_minutes": 600 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "CA Intermediate & Start of Articleship",
          "skill_name": "Taxation & Auditing",
          "estimated_time": "12-18 months",
          "why": "Intermediate builds the technical core (advanced accounting, taxation, auditing standards) applied daily during articleship.",
          "prerequisites": ["Financial Accounting"],
          "actions": [
            "Clear both groups of CA Intermediate covering Accounting, Taxation (Direct & Indirect), Auditing, and Costing.",
            "Begin the mandatory 2-year articleship under a practicing CA, rotating through audit, tax, and consulting assignments.",
            "Learn practical use of Tally, GST portals, and Income Tax e-filing systems during articleship."
          ],
          "resources": [
            { "title": "ICAI Intermediate Study Material", "url": "https://www.icai.org/", "resource_type": "doc", "estimated_minutes": 800 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "Articleship Specialization & Practical Filings",
          "skill_name": "Corporate & Business Law",
          "estimated_time": "18-24 months",
          "why": "Real client audit files, tax returns, and statutory filings completed during articleship are the practical proof-of-work CA hiring relies on.",
          "prerequisites": ["Taxation & Auditing"],
          "actions": [
            "Independently handle statutory audit assignments, including vouching, verification, and drafting audit reports.",
            "File GST returns, TDS returns, and income tax returns for real client cases under supervision.",
            "Build a portfolio of case notes covering diverse client industries handled during articleship."
          ],
          "resources": [
            { "title": "ICAI Articleship Guidelines", "url": "https://www.icai.org/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "CA Final & Placement",
          "skill_name": "Costing & Financial Management",
          "estimated_time": "6-9 months",
          "why": "CA Final tests advanced financial reporting, strategic financial management, and elective specializations that determine placement track.",
          "prerequisites": ["Corporate & Business Law"],
          "actions": [
            "Clear CA Final covering Financial Reporting, Strategic Financial Management, Advanced Auditing, and an elective paper.",
            "Attend ICAI campus placement or apply directly to Big 4/mid-size firms and corporate finance teams.",
            "Choose a specialization track (audit, tax, M&A advisory, or corporate finance) based on articleship exposure."
          ],
          "resources": [
            { "title": "ICAI Campus Placement Portal", "url": "https://www.icai.org/", "resource_type": "doc", "estimated_minutes": 60 }
          ]
        }
      ]
    }
  },
  {
    "slug": "investment-banking-analyst",
    "name": "Investment Banking Analyst",
    "sector": "Business & Finance",
    "description": "Advises corporations and governments on raising capital, mergers & acquisitions, and executing complex financial transactions.",
    "recommended_subjects": "Mathematics, Economics, Commerce",
    "common_entrance_exams": "CAT/CUET (for MBA), CFA Level exams",
    "relevant_degrees": "B.Com/BBA/B.A Economics, MBA Finance from a top-tier B-school",
    "typical_progression": "Summer Intern → Analyst → Associate → Vice President → Managing Director",
    "industry_sectors": "Bulge Bracket Banks, Boutique IB Firms, Corporate Finance Advisory",
    "government_opportunities": "Limited; some roles in SEBI-regulated merchant banking or public sector financial institutions",
    "higher_study_routes": "MBA Finance (top B-school), CFA charter",
    "skill_building_timeline": "12-18 months intensive preparation plus MBA/degree",
    "skills": [
      { "name": "Financial Accounting", "priority": "core" },
      { "name": "Valuation & Financial Modeling", "priority": "core" },
      { "name": "Excel & PowerPoint Mastery", "priority": "core" },
      { "name": "M&A Deal Process Knowledge", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.94,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Accounting & Corporate Finance Fundamentals",
          "skill_name": "Financial Accounting",
          "estimated_time": "8-10 weeks",
          "why": "Every valuation model is built on the three financial statements — reading and linking them correctly is the non-negotiable base skill.",
          "prerequisites": [],
          "actions": [
            "Master the income statement, balance sheet, and cash flow statement and how they interlink.",
            "Study corporate finance basics: time value of money, cost of capital, capital structure.",
            "Read annual reports of 3-5 listed companies to practice extracting key metrics."
          ],
          "resources": [
            { "title": "Corporate Finance Institute: Free Finance Courses", "url": "https://corporatefinanceinstitute.com/resources/", "resource_type": "course", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Financial Modeling & Valuation",
          "skill_name": "Valuation & Financial Modeling",
          "estimated_time": "10-14 weeks",
          "why": "The daily work of an IB analyst is building and stress-testing three-statement and valuation models in Excel under tight deadlines.",
          "prerequisites": ["Financial Accounting"],
          "actions": [
            "Build a three-statement financial model linking income statement, balance sheet, and cash flows.",
            "Learn DCF valuation, comparable company analysis, and precedent transaction analysis.",
            "Master advanced Excel shortcuts and formatting conventions used in banking (blue/black inputs)."
          ],
          "resources": [
            { "title": "Wall Street Prep Free Resources", "url": "https://www.wallstreetprep.com/knowledge/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Deal Simulation & Pitch Book Capstone",
          "skill_name": "M&A Deal Process Knowledge",
          "estimated_time": "6-8 weeks",
          "why": "Building a realistic pitch book for a mock M&A deal demonstrates you understand both the technical modeling and the client-facing deliverable.",
          "prerequisites": ["Valuation & Financial Modeling"],
          "actions": [
            "Pick a real public company and build a full LBO or M&A merger model with accretion/dilution analysis.",
            "Create a mock pitch book/deck summarizing the deal rationale and valuation ranges.",
            "Practice explaining every assumption and output of the model clearly out loud."
          ],
          "resources": [
            { "title": "Breaking Into Wall Street: Sample Models", "url": "https://breakingintowallstreet.com/", "resource_type": "course", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Technical Interviews, Networking & Placement",
          "skill_name": "Excel & PowerPoint Mastery",
          "estimated_time": "8-10 weeks",
          "why": "IB hiring is disproportionately driven by technical interview performance and networking/referrals, both requiring deliberate preparation.",
          "prerequisites": ["M&A Deal Process Knowledge"],
          "actions": [
            "Master the top 50 IB technical interview questions (valuation, accounting, brainteasers) cold.",
            "Network with alumni/bankers for informational interviews and referral pipelines.",
            "Apply to summer internship or off-cycle analyst programs, since most full-time offers convert from internships."
          ],
          "resources": [
            { "title": "Mergers & Inquisitions: Interview Guides", "url": "https://mergersandinquisitions.com/investment-banking-interview-questions-answers/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        }
      ]
    }
  },
  {
    "slug": "financial-analyst-equity-researcher",
    "name": "Financial Analyst & Equity Researcher",
    "sector": "Business & Finance",
    "description": "Analyzes companies, industries, and markets to produce investment recommendations and research reports for investors.",
    "recommended_subjects": "Mathematics, Economics, Commerce",
    "common_entrance_exams": "CAT/CUET (for MBA), CFA Level exams",
    "relevant_degrees": "B.Com/BBA/B.A Economics, MBA Finance",
    "typical_progression": "Research Associate → Equity Research Analyst → Senior Analyst → Portfolio Manager / Head of Research",
    "industry_sectors": "Brokerages, Asset Management Firms, Investment Banks, Mutual Funds",
    "government_opportunities": "RBI research department, SEBI research wing",
    "higher_study_routes": "CFA charter, MBA Finance, M.Sc Finance/Economics",
    "skill_building_timeline": "10-14 months dedicated practice",
    "skills": [
      { "name": "Financial Statement Analysis", "priority": "core" },
      { "name": "Valuation Techniques", "priority": "core" },
      { "name": "Industry & Macro Research", "priority": "core" },
      { "name": "Report Writing", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.94,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Accounting, Economics & Markets Fundamentals",
          "skill_name": "Financial Statement Analysis",
          "estimated_time": "8-10 weeks",
          "why": "Analysts must read financial statements critically to spot red flags and quality-of-earnings issues before any valuation work makes sense.",
          "prerequisites": [],
          "actions": [
            "Learn financial statement analysis: ratio analysis, quality of earnings, common-size statements.",
            "Study microeconomics and macroeconomics as they affect company and sector performance.",
            "Follow daily market news and quarterly earnings calls of 5-10 companies in a sector of interest."
          ],
          "resources": [
            { "title": "Investopedia: Financial Statement Analysis", "url": "https://www.investopedia.com/financial-statement-analysis-4689809", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Valuation Modeling & CFA Level 1 Concepts",
          "skill_name": "Valuation Techniques",
          "estimated_time": "10-14 weeks",
          "why": "CFA curriculum concepts and valuation modeling form the technical vocabulary this entire field runs on.",
          "prerequisites": ["Financial Statement Analysis"],
          "actions": [
            "Build DCF and relative valuation (comps) models for 2-3 companies in Excel.",
            "Study CFA Level 1 topics: equity valuation, fixed income basics, financial reporting.",
            "Learn to build simple financial forecasts using historical trends and management guidance."
          ],
          "resources": [
            { "title": "CFA Institute: Level 1 Curriculum Overview", "url": "https://www.cfainstitute.org/programs/cfa-program/curriculum", "resource_type": "doc", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Equity Research Report Capstone",
          "skill_name": "Report Writing",
          "estimated_time": "6-8 weeks",
          "why": "A polished initiation-of-coverage report with a clear investment thesis is the standard portfolio artifact hiring managers expect to see.",
          "prerequisites": ["Valuation Techniques"],
          "actions": [
            "Write a full equity research initiation report on a publicly listed company with a buy/hold/sell rating.",
            "Include an industry overview, competitive positioning, financial model, and valuation summary.",
            "Get feedback from a mentor or online finance community and revise the report."
          ],
          "resources": [
            { "title": "Sample Sell-Side Research Reports (public company IR pages)", "url": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "CFA Progression & Interview Readiness",
          "skill_name": "Industry & Macro Research",
          "estimated_time": "8-10 weeks",
          "why": "Firms weight CFA candidacy heavily, and interviews test both stock pitches and depth of macro/sector understanding.",
          "prerequisites": ["Report Writing"],
          "actions": [
            "Register for and prepare seriously for CFA Level 1 if not already done.",
            "Prepare a 2-minute 'stock pitch' for your capstone company and rehearse it under questioning.",
            "Practice technical questions on valuation multiples, DCF sensitivity, and sector-specific drivers."
          ],
          "resources": [
            { "title": "300 Hours: CFA Study Resources", "url": "https://300hours.com/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "management-consultant",
    "name": "Management Consultant",
    "sector": "Business & Finance",
    "description": "Advises organizations on strategy, operations, and organizational design to solve high-stakes business problems.",
    "recommended_subjects": "Mathematics, Economics, any strong analytical stream",
    "common_entrance_exams": "CAT, GMAT, CUET",
    "relevant_degrees": "Any bachelor's degree, MBA from a top-tier B-school strongly preferred",
    "typical_progression": "Business Analyst → Associate/Consultant → Engagement Manager → Principal → Partner",
    "industry_sectors": "MBB (McKinsey/BCG/Bain), Big 4 Advisory, Boutique Strategy Firms",
    "government_opportunities": "NITI Aayog consulting engagements, government advisory panels",
    "higher_study_routes": "MBA (top-tier), specialized master's in management",
    "skill_building_timeline": "12-18 months plus MBA where applicable",
    "skills": [
      { "name": "Structured Problem Solving", "priority": "core" },
      { "name": "Business Frameworks", "priority": "core" },
      { "name": "Case Interview Skills", "priority": "core" },
      { "name": "Data-Driven Storytelling", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Business Fundamentals & Analytical Thinking",
          "skill_name": "Structured Problem Solving",
          "estimated_time": "6-8 weeks",
          "why": "Consulting is fundamentally structured problem-solving under ambiguity; frameworks are useless without this underlying mental discipline.",
          "prerequisites": [],
          "actions": [
            "Learn the MECE principle and practice breaking down ambiguous business problems into structured trees.",
            "Study core business concepts: unit economics, market sizing, profitability drivers.",
            "Read 2-3 classic business case studies (HBR) and outline how you would approach each."
          ],
          "resources": [
            { "title": "Harvard Business Review: Free Articles", "url": "https://hbr.org/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Business Frameworks & Excel/PowerPoint for Consulting",
          "skill_name": "Business Frameworks",
          "estimated_time": "8-10 weeks",
          "why": "Consultants apply a toolkit of proven frameworks and communicate findings via crisp slides — both are learnable, trainable skills.",
          "prerequisites": ["Structured Problem Solving"],
          "actions": [
            "Study core frameworks: Porter's Five Forces, SWOT, 4Ps, value chain analysis, profitability trees.",
            "Practice building clean, insight-first slides (pyramid principle) in PowerPoint.",
            "Build basic Excel skills for quick quantitative analysis (sensitivity tables, breakeven analysis)."
          ],
          "resources": [
            { "title": "Case Interview Prep: Frameworks Guide", "url": "https://www.caseinterview.com/case_interview_frameworks", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Live Case Practice & Consulting Project",
          "skill_name": "Data-Driven Storytelling",
          "estimated_time": "8-10 weeks",
          "why": "Volume of live case practice with feedback is the single best predictor of case interview performance, more than reading theory.",
          "prerequisites": ["Business Frameworks"],
          "actions": [
            "Complete 20-30 live mock case interviews with peers or through a case club.",
            "Take on a real or simulated consulting project (campus consulting club, pro-bono NGO strategy work).",
            "Compile a 'case bank' of solved problems with structured notes on frameworks used."
          ],
          "resources": [
            { "title": "PrepLounge: Case Interview Practice", "url": "https://www.preplounge.com/en", "resource_type": "project", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Case Interview Mastery & Firm-Specific Prep",
          "skill_name": "Case Interview Skills",
          "estimated_time": "8-10 weeks",
          "why": "Each top firm has a distinct interview style (McKinsey PEI, BCG written cases) that requires targeted, firm-specific preparation.",
          "prerequisites": ["Data-Driven Storytelling"],
          "actions": [
            "Study firm-specific interview formats (McKinsey Personal Experience Interview, BCG written case, Bain case).",
            "Do 5+ full mock interviews simulating real firm formats with strict timing.",
            "Prepare 3-4 well-rehearsed personal stories using the STAR method for behavioral rounds."
          ],
          "resources": [
            { "title": "McKinsey: Interview Preparation Guide", "url": "https://www.mckinsey.com/careers/interviewing", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "product-manager-tech",
    "name": "Product Manager (Tech)",
    "sector": "Business & Finance",
    "description": "Defines product strategy and roadmaps, translating user and business needs into features that engineering teams build.",
    "recommended_subjects": "Mathematics, Computer Science, Economics",
    "common_entrance_exams": "CAT/CUET (for MBA), no fixed exam for direct entry",
    "relevant_degrees": "B.Tech/BBA/B.Com (any), MBA useful but not mandatory",
    "typical_progression": "APM / Associate PM → Product Manager → Senior PM → Group PM / Director of Product → VP Product",
    "industry_sectors": "SaaS, E-Commerce, Fintech, Consumer Apps, Enterprise Software",
    "government_opportunities": "Digital India / UMANG product teams (contract-based)",
    "higher_study_routes": "MBA with a product/tech focus, specialized PM certificate programs",
    "skill_building_timeline": "8-12 months dedicated practice",
    "skills": [
      { "name": "User Research & Discovery", "priority": "core" },
      { "name": "Product Strategy & Prioritization", "priority": "core" },
      { "name": "Data Analysis & Metrics", "priority": "core" },
      { "name": "Cross-Functional Communication", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.93,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Product Thinking & User Research Basics",
          "skill_name": "User Research & Discovery",
          "estimated_time": "5-6 weeks",
          "why": "Great PMs start from a deep, evidence-based understanding of user problems, not from feature ideas.",
          "prerequisites": [],
          "actions": [
            "Study the basics of user research: interviews, surveys, and identifying jobs-to-be-done.",
            "Deconstruct 3-5 products you use daily, identifying their core user problems and value propositions.",
            "Learn to write clear problem statements and user personas."
          ],
          "resources": [
            { "title": "Google: Foundations of Product Management (free audit)", "url": "https://www.coursera.org/professional-certificates/google-project-management", "resource_type": "course", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Prioritization, Wireframing & Agile Delivery",
          "skill_name": "Product Strategy & Prioritization",
          "estimated_time": "8-10 weeks",
          "why": "PMs must turn insights into a prioritized roadmap and communicate it clearly to design and engineering via specs and wireframes.",
          "prerequisites": ["User Research & Discovery"],
          "actions": [
            "Learn prioritization frameworks (RICE, MoSCoW) and practice applying them to a mock feature backlog.",
            "Create low-fidelity wireframes in Figma for a proposed feature.",
            "Study Agile/Scrum ceremonies and how PMs interact with sprints and engineering."
          ],
          "resources": [
            { "title": "Figma: Getting Started", "url": "https://help.figma.com/hc/en-us/categories/360002042553-Getting-Started", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "End-to-End Product Case Study",
          "skill_name": "Data Analysis & Metrics",
          "estimated_time": "8-10 weeks",
          "why": "A full product case study — problem to shipped-feature metrics — is the strongest signal PM hiring managers look for from newcomers.",
          "prerequisites": ["Product Strategy & Prioritization"],
          "actions": [
            "Pick a real product, identify a genuine gap, and write a full PRD (Product Requirements Document) for a solution.",
            "Define success metrics and a basic A/B test design for the proposed feature.",
            "If possible, build or prototype the feature (even a clickable Figma prototype) to demonstrate execution."
          ],
          "resources": [
            { "title": "Product School: Free PM Resources", "url": "https://productschool.com/free-product-management-resources", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "PM Interview Prep: Product Sense & Execution",
          "skill_name": "Cross-Functional Communication",
          "estimated_time": "6-8 weeks",
          "why": "PM interviews specifically test product sense, execution/metrics reasoning, and estimation, each of which is a distinct trainable skill.",
          "prerequisites": ["Data Analysis & Metrics"],
          "actions": [
            "Practice 'design a product for X user' and 'improve product Y' style product sense questions.",
            "Practice execution questions: 'metric X dropped, how do you diagnose it'.",
            "Do 5+ mock PM interviews with peers or mentors and refine your case study pitch."
          ],
          "resources": [
            { "title": "Exponent: PM Interview Question Bank", "url": "https://www.tryexponent.com/questions?role=product-manager", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        }
      ]
    }
  },
  {
    "slug": "digital-marketing-specialist-growth-hacker",
    "name": "Digital Marketing Specialist & Growth Hacker",
    "sector": "Business & Finance",
    "description": "Drives customer acquisition and revenue growth through data-driven marketing campaigns across digital channels.",
    "recommended_subjects": "Commerce, Economics, any stream with strong writing/analytical ability",
    "common_entrance_exams": "CUET, none mandatory",
    "relevant_degrees": "BBA, B.Com, B.A. Mass Communication, any bachelor's degree",
    "typical_progression": "Marketing Intern → Digital Marketing Executive → Growth Marketing Manager → Head of Growth / CMO",
    "industry_sectors": "E-Commerce, D2C Brands, SaaS, Marketing Agencies, Startups",
    "government_opportunities": "Digital India public awareness campaign contracts",
    "higher_study_routes": "MBA Marketing, specialized growth marketing certifications",
    "skill_building_timeline": "6-9 months dedicated practice",
    "skills": [
      { "name": "Marketing Fundamentals", "priority": "core" },
      { "name": "Performance Marketing (SEO/SEM/Ads)", "priority": "core" },
      { "name": "Analytics & Experimentation", "priority": "core" },
      { "name": "Content & Copywriting", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.94,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Marketing Fundamentals & Funnel Thinking",
          "skill_name": "Marketing Fundamentals",
          "estimated_time": "4-6 weeks",
          "why": "Every channel tactic sits inside a broader funnel (awareness-consideration-conversion-retention) that must be understood first.",
          "prerequisites": [],
          "actions": [
            "Study the marketing funnel (AARRR/pirate metrics) and basic positioning/segmentation concepts.",
            "Learn the fundamentals of brand vs performance marketing and how they interact.",
            "Analyze the marketing strategy of 2-3 brands you admire (channels, messaging, funnel)."
          ],
          "resources": [
            { "title": "Google: Fundamentals of Digital Marketing (free)", "url": "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing", "resource_type": "course", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "SEO, Paid Ads & Marketing Analytics",
          "skill_name": "Performance Marketing (SEO/SEM/Ads)",
          "estimated_time": "8-10 weeks",
          "why": "Paid and organic acquisition channels are where measurable growth actually happens, and each has its own toolset and skill curve.",
          "prerequisites": ["Marketing Fundamentals"],
          "actions": [
            "Learn on-page/technical SEO and keyword research using free tools (Google Search Console, Ubersuggest).",
            "Run and optimize small paid campaigns on Google Ads and Meta Ads (even with a small personal budget).",
            "Set up Google Analytics 4 and learn to read conversion funnels and attribution reports."
          ],
          "resources": [
            { "title": "Google Skillshop: Google Ads Certifications", "url": "https://skillshop.withgoogle.com/", "resource_type": "course", "estimated_minutes": 250 },
            { "title": "Google Analytics Academy", "url": "https://analytics.google.com/analytics/academy/", "resource_type": "course", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Growth Experiment Capstone",
          "skill_name": "Analytics & Experimentation",
          "estimated_time": "6-8 weeks",
          "why": "A documented growth experiment (real or simulated) with hypothesis, execution, and measured results is the strongest hiring signal in this field.",
          "prerequisites": ["Performance Marketing (SEO/SEM/Ads)"],
          "actions": [
            "Run a real growth project: grow a personal blog, small business page, or side project's traffic/followers measurably.",
            "Document 3-5 growth experiments using a hypothesis → test → result → learning format.",
            "Build a simple dashboard tracking key metrics (CAC, conversion rate, retention) for the project."
          ],
          "resources": [
            { "title": "Reforge: Growth Series (free intro content)", "url": "https://www.reforge.com/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Channel Specialization & Interview Readiness",
          "skill_name": "Content & Copywriting",
          "estimated_time": "5-6 weeks",
          "why": "Employers hire for demonstrated depth in at least one channel, plus the ability to write compelling copy that supports every channel.",
          "prerequisites": ["Analytics & Experimentation"],
          "actions": [
            "Pick one channel (SEO, paid social, or content/email) and go deep with a portfolio case study.",
            "Practice writing ad copy, landing page copy, and email sequences with clear CTAs.",
            "Prepare to walk through your growth experiment case study in interviews with clear metrics."
          ],
          "resources": [
            { "title": "Copyhackers: Free Copywriting Resources", "url": "https://copyhackers.com/blog/", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        }
      ]
    }
  },
  {
    "slug": "actuary",
    "name": "Actuary",
    "sector": "Business & Finance",
    "description": "Uses mathematics, statistics, and financial theory to assess and manage risk for insurance, pensions, and financial institutions.",
    "recommended_subjects": "Mathematics, Statistics",
    "common_entrance_exams": "Institute of Actuaries of India (IAI) actuarial exams, JEE/CUET for underlying degree",
    "relevant_degrees": "B.Sc/B.Stat/B.A. Mathematics or Statistics, Actuarial Science degree",
    "typical_progression": "Actuarial Trainee → Associate Actuary (ASA/AIAI) → Fellow Actuary (FSA/FIAI) → Chief Actuary",
    "industry_sectors": "Life & General Insurance, Pension Funds, Reinsurance, Consulting Firms",
    "government_opportunities": "LIC, GIC, and other public sector insurance corporations",
    "higher_study_routes": "IAI/SOA/IFoA fellowship exams (the core credentialing path), M.Sc Actuarial Science",
    "skill_building_timeline": "5-7 years to full fellowship (working while studying)",
    "skills": [
      { "name": "Probability & Statistics", "priority": "core" },
      { "name": "Financial Mathematics", "priority": "core" },
      { "name": "Actuarial Modeling", "priority": "core" },
      { "name": "Risk & Insurance Principles", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.93,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Core Mathematics & First Actuarial Papers",
          "skill_name": "Probability & Statistics",
          "estimated_time": "6-9 months",
          "why": "The actuarial exam ladder starts with core probability, statistics, and financial mathematics — no shortcuts around this base.",
          "prerequisites": [],
          "actions": [
            "Register with the Institute of Actuaries of India (or SOA/IFoA) and begin the Core Mathematics (CT1-equivalent) papers.",
            "Master probability theory, statistical distributions, and financial mathematics (interest theory, annuities).",
            "Join a study group or take exam-prep coaching for the first 2-3 papers."
          ],
          "resources": [
            { "title": "Institute of Actuaries of India: Exam Syllabus", "url": "https://www.actuariesindia.org/", "resource_type": "doc", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Actuarial Modeling & Statistical Software",
          "skill_name": "Actuarial Modeling", 
          "estimated_time": "9-12 months",
          "why": "Progressing through the core technical papers (life contingencies, statistical modeling) requires comfort with actuarial software and Excel modeling.",
          "prerequisites": ["Probability & Statistics"],
          "actions": [
            "Continue clearing core technical exams covering life contingencies, statistical modeling, and financial economics.",
            "Learn Excel-based actuarial modeling and get introduced to R or Python for statistical work.",
            "Secure an actuarial trainee/analyst role at an insurer to start gaining paid work experience while studying."
          ],
          "resources": [
            { "title": "BeAnActuary: Exam Prep Resources", "url": "https://www.beanactuary.org/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "On-the-Job Reserving & Pricing Projects",
          "skill_name": "Risk & Insurance Principles",
          "estimated_time": "18-24 months",
          "why": "Real reserving, pricing, and risk analysis work as a trainee is what builds the practical judgment exams alone cannot teach.",
          "prerequisites": ["Actuarial Modeling"],
          "actions": [
            "Work on real pricing models for insurance products under senior actuary supervision.",
            "Contribute to reserving calculations and regulatory (IRDAI/Solvency) reporting.",
            "Continue clearing intermediate-to-advanced actuarial exams while working full-time."
          ],
          "resources": [
            { "title": "IRDAI: Regulatory Framework Overview", "url": "https://irdai.gov.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Specialization & Fellowship Track",
          "skill_name": "Financial Mathematics",
          "estimated_time": "24-36 months",
          "why": "Fellowship-level exams and choosing a specialization (life, general insurance, pensions) define your long-term earning and career trajectory.",
          "prerequisites": ["Risk & Insurance Principles"],
          "actions": [
            "Choose a specialization track (life insurance, general insurance, pensions, or health) for advanced exams.",
            "Clear the remaining fellowship-level papers to earn the FIAI/FSA/FIA designation.",
            "Take on progressively senior pricing/reserving responsibilities and mentor junior trainees."
          ],
          "resources": [
            { "title": "Society of Actuaries: Fellowship Tracks", "url": "https://www.soa.org/education/exam-req/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        }
      ]
    }
  },
  {
    "slug": "company-secretary",
    "name": "Company Secretary (CS)",
    "sector": "Business & Finance",
    "description": "Ensures corporate governance and statutory compliance, acting as the key link between a company's board, shareholders, and regulators.",
    "recommended_subjects": "Commerce, Business Studies",
    "common_entrance_exams": "ICSI CSEET, CS Executive, CS Professional",
    "relevant_degrees": "B.Com (parallel), CS is a professional certification via ICSI",
    "typical_progression": "CS Trainee → Assistant Company Secretary → Company Secretary → Head of Legal & Compliance / General Counsel",
    "industry_sectors": "Listed Companies, Law Firms, Corporate Advisory, Banking & NBFCs",
    "government_opportunities": "SEBI, Ministry of Corporate Affairs, PSU compliance departments",
    "higher_study_routes": "LLB alongside CS for combined legal-compliance roles, MBA for corporate strategy roles",
    "skill_building_timeline": "3-4 years including practical training",
    "skills": [
      { "name": "Company Law", "priority": "core" },
      { "name": "Corporate Governance & Compliance", "priority": "core" },
      { "name": "Securities Law", "priority": "core" },
      { "name": "Drafting & Documentation", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.93,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "class12",
          "title": "CSEET & Foundation Concepts",
          "skill_name": "Company Law",
          "estimated_time": "3-4 months",
          "why": "The CS Executive Entrance Test establishes baseline business, legal, and communication aptitude required to enter the ICSI program.",
          "prerequisites": [],
          "actions": [
            "Register with ICSI and clear the CS Executive Entrance Test (CSEET).",
            "Build foundational understanding of business environment, economics, and legal reasoning.",
            "Study basic constitutional and business law concepts relevant to corporate structures."
          ],
          "resources": [
            { "title": "ICSI Official Study Material", "url": "https://www.icsi.edu/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "CS Executive: Company & Securities Law",
          "skill_name": "Securities Law",
          "estimated_time": "10-12 months",
          "why": "Executive-level papers on company law, securities law, and tax build the direct technical toolkit used in compliance roles.",
          "prerequisites": ["Company Law"],
          "actions": [
            "Clear both groups of the CS Executive Programme covering Company Law, Securities Laws, Tax, and Economic Laws.",
            "Learn to draft board resolutions, minutes, and statutory registers.",
            "Study SEBI regulations relevant to listed company compliance (LODR, insider trading norms)."
          ],
          "resources": [
            { "title": "SEBI: LODR Regulations", "url": "https://www.sebi.gov.in/legal/regulations", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "Practical Training & Compliance Filings",
          "skill_name": "Corporate Governance & Compliance",
          "estimated_time": "12-15 months",
          "why": "ICSI's mandatory practical training under a practicing CS gives real exposure to ROC filings, board meetings, and compliance audits.",
          "prerequisites": ["Securities Law"],
          "actions": [
            "Complete the mandatory practical training (15-21 months) under a practicing Company Secretary or in a corporate secretarial department.",
            "Handle real ROC filings, annual return preparation, and board meeting documentation.",
            "Assist in a compliance audit or secretarial audit under supervision."
          ],
          "resources": [
            { "title": "Ministry of Corporate Affairs: MCA Portal", "url": "https://www.mca.gov.in/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "CS Professional & Membership",
          "skill_name": "Drafting & Documentation",
          "estimated_time": "8-10 months",
          "why": "Clearing the Professional Programme and enrolling as an ICSI member is what legally qualifies you to sign as a Company Secretary.",
          "prerequisites": ["Corporate Governance & Compliance"],
          "actions": [
            "Clear the CS Professional Programme covering advanced governance, resolution of corporate disputes, and secretarial audit.",
            "Enroll as an Associate Member of ICSI (ACS) upon completing training and exams.",
            "Apply for Company Secretary roles at listed companies, law firms, or advisory practices."
          ],
          "resources": [
            { "title": "ICSI: Professional Programme Details", "url": "https://www.icsi.edu/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "hr-business-partner",
    "name": "Human Resources (HR) Business Partner",
    "sector": "Business & Finance",
    "description": "Partners with business leaders on talent strategy, organizational design, employee relations, and performance management.",
    "recommended_subjects": "Psychology, Commerce, Business Studies",
    "common_entrance_exams": "CAT/CUET (for MBA), no fixed exam for direct entry",
    "relevant_degrees": "BBA, B.A. Psychology, MBA in Human Resources",
    "typical_progression": "HR Executive/Generalist → HR Business Partner → Senior HRBP → HR Director → Chief Human Resources Officer",
    "industry_sectors": "IT Services, Manufacturing, Startups, BFSI, Consulting",
    "government_opportunities": "PSU HR departments, government training institutes",
    "higher_study_routes": "MBA in HR, SHRM/CIPD certifications, M.A. in Industrial Psychology",
    "skill_building_timeline": "8-12 months dedicated practice",
    "skills": [
      { "name": "HR Fundamentals & Labor Law", "priority": "core" },
      { "name": "Talent Acquisition & Management", "priority": "core" },
      { "name": "Employee Relations", "priority": "core" },
      { "name": "People Analytics", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "HR Fundamentals & Labor Law Basics",
          "skill_name": "HR Fundamentals & Labor Law",
          "estimated_time": "5-6 weeks",
          "why": "HR decisions are constrained by labor law and organizational policy, so this legal/procedural grounding must come before strategic HR work.",
          "prerequisites": [],
          "actions": [
            "Study core HR functions: recruitment, onboarding, compensation, performance management.",
            "Learn key labor laws relevant to your country (e.g. Industrial Disputes Act, POSH Act in India).",
            "Understand HRIS systems and basic HR metrics (attrition rate, time-to-hire)."
          ],
          "resources": [
            { "title": "SHRM: Free HR Learning Resources", "url": "https://www.shrm.org/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Talent Acquisition & Performance Systems",
          "skill_name": "Talent Acquisition & Management",
          "estimated_time": "8-10 weeks",
          "why": "Hiring and performance management are the two highest-visibility HR processes and the ones early-career HR professionals own directly.",
          "prerequisites": ["HR Fundamentals & Labor Law"],
          "actions": [
            "Learn structured interviewing techniques and competency-based hiring frameworks.",
            "Study performance management systems (OKRs, 360-degree feedback) and how to run calibration sessions.",
            "Practice writing job descriptions and designing a basic interview scorecard."
          ],
          "resources": [
            { "title": "AIHR: Free HR Courses & Templates", "url": "https://www.aihr.com/resources/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "HR Project Capstone",
          "skill_name": "People Analytics",
          "estimated_time": "6-8 weeks",
          "why": "A completed people-analytics or process-improvement project shows you can move beyond HR administration into strategic HR.",
          "prerequisites": ["Talent Acquisition & Management"],
          "actions": [
            "Design and (if possible) run a mini engagement survey or exit-interview analysis for a real or simulated team.",
            "Build a simple people-analytics dashboard tracking attrition, hiring funnel conversion, or engagement scores.",
            "Write a short proposal recommending an HR process improvement based on your findings."
          ],
          "resources": [
            { "title": "People Analytics: A Practical Guide (free overview articles)", "url": "https://www.aihr.com/blog/people-analytics/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Employee Relations & Business Partnering Skills",
          "skill_name": "Employee Relations",
          "estimated_time": "6-8 weeks",
          "why": "HRBP interviews test conflict resolution and business-partnering judgment through scenario-based questions, not just policy knowledge.",
          "prerequisites": ["People Analytics"],
          "actions": [
            "Study conflict resolution frameworks and practice mock difficult-conversation scenarios.",
            "Learn how HRBPs partner with business leaders on org design and workforce planning.",
            "Prepare STAR-format stories covering hiring decisions, conflict resolution, and process improvements."
          ],
          "resources": [
            { "title": "CIPD: Employee Relations Factsheet", "url": "https://www.cipd.org/uk/knowledge/factsheets/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "supply-chain-logistics-analyst",
    "name": "Supply Chain & Logistics Analyst",
    "sector": "Business & Finance",
    "description": "Optimizes the flow of goods, inventory, and information across procurement, manufacturing, warehousing, and distribution.",
    "recommended_subjects": "Mathematics, Commerce, Operations",
    "common_entrance_exams": "CUET, CAT/CUET (for MBA)",
    "relevant_degrees": "B.Tech (Industrial/Mechanical), BBA, B.Com, MBA in Operations/Supply Chain",
    "typical_progression": "Supply Chain Analyst → Supply Chain Manager → Head of Operations → VP Supply Chain",
    "industry_sectors": "E-Commerce, Manufacturing, Retail, Logistics & 3PL, FMCG",
    "government_opportunities": "Food Corporation of India, Railways logistics divisions, Public Distribution System roles",
    "higher_study_routes": "MBA in Operations/Supply Chain, APICS/CSCP certification",
    "skill_building_timeline": "8-10 months dedicated practice",
    "skills": [
      { "name": "Operations & Inventory Management", "priority": "core" },
      { "name": "Data Analysis for Supply Chain", "priority": "core" },
      { "name": "Demand Forecasting", "priority": "core" },
      { "name": "ERP Systems", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Supply Chain & Operations Fundamentals",
          "skill_name": "Operations & Inventory Management",
          "estimated_time": "6-8 weeks",
          "why": "You must understand the physical flow of goods (procurement to delivery) before any data analysis on top of it makes sense.",
          "prerequisites": [],
          "actions": [
            "Study the end-to-end supply chain: procurement, production planning, warehousing, distribution.",
            "Learn inventory management concepts: EOQ, safety stock, ABC analysis, JIT.",
            "Map the supply chain of a real company (e.g. an FMCG or e-commerce brand) from raw material to customer."
          ],
          "resources": [
            { "title": "MIT: Supply Chain Management Free Resources (CTL.SC1x)", "url": "https://ctl.mit.edu/education/online-education", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Data Analysis, Forecasting & ERP Basics",
          "skill_name": "Data Analysis for Supply Chain",
          "estimated_time": "8-10 weeks",
          "why": "Supply chain decisions today are data-driven — forecasting demand and analyzing logistics data with Excel/SQL is a daily task.",
          "prerequisites": ["Operations & Inventory Management"],
          "actions": [
            "Learn Excel-based demand forecasting techniques (moving average, exponential smoothing).",
            "Get hands-on with SAP or a similar ERP system's supply chain modules.",
            "Practice basic SQL for querying inventory and shipment data."
          ],
          "resources": [
            { "title": "SAP Learning: Free Supply Chain Courses", "url": "https://learning.sap.com/", "resource_type": "course", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Supply Chain Optimization Capstone",
          "skill_name": "Demand Forecasting",
          "estimated_time": "6-8 weeks",
          "why": "A project demonstrating measurable cost or efficiency improvement is the clearest proof-of-work signal in operations roles.",
          "prerequisites": ["Data Analysis for Supply Chain"],
          "actions": [
            "Analyze a public logistics/retail dataset to identify inefficiencies (e.g. stockouts, excess inventory).",
            "Build a forecasting model and simulate its impact on inventory costs versus a naive baseline.",
            "Present findings as a report with clear before/after cost or efficiency metrics."
          ],
          "resources": [
            { "title": "Kaggle: Supply Chain Datasets", "url": "https://www.kaggle.com/datasets?search=supply+chain", "resource_type": "project", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Certification & Case Interview Prep",
          "skill_name": "ERP Systems",
          "estimated_time": "5-6 weeks",
          "why": "Recognized certifications and case-style interview prep (root-cause and trade-off reasoning) increase hiring odds for analyst roles.",
          "prerequisites": ["Demand Forecasting"],
          "actions": [
            "Pursue a foundational certification such as APICS CPIM if time and budget allow.",
            "Practice supply chain case interview questions (network design, make-vs-buy decisions).",
            "Review current industry disruptions (chip shortages, freight costs) and be ready to discuss trade-offs."
          ],
          "resources": [
            { "title": "ASCM (APICS): Certification Overview", "url": "https://www.ascm.org/certifications/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "wealth-manager-financial-planner",
    "name": "Wealth Manager / Financial Planner",
    "sector": "Business & Finance",
    "description": "Advises individuals and families on investment, tax, retirement, and estate planning to grow and protect their wealth.",
    "recommended_subjects": "Commerce, Mathematics, Economics",
    "common_entrance_exams": "NISM certifications, CFP exams, CUET (for degree)",
    "relevant_degrees": "B.Com, BBA, B.A. Economics; Certified Financial Planner (CFP) credential",
    "typical_progression": "Relationship Manager Trainee → Wealth Manager → Senior Relationship Manager → Head of Wealth Management",
    "industry_sectors": "Private Banks, Wealth Management Firms, Independent Financial Advisory, NBFCs",
    "government_opportunities": "Limited direct government roles; public sector bank wealth desks exist",
    "higher_study_routes": "CFP certification, MBA Finance, CFA for investment-focused roles",
    "skill_building_timeline": "8-12 months dedicated practice",
    "skills": [
      { "name": "Financial Planning Fundamentals", "priority": "core" },
      { "name": "Investment Products Knowledge", "priority": "core" },
      { "name": "Tax & Estate Planning", "priority": "core" },
      { "name": "Client Relationship Management", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Personal Finance & Investment Basics",
          "skill_name": "Financial Planning Fundamentals",
          "estimated_time": "5-6 weeks",
          "why": "Advisors must first master personal financial planning concepts (budgeting, goal-based planning, risk profiling) before recommending products.",
          "prerequisites": [],
          "actions": [
            "Study the financial planning process: goal setting, risk profiling, cash flow analysis.",
            "Learn the basics of asset classes: equity, debt, mutual funds, insurance, real estate.",
            "Build a sample financial plan for a hypothetical client with defined goals (retirement, education)."
          ],
          "resources": [
            { "title": "FPSB India: Financial Planning Curriculum Overview", "url": "https://www.fpsbindia.org/", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Investment Products & Regulatory Certifications",
          "skill_name": "Investment Products Knowledge",
          "estimated_time": "8-10 weeks",
          "why": "Selling or advising on investment products in most markets legally requires specific regulatory certifications, not just knowledge.",
          "prerequisites": ["Financial Planning Fundamentals"],
          "actions": [
            "Clear NISM certifications relevant to mutual funds, securities, and investment advisory (as applicable in India).",
            "Study mutual fund categories, portfolio construction basics, and insurance product structures in depth.",
            "Learn to use financial planning software or Excel-based tools for goal-based projections."
          ],
          "resources": [
            { "title": "NISM: Certification Examinations", "url": "https://www.nism.ac.in/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Full Financial Plan Capstone",
          "skill_name": "Tax & Estate Planning",
          "estimated_time": "6-8 weeks",
          "why": "A comprehensive financial plan covering tax, retirement, and estate considerations demonstrates end-to-end planning competence.",
          "prerequisites": ["Investment Products Knowledge"],
          "actions": [
            "Build a full comprehensive financial plan for a hypothetical family covering tax-saving investments, retirement corpus, and insurance needs.",
            "Study basic estate planning concepts: wills, nominations, and succession basics.",
            "Get feedback on the plan from a practicing CFP or wealth manager if possible."
          ],
          "resources": [
            { "title": "Income Tax Department: Tax Saving Investment Guide", "url": "https://www.incometax.gov.in/", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "CFP Progression & Client-Facing Skills",
          "skill_name": "Client Relationship Management",
          "estimated_time": "6-9 weeks",
          "why": "Wealth management is a trust-and-relationship business; interviews and on-the-job success hinge on communication skill as much as technical knowledge.",
          "prerequisites": ["Tax & Estate Planning"],
          "actions": [
            "Register for the Certified Financial Planner (CFP) program if pursuing an advisory-focused career.",
            "Practice client discovery conversations and objection handling through role play.",
            "Prepare to present your capstone financial plan clearly to a non-expert audience."
          ],
          "resources": [
            { "title": "CFP Board: Certification Process", "url": "https://www.cfp.net/get-certified", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "risk-management-analyst",
    "name": "Risk Management Analyst",
    "sector": "Business & Finance",
    "description": "Identifies, measures, and mitigates financial, credit, market, and operational risks for banks and financial institutions.",
    "recommended_subjects": "Mathematics, Statistics, Economics",
    "common_entrance_exams": "CUET, CAT/CUET (for MBA), FRM exams",
    "relevant_degrees": "B.Com/BBA/B.Sc Statistics/Mathematics, MBA Finance",
    "typical_progression": "Risk Analyst → Senior Risk Analyst → Risk Manager → Chief Risk Officer",
    "industry_sectors": "Banks, NBFCs, Insurance Companies, Rating Agencies, Fintech",
    "government_opportunities": "RBI, SEBI, NABARD risk and regulatory departments",
    "higher_study_routes": "FRM (Financial Risk Manager) certification, MBA Finance, M.Sc Risk Management",
    "skill_building_timeline": "9-12 months dedicated practice",
    "skills": [
      { "name": "Financial & Statistical Fundamentals", "priority": "core" },
      { "name": "Credit & Market Risk Modeling", "priority": "core" },
      { "name": "Regulatory Frameworks (Basel/RBI)", "priority": "core" },
      { "name": "Risk Reporting & Communication", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Finance, Statistics & Risk Concepts",
          "skill_name": "Financial & Statistical Fundamentals",
          "estimated_time": "6-8 weeks",
          "why": "Quantifying risk requires a strong statistics base plus a clear conceptual map of the different risk types banks manage.",
          "prerequisites": [],
          "actions": [
            "Study probability/statistics as applied to finance: distributions, standard deviation, correlation.",
            "Learn the taxonomy of financial risk: credit risk, market risk, operational risk, liquidity risk.",
            "Read a bank's annual report risk management section to see real disclosures."
          ],
          "resources": [
            { "title": "GARP: Introduction to Risk Management (free resources)", "url": "https://www.garp.org/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Risk Modeling & Regulatory Frameworks",
          "skill_name": "Credit & Market Risk Modeling",
          "estimated_time": "10-12 weeks",
          "why": "Risk analysts build and interpret models (credit scoring, VaR) that must comply with regulatory capital frameworks.",
          "prerequisites": ["Financial & Statistical Fundamentals"],
          "actions": [
            "Learn credit risk modeling basics: credit scoring, probability of default, loss given default.",
            "Study market risk measures like Value at Risk (VaR) and stress testing.",
            "Understand Basel III capital adequacy norms and RBI prudential regulations."
          ],
          "resources": [
            { "title": "Bank for International Settlements: Basel Framework", "url": "https://www.bis.org/basel_framework/", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Risk Analysis Capstone Project",
          "skill_name": "Risk Reporting & Communication",
          "estimated_time": "6-8 weeks",
          "why": "A concrete risk model built and explained clearly demonstrates both technical and communication skill needed on the job.",
          "prerequisites": ["Credit & Market Risk Modeling"],
          "actions": [
            "Build a simple credit scoring model in Excel or Python using a public loan default dataset.",
            "Calculate VaR for a sample portfolio and interpret the results.",
            "Write a concise risk report summarizing findings for a non-technical audience."
          ],
          "resources": [
            { "title": "Kaggle: Loan Default Prediction Datasets", "url": "https://www.kaggle.com/datasets?search=loan+default", "resource_type": "project", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "FRM Certification & Interview Preparation",
          "skill_name": "Regulatory Frameworks (Basel/RBI)",
          "estimated_time": "8-10 weeks",
          "why": "The FRM designation is the strongest recognized credential in risk management hiring and directly maps to interview content.",
          "prerequisites": ["Risk Reporting & Communication"],
          "actions": [
            "Register for and begin preparing for the FRM Part 1 exam.",
            "Practice technical interview questions on VaR, credit risk metrics, and regulatory capital.",
            "Stay current on recent regulatory changes (RBI circulars, Basel updates) relevant to interviews."
          ],
          "resources": [
            { "title": "GARP: FRM Program Overview", "url": "https://www.garp.org/frm", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "venture-capital-private-equity-analyst",
    "name": "Venture Capital / Private Equity Analyst",
    "sector": "Business & Finance",
    "description": "Evaluates and manages investments in private companies, from early-stage startups to mature buyout targets.",
    "recommended_subjects": "Mathematics, Economics, Commerce",
    "common_entrance_exams": "CAT/CUET (for MBA), CFA exams",
    "relevant_degrees": "B.Com/BBA/B.A. Economics, MBA Finance from a top-tier B-school",
    "typical_progression": "Analyst → Associate → Vice President/Principal → Partner",
    "industry_sectors": "Venture Capital Firms, Private Equity Firms, Family Offices, Corporate Venture Arms",
    "government_opportunities": "Limited; some roles in government-backed funds (e.g. SIDBI Fund of Funds)",
    "higher_study_routes": "MBA (top-tier), CFA charter, prior investment banking or consulting experience often required",
    "skill_building_timeline": "12-18 months plus MBA/prior experience",
    "skills": [
      { "name": "Financial Modeling & Valuation", "priority": "core" },
      { "name": "Market & Industry Analysis", "priority": "core" },
      { "name": "Due Diligence", "priority": "core" },
      { "name": "Deal Sourcing & Networking", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Finance Fundamentals & Startup Ecosystem Literacy",
          "skill_name": "Financial Modeling & Valuation",
          "estimated_time": "8-10 weeks",
          "why": "VC/PE analysts need core financial modeling skill plus fluency in how startups and buyout targets actually operate and raise capital.",
          "prerequisites": [],
          "actions": [
            "Build core financial modeling skills: three-statement models, cap tables, and basic LBO structures.",
            "Study startup funding stages (seed to Series D) and typical valuation methods for early-stage companies.",
            "Follow deal news and read 10-15 startup pitch decks (publicly available examples) to build pattern recognition."
          ],
          "resources": [
            { "title": "Y Combinator: Startup Library", "url": "https://www.ycombinator.com/library", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Market Analysis & Cap Table Mechanics",
          "skill_name": "Market & Industry Analysis",
          "estimated_time": "8-10 weeks",
          "why": "Sourcing and evaluating deals requires rigorous market-sizing and competitive analysis skills applied to nascent, data-scarce markets.",
          "prerequisites": ["Financial Modeling & Valuation"],
          "actions": [
            "Practice market sizing (TAM/SAM/SOM) exercises for hypothetical startup ideas.",
            "Learn cap table mechanics: dilution, liquidation preferences, option pools, SAFE notes.",
            "For PE-track: study LBO modeling, debt structuring, and operational value-creation levers."
          ],
          "resources": [
            { "title": "Carta: Equity 101 Guide", "url": "https://carta.com/learn/equity/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Investment Memo Capstone",
          "skill_name": "Due Diligence",
          "estimated_time": "8-10 weeks",
          "why": "Writing a full investment memo on a real company is the standard deliverable used to evaluate junior VC/PE hires.",
          "prerequisites": ["Market & Industry Analysis"],
          "actions": [
            "Pick a real startup or public company and write a full investment memo: market, team, product, financials, risks, recommendation.",
            "Conduct informal due diligence: customer reference calls (if possible), competitive landscape mapping, and unit economics analysis.",
            "Get the memo reviewed by someone with investing experience and iterate."
          ],
          "resources": [
            { "title": "Bessemer Venture Partners: Memo Templates & Frameworks", "url": "https://www.bvp.com/atlas", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Networking, Deal Sourcing & Interview Prep",
          "skill_name": "Deal Sourcing & Networking",
          "estimated_time": "8-12 weeks",
          "why": "VC/PE hiring is overwhelmingly relationship-driven; sourcing ability and network strength often outweigh raw technical skill for junior roles.",
          "prerequisites": ["Due Diligence"],
          "actions": [
            "Build relationships with founders/operators through informational interviews and startup events.",
            "Practice case-style interviews: 'pitch me a company you'd invest in' and 'walk me through this term sheet'.",
            "Consider gaining prior experience in investment banking, consulting, or founding a startup, which most funds prefer."
          ],
          "resources": [
            { "title": "Break Into VC: Interview Guide", "url": "https://breakintovc.com/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  }
]
  [
  {
    "slug": "mechanical-design-engineer",
    "name": "Mechanical Design Engineer",
    "sector": "Core Engineering",
    "description": "Designs, models, and validates mechanical components and systems for manufacturing, automotive, and industrial applications.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs",
    "relevant_degrees": "B.Tech/B.E. Mechanical Engineering",
    "typical_progression": "Design Engineer Trainee → Design Engineer → Senior Design Engineer → Design Lead / Chief Engineer",
    "industry_sectors": "Automotive, Manufacturing, Heavy Machinery, Consumer Products, Aerospace Suppliers",
    "government_opportunities": "DRDO, HAL, BHEL, Indian Railways design divisions",
    "higher_study_routes": "M.Tech in Design/CAD-CAM, MS in Mechanical Engineering",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Engineering Mechanics & Materials", "priority": "core" },
      { "name": "CAD Modeling", "priority": "core" },
      { "name": "FEA & Simulation", "priority": "core" },
      { "name": "GD&T and Manufacturing Knowledge", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.95,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Mechanics, Materials & Engineering Drawing",
          "skill_name": "Engineering Mechanics & Materials",
          "estimated_time": "8-10 weeks",
          "why": "Design decisions rest on statics, strength of materials, and material properties — these fundamentals must precede any CAD work.",
          "prerequisites": [],
          "actions": [
            "Master statics, dynamics, and strength of materials (stress, strain, bending, torsion).",
            "Learn material science basics: metals, polymers, composites and their mechanical properties.",
            "Practice reading and creating engineering drawings with proper dimensioning and tolerances."
          ],
          "resources": [
            { "title": "MIT OpenCourseWare: Mechanics & Materials I", "url": "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "3D CAD Modeling & Assembly Design",
          "skill_name": "CAD Modeling",
          "estimated_time": "10-12 weeks",
          "why": "CAD is the primary design interface; fluency in parametric modeling and assemblies is a baseline hiring requirement.",
          "prerequisites": ["Engineering Mechanics & Materials"],
          "actions": [
            "Learn parametric 3D modeling in SolidWorks or Fusion 360, including sketches, features, and assemblies.",
            "Practice creating detailed manufacturing drawings with GD&T annotations.",
            "Design a multi-part mechanical assembly (e.g. a gearbox or fixture) from scratch."
          ],
          "resources": [
            { "title": "SolidWorks Official Tutorials", "url": "https://www.solidworks.com/support/online-tutorials", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Simulation-Validated Design Capstone",
          "skill_name": "FEA & Simulation",
          "estimated_time": "8-10 weeks",
          "why": "A design validated with FEA/simulation, not just modeled, shows you can predict real-world performance before manufacturing.",
          "prerequisites": ["CAD Modeling"],
          "actions": [
            "Design a mechanical component or product addressing a real problem (e.g. a load-bearing bracket, a mechanism).",
            "Run FEA stress and deflection analysis using SolidWorks Simulation or ANSYS.",
            "Iterate the design based on simulation results and document the design rationale."
          ],
          "resources": [
            { "title": "ANSYS Innovation Courses (free)", "url": "https://courses.ansys.com/", "resource_type": "course", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Manufacturing Awareness & Interview Prep",
          "skill_name": "GD&T and Manufacturing Knowledge",
          "estimated_time": "6-8 weeks",
          "why": "A design that cannot be manufactured cost-effectively is useless; interviews test design-for-manufacturing judgment directly.",
          "prerequisites": ["FEA & Simulation"],
          "actions": [
            "Learn manufacturing process basics: machining, injection molding, sheet metal, casting, and their design constraints.",
            "Study GD&T (geometric dimensioning and tolerancing) in depth for interview and job readiness.",
            "Practice mechanical design interview questions and be ready to walk through your capstone project's design decisions."
          ],
          "resources": [
            { "title": "GD&T Basics: Free Reference Guide", "url": "https://www.gdandtbasics.com/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "civil-structural-engineer",
    "name": "Civil & Structural Engineer",
    "sector": "Core Engineering",
    "description": "Designs and oversees construction of buildings, bridges, and infrastructure, ensuring structural safety and regulatory compliance.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs, GATE (for higher study/PSU jobs)",
    "relevant_degrees": "B.Tech/B.E. Civil Engineering",
    "typical_progression": "Site Engineer / Design Trainee → Structural Engineer → Senior Structural Engineer → Chief Structural Engineer / Project Director",
    "industry_sectors": "Construction Firms, Infrastructure Development, Real Estate, Consulting Engineering Firms",
    "government_opportunities": "PWD, NHAI, Indian Railways, CPWD, State Housing Boards",
    "higher_study_routes": "M.Tech in Structural Engineering, MS in Civil Engineering, GATE for PSU recruitment",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Structural Analysis", "priority": "core" },
      { "name": "Design Codes & Standards", "priority": "core" },
      { "name": "Structural Design Software", "priority": "core" },
      { "name": "Construction Management Basics", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.95,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Structural Analysis & Mechanics of Materials",
          "skill_name": "Structural Analysis",
          "estimated_time": "8-10 weeks",
          "why": "Every structural design decision traces back to correctly analyzing forces, moments, and deflections in a structure.",
          "prerequisites": [],
          "actions": [
            "Master structural analysis of beams, trusses, and frames (determinate and indeterminate).",
            "Study reinforced concrete and steel structure fundamentals.",
            "Learn soil mechanics basics as they relate to foundation design."
          ],
          "resources": [
            { "title": "NPTEL: Structural Analysis", "url": "https://nptel.ac.in/courses/105105166", "resource_type": "course", "estimated_minutes": 500 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Design Codes & Structural Design Software",
          "skill_name": "Structural Design Software",
          "estimated_time": "10-12 weeks",
          "why": "Real structural design is governed by national codes (IS codes) and executed using standard analysis software, both required in practice.",
          "prerequisites": ["Structural Analysis"],
          "actions": [
            "Learn to use STAAD.Pro or ETABS for structural modeling and analysis.",
            "Study relevant design codes (IS 456 for RCC, IS 800 for steel) and apply them in manual calculations.",
            "Design a simple RCC or steel structural element (beam, column, slab) by hand and validate with software."
          ],
          "resources": [
            { "title": "Bentley/STAAD.Pro Learning Resources", "url": "https://www.bentley.com/software/staadpro/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Structural Design Capstone Project",
          "skill_name": "Design Codes & Standards",
          "estimated_time": "8-10 weeks",
          "why": "A full building or bridge design project, code-checked and drafted, is the concrete evidence employers expect from junior structural engineers.",
          "prerequisites": ["Structural Design Software"],
          "actions": [
            "Design the complete structural system for a small multi-story building (slabs, beams, columns, foundation).",
            "Prepare structural drawings and a design calculation report following code requirements.",
            "Perform a basic seismic load analysis and check the structure against relevant safety factors."
          ],
          "resources": [
            { "title": "IS 1893: Criteria for Earthquake Resistant Design (reference)", "url": "https://law.resource.org/pub/in/bis/S3/is.1893.1.2002.pdf", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Site Exposure, GATE & Interview Prep",
          "skill_name": "Construction Management Basics",
          "estimated_time": "6-8 weeks",
          "why": "Employers value candidates who understand construction execution realities, and GATE scores open PSU/government hiring routes.",
          "prerequisites": ["Design Codes & Standards"],
          "actions": [
            "Get site exposure through an internship to see design translate into construction execution.",
            "Prepare for GATE Civil Engineering if targeting PSU jobs or M.Tech admission.",
            "Practice interview questions on load calculations, code provisions, and site safety practices."
          ],
          "resources": [
            { "title": "GATE Civil Engineering: Official Syllabus", "url": "https://gate.iitb.ac.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "electrical-power-systems-engineer",
    "name": "Electrical & Power Systems Engineer",
    "sector": "Core Engineering",
    "description": "Designs and maintains power generation, transmission, and distribution systems, along with electrical equipment and controls.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Electrical Engineering",
    "typical_progression": "Graduate Engineer Trainee → Electrical Engineer → Senior Power Systems Engineer → Chief Electrical Engineer",
    "industry_sectors": "Power Utilities, Renewable Energy, Manufacturing, Electrical Equipment Manufacturers",
    "government_opportunities": "NTPC, Power Grid Corporation, State Electricity Boards, BHEL",
    "higher_study_routes": "M.Tech in Power Systems, MS in Electrical Engineering, GATE for PSU recruitment",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Circuit Theory & Electrical Machines", "priority": "core" },
      { "name": "Power Systems Analysis", "priority": "core" },
      { "name": "Protection & Control Systems", "priority": "core" },
      { "name": "Simulation Tools (MATLAB/ETAP)", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.94,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Circuits, Machines & Power Fundamentals",
          "skill_name": "Circuit Theory & Electrical Machines",
          "estimated_time": "8-10 weeks",
          "why": "Power systems engineering is built directly on circuit theory and the behavior of transformers, generators, and motors.",
          "prerequisites": [],
          "actions": [
            "Master AC/DC circuit analysis, three-phase systems, and power factor concepts.",
            "Study electrical machines: transformers, induction motors, synchronous generators.",
            "Learn the structure of the power grid: generation, transmission, sub-transmission, distribution."
          ],
          "resources": [
            { "title": "NPTEL: Electrical Machines", "url": "https://nptel.ac.in/courses/108105017", "resource_type": "course", "estimated_minutes": 500 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Power Systems Analysis & Simulation Tools",
          "skill_name": "Power Systems Analysis",
          "estimated_time": "10-12 weeks",
          "why": "Planning and operating a real grid requires load flow, fault, and stability analysis, done today primarily via simulation software.",
          "prerequisites": ["Circuit Theory & Electrical Machines"],
          "actions": [
            "Learn load flow analysis, short-circuit fault calculations, and per-unit system representation.",
            "Get hands-on with MATLAB/Simulink or ETAP for power system simulation.",
            "Study protection coordination concepts: relays, circuit breakers, fuses."
          ],
          "resources": [
            { "title": "MATLAB Simulink: Power Systems Tutorials", "url": "https://www.mathworks.com/solutions/power-electronics-control.html", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Power System Design Capstone",
          "skill_name": "Protection & Control Systems",
          "estimated_time": "8-10 weeks",
          "why": "A designed and simulated protection scheme for a sample power network proves practical competence beyond textbook theory.",
          "prerequisites": ["Power Systems Analysis"],
          "actions": [
            "Model a sample power distribution network in simulation software and run load flow analysis.",
            "Design a protection coordination scheme (relay settings, breaker sizing) for the network.",
            "Simulate a fault scenario and verify the protection scheme isolates it correctly."
          ],
          "resources": [
            { "title": "IEEE: Power System Protection Basics (open access papers)", "url": "https://www.ieee.org/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "PSU Exam Prep & Industry Certification",
          "skill_name": "Simulation Tools (MATLAB/ETAP)",
          "estimated_time": "6-9 weeks",
          "why": "The most common entry route into top electrical engineering employers (PSUs) runs through GATE scores and PSU-specific exams.",
          "prerequisites": ["Protection & Control Systems"],
          "actions": [
            "Prepare seriously for GATE Electrical Engineering to access PSU recruitment (NTPC, PGCIL, etc.).",
            "Study renewable energy integration basics (solar/wind grid connection challenges) as an increasingly relevant topic.",
            "Practice technical interview questions on transformer sizing, fault analysis, and grid stability."
          ],
          "resources": [
            { "title": "GATE Electrical Engineering: Official Syllabus", "url": "https://gate.iitb.ac.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "ece-vlsi-chip-design-engineer",
    "name": "Electronics & Communication Engineer (VLSI / Chip Design)",
    "sector": "Core Engineering",
    "description": "Designs integrated circuits and semiconductor chips, from RTL design through verification and physical layout.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, GATE",
    "relevant_degrees": "B.Tech/B.E. Electronics & Communication Engineering, M.Tech in VLSI Design",
    "typical_progression": "Design/Verification Engineer Trainee → RTL/Verification Engineer → Senior Design Engineer → Principal Engineer / Chip Architect",
    "industry_sectors": "Semiconductor Companies, Fabless Chip Design Firms, Telecom Equipment Manufacturers",
    "government_opportunities": "ISRO, DRDO, Semiconductor Laboratory (SCL), C-DAC chip design initiatives",
    "higher_study_routes": "M.Tech/MS in VLSI Design or Microelectronics, often near-mandatory for core design roles",
    "skill_building_timeline": "18-24 months including M.Tech-level specialization",
    "skills": [
      { "name": "Digital Logic Design", "priority": "core" },
      { "name": "HDL Programming (Verilog/VHDL)", "priority": "core" },
      { "name": "Chip Verification", "priority": "core" },
      { "name": "Physical Design Basics", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Digital Logic & Computer Architecture",
          "skill_name": "Digital Logic Design",
          "estimated_time": "8-10 weeks",
          "why": "Chip design is applied digital logic; understanding gates, FSMs, and processor architecture is the entry requirement.",
          "prerequisites": [],
          "actions": [
            "Master combinational and sequential digital logic design (gates, flip-flops, FSMs, counters).",
            "Study basic computer architecture: pipelining, memory hierarchy, instruction sets.",
            "Learn number systems and basic semiconductor device physics (diodes, transistors, CMOS)."
          ],
          "resources": [
            { "title": "NPTEL: Digital Circuits and Systems", "url": "https://nptel.ac.in/courses/117106086", "resource_type": "course", "estimated_minutes": 500 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "HDL Programming & RTL Design",
          "skill_name": "HDL Programming (Verilog/VHDL)",
          "estimated_time": "10-14 weeks",
          "why": "Verilog/VHDL is the language of chip design — every module from a CPU core to a peripheral is described and synthesized in HDL.",
          "prerequisites": ["Digital Logic Design"],
          "actions": [
            "Learn Verilog or VHDL and implement standard digital modules (ALU, FIFO, UART) at RTL level.",
            "Simulate designs using tools like ModelSim or open-source alternatives (Icarus Verilog).",
            "Understand synthesis flow: how RTL code maps to gate-level netlists."
          ],
          "resources": [
            { "title": "ChipVerify: Verilog Tutorial", "url": "https://www.chipverify.com/verilog/verilog-tutorial", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Processor/SoC Module Design Capstone",
          "skill_name": "Chip Verification",
          "estimated_time": "10-12 weeks",
          "why": "A verified, working RTL design (with a testbench proving correctness) is the core proof-of-work artifact chip design recruiters expect.",
          "prerequisites": ["HDL Programming (Verilog/VHDL)"],
          "actions": [
            "Design and implement a small RISC processor core or a complex peripheral module in RTL.",
            "Write comprehensive testbenches and verify functional correctness (consider learning basic UVM/SystemVerilog concepts).",
            "Document the design with block diagrams, waveforms, and a verification report."
          ],
          "resources": [
            { "title": "ASIC World: Verilog & Verification Tutorials", "url": "http://www.asic-world.com/", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "M.Tech Specialization & Physical Design Exposure",
          "skill_name": "Physical Design Basics",
          "estimated_time": "8-12 weeks (plus M.Tech duration if pursued)",
          "why": "Most VLSI hiring at established semiconductor firms expects an M.Tech specialization plus baseline exposure to the physical design (layout) flow.",
          "prerequisites": ["Chip Verification"],
          "actions": [
            "Pursue an M.Tech in VLSI Design or a specialized post-graduate diploma if targeting core design roles.",
            "Get introductory exposure to the physical design flow: floorplanning, placement, routing, timing closure.",
            "Prepare for VLSI-specific technical interviews (STA, CMOS logic questions, RTL design puzzles)."
          ],
          "resources": [
            { "title": "GATE Electronics Engineering: Official Syllabus", "url": "https://gate.iitb.ac.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "robotics-automation-engineer",
    "name": "Robotics & Automation Engineer",
    "sector": "Core Engineering",
    "description": "Designs and programs robotic systems and automated manufacturing lines that sense, decide, and act in physical environments.",
    "recommended_subjects": "Physics, Mathematics, Computer Science",
    "common_entrance_exams": "JEE Main, JEE Advanced, GATE",
    "relevant_degrees": "B.Tech/B.E. Mechatronics, Robotics, Mechanical, or Electrical Engineering",
    "typical_progression": "Robotics Engineer Trainee → Robotics/Automation Engineer → Senior Robotics Engineer → Robotics Systems Architect",
    "industry_sectors": "Manufacturing Automation, Warehousing/Logistics Robotics, Autonomous Vehicles, Industrial Automation",
    "government_opportunities": "DRDO robotics labs, ISRO robotics divisions, C-DAC automation projects",
    "higher_study_routes": "M.Tech/MS in Robotics or Mechatronics",
    "skill_building_timeline": "14-18 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Mechatronics Fundamentals", "priority": "core" },
      { "name": "Robot Kinematics & Control", "priority": "core" },
      { "name": "ROS & Programming", "priority": "core" },
      { "name": "Computer Vision for Robotics", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Mechatronics & Control Systems Fundamentals",
          "skill_name": "Mechatronics Fundamentals",
          "estimated_time": "8-10 weeks",
          "why": "Robotics sits at the intersection of mechanical design, electronics, and control theory — all three must be minimally solid.",
          "prerequisites": [],
          "actions": [
            "Learn control systems basics: transfer functions, PID control, feedback loops.",
            "Study sensors and actuators commonly used in robotics (encoders, IMUs, servo/stepper motors).",
            "Build a simple microcontroller-based mechatronic project (line follower, obstacle avoider)."
          ],
          "resources": [
            { "title": "NPTEL: Control Engineering", "url": "https://nptel.ac.in/courses/108106098", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Kinematics, ROS & Programming",
          "skill_name": "ROS & Programming",
          "estimated_time": "10-14 weeks",
          "why": "ROS (Robot Operating System) is the industry-standard framework, and kinematics is how you mathematically describe robot motion.",
          "prerequisites": ["Mechatronics Fundamentals"],
          "actions": [
            "Learn forward/inverse kinematics for robotic arms and mobile robot motion models.",
            "Get hands-on with ROS/ROS2: nodes, topics, services, and simulation in Gazebo.",
            "Program a simulated robot to perform basic navigation or manipulation tasks."
          ],
          "resources": [
            { "title": "ROS Official Tutorials", "url": "https://wiki.ros.org/ROS/Tutorials", "resource_type": "doc", "estimated_minutes": 350 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Autonomous Robot Capstone",
          "skill_name": "Robot Kinematics & Control",
          "estimated_time": "10-12 weeks",
          "why": "A working robot (real or simulated) performing autonomous navigation or manipulation is the clearest hands-on proof of robotics competence.",
          "prerequisites": ["ROS & Programming"],
          "actions": [
            "Build a robot (physical or in Gazebo/simulation) that autonomously navigates an environment using SLAM.",
            "Implement path planning algorithms (A*, RRT) for obstacle avoidance.",
            "Document the full system architecture: sensors, control loop, and software stack."
          ],
          "resources": [
            { "title": "SLAM Tutorial: Fundamentals (open resources)", "url": "https://www.cs.cmu.edu/~16831-f14/notes/F14/16831_lecture21_gseyfarth.pdf", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Computer Vision Integration & Interview Prep",
          "skill_name": "Computer Vision for Robotics",
          "estimated_time": "8-10 weeks",
          "why": "Modern robotics roles increasingly require perception (computer vision) skills layered on top of classical control and planning.",
          "prerequisites": ["Robot Kinematics & Control"],
          "actions": [
            "Add basic computer vision (object detection, depth sensing) to your capstone project using OpenCV.",
            "Study common robotics interview topics: sensor fusion, control loop tuning, real-time systems constraints.",
            "Contribute to or study an open-source robotics project on GitHub to see production-grade architecture."
          ],
          "resources": [
            { "title": "OpenCV Official Tutorials", "url": "https://docs.opencv.org/4.x/d9/df8/tutorial_root.html", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        }
      ]
    }
  },
  {
    "slug": "aerospace-aeronautical-engineer",
    "name": "Aerospace / Aeronautical Engineer",
    "sector": "Core Engineering",
    "description": "Designs and analyzes aircraft, spacecraft, and propulsion systems, working across aerodynamics, structures, and propulsion.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, GATE, ISRO/DRDO recruitment exams",
    "relevant_degrees": "B.Tech/B.E. Aerospace/Aeronautical Engineering",
    "typical_progression": "Graduate Engineer Trainee → Design/Analysis Engineer → Senior Engineer → Chief Design Engineer / Program Manager",
    "industry_sectors": "ISRO, HAL, Private Aerospace Startups, Commercial Aviation MRO, Defence Manufacturing",
    "government_opportunities": "ISRO, DRDO, HAL, Indian Air Force technical branches",
    "higher_study_routes": "M.Tech/MS in Aerospace Engineering, specialized propulsion or avionics programs",
    "skill_building_timeline": "14-18 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Aerodynamics & Fluid Mechanics", "priority": "core" },
      { "name": "Structural Analysis for Aerospace", "priority": "core" },
      { "name": "Propulsion Systems", "priority": "core" },
      { "name": "Simulation Tools (CFD/FEA)", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Aerodynamics & Flight Mechanics Fundamentals",
          "skill_name": "Aerodynamics & Fluid Mechanics",
          "estimated_time": "8-10 weeks",
          "why": "Every aerospace design decision depends on understanding how air flows over a body and generates lift, drag, and stability behavior.",
          "prerequisites": [],
          "actions": [
            "Study fluid mechanics fundamentals and incompressible/compressible aerodynamics.",
            "Learn flight mechanics: lift, drag, stability, and control surfaces.",
            "Understand basic orbital mechanics if targeting a spacecraft-focused specialization."
          ],
          "resources": [
            { "title": "NPTEL: Introduction to Aerospace Engineering", "url": "https://nptel.ac.in/courses/101106114", "resource_type": "course", "estimated_minutes": 500 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Structures, Propulsion & Simulation Tools",
          "skill_name": "Structural Analysis for Aerospace",
          "estimated_time": "10-14 weeks",
          "why": "Aircraft/spacecraft structures must be light yet strong, and propulsion systems must be modeled precisely — both require simulation tool fluency.",
          "prerequisites": ["Aerodynamics & Fluid Mechanics"],
          "actions": [
            "Study aerospace structures: composite materials, load paths, fatigue analysis.",
            "Learn propulsion fundamentals: jet engines, rocket propulsion basics, thrust equations.",
            "Get hands-on with CFD tools (ANSYS Fluent/OpenFOAM) and structural FEA for aerospace components."
          ],
          "resources": [
            { "title": "NASA: Beginner's Guide to Aerodynamics", "url": "https://www.grc.nasa.gov/www/k-12/airplane/short.html", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Aerospace Design Capstone",
          "skill_name": "Simulation Tools (CFD/FEA)",
          "estimated_time": "10-12 weeks",
          "why": "A conceptually designed and simulated aircraft/UAV component demonstrates practical application of aerodynamics and structures theory together.",
          "prerequisites": ["Structural Analysis for Aerospace"],
          "actions": [
            "Design a small UAV or aircraft wing/component and run CFD analysis on its aerodynamic performance.",
            "Perform structural analysis on a key component to validate it withstands expected loads.",
            "Consider joining a student rocketry, UAV, or SAE Aero Design competition team for hands-on validation."
          ],
          "resources": [
            { "title": "SAE Aero Design Competition Rules & Resources", "url": "https://www.sae.org/attend/student-events/aero-design-east", "resource_type": "project", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "ISRO/DRDO Exam Prep & Interview Readiness",
          "skill_name": "Propulsion Systems",
          "estimated_time": "8-12 weeks",
          "why": "Government aerospace institutions (ISRO, DRDO, HAL) hire through structured written exams and technical interviews, the primary entry route in India.",
          "prerequisites": ["Simulation Tools (CFD/FEA)"],
          "actions": [
            "Prepare for ISRO Scientist/Engineer recruitment exams or GATE Aerospace for M.Tech/PSU pathways.",
            "Review core subjects deeply for technical interviews: aerodynamics, propulsion, structures, and materials.",
            "Stay updated on current space missions and aerospace industry developments relevant to interview discussions."
          ],
          "resources": [
            { "title": "ISRO: Careers & Recruitment", "url": "https://www.isro.gov.in/Careers.html", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "chemical-process-engineer",
    "name": "Chemical & Process Engineer",
    "sector": "Core Engineering",
    "description": "Designs and optimizes chemical processes and plants for producing fuels, chemicals, pharmaceuticals, and other materials at scale.",
    "recommended_subjects": "Chemistry, Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, GATE",
    "relevant_degrees": "B.Tech/B.E. Chemical Engineering",
    "typical_progression": "Process Engineer Trainee → Process Engineer → Senior Process Engineer → Plant Manager / Process Design Lead",
    "industry_sectors": "Oil & Gas, Petrochemicals, Pharmaceuticals, Fertilizers, Specialty Chemicals",
    "government_opportunities": "IOCL, ONGC, GAIL, HPCL, BPCL, NTPC (process divisions)",
    "higher_study_routes": "M.Tech in Chemical Engineering, MS in Process Engineering, GATE for PSU recruitment",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Chemical Process Fundamentals", "priority": "core" },
      { "name": "Mass & Energy Balances", "priority": "core" },
      { "name": "Process Simulation", "priority": "core" },
      { "name": "Plant Safety & HAZOP", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.93,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Mass/Energy Balances & Thermodynamics",
          "skill_name": "Mass & Energy Balances", 
          "estimated_time": "8-10 weeks",
          "why": "Every process calculation, from a simple mixer to an entire refinery, starts with rigorous mass and energy balance accounting.",
          "prerequisites": [],
          "actions": [
            "Master mass and energy balance calculations for steady-state and unsteady-state processes.",
            "Study chemical engineering thermodynamics: phase equilibria, reaction equilibria.",
            "Learn fluid mechanics and heat/mass transfer fundamentals as applied to process equipment."
          ],
          "resources": [
            { "title": "NPTEL: Chemical Engineering Thermodynamics", "url": "https://nptel.ac.in/courses/103105134", "resource_type": "course", "estimated_minutes": 500 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Unit Operations & Process Simulation Software",
          "skill_name": "Process Simulation",
          "estimated_time": "10-12 weeks",
          "why": "Real plant design work happens in process simulators that model unit operations (distillation, reactors, heat exchangers) end to end.",
          "prerequisites": ["Mass & Energy Balances"],
          "actions": [
            "Study core unit operations: distillation, absorption, heat exchangers, reactors.",
            "Learn to build process flow diagrams and simulate them in Aspen Plus or DWSIM.",
            "Size a heat exchanger or distillation column manually and verify against simulation output."
          ],
          "resources": [
            { "title": "DWSIM: Open Source Process Simulator Documentation", "url": "https://dwsim.org/wiki/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Process Design Capstone",
          "skill_name": "Chemical Process Fundamentals",
          "estimated_time": "8-10 weeks",
          "why": "Designing an entire process flowsheet with equipment sizing demonstrates the integrated skill set process engineering jobs require.",
          "prerequisites": ["Process Simulation"],
          "actions": [
            "Design a complete process flowsheet for a simple chemical production process (e.g. ethanol production, water treatment).",
            "Size major equipment (reactors, columns, heat exchangers) and estimate utility requirements.",
            "Prepare a process design report including P&ID diagrams and a basic cost estimate."
          ],
          "resources": [
            { "title": "AIChE: Student Resources", "url": "https://www.aiche.org/community/students", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Process Safety & PSU Exam Preparation",
          "skill_name": "Plant Safety & HAZOP",
          "estimated_time": "6-9 weeks",
          "why": "Process safety competence (HAZOP, risk assessment) is mandatory in hazardous chemical industries, and GATE remains the main PSU hiring gateway.",
          "prerequisites": ["Chemical Process Fundamentals"],
          "actions": [
            "Learn process safety fundamentals: HAZOP studies, risk assessment, and safety instrumented systems.",
            "Prepare for GATE Chemical Engineering for PSU (IOCL, GAIL, ONGC) recruitment pathways.",
            "Practice technical interview questions on distillation design, reactor selection, and safety incidents case studies."
          ],
          "resources": [
            { "title": "GATE Chemical Engineering: Official Syllabus", "url": "https://gate.iitb.ac.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "environmental-engineer",
    "name": "Environmental Engineer",
    "sector": "Core Engineering",
    "description": "Designs systems and policies to manage water, air quality, waste, and pollution control while ensuring environmental compliance.",
    "recommended_subjects": "Chemistry, Biology, Physics",
    "common_entrance_exams": "JEE Main, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Environmental/Civil Engineering, M.Tech in Environmental Engineering",
    "typical_progression": "Environmental Engineer Trainee → Environmental Engineer → Senior Environmental Consultant → Environmental Program Manager",
    "industry_sectors": "Environmental Consulting, Water & Wastewater Utilities, Manufacturing (compliance), Government Pollution Boards",
    "government_opportunities": "Central & State Pollution Control Boards, Ministry of Environment, NGT-linked compliance roles",
    "higher_study_routes": "M.Tech/MS in Environmental Engineering, M.Sc Environmental Science",
    "skill_building_timeline": "10-14 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Environmental Science Fundamentals", "priority": "core" },
      { "name": "Water & Wastewater Treatment", "priority": "core" },
      { "name": "Environmental Regulations & Compliance", "priority": "core" },
      { "name": "Environmental Impact Assessment", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Environmental Science & Chemistry Fundamentals",
          "skill_name": "Environmental Science Fundamentals",
          "estimated_time": "6-8 weeks",
          "why": "Understanding ecosystems, pollutant behavior, and environmental chemistry underpins every downstream engineering solution.",
          "prerequisites": [],
          "actions": [
            "Study environmental chemistry: water quality parameters, air pollutants, soil contamination basics.",
            "Learn ecosystem and environmental science fundamentals relevant to pollution impact.",
            "Review India's key environmental laws: Water Act, Air Act, Environment Protection Act."
          ],
          "resources": [
            { "title": "NPTEL: Environmental Engineering", "url": "https://nptel.ac.in/courses/105105048", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Water/Wastewater Treatment & Air Pollution Control",
          "skill_name": "Water & Wastewater Treatment",
          "estimated_time": "10-12 weeks",
          "why": "Treatment plant design (water, wastewater, air scrubbing) is the core technical work most environmental engineers do day to day.",
          "prerequisites": ["Environmental Science Fundamentals"],
          "actions": [
            "Study water and wastewater treatment processes: coagulation, filtration, activated sludge systems.",
            "Learn air pollution control technologies: scrubbers, electrostatic precipitators, baghouses.",
            "Learn to read and interpret environmental monitoring data (BOD, COD, AQI)."
          ],
          "resources": [
            { "title": "EPA: Wastewater Treatment Technology Fact Sheets", "url": "https://www.epa.gov/npdes/npdes-wastewater-treatment-technology-fact-sheets", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Environmental Impact Assessment Capstone",
          "skill_name": "Environmental Impact Assessment",
          "estimated_time": "8-10 weeks",
          "why": "Writing a full EIA-style report for a real or hypothetical project demonstrates the exact regulatory-technical deliverable used in industry.",
          "prerequisites": ["Water & Wastewater Treatment"],
          "actions": [
            "Design a small-scale treatment system (e.g. a wastewater treatment unit for a housing complex).",
            "Conduct a mock Environmental Impact Assessment for a hypothetical industrial or infrastructure project.",
            "Present recommendations for mitigation measures and compliance monitoring plans."
          ],
          "resources": [
            { "title": "Ministry of Environment, Forest and Climate Change: EIA Notification", "url": "https://moef.gov.in/", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Regulatory Certification & Interview Prep",
          "skill_name": "Environmental Regulations & Compliance",
          "estimated_time": "6-8 weeks",
          "why": "Environmental engineering hiring, especially in consulting and PCB roles, weighs regulatory knowledge and compliance experience heavily.",
          "prerequisites": ["Environmental Impact Assessment"],
          "actions": [
            "Study the detailed compliance and permitting process for industries under state Pollution Control Boards.",
            "Consider pursuing an internship with a Pollution Control Board or environmental consultancy.",
            "Practice interview questions on treatment process selection and regulatory compliance scenarios."
          ],
          "resources": [
            { "title": "Central Pollution Control Board: Guidelines", "url": "https://cpcb.nic.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "automobile-ev-powertrain-engineer",
    "name": "Automobile & EV Powertrain Engineer",
    "sector": "Core Engineering",
    "description": "Designs and develops vehicle powertrains, including internal combustion and electric drive systems, batteries, and controls.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Mechanical/Automobile/Electrical Engineering",
    "typical_progression": "Graduate Engineer Trainee → Powertrain Engineer → Senior Powertrain Engineer → Powertrain Systems Lead",
    "industry_sectors": "Automotive OEMs, EV Startups, Battery Manufacturers, Auto Component Suppliers",
    "government_opportunities": "ARAI, ICAT (vehicle testing agencies), public sector EV mission initiatives",
    "higher_study_routes": "M.Tech in Automotive/Thermal Engineering, MS in Electric Vehicle Engineering",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Thermodynamics & IC Engine Fundamentals", "priority": "core" },
      { "name": "EV Powertrain & Battery Systems", "priority": "core" },
      { "name": "Vehicle Dynamics", "priority": "core" },
      { "name": "Powertrain Simulation Tools", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Thermodynamics, IC Engines & Vehicle Basics",
          "skill_name": "Thermodynamics & IC Engine Fundamentals",
          "estimated_time": "8-10 weeks",
          "why": "Even for EV-focused careers, understanding conventional powertrains and vehicle-level thermodynamics grounds the engineering context.",
          "prerequisites": [],
          "actions": [
            "Study internal combustion engine fundamentals: thermodynamic cycles, combustion, emissions.",
            "Learn basic vehicle dynamics: traction, braking, and load distribution.",
            "Understand transmission systems and drivetrain layouts (FWD, RWD, AWD)."
          ],
          "resources": [
            { "title": "NPTEL: IC Engines and Gas Turbines", "url": "https://nptel.ac.in/courses/112104033", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "EV Powertrain, Batteries & Motor Control",
          "skill_name": "EV Powertrain & Battery Systems",
          "estimated_time": "10-14 weeks",
          "why": "Electric mobility is the fastest-growing segment, and it requires understanding batteries, motors, and their control electronics specifically.",
          "prerequisites": ["Thermodynamics & IC Engine Fundamentals"],
          "actions": [
            "Study EV powertrain architecture: battery packs, BMS, motor types (PMSM, induction), and inverters.",
            "Learn battery chemistry basics (Li-ion characteristics), thermal management, and charging systems.",
            "Get hands-on with EV powertrain simulation using MATLAB/Simulink."
          ],
          "resources": [
            { "title": "MATLAB Simulink: EV/Battery Modeling Resources", "url": "https://www.mathworks.com/solutions/electrification.html", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "EV Powertrain Design Capstone",
          "skill_name": "Vehicle Dynamics",
          "estimated_time": "8-10 weeks",
          "why": "A sized and simulated EV powertrain (motor, battery, controller) for a defined vehicle use case shows applied competence, not just theory.",
          "prerequisites": ["EV Powertrain & Battery Systems"],
          "actions": [
            "Size a motor and battery pack for a defined vehicle application (e.g. a two-wheeler or small car).",
            "Simulate the vehicle's performance (range, acceleration) under different drive cycles.",
            "Consider joining a Formula Student EV or student EV conversion project for hands-on experience."
          ],
          "resources": [
            { "title": "Formula Student / Formula Bharat: Team Resources", "url": "https://www.formulabharat.com/", "resource_type": "project", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Industry Standards & Interview Preparation",
          "skill_name": "Powertrain Simulation Tools",
          "estimated_time": "6-8 weeks",
          "why": "EV hiring interviews focus on battery management, thermal safety, and regulatory testing standards specific to the automotive industry.",
          "prerequisites": ["Vehicle Dynamics"],
          "actions": [
            "Study relevant vehicle testing and safety standards (AIS standards in India, battery safety norms).",
            "Practice interview questions on battery degradation, thermal runaway, and motor control strategies.",
            "Follow current EV industry developments (battery chemistry advances, charging infrastructure) for interview readiness."
          ],
          "resources": [
            { "title": "ARAI: Automotive Research Association of India", "url": "https://www.araiindia.com/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "industrial-production-engineer",
    "name": "Industrial & Production Engineer",
    "sector": "Core Engineering",
    "description": "Optimizes manufacturing processes, production planning, and plant layout to maximize efficiency, quality, and throughput.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Industrial/Production/Mechanical Engineering",
    "typical_progression": "Production Engineer Trainee → Production/Industrial Engineer → Senior Manufacturing Engineer → Plant Operations Manager",
    "industry_sectors": "Manufacturing, Automotive, FMCG, Electronics Assembly, Process Industries",
    "government_opportunities": "PSU manufacturing units (BHEL, HAL, Railways production units)",
    "higher_study_routes": "M.Tech in Industrial Engineering, MBA in Operations Management",
    "skill_building_timeline": "10-14 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Manufacturing Processes", "priority": "core" },
      { "name": "Lean Manufacturing & Six Sigma", "priority": "core" },
      { "name": "Production Planning & Scheduling", "priority": "core" },
      { "name": "Quality Control Statistics", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Manufacturing Processes & Plant Layout",
          "skill_name": "Manufacturing Processes",
          "estimated_time": "6-8 weeks",
          "why": "Optimizing a production system requires first understanding the actual manufacturing processes and how a plant is physically laid out.",
          "prerequisites": [],
          "actions": [
            "Study core manufacturing processes: machining, casting, forming, welding, assembly.",
            "Learn plant layout principles: process layout, product layout, cellular manufacturing.",
            "Visit or study case studies of a real manufacturing facility's workflow."
          ],
          "resources": [
            { "title": "NPTEL: Manufacturing Processes I & II", "url": "https://nptel.ac.in/courses/112105126", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Lean Manufacturing, Six Sigma & Quality Tools",
          "skill_name": "Lean Manufacturing & Six Sigma",
          "estimated_time": "8-10 weeks",
          "why": "Lean and Six Sigma are the dominant methodologies used worldwide to reduce waste and variability in production systems.",
          "prerequisites": ["Manufacturing Processes"],
          "actions": [
            "Study Lean manufacturing principles: value stream mapping, 5S, kaizen, kanban.",
            "Learn Six Sigma DMAIC methodology and basic statistical process control tools.",
            "Practice value stream mapping on a real or hypothetical production line."
          ],
          "resources": [
            { "title": "ASQ: Lean Six Sigma Free Resources", "url": "https://asq.org/quality-resources/lean", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Process Improvement Capstone",
          "skill_name": "Quality Control Statistics",
          "estimated_time": "6-8 weeks",
          "why": "A quantified before/after process improvement project is exactly the kind of evidence hiring managers in manufacturing want to see.",
          "prerequisites": ["Lean Manufacturing & Six Sigma"],
          "actions": [
            "Identify a real inefficiency (in an internship, a college workshop, or a case study dataset) and apply Lean/Six Sigma tools to it.",
            "Use statistical process control charts to analyze quality/defect data.",
            "Document the project with clear before/after metrics (cycle time, defect rate, throughput)."
          ],
          "resources": [
            { "title": "iSixSigma: Free Templates & Case Studies", "url": "https://www.isixsigma.com/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Certification & Production Planning Interview Prep",
          "skill_name": "Production Planning & Scheduling",
          "estimated_time": "6-8 weeks",
          "why": "Recognized certifications (Lean Six Sigma Green Belt) and comfort with production scheduling concepts are what hiring managers screen for.",
          "prerequisites": ["Quality Control Statistics"],
          "actions": [
            "Pursue a Lean Six Sigma Green Belt certification if time/budget allow.",
            "Study production planning and scheduling concepts: MRP, capacity planning, line balancing.",
            "Practice interview questions on process improvement case studies and root-cause analysis (5 Whys, fishbone diagrams)."
          ],
          "resources": [
            { "title": "GATE Industrial Engineering: Official Syllabus", "url": "https://gate.iitb.ac.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "biomedical-engineer",
    "name": "Biomedical Engineer",
    "sector": "Core Engineering",
    "description": "Designs medical devices, diagnostic equipment, and healthcare technology by combining engineering principles with biological systems.",
    "recommended_subjects": "Biology, Physics, Mathematics",
    "common_entrance_exams": "JEE Main, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Biomedical Engineering, M.Tech in Biomedical/Medical Devices Engineering",
    "typical_progression": "R&D Engineer Trainee → Biomedical Engineer → Senior R&D Engineer → Medical Device Product Lead",
    "industry_sectors": "Medical Device Manufacturers, Hospitals (clinical engineering), Diagnostics Companies, MedTech Startups",
    "government_opportunities": "AIIMS biomedical engineering departments, DRDO medical technology labs, ICMR research projects",
    "higher_study_routes": "M.Tech/MS in Biomedical Engineering, MS in Medical Device Design",
    "skill_building_timeline": "12-16 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Human Physiology & Anatomy", "priority": "core" },
      { "name": "Medical Instrumentation", "priority": "core" },
      { "name": "Signal Processing", "priority": "core" },
      { "name": "Regulatory Affairs (Medical Devices)", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.89,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Physiology, Anatomy & Instrumentation Basics",
          "skill_name": "Human Physiology & Anatomy",
          "estimated_time": "8-10 weeks",
          "why": "Designing medical devices requires understanding the biological systems they interact with — the engineering must serve the physiology.",
          "prerequisites": [],
          "actions": [
            "Study human physiology and anatomy relevant to medical device applications (cardiovascular, neural, musculoskeletal systems).",
            "Learn basic principles of biomedical instrumentation: sensors, transducers, biopotential measurement.",
            "Study biomaterials basics as they relate to implantable and diagnostic devices."
          ],
          "resources": [
            { "title": "NPTEL: Introduction to Biomedical Engineering", "url": "https://nptel.ac.in/courses/102106090", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Signal Processing & Medical Device Design",
          "skill_name": "Signal Processing",
          "estimated_time": "10-12 weeks",
          "why": "Extracting meaningful clinical information from noisy biosignals (ECG, EEG) is a core technical task in biomedical engineering.",
          "prerequisites": ["Human Physiology & Anatomy"],
          "actions": [
            "Learn digital signal processing fundamentals as applied to biosignals (filtering, FFT).",
            "Analyze real ECG/EEG datasets using Python or MATLAB to extract features.",
            "Study the design process for a simple medical device (e.g. a pulse oximeter or basic ECG monitor)."
          ],
          "resources": [
            { "title": "PhysioNet: Open Biomedical Signal Datasets", "url": "https://physionet.org/", "resource_type": "project", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Medical Device Prototype Capstone",
          "skill_name": "Medical Instrumentation",
          "estimated_time": "8-10 weeks",
          "why": "A working prototype device (even a simple one) that measures a real physiological signal proves you can bridge engineering and clinical needs.",
          "prerequisites": ["Signal Processing"],
          "actions": [
            "Build a simple biomedical device prototype (e.g. a heart rate monitor or temperature sensor) using a microcontroller.",
            "Process and visualize the collected physiological data with basic signal processing techniques.",
            "Document design constraints considered: patient safety, accuracy, and usability."
          ],
          "resources": [
            { "title": "Arduino: Health & Biomedical Project Examples", "url": "https://docs.arduino.cc/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Regulatory Awareness & Interview Prep",
          "skill_name": "Regulatory Affairs (Medical Devices)",
          "estimated_time": "6-8 weeks",
          "why": "Medical devices are heavily regulated; understanding compliance (CDSCO in India, FDA/CE internationally) is essential context for hiring interviews.",
          "prerequisites": ["Medical Instrumentation"],
          "actions": [
            "Study the basics of medical device regulatory pathways (CDSCO classification in India, ISO 13485 quality systems).",
            "Consider an internship at a hospital's biomedical/clinical engineering department or a device manufacturer.",
            "Practice interview questions covering device design constraints, safety standards, and clinical validation."
          ],
          "resources": [
            { "title": "CDSCO: Medical Device Rules", "url": "https://cdsco.gov.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "renewable-energy-systems-engineer",
    "name": "Renewable Energy Systems Engineer",
    "sector": "Core Engineering",
    "description": "Designs and implements solar, wind, and other renewable energy systems, integrating them with existing power infrastructure.",
    "recommended_subjects": "Physics, Mathematics",
    "common_entrance_exams": "JEE Main, JEE Advanced, State CETs, GATE",
    "relevant_degrees": "B.Tech/B.E. Electrical/Mechanical/Energy Engineering",
    "typical_progression": "Renewable Energy Engineer Trainee → Solar/Wind Design Engineer → Senior Renewable Energy Engineer → Head of Renewable Projects",
    "industry_sectors": "Solar/Wind Developers, Power Utilities, EPC Contractors, Energy Storage Companies",
    "government_opportunities": "Ministry of New and Renewable Energy, NTPC Renewable Energy, State Renewable Energy Development Agencies",
    "higher_study_routes": "M.Tech in Renewable/Energy Engineering, MS in Sustainable Energy Systems",
    "skill_building_timeline": "10-14 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Renewable Energy Fundamentals", "priority": "core" },
      { "name": "Solar/Wind System Design", "priority": "core" },
      { "name": "Grid Integration", "priority": "core" },
      { "name": "Energy Storage Systems", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Renewable Energy Resource & Technology Fundamentals",
          "skill_name": "Renewable Energy Fundamentals",
          "estimated_time": "6-8 weeks",
          "why": "Designing a viable renewable energy system starts with understanding resource availability (solar irradiance, wind patterns) and technology options.",
          "prerequisites": [],
          "actions": [
            "Study solar PV fundamentals: cell technology, panel efficiency, and solar resource assessment.",
            "Learn wind energy basics: turbine types, wind resource assessment, capacity factor.",
            "Understand basic electrical engineering concepts needed for power generation systems."
          ],
          "resources": [
            { "title": "NPTEL: Solar Energy Engineering and Technology", "url": "https://nptel.ac.in/courses/112105297", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "System Design & Simulation Tools",
          "skill_name": "Solar/Wind System Design",
          "estimated_time": "8-10 weeks",
          "why": "Sizing and designing an actual solar or wind installation requires specific software tools and financial/technical trade-off skills.",
          "prerequisites": ["Renewable Energy Fundamentals"],
          "actions": [
            "Learn to design and simulate solar PV systems using PVsyst or similar software.",
            "Study grid-tied vs off-grid system design, inverter sizing, and battery bank sizing basics.",
            "Perform a basic techno-economic analysis (LCOE, payback period) for a renewable installation."
          ],
          "resources": [
            { "title": "PVsyst: Documentation & Tutorials", "url": "https://www.pvsyst.com/help/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Renewable System Design Capstone",
          "skill_name": "Grid Integration",
          "estimated_time": "8-10 weeks",
          "why": "A fully sized and simulated renewable energy project (with grid or storage integration) is the concrete deliverable this field hires for.",
          "prerequisites": ["Solar/Wind System Design"],
          "actions": [
            "Design a complete solar or hybrid renewable system for a defined use case (e.g. a rural microgrid or rooftop installation).",
            "Model grid integration challenges: voltage regulation, intermittency, and basic protection requirements.",
            "Prepare a project report including system sizing, cost estimate, and expected energy yield."
          ],
          "resources": [
            { "title": "Ministry of New and Renewable Energy: Guidelines", "url": "https://mnre.gov.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Storage Systems & Interview Preparation",
          "skill_name": "Energy Storage Systems",
          "estimated_time": "6-8 weeks",
          "why": "Battery storage is now central to renewable project viability, and interviews increasingly probe hybrid system and storage design questions.",
          "prerequisites": ["Grid Integration"],
          "actions": [
            "Study battery energy storage system basics: chemistry options, sizing, and integration with renewables.",
            "Follow current policy incentives and government schemes relevant to renewable energy deployment.",
            "Practice interview questions on system sizing trade-offs and grid stability challenges of renewables."
          ],
          "resources": [
            { "title": "IRENA: Renewable Energy Statistics & Reports", "url": "https://www.irena.org/", "resource_type": "doc", "estimated_minutes": 120 }
          ]
        }
      ]
    }
  [
  {
    "slug": "medical-practitioner-mbbs",
    "name": "Medical Practitioner (MBBS / Doctor)",
    "sector": "Healthcare & Life Sciences",
    "description": "Diagnoses and treats illness and injury as a licensed physician, working in hospitals, clinics, or specialized practice.",
    "recommended_subjects": "Biology, Chemistry, Physics",
    "common_entrance_exams": "NEET UG (mandatory), NEET PG (for specialization)",
    "relevant_degrees": "MBBS (5.5 years including internship), MD/MS for specialization",
    "typical_progression": "Medical Student → Intern → Junior Resident Doctor → Specialist/Consultant → Senior Consultant / Department Head",
    "industry_sectors": "Government Hospitals, Private Hospitals, Primary Health Centers, Academic Medicine",
    "government_opportunities": "AIIMS, State Government Hospitals, Armed Forces Medical Services, ESIC hospitals",
    "higher_study_routes": "MD/MS via NEET PG, DM/MCh super-specialization, MRCP/MRCS for international practice",
    "skill_building_timeline": "5.5 years MBBS plus 3 years for MD/MS specialization",
    "skills": [
      { "name": "Pre-Clinical Sciences", "priority": "core" },
      { "name": "Clinical Diagnosis & Reasoning", "priority": "core" },
      { "name": "Patient Communication", "priority": "core" },
      { "name": "Emergency & Procedural Skills", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.97,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "class12",
          "title": "NEET UG Preparation & Pre-Medical Sciences",
          "skill_name": "Pre-Clinical Sciences",
          "estimated_time": "12-24 months",
          "why": "NEET UG is the sole, mandatory gateway into MBBS in India, and a strong Class 11-12 Biology/Chemistry/Physics base determines both eligibility and rank.",
          "prerequisites": [],
          "actions": [
            "Master NCERT Biology, Chemistry, and Physics thoroughly across Class 11 and 12 syllabi.",
            "Solve NEET-pattern mock tests regularly and analyze weak areas systematically.",
            "Register for and clear NEET UG with a rank sufficient for MBBS admission."
          ],
          "resources": [
            { "title": "NTA NEET: Official Information Bulletin", "url": "https://neet.nta.nic.in/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Pre-Clinical & Para-Clinical MBBS Years",
          "skill_name": "Clinical Diagnosis & Reasoning",
          "estimated_time": "24-30 months",
          "why": "Anatomy, physiology, biochemistry, pathology, and pharmacology form the diagnostic reasoning foundation used in every subsequent clinical year.",
          "prerequisites": ["Pre-Clinical Sciences"],
          "actions": [
            "Study anatomy, physiology, and biochemistry in depth during the first professional year.",
            "Progress through pathology, microbiology, and pharmacology in the para-clinical years.",
            "Begin ward postings to connect textbook knowledge with real patient presentations."
          ],
          "resources": [
            { "title": "National Medical Commission: MBBS Curriculum", "url": "https://www.nmc.org.in/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Clinical Postings & Compulsory Rotating Internship",
          "skill_name": "Emergency & Procedural Skills",
          "estimated_time": "12 months",
          "why": "The compulsory rotating internship is where theoretical knowledge becomes supervised, hands-on clinical competence across specialties.",
          "prerequisites": ["Clinical Diagnosis & Reasoning"],
          "actions": [
            "Complete rotations across Medicine, Surgery, Obstetrics & Gynecology, Pediatrics, and other core specialties.",
            "Build procedural competence: history-taking, physical examination, basic emergency procedures.",
            "Maintain a logbook of cases managed and procedures performed during internship."
          ],
          "resources": [
            { "title": "National Medical Commission: Internship Guidelines", "url": "https://www.nmc.org.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "NEET PG Preparation & Specialization Choice",
          "skill_name": "Patient Communication",
          "estimated_time": "12-18 months",
          "why": "NEET PG determines your specialization and institute, making it the single highest-leverage exam after MBBS for your entire career trajectory.",
          "prerequisites": ["Emergency & Procedural Skills"],
          "actions": [
            "Prepare systematically for NEET PG, revising all pre/para-clinical and clinical subjects.",
            "Research specialization options and their career/lifestyle trade-offs before ranking preferences.",
            "Develop strong patient communication and bedside manner, increasingly assessed in modern residency selection."
          ],
          "resources": [
            { "title": "NBE: NEET PG Official Information", "url": "https://natboard.edu.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "dental-surgeon-bds",
    "name": "Dental Surgeon (BDS)",
    "sector": "Healthcare & Life Sciences",
    "description": "Diagnoses and treats conditions of the teeth, gums, and oral cavity, performing procedures from routine care to oral surgery.",
    "recommended_subjects": "Biology, Chemistry, Physics",
    "common_entrance_exams": "NEET UG (mandatory)",
    "relevant_degrees": "BDS (5 years including internship), MDS for specialization",
    "typical_progression": "Dental Student → Intern → General Dentist → Specialist (MDS) → Senior Consultant / Practice Owner",
    "industry_sectors": "Private Dental Clinics, Hospital Dental Departments, Dental Product Companies, Academia",
    "government_opportunities": "Government Dental Colleges, ESIC/CGHS dental services, Armed Forces Dental Corps",
    "higher_study_routes": "MDS (Master of Dental Surgery) via NEET MDS, MDS specializations (Orthodontics, Oral Surgery, etc.)",
    "skill_building_timeline": "5 years BDS plus 3 years for MDS specialization",
    "skills": [
      { "name": "Dental & Oral Sciences Fundamentals", "priority": "core" },
      { "name": "Clinical Dental Procedures", "priority": "core" },
      { "name": "Radiographic Interpretation", "priority": "supporting" },
      { "name": "Patient Management", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.95,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "class12",
          "title": "NEET UG Preparation for Dental Admission",
          "skill_name": "Dental & Oral Sciences Fundamentals",
          "estimated_time": "12-24 months",
          "why": "BDS admission runs through the same NEET UG exam as MBBS, making strong Biology/Chemistry/Physics preparation the mandatory first step.",
          "prerequisites": [],
          "actions": [
            "Master NCERT Biology, Chemistry, and Physics through Class 11-12.",
            "Take regular NEET mock tests focused on biology-heavy sections relevant to dental admission cutoffs.",
            "Research and shortlist dental colleges based on NEET rank expectations."
          ],
          "resources": [
            { "title": "NTA NEET: Official Information Bulletin", "url": "https://neet.nta.nic.in/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Pre-Clinical Dental Sciences",
          "skill_name": "Clinical Dental Procedures",
          "estimated_time": "24 months",
          "why": "Dental anatomy, oral pathology, and pre-clinical procedure practice on models are prerequisites before treating real patients.",
          "prerequisites": ["Dental & Oral Sciences Fundamentals"],
          "actions": [
            "Study dental anatomy, oral histology, and oral pathology in depth.",
            "Practice pre-clinical procedures (cavity preparation, impression-taking) on models and simulators.",
            "Begin clinical postings under supervision to observe and assist in real patient procedures."
          ],
          "resources": [
            { "title": "Dental Council of India / NMC Dental: BDS Curriculum", "url": "https://www.nmc.org.in/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Clinical Rotations & Compulsory Internship",
          "skill_name": "Radiographic Interpretation",
          "estimated_time": "12 months",
          "why": "The compulsory internship year is where students independently perform restorative, extraction, and minor surgical procedures under supervision.",
          "prerequisites": ["Clinical Dental Procedures"],
          "actions": [
            "Rotate through departments: conservative dentistry, oral surgery, orthodontics, periodontics, prosthodontics.",
            "Learn to interpret dental radiographs (IOPA, OPG) for diagnosis and treatment planning.",
            "Independently perform routine procedures (fillings, extractions) under faculty supervision."
          ],
          "resources": [
            { "title": "Dental Council of India: Internship Guidelines", "url": "https://www.nmc.org.in/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Practice Setup or MDS Preparation",
          "skill_name": "Patient Management",
          "estimated_time": "6-12 months",
          "why": "Graduates choose between establishing general practice immediately or pursuing MDS specialization, each requiring different preparation.",
          "prerequisites": ["Radiographic Interpretation"],
          "actions": [
            "If pursuing specialization, prepare systematically for NEET MDS covering all BDS subjects.",
            "If entering practice directly, learn dental practice management: patient scheduling, basic dental business operations.",
            "Build patient communication and chairside manner skills, critical for patient retention in private practice."
          ],
          "resources": [
            { "title": "NBE: NEET MDS Official Information", "url": "https://natboard.edu.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "clinical-pharmacist",
    "name": "Clinical Pharmacist",
    "sector": "Healthcare & Life Sciences",
    "description": "Manages medication therapy, ensures drug safety, and advises healthcare teams and patients on appropriate pharmaceutical use.",
    "recommended_subjects": "Biology, Chemistry, Mathematics",
    "common_entrance_exams": "GPAT (for M.Pharm), State CETs for B.Pharm admission",
    "relevant_degrees": "B.Pharm (4 years) or Pharm.D (6 years), M.Pharm for specialization",
    "typical_progression": "Pharmacy Intern → Hospital/Clinical Pharmacist → Senior Clinical Pharmacist → Pharmacy Manager / Clinical Pharmacy Lead",
    "industry_sectors": "Hospitals, Retail Pharmacy Chains, Pharmaceutical Companies, Clinical Research Organizations",
    "government_opportunities": "Government hospital pharmacy departments, Drug Controller General of India (regulatory roles), ESIC pharmacies",
    "higher_study_routes": "M.Pharm (Pharmacology/Pharmacy Practice), Pharm.D, MS in Clinical Pharmacy",
    "skill_building_timeline": "4-6 years degree plus 6-12 months practical training",
    "skills": [
      { "name": "Pharmacology & Pharmaceutics", "priority": "core" },
      { "name": "Clinical Pharmacy Practice", "priority": "core" },
      { "name": "Drug Interactions & Safety", "priority": "core" },
      { "name": "Patient Counseling", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.92,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Pharmaceutical Sciences Fundamentals",
          "skill_name": "Pharmacology & Pharmaceutics",
          "estimated_time": "18-24 months",
          "why": "Clinical pharmacy decisions rest on a strong base in pharmacology, pharmaceutics, and medicinal chemistry taught in the early years of the degree.",
          "prerequisites": [],
          "actions": [
            "Study pharmacology, pharmaceutics, pharmaceutical chemistry, and human anatomy/physiology.",
            "Learn drug classification systems and mechanisms of action for major drug classes.",
            "Build a strong foundation in dosage forms and drug delivery systems."
          ],
          "resources": [
            { "title": "Pharmacy Council of India: Curriculum Guidelines", "url": "https://www.pci.nic.in/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Clinical Pharmacy Practice & Hospital Postings",
          "skill_name": "Clinical Pharmacy Practice",
          "estimated_time": "12-18 months",
          "why": "Clinical pharmacy requires applying pharmacology knowledge to real patient cases in hospital settings, distinct from retail dispensing.",
          "prerequisites": ["Pharmacology & Pharmaceutics"],
          "actions": [
            "Complete hospital pharmacy postings to observe medication management in clinical settings.",
            "Learn to review prescriptions for appropriateness, dosing, and drug interactions.",
            "Study therapeutic drug monitoring and dose adjustment principles for special populations."
          ],
          "resources": [
            { "title": "WHO: Guidelines on Good Pharmacy Practice", "url": "https://www.who.int/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Medication Therapy Review Capstone",
          "skill_name": "Drug Interactions & Safety",
          "estimated_time": "8-10 weeks",
          "why": "Conducting a real medication therapy review and identifying interactions/errors demonstrates the exact skill hospitals hire clinical pharmacists for.",
          "prerequisites": ["Clinical Pharmacy Practice"],
          "actions": [
            "Under supervision, conduct medication therapy reviews for real or case-study patients with polypharmacy.",
            "Identify potential drug interactions, contraindications, and dosing errors using clinical references.",
            "Document interventions and recommendations following standard clinical pharmacy documentation formats."
          ],
          "resources": [
            { "title": "Lexicomp / Drug Interaction Checker (reference tools overview)", "url": "https://www.uptodate.com/drug-interactions", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Registration, Specialization & Interview Prep",
          "skill_name": "Patient Counseling",
          "estimated_time": "6-9 months",
          "why": "Registering with the state Pharmacy Council and building patient counseling skill are the final steps to practicing and being hired clinically.",
          "prerequisites": ["Drug Interactions & Safety"],
          "actions": [
            "Register with the relevant State Pharmacy Council to practice legally.",
            "Consider M.Pharm or Pharm.D specialization if targeting advanced clinical or hospital leadership roles.",
            "Practice patient counseling scenarios for chronic disease management (diabetes, hypertension medication adherence)."
          ],
          "resources": [
            { "title": "Pharmacy Council of India: Registration Process", "url": "https://www.pci.nic.in/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        }
      ]
    }
  },
  {
    "slug": "medical-diagnostic-radiologist",
    "name": "Medical Diagnostic Radiologist",
    "sector": "Healthcare & Life Sciences",
    "description": "Interprets medical imaging (X-rays, CT, MRI, ultrasound) to diagnose disease and guide treatment decisions.",
    "recommended_subjects": "Biology, Chemistry, Physics",
    "common_entrance_exams": "NEET UG (for MBBS), NEET PG (for Radiology specialization)",
    "relevant_degrees": "MBBS followed by MD/DNB in Radiodiagnosis",
    "typical_progression": "MBBS Graduate → Radiology Resident → Consultant Radiologist → Senior Consultant / Department Head",
    "industry_sectors": "Hospitals, Diagnostic Imaging Centers, Teleradiology Companies, Academic Medicine",
    "government_opportunities": "AIIMS, Government Medical Colleges, Armed Forces Medical Services",
    "higher_study_routes": "MD/DNB Radiodiagnosis, fellowships in interventional radiology or specific imaging modalities",
    "skill_building_timeline": "5.5 years MBBS plus 3 years MD/DNB Radiology",
    "skills": [
      { "name": "Medical Imaging Physics", "priority": "core" },
      { "name": "Radiological Anatomy", "priority": "core" },
      { "name": "Image Interpretation & Reporting", "priority": "core" },
      { "name": "Interventional Procedures", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "MBBS & NEET PG Preparation for Radiology",
          "skill_name": "Radiological Anatomy",
          "estimated_time": "5.5 years (MBBS) plus 12-18 months NEET PG prep",
          "why": "Radiology is a post-MBBS specialization; a strong MBBS foundation, especially anatomy, and a competitive NEET PG rank are prerequisites.",
          "prerequisites": [],
          "actions": [
            "Complete MBBS with particular attention to anatomy, which underlies all imaging interpretation.",
            "Prepare for and clear NEET PG with a rank competitive enough for a Radiodiagnosis seat.",
            "During internship, seek elective postings or observerships in radiology departments."
          ],
          "resources": [
            { "title": "NBE: NEET PG Official Information", "url": "https://natboard.edu.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "professional",
          "title": "Radiology Residency: Imaging Physics & Modalities",
          "skill_name": "Medical Imaging Physics",
          "estimated_time": "18-24 months",
          "why": "Residency years build the technical understanding of how each imaging modality works and the systematic approach to reading studies.",
          "prerequisites": ["Radiological Anatomy"],
          "actions": [
            "Study the physics underlying X-ray, CT, MRI, and ultrasound imaging.",
            "Learn systematic reading protocols for common study types (chest X-ray, CT abdomen, MRI brain).",
            "Build a case log of studies read under supervision across all major modalities."
          ],
          "resources": [
            { "title": "RadiologyMasterclass: Free Learning Resources", "url": "https://radiologymasterclass.co.uk/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "Independent Reporting & Case Presentations",
          "skill_name": "Image Interpretation & Reporting",
          "estimated_time": "12-18 months",
          "why": "Independently generating accurate, clinically useful radiology reports is the core competency assessed before certification.",
          "prerequisites": ["Medical Imaging Physics"],
          "actions": [
            "Progress to drafting independent radiology reports, reviewed and countersigned by consultants.",
            "Present interesting or complex cases at departmental case conferences.",
            "Build a portfolio of case reports covering the breadth of common and rare pathologies."
          ],
          "resources": [
            { "title": "Radiopaedia: Case Library", "url": "https://radiopaedia.org/", "resource_type": "doc", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Sub-Specialization & Board Certification",
          "skill_name": "Interventional Procedures",
          "estimated_time": "12-24 months",
          "why": "Fellowship sub-specialization (neuroradiology, interventional radiology) and final board exams determine your practice scope and career ceiling.",
          "prerequisites": ["Image Interpretation & Reporting"],
          "actions": [
            "Choose a sub-specialization focus if pursuing a fellowship (interventional, neuro, musculoskeletal radiology).",
            "Clear final MD/DNB Radiodiagnosis board examinations.",
            "Gain exposure to basic interventional procedures (image-guided biopsies, drainages) if relevant to your track."
          ],
          "resources": [
            { "title": "National Board of Examinations: DNB Radiodiagnosis", "url": "https://natboard.edu.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "physiotherapist",
    "name": "Physiotherapist",
    "sector": "Healthcare & Life Sciences",
    "description": "Helps patients recover movement and function through therapeutic exercise, manual therapy, and rehabilitation programs.",
    "recommended_subjects": "Biology, Physics, Chemistry",
    "common_entrance_exams": "State CETs, university-specific entrance tests for BPT",
    "relevant_degrees": "Bachelor of Physiotherapy (BPT, 4.5 years including internship), MPT for specialization",
    "typical_progression": "Physiotherapy Intern → Junior Physiotherapist → Senior Physiotherapist → Clinical Lead / Sports Team Physio",
    "industry_sectors": "Hospitals, Rehabilitation Centers, Sports Teams, Private Physiotherapy Clinics",
    "government_opportunities": "Government hospitals, ESIC, Armed Forces (as civilian physiotherapists), Sports Authority of India",
    "higher_study_routes": "MPT (Master of Physiotherapy) with specializations in Orthopedics, Neuro, Sports, Cardiopulmonary",
    "skill_building_timeline": "4.5 years degree including internship",
    "skills": [
      { "name": "Human Anatomy & Kinesiology", "priority": "core" },
      { "name": "Therapeutic Exercise & Manual Therapy", "priority": "core" },
      { "name": "Clinical Assessment", "priority": "core" },
      { "name": "Rehabilitation Program Design", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Anatomy, Physiology & Biomechanics",
          "skill_name": "Human Anatomy & Kinesiology",
          "estimated_time": "18 months",
          "why": "Physiotherapy treatment decisions are grounded in a detailed understanding of musculoskeletal anatomy and movement biomechanics.",
          "prerequisites": [],
          "actions": [
            "Study human anatomy in depth, especially musculoskeletal and neurological systems.",
            "Learn kinesiology and biomechanics: joint movements, muscle actions, gait analysis basics.",
            "Understand common pathologies (fractures, sprains, neurological conditions) at a foundational level."
          ],
          "resources": [
            { "title": "Physiopedia: Free Physiotherapy Learning Resources", "url": "https://www.physio-pedia.com/", "resource_type": "doc", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Clinical Assessment & Treatment Techniques",
          "skill_name": "Clinical Assessment",
          "estimated_time": "12-15 months",
          "why": "Accurately assessing a patient's condition (range of motion, strength, pain patterns) determines what treatment approach will actually help.",
          "prerequisites": ["Human Anatomy & Kinesiology"],
          "actions": [
            "Learn standardized clinical assessment techniques: range of motion testing, muscle strength grading, special orthopedic tests.",
            "Practice manual therapy techniques (mobilization, soft tissue release) under supervision.",
            "Study electrotherapy modalities and their appropriate clinical applications."
          ],
          "resources": [
            { "title": "Physiopedia: Assessment Techniques", "url": "https://www.physio-pedia.com/Category:Assessment", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Clinical Internship & Case Management",
          "skill_name": "Rehabilitation Program Design",
          "estimated_time": "6-12 months",
          "why": "The mandatory clinical internship is where students design and progress full rehabilitation programs for real patients under supervision.",
          "prerequisites": ["Clinical Assessment"],
          "actions": [
            "Complete supervised clinical rotations across orthopedics, neurology, cardiopulmonary, and sports rehab settings.",
            "Design and progress complete rehabilitation programs for assigned patients, documenting outcomes.",
            "Build a case portfolio demonstrating assessment-to-outcome reasoning across diverse conditions."
          ],
          "resources": [
            { "title": "Indian Association of Physiotherapists: Guidelines", "url": "https://ipta.org.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Registration & Specialization Choice",
          "skill_name": "Therapeutic Exercise & Manual Therapy",
          "estimated_time": "3-6 months",
          "why": "State registration is legally required to practice, and choosing a specialization early (sports, neuro, ortho) shapes career direction.",
          "prerequisites": ["Rehabilitation Program Design"],
          "actions": [
            "Register with the relevant state physiotherapy council to practice legally.",
            "Consider MPT specialization (Sports, Neuro, Orthopedic, Cardiopulmonary) based on internship interests.",
            "Build advanced manual therapy or sports-specific rehabilitation skills through short-term certification courses."
          ],
          "resources": [
            { "title": "World Confederation for Physical Therapy: Resources", "url": "https://world.physio/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "biotechnologist-research-scholar",
    "name": "Biotechnologist / Research Scholar",
    "sector": "Healthcare & Life Sciences",
    "description": "Conducts laboratory research applying biological systems and organisms to develop products in medicine, agriculture, and industry.",
    "recommended_subjects": "Biology, Chemistry",
    "common_entrance_exams": "JEE Main/State CETs (for B.Tech Biotech), CSIR-NET/GATE (for research/PhD)",
    "relevant_degrees": "B.Tech/B.Sc Biotechnology, M.Sc/M.Tech Biotechnology, PhD for research careers",
    "typical_progression": "Research Assistant → Junior Research Fellow (JRF) → Research Scientist → Senior Scientist / Principal Investigator",
    "industry_sectors": "Pharmaceutical & Biotech Companies, Agricultural Biotech, Research Institutes, Academia",
    "government_opportunities": "CSIR labs, DBT-funded institutes, ICAR, ICMR research positions",
    "higher_study_routes": "PhD (essential for independent research careers), postdoctoral research abroad",
    "skill_building_timeline": "4-6 years (degree + M.Sc) plus 4-5 years PhD for research careers",
    "skills": [
      { "name": "Molecular Biology & Genetics", "priority": "core" },
      { "name": "Laboratory Techniques", "priority": "core" },
      { "name": "Research Methodology", "priority": "core" },
      { "name": "Scientific Writing", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Molecular Biology & Core Biotech Concepts",
          "skill_name": "Molecular Biology & Genetics",
          "estimated_time": "18-24 months",
          "why": "Nearly all biotechnology work applies molecular biology and genetics principles, making this the non-negotiable theoretical core.",
          "prerequisites": [],
          "actions": [
            "Study molecular biology fundamentals: DNA replication, transcription, translation, gene regulation.",
            "Learn genetics, cell biology, and biochemistry as they apply to biotechnological applications.",
            "Understand the major biotech application areas: pharmaceuticals, agriculture, industrial enzymes."
          ],
          "resources": [
            { "title": "NPTEL: Basic Biotechnology", "url": "https://nptel.ac.in/courses/102103012", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Laboratory Techniques & Research Skills",
          "skill_name": "Laboratory Techniques",
          "estimated_time": "12-18 months",
          "why": "Biotech careers are hands-on laboratory work; proficiency with core wet-lab techniques is what makes a candidate employable in a lab.",
          "prerequisites": ["Molecular Biology & Genetics"],
          "actions": [
            "Gain hands-on proficiency in core techniques: PCR, gel electrophoresis, cell culture, cloning.",
            "Learn to use bioinformatics tools for sequence analysis alongside wet-lab work.",
            "Assist in an ongoing lab research project during undergraduate studies (summer internship or final-year project)."
          ],
          "resources": [
            { "title": "Addgene: Protocols and Resources", "url": "https://www.addgene.org/protocols/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Research Project & Publication Attempt",
          "skill_name": "Research Methodology",
          "estimated_time": "8-12 months",
          "why": "A completed research project with a written report (or ideally a publication/poster) is the primary credential for research positions and PhD admission.",
          "prerequisites": ["Laboratory Techniques"],
          "actions": [
            "Complete an independent or supervised research project addressing a genuine scientific question.",
            "Learn to design controlled experiments and analyze results using appropriate statistical methods.",
            "Write up the project as a thesis chapter, poster, or attempt a peer-reviewed publication/conference submission."
          ],
          "resources": [
            { "title": "CSIR: Junior Research Fellowship (JRF) Information", "url": "https://csirhrdg.res.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "PhD/JRF Qualification & Career Path Choice",
          "skill_name": "Scientific Writing",
          "estimated_time": "6-12 months",
          "why": "CSIR-NET/GATE qualification and choosing between industry versus academic research paths determine funding and career trajectory.",
          "prerequisites": ["Research Methodology"],
          "actions": [
            "Prepare for and clear CSIR-NET or GATE to qualify for JRF fellowships and PhD admissions.",
            "Decide between an industry-focused biotech career (product development, QC) versus an academic research/PhD path.",
            "Practice scientific writing: research proposals, literature reviews, and clear technical documentation."
          ],
          "resources": [
            { "title": "CSIR-UGC NET: Official Exam Information", "url": "https://csirnet.nta.nic.in/", "resource_type": "doc", "estimated_minutes": 150 }
          ]
        }
      ]
    }
  },
  {
    "slug": "bioinformatics-scientist",
    "name": "Bioinformatics Scientist",
    "sector": "Healthcare & Life Sciences",
    "description": "Applies computational methods and data analysis to biological data, from genomics to drug discovery.",
    "recommended_subjects": "Biology, Mathematics, Computer Science",
    "common_entrance_exams": "JEE Main/State CETs, GATE (Biotechnology/CS), CSIR-NET for research roles",
    "relevant_degrees": "B.Tech/B.Sc Bioinformatics or Biotechnology with CS, M.Sc/M.Tech Bioinformatics, PhD for research roles",
    "typical_progression": "Bioinformatics Analyst → Bioinformatics Scientist → Senior Scientist → Computational Biology Lead",
    "industry_sectors": "Genomics Companies, Pharmaceutical R&D, Biotech Startups, Academic Research Institutes",
    "government_opportunities": "CSIR institutes (IGIB, CCMB), DBT-funded genomics centers, ICMR research positions",
    "higher_study_routes": "M.Sc/M.Tech Bioinformatics, PhD in Computational Biology",
    "skill_building_timeline": "12-18 months dedicated practice beyond core degree",
    "skills": [
      { "name": "Molecular Biology Fundamentals", "priority": "core" },
      { "name": "Programming for Bioinformatics", "priority": "core" },
      { "name": "Genomics & Sequence Analysis", "priority": "core" },
      { "name": "Statistics & Machine Learning for Biology", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.89,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Molecular Biology & Programming Basics",
          "skill_name": "Molecular Biology Fundamentals",
          "estimated_time": "8-10 weeks",
          "why": "Bioinformatics requires bilingual fluency in biological concepts (genomes, proteins) and programming, and both must be built together.",
          "prerequisites": [],
          "actions": [
            "Learn molecular biology fundamentals: genome structure, gene expression, protein synthesis.",
            "Build Python programming skills, including data handling libraries (Pandas, BioPython).",
            "Understand common biological data formats: FASTA, FASTQ, VCF, BAM/SAM."
          ],
          "resources": [
            { "title": "Rosalind: Bioinformatics Learning Platform", "url": "https://rosalind.info/", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Sequence Analysis & Genomics Pipelines",
          "skill_name": "Genomics & Sequence Analysis",
          "estimated_time": "10-14 weeks",
          "why": "Real bioinformatics work runs standardized pipelines (alignment, variant calling) on sequencing data — hands-on pipeline fluency is essential.",
          "prerequisites": ["Molecular Biology Fundamentals"],
          "actions": [
            "Learn sequence alignment algorithms and tools (BLAST, BWA, Bowtie).",
            "Build a genomics pipeline: raw reads → alignment → variant calling using standard tools (GATK).",
            "Study phylogenetics and comparative genomics basics."
          ],
          "resources": [
            { "title": "Galaxy Project: Training Materials", "url": "https://training.galaxyproject.org/", "resource_type": "course", "estimated_minutes": 350 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Genomics Analysis Capstone",
          "skill_name": "Statistics & Machine Learning for Biology",
          "estimated_time": "8-10 weeks",
          "why": "Analyzing a real public genomics dataset end-to-end and drawing a biological conclusion is the strongest hiring signal in this niche field.",
          "prerequisites": ["Genomics & Sequence Analysis"],
          "actions": [
            "Analyze a public genomics dataset (e.g. from NCBI GEO or 1000 Genomes) to answer a specific biological question.",
            "Apply statistical methods (differential expression analysis) and basic machine learning to the data.",
            "Write up findings as a report with reproducible code (GitHub repository with documentation)."
          ],
          "resources": [
            { "title": "NCBI GEO: Public Gene Expression Datasets", "url": "https://www.ncbi.nlm.nih.gov/geo/", "resource_type": "project", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Specialization & Research/Industry Interview Prep",
          "skill_name": "Programming for Bioinformatics",
          "estimated_time": "6-8 weeks",
          "why": "This field bridges research and industry hiring, each with distinct interview expectations around pipeline design and statistical reasoning.",
          "prerequisites": ["Statistics & Machine Learning for Biology"],
          "actions": [
            "Choose a specialization focus: clinical genomics, drug discovery informatics, or agricultural genomics.",
            "Prepare for CSIR-NET/GATE if pursuing further research, or build an industry-facing project portfolio if pursuing biotech roles.",
            "Practice explaining your capstone pipeline and its biological significance clearly to both technical and non-technical audiences."
          ],
          "resources": [
            { "title": "Bioinformatics.org: Career Resources", "url": "https://www.bioinformatics.org/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "public-health-specialist-epidemiologist",
    "name": "Public Health Specialist / Epidemiologist",
    "sector": "Healthcare & Life Sciences",
    "description": "Studies disease patterns and health trends in populations to design and evaluate public health interventions and policy.",
    "recommended_subjects": "Biology, Mathematics, Social Sciences",
    "common_entrance_exams": "NEET UG (if MBBS route), CUET/university entrance for MPH",
    "relevant_degrees": "MBBS or B.Sc (any life science) followed by Master of Public Health (MPH)",
    "typical_progression": "Public Health Program Officer → Epidemiologist → Senior Public Health Specialist → Public Health Director / Policy Advisor",
    "industry_sectors": "Government Health Departments, WHO/UN Agencies, NGOs, Research Institutes, Global Health Organizations",
    "government_opportunities": "National Centre for Disease Control (NCDC), State Health Departments, ICMR, Ministry of Health and Family Welfare",
    "higher_study_routes": "MPH, MD in Community Medicine, PhD in Epidemiology",
    "skill_building_timeline": "2-3 years (MPH) beyond a bachelor's degree",
    "skills": [
      { "name": "Biostatistics", "priority": "core" },
      { "name": "Epidemiological Methods", "priority": "core" },
      { "name": "Public Health Policy", "priority": "core" },
      { "name": "Health Program Evaluation", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.89,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Biostatistics & Health Sciences Foundations",
          "skill_name": "Biostatistics",
          "estimated_time": "8-10 weeks",
          "why": "Epidemiology is applied statistics on health data; a strong biostatistics base is required before any disease pattern analysis makes sense.",
          "prerequisites": [],
          "actions": [
            "Study biostatistics fundamentals: descriptive statistics, hypothesis testing, regression analysis applied to health data.",
            "Learn basic epidemiological concepts: incidence, prevalence, relative risk, odds ratio.",
            "Complete a bachelor's degree in a life science, medicine, or a related field as the entry qualification."
          ],
          "resources": [
            { "title": "Johns Hopkins: Epidemiology Free Course (Coursera audit)", "url": "https://www.coursera.org/learn/epidemiology", "resource_type": "course", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "MPH Core Coursework: Epidemiological Methods",
          "skill_name": "Epidemiological Methods",
          "estimated_time": "12-18 months",
          "why": "MPH training in study design and analytical methods is the credential and skill base required for most public health roles.",
          "prerequisites": ["Biostatistics"],
          "actions": [
            "Pursue a Master of Public Health (MPH) with courses in epidemiology, biostatistics, and health systems.",
            "Learn study design methods: cohort studies, case-control studies, randomized controlled trials.",
            "Get hands-on with statistical software (R, SPSS, or Stata) for epidemiological data analysis."
          ],
          "resources": [
            { "title": "CDC: Principles of Epidemiology (free online course)", "url": "https://www.cdc.gov/training/products/whatsnew/index.html", "resource_type": "course", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "Field Epidemiology Project / Internship",
          "skill_name": "Health Program Evaluation",
          "estimated_time": "6-9 months",
          "why": "Real field experience (a disease surveillance project or program evaluation) is the concrete proof-of-work most public health employers require.",
          "prerequisites": ["Epidemiological Methods"],
          "actions": [
            "Complete a field placement or internship with a public health department, NGO, or research institute.",
            "Conduct an analysis of a real disease outbreak or health program dataset.",
            "Write up findings as a public health report with clear policy or program recommendations."
          ],
          "resources": [
            { "title": "National Centre for Disease Control: Programs", "url": "https://ncdc.mohfw.gov.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Policy Fluency & Career Path Selection",
          "skill_name": "Public Health Policy",
          "estimated_time": "6-8 weeks",
          "why": "Public health careers branch into government, global health, or research tracks, each valuing distinct policy and grant-writing skills.",
          "prerequisites": ["Health Program Evaluation"],
          "actions": [
            "Study public health policy frameworks and how evidence translates into government health programs.",
            "Learn basics of grant writing and program funding proposals commonly required in NGO/global health roles.",
            "Network with public health professionals and consider EIS-style (Epidemic Intelligence Service) programs if pursuing a government epidemiology track."
          ],
          "resources": [
            { "title": "WHO: Careers and Internship Information", "url": "https://www.who.int/careers", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "clinical-psychologist",
    "name": "Clinical Psychologist",
    "sector": "Healthcare & Life Sciences",
    "description": "Assesses and treats mental health conditions through psychotherapy, psychological testing, and evidence-based interventions.",
    "recommended_subjects": "Psychology, Biology, Social Sciences",
    "common_entrance_exams": "CUET (for BA/MA Psychology), university-specific entrance for M.Phil Clinical Psychology",
    "relevant_degrees": "BA/B.Sc Psychology, MA/M.Sc Psychology, M.Phil in Clinical Psychology (RCI-recognized, required to practice in India)",
    "typical_progression": "Psychology Graduate → Trainee Clinical Psychologist → Licensed Clinical Psychologist → Senior Clinical Psychologist / Private Practice",
    "industry_sectors": "Hospitals, Mental Health Clinics, Private Practice, Schools & Universities, NGOs",
    "government_opportunities": "NIMHANS, government mental health programs, Armed Forces psychological services",
    "higher_study_routes": "M.Phil Clinical Psychology (RCI-recognized, mandatory for licensure in India), PsyD/PhD internationally",
    "skill_building_timeline": "6-7 years (BA + MA + M.Phil) including supervised clinical training",
    "skills": [
      { "name": "Psychological Theory & Assessment", "priority": "core" },
      { "name": "Psychotherapy Techniques", "priority": "core" },
      { "name": "Clinical Supervision & Ethics", "priority": "core" },
      { "name": "Diagnostic Classification (DSM/ICD)", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.9,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Undergraduate & Graduate Psychology Foundations",
          "skill_name": "Psychological Theory & Assessment",
          "estimated_time": "4 years (BA + MA)",
          "why": "A rigorous grounding in psychological theory, research methods, and assessment is required before any clinical training begins.",
          "prerequisites": [],
          "actions": [
            "Complete a BA/B.Sc in Psychology covering developmental, social, cognitive, and abnormal psychology.",
            "Pursue an MA/M.Sc in Psychology with electives in clinical or abnormal psychology.",
            "Learn foundational psychological assessment tools: intelligence tests, personality inventories."
          ],
          "resources": [
            { "title": "American Psychological Association: Free Learning Resources", "url": "https://www.apa.org/education-career", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "professional",
          "title": "M.Phil Clinical Psychology: Diagnostic & Therapy Training",
          "skill_name": "Diagnostic Classification (DSM/ICD)",
          "estimated_time": "24 months",
          "why": "The M.Phil in Clinical Psychology (RCI-recognized) is the legally required credential to practice as a clinical psychologist in India.",
          "prerequisites": ["Psychological Theory & Assessment"],
          "actions": [
            "Secure admission to an RCI-recognized M.Phil Clinical Psychology program (highly competitive, limited seats).",
            "Learn diagnostic classification systems (DSM-5, ICD-11) and structured clinical interviewing.",
            "Study major evidence-based therapy modalities: CBT, psychodynamic therapy, and others relevant to your training program."
          ],
          "resources": [
            { "title": "Rehabilitation Council of India: Recognized Institutions List", "url": "https://www.rehabcouncil.nic.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "professional",
          "title": "Supervised Clinical Practicum",
          "skill_name": "Psychotherapy Techniques",
          "estimated_time": "18-24 months",
          "why": "Supervised clinical hours treating real patients under a licensed psychologist are the mandatory, non-substitutable core of this training.",
          "prerequisites": ["Diagnostic Classification (DSM/ICD)"],
          "actions": [
            "Complete mandatory supervised clinical practicum hours in hospital or clinical settings as part of the M.Phil program.",
            "Conduct psychological assessments and deliver therapy sessions under close supervision.",
            "Maintain detailed case files documenting assessment, formulation, and treatment progress for supervision review."
          ],
          "resources": [
            { "title": "NIMHANS: Clinical Psychology Training Program", "url": "https://nimhans.ac.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Licensure & Practice Setting Selection",
          "skill_name": "Clinical Supervision & Ethics",
          "estimated_time": "3-6 months",
          "why": "Registering with the Rehabilitation Council of India and choosing a practice setting is the final gate before independent practice.",
          "prerequisites": ["Psychotherapy Techniques"],
          "actions": [
            "Register with the Rehabilitation Council of India (RCI) to legally practice as a Clinical Psychologist.",
            "Study professional ethics and boundaries specific to clinical psychology practice.",
            "Decide on a practice setting (hospital-based, private practice, or specialized clinic) based on training experience."
          ],
          "resources": [
            { "title": "Rehabilitation Council of India: Registration Process", "url": "https://www.rehabcouncil.nic.in/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        }
      ]
    }
  },
  {
    "slug": "nursing-officer",
    "name": "Nursing Officer",
    "sector": "Healthcare & Life Sciences",
    "description": "Provides direct patient care, medication administration, and care coordination in hospitals, clinics, and community health settings.",
    "recommended_subjects": "Biology, Chemistry",
    "common_entrance_exams": "NEET UG (for BSc Nursing in some states), state nursing entrance exams",
    "relevant_degrees": "B.Sc Nursing (4 years) or GNM Diploma (3 years), M.Sc Nursing for specialization",
    "typical_progression": "Staff Nurse → Senior Staff Nurse → Nursing Supervisor / Ward In-Charge → Nursing Superintendent / Director of Nursing",
    "industry_sectors": "Hospitals, Community Health Centers, Home Healthcare, International Healthcare (with additional licensing)",
    "government_opportunities": "Government hospitals, AIIMS, ESIC, Armed Forces Nursing Service, Railways health services",
    "higher_study_routes": "M.Sc Nursing, Nurse Practitioner certifications, international licensing (NCLEX for US, OET for UK/Australia)",
    "skill_building_timeline": "3-4 years degree/diploma including clinical internship",
    "skills": [
      { "name": "Nursing Fundamentals & Anatomy", "priority": "core" },
      { "name": "Clinical Nursing Procedures", "priority": "core" },
      { "name": "Patient Safety & Medication Administration", "priority": "core" },
      { "name": "Care Coordination & Documentation", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.93,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Nursing Fundamentals & Basic Sciences",
          "skill_name": "Nursing Fundamentals & Anatomy",
          "estimated_time": "12-15 months",
          "why": "Nursing practice is built on anatomy, physiology, and fundamental nursing procedures taught in the early years of the program.",
          "prerequisites": [],
          "actions": [
            "Study human anatomy, physiology, and microbiology relevant to nursing practice.",
            "Learn fundamental nursing procedures: vital signs monitoring, wound care, infection control.",
            "Understand basic pharmacology as it relates to safe medication administration."
          ],
          "resources": [
            { "title": "Indian Nursing Council: Curriculum Guidelines", "url": "https://www.indiannursingcouncil.org/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Specialized Clinical Nursing Areas",
          "skill_name": "Clinical Nursing Procedures",
          "estimated_time": "18-24 months",
          "why": "Different clinical specialties (medical-surgical, pediatric, obstetric, psychiatric) each require distinct nursing knowledge and procedures.",
          "prerequisites": ["Nursing Fundamentals & Anatomy"],
          "actions": [
            "Study medical-surgical nursing, pediatric nursing, obstetric/gynecological nursing, and psychiatric nursing.",
            "Practice clinical procedures (IV insertion, injections, catheterization) in skills labs under supervision.",
            "Learn to use hospital documentation systems and standard nursing care plan formats."
          ],
          "resources": [
            { "title": "Nurse.org: Free Nursing Skills Resources", "url": "https://nurse.org/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Clinical Internship & Ward Rotations",
          "skill_name": "Patient Safety & Medication Administration",
          "estimated_time": "12 months",
          "why": "The mandatory clinical internship year is where students independently manage real patients across all major hospital wards.",
          "prerequisites": ["Clinical Nursing Procedures"],
          "actions": [
            "Complete supervised rotations across medical, surgical, pediatric, and community health wards.",
            "Independently administer medications and perform nursing procedures under supervision, following safety protocols.",
            "Maintain a clinical logbook of procedures performed and cases managed during internship."
          ],
          "resources": [
            { "title": "Indian Nursing Council: Internship Guidelines", "url": "https://www.indiannursingcouncil.org/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Registration & Career Path Selection",
          "skill_name": "Care Coordination & Documentation",
          "estimated_time": "2-4 months",
          "why": "State Nursing Council registration is mandatory to practice, and this stage is when nurses decide on hospital, community, or international career paths.",
          "prerequisites": ["Patient Safety & Medication Administration"],
          "actions": [
            "Register with the State Nursing Council to practice legally as a Registered Nurse.",
            "Apply for staff nurse positions at hospitals or consider community health/public health nursing routes.",
            "If pursuing international opportunities, research and prepare for licensing exams (NCLEX-RN, OET) early."
          ],
          "resources": [
            { "title": "Indian Nursing Council: State Registration Process", "url": "https://www.indiannursingcouncil.org/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        }
      ]
    }
  },
  {
    "slug": "food-technologist-nutritionist",
    "name": "Food Technologist / Nutritionist",
    "sector": "Healthcare & Life Sciences",
    "description": "Applies food science and nutrition principles to develop food products, ensure safety, and guide dietary health outcomes.",
    "recommended_subjects": "Biology, Chemistry, Home Science",
    "common_entrance_exams": "CUET, State CETs, ICAR AIEEA (for agricultural/food science programs)",
    "relevant_degrees": "B.Tech Food Technology or B.Sc Nutrition & Dietetics, M.Sc for specialization",
    "typical_progression": "Quality Assurance Trainee / Dietitian Intern → Food Technologist / Clinical Dietitian → Senior Nutritionist / R&D Manager → Head of Quality/Nutrition",
    "industry_sectors": "Food & Beverage Manufacturing, Hospitals (clinical nutrition), FMCG R&D, Wellness Startups",
    "government_opportunities": "FSSAI (Food Safety and Standards Authority), ICMR nutrition research, Anganwadi/public nutrition programs",
    "higher_study_routes": "M.Sc Food Technology or Clinical Nutrition, Registered Dietitian (RD) certification",
    "skill_building_timeline": "4 years degree plus 6-12 months practical training",
    "skills": [
      { "name": "Food Science Fundamentals", "priority": "core" },
      { "name": "Nutrition Science", "priority": "core" },
      { "name": "Food Safety & Quality Standards", "priority": "core" },
      { "name": "Dietary Counseling", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.88,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "ug",
          "title": "Food Science & Nutrition Fundamentals",
          "skill_name": "Food Science Fundamentals",
          "estimated_time": "12-15 months",
          "why": "Whether working in food manufacturing or clinical dietetics, a base understanding of food chemistry and nutrient science is essential.",
          "prerequisites": [],
          "actions": [
            "Study food chemistry, food microbiology, and food processing techniques.",
            "Learn human nutrition fundamentals: macronutrients, micronutrients, metabolism.",
            "Understand basic food preservation and packaging technologies."
          ],
          "resources": [
            { "title": "NPTEL: Food Science and Technology", "url": "https://nptel.ac.in/courses/126106011", "resource_type": "course", "estimated_minutes": 400 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Specialization Track: Food Tech or Clinical Nutrition",
          "skill_name": "Nutrition Science",
          "estimated_time": "12-18 months",
          "why": "This career splits into industry (food technology/QA) and clinical (dietetics) tracks, each requiring distinct deeper technical skills.",
          "prerequisites": ["Food Science Fundamentals"],
          "actions": [
            "For food tech track: study food processing engineering, product development, and sensory evaluation.",
            "For nutrition track: study clinical nutrition, diet therapy for diseases (diabetes, renal, cardiac), and community nutrition.",
            "Learn relevant regulatory standards: FSSAI food safety regulations and labeling requirements."
          ],
          "resources": [
            { "title": "FSSAI: Food Safety Standards and Regulations", "url": "https://www.fssai.gov.in/", "resource_type": "doc", "estimated_minutes": 200 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Product Development or Diet Plan Capstone",
          "skill_name": "Food Safety & Quality Standards",
          "estimated_time": "8-10 weeks",
          "why": "A tangible deliverable — a new food product formulation or a complete clinical diet plan — is the standard portfolio artifact in this field.",
          "prerequisites": ["Nutrition Science"],
          "actions": [
            "For food tech: develop a new food product formulation, including nutritional analysis and shelf-life considerations.",
            "For nutrition: design complete diet plans for specific health conditions (diabetes, obesity, pregnancy) as case studies.",
            "Conduct quality testing or nutritional labeling for the developed product/plan following FSSAI norms."
          ],
          "resources": [
            { "title": "Indian Dietetic Association: Resources", "url": "https://www.idaindia.com/", "resource_type": "doc", "estimated_minutes": 100 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Certification & Internship Placement",
          "skill_name": "Dietary Counseling",
          "estimated_time": "6-9 months",
          "why": "Completing a mandatory clinical/industrial internship and gaining relevant certification is what employers use to screen entry-level hires.",
          "prerequisites": ["Food Safety & Quality Standards"],
          "actions": [
            "Complete an internship in a hospital dietetics department (clinical track) or a food manufacturing QA/R&D team (industry track).",
            "Practice patient-facing dietary counseling and behavior-change communication skills if on the clinical track.",
            "Consider a Registered Dietitian (RD) certification for enhanced clinical practice credibility."
          ],
          "resources": [
            { "title": "Indian Dietetic Association: RD Certification Process", "url": "https://www.idaindia.com/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        }
      ]
    }
  },
  {
    "slug": "veterinary-doctor",
    "name": "Veterinary Doctor",
    "sector": "Healthcare & Life Sciences",
    "description": "Diagnoses and treats illness and injury in animals, spanning companion pets, livestock, and wildlife health.",
    "recommended_subjects": "Biology, Chemistry, Physics",
    "common_entrance_exams": "NEET UG (mandatory for BVSc in India)",
    "relevant_degrees": "Bachelor of Veterinary Science (BVSc & AH, 5.5 years including internship)",
    "typical_progression": "Veterinary Student → Intern → Veterinary Officer / Practicing Vet → Senior Veterinarian → Specialist / Practice Owner",
    "industry_sectors": "Private Veterinary Clinics, Livestock & Dairy Industry, Wildlife Conservation, Pharmaceutical Companies (animal health)",
    "government_opportunities": "State Animal Husbandry Departments, ICAR institutes, Zoos and Wildlife Sanctuaries, Armed Forces Veterinary Corps",
    "higher_study_routes": "M.V.Sc for specialization (Surgery, Medicine, Pathology, etc.), PhD for research careers",
    "skill_building_timeline": "5.5 years including internship",
    "skills": [
      { "name": "Veterinary Anatomy & Physiology", "priority": "core" },
      { "name": "Animal Clinical Diagnosis", "priority": "core" },
      { "name": "Veterinary Surgery & Procedures", "priority": "core" },
      { "name": "Livestock & Herd Health Management", "priority": "supporting" }
    ],
    "roadmap": {
      "version": 1,
      "confidence_score": 0.91,
      "milestones": [
        {
          "order_index": 1,
          "phase": "Foundations",
          "stage_key": "class12",
          "title": "NEET UG Preparation for Veterinary Admission",
          "skill_name": "Veterinary Anatomy & Physiology",
          "estimated_time": "12-24 months",
          "why": "BVSc admission is through NEET UG in India, requiring the same rigorous Biology/Chemistry/Physics preparation as medical admission.",
          "prerequisites": [],
          "actions": [
            "Master NCERT Biology, Chemistry, and Physics through Class 11-12.",
            "Clear NEET UG with a rank sufficient for veterinary college admission via state/central counseling.",
            "Research veterinary colleges and specific state quota systems for admission."
          ],
          "resources": [
            { "title": "NTA NEET: Official Information Bulletin", "url": "https://neet.nta.nic.in/", "resource_type": "doc", "estimated_minutes": 300 }
          ]
        },
        {
          "order_index": 2,
          "phase": "Core Tooling",
          "stage_key": "ug",
          "title": "Pre-Clinical Veterinary Sciences",
          "skill_name": "Animal Clinical Diagnosis",
          "estimated_time": "24-30 months",
          "why": "Veterinary anatomy, physiology, and pathology across multiple species is the diagnostic foundation used throughout clinical practice.",
          "prerequisites": ["Veterinary Anatomy & Physiology"],
          "actions": [
            "Study comparative anatomy and physiology across common domestic and livestock species.",
            "Learn veterinary pathology, microbiology, and pharmacology.",
            "Begin clinical postings in the veterinary teaching hospital to observe diagnosis and treatment."
          ],
          "resources": [
            { "title": "Veterinary Council of India: Curriculum Guidelines", "url": "https://www.vci.nic.in/", "resource_type": "doc", "estimated_minutes": 250 }
          ]
        },
        {
          "order_index": 3,
          "phase": "Proof of Work",
          "stage_key": "ug",
          "title": "Clinical Postings & Compulsory Internship",
          "skill_name": "Veterinary Surgery & Procedures",
          "estimated_time": "12 months",
          "why": "The compulsory internship year is where students perform supervised surgeries, treatments, and herd health interventions on real animals.",
          "prerequisites": ["Animal Clinical Diagnosis"],
          "actions": [
            "Complete rotations across medicine, surgery, gynecology, and public health/livestock production postings.",
            "Perform supervised clinical procedures: vaccinations, minor surgeries, wound management.",
            "Gain exposure to livestock herd health management and farm visits, especially for a livestock-focused career."
          ],
          "resources": [
            { "title": "Veterinary Council of India: Internship Guidelines", "url": "https://www.vci.nic.in/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        },
        {
          "order_index": 4,
          "phase": "Industry Entry",
          "stage_key": "professional",
          "title": "Registration & Career Track Selection",
          "skill_name": "Livestock & Herd Health Management",
          "estimated_time": "3-6 months",
          "why": "State Veterinary Council registration is required to practice, and this is the decision point between companion animal, livestock, or government service tracks.",
          "prerequisites": ["Veterinary Surgery & Procedures"],
          "actions": [
            "Register with the State Veterinary Council to practice legally.",
            "Choose a career track: companion animal practice, livestock/dairy consultancy, wildlife, or government veterinary service.",
            "Consider M.V.Sc specialization (surgery, medicine, gynecology) if pursuing advanced clinical practice."
          ],
          "resources": [
            { "title": "Veterinary Council of India: Registration Process", "url": "https://www.vci.nic.in/", "resource_type": "doc", "estimated_minutes": 90 }
          ]
        }
      ]
    }
  }
]}
]


*/