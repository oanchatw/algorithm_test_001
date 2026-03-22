export default {
  id: 18,
  year: 2,
  slug: 'backtracking',
  icon: '🔙',
  color: '#79c0ff',
  title: 'Backtracking',
  subtitle: 'Constraint Satisfaction, Pruning, Search Trees',
  description: 'Master backtracking algorithms for combinatorial problems with pruning strategies and constraint satisfaction.',
  theorems: [
    {
      id: 1,
      name: 'Backtracking Search Tree Size',
      katex_statement: '\\text{Worst case: } O(b^d) \\text{ where } b = \\text{branching factor, } d = \\text{depth}',
      statement_text: 'Without pruning, backtracking explores exponential search space. Effective pruning reduces practical runtime significantly.',
      proof: 'At each level, we have b choices. With depth d, total nodes = 1 + b + b² + ... + b^d = O(b^d). Early termination via pruning prunes entire subtrees, reducing explored nodes.'
    },
    {
      id: 2,
      name: 'Pruning Effectiveness via Constraint Propagation',
      katex_statement: '\\text{Prune if: } \\text{constraint}(\\text{current state}) = \\text{false}',
      statement_text: 'Forward checking and constraint propagation detect infeasible partial solutions early, eliminating exponential subtrees.',
      proof: 'If partial assignment violates constraint, no extension can satisfy it. Pruning here saves exploring all 2^(remaining) possibilities below this node.'
    },
    {
      id: 3,
      name: 'N-Queens Solution Count Formula',
      katex_statement: '\\text{Q}(n) = \\text{number of valid } n \\text{-queens placements}',
      statement_text: 'The N-Queens problem has exactly Q(n) solutions. For n=8, Q(8)=92. Backtracking with row/col/diagonal constraints achieves O(N!) time.',
      proof: 'By symmetry and constraint checking, first Queen has n choices, second has at most n-3 (avoiding row, column, diagonals). Backtracking explores valid placements efficiently.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Subsets',
      difficulty: 'medium',
      tags: ['backtracking', 'combinations'],
      description: 'Generate all subsets of unique integers.',
      examples: [
        { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: '8 subsets (2^n)' }
      ],
      constraints: '1 ≤ nums.length ≤ 10',
      hint: 'For each element, decide to include or exclude. Binary tree of decisions.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      solutions: {
        kotlin: "fun subsets(nums: IntArray): List<List<Int>> {\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>) {\n    result.add(path.toList())\n    for (i in start until nums.size) {\n      path.add(nums[i])\n      backtrack(i + 1, path)\n      path.removeAt(path.size - 1)\n    }\n  }\n\n  backtrack(0, mutableListOf())\n  return result\n}",
        dart: "List<List<int>> subsets(List<int> nums) {\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path) {\n    result.add(List.from(path));\n    for (int i = start; i < nums.length; i++) {\n      path.add(nums[i]);\n      backtrack(i + 1, path);\n      path.removeLast();\n    }\n  }\n\n  backtrack(0, []);\n  return result;\n}",
        swift: "func subsets(_ nums: [Int]) -> [[Int]] {\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int]) {\n        result.append(path)\n        for i in start..<nums.count {\n            path.append(nums[i])\n            backtrack(i + 1, &path)\n            path.removeLast()\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(0, &path)\n    return result\n}",
        haskell: "subsets :: [Int] -> [[Int]]\nsubsets nums = go 0 []\n  where\n    go start path = [path] ++ concat [go (i+1) (path ++ [nums!!i]) | i <- [start..length nums-1]]"
      }
    },
    {
      id: 2,
      title: 'Subsets II (with Duplicates)',
      difficulty: 'medium',
      tags: ['backtracking', 'combinations'],
      description: 'Generate all subsets. Array may have duplicates.',
      examples: [
        { input: 'nums = [4,4,4,1,0]', output: 'Subsets without duplicates' }
      ],
      constraints: '1 ≤ nums.length ≤ 20',
      hint: 'Sort array. Skip duplicate elements at same level.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      solutions: {
        kotlin: "fun subsetsWithDup(nums: IntArray): List<List<Int>> {\n  nums.sort()\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>) {\n    result.add(path.toList())\n    for (i in start until nums.size) {\n      if (i > start && nums[i] == nums[i - 1]) continue\n      path.add(nums[i])\n      backtrack(i + 1, path)\n      path.removeAt(path.size - 1)\n    }\n  }\n\n  backtrack(0, mutableListOf())\n  return result\n}",
        dart: "List<List<int>> subsetsWithDup(List<int> nums) {\n  nums.sort();\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path) {\n    result.add(List.from(path));\n    for (int i = start; i < nums.length; i++) {\n      if (i > start && nums[i] == nums[i-1]) continue;\n      path.add(nums[i]);\n      backtrack(i + 1, path);\n      path.removeLast();\n    }\n  }\n\n  backtrack(0, []);\n  return result;\n}",
        swift: "func subsetsWithDup(_ nums: [Int]) -> [[Int]] {\n    let sorted = nums.sorted()\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int]) {\n        result.append(path)\n        for i in start..<sorted.count {\n            if i > start && sorted[i] == sorted[i-1] { continue }\n            path.append(sorted[i])\n            backtrack(i + 1, &path)\n            path.removeLast()\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(0, &path)\n    return result\n}",
        haskell: "subsetsWithDup :: [Int] -> [[Int]]\nsubsetsWithDup nums = go (sort nums) 0 []\n  where\n    go nums start path = [path] ++ go' nums start path\n    go' [] _ _ = []\n    go' (x:xs) start path = let newPath = path ++ [x] in [go xs (start+1) newPath] ++ go' xs (start+1) path\n    "
      }
    },
    {
      id: 3,
      title: 'Permutations',
      difficulty: 'medium',
      tags: ['backtracking', 'permutation'],
      description: 'Generate all permutations of unique integers.',
      examples: [
        { input: 'nums = [1,2,3]', output: '6 permutations' }
      ],
      constraints: '1 ≤ nums.length ≤ 8',
      hint: 'Use boolean visited array. Decide next element at each step.',
      timeComplexity: 'O(n! * n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun permute(nums: IntArray): List<List<Int>> {\n  val result = mutableListOf<List<Int>>()\n  val visited = BooleanArray(nums.size)\n\n  fun backtrack(path: MutableList<Int>) {\n    if (path.size == nums.size) {\n      result.add(path.toList())\n      return\n    }\n\n    for (i in nums.indices) {\n      if (visited[i]) continue\n      visited[i] = true\n      path.add(nums[i])\n      backtrack(path)\n      path.removeAt(path.size - 1)\n      visited[i] = false\n    }\n  }\n\n  backtrack(mutableListOf())\n  return result\n}",
        dart: "List<List<int>> permute(List<int> nums) {\n  List<List<int>> result = [];\n  List<bool> visited = List<bool>.filled(nums.length, false);\n\n  void backtrack(List<int> path) {\n    if (path.length == nums.length) {\n      result.add(List.from(path));\n      return;\n    }\n\n    for (int i = 0; i < nums.length; i++) {\n      if (visited[i]) continue;\n      visited[i] = true;\n      path.add(nums[i]);\n      backtrack(path);\n      path.removeLast();\n      visited[i] = false;\n    }\n  }\n\n  backtrack([]);\n  return result;\n}",
        swift: "func permute(_ nums: [Int]) -> [[Int]] {\n    var result: [[Int]] = []\n    var visited = Array(repeating: false, count: nums.count)\n\n    func backtrack(_ path: inout [Int]) {\n        if path.count == nums.count {\n            result.append(path)\n            return\n        }\n\n        for i in 0..<nums.count {\n            if visited[i] { continue }\n            visited[i] = true\n            path.append(nums[i])\n            backtrack(&path)\n            path.removeLast()\n            visited[i] = false\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(&path)\n    return result\n}",
        haskell: "permute :: [Int] -> [[Int]]\npermute nums = go nums []\n  where\n    go [] _ = [[]]\n    go xs path = concat [go (deleteAt i xs) (path ++ [xs !! i]) | i <- [0..length xs-1]]\n    deleteAt i xs = take i xs ++ drop (i+1) xs"
      }
    },
    {
      id: 4,
      title: 'Permutations II (with Duplicates)',
      difficulty: 'medium',
      tags: ['backtracking', 'permutation'],
      description: 'Generate all unique permutations. Array may have duplicates.',
      examples: [
        { input: 'nums = [1,1,2]', output: '3 unique permutations' }
      ],
      constraints: '1 ≤ nums.length ≤ 8',
      hint: 'Sort array. Skip duplicate at same depth.',
      timeComplexity: 'O(n! * n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun permuteUnique(nums: IntArray): List<List<Int>> {\n  nums.sort()\n  val result = mutableListOf<List<Int>>()\n  val visited = BooleanArray(nums.size)\n\n  fun backtrack(path: MutableList<Int>) {\n    if (path.size == nums.size) {\n      result.add(path.toList())\n      return\n    }\n\n    for (i in nums.indices) {\n      if (visited[i] || (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1])) continue\n      visited[i] = true\n      path.add(nums[i])\n      backtrack(path)\n      path.removeAt(path.size - 1)\n      visited[i] = false\n    }\n  }\n\n  backtrack(mutableListOf())\n  return result\n}",
        dart: "List<List<int>> permuteUnique(List<int> nums) {\n  nums.sort();\n  List<List<int>> result = [];\n  List<bool> visited = List<bool>.filled(nums.length, false);\n\n  void backtrack(List<int> path) {\n    if (path.length == nums.length) {\n      result.add(List.from(path));\n      return;\n    }\n\n    for (int i = 0; i < nums.length; i++) {\n      if (visited[i] || (i > 0 && nums[i] == nums[i-1] && !visited[i-1])) continue;\n      visited[i] = true;\n      path.add(nums[i]);\n      backtrack(path);\n      path.removeLast();\n      visited[i] = false;\n    }\n  }\n\n  backtrack([]);\n  return result;\n}",
        swift: "func permuteUnique(_ nums: [Int]) -> [[Int]] {\n    let sorted = nums.sorted()\n    var result: [[Int]] = []\n    var visited = Array(repeating: false, count: sorted.count)\n\n    func backtrack(_ path: inout [Int]) {\n        if path.count == sorted.count {\n            result.append(path)\n            return\n        }\n\n        for i in 0..<sorted.count {\n            if visited[i] || (i > 0 && sorted[i] == sorted[i-1] && !visited[i-1]) { continue }\n            visited[i] = true\n            path.append(sorted[i])\n            backtrack(&path)\n            path.removeLast()\n            visited[i] = false\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(&path)\n    return result\n}",
        haskell: "permuteUnique :: [Int] -> [[Int]]\npermuteUnique nums = go (sort nums) (replicate (length nums) False) []\n  where\n    go nums visited path\n      | length path == length nums = [path]\n      | otherwise = concat [go nums visited' (path ++ [nums !! i])\n                           | i <- [0..length nums-1],\n                             not (visited !! i),\n                             not (i > 0 && nums !! i == nums !! (i-1) && not (visited !! (i-1))),\n                             let visited' = take i visited ++ [True] ++ drop (i+1) visited]"
      }
    },
    {
      id: 5,
      title: 'Combination Sum',
      difficulty: 'medium',
      tags: ['backtracking', 'combination'],
      description: 'Find all combinations summing to target. Reuse elements allowed.',
      examples: [
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' }
      ],
      constraints: '1 ≤ candidates.length ≤ 100, target ≤ 500',
      hint: 'Pass same index to allow reuse. Prune when sum exceeds target.',
      timeComplexity: 'O(2^(target/min))',
      spaceComplexity: 'O(target/min)',
      solutions: {
        kotlin: "fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>, remain: Int) {\n    if (remain == 0) {\n      result.add(path.toList())\n      return\n    }\n    if (remain < 0) return\n\n    for (i in start until candidates.size) {\n      path.add(candidates[i])\n      backtrack(i, path, remain - candidates[i])\n      path.removeAt(path.size - 1)\n    }\n  }\n\n  backtrack(0, mutableListOf(), target)\n  return result\n}",
        dart: "List<List<int>> combinationSum(List<int> candidates, int target) {\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path, int remain) {\n    if (remain == 0) {\n      result.add(List.from(path));\n      return;\n    }\n    if (remain < 0) return;\n\n    for (int i = start; i < candidates.length; i++) {\n      path.add(candidates[i]);\n      backtrack(i, path, remain - candidates[i]);\n      path.removeLast();\n    }\n  }\n\n  backtrack(0, [], target);\n  return result;\n}",
        swift: "func combinationSum(_ candidates: [Int], _ target: Int) -> [[Int]] {\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int], _ remain: Int) {\n        if remain == 0 {\n            result.append(path)\n            return\n        }\n        if remain < 0 { return }\n\n        for i in start..<candidates.count {\n            path.append(candidates[i])\n            backtrack(i, &path, remain - candidates[i])\n            path.removeLast()\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(0, &path, target)\n    return result\n}",
        haskell: "combinationSum :: [Int] -> Int -> [[Int]]\ncombinationSum candidates target = go 0 [] target\n  where\n    go start path remain\n      | remain == 0 = [path]\n      | remain < 0 = []\n      | otherwise = concat [go i (path ++ [candidates !! i]) (remain - candidates !! i) | i <- [start..length candidates-1]]"
      }
    },
    {
      id: 6,
      title: 'Combination Sum II',
      difficulty: 'medium',
      tags: ['backtracking'],
      description: 'Find combinations summing to target. Each element used once. Array has duplicates.',
      examples: [
        { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6],[1,2,5],[1,7],[2,6]]' }
      ],
      constraints: '1 ≤ candidates.length ≤ 100, target ≤ 500',
      hint: 'Sort array. Skip duplicates at same recursion level. Move to next index.',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {\n  candidates.sort()\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>, remain: Int) {\n    if (remain == 0) {\n      result.add(path.toList())\n      return\n    }\n    if (remain < 0) return\n\n    for (i in start until candidates.size) {\n      if (i > start && candidates[i] == candidates[i - 1]) continue\n      path.add(candidates[i])\n      backtrack(i + 1, path, remain - candidates[i])\n      path.removeAt(path.size - 1)\n    }\n  }\n\n  backtrack(0, mutableListOf(), target)\n  return result\n}",
        dart: "List<List<int>> combinationSum2(List<int> candidates, int target) {\n  candidates.sort();\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path, int remain) {\n    if (remain == 0) {\n      result.add(List.from(path));\n      return;\n    }\n    if (remain < 0) return;\n\n    for (int i = start; i < candidates.length; i++) {\n      if (i > start && candidates[i] == candidates[i-1]) continue;\n      path.add(candidates[i]);\n      backtrack(i + 1, path, remain - candidates[i]);\n      path.removeLast();\n    }\n  }\n\n  backtrack(0, [], target);\n  return result;\n}",
        swift: "func combinationSum2(_ candidates: [Int], _ target: Int) -> [[Int]] {\n    let sorted = candidates.sorted()\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int], _ remain: Int) {\n        if remain == 0 {\n            result.append(path)\n            return\n        }\n        if remain < 0 { return }\n\n        for i in start..<sorted.count {\n            if i > start && sorted[i] == sorted[i-1] { continue }\n            path.append(sorted[i])\n            backtrack(i + 1, &path, remain - sorted[i])\n            path.removeLast()\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(0, &path, target)\n    return result\n}",
        haskell: "combinationSum2 :: [Int] -> Int -> [[Int]]\ncombinationSum2 candidates target = go (sort candidates) 0 [] target\n  where\n    go cands start path remain\n      | remain == 0 = [path]\n      | remain < 0 = []\n      | otherwise = concat [go cands (i+1) (path ++ [cands !! i]) (remain - cands !! i)\n                           | i <- [start..length cands-1],\n                             not (i > start && cands !! i == cands !! (i-1))]"
      }
    },
    {
      id: 7,
      title: 'Combination Sum III',
      difficulty: 'medium',
      tags: ['backtracking'],
      description: 'Find k numbers summing to n (1-9). Each number used once.',
      examples: [
        { input: 'k = 3, n = 7', output: '[[1,2,4]]' }
      ],
      constraints: '2 ≤ k ≤ 9, 1 ≤ n ≤ 40',
      hint: 'Backtrack with k count. Numbers from 1-9 only.',
      timeComplexity: 'O(C(9,k))',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun combinationSum3(k: Int, n: Int): List<List<Int>> {\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>, remain: Int) {\n    if (path.size == k) {\n      if (remain == 0) result.add(path.toList())\n      return\n    }\n    if (remain <= 0) return\n\n    for (i in start..9) {\n      path.add(i)\n      backtrack(i + 1, path, remain - i)\n      path.removeAt(path.size - 1)\n    }\n  }\n\n  backtrack(1, mutableListOf(), n)\n  return result\n}",
        dart: "List<List<int>> combinationSum3(int k, int n) {\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path, int remain) {\n    if (path.length == k) {\n      if (remain == 0) result.add(List.from(path));\n      return;\n    }\n    if (remain <= 0) return;\n\n    for (int i = start; i <= 9; i++) {\n      path.add(i);\n      backtrack(i + 1, path, remain - i);\n      path.removeLast();\n    }\n  }\n\n  backtrack(1, [], n);\n  return result;\n}",
        swift: "func combinationSum3(_ k: Int, _ n: Int) -> [[Int]] {\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int], _ remain: Int) {\n        if path.count == k {\n            if remain == 0 { result.append(path) }\n            return\n        }\n        if remain <= 0 { return }\n\n        for i in start...9 {\n            path.append(i)\n            backtrack(i + 1, &path, remain - i)\n            path.removeLast()\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(1, &path, n)\n    return result\n}",
        haskell: "combinationSum3 :: Int -> Int -> [[Int]]\ncombinationSum3 k n = go 1 [] n\n  where\n    go start path remain\n      | length path == k = if remain == 0 then [path] else []\n      | remain <= 0 = []\n      | otherwise = concat [go (i+1) (path ++ [i]) (remain - i) | i <- [start..9]]"
      }
    },
    {
      id: 8,
      title: 'N-Queens',
      difficulty: 'hard',
      tags: ['backtracking', 'constraint-satisfaction'],
      description: 'Place n queens on n×n board. No two queens attack each other.',
      examples: [
        { input: 'n = 4', output: 'Two solutions' }
      ],
      constraints: '1 ≤ n ≤ 9',
      hint: 'Use sets to track occupied columns and diagonals. Backtrack row by row.',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      solutions: {
        kotlin: "fun solveNQueens(n: Int): List<List<String>> {\n  val result = mutableListOf<List<String>>()\n  val board = Array(n) { CharArray(n) { '.' } }\n  val cols = mutableSetOf<Int>()\n  val diag1 = mutableSetOf<Int>()\n  val diag2 = mutableSetOf<Int>()\n\n  fun backtrack(row: Int) {\n    if (row == n) {\n      result.add(board.map { it.joinToString(\"\") })\n      return\n    }\n\n    for (col in 0 until n) {\n      val d1 = row - col\n      val d2 = row + col\n      if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue\n\n      cols.add(col)\n      diag1.add(d1)\n      diag2.add(d2)\n      board[row][col] = 'Q'\n\n      backtrack(row + 1)\n\n      cols.remove(col)\n      diag1.remove(d1)\n      diag2.remove(d2)\n      board[row][col] = '.'\n    }\n  }\n\n  backtrack(0)\n  return result\n}",
        dart: "List<List<String>> solveNQueens(int n) {\n  List<List<String>> result = [];\n  List<List<String>> board = List.generate(n, (_) => List.filled(n, '.'));\n  Set<int> cols = {}, diag1 = {}, diag2 = {};\n\n  void backtrack(int row) {\n    if (row == n) {\n      result.add(board.map((r) => r.join()).toList());\n      return;\n    }\n\n    for (int col = 0; col < n; col++) {\n      int d1 = row - col, d2 = row + col;\n      if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue;\n\n      cols.add(col);\n      diag1.add(d1);\n      diag2.add(d2);\n      board[row][col] = 'Q';\n\n      backtrack(row + 1);\n\n      cols.remove(col);\n      diag1.remove(d1);\n      diag2.remove(d2);\n      board[row][col] = '.';\n    }\n  }\n\n  backtrack(0);\n  return result;\n}",
        swift: "func solveNQueens(_ n: Int) -> [[String]] {\n    var result: [[String]] = []\n    var board = Array(repeating: Array(repeating: \".\", count: n), count: n)\n    var cols = Set<Int>(), diag1 = Set<Int>(), diag2 = Set<Int>()\n\n    func backtrack(_ row: Int) {\n        if row == n {\n            result.append(board.map { $0.joined() })\n            return\n        }\n\n        for col in 0..<n {\n            let d1 = row - col, d2 = row + col\n            if cols.contains(col) || diag1.contains(d1) || diag2.contains(d2) { continue }\n\n            cols.insert(col); diag1.insert(d1); diag2.insert(d2)\n            board[row][col] = \"Q\"\n\n            backtrack(row + 1)\n\n            cols.remove(col); diag1.remove(d1); diag2.remove(d2)\n            board[row][col] = \".\"\n        }\n    }\n\n    backtrack(0)\n    return result\n}",
        haskell: "solveNQueens :: Int -> [[String]]\nsolveNQueens n = go 0 (replicate n (replicate n '.')) mempty mempty mempty\n  where\n    go row board cols diag1 diag2\n      | row == n = [map (map id) board]\n      | otherwise = concat [go (row+1) (updateBoard board row col 'Q') (Set.insert col cols)\n                           (Set.insert (row-col) diag1) (Set.insert (row+col) diag2)\n                           | col <- [0..n-1], not (Set.member col cols || Set.member (row-col) diag1 || Set.member (row+col) diag2)]\n    updateBoard board row col c = take row board ++ [take col (board !! row) ++ [c] ++ drop (col+1) (board !! row)] ++ drop (row+1) board"
      }
    },
    {
      id: 9,
      title: 'N-Queens II',
      difficulty: 'hard',
      tags: ['backtracking'],
      description: 'Return the number of distinct solutions for N-Queens.',
      examples: [
        { input: 'n = 4', output: '2' }
      ],
      constraints: '1 ≤ n ≤ 9',
      hint: 'Count solutions instead of storing configurations.',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      solutions: {
        kotlin: "fun totalNQueens(n: Int): Int {\n  var count = 0\n  val cols = mutableSetOf<Int>()\n  val diag1 = mutableSetOf<Int>()\n  val diag2 = mutableSetOf<Int>()\n\n  fun backtrack(row: Int) {\n    if (row == n) {\n      count++\n      return\n    }\n\n    for (col in 0 until n) {\n      val d1 = row - col\n      val d2 = row + col\n      if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue\n\n      cols.add(col)\n      diag1.add(d1)\n      diag2.add(d2)\n\n      backtrack(row + 1)\n\n      cols.remove(col)\n      diag1.remove(d1)\n      diag2.remove(d2)\n    }\n  }\n\n  backtrack(0)\n  return count\n}",
        dart: "int totalNQueens(int n) {\n  int count = 0;\n  Set<int> cols = {}, diag1 = {}, diag2 = {};\n\n  void backtrack(int row) {\n    if (row == n) {\n      count++;\n      return;\n    }\n\n    for (int col = 0; col < n; col++) {\n      int d1 = row - col, d2 = row + col;\n      if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue;\n\n      cols.add(col);\n      diag1.add(d1);\n      diag2.add(d2);\n\n      backtrack(row + 1);\n\n      cols.remove(col);\n      diag1.remove(d1);\n      diag2.remove(d2);\n    }\n  }\n\n  backtrack(0);\n  return count;\n}",
        swift: "func totalNQueens(_ n: Int) -> Int {\n    var count = 0\n    var cols = Set<Int>(), diag1 = Set<Int>(), diag2 = Set<Int>()\n\n    func backtrack(_ row: Int) {\n        if row == n {\n            count += 1\n            return\n        }\n\n        for col in 0..<n {\n            let d1 = row - col, d2 = row + col\n            if cols.contains(col) || diag1.contains(d1) || diag2.contains(d2) { continue }\n\n            cols.insert(col); diag1.insert(d1); diag2.insert(d2)\n            backtrack(row + 1)\n            cols.remove(col); diag1.remove(d1); diag2.remove(d2)\n        }\n    }\n\n    backtrack(0)\n    return count\n}",
        haskell: "totalNQueens :: Int -> Int\ntotalNQueens n = go 0 mempty mempty mempty\n  where\n    go row cols diag1 diag2\n      | row == n = 1\n      | otherwise = sum [go (row+1) (Set.insert col cols) (Set.insert (row-col) diag1) (Set.insert (row+col) diag2)\n                        | col <- [0..n-1], not (Set.member col cols || Set.member (row-col) diag1 || Set.member (row+col) diag2)]"
      }
    },
    {
      id: 10,
      title: 'Sudoku Solver',
      difficulty: 'hard',
      tags: ['backtracking', 'constraint-satisfaction'],
      description: 'Solve 9x9 Sudoku puzzle by filling empty cells.',
      examples: [
        { input: 'board with empty cells', output: 'filled valid sudoku' }
      ],
      constraints: '9x9 grid, "." for empty',
      hint: 'Track used digits per row, column, 3x3 box. Backtrack on invalid state.',
      timeComplexity: 'O(9^(empty_cells)) worst case',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun solveSudoku(board: Array<CharArray>): Unit {\n  fun isValid(row: Int, col: Int, ch: Char): Boolean {\n    for (i in 0..8) {\n      if (board[i][col] == ch || board[row][i] == ch) return false\n      if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == ch) return false\n    }\n    return true\n  }\n\n  fun solve(): Boolean {\n    for (i in 0..8) {\n      for (j in 0..8) {\n        if (board[i][j] != '.') continue\n        for (ch in '1'..'9') {\n          if (!isValid(i, j, ch)) continue\n          board[i][j] = ch\n          if (solve()) return true\n          board[i][j] = '.'\n        }\n        return false\n      }\n    }\n    return true\n  }\n\n  solve()\n}",
        dart: "void solveSudoku(List<List<String>> board) {\n  bool isValid(int row, int col, String ch) {\n    for (int i = 0; i < 9; i++) {\n      if (board[i][col] == ch || board[row][i] == ch) return false;\n      if (board[3 * (row ~/ 3) + i ~/ 3][3 * (col ~/ 3) + i % 3] == ch) return false;\n    }\n    return true;\n  }\n\n  bool solve() {\n    for (int i = 0; i < 9; i++) {\n      for (int j = 0; j < 9; j++) {\n        if (board[i][j] != '.') continue;\n        for (String ch in ['1','2','3','4','5','6','7','8','9']) {\n          if (!isValid(i, j, ch)) continue;\n          board[i][j] = ch;\n          if (solve()) return true;\n          board[i][j] = '.';\n        }\n        return false;\n      }\n    }\n    return true;\n  }\n\n  solve();\n}",
        swift: "func solveSudoku(_ board: inout [[Character]]) {\n    func isValid(_ row: Int, _ col: Int, _ ch: Character) -> Bool {\n        for i in 0..<9 {\n            if board[i][col] == ch || board[row][i] == ch { return false }\n            if board[3*(row/3)+i/3][3*(col/3)+i%3] == ch { return false }\n        }\n        return true\n    }\n\n    func solve() -> Bool {\n        for i in 0..<9 {\n            for j in 0..<9 {\n                if board[i][j] != \".\" { continue }\n                for ch in \"123456789\" {\n                    if !isValid(i, j, ch) { continue }\n                    board[i][j] = ch\n                    if solve() { return true }\n                    board[i][j] = \".\"\n                }\n                return false\n            }\n        }\n        return true\n    }\n\n    solve()\n}",
        haskell: "solveSudoku :: [[Char]] -> [[Char]]\nsolveSudoku board = go board\n  where\n    go b = case findEmpty b of\n      Nothing -> b\n      Just (r, c) -> case tryDigits b r c ['1'..'9'] of\n        Just b' -> go b'\n        Nothing -> b\n\n    findEmpty board = head [(r,c) | r <- [0..8], c <- [0..8], board !! r !! c == '.']\n\n    tryDigits b r c [] = Nothing\n    tryDigits b r c (d:ds) = if isValid b r c d\n                             then let b' = setCell b r c d in if isSolved b' then Just b' else tryDigits b' r c ds\n                             else tryDigits b r c ds\n\n    isValid b r c d = all (/= d) (getRow b r) && all (/= d) (getCol b c) && all (/= d) (getBox b r c)\n\n    getRow b r = b !! r\n    getCol b c = [b !! i !! c | i <- [0..8]]\n    getBox b r c = [b !! (3*(r `div` 3)+i) !! (3*(c `div` 3)+j) | i <- [0..2], j <- [0..2]]\n\n    setCell b r c d = take r b ++ [take c (b !! r) ++ [d] ++ drop (c+1) (b !! r)] ++ drop (r+1) b\n\n    isSolved b = not (any (any (== '.')) b)"
      }
    },
    {
      id: 11,
      title: 'Word Search',
      difficulty: 'medium',
      tags: ['backtracking', 'dfs'],
      description: 'Find word in 2D board moving through adjacent cells.',
      examples: [
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' }
      ],
      constraints: 'board size ≤ 200x200, word.length ≤ 200',
      hint: 'DFS with visited tracking. Backtrack when path fails.',
      timeComplexity: 'O(N*M*4^L) where L = word length',
      spaceComplexity: 'O(L)',
      solutions: {
        kotlin: "fun exist(board: Array<CharArray>, word: String): Boolean {\n  val rows = board.size\n  val cols = board[0].size\n\n  fun dfs(r: Int, c: Int, idx: Int): Boolean {\n    if (idx == word.length) return true\n    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[idx]) return false\n\n    val temp = board[r][c]\n    board[r][c] = ' '\n\n    val found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) ||\n                dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1)\n\n    board[r][c] = temp\n    return found\n  }\n\n  for (i in 0 until rows) {\n    for (j in 0 until cols) {\n      if (dfs(i, j, 0)) return true\n    }\n  }\n  return false\n}",
        dart: "bool exist(List<List<String>> board, String word) {\n  int rows = board.length, cols = board[0].length;\n\n  bool dfs(int r, int c, int idx) {\n    if (idx == word.length) return true;\n    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[idx]) return false;\n\n    String temp = board[r][c];\n    board[r][c] = ' ';\n\n    bool found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) ||\n                 dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1);\n\n    board[r][c] = temp;\n    return found;\n  }\n\n  for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n      if (dfs(i, j, 0)) return true;\n    }\n  }\n  return false;\n}",
        swift: "func exist(_ board: [[Character]], _ word: String) -> Bool {\n    let rows = board.count, cols = board[0].count\n    var mutable = board\n\n    func dfs(_ r: Int, _ c: Int, _ idx: Int) -> Bool {\n        if idx == word.count { return true }\n        if r < 0 || r >= rows || c < 0 || c >= cols || mutable[r][c] != word[word.index(word.startIndex, offsetBy: idx)] { return false }\n\n        let temp = mutable[r][c]\n        mutable[r][c] = \" \"\n\n        let found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) ||\n                    dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1)\n\n        mutable[r][c] = temp\n        return found\n    }\n\n    for i in 0..<rows {\n        for j in 0..<cols {\n            if dfs(i, j, 0) { return true }\n        }\n    }\n    return false\n}",
        haskell: "exist :: [[Char]] -> String -> Bool\nexist board word = any (flip go 0) [(r,c) | r <- [0..length board-1], c <- [0..length (head board)-1]]\n  where\n    go (r,c) idx board visited\n      | idx == length word = True\n      | r < 0 || r >= length board || c < 0 || c >= length (head board) || board!!r!!c /= word!!idx = False\n      | (r,c) `elem` visited = False\n      | otherwise = any (flip (go idx+1) (visited ++ [(r,c)])) [(r+1,c), (r-1,c), (r,c+1), (r,c-1)]"
      }
    },
    {
      id: 12,
      title: 'Letter Combinations of Phone Number',
      difficulty: 'medium',
      tags: ['backtracking', 'combinations'],
      description: 'Generate all letter combinations given digit string (phone keypad).',
      examples: [
        { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }
      ],
      constraints: '0 ≤ digits.length ≤ 4',
      hint: 'Map each digit to letters. Backtrack through combinations.',
      timeComplexity: 'O(4^n)',
      spaceComplexity: 'O(4^n)',
      solutions: {
        kotlin: "fun letterCombinations(digits: String): List<String> {\n  if (digits.isEmpty()) return emptyList()\n\n  val map = mapOf('2' to \"abc\", '3' to \"def\", '4' to \"ghi\", '5' to \"jkl\",\n                  '6' to \"mno\", '7' to \"pqrs\", '8' to \"tuv\", '9' to \"wxyz\")\n  val result = mutableListOf<String>()\n\n  fun backtrack(idx: Int, path: String) {\n    if (idx == digits.length) {\n      result.add(path)\n      return\n    }\n\n    for (ch in map[digits[idx]]!!) {\n      backtrack(idx + 1, path + ch)\n    }\n  }\n\n  backtrack(0, \"\")\n  return result\n}",
        dart: "List<String> letterCombinations(String digits) {\n  if (digits.isEmpty) return [];\n\n  Map<String, String> map = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n                            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'};\n  List<String> result = [];\n\n  void backtrack(int idx, String path) {\n    if (idx == digits.length) {\n      result.add(path);\n      return;\n    }\n\n    for (String ch in map[digits[idx]]!.split('')) {\n      backtrack(idx + 1, path + ch);\n    }\n  }\n\n  backtrack(0, '');\n  return result;\n}",
        swift: "func letterCombinations(_ digits: String) -> [String] {\n    guard !digits.isEmpty else { return [] }\n\n    let map = [\"2\": \"abc\", \"3\": \"def\", \"4\": \"ghi\", \"5\": \"jkl\",\n               \"6\": \"mno\", \"7\": \"pqrs\", \"8\": \"tuv\", \"9\": \"wxyz\"]\n    var result: [String] = []\n\n    func backtrack(_ idx: Int, _ path: String) {\n        if idx == digits.count {\n            result.append(path)\n            return\n        }\n\n        let digit = String(digits[digits.index(digits.startIndex, offsetBy: idx)])\n        for ch in map[digit]! {\n            backtrack(idx + 1, path + String(ch))\n        }\n    }\n\n    backtrack(0, \"\")\n    return result\n}",
        haskell: "letterCombinations :: String -> [String]\nletterCombinations digits = go 0 \"\"\n  where\n    map = [('2', \"abc\"), ('3', \"def\"), ('4', \"ghi\"), ('5', \"jkl\"), ('6', \"mno\"), ('7', \"pqrs\"), ('8', \"tuv\"), ('9', \"wxyz\")]\n    go idx path\n      | idx == length digits = [path]\n      | otherwise = concat [go (idx+1) (path ++ [ch]) | ch <- fromJust (lookup (digits !! idx) map)]"
      }
    },
    {
      id: 13,
      title: 'Palindrome Partitioning',
      difficulty: 'medium',
      tags: ['backtracking', 'palindrome'],
      description: 'Partition string into all palindromic substrings.',
      examples: [
        { input: 's = "nitin"', output: '[["n","i","t","i","n"],["n","iti","n"]]' }
      ],
      constraints: '1 ≤ s.length ≤ 16',
      hint: 'Backtrack with palindrome check. Build partitions.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N)',
      solutions: {
        kotlin: "fun partition(s: String): List<List<String>> {\n  val result = mutableListOf<List<String>>()\n\n  fun isPalindrome(start: Int, end: Int): Boolean {\n    var l = start\n    var r = end\n    while (l < r) {\n      if (s[l] != s[r]) return false\n      l++\n      r--\n    }\n    return true\n  }\n\n  fun backtrack(start: Int, path: MutableList<String>) {\n    if (start == s.length) {\n      result.add(path.toList())\n      return\n    }\n\n    for (i in start until s.length) {\n      if (isPalindrome(start, i)) {\n        path.add(s.substring(start, i + 1))\n        backtrack(i + 1, path)\n        path.removeAt(path.size - 1)\n      }\n    }\n  }\n\n  backtrack(0, mutableListOf())\n  return result\n}",
        dart: "List<List<String>> partition(String s) {\n  List<List<String>> result = [];\n\n  bool isPalindrome(int start, int end) {\n    while (start < end) {\n      if (s[start] != s[end]) return false;\n      start++;\n      end--;\n    }\n    return true;\n  }\n\n  void backtrack(int start, List<String> path) {\n    if (start == s.length) {\n      result.add(List.from(path));\n      return;\n    }\n\n    for (int i = start; i < s.length; i++) {\n      if (isPalindrome(start, i)) {\n        path.add(s.substring(start, i + 1));\n        backtrack(i + 1, path);\n        path.removeLast();\n      }\n    }\n  }\n\n  backtrack(0, []);\n  return result;\n}",
        swift: "func partition(_ s: String) -> [[String]] {\n    var result: [[String]] = []\n    let chars = Array(s)\n\n    func isPalindrome(_ start: Int, _ end: Int) -> Bool {\n        var l = start, r = end\n        while l < r {\n            if chars[l] != chars[r] { return false }\n            l += 1; r -= 1\n        }\n        return true\n    }\n\n    func backtrack(_ start: Int, _ path: inout [String]) {\n        if start == chars.count {\n            result.append(path)\n            return\n        }\n\n        for i in start..<chars.count {\n            if isPalindrome(start, i) {\n                path.append(String(chars[start...i]))\n                backtrack(i + 1, &path)\n                path.removeLast()\n            }\n        }\n    }\n\n    var path: [String] = []\n    backtrack(0, &path)\n    return result\n}",
        haskell: "partition :: String -> [[String]]\npartition s = go 0 []\n  where\n    go idx path\n      | idx == length s = [path]\n      | otherwise = concat [go (i+1) (path ++ [s !! start..s !! i]) | i <- [idx..length s-1], isPalin idx i]\n\n    isPalin l r = and [s !! (l+i) == s !! (r-i) | i <- [0..div (r-l) 2]]"
      }
    },
    {
      id: 14,
      title: 'Restore IP Addresses',
      difficulty: 'medium',
      tags: ['backtracking', 'string'],
      description: 'Restore valid IP addresses from string (no additional chars).',
      examples: [
        { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]' }
      ],
      constraints: 'length ≤ 12, all digits',
      hint: 'Backtrack building 4 parts. Validate each part (0-255, no leading zeros).',
      timeComplexity: 'O(3^4) = O(81)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun restoreIpAddresses(s: String): List<String> {\n  val result = mutableListOf<String>()\n\n  fun isValid(start: Int, end: Int): Boolean {\n    if (end - start + 1 > 3 || (start != end && s[start] == '0')) return false\n    val part = s.substring(start, end + 1).toInt()\n    return part <= 255\n  }\n\n  fun backtrack(start: Int, parts: Int, path: String) {\n    if (parts == 4) {\n      if (start == s.length) result.add(path.dropLast(1))\n      return\n    }\n    if (start >= s.length) return\n\n    for (i in start + 1..minOf(start + 3, s.length)) {\n      if (isValid(start, i - 1)) {\n        backtrack(i, parts + 1, path + s.substring(start, i) + \".\")\n      }\n    }\n  }\n\n  backtrack(0, 0, \"\")\n  return result\n}",
        dart: "List<String> restoreIpAddresses(String s) {\n  List<String> result = [];\n\n  bool isValid(int start, int end) {\n    if (end - start + 1 > 3 || (start != end && s[start] == '0')) return false;\n    int part = int.parse(s.substring(start, end + 1));\n    return part <= 255;\n  }\n\n  void backtrack(int start, int parts, String path) {\n    if (parts == 4) {\n      if (start == s.length) result.add(path.substring(0, path.length - 1));\n      return;\n    }\n    if (start >= s.length) return;\n\n    for (int i = start + 1; i <= min(start + 3, s.length); i++) {\n      if (isValid(start, i - 1)) {\n        backtrack(i, parts + 1, path + s.substring(start, i) + \".\");\n      }\n    }\n  }\n\n  backtrack(0, 0, \"\");\n  return result;\n}",
        swift: "func restoreIpAddresses(_ s: String) -> [String] {\n    var result: [String] = []\n    let chars = Array(s)\n\n    func isValid(_ start: Int, _ end: Int) -> Bool {\n        if end - start + 1 > 3 || (start != end && chars[start] == \"0\") { return false }\n        let part = Int(String(chars[start...end]))!\n        return part <= 255\n    }\n\n    func backtrack(_ start: Int, _ parts: Int, _ path: String) {\n        if parts == 4 {\n            if start == chars.count { result.append(String(path.dropLast())) }\n            return\n        }\n        if start >= chars.count { return }\n\n        for i in (start+1)...min(start+3, chars.count) {\n            if isValid(start, i-1) {\n                backtrack(i, parts+1, path + String(chars[start..<i]) + \".\")\n            }\n        }\n    }\n\n    backtrack(0, 0, \"\")\n    return result\n}",
        haskell: "restoreIpAddresses :: String -> [String]\nrestoreIpAddresses s = go 0 0 \"\"\n  where\n    go start parts path\n      | parts == 4 = if start == length s then [init path] else []\n      | start >= length s = []\n      | otherwise = concat [go i (parts+1) (path ++ part ++ \".\") | i <- [start+1..min (start+3) (length s)],\n                            let part = take (i-start) (drop start s),\n                            isValid part]\n\n    isValid part = length part <= 3 && (head part /= '0' || length part == 1) && read part <= (255 :: Int)"
      }
    },
    {
      id: 15,
      title: 'Gray Code',
      difficulty: 'medium',
      tags: ['backtracking', 'bit'],
      description: 'Generate n-bit Gray code sequence (differ by 1 bit).',
      examples: [
        { input: 'n = 2', output: '[0,1,3,2]' }
      ],
      constraints: '1 ≤ n ≤ 16',
      hint: 'Backtracking or formula: gray = i XOR (i >> 1)',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(2^n)',
      solutions: {
        kotlin: "fun grayCode(n: Int): List<Int> {\n  return (0 until (1 shl n)).map { it xor (it shr 1) }\n}",
        dart: "List<int> grayCode(int n) {\n  return [for (int i = 0; i < (1 << n); i++) i ^ (i >> 1)];\n}",
        swift: "func grayCode(_ n: Int) -> [Int] {\n    return (0..<(1<<n)).map { $0 ^ ($0 >> 1) }\n}",
        haskell: "grayCode :: Int -> [Int]\ngrayCode n = [i `xor` (i `shiftR` 1) | i <- [0..2^n-1]]"
      }
    },
    {
      id: 16,
      title: 'Generate Parentheses',
      difficulty: 'medium',
      tags: ['backtracking', 'string'],
      description: 'Generate all valid combinations of n pairs of parentheses.',
      examples: [
        { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' }
      ],
      constraints: '1 ≤ n ≤ 8',
      hint: 'Backtrack tracking open/close counts. Close only if open > close.',
      timeComplexity: 'O(4^n / √n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun generateParenthesis(n: Int): List<String> {\n  val result = mutableListOf<String>()\n\n  fun backtrack(open: Int, close: Int, path: String) {\n    if (open == n && close == n) {\n      result.add(path)\n      return\n    }\n\n    if (open < n) backtrack(open + 1, close, path + \"(\")\n    if (close < open) backtrack(open, close + 1, path + \")\")\n  }\n\n  backtrack(0, 0, \"\")\n  return result\n}",
        dart: "List<String> generateParenthesis(int n) {\n  List<String> result = [];\n\n  void backtrack(int open, int close, String path) {\n    if (open == n && close == n) {\n      result.add(path);\n      return;\n    }\n\n    if (open < n) backtrack(open + 1, close, path + \"(\");\n    if (close < open) backtrack(open, close + 1, path + \")\");\n  }\n\n  backtrack(0, 0, \"\");\n  return result;\n}",
        swift: "func generateParenthesis(_ n: Int) -> [String] {\n    var result: [String] = []\n\n    func backtrack(_ open: Int, _ close: Int, _ path: String) {\n        if open == n && close == n {\n            result.append(path)\n            return\n        }\n\n        if open < n { backtrack(open + 1, close, path + \"(\") }\n        if close < open { backtrack(open, close + 1, path + \")\") }\n    }\n\n    backtrack(0, 0, \"\")\n    return result\n}",
        haskell: "generateParenthesis :: Int -> [String]\ngenerateParenthesis n = go 0 0 \"\"\n  where\n    go open close path\n      | open == n && close == n = [path]\n      | otherwise = (if open < n then go (open+1) close (path ++ \"(\") else []) ++\n                    (if close < open then go open (close+1) (path ++ \")\") else [])"
      }
    },
    {
      id: 17,
      title: 'Beautiful Arrangement',
      difficulty: 'medium',
      tags: ['backtracking'],
      description: 'Count permutations where nums[i] % (i+1) == 0 or (i+1) % nums[i] == 0.',
      examples: [
        { input: 'n = 2', output: '2', explanation: '[1,2] and [2,1]' }
      ],
      constraints: '1 ≤ n ≤ 15',
      hint: 'Backtrack with divisibility constraints.',
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun countArrangement(n: Int): Int {\n  val visited = BooleanArray(n + 1)\n  var count = 0\n\n  fun backtrack(pos: Int) {\n    if (pos == n + 1) {\n      count++\n      return\n    }\n\n    for (i in 1..n) {\n      if (!visited[i] && (i % pos == 0 || pos % i == 0)) {\n        visited[i] = true\n        backtrack(pos + 1)\n        visited[i] = false\n      }\n    }\n  }\n\n  backtrack(1)\n  return count\n}",
        dart: "int countArrangement(int n) {\n  List<bool> visited = List<bool>.filled(n + 1, false);\n  int count = 0;\n\n  void backtrack(int pos) {\n    if (pos == n + 1) {\n      count++;\n      return;\n    }\n\n    for (int i = 1; i <= n; i++) {\n      if (!visited[i] && (i % pos == 0 || pos % i == 0)) {\n        visited[i] = true;\n        backtrack(pos + 1);\n        visited[i] = false;\n      }\n    }\n  }\n\n  backtrack(1);\n  return count;\n}",
        swift: "func countArrangement(_ n: Int) -> Int {\n    var visited = Array(repeating: false, count: n+1)\n    var count = 0\n\n    func backtrack(_ pos: Int) {\n        if pos == n + 1 {\n            count += 1\n            return\n        }\n\n        for i in 1...n {\n            if !visited[i] && (i % pos == 0 || pos % i == 0) {\n                visited[i] = true\n                backtrack(pos + 1)\n                visited[i] = false\n            }\n        }\n    }\n\n    backtrack(1)\n    return count\n}",
        haskell: "countArrangement :: Int -> Int\ncountArrangement n = go 1 (replicate (n+1) False)\n  where\n    go pos visited\n      | pos == n + 1 = 1\n      | otherwise = sum [go (pos+1) visited' | i <- [1..n],\n                         not (visited !! i),\n                         i \\`mod\\` pos == 0 || pos \\`mod\\` i == 0,\n                         let visited' = take i visited ++ [True] ++ drop (i+1) visited]"
      }
    },
    {
      id: 18,
      title: 'Factor Combinations',
      difficulty: 'medium',
      tags: ['backtracking', 'combination'],
      description: 'Get all unique factor combinations of given integer.',
      examples: [
        { input: 'n = 32', output: '[[2,16],[2,2,8],[2,2,2,4],[2,2,2,2,2],[4,8]]' }
      ],
      constraints: '1 < n ≤ 10000',
      hint: 'Backtrack finding factors. Start from previous factor to avoid duplicates.',
      timeComplexity: 'O(2^log n)',
      spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun getFactors(n: Int): List<List<Int>> {\n  val result = mutableListOf<List<Int>>()\n\n  fun backtrack(start: Int, path: MutableList<Int>, remain: Int) {\n    if (remain == 1) {\n      if (path.size > 1) result.add(path.toList())\n      return\n    }\n\n    for (i in start..remain) {\n      if (remain % i == 0) {\n        path.add(i)\n        backtrack(i, path, remain / i)\n        path.removeAt(path.size - 1)\n      }\n    }\n  }\n\n  backtrack(2, mutableListOf(), n)\n  return result\n}",
        dart: "List<List<int>> getFactors(int n) {\n  List<List<int>> result = [];\n\n  void backtrack(int start, List<int> path, int remain) {\n    if (remain == 1) {\n      if (path.length > 1) result.add(List.from(path));\n      return;\n    }\n\n    for (int i = start; i <= remain; i++) {\n      if (remain % i == 0) {\n        path.add(i);\n        backtrack(i, path, remain ~/ i);\n        path.removeLast();\n      }\n    }\n  }\n\n  backtrack(2, [], n);\n  return result;\n}",
        swift: "func getFactors(_ n: Int) -> [[Int]] {\n    var result: [[Int]] = []\n\n    func backtrack(_ start: Int, _ path: inout [Int], _ remain: Int) {\n        if remain == 1 {\n            if path.count > 1 { result.append(path) }\n            return\n        }\n\n        for i in start...remain {\n            if remain % i == 0 {\n                path.append(i)\n                backtrack(i, &path, remain / i)\n                path.removeLast()\n            }\n        }\n    }\n\n    var path: [Int] = []\n    backtrack(2, &path, n)\n    return result\n}",
        haskell: "getFactors :: Int -> [[Int]]\ngetFactors n = go 2 [] n\n  where\n    go start path remain\n      | remain == 1 = if length path > 1 then [path] else []\n      | otherwise = concat [go i (path ++ [i]) (remain \\`div\\` i) | i <- [start..remain], remain \\`mod\\` i == 0]"
      }
    },
    {
      id: 19,
      title: 'Expression Add Operators',
      difficulty: 'hard',
      tags: ['backtracking', 'expression'],
      description: 'Add +, -, * between digits to get target value.',
      examples: [
        { input: 'num = "123", target = 6', output: '["1+2+3","1*2*3"]' }
      ],
      constraints: 'num.length ≤ 11, -2^31 ≤ target ≤ 2^31-1',
      hint: 'Backtrack with evaluation tracking. Handle * precedence.',
      timeComplexity: 'O(3^n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun addOperators(num: String, target: Int): List<String> {\n  val result = mutableListOf<String>()\n\n  fun backtrack(pos: Int, path: String, eval: Long, prev: Long) {\n    if (pos == num.length) {\n      if (eval == target.toLong()) result.add(path)\n      return\n    }\n\n    for (i in pos + 1..num.length) {\n      val curr = num.substring(pos, i).toLong()\n      if (i > pos + 1 && num[pos] == '0') break\n\n      if (pos == 0) {\n        backtrack(i, curr.toString(), curr, curr)\n      } else {\n        backtrack(i, \"$path+$curr\", eval + curr, curr)\n        backtrack(i, \"$path-$curr\", eval - curr, -curr)\n        backtrack(i, \"$path*$curr\", eval - prev + prev * curr, prev * curr)\n      }\n    }\n  }\n\n  backtrack(0, \"\", 0, 0)\n  return result\n}",
        dart: "List<String> addOperators(String num, int target) {\n  List<String> result = [];\n\n  void backtrack(int pos, String path, int eval, int prev) {\n    if (pos == num.length) {\n      if (eval == target) result.add(path);\n      return;\n    }\n\n    for (int i = pos + 1; i <= num.length; i++) {\n      int curr = int.parse(num.substring(pos, i));\n      if (i > pos + 1 && num[pos] == '0') break;\n\n      if (pos == 0) {\n        backtrack(i, curr.toString(), curr, curr);\n      } else {\n        backtrack(i, \"\\$path+\\$curr\", eval + curr, curr);\n        backtrack(i, \"\\$path-\\$curr\", eval - curr, -curr);\n        backtrack(i, \"\\$path*\\$curr\", eval - prev + prev * curr, prev * curr);\n      }\n    }\n  }\n\n  backtrack(0, \"\", 0, 0);\n  return result;\n}",
        swift: "func addOperators(_ num: String, _ target: Int) -> [String] {\n    var result: [String] = []\n\n    func backtrack(_ pos: Int, _ path: String, _ eval: Int, _ prev: Int) {\n        if pos == num.count {\n            if eval == target { result.append(path) }\n            return\n        }\n\n        for i in (pos+1)...num.count {\n            let start = num.index(num.startIndex, offsetBy: pos)\n            let end = num.index(num.startIndex, offsetBy: i)\n            let curr = Int(String(num[start..<end]))!\n            if i > pos + 1 && num[num.index(num.startIndex, offsetBy: pos)] == \"0\" { break }\n\n            if pos == 0 {\n                backtrack(i, String(curr), curr, curr)\n            } else {\n                backtrack(i, \"\\(path)+\\(curr)\", eval + curr, curr)\n                backtrack(i, \"\\(path)-\\(curr)\", eval - curr, -curr)\n                backtrack(i, \"\\(path)*\\(curr)\", eval - prev + prev * curr, prev * curr)\n            }\n        }\n    }\n\n    backtrack(0, \"\", 0, 0)\n    return result\n}",
        haskell: "addOperators :: String -> Int -> [String]\naddOperators num target = go 0 \"\" 0 0\n  where\n    go pos path eval prev\n      | pos == length num = if eval == target then [path] else []\n      | otherwise = concat [go i (build path i c) (update eval prev c) c\n                           | i <- [pos+1..length num],\n                             let c = read (take (i-pos) (drop pos num)) :: Int,\n                             not (pos < i - 1 && head (drop pos num) == '0')]\n    build path 0 c = show c\n    build path i c = path ++ [op] ++ show c\n    update eval prev 0 c = eval + c\n    update eval prev i c = eval - prev + prev * c"
      }
    },
    {
      id: 20,
      title: 'Remove Invalid Parentheses',
      difficulty: 'hard',
      tags: ['backtracking', 'bfs'],
      description: 'Remove minimum invalid parentheses to make valid string.',
      examples: [
        { input: 's = "()())()"', output: '["()()()","(())()"]' }
      ],
      constraints: 'length ≤ 1000',
      hint: 'BFS with backtracking or DFS to generate valid strings.',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun removeInvalidParentheses(s: String): List<String> {\n  val result = mutableListOf<String>()\n  val visited = mutableSetOf<String>()\n\n  fun isValid(str: String): Boolean {\n    var count = 0\n    for (ch in str) {\n      if (ch == '(') count++\n      else if (ch == ')') count--\n      if (count < 0) return false\n    }\n    return count == 0\n  }\n\n  fun bfs() {\n    val queue = mutableListOf(s)\n    visited.add(s)\n\n    while (queue.isNotEmpty()) {\n      val size = queue.size\n      var foundValid = false\n\n      for (j in 0 until size) {\n        val curr = queue.removeAt(0)\n        if (isValid(curr)) {\n          result.add(curr)\n          foundValid = true\n        } else {\n          for (i in curr.indices) {\n            if (curr[i] !in \"()\") continue\n            val next = curr.substring(0, i) + curr.substring(i + 1)\n            if (!visited.contains(next)) {\n              visited.add(next)\n              queue.add(next)\n            }\n          }\n        }\n      }\n\n      if (foundValid) break\n    }\n  }\n\n  bfs()\n  return result\n}",
        dart: "List<String> removeInvalidParentheses(String s) {\n  List<String> result = [];\n  Set<String> visited = {};\n\n  bool isValid(String str) {\n    int count = 0;\n    for (String ch in str.split('')) {\n      if (ch == '(') count++;\n      else if (ch == ')') count--;\n      if (count < 0) return false;\n    }\n    return count == 0;\n  }\n\n  List<String> queue = [s];\n  visited.add(s);\n\n  while (queue.isNotEmpty) {\n    int size = queue.length;\n    bool foundValid = false;\n\n    for (int j = 0; j < size; j++) {\n      String curr = queue.removeAt(0);\n      if (isValid(curr)) {\n        result.add(curr);\n        foundValid = true;\n      } else {\n        for (int i = 0; i < curr.length; i++) {\n          if (!['(', ')'].contains(curr[i])) continue;\n          String next = curr.substring(0, i) + curr.substring(i + 1);\n          if (!visited.contains(next)) {\n            visited.add(next);\n            queue.add(next);\n          }\n        }\n      }\n    }\n\n    if (foundValid) break;\n  }\n\n  return result;\n}",
        swift: "func removeInvalidParentheses(_ s: String) -> [String] {\n    var result: [String] = []\n    var visited = Set<String>()\n\n    func isValid(_ str: String) -> Bool {\n        var count = 0\n        for ch in str {\n            if ch == \"(\" { count += 1 }\n            else if ch == \")\" { count -= 1 }\n            if count < 0 { return false }\n        }\n        return count == 0\n    }\n\n    var queue: [String] = [s]\n    visited.insert(s)\n\n    while !queue.isEmpty {\n        let size = queue.count\n        var foundValid = false\n\n        for _ in 0..<size {\n            let curr = queue.removeFirst()\n            if isValid(curr) {\n                result.append(curr)\n                foundValid = true\n            } else {\n                for i in 0..<curr.count {\n                    let idx = curr.index(curr.startIndex, offsetBy: i)\n                    let ch = curr[idx]\n                    if ch == \"(\" || ch == \")\" {\n                        let next = String(curr[..<idx]) + String(curr[curr.index(after: idx)...])\n                        if !visited.contains(next) {\n                            visited.insert(next)\n                            queue.append(next)\n                        }\n                    }\n                }\n            }\n        }\n\n        if foundValid { break }\n    }\n\n    return result\n}",
        haskell: "removeInvalidParentheses :: String -> [String]\nremoveInvalidParentheses s = go [s] mempty\n  where\n    go queue visited | null queue = []\n    go queue visited =\n      let valids = filter isValid queue\n          newQueue = concat [[(take i q) ++ (drop (i+1) q) | i <- [0..length q-1], q !! i \\`elem\\` \"()\"] | q <- queue]\n          newQueue' = filter (\\\\x -> not (Set.member x visited)) newQueue\n          newVisited = Set.union visited (Set.fromList queue)\n      in if not (null valids) then valids else go newQueue' newVisited\n\n    isValid str = go str 0\n      where\n        go [] count = count == 0\n        go (x:xs) count\n          | x == '(' = go xs (count+1)\n          | x == ')' = if count > 0 then go xs (count-1) else False\n          | otherwise = go xs count"
      }
    }
  ]
}
