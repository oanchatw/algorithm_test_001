export default {
  id: 20,
  year: 2,
  slug: 'string-algorithms',
  icon: '🔤',
  color: '#3fb950',
  title: 'String Algorithms',
  subtitle: 'KMP, Rabin-Karp, Z-Algorithm, Suffix Arrays, Tries',
  description: 'Advanced string matching and searching algorithms with linear-time pattern matching and efficient data structures.',
  theorems: [
    {
      id: 1,
      name: 'KMP Failure Function Correctness',
      katex_statement: 'f[i] = \\text{longest proper prefix of } P[0..i] \\text{ that is also suffix}',
      statement_text: 'KMP achieves O(n+m) by preprocessing pattern with failure function, avoiding character re-examination.',
      proof: 'When mismatch at j, shift pattern by (j - f[j-1]) positions. All positions before f[j-1] match, so no earlier position can match. Thus linear scans suffice.'
    },
    {
      id: 2,
      name: 'Rabin-Karp Expected O(n+m) with Rolling Hash',
      katex_statement: '\\text{Rolling hash: } h_i = (h_{i-1} - T[i-1] \\cdot b^{m-1}) \\cdot b + T[i+m-1]',
      statement_text: 'Hash-based matching with rolling hash compares in O(1) per position. With good hash function, expected time O(n+m).',
      proof: 'Rolling hash updates in O(1). Hash collision probability ≤ 1/p (prime base). Expected comparisons = O(n + m*occurrences).'
    },
    {
      id: 3,
      name: 'Suffix Array + LCP Array Construction',
      katex_statement: '\\text{Build suffix array in } O(n \\log n), \\text{ LCP in } O(n) \\text{ via Kasai algorithm}',
      statement_text: 'Suffix arrays enable O(n log n) construction and rich query capabilities via LCP array, providing practical alternative to suffix trees.',
      proof: 'Sort suffixes using comparison-based sort. LCP values decrease by known amounts when moving between sorted suffixes (Kasai insight). Combined O(n log n).'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'KMP Pattern Matching',
      difficulty: 'medium',
      tags: ['kmp', 'string-matching'],
      description: 'Find all occurrences of pattern in text using KMP algorithm.',
      examples: [
        { input: 'text="ABABDABACDABABCABAB", pattern="ABABCABAB"', output: '[10]' }
      ],
      constraints: 'text.length ≤ 100000, pattern.length ≤ 100000',
      hint: 'Build failure function. Use it to skip mismatches.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      solutions: {
        kotlin: "fun kmpSearch(text: String, pattern: String): List<Int> {\n  val n = text.length\n  val m = pattern.length\n  val fail = IntArray(m)\n\n  for (i in 1 until m) {\n    var j = fail[i - 1]\n    while (j > 0 && pattern[i] != pattern[j]) j = fail[j - 1]\n    if (pattern[i] == pattern[j]) j++\n    fail[i] = j\n  }\n\n  val result = mutableListOf<Int>()\n  var j = 0\n  for (i in 0 until n) {\n    while (j > 0 && text[i] != pattern[j]) j = fail[j - 1]\n    if (text[i] == pattern[j]) j++\n    if (j == m) {\n      result.add(i - m + 1)\n      j = fail[j - 1]\n    }\n  }\n\n  return result\n}",
        dart: "List<int> kmpSearch(String text, String pattern) {\n  int n = text.length, m = pattern.length;\n  List<int> fail = List<int>.filled(m, 0);\n\n  for (int i = 1; i < m; i++) {\n    int j = fail[i-1];\n    while (j > 0 && pattern[i] != pattern[j]) j = fail[j-1];\n    if (pattern[i] == pattern[j]) j++;\n    fail[i] = j;\n  }\n\n  List<int> result = [];\n  int j = 0;\n  for (int i = 0; i < n; i++) {\n    while (j > 0 && text[i] != pattern[j]) j = fail[j-1];\n    if (text[i] == pattern[j]) j++;\n    if (j == m) {\n      result.add(i - m + 1);\n      j = fail[j-1];\n    }\n  }\n\n  return result;\n}",
        swift: "func kmpSearch(_ text: String, _ pattern: String) -> [Int] {\n    let t = Array(text), p = Array(pattern)\n    let n = t.count, m = p.count\n    var fail = Array(repeating: 0, count: m)\n\n    for i in 1..<m {\n        var j = fail[i-1]\n        while j > 0 && p[i] != p[j] { j = fail[j-1] }\n        if p[i] == p[j] { j += 1 }\n        fail[i] = j\n    }\n\n    var result = [Int](), j = 0\n    for i in 0..<n {\n        while j > 0 && t[i] != p[j] { j = fail[j-1] }\n        if t[i] == p[j] { j += 1 }\n        if j == m {\n            result.append(i - m + 1)\n            j = fail[j-1]\n        }\n    }\n\n    return result\n}",
        haskell: "kmpSearch :: String -> String -> [Int]\nkmpSearch text pattern = go 0 0 []\n  where\n    fail = buildFailure pattern 0 1 [0]\n    buildFailure p j i acc | i == length p = acc\n                           | p !! i == p !! j = buildFailure p (j+1) (i+1) (acc ++ [j+1])\n                           | j == 0 = buildFailure p 0 (i+1) (acc ++ [0])\n                           | otherwise = buildFailure p (acc !! (j-1)) i acc\n\n    go i j result | i == length text = result\n                  | text !! i == pattern !! j = if j+1 == length pattern\n                                               then go (i+1) (fail !! (j-1)) (result ++ [i-length pattern+1])\n                                               else go (i+1) (j+1) result\n                  | j == 0 = go (i+1) 0 result\n                  | otherwise = go i (fail !! (j-1)) result"
      }
    },
    {
      id: 2,
      title: 'Rabin-Karp String Search',
      difficulty: 'medium',
      tags: ['rabin-karp', 'rolling-hash'],
      description: 'Find pattern occurrences using rolling hash.',
      examples: [
        { input: 'text="ABCCDDEFF", pattern="CDD"', output: '[2]' }
      ],
      constraints: 'length ≤ 100000',
      hint: 'Compute rolling hash. Compare hashes; verify on collision.',
      timeComplexity: 'O(n + m) average',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun rabinKarp(text: String, pattern: String): List<Int> {\n  val MOD = 1e9.toLong() + 7\n  val BASE = 256L\n  val n = text.length\n  val m = pattern.length\n\n  if (m > n) return emptyList()\n\n  var patternHash = 0L\n  var textHash = 0L\n  var pow = 1L\n\n  for (i in 0 until m) {\n    patternHash = (patternHash * BASE + pattern[i].code) % MOD\n    textHash = (textHash * BASE + text[i].code) % MOD\n    if (i < m - 1) pow = (pow * BASE) % MOD\n  }\n\n  val result = mutableListOf<Int>()\n\n  for (i in 0..n - m) {\n    if (patternHash == textHash) {\n      if (text.substring(i, i + m) == pattern) result.add(i)\n    }\n\n    if (i < n - m) {\n      textHash = ((textHash - text[i].code * pow) % MOD + MOD) % MOD\n      textHash = (textHash * BASE + text[i + m].code) % MOD\n    }\n  }\n\n  return result\n}",
        dart: "List<int> rabinKarp(String text, String pattern) {\n  int MOD = 1000000007;\n  int BASE = 256;\n  int n = text.length, m = pattern.length;\n\n  if (m > n) return [];\n\n  int patternHash = 0, textHash = 0, pow = 1;\n\n  for (int i = 0; i < m; i++) {\n    patternHash = (patternHash * BASE + pattern.codeUnitAt(i)) % MOD;\n    textHash = (textHash * BASE + text.codeUnitAt(i)) % MOD;\n    if (i < m - 1) pow = (pow * BASE) % MOD;\n  }\n\n  List<int> result = [];\n\n  for (int i = 0; i <= n - m; i++) {\n    if (patternHash == textHash) {\n      if (text.substring(i, i + m) == pattern) result.add(i);\n    }\n\n    if (i < n - m) {\n      textHash = ((textHash - text.codeUnitAt(i) * pow) % MOD + MOD) % MOD;\n      textHash = (textHash * BASE + text.codeUnitAt(i + m)) % MOD;\n    }\n  }\n\n  return result;\n}",
        swift: "func rabinKarp(_ text: String, _ pattern: String) -> [Int] {\n    let MOD: Int64 = 1000000007, BASE: Int64 = 256\n    let t = Array(text), p = Array(pattern)\n    let n = t.count, m = p.count\n\n    guard m <= n else { return [] }\n\n    var patternHash: Int64 = 0, textHash: Int64 = 0, pow: Int64 = 1\n\n    for i in 0..<m {\n        patternHash = (patternHash * BASE + Int64(t[i].asciiValue!)) % MOD\n        textHash = (textHash * BASE + Int64(t[i].asciiValue!)) % MOD\n        if i < m - 1 { pow = (pow * BASE) % MOD }\n    }\n\n    var result = [Int]()\n\n    for i in 0...(n-m) {\n        if patternHash == textHash {\n            if String(t[i..<i+m]) == pattern { result.append(i) }\n        }\n\n        if i < n - m {\n            textHash = ((textHash - Int64(t[i].asciiValue!) * pow) % MOD + MOD) % MOD\n            textHash = (textHash * BASE + Int64(t[i+m].asciiValue!)) % MOD\n        }\n    }\n\n    return result\n}",
        haskell: "rabinKarp :: String -> String -> [Int]\nrabinKarp text pattern = go 0 textHash []\n  where\n    mod = 1000000007\n    base = 256\n    n = length text\n    m = length pattern\n    pow = base ^ (m - 1) \\`mod\\` mod\n\n    patternHash = foldl (\\\\h c -> (h * base + fromEnum c) \\`mod\\` mod) 0 pattern\n    textHash = foldl (\\\\h c -> (h * base + fromEnum c) \\`mod\\` mod) 0 (take m text)\n\n    go i h result | i > n - m = result\n                  | h == patternHash && take m (drop i text) == pattern = go (i+1) h' (result ++ [i])\n                  | otherwise = go (i+1) h' result\n      where\n        h' = ((h - fromEnum (text !! i) * pow) \\`mod\\` mod + mod) \\`mod\\` mod * base + fromEnum (text !! (i+m))"
      }
    },
    {
      id: 3,
      title: 'Z-Algorithm String Matching',
      difficulty: 'medium',
      tags: ['z-algorithm'],
      description: 'Find pattern using Z-algorithm.',
      examples: [
        { input: 'text="ABABDABACDABABCABAB", pattern="ABABCABAB"', output: '[10]' }
      ],
      constraints: 'length ≤ 100000',
      hint: 'Compute Z-array: z[i] = length of longest string starting at i matching prefix.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m)',
      solutions: {
        kotlin: "fun zAlgorithm(text: String, pattern: String): List<Int> {\n  val combined = pattern + \"$\" + text\n  val z = IntArray(combined.length)\n  var l = 0\n  var r = 0\n\n  for (i in 1 until combined.length) {\n    if (i > r) {\n      l = i\n      r = i\n      while (r < combined.length && combined[r - l] == combined[r]) r++\n      z[i] = r - l\n      r--\n    } else {\n      val k = i - l\n      if (z[k] < r - i + 1) {\n        z[i] = z[k]\n      } else {\n        l = i\n        while (r < combined.length && combined[r - l] == combined[r]) r++\n        z[i] = r - l\n        r--\n      }\n    }\n  }\n\n  val result = mutableListOf<Int>()\n  for (i in pattern.length + 1 until combined.length) {\n    if (z[i] == pattern.length) result.add(i - pattern.length - 1)\n  }\n\n  return result\n}",
        dart: "List<int> zAlgorithm(String text, String pattern) {\n  String combined = pattern + \"$\" + text;\n  List<int> z = List<int>.filled(combined.length, 0);\n  int l = 0, r = 0;\n\n  for (int i = 1; i < combined.length; i++) {\n    if (i > r) {\n      l = i;\n      r = i;\n      while (r < combined.length && combined[r - l] == combined[r]) r++;\n      z[i] = r - l;\n      r--;\n    } else {\n      int k = i - l;\n      if (z[k] < r - i + 1) {\n        z[i] = z[k];\n      } else {\n        l = i;\n        while (r < combined.length && combined[r - l] == combined[r]) r++;\n        z[i] = r - l;\n        r--;\n      }\n    }\n  }\n\n  List<int> result = [];\n  for (int i = pattern.length + 1; i < combined.length; i++) {\n    if (z[i] == pattern.length) result.add(i - pattern.length - 1);\n  }\n\n  return result;\n}",
        swift: "func zAlgorithm(_ text: String, _ pattern: String) -> [Int] {\n    let combined = pattern + \"$\" + text\n    let chars = Array(combined)\n    var z = Array(repeating: 0, count: chars.count)\n    var l = 0, r = 0\n\n    for i in 1..<chars.count {\n        if i > r {\n            l = i; r = i\n            while r < chars.count && chars[r-l] == chars[r] { r += 1 }\n            z[i] = r - l; r -= 1\n        } else {\n            let k = i - l\n            if z[k] < r - i + 1 {\n                z[i] = z[k]\n            } else {\n                l = i\n                while r < chars.count && chars[r-l] == chars[r] { r += 1 }\n                z[i] = r - l; r -= 1\n            }\n        }\n    }\n\n    var result = [Int]()\n    for i in (pattern.count+1)..<chars.count {\n        if z[i] == pattern.count { result.append(i - pattern.count - 1) }\n    }\n\n    return result\n}",
        haskell: "zAlgorithm :: String -> String -> [Int]\nzAlgorithm text pattern = [i - length pattern - 1 | i <- [length pattern + 1..length combined - 1], z !! i == length pattern]\n  where\n    combined = pattern ++ \"$\" ++ text\n    z = go 0 0 1 (replicate (length combined) 0)\n\n    go l r i z | i >= length combined = z\n               | i > r = go i i (i+1) z'\n               | otherwise = go l r (i+1) z''\n      where\n        z' = computeZ l r i 0\n        z'' = if z !! (i - l) < r - i + 1 then z else computeZ i r (i+1) (z !! (i-l))"
      }
    },
    {
      id: 4,
      title: 'Longest Happy Prefix (KMP Failure Function)',
      difficulty: 'medium',
      tags: ['kmp', 'string'],
      description: 'Find longest prefix that is also suffix (without wraparound).',
      examples: [
        { input: 's = "ababab"', output: '"abab"' }
      ],
      constraints: '2 ≤ s.length ≤ 500000',
      hint: 'Build KMP failure function. Last value is answer.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun longestPrefix(s: String): String {\n  val n = s.length\n  val fail = IntArray(n)\n\n  for (i in 1 until n) {\n    var j = fail[i - 1]\n    while (j > 0 && s[i] != s[j]) j = fail[j - 1]\n    if (s[i] == s[j]) j++\n    fail[i] = j\n  }\n\n  return s.substring(0, fail[n - 1])\n}",
        dart: "String longestPrefix(String s) {\n  int n = s.length;\n  List<int> fail = List<int>.filled(n, 0);\n\n  for (int i = 1; i < n; i++) {\n    int j = fail[i-1];\n    while (j > 0 && s[i] != s[j]) j = fail[j-1];\n    if (s[i] == s[j]) j++;\n    fail[i] = j;\n  }\n\n  return s.substring(0, fail[n-1]);\n}",
        swift: "func longestPrefix(_ s: String) -> String {\n    let n = s.count\n    var fail = Array(repeating: 0, count: n)\n    let chars = Array(s)\n\n    for i in 1..<n {\n        var j = fail[i-1]\n        while j > 0 && chars[i] != chars[j] { j = fail[j-1] }\n        if chars[i] == chars[j] { j += 1 }\n        fail[i] = j\n    }\n\n    return String(chars[0..<fail[n-1]])\n}",
        haskell: "longestPrefix :: String -> String\nlongestPrefix s = take (last fail) s\n  where\n    n = length s\n    fail = go 0 1 [0]\n    go j i acc | i == n = reverse acc\n               | s !! i == s !! j = go (j+1) (i+1) ((j+1):acc)\n               | j == 0 = go 0 (i+1) (0:acc)\n               | otherwise = go (acc !! (j-1)) i acc"
      }
    },
    {
      id: 5,
      title: 'Implement Trie',
      difficulty: 'medium',
      tags: ['trie', 'data-structure'],
      description: 'Insert and search words in Trie data structure.',
      examples: [
        { input: 'insert "apple", search "app"', output: 'false' }
      ],
      constraints: '1 ≤ word.length ≤ 100000',
      hint: 'Node = children map + isWord flag.',
      timeComplexity: 'O(word.length)',
      spaceComplexity: 'O(total_chars)',
      solutions: {
        kotlin: "class Trie {\n  data class TrieNode(val children: MutableMap<Char, TrieNode> = mutableMapOf(), var isWord: Boolean = false)\n\n  val root = TrieNode()\n\n  fun insert(word: String) {\n    var node = root\n    for (ch in word) {\n      node = node.children.getOrPut(ch) { TrieNode() }\n    }\n    node.isWord = true\n  }\n\n  fun search(word: String): Boolean {\n    var node = root\n    for (ch in word) {\n      node = node.children[ch] ?: return false\n    }\n    return node.isWord\n  }\n\n  fun startsWith(prefix: String): Boolean {\n    var node = root\n    for (ch in prefix) {\n      node = node.children[ch] ?: return false\n    }\n    return true\n  }\n}",
        dart: "class TrieNode {\n  Map<String, TrieNode> children = {};\n  bool isWord = false;\n}\n\nclass Trie {\n  late TrieNode root = TrieNode();\n\n  void insert(String word) {\n    TrieNode node = root;\n    for (String ch in word.split('')) {\n      node.children.putIfAbsent(ch, () => TrieNode());\n      node = node.children[ch]!;\n    }\n    node.isWord = true;\n  }\n\n  bool search(String word) {\n    TrieNode? node = root;\n    for (String ch in word.split('')) {\n      node = node?.children[ch];\n      if (node == null) return false;\n    }\n    return node.isWord;\n  }\n\n  bool startsWith(String prefix) {\n    TrieNode? node = root;\n    for (String ch in prefix.split('')) {\n      node = node?.children[ch];\n      if (node == null) return false;\n    }\n    return true;\n  }\n}",
        swift: "class TrieNode {\n    var children = [Character: TrieNode]()\n    var isWord = false\n}\n\nclass Trie {\n    let root = TrieNode()\n\n    func insert(_ word: String) {\n        var node = root\n        for ch in word {\n            if node.children[ch] == nil { node.children[ch] = TrieNode() }\n            node = node.children[ch]!\n        }\n        node.isWord = true\n    }\n\n    func search(_ word: String) -> Bool {\n        var node = root\n        for ch in word {\n            guard let next = node.children[ch] else { return false }\n            node = next\n        }\n        return node.isWord\n    }\n\n    func startsWith(_ prefix: String) -> Bool {\n        var node = root\n        for ch in prefix {\n            guard let next = node.children[ch] else { return false }\n            node = next\n        }\n        return true\n    }\n}",
        haskell: "data TrieNode = TrieNode { children :: Map Char TrieNode, isWord :: Bool } deriving (Show)\n\nemptyNode = TrieNode { children = Map.empty, isWord = False }\n\ninsert :: String -> TrieNode -> TrieNode\ninsert [] node = node { isWord = True }\ninsert (c:cs) node = node { children = Map.insertWith (\\\\_ old -> insert cs old) c (insert cs emptyNode) (children node) }\n\nsearch :: String -> TrieNode -> Bool\nsearch [] node = isWord node\nsearch (c:cs) node = case Map.lookup c (children node) of\n                      Nothing -> False\n                      Just next -> search cs next\n\nstartsWith :: String -> TrieNode -> Bool\nstartsWith [] _ = True\nstartsWith (c:cs) node = case Map.lookup c (children node) of\n                          Nothing -> False\n                          Just next -> startsWith cs next"
      }
    },
    {
      id: 6,
      title: 'Word Search II (Trie + DFS)',
      difficulty: 'hard',
      tags: ['trie', 'dfs', 'backtracking'],
      description: 'Find all words from word list in 2D board.',
      examples: [
        { input: 'board = [["o","a","a"],["e","t","a"],["t","a","r"]], words = ["oath","pea","eat","ra"]', output: '["oath","eat"]' }
      ],
      constraints: 'board ≤ 12×12, words ≤ 100',
      hint: 'Build Trie from words. DFS board + Trie simultaneously.',
      timeComplexity: 'O(m*n * 4^L) worst case',
      spaceComplexity: 'O(word_list_size)',
      solutions: {
        kotlin: "fun findWords(board: Array<CharArray>, words: Array<String>): List<String> {\n  data class TrieNode(val children: MutableMap<Char, TrieNode> = mutableMapOf(), var word: String? = null)\n\n  val root = TrieNode()\n  for (word in words) {\n    var node = root\n    for (ch in word) {\n      node = node.children.getOrPut(ch) { TrieNode() }\n    }\n    node.word = word\n  }\n\n  val result = mutableListOf<String>()\n  val rows = board.size\n  val cols = board[0].size\n\n  fun dfs(r: Int, c: Int, node: TrieNode) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols) return\n    val ch = board[r][c]\n    if (ch == '#') return\n\n    val next = node.children[ch] ?: return\n    if (next.word != null) {\n      result.add(next.word!!)\n      next.word = null\n    }\n\n    board[r][c] = '#'\n    dfs(r + 1, c, next)\n    dfs(r - 1, c, next)\n    dfs(r, c + 1, next)\n    dfs(r, c - 1, next)\n    board[r][c] = ch\n  }\n\n  for (i in 0 until rows) {\n    for (j in 0 until cols) {\n      dfs(i, j, root)\n    }\n  }\n\n  return result\n}",
        dart: "List<String> findWords(List<List<String>> board, List<String> words) {\n  class TrieNode {\n    Map<String, TrieNode> children = {};\n    String? word;\n  }\n\n  TrieNode root = TrieNode();\n  for (String w in words) {\n    TrieNode node = root;\n    for (String ch in w.split('')) {\n      node.children.putIfAbsent(ch, () => TrieNode());\n      node = node.children[ch]!;\n    }\n    node.word = w;\n  }\n\n  List<String> result = [];\n  int rows = board.length, cols = board[0].length;\n\n  void dfs(int r, int c, TrieNode node) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols) return;\n    String ch = board[r][c];\n    if (ch == '#') return;\n\n    TrieNode? next = node.children[ch];\n    if (next == null) return;\n    if (next.word != null) {\n      result.add(next.word!);\n      next.word = null;\n    }\n\n    board[r][c] = '#';\n    dfs(r+1, c, next);\n    dfs(r-1, c, next);\n    dfs(r, c+1, next);\n    dfs(r, c-1, next);\n    board[r][c] = ch;\n  }\n\n  for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n      dfs(i, j, root);\n    }\n  }\n\n  return result;\n}",
        swift: "func findWords(_ board: [[Character]], _ words: [String]) -> [String] {\n    class TrieNode {\n        var children = [Character: TrieNode]()\n        var word: String?\n    }\n\n    let root = TrieNode()\n    for w in words {\n        var node = root\n        for ch in w {\n            if node.children[ch] == nil { node.children[ch] = TrieNode() }\n            node = node.children[ch]!\n        }\n        node.word = w\n    }\n\n    var result = [String]()\n    var b = board\n    let rows = board.count, cols = board[0].count\n\n    func dfs(_ r: Int, _ c: Int, _ node: TrieNode) {\n        guard r >= 0, r < rows, c >= 0, c < cols else { return }\n        let ch = b[r][c]\n        guard ch != \"#\", let next = node.children[ch] else { return }\n        if let w = next.word {\n            result.append(w)\n            next.word = nil\n        }\n        b[r][c] = \"#\"\n        dfs(r+1, c, next); dfs(r-1, c, next); dfs(r, c+1, next); dfs(r, c-1, next)\n        b[r][c] = ch\n    }\n\n    for i in 0..<rows {\n        for j in 0..<cols {\n            dfs(i, j, root)\n        }\n    }\n\n    return result\n}",
        haskell: "findWords :: [[Char]] -> [String] -> [String]\nfindWords board words = dfsAll 0 0 root board\n  where\n    root = buildTrie words emptyNode\n    rows = length board\n    cols = length (head board)\n\n    dfsAll r c node b | r == rows = []\n                      | c == cols = dfsAll (r+1) 0 node b\n                      | otherwise = dfs r c node b\n\n    dfs r c node b | r < 0 || r >= rows || c < 0 || c >= cols = []\n                   | b !! r !! c == '#' = []\n                   | otherwise = -- Complex implementation needed"
      }
    },
    {
      id: 7,
      title: 'Minimum Window Substring',
      difficulty: 'hard',
      tags: ['sliding-window'],
      description: 'Find minimum window substring containing all target characters.',
      examples: [
        { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }
      ],
      constraints: 's.length, t.length ≤ 100000',
      hint: 'Sliding window with char counts. Expand right, shrink left.',
      timeComplexity: 'O(|s| + |t|)',
      spaceComplexity: 'O(|t|)',
      solutions: {
        kotlin: "fun minWindow(s: String, t: String): String {\n  val need = mutableMapOf<Char, Int>()\n  for (ch in t) need[ch] = need.getOrDefault(ch, 0) + 1\n\n  val window = mutableMapOf<Char, Int>()\n  var formed = 0\n  var required = need.size\n\n  var left = 0\n  var minLen = Int.MAX_VALUE\n  var minStart = 0\n\n  for (right in s.indices) {\n    val ch = s[right]\n    window[ch] = window.getOrDefault(ch, 0) + 1\n\n    if (ch in need && window[ch] == need[ch]) formed++\n\n    while (left <= right && formed == required) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1\n        minStart = left\n      }\n\n      val leftChar = s[left]\n      window[leftChar] = window[leftChar]!! - 1\n      if (leftChar in need && window[leftChar]!! < need[leftChar]!!) formed--\n\n      left++\n    }\n  }\n\n  return if (minLen == Int.MAX_VALUE) \"\" else s.substring(minStart, minStart + minLen)\n}",
        dart: "String minWindow(String s, String t) {\n  Map<String, int> need = {};\n  for (String ch in t.split('')) {\n    need[ch] = (need[ch] ?? 0) + 1;\n  }\n\n  Map<String, int> window = {};\n  int formed = 0, required = need.length;\n  int left = 0, minLen = 1<<30, minStart = 0;\n\n  for (int right = 0; right < s.length; right++) {\n    String ch = s[right];\n    window[ch] = (window[ch] ?? 0) + 1;\n\n    if (need.containsKey(ch) && window[ch] == need[ch]) formed++;\n\n    while (left <= right && formed == required) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        minStart = left;\n      }\n\n      String leftChar = s[left];\n      window[leftChar] = window[leftChar]! - 1;\n      if (need.containsKey(leftChar) && window[leftChar]! < need[leftChar]!) formed--;\n\n      left++;\n    }\n  }\n\n  return minLen == 1<<30 ? \"\" : s.substring(minStart, minStart + minLen);\n}",
        swift: "func minWindow(_ s: String, _ t: String) -> String {\n    var need = [Character: Int]()\n    for ch in t { need[ch, default: 0] += 1 }\n\n    var window = [Character: Int]()\n    var formed = 0, required = need.count\n    var left = 0, minLen = Int.max, minStart = 0\n\n    for (right, ch) in s.enumerated() {\n        window[ch, default: 0] += 1\n        if need[ch] != nil && window[ch] == need[ch] { formed += 1 }\n\n        while left <= right && formed == required {\n            if right - left + 1 < minLen {\n                minLen = right - left + 1\n                minStart = left\n            }\n\n            let leftChar = s[s.index(s.startIndex, offsetBy: left)]\n            window[leftChar]! -= 1\n            if need[leftChar] != nil && window[leftChar]! < need[leftChar]! { formed -= 1 }\n            left += 1\n        }\n    }\n\n    return minLen == Int.max ? \"\" : String(s[s.index(s.startIndex, offsetBy: minStart)..<s.index(s.startIndex, offsetBy: minStart+minLen)])\n}",
        haskell: "minWindow :: String -> String -> String\nminWindow s t = if minLen == maxBound then \"\" else take minLen (drop minStart s)\n  where\n    need = Map.fromListWith (+) [(c, 1) | c <- t]\n    go left right window formed result minLen minStart\n      | right == length s = result\n      | otherwise = let window' = Map.insertWith (+) (s !! right) 1 window\n                        formed' = if Map.findWithDefault 0 (s !! right) need > 0 &&\n                                    Map.findWithDefault 0 (s !! right) window' == Map.findWithDefault 0 (s !! right) need\n                                  then formed + 1 else formed\n                    in go' left right window' formed' result minLen minStart\n\n    go' left right window formed result minLen minStart\n      | formed == length need = let len = right - left + 1\n                               in if len < minLen\n                                  then go' (left+1) right window' formed' result len left\n                                  else go' (left+1) right window' formed' result minLen minStart\n      | otherwise = go (left+1) (right+1) window formed result minLen minStart"
      }
    },
    {
      id: 8,
      title: 'Longest Common Substring (DP)',
      difficulty: 'medium',
      tags: ['dp', 'string'],
      description: 'Find longest contiguous substring common to both strings.',
      examples: [
        { input: 'text1="abcde", text2="ace"', output: 'length=1 ("a", "c", or "e")' }
      ],
      constraints: 'length ≤ 1000',
      hint: 'DP: dp[i][j] = LCS length ending at text1[i] and text2[j].',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solutions: {
        kotlin: "fun longestCommonSubstring(text1: String, text2: String): Int {\n  val m = text1.length\n  val n = text2.length\n  val dp = Array(m + 1) { IntArray(n + 1) }\n\n  var maxLen = 0\n  for (i in 1..m) {\n    for (j in 1..n) {\n      if (text1[i - 1] == text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1\n        maxLen = maxOf(maxLen, dp[i][j])\n      }\n    }\n  }\n\n  return maxLen\n}",
        dart: "int longestCommonSubstring(String text1, String text2) {\n  int m = text1.length, n = text2.length;\n  List<List<int>> dp = List.generate(m+1, (_) => List<int>.filled(n+1, 0));\n\n  int maxLen = 0;\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (text1[i-1] == text2[j-1]) {\n        dp[i][j] = dp[i-1][j-1] + 1;\n        maxLen = max(maxLen, dp[i][j]);\n      }\n    }\n  }\n\n  return maxLen;\n}",
        swift: "func longestCommonSubstring(_ text1: String, _ text2: String) -> Int {\n    let chars1 = Array(text1), chars2 = Array(text2)\n    let m = chars1.count, n = chars2.count\n    var dp = Array(repeating: Array(repeating: 0, count: n+1), count: m+1)\n\n    var maxLen = 0\n    for i in 1...m {\n        for j in 1...n {\n            if chars1[i-1] == chars2[j-1] {\n                dp[i][j] = dp[i-1][j-1] + 1\n                maxLen = max(maxLen, dp[i][j])\n            }\n        }\n    }\n\n    return maxLen\n}",
        haskell: "longestCommonSubstring :: String -> String -> Int\nlongestCommonSubstring text1 text2 = maximum (0:concat dp)\n  where\n    m = length text1\n    n = length text2\n    dp = [[go i j | j <- [0..n]] | i <- [0..m]]\n    go 0 _ = 0\n    go _ 0 = 0\n    go i j | text1 !! (i-1) == text2 !! (j-1) = go (i-1) (j-1) + 1\n           | otherwise = 0"
      }
    },
    {
      id: 9,
      title: 'Regular Expression Matching',
      difficulty: 'hard',
      tags: ['dp', 'regex'],
      description: 'Match string against pattern with "." (any char) and "*" (zero or more).',
      examples: [
        { input: 's="aa", p="a"', output: 'false' },
        { input: 's="aa", p="a*"', output: 'true' }
      ],
      constraints: 's.length ≤ 500, p.length ≤ 500',
      hint: 'DP: dp[i][j] = match(s[0..i-1], p[0..j-1]).',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solutions: {
        kotlin: "fun isMatch(s: String, p: String): Boolean {\n  val m = s.length\n  val n = p.length\n  val dp = Array(m + 1) { BooleanArray(n + 1) }\n\n  dp[0][0] = true\n  for (j in 2..n step 2) {\n    if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2]\n  }\n\n  for (i in 1..m) {\n    for (j in 1..n) {\n      if (p[j - 1] == '*') {\n        dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'))\n      } else {\n        dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.')\n      }\n    }\n  }\n\n  return dp[m][n]\n}",
        dart: "bool isMatch(String s, String p) {\n  int m = s.length, n = p.length;\n  List<List<bool>> dp = List.generate(m+1, (_) => List<bool>.filled(n+1, false));\n\n  dp[0][0] = true;\n  for (int j = 2; j <= n; j += 2) {\n    if (p[j-1] == '*') dp[0][j] = dp[0][j-2];\n  }\n\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (p[j-1] == '*') {\n        dp[i][j] = dp[i][j-2] || (dp[i-1][j] && (s[i-1] == p[j-2] || p[j-2] == '.'));\n      } else {\n        dp[i][j] = dp[i-1][j-1] && (s[i-1] == p[j-1] || p[j-1] == '.');\n      }\n    }\n  }\n\n  return dp[m][n];\n}",
        swift: "func isMatch(_ s: String, _ p: String) -> Bool {\n    let sChars = Array(s), pChars = Array(p)\n    let m = sChars.count, n = pChars.count\n    var dp = Array(repeating: Array(repeating: false, count: n+1), count: m+1)\n\n    dp[0][0] = true\n    for j in stride(from: 2, through: n, by: 2) {\n        if pChars[j-1] == \"*\" { dp[0][j] = dp[0][j-2] }\n    }\n\n    for i in 1...m {\n        for j in 1...n {\n            if pChars[j-1] == \"*\" {\n                dp[i][j] = dp[i][j-2] || (dp[i-1][j] && (sChars[i-1] == pChars[j-2] || pChars[j-2] == \".\"))\n            } else {\n                dp[i][j] = dp[i-1][j-1] && (sChars[i-1] == pChars[j-1] || pChars[j-1] == \".\")\n            }\n        }\n    }\n\n    return dp[m][n]\n}",
        haskell: "isMatch :: String -> String -> Bool\nisMatch s p = dp !! length s !! length p\n  where\n    dp = [[match i j | j <- [0..length p]] | i <- [0..length s]]\n    match 0 0 = True\n    match i 0 = False\n    match 0 j | j >= 2 && p !! (j-1) == '*' = match 0 (j-2)\n              | otherwise = False\n    match i j\n      | j >= 2 && p !! (j-1) == '*' = match i (j-2) || (match (i-1) j && (s !! (i-1) == p !! (j-2) || p !! (j-2) == '.'))\n      | otherwise = match (i-1) (j-1) && (s !! (i-1) == p !! (j-1) || p !! (j-1) == '.')"
      }
    },
    {
      id: 10,
      title: 'Concatenated Words',
      difficulty: 'hard',
      tags: ['trie', 'dfs', 'word-break'],
      description: 'Find all concatenated words from list.',
      examples: [
        { input: 'words = ["cat","cats","catsdogcats","dog","catsdog","cattail","tail"]', output: '["catsdog","cattail","catsdogcats"]' }
      ],
      constraints: '1 ≤ words.length ≤ 10000',
      hint: 'For each word, check if it can be broken into other words (word break).',
      timeComplexity: 'O(n * m²) where n=words, m=word length',
      spaceComplexity: 'O(n * m)',
      solutions: {
        kotlin: "fun findAllConcatenatedWordsInADict(words: Array<String>): List<String> {\n  val wordSet = words.toSet()\n  val result = mutableListOf<String>()\n\n  fun canBreak(word: String): Boolean {\n    val dp = BooleanArray(word.length + 1)\n    dp[0] = true\n\n    for (i in 1..word.length) {\n      for (j in 0 until i) {\n        if (dp[j] && word.substring(j, i) in wordSet && (i < word.length || j > 0)) {\n          dp[i] = true\n          break\n        }\n      }\n    }\n\n    return dp[word.length]\n  }\n\n  for (word in words) {\n    if (canBreak(word)) result.add(word)\n  }\n\n  return result\n}",
        dart: "List<String> findAllConcatenatedWordsInADict(List<String> words) {\n  Set<String> wordSet = words.toSet();\n  List<String> result = [];\n\n  bool canBreak(String word) {\n    List<bool> dp = List<bool>.filled(word.length + 1, false);\n    dp[0] = true;\n\n    for (int i = 1; i <= word.length; i++) {\n      for (int j = 0; j < i; j++) {\n        if (dp[j] && wordSet.contains(word.substring(j, i)) && (i < word.length || j > 0)) {\n          dp[i] = true;\n          break;\n        }\n      }\n    }\n\n    return dp[word.length];\n  }\n\n  for (String word in words) {\n    if (canBreak(word)) result.add(word);\n  }\n\n  return result;\n}",
        swift: "func findAllConcatenatedWordsInADict(_ words: [String]) -> [String] {\n    let wordSet = Set(words)\n    var result = [String]()\n\n    func canBreak(_ word: String) -> Bool {\n        var dp = Array(repeating: false, count: word.count + 1)\n        dp[0] = true\n\n        for i in 1...word.count {\n            for j in 0..<i {\n                if dp[j] {\n                    let start = word.index(word.startIndex, offsetBy: j)\n                    let end = word.index(word.startIndex, offsetBy: i)\n                    let substr = String(word[start..<end])\n                    if wordSet.contains(substr) && (i < word.count || j > 0) {\n                        dp[i] = true\n                        break\n                    }\n                }\n            }\n        }\n\n        return dp[word.count]\n    }\n\n    for word in words {\n        if canBreak(word) { result.append(word) }\n    }\n\n    return result\n}",
        haskell: "findAllConcatenatedWordsInADict :: [String] -> [String]\nfindAllConcatenatedWordsInADict words = filter canBreak words\n  where\n    wordSet = Set.fromList words\n\n    canBreak word = dp !! length word\n      where\n        dp = [go i | i <- [0..length word]]\n        go 0 = True\n        go i = any (\\\\j -> dp !! j && Set.member (drop j (take i word)) wordSet && (i < length word || j > 0)) [0..i-1]"
      }
    }
  ]
}
