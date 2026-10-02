import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_PROFILES } from '../../data/companies';
import { CompanyProfile } from '../../types';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  Layers,
  Target,
  Award
} from 'lucide-react';

export const CompanyPrepView: React.FC = () => {
  const { student, skills, setActiveTab, addToast } = useApp();
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile>(COMPANY_PROFILES[0]);

  // Adjust company readiness dynamically based on student actual scores
  const techScore = student.breakdown.technical || 68;
  const codingScore = student.breakdown.coding || 48;
  const aptScore = student.breakdown.aptitude || 76;
  const intScore = student.breakdown.interview || 51;

  // Weighted calculation for this company
  const dynamicCompanyReadiness = Math.round(
    (techScore * 0.3) + (codingScore * 0.3) + (aptScore * 0.25) + (intScore * 0.15)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner (Amber Section Identity) */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-indigo-50/80 border border-amber-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-[#D97706] text-xs font-bold border border-amber-200">
              Company-Specific Framework
            </span>
            <span className="text-xs text-slate-500 font-medium">• 10 Top Tech Recruiters</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mt-1.5">Company Placement Preparation</h1>
          <p className="text-xs text-slate-600">
            Targeted hiring patterns, technical interview focus areas, and role readiness scoring.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('practice');
            addToast('Practice Arena Ready', `Loaded question bank for ${selectedCompany.name}`, 'info');
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
        >
          <span>Practice for {selectedCompany.name.split(' ')[0]}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 10 Companies Horizontal Scroll / Grid */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
        {COMPANY_PROFILES.map(comp => {
          const isSelected = selectedCompany.id === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompany(comp)}
              className={`p-3.5 rounded-2xl border text-left shrink-0 transition-all min-w-[140px] shadow-2xs hover:-translate-y-0.5 ${
                isSelected
                  ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-200 text-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] font-bold text-amber-700 uppercase truncate">
                {comp.badge.split(' ')[0]}
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] truncate mt-0.5">{comp.name.split(' ')[0]}</h4>
              <div className="text-[10px] text-emerald-700 font-bold mt-1">
                Readiness: {comp.readinessPercentage}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Company Profile Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
        {/* Company Title & Focus */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {selectedCompany.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1.5">
              {selectedCompany.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              <strong>Hiring Focus:</strong> {selectedCompany.hiringFocus}
            </p>
          </div>

          {/* Your Readiness for this target */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-4 shrink-0 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                Your Readiness for this Target
              </span>
              <div className="text-2xl font-black text-[#0F172A] mt-0.5">
                {dynamicCompanyReadiness}%
              </div>
              <span className="text-[10px] text-amber-700 font-bold">Target: 75%+</span>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-emerald-400 flex items-center justify-center text-xs font-black text-indigo-700 bg-white">
              {dynamicCompanyReadiness}%
            </div>
          </div>
        </div>

        {/* 4 Dimension Readiness Breakdown for this Company */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Technical Core</span>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">{techScore}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${techScore}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Coding & DSA</span>
            <div className="text-xl font-black text-rose-600 mt-0.5">{codingScore}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${codingScore}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Cognitive Aptitude</span>
            <div className="text-xl font-black text-emerald-600 mt-0.5">{aptScore}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${aptScore}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Interview Readiness</span>
            <div className="text-xl font-black text-amber-600 mt-0.5">{intScore}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${intScore}%` }} />
            </div>
          </div>
        </div>

        {/* AI Targeted Advice for this company based on actual assessment */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5 shadow-2xs">
          <div className="font-bold text-amber-800 flex items-center space-x-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>AI Recommendation for {student.name} ({student.targetRole}):</span>
          </div>
          <p className="leading-relaxed text-slate-700 pl-5 font-medium">
            For {selectedCompany.name}, your aptitude foundation ({aptScore}%) is fully sufficient to clear Round 1 screening. However, your Coding score ({codingScore}%) is currently below the historical qualification threshold. Focus your next 5 days on: <strong>{selectedCompany.mustKnowTopics.slice(0, 3).join(', ')}</strong>.
          </p>
        </div>

        {/* Detailed Round-by-Round Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Standard Selection Rounds & Preparation Strategy
          </h3>

          <div className="space-y-3">
            {selectedCompany.rounds.map((round, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-indigo-700">{round.roundName}</h4>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                    Pattern: {round.pattern}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{round.description}</p>
                <div className="text-[11px] text-amber-900 bg-amber-100/70 p-2.5 rounded-lg border border-amber-200">
                  <strong>Recommended Strategy:</strong> {round.prepStrategy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Must-Know High Frequency Topics */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            High-Frequency Technical Topics for {selectedCompany.name.split(' ')[0]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCompany.mustKnowTopics.map((topic, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 border border-indigo-200 text-xs font-semibold shadow-2xs">
                ⚡ {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
