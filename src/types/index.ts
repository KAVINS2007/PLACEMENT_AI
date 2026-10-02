export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  department: string;
  year: string; // e.g. "3rd Year"
  cgpa: number;
  graduationYear: number;
  targetRole: string;
  targetCompanies: string[];
  currentLanguages: string[];
  technicalSkills: string[];
  preferredHoursPerDay: number;
  deadline: string;
  readinessScore: number; // 0 - 100
  breakdown: {
    technical: number;
    aptitude: number;
    coding: number;
    communication: number;
    interview: number;
    resume: number;
  };
  xp: number;
  level: number;
  levelName: string;
  streak: number;
  problemsSolved: number;
  accuracy: number;
  resumeReady: boolean;
  assessmentCompleted: boolean;
}

export type SkillCategory = 'Technical' | 'Aptitude' | 'Communication' | 'Interview';
export type GapSeverity = 'Strong' | 'Needs Improvement' | 'Critical Gap';

export interface SkillScore {
  id: string;
  skillName: string;
  category: SkillCategory;
  score: number; // 0 - 100
  status: GapSeverity;
  whyExplanation: string;
  recommendedAction: string;
}

export interface Question {
  id: string;
  category: SkillCategory;
  subcategory: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  totalQuestions: number;
  correctCount: number;
  overallScore: number;
  categoryScores: Record<string, number>;
  skillScores: SkillScore[];
}

export interface RoadmapTask {
  id: string;
  week: number;
  weekTitle: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  skill: string;
  completed: boolean;
  type: 'learn' | 'practice' | 'quiz' | 'interview' | 'project';
  dynamicReason?: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  weekTitle: string;
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  title: string;
  targetRole: string;
  totalDays: number;
  currentDay: number;
  weeks: RoadmapWeek[];
  lastAdaptedReason?: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  type: 'Coding' | 'Aptitude' | 'Technical MCQ';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode?: string;
  language?: string;
  testCases?: { input: string; output: string }[];
  options?: string[];
  correctIndex?: number;
  solutionExplanation: string;
  hints: string[];
}

export interface MockInterviewSession {
  id: string;
  type: 'HR Interview' | 'Technical Interview' | 'Coding Interview' | 'Behavioral Interview';
  targetRole: string;
  date: string;
  overallScore: number;
  metrics: {
    communication: number;
    technicalKnowledge: number;
    answerStructure: number;
    confidence: number;
  };
  topImprovements: string[];
  feedback: string;
  messages: {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    evaluation?: {
      relevance: number;
      clarity: number;
      confidence: number;
      technicalDepth: number;
      structure: number;
      grammar: number;
      feedbackNote: string;
    };
  }[];
}

export interface ResumeAnalysisResult {
  score: number;
  summary: string;
  matchedSkills: string[];
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
  roleFitPercentage: number;
  sections: {
    name: string;
    status: 'good' | 'warning' | 'missing';
    comment: string;
  }[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  badge: string;
  hiringFocus: string;
  readinessPercentage: number;
  breakdown: {
    technical: number;
    coding: number;
    aptitude: number;
    interview: number;
  };
  rounds: {
    roundName: string;
    description: string;
    pattern: string;
    prepStrategy: string;
  }[];
  mustKnowTopics: string[];
  recommendedPractice: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  type: 'achievement' | 'alert' | 'update' | 'roadmap';
  read: boolean;
}
