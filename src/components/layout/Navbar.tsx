import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  Award,
  Bell,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  UserCheck,
  Shield,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    student,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    activeTab,
    setActiveTab,
    resetToFreshStudent,
    loadDemoStudent,
    isDemoMode,
    userRole,
    setUserRole
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-colors">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-2.5 text-left group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Placement<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  AI Placement Coach
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Assess • Analyze • Personalize • Practice • Excel
              </p>
            </div>
          </button>
        </div>

        {/* Center Target Role Pill */}
        <div className="hidden lg:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs shadow-xs">
          <span className="text-slate-500 font-medium">Target Role:</span>
          <span className="font-bold text-indigo-600">{student.targetRole}</span>
          <span className="text-slate-300">•</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669] border border-emerald-200">
            Readiness: {student.readinessScore}/100
          </span>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Demo Mode Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowModeMenu(!showModeMenu)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-2xs"
              title="Switch demo student scenario"
            >
              <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
              <span>{userRole === 'admin' ? 'Admin Mode' : isDemoMode ? 'Demo: Kavin S' : 'Fresh Student'}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showModeMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Demonstration Mode
                </div>

                <button
                  onClick={() => {
                    loadDemoStudent();
                    setShowModeMenu(false);
                  }}
                  className={`w-full flex items-start space-x-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                    isDemoMode && userRole === 'student'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-1 rounded-lg bg-indigo-100 text-indigo-600 mt-0.5">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Demo Student (Kavin S)</div>
                    <div className="text-[11px] text-slate-500">ML Engineer • 67/100 Readiness • 21/30 Tasks</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    resetToFreshStudent();
                    setShowModeMenu(false);
                  }}
                  className={`w-full flex items-start space-x-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                    !isDemoMode && userRole === 'student'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-1 rounded-lg bg-amber-100 text-amber-600 mt-0.5">
                    <RotateCcw className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Fresh Student (New)</div>
                    <div className="text-[11px] text-slate-500">Take 30Q Diagnostic Test from scratch</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    setUserRole(userRole === 'admin' ? 'student' : 'admin');
                    setActiveTab(userRole === 'admin' ? 'dashboard' : 'admin');
                    setShowModeMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 p-2 rounded-xl text-left text-xs transition-colors ${
                    userRole === 'admin'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Shield className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="font-bold text-slate-900">Toggle Admin Panel</div>
                    <div className="text-[11px] text-slate-500">Manage questions, students & analytics</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Gamification Streak (Light Amber pill) */}
          <div
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FFFBEB] border border-amber-200 text-[#D97706] text-xs font-bold cursor-pointer hover:bg-amber-100/70 transition-colors shadow-2xs"
            title="Daily Practice Streak"
            onClick={() => setActiveTab('progress')}
          >
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>{student.streak}d Streak</span>
          </div>

          {/* Gamification Level & XP (Light Purple pill) */}
          <div
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FAF5FF] border border-purple-200 text-[#7C3AED] text-xs font-bold cursor-pointer hover:bg-purple-100/70 transition-colors shadow-2xs"
            title={`Level ${student.level} - ${student.levelName}`}
            onClick={() => setActiveTab('progress')}
          >
            <Award className="h-4 w-4 text-[#7C3AED]" />
            <span>Lvl {student.level} • {student.xp} XP</span>
          </div>

          {/* Notifications Dropdown (White background + Rose badge) */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F43F5E] text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Placement Notifications ({unreadCount} new)
                  </span>
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                        n.read
                          ? 'bg-slate-50 text-slate-500'
                          : 'bg-indigo-50/70 text-slate-800 border-l-3 border-indigo-600 font-medium'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-semibold pr-2">{n.text}</p>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-1 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Landing / Explore Button */}
          {activeTab !== 'landing' ? (
            <button
              onClick={() => setActiveTab('landing')}
              className="hidden sm:flex items-center space-x-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50/50 transition-colors shadow-2xs"
            >
              <span>Landing Page</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
            >
              <span>Go to Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
