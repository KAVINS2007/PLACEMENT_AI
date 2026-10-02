import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- CODING QUESTIONS ---
  {
    id: 'code-1',
    title: 'Two Sum Target Problem',
    type: 'Coding',
    topic: 'DSA - Hash Maps & Arrays',
    difficulty: 'Easy',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    hashmap = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in hashmap:\n            return [hashmap[diff], i]\n        hashmap[num] = i\n    return []`,
    language: 'python',
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' }
    ],
    hints: [
      'A brute force solution takes O(n^2). Can you do it in O(n) using additional space?',
      'Store each visited number and its index in a hash map as you iterate.'
    ],
    solutionExplanation: 'Using a hash map allows us to check for the complement (target - num) in O(1) time. This brings the overall time complexity to O(n) with O(n) space.'
  },
  {
    id: 'code-2',
    title: 'Reverse a Singly Linked List',
    type: 'Coding',
    topic: 'DSA - Linked Lists',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list head.',
    starterCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head: ListNode) -> ListNode:\n    prev = None\n    curr = head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev`,
    language: 'python',
    testCases: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
      { input: 'head = []', output: '[]' }
    ],
    hints: [
      'Maintain three pointers: prev, curr, and next.',
      'Reverse the link curr.next to prev, then shift prev and curr forward.'
    ],
    solutionExplanation: 'Iterative 3-pointer reversal takes O(n) time and O(1) extra memory.'
  },
  {
    id: 'code-3',
    title: 'Longest Substring Without Repeating Characters',
    type: 'Coding',
    topic: 'DSA - Sliding Window',
    difficulty: 'Medium',
    description: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
    starterCode: `def length_of_longest_substring(s: str) -> int:\n    char_map = {}\n    left = 0\n    max_len = 0\n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
    language: 'python',
    testCases: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3' }
    ],
    hints: [
      'Use the sliding window technique with two pointers `left` and `right`.',
      'Track the last seen index of each character to jump the left pointer forward.'
    ],
    solutionExplanation: 'Sliding window with a hash map tracks repeating characters in O(n) time and O(min(m, n)) space.'
  },
  {
    id: 'code-4',
    title: 'Merge K Sorted Lists',
    type: 'Coding',
    topic: 'DSA - Heaps & Priority Queues',
    difficulty: 'Hard',
    description: 'You are given an array of `k` linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    starterCode: `import heapq\n\ndef merge_k_lists(lists):\n    # Priority queue approach\n    min_heap = []\n    for i, l in enumerate(lists):\n        if l: heapq.heappush(min_heap, (l.val, i, l))\n    dummy = ListNode(0)\n    curr = dummy\n    while min_heap:\n        val, i, node = heapq.heappop(min_heap)\n        curr.next = node\n        curr = curr.next\n        if node.next:\n            heapq.heappush(min_heap, (node.next.val, i, node.next))\n    return dummy.next`,
    language: 'python',
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    hints: [
      'Compare the head of all k lists at each step.',
      'A min-heap allows you to find the smallest current node in O(log k) time.'
    ],
    solutionExplanation: 'Inserting node values into a min-heap of size k yields O(N log k) time complexity, where N is the total number of nodes across all lists.'
  },

  // --- APTITUDE QUESTIONS ---
  {
    id: 'apt-1',
    title: 'Pipes and Cisterns Efficiency',
    type: 'Aptitude',
    topic: 'Quantitative Aptitude',
    difficulty: 'Medium',
    description: 'Pipe A can fill a tank in 12 hours, Pipe B in 15 hours, and Pipe C can empty it in 20 hours. If all three pipes are opened simultaneously, in how many hours will the tank be full?',
    options: ['8 hours', '10 hours', '12 hours', '15 hours'],
    correctIndex: 1,
    hints: [
      'Take the LCM of 12, 15, and 20 to find total tank units.',
      'Calculate the net rate per hour: Rate(A) + Rate(B) - Rate(C).'
    ],
    solutionExplanation: 'Total capacity = LCM(12, 15, 20) = 60 units. Efficiency of A = 60/12 = 5 units/hr. B = 60/15 = 4 units/hr. C = -60/20 = -3 units/hr. Net filling rate = 5 + 4 - 3 = 6 units/hr. Time required = 60 / 6 = 10 hours.'
  },
  {
    id: 'apt-2',
    title: 'Seating Arrangement Puzzle',
    type: 'Aptitude',
    topic: 'Logical Reasoning',
    difficulty: 'Medium',
    description: 'Six friends P, Q, R, S, T, and U are sitting in a circle facing the center. P is opposite to S. Q is to the immediate right of P but to the left of T. R is between P and U. Who is sitting to the immediate left of S?',
    options: ['T', 'U', 'Q', 'R'],
    correctIndex: 0,
    hints: ['Draw a circle with 6 slots and place P and S directly opposite each other first.'],
    solutionExplanation: 'Placing P at top (12 o clock), S is at bottom (6 o clock). Q is immediately right of P (2 o clock). T is at 4 o clock. R is between P and U, so R is at 10 o clock and U is at 8 o clock. The person to the immediate left of S (facing center) is T.'
  },
  {
    id: 'apt-3',
    title: 'Sentence Correction & Idiom',
    type: 'Aptitude',
    topic: 'Verbal Ability',
    difficulty: 'Easy',
    description: 'Choose the option that correctly completes the sentence: "Despite having ________ knowledge of cloud deployment, Rahul managed to configure the Kubernetes cluster ________."',
    options: [
      'rudimentary, flawlessly',
      'profound, carelessly',
      'scanty, horribly',
      'immense, poorly'
    ],
    correctIndex: 0,
    hints: ['Notice the contrast indicator "Despite". The first blank needs a limiting word, and the second a positive outcome.'],
    solutionExplanation: '"Despite" sets up a contrast: having basic (rudimentary) knowledge, he still executed it impeccably (flawlessly).'
  },

  // --- TECHNICAL MCQs ---
  {
    id: 'mcq-1',
    title: 'Python Decorators & Closures',
    type: 'Technical MCQ',
    topic: 'Python',
    difficulty: 'Medium',
    description: 'In Python, what is the purpose of `@functools.wraps(func)` inside a custom decorator?',
    options: [
      'It speeds up execution via just-in-time compilation',
      'It preserves the original function name, docstring, and metadata',
      'It restricts the decorated function to run on a single thread',
      'It prevents recursion depth errors'
    ],
    correctIndex: 1,
    hints: ['Consider what happens when you inspect `func.__name__` of a decorated function without wraps.'],
    solutionExplanation: 'Without `@functools.wraps`, the original function metadata (__name__, __doc__) gets overwritten by the wrapper function.'
  },
  {
    id: 'mcq-2',
    title: 'Database Indexing: B-Tree vs Hash Index',
    type: 'Technical MCQ',
    topic: 'DBMS',
    difficulty: 'Medium',
    description: 'Why do relational databases default to B-Tree indexes instead of Hash indexes for indexed columns?',
    options: [
      'Hash indexes require more storage memory than B-Trees',
      'B-Tree indexes efficiently support range queries (<, <=, BETWEEN) and prefix searches',
      'Hash indexes cannot handle string data types',
      'B-Trees guarantee O(1) point lookups'
    ],
    correctIndex: 1,
    hints: ['Hash indexes only support exact equality checks (col = 5). What happens when you do `WHERE age BETWEEN 20 AND 30`?'],
    solutionExplanation: 'Hash indexes only support equality searches (=, !=) via hash code matching. B-Trees maintain sorted order, making range queries, ORDER BY, and prefix scans extremely fast in O(log n).'
  },
  {
    id: 'mcq-3',
    title: 'Operating System: Virtual Memory Page Replacement',
    type: 'Technical MCQ',
    topic: 'OS',
    difficulty: 'Hard',
    description: 'Which page replacement algorithm suffers from Belady Anomaly (where increasing page frames increases page faults)?',
    options: [
      'Least Recently Used (LRU)',
      'First-In, First-Out (FIFO)',
      'Optimal Page Replacement (OPT)',
      'Least Frequently Used (LFU)'
    ],
    correctIndex: 1,
    hints: ['Belady Anomaly occurs only in non-stack based page replacement algorithms.'],
    solutionExplanation: 'FIFO suffers from Belady Anomaly because it is not a stack algorithm. LRU and Optimal algorithms are stack algorithms and never experience Belady Anomaly.'
  },
  {
    id: 'mcq-4',
    title: 'Computer Networks: DNS Resolution Process',
    type: 'Technical MCQ',
    topic: 'Networks',
    difficulty: 'Medium',
    description: 'When resolving a domain name like `api.company.com`, what server is contacted immediately after the Local Recursive Resolver misses the cache?',
    options: [
      'Authoritative Name Server for company.com',
      'Root DNS Name Server (.)',
      'TLD Name Server (.com)',
      'ISP Gateway Router'
    ],
    correctIndex: 1,
    hints: ['DNS hierarchical hierarchy begins at the root.'],
    solutionExplanation: 'The recursive resolver queries the Root DNS Server first, which directs it to the .com TLD server, which in turn directs it to the Authoritative server.'
  },
  {
    id: 'mcq-5',
    title: 'SQL Window Functions',
    type: 'Technical MCQ',
    topic: 'SQL',
    difficulty: 'Medium',
    description: 'What is the key difference between RANK() and DENSE_RANK() in SQL when values tie?',
    options: [
      'RANK() leaves gaps in sequence numbers after ties, while DENSE_RANK() produces contiguous ranks',
      'DENSE_RANK() cannot be used with ORDER BY',
      'RANK() only works on numeric columns',
      'DENSE_RANK() returns strings instead of integers'
    ],
    correctIndex: 0,
    hints: ['If two rows tie for 1st place, what rank will the third row receive?'],
    solutionExplanation: 'For ties (e.g. 1, 1), RANK() skips the next rank to assign 3, whereas DENSE_RANK() assigns 2.'
  }
];
