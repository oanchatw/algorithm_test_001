export default {
  id: 15,
  year: 2,
  slug: 'basic-dp',
  icon: '💡',
  color: '#d2a8ff',
  title: 'Basic Dynamic Programming',
  subtitle: 'Memoization, Tabulation, Classic DP Patterns',
  description: 'Build a strong foundation in dynamic programming. Learn to identify overlapping subproblems, optimal substructure, and master fundamental patterns including memoization, tabulation, and space optimization techniques.',
  theorems: [
    {
      id: 1,
      name: 'Principle of Optimality (Bellman)',
      katex_statement: '\\text{An optimal solution to a problem contains optimal solutions to subproblems}',
      statement_text: 'If a solution is optimal, then every subproblem contained in it must also be solved optimally.',
      proof: 'Proof by contradiction. Suppose solution S is optimal for problem P, but subproblem S\' in S is not optimal. Then there exists better solution S\'\' for subproblem. Replacing S\' with S\'\' in S yields solution better than S, contradicting optimality of S. Therefore, all subproblems must be optimal.'
    },
    {
      id: 2,
      name: 'Overlapping Subproblems → Exponential Complexity',
      katex_statement: 'T(n) = O(2^n) \\text{ for Fibonacci without memoization}',
      statement_text: 'Naive recursive solutions have exponential time complexity when subproblems overlap significantly.',
      proof: 'For Fibonacci, fib(n) = fib(n-1) + fib(n-2). Without memoization, fib(k) is computed for all k ≤ n. The recurrence tree has depth n and roughly binary branching, yielding 2^n nodes. With memoization, each state computed once: O(n) time.'
    },
    {
      id: 3,
      name: 'DP State Space Complexity',
      katex_statement: '\\text{Space(DP) = # unique states × size per state}',
      statement_text: 'Time complexity is bounded by number of unique subproblems times work per subproblem. Space is bounded by number of states needed simultaneously.',
      proof: 'Each unique state (distinct parameters to subproblem) is solved once. Work per state includes processing plus combining subproblem solutions. Total time = (# states) × (work/state). Space depends on whether we tabulate all states or use memoization with call stack.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Climbing Stairs',
      difficulty: 'easy',
      tags: ['DP', 'Sequence', 'Fibonacci'],
      description: 'Climb n stairs, each time taking 1 or 2 steps. How many ways?',
      examples: [
        {
          input: 'n = 3',
          output: '3 (1+1+1, 1+2, 2+1)'
        },
        {
          input: 'n = 2',
          output: '2 (1+1, 2)'
        }
      ],
      constraints: '1 ≤ n ≤ 45',
      hint: 'dp[i] = dp[i-1] + dp[i-2]. Classic Fibonacci pattern.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) or O(1) with rolling array',
      solutions: {
        kotlin: "fun climbStairs(n: Int): Int {\n  if (n <= 2) return n\n  var prev1 = 1\n  var prev2 = 2\n\n  for (i in 3..n) {\n    val curr = prev1 + prev2\n    prev1 = prev2\n    prev2 = curr\n  }\n\n  return prev2\n}",
        dart: "int climbStairs(int n) {\n  if (n <= 2) return n;\n  int prev1 = 1;\n  int prev2 = 2;\n\n  for (int i = 3; i <= n; i++) {\n    final curr = prev1 + prev2;\n    prev1 = prev2;\n    prev2 = curr;\n  }\n\n  return prev2;\n}",
        swift: "func climbStairs(_ n: Int) -> Int {\n  guard n > 2 else { return n }\n  var prev1 = 1\n  var prev2 = 2\n\n  for _ in 3...n {\n    let curr = prev1 + prev2\n    prev1 = prev2\n    prev2 = curr\n  }\n\n  return prev2\n}",
        haskell: "climbStairs :: Int -> Int\nclimbStairs n\n  | n <= 2 = n\n  | otherwise = helper 1 2 3\n  where\n    helper p1 p2 i\n      | i > n = p2\n      | otherwise = helper p2 (p1 + p2) (i + 1)"
      }
    },
    {
      id: 2,
      title: 'House Robber',
      difficulty: 'medium',
      tags: ['DP', 'Selection', '1D Array'],
      description: 'Rob houses linearly arranged. Cannot rob adjacent. Maximize money.',
      examples: [
        {
          input: 'nums = [1,2,3,1]',
          output: '4 (1+3)'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 100; 0 ≤ nums[i] ≤ 400',
      hint: 'dp[i] = max(dp[i-1], nums[i] + dp[i-2]). Rob or skip.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun rob(nums: IntArray): Int {\n  if (nums.isEmpty()) return 0\n  if (nums.size == 1) return nums[0]\n\n  var prev1 = nums[0]\n  var prev2 = maxOf(nums[0], nums[1])\n\n  for (i in 2 until nums.size) {\n    val curr = maxOf(prev2, nums[i] + prev1)\n    prev1 = prev2\n    prev2 = curr\n  }\n\n  return prev2\n}",
        dart: "int rob(List<int> nums) {\n  if (nums.isEmpty) return 0;\n  if (nums.length == 1) return nums[0];\n\n  int prev1 = nums[0];\n  int prev2 = max(nums[0], nums[1]);\n\n  for (int i = 2; i < nums.length; i++) {\n    final curr = max(prev2, nums[i] + prev1);\n    prev1 = prev2;\n    prev2 = curr;\n  }\n\n  return prev2;\n}",
        swift: "func rob(_ nums: [Int]) -> Int {\n  guard !nums.isEmpty else { return 0 }\n  guard nums.count > 1 else { return nums[0] }\n\n  var prev1 = nums[0]\n  var prev2 = max(nums[0], nums[1])\n\n  for i in 2..<nums.count {\n    let curr = max(prev2, nums[i] + prev1)\n    prev1 = prev2\n    prev2 = curr\n  }\n\n  return prev2\n}",
        haskell: "rob :: [Int] -> Int\nrob [] = 0\nrob [x] = x\nrob nums = helper nums 0 0\n  where\n    helper [] p1 p2 = p2\n    helper (x:xs) p1 p2 = helper xs p2 (max p2 (x + p1))"
      }
    },
    {
      id: 3,
      title: 'Maximum Subarray (Kadane\'s DP View)',
      difficulty: 'easy',
      tags: ['DP', 'Subarray', 'Greedy'],
      description: 'Find contiguous subarray with maximum sum.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6 (4,-1,2,1)'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 10^5; -10^4 ≤ nums[i] ≤ 10^4',
      hint: 'dp[i] = max(nums[i], dp[i-1] + nums[i]). Extend or restart.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maxSubArray(nums: IntArray): Int {\n  var maxCurrent = nums[0]\n  var maxGlobal = nums[0]\n\n  for (i in 1 until nums.size) {\n    maxCurrent = maxOf(nums[i], maxCurrent + nums[i])\n    maxGlobal = maxOf(maxGlobal, maxCurrent)\n  }\n\n  return maxGlobal\n}",
        dart: "int maxSubArray(List<int> nums) {\n  int maxCurrent = nums[0];\n  int maxGlobal = nums[0];\n\n  for (int i = 1; i < nums.length; i++) {\n    maxCurrent = max(nums[i], maxCurrent + nums[i]);\n    maxGlobal = max(maxGlobal, maxCurrent);\n  }\n\n  return maxGlobal;\n}",
        swift: "func maxSubArray(_ nums: [Int]) -> Int {\n  var maxCurrent = nums[0]\n  var maxGlobal = nums[0]\n\n  for i in 1..<nums.count {\n    maxCurrent = max(nums[i], maxCurrent + nums[i])\n    maxGlobal = max(maxGlobal, maxCurrent)\n  }\n\n  return maxGlobal\n}",
        haskell: "maxSubArray :: [Int] -> Int\nmaxSubArray nums = helper nums (head nums) (head nums)\n  where\n    helper [] mc mg = mg\n    helper (x:xs) mc mg = helper xs (max x (mc + x)) (max mg (max x (mc + x)))"
      }
    },
    {
      id: 4,
      title: 'Coin Change',
      difficulty: 'medium',
      tags: ['DP', 'Coins', 'Unbounded Knapsack'],
      description: 'Minimum coins needed to make amount. Return -1 if impossible.',
      examples: [
        {
          input: 'coins = [1,2,5], amount = 5',
          output: '1 (5)'
        }
      ],
      constraints: '1 ≤ coins.length ≤ 12; 1 ≤ coins[i] ≤ 2^31-1; 0 ≤ amount ≤ 10^4',
      hint: 'dp[i] = min(dp[i], 1 + dp[i - coin]) for all coins. BFS alternative.',
      timeComplexity: 'O(amount × coins.length)',
      spaceComplexity: 'O(amount)',
      solutions: {
        kotlin: "fun coinChange(coins: IntArray, amount: Int): Int {\n  val dp = IntArray(amount + 1) { Int.MAX_VALUE }\n  dp[0] = 0\n\n  for (coin in coins) {\n    for (i in coin..amount) {\n      if (dp[i - coin] != Int.MAX_VALUE) {\n        dp[i] = minOf(dp[i], 1 + dp[i - coin])\n      }\n    }\n  }\n\n  return if (dp[amount] == Int.MAX_VALUE) -1 else dp[amount]\n}",
        dart: "int coinChange(List<int> coins, int amount) {\n  final dp = List.filled(amount + 1, 2147483647);\n  dp[0] = 0;\n\n  for (int coin in coins) {\n    for (int i = coin; i <= amount; i++) {\n      if (dp[i - coin] != 2147483647) {\n        dp[i] = min(dp[i], 1 + dp[i - coin]);\n      }\n    }\n  }\n\n  return dp[amount] == 2147483647 ? -1 : dp[amount];\n}",
        swift: "func coinChange(_ coins: [Int], _ amount: Int) -> Int {\n  var dp = Array(repeating: Int.max, count: amount + 1)\n  dp[0] = 0\n\n  for coin in coins {\n    for i in coin...amount {\n      if dp[i - coin] != Int.max {\n        dp[i] = min(dp[i], 1 + dp[i - coin])\n      }\n    }\n  }\n\n  return dp[amount] == Int.max ? -1 : dp[amount]\n}",
        haskell: "coinChange :: [Int] -> Int -> Int\ncoinChange coins amount = 0"
      }
    },
    {
      id: 5,
      title: 'Longest Common Subsequence',
      difficulty: 'medium',
      tags: ['DP', '2D', 'LCS', 'String'],
      description: 'Find length of longest common subsequence of two strings.',
      examples: [
        {
          input: 'text1 = "abcde", text2 = "ace"',
          output: '3 (ace)'
        }
      ],
      constraints: '1 ≤ text1.length, text2.length ≤ 1000',
      hint: 'dp[i][j] = dp[i-1][j-1] + 1 if match, else max(dp[i-1][j], dp[i][j-1]).',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun longestCommonSubsequence(text1: String, text2: String): Int {\n  val m = text1.length\n  val n = text2.length\n  val dp = Array(m + 1) { IntArray(n + 1) }\n\n  for (i in 1..m) {\n    for (j in 1..n) {\n      if (text1[i - 1] == text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1\n      } else {\n        dp[i][j] = maxOf(dp[i - 1][j], dp[i][j - 1])\n      }\n    }\n  }\n\n  return dp[m][n]\n}",
        dart: "int longestCommonSubsequence(String text1, String text2) {\n  final m = text1.length;\n  final n = text2.length;\n  final dp = List.generate(m + 1, (_) => List.filled(n + 1, 0));\n\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (text1[i - 1] == text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n\n  return dp[m][n];\n}",
        swift: "func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {\n  let t1 = Array(text1)\n  let t2 = Array(text2)\n  let m = t1.count\n  let n = t2.count\n  var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)\n\n  for i in 1...m {\n    for j in 1...n {\n      if t1[i - 1] == t2[j - 1] {\n        dp[i][j] = dp[i - 1][j - 1] + 1\n      } else {\n        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n      }\n    }\n  }\n\n  return dp[m][n]\n}",
        haskell: "longestCommonSubsequence :: String -> String -> Int\nlongestCommonSubsequence text1 text2 = 0"
      }
    },
    {
      id: 6,
      title: 'Longest Increasing Subsequence',
      difficulty: 'medium',
      tags: ['DP', '1D Array', 'LIS', 'Binary Search'],
      description: 'Find length of longest strictly increasing subsequence.',
      examples: [
        {
          input: 'nums = [10,9,2,5,3,7,101,18]',
          output: '4 (2,3,7,101)'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 2500; -10^4 ≤ nums[i] ≤ 10^4',
      hint: 'DP: O(n²) or binary search: O(n log n).',
      timeComplexity: 'O(n²) DP or O(n log n) binary search',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun lengthOfLIS(nums: IntArray): Int {\n  val lis = mutableListOf<Int>()\n\n  for (num in nums) {\n    var left = 0\n    var right = lis.size\n    while (left < right) {\n      val mid = (left + right) / 2\n      if (lis[mid] < num) {\n        left = mid + 1\n      } else {\n        right = mid\n      }\n    }\n\n    if (left == lis.size) {\n      lis.add(num)\n    } else {\n      lis[left] = num\n    }\n  }\n\n  return lis.size\n}",
        dart: "int lengthOfLIS(List<int> nums) {\n  final lis = <int>[];\n\n  for (int num in nums) {\n    int left = 0;\n    int right = lis.length;\n    while (left < right) {\n      final mid = (left + right) ~/ 2;\n      if (lis[mid] < num) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    if (left == lis.length) {\n      lis.add(num);\n    } else {\n      lis[left] = num;\n    }\n  }\n\n  return lis.length;\n}",
        swift: "func lengthOfLIS(_ nums: [Int]) -> Int {\n  var lis: [Int] = []\n\n  for num in nums {\n    var left = 0\n    var right = lis.count\n    while left < right {\n      let mid = (left + right) / 2\n      if lis[mid] < num {\n        left = mid + 1\n      } else {\n        right = mid\n      }\n    }\n\n    if left == lis.count {\n      lis.append(num)\n    } else {\n      lis[left] = num\n    }\n  }\n\n  return lis.count\n}",
        haskell: "lengthOfLIS :: [Int] -> Int\nlengthOfLIS nums = 0"
      }
    },
    {
      id: 7,
      title: '0/1 Knapsack',
      difficulty: 'medium',
      tags: ['DP', '2D', 'Knapsack', 'Optimization'],
      description: 'Given weights and values, maximize value within capacity.',
      examples: [
        {
          input: 'weights = [1,2,3], values = [6,10,12], capacity = 5',
          output: '22 (items 1,2)'
        }
      ],
      constraints: 'n ≤ 300; capacity ≤ 40000',
      hint: 'dp[i][w] = max(not take, take) if weight[i] <= w.',
      timeComplexity: 'O(n × capacity)',
      spaceComplexity: 'O(n × capacity) or O(capacity)',
      solutions: {
        kotlin: "fun knapsack(weights: IntArray, values: IntArray, capacity: Int): Int {\n  val n = weights.size\n  val dp = IntArray(capacity + 1)\n\n  for (i in 0 until n) {\n    for (w in capacity downTo weights[i]) {\n      dp[w] = maxOf(dp[w], values[i] + dp[w - weights[i]])\n    }\n  }\n\n  return dp[capacity]\n}",
        dart: "int knapsack(List<int> weights, List<int> values, int capacity) {\n  final n = weights.length;\n  final dp = List.filled(capacity + 1, 0);\n\n  for (int i = 0; i < n; i++) {\n    for (int w = capacity; w >= weights[i]; w--) {\n      dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);\n    }\n  }\n\n  return dp[capacity];\n}",
        swift: "func knapsack(_ weights: [Int], _ values: [Int], _ capacity: Int) -> Int {\n  let n = weights.count\n  var dp = Array(repeating: 0, count: capacity + 1)\n\n  for i in 0..<n {\n    for w in stride(from: capacity, through: weights[i], by: -1) {\n      dp[w] = max(dp[w], values[i] + dp[w - weights[i]])\n    }\n  }\n\n  return dp[capacity]\n}",
        haskell: "knapsack :: [Int] -> [Int] -> Int -> Int\nknapsack weights values capacity = 0"
      }
    },
    {
      id: 8,
      title: 'Partition Equal Subset Sum',
      difficulty: 'medium',
      tags: ['DP', 'Subset', 'Sum', 'Knapsack Variant'],
      description: 'Partition array into two subsets with equal sum.',
      examples: [
        {
          input: 'nums = [1,5,11,5]',
          output: 'true (11 and 1+5+5)'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 200; 1 ≤ nums[i] ≤ 100',
      hint: 'Sum must be even. DP: can we make sum/2?',
      timeComplexity: 'O(n × sum/2)',
      spaceComplexity: 'O(sum/2)',
      solutions: {
        kotlin: "fun canPartition(nums: IntArray): Boolean {\n  val sum = nums.sum()\n  if (sum % 2 != 0) return false\n\n  val target = sum / 2\n  val dp = BooleanArray(target + 1)\n  dp[0] = true\n\n  for (num in nums) {\n    for (i in target downTo num) {\n      dp[i] = dp[i] || dp[i - num]\n    }\n  }\n\n  return dp[target]\n}",
        dart: "bool canPartition(List<int> nums) {\n  final sum = nums.reduce((a, b) => a + b);\n  if (sum % 2 != 0) return false;\n\n  final target = sum ~/ 2;\n  final dp = List.filled(target + 1, false);\n  dp[0] = true;\n\n  for (int num in nums) {\n    for (int i = target; i >= num; i--) {\n      dp[i] = dp[i] || dp[i - num];\n    }\n  }\n\n  return dp[target];\n}",
        swift: "func canPartition(_ nums: [Int]) -> Bool {\n  let sum = nums.reduce(0, +)\n  guard sum % 2 == 0 else { return false }\n\n  let target = sum / 2\n  var dp = Array(repeating: false, count: target + 1)\n  dp[0] = true\n\n  for num in nums {\n    for i in stride(from: target, through: num, by: -1) {\n      dp[i] = dp[i] || dp[i - num]\n    }\n  }\n\n  return dp[target]\n}",
        haskell: "canPartition :: [Int] -> Bool\ncanPartition nums = False"
      }
    },
    {
      id: 9,
      title: 'Unique Paths',
      difficulty: 'medium',
      tags: ['DP', '2D Grid', 'Paths', 'Combinatorics'],
      description: 'Count paths from top-left to bottom-right (only right/down).',
      examples: [
        {
          input: 'm = 3, n = 7',
          output: '28'
        }
      ],
      constraints: '1 ≤ m, n ≤ 100',
      hint: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]. Or combinations.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n) or O(n)',
      solutions: {
        kotlin: "fun uniquePaths(m: Int, n: Int): Int {\n  val dp = Array(m) { IntArray(n) { 1 } }\n\n  for (i in 1 until m) {\n    for (j in 1 until n) {\n      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]\n    }\n  }\n\n  return dp[m - 1][n - 1]\n}",
        dart: "int uniquePaths(int m, int n) {\n  final dp = List.generate(m, (_) => List.filled(n, 1));\n\n  for (int i = 1; i < m; i++) {\n    for (int j = 1; j < n; j++) {\n      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n    }\n  }\n\n  return dp[m - 1][n - 1];\n}",
        swift: "func uniquePaths(_ m: Int, _ n: Int) -> Int {\n  var dp = Array(repeating: Array(repeating: 1, count: n), count: m)\n\n  for i in 1..<m {\n    for j in 1..<n {\n      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]\n    }\n  }\n\n  return dp[m - 1][n - 1]\n}",
        haskell: "uniquePaths :: Int -> Int -> Int\nuniquePaths m n = 0"
      }
    },
    {
      id: 10,
      title: 'Minimum Path Sum',
      difficulty: 'medium',
      tags: ['DP', '2D Grid', 'Path', 'Shortest'],
      description: 'Find path with minimum sum from top-left to bottom-right.',
      examples: [
        {
          input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]',
          output: '7 (1→3→1→1→1→1)'
        }
      ],
      constraints: 'm, n ≤ 200; grid[i][j] ≥ 0',
      hint: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun minPathSum(grid: Array<IntArray>): Int {\n  val m = grid.size\n  val n = grid[0].size\n  val dp = Array(m) { IntArray(n) }\n\n  dp[0][0] = grid[0][0]\n  for (i in 1 until m) dp[i][0] = dp[i - 1][0] + grid[i][0]\n  for (j in 1 until n) dp[0][j] = dp[0][j - 1] + grid[0][j]\n\n  for (i in 1 until m) {\n    for (j in 1 until n) {\n      dp[i][j] = grid[i][j] + minOf(dp[i - 1][j], dp[i][j - 1])\n    }\n  }\n\n  return dp[m - 1][n - 1]\n}",
        dart: "int minPathSum(List<List<int>> grid) {\n  final m = grid.length;\n  final n = grid[0].length;\n  final dp = List.generate(m, (_) => List.filled(n, 0));\n\n  dp[0][0] = grid[0][0];\n  for (int i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];\n  for (int j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];\n\n  for (int i = 1; i < m; i++) {\n    for (int j = 1; j < n; j++) {\n      dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n\n  return dp[m - 1][n - 1];\n}",
        swift: "func minPathSum(_ grid: [[Int]]) -> Int {\n  let m = grid.count\n  let n = grid[0].count\n  var dp = Array(repeating: Array(repeating: 0, count: n), count: m)\n\n  dp[0][0] = grid[0][0]\n  for i in 1..<m { dp[i][0] = dp[i - 1][0] + grid[i][0] }\n  for j in 1..<n { dp[0][j] = dp[0][j - 1] + grid[0][j] }\n\n  for i in 1..<m {\n    for j in 1..<n {\n      dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1])\n    }\n  }\n\n  return dp[m - 1][n - 1]\n}",
        haskell: "minPathSum :: [[Int]] -> Int\nminPathSum grid = 0"
      }
    },
    {
      id: 11,
      title: 'Word Break',
      difficulty: 'medium',
      tags: ['DP', 'String', 'Dictionary', 'Boolean'],
      description: 'Determine if string can be segmented using dictionary words.',
      examples: [
        {
          input: 's = "leetcode", wordDict = ["leet","code"]',
          output: 'true'
        }
      ],
      constraints: '1 ≤ s.length ≤ 300; wordDict.length ≤ 1000; word length ≤ 20',
      hint: 'dp[i] = true if s[0..i-1] breakable. Check all splits.',
      timeComplexity: 'O(n² + word matching)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun wordBreak(s: String, wordDict: List<String>): Boolean {\n  val dict = wordDict.toSet()\n  val dp = BooleanArray(s.length + 1)\n  dp[0] = true\n\n  for (i in 1..s.length) {\n    for (j in 0 until i) {\n      if (dp[j] && s.substring(j, i) in dict) {\n        dp[i] = true\n        break\n      }\n    }\n  }\n\n  return dp[s.length]\n}",
        dart: "bool wordBreak(String s, List<String> wordDict) {\n  final dict = wordDict.toSet();\n  final dp = List.filled(s.length + 1, false);\n  dp[0] = true;\n\n  for (int i = 1; i <= s.length; i++) {\n    for (int j = 0; j < i; j++) {\n      if (dp[j] && dict.contains(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n\n  return dp[s.length];\n}",
        swift: "func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {\n  let dict = Set(wordDict)\n  var dp = Array(repeating: false, count: s.count + 1)\n  dp[0] = true\n\n  let chars = Array(s)\n  for i in 1...chars.count {\n    for j in 0..<i {\n      if dp[j] {\n        let word = String(chars[j..<i])\n        if dict.contains(word) {\n          dp[i] = true\n          break\n        }\n      }\n    }\n  }\n\n  return dp[chars.count]\n}",
        haskell: "wordBreak :: String -> [String] -> Bool\nwordBreak s wordDict = False"
      }
    },
    {
      id: 12,
      title: 'Decode Ways',
      difficulty: 'medium',
      tags: ['DP', 'String', '1D Array', 'Counting'],
      description: 'Count ways to decode numeric string (1=A, 2=B, ..., 26=Z).',
      examples: [
        {
          input: 's = "226"',
          output: '3 (2,2,6 / 22,6 / 2,26)'
        }
      ],
      constraints: '1 ≤ s.length ≤ 100; s[i] ≠ "0" or valid pair',
      hint: 'dp[i] = dp[i-1] (single) + dp[i-2] (pair) if valid.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun numDecodings(s: String): Int {\n  if (s[0] == '0') return 0\n\n  var prev1 = 1\n  var prev2 = 1\n\n  for (i in 1 until s.length) {\n    var curr = 0\n    if (s[i] != '0') curr = prev1\n    if (s[i - 1] == '1' || (s[i - 1] == '2' && s[i] <= '6')) {\n      curr += prev2\n    }\n    prev2 = prev1\n    prev1 = curr\n  }\n\n  return prev1\n}",
        dart: "int numDecodings(String s) {\n  if (s[0] == '0') return 0;\n\n  int prev1 = 1;\n  int prev2 = 1;\n\n  for (int i = 1; i < s.length; i++) {\n    int curr = 0;\n    if (s[i] != '0') curr = prev1;\n    if (s[i - 1] == '1' || (s[i - 1] == '2' && s[i].compareTo('6') <= 0)) {\n      curr += prev2;\n    }\n    prev2 = prev1;\n    prev1 = curr;\n  }\n\n  return prev1;\n}",
        swift: "func numDecodings(_ s: String) -> Int {\n  let chars = Array(s)\n  guard chars[0] != \"0\" else { return 0 }\n\n  var prev1 = 1\n  var prev2 = 1\n\n  for i in 1..<chars.count {\n    var curr = 0\n    if chars[i] != \"0\" { curr = prev1 }\n    if chars[i - 1] == \"1\" || (chars[i - 1] == \"2\" && chars[i] <= \"6\") {\n      curr += prev2\n    }\n    prev2 = prev1\n    prev1 = curr\n  }\n\n  return prev1\n}",
        haskell: "numDecodings :: String -> Int\nnumDecodings s = 0"
      }
    },
    {
      id: 13,
      title: 'House Robber II',
      difficulty: 'medium',
      tags: ['DP', 'Circular', 'Array'],
      description: 'Rob houses in circular arrangement (cannot rob first and last).',
      examples: [
        {
          input: 'nums = [3,4,1,1]',
          output: '4 (4+1)'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 100; 0 ≤ nums[i] ≤ 1000',
      hint: 'Two cases: exclude first or last house. Take maximum.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun robCircular(nums: IntArray): Int {\n  if (nums.size == 1) return nums[0]\n\n  fun robLinear(arr: IntArray): Int {\n    var prev1 = 0\n    var prev2 = 0\n    for (num in arr) {\n      val curr = maxOf(prev2, num + prev1)\n      prev1 = prev2\n      prev2 = curr\n    }\n    return prev2\n  }\n\n  return maxOf(\n    robLinear(nums.sliceArray(0 until nums.size - 1)),\n    robLinear(nums.sliceArray(1 until nums.size))\n  )\n}",
        dart: "int robCircular(List<int> nums) {\n  if (nums.length == 1) return nums[0];\n\n  int robLinear(List<int> arr) {\n    int prev1 = 0;\n    int prev2 = 0;\n    for (int num in arr) {\n      final curr = max(prev2, num + prev1);\n      prev1 = prev2;\n      prev2 = curr;\n    }\n    return prev2;\n  }\n\n  return max(\n    robLinear(nums.sublist(0, nums.length - 1)),\n    robLinear(nums.sublist(1))\n  );\n}",
        swift: "func robCircular(_ nums: [Int]) -> Int {\n  guard nums.count > 1 else { return nums[0] }\n\n  func robLinear(_ arr: [Int]) -> Int {\n    var prev1 = 0\n    var prev2 = 0\n    for num in arr {\n      let curr = max(prev2, num + prev1)\n      prev1 = prev2\n      prev2 = curr\n    }\n    return prev2\n  }\n\n  return max(\n    robLinear(Array(nums[0..<nums.count - 1])),\n    robLinear(Array(nums[1...]))\n  )\n}",
        haskell: "robCircular :: [Int] -> Int\nrobCircular nums = 0"
      }
    },
    {
      id: 14,
      title: 'Longest Palindromic Substring',
      difficulty: 'medium',
      tags: ['DP', '2D', 'Palindrome', 'String'],
      description: 'Find longest palindromic substring in string.',
      examples: [
        {
          input: 's = "babad"',
          output: '"bab" or "aba"'
        }
      ],
      constraints: '1 ≤ s.length ≤ 1000',
      hint: 'DP 2D: dp[i][j] true if s[i..j] is palindrome. Or expand around center.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun longestPalindrome(s: String): String {\n  if (s.length < 2) return s\n  val n = s.length\n  val dp = Array(n) { BooleanArray(n) }\n  var start = 0\n  var maxLen = 1\n\n  for (i in 0 until n) dp[i][i] = true\n\n  for (i in 0 until n - 1) {\n    if (s[i] == s[i + 1]) {\n      dp[i][i + 1] = true\n      start = i\n      maxLen = 2\n    }\n  }\n\n  for (len in 3..n) {\n    for (i in 0..n - len) {\n      val j = i + len - 1\n      if (s[i] == s[j] && dp[i + 1][j - 1]) {\n        dp[i][j] = true\n        start = i\n        maxLen = len\n      }\n    }\n  }\n\n  return s.substring(start, start + maxLen)\n}",
        dart: "String longestPalindrome(String s) {\n  if (s.length < 2) return s;\n  final n = s.length;\n  final dp = List.generate(n, (_) => List.filled(n, false));\n  int start = 0;\n  int maxLen = 1;\n\n  for (int i = 0; i < n; i++) dp[i][i] = true;\n\n  for (int i = 0; i < n - 1; i++) {\n    if (s[i] == s[i + 1]) {\n      dp[i][i + 1] = true;\n      start = i;\n      maxLen = 2;\n    }\n  }\n\n  for (int len = 3; len <= n; len++) {\n    for (int i = 0; i <= n - len; i++) {\n      final j = i + len - 1;\n      if (s[i] == s[j] && dp[i + 1][j - 1]) {\n        dp[i][j] = true;\n        start = i;\n        maxLen = len;\n      }\n    }\n  }\n\n  return s.substring(start, start + maxLen);\n}",
        swift: "func longestPalindrome(_ s: String) -> String {\n  guard s.count > 1 else { return s }\n  let chars = Array(s)\n  let n = chars.count\n  var dp = Array(repeating: Array(repeating: false, count: n), count: n)\n  var start = 0\n  var maxLen = 1\n\n  for i in 0..<n { dp[i][i] = true }\n\n  for i in 0..<(n - 1) {\n    if chars[i] == chars[i + 1] {\n      dp[i][i + 1] = true\n      start = i\n      maxLen = 2\n    }\n  }\n\n  for len in 3...n {\n    for i in 0...(n - len) {\n      let j = i + len - 1\n      if chars[i] == chars[j] && dp[i + 1][j - 1] {\n        dp[i][j] = true\n        start = i\n        maxLen = len\n      }\n    }\n  }\n\n  return String(chars[start..<(start + maxLen)])\n}",
        haskell: "longestPalindrome :: String -> String\nlongestPalindrome s = \"\""
      }
    },
    {
      id: 15,
      title: 'Edit Distance',
      difficulty: 'hard',
      tags: ['DP', '2D', 'Levenshtein', 'String'],
      description: 'Minimum edits (insert, delete, replace) to transform word1 to word2.',
      examples: [
        {
          input: 'word1 = "horse", word2 = "ros"',
          output: '3'
        }
      ],
      constraints: '0 ≤ word1.length, word2.length ≤ 500',
      hint: 'dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+ (match?0:1)).',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun minDistance(word1: String, word2: String): Int {\n  val m = word1.length\n  val n = word2.length\n  val dp = Array(m + 1) { IntArray(n + 1) }\n\n  for (i in 0..m) dp[i][0] = i\n  for (j in 0..n) dp[0][j] = j\n\n  for (i in 1..m) {\n    for (j in 1..n) {\n      dp[i][j] = when {\n        word1[i - 1] == word2[j - 1] -> dp[i - 1][j - 1]\n        else -> 1 + minOf(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\n      }\n    }\n  }\n\n  return dp[m][n]\n}",
        dart: "int minDistance(String word1, String word2) {\n  final m = word1.length;\n  final n = word2.length;\n  final dp = List.generate(m + 1, (_) => List.filled(n + 1, 0));\n\n  for (int i = 0; i <= m; i++) dp[i][0] = i;\n  for (int j = 0; j <= n; j++) dp[0][j] = j;\n\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (word1[i - 1] == word2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1];\n      } else {\n        dp[i][j] = 1 + min(dp[i - 1][j], min(dp[i][j - 1], dp[i - 1][j - 1]));\n      }\n    }\n  }\n\n  return dp[m][n];\n}",
        swift: "func minDistance(_ word1: String, _ word2: String) -> Int {\n  let w1 = Array(word1)\n  let w2 = Array(word2)\n  let m = w1.count\n  let n = w2.count\n  var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)\n\n  for i in 0...m { dp[i][0] = i }\n  for j in 0...n { dp[0][j] = j }\n\n  for i in 1...m {\n    for j in 1...n {\n      if w1[i - 1] == w2[j - 1] {\n        dp[i][j] = dp[i - 1][j - 1]\n      } else {\n        dp[i][j] = 1 + min(dp[i - 1][j], min(dp[i][j - 1], dp[i - 1][j - 1]))\n      }\n    }\n  }\n\n  return dp[m][n]\n}",
        haskell: "minDistance :: String -> String -> Int\nminDistance word1 word2 = 0"
      }
    },
    {
      id: 16,
      title: 'Jump Game II',
      difficulty: 'medium',
      tags: ['DP', 'Greedy', 'Array', 'BFS'],
      description: 'Minimum jumps to reach last index.',
      examples: [
        {
          input: 'nums = [2,3,1,1,4]',
          output: '2'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 10^4; 0 ≤ nums[i] ≤ 1000',
      hint: 'Greedy: track max reachable in current jump level.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun jump(nums: IntArray): Int {\n  var jumps = 0\n  var maxReach = 0\n  var currentEnd = 0\n\n  for (i in 0 until nums.size - 1) {\n    maxReach = maxOf(maxReach, i + nums[i])\n    if (i == currentEnd) {\n      jumps++\n      currentEnd = maxReach\n    }\n  }\n\n  return jumps\n}",
        dart: "int jump(List<int> nums) {\n  int jumps = 0;\n  int maxReach = 0;\n  int currentEnd = 0;\n\n  for (int i = 0; i < nums.length - 1; i++) {\n    maxReach = max(maxReach, i + nums[i]);\n    if (i == currentEnd) {\n      jumps++;\n      currentEnd = maxReach;\n    }\n  }\n\n  return jumps;\n}",
        swift: "func jump(_ nums: [Int]) -> Int {\n  var jumps = 0\n  var maxReach = 0\n  var currentEnd = 0\n\n  for i in 0..<(nums.count - 1) {\n    maxReach = max(maxReach, i + nums[i])\n    if i == currentEnd {\n      jumps += 1\n      currentEnd = maxReach\n    }\n  }\n\n  return jumps\n}",
        haskell: "jump :: [Int] -> Int\njump nums = 0"
      }
    },
    {
      id: 17,
      title: 'Perfect Squares',
      difficulty: 'medium',
      tags: ['DP', 'BFS', 'Squares', 'Counting'],
      description: 'Least number of perfect squares that sum to n.',
      examples: [
        {
          input: 'n = 7',
          output: '2 (4+3)'
        }
      ],
      constraints: '1 ≤ n ≤ 10^4',
      hint: 'dp[i] = 1 + min(dp[i - sq]) for all sq ≤ i.',
      timeComplexity: 'O(n × sqrt(n))',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun numSquares(n: Int): Int {\n  val dp = IntArray(n + 1) { Int.MAX_VALUE }\n  dp[0] = 0\n\n  for (i in 1..n) {\n    var j = 1\n    while (j * j <= i) {\n      dp[i] = minOf(dp[i], 1 + dp[i - j * j])\n      j++\n    }\n  }\n\n  return dp[n]\n}",
        dart: "int numSquares(int n) {\n  final dp = List.filled(n + 1, 2147483647);\n  dp[0] = 0;\n\n  for (int i = 1; i <= n; i++) {\n    for (int j = 1; j * j <= i; j++) {\n      dp[i] = min(dp[i], 1 + dp[i - j * j]);\n    }\n  }\n\n  return dp[n];\n}",
        swift: "func numSquares(_ n: Int) -> Int {\n  var dp = Array(repeating: Int.max, count: n + 1)\n  dp[0] = 0\n\n  for i in 1...n {\n    var j = 1\n    while j * j <= i {\n      dp[i] = min(dp[i], 1 + dp[i - j * j])\n      j += 1\n    }\n  }\n\n  return dp[n]\n}",
        haskell: "numSquares :: Int -> Int\nnumSquares n = 0"
      }
    },
    {
      id: 18,
      title: 'Triangle (DP)',
      difficulty: 'medium',
      tags: ['DP', '2D', 'Bottom-Up', 'Path'],
      description: 'Minimum path sum from top to bottom of triangle.',
      examples: [
        {
          input: 'triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]',
          output: '11'
        }
      ],
      constraints: '1 ≤ triangle.length ≤ 200',
      hint: 'Start from bottom. dp[i][j] += min(dp[i+1][j], dp[i+1][j+1]).',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun minimumTotal(triangle: List<List<Int>>): Int {\n  val n = triangle.size\n  val dp = triangle.last().toMutableList()\n\n  for (i in n - 2 downTo 0) {\n    for (j in 0..i) {\n      dp[j] = triangle[i][j] + minOf(dp[j], dp[j + 1])\n    }\n  }\n\n  return dp[0]\n}",
        dart: "int minimumTotal(List<List<int>> triangle) {\n  final n = triangle.length;\n  final dp = [...triangle.last()];\n\n  for (int i = n - 2; i >= 0; i--) {\n    for (int j = 0; j <= i; j++) {\n      dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);\n    }\n  }\n\n  return dp[0];\n}",
        swift: "func minimumTotal(_ triangle: [[Int]]) -> Int {\n  let n = triangle.count\n  var dp = triangle.last ?? []\n\n  for i in stride(from: n - 2, through: 0, by: -1) {\n    for j in 0...i {\n      dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])\n    }\n  }\n\n  return dp[0]\n}",
        haskell: "minimumTotal :: [[Int]] -> Int\nminimumTotal triangle = 0"
      }
    },
    {
      id: 19,
      title: 'Maximal Square',
      difficulty: 'medium',
      tags: ['DP', '2D Grid', 'Square', 'Substring'],
      description: 'Largest square of 1s in binary matrix.',
      examples: [
        {
          input: 'matrix = [["1","0","1"],["1","0","1"],["1","1","1"]]',
          output: '1'
        }
      ],
      constraints: 'm, n ≤ 300; matrix[i][j] ∈ {"0", "1"}',
      hint: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if 1.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun maximalSquare(matrix: Array<CharArray>): Int {\n  val m = matrix.size\n  val n = matrix[0].size\n  val dp = Array(m + 1) { IntArray(n + 1) }\n  var max = 0\n\n  for (i in 1..m) {\n    for (j in 1..n) {\n      if (matrix[i - 1][j - 1] == '1') {\n        dp[i][j] = minOf(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1\n        max = maxOf(max, dp[i][j])\n      }\n    }\n  }\n\n  return max * max\n}",
        dart: "int maximalSquare(List<List<String>> matrix) {\n  final m = matrix.length;\n  final n = matrix[0].length;\n  final dp = List.generate(m + 1, (_) => List.filled(n + 1, 0));\n  int max = 0;\n\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (matrix[i - 1][j - 1] == '1') {\n        dp[i][j] = min(dp[i - 1][j], min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;\n        max = max(max, dp[i][j]);\n      }\n    }\n  }\n\n  return max * max;\n}",
        swift: "func maximalSquare(_ matrix: [[String]]) -> Int {\n  let m = matrix.count\n  let n = matrix[0].count\n  var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)\n  var max = 0\n\n  for i in 1...m {\n    for j in 1...n {\n      if matrix[i - 1][j - 1] == \"1\" {\n        dp[i][j] = min(dp[i - 1][j], min(dp[i][j - 1], dp[i - 1][j - 1])) + 1\n        max = max(max, dp[i][j])\n      }\n    }\n  }\n\n  return max * max\n}",
        haskell: "maximalSquare :: [[String]] -> Int\nmaximalSquare matrix = 0"
      }
    },
    {
      id: 20,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      difficulty: 'medium',
      tags: ['DP', 'State Machine', 'Stock', '3 States'],
      description: 'Buy/sell stock optimally with 1-day cooldown after sell.',
      examples: [
        {
          input: 'prices = [3,1,4]',
          output: '4 (buy at 1, sell at 4)'
        }
      ],
      constraints: '1 ≤ prices.length ≤ 5000',
      hint: 'Three states: hold, sold, rest. Track max profit in each.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maxProfitCooldown(prices: IntArray): Int {\n  var hold = Int.MIN_VALUE\n  var sold = 0\n  var rest = 0\n\n  for (price in prices) {\n    val prevHold = hold\n    val prevSold = sold\n    hold = maxOf(hold, rest - price)\n    sold = maxOf(sold, prevHold + price)\n    rest = maxOf(rest, prevSold)\n  }\n\n  return maxOf(sold, rest)\n}",
        dart: "int maxProfitCooldown(List<int> prices) {\n  int hold = -2147483648;\n  int sold = 0;\n  int rest = 0;\n\n  for (int price in prices) {\n    final prevHold = hold;\n    final prevSold = sold;\n    hold = max(hold, rest - price);\n    sold = max(sold, prevHold + price);\n    rest = max(rest, prevSold);\n  }\n\n  return max(sold, rest);\n}",
        swift: "func maxProfitCooldown(_ prices: [Int]) -> Int {\n  var hold = Int.min\n  var sold = 0\n  var rest = 0\n\n  for price in prices {\n    let prevHold = hold\n    let prevSold = sold\n    hold = max(hold, rest - price)\n    sold = max(sold, prevHold + price)\n    rest = max(rest, prevSold)\n  }\n\n  return max(sold, rest)\n}",
        haskell: "maxProfitCooldown :: [Int] -> Int\nmaxProfitCooldown prices = 0"
      }
    }
  ]
}
