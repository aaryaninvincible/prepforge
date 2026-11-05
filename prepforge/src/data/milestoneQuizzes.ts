export interface MilestoneQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  bhaiExplanation: string;
  englishExplanation: string;
  topicRef: string;
}

export interface MilestoneQuiz {
  id: string;
  milestoneNumber: number;
  title: string;
  subtitle: string;
  rangeTopics: string;
  badgeAwarded: string;
  totalXp: number;
  timeLimitMinutes: number;
  questions: MilestoneQuestion[];
}

export const MILESTONE_QUIZZES: MilestoneQuiz[] = [
  // -------------------------------------------------------------
  // MILESTONE 1: TOPICS 1-10 (Python Core & Logic)
  // -------------------------------------------------------------
  {
    id: 'milestone-1',
    milestoneNumber: 1,
    title: 'Python Core & Logic Mastery',
    subtitle: 'Evaluate your understanding of Python memory models, dynamic typing, truthiness, loops, and comprehensions.',
    rangeTopics: 'Topics 1 – 10',
    badgeAwarded: 'Python Prodigy 🐍',
    totalXp: 250,
    timeLimitMinutes: 12,
    questions: [
      {
        id: 'm1-q1',
        question: 'What is the exact output of this code snippet in Python?',
        code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
        options: ['3', '4', 'TypeError', 'AttributeError'],
        correctAnswer: 1,
        bhaiExplanation: 'Arre bhai! y = x likhne se naya list nahi banta! Dono ek hi memory dabbe ko point kar rahe hain. Jab y me 4 append kiya toh x me bhi 4 aa gaya, isliye len(x) ab 4 hai!',
        englishExplanation: 'Assignment in Python binds a new reference to the existing object on the heap. Both x and y reference the same mutable list object in memory, so appending via y mutates the underlying list.',
        topicRef: 'Topic 1: Variables & Memory'
      },
      {
        id: 'm1-q2',
        question: 'Which of the following values evaluates to True in Python boolean truthiness?',
        options: ['[] (empty list)', '0.0 (float zero)', 'None', '"0" (string containing zero)'],
        correctAnswer: 3,
        bhaiExplanation: 'Bhai trap question hai! String "0" khali nahi hai, uske andar ek character baitha hai. Python me non-empty string hamesha True hoti hai! Bhale hi usme zero ho ya space!',
        englishExplanation: 'Empty collections, None, and numeric zero evaluate to Falsy. Non-empty sequences, including the string "0", have length > 0 and evaluate to Truthy.',
        topicRef: 'Topic 2: Conditionals & Truthiness'
      },
      {
        id: 'm1-q3',
        question: 'What does the "else" block in a Python for-loop execute?',
        code: `for item in items:
    if condition(item):
        break
else:
    # When does this run?`,
        options: [
            'Every time an iteration completes',
            'Only if the loop terminates normally without encountering a break',
            'Only when the loop encounters an exception',
            'Never; this is invalid syntax in Python'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Sun bhai, for-else ka simple logic hai: "Agar loop me kisi ne break nahi mara aur pura loop shanti se khatam hua, tabhi else chalega!". Break laga toh else skip ho jayega!',
        englishExplanation: 'In Python, a loop else clause executes if and only if the loop reaches completion naturally without being interrupted by a break statement.',
        topicRef: 'Topic 3: Loops & For-Else'
      },
      {
        id: 'm1-q4',
        question: 'Why is set membership check O(1) while list membership check is O(N)?',
        options: [
          'Sets are sorted in ascending binary order',
          'Sets use contiguous memory blocks',
          'Sets use Hash Tables with hash function lookups',
          'Sets are compiled directly into assembly code'
        ],
        correctAnswer: 2,
        bhaiExplanation: 'Bhai set ke peeche Hash Table baitha hota hai. Python element ka hash nikalta hai aur seedha us slot me dekh leta hai bina poori list scan kiye! Isliye O(1) lookup speed!',
        englishExplanation: 'Python sets are implemented using open-addressed hash tables with quadratic probing. The hash of the target item provides immediate amortized O(1) index computation.',
        topicRef: 'Topic 4: Data Structures'
      },
      {
        id: 'm1-q5',
        question: 'What happens when you execute: s = "PrepForge"; s[0] = "p"?',
        options: [
          'String becomes "prepForge"',
          'TypeError: string does not support item assignment',
          'IndexError: assignment out of bounds',
          'A new string object is created automatically'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai Python me string Immutable (pathar ki lakeer) hoti hai! Tu uske andar ka character directly change nahi kar sakta. TypeError phenk ke maarega!',
        englishExplanation: 'Python strings are strictly immutable sequences. In-place item assignment is forbidden and raises a TypeError.',
        topicRef: 'Topic 5: Strings & Slicing'
      },
      {
        id: 'm1-q6',
        question: 'What is the major bug in defining `def add_item(x, target_list=[]):`?',
        options: [
          'Default arguments must be integers',
          'The default empty list is created only once at function definition time and shared across all calls',
          'Empty lists cannot be passed as arguments in Python 3',
          'It throws a SyntaxError on compile'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai ye Python ka classic scam hai! target_list=[] ek hi baar banta hai. Har call me wahi puraani list reuse hogi aur pichla data aane lagega! Hamesha None use karo!',
        englishExplanation: 'Default parameter expressions are evaluated once when the function definition is executed, binding the same mutable object reference across subsequent function invocations.',
        topicRef: 'Topic 6: Functions & Mutable Defaults'
      },
      {
        id: 'm1-q7',
        question: 'What is the output of the following list comprehension?',
        code: `res = [x * 2 for x in range(5) if x % 2 != 0]
print(res)`,
        options: ['[0, 2, 4]', '[2, 6]', '[1, 3]', '[2, 4, 6]'],
        correctAnswer: 1,
        bhaiExplanation: 'Range(5) me se odd numbers hain 1 aur 3. Dono ko 2 se multiply kiya: 1*2=2, 3*2=6. Toh answer bana [2, 6]! Mazedaar!',
        englishExplanation: 'range(5) produces 0, 1, 2, 3, 4. The predicate if x % 2 != 0 selects 1 and 3. The expression x * 2 multiplies them to yield [2, 6].',
        topicRef: 'Topic 7: Comprehensions'
      },
      {
        id: 'm1-q8',
        question: 'Which block in a try-except structure executes ONLY when NO exception occurs?',
        options: ['finally', 'else', 'catch', 'retry'],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai yaad rakhna: "else" tab chalta hai jab koi gadbad nahi hui! "finally" toh chahe kuch bhi ho jaye hamesha chalega hi chalega.',
        englishExplanation: 'The else block in a Python try/except statement executes exclusively if the try suite finishes without raising any exception.',
        topicRef: 'Topic 8: Exception Handling'
      },
      {
        id: 'm1-q9',
        question: 'What method is automatically called when you invoke print(my_object)?',
        options: ['__repr__', '__str__', '__init__', '__call__'],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai jab tu print() karta hai toh Python object ka __str__ dhoondta hai user-friendly output ke liye. Agar __str__ na mile tabhi __repr__ pe jata hai!',
        englishExplanation: 'print() and str() internally invoke the __str__ dunder method on the target object. If __str__ is not defined, it falls back to __repr__.',
        topicRef: 'Topic 9: OOP & Dunder Methods'
      },
      {
        id: 'm1-q10',
        question: 'What is the purpose of the "yield" keyword in Python?',
        options: [
          'Terminates the program immediately',
          'Turns a normal function into a generator that produces values lazily without losing state',
          'Forces garbage collection in RAM',
          'Prevents multi-threading race conditions'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Yield function ko generator bana deta hai! Jab agla value chahiye hota hai tabhi execute hota hai aur state yaad rakhta hai. RAM ki bachat!',
        englishExplanation: 'yield suspends function execution and emits a value to the caller, resuming state on the next __next__() invocation, forming an iterator.',
        topicRef: 'Topic 10: Generators & Yield'
      }
    ]
  },

  // -------------------------------------------------------------
  // MILESTONE 2: TOPICS 11-20 (DSA Core & Algorithms)
  // -------------------------------------------------------------
  {
    id: 'milestone-2',
    milestoneNumber: 2,
    title: 'DSA Core: Complexity & Pointer Patterns',
    subtitle: 'Test your algorithmic chops on Big-O analysis, Two Pointers, Sliding Window, and Hashing.',
    rangeTopics: 'Topics 11 – 20',
    badgeAwarded: 'Algorithm Knight ⚔️',
    totalXp: 300,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'm2-q1',
        question: 'What is the worst-case time complexity of Binary Search on a sorted array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai binary search har step pe array ko aada (half) kar deta hai! N -> N/2 -> N/4... Total steps log2(N) bante hain, isliye O(log N)!',
        englishExplanation: 'Binary search halves the remaining search space at each iteration step, yielding O(log2 N) worst-case time complexity.',
        topicRef: 'Topic 11: Complexity Analysis'
      },
      {
        id: 'm2-q2',
        question: 'In the Two-Pointer technique on a sorted array, why does moving the right pointer to the left decrease the sum?',
        options: [
          'Because arrays in Python are indexed in reverse',
          'Because the array is sorted in ascending order, so earlier elements have smaller values',
          'Because moving pointers allocates extra memory',
          'It does not; it actually increases the sum'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Bhai array sorted hai! Left pe chhote numbers hain, right pe bade numbers. Right ko peeche laoge toh chhota number aayega, isliye sum kam hoga!',
        englishExplanation: 'In a monotonically non-decreasing array, element values decrease as indices decrease. Decrementing the right pointer substitutes a smaller or equal element.',
        topicRef: 'Topic 12: Two Pointers'
      },
      {
        id: 'm2-q3',
        question: 'What data structure is required to solve the "Valid Parentheses" problem in O(N) time and O(N) space?',
        options: ['Queue (FIFO)', 'Stack (LIFO)', 'Binary Heap', 'Disjoint Set (Union-Find)'],
        correctAnswer: 1,
        bhaiExplanation: 'Stack (LIFO) bhai! Jo bracket sabse aakhri me khula, wahi sabse pehle band hona chahiye (Last In First Out)!',
        englishExplanation: 'A Stack strictly enforces Last-In-First-Out ordering, which matches the nested matching criteria of opening and closing brackets.',
        topicRef: 'Topic 13: Stacks & Queues'
      },
      {
        id: 'm2-q4',
        question: 'What is Kadane’s algorithm primarily used for?',
        options: [
          'Finding the shortest path in a graph',
          'Finding the contiguous subarray with the maximum sum in O(N) time',
          'Sorting linked lists in place',
          'Balancing an AVL tree'
        ],
        correctAnswer: 1,
        bhaiExplanation: 'Kadane algorithm contiguous subarray ka maximum sum nikalta hai ek hi loop me O(N) time pe!',
        englishExplanation: 'Kadane algorithm is an optimal dynamic programming approach to find the maximum sum contiguous subarray in linear O(N) time.',
        topicRef: 'Topic 14: Dynamic Programming'
      },
      {
        id: 'm2-q5',
        question: 'Which of the following sorting algorithms has O(N log N) worst-case time complexity AND is stable?',
        options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'],
        correctAnswer: 1,
        bhaiExplanation: 'MergeSort bhai! Divide and conquer karta hai, hamesha O(N log N) chalta hai aur equal elements ka original order preserve rakhta hai (Stable)!',
        englishExplanation: 'MergeSort maintains guaranteed O(N log N) upper bound across best, average, and worst cases, and is stable because equal elements do not cross each other.',
        topicRef: 'Topic 15: Sorting Algorithms'
      }
    ]
  }
];
