// Chapter 1: Complexity Analysis — Big-O, Ω, Θ, Master Theorem
export default {
  id: 1, year: 1, slug: 'complexity',
  icon: '📊', color: '#58a6ff',
  title: 'Complexity Analysis',
  subtitle: 'Big-O, Omega, Theta & Master Theorem',
  description: 'The mathematical foundation of algorithm analysis. Learn to reason about time and space usage of algorithms using asymptotic notation, recurrences, and the Master Theorem.',
  theorems: [
    {
      name: 'Master Theorem',
      katex_statement: 'T(n)=aT(n/b)+f(n),\\;a\\ge1,b>1',
      statement_text: 'Given T(n) = aT(n/b) + f(n) with a ≥ 1, b > 1, let c = log_b(a):',
      cases: [
        'If f(n) = O(n^(c-ε)) for some ε > 0  →  T(n) = Θ(n^c)',
        'If f(n) = Θ(n^c log^k n)             →  T(n) = Θ(n^c log^(k+1) n)',
        'If f(n) = Ω(n^(c+ε)) and regularity condition holds → T(n) = Θ(f(n))'
      ],
      proof: `We prove Case 1 by expansion.

T(n) = aT(n/b) + f(n)
     = a[aT(n/b²) + f(n/b)] + f(n)
     = a²T(n/b²) + a·f(n/b) + f(n)

After log_b(n) levels the recursion bottoms out:
T(n) = a^(log_b n)·T(1) + Σ_{j=0}^{log_b(n)-1} a^j · f(n/b^j)
     = n^(log_b a)·T(1) + Σ a^j · f(n/b^j)

Since f(n) = O(n^(c-ε)), each term f(n/b^j) = O((n/b^j)^(c-ε)).
The sum is dominated by its first term (geometric series), giving T(n) = Θ(n^c). □`
    },
    {
      name: 'Big-O Formal Definition',
      katex_statement: 'f(n)=O(g(n))\\iff\\exists c>0,n_0:\\forall n\\ge n_0,\\;f(n)\\le c\\cdot g(n)',
      statement_text: 'f(n) = O(g(n)) if and only if there exist positive constants c and n₀ such that for all n ≥ n₀, f(n) ≤ c·g(n).',
      proof: `Example: Show 3n² + 5n + 2 = O(n²).

Choose c = 10, n₀ = 1.
For n ≥ 1:
  3n² + 5n + 2
  ≤ 3n² + 5n² + 2n²   (since n ≥ 1 means n ≤ n², 1 ≤ n²)
  = 10n²
  = c·g(n)   ✓

Therefore 3n² + 5n + 2 = O(n²). □`
    },
    {
      name: 'Arithmetic Series',
      katex_statement: '\\sum_{k=1}^{n}k = \\frac{n(n+1)}{2}=\\Theta(n^2)',
      statement_text: 'The sum 1 + 2 + 3 + … + n = n(n+1)/2.',
      proof: `Proof by induction.

Base case n=1: 1 = 1(2)/2 = 1. ✓

Inductive step: Assume true for n=k.
  S(k+1) = S(k) + (k+1)
          = k(k+1)/2 + (k+1)
          = (k+1)(k/2 + 1)
          = (k+1)(k+2)/2   ✓

Alternative "Gauss" proof:
  S = 1   + 2   + … + n
  S = n   + n-1 + … + 1
 2S = (n+1)+(n+1)+…+(n+1)  [n terms]
 2S = n(n+1)
  S = n(n+1)/2. □`
    },
    {
      name: 'Geometric Series',
      katex_statement: '\\sum_{k=0}^{n}r^k = \\frac{r^{n+1}-1}{r-1}\\quad(r\\ne1)',
      statement_text: 'Sum of geometric series: 1 + r + r² + … + rⁿ = (r^(n+1) − 1)/(r − 1) for r ≠ 1.',
      proof: `Let S = Σ r^k.
  S   = 1 + r + r² + … + rⁿ
  rS  = r + r² + r³ + … + r^(n+1)
  S - rS = 1 - r^(n+1)
  S(1-r) = 1 - r^(n+1)
  S = (1 - r^(n+1))/(1-r) = (r^(n+1) - 1)/(r-1). □

Corollary: For |r| < 1, as n→∞, S = 1/(1-r).`
    }
  ],
  problems: [
    {
      id: 1, title: 'Big-O Classification',
      difficulty: 'Easy', tags: ['Big-O'],
      description: 'Given a function f(n), determine its tightest Big-O classification from the list: O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ).',
      examples: [
        { input: 'f(n) = 3n² + 7n + 100', output: 'O(n²)', explanation: 'Highest-degree term dominates.' },
        { input: 'f(n) = log(n³)', output: 'O(log n)', explanation: '3·log(n) = O(log n)' }
      ],
      constraints: ['f(n) is a polynomial or combination of standard functions'],
      hint: 'Drop constants and lower-order terms. Keep only the dominant term.',
      timeComplexity: 'O(1)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun classifyBigO(n: Double): String {\n    // Classify dominance order:\n    // O(1) < O(log n) < O(n) < O(n log n) < O(n\u00b2) < O(n\u00b3) < O(2^n)\n    val one      = 1.0\n    val logN     = Math.log(n) / Math.log(2.0)\n    val linear   = n\n    val nlogn    = n * logN\n    val quadratic = n * n\n    val cubic    = n * n * n\n    val exponential = Math.pow(2.0, n)\n\n    println(\"O(1)       = \\$one\")\n    println(\"O(log n)   = \\$logN\")\n    println(\"O(n)       = \\$linear\")\n    println(\"O(n log n) = \\$nlogn\")\n    println(\"O(n\u00b2)      = \\$quadratic\")\n    println(\"O(n\u00b3)      = \\$cubic\")\n    println(\"O(2\u207f)      = \\$exponential\")\n    return \"Growth rate comparison for n=\\$n printed above.\"\n}\n\nfun main() {\n    classifyBigO(10.0)\n}",
        dart: "String classifyBigO(double n) {\n  final one = 1.0;\n  final logN = log(n) / log(2);\n  final linear = n;\n  final nlogn = n * logN;\n  final quadratic = n * n;\n  final cubic = n * n * n;\n  final exponential = pow(2, n);\n\n  print('O(1)       = \\$one');\n  print('O(log n)   = \\$logN');\n  print('O(n)       = \\$linear');\n  print('O(n log n) = \\$nlogn');\n  print('O(n\u00b2)      = \\$quadratic');\n  print('O(n\u00b3)      = \\$cubic');\n  print('O(2\u207f)      = \\$exponential');\n  return 'Growth comparison done.';\n}",
        swift: "import Foundation\nfunc classifyBigO(_ n: Double) -> String {\n    let one = 1.0\n    let logN = log2(n)\n    let linear = n\n    let nlogn = n * logN\n    let quadratic = n * n\n    let cubic = n * n * n\n    let exponential = pow(2.0, n)\n\n    print(\"O(1)       = \\\\(one)\")\n    print(\"O(log n)   = \\\\(logN)\")\n    print(\"O(n)       = \\\\(linear)\")\n    print(\"O(n log n) = \\\\(nlogn)\")\n    print(\"O(n\u00b2)      = \\\\(quadratic)\")\n    print(\"O(n\u00b3)      = \\\\(cubic)\")\n    print(\"O(2\u207f)      = \\\\(exponential)\")\n    return \"Growth comparison done.\"\n}",
        haskell: "import Data.List (sortBy)\nimport Data.Ord (comparing)\n\ndata Complexity = O1 | OLogN | ON | ONLogN | ON2 | ON3 | O2N\n  deriving (Show, Eq, Ord)\n\nevaluate :: Complexity -> Double -> Double\nevaluate O1     _ = 1\nevaluate OLogN  n = logBase 2 n\nevaluate ON     n = n\nevaluate ONLogN n = n * logBase 2 n\nevaluate ON2    n = n^2\nevaluate ON3    n = n^3\nevaluate O2N    n = 2**n\n\nrankComplexities :: Double -> [(Complexity, Double)]\nrankComplexities n = sortBy (comparing snd)\n  [ (c, evaluate c n)\n  | c <- [O1, OLogN, ON, ONLogN, ON2, ON3, O2N] ]\n\nmain :: IO ()\nmain = mapM_ print (rankComplexities 10)"
      }
    },
    {
      id: 2, title: 'Nested Loop Complexity',
      difficulty: 'Easy', tags: ['Big-O', 'Loops'],
      description: 'Compute the exact number of iterations and Big-O complexity of nested loops.',
      examples: [
        { input: 'for i in 1..n: for j in 1..i: print(i,j)', output: 'O(n²)', explanation: 'Inner loop runs 1+2+…+n = n(n+1)/2 times → Θ(n²)' },
        { input: 'for i in 1..n: for j in 1..log(n): print(i,j)', output: 'O(n log n)', explanation: 'Outer: n, Inner: log n' }
      ],
      constraints: ['n ≥ 1'],
      hint: 'Count iterations using arithmetic/geometric series formulas.',
      timeComplexity: 'O(n²)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "// Count iterations of: for i in 1..n, for j in 1..i\nfun countNestedIterations(n: Int): Long {\n    var count = 0L\n    for (i in 1..n) {\n        for (j in 1..i) {\n            count++\n        }\n    }\n    // Closed-form: n*(n+1)/2\n    val formula = n.toLong() * (n + 1) / 2\n    println(\"Actual: \\$count, Formula n(n+1)/2: \\$formula\")\n    return count\n}\n\nfun main() = countNestedIterations(100).let { println(\"Total: \\$it\") }",
        dart: "int countNestedIterations(int n) {\n  int count = 0;\n  for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n      count++;\n    }\n  }\n  final formula = n * (n + 1) ~/ 2;\n  print('Actual: \\$count, Formula: \\$formula');\n  return count;\n}",
        swift: "func countNestedIterations(_ n: Int) -> Int {\n    var count = 0\n    for i in 1...n {\n        for _ in 1...i { count += 1 }\n    }\n    let formula = n * (n + 1) / 2\n    print(\"Actual: \\\\(count), Formula n(n+1)/2: \\\\(formula)\")\n    return count\n}",
        haskell: "countIterations :: Int -> Int\ncountIterations n = sum [i | i <- [1..n]]\n  -- = sum of 1+2+...+n = n*(n+1)/2\n\nformula :: Int -> Int\nformula n = n * (n+1) \\`div\\` 2\n\nmain :: IO ()\nmain = do\n  let n = 100\n  putStrLn \\$ \"Actual: \" ++ show (countIterations n)\n  putStrLn \\$ \"Formula: \" ++ show (formula n)"
      }
    },
    {
      id: 3, title: 'Recurrence: Binary Search',
      difficulty: 'Easy', tags: ['Recurrence', 'Big-O'],
      description: 'Solve the recurrence T(n) = T(n/2) + O(1) that describes Binary Search, and prove it equals O(log n).',
      examples: [
        { input: 'T(n) = T(n/2) + 1, T(1) = 1', output: 'T(n) = O(log n)', explanation: 'Unrolling gives T(n) = log₂(n) + 1' }
      ],
      constraints: ['n is a power of 2 for simplicity'],
      hint: 'Unroll the recurrence k times until you hit the base case.',
      timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun binarySearch(arr: IntArray, target: Int): Int {\n    var lo = 0; var hi = arr.size - 1\n    while (lo <= hi) {\n        val mid = lo + (hi - lo) / 2\n        when {\n            arr[mid] == target -> return mid\n            arr[mid] < target  -> lo = mid + 1\n            else               -> hi = mid - 1\n        }\n    }\n    return -1\n}\n// T(n) = T(n/2) + O(1) \u2192 O(log n)\nfun main() {\n    val arr = intArrayOf(1,3,5,7,9,11,13,15)\n    println(binarySearch(arr, 7))  // 3\n}",
        dart: "int binarySearch(List<int> arr, int target) {\n  int lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    int mid = lo + (hi - lo) ~/ 2;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
        swift: "func binarySearch(_ arr: [Int], _ target: Int) -> Int {\n    var lo = 0, hi = arr.count - 1\n    while lo <= hi {\n        let mid = lo + (hi - lo) / 2\n        if arr[mid] == target { return mid }\n        else if arr[mid] < target { lo = mid + 1 }\n        else { hi = mid - 1 }\n    }\n    return -1\n}",
        haskell: "binarySearch :: (Ord a) => [a] -> a -> Maybe Int\nbinarySearch xs target = go 0 (length xs - 1)\n  where\n    arr = xs\n    go lo hi\n      | lo > hi   = Nothing\n      | arr !! mid == target = Just mid\n      | arr !! mid <  target = go (mid+1) hi\n      | otherwise             = go lo (mid-1)\n      where mid = lo + (hi - lo) \\`div\\` 2"
      }
    },
    {
      id: 4, title: 'Master Theorem — Case 1',
      difficulty: 'Medium', tags: ['Master Theorem', 'Recurrence'],
      description: 'Apply the Master Theorem to T(n) = 9T(n/3) + n. Identify a, b, f(n), compute log_b(a), and state the tight bound.',
      examples: [
        { input: 'T(n) = 9T(n/3) + n', output: 'T(n) = Θ(n²)', explanation: 'a=9, b=3, log_3(9)=2. f(n)=n=O(n^(2-1)) → Case 1 → Θ(n^2)' }
      ],
      constraints: [],
      hint: 'Compute c = log_b(a) first, then compare f(n) to n^c.',
      timeComplexity: 'O(n²)', spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "// Illustrative: simulate recurrence depth and count work\nfun masterCase1(n: Int): Long {\n    if (n <= 1) return 1L\n    var work = 0L\n    // 9 sub-problems of size n/3, plus O(n) merge work\n    work += n  // f(n) = n\n    // 9 recursive calls of n/3 (represented iteratively)\n    var size = n / 3; var subproblems = 9\n    while (size >= 1) {\n        work += size.toLong() * subproblems\n        subproblems *= 9; size /= 3\n    }\n    return work  // \u2248 n\u00b2\n}\nfun main() {\n    println(masterCase1(81))    // \u2248 6561 = 81\u00b2 (\u0398(n\u00b2) confirmed)\n}",
        dart: "int masterCase1(int n) {\n  if (n <= 1) return 1;\n  int work = n;\n  int size = n ~/ 3, subs = 9;\n  while (size >= 1) {\n    work += size * subs;\n    subs *= 9; size ~/= 3;\n  }\n  return work;\n}",
        swift: "func masterCase1(_ n: Int) -> Int {\n    guard n > 1 else { return 1 }\n    var work = n, size = n / 3, subs = 9\n    while size >= 1 {\n        work += size * subs\n        subs *= 9; size /= 3\n    }\n    return work\n}",
        haskell: "masterCase1 :: Int -> Int\nmasterCase1 n\n  | n <= 1    = 1\n  | otherwise = n + sum [size * subs\n                        | (size, subs) <- takeWhile ((>=1) . fst) levels]\n  where\n    levels = iterate (\\\\(sz, sb) -> (sz \\`div\\` 3, sb*9)) (n \\`div\\` 3, 9)"
      }
    },
    {
      id: 5, title: 'Master Theorem — Case 2',
      difficulty: 'Medium', tags: ['Master Theorem'],
      description: 'Apply the Master Theorem to T(n) = 2T(n/2) + n (Merge Sort recurrence). Prove T(n) = Θ(n log n).',
      examples: [
        { input: 'T(n) = 2T(n/2) + n', output: 'T(n) = Θ(n log n)', explanation: 'a=2, b=2, log_2(2)=1. f(n)=n=Θ(n^1)=Θ(n^c) → Case 2 → Θ(n log n)' }
      ],
      constraints: [],
      hint: 'Case 2 applies when f(n) = Θ(n^c log^k n) for k=0.',
      timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun mergeSort(arr: IntArray): IntArray {\n    if (arr.size <= 1) return arr\n    val mid = arr.size / 2\n    val left = mergeSort(arr.sliceArray(0 until mid))\n    val right = mergeSort(arr.sliceArray(mid until arr.size))\n    return merge(left, right)\n}\nfun merge(a: IntArray, b: IntArray): IntArray {\n    val res = IntArray(a.size + b.size)\n    var i = 0; var j = 0; var k = 0\n    while (i < a.size && j < b.size)\n        res[k++] = if (a[i] <= b[j]) a[i++] else b[j++]\n    while (i < a.size) res[k++] = a[i++]\n    while (j < b.size) res[k++] = b[j++]\n    return res\n}\nfun main() { println(mergeSort(intArrayOf(5,2,8,1,9,3)).toList()) }",
        dart: "List<int> mergeSort(List<int> arr) {\n  if (arr.length <= 1) return arr;\n  int mid = arr.length ~/ 2;\n  final left = mergeSort(arr.sublist(0, mid));\n  final right = mergeSort(arr.sublist(mid));\n  return merge(left, right);\n}\nList<int> merge(List<int> a, List<int> b) {\n  List<int> res = []; int i = 0, j = 0;\n  while (i < a.length && j < b.length)\n    res.add(a[i] <= b[j] ? a[i++] : b[j++]);\n  res.addAll(a.sublist(i)); res.addAll(b.sublist(j));\n  return res;\n}",
        swift: "func mergeSort(_ arr: [Int]) -> [Int] {\n    guard arr.count > 1 else { return arr }\n    let mid = arr.count / 2\n    let left = mergeSort(Array(arr[..<mid]))\n    let right = mergeSort(Array(arr[mid...]))\n    return merge(left, right)\n}\nfunc merge(_ a: [Int], _ b: [Int]) -> [Int] {\n    var res = [Int](); var i = 0, j = 0\n    while i < a.count && j < b.count {\n        res.append(a[i] <= b[j] ? a[i++] : b[j++])\n    }\n    res += Array(a[i...]); res += Array(b[j...]); return res\n}",
        haskell: "mergeSort :: Ord a => [a] -> [a]\nmergeSort []  = []\nmergeSort [x] = [x]\nmergeSort xs  = merge (mergeSort left) (mergeSort right)\n  where\n    mid   = length xs \\`div\\` 2\n    left  = take mid xs\n    right = drop mid xs\n\nmerge :: Ord a => [a] -> [a] -> [a]\nmerge [] ys = ys\nmerge xs [] = xs\nmerge (x:xs) (y:ys)\n  | x <= y    = x : merge xs (y:ys)\n  | otherwise = y : merge (x:xs) ys"
      }
    },
    {
      id: 6, title: 'Space Complexity Analysis',
      difficulty: 'Easy', tags: ['Space Complexity'],
      description: 'Determine the space complexity of given algorithms (iterative vs recursive). Compare in-place sorting vs extra-space sorting.',
      examples: [
        { input: 'Recursive Fibonacci(n)', output: 'O(n) space', explanation: 'Call stack reaches depth n' },
        { input: 'Iterative Fibonacci(n)', output: 'O(1) space', explanation: 'Only 3 variables needed' }
      ],
      constraints: [],
      hint: 'Count the maximum memory used at any point: variables + call stack.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1) iterative / O(n) recursive',
      solutions: {
        kotlin: "// O(n) space \u2014 recursive\nfun fibRecursive(n: Int): Long {\n    if (n <= 1) return n.toLong()\n    return fibRecursive(n - 1) + fibRecursive(n - 2)\n}\n\n// O(1) space \u2014 iterative\nfun fibIterative(n: Int): Long {\n    if (n <= 1) return n.toLong()\n    var a = 0L; var b = 1L\n    repeat(n - 1) { val c = a + b; a = b; b = c }\n    return b\n}\n\nfun main() {\n    println(\"Recursive fib(10): \\${fibRecursive(10)}\")\n    println(\"Iterative fib(10): \\${fibIterative(10)}\")\n}",
        dart: "// O(n) time+space \u2014 memoized\nMap<int,int> memo = {};\nint fibMemo(int n) {\n  if (n <= 1) return n;\n  return memo[n] ??= fibMemo(n-1) + fibMemo(n-2);\n}\n\n// O(1) space\nint fibIter(int n) {\n  if (n <= 1) return n;\n  int a = 0, b = 1;\n  for (int i = 2; i <= n; i++) {\n    int c = a + b; a = b; b = c;\n  }\n  return b;\n}",
        swift: "// O(1) space Fibonacci\nfunc fibIterative(_ n: Int) -> Int {\n    if n <= 1 { return n }\n    var (a, b) = (0, 1)\n    for _ in 2...n { (a, b) = (b, a + b) }\n    return b\n}\n// O(n) space memoized\nvar cache: [Int: Int] = [:]\nfunc fibMemo(_ n: Int) -> Int {\n    if n <= 1 { return n }\n    if let v = cache[n] { return v }\n    let v = fibMemo(n-1) + fibMemo(n-2)\n    cache[n] = v; return v\n}",
        haskell: "-- O(1) space: tail-recursive\nfibIter :: Int -> Integer\nfibIter n = go n 0 1\n  where\n    go 0 a _ = a\n    go k a b = go (k-1) b (a+b)\n\n-- O(n) space: memoized via lazy list\nfibs :: [Integer]\nfibs = 0 : 1 : zipWith (+) fibs (tail fibs)\n\nfib :: Int -> Integer\nfib n = fibs !! n"
      }
    },
    {
      id: 7, title: 'Amortized Analysis — Dynamic Array',
      difficulty: 'Hard', tags: ['Amortized'],
      description: 'Prove that a dynamic array (doubling strategy) has amortized O(1) push operation, even though individual operations can cost O(n).',
      examples: [
        { input: 'Push n items into an initially empty dynamic array', output: 'Total cost O(n), amortized O(1) per push', explanation: 'Doubling means copies: 1+2+4+…+n/2 < n' }
      ],
      constraints: [],
      hint: 'Use the aggregate method: total cost / number of operations.',
      timeComplexity: 'O(1) amortized', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class DynamicArray<T> {\n    private var data: Array<Any?> = arrayOfNulls(1)\n    private var size = 0\n    private var capacity = 1\n    private var totalCopies = 0\n\n    fun push(item: T) {\n        if (size == capacity) {\n            // Expensive resize: copy all elements\n            val newData = arrayOfNulls<Any>(capacity * 2)\n            for (i in 0 until size) newData[i] = data[i]\n            totalCopies += size\n            data = newData; capacity *= 2\n        }\n        data[size++] = item\n    }\n    fun size() = size\n    fun totalWork() = size + totalCopies  // O(n) total\n}\nfun main() {\n    val arr = DynamicArray<Int>()\n    repeat(16) { arr.push(it) }\n    println(\"Size: \\${arr.size()}, Total work: \\${arr.totalWork()}\")\n    // Amortized work per element = totalWork/n \u2248 3 = O(1)\n}",
        dart: "class DynamicArray<T> {\n  List<T?> _data = List.filled(1, null, growable: false);\n  int _size = 0, _capacity = 1, totalCopies = 0;\n\n  void push(T item) {\n    if (_size == _capacity) {\n      final newData = List<T?>.filled(_capacity * 2, null);\n      for (int i = 0; i < _size; i++) newData[i] = _data[i];\n      totalCopies += _size;\n      _data = newData; _capacity *= 2;\n    }\n    _data[_size++] = item;\n  }\n  int get size => _size;\n}",
        swift: "class DynamicArray<T> {\n    private var data: [T?]\n    private(set) var count = 0\n    private var capacity = 1\n    var totalCopies = 0\n\n    init() { data = Array(repeating: nil, count: 1) }\n    func push(_ item: T) {\n        if count == capacity {\n            var newData = Array<T?>(repeating: nil, count: capacity * 2)\n            for i in 0..<count { newData[i] = data[i] }\n            totalCopies += count\n            data = newData; capacity *= 2\n        }\n        data[count] = item; count += 1\n    }\n}",
        haskell: "-- Functional approximation using difference lists\n-- (Haskell lists are immutable; we show the concept)\nimport Data.IORef\n\ndata DynArray a = DA { elems :: [a], sz :: Int, cap :: Int }\n\nnewDA :: DynArray a\nnewDA = DA [] 0 1\n\npush :: a -> DynArray a -> DynArray a\npush x (DA es s c)\n  | s < c     = DA (es ++ [x]) (s+1) c\n  | otherwise = DA (es ++ [x]) (s+1) (c*2)  -- \"resize\"\n\nbuildArray :: [a] -> DynArray a\nbuildArray = foldr (\\\\ x acc -> push x acc) newDA . reverse"
      }
    },
    {
      id: 8, title: 'Growth Rate Ordering',
      difficulty: 'Easy', tags: ['Big-O', 'Comparison'],
      description: 'Sort the following functions in non-decreasing order of asymptotic growth: n!, 2ⁿ, n³, n², n log n, n, log n, √n, log log n, 1.',
      examples: [
        { input: 'All above functions', output: '1 < log log n < log n < √n < n < n log n < n² < n³ < 2ⁿ < n!', explanation: 'Standard growth hierarchy.' }
      ],
      constraints: [],
      hint: 'Use Stirling\'s approximation: n! ≈ √(2πn)·(n/e)ⁿ > 2ⁿ for large n.',
      timeComplexity: 'N/A', spaceComplexity: 'N/A',
      solutions: {
        kotlin: "import kotlin.math.*\nfun growthRates(n: Double): Map<String, Double> = mapOf(\n    \"1\"          to 1.0,\n    \"log log n\"  to log(log(n)),\n    \"log n\"      to log(n),\n    \"sqrt(n)\"    to sqrt(n),\n    \"n\"          to n,\n    \"n log n\"    to n * log(n),\n    \"n\u00b2\"         to n * n,\n    \"n\u00b3\"         to n * n * n,\n    \"2^n\"        to 2.0.pow(n),\n    \"n!\"         to (1..n.toInt()).fold(1.0) { acc, i -> acc * i }\n)\nfun main() {\n    val n = 10.0\n    growthRates(n).entries\n        .sortedBy { it.value }\n        .forEach { (k, v) -> println(\"\\$k = \\$v\") }\n}",
        dart: "import 'dart:math';\nMap<String, double> growthRates(double n) {\n  double factorial = 1;\n  for (int i = 1; i <= n; i++) factorial *= i;\n  return {\n    '1': 1, 'log log n': log(log(n)), 'log n': log(n),\n    'sqrt(n)': sqrt(n), 'n': n, 'n log n': n * log(n),\n    'n\u00b2': n*n, 'n\u00b3': n*n*n, '2^n': pow(2,n).toDouble(),\n    'n!': factorial\n  };\n}",
        swift: "import Foundation\nfunc growthRates(_ n: Double) -> [(String, Double)] {\n    let factorial = (1...Int(n)).reduce(1.0) { $0 * Double($1) }\n    return [\n        (\"1\", 1), (\"log log n\", log(log(n))), (\"log n\", log(n)),\n        (\"\u221an\", sqrt(n)), (\"n\", n), (\"n log n\", n * log(n)),\n        (\"n\u00b2\", n*n), (\"n\u00b3\", n*n*n), (\"2^n\", pow(2, n)), (\"n!\", factorial)\n    ].sorted { $0.1 < $1.1 }\n}",
        haskell: "import Data.List (sortBy)\nimport Data.Ord (comparing)\n\ngrowthRates :: Double -> [(String, Double)]\ngrowthRates n = sortBy (comparing snd)\n  [ (\"1\",        1)\n  , (\"log log n\", log (log n))\n  , (\"log n\",    log n)\n  , (\"sqrt n\",   sqrt n)\n  , (\"n\",        n)\n  , (\"n log n\",  n * log n)\n  , (\"n\u00b2\",       n^2)\n  , (\"n\u00b3\",       n^3)\n  , (\"2^n\",      2**n)\n  , (\"n!\",       fromIntegral $ product [1..floor n])\n  ]\n\nmain :: IO ()\nmain = mapM_ print (growthRates 10)"
      }
    },
    {
      id: 9, title: 'Recurrence — Divide and Conquer',
      difficulty: 'Medium', tags: ['Recurrence', 'Master Theorem'],
      description: 'Solve T(n) = 4T(n/2) + n² using the Master Theorem. Then verify with tree expansion.',
      examples: [
        { input: 'T(n)=4T(n/2)+n²', output: 'T(n)=Θ(n² log n)', explanation: 'a=4,b=2,c=log₂4=2. f(n)=n²=Θ(n²)=Θ(n^c) → Case 2 → Θ(n² log n)' }
      ],
      constraints: [],
      hint: 'Case 2: f(n)=Θ(n^(log_b a)) → T(n)=Θ(n^(log_b a) log n)',
      timeComplexity: 'O(n² log n)', spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "// Verify by measuring actual work in simulation\nfun simulate4T(n: Int): Long {\n    if (n <= 1) return 1L\n    val subWork = 4 * simulate4T(n / 2)\n    val mergeWork = n.toLong() * n  // f(n) = n\u00b2\n    return subWork + mergeWork\n}\nfun main() {\n    // For n=16: expect \u2248 16\u00b2\u00b7log\u208216 = 256\u00b74 = 1024 (\u00b1small constant)\n    for (p in 1..5) {\n        val n = 1 shl (p * 2)\n        println(\"n=\\$n: T(n)=\\${simulate4T(n)}, n\u00b2log n=\\${n.toLong()*n*(p*2)}\")\n    }\n}",
        dart: "int simulate4T(int n) {\n  if (n <= 1) return 1;\n  return 4 * simulate4T(n ~/ 2) + n * n;\n}\nvoid main() {\n  for (int p = 1; p <= 5; p++) {\n    int n = 1 << (p * 2);\n    print('n=\\$n: T(n)=\\${simulate4T(n)}');\n  }\n}",
        swift: "func simulate4T(_ n: Int) -> Int {\n    if n <= 1 { return 1 }\n    return 4 * simulate4T(n / 2) + n * n\n}",
        haskell: "simulate4T :: Int -> Integer\nsimulate4T n\n  | n <= 1    = 1\n  | otherwise = 4 * simulate4T (n \\`div\\` 2) + fromIntegral (n*n)"
      }
    },
    {
      id: 10, title: 'Power Function',
      difficulty: 'Easy', tags: ['Divide and Conquer'],
      description: 'Implement fast exponentiation (x^n) using divide and conquer, achieving O(log n) time instead of O(n).',
      examples: [
        { input: 'x=2, n=10', output: '1024', explanation: '2^10 = 1024' },
        { input: 'x=3, n=0', output: '1', explanation: 'Any number to power 0 is 1' }
      ],
      constraints: ['-100 ≤ x ≤ 100', '0 ≤ n ≤ 1000'],
      hint: 'x^n = (x^(n/2))² when n is even; x · x^(n-1) when n is odd.',
      timeComplexity: 'O(log n)', spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun fastPow(x: Long, n: Int): Long {\n    if (n == 0) return 1L\n    if (n % 2 == 0) { val half = fastPow(x, n / 2); return half * half }\n    return x * fastPow(x, n - 1)\n}\n// Iterative version: O(log n) time, O(1) space\nfun fastPowIter(x: Long, n: Int): Long {\n    var base = x; var exp = n; var result = 1L\n    while (exp > 0) {\n        if (exp % 2 == 1) result *= base\n        base *= base; exp /= 2\n    }\n    return result\n}\nfun main() { println(fastPowIter(2, 10)) }",
        dart: "int fastPow(int x, int n) {\n  if (n == 0) return 1;\n  if (n % 2 == 0) { int h = fastPow(x, n ~/ 2); return h * h; }\n  return x * fastPow(x, n - 1);\n}\nint fastPowIter(int x, int n) {\n  int base = x, exp = n, result = 1;\n  while (exp > 0) {\n    if (exp % 2 == 1) result *= base;\n    base *= base; exp ~/= 2;\n  }\n  return result;\n}",
        swift: "func fastPow(_ x: Int, _ n: Int) -> Int {\n    if n == 0 { return 1 }\n    if n % 2 == 0 { let h = fastPow(x, n/2); return h * h }\n    return x * fastPow(x, n - 1)\n}\nfunc fastPowIter(_ x: Int, _ n: Int) -> Int {\n    var (base, exp, result) = (x, n, 1)\n    while exp > 0 {\n        if exp % 2 == 1 { result *= base }\n        base *= base; exp /= 2\n    }\n    return result\n}",
        haskell: "fastPow :: Integer -> Int -> Integer\nfastPow _ 0 = 1\nfastPow x n\n  | even n    = let h = fastPow x (n \\`div\\` 2) in h * h\n  | otherwise = x * fastPow x (n - 1)\n\n-- Iterative with accumulator\nfastPowIter :: Integer -> Int -> Integer\nfastPowIter x n = go x n 1\n  where\n    go _ 0 acc = acc\n    go b e acc\n      | odd e     = go (b*b) (e \\`div\\` 2) (acc*b)\n      | otherwise = go (b*b) (e \\`div\\` 2) acc"
      }
    },
    {
      id: 11, title: 'Count Inversions',
      difficulty: 'Medium', tags: ['Divide and Conquer', 'Sorting'],
      description: 'Count the number of inversions in an array (pairs i < j where arr[i] > arr[j]) in O(n log n) time using modified Merge Sort.',
      examples: [
        { input: '[2,4,1,3,5]', output: '3', explanation: 'Inversions: (2,1),(4,1),(4,3)' },
        { input: '[1,2,3,4,5]', output: '0', explanation: 'Already sorted, no inversions' }
      ],
      constraints: ['1 ≤ n ≤ 10⁵', '0 ≤ arr[i] ≤ 10⁹'],
      hint: 'During merge, when you take from right before left, all remaining left elements form inversions.',
      timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun countInversions(arr: IntArray): Long {\n    if (arr.size <= 1) return 0L\n    val mid = arr.size / 2\n    val left = arr.sliceArray(0 until mid)\n    val right = arr.sliceArray(mid until arr.size)\n    var count = countInversions(left) + countInversions(right)\n    var i = 0; var j = 0; var k = 0\n    while (i < left.size && j < right.size) {\n        if (left[i] <= right[j]) { arr[k++] = left[i++] }\n        else {\n            count += left.size - i  // All remaining left > right[j]\n            arr[k++] = right[j++]\n        }\n    }\n    while (i < left.size) arr[k++] = left[i++]\n    while (j < right.size) arr[k++] = right[j++]\n    return count\n}\nfun main() { println(countInversions(intArrayOf(2,4,1,3,5))) }",
        dart: "int countInversions(List<int> arr) {\n  if (arr.length <= 1) return 0;\n  int mid = arr.length ~/ 2;\n  final left = arr.sublist(0, mid), right = arr.sublist(mid);\n  int count = countInversions(left) + countInversions(right);\n  int i=0, j=0, k=0;\n  while (i<left.length && j<right.length) {\n    if (left[i] <= right[j]) arr[k++] = left[i++];\n    else { count += left.length - i; arr[k++] = right[j++]; }\n  }\n  while (i<left.length) arr[k++] = left[i++];\n  while (j<right.length) arr[k++] = right[j++];\n  return count;\n}",
        swift: "func countInversions(_ arr: inout [Int]) -> Int {\n    if arr.count <= 1 { return 0 }\n    let mid = arr.count / 2\n    var left = Array(arr[..<mid]), right = Array(arr[mid...])\n    var count = countInversions(&left) + countInversions(&right)\n    var (i, j, k) = (0, 0, 0)\n    while i < left.count && j < right.count {\n        if left[i] <= right[j] { arr[k] = left[i]; i += 1 }\n        else { count += left.count - i; arr[k] = right[j]; j += 1 }\n        k += 1\n    }\n    while i < left.count { arr[k] = left[i]; i += 1; k += 1 }\n    while j < right.count { arr[k] = right[j]; j += 1; k += 1 }\n    return count\n}",
        haskell: "countInversions :: [Int] -> (Int, [Int])\ncountInversions []  = (0, [])\ncountInversions [x] = (0, [x])\ncountInversions xs  = (lc + rc + mc, merged)\n  where\n    mid = length xs \\`div\\` 2\n    (lc, ls) = countInversions (take mid xs)\n    (rc, rs) = countInversions (drop mid xs)\n    (mc, merged) = mergeCount ls rs\n\nmergeCount :: [Int] -> [Int] -> (Int, [Int])\nmergeCount [] ys = (0, ys)\nmergeCount xs [] = (0, xs)\nmergeCount (x:xs) (y:ys)\n  | x <= y    = let (c, m) = mergeCount xs (y:ys) in (c, x:m)\n  | otherwise = let (c, m) = mergeCount (x:xs) ys\n                in (c + length (x:xs), y:m)"
      }
    },
    {
      id: 12, title: 'Log Properties & Simplification',
      difficulty: 'Easy', tags: ['Math', 'Logarithms'],
      description: 'Simplify log expressions appearing in complexity analysis. E.g., log(n!) = Θ(n log n) by Stirling, log(2^n) = n, log(n^k) = k·log(n).',
      examples: [
        { input: 'log(n!)', output: 'Θ(n log n)', explanation: "By Stirling's: log(n!) ≈ n log n - n log e = Θ(n log n)" },
        { input: 'log₂(2^(3n))', output: '3n', explanation: 'log₂(2^(3n)) = 3n' }
      ],
      constraints: [],
      hint: "Remember: log_a(x^k) = k·log_a(x), Stirling's: n! ≈ √(2πn)·(n/e)^n",
      timeComplexity: 'O(1)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "import kotlin.math.*\n// Verify Stirling's approximation\nfun stirling(n: Int): Double {\n    val exact = (1..n).fold(1.0) { acc, i -> acc * i }\n    val approx = sqrt(2 * PI * n) * (n / E).pow(n.toDouble())\n    println(\"n! = \\$exact, Stirling \u2248 \\$approx, ratio = \\${exact/approx}\")\n    return approx\n}\n// log(n!) \u2248 n*ln(n) - n (ignoring lower order)\nfun logFactorial(n: Int): Double {\n    val exact = (1..n).sumOf { ln(it.toDouble()) }\n    val approx = n * ln(n.toDouble()) - n\n    println(\"log(n!) = \\$exact, n*ln(n)-n = \\$approx\")\n    return exact\n}\nfun main() { stirling(20); logFactorial(100) }",
        dart: "import 'dart:math';\ndouble logFactorial(int n) {\n  double exact = List.generate(n, (i) => log(i+1.0)).fold(0, (a,b) => a+b);\n  double approx = n * log(n.toDouble()) - n;\n  print('log(n!)=\\$exact approx=\\$approx');\n  return exact;\n}",
        swift: "import Foundation\nfunc logFactorial(_ n: Int) -> Double {\n    let exact = (1...n).reduce(0.0) { $0 + log(Double($1)) }\n    let approx = Double(n) * log(Double(n)) - Double(n)\n    print(\"log(n!) = \\\\(exact), n\u00b7ln(n)\u2212n = \\\\(approx)\")\n    return exact\n}",
        haskell: "import Data.List (foldl')\n\nlogFactorial :: Int -> Double\nlogFactorial n = foldl' (\\\\acc i -> acc + log (fromIntegral i)) 0 [1..n]\n\nstirlingApprox :: Int -> Double\nstirlingApprox n = let fn = fromIntegral n\n                   in sqrt (2 * pi * fn) * (fn / exp 1) ** fn\n\nmain :: IO ()\nmain = do\n  let n = 20\n  putStrLn \\$ \"log(n!) = \" ++ show (logFactorial n)\n  putStrLn \\$ \"n\u00b7log(n) = \" ++ show (fromIntegral n * log (fromIntegral n))"
      }
    },
    {
      id: 13, title: 'Fibonacci Complexity Analysis',
      difficulty: 'Medium', tags: ['Recursion', 'Big-O'],
      description: 'Analyze the time complexity of naive recursive Fibonacci: show it is O(2^n). Then compare to memoized O(n) and matrix exponentiation O(log n).',
      examples: [
        { input: 'fib(5) recursive call tree', output: 'O(2^n) time, O(n) stack space', explanation: 'T(n)=T(n-1)+T(n-2)+O(1) solves to T(n)=O(φ^n) ≈ O(1.618^n)' }
      ],
      constraints: [],
      hint: 'T(n) ≥ 2T(n-2) → T(n) ≥ 2^(n/2) = O(2^n). Golden ratio φ = (1+√5)/2 ≈ 1.618.',
      timeComplexity: 'O(2^n) naive / O(n) memo / O(log n) matrix', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "// Naive O(2^n)\nfun fibNaive(n: Int): Long = if (n <= 1) n.toLong() else fibNaive(n-1) + fibNaive(n-2)\n\n// Memoized O(n)\nval memo = HashMap<Int,Long>()\nfun fibMemo(n: Int): Long {\n    if (n <= 1) return n.toLong()\n    return memo.getOrPut(n) { fibMemo(n-1) + fibMemo(n-2) }\n}\n\n// Matrix exponentiation O(log n): [F(n+1), F(n)] = M^n * [1, 0]\nfun matMul(A: Array<LongArray>, B: Array<LongArray>): Array<LongArray> {\n    return arrayOf(\n        longArrayOf(A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]),\n        longArrayOf(A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1])\n    )\n}\nfun matPow(M: Array<LongArray>, n: Int): Array<LongArray> {\n    if (n == 1) return M\n    val half = matPow(M, n / 2)\n    val sq = matMul(half, half)\n    return if (n % 2 == 0) sq else matMul(sq, M)\n}\nfun fibMatrix(n: Int): Long {\n    if (n <= 1) return n.toLong()\n    val M = arrayOf(longArrayOf(1,1), longArrayOf(1,0))\n    return matPow(M, n)[0][1]\n}\nfun main() {\n    println(\"Naive fib(10): \\${fibNaive(10)}\")\n    println(\"Memo  fib(10): \\${fibMemo(10)}\")\n    println(\"Matrix fib(10): \\${fibMatrix(10)}\")\n}",
        dart: "// Matrix exponentiation\nList<List<int>> matMul(List<List<int>> a, List<List<int>> b) {\n  return [[a[0][0]*b[0][0]+a[0][1]*b[1][0], a[0][0]*b[0][1]+a[0][1]*b[1][1]],\n          [a[1][0]*b[0][0]+a[1][1]*b[1][0], a[1][0]*b[0][1]+a[1][1]*b[1][1]]];\n}\nList<List<int>> matPow(List<List<int>> m, int n) {\n  if (n == 1) return m;\n  final h = matPow(m, n ~/ 2);\n  final sq = matMul(h, h);\n  return n % 2 == 0 ? sq : matMul(sq, m);\n}\nint fibMatrix(int n) {\n  if (n <= 1) return n;\n  final m = [[1,1],[1,0]];\n  return matPow(m, n)[0][1];\n}",
        swift: "func fibMatrix(_ n: Int) -> Int {\n    typealias Mat = [[Int]]\n    func mul(_ a: Mat, _ b: Mat) -> Mat {\n        [[a[0][0]*b[0][0]+a[0][1]*b[1][0], a[0][0]*b[0][1]+a[0][1]*b[1][1]],\n         [a[1][0]*b[0][0]+a[1][1]*b[1][0], a[1][0]*b[0][1]+a[1][1]*b[1][1]]]\n    }\n    func pow(_ m: Mat, _ p: Int) -> Mat {\n        if p == 1 { return m }\n        let h = pow(m, p/2); let sq = mul(h, h)\n        return p % 2 == 0 ? sq : mul(sq, m)\n    }\n    if n <= 1 { return n }\n    return pow([[1,1],[1,0]], n)[0][1]\n}",
        haskell: "type Mat = [[Integer]]\n\nmatMul :: Mat -> Mat -> Mat\nmatMul a b = [[sum [a!!i!!k * b!!k!!j | k<-[0..1]] | j<-[0..1]] | i<-[0..1]]\n\nmatPow :: Mat -> Int -> Mat\nmatPow m 1 = m\nmatPow m n = let h = matPow m (n \\`div\\` 2); sq = matMul h h\n             in if even n then sq else matMul sq m\n\nfibMatrix :: Int -> Integer\nfibMatrix n\n  | n <= 1    = fromIntegral n\n  | otherwise = (matPow [[1,1],[1,0]] n) !! 0 !! 1"
      }
    },
    {
      id: 14, title: 'P vs NP — Decision Problems',
      difficulty: 'Hard', tags: ['Complexity Classes', 'Theory'],
      description: 'Classify problems as P (polynomial-time solvable), NP (polynomial-time verifiable), or NP-Complete. Show that if a poly-time verifier exists, a problem is in NP.',
      examples: [
        { input: 'Sorting: given array, is it sortable?', output: 'P — trivially in P (just sort it)', explanation: 'Merge sort solves it in O(n log n)' },
        { input: 'SAT: given boolean formula, is it satisfiable?', output: 'NP-Complete (Cook–Levin Theorem)', explanation: 'Can verify in P, but no known poly-time solver' }
      ],
      constraints: [],
      hint: 'P ⊆ NP always. The question is whether P = NP.',
      timeComplexity: 'NP-Complete: O(2^n) worst', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "// DPLL SAT solver \u2014 demonstrates exponential worst case\ndata class Literal(val variable: Int, val negated: Boolean)\ntypealias Clause = List<Literal>\ntypealias Formula = List<Clause>\n\nfun dpll(formula: Formula, assignment: Map<Int, Boolean>): Map<Int, Boolean>? {\n    val simplified = formula.mapNotNull { clause ->\n        val remaining = clause.filter { lit ->\n            assignment[lit.variable]?.let { v -> if (lit.negated) !v else v } ?: true\n        }\n        if (remaining.isEmpty()) return null // Contradiction\n        if (remaining.any { lit -> assignment[lit.variable]?.let { v -> if (lit.negated) !v else v } == true }) null\n        else remaining\n    }\n    if (simplified.isEmpty()) return assignment\n    val variable = simplified[0][0].variable\n    return dpll(simplified, assignment + (variable to true))\n        ?: dpll(simplified, assignment + (variable to false))\n}\nfun main() {\n    // (A \u2228 B) \u2227 (\u00acA \u2228 C) \u2227 (\u00acB \u2228 \u00acC)\n    val formula: Formula = listOf(\n        listOf(Literal(1,false), Literal(2,false)),\n        listOf(Literal(1,true), Literal(3,false)),\n        listOf(Literal(2,true), Literal(3,true))\n    )\n    println(dpll(formula, emptyMap()))\n}",
        dart: "// 2-SAT solver (linear time \u2014 special NP case that's in P)\nclass TwoSat {\n  int n;\n  late List<List<int>> adj, radj;\n  late List<int> order, comp;\n  late List<bool> vis;\n  TwoSat(this.n) {\n    adj = List.generate(2*n, (_) => []);\n    radj = List.generate(2*n, (_) => []);\n    order = []; comp = List.filled(2*n, -1); vis = List.filled(2*n, false);\n  }\n  // var i = 0..n-1; neg(i) = i+n\n  void addClause(int u, bool nu, int v, bool nv) {\n    int a = nu ? u+n : u, b = nv ? v+n : v;\n    adj[a^1].add(b); radj[b].add(a^1);\n    adj[b^1].add(a); radj[a].add(b^1);\n  }\n  bool solve() {\n    for (int i = 0; i < 2*n; i++) if (!vis[i]) dfs1(i);\n    int c = 0;\n    for (int v in order.reversed) if (comp[v] == -1) dfs2(v, c++);\n    return List.generate(n, (i) => comp[i] != comp[i+n]).every((x) => x);\n  }\n  void dfs1(int v) { vis[v]=true; for (int u in adj[v]) if (!vis[u]) dfs1(u); order.add(v); }\n  void dfs2(int v, int c) { comp[v]=c; for (int u in radj[v]) if (comp[u]==-1) dfs2(u,c); }\n}",
        swift: "// Brute-force SAT for small n\nfunc satSolve(_ n: Int, _ clauses: [[Int]]) -> [Int]? {\n    // Literals: positive i means var i, negative means \u00acvar i\n    for mask in 0..<(1 << n) {\n        let assignment = (0..<n).map { (mask >> $0) & 1 == 1 }\n        let satisfied = clauses.allSatisfy { clause in\n            clause.contains { lit in\n                let v = abs(lit) - 1\n                return lit > 0 ? assignment[v] : !assignment[v]\n            }\n        }\n        if satisfied { return assignment.enumerated().map { $0.element ? $0.offset+1 : -($0.offset+1) } }\n    }\n    return nil\n}",
        haskell: "-- Brute-force SAT\ntype Literal = Int  -- positive = var, negative = neg(var)\ntype Clause  = [Literal]\n\nsatSolve :: Int -> [Clause] -> Maybe [Bool]\nsatSolve n clauses = foldr tryAssign Nothing allAssignments\n  where\n    allAssignments = sequence (replicate n [True, False])\n    eval assign lit\n      | lit > 0   = assign !! (lit-1)\n      | otherwise = not (assign !! (-lit-1))\n    satisfied assign = all (any (eval assign)) clauses\n    tryAssign a acc = if satisfied a then Just a else acc"
      }
    },
    {
      id: 15, title: 'Theta Notation Proof',
      difficulty: 'Medium', tags: ['Theta', 'Proof'],
      description: 'Prove that n² + 3n + 1 = Θ(n²) by finding constants c₁, c₂, n₀ such that c₁·n² ≤ n²+3n+1 ≤ c₂·n² for all n ≥ n₀.',
      examples: [
        { input: 'f(n) = n² + 3n + 1', output: 'Θ(n²)', explanation: 'Lower: n² ≤ n²+3n+1. Upper: n²+3n+1 ≤ 5n² for n≥1.' }
      ],
      constraints: [],
      hint: 'For lower bound c₁=1 works. For upper bound, show 3n ≤ an² and 1 ≤ bn² for some small constants a,b.',
      timeComplexity: 'N/A', spaceComplexity: 'N/A',
      solutions: {
        kotlin: "// Verify \u0398(n\u00b2) constants numerically\nfun verifyTheta(n: Int): Boolean {\n    val f = n.toLong() * n + 3 * n + 1\n    val c1n2 = 1L * n * n    // c1 = 1\n    val c2n2 = 5L * n * n    // c2 = 5\n    val holds = c1n2 <= f && f <= c2n2\n    if (!holds) println(\"FAILS at n=\\$n: c1\u00b7n\u00b2=\\$c1n2, f(n)=\\$f, c2\u00b7n\u00b2=\\$c2n2\")\n    return holds\n}\nfun main() {\n    val allHold = (1..1000).all { verifyTheta(it) }\n    println(\"\u0398(n\u00b2) verified for n=1..1000: \\$allHold\")\n    println(\"c1=1, c2=5, n0=1\")\n    // Proof: n\u00b2 \u2264 n\u00b2+3n+1 always (trivially)\n    //        n\u00b2+3n+1 \u2264 5n\u00b2 \u27fa 3n+1 \u2264 4n\u00b2 \u27fa 1 \u2264 n(4n-3), true for n\u22651\n}",
        dart: "bool verifyTheta(int n) {\n  final f = n*n + 3*n + 1;\n  return n*n <= f && f <= 5*n*n;\n}\nvoid main() {\n  final ok = List.generate(1000, (i) => i+1).every(verifyTheta);\n  print('Verified: \\$ok (c1=1, c2=5, n0=1)');\n}",
        swift: "func verifyTheta(upTo limit: Int) -> Bool {\n    return (1...limit).allSatisfy { n in\n        let f = n*n + 3*n + 1\n        return n*n <= f && f <= 5*n*n\n    }\n}\nprint(\"\u0398(n\u00b2) holds: \\\\(verifyTheta(upTo: 10000))\")",
        haskell: "verifyTheta :: Int -> Bool\nverifyTheta n = n*n <= f && f <= 5*n*n\n  where f = n*n + 3*n + 1\n\nmain :: IO ()\nmain = putStrLn \\$ \"Verified 1..10000: \" ++ show (all verifyTheta [1..10000])"
      }
    },
    {
      id: 16, title: 'Binary Exponentiation Complexity',
      difficulty: 'Easy', tags: ['Big-O', 'Recursion'],
      description: 'Analyze why computing n! naively is O(n) multiplications but each multiplication can be O(n) bits, giving O(n²) total bit-complexity.',
      examples: [
        { input: 'Compute 20!', output: '2432902008176640000', explanation: '20! has 19 digits; bit complexity grows with digit count.' }
      ],
      constraints: ['n ≥ 0'],
      hint: 'Each number in the factorial computation doubles in size roughly every log₂(n) steps.',
      timeComplexity: 'O(n) multiplications, O(n²) bit ops', spaceComplexity: 'O(n) bits',
      solutions: {
        kotlin: "fun factorial(n: Int): java.math.BigInteger {\n    if (n <= 1) return java.math.BigInteger.ONE\n    var result = java.math.BigInteger.ONE\n    for (i in 2..n) result = result.multiply(java.math.BigInteger.valueOf(i.toLong()))\n    return result\n}\nfun main() {\n    for (n in listOf(10, 20, 50, 100)) {\n        val f = factorial(n)\n        println(\"n=\\$n: \\${f.toString().length} digits\")\n    }\n    // Bit complexity: sum of bits at each step \u2248 O(n\u00b2)\n}",
        dart: "BigInt factorial(int n) {\n  BigInt r = BigInt.one;\n  for (int i = 2; i <= n; i++) r *= BigInt.from(i);\n  return r;\n}\nvoid main() {\n  [10, 20, 50, 100].forEach((n) =>\n    print('n=\\$n: \\${factorial(n).toString().length} digits'));\n}",
        swift: "// Swift doesn't have arbitrary precision out of the box; use Python-style\nfunc factorialDigitCount(_ n: Int) -> Int {\n    // Use Stirling: log\u2081\u2080(n!) \u2248 n\u00b7log\u2081\u2080(n) - n\u00b7log\u2081\u2080(e) + 0.5\u00b7log\u2081\u2080(2\u03c0n)\n    import Foundation\n    if n == 0 { return 1 }\n    let logFact = (1...n).reduce(0.0) { $0 + log10(Double($1)) }\n    return Int(logFact) + 1\n}",
        haskell: "factorial :: Integer -> Integer\nfactorial n = product [1..n]\n\ndigitCount :: Integer -> Int\ndigitCount = length . show\n\nmain :: IO ()\nmain = mapM_ (\\\\n -> putStrLn \\$\n  \"n=\" ++ show n ++ \": \" ++ show (digitCount (factorial n)) ++ \" digits\")\n  [10, 20, 50, 100]"
      }
    },
    {
      id: 17, title: 'Complexity of String Algorithms',
      difficulty: 'Medium', tags: ['String', 'Big-O'],
      description: 'Analyze the time complexity of naive pattern matching O(nm) vs KMP O(n+m). Implement both and benchmark.',
      examples: [
        { input: 'text="AABAACAADAABAABA", pattern="AABA"', output: '[0, 9, 12]', explanation: 'Pattern found at indices 0, 9, 12' }
      ],
      constraints: ['n = len(text)', 'm = len(pattern)'],
      hint: 'Naive: for each position in text, try all pattern positions. KMP: use failure function to avoid re-comparisons.',
      timeComplexity: 'O(nm) naive / O(n+m) KMP', spaceComplexity: 'O(m) for failure fn',
      solutions: {
        kotlin: "// Naive O(nm)\nfun naiveSearch(text: String, pattern: String): List<Int> {\n    val result = mutableListOf<Int>()\n    val n = text.length; val m = pattern.length\n    for (i in 0..n - m) {\n        if (text.substring(i, i + m) == pattern) result.add(i)\n    }\n    return result\n}\n// KMP O(n+m)\nfun kmpSearch(text: String, pattern: String): List<Int> {\n    val n = text.length; val m = pattern.length\n    val fail = IntArray(m)\n    var k = 0\n    for (i in 1 until m) {\n        while (k > 0 && pattern[k] != pattern[i]) k = fail[k - 1]\n        if (pattern[k] == pattern[i]) k++\n        fail[i] = k\n    }\n    val result = mutableListOf<Int>(); k = 0\n    for (i in text.indices) {\n        while (k > 0 && pattern[k] != text[i]) k = fail[k - 1]\n        if (pattern[k] == text[i]) k++\n        if (k == m) { result.add(i - m + 1); k = fail[k - 1] }\n    }\n    return result\n}\nfun main() { println(kmpSearch(\"AABAACAADAABAABA\", \"AABA\")) }",
        dart: "List<int> kmpSearch(String text, String pattern) {\n  int n = text.length, m = pattern.length;\n  List<int> fail = List.filled(m, 0);\n  int k = 0;\n  for (int i = 1; i < m; i++) {\n    while (k > 0 && pattern[k] != pattern[i]) k = fail[k-1];\n    if (pattern[k] == pattern[i]) k++;\n    fail[i] = k;\n  }\n  List<int> res = []; k = 0;\n  for (int i = 0; i < n; i++) {\n    while (k > 0 && pattern[k] != text[i]) k = fail[k-1];\n    if (pattern[k] == text[i]) k++;\n    if (k == m) { res.add(i - m + 1); k = fail[k-1]; }\n  }\n  return res;\n}",
        swift: "func kmpSearch(_ text: String, _ pattern: String) -> [Int] {\n    let t = Array(text), p = Array(pattern)\n    let n = t.count, m = p.count\n    var fail = Array(repeating: 0, count: m), k = 0\n    for i in 1..<m {\n        while k > 0 && p[k] != p[i] { k = fail[k-1] }\n        if p[k] == p[i] { k += 1 }\n        fail[i] = k\n    }\n    var res = [Int](); k = 0\n    for i in 0..<n {\n        while k > 0 && p[k] != t[i] { k = fail[k-1] }\n        if p[k] == t[i] { k += 1 }\n        if k == m { res.append(i - m + 1); k = fail[k-1] }\n    }\n    return res\n}",
        haskell: "kmpSearch :: String -> String -> [Int]\nkmpSearch text pattern = go text 0 0\n  where\n    m   = length pattern\n    pat = pattern\n    fail = buildFail pat\n    go [] _ _ = []\n    go (c:cs) i k\n      | k' == m   = (i - m + 1) : go cs (i+1) (fail !! (k'-1))\n      | otherwise = go cs (i+1) k'\n      where\n        k'' = let kk = if k > 0 && pat !! k /= c then fail !! (k-1) else k\n              in kk\n        k'  = if pat !! k'' == c then k''+1 else k''\n\nbuildFail :: String -> [Int]\nbuildFail p = tail \\$ foldl step [0] [1..length p - 1]\n  where\n    step acc i = acc ++ [go (last acc) i]\n    go k i | k > 0 && p !! k /= p !! i = go (acc !! (k-1)) i\n           | p !! k == p !! i           = k+1\n           | otherwise                   = 0\n    acc = buildFail p"
      }
    },
    {
      id: 18, title: 'Tight vs. Loose Bounds',
      difficulty: 'Medium', tags: ['Big-O', 'Analysis'],
      description: 'For Insertion Sort, show that: (1) worst case is Θ(n²), (2) best case is Θ(n), and (3) average case is Θ(n²). A tight bound captures both upper and lower.',
      examples: [
        { input: '[5,4,3,2,1] (reverse sorted)', output: 'Θ(n²) — worst case', explanation: 'Each element shifts past all previous.' },
        { input: '[1,2,3,4,5] (sorted)', output: 'Θ(n) — best case', explanation: 'No shifts needed, just n-1 comparisons.' }
      ],
      constraints: [],
      hint: 'Best case: input already sorted. Worst case: input reverse sorted.',
      timeComplexity: 'Θ(n²) worst/avg, Θ(n) best', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun insertionSort(arr: IntArray): Pair<IntArray, Long> {\n    var comparisons = 0L\n    for (i in 1 until arr.size) {\n        val key = arr[i]; var j = i - 1\n        while (j >= 0 && arr[j] > key) {\n            comparisons++\n            arr[j + 1] = arr[j]; j--\n        }\n        comparisons++  // final comparison\n        arr[j + 1] = key\n    }\n    return Pair(arr, comparisons)\n}\nfun main() {\n    val n = 10\n    // Worst case: reverse sorted\n    val worst = IntArray(n) { n - it }\n    val (_, wc) = insertionSort(worst)\n    println(\"Worst case comparisons: \\$wc (expected \u2248 \\${n*(n-1)/2})\")\n    // Best case: sorted\n    val best = IntArray(n) { it }\n    val (_, bc) = insertionSort(best)\n    println(\"Best case comparisons: \\$bc (expected \u2248 \\$n)\")\n}",
        dart: "(List<int>, int) insertionSort(List<int> arr) {\n  int comps = 0;\n  for (int i = 1; i < arr.length; i++) {\n    int key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) { comps++; arr[j+1] = arr[j]; j--; }\n    comps++; arr[j+1] = key;\n  }\n  return (arr, comps);\n}",
        swift: "@discardableResult\nfunc insertionSort(_ arr: inout [Int]) -> Int {\n    var comparisons = 0\n    for i in 1..<arr.count {\n        let key = arr[i]; var j = i - 1\n        while j >= 0 && arr[j] > key { comparisons += 1; arr[j+1] = arr[j]; j -= 1 }\n        comparisons += 1; arr[j+1] = key\n    }\n    return comparisons\n}",
        haskell: "insertionSort :: Ord a => [a] -> [a]\ninsertionSort = foldr insert []\n  where\n    insert x [] = [x]\n    insert x (y:ys)\n      | x <= y    = x : y : ys\n      | otherwise = y : insert x ys\n\n-- Count comparisons\ninsertionSortCount :: Ord a => [a] -> Int\ninsertionSortCount xs = sum (zipWith countInsert [0..] xs)\n  where\n    sorted = scanl (flip insert) [] xs\n    insert x [] = [x]\n    insert x (y:ys) = if x <= y then x:y:ys else y : insert x ys\n    countInsert i _ = i  -- O(i) comparisons for i-th element"
      }
    },
    {
      id: 19, title: 'Omega Notation & Lower Bounds',
      difficulty: 'Hard', tags: ['Omega', 'Lower Bound', 'Proof'],
      description: 'Prove that any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case. Use the decision tree model.',
      examples: [
        { input: 'Any comparison-based sort', output: 'Ω(n log n) comparisons', explanation: 'Decision tree has n! leaves; height ≥ log₂(n!) = Θ(n log n) by Stirling.' }
      ],
      constraints: [],
      hint: 'A decision tree for sorting n elements must have at least n! leaves (all permutations). A binary tree with n! leaves has height ≥ ⌈log₂(n!)⌉.',
      timeComplexity: 'Ω(n log n) lower bound', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "import kotlin.math.*\nfun lowerBoundSorting(n: Int): Double {\n    // log2(n!) by Stirling: n*log2(n) - n*log2(e)\n    val logFactorial = (1..n).sumOf { log2(it.toDouble()) }\n    val stirling = n * log2(n.toDouble()) - n / ln(2.0)\n    println(\"n=\\$n: log2(n!)=\\${logFactorial.toInt()}, Stirling\u2248\\${stirling.toInt()}\")\n    println(\"\u2192 Any comparison sort needs \u2265 \\${logFactorial.toInt()} comparisons\")\n    return logFactorial\n}\n// Optimal: Merge Sort achieves \u0398(n log n) = matches lower bound\nfun main() {\n    listOf(5, 10, 20, 100).forEach { lowerBoundSorting(it) }\n}",
        dart: "import 'dart:math';\ndouble lowerBoundSorting(int n) {\n  double log2nFact = List.generate(n, (i) => log(i+1)/log(2)).fold(0, (a,b) => a+b);\n  print('n=\\$n: lower bound = \\${log2nFact.toInt()} comparisons');\n  return log2nFact;\n}",
        swift: "import Foundation\nfunc lowerBoundSorting(_ n: Int) {\n    let log2Fact = (1...n).reduce(0.0) { $0 + log2(Double($1)) }\n    print(\"n=\\\\(n): lower bound = \\\\(Int(log2Fact)) comparisons (\u03a9(n log n))\")\n}",
        haskell: "lowerBound :: Int -> Double\nlowerBound n = sum [logBase 2 (fromIntegral i) | i <- [1..n]]\n  -- = log2(n!) >= n*log2(n) - n/ln(2)  by Stirling\n\nmain :: IO ()\nmain = mapM_ (\\\\n -> putStrLn \\$\n  \"n=\" ++ show n ++ \": \u03a9(n log n) = \" ++ show (round (lowerBound n)) ++ \" comparisons\")\n  [5, 10, 20, 100]"
      }
    },
    {
      id: 20, title: 'Average-Case Complexity of QuickSort',
      difficulty: 'Hard', tags: ['QuickSort', 'Expected Complexity'],
      description: 'Prove that QuickSort\'s expected time complexity is O(n log n) when using a random pivot. Show T(n) = O(n log n) using indicator random variables.',
      examples: [
        { input: 'Random pivot QuickSort on n elements', output: 'E[T(n)] = O(n log n)', explanation: 'Expected number of comparisons = 2(n+1)Hₙ ≈ 2n ln n' }
      ],
      constraints: ['Random pivot selection'],
      hint: 'E[comparisons of i-th and j-th element] = 2/(j-i+1) using indicator variables. Sum over all pairs.',
      timeComplexity: 'O(n log n) expected', spaceComplexity: 'O(log n) expected stack',
      solutions: {
        kotlin: "import kotlin.random.Random\nfun quickSort(arr: IntArray, lo: Int = 0, hi: Int = arr.size - 1): Long {\n    if (lo >= hi) return 0L\n    var comps = 0L\n    val pivotIdx = Random.nextInt(lo, hi + 1)\n    val pivot = arr[pivotIdx]\n    arr[pivotIdx] = arr[hi]; arr[hi] = pivot\n    var i = lo - 1\n    for (j in lo until hi) {\n        comps++\n        if (arr[j] <= pivot) { i++; arr[i] = arr[j].also { arr[j] = arr[i] } }\n    }\n    arr[i + 1] = arr[hi].also { arr[hi] = arr[i + 1] }\n    val p = i + 1\n    return comps + quickSort(arr, lo, p - 1) + quickSort(arr, p + 1, hi)\n}\nfun main() {\n    val n = 1000\n    val trials = 100\n    val avgComps = (1..trials).map { trial ->\n        val arr = IntArray(n) { it }; arr.shuffle()\n        quickSort(arr)\n    }.average()\n    println(\"n=\\$n, average comparisons=\\${avgComps.toInt()}\")\n    println(\"2(n+1)*H\u2099 \u2248 \\${(2*(n+1)*Math.log((n+1).toDouble())).toInt()}\")\n}",
        dart: "import 'dart:math';\nint quickSort(List<int> arr, int lo, int hi) {\n  if (lo >= hi) return 0;\n  int comps = 0;\n  int pivotIdx = lo + Random().nextInt(hi - lo + 1);\n  int tmp = arr[pivotIdx]; arr[pivotIdx] = arr[hi]; arr[hi] = tmp;\n  int pivot = arr[hi], i = lo - 1;\n  for (int j = lo; j < hi; j++) {\n    comps++;\n    if (arr[j] <= pivot) { i++; int t=arr[i]; arr[i]=arr[j]; arr[j]=t; }\n  }\n  i++; tmp=arr[i]; arr[i]=arr[hi]; arr[hi]=tmp;\n  return comps + quickSort(arr, lo, i-1) + quickSort(arr, i+1, hi);\n}",
        swift: "func quickSort(_ arr: inout [Int], _ lo: Int, _ hi: Int) -> Int {\n    if lo >= hi { return 0 }\n    var comps = 0\n    let pivotIdx = Int.random(in: lo...hi)\n    arr.swapAt(pivotIdx, hi)\n    let pivot = arr[hi]; var i = lo - 1\n    for j in lo..<hi { comps += 1; if arr[j] <= pivot { i += 1; arr.swapAt(i, j) } }\n    arr.swapAt(i+1, hi)\n    return comps + quickSort(&arr, lo, i) + quickSort(&arr, i+2, hi)\n}",
        haskell: "import System.Random\nimport Data.List (partition)\n\nquickSort :: [Int] -> [Int]\nquickSort [] = []\nquickSort (x:xs) = quickSort smaller ++ [x] ++ quickSort larger\n  where (smaller, larger) = partition (<= x) xs\n\n-- Expected comparison count (theoretical)\nexpectedComparisons :: Int -> Double\nexpectedComparisons n = 2 * fromIntegral (n+1) * sum [1/fromIntegral i | i<-[1..n]]"
      }
    }
  ]
}
