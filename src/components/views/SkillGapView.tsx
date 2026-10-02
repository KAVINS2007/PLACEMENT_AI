import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Target,
  Filter,
  BarChart3,
  Compass,
  Zap,
  Info
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { skills, student, setActiveTab } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Critical Gap' | 'Needs Improvement' | 'Strong'>('All');

  const filteredSkills = skills.filter(s => {
    if (selectedFilter === 'All') return true;
    return s.status === selectedFilter;
  });

  const strongCount = skills.filter(s => s.status === 'Strong').length;
  const needsImpCount = skills.filter(s => s.status === 'Needs Improvement').length;
  const criticalCount = skills.filter(s => s.status === 'Critical Gap').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner (Soft Rose + Amber Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-50/80 via-purple-50/50 to-amber-50/80 border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 text-[#E11D48] text-xs font-bold border border-rose-200">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>AI Diagnostic Synthesis</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Skill-Gap Analysis & Root-Cause Diagnosis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            We don't just calculate your score — our AI placement engine pinpoints <strong>WHY</strong> you lost marks and prescribes the exact next high-leverage drill.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('roadmap')}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 shrink-0"
        >
          <span>View Personalized Roadmap</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Summary KPI Cards (White Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Readiness Card */}
        <div className="p-5 rounded-[18px] bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</span>
            <div className="text-2xl font-black text-[#0F172A] mt-1">
              {student.readinessScore} <span className="text-xs font-medium text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-[#D97706] font-bold">Target: 80+</span>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500 flex items-center justify-center text-xs font-extrabold text-indigo-600 bg-indigo-50/50">
            {student.readinessScore}%
          </div>
        </div>

        {/* 🟢 Strong */}
        <div
          onClick={() => setSelectedFilter('Strong')}
          className={`p-5 rounded-[18px] border transition-all cursor-pointer shadow-xs ${
            selectedFilter === 'Strong'
              ? 'bg-emerald-50/80 border-emerald-500 shadow-sm'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">🟢 Strong Skills</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{strongCount}</div>
          <span className="text-[11px] text-slate-500 font-medium">Score &gt;= 75%</span>
        </div>

        {/* 🟡 Needs Improvement */}
        <div
          onClick={() => setSelectedFilter('Needs Improvement')}
          className={`p-5 rounded-[18px] border transition-all cursor-pointer shadow-xs ${
            selectedFilter === 'Needs Improvement'
              ? 'bg-amber-50/80 border-amber-500 shadow-sm'
              : 'bg-white border-slate-200 hover:border-amber-300 hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">🟡 Needs Polish</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{needsImpCount}</div>
          <span className="text-[11px] text-slate-500 font-medium">Score 50% – 74%</span>
        </div>

        {/* 🔴 Critical Gap */}
        <div
          onClick={() => setSelectedFilter('Critical Gap')}
          className={`p-5 rounded-[18px] border transition-all cursor-pointer shadow-xs ${
            selectedFilter === 'Critical Gap'
              ? 'bg-rose-50/80 border-rose-500 shadow-sm'
              : 'bg-white border-slate-200 hover:border-rose-300 hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">🔴 Critical Gaps</span>
            <AlertCircle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{criticalCount}</div>
          <span className="text-[11px] text-slate-500 font-medium">Score &lt; 50% (High Priority)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs">
        <span className="text-slate-500 flex items-center space-x-1 mr-2 font-medium">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter:</span>
        </span>
        {(['All', 'Critical Gap', 'Needs Improvement', 'Strong'] as const).map(f => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedFilter === f
                ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f === 'All' ? 'All Skills (7)' : f}
          </button>
        ))}
      </div>

      {/* Detailed Skill Cards with 'WHY' & 'NEXT ACTION' */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map(skill => {
          let statusBadgeClass = 'bg-[#ECFDF5] text-[#059669] border-emerald-200';
          let borderClass = 'border-slate-200';
          let progressColor = 'from-emerald-400 to-emerald-600';

          if (skill.status === 'Needs Improvement') {
            statusBadgeClass = 'bg-[#FFFBEB] text-[#D97706] border-amber-200';
            progressColor = 'from-amber-400 to-amber-600';
          } else if (skill.status === 'Critical Gap') {
            statusBadgeClass = 'bg-[#FFF1F2] text-[#E11D48] border-rose-200';
            borderClass = 'border-rose-200 bg-rose-50/10';
            progressColor = 'from-rose-400 to-rose-600';
          }

          return (
            <div
              key={skill.id}
              className={`rounded-2xl bg-white border p-5 space-y-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 shadow-xs ${borderClass}`}
            >
              {/* Top Row: Skill Name & Score */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A]">{skill.skillName}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#0F172A]">{skill.score}%</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass}`}>
                    {skill.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* WHY Explanation */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                  <Info className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Why you received this score:</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-5 font-normal">
                  "{skill.whyExplanation}"
                </p>
              </div>

              {/* RECOMMENDED NEXT ACTION */}
              <div className="rounded-xl bg-[#EEF2FF] border border-indigo-200/80 p-3.5 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>Recommended Next Action:</span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed pl-5 font-medium">
                  {skill.recommendedAction}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveTab('practice')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#7C3AED] hover:text-white text-slate-700 border border-slate-200 hover:border-transparent transition-all flex items-center justify-center space-x-1.5 shadow-2xs hover:shadow-sm"
              >
                <span>Practice this skill in Arena</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
