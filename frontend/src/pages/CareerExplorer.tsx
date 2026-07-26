import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Briefcase, TrendingUp, DollarSign, Brain, Bookmark } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const MOCK_CAREERS = [
  {
    id: 1,
    title: 'Machine Learning Engineer',
    category: 'Technology',
    match: 96,
    salary: '$140k - $200k',
    demand: 'Very High',
    description: 'Design and build AI models that learn from data and make predictions.',
    skills: ['Python', 'TensorFlow', 'Mathematics', 'Data Modeling']
  },
  {
    id: 2,
    title: 'Data Scientist',
    category: 'Technology',
    match: 92,
    salary: '$120k - $180k',
    demand: 'High',
    description: 'Analyze complex data sets to help companies make better business decisions.',
    skills: ['Python', 'SQL', 'Statistics', 'Data Visualization']
  },
  {
    id: 3,
    title: 'Product Manager',
    category: 'Business',
    match: 75,
    salary: '$110k - $160k',
    demand: 'High',
    description: 'Guide the success of a product and lead the cross-functional team that is responsible for improving it.',
    skills: ['Leadership', 'Communication', 'Agile', 'Market Research']
  },
  {
    id: 4,
    title: 'Cloud Architect',
    category: 'Technology',
    match: 88,
    salary: '$150k - $220k',
    demand: 'Very High',
    description: 'Oversee a company\'s cloud computing strategy, including cloud adoption plans and application design.',
    skills: ['AWS', 'System Design', 'Kubernetes', 'Security']
  }
];

const CareerExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCareers = MOCK_CAREERS.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          career.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || career.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* Header & Search */}
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Career Explorer</h1>
          <p className="text-muted-foreground text-lg">Discover your perfect path from thousands of AI-analyzed careers.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search careers, skills, or industries..." 
              className="pl-12 py-6 bg-background/50 border-border text-lg rounded-2xl"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="py-6 px-6 rounded-2xl bg-background/50 border-border gap-2">
            <Filter className="w-5 h-5" /> Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Technology', 'Business', 'Healthcare', 'Design', 'Engineering'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                activeCategory === cat 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                  : 'bg-card border border-border hover:bg-background text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredCareers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card border-border shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{career.title}</h3>
                      <span className="text-sm text-muted-foreground">{career.category}</span>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                  {career.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-success" />
                    {career.salary}
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                    {career.demand} Demand
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {career.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">{career.match}% Match</span>
                </div>
                <Button className="bg-muted hover:bg-primary hover:text-foreground text-foreground border-0 transition-all rounded-xl">
                  View Path
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredCareers.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No careers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerExplorer;
