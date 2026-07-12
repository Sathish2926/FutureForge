import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User as UserIcon, Paperclip, Mic, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your FutureForge AI advisor. How can I help you shape your career today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Based on your profile, I recommend exploring specialized fields in Data Science. Your analytical scores are in the top 5%.\n\nWould you like me to generate a step-by-step roadmap for becoming a Machine Learning Engineer?' 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-4rem)] max-w-4xl mx-auto flex flex-col p-4 md:p-8">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <Sparkles className="text-primary mr-2" />
          AI Career Advisor
        </h1>
        <p className="text-muted-foreground text-sm">Powered by Gemini</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card rounded-3xl flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-0" />
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-thin scrollbar-thumb-white/10">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary ml-3' : 'bg-secondary mr-3'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-primary/20 border border-primary/30 text-foreground' 
                      : 'bg-white/5 border border-white/10 text-foreground'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex flex-row max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary mr-3 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-2">
                    <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-white/10 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-2 bg-black/40 rounded-full p-2 border border-white/10 focus-within:border-primary/50 transition-colors">
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10 text-muted-foreground">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your career path..."
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base shadow-none px-2"
            />
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10 text-muted-foreground">
              <Mic className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
              onClick={handleSend}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide px-2">
            {['Generate Roadmap', 'Review Resume', 'Interview Prep'].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-colors text-muted-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
