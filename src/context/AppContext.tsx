import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  SkillScore,
  Roadmap,
  AchievementBadge,
  NotificationItem,
  MockInterviewSession,
  ResumeAnalysisResult,
  AssessmentResult,
  UserRole
} from '../types';
import {
  DEMO_STUDENT,
  FRESH_STUDENT,
  INITIAL_SKILL_SCORES,
  DEMO_ROADMAP,
  INITIAL_ACHIEVEMENTS,
  INITIAL_NOTIFICATIONS,
  SAMPLE_MOCK_INTERVIEW,
  SAMPLE_RESUME_ANALYSIS
} from '../data/mockData';
import { AIService } from '../services/aiService';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // User & Profile
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  student: StudentProfile;
  updateStudent: (partial: Partial<StudentProfile>) => void;
  isDemoMode: boolean;
  setDemoMode: (isDemo: boolean) => void;
  resetToFreshStudent: () => void;
  loadDemoStudent: () => void;

  // Diagnostic Assessment
  assessmentResult: AssessmentResult | null;
  submitAssessment: (answers: Record<string, number>, totalQ: number, correctQ: number, categoryScores: Record<string, number>) => void;
  
  // Skills & Readiness
  skills: SkillScore[];
  updateSkillScore: (skillId: string, newScore: number) => void;

  // Roadmap
  roadmap: Roadmap;
  toggleTaskCompletion: (taskId: string) => void;
  adaptRoadmapBasedOnPerformance: (failedCategory: string, passedTopic: string) => void;

  // Practice & Stats
  recordPracticeAttempt: (category: string, isCorrect: boolean, xpGained?: number) => void;

  // Mock Interview
  interviews: MockInterviewSession[];
  saveInterviewSession: (session: MockInterviewSession) => void;

  // Resume
  resumeAnalysis: ResumeAnalysisResult;
  setResumeAnalysis: (res: ResumeAnalysisResult) => void;

  // Gamification & Badges
  achievements: AchievementBadge[];
  unlockBadge: (badgeId: string) => void;
  addXP: (amount: number) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isDemoMode, setDemoMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('landing'); // landing, dashboard, assessment, skillgap, roadmap, practice, coach, interview, resume, company, progress, digitaltwin, innovation, admin

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('placementai_student');
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  const [skills, setSkills] = useState<SkillScore[]>(() => {
    const saved = localStorage.getItem('placementai_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILL_SCORES;
  });

  const [roadmap, setRoadmap] = useState<Roadmap>(() => {
    const saved = localStorage.getItem('placementai_roadmap');
    return saved ? JSON.parse(saved) : DEMO_ROADMAP;
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('placementai_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('placementai_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [interviews, setInterviews] = useState<MockInterviewSession[]>([SAMPLE_MOCK_INTERVIEW]);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult>(SAMPLE_RESUME_ANALYSIS);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('placementai_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('placementai_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('placementai_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateStudent = (partial: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...partial }));
  };

  const addXP = (amount: number) => {
    setStudent(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 400) + 1;
      let levelName = 'Placement Aspirant';
      if (newLevel >= 8) levelName = 'Placement Master';
      else if (newLevel >= 6) levelName = 'Placement Warrior';
      else if (newLevel >= 4) levelName = 'Placement Contender';
      else if (newLevel >= 2) levelName = 'Placement Explorer';

      if (newLevel > prev.level) {
        addToast('Level Up! 🏆', `You reached Level ${newLevel} — ${levelName}!`, 'success');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        levelName
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setAchievements(prev =>
      prev.map(b => {
        if (b.id === badgeId && !b.unlocked) {
          addToast('New Badge Unlocked! 🎖️', b.title, 'success');
          return { ...b, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
        }
        return b;
      })
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setRoadmap(prev => {
      let newlyCompleted = false;
      const updatedWeeks = prev.weeks.map(w => ({
        ...w,
        tasks: w.tasks.map(t => {
          if (t.id === taskId) {
            newlyCompleted = !t.completed;
            return { ...t, completed: newlyCompleted };
          }
          return t;
        })
      }));

      // Count completed
      const totalCompleted = updatedWeeks.flatMap(w => w.tasks).filter(t => t.completed).length;
      const totalTasks = updatedWeeks.flatMap(w => w.tasks).length;

      if (newlyCompleted) {
        addXP(50);
        addToast('Task Completed! 🚀', `Roadmap progress: ${totalCompleted}/${totalTasks} tasks`, 'success');
      }

      return { ...prev, weeks: updatedWeeks };
    });
  };

  const recordPracticeAttempt = (category: string, isCorrect: boolean, xpGained: number = 30) => {
    setStudent(prev => {
      const solved = prev.problemsSolved + 1;
      const currentAcc = prev.accuracy || 70;
      const newAcc = Math.round(isCorrect ? (currentAcc * 0.95 + 100 * 0.05) : (currentAcc * 0.95));
      return {
        ...prev,
        problemsSolved: solved,
        accuracy: newAcc
      };
    });

    if (isCorrect) {
      addXP(xpGained);
      addToast('Correct Solution! ⭐', `+${xpGained} XP earned`, 'success');
    } else {
      addToast('Attempt Recorded', 'Review explanation to master this concept.', 'info');
      // Trigger adaptive roadmap if user fails technical topic
      if (category.toLowerCase().includes('dsa') || category.toLowerCase().includes('operating')) {
        adaptRoadmapBasedOnPerformance(category, 'Foundation');
      }
    }
  };

  const adaptRoadmapBasedOnPerformance = (failedCategory: string, passedTopic: string) => {
    const { updatedRoadmap, message } = AIService.adaptRoadmap(roadmap, failedCategory, passedTopic);
    setRoadmap(updatedRoadmap);
    addToast('Roadmap Adapted ⚡', message, 'info');
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        text: message,
        time: 'Just now',
        type: 'roadmap',
        read: false
      },
      ...prev
    ]);
  };

  const submitAssessment = (
    answers: Record<string, number>,
    totalQ: number,
    correctQ: number,
    categoryScores: Record<string, number>
  ) => {
    const overallScore = Math.round((correctQ / totalQ) * 100);

    // Dynamic skills calculation
    const updatedSkills: SkillScore[] = [
      {
        id: 'skill-python',
        skillName: 'Programming Fundamentals',
        category: 'Technical',
        score: categoryScores['Technical'] ? Math.min(100, Math.round(categoryScores['Technical'] * 1.1)) : 75,
        status: (categoryScores['Technical'] || 70) >= 75 ? 'Strong' : (categoryScores['Technical'] || 70) >= 50 ? 'Needs Improvement' : 'Critical Gap',
        whyExplanation: 'Based on your programming language syntax and OOP comprehension.',
        recommendedAction: 'Strengthen language idiomatic constructs and unit testing.'
      },
      {
        id: 'skill-dsa',
        skillName: 'Data Structures & Algorithms',
        category: 'Technical',
        score: categoryScores['Technical'] ? Math.max(30, Math.round(categoryScores['Technical'] * 0.85)) : 50,
        status: (categoryScores['Technical'] || 50) < 55 ? 'Critical Gap' : 'Needs Improvement',
        whyExplanation: 'Struggled with tree traversals and graph cycle recursion complexity.',
        recommendedAction: 'Master 2-Pointer Arrays and Recursion trees before advanced dynamic programming.'
      },
      {
        id: 'skill-sql',
        skillName: 'SQL & Database Architecture',
        category: 'Technical',
        score: categoryScores['Technical'] ? Math.round(categoryScores['Technical'] * 0.95) : 68,
        status: (categoryScores['Technical'] || 65) >= 70 ? 'Strong' : 'Needs Improvement',
        whyExplanation: 'Good at simple SELECT queries; needs polish on HAVING filters and ACID isolation.',
        recommendedAction: 'Practice window functions and transaction isolation levels in practice arena.'
      },
      {
        id: 'skill-os',
        skillName: 'Operating Systems & Networks',
        category: 'Technical',
        score: categoryScores['Technical'] ? Math.max(35, Math.round(categoryScores['Technical'] * 0.75)) : 45,
        status: 'Critical Gap',
        whyExplanation: 'Missed questions on Deadlock Coffman conditions and DNS resolution sequence.',
        recommendedAction: 'Review virtual memory page replacement algorithms and TLS handshake flow.'
      },
      {
        id: 'skill-aptitude',
        skillName: 'Quantitative & Logical Aptitude',
        category: 'Aptitude',
        score: categoryScores['Aptitude'] || 72,
        status: (categoryScores['Aptitude'] || 72) >= 75 ? 'Strong' : 'Needs Improvement',
        whyExplanation: 'Good numerical speed on percentage and work problems; verify seating arrangement logic.',
        recommendedAction: 'Maintain speed with a 15-minute daily mixed aptitude drill.'
      },
      {
        id: 'skill-comm',
        skillName: 'Professional Communication',
        category: 'Communication',
        score: categoryScores['Communication'] || 68,
        status: (categoryScores['Communication'] || 68) >= 75 ? 'Strong' : 'Needs Improvement',
        whyExplanation: 'Professional tone is polite; focus on concise executive presentation.',
        recommendedAction: 'Rehearse project demo pushbacks and structured sprint updates.'
      },
      {
        id: 'skill-interview',
        skillName: 'Interview Readiness',
        category: 'Interview',
        score: categoryScores['Interview'] || 55,
        status: (categoryScores['Interview'] || 55) >= 75 ? 'Strong' : (categoryScores['Interview'] || 55) >= 50 ? 'Needs Improvement' : 'Critical Gap',
        whyExplanation: 'Behavioral answers need structured metrics using the STAR framework.',
        recommendedAction: 'Practice with the AI Mock Interview simulator for your target role.'
      }
    ];

    setSkills(updatedSkills);

    // Calculate Placement Readiness Score
    const techAvg = Math.round((updatedSkills[0].score + updatedSkills[1].score + updatedSkills[2].score + updatedSkills[3].score) / 4);
    const aptScore = updatedSkills[4].score;
    const commScore = updatedSkills[5].score;
    const intScore = updatedSkills[6].score;
    const codingScore = Math.round(updatedSkills[1].score * 0.95);
    const resumeScore = 72;

    const readiness = Math.round(
      (techAvg * 0.25) +
      (aptScore * 0.20) +
      (codingScore * 0.20) +
      (commScore * 0.15) +
      (intScore * 0.10) +
      (resumeScore * 0.10)
    );

    const result: AssessmentResult = {
      id: `assessment-${Date.now()}`,
      timestamp: new Date().toISOString(),
      totalQuestions: totalQ,
      correctCount: correctQ,
      overallScore,
      categoryScores,
      skillScores: updatedSkills
    };

    setAssessmentResult(result);

    // Update student state
    setStudent(prev => ({
      ...prev,
      assessmentCompleted: true,
      readinessScore: readiness,
      breakdown: {
        technical: techAvg,
        aptitude: aptScore,
        coding: codingScore,
        communication: commScore,
        interview: intScore,
        resume: resumeScore
      }
    }));

    unlockBadge('badge-1');
    addXP(200);
    addToast('Assessment Complete! 🎉', `Your Placement Readiness Score is ${readiness}/100. Check your Skill Gap Report.`, 'success');
    setActiveTab('skillgap');
  };

  const updateSkillScore = (skillId: string, newScore: number) => {
    setSkills(prev =>
      prev.map(s => {
        if (s.id === skillId) {
          const status = newScore >= 75 ? 'Strong' : newScore >= 50 ? 'Needs Improvement' : 'Critical Gap';
          return { ...s, score: newScore, status };
        }
        return s;
      })
    );
  };

  const saveInterviewSession = (session: MockInterviewSession) => {
    setInterviews(prev => [session, ...prev]);
    unlockBadge('badge-4');
    addXP(150);
    addToast('Mock Interview Recorded! 🎯', `Score: ${session.overallScore}/100 with comprehensive feedback.`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToFreshStudent = () => {
    setStudent(FRESH_STUDENT);
    setSkills(INITIAL_SKILL_SCORES.map(s => ({ ...s, score: 0, status: 'Critical Gap' })));
    setRoadmap({
      ...DEMO_ROADMAP,
      weeks: DEMO_ROADMAP.weeks.map(w => ({
        ...w,
        tasks: w.tasks.map(t => ({ ...t, completed: false }))
      }))
    });
    setDemoMode(false);
    setUserRole('student');
    addToast('Fresh Student Mode Activated', 'Ready to take diagnostic assessment from scratch.', 'info');
    setActiveTab('assessment');
  };

  const loadDemoStudent = () => {
    setStudent(DEMO_STUDENT);
    setSkills(INITIAL_SKILL_SCORES);
    setRoadmap(DEMO_ROADMAP);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDemoMode(true);
    setUserRole('student');
    addToast('Demo Student Loaded', 'Kavin S (ML Engineer, 67/100 Readiness, 21/30 tasks)', 'success');
    setActiveTab('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        student,
        updateStudent,
        isDemoMode,
        setDemoMode,
        resetToFreshStudent,
        loadDemoStudent,
        assessmentResult,
        submitAssessment,
        skills,
        updateSkillScore,
        roadmap,
        toggleTaskCompletion,
        adaptRoadmapBasedOnPerformance,
        recordPracticeAttempt,
        interviews,
        saveInterviewSession,
        resumeAnalysis,
        setResumeAnalysis,
        achievements,
        unlockBadge,
        addXP,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        toasts,
        addToast,
        removeToast,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
