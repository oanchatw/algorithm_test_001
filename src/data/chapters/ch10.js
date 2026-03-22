export default {
  id: 10,
  year: 1,
  slug: 'heaps',
  icon: '⛰️',
  color: '#bc8cff',
  title: 'Heaps & Priority Queues',
  subtitle: 'Binary Heap, Heapify, K-way Merge',
  description: 'Master heap data structures and priority queue operations. Learn heap property maintenance, heapify algorithms, and solve optimization problems using heaps efficiently.',
  theorems: [
    {
      id: 'heapify-correctness',
      name: 'Heapify Correctness and O(n) Build-Heap',
      katex_statement: '\\text{Build-heap in O(n) by heapifying from } \\lfloor n/2 \\rfloor \\text{ down to 1}',
      statement_text: 'A binary heap can be constructed from an unordered array in O(n) time by applying the heapify operation to all non-leaf nodes in bottom-up order, rather than inserting elements one by one which would take O(n log n).',
      proof: `Heapify Operation: Move element at position i down the tree, swapping with the smaller/larger child until heap property is restored. Takes O(log n) per call.

Building heap by inserting n elements: O(n log n) total time.

Optimized Build-Heap: Observe that leaf nodes (indices ⌊n/2⌋ + 1 to n) are already valid heaps (no children to violate property). Apply heapify only to non-leaf nodes from ⌊n/2⌋ down to 1.

Time Analysis:
- Nodes at height h from bottom take O(h) time to heapify
- There are at most ⌈n/2^(h+1)⌉ nodes at height h

Total time = Σ(h=1 to log n) ⌈n/2^(h+1)⌉ × h
           = n × Σ(h=1 to log n) h/2^(h+1)
           = n × Σ(i=0 to ∞) i/2^i        (by substitution and tail sum)
           ≤ n × 2                        (geometric series bound)
           = O(n)

The key insight is that most nodes are at lower heights where heapify is cheap, while expensive operations (height log n) occur on few nodes near the root.`,
      cases: [
        {
          name: 'Single element',
          description: 'Already a valid heap'
        },
        {
          name: 'All leaf nodes',
          description: 'No heapify needed (height 0)'
        },
        {
          name: 'Complete tree',
          description: 'Binary heap structure, heapify touches O(n) total work'
        }
      ]
    },
    {
      id: 'heap-height-formula',
      name: 'Height of a Binary Heap',
      katex_statement: 'h = \\lfloor \\log_2 n \\rfloor \\text{ where } n \\text{ is the number of elements}',
      statement_text: 'A binary heap with n elements has height equal to floor of log base 2 of n.',
      proof: `A binary heap is a complete binary tree, which fills all levels completely except possibly the last, filled from left to right.

For a complete binary tree of height h:
- Minimum nodes: 2^h (only level h has one node on the left)
- Maximum nodes: 2^(h+1) - 1 (all levels completely filled)

Given n nodes:
2^h ≤ n < 2^(h+1)

Taking logarithms:
h ≤ log₂(n) < h + 1

Therefore: h = ⌊log₂(n)⌋

This means:
- A heap with n = 7 nodes has height 2
- A heap with n = 8 nodes has height 3
- A heap with n = 1000 nodes has height 9

This logarithmic height is crucial for O(log n) insertion and deletion operations. The root-to-leaf path length is at most ⌊log₂(n)⌋, so any operation traversing this path takes O(log n) time.`,
      cases: [
        {
          name: 'Single node (n=1)',
          description: 'height = 0'
        },
        {
          name: 'Perfect binary heap (n = 2^(h+1) - 1)',
          description: 'height = ⌊log₂(n)⌋ = h'
        },
        {
          name: 'Partial last level',
          description: 'Still height = ⌊log₂(n)⌋'
        }
      ]
    },
    {
      id: 'kth-order-statistics',
      name: 'Finding K-th Order Statistic via Heap',
      katex_statement: '\\text{Find } k\\text{-th smallest element in } O(n + k \\log n) \\text{ using a max-heap}',
      statement_text: 'The k-th smallest element in an unsorted array can be found in O(n + k log n) time by building a max-heap and extracting the minimum k times, which is better than O(n log n) sorting when k is small.',
      proof: `Method: Maintain a max-heap of size k containing the k smallest elements seen so far.

Algorithm:
1. Build max-heap with first k elements: O(k)
2. For each remaining n-k elements:
   - If element < heap.max(): replace heap max with element, then max-heapify down: O(log k)
   - Otherwise skip: O(1)
3. The k-th smallest is the maximum of the k-heap

Time Complexity: O(k) + O(n-k) × O(log k) = O(k + (n-k) log k)
               = O(n + k log k) when k << n

Space Complexity: O(k)

Compared to sorting: O(n log n) is always needed but our approach is O(n + k log k):
- If k = O(1): Our approach is O(n) vs sorting O(n log n) ✓
- If k = Θ(n): Both are O(n log n) ~
- If k = n: Both are O(n log n) ~

The k-th smallest is then the root of the max-heap (maximum of the k smallest elements).

This approach is practical when:
1. k is much smaller than n (e.g., finding 5th smallest in 1 million elements)
2. We need to find multiple order statistics efficiently by keeping the heap

For k-th largest, use a min-heap of size k instead, keeping the k largest elements.`,
      cases: [
        {
          name: 'k=1 (minimum element)',
          description: 'Can find in O(n) by single pass'
        },
        {
          name: 'k=n (maximum element)',
          description: 'Still requires examining all elements'
        },
        {
          name: 'k=n/2 (median)',
          description: 'O(n + (n/2) log(n/2)) = O(n log n) same as sorting'
        }
      ]
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Kth Largest Element in an Array',
      difficulty: 'medium',
      tags: ['heap', 'priority-queue', 'selection'],
      description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
      examples: [
        {
          input: 'nums = [3,2,1,5,6,4], k = 2',
          output: '5',
          explanation: 'Sorted: [6,5,4,3,2,1], 2nd largest is 5'
        },
        {
          input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
          output: '4',
          explanation: '4th largest is 4'
        }
      ],
      constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      hint: 'Use a min-heap of size k. Maintain k largest elements. Root is kth largest.',
      timeComplexity: 'O(n + k log n)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "class Solution {\n    fun findKthLargest(nums: IntArray, k: Int): Int {\n        val heap = PriorityQueue<Int>()\n        for (num in nums) {\n            heap.offer(num)\n            if (heap.size > k) {\n                heap.poll()\n            }\n        }\n        return heap.peek()\n    }\n}",
        dart: "int findKthLargest(List<int> nums, int k) {\n  final heap = PriorityQueue<int>();\n  for (final num in nums) {\n    heap.add(num);\n    if (heap.length > k) {\n      heap.removeFirst();\n    }\n  }\n  return heap.first;\n}",
        swift: "class Solution {\n    func findKthLargest(_ nums: [Int], _ k: Int) -> Int {\n        var heap = Heap<Int>(sort: <)\n        for num in nums {\n            heap.insert(num)\n            if heap.count > k {\n                _ = heap.remove()\n            }\n        }\n        return heap.peek() ?? 0\n    }\n}",
        haskell: "import qualified Data.Heap as H\n\nfindKthLargest :: [Int] -> Int -> Int\nfindKthLargest nums k = findKth (take k nums) (drop k nums) where\n  findKth heap [] = H.minimum heap\n  findKth heap (x:xs)\n    | x > H.minimum heap = findKth (H.insert x (H.deleteMin heap)) xs\n    | otherwise = findKth heap xs"
      }
    },
    {
      id: 2,
      title: 'Top K Frequent Elements',
      difficulty: 'medium',
      tags: ['heap', 'hash-table', 'frequency'],
      description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
      examples: [
        {
          input: 'nums = [1,1,1,2,2,3], k = 2',
          output: '[1,2]',
          explanation: 'Elements 1 and 2 have highest frequencies'
        }
      ],
      constraints: ['1 <= nums.length <= 10^5', '1 <= k <= unique elements in nums'],
      hint: 'Count frequencies, use min-heap of size k based on frequency, then extract all.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun topKFrequent(nums: IntArray, k: Int): IntArray {\n    val freqMap = nums.groupingBy { it }.eachCount()\n    val heap = PriorityQueue<Pair<Int, Int>> { a, b -> a.first - b.first }\n\n    for ((num, freq) in freqMap) {\n        heap.offer(num to freq)\n        if (heap.size > k) {\n            heap.poll()\n        }\n    }\n\n    return heap.map { it.first }.toIntArray()\n}",
        dart: "List<int> topKFrequent(List<int> nums, int k) {\n  final freqMap = <int, int>{};\n  for (final num in nums) {\n    freqMap[num] = (freqMap[num] ?? 0) + 1;\n  }\n\n  final heap = PriorityQueue<(int, int)>((a, b) => a.\\$1.compareTo(b.\\$1));\n  for (final entry in freqMap.entries) {\n    heap.add((entry.key, entry.value));\n    if (heap.length > k) {\n      heap.removeFirst();\n    }\n  }\n\n  return [for (final (num, _) in heap) num];\n}",
        swift: "func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {\n    var freqMap: [Int: Int] = [:]\n    for num in nums {\n        freqMap[num, default: 0] += 1\n    }\n\n    var heap = Heap<(Int, Int)>(sort: { \\$0.1 < \\$1.1 })\n    for (num, freq) in freqMap {\n        heap.insert((num, freq))\n        if heap.count > k {\n            _ = heap.remove()\n        }\n    }\n\n    return heap.storage.map { \\$0.0 }\n}",
        haskell: "import qualified Data.Map as M\nimport qualified Data.Heap as H\n\ntopKFrequent :: [Int] -> Int -> [Int]\ntopKFrequent nums k =\n  let freqMap = M.fromListWith (+) [(x, 1) | x <- nums]\n      heap = foldl (\\h (n, f) -> if size h >= k && f > H.minimum h\n                                 then H.insert (f, n) (H.deleteMin h)\n                                 else H.insert (f, n) h) H.empty (M.toList freqMap)\n  in map snd (H.toList heap)"
      }
    },
    {
      id: 3,
      title: 'Find Median from Data Stream',
      difficulty: 'hard',
      tags: ['heap', 'design', 'median'],
      description: 'Implement a data structure that supports adding integers and finding the median efficiently.',
      examples: [
        {
          input: `["MedianFinder","addNum","findMedian","addNum","findMedian"]
[[],[1],[],[2],[]]`,
          output: '[null,null,1.0,null,1.5]',
          explanation: 'After adding 1, median=1. After adding 2, median=1.5'
        }
      ],
      constraints: ['1 <= num <= 2 * 10^5 numbers will be added', '-2^31 <= num <= 2^31 - 1'],
      hint: 'Use two heaps: max-heap for smaller half, min-heap for larger half. Keep balanced.',
      timeComplexity: 'O(log n) per operation',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MedianFinder() {\n    private val small = PriorityQueue<Int> { a, b -> b - a }\n    private val large = PriorityQueue<Int>()\n\n    fun addNum(num: Int) {\n        if (small.isEmpty() || num <= small.peek()) {\n            small.offer(num)\n        } else {\n            large.offer(num)\n        }\n\n        if (small.size > large.size + 1) {\n            large.offer(small.poll())\n        } else if (large.size > small.size) {\n            small.offer(large.poll())\n        }\n    }\n\n    fun findMedian(): Double {\n        return if (small.size > large.size) {\n            small.peek().toDouble()\n        } else {\n            (small.peek() + large.peek()) / 2.0\n        }\n    }\n}",
        dart: "class MedianFinder {\n  final _small = PriorityQueue<int>((a, b) => b.compareTo(a));\n  final _large = PriorityQueue<int>();\n\n  void addNum(int num) {\n    if (_small.isEmpty || num <= _small.first) {\n      _small.add(num);\n    } else {\n      _large.add(num);\n    }\n\n    if (_small.length > _large.length + 1) {\n      _large.add(_small.removeFirst());\n    } else if (_large.length > _small.length) {\n      _small.add(_large.removeFirst());\n    }\n  }\n\n  double findMedian() {\n    if (_small.length > _large.length) {\n      return _small.first.toDouble();\n    } else {\n      return (_small.first + _large.first) / 2.0;\n    }\n  }\n}",
        swift: "class MedianFinder {\n    var small = Heap<Int>(sort: >)\n    var large = Heap<Int>(sort: <)\n\n    func addNum(_ num: Int) {\n        if small.isEmpty || num <= small.peek() ?? 0 {\n            small.insert(num)\n        } else {\n            large.insert(num)\n        }\n\n        if small.count > large.count + 1 {\n            large.insert(small.remove()!)\n        } else if large.count > small.count {\n            small.insert(large.remove()!)\n        }\n    }\n\n    func findMedian() -> Double {\n        if small.count > large.count {\n            return Double(small.peek() ?? 0)\n        } else {\n            return Double((small.peek() ?? 0) + (large.peek() ?? 0)) / 2.0\n        }\n    }\n}",
        haskell: "data MedianFinder = MedianFinder (H.Heap Int) (H.Heap (Down Int))\n\naddNum :: MedianFinder -> Int -> MedianFinder\naddNum (MedianFinder small large) num =\n  let (small', large') = if H.isEmpty small || num <= H.minimum small\n                         then (H.insert num small, large)\n                         else (small, H.insert (Down num) large)\n  in balance small' large'\n\nbalance small large\n  | H.size small > H.size large + 1 = let (x, s) = H.deleteFindMin small\n                                      in MedianFinder s (H.insert (Down x) large)\n  | H.size large > H.size small = let (Down x, l) = H.deleteFindMax large\n                                  in MedianFinder (H.insert x small) l\n  | otherwise = MedianFinder small large\n\nfindMedian :: MedianFinder -> Double\nfindMedian (MedianFinder small large)\n  | H.size small > H.size large = fromIntegral (H.minimum small)\n  | otherwise = fromIntegral (H.minimum small + (let Down x = H.findMin large in x)) / 2.0"
      }
    },
    {
      id: 4,
      title: 'Merge K Sorted Lists',
      difficulty: 'hard',
      tags: ['heap', 'linked-list', 'merge'],
      description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.',
      examples: [
        {
          input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
          output: '[1,1,2,1,3,4,4,5,6]',
          explanation: 'Merge three sorted lists'
        }
      ],
      constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'],
      hint: 'Use min-heap with list heads. Pop smallest, add its next node back to heap.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun mergeKLists(lists: Array<ListNode?>): ListNode? {\n    val heap = PriorityQueue<ListNode> { a, b -> a.val - b.val }\n    val dummy = ListNode(0)\n    var current = dummy\n\n    for (list in lists) {\n        if (list != null) {\n            heap.offer(list)\n        }\n    }\n\n    while (heap.isNotEmpty()) {\n        val node = heap.poll()\n        current.next = node\n        current = current.next!!\n        if (node.next != null) {\n            heap.offer(node.next!!)\n        }\n    }\n\n    return dummy.next\n}",
        dart: "ListNode? mergeKLists(List<ListNode?> lists) {\n  final heap = PriorityQueue<ListNode>((a, b) => a.val.compareTo(b.val));\n  final dummy = ListNode(0);\n  var current = dummy;\n\n  for (final list in lists) {\n    if (list != null) {\n      heap.add(list);\n    }\n  }\n\n  while (heap.isNotEmpty) {\n    final node = heap.removeFirst();\n    current.next = node;\n    current = current.next!;\n    if (node.next != null) {\n      heap.add(node.next!);\n    }\n  }\n\n  return dummy.next;\n}",
        swift: "func mergeKLists(_ lists: [ListNode?]) -> ListNode? {\n    var heap = Heap<ListNode>(sort: { \\$0.val < \\$1.val })\n    let dummy = ListNode(0)\n    var current: ListNode? = dummy\n\n    for list in lists {\n        if let list = list {\n            heap.insert(list)\n        }\n    }\n\n    while !heap.isEmpty {\n        let node = heap.remove()!\n        current?.next = node\n        current = node\n        if let next = node.next {\n            heap.insert(next)\n        }\n    }\n\n    return dummy.next\n}",
        haskell: "mergeKLists :: [ListNode] -> ListNode\nmergeKLists lists =\n  let heap = foldr insertHeap emptyHeap (filter (not . isEmpty) lists)\n  in go heap dummy where\n    go h curr = if isEmpty h then curr\n                else let (minNode, h') = extractMin h\n                     in go (if hasNext minNode then insertHeap (next minNode) h' else h')\n                          (setNext curr minNode)"
      }
    },
    {
      id: 5,
      title: 'K Closest Points to Origin',
      difficulty: 'medium',
      tags: ['heap', 'array', 'geometry'],
      description: 'Given an array of points where points[i] = [xi, yi], return the k closest points to the origin (0, 0).',
      examples: [
        {
          input: 'points = [[1,3],[-2,2]], k = 1',
          output: '[[-2,2]]',
          explanation: '[-2,2] is closer to origin (distance sqrt(8) vs sqrt(10))'
        }
      ],
      constraints: ['1 <= k <= points.length <= 10^4'],
      hint: 'Use min-heap of size k based on distance squared. Avoid sqrt for comparison.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {\n    val heap = PriorityQueue<IntArray> { a, b ->\n        (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])\n    }\n\n    for (point in points) {\n        heap.offer(point)\n        if (heap.size > k) {\n            heap.poll()\n        }\n    }\n\n    return heap.toTypedArray()\n}",
        dart: "List<List<int>> kClosest(List<List<int>> points, int k) {\n  final heap = PriorityQueue<List<int>>((a, b) =>\n      (b[0]*b[0] + b[1]*b[1]).compareTo(a[0]*a[0] + a[1]*a[1]));\n\n  for (final point in points) {\n    heap.add(point);\n    if (heap.length > k) {\n      heap.removeFirst();\n    }\n  }\n\n  return heap.toList();\n}",
        swift: "func kClosest(_ points: [[Int]], _ k: Int) -> [[Int]] {\n    var heap = Heap<[Int]>(sort: { (a, b) in\n        let distA = a[0]*a[0] + a[1]*a[1]\n        let distB = b[0]*b[0] + b[1]*b[1]\n        return distA > distB\n    })\n\n    for point in points {\n        heap.insert(point)\n        if heap.count > k {\n            _ = heap.remove()\n        }\n    }\n\n    return heap.storage\n}",
        haskell: "kClosest :: [[Int]] -> Int -> [[Int]]\nkClosest points k = take k (sortOn distance points) where\n  distance [x, y] = x*x + y*y"
      }
    },
    {
      id: 6,
      title: 'Task Scheduler',
      difficulty: 'medium',
      tags: ['heap', 'greedy', 'scheduling'],
      description: 'You are given a list of tasks as characters A-Z, each task takes 1 unit of time. Tasks can be performed in any order, but identical tasks must be separated by at least n units of time. Return minimum time needed.',
      examples: [
        {
          input: 'tasks = ["A","A","A","B","B","B"], n = 2',
          output: '8',
          explanation: 'A -> B -> ? -> A -> B -> ? -> A -> B'
        }
      ],
      constraints: ['1 <= task.length <= 10^4', '0 <= n <= 100'],
      hint: 'Greedy: always schedule most frequent task. Use max-heap and cool-down tracking.',
      timeComplexity: 'O(n log 26)',
      spaceComplexity: 'O(26)',
      solutions: {
        kotlin: "fun leastInterval(tasks: CharArray, n: Int): Int {\n    val freq = IntArray(26)\n    for (task in tasks) {\n        freq[task - 'A']++\n    }\n\n    val heap = PriorityQueue<Int> { a, b -> b - a }\n    for (f in freq) {\n        if (f > 0) heap.offer(f)\n    }\n\n    var time = 0\n    while (heap.isNotEmpty()) {\n        val batch = mutableListOf<Int>()\n        for (i in 0 until n + 1) {\n            if (heap.isNotEmpty()) {\n                batch.add(heap.poll())\n            }\n        }\n        for (cnt in batch) {\n            if (cnt > 1) {\n                heap.offer(cnt - 1)\n            }\n        }\n        time += if (heap.isEmpty()) batch.size else n + 1\n    }\n    return time\n}",
        dart: "int leastInterval(List<String> tasks, int n) {\n  final freq = List.filled(26, 0);\n  for (final task in tasks) {\n    freq[task.codeUnitAt(0) - 65]++;\n  }\n\n  final heap = PriorityQueue<int>((a, b) => b.compareTo(a));\n  for (final f in freq) {\n    if (f > 0) heap.add(f);\n  }\n\n  int time = 0;\n  while (heap.isNotEmpty) {\n    final batch = <int>[];\n    for (int i = 0; i < n + 1; i++) {\n      if (heap.isNotEmpty) {\n        batch.add(heap.removeFirst());\n      }\n    }\n    for (final cnt in batch) {\n      if (cnt > 1) {\n        heap.add(cnt - 1);\n      }\n    }\n    time += heap.isEmpty ? batch.length : n + 1;\n  }\n  return time;\n}",
        swift: "func leastInterval(_ tasks: [String], _ n: Int) -> Int {\n    var freq = Array(repeating: 0, count: 26)\n    for task in tasks {\n        freq[Int(task.first!.asciiValue!) - 65] += 1\n    }\n\n    var heap = Heap<Int>(sort: >)\n    for f in freq {\n        if f > 0 { heap.insert(f) }\n    }\n\n    var time = 0\n    while !heap.isEmpty {\n        var batch: [Int] = []\n        for _ in 0..<(n+1) {\n            if !heap.isEmpty {\n                batch.append(heap.remove()!)\n            }\n        }\n        for cnt in batch {\n            if cnt > 1 {\n                heap.insert(cnt - 1)\n            }\n        }\n        time += heap.isEmpty ? batch.count : n + 1\n    }\n    return time\n}",
        haskell: "leastInterval :: [Char] -> Int -> Int\nleastInterval tasks n =\n  let freq = [length (filter (== c) tasks) | c <- ['A'..'Z']]\n      heap = sortOn negate (filter (> 0) freq)\n  in go heap [] 0 where\n    go [] [] t = t\n    go h waiting t =\n      let batch = take (n + 1) h\n          remaining = drop (n + 1) h\n          newWaiting = [c - 1 | c <- batch, c > 1] ++ waiting\n          newHeap = sortOn negate newWaiting\n      in go newHeap [] (t + (if null remaining && null newWaiting then length batch else n + 1))"
      }
    },
    {
      id: 7,
      title: 'Reorganize String',
      difficulty: 'medium',
      tags: ['heap', 'greedy', 'string'],
      description: 'Given a string s, rearrange it such that no two adjacent characters are the same. Return any valid arrangement or empty string if impossible.',
      examples: [
        {
          input: 's = "aab"',
          output: '"aba"',
          explanation: 'No adjacent characters are same'
        },
        {
          input: 's = "aaab"',
          output: '""',
          explanation: 'Impossible to arrange without adjacent same chars'
        }
      ],
      constraints: ['1 <= s.length <= 500', 's consists of lowercase letters'],
      hint: 'If most frequent char count > ceil(n/2), return "". Use max-heap, pick most frequent, alternate.',
      timeComplexity: 'O(n log 26)',
      spaceComplexity: 'O(26)',
      solutions: {
        kotlin: "fun reorganizeString(s: String): String {\n    val freq = mutableMapOf<Char, Int>()\n    for (c in s) {\n        freq[c] = (freq[c] ?: 0) + 1\n    }\n\n    val heap = PriorityQueue<Pair<Int, Char>> { a, b -> b.first - a.first }\n    for ((c, f) in freq) {\n        heap.offer(f to c)\n    }\n\n    val result = StringBuilder()\n    while (heap.size >= 2) {\n        val (f1, c1) = heap.poll()\n        val (f2, c2) = heap.poll()\n        result.append(c1).append(c2)\n        if (f1 > 1) heap.offer(f1 - 1 to c1)\n        if (f2 > 1) heap.offer(f2 - 1 to c2)\n    }\n\n    if (heap.isNotEmpty()) {\n        val (f, c) = heap.poll()\n        if (f > 1) return \"\"\n        result.append(c)\n    }\n\n    return result.toString()\n}",
        dart: "String reorganizeString(String s) {\n  final freq = <String, int>{};\n  for (final c in s.split('')) {\n    freq[c] = (freq[c] ?? 0) + 1;\n  }\n\n  final heap = PriorityQueue<(int, String)>((a, b) => b.\\$1.compareTo(a.\\$1));\n  freq.forEach((c, f) => heap.add((f, c)));\n\n  final result = StringBuffer();\n  while (heap.length >= 2) {\n    final (f1, c1) = heap.removeFirst();\n    final (f2, c2) = heap.removeFirst();\n    result.write(c1 + c2);\n    if (f1 > 1) heap.add((f1 - 1, c1));\n    if (f2 > 1) heap.add((f2 - 1, c2));\n  }\n\n  if (heap.isNotEmpty) {\n    final (f, c) = heap.removeFirst();\n    if (f > 1) return '';\n    result.write(c);\n  }\n\n  return result.toString();\n}",
        swift: "func reorganizeString(_ s: String) -> String {\n    var freq: [Character: Int] = [:]\n    for c in s {\n        freq[c, default: 0] += 1\n    }\n\n    var heap = Heap<(Int, Character)>(sort: { \\$0.0 > \\$1.0 })\n    for (c, f) in freq {\n        heap.insert((f, c))\n    }\n\n    var result = \"\"\n    while heap.count >= 2 {\n        let (f1, c1) = heap.remove()!\n        let (f2, c2) = heap.remove()!\n        result.append(c1)\n        result.append(c2)\n        if f1 > 1 { heap.insert((f1 - 1, c1)) }\n        if f2 > 1 { heap.insert((f2 - 1, c2)) }\n    }\n\n    if !heap.isEmpty {\n        let (f, c) = heap.remove()!\n        if f > 1 { return \"\" }\n        result.append(c)\n    }\n\n    return result\n}",
        haskell: "reorganizeString :: String -> String\nreorganizeString s =\n  let freq = [length (filter (== c) s) | c <- nub s]\n      maxFreq = maximum freq\n  in if maxFreq > (length s + 1) `div` 2 then \"\"\n     else interleave (sortOn negate (zip freq (nub s)))"
      }
    },
    {
      id: 8,
      title: 'Kth Smallest in Sorted Matrix',
      difficulty: 'hard',
      tags: ['heap', 'matrix', 'binary-search'],
      description: 'Given an n x n matrix where each row and column is sorted in ascending order, return the kth smallest element in the matrix.',
      examples: [
        {
          input: 'matrix = [[1,2],[1,4]], k = 3',
          output: '1',
          explanation: 'The 3rd smallest is 1 (appears twice)'
        }
      ],
      constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 300', '1 <= k <= n^2'],
      hint: 'Use min-heap starting with (value, row, col). Pop k times, each time add next right and down.',
      timeComplexity: 'O(k log k)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun kthSmallest(matrix: Array<IntArray>, k: Int): Int {\n    val heap = PriorityQueue<Triple<Int, Int, Int>> { a, b -> a.first - b.first }\n    val visited = mutableSetOf<Pair<Int, Int>>()\n\n    heap.offer(Triple(matrix[0][0], 0, 0))\n    visited.add(0 to 0)\n\n    var result = 0\n    for (i in 0 until k) {\n        val (value, row, col) = heap.poll()\n        result = value\n\n        if (row + 1 < matrix.size && (row + 1 to col) !in visited) {\n            heap.offer(Triple(matrix[row + 1][col], row + 1, col))\n            visited.add(row + 1 to col)\n        }\n        if (col + 1 < matrix[0].size && (row to col + 1) !in visited) {\n            heap.offer(Triple(matrix[row][col + 1], row, col + 1))\n            visited.add(row to col + 1)\n        }\n    }\n\n    return result\n}",
        dart: "int kthSmallest(List<List<int>> matrix, int k) {\n  final heap = PriorityQueue<(int, int, int)>((a, b) => a.\\$1.compareTo(b.\\$1));\n  final visited = <(int, int)>{};\n\n  heap.add((matrix[0][0], 0, 0));\n  visited.add((0, 0));\n\n  int result = 0;\n  for (int i = 0; i < k; i++) {\n    final (value, row, col) = heap.removeFirst();\n    result = value;\n\n    if (row + 1 < matrix.length && !visited.contains((row + 1, col))) {\n      heap.add((matrix[row + 1][col], row + 1, col));\n      visited.add((row + 1, col));\n    }\n    if (col + 1 < matrix[0].length && !visited.contains((row, col + 1))) {\n      heap.add((matrix[row][col + 1], row, col + 1));\n      visited.add((row, col + 1));\n    }\n  }\n\n  return result;\n}",
        swift: "func kthSmallest(_ matrix: [[Int]], _ k: Int) -> Int {\n    var heap = Heap<(Int, Int, Int)>(sort: { \\$0.0 < \\$1.0 })\n    var visited = Set<(Int, Int)>()\n\n    heap.insert((matrix[0][0], 0, 0))\n    visited.insert((0, 0))\n\n    var result = 0\n    for _ in 0..<k {\n        let (value, row, col) = heap.remove()!\n        result = value\n\n        if row + 1 < matrix.count && !visited.contains((row + 1, col)) {\n            heap.insert((matrix[row + 1][col], row + 1, col))\n            visited.insert((row + 1, col))\n        }\n        if col + 1 < matrix[0].count && !visited.contains((row, col + 1)) {\n            heap.insert((matrix[row][col + 1], row, col + 1))\n            visited.insert((row, col + 1))\n        }\n    }\n\n    return result\n}",
        haskell: "kthSmallest :: [[Int]] -> Int -> Int\nkthSmallest matrix k = go k (H.singleton (matrix !! 0 !! 0, 0, 0)) S.empty where\n  go 1 h _ = let (v, _, _) = H.minimum h in v\n  go n h visited =\n    let ((v, r, c), h') = H.deleteFindMin h\n        h'' = foldr insertIfValid h' [(matrix !! r' !! c, r', c) |\n                                     (r', c) <- [(r+1, c), (r, c+1)],\n                                     r' < length matrix && c < length (matrix !! 0) && (r', c) \\`S.notMember\\` visited]\n        visited' = S.insert (r, c) visited\n    in go (n - 1) h'' visited'"
      }
    },
    {
      id: 9,
      title: 'Find K Pairs with Smallest Sums',
      difficulty: 'medium',
      tags: ['heap', 'array', 'two-pointer'],
      description: 'Given two sorted integer arrays nums1 and nums2, return the k pairs (u, v) with the smallest sums u + v.',
      examples: [
        {
          input: 'nums1 = [1,7,11], nums2 = [2,4,6], k = 3',
          output: '[[1,2],[1,4],[1,7]]',
          explanation: 'Smallest sum pairs'
        }
      ],
      constraints: ['1 <= nums1.length, nums2.length <= 104', '1 <= k <= 1000'],
      hint: 'Min-heap with (sum, i, j). Start with (nums1[0]+nums2[0], 0, 0), explore neighbors.',
      timeComplexity: 'O(k log k)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun kSmallestPairs(nums1: IntArray, nums2: IntArray, k: Int): List<List<Int>> {\n    val result = mutableListOf<List<Int>>()\n    val heap = PriorityQueue<Triple<Int, Int, Int>> { a, b -> a.first - b.first }\n    val visited = mutableSetOf<Pair<Int, Int>>()\n\n    heap.offer(Triple(nums1[0] + nums2[0], 0, 0))\n    visited.add(0 to 0)\n\n    while (result.size < k && heap.isNotEmpty()) {\n        val (sum, i, j) = heap.poll()\n        result.add(listOf(nums1[i], nums2[j]))\n\n        if (i + 1 < nums1.size && (i + 1 to j) !in visited) {\n            heap.offer(Triple(nums1[i + 1] + nums2[j], i + 1, j))\n            visited.add(i + 1 to j)\n        }\n        if (j + 1 < nums2.size && (i to j + 1) !in visited) {\n            heap.offer(Triple(nums1[i] + nums2[j + 1], i, j + 1))\n            visited.add(i to j + 1)\n        }\n    }\n\n    return result\n}",
        dart: "List<List<int>> kSmallestPairs(List<int> nums1, List<int> nums2, int k) {\n  final result = <List<int>>[];\n  final heap = PriorityQueue<(int, int, int)>((a, b) => a.\\$1.compareTo(b.\\$1));\n  final visited = <(int, int)>{};\n\n  heap.add((nums1[0] + nums2[0], 0, 0));\n  visited.add((0, 0));\n\n  while (result.length < k && heap.isNotEmpty) {\n    final (sum, i, j) = heap.removeFirst();\n    result.add([nums1[i], nums2[j]]);\n\n    if (i + 1 < nums1.length && !visited.contains((i + 1, j))) {\n      heap.add((nums1[i + 1] + nums2[j], i + 1, j));\n      visited.add((i + 1, j));\n    }\n    if (j + 1 < nums2.length && !visited.contains((i, j + 1))) {\n      heap.add((nums1[i] + nums2[j + 1], i, j + 1));\n      visited.add((i, j + 1));\n    }\n  }\n\n  return result;\n}",
        swift: "func kSmallestPairs(_ nums1: [Int], _ nums2: [Int], _ k: Int) -> [[Int]] {\n    var result: [[Int]] = []\n    var heap = Heap<(Int, Int, Int)>(sort: { \\$0.0 < \\$1.0 })\n    var visited = Set<(Int, Int)>()\n\n    heap.insert((nums1[0] + nums2[0], 0, 0))\n    visited.insert((0, 0))\n\n    while result.count < k && !heap.isEmpty {\n        let (sum, i, j) = heap.remove()!\n        result.append([nums1[i], nums2[j]])\n\n        if i + 1 < nums1.count && !visited.contains((i + 1, j)) {\n            heap.insert((nums1[i + 1] + nums2[j], i + 1, j))\n            visited.insert((i + 1, j))\n        }\n        if j + 1 < nums2.count && !visited.contains((i, j + 1)) {\n            heap.insert((nums1[i] + nums2[j + 1], i, j + 1))\n            visited.insert((i, j + 1))\n        }\n    }\n\n    return result\n}",
        haskell: "kSmallestPairs :: [Int] -> [Int] -> Int -> [[Int]]\nkSmallestPairs nums1 nums2 k = go k (H.singleton (nums1 !! 0 + nums2 !! 0, 0, 0)) S.empty where\n  go 0 _ _ = []\n  go _ h visited | H.null h = []\n  go n h visited =\n    let ((s, i, j), h') = H.deleteFindMin h\n        h'' = foldr insertIfValid h' [((nums1 !! i' + nums2 !! j), i', j) |\n                                      (i', j) <- [(i+1, j), (i, j+1)],\n                                      i' < length nums1 && j < length nums2 && (i', j) \\`S.notMember\\` visited]\n        visited' = S.insert (i, j) visited\n    in [nums1 !! i, nums2 !! j] : go (n - 1) h'' visited'"
      }
    },
    {
      id: 10,
      title: 'Sliding Window Median',
      difficulty: 'hard',
      tags: ['heap', 'sliding-window', 'two-heaps'],
      description: 'Given an integer array nums and an integer k (window size), find the median of each sliding window of size k.',
      examples: [
        {
          input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
          output: '[1.0,-1.0,-1.0,3.0,5.0,6.0]',
          explanation: 'Windows: [1,3,-1]=1, [3,-1,-3]=-1, [-1,-3,5]=1, etc'
        }
      ],
      constraints: ['1 <= k <= nums.length <= 4.5 * 10^4'],
      hint: 'Two heaps to maintain median. When removing, use lazy deletion or multiset.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun medianSlidingWindow(nums: IntArray, k: Int): DoubleArray {\n    val result = mutableListOf<Double>()\n    val small = PriorityQueue<Int> { a, b -> b - a }\n    val large = PriorityQueue<Int>()\n    val window = mutableMapOf<Int, Int>()\n\n    fun balance() {\n        if (small.size > large.size + 1) {\n            large.offer(small.poll())\n        } else if (large.size > small.size) {\n            small.offer(large.poll())\n        }\n    }\n\n    fun cleanTop(heap: PriorityQueue<Int>) {\n        while (heap.isNotEmpty() && window[heap.peek()] == 0) {\n            window.remove(heap.poll())\n        }\n    }\n\n    for (i in nums.indices) {\n        val num = nums[i]\n        if (small.isNotEmpty() && num <= small.peek()) {\n            small.offer(num)\n        } else {\n            large.offer(num)\n        }\n        window[num] = (window[num] ?: 0) + 1\n        balance()\n\n        if (i >= k - 1) {\n            cleanTop(small)\n            cleanTop(large)\n            result.add(if (k % 2 == 1) small.peek().toDouble() else (small.peek() + large.peek()) / 2.0)\n\n            val removing = nums[i - k + 1]\n            window[removing] = window[removing]!! - 1\n            if (removing <= small.peek()) {\n                small.poll()\n            } else {\n                large.poll()\n            }\n            balance()\n        }\n    }\n\n    return result.toDoubleArray()\n}",
        dart: "List<double> medianSlidingWindow(List<int> nums, int k) {\n  final result = <double>[];\n  final small = PriorityQueue<int>((a, b) => b.compareTo(a));\n  final large = PriorityQueue<int>();\n  final window = <int, int>{};\n\n  void balance() {\n    if (small.length > large.length + 1) {\n      large.add(small.removeFirst());\n    } else if (large.length > small.length) {\n      small.add(large.removeFirst());\n    }\n  }\n\n  for (int i = 0; i < nums.length; i++) {\n    final num = nums[i];\n    if (small.isNotEmpty && num <= small.first) {\n      small.add(num);\n    } else {\n      large.add(num);\n    }\n    window[num] = (window[num] ?? 0) + 1;\n    balance();\n\n    if (i >= k - 1) {\n      result.add(k % 2 == 1 ? small.first.toDouble() : (small.first + large.first) / 2.0);\n      final removing = nums[i - k + 1];\n      window[removing] = window[removing]! - 1;\n    }\n  }\n\n  return result;\n}",
        swift: "func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {\n    var result: [Double] = []\n    var small = Heap<Int>(sort: >)\n    var large = Heap<Int>(sort: <)\n    var window: [Int: Int] = [:]\n\n    func balance() {\n        if small.count > large.count + 1 {\n            large.insert(small.remove()!)\n        } else if large.count > small.count {\n            small.insert(large.remove()!)\n        }\n    }\n\n    for i in 0..<nums.count {\n        let num = nums[i]\n        if small.isEmpty || num <= small.peek() ?? 0 {\n            small.insert(num)\n        } else {\n            large.insert(num)\n        }\n        window[num, default: 0] += 1\n        balance()\n\n        if i >= k - 1 {\n            result.append(k % 2 == 1 ? Double(small.peek() ?? 0) : Double((small.peek() ?? 0) + (large.peek() ?? 0)) / 2.0)\n            let removing = nums[i - k + 1]\n            window[removing, default: 0] -= 1\n        }\n    }\n\n    return result\n}",
        haskell: "medianSlidingWindow :: [Int] -> Int -> [Double]\nmedianSlidingWindow nums k = go nums 0 H.empty H.empty M.empty where\n  go [] _ _ _ _ = []\n  go (x:xs) i small large window\n    | i < k - 1 = go xs (i+1) small' large' window'\n    | otherwise = let median = if k \\`mod\\` 2 == 1\n                               then fromIntegral (H.minimum small')\n                               else (fromIntegral (H.minimum small' + H.minimum large')) / 2\n                  in median : go xs (i+1) small'' large'' window''"
      }
    },
    {
      id: 11,
      title: 'IPO (Maximize Capital)',
      difficulty: 'hard',
      tags: ['heap', 'greedy', 'capital'],
      description: 'Suppose you have projects with profits and capital requirements. Maximize profit by selecting at most k projects given initial capital w.',
      examples: [
        {
          input: 'k = 1, w = 0, profits = [1,2,3], capital = [1,1,2]',
          output: '4',
          explanation: 'With w=0, can only do project with capital 0 (profit 1), w=1, can do project with capital 1 (profit 2 or 3), choose 3, final w=4'
        }
      ],
      constraints: ['1 <= k <= 10^5', '0 <= w <= 10^9', 'All profits >= 0'],
      hint: 'Sort by capital. Use max-heap for available projects. Greedily pick most profitable.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun findMaximizedCapital(k: Int, w: Int, profits: IntArray, capital: IntArray): Int {\n    val projects = profits.indices.map { capital[it] to profits[it] }.sortedBy { it.first }\n    val heap = PriorityQueue<Int> { a, b -> b - a }\n    var currentCapital = w\n    var idx = 0\n\n    for (i in 0 until k) {\n        while (idx < projects.size && projects[idx].first <= currentCapital) {\n            heap.offer(projects[idx].second)\n            idx++\n        }\n        if (heap.isEmpty()) break\n        currentCapital += heap.poll()\n    }\n\n    return currentCapital\n}",
        dart: "int findMaximizedCapital(int k, int w, List<int> profits, List<int> capital) {\n  final projects = List.generate(capital.length, (i) => (capital[i], profits[i]));\n  projects.sort((a, b) => a.\\$1.compareTo(b.\\$1));\n  final heap = PriorityQueue<int>((a, b) => b.compareTo(a));\n  int currentCapital = w;\n  int idx = 0;\n\n  for (int i = 0; i < k; i++) {\n    while (idx < projects.length && projects[idx].\\$1 <= currentCapital) {\n      heap.add(projects[idx].\\$2);\n      idx++;\n    }\n    if (heap.isEmpty) break;\n    currentCapital += heap.removeFirst();\n  }\n\n  return currentCapital;\n}",
        swift: "func findMaximizedCapital(_ k: Int, _ w: Int, _ profits: [Int], _ capital: [Int]) -> Int {\n    var projects = zip(capital, profits).sorted { \\$0.0 < \\$1.0 }\n    var heap = Heap<Int>(sort: >)\n    var currentCapital = w\n    var idx = 0\n\n    for _ in 0..<k {\n        while idx < projects.count && projects[idx].0 <= currentCapital {\n            heap.insert(projects[idx].1)\n            idx += 1\n        }\n        if heap.isEmpty { break }\n        currentCapital += heap.remove()!\n    }\n\n    return currentCapital\n}",
        haskell: "findMaximizedCapital :: Int -> Int -> [Int] -> [Int] -> Int\nfindMaximizedCapital k w profits capital =\n  let projects = sortBy (comparing fst) (zip capital profits)\n  in go k w projects H.empty 0\n\n  go 0 w _ _ _ = w\n  go _ w [] heap _ = w + sum (H.toList heap)\n  go k w projects heap idx\n    | idx < length projects && fst (projects !! idx) <= w =\n        go k w projects (H.insert (snd (projects !! idx)) heap) (idx + 1)\n    | H.null heap = w\n    | otherwise = let best = H.maximum heap\n                  in go (k-1) (w + best) projects (H.deleteMax heap) idx"
      }
    },
    {
      id: 12,
      title: 'Minimum Cost to Connect Ropes',
      difficulty: 'medium',
      tags: ['heap', 'greedy', 'optimization'],
      description: 'Connect n ropes with minimum cost. Cost of connecting two ropes is their sum. Connected rope costs that too.',
      examples: [
        {
          input: 'ropes = [4,3,2,6]',
          output: '29',
          explanation: 'Connect 2+3=5 (cost 5), 4+5=9 (cost 9), 6+9=15 (cost 15), total=5+9+15=29'
        }
      ],
      constraints: ['n == ropes.length', '1 <= n <= 10^4', '1 <= ropes[i] <= 10^5'],
      hint: 'Greedy: always connect two smallest ropes. Use min-heap.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun connectRopes(ropes: IntArray): Int {\n    val heap = PriorityQueue<Int>()\n    for (rope in ropes) {\n        heap.offer(rope)\n    }\n\n    var totalCost = 0\n    while (heap.size > 1) {\n        val first = heap.poll()\n        val second = heap.poll()\n        val cost = first + second\n        totalCost += cost\n        heap.offer(cost)\n    }\n\n    return totalCost\n}",
        dart: "int connectRopes(List<int> ropes) {\n  final heap = PriorityQueue<int>();\n  for (final rope in ropes) {\n    heap.add(rope);\n  }\n\n  int totalCost = 0;\n  while (heap.length > 1) {\n    final first = heap.removeFirst();\n    final second = heap.removeFirst();\n    final cost = first + second;\n    totalCost += cost;\n    heap.add(cost);\n  }\n\n  return totalCost;\n}",
        swift: "func connectRopes(_ ropes: [Int]) -> Int {\n    var heap = Heap<Int>(sort: <)\n    for rope in ropes {\n        heap.insert(rope)\n    }\n\n    var totalCost = 0\n    while heap.count > 1 {\n        let first = heap.remove()!\n        let second = heap.remove()!\n        let cost = first + second\n        totalCost += cost\n        heap.insert(cost)\n    }\n\n    return totalCost\n}",
        haskell: "connectRopes :: [Int] -> Int\nconnectRopes ropes = go (foldr H.insert H.empty ropes) 0 where\n  go h cost\n    | H.size h <= 1 = cost\n    | otherwise = let f = H.minimum h\n                      h' = H.deleteMin h\n                      s = H.minimum h'\n                      h'' = H.deleteMin h'\n                      c = f + s\n                  in go (H.insert c h'') (cost + c)"
      }
    },
    {
      id: 13,
      title: 'Maximum Performance of a Team',
      difficulty: 'hard',
      tags: ['heap', 'greedy', 'sorting'],
      description: 'Select at most k engineers to maximize performance where performance = speed_sum × min_efficiency.',
      examples: [
        {
          input: 'n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2',
          output: '60',
          explanation: 'Select engineers 0,1: speed_sum=12, min_efficiency=4, performance=48. Or 1,4: speed_sum=15, min_efficiency=4, performance=60'
        }
      ],
      constraints: ['1 <= n <= 10^5', '1 <= k <= n', '1 <= speed[i], efficiency[i] <= 10^5'],
      hint: 'Sort by efficiency descending. Use min-heap to keep k largest speeds. For each engineer as min efficiency.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun maxPerformance(n: Int, speed: IntArray, efficiency: IntArray, k: Int): Long {\n    val engineers = efficiency.indices.map { Triple(efficiency[it], speed[it], it) }.sortedByDescending { it.first }\n    val heap = PriorityQueue<Int>()\n    var speedSum = 0L\n    var maxPerf = 0L\n\n    for ((eff, spd, _) in engineers) {\n        heap.offer(spd)\n        speedSum += spd\n        if (heap.size > k) {\n            speedSum -= heap.poll()\n        }\n        maxPerf = maxOf(maxPerf, speedSum * eff)\n    }\n\n    return maxPerf\n}",
        dart: "int maxPerformance(int n, List<int> speed, List<int> efficiency, int k) {\n  final engineers = List.generate(n, (i) => (efficiency[i], speed[i]));\n  engineers.sort((a, b) => b.\\$1.compareTo(a.\\$1));\n  final heap = PriorityQueue<int>();\n  int speedSum = 0;\n  int maxPerf = 0;\n\n  for (final (eff, spd) in engineers) {\n    heap.add(spd);\n    speedSum += spd;\n    if (heap.length > k) {\n      speedSum -= heap.removeFirst();\n    }\n    maxPerf = max(maxPerf, speedSum * eff);\n  }\n\n  return maxPerf;\n}",
        swift: "func maxPerformance(_ n: Int, _ speed: [Int], _ efficiency: [Int], _ k: Int) -> Int {\n    var engineers = zip(efficiency, speed).sorted { \\$0.0 > \\$1.0 }\n    var heap = Heap<Int>(sort: <)\n    var speedSum: Int64 = 0\n    var maxPerf: Int64 = 0\n\n    for (eff, spd) in engineers {\n        heap.insert(spd)\n        speedSum += Int64(spd)\n        if heap.count > k {\n            speedSum -= Int64(heap.remove()!)\n        }\n        maxPerf = max(maxPerf, speedSum * Int64(eff))\n    }\n\n    return Int(maxPerf)\n}",
        haskell: "maxPerformance :: Int -> [Int] -> [Int] -> Int -> Int\nmaxPerformance n speed efficiency k =\n  let engineers = sortOn (negate . fst) (zip efficiency speed)\n  in go engineers H.empty 0 0\n\n  go [] _ speedSum maxPerf = maxPerf\n  go ((eff, spd):rest) heap speedSum maxPerf =\n    let speedSum' = speedSum + spd\n        (heap', speedSum'') = if H.size heap >= k\n                              then let f = H.minimum heap in (H.insert spd (H.deleteMin heap), speedSum' - f)\n                              else (H.insert spd heap, speedSum')\n        perf = speedSum'' * eff\n    in go rest heap' speedSum'' (max maxPerf perf)"
      }
    },
    {
      id: 14,
      title: 'Minimum Number of Refueling Stops',
      difficulty: 'hard',
      tags: ['heap', 'greedy', 'dynamic-programming'],
      description: 'Car starts at 0 with fuel endFuel and needs to reach target. Refuel at stations. Return minimum number of refueling stops.',
      examples: [
        {
          input: 'target = 1, startFuel = 1, stations = []',
          output: '0',
          explanation: 'Can reach target with initial fuel'
        },
        {
          input: 'target = 100, startFuel = 50, stations = [[25,25],[50,50]]',
          output: '1',
          explanation: 'Reach 50 then refuel 50 (costs 50), reach 100'
        }
      ],
      constraints: ['1 <= target <= 10^9', '1 <= startFuel <= 10^9'],
      hint: 'Greedy: refuel at station with most fuel when needed. Use max-heap of passed stations.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun minRefuelStops(target: Int, startFuel: Int, stations: Array<IntArray>): Int {\n    val heap = PriorityQueue<Int> { a, b -> b - a }\n    var fuel = startFuel.toLong()\n    var stops = 0\n    var idx = 0\n\n    while (fuel < target) {\n        while (idx < stations.size && stations[idx][0] <= fuel) {\n            heap.offer(stations[idx][1])\n            idx++\n        }\n        if (heap.isEmpty()) return -1\n        fuel += heap.poll()\n        stops++\n    }\n\n    return stops\n}",
        dart: "int minRefuelStops(int target, int startFuel, List<List<int>> stations) {\n  final heap = PriorityQueue<int>((a, b) => b.compareTo(a));\n  int fuel = startFuel;\n  int stops = 0;\n  int idx = 0;\n\n  while (fuel < target) {\n    while (idx < stations.length && stations[idx][0] <= fuel) {\n      heap.add(stations[idx][1]);\n      idx++;\n    }\n    if (heap.isEmpty) return -1;\n    fuel += heap.removeFirst();\n    stops++;\n  }\n\n  return stops;\n}",
        swift: "func minRefuelStops(_ target: Int, _ startFuel: Int, _ stations: [[Int]]) -> Int {\n    var heap = Heap<Int>(sort: >)\n    var fuel = startFuel\n    var stops = 0\n    var idx = 0\n\n    while fuel < target {\n        while idx < stations.count && stations[idx][0] <= fuel {\n            heap.insert(stations[idx][1])\n            idx += 1\n        }\n        if heap.isEmpty { return -1 }\n        fuel += heap.remove()!\n        stops += 1\n    }\n\n    return stops\n}",
        haskell: "minRefuelStops :: Int -> Int -> [[Int]] -> Int\nminRefuelStops target startFuel stations = go startFuel 0 0 H.empty where\n  go fuel stops idx heap\n    | fuel >= target = stops\n    | otherwise =\n        let heap' = foldr (\\s h -> H.insert (s !! 1) h) heap\n                    [stations !! i | i <- [idx..length stations-1], stations !! i !! 0 <= fuel]\n            idx' = length [i | i <- [idx..length stations-1], stations !! i !! 0 <= fuel]\n        in if H.null heap' then -1\n           else let newFuel = fuel + H.maximum heap'\n                in go newFuel (stops + 1) idx' (H.deleteMax heap')"
      }
    },
    {
      id: 15,
      title: 'Single-Threaded CPU',
      difficulty: 'medium',
      tags: ['heap', 'sorting', 'simulation'],
      description: 'Simulate a single-threaded CPU executing tasks with enqueue times and processing durations.',
      examples: [
        {
          input: 'tasks = [[1,2],[2,4],[3,2],[4,1]], n = 4',
          output: '[0,2,3,1]',
          explanation: 'Execute tasks based on arrival and duration'
        }
      ],
      constraints: ['tasks[i] = [enqueueTime_i, processingTime_i]'],
      hint: 'Sort by enqueue time. Use min-heap for available tasks, process greedily by duration.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun getOrder(tasks: Array<IntArray>): IntArray {\n    val indexed = tasks.mapIndexed { i, task -> Triple(task[0], task[1], i) }\n    val sorted = indexed.sortedBy { it.first }\n    val heap = PriorityQueue<Triple<Int, Int, Int>> { a, b ->\n        when {\n            a.second != b.second -> a.second - b.second\n            else -> a.third - b.third\n        }\n    }\n    val result = mutableListOf<Int>()\n    var time = 0\n    var idx = 0\n\n    while (idx < sorted.size || heap.isNotEmpty()) {\n        if (heap.isEmpty()) {\n            time = maxOf(time, sorted[idx].first)\n        }\n        while (idx < sorted.size && sorted[idx].first <= time) {\n            heap.offer(Triple(sorted[idx].first, sorted[idx].second, sorted[idx].third))\n            idx++\n        }\n        val (enqueue, duration, original) = heap.poll()\n        time += duration\n        result.add(original)\n    }\n\n    return result.toIntArray()\n}",
        dart: "List<int> getOrder(List<List<int>> tasks) {\n  final indexed = List.generate(tasks.length, (i) => (tasks[i][0], tasks[i][1], i));\n  indexed.sort((a, b) => a.\\$1.compareTo(b.\\$1));\n  final heap = PriorityQueue<(int, int, int)>((a, b) =>\n      a.\\$2 != b.\\$2 ? a.\\$2.compareTo(b.\\$2) : a.\\$3.compareTo(b.\\$3));\n  final result = <int>[];\n  int time = 0;\n  int idx = 0;\n\n  while (idx < indexed.length || heap.isNotEmpty) {\n    if (heap.isEmpty) {\n      time = max(time, indexed[idx].\\$1);\n    }\n    while (idx < indexed.length && indexed[idx].\\$1 <= time) {\n      heap.add((indexed[idx].\\$1, indexed[idx].\\$2, indexed[idx].\\$3));\n      idx++;\n    }\n    final (enqueue, duration, original) = heap.removeFirst();\n    time += duration;\n    result.add(original);\n  }\n\n  return result;\n}",
        swift: "func getOrder(_ tasks: [[Int]]) -> [Int] {\n    var indexed = tasks.enumerated().map { (\\$0.element[0], \\$0.element[1], \\$0.offset) }\n    indexed.sort { \\$0.0 < \\$1.0 }\n    var heap = Heap<(Int, Int, Int)>(sort: { \\$0.1 < \\$1.1 || (\\$0.1 == \\$1.1 && \\$0.2 < \\$1.2) })\n    var result: [Int] = []\n    var time = 0\n    var idx = 0\n\n    while idx < indexed.count || !heap.isEmpty {\n        if heap.isEmpty {\n            time = max(time, indexed[idx].0)\n        }\n        while idx < indexed.count && indexed[idx].0 <= time {\n            heap.insert((indexed[idx].0, indexed[idx].1, indexed[idx].2))\n            idx += 1\n        }\n        let (enqueue, duration, original) = heap.remove()!\n        time += duration\n        result.append(original)\n    }\n\n    return result\n}",
        haskell: "getOrder :: [[Int]] -> [Int]\ngetOrder tasks =\n  let indexed = zip3 (map (!! 0) tasks) (map (!! 1) tasks) [0..]\n      sorted = sortOn (\\(e,_,_) -> e) indexed\n  in go sorted H.empty 0 []\n\n  go [] heap _ result = reverse result\n  go tasks heap time result\n    | H.null heap = let (e, d, i) = head tasks in go tasks heap e result\n    | otherwise =\n        let ((_, d, i), heap') = H.deleteFindMin heap\n            newTime = time + d\n        in go tasks heap' newTime (i:result)"
      }
    },
    {
      id: 16,
      title: 'Process Tasks Using Servers',
      difficulty: 'medium',
      tags: ['heap', 'simulation', 'priority-queue'],
      description: 'Assign tasks to servers minimizing task waiting time. Server i has weight and processing time.',
      examples: [
        {
          input: 'servers = [3,3,2], tasks = [1,2,3,2,1,2], k = 2',
          output: '[2,0,2,2,3,2]',
          explanation: 'Assign tasks to least weighted available server'
        }
      ],
      constraints: ['servers.length == n', 'tasks.length == m', '1 <= k <= 10^5'],
      hint: 'Use min-heap for free servers (by weight, then index). Track when each becomes free.',
      timeComplexity: 'O(m log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun assignTasks(servers: IntArray, tasks: IntArray): IntArray {\n    val result = IntArray(tasks.size)\n    val free = PriorityQueue<Pair<Int, Int>> { a, b ->\n        if (a.first != b.first) a.first - b.first else a.second - b.second\n    }\n    val busy = PriorityQueue<Triple<Long, Int, Int>> { a, b -> a.first.compareTo(b.first) }\n\n    for (i in servers.indices) {\n        free.offer(servers[i] to i)\n    }\n\n    for (i in tasks.indices) {\n        while (busy.isNotEmpty() && busy.peek().first <= i) {\n            val (_, weight, idx) = busy.poll()\n            free.offer(weight to idx)\n        }\n        if (free.isEmpty()) {\n            val (time, weight, idx) = busy.poll()\n            free.offer(weight to idx)\n        }\n        val (weight, idx) = free.poll()\n        result[i] = idx\n        busy.offer(Triple((i + tasks[i]).toLong(), weight, idx))\n    }\n\n    return result\n}",
        dart: "List<int> assignTasks(List<int> servers, List<int> tasks) {\n  final result = List.filled(tasks.length, 0);\n  final free = PriorityQueue<(int, int)>((a, b) =>\n      a.\\$1 != b.\\$1 ? a.\\$1.compareTo(b.\\$1) : a.\\$2.compareTo(b.\\$2));\n  final busy = PriorityQueue<(int, int, int)>((a, b) => a.\\$1.compareTo(b.\\$1));\n\n  for (int i = 0; i < servers.length; i++) {\n    free.add((servers[i], i));\n  }\n\n  for (int i = 0; i < tasks.length; i++) {\n    while (busy.isNotEmpty && busy.first.\\$1 <= i) {\n      final (time, weight, idx) = busy.removeFirst();\n      free.add((weight, idx));\n    }\n    if (free.isEmpty) {\n      final (time, weight, idx) = busy.removeFirst();\n      free.add((weight, idx));\n    }\n    final (weight, idx) = free.removeFirst();\n    result[i] = idx;\n    busy.add((i + tasks[i], weight, idx));\n  }\n\n  return result;\n}",
        swift: "func assignTasks(_ servers: [Int], _ tasks: [Int]) -> [Int] {\n    var result = Array(repeating: 0, count: tasks.count)\n    var free = Heap<(Int, Int)>(sort: { \\$0.0 < \\$1.0 || (\\$0.0 == \\$1.0 && \\$0.1 < \\$1.1) })\n    var busy = Heap<(Int, Int, Int)>(sort: { \\$0.0 < \\$1.0 })\n\n    for (i, weight) in servers.enumerated() {\n        free.insert((weight, i))\n    }\n\n    for (i, task) in tasks.enumerated() {\n        while !busy.isEmpty && busy.peek()!.0 <= i {\n            let (time, weight, idx) = busy.remove()!\n            free.insert((weight, idx))\n        }\n        if free.isEmpty {\n            let (time, weight, idx) = busy.remove()!\n            free.insert((weight, idx))\n        }\n        let (weight, idx) = free.remove()!\n        result[i] = idx\n        busy.insert((i + task, weight, idx))\n    }\n\n    return result\n}",
        haskell: "assignTasks :: [Int] -> [Int] -> [Int]\nassignTasks servers tasks = go tasks 0 freeHeap busyHeap [] where\n  freeHeap = foldr (\\(s, i) h -> H.insert (s, i) h) H.empty (zip servers [0..])\n  busyHeap = H.empty\n\n  go [] _ _ _ result = reverse result\n  go (t:ts) i free busy result =\n    let free' = foldr (\\(time, w, idx) h -> if time <= i then H.insert (w, idx) h else h) free (H.toList busy)\n        busy' = foldr (\\(time, w, idx) -> if time > i then H.insert (time, w, idx) else id) H.empty (H.toList busy)\n        ((w, idx), free'') = H.deleteFindMin free'\n        busy'' = H.insert (i + t, w, idx) busy'\n    in go ts (i + 1) free'' busy'' (idx : result)"
      }
    },
    {
      id: 17,
      title: 'Heap Sort Implementation',
      difficulty: 'medium',
      tags: ['heap', 'sorting', 'in-place'],
      description: 'Implement heap sort algorithm. Build max-heap then repeatedly extract maximum and rebuild.',
      examples: [
        {
          input: 'nums = [3,2,1,5,4]',
          output: '[1,2,3,4,5]',
          explanation: 'Sorted array'
        }
      ],
      constraints: ['1 <= nums.length <= 10^5'],
      hint: 'Build max-heap in-place, then swap root with last and heapify down repeatedly.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun heapSort(nums: IntArray) {\n    val n = nums.size\n    for (i in n / 2 - 1 downTo 0) {\n        heapify(nums, n, i)\n    }\n    for (i in n - 1 downTo 1) {\n        nums[0] = nums[i].also { nums[i] = nums[0] }\n        heapify(nums, i, 0)\n    }\n}\n\nfun heapify(nums: IntArray, n: Int, i: Int) {\n    var largest = i\n    val left = 2 * i + 1\n    val right = 2 * i + 2\n\n    if (left < n && nums[left] > nums[largest]) largest = left\n    if (right < n && nums[right] > nums[largest]) largest = right\n    if (largest != i) {\n        nums[i] = nums[largest].also { nums[largest] = nums[i] }\n        heapify(nums, n, largest)\n    }\n}",
        dart: "void heapSort(List<int> nums) {\n  final n = nums.length;\n  for (int i = n ~/ 2 - 1; i >= 0; i--) {\n    heapify(nums, n, i);\n  }\n  for (int i = n - 1; i >= 1; i--) {\n    final temp = nums[0];\n    nums[0] = nums[i];\n    nums[i] = temp;\n    heapify(nums, i, 0);\n  }\n}\n\nvoid heapify(List<int> nums, int n, int i) {\n  int largest = i;\n  final left = 2 * i + 1;\n  final right = 2 * i + 2;\n\n  if (left < n && nums[left] > nums[largest]) largest = left;\n  if (right < n && nums[right] > nums[largest]) largest = right;\n  if (largest != i) {\n    final temp = nums[i];\n    nums[i] = nums[largest];\n    nums[largest] = temp;\n    heapify(nums, n, largest);\n  }\n}",
        swift: "func heapSort(_ nums: inout [Int]) {\n    let n = nums.count\n    for i in stride(from: n / 2 - 1, through: 0, by: -1) {\n        heapify(&nums, n, i)\n    }\n    for i in stride(from: n - 1, through: 1, by: -1) {\n        nums.swapAt(0, i)\n        heapify(&nums, i, 0)\n    }\n}\n\nfunc heapify(_ nums: inout [Int], _ n: Int, _ i: Int) {\n    var largest = i\n    let left = 2 * i + 1\n    let right = 2 * i + 2\n\n    if left < n && nums[left] > nums[largest] { largest = left }\n    if right < n && nums[right] > nums[largest] { largest = right }\n    if largest != i {\n        nums.swapAt(i, largest)\n        heapify(&nums, n, largest)\n    }\n}",
        haskell: "heapSort :: [Int] -> [Int]\nheapSort xs = reverse (go (buildHeap xs) (length xs)) where\n  go h 0 = []\n  go h n = let (root, h') = extractRoot h\n           in root : go h' (n - 1)\n\n  buildHeap xs = foldr siftDown xs [length xs `div` 2 - 1, length xs `div` 2 - 2 .. 0]\n\n  extractRoot (x:xs) = (x, xs)\n\n  siftDown xs i = siftDownHelper xs i (2 * i + 1) (2 * i + 2)"
      }
    },
    {
      id: 18,
      title: 'Ugly Number II',
      difficulty: 'medium',
      tags: ['heap', 'dynamic-programming', 'math'],
      description: 'Find the nth ugly number where ugly numbers are positive integers with only prime factors 2, 3, 5.',
      examples: [
        {
          input: 'n = 10',
          output: '12',
          explanation: 'Ugly numbers: 1,2,3,4,5,6,8,9,10,12'
        }
      ],
      constraints: ['1 <= n <= 1500'],
      hint: 'Use min-heap or three pointers. Each ugly number is previous ugly * 2, 3, or 5.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun nthUglyNumber(n: Int): Int {\n    val ugly = mutableListOf(1)\n    val heap = PriorityQueue<Long>()\n    val seen = mutableSetOf<Long>(1L)\n\n    for (factor in listOf(2, 3, 5)) {\n        heap.offer(factor.toLong())\n        seen.add(factor.toLong())\n    }\n\n    while (ugly.size < n) {\n        val next = heap.poll()\n        ugly.add(next.toInt())\n        for (factor in listOf(2, 3, 5)) {\n            val newNum = next * factor\n            if (!seen.contains(newNum)) {\n                seen.add(newNum)\n                heap.offer(newNum)\n            }\n        }\n    }\n\n    return ugly[n - 1]\n}",
        dart: "int nthUglyNumber(int n) {\n  final ugly = <int>[1];\n  final heap = PriorityQueue<int>();\n  final seen = <int>{1};\n\n  for (final factor in [2, 3, 5]) {\n    heap.add(factor);\n    seen.add(factor);\n  }\n\n  while (ugly.length < n) {\n    final next = heap.removeFirst();\n    ugly.add(next);\n    for (final factor in [2, 3, 5]) {\n      final newNum = next * factor;\n      if (!seen.contains(newNum)) {\n        seen.add(newNum);\n        heap.add(newNum);\n      }\n    }\n  }\n\n  return ugly[n - 1];\n}",
        swift: "func nthUglyNumber(_ n: Int) -> Int {\n    var ugly: [Int] = [1]\n    var heap = Heap<Int>(sort: <)\n    var seen = Set<Int>([1])\n\n    for factor in [2, 3, 5] {\n        heap.insert(factor)\n        seen.insert(factor)\n    }\n\n    while ugly.count < n {\n        let next = heap.remove()!\n        ugly.append(next)\n        for factor in [2, 3, 5] {\n            let newNum = next * factor\n            if !seen.contains(newNum) {\n                seen.insert(newNum)\n                heap.insert(newNum)\n            }\n        }\n    }\n\n    return ugly[n - 1]\n}",
        haskell: "nthUglyNumber :: Int -> Int\nnthUglyNumber n = go 1 [1] H.empty S.empty 1 where\n  go count ugly heap seen lastNum\n    | count == n = lastNum\n    | otherwise =\n        let (newHeap, newSeen) = foldr (\\f (h, s) ->\n              if S.member (lastNum * f) s then (h, s) else (H.insert (lastNum * f) h, S.insert (lastNum * f) s))\n              (heap, seen) [2, 3, 5]\n            (next, newHeap') = H.deleteFindMin newHeap\n        in go (count + 1) (ugly ++ [next]) newHeap' newSeen next"
      }
    },
    {
      id: 19,
      title: 'Super Ugly Number',
      difficulty: 'medium',
      tags: ['heap', 'dynamic-programming', 'math'],
      description: 'Find the nth super ugly number where super ugly numbers have only prime factors in primes array.',
      examples: [
        {
          input: 'n = 12, primes = [2,7,13,19]',
          output: '32',
          explanation: 'Super ugly numbers with given primes'
        }
      ],
      constraints: ['1 <= n <= 10^5', '1 <= primes.length <= 100'],
      hint: 'Similar to Ugly Number II but with custom primes. Use heap or DP with indices.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun nthSuperUglyNumber(n: Int, primes: IntArray): Int {\n    val ugly = intArrayOf(1)\n    val heap = PriorityQueue<Long>()\n    val seen = mutableSetOf<Long>(1L)\n\n    for (prime in primes) {\n        heap.offer(prime.toLong())\n        seen.add(prime.toLong())\n    }\n\n    while (ugly.size < n) {\n        val next = heap.poll()\n        ugly = ugly.plus(next.toInt())\n        for (prime in primes) {\n            val newNum = next * prime\n            if (!seen.contains(newNum) && newNum <= Long.MAX_VALUE / prime) {\n                seen.add(newNum)\n                heap.offer(newNum)\n            }\n        }\n    }\n\n    return ugly[n - 1]\n}",
        dart: "int nthSuperUglyNumber(int n, List<int> primes) {\n  final ugly = <int>[1];\n  final heap = PriorityQueue<int>();\n  final seen = <int>{1};\n\n  for (final prime in primes) {\n    heap.add(prime);\n    seen.add(prime);\n  }\n\n  while (ugly.length < n) {\n    final next = heap.removeFirst();\n    ugly.add(next);\n    for (final prime in primes) {\n      final newNum = next * prime;\n      if (!seen.contains(newNum)) {\n        seen.add(newNum);\n        heap.add(newNum);\n      }\n    }\n  }\n\n  return ugly[n - 1];\n}",
        swift: "func nthSuperUglyNumber(_ n: Int, _ primes: [Int]) -> Int {\n    var ugly: [Int] = [1]\n    var heap = Heap<Int>(sort: <)\n    var seen = Set<Int>([1])\n\n    for prime in primes {\n        heap.insert(prime)\n        seen.insert(prime)\n    }\n\n    while ugly.count < n {\n        let next = heap.remove()!\n        ugly.append(next)\n        for prime in primes {\n            let newNum = next * prime\n            if !seen.contains(newNum) {\n                seen.insert(newNum)\n                heap.insert(newNum)\n            }\n        }\n    }\n\n    return ugly[n - 1]\n}",
        haskell: "nthSuperUglyNumber :: Int -> [Int] -> Int\nnthSuperUglyNumber n primes = go 1 [1] H.empty S.empty 1 where\n  go count ugly heap seen lastNum\n    | count == n = lastNum\n    | otherwise =\n        let (newHeap, newSeen) = foldr (\\p (h, s) ->\n              if S.member (lastNum * p) s then (h, s) else (H.insert (lastNum * p) h, S.insert (lastNum * p) s))\n              (heap, seen) primes\n            (next, newHeap') = H.deleteFindMin newHeap\n        in go (count + 1) (ugly ++ [next]) newHeap' newSeen next"
      }
    },
    {
      id: 20,
      title: 'Trapping Rain Water II (3D)',
      difficulty: 'hard',
      tags: ['heap', 'bfs', '3d-grid'],
      description: 'Given a 2D elevation map, compute how much rainwater can be trapped after raining. Water flows from higher to lower elevation.',
      examples: [
        {
          input: 'heightMap = [[1,4,3,1,1,1],[3,2,1,3,2,4],[1,3,3,4,4,1]]',
          output: '4',
          explanation: 'Water trapped in low areas'
        }
      ],
      constraints: ['m == heightMap.length', 'n == heightMap[0].length', '1 <= m,n <= 200'],
      hint: 'Use min-heap starting from boundaries. Process from lowest boundary inward.',
      timeComplexity: 'O(m*n log(m*n))',
      spaceComplexity: 'O(m*n)',
      solutions: {
        kotlin: "fun trapRainWater(heightMap: Array<IntArray>): Int {\n    val m = heightMap.size\n    val n = heightMap[0].size\n    val visited = Array(m) { BooleanArray(n) }\n    val heap = PriorityQueue<Triple<Int, Int, Int>> { a, b -> a.first - b.first }\n\n    for (i in 0 until m) {\n        for (j in 0 until n) {\n            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {\n                heap.offer(Triple(heightMap[i][j], i, j))\n                visited[i][j] = true\n            }\n        }\n    }\n\n    var water = 0\n    val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))\n\n    while (heap.isNotEmpty()) {\n        val (h, i, j) = heap.poll()\n        for ((di, dj) in dirs) {\n            val ni = i + di\n            val nj = j + dj\n            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {\n                visited[ni][nj] = true\n                water += maxOf(0, h - heightMap[ni][nj])\n                heap.offer(Triple(maxOf(h, heightMap[ni][nj]), ni, nj))\n            }\n        }\n    }\n\n    return water\n}",
        dart: "int trapRainWater(List<List<int>> heightMap) {\n  final m = heightMap.length;\n  final n = heightMap[0].length;\n  final visited = List.generate(m, (_) => List.filled(n, false));\n  final heap = PriorityQueue<(int, int, int)>((a, b) => a.\\$1.compareTo(b.\\$1));\n\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {\n        heap.add((heightMap[i][j], i, j));\n        visited[i][j] = true;\n      }\n    }\n  }\n\n  int water = 0;\n  final dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];\n\n  while (heap.isNotEmpty) {\n    final (h, i, j) = heap.removeFirst();\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {\n        visited[ni][nj] = true;\n        water += max(0, h - heightMap[ni][nj]);\n        heap.add((max(h, heightMap[ni][nj]), ni, nj));\n      }\n    }\n  }\n\n  return water;\n}",
        swift: "func trapRainWater(_ heightMap: [[Int]]) -> Int {\n    let m = heightMap.count\n    let n = heightMap[0].count\n    var visited = Array(repeating: Array(repeating: false, count: n), count: m)\n    var heap = Heap<(Int, Int, Int)>(sort: { \\$0.0 < \\$1.0 })\n\n    for i in 0..<m {\n        for j in 0..<n {\n            if i == 0 || i == m - 1 || j == 0 || j == n - 1 {\n                heap.insert((heightMap[i][j], i, j))\n                visited[i][j] = true\n            }\n        }\n    }\n\n    var water = 0\n    let dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]\n\n    while !heap.isEmpty {\n        let (h, i, j) = heap.remove()!\n        for (di, dj) in dirs {\n            let ni = i + di, nj = j + dj\n            if ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj] {\n                visited[ni][nj] = true\n                water += max(0, h - heightMap[ni][nj])\n                heap.insert((max(h, heightMap[ni][nj]), ni, nj))\n            }\n        }\n    }\n\n    return water\n}",
        haskell: "trapRainWater :: [[Int]] -> Int\ntrapRainWater heightMap = go heap S.empty 0 where\n  m = length heightMap\n  n = length (heightMap !! 0)\n  boundary = [(heightMap !! i !! j, i, j) | i <- [0..m-1], j <- [0..n-1],\n              i == 0 || i == m - 1 || j == 0 || j == n - 1]\n  heap = foldr H.insert H.empty boundary\n\n  go h visited water\n    | H.null h = water\n    | (i, j) \\`S.member\\` visited = go (H.deleteMin h) visited water\n    | otherwise =\n        let ((hh, i, j), h') = H.deleteFindMin h\n            visited' = S.insert (i, j) visited\n            neighbors = [(ni, nj) | (di, dj) <- [(0,1), (0,-1), (1,0), (-1,0)],\n                                    let (ni, nj) = (i + di, j + dj),\n                                    ni >= 0 && ni < m && nj >= 0 && nj < n && (ni, nj) \\`S.notMember\\` visited']\n            newHeap = foldr (\\(ni, nj) h -> H.insert (max hh (heightMap !! ni !! nj), ni, nj) h) h' neighbors\n            newWater = water + sum [max 0 (hh - heightMap !! ni !! nj) | (ni, nj) <- neighbors]\n        in go newHeap visited' newWater"
      }
    }
  ]
}
