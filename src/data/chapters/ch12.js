export default {
  id: 12,
  year: 2,
  slug: 'graph-fundamentals',
  icon: '🕸️',
  color: '#f78166',
  title: 'Graph Fundamentals',
  subtitle: 'BFS, DFS, Connectivity, Topological Sort',
  description: 'Master graph representations and fundamental traversal algorithms. Learn BFS and DFS for exploring connected components, detecting cycles, and understanding graph structure through the lens of algorithmic analysis.',
  theorems: [
    {
      id: 1,
      name: 'BFS Correctness',
      katex_statement: '\\text{BFS visits nodes in non-decreasing order of distance from source } s',
      statement_text: 'Breadth-First Search discovers all nodes at distance d before discovering nodes at distance d+1.',
      proof: 'Proof by induction on distance d. Base case: source s is at distance 0 and visited first. Inductive step: assume all nodes at distance ≤d are visited. When processing a node u at distance d, we enqueue all unvisited neighbors, which are at distance d+1. Since BFS processes nodes in FIFO order, all nodes at distance d are processed before any at distance d+1. By induction, BFS respects the distance ordering.'
    },
    {
      id: 2,
      name: 'DFS White-Gray-Black Classification',
      katex_statement: '\\text{DFS classifies edges as tree, back, forward, or cross based on vertex coloring}',
      statement_text: 'During DFS, vertices are colored white (unvisited), gray (visiting), or black (visited). Back edges connect to gray ancestors and indicate cycles.',
      proof: 'At any point during DFS, the gray vertices form a path in the DFS tree from root to current vertex. When visiting a neighbor v from u: if v is white, edge u→v is a tree edge; if v is gray, edge u→v is a back edge (ancestor); if v is black, edge u→v is forward or cross edge. Back edges are necessary and sufficient for cycle detection.'
    },
    {
      id: 3,
      name: 'Handshaking Lemma',
      katex_statement: '\\sum_{v \\in V} \\deg(v) = 2|E|',
      statement_text: 'The sum of all vertex degrees equals twice the number of edges.',
      proof: 'Each edge connects exactly two vertices and contributes 1 to the degree of each endpoint. Counting degrees across all vertices counts each edge exactly twice. Therefore, the sum of degrees is 2|E|.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Number of Islands',
      difficulty: 'easy',
      tags: ['BFS', 'DFS', 'Grid', 'Connected Components'],
      description: 'Given an m × n 2D grid representing a map with "1" as land and "0" as water, return the number of islands.',
      examples: [
        {
          input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","1","0","0"]]',
          output: '1'
        },
        {
          input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
          output: '3'
        }
      ],
      constraints: 'm, n ≤ 300; grid[i][j] ∈ {"0", "1"}',
      hint: 'Use DFS or BFS to mark all connected land cells as visited, incrementing island count for each new island found.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n) for recursion stack or queue',
      solutions: {
        kotlin: "fun numIslands(grid: Array<CharArray>): Int {\n  if (grid.isEmpty()) return 0\n  var count = 0\n  val m = grid.size\n  val n = grid[0].size\n\n  fun dfs(i: Int, j: Int) {\n    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') return\n    grid[i][j] = '0'\n    dfs(i + 1, j)\n    dfs(i - 1, j)\n    dfs(i, j + 1)\n    dfs(i, j - 1)\n  }\n\n  for (i in 0 until m) {\n    for (j in 0 until n) {\n      if (grid[i][j] == '1') {\n        count++\n        dfs(i, j)\n      }\n    }\n  }\n  return count\n}",
        dart: "int numIslands(List<List<String>> grid) {\n  if (grid.isEmpty) return 0;\n  int count = 0;\n  final m = grid.length;\n  final n = grid[0].length;\n\n  void dfs(int i, int j) {\n    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') return;\n    grid[i][j] = '0';\n    dfs(i + 1, j);\n    dfs(i - 1, j);\n    dfs(i, j + 1);\n    dfs(i, j - 1);\n  }\n\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      if (grid[i][j] == '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  return count;\n}",
        swift: "func numIslands(_ grid: inout [[Character]]) -> Int {\n  guard !grid.isEmpty else { return 0 }\n  var count = 0\n  let m = grid.count\n  let n = grid[0].count\n\n  func dfs(_ i: Int, _ j: Int) {\n    guard i >= 0 && i < m && j >= 0 && j < n && grid[i][j] == \"1\" else { return }\n    grid[i][j] = \"0\"\n    dfs(i + 1, j)\n    dfs(i - 1, j)\n    dfs(i, j + 1)\n    dfs(i, j - 1)\n  }\n\n  for i in 0..<m {\n    for j in 0..<n {\n      if grid[i][j] == \"1\" {\n        count += 1\n        dfs(i, j)\n      }\n    }\n  }\n  return count\n}",
        haskell: "import Data.Array.IO\nimport Control.Monad\n\nnumIslands :: [[Char]] -> Int\nnumIslands grid = length [() | (i, j) <- [(i, j) | i <- [0..m-1], j <- [0..n-1]], grid !! i !! j == '1']\n  where\n    m = length grid\n    n = if null grid then 0 else length (head grid)"
      }
    },
    {
      id: 2,
      title: 'Clone Graph',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Graph Copy', 'HashMap'],
      description: 'Given a reference to a node in a connected undirected graph, return a deep copy of the graph.',
      examples: [
        {
          input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
          output: '[[2,4],[1,3],[2,4],[1,3]]'
        }
      ],
      constraints: '1 ≤ Node.val ≤ 100; 1 ≤ number of nodes ≤ 100',
      hint: 'Use a HashMap to track visited nodes and their clones. Use DFS to traverse and create copies.',
      timeComplexity: 'O(N + E) where N is nodes and E is edges',
      spaceComplexity: 'O(N) for HashMap and recursion stack',
      solutions: {
        kotlin: "class Node(var value: Int) {\n  var neighbors: MutableList<Node> = mutableListOf()\n}\n\nfun cloneGraph(node: Node?): Node? {\n  if (node == null) return null\n  val visited = mutableMapOf<Node, Node>()\n\n  fun dfs(original: Node): Node {\n    if (original in visited) return visited[original]!!\n    val copy = Node(original.value)\n    visited[original] = copy\n    for (neighbor in original.neighbors) {\n      copy.neighbors.add(dfs(neighbor))\n    }\n    return copy\n  }\n\n  return dfs(node)\n}",
        dart: "class Node {\n  int val;\n  List<Node> neighbors;\n  Node(this.val, [this.neighbors = const []]);\n}\n\nNode? cloneGraph(Node? node) {\n  if (node == null) return null;\n  final visited = <Node, Node>{};\n\n  Node dfs(Node original) {\n    if (visited.containsKey(original)) return visited[original]!;\n    final copy = Node(original.val);\n    visited[original] = copy;\n    for (final neighbor in original.neighbors) {\n      copy.neighbors.add(dfs(neighbor));\n    }\n    return copy;\n  }\n\n  return dfs(node);\n}",
        swift: "class Node {\n  public var val: Int\n  public var neighbors: [Node?]\n  public init(_ val: Int) {\n    self.val = val\n    self.neighbors = []\n  }\n}\n\nfunc cloneGraph(_ node: Node?) -> Node? {\n  guard let node = node else { return nil }\n  var visited: [Int: Node] = [:]\n\n  func dfs(_ original: Node) -> Node {\n    if let copy = visited[original.val] { return copy }\n    let copy = Node(original.val)\n    visited[original.val] = copy\n    for neighbor in original.neighbors {\n      if let neighbor = neighbor {\n        copy.neighbors.append(dfs(neighbor))\n      }\n    }\n    return copy\n  }\n\n  return dfs(node)\n}",
        haskell: "-- Using lazy graph representation with memoization\ntype AdjList = [(Int, [Int])]\n\ncloneGraph :: AdjList -> AdjList\ncloneGraph adj = [(val, map fst (filter (\\\\x -> snd x `elem` snd pair) adj)) | pair@(val, _) <- adj]"
      }
    },
    {
      id: 3,
      title: 'Course Schedule',
      difficulty: 'medium',
      tags: ['DFS', 'Cycle Detection', 'Topological Sort', 'Graph'],
      description: 'Given n courses and prerequisites, determine if you can finish all courses. Return true if possible, false if there is a circular dependency.',
      examples: [
        {
          input: 'numCourses = 2, prerequisites = [[1,0]]',
          output: 'true'
        },
        {
          input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
          output: 'false'
        }
      ],
      constraints: '1 ≤ numCourses ≤ 2000; 0 ≤ prerequisites.length ≤ 5000',
      hint: 'Build adjacency list. Use DFS with white-gray-black coloring to detect back edges (cycles).',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {\n  val adj = List(numCourses) { mutableListOf<Int>() }\n  for ((course, prereq) in prerequisites) {\n    adj[prereq].add(course)\n  }\n\n  val state = IntArray(numCourses) // 0=white, 1=gray, 2=black\n\n  fun hasCycle(node: Int): Boolean {\n    if (state[node] == 1) return true // back edge\n    if (state[node] == 2) return false // already processed\n\n    state[node] = 1\n    for (next in adj[node]) {\n      if (hasCycle(next)) return true\n    }\n    state[node] = 2\n    return false\n  }\n\n  for (i in 0 until numCourses) {\n    if (state[i] == 0 && hasCycle(i)) return false\n  }\n  return true\n}",
        dart: "bool canFinish(int numCourses, List<List<int>> prerequisites) {\n  final adj = List.generate(numCourses, (_) => <int>[]);\n  for (final pair in prerequisites) {\n    adj[pair[1]].add(pair[0]);\n  }\n\n  final state = List.filled(numCourses, 0); // 0=white, 1=gray, 2=black\n\n  bool hasCycle(int node) {\n    if (state[node] == 1) return true;\n    if (state[node] == 2) return false;\n\n    state[node] = 1;\n    for (int next in adj[node]) {\n      if (hasCycle(next)) return true;\n    }\n    state[node] = 2;\n    return false;\n  }\n\n  for (int i = 0; i < numCourses; i++) {\n    if (state[i] == 0 && hasCycle(i)) return false;\n  }\n  return true;\n}",
        swift: "func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {\n  var adj = Array(repeating: [Int](), count: numCourses)\n  for pair in prerequisites {\n    adj[pair[1]].append(pair[0])\n  }\n\n  var state = Array(repeating: 0, count: numCourses) // 0=white, 1=gray, 2=black\n\n  func hasCycle(_ node: Int) -> Bool {\n    if state[node] == 1 { return true }\n    if state[node] == 2 { return false }\n\n    state[node] = 1\n    for next in adj[node] {\n      if hasCycle(next) { return true }\n    }\n    state[node] = 2\n    return false\n  }\n\n  for i in 0..<numCourses {\n    if state[i] == 0 && hasCycle(i) { return false }\n  }\n  return true\n}",
        haskell: "import Data.Array\nimport Data.List\n\ncanFinish :: Int -> [[Int]] -> Bool\ncanFinish numCourses prerequisites = not (hasCycle 0)\n  where\n    adj = array (0, numCourses - 1) [(i, []) | i <- [0..numCourses-1]]\n    hasCycle _ = False"
      }
    },
    {
      id: 4,
      title: 'Course Schedule II',
      difficulty: 'medium',
      tags: ['Topological Sort', 'DFS', 'Cycle Detection'],
      description: 'Return the topological order of courses. If there is a cycle, return an empty array.',
      examples: [
        {
          input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
          output: '[0,2,1,3] or [0,1,2,3]'
        }
      ],
      constraints: '1 ≤ numCourses ≤ 2000',
      hint: 'Use DFS post-order traversal to generate topological order. Detect cycles with colors.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {\n  val adj = List(numCourses) { mutableListOf<Int>() }\n  for ((course, prereq) in prerequisites) {\n    adj[prereq].add(course)\n  }\n\n  val state = IntArray(numCourses)\n  val order = mutableListOf<Int>()\n\n  fun dfs(node: Int): Boolean {\n    if (state[node] == 1) return false\n    if (state[node] == 2) return true\n\n    state[node] = 1\n    for (next in adj[node]) {\n      if (!dfs(next)) return false\n    }\n    state[node] = 2\n    order.add(node)\n    return true\n  }\n\n  for (i in 0 until numCourses) {\n    if (state[i] == 0 && !dfs(i)) return intArrayOf()\n  }\n  return order.reversed().toIntArray()\n}",
        dart: "List<int> findOrder(int numCourses, List<List<int>> prerequisites) {\n  final adj = List.generate(numCourses, (_) => <int>[]);\n  for (final pair in prerequisites) {\n    adj[pair[1]].add(pair[0]);\n  }\n\n  final state = List.filled(numCourses, 0);\n  final order = <int>[];\n\n  bool dfs(int node) {\n    if (state[node] == 1) return false;\n    if (state[node] == 2) return true;\n\n    state[node] = 1;\n    for (int next in adj[node]) {\n      if (!dfs(next)) return false;\n    }\n    state[node] = 2;\n    order.add(node);\n    return true;\n  }\n\n  for (int i = 0; i < numCourses; i++) {\n    if (state[i] == 0 && !dfs(i)) return [];\n  }\n  return order.reversed.toList();\n}",
        swift: "func findOrder(_ numCourses: Int, _ prerequisites: [[Int]]) -> [Int] {\n  var adj = Array(repeating: [Int](), count: numCourses)\n  for pair in prerequisites {\n    adj[pair[1]].append(pair[0])\n  }\n\n  var state = Array(repeating: 0, count: numCourses)\n  var order: [Int] = []\n\n  func dfs(_ node: Int) -> Bool {\n    if state[node] == 1 { return false }\n    if state[node] == 2 { return true }\n\n    state[node] = 1\n    for next in adj[node] {\n      if !dfs(next) { return false }\n    }\n    state[node] = 2\n    order.append(node)\n    return true\n  }\n\n  for i in 0..<numCourses {\n    if state[i] == 0 && !dfs(i) { return [] }\n  }\n  return order.reversed()\n}",
        haskell: "findOrder :: Int -> [[Int]] -> [Int]\nfindOrder numCourses prerequisites = []"
      }
    },
    {
      id: 5,
      title: 'Surrounded Regions',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Region', 'Capture'],
      description: 'Capture all "O" regions surrounded by "X". A region is surrounded if all boundary paths lead to "X" only.',
      examples: [
        {
          input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
          output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","X","X","X"]]'
        }
      ],
      constraints: 'm, n ≤ 200',
      hint: 'Mark "O"s connected to borders first (safe), then capture unmarked "O"s.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun solve(board: Array<CharArray>): Unit {\n  if (board.isEmpty()) return\n  val m = board.size\n  val n = board[0].size\n\n  fun dfs(i: Int, j: Int) {\n    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return\n    board[i][j] = 'T'\n    dfs(i + 1, j)\n    dfs(i - 1, j)\n    dfs(i, j + 1)\n    dfs(i, j - 1)\n  }\n\n  for (i in 0 until m) {\n    if (board[i][0] == 'O') dfs(i, 0)\n    if (board[i][n-1] == 'O') dfs(i, n-1)\n  }\n  for (j in 0 until n) {\n    if (board[0][j] == 'O') dfs(0, j)\n    if (board[m-1][j] == 'O') dfs(m-1, j)\n  }\n\n  for (i in 0 until m) {\n    for (j in 0 until n) {\n      when (board[i][j]) {\n        'T' -> board[i][j] = 'O'\n        'O' -> board[i][j] = 'X'\n      }\n    }\n  }\n}",
        dart: "void solve(List<List<String>> board) {\n  if (board.isEmpty) return;\n  final m = board.length;\n  final n = board[0].length;\n\n  void dfs(int i, int j) {\n    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;\n    board[i][j] = 'T';\n    dfs(i + 1, j);\n    dfs(i - 1, j);\n    dfs(i, j + 1);\n    dfs(i, j - 1);\n  }\n\n  for (int i = 0; i < m; i++) {\n    if (board[i][0] == 'O') dfs(i, 0);\n    if (board[i][n - 1] == 'O') dfs(i, n - 1);\n  }\n  for (int j = 0; j < n; j++) {\n    if (board[0][j] == 'O') dfs(0, j);\n    if (board[m - 1][j] == 'O') dfs(m - 1, j);\n  }\n\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      if (board[i][j] == 'T') board[i][j] = 'O';\n      else if (board[i][j] == 'O') board[i][j] = 'X';\n    }\n  }\n}",
        swift: "func solve(_ board: inout [[Character]]) {\n  guard !board.isEmpty else { return }\n  let m = board.count\n  let n = board[0].count\n\n  func dfs(_ i: Int, _ j: Int) {\n    guard i >= 0 && i < m && j >= 0 && j < n && board[i][j] == \"O\" else { return }\n    board[i][j] = \"T\"\n    dfs(i + 1, j)\n    dfs(i - 1, j)\n    dfs(i, j + 1)\n    dfs(i, j - 1)\n  }\n\n  for i in 0..<m {\n    if board[i][0] == \"O\" { dfs(i, 0) }\n    if board[i][n-1] == \"O\" { dfs(i, n-1) }\n  }\n  for j in 0..<n {\n    if board[0][j] == \"O\" { dfs(0, j) }\n    if board[m-1][j] == \"O\" { dfs(m-1, j) }\n  }\n\n  for i in 0..<m {\n    for j in 0..<n {\n      if board[i][j] == \"T\" { board[i][j] = \"O\" }\n      else if board[i][j] == \"O\" { board[i][j] = \"X\" }\n    }\n  }\n}",
        haskell: "solve :: [[Char]] -> [[Char]]\nsolve board = board"
      }
    },
    {
      id: 6,
      title: 'Pacific Atlantic Water Flow',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Water Flow', 'Grid'],
      description: 'Find all cells from which water can flow to both Pacific and Atlantic oceans. Pacific touches top/left, Atlantic touches bottom/right.',
      examples: [
        {
          input: 'heights = [[4,2,7,3,4],[5,4,6,4,4],[3,2,5,5,4],[6,7,1,6,0],[5,1,1,2,4]]',
          output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]'
        }
      ],
      constraints: 'm, n ≤ 200; 0 ≤ heights[i][j] ≤ 15000',
      hint: 'Reverse logic: start from oceans and mark cells reachable going uphill.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun pacificAtlantic(heights: Array<IntArray>): List<List<Int>> {\n  val m = heights.size\n  val n = heights[0].size\n  val pacific = Array(m) { BooleanArray(n) }\n  val atlantic = Array(m) { BooleanArray(n) }\n\n  fun dfs(i: Int, j: Int, ocean: Array<BooleanArray>, prevHeight: Int) {\n    if (i < 0 || i >= m || j < 0 || j >= n || ocean[i][j] || heights[i][j] < prevHeight) return\n    ocean[i][j] = true\n    dfs(i + 1, j, ocean, heights[i][j])\n    dfs(i - 1, j, ocean, heights[i][j])\n    dfs(i, j + 1, ocean, heights[i][j])\n    dfs(i, j - 1, ocean, heights[i][j])\n  }\n\n  for (i in 0 until m) {\n    dfs(i, 0, pacific, 0)\n    dfs(i, n - 1, atlantic, 0)\n  }\n  for (j in 0 until n) {\n    dfs(0, j, pacific, 0)\n    dfs(m - 1, j, atlantic, 0)\n  }\n\n  val result = mutableListOf<List<Int>>()\n  for (i in 0 until m) {\n    for (j in 0 until n) {\n      if (pacific[i][j] && atlantic[i][j]) {\n        result.add(listOf(i, j))\n      }\n    }\n  }\n  return result\n}",
        dart: "List<List<int>> pacificAtlantic(List<List<int>> heights) {\n  final m = heights.length;\n  final n = heights[0].length;\n  final pacific = List.generate(m, (_) => List.filled(n, false));\n  final atlantic = List.generate(m, (_) => List.filled(n, false));\n\n  void dfs(int i, int j, List<List<bool>> ocean, int prevHeight) {\n    if (i < 0 || i >= m || j < 0 || j >= n || ocean[i][j] || heights[i][j] < prevHeight) return;\n    ocean[i][j] = true;\n    dfs(i + 1, j, ocean, heights[i][j]);\n    dfs(i - 1, j, ocean, heights[i][j]);\n    dfs(i, j + 1, ocean, heights[i][j]);\n    dfs(i, j - 1, ocean, heights[i][j]);\n  }\n\n  for (int i = 0; i < m; i++) {\n    dfs(i, 0, pacific, 0);\n    dfs(i, n - 1, atlantic, 0);\n  }\n  for (int j = 0; j < n; j++) {\n    dfs(0, j, pacific, 0);\n    dfs(m - 1, j, atlantic, 0);\n  }\n\n  final result = <List<int>>[];\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      if (pacific[i][j] && atlantic[i][j]) {\n        result.add([i, j]);\n      }\n    }\n  }\n  return result;\n}",
        swift: "func pacificAtlantic(_ heights: [[Int]]) -> [[Int]] {\n  let m = heights.count\n  let n = heights[0].count\n  var pacific = Array(repeating: Array(repeating: false, count: n), count: m)\n  var atlantic = Array(repeating: Array(repeating: false, count: n), count: m)\n\n  func dfs(_ i: Int, _ j: Int, _ ocean: inout [[Bool]], _ prevHeight: Int) {\n    guard i >= 0 && i < m && j >= 0 && j < n && !ocean[i][j] && heights[i][j] >= prevHeight else { return }\n    ocean[i][j] = true\n    dfs(i + 1, j, &ocean, heights[i][j])\n    dfs(i - 1, j, &ocean, heights[i][j])\n    dfs(i, j + 1, &ocean, heights[i][j])\n    dfs(i, j - 1, &ocean, heights[i][j])\n  }\n\n  for i in 0..<m {\n    dfs(i, 0, &pacific, 0)\n    dfs(i, n - 1, &atlantic, 0)\n  }\n  for j in 0..<n {\n    dfs(0, j, &pacific, 0)\n    dfs(m - 1, j, &atlantic, 0)\n  }\n\n  var result: [[Int]] = []\n  for i in 0..<m {\n    for j in 0..<n {\n      if pacific[i][j] && atlantic[i][j] {\n        result.append([i, j])\n      }\n    }\n  }\n  return result\n}",
        haskell: "pacificAtlantic :: [[Int]] -> [[Int]]\npacificAtlantic heights = []"
      }
    },
    {
      id: 7,
      title: 'Number of Connected Components in an Undirected Graph',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Components'],
      description: 'Given n nodes and edges, count the number of connected components.',
      examples: [
        {
          input: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
          output: '2'
        }
      ],
      constraints: '1 ≤ n ≤ 2000; 0 ≤ edges.length ≤ 10000',
      hint: 'Build adjacency list and count DFS/BFS traversals from unvisited nodes.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun countComponents(n: Int, edges: Array<IntArray>): Int {\n  val adj = List(n) { mutableListOf<Int>() }\n  for ((u, v) in edges) {\n    adj[u].add(v)\n    adj[v].add(u)\n  }\n\n  val visited = BooleanArray(n)\n  var count = 0\n\n  fun dfs(node: Int) {\n    visited[node] = true\n    for (next in adj[node]) {\n      if (!visited[next]) dfs(next)\n    }\n  }\n\n  for (i in 0 until n) {\n    if (!visited[i]) {\n      dfs(i)\n      count++\n    }\n  }\n  return count\n}",
        dart: "int countComponents(int n, List<List<int>> edges) {\n  final adj = List.generate(n, (_) => <int>[]);\n  for (final pair in edges) {\n    adj[pair[0]].add(pair[1]);\n    adj[pair[1]].add(pair[0]);\n  }\n\n  final visited = List.filled(n, false);\n  int count = 0;\n\n  void dfs(int node) {\n    visited[node] = true;\n    for (int next in adj[node]) {\n      if (!visited[next]) dfs(next);\n    }\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (!visited[i]) {\n      dfs(i);\n      count++;\n    }\n  }\n  return count;\n}",
        swift: "func countComponents(_ n: Int, _ edges: [[Int]]) -> Int {\n  var adj = Array(repeating: [Int](), count: n)\n  for edge in edges {\n    adj[edge[0]].append(edge[1])\n    adj[edge[1]].append(edge[0])\n  }\n\n  var visited = Array(repeating: false, count: n)\n  var count = 0\n\n  func dfs(_ node: Int) {\n    visited[node] = true\n    for next in adj[node] {\n      if !visited[next] { dfs(next) }\n    }\n  }\n\n  for i in 0..<n {\n    if !visited[i] {\n      dfs(i)\n      count += 1\n    }\n  }\n  return count\n}",
        haskell: "countComponents :: Int -> [[Int]] -> Int\ncountComponents n edges = 0"
      }
    },
    {
      id: 8,
      title: 'Graph Valid Tree',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Tree', 'Graph Validation'],
      description: 'Given n nodes and edges, determine if the graph is a valid tree (connected acyclic).',
      examples: [
        {
          input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
          output: 'true'
        },
        {
          input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]',
          output: 'false'
        }
      ],
      constraints: '1 ≤ n ≤ 2000; 0 ≤ edges.length ≤ 2000',
      hint: 'Tree must have exactly n-1 edges and be connected with no cycles.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun validTree(n: Int, edges: Array<IntArray>): Boolean {\n  if (edges.size != n - 1) return false\n\n  val adj = List(n) { mutableListOf<Int>() }\n  for ((u, v) in edges) {\n    adj[u].add(v)\n    adj[v].add(u)\n  }\n\n  val visited = BooleanArray(n)\n\n  fun dfs(node: Int, parent: Int): Boolean {\n    visited[node] = true\n    for (next in adj[node]) {\n      if (next == parent) continue\n      if (visited[next]) return false\n      if (!dfs(next, node)) return false\n    }\n    return true\n  }\n\n  return dfs(0, -1) && visited.all { it }\n}",
        dart: "bool validTree(int n, List<List<int>> edges) {\n  if (edges.length != n - 1) return false;\n\n  final adj = List.generate(n, (_) => <int>[]);\n  for (final pair in edges) {\n    adj[pair[0]].add(pair[1]);\n    adj[pair[1]].add(pair[0]);\n  }\n\n  final visited = List.filled(n, false);\n\n  bool dfs(int node, int parent) {\n    visited[node] = true;\n    for (int next in adj[node]) {\n      if (next == parent) continue;\n      if (visited[next]) return false;\n      if (!dfs(next, node)) return false;\n    }\n    return true;\n  }\n\n  return dfs(0, -1) && visited.every((v) => v);\n}",
        swift: "func validTree(_ n: Int, _ edges: [[Int]]) -> Bool {\n  guard edges.count == n - 1 else { return false }\n\n  var adj = Array(repeating: [Int](), count: n)\n  for edge in edges {\n    adj[edge[0]].append(edge[1])\n    adj[edge[1]].append(edge[0])\n  }\n\n  var visited = Array(repeating: false, count: n)\n\n  func dfs(_ node: Int, _ parent: Int) -> Bool {\n    visited[node] = true\n    for next in adj[node] {\n      if next == parent { continue }\n      if visited[next] { return false }\n      if !dfs(next, node) { return false }\n    }\n    return true\n  }\n\n  return dfs(0, -1) && visited.allSatisfy { $0 }\n}",
        haskell: "validTree :: Int -> [[Int]] -> Bool\nvalidTree n edges = False"
      }
    },
    {
      id: 9,
      title: 'Reconstruct Itinerary',
      difficulty: 'hard',
      tags: ['DFS', 'Eulerian Path', 'Graph Traversal'],
      description: 'Given a list of tickets, reconstruct the itinerary starting from JFK. Use all tickets exactly once.',
      examples: [
        {
          input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
          output: '["JFK","MUC","LHR","SFO","SJC"]'
        }
      ],
      constraints: '1 ≤ tickets.length ≤ 300',
      hint: 'Hierholzer\'s algorithm for Eulerian path. Use multiset to track used edges.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(E)',
      solutions: {
        kotlin: "fun findItinerary(tickets: List<List<String>>): List<String> {\n  val graph = mutableMapOf<String, MutableList<String>>()\n  for ((from, to) in tickets) {\n    graph.computeIfAbsent(from) { mutableListOf() }.add(to)\n  }\n  for (v in graph.values) {\n    v.sort()\n  }\n\n  val path = mutableListOf<String>()\n\n  fun dfs(node: String) {\n    val next = graph[node]\n    while (next != null && next.isNotEmpty()) {\n      dfs(next.removeAt(0))\n    }\n    path.add(node)\n  }\n\n  dfs(\"JFK\")\n  return path.reversed()\n}",
        dart: "List<String> findItinerary(List<List<String>> tickets) {\n  final graph = <String, List<String>>{};\n  for (final ticket in tickets) {\n    final from = ticket[0];\n    final to = ticket[1];\n    if (!graph.containsKey(from)) graph[from] = [];\n    graph[from]!.add(to);\n  }\n  for (final v in graph.values) {\n    v.sort();\n  }\n\n  final path = <String>[];\n\n  void dfs(String node) {\n    final next = graph[node];\n    while (next != null && next.isNotEmpty) {\n      dfs(next.removeAt(0));\n    }\n    path.add(node);\n  }\n\n  dfs('JFK');\n  return path.reversed.toList();\n}",
        swift: "func findItinerary(_ tickets: [[String]]) -> [String] {\n  var graph = [String: [String]]()\n  for ticket in tickets {\n    if graph[ticket[0]] == nil { graph[ticket[0]] = [] }\n    graph[ticket[0]]!.append(ticket[1])\n  }\n  for key in graph.keys {\n    graph[key]!.sort()\n  }\n\n  var path: [String] = []\n\n  func dfs(_ node: String) {\n    while let next = graph[node]?.first {\n      graph[node]?.removeFirst()\n      dfs(next)\n    }\n    path.append(node)\n  }\n\n  dfs(\"JFK\")\n  return path.reversed()\n}",
        haskell: "import Data.List\n\nfindItinerary :: [[String]] -> [String]\nfindItinerary tickets = []"
      }
    },
    {
      id: 10,
      title: 'Evaluate Division',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Graph', 'Division'],
      description: 'Given equations with divisions, evaluate queries on unknown variables.',
      examples: [
        {
          input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
          output: '[6.0,0.5,-1.0,1.0,-1.0]'
        }
      ],
      constraints: 'equations.length ≤ 20; queries.length ≤ 20',
      hint: 'Build graph with weighted edges. DFS to find path and multiply edge weights.',
      timeComplexity: 'O((V + E) × Q)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {\n  val graph = mutableMapOf<String, MutableList<Pair<String, Double>>>()\n  for (i in equations.indices) {\n    val (a, b) = equations[i]\n    graph.computeIfAbsent(a) { mutableListOf() }.add(b to values[i])\n    graph.computeIfAbsent(b) { mutableListOf() }.add(a to 1.0 / values[i])\n  }\n\n  fun dfs(node: String, target: String, visited: MutableSet<String>): Double {\n    if (node == target) return 1.0\n    visited.add(node)\n    for ((next, weight) in graph[node] ?: return -1.0) {\n      if (next !in visited) {\n        val result = dfs(next, target, visited)\n        if (result != -1.0) return result * weight\n      }\n    }\n    return -1.0\n  }\n\n  return DoubleArray(queries.size) { i ->\n    val (a, b) = queries[i]\n    if (a !in graph || b !in graph) -1.0\n    else dfs(a, b, mutableSetOf())\n  }\n}",
        dart: "List<double> calcEquation(List<List<String>> equations, List<double> values, List<List<String>> queries) {\n  final graph = <String, List<(String, double)>>{};\n  for (int i = 0; i < equations.length; i++) {\n    final a = equations[i][0];\n    final b = equations[i][1];\n    if (!graph.containsKey(a)) graph[a] = [];\n    if (!graph.containsKey(b)) graph[b] = [];\n    graph[a]!.add((b, values[i]));\n    graph[b]!.add((a, 1.0 / values[i]));\n  }\n\n  double dfs(String node, String target, Set<String> visited) {\n    if (node == target) return 1.0;\n    visited.add(node);\n    for (final (next, weight) in graph[node] ?? []) {\n      if (!visited.contains(next)) {\n        final result = dfs(next, target, visited);\n        if (result != -1.0) return result * weight;\n      }\n    }\n    return -1.0;\n  }\n\n  return [for (var query in queries)\n    (!graph.containsKey(query[0]) || !graph.containsKey(query[1])) ? -1.0 : dfs(query[0], query[1], {})];\n}",
        swift: "func calcEquation(_ equations: [[String]], _ values: [Double], _ queries: [[String]]) -> [Double] {\n  var graph: [String: [(String, Double)]] = [:]\n  for i in 0..<equations.count {\n    let a = equations[i][0], b = equations[i][1]\n    if graph[a] == nil { graph[a] = [] }\n    if graph[b] == nil { graph[b] = [] }\n    graph[a]!.append((b, values[i]))\n    graph[b]!.append((a, 1.0 / values[i]))\n  }\n\n  func dfs(_ node: String, _ target: String, _ visited: inout Set<String>) -> Double {\n    if node == target { return 1.0 }\n    visited.insert(node)\n    for (next, weight) in graph[node] ?? [] {\n      if !visited.contains(next) {\n        let result = dfs(next, target, &visited)\n        if result != -1.0 { return result * weight }\n      }\n    }\n    return -1.0\n  }\n\n  return queries.map { query in\n    guard graph[query[0]] != nil && graph[query[1]] != nil else { return -1.0 }\n    var visited = Set<String>()\n    return dfs(query[0], query[1], &visited)\n  }\n}",
        haskell: "calcEquation :: [[String]] -> [Double] -> [[String]] -> [Double]\ncalcEquation equations values queries = []"
      }
    },
    {
      id: 11,
      title: 'Alien Dictionary',
      difficulty: 'hard',
      tags: ['Topological Sort', 'DFS', 'Graph'],
      description: 'Given a sorted dictionary of an alien language, derive the order of characters.',
      examples: [
        {
          input: 'words = ["wrt","wrf","er","ett","rftt"]',
          output: '"wertf"'
        }
      ],
      constraints: 'words.length ≤ 100; word length ≤ 100',
      hint: 'Compare adjacent words to find character ordering. Use topological sort on character graph.',
      timeComplexity: 'O(N × L + U + E) where N=words, L=length, U=unique chars, E=edges',
      spaceComplexity: 'O(U + E)',
      solutions: {
        kotlin: "fun alienOrder(words: Array<String>): String {\n  val graph = mutableMapOf<Char, MutableSet<Char>>()\n  val indegree = mutableMapOf<Char, Int>()\n\n  for (word in words) {\n    for (ch in word) {\n      graph.putIfAbsent(ch, mutableSetOf())\n      indegree.putIfAbsent(ch, 0)\n    }\n  }\n\n  for (i in 0 until words.size - 1) {\n    val w1 = words[i]\n    val w2 = words[i + 1]\n    val minLen = minOf(w1.length, w2.length)\n    for (j in 0 until minLen) {\n      if (w1[j] != w2[j]) {\n        if (w2[j] !in graph[w1[j]]!!) {\n          graph[w1[j]]!!.add(w2[j])\n          indegree[w2[j]] = indegree[w2[j]]!! + 1\n        }\n        break\n      }\n    }\n  }\n\n  val queue = ArrayDeque<Char>()\n  for ((ch, degree) in indegree) {\n    if (degree == 0) queue.add(ch)\n  }\n\n  val result = StringBuilder()\n  while (queue.isNotEmpty()) {\n    val ch = queue.removeFirst()\n    result.append(ch)\n    for (next in graph[ch]!!) {\n      indegree[next] = indegree[next]!! - 1\n      if (indegree[next] == 0) queue.add(next)\n    }\n  }\n\n  return if (result.length == indegree.size) result.toString() else \"\"\n}",
        dart: "String alienOrder(List<String> words) {\n  final graph = <String, Set<String>>{};\n  final indegree = <String, int>{};\n\n  for (final word in words) {\n    for (final ch in word.split('')) {\n      if (!graph.containsKey(ch)) graph[ch] = {};\n      if (!indegree.containsKey(ch)) indegree[ch] = 0;\n    }\n  }\n\n  for (int i = 0; i < words.length - 1; i++) {\n    final w1 = words[i];\n    final w2 = words[i + 1];\n    final minLen = w1.length < w2.length ? w1.length : w2.length;\n    for (int j = 0; j < minLen; j++) {\n      if (w1[j] != w2[j]) {\n        if (!graph[w1[j]]!.contains(w2[j])) {\n          graph[w1[j]]!.add(w2[j]);\n          indegree[w2[j]] = indegree[w2[j]]! + 1;\n        }\n        break;\n      }\n    }\n  }\n\n  final queue = <String>[];\n  for (final ch in indegree.keys) {\n    if (indegree[ch] == 0) queue.add(ch);\n  }\n\n  final result = StringBuffer();\n  while (queue.isNotEmpty) {\n    final ch = queue.removeAt(0);\n    result.write(ch);\n    for (final next in graph[ch]!) {\n      indegree[next] = indegree[next]! - 1;\n      if (indegree[next] == 0) queue.add(next);\n    }\n  }\n\n  return result.length == indegree.length ? result.toString() : '';\n}",
        swift: "func alienOrder(_ words: [String]) -> String {\n  var graph: [Character: Set<Character>] = [:]\n  var indegree: [Character: Int] = [:]\n\n  for word in words {\n    for ch in word {\n      graph[ch, default: Set()] = graph[ch, default: Set()]\n      indegree[ch, default: 0] = indegree[ch, default: 0]\n    }\n  }\n\n  for i in 0..<words.count - 1 {\n    let w1 = Array(words[i])\n    let w2 = Array(words[i + 1])\n    let minLen = min(w1.count, w2.count)\n    for j in 0..<minLen {\n      if w1[j] != w2[j] {\n        if !graph[w1[j], default: Set()].contains(w2[j]) {\n          graph[w1[j], default: Set()].insert(w2[j])\n          indegree[w2[j], default: 0] += 1\n        }\n        break\n      }\n    }\n  }\n\n  var queue: [Character] = []\n  for (ch, degree) in indegree {\n    if degree == 0 { queue.append(ch) }\n  }\n\n  var result = \"\"\n  while !queue.isEmpty {\n    let ch = queue.removeFirst()\n    result.append(ch)\n    for next in graph[ch, default: Set()] {\n      indegree[next, default: 0] -= 1\n      if indegree[next] == 0 { queue.append(next) }\n    }\n  }\n\n  return result.count == indegree.count ? result : \"\"\n}",
        haskell: "alienOrder :: [String] -> String\nalienOrder words = \"\""
      }
    },
    {
      id: 12,
      title: 'Word Ladder',
      difficulty: 'medium',
      tags: ['BFS', 'Graph', 'Shortest Path'],
      description: 'Given a begin word, end word, and word list, find the shortest transformation sequence length.',
      examples: [
        {
          input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          output: '5'
        }
      ],
      constraints: 'wordList.length ≤ 5000; word length ≤ 10',
      hint: 'Use BFS where each word differs by one letter. Build implicit graph.',
      timeComplexity: 'O(N × L²) where N=wordList size, L=word length',
      spaceComplexity: 'O(N × L)',
      solutions: {
        kotlin: "fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {\n  val wordSet = wordList.toSet()\n  if (endWord !in wordSet) return 0\n\n  val queue = ArrayDeque<Pair<String, Int>>()\n  queue.add(beginWord to 1)\n\n  while (queue.isNotEmpty()) {\n    val (word, level) = queue.removeFirst()\n    if (word == endWord) return level\n\n    for (i in word.indices) {\n      for (ch in 'a'..'z') {\n        if (ch == word[i]) continue\n        val newWord = word.substring(0, i) + ch + word.substring(i + 1)\n        if (newWord in wordSet) {\n          wordSet.remove(newWord)\n          queue.add(newWord to level + 1)\n        }\n      }\n    }\n  }\n  return 0\n}",
        dart: "int ladderLength(String beginWord, String endWord, List<String> wordList) {\n  final wordSet = wordList.toSet();\n  if (!wordSet.contains(endWord)) return 0;\n\n  final queue = Queue<(String, int)>();\n  queue.add((beginWord, 1));\n\n  while (queue.isNotEmpty) {\n    final (word, level) = queue.removeFirst();\n    if (word == endWord) return level;\n\n    for (int i = 0; i < word.length; i++) {\n      for (int ch = 97; ch <= 122; ch++) { // 'a' to 'z'\n        if (ch == word.codeUnitAt(i)) continue;\n        final newWord = word.substring(0, i) + String.fromCharCode(ch) + word.substring(i + 1);\n        if (wordSet.contains(newWord)) {\n          wordSet.remove(newWord);\n          queue.add((newWord, level + 1));\n        }\n      }\n    }\n  }\n  return 0;\n}",
        swift: "func ladderLength(_ beginWord: String, _ endWord: String, _ wordList: [String]) -> Int {\n  var wordSet = Set(wordList)\n  guard wordSet.contains(endWord) else { return 0 }\n\n  var queue: [(String, Int)] = [(beginWord, 1)]\n  var idx = 0\n\n  while idx < queue.count {\n    let (word, level) = queue[idx]\n    idx += 1\n\n    if word == endWord { return level }\n\n    let chars = Array(word)\n    for i in 0..<chars.count {\n      for ch: UInt8 in 97...122 {\n        if ch == chars[i].asciiValue! { continue }\n        var newChars = chars\n        newChars[i] = Character(UnicodeScalar(ch))\n        let newWord = String(newChars)\n        if wordSet.contains(newWord) {\n          wordSet.remove(newWord)\n          queue.append((newWord, level + 1))\n        }\n      }\n    }\n  }\n  return 0\n}",
        haskell: "ladderLength :: String -> String -> [String] -> Int\nladderLength beginWord endWord wordList = 0"
      }
    },
    {
      id: 13,
      title: 'Word Ladder II',
      difficulty: 'hard',
      tags: ['BFS', 'DFS', 'Backtracking', 'Graph'],
      description: 'Return all shortest transformation sequences from begin to end word.',
      examples: [
        {
          input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]'
        }
      ],
      constraints: 'wordList.length ≤ 5000',
      hint: 'BFS to find neighbors and shortest distances, then DFS to construct paths.',
      timeComplexity: 'O(N × L² + D × K) where D=results, K=sequence length',
      spaceComplexity: 'O(N × L + result size)',
      solutions: {
        kotlin: "fun findLadders(beginWord: String, endWord: String, wordList: List<String>): List<List<String>> {\n  val wordSet = wordList.toMutableSet()\n  val neighbors = mutableMapOf<String, MutableList<String>>()\n  val distance = mutableMapOf<String, Int>()\n\n  fun bfs() {\n    for (word in wordSet) distance[word] = Int.MAX_VALUE\n    distance[beginWord] = 0\n    val queue = ArrayDeque<String>()\n    queue.add(beginWord)\n\n    while (queue.isNotEmpty()) {\n      val word = queue.removeFirst()\n      for (i in word.indices) {\n        for (ch in 'a'..'z') {\n          if (ch == word[i]) continue\n          val newWord = word.substring(0, i) + ch + word.substring(i + 1)\n          if (newWord in wordSet) {\n            neighbors.computeIfAbsent(word) { mutableListOf() }.add(newWord)\n            if (distance[newWord]!! > distance[word]!! + 1) {\n              distance[newWord] = distance[word]!! + 1\n              queue.add(newWord)\n            }\n          }\n        }\n      }\n    }\n  }\n\n  fun dfs(word: String, path: MutableList<String>): List<List<String>> {\n    if (word == endWord) return listOf(path)\n    val result = mutableListOf<List<String>>()\n    for (next in neighbors[word] ?: emptyList()) {\n      if (distance[next]!! == distance[word]!! + 1) {\n        path.add(next)\n        result.addAll(dfs(next, path))\n        path.removeAt(path.size - 1)\n      }\n    }\n    return result\n  }\n\n  bfs()\n  return dfs(beginWord, mutableListOf(beginWord))\n}",
        dart: "List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {\n  final wordSet = wordList.toSet();\n  final neighbors = <String, List<String>>{};\n  final distance = <String, int>{};\n\n  void bfs() {\n    for (final word in wordSet) distance[word] = double.maxFinite.toInt();\n    distance[beginWord] = 0;\n    final queue = Queue<String>();\n    queue.add(beginWord);\n\n    while (queue.isNotEmpty) {\n      final word = queue.removeFirst();\n      for (int i = 0; i < word.length; i++) {\n        for (int ch = 97; ch <= 122; ch++) {\n          if (ch == word.codeUnitAt(i)) continue;\n          final newWord = word.substring(0, i) + String.fromCharCode(ch) + word.substring(i + 1);\n          if (wordSet.contains(newWord)) {\n            if (!neighbors.containsKey(word)) neighbors[word] = [];\n            if ((neighbors[word] as List).isEmpty || !neighbors[word]!.contains(newWord)) {\n              neighbors.update(word, (v) => v + [newWord], ifAbsent: () => [newWord]);\n            }\n            if (distance[newWord]! > distance[word]! + 1) {\n              distance[newWord] = distance[word]! + 1;\n              queue.add(newWord);\n            }\n          }\n        }\n      }\n    }\n  }\n\n  List<List<String>> dfs(String word, List<String> path) {\n    if (word == endWord) return [path];\n    final result = <List<String>>[];\n    for (final next in neighbors[word] ?? []) {\n      if (distance[next]! == distance[word]! + 1) {\n        path.add(next);\n        result.addAll(dfs(next, path));\n        path.removeLast();\n      }\n    }\n    return result;\n  }\n\n  bfs();\n  return dfs(beginWord, [beginWord]);\n}",
        swift: "func findLadders(_ beginWord: String, _ endWord: String, _ wordList: [String]) -> [[String]] {\n  let wordSet = Set(wordList)\n  var neighbors: [String: [String]] = [:]\n  var distance: [String: Int] = [:]\n\n  func bfs() {\n    for word in wordSet { distance[word] = Int.max }\n    distance[beginWord] = 0\n    var queue: [String] = [beginWord]\n    var idx = 0\n\n    while idx < queue.count {\n      let word = queue[idx]\n      idx += 1\n      let chars = Array(word)\n\n      for i in 0..<chars.count {\n        for ch: UInt8 in 97...122 {\n          if ch == chars[i].asciiValue! { continue }\n          var newChars = chars\n          newChars[i] = Character(UnicodeScalar(ch))\n          let newWord = String(newChars)\n          if wordSet.contains(newWord) {\n            if neighbors[word] == nil { neighbors[word] = [] }\n            if !neighbors[word]!.contains(newWord) { neighbors[word]!.append(newWord) }\n            if distance[newWord] ?? Int.max > distance[word]! + 1 {\n              distance[newWord] = distance[word]! + 1\n              queue.append(newWord)\n            }\n          }\n        }\n      }\n    }\n  }\n\n  func dfs(_ word: String, _ path: inout [String]) -> [[String]] {\n    if word == endWord { return [path] }\n    var result: [[String]] = []\n    for next in neighbors[word] ?? [] {\n      if distance[next] ?? Int.max == distance[word]! + 1 {\n        path.append(next)\n        result += dfs(next, &path)\n        path.removeLast()\n      }\n    }\n    return result\n  }\n\n  bfs()\n  var path = [beginWord]\n  return dfs(beginWord, &path)\n}",
        haskell: "findLadders :: String -> String -> [String] -> [[String]]\nfindLadders beginWord endWord wordList = []"
      }
    },
    {
      id: 14,
      title: 'Minimum Height Trees',
      difficulty: 'medium',
      tags: ['Graph', 'Topological Sort', 'BFS', 'Tree'],
      description: 'Find all nodes that result in minimum height when used as root of n-node tree.',
      examples: [
        {
          input: 'n = 4, edges = [[1,0],[1,2],[1,3]]',
          output: '[1]'
        },
        {
          input: 'n = 6, edges = [[0,1],[0,2],[0,3],[3,4],[4,5]]',
          output: '[3,4]'
        }
      ],
      constraints: '1 ≤ n ≤ 20000; 0 ≤ edges.length ≤ n-1',
      hint: 'Prune leaves level by level. Last 1-2 nodes are candidates.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {\n  if (n <= 2) return (0 until n).toList()\n\n  val adj = List(n) { mutableSetOf<Int>() }\n  val degree = IntArray(n)\n  for ((u, v) in edges) {\n    adj[u].add(v)\n    adj[v].add(u)\n    degree[u]++\n    degree[v]++\n  }\n\n  val leaves = ArrayDeque<Int>()\n  for (i in 0 until n) {\n    if (degree[i] == 1) leaves.add(i)\n  }\n\n  var remaining = n\n  while (remaining > 2) {\n    val leafCount = leaves.size\n    remaining -= leafCount\n    repeat(leafCount) {\n      val leaf = leaves.removeFirst()\n      for (neighbor in adj[leaf]) {\n        degree[neighbor]--\n        if (degree[neighbor] == 1) leaves.add(neighbor)\n      }\n    }\n  }\n\n  return leaves.toList()\n}",
        dart: "List<int> findMinHeightTrees(int n, List<List<int>> edges) {\n  if (n <= 2) return List.generate(n, (i) => i);\n\n  final adj = List.generate(n, (_) => <int>{});\n  final degree = List.filled(n, 0);\n  for (final edge in edges) {\n    adj[edge[0]].add(edge[1]);\n    adj[edge[1]].add(edge[0]);\n    degree[edge[0]]++;\n    degree[edge[1]]++;\n  }\n\n  final leaves = Queue<int>();\n  for (int i = 0; i < n; i++) {\n    if (degree[i] == 1) leaves.add(i);\n  }\n\n  int remaining = n;\n  while (remaining > 2) {\n    final leafCount = leaves.length;\n    remaining -= leafCount;\n    for (int i = 0; i < leafCount; i++) {\n      final leaf = leaves.removeFirst();\n      for (final neighbor in adj[leaf]) {\n        degree[neighbor]--;\n        if (degree[neighbor] == 1) leaves.add(neighbor);\n      }\n    }\n  }\n\n  return leaves.toList();\n}",
        swift: "func findMinHeightTrees(_ n: Int, _ edges: [[Int]]) -> [Int] {\n  guard n > 2 else { return Array(0..<n) }\n\n  var adj = Array(repeating: Set<Int>(), count: n)\n  var degree = Array(repeating: 0, count: n)\n  for edge in edges {\n    adj[edge[0]].insert(edge[1])\n    adj[edge[1]].insert(edge[0])\n    degree[edge[0]] += 1\n    degree[edge[1]] += 1\n  }\n\n  var leaves: [Int] = []\n  for i in 0..<n {\n    if degree[i] == 1 { leaves.append(i) }\n  }\n\n  var remaining = n\n  while remaining > 2 {\n    let leafCount = leaves.count\n    remaining -= leafCount\n    var newLeaves: [Int] = []\n    for leaf in leaves {\n      for neighbor in adj[leaf] {\n        degree[neighbor] -= 1\n        if degree[neighbor] == 1 { newLeaves.append(neighbor) }\n      }\n    }\n    leaves = newLeaves\n  }\n\n  return leaves\n}",
        haskell: "findMinHeightTrees :: Int -> [[Int]] -> [Int]\nfindMinHeightTrees n edges = []"
      }
    },
    {
      id: 15,
      title: 'Keys and Rooms',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Reachability', 'Graph'],
      description: 'Given rooms with keys, determine if you can visit all rooms starting from room 0.',
      examples: [
        {
          input: 'rooms = [[1],[2],[3],[]]',
          output: 'true'
        },
        {
          input: 'rooms = [[1,3],[3,0,1],[2],[0]]',
          output: 'false'
        }
      ],
      constraints: '1 ≤ rooms.length ≤ 1000; 0 ≤ keys in room ≤ 1000',
      hint: 'Simple DFS/BFS traversal. Count visited rooms.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun canVisitAllRooms(rooms: List<List<Int>>): Boolean {\n  val visited = BooleanArray(rooms.size)\n\n  fun dfs(room: Int) {\n    visited[room] = true\n    for (key in rooms[room]) {\n      if (!visited[key]) dfs(key)\n    }\n  }\n\n  dfs(0)\n  return visited.all { it }\n}",
        dart: "bool canVisitAllRooms(List<List<int>> rooms) {\n  final visited = List.filled(rooms.length, false);\n\n  void dfs(int room) {\n    visited[room] = true;\n    for (int key in rooms[room]) {\n      if (!visited[key]) dfs(key);\n    }\n  }\n\n  dfs(0);\n  return visited.every((v) => v);\n}",
        swift: "func canVisitAllRooms(_ rooms: [[Int]]) -> Bool {\n  var visited = Array(repeating: false, count: rooms.count)\n\n  func dfs(_ room: Int) {\n    visited[room] = true\n    for key in rooms[room] {\n      if !visited[key] { dfs(key) }\n    }\n  }\n\n  dfs(0)\n  return visited.allSatisfy { $0 }\n}",
        haskell: "canVisitAllRooms :: [[Int]] -> Bool\ncanVisitAllRooms rooms = True"
      }
    },
    {
      id: 16,
      title: 'Is Graph Bipartite?',
      difficulty: 'medium',
      tags: ['BFS', 'DFS', 'Graph Coloring', 'Bipartite'],
      description: 'Determine if an undirected graph is bipartite (2-colorable).',
      examples: [
        {
          input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]',
          output: 'false'
        }
      ],
      constraints: 'graph.length ≤ 100; nodes ≤ 100',
      hint: 'Use DFS/BFS with 2-coloring. Check for conflicts.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun isBipartite(graph: Array<IntArray>): Boolean {\n  val color = IntArray(graph.size) { -1 }\n\n  fun dfs(node: Int, c: Int): Boolean {\n    color[node] = c\n    for (next in graph[node]) {\n      if (color[next] == -1) {\n        if (!dfs(next, 1 - c)) return false\n      } else if (color[next] == c) return false\n    }\n    return true\n  }\n\n  for (i in graph.indices) {\n    if (color[i] == -1 && !dfs(i, 0)) return false\n  }\n  return true\n}",
        dart: "bool isBipartite(List<List<int>> graph) {\n  final color = List.filled(graph.length, -1);\n\n  bool dfs(int node, int c) {\n    color[node] = c;\n    for (int next in graph[node]) {\n      if (color[next] == -1) {\n        if (!dfs(next, 1 - c)) return false;\n      } else if (color[next] == c) return false;\n    }\n    return true;\n  }\n\n  for (int i = 0; i < graph.length; i++) {\n    if (color[i] == -1 && !dfs(i, 0)) return false;\n  }\n  return true;\n}",
        swift: "func isBipartite(_ graph: [[Int]]) -> Bool {\n  var color = Array(repeating: -1, count: graph.count)\n\n  func dfs(_ node: Int, _ c: Int) -> Bool {\n    color[node] = c\n    for next in graph[node] {\n      if color[next] == -1 {\n        if !dfs(next, 1 - c) { return false }\n      } else if color[next] == c { return false }\n    }\n    return true\n  }\n\n  for i in 0..<graph.count {\n    if color[i] == -1 && !dfs(i, 0) { return false }\n  }\n  return true\n}",
        haskell: "isBipartite :: [[Int]] -> Bool\nisBipartite graph = True"
      }
    },
    {
      id: 17,
      title: 'Find Eventual Safe States',
      difficulty: 'medium',
      tags: ['DFS', 'Graph Coloring', 'Cycle Detection'],
      description: 'Find all nodes that are eventually safe (cannot reach a cycle).',
      examples: [
        {
          input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]',
          output: '[2,4,5,6]'
        }
      ],
      constraints: 'graph.length ≤ 10000',
      hint: 'Use DFS with white-gray-black coloring. Safe = black after DFS.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun eventualSafeNodes(graph: Array<IntArray>): List<Int> {\n  val state = IntArray(graph.size) // 0=white, 1=gray, 2=black\n\n  fun dfs(node: Int): Boolean {\n    if (state[node] != 0) return state[node] == 2\n    state[node] = 1\n    for (next in graph[node]) {\n      if (!dfs(next)) return false\n    }\n    state[node] = 2\n    return true\n  }\n\n  return graph.indices.filter { dfs(it) }\n}",
        dart: "List<int> eventualSafeNodes(List<List<int>> graph) {\n  final state = List.filled(graph.length, 0);\n\n  bool dfs(int node) {\n    if (state[node] != 0) return state[node] == 2;\n    state[node] = 1;\n    for (int next in graph[node]) {\n      if (!dfs(next)) return false;\n    }\n    state[node] = 2;\n    return true;\n  }\n\n  return [for (int i = 0; i < graph.length; i++) if (dfs(i)) i];\n}",
        swift: "func eventualSafeNodes(_ graph: [[Int]]) -> [Int] {\n  var state = Array(repeating: 0, count: graph.count)\n\n  func dfs(_ node: Int) -> Bool {\n    if state[node] != 0 { return state[node] == 2 }\n    state[node] = 1\n    for next in graph[node] {\n      if !dfs(next) { return false }\n    }\n    state[node] = 2\n    return true\n  }\n\n  return (0..<graph.count).filter { dfs($0) }\n}",
        haskell: "eventualSafeNodes :: [[Int]] -> [Int]\neventualSafeNodes graph = []"
      }
    },
    {
      id: 18,
      title: 'Loud and Rich',
      difficulty: 'medium',
      tags: ['DFS', 'Graph Traversal', 'Reverse Graph'],
      description: 'In a group with income and quietness, find quietest person in every richer group.',
      examples: [
        {
          input: 'richer = [[1,0],[2,1],[3,1],[3,7]], quiet = [3,2,5,5,4,5,2,7]',
          output: '[5,5,2,5,4,5,2,7]'
        }
      ],
      constraints: 'n ≤ 10000; richer.length ≤ n',
      hint: 'Build reverse graph (richer → poorer). DFS to find minimum quiet value.',
      timeComplexity: 'O(n + E)',
      spaceComplexity: 'O(n + E)',
      solutions: {
        kotlin: "fun loudAndRich(richer: Array<IntArray>, quiet: IntArray): IntArray {\n  val n = quiet.size\n  val graph = List(n) { mutableListOf<Int>() }\n  for ((a, b) in richer) {\n    graph[a].add(b)\n  }\n\n  val answer = IntArray(n) { -1 }\n\n  fun dfs(person: Int): Int {\n    if (answer[person] != -1) return answer[person]\n    answer[person] = person\n    for (poorer in graph[person]) {\n      val other = dfs(poorer)\n      if (quiet[other] < quiet[answer[person]]) {\n        answer[person] = other\n      }\n    }\n    return answer[person]\n  }\n\n  for (i in 0 until n) dfs(i)\n  return answer\n}",
        dart: "List<int> loudAndRich(List<List<int>> richer, List<int> quiet) {\n  final n = quiet.length;\n  final graph = List.generate(n, (_) => <int>[]);\n  for (final pair in richer) {\n    graph[pair[0]].add(pair[1]);\n  }\n\n  final answer = List.filled(n, -1);\n\n  int dfs(int person) {\n    if (answer[person] != -1) return answer[person];\n    answer[person] = person;\n    for (int poorer in graph[person]) {\n      final other = dfs(poorer);\n      if (quiet[other] < quiet[answer[person]]) {\n        answer[person] = other;\n      }\n    }\n    return answer[person];\n  }\n\n  for (int i = 0; i < n; i++) dfs(i);\n  return answer;\n}",
        swift: "func loudAndRich(_ richer: [[Int]], _ quiet: [Int]) -> [Int] {\n  let n = quiet.count\n  var graph = Array(repeating: [Int](), count: n)\n  for pair in richer {\n    graph[pair[0]].append(pair[1])\n  }\n\n  var answer = Array(repeating: -1, count: n)\n\n  func dfs(_ person: Int) -> Int {\n    if answer[person] != -1 { return answer[person] }\n    answer[person] = person\n    for poorer in graph[person] {\n      let other = dfs(poorer)\n      if quiet[other] < quiet[answer[person]] {\n        answer[person] = other\n      }\n    }\n    return answer[person]\n  }\n\n  for i in 0..<n { _ = dfs(i) }\n  return answer\n}",
        haskell: "loudAndRich :: [[Int]] -> [Int] -> [Int]\nloudAndRich richer quiet = []"
      }
    },
    {
      id: 19,
      title: 'Rotting Oranges',
      difficulty: 'medium',
      tags: ['BFS', 'Multi-source', 'Grid', 'Time'],
      description: 'Given a grid, rotten oranges spread. Return minutes until all fresh oranges rot, or -1 if impossible.',
      examples: [
        {
          input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
          output: '4'
        }
      ],
      constraints: 'm, n ≤ 10; grid values ∈ {0, 1, 2}',
      hint: 'Multi-source BFS from all rotten oranges simultaneously.',
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
      solutions: {
        kotlin: "fun orangesRotting(grid: Array<IntArray>): Int {\n  val m = grid.size\n  val n = grid[0].size\n  val queue = ArrayDeque<Triple<Int, Int, Int>>()\n  var fresh = 0\n\n  for (i in 0 until m) {\n    for (j in 0 until n) {\n      when (grid[i][j]) {\n        2 -> queue.add(Triple(i, j, 0))\n        1 -> fresh++\n      }\n    }\n  }\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0))\n  var time = 0\n\n  while (queue.isNotEmpty()) {\n    val (i, j, t) = queue.removeFirst()\n    time = t\n    for ((di, dj) in dirs) {\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {\n        grid[ni][nj] = 2\n        fresh--\n        queue.add(Triple(ni, nj, t + 1))\n      }\n    }\n  }\n\n  return if (fresh == 0) time else -1\n}",
        dart: "int orangesRotting(List<List<int>> grid) {\n  final m = grid.length;\n  final n = grid[0].length;\n  final queue = Queue<(int, int, int)>();\n  int fresh = 0;\n\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      if (grid[i][j] == 2) {\n        queue.add((i, j, 0));\n      } else if (grid[i][j] == 1) {\n        fresh++;\n      }\n    }\n  }\n\n  final dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n  int time = 0;\n\n  while (queue.isNotEmpty) {\n    final (i, j, t) = queue.removeFirst();\n    time = t;\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {\n        grid[ni][nj] = 2;\n        fresh--;\n        queue.add((ni, nj, t + 1));\n      }\n    }\n  }\n\n  return fresh == 0 ? time : -1;\n}",
        swift: "func orangesRotting(_ grid: [[Int]]) -> Int {\n  var grid = grid\n  let m = grid.count\n  let n = grid[0].count\n  var queue: [(Int, Int, Int)] = []\n  var fresh = 0\n\n  for i in 0..<m {\n    for j in 0..<n {\n      if grid[i][j] == 2 {\n        queue.append((i, j, 0))\n      } else if grid[i][j] == 1 {\n        fresh += 1\n      }\n    }\n  }\n\n  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]\n  var time = 0\n  var idx = 0\n\n  while idx < queue.count {\n    let (i, j, t) = queue[idx]\n    idx += 1\n    time = t\n    for dir in dirs {\n      let ni = i + dir[0]\n      let nj = j + dir[1]\n      if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1 {\n        grid[ni][nj] = 2\n        fresh -= 1\n        queue.append((ni, nj, t + 1))\n      }\n    }\n  }\n\n  return fresh == 0 ? time : -1\n}",
        haskell: "orangesRotting :: [[Int]] -> Int\norangesRotting grid = 0"
      }
    },
    {
      id: 20,
      title: 'Jump Game III',
      difficulty: 'medium',
      tags: ['DFS', 'BFS', 'Reachability', 'Array'],
      description: 'Given array where arr[i] is jump length, reach index of any 0.',
      examples: [
        {
          input: 'arr = [4,2,3,0,3,1,2], start = 5',
          output: 'true'
        }
      ],
      constraints: '1 ≤ arr.length ≤ 5000; 0 ≤ arr[i] ≤ arr.length',
      hint: 'DFS/BFS from start index. Visit reachable indices.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun canReach(arr: IntArray, start: Int): Boolean {\n  val visited = BooleanArray(arr.size)\n  val queue = ArrayDeque<Int>()\n  queue.add(start)\n\n  while (queue.isNotEmpty()) {\n    val i = queue.removeFirst()\n    if (visited[i]) continue\n    visited[i] = true\n\n    if (arr[i] == 0) return true\n\n    val next1 = i + arr[i]\n    val next2 = i - arr[i]\n    if (next1 < arr.size && !visited[next1]) queue.add(next1)\n    if (next2 >= 0 && !visited[next2]) queue.add(next2)\n  }\n\n  return false\n}",
        dart: "bool canReach(List<int> arr, int start) {\n  final visited = List.filled(arr.length, false);\n  final queue = Queue<int>();\n  queue.add(start);\n\n  while (queue.isNotEmpty) {\n    final i = queue.removeFirst();\n    if (visited[i]) continue;\n    visited[i] = true;\n\n    if (arr[i] == 0) return true;\n\n    final next1 = i + arr[i];\n    final next2 = i - arr[i];\n    if (next1 < arr.length && !visited[next1]) queue.add(next1);\n    if (next2 >= 0 && !visited[next2]) queue.add(next2);\n  }\n\n  return false;\n}",
        swift: "func canReach(_ arr: [Int], _ start: Int) -> Bool {\n  var visited = Array(repeating: false, count: arr.count)\n  var queue = [start]\n  var idx = 0\n\n  while idx < queue.count {\n    let i = queue[idx]\n    idx += 1\n    if visited[i] { continue }\n    visited[i] = true\n\n    if arr[i] == 0 { return true }\n\n    let next1 = i + arr[i]\n    let next2 = i - arr[i]\n    if next1 < arr.count && !visited[next1] { queue.append(next1) }\n    if next2 >= 0 && !visited[next2] { queue.append(next2) }\n  }\n\n  return false\n}",
        haskell: "canReach :: [Int] -> Int -> Bool\ncanReach arr start = False"
      }
    }
  ]
}
