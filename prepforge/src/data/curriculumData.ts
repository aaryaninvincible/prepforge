export interface CurriculumTopic {
  id: string;
  track: 'Python' | 'DSA' | 'SQL_CS' | 'AIML';
  order: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  tags: string[];
  likes: number;
  english: {
    summary: string;
    explanation: string;
    codeSnippet: string;
    expectedOutput: string;
    commonMistakes: string[];
    keyTakeaways: string[];
  };
  bhaiLanguage: {
    headline: string;
    intuition: string;
    mastAnalogy: string;
    trapAlert: string;
    interviewerHack: string;
    quickBhaiSummary: string;
  };
  practiceQuestion: {
    statement: string;
    hint: string;
    solutionCode: string;
  };
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  // -------------------------------------------------------------
  // TOPIC 1: Variables, Data Types & Operators
  // -------------------------------------------------------------
  {
    id: 'topic-1',
    track: 'Python',
    order: 1,
    title: 'Variables, Data Types & Dynamic Typing',
    difficulty: 'Easy',
    estimatedMinutes: 25,
    tags: ['Python', 'Basics', 'Variables', 'Memory'],
    likes: 342,
    english: {
      summary: `Understanding dynamic typing, reference allocation, primitives vs complex types, and type inference in Python.`,
      explanation: `In Python, variables do not store values directly; they store memory references (pointers) to objects created on the heap. When you write x = 10, Python allocates an integer object 10 and assigns the reference to x. Because Python is dynamically typed, the type is bound to the object, not the variable name.`,
      codeSnippet: `# Variables are references to objects in memory
x = 42          # Integer object created
name = "Prep"   # String object created
rates = [1.2, 3.4] # List object created

print(type(x), id(x))
x = "Now I am a string!" # Variable points to a different object
print(type(x))`,
      expectedOutput: `<class 'int'> 14072384920
<class 'str'>`,
      commonMistakes: [
        'Confusing variable assignment with copying data for mutable objects.',
        'Thinking variables have fixed types like in C++ or Java.'
      ],
      keyTakeaways: [
        'Everything in Python is an object.',
        'Variables are labels/tags attached to memory locations, not fixed buckets.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai, Python me Variable koi dabba nahi, bas ek naam ka sticker hai!',
      intuition: `Dekh bhai, C++ ya Java me agar tu int x bolta hai, toh memory me ek pakka dabba banta hai jisme sirf integer hi jayega. Par Python me scene alag hai! Python me har cheez ek object hai jo heap memory me ghoom rahi hoti hai. Jab tu bolta hai x = 10, toh 10 ban gaya memory me, aur tune uspe bas "x" naam ka sticker chipka diya. Agle second tu x = "Hello" likh dega, toh sticker utha ke "Hello" pe chipak jayega. Python kahega: Bindass chill maar bhai!`,
      mastAnalogy: `Soch tu hostel ke fridge me apna dabba rakhta hai. Tu dabba change karta rehta hai par uspe apna naam ka sticky note chipka deta hai. Fridge ko koi farak nahi padta dabbe me Maggie hai ya Biryani!`,
      trapAlert: `Bhai ye yaad rakhio: a = [1, 2] aur b = a likhega, toh do alag list nahi banti! Dono ek hi dabbe ko point kar rahe hain. Agar b.append(3) kiya, toh a bhi badal jayega aur teko lagega bhoot aa gaya!`,
      interviewerHack: `Jab interviewer puche "Is Python pass-by-value or pass-by-reference?", seedha bolio: "Python uses Pass-by-Object-Reference (or call-by-assignment). Mutables reflect changes, immutables do not."`,
      quickBhaiSummary: `Variable = Sticker. Objects = Asli samaan. Dynamic typing = Kabhi bhi sticker kisi bhi samaan pe chipkao!`
    },
    practiceQuestion: {
      statement: 'Declare a variable age with 21, check its type, reassign it to "Twenty One" and verify how type() changed.',
      hint: 'Use type(var) to print the dynamic class.',
      solutionCode: `age = 21
print("Before:", type(age))
age = "Twenty One"
print("After:", type(age))`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 2: Conditionals & Truthy/Falsy Values
  // -------------------------------------------------------------
  {
    id: 'topic-2',
    track: 'Python',
    order: 2,
    title: 'Conditionals, Boolean Logic & Truthiness',
    difficulty: 'Easy',
    estimatedMinutes: 20,
    tags: ['Python', 'Conditionals', 'Logic'],
    likes: 289,
    english: {
      summary: `Branching execution flow with if, elif, else, and understanding Python Truthy and Falsy evaluations.`,
      explanation: `Conditionals control which blocks of code execute based on boolean expressions. In Python, non-boolean values have inherent truthiness. Empty collections ([], {}, set(), ""), numeric zero (0, 0.0), None, and False evaluate to Falsy. Everything else evaluates to Truthy.`,
      codeSnippet: `user_cart = []

if not user_cart:
    print("Cart is empty! Show promotional banner.")
else:
    print(f"Checkout {len(user_cart)} items.")`,
      expectedOutput: `Cart is empty! Show promotional banner.`,
      commonMistakes: [
        'Writing "if len(cart) == 0" instead of the idiomatic Pythonic "if not cart:".',
        'Confusing "is" (identity check) with "==" (equality check).'
      ],
      keyTakeaways: [
        'Use truthiness directly for clean, Pythonic code.',
        'Short-circuit evaluation: in (A or B), if A is True, B is never evaluated.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai, if-else me faltu ke == True mat likha kar, Python smart hai!',
      intuition: `Sun bhai, agar teko check karna hai ki list khali hai ya nahi, toh C++ waalo ki tarah if len(arr) == 0 likhne ki koi zaroorat nahi hai. Python me agar list khali hai ([]), toh wo apne aap jhoothi (Falsy) maani jaati hai! Agar usme ek bhi element hai, toh wo sachhi (Truthy) hai. Bas seedha likh if arr: ya if not arr:. Code ekdum sexy lagega!`,
      mastAnalogy: `Jese jeb me agar ek bhi rupiya nahi hai (0), toh tu garib hai. Agar jeb me ek 10 ka sikka bhi hai, toh tu party de sakta hai. Python bhi zero aur empty ko garib (False) manta hai!`,
      trapAlert: `Bhai, if x == True aur if x is True me zameen aasmaan ka farak hai! 1 == True sach hai, par 1 is True jhooth hai kyunki 1 aur True alag memory objects hain!`,
      interviewerHack: `Batao unko: "Python performs short-circuit evaluation in logical AND/OR operations, saving compute time when earlier conditions satisfy the predicate."`,
      quickBhaiSummary: `Khali list, 0, None, empty string = False. Baaki sab = True. Short-circuiting se code fast banta hai!`
    },
    practiceQuestion: {
      statement: 'Write a condition that checks if a string is non-empty and starts with "A" using short-circuit logic.',
      hint: 'Use: if text and text[0] == "A":',
      solutionCode: `text = "Apple"
if text and text[0] == 'A':
    print("Starts with A and safe from IndexError!")`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 3: Loops, Iterators & Range
  // -------------------------------------------------------------
  {
    id: 'topic-3',
    track: 'Python',
    order: 3,
    title: 'Loops: for, while, range, break, continue & else',
    difficulty: 'Easy',
    estimatedMinutes: 30,
    tags: ['Python', 'Loops', 'Iteration'],
    likes: 310,
    english: {
      summary: `Mastering iteration mechanics in Python, including enumerate, zip, and the rarely known for-else construct.`,
      explanation: `Python for-loops are actually "for-each" iterators consuming the iterator protocol (__iter__ and __next__). range(start, stop, step) generates numbers on demand without allocating an in-memory list (O(1) memory). Python also features a unique "for-else" loop where the else block executes ONLY if the loop completes without hitting a "break" statement.`,
      codeSnippet: `# Python for-else idiom for search
target = 7
numbers = [2, 4, 6, 8, 10]

for num in numbers:
    if num == target:
        print("Found target!")
        break
else:
    print("Target not found! (Else runs because break didn't trigger)")`,
      expectedOutput: `Target not found! (Else runs because break didn't trigger)`,
      commonMistakes: [
        'Using "for i in range(len(arr))" when you can iterate directly or use "enumerate(arr)".',
        'Modifying a list while looping over it (causes skipped elements).'
      ],
      keyTakeaways: [
        'Prefer "enumerate()" whenever you need both index and element.',
        'Use "for-else" to eliminate unnecessary boolean flag variables.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai for loop me index ke liye range(len(arr)) likhna band kar, enumerate seekh!',
      intuition: `Bhai college me sab sikhate hain: for i in range(len(arr)): print(arr[i]). Bhai ye dekh ke senior engineer sar pakad lega! Python ne hume pyara sa enumerate() diya hai. Tu seedha likh: for idx, val in enumerate(arr):. Index bhi mil gaya, value bhi mil gayi, bina kisi jhanjhat ke!`,
      mastAnalogy: `Soch tu class me attendance le raha hai. Ek tareeka hai roll number dekh fir student ka chehra dhoond. Dusra smart tareeka: student saamne khada hai, wo bolta hai "Roll no 5: Rahul present sir". Enumerate wahi smart attendance hai!`,
      trapAlert: `Loop ke andar chalte-chalte list me se pop ya remove mat kar dena bhai! Index aage nikal jayega aur elements skip ho jayenge!`,
      interviewerHack: `Interviewer ko for-else bata kar impress kar: "In Python, loop else executes when no break occurs, effectively replacing the classic found = False flag pattern."`,
      quickBhaiSummary: `Index chahiye toh enumerate() use kar. Do list sath me chalani ho toh zip() use kar. Simple!`
    },
    practiceQuestion: {
      statement: 'Use enumerate() to print index and values of ["apple", "banana", "cherry"] starting index at 1.',
      hint: 'enumerate(items, start=1)',
      solutionCode: `fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 4: Lists, Tuples, Sets & Dictionaries
  // -------------------------------------------------------------
  {
    id: 'topic-4',
    track: 'Python',
    order: 4,
    title: 'Data Structures: List vs Tuple vs Set vs Dict',
    difficulty: 'Medium',
    estimatedMinutes: 35,
    tags: ['Python', 'Data Structures', 'Performance', 'Big-O'],
    likes: 420,
    english: {
      summary: `Deep comparison of the 4 built-in collections, time complexities, hashing mechanisms, and memory footprints.`,
      explanation: `Lists are dynamic arrays (contiguous memory pointers, O(1) amortized append, O(n) search/insert). Tuples are immutable arrays with fixed memory allocation. Sets and Dictionaries are implemented via Hash Tables (O(1) average lookup, insert, and delete). Keys in dictionaries and elements in sets MUST be hashable (immutable objects implementing __hash__).`,
      codeSnippet: `# Lookup comparison
data_list = [i for i in range(1000000)]
data_set = set(data_list)

# "in" on list is O(N) linear scan
# "in" on set is O(1) hash table lookup
print("999999 in data_set:", 999999 in data_set)`,
      expectedOutput: `999999 in data_set: True`,
      commonMistakes: [
        'Using a list for checking existence of elements instead of a set (causing TLE O(N) instead of O(1)).',
        'Trying to use a list as a dictionary key (Unhashable type error).'
      ],
      keyTakeaways: [
        'List: Ordered, mutable, allows duplicates. O(N) search.',
        'Tuple: Ordered, immutable, lightweight, hashable if items are hashable.',
        'Set: Unordered, unique, O(1) search/insert via hashing.',
        'Dict: Key-Value pairs, fast O(1) lookup by key.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai interview me 100% puhenge: List vs Tuple vs Set vs Dict kab kya use karega?',
      intuition: `Sun mere bhai, simple fundaa hai:,
1. **List**: Ye tera school bag hai. Kuch bhi daal, order me rahega, duplicate bhi chalega, jab marzi naya samaan daal le.
2. **Tuple**: Ye sealed gift box hai. Ek baar pack ho gaya toh tu usme se kuch nikal ya daal nahi sakta. Isliye ye fast aur memory-friendly hai.
3. **Set**: Ye VIP entry gate hai. Ek naam ka ek hi banda aayega, duplicates bouncers phenk denge! Aur search karna itna fast hai (O(1)) ki pucho mat.
4. **Dict**: Ye contact book hai. Naam dhoondo, number turant mil jayega! O(1) speed!`,
      mastAnalogy: `Tu grocery store gaya:
- List: Saamaan ki normal list jisme duplicate chips bhi hain.
- Tuple: Aadhaar card pe print hui details (change nahi kar sakte).
- Set: Aadhaar biometric database (har insaan unique).
- Dict: Phone directory!`,
      trapAlert: `Bhai agar kisi LeetCode question me bar-bar 'if x in collection' check kar raha hai, aur tu List use kar raha hai toh tera TLE (Time Limit Exceeded) aana pakka hai! Foran 'set(collection)' bana le!`,
      interviewerHack: `Bhai bolna: "Sets and Dict keys rely on Pythons open-addressing hash table with quadratic probing. That is why amortized search is O(1)." Interviewer wahi flat!`,
      quickBhaiSummary: `Search fast chahiye? Set/Dict lagao. Constant data hai? Tuple lagao. Order aur duplicates chahiye? List lagao.`
    },
    practiceQuestion: {
      statement: 'Given a list with duplicates [1, 2, 2, 3, 4, 4, 5], remove duplicates while preserving O(1) membership check.',
      hint: 'Convert to set: set(arr)',
      solutionCode: `raw = [1, 2, 2, 3, 4, 4, 5]
unique_set = set(raw)
print("Unique:", unique_set)
print("Is 3 present?", 3 in unique_set)`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 5: Strings & String Manipulation
  // -------------------------------------------------------------
  {
    id: 'topic-5',
    track: 'Python',
    order: 5,
    title: 'Strings, Slicing & Efficient String Algorithms',
    difficulty: 'Easy',
    estimatedMinutes: 25,
    tags: ['Python', 'Strings', 'Slicing', 'Two Pointers'],
    likes: 367,
    english: {
      summary: `String immutability, slice notation [start:stop:step], join vs concatenation, and common algorithmic patterns.`,
      explanation: `Strings in Python are immutable sequences of Unicode code points. Modifying a string creates a new string object in memory. Repeatedly concatenating strings with "+" in a loop produces O(N^2) time complexity due to repeated memory allocations; use "".join(list_of_strings) for O(N) linear time.`,
      codeSnippet: `s = "PrepForge"

# Slicing syntax: [start:stop:step]
print("Reverse:", s[::-1])
print("Every 2nd char:", s[::2])

# Efficient concatenation
parts = ["Code", "Build", "Deploy"]
result = " -> ".join(parts)
print(result)`,
      expectedOutput: `Reverse: egroFperP
Every 2nd char: PeFre
Code -> Build -> Deploy`,
      commonMistakes: [
        'Attempting in-place modification like s[0] = "p" (TypeError: string does not support item assignment).',
        'Using "+=" inside a loop of 10,000 strings instead of list append and join.'
      ],
      keyTakeaways: [
        's[::-1] reverses a string in C-level speed.',
        'Always accumulate strings in a list and use "".join() at the end.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai, string ko loop me "+" se jodna band kar, string immutable hoti hai!',
      intuition: `Dekh bhai, Python me string pathar ki lakeer hai (Immutable). Ek baar ban gayi toh uske kisi character ko tu s[0] = "X" karke badal nahi sakta. Aur agar tu loop me 1000 baar s = s + "a" karega, toh Python har baar naya string object banayega aur purana kooda karega. Tera program slow ho jayega! Isliye hamesha list me append kar, aur aakhri me "".join(arr) maar!`,
      mastAnalogy: `Tu ek paper pe pen se likh chuka hai. Ab agar teko ek shabd badalna hai, tu pura paper phad ke naye paper pe likh raha hai! List is pencil, string is permanent marker.`,
      trapAlert: `Reverse karne ke liye 10 line ka for loop mat likhne baith jana interview me, Python me seedha s[::-1] likhte hain! Par interviewer ko logic samjhana ki ye step = -1 karta hai.`,
      interviewerHack: `Batao: "String join operates in O(N) by pre-calculating total buffer length in advance, whereas repeated concatenation runs in quadratic O(N^2) time."`,
      quickBhaiSummary: `String badal nahi sakti. Jodna ho toh join() use kar. Ulta karna ho toh [::-1] use kar.`
    },
    practiceQuestion: {
      statement: 'Check if a string is a palindrome ignoring cases and non-alphanumeric characters.',
      hint: 'clean = [c.lower() for c in s if c.isalnum()]; clean == clean[::-1]',
      solutionCode: `def is_palindrome(s: str) -> bool:
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]

print(is_palindrome("A man, a plan, a canal: Panama")) # True`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 6: Functions, Scope & *args/**kwargs
  // -------------------------------------------------------------
  {
    id: 'topic-6',
    track: 'Python',
    order: 6,
    title: 'Functions, Variable Scope, LEGB Rule & *args/**kwargs',
    difficulty: 'Medium',
    estimatedMinutes: 30,
    tags: ['Python', 'Functions', 'Scope', 'LEGB'],
    likes: 380,
    english: {
      summary: `First-class functions, higher-order functions, LEGB resolution rule, and variable-length arguments.`,
      explanation: `Python resolves variables using the LEGB rule: Local -> Enclosing -> Global -> Built-in. Functions are first-class citizens: they can be passed as arguments, assigned to variables, and returned from other functions. *args captures positional arguments as a tuple, while **kwargs captures keyword arguments as a dictionary.`,
      codeSnippet: `def flexible_calculator(operation, *args, **kwargs):
    print(f"Executing: {operation} on values: {args}")
    if operation == "sum":
        res = sum(args)
    if kwargs.get("round_result"):
        res = round(res, kwargs["round_result"])
    return res

print(flexible_calculator("sum", 1.256, 2.344, round_result=1))`,
      expectedOutput: `Executing: sum on values: (1.256, 2.344)
3.6`,
      commonMistakes: [
        'Using a mutable default argument like def append_item(x, lst=[]) (causes cross-call contamination!).',
        'Not understanding global vs nonlocal keyword behavior in nested functions.'
      ],
      keyTakeaways: [
        'Never use mutable default arguments (use None and check inside).',
        'LEGB: Local, Enclosing, Global, Built-in scope lookup.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai ye galti mat karna: def fun(a, lst=[]). Ye Python ka sabse bada scam hai!',
      intuition: `Bhai sun, jab tu function define karta hai aur usme default value list ya dict de deta hai (lst=[]), toh Python us default list ko ek hi baar banata hai function load hone pe! Ab agar tu 5 alag-alag baar function call karega, toh sab ek hi list me data ghused rahe honge! Hamesha default value 'None' rakh, aur function ke andar 'if lst is None: lst = []' kar!`,
      mastAnalogy: `Soch ek public toilet hai jisme pichle bande ka saman reh gaya aur tu agla banda aane pe uske bag me pichle bande ka saman daal raha hai! Nasty bug bhai!`,
      trapAlert: `*args tuple banta hai aur **kwargs dict banta hai. *args me tu kitne bhi aam arguments bhej sakta hai, **kwargs me key=value wale bhej sakta hai.`,
      interviewerHack: `Bolo: "Python binds default argument expressions at function definition time, not execution time. That is why mutable defaults persist state across function invocations."`,
      quickBhaiSummary: `Default argument me kabhi list ya dict mat daalo. Scope check: Pehle Local dhoondega, fir Enclosing, fir Global, fir Built-in (LEGB)!`
    },
    practiceQuestion: {
      statement: 'Fix this bug: def add_log(msg, log_list=[]): log_list.append(msg); return log_list',
      hint: 'Set log_list=None and initialize inside.',
      solutionCode: `def add_log(msg, log_list=None):
    if log_list is None:
        log_list = []
    log_list.append(msg)
    return log_list

print(add_log("First"))
print(add_log("Second")) # Isolated fresh list!`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 7: Comprehensions & Functional Patterns
  // -------------------------------------------------------------
  {
    id: 'topic-7',
    track: 'Python',
    order: 7,
    title: 'List, Dict & Set Comprehensions + Generators',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    tags: ['Python', 'Comprehensions', 'Generators', 'Memory'],
    likes: 395,
    english: {
      summary: `Writing concise, readable, and highly optimized inline collection transformations, plus generator expressions for lazy evaluation.`,
      explanation: `Comprehensions provide a concise syntax to create collections. Because comprehensions execute at C-level bytecode speeds using LIST_APPEND instead of python-level attribute lookups (.append), they are significantly faster than traditional for-loops. Generator expressions (x for x in data) compute items lazily, saving huge memory.`,
      codeSnippet: `# List comprehension with condition
squares = [x**2 for x in range(10) if x % 2 == 0]
print("Squares of evens:", squares)

# Dict comprehension: Inverting a map
char_map = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in char_map.items()}
print("Inverted:", inverted)`,
      expectedOutput: `Squares of evens: [0, 4, 16, 36, 64]
Inverted: {1: 'a', 2: 'b', 3: 'c'}`,
      commonMistakes: [
        'Writing over-complicated nested comprehensions that sacrifice code readability.',
        'Creating a 10-million element list comprehension instead of using a memory-efficient generator.'
      ],
      keyTakeaways: [
        'Comprehensions are faster than manual for-loop .append() calls.',
        'Use (x for x in ...) when processing large streams to avoid OOM (Out Of Memory).'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai 5 line ka loop 1 line me likh, comprehension dekh ke mazaa aa jayega!',
      intuition: `Dekh bhai, normal log kya karte hain: ek khali list banayi, for loop chalaya, if condition lagai, fir append kiya. 5 line barbad! Pythonic banda seedha ek line me likhta hai: [x*2 for x in arr if x > 0]. Padhne me bhi mast, chalne me bhi C-language speed pe! Bas itna dhyaan rakhna ki itna lamba mat likh dena ki 2 din baad khud hi na padh pao!`,
      mastAnalogy: `Manual loop is jese tu market jaake ek-ek tamatar alag thaili me la raha hai. Comprehension is automatic juice machine: ek taraf se fruits daale, dusri taraf se ready juice nikal aaya!`,
      trapAlert: `Agar 1 Crore numbers process karne hain, toh brackets [] mat lagana, parenthesis () lagana! () lagane se Generator ban jata hai jo ek baar me 1 number banata hai, RAM bach jaati hai!`,
      interviewerHack: `Batao: "List comprehensions leverage bytecode specialization (BUILD_LIST & LIST_APPEND instructions), yielding roughly 20-30% faster execution than manual append loops."`,
      quickBhaiSummary: `Chhote transformations ke liye comprehension use karo. Bahut bada data hai toh generator () use karo!`
    },
    practiceQuestion: {
      statement: 'Create a dictionary mapping numbers 1 to 5 to their cubes, but only for odd numbers.',
      hint: '{x: x**3 for x in range(1, 6) if x % 2 != 0}',
      solutionCode: `cubes_of_odds = {x: x**3 for x in range(1, 6) if x % 2 != 0}
print(cubes_of_odds) # {1: 1, 3: 27, 5: 125}`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 8: Exception Handling & Resource Management
  // -------------------------------------------------------------
  {
    id: 'topic-8',
    track: 'Python',
    order: 8,
    title: 'Exception Handling, Custom Exceptions & "with" Context Managers',
    difficulty: 'Medium',
    estimatedMinutes: 30,
    tags: ['Python', 'Exceptions', 'Context Managers', 'Clean Code'],
    likes: 312,
    english: {
      summary: `Graceful error handling, try-except-else-finally, custom exception hierarchies, and RAII via context managers.`,
      explanation: `Python uses exceptions for flow control under the EAFP philosophy ("Easier to Ask for Forgiveness than Permission"). The "else" block in try-except executes when no exception was raised. The "finally" block always executes (ideal for resource cleanup). The "with" statement guarantees __enter__ and __exit__ execution, preventing file descriptor leaks.`,
      codeSnippet: `def parse_int_safely(val):
    try:
        res = int(val)
    except ValueError as e:
        print(f"Error parsing '{val}': {e}")
        return None
    else:
        print("Parsing successful!")
        return res
    finally:
        print("Cleanup check done.")

print(parse_int_safely("42"))
print(parse_int_safely("abc"))`,
      expectedOutput: `Parsing successful!
Cleanup check done.
42
Error parsing 'abc': invalid literal for int() with base 10: 'abc'
Cleanup check done.
None`,
      commonMistakes: [
        'Catching bare "except:" without specifying the exception class (silences KeyboardInterrupt and SystemExit).',
        'Not using "with open(...)" which can leave files open if exceptions happen mid-execution.'
      ],
      keyTakeaways: [
        'Always specify explicit exception classes: except (ValueError, KeyError):.',
        'Use "with" statement for automatic file closing and lock releasing.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai, "except:" khali mat chhod dena kabhi, sabse bada crime hai ye!',
      intuition: `Sun mere bhai, agar tu sirf 'except:' likh dega, toh agar code me koi syntax error, memory error, ya user ne Ctrl+C daba kar band karna chaha, toh wo bhi dab jayega aur teko pata hi nahi chalega ki code kyu pagal ho raha hai! Hamesha batao ki kis cheez ka darr hai: 'except ValueError:' ya 'except KeyError:'. Aur file kholne ke liye hamesha 'with open(...) as f:' use kar, khud band ho jayegi bina bole!`,
      mastAnalogy: `Tu ghar se bahar jaate waqt light band karna bhool jata hai. 'with' statement wo smart sensor hai jo tera kamre se nikalte hi automatically batti gul kar deta hai!`,
      trapAlert: `try-except-else me "else" ka matlab hota hai: "Bhai agar koi lafda nahi hua, tab ye code chalao!" Ye code readability badhata hai.`,
      interviewerHack: `Batao: "Python follows the EAFP principle (Easier to Ask for Forgiveness than Permission), which avoids race conditions compared to LBYL (Look Before You Leap)."`,
      quickBhaiSummary: `Specific exception pakdo. File/Network ke liye "with" use karo taaki resources leak na hon!`
    },
    practiceQuestion: {
      statement: 'Write a function that divides two numbers safely handling ZeroDivisionError and TypeError.',
      hint: 'Use except (ZeroDivisionError, TypeError) as err',
      solutionCode: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero bhai!"
    except TypeError:
        return "Dono numbers hone chahiye bhai!"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 9: Object-Oriented Programming (OOP)
  // -------------------------------------------------------------
  {
    id: 'topic-9',
    track: 'Python',
    order: 9,
    title: 'Object-Oriented Programming: 4 Pillars, Dunder Methods & Inheritance',
    difficulty: 'Medium',
    estimatedMinutes: 40,
    tags: ['Python', 'OOP', 'Classes', 'Polymorphism', 'Dunder'],
    likes: 478,
    english: {
      summary: `Mastering Classes, Encapsulation, Abstraction, Inheritance, Polymorphism, and Magic/Dunder methods (__str__, __repr__, __eq__).`,
      explanation: `OOP organizes code into reusable blueprints (classes) representing state and behavior. Python provides single and multiple inheritance using the C3 Linearization (MRO) algorithm. Dunder (double underscore) methods allow operator overloading and integration with built-in functions like len(), print(), and str().`,
      codeSnippet: `class Developer:
    def __init__(self, name: str, xp: int):
        self.name = name
        self.xp = xp

    def __str__(self):
        return f"Developer({self.name}, XP: {self.xp})"

    def __add__(self, other):
        # Operator overloading for "+"
        return Developer(f"{self.name} & {other.name}", self.xp + other.xp)

dev1 = Developer("Bhai", 100)
dev2 = Developer("Coder", 150)
team = dev1 + dev2
print(team)`,
      expectedOutput: `Developer(Bhai & Coder, XP: 250)`,
      commonMistakes: [
        'Confusing __str__ (user-friendly) with __repr__ (unambiguous developer representation).',
        'Not calling super().__init__() in derived class constructors.'
      ],
      keyTakeaways: [
        '4 Pillars: Encapsulation (hiding internals), Abstraction (interfaces), Inheritance (code reuse), Polymorphism (common interface).',
        'Check Method Resolution Order with ClassName.mro().'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai OOP ke 4 pillars ko rattna band kar, aasan bhasha me samajh!',
      intuition: `Sun bhai, OOP bas real-world cheezon ko code me model karna hai:
1. **Class & Object**: Class hai blueprint (jaise ghar ka naksha), Object hai asli ghar!
2. **Encapsulation**: Private cheezein chhupana (jaise car ka engine bonnet ke andar rehta hai).
3. **Abstraction**: Simple interface dena (tu bas accelerator dabata hai, engine me petrol kaise jal raha hai teko dekhne ki zaroorat nahi).
4. **Inheritance**: Baap ki sampatti bete ko milna (Parent class ke features Child class me aana).
5. **Polymorphism**: Ek hi cheez alag-alag roop lena (jaise "+" sign numbers ko jodta hai par strings ko chipkata hai)!`,
      mastAnalogy: `Tu WhatsApp use karta hai:
- Abstraction: Send button dabaya, message chala gaya (andar packet kaise transmit hua teko tension nahi).
- Polymorphism: Send button text bhi bhejta hai, image bhi bhejta hai, audio bhi bhejta hai!`,
      trapAlert: `Dunder methods (__init__, __str__, __len__) Python ke superpowers hain! Agar class me __len__ define kar dega toh len(tera_object) chalne lagega!`,
      interviewerHack: `Bhai MRO (Method Resolution Order) zaroor bolna: "Python resolves multiple inheritance using the C3 Linearization algorithm to prevent the Diamond Problem."`,
      quickBhaiSummary: `Naksha = Class. Asli cheez = Object. super().__init__() lagana mat bhoolna!`
    },
    practiceQuestion: {
      statement: 'Create a BankAccount class with deposit and get_balance methods that prevents negative balance deposits.',
      hint: 'Raise ValueError if amount <= 0',
      solutionCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount positive hona chahiye bhai!")
        self._balance += amount

    def get_balance(self):
        return self._balance

acc = BankAccount("Aaryan", 500)
acc.deposit(200)
print("Balance:", acc.get_balance())`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 10: Milestones & Python Interview Patterns
  // -------------------------------------------------------------
  {
    id: 'topic-10',
    track: 'Python',
    order: 10,
    title: 'Decorators, Generators & Advanced Python Internals',
    difficulty: 'Hard',
    estimatedMinutes: 45,
    tags: ['Python', 'Decorators', 'Generators', 'Yield', 'Advanced'],
    likes: 512,
    english: {
      summary: `Closure mechanics, writing custom decorators with functools.wraps, generator functions with yield, and GIL impact.`,
      explanation: `A decorator is a callable that takes another function as an argument, extends its behavior without modifying it, and returns the modified function. Generators maintain internal state between calls using the "yield" statement, implementing memory-efficient lazy streams. The Global Interpreter Lock (GIL) ensures thread safety in CPython by allowing only one native thread to execute bytecode at a time.`,
      codeSnippet: `import time
from functools import wraps

def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        res = func(*args, **kwargs)
        t1 = time.perf_counter()
        print(f"[{func.__name__}] took {(t1 - t0)*1000:.3f} ms")
        return res
    return wrapper

@time_it
def compute_heavy_sum(n):
    return sum(i * i for i in range(n))

print("Result:", compute_heavy_sum(500000))`,
      expectedOutput: `[compute_heavy_sum] took 32.124 ms
Result: 41666541666250000`,
      commonMistakes: [
        'Forgetting @functools.wraps(func) inside decorator wrappers (erases the original function name and docstrings).',
        'Thinking multi-threading speeds up CPU-bound tasks in Python (GIL prevents parallel CPU bytecode execution).'
      ],
      keyTakeaways: [
        'Use decorators for cross-cutting concerns: logging, timing, authentication, caching.',
        'Use generators to process gigabytes of log files without running out of RAM.',
        'For CPU parallelism, use multiprocessing instead of threading to bypass the GIL.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai ye topic samajh liya toh interview me selection 90% pakka!',
      intuition: `Bhai Decorator kya hai? Ek function jo dusre function pe "jacket" pehna deta hai! Bina original function ka code chhede, uske aage aur peeche kuch bhi kaam kara sakta hai (jaise timer lagana ya check karna ki user login hai ya nahi).
Aur Generator kya hai? Ye "yield" keyword use karta hai. Ek baar me pura kooda memory me load karne ke bajaye, ek-ek piece data deta hai jab zaroorat ho!`,
      mastAnalogy: `Decorator is like phone ka back cover! Phone wahi hai, par cover lagane se protection mil gayi.
Generator is like water tap: jitna paani chahiye utna nal kholo, baalti bhar ke sar pe rakhne ki zaroorat nahi!`,
      trapAlert: `Bhai GIL (Global Interpreter Lock) interview me pakka puhenge! Bolna ki CPython me ek time pe ek hi CPU core Python code chala sakta hai memory safety ke liye. Isliye CPU heavy kaam ke liye Multiprocessing use karte hain, threading nahi!`,
      interviewerHack: `Batao: "Decorators preserve metadata through @functools.wraps. For CPU-bound tasks in Python, multiprocessing bypasses GIL, while threading is suitable for I/O bound tasks."`,
      quickBhaiSummary: `Decorator = Function wrapper. Yield = Lazy generator (RAM saver). GIL = One thread at a time for CPU in CPython.`
    },
    practiceQuestion: {
      statement: 'Write an infinite Fibonacci generator using yield and print the first 5 numbers.',
      hint: 'while True: yield a; a, b = b, a + b',
      solutionCode: `def fib_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fib_gen()
for _ in range(5):
    print(next(gen), end=" ") # 0 1 1 2 3`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 11: DSA: Time & Space Complexity (Big-O)
  // -------------------------------------------------------------
  {
    id: 'topic-11',
    track: 'DSA',
    order: 11,
    title: 'Time & Space Complexity: Big-O, Big-Omega & Big-Theta',
    difficulty: 'Easy',
    estimatedMinutes: 30,
    tags: ['DSA', 'Big-O', 'Complexity', 'Analysis'],
    likes: 490,
    english: {
      summary: `Mastering algorithm efficiency analysis, asymptotic notations, common time complexities from O(1) to O(2^N), and auxiliary space.`,
      explanation: `Big-O notation describes the upper bound of an algorithm growth rate as the input size N approaches infinity. Constant O(1) < Logarithmic O(log N) < Linear O(N) < Linearithmic O(N log N) < Quadratic O(N^2) < Exponential O(2^N). Space complexity accounts for auxiliary memory allocated on the heap or recursion call stack.`,
      codeSnippet: `# O(N) Time, O(1) Auxiliary Space
def find_max(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val`,
      expectedOutput: `Linear scan handles 1,000,000 items in ~0.05 seconds.`,
      commonMistakes: [
        'Ignoring recursive stack space in space complexity (recursion depth is space!).',
        'Thinking binary search works on unsorted arrays.'
      ],
      keyTakeaways: [
        '10^8 operations take ~1 second in competitive programming.',
        'Always state worst-case and expected space complexity in interviews.'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai Big-O koi rocket science nahi hai, bas ye bata raha hai ki input badhne pe code kitna royega!',
      intuition: `Dekh bhai, agar tere pass 10 elements hain, toh koi bhi ghatiya code chal jayega. Par jab 10 Lakh (1,000,000) elements aayenge, tab pata chalega ki code hero hai ya zero!
- O(1): Raja aadmi! 10 elements hon ya 10 Crore, ek hi second me kaam khatam.
- O(log N): Superfast! Binary search jaise. 10 Lakh me sirf 20 steps!
- O(N): Normal for loop. 10 Lakh items = 10 Lakh steps.
- O(N^2): Double for loop. 10 Lakh items pe tera computer dhuwa nikal dega (TLE)!`,
      mastAnalogy: `Tu dost ko phone kar raha hai:
- O(1): Speed dial 1 dabaya, call lag gaya.
- O(N): Contacts me upar se neeche scroll kar raha hai.
- O(N^2): Har contact ko phone karke pooch raha hai "Bhai kya tu Rahul ko jaanta hai?"!`,
      trapAlert: `Recursive functions me space complexity O(1) nahi hoti! Recursion stack me har call memory leti hai, isliye depth O(N) space hoti hai!`,
      interviewerHack: `Jab interviewer code dekh kar puche "Whats the complexity?", pehle time complexity bolo with reasoning, fir space complexity with stack memory!`,
      quickBhaiSummary: `Double loop = O(N^2). Half divide = O(log N). Hash map lookup = O(1). Simple!`
    },
    practiceQuestion: {
      statement: 'What is the time complexity of a loop that doubles i every iteration: while i < n: i *= 2?',
      hint: 'Every step multiplies by 2, so it takes log2(n) steps.',
      solutionCode: `# Time Complexity: O(log N)
# Space Complexity: O(1)`
    }
  },

  // -------------------------------------------------------------
  // TOPIC 12: Arrays, Two Pointers & Sliding Window
  // -------------------------------------------------------------
  {
    id: 'topic-12',
    track: 'DSA',
    order: 12,
    title: 'Arrays, Two Pointers Technique & Sliding Window Patterns',
    difficulty: 'Medium',
    estimatedMinutes: 40,
    tags: ['DSA', 'Two Pointers', 'Sliding Window', 'Arrays'],
    likes: 540,
    english: {
      summary: `Optimizing nested O(N^2) array problems down to linear O(N) using two pointer convergence and dynamic window expansion/shrinkage.`,
      explanation: `The Two Pointer technique uses two indices traversing an array (either from both ends towards the center, or fast/slow runner from the beginning). Sliding Window maintains a contiguous subarray of size k (fixed) or dynamic condition, adding elements on the right and shrinking from the left, achieving O(N) time.`,
      codeSnippet: `# Two Sum on Sorted Array using Two Pointers (O(N) Time, O(1) Space)
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return (left, right)
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return None

print(two_sum_sorted([2, 7, 11, 15], 9))`,
      expectedOutput: `(0, 1)`,
      commonMistakes: [
        'Attempting two pointers on an unsorted array without sorting first.',
        'Not handling index out-of-bounds in sliding window while shrinking.'
      ],
      keyTakeaways: [
        'Two pointers reduces O(N^2) to O(N) for sorted data.',
        'Sliding window is the go-to pattern for "longest/shortest subarray satisfying condition X".'
      ]
    },
    bhaiLanguage: {
      headline: 'Bhai subarray ka question dekhte hi double loop mat laga, sliding window laga!',
      intuition: `Sun bhai, agar array sorted hai, aur teko do number dhoondne hain jinka sum Target ho:
Ek pointer shuruat me khada kar (left=0) aur ek aakhri me (right=n-1).
Dono ka sum nikaal:
- Agar sum chhota hai target se, toh left ko aage badha (bade number ki taraf).
- Agar sum bada hai target se, toh right ko peeche la (chhote number ki taraf).
- Agar barabar aa gaya, toh chill kar bhai, answer mil gaya!
O(N^2) ka question O(N) me khatam!`,
      mastAnalogy: `Tu aur tera dost shopping kar rahe ho budget fix karke. Agar total bill budget se kam hai toh mehenga item add karo (left++), agar bill budget se zyada ho gaya toh sasta item lo (right--)!`,
      trapAlert: `Bhai Sliding Window me jab window invalid ho jaye, toh "while" loop chala kar left pointer ko aage badhao jab tak window dobara valid na ho jaye!`,
      interviewerHack: `Bolo: "Since both pointers only move in one direction and visit each element at most twice, the overall amortized runtime is strictly O(N)."`,
      quickBhaiSummary: `Sorted array + Pair dhoondna = Two Pointers. Subarray with condition = Sliding Window.`
    },
    practiceQuestion: {
      statement: 'Find the maximum sum of any contiguous subarray of size k = 3 in [2, 1, 5, 1, 3, 2].',
      hint: 'Calculate first window sum, then slide: curr_sum += arr[i] - arr[i-k]',
      solutionCode: `def max_sub_array_of_size_k(k, arr):
    max_sum = 0
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

print(max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2])) # 9`
    }
  }
];
