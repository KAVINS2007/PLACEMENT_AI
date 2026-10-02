import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnosticQuestions';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Zap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssessmentView: React.FC = () => {
  const { submitAssessment, student, addToast } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for 30 questions
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const categoryTotals: Record<string, { total: number; correct: number }> = {
      Technical: { total: 0, correct: 0 },
      Aptitude: { total: 0, correct: 0 },
      Communication: { total: 0, correct: 0 },
      Interview: { total: 0, correct: 0 }
    };

    DIAGNOSTIC_QUESTIONS.forEach(q => {
      const cat = q.category;
      if (!categoryTotals[cat]) categoryTotals[cat] = { total: 0, correct: 0 };
      categoryTotals[cat].total += 1;

      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
        categoryTotals[cat].correct += 1;
      }
    });

    const categoryScores: Record<string, number> = {};
    Object.keys(categoryTotals).forEach(cat => {
      const { total, correct } = categoryTotals[cat];
      categoryScores[cat] = total > 0 ? Math.round((correct / total) * 100) : 70;
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    setIsSubmitted(true);
    submitAssessment(selectedAnswers, totalQuestions, correctCount, categoryScores);
  };

  // Quick Demo Auto-Fill (Judge Friendly Feature)
  const handleAutoFillRealisticAnswers = () => {
    const answers: Record<string, number> = {};
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      // Simulate realistic answers matching Kavin S: strong on Python/Aptitude, weaker on DSA/OS
      if (q.subcategory === 'DSA' && (idx % 2 === 1)) {
        answers[q.id] = (q.correctIndex + 1) % 4; // mistake
      } else if (q.subcategory === 'Operating Systems' && idx % 2 === 0) {
        answers[q.id] = (q.correctIndex + 2) % 4; // mistake
      } else if (q.subcategory === 'HR' && idx % 3 === 0) {
        answers[q.id] = (q.correctIndex + 1) % 4; // mistake
      } else {
        answers[q.id] = q.correctIndex; // correct
      }
    });

    setSelectedAnswers(answers);
    addToast('Realistic Responses Filled! ⚡', '30 questions populated with representative student responses.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header Card (Soft Blue / Lavender Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-blue-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold border border-blue-200">
              Diagnostic Assessment
            </span>
            <span className="text-xs text-slate-500 font-medium">• 30 Questions</span>
          </div>
          <h2 className="text-lg font-extrabold text-[#0F172A] mt-1.5">Placement Skill-Gap Benchmark</h2>
          <p className="text-xs text-slate-600">
            Covers Technical (DSA/OS/DBMS/SQL), Aptitude, Communication & Interview Readiness.
          </p>
        </div>

        {/* Timer & Demo Shortcut */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleAutoFillRealisticAnswers}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-2xs hover:-translate-y-0.5"
            title="Auto-fill sample student answers for instant judge evaluation"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Auto-Fill (Demo)</span>
          </button>

          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <Clock className="h-4 w-4 text-[#4F46E5]" />
            <span className="font-mono text-sm font-extrabold text-[#0F172A]">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress & Category Tracker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">
            Question <span className="font-bold text-[#0F172A]">{currentIndex + 1}</span> of {totalQuestions}
          </span>
          <span className="text-indigo-600 font-bold">
            {answeredCount} of {totalQuestions} answered ({Math.round((answeredCount / totalQuestions) * 100)}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card (White Card) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Question Meta Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Subcategory: <span className="text-slate-900 font-semibold">{currentQ.subcategory}</span>
            </span>
          </div>
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
              currentQ.difficulty === 'Easy'
                ? 'bg-[#ECFDF5] text-[#059669] border-emerald-200'
                : currentQ.difficulty === 'Medium'
                ? 'bg-[#FFFBEB] text-[#D97706] border-amber-200'
                : 'bg-[#FFF1F2] text-[#E11D48] border-rose-200'
            }`}
          >
            {currentQ.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Code Snippet if present */}
          {currentQ.codeSnippet && (
            <div className="rounded-xl bg-[#0F172A] p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed shadow-inner">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}
        </div>

        {/* 4 Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-900 border-2 border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{option}</span>
                </div>
                {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
              >
                <span>Submit & Generate Skill Gap Report</span>
                <Sparkles className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Quick Jump Grid (White Card) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#0F172A]">Question Palette</span>
          <span className="text-[11px] text-slate-400 font-medium">Click any question to jump</span>
        </div>
        <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5">
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-7 w-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-indigo-300 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
