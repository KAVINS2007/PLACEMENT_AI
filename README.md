# PLACEMENT_AI
The AI Resume Analyzer and Matcher parses applicant resumes (PDF/Docx), extracts key skills, experience, and education, and compares them against specific job descriptions (JDs) using semantic similarity. It provides a transparent match score, highlights missing technical gaps, and suggests actionable resume improvements.
# PLACEMATE-AI 🚀

### AI-Powered Placement Preparation Platform

PLACEMATE-AI is an AI-driven platform designed to help students prepare for placements through personalized learning, skill assessment, resume analysis, interview practice, company-specific preparation, and progress tracking.

The platform brings multiple placement-preparation activities together in a single application.

---

## 🎯 Problem Statement

Students prepare for placements in different ways, but many struggle to identify:

- What skills they need to learn
- Which skills they are currently missing
- How well their resume matches a job description
- What companies expect from candidates
- How to practice coding and technical questions
- How to prepare for interviews
- How to track their placement preparation progress

PLACEMATE-AI aims to provide a centralized and personalized solution for these challenges.

---

## 💡 Solution

PLACEMATE-AI provides an integrated placement-preparation environment where students can:

1. Analyze their resume
2. Identify skill gaps
3. Generate personalized preparation roadmaps
4. Practice technical questions
5. Take assessments
6. Prepare for specific companies
7. Practice mock interviews
8. Interact with an AI career coach
9. Track their progress
10. Improve their placement readiness

---

# 🔄 Project Workflow

```text
                    ┌─────────────────────┐
                    │      Student        │
                    │      Sign In        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Dashboard       │
                    │ Profile & Progress  │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
     ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
     │ Resume        │ │ Skill Gap     │ │ Diagnostic    │
     │ Analyzer      │ │ Analysis      │ │ Assessment    │
     └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Personalized       │
                    │ Preparation Roadmap │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
     ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
     │ Practice      │ │ Company       │ │ Mock          │
     │ Arena         │ │ Preparation   │ │ Interview     │
     └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │      AI Coach       │
                    │ Personalized        │
                    │ Guidance & Feedback  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Progress Dashboard  │
                    │ Performance Tracking│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Placement Readiness │
                    └─────────────────────┘
# Skill gap analysis
Current Skills
       ↓
Required Skills
       ↓
Skill Gap
       ↓
Learning Recommendations

#🗺️ Personalized Roadmap
Students can follow a structured preparation roadmap based on their goals and current skill level.

The roadmap can include:

Programming
Data Structures & Algorithms
SQL
Core Computer Science
Aptitude
Communication
Interview Preparation

#🧠 Practice Arena
Provides a dedicated environment for technical practice.

Students can improve their knowledge through practice questions and track their performance.

#📝 Assessment System
Students can evaluate their preparation through assessments.

The system can track:

Scores
Correct answers
Incorrect answers
Performance
Areas requiring improvement

#🤖 AI Career Coach
The AI Coach provides personalized guidance related to placement preparation.

Students can use it for:

Preparation guidance
Learning suggestions
Interview preparation
Skill improvement
Career-related questions

#🎤 Mock Interview
Provides an interview-practice environment where students can prepare for:

Technical interviews
HR interviews
Common interview questions
Communication
Self-introduction

#📊 Progress Dashboard
1.Overall progress
2.Assessment performance
3.Skill development
4.Practice activity
5.Preparation roadmap
6.Placement readiness

#🧬 Digital Twin

The Digital Twin module is designed to represent a student's skills, progress, and preparation state digitally.
This can help provide more personalized recommendations based on the student's evolving profile.

#🏗️ Technology Stack
Frontend
1.React
2.TypeScript
3.Vite
4.CSS
Development
1.Node.js
2.npm
3.Git
4.GitHub
AI / Intelligent Features
1.AI-based resume analysis
2.Skill matching
3.Personalized recommendations
4.AI career assistance

#Project Structure
PLACEMATE-AI/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ToastContainer.tsx
│   │   │
│   │   └── views/
│   │       ├── AICoachView.tsx
│   │       ├── AdminView.tsx
│   │       ├── AssessmentView.tsx
│   │       ├── AuthModal.tsx
│   │       ├── CompanyPrepView.tsx
│   │       ├── DashboardView.tsx
│   │       ├── DigitalTwinView.tsx
│   │       ├── InnovationView.tsx
│   │       ├── LandingPage.tsx
│   │       ├── MockInterviewView.tsx
│   │       ├── PracticeArenaView.tsx
│   │       ├── ProgressDashboardView.tsx
│   │       ├── ResumeAnalyzerView.tsx
│   │       ├── RoadmapView.tsx
│   │       └── SkillGapView.tsx
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── data/
│   │   ├── companies.ts
│   │   ├── diagnosticQuestions.ts
│   │   ├── mockData.ts
│   │   └── practiceQuestions.ts
│   │
│   ├── services/
│   │   └── aiService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md

