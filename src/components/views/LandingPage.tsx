import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  Compass,
  CheckCircle2,
  Code2,
  FileText,
  Mic,
  LineChart,
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { setActiveTab, loadDemoStudent, resetToFreshStudent } = useApp();

  const targetRoles = [
    { title: 'Software Developer', icon: '💻', count: '5.2k students' },
    { title: 'Machine Learning Engineer', icon: '🤖', count: '3.8k students' },
    { title: 'Full Stack Developer', icon: '🌐', count: '4.6k students' },
    { title: 'Data Scientist', icon: '📊', count: '2.9k students' },
    { title: 'AI Engineer', icon: '🧠', count: '2.4k students' },
    { title: 'Data Analyst', icon: '📈', count: '3.1k students' },
    { title: 'QA & Automation Engineer', icon: '⚡', count: '1.9k students' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI Skill-Gap Diagnostics',
      desc: 'Pinpoints specific weaknesses across DSA, core CS, quantitative aptitude, and behavioral responses.'
    },
    {
      icon: Compass,
      title: 'Adaptive Dynamic Roadmap',
      desc: 'A personalized 30-day plan that shifts difficulty and prerequisites based on your actual practice scores.'
    },
    {
      icon: Mic,
      title: 'Voice & Text AI Mock Interviews',
      desc: 'Simulate technical and HR interviews with immediate evaluation across clarity, confidence, and structure.'
    },
    {
      icon: FileText,
      title: 'Role-Specific Resume ATS Engine',
      desc: 'Benchmark your resume against target company job descriptions and convert bullet points into XYZ achievements.'
    },
    {
      icon: Code2,
      title: 'Targeted Practice Arena',
      desc: 'Curated coding challenges, time-pressured aptitude quizzes, and core CS MCQs with step-by-step walkthroughs.'
    },
    {
      icon: LineChart,
      title: 'Placement Readiness Score',
      desc: 'A single high-fidelity score (0–100) reflecting real-world readiness to clear technical screening rounds.'
    }
  ];

  const howItWorksSteps = [
    { step: 1, title: 'Create Your Profile', desc: 'Set your target role (e.g. ML Engineer), target companies (TCS, Amazon, Google), and preparation deadline.' },
    { step: 2, title: 'Take Placement Assessment', desc: 'Complete a realistic 30-question diagnostic test across Technical, Aptitude, Communication, and Interview.' },
    { step: 3, title: 'Get Your Skill Gap Report', desc: 'Discover your Strong, Needs Improvement, and Critical Gap areas with clear explanations of WHY you missed marks.' },
    { step: 4, title: 'Receive Personalized Roadmap', desc: 'Get an adaptive 4-week task checklist curated specifically around your unique gaps.' },
    { step: 5, title: 'Practice Daily with AI Coach', desc: 'Solve targeted problems and ask the AI Coach: "How should I prepare today with 1 hour?"' },
    { step: 6, title: 'Take AI Mock Interviews', desc: 'Rehearse technical and behavioral rounds with simulated AI interviewers for real-time scoring.' },
    { step: 7, title: 'Track Continuous Improvement', desc: 'Watch your Placement Readiness Score climb toward the 80+ benchmark!' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>The Personal AI Placement Coach for Engineering Students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Know Where You Stand.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
                  Know What To Prepare.
                </span>{' '}
                Get Placement Ready.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                PlacementAI analyzes your skills, identifies your gaps, and builds a personalized preparation roadmap for your target career. Stop guessing what to study next.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    resetToFreshStudent();
                    setActiveTab('assessment');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
                >
                  <span>Start My Placement Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    loadDemoStudent();
                    setActiveTab('dashboard');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm transition-all hover:border-slate-400"
                >
                  <span>Explore Demo (Kavin S — ML Engineer)</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>30Q Diagnostic Test</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Adaptive Roadmaps</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Real-time AI Mock Interviews</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Preview Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 space-y-4">
                {/* Header Mock */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      KS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Kavin S</h4>
                      <p className="text-[11px] text-indigo-600 font-medium">Target: Machine Learning Engineer</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Active Coach
                  </span>
                </div>

                {/* Score Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-indigo-50/80 border border-indigo-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Placement Readiness</span>
                    <div className="text-3xl font-extrabold text-slate-900 mt-0.5">
                      67<span className="text-sm font-normal text-slate-500"> / 100</span>
                    </div>
                    <span className="text-[11px] text-amber-700 font-medium">Target: 80+ (Gap: -13 pts)</span>
                  </div>
                  <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-indigo-600 flex items-center justify-center text-xs font-bold text-indigo-700 bg-white shadow-sm">
                    67%
                  </div>
                </div>

                {/* Gaps Preview */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">Identified Critical Gaps</span>
                    <span className="text-rose-600 font-semibold">Priority Action</span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
                    <span className="font-medium">🔴 DSA & Recursion (48%)</span>
                    <span className="text-[11px] text-slate-500">Arrays → Trees ladder</span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
                    <span className="font-medium">🔴 Operating Systems (44%)</span>
                    <span className="text-[11px] text-slate-500">Virtual Memory & Thrashing</span>
                  </div>
                </div>

                {/* Today's Adaptive Action */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-800 flex items-center space-x-1.5">
                    <Sparkles className="h-3 w-3 text-indigo-600" />
                    <span>Today's Adaptive Plan (3 Tasks)</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pl-4 border-l-2 border-indigo-500 space-y-1">
                    <p className="text-slate-900 font-medium">1. DSA Binary Tree Traversals (30 min)</p>
                    <p>2. SQL Window Functions Practice (20 min)</p>
                    <p>3. Behavioral STAR Mock Pitch (10 min)</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    loadDemoStudent();
                    setActiveTab('dashboard');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
                >
                  Launch Full Interactive Dashboard →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KEY DIFFERENTIATOR BANNER */}
      <section className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-indigo-50/80 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
            The PlacementAI Differentiator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            "Most platforms give students content.{' '}
            <span className="text-indigo-700 underline decoration-indigo-300 decoration-2 underline-offset-4">
              PlacementAI tells students what THEY should do next.
            </span>"
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Traditional websites drown you in hundreds of hours of video playlists. PlacementAI continuously assesses your real performance, diagnoses skill gaps, and serves the exact high-leverage drill needed today.
          </p>
        </div>
      </section>

      {/* Target Roles Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-2xl font-bold text-slate-900">Target Roles Prepared</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Tailored roadmaps, company question banks, and AI interviewers for every major software engineering path.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {targetRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:bg-indigo-50/20 transition-all cursor-pointer group"
              onClick={() => {
                loadDemoStudent();
                setActiveTab('dashboard');
              }}
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {role.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">{role.count}</p>
            </div>
          ))}
          <div
            className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-white text-slate-600 hover:text-indigo-600 transition-all"
            onClick={onOpenAuth}
          >
            <span className="text-lg font-bold text-indigo-600">+ Add Role</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Customize for your dream career</span>
          </div>
        </div>
      </section>

      {/* Why PlacementAI? Section */}
      <section className="py-16 px-4 bg-slate-100/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Comprehensive Suite</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why PlacementAI?</h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Everything engineering and college students need to move from uncertain preparation to campus placement confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works (7 Steps) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Proven Methodology</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How It Works</h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            A 7-step feedback loop that transforms random studying into systematic placement readiness.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {howItWorksSteps.map((st) => (
              <div
                key={st.step}
                className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-3 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-sm">
                    {st.step}
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-tight">{st.title}</h5>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-center space-y-4 shadow-xl shadow-indigo-500/20">
          <h4 className="text-xl sm:text-2xl font-bold">
            Ready to find your Placement Readiness Score?
          </h4>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto">
            Join thousands of engineering students preparing for Tier-1 product and mass IT recruiting drives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                resetToFreshStudent();
                setActiveTab('assessment');
              }}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-100 text-indigo-700 shadow-md transition-all"
            >
              Start Diagnostic Assessment (30 Questions)
            </button>
            <button
              onClick={() => {
                loadDemoStudent();
                setActiveTab('dashboard');
              }}
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-indigo-700/80 hover:bg-indigo-700 text-white border border-white/20 transition-all"
            >
              Load Kavin's Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <p>© 2026 PlacementAI. Built for engineering students and campus placement cells.</p>
        <p className="mt-1 text-slate-400">Assess • Analyze • Personalize • Practice • Improve • Track</p>
      </footer>
    </div>
  );
};
