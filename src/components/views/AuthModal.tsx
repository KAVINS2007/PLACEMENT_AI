import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, User, Mail, Lock, Building, GraduationCap, Briefcase, Clock, Calendar, Check, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { updateStudent, addToast, setActiveTab } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'onboarding'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Onboarding profile fields
  const [college, setCollege] = useState('National Institute of Technology');
  const [degree, setDegree] = useState('B.Tech');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('4th Year');
  const [cgpa, setCgpa] = useState('8.42');
  const [gradYear, setGradYear] = useState('2026');
  const [targetRole, setTargetRole] = useState('Machine Learning Engineer');
  const [targetCompanies, setTargetCompanies] = useState('Amazon, Google, TCS, Zoho');
  const [languages, setLanguages] = useState('Python, SQL, C++');
  const [skills, setSkills] = useState('Machine Learning, Fast API, Data Structures');
  const [hours, setHours] = useState('2.5');
  const [deadline, setDeadline] = useState('2026-11-15');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Welcome Back! 👋', `Logged in successfully as ${email || 'Candidate'}`, 'success');
    onClose();
    setActiveTab('dashboard');
  };

  const handleGoogleLogin = () => {
    addToast('Google Sign-In Successful', 'Authenticated with student email domain.', 'success');
    setMode('onboarding');
  };

  const handleOnboardingComplete = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent({
      name: name || 'Student Candidate',
      email: email || 'student@university.edu',
      college,
      degree,
      department,
      year,
      cgpa: parseFloat(cgpa) || 8.0,
      graduationYear: parseInt(gradYear) || 2026,
      targetRole,
      targetCompanies: targetCompanies.split(',').map(s => s.trim()).filter(Boolean),
      currentLanguages: languages.split(',').map(s => s.trim()).filter(Boolean),
      technicalSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
      preferredHoursPerDay: parseFloat(hours) || 2,
      deadline
    });

    addToast('Profile Configured! 🎯', 'Starting your placement diagnostic assessment.', 'success');
    onClose();
    setActiveTab('assessment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {mode === 'login' && 'Student Login'}
                {mode === 'signup' && 'Create PlacementAI Account'}
                {mode === 'forgot' && 'Reset Password'}
                {mode === 'onboarding' && 'Setup Your Placement Profile'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {mode === 'onboarding' ? 'Personalize your diagnostic assessment' : 'Access your personalized preparation dashboard'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-200" />
                <span className="px-2 text-[10px] text-slate-400 uppercase font-medium">Or with email</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">College Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="kavin@university.edu"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
              >
                Sign In to Dashboard
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={() => setMode('onboarding')} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Kavin S"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">College Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Create Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
              >
                Continue to Student Onboarding →
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Log In
                </button>
              </div>
            </form>
          )}

          {mode === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter your registered college email and we will send a password reset token.
              </p>
              <input
                type="email"
                placeholder="student@college.edu"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  addToast('Reset Link Sent', 'Check your college inbox.', 'info');
                  setMode('login');
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* ONBOARDING QUESTIONNAIRE */}
          {mode === 'onboarding' && (
            <form onSubmit={handleOnboardingComplete} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">College / University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Degree & Major</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={e => setDegree(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Current Year</label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">CGPA</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={e => setCgpa(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Grad Year</label>
                  <input
                    type="number"
                    value={gradYear}
                    onChange={e => setGradYear(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700">Target Role</label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-indigo-700 font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                >
                  <option>Software Developer</option>
                  <option>Machine Learning Engineer</option>
                  <option>Full Stack Developer</option>
                  <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>AI Engineer</option>
                  <option>QA Engineer</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700">Target Companies (Comma separated)</label>
                <input
                  type="text"
                  value={targetCompanies}
                  onChange={e => setTargetCompanies(e.target.value)}
                  placeholder="TCS, Amazon, Google, Zoho"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Known Languages</label>
                  <input
                    type="text"
                    value={languages}
                    onChange={e => setLanguages(e.target.value)}
                    placeholder="Python, Java, C++"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Daily Prep Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hours}
                    onChange={e => setHours(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700">Placement Preparation Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleOnboardingComplete}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Skip optional fields
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center space-x-1.5"
                >
                  <span>Launch Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
