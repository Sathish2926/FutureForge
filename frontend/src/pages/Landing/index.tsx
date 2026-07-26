import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles, BookOpen, Map, GraduationCap, Users, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { routePaths } from '../../constants/routes';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">FutureForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to={routePaths.login}>
              <Button variant="ghost" className="text-foreground hover:bg-muted">{t('login', 'Sign In')}</Button>
            </Link>
            <Link to={routePaths.register}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                {t('register', 'Get Started')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border text-sm font-medium mb-8 text-primary-100">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{t('hero_badge', 'AI-Powered Career & Education Platform')}</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {t('hero_title_1', 'Forge Your Future with')} <br className="hidden md:block" />
            <span className="text-gradient">{t('hero_title_2', 'Intelligent Guidance')}</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            {t('hero_subtitle', 'Discover scholarships, map your career DNA, and get personalized learning roadmaps powered by advanced AI. Your professional journey starts here.')}
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
            <Link to={routePaths.register}>
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 transition-all">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="#demo">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl border-border hover:bg-background hover:text-foreground transition-all glass">
                View Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image/Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 w-full max-w-6xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <div className="glass-card border-border shadow-sm p-2 md:p-4 rounded-3xl overflow-hidden border border-border shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              alt="Dashboard Preview" 
              className="w-full h-auto rounded-2xl opacity-80 object-cover object-top aspect-[16/9]"
            />
          </div>
        </motion.div>
      </section>

      {/* Trusted By Stats */}
      <section className="py-12 border-y border-border bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">$10M+</div>
              <div className="text-sm text-muted-foreground">Scholarships Found</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Partner Colleges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Our comprehensive suite of AI-powered tools is designed to guide you through every step of your educational and professional journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card border-border shadow-sm md:col-span-2 group">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Scholarship Finder</h3>
              <p className="text-muted-foreground mb-6">Instantly match with thousands of scholarships based on your unique profile. Our AI engine ensures you only see what you're eligible for.</p>
              <div className="h-48 rounded-xl bg-gradient-to-br from-card to-background border border-border p-4 relative overflow-hidden">
                <div className="absolute right-4 top-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="flex flex-col gap-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 rounded-lg bg-background border border-border w-3/4 flex items-center px-4 gap-3 animate-pulse" style={{ animationDelay: `${i * 0.2}s`}}>
                      <div className="w-4 h-4 rounded-full bg-primary/50"></div>
                      <div className="h-2 w-24 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card border-border shadow-sm group">
              <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">AI Assistant</h3>
              <p className="text-muted-foreground mb-6">Get instant answers to your career and education questions with our intelligent chatbot.</p>
            </div>

            <div className="glass-card border-border shadow-sm group">
              <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Career Roadmaps</h3>
              <p className="text-muted-foreground">Step-by-step interactive roadmaps to reach your dream career.</p>
            </div>

            <div className="glass-card border-border shadow-sm md:col-span-2 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Career DNA Mapping</h3>
              <p className="text-muted-foreground">Discover your true potential with our advanced psychometric and skill assessment tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Ready to forge your future?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of students who are already using FutureForge to accelerate their career and education journey.</p>
          <Link to={routePaths.register}>
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-background hover:bg-white/90 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">FutureForge</span>
              </div>
              <p className="text-muted-foreground max-w-sm">Empowering the next generation with AI-driven insights for education and career growth.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Scholarships</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Career DNA</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Roadmaps</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Colleges</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 FutureForge. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
