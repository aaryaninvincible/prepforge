export interface TestCase {
  id: string;
  input: string;
  expected: string;
  label?: string;
  isHidden?: boolean;
}

export interface PlatformCodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Python Basics' | 'Arrays & Hashing' | 'Two Pointers' | 'Sliding Window' | 'Math & Logic' | 'Strings';
  acceptanceRate: string;
  companies: string[];
  likes: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  starterCode: {
    python: string;
    javascript: string;
  };
  sampleTestCases: TestCase[];
  hiddenTestCases: TestCase[];
  bhaiBreakdown: {
    pehleNaiveSocho: string;
    optimalBhaiLogic: string;
    bhaiTrap: string;
    stepByStepCode: string;
    timeSpaceComplexity: string;
  };
  standardEditorial: {
    approach: string;
    algorithm: string;
    timeComplexity: string;
    spaceComplexity: string;
    fullSolutionPython: string;
    fullSolutionJS: string;
  };
}

export const PLATFORM_PROBLEMS: PlatformCodingProblem[] = [
  // PROBLEM 1: Check Even or Odd
  {
    id: 'prob-1',
    title: 'Check Even or Odd',
    difficulty: 'Easy',
    category: 'Python Basics',
    acceptanceRate: '94.2%',
    companies: ['TCS', 'Infosys', 'Cognizant', 'Wipro'],
    likes: 310,
    description: 'Given an integer `n`, return `"Even"` if the number is divisible by 2, otherwise return `"Odd"`.',
    inputFormat: 'A single integer n.',
    outputFormat: 'Return a string "Even" or "Odd".',
    constraints: ['-10^9 <= n <= 10^9'],
    starterCode: {
      python: `def check_even_odd(n: int) -> str:
    # Write your solution below
    pass`,
      javascript: `function checkEvenOdd(n) {
    // Write your solution below
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '4', expected: 'Even', label: 'Positive Even' },
      { id: 'tc-2', input: '7', expected: 'Odd', label: 'Positive Odd' },
      { id: 'tc-3', input: '0', expected: 'Even', label: 'Zero' },
    ],
    hiddenTestCases: [
      { id: 'htc-1', input: '-4', expected: 'Even', isHidden: true },
      { id: 'htc-2', input: '-13', expected: 'Odd', isHidden: true },
      { id: 'htc-3', input: '1000000000', expected: 'Even', isHidden: true }
    ],
    bhaiBreakdown: {
      pehleNaiveSocho: 'Bhai isme kuch naive ya rocket science nahi hai. Modulus operator (%) 2 se divide karke remainder batata hai.',
      optimalBhaiLogic: 'Arre bhai seedha `n % 2 == 0` check kar! Agar remainder 0 aaya toh "Even", warna "Odd". Aur pro banna hai toh bitwise `n & 1 == 0` maar de, computer khush ho jayega!',
      bhaiTrap: 'Bhai negative numbers ka dhyaan rakhna! Par Python me -4 % 2 bhi 0 hi deta hai, toh chill.',
      stepByStepCode: 'return "Even" if n % 2 == 0 else "Odd"',
      timeSpaceComplexity: 'Time: O(1) [instant], Space: O(1)'
    },
    standardEditorial: {
      approach: 'Direct parity evaluation using the modulo operator or bitwise AND with 1.',
      algorithm: '1. If n % 2 == 0, return "Even". 2. Else return "Odd".',
      timeComplexity: 'O(1) - single arithmetic CPU cycle.',
      spaceComplexity: 'O(1) - zero auxiliary memory.',
      fullSolutionPython: `def check_even_odd(n: int) -> str:
    return "Even" if n % 2 == 0 else "Odd"`,
      fullSolutionJS: `function checkEvenOdd(n) {
    return n % 2 === 0 ? "Even" : "Odd";
}`
    }
  },

  // PROBLEM 2: Two Sum (LeetCode #1)
  {
    id: 'prob-2',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '51.8%',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    likes: 1850,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. Return the indices in increasing order.',
    inputFormat: 'nums = array of integers, target = integer',
    outputFormat: 'Return a list/array with two indices [i, j].',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Bhai Hash Map use kar for O(N) time!
    pass`,
      javascript: `function twoSum(nums, target) {
    // Write your solution below
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '[2,7,11,15], 9', expected: '[0, 1]', label: 'Basic Case' },
      { id: 'tc-2', input: '[3,2,4], 6', expected: '[1, 2]', label: 'Unsorted Elements' },
      { id: 'tc-3', input: '[3,3], 6', expected: '[0, 1]', label: 'Duplicates' },
    ],
    hiddenTestCases: [
      { id: 'htc-1', input: '[1,5,8,12,19], 20', expected: '[0, 4]', isHidden: true },
      { id: 'htc-2', input: '[-3,4,3,90], 0', expected: '[0, 2]', isHidden: true }
    ],
    bhaiBreakdown: {
      pehleNaiveSocho: 'Sabse pehle dimag me aata hai: do for loop chalao! Pehla loop i=0 se n, dusra j=i+1 se n. Har pair ka sum check karo. Par bhai ye O(N^2) time lega, LeetCode pe TLE maar dega!',
      optimalBhaiLogic: 'Sun mere bhai, jab tu kisi number `x` pe khada hai, teko kiski talash hai? `target - x` ki! Toh ek khali Dictionary (Hash Map) bana. Har number pe aane par pooch: "Kya mera partner (target - num) pehle se dictionary me baitha hai?". Agar haan, toh partner ka index aur apna index wahi return maar de! Agar nahi, toh apna number aur index dictionary me daal de taaki aane wale agle bande teko dhoond sakein!',
      bhaiTrap: 'Bhai same element ko do baar mat add kar dena! Isliye pehle dictionary check karte hain, fir element store karte hain.',
      stepByStepCode: `seen = {}
for i, num in enumerate(nums):
    diff = target - num
    if diff in seen:
        return [seen[diff], i]
    seen[num] = i`,
      timeSpaceComplexity: 'Time: O(N) [1 loop], Space: O(N) [dictionary memory]'
    },
    standardEditorial: {
      approach: 'One-pass Hash Table to achieve linear time complexity.',
      algorithm: '1. Initialize hash table `seen` mapping value to index. 2. For each element `nums[i]`, compute `complement = target - nums[i]`. 3. If complement in `seen`, return `[seen[complement], i]`. 4. Else insert `seen[nums[i]] = i`.',
      timeComplexity: 'O(N) - We traverse the list containing N elements exactly once. Hash table lookups take O(1) time.',
      spaceComplexity: 'O(N) - In the worst case, the hash map stores up to N elements.',
      fullSolutionPython: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      fullSolutionJS: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`
    }
  },

  // PROBLEM 3: FizzBuzz
  {
    id: 'prob-3',
    title: 'Return FizzBuzz Value',
    difficulty: 'Easy',
    category: 'Math & Logic',
    acceptanceRate: '88.5%',
    companies: ['Amazon', 'Bloomberg', 'Cisco'],
    likes: 420,
    description: 'Given an integer `n`, return:\n- `"FizzBuzz"` if n is divisible by both 3 and 5\n- `"Fizz"` if n is divisible by 3\n- `"Buzz"` if n is divisible by 5\n- Otherwise return `str(n)`',
    inputFormat: 'An integer n.',
    outputFormat: 'Return string representing the FizzBuzz value.',
    constraints: ['1 <= n <= 10^5'],
    starterCode: {
      python: `def fizz_buzz(n: int) -> str:
    # Write your solution below
    pass`,
      javascript: `function fizzBuzz(n) {
    // Write your solution below
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '3', expected: 'Fizz', label: 'Divisible by 3' },
      { id: 'tc-2', input: '5', expected: 'Buzz', label: 'Divisible by 5' },
      { id: 'tc-3', input: '15', expected: 'FizzBuzz', label: 'Divisible by 3 and 5' },
      { id: 'tc-4', input: '7', expected: '7', label: 'Neither' }
    ],
    hiddenTestCases: [
      { id: 'htc-1', input: '30', expected: 'FizzBuzz', isHidden: true },
      { id: 'htc-2', input: '99', expected: 'Fizz', isHidden: true },
      { id: 'htc-3', input: '100', expected: 'Buzz', isHidden: true }
    ],
    bhaiBreakdown: {
      pehleNaiveSocho: 'Sabse pehle if n % 3 == 0 check kar liya toh 15 pe "Fizz" return ho jayega aur "FizzBuzz" kabhi chal hi nahi payega!',
      optimalBhaiLogic: 'Bhai order ka khel hai! Pehle dono ka combination check kar (n % 15 == 0 ya n % 3 == 0 and n % 5 == 0). Fir akele 3, fir akele 5, aakhri me string(n)!',
      bhaiTrap: 'Never check % 3 before % 15, varna 15 wala case kidnap ho jayega!',
      stepByStepCode: `if n % 15 == 0: return "FizzBuzz"
elif n % 3 == 0: return "Fizz"
elif n % 5 == 0: return "Buzz"
return str(n)`,
      timeSpaceComplexity: 'Time: O(1), Space: O(1)'
    },
    standardEditorial: {
      approach: 'Conditional checking with precedence on the least common multiple (LCM).',
      algorithm: '1. Check divisibility by 15. 2. Check divisibility by 3. 3. Check divisibility by 5. 4. Default to string representation.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      fullSolutionPython: `def fizz_buzz(n: int) -> str:
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)`,
      fullSolutionJS: `function fizzBuzz(n) {
    if (n % 15 === 0) return "FizzBuzz";
    if (n % 3 === 0) return "Fizz";
    if (n % 5 === 0) return "Buzz";
    return String(n);
}`
    }
  },

  // PROBLEM 4: Valid Palindrome
  {
    id: 'prob-4',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Strings',
    acceptanceRate: '46.1%',
    companies: ['Meta', 'Microsoft', 'Uber'],
    likes: 890,
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    inputFormat: 'A string s.',
    outputFormat: 'Return boolean True or False.',
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    starterCode: {
      python: `def is_palindrome(s: str) -> bool:
    # Two pointer or list filtering
    pass`,
      javascript: `function isPalindrome(s) {
    // Write your solution below
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '"A man, a plan, a canal: Panama"', expected: 'true', label: 'Classic Phrase' },
      { id: 'tc-2', input: '"race a car"', expected: 'false', label: 'Non-palindrome' },
      { id: 'tc-3', input: '" "', expected: 'true', label: 'Empty whitespace' }
    ],
    hiddenTestCases: [
      { id: 'htc-1', input: '"0P"', expected: 'false', isHidden: true },
      { id: 'htc-2', input: '"ab_a"', expected: 'true', isHidden: true }
    ],
    bhaiBreakdown: {
      pehleNaiveSocho: 'Pehle string se faltu comma, space hatao, fir reverse karke match karo.',
      optimalBhaiLogic: 'Bhai do pointers lagao (left=0, right=len-1). Agar left pe space ya comma hai toh left++ kar. Agar right pe faltu symbol hai toh right-- kar. Dono alphanumeric aate hi lower case match kar! Agar mismatch hua toh seedha False!',
      bhaiTrap: 'Special characters jaise : , . _ aur capital/small letters ko ignore karna mat bhoolna!',
      stepByStepCode: `left, right = 0, len(s) - 1
while left < right:
    while left < right and not s[left].isalnum(): left += 1
    while left < right and not s[right].isalnum(): right -= 1
    if s[left].lower() != s[right].lower(): return False
    left += 1; right -= 1
return True`,
      timeSpaceComplexity: 'Time: O(N), Space: O(1) in-place!'
    },
    standardEditorial: {
      approach: 'Two-pointer technique skipping non-alphanumeric characters.',
      algorithm: 'Converge left and right pointers inward, matching lowercased characters.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) auxiliary memory.',
      fullSolutionPython: `def is_palindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
      fullSolutionJS: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    const isAlphanumeric = (c) => /[a-z0-9]/i.test(c);
    while (l < r) {
        while (l < r && !isAlphanumeric(s[l])) l++;
        while (l < r && !isAlphanumeric(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;
}`
    }
  },

  // PROBLEM 5: Maximum Subarray (Kadane's Algorithm)
  {
    id: 'prob-5',
    title: 'Maximum Subarray (Kadane\'s)',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    acceptanceRate: '50.4%',
    companies: ['Amazon', 'Microsoft', 'Apple', 'LinkedIn'],
    likes: 2100,
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'nums = integer array',
    outputFormat: 'Return integer maximum sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: {
      python: `def max_sub_array(nums: list[int]) -> int:
    # Kadane's Algorithm O(N)
    pass`,
      javascript: `function maxSubArray(nums) {
    // Write your solution below
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6', label: 'Standard Subarray' },
      { id: 'tc-2', input: '[1]', expected: '1', label: 'Single Element' },
      { id: 'tc-3', input: '[5,4,-1,7,8]', expected: '23', label: 'All Positive' }
    ],
    hiddenTestCases: [
      { id: 'htc-1', input: '[-1, -2, -3]', expected: '-1', isHidden: true },
      { id: 'htc-2', input: '[-2, -1]', expected: '-1', isHidden: true }
    ],
    bhaiBreakdown: {
      pehleNaiveSocho: 'Sabhi possible subarrays generate karke sum calculate karo: O(N^3) ya O(N^2). Bahut ghatiya!',
      optimalBhaiLogic: 'Bhai Kadane ka simple formula yaad rakh: "Pichla karza aage mat leke jao!" Har number pe tu pooch: "Kya pichla sum mere me judke faayda de raha hai, ya mai akele naye sire se start karu?". Agar pichla sum negative ho chuka hai, toh usko phenk do (reset to 0) aur naye number se shuruat karo!',
      bhaiTrap: 'Agar saare numbers negative hon (jaise [-5, -2, -9]), toh initial max 0 mat rakhna bhai! Initial max nums[0] rakhna warna answer galat aayega!',
      stepByStepCode: `max_so_far = nums[0]
curr_sum = 0
for x in nums:
    curr_sum = max(x, curr_sum + x)
    max_so_far = max(max_so_far, curr_sum)
return max_so_far`,
      timeSpaceComplexity: 'Time: O(N), Space: O(1)'
    },
    standardEditorial: {
      approach: "Kadane's Dynamic Programming Algorithm.",
      algorithm: "Maintain current maximum contiguous sum. If current running sum drops below the current element, restart at the current element.",
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      fullSolutionPython: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = nums[0]
    curr_sum = 0
    for x in nums:
        curr_sum = max(x, curr_sum + x)
        max_so_far = max(max_so_far, curr_sum)
    return max_so_far`,
      fullSolutionJS: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currSum = 0;
    for (let x of nums) {
        currSum = Math.max(x, currSum + x);
        maxSoFar = Math.max(maxSoFar, currSum);
    }
    return maxSoFar;
}`
    }
  }
];
