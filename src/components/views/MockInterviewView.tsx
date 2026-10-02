import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { MockInterviewSession } from '../../types';
import {
  Mic,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  Sparkles,
  Send,
  RotateCcw,
  Award,
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MockInterviewView: React.FC = () => {
  const { student, interviews, saveInterviewSession, addToast } = useApp();

  const [interviewType, setInterviewType] = useState<'HR Interview' | 'Technical Interview' | 'Coding Interview' | 'Behavioral Interview'>('Technical Interview');
  const [targetRole, setTargetRole] = useState<string>(student.targetRole || 'Machine Learning Engineer');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Turn-by-turn question queue
  const questionsBank: Record<string, string[]> = {
    'Technical Interview': [
      "Could you introduce yourself and walk me through your primary technical stack and how you approach building ML pipelines?",
      "How do you address class imbalance when training deep learning models, and which metrics (Precision, Recall, F1) do you prioritize?",
      "In a production system with high read latency, how would you design a caching layer between your API and relational database?"
    ],
    'HR Interview': [
      "Tell me about yourself, your college background, and what motivated you to apply for this position.",
      "Why do you want to join our organization over other technology companies?",
      "Where do you see yourself in 3 to 5 years, and how do you handle tight project deadlines with conflicting priorities?"
    ],
    'Behavioral Interview': [
      "Describe a time when you had a disagreement with a team member during a technical project. How did you resolve it?",
      "Tell me about a project where you failed or did not meet expectations. What was the situation and what did you learn?",
      "Can you give an example of when you had to learn an unfamiliar technology stack under a strict deadline?"
    ],
    'Coding Interview': [
      "Explain how you would find the longest substring without duplicate characters with optimal time complexity.",
      "What is the difference between a Process and a Thread, and how does OS scheduling handle thread synchronization?",
      "Explain the ACID properties in database systems with an example of an ATM withdrawal transaction."
    ]
  };

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [studentInput, setStudentInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [messages, setMessages] = useState<MockInterviewSession['messages']>([]);
  const [evaluationsHistory, setEvaluationsHistory] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<MockInterviewSession | null>(null);

  // Text-to-speech speaker
  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  const handleStartInterview = () => {
    const questions = questionsBank[interviewType];
    setCurrentQIndex(0);
    setEvaluationsHistory([]);
    setIsActive(true);
    setIsCompleted(false);

    const firstQ = questions[0];
    const initialMsg = {
      id: `ai-0`,
      sender: 'ai' as const,
      text: `Hello ${student.name}! I am your AI interviewer for the ${interviewType} round (${targetRole}). Let's begin:\n\n${firstQ}`
    };

    setMessages([initialMsg]);
    speakText(firstQ);
  };

  const handleSubmitAnswer = async () => {
    if (!studentInput.trim() || evaluating) return;

    const questions = questionsBank[interviewType];
    const currQuestion = questions[currentQIndex];
    const answer = studentInput.trim();
    setEvaluating(true);

    // Evaluate answer via AI Service
    const evaluation = AIService.evaluateInterviewResponse(currQuestion, answer, targetRole);

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text: answer,
      evaluation
    };

    const newHistory = [...evaluationsHistory, evaluation];
    setEvaluationsHistory(newHistory);
    setStudentInput('');

    if (currentQIndex < questions.length - 1) {
      // Next Question
      const nextIndex = currentQIndex + 1;
      const nextQ = questions[nextIndex];
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai' as const,
        text: `Thank you for your answer. Moving to Question ${nextIndex + 1}:\n\n${nextQ}`
      };

      setMessages(prev => [...prev, userMsg, aiReply]);
      setCurrentQIndex(nextIndex);
      setEvaluating(false);
      speakText(nextQ);
    } else {
      // Completed all 3 questions
      const avgOverall = Math.round(newHistory.reduce((acc, curr) => acc + curr.overallScore, 0) / newHistory.length);
      const avgRelevance = Math.round(newHistory.reduce((acc, curr) => acc + curr.relevance, 0) / newHistory.length);
      const avgClarity = Math.round(newHistory.reduce((acc, curr) => acc + curr.clarity, 0) / newHistory.length);
      const avgTech = Math.round(newHistory.reduce((acc, curr) => acc + curr.technicalDepth, 0) / newHistory.length);
      const avgStructure = Math.round(newHistory.reduce((acc, curr) => acc + curr.structure, 0) / newHistory.length);
      const avgConfidence = Math.round(newHistory.reduce((acc, curr) => acc + curr.confidence, 0) / newHistory.length);

      const finalSession: MockInterviewSession = {
        id: `int-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: interviewType,
        targetRole,
        overallScore: avgOverall,
        metrics: {
          communication: avgClarity,
          technicalKnowledge: avgTech,
          answerStructure: avgStructure,
          confidence: avgConfidence
        },
        messages: [...messages, userMsg],
        topImprovements: [
          "Incorporate quantifiable business impact metrics into your technical explanations.",
          "Structure behavioral pushback narratives strictly using the STAR methodology.",
          "Demonstrate trade-off evaluations (e.g. latency vs consistency, precision vs recall)."
        ]
      };

      setActiveSession(finalSession);
      saveInterviewSession(finalSession);
      setIsCompleted(true);
      setEvaluating(false);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header Card (Soft Cyan/Blue Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-50/80 via-blue-50/60 to-cyan-50/80 border border-sky-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold border border-blue-200">
              AI Mock Interview Simulator
            </span>
            <span className="text-xs text-slate-500 font-medium">• Audio & 6-Point Rubrics</span>
          </div>
          <h2 className="text-lg font-extrabold text-[#0F172A] mt-1.5">Interactive Campus Screening Round</h2>
          <p className="text-xs text-slate-600">
            Rehearse technical and behavioral rounds with realistic turn-by-turn evaluation.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors shadow-2xs ${
              speechEnabled
                ? 'bg-white text-blue-700 border-blue-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {speechEnabled ? <Volume2 className="h-4 w-4 text-blue-600" /> : <VolumeX className="h-4 w-4" />}
            <span>{speechEnabled ? 'Audio Voice On' : 'Voice Muted'}</span>
          </button>
        </div>
      </div>

      {/* Setup Options (When not active or when resetting) */}
      {!isActive && !isCompleted && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-6 shadow-xs">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
            Configure Your Mock Interview Round
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700">Select Interview Type</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(['Technical Interview', 'HR Interview', 'Behavioral Interview', 'Coding Interview'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setInterviewType(type)}
                    className={`p-3.5 rounded-xl text-left text-xs font-bold border transition-all ${
                      interviewType === type
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Target Role</label>
              <select
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                <option>Machine Learning Engineer</option>
                <option>Software Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Analyst</option>
                <option>Data Scientist</option>
                <option>AI Engineer</option>
              </select>

              <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-[#0F172A]">Simulation Details:</span>
                <p>• 3 Adaptive turn-by-turn questions with immediate scoring.</p>
                <p>• Rubric: Relevance (25%), Tech Depth (25%), Structure (20%), Clarity (15%), Confidence (10%), Grammar (5%).</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5"
          >
            <Mic className="h-4 w-4" />
            <span>Start Simulated Interview →</span>
          </button>
        </div>
      )}

      {/* Active Interview Interface */}
      {isActive && !isCompleted && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div>
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                {interviewType} • Question {currentQIndex + 1} of 3
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">Live Round Simulator</h3>
            </div>
            <button
              onClick={() => {
                setIsActive(false);
                if (window.speechSynthesis) window.speechSynthesis.cancel();
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Exit Simulation
            </button>
          </div>

          {/* Messages Thread */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <div
                key={m.id}
                className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'ai'
                    ? 'bg-sky-50/60 border border-sky-200/70 text-slate-800'
                    : 'bg-[#4F46E5] text-white ml-8 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-bold text-[11px]">
                  <span className={m.sender === 'ai' ? 'text-[#2563EB]' : 'text-indigo-200'}>
                    {m.sender === 'ai' ? 'AI Interviewer' : 'Your Answer'}
                  </span>
                  {m.evaluation && (
                    <span className="text-emerald-300 font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      Answer Score: {m.evaluation.overallScore}/100
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Micro rubric tags if evaluated */}
                {m.evaluation && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 pt-2.5 border-t border-white/20 text-[10px] text-center font-bold">
                    <div className="p-1 rounded bg-white/10">Rel: {m.evaluation.relevance}%</div>
                    <div className="p-1 rounded bg-white/10">Clarity: {m.evaluation.clarity}%</div>
                    <div className="p-1 rounded bg-white/10">Depth: {m.evaluation.technicalDepth}%</div>
                    <div className="p-1 rounded bg-white/10">Structure: {m.evaluation.structure}%</div>
                    <div className="p-1 rounded bg-white/10">Conf: {m.evaluation.confidence}%</div>
                    <div className="p-1 rounded bg-white/10">Grammar: {m.evaluation.grammar}%</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Answer Input Field */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Your Answer:</span>
              <span className="text-[11px] text-slate-500 font-medium">
                Tip: Use STAR framework (Situation, Task, Action, Result)
              </span>
            </div>

            <textarea
              rows={4}
              value={studentInput}
              onChange={e => setStudentInput(e.target.value)}
              placeholder="Type your response here clearly..."
              className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  // Pre-fill a realistic strong answer for judging ease
                  if (interviewType === 'Technical Interview') {
                    setStudentInput("In my recent defect detection project with PyTorch, we encountered severe class imbalance where only 3% of samples were defective. To resolve this, I implemented Focal Loss with hard negative mining and synthetic oversampling using Albumentations. This boosted our minority-class recall from 58% to 91% while maintaining an overall F1-score of 94.2%.");
                  } else {
                    setStudentInput("During my 3rd year engineering sprint, our backend engineer fell ill 2 days before the presentation. I volunteered to take over the Express API endpoints, containerized the database using Docker, and delivered the working demo on schedule. The project was awarded first place in the university showcase.");
                  }
                }}
                className="text-[11px] text-indigo-600 hover:underline flex items-center space-x-1 font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span>Fill Realistic Answer (Judge Shortcut)</span>
              </button>

              <button
                onClick={handleSubmitAnswer}
                disabled={!studentInput.trim() || evaluating}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 disabled:opacity-40 text-white shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:-translate-y-0.5"
              >
                <span>{evaluating ? 'Evaluating...' : 'Submit Answer & Evaluate'}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETED INTERVIEW REPORT */}
      {isCompleted && activeSession && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Assessment Complete
              </span>
              <h2 className="text-xl font-extrabold text-[#0F172A] mt-1.5">
                Official Interview Performance Report
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Round: {activeSession.type} • Target: {activeSession.targetRole}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-semibold">Overall Score</span>
                <div className="text-3xl font-black text-indigo-600">
                  {activeSession.overallScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Communication</span>
              <div className="text-2xl font-black text-[#0F172A] mt-1">
                {activeSession.metrics.communication}
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Articulate & Clear</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Technical Depth</span>
              <div className="text-2xl font-black text-[#0F172A] mt-1">
                {activeSession.metrics.technicalKnowledge}
              </div>
              <span className="text-[10px] text-indigo-600 font-bold">Solid Foundations</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Answer Structure</span>
              <div className="text-2xl font-black text-[#0F172A] mt-1">
                {activeSession.metrics.answerStructure}
              </div>
              <span className="text-[10px] text-amber-600 font-bold">Needs STAR Polish</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Confidence</span>
              <div className="text-2xl font-black text-[#0F172A] mt-1">
                {activeSession.metrics.confidence}
              </div>
              <span className="text-[10px] text-sky-600 font-bold">Poised Demeanor</span>
            </div>
          </div>

          {/* Top 3 Actionable Improvements */}
          <div className="p-5 rounded-xl bg-[#EEF2FF] border border-indigo-200 space-y-3 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Top 3 High-Impact Improvements:</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              {activeSession.topImprovements.map((imp, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-medium">{imp}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <button
              onClick={() => {
                setIsCompleted(false);
                setIsActive(false);
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-md hover:-translate-y-0.5 transition-all"
            >
              Start Another Interview Round →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
