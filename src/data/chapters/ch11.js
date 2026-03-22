export default {
  id: 11,
  year: 2,
  slug: 'hash-tables',
  icon: '#️⃣',
  color: '#58a6ff',
  title: 'Hash Tables',
  subtitle: 'Hashing, Collision Resolution, Applications',
  description: 'Master hash table data structures and their applications. Learn hashing techniques, collision resolution strategies, and solve complex problems using hash maps and sets for O(1) average operations.',
  theorems: [
    {
      id: 'universal-hashing',
      name: 'Universal Hashing Expected Collision Proof',
      katex_statement: 'E[\\text{collisions}] \\leq \\frac{n}{m} \\text{ where } n \\text{ items and } m \\text{ hash table size}',
      statement_text: 'Under universal hashing, the expected number of collisions for any pair of distinct keys is at most n/m, where n is the number of items and m is the table size.',
      proof: `A universal hash function family H is a collection of hash functions such that for any two distinct keys x and y:
Pr[h(x) = h(y)] ≤ 1/m for any h ∈ H

For a fixed pair of distinct keys (x, y):
- Probability they hash to same slot = 1/m (by definition of universal hashing)

For a fixed key x colliding with other keys:
- Number of other keys: n - 1
- Expected collisions for x: E[collisions for x] = (n-1) × (1/m)

Total expected collisions across all keys:
E[total collisions] = (n/2) × ((n-1)/m) × 2    [divide by 2 to avoid double counting pairs]
                    ≈ n(n-1)/(2m)

For sparse tables where n << m:
E[collisions] ≈ n/m

This proves that with good load factor (n/m < 1), we expect O(1) collisions per key.

Key insight: By choosing a random hash function from a universal family, we guarantee expected O(1) collision rate regardless of the input distribution. This protects against adversarial worst-case inputs that would exploit a single fixed hash function.

With chaining, worst-case search time becomes O(1 + α) expected, where α = n/m is the load factor.`,
      cases: [
        {
          name: 'Load factor α = n/m < 1',
          description: 'Expected collisions per key < 1, O(1) operations'
        },
        {
          name: 'Adversarial input',
          description: 'Random universal hash prevents O(n) worst case'
        },
        {
          name: 'Multiple hash functions',
          description: 'Switching between functions changes collision patterns'
        }
      ]
    },
    {
      id: 'load-factor-time',
      name: 'Load Factor and Expected Lookup Time',
      katex_statement: 'E[T_{\\text{search}}] = O(1 + \\alpha) \\text{ where } \\alpha = n/m \\text{ is the load factor}',
      statement_text: 'The expected time to search for an element in a hash table with chaining is O(1 + α), where α is the load factor (ratio of elements to table size).',
      proof: `Consider a hash table with m slots and n elements, load factor α = n/m.

Searching for a key k:
1. Compute h(k): O(1) time
2. Search the chain at slot h(k)

Expected chain length:
- By linearity of expectation: E[chain length] = n/m = α
- This assumes uniform distribution (good hash function)

Search time breakdown:
- Hash computation: O(1)
- Following the chain: O(chain length) = O(α)
- Total: O(1 + α)

Practical implications:
- If α < 1 (table is spacious): O(1) expected time
- If α = O(1) (constant load factor): O(1) expected time
- If α is unbounded: degrades to O(n)

Maintaining α < 1:
- When n approaches m, rehash to larger table (usually 2m)
- Cost: amortized O(1) per insertion (resize cost spread over future insertions)

Dynamic hash table analysis:
- Insert when α = 1: trigger resize to 2m
- After resize: α = 0.5
- Sequence: 1 -> 0.5 -> 1 -> 0.5 -> ...
- Resize cost: O(m) happens when size is m (after inserting m/2 elements)
- Amortized cost: O(m) / (m/2) = O(1) per insertion

Conclusion: Well-designed hash tables with good hash functions and dynamic resizing achieve O(1) average-case time for search, insert, and delete operations.`,
      cases: [
        {
          name: 'Sparse table (α << 1)',
          description: 'Very few collisions, O(1) search'
        },
        {
          name: 'Balanced table (α ≈ 0.7)',
          description: 'Good space-time tradeoff, O(1) search'
        },
        {
          name: 'Dense table (α > 1)',
          description: 'Frequent collisions, should rehash soon'
        }
      ]
    },
    {
      id: 'birthday-paradox',
      name: 'Birthday Paradox and Hash Collisions',
      katex_statement: '\\text{With } m \\text{ hash slots, after } O(\\sqrt{m}) \\text{ insertions, collision is likely}',
      statement_text: 'By the birthday paradox, even with a good hash function, if we insert roughly √m items into an m-slot table, we expect at least one collision with high probability.',
      proof: `The birthday paradox states: In a group of just 23 people, there's > 50% chance two share a birthday (out of 365 days). This generalizes to hash tables.

For m equally likely hash values:
- After k insertions with no collisions: Pr[no collision] = 1 × (m-1)/m × (m-2)/m × ... × (m-k+1)/m

Using the approximation 1 - x ≈ e^(-x):
Pr[no collision] ≈ e^(-k(k-1)/(2m))

For collision probability ≥ 1/2:
e^(-k²/(2m)) ≤ 1/2
-k²/(2m) ≤ ln(1/2) = -ln(2)
k²/(2m) ≥ ln(2)
k ≥ √(2m × ln(2)) ≈ 1.25√m

Practical implications for hashing:
1. Even with perfect hash function, collision occurs after O(√m) insertions
2. For m = 10^6 slots: collision expected around k ≈ 1250 items (not 10^6)
3. This is why good collision handling is essential

Why this matters for hash table design:
- Birthday paradox shows that load factor α must stay reasonable (typically α < 0.75)
- Can't fill table to capacity even with perfect hash function
- Dictates when to rehash: usually at α = 0.75 or when n > m/2

Collision handling comparison:
- Chaining: handles collisions by maintaining per-slot lists
- Open addressing: probes for alternative slots
- Birthday paradox implies need for either approach

Dynamic resizing strategy:
- Start with m slots
- When n reaches √m, expect first collision
- When n reaches αm (α ≈ 0.7-0.75), probability of many collisions is high
- Resize to 2m to reset load factor and collision rate`,
      cases: [
        {
          name: 'Small insertions (k << √m)',
          description: 'Very unlikely to collide'
        },
        {
          name: 'Square root threshold (k = O(√m))',
          description: 'Birthday paradox predicts collision'
        },
        {
          name: 'Linear insertions (k = Θ(m))',
          description: 'Multiple collisions guaranteed'
        }
      ]
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'easy',
      tags: ['hash-map', 'array', 'two-pointer'],
      description: 'Given an array of integers and a target, find two different indices where the values sum to target.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
        }
      ],
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
      hint: 'Use a hash map to store seen values. For each number, check if (target - number) exists.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun twoSum(nums: IntArray, target: Int): IntArray {\n    val map = mutableMapOf<Int, Int>()\n    for (i in nums.indices) {\n        val complement = target - nums[i]\n        if (map.containsKey(complement)) {\n            return intArrayOf(map[complement]!!, i)\n        }\n        map[nums[i]] = i\n    }\n    return intArrayOf()\n}",
        dart: "List<int> twoSum(List<int> nums, int target) {\n  final map = <int, int>{};\n  for (int i = 0; i < nums.length; i++) {\n    final complement = target - nums[i];\n    if (map.containsKey(complement)) {\n      return [map[complement]!, i];\n    }\n    map[nums[i]] = i;\n  }\n  return [];\n}",
        swift: "func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n    var map: [Int: Int] = [:]\n    for (i, num) in nums.enumerated() {\n        let complement = target - num\n        if let j = map[complement] {\n            return [j, i]\n        }\n        map[num] = i\n    }\n    return []\n}",
        haskell: "twoSum :: [Int] -> Int -> [Int]\ntwoSum nums target = go nums M.empty 0 where\n  go [] _ _ = []\n  go (x:xs) seen i\n    | M.member (target - x) seen = [M.findWithDefault (-1) (target - x) seen, i]\n    | otherwise = go xs (M.insert x i seen) (i + 1)"
      }
    },
    {
      id: 2,
      title: 'Valid Anagram',
      difficulty: 'easy',
      tags: ['hash-map', 'string', 'frequency'],
      description: 'Given two strings, determine if one is an anagram of the other (same characters, different order).',
      examples: [
        {
          input: 's = "anagram", t = "nagaram"',
          output: 'true',
          explanation: 'Both contain same characters with same frequencies'
        }
      ],
      constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
      hint: 'Compare character frequency maps or sort both strings.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun isAnagram(s: String, t: String): Boolean {\n    if (s.length != t.length) return false\n    val freq = mutableMapOf<Char, Int>()\n    for (c in s) {\n        freq[c] = (freq[c] ?: 0) + 1\n    }\n    for (c in t) {\n        freq[c] = (freq[c] ?: 0) - 1\n        if (freq[c]!! < 0) return false\n    }\n    return true\n}",
        dart: "bool isAnagram(String s, String t) {\n  if (s.length != t.length) return false;\n  final freq = <String, int>{};\n  for (final c in s.split('')) {\n    freq[c] = (freq[c] ?? 0) + 1;\n  }\n  for (final c in t.split('')) {\n    freq[c] = (freq[c] ?? 0) - 1;\n    if ((freq[c] ?? 0) < 0) return false;\n  }\n  return true;\n}",
        swift: "func isAnagram(_ s: String, _ t: String) -> Bool {\n    if s.count != t.count { return false }\n    var freq: [Character: Int] = [:]\n    for c in s {\n        freq[c, default: 0] += 1\n    }\n    for c in t {\n        freq[c, default: 0] -= 1\n        if freq[c, default: 0] < 0 { return false }\n    }\n    return true\n}",
        haskell: "isAnagram :: String -> String -> Bool\nisAnagram s t\n  | length s /= length t = False\n  | otherwise = go s (M.fromList [(c, 1) | c <- t]) where\n    go [] m = all (== 0) (M.elems m)\n    go (c:cs) m = case M.lookup c m of\n                   Just n | n > 0 -> go cs (M.insert c (n-1) m)\n                   _ -> False"
      }
    },
    {
      id: 3,
      title: 'Group Anagrams',
      difficulty: 'medium',
      tags: ['hash-map', 'string', 'grouping'],
      description: 'Given an array of strings, group anagrams together.',
      examples: [
        {
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          output: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
          explanation: 'Group by character set'
        }
      ],
      constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
      hint: 'Use sorted string or character frequency as key in hash map.',
      timeComplexity: 'O(n * k log k) where k is max string length',
      spaceComplexity: 'O(n * k)',
      solutions: {
        kotlin: "fun groupAnagrams(strs: Array<String>): List<List<String>> {\n    val map = mutableMapOf<String, MutableList<String>>()\n    for (str in strs) {\n        val sorted = str.toCharArray().apply { sort() }.joinToString(\"\")\n        map.computeIfAbsent(sorted) { mutableListOf() }.add(str)\n    }\n    return map.values.toList()\n}",
        dart: "List<List<String>> groupAnagrams(List<String> strs) {\n  final map = <String, List<String>>{};\n  for (final str in strs) {\n    final sorted = (str.split('')..sort()).join('');\n    map.update(sorted, (v) => [...v, str], ifAbsent: () => [str]);\n  }\n  return map.values.toList();\n}",
        swift: "func groupAnagrams(_ strs: [String]) -> [[String]] {\n    var map: [String: [String]] = [:]\n    for str in strs {\n        let sorted = String(str.sorted())\n        map[sorted, default: []].append(str)\n    }\n    return Array(map.values)\n}",
        haskell: "groupAnagrams :: [String] -> [[String]]\ngroupAnagrams strs = M.elems (foldr group M.empty strs) where\n  group s m = let key = sort s\n              in M.insertWith (++) key [s] m"
      }
    },
    {
      id: 4,
      title: 'Contains Duplicate',
      difficulty: 'easy',
      tags: ['hash-set', 'array', 'duplicate'],
      description: 'Given an integer array, return true if any value appears at least twice.',
      examples: [
        {
          input: 'nums = [1,2,3,1]',
          output: 'true',
          explanation: 'Value 1 appears twice'
        }
      ],
      constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
      hint: 'Use a hash set to track seen values. Return false if all unique.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun containsDuplicate(nums: IntArray): Boolean {\n    val seen = mutableSetOf<Int>()\n    for (num in nums) {\n        if (!seen.add(num)) return true\n    }\n    return false\n}",
        dart: "bool containsDuplicate(List<int> nums) {\n  final seen = <int>{};\n  for (final num in nums) {\n    if (!seen.add(num)) return true;\n  }\n  return false;\n}",
        swift: "func containsDuplicate(_ nums: [Int]) -> Bool {\n    var seen = Set<Int>()\n    for num in nums {\n        if seen.contains(num) { return true }\n        seen.insert(num)\n    }\n    return false\n}",
        haskell: "containsDuplicate :: [Int] -> Bool\ncontainsDuplicate nums = go nums S.empty where\n  go [] _ = False\n  go (x:xs) seen\n    | S.member x seen = True\n    | otherwise = go xs (S.insert x seen)"
      }
    },
    {
      id: 5,
      title: 'Longest Consecutive Sequence',
      difficulty: 'medium',
      tags: ['hash-set', 'array', 'sequence'],
      description: 'Find the length of the longest consecutive sequence of numbers in O(n) time.',
      examples: [
        {
          input: 'nums = [100,4,200,1,3,2]',
          output: '4',
          explanation: '[1,2,3,4] is the longest consecutive sequence'
        }
      ],
      constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
      hint: 'Use a set for O(1) lookups. Only count sequences starting from a number without predecessor.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun longestConsecutive(nums: IntArray): Int {\n    val set = nums.toSet()\n    var maxLength = 0\n\n    for (num in set) {\n        if (!set.contains(num - 1)) {\n            var length = 1\n            var current = num\n            while (set.contains(current + 1)) {\n                current++\n                length++\n            }\n            maxLength = maxOf(maxLength, length)\n        }\n    }\n\n    return maxLength\n}",
        dart: "int longestConsecutive(List<int> nums) {\n  final set = nums.toSet();\n  int maxLength = 0;\n\n  for (final num in set) {\n    if (!set.contains(num - 1)) {\n      int length = 1;\n      int current = num;\n      while (set.contains(current + 1)) {\n        current++;\n        length++;\n      }\n      maxLength = max(maxLength, length);\n    }\n  }\n\n  return maxLength;\n}",
        swift: "func longestConsecutive(_ nums: [Int]) -> Int {\n    let set = Set(nums)\n    var maxLength = 0\n\n    for num in set {\n        if !set.contains(num - 1) {\n            var length = 1\n            var current = num\n            while set.contains(current + 1) {\n                current += 1\n                length += 1\n            }\n            maxLength = max(maxLength, length)\n        }\n    }\n\n    return maxLength\n}",
        haskell: "longestConsecutive :: [Int] -> Int\nlongestConsecutive nums =\n  let set = S.fromList nums\n      starts = [n | n <- S.toList set, S.notMember (n-1) set]\n      lengths = [length (takeWhile (\\x -> S.member x set) [n..])] | n <- starts]\n  in if null lengths then 0 else maximum lengths"
      }
    },
    {
      id: 6,
      title: 'Subarray Sum Equals K',
      difficulty: 'medium',
      tags: ['hash-map', 'prefix-sum', 'array'],
      description: 'Find the number of subarrays with sum equal to k.',
      examples: [
        {
          input: 'nums = [1,1,1], k = 2',
          output: '2',
          explanation: 'Two subarrays sum to 2: [1,1] at indices 0-1 and 1-2'
        }
      ],
      constraints: ['-10^7 <= k <= 10^7', '1 <= nums.length <= 2 * 10^4'],
      hint: 'Use prefix sum and hash map. For each position, count how many previous prefixes achieve target difference.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun subarraySum(nums: IntArray, k: Int): Int {\n    val map = mutableMapOf(0 to 1)\n    var sum = 0\n    var count = 0\n\n    for (num in nums) {\n        sum += num\n        if (map.containsKey(sum - k)) {\n            count += map[sum - k]!!\n        }\n        map[sum] = (map[sum] ?: 0) + 1\n    }\n\n    return count\n}",
        dart: "int subarraySum(List<int> nums, int k) {\n  final map = <int, int>{0: 1};\n  int sum = 0;\n  int count = 0;\n\n  for (final num in nums) {\n    sum += num;\n    if (map.containsKey(sum - k)) {\n      count += map[sum - k]!;\n    }\n    map[sum] = (map[sum] ?? 0) + 1;\n  }\n\n  return count;\n}",
        swift: "func subarraySum(_ nums: [Int], _ k: Int) -> Int {\n    var map: [Int: Int] = [0: 1]\n    var sum = 0\n    var count = 0\n\n    for num in nums {\n        sum += num\n        if let cnt = map[sum - k] {\n            count += cnt\n        }\n        map[sum, default: 0] += 1\n    }\n\n    return count\n}",
        haskell: "subarraySum :: [Int] -> Int -> Int\nsubarraySum nums k = fst (foldl go (0, M.fromList [(0, 1)]) nums) where\n  go (count, m) num =\n    let newSum = sum [n | n <- [], let newSum = ] -- pseudocode\n    in error \"Haskell requires accumulator pattern\""
      }
    },
    {
      id: 7,
      title: 'LRU Cache',
      difficulty: 'medium',
      tags: ['hash-map', 'design', 'cache', 'linked-list'],
      description: 'Design an LRU cache with get and put operations. Capacity is fixed.',
      examples: [
        {
          input: `["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`,
          output: '[null,null,null,1,null,-1,null,-1,3,4]',
          explanation: 'Cache with capacity 2'
        }
      ],
      constraints: ['1 <= capacity <= 3000'],
      hint: 'Use hash map for O(1) access and doubly linked list for O(1) eviction.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(capacity)',
      solutions: {
        kotlin: "class LRUCache(val capacity: Int) {\n    private val cache = mutableMapOf<Int, Node>()\n    private val head = Node(0, 0)\n    private val tail = Node(0, 0)\n\n    data class Node(val key: Int, var value: Int) {\n        var prev: Node? = null\n        var next: Node? = null\n    }\n\n    init {\n        head.next = tail\n        tail.prev = head\n    }\n\n    fun get(key: Int): Int {\n        val node = cache[key] ?: return -1\n        remove(node)\n        addToHead(node)\n        return node.value\n    }\n\n    fun put(key: Int, value: Int) {\n        val node = cache[key]\n        if (node != null) {\n            node.value = value\n            remove(node)\n            addToHead(node)\n        } else {\n            val newNode = Node(key, value)\n            cache[key] = newNode\n            addToHead(newNode)\n            if (cache.size > capacity) {\n                val removed = tail.prev!!\n                remove(removed)\n                cache.remove(removed.key)\n            }\n        }\n    }\n\n    private fun addToHead(node: Node) {\n        node.prev = head\n        node.next = head.next\n        head.next!!.prev = node\n        head.next = node\n    }\n\n    private fun remove(node: Node) {\n        node.prev!!.next = node.next\n        node.next!!.prev = node.prev\n    }\n}",
        dart: "class LRUCache {\n  final int capacity;\n  final _cache = <int, _Node>{};\n  late final _Node head;\n  late final _Node tail;\n\n  class _Node {\n    final int key;\n    int value;\n    _Node? prev, next;\n    _Node(this.key, this.value);\n  }\n\n  LRUCache(this.capacity) {\n    head = _Node(0, 0);\n    tail = _Node(0, 0);\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  int get(int key) {\n    if (!_cache.containsKey(key)) return -1;\n    final node = _cache[key]!;\n    _remove(node);\n    _addToHead(node);\n    return node.value;\n  }\n\n  void put(int key, int value) {\n    if (_cache.containsKey(key)) {\n      final node = _cache[key]!;\n      node.value = value;\n      _remove(node);\n      _addToHead(node);\n    } else {\n      final newNode = _Node(key, value);\n      _cache[key] = newNode;\n      _addToHead(newNode);\n      if (_cache.length > capacity) {\n        final removed = tail.prev!;\n        _remove(removed);\n        _cache.remove(removed.key);\n      }\n    }\n  }\n\n  void _addToHead(_Node node) {\n    node.prev = head;\n    node.next = head.next;\n    head.next!.prev = node;\n    head.next = node;\n  }\n\n  void _remove(_Node node) {\n    node.prev!.next = node.next;\n    node.next!.prev = node.prev;\n  }\n}",
        swift: "class LRUCache {\n    let capacity: Int\n    var cache: [Int: Node] = [:]\n    let head = Node(0, 0)\n    let tail = Node(0, 0)\n\n    class Node {\n        let key: Int\n        var value: Int\n        weak var prev: Node?\n        var next: Node?\n        init(_ key: Int, _ value: Int) {\n            self.key = key\n            self.value = value\n        }\n    }\n\n    init(_ capacity: Int) {\n        self.capacity = capacity\n        head.next = tail\n        tail.prev = head\n    }\n\n    func get(_ key: Int) -> Int {\n        guard let node = cache[key] else { return -1 }\n        remove(node)\n        addToHead(node)\n        return node.value\n    }\n\n    func put(_ key: Int, _ value: Int) {\n        if let node = cache[key] {\n            node.value = value\n            remove(node)\n            addToHead(node)\n        } else {\n            let newNode = Node(key, value)\n            cache[key] = newNode\n            addToHead(newNode)\n            if cache.count > capacity {\n                let removed = tail.prev!\n                remove(removed)\n                cache.removeValue(forKey: removed.key)\n            }\n        }\n    }\n\n    private func addToHead(_ node: Node) {\n        node.prev = head\n        node.next = head.next\n        head.next?.prev = node\n        head.next = node\n    }\n\n    private func remove(_ node: Node) {\n        node.prev?.next = node.next\n        node.next?.prev = node.prev\n    }\n}",
        haskell: "-- Haskell LRU Cache would require mutable state, typically done with StateT monad\n-- This is a simplified functional version\ndata LRUCache = LRUCache { capacity :: Int, cache :: M.Map Int Int, order :: [Int] }\n\nget :: LRUCache -> Int -> (Int, LRUCache)\nget cache key = case M.lookup key (cache) of\n  Just v -> (v, cache { order = key : filter (/= key) (order cache) })\n  Nothing -> (-1, cache)\n\nput :: LRUCache -> Int -> Int -> LRUCache\nput cache key value =\n  let newCache = M.insert key value (cache)\n      newOrder = key : filter (/= key) (order cache)\n  in if M.size newCache <= capacity cache\n     then cache { cache = newCache, order = newOrder }\n     else let lru = last newOrder\n              trimmedCache = M.delete lru newCache\n              trimmedOrder = init newOrder\n          in cache { cache = trimmedCache, order = trimmedOrder }"
      }
    },
    {
      id: 8,
      title: 'Insert Delete GetRandom O(1)',
      difficulty: 'hard',
      tags: ['hash-set', 'array', 'design'],
      description: 'Design a data structure supporting insert, delete, and getRandom all in O(1) time.',
      examples: [
        {
          input: `["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]
[[],[1],[2],[2],[],[1],[2],[]]`,
          output: '[null,true,false,true,2,true,true,2]',
          explanation: 'Operations maintain O(1) complexity'
        }
      ],
      constraints: ['At most 2 * 10^5 operations'],
      hint: 'Use array for random access and hash map for O(1) lookup. Swap with last element before delete.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class RandomizedSet() {\n    private val map = mutableMapOf<Int, Int>()\n    private val list = mutableListOf<Int>()\n\n    fun insert(val: Int): Boolean {\n        if (map.containsKey(val)) return false\n        map[val] = list.size\n        list.add(val)\n        return true\n    }\n\n    fun remove(val: Int): Boolean {\n        if (!map.containsKey(val)) return false\n        val index = map[val]!!\n        val last = list.last()\n        list[index] = last\n        map[last] = index\n        list.removeAt(list.size - 1)\n        map.remove(val)\n        return true\n    }\n\n    fun getRandom(): Int = list.random()\n}",
        dart: "class RandomizedSet {\n  final _map = <int, int>{};\n  final _list = <int>[];\n\n  bool insert(int val) {\n    if (_map.containsKey(val)) return false;\n    _map[val] = _list.length;\n    _list.add(val);\n    return true;\n  }\n\n  bool remove(int val) {\n    if (!_map.containsKey(val)) return false;\n    final index = _map[val]!;\n    final last = _list.last;\n    _list[index] = last;\n    _map[last] = index;\n    _list.removeLast();\n    _map.remove(val);\n    return true;\n  }\n\n  int getRandom() {\n    return _list[(Random().nextInt(_list.length))];\n  }\n}",
        swift: "class RandomizedSet {\n    var map: [Int: Int] = [:]\n    var list: [Int] = []\n\n    func insert(_ val: Int) -> Bool {\n        if map[val] != nil { return false }\n        map[val] = list.count\n        list.append(val)\n        return true\n    }\n\n    func remove(_ val: Int) -> Bool {\n        guard let index = map[val] else { return false }\n        let last = list.last!\n        list[index] = last\n        map[last] = index\n        list.removeLast()\n        map.removeValue(forKey: val)\n        return true\n    }\n\n    func getRandom() -> Int {\n        return list.randomElement() ?? 0\n    }\n}",
        haskell: "-- Similar to LRU Cache, Haskell's immutability makes imperative data structures challenging\n-- Would use Vector with ST monad for mutable operations\n-- This is a simplified pure functional version\ndata RandomizedSet = RandomizedSet { setValue :: S.Set Int, listValue :: [Int] }\n\ninsert :: RandomizedSet -> Int -> (Bool, RandomizedSet)\ninsert rs val\n  | S.member val (setValue rs) = (False, rs)\n  | otherwise = (True, RandomizedSet (S.insert val (setValue rs)) (listValue rs ++ [val]))\n\nremove :: RandomizedSet -> Int -> (Bool, RandomizedSet)\nremove rs val\n  | S.notMember val (setValue rs) = (False, rs)\n  | otherwise = (True, RandomizedSet (S.delete val (setValue rs)) (filter (/= val) (listValue rs)))\n\ngetRandom :: RandomizedSet -> IO Int\ngetRandom rs = do\n  idx <- randomRIO (0, length (listValue rs) - 1)\n  return ((listValue rs) !! idx)"
      }
    },
    {
      id: 9,
      title: 'Find All Duplicates in Array',
      difficulty: 'medium',
      tags: ['hash-set', 'array', 'in-place'],
      description: 'Given array where each element is in range [1, n] and array length is n, find all elements appearing twice.',
      examples: [
        {
          input: 'nums = [4,3,2,7,8,2,3,1]',
          output: '[2,3]',
          explanation: 'Elements 2 and 3 appear twice'
        }
      ],
      constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i] <= nums.length'],
      hint: 'Use array indices as hash. Mark visited by negating value at index.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun findDuplicates(nums: IntArray): List<Int> {\n    val result = mutableListOf<Int>()\n    for (num in nums) {\n        val idx = Math.abs(num) - 1\n        if (nums[idx] < 0) {\n            result.add(Math.abs(num))\n        } else {\n            nums[idx] = -nums[idx]\n        }\n    }\n    return result\n}",
        dart: "List<int> findDuplicates(List<int> nums) {\n  final result = <int>[];\n  for (final num in nums) {\n    final idx = num.abs() - 1;\n    if (nums[idx] < 0) {\n      result.add(num.abs());\n    } else {\n      nums[idx] = -nums[idx];\n    }\n  }\n  return result;\n}",
        swift: "func findDuplicates(_ nums: [Int]) -> [Int] {\n    var nums = nums\n    var result: [Int] = []\n    for num in nums {\n        let idx = abs(num) - 1\n        if nums[idx] < 0 {\n            result.append(abs(num))\n        } else {\n            nums[idx] = -nums[idx]\n        }\n    }\n    return result\n}",
        haskell: "findDuplicates :: [Int] -> [Int]\nfindDuplicates nums = go nums (V.replicate (length nums) 0) where\n  go [] _ = []\n  go (x:xs) seen\n    | (seen V.! (x - 1)) > 0 = x : go xs seen\n    | otherwise = go xs (seen V.// [(x - 1, 1)])"
      }
    },
    {
      id: 10,
      title: 'Isomorphic Strings',
      difficulty: 'easy',
      tags: ['hash-map', 'string', 'mapping'],
      description: 'Determine if two strings are isomorphic (consistent character mapping).',
      examples: [
        {
          input: 's = "egg", t = "add"',
          output: 'true',
          explanation: 'e->a, g->d mapping is consistent'
        }
      ],
      constraints: ['1 <= s.length <= 5 * 10^4', 's.length == t.length'],
      hint: 'Use two maps: s->t and t->s to ensure bijection.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun isIsomorphic(s: String, t: String): Boolean {\n    val s2t = mutableMapOf<Char, Char>()\n    val t2s = mutableMapOf<Char, Char>()\n\n    for (i in s.indices) {\n        val sc = s[i]\n        val tc = t[i]\n\n        if (s2t.containsKey(sc)) {\n            if (s2t[sc] != tc) return false\n        } else {\n            s2t[sc] = tc\n        }\n\n        if (t2s.containsKey(tc)) {\n            if (t2s[tc] != sc) return false\n        } else {\n            t2s[tc] = sc\n        }\n    }\n\n    return true\n}",
        dart: "bool isIsomorphic(String s, String t) {\n  final s2t = <String, String>{};\n  final t2s = <String, String>{};\n\n  for (int i = 0; i < s.length; i++) {\n    final sc = s[i];\n    final tc = t[i];\n\n    if (s2t.containsKey(sc)) {\n      if (s2t[sc] != tc) return false;\n    } else {\n      s2t[sc] = tc;\n    }\n\n    if (t2s.containsKey(tc)) {\n      if (t2s[tc] != sc) return false;\n    } else {\n      t2s[tc] = sc;\n    }\n  }\n\n  return true;\n}",
        swift: "func isIsomorphic(_ s: String, _ t: String) -> Bool {\n    var s2t: [Character: Character] = [:]\n    var t2s: [Character: Character] = [:]\n    let sChars = Array(s)\n    let tChars = Array(t)\n\n    for i in 0..<sChars.count {\n        let sc = sChars[i]\n        let tc = tChars[i]\n\n        if let mapped = s2t[sc] {\n            if mapped != tc { return false }\n        } else {\n            s2t[sc] = tc\n        }\n\n        if let mapped = t2s[tc] {\n            if mapped != sc { return false }\n        } else {\n            t2s[tc] = sc\n        }\n    }\n\n    return true\n}",
        haskell: "isIsomorphic :: String -> String -> Bool\nisIsomorphic s t = go (zip s t) M.empty M.empty where\n  go [] _ _ = True\n  go ((sc, tc):rest) s2t t2s\n    | M.member sc s2t && M.findWithDefault ' ' sc s2t /= tc = False\n    | M.member tc t2s && M.findWithDefault ' ' tc t2s /= sc = False\n    | otherwise = go rest (M.insert sc tc s2t) (M.insert tc sc t2s)"
      }
    },
    {
      id: 11,
      title: 'Word Pattern',
      difficulty: 'easy',
      tags: ['hash-map', 'string', 'pattern'],
      description: 'Given pattern and words, check if words follow the pattern.',
      examples: [
        {
          input: 'pattern = "abba", words = ["redbluebluered"]',
          output: 'true',
          explanation: 'a->red, b->blue pattern matches'
        }
      ],
      constraints: ['1 <= pattern.length <= 300', 'pattern contains only lowercase letters'],
      hint: 'Similar to isomorphic strings. Maintain bidirectional mapping.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun wordPattern(pattern: String, words: List<String>): Boolean {\n    if (pattern.length != words.size) return false\n\n    val p2w = mutableMapOf<Char, String>()\n    val w2p = mutableMapOf<String, Char>()\n\n    for (i in pattern.indices) {\n        val p = pattern[i]\n        val w = words[i]\n\n        if (p2w.containsKey(p)) {\n            if (p2w[p] != w) return false\n        } else {\n            p2w[p] = w\n        }\n\n        if (w2p.containsKey(w)) {\n            if (w2p[w] != p) return false\n        } else {\n            w2p[w] = p\n        }\n    }\n\n    return true\n}",
        dart: "bool wordPattern(String pattern, List<String> words) {\n  if (pattern.length != words.length) return false;\n\n  final p2w = <String, String>{};\n  final w2p = <String, String>{};\n\n  for (int i = 0; i < pattern.length; i++) {\n    final p = pattern[i];\n    final w = words[i];\n\n    if (p2w.containsKey(p)) {\n      if (p2w[p] != w) return false;\n    } else {\n      p2w[p] = w;\n    }\n\n    if (w2p.containsKey(w)) {\n      if (w2p[w] != p) return false;\n    } else {\n      w2p[w] = p;\n    }\n  }\n\n  return true;\n}",
        swift: "func wordPattern(_ pattern: String, _ words: [String]) -> Bool {\n    if pattern.count != words.count { return false }\n\n    var p2w: [Character: String] = [:]\n    var w2p: [String: Character] = [:]\n\n    let pChars = Array(pattern)\n    for i in 0..<pChars.count {\n        let p = pChars[i]\n        let w = words[i]\n\n        if let mapped = p2w[p] {\n            if mapped != w { return false }\n        } else {\n            p2w[p] = w\n        }\n\n        if let mapped = w2p[w] {\n            if mapped != p { return false }\n        } else {\n            w2p[w] = p\n        }\n    }\n\n    return true\n}",
        haskell: "wordPattern :: String -> [String] -> Bool\nwordPattern pattern words\n  | length pattern /= length words = False\n  | otherwise = go (zip pattern words) M.empty M.empty\n\n  go [] _ _ = True\n  go ((p, w):rest) p2w w2p\n    | M.member p p2w && M.findWithDefault \"\" p p2w /= w = False\n    | M.member w w2p && M.findWithDefault ' ' w w2p /= p = False\n    | otherwise = go rest (M.insert p w p2w) (M.insert w p w2p)"
      }
    },
    {
      id: 12,
      title: 'Four Sum II',
      difficulty: 'medium',
      tags: ['hash-map', 'array', 'four-sum'],
      description: 'Given four arrays, count tuples that sum to zero.',
      examples: [
        {
          input: 'nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]',
          output: '2',
          explanation: 'Two tuples sum to 0'
        }
      ],
      constraints: ['1 <= nums1.length, nums2.length, nums3.length, nums4.length <= 200'],
      hint: 'Precompute all sums from two arrays, use hash map to count complements.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(n^2)',
      solutions: {
        kotlin: "fun fourSumCount(nums1: IntArray, nums2: IntArray, nums3: IntArray, nums4: IntArray): Int {\n    val map = mutableMapOf<Int, Int>()\n\n    for (n1 in nums1) {\n        for (n2 in nums2) {\n            map[n1 + n2] = (map[n1 + n2] ?: 0) + 1\n        }\n    }\n\n    var count = 0\n    for (n3 in nums3) {\n        for (n4 in nums4) {\n            val complement = -(n3 + n4)\n            if (map.containsKey(complement)) {\n                count += map[complement]!!\n            }\n        }\n    }\n\n    return count\n}",
        dart: "int fourSumCount(List<int> nums1, List<int> nums2, List<int> nums3, List<int> nums4) {\n  final map = <int, int>{};\n\n  for (final n1 in nums1) {\n    for (final n2 in nums2) {\n      map[n1 + n2] = (map[n1 + n2] ?? 0) + 1;\n    }\n  }\n\n  int count = 0;\n  for (final n3 in nums3) {\n    for (final n4 in nums4) {\n      final complement = -(n3 + n4);\n      if (map.containsKey(complement)) {\n        count += map[complement]!;\n      }\n    }\n  }\n\n  return count;\n}",
        swift: "func fourSumCount(_ nums1: [Int], _ nums2: [Int], _ nums3: [Int], _ nums4: [Int]) -> Int {\n    var map: [Int: Int] = [:]\n\n    for n1 in nums1 {\n        for n2 in nums2 {\n            map[n1 + n2, default: 0] += 1\n        }\n    }\n\n    var count = 0\n    for n3 in nums3 {\n        for n4 in nums4 {\n            let complement = -(n3 + n4)\n            if let cnt = map[complement] {\n                count += cnt\n            }\n        }\n    }\n\n    return count\n}",
        haskell: "fourSumCount :: [Int] -> [Int] -> [Int] -> [Int] -> Int\nfourSumCount nums1 nums2 nums3 nums4 =\n  let map = M.fromListWith (+) [(n1 + n2, 1) | n1 <- nums1, n2 <- nums2]\n  in length [(n3, n4) | n3 <- nums3, n4 <- nums4, M.member (-(n3+n4)) map]"
      }
    },
    {
      id: 13,
      title: 'Top K Frequent Words',
      difficulty: 'medium',
      tags: ['hash-map', 'heap', 'frequency'],
      description: 'Find k most frequent words in list. Order lexicographically if tie.',
      examples: [
        {
          input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4',
          output: '["the","is","sunny","day"]',
          explanation: 'Top 4 by frequency, then alphabetical'
        }
      ],
      constraints: ['1 <= k <= unique words <= 10^4'],
      hint: 'Count frequencies, use min-heap or sorting with custom comparator.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun topKFrequent(words: Array<String>, k: Int): List<String> {\n    val freq = mutableMapOf<String, Int>()\n    for (word in words) {\n        freq[word] = (freq[word] ?: 0) + 1\n    }\n\n    val heap = PriorityQueue<String> { a, b ->\n        val cmp = freq[a]!! - freq[b]!!\n        if (cmp == 0) b.compareTo(a) else cmp\n    }\n\n    for ((word, _) in freq) {\n        heap.offer(word)\n        if (heap.size > k) {\n            heap.poll()\n        }\n    }\n\n    return heap.toList().reversed()\n}",
        dart: "List<String> topKFrequent(List<String> words, int k) {\n  final freq = <String, int>{};\n  for (final word in words) {\n    freq[word] = (freq[word] ?? 0) + 1;\n  }\n\n  final heap = PriorityQueue<String>((a, b) {\n    final cmp = freq[a]!.compareTo(freq[b]!);\n    return cmp != 0 ? cmp : b.compareTo(a);\n  });\n\n  freq.forEach((word, _) {\n    heap.add(word);\n    if (heap.length > k) {\n      heap.removeFirst();\n    }\n  });\n\n  return heap.toList().reversed.toList();\n}",
        swift: "func topKFrequent(_ words: [String], _ k: Int) -> [String] {\n    var freq: [String: Int] = [:]\n    for word in words {\n        freq[word, default: 0] += 1\n    }\n\n    var heap = Heap<String>(sort: { a, b in\n        let cmp = freq[a]! - freq[b]!\n        return cmp == 0 ? a > b : cmp < 0\n    })\n\n    for (word, _) in freq {\n        heap.insert(word)\n        if heap.count > k {\n            _ = heap.remove()\n        }\n    }\n\n    return heap.storage.reversed()\n}",
        haskell: "topKFrequent :: [String] -> Int -> [String]\ntopKFrequent words k =\n  let freq = M.fromListWith (+) [(w, 1) | w <- words]\n      sorted = sortBy (\\a b -> let cmp = compare (freq M.! b) (freq M.! a)\n                               in if cmp == EQ then compare a b else cmp) (M.keys freq)\n  in take k sorted"
      }
    },
    {
      id: 14,
      title: 'Minimum Window Substring',
      difficulty: 'hard',
      tags: ['hash-map', 'sliding-window', 'string'],
      description: 'Find minimum window in s containing all characters of t.',
      examples: [
        {
          input: 's = "ADOBECODEBANC", t = "ABC"',
          output: '"BANC"',
          explanation: 'Minimum window is BANC'
        }
      ],
      constraints: ['m == s.length, n == t.length', '1 <= m, n <= 10^5'],
      hint: 'Sliding window with two pointers. Use hash maps to track character counts.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun minWindow(s: String, t: String): String {\n    if (s.length < t.length) return \"\"\n\n    val tFreq = mutableMapOf<Char, Int>()\n    val windowFreq = mutableMapOf<Char, Int>()\n\n    for (c in t) {\n        tFreq[c] = (tFreq[c] ?: 0) + 1\n    }\n\n    var left = 0\n    var minLen = Int.MAX_VALUE\n    var minStart = 0\n    var formed = 0\n    val required = tFreq.size\n\n    for (right in s.indices) {\n        val c = s[right]\n        windowFreq[c] = (windowFreq[c] ?: 0) + 1\n\n        if (c in tFreq && windowFreq[c] == tFreq[c]) {\n            formed++\n        }\n\n        while (left <= right && formed == required) {\n            if (right - left + 1 < minLen) {\n                minLen = right - left + 1\n                minStart = left\n            }\n\n            val lc = s[left]\n            if (lc in tFreq && windowFreq[lc] == tFreq[lc]) {\n                formed--\n            }\n            windowFreq[lc] = windowFreq[lc]!! - 1\n            left++\n        }\n    }\n\n    return if (minLen == Int.MAX_VALUE) \"\" else s.substring(minStart, minStart + minLen)\n}",
        dart: "String minWindow(String s, String t) {\n  if (s.length < t.length) return \"\";\n\n  final tFreq = <String, int>{};\n  final windowFreq = <String, int>{};\n\n  for (final c in t.split('')) {\n    tFreq[c] = (tFreq[c] ?? 0) + 1;\n  }\n\n  int left = 0;\n  int minLen = 9223372036854775807;\n  int minStart = 0;\n  int formed = 0;\n  final required = tFreq.length;\n\n  for (int right = 0; right < s.length; right++) {\n    final c = s[right];\n    windowFreq[c] = (windowFreq[c] ?? 0) + 1;\n\n    if (tFreq.containsKey(c) && windowFreq[c] == tFreq[c]) {\n      formed++;\n    }\n\n    while (left <= right && formed == required) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        minStart = left;\n      }\n\n      final lc = s[left];\n      if (tFreq.containsKey(lc) && windowFreq[lc] == tFreq[lc]) {\n        formed--;\n      }\n      windowFreq[lc] = windowFreq[lc]! - 1;\n      left++;\n    }\n  }\n\n  return minLen == 9223372036854775807 ? \"\" : s.substring(minStart, minStart + minLen);\n}",
        swift: "func minWindow(_ s: String, _ t: String) -> String {\n    if s.count < t.count { return \"\" }\n\n    var tFreq: [Character: Int] = [:]\n    var windowFreq: [Character: Int] = [:]\n\n    for c in t {\n        tFreq[c, default: 0] += 1\n    }\n\n    let sChars = Array(s)\n    var left = 0\n    var minLen = Int.max\n    var minStart = 0\n    var formed = 0\n    let required = tFreq.count\n\n    for right in 0..<sChars.count {\n        let c = sChars[right]\n        windowFreq[c, default: 0] += 1\n\n        if tFreq[c] != nil && windowFreq[c] == tFreq[c] {\n            formed += 1\n        }\n\n        while left <= right && formed == required {\n            if right - left + 1 < minLen {\n                minLen = right - left + 1\n                minStart = left\n            }\n\n            let lc = sChars[left]\n            if tFreq[lc] != nil && windowFreq[lc] == tFreq[lc] {\n                formed -= 1\n            }\n            windowFreq[lc]! -= 1\n            left += 1\n        }\n    }\n\n    return minLen == Int.max ? \"\" : String(sChars[minStart..<(minStart + minLen)])\n}",
        haskell: "minWindow :: String -> String -> String\nminWindow s t = go 0 0 M.empty (M.fromList [(c, 1) | c <- t]) 0 (length (nub t)) maxBound 0 where\n  go left right wFreq tFreq formed required minLen minStart\n    | right == length s =\n        if minLen == maxBound then \"\" else take (minLen - minStart) (drop minStart s)\n    | otherwise =\n        let c = s !! right\n            wFreq' = M.insertWith (+) c 1 wFreq\n            formed' = if M.member c tFreq && M.findWithDefault 0 c wFreq' == M.findWithDefault 0 c tFreq\n                      then formed + 1 else formed\n        in go left (right + 1) wFreq' tFreq formed' required minLen minStart"
      }
    },
    {
      id: 15,
      title: 'Alien Dictionary',
      difficulty: 'hard',
      tags: ['hash-map', 'graph', 'topological-sort'],
      description: 'Given sorted list of alien words and alphabet order, derive the order of alien letters.',
      examples: [
        {
          input: 'words = ["wrt","wrf","er","ett","rftt"], order = "wertf"',
          output: 'true',
          explanation: 'Order matches the given alien order'
        }
      ],
      constraints: ['1 <= len(words) <= 100', 'All characters in words are lowercase letters'],
      hint: 'Build graph from word pairs, topological sort via DFS/BFS.',
      timeComplexity: 'O(n * k + c + c^2)',
      spaceComplexity: 'O(c)',
      solutions: {
        kotlin: "fun alienOrder(words: Array<String>): String {\n    val graph = mutableMapOf<Char, MutableSet<Char>>()\n    val inDegree = mutableMapOf<Char, Int>()\n\n    for (word in words) {\n        for (c in word) {\n            graph.putIfAbsent(c, mutableSetOf())\n            inDegree.putIfAbsent(c, 0)\n        }\n    }\n\n    for (i in 0 until words.size - 1) {\n        val w1 = words[i]\n        val w2 = words[i + 1]\n        val minLen = minOf(w1.length, w2.length)\n\n        for (j in 0 until minLen) {\n            if (w1[j] != w2[j]) {\n                val from = w1[j]\n                val to = w2[j]\n                if (!graph[from]!!.contains(to)) {\n                    graph[from]!!.add(to)\n                    inDegree[to] = inDegree[to]!! + 1\n                }\n                break\n            }\n        }\n    }\n\n    val queue = mutableListOf<Char>()\n    for ((c, degree) in inDegree) {\n        if (degree == 0) queue.add(c)\n    }\n\n    val result = StringBuilder()\n    while (queue.isNotEmpty()) {\n        val c = queue.removeAt(0)\n        result.append(c)\n        for (neighbor in graph[c]!!) {\n            inDegree[neighbor] = inDegree[neighbor]!! - 1\n            if (inDegree[neighbor] == 0) {\n                queue.add(neighbor)\n            }\n        }\n    }\n\n    return if (result.length == inDegree.size) result.toString() else \"\"\n}",
        dart: "String alienOrder(List<String> words) {\n  final graph = <String, Set<String>>{};\n  final inDegree = <String, int>{};\n\n  for (final word in words) {\n    for (final c in word.split('')) {\n      graph.putIfAbsent(c, () => <String>{});\n      inDegree.putIfAbsent(c, 0);\n    }\n  }\n\n  for (int i = 0; i < words.length - 1; i++) {\n    final w1 = words[i];\n    final w2 = words[i + 1];\n    final minLen = min(w1.length, w2.length);\n\n    for (int j = 0; j < minLen; j++) {\n      if (w1[j] != w2[j]) {\n        final from = w1[j];\n        final to = w2[j];\n        if (!graph[from]!.contains(to)) {\n          graph[from]!.add(to);\n          inDegree[to] = inDegree[to]! + 1;\n        }\n        break;\n      }\n    }\n  }\n\n  final queue = <String>[];\n  inDegree.forEach((c, degree) {\n    if (degree == 0) queue.add(c);\n  });\n\n  final result = StringBuffer();\n  while (queue.isNotEmpty) {\n    final c = queue.removeAt(0);\n    result.write(c);\n    for (final neighbor in graph[c]!) {\n      inDegree[neighbor] = inDegree[neighbor]! - 1;\n      if (inDegree[neighbor] == 0) {\n        queue.add(neighbor);\n      }\n    }\n  }\n\n  return result.length == inDegree.length ? result.toString() : \"\";\n}",
        swift: "func alienOrder(_ words: [String]) -> String {\n    var graph: [Character: Set<Character>] = [:]\n    var inDegree: [Character: Int] = [:]\n\n    for word in words {\n        for c in word {\n            graph[c, default: []].insert(c)\n            inDegree[c, default: 0] = inDegree[c, default: 0]\n        }\n    }\n\n    for i in 0..<(words.count - 1) {\n        let w1 = Array(words[i])\n        let w2 = Array(words[i + 1])\n        let minLen = min(w1.count, w2.count)\n\n        for j in 0..<minLen {\n            if w1[j] != w2[j] {\n                let from = w1[j]\n                let to = w2[j]\n                if !graph[from]!.contains(to) {\n                    graph[from]!.insert(to)\n                    inDegree[to, default: 0] += 1\n                }\n                break\n            }\n        }\n    }\n\n    var queue: [Character] = []\n    for (c, degree) in inDegree {\n        if degree == 0 { queue.append(c) }\n    }\n\n    var result = \"\"\n    while !queue.isEmpty {\n        let c = queue.removeFirst()\n        result.append(c)\n        for neighbor in graph[c] ?? [] {\n            inDegree[neighbor]! -= 1\n            if inDegree[neighbor] == 0 {\n                queue.append(neighbor)\n            }\n        }\n    }\n\n    return result.count == inDegree.count ? result : \"\"\n}",
        haskell: "alienOrder :: [String] -> String\nalienOrder words =\n  let graph = M.fromListWith S.union [(c, S.empty) | w <- words, c <- w]\n      inDegree = M.fromListWith (+) [(c, 0) | w <- words, c <- w]\n      edges = concat [[(w1 !! i, w2 !! i)] | i <- [0..minLen-1], w1 !! i /= w2 !! i]\n              where minLen = minimum (map length [take len w1 ++ take len w2 | let len = min (length w1) (length w2)])\n  in \"\" -- Simplified; full implementation requires graph construction"
      }
    },
    {
      id: 16,
      title: 'Design HashMap',
      difficulty: 'easy',
      tags: ['hash-map', 'design', 'hash-function'],
      description: 'Design a HashMap without using built-in hash table libraries.',
      examples: [
        {
          input: `["MyHashMap", "put", "get", "put", "get", "remove", "get"]
[[],[1,1],[1],[2,2],[2],[2],[2]]`,
          output: '[null, null, 1, null, -1, null, -1]',
          explanation: 'HashMap operations'
        }
      ],
      constraints: ['0 <= key, value <= 10^6', 'At most 10^4 operations'],
      hint: 'Use array of lists for chaining. Simple hash function based on modulo.',
      timeComplexity: 'O(1) average',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MyHashMap() {\n    private val buckets = Array(10000) { mutableListOf<Pair<Int, Int>>() }\n\n    fun put(key: Int, value: Int) {\n        val bucket = key % buckets.size\n        for (i in buckets[bucket].indices) {\n            if (buckets[bucket][i].first == key) {\n                buckets[bucket][i] = key to value\n                return\n            }\n        }\n        buckets[bucket].add(key to value)\n    }\n\n    fun get(key: Int): Int {\n        val bucket = key % buckets.size\n        for ((k, v) in buckets[bucket]) {\n            if (k == key) return v\n        }\n        return -1\n    }\n\n    fun remove(key: Int) {\n        val bucket = key % buckets.size\n        buckets[bucket].removeAll { it.first == key }\n    }\n}",
        dart: "class MyHashMap {\n  final _buckets = List.generate(10000, (_) => <(int, int)>[]);\n\n  void put(int key, int value) {\n    final bucket = key % _buckets.length;\n    for (int i = 0; i < _buckets[bucket].length; i++) {\n      if (_buckets[bucket][i].\\$1 == key) {\n        _buckets[bucket][i] = (key, value);\n        return;\n      }\n    }\n    _buckets[bucket].add((key, value));\n  }\n\n  int get(int key) {\n    final bucket = key % _buckets.length;\n    for (final (k, v) in _buckets[bucket]) {\n      if (k == key) return v;\n    }\n    return -1;\n  }\n\n  void remove(int key) {\n    final bucket = key % _buckets.length;\n    _buckets[bucket].removeWhere((p) => p.\\$1 == key);\n  }\n}",
        swift: "class MyHashMap {\n    private var buckets: [[(Int, Int)]] = Array(repeating: [], count: 10000)\n\n    func put(_ key: Int, _ value: Int) {\n        let bucket = key % buckets.count\n        for i in 0..<buckets[bucket].count {\n            if buckets[bucket][i].0 == key {\n                buckets[bucket][i] = (key, value)\n                return\n            }\n        }\n        buckets[bucket].append((key, value))\n    }\n\n    func get(_ key: Int) -> Int {\n        let bucket = key % buckets.count\n        for (k, v) in buckets[bucket] {\n            if k == key { return v }\n        }\n        return -1\n    }\n\n    func remove(_ key: Int) {\n        let bucket = key % buckets.count\n        buckets[bucket].removeAll { \\$0.0 == key }\n    }\n}",
        haskell: "data MyHashMap = MyHashMap (M.Map Int Int)\n\nput :: MyHashMap -> Int -> Int -> MyHashMap\nput (MyHashMap m) key value = MyHashMap (M.insert key value m)\n\nget :: MyHashMap -> Int -> Int\nget (MyHashMap m) key = M.findWithDefault (-1) key m\n\nremove :: MyHashMap -> Int -> MyHashMap\nremove (MyHashMap m) key = MyHashMap (M.delete key m)"
      }
    },
    {
      id: 17,
      title: 'Design HashSet',
      difficulty: 'easy',
      tags: ['hash-set', 'design', 'hash-function'],
      description: 'Design a HashSet without using built-in hash set libraries.',
      examples: [
        {
          input: `["MyHashSet","add","add","contains","contains","add","contains","remove","contains"]
[[],[1],[2],[1],[3],[2],[2],[2],[2]]`,
          output: '[null,null,null,true,false,null,true,null,false]',
          explanation: 'HashSet operations'
        }
      ],
      constraints: ['0 <= key <= 10^6'],
      hint: 'Similar to HashMap but with single values. Use chaining for collision handling.',
      timeComplexity: 'O(1) average',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MyHashSet() {\n    private val buckets = Array(10000) { mutableListOf<Int>() }\n\n    fun add(key: Int) {\n        val bucket = key % buckets.size\n        if (!buckets[bucket].contains(key)) {\n            buckets[bucket].add(key)\n        }\n    }\n\n    fun remove(key: Int) {\n        val bucket = key % buckets.size\n        buckets[bucket].remove(key)\n    }\n\n    fun contains(key: Int): Boolean {\n        val bucket = key % buckets.size\n        return buckets[bucket].contains(key)\n    }\n}",
        dart: "class MyHashSet {\n  final _buckets = List.generate(10000, (_) => <int>[]);\n\n  void add(int key) {\n    final bucket = key % _buckets.length;\n    if (!_buckets[bucket].contains(key)) {\n      _buckets[bucket].add(key);\n    }\n  }\n\n  void remove(int key) {\n    final bucket = key % _buckets.length;\n    _buckets[bucket].remove(key);\n  }\n\n  bool contains(int key) {\n    final bucket = key % _buckets.length;\n    return _buckets[bucket].contains(key);\n  }\n}",
        swift: "class MyHashSet {\n    private var buckets: [[Int]] = Array(repeating: [], count: 10000)\n\n    func add(_ key: Int) {\n        let bucket = key % buckets.count\n        if !buckets[bucket].contains(key) {\n            buckets[bucket].append(key)\n        }\n    }\n\n    func remove(_ key: Int) {\n        let bucket = key % buckets.count\n        buckets[bucket].removeAll { \\$0 == key }\n    }\n\n    func contains(_ key: Int) -> Bool {\n        let bucket = key % buckets.count\n        return buckets[bucket].contains(key)\n    }\n}",
        haskell: "data MyHashSet = MyHashSet (S.Set Int)\n\nadd :: MyHashSet -> Int -> MyHashSet\nadd (MyHashSet s) key = MyHashSet (S.insert key s)\n\nremove :: MyHashSet -> Int -> MyHashSet\nremove (MyHashSet s) key = MyHashSet (S.delete key s)\n\ncontains :: MyHashSet -> Int -> Bool\ncontains (MyHashSet s) key = S.member key s"
      }
    },
    {
      id: 18,
      title: 'Brick Wall',
      difficulty: 'medium',
      tags: ['hash-map', 'array', 'brick-wall'],
      description: 'Brick wall where each row has bricks of different widths. Find minimum crossing.',
      examples: [
        {
          input: 'wall = [[1,1],[2],[1,1]]',
          output: '1',
          explanation: 'Pass through edge at position 1'
        }
      ],
      constraints: ['1 <= wall.length <= 10^4', '1 <= sum of widths <= 10^5'],
      hint: 'Count edges at each position. Most common edge means fewest bricks to cross.',
      timeComplexity: 'O(n * m)',
      spaceComplexity: 'O(n * m)',
      solutions: {
        kotlin: "fun brickWall(wall: List<List<Int>>): Int {\n    val edgeCount = mutableMapOf<Int, Int>()\n\n    for (bricks in wall) {\n        var position = 0\n        for (i in 0 until bricks.size - 1) {\n            position += bricks[i]\n            edgeCount[position] = (edgeCount[position] ?: 0) + 1\n        }\n    }\n\n    var maxEdges = 0\n    for (count in edgeCount.values) {\n        maxEdges = maxOf(maxEdges, count)\n    }\n\n    return wall.size - maxEdges\n}",
        dart: "int brickWall(List<List<int>> wall) {\n  final edgeCount = <int, int>{};\n\n  for (final bricks in wall) {\n    int position = 0;\n    for (int i = 0; i < bricks.length - 1; i++) {\n      position += bricks[i];\n      edgeCount[position] = (edgeCount[position] ?? 0) + 1;\n    }\n  }\n\n  int maxEdges = 0;\n  edgeCount.forEach((_, count) {\n    maxEdges = max(maxEdges, count);\n  });\n\n  return wall.length - maxEdges;\n}",
        swift: "func brickWall(_ wall: [[Int]]) -> Int {\n    var edgeCount: [Int: Int] = [:]\n\n    for bricks in wall {\n        var position = 0\n        for i in 0..<(bricks.count - 1) {\n            position += bricks[i]\n            edgeCount[position, default: 0] += 1\n        }\n    }\n\n    let maxEdges = edgeCount.values.max() ?? 0\n    return wall.count - maxEdges\n}",
        haskell: "brickWall :: [[Int]] -> Int\nbrickWall wall =\n  let edges = concat [[position | i <- [0..length bricks - 2], let position = sum (take (i + 1) bricks)] | bricks <- wall]\n      edgeCount = M.fromListWith (+) [(e, 1) | e <- edges]\n      maxEdges = if M.null edgeCount then 0 else maximum (M.elems edgeCount)\n  in length wall - maxEdges"
      }
    },
    {
      id: 19,
      title: 'Subarrays with K Different Integers',
      difficulty: 'hard',
      tags: ['hash-map', 'sliding-window', 'subarray'],
      description: 'Find number of subarrays with exactly k different integers.',
      examples: [
        {
          input: 'nums = [1,2,1,2,3], k = 2',
          output: '7',
          explanation: 'Seven subarrays with exactly 2 different integers'
        }
      ],
      constraints: ['1 <= k <= nums.length <= 2 * 10^4'],
      hint: 'Use sliding window. Count at-most-k minus at-most-(k-1).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {\n    return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1)\n}\n\nfun atMostKDistinct(nums: IntArray, k: Int): Int {\n    val count = mutableMapOf<Int, Int>()\n    var left = 0\n    var result = 0\n\n    for (right in nums.indices) {\n        count[nums[right]] = (count[nums[right]] ?: 0) + 1\n\n        while (count.size > k) {\n            count[nums[left]] = count[nums[left]]!! - 1\n            if (count[nums[left]] == 0) {\n                count.remove(nums[left])\n            }\n            left++\n        }\n\n        result += right - left + 1\n    }\n\n    return result\n}",
        dart: "int subarraysWithKDistinct(List<int> nums, int k) {\n  return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);\n}\n\nint atMostKDistinct(List<int> nums, int k) {\n  final count = <int, int>{};\n  int left = 0;\n  int result = 0;\n\n  for (int right = 0; right < nums.length; right++) {\n    count[nums[right]] = (count[nums[right]] ?? 0) + 1;\n\n    while (count.length > k) {\n      count[nums[left]] = count[nums[left]]! - 1;\n      if (count[nums[left]] == 0) {\n        count.remove(nums[left]);\n      }\n      left++;\n    }\n\n    result += right - left + 1;\n  }\n\n  return result;\n}",
        swift: "func subarraysWithKDistinct(_ nums: [Int], _ k: Int) -> Int {\n    return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1)\n}\n\nfunc atMostKDistinct(_ nums: [Int], _ k: Int) -> Int {\n    var count: [Int: Int] = [:]\n    var left = 0\n    var result = 0\n\n    for right in 0..<nums.count {\n        count[nums[right], default: 0] += 1\n\n        while count.count > k {\n            count[nums[left]]! -= 1\n            if count[nums[left]] == 0 {\n                count.removeValue(forKey: nums[left])\n            }\n            left += 1\n        }\n\n        result += right - left + 1\n    }\n\n    return result\n}",
        haskell: "subarraysWithKDistinct :: [Int] -> Int -> Int\nsubarraysWithKDistinct nums k = atMostKDistinct nums k - atMostKDistinct nums (k - 1)\n\natMostKDistinct :: [Int] -> Int -> Int\natMostKDistinct nums k = go 0 0 M.empty 0 where\n  go left right freq result\n    | right == length nums = result\n    | otherwise =\n        let freq' = M.insertWith (+) (nums !! right) 1 freq\n            (freq'', left') = if M.size freq' > k\n                              then let f = M.adjust (\\x -> x - 1) (nums !! left) freq'\n                                   in (if M.findWithDefault 0 (nums !! left) f == 0\n                                       then M.delete (nums !! left) f else f, left + 1)\n                              else (freq', left)\n        in go left' (right + 1) freq'' (result + (right - left' + 1))"
      }
    },
    {
      id: 20,
      title: 'Count of Smaller Numbers After Self',
      difficulty: 'hard',
      tags: ['hash-map', 'binary-search', 'merge-sort'],
      description: 'For each element, count numbers after it that are smaller.',
      examples: [
        {
          input: 'nums = [5,2,6,1]',
          output: '[2,1,1,0]',
          explanation: 'Smaller counts: 2 (2,1), 2 (1), 6 (1), 1 (0)'
        }
      ],
      constraints: ['1 <= nums.length <= 5 * 10^4'],
      hint: 'Merge sort or binary indexed tree. Process from right to left.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun countSmaller(nums: IntArray): List<Int> {\n    val result = MutableList(nums.size) { 0 }\n    val sortedNums = mutableListOf<Int>()\n\n    for (i in nums.size - 1 downTo 0) {\n        val pos = binarySearch(sortedNums, nums[i])\n        result[i] = pos\n        sortedNums.add(pos, nums[i])\n    }\n\n    return result\n}\n\nfun binarySearch(nums: MutableList<Int>, target: Int): Int {\n    var left = 0\n    var right = nums.size\n    while (left < right) {\n        val mid = (left + right) / 2\n        if (nums[mid] < target) {\n            left = mid + 1\n        } else {\n            right = mid\n        }\n    }\n    return left\n}",
        dart: "List<int> countSmaller(List<int> nums) {\n  final result = List.filled(nums.length, 0);\n  final sortedNums = <int>[];\n\n  for (int i = nums.length - 1; i >= 0; i--) {\n    final pos = binarySearch(sortedNums, nums[i]);\n    result[i] = pos;\n    sortedNums.insert(pos, nums[i]);\n  }\n\n  return result;\n}\n\nint binarySearch(List<int> nums, int target) {\n  int left = 0, right = nums.length;\n  while (left < right) {\n    final mid = (left + right) ~/ 2;\n    if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid;\n    }\n  }\n  return left;\n}",
        swift: "func countSmaller(_ nums: [Int]) -> [Int] {\n    var result = Array(repeating: 0, count: nums.count)\n    var sortedNums: [Int] = []\n\n    for i in stride(from: nums.count - 1, through: 0, by: -1) {\n        let pos = binarySearch(&sortedNums, nums[i])\n        result[i] = pos\n        sortedNums.insert(nums[i], at: pos)\n    }\n\n    return result\n}\n\nfunc binarySearch(_ nums: inout [Int], _ target: Int) -> Int {\n    var left = 0, right = nums.count\n    while left < right {\n        let mid = (left + right) / 2\n        if nums[mid] < target {\n            left = mid + 1\n        } else {\n            right = mid\n        }\n    }\n    return left\n}",
        haskell: "countSmaller :: [Int] -> [Int]\ncountSmaller nums = reverse (go (reverse nums) [] []) where\n  go [] _ result = result\n  go (x:xs) sorted result =\n    let pos = binarySearchPos sorted x\n    in go xs (insertAt pos x sorted) (pos : result)\n\n  binarySearchPos sorted target = length (takeWhile (< target) sorted)\n\n  insertAt 0 x xs = x : xs\n  insertAt n x (y:ys) = y : insertAt (n-1) x ys\n  insertAt _ x [] = [x]"
      }
    }
  ]
}
