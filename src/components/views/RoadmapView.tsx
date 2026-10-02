import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Check,
  Play,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { roadmap, toggleTaskCompletion, adaptRoadmapBasedOnPerformance, setActiveTab, addToast } = useApp();
  const [selectedWeek, setSelectedWeek] = useState<number>(roadmap.weeks[0]?.weekNumber || 1);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  // Compute progress
  const allTasks = roadmap.weeks.flatMap(w => w.tasks);
  const completedTasks = allTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedTasks / allTasks.length) * 100);

  const currentWeekObj = roadmap.weeks.find(w => w.weekNumber === selectedWeek) || roadmap.weeks[0];

  const filteredTasks = currentWeekObj.tasks.filter(t => {
    if (filterDifficulty === 'All') return true;
    return t.difficulty === filterDifficulty;
  });

  const handleSimulateAdaptiveShift = () => {
    adaptRoadmapBasedOnPerformance('Data Structures & Algorithms', 'Binary Trees');
    addToast('Adaptive Engine Triggered ⚡', 'Roadmap rebalanced! Advanced tasks rearranged based on recent DSA performance.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner with Adaptive Notification (Purple Section Identity) */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/80 border border-purple-200/80 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-bold border border-purple-200">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Personalized Adaptive Roadmap</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Your 30-Day Placement Preparation Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Target Role: <strong className="text-indigo-600 font-bold">{roadmap.targetRole}</strong> • Day {roadmap.currentDay} of {roadmap.totalDays}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSimulateAdaptiveShift}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors shadow-2xs hover:-translate-y-0.5"
              title="Test the adaptive engine rebalancing"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-purple-600" />
              <span>Simulate Adaptive Shift</span>
            </button>

            <div className="text-right pl-3 border-l border-purple-200">
              <div className="text-xl font-black text-[#0F172A]">{completedTasks} / {allTasks.length}</div>
              <div className="text-[11px] text-emerald-600 font-bold">{progressPercent}% Completed</div>
            </div>
          </div>
        </div>

        {/* Dynamic Adaptive Banner */}
        {roadmap.lastAdaptedReason && (
          <div className="p-3.5 rounded-xl bg-white/90 border border-purple-200 text-xs text-purple-900 flex items-start space-x-2.5 shadow-2xs">
            <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0F172A]">Your roadmap changed based on your performance:</span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{roadmap.lastAdaptedReason}</p>
            </div>
          </div>
        )}

        {/* Global Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-white/80 border border-purple-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#10B981] rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {roadmap.weeks.map(w => {
          const wTasks = w.tasks;
          const wDone = wTasks.filter(t => t.completed).length;
          const isSelected = selectedWeek === w.weekNumber;

          return (
            <button
              key={w.weekNumber}
              onClick={() => setSelectedWeek(w.weekNumber)}
              className={`p-4 rounded-[18px] text-left border transition-all shadow-xs ${
                isSelected
                  ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-200 text-purple-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-300 hover:bg-slate-50 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Week {w.weekNumber}</span>
                <span className={`text-[11px] font-bold ${isSelected ? 'text-purple-700' : 'text-slate-400'}`}>
                  {wDone}/{wTasks.length}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] truncate">
                {w.weekTitle.split('—')[1] || w.weekTitle}
              </h4>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                  style={{ width: `${wTasks.length > 0 ? (wDone / wTasks.length) * 100 : 0}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Week Header & Difficulty Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">{currentWeekObj.weekTitle}</h2>
          <p className="text-xs text-slate-500 font-medium">
            {currentWeekObj.tasks.length} adaptive milestone tasks scheduled for this phase.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(d => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(d)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                filterDifficulty === d
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          let diffClass = 'bg-[#ECFDF5] text-[#059669] border-emerald-200';
          if (task.difficulty === 'Intermediate') {
            diffClass = 'bg-[#FFFBEB] text-[#D97706] border-amber-200';
          } else if (task.difficulty === 'Advanced') {
            diffClass = 'bg-[#FFF1F2] text-[#E11D48] border-rose-200';
          }

          return (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 hover:border-purple-300 text-slate-700'
              }`}
            >
              {/* Checkbox & Details */}
              <div className="flex items-start space-x-3.5">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle className="h-5 w-5 hover:text-indigo-600" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-[#0F172A]'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffClass}`}>
                      {task.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {task.skill}
                    </span>
                    {task.dynamicReason && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        ⚡ Adaptive
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-normal">
                    {task.description}
                  </p>

                  {task.dynamicReason && (
                    <p className="text-[11px] text-purple-700 italic font-medium">
                      ℹ️ {task.dynamicReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Time & Action Button */}
              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                <div className="flex items-center space-x-1 text-xs text-slate-500 font-semibold">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{task.estimatedMinutes} min</span>
                </div>

                <button
                  onClick={() => {
                    if (task.type === 'interview') {
                      setActiveTab('interview');
                    } else if (task.type === 'project' || task.skill === 'Resume') {
                      setActiveTab('resume');
                    } else {
                      setActiveTab('practice');
                    }
                    addToast('Launching Practice Task', `Opening ${task.title}`, 'info');
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:-translate-y-0.5 ${
                    task.completed
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-indigo-500/20'
                  }`}
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>{task.completed ? 'Review' : 'Start'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
