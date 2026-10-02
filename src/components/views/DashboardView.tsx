import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  Target,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Clock,
  Code2,
  Bot,
  Mic,
  FileText,
  Building2,
  ChevronRight,
  Calendar,
  AlertCircle,
  Play,
  Award
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { student, skills, roadmap, setActiveTab, addToast } = useApp();

  const criticalGaps = skills.filter(s => s.status === 'Critical Gap');
  const needsImpGaps = skills.filter(s => s.status === 'Needs Improvement');

  // Compute completed tasks
  const allTasks = roadmap.weeks.flatMap(w => w.tasks);
  const completedTasks = allTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Hero Banner (Premium Light Gradient Card) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-[#ECFEFF] border border-[#DDD6FE] p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3E8FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>AI Placement Preparation Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Good morning, {student.name} 👋
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Targeting{' '}
              <span className="font-bold text-[#4F46E5] bg-white/80 px-2 py-0.5 rounded-lg border border-indigo-100 shadow-2xs">
                {student.targetRole}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-slate-900">
                {student.targetCompanies.slice(0, 3).join(', ')}
              </span>
              . Placement season is coming up — follow your adaptive 30-day roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('coach')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-indigo-50/50 text-indigo-700 border border-indigo-200 transition-all shadow-xs hover:-translate-y-0.5"
            >
              <Bot className="h-4 w-4 text-[#7C3AED]" />
              <span>Ask AI Coach</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/35 hover:-translate-y-0.5"
            >
              <span>View 30-Day Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 -mt-12 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Primary KPI Cards (White Cards with Distinct Accents) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Placement Readiness */}
        <div
          onClick={() => setActiveTab('skillgap')}
          className="p-5 rounded-[18px] bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Placement Readiness</span>
            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#0F172A]">
              {student.readinessScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-slate-400">Target: 80+</span>
              <span className="text-indigo-600">
                {student.readinessScore >= 80 ? 'Placement Ready' : `Gap: -${80 - student.readinessScore} pts`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F46E5] via-[#06B6D4] to-[#10B981] rounded-full transition-all duration-700"
                style={{ width: `${student.readinessScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Today's Goal */}
        <div
          onClick={() => setActiveTab('roadmap')}
          className="p-5 rounded-[18px] bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Today's Goal</span>
            <div className="h-7 w-7 rounded-lg bg-cyan-50 text-[#06B6D4] flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#06B6D4]">3</span>
            <span className="text-xs text-slate-500 font-semibold">priority tasks</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
            <span>Est. {student.preferredHoursPerDay} hrs study time</span>
          </div>
        </div>

        {/* Card 3: Primary Skill Gap */}
        <div
          onClick={() => setActiveTab('skillgap')}
          className="p-5 rounded-[18px] bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Primary Skill Gap</span>
            <div className="h-7 w-7 rounded-lg bg-rose-50 text-[#F43F5E] flex items-center justify-center">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-[#F43F5E]">
              {criticalGaps[0]?.skillName.split(' ')[0] || 'DSA'}
            </span>
            <span className="text-xs font-bold text-rose-500">({criticalGaps[0]?.score || 48}%)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 truncate font-medium max-w-[140px]">
              {criticalGaps[0]?.recommendedAction || 'Recursion & Trees revision'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] border border-rose-200">
              Critical Gap
            </span>
          </div>
        </div>

        {/* Card 4: Current Streak */}
        <div
          onClick={() => setActiveTab('progress')}
          className="p-5 rounded-[18px] bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Current Streak</span>
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#F59E0B]">
              {student.streak}
            </span>
            <span className="text-xs text-slate-500 font-semibold">days active</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-[#D97706] font-medium bg-[#FFFBEB] px-2.5 py-1 rounded-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{student.problemsSolved} problems solved</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Personalized Plan + Visual Readiness Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Today's Personalized Plan */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Today's Personalized Plan</h3>
                <p className="text-xs text-slate-500 font-medium">Curated based on your critical gaps in DSA & Database queries</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Day 22 of 30
              </span>
            </div>

            <div className="space-y-3">
              {/* Task 1: Critical Gap (Rose accent) */}
              <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FFE4E6] hover:border-rose-300 transition-colors flex items-center justify-between group shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-lg bg-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    1
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-rose-600 transition-colors">
                        Arrays & Two Pointers (Two Sum & 3Sum)
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#E11D48] border border-rose-200 font-bold">
                        Critical Gap
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Focus: Asymptotic time complexity analysis and in-place hash lookup.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-bold text-rose-700">30 min</span>
                  <button
                    onClick={() => {
                      addToast('Task Started', 'Opening Two Sum challenge in Practice Arena', 'info');
                      setActiveTab('practice');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white transition-all shadow-xs hover:-translate-y-0.5"
                  >
                    Start
                  </button>
                </div>
              </div>

              {/* Task 2: Needs Polish (Amber accent) */}
              <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7] hover:border-amber-300 transition-colors flex items-center justify-between group shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    2
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors">
                        SQL Joins & Window Functions (DENSE_RANK)
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#D97706] border border-amber-200 font-bold">
                        Needs Polish
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Practice writing multi-table INNER vs LEFT JOINs and second-highest salary queries.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-bold text-amber-700">20 min</span>
                  <button
                    onClick={() => {
                      addToast('Task Started', 'Launching SQL Window functions practice', 'info');
                      setActiveTab('practice');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white transition-all shadow-xs hover:-translate-y-0.5"
                  >
                    Start
                  </button>
                </div>
              </div>

              {/* Task 3: Interview (Indigo accent) */}
              <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#E0E7FF] hover:border-indigo-300 transition-colors flex items-center justify-between group shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    3
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                        Behavioral STAR Pitch Formulation
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 font-bold">
                        Interview
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Draft 1 concise story answering: "Describe a project challenge and how you solved it."
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-bold text-indigo-700">10 min</span>
                  <button
                    onClick={() => {
                      addToast('Task Started', 'Launching AI Mock Interview Simulator', 'info');
                      setActiveTab('interview');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white transition-all shadow-xs hover:-translate-y-0.5"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3.5 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Total estimated time: 60 minutes
              </span>
              <button
                onClick={() => {
                  addToast('Today’s Plan Activated! 🚀', 'Starting task 1: Arrays & Two Pointers', 'success');
                  setActiveTab('practice');
                }}
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                Start Today's Plan (3 Tasks) →
              </button>
            </div>
          </div>

          {/* Presentation-Friendly Feedback Loop Flow */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-[#4F46E5]" />
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  The PlacementAI Feedback Loop
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Continuous Placement Coaching Cycle</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="text-[10px] text-[#2563EB] font-bold uppercase">1. ASSESS</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Diagnostic</div>
                <div className="text-[10px] text-slate-500 font-medium">30 questions</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="text-[10px] text-[#E11D48] font-bold uppercase">2. ANALYZE</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Skill Gaps</div>
                <div className="text-[10px] text-slate-500 font-medium">Deep 'WHY'</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
                <div className="text-[10px] text-[#7C3AED] font-bold uppercase">3. PERSONALIZE</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Adaptive Plan</div>
                <div className="text-[10px] text-slate-500 font-medium">30-day roadmap</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200">
                <div className="text-[10px] text-[#0891B2] font-bold uppercase">4. PRACTICE</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Daily Arena</div>
                <div className="text-[10px] text-slate-500 font-medium">Code & Quants</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200">
                <div className="text-[10px] text-[#4F46E5] font-bold uppercase">5. REASSESS</div>
                <div className="text-xs font-bold text-slate-900 mt-1">AI Mock Int.</div>
                <div className="text-[10px] text-slate-500 font-medium">Audio & rubrics</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] text-[#059669] font-bold uppercase">6. READY</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Target 80+</div>
                <div className="text-[10px] text-slate-500 font-medium">Campus Placed!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Placement Readiness Breakdown & Circular Visualization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h3 className="text-sm font-bold text-[#0F172A]">Placement Readiness Breakdown</h3>
              <span className="text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer" onClick={() => setActiveTab('digitaltwin')}>
                View Digital Twin →
              </span>
            </div>

            {/* Circular Gauge Visualization */}
            <div className="flex items-center justify-center py-2">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    className="text-[#E2E8F0]"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    className="text-[#4F46E5]"
                    strokeWidth="10"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * student.readinessScore) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-[#0F172A]">
                    {student.readinessScore}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Readiness</span>
                  <span className="text-[10px] text-[#7C3AED] font-extrabold mt-0.5">Target: 80+</span>
                </div>
              </div>
            </div>

            {/* Sub-Score Progress Bars */}
            <div className="space-y-3 pt-1 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Technical Foundation</span>
                  <span className="font-bold text-indigo-600">{student.breakdown.technical} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" style={{ width: `${student.breakdown.technical}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Cognitive Aptitude</span>
                  <span className="font-bold text-emerald-600">{student.breakdown.aptitude} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: `${student.breakdown.aptitude}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Coding & Problem Solving</span>
                  <span className="font-bold text-rose-600">{student.breakdown.coding} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full" style={{ width: `${student.breakdown.coding}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Professional Communication</span>
                  <span className="font-bold text-sky-600">{student.breakdown.communication} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" style={{ width: `${student.breakdown.communication}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Interview Readiness</span>
                  <span className="font-bold text-amber-600">{student.breakdown.interview} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{ width: `${student.breakdown.interview}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Resume ATS Readiness</span>
                  <span className="font-bold text-purple-600">{student.breakdown.resume} / 100</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{ width: `${student.breakdown.resume}%` }} />
                </div>
              </div>
            </div>

            {/* Target 80+ Advice Callout */}
            <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-indigo-200 text-xs text-indigo-950 space-y-1 shadow-2xs">
              <div className="font-bold text-indigo-700 flex items-center space-x-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-indigo-600" />
                <span>How to reach 80+ Target (+13 points):</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Boosting your DSA score from 48% → 70% and Interview structure from 51% → 72% will elevate your overall Placement Readiness to <strong>81/100</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Launchpad to Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => setActiveTab('practice')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md cursor-pointer transition-all flex items-center space-x-3 group shadow-xs hover:-translate-y-0.5"
        >
          <div className="h-10 w-10 rounded-xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#06B6D4] transition-colors">Practice Arena</h4>
            <p className="text-[11px] text-slate-500 font-medium">Coding, Quants & MCQs</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('interview')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex items-center space-x-3 group shadow-xs hover:-translate-y-0.5"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#3B82F6] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">AI Mock Interview</h4>
            <p className="text-[11px] text-slate-500 font-medium">Technical & HR Simulator</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('resume')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all flex items-center space-x-3 group shadow-xs hover:-translate-y-0.5"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#10B981] transition-colors">Resume Analyzer</h4>
            <p className="text-[11px] text-slate-500 font-medium">ATS Score & Keyword Match</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('company')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md cursor-pointer transition-all flex items-center space-x-3 group shadow-xs hover:-translate-y-0.5"
        >
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#F59E0B] transition-colors">Company Prep</h4>
            <p className="text-[11px] text-slate-500 font-medium">TCS, Amazon, Zoho, Infosys</p>
          </div>
        </div>
      </div>
    </div>
  );
};
