import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  TrendingDown,
  Map,
  Code2,
  Bot,
  Mic,
  FileText,
  Building2,
  LineChart,
  Cpu,
  Lightbulb,
  ShieldAlert,
  Target
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, student, userRole } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'assessment',
      label: 'Diagnostic Assessment',
      icon: ClipboardCheck,
      badge: student.assessmentCompleted ? 'Done' : '30Q',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'skillgap',
      label: 'Skill Gap Analysis',
      icon: TrendingDown,
      badge: 'AI Report',
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    },
    {
      id: 'roadmap',
      label: 'Personalized Roadmap',
      icon: Map,
      badge: 'Adaptive',
      badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    },
    {
      id: 'practice',
      label: 'Practice Arena',
      icon: Code2,
      badge: 'Coding',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    },
    {
      id: 'coach',
      label: 'AI Daily Coach',
      icon: Bot,
      badge: 'Live AI',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
    },
    {
      id: 'interview',
      label: 'AI Mock Interview',
      icon: Mic,
      badge: 'Audio',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
    },
    {
      id: 'resume',
      label: 'Resume Analyzer',
      icon: FileText,
      badge: 'ATS 72%',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'company',
      label: 'Company Prep',
      icon: Building2,
      badge: '10 Tech',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    },
    {
      id: 'progress',
      label: 'Progress & Analytics',
      icon: LineChart,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'digitaltwin',
      label: 'Readiness Digital Twin',
      icon: Cpu,
      badge: 'Interactive',
      badgeColor: 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
    },
    {
      id: 'innovation',
      label: 'Why PlacementAI?',
      icon: Lightbulb,
      badge: 'Manifesto',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    },
  ];

  if (userRole === 'admin') {
    navItems.push({
      id: 'admin',
      label: 'Admin Dashboard',
      icon: ShieldAlert,
      badge: 'Admin',
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    });
  }

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#0F172A] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 overflow-y-auto">
      {/* Top Nav Items */}
      <div className="p-3.5 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Placement Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20'
                  : 'text-[#CBD5E1] hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#94A3B8]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Visual Concept Flow */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/60">
        <div className="rounded-xl p-3.5 bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-indigo-400 mb-2.5 uppercase tracking-wider">
            <Target className="h-3.5 w-3.5" />
            <span>How PlacementAI Works</span>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono font-medium">
            <div className="flex items-center space-x-2 text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-xs shadow-indigo-500" />
              <span>1. ASSESS</span>
            </div>
            <div className="pl-3.5 text-slate-500 text-[10px]">↓</div>
            <div className="flex items-center space-x-2 text-rose-300">
              <span className="h-2 w-2 rounded-full bg-rose-500 shadow-xs shadow-rose-500" />
              <span>2. ANALYZE GAPS</span>
            </div>
            <div className="pl-3.5 text-slate-500 text-[10px]">↓</div>
            <div className="flex items-center space-x-2 text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-500 shadow-xs shadow-purple-500" />
              <span>3. PERSONALIZE ROADMAP</span>
            </div>
            <div className="pl-3.5 text-slate-500 text-[10px]">↓</div>
            <div className="flex items-center space-x-2 text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-xs shadow-cyan-400" />
              <span>4. PRACTICE & INTERVIEW</span>
            </div>
            <div className="pl-3.5 text-slate-500 text-[10px]">↓</div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
              <span>5. PLACEMENT READY 80+</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Readiness:</span>
            <span className="font-extrabold text-white">
              {student.readinessScore} / 100
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
