import { Question } from '../types';

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  // --- TECHNICAL: Programming & DSA ---
  {
    id: 'diag-1',
    category: 'Technical',
    subcategory: 'Programming',
    difficulty: 'Easy',
    question: 'In Python, what is the output of the following expression: [i**2 for i in range(5) if i % 2 == 0]?',
    codeSnippet: `result = [i**2 for i in range(5) if i % 2 == 0]\nprint(result)`,
    options: ['[0, 1, 4]', '[0, 4, 16]', '[4, 16]', '[1, 9]'],
    correctIndex: 1,
    explanation: 'range(5) gives 0, 1, 2, 3, 4. The even values are 0, 2, and 4. Squaring them yields 0^2=0, 2^2=4, and 4^2=16.'
  },
  {
    id: 'diag-2',
    category: 'Technical',
    subcategory: 'DSA',
    difficulty: 'Medium',
    question: 'What is the worst-case time complexity of searching for an element in an unbalance Binary Search Tree (BST) versus a self-balancing AVL Tree?',
    options: [
      'BST: O(log n), AVL: O(log n)',
      'BST: O(n), AVL: O(log n)',
      'BST: O(n log n), AVL: O(n)',
      'BST: O(1), AVL: O(log n)'
    ],
    correctIndex: 1,
    explanation: 'A regular BST can degenerate into a linked list giving worst-case O(n) search time. An AVL tree maintains balance strictly, guaranteeing O(log n).'
  },
  {
    id: 'diag-3',
    category: 'Technical',
    subcategory: 'DSA',
    difficulty: 'Hard',
    question: 'Which algorithmic paradigm is most optimal for detecting a cycle in a directed graph with N vertices and E edges?',
    options: [
      'Depth First Search (DFS) with recursion stack tracking in O(V + E)',
      'Dijkstra Algorithm in O(E log V)',
      'Kruskal Algorithm with Disjoint Set Union in O(E log V)',
      'Binary Search on edges in O(E log E)'
    ],
    correctIndex: 0,
    explanation: 'Cycle detection in directed graphs uses DFS tracking the active recursion stack (or Kahn algorithm with in-degrees) with O(V + E) time complexity.'
  },
  {
    id: 'diag-4',
    category: 'Technical',
    subcategory: 'OOP',
    difficulty: 'Easy',
    question: 'Which Object-Oriented Programming principle allows a child class to provide a specific implementation of a method already provided by its parent class?',
    options: ['Method Overloading', 'Encapsulation', 'Method Overriding (Runtime Polymorphism)', 'Data Abstraction'],
    correctIndex: 2,
    explanation: 'Method Overriding allows a subclass to define a method with the exact same signature as its superclass, executed dynamically at runtime.'
  },
  {
    id: 'diag-5',
    category: 'Technical',
    subcategory: 'DBMS',
    difficulty: 'Medium',
    question: 'In a Relational Database, what ACID property guarantees that multiple transactions execute concurrently without interleaving anomalies?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 2,
    explanation: 'Isolation ensures that concurrently executing transactions do not see uncommitted intermediate states of each other.'
  },
  {
    id: 'diag-6',
    category: 'Technical',
    subcategory: 'SQL',
    difficulty: 'Medium',
    question: 'Which SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?',
    codeSnippet: `SELECT department_id, AVG(salary) \nFROM employees \nGROUP BY department_id \n______ AVG(salary) > 50000;`,
    options: ['WHERE', 'HAVING', 'FILTER BY', 'ORDER BY'],
    correctIndex: 1,
    explanation: 'HAVING filters aggregated groups created by GROUP BY, while WHERE filters individual rows before grouping.'
  },
  {
    id: 'diag-7',
    category: 'Technical',
    subcategory: 'Operating Systems',
    difficulty: 'Medium',
    question: 'What four conditions MUST simultaneously hold for a Deadlock to occur in an Operating System?',
    options: [
      'Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
      'Paging, Segmentation, Swapping, Thrashing',
      'Race Condition, Critical Section, Mutex, Semaphore',
      'First-Come-First-Serve, Shortest Job First, Priority, Round Robin'
    ],
    correctIndex: 0,
    explanation: 'Coffman four conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.'
  },
  {
    id: 'diag-8',
    category: 'Technical',
    subcategory: 'Operating Systems',
    difficulty: 'Hard',
    question: 'What is Thrashing in virtual memory management?',
    options: [
      'Excessive CPU scheduling between multiple user threads',
      'High rate of page faults causing the OS to spend more time swapping pages than executing instructions',
      'A hardware fault resulting in kernel panic',
      'Fragmented disk space preventing cache writes'
    ],
    correctIndex: 1,
    explanation: 'Thrashing occurs when the system spends more time servicing page faults and paging data to/from disk than executing user processes.'
  },
  {
    id: 'diag-9',
    category: 'Technical',
    subcategory: 'Computer Networks',
    difficulty: 'Medium',
    question: 'In the TCP/IP suite, at which layer does the Transport Layer Security (TLS/HTTPS) handshake primarily operate relative to TCP and HTTP?',
    options: [
      'Below the Network Layer (IP)',
      'Between Transport Layer (TCP) and Application Layer (HTTP)',
      'Inside the Data Link Layer (Ethernet frames)',
      'Directly inside the physical router firmware'
    ],
    correctIndex: 1,
    explanation: 'TLS sits between TCP (transport layer) and the HTTP application layer, encrypting application payloads over an established TCP socket.'
  },
  {
    id: 'diag-10',
    category: 'Technical',
    subcategory: 'Git/GitHub',
    difficulty: 'Easy',
    question: 'What is the primary difference between "git merge" and "git rebase"?',
    options: [
      'Merge creates a merge commit preserving history; Rebase reapplies commits on top of another base, creating a linear history',
      'Merge deletes the branch; Rebase preserves the branch',
      'Rebase pushes to remote; Merge keeps changes local',
      'Merge only works for GitHub; Rebase works for GitLab'
    ],
    correctIndex: 0,
    explanation: 'git merge combines branches with a new merge commit preserving branch chronology; git rebase rewrites commit history onto the tip of another branch.'
  },
  {
    id: 'diag-11',
    category: 'Technical',
    subcategory: 'DSA',
    difficulty: 'Medium',
    question: 'What data structure is optimal for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?',
    options: [
      'Hash Map + Doubly Linked List',
      'Binary Search Tree + Array',
      'Priority Queue (Min Heap) + Stack',
      'Circular Queue + Red-Black Tree'
    ],
    correctIndex: 0,
    explanation: 'A Hash Map provides O(1) key lookups, while a Doubly Linked List allows O(1) removal and insertion at the head/tail to track access recency.'
  },
  {
    id: 'diag-12',
    category: 'Technical',
    subcategory: 'Programming',
    difficulty: 'Medium',
    question: 'What will be the output in Java when comparing two Integer objects with values 100 and 1000 using the == operator?',
    codeSnippet: `Integer a = 100, b = 100;\nInteger c = 1000, d = 1000;\nSystem.out.println((a == b) + " " + (c == d));`,
    options: ['true true', 'true false', 'false false', 'false true'],
    correctIndex: 1,
    explanation: 'Java caches Integer objects between -128 and 127. So a == b is true (same cached reference), while c == d creates separate heap objects and evaluates to false.'
  },

  // --- APTITUDE: Quantitative ---
  {
    id: 'diag-13',
    category: 'Aptitude',
    subcategory: 'Quantitative',
    difficulty: 'Medium',
    question: 'A train 180 meters long running at 54 km/hr crosses a bridge in 20 seconds. What is the length of the bridge in meters?',
    options: ['120 meters', '150 meters', '180 meters', '200 meters'],
    correctIndex: 0,
    explanation: 'Speed = 54 * (5/18) = 15 m/s. Total distance covered in 20s = 15 * 20 = 300 meters. Bridge length = 300 - 180 = 120 meters.'
  },
  {
    id: 'diag-14',
    category: 'Aptitude',
    subcategory: 'Quantitative',
    difficulty: 'Medium',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of work is remaining?',
    options: ['4/9', '5/9', '1/3', '2/5'],
    correctIndex: 0,
    explanation: 'Combined 1 day work = 1/12 + 1/18 = 5/36. In 4 days, work done = 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.'
  },
  {
    id: 'diag-15',
    category: 'Aptitude',
    subcategory: 'Quantitative',
    difficulty: 'Easy',
    question: 'If the price of petrol increases by 25%, by what percentage must a car owner reduce fuel consumption to keep total expenditure unchanged?',
    options: ['20%', '25%', '15%', '16.67%'],
    correctIndex: 0,
    explanation: 'Reduction % = [r / (100 + r)] * 100 = [25 / 125] * 100 = 20%.'
  },
  {
    id: 'diag-16',
    category: 'Aptitude',
    subcategory: 'Quantitative',
    difficulty: 'Hard',
    question: 'In how many ways can 5 software engineers and 3 QA engineers be seated in a row such that no two QA engineers sit together?',
    options: ['14,400', '12,000', '7,200', '144'],
    correctIndex: 0,
    explanation: 'First seat 5 engineers in 5! = 120 ways. They create 6 possible empty slots (including ends) for QA. Choosing 3 slots and arranging QA: 6P3 = 6*5*4 = 120. Total ways = 120 * 120 = 14,400.'
  },

  // --- APTITUDE: Logical Reasoning ---
  {
    id: 'diag-17',
    category: 'Aptitude',
    subcategory: 'Logical',
    difficulty: 'Easy',
    question: 'Find the next term in the alphanumeric series: A2C, C4E, E8G, G16I, ?',
    options: ['I32K', 'I24K', 'H32J', 'J32L'],
    correctIndex: 0,
    explanation: 'First letters jump +2: A(+2) -> C(+2) -> E(+2) -> G(+2) -> I. Numbers double: 2, 4, 8, 16 -> 32. Last letters jump +2: C(+2) -> E(+2) -> G(+2) -> I(+2) -> K. Result: I32K.'
  },
  {
    id: 'diag-18',
    category: 'Aptitude',
    subcategory: 'Logical',
    difficulty: 'Medium',
    question: 'Pointing to a photograph of a man, Priya said, "His mother is the only daughter of my mother." How is Priya related to that man?',
    options: ['Sister', 'Mother', 'Aunt', 'Grandmother'],
    correctIndex: 1,
    explanation: '"Only daughter of my mother" means Priya herself (since Priya is female). Thus, the man mother is Priya. So Priya is the man mother.'
  },
  {
    id: 'diag-19',
    category: 'Aptitude',
    subcategory: 'Logical',
    difficulty: 'Medium',
    question: 'Statements: (1) All developers are logical thinkers. (2) Some logical thinkers are chess players. Which conclusion logically follows?',
    options: [
      'All developers are chess players.',
      'Some chess players are developers.',
      'No developer is a chess player.',
      'Neither I nor II follows with certainty.'
    ],
    correctIndex: 3,
    explanation: 'Developers are a subset of logical thinkers, and only some logical thinkers play chess. There is no guaranteed overlap between developers and chess players.'
  },

  // --- APTITUDE: Verbal Ability ---
  {
    id: 'diag-20',
    category: 'Aptitude',
    subcategory: 'Verbal',
    difficulty: 'Easy',
    question: 'Choose the word most nearly OPPOSITE in meaning to EPHEMERAL:',
    options: ['Transient', 'Eternal', 'Fleeting', 'Lethargic'],
    correctIndex: 1,
    explanation: 'Ephemeral means lasting for a very short time. The antonym is Eternal (everlasting).'
  },
  {
    id: 'diag-21',
    category: 'Aptitude',
    subcategory: 'Verbal',
    difficulty: 'Medium',
    question: 'Identify the grammatically correct sentence from the following options:',
    options: [
      'Neither the project manager nor the developers was satisfied with the deployment.',
      'Neither the project manager nor the developers were satisfied with the deployment.',
      'Neither the project manager or the developers was satisfied with the deployment.',
      'Neither the project manager nor the developers is satisfied with the deployment.'
    ],
    correctIndex: 1,
    explanation: 'With "neither... nor", the verb agrees with the subject closer to it. "Developers" is plural, so "were satisfied" is correct.'
  },

  // --- COMMUNICATION ---
  {
    id: 'diag-22',
    category: 'Communication',
    subcategory: 'Professional',
    difficulty: 'Easy',
    question: 'When writing an email to a recruiter following up after a technical interview, what is the most professional subject line?',
    options: [
      'Hey, any updates on my interview?',
      'Follow-up: Software Engineer Application — [Your Name]',
      'Urgent status check regarding candidate interview',
      'Did I pass the technical assessment?'
    ],
    correctIndex: 1,
    explanation: 'A professional subject line specifies the purpose, target position, and candidate name clearly without demanding urgency.'
  },
  {
    id: 'diag-23',
    category: 'Communication',
    subcategory: 'Vocabulary',
    difficulty: 'Medium',
    question: 'What does the term "bandwidth" idiomatically mean when used by engineering managers in workplace discussions?',
    options: [
      'Internet download speed in the office network',
      'Available time, capacity, and mental energy to take on tasks',
      'The width of a project Gantt chart',
      'The number of servers in a cluster'
    ],
    correctIndex: 1,
    explanation: 'In professional team contexts, "bandwidth" refers to an individual or team current available capacity and time to take on more work.'
  },
  {
    id: 'diag-24',
    category: 'Communication',
    subcategory: 'Professional',
    difficulty: 'Medium',
    question: 'During a cross-functional sprint demo, your feature has a bug pointed out by a stakeholder. What is the most effective communication response?',
    options: [
      '"The QA team failed to test this edge case."',
      '"That is a great catch. I will document this edge case, trace the root cause, and update the ticket by end of day."',
      '"That will never happen in production anyway."',
      '"It worked completely fine on my local machine."'
    ],
    correctIndex: 1,
    explanation: 'Taking ownership, validating the feedback constructively, and offering a concrete timeline demonstrates high professional maturity.'
  },

  // --- INTERVIEW READINESS ---
  {
    id: 'diag-25',
    category: 'Interview',
    subcategory: 'HR',
    difficulty: 'Easy',
    question: 'When an interviewer asks "Tell me about yourself", what framework ensures a structured, engaging answer?',
    options: [
      'Chronological childhood autobiography from primary school to present',
      'Present (current role/skills) -> Past (relevant projects & achievements) -> Future (why this role/company fits)',
      'List all programming languages you have ever touched without examples',
      'Recite your resume word-for-word'
    ],
    correctIndex: 1,
    explanation: 'The Present-Past-Future formula provides a 90-second structured answer linking present technical capability with future alignment.'
  },
  {
    id: 'diag-26',
    category: 'Interview',
    subcategory: 'HR',
    difficulty: 'Medium',
    question: 'Which framework is universally recommended for answering behavioral interview questions (e.g., "Describe a time you handled a conflict")?',
    options: ['SOLID Principles', 'STAR Method (Situation, Task, Action, Result)', 'Agile Scrum Cycle', 'SWOT Analysis'],
    correctIndex: 1,
    explanation: 'The STAR method (Situation, Task, Action, Result) ensures structured storytelling with measurable outcomes.'
  },
  {
    id: 'diag-27',
    category: 'Interview',
    subcategory: 'HR',
    difficulty: 'Medium',
    question: 'How should a candidate handle the interview question: "What is your biggest weakness?"',
    options: [
      '"I am a perfectionist and work too hard."',
      '"I do not have any weaknesses."',
      'Name a genuine non-fatal technical skill or tendency, accompanied by concrete steps you have taken to improve it.',
      'State that you dislike team meetings and conflict.'
    ],
    correctIndex: 2,
    explanation: 'Honest self-awareness paired with active remediation (e.g. taking a public speaking course or using project management tools) demonstrates growth mindset.'
  },
  {
    id: 'diag-28',
    category: 'Interview',
    subcategory: 'Technical',
    difficulty: 'Medium',
    question: 'When asked to design a scalable URL shortener system in a technical interview, what should you do FIRST?',
    options: [
      'Immediately start writing SQL schema code',
      'Clarify functional & non-functional requirements (read/write traffic, latency, expiration)',
      'Draw the database replication diagram',
      'Select Kafka and Redis without knowing user scale'
    ],
    correctIndex: 1,
    explanation: 'System design interviews always start by scoping requirements, traffic estimates, and constraints before architecture choices.'
  },
  {
    id: 'diag-29',
    category: 'Interview',
    subcategory: 'Problem Solving',
    difficulty: 'Medium',
    question: 'If you get stuck on an algorithmic coding interview problem, what is the best strategy?',
    options: [
      'Stay completely silent for 15 minutes hoping inspiration strikes',
      'Give up and ask the interviewer for the solution immediately',
      'Think out loud, state the brute-force approach, identify the bottleneck, and discuss trade-offs with the interviewer',
      'Write random code and hope the test cases pass'
    ],
    correctIndex: 2,
    explanation: 'Interviewers evaluate your thought process. Thinking out loud and establishing a baseline brute-force solution allows the interviewer to guide you towards optimization.'
  },
  {
    id: 'diag-30',
    category: 'Interview',
    subcategory: 'HR',
    difficulty: 'Easy',
    question: 'At the end of an interview when asked "Do you have any questions for us?", what is the best response?',
    options: [
      '"No, I am good, thank you."',
      '"Ask insightful questions about team culture, technical challenges, or engineering best practices at the company."',
      '"How much leave do I get in the first month?"',
      '"When will you promote me?"'
    ],
    correctIndex: 1,
    explanation: 'Thoughtful questions demonstrate genuine curiosity and engagement with the organization engineering culture and mission.'
  }
];
