import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/layout/ToastContainer';

import { LandingPage } from './components/views/LandingPage';
import { AuthModal } from './components/views/AuthModal';
import { DashboardView } from './components/views/DashboardView';
import { AssessmentView } from './components/views/AssessmentView';
import { SkillGapView } from './components/views/SkillGapView';
import { RoadmapView } from './components/views/RoadmapView';
import { PracticeArenaView } from './components/views/PracticeArenaView';
import { AICoachView } from './components/views/AICoachView';
import { MockInterviewView } from './components/views/MockInterviewView';
import { ResumeAnalyzerView } from './components/views/ResumeAnalyzerView';
import { CompanyPrepView } from './components/views/CompanyPrepView';
import { ProgressDashboardView } from './components/views/ProgressDashboardView';
import { DigitalTwinView } from './components/views/DigitalTwinView';
import { InnovationView } from './components/views/InnovationView';
import { AdminView } from './components/views/AdminView';

import { Menu, X } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If activeTab is landing, render LandingPage with full width
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <LandingPage onOpenAuth={() => setAuthModalOpen(true)} />
        </main>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <Navbar />

      {/* Mobile Sidebar Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 text-xs shadow-xs">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center space-x-2 text-indigo-600 font-semibold p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
        >
          {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span>{mobileSidebarOpen ? 'Close Navigation' : 'Open Navigation'}</span>
        </button>
        <span className="text-slate-500 capitalize font-medium">{activeTab} View</span>
      </div>

      <div className="flex-1 flex w-full relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50 w-72 bg-[#0F172A] border-r border-slate-800 h-full overflow-y-auto">
              <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
            </div>
          </div>
        )}

        {/* Main Workspace Area with light background */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full min-w-0 bg-[#F8FAFC]">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'assessment' && <AssessmentView />}
          {activeTab === 'skillgap' && <SkillGapView />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'practice' && <PracticeArenaView />}
          {activeTab === 'coach' && <AICoachView />}
          {activeTab === 'interview' && <MockInterviewView />}
          {activeTab === 'resume' && <ResumeAnalyzerView />}
          {activeTab === 'company' && <CompanyPrepView />}
          {activeTab === 'progress' && <ProgressDashboardView />}
          {activeTab === 'digitaltwin' && <DigitalTwinView />}
          {activeTab === 'innovation' && <InnovationView />}
          {activeTab === 'admin' && <AdminView />}
        </main>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};
