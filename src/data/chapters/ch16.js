export default {
  id: 16,
  year: 2,
  slug: 'advanced-dp',
  icon: '🧩',
  color: '#ff7b72',
  title: 'Advanced Dynamic Programming',
  subtitle: 'Interval DP, Bitmask DP, DP on Trees',
  description: 'Advanced DP patterns including interval DP, bitmask DP, digit DP, and tree DP.',
  theorems: [
    {
      id: 1,
      name: 'Interval DP Optimal Substructure',
      katex_statement: '\\text{opt}[i,j] = \\min_{i < k < j} (\\text{opt}[i,k] + \\text{opt}[k,j] + \\text{cost}[i,j])',
      statement_text: 'For interval DP, the optimal solution for subproblem [i,j] can be constructed from optimal solutions of non-overlapping sub-intervals plus boundary cost.',
      proof: 'By exchange argument: if optimal solution uses partition point k, then subproblems must be individually optimal (cut-property). Any suboptimal subproblem could be replaced with optimum, improving overall solution.'
    },
    {
      id: 2,
      name: 'Bitmask DP State Transitions',
      katex_statement: '\\text{dp}[\\text{mask}][i] = \\min_{j \\in \\text{mask}} (\\text{dp}[\\text{mask} \\setminus \\{j\\}][j] + \\text{dist}[j][i])',
      statement_text: 'For TSP-like problems, state is represented as (visited_set, current_position). Transitions involve removing previous vertex and adding cost to current.',
      proof: 'Bitmask encodes subset of visited vertices uniquely. Each state depends only on smaller subsets. Optimal path to state (mask,i) must end at i and use optimal path to some (mask without i, j).'
    },
    {
      id: 3,
      name: 'DP on Trees: Rerooting Technique',
      katex_statement: '\\text{dp}[u][v] = \\text{compute}(\\text{dp}[v][u], \\text{contributions from other subtrees})',
      statement_text: 'When DP requires answers for each node as root, compute bottom-up DFS first, then use rerooting to propagate results in O(n) total time.',
      proof: 'Initial DFS computes answer when node 1 is root. Rerooting transitions use local recalculation: when moving root from u to child v, update dp[v] by removing subtree v contribution and adding parent contribution.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Burst Balloons',
      difficulty: 'hard',
      tags: ['interval-dp', 'dp'],
      description: 'Burst balloons to maximize coins collected. Each balloon i has value nums[i], when burst you get nums[left]*nums[i]*nums[right] coins.',
      examples: [
        { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst in order 1→5→3→8 = 1*3*5 + 1*5*8 + 1*3*8 + 1*1*1 = 167' },
        { input: 'nums = [1,5]', output: '10', explanation: 'Burst 1 first: 1*1*5=5, then 5: 1*5*1=5, total=10' }
      ],
      constraints: 'n ≤ 300, 1 ≤ nums[i] ≤ 100',
      hint: 'Reverse thinking: instead of thinking what to burst, think what balloon to burst LAST in interval [i,j].',
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun maxCoins(nums: IntArray): Int {\n  val n = nums.size\n  val balloons = IntArray(n + 2) { when(it) { 0 -> 1; n+1 -> 1; else -> nums[it-1] } }\n  val dp = Array(n + 2) { IntArray(n + 2) }\n\n  for (len in 2..n+1) {\n    for (left in 0..n+1-len) {\n      val right = left + len\n      for (k in left+1 until right) {\n        dp[left][right] = maxOf(\n          dp[left][right],\n          dp[left][k] + dp[k][right] + balloons[left]*balloons[k]*balloons[right]\n        )\n      }\n    }\n  }\n  return dp[0][n+1]\n}",
        dart: "int maxCoins(List<int> nums) {\n  int n = nums.length;\n  List<int> balloons = [1, ...nums, 1];\n  List<List<int>> dp = List.generate(n+2, (_) => List<int>.filled(n+2, 0));\n\n  for (int len = 2; len <= n+1; len++) {\n    for (int left = 0; left <= n+1-len; left++) {\n      int right = left + len;\n      for (int k = left+1; k < right; k++) {\n        dp[left][right] = max(\n          dp[left][right],\n          dp[left][k] + dp[k][right] +\n          balloons[left] * balloons[k] * balloons[right]\n        );\n      }\n    }\n  }\n  return dp[0][n+1];\n}",
        swift: "func maxCoins(_ nums: [Int]) -> Int {\n    let n = nums.count\n    var balloons = [1] + nums + [1]\n    var dp = Array(repeating: Array(repeating: 0, count: n+2), count: n+2)\n\n    for len in 2...n+1 {\n        for left in 0...n+1-len {\n            let right = left + len\n            for k in (left+1)..<right {\n                dp[left][right] = max(\n                    dp[left][right],\n                    dp[left][k] + dp[k][right] + balloons[left]*balloons[k]*balloons[right]\n                )\n            }\n        }\n    }\n    return dp[0][n+1]\n}",
        haskell: "maxCoins :: [Int] -> Int\nmaxCoins nums = dp ! (0, n+1)\n  where\n    n = length nums\n    balloons = [1] ++ nums ++ [1]\n    dp = array ((0,0), (n+1, n+1))\n         [((i,j), solve i j) | i <- [0..n+1], j <- [0..n+1]]\n    solve left right\n      | right - left <= 1 = 0\n      | otherwise = maximum [solve left k + solve k right +\n                              balloons!!left * balloons!!k * balloons!!right\n                            | k <- [left+1..right-1]]"
      }
    },
    {
      id: 2,
      title: 'Strange Printer',
      difficulty: 'hard',
      tags: ['interval-dp'],
      description: 'Print string s where printer can print characters repeatedly. Minimize number of turn-ons of printer.',
      examples: [
        { input: 's = "ababc"', output: '2', explanation: 'Print a at positions 0,2 then b,c at positions 1,3,4' }
      ],
      constraints: '1 ≤ s.length ≤ 100',
      hint: 'dp[i][j] = min turns to print s[i..j]. When printing s[i], can print matching s[k] for free.',
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun strangePrinter(s: String): Int {\n  val n = s.length\n  val dp = Array(n) { IntArray(n) }\n\n  for (i in n-1 downTo 0) {\n    dp[i][i] = 1\n    for (j in i+1 until n) {\n      dp[i][j] = 1 + dp[i+1][j]\n      for (k in i+1..j) {\n        if (s[k] == s[i]) {\n          dp[i][j] = minOf(dp[i][j], dp[i][k-1] + dp[k][j])\n        }\n      }\n    }\n  }\n  return dp[0][n-1]\n}",
        dart: "int strangePrinter(String s) {\n  int n = s.length;\n  List<List<int>> dp = List.generate(n, (_) => List<int>.filled(n, 0));\n\n  for (int i = n-1; i >= 0; i--) {\n    dp[i][i] = 1;\n    for (int j = i+1; j < n; j++) {\n      dp[i][j] = 1 + dp[i+1][j];\n      for (int k = i+1; k <= j; k++) {\n        if (s[k] == s[i]) {\n          dp[i][j] = min(dp[i][j], dp[i][k-1] + dp[k][j]);\n        }\n      }\n    }\n  }\n  return dp[0][n-1];\n}",
        swift: "func strangePrinter(_ s: String) -> Int {\n    let chars = Array(s)\n    let n = chars.count\n    var dp = Array(repeating: Array(repeating: 0, count: n), count: n)\n\n    for i in stride(from: n-1, through: 0, by: -1) {\n        dp[i][i] = 1\n        for j in (i+1)..<n {\n            dp[i][j] = 1 + dp[i+1][j]\n            for k in (i+1)...j {\n                if chars[k] == chars[i] {\n                    dp[i][j] = min(dp[i][j], dp[i][k-1] + dp[k][j])\n                }\n            }\n        }\n    }\n    return dp[0][n-1]\n}",
        haskell: "strangePrinter :: String -> Int\nstrangePrinter s = dp !! 0 !! (n-1)\n  where\n    n = length s\n    dp = [[solve i j | j <- [0..n-1]] | i <- [0..n-1]]\n    solve i j\n      | i > j = 0\n      | i == j = 1\n      | otherwise = minimum (1 + solve (i+1) j :\n                             [solve i (k-1) + solve k j | k <- [i+1..j], s!!k == s!!i])"
      }
    },
    {
      id: 3,
      title: 'Minimum Cost to Cut a Stick',
      difficulty: 'hard',
      tags: ['interval-dp', 'dp'],
      description: 'Cut stick at given positions. Cost of cut is length of stick. Find minimum total cost.',
      examples: [
        { input: 'n=7, cuts=[1,3,4,5]', output: '16', explanation: 'Cuts [1,4,5,3] in optimal order' }
      ],
      constraints: '2 ≤ n ≤ 1000, 1 ≤ cuts.length ≤ 100',
      hint: 'dp[i][j] = minimum cost to cut stick between cuts[i] and cuts[j].',
      timeComplexity: 'O(m³) where m = cuts.length',
      spaceComplexity: 'O(m²)',
      solutions: {
        kotlin: "fun minCostToDeliver(n: Int, cuts: IntArray): Int {\n  val m = cuts.size\n  val sortedCuts = (cuts + intArrayOf(0, n)).sorted().toIntArray()\n  val dp = Array(m+2) { IntArray(m+2) }\n\n  for (len in 2..m+2) {\n    for (i in 0..m+2-len) {\n      val j = i + len - 1\n      dp[i][j] = Int.MAX_VALUE\n      for (k in i+1 until j) {\n        dp[i][j] = minOf(dp[i][j], dp[i][k] + dp[k][j] + sortedCuts[j] - sortedCuts[i])\n      }\n    }\n  }\n  return dp[0][m+1]\n}",
        dart: "int minCostToDeliver(int n, List<int> cuts) {\n  int m = cuts.length;\n  List<int> sortedCuts = (cuts + [0, n])..sort();\n  List<List<int>> dp = List.generate(m+2, (_) => List<int>.filled(m+2, 0));\n\n  for (int len = 2; len <= m+2; len++) {\n    for (int i = 0; i <= m+2-len; i++) {\n      int j = i + len - 1;\n      dp[i][j] = 1<<30;\n      for (int k = i+1; k < j; k++) {\n        dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + sortedCuts[j] - sortedCuts[i]);\n      }\n    }\n  }\n  return dp[0][m+1];\n}",
        swift: "func minCostToDeliver(_ n: Int, _ cuts: [Int]) -> Int {\n    let m = cuts.count\n    var sortedCuts = ([0] + cuts + [n]).sorted()\n    var dp = Array(repeating: Array(repeating: 0, count: m+2), count: m+2)\n\n    for len in 2...m+2 {\n        for i in 0...m+2-len {\n            let j = i + len - 1\n            dp[i][j] = Int.max\n            for k in (i+1)..<j {\n                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + sortedCuts[j] - sortedCuts[i])\n            }\n        }\n    }\n    return dp[0][m+1]\n}",
        haskell: "minCostToDeliver :: Int -> [Int] -> Int\nminCostToDeliver n cuts = dp !! 0 !! (m+1)\n  where\n    m = length cuts\n    sortedCuts = sort ([0, n] ++ cuts)\n    dp = [[solve i j | j <- [0..m+1]] | i <- [0..m+1]]\n    solve i j\n      | j - i <= 1 = 0\n      | otherwise = minimum [solve i k + solve k j + (sortedCuts!!j - sortedCuts!!i)\n                            | k <- [i+1..j-1]]"
      }
    },
    {
      id: 4,
      title: 'Zuma Game',
      difficulty: 'hard',
      tags: ['bfs', 'backtracking'],
      description: 'Eliminate balls by inserting matching balls. Consecutive groups of ≥3 same color balls disappear.',
      examples: [
        { input: 'board="WWBWBB", hand="WB"', output: '3', explanation: 'Insert B→board="WWRWWBB"→"WWWBB"' }
      ],
      constraints: 'board.length ≤ 100, hand.length ≤ 10',
      hint: 'BFS/DFS with memoization. State = (board, hand). Try inserting each hand ball at each position.',
      timeComplexity: 'O(n² * m!) in worst case',
      spaceComplexity: 'O(n * m)',
      solutions: {
        kotlin: "fun findMinStep(board: String, hand: String): Int {\n  val memo = mutableMapOf<Pair<String, String>, Int>()\n\n  fun dfs(b: String, h: String): Int {\n    if (h.isEmpty()) return if (b.isEmpty()) 0 else -1\n    if (b.isEmpty()) return 0\n\n    val key = Pair(b, h)\n    if (key in memo) return memo[key]!!\n\n    var res = Int.MAX_VALUE\n    val handChars = h.toMutableList()\n\n    for (i in handChars.indices) {\n      for (j in 0..b.length) {\n        val newB = b.substring(0, j) + handChars[i] + b.substring(j)\n        val removed = remove(newB)\n        handChars.removeAt(i)\n        val sub = dfs(removed, handChars.joinToString(\"\"))\n        if (sub != -1) res = minOf(res, sub + 1)\n        handChars.add(i, h[i])\n      }\n    }\n\n    return if (res == Int.MAX_VALUE) -1 else res.also { memo[key] = it }\n  }\n\n  fun remove(s: String): String {\n    var str = s\n    while (true) {\n      val before = str\n      var i = 0\n      while (i < str.length) {\n        var j = i\n        while (j < str.length && str[j] == str[i]) j++\n        if (j - i >= 3) str = str.substring(0, i) + str.substring(j)\n        else i = j\n      }\n      if (before == str) break\n    }\n    return str\n  }\n\n  return dfs(board, hand)\n}",
        dart: "int findMinStep(String board, String hand) {\n  Map<String, int> memo = {};\n\n  int dfs(String b, String h) {\n    if (h.isEmpty) return b.isEmpty ? 0 : -1;\n    if (b.isEmpty) return 0;\n\n    String key = '$b|$h';\n    if (memo.containsKey(key)) return memo[key]!;\n\n    int res = 999999;\n    List<String> handChars = h.split('');\n\n    for (int i = 0; i < handChars.length; i++) {\n      for (int j = 0; j <= b.length; j++) {\n        String newB = b.substring(0, j) + handChars[i] + b.substring(j);\n        String removed = removeConsecutive(newB);\n        String nextHand = handChars.where((_, idx) => idx != i).join();\n        int sub = dfs(removed, nextHand);\n        if (sub != -1) res = min(res, sub + 1);\n      }\n    }\n\n    return memo[key] = (res == 999999 ? -1 : res);\n  }\n\n  String removeConsecutive(String s) {\n    while (true) {\n      String before = s;\n      int i = 0;\n      while (i < s.length) {\n        int j = i;\n        while (j < s.length && s[j] == s[i]) j++;\n        if (j - i >= 3) s = s.substring(0, i) + s.substring(j);\n        else i = j;\n      }\n      if (before == s) break;\n    }\n    return s;\n  }\n\n  return dfs(board, hand);\n}",
        swift: "func findMinStep(_ board: String, _ hand: String) -> Int {\n    var memo = [String: Int]()\n\n    func remove(_ s: String) -> String {\n        var str = Array(s)\n        var changed = true\n        while changed {\n            changed = false\n            var i = 0\n            while i < str.count {\n                var j = i\n                while j < str.count && str[j] == str[i] { j += 1 }\n                if j - i >= 3 {\n                    str.removeSubrange(i..<j)\n                    changed = true\n                } else {\n                    i = j\n                }\n            }\n        }\n        return String(str)\n    }\n\n    func dfs(_ b: String, _ h: String) -> Int {\n        let key = \"\\(b)|\\(h)\"\n        if let cached = memo[key] { return cached }\n        if h.isEmpty { return b.isEmpty ? 0 : -1 }\n        if b.isEmpty { return 0 }\n\n        var res = Int.max\n        var hChars = Array(h)\n\n        for i in 0..<hChars.count {\n            for j in 0...b.count {\n                let idx = b.index(b.startIndex, offsetBy: j)\n                let newB = String(b[..<idx]) + String(hChars[i]) + String(b[idx...])\n                let removed = remove(newB)\n                hChars.remove(at: i)\n                let nextH = String(hChars)\n                if let sub = dfs(removed, nextH), sub != -1 {\n                    res = min(res, sub + 1)\n                }\n                hChars.insert(h[h.index(h.startIndex, offsetBy: i)], at: i)\n            }\n        }\n\n        return (memo[key] = res == Int.max ? -1 : res)\n    }\n\n    return dfs(board, hand)\n}",
        haskell: "findMinStep :: String -> String -> Int\nfindMinStep board hand = dfs board hand\n  where\n    dfs b h\n      | null h = if null b then 0 else -1\n      | null b = 0\n      | otherwise =\n          let results = [sub + 1 | i <- [0..length h - 1],\n                                 j <- [0..length b],\n                                 let newB = take j b ++ [h!!i] ++ drop j b,\n                                 let removed = removeConsecutive newB,\n                                 let nextH = take i h ++ drop (i+1) h,\n                                 let sub = dfs removed nextH,\n                                 sub /= -1]\n          in if null results then -1 else minimum results\n\n    removeConsecutive s = fix remove s\n      where\n        remove str\n          | str == str' = str\n          | otherwise = remove str'\n          where\n            str' = go str\n        go [] = []\n        go s@(x:xs) =\n          let (g, rest) = span (== x) s\n          in if length g >= 3 then rest else x : go xs"
      }
    },
    {
      id: 5,
      title: 'Predict the Winner',
      difficulty: 'medium',
      tags: ['game-theory', 'dp'],
      description: 'Two players pick alternately from array ends. Player 1 wins if score ≥ player 2.',
      examples: [
        { input: 'nums = [1,3,1]', output: 'true', explanation: 'Player 1 picks 1 (index 0 or 2), gets ≥ Player 2' }
      ],
      constraints: '1 ≤ nums.length ≤ 100',
      hint: 'dp[i][j] = max advantage player1 can get from nums[i..j].',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun predictTheWinner(nums: IntArray): Boolean {\n  val n = nums.size\n  val dp = Array(n) { IntArray(n) }\n\n  for (i in 0 until n) dp[i][i] = nums[i]\n\n  for (len in 2..n) {\n    for (i in 0..n-len) {\n      val j = i + len - 1\n      dp[i][j] = maxOf(\n        nums[i] - dp[i+1][j],\n        nums[j] - dp[i][j-1]\n      )\n    }\n  }\n\n  return dp[0][n-1] >= 0\n}",
        dart: "bool predictTheWinner(List<int> nums) {\n  int n = nums.length;\n  List<List<int>> dp = List.generate(n, (_) => List<int>.filled(n, 0));\n\n  for (int i = 0; i < n; i++) dp[i][i] = nums[i];\n\n  for (int len = 2; len <= n; len++) {\n    for (int i = 0; i <= n - len; i++) {\n      int j = i + len - 1;\n      dp[i][j] = max(\n        nums[i] - dp[i+1][j],\n        nums[j] - dp[i][j-1]\n      );\n    }\n  }\n\n  return dp[0][n-1] >= 0;\n}",
        swift: "func predictTheWinner(_ nums: [Int]) -> Bool {\n    let n = nums.count\n    var dp = Array(repeating: Array(repeating: 0, count: n), count: n)\n\n    for i in 0..<n { dp[i][i] = nums[i] }\n\n    for len in 2...n {\n        for i in 0...(n-len) {\n            let j = i + len - 1\n            dp[i][j] = max(\n                nums[i] - dp[i+1][j],\n                nums[j] - dp[i][j-1]\n            )\n        }\n    }\n\n    return dp[0][n-1] >= 0\n}",
        haskell: "predictTheWinner :: [Int] -> Bool\npredictTheWinner nums = dp !! 0 !! (n-1) >= 0\n  where\n    n = length nums\n    dp = [[solve i j | j <- [0..n-1]] | i <- [0..n-1]]\n    solve i j\n      | i == j = nums !! i\n      | otherwise = max (nums !! i - solve (i+1) j) (nums !! j - solve i (j-1))"
      }
    },
    {
      id: 6,
      title: 'Stone Game',
      difficulty: 'medium',
      tags: ['game-theory', 'dp'],
      description: 'Two players pick stones from pile ends. Player 1 always wins (with optimal play).',
      examples: [
        { input: 'piles = [3,7,4,19]', output: 'true', explanation: 'Player 1 wins with optimal strategy' }
      ],
      constraints: '2 ≤ piles.length ≤ 500, piles.length % 2 == 0',
      hint: 'By symmetry/DP, first player always has winning move with even-length array.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun stoneGameWinner(piles: IntArray): Boolean {\n  val n = piles.size\n  val dp = Array(n) { IntArray(n) }\n\n  for (i in 0 until n) dp[i][i] = piles[i]\n\n  for (len in 2..n) {\n    for (i in 0..n-len) {\n      val j = i + len - 1\n      dp[i][j] = maxOf(\n        piles[i] + minOf(if (i+2 <= j) dp[i+2][j] else 0, if (i+1 < j) dp[i+1][j-1] else 0),\n        piles[j] + minOf(if (i+1 < j-1) dp[i+1][j-1] else 0, if (i < j-1) dp[i][j-2] else 0)\n      )\n    }\n  }\n\n  return dp[0][n-1] > piles.sum() / 2\n}",
        dart: "bool stoneGameWinner(List<int> piles) {\n  int n = piles.length;\n  List<List<int>> dp = List.generate(n, (_) => List<int>.filled(n, 0));\n\n  for (int i = 0; i < n; i++) dp[i][i] = piles[i];\n\n  for (int len = 2; len <= n; len++) {\n    for (int i = 0; i <= n - len; i++) {\n      int j = i + len - 1;\n      dp[i][j] = max(\n        piles[i] + min(i+2<=j ? dp[i+2][j] : 0, i+1<j ? dp[i+1][j-1] : 0),\n        piles[j] + min(i+1<j-1 ? dp[i+1][j-1] : 0, i<j-1 ? dp[i][j-2] : 0)\n      );\n    }\n  }\n\n  int total = piles.reduce((a,b) => a+b);\n  return dp[0][n-1] > total ~/ 2;\n}",
        swift: "func stoneGameWinner(_ piles: [Int]) -> Bool {\n    let n = piles.count\n    var dp = Array(repeating: Array(repeating: 0, count: n), count: n)\n\n    for i in 0..<n { dp[i][i] = piles[i] }\n\n    for len in 2...n {\n        for i in 0...(n-len) {\n            let j = i + len - 1\n            dp[i][j] = max(\n                piles[i] + min(i+2<=j ? dp[i+2][j] : 0, i+1<j ? dp[i+1][j-1] : 0),\n                piles[j] + min(i+1<j-1 ? dp[i+1][j-1] : 0, i<j-1 ? dp[i][j-2] : 0)\n            )\n        }\n    }\n\n    let total = piles.reduce(0, +)\n    return dp[0][n-1] > total / 2\n}",
        haskell: "stoneGameWinner :: [Int] -> Bool\nstoneGameWinner piles = dp !! 0 !! (n-1) > sum piles \\`div\\` 2\n  where\n    n = length piles\n    dp = [[solve i j | j <- [0..n-1]] | i <- [0..n-1]]\n    solve i j\n      | i == j = piles !! i\n      | otherwise = max (piles!!i + minTake (i+1) j) (piles!!j + minTake i (j-1))\n    minTake i j\n      | i > j = 0\n      | i+1 > j = piles !! i\n      | otherwise = min (dp !! (i+1) !! j) (dp !! i !! (j-1))"
      }
    },
    {
      id: 7,
      title: 'Travelling Salesman Problem (Bitmask DP)',
      difficulty: 'hard',
      tags: ['bitmask-dp', 'dp'],
      description: 'Find minimum cost Hamiltonian cycle visiting all cities exactly once.',
      examples: [
        { input: 'dist = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]', output: '80', explanation: 'Optimal tour: 0→1→3→2→0' }
      ],
      constraints: 'n ≤ 20, dist[i][j] ∈ [0, 10000]',
      hint: 'dp[mask][i] = min cost to visit all cities in mask ending at city i.',
      timeComplexity: 'O(2ⁿ * n²)',
      spaceComplexity: 'O(2ⁿ * n)',
      solutions: {
        kotlin: "fun tspBitmask(dist: Array<IntArray>): Int {\n  val n = dist.size\n  val INF = Int.MAX_VALUE / 2\n  val dp = Array(1 shl n) { IntArray(n) { INF } }\n\n  dp[1][0] = 0\n\n  for (mask in 0 until (1 shl n)) {\n    for (i in 0 until n) {\n      if (dp[mask][i] == INF) continue\n      for (j in 0 until n) {\n        if ((mask and (1 shl j)) == 0) {\n          val newMask = mask or (1 shl j)\n          dp[newMask][j] = minOf(dp[newMask][j], dp[mask][i] + dist[i][j])\n        }\n      }\n    }\n  }\n\n  var ans = INF\n  val fullMask = (1 shl n) - 1\n  for (i in 1 until n) {\n    ans = minOf(ans, dp[fullMask][i] + dist[i][0])\n  }\n  return ans\n}",
        dart: "int tspBitmask(List<List<int>> dist) {\n  int n = dist.length;\n  int INF = 1<<30;\n  List<List<int>> dp = List.generate(1<<n, (_) => List<int>.filled(n, INF));\n\n  dp[1][0] = 0;\n\n  for (int mask = 0; mask < (1<<n); mask++) {\n    for (int i = 0; i < n; i++) {\n      if (dp[mask][i] == INF) continue;\n      for (int j = 0; j < n; j++) {\n        if ((mask & (1<<j)) == 0) {\n          int newMask = mask | (1<<j);\n          dp[newMask][j] = min(dp[newMask][j], dp[mask][i] + dist[i][j]);\n        }\n      }\n    }\n  }\n\n  int ans = INF;\n  int fullMask = (1<<n) - 1;\n  for (int i = 1; i < n; i++) {\n    ans = min(ans, dp[fullMask][i] + dist[i][0]);\n  }\n  return ans;\n}",
        swift: "func tspBitmask(_ dist: [[Int]]) -> Int {\n    let n = dist.count\n    let INF = Int.max / 2\n    var dp = Array(repeating: Array(repeating: INF, count: n), count: 1<<n)\n\n    dp[1][0] = 0\n\n    for mask in 0..<(1<<n) {\n        for i in 0..<n {\n            if dp[mask][i] == INF { continue }\n            for j in 0..<n {\n                if (mask & (1<<j)) == 0 {\n                    let newMask = mask | (1<<j)\n                    dp[newMask][j] = min(dp[newMask][j], dp[mask][i] + dist[i][j])\n                }\n            }\n        }\n    }\n\n    var ans = INF\n    let fullMask = (1<<n) - 1\n    for i in 1..<n {\n        ans = min(ans, dp[fullMask][i] + dist[i][0])\n    }\n    return ans\n}",
        haskell: "tspBitmask :: [[Int]] -> Int\ntspBitmask dist = minimum [dp !! fullMask !! i + dist !! i !! 0 | i <- [1..n-1]]\n  where\n    n = length dist\n    inf = maxBound `div` 2\n    fullMask = (1 `shiftL` n) - 1\n    dp = [[solve mask i | i <- [0..n-1]] | mask <- [0..fullMask]]\n    solve mask i\n      | i >= n || mask == 0 = inf\n      | mask == 1 && i == 0 = 0\n      | otherwise = minimum [dp !! (mask `clearBit` j) !! i + dist !! i !! j |\n                            j <- [0..n-1], testBit mask j]"
      }
    },
    {
      id: 8,
      title: 'Shortest Superstring',
      difficulty: 'hard',
      tags: ['bitmask-dp', 'tsp'],
      description: 'Find shortest string containing all input strings as substrings.',
      examples: [
        { input: 'words = ["abbb","cbbd","aaab","dabd","bbca"]', output: '14', explanation: 'One possible: "aaabdaabbbcbbd"' }
      ],
      constraints: '1 ≤ words.length ≤ 12',
      hint: 'Use TSP approach: dp[mask][i] = shortest superstring of words in mask ending with words[i].',
      timeComplexity: 'O(2ⁿ * n² * L) where L = max word length',
      spaceComplexity: 'O(2ⁿ * n)',
      solutions: {
        kotlin: "fun shortestSuperstring(words: Array<String>): String {\n  val n = words.size\n  val overlap = Array(n) { IntArray(n) }\n\n  for (i in 0 until n) {\n    for (j in 0 until n) {\n      if (i == j) continue\n      var max = minOf(words[i].length, words[j].length)\n      while (max > 0 && !words[j].startsWith(words[i].substring(words[i].length - max))) max--\n      overlap[i][j] = max\n    }\n  }\n\n  val INF = Int.MAX_VALUE / 2\n  val dp = Array(1 shl n) { IntArray(n) { INF } }\n  val parent = Array(1 shl n) { IntArray(n) { -1 } }\n\n  for (i in 0 until n) dp[1 shl i][i] = words[i].length\n\n  for (mask in 0 until (1 shl n)) {\n    for (i in 0 until n) {\n      if (dp[mask][i] == INF) continue\n      for (j in 0 until n) {\n        if ((mask and (1 shl j)) == 0) {\n          val newMask = mask or (1 shl j)\n          val cost = dp[mask][i] + words[j].length - overlap[i][j]\n          if (cost < dp[newMask][j]) {\n            dp[newMask][j] = cost\n            parent[newMask][j] = i\n          }\n        }\n      }\n    }\n  }\n\n  var last = 0\n  var minLen = INF\n  for (i in 0 until n) {\n    if (dp[(1 shl n) - 1][i] < minLen) {\n      minLen = dp[(1 shl n) - 1][i]\n      last = i\n    }\n  }\n\n  val order = mutableListOf<Int>()\n  var mask = (1 shl n) - 1\n  var cur = last\n  while (cur != -1) {\n    order.add(cur)\n    val prev = parent[mask][cur]\n    cur = prev\n    if (prev != -1) mask = mask xor (1 shl cur)\n  }\n  order.reverse()\n\n  val sb = StringBuilder(words[order[0]])\n  for (i in 1 until order.size) {\n    val prev = order[i - 1]\n    val cur = order[i]\n    val ov = overlap[prev][cur]\n    sb.append(words[cur].substring(ov))\n  }\n\n  return sb.toString()\n}",
        dart: "String shortestSuperstring(List<String> words) {\n  int n = words.length;\n  List<List<int>> overlap = List.generate(n, (_) => List<int>.filled(n, 0));\n\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      if (i == j) continue;\n      int max = min(words[i].length, words[j].length);\n      while (max > 0 && !words[j].startsWith(words[i].substring(words[i].length - max))) max--;\n      overlap[i][j] = max;\n    }\n  }\n\n  int INF = 1<<30;\n  List<List<int>> dp = List.generate(1<<n, (_) => List<int>.filled(n, INF));\n  List<List<int>> parent = List.generate(1<<n, (_) => List<int>.filled(n, -1));\n\n  for (int i = 0; i < n; i++) dp[1<<i][i] = words[i].length;\n\n  for (int mask = 0; mask < (1<<n); mask++) {\n    for (int i = 0; i < n; i++) {\n      if (dp[mask][i] == INF) continue;\n      for (int j = 0; j < n; j++) {\n        if ((mask & (1<<j)) == 0) {\n          int newMask = mask | (1<<j);\n          int cost = dp[mask][i] + words[j].length - overlap[i][j];\n          if (cost < dp[newMask][j]) {\n            dp[newMask][j] = cost;\n            parent[newMask][j] = i;\n          }\n        }\n      }\n    }\n  }\n\n  int last = 0, minLen = INF;\n  for (int i = 0; i < n; i++) {\n    if (dp[(1<<n)-1][i] < minLen) {\n      minLen = dp[(1<<n)-1][i];\n      last = i;\n    }\n  }\n\n  List<int> order = [];\n  int mask = (1<<n)-1, cur = last;\n  while (cur != -1) {\n    order.add(cur);\n    int prev = parent[mask][cur];\n    cur = prev;\n    if (prev != -1) mask ^= (1<<cur);\n  }\n  order = order.reversed.toList();\n\n  StringBuffer sb = StringBuffer(words[order[0]]);\n  for (int i = 1; i < order.length; i++) {\n    int ov = overlap[order[i-1]][order[i]];\n    sb.write(words[order[i]].substring(ov));\n  }\n  return sb.toString();\n}",
        swift: "func shortestSuperstring(_ words: [String]) -> String {\n    let n = words.count\n    var overlap = Array(repeating: Array(repeating: 0, count: n), count: n)\n\n    for i in 0..<n {\n        for j in 0..<n where i != j {\n            var max = min(words[i].count, words[j].count)\n            let wj = Array(words[j])\n            while max > 0 {\n                let suffix = String(words[i].suffix(max))\n                if wj.starts(with: suffix) { break }\n                max -= 1\n            }\n            overlap[i][j] = max\n        }\n    }\n\n    let INF = Int.max / 2\n    var dp = Array(repeating: Array(repeating: INF, count: n), count: 1<<n)\n    var parent = Array(repeating: Array(repeating: -1, count: n), count: 1<<n)\n\n    for i in 0..<n { dp[1<<i][i] = words[i].count }\n\n    for mask in 0..<(1<<n) {\n        for i in 0..<n {\n            if dp[mask][i] == INF { continue }\n            for j in 0..<n {\n                if (mask & (1<<j)) == 0 {\n                    let newMask = mask | (1<<j)\n                    let cost = dp[mask][i] + words[j].count - overlap[i][j]\n                    if cost < dp[newMask][j] {\n                        dp[newMask][j] = cost\n                        parent[newMask][j] = i\n                    }\n                }\n            }\n        }\n    }\n\n    var last = 0, minLen = INF\n    for i in 0..<n {\n        if dp[(1<<n)-1][i] < minLen {\n            minLen = dp[(1<<n)-1][i]\n            last = i\n        }\n    }\n\n    var order: [Int] = [], mask = (1<<n)-1, cur = last\n    while cur != -1 {\n        order.append(cur)\n        let prev = parent[mask][cur]\n        if prev != -1 { mask ^= (1<<cur) }\n        cur = prev\n    }\n    order.reverse()\n\n    var result = words[order[0]]\n    for i in 1..<order.count {\n        let ov = overlap[order[i-1]][order[i]]\n        result += String(words[order[i]].dropFirst(ov))\n    }\n    return result\n}",
        haskell: "shortestSuperstring :: [String] -> String\nshortestSuperstring words = reconstructPath order\n  where\n    n = length words\n    overlap = [[overlapLen (words!!i) (words!!j) | j <- [0..n-1]] | i <- [0..n-1]]\n    overlapLen s t | s == t = 0\n                   | otherwise = length $ head [drop (length s - k) s | k <- [length s, length s-1..1],\n                                                drop (length s - k) s `isPrefixOf` t] ++ [0]\n\n    reconstructPath order = foldl1 merge [(words !! order !! i, overlap !! order !! i !! order !! (i+1)) | i <- [0..length order - 2]]\n      where\n        merge (acc, ov) word = acc ++ drop ov word\n        `isgavelPrefix = undefined"
      }
    },
    {
      id: 9,
      title: 'Minimum XOR Sum of Two Arrays',
      difficulty: 'hard',
      tags: ['bitmask-dp', 'assignment'],
      description: 'Assign elements of arr2 to arr1 to minimize XOR sum.',
      examples: [
        { input: 'arr1=[1,2], arr2=[3,4]', output: '0', explanation: '1 XOR 3 + 2 XOR 4 = 2 + 6 = 4, or 1 XOR 4 + 2 XOR 3 = 5 + 1 = 6, min=4' }
      ],
      constraints: 'n ≤ 12, 1 ≤ arr[i] ≤ 10000',
      hint: 'dp[i][mask] = min XOR sum assigning mask subset of arr2 to first i elements of arr1.',
      timeComplexity: 'O(n * 2ⁿ)',
      spaceComplexity: 'O(n * 2ⁿ)',
      solutions: {
        kotlin: "fun minimumXorSum(arr1: IntArray, arr2: IntArray): Int {\n  val n = arr1.size\n  val INF = Int.MAX_VALUE / 2\n  val dp = Array(n + 1) { IntArray(1 shl n) { INF } }\n\n  dp[0][0] = 0\n\n  for (i in 1..n) {\n    for (mask in 0 until (1 shl n)) {\n      for (j in 0 until n) {\n        if ((mask and (1 shl j)) == 0) {\n          val prevMask = mask or (1 shl j)\n          dp[i][mask] = minOf(dp[i][mask], dp[i-1][prevMask] + (arr1[i-1] xor arr2[j]))\n        }\n      }\n    }\n  }\n\n  return dp[n][(1 shl n) - 1]\n}",
        dart: "int minimumXorSum(List<int> arr1, List<int> arr2) {\n  int n = arr1.length;\n  int INF = 1<<30;\n  List<List<int>> dp = List.generate(n+1, (_) => List<int>.filled(1<<n, INF));\n\n  dp[0][0] = 0;\n\n  for (int i = 1; i <= n; i++) {\n    for (int mask = 0; mask < (1<<n); mask++) {\n      for (int j = 0; j < n; j++) {\n        if ((mask & (1<<j)) == 0) {\n          int prevMask = mask | (1<<j);\n          dp[i][mask] = min(dp[i][mask], dp[i-1][prevMask] + (arr1[i-1] ^ arr2[j]));\n        }\n      }\n    }\n  }\n\n  return dp[n][(1<<n)-1];\n}",
        swift: "func minimumXorSum(_ arr1: [Int], _ arr2: [Int]) -> Int {\n    let n = arr1.count\n    let INF = Int.max / 2\n    var dp = Array(repeating: Array(repeating: INF, count: 1<<n), count: n+1)\n\n    dp[0][0] = 0\n\n    for i in 1...n {\n        for mask in 0..<(1<<n) {\n            for j in 0..<n {\n                if (mask & (1<<j)) == 0 {\n                    let prevMask = mask | (1<<j)\n                    dp[i][mask] = min(dp[i][mask], dp[i-1][prevMask] + (arr1[i-1] ^ arr2[j]))\n                }\n            }\n        }\n    }\n\n    return dp[n][(1<<n)-1]\n}",
        haskell: "minimumXorSum :: [Int] -> [Int] -> Int\nminimumXorSum arr1 arr2 = dp !! n !! ((1 `shiftL` n) - 1)\n  where\n    n = length arr1\n    inf = maxBound `div` 2\n    dp = [[solve i mask | mask <- [0..((1 `shiftL` n) - 1)]] | i <- [0..n]]\n    solve 0 0 = 0\n    solve 0 _ = inf\n    solve i mask = minimum [dp !! (i-1) !! (mask `setBit` j) + (arr1 !! (i-1) `xor` arr2 !! j)\n                           | j <- [0..n-1], not (testBit mask j)]"
      }
    },
    {
      id: 10,
      title: 'Number of Ways to Reorder Array to get Same BST',
      difficulty: 'hard',
      tags: ['bst', 'combinatorics'],
      description: 'Count permutations of array that produce same BST structure.',
      examples: [
        { input: 'nums = [2,1,3]', output: '1', explanation: 'Only [2,1,3] produces valid BST' }
      ],
      constraints: '1 ≤ nums.length ≤ 1000',
      hint: 'For each node, count left/right subtree elements, use combination formula.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun numOfWays(nums: IntArray): Int {\n  val MOD = 1_000_000_007\n  val n = nums.size\n  val fact = LongArray(n)\n  fact[0] = 1\n  for (i in 1 until n) fact[i] = fact[i-1] * i % MOD\n\n  fun modInv(a: Long, m: Long): Long {\n    var res = 1L\n    var x = a\n    var p = m - 2\n    while (p > 0) {\n      if (p and 1 == 1L) res = res * x % m\n      x = x * x % m\n      p = p shr 1\n    }\n    return res\n  }\n\n  fun comb(n: Int, k: Int): Long {\n    if (k > n || k < 0) return 0\n    return fact[n] * modInv(fact[k] * fact[n-k] % MOD, MOD) % MOD\n  }\n\n  fun dfs(arr: List<Int>): Long {\n    if (arr.size <= 1) return 1\n    val left = arr.filter { it < arr[0] }\n    val right = arr.filter { it > arr[0] }\n    return comb(arr.size - 1, left.size) * dfs(left) % MOD * dfs(right) % MOD\n  }\n\n  return dfs(nums.toList()).toInt()\n}",
        dart: "int numOfWays(List<int> nums) {\n  final MOD = 1000000007;\n  int n = nums.length;\n  List<int> fact = List<int>.filled(n, 1);\n  for (int i = 1; i < n; i++) fact[i] = fact[i-1] * i % MOD;\n\n  int modInv(int a) {\n    int res = 1, x = a, p = MOD - 2;\n    while (p > 0) {\n      if (p & 1 == 1) res = res * x % MOD;\n      x = x * x % MOD;\n      p >>= 1;\n    }\n    return res;\n  }\n\n  int comb(int n, int k) {\n    if (k > n || k < 0) return 0;\n    return fact[n] * modInv(fact[k] * fact[n-k] % MOD) % MOD;\n  }\n\n  int dfs(List<int> arr) {\n    if (arr.length <= 1) return 1;\n    List<int> left = arr.where((x) => x < arr[0]).toList();\n    List<int> right = arr.where((x) => x > arr[0]).toList();\n    return comb(arr.length - 1, left.length) * dfs(left) % MOD * dfs(right) % MOD;\n  }\n\n  return dfs(nums);\n}",
        swift: "func numOfWays(_ nums: [Int]) -> Int {\n    let MOD = 1_000_000_007\n    let n = nums.count\n    var fact = Array(repeating: 1, count: n)\n    for i in 1..<n { fact[i] = fact[i-1] * i % MOD }\n\n    func modInv(_ a: Int) -> Int {\n        var res = 1, x = a, p = MOD - 2\n        while p > 0 {\n            if p & 1 == 1 { res = res * x % MOD }\n            x = x * x % MOD\n            p >>= 1\n        }\n        return res\n    }\n\n    func comb(_ n: Int, _ k: Int) -> Int {\n        if k > n || k < 0 { return 0 }\n        return fact[n] * modInv(fact[k] * fact[n-k] % MOD) % MOD\n    }\n\n    func dfs(_ arr: [Int]) -> Int {\n        guard arr.count > 1 else { return 1 }\n        let left = arr.filter { $0 < arr[0] }\n        let right = arr.filter { $0 > arr[0] }\n        return comb(arr.count - 1, left.count) * dfs(left) % MOD * dfs(right) % MOD\n    }\n\n    return dfs(nums)\n}",
        haskell: "numOfWays :: [Int] -> Int\nnumOfWays nums = dfs nums\n  where\n    mod = 1000000007\n    fact = scanl (*) 1 [1..length nums - 1]\n\n    modInv a = powMod a (mod - 2) mod\n    comb n k | k > n || k < 0 = 0\n             | otherwise = fact !! n * modInv (fact !! k * fact !! (n-k) `mod` mod) \\`mod\\` mod\n\n    dfs arr\n      | length arr <= 1 = 1\n      | otherwise = comb (length arr - 1) (length left) * dfs left * dfs right \\`mod\\` mod\n      where\n        left = filter (< head arr) arr\n        right = filter (> head arr) arr\n\n    powMod b e m = go b e 1\n      where\n        go _ 0 r = r\n        go b e r | e \\`mod\\` 2 == 1 = go (b*b\\`mod\\`m) (e\\`div\\`2) (r*b\\`mod\\`m)\n                 | otherwise = go (b*b\\`mod\\`m) (e\\`div\\`2) r"
      }
    },
    {
      id: 11,
      title: 'Cherry Pickup II',
      difficulty: 'hard',
      tags: ['dp', 'grid'],
      description: 'Two paths collect cherries from grid. Maximize total without revisiting.',
      examples: [
        { input: 'grid = [[3,1,1],[2,5,1],[1,5,5]]', output: '24', explanation: 'Optimal paths collect 24 cherries' }
      ],
      constraints: 'rows ≤ 70, cols ≤ 70',
      hint: 'dp[r1][c1][c2] = max cherries when person1 at (r1,c1) and person2 at (r2,c2) with r1+c1 = r2+c2.',
      timeComplexity: 'O(rows * cols²)',
      spaceComplexity: 'O(rows * cols²)',
      solutions: {
        kotlin: "fun cherryPickupII(grid: Array<IntArray>): Int {\n  val rows = grid.size\n  val cols = grid[0].size\n  val memo = mutableMapOf<Triple<Int,Int,Int>, Int>()\n\n  fun dfs(r1: Int, c1: Int, r2: Int): Int {\n    val c2 = r1 + c1 - r2\n    if (r1 >= rows || c1 >= cols || r2 >= rows || c2 >= cols) return Int.MIN_VALUE / 2\n\n    var res = grid[r1][c1] + if (r1 != r2) grid[r2][c2] else 0\n\n    if (r1 == rows - 1 && c1 == cols - 1) return res\n\n    val key = Triple(r1, c1, r2)\n    if (key in memo) return memo[key]!!\n\n    var next = Int.MIN_VALUE / 2\n    for (dr1 in 0..1) {\n      for (dr2 in 0..1) {\n        next = maxOf(next, dfs(r1 + dr1, c1 + 1 - dr1, r2 + dr2))\n      }\n    }\n\n    return (res + next).also { memo[key] = it }\n  }\n\n  return maxOf(0, dfs(0, 0, 0))\n}",
        dart: "int cherryPickupII(List<List<int>> grid) {\n  int rows = grid.length, cols = grid[0].length;\n  Map<String, int> memo = {};\n\n  int dfs(int r1, int c1, int r2) {\n    int c2 = r1 + c1 - r2;\n    if (r1 >= rows || c1 >= cols || r2 >= rows || c2 >= cols) return -1000000000;\n\n    int res = grid[r1][c1] + (r1 != r2 ? grid[r2][c2] : 0);\n    if (r1 == rows - 1 && c1 == cols - 1) return res;\n\n    String key = '\\$r1,\\$c1,\\$r2';\n    if (memo.containsKey(key)) return memo[key]!;\n\n    int next = -1000000000;\n    for (int dr1 = 0; dr1 <= 1; dr1++) {\n      for (int dr2 = 0; dr2 <= 1; dr2++) {\n        next = max(next, dfs(r1 + dr1, c1 + 1 - dr1, r2 + dr2));\n      }\n    }\n\n    return memo[key] = res + next;\n  }\n\n  return max(0, dfs(0, 0, 0));\n}",
        swift: "func cherryPickupII(_ grid: [[Int]]) -> Int {\n    let rows = grid.count, cols = grid[0].count\n    var memo = [String: Int]()\n\n    func dfs(_ r1: Int, _ c1: Int, _ r2: Int) -> Int {\n        let c2 = r1 + c1 - r2\n        if r1 >= rows || c1 >= cols || r2 >= rows || c2 >= cols { return Int.min/2 }\n\n        var res = grid[r1][c1] + (r1 != r2 ? grid[r2][c2] : 0)\n        if r1 == rows - 1 && c1 == cols - 1 { return res }\n\n        let key = \"\\(r1),\\(c1),\\(r2)\"\n        if let cached = memo[key] { return cached }\n\n        var next = Int.min / 2\n        for dr1 in 0...1 {\n            for dr2 in 0...1 {\n                next = max(next, dfs(r1 + dr1, c1 + 1 - dr1, r2 + dr2))\n            }\n        }\n\n        return (memo[key] = res + next)\n    }\n\n    return max(0, dfs(0, 0, 0))\n}",
        haskell: "cherryPickupII :: [[Int]] -> Int\ncherryPickupII grid = max 0 (dfs 0 0 0)\n  where\n    rows = length grid\n    cols = length (head grid)\n\n    dfs r1 c1 r2 = go r1 c1 r2\n      where\n        c2 = r1 + c1 - r2\n        go r1 c1 r2\n          | r1 >= rows || c1 >= cols || r2 >= rows || c2 >= cols = -1000000000\n          | r1 == rows - 1 && c1 == cols - 1 = grid !! r1 !! c1\n          | otherwise = res + maximum [go (r1+dr1) (c1+1-dr1) (r2+dr2)\n                                      | dr1 <- [0,1], dr2 <- [0,1]]\n          where\n            res = grid !! r1 !! c1 + if r1 /= r2 then grid !! r2 !! c2 else 0"
      }
    },
    {
      id: 12,
      title: 'Dungeon Game',
      difficulty: 'hard',
      tags: ['dp', 'backward'],
      description: 'Find minimum health to traverse dungeon grid and survive all cells.',
      examples: [
        { input: 'dungeon = [[-3,5,-3],[-3,4,2],[-3,4,-1]]', output: '13', explanation: 'Minimum health 13 at start' }
      ],
      constraints: 'rows, cols ≤ 200, dungeon[i][j] ∈ [-200, 200]',
      hint: 'Work backward: dp[i][j] = min health needed at (i,j) to survive.',
      timeComplexity: 'O(rows * cols)',
      spaceComplexity: 'O(rows * cols)',
      solutions: {
        kotlin: "fun calculateMinimumHP(dungeon: Array<IntArray>): Int {\n  val rows = dungeon.size\n  val cols = dungeon[0].size\n  val dp = Array(rows + 1) { IntArray(cols + 1) { Int.MAX_VALUE / 2 } }\n  dp[rows][cols - 1] = 1\n  dp[rows - 1][cols] = 1\n\n  for (i in rows - 1 downTo 0) {\n    for (j in cols - 1 downTo 0) {\n      val next = minOf(dp[i + 1][j], dp[i][j + 1])\n      dp[i][j] = maxOf(1, next - dungeon[i][j])\n    }\n  }\n\n  return dp[0][0]\n}",
        dart: "int calculateMinimumHP(List<List<int>> dungeon) {\n  int rows = dungeon.length, cols = dungeon[0].length;\n  List<List<int>> dp = List.generate(rows+1, (_) => List<int>.filled(cols+1, 1<<30));\n  dp[rows][cols-1] = 1;\n  dp[rows-1][cols] = 1;\n\n  for (int i = rows-1; i >= 0; i--) {\n    for (int j = cols-1; j >= 0; j--) {\n      int next = min(dp[i+1][j], dp[i][j+1]);\n      dp[i][j] = max(1, next - dungeon[i][j]);\n    }\n  }\n\n  return dp[0][0];\n}",
        swift: "func calculateMinimumHP(_ dungeon: [[Int]]) -> Int {\n    let rows = dungeon.count, cols = dungeon[0].count\n    var dp = Array(repeating: Array(repeating: Int.max/2, count: cols+1), count: rows+1)\n    dp[rows][cols-1] = 1\n    dp[rows-1][cols] = 1\n\n    for i in stride(from: rows-1, through: 0, by: -1) {\n        for j in stride(from: cols-1, through: 0, by: -1) {\n            let next = min(dp[i+1][j], dp[i][j+1])\n            dp[i][j] = max(1, next - dungeon[i][j])\n        }\n    }\n\n    return dp[0][0]\n}",
        haskell: "calculateMinimumHP :: [[Int]] -> Int\ncalculateMinimumHP dungeon = dp !! 0 !! 0\n  where\n    rows = length dungeon\n    cols = length (head dungeon)\n    dp = [[solve i j | j <- [0..cols-1]] | i <- [0..rows-1]]\n    solve i j\n      | i == rows || j == cols = 1\n      | i == rows-1 && j == cols-1 = max 1 (1 - dungeon !! i !! j)\n      | otherwise = max 1 (minNext - dungeon !! i !! j)\n      where\n        minNext = if i == rows-1 then dp !! i !! (j+1) else if j == cols-1 then dp !! (i+1) !! j else min (dp !! (i+1) !! j) (dp !! i !! (j+1))"
      }
    },
    {
      id: 13,
      title: 'Minimum Falling Path Sum II',
      difficulty: 'hard',
      tags: ['dp'],
      description: 'Find min sum falling through grid, each row pick different column than previous.',
      examples: [
        { input: 'grid = [[1,2,3],[4,5,6],[7,8,9]]', output: '13', explanation: 'Path: 1→5→7 = 13' }
      ],
      constraints: 'n ≤ 200, grid[i][j] ∈ [-99, 99]',
      hint: 'dp[i][j] = min sum at row i, col j. For each cell, find min from row i-1 excluding col j.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun minimumFallingPathSumII(grid: Array<IntArray>): Int {\n  val n = grid.size\n  val dp = Array(n) { IntArray(n) }\n\n  for (j in 0 until n) dp[0][j] = grid[0][j]\n\n  for (i in 1 until n) {\n    val prevMin1 = dp[i-1].withIndex().minByOrNull { it.value }!!\n    val prevMin2 = dp[i-1].withIndex().filter { it.index != prevMin1.index }.minByOrNull { it.value }!!\n\n    for (j in 0 until n) {\n      dp[i][j] = grid[i][j] + if (j == prevMin1.index) prevMin2.value else prevMin1.value\n    }\n  }\n\n  return dp[n-1].minOrNull()!!\n}",
        dart: "int minimumFallingPathSumII(List<List<int>> grid) {\n  int n = grid.length;\n  List<List<int>> dp = List.generate(n, (_) => List<int>.filled(n, 0));\n\n  for (int j = 0; j < n; j++) dp[0][j] = grid[0][j];\n\n  for (int i = 1; i < n; i++) {\n    int minVal = 1<<30, minIdx = 0, min2Val = 1<<30;\n    for (int j = 0; j < n; j++) {\n      if (dp[i-1][j] < minVal) {\n        min2Val = minVal;\n        minVal = dp[i-1][j];\n        minIdx = j;\n      } else if (dp[i-1][j] < min2Val) {\n        min2Val = dp[i-1][j];\n      }\n    }\n\n    for (int j = 0; j < n; j++) {\n      dp[i][j] = grid[i][j] + (j == minIdx ? min2Val : minVal);\n    }\n  }\n\n  int result = 1<<30;\n  for (int j = 0; j < n; j++) result = min(result, dp[n-1][j]);\n  return result;\n}",
        swift: "func minimumFallingPathSumII(_ grid: [[Int]]) -> Int {\n    let n = grid.count\n    var dp = Array(repeating: Array(repeating: 0, count: n), count: n)\n\n    for j in 0..<n { dp[0][j] = grid[0][j] }\n\n    for i in 1..<n {\n        var minVal = Int.max, minIdx = 0, min2Val = Int.max\n        for j in 0..<n {\n            if dp[i-1][j] < minVal {\n                min2Val = minVal\n                minVal = dp[i-1][j]\n                minIdx = j\n            } else if dp[i-1][j] < min2Val {\n                min2Val = dp[i-1][j]\n            }\n        }\n\n        for j in 0..<n {\n            dp[i][j] = grid[i][j] + (j == minIdx ? min2Val : minVal)\n        }\n    }\n\n    return dp[n-1].min()!\n}",
        haskell: "minimumFallingPathSumII :: [[Int]] -> Int\nminimumFallingPathSumII grid = minimum (dp !! (n-1))\n  where\n    n = length grid\n    dp = [row i | i <- [0..n-1]]\n    row 0 = head grid\n    row i = [grid !! i !! j + (if j == minIdx then min2Val else minVal)\n            | j <- [0..n-1]]\n      where\n        prevRow = dp !! (i-1)\n        sorted = sort (zip prevRow [0..])\n        minVal = fst (head sorted)\n        minIdx = snd (head sorted)\n        min2Val = if snd (head sorted) == j then fst (sorted !! 1) else fst (head sorted)\n\n    "
      }
    },
    {
      id: 14,
      title: 'Count Vowels Permutation',
      difficulty: 'hard',
      tags: ['dp', 'permutation'],
      description: 'Count permutations of length n following vowel transition rules.',
      examples: [
        { input: 'n = 1', output: '5', explanation: 'a,e,i,o,u all valid' }
      ],
      constraints: '1 ≤ n ≤ 20000',
      hint: 'dp[i][v] = count of valid strings of length i ending in vowel v. Use transition matrix.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun countVowelPermutation(n: Int): Int {\n  val MOD = 1_000_000_007\n  val dp = longArrayOf(1, 1, 1, 1, 1)\n\n  repeat(n - 1) {\n    val next = longArrayOf(0, 0, 0, 0, 0)\n    next[0] = (dp[1] + dp[2] + dp[4]) % MOD\n    next[1] = (dp[0] + dp[2]) % MOD\n    next[2] = (dp[1] + dp[3]) % MOD\n    next[3] = dp[2] % MOD\n    next[4] = (dp[2] + dp[3]) % MOD\n    for (i in 0..4) dp[i] = next[i]\n  }\n\n  return (dp.sum() % MOD).toInt()\n}",
        dart: "int countVowelPermutation(int n) {\n  final MOD = 1000000007;\n  List<int> dp = [1, 1, 1, 1, 1];\n\n  for (int i = 0; i < n - 1; i++) {\n    List<int> next = List<int>.filled(5, 0);\n    next[0] = (dp[1] + dp[2] + dp[4]) % MOD;\n    next[1] = (dp[0] + dp[2]) % MOD;\n    next[2] = (dp[1] + dp[3]) % MOD;\n    next[3] = dp[2] % MOD;\n    next[4] = (dp[2] + dp[3]) % MOD;\n    dp = next;\n  }\n\n  return dp.reduce((a, b) => (a + b) % MOD);\n}",
        swift: "func countVowelPermutation(_ n: Int) -> Int {\n    let MOD = 1_000_000_007\n    var dp = [1, 1, 1, 1, 1]\n\n    for _ in 0..<(n-1) {\n        var next = Array(repeating: 0, count: 5)\n        next[0] = (dp[1] + dp[2] + dp[4]) % MOD\n        next[1] = (dp[0] + dp[2]) % MOD\n        next[2] = (dp[1] + dp[3]) % MOD\n        next[3] = dp[2] % MOD\n        next[4] = (dp[2] + dp[3]) % MOD\n        dp = next\n    }\n\n    return dp.reduce(0, +) % MOD\n}",
        haskell: "countVowelPermutation :: Int -> Int\ncountVowelPermutation n = foldl1 (+) (iterate step [1,1,1,1,1] !! (n-1))\n  where\n    mod = 1000000007\n    step dp = map (\\mod -> mod dp)\n              [(\\\\dp -> (dp!!1 + dp!!2 + dp!!4) \\`mod\\` mod),\n               (\\\\dp -> (dp!!0 + dp!!2) \\`mod\\` mod),\n               (\\\\dp -> (dp!!1 + dp!!3) \\`mod\\` mod),\n               (\\\\dp -> dp!!2 \\`mod\\` mod),\n               (\\\\dp -> (dp!!2 + dp!!3) \\`mod\\` mod)]"
      }
    },
    {
      id: 15,
      title: 'Number of Digit One (Digit DP)',
      difficulty: 'hard',
      tags: ['digit-dp'],
      description: 'Count occurrences of digit 1 in all numbers from 1 to n.',
      examples: [
        { input: 'n = 13', output: '6', explanation: '1,10,11,12,13 have 1s: 1+1+2+1+1 = 6' }
      ],
      constraints: '0 ≤ n ≤ 10¹⁸',
      hint: 'Digit DP: process digit by digit, count 1s at each position.',
      timeComplexity: 'O(log₁₀ n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun countDigitOne(n: Int): Int {\n  var count = 0\n  var factor = 1L\n\n  while (factor <= n) {\n    val higher = (n / (factor * 10)).toLong()\n    val cur = (n / factor % 10).toLong()\n    val lower = (n % factor).toLong()\n\n    count += when {\n      cur == 0L -> (higher * factor).toInt()\n      cur == 1L -> (higher * factor + lower + 1).toInt()\n      else -> ((higher + 1) * factor).toInt()\n    }\n\n    factor *= 10\n  }\n\n  return count\n}",
        dart: "int countDigitOne(int n) {\n  int count = 0;\n  int factor = 1;\n\n  while (factor <= n) {\n    int higher = n ~/ (factor * 10);\n    int cur = n ~/ factor % 10;\n    int lower = n % factor;\n\n    if (cur == 0) {\n      count += higher * factor;\n    } else if (cur == 1) {\n      count += higher * factor + lower + 1;\n    } else {\n      count += (higher + 1) * factor;\n    }\n\n    factor *= 10;\n  }\n\n  return count;\n}",
        swift: "func countDigitOne(_ n: Int) -> Int {\n    var count = 0\n    var factor = 1\n\n    while factor <= n {\n        let higher = n / (factor * 10)\n        let cur = (n / factor) % 10\n        let lower = n % factor\n\n        if cur == 0 {\n            count += higher * factor\n        } else if cur == 1 {\n            count += higher * factor + lower + 1\n        } else {\n            count += (higher + 1) * factor\n        }\n\n        factor *= 10\n    }\n\n    return count\n}",
        haskell: "countDigitOne :: Int -> Int\ncountDigitOne n = go n 1 0\n  where\n    go n factor count\n      | factor > n = count\n      | otherwise = go n (factor * 10) newCount\n      where\n        higher = n \\`div\\` (factor * 10)\n        cur = (n \\`div\\` factor) \\`mod\\` 10\n        lower = n \\`mod\\` factor\n        newCount = count + case cur of\n                     0 -> higher * factor\n                     1 -> higher * factor + lower + 1\n                     _ -> (higher + 1) * factor"
      }
    },
    {
      id: 16,
      title: 'Non-negative Integers without Consecutive Ones',
      difficulty: 'medium',
      tags: ['digit-dp', 'bit'],
      description: 'Count non-negative integers ≤ n with no consecutive 1 bits.',
      examples: [
        { input: 'n = 5', output: '5', explanation: '[0,1,2,4,5] are valid, 3 has 11 in binary' }
      ],
      constraints: '0 ≤ n ≤ 10⁹',
      hint: 'Digit DP on binary representation. Fibonacci-like transition.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun findIntegers(n: Int): Int {\n  val bits = n.toString(2).reversed()\n  val len = bits.length\n  val f = IntArray(len + 2)\n  f[0] = 1\n  f[1] = 2\n  for (i in 2 until len + 1) f[i] = f[i-1] + f[i-2]\n\n  var res = 0\n  var prevOne = false\n  for (i in len - 1 downTo 0) {\n    if (bits[i] == '1') {\n      res += f[i]\n      if (prevOne) return res\n      prevOne = true\n    } else {\n      prevOne = false\n    }\n  }\n  return res + 1\n}",
        dart: "int findIntegers(int n) {\n  String bits = n.toRadixString(2);\n  List<int> f = List<int>.filled(bits.length + 2, 0);\n  f[0] = 1;\n  f[1] = 2;\n  for (int i = 2; i < bits.length + 1; i++) {\n    f[i] = f[i-1] + f[i-2];\n  }\n\n  int res = 0;\n  bool prevOne = false;\n  for (int i = bits.length - 1; i >= 0; i--) {\n    if (bits[i] == '1') {\n      res += f[i];\n      if (prevOne) return res;\n      prevOne = true;\n    } else {\n      prevOne = false;\n    }\n  }\n  return res + 1;\n}",
        swift: "func findIntegers(_ n: Int) -> Int {\n    let bits = String(n, radix: 2)\n    let len = bits.count\n    var f = Array(repeating: 0, count: len + 2)\n    f[0] = 1; f[1] = 2\n    for i in 2..<(len + 1) { f[i] = f[i-1] + f[i-2] }\n\n    var res = 0, prevOne = false\n    for (idx, char) in bits.reversed().enumerated() {\n        if char == \"1\" {\n            res += f[idx]\n            if prevOne { return res }\n            prevOne = true\n        } else {\n            prevOne = false\n        }\n    }\n    return res + 1\n}",
        haskell: "findIntegers :: Int -> Int\nfindIntegers n = go (bits n) False 0\n  where\n    bits x | x == 0 = []\n           | otherwise = bits (x \\`div\\` 2) ++ [x \\`mod\\` 2]\n\n    fib = 1 : 2 : zipWith (+) fib (tail fib)\n\n    go [] _ res = res + 1\n    go (b:bs) prevOne res\n      | b == 1 = if prevOne then res + fib !! length bs else go bs True (res + fib !! length bs)\n      | otherwise = go bs False res"
      }
    },
    {
      id: 17,
      title: 'Maximum Sum BST in Binary Tree',
      difficulty: 'hard',
      tags: ['tree-dp', 'bst'],
      description: 'Find maximum sum of any BST within tree.',
      examples: [
        { input: 'root = [1,4,3,2,4,2,5]', output: '20', explanation: 'BST [2,1,3] sums to 6, [2] to 2, [4,2,null,null,3] to 9' }
      ],
      constraints: 'nodes ≤ 1000, node.val ∈ [-10000, 10000]',
      hint: 'Tree DP: track (isBST, min, max, sum) for each subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h = height',
      solutions: {
        kotlin: "fun maxSumBST(root: TreeNode?): Int {\n  var ans = 0\n\n  data class Info(val isBST: Boolean, val minVal: Int, val maxVal: Int, val sum: Int)\n\n  fun dfs(node: TreeNode?): Info {\n    if (node == null) return Info(true, Int.MAX_VALUE, Int.MIN_VALUE, 0)\n\n    val left = dfs(node.left)\n    val right = dfs(node.right)\n\n    val isBST = left.isBST && right.isBST &&\n                (left.maxVal < node.`val`) && (node.`val` < right.minVal)\n\n    if (isBST) ans = maxOf(ans, left.sum + node.`val` + right.sum)\n\n    val newMin = if (node.left != null) left.minVal else node.`val`\n    val newMax = if (node.right != null) right.maxVal else node.`val`\n\n    return Info(isBST, newMin, newMax, left.sum + node.`val` + right.sum)\n  }\n\n  dfs(root)\n  return ans\n}",
        dart: "int maxSumBST(TreeNode? root) {\n  int ans = 0;\n\n  List<dynamic> dfs(TreeNode? node) {\n    if (node == null) return [true, 1<<30, -(1<<30), 0];\n\n    List<dynamic> left = dfs(node.left);\n    List<dynamic> right = dfs(node.right);\n\n    bool isBST = left[0] && right[0] && left[1] < node.val && node.val < right[2];\n\n    if (isBST) ans = max(ans, left[3] + node.val + right[3]);\n\n    int newMin = node.left != null ? left[1] : node.val;\n    int newMax = node.right != null ? right[2] : node.val;\n\n    return [isBST, newMin, newMax, left[3] + node.val + right[3]];\n  }\n\n  dfs(root);\n  return ans;\n}",
        swift: "func maxSumBST(_ root: TreeNode?) -> Int {\n    var ans = 0\n\n    func dfs(_ node: TreeNode?) -> (isBST: Bool, minVal: Int, maxVal: Int, sum: Int) {\n        guard let node = node else { return (true, Int.max, Int.min, 0) }\n\n        let left = dfs(node.left)\n        let right = dfs(node.right)\n\n        let isBST = left.isBST && right.isBST &&\n                    left.maxVal < node.val && node.val < right.minVal\n\n        if isBST { ans = max(ans, left.sum + node.val + right.sum) }\n\n        let newMin = node.left != nil ? left.minVal : node.val\n        let newMax = node.right != nil ? right.maxVal : node.val\n\n        return (isBST, newMin, newMax, left.sum + node.val + right.sum)\n    }\n\n    dfs(root)\n    return ans\n}",
        haskell: "maxSumBST :: Maybe TreeNode -> Int\nmaxSumBST root = fst (go root)\n  where\n    go Nothing = (0, (True, maxBound, minBound, 0))\n    go (Just node) =\n      let (ansL, (isBSTL, minL, maxL, sumL)) = go (left node)\n          (ansR, (isBSTR, minR, maxR, sumR)) = go (right node)\n          isBST = isBSTL && isBSTR && maxL < val node && val node < minR\n          newSum = sumL + val node + sumR\n          newAns = if isBST then max ansL (max ansR newSum) else max ansL ansR\n          newMin = if isJust (left node) then minL else val node\n          newMax = if isJust (right node) then maxR else val node\n      in (newAns, (isBST, newMin, newMax, newSum))"
      }
    },
    {
      id: 18,
      title: 'Binary Tree Cameras',
      difficulty: 'hard',
      tags: ['tree-dp', 'greedy'],
      description: 'Minimum cameras to monitor all nodes (parent node monitors child).',
      examples: [
        { input: 'root = [0,0,null,0,0]', output: '1', explanation: 'One camera at (0,0) covers all' }
      ],
      constraints: 'nodes ≤ 1000',
      hint: 'Greedy DP: states = (uncovered, covered, hasCamera). Place greedily from leaves.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun minCameraCover(root: TreeNode?): Int {\n  var ans = 0\n\n  fun dfs(node: TreeNode?): Int {\n    if (node == null) return 1\n    val left = dfs(node.left)\n    val right = dfs(node.right)\n    if (left == 0 || right == 0) {\n      ans++\n      return 2\n    }\n    return if (left == 2 || right == 2) 0 else 1\n  }\n\n  return if (dfs(root) == 0) ans + 1 else ans\n}",
        dart: "int minCameraCover(TreeNode? root) {\n  List<int> result = [0];\n\n  int dfs(TreeNode? node) {\n    if (node == null) return 1;\n    int left = dfs(node.left);\n    int right = dfs(node.right);\n    if (left == 0 || right == 0) {\n      result[0]++;\n      return 2;\n    }\n    return (left == 2 || right == 2) ? 0 : 1;\n  }\n\n  return dfs(root) == 0 ? result[0] + 1 : result[0];\n}",
        swift: "func minCameraCover(_ root: TreeNode?) -> Int {\n    var ans = 0\n\n    func dfs(_ node: TreeNode?) -> Int {\n        guard let node = node else { return 1 }\n        let left = dfs(node.left)\n        let right = dfs(node.right)\n        if left == 0 || right == 0 {\n            ans += 1\n            return 2\n        }\n        return (left == 2 || right == 2) ? 0 : 1\n    }\n\n    return dfs(root) == 0 ? ans + 1 : ans\n}",
        haskell: "minCameraCover :: Maybe TreeNode -> Int\nminCameraCover root = if fst result == 0 then snd result + 1 else snd result\n  where\n    go Nothing = (1, 0)\n    go (Just node) =\n      let (leftState, leftCams) = go (left node)\n          (rightState, rightCams) = go (right node)\n          totalCams = leftCams + rightCams\n          newState = if leftState == 0 || rightState == 0\n                     then (2, totalCams + 1)\n                     else if leftState == 2 || rightState == 2\n                          then (0, totalCams)\n                          else (1, totalCams)\n      in newState\n    result = go root"
      }
    },
    {
      id: 19,
      title: 'House Robber III',
      difficulty: 'medium',
      tags: ['tree-dp'],
      description: 'Rob houses in tree where adjacent nodes cannot be robbed.',
      examples: [
        { input: 'root = [3,2,3,null,3,null,1]', output: '7', explanation: 'Rob values [3,3,1]' }
      ],
      constraints: 'nodes ≤ 100',
      hint: 'Tree DP: track (rob, notRob) for each subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun rob(root: TreeNode?): Int {\n  fun dfs(node: TreeNode?): Pair<Int, Int> {\n    if (node == null) return Pair(0, 0)\n    val (leftRob, leftNotRob) = dfs(node.left)\n    val (rightRob, rightNotRob) = dfs(node.right)\n    val rob = node.`val` + leftNotRob + rightNotRob\n    val notRob = maxOf(leftRob, leftNotRob) + maxOf(rightRob, rightNotRob)\n    return Pair(rob, notRob)\n  }\n  val (rob, notRob) = dfs(root)\n  return maxOf(rob, notRob)\n}",
        dart: "int rob(TreeNode? root) {\n  List<int> dfs(TreeNode? node) {\n    if (node == null) return [0, 0];\n    List<int> left = dfs(node.left);\n    List<int> right = dfs(node.right);\n    int robThis = node.val + left[1] + right[1];\n    int notRob = max(left[0], left[1]) + max(right[0], right[1]);\n    return [robThis, notRob];\n  }\n  List<int> result = dfs(root);\n  return max(result[0], result[1]);\n}",
        swift: "func rob(_ root: TreeNode?) -> Int {\n    func dfs(_ node: TreeNode?) -> (Int, Int) {\n        guard let node = node else { return (0, 0) }\n        let (leftRob, leftNotRob) = dfs(node.left)\n        let (rightRob, rightNotRob) = dfs(node.right)\n        let rob = node.val + leftNotRob + rightNotRob\n        let notRob = max(leftRob, leftNotRob) + max(rightRob, rightNotRob)\n        return (rob, notRob)\n    }\n    let (rob, notRob) = dfs(root)\n    return max(rob, notRob)\n}",
        haskell: "rob :: Maybe TreeNode -> Int\nrob root = max a b\n  where (a, b) = go root\n        go Nothing = (0, 0)\n        go (Just node) =\n          let (lr, lnr) = go (left node)\n              (rr, rnr) = go (right node)\n              robThis = val node + lnr + rnr\n              notRob = max lr lnr + max rr rnr\n          in (robThis, notRob)"
      }
    },
    {
      id: 20,
      title: 'Painting Houses III',
      difficulty: 'hard',
      tags: ['dp', 'painting'],
      description: 'Paint houses with minimum cost. Adjacent different colors, minimize cost + neighborhoods.',
      examples: [
        { input: 'houses=[0,1,0], cost=[[1,10],[10,1],[10,10],[1,10]], m=2, n=2', output: '5', explanation: 'Paint as [1,2,1]' }
      ],
      constraints: 'houses.length ≤ 100, m ≤ 20, n ≤ 20',
      hint: 'dp[i][c][k] = min cost painting first i houses with i-th house color c and k neighborhoods.',
      timeComplexity: 'O(n * m * n * m)',
      spaceComplexity: 'O(n * m * n)',
      solutions: {
        kotlin: "fun minCost(houses: IntArray, cost: Array<IntArray>, m: Int, n: Int): Int {\n  val INF = Int.MAX_VALUE / 2\n  val dp = Array(m + 1) { Array(n + 1) { IntArray(m + 1) { INF } } }\n\n  if (houses[0] != 0) {\n    dp[1][houses[0]][1] = 0\n  } else {\n    for (c in 1..n) dp[1][c][1] = cost[0][c - 1]\n  }\n\n  for (i in 2..m) {\n    if (houses[i - 1] != 0) {\n      val c = houses[i - 1]\n      for (k in 1..i) {\n        for (pc in 1..n) {\n          if (c != pc) {\n            dp[i][c][k] = minOf(dp[i][c][k], dp[i - 1][pc][k - 1])\n          } else if (k >= 1) {\n            dp[i][c][k] = minOf(dp[i][c][k], dp[i - 1][pc][k])\n          }\n        }\n      }\n    } else {\n      for (c in 1..n) {\n        for (k in 1..i) {\n          for (pc in 1..n) {\n            if (c != pc) {\n              dp[i][c][k] = minOf(dp[i][c][k], dp[i - 1][pc][k - 1] + cost[i - 1][c - 1])\n            } else {\n              dp[i][c][k] = minOf(dp[i][c][k], dp[i - 1][pc][k] + cost[i - 1][c - 1])\n            }\n          }\n        }\n      }\n    }\n  }\n\n  var ans = INF\n  for (c in 1..n) for (k in 1..m) ans = minOf(ans, dp[m][c][k])\n  return ans\n}",
        dart: "int minCost(List<int> houses, List<List<int>> cost, int m, int n) {\n  int INF = 1<<30;\n  List<List<List<int>>> dp = List.generate(m+1, (_) => List.generate(n+1, (_) => List<int>.filled(m+1, INF)));\n\n  if (houses[0] != 0) {\n    dp[1][houses[0]][1] = 0;\n  } else {\n    for (int c = 1; c <= n; c++) dp[1][c][1] = cost[0][c-1];\n  }\n\n  for (int i = 2; i <= m; i++) {\n    if (houses[i-1] != 0) {\n      int c = houses[i-1];\n      for (int k = 1; k <= i; k++) {\n        for (int pc = 1; pc <= n; pc++) {\n          if (c != pc) {\n            dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k-1]);\n          } else {\n            dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k]);\n          }\n        }\n      }\n    } else {\n      for (int c = 1; c <= n; c++) {\n        for (int k = 1; k <= i; k++) {\n          for (int pc = 1; pc <= n; pc++) {\n            if (c != pc) {\n              dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k-1] + cost[i-1][c-1]);\n            } else {\n              dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k] + cost[i-1][c-1]);\n            }\n          }\n        }\n      }\n    }\n  }\n\n  int ans = INF;\n  for (int c = 1; c <= n; c++) {\n    for (int k = 1; k <= m; k++) {\n      ans = min(ans, dp[m][c][k]);\n    }\n  }\n  return ans;\n}",
        swift: "func minCost(_ houses: [Int], _ cost: [[Int]], _ m: Int, _ n: Int) -> Int {\n    let INF = Int.max / 2\n    var dp = Array(repeating: Array(repeating: Array(repeating: INF, count: m+1), count: n+1), count: m+1)\n\n    if houses[0] != 0 {\n        dp[1][houses[0]][1] = 0\n    } else {\n        for c in 1...n {\n            dp[1][c][1] = cost[0][c-1]\n        }\n    }\n\n    for i in 2...m {\n        if houses[i-1] != 0 {\n            let c = houses[i-1]\n            for k in 1...i {\n                for pc in 1...n {\n                    if c != pc {\n                        dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k-1])\n                    } else {\n                        dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k])\n                    }\n                }\n            }\n        } else {\n            for c in 1...n {\n                for k in 1...i {\n                    for pc in 1...n {\n                        if c != pc {\n                            dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k-1] + cost[i-1][c-1])\n                        } else {\n                            dp[i][c][k] = min(dp[i][c][k], dp[i-1][pc][k] + cost[i-1][c-1])\n                        }\n                    }\n                }\n            }\n        }\n    }\n\n    var ans = INF\n    for c in 1...n {\n        for k in 1...m {\n            ans = min(ans, dp[m][c][k])\n        }\n    }\n    return ans\n}",
        haskell: "minCost :: [Int] -> [[Int]] -> Int -> Int -> Int\nminCost houses cost m n = minimum [dp !! m !! c !! k | c <- [1..n], k <- [1..m]]\n  where\n    inf = maxBound \\`div\\` 2\n    dp = [[[solve i c k | k <- [0..m]] | c <- [0..n]] | i <- [0..m]]\n    solve 0 _ _ = 0\n    solve i c k\n      | i < 1 || c < 1 || k < 1 = inf\n      | houses !! (i-1) /= 0 = solveFixed i (houses !! (i-1)) k\n      | otherwise = minimum [solve (i-1) pc (if c == pc then k else k-1) + cost !! (i-1) !! (c-1) | pc <- [1..n]]\n\n    solveFixed i c k = minimum [solve (i-1) pc (if c == pc then k else k-1) | pc <- [1..n]]"
      }
    }
  ]
}
