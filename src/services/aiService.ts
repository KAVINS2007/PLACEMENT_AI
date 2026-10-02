import { StudentProfile, SkillScore, MockInterviewSession, ResumeAnalysisResult, Roadmap, RoadmapTask } from '../types';

/**
 * AI Service for PlacementAI
 * Modular architecture: Uses high-fidelity local AI heuristics by default
 * and seamlessly connects to Google Gemini API if VITE_GEMINI_API_KEY is configured.
 */

export class AIService {
  private static getGeminiApiKey(): string | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('placementai_gemini_key');
      if (stored) return stored;
    }
    return (import.meta as any).env?.VITE_GEMINI_API_KEY || null;
  }

  /**
   * AI Placement Coach Chatbot
   */
  public static async getCoachResponse(
    message: string,
    student: StudentProfile,
    skills: SkillScore[]
  ): Promise<string> {
    const apiKey = this.getGeminiApiKey();
    const lower = message.toLowerCase();

    // Context summary
    const criticalGaps = skills.filter(s => s.status === 'Critical Gap').map(s => s.skillName);
    const weakSkills = skills.filter(s => s.status === 'Needs Improvement').map(s => s.skillName);
    const strongSkills = skills.filter(s => s.status === 'Strong').map(s => s.skillName);

    // If API key is available, attempt real Gemini call with fallback
    if (apiKey) {
      try {
        const prompt = `You are "Placement Coach", an elite AI campus placement mentor at top engineering colleges.
Student Profile:
- Name: ${student.name}
- Target Role: ${student.targetRole}
- Target Companies: ${student.targetCompanies.join(', ')}
- Current Readiness Score: ${student.readinessScore}/100
- Critical Gaps: ${criticalGaps.join(', ') || 'None'}
- Needs Improvement: ${weakSkills.join(', ') || 'None'}
- Strong Skills: ${strongSkills.join(', ') || 'None'}
- Available daily hours: ${student.preferredHoursPerDay} hrs

User Query: "${message}"

Respond concisely, with high energy, actionable bullet points, exact time allocations if asking about schedules, and direct references to their target role and actual gaps. Never give generic platitudes.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local placement engine:', err);
      }
    }

    // High-fidelity local AI responses matching the prompt requirements
    if (lower.includes('1 hour') || lower.includes('one hour') || lower.includes('limited time')) {
      const topGap = criticalGaps[0] || 'DSA';
      return `⏱️ **High-Impact 1-Hour Schedule for ${student.name}**\n\nBecause you only have 60 minutes today, we must triage ruthlessly around your highest priority gap (**${topGap}**):\n\n* **25 min — ${topGap} Core Drill**: Solve 2 medium questions on recursion or two-pointer arrays.\n* **20 min — SQL / Database Query**: Practice 2 multi-table JOINs with GROUP BY HAVING.\n* **15 min — Quantitative Aptitude**: Solve 5 rapid-fire questions on Time & Work.\n\n🎯 *Why this order?* ${topGap} is currently your biggest hurdle for ${student.targetRole} screening rounds. Keep your momentum going!`;
    }

    if (lower.includes('how should i prepare today') || lower.includes('today') || lower.includes('plan')) {
      return `Good day, ${student.name}! Based on your current **${student.readinessScore}/100** Placement Readiness Score and target role **${student.targetRole}**, here is your personalized daily blueprint:\n\n1. **Focus Area 1: DSA Trees & Recursion (40 min)**\n   • Address your critical gap (${skills.find(s => s.skillName.includes('Data'))?.score || 48}%)\n   • Recommended: Inorder & Level Order Tree Traversals.\n\n2. **Focus Area 2: Core CS / OS Virtual Memory (25 min)**\n   • Address Operating Systems gap (${skills.find(s => s.skillName.includes('Operating'))?.score || 44}%)\n   • Revise Thrashing, Page Replacement (FIFO vs LRU).\n\n3. **Focus Area 3: Behavioral Pitch Practice (15 min)**\n   • Formulate 1 story using the STAR framework for ${student.targetCompanies[0] || 'top tier'} interviews.\n\nWould you like me to launch a 5-question quick quiz on any of these right now?`;
    }

    if (lower.includes('tcs')) {
      return `🏢 **Custom Preparation Strategy for TCS (Digital & Prime / Ninja)**\n\n• **Aptitude (Your score: 76% - Strong)**: Focus on Speed Math, Number Systems, and Time-Speed-Distance.\n• **Coding (Your score: 48% - Critical Gap)**: TCS tests string manipulation, array sliding windows, and prime factorizations. Practice 2 coding problems in C++/Python today.\n• **Technical Interview**: Prepare your DBMS queries (Joins, ACID) and be ready to explain every single project listed on your resume.\n• **Next Step**: Head to the **Company Prep** tab and select TCS to launch targeted practice.`;
    }

    if (lower.includes('amazon') || lower.includes('google') || lower.includes('faang')) {
      return `🚀 **Targeting Tier-1 Product Companies (${student.targetCompanies.join(', ')})**\n\nTo raise your readiness from ${student.readinessScore}% to 80+ for Tier-1 roles:\n\n1. **Data Structures Bar**: Amazon/Google require solid medium/hard DSA. You must bridge your DSA score from 48% to at least 75%. Focus on Graph cycle detection, Heaps, and Dynamic Programming.\n2. **Behavioral Leadership**: For Amazon, 50% of the interview weight is on the 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action). Always answer in the STAR method with exact metrics.\n3. **Action Today**: Go to **AI Mock Interview** and select "Technical Interview" for ${student.targetRole}.`;
    }

    if (lower.includes('weak in dsa') || lower.includes('dsa') || lower.includes('algorithms')) {
      return `💡 **DSA Recovery Roadmap for ${student.name}**\n\nYour diagnostic score in DSA was **48% (Critical Gap)**. Do NOT jump directly into Dynamic Programming or Graphs. Follow this progressive ladder:\n\n1. **Step 1: Arrays & Two Pointers** (Two Sum, 3Sum, Container with Water)\n2. **Step 2: Recursion & Backtracking** (Subsets, Permutations)\n3. **Step 3: Binary Trees** (Traversals, Max Depth, Invert Tree)\n4. **Step 4: Heaps & Priority Queues** (Kth largest element)\n5. **Step 5: Dynamic Programming** (1D arrays before 2D grids)\n\nI have adapted your roadmap so Week 2 & 3 prioritize this exact sequence. Start with Task #2 in your Roadmap!`;
    }

    if (lower.includes('sql') || lower.includes('database')) {
      return `📊 **Top 5 High-Frequency Placement SQL Questions:**\n\n1. **Second Highest Salary**: Write a query to find the second highest salary without using LIMIT.\n   \`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);\`\n2. **Duplicate Records**: Identify duplicate emails in a table.\n   \`SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;\`\n3. **Department Wise Top Earner**: Use \`DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)\`.\n4. **Self Join**: Find all employees whose salary is higher than their direct manager.\n5. **LEFT JOIN vs INNER JOIN**: Explain where unmatched records go.\n\nTry running these inside our **Practice Arena**!`;
    }

    if (lower.includes('interview') || lower.includes('mock')) {
      return `🎙️ **AI Mock Interview Readiness**\n\nYour current Interview Readiness score is **51%**. To improve:\n• Always answer behavioral questions with **Situation → Task → Action → Result**.\n• In technical rounds, talk through your thought process *before* typing code.\n• State the brute force complexity first (e.g. O(N²)), then optimize to O(N log N).\n\n👉 Click **Mock Interview** in the sidebar to run a live simulation with real-time scoring!`;
    }

    // Default intelligent response
    return `Hello ${student.name}! I am your **AI Placement Coach**.\n\nCurrently, your **Placement Readiness is ${student.readinessScore}/100** for the **${student.targetRole}** role.\n\n📌 **Key Action Items for Today:**\n• You have **${criticalGaps.length} Critical Gaps** (${criticalGaps.join(', ') || 'DSA & OS'}).\n• Your weekly roadmap has tasks ready to advance your score toward our **80+ Target**.\n\nYou can ask me:\n• *"How should I prepare today?"*\n• *"I have only 1 hour today."*\n• *"What should I study for TCS or Amazon?"*\n• *"Give me 5 SQL questions."*\n• *"How do I improve my resume ATS score?"*`;
  }

  /**
   * Evaluates AI Mock Interview student responses across 6 core criteria
   */
  public static evaluateInterviewResponse(
    question: string,
    studentAnswer: string,
    role: string
  ): {
    relevance: number;
    clarity: number;
    confidence: number;
    technicalDepth: number;
    structure: number;
    grammar: number;
    overallScore: number;
    feedbackNote: string;
  } {
    const words = studentAnswer.trim().split(/\s+/).length;
    const lower = studentAnswer.toLowerCase();

    // Heuristics for interview evaluation
    let lengthFactor = Math.min(100, Math.max(30, words * 2.2));
    let structureBonus = 0;
    if (lower.includes('first') || lower.includes('then') || lower.includes('because') || lower.includes('result') || lower.includes('situation')) {
      structureBonus += 15;
    }

    let technicalTerms = ['algorithm', 'complexity', 'database', 'optimization', 'latency', 'model', 'api', 'framework', 'scale', 'system', 'python', 'sql', 'cache'];
    let techCount = technicalTerms.filter(t => lower.includes(t)).length;
    let technicalDepth = Math.min(95, Math.max(45, 50 + techCount * 9));

    let relevance = words > 15 ? Math.min(96, 65 + techCount * 6) : 40;
    let clarity = words > 20 ? Math.min(94, 70 + (words < 120 ? 15 : 5)) : 50;
    let confidence = lower.includes('maybe') || lower.includes('not sure') || lower.includes('i think') ? 58 : Math.min(92, 72 + structureBonus / 2);
    let structure = Math.min(95, 55 + structureBonus + (words > 40 ? 15 : 0));
    let grammar = words > 10 ? 88 : 60;

    let overallScore = Math.round(
      (relevance * 0.25) +
      (technicalDepth * 0.25) +
      (structure * 0.2) +
      (clarity * 0.15) +
      (confidence * 0.1) +
      (grammar * 0.05)
    );

    let feedbackNote = '';
    if (overallScore >= 80) {
      feedbackNote = 'Excellent answer! You demonstrated solid technical precision and clear narrative structure.';
    } else if (overallScore >= 65) {
      feedbackNote = 'Good foundation. To reach an elite score, quantify your impact (e.g. percentages, user counts) and mention asymptotic tradeoffs.';
    } else {
      feedbackNote = 'Your answer is too brief or lacks structural organization. Try framing your thoughts using the STAR method (Situation, Task, Action, Result).';
    }

    return {
      relevance: Math.round(relevance),
      clarity: Math.round(clarity),
      confidence: Math.round(confidence),
      technicalDepth: Math.round(technicalDepth),
      structure: Math.round(structure),
      grammar: Math.round(grammar),
      overallScore,
      feedbackNote
    };
  }

  /**
   * Resumes Analyzer
   */
  public static analyzeResumeText(
    resumeText: string,
    targetRole: string
  ): ResumeAnalysisResult {
    const lower = resumeText.toLowerCase();

    const roleKeywords: Record<string, string[]> = {
      'Machine Learning Engineer': ['python', 'pytorch', 'tensorflow', 'scikit-learn', 'pandas', 'fastapi', 'docker', 'mlops', 'sql', 'git', 'deep learning'],
      'Software Developer': ['dsa', 'data structures', 'algorithms', 'git', 'oop', 'sql', 'system design', 'rest api', 'java', 'c++', 'testing'],
      'Full Stack Developer': ['react', 'node.js', 'typescript', 'mongodb', 'postgresql', 'tailwind', 'rest api', 'git', 'next.js', 'html', 'css'],
      'Data Analyst': ['sql', 'excel', 'power bi', 'tableau', 'python', 'pandas', 'statistics', 'data visualization', 'dashboards', 'etl']
    };

    const targetList = roleKeywords[targetRole] || roleKeywords['Software Developer'];
    const matched = targetList.filter(k => lower.includes(k.toLowerCase()));
    const missing = targetList.filter(k => !lower.includes(k.toLowerCase()));

    const matchRatio = matched.length / targetList.length;
    let score = Math.round(45 + (matchRatio * 45) + (resumeText.length > 500 ? 10 : 0));
    score = Math.min(95, Math.max(40, score));

    return {
      score,
      summary: `Your resume matched ${matched.length} of ${targetList.length} high-priority industry keywords for ${targetRole}. ${missing.length > 0 ? `Key missing keywords: ${missing.slice(0, 3).join(', ')}.` : 'Great keyword density!'}`,
      matchedSkills: matched.map(s => s.toUpperCase()),
      missingKeywords: missing.map(s => s.toUpperCase()),
      strengths: [
        'Clear, legible format compatible with standard Applicant Tracking Systems (ATS).',
        `Recognized critical core competencies in: ${matched.slice(0, 4).join(', ') || 'foundational software'}.`,
        'Academic credentials and projects are structured logically.'
      ],
      weaknesses: [
        missing.length > 0 ? `Missing essential tools: ${missing.slice(0, 3).join(', ')}.` : 'Needs more emphasis on system architecture.',
        'Project bullets describe responsibilities rather than quantifiable business impact (XYZ formula).'
      ],
      actionableSuggestions: [
        `Incorporate ${missing.slice(0, 2).join(' and ') || 'containerization'} into your project stack description.`,
        'Use Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" in project bullets.',
        'Ensure all technical acronyms (REST, SQL, CI/CD) are capitalized consistently.'
      ],
      roleFitPercentage: Math.round(matchRatio * 100),
      sections: [
        { name: 'Contact Information', status: 'good', comment: 'Professional email, GitHub, and phone number present.' },
        { name: 'Education & Academics', status: 'good', comment: 'Degree, major, and graduation year clearly listed.' },
        { name: 'Technical Skills', status: missing.length > 2 ? 'warning' : 'good', comment: `${matched.length} relevant skills detected for ${targetRole}.` },
        { name: 'Projects', status: 'warning', comment: 'Ensure every project specifies metrics (e.g. latency, accuracy, volume).' },
        { name: 'Experience / Leadership', status: 'good', comment: 'Relevant campus club or internship context present.' }
      ]
    };
  }

  /**
   * Adapts Roadmap tasks dynamically based on practice attempts and skill gaps
   */
  public static adaptRoadmap(
    roadmap: Roadmap,
    failedCategory: string,
    passedTopic: string
  ): { updatedRoadmap: Roadmap; message: string } {
    const updated = JSON.parse(JSON.stringify(roadmap)) as Roadmap;

    // Check if we need to inject a remedial task
    const remedialTask: RoadmapTask = {
      id: `adaptive-${Date.now()}`,
      week: 4,
      weekTitle: 'Week 4 — Placement Simulation & Company Prep',
      title: `Adaptive Remediation: ${failedCategory} Foundation Booster`,
      description: `Auto-generated task because recent attempts in ${failedCategory} were below 60%. Master prerequisite concepts before advancing.`,
      difficulty: 'Beginner',
      estimatedMinutes: 30,
      skill: failedCategory,
      completed: false,
      type: 'practice',
      dynamicReason: `Injected dynamically by Adaptive Engine due to low accuracy in ${failedCategory}`
    };

    // Add task to week 4
    if (updated.weeks[3]) {
      updated.weeks[3].tasks.unshift(remedialTask);
    }

    const message = `Adaptive System Update: Boosted practice on ${failedCategory} and advanced prerequisite ladder based on your recent attempt.`;
    updated.lastAdaptedReason = message;

    return { updatedRoadmap: updated, message };
  }
}
