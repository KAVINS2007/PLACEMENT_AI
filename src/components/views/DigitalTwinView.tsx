import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  BarChart3
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { student, skills, setActiveTab } = useApp();

  // Interactive simulation parameters
  const [extraDsaHours, setExtraDsaHours] = useState(10);
  const [mockInterviewSim, setMockInterviewSim] = useState(78);
  const [resumeOptimizationDone, setResumeOptimizationDone] = useState(true);

  // Projected readiness calculations
  const baselineReadiness = student.readinessScore || 67;
  const simulatedDsaGain = Math.round(extraDsaHours * 0.8);
  const simulatedInterviewGain = Math.round((mockInterviewSim - 51) * 0.25);
  const simulatedResumeGain = resumeOptimizationDone ? 4 : 0;

  const projectedScore = Math.min(
    95,
    Math.round(baselineReadiness + (simulatedDsaGain * 0.3) + simulatedInterviewGain + simulatedResumeGain)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner (Violet Section Identity) */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-50/80 via-purple-50/50 to-indigo-50/80 border border-violet-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-violet-100 text-[#7C3AED] text-xs font-bold border border-violet-200">
              Core Innovation
            </span>
            <span className="text-xs text-slate-500 font-medium">• Dynamic Student Representation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mt-1.5">Placement Readiness Digital Twin</h1>
          <p className="text-xs text-slate-600">
            A dynamic mathematical representation of your placement profile that updates with every test, drill, and interview.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-violet-200 text-center shrink-0 shadow-xs">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Projected Readiness</div>
          <div className="text-2xl font-black text-emerald-600 mt-0.5">{projectedScore} / 100</div>
          <span className="text-[11px] text-emerald-700 font-bold">+{projectedScore - baselineReadiness} points gain</span>
        </div>
      </div>

      {/* Concept Flow Architecture */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Digital Twin Continuous Optimization Loop
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1: Current State */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs">
              <span className="h-6 w-6 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-extrabold">1</span>
              <span>CURRENT STATE</span>
            </div>
            <div className="text-2xl font-black text-[#0F172A]">{baselineReadiness} / 100</div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Derived from diagnostic test, coding attempts, and current ATS resume parser.
            </p>
          </div>

          {/* Step 2: Skill Gaps */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs">
              <span className="h-6 w-6 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-extrabold">2</span>
              <span>SKILL GAPS</span>
            </div>
            <div className="text-base font-bold text-rose-700">DSA (48%) & OS (44%)</div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Recursion, Binary Trees, Page Replacement algorithms and STAR behavioral answers.
            </p>
          </div>

          {/* Step 3: Recommended Action */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
              <span className="h-6 w-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-extrabold">3</span>
              <span>RECOMMENDED ACTION</span>
            </div>
            <div className="text-base font-bold text-amber-800">10h DSA + 3 Mocks</div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Prioritize Week 2 & 3 tasks in Personalized Roadmap + AI Mock Interview rounds.
            </p>
          </div>

          {/* Step 4: Expected Improvement */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
              <span className="h-6 w-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-extrabold">4</span>
              <span>EXPECTED IMPROVEMENT</span>
            </div>
            <div className="text-2xl font-black text-emerald-700">{projectedScore} / 100</div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Exceeds 80+ benchmark, making candidate placement ready for Tier-1 screening!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-[#7C3AED]" />
              <h3 className="text-sm font-bold text-[#0F172A]">Digital Twin Simulation Knobs</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">What-If Scenarios</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-bold">Additional Targeted DSA Practice</span>
                <span className="font-extrabold text-indigo-600">+{extraDsaHours} Hours</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={extraDsaHours}
                onChange={e => setExtraDsaHours(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                Simulates mastering Two Pointers, Trees, and Cycle Detection.
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-bold">Target AI Mock Interview Score</span>
                <span className="font-extrabold text-indigo-600">{mockInterviewSim} / 100</span>
              </div>
              <input
                type="range"
                min={51}
                max={95}
                value={mockInterviewSim}
                onChange={e => setMockInterviewSim(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                Simulates applying STAR storytelling and rule-of-three technical structuring.
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Apply Google XYZ Resume Metrics</h4>
                <p className="text-[11px] text-slate-500">Incorporate Docker, FastAPI benchmarks, and metrics</p>
              </div>
              <input
                type="checkbox"
                checked={resumeOptimizationDone}
                onChange={e => setResumeOptimizationDone(e.target.checked)}
                className="h-4 w-4 rounded bg-white border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Real-time State Vector (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <h3 className="text-sm font-bold text-[#0F172A]">Live State Vector Projection</h3>
            <span className="text-xs text-emerald-600 font-bold">Simulated Model</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-600">DSA & Algorithmic Problem Solving</span>
                <span className="font-bold text-[#0F172A]">
                  48% → <span className="text-emerald-600 font-black">{Math.min(92, 48 + simulatedDsaGain)}%</span>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(92, 48 + simulatedDsaGain)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-600">Interview Communication & Structure</span>
                <span className="font-bold text-[#0F172A]">
                  51% → <span className="text-emerald-600 font-black">{mockInterviewSim}%</span>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${mockInterviewSim}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-600">Resume ATS Keyword Alignment</span>
                <span className="font-bold text-[#0F172A]">
                  72% → <span className="text-emerald-600 font-black">{resumeOptimizationDone ? 88 : 72}%</span>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${resumeOptimizationDone ? 88 : 72}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 hover:-translate-y-0.5"
            >
              <span>Commit Plan into Personalized Roadmap →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
