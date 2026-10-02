import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnosticQuestions';
import { Question } from '../../types';
import {
  ShieldAlert,
  Users,
  ClipboardList,
  PlusCircle,
  BarChart3,
  CheckCircle2,
  Trash2,
  Search,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { addToast } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'students' | 'questions' | 'skills'>('stats');

  // Add question state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState<'Technical' | 'Aptitude' | 'Communication' | 'Interview'>('Technical');
  const [newSubcategory, setNewSubcategory] = useState('DSA');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);

  // Mock Students Roster
  const studentsRoster = [
    { id: 'st-1', name: 'Kavin S', role: 'Machine Learning Engineer', readiness: 67, tasks: '21/30', lastActive: 'Today' },
    { id: 'st-2', name: 'Ananya Sharma', role: 'Software Developer', readiness: 74, tasks: '24/30', lastActive: 'Yesterday' },
    { id: 'st-3', name: 'Rohan Verma', role: 'Full Stack Developer', readiness: 58, tasks: '14/30', lastActive: '2 days ago' },
    { id: 'st-4', name: 'Pooja Iyer', role: 'Data Analyst', readiness: 81, tasks: '28/30', lastActive: 'Today' },
    { id: 'st-5', name: 'Siddharth Rao', role: 'AI Engineer', readiness: 62, tasks: '17/30', lastActive: '3 days ago' },
  ];

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !optA || !optB) {
      addToast('Validation Error', 'Please fill in question title and at least two options.', 'warning');
      return;
    }

    addToast('Question Added! ✅', `Added to ${newCategory} - ${newSubcategory} bank.`, 'success');
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Admin Header */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-50/80 via-purple-50/50 to-indigo-50/80 border border-violet-200/80 p-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-violet-500/25">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0F172A]">PlacementAI Administration Portal</h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage questions bank, student cohorts, skill mapping, and institutional readiness statistics.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-violet-100 text-[#7C3AED] border border-violet-200 text-xs font-bold">
          Admin Access Active
        </span>
      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs">
        <button
          onClick={() => setActiveAdminTab('stats')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
            activeAdminTab === 'stats'
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Platform Overview</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('students')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
            activeAdminTab === 'students'
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Student Cohort (5)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
            activeAdminTab === 'questions'
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          <span>Question Management ({DIAGNOSTIC_QUESTIONS.length})</span>
        </button>
      </div>

      {/* Tab 1: Stats */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-[18px] bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Students</span>
              <div className="text-3xl font-black text-[#0F172A] mt-1">1,248</div>
              <span className="text-[11px] text-emerald-600 font-bold">+18% this month</span>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mean Readiness Score</span>
              <div className="text-3xl font-black text-indigo-600 mt-1">68.4 / 100</div>
              <span className="text-[11px] text-slate-500 font-medium">Target threshold: 80+</span>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mock Interviews Done</span>
              <div className="text-3xl font-black text-purple-600 mt-1">3,490</div>
              <span className="text-[11px] text-emerald-600 font-bold">4.8 / 5.0 satisfaction</span>
            </div>

            <div className="p-5 rounded-[18px] bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Diagnosed Skill Gap Rate</span>
              <div className="text-3xl font-black text-rose-600 mt-1">62% DSA</div>
              <span className="text-[11px] text-slate-500 font-medium">Most frequent bottleneck</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Campus Cohort Readiness Distribution
            </h3>
            <div className="space-y-3.5 pt-1 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Tier-1 Placement Ready (80 - 100)</span>
                  <span className="font-extrabold text-emerald-600">28% (350 students)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Approaching Benchmark (65 - 79)</span>
                  <span className="font-extrabold text-indigo-600">46% (574 students)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '46%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-medium">
                  <span className="text-slate-600">Needs Critical Remediation (&lt; 65)</span>
                  <span className="font-extrabold text-rose-600">26% (324 students)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '26%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Students Cohort */}
      {activeAdminTab === 'students' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Enrolled Candidate Performance Roster
            </h3>
            <span className="text-xs text-slate-500 font-medium">5 sample student records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Target Role</th>
                  <th className="py-3 px-3">Readiness Score</th>
                  <th className="py-3 px-3">Roadmap Tasks</th>
                  <th className="py-3 px-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentsRoster.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#0F172A]">{st.name}</td>
                    <td className="py-3.5 px-3 text-indigo-700 font-semibold">{st.role}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {st.readiness} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{st.tasks}</td>
                    <td className="py-3.5 px-3 text-slate-400">{st.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Question Management & Add Form */}
      {activeAdminTab === 'questions' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center space-x-1.5">
              <PlusCircle className="h-4 w-4 text-indigo-600" />
              <span>Add New Diagnostic Question</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                >
                  <option>Technical</option>
                  <option>Aptitude</option>
                  <option>Communication</option>
                  <option>Interview</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600">Subcategory</label>
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={e => setNewSubcategory(e.target.value)}
                  placeholder="DSA / SQL / DBMS"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={e => setNewDifficulty(e.target.value as any)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600">Question Text</label>
              <textarea
                rows={2}
                value={newQuestionText}
                onChange={e => setNewQuestionText(e.target.value)}
                placeholder="Enter technical problem or multiple-choice prompt..."
                className="w-full mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600">Option A</label>
                <input
                  type="text"
                  value={optA}
                  onChange={e => setOptA(e.target.value)}
                  placeholder="Option 1"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600">Option B</label>
                <input
                  type="text"
                  value={optB}
                  onChange={e => setOptB(e.target.value)}
                  placeholder="Option 2"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600">Option C</label>
                <input
                  type="text"
                  value={optC}
                  onChange={e => setOptC(e.target.value)}
                  placeholder="Option 3"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600">Option D</label>
                <input
                  type="text"
                  value={optD}
                  onChange={e => setOptD(e.target.value)}
                  placeholder="Option 4"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-semibold">Correct Option:</span>
                <select
                  value={correctIdx}
                  onChange={e => setCorrectIdx(parseInt(e.target.value))}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold"
                >
                  <option value={0}>A</option>
                  <option value={1}>B</option>
                  <option value={2}>C</option>
                  <option value={3}>D</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                Add Question to Bank
              </button>
            </div>
          </form>

          {/* Current Question List */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Diagnostic Questions Bank ({DIAGNOSTIC_QUESTIONS.length})
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {DIAGNOSTIC_QUESTIONS.slice(0, 10).map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                  <div className="pr-3">
                    <span className="font-bold text-indigo-700">Q{idx + 1}. [{q.category} • {q.subcategory}]</span>
                    <p className="text-slate-700 mt-0.5 truncate max-w-lg font-medium">{q.question}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-600 border border-slate-200 shrink-0">
                    {q.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
