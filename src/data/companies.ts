import { CompanyProfile } from '../types';

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    badge: 'Mass IT & Digital Hiring',
    hiringFocus: 'Strong fundamentals in Aptitude, Foundation Coding, and Core CS (DBMS/SQL)',
    readinessPercentage: 74,
    breakdown: {
      technical: 72,
      coding: 58,
      aptitude: 84,
      interview: 68
    },
    rounds: [
      {
        roundName: 'Round 1: National Qualifier Test (NQT)',
        description: 'Foundation Section (Numerical, Verbal, Reasoning) + Advanced Coding (2 algorithmic problems)',
        pattern: '80 questions cognitive + 2 coding questions (60 min)',
        prepStrategy: 'Focus on time management for Quant, speed in basic string/array manipulations in C/Python/Java.'
      },
      {
        roundName: 'Round 2: Technical Interview',
        description: 'Deep dive into OOP concepts, SQL queries (Joins & Aggregates), and Final Year Project architecture.',
        pattern: '30-45 minutes 1-on-1 technical discussion',
        prepStrategy: 'Be ready to write clean SQL queries on a whiteboard and explain normalization.'
      },
      {
        roundName: 'Round 3: HR & Managerial Round',
        description: 'Relocation willingness, shift flexibility, communication clarity, and behavioral fit.',
        pattern: '20 minutes HR discussion',
        prepStrategy: 'Prepare strong answers for relocation and why you want to start your career at TCS.'
      }
    ],
    mustKnowTopics: ['SQL Joins & Group By', 'Array Reversals & Subarrays', 'Time Speed Distance', 'OOP Polymorphism', 'Git Basics'],
    recommendedPractice: ['code-1', 'apt-1', 'mcq-2', 'mcq-5']
  },
  {
    id: 'infosys',
    name: 'Infosys (Specialist / DSE / SE)',
    badge: 'Enterprise Software',
    hiringFocus: 'Algorithmic problem solving, Data Structures, and Database design',
    readinessPercentage: 71,
    breakdown: {
      technical: 70,
      coding: 60,
      aptitude: 80,
      interview: 64
    },
    rounds: [
      {
        roundName: 'Round 1: InfyTQ / Online Assessment',
        description: 'Hands-on coding questions (Medium difficulty) + MCQ tests on DBMS and Data Structures.',
        pattern: '3 Coding questions (easy, medium, hard) + 20 MCQs',
        prepStrategy: 'Master Dynamic Programming, Recursion, and Tree traversals.'
      },
      {
        roundName: 'Round 2: Technical Interview',
        description: 'Explanation of coding round solutions, live debugging, and system basics.',
        pattern: '45 minutes panel review',
        prepStrategy: 'Explain optimal time/space complexity tradeoffs clearly.'
      },
      {
        roundName: 'Round 3: HR Round',
        description: 'Adaptability, team collaboration, and communication skills.',
        pattern: '15-20 minutes',
        prepStrategy: 'Use the STAR technique for questions on team conflict or tight deadlines.'
      }
    ],
    mustKnowTopics: ['Dynamic Programming Memoization', 'Binary Search Variations', 'ACID Properties', 'OS Concurrency'],
    recommendedPractice: ['code-3', 'mcq-2', 'mcq-3', 'apt-2']
  },
  {
    id: 'accenture',
    name: 'Accenture (ASE & FSE)',
    badge: 'Global Consulting & Cloud',
    hiringFocus: 'Cognitive ability, English proficiency, Pseudocode analysis, and Cloud awareness',
    readinessPercentage: 78,
    breakdown: {
      technical: 75,
      coding: 65,
      aptitude: 86,
      interview: 72
    },
    rounds: [
      {
        roundName: 'Round 1: Cognitive & Technical Assessment',
        description: 'English ability, Critical thinking, Abstract reasoning, and Technical Pseudocode output evaluation.',
        pattern: '90 questions in 90 minutes (Elimination round)',
        prepStrategy: 'Practice predicting exact pseudocode loop executions and bitwise operations.'
      },
      {
        roundName: 'Round 2: Coding Assessment',
        description: '2 Coding questions testing logic, array math, and string formatting.',
        pattern: '45 minutes',
        prepStrategy: 'Ensure all public and hidden test cases pass without Time Limit Exceeded.'
      },
      {
        roundName: 'Round 3: Communication Assessment (Automated)',
        description: 'AI-evaluated speaking, listening, reading, and sentence repeating.',
        pattern: '20 minutes voice assessment',
        prepStrategy: 'Speak clearly, maintain steady pace, avoid filler words.'
      },
      {
        roundName: 'Round 4: Technical & HR Interview',
        description: 'Project walkthrough, agile methodology understanding, and role motivation.',
        pattern: '30 minutes',
        prepStrategy: 'Highlight collaborative project contributions and cloud/API integrations.'
      }
    ],
    mustKnowTopics: ['Pseudocode Tracing', 'Verbal Fluency', 'SQL Aggregations', 'REST APIs', 'Cloud Computing Basics'],
    recommendedPractice: ['apt-3', 'code-1', 'mcq-4']
  },
  {
    id: 'cognizant',
    name: 'Cognizant (GenC / GenC Next)',
    badge: 'Digital Solutions',
    hiringFocus: 'Analytical reasoning, Full-stack web fundamentals, and Data structures',
    readinessPercentage: 73,
    breakdown: {
      technical: 71,
      coding: 62,
      aptitude: 82,
      interview: 66
    },
    rounds: [
      {
        roundName: 'Round 1: Skill Assessment',
        description: 'Aptitude, Domain Specific MCQs, and Coding problems.',
        pattern: '60 min cognitive + 45 min programming',
        prepStrategy: 'Review core OOP principles and medium difficulty string algorithms.'
      },
      {
        roundName: 'Round 2: Technical Interview',
        description: 'Project code review, database schema normalization, and live coding.',
        pattern: '40 minutes',
        prepStrategy: 'Be ready to share screen and write code without an IDE auto-complete.'
      },
      {
        roundName: 'Round 3: HR Interview',
        description: 'Workplace adaptability, willingness to learn new tech stacks.',
        pattern: '20 minutes',
        prepStrategy: 'Demonstrate curiosity about modern cloud and generative AI workflows.'
      }
    ],
    mustKnowTopics: ['Normalization 1NF-3NF', 'Two Pointers Algorithm', 'Linked List Operations', 'TCP vs UDP'],
    recommendedPractice: ['code-2', 'mcq-2', 'apt-1']
  },
  {
    id: 'wipro',
    name: 'Wipro (Elite / Turbo)',
    badge: 'Enterprise IT Services',
    hiringFocus: 'Quantitative aptitude, logical deduction, and fundamental coding standards',
    readinessPercentage: 76,
    breakdown: {
      technical: 73,
      coding: 64,
      aptitude: 85,
      interview: 70
    },
    rounds: [
      {
        roundName: 'Round 1: National Talent Hunt Assessment',
        description: 'Aptitude + Written Communication (Essay Writing) + Coding test.',
        pattern: 'Quants (16), Logical (14), English (22), Essay (20m), 2 Coding (60m)',
        prepStrategy: 'Structure your essay with intro, 2 body arguments, and conclusion.'
      },
      {
        roundName: 'Round 2: Technical & HR Panel',
        description: 'Comprehensive discussion on academic projects and core programming.',
        pattern: '30-40 minutes',
        prepStrategy: 'Review your resume thoroughly; expect questions on every listed project.'
      }
    ],
    mustKnowTopics: ['Permutations & Combinations', 'Essay Coherence', 'OOP Abstraction', 'Sorting Algorithms'],
    recommendedPractice: ['apt-1', 'apt-3', 'code-1']
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    badge: 'Product-Based SaaS',
    hiringFocus: 'Deep problem solving in C/Java, custom Data Structures, and zero library dependency',
    readinessPercentage: 59,
    breakdown: {
      technical: 64,
      coding: 48,
      aptitude: 70,
      interview: 54
    },
    rounds: [
      {
        roundName: 'Round 1: Written Aptitude & C/C++ Tracing',
        description: 'Pointers, recursion trace, bitwise math, complex loops, and brain teasers.',
        pattern: '15 Aptitude + 15 C/C++ pointer evaluation questions',
        prepStrategy: 'Master pointer arithmetic, memory allocation, and recursion trace tree.'
      },
      {
        roundName: 'Round 2: Basic Programming (No Built-in Libraries)',
        description: '5 Programming questions testing pure logic (Pattern printing, string parsing, matrix rotation).',
        pattern: '3 hours lab round without standard libraries',
        prepStrategy: 'Practice writing your own string manipulation and math functions from scratch.'
      },
      {
        roundName: 'Round 3: Advanced Programming / Mini-System Design',
        description: 'Design games or terminal systems (e.g., Railway Booking System, Snake Game, Chess, Text Editor).',
        pattern: '3-4 hours application design round',
        prepStrategy: 'Design modular classes, handle all edge cases, and ensure clean separation of concerns.'
      },
      {
        roundName: 'Round 4: Technical & HR Interview',
        description: 'Code review of Round 3 design and cultural alignment.',
        pattern: '45-60 minutes',
        prepStrategy: 'Explain your architecture decisions, edge case handling, and memory cleanup.'
      }
    ],
    mustKnowTopics: ['Pointer Arithmetic & Double Pointers', 'Matrix Traversals', 'Object-Oriented System Design', 'State Machine Logic'],
    recommendedPractice: ['code-2', 'code-3', 'mcq-1']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'Tier-1 Product / FAANG',
    hiringFocus: 'DSA Mastery, System Scalability, and Amazon 16 Leadership Principles',
    readinessPercentage: 54,
    breakdown: {
      technical: 62,
      coding: 46,
      aptitude: 78,
      interview: 48
    },
    rounds: [
      {
        roundName: 'Round 1: Online Assessment (OA2)',
        description: '2 LeetCode Medium/Hard algorithmic questions + Work Style Assessment (LP scenarios).',
        pattern: '90 minutes (2 coding questions + 15 LP situational questions)',
        prepStrategy: 'Master Graphs (BFS/DFS), Trees, Heaps, and Dynamic Programming.'
      },
      {
        roundName: 'Round 2-4: Technical Interviews (Loops)',
        description: 'Live coding on shared editor, time/space complexity analysis, and deep Leadership Principles stories.',
        pattern: '3 to 4 rounds of 60 minutes each',
        prepStrategy: 'Spend 20 min on Leadership Principles using STAR with quantified metrics, 40 min on coding.'
      }
    ],
    mustKnowTopics: ['Graphs (Dijkstra, Cycle Detection)', 'Heaps & Priority Queues', 'LRU Cache Design', 'Customer Obsession & Ownership'],
    recommendedPractice: ['code-3', 'code-4', 'mcq-3']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'Tier-1 Product Global Tech',
    hiringFocus: 'Clean code architecture, DSA optimization, test case foresight, and growth mindset',
    readinessPercentage: 58,
    breakdown: {
      technical: 66,
      coding: 50,
      aptitude: 76,
      interview: 52
    },
    rounds: [
      {
        roundName: 'Round 1: Online Codility / HackerRank Test',
        description: '3 Algorithmic problems ranging from Medium to Hard.',
        pattern: '90-120 minutes',
        prepStrategy: 'Prioritize writing bug-free modular code with defensive null checks.'
      },
      {
        roundName: 'Round 2-4: Virtual Onsite Interviews',
        description: 'Data Structures, Object-Oriented Design, Operating Systems, and behavioral fit.',
        pattern: '4 rounds of 45-60 minutes',
        prepStrategy: 'Speak out loud while brainstorming solutions, discuss edge cases before coding.'
      }
    ],
    mustKnowTopics: ['Binary Trees & BSTs', 'Dynamic Programming', 'OS Threads & Mutexes', 'Clean Code Principles'],
    recommendedPractice: ['code-3', 'code-4', 'mcq-2', 'mcq-3']
  },
  {
    id: 'google',
    name: 'Google',
    badge: 'Tier-1 High Bar Tech',
    hiringFocus: 'Deep algorithmic problem solving, graph theory, mathematical proofs, and Googleyness',
    readinessPercentage: 51,
    breakdown: {
      technical: 60,
      coding: 42,
      aptitude: 80,
      interview: 45
    },
    rounds: [
      {
        roundName: 'Round 1: Google Online Challenge (GOC)',
        description: '2 Complex algorithmic problems with tricky constraints and edge cases.',
        pattern: '60 minutes',
        prepStrategy: 'Focus on advanced graphs, segment trees, and dynamic programming state transitions.'
      },
      {
        roundName: 'Round 2-5: Technical & Googleyness Rounds',
        description: 'Unseen problem-solving with Google engineers, algorithm design, and collaborative teamwork.',
        pattern: '4 to 5 rounds of 45 minutes',
        prepStrategy: 'Write readable production code on Google Docs, establish optimal asymptotic bounds.'
      }
    ],
    mustKnowTopics: ['Graph Algorithms (Topological Sort, Strongly Connected)', 'Interval Scheduling', 'Tries & Prefix Trees', 'Complexity Proofs'],
    recommendedPractice: ['code-4', 'code-3', 'mcq-3']
  },
  {
    id: 'deloitte',
    name: 'Deloitte (USI / India)',
    badge: 'Big 4 Technology Consulting',
    hiringFocus: 'Business acumen, analytical problem solving, data management, and consulting case interviews',
    readinessPercentage: 77,
    breakdown: {
      technical: 74,
      coding: 62,
      aptitude: 88,
      interview: 75
    },
    rounds: [
      {
        roundName: 'Round 1: Cognitive & Technical MCQ Assessment',
        description: 'Quantitative aptitude, logical deduction, English, and fundamental computer science.',
        pattern: '75 questions in 75 minutes',
        prepStrategy: 'Practice speed math and accurate data interpretation charts.'
      },
      {
        roundName: 'Round 2: Technical Interview & Case Study',
        description: 'Discussion on relational databases, cloud architectures, and a mini business scenario.',
        pattern: '30-40 minutes',
        prepStrategy: 'Explain technical solutions from a client business value perspective.'
      },
      {
        roundName: 'Round 3: HR & Leadership Interview',
        description: 'Communication skills, leadership potential, client handling readiness.',
        pattern: '20 minutes',
        prepStrategy: 'Demonstrate active listening and structured articulate responses.'
      }
    ],
    mustKnowTopics: ['Data Interpretation (Graphs & Tables)', 'SQL Joins & Grouping', 'SDLC Models', 'Client Communication'],
    recommendedPractice: ['apt-1', 'mcq-5', 'apt-3']
  }
];
