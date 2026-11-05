// Generated from PrepForge Google Spreadsheet
// Spreadsheet URL: https://docs.google.com/spreadsheets/d/1RdgyhEv2tpYa8AbO2PRvvLzQByoLYGTOmHwMUhZ5azk/edit?usp=sharing

export interface SheetRoadmapTask {
  id: string;
  seq: string;
  track: string;
  phase: string;
  week: string;
  title: string;
  priority: string;
  targetTime: string;
  status: 'Not Started' | 'In Progress' | 'Done';
  resourceLink: string;
  proofOfCompletion: string;
  notes: string;
}

export interface SheetDailyTrackerDay {
  id: string;
  date: string;
  day: string;
  focus: string;
  python: string;
  dsa: string;
  sqlCs: string;
  aiml: string;
  interview: string;
}

export interface SheetPythonPracticeProblem {
  id: string;
  date: string;
  topic: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link: string;
  status: 'Not Started' | 'In Progress' | 'Done';
  ready: string;
}

export interface SheetAIMLTask {
  id: string;
  week: string;
  topic: string;
  theoryDone: boolean;
  codeDone: boolean;
  miniTask: string;
  resourceLink: string;
}

export interface SheetInterviewQuestion {
  id: string;
  area: string;
  question: string;
  bestAnswer: string;
  followUp: string;
  status: 'Not Started' | 'Mastered' | 'Needs Practice';
}

export interface SheetResource {
  id: string;
  category: string;
  name: string;
  whyUse: string;
  link: string;
  priority: string;
  notes: string;
}

export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1RdgyhEv2tpYa8AbO2PRvvLzQByoLYGTOmHwMUhZ5azk/edit?usp=sharing";

export const initialRoadmapTasks: SheetRoadmapTask[] = [
  {
    "id": "rm-1",
    "seq": "1.0",
    "track": "Python",
    "phase": "1.0",
    "week": "1.0",
    "title": "Variables, data types, input/output, operators",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Done",
    "resourceLink": "https://pyschool.ai/",
    "proofOfCompletion": "Write 10 tiny programs",
    "notes": ""
  },
  {
    "id": "rm-2",
    "seq": "2.0",
    "track": "Python",
    "phase": "1.0",
    "week": "1.0",
    "title": "If/elif/else + modulus + comparisons",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/lesson/check-even-or-odd",
    "proofOfCompletion": "Solve 15 conditional problems",
    "notes": ""
  },
  {
    "id": "rm-3",
    "seq": "3.0",
    "track": "Python",
    "phase": "1.0",
    "week": "1.0",
    "title": "Loops: for, while, range, break, continue",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/python-practice",
    "proofOfCompletion": "Solve 15 loop problems",
    "notes": ""
  },
  {
    "id": "rm-4",
    "seq": "4.0",
    "track": "Python",
    "phase": "1.0",
    "week": "1.0",
    "title": "Lists, indexing, slicing, nested lists",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/python-practice",
    "proofOfCompletion": "Solve 15 list problems",
    "notes": ""
  },
  {
    "id": "rm-5",
    "seq": "5.0",
    "track": "Python",
    "phase": "1.0",
    "week": "2.0",
    "title": "Tuples, sets, dictionaries + comprehensions",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/curriculum",
    "proofOfCompletion": "Explain when to use each",
    "notes": ""
  },
  {
    "id": "rm-6",
    "seq": "6.0",
    "track": "Python",
    "phase": "1.0",
    "week": "2.0",
    "title": "Functions, parameters, return, scope, *args/**kwargs",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/python-functions-practice",
    "proofOfCompletion": "Solve 15 function problems",
    "notes": ""
  },
  {
    "id": "rm-7",
    "seq": "7.0",
    "track": "Python",
    "phase": "1.0",
    "week": "2.0",
    "title": "Strings: slicing, methods, frequency, palindrome, anagram",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pyschool.ai/python-practice",
    "proofOfCompletion": "Solve 15 string problems",
    "notes": ""
  },
  {
    "id": "rm-8",
    "seq": "8.0",
    "track": "Python",
    "phase": "1.0",
    "week": "2.0",
    "title": "File handling, exceptions, modules, pip, virtual env",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/",
    "proofOfCompletion": "Build a small file-processing script",
    "notes": ""
  },
  {
    "id": "rm-9",
    "seq": "9.0",
    "track": "Python",
    "phase": "2.0",
    "week": "3.0",
    "title": "OOP: class, object, __init__, inheritance, polymorphism, encapsulation",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/tutorial/classes.html",
    "proofOfCompletion": "Explain + code OOP example",
    "notes": ""
  },
  {
    "id": "rm-10",
    "seq": "10.0",
    "track": "Python",
    "phase": "2.0",
    "week": "3.0",
    "title": "Python internals: mutability, references, shallow/deep copy",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/",
    "proofOfCompletion": "Explain with examples",
    "notes": ""
  },
  {
    "id": "rm-11",
    "seq": "11.0",
    "track": "Python",
    "phase": "2.0",
    "week": "3.0",
    "title": "Lambda, map, filter, reduce, enumerate, zip",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/howto/functional.html",
    "proofOfCompletion": "Solve 10 functional problems",
    "notes": ""
  },
  {
    "id": "rm-12",
    "seq": "12.0",
    "track": "Python",
    "phase": "2.0",
    "week": "3.0",
    "title": "Generators, iterators, decorators, context managers",
    "priority": "High",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/",
    "proofOfCompletion": "Explain + code one example each",
    "notes": ""
  },
  {
    "id": "rm-13",
    "seq": "13.0",
    "track": "Python",
    "phase": "2.0",
    "week": "3.0",
    "title": "GIL, garbage collection, memory management",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://docs.python.org/3/faq/programming.html",
    "proofOfCompletion": "Answer 10 interview questions",
    "notes": ""
  },
  {
    "id": "rm-14",
    "seq": "14.0",
    "track": "Python",
    "phase": "2.0",
    "week": "4.0",
    "title": "NumPy: arrays, shapes, indexing, broadcasting, vectorization",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://numpy.org/doc/stable/user/quickstart.html",
    "proofOfCompletion": "Implement 10 NumPy tasks",
    "notes": ""
  },
  {
    "id": "rm-15",
    "seq": "15.0",
    "track": "Python",
    "phase": "2.0",
    "week": "4.0",
    "title": "Pandas: DataFrame, filtering, groupby, merge, missing data",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
    "proofOfCompletion": "Complete mini data analysis",
    "notes": ""
  },
  {
    "id": "rm-16",
    "seq": "16.0",
    "track": "Python",
    "phase": "2.0",
    "week": "4.0",
    "title": "Matplotlib + data visualization basics",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://matplotlib.org/stable/tutorials/",
    "proofOfCompletion": "Create 5 charts",
    "notes": ""
  },
  {
    "id": "rm-17",
    "seq": "17.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "1.0",
    "title": "Big-O: time and space complexity",
    "priority": "Must",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://www.geeksforgeeks.org/dsa/analysis-of-algorithms-set-1-asymptotic-analysis/",
    "proofOfCompletion": "Calculate complexity of 15 snippets",
    "notes": ""
  },
  {
    "id": "rm-18",
    "seq": "18.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "2.0",
    "title": "Arrays + two pointers + sliding window",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 8 problems",
    "notes": ""
  },
  {
    "id": "rm-19",
    "seq": "19.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "2.0",
    "title": "Strings + hashing/frequency maps",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 8 problems",
    "notes": ""
  },
  {
    "id": "rm-20",
    "seq": "20.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "3.0",
    "title": "Stack + queue + deque",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 8 problems",
    "notes": ""
  },
  {
    "id": "rm-21",
    "seq": "21.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "3.0",
    "title": "Linked list: reverse, cycle, merge",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 6 problems",
    "notes": ""
  },
  {
    "id": "rm-22",
    "seq": "22.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "4.0",
    "title": "Binary search + sorting patterns",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 8 problems",
    "notes": ""
  },
  {
    "id": "rm-23",
    "seq": "23.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "4.0",
    "title": "Trees: traversal, BST, recursion",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 8 problems",
    "notes": ""
  },
  {
    "id": "rm-24",
    "seq": "24.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "5.0",
    "title": "Graphs: BFS, DFS, shortest path basics",
    "priority": "High",
    "targetTime": "120m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 6 problems",
    "notes": ""
  },
  {
    "id": "rm-25",
    "seq": "25.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "5.0",
    "title": "Dynamic programming fundamentals",
    "priority": "High",
    "targetTime": "120m",
    "status": "Not Started",
    "resourceLink": "https://leetcode.com/problemset/",
    "proofOfCompletion": "Solve 5 easy/medium problems",
    "notes": ""
  },
  {
    "id": "rm-26",
    "seq": "26.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "1.0",
    "title": "SQL SELECT, WHERE, ORDER BY, GROUP BY, HAVING",
    "priority": "Must",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://sqlbolt.com/",
    "proofOfCompletion": "Solve 20 SQL queries",
    "notes": ""
  },
  {
    "id": "rm-27",
    "seq": "27.0",
    "track": "DSA/SQL/CS",
    "phase": "1.0",
    "week": "2.0",
    "title": "SQL JOINs, subqueries, CASE, aggregate functions",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://sqlbolt.com/",
    "proofOfCompletion": "Solve 20 SQL queries",
    "notes": ""
  },
  {
    "id": "rm-28",
    "seq": "28.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "3.0",
    "title": "SQL window functions + CTEs + interview queries",
    "priority": "High",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://www.postgresql.org/docs/current/tutorial-window.html",
    "proofOfCompletion": "Solve 15 interview queries",
    "notes": ""
  },
  {
    "id": "rm-29",
    "seq": "29.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "4.0",
    "title": "DBMS: keys, normalization, indexing, transactions, ACID",
    "priority": "Must",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://www.geeksforgeeks.org/dbms/",
    "proofOfCompletion": "Answer 20 questions",
    "notes": ""
  },
  {
    "id": "rm-30",
    "seq": "30.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "5.0",
    "title": "OS basics: process/thread, scheduling, deadlock, memory",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://www.geeksforgeeks.org/operating-systems/",
    "proofOfCompletion": "Answer 15 questions",
    "notes": ""
  },
  {
    "id": "rm-31",
    "seq": "31.0",
    "track": "DSA/SQL/CS",
    "phase": "2.0",
    "week": "5.0",
    "title": "Computer Networks: OSI/TCP-IP, HTTP, DNS, TCP vs UDP",
    "priority": "High",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://www.geeksforgeeks.org/computer-networks/",
    "proofOfCompletion": "Answer 15 questions",
    "notes": ""
  },
  {
    "id": "rm-32",
    "seq": "32.0",
    "track": "AIML",
    "phase": "1.0",
    "week": "1.0",
    "title": "ML workflow: problem framing, train/validation/test, leakage",
    "priority": "Must",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/getting_started.html",
    "proofOfCompletion": "Explain full ML workflow",
    "notes": ""
  },
  {
    "id": "rm-33",
    "seq": "33.0",
    "track": "AIML",
    "phase": "1.0",
    "week": "2.0",
    "title": "Statistics: mean/median/variance/std, probability basics",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://www.khanacademy.org/math/statistics-probability",
    "proofOfCompletion": "Solve 20 questions",
    "notes": ""
  },
  {
    "id": "rm-34",
    "seq": "34.0",
    "track": "AIML",
    "phase": "1.0",
    "week": "2.0",
    "title": "Linear regression + cost function + gradient descent",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/modules/linear_model.html",
    "proofOfCompletion": "Implement from scratch",
    "notes": ""
  },
  {
    "id": "rm-35",
    "seq": "35.0",
    "track": "AIML",
    "phase": "1.0",
    "week": "3.0",
    "title": "Logistic regression + classification metrics",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/modules/linear_model.html",
    "proofOfCompletion": "Explain precision/recall/F1/AUC",
    "notes": ""
  },
  {
    "id": "rm-36",
    "seq": "36.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "3.0",
    "title": "Decision trees + random forest + boosting basics",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/modules/tree.html",
    "proofOfCompletion": "Compare models",
    "notes": ""
  },
  {
    "id": "rm-37",
    "seq": "37.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "4.0",
    "title": "KNN + Naive Bayes + SVM",
    "priority": "High",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/supervised_learning.html",
    "proofOfCompletion": "Explain when to use each",
    "notes": ""
  },
  {
    "id": "rm-38",
    "seq": "38.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "4.0",
    "title": "Unsupervised learning: K-Means + PCA",
    "priority": "High",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/unsupervised_learning.html",
    "proofOfCompletion": "Implement + visualize",
    "notes": ""
  },
  {
    "id": "rm-39",
    "seq": "39.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "5.0",
    "title": "Feature engineering + preprocessing + pipelines",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/modules/compose.html",
    "proofOfCompletion": "Build sklearn pipeline",
    "notes": ""
  },
  {
    "id": "rm-40",
    "seq": "40.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "5.0",
    "title": "Overfitting, underfitting, bias-variance, regularization",
    "priority": "Must",
    "targetTime": "60m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/modules/learning_curve.html",
    "proofOfCompletion": "Explain with example",
    "notes": ""
  },
  {
    "id": "rm-41",
    "seq": "41.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "6.0",
    "title": "Cross-validation + hyperparameter tuning",
    "priority": "Must",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/model_selection.html",
    "proofOfCompletion": "Run GridSearchCV/RandomizedSearchCV",
    "notes": ""
  },
  {
    "id": "rm-42",
    "seq": "42.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "6.0",
    "title": "Deep learning basics: neural networks, activation, backprop",
    "priority": "High",
    "targetTime": "120m",
    "status": "Not Started",
    "resourceLink": "https://pytorch.org/tutorials/",
    "proofOfCompletion": "Build simple classifier",
    "notes": ""
  },
  {
    "id": "rm-43",
    "seq": "43.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "6.0",
    "title": "CNN + NLP/Transformers overview for interview",
    "priority": "High",
    "targetTime": "120m",
    "status": "Not Started",
    "resourceLink": "https://huggingface.co/learn",
    "proofOfCompletion": "Explain architecture at high level",
    "notes": ""
  },
  {
    "id": "rm-44",
    "seq": "44.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "6.0",
    "title": "Model deployment: FastAPI/Flask/Streamlit + Docker basics",
    "priority": "High",
    "targetTime": "90m",
    "status": "Not Started",
    "resourceLink": "https://docs.streamlit.io/",
    "proofOfCompletion": "Deploy one ML model",
    "notes": ""
  },
  {
    "id": "rm-45",
    "seq": "45.0",
    "track": "AIML",
    "phase": "2.0",
    "week": "6.0",
    "title": "Project deep dive: E-Challan fraud detection + system design",
    "priority": "Must",
    "targetTime": "120m",
    "status": "Not Started",
    "resourceLink": "https://scikit-learn.org/stable/",
    "proofOfCompletion": "Prepare 20 project questions",
    "notes": ""
  }
];

export const initialDailyTracker: SheetDailyTrackerDay[] = [
  {
    "id": "day-1",
    "date": "2026-10-07",
    "day": "Wednesday",
    "focus": "Python foundation + Even/Odd",
    "python": "In Progress",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Done",
    "interview": "Not Started"
  },
  {
    "id": "day-2",
    "date": "2026-10-08",
    "day": "Thursday",
    "focus": "Python conditionals + 10 problems",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-3",
    "date": "2026-10-09",
    "day": "Friday",
    "focus": "Loops + 10 problems",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-4",
    "date": "2026-10-10",
    "day": "Saturday",
    "focus": "Lists + indexing",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-5",
    "date": "2026-10-11",
    "day": "Sunday",
    "focus": "Dictionaries + sets",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-6",
    "date": "2026-10-12",
    "day": "Monday",
    "focus": "Functions + return",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-7",
    "date": "2026-10-13",
    "day": "Tuesday",
    "focus": "Strings",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-8",
    "date": "2026-10-14",
    "day": "Wednesday",
    "focus": "Mini Python test",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-9",
    "date": "2026-10-15",
    "day": "Thursday",
    "focus": "OOP basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-10",
    "date": "2026-10-16",
    "day": "Friday",
    "focus": "OOP practice",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-11",
    "date": "2026-10-17",
    "day": "Saturday",
    "focus": "NumPy basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-12",
    "date": "2026-10-18",
    "day": "Sunday",
    "focus": "Pandas basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-13",
    "date": "2026-10-19",
    "day": "Monday",
    "focus": "SQL basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-14",
    "date": "2026-10-20",
    "day": "Tuesday",
    "focus": "SQL joins",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-15",
    "date": "2026-10-21",
    "day": "Wednesday",
    "focus": "Big-O + arrays",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-16",
    "date": "2026-10-22",
    "day": "Thursday",
    "focus": "Two pointers",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-17",
    "date": "2026-10-23",
    "day": "Friday",
    "focus": "Sliding window",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-18",
    "date": "2026-10-24",
    "day": "Saturday",
    "focus": "Stacks + queues",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-19",
    "date": "2026-10-25",
    "day": "Sunday",
    "focus": "Linked lists",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-20",
    "date": "2026-10-26",
    "day": "Monday",
    "focus": "Binary search",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-21",
    "date": "2026-10-27",
    "day": "Tuesday",
    "focus": "Trees",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-22",
    "date": "2026-10-28",
    "day": "Wednesday",
    "focus": "Graphs",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-23",
    "date": "2026-10-29",
    "day": "Thursday",
    "focus": "Statistics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-24",
    "date": "2026-10-30",
    "day": "Friday",
    "focus": "Linear regression",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-25",
    "date": "2026-10-31",
    "day": "Saturday",
    "focus": "Logistic regression",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-26",
    "date": "2026-11-01",
    "day": "Sunday",
    "focus": "Trees/Random Forest",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-27",
    "date": "2026-11-02",
    "day": "Monday",
    "focus": "Feature engineering",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-28",
    "date": "2026-11-03",
    "day": "Tuesday",
    "focus": "Model evaluation",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-29",
    "date": "2026-11-04",
    "day": "Wednesday",
    "focus": "Project deep dive",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-30",
    "date": "2026-11-05",
    "day": "Thursday",
    "focus": "Mock technical",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-31",
    "date": "2026-11-06",
    "day": "Friday",
    "focus": "Python foundation + Even/Odd",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-32",
    "date": "2026-11-07",
    "day": "Saturday",
    "focus": "Python conditionals + 10 problems",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-33",
    "date": "2026-11-08",
    "day": "Sunday",
    "focus": "Loops + 10 problems",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-34",
    "date": "2026-11-09",
    "day": "Monday",
    "focus": "Lists + indexing",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-35",
    "date": "2026-11-10",
    "day": "Tuesday",
    "focus": "Dictionaries + sets",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-36",
    "date": "2026-11-11",
    "day": "Wednesday",
    "focus": "Functions + return",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-37",
    "date": "2026-11-12",
    "day": "Thursday",
    "focus": "Strings",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-38",
    "date": "2026-11-13",
    "day": "Friday",
    "focus": "Mini Python test",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-39",
    "date": "2026-11-14",
    "day": "Saturday",
    "focus": "OOP basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-40",
    "date": "2026-11-15",
    "day": "Sunday",
    "focus": "OOP practice",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-41",
    "date": "2026-11-16",
    "day": "Monday",
    "focus": "NumPy basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  },
  {
    "id": "day-42",
    "date": "2026-11-17",
    "day": "Tuesday",
    "focus": "Pandas basics",
    "python": "Not Started",
    "dsa": "Not Started",
    "sqlCs": "Not Started",
    "aiml": "Not Started",
    "interview": "Not Started"
  }
];

export const initialPythonPractice: SheetPythonPracticeProblem[] = [
  {
    "id": "py-p-1",
    "date": "2026-10-07",
    "topic": "Variables",
    "problem": "Define a Variable",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/curriculum",
    "status": "Done",
    "ready": "No"
  },
  {
    "id": "py-p-2",
    "date": "2026-10-07",
    "topic": "Conditionals",
    "problem": "Check Even or Odd",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/lesson/check-even-or-odd",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-3",
    "date": "2026-10-07",
    "topic": "Conditionals",
    "problem": "Determine Positive, Negative, or Zero",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/curriculum",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-4",
    "date": "2026-10-08",
    "topic": "Conditionals",
    "problem": "Compare Two Numbers",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/curriculum",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-5",
    "date": "2026-10-08",
    "topic": "Conditionals",
    "problem": "Find Maximum of Two",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/lesson/find-maximum-of-two",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-6",
    "date": "2026-10-08",
    "topic": "Conditionals",
    "problem": "Return FizzBuzz Value",
    "difficulty": "Medium",
    "link": "https://pyschool.ai/lesson/return-fizzbuzz-value",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-7",
    "date": "2026-10-09",
    "topic": "Loops",
    "problem": "Print List Items",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-8",
    "date": "2026-10-09",
    "topic": "Loops",
    "problem": "Sum List Numbers",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-9",
    "date": "2026-10-09",
    "topic": "Loops",
    "problem": "Count List Elements",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-10",
    "date": "2026-10-10",
    "topic": "Loops",
    "problem": "Filter Even Numbers",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/lesson/filter-even-numbers",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-11",
    "date": "2026-10-10",
    "topic": "Lists",
    "problem": "Square Each Number",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-12",
    "date": "2026-10-10",
    "topic": "Lists",
    "problem": "Reverse a String with a Loop",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-13",
    "date": "2026-10-11",
    "topic": "Functions",
    "problem": "Add Two Numbers",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-functions-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-14",
    "date": "2026-10-11",
    "topic": "Functions",
    "problem": "Return Greeting",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-functions-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-15",
    "date": "2026-10-11",
    "topic": "Functions",
    "problem": "Maximum of Three",
    "difficulty": "Medium",
    "link": "https://pyschool.ai/python-functions-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-16",
    "date": "2026-10-12",
    "topic": "Strings",
    "problem": "Palindrome",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-17",
    "date": "2026-10-12",
    "topic": "Strings",
    "problem": "Count Vowels",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-18",
    "date": "2026-10-12",
    "topic": "Strings",
    "problem": "Character Frequency",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/python-practice",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-19",
    "date": "2026-10-13",
    "topic": "Collections",
    "problem": "Dictionary frequency counter",
    "difficulty": "Medium",
    "link": "https://pyschool.ai/curriculum",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-20",
    "date": "2026-10-13",
    "topic": "Collections",
    "problem": "Set intersection/union",
    "difficulty": "Easy",
    "link": "https://pyschool.ai/curriculum",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-21",
    "date": "2026-10-14",
    "topic": "OOP",
    "problem": "Class + __init__",
    "difficulty": "Easy",
    "link": "https://docs.python.org/3/tutorial/classes.html",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-22",
    "date": "2026-10-15",
    "topic": "OOP",
    "problem": "Inheritance + polymorphism",
    "difficulty": "Medium",
    "link": "https://docs.python.org/3/tutorial/classes.html",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-23",
    "date": "2026-10-16",
    "topic": "Advanced",
    "problem": "Generator",
    "difficulty": "Medium",
    "link": "https://docs.python.org/3/howto/functional.html",
    "status": "Not Started",
    "ready": "No"
  },
  {
    "id": "py-p-24",
    "date": "2026-10-17",
    "topic": "Advanced",
    "problem": "Decorator",
    "difficulty": "Medium",
    "link": "https://docs.python.org/3/",
    "status": "Not Started",
    "ready": "No"
  }
];

export const initialAIMLTasks: SheetAIMLTask[] = [
  {
    "id": "aiml-1",
    "week": "1.0",
    "topic": "Python for Data Science",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "NumPy + Pandas mini analysis",
    "resourceLink": "https://numpy.org/doc/stable/user/quickstart.html"
  },
  {
    "id": "aiml-2",
    "week": "1.0",
    "topic": "Statistics & Probability",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "20 practice questions",
    "resourceLink": "https://www.khanacademy.org/math/statistics-probability"
  },
  {
    "id": "aiml-3",
    "week": "2.0",
    "topic": "ML workflow + preprocessing",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Train/val/test pipeline",
    "resourceLink": "https://scikit-learn.org/stable/getting_started.html"
  },
  {
    "id": "aiml-4",
    "week": "2.0",
    "topic": "Linear Regression",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Implement from scratch",
    "resourceLink": "https://scikit-learn.org/stable/modules/linear_model.html"
  },
  {
    "id": "aiml-5",
    "week": "3.0",
    "topic": "Logistic Regression",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Confusion matrix + F1",
    "resourceLink": "https://scikit-learn.org/stable/modules/linear_model.html"
  },
  {
    "id": "aiml-6",
    "week": "3.0",
    "topic": "Decision Tree / Random Forest",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Compare models",
    "resourceLink": "https://scikit-learn.org/stable/modules/tree.html"
  },
  {
    "id": "aiml-7",
    "week": "4.0",
    "topic": "KNN / Naive Bayes / SVM",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Choose model by scenario",
    "resourceLink": "https://scikit-learn.org/stable/supervised_learning.html"
  },
  {
    "id": "aiml-8",
    "week": "4.0",
    "topic": "K-Means / PCA",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Cluster + visualize",
    "resourceLink": "https://scikit-learn.org/stable/unsupervised_learning.html"
  },
  {
    "id": "aiml-9",
    "week": "5.0",
    "topic": "Feature Engineering",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Build preprocessing pipeline",
    "resourceLink": "https://scikit-learn.org/stable/modules/compose.html"
  },
  {
    "id": "aiml-10",
    "week": "5.0",
    "topic": "Evaluation / CV / Tuning",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "GridSearchCV",
    "resourceLink": "https://scikit-learn.org/stable/model_selection.html"
  },
  {
    "id": "aiml-11",
    "week": "6.0",
    "topic": "Neural Networks",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Simple classifier",
    "resourceLink": "https://pytorch.org/tutorials/"
  },
  {
    "id": "aiml-12",
    "week": "6.0",
    "topic": "CNN + NLP/Transformers",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Explain architecture",
    "resourceLink": "https://huggingface.co/learn"
  },
  {
    "id": "aiml-13",
    "week": "6.0",
    "topic": "Deployment",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "Deploy ML app",
    "resourceLink": "https://docs.streamlit.io/"
  },
  {
    "id": "aiml-14",
    "week": "6.0",
    "topic": "Project Deep Dive",
    "theoryDone": false,
    "codeDone": false,
    "miniTask": "20 Q&A + architecture",
    "resourceLink": "https://scikit-learn.org/stable/"
  }
];

export const initialInterviewQBank: SheetInterviewQuestion[] = [
  {
    "id": "iq-1",
    "area": "Python",
    "question": "List vs tuple vs set vs dictionary",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-2",
    "area": "Python",
    "question": "Mutable vs immutable objects",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-3",
    "area": "Python",
    "question": "High-yield Python interview concept 3",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-4",
    "area": "Python",
    "question": "Shallow copy vs deep copy",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-5",
    "area": "Python",
    "question": "*args vs **kwargs",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-6",
    "area": "Python",
    "question": "What is a decorator?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-7",
    "area": "Python",
    "question": "What is a generator and yield?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-8",
    "area": "Python",
    "question": "What is GIL?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-9",
    "area": "OOP",
    "question": "Four pillars of OOP",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-10",
    "area": "OOP",
    "question": "Inheritance vs composition",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-11",
    "area": "DSA",
    "question": "Explain Big-O with examples",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-12",
    "area": "DSA",
    "question": "Array vs linked list",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-13",
    "area": "DSA",
    "question": "Stack vs queue",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-14",
    "area": "DSA",
    "question": "Binary search conditions",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-15",
    "area": "DSA",
    "question": "BFS vs DFS",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-16",
    "area": "SQL",
    "question": "WHERE vs HAVING",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-17",
    "area": "SQL",
    "question": "INNER vs LEFT JOIN",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-18",
    "area": "SQL",
    "question": "Primary key vs foreign key",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-19",
    "area": "DBMS",
    "question": "Normalization and normal forms",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-20",
    "area": "DBMS",
    "question": "Indexing and trade-offs",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-21",
    "area": "OS",
    "question": "Process vs thread",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-22",
    "area": "OS",
    "question": "Deadlock conditions",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-23",
    "area": "CN",
    "question": "TCP vs UDP",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-24",
    "area": "CN",
    "question": "HTTP vs HTTPS",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-25",
    "area": "ML",
    "question": "Overfitting vs underfitting",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-26",
    "area": "ML",
    "question": "Bias vs variance",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-27",
    "area": "ML",
    "question": "Precision vs recall",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-28",
    "area": "ML",
    "question": "Cross-validation",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-29",
    "area": "ML",
    "question": "Bagging vs boosting",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-30",
    "area": "ML",
    "question": "Why feature scaling?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-31",
    "area": "ML",
    "question": "When to use logistic regression?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-32",
    "area": "DL",
    "question": "What is backpropagation?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-33",
    "area": "NLP",
    "question": "TF-IDF vs embeddings",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-34",
    "area": "NLP",
    "question": "What is a Transformer?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-35",
    "area": "Project",
    "question": "Explain your E-Challan fraud detection project",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-36",
    "area": "Project",
    "question": "Why multimodal / late fusion?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-37",
    "area": "Project",
    "question": "How did you prevent data leakage?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  },
  {
    "id": "iq-38",
    "area": "Project",
    "question": "What metrics did you use and why?",
    "bestAnswer": "",
    "followUp": "",
    "status": "Not Started"
  }
];

export const initialResources: SheetResource[] = [
  {
    "id": "res-1",
    "category": "Python",
    "name": "PySchool.ai Curriculum",
    "whyUse": "Guided Python practice path",
    "link": "https://pyschool.ai/curriculum",
    "priority": "Must",
    "notes": "Start here"
  },
  {
    "id": "res-2",
    "category": "Python",
    "name": "PySchool Check Even/Odd",
    "whyUse": "First coding lesson",
    "link": "https://pyschool.ai/lesson/check-even-or-odd",
    "priority": "Must",
    "notes": "Day 1"
  },
  {
    "id": "res-3",
    "category": "Python",
    "name": "Python Docs",
    "whyUse": "Official language reference",
    "link": "https://docs.python.org/3/",
    "priority": "Must",
    "notes": "Interview concepts"
  },
  {
    "id": "res-4",
    "category": "DSA",
    "name": "LeetCode",
    "whyUse": "Coding practice + patterns",
    "link": "https://leetcode.com/",
    "priority": "Must",
    "notes": "Easy \u2192 Medium"
  },
  {
    "id": "res-5",
    "category": "DSA",
    "name": "GeeksforGeeks DSA",
    "whyUse": "Concepts + interview questions",
    "link": "https://www.geeksforgeeks.org/dsa/",
    "priority": "High",
    "notes": "Revision"
  },
  {
    "id": "res-6",
    "category": "SQL",
    "name": "SQLBolt",
    "whyUse": "Interactive SQL practice",
    "link": "https://sqlbolt.com/",
    "priority": "Must",
    "notes": "Daily SQL"
  },
  {
    "id": "res-7",
    "category": "AIML",
    "name": "scikit-learn",
    "whyUse": "Core ML implementation + docs",
    "link": "https://scikit-learn.org/stable/",
    "priority": "Must",
    "notes": "Primary ML"
  },
  {
    "id": "res-8",
    "category": "AIML",
    "name": "NumPy",
    "whyUse": "Numerical computing",
    "link": "https://numpy.org/doc/stable/user/quickstart.html",
    "priority": "Must",
    "notes": "Python for ML"
  },
  {
    "id": "res-9",
    "category": "AIML",
    "name": "Pandas",
    "whyUse": "Data manipulation",
    "link": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
    "priority": "Must",
    "notes": "EDA"
  },
  {
    "id": "res-10",
    "category": "AIML",
    "name": "PyTorch Tutorials",
    "whyUse": "Deep learning implementation",
    "link": "https://pytorch.org/tutorials/",
    "priority": "High",
    "notes": "After ML basics"
  },
  {
    "id": "res-11",
    "category": "AIML",
    "name": "Hugging Face Learn",
    "whyUse": "NLP/Transformers",
    "link": "https://huggingface.co/learn",
    "priority": "High",
    "notes": "Interview overview"
  },
  {
    "id": "res-12",
    "category": "Practice",
    "name": "HackerRank",
    "whyUse": "Timed coding + SQL",
    "link": "https://www.hackerrank.com/",
    "priority": "High",
    "notes": "OA simulation"
  },
  {
    "id": "res-13",
    "category": "Practice",
    "name": "Kaggle",
    "whyUse": "Datasets + notebooks + ML practice",
    "link": "https://www.kaggle.com/",
    "priority": "Medium",
    "notes": "Projects"
  }
];
