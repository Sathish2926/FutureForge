import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      <div className="z-10 text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight text-white mb-4">
          Shape Your <span className="text-gradient">Future</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          An AI-driven platform that shapes personalized career and education journeys.
        </p>
        <div className="pt-8">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_rgba(79,70,229,0.7)] transition-all transform hover:-translate-y-1">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
