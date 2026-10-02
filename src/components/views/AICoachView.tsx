import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import {
  Bot,
  Send,
  Sparkles,
  Key,
  RotateCcw,
  User,
  Zap,
  Clock,
  Building2,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AICoachView: React.FC = () => {
  const { student, skills, addToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello ${student.name}! I am **Placement Coach**, your AI campus mentor.\n\nYour current **Placement Readiness is ${student.readinessScore}/100** for the **${student.targetRole}** role. You have **${skills.filter(s => s.status === 'Critical Gap').length} critical gaps** identified in your diagnostic test (DSA and OS).\n\nHow can I help guide your preparation today?`,
      time: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'How should I prepare today?',
    'I have only 1 hour today.',
    'What should I study for TCS?',
    'What should I study for Amazon?',
    'I am weak in DSA. What should I do?',
    'Give me 5 SQL questions.',
    'How do I improve my interview readiness?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await AIService.getCoachResponse(text, student, skills);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      addToast('Error', 'Unable to fetch coach reply', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (customKey.trim()) {
      localStorage.setItem('placementai_gemini_key', customKey.trim());
      addToast('Gemini API Key Saved! 🔑', 'Real-time Google Gemini generative inference enabled.', 'success');
    } else {
      localStorage.removeItem('placementai_gemini_key');
      addToast('Local Engine Active', 'Reverted to built-in placement coach heuristics.', 'info');
    }
    setShowApiKeyModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Top Banner (Special Soft Purple Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#F5F3FF] via-[#EEF2FF] to-[#F5F3FF] border border-purple-200/80 p-5 flex items-center justify-between shadow-xs ring-1 ring-purple-100">
        <div className="flex items-center space-x-3.5">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-purple-500/25">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-[#0F172A]">Placement AI Coach</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059669] text-[10px] font-bold border border-emerald-200">
                Online • Context-Aware
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Personalized advice grounded in your {student.readinessScore}/100 readiness and critical gaps.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowApiKeyModal(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-purple-50/60 text-purple-700 border border-purple-200 transition-colors shadow-2xs"
          title="Configure optional external Gemini API key"
        >
          <Key className="h-3.5 w-3.5 text-purple-600" />
          <span className="hidden sm:inline">AI Settings</span>
        </button>
      </div>

      {/* Quick Prompt Chips (Small Pill Buttons with Light Purple Background) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Quick Prompts:
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3.5 py-1.5 rounded-full bg-[#F5F3FF] border border-purple-200/80 text-[#7C3AED] hover:bg-purple-100/80 hover:border-purple-300 whitespace-nowrap transition-colors shrink-0 font-medium shadow-2xs hover:-translate-y-0.5"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="h-[480px] rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 overflow-y-auto space-y-4 shadow-xs ring-1 ring-purple-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="h-8 w-8 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 shadow-2xs mt-0.5 border border-purple-200">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#4F46E5] text-white rounded-tr-none shadow-sm'
                  : 'bg-[#F5F3FF] border border-purple-200/60 text-[#312E81] rounded-tl-none shadow-2xs'
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1.5 ${
                  msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-purple-400'
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-purple-600 p-2 animate-pulse bg-purple-50/60 rounded-xl border border-purple-100 max-w-sm">
            <Bot className="h-4 w-4" />
            <span className="font-medium">Placement Coach is formulating your personalized guidance...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-2.5"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Placement Coach (e.g. 'I have only 1 hour today', 'What should I study for TCS?')..."
          className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none shadow-xs"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-500/25 transition-all flex items-center space-x-1.5 hover:-translate-y-0.5"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

      {/* Optional API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">Configure Google Gemini API (Optional)</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              PlacementAI includes built-in realistic placement coaching heuristics that work with zero configuration. You can optionally supply your own Gemini API key for external real-time text generation.
            </p>
            <input
              type="password"
              value={customKey}
              onChange={e => setCustomKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none font-mono"
            />
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowApiKeyModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm"
              >
                Save Preference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
