export default {
  id: 19,
  year: 2,
  slug: 'advanced-graphs',
  icon: '🔗',
  color: '#d2a8ff',
  title: 'Advanced Graph Algorithms',
  subtitle: 'SCC, Network Flow, Topological Sort, Bridges',
  description: 'Master advanced graph algorithms including strongly connected components, network flow, and critical path analysis.',
  theorems: [
    {
      id: 1,
      name: 'Tarjan SCC Correctness',
      katex_statement: '\\text{SCC} = \\text{maximal set of mutually reachable vertices}',
      statement_text: 'Tarjan algorithm computes SCCs in O(V+E) using DFS tree properties. Nodes with high finish time belong to same SCC.',
      proof: 'Low-link values identify roots of SCC subtrees. If low[v] = disc[v], then v is SCC root. All descendants form SCC containing v by definition of reachability.'
    },
    {
      id: 2,
      name: 'Max-Flow Min-Cut Theorem',
      katex_statement: '\\text{max flow} = \\text{min cut}',
      statement_text: 'Maximum flow value equals capacity of minimum cut separating source and sink. Ford-Fulkerson achieves this optimum.',
      proof: 'Any flow ≤ capacity of any cut. Residual graph has no s-t path ⟹ all edges from reachable set cross cut at capacity ⟹ flow value equals cut capacity.'
    },
    {
      id: 3,
      name: 'DAG iff No Back Edges',
      katex_statement: '\\text{Graph is DAG} \\iff \\text{DFS finds no back edges}',
      statement_text: 'A directed graph is acyclic if and only if depth-first search encounters no back edges (edges to ancestor).',
      proof: 'Back edge creates cycle. Conversely, if cycle exists, DFS must encounter back edge when processing cycle. Thus back edge ⟺ cycle.'
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Topological Sort (Kahn\'s Algorithm)',
      difficulty: 'medium',
      tags: ['topological-sort', 'dag'],
      description: 'Return topological ordering of DAG using in-degree approach.',
      examples: [
        { input: 'n=4, edges=[[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3] or other valid order' }
      ],
      constraints: '1 ≤ n ≤ 10000, 0 ≤ edges.length ≤ 10000',
      hint: 'Use queue of nodes with in-degree 0. Remove edges and decrement in-degrees.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun topologicalSort(n: Int, edges: Array<IntArray>): List<Int> {\n  val graph = Array(n) { mutableListOf<Int>() }\n  val inDegree = IntArray(n)\n\n  for ((u, v) in edges) {\n    graph[u].add(v)\n    inDegree[v]++\n  }\n\n  val queue = mutableListOf<Int>()\n  for (i in 0 until n) {\n    if (inDegree[i] == 0) queue.add(i)\n  }\n\n  val result = mutableListOf<Int>()\n  while (queue.isNotEmpty()) {\n    val u = queue.removeAt(0)\n    result.add(u)\n    for (v in graph[u]) {\n      inDegree[v]--\n      if (inDegree[v] == 0) queue.add(v)\n    }\n  }\n\n  return if (result.size == n) result else emptyList()\n}",
        dart: "List<int> topologicalSort(int n, List<List<int>> edges) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  List<int> inDegree = List<int>.filled(n, 0);\n\n  for (List<int> edge in edges) {\n    graph[edge[0]].add(edge[1]);\n    inDegree[edge[1]]++;\n  }\n\n  List<int> queue = [];\n  for (int i = 0; i < n; i++) {\n    if (inDegree[i] == 0) queue.add(i);\n  }\n\n  List<int> result = [];\n  while (queue.isNotEmpty) {\n    int u = queue.removeAt(0);\n    result.add(u);\n    for (int v in graph[u]) {\n      inDegree[v]--;\n      if (inDegree[v] == 0) queue.add(v);\n    }\n  }\n\n  return result.length == n ? result : [];\n}",
        swift: "func topologicalSort(_ n: Int, _ edges: [[Int]]) -> [Int] {\n    var graph = Array(repeating: [Int](), count: n)\n    var inDegree = Array(repeating: 0, count: n)\n\n    for edge in edges {\n        graph[edge[0]].append(edge[1])\n        inDegree[edge[1]] += 1\n    }\n\n    var queue = [Int]()\n    for i in 0..<n {\n        if inDegree[i] == 0 { queue.append(i) }\n    }\n\n    var result = [Int]()\n    while !queue.isEmpty {\n        let u = queue.removeFirst()\n        result.append(u)\n        for v in graph[u] {\n            inDegree[v] -= 1\n            if inDegree[v] == 0 { queue.append(v) }\n        }\n    }\n\n    return result.count == n ? result : []\n}",
        haskell: "topologicalSort :: Int -> [[Int]] -> [Int]\ntopologicalSort n edges = go queue result inDegree graph\n  where\n    graph = foldr (\\\\[u,v] g -> let (before, node:after) = splitAt u g in before ++ [node ++ [v]] ++ after) (replicate n []) edges\n    inDegree = foldr (\\\\[u,v] deg -> let (before, degree:after) = splitAt v deg in before ++ [degree+1] ++ after) (replicate n 0) edges\n    queue = [i | i <- [0..n-1], inDegree !! i == 0]\n    result = []\n\n    go [] res _ _ = res\n    go (u:us) res deg g = go (us ++ [v | v <- g !! u, newDeg !! v == 0]) (res ++ [u]) newDeg g\n      where\n        newDeg = foldr (\\\\v d -> let (before, degree:after) = splitAt v d in before ++ [degree-1] ++ after) deg (g !! u)"
      }
    },
    {
      id: 2,
      title: 'Course Schedule Detection',
      difficulty: 'medium',
      tags: ['cycle-detection', 'dfs'],
      description: 'Detect cycle in directed graph (course prerequisites).',
      examples: [
        { input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true' }
      ],
      constraints: '1 ≤ numCourses ≤ 10000',
      hint: 'Use DFS with color marking (white, gray, black).',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun hasCycle(n: Int, edges: Array<IntArray>): Boolean {\n  val graph = Array(n) { mutableListOf<Int>() }\n  val color = IntArray(n) // 0: white, 1: gray, 2: black\n\n  for ((u, v) in edges) graph[u].add(v)\n\n  fun dfs(u: Int): Boolean {\n    if (color[u] == 1) return true\n    if (color[u] == 2) return false\n\n    color[u] = 1\n    for (v in graph[u]) {\n      if (dfs(v)) return true\n    }\n    color[u] = 2\n    return false\n  }\n\n  for (i in 0 until n) {\n    if (color[i] == 0 && dfs(i)) return true\n  }\n  return false\n}",
        dart: "bool hasCycle(int n, List<List<int>> edges) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  List<int> color = List<int>.filled(n, 0);\n\n  for (List<int> edge in edges) graph[edge[0]].add(edge[1]);\n\n  bool dfs(int u) {\n    if (color[u] == 1) return true;\n    if (color[u] == 2) return false;\n\n    color[u] = 1;\n    for (int v in graph[u]) {\n      if (dfs(v)) return true;\n    }\n    color[u] = 2;\n    return false;\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (color[i] == 0 && dfs(i)) return true;\n  }\n  return false;\n}",
        swift: "func hasCycle(_ n: Int, _ edges: [[Int]]) -> Bool {\n    var graph = Array(repeating: [Int](), count: n)\n    var color = Array(repeating: 0, count: n)\n\n    for edge in edges { graph[edge[0]].append(edge[1]) }\n\n    func dfs(_ u: Int) -> Bool {\n        if color[u] == 1 { return true }\n        if color[u] == 2 { return false }\n\n        color[u] = 1\n        for v in graph[u] {\n            if dfs(v) { return true }\n        }\n        color[u] = 2\n        return false\n    }\n\n    for i in 0..<n {\n        if color[i] == 0 && dfs(i) { return true }\n    }\n    return false\n}",
        haskell: "hasCycle :: Int -> [[Int]] -> Bool\nhasCycle n edges = go 0 (replicate n 0) graph\n  where\n    graph = [[(snd e) | e <- edges, (fst e) == i] | i <- [0..n-1]]\n    go i color g | i == n = False\n                 | color !! i == 0 = dfs i 1 color g || go (i+1) color g\n                 | otherwise = go (i+1) color g\n\n    dfs u c color g | color !! u == 1 = True\n                    | color !! u == 2 = False\n                    | otherwise = any (\\\\v -> dfs v c color' g) (g !! u)\n      where\n        color' = take u color ++ [c] ++ drop (u+1) color"
      }
    },
    {
      id: 3,
      title: 'Critical Connections (Bridges)',
      difficulty: 'hard',
      tags: ['bridges', 'tarjan'],
      description: 'Find all bridges in undirected graph using Tarjan algorithm.',
      examples: [
        { input: 'n=4, connections=[[0,1],[1,2],[2,0],[1,3]]', output: '[[1,3]]' }
      ],
      constraints: '2 ≤ n ≤ 100000, n-1 ≤ edges ≤ n*(n-1)/2',
      hint: 'Track discovery time and low-link value. Bridge if low[v] > disc[u].',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun criticalConnections(n: Int, connections: List<List<Int>>): List<List<Int>> {\n  val graph = Array(n) { mutableListOf<Int>() }\n  for ((u, v) in connections) {\n    graph[u].add(v)\n    graph[v].add(u)\n  }\n\n  val disc = IntArray(n) { -1 }\n  val low = IntArray(n)\n  val result = mutableListOf<List<Int>>()\n  var time = 0\n\n  fun dfs(u: Int, parent: Int) {\n    disc[u] = time\n    low[u] = time\n    time++\n\n    for (v in graph[u]) {\n      if (v == parent) continue\n      if (disc[v] != -1) {\n        low[u] = minOf(low[u], disc[v])\n      } else {\n        dfs(v, u)\n        low[u] = minOf(low[u], low[v])\n        if (low[v] > disc[u]) {\n          result.add(listOf(minOf(u, v), maxOf(u, v)))\n        }\n      }\n    }\n  }\n\n  for (i in 0 until n) {\n    if (disc[i] == -1) dfs(i, -1)\n  }\n\n  return result\n}",
        dart: "List<List<int>> criticalConnections(int n, List<List<int>> connections) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  for (List<int> conn in connections) {\n    graph[conn[0]].add(conn[1]);\n    graph[conn[1]].add(conn[0]);\n  }\n\n  List<int> disc = List<int>.filled(n, -1);\n  List<int> low = List<int>.filled(n, 0);\n  List<List<int>> result = [];\n  int time = 0;\n\n  void dfs(int u, int parent) {\n    disc[u] = time;\n    low[u] = time;\n    time++;\n\n    for (int v in graph[u]) {\n      if (v == parent) continue;\n      if (disc[v] != -1) {\n        low[u] = min(low[u], disc[v]);\n      } else {\n        dfs(v, u);\n        low[u] = min(low[u], low[v]);\n        if (low[v] > disc[u]) {\n          result.add([min(u, v), max(u, v)]);\n        }\n      }\n    }\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (disc[i] == -1) dfs(i, -1);\n  }\n\n  return result;\n}",
        swift: "func criticalConnections(_ n: Int, _ connections: [[Int]]) -> [[Int]] {\n    var graph = Array(repeating: [Int](), count: n)\n    for conn in connections {\n        graph[conn[0]].append(conn[1])\n        graph[conn[1]].append(conn[0])\n    }\n\n    var disc = Array(repeating: -1, count: n)\n    var low = Array(repeating: 0, count: n)\n    var result = [[Int]]()\n    var time = 0\n\n    func dfs(_ u: Int, _ parent: Int) {\n        disc[u] = time\n        low[u] = time\n        time += 1\n\n        for v in graph[u] {\n            if v == parent { continue }\n            if disc[v] != -1 {\n                low[u] = min(low[u], disc[v])\n            } else {\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > disc[u] {\n                    result.append([min(u, v), max(u, v)])\n                }\n            }\n        }\n    }\n\n    for i in 0..<n {\n        if disc[i] == -1 { dfs(i, -1) }\n    }\n\n    return result\n}",
        haskell: "criticalConnections :: Int -> [[Int]] -> [[Int]]\ncriticalConnections n connections = result\n  where\n    graph = [[v | [u,v] <- connections, u == i] ++ [u | [u,v] <- connections, v == i] | i <- [0..n-1]]\n    (result, _, _, _) = go 0 (-1) (replicate n (-1)) (replicate n 0) [] 0 graph\n\n    go u parent disc low result time g\n      | u == n = (result, disc, low, time)\n      | otherwise = (result', disc', low', time')\n      where\n        (result', disc', low', time') = dfs' u parent (take u disc ++ [time] ++ drop (u+1) disc) low result (time+1) g\n        dfs' u parent disc low result time g = (result, disc, low, time)"
      }
    },
    {
      id: 4,
      title: 'Strongly Connected Components (Kosaraju)',
      difficulty: 'hard',
      tags: ['scc', 'kosaraju'],
      description: 'Find all SCCs using Kosaraju algorithm (2 DFS passes).',
      examples: [
        { input: 'n=5, edges=[[0,1],[1,2],[2,0],[1,3],[3,4]]', output: 'Two SCCs: {0,1,2}, {3}, {4}' }
      ],
      constraints: '1 ≤ n ≤ 10000',
      hint: 'First DFS on original, second DFS on transpose by finish time order.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun kosaraju(n: Int, edges: Array<IntArray>): List<List<Int>> {\n  val graph = Array(n) { mutableListOf<Int>() }\n  val revGraph = Array(n) { mutableListOf<Int>() }\n\n  for ((u, v) in edges) {\n    graph[u].add(v)\n    revGraph[v].add(u)\n  }\n\n  val visited = BooleanArray(n)\n  val stack = mutableListOf<Int>()\n\n  fun dfs1(u: Int) {\n    visited[u] = true\n    for (v in graph[u]) {\n      if (!visited[v]) dfs1(v)\n    }\n    stack.add(u)\n  }\n\n  for (i in 0 until n) {\n    if (!visited[i]) dfs1(i)\n  }\n\n  visited.fill(false)\n  val result = mutableListOf<List<Int>>()\n\n  fun dfs2(u: Int, component: MutableList<Int>) {\n    visited[u] = true\n    component.add(u)\n    for (v in revGraph[u]) {\n      if (!visited[v]) dfs2(v, component)\n    }\n  }\n\n  while (stack.isNotEmpty()) {\n    val u = stack.removeAt(stack.size - 1)\n    if (!visited[u]) {\n      val component = mutableListOf<Int>()\n      dfs2(u, component)\n      result.add(component)\n    }\n  }\n\n  return result\n}",
        dart: "List<List<int>> kosaraju(int n, List<List<int>> edges) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  List<List<int>> revGraph = List.generate(n, (_) => []);\n\n  for (List<int> edge in edges) {\n    graph[edge[0]].add(edge[1]);\n    revGraph[edge[1]].add(edge[0]);\n  }\n\n  List<bool> visited = List<bool>.filled(n, false);\n  List<int> stack = [];\n\n  void dfs1(int u) {\n    visited[u] = true;\n    for (int v in graph[u]) {\n      if (!visited[v]) dfs1(v);\n    }\n    stack.add(u);\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (!visited[i]) dfs1(i);\n  }\n\n  visited = List<bool>.filled(n, false);\n  List<List<int>> result = [];\n\n  void dfs2(int u, List<int> component) {\n    visited[u] = true;\n    component.add(u);\n    for (int v in revGraph[u]) {\n      if (!visited[v]) dfs2(v, component);\n    }\n  }\n\n  while (stack.isNotEmpty) {\n    int u = stack.removeLast();\n    if (!visited[u]) {\n      List<int> component = [];\n      dfs2(u, component);\n      result.add(component);\n    }\n  }\n\n  return result;\n}",
        swift: "func kosaraju(_ n: Int, _ edges: [[Int]]) -> [[Int]] {\n    var graph = Array(repeating: [Int](), count: n)\n    var revGraph = Array(repeating: [Int](), count: n)\n\n    for edge in edges {\n        graph[edge[0]].append(edge[1])\n        revGraph[edge[1]].append(edge[0])\n    }\n\n    var visited = Array(repeating: false, count: n)\n    var stack = [Int]()\n\n    func dfs1(_ u: Int) {\n        visited[u] = true\n        for v in graph[u] {\n            if !visited[v] { dfs1(v) }\n        }\n        stack.append(u)\n    }\n\n    for i in 0..<n {\n        if !visited[i] { dfs1(i) }\n    }\n\n    visited = Array(repeating: false, count: n)\n    var result = [[Int]]()\n\n    func dfs2(_ u: Int, _ component: inout [Int]) {\n        visited[u] = true\n        component.append(u)\n        for v in revGraph[u] {\n            if !visited[v] { dfs2(v, &component) }\n        }\n    }\n\n    while !stack.isEmpty {\n        let u = stack.removeLast()\n        if !visited[u] {\n            var component = [Int]()\n            dfs2(u, &component)\n            result.append(component)\n        }\n    }\n\n    return result\n}",
        haskell: "kosaraju :: Int -> [[Int]] -> [[Int]]\nkosaraju n edges = result\n  where\n    graph = [[v | [u,v] <- edges, u == i] | i <- [0..n-1]]\n    revGraph = [[u | [u,v] <- edges, v == i] | i <- [0..n-1]]\n\n    (_, stack) = go 0 (replicate n False) [] graph\n    go i visited stack g | i == n = (visited, stack)\n                         | visited !! i = go (i+1) visited stack g\n                         | otherwise = dfs1 i visited (stack ++ [i]) g\n\n    dfs1 u visited stack g = (visited', stack')\n      where\n        visited' = take u visited ++ [True] ++ drop (u+1) visited\n        stack' = foldl (\\\\acc v -> if visited' !! v then acc else fst (dfs1 v visited' (acc ++ [v]) g) ++ [v]) stack (g !! u)\n\n    result = go' 0 (replicate n False) revGraph\n    go' i visited g | i == length stack = []\n                    | otherwise = comp : go' (i+1) visited' g\n      where\n        u = stack !! (length stack - 1 - i)\n        (visited', comp) = dfs2 u (replicate n False) [] g"
      }
    },
    {
      id: 5,
      title: 'Maximum Flow (Ford-Fulkerson)',
      difficulty: 'hard',
      tags: ['max-flow', 'ford-fulkerson'],
      description: 'Compute maximum flow from source to sink.',
      examples: [
        { input: 'graph with capacities', output: 'max flow value' }
      ],
      constraints: 'n ≤ 100, capacity ≤ 1000',
      hint: 'Use DFS to find augmenting paths. Update capacities.',
      timeComplexity: 'O(V * E²)',
      spaceComplexity: 'O(V²)',
      solutions: {
        kotlin: "fun maxFlow(graph: Array<IntArray>, source: Int, sink: Int): Int {\n  val n = graph.size\n  val residual = Array(n) { IntArray(n) }\n  for (i in 0 until n) {\n    for (j in 0 until n) {\n      residual[i][j] = graph[i][j]\n    }\n  }\n\n  var maxFlow = 0\n\n  fun dfs(u: Int, visited: BooleanArray, minCap: Int): Int {\n    if (u == sink) return minCap\n\n    visited[u] = true\n    for (v in 0 until n) {\n      if (!visited[v] && residual[u][v] > 0) {\n        val flow = dfs(v, visited, minOf(minCap, residual[u][v]))\n        if (flow > 0) {\n          residual[u][v] -= flow\n          residual[v][u] += flow\n          return flow\n        }\n      }\n    }\n    return 0\n  }\n\n  while (true) {\n    val visited = BooleanArray(n)\n    val flow = dfs(source, visited, Int.MAX_VALUE)\n    if (flow == 0) break\n    maxFlow += flow\n  }\n\n  return maxFlow\n}",
        dart: "int maxFlow(List<List<int>> graph, int source, int sink) {\n  int n = graph.length;\n  List<List<int>> residual = [for (List<int> row in graph) List<int>.from(row)];\n  int maxFlowVal = 0;\n\n  int dfs(int u, List<bool> visited, int minCap) {\n    if (u == sink) return minCap;\n\n    visited[u] = true;\n    for (int v = 0; v < n; v++) {\n      if (!visited[v] && residual[u][v] > 0) {\n        int flow = dfs(v, visited, min(minCap, residual[u][v]));\n        if (flow > 0) {\n          residual[u][v] -= flow;\n          residual[v][u] += flow;\n          return flow;\n        }\n      }\n    }\n    return 0;\n  }\n\n  while (true) {\n    List<bool> visited = List<bool>.filled(n, false);\n    int flow = dfs(source, visited, 1<<30);\n    if (flow == 0) break;\n    maxFlowVal += flow;\n  }\n\n  return maxFlowVal;\n}",
        swift: "func maxFlow(_ graph: [[Int]], _ source: Int, _ sink: Int) -> Int {\n    let n = graph.count\n    var residual = graph.map { $0 }\n    var maxFlowVal = 0\n\n    func dfs(_ u: Int, _ visited: inout [Bool], _ minCap: Int) -> Int {\n        if u == sink { return minCap }\n\n        visited[u] = true\n        for v in 0..<n {\n            if !visited[v] && residual[u][v] > 0 {\n                let flow = dfs(v, &visited, min(minCap, residual[u][v]))\n                if flow > 0 {\n                    residual[u][v] -= flow\n                    residual[v][u] += flow\n                    return flow\n                }\n            }\n        }\n        return 0\n    }\n\n    while true {\n        var visited = Array(repeating: false, count: n)\n        let flow = dfs(source, &visited, Int.max)\n        if flow == 0 { break }\n        maxFlowVal += flow\n    }\n\n    return maxFlowVal\n}",
        haskell: "maxFlow :: [[Int]] -> Int -> Int -> Int\nmaxFlow graph source sink = go (map (map id) graph) 0\n  where\n    n = length graph\n    go residual maxFlowVal =\n      case findPath source sink (replicate n False) residual of\n        0 -> maxFlowVal\n        flow -> go (updateResidual flow) (maxFlowVal + flow)\n\n    findPath u visited residual | u == sink = minCapacity\n                                | otherwise = maximum [findPath v visited' residual | v <- [0..n-1],\n                                                      not (visited !! v), residual !! u !! v > 0]\n\n    updateResidual flow = [[if (i == u && j == v) then residual !! i !! j - flow\n                            else if (i == v && j == u) then residual !! i !! j + flow\n                            else residual !! i !! j | j <- [0..n-1]] | i <- [0..n-1]]"
      }
    },
    {
      id: 6,
      title: 'Strongly Connected Components (Tarjan)',
      difficulty: 'hard',
      tags: ['scc', 'tarjan'],
      description: 'Find SCCs using Tarjan single-pass algorithm.',
      examples: [
        { input: 'n=5, edges=[[0,1],[1,2],[2,0],[1,3],[3,4]]', output: 'SCCs' }
      ],
      constraints: '1 ≤ n ≤ 10000',
      hint: 'Track discovery time and low-link. SCC root identified when disc[u] = low[u].',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun tarjanSCC(n: Int, edges: Array<IntArray>): List<List<Int>> {\n  val graph = Array(n) { mutableListOf<Int>() }\n  for ((u, v) in edges) graph[u].add(v)\n\n  val disc = IntArray(n) { -1 }\n  val low = IntArray(n)\n  val onStack = BooleanArray(n)\n  val stack = mutableListOf<Int>()\n  val result = mutableListOf<List<Int>>()\n  var time = 0\n\n  fun dfs(u: Int) {\n    disc[u] = time\n    low[u] = time\n    time++\n    stack.add(u)\n    onStack[u] = true\n\n    for (v in graph[u]) {\n      if (disc[v] == -1) {\n        dfs(v)\n        low[u] = minOf(low[u], low[v])\n      } else if (onStack[v]) {\n        low[u] = minOf(low[u], disc[v])\n      }\n    }\n\n    if (low[u] == disc[u]) {\n      val component = mutableListOf<Int>()\n      while (true) {\n        val v = stack.removeAt(stack.size - 1)\n        onStack[v] = false\n        component.add(v)\n        if (v == u) break\n      }\n      result.add(component)\n    }\n  }\n\n  for (i in 0 until n) {\n    if (disc[i] == -1) dfs(i)\n  }\n\n  return result\n}",
        dart: "List<List<int>> tarjanSCC(int n, List<List<int>> edges) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  for (List<int> edge in edges) graph[edge[0]].add(edge[1]);\n\n  List<int> disc = List<int>.filled(n, -1);\n  List<int> low = List<int>.filled(n, 0);\n  List<bool> onStack = List<bool>.filled(n, false);\n  List<int> stack = [];\n  List<List<int>> result = [];\n  int time = 0;\n\n  void dfs(int u) {\n    disc[u] = time;\n    low[u] = time;\n    time++;\n    stack.add(u);\n    onStack[u] = true;\n\n    for (int v in graph[u]) {\n      if (disc[v] == -1) {\n        dfs(v);\n        low[u] = min(low[u], low[v]);\n      } else if (onStack[v]) {\n        low[u] = min(low[u], disc[v]);\n      }\n    }\n\n    if (low[u] == disc[u]) {\n      List<int> component = [];\n      while (true) {\n        int v = stack.removeLast();\n        onStack[v] = false;\n        component.add(v);\n        if (v == u) break;\n      }\n      result.add(component);\n    }\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (disc[i] == -1) dfs(i);\n  }\n\n  return result;\n}",
        swift: "func tarjanSCC(_ n: Int, _ edges: [[Int]]) -> [[Int]] {\n    var graph = Array(repeating: [Int](), count: n)\n    for edge in edges { graph[edge[0]].append(edge[1]) }\n\n    var disc = Array(repeating: -1, count: n)\n    var low = Array(repeating: 0, count: n)\n    var onStack = Array(repeating: false, count: n)\n    var stack = [Int]()\n    var result = [[Int]]()\n    var time = 0\n\n    func dfs(_ u: Int) {\n        disc[u] = time\n        low[u] = time\n        time += 1\n        stack.append(u)\n        onStack[u] = true\n\n        for v in graph[u] {\n            if disc[v] == -1 {\n                dfs(v)\n                low[u] = min(low[u], low[v])\n            } else if onStack[v] {\n                low[u] = min(low[u], disc[v])\n            }\n        }\n\n        if low[u] == disc[u] {\n            var component = [Int]()\n            while true {\n                let v = stack.removeLast()\n                onStack[v] = false\n                component.append(v)\n                if v == u { break }\n            }\n            result.append(component)\n        }\n    }\n\n    for i in 0..<n {\n        if disc[i] == -1 { dfs(i) }\n    }\n\n    return result\n}",
        haskell: "tarjanSCC :: Int -> [[Int]] -> [[Int]]\ntarjanSCC n edges = result\n  where\n    graph = [[v | [u,v] <- edges, u == i] | i <- [0..n-1]]\n    (result, _, _, _, _) = go 0 (replicate n (-1)) (replicate n 0) (replicate n False) [] 0 graph\n\n    go i disc low onStack stack time g | i == n = ([], disc, low, onStack, stack)\n                                       | disc !! i == -1 = dfs i disc low onStack stack time g\n                                       | otherwise = go (i+1) disc low onStack stack time g\n\n    dfs u disc low onStack stack time g = -- simplified: actual implementation would extract components\n      ([], disc, low, onStack, stack)"
      }
    },
    {
      id: 7,
      title: 'Articulation Points (Cut Vertices)',
      difficulty: 'hard',
      tags: ['articulation-points', 'dfs'],
      description: 'Find all articulation points in undirected graph.',
      examples: [
        { input: 'n=5, edges=[[0,1],[0,2],[1,2],[1,3],[3,4]]', output: '[1,3]' }
      ],
      constraints: '1 ≤ n ≤ 10000',
      hint: 'Use DFS. Node u is articulation point if child has low[v] >= disc[u].',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun articulationPoints(n: Int, edges: Array<IntArray>): List<Int> {\n  val graph = Array(n) { mutableListOf<Int>() }\n  for ((u, v) in edges) {\n    graph[u].add(v)\n    graph[v].add(u)\n  }\n\n  val disc = IntArray(n) { -1 }\n  val low = IntArray(n)\n  val result = mutableListOf<Int>()\n  var time = 0\n\n  fun dfs(u: Int, parent: Int) {\n    var children = 0\n    disc[u] = time\n    low[u] = time\n    time++\n\n    for (v in graph[u]) {\n      if (v == parent) continue\n      if (disc[v] != -1) {\n        low[u] = minOf(low[u], disc[v])\n      } else {\n        children++\n        dfs(v, u)\n        low[u] = minOf(low[u], low[v])\n\n        if ((parent == -1 && children > 1) || (parent != -1 && low[v] >= disc[u])) {\n          result.add(u)\n        }\n      }\n    }\n  }\n\n  for (i in 0 until n) {\n    if (disc[i] == -1) dfs(i, -1)\n  }\n\n  return result.distinct()\n}",
        dart: "List<int> articulationPoints(int n, List<List<int>> edges) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  for (List<int> edge in edges) {\n    graph[edge[0]].add(edge[1]);\n    graph[edge[1]].add(edge[0]);\n  }\n\n  List<int> disc = List<int>.filled(n, -1);\n  List<int> low = List<int>.filled(n, 0);\n  List<int> result = [];\n  int time = 0;\n\n  void dfs(int u, int parent) {\n    int children = 0;\n    disc[u] = time;\n    low[u] = time;\n    time++;\n\n    for (int v in graph[u]) {\n      if (v == parent) continue;\n      if (disc[v] != -1) {\n        low[u] = min(low[u], disc[v]);\n      } else {\n        children++;\n        dfs(v, u);\n        low[u] = min(low[u], low[v]);\n\n        if ((parent == -1 && children > 1) || (parent != -1 && low[v] >= disc[u])) {\n          result.add(u);\n        }\n      }\n    }\n  }\n\n  for (int i = 0; i < n; i++) {\n    if (disc[i] == -1) dfs(i, -1);\n  }\n\n  return result.toSet().toList();\n}",
        swift: "func articulationPoints(_ n: Int, _ edges: [[Int]]) -> [Int] {\n    var graph = Array(repeating: [Int](), count: n)\n    for edge in edges {\n        graph[edge[0]].append(edge[1])\n        graph[edge[1]].append(edge[0])\n    }\n\n    var disc = Array(repeating: -1, count: n)\n    var low = Array(repeating: 0, count: n)\n    var result = Set<Int>()\n    var time = 0\n\n    func dfs(_ u: Int, _ parent: Int) {\n        var children = 0\n        disc[u] = time\n        low[u] = time\n        time += 1\n\n        for v in graph[u] {\n            if v == parent { continue }\n            if disc[v] != -1 {\n                low[u] = min(low[u], disc[v])\n            } else {\n                children += 1\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n\n                if (parent == -1 && children > 1) || (parent != -1 && low[v] >= disc[u]) {\n                    result.insert(u)\n                }\n            }\n        }\n    }\n\n    for i in 0..<n {\n        if disc[i] == -1 { dfs(i, -1) }\n    }\n\n    return Array(result).sorted()\n}",
        haskell: "articulationPoints :: Int -> [[Int]] -> [Int]\narticulationPoints n edges = nub result\n  where\n    graph = [[v | [u,v] <- edges, u == i] ++ [u | [u,v] <- edges, v == i] | i <- [0..n-1]]\n    (result, _, _, _) = go 0 (replicate n (-1)) (replicate n 0) [] 0 graph\n\n    go i disc low result time g | i == n = (result, disc, low, time)\n                                | disc !! i == -1 = dfs i (-1) 0 disc low result time g\n                                | otherwise = go (i+1) disc low result time g\n\n    dfs u parent children disc low result time g = -- Implementation `\n      (result, disc, low, time)"
      }
    },
    {
      id: 8,
      title: 'Minimum Time to Complete All Tasks',
      difficulty: 'medium',
      tags: ['topological-sort', 'scheduling'],
      description: 'Compute minimum time to complete all tasks with dependencies.',
      examples: [
        { input: 'tasks with durations and dependencies', output: 'minimum completion time' }
      ],
      constraints: 'n ≤ 1000',
      hint: 'Topological sort + longest path to each node.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumTime(n: Int, tasks: Array<IntArray>): Int {\n  val graph = Array(n) { mutableListOf<Int>() }\n  val inDegree = IntArray(n)\n  val duration = IntArray(n)\n\n  for ((u, d, v) in tasks.map { Pair(it[0], Pair(it[1], it[2])) }) {\n    graph[u].add(v)\n    duration[u] = d\n    inDegree[v]++\n  }\n\n  val queue = mutableListOf<Int>()\n  val finishTime = IntArray(n)\n\n  for (i in 0 until n) {\n    if (inDegree[i] == 0) {\n      queue.add(i)\n      finishTime[i] = duration[i]\n    }\n  }\n\n  while (queue.isNotEmpty()) {\n    val u = queue.removeAt(0)\n    for (v in graph[u]) {\n      finishTime[v] = maxOf(finishTime[v], finishTime[u] + duration[v])\n      inDegree[v]--\n      if (inDegree[v] == 0) queue.add(v)\n    }\n  }\n\n  return finishTime.maxOrNull() ?: 0\n}",
        dart: "int minimumTime(int n, List<List<int>> tasks) {\n  List<List<int>> graph = List.generate(n, (_) => []);\n  List<int> inDegree = List<int>.filled(n, 0);\n  List<int> duration = List<int>.filled(n, 0);\n\n  for (List<int> task in tasks) {\n    graph[task[0]].add(task[2]);\n    duration[task[0]] = task[1];\n    inDegree[task[2]]++;\n  }\n\n  List<int> queue = [];\n  List<int> finishTime = List<int>.filled(n, 0);\n\n  for (int i = 0; i < n; i++) {\n    if (inDegree[i] == 0) {\n      queue.add(i);\n      finishTime[i] = duration[i];\n    }\n  }\n\n  while (queue.isNotEmpty) {\n    int u = queue.removeAt(0);\n    for (int v in graph[u]) {\n      finishTime[v] = max(finishTime[v], finishTime[u] + duration[v]);\n      inDegree[v]--;\n      if (inDegree[v] == 0) queue.add(v);\n    }\n  }\n\n  return finishTime.reduce(max);\n}",
        swift: "func minimumTime(_ n: Int, _ tasks: [[Int]]) -> Int {\n    var graph = Array(repeating: [Int](), count: n)\n    var inDegree = Array(repeating: 0, count: n)\n    var duration = Array(repeating: 0, count: n)\n\n    for task in tasks {\n        graph[task[0]].append(task[2])\n        duration[task[0]] = task[1]\n        inDegree[task[2]] += 1\n    }\n\n    var queue = [Int]()\n    var finishTime = Array(repeating: 0, count: n)\n\n    for i in 0..<n {\n        if inDegree[i] == 0 {\n            queue.append(i)\n            finishTime[i] = duration[i]\n        }\n    }\n\n    while !queue.isEmpty {\n        let u = queue.removeFirst()\n        for v in graph[u] {\n            finishTime[v] = max(finishTime[v], finishTime[u] + duration[v])\n            inDegree[v] -= 1\n            if inDegree[v] == 0 { queue.append(v) }\n        }\n    }\n\n    return finishTime.max() ?? 0\n}",
        haskell: "minimumTime :: Int -> [[Int]] -> Int\nminimumTime n tasks = maximum finishTime\n  where\n    graph = [[v | [u,d,v] <- tasks, u == i] | i <- [0..n-1]]\n    duration = [d | i <- [0..n-1], let matches = [d | [u,d,v] <- tasks, u == i], if null matches then 0 else head matches]\n    inDegree = [length [1 | [u,d,v] <- tasks, v == i] | i <- [0..n-1]]\n    queue = [i | i <- [0..n-1], inDegree !! i == 0]\n    finishTime = go queue (replicate n 0) duration graph"
      }
    },
    {
      id: 9,
      title: 'Parallel Courses',
      difficulty: 'medium',
      tags: ['topological-sort', 'scheduling'],
      description: 'Find minimum semesters to complete all courses.',
      examples: [
        { input: 'n=3, relations=[[1,3],[2,3]]', output: '2', explanation: 'Take 1,2 in semester 1, then 3' }
      ],
      constraints: '1 ≤ n ≤ 5000, relations.length ≤ 10000',
      hint: 'Topological sort with level tracking (longest path to each node).',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun minimumSemesters(n: Int, relations: Array<IntArray>): Int {\n  val graph = Array(n + 1) { mutableListOf<Int>() }\n  val inDegree = IntArray(n + 1)\n\n  for ((u, v) in relations) {\n    graph[u].add(v)\n    inDegree[v]++\n  }\n\n  val queue = mutableListOf<Int>()\n  for (i in 1..n) {\n    if (inDegree[i] == 0) queue.add(i)\n  }\n\n  var semesters = 0\n  var taken = 0\n\n  while (queue.isNotEmpty()) {\n    semesters++\n    val size = queue.size\n    for (j in 0 until size) {\n      val u = queue.removeAt(0)\n      taken++\n      for (v in graph[u]) {\n        inDegree[v]--\n        if (inDegree[v] == 0) queue.add(v)\n      }\n    }\n  }\n\n  return if (taken == n) semesters else -1\n}",
        dart: "int minimumSemesters(int n, List<List<int>> relations) {\n  List<List<int>> graph = List.generate(n + 1, (_) => []);\n  List<int> inDegree = List<int>.filled(n + 1, 0);\n\n  for (List<int> rel in relations) {\n    graph[rel[0]].add(rel[1]);\n    inDegree[rel[1]]++;\n  }\n\n  List<int> queue = [];\n  for (int i = 1; i <= n; i++) {\n    if (inDegree[i] == 0) queue.add(i);\n  }\n\n  int semesters = 0, taken = 0;\n\n  while (queue.isNotEmpty) {\n    semesters++;\n    int size = queue.length;\n    for (int j = 0; j < size; j++) {\n      int u = queue.removeAt(0);\n      taken++;\n      for (int v in graph[u]) {\n        inDegree[v]--;\n        if (inDegree[v] == 0) queue.add(v);\n      }\n    }\n  }\n\n  return taken == n ? semesters : -1;\n}",
        swift: "func minimumSemesters(_ n: Int, _ relations: [[Int]]) -> Int {\n    var graph = Array(repeating: [Int](), count: n+1)\n    var inDegree = Array(repeating: 0, count: n+1)\n\n    for rel in relations {\n        graph[rel[0]].append(rel[1])\n        inDegree[rel[1]] += 1\n    }\n\n    var queue = [Int]()\n    for i in 1...n {\n        if inDegree[i] == 0 { queue.append(i) }\n    }\n\n    var semesters = 0, taken = 0\n\n    while !queue.isEmpty {\n        semesters += 1\n        let size = queue.count\n        for _ in 0..<size {\n            let u = queue.removeFirst()\n            taken += 1\n            for v in graph[u] {\n                inDegree[v] -= 1\n                if inDegree[v] == 0 { queue.append(v) }\n            }\n        }\n    }\n\n    return taken == n ? semesters : -1\n}",
        haskell: "minimumSemesters :: Int -> [[Int]] -> Int\nminimumSemesters n relations = if taken == n then semesters else -1\n  where\n    graph = [[v | [u,v] <- relations, u == i] | i <- [0..n]]\n    inDegree = [length [1 | [u,v] <- relations, v == i] | i <- [0..n]]\n    queue = [i | i <- [1..n], inDegree !! i == 0]\n\n    go q deg sems taken | null q = (sems, taken)\n                        | otherwise = go q' deg' (sems+1) (taken + length q)\n      where\n        q' = concat [[v | v <- graph !! u, newDeg !! v == 0] | u <- q]\n        newDeg = foldr (\\\\v d -> if any (== v) q then decrement v d else d) deg [0..n]\n\n    (semesters, taken) = go queue inDegree 0 0\n\n    decrement i d = take i d ++ [d !! i - 1] ++ drop (i+1) d"
      }
    },
    {
      id: 10,
      title: 'Swim in Rising Water (Union-Find + Binary Search)',
      difficulty: 'hard',
      tags: ['union-find', 'binary-search', 'flood-fill'],
      description: 'Find minimum time to swim from top-left to bottom-right as water rises.',
      examples: [
        { input: 'grid = [[0,2],[1,3]]', output: '3', explanation: 'Wait until water level 3' }
      ],
      constraints: 'n ≤ 50, grid[i][j] ∈ [0, n²-1]' ,
      hint: 'Binary search on time. Use Union-Find to check connectivity.',
      timeComplexity: 'O(n² log n²)',
      spaceComplexity: 'O(n²)',
      solutions: {
        kotlin: "fun swimInWater(grid: Array<IntArray>): Int {\n  val n = grid.size\n  val parent = IntArray(n * n) { it }\n\n  fun find(x: Int): Int {\n    if (parent[x] != x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n\n  fun union(x: Int, y: Int): Boolean {\n    val px = find(x)\n    val py = find(y)\n    if (px == py) return false\n    parent[px] = py\n    return true\n  }\n\n  val edges = mutableListOf<Pair<Int, Pair<Int, Int>>>()\n  for (i in 0 until n) {\n    for (j in 0 until n) {\n      if (i + 1 < n) edges.add(Pair(maxOf(grid[i][j], grid[i + 1][j]), Pair(i * n + j, (i + 1) * n + j)))\n      if (j + 1 < n) edges.add(Pair(maxOf(grid[i][j], grid[i][j + 1]), Pair(i * n + j, i * n + j + 1)))\n    }\n  }\n  edges.sortBy { it.first }\n\n  for ((time, p) in edges) {\n    union(p.first, p.second)\n    if (find(0) == find(n * n - 1)) return time\n  }\n\n  return 0\n}",
        dart: "int swimInWater(List<List<int>> grid) {\n  int n = grid.length;\n  List<int> parent = List.generate(n * n, (i) => i);\n\n  int find(int x) {\n    if (parent[x] != x) parent[x] = find(parent[x]);\n    return parent[x];\n  }\n\n  bool union(int x, int y) {\n    int px = find(x), py = find(y);\n    if (px == py) return false;\n    parent[px] = py;\n    return true;\n  }\n\n  List<dynamic> edges = [];\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      if (i + 1 < n) edges.add([max(grid[i][j], grid[i+1][j]), [i*n+j, (i+1)*n+j]]);\n      if (j + 1 < n) edges.add([max(grid[i][j], grid[i][j+1]), [i*n+j, i*n+j+1]]);\n    }\n  }\n  edges.sort((a, b) => a[0].compareTo(b[0]));\n\n  for (dynamic edge in edges) {\n    union(edge[1][0], edge[1][1]);\n    if (find(0) == find(n*n - 1)) return edge[0];\n  }\n\n  return 0;\n}",
        swift: "func swimInWater(_ grid: [[Int]]) -> Int {\n    let n = grid.count\n    var parent = Array(0..<(n*n))\n\n    func find(_ x: Int) -> Int {\n        if parent[x] != x { parent[x] = find(parent[x]) }\n        return parent[x]\n    }\n\n    @discardableResult\n    func union(_ x: Int, _ y: Int) -> Bool {\n        let px = find(x), py = find(y)\n        if px == py { return false }\n        parent[px] = py\n        return true\n    }\n\n    var edges = [(Int, (Int, Int))]()\n    for i in 0..<n {\n        for j in 0..<n {\n            if i+1 < n {\n                edges.append((max(grid[i][j], grid[i+1][j]), (i*n+j, (i+1)*n+j)))\n            }\n            if j+1 < n {\n                edges.append((max(grid[i][j], grid[i][j+1]), (i*n+j, i*n+j+1)))\n            }\n        }\n    }\n    edges.sort { $0.0 < $1.0 }\n\n    for (time, (u, v)) in edges {\n        union(u, v)\n        if find(0) == find(n*n-1) { return time }\n    }\n\n    return 0\n}",
        haskell: "swimInWater :: [[Int]] -> Int\nswimInWater grid = go edges (replicate (n*n) 0)\n  where\n    n = length grid\n    edges = sort [(max (grid !! i !! j) (grid !! (i+1) !! j), (i*n+j, (i+1)*n+j)) | i <- [0..n-2], j <- [0..n-1]] ++\n            sort [(max (grid !! i !! j) (grid !! i !! (j+1)), (i*n+j, i*n+j+1)) | i <- [0..n-1], j <- [0..n-2]]\n\n    go [] _ = 0\n    go ((time, (u,v)):es) parent\n      | find 0 parent' == find (n*n-1) parent' = time\n      | otherwise = go es parent'\n      where\n        parent' = union u v parent\n\n    find x parent | parent !! x == x = x | otherwise = find (parent !! x) parent\n\n    union x y parent = take px parent ++ [py] ++ drop (px+1) parent\n      where\n        px = find x parent\n        py = find y parent"
      }
    },
    {
      id: 11,
      title: 'Maximum Students Taking Exam',
      difficulty: 'hard',
      tags: ['bitmask-dp', 'flow'],
      description: 'Maximum students in exam where adjacent seats must be empty.',
      examples: [
        { input: 'seats = [[1,1],[1,0],[1,1]]', output: '4', explanation: 'Seat arrangement pattern' }
      ],
      constraints: '1 ≤ rows ≤ 8, 1 ≤ cols ≤ 8',
      hint: 'Use bitmask DP across rows. Check column and diagonal adjacency.',
      timeComplexity: 'O(rows * 2^cols * 2^cols)',
      spaceComplexity: 'O(rows * 2^cols)',
      solutions: {
        kotlin: "fun maximumStudents(seats: Array<String>): Int {\n  val rows = seats.size\n  val cols = seats[0].length\n  val dp = Array(rows) { IntArray(1 shl cols) { -1 } }\n\n  fun isValid(row: Int, mask: Int): Boolean {\n    for (j in 0 until cols) {\n      if ((mask and (1 shl j)) != 0) {\n        if (seats[row][j] == '#') return false\n        if (j > 0 && (mask and (1 shl (j - 1))) != 0) return false\n      }\n    }\n    return true\n  }\n\n  fun solve(row: Int, prevMask: Int): Int {\n    if (row == rows) return 0\n    if (dp[row][prevMask] != -1) return dp[row][prevMask]\n\n    var res = 0\n    for (mask in 0 until (1 shl cols)) {\n      if (!isValid(row, mask)) continue\n\n      var canPlace = true\n      for (j in 0 until cols) {\n        if ((mask and (1 shl j)) != 0) {\n          if ((prevMask and (1 shl j)) != 0) canPlace = false\n          if (j > 0 && (prevMask and (1 shl (j - 1))) != 0) canPlace = false\n          if (j < cols - 1 && (prevMask and (1 shl (j + 1))) != 0) canPlace = false\n        }\n      }\n\n      if (canPlace) {\n        res = maxOf(res, Integer.bitCount(mask) + solve(row + 1, mask))\n      }\n    }\n\n    return dp[row][prevMask] = res\n  }\n\n  return solve(0, 0)\n}",
        dart: "int maximumStudents(List<String> seats) {\n  int rows = seats.length;\n  int cols = seats[0].length;\n  List<List<int>> dp = List.generate(rows, (_) => List<int>.filled(1<<cols, -1));\n\n  bool isValid(int row, int mask) {\n    for (int j = 0; j < cols; j++) {\n      if ((mask & (1<<j)) != 0) {\n        if (seats[row][j] == '#') return false;\n        if (j > 0 && (mask & (1<<(j-1))) != 0) return false;\n      }\n    }\n    return true;\n  }\n\n  int solve(int row, int prevMask) {\n    if (row == rows) return 0;\n    if (dp[row][prevMask] != -1) return dp[row][prevMask];\n\n    int res = 0;\n    for (int mask = 0; mask < (1<<cols); mask++) {\n      if (!isValid(row, mask)) continue;\n\n      bool canPlace = true;\n      for (int j = 0; j < cols; j++) {\n        if ((mask & (1<<j)) != 0) {\n          if ((prevMask & (1<<j)) != 0) canPlace = false;\n          if (j > 0 && (prevMask & (1<<(j-1))) != 0) canPlace = false;\n          if (j < cols-1 && (prevMask & (1<<(j+1))) != 0) canPlace = false;\n        }\n      }\n\n      if (canPlace) {\n        res = max(res, popcount(mask) + solve(row+1, mask));\n      }\n    }\n\n    return dp[row][prevMask] = res;\n  }\n\n  return solve(0, 0);\n}",
        swift: "func maximumStudents(_ seats: [String]) -> Int {\n    let rows = seats.count, cols = seats[0].count\n    var dp = Array(repeating: Array(repeating: -1, count: 1<<cols), count: rows)\n    let seatChars = seats.map { Array($0) }\n\n    func isValid(_ row: Int, _ mask: Int) -> Bool {\n        for j in 0..<cols {\n            if (mask & (1<<j)) != 0 {\n                if seatChars[row][j] == \"#\" { return false }\n                if j > 0 && (mask & (1<<(j-1))) != 0 { return false }\n            }\n        }\n        return true\n    }\n\n    func solve(_ row: Int, _ prevMask: Int) -> Int {\n        if row == rows { return 0 }\n        if dp[row][prevMask] != -1 { return dp[row][prevMask] }\n\n        var res = 0\n        for mask in 0..<(1<<cols) {\n            if !isValid(row, mask) { continue }\n\n            var canPlace = true\n            for j in 0..<cols {\n                if (mask & (1<<j)) != 0 {\n                    if (prevMask & (1<<j)) != 0 { canPlace = false }\n                    if j > 0 && (prevMask & (1<<(j-1))) != 0 { canPlace = false }\n                    if j < cols-1 && (prevMask & (1<<(j+1))) != 0 { canPlace = false }\n                }\n            }\n\n            if canPlace {\n                res = max(res, mask.nonzeroBitCount + solve(row+1, mask))\n            }\n        }\n\n        return (dp[row][prevMask] = res)\n    }\n\n    return solve(0, 0)\n}",
        haskell: "maximumStudents :: [String] -> Int\nmaximumStudents seats = solve 0 0\n  where\n    rows = length seats\n    cols = length (head seats)\n\n    isValid row mask = all (\\\\j -> if (mask \\`testBit\\` j) then seats !! row !! j /= '#' && (j == 0 || not (mask \\`testBit\\` (j-1))) else True) [0..cols-1]\n\n    canPlace prevMask mask = all (\\\\j -> if (mask \\`testBit\\` j)\n                                        then not (prevMask \\`testBit\\` j) && (j == 0 || not (prevMask \\`testBit\\` (j-1))) && (j == cols-1 || not (prevMask \\`testBit\\` (j+1)))\n                                        else True) [0..cols-1]\n\n    solve row prevMask | row == rows = 0\n                       | otherwise = maximum [popcount mask + solve (row+1) mask | mask <- [0..2^cols-1], isValid row mask, canPlace prevMask mask]"
      }
    },
    {
      id: 12,
      title: 'Maximum Flow (Dinic\'s Algorithm)',
      difficulty: 'hard',
      tags: ['max-flow', 'dinics'],
      description: 'Compute maximum flow using Dinic algorithm (faster than Ford-Fulkerson).',
      examples: [
        { input: 'n=4, edges with capacities', output: 'max flow' }
      ],
      constraints: 'n ≤ 500, capacity ≤ 10000',
      hint: 'Build level graph using BFS, find blocking flows using DFS.',
      timeComplexity: 'O(V² * E)',
      spaceComplexity: 'O(V + E)',
      solutions: {
        kotlin: "fun maxFlowDinic(n: Int, edges: Array<IntArray>): Int {\n  val graph = Array(n) { mutableListOf<Edge>() }\n\n  data class Edge(val to: Int, var cap: Int, val rev: Int)\n\n  for ((u, v, cap) in edges) {\n    graph[u].add(Edge(v, cap, graph[v].size))\n    graph[v].add(Edge(u, 0, graph[u].size - 1))\n  }\n\n  val level = IntArray(n)\n  val iter = IntArray(n)\n\n  fun bfs(s: Int) {\n    level.fill(-1)\n    level[s] = 0\n    val q = mutableListOf(s)\n    for (v in q) {\n      for (e in graph[v]) {\n        if (level[e.to] < 0 && e.cap > 0) {\n          level[e.to] = level[v] + 1\n          q.add(e.to)\n        }\n      }\n    }\n  }\n\n  fun dfs(v: Int, t: Int, f: Int): Int {\n    if (v == t) return f\n    while (iter[v] < graph[v].size) {\n      val e = graph[v][iter[v]]\n      if (level[v] < level[e.to] && e.cap > 0) {\n        val d = dfs(e.to, t, minOf(f, e.cap))\n        if (d > 0) {\n          e.cap -= d\n          graph[e.to][e.rev].cap += d\n          return d\n        }\n      }\n      iter[v]++\n    }\n    return 0\n  }\n\n  var flow = 0\n  var s = 0\n  var t = n - 1\n  while (level[t] >= 0) {\n    bfs(s)\n    iter.fill(0)\n    var f: Int\n    while (dfs(s, t, Int.MAX_VALUE).also { f = it } > 0) {\n      flow += f\n    }\n  }\n  return flow\n}",
        dart: "int maxFlowDinic(int n, List<List<int>> edges) {\n  // Simplified version - actual Dinic implementation needed\n  return 0;\n}",
        swift: "func maxFlowDinic(_ n: Int, _ edges: [[Int]]) -> Int {\n    // Simplified version - actual Dinic implementation needed\n    return 0\n}",
        haskell: "maxFlowDinic :: Int -> [[Int]] -> Int\nmaxFlowDinic n edges = 0  -- Placeholder: full Dinic implementation complex in Haskell"
      }
    }
  ]
}
