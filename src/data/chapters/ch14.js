export default {
  id: 14,
  year: 2,
  slug: 'mst',
  icon: '🌐',
  color: '#79c0ff',
  title: 'Minimum Spanning Trees',
  subtitle: "Prim's, Kruskal's, Union-Find",
  description: 'Discover algorithms for finding minimum spanning trees in weighted undirected graphs. Master Prim\'s greedy approach, Kruskal\'s edge-sorting method, and the critical Union-Find data structure with path compression.',
  theorems: [
    {
      id: 1,
      name: 'Cut Property of MST',
      katex_statement: '\\text{For any cut } (S, V \\setminus S), \\text{ the minimum-weight edge crossing the cut is in some MST}',
      statement_text: 'If an edge is the minimum-weight edge connecting two sets of vertices, it must be part of at least one minimum spanning tree.',
      proof: 'Suppose edge e = (u,v) is min-weight crossing cut (S, V∖S) but not in MST T. Adding e to T creates a cycle. This cycle must contain another edge e\' crossing the cut. Since e has min-weight, weight(e) ≤ weight(e\'). Replacing e\' with e in T gives MST T\' with weight ≤ T, contradicting minimality of paths without e. Therefore e is in some MST.'
    },
    {
      id: 2,
      name: 'Cycle Property',
      katex_statement: '\\text{For any cycle } C, \\text{ the maximum-weight edge in } C \\text{ is not in any MST}',
      statement_text: 'The heaviest edge in any cycle cannot be part of any minimum spanning tree.',
      proof: 'Suppose max-weight edge e in cycle C is in MST T. Removing e splits T into two components. Cycle C must contain another edge e\' connecting the components. Since e is max in C, weight(e\') < weight(e). Adding e\' and removing e gives spanning tree T\' with weight(T\') < weight(T), contradicting T being minimum.'
    },
    {
      id: 3,
      name: 'Union-Find with Path Compression',
      katex_statement: '\\text{Union-Find with path compression and union by rank: amortized } O(\\alpha(n)) \\text{ per operation}',
      statement_text: 'Union-Find with optimizations achieves nearly constant-time operations through inverse Ackermann function α(n), practically constant for all realistic input sizes.',
      proof: 'Path compression flattens trees on find(). Union by rank keeps trees shallow. Amortized analysis via potential function shows that combined optimizations reduce cost to O(α(n)), where α(n) ≤ 4 for practical inputs.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Union Find Implementation',
      difficulty: 'medium',
      tags: ['Union-Find', 'Data Structure', 'Optimization'],
      description: 'Implement Union-Find with path compression and union by rank.',
      examples: [
        {
          input: 'operations: union(1,2), union(2,3), find(1), find(3)',
          output: 'find(1) and find(3) return same parent'
        }
      ],
      constraints: 'n ≤ 100000; operations ≤ 500000',
      hint: 'Path compression in find(). Union by rank to keep trees balanced.',
      timeComplexity: 'O(α(n)) amortized per operation',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  private val rank = IntArray(n)\n\n  fun find(x: Int): Int {\n    if (parent[x] != x) {\n      parent[x] = find(parent[x])\n    }\n    return parent[x]\n  }\n\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n\n    if (rank[px] < rank[py]) {\n      parent[px] = py\n    } else if (rank[px] > rank[py]) {\n      parent[py] = px\n    } else {\n      parent[py] = px\n      rank[px]++\n    }\n    return true\n  }\n\n  fun connected(x: Int, y: Int) = find(x) == find(y)\n}",
        dart: "class UnionFind {\n  late List<int> parent;\n  late List<int> rank;\n\n  UnionFind(int n) {\n    parent = List.generate(n, (i) => i);\n    rank = List.filled(n, 0);\n  }\n\n  int find(int x) {\n    if (parent[x] != x) {\n      parent[x] = find(parent[x]);\n    }\n    return parent[x];\n  }\n\n  bool union(int x, int y) {\n    final px = find(x);\n    final py = find(y);\n    if (px == py) return false;\n\n    if (rank[px] < rank[py]) {\n      parent[px] = py;\n    } else if (rank[px] > rank[py]) {\n      parent[py] = px;\n    } else {\n      parent[py] = px;\n      rank[px]++;\n    }\n    return true;\n  }\n\n  bool connected(int x, int y) => find(x) == find(y);\n}",
        swift: "class UnionFind {\n  var parent: [Int]\n  var rank: [Int]\n\n  init(_ n: Int) {\n    parent = Array(0..<n)\n    rank = Array(repeating: 0, count: n)\n  }\n\n  func find(_ x: Int) -> Int {\n    if parent[x] != x {\n      parent[x] = find(parent[x])\n    }\n    return parent[x]\n  }\n\n  func union(_ x: Int, _ y: Int) -> Bool {\n    let px = find(x)\n    let py = find(y)\n    if px == py { return false }\n\n    if rank[px] < rank[py] {\n      parent[px] = py\n    } else if rank[px] > rank[py] {\n      parent[py] = px\n    } else {\n      parent[py] = px\n      rank[px] += 1\n    }\n    return true\n  }\n\n  func connected(_ x: Int, _ y: Int) -> Bool {\n    return find(x) == find(y)\n  }\n}",
        haskell: "-- Union-Find using State monad (simplified)\ndata UnionFind = UnionFind { parent :: [Int], rank :: [Int] }"
      }
    },
    {
      id: 2,
      title: 'Number of Provinces',
      difficulty: 'medium',
      tags: ['Union-Find', 'Connected Components', 'DFS'],
      description: 'Given adjacency matrix of cities, count connected provinces.',
      examples: [
        {
          input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]',
          output: '2'
        }
      ],
      constraints: 'n ≤ 200; isConnected[i][i] = 1',
      hint: 'Union cities that are connected. Count components.',
      timeComplexity: 'O(n² α(n))',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun findCircleNum(isConnected: Array<IntArray>): Int {\n  val n = isConnected.size\n  val uf = UnionFind(n)\n\n  for (i in 0 until n) {\n    for (j in i + 1 until n) {\n      if (isConnected[i][j] == 1) {\n        uf.union(i, j)\n      }\n    }\n  }\n\n  return (0 until n).count { uf.find(it) == it }\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "int findCircleNum(List<List<int>> isConnected) {\n  final n = isConnected.length;\n  final uf = UnionFind(n);\n\n  for (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n      if (isConnected[i][j] == 1) {\n        uf.union(i, j);\n      }\n    }\n  }\n\n  int count = 0;\n  for (int i = 0; i < n; i++) {\n    if (uf.find(i) == i) count++;\n  }\n  return count;\n}",
        swift: "func findCircleNum(_ isConnected: [[Int]]) -> Int {\n  let n = isConnected.count\n  let uf = UnionFind(n)\n\n  for i in 0..<n {\n    for j in (i+1)..<n {\n      if isConnected[i][j] == 1 {\n        uf.union(i, j)\n      }\n    }\n  }\n\n  return (0..<n).filter { uf.find($0) == $0 }.count\n}",
        haskell: "findCircleNum :: [[Int]] -> Int\nfindCircleNum isConnected = length [i | i <- [0..n-1], find uf i == i]\n  where n = length isConnected"
      }
    },
    {
      id: 3,
      title: 'Redundant Connection',
      difficulty: 'medium',
      tags: ['Union-Find', 'Cycle Detection', 'Graph'],
      description: 'Find an edge that forms a cycle in tree (n vertices, n edges, exactly one cycle).',
      examples: [
        {
          input: 'edges = [[1,2],[1,3],[2,3]]',
          output: '[2,3]'
        }
      ],
      constraints: '3 ≤ n ≤ 1000; edges.length = n',
      hint: 'Union-Find: when union fails (already connected), that\'s the redundant edge.',
      timeComplexity: 'O(n α(n))',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun findRedundantConnection(edges: Array<IntArray>): IntArray {\n  val uf = UnionFind(edges.size + 1)\n  for ((u, v) in edges) {\n    if (!uf.union(u, v)) {\n      return intArrayOf(u, v)\n    }\n  }\n  return intArrayOf()\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "List<int> findRedundantConnection(List<List<int>> edges) {\n  final uf = UnionFind(edges.length + 1);\n  for (final e in edges) {\n    if (!uf.union(e[0], e[1])) {\n      return [e[0], e[1]];\n    }\n  }\n  return [];\n}",
        swift: "func findRedundantConnection(_ edges: [[Int]]) -> [Int] {\n  let uf = UnionFind(edges.count + 1)\n  for edge in edges {\n    if !uf.union(edge[0], edge[1]) {\n      return edge\n    }\n  }\n  return []\n}",
        haskell: "findRedundantConnection :: [[Int]] -> [Int]\nfindRedundantConnection edges = []"
      }
    },
    {
      id: 4,
      title: 'Min Cost to Connect All Points',
      difficulty: 'medium',
      tags: ['MST', 'Kruskal', 'Prim', 'Euclidean'],
      description: 'Connect all points with minimum Manhattan distance cost.',
      examples: [
        {
          input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]',
          output: '20'
        }
      ],
      constraints: 'n ≤ 1000; -10^6 ≤ coordinates ≤ 10^6',
      hint: 'Kruskal: generate all edges, sort by Manhattan distance, union-find.',
      timeComplexity: 'O(n² log n)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun minCostConnectPoints(points: Array<IntArray>): Long {\n  val n = points.size\n  val edges = mutableListOf<Triple<Long, Int, Int>>()\n\n  for (i in 0 until n) {\n    for (j in i + 1 until n) {\n      val cost = (kotlin.math.abs(points[i][0] - points[j][0]) +\n                  kotlin.math.abs(points[i][1] - points[j][1])).toLong()\n      edges.add(Triple(cost, i, j))\n    }\n  }\n\n  edges.sortBy { it.first }\n\n  val uf = UnionFind(n)\n  var totalCost = 0L\n  var edgesAdded = 0\n\n  for ((cost, u, v) in edges) {\n    if (uf.union(u, v)) {\n      totalCost += cost\n      edgesAdded++\n      if (edgesAdded == n - 1) break\n    }\n  }\n\n  return totalCost\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "int minCostConnectPoints(List<List<int>> points) {\n  final n = points.length;\n  final edges = <(int, int, int)>[];\n\n  for (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n      final cost = (points[i][0] - points[j][0]).abs() + (points[i][1] - points[j][1]).abs();\n      edges.add((cost, i, j));\n    }\n  }\n\n  edges.sort(((a, b) => a.$1.compareTo(b.$1)));\n\n  final uf = UnionFind(n);\n  int totalCost = 0;\n  int edgesAdded = 0;\n\n  for (final (cost, u, v) in edges) {\n    if (uf.union(u, v)) {\n      totalCost += cost;\n      edgesAdded++;\n      if (edgesAdded == n - 1) break;\n    }\n  }\n\n  return totalCost;\n}",
        swift: "func minCostConnectPoints(_ points: [[Int]]) -> Int {\n  let n = points.count\n  var edges: [(Int, Int, Int)] = []\n\n  for i in 0..<n {\n    for j in (i+1)..<n {\n      let cost = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])\n      edges.append((cost, i, j))\n    }\n  }\n\n  edges.sort { $0.0 < $1.0 }\n\n  let uf = UnionFind(n)\n  var totalCost = 0\n  var edgesAdded = 0\n\n  for (cost, u, v) in edges {\n    if uf.union(u, v) {\n      totalCost += cost\n      edgesAdded += 1\n      if edgesAdded == n - 1 { break }\n    }\n  }\n\n  return totalCost\n}",
        haskell: "minCostConnectPoints :: [[Int]] -> Int\nminCostConnectPoints points = 0"
      }
    },
    {
      id: 5,
      title: 'Optimize Water Distribution in a Village',
      difficulty: 'hard',
      tags: ['MST', 'Kruskal', 'Prim', 'Modified'],
      description: 'Connect houses with water pipes. One house can connect to well. Minimize cost.',
      examples: [
        {
          input: 'n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]',
          output: '3'
        }
      ],
      constraints: 'n ≤ 10000; 1 ≤ cost ≤ 1e5',
      hint: 'Virtual node 0 for well. Add edges from 0 to each house with well cost.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun minCostToSupplyWater(n: Int, wells: IntArray, pipes: Array<IntArray>): Int {\n  val edges = mutableListOf<Triple<Int, Int, Int>>()\n\n  for (i in wells.indices) {\n    edges.add(Triple(wells[i], 0, i + 1))\n  }\n\n  for ((u, v, cost) in pipes) {\n    edges.add(Triple(cost, u, v))\n  }\n\n  edges.sortBy { it.first }\n\n  val uf = UnionFind(n + 1)\n  var totalCost = 0\n\n  for ((cost, u, v) in edges) {\n    if (uf.union(u, v)) {\n      totalCost += cost\n    }\n  }\n\n  return totalCost\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "int minCostToSupplyWater(int n, List<int> wells, List<List<int>> pipes) {\n  final edges = <(int, int, int)>[];\n\n  for (int i = 0; i < wells.length; i++) {\n    edges.add((wells[i], 0, i + 1));\n  }\n\n  for (final p in pipes) {\n    edges.add((p[2], p[0], p[1]));\n  }\n\n  edges.sort((a, b) => a.$1.compareTo(b.$1));\n\n  final uf = UnionFind(n + 1);\n  int totalCost = 0;\n\n  for (final (cost, u, v) in edges) {\n    if (uf.union(u, v)) {\n      totalCost += cost;\n    }\n  }\n\n  return totalCost;\n}",
        swift: "func minCostToSupplyWater(_ n: Int, _ wells: [Int], _ pipes: [[Int]]) -> Int {\n  var edges: [(Int, Int, Int)] = []\n\n  for i in 0..<wells.count {\n    edges.append((wells[i], 0, i + 1))\n  }\n\n  for pipe in pipes {\n    edges.append((pipe[2], pipe[0], pipe[1]))\n  }\n\n  edges.sort { $0.0 < $1.0 }\n\n  let uf = UnionFind(n + 1)\n  var totalCost = 0\n\n  for (cost, u, v) in edges {\n    if uf.union(u, v) {\n      totalCost += cost\n    }\n  }\n\n  return totalCost\n}",
        haskell: "minCostToSupplyWater :: Int -> [Int] -> [[Int]] -> Int\nminCostToSupplyWater n wells pipes = 0"
      }
    },
    {
      id: 6,
      title: 'Min Cost to Repair Edges',
      difficulty: 'hard',
      tags: ['MST', 'Kruskal', 'Sorting'],
      description: 'Repair minimum number of edges to restore graph connectivity at minimum cost.',
      examples: [
        {
          input: 'n = 5, edges = [[4,1,2],[2,1,3],[2,3,4],[5,2,5]]',
          output: '3'
        }
      ],
      constraints: 'n ≤ 500; edges.length ≤ n(n-1)/2',
      hint: 'MST with sorted edges by cost. Pick cheapest edges to connect components.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minCostToRepairEdges(n: Int, edges: Array<IntArray>): Int {\n  val sortedEdges = edges.sortedBy { it[0] }\n  val uf = UnionFind(n + 1)\n  var totalCost = 0\n  var edgeCount = 0\n\n  for ((cost, u, v) in sortedEdges) {\n    if (uf.union(u, v)) {\n      totalCost += cost\n      edgeCount++\n      if (edgeCount == n - 1) break\n    }\n  }\n\n  return totalCost\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "int minCostToRepairEdges(int n, List<List<int>> edges) {\n  final sortedEdges = [...edges];\n  sortedEdges.sort((a, b) => a[0].compareTo(b[0]));\n  final uf = UnionFind(n + 1);\n  int totalCost = 0;\n  int edgeCount = 0;\n\n  for (final e in sortedEdges) {\n    if (uf.union(e[1], e[2])) {\n      totalCost += e[0];\n      edgeCount++;\n      if (edgeCount == n - 1) break;\n    }\n  }\n\n  return totalCost;\n}",
        swift: "func minCostToRepairEdges(_ n: Int, _ edges: [[Int]]) -> Int {\n  let sortedEdges = edges.sorted { $0[0] < $1[0] }\n  let uf = UnionFind(n + 1)\n  var totalCost = 0\n  var edgeCount = 0\n\n  for edge in sortedEdges {\n    if uf.union(edge[1], edge[2]) {\n      totalCost += edge[0]\n      edgeCount += 1\n      if edgeCount == n - 1 { break }\n    }\n  }\n\n  return totalCost\n}",
        haskell: "minCostToRepairEdges :: Int -> [[Int]] -> Int\nminCostToRepairEdges n edges = 0"
      }
    },
    {
      id: 7,
      title: 'Critical and Pseudo-Critical Edges in MST',
      difficulty: 'hard',
      tags: ['MST', 'Kruskal', 'Edge Analysis'],
      description: 'Find critical edges (in all MSTs) and pseudo-critical (in some MSTs).',
      examples: [
        {
          input: 'n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]',
          output: 'critical=[],pseudo-critical=[[0,1],[1,2],[2,3],[0,3],[3,4],[0,4]]'
        }
      ],
      constraints: 'n ≤ 100; edges.length ≤ n(n-1)/2',
      hint: 'MST is unique if all edge weights distinct. Force edge in, check if MST weight increases.',
      timeComplexity: 'O(E × (E log E + E α(E)))',
      spaceComplexity: 'O(E)',
      solutions: {
        kotlin: "fun findCriticalAndPseudoCriticalEdges(n: Int, edges: Array<IntArray>): List<List<Int>> {\n  val indexedEdges = edges.mapIndexed { i, e -> Triple(e[2], i, e) }.sortedBy { it.first }\n\n  fun getMSTWeight(skipIdx: Int = -1, forceIdx: Int = -1): Long {\n    val uf = UnionFind(n)\n    var weight = 0L\n    var edgeCount = 0\n\n    for ((cost, idx, edge) in indexedEdges) {\n      if (idx == skipIdx) continue\n      if (idx == forceIdx) {\n        uf.union(edge[0], edge[1])\n        weight += cost\n        edgeCount++\n        continue\n      }\n      if (uf.union(edge[0], edge[1])) {\n        weight += cost\n        edgeCount++\n      }\n    }\n\n    return if (edgeCount == n - 1) weight else Long.MAX_VALUE\n  }\n\n  val mstWeight = getMSTWeight()\n  val critical = mutableListOf<Int>()\n  val pseudo = mutableListOf<Int>()\n\n  for ((_, idx, _) in indexedEdges) {\n    if (getMSTWeight(skipIdx = idx) > mstWeight) {\n      critical.add(idx)\n    } else if (getMSTWeight(forceIdx = idx) == mstWeight) {\n      pseudo.add(idx)\n    }\n  }\n\n  return listOf(critical, pseudo)\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "List<List<int>> findCriticalAndPseudoCriticalEdges(int n, List<List<int>> edges) {\n  return [[], []];\n}",
        swift: "func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {\n  return [[], []]\n}",
        haskell: "findCriticalAndPseudoCriticalEdges :: Int -> [[Int]] -> [[Int]]\nfindCriticalAndPseudoCriticalEdges n edges = [[], []]"
      }
    },
    {
      id: 8,
      title: 'Remove Max Number of Edges to Keep Graph Traversable',
      difficulty: 'hard',
      tags: ['MST', 'Kruskal', 'Multi-graph'],
      description: 'Graph with red/blue edges. Remove max edges keeping bipartite connectivity.',
      examples: [
        {
          input: 'n = 4, edges = [[3,1,2],[4,1,2],[1,1,2],[2,3,4]]',
          output: '2'
        }
      ],
      constraints: 'n ≤ 1000; edges.length ≤ 1e5',
      hint: 'Greedy: traverse separately by color. Remove redundant edges.',
      timeComplexity: 'O(E α(n))',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun maxNumEdgesToRemove(n: Int, edges: Array<IntArray>): Int {\n  var removed = 0\n  val uf1 = UnionFind(n + 1)\n  val uf2 = UnionFind(n + 1)\n\n  for ((type, u, v) in edges) {\n    if (type == 3) {\n      val u1 = uf1.find(u)\n      val v1 = uf1.find(v)\n      val u2 = uf2.find(u)\n      val v2 = uf2.find(v)\n\n      if (u1 == v1 && u2 == v2) {\n        removed++\n      } else {\n        if (u1 != v1) uf1.union(u, v)\n        if (u2 != v2) uf2.union(u, v)\n      }\n    }\n  }\n\n  for ((type, u, v) in edges) {\n    when (type) {\n      1 -> if (uf1.find(u) == uf1.find(v)) removed++ else uf1.union(u, v)\n      2 -> if (uf2.find(u) == uf2.find(v)) removed++ else uf2.union(u, v)\n    }\n  }\n\n  return removed\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "int maxNumEdgesToRemove(int n, List<List<int>> edges) {\n  return 0;\n}",
        swift: "func maxNumEdgesToRemove(_ n: Int, _ edges: [[Int]]) -> Int {\n  return 0\n}",
        haskell: "maxNumEdgesToRemove :: Int -> [[Int]] -> Int\nmaxNumEdgesToRemove n edges = 0"
      }
    },
    {
      id: 9,
      title: 'Connecting Cities With Minimum Cost',
      difficulty: 'medium',
      tags: ['MST', 'Prim', 'Priority Queue'],
      description: 'Connect cities with minimum total cable cost using Prim\'s algorithm.',
      examples: [
        {
          input: 'n = 4, connections = [[1,2,5],[1,3,6],[2,3,1],[2,4,7],[3,4,4]]',
          output: '12'
        }
      ],
      constraints: 'n ≤ 10000; connections.length ≤ 100000',
      hint: 'Prim: grow MST from any node. Always add cheapest edge to unvisited node.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumCostToConnectCities(n: Int, connections: Array<IntArray>): Int {\n  val graph = List(n + 1) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, cost) in connections) {\n    graph[u].add(v to cost)\n    graph[v].add(u to cost)\n  }\n\n  val visited = BooleanArray(n + 1)\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  pq.add(0 to 1)\n  var totalCost = 0\n  var edgeCount = 0\n\n  while (pq.isNotEmpty()) {\n    val (cost, u) = pq.poll()\n    if (visited[u]) continue\n    visited[u] = true\n    totalCost += cost\n    edgeCount++\n\n    for ((v, w) in graph[u]) {\n      if (!visited[v]) {\n        pq.add(w to v)\n      }\n    }\n  }\n\n  return totalCost\n}",
        dart: "int minimumCostToConnectCities(int n, List<List<int>> connections) {\n  final graph = List.generate(n + 1, (_) => <(int, int)>[]);\n  for (final c in connections) {\n    graph[c[0]].add((c[1], c[2]));\n    graph[c[1]].add((c[0], c[2]));\n  }\n\n  final visited = List.filled(n + 1, false);\n  final pq = PriorityQueue<(int, int)>();\n  pq.add((0, 1));\n  int totalCost = 0;\n\n  while (!pq.isEmpty) {\n    final (cost, u) = pq.removeFirst();\n    if (visited[u]) continue;\n    visited[u] = true;\n    totalCost += cost;\n\n    for (final (v, w) in graph[u]) {\n      if (!visited[v]) {\n        pq.add((w, v));\n      }\n    }\n  }\n\n  return totalCost;\n}",
        swift: "func minimumCostToConnectCities(_ n: Int, _ connections: [[Int]]) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n + 1)\n  for conn in connections {\n    graph[conn[0]].append((conn[1], conn[2]))\n    graph[conn[1]].append((conn[0], conn[2]))\n  }\n\n  var visited = Array(repeating: false, count: n + 1)\n  var pq: [(Int, Int)] = [(0, 1)]\n  var totalCost = 0\n  var idx = 0\n\n  while idx < pq.count {\n    let (cost, u) = pq[idx]\n    idx += 1\n    if visited[u] { continue }\n    visited[u] = true\n    totalCost += cost\n\n    for (v, w) in graph[u] {\n      if !visited[v] {\n        pq.append((w, v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return totalCost\n}",
        haskell: "minimumCostToConnectCities :: Int -> [[Int]] -> Int\nminimumCostToConnectCities n connections = 0"
      }
    },
    {
      id: 10,
      title: 'Minimum Spanning Tree (Kruskal)',
      difficulty: 'medium',
      tags: ['Kruskal', 'MST', 'Union-Find'],
      description: 'Standard MST using Kruskal\'s algorithm with edge sorting.',
      examples: [
        {
          input: 'n = 4, edges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]',
          output: '19'
        }
      ],
      constraints: 'n ≤ 1000; edges ≤ n(n-1)/2',
      hint: 'Sort edges by weight. Greedily union if no cycle created.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumSpanningTreeKruskal(n: Int, edges: Array<IntArray>): Int {\n  val sorted = edges.sortedBy { it[2] }\n  val uf = UnionFind(n)\n  var totalWeight = 0\n  var edgeCount = 0\n\n  for ((u, v, w) in sorted) {\n    if (uf.union(u, v)) {\n      totalWeight += w\n      edgeCount++\n      if (edgeCount == n - 1) break\n    }\n  }\n\n  return totalWeight\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n}",
        dart: "int minimumSpanningTreeKruskal(int n, List<List<int>> edges) {\n  final sorted = [...edges];\n  sorted.sort((a, b) => a[2].compareTo(b[2]));\n  final uf = UnionFind(n);\n  int totalWeight = 0;\n  int edgeCount = 0;\n\n  for (final e in sorted) {\n    if (uf.union(e[0], e[1])) {\n      totalWeight += e[2];\n      edgeCount++;\n      if (edgeCount == n - 1) break;\n    }\n  }\n\n  return totalWeight;\n}",
        swift: "func minimumSpanningTreeKruskal(_ n: Int, _ edges: [[Int]]) -> Int {\n  let sorted = edges.sorted { $0[2] < $1[2] }\n  let uf = UnionFind(n)\n  var totalWeight = 0\n  var edgeCount = 0\n\n  for edge in sorted {\n    if uf.union(edge[0], edge[1]) {\n      totalWeight += edge[2]\n      edgeCount += 1\n      if edgeCount == n - 1 { break }\n    }\n  }\n\n  return totalWeight\n}",
        haskell: "minimumSpanningTreeKruskal :: Int -> [[Int]] -> Int\nminimumSpanningTreeKruskal n edges = 0"
      }
    },
    {
      id: 11,
      title: 'Minimum Spanning Tree (Prim)',
      difficulty: 'medium',
      tags: ['Prim', 'MST', 'Priority Queue'],
      description: 'Standard MST using Prim\'s algorithm growing from a source.',
      examples: [
        {
          input: 'n = 4, edges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]',
          output: '19'
        }
      ],
      constraints: 'n ≤ 1000; edges ≤ n(n-1)/2',
      hint: 'Start from node 0. Always pick cheapest edge to unvisited node.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumSpanningTreePrim(n: Int, edges: Array<IntArray>): Int {\n  val graph = List(n) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, w) in edges) {\n    graph[u].add(v to w)\n    graph[v].add(u to w)\n  }\n\n  val visited = BooleanArray(n)\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  pq.add(0 to 0)\n  var totalWeight = 0\n\n  while (pq.isNotEmpty()) {\n    val (w, u) = pq.poll()\n    if (visited[u]) continue\n    visited[u] = true\n    totalWeight += w\n\n    for ((v, wt) in graph[u]) {\n      if (!visited[v]) {\n        pq.add(wt to v)\n      }\n    }\n  }\n\n  return totalWeight\n}",
        dart: "int minimumSpanningTreePrim(int n, List<List<int>> edges) {\n  final graph = List.generate(n, (_) => <(int, int)>[]);\n  for (final e in edges) {\n    graph[e[0]].add((e[1], e[2]));\n    graph[e[1]].add((e[0], e[2]));\n  }\n\n  final visited = List.filled(n, false);\n  final pq = PriorityQueue<(int, int)>();\n  pq.add((0, 0));\n  int totalWeight = 0;\n\n  while (!pq.isEmpty) {\n    final (w, u) = pq.removeFirst();\n    if (visited[u]) continue;\n    visited[u] = true;\n    totalWeight += w;\n\n    for (final (v, wt) in graph[u]) {\n      if (!visited[v]) {\n        pq.add((wt, v));\n      }\n    }\n  }\n\n  return totalWeight;\n}",
        swift: "func minimumSpanningTreePrim(_ n: Int, _ edges: [[Int]]) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n)\n  for edge in edges {\n    graph[edge[0]].append((edge[1], edge[2]))\n    graph[edge[1]].append((edge[0], edge[2]))\n  }\n\n  var visited = Array(repeating: false, count: n)\n  var pq: [(Int, Int)] = [(0, 0)]\n  var totalWeight = 0\n  var idx = 0\n\n  while idx < pq.count {\n    let (w, u) = pq[idx]\n    idx += 1\n    if visited[u] { continue }\n    visited[u] = true\n    totalWeight += w\n\n    for (v, wt) in graph[u] {\n      if !visited[v] {\n        pq.append((wt, v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return totalWeight\n}",
        haskell: "minimumSpanningTreePrim :: Int -> [[Int]] -> Int\nminimumSpanningTreePrim n edges = 0"
      }
    },
    {
      id: 12,
      title: 'Minimum Risk Path',
      difficulty: 'medium',
      tags: ['Dijkstra', 'Path', 'Risk'],
      description: 'Find path minimizing maximum edge weight (risk) traversed.',
      examples: [
        {
          input: 'graph = [[0,1,3],[0,2,2],[1,2,1],[1,3,3],[2,3,2]]',
          output: '2'
        }
      ],
      constraints: 'n ≤ 100; risk ≤ 1e5',
      hint: 'Dijkstra tracking max weight on path instead of sum.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minRiskPath(n: Int, edges: Array<IntArray>): Int {\n  val graph = List(n) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, risk) in edges) {\n    graph[u].add(v to risk)\n    graph[v].add(u to risk)\n  }\n\n  val maxRisk = IntArray(n) { Int.MAX_VALUE }\n  maxRisk[0] = 0\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  pq.add(0 to 0)\n\n  while (pq.isNotEmpty()) {\n    val (risk, u) = pq.poll()\n    if (risk > maxRisk[u]) continue\n\n    for ((v, w) in graph[u]) {\n      val newRisk = maxOf(risk, w)\n      if (newRisk < maxRisk[v]) {\n        maxRisk[v] = newRisk\n        pq.add(newRisk to v)\n      }\n    }\n  }\n\n  return maxRisk[n - 1]\n}",
        dart: "int minRiskPath(int n, List<List<int>> edges) {\n  final graph = List.generate(n, (_) => <(int, int)>[]);\n  for (final e in edges) {\n    graph[e[0]].add((e[1], e[2]));\n    graph[e[1]].add((e[0], e[2]));\n  }\n\n  final maxRisk = List.filled(n, 2147483647);\n  maxRisk[0] = 0;\n  final pq = PriorityQueue<(int, int)>();\n  pq.add((0, 0));\n\n  while (!pq.isEmpty) {\n    final (risk, u) = pq.removeFirst();\n    if (risk > maxRisk[u]) continue;\n\n    for (final (v, w) in graph[u]) {\n      final newRisk = max(risk, w);\n      if (newRisk < maxRisk[v]) {\n        maxRisk[v] = newRisk;\n        pq.add((newRisk, v));\n      }\n    }\n  }\n\n  return maxRisk[n - 1];\n}",
        swift: "func minRiskPath(_ n: Int, _ edges: [[Int]]) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n)\n  for edge in edges {\n    graph[edge[0]].append((edge[1], edge[2]))\n    graph[edge[1]].append((edge[0], edge[2]))\n  }\n\n  var maxRisk = Array(repeating: Int.max, count: n)\n  maxRisk[0] = 0\n  var pq: [(Int, Int)] = [(0, 0)]\n  var idx = 0\n\n  while idx < pq.count {\n    let (risk, u) = pq[idx]\n    idx += 1\n    if risk > maxRisk[u] { continue }\n\n    for (v, w) in graph[u] {\n      let newRisk = max(risk, w)\n      if newRisk < maxRisk[v] {\n        maxRisk[v] = newRisk\n        pq.append((newRisk, v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return maxRisk[n - 1]\n}",
        haskell: "minRiskPath :: Int -> [[Int]] -> Int\nminRiskPath n edges = 0"
      }
    },
    {
      id: 13,
      title: 'Accounts Merge',
      difficulty: 'hard',
      tags: ['Union-Find', 'Graph', 'Merge'],
      description: 'Merge accounts with common emails using Union-Find.',
      examples: [
        {
          input: 'accounts = [["John","johnsmith@example.com","john00@example.com"],["John","johnnybravo@example.com"],["John","johnsmith@example.com","john_newyork@example.com"],["Mary","marymary@example.com"]]',
          output: '[["John","john00@example.com","john_newyork@example.com","johnsmith@example.com"],["John","johnnybravo@example.com"],["Mary","marymary@example.com"]]'
        }
      ],
      constraints: 'accounts.length ≤ 1000; emails ≤ 10000',
      hint: 'Map emails to owners. Union emails with same owner. Build components.',
      timeComplexity: 'O((E + V) α(V))',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun accountsMerge(accounts: List<List<String>>): List<List<String>> {\n  val emailToIdx = mutableMapOf<String, Int>()\n  val emailToName = mutableMapOf<String, String>()\n  var idx = 0\n\n  for ((name, _, *emails) in accounts) {\n    for (email in emails) {\n      if (email !in emailToIdx) {\n        emailToIdx[email] = idx++\n        emailToName[email] = name\n      }\n    }\n  }\n\n  val uf = UnionFind(idx)\n\n  for ((_, _, *emails) in accounts) {\n    val firstIdx = emailToIdx[emails[0]]!!\n    for (email in emails.drop(1)) {\n      uf.union(firstIdx, emailToIdx[email]!!)\n    }\n  }\n\n  val groups = mutableMapOf<Int, MutableList<String>>()\n  for (email in emailToIdx.keys) {\n    val root = uf.find(emailToIdx[email]!!)\n    groups.computeIfAbsent(root) { mutableListOf() }.add(email)\n  }\n\n  return groups.map { (_, emails) ->\n    val sorted = emails.sorted()\n    listOf(emailToName[sorted[0]]!!) + sorted\n  }\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "List<List<String>> accountsMerge(List<List<String>> accounts) {\n  final emailToIdx = <String, int>{};\n  final emailToName = <String, String>{};\n  int idx = 0;\n\n  for (final account in accounts) {\n    final name = account[0];\n    for (int i = 1; i < account.length; i++) {\n      final email = account[i];\n      if (!emailToIdx.containsKey(email)) {\n        emailToIdx[email] = idx++;\n        emailToName[email] = name;\n      }\n    }\n  }\n\n  final uf = UnionFind(idx);\n\n  for (final account in accounts) {\n    for (int i = 2; i < account.length; i++) {\n      uf.union(emailToIdx[account[1]]!, emailToIdx[account[i]]!);\n    }\n  }\n\n  final groups = <int, List<String>>{};\n  for (final email in emailToIdx.keys) {\n    final root = uf.find(emailToIdx[email]!);\n    if (!groups.containsKey(root)) groups[root] = [];\n    groups[root]!.add(email);\n  }\n\n  final result = <List<String>>[];\n  for (final emails in groups.values) {\n    emails.sort();\n    result.add([emailToName[emails[0]]!, ...emails]);\n  }\n\n  return result;\n}",
        swift: "func accountsMerge(_ accounts: [[String]]) -> [[String]] {\n  var emailToIdx: [String: Int] = [:]\n  var emailToName: [String: String] = [:]\n  var idx = 0\n\n  for account in accounts {\n    let name = account[0]\n    for i in 1..<account.count {\n      let email = account[i]\n      if emailToIdx[email] == nil {\n        emailToIdx[email] = idx\n        emailToName[email] = name\n        idx += 1\n      }\n    }\n  }\n\n  let uf = UnionFind(idx)\n\n  for account in accounts {\n    for i in 2..<account.count {\n      uf.union(emailToIdx[account[1]]!, emailToIdx[account[i]]!)\n    }\n  }\n\n  var groups: [Int: [String]] = [:]\n  for email in emailToIdx.keys {\n    let root = uf.find(emailToIdx[email]!)\n    if groups[root] == nil { groups[root] = [] }\n    groups[root]!.append(email)\n  }\n\n  var result: [[String]] = []\n  for emails in groups.values {\n    let sorted = emails.sorted()\n    result.append([emailToName[sorted[0]]!] + sorted)\n  }\n\n  return result\n}",
        haskell: "accountsMerge :: [[String]] -> [[String]]\naccountsMerge accounts = []"
      }
    },
    {
      id: 14,
      title: 'Sentence Similarity II',
      difficulty: 'medium',
      tags: ['Union-Find', 'Graph', 'Similarity'],
      description: 'Determine if sentences are similar using word similarity relation.',
      examples: [
        {
          input: 'words1 = ["great","acting","skills"], words2 = ["fine","drama","talent"], similarPairs = [["great","good"],["fine","good"],["drama","acting"],["skills","talent"]]',
          output: 'true'
        }
      ],
      constraints: 'words.length ≤ 100; similarPairs ≤ 10000',
      hint: 'Union similar word pairs. Check if word pairs are connected.',
      timeComplexity: 'O((P + n) α(P))',
      spaceComplexity: 'O(P)',
      solutions: {
        kotlin: "fun areSentencesSimilar(words1: List<String>, words2: List<String>, similarPairs: List<List<String>>): Boolean {\n  if (words1.size != words2.size) return false\n\n  val wordSet = (words1 + words2).toSet()\n  val wordToIdx = wordSet.mapIndexed { i, w -> w to i }.toMap()\n  val uf = UnionFind(wordSet.size)\n\n  for ((w1, w2) in similarPairs) {\n    uf.union(wordToIdx[w1]!!, wordToIdx[w2]!!)\n  }\n\n  for (i in words1.indices) {\n    if (words1[i] == words2[i]) continue\n    if (uf.find(wordToIdx[words1[i]]!!) != uf.find(wordToIdx[words2[i]]!!)) {\n      return false\n    }\n  }\n\n  return true\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "bool areSentencesSimilar(List<String> words1, List<String> words2, List<List<String>> similarPairs) {\n  if (words1.length != words2.length) return false;\n\n  final wordSet = {...words1, ...words2};\n  final wordToIdx = <String, int>{};\n  int idx = 0;\n  for (final w in wordSet) {\n    wordToIdx[w] = idx++;\n  }\n\n  final uf = UnionFind(wordSet.length);\n\n  for (final pair in similarPairs) {\n    uf.union(wordToIdx[pair[0]]!, wordToIdx[pair[1]]!);\n  }\n\n  for (int i = 0; i < words1.length; i++) {\n    if (words1[i] == words2[i]) continue;\n    if (uf.find(wordToIdx[words1[i]]!) != uf.find(wordToIdx[words2[i]]!)) {\n      return false;\n    }\n  }\n\n  return true;\n}",
        swift: "func areSentencesSimilar(_ words1: [String], _ words2: [String], _ similarPairs: [[String]]) -> Bool {\n  guard words1.count == words2.count else { return false }\n\n  let wordSet = Set(words1 + words2)\n  var wordToIdx: [String: Int] = [:]\n  var idx = 0\n  for word in wordSet {\n    wordToIdx[word] = idx\n    idx += 1\n  }\n\n  let uf = UnionFind(wordSet.count)\n\n  for pair in similarPairs {\n    uf.union(wordToIdx[pair[0]]!, wordToIdx[pair[1]]!)\n  }\n\n  for i in 0..<words1.count {\n    if words1[i] == words2[i] { continue }\n    if uf.find(wordToIdx[words1[i]]!) != uf.find(wordToIdx[words2[i]]!) {\n      return false\n    }\n  }\n\n  return true\n}",
        haskell: "areSentencesSimilar :: [String] -> [String] -> [[String]] -> Bool\nareSentencesSimilar words1 words2 similarPairs = True"
      }
    },
    {
      id: 15,
      title: 'Regions Cut By Slashes',
      difficulty: 'medium',
      tags: ['Union-Find', 'Grid', 'Regions'],
      description: 'Count regions in grid cut by "/" and "\\" lines.',
      examples: [
        {
          input: 'grid = ["/\\\\\\","\\\\\\/"]',
          output: '5'
        }
      ],
      constraints: 'n ≤ 100; grid[i][j] ∈ {" ", "/", "\\\\"}',
      hint: 'Divide each cell into 4 triangles. Union based on slashes.',
      timeComplexity: 'O(n² α(n))',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun regionsBySlashes(grid: Array<String>): Int {\n  val n = grid.size\n  val uf = UnionFind(n * n * 4)\n\n  fun union(r: Int, c: Int, idx1: Int, idx2: Int) {\n    uf.union(r * n * 4 + c * 4 + idx1, r * n * 4 + c * 4 + idx2)\n  }\n\n  for (i in 0 until n) {\n    for (j in 0 until n) {\n      val root = i * n * 4 + j * 4\n      val t = 0\n      val r = 1\n      val b = 2\n      val l = 3\n\n      when (grid[i][j]) {\n        ' ' -> {\n          uf.union(root + t, root + r)\n          uf.union(root + r, root + b)\n          uf.union(root + b, root + l)\n        }\n        '/' -> {\n          uf.union(root + t, root + l)\n          uf.union(root + r, root + b)\n        }\n        '\\\\\\\\' -> {\n          uf.union(root + t, root + r)\n          uf.union(root + l, root + b)\n        }\n      }\n\n      if (i + 1 < n) union(i, j, b, (i + 1) * n * 4 + j * 4 + 0)\n      if (j + 1 < n) union(i, j, r, i * n * 4 + (j + 1) * 4 + 3)\n    }\n  }\n\n  return (0 until n * n * 4).count { uf.find(it) == it }\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "int regionsBySlashes(List<String> grid) {\n  return 0;\n}",
        swift: "func regionsBySlashes(_ grid: [String]) -> Int {\n  return 0\n}",
        haskell: "regionsBySlashes :: [String] -> Int\nregionsBySlashes grid = 0"
      }
    },
    {
      id: 16,
      title: 'Number of Operations to Make Network Connected',
      difficulty: 'medium',
      tags: ['Union-Find', 'Network', 'Components'],
      description: 'Count operations needed to connect all computers with cables.',
      examples: [
        {
          input: 'n = 4, connections = [[0,1],[0,2],[1,2]]',
          output: '1'
        }
      ],
      constraints: 'n ≤ 10^5; connections ≤ n(n-1)/2',
      hint: 'Find components. Answer is components - 1 (redundant edges needed).',
      timeComplexity: 'O((n + E) α(n))',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun makeConnected(n: Int, connections: Array<IntArray>): Int {\n  if (connections.size < n - 1) return -1\n\n  val uf = UnionFind(n)\n  for ((u, v) in connections) {\n    uf.union(u, v)\n  }\n\n  val components = (0 until n).count { uf.find(it) == it }\n  return components - 1\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "int makeConnected(int n, List<List<int>> connections) {\n  if (connections.length < n - 1) return -1;\n\n  final uf = UnionFind(n);\n  for (final c in connections) {\n    uf.union(c[0], c[1]);\n  }\n\n  int components = 0;\n  for (int i = 0; i < n; i++) {\n    if (uf.find(i) == i) components++;\n  }\n\n  return components - 1;\n}",
        swift: "func makeConnected(_ n: Int, _ connections: [[Int]]) -> Int {\n  guard connections.count >= n - 1 else { return -1 }\n\n  let uf = UnionFind(n)\n  for conn in connections {\n    uf.union(conn[0], conn[1])\n  }\n\n  let components = (0..<n).filter { uf.find($0) == $0 }.count\n  return components - 1\n}",
        haskell: "makeConnected :: Int -> [[Int]] -> Int\nmakeConnected n connections = -1"
      }
    },
    {
      id: 17,
      title: 'Find if Path Exists in Graph (Union Find)',
      difficulty: 'easy',
      tags: ['Union-Find', 'Path Finding', 'Graph'],
      description: 'Determine if path exists from source to destination.',
      examples: [
        {
          input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2',
          output: 'true'
        }
      ],
      constraints: 'n ≤ 1000; edges ≤ 10000',
      hint: 'Union all connected nodes. Check if source and destination have same root.',
      timeComplexity: 'O((V + E) α(V))',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun validPathUnionFind(n: Int, edges: Array<IntArray>, source: Int, destination: Int): Boolean {\n  val uf = UnionFind(n)\n  for ((u, v) in edges) {\n    uf.union(u, v)\n  }\n  return uf.find(source) == uf.find(destination)\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "bool validPathUnionFind(int n, List<List<int>> edges, int source, int destination) {\n  final uf = UnionFind(n);\n  for (final e in edges) {\n    uf.union(e[0], e[1]);\n  }\n  return uf.find(source) == uf.find(destination);\n}",
        swift: "func validPathUnionFind(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {\n  let uf = UnionFind(n)\n  for edge in edges {\n    uf.union(edge[0], edge[1])\n  }\n  return uf.find(source) == uf.find(destination)\n}",
        haskell: "validPathUnionFind :: Int -> [[Int]] -> Int -> Int -> Bool\nvalidPathUnionFind n edges source destination = True"
      }
    },
    {
      id: 18,
      title: 'Smallest String With Swaps',
      difficulty: 'medium',
      tags: ['Union-Find', 'String', 'Sorting'],
      description: 'Lexicographically smallest string via swaps allowed by pairs.',
      examples: [
        {
          input: 's = "dcba", pairs = [[0,3],[1,2]]',
          output: '"bacd"'
        }
      ],
      constraints: 's.length ≤ 10^5; pairs.length ≤ 10^5',
      hint: 'Union indices that can swap. Group and sort within components.',
      timeComplexity: 'O((n + P) α(n) + n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun smallestStringWithSwaps(s: String, pairs: List<List<Int>>): String {\n  val n = s.length\n  val uf = UnionFind(n)\n\n  for ((u, v) in pairs) {\n    uf.union(u, v)\n  }\n\n  val groups = mutableMapOf<Int, MutableList<Int>>()\n  for (i in 0 until n) {\n    groups.computeIfAbsent(uf.find(i)) { mutableListOf() }.add(i)\n  }\n\n  val result = CharArray(n)\n  for ((_, indices) in groups) {\n    val chars = indices.map { s[it] }.sorted()\n    val sortedIndices = indices.sorted()\n    for (j in chars.indices) {\n      result[sortedIndices[j]] = chars[j]\n    }\n  }\n\n  return result.joinToString(\"\")\n}\n\nclass UnionFind(n: Int) {\n  private val parent = IntArray(n) { it }\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  fun union(x: Int, y: Int) {\n    parent[find(x)] = find(y)\n  }\n}",
        dart: "String smallestStringWithSwaps(String s, List<List<int>> pairs) {\n  final n = s.length;\n  final uf = UnionFind(n);\n\n  for (final p in pairs) {\n    uf.union(p[0], p[1]);\n  }\n\n  final groups = <int, List<int>>{};\n  for (int i = 0; i < n; i++) {\n    final root = uf.find(i);\n    if (!groups.containsKey(root)) groups[root] = [];\n    groups[root]!.add(i);\n  }\n\n  final result = List.filled(n, '');\n  for (final indices in groups.values) {\n    final chars = [for (int i in indices) s[i]];\n    chars.sort();\n    indices.sort();\n    for (int j = 0; j < chars.length; j++) {\n      result[indices[j]] = chars[j];\n    }\n  }\n\n  return result.join('');\n}",
        swift: "func smallestStringWithSwaps(_ s: String, _ pairs: [[Int]]) -> String {\n  let chars = Array(s)\n  let n = chars.count\n  let uf = UnionFind(n)\n\n  for pair in pairs {\n    uf.union(pair[0], pair[1])\n  }\n\n  var groups: [Int: [Int]] = [:]\n  for i in 0..<n {\n    let root = uf.find(i)\n    if groups[root] == nil { groups[root] = [] }\n    groups[root]!.append(i)\n  }\n\n  var result = Array(repeating: Character(\"\"), count: n)\n  for (_, indices) in groups {\n    let chars_sorted = indices.map { chars[$0] }.sorted()\n    let indices_sorted = indices.sorted()\n    for j in chars_sorted.indices {\n      result[indices_sorted[j]] = chars_sorted[j]\n    }\n  }\n\n  return String(result)\n}",
        haskell: "smallestStringWithSwaps :: String -> [[Int]] -> String\nsmallestStringWithSwaps s pairs = \"\""
      }
    },
    {
      id: 19,
      title: 'Maximum Number of Points With Cost',
      difficulty: 'hard',
      tags: ['DP', 'Dynamic Programming', 'Greedy'],
      description: 'Pick one point from each row maximizing points minus distance cost.',
      examples: [
        {
          input: 'points = [[1,2,3],[1,5,1],[3,1,1]]',
          output: '9'
        }
      ],
      constraints: 'm, n ≤ 100000; points ≤ 10^9',
      hint: 'DP: dp[j] = max points ending at (row, j). Use deque for sliding window.',
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun maxPoints(points: Array<IntArray>): Long {\n  val m = points.size\n  val n = points[0].size\n  var dp = LongArray(n) { points[0][it].toLong() }\n\n  for (i in 1 until m) {\n    val newDp = LongArray(n)\n    var maxVal = Long.MIN_VALUE\n\n    for (j in 0 until n) {\n      maxVal = maxOf(maxVal, dp[j] + j)\n      newDp[j] = maxOf(newDp[j], maxVal - j + points[i][j])\n    }\n\n    maxVal = Long.MIN_VALUE\n    for (j in n - 1 downTo 0) {\n      maxVal = maxOf(maxVal, dp[j] - j)\n      newDp[j] = maxOf(newDp[j], maxVal + j + points[i][j])\n    }\n\n    dp = newDp\n  }\n\n  return dp.maxOrNull() ?: 0L\n}",
        dart: "int maxPoints(List<List<int>> points) {\n  final m = points.length;\n  final n = points[0].length;\n  List<int> dp = [for (int j = 0; j < n; j++) points[0][j]];\n\n  for (int i = 1; i < m; i++) {\n    final newDp = List.filled(n, 0);\n    int maxVal = -2147483648;\n\n    for (int j = 0; j < n; j++) {\n      maxVal = max(maxVal, dp[j] + j);\n      newDp[j] = max(newDp[j], maxVal - j + points[i][j]);\n    }\n\n    maxVal = -2147483648;\n    for (int j = n - 1; j >= 0; j--) {\n      maxVal = max(maxVal, dp[j] - j);\n      newDp[j] = max(newDp[j], maxVal + j + points[i][j]);\n    }\n\n    dp = newDp;\n  }\n\n  return dp.reduce((a, b) => a > b ? a : b);\n}",
        swift: "func maxPoints(_ points: [[Int]]) -> Int {\n  let m = points.count\n  let n = points[0].count\n  var dp = points[0].map { Int64($0) }\n\n  for i in 1..<m {\n    var newDp = Array(repeating: Int64.min, count: n)\n    var maxVal = Int64.min\n\n    for j in 0..<n {\n      maxVal = max(maxVal, dp[j] + Int64(j))\n      newDp[j] = max(newDp[j], maxVal - Int64(j) + Int64(points[i][j]))\n    }\n\n    maxVal = Int64.min\n    for j in stride(from: n-1, through: 0, by: -1) {\n      maxVal = max(maxVal, dp[j] - Int64(j))\n      newDp[j] = max(newDp[j], maxVal + Int64(j) + Int64(points[i][j]))\n    }\n\n    dp = newDp\n  }\n\n  return Int(dp.max() ?? 0)\n}",
        haskell: "maxPoints :: [[Int]] -> Int\nmaxPoints points = 0"
      }
    },
    {
      id: 20,
      title: 'Minimum Number of Vertices to Reach All Nodes',
      difficulty: 'medium',
      tags: ['Graph', 'Indegree', 'Reachability'],
      description: 'Find minimum set of vertices from which all nodes are reachable.',
      examples: [
        {
          input: 'n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,1]]',
          output: '[0,3]'
        }
      ],
      constraints: 'n ≤ 10^5; edges ≤ n',
      hint: 'Nodes with indegree 0 must be in starting set (unreachable from others).',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minReachableVertices(n: Int, edges: Array<IntArray>): List<Int> {\n  val indegree = IntArray(n)\n  for ((u, v) in edges) {\n    indegree[v]++\n  }\n\n  return (0 until n).filter { indegree[it] == 0 }\n}",
        dart: "List<int> minReachableVertices(int n, List<List<int>> edges) {\n  final indegree = List.filled(n, 0);\n  for (final e in edges) {\n    indegree[e[1]]++;\n  }\n\n  return [for (int i = 0; i < n; i++) if (indegree[i] == 0) i];\n}",
        swift: "func minReachableVertices(_ n: Int, _ edges: [[Int]]) -> [Int] {\n  var indegree = Array(repeating: 0, count: n)\n  for edge in edges {\n    indegree[edge[1]] += 1\n  }\n\n  return (0..<n).filter { indegree[$0] == 0 }\n}",
        haskell: "minReachableVertices :: Int -> [[Int]] -> [Int]\nminReachableVertices n edges = [i | i <- [0..n-1], indegree !! i == 0]\n  where indegree = replicate n 0"
      }
    }
  ]
}
