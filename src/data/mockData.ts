import { StudentProfile, SkillScore, Roadmap, AchievementBadge, NotificationItem, MockInterviewSession, ResumeAnalysisResult } from '../types';

export const DEMO_STUDENT: StudentProfile = {
  id: 'student-demo-1',
  name: 'Kavin S',
  email: 'kavin@placementai.edu',
  college: 'National Institute of Technology',
  degree: 'B.Tech',
  department: 'Computer Science & Engineering',
  year: '4th Year',
  cgpa: 8.42,
  graduationYear: 2026,
  targetRole: 'Machine Learning Engineer',
  targetCompanies: ['Amazon', 'Google', 'Zoho', 'TCS'],
  currentLanguages: ['Python', 'SQL', 'C++'],
  technicalSkills: ['Machine Learning', 'Data Structures', 'Database Systems', 'FastAPI', 'Pandas'],
  preferredHoursPerDay: 2.5,
  deadline: '2026-11-15',
  readinessScore: 67,
  breakdown: {
    technical: 68,
    aptitude: 76,
    coding: 48,
    communication: 68,
    interview: 51,
    resume: 72
  },
  xp: 2450,
  level: 7,
  levelName: 'Placement Warrior',
  streak: 7,
  problemsSolved: 104,
  accuracy: 74,
  resumeReady: true,
  assessmentCompleted: true
};

export const FRESH_STUDENT: StudentProfile = {
  id: 'student-fresh-1',
  name: 'New Candidate',
  email: 'candidate@university.edu',
  college: 'University Institute of Technology',
  degree: 'B.E / B.Tech',
  department: 'Computer Science',
  year: '3rd Year',
  cgpa: 7.8,
  graduationYear: 2027,
  targetRole: 'Software Developer',
  targetCompanies: ['TCS', 'Infosys', 'Accenture'],
  currentLanguages: ['Java', 'C'],
  technicalSkills: ['Core Java', 'OOP', 'HTML/CSS'],
  preferredHoursPerDay: 2,
  deadline: '2026-12-01',
  readinessScore: 0,
  breakdown: {
    technical: 0,
    aptitude: 0,
    coding: 0,
    communication: 0,
    interview: 0,
    resume: 0
  },
  xp: 0,
  level: 1,
  levelName: 'Placement Aspirant',
  streak: 1,
  problemsSolved: 0,
  accuracy: 0,
  resumeReady: false,
  assessmentCompleted: false
};

export const INITIAL_SKILL_SCORES: SkillScore[] = [
  {
    id: 'skill-python',
    skillName: 'Python Programming',
    category: 'Technical',
    score: 84,
    status: 'Strong',
    whyExplanation: 'Excellent command over list comprehensions, functional constructs, generators, and standard libraries.',
    recommendedAction: 'Keep sharp with 1 advanced design pattern problem weekly; focus your time on DSA instead.'
  },
  {
    id: 'skill-dsa',
    skillName: 'Data Structures & Algorithms',
    category: 'Technical',
    score: 48,
    status: 'Critical Gap',
    whyExplanation: 'Your array and string performance is good, but you struggled with recursion, binary trees, heaps, and asymptotic time-complexity questions.',
    recommendedAction: 'Complete Arrays → Recursion → Trees before attempting advanced dynamic programming or graph problems.'
  },
  {
    id: 'skill-sql',
    skillName: 'SQL & Database Queries',
    category: 'Technical',
    score: 72,
    status: 'Needs Improvement',
    whyExplanation: 'Understands basic SELECT, WHERE, and simple JOINS, but lost marks on GROUP BY HAVING clauses and window functions.',
    recommendedAction: 'Practice 10 complex multi-table JOINs and DENSE_RANK() queries in the Practice Arena.'
  },
  {
    id: 'skill-dbms',
    skillName: 'DBMS Architecture',
    category: 'Technical',
    score: 55,
    status: 'Needs Improvement',
    whyExplanation: 'Clear on ACID fundamentals, but confused on transaction isolation levels and B-Tree indexing trade-offs.',
    recommendedAction: 'Revise dirty reads vs non-repeatable reads and study B+ Tree leaf node structures.'
  },
  {
    id: 'skill-os',
    skillName: 'Operating Systems',
    category: 'Technical',
    score: 44,
    status: 'Critical Gap',
    whyExplanation: 'Struggled with Virtual Memory thrashing, page replacement algorithms (FIFO vs LRU), and Semaphore synchronization.',
    recommendedAction: 'Complete the OS Deep Dive module: Deadlock Coffman conditions and Paging mechanics.'
  },
  {
    id: 'skill-networks',
    skillName: 'Computer Networks',
    category: 'Technical',
    score: 55,
    status: 'Needs Improvement',
    whyExplanation: 'Good understanding of OSI layers, but faltered on DNS resolution steps and TLS handshake flow.',
    recommendedAction: 'Review the 4-way TCP teardown and TLS 1.3 handshake packet exchanges.'
  },
  {
    id: 'skill-aptitude',
    skillName: 'Cognitive Aptitude',
    category: 'Aptitude',
    score: 76,
    status: 'Strong',
    whyExplanation: 'Strong numerical speed on time-work and percentage changes; minor delays on seating arrangement logic.',
    recommendedAction: 'Maintain speed with a 10-minute daily mixed aptitude drill.'
  },
  {
    id: 'skill-comm',
    skillName: 'Professional Communication',
    category: 'Communication',
    score: 68,
    status: 'Needs Improvement',
    whyExplanation: 'Professional email vocabulary is decent, but technical demo conflict responses lacked assertive ownership.',
    recommendedAction: 'Practice constructive sprint pushback and active listening frameworks.'
  },
  {
    id: 'skill-interview',
    skillName: 'Interview Readiness',
    category: 'Interview',
    score: 51,
    status: 'Critical Gap',
    whyExplanation: 'Self-introduction lacked the Present-Past-Future structure, and behavioral answers did not follow the STAR method metrics.',
    recommendedAction: 'Use the AI Mock Interview simulator to rehearse 3 STAR stories with measurable business outcomes.'
  }
];

export const DEMO_ROADMAP: Roadmap = {
  id: 'roadmap-ml-1',
  title: 'Personalized 30-Day Placement Preparation Roadmap',
  targetRole: 'Machine Learning Engineer',
  totalDays: 30,
  currentDay: 22,
  lastAdaptedReason: 'Adapted: Increased DSA recursion & tree modules because diagnostic score was 48%. Reduced Python basics by 4 days due to 84% mastery.',
  weeks: [
    {
      weekNumber: 1,
      weekTitle: 'Week 1 — Foundation & Gap Recovery',
      tasks: [
        {
          id: 'task-1',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Python High-Performance Idioms Revision',
          description: 'Review generator expressions, memory profilers, and collections modules.',
          difficulty: 'Beginner',
          estimatedMinutes: 30,
          skill: 'Python',
          completed: true,
          type: 'learn'
        },
        {
          id: 'task-2',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Arrays & Two-Pointer Patterns',
          description: 'Solve Two Sum, Container with Most Water, and 3Sum problems.',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-3',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'SQL Aggregations & Group Filter Mastery',
          description: 'Master GROUP BY, HAVING, and aggregate math on customer datasets.',
          difficulty: 'Intermediate',
          estimatedMinutes: 30,
          skill: 'SQL',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-4',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Aptitude Fundamentals: Time & Work',
          description: 'Solve 15 LCM-method questions on pipes, cisterns, and collaborative work.',
          difficulty: 'Beginner',
          estimatedMinutes: 35,
          skill: 'Aptitude',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-5',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Git Branching & Rebase Simulation',
          description: 'Hands-on practice resolving git merge conflicts and interactive rebasing.',
          difficulty: 'Beginner',
          estimatedMinutes: 25,
          skill: 'Git',
          completed: true,
          type: 'learn'
        },
        {
          id: 'task-6',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Diagnostic Review & Self-Correction Quiz',
          description: 'Review the 8 questions missed in the initial diagnostic assessment.',
          difficulty: 'Beginner',
          estimatedMinutes: 30,
          skill: 'Assessment',
          completed: true,
          type: 'quiz'
        },
        {
          id: 'task-7',
          week: 1,
          weekTitle: 'Week 1 — Foundation & Gap Recovery',
          title: 'Week 1 Milestone Assessment',
          description: 'Timed 20-minute checkpoint covering arrays, SQL, and quantitative math.',
          difficulty: 'Intermediate',
          estimatedMinutes: 25,
          skill: 'Assessment',
          completed: true,
          type: 'quiz'
        }
      ]
    },
    {
      weekNumber: 2,
      weekTitle: 'Week 2 — Core Technical & Deep Gaps',
      tasks: [
        {
          id: 'task-8',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'Singly & Doubly Linked List Inversion',
          description: 'Implement in-place reversal, cycle detection (Floyd Cycle), and palindrome lists.',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-9',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'Stacks & Monotonic Stack Variations',
          description: 'Next Greater Element, Valid Parentheses, and Min Stack architecture.',
          difficulty: 'Intermediate',
          estimatedMinutes: 40,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-10',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'DBMS Transaction Isolation & Concurrency',
          description: 'Deep dive into Read Uncommitted, Read Committed, Repeatable Read, and Serializable.',
          difficulty: 'Intermediate',
          estimatedMinutes: 35,
          skill: 'DBMS',
          completed: true,
          type: 'learn',
          dynamicReason: 'Added specifically for student: DBMS diagnostic was 55%'
        },
        {
          id: 'task-11',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'OOP Polymorphism & Real-world Class Design',
          description: 'Design a clean modular payment processing system using abstract base classes.',
          difficulty: 'Intermediate',
          estimatedMinutes: 40,
          skill: 'OOP',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-12',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'SQL Complex Joins & Window Functions',
          description: 'Write DENSE_RANK(), PARTITION BY, and Self Joins.',
          difficulty: 'Advanced',
          estimatedMinutes: 45,
          skill: 'SQL',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-13',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'Operating Systems: Memory Management & Thrashing',
          description: 'Address the critical OS gap: Page replacement FIFO vs LRU, and Virtual Memory paging.',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          skill: 'OS',
          completed: true,
          type: 'learn',
          dynamicReason: 'High priority adaptive task: Student OS score was 44%'
        },
        {
          id: 'task-14',
          week: 2,
          weekTitle: 'Week 2 — Core Technical & Deep Gaps',
          title: 'Week 2 Coding Sprint (3 Problems Timed)',
          description: 'Solve 3 problems (Easy, Medium, Medium) within 60 minutes.',
          difficulty: 'Intermediate',
          estimatedMinutes: 60,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        }
      ]
    },
    {
      weekNumber: 3,
      weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
      tasks: [
        {
          id: 'task-15',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Binary Trees & Traversals (DFS / BFS)',
          description: 'Inorder, Preorder, Postorder, and Level Order traversals with height calculation.',
          difficulty: 'Intermediate',
          estimatedMinutes: 50,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-16',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Binary Search Trees & Search Optimization',
          description: 'Validate BST, find Lowest Common Ancestor, and range lookups.',
          difficulty: 'Intermediate',
          estimatedMinutes: 45,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-17',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Computer Networks: DNS, HTTP/3, TLS 1.3',
          description: 'Packet flow walkthrough from URL typing to DOM rendering.',
          difficulty: 'Intermediate',
          estimatedMinutes: 35,
          skill: 'Networks',
          completed: true,
          type: 'learn'
        },
        {
          id: 'task-18',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'HR Behavioral: STAR Framework Formulation',
          description: 'Formulate 4 personal STAR stories for leadership, challenge, failure, and conflict.',
          difficulty: 'Beginner',
          estimatedMinutes: 40,
          skill: 'Interview',
          completed: true,
          type: 'interview'
        },
        {
          id: 'task-19',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Heaps & Priority Queue Scheduling',
          description: 'Solve Kth largest element and Top K Frequent Elements using Min/Max Heaps.',
          difficulty: 'Advanced',
          estimatedMinutes: 50,
          skill: 'DSA',
          completed: true,
          type: 'practice'
        },
        {
          id: 'task-20',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Self-Introduction 90-Second Pitch',
          description: 'Record or draft your Present-Past-Future introduction tailored for ML Engineer.',
          difficulty: 'Beginner',
          estimatedMinutes: 25,
          skill: 'Communication',
          completed: true,
          type: 'interview'
        },
        {
          id: 'task-21',
          week: 3,
          weekTitle: 'Week 3 — Advanced DSA & Interview Readiness',
          title: 'Week 3 Full Technical Mock Checkpoint',
          description: 'Simulated 45-minute live technical session with AI Placement Coach.',
          difficulty: 'Advanced',
          estimatedMinutes: 45,
          skill: 'Interview',
          completed: true,
          type: 'interview'
        }
      ]
    },
    {
      weekNumber: 4,
      weekTitle: 'Week 4 — Placement Simulation & Company Prep',
      tasks: [
        {
          id: 'task-22',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Graph Cycle Detection & Topological Sort',
          description: 'DFS recursion stack cycle detection and Kahn Algorithm for dependency resolution.',
          difficulty: 'Advanced',
          estimatedMinutes: 55,
          skill: 'DSA',
          completed: false,
          type: 'practice',
          dynamicReason: 'Adaptive target: Elevates DSA mastery toward target 80+'
        },
        {
          id: 'task-23',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Dynamic Programming: Memoization vs Tabulation',
          description: 'Climbing stairs, Coin Change, and Longest Increasing Subsequence.',
          difficulty: 'Advanced',
          estimatedMinutes: 60,
          skill: 'DSA',
          completed: false,
          type: 'practice'
        },
        {
          id: 'task-24',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Resume ATS Optimization & Metric Hardening',
          description: 'Revise resume bullets with Google XYZ formula (Accomplished [X] measured by [Y] by doing [Z]).',
          difficulty: 'Intermediate',
          estimatedMinutes: 40,
          skill: 'Resume',
          completed: false,
          type: 'project'
        },
        {
          id: 'task-25',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Amazon Leadership Principles Simulation',
          description: 'Take the specialized Amazon Leadership Principles AI Mock Interview.',
          difficulty: 'Advanced',
          estimatedMinutes: 45,
          skill: 'Interview',
          completed: false,
          type: 'interview'
        },
        {
          id: 'task-26',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Company Drill: TCS Digital / Infosys DSE Assessment',
          description: 'Full 90-minute timed mock test replicating standard company patterns.',
          difficulty: 'Advanced',
          estimatedMinutes: 90,
          skill: 'Company',
          completed: false,
          type: 'quiz'
        },
        {
          id: 'task-27',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'System Design for College Placements',
          description: 'URL Shortener, Cache design, and rate limiter architectural patterns.',
          difficulty: 'Advanced',
          estimatedMinutes: 50,
          skill: 'Architecture',
          completed: false,
          type: 'learn'
        },
        {
          id: 'task-28',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'AI Full Mock Interview: Technical & Behavioral',
          description: 'Comprehensive 4-round simulator evaluating all 6 readiness dimensions.',
          difficulty: 'Advanced',
          estimatedMinutes: 45,
          skill: 'Interview',
          completed: false,
          type: 'interview'
        },
        {
          id: 'task-29',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Weak Spot Rapid-Fire Drill',
          description: 'Adaptive drill focusing strictly on questions you failed in the past 14 days.',
          difficulty: 'Intermediate',
          estimatedMinutes: 35,
          skill: 'Adaptive',
          completed: false,
          type: 'practice'
        },
        {
          id: 'task-30',
          week: 4,
          weekTitle: 'Week 4 — Placement Simulation & Company Prep',
          title: 'Final Placement Readiness Re-Assessment',
          description: 'Final 30-question diagnostic to benchmark target 80+ score.',
          difficulty: 'Advanced',
          estimatedMinutes: 45,
          skill: 'Assessment',
          completed: false,
          type: 'quiz'
        }
      ]
    }
  ]
};

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: 'Diagnostic Pioneer',
    description: 'Completed the 30-question initial diagnostic assessment',
    iconName: 'Award',
    unlocked: true,
    unlockedAt: '2026-09-20'
  },
  {
    id: 'badge-2',
    title: '7-Day Streak Warrior',
    description: 'Maintained uninterrupted daily placement prep for 7 days',
    iconName: 'Flame',
    unlocked: true,
    unlockedAt: '2026-09-25'
  },
  {
    id: 'badge-3',
    title: 'Century Solver',
    description: 'Successfully solved over 100 coding and aptitude challenges',
    iconName: 'CheckCircle2',
    unlocked: true,
    unlockedAt: '2026-09-24'
  },
  {
    id: 'badge-4',
    title: 'First Mock Cleared',
    description: 'Completed an AI Technical Mock Interview with >70% score',
    iconName: 'Mic',
    unlocked: true,
    unlockedAt: '2026-09-23'
  },
  {
    id: 'badge-5',
    title: 'Resume Optimized',
    description: 'Analyzed and upgraded resume ATS readiness score',
    iconName: 'FileText',
    unlocked: true,
    unlockedAt: '2026-09-22'
  },
  {
    id: 'badge-6',
    title: 'Placement Ready 80+',
    description: 'Reach an overall Placement Readiness score of 80 or above',
    iconName: 'Rocket',
    unlocked: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    text: 'Your DSA accuracy improved by 12% following Week 2 Array drills.',
    time: '2 hours ago',
    type: 'achievement',
    read: false
  },
  {
    id: 'notif-2',
    text: 'You have 3 tasks remaining in your daily personalized plan.',
    time: '5 hours ago',
    type: 'alert',
    read: false
  },
  {
    id: 'notif-3',
    text: 'Your mock interview score increased from 61 → 72 on Answer Structure.',
    time: '1 day ago',
    type: 'update',
    read: true
  },
  {
    id: 'notif-4',
    text: 'Your placement readiness score increased from 58 → 67.',
    time: '2 days ago',
    type: 'roadmap',
    read: true
  }
];

export const SAMPLE_MOCK_INTERVIEW: MockInterviewSession = {
  id: 'session-demo-1',
  type: 'Technical Interview',
  targetRole: 'Machine Learning Engineer',
  date: '2026-09-24',
  overallScore: 72,
  metrics: {
    communication: 74,
    technicalKnowledge: 68,
    answerStructure: 61,
    confidence: 70
  },
  feedback: 'Strong understanding of ML pipelines and Python data science packages. However, when explaining gradient descent optimization, technical depth was high but the answer lacked clean structured step breakdown.',
  topImprovements: [
    'Structure technical explanations using the Rule of 3 (e.g. "Three primary factors determine model convergence: learning rate, batch size, and loss surface geometry").',
    'Quantify project outcomes in your self-introduction (mention exact accuracy gains, latency reduction in milliseconds, or dataset size).',
    'Pause for 2 seconds before answering complex algorithmic questions to outline your solution structure out loud.'
  ],
  messages: [
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Kavin! I'm your AI Technical Placement Coach today for the Machine Learning Engineer role. Let's begin: Could you briefly introduce yourself and share what inspired you to pursue ML engineering?"
    },
    {
      id: 'm2',
      sender: 'user',
      text: "Hi, I am Kavin, a 4th-year Computer Science student. Over the last 2 years, I've built multiple deep learning projects including an automated defect detection system using PyTorch and FastAPI. I enjoy bridging mathematical models with production software."
    },
    {
      id: 'm3',
      sender: 'ai',
      text: "Great concise introduction, Kavin. Let's dig into that defect detection project: How did you handle class imbalance in your defect training dataset, and how did you measure your model's true performance?",
      evaluation: {
        relevance: 88,
        clarity: 82,
        confidence: 85,
        technicalDepth: 78,
        structure: 75,
        grammar: 92,
        feedbackNote: 'Strong clear intro. Good mention of frameworks (PyTorch, FastAPI). Ready to evaluate depth on class imbalance.'
      }
    }
  ]
};

export const SAMPLE_RESUME_ANALYSIS: ResumeAnalysisResult = {
  score: 72,
  summary: 'Your resume shows strong programming and data foundations with Python, SQL, and FastAPI. However, your project descriptions do not clearly mention measurable results, and you are missing critical ML production keywords (Docker, CI/CD, MLflow).',
  matchedSkills: ['Python', 'SQL', 'FastAPI', 'PyTorch', 'Pandas', 'Git', 'OOP', 'Data Structures'],
  missingKeywords: ['Docker', 'Kubernetes', 'MLflow / MLOps', 'CI/CD Pipelines', 'Model Monitoring', 'Unit Testing (pytest)'],
  strengths: [
    'Clean, legible single-page format compatible with standard ATS parsers.',
    'Clear section headers for Education, Skills, Projects, and Experience.',
    'Strong academic standing (CGPA 8.42) prominently highlighted.'
  ],
  weaknesses: [
    'Project bullet points focus on tasks performed rather than quantifiable business impact.',
    'Absence of containerization and deployment tool mentions.',
    'GitHub and LinkedIn profile hyperlinks need standard Markdown formatting.'
  ],
  actionableSuggestions: [
    'Revise your PyTorch project bullet: Replace "Built a defect detection model" with "Developed an automated defect detection system processing 1,200 images/sec with 94.2% F1-score, reducing manual inspection time by 60%".',
    'Add an "Infrastructure & Tools" subsection under Skills with Docker, Git, and Linux.',
    'Ensure all dates follow consistent format (e.g. Aug 2025 – Present).'
  ],
  roleFitPercentage: 74,
  sections: [
    { name: 'Contact & Links', status: 'good', comment: 'All essential links present, professional email format.' },
    { name: 'Education', status: 'good', comment: 'Clear degree, branch, CGPA, and expected graduation year.' },
    { name: 'Technical Skills', status: 'good', comment: 'Well organized into Languages, Frameworks, and Tools.' },
    { name: 'Projects', status: 'warning', comment: 'Good technical complexity, but lacks quantified metrics (XYZ formula).' },
    { name: 'Experience / Internships', status: 'warning', comment: 'Add 1-2 bullet points showcasing collaboration and code review practices.' },
    { name: 'Certifications', status: 'good', comment: 'Relevant cloud and ML certifications listed.' }
  ]
};
