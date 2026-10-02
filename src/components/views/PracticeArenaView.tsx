import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { PracticeQuestion } from '../../types';
import {
  Code2,
  Brain,
  Layers,
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeArenaView: React.FC = () => {
  const { student, recordPracticeAttempt, addToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Coding' | 'Aptitude' | 'Technical MCQ'>('All');
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion>(PRACTICE_QUESTIONS[0]);
  const [userCode, setUserCode] = useState<string>(selectedQuestion.starterCode || '');
  const [selectedMCQOption, setSelectedMCQOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'running' | 'success' | 'failed'; message: string }>({
    status: 'idle',
    message: ''
  });

  const [sessionTimer, setSessionTimer] = useState(0);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setSessionTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectQuestion = (q: PracticeQuestion) => {
    setSelectedQuestion(q);
    setUserCode(q.starterCode || '');
    setSelectedMCQOption(null);
    setShowSolution(false);
    setShowHint(false);
    setTestResult({ status: 'idle', message: '' });
  };

  const handleRunCode = () => {
    setTestResult({ status: 'running', message: 'Running test cases against execution sandbox...' });
    setTimeout(() => {
      // Simulate validation
      const isCorrect = userCode.length > 50 && !userCode.includes('# Write your solution here');
      if (isCorrect) {
        setTestResult({
          status: 'success',
          message: 'All 3 public & 2 hidden test cases passed! Runtime: 42ms (faster than 88%).'
        });
        recordPracticeAttempt(selectedQuestion.topic, true, 40);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      } else {
        setTestResult({
          status: 'failed',
          message: 'Test Case 2 Failed: Output mismatch. Check edge case handling.'
        });
        recordPracticeAttempt(selectedQuestion.topic, false, 5);
      }
    }, 700);
  };

  const handleMCQSubmit = () => {
    if (selectedMCQOption === null) {
      addToast('Select an Option', 'Please choose an option before submitting.', 'warning');
      return;
    }

    const isCorrect = selectedMCQOption === selectedQuestion.correctIndex;
    if (isCorrect) {
      setTestResult({ status: 'success', message: 'Correct answer! Great job.' });
      recordPracticeAttempt(selectedQuestion.topic, true, 30);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      setTestResult({
        status: 'failed',
        message: `Incorrect. The correct option was "${selectedQuestion.options?.[selectedQuestion.correctIndex || 0]}".`
      });
      recordPracticeAttempt(selectedQuestion.topic, false, 5);
    }
    setShowSolution(true);
  };

  const filteredQuestions = PRACTICE_QUESTIONS.filter(q => {
    if (activeCategory === 'All') return true;
    return q.type === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Banner with Performance HUD (Cyan Section Identity) */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-50/80 via-sky-50/50 to-blue-50/80 border border-cyan-200/80 p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-[#0891B2] text-xs font-bold border border-cyan-200">
              Interactive Practice Arena
            </span>
            <span className="text-xs text-slate-500 font-medium">• Coding, Aptitude & CS MCQs</span>
          </div>
          <h2 className="text-lg font-extrabold text-[#0F172A] mt-1.5">Adaptive Placement Drills</h2>
        </div>

        {/* Live HUD */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs font-medium">
            <Clock className="h-4 w-4 text-[#06B6D4]" />
            <span className="font-mono font-bold text-slate-900">{formatTimer(sessionTimer)}</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBEB] border border-amber-200 text-[#D97706] font-bold shadow-2xs">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>Streak: {student.streak} Days</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#ECFDF5] border border-emerald-200 text-[#059669] font-bold shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Accuracy: {student.accuracy}%</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold shadow-2xs">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>{student.problemsSolved} Solved</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Questions Selector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Category Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-white border border-slate-200 rounded-xl text-xs shadow-xs">
            {(['All', 'Coding', 'Aptitude', 'Technical MCQ'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 rounded-lg font-bold truncate transition-colors text-center ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat === 'Technical MCQ' ? 'MCQ' : cat}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredQuestions.map(q => {
              const isSelected = selectedQuestion.id === q.id;
              let badgeColor = 'bg-[#ECFDF5] text-[#059669] border border-emerald-200';
              if (q.difficulty === 'Medium') badgeColor = 'bg-[#FFFBEB] text-[#D97706] border border-amber-200';
              if (q.difficulty === 'Hard') badgeColor = 'bg-[#FFF1F2] text-[#E11D48] border border-rose-200';

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-4 rounded-[16px] border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-cyan-50/70 border-cyan-400 ring-2 ring-cyan-200 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">{q.type}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold truncate text-[#0F172A]">{q.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 truncate font-medium">{q.topic}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Interactive Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
            {/* Question Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <div>
                <span className="text-[10px] font-bold text-[#0891B2] uppercase tracking-wider">
                  {selectedQuestion.type} • {selectedQuestion.topic}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A] mt-0.5">
                  {selectedQuestion.title}
                </h2>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                  selectedQuestion.difficulty === 'Easy'
                    ? 'bg-[#ECFDF5] text-[#059669] border-emerald-200'
                    : selectedQuestion.difficulty === 'Medium'
                    ? 'bg-[#FFFBEB] text-[#D97706] border-amber-200'
                    : 'bg-[#FFF1F2] text-[#E11D48] border-rose-200'
                }`}
              >
                {selectedQuestion.difficulty}
              </span>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {selectedQuestion.description}
            </div>

            {/* Coding Challenge Mode: Code Editor */}
            {selectedQuestion.type === 'Coding' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-500 font-semibold">Python 3 Execution Sandbox</span>
                  <button
                    onClick={() => setUserCode(selectedQuestion.starterCode || '')}
                    className="text-[11px] text-indigo-600 hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset Starter Code</span>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-3.5 font-mono text-xs shadow-md">
                  <textarea
                    rows={10}
                    value={userCode}
                    onChange={e => setUserCode(e.target.value)}
                    className="w-full bg-transparent text-emerald-400 focus:outline-none resize-y font-mono leading-relaxed"
                    spellCheck={false}
                  />
                </div>

                {/* Sample Test Cases */}
                {selectedQuestion.testCases && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Public Test Cases</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {selectedQuestion.testCases.map((tc, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-slate-500 text-[10px]">Input: {tc.input}</div>
                          <div className="text-emerald-700 font-bold text-[11px] mt-0.5">Expected: {tc.output}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MCQ Mode (Aptitude & Technical MCQ) */}
            {(selectedQuestion.type === 'Aptitude' || selectedQuestion.type === 'Technical MCQ') && selectedQuestion.options && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Correct Option:</span>
                <div className="space-y-2">
                  {selectedQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMCQOption(idx)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left text-xs font-semibold transition-all ${
                        selectedMCQOption === idx
                          ? 'bg-indigo-50 text-indigo-900 border-2 border-indigo-600 shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          selectedMCQOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {selectedMCQOption === idx && <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center space-x-1"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
                  <span>{showHint ? 'Hide Hint' : 'Get Hint'}</span>
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                >
                  <span>{showSolution ? 'Hide Solution' : 'View Explanation'}</span>
                </button>
              </div>

              {selectedQuestion.type === 'Coding' ? (
                <button
                  onClick={handleRunCode}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:-translate-y-0.5"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run & Submit Code</span>
                </button>
              ) : (
                <button
                  onClick={handleMCQSubmit}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:-translate-y-0.5"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Verify Answer</span>
                </button>
              )}
            </div>

            {/* Hint Box */}
            {showHint && selectedQuestion.hints.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 animate-in fade-in shadow-2xs">
                <span className="font-bold flex items-center space-x-1 text-amber-800">
                  <Zap className="h-3.5 w-3.5 text-amber-600" />
                  <span>Algorithmic Hint:</span>
                </span>
                <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
                  {selectedQuestion.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Execution Result Box */}
            {testResult.status !== 'idle' && (
              <div
                className={`p-4 rounded-xl border text-xs animate-in fade-in shadow-2xs ${
                  testResult.status === 'success'
                    ? 'bg-[#ECFDF5] border-emerald-200 text-emerald-900'
                    : testResult.status === 'failed'
                    ? 'bg-[#FFF1F2] border-rose-200 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="font-bold flex items-center space-x-1.5">
                  {testResult.status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  {testResult.status === 'failed' && <XCircle className="h-4 w-4 text-rose-600" />}
                  <span>{testResult.status === 'success' ? 'Accepted!' : testResult.status === 'failed' ? 'Execution Discrepancy' : 'Processing...'}</span>
                </div>
                <p className="mt-1 leading-relaxed">{testResult.message}</p>
              </div>
            )}

            {/* Solution Explanation Box */}
            {showSolution && (
              <div className="p-4 rounded-xl bg-[#EEF2FF] border border-indigo-200 text-xs space-y-1.5 animate-in fade-in shadow-2xs">
                <span className="font-bold text-indigo-700">📖 Step-by-Step Architectural Solution:</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedQuestion.solutionExplanation}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
