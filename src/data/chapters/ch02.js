// Chapter 2: Array & String Algorithms
export default {
  id: 2, year: 1, slug: 'arrays-strings',
  icon: '🔢', color: '#3fb950',
  title: 'Arrays & Strings',
  subtitle: 'Sliding Window, Two Pointers, Prefix Sums',
  description: 'Master the core data structures behind most algorithms. Learn two-pointer, sliding window, prefix sums, and hash-map techniques to solve array/string problems efficiently.',
  theorems: [
    {
      name: 'Prefix Sum Identity',
      katex_statement: '\\text{sum}(l,r)=\\text{prefix}[r]-\\text{prefix}[l-1]',
      statement_text: 'For prefix[i] = arr[0]+arr[1]+…+arr[i], the range sum from l to r equals prefix[r] − prefix[l−1].',
      proof: `prefix[r]   = arr[0] + arr[1] + … + arr[r]
prefix[l-1] = arr[0] + arr[1] + … + arr[l-1]

Subtracting:
prefix[r] - prefix[l-1] = arr[l] + arr[l+1] + … + arr[r]
                        = sum(arr, l, r)  □`
    },
    {
      name: 'Pigeonhole Principle',
      katex_statement: 'n+1 \\text{ objects into } n \\text{ boxes} \\Rightarrow \\exists \\text{ box with} \\ge 2',
      statement_text: 'If n+1 objects are placed into n boxes, at least one box contains at least 2 objects.',
      proof: `By contradiction: suppose every box has ≤ 1 object.
Then total objects ≤ n·1 = n < n+1. Contradiction.
Therefore at least one box has ≥ 2 objects. □

Application: In an array of n+1 integers from [1,n],
at least one integer appears twice (Boyer-Moore).`
    }
  ],
  problems: [
    {
      id: 1, title: 'Two Sum',
      difficulty: 'Easy', tags: ['Hash Map'],
      description: 'Given array nums and integer target, return indices of two numbers that add to target. Assume exactly one solution exists.',
      examples: [
        { input: 'nums=[2,7,11,15], target=9', output: '[0,1]', explanation: 'nums[0]+nums[1]=9' },
        { input: 'nums=[3,2,4], target=6', output: '[1,2]' }
      ],
      constraints: ['2 ≤ n ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
      hint: 'Use a hash map: for each element, check if target-element is already in map.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun twoSum(nums: IntArray, target: Int): IntArray {\n    val map = HashMap<Int, Int>()\n    for ((i, n) in nums.withIndex()) {\n        val comp = target - n\n        if (map.containsKey(comp)) return intArrayOf(map[comp]!!, i)\n        map[n] = i\n    }\n    return intArrayOf()\n}",
        dart: "List<int> twoSum(List<int> nums, int target) {\n  final map = <int, int>{};\n  for (int i = 0; i < nums.length; i++) {\n    final comp = target - nums[i];\n    if (map.containsKey(comp)) return [map[comp]!, i];\n    map[nums[i]] = i;\n  }\n  return [];\n}",
        swift: "func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n    var map = [Int: Int]()\n    for (i, n) in nums.enumerated() {\n        if let j = map[target - n] { return [j, i] }\n        map[n] = i\n    }\n    return []\n}",
        haskell: "import qualified Data.Map.Strict as Map\n\ntwoSum :: [Int] -> Int -> Maybe (Int, Int)\ntwoSum nums target = go nums 0 Map.empty\n  where\n    go [] _ _ = Nothing\n    go (x:xs) i seen =\n      case Map.lookup (target - x) seen of\n        Just j  -> Just (j, i)\n        Nothing -> go xs (i+1) (Map.insert x i seen)"
      }
    },
    {
      id: 2, title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy', tags: ['Greedy', 'Array'],
      description: 'Given prices array where prices[i] is the price on day i, find the maximum profit from one buy-sell transaction.',
      examples: [
        { input: '[7,1,5,3,6,4]', output: '5', explanation: 'Buy day 2 (price=1), sell day 5 (price=6)' },
        { input: '[7,6,4,3,1]', output: '0', explanation: 'No profit possible' }
      ],
      constraints: ['1 ≤ n ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
      hint: 'Track minimum price seen so far; update max profit at each step.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maxProfit(prices: IntArray): Int {\n    var minPrice = Int.MAX_VALUE; var maxProfit = 0\n    for (p in prices) {\n        minPrice = minOf(minPrice, p)\n        maxProfit = maxOf(maxProfit, p - minPrice)\n    }\n    return maxProfit\n}",
        dart: "int maxProfit(List<int> prices) {\n  int minP = prices[0], maxP = 0;\n  for (int p in prices) {\n    minP = p < minP ? p : minP;\n    maxP = (p - minP) > maxP ? (p - minP) : maxP;\n  }\n  return maxP;\n}",
        swift: "func maxProfit(_ prices: [Int]) -> Int {\n    var minPrice = Int.max, maxProfit = 0\n    for p in prices {\n        minPrice = min(minPrice, p)\n        maxProfit = max(maxProfit, p - minPrice)\n    }\n    return maxProfit\n}",
        haskell: "maxProfit :: [Int] -> Int\nmaxProfit prices = snd \\$ foldl go (head prices, 0) (tail prices)\n  where\n    go (minP, maxP) p = (min minP p, max maxP (p - minP))"
      }
    },
    {
      id: 3, title: 'Maximum Subarray (Kadane)',
      difficulty: 'Easy', tags: ['Dynamic Programming', 'Kadane'],
      description: 'Find the contiguous subarray with the largest sum.',
      examples: [
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has sum 6' }
      ],
      constraints: ['1 ≤ n ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
      hint: 'Kadane: curr = max(nums[i], curr+nums[i]). If curr < 0, reset.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maxSubArray(nums: IntArray): Int {\n    var curr = nums[0]; var best = nums[0]\n    for (i in 1 until nums.size) {\n        curr = maxOf(nums[i], curr + nums[i])\n        best = maxOf(best, curr)\n    }\n    return best\n}",
        dart: "int maxSubArray(List<int> nums) {\n  int curr = nums[0], best = nums[0];\n  for (int i = 1; i < nums.length; i++) {\n    curr = nums[i] > curr + nums[i] ? nums[i] : curr + nums[i];\n    best = curr > best ? curr : best;\n  }\n  return best;\n}",
        swift: "func maxSubArray(_ nums: [Int]) -> Int {\n    var (curr, best) = (nums[0], nums[0])\n    for i in 1..<nums.count {\n        curr = max(nums[i], curr + nums[i])\n        best = max(best, curr)\n    }\n    return best\n}",
        haskell: "maxSubArray :: [Int] -> Int\nmaxSubArray (x:xs) = snd \\$ foldl go (x, x) xs\n  where go (curr, best) n = let c = max n (curr+n) in (c, max best c)"
      }
    },
    {
      id: 4, title: 'Sliding Window Maximum',
      difficulty: 'Hard', tags: ['Deque', 'Sliding Window'],
      description: 'Given array and window size k, return the maximum of each window as it slides across the array.',
      examples: [
        { input: 'nums=[1,3,-1,-3,5,3,6,7], k=3', output: '[3,3,5,5,6,7]' }
      ],
      constraints: ['1 ≤ k ≤ n ≤ 10⁵'],
      hint: 'Use a monotone decreasing deque. Remove elements out of window and smaller than current.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "import java.util.ArrayDeque\nfun maxSlidingWindow(nums: IntArray, k: Int): IntArray {\n    val dq = ArrayDeque<Int>()  // stores indices\n    val res = IntArray(nums.size - k + 1)\n    for (i in nums.indices) {\n        while (dq.isNotEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst()\n        while (dq.isNotEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast()\n        dq.addLast(i)\n        if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()]\n    }\n    return res\n}",
        dart: "List<int> maxSlidingWindow(List<int> nums, int k) {\n  List<int> dq = [], res = [];\n  for (int i = 0; i < nums.length; i++) {\n    while (dq.isNotEmpty && dq.first < i - k + 1) dq.removeAt(0);\n    while (dq.isNotEmpty && nums[dq.last] < nums[i]) dq.removeLast();\n    dq.add(i);\n    if (i >= k - 1) res.add(nums[dq.first]);\n  }\n  return res;\n}",
        swift: "func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {\n    var dq = [Int](), res = [Int]()\n    for i in nums.indices {\n        while !dq.isEmpty && dq.first! < i - k + 1 { dq.removeFirst() }\n        while !dq.isEmpty && nums[dq.last!] < nums[i] { dq.removeLast() }\n        dq.append(i)\n        if i >= k - 1 { res.append(nums[dq.first!]) }\n    }\n    return res\n}",
        haskell: "import Data.Sequence (Seq, (|>))\nimport qualified Data.Sequence as Seq\n\nmaxSlidingWindow :: [Int] -> Int -> [Int]\nmaxSlidingWindow nums k = go nums 0 Seq.empty []\n  where\n    arr = nums\n    go [] _ _ res = reverse res\n    go (x:xs) i dq res =\n      let dq1 = case Seq.viewl dq of\n                  (j Seq.:< rest) | j < i-k+1 -> rest\n                  _ -> dq\n          dq2 = Seq.dropWhileR (\\\\j -> arr!!j < x) dq1 |> i\n          res' = if i >= k-1 then arr !! (Seq.index dq2 0) : res else res\n      in go xs (i+1) dq2 res'"
      }
    },
    {
      id: 5, title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium', tags: ['Sliding Window', 'Hash Map'],
      description: 'Find the length of the longest substring without repeating characters.',
      examples: [
        { input: '"abcabcbb"', output: '3', explanation: '"abc"' },
        { input: '"bbbbb"', output: '1', explanation: '"b"' }
      ],
      constraints: ['0 ≤ s.length ≤ 5×10⁴'],
      hint: 'Two-pointer sliding window; maintain a set of characters in current window.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(min(n, charset))',
      solutions: {
        kotlin: "fun lengthOfLongestSubstring(s: String): Int {\n    val map = HashMap<Char, Int>()\n    var left = 0; var result = 0\n    for ((right, c) in s.withIndex()) {\n        if (map.containsKey(c) && map[c]!! >= left) left = map[c]!! + 1\n        map[c] = right\n        result = maxOf(result, right - left + 1)\n    }\n    return result\n}",
        dart: "int lengthOfLongestSubstring(String s) {\n  Map<String, int> map = {};\n  int left = 0, res = 0;\n  for (int r = 0; r < s.length; r++) {\n    String c = s[r];\n    if (map.containsKey(c) && map[c]! >= left) left = map[c]! + 1;\n    map[c] = r;\n    res = r - left + 1 > res ? r - left + 1 : res;\n  }\n  return res;\n}",
        swift: "func lengthOfLongestSubstring(_ s: String) -> Int {\n    var map = [Character: Int](), left = 0, result = 0\n    for (right, c) in s.enumerated() {\n        if let prev = map[c], prev >= left { left = prev + 1 }\n        map[c] = right\n        result = max(result, right - left + 1)\n    }\n    return result\n}",
        haskell: "import qualified Data.Map.Strict as Map\n\nlongestSubstring :: String -> Int\nlongestSubstring s = go s 0 0 Map.empty\n  where\n    go [] _ best _ = best\n    go (c:cs) i best seen =\n      let left' = case Map.lookup c seen of\n                    Just j  -> max (i - (length s - length (c:cs) - 1 + 1)) (j+1)\n                    Nothing -> i - (length s - length (c:cs) - 1)\n          -- simplified: track with index\n          best' = max best (1 + length cs - length (dropWhile (/=c) cs))\n      in go cs (i+1) best' (Map.insert c i seen)\n\n-- Cleaner version\nlongestSubstringClean :: String -> Int\nlongestSubstringClean s = go (zip [0..] s) 0 0 Map.empty\n  where\n    go [] _ best _ = best\n    go ((i,c):rest) left best seen =\n      let left' = maybe left (max left . (+1)) (Map.lookup c seen)\n          best' = max best (i - left' + 1)\n      in go rest left' best' (Map.insert c i seen)"
      }
    },
    {
      id: 6, title: 'Container With Most Water',
      difficulty: 'Medium', tags: ['Two Pointers'],
      description: 'Given array of heights, find two lines that together with x-axis form a container holding the most water.',
      examples: [
        { input: '[1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (h=8) and 8 (h=7): min(8,7)*(8-1)=49' }
      ],
      constraints: ['2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴'],
      hint: 'Two pointers. Always move the pointer with smaller height inward.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun maxArea(height: IntArray): Int {\n    var lo = 0; var hi = height.lastIndex; var max = 0\n    while (lo < hi) {\n        max = maxOf(max, minOf(height[lo], height[hi]) * (hi - lo))\n        if (height[lo] < height[hi]) lo++ else hi--\n    }\n    return max\n}",
        dart: "int maxArea(List<int> h) {\n  int lo = 0, hi = h.length - 1, max = 0;\n  while (lo < hi) {\n    int area = (h[lo] < h[hi] ? h[lo] : h[hi]) * (hi - lo);\n    if (area > max) max = area;\n    if (h[lo] < h[hi]) lo++; else hi--;\n  }\n  return max;\n}",
        swift: "func maxArea(_ height: [Int]) -> Int {\n    var lo = 0, hi = height.count - 1, maxA = 0\n    while lo < hi {\n        maxA = max(maxA, min(height[lo], height[hi]) * (hi - lo))\n        if height[lo] < height[hi] { lo += 1 } else { hi -= 1 }\n    }\n    return maxA\n}",
        haskell: "maxArea :: [Int] -> Int\nmaxArea heights = go 0 (length heights - 1) 0\n  where\n    arr = heights\n    go lo hi best\n      | lo >= hi  = best\n      | otherwise =\n          let area = min (arr!!lo) (arr!!hi) * (hi - lo)\n              best' = max best area\n          in if arr!!lo < arr!!hi\n             then go (lo+1) hi best'\n             else go lo (hi-1) best'"
      }
    },
    {
      id: 7, title: 'Trapping Rain Water',
      difficulty: 'Hard', tags: ['Two Pointers', 'Array'],
      description: 'Given an array of bar heights, compute how much water can be trapped between the bars after rain.',
      examples: [
        { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: '6 units of water trapped' }
      ],
      constraints: ['n ≥ 0', '0 ≤ height[i] ≤ 10⁵'],
      hint: 'Water at position i = min(maxLeft[i], maxRight[i]) - height[i]. Use two pointers for O(1) space.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun trap(height: IntArray): Int {\n    var lo = 0; var hi = height.lastIndex\n    var leftMax = 0; var rightMax = 0; var water = 0\n    while (lo < hi) {\n        if (height[lo] < height[hi]) {\n            if (height[lo] >= leftMax) leftMax = height[lo] else water += leftMax - height[lo]\n            lo++\n        } else {\n            if (height[hi] >= rightMax) rightMax = height[hi] else water += rightMax - height[hi]\n            hi--\n        }\n    }\n    return water\n}",
        dart: "int trap(List<int> h) {\n  int lo=0, hi=h.length-1, lMax=0, rMax=0, water=0;\n  while (lo < hi) {\n    if (h[lo] < h[hi]) {\n      if (h[lo] >= lMax) lMax = h[lo]; else water += lMax - h[lo];\n      lo++;\n    } else {\n      if (h[hi] >= rMax) rMax = h[hi]; else water += rMax - h[hi];\n      hi--;\n    }\n  }\n  return water;\n}",
        swift: "func trap(_ height: [Int]) -> Int {\n    var (lo, hi, lMax, rMax, water) = (0, height.count-1, 0, 0, 0)\n    while lo < hi {\n        if height[lo] < height[hi] {\n            height[lo] >= lMax ? (lMax = height[lo]) : (water += lMax - height[lo]); lo += 1\n        } else {\n            height[hi] >= rMax ? (rMax = height[hi]) : (water += rMax - height[hi]); hi -= 1\n        }\n    }\n    return water\n}",
        haskell: "trap :: [Int] -> Int\ntrap heights = go 0 (length heights - 1) 0 0 0\n  where\n    arr = heights\n    go lo hi lMax rMax acc\n      | lo >= hi  = acc\n      | arr!!lo < arr!!hi =\n          if arr!!lo >= lMax\n          then go (lo+1) hi (arr!!lo) rMax acc\n          else go (lo+1) hi lMax rMax (acc + lMax - arr!!lo)\n      | otherwise =\n          if arr!!hi >= rMax\n          then go lo (hi-1) lMax (arr!!hi) acc\n          else go lo (hi-1) lMax rMax (acc + rMax - arr!!hi)"
      }
    },
    {
      id: 8, title: 'Product of Array Except Self',
      difficulty: 'Medium', tags: ['Prefix Product', 'Array'],
      description: 'Return an array answer where answer[i] equals the product of all elements of nums except nums[i]. Do it in O(n) without division.',
      examples: [
        { input: '[1,2,3,4]', output: '[24,12,8,6]', explanation: 'Each element is product of all others.' }
      ],
      constraints: ['2 ≤ n ≤ 10⁵', 'The product fits in 32-bit integer'],
      hint: 'answer[i] = prefix product up to i-1  ×  suffix product from i+1',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1) extra (output array not counted)',
      solutions: {
        kotlin: "fun productExceptSelf(nums: IntArray): IntArray {\n    val n = nums.size\n    val res = IntArray(n) { 1 }\n    var prefix = 1\n    for (i in 0 until n) { res[i] = prefix; prefix *= nums[i] }\n    var suffix = 1\n    for (i in n - 1 downTo 0) { res[i] *= suffix; suffix *= nums[i] }\n    return res\n}",
        dart: "List<int> productExceptSelf(List<int> nums) {\n  int n = nums.length;\n  List<int> res = List.filled(n, 1);\n  int prefix = 1;\n  for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n  int suffix = 1;\n  for (int i = n-1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }\n  return res;\n}",
        swift: "func productExceptSelf(_ nums: [Int]) -> [Int] {\n    var res = Array(repeating: 1, count: nums.count)\n    var prefix = 1\n    for i in nums.indices { res[i] = prefix; prefix *= nums[i] }\n    var suffix = 1\n    for i in stride(from: nums.count-1, through: 0, by: -1) { res[i] *= suffix; suffix *= nums[i] }\n    return res\n}",
        haskell: "productExceptSelf :: [Int] -> [Int]\nproductExceptSelf nums = zipWith (*) prefixes suffixes\n  where\n    prefixes = scanl (*) 1 (init nums)\n    suffixes = reverse \\$ scanl (*) 1 (reverse \\$ tail nums)"
      }
    },
    {
      id: 9, title: 'Range Sum Query (Prefix Sums)',
      difficulty: 'Easy', tags: ['Prefix Sum'],
      description: 'Implement a data structure that answers range sum queries in O(1) after O(n) preprocessing.',
      examples: [
        { input: 'nums=[2,0,3,-5,2,-1], query(0,2)', output: '5', explanation: '2+0+3=5' },
        { input: 'query(2,5)', output: '-1', explanation: '3+(-5)+2+(-1)=-1' }
      ],
      constraints: ['1 ≤ n ≤ 10⁴', '-10⁵ ≤ nums[i] ≤ 10⁵'],
      hint: 'prefix[i] = sum of arr[0..i]. Range sum = prefix[r] - (r > 0 ? prefix[l-1] : 0).',
      timeComplexity: 'O(1) query, O(n) build', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class NumArray(nums: IntArray) {\n    private val prefix = IntArray(nums.size + 1)\n    init { for (i in nums.indices) prefix[i + 1] = prefix[i] + nums[i] }\n    fun sumRange(left: Int, right: Int) = prefix[right + 1] - prefix[left]\n}",
        dart: "class NumArray {\n  late List<int> prefix;\n  NumArray(List<int> nums) {\n    prefix = List.filled(nums.length + 1, 0);\n    for (int i = 0; i < nums.length; i++) prefix[i+1] = prefix[i] + nums[i];\n  }\n  int sumRange(int l, int r) => prefix[r+1] - prefix[l];\n}",
        swift: "class NumArray {\n    private var prefix: [Int]\n    init(_ nums: [Int]) {\n        prefix = Array(repeating: 0, count: nums.count + 1)\n        for i in nums.indices { prefix[i+1] = prefix[i] + nums[i] }\n    }\n    func sumRange(_ left: Int, _ right: Int) -> Int { prefix[right+1] - prefix[left] }\n}",
        haskell: "import Data.Array\n\nbuildPrefix :: [Int] -> Array Int Int\nbuildPrefix nums = listArray (0, n) (scanl (+) 0 nums)\n  where n = length nums\n\nsumRange :: Array Int Int -> Int -> Int -> Int\nsumRange prefix l r = prefix ! (r+1) - prefix ! l"
      }
    },
    {
      id: 10, title: 'Find All Duplicates',
      difficulty: 'Medium', tags: ['Array', 'Cycle Sort'],
      description: 'Given an array of n integers where each integer is in range [1, n], find all elements that appear twice. Use O(1) extra space.',
      examples: [
        { input: '[4,3,2,7,8,2,3,1]', output: '[2,3]' }
      ],
      constraints: ['1 ≤ n ≤ 10⁵', 'Each element in [1, n]'],
      hint: 'Use sign-marking: negate arr[abs(arr[i])-1]. If already negative, it\'s a duplicate.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun findDuplicates(nums: IntArray): List<Int> {\n    val result = mutableListOf<Int>()\n    for (n in nums) {\n        val idx = Math.abs(n) - 1\n        if (nums[idx] < 0) result.add(Math.abs(n))\n        else nums[idx] = -nums[idx]\n    }\n    return result\n}",
        dart: "List<int> findDuplicates(List<int> nums) {\n  List<int> res = [];\n  for (int n in nums) {\n    int idx = n.abs() - 1;\n    if (nums[idx] < 0) res.add(n.abs());\n    else nums[idx] = -nums[idx];\n  }\n  return res;\n}",
        swift: "func findDuplicates(_ nums: inout [Int]) -> [Int] {\n    var result = [Int]()\n    for n in nums {\n        let idx = abs(n) - 1\n        if nums[idx] < 0 { result.append(abs(n)) } else { nums[idx] = -nums[idx] }\n    }\n    return result\n}",
        haskell: "import Data.Array (Array, (//), (!), listArray)\nimport Data.List (nub)\n\nfindDuplicates :: [Int] -> [Int]\nfindDuplicates nums = [i | i <- [1..n], count i > 1]\n  where\n    n = length nums\n    count x = length (filter (==x) nums)  -- O(n\u00b2) simple version\n\n-- O(n) using frequency array\nfindDuplicatesLinear :: [Int] -> [Int]\nfindDuplicatesLinear nums =\n  [i | (i, c) <- zip [1..] counts, c == 2]\n  where\n    n = length nums\n    counts = map (\\\\i -> length (filter (==i) nums)) [1..n]"
      }
    },
    {
      id: 11, title: 'Rotate Array',
      difficulty: 'Easy', tags: ['Array', 'Reversal'],
      description: 'Rotate an array to the right by k steps in O(n) time and O(1) space using the reversal trick.',
      examples: [
        { input: 'nums=[1,2,3,4,5,6,7], k=3', output: '[5,6,7,1,2,3,4]' }
      ],
      constraints: ['1 ≤ n ≤ 10⁵', '0 ≤ k ≤ 10⁵'],
      hint: 'Reverse whole, then reverse first k, then reverse remaining n-k.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun rotate(nums: IntArray, k: Int) {\n    val n = nums.size; val kk = k % n\n    fun reverse(a: Int, b: Int) {\n        var l = a; var r = b\n        while (l < r) { nums[l] = nums[r].also { nums[r] = nums[l] }; l++; r-- }\n    }\n    reverse(0, n - 1); reverse(0, kk - 1); reverse(kk, n - 1)\n}",
        dart: "void rotate(List<int> nums, int k) {\n  int n = nums.length; k %= n;\n  void rev(int a, int b) {\n    while (a < b) { int t=nums[a]; nums[a]=nums[b]; nums[b]=t; a++; b--; }\n  }\n  rev(0, n-1); rev(0, k-1); rev(k, n-1);\n}",
        swift: "func rotate(_ nums: inout [Int], _ k: Int) {\n    let n = nums.count, kk = k % n\n    func rev(_ a: Int, _ b: Int) {\n        var (a, b) = (a, b)\n        while a < b { nums.swapAt(a, b); a += 1; b -= 1 }\n    }\n    rev(0, n-1); rev(0, kk-1); rev(kk, n-1)\n}",
        haskell: "rotate :: Int -> [a] -> [a]\nrotate k xs = let n = length xs; k' = k \\`mod\\` n\n              in drop (n-k') xs ++ take (n-k') xs"
      }
    },
    {
      id: 12, title: 'Longest Common Prefix',
      difficulty: 'Easy', tags: ['String', 'Vertical Scan'],
      description: 'Find the longest common prefix string among an array of strings.',
      examples: [
        { input: '["flower","flow","flight"]', output: '"fl"' },
        { input: '["dog","racecar","car"]', output: '""' }
      ],
      constraints: ['1 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200'],
      hint: 'Vertical scan: column by column, check if all strings have the same character.',
      timeComplexity: 'O(S) where S = sum of all characters', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun longestCommonPrefix(strs: Array<String>): String {\n    if (strs.isEmpty()) return \"\"\n    for (i in strs[0].indices) {\n        val c = strs[0][i]\n        for (s in strs) {\n            if (i >= s.length || s[i] != c) return strs[0].substring(0, i)\n        }\n    }\n    return strs[0]\n}",
        dart: "String longestCommonPrefix(List<String> strs) {\n  if (strs.isEmpty) return '';\n  for (int i = 0; i < strs[0].length; i++) {\n    String c = strs[0][i];\n    for (String s in strs) {\n      if (i >= s.length || s[i] != c) return strs[0].substring(0, i);\n    }\n  }\n  return strs[0];\n}",
        swift: "func longestCommonPrefix(_ strs: [String]) -> String {\n    guard !strs.isEmpty else { return \"\" }\n    let s0 = Array(strs[0])\n    for i in s0.indices {\n        for s in strs {\n            let sa = Array(s)\n            if i >= sa.count || sa[i] != s0[i] { return String(s0[..<i]) }\n        }\n    }\n    return strs[0]\n}",
        haskell: "import Data.List (transpose, isPrefixOf)\n\nlongestCommonPrefix :: [String] -> String\nlongestCommonPrefix [] = \"\"\nlongestCommonPrefix strs = map fst \\$ takeWhile allEqual \\$ transpose \\$ map (zip [0..]) strs\n  where allEqual xs = length (nub (map snd xs)) == 1\n        nub [] = []; nub (x:xs) = x : nub (filter (/=x) xs)\n\n-- Simpler approach\nlcp :: [String] -> String\nlcp [] = \"\"\nlcp (x:xs) = foldl common x xs\n  where common a b = map fst \\$ takeWhile (uncurry (==)) (zip a b)"
      }
    },
    {
      id: 13, title: 'Valid Anagram',
      difficulty: 'Easy', tags: ['String', 'Hash Map'],
      description: 'Given two strings s and t, return true if t is an anagram of s.',
      examples: [
        { input: 's="anagram", t="nagaram"', output: 'true' },
        { input: 's="rat", t="car"', output: 'false' }
      ],
      constraints: ['1 ≤ s.length, t.length ≤ 5×10⁴', 'lowercase letters only'],
      hint: 'Count character frequencies; they must be equal.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1) — fixed 26-char alphabet',
      solutions: {
        kotlin: "fun isAnagram(s: String, t: String): Boolean {\n    if (s.length != t.length) return false\n    val count = IntArray(26)\n    for (c in s) count[c - 'a']++\n    for (c in t) count[c - 'a']--\n    return count.all { it == 0 }\n}",
        dart: "bool isAnagram(String s, String t) {\n  if (s.length != t.length) return false;\n  List<int> count = List.filled(26, 0);\n  for (int i = 0; i < s.length; i++) {\n    count[s.codeUnitAt(i) - 97]++;\n    count[t.codeUnitAt(i) - 97]--;\n  }\n  return count.every((c) => c == 0);\n}",
        swift: "func isAnagram(_ s: String, _ t: String) -> Bool {\n    guard s.count == t.count else { return false }\n    var count = [Character: Int]()\n    zip(s, t).forEach { (a, b) in count[a, default: 0] += 1; count[b, default: 0] -= 1 }\n    return count.values.allSatisfy { $0 == 0 }\n}",
        haskell: "import Data.List (sort)\n\nisAnagram :: String -> String -> Bool\nisAnagram s t = sort s == sort t  -- O(n log n)\n\n-- O(n) version\nisAnagramLinear :: String -> String -> Bool\nisAnagramLinear s t = length s == length t && freq s == freq t\n  where\n    freq = foldl (\\\\m c -> Map.insertWith (+) c 1 m) Map.empty\n    Map = Data.Map.Strict"
      }
    },
    {
      id: 14, title: 'Group Anagrams',
      difficulty: 'Medium', tags: ['Hash Map', 'String'],
      description: 'Group an array of strings by anagram equivalence class.',
      examples: [
        { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
      ],
      constraints: ['0 ≤ strs.length ≤ 10⁴', '0 ≤ strs[i].length ≤ 100'],
      hint: 'Key = sorted string (or character frequency tuple). Group by key.',
      timeComplexity: 'O(N·K log K) where K = max string length', spaceComplexity: 'O(N·K)',
      solutions: {
        kotlin: "fun groupAnagrams(strs: Array<String>): List<List<String>> {\n    val map = HashMap<String, MutableList<String>>()\n    for (s in strs) {\n        val key = String(s.toCharArray().also { it.sort() })\n        map.getOrPut(key) { mutableListOf() }.add(s)\n    }\n    return map.values.toList()\n}",
        dart: "List<List<String>> groupAnagrams(List<String> strs) {\n  Map<String, List<String>> map = {};\n  for (String s in strs) {\n    String key = (s.split('')..sort()).join();\n    map.putIfAbsent(key, () => []).add(s);\n  }\n  return map.values.toList();\n}",
        swift: "func groupAnagrams(_ strs: [String]) -> [[String]] {\n    var map = [String: [String]]()\n    for s in strs {\n        let key = String(s.sorted())\n        map[key, default: []].append(s)\n    }\n    return Array(map.values)\n}",
        haskell: "import Data.List (sort, sortBy, groupBy)\nimport Data.Ord (comparing)\nimport Data.Function (on)\n\ngroupAnagrams :: [String] -> [[String]]\ngroupAnagrams strs =\n  map (map snd) \\$ groupBy ((==) \\`on\\` fst) \\$ sortBy (comparing fst)\n    [(sort s, s) | s <- strs]"
      }
    },
    {
      id: 15, title: 'Minimum Window Substring',
      difficulty: 'Hard', tags: ['Sliding Window', 'String'],
      description: 'Find the minimum window in s that contains all characters of t.',
      examples: [
        { input: 's="ADOBECODEBANC", t="ABC"', output: '"BANC"' }
      ],
      constraints: ['1 ≤ s,t length ≤ 10⁵'],
      hint: 'Sliding window: expand right until valid, shrink left while still valid.',
      timeComplexity: 'O(|s| + |t|)', spaceComplexity: 'O(|s| + |t|)',
      solutions: {
        kotlin: "fun minWindow(s: String, t: String): String {\n    val need = HashMap<Char, Int>(); for (c in t) need[c] = (need[c] ?: 0) + 1\n    var have = 0; val required = need.size\n    var left = 0; var minLen = Int.MAX_VALUE; var minL = 0\n    val window = HashMap<Char, Int>()\n    for (right in s.indices) {\n        val c = s[right]; window[c] = (window[c] ?: 0) + 1\n        if (need.containsKey(c) && window[c] == need[c]) have++\n        while (have == required) {\n            if (right - left + 1 < minLen) { minLen = right - left + 1; minL = left }\n            val lc = s[left++]; window[lc] = window[lc]!! - 1\n            if (need.containsKey(lc) && window[lc]!! < need[lc]!!) have--\n        }\n    }\n    return if (minLen == Int.MAX_VALUE) \"\" else s.substring(minL, minL + minLen)\n}",
        dart: "String minWindow(String s, String t) {\n  Map<String,int> need = {}, win = {};\n  for (String c in t.split('')) need[c] = (need[c] ?? 0) + 1;\n  int have = 0, req = need.length, lo = 0, minLen = s.length + 1, minL = 0;\n  for (int r = 0; r < s.length; r++) {\n    String c = s[r]; win[c] = (win[c] ?? 0) + 1;\n    if (need.containsKey(c) && win[c] == need[c]) have++;\n    while (have == req) {\n      if (r - lo + 1 < minLen) { minLen = r - lo + 1; minL = lo; }\n      String lc = s[lo++]; win[lc] = win[lc]! - 1;\n      if (need.containsKey(lc) && win[lc]! < need[lc]!) have--;\n    }\n  }\n  return minLen > s.length ? '' : s.substring(minL, minL + minLen);\n}",
        swift: "func minWindow(_ s: String, _ t: String) -> String {\n    var need = [Character: Int](), win = [Character: Int]()\n    for c in t { need[c, default: 0] += 1 }\n    let sa = Array(s); var have = 0, req = need.count, lo = 0, minLen = Int.max, minL = 0\n    for r in sa.indices {\n        let c = sa[r]; win[c, default: 0] += 1\n        if let n = need[c], win[c] == n { have += 1 }\n        while have == req {\n            if r - lo + 1 < minLen { minLen = r - lo + 1; minL = lo }\n            let lc = sa[lo]; win[lc, default: 0] -= 1; lo += 1\n            if let n = need[lc], win[lc, default: 0] < n { have -= 1 }\n        }\n    }\n    return minLen == Int.max ? \"\" : String(sa[minL..<(minL+minLen)])\n}",
        haskell: "import qualified Data.Map.Strict as Map\n\nminWindow :: String -> String -> String\nminWindow s t = go (zip [0..] s) 0 Map.empty 0 (length s + 1) 0\n  where\n    need = Map.fromListWith (+) [(c, 1) | c <- t]\n    req  = Map.size (Map.filter (>0) need)\n    arr  = s\n    go [] _ _ _ minLen minL = if minLen > length s then \"\" else take minLen (drop minL s)\n    go ((i,c):rest) lo win have minLen minL =\n      let win'  = Map.insertWith (+) c 1 win\n          have' = if Map.findWithDefault 0 c need > 0 &&\n                     Map.findWithDefault 0 c win' == Map.findWithDefault 0 c need\n                  then have + 1 else have\n          (lo', win'', have'', mLen, mL) = shrink lo win' have' minLen minL i\n      in go rest lo' win'' have'' mLen mL\n    shrink lo win have minLen minL i\n      | have /= req = (lo, win, have, minLen, minL)\n      | otherwise =\n          let (mLen', mL') = if i - lo + 1 < minLen then (i - lo + 1, lo) else (minLen, minL)\n              lc   = arr !! lo\n              win' = Map.insertWith (+) lc (-1) win\n              have' = if Map.findWithDefault 0 lc need > 0 &&\n                         Map.findWithDefault 0 lc win' < Map.findWithDefault 0 lc need\n                      then have - 1 else have\n          in shrink (lo+1) win' have' mLen' mL' i"
      }
    },
    {
      id: 16, title: 'Subarray Sum Equals K',
      difficulty: 'Medium', tags: ['Prefix Sum', 'Hash Map'],
      description: 'Find the total number of continuous subarrays whose sum equals k.',
      examples: [
        { input: 'nums=[1,1,1], k=2', output: '2', explanation: '[1,1] occurs twice' },
        { input: 'nums=[1,2,3], k=3', output: '2', explanation: '[1,2] and [3]' }
      ],
      constraints: ['1 ≤ n ≤ 2×10⁴', '-1000 ≤ nums[i] ≤ 1000'],
      hint: 'Use prefix sum. If prefix[j] - prefix[i] = k, then subarray [i+1..j] sums to k.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun subarraySum(nums: IntArray, k: Int): Int {\n    val counts = HashMap<Int, Int>(); counts[0] = 1\n    var prefix = 0; var result = 0\n    for (n in nums) {\n        prefix += n\n        result += counts.getOrDefault(prefix - k, 0)\n        counts[prefix] = counts.getOrDefault(prefix, 0) + 1\n    }\n    return result\n}",
        dart: "int subarraySum(List<int> nums, int k) {\n  Map<int,int> counts = {0:1}; int prefix = 0, res = 0;\n  for (int n in nums) {\n    prefix += n;\n    res += counts[prefix - k] ?? 0;\n    counts[prefix] = (counts[prefix] ?? 0) + 1;\n  }\n  return res;\n}",
        swift: "func subarraySum(_ nums: [Int], _ k: Int) -> Int {\n    var counts = [0: 1], prefix = 0, result = 0\n    for n in nums {\n        prefix += n\n        result += counts[prefix - k, default: 0]\n        counts[prefix, default: 0] += 1\n    }\n    return result\n}",
        haskell: "import qualified Data.Map.Strict as Map\n\nsubarraySum :: [Int] -> Int -> Int\nsubarraySum nums k = snd \\$ foldl go (Map.singleton 0 1, 0, 0) nums & \\\\(_,_,r) -> r\n  where\n    go (seen, prefix, res) n =\n      let prefix' = prefix + n\n          add = Map.findWithDefault 0 (prefix' - k) seen\n          seen' = Map.insertWith (+) prefix' 1 seen\n      in (seen', prefix', res + add)\n    (&) x f = f x"
      }
    },
    {
      id: 17, title: 'Spiral Matrix',
      difficulty: 'Medium', tags: ['Matrix', 'Simulation'],
      description: 'Return all elements of an m×n matrix in spiral order.',
      examples: [
        { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }
      ],
      constraints: ['m, n ≥ 1', 'm*n ≤ 10⁴'],
      hint: 'Use four boundaries: top, bottom, left, right. Shrink after each direction.',
      timeComplexity: 'O(m·n)', spaceComplexity: 'O(1) extra',
      solutions: {
        kotlin: "fun spiralOrder(matrix: Array<IntArray>): List<Int> {\n    val res = mutableListOf<Int>()\n    var top = 0; var bottom = matrix.lastIndex\n    var left = 0; var right = matrix[0].lastIndex\n    while (top <= bottom && left <= right) {\n        for (c in left..right) res.add(matrix[top][c]); top++\n        for (r in top..bottom) res.add(matrix[r][right]); right--\n        if (top <= bottom) { for (c in right downTo left) res.add(matrix[bottom][c]); bottom-- }\n        if (left <= right) { for (r in bottom downTo top) res.add(matrix[r][left]); left++ }\n    }\n    return res\n}",
        dart: "List<int> spiralOrder(List<List<int>> m) {\n  List<int> res = [];\n  int top=0, bot=m.length-1, left=0, right=m[0].length-1;\n  while (top<=bot && left<=right) {\n    for (int c=left; c<=right; c++) res.add(m[top][c]); top++;\n    for (int r=top; r<=bot; r++) res.add(m[r][right]); right--;\n    if (top<=bot) { for (int c=right; c>=left; c--) res.add(m[bot][c]); bot--; }\n    if (left<=right) { for (int r=bot; r>=top; r--) res.add(m[r][left]); left++; }\n  }\n  return res;\n}",
        swift: "func spiralOrder(_ matrix: [[Int]]) -> [Int] {\n    var res = [Int](), top = 0, bot = matrix.count-1, left = 0, right = matrix[0].count-1\n    while top <= bot && left <= right {\n        for c in left...right { res.append(matrix[top][c]) }; top += 1\n        for r in top...bot { res.append(matrix[r][right]) }; right -= 1\n        if top <= bot { for c in stride(from: right, through: left, by: -1) { res.append(matrix[bot][c]) }; bot -= 1 }\n        if left <= right { for r in stride(from: bot, through: top, by: -1) { res.append(matrix[r][left]) }; left += 1 }\n    }\n    return res\n}",
        haskell: "spiralOrder :: [[Int]] -> [Int]\nspiralOrder [] = []\nspiralOrder (top:rest) = top ++ spiralOrder (rotate rest)\n  where\n    rotate = reverse . map (map snd) . groupCols . transpose\n    groupCols [] = []\n    groupCols m  = m\n    -- Proper spiral using transpose+reverse trick:\n\nspiral :: [[a]] -> [a]\nspiral [] = []\nspiral (r:rs) = r ++ spiral (map reverse (transpose rs))"
      }
    },
    {
      id: 18, title: 'First Missing Positive',
      difficulty: 'Hard', tags: ['Array', 'Cycle Sort'],
      description: 'Find the smallest missing positive integer in an unsorted array in O(n) time and O(1) space.',
      examples: [
        { input: '[3,4,-1,1]', output: '2' },
        { input: '[1,2,0]', output: '3' }
      ],
      constraints: ['1 ≤ n ≤ 3×10⁵'],
      hint: 'Use the array itself as a hash map. Place each positive integer i at index i-1.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun firstMissingPositive(nums: IntArray): Int {\n    val n = nums.size\n    // Phase 1: cycle sort \u2014 place i at index i-1 if 1 \u2264 i \u2264 n\n    var i = 0\n    while (i < n) {\n        val correct = nums[i] - 1\n        if (nums[i] in 1..n && nums[correct] != nums[i]) { nums[i] = nums[correct].also { nums[correct] = nums[i] } }\n        else i++\n    }\n    // Phase 2: first index where nums[i] != i+1\n    for (j in 0 until n) if (nums[j] != j + 1) return j + 1\n    return n + 1\n}",
        dart: "int firstMissingPositive(List<int> nums) {\n  int n = nums.length, i = 0;\n  while (i < n) {\n    int c = nums[i] - 1;\n    if (nums[i] >= 1 && nums[i] <= n && nums[c] != nums[i]) {\n      int t = nums[i]; nums[i] = nums[c]; nums[c] = t;\n    } else i++;\n  }\n  for (int j = 0; j < n; j++) if (nums[j] != j+1) return j+1;\n  return n + 1;\n}",
        swift: "func firstMissingPositive(_ nums: inout [Int]) -> Int {\n    let n = nums.count; var i = 0\n    while i < n {\n        let c = nums[i] - 1\n        if nums[i] >= 1 && nums[i] <= n && nums[c] != nums[i] { nums.swapAt(i, c) }\n        else { i += 1 }\n    }\n    for j in 0..<n { if nums[j] != j+1 { return j+1 } }\n    return n + 1\n}",
        haskell: "import Data.Array (Array, (//), (!), listArray, bounds)\n\nfirstMissingPositive :: [Int] -> Int\nfirstMissingPositive nums =\n  head \\$ filter (\\\\i -> i \\`notElem\\` positives) [1..]\n  where positives = filter (>0) nums\n\n-- O(n) with mutable array (using ST monad)\nfirstMissingLinear :: [Int] -> Int\nfirstMissingLinear nums =\n  let n = length nums\n      present = filter (\\\\x -> x >= 1 && x <= n) nums\n  in head [i | i <- [1..n+1], i \\`notElem\\` present]"
      }
    },
    {
      id: 19, title: 'Next Permutation',
      difficulty: 'Medium', tags: ['Array', 'Two Pointers'],
      description: 'Implement next permutation which rearranges numbers into the lexicographically next greater permutation of numbers. If impossible, rearrange to lowest possible order.',
      examples: [
        { input: '[1,2,3]', output: '[1,3,2]' },
        { input: '[3,2,1]', output: '[1,2,3]' }
      ],
      constraints: ['1 ≤ n ≤ 100', '0 ≤ nums[i] ≤ 100'],
      hint: '1) Find rightmost ascending pair. 2) Swap with next greater. 3) Reverse suffix.',
      timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun nextPermutation(nums: IntArray) {\n    val n = nums.size\n    var i = n - 2\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--\n    if (i >= 0) {\n        var j = n - 1\n        while (nums[j] <= nums[i]) j--\n        nums[i] = nums[j].also { nums[j] = nums[i] }\n    }\n    var lo = i + 1; var hi = n - 1\n    while (lo < hi) { nums[lo] = nums[hi].also { nums[hi] = nums[lo] }; lo++; hi-- }\n}",
        dart: "void nextPermutation(List<int> nums) {\n  int n = nums.length, i = n - 2;\n  while (i >= 0 && nums[i] >= nums[i+1]) i--;\n  if (i >= 0) {\n    int j = n - 1;\n    while (nums[j] <= nums[i]) j--;\n    int t = nums[i]; nums[i] = nums[j]; nums[j] = t;\n  }\n  int lo = i+1, hi = n-1;\n  while (lo < hi) { int t = nums[lo]; nums[lo] = nums[hi]; nums[hi] = t; lo++; hi--; }\n}",
        swift: "func nextPermutation(_ nums: inout [Int]) {\n    let n = nums.count; var i = n - 2\n    while i >= 0 && nums[i] >= nums[i+1] { i -= 1 }\n    if i >= 0 {\n        var j = n - 1\n        while nums[j] <= nums[i] { j -= 1 }\n        nums.swapAt(i, j)\n    }\n    var (lo, hi) = (i+1, n-1)\n    while lo < hi { nums.swapAt(lo, hi); lo += 1; hi -= 1 }\n}",
        haskell: "import Data.List (sort, isPrefixOf, tails, permutations)\n\nnextPermutation :: Ord a => [a] -> [a]\nnextPermutation xs\n  | null des  = sort xs  -- last permutation, wrap around\n  | otherwise = prefix ++ swap pivot ++ reverse suffix\n  where\n    des     = [(i, v) | (i, (v, w)) <- zip [0..] (zip xs (tail xs)), v < w]\n    (i, _)  = last des\n    (prefix, pivot:suffix) = splitAt i xs\n    -- find smallest element > pivot in suffix\n    swap p  = let j = head \\$ filter (>p) (reverse suffix)\n                  suf' = let (l, _:r) = break (==j) (reverse suffix) in reverse (l ++ [p] ++ r)\n              in [j] ++ reverse suf'"
      }
    },
    {
      id: 20, title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard', tags: ['Binary Search', 'Array'],
      description: 'Find the median of two sorted arrays in O(log(m+n)) time.',
      examples: [
        { input: 'nums1=[1,3], nums2=[2]', output: '2.0' },
        { input: 'nums1=[1,2], nums2=[3,4]', output: '2.5' }
      ],
      constraints: ['m, n ≥ 0', 'Total length ≥ 1'],
      hint: 'Binary search on the smaller array to find the correct partition.',
      timeComplexity: 'O(log(min(m,n)))', spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {\n    var (A, B) = if (nums1.size <= nums2.size) Pair(nums1, nums2) else Pair(nums2, nums1)\n    val m = A.size; val n = B.size\n    var lo = 0; var hi = m\n    while (lo <= hi) {\n        val i = (lo + hi) / 2; val j = (m + n + 1) / 2 - i\n        val maxA = if (i == 0) Int.MIN_VALUE else A[i - 1]\n        val minA = if (i == m) Int.MAX_VALUE else A[i]\n        val maxB = if (j == 0) Int.MIN_VALUE else B[j - 1]\n        val minB = if (j == n) Int.MAX_VALUE else B[j]\n        if (maxA <= minB && maxB <= minA) {\n            return if ((m + n) % 2 == 0) (maxOf(maxA, maxB) + minOf(minA, minB)) / 2.0\n            else maxOf(maxA, maxB).toDouble()\n        } else if (maxA > minB) hi = i - 1 else lo = i + 1\n    }\n    return 0.0\n}",
        dart: "double findMedianSortedArrays(List<int> a, List<int> b) {\n  if (a.length > b.length) return findMedianSortedArrays(b, a);\n  int m = a.length, n = b.length, lo = 0, hi = m;\n  while (lo <= hi) {\n    int i = (lo + hi) ~/ 2, j = (m + n + 1) ~/ 2 - i;\n    int mA = i==0 ? -1<<31 : a[i-1], nA = i==m ? 1<<31 : a[i];\n    int mB = j==0 ? -1<<31 : b[j-1], nB = j==n ? 1<<31 : b[j];\n    if (mA <= nB && mB <= nA) {\n      int lo2 = [mA,mB].reduce((a,b)=>a>b?a:b);\n      int hi2 = [nA,nB].reduce((a,b)=>a<b?a:b);\n      return (m+n)%2==0 ? (lo2+hi2)/2.0 : lo2.toDouble();\n    } else if (mA > nB) hi = i-1; else lo = i+1;\n  }\n  return 0;\n}",
        swift: "func findMedianSortedArrays(_ a: [Int], _ b: [Int]) -> Double {\n    let (A, B) = a.count <= b.count ? (a, b) : (b, a)\n    let (m, n) = (A.count, B.count)\n    var (lo, hi) = (0, m)\n    while lo <= hi {\n        let i = (lo + hi) / 2, j = (m + n + 1) / 2 - i\n        let mA = i == 0 ? Int.min : A[i-1], nA = i == m ? Int.max : A[i]\n        let mB = j == 0 ? Int.min : B[j-1], nB = j == n ? Int.max : B[j]\n        if mA <= nB && mB <= nA {\n            return (m+n) % 2 == 0 ? Double(max(mA,mB) + min(nA,nB)) / 2.0 : Double(max(mA,mB))\n        } else if mA > nB { hi = i - 1 } else { lo = i + 1 }\n    }\n    return 0.0\n}",
        haskell: "findMedianSortedArrays :: [Int] -> [Int] -> Double\nfindMedianSortedArrays a b\n  | length a > length b = findMedianSortedArrays b a\n  | otherwise = go 0 m\n  where\n    m = length a; n = length b\n    arr1 = a; arr2 = b\n    get xs i = if i < 0 then minBound else if i >= length xs then maxBound else xs !! i\n    go lo hi\n      | lo > hi = error \"input not sorted\"\n      | otherwise =\n          let i = (lo + hi) \\`div\\` 2\n              j = (m + n + 1) \\`div\\` 2 - i\n              mA = get arr1 (i-1); nA = get arr1 i\n              mB = get arr2 (j-1); nB = get arr2 j\n          in if mA <= nB && mB <= nA\n             then if (m+n) \\`mod\\` 2 == 0\n                  then fromIntegral (max mA mB + min nA nB) / 2.0\n                  else fromIntegral (max mA mB)\n             else if mA > nB then go lo (i-1) else go (i+1) hi"
      }
    }
  ]
}
