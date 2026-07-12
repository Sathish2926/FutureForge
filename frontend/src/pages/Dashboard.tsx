import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Target, BookOpen, Trophy, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const dnaData = [
  { subject: 'Analytical', A: 85, fullMark: 100 },
  { subject: 'Creativity', A: 70, fullMark: 100 },
  { subject: 'Leadership', A: 60, fullMark: 100 },
  { subject: 'Programming', A: 90, fullMark: 100 },
  { subject: 'Problem Solving', A: 88, fullMark: 100 },
  { subject: 'Communication', A: 75, fullMark: 100 },
];

const upcomingExams = [
  { name: 'JEE Mains Phase 2', date: '15 Aug 2026', days: 40 },
  { name: 'BITSAT', date: '25 Aug 2026', days: 50 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 pb-20">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/20 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10"></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Alex! 👋</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your Career DNA is mapped. Based on your recent assessment, you show strong aptitude for technical and analytical roles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: DNA & Stats */}
        <div className="lg:col-span-1 space-y-8">
          {/* Radar Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Compass className="w-5 h-5 mr-2 text-primary" />
              Career DNA Match
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Student DNA" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.5} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-bold text-success mb-1">94%</div>
              <div className="text-xs text-muted-foreground">Tech Match</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-bold text-accent mb-1">12</div>
              <div className="text-xs text-muted-foreground">Saved Careers</div>
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Recommendations */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Target className="w-5 h-5 mr-2 text-secondary" />
                AI Recommendations
              </h2>
              <Link to="/careers" className="text-sm text-primary hover:underline flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'AI Engineer', match: 96, salary: '$140k+', demand: 'Very High' },
                { title: 'Data Scientist', match: 92, salary: '$120k+', demand: 'High' },
                { title: 'Software Architect', match: 88, salary: '$160k+', demand: 'High' }
              ].map((role, i) => (
                <div key={i} className="bg-background/40 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-background/60 transition-colors">
                  <div>
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{role.salary}</span>
                      <span>•</span>
                      <span className="text-success">{role.demand} Demand</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">{role.match}% Match</div>
                      <div className="w-24 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${role.match}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Milestones */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-warning" />
              Upcoming Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="flex items-start space-x-4 bg-background/30 p-4 rounded-xl border border-white/5">
                  <div className="bg-warning/20 text-warning w-12 h-12 rounded-lg flex items-center justify-center font-bold">
                    {exam.days}d
                  </div>
                  <div>
                    <h4 className="font-medium">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {exam.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
