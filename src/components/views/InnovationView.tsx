import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lightbulb,
  XCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Brain,
  Compass
} from 'lucide-react';

export const InnovationView: React.FC = () => {
  const { setActiveTab } = useApp();

  const comparisonRows = [
    {
      feature: 'Core Philosophy',
      traditional: 'Content-First: Provides hundreds of hours of video lectures and leaves the student overwhelmed.',
      placementAi: 'Outcome-First: Continuously tells the student what THEY should do next to close their specific gaps.'
    },
    {
      feature: 'Starting Point',
      traditional: 'Arbitrary: Students pick random courses or popular DSA sheets regardless of what they already know.',
      placementAi: 'Diagnostic Assessment: Rigorous 30Q test across Technical, Aptitude, Communication, and Interview.'
    },
    {
      feature: 'Roadmap Nature',
      traditional: 'Static: A one-size-fits-all syllabus created months ago that never changes.',
      placementAi: 'Dynamic & Adaptive: Injects remedial tasks if you struggle; unlocks advanced topics as you master concepts.'
    },
    {
      feature: 'Diagnostic Depth',
      traditional: 'Score-Only: Shows a simple percentage (e.g. 52%) without explanation.',
      placementAi: 'Root-Cause Diagnosis: Explains WHY you scored low (e.g. missed tree traversals) and prescribes exact remedy.'
    },
    {
      feature: 'Interview Preparation',
      traditional: 'Passive reading of top 50 HR questions without feedback.',
      placementAi: 'Active AI Mock Interview Simulator evaluating relevance, depth, structure, clarity, confidence & grammar.'
    },
    {
      feature: 'Target Benchmark',
      traditional: 'Unclear completion certificates with zero placement correlation.',
      placementAi: 'Placement Readiness Score: A calibrated 0–100 benchmark targeting 80+ for Tier-1 screening.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-50/80 via-purple-50/50 to-indigo-50/80 border border-amber-200/80 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-[#D97706] text-xs font-bold border border-amber-200">
          <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
          <span>Product Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Not Another Learning Platform.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          The engineering education ecosystem does not suffer from a lack of content. It suffers from a lack of direction. PlacementAI fixes the broken placement prep loop.
        </p>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Traditional Course Warehouses vs. PlacementAI Closed-Loop Coaching
          </h2>
        </div>

        <div className="divide-y divide-slate-100 text-xs sm:text-sm">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-4 items-center">
              <div className="md:col-span-3 font-bold text-[#0F172A] text-xs uppercase tracking-wider">
                {row.feature}
              </div>

              {/* Traditional */}
              <div className="md:col-span-4 p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 text-xs flex items-start space-x-2.5">
                <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{row.traditional}</span>
              </div>

              {/* PlacementAI */}
              <div className="md:col-span-5 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 text-xs flex items-start space-x-2.5 font-semibold shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{row.placementAi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Core Thesis Quote */}
      <div className="p-7 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-blue-50/90 border border-indigo-200/80 text-center space-y-3.5 shadow-xs">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
          "Placement preparation should not be the same for every student."
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Every candidate arrives with different strengths: some excel at aptitude but freeze in behavioral rounds; others write clean code but struggle with asymptotic complexity. PlacementAI adapts to each individual student.
        </p>
        <button
          onClick={() => setActiveTab('assessment')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
        >
          Experience the Assessment Loop →
        </button>
      </div>
    </div>
  );
};
