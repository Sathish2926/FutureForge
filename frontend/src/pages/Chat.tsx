import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User as UserIcon, Paperclip, Sparkles, MessageSquare, Plus, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/toast';
import { fetchChatSessions, createChatSession, fetchChatSessionDetail, sendChatMessage } from '../services/chatbot';
import type { ChatSessionBase, ChatSessionDetail, ChatMessageBase } from '../types';

export default function ChatPage() {
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<ChatSessionBase[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSessionDetail | null>(null);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await fetchChatSessions();
      setSessions(data);
      if (data.length > 0) {
        loadSessionDetail(data[0].id);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast("Failed to load chat history", "error");
      setLoading(false);
    }
  };

  const loadSessionDetail = async (id: number) => {
    setLoading(true);
    try {
      const detail = await fetchChatSessionDetail(id);
      setActiveSession(detail);
    } catch (e) {
      toast("Failed to load chat session", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async (mode: string = "general", title: string = "New Coaching Session") => {
    try {
      setLoading(true);
      const newSession = await createChatSession(title, mode, 'English');
      setSessions(prev => [newSession, ...prev]);
      await loadSessionDetail(newSession.id);
    } catch (e) {
      toast("Failed to start new session", "error");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !activeSession) return;

    const userContent = input;
    setInput('');
    setIsTyping(true);

    // Optimistic UI update
    const optimisticMsg: ChatMessageBase = { id: Date.now(), role: 'user', content: userContent, created_at: null };
    setActiveSession(prev => prev ? { ...prev, messages: [...prev.messages, optimisticMsg] } : null);

    try {
      const aiResponse = await sendChatMessage(activeSession.id, userContent);
      setActiveSession(prev => prev ? { ...prev, messages: [...prev.messages, aiResponse] } : null);
    } catch (e) {
      toast("Failed to send message", "error");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] pt-20 px-4 md:px-8 pb-4 max-w-7xl mx-auto flex gap-6">
      
      {/* Sidebar - Sessions */}
      <div className="hidden md:flex flex-col w-64 glass-card border-border shadow-sm rounded-2xl overflow-hidden border-border shrink-0">
        <div className="p-4 border-b border-border">
          <Button onClick={() => handleNewChat()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map(s => (
            <button 
              key={s.id} 
              onClick={() => loadSessionDetail(s.id)}
              className={`w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeSession?.id === s.id ? 'bg-primary/20 text-foreground border border-primary/30' : 'text-muted-foreground hover:bg-background hover:text-foreground'}`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <div className="truncate text-sm font-medium">{s.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass-card border-border shadow-sm rounded-3xl flex flex-col overflow-hidden relative border-border">
        
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Sparkles className="w-5 h-5 text-primary" /> AI Career Coach
            {activeSession && <span className="text-sm font-normal text-muted-foreground ml-2">({activeSession.mode})</span>}
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-thin scrollbar-thumb-white/10">
          {loading && !activeSession ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : !activeSession ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <Bot className="w-12 h-12 mb-4 opacity-50" />
              <p>Start a new conversation to get personalized coaching.</p>
              <Button onClick={() => handleNewChat()} variant="outline" className="mt-4 border-border text-foreground hover:bg-muted">
                Start Chat
              </Button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {activeSession.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary ml-3' : 'bg-slate-700 mr-3'}`}>
                      {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-foreground" /> : <Bot className="w-5 h-5 text-foreground" />}
                    </div>
                    <div className={`p-4 rounded-2xl whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-primary/20 border border-primary/30 text-foreground' 
                        : 'bg-background border border-border text-foreground'
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 mr-3 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border flex items-center space-x-2">
                      <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-border z-10 backdrop-blur-md">
          {activeSession && (
            <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide px-2">
              {['Improve my roadmap', 'Find scholarships', 'Prepare me for interviews'].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border border-border bg-background hover:bg-primary/20 hover:border-primary/50 transition-colors text-muted-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-2 bg-black/40 rounded-full p-2 border border-border focus-within:border-primary/50 transition-colors">
            <Input 
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
              onKeyPress={(e: any) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your career path..."
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base shadow-none px-4"
              disabled={!activeSession || isTyping}
            />
            <Button 
              size="icon" 
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shrink-0"
              onClick={handleSend}
              disabled={!activeSession || isTyping || !input.trim()}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
