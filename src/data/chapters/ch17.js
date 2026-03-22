export default {
  id: 17,
  year: 2,
  slug: 'greedy',
  icon: '💰',
  color: '#ffa657',
  title: 'Greedy Algorithms',
  subtitle: 'Exchange Arguments, Matroid Theory, Scheduling',
  description: 'Master greedy algorithmic paradigm with exchange arguments, activity selection, and optimal substructure proofs.',
  theorems: [
    {
      id: 1,
      name: 'Greedy Exchange Argument',
      katex_statement: '\\text{If OPT} = [x_1, x_2, \\ldots] \\text{ and greedy} = [g_1, g_2, \\ldots], \\text{ swap first differing element to reach OPT}',
      statement_text: 'Prove greedy optimal by showing any optimal solution differing from greedy can be transformed to greedy solution without decreasing optimality through pairwise exchanges.',
      proof: 'Suppose OPT differs from greedy at position i. Swap OPT[i] with greedy[i]. Show cost does not increase (or strictly decreases) due to greedy choice property. By induction, entire OPT can be transformed to greedy solution.'
    },
    {
      id: 2,
      name: 'Activity Selection Optimality',
      katex_statement: '\\text{Greedy: Select activity with earliest finish time. If } f_k \\text{ earliest, then OPT}(S) \\text{ contains } k',
      statement_text: 'For weighted interval scheduling without weights (unit weight), selecting activity finishing earliest is part of some optimal solution.',
      proof: 'Let OPT contain activity j with earliest finish. If j is not our greedy choice k, replace j with k. Since f_k ≤ f_j, all activities in OPT after j can still be scheduled. Optimality preserved.'
    },
    {
      id: 3,
      name: 'Huffman Coding Correctness',
      katex_statement: '\\text{Combine two lowest frequency nodes. Resulting tree is optimal code.}',
      statement_text: 'Huffman coding produces prefix-free code with minimum expected length by recursively combining minimum-frequency symbols.',
      proof: 'Exchange argument: any optimal tree differs from Huffman tree only in which two nodes are combined first. Swapping any two leaves at deepest level cannot decrease total cost. Huffman choice is optimal.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Jump Game',
      difficulty: 'medium',
      tags: ['greedy', 'array'],
      description: 'Determine if you can jump to last index. Each element is max jump length.',
      examples: [
        { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from 0→1, then 3 steps→last index' },
        { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'Always arrive at index 3, max reach is 3' }
      ],
      constraints: '1 ≤ nums.length ≤ 10000, 0 ≤ nums[i] ≤ 100000',
      hint: 'Track maximum index reachable. If current index > max, cannot proceed.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun canJump(nums: IntArray): Boolean {\n  var maxReach = 0\n  for (i in nums.indices) {\n    if (i > maxReach) return false\n    maxReach = maxOf(maxReach, i + nums[i])\n    if (maxReach >= nums.size - 1) return true\n  }\n  return true\n}",
        dart: "bool canJump(List<int> nums) {\n  int maxReach = 0;\n  for (int i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = max(maxReach, i + nums[i]);\n    if (maxReach >= nums.length - 1) return true;\n  }\n  return true;\n}",
        swift: "func canJump(_ nums: [Int]) -> Bool {\n    var maxReach = 0\n    for i in 0..<nums.count {\n        if i > maxReach { return false }\n        maxReach = max(maxReach, i + nums[i])\n        if maxReach >= nums.count - 1 { return true }\n    }\n    return true\n}",
        haskell: "canJump :: [Int] -> Bool\ncanJump nums = go nums 0 0\n  where\n    go [] _ _ = True\n    go _ i maxR | i > maxR = False\n    go (x:xs) i maxR | maxR >= length nums - 1 = True\n                     | otherwise = go xs (i+1) (max maxR (i+x))"
      }
    },
    {
      id: 2,
      title: 'Jump Game II',
      difficulty: 'medium',
      tags: ['greedy', 'bfs'],
      description: 'Return minimum jumps to reach last index.',
      examples: [
        { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump 1 to 1, then 3 steps' }
      ],
      constraints: '1 ≤ nums.length ≤ 10000',
      hint: 'Track current and next range. Increment jumps when leaving current range.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun jump(nums: IntArray): Int {\n  var jumps = 0\n  var curEnd = 0\n  var farthest = 0\n\n  for (i in 0 until nums.size - 1) {\n    farthest = maxOf(farthest, i + nums[i])\n    if (i == curEnd) {\n      jumps++\n      curEnd = farthest\n    }\n  }\n\n  return jumps\n}",
        dart: "int jump(List<int> nums) {\n  int jumps = 0, curEnd = 0, farthest = 0;\n  for (int i = 0; i < nums.length - 1; i++) {\n    farthest = max(farthest, i + nums[i]);\n    if (i == curEnd) {\n      jumps++;\n      curEnd = farthest;\n    }\n  }\n  return jumps;\n}",
        swift: "func jump(_ nums: [Int]) -> Int {\n    var jumps = 0, curEnd = 0, farthest = 0\n    for i in 0..<nums.count-1 {\n        farthest = max(farthest, i + nums[i])\n        if i == curEnd {\n            jumps += 1\n            curEnd = farthest\n        }\n    }\n    return jumps\n}",
        haskell: "jump :: [Int] -> Int\njump nums = go nums 0 0 0 0\n  where\n    go [] _ _ _ jumps = jumps\n    go [_] _ _ _ jumps = jumps\n    go (x:xs) i curEnd farthest jumps\n      | i == curEnd = go xs (i+1) farthest (max farthest (i+x)) (jumps+1)\n      | otherwise = go xs (i+1) curEnd (max farthest (i+x)) jumps"
      }
    },
    {
      id: 3,
      title: 'Gas Station',
      difficulty: 'medium',
      tags: ['greedy'],
      description: 'Start at gas station, drive circuit. Find starting station with non-negative tank.',
      examples: [
        { input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', output: '3', explanation: 'Start at index 3' }
      ],
      constraints: 'n ≤ 300, gas[i], cost[i] ≤ 10000',
      hint: 'If total gas < total cost, no solution. Otherwise, start from first unreachable point.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {\n  val n = gas.size\n  var totalGas = 0\n  var totalCost = 0\n  var tank = 0\n  var start = 0\n\n  for (i in 0 until n) {\n    totalGas += gas[i]\n    totalCost += cost[i]\n    tank += gas[i] - cost[i]\n    if (tank < 0) {\n      start = i + 1\n      tank = 0\n    }\n  }\n\n  return if (totalGas >= totalCost) start else -1\n}",
        dart: "int canCompleteCircuit(List<int> gas, List<int> cost) {\n  int totalGas = 0, totalCost = 0, tank = 0, start = 0;\n  for (int i = 0; i < gas.length; i++) {\n    totalGas += gas[i];\n    totalCost += cost[i];\n    tank += gas[i] - cost[i];\n    if (tank < 0) {\n      start = i + 1;\n      tank = 0;\n    }\n  }\n  return totalGas >= totalCost ? start : -1;\n}",
        swift: "func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {\n    var totalGas = 0, totalCost = 0, tank = 0, start = 0\n    for i in 0..<gas.count {\n        totalGas += gas[i]\n        totalCost += cost[i]\n        tank += gas[i] - cost[i]\n        if tank < 0 {\n            start = i + 1\n            tank = 0\n        }\n    }\n    return totalGas >= totalCost ? start : -1\n}",
        haskell: "canCompleteCircuit :: [Int] -> [Int] -> Int\ncanCompleteCircuit gas cost\n  | totalGas >= totalCost = start\n  | otherwise = -1\n  where\n    pairs = zip gas cost\n    totalGas = sum gas\n    totalCost = sum cost\n    start = go pairs 0 0 0\n    go [] _ _ s = s\n    go ((g,c):xs) i tank s\n      | tank + g - c < 0 = go xs (i+1) 0 (i+1)\n      | otherwise = go xs (i+1) (tank + g - c) s"
      }
    },
    {
      id: 4,
      title: 'Candy',
      difficulty: 'hard',
      tags: ['greedy', 'array'],
      description: 'Distribute candy to children by rating. Each child ≥1. Higher rating → more candy.',
      examples: [
        { input: 'ratings = [1,0,2]', output: '5', explanation: '[2,1,2]' },
        { input: 'ratings = [1,2,2]', output: '4', explanation: '[1,2,1]' }
      ],
      constraints: '1 ≤ ratings.length ≤ 20000',
      hint: 'Two pass: left-to-right for increasing, right-to-left for decreasing.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun distributeCandies(ratings: IntArray): Int {\n  val n = ratings.size\n  val candy = IntArray(n) { 1 }\n\n  for (i in 1 until n) {\n    if (ratings[i] > ratings[i - 1]) candy[i] = candy[i - 1] + 1\n  }\n\n  for (i in n - 2 downTo 0) {\n    if (ratings[i] > ratings[i + 1]) candy[i] = maxOf(candy[i], candy[i + 1] + 1)\n  }\n\n  return candy.sum()\n}",
        dart: "int distributeCandies(List<int> ratings) {\n  int n = ratings.length;\n  List<int> candy = List<int>.filled(n, 1);\n\n  for (int i = 1; i < n; i++) {\n    if (ratings[i] > ratings[i-1]) candy[i] = candy[i-1] + 1;\n  }\n\n  for (int i = n-2; i >= 0; i--) {\n    if (ratings[i] > ratings[i+1]) candy[i] = max(candy[i], candy[i+1] + 1);\n  }\n\n  return candy.reduce((a, b) => a + b);\n}",
        swift: "func distributeCandies(_ ratings: [Int]) -> Int {\n    let n = ratings.count\n    var candy = Array(repeating: 1, count: n)\n\n    for i in 1..<n {\n        if ratings[i] > ratings[i-1] { candy[i] = candy[i-1] + 1 }\n    }\n\n    for i in stride(from: n-2, through: 0, by: -1) {\n        if ratings[i] > ratings[i+1] { candy[i] = max(candy[i], candy[i+1] + 1) }\n    }\n\n    return candy.reduce(0, +)\n}",
        haskell: "distributeCandies :: [Int] -> Int\ndistributeCandies ratings = sum (zipWith max leftPass rightPass)\n  where\n    n = length ratings\n    leftPass = go ratings 0 [1]\n    go [] _ acc = reverse acc\n    go [_] _ acc = reverse acc\n    go (x:y:xs) i (c:cs) | y > x = go (y:xs) (i+1) ((c+1):c:cs)\n                         | otherwise = go (y:xs) (i+1) (1:c:cs)\n\n    rightPass = go' (reverse ratings) 0 (replicate n 1)\n    go' [] _ acc = reverse acc\n    go' [_] _ acc = reverse acc\n    go' (x:y:xs) i (c:cs) | y > x = go' (y:xs) (i+1) ((c+1):c:cs)\n                          | otherwise = go' (y:xs) (i+1) (1:c:cs)"
      }
    },
    {
      id: 5,
      title: 'Assign Cookies',
      difficulty: 'easy',
      tags: ['greedy', 'sorting'],
      description: 'Assign cookies to children. Each child has greed factor, each cookie has size.',
      examples: [
        { input: 'g=[1,2,3], s=[1,1]', output: '1', explanation: 'Can satisfy only child with greed 1' }
      ],
      constraints: '1 ≤ g.length, s.length ≤ 100000',
      hint: 'Sort both arrays. Greedily assign smallest satisfying cookie to child.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun findContentChildren(g: IntArray, s: IntArray): Int {\n  g.sort()\n  s.sort()\n  var count = 0\n  var j = 0\n\n  for (i in g.indices) {\n    while (j < s.size && s[j] < g[i]) j++\n    if (j < s.size) {\n      count++\n      j++\n    }\n  }\n\n  return count\n}",
        dart: "int findContentChildren(List<int> g, List<int> s) {\n  g.sort();\n  s.sort();\n  int count = 0, j = 0;\n\n  for (int i = 0; i < g.length; i++) {\n    while (j < s.length && s[j] < g[i]) j++;\n    if (j < s.length) {\n      count++;\n      j++;\n    }\n  }\n\n  return count;\n}",
        swift: "func findContentChildren(_ g: [Int], _ s: [Int]) -> Int {\n    let g = g.sorted(), s = s.sorted()\n    var count = 0, j = 0\n\n    for i in 0..<g.count {\n        while j < s.count && s[j] < g[i] { j += 1 }\n        if j < s.count {\n            count += 1\n            j += 1\n        }\n    }\n\n    return count\n}",
        haskell: "findContentChildren :: [Int] -> [Int] -> Int\nfindContentChildren g s = go (sort g) (sort s) 0\n  where\n    go [] _ c = c\n    go _ [] c = c\n    go (g:gs) (s:ss) c\n      | s >= g = go gs ss (c+1)\n      | otherwise = go (g:gs) ss c"
      }
    },
    {
      id: 6,
      title: 'Non-overlapping Intervals',
      difficulty: 'medium',
      tags: ['greedy', 'interval'],
      description: 'Remove minimum number of intervals to keep non-overlapping.',
      examples: [
        { input: 'intervals = [[1,2],[2,3]]', output: '0', explanation: 'Intervals do not overlap' },
        { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2', explanation: 'Remove 2 intervals' }
      ],
      constraints: '2 ≤ intervals.length ≤ 10000',
      hint: 'Sort by end time. Greedily keep interval finishing earliest.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {\n  intervals.sortBy { it[1] }\n  var end = Int.MIN_VALUE\n  var count = 0\n\n  for (interval in intervals) {\n    if (interval[0] >= end) {\n      end = interval[1]\n    } else {\n      count++\n    }\n  }\n\n  return count\n}",
        dart: "int eraseOverlapIntervals(List<List<int>> intervals) {\n  intervals.sort((a, b) => a[1].compareTo(b[1]));\n  int end = -1<<31, count = 0;\n\n  for (List<int> interval in intervals) {\n    if (interval[0] >= end) {\n      end = interval[1];\n    } else {\n      count++;\n    }\n  }\n\n  return count;\n}",
        swift: "func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {\n    let sorted = intervals.sorted { $0[1] < $1[1] }\n    var end = Int.min, count = 0\n\n    for interval in sorted {\n        if interval[0] >= end {\n            end = interval[1]\n        } else {\n            count += 1\n        }\n    }\n\n    return count\n}",
        haskell: "eraseOverlapIntervals :: [[Int]] -> Int\neraseOverlapIntervals intervals = go (sortBy (\\\\a b -> compare (a!!1) (b!!1)) intervals) (-1000000000) 0\n  where\n    go [] _ c = c\n    go (iv:ivs) end c\n      | iv!!0 >= end = go ivs (iv!!1) c\n      | otherwise = go ivs end (c+1)"
      }
    },
    {
      id: 7,
      title: 'Minimum Number of Arrows to Burst Balloons',
      difficulty: 'medium',
      tags: ['greedy', 'interval'],
      description: 'Minimum arrows to burst all balloons. Arrow bursts all balloons it touches.',
      examples: [
        { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'Arrows at 6, 11 burst all' }
      ],
      constraints: '1 ≤ points.length ≤ 10000',
      hint: 'Sort by end position. Greedy: shoot at rightmost point of each unburnt balloon.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun findMinArrowShots(points: Array<IntArray>): Int {\n  if (points.isEmpty()) return 0\n  points.sortBy { it[1].toLong() }\n  var arrows = 1\n  var lastArrow = points[0][1].toLong()\n\n  for (i in 1 until points.size) {\n    if (points[i][0] > lastArrow) {\n      arrows++\n      lastArrow = points[i][1].toLong()\n    }\n  }\n\n  return arrows\n}",
        dart: "int findMinArrowShots(List<List<int>> points) {\n  if (points.isEmpty) return 0;\n  points.sort((a, b) => a[1].compareTo(b[1]));\n  int arrows = 1;\n  int lastArrow = points[0][1];\n\n  for (int i = 1; i < points.length; i++) {\n    if (points[i][0] > lastArrow) {\n      arrows++;\n      lastArrow = points[i][1];\n    }\n  }\n\n  return arrows;\n}",
        swift: "func findMinArrowShots(_ points: [[Int]]) -> Int {\n    guard !points.isEmpty else { return 0 }\n    let sorted = points.sorted { $0[1] < $1[1] }\n    var arrows = 1, lastArrow = Int64(sorted[0][1])\n\n    for i in 1..<sorted.count {\n        if Int64(sorted[i][0]) > lastArrow {\n            arrows += 1\n            lastArrow = Int64(sorted[i][1])\n        }\n    }\n\n    return arrows\n}",
        haskell: "findMinArrowShots :: [[Int]] -> Int\nfindMinArrowShots points\n  | null points = 0\n  | otherwise = go (sortBy (\\\\a b -> compare (a!!1) (b!!1)) points) (fromIntegral (head points !! 1)) 1\n  where\n    go [] _ c = c\n    go (p:ps) lastArrow c\n      | fromIntegral (p!!0) > lastArrow = go ps (fromIntegral (p!!1)) (c+1)\n      | otherwise = go ps lastArrow c"
      }
    },
    {
      id: 8,
      title: 'Queue Reconstruction by Height',
      difficulty: 'medium',
      tags: ['greedy', 'sorting'],
      description: 'Reconstruct queue from [height, count] pairs. Count = taller people in front.',
      examples: [
        { input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]', explanation: 'Sorted insertion' }
      ],
      constraints: '1 ≤ people.length ≤ 100000',
      hint: 'Sort by height (desc) then count (asc). Insert at index = count.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {\n  people.sortWith(compareBy({ -it[0] }, { it[1] }))\n  val res = mutableListOf<IntArray>()\n\n  for (p in people) {\n    res.add(p[1], p)\n  }\n\n  return res.toTypedArray()\n}",
        dart: "List<List<int>> reconstructQueue(List<List<int>> people) {\n  people.sort((a, b) {\n    if (a[0] != b[0]) return b[0].compareTo(a[0]);\n    return a[1].compareTo(b[1]);\n  });\n  List<List<int>> res = [];\n\n  for (List<int> p in people) {\n    res.insert(p[1], p);\n  }\n\n  return res;\n}",
        swift: "func reconstructQueue(_ people: [[Int]]) -> [[Int]] {\n    let sorted = people.sorted { a, b in\n        if a[0] != b[0] { return a[0] > b[0] }\n        return a[1] < b[1]\n    }\n    var res: [[Int]] = []\n\n    for p in sorted {\n        res.insert(p, at: p[1])\n    }\n\n    return res\n}",
        haskell: "reconstructQueue :: [[Int]] -> [[Int]]\nreconstructQueue people = foldl insert [] (sortBy cmp people)\n  where\n    cmp a b | a!!0 /= b!!0 = compare (b!!0) (a!!0)\n            | otherwise = compare (a!!1) (b!!1)\n    insert xs x = take (x!!1) xs ++ [x] ++ drop (x!!1) xs"
      }
    },
    {
      id: 9,
      title: 'Lemonade Change',
      difficulty: 'easy',
      tags: ['greedy', 'counting'],
      description: 'Each customer buys for $5. Compute change. Denominations: $5, $10, $20.',
      examples: [
        { input: 'bills = [5,5,10,20,5,5,5,5,5,5,5,5,5,10,5,5,5,5,5,5]', output: 'true', explanation: 'Can give change' }
      ],
      constraints: '0 ≤ bills.length ≤ 10000',
      hint: 'Prefer $5 bills for change. Prioritize using $10+$5 over $5+$5.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun lemonadeChange(bills: IntArray): Boolean {\n  var five = 0\n  var ten = 0\n\n  for (bill in bills) {\n    when (bill) {\n      5 -> five++\n      10 -> {\n        if (five == 0) return false\n        five--\n        ten++\n      }\n      20 -> {\n        if (ten > 0 && five > 0) {\n          ten--\n          five--\n        } else if (five >= 3) {\n          five -= 3\n        } else {\n          return false\n        }\n      }\n    }\n  }\n\n  return true\n}",
        dart: "bool lemonadeChange(List<int> bills) {\n  int five = 0, ten = 0;\n\n  for (int bill in bills) {\n    if (bill == 5) {\n      five++;\n    } else if (bill == 10) {\n      if (five == 0) return false;\n      five--;\n      ten++;\n    } else {\n      if (ten > 0 && five > 0) {\n        ten--;\n        five--;\n      } else if (five >= 3) {\n        five -= 3;\n      } else {\n        return false;\n      }\n    }\n  }\n\n  return true;\n}",
        swift: "func lemonadeChange(_ bills: [Int]) -> Bool {\n    var five = 0, ten = 0\n\n    for bill in bills {\n        if bill == 5 {\n            five += 1\n        } else if bill == 10 {\n            if five == 0 { return false }\n            five -= 1\n            ten += 1\n        } else {\n            if ten > 0 && five > 0 {\n                ten -= 1\n                five -= 1\n            } else if five >= 3 {\n                five -= 3\n            } else {\n                return false\n            }\n        }\n    }\n\n    return true\n}",
        haskell: "lemonadeChange :: [Int] -> Bool\nlemonadeChange bills = go bills 0 0\n  where\n    go [] _ _ = True\n    go (b:bs) five ten\n      | b == 5 = go bs (five+1) ten\n      | b == 10 = if five == 0 then False else go bs (five-1) (ten+1)\n      | otherwise = if ten > 0 && five > 0 then go bs (five-1) (ten-1)\n                    else if five >= 3 then go bs (five-3) ten\n                    else False"
      }
    },
    {
      id: 10,
      title: 'Monotone Increasing Digits',
      difficulty: 'medium',
      tags: ['greedy', 'digit'],
      description: 'Return largest number ≤ n with monotone increasing digits.',
      examples: [
        { input: 'n = 54321', output: '49999', explanation: '49999 is largest monotone increasing ≤ 54321' }
      ],
      constraints: '0 ≤ n ≤ 10⁹',
      hint: 'Scan right-to-left for first decrease. Set that digit -1, rest to 9.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun monotoneIncreasingDigits(n: Int): Int {\n  val digits = n.toString().toMutableList()\n  var mark = digits.size\n\n  for (i in digits.size - 1 downTo 1) {\n    if (digits[i] < digits[i - 1]) {\n      mark = i\n      digits[i - 1] = (digits[i - 1].code - 1).toChar()\n    }\n  }\n\n  for (i in mark until digits.size) {\n    digits[i] = '9'\n  }\n\n  return digits.joinToString(\"\").toInt()\n}",
        dart: "int monotoneIncreasingDigits(int n) {\n  List<String> digits = n.toString().split('');\n  int mark = digits.length;\n\n  for (int i = digits.length - 1; i >= 1; i--) {\n    if (int.parse(digits[i]) < int.parse(digits[i-1])) {\n      mark = i;\n      digits[i-1] = (int.parse(digits[i-1]) - 1).toString();\n    }\n  }\n\n  for (int i = mark; i < digits.length; i++) {\n    digits[i] = '9';\n  }\n\n  return int.parse(digits.join(''));\n}",
        swift: "func monotoneIncreasingDigits(_ n: Int) -> Int {\n    var digits = Array(String(n))\n    var mark = digits.count\n\n    for i in stride(from: digits.count-1, through: 1, by: -1) {\n        if digits[i] < digits[i-1] {\n            mark = i\n            digits[i-1] = Character(UnicodeScalar(digits[i-1].asciiValue! - 1)!)\n        }\n    }\n\n    for i in mark..<digits.count {\n        digits[i] = \"9\"\n    }\n\n    return Int(String(digits))!\n}",
        haskell: "monotoneIncreasingDigits :: Int -> Int\nmonotoneIncreasingDigits n = read (adjust mark digits) :: Int\n  where\n    digits = show n\n    mark = findMark (length digits - 1) digits\n    findMark i ds | i <= 0 = length ds\n                  | ds !! i < ds !! (i-1) = i\n                  | otherwise = findMark (i-1) ds\n    adjust m ds = take m (map (\\(d, i) -> if i < m && ds !! (i-1) > ds !! i then chr (ord d - 1) else d) (zip ds [0..])) ++ replicate (length ds - m) '9'"
      }
    },
    {
      id: 11,
      title: 'Task Scheduler',
      difficulty: 'medium',
      tags: ['greedy', 'task-scheduling'],
      description: 'Schedule tasks with cooldown n. Return minimum time.',
      examples: [
        { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', explanation: 'A - B - A - B - A - B' }
      ],
      constraints: '1 ≤ tasks.length ≤ 100000',
      hint: 'Calculate idle slots. Greedily assign most frequent tasks.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun leastInterval(tasks: CharArray, n: Int): Int {\n  val freq = IntArray(26)\n  for (task in tasks) freq[task - 'A']++\n\n  var maxFreq = freq.maxOrNull() ?: 0\n  var count = freq.count { it == maxFreq }\n\n  return maxOf(tasks.size, (maxFreq - 1) * (n + 1) + count)\n}",
        dart: "int leastInterval(List<String> tasks, int n) {\n  List<int> freq = List<int>.filled(26, 0);\n  for (String task in tasks) {\n    freq[task.codeUnitAt(0) - 'A'.codeUnitAt(0)]++;\n  }\n\n  int maxFreq = freq.reduce(max);\n  int count = freq.where((f) => f == maxFreq).length;\n\n  return max(tasks.length, (maxFreq - 1) * (n + 1) + count);\n}",
        swift: "func leastInterval(_ tasks: [Character], _ n: Int) -> Int {\n    var freq = Array(repeating: 0, count: 26)\n    for task in tasks {\n        freq[Int(task.asciiValue! - Character(\"A\").asciiValue!)] += 1\n    }\n\n    let maxFreq = freq.max() ?? 0\n    let count = freq.filter { $0 == maxFreq }.count\n\n    return max(tasks.count, (maxFreq - 1) * (n + 1) + count)\n}",
        haskell: "leastInterval :: [Char] -> Int -> Int\nleastInterval tasks n = max (length tasks) ((maxFreq - 1) * (n + 1) + count)\n  where\n    freq = replicate 26 0\n    freq' = foldr (\\\\t f -> let i = ord t - ord 'A' in take i f ++ [f !! i + 1] ++ drop (i+1) f) freq tasks\n    maxFreq = maximum freq'\n    count = length $ filter (== maxFreq) freq'"
      }
    },
    {
      id: 12,
      title: 'Remove K Digits',
      difficulty: 'medium',
      tags: ['greedy', 'monotonic-stack'],
      description: 'Remove k digits to form smallest number.',
      examples: [
        { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Remove 4, 3, 2' }
      ],
      constraints: '1 ≤ num.length ≤ 100000, 1 ≤ k ≤ num.length',
      hint: 'Use stack. Remove greater digits before smaller. Handle leading zeros.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun removeKdigits(num: String, k: Int): String {\n  val stack = mutableListOf<Char>()\n  var toRemove = k\n\n  for (digit in num) {\n    while (toRemove > 0 && stack.isNotEmpty() && stack.last() > digit) {\n      stack.removeAt(stack.size - 1)\n      toRemove--\n    }\n    stack.add(digit)\n  }\n\n  while (toRemove > 0) {\n    stack.removeAt(stack.size - 1)\n    toRemove--\n  }\n\n  val result = stack.joinToString(\"\").dropWhile { it == '0' }\n  return if (result.isEmpty()) \"0\" else result\n}",
        dart: "String removeKdigits(String num, int k) {\n  List<String> stack = [];\n  int toRemove = k;\n\n  for (String digit in num.split('')) {\n    while (toRemove > 0 && stack.isNotEmpty && stack.last.compareTo(digit) > 0) {\n      stack.removeLast();\n      toRemove--;\n    }\n    stack.add(digit);\n  }\n\n  while (toRemove > 0) {\n    stack.removeLast();\n    toRemove--;\n  }\n\n  String result = stack.join('').replaceFirst(RegExp(r'^0+'), '');\n  return result.isEmpty ? '0' : result;\n}",
        swift: "func removeKdigits(_ num: String, _ k: Int) -> String {\n    var stack: [Character] = [], toRemove = k\n    for digit in num {\n        while toRemove > 0 && !stack.isEmpty && stack.last! > digit {\n            stack.removeLast()\n            toRemove -= 1\n        }\n        stack.append(digit)\n    }\n\n    while toRemove > 0 {\n        stack.removeLast()\n        toRemove -= 1\n    }\n\n    var result = String(stack).drop(while: { $0 == \"0\" })\n    return result.isEmpty ? \"0\" : String(result)\n}",
        haskell: "removeKdigits :: String -> Int -> String\nremoveKdigits num k = if null result then \"0\" else result\n  where\n    (stack, _) = foldl go ([], k) num\n    go (st, toRemove) d\n      | toRemove > 0 && not (null st) && head st > d = go (tail st, toRemove - 1) d\n      | otherwise = (d:st, toRemove)\n    stack' = reverse $ fst (go ([], k) <$> num)\n    result = dropWhile (== '0') stack'"
      }
    },
    {
      id: 13,
      title: 'Partition Labels',
      difficulty: 'medium',
      tags: ['greedy', 'two-pointer'],
      description: 'Partition string into labels where each char appears in only one label.',
      examples: [
        { input: 's = "ababcbacaddefegdehijhijk"', output: '[9,7,8]', explanation: 'Partitions at positions 9, 16, 24' }
      ],
      constraints: '1 ≤ s.length ≤ 500',
      hint: 'Compute last index of each char. Greedily partition when current index reaches max.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun partitionLabels(s: String): List<Int> {\n  val last = IntArray(26)\n  for (i in s.indices) last[s[i] - 'a'] = i\n\n  val result = mutableListOf<Int>()\n  var start = 0\n  var end = 0\n\n  for (i in s.indices) {\n    end = maxOf(end, last[s[i] - 'a'])\n    if (i == end) {\n      result.add(i - start + 1)\n      start = i + 1\n    }\n  }\n\n  return result\n}",
        dart: "List<int> partitionLabels(String s) {\n  List<int> last = List<int>.filled(26, 0);\n  for (int i = 0; i < s.length; i++) {\n    last[s.codeUnitAt(i) - 'a'.codeUnitAt(0)] = i;\n  }\n\n  List<int> result = [];\n  int start = 0, end = 0;\n\n  for (int i = 0; i < s.length; i++) {\n    end = max(end, last[s.codeUnitAt(i) - 'a'.codeUnitAt(0)]);\n    if (i == end) {\n      result.add(i - start + 1);\n      start = i + 1;\n    }\n  }\n\n  return result;\n}",
        swift: "func partitionLabels(_ s: String) -> [Int] {\n    var last = Array(repeating: 0, count: 26)\n    let chars = Array(s)\n    for i in 0..<chars.count {\n        last[Int(chars[i].asciiValue! - Character(\"a\").asciiValue!)] = i\n    }\n\n    var result: [Int] = [], start = 0, end = 0\n    for i in 0..<chars.count {\n        end = max(end, last[Int(chars[i].asciiValue! - Character(\"a\").asciiValue!)])\n        if i == end {\n            result.append(i - start + 1)\n            start = i + 1\n        }\n    }\n\n    return result\n}",
        haskell: "partitionLabels :: String -> [Int]\npartitionLabels s = go s 0 0 (last' s)\n  where\n    last' str = foldr (\\\\c m -> case lookup c m of\n                                  Just i -> if i < ord c - ord 'a' then m else (c, ord c - ord 'a'):m\n                                  Nothing -> (c, ord c - ord 'a'):m) [] str\n    go [] _ _ _ = []\n    go s start end lastMap\n      | start == end = []\n      | otherwise = (end - start + 1) : go (drop (end - start + 1) s) (end + 1) end' lastMap\n      where\n        end' = maximum [last lastMap c | c <- [s !! start .. s !! end]]"
      }
    },
    {
      id: 14,
      title: 'Split Array into Consecutive Subsequences',
      difficulty: 'medium',
      tags: ['greedy'],
      description: 'Split sorted array into consecutive subsequences (length ≥ 3).',
      examples: [
        { input: 'nums = [1,2,3,3,4,5]', output: 'true', explanation: '[1,2,3], [3,4,5]' }
      ],
      constraints: '1 ≤ nums.length ≤ 100000',
      hint: 'Greedy: append num to shortest subsequence needing it.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun isPossible(nums: IntArray): Boolean {\n  val count = mutableMapOf<Int, Int>()\n  val need = mutableMapOf<Int, Int>()\n\n  for (num in nums) count[num] = count.getOrDefault(num, 0) + 1\n\n  for (num in nums) {\n    if (count[num] ?: 0 == 0) continue\n    if (need[num] ?: 0 > 0) {\n      need[num] = need[num]!! - 1\n      need[num + 1] = need.getOrDefault(num + 1, 0) + 1\n    } else if (count[num + 1] ?: 0 > 0 && count[num + 2] ?: 0 > 0) {\n      count[num + 1] = count[num + 1]!! - 1\n      count[num + 2] = count[num + 2]!! - 1\n      need[num + 3] = need.getOrDefault(num + 3, 0) + 1\n    } else {\n      return false\n    }\n    count[num] = count[num]!! - 1\n  }\n\n  return true\n}",
        dart: "bool isPossible(List<int> nums) {\n  Map<int, int> count = {}, need = {};\n\n  for (int num in nums) {\n    count[num] = (count[num] ?? 0) + 1;\n  }\n\n  for (int num in nums) {\n    if ((count[num] ?? 0) == 0) continue;\n    if ((need[num] ?? 0) > 0) {\n      need[num] = need[num]! - 1;\n      need[num + 1] = (need[num + 1] ?? 0) + 1;\n    } else if ((count[num + 1] ?? 0) > 0 && (count[num + 2] ?? 0) > 0) {\n      count[num + 1] = count[num + 1]! - 1;\n      count[num + 2] = count[num + 2]! - 1;\n      need[num + 3] = (need[num + 3] ?? 0) + 1;\n    } else {\n      return false;\n    }\n    count[num] = count[num]! - 1;\n  }\n\n  return true;\n}",
        swift: "func isPossible(_ nums: [Int]) -> Bool {\n    var count = [Int: Int](), need = [Int: Int]()\n\n    for num in nums { count[num, default: 0] += 1 }\n\n    for num in nums {\n        if count[num, default: 0] == 0 { continue }\n        if need[num, default: 0] > 0 {\n            need[num]! -= 1\n            need[num + 1, default: 0] += 1\n        } else if count[num + 1, default: 0] > 0 && count[num + 2, default: 0] > 0 {\n            count[num + 1]! -= 1\n            count[num + 2]! -= 1\n            need[num + 3, default: 0] += 1\n        } else {\n            return false\n        }\n        count[num]! -= 1\n    }\n\n    return true\n}",
        haskell: "isPossible :: [Int] -> Bool\nisPossible nums = go nums (Map.fromList [(n, 1) | n <- nums]) (Map.empty)\n  where\n    go [] _ _ = True\n    go (num:rest) count need\n      | Map.findWithDefault 0 num count == 0 = go rest count need\n      | Map.findWithDefault 0 num need > 0 = go rest (Map.adjust (\\x -> x-1) num count)\n                                                      (Map.adjust (\\x -> x-1) num need)\n      | Map.findWithDefault 0 (num+1) count > 0 && Map.findWithDefault 0 (num+2) count > 0 =\n          go rest (Map.adjust (\\x -> x-1) num (Map.adjust (\\x -> x-1) (num+2) (Map.adjust (\\x -> x-1) (num+1) count)))\n                  (Map.insert (num+3) (Map.findWithDefault 0 (num+3) need + 1) need)\n      | otherwise = False"
      }
    },
    {
      id: 15,
      title: 'Minimum Domino Rotations',
      difficulty: 'medium',
      tags: ['greedy'],
      description: 'Minimum rotations so all dominoes match in one row.',
      examples: [
        { input: 'tops = [2,1,3], bottoms = [1,2,3]', output: '0', explanation: 'Already matching' }
      ],
      constraints: '2 ≤ dominoes.length ≤ 100000',
      hint: 'Check if first domino top/bottom can match all. Count rotations needed.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun minDominoRotations(tops: IntArray, bottoms: IntArray): Int {\n  fun rotations(target: Int): Int {\n    var count = 0\n    for (i in tops.indices) {\n      if (tops[i] != target && bottoms[i] != target) return -1\n      if (tops[i] != target) count++\n    }\n    return count\n  }\n\n  val res1 = rotations(tops[0])\n  val res2 = rotations(bottoms[0])\n  return if (res1 == -1) res2 else if (res2 == -1) res1 else minOf(res1, res2)\n}",
        dart: "int minDominoRotations(List<int> tops, List<int> bottoms) {\n  int rotations(int target) {\n    int count = 0;\n    for (int i = 0; i < tops.length; i++) {\n      if (tops[i] != target && bottoms[i] != target) return -1;\n      if (tops[i] != target) count++;\n    }\n    return count;\n  }\n\n  int res1 = rotations(tops[0]);\n  int res2 = rotations(bottoms[0]);\n  return res1 == -1 ? res2 : res2 == -1 ? res1 : min(res1, res2);\n}",
        swift: "func minDominoRotations(_ tops: [Int], _ bottoms: [Int]) -> Int {\n    func rotations(_ target: Int) -> Int {\n        var count = 0\n        for i in 0..<tops.count {\n            if tops[i] != target && bottoms[i] != target { return -1 }\n            if tops[i] != target { count += 1 }\n        }\n        return count\n    }\n\n    let res1 = rotations(tops[0]), res2 = rotations(bottoms[0])\n    return res1 == -1 ? res2 : res2 == -1 ? res1 : min(res1, res2)\n}",
        haskell: "minDominoRotations :: [Int] -> [Int] -> Int\nminDominoRotations tops bottoms = minimum [res1, res2]\n  where\n    rotations target = go (zip tops bottoms) 0\n      where\n        go [] c = c\n        go ((t,b):rest) c\n          | t /= target && b /= target = maxBound\n          | t /= target = go rest (c+1)\n          | otherwise = go rest c\n    res1 = rotations (head tops)\n    res2 = rotations (head bottoms)"
      }
    },
    {
      id: 16,
      title: 'Two City Scheduling',
      difficulty: 'easy',
      tags: ['greedy', 'sorting'],
      description: 'Send people to A or B. Minimize total cost. Each city gets n/2 people.',
      examples: [
        { input: 'costs = [[10,20],[30,200],[50,50],[200,10]]', output: '110', explanation: 'Send 0,1 to A, 2,3 to B' }
      ],
      constraints: '2n ≤ costs.length ≤ 200, costs[i].length = 2',
      hint: 'Sort by difference (A-B). Send first n to A, rest to B.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun twoCitySchedCost(costs: Array<IntArray>): Int {\n  costs.sortBy { it[0] - it[1] }\n  var total = 0\n  for (i in costs.indices) {\n    total += if (i < costs.size / 2) costs[i][0] else costs[i][1]\n  }\n  return total\n}",
        dart: "int twoCitySchedCost(List<List<int>> costs) {\n  costs.sort((a, b) => (a[0] - a[1]).compareTo(b[0] - b[1]));\n  int total = 0;\n  for (int i = 0; i < costs.length; i++) {\n    total += i < costs.length ~/ 2 ? costs[i][0] : costs[i][1];\n  }\n  return total;\n}",
        swift: "func twoCitySchedCost(_ costs: [[Int]]) -> Int {\n    let sorted = costs.sorted { $0[0] - $0[1] < $1[0] - $1[1] }\n    var total = 0\n    for i in 0..<sorted.count {\n        total += i < sorted.count / 2 ? sorted[i][0] : sorted[i][1]\n    }\n    return total\n}",
        haskell: "twoCitySchedCost :: [[Int]] -> Int\ntwoCitySchedCost costs = sum (map fst (take n sorted)) + sum (map snd (drop n sorted))\n  where\n    n = length costs \\`div\\` 2\n    sorted = sortBy (\\\\a b -> compare (a!!0 - a!!1) (b!!0 - b!!1)) costs"
      }
    },
    {
      id: 17,
      title: 'Advantage Shuffle',
      difficulty: 'medium',
      tags: ['greedy', 'two-pointer'],
      description: 'Rearrange nums1 to maximize wins against nums2.',
      examples: [
        { input: 'nums1 = [2,7,11,15], nums2 = [1,9,9,3]', output: '[2,11,7,15]', explanation: '2>1, 11>9, 7<9, 15>3' }
      ],
      constraints: '1 ≤ nums.length ≤ 10000',
      hint: 'Two-pointer: match smallest from nums1 with num from nums2.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun advantageCount(nums1: IntArray, nums2: IntArray): IntArray {\n  val indexed = nums2.withIndex().sortedBy { it.value }\n  val result = IntArray(nums1.size)\n  nums1.sort()\n\n  var j = 0\n  var unused = mutableListOf<Int>()\n\n  for (i in nums1.indices.reversed()) {\n    if (j < nums2.size && nums1[i] > indexed[j].value) {\n      result[indexed[j].index] = nums1[i]\n      j++\n    } else {\n      unused.add(nums1[i])\n    }\n  }\n\n  unused.reverse()\n  var k = 0\n  for (i in result.indices) {\n    if (result[i] == 0) result[i] = unused[k++]\n  }\n\n  return result\n}",
        dart: "List<int> advantageCount(List<int> nums1, List<int> nums2) {\n  List<int> result = List<int>.filled(nums1.length, 0);\n  List<MapEntry<int, int>> indexed = [];\n  for (int i = 0; i < nums2.length; i++) {\n    indexed.add(MapEntry(i, nums2[i]));\n  }\n  indexed.sort((a, b) => a.value.compareTo(b.value));\n  nums1.sort();\n\n  List<int> unused = [];\n  int j = 0;\n\n  for (int i = nums1.length - 1; i >= 0; i--) {\n    if (j < nums2.length && nums1[i] > indexed[j].value) {\n      result[indexed[j].key] = nums1[i];\n      j++;\n    } else {\n      unused.add(nums1[i]);\n    }\n  }\n\n  unused = unused.reversed.toList();\n  int k = 0;\n  for (int i = 0; i < result.length; i++) {\n    if (result[i] == 0) result[i] = unused[k++];\n  }\n\n  return result;\n}",
        swift: "func advantageCount(_ nums1: [Int], _ nums2: [Int]) -> [Int] {\n    var result = Array(repeating: 0, count: nums1.count)\n    let indexed = nums2.enumerated().sorted { $0.element < $1.element }\n    let sorted = nums1.sorted()\n\n    var unused: [Int] = []\n    var j = 0\n\n    for i in stride(from: sorted.count-1, through: 0, by: -1) {\n        if j < nums2.count && sorted[i] > indexed[j].element {\n            result[indexed[j].offset] = sorted[i]\n            j += 1\n        } else {\n            unused.append(sorted[i])\n        }\n    }\n\n    unused.reverse()\n    var k = 0\n    for i in 0..<result.count {\n        if result[i] == 0 { result[i] = unused[k]; k += 1 }\n    }\n\n    return result\n}",
        haskell: "advantageCount :: [Int] -> [Int] -> [Int]\nadvantageCount nums1 nums2 = result\n  where\n    indexed = sortBy (\\\\a b -> compare (snd a) (snd b)) (zip [0..] nums2)\n    sorted = sort nums1\n    result = go sorted indexed (replicate (length nums2) 0) []\n    go [] _ r _ = r\n    go s [] r u = take (length nums2) (r ++ reverse u)\n    go (x:xs) ((_,v):ivs) r u\n      | x > v = go xs ivs (updateAt (length r) x r) u\n      | otherwise = go xs ((_,v):ivs) r (x:u)"
      }
    },
    {
      id: 18,
      title: 'Minimum Cost to Move Chips',
      difficulty: 'easy',
      tags: ['greedy', 'parity'],
      description: 'Move chips to same position. Cost = 1 per move to adjacent position.',
      examples: [
        { input: 'position = [1,2,3]', output: '1', explanation: 'Move all to position 2' }
      ],
      constraints: '1 ≤ position.length ≤ 10000, 1 ≤ position[i] ≤ 10⁹',
      hint: 'Moving across even gap costs same as odd gap (pay only between positions).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun minCostToMoveChips(position: IntArray): Int {\n  var even = 0\n  var odd = 0\n  for (p in position) {\n    if (p % 2 == 0) even++ else odd++\n  }\n  return minOf(even, odd)\n}",
        dart: "int minCostToMoveChips(List<int> position) {\n  int even = 0, odd = 0;\n  for (int p in position) {\n    if (p % 2 == 0) even++; else odd++;\n  }\n  return min(even, odd);\n}",
        swift: "func minCostToMoveChips(_ position: [Int]) -> Int {\n    var even = 0, odd = 0\n    for p in position {\n        if p % 2 == 0 { even += 1 } else { odd += 1 }\n    }\n    return min(even, odd)\n}",
        haskell: "minCostToMoveChips :: [Int] -> Int\nminCostToMoveChips position = min even odd\n  where\n    (even, odd) = foldr (\\\\p (e, o) -> if even p then (e+1, o) else (e, o+1)) (0, 0) position"
      }
    },
    {
      id: 19,
      title: 'Boats to Save People',
      difficulty: 'medium',
      tags: ['greedy', 'two-pointer'],
      description: 'Minimum boats to save people. Each boat capacity = 2 people, weight limit.',
      examples: [
        { input: 'people = [5,1,4,2], limit = 6', output: '2', explanation: 'Boats: [5],[1,2,4] - wait, [5],[1,4],[2]' }
      ],
      constraints: '1 ≤ people.length ≤ 100000',
      hint: 'Two-pointer: pair heaviest with lightest.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun numRescueBoats(people: IntArray, limit: Int): Int {\n  people.sort()\n  var boats = 0\n  var left = 0\n  var right = people.size - 1\n\n  while (left <= right) {\n    if (people[left] + people[right] <= limit) {\n      left++\n    }\n    right--\n    boats++\n  }\n\n  return boats\n}",
        dart: "int numRescueBoats(List<int> people, int limit) {\n  people.sort();\n  int boats = 0, left = 0, right = people.length - 1;\n\n  while (left <= right) {\n    if (people[left] + people[right] <= limit) left++;\n    right--;\n    boats++;\n  }\n\n  return boats;\n}",
        swift: "func numRescueBoats(_ people: [Int], _ limit: Int) -> Int {\n    let sorted = people.sorted()\n    var boats = 0, left = 0, right = sorted.count - 1\n\n    while left <= right {\n        if sorted[left] + sorted[right] <= limit { left += 1 }\n        right -= 1\n        boats += 1\n    }\n\n    return boats\n}",
        haskell: "numRescueBoats :: [Int] -> Int -> Int\nnumRescueBoats people limit = go (sort people) 0 (length people - 1) 0\n  where\n    go _ l r boats | l > r = boats\n    go arr l r boats\n      | arr !! l + arr !! r <= limit = go arr (l+1) (r-1) (boats+1)\n      | otherwise = go arr l (r-1) (boats+1)"
      }
    },
    {
      id: 20,
      title: 'Maximum Units on a Truck',
      difficulty: 'easy',
      tags: ['greedy', 'sorting'],
      description: 'Load boxes on truck. Maximize units. Each box type has size and unit count.',
      examples: [
        { input: 'boxes = [[1,3],[2,2],[3,1]], truckSize = 4', output: '8', explanation: 'Load [3,1] and [2,2]' }
      ],
      constraints: '1 ≤ boxes.length ≤ 1000, truckSize ≤ 1000',
      hint: 'Sort by units descending. Greedily load highest unit-value boxes.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maximumUnits(boxes: Array<IntArray>, truckSize: Int): Int {\n  boxes.sortByDescending { it[1] }\n  var units = 0\n  var size = 0\n\n  for (box in boxes) {\n    val take = minOf(box[0], truckSize - size)\n    units += take * box[1]\n    size += take\n    if (size == truckSize) break\n  }\n\n  return units\n}",
        dart: "int maximumUnits(List<List<int>> boxes, int truckSize) {\n  boxes.sort((a, b) => b[1].compareTo(a[1]));\n  int units = 0, size = 0;\n\n  for (List<int> box in boxes) {\n    int take = min(box[0], truckSize - size);\n    units += take * box[1];\n    size += take;\n    if (size == truckSize) break;\n  }\n\n  return units;\n}",
        swift: "func maximumUnits(_ boxes: [[Int]], _ truckSize: Int) -> Int {\n    let sorted = boxes.sorted { $0[1] > $1[1] }\n    var units = 0, size = 0\n\n    for box in sorted {\n        let take = min(box[0], truckSize - size)\n        units += take * box[1]\n        size += take\n        if size == truckSize { break }\n    }\n\n    return units\n}",
        haskell: "maximumUnits :: [[Int]] -> Int -> Int\nmaximumUnits boxes truckSize = go (sortBy (\\\\a b -> compare (b!!1) (a!!1)) boxes) 0 0\n  where\n    go [] _ u = u\n    go _ size u | size == truckSize = u\n    go (b:bs) size u = let take = min (b!!0) (truckSize - size) in go bs (size + take) (u + take * (b!!1))"
      }
    }
  ]
}
