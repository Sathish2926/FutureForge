import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, BrainCircuit, CheckCircle2 } from 'lucide-react';

const mockQuestions = [
  {
    id: 1,
    category: 'Logical',
    text: 'If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?',
    options: ['Yes', 'No', 'Cannot be determined'],
  },
  {
    id: 2,
    category: 'Numerical',
    text: 'A store reduces the price of an item by 20% and then increases it by 20%. How does the final price compare to the original?',
    options: ['It is the same', 'It is 4% less', 'It is 4% more', 'It is 20% less'],
  },
  {
    id: 3,
    category: 'Personality (RIASEC)',
    text: 'I prefer working with machines and tools rather than people.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
  },
  {
    id: 4,
    category: 'Creativity',
    text: 'How many unusual uses can you think of for a paperclip in 10 seconds? (Self-rate)',
    options: ['0-2 uses', '3-5 uses', '6-8 uses', '9+ uses'],
  },
  {
    id: 5,
    category: 'Problem Solving',
    text: 'You are facing a complex bug in your system. What is your first step?',
    options: ['Ask a colleague immediately', 'Read the documentation and logs', 'Start rewriting the code', 'Ignore it and work on something else'],
  }
];

export const AssessmentPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes total
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [mockQuestions[currentQuestion].id]: answer });
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isCompleted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="glass-card border-border shadow-sm w-full max-w-md p-8 text-center">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center space-y-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <BrainCircuit className="w-16 h-16 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-bold">AI is analyzing your DNA...</h2>
                <p className="text-muted-foreground">Mapping your traits to 10,000+ career paths.</p>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-success" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gradient">DNA Mapped!</h2>
                <p className="text-muted-foreground">Your personalized dashboard is ready.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-4 pt-12">
      <div className="w-full max-w-3xl">
        
        {/* Header & Timer */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{question.category}</span>
            <div className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {mockQuestions.length}</div>
          </div>
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
            <Timer className={`w-4 h-4 ${timeLeft < 60 ? 'text-error' : 'text-primary'}`} />
            <span className={`font-mono font-medium ${timeLeft < 60 ? 'text-error animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-12">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentQuestion) / mockQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card border-border shadow-sm p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium mb-10 leading-relaxed">
              {question.text}
            </h2>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-xl border border-border bg-background/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 group flex items-center"
                >
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mr-4 group-hover:border-primary group-hover:text-primary transition-colors">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

