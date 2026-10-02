import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { ResumeAnalysisResult } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Target,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResumeAnalyzerView: React.FC = () => {
  const { resumeAnalysis, setResumeAnalysis, student, addToast, addXP } = useApp();

  const [resumeText, setResumeText] = useState<string>(`KAVIN S
Computer Science & Engineering Student | National Institute of Technology
Email: kavin@placementai.edu | GitHub: github.com/kavins | LinkedIn: linkedin.com/in/kavins

EDUCATION
B.Tech in Computer Science & Engineering (2022 - 2026) — CGPA: 8.42

TECHNICAL SKILLS
Languages: Python, SQL, C++, Java
Frameworks & Libraries: FastAPI, PyTorch, Pandas, Scikit-Learn, NumPy
Core Competencies: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Git

PROJECTS
Automated Industrial Defect Detection System
- Built a deep learning computer vision model using PyTorch and ResNet to detect surface flaws.
- Developed a REST API using FastAPI to serve inference requests to factory workstations.
- Stored classification logs and confidence scores in PostgreSQL database.

Campus Placement Analytics Dashboard
- Created an interactive web dashboard analyzing departmental placement trends.
- Wrote complex SQL aggregate queries and window functions to compute median packages.

EXPERIENCE
Software Engineering Intern — TechNova Labs (May 2025 – July 2025)
- Collaborated with senior engineers on backend data ingestion pipelines.
- Wrote automated test scripts and participated in daily agile standups.

CERTIFICATIONS
- Deep Learning Specialization (Coursera)
- AWS Certified Cloud Practitioner
`);

  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState('Kavin_Resume_ML.pdf');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      addToast('File Uploaded', `${file.name} loaded into parser sandbox`, 'info');
      handleAnalyze();
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const result = AIService.analyzeResumeText(resumeText, student.targetRole);
      setResumeAnalysis(result);
      setAnalyzing(false);
      addXP(75);
      addToast('Resume Analysis Complete! 📄', `ATS Readiness Score: ${result.score}/100`, 'success');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner (Soft Green / Emerald Gradient) */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-cyan-50/80 border border-emerald-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#059669] text-xs font-bold border border-emerald-200">
              ATS Optimization Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">• Role Fit Benchmarking</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mt-1.5">AI Resume & ATS Keyword Analyzer</h1>
          <p className="text-xs text-slate-600">
            Compare your resume directly against requirements for <strong>{student.targetRole}</strong>.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
        >
          {analyzing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>{analyzing ? 'Analyzing Resume...' : 'Re-Run ATS Analysis'}</span>
        </button>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Resume Input / Upload */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Upload or Paste Resume
              </h3>
              <span className="text-[11px] text-slate-500 font-mono font-medium">{fileName}</span>
            </div>

            {/* Drag & Drop Upload Simulator */}
            <label className="border-2 border-dashed border-emerald-200 hover:border-emerald-400 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-emerald-50/30 hover:bg-emerald-50/60">
              <Upload className="h-6 w-6 text-emerald-600 mb-2" />
              <span className="text-xs font-bold text-[#0F172A]">Upload PDF or DOCX Resume</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Automated parsing into text below</span>
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Editable Text Area */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Parsed Content:</span>
                <span className="text-[11px] text-slate-400">Live ATS Inspection</span>
              </div>
              <textarea
                rows={14}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed focus:border-emerald-500 focus:bg-white focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Analysis Results */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Top Score Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Resume Readiness Score */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resume Readiness Score</span>
                <div className="text-3xl font-black text-[#0F172A] mt-1">
                  {resumeAnalysis.score} <span className="text-sm font-medium text-slate-400">/ 100</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold">Tier-1 Screening Ready</span>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-base font-black text-emerald-700 bg-emerald-50">
                {resumeAnalysis.score}%
              </div>
            </div>

            {/* Role Fit */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Role Match</span>
                <div className="text-3xl font-black text-indigo-600 mt-1">
                  {resumeAnalysis.roleFitPercentage}%
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{student.targetRole}</span>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-indigo-500 flex items-center justify-center text-sm font-bold text-indigo-700 bg-indigo-50">
                Fit
              </div>
            </div>
          </div>

          {/* AI Executive Summary Callout */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1 shadow-2xs">
            <span className="font-bold text-emerald-800 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>AI ATS Evaluation Summary:</span>
            </span>
            <p className="leading-relaxed text-slate-700 pl-5 font-normal">
              "{resumeAnalysis.summary}"
            </p>
          </div>

          {/* Matched & Missing Keywords */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              ATS Keyword Density Benchmark ({student.targetRole})
            </h3>

            {/* Matched */}
            <div>
              <span className="text-[11px] font-bold text-emerald-700 block mb-1.5">
                ✓ Matched Keywords ({resumeAnalysis.matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.matchedSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#059669] border border-emerald-200 text-[11px] font-mono font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-rose-700 block mb-1.5">
                ✗ Missing Industry Keywords ({resumeAnalysis.missingKeywords.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.missingKeywords.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-[#FFF1F2] text-[#E11D48] border border-rose-200 text-[11px] font-mono font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Project Bullet Suggestions */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>High-Impact Resume Improvements (Google XYZ Formula)</span>
            </h3>
            <div className="space-y-2 text-xs">
              {resumeAnalysis.actionableSuggestions.map((sug, i) => (
                <div key={i} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-800 leading-relaxed flex items-start space-x-2.5">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                  <span className="font-medium">{sug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section-by-Section Health Check */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Section-by-Section Health Check
            </h3>
            <div className="space-y-2">
              {resumeAnalysis.sections.map((sec, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center space-x-2.5">
                    {sec.status === 'good' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    <span className="font-bold text-[#0F172A]">{sec.name}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-medium">{sec.comment}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
