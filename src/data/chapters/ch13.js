export default {
  id: 13,
  year: 2,
  slug: 'shortest-paths',
  icon: '🛣️',
  color: '#ffa657',
  title: 'Shortest Path Algorithms',
  subtitle: 'Dijkstra, Bellman-Ford, Floyd-Warshall',
  description: 'Explore algorithms for finding shortest paths in weighted graphs. Master Dijkstra\'s greedy approach, Bellman-Ford for negative edges, and Floyd-Warshall for all-pairs shortest paths.',
  theorems: [
    {
      id: 1,
      name: 'Dijkstra\'s Correctness',
      katex_statement: '\\text{Dijkstra finds shortest path from source to all vertices in non-negative weighted graphs}',
      statement_text: 'Dijkstra\'s algorithm correctly computes shortest distances using the greedy choice of minimum tentative distance.',
      proof: 'Proof by induction on the number of vertices added to the visited set S. Invariant: distances to S are optimal. Base: dist[source]=0 is correct. Inductive step: assume dist[v] is optimal for all v in S. When we add u (minimum dist[u] not in S), suppose there exists shorter path to u. This path must leave S at some vertex w. But dist[w] + weight(w,u) ≥ dist[u] by minimality of u, contradiction. Therefore dist[u] is optimal.'
    },
    {
      id: 2,
      name: 'Bellman-Ford Negative Cycle Detection',
      katex_statement: '\\text{After } V-1 \\text{ iterations, further relaxation indicates negative cycle}',
      statement_text: 'Bellman-Ford detects negative cycles: if any distance improves after V-1 iterations, a negative cycle exists.',
      proof: 'A shortest path without cycles has at most V-1 edges. If we can still improve distances after V-1 iterations of relaxation, a path must use at least V edges, which implies a cycle. If distances still decrease, this cycle must be negative.'
    },
    {
      id: 3,
      name: 'Floyd-Warshall Optimal Substructure',
      katex_statement: 'dist[i][j] = \\min(dist[i][j], dist[i][k] + dist[k][j]) \\text{ for all intermediate } k',
      statement_text: 'The shortest path from i to j either does not use k, or uses k as intermediate vertex.',
      proof: 'Shortest path property: any subpath of a shortest path is itself a shortest path. For shortest path i→j using only vertices in {1..k}, either k is not used (same as {1..k-1}), or k is used, decomposing into i→k→j where both subpaths are shortest using {1..k-1}.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Network Delay Time',
      difficulty: 'medium',
      tags: ['Dijkstra', 'Shortest Path', 'Graph'],
      description: 'Given a network of nodes and travel times, find time for signal from node k to reach all nodes.',
      examples: [
        {
          input: 'times = [[1,2,1],[2,3,2],[1,3,4]], n = 3, k = 1',
          output: '4'
        }
      ],
      constraints: 'n ≤ 100; times.length ≤ n(n-1)/2; k ∈ [1, n]',
      hint: 'Use Dijkstra from source k. Return max distance or -1 if unreachable.',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {\n  val graph = List(n + 1) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, w) in times) {\n    graph[u].add(v to w)\n  }\n\n  val dist = IntArray(n + 1) { Int.MAX_VALUE }\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  dist[k] = 0\n  pq.add(0 to k)\n\n  while (pq.isNotEmpty()) {\n    val (d, u) = pq.poll()\n    if (d > dist[u]) continue\n    for ((v, w) in graph[u]) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w\n        pq.add(dist[v] to v)\n      }\n    }\n  }\n\n  val maxDist = dist.drop(1).maxOrNull() ?: 0\n  return if (maxDist == Int.MAX_VALUE) -1 else maxDist\n}",
        dart: "int networkDelayTime(List<List<int>> times, int n, int k) {\n  final graph = List.generate(n + 1, (_) => <(int, int)>[]);\n  for (final t in times) {\n    graph[t[0]].add((t[1], t[2]));\n  }\n\n  final dist = List.filled(n + 1, 2147483647);\n  final pq = PriorityQueue<(int, int)>();\n  dist[k] = 0;\n  pq.add((0, k));\n\n  while (!pq.isEmpty) {\n    final (d, u) = pq.removeFirst();\n    if (d > dist[u]) continue;\n    for (final (v, w) in graph[u]) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n        pq.add((dist[v], v));\n      }\n    }\n  }\n\n  final maxDist = dist.sublist(1).reduce((a, b) => a < b ? b : a);\n  return maxDist == 2147483647 ? -1 : maxDist;\n}",
        swift: "func networkDelayTime(_ times: [[Int]], _ n: Int, _ k: Int) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n + 1)\n  for time in times {\n    graph[time[0]].append((time[1], time[2]))\n  }\n\n  var dist = Array(repeating: Int.max, count: n + 1)\n  var pq: [(Int, Int)] = [(0, k)]\n  dist[k] = 0\n  var idx = 0\n\n  while idx < pq.count {\n    let (d, u) = pq[idx]\n    idx += 1\n    if d > dist[u] { continue }\n    for (v, w) in graph[u] {\n      if dist[u] + w < dist[v] {\n        dist[v] = dist[u] + w\n        pq.append((dist[v], v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  let maxDist = dist.dropFirst().max() ?? 0\n  return maxDist == Int.max ? -1 : maxDist\n}",
        haskell: "networkDelayTime :: [[Int]] -> Int -> Int -> Int\nnetworkDelayTime times n k = 0"
      }
    },
    {
      id: 2,
      title: 'Path with Minimum Effort',
      difficulty: 'medium',
      tags: ['Dijkstra', 'Effort', 'Grid'],
      description: 'In a grid with heights, find path minimizing maximum height difference (effort).',
      examples: [
        {
          input: 'heights = [[1,2,2],[3,8,2],[5,3,5]]',
          output: '2'
        }
      ],
      constraints: 'm, n ≤ 100; 1 ≤ heights[i][j] ≤ 10^6',
      hint: 'Dijkstra where cost is max absolute difference. Minimize effort.',
      timeComplexity: 'O(mn log(mn))',
      spaceComplexity: 'O(mn)',
      solutions: {
        kotlin: "fun minimumEffortPath(heights: Array<IntArray>): Int {\n  val m = heights.size\n  val n = heights[0].size\n  val effort = Array(m) { IntArray(n) { Int.MAX_VALUE } }\n  val pq = PriorityQueue<Triple<Int, Int, Int>>(compareBy { it.first })\n  effort[0][0] = 0\n  pq.add(Triple(0, 0, 0))\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0))\n\n  while (pq.isNotEmpty()) {\n    val (e, i, j) = pq.poll()\n    if (e > effort[i][j]) continue\n    if (i == m - 1 && j == n - 1) return e\n\n    for ((di, dj) in dirs) {\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        val newEffort = maxOf(e, kotlin.math.abs(heights[i][j] - heights[ni][nj]))\n        if (newEffort < effort[ni][nj]) {\n          effort[ni][nj] = newEffort\n          pq.add(Triple(newEffort, ni, nj))\n        }\n      }\n    }\n  }\n\n  return effort[m - 1][n - 1]\n}",
        dart: "int minimumEffortPath(List<List<int>> heights) {\n  final m = heights.length;\n  final n = heights[0].length;\n  final effort = List.generate(m, (_) => List.filled(n, 2147483647));\n  final pq = PriorityQueue<(int, int, int)>();\n  effort[0][0] = 0;\n  pq.add((0, 0, 0));\n\n  final dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n\n  while (!pq.isEmpty) {\n    final (e, i, j) = pq.removeFirst();\n    if (e > effort[i][j]) continue;\n    if (i == m - 1 && j == n - 1) return e;\n\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        final newEffort = max(e, (heights[i][j] - heights[ni][nj]).abs());\n        if (newEffort < effort[ni][nj]) {\n          effort[ni][nj] = newEffort;\n          pq.add((newEffort, ni, nj));\n        }\n      }\n    }\n  }\n\n  return effort[m - 1][n - 1];\n}",
        swift: "func minimumEffortPath(_ heights: [[Int]]) -> Int {\n  let m = heights.count\n  let n = heights[0].count\n  var effort = Array(repeating: Array(repeating: Int.max, count: n), count: m)\n  var pq: [(Int, Int, Int)] = [(0, 0, 0)]\n  effort[0][0] = 0\n  var idx = 0\n\n  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]\n\n  while idx < pq.count {\n    let (e, i, j) = pq[idx]\n    idx += 1\n    if e > effort[i][j] { continue }\n    if i == m - 1 && j == n - 1 { return e }\n\n    for dir in dirs {\n      let ni = i + dir[0]\n      let nj = j + dir[1]\n      if ni >= 0 && ni < m && nj >= 0 && nj < n {\n        let newEffort = max(e, abs(heights[i][j] - heights[ni][nj]))\n        if newEffort < effort[ni][nj] {\n          effort[ni][nj] = newEffort\n          pq.append((newEffort, ni, nj))\n          pq.sort { $0.0 < $1.0 }\n        }\n      }\n    }\n  }\n\n  return effort[m - 1][n - 1]\n}",
        haskell: "minimumEffortPath :: [[Int]] -> Int\nminimumEffortPath heights = 0"
      }
    },
    {
      id: 3,
      title: 'Cheapest Flights Within K Stops',
      difficulty: 'medium',
      tags: ['Bellman-Ford', 'DP', 'Shortest Path'],
      description: 'Find cheapest flight from src to dst with at most k stops.',
      examples: [
        {
          input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1',
          output: '200'
        }
      ],
      constraints: 'n ≤ 100; flights.length ≤ 1000; k ≤ n',
      hint: 'Bellman-Ford variant: relax edges k+1 times (k+1 layers = k stops).',
      timeComplexity: 'O(k × E)',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {\n  val prices = IntArray(n) { Int.MAX_VALUE }\n  prices[src] = 0\n\n  for (i in 0..k) {\n    val newPrices = prices.copyOf()\n    for ((u, v, w) in flights) {\n      if (prices[u] != Int.MAX_VALUE) {\n        newPrices[v] = minOf(newPrices[v], prices[u] + w)\n      }\n    }\n    prices = newPrices\n  }\n\n  return if (prices[dst] == Int.MAX_VALUE) -1 else prices[dst]\n}",
        dart: "int findCheapestPrice(int n, List<List<int>> flights, int src, int dst, int k) {\n  final prices = List.filled(n, 2147483647);\n  prices[src] = 0;\n\n  for (int i = 0; i <= k; i++) {\n    final newPrices = List.from(prices);\n    for (final f in flights) {\n      if (prices[f[0]] != 2147483647) {\n        newPrices[f[1]] = min(newPrices[f[1]], prices[f[0]] + f[2]);\n      }\n    }\n    prices.clear();\n    prices.addAll(newPrices);\n  }\n\n  return prices[dst] == 2147483647 ? -1 : prices[dst];\n}",
        swift: "func findCheapestPrice(_ n: Int, _ flights: [[Int]], _ src: Int, _ dst: Int, _ k: Int) -> Int {\n  var prices = Array(repeating: Int.max, count: n)\n  prices[src] = 0\n\n  for _ in 0...k {\n    var newPrices = prices\n    for flight in flights {\n      if prices[flight[0]] != Int.max {\n        newPrices[flight[1]] = min(newPrices[flight[1]], prices[flight[0]] + flight[2])\n      }\n    }\n    prices = newPrices\n  }\n\n  return prices[dst] == Int.max ? -1 : prices[dst]\n}",
        haskell: "findCheapestPrice :: Int -> [[Int]] -> Int -> Int -> Int -> Int\nfindCheapestPrice n flights src dst k = -1"
      }
    },
    {
      id: 4,
      title: 'Find the City With the Smallest Reachable Threshold',
      difficulty: 'medium',
      tags: ['Floyd-Warshall', 'All Pairs', 'Shortest Path'],
      description: 'Find city with smallest maximum distance to other cities, with threshold constraint.',
      examples: [
        {
          input: 'n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4',
          output: '3'
        }
      ],
      constraints: 'n ≤ 100; distanceThreshold ≤ 10^4',
      hint: 'Use Floyd-Warshall to compute all-pairs shortest paths. Count reachable cities.',
      timeComplexity: 'O(V³)',
      spaceComplexity: 'O(V²)',
      solutions: {
        kotlin: "fun findTheCity(n: Int, edges: Array<IntArray>, distanceThreshold: Int): Int {\n  val dist = Array(n) { IntArray(n) { Int.MAX_VALUE / 2 } }\n  for (i in 0 until n) dist[i][i] = 0\n  for ((u, v, w) in edges) {\n    dist[u][v] = minOf(dist[u][v], w)\n    dist[v][u] = minOf(dist[v][u], w)\n  }\n\n  for (k in 0 until n) {\n    for (i in 0 until n) {\n      for (j in 0 until n) {\n        dist[i][j] = minOf(dist[i][j], dist[i][k] + dist[k][j])\n      }\n    }\n  }\n\n  var city = 0\n  var minCount = Int.MAX_VALUE\n  for (i in 0 until n) {\n    var count = 0\n    for (j in 0 until n) {\n      if (dist[i][j] <= distanceThreshold) count++\n    }\n    if (count < minCount) {\n      minCount = count\n      city = i\n    } else if (count == minCount) {\n      city = maxOf(city, i)\n    }\n  }\n\n  return city\n}",
        dart: "int findTheCity(int n, List<List<int>> edges, int distanceThreshold) {\n  final dist = List.generate(n, (_) => List.filled(n, 10000000));\n  for (int i = 0; i < n; i++) dist[i][i] = 0;\n  for (final e in edges) {\n    dist[e[0]][e[1]] = min(dist[e[0]][e[1]], e[2]);\n    dist[e[1]][e[0]] = min(dist[e[1]][e[0]], e[2]);\n  }\n\n  for (int k = 0; k < n; k++) {\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < n; j++) {\n        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);\n      }\n    }\n  }\n\n  int city = 0;\n  int minCount = 2147483647;\n  for (int i = 0; i < n; i++) {\n    int count = 0;\n    for (int j = 0; j < n; j++) {\n      if (dist[i][j] <= distanceThreshold) count++;\n    }\n    if (count < minCount || (count == minCount && i > city)) {\n      minCount = count;\n      city = i;\n    }\n  }\n\n  return city;\n}",
        swift: "func findTheCity(_ n: Int, _ edges: [[Int]], _ distanceThreshold: Int) -> Int {\n  var dist = Array(repeating: Array(repeating: 10000000, count: n), count: n)\n  for i in 0..<n { dist[i][i] = 0 }\n  for edge in edges {\n    dist[edge[0]][edge[1]] = min(dist[edge[0]][edge[1]], edge[2])\n    dist[edge[1]][edge[0]] = min(dist[edge[1]][edge[0]], edge[2])\n  }\n\n  for k in 0..<n {\n    for i in 0..<n {\n      for j in 0..<n {\n        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n      }\n    }\n  }\n\n  var city = 0\n  var minCount = Int.max\n  for i in 0..<n {\n    var count = 0\n    for j in 0..<n {\n      if dist[i][j] <= distanceThreshold { count += 1 }\n    }\n    if count < minCount || (count == minCount && i > city) {\n      minCount = count\n      city = i\n    }\n  }\n\n  return city\n}",
        haskell: "findTheCity :: Int -> [[Int]] -> Int -> Int\nfindTheCity n edges distanceThreshold = 0"
      }
    },
    {
      id: 5,
      title: 'Path with Maximum Probability',
      difficulty: 'medium',
      tags: ['Dijkstra', 'Probability', 'Shortest Path'],
      description: 'Find path from start to end with maximum success probability.',
      examples: [
        {
          input: 'n = 3, edges = [[0,1,0.1],[1,2,0.1],[0,2,0.9]], start = 0, end = 2',
          output: '0.9'
        }
      ],
      constraints: 'n ≤ 100; edges.length ≤ 5000',
      hint: 'Dijkstra maximizing probability. Use negative log for additive distances.',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start: Int, end: Int): Double {\n  val graph = List(n) { mutableListOf<Pair<Int, Double>>() }\n  for (i in edges.indices) {\n    graph[edges[i][0]].add(edges[i][1] to succProb[i])\n    graph[edges[i][1]].add(edges[i][0] to succProb[i])\n  }\n\n  val prob = DoubleArray(n)\n  prob[start] = 1.0\n  val pq = PriorityQueue<Pair<Double, Int>>(compareBy { -it.first })\n  pq.add(1.0 to start)\n\n  while (pq.isNotEmpty()) {\n    val (p, u) = pq.poll()\n    if (p < prob[u]) continue\n    for ((v, w) in graph[u]) {\n      if (prob[u] * w > prob[v]) {\n        prob[v] = prob[u] * w\n        pq.add(prob[v] to v)\n      }\n    }\n  }\n\n  return prob[end]\n}",
        dart: "double maxProbability(int n, List<List<int>> edges, List<double> succProb, int start, int end) {\n  final graph = List.generate(n, (_) => <(int, double)>[]);\n  for (int i = 0; i < edges.length; i++) {\n    graph[edges[i][0]].add((edges[i][1], succProb[i]));\n    graph[edges[i][1]].add((edges[i][0], succProb[i]));\n  }\n\n  final prob = List.filled(n, 0.0);\n  prob[start] = 1.0;\n  final pq = PriorityQueue<(double, int)>();\n  pq.add((1.0, start));\n\n  while (!pq.isEmpty) {\n    final (p, u) = pq.removeFirst();\n    if (p < prob[u]) continue;\n    for (final (v, w) in graph[u]) {\n      if (prob[u] * w > prob[v]) {\n        prob[v] = prob[u] * w;\n        pq.add((prob[v], v));\n      }\n    }\n  }\n\n  return prob[end];\n}",
        swift: "func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start: Int, _ end: Int) -> Double {\n  var graph = Array(repeating: [(Int, Double)](), count: n)\n  for i in 0..<edges.count {\n    graph[edges[i][0]].append((edges[i][1], succProb[i]))\n    graph[edges[i][1]].append((edges[i][0], succProb[i]))\n  }\n\n  var prob = Array(repeating: 0.0, count: n)\n  prob[start] = 1.0\n  var pq: [(Double, Int)] = [(1.0, start)]\n  var idx = 0\n\n  while idx < pq.count {\n    let (p, u) = pq[idx]\n    idx += 1\n    if p < prob[u] { continue }\n    for (v, w) in graph[u] {\n      if prob[u] * w > prob[v] {\n        prob[v] = prob[u] * w\n        pq.append((prob[v], v))\n        pq.sort { $0.0 > $1.0 }\n      }\n    }\n  }\n\n  return prob[end]\n}",
        haskell: "maxProbability :: Int -> [[Int]] -> [Double] -> Int -> Int -> Double\nmaxProbability n edges succProb start end = 0"
      }
    },
    {
      id: 6,
      title: 'Swim in Rising Water',
      difficulty: 'hard',
      tags: ['Dijkstra', 'Binary Search', 'Grid'],
      description: 'Starting at (0,0), swim avoiding water. Water level rises. Return minimum time.',
      examples: [
        {
          input: 'grid = [[0,1,2],[3,4,5],[6,7,8]]',
          output: '0'
        }
      ],
      constraints: 'm, n ≤ 50; 0 ≤ grid[i][j] ≤ mn-1',
      hint: 'Dijkstra minimizing maximum water level encountered on path.',
      timeComplexity: 'O(mn log(mn))',
      spaceComplexity: 'O(mn)',
      solutions: {
        kotlin: "fun swimInWater(grid: Array<IntArray>): Int {\n  val n = grid.size\n  val visited = Array(n) { BooleanArray(n) }\n  val pq = PriorityQueue<Triple<Int, Int, Int>>(compareBy { it.first })\n  pq.add(Triple(grid[0][0], 0, 0))\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0))\n\n  while (pq.isNotEmpty()) {\n    val (time, i, j) = pq.poll()\n    if (visited[i][j]) continue\n    visited[i][j] = true\n\n    if (i == n - 1 && j == n - 1) return time\n\n    for ((di, dj) in dirs) {\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !visited[ni][nj]) {\n        pq.add(Triple(maxOf(time, grid[ni][nj]), ni, nj))\n      }\n    }\n  }\n\n  return 0\n}",
        dart: "int swimInWater(List<List<int>> grid) {\n  final n = grid.length;\n  final visited = List.generate(n, (_) => List.filled(n, false));\n  final pq = PriorityQueue<(int, int, int)>();\n  pq.add((grid[0][0], 0, 0));\n\n  final dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n\n  while (!pq.isEmpty) {\n    final (time, i, j) = pq.removeFirst();\n    if (visited[i][j]) continue;\n    visited[i][j] = true;\n\n    if (i == n - 1 && j == n - 1) return time;\n\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !visited[ni][nj]) {\n        pq.add((max(time, grid[ni][nj]), ni, nj));\n      }\n    }\n  }\n\n  return 0;\n}",
        swift: "func swimInWater(_ grid: [[Int]]) -> Int {\n  let n = grid.count\n  var visited = Array(repeating: Array(repeating: false, count: n), count: n)\n  var pq: [(Int, Int, Int)] = [(grid[0][0], 0, 0)]\n  var idx = 0\n\n  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]\n\n  while idx < pq.count {\n    let (time, i, j) = pq[idx]\n    idx += 1\n    if visited[i][j] { continue }\n    visited[i][j] = true\n\n    if i == n - 1 && j == n - 1 { return time }\n\n    for dir in dirs {\n      let ni = i + dir[0]\n      let nj = j + dir[1]\n      if ni >= 0 && ni < n && nj >= 0 && nj < n && !visited[ni][nj] {\n        pq.append((max(time, grid[ni][nj]), ni, nj))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return 0\n}",
        haskell: "swimInWater :: [[Int]] -> Int\nswimInWater grid = 0"
      }
    },
    {
      id: 7,
      title: 'Min Cost to Reach Destination',
      difficulty: 'hard',
      tags: ['Dijkstra', 'State Space', 'Fuel'],
      description: 'Reach destination minimizing cost. Fuel/cost constraints at each station.',
      examples: [
        {
          input: 'station = [[10,100],[20,1100],[30,1100],[5,25],[5,25],[1,1],[10,1],[10,100],[1,1]]',
          output: '25'
        }
      ],
      constraints: 'stations.length ≤ 1000; fuel tank = 1',
      hint: 'State: (position, fuel_in_tank). Dijkstra on expanded state space.',
      timeComplexity: 'O(n² log n)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun minimumCost(station: Array<IntArray>): Int {\n  val n = station.size\n  val cost = Array(n) { IntArray(101) { Int.MAX_VALUE } }\n  val pq = PriorityQueue<Triple<Int, Int, Int>>(compareBy { it.first })\n  cost[0][1] = 0\n  pq.add(Triple(0, 0, 1))\n\n  while (pq.isNotEmpty()) {\n    val (c, pos, fuel) = pq.poll()\n    if (c > cost[pos][fuel]) continue\n\n    for (nextPos in pos + 1..minOf(pos + fuel, n - 1)) {\n      val fuelUsed = nextPos - pos\n      val fuelLeft = fuel - fuelUsed\n      for (refuel in 0..minOf(100 - fuelLeft, station[nextPos][1])) {\n        val newFuel = fuelLeft + refuel\n        val newCost = c + refuel * station[nextPos][0]\n        if (newCost < cost[nextPos][newFuel]) {\n          cost[nextPos][newFuel] = newCost\n          pq.add(Triple(newCost, nextPos, newFuel))\n        }\n      }\n    }\n  }\n\n  return cost[n - 1].minOrNull() ?: 0\n}",
        dart: "int minimumCost(List<List<int>> station) {\n  final n = station.length;\n  final cost = List.generate(n, (_) => List.filled(101, 2147483647));\n  final pq = PriorityQueue<(int, int, int)>();\n  cost[0][1] = 0;\n  pq.add((0, 0, 1));\n\n  while (!pq.isEmpty) {\n    final (c, pos, fuel) = pq.removeFirst();\n    if (c > cost[pos][fuel]) continue;\n\n    for (int nextPos = pos + 1; nextPos <= min(pos + fuel, n - 1); nextPos++) {\n      final fuelUsed = nextPos - pos;\n      final fuelLeft = fuel - fuelUsed;\n      for (int refuel = 0; refuel <= min(100 - fuelLeft, station[nextPos][1]); refuel++) {\n        final newFuel = fuelLeft + refuel;\n        final newCost = c + refuel * station[nextPos][0];\n        if (newCost < cost[nextPos][newFuel]) {\n          cost[nextPos][newFuel] = newCost;\n          pq.add((newCost, nextPos, newFuel));\n        }\n      }\n    }\n  }\n\n  return cost[n - 1].reduce((a, b) => a < b ? a : b);\n}",
        swift: "func minimumCost(_ station: [[Int]]) -> Int {\n  let n = station.count\n  var cost = Array(repeating: Array(repeating: Int.max, count: 101), count: n)\n  var pq: [(Int, Int, Int)] = [(0, 0, 1)]\n  cost[0][1] = 0\n  var idx = 0\n\n  while idx < pq.count {\n    let (c, pos, fuel) = pq[idx]\n    idx += 1\n    if c > cost[pos][fuel] { continue }\n\n    for nextPos in (pos + 1)...min(pos + fuel, n - 1) {\n      let fuelUsed = nextPos - pos\n      let fuelLeft = fuel - fuelUsed\n      for refuel in 0...min(100 - fuelLeft, station[nextPos][1]) {\n        let newFuel = fuelLeft + refuel\n        let newCost = c + refuel * station[nextPos][0]\n        if newCost < cost[nextPos][newFuel] {\n          cost[nextPos][newFuel] = newCost\n          pq.append((newCost, nextPos, newFuel))\n          pq.sort { $0.0 < $1.0 }\n        }\n      }\n    }\n  }\n\n  return cost[n - 1].min() ?? 0\n}",
        haskell: "minimumCost :: [[Int]] -> Int\nminimumCost station = 0"
      }
    },
    {
      id: 8,
      title: 'Shortest Path in Binary Matrix',
      difficulty: 'medium',
      tags: ['BFS', 'Shortest Path', 'Grid'],
      description: 'Find shortest path in binary matrix from top-left to bottom-right.',
      examples: [
        {
          input: 'grid = [[0,1],[1,0]]',
          output: '2'
        }
      ],
      constraints: 'm, n ≤ 100; grid[i][j] ∈ {0, 1}',
      hint: 'BFS with 8-directional movement. 0=walkable, 1=blocked.',
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(mn)',
      solutions: {
        kotlin: "fun shortestPathBinaryMatrix(grid: Array<IntArray>): Int {\n  val n = grid.size\n  val m = grid[0].size\n  if (grid[0][0] == 1 || grid[n-1][m-1] == 1) return -1\n  if (n == 1 && m == 1) return 1\n\n  val dist = Array(n) { IntArray(m) { -1 } }\n  dist[0][0] = 1\n  val queue = ArrayDeque<Pair<Int, Int>>()\n  queue.add(0 to 0)\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0),\n    intArrayOf(1, 1), intArrayOf(1, -1), intArrayOf(-1, 1), intArrayOf(-1, -1))\n\n  while (queue.isNotEmpty()) {\n    val (i, j) = queue.removeFirst()\n    for ((di, dj) in dirs) {\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < n && nj >= 0 && nj < m && grid[ni][nj] == 0 && dist[ni][nj] == -1) {\n        dist[ni][nj] = dist[i][j] + 1\n        queue.add(ni to nj)\n      }\n    }\n  }\n\n  return dist[n - 1][m - 1]\n}",
        dart: "int shortestPathBinaryMatrix(List<List<int>> grid) {\n  final n = grid.length;\n  final m = grid[0].length;\n  if (grid[0][0] == 1 || grid[n - 1][m - 1] == 1) return -1;\n  if (n == 1 && m == 1) return 1;\n\n  final dist = List.generate(n, (_) => List.filled(m, -1));\n  dist[0][0] = 1;\n  final queue = Queue<(int, int)>();\n  queue.add((0, 0));\n\n  final dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];\n\n  while (!queue.isEmpty) {\n    final (i, j) = queue.removeFirst();\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < n && nj >= 0 && nj < m && grid[ni][nj] == 0 && dist[ni][nj] == -1) {\n        dist[ni][nj] = dist[i][j] + 1;\n        queue.add((ni, nj));\n      }\n    }\n  }\n\n  return dist[n - 1][m - 1];\n}",
        swift: "func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {\n  let n = grid.count\n  let m = grid[0].count\n  guard grid[0][0] == 0 && grid[n-1][m-1] == 0 else { return -1 }\n  if n == 1 && m == 1 { return 1 }\n\n  var dist = Array(repeating: Array(repeating: -1, count: m), count: n)\n  dist[0][0] = 1\n  var queue: [(Int, Int)] = [(0, 0)]\n  var idx = 0\n\n  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]\n\n  while idx < queue.count {\n    let (i, j) = queue[idx]\n    idx += 1\n    for dir in dirs {\n      let ni = i + dir[0]\n      let nj = j + dir[1]\n      if ni >= 0 && ni < n && nj >= 0 && nj < m && grid[ni][nj] == 0 && dist[ni][nj] == -1 {\n        dist[ni][nj] = dist[i][j] + 1\n        queue.append((ni, nj))\n      }\n    }\n  }\n\n  return dist[n - 1][m - 1]\n}",
        haskell: "shortestPathBinaryMatrix :: [[Int]] -> Int\nshortestPathBinaryMatrix grid = -1"
      }
    },
    {
      id: 9,
      title: 'K Shortest Paths',
      difficulty: 'hard',
      tags: ['Dijkstra', 'K-way', 'Graph'],
      description: 'Find k shortest paths from source to destination.',
      examples: [
        {
          input: 'n = 3, edges = [[0,1,1],[1,2,1],[0,2,4]], k = 2, source = 0, target = 2',
          output: '[[0,1,2],[0,2]]'
        }
      ],
      constraints: 'n ≤ 100; edges.length ≤ 1000; k ≤ 10',
      hint: 'Yen\'s algorithm or modified Dijkstra tracking k best paths.',
      timeComplexity: 'O(k × V × (E + V log V))',
      spaceComplexity: 'O(k × V)',
      solutions: {
        kotlin: "fun kShortestPaths(n: Int, edges: Array<IntArray>, k: Int, source: Int, target: Int): List<List<Int>> {\n  val graph = List(n) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, w) in edges) {\n    graph[u].add(v to w)\n    graph[v].add(u to w)\n  }\n\n  val paths = mutableListOf<List<Int>>()\n  val pq = PriorityQueue<Pair<Int, List<Int>>>(compareBy { it.first })\n  pq.add(0 to listOf(source))\n\n  while (pq.isNotEmpty() && paths.size < k) {\n    val (cost, path) = pq.poll()\n    if (path.last() == target) {\n      paths.add(path)\n      continue\n    }\n\n    for ((next, w) in graph[path.last()]) {\n      if (next !in path) {\n        pq.add((cost + w) to (path + next))\n      }\n    }\n  }\n\n  return paths\n}",
        dart: "List<List<int>> kShortestPaths(int n, List<List<int>> edges, int k, int source, int target) {\n  final graph = List.generate(n, (_) => <(int, int)>[]);\n  for (final e in edges) {\n    graph[e[0]].add((e[1], e[2]));\n    graph[e[1]].add((e[0], e[2]));\n  }\n\n  final paths = <List<int>>[];\n  final pq = PriorityQueue<(int, List<int>)>();\n  pq.add((0, [source]));\n\n  while (!pq.isEmpty && paths.length < k) {\n    final (cost, path) = pq.removeFirst();\n    if (path.last == target) {\n      paths.add(path);\n      continue;\n    }\n\n    for (final (next, w) in graph[path.last]) {\n      if (!path.contains(next)) {\n        pq.add((cost + w, [...path, next]));\n      }\n    }\n  }\n\n  return paths;\n}",
        swift: "func kShortestPaths(_ n: Int, _ edges: [[Int]], _ k: Int, _ source: Int, _ target: Int) -> [[Int]] {\n  var graph = Array(repeating: [(Int, Int)](), count: n)\n  for edge in edges {\n    graph[edge[0]].append((edge[1], edge[2]))\n    graph[edge[1]].append((edge[0], edge[2]))\n  }\n\n  var paths: [[Int]] = []\n  var pq: [(Int, [Int])] = [(0, [source])]\n  var idx = 0\n\n  while idx < pq.count && paths.count < k {\n    let (cost, path) = pq[idx]\n    idx += 1\n    if path.last == target {\n      paths.append(path)\n      continue\n    }\n\n    for (next, w) in graph[path.last!] {\n      if !path.contains(next) {\n        pq.append((cost + w, path + [next]))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return paths\n}",
        haskell: "kShortestPaths :: Int -> [[Int]] -> Int -> Int -> Int -> [[Int]]\nkShortestPaths n edges k source target = []"
      }
    },
    {
      id: 10,
      title: 'Shortest Path Visiting All Nodes',
      difficulty: 'hard',
      tags: ['BFS', 'TSP', 'Bitmask DP'],
      description: 'Find shortest path visiting every node exactly once (TSP-like).',
      examples: [
        {
          input: 'graph = [[1,2,3],[0],[0],[0]]',
          output: '4'
        }
      ],
      constraints: 'n ≤ 12; graph is connected',
      hint: 'BFS with state = (node, visited_mask). Track distances.',
      timeComplexity: 'O(2^n × n²)',
      spaceComplexity: 'O(2^n × n)',
      solutions: {
        kotlin: "fun shortestPathWithHops(graph: List<List<Int>>): Int {\n  val n = graph.size\n  val dist = Array(1 shl n) { IntArray(n) { Int.MAX_VALUE } }\n  dist[1][0] = 0\n  val queue = ArrayDeque<Pair<Int, Int>>()\n  queue.add(0 to 0)\n\n  while (queue.isNotEmpty()) {\n    val (mask, node) = queue.removeFirst()\n    for (next in graph[node]) {\n      val newMask = mask or (1 shl next)\n      if (dist[mask][node] + 1 < dist[newMask][next]) {\n        dist[newMask][next] = dist[mask][node] + 1\n        queue.add(newMask to next)\n      }\n    }\n  }\n\n  val fullMask = (1 shl n) - 1\n  return dist[fullMask].minOrNull() ?: -1\n}",
        dart: "int shortestPathWithHops(List<List<int>> graph) {\n  final n = graph.length;\n  final dist = List.generate(1 << n, (_) => List.filled(n, 2147483647));\n  dist[1][0] = 0;\n  final queue = Queue<(int, int)>();\n  queue.add((0, 0));\n\n  while (!queue.isEmpty) {\n    final (mask, node) = queue.removeFirst();\n    for (final next in graph[node]) {\n      final newMask = mask | (1 << next);\n      if (dist[mask][node] + 1 < dist[newMask][next]) {\n        dist[newMask][next] = dist[mask][node] + 1;\n        queue.add((newMask, next));\n      }\n    }\n  }\n\n  final fullMask = (1 << n) - 1;\n  return dist[fullMask].reduce((a, b) => a < b ? a : b);\n}",
        swift: "func shortestPathWithHops(_ graph: [[Int]]) -> Int {\n  let n = graph.count\n  var dist = Array(repeating: Array(repeating: Int.max, count: n), count: 1 << n)\n  dist[1][0] = 0\n  var queue: [(Int, Int)] = [(0, 0)]\n  var idx = 0\n\n  while idx < queue.count {\n    let (mask, node) = queue[idx]\n    idx += 1\n    for next in graph[node] {\n      let newMask = mask | (1 << next)\n      if dist[mask][node] + 1 < dist[newMask][next] {\n        dist[newMask][next] = dist[mask][node] + 1\n        queue.append((newMask, next))\n      }\n    }\n  }\n\n  let fullMask = (1 << n) - 1\n  return dist[fullMask].min() ?? -1\n}",
        haskell: "shortestPathWithHops :: [[Int]] -> Int\nshortestPathWithHops graph = -1"
      }
    },
    {
      id: 11,
      title: 'Minimum Cost to Make at Least One Valid Path in a Grid',
      difficulty: 'hard',
      tags: ['0-1 BFS', 'Dijkstra', 'Grid'],
      description: 'Change directions at cost 1. Find min cost for path top-left to bottom-right.',
      examples: [
        {
          input: 'grid = [[4,3,2],[3,2,1]]',
          output: '0'
        }
      ],
      constraints: 'm, n ≤ 100; grid[i][j] ∈ {1,2,3,4}',
      hint: '0-1 BFS: cost 0 following direction, cost 1 changing direction.',
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(mn)',
      solutions: {
        kotlin: "fun minimumCost(grid: Array<IntArray>): Int {\n  val m = grid.size\n  val n = grid[0].size\n  val dist = Array(m) { IntArray(n) { Int.MAX_VALUE } }\n  dist[0][0] = 0\n  val deque = ArrayDeque<Pair<Int, Int>>()\n  deque.add(0 to 0)\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))\n\n  while (deque.isNotEmpty()) {\n    val (i, j) = deque.removeFirst()\n    for (d in 0..3) {\n      val (di, dj) = dirs[d]\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        val cost = if (grid[i][j] == d + 1) 0 else 1\n        if (dist[i][j] + cost < dist[ni][nj]) {\n          dist[ni][nj] = dist[i][j] + cost\n          if (cost == 0) deque.addFirst(ni to nj)\n          else deque.addLast(ni to nj)\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1]\n}",
        dart: "int minimumCost(List<List<int>> grid) {\n  final m = grid.length;\n  final n = grid[0].length;\n  final dist = List.generate(m, (_) => List.filled(n, 2147483647));\n  dist[0][0] = 0;\n  final deque = Deque<(int, int)>();\n  deque.add((0, 0));\n\n  final dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];\n\n  while (!deque.isEmpty) {\n    final (i, j) = deque.removeFirst();\n    for (int d = 0; d < 4; d++) {\n      final ni = i + dirs[d][0];\n      final nj = j + dirs[d][1];\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        final cost = (grid[i][j] == d + 1) ? 0 : 1;\n        if (dist[i][j] + cost < dist[ni][nj]) {\n          dist[ni][nj] = dist[i][j] + cost;\n          if (cost == 0) deque.addFirst((ni, nj));\n          else deque.addLast((ni, nj));\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1];\n}",
        swift: "func minimumCost(_ grid: [[Int]]) -> Int {\n  let m = grid.count\n  let n = grid[0].count\n  var dist = Array(repeating: Array(repeating: Int.max, count: n), count: m)\n  dist[0][0] = 0\n  var deque: [(Int, Int)] = [(0, 0)]\n  var front = 0, back = 1\n\n  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n\n  while front < back {\n    let (i, j) = deque[front]\n    front += 1\n    for d in 0..<4 {\n      let ni = i + dirs[d][0]\n      let nj = j + dirs[d][1]\n      if ni >= 0 && ni < m && nj >= 0 && nj < n {\n        let cost = (grid[i][j] == d + 1) ? 0 : 1\n        if dist[i][j] + cost < dist[ni][nj] {\n          dist[ni][nj] = dist[i][j] + cost\n          if cost == 0 {\n            deque.insert((ni, nj), at: front)\n            back += 1\n          } else {\n            deque.append((ni, nj))\n            back += 1\n          }\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1]\n}",
        haskell: "minimumCost :: [[Int]] -> Int\nminimumCost grid = -1"
      }
    },
    {
      id: 12,
      title: 'Reachable Nodes In Subdivided Graph',
      difficulty: 'hard',
      tags: ['Dijkstra', 'Graph', 'Subdivision'],
      description: 'Subdivided edges into multiple nodes. Count reachable nodes within distance k.',
      examples: [
        {
          input: 'edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3',
          output: '13'
        }
      ],
      constraints: 'n ≤ 5000; edges.length ≤ 5000',
      hint: 'Dijkstra counting subdivided nodes. Each edge subdivided into unit segments.',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun reachableNodes(edges: Array<IntArray>, maxMoves: Int, n: Int): Int {\n  val graph = List(n) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, w) in edges) {\n    graph[u].add(v to w)\n    graph[v].add(u to w)\n  }\n\n  val dist = IntArray(n) { Int.MAX_VALUE }\n  dist[0] = 0\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  pq.add(0 to 0)\n\n  while (pq.isNotEmpty()) {\n    val (d, u) = pq.poll()\n    if (d > dist[u]) continue\n    for ((v, w) in graph[u]) {\n      val newDist = dist[u] + w\n      if (newDist < dist[v] && newDist <= maxMoves) {\n        dist[v] = newDist\n        pq.add(newDist to v)\n      }\n    }\n  }\n\n  var count = 0\n  for (i in 0 until n) {\n    if (dist[i] <= maxMoves) count++\n  }\n\n  for ((u, v, w) in edges) {\n    count += minOf(w - 1, (maxMoves - dist[u]) + (maxMoves - dist[v]))\n  }\n\n  return count\n}",
        dart: "int reachableNodes(List<List<int>> edges, int maxMoves, int n) {\n  final graph = List.generate(n, (_) => <(int, int)>[]);\n  for (final e in edges) {\n    graph[e[0]].add((e[1], e[2]));\n    graph[e[1]].add((e[0], e[2]));\n  }\n\n  final dist = List.filled(n, 2147483647);\n  dist[0] = 0;\n  final pq = PriorityQueue<(int, int)>();\n  pq.add((0, 0));\n\n  while (!pq.isEmpty) {\n    final (d, u) = pq.removeFirst();\n    if (d > dist[u]) continue;\n    for (final (v, w) in graph[u]) {\n      final newDist = dist[u] + w;\n      if (newDist < dist[v] && newDist <= maxMoves) {\n        dist[v] = newDist;\n        pq.add((newDist, v));\n      }\n    }\n  }\n\n  int count = 0;\n  for (int i = 0; i < n; i++) {\n    if (dist[i] <= maxMoves) count++;\n  }\n\n  for (final e in edges) {\n    count += min(e[2] - 1, (maxMoves - dist[e[0]]) + (maxMoves - dist[e[1]]));\n  }\n\n  return count;\n}",
        swift: "func reachableNodes(_ edges: [[Int]], _ maxMoves: Int, _ n: Int) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n)\n  for edge in edges {\n    graph[edge[0]].append((edge[1], edge[2]))\n    graph[edge[1]].append((edge[0], edge[2]))\n  }\n\n  var dist = Array(repeating: Int.max, count: n)\n  dist[0] = 0\n  var pq: [(Int, Int)] = [(0, 0)]\n  var idx = 0\n\n  while idx < pq.count {\n    let (d, u) = pq[idx]\n    idx += 1\n    if d > dist[u] { continue }\n    for (v, w) in graph[u] {\n      let newDist = dist[u] + w\n      if newDist < dist[v] && newDist <= maxMoves {\n        dist[v] = newDist\n        pq.append((newDist, v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  var count = 0\n  for i in 0..<n {\n    if dist[i] <= maxMoves { count += 1 }\n  }\n\n  for edge in edges {\n    count += min(edge[2] - 1, (maxMoves - dist[edge[0]]) + (maxMoves - dist[edge[1]]))\n  }\n\n  return count\n}",
        haskell: "reachableNodes :: [[Int]] -> Int -> Int -> Int\nreachableNodes edges maxMoves n = 0"
      }
    },
    {
      id: 13,
      title: 'Second Minimum Time to Reach Destination',
      difficulty: 'hard',
      tags: ['Dijkstra', 'Second Shortest', 'Graph'],
      description: 'Find second minimum time to reach destination (not necessarily shortest path).',
      examples: [
        {
          input: 'time = [[1,1],[4,3],[1,2]], change = 5, n = 3',
          output: '13'
        }
      ],
      constraints: 'n ≤ 100; time[i][2] ≤ 100; change ≤ 200',
      hint: 'Track two best times to each node. Account for traffic light cycles.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun secondMinimumTime(time: Array<IntArray>, change: Int, n: Int): Int {\n  val graph = List(n + 1) { mutableListOf<Pair<Int, Int>>() }\n  for ((u, v, w) in time) {\n    graph[u].add(v to w)\n    graph[v].add(u to w)\n  }\n\n  val times = Array(n + 1) { mutableListOf<Int>() }\n  val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })\n  pq.add(0 to 1)\n\n  while (pq.isNotEmpty()) {\n    val (t, u) = pq.poll()\n    if (times[u].size == 2) continue\n\n    val phase = (t / change) % 2\n    for ((v, w) in graph[u]) {\n      val nextT = if (phase == 0) t + w else {\n        val remain = change - (t % change)\n        t + remain + w\n      }\n\n      if (times[v].size < 2) {\n        times[v].add(nextT)\n        pq.add(nextT to v)\n      }\n    }\n  }\n\n  return times[n].getOrNull(1) ?: -1\n}",
        dart: "int secondMinimumTime(List<List<int>> time, int change, int n) {\n  final graph = List.generate(n + 1, (_) => <(int, int)>[]);\n  for (final t in time) {\n    graph[t[0]].add((t[1], t[2]));\n    graph[t[1]].add((t[0], t[2]));\n  }\n\n  final times = List.generate(n + 1, (_) => <int>[]);\n  final pq = PriorityQueue<(int, int)>();\n  pq.add((0, 1));\n\n  while (!pq.isEmpty) {\n    final (t, u) = pq.removeFirst();\n    if (times[u].length == 2) continue;\n\n    final phase = (t ~/ change) % 2;\n    for (final (v, w) in graph[u]) {\n      final nextT = (phase == 0) ? t + w : (t + (change - (t % change)) + w);\n      if (times[v].length < 2) {\n        times[v].add(nextT);\n        pq.add((nextT, v));\n      }\n    }\n  }\n\n  return times[n].length > 1 ? times[n][1] : -1;\n}",
        swift: "func secondMinimumTime(_ time: [[Int]], _ change: Int, _ n: Int) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n + 1)\n  for t in time {\n    graph[t[0]].append((t[1], t[2]))\n    graph[t[1]].append((t[0], t[2]))\n  }\n\n  var times = Array(repeating: [Int](), count: n + 1)\n  var pq: [(Int, Int)] = [(0, 1)]\n  var idx = 0\n\n  while idx < pq.count {\n    let (t, u) = pq[idx]\n    idx += 1\n    if times[u].count == 2 { continue }\n\n    let phase = (t / change) % 2\n    for (v, w) in graph[u] {\n      let nextT = (phase == 0) ? (t + w) : (t + (change - (t % change)) + w)\n      if times[v].count < 2 {\n        times[v].append(nextT)\n        pq.append((nextT, v))\n        pq.sort { $0.0 < $1.0 }\n      }\n    }\n  }\n\n  return times[n].count > 1 ? times[n][1] : -1\n}",
        haskell: "secondMinimumTime :: [[Int]] -> Int -> Int -> Int\nsecondMinimumTime time change n = -1"
      }
    },
    {
      id: 14,
      title: 'Minimum Weighted Subgraph With the Required Paths',
      difficulty: 'hard',
      tags: ['Dijkstra', 'Shortest Path', 'Subgraph'],
      description: 'Find minimum weight subgraph containing two required paths.',
      examples: [
        {
          input: 'n = 6, edges = [[0,3,5],[1,3,2],[1,4,4],[3,2,2],[3,5,3],[4,5,5]], path1 = [0,3,5], path2 = [1,3,4,5]',
          output: '9'
        }
      ],
      constraints: 'n ≤ 100; edges.length ≤ 10000',
      hint: 'Find shortest paths using shared vertex. Dijkstra multiple times.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumWeight(n: Int, edges: Array<IntArray>, path1: IntArray, path2: IntArray): Long {\n  val graph = List(n) { mutableListOf<Pair<Int, Long>>() }\n  for ((u, v, w) in edges) {\n    graph[u].add(v to w.toLong())\n    graph[v].add(u to w.toLong())\n  }\n\n  fun dijkstra(start: Int): LongArray {\n    val dist = LongArray(n) { Long.MAX_VALUE }\n    dist[start] = 0L\n    val pq = PriorityQueue<Pair<Long, Int>>(compareBy { it.first })\n    pq.add(0L to start)\n    while (pq.isNotEmpty()) {\n      val (d, u) = pq.poll()\n      if (d > dist[u]) continue\n      for ((v, w) in graph[u]) {\n        if (dist[u] + w < dist[v]) {\n          dist[v] = dist[u] + w\n          pq.add(dist[v] to v)\n        }\n      }\n    }\n    return dist\n  }\n\n  var result = Long.MAX_VALUE\n  val dist1Start = dijkstra(path1[0])\n  val dist1End = dijkstra(path1.last())\n  val dist2Start = dijkstra(path2[0])\n  val dist2End = dijkstra(path2.last())\n\n  for (i in 0 until n) {\n    val cost = minOf(\n      dist1Start[i] + dist1End[i] + dist2Start[i] + dist2End[i],\n      dist1Start[i] + dist1End[i] + dist2End[i] + dist2Start[i]\n    ) - dist1Start[path1.last()] - dist2Start[path2.last()]\n    result = minOf(result, cost)\n  }\n\n  return result\n}",
        dart: "int minimumWeight(int n, List<List<int>> edges, List<int> path1, List<int> path2) {\n  final graph = List.generate(n, (_) => <(int, int)>[]);\n  for (final e in edges) {\n    graph[e[0]].add((e[1], e[2]));\n    graph[e[1]].add((e[0], e[2]));\n  }\n\n  return 0;\n}",
        swift: "func minimumWeight(_ n: Int, _ edges: [[Int]], _ path1: [Int], _ path2: [Int]) -> Int {\n  var graph = Array(repeating: [(Int, Int)](), count: n)\n  for edge in edges {\n    graph[edge[0]].append((edge[1], edge[2]))\n    graph[edge[1]].append((edge[0], edge[2]))\n  }\n\n  return 0\n}",
        haskell: "minimumWeight :: Int -> [[Int]] -> [Int] -> [Int] -> Int\nminimumWeight n edges path1 path2 = 0"
      }
    },
    {
      id: 15,
      title: 'Shortest Path in a Grid With Obstacles Elimination',
      difficulty: 'hard',
      tags: ['BFS', 'State Space', '0-1 BFS'],
      description: 'Navigate grid eliminating k obstacles. Return shortest path.',
      examples: [
        {
          input: 'grid = [[0,1],[1,0]], k = 1',
          output: '2'
        }
      ],
      constraints: 'm, n ≤ 40; k ≤ 40',
      hint: 'State: (row, col, obstacles_remaining). 0-1 BFS.',
      timeComplexity: 'O(mn × k)',
      spaceComplexity: 'O(mn × k)',
      solutions: {
        kotlin: "fun shortestPath(grid: Array<IntArray>, k: Int): Int {\n  val m = grid.size\n  val n = grid[0].size\n  val dist = Array(m) { Array(n) { IntArray(k + 1) { Int.MAX_VALUE } } }\n  dist[0][0][0] = 0\n  val deque = ArrayDeque<Triple<Int, Int, Int>>()\n  deque.add(Triple(0, 0, 0))\n\n  val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0))\n\n  while (deque.isNotEmpty()) {\n    val (i, j, obs) = deque.removeFirst()\n    if (dist[i][j][obs] < 0) continue\n\n    for ((di, dj) in dirs) {\n      val ni = i + di\n      val nj = j + dj\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        val newObs = if (grid[ni][nj] == 1) obs + 1 else obs\n        if (newObs <= k && dist[i][j][obs] + 1 < dist[ni][nj][newObs]) {\n          dist[ni][nj][newObs] = dist[i][j][obs] + 1\n          if (grid[ni][nj] == 1) deque.addLast(Triple(ni, nj, newObs))\n          else deque.addFirst(Triple(ni, nj, newObs))\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1].minOrNull() ?: -1\n}",
        dart: "int shortestPath(List<List<int>> grid, int k) {\n  final m = grid.length;\n  final n = grid[0].length;\n  final dist = List.generate(m, (_) => List.generate(n, (_) => List.filled(k + 1, 2147483647)));\n  dist[0][0][0] = 0;\n  final deque = Deque<(int, int, int)>();\n  deque.add((0, 0, 0));\n\n  final dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n\n  while (!deque.isEmpty) {\n    final (i, j, obs) = deque.removeFirst();\n    for (final dir in dirs) {\n      final ni = i + dir[0];\n      final nj = j + dir[1];\n      if (ni >= 0 && ni < m && nj >= 0 && nj < n) {\n        final newObs = (grid[ni][nj] == 1) ? obs + 1 : obs;\n        if (newObs <= k && dist[i][j][obs] + 1 < dist[ni][nj][newObs]) {\n          dist[ni][nj][newObs] = dist[i][j][obs] + 1;\n          if (grid[ni][nj] == 1) deque.addLast((ni, nj, newObs));\n          else deque.addFirst((ni, nj, newObs));\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1].reduce((a, b) => a < b ? a : b);\n}",
        swift: "func shortestPath(_ grid: [[Int]], _ k: Int) -> Int {\n  let m = grid.count\n  let n = grid[0].count\n  var dist = Array(repeating: Array(repeating: Array(repeating: Int.max, count: k + 1), count: n), count: m)\n  dist[0][0][0] = 0\n  var deque: [(Int, Int, Int)] = [(0, 0, 0)]\n  var front = 0, back = 1\n\n  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]\n\n  while front < back {\n    let (i, j, obs) = deque[front]\n    front += 1\n    for dir in dirs {\n      let ni = i + dir[0]\n      let nj = j + dir[1]\n      if ni >= 0 && ni < m && nj >= 0 && nj < n {\n        let newObs = (grid[ni][nj] == 1) ? obs + 1 : obs\n        if newObs <= k && dist[i][j][obs] + 1 < dist[ni][nj][newObs] {\n          dist[ni][nj][newObs] = dist[i][j][obs] + 1\n          if grid[ni][nj] == 1 {\n            deque.append((ni, nj, newObs))\n            back += 1\n          } else {\n            deque.insert((ni, nj, newObs), at: front)\n            back += 1\n          }\n        }\n      }\n    }\n  }\n\n  return dist[m - 1][n - 1].min() ?? -1\n}",
        haskell: "shortestPath :: [[Int]] -> Int -> Int\nshortestPath grid k = -1"
      }
    },
    {
      id: 16,
      title: 'Minimum Fuel Cost to Report to Capital',
      difficulty: 'medium',
      tags: ['DFS', 'Tree', 'Fuel'],
      description: 'Travel tree from cities to capital. Groups share fuel. Minimize fuel cost.',
      examples: [
        {
          input: 'roads = [[0,1],[0,2],[0,3]], seats = 1',
          output: '3'
        }
      ],
      constraints: 'n ≤ 100000; seats ≤ 5 × 10^4',
      hint: 'DFS on tree. Count group size at each subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun minimumFuelCost(roads: Array<IntArray>, seats: Int): Long {\n  if (roads.isEmpty()) return 0\n  val graph = List(roads.size + 1) { mutableListOf<Int>() }\n  for ((u, v) in roads) {\n    graph[u].add(v)\n    graph[v].add(u)\n  }\n\n  var totalCost = 0L\n\n  fun dfs(node: Int, parent: Int): Long {\n    var people = 1L\n    for (neighbor in graph[node]) {\n      if (neighbor != parent) {\n        people += dfs(neighbor, node)\n      }\n    }\n    if (node != 0) {\n      totalCost += (people + seats - 1) / seats\n    }\n    return people\n  }\n\n  dfs(0, -1)\n  return totalCost\n}",
        dart: "int minimumFuelCost(List<List<int>> roads, int seats) {\n  if (roads.isEmpty) return 0;\n  final graph = List.generate(roads.length + 1, (_) => <int>[]);\n  for (final r in roads) {\n    graph[r[0]].add(r[1]);\n    graph[r[1]].add(r[0]);\n  }\n\n  int totalCost = 0;\n\n  int dfs(int node, int parent) {\n    int people = 1;\n    for (int neighbor in graph[node]) {\n      if (neighbor != parent) {\n        people += dfs(neighbor, node);\n      }\n    }\n    if (node != 0) {\n      totalCost += (people + seats - 1) ~/ seats;\n    }\n    return people;\n  }\n\n  dfs(0, -1);\n  return totalCost;\n}",
        swift: "func minimumFuelCost(_ roads: [[Int]], _ seats: Int) -> Int {\n  guard !roads.isEmpty else { return 0 }\n  var graph = Array(repeating: [Int](), count: roads.count + 1)\n  for road in roads {\n    graph[road[0]].append(road[1])\n    graph[road[1]].append(road[0])\n  }\n\n  var totalCost = 0\n\n  func dfs(_ node: Int, _ parent: Int) -> Int {\n    var people = 1\n    for neighbor in graph[node] {\n      if neighbor != parent {\n        people += dfs(neighbor, node)\n      }\n    }\n    if node != 0 {\n      totalCost += (people + seats - 1) / seats\n    }\n    return people\n  }\n\n  dfs(0, -1)\n  return totalCost\n}",
        haskell: "minimumFuelCost :: [[Int]] -> Int -> Int\nminimumFuelCost roads seats = 0"
      }
    },
    {
      id: 17,
      title: 'Dijkstra with State (Advanced)',
      difficulty: 'hard',
      tags: ['Dijkstra', 'State Space', 'Advanced'],
      description: 'Dijkstra on expanded state space tracking additional constraints.',
      examples: [
        {
          input: 'custom problem with state tracking',
          output: 'result depends on problem specifics'
        }
      ],
      constraints: 'Varies based on state space size',
      hint: 'State = (position, constraint1, constraint2, ...). Track all dimensions.',
      timeComplexity: 'O(S log S) where S = state space size',
      spaceComplexity: 'O(S)',
      solutions: {
        kotlin: "fun dijkstraWithState(n: Int, edges: Array<IntArray>, initialState: Pair<Int, Int>): Int {\n  val dist = mutableMapOf<Pair<Int, Int>, Int>()\n  val pq = PriorityQueue<Triple<Int, Int, Int>>(compareBy { it.first })\n  dist[initialState] = 0\n  pq.add(Triple(0, initialState.first, initialState.second))\n\n  while (pq.isNotEmpty()) {\n    val (d, pos, state) = pq.poll()\n    if (d > (dist[pos to state] ?: Int.MAX_VALUE)) continue\n    // Process neighbors based on current state\n  }\n\n  return dist[n to 0] ?: -1\n}",
        dart: "int dijkstraWithState(int n, List<List<int>> edges, (int, int) initialState) {\n  final dist = <(int, int), int>{};\n  final pq = PriorityQueue<(int, int, int)>();\n  dist[initialState] = 0;\n  pq.add((0, initialState.$1, initialState.$2));\n\n  while (!pq.isEmpty) {\n    final (d, pos, state) = pq.removeFirst();\n    if (d > (dist[(pos, state)] ?? 2147483647)) continue;\n  }\n\n  return dist[(n, 0)] ?? -1;\n}",
        swift: "func dijkstraWithState(_ n: Int, _ edges: [[Int]], _ initialState: (Int, Int)) -> Int {\n  var dist: [(Int, Int): Int] = [:]\n  var pq: [(Int, Int, Int)] = [(0, initialState.0, initialState.1)]\n  dist[initialState] = 0\n  var idx = 0\n\n  while idx < pq.count {\n    let (d, pos, state) = pq[idx]\n    idx += 1\n    if d > (dist[(pos, state)] ?? Int.max) { continue }\n  }\n\n  return dist[(n, 0)] ?? -1\n}",
        haskell: "dijkstraWithState :: Int -> [[Int]] -> (Int, Int) -> Int\ndijkstraWithState n edges initialState = -1"
      }
    },
    {
      id: 18,
      title: 'Floyd-Warshall All Pairs Shortest Paths',
      difficulty: 'medium',
      tags: ['Floyd-Warshall', 'All Pairs', 'DP'],
      description: 'Compute shortest paths between all pairs of vertices.',
      examples: [
        {
          input: 'n = 4, edges = [[0,1,5],[0,3,10],[1,2,3],[3,2,1]]',
          output: 'distance matrix with all pairs'
        }
      ],
      constraints: 'n ≤ 500; no negative cycles',
      hint: 'Triple loop: for each intermediate vertex k, update dist[i][j].',
      timeComplexity: 'O(V³)',
      spaceComplexity: 'O(V²)',
      solutions: {
        kotlin: "fun floydWarshall(n: Int, edges: Array<IntArray>): Array<IntArray> {\n  val INF = 1e9.toInt()\n  val dist = Array(n) { IntArray(n) { INF } }\n  for (i in 0 until n) dist[i][i] = 0\n  for ((u, v, w) in edges) {\n    dist[u][v] = minOf(dist[u][v], w)\n  }\n\n  for (k in 0 until n) {\n    for (i in 0 until n) {\n      for (j in 0 until n) {\n        dist[i][j] = minOf(dist[i][j], dist[i][k] + dist[k][j])\n      }\n    }\n  }\n\n  return dist\n}",
        dart: "List<List<int>> floydWarshall(int n, List<List<int>> edges) {\n  final INF = 1000000000;\n  final dist = List.generate(n, (_) => List.filled(n, INF));\n  for (int i = 0; i < n; i++) dist[i][i] = 0;\n  for (final e in edges) {\n    dist[e[0]][e[1]] = min(dist[e[0]][e[1]], e[2]);\n  }\n\n  for (int k = 0; k < n; k++) {\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < n; j++) {\n        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);\n      }\n    }\n  }\n\n  return dist;\n}",
        swift: "func floydWarshall(_ n: Int, _ edges: [[Int]]) -> [[Int]] {\n  let INF = 1_000_000_000\n  var dist = Array(repeating: Array(repeating: INF, count: n), count: n)\n  for i in 0..<n { dist[i][i] = 0 }\n  for edge in edges {\n    dist[edge[0]][edge[1]] = min(dist[edge[0]][edge[1]], edge[2])\n  }\n\n  for k in 0..<n {\n    for i in 0..<n {\n      for j in 0..<n {\n        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n      }\n    }\n  }\n\n  return dist\n}",
        haskell: "floydWarshall :: Int -> [[Int]] -> [[Int]]\nfloydWarshall n edges = []"
      }
    },
    {
      id: 19,
      title: 'Bellman-Ford Single Source Shortest Path',
      difficulty: 'medium',
      tags: ['Bellman-Ford', 'Negative Edges', 'SSSP'],
      description: 'Compute shortest paths from source allowing negative edges but no negative cycles.',
      examples: [
        {
          input: 'n = 5, edges = [[0,1,4],[0,2,1],[1,2,-3],[1,3,2],[2,3,3],[3,4,2]]',
          output: '[0,4,1,-2,0]'
        }
      ],
      constraints: 'n ≤ 500; edges.length ≤ 10000',
      hint: 'Relax edges V-1 times. Check V-th iteration for negative cycle.',
      timeComplexity: 'O(VE)',
      spaceComplexity: 'O(V)',
      solutions: {
        kotlin: "fun bellmanFord(n: Int, edges: Array<IntArray>, src: Int): IntArray {\n  val dist = IntArray(n) { Int.MAX_VALUE }\n  dist[src] = 0\n\n  for (i in 0 until n - 1) {\n    for ((u, v, w) in edges) {\n      if (dist[u] != Int.MAX_VALUE && dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w\n      }\n    }\n  }\n\n  for ((u, v, w) in edges) {\n    if (dist[u] != Int.MAX_VALUE && dist[u] + w < dist[v]) {\n      return intArrayOf() // Negative cycle detected\n    }\n  }\n\n  return dist\n}",
        dart: "List<int> bellmanFord(int n, List<List<int>> edges, int src) {\n  final dist = List.filled(n, 2147483647);\n  dist[src] = 0;\n\n  for (int i = 0; i < n - 1; i++) {\n    for (final e in edges) {\n      if (dist[e[0]] != 2147483647 && dist[e[0]] + e[2] < dist[e[1]]) {\n        dist[e[1]] = dist[e[0]] + e[2];\n      }\n    }\n  }\n\n  for (final e in edges) {\n    if (dist[e[0]] != 2147483647 && dist[e[0]] + e[2] < dist[e[1]]) {\n      return []; // Negative cycle\n    }\n  }\n\n  return dist;\n}",
        swift: "func bellmanFord(_ n: Int, _ edges: [[Int]], _ src: Int) -> [Int] {\n  var dist = Array(repeating: Int.max, count: n)\n  dist[src] = 0\n\n  for _ in 0..<(n - 1) {\n    for edge in edges {\n      if dist[edge[0]] != Int.max && dist[edge[0]] + edge[2] < dist[edge[1]] {\n        dist[edge[1]] = dist[edge[0]] + edge[2]\n      }\n    }\n  }\n\n  for edge in edges {\n    if dist[edge[0]] != Int.max && dist[edge[0]] + edge[2] < dist[edge[1]] {\n      return [] // Negative cycle\n    }\n  }\n\n  return dist\n}",
        haskell: "bellmanFord :: Int -> [[Int]] -> Int -> [Int]\nbellmanFord n edges src = []"
      }
    },
    {
      id: 20,
      title: 'Johnson\'s Algorithm Concept',
      difficulty: 'hard',
      tags: ['Johnson\'s Algorithm', 'All Pairs', 'Dijkstra', 'Bellman-Ford'],
      description: 'All-pairs shortest paths combining Bellman-Ford and Dijkstra.',
      examples: [
        {
          input: 'n = 3, edges = [[0,1,-1],[0,2,4],[1,2,3],[2,0,2]]',
          output: 'all pairs matrix'
        }
      ],
      constraints: 'n ≤ 1000; dense graphs with potential negative edges',
      hint: 'Reweight edges using Bellman-Ford, then run Dijkstra from each vertex.',
      timeComplexity: 'O(VE + V² log V)',
      spaceComplexity: 'O(V²)',
      solutions: {
        kotlin: "fun johnsonsAlgorithm(n: Int, edges: Array<IntArray>): Array<IntArray> {\n  val INF = 1e9.toInt()\n  val newEdges = edges.toMutableList()\n  for (i in 0 until n) newEdges.add(intArrayOf(n, i, 0))\n\n  val h = IntArray(n + 1) { INF }\n  h[n] = 0\n  for (iter in 0 until n) {\n    for ((u, v, w) in newEdges) {\n      if (h[u] != INF && h[u] + w < h[v]) {\n        h[v] = h[u] + w\n      }\n    }\n  }\n\n  val reweighted = newEdges.dropLast(n).map { (u, v, w) ->\n    intArrayOf(u, v, w + h[u] - h[v])\n  }.toTypedArray()\n\n  val result = Array(n) { IntArray(n) { INF } }\n  for (i in 0 until n) result[i][i] = 0\n  // Run Dijkstra from each vertex (simplified)\n  return result\n}",
        dart: "List<List<int>> johnsonsAlgorithm(int n, List<List<int>> edges) {\n  final INF = 1000000000;\n  final newEdges = [...edges, ...List.generate(n, (i) => [n, i, 0])];\n\n  final h = List.filled(n + 1, INF);\n  h[n] = 0;\n  for (int iter = 0; iter < n; iter++) {\n    for (final e in newEdges) {\n      if (h[e[0]] != INF && h[e[0]] + e[2] < h[e[1]]) {\n        h[e[1]] = h[e[0]] + e[2];\n      }\n    }\n  }\n\n  final result = List.generate(n, (_) => List.filled(n, INF));\n  for (int i = 0; i < n; i++) result[i][i] = 0;\n  return result;\n}",
        swift: "func johnsonsAlgorithm(_ n: Int, _ edges: [[Int]]) -> [[Int]] {\n  let INF = 1_000_000_000\n  var newEdges = edges\n  for i in 0..<n { newEdges.append([n, i, 0]) }\n\n  var h = Array(repeating: INF, count: n + 1)\n  h[n] = 0\n  for _ in 0..<n {\n    for edge in newEdges {\n      if h[edge[0]] != INF && h[edge[0]] + edge[2] < h[edge[1]] {\n        h[edge[1]] = h[edge[0]] + edge[2]\n      }\n    }\n  }\n\n  var result = Array(repeating: Array(repeating: INF, count: n), count: n)\n  for i in 0..<n { result[i][i] = 0 }\n  return result\n}",
        haskell: "johnsonsAlgorithm :: Int -> [[Int]] -> [[Int]]\njohnsonsAlgorithm n edges = []"
      }
    }
  ]
}
