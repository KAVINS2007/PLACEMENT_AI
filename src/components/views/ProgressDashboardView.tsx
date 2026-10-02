import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LineChart,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  Target,
  Trophy,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';

export const ProgressDashboardView: React.FC = () => {
  const { student, roadmap, achievements, skills } = useApp();

  const allTasks = roadmap.weeks.flatMap(w => w.tasks);
  const completedTasks = allTasks.filter(t => t.completed).length;

  // Mock weekly activity (Mon - Sun)
  const weeklyActivity = [
    { day: 'Mon', count: 4, label: '4 tasks' },
    { day: 'Tue', count: 6, label: '6 tasks' },
    { day: 'Wed', count: 5, label: '5 tasks' },
    { day: 'Thu', count: 7, label: '7 tasks' },
    { day: 'Fri', count: 8, label: '8 tasks' },
    { day: 'Sat', count: 9, label: '9 tasks' },
    { day: 'Sun', count: 6, label: '6 tasks (Today)' },
  ];

  // Placement readiness growth trajectory over 4 weeks
  const readinessGrowth = [
    { week: 'Week 0 (Diagnostic)', score: 45 },
    { week: 'Week 1 (Foundations)', score: 53 },
    { week: 'Week 2 (Core Tech)', score: 61 },
    { week: 'Week 3 (Current)', score: student.readinessScore },
    { week: 'Week 4 (Projected)', score: 82 }
  ];

  const nextLevelXP = 3000;
  const currentXPProgress = Math.round((student.xp / nextLevelXP) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner (Light Neutral / Indigo Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-purple-50/80 border border-indigo-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-[#4F46E5] text-xs font-bold border border-indigo-200">
              Analytics & Gamification
            </span>
            <span className="text-xs text-slate-500 font-medium">• Performance Tracking</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mt-1.5">Growth & Milestones Dashboard</h1>
          <p className="text-xs text-slate-600">
            Monitor your skill trajectories, weekly problem solving velocity, and badge progression.
          </p>
        </div>

        {/* Level Badge Banner */}
        <div className="p-4 rounded-2xl bg-white border border-indigo-200 flex items-center space-x-3.5 shrink-0 shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Level {student.level} — {student.levelName}
            </div>
            <div className="text-lg font-black text-[#0F172A]">
              {student.xp.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ {nextLevelXP.toLocaleString()} XP</span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full" style={{ width: `${currentXPProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[18px] bg-white border border-slate-200 space-y-1.5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</span>
          <div className="text-3xl font-black text-[#0F172A]">{student.readinessScore} / 100</div>
          <span className="text-[11px] text-emerald-600 font-bold block">+14 pts over last 14 days</span>
        </div>

        <div className="p-5 rounded-[18px] bg-white border border-slate-200 space-y-1.5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Daily Streak</span>
          <div className="text-3xl font-black text-[#F59E0B] flex items-center space-x-2">
            <span>{student.streak} Days</span>
            <Flame className="h-6 w-6 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Personal best streak!</span>
        </div>

        <div className="p-5 rounded-[18px] bg-white border border-slate-200 space-y-1.5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problems Solved</span>
          <div className="text-3xl font-black text-indigo-600">{student.problemsSolved}</div>
          <span className="text-[11px] text-slate-500 font-medium block">Coding, Quants & MCQs</span>
        </div>

        <div className="p-5 rounded-[18px] bg-white border border-slate-200 space-y-1.5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Accuracy</span>
          <div className="text-3xl font-black text-emerald-600">{student.accuracy}%</div>
          <span className="text-[11px] text-emerald-600 font-bold block">Top 15% percentile</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (7 cols): Skill Growth Over Time */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Skill Growth & Projected Readiness</h3>
              <p className="text-xs text-slate-500 font-medium">Actual progression from diagnostic baseline toward 80+ target</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Trajectory: Positive
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {readinessGrowth.map((rg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-semibold">{rg.week}</span>
                  <span className="font-extrabold text-[#0F172A]">{rg.score} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      idx === 4
                        ? 'bg-gradient-to-r from-[#4F46E5] to-[#10B981]'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${rg.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between font-medium">
            <span>Roadmap Task Velocity:</span>
            <span className="font-bold text-indigo-700">{completedTasks} of {allTasks.length} Completed</span>
          </div>
        </div>

        {/* Right (5 cols): Weekly Activity Bar Heatmap (Mon -> Sun) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Weekly Activity</h3>
              <p className="text-xs text-slate-500 font-medium">Monday → Sunday practice count</p>
            </div>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </div>

          <div className="flex items-end justify-between h-48 pt-6 pb-2 px-2">
            {weeklyActivity.map((w, idx) => {
              const heightPercent = (w.count / 10) * 100;
              const isToday = idx === 6;
              return (
                <div key={idx} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="text-[10px] font-bold text-slate-400">{w.count}</div>
                  <div className="w-6 sm:w-8 bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-gradient-to-t from-[#4F46E5] to-[#7C3AED]' : 'bg-indigo-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <div className={`text-xs font-semibold ${isToday ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    {w.day}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center font-medium">
            🔥 Daily consistency maintains your 7-day placement streak!
          </div>
        </div>

      </div>

      {/* Achievement Badges Gallery */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Achievement Badges & Honors
            </h3>
            <p className="text-xs text-slate-500 font-medium">Unlock placement readiness credentials as you progress</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {achievements.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border text-center space-y-2 transition-all duration-200 hover:-translate-y-0.5 ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-indigo-50/70 to-purple-50/50 border-indigo-200 text-[#0F172A] shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`h-12 w-12 mx-auto rounded-xl flex items-center justify-center ${
                  badge.unlocked
                    ? 'bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-indigo-500/25'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.unlocked ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>
              <h4 className="text-xs font-bold truncate text-[#0F172A]">{badge.title}</h4>
              <p className="text-[10px] text-slate-500 leading-tight font-medium">{badge.description}</p>
              {badge.unlockedAt && (
                <span className="text-[9px] text-emerald-700 font-mono font-bold block">
                  Unlocked {badge.unlockedAt}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
