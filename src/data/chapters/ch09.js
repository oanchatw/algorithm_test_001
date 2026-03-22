export default {
  id: 9,
  year: 1,
  slug: 'trees-bst',
  icon: '🌳',
  color: '#3fb950',
  title: 'Trees & Binary Search Trees',
  subtitle: 'Traversals, BST Properties, Balanced Trees',
  description: 'Master tree data structures and BST algorithms. Learn in-order, pre-order, and post-order traversals, understand BST properties, balance trees, and solve complex tree problems using recursion and iterative approaches.',
  theorems: [
    {
      id: 'bst-inorder-sorted',
      name: 'BST Inorder Traversal Produces Sorted Sequence',
      katex_statement: '\\text{For any BST, inorder traversal yields values in strictly increasing order}',
      statement_text: 'When performing an in-order traversal of a binary search tree (visiting left subtree, then node, then right subtree), the sequence of values visited is strictly increasing.',
      proof: `Proof by strong induction on the structure of the BST:

Base case: A single node BST trivially produces a sorted sequence of length 1.

Inductive step: Assume the theorem holds for all BSTs with fewer than n nodes. Consider a BST T with n nodes and root r with left subtree L and right subtree R.

By definition of BST:
- All values in L are strictly less than r's value
- All values in R are strictly greater than r's value

By inductive hypothesis:
- Inorder traversal of L produces values sorted in increasing order: v₁ < v₂ < ... < vₖ
- Inorder traversal of R produces values sorted in increasing order: w₁ < w₂ < ... < wₘ

Inorder traversal of T visits: v₁, v₂, ..., vₖ, r, w₁, w₂, ..., wₘ

By BST property: vₖ < r < w₁

Therefore: v₁ < v₂ < ... < vₖ < r < w₁ < w₂ < ... < wₘ

This is strictly increasing, completing the proof.`,
      cases: [
        {
          name: 'Empty subtree',
          description: 'Contributes nothing to the sequence'
        },
        {
          name: 'Leaf node',
          description: 'Trivially produces sorted sequence of length 1'
        },
        {
          name: 'Complete BST',
          description: 'All values in left subtree < root < all values in right subtree'
        }
      ]
    },
    {
      id: 'bst-height-complete',
      name: 'Height of Complete Binary Tree',
      katex_statement: 'h = \\lfloor \\log_2 n \\rfloor \\text{ for a complete binary tree with } n \\text{ nodes}',
      statement_text: 'A complete binary tree with n nodes has height equal to floor of log base 2 of n.',
      proof: `A complete binary tree fills all levels completely except possibly the last level, which is filled from left to right.

For a complete binary tree of height h:
- Minimum nodes: 2^h (only the lowest level partially filled)
- Maximum nodes: 2^(h+1) - 1 (all levels completely filled)

Given n nodes in a complete binary tree:
2^h ≤ n < 2^(h+1)

Taking log₂ of all parts:
h ≤ log₂(n) < h + 1

This means: h = ⌊log₂(n)⌋

The height is the number of edges from root to the deepest leaf, equal to the floor of log base 2 of the number of nodes.

Example:
- n = 5 nodes: height = ⌊log₂ 5⌋ = ⌊2.32⌋ = 2
- n = 8 nodes: height = ⌊log₂ 8⌋ = 3
- n = 15 nodes: height = ⌊log₂ 15⌋ = 3`,
      cases: [
        {
          name: 'Single node',
          description: 'n=1, height = 0'
        },
        {
          name: 'Perfect binary tree',
          description: 'n = 2^(h+1)-1, height = log₂(n+1)-1'
        },
        {
          name: 'Last level partial',
          description: 'General complete tree with h = ⌊log₂ n⌋'
        }
      ]
    },
    {
      id: 'avl-rotation-preserves-bst',
      name: 'AVL Rotations Preserve BST Property',
      katex_statement: '\\text{Left/Right rotations on BST maintain all BST relationships}',
      statement_text: 'When performing left or right rotations on a BST to rebalance it (as in AVL trees), all BST ordering properties are preserved.',
      proof: `Left Rotation Analysis:
Consider a node x with right child y before rotation.
BST property before rotation: left(x) < x < left(y) < y < right(y)

After left rotation (y becomes parent, x becomes y's left child):
- x becomes left child of y
- left(y) becomes right child of x
- y's right subtree remains unchanged

New relationships:
- left(x) < x < left(y) (left subtree of x is unchanged, left(y) moves to right of x)
- x < y (x is left child of y)
- y < right(y) (y's position relative to its right subtree unchanged)

Combined: left(x) < x < left(y) < y < right(y) ✓

All BST relationships are preserved. The rotation maintains:
1. All values in left subtrees remain less than their parents
2. All values in right subtrees remain greater than their parents
3. The in-order traversal sequence remains identical

Right rotation is symmetric and preserves BST properties identically.

Therefore, both left and right rotations preserve the BST property while changing the tree structure to rebalance heights.`,
      cases: [
        {
          name: 'Left rotation (y is right child)',
          description: 'Moves right-heavy subtrees up'
        },
        {
          name: 'Right rotation (y is left child)',
          description: 'Moves left-heavy subtrees up'
        },
        {
          name: 'Double rotation',
          description: 'Left-right or right-left combinations also preserve BST'
        }
      ]
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'easy',
      tags: ['tree', 'traversal', 'recursion'],
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values (left, root, right).',
      examples: [
        {
          input: 'root = [1,null,2]',
          output: '[1,2]',
          explanation: 'Inorder traversal of [1,null,2]'
        },
        {
          input: 'root = []',
          output: '[]',
          explanation: 'Empty tree produces empty traversal'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 100]'],
      hint: 'Recursively visit left subtree, process node, then visit right subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height (call stack)',
      solutions: {
        kotlin: "fun inorderTraversal(root: TreeNode?): List<Int> {\n    val result = mutableListOf<Int>()\n\n    fun traverse(node: TreeNode?) {\n        if (node == null) return\n        traverse(node.left)\n        result.add(node.val)\n        traverse(node.right)\n    }\n\n    traverse(root)\n    return result\n}",
        dart: "List<int> inorderTraversal(TreeNode? root) {\n  final result = <int>[];\n\n  void traverse(TreeNode? node) {\n    if (node == null) return;\n    traverse(node.left);\n    result.add(node.val);\n    traverse(node.right);\n  }\n\n  traverse(root);\n  return result;\n}",
        swift: "func inorderTraversal(_ root: TreeNode?) -> [Int] {\n    var result: [Int] = []\n\n    func traverse(_ node: TreeNode?) {\n        guard let node = node else { return }\n        traverse(node.left)\n        result.append(node.val)\n        traverse(node.right)\n    }\n\n    traverse(root)\n    return result\n}",
        haskell: "inorderTraversal :: Tree Int -> [Int]\ninorderTraversal Empty = []\ninorderTraversal (Node left val right) =\n  inorderTraversal left ++ [val] ++ inorderTraversal right"
      }
    },
    {
      id: 2,
      title: 'Maximum Depth of Binary Tree',
      difficulty: 'easy',
      tags: ['tree', 'dfs', 'recursion'],
      description: 'Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
      examples: [
        {
          input: 'root = [3,9,20,null,null,15,7]',
          output: '3',
          explanation: 'Path 3→20→15 or 3→20→7 has length 3'
        },
        {
          input: 'root = [1,null,2]',
          output: '2',
          explanation: 'Path 1→2 has length 2'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 10^4]'],
      hint: 'Recursively find depth of left and right subtrees, return 1 + max(left, right).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun maxDepth(root: TreeNode?): Int {\n    if (root == null) return 0\n    return 1 + maxOf(maxDepth(root.left), maxDepth(root.right))\n}",
        dart: "int maxDepth(TreeNode? root) {\n  if (root == null) return 0;\n  return 1 + max(maxDepth(root.left), maxDepth(root.right));\n}",
        swift: "func maxDepth(_ root: TreeNode?) -> Int {\n    guard let root = root else { return 0 }\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))\n}",
        haskell: "maxDepth :: Tree a -> Int\nmaxDepth Empty = 0\nmaxDepth (Node left _ right) = 1 + max (maxDepth left) (maxDepth right)"
      }
    },
    {
      id: 3,
      title: 'Symmetric Tree',
      difficulty: 'easy',
      tags: ['tree', 'recursion', 'symmetry'],
      description: 'Given the root of a binary tree, check whether it is a mirror of itself.',
      examples: [
        {
          input: 'root = [1,2,2,3,4,4,3]',
          output: 'true',
          explanation: 'Tree is symmetric around center'
        },
        {
          input: 'root = [1,2,2,null,3,null,3]',
          output: 'false',
          explanation: 'Nodes at different positions'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [1, 1000]'],
      hint: 'Check if left subtree is mirror of right subtree recursively.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun isSymmetric(root: TreeNode?): Boolean {\n    fun isMirror(left: TreeNode?, right: TreeNode?): Boolean {\n        if (left == null && right == null) return true\n        if (left == null || right == null) return false\n        return left.val == right.val &&\n               isMirror(left.left, right.right) &&\n               isMirror(left.right, right.left)\n    }\n    return isMirror(root?.left, root?.right)\n}",
        dart: "bool isSymmetric(TreeNode? root) {\n  bool isMirror(TreeNode? left, TreeNode? right) {\n    if (left == null && right == null) return true;\n    if (left == null || right == null) return false;\n    return left.val == right.val &&\n           isMirror(left.left, right.right) &&\n           isMirror(left.right, right.left);\n  }\n  return isMirror(root?.left, root?.right);\n}",
        swift: "func isSymmetric(_ root: TreeNode?) -> Bool {\n    func isMirror(_ left: TreeNode?, _ right: TreeNode?) -> Bool {\n        if left == nil && right == nil { return true }\n        if left == nil || right == nil { return false }\n        return left!.val == right!.val &&\n               isMirror(left!.left, right!.right) &&\n               isMirror(left!.right, right!.left)\n    }\n    return isMirror(root?.left, root?.right)\n}",
        haskell: "isSymmetric :: Tree Int -> Bool\nisSymmetric root = isMirror (left root) (right root) where\n  isMirror Empty Empty = True\n  isMirror Empty _ = False\n  isMirror _ Empty = False\n  isMirror (Node l1 v1 r1) (Node l2 v2 r2) =\n    v1 == v2 && isMirror l1 r2 && isMirror r1 l2"
      }
    },
    {
      id: 4,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'easy',
      tags: ['tree', 'bfs', 'queue'],
      description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (from left to right, level by level).',
      examples: [
        {
          input: 'root = [3,9,20,null,null,15,7]',
          output: '[[3],[9,20],[15,7]]',
          explanation: 'Level 0: [3], Level 1: [9,20], Level 2: [15,7]'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 2000]'],
      hint: 'Use a queue (BFS). Add children of current node, process level by level.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) where w is max width',
      solutions: {
        kotlin: "fun levelOrder(root: TreeNode?): List<List<Int>> {\n    val result = mutableListOf<List<Int>>()\n    if (root == null) return result\n\n    val queue = mutableListOf<TreeNode>(root)\n    while (queue.isNotEmpty()) {\n        val levelSize = queue.size\n        val currentLevel = mutableListOf<Int>()\n        for (i in 0 until levelSize) {\n            val node = queue.removeAt(0)\n            currentLevel.add(node.val)\n            if (node.left != null) queue.add(node.left!!)\n            if (node.right != null) queue.add(node.right!!)\n        }\n        result.add(currentLevel)\n    }\n    return result\n}",
        dart: "List<List<int>> levelOrder(TreeNode? root) {\n  final result = <List<int>>[];\n  if (root == null) return result;\n\n  final queue = <TreeNode>[root];\n  while (queue.isNotEmpty) {\n    final levelSize = queue.length;\n    final currentLevel = <int>[];\n    for (int i = 0; i < levelSize; i++) {\n      final node = queue.removeAt(0);\n      currentLevel.add(node.val);\n      if (node.left != null) queue.add(node.left!);\n      if (node.right != null) queue.add(node.right!);\n    }\n    result.add(currentLevel);\n  }\n  return result;\n}",
        swift: "func levelOrder(_ root: TreeNode?) -> [[Int]] {\n    var result: [[Int]] = []\n    guard let root = root else { return result }\n\n    var queue: [TreeNode] = [root]\n    while !queue.isEmpty {\n        let levelSize = queue.count\n        var currentLevel: [Int] = []\n        for _ in 0..<levelSize {\n            let node = queue.removeFirst()\n            currentLevel.append(node.val)\n            if let left = node.left { queue.append(left) }\n            if let right = node.right { queue.append(right) }\n        }\n        result.append(currentLevel)\n    }\n    return result\n}",
        haskell: "levelOrder :: Tree Int -> [[Int]]\nlevelOrder root = go [root] where\n  go [] = []\n  go nodes = map val nodes : go (concatMap children nodes)\n  children (Node l _ r) = [x | x <- [l, r], x /= Empty]\n  val (Node _ v _) = v"
      }
    },
    {
      id: 5,
      title: 'Convert Sorted Array to BST',
      difficulty: 'easy',
      tags: ['tree', 'bst', 'array'],
      description: 'Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.',
      examples: [
        {
          input: 'nums = [-10,-3,0,5,9]',
          output: '[0,-3,9,-10,null,5] (one valid answer)',
          explanation: 'Use middle element as root for balance'
        }
      ],
      constraints: ['1 <= nums.length <= 10^3', 'The array is sorted in strictly increasing order'],
      hint: 'Use middle element as root, recursively build left and right subtrees.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun sortedArrayToBST(nums: IntArray): TreeNode? {\n    fun build(left: Int, right: Int): TreeNode? {\n        if (left > right) return null\n        val mid = (left + right) / 2\n        val node = TreeNode(nums[mid])\n        node.left = build(left, mid - 1)\n        node.right = build(mid + 1, right)\n        return node\n    }\n    return build(0, nums.size - 1)\n}",
        dart: "TreeNode? sortedArrayToBST(List<int> nums) {\n  TreeNode? build(int left, int right) {\n    if (left > right) return null;\n    final mid = (left + right) ~/ 2;\n    final node = TreeNode(nums[mid]);\n    node.left = build(left, mid - 1);\n    node.right = build(mid + 1, right);\n    return node;\n  }\n  return build(0, nums.length - 1);\n}",
        swift: "func sortedArrayToBST(_ nums: [Int]) -> TreeNode? {\n    func build(_ left: Int, _ right: Int) -> TreeNode? {\n        if left > right { return nil }\n        let mid = (left + right) / 2\n        let node = TreeNode(nums[mid])\n        node.left = build(left, mid - 1)\n        node.right = build(mid + 1, right)\n        return node\n    }\n    return build(0, nums.count - 1)\n}",
        haskell: "sortedArrayToBST :: [Int] -> Tree Int\nsortedArrayToBST nums = build 0 (length nums - 1) where\n  build left right\n    | left > right = Empty\n    | otherwise = Node (build left (mid - 1)) mid (build (mid + 1) right)\n    where mid = (left + right) \\`div\\` 2"
      }
    },
    {
      id: 6,
      title: 'Path Sum',
      difficulty: 'easy',
      tags: ['tree', 'dfs', 'backtracking'],
      description: 'Given the root of a binary tree and an integer targetSum, return true if there is a root-to-leaf path with sum equal to targetSum.',
      examples: [
        {
          input: 'root = [5,4,8,11,null,13,4,7,2,null,1], targetSum = 22',
          output: 'true',
          explanation: 'Path 5→4→11→2 sums to 22'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 5000]'],
      hint: 'DFS from root. At each node, subtract its value from target. Return true if we reach a leaf with remaining sum 0.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {\n    fun dfs(node: TreeNode?, remaining: Int): Boolean {\n        if (node == null) return false\n        if (node.left == null && node.right == null) {\n            return remaining == node.val\n        }\n        val newRemaining = remaining - node.val\n        return dfs(node.left, newRemaining) || dfs(node.right, newRemaining)\n    }\n    return dfs(root, targetSum)\n}",
        dart: "bool hasPathSum(TreeNode? root, int targetSum) {\n  bool dfs(TreeNode? node, int remaining) {\n    if (node == null) return false;\n    if (node.left == null && node.right == null) {\n      return remaining == node.val;\n    }\n    final newRemaining = remaining - node.val;\n    return dfs(node.left, newRemaining) || dfs(node.right, newRemaining);\n  }\n  return dfs(root, targetSum);\n}",
        swift: "func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {\n    func dfs(_ node: TreeNode?, _ remaining: Int) -> Bool {\n        guard let node = node else { return false }\n        if node.left == nil && node.right == nil {\n            return remaining == node.val\n        }\n        let newRemaining = remaining - node.val\n        return dfs(node.left, newRemaining) || dfs(node.right, newRemaining)\n    }\n    return dfs(root, targetSum)\n}",
        haskell: "hasPathSum :: Tree Int -> Int -> Bool\nhasPathSum Empty _ = False\nhasPathSum (Node l v r) target\n  | isLeaf && v == target = True\n  | otherwise = hasPathSum l (target - v) || hasPathSum r (target - v)\n  where isLeaf = l == Empty && r == Empty"
      }
    },
    {
      id: 7,
      title: 'Flatten Binary Tree to Linked List',
      difficulty: 'medium',
      tags: ['tree', 'dfs', 'in-place'],
      description: 'Given the root of a binary tree, flatten the tree into a "linked list" using in-place transformation where right pointers act as next pointers.',
      examples: [
        {
          input: 'root = [1,2,5,3,4,null,6]',
          output: '[1,null,2,null,3,null,4,null,5,null,6]',
          explanation: 'Preorder traversal structure: 1→2→3→4→5→6'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 2000]'],
      hint: 'Use post-order traversal. Flatten right subtree, then left subtree, then connect.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun flatten(root: TreeNode?): Unit {\n    var prev: TreeNode? = null\n\n    fun dfs(node: TreeNode?) {\n        if (node == null) return\n        dfs(node.right)\n        dfs(node.left)\n        node.right = prev\n        node.left = null\n        prev = node\n    }\n\n    dfs(root)\n}",
        dart: "void flatten(TreeNode? root) {\n  TreeNode? prev;\n\n  void dfs(TreeNode? node) {\n    if (node == null) return;\n    dfs(node.right);\n    dfs(node.left);\n    node.right = prev;\n    node.left = null;\n    prev = node;\n  }\n\n  dfs(root);\n}",
        swift: "func flatten(_ root: TreeNode?) {\n    var prev: TreeNode? = nil\n\n    func dfs(_ node: TreeNode?) {\n        guard let node = node else { return }\n        dfs(node.right)\n        dfs(node.left)\n        node.right = prev\n        node.left = nil\n        prev = node\n    }\n\n    dfs(root)\n}",
        haskell: "flatten :: Tree Int -> Tree Int\nflatten t = fst (go t Nothing) where\n  go Empty prev = (Empty, prev)\n  go (Node l v r) prev =\n    let (r', prev1) = go r prev\n        (l', prev2) = go l prev1\n        newNode = Node Empty v r'\n    in (newNode, newNode)"
      }
    },
    {
      id: 8,
      title: 'Populating Next Right Pointers in Each Node',
      difficulty: 'medium',
      tags: ['tree', 'bfs', 'level-order'],
      description: 'Populate each next pointer to point to the next right node at the same level. For the rightmost node, next should point to null.',
      examples: [
        {
          input: 'root = [1,2,3,4,5,6,7]',
          output: '[1,#,2,#,3,#,4,#,5,#,6,#,7,#,null]',
          explanation: 'Each node points to next node at same level'
        }
      ],
      constraints: ['Tree is a perfect binary tree'],
      hint: 'Use level-order traversal or leverage the next pointers of parent level.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun connect(root: Node?): Node? {\n    var current = root\n    while (current != null) {\n        var next = current\n        while (next != null) {\n            next.left?.next = next.right\n            next.right?.next = next.next?.left\n            next = next.next\n        }\n        current = current.left\n    }\n    return root\n}",
        dart: "Node? connect(Node? root) {\n  var current = root;\n  while (current != null) {\n    var next = current;\n    while (next != null) {\n      next.left?.next = next.right;\n      next.right?.next = next.next?.left;\n      next = next.next;\n    }\n    current = current.left;\n  }\n  return root;\n}",
        swift: "func connect(_ root: Node?) -> Node? {\n    var current = root\n    while current != nil {\n        var next = current\n        while next != nil {\n            next!.left?.next = next!.right\n            next!.right?.next = next!.next?.left\n            next = next!.next\n        }\n        current = current!.left\n    }\n    return root\n}",
        haskell: "connect :: Node -> Node\nconnect root = go root where\n  go node =\n    let level = connectLevel node in\n    if hasChildren level then go (firstChild level) else level\n\n  connectLevel node = connectSiblings node\n\n  connectSiblings Empty = Empty\n  connectSiblings (Node l v r next) =\n    Node (connectSiblings l) v (connectSiblings r) next"
      }
    },
    {
      id: 9,
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'hard',
      tags: ['tree', 'dfs', 'dynamic-programming'],
      description: 'Given a non-empty binary tree, find the maximum path sum. A path can start and end at any node in the tree.',
      examples: [
        {
          input: 'root = [1,2,3]',
          output: '6',
          explanation: 'Path 2→1→3 has sum 6'
        },
        {
          input: 'root = [-10]',
          output: '-10',
          explanation: 'Single node with negative value'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4]'],
      hint: 'DFS from each node. Track max path through node and max path in subtree.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun maxPathSum(root: TreeNode?): Int {\n    var maxSum = Int.MIN_VALUE\n\n    fun dfs(node: TreeNode?): Int {\n        if (node == null) return 0\n        val left = maxOf(0, dfs(node.left))\n        val right = maxOf(0, dfs(node.right))\n        val pathSum = node.val + left + right\n        maxSum = maxOf(maxSum, pathSum)\n        return node.val + maxOf(left, right)\n    }\n\n    dfs(root)\n    return maxSum\n}",
        dart: "int maxPathSum(TreeNode? root) {\n  int maxSum = -2147483648;\n\n  int dfs(TreeNode? node) {\n    if (node == null) return 0;\n    final left = max(0, dfs(node.left));\n    final right = max(0, dfs(node.right));\n    final pathSum = node.val + left + right;\n    maxSum = max(maxSum, pathSum);\n    return node.val + max(left, right);\n  }\n\n  dfs(root);\n  return maxSum;\n}",
        swift: "func maxPathSum(_ root: TreeNode?) -> Int {\n    var maxSum = Int.min\n\n    func dfs(_ node: TreeNode?) -> Int {\n        guard let node = node else { return 0 }\n        let left = max(0, dfs(node.left))\n        let right = max(0, dfs(node.right))\n        let pathSum = node.val + left + right\n        maxSum = max(maxSum, pathSum)\n        return node.val + max(left, right)\n    }\n\n    dfs(root)\n    return maxSum\n}",
        haskell: "maxPathSum :: Tree Int -> Int\nmaxPathSum root = fst (go root) where\n  go Empty = (minBound, 0)\n  go (Node l v r) =\n    let (maxL, pathL) = go l\n        (maxR, pathR) = go r\n        left = max 0 pathL\n        right = max 0 pathR\n        pathSum = v + left + right\n        maxSum = maximum [maxL, maxR, pathSum]\n        pathToRoot = v + max left right\n    in (maxSum, pathToRoot)"
      }
    },
    {
      id: 10,
      title: 'Validate Binary Search Tree',
      difficulty: 'medium',
      tags: ['tree', 'bst', 'validation'],
      description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
      examples: [
        {
          input: 'root = [2,1,3]',
          output: 'true',
          explanation: 'Valid BST'
        },
        {
          input: 'root = [5,1,4,null,null,3,6]',
          output: 'false',
          explanation: 'Root value 5 but right child 4 is smaller'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [1, 10^4]'],
      hint: 'Track min/max bounds at each node. Validate all nodes respect bounds.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun isValidBST(root: TreeNode?): Boolean {\n    fun validate(node: TreeNode?, min: Long, max: Long): Boolean {\n        if (node == null) return true\n        if (node.val <= min || node.val >= max) return false\n        return validate(node.left, min, node.val.toLong()) &&\n               validate(node.right, node.val.toLong(), max)\n    }\n    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE)\n}",
        dart: "bool isValidBST(TreeNode? root) {\n  bool validate(TreeNode? node, int min, int max) {\n    if (node == null) return true;\n    if (node.val <= min || node.val >= max) return false;\n    return validate(node.left, min, node.val) &&\n           validate(node.right, node.val, max);\n  }\n  return validate(root, -2147483648, 2147483647);\n}",
        swift: "func isValidBST(_ root: TreeNode?) -> Bool {\n    func validate(_ node: TreeNode?, _ min: Int, _ max: Int) -> Bool {\n        guard let node = node else { return true }\n        if node.val <= min || node.val >= max { return false }\n        return validate(node.left, min, node.val) &&\n               validate(node.right, node.val, max)\n    }\n    return validate(root, Int.min, Int.max)\n}",
        haskell: "isValidBST :: Tree Int -> Bool\nisValidBST root = validate root minBound maxBound where\n  validate Empty _ _ = True\n  validate (Node l v r) minVal maxVal\n    | v <= minVal || v >= maxVal = False\n    | otherwise = validate l minVal v && validate r v maxVal"
      }
    },
    {
      id: 11,
      title: 'Recover Binary Search Tree',
      difficulty: 'hard',
      tags: ['tree', 'bst', 'in-order'],
      description: 'Two elements of a BST are swapped by mistake. Recover the tree without changing its structure.',
      examples: [
        {
          input: 'root = [1,3,null,null,2]',
          output: '[3,1,null,null,2]',
          explanation: 'Swap 1 and 3'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [2, 1000]'],
      hint: 'In-order traversal gives sorted order. Find the two elements that break the order.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun recoverTree(root: TreeNode?): Unit {\n    var prev: TreeNode? = null\n    var first: TreeNode? = null\n    var second: TreeNode? = null\n\n    fun inorder(node: TreeNode?) {\n        if (node == null) return\n        inorder(node.left)\n        if (prev != null && prev!!.val > node.val) {\n            if (first == null) {\n                first = prev\n                second = node\n            } else {\n                second = node\n            }\n        }\n        prev = node\n        inorder(node.right)\n    }\n\n    inorder(root)\n    if (first != null && second != null) {\n        val temp = first!!.val\n        first!!.val = second!!.val\n        second!!.val = temp\n    }\n}",
        dart: "void recoverTree(TreeNode? root) {\n  TreeNode? prev, first, second;\n\n  void inorder(TreeNode? node) {\n    if (node == null) return;\n    inorder(node.left);\n    if (prev != null && prev!.val > node.val) {\n      if (first == null) {\n        first = prev;\n        second = node;\n      } else {\n        second = node;\n      }\n    }\n    prev = node;\n    inorder(node.right);\n  }\n\n  inorder(root);\n  if (first != null && second != null) {\n    final temp = first!.val;\n    first!.val = second!.val;\n    second!.val = temp;\n  }\n}",
        swift: "func recoverTree(_ root: TreeNode?) {\n    var prev: TreeNode? = nil\n    var first: TreeNode? = nil\n    var second: TreeNode? = nil\n\n    func inorder(_ node: TreeNode?) {\n        guard let node = node else { return }\n        inorder(node.left)\n        if prev != nil && prev!.val > node.val {\n            if first == nil {\n                first = prev\n                second = node\n            } else {\n                second = node\n            }\n        }\n        prev = node\n        inorder(node.right)\n    }\n\n    inorder(root)\n    if let f = first, let s = second {\n        let temp = f.val\n        f.val = s.val\n        s.val = temp\n    }\n}",
        haskell: "recoverTree :: Tree Int -> Tree Int\nrecoverTree root =\n  let vals = inorder root\n      sorted = sort vals\n      swapIndices = findSwaps vals sorted\n  in replaceVals root swapIndices 0\n\n  where\n    inorder Empty = []\n    inorder (Node l v r) = inorder l ++ [v] ++ inorder r\n\n    findSwaps xs ys = [(i, j) | i <- [0..length xs-1], xs !! i /= ys !! i, j <- [i+1..length xs-1]]"
      }
    },
    {
      id: 12,
      title: 'Kth Smallest Element in a BST',
      difficulty: 'medium',
      tags: ['tree', 'bst', 'in-order'],
      description: 'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values in the tree.',
      examples: [
        {
          input: 'root = [3,1,4,null,2], k = 1',
          output: '1',
          explanation: 'In-order traversal: [1,2,3,4], 1st is 1'
        }
      ],
      constraints: ['The number of nodes in the tree is n', '1 <= k <= n <= 10^4'],
      hint: 'In-order traversal visits nodes in sorted order. Return the kth node visited.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun kthSmallest(root: TreeNode?, k: Int): Int {\n    var count = 0\n    var result = 0\n\n    fun inorder(node: TreeNode?) {\n        if (node == null) return\n        inorder(node.left)\n        count++\n        if (count == k) {\n            result = node.val\n            return\n        }\n        inorder(node.right)\n    }\n\n    inorder(root)\n    return result\n}",
        dart: "int kthSmallest(TreeNode? root, int k) {\n  int count = 0;\n  int result = 0;\n\n  void inorder(TreeNode? node) {\n    if (node == null) return;\n    inorder(node.left);\n    count++;\n    if (count == k) {\n      result = node.val;\n      return;\n    }\n    inorder(node.right);\n  }\n\n  inorder(root);\n  return result;\n}",
        swift: "func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {\n    var count = 0\n    var result = 0\n\n    func inorder(_ node: TreeNode?) {\n        guard let node = node else { return }\n        inorder(node.left)\n        count += 1\n        if count == k {\n            result = node.val\n            return\n        }\n        inorder(node.right)\n    }\n\n    inorder(root)\n    return result\n}",
        haskell: "kthSmallest :: Tree Int -> Int -> Int\nkthSmallest root k = inorder root !! (k - 1) where\n  inorder Empty = []\n  inorder (Node l v r) = inorder l ++ [v] ++ inorder r"
      }
    },
    {
      id: 13,
      title: 'Lowest Common Ancestor of a Binary Tree',
      difficulty: 'medium',
      tags: ['tree', 'dfs', 'lca'],
      description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.',
      examples: [
        {
          input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
          output: '3',
          explanation: 'LCA of 5 and 1 is 3'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [2, 10^5]'],
      hint: 'If both p and q are in left subtree, recurse left. If both in right, recurse right. Otherwise current node is LCA.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {\n    if (root == null || root == p || root == q) return root\n    val left = lowestCommonAncestor(root.left, p, q)\n    val right = lowestCommonAncestor(root.right, p, q)\n    return when {\n        left != null && right != null -> root\n        left != null -> left\n        else -> right\n    }\n}",
        dart: "TreeNode? lowestCommonAncestor(TreeNode? root, TreeNode? p, TreeNode? q) {\n  if (root == null || root == p || root == q) return root;\n  final left = lowestCommonAncestor(root?.left, p, q);\n  final right = lowestCommonAncestor(root?.right, p, q);\n  if (left != null && right != null) return root;\n  return left ?? right;\n}",
        swift: "func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {\n    guard let root = root else { return nil }\n    if root === p || root === q { return root }\n    let left = lowestCommonAncestor(root.left, p, q)\n    let right = lowestCommonAncestor(root.right, p, q)\n    if left != nil && right != nil { return root }\n    return left ?? right\n}",
        haskell: "lowestCommonAncestor :: Tree Int -> Int -> Int -> Maybe (Tree Int)\nlowestCommonAncestor Empty _ _ = Nothing\nlowestCommonAncestor (Node l v r) p q\n  | v == p || v == q = Just (Node l v r)\n  | otherwise = case (go l, go r) of\n      (Just x, Just y) -> Just (Node l v r)\n      (Just x, Nothing) -> Just x\n      (Nothing, Just y) -> Just y\n      (Nothing, Nothing) -> Nothing\n  where go = lowestCommonAncestor"
      }
    },
    {
      id: 14,
      title: 'Binary Tree Right Side View',
      difficulty: 'medium',
      tags: ['tree', 'bfs', 'level-order'],
      description: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see.',
      examples: [
        {
          input: 'root = [1,2,3,null,5,null,4]',
          output: '[1,3,4]',
          explanation: 'Rightmost node at each level: 1, 3, 4'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 100]'],
      hint: 'Level-order traversal. Add last node of each level to result.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w)',
      solutions: {
        kotlin: "fun rightSideView(root: TreeNode?): List<Int> {\n    val result = mutableListOf<Int>()\n    if (root == null) return result\n\n    val queue = mutableListOf<TreeNode>(root)\n    while (queue.isNotEmpty()) {\n        val levelSize = queue.size\n        for (i in 0 until levelSize) {\n            val node = queue.removeAt(0)\n            if (i == levelSize - 1) {\n                result.add(node.val)\n            }\n            if (node.left != null) queue.add(node.left!!)\n            if (node.right != null) queue.add(node.right!!)\n        }\n    }\n    return result\n}",
        dart: "List<int> rightSideView(TreeNode? root) {\n  final result = <int>[];\n  if (root == null) return result;\n\n  final queue = <TreeNode>[root];\n  while (queue.isNotEmpty) {\n    final levelSize = queue.length;\n    for (int i = 0; i < levelSize; i++) {\n      final node = queue.removeAt(0);\n      if (i == levelSize - 1) {\n        result.add(node.val);\n      }\n      if (node.left != null) queue.add(node.left!);\n      if (node.right != null) queue.add(node.right!);\n    }\n  }\n  return result;\n}",
        swift: "func rightSideView(_ root: TreeNode?) -> [Int] {\n    var result: [Int] = []\n    guard let root = root else { return result }\n\n    var queue: [TreeNode] = [root]\n    while !queue.isEmpty {\n        let levelSize = queue.count\n        for i in 0..<levelSize {\n            let node = queue.removeFirst()\n            if i == levelSize - 1 {\n                result.append(node.val)\n            }\n            if let left = node.left { queue.append(left) }\n            if let right = node.right { queue.append(right) }\n        }\n    }\n    return result\n}",
        haskell: "rightSideView :: Tree Int -> [Int]\nrightSideView root = map last (levels root) where\n  levels Empty = []\n  levels t = go [t] where\n    go [] = []\n    go nodes = map val nodes : go (concatMap children nodes)\n    children (Node l _ r) = [x | x <- [l, r], x /= Empty]\n    val (Node _ v _) = v"
      }
    },
    {
      id: 15,
      title: 'Count Complete Tree Nodes',
      difficulty: 'medium',
      tags: ['tree', 'binary-search', 'complete-tree'],
      description: 'Given the root of a complete binary tree, return the number of nodes. Do it in O(log^2 n) time.',
      examples: [
        {
          input: 'root = [1,2,3,4,5,6]',
          output: '6',
          explanation: 'Complete tree with 6 nodes'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 5 * 10^4]'],
      hint: 'Use properties of complete tree. Count nodes in left and right subtrees recursively.',
      timeComplexity: 'O(log^2 n)',
      spaceComplexity: 'O(log n)',
      solutions: {
        kotlin: "fun countNodes(root: TreeNode?): Int {\n    if (root == null) return 0\n\n    fun getHeight(node: TreeNode?, dir: Int): Int {\n        var current = node\n        var height = 0\n        while (current != null) {\n            height++\n            current = if (dir == 0) current.left else current.right\n        }\n        return height\n    }\n\n    val leftHeight = getHeight(root, 0)\n    val rightHeight = getHeight(root, 1)\n\n    return if (leftHeight == rightHeight) {\n        (1 shl leftHeight) - 1\n    } else {\n        1 + countNodes(root.left) + countNodes(root.right)\n    }\n}",
        dart: "int countNodes(TreeNode? root) {\n  if (root == null) return 0;\n\n  int getHeight(TreeNode? node, int dir) {\n    int height = 0;\n    var current = node;\n    while (current != null) {\n      height++;\n      current = dir == 0 ? current.left : current.right;\n    }\n    return height;\n  }\n\n  final leftHeight = getHeight(root, 0);\n  final rightHeight = getHeight(root, 1);\n\n  return leftHeight == rightHeight\n      ? (1 << leftHeight) - 1\n      : 1 + countNodes(root.left) + countNodes(root.right);\n}",
        swift: "func countNodes(_ root: TreeNode?) -> Int {\n    guard let root = root else { return 0 }\n\n    func getHeight(_ node: TreeNode?, _ dir: Int) -> Int {\n        var height = 0\n        var current = node\n        while current != nil {\n            height += 1\n            current = dir == 0 ? current?.left : current?.right\n        }\n        return height\n    }\n\n    let leftHeight = getHeight(root, 0)\n    let rightHeight = getHeight(root, 1)\n\n    return leftHeight == rightHeight\n        ? (1 << leftHeight) - 1\n        : 1 + countNodes(root.left) + countNodes(root.right)\n}",
        haskell: "countNodes :: Tree Int -> Int\ncountNodes Empty = 0\ncountNodes (Node l _ r) =\n  let lh = getHeight l 0\n      rh = getHeight r 0\n  in if lh == rh then (1 \\`shiftL\\` lh) - 1\n     else 1 + countNodes l + countNodes r\n  where\n    getHeight Empty _ = 0\n    getHeight (Node l' _ r') dir = 1 + (if dir == 0 then getHeight l' 0 else getHeight r' 0)"
      }
    },
    {
      id: 16,
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'hard',
      tags: ['tree', 'serialization', 'design'],
      description: 'Design an algorithm to serialize and deserialize a binary tree. Serialization is converting tree to string, deserialization is reconstructing tree from string.',
      examples: [
        {
          input: 'root = [1,2,3,null,null,4,5]',
          output: '[1,2,3,null,null,4,5]',
          explanation: 'Serialize and deserialize produce same tree'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 10^4]'],
      hint: 'Use pre-order traversal. Encode null pointers as special marker. Parse back using recursion or queue.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class Codec() {\n    fun serialize(root: TreeNode?): String {\n        val sb = StringBuilder()\n        fun preorder(node: TreeNode?) {\n            if (node == null) {\n                sb.append(\"null,\")\n                return\n            }\n            sb.append(node.val).append(\",\")\n            preorder(node.left)\n            preorder(node.right)\n        }\n        preorder(root)\n        return sb.toString()\n    }\n\n    fun deserialize(data: String): TreeNode? {\n        val tokens = data.split(\",\").filter { it.isNotEmpty() }.toMutableList()\n        var idx = 0\n        fun build(): TreeNode? {\n            if (idx >= tokens.size || tokens[idx] == \"null\") {\n                idx++\n                return null\n            }\n            val node = TreeNode(tokens[idx].toInt())\n            idx++\n            node.left = build()\n            node.right = build()\n            return node\n        }\n        return build()\n    }\n}",
        dart: "class Codec {\n  String serialize(TreeNode? root) {\n    final sb = StringBuffer();\n    void preorder(TreeNode? node) {\n      if (node == null) {\n        sb.write(\"null,\");\n        return;\n      }\n      sb.write(\"${node.val},\");\n      preorder(node.left);\n      preorder(node.right);\n    }\n    preorder(root);\n    return sb.toString();\n  }\n\n  TreeNode? deserialize(String data) {\n    final tokens = data.split(\",\").where((t) => t.isNotEmpty).toList();\n    int idx = 0;\n    TreeNode? build() {\n      if (idx >= tokens.length || tokens[idx] == \"null\") {\n        idx++;\n        return null;\n      }\n      final node = TreeNode(int.parse(tokens[idx]));\n      idx++;\n      node.left = build();\n      node.right = build();\n      return node;\n    }\n    return build();\n  }\n}",
        swift: "class Codec {\n    func serialize(_ root: TreeNode?) -> String {\n        var sb = \"\"\n        func preorder(_ node: TreeNode?) {\n            guard let node = node else {\n                sb += \"null,\"\n                return\n            }\n            sb += \"\\(node.val),\"\n            preorder(node.left)\n            preorder(node.right)\n        }\n        preorder(root)\n        return sb\n    }\n\n    func deserialize(_ data: String) -> TreeNode? {\n        var tokens = data.split(separator: \",\").map { String(\\$0) }.filter { \\$0 != \"\" }\n        var idx = 0\n        func build() -> TreeNode? {\n            if idx >= tokens.count || tokens[idx] == \"null\" {\n                idx += 1\n                return nil\n            }\n            let node = TreeNode(Int(tokens[idx])!)\n            idx += 1\n            node.left = build()\n            node.right = build()\n            return node\n        }\n        return build()\n    }\n}",
        haskell: "serialize :: Tree Int -> String\nserialize Empty = \"null \"\nserialize (Node l v r) = show v ++ \" \" ++ serialize l ++ serialize r\n\ndeserialize :: String -> Tree Int\ndeserialize s = fst (go (words s)) where\n  go (\"null\":rest) = (Empty, rest)\n  go (x:rest) = let (l, rest1) = go rest\n                    (r, rest2) = go rest1\n                in (Node l (read x) r, rest2)"
      }
    },
    {
      id: 17,
      title: 'Diameter of Binary Tree',
      difficulty: 'easy',
      tags: ['tree', 'dfs', 'recursion'],
      description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.',
      examples: [
        {
          input: 'root = [1,2,3,4,5]',
          output: '3',
          explanation: 'Diameter is 3 (path 4→2→1→3)'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [1, 10^4]'],
      hint: 'For each node, calculate depth of left and right subtrees. Diameter through node = left + right depth.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun diameterOfBinaryTree(root: TreeNode?): Int {\n    var diameter = 0\n\n    fun depth(node: TreeNode?): Int {\n        if (node == null) return 0\n        val left = depth(node.left)\n        val right = depth(node.right)\n        diameter = maxOf(diameter, left + right)\n        return 1 + maxOf(left, right)\n    }\n\n    depth(root)\n    return diameter\n}",
        dart: "int diameterOfBinaryTree(TreeNode? root) {\n  int diameter = 0;\n\n  int depth(TreeNode? node) {\n    if (node == null) return 0;\n    final left = depth(node.left);\n    final right = depth(node.right);\n    diameter = max(diameter, left + right);\n    return 1 + max(left, right);\n  }\n\n  depth(root);\n  return diameter;\n}",
        swift: "func diameterOfBinaryTree(_ root: TreeNode?) -> Int {\n    var diameter = 0\n\n    func depth(_ node: TreeNode?) -> Int {\n        guard let node = node else { return 0 }\n        let left = depth(node.left)\n        let right = depth(node.right)\n        diameter = max(diameter, left + right)\n        return 1 + max(left, right)\n    }\n\n    depth(root)\n    return diameter\n}",
        haskell: "diameterOfBinaryTree :: Tree Int -> Int\ndiameterOfBinaryTree root = fst (go root) where\n  go Empty = (0, 0)\n  go (Node l _ r) =\n    let (d1, h1) = go l\n        (d2, h2) = go r\n        diameter = max d1 (max d2 (h1 + h2))\n        height = 1 + max h1 h2\n    in (diameter, height)"
      }
    },
    {
      id: 18,
      title: 'Delete Node in a BST',
      difficulty: 'medium',
      tags: ['tree', 'bst', 'deletion'],
      description: 'Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference of the BST.',
      examples: [
        {
          input: 'root = [5,3,6,2,4,null,7], key = 3',
          output: '[5,4,6,2,null,null,7]',
          explanation: 'Delete node 3, promote its successor'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [0, 10^4]', 'The values in the tree are unique'],
      hint: 'Consider three cases: leaf node, one child, two children. For two children, find successor.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(h)',
      solutions: {
        kotlin: "fun deleteNode(root: TreeNode?, key: Int): TreeNode? {\n    if (root == null) return null\n    when {\n        key < root.val -> root.left = deleteNode(root.left, key)\n        key > root.val -> root.right = deleteNode(root.right, key)\n        else -> {\n            if (root.left == null) return root.right\n            if (root.right == null) return root.left\n            var minLarger = root.right\n            while (minLarger?.left != null) {\n                minLarger = minLarger.left\n            }\n            root.val = minLarger!!.val\n            root.right = deleteNode(root.right, minLarger.val)\n        }\n    }\n    return root\n}",
        dart: "TreeNode? deleteNode(TreeNode? root, int key) {\n  if (root == null) return null;\n  if (key < root.val) {\n    root.left = deleteNode(root.left, key);\n  } else if (key > root.val) {\n    root.right = deleteNode(root.right, key);\n  } else {\n    if (root.left == null) return root.right;\n    if (root.right == null) return root.left;\n    var minLarger = root.right;\n    while (minLarger?.left != null) {\n      minLarger = minLarger.left;\n    }\n    root.val = minLarger!.val;\n    root.right = deleteNode(root.right, minLarger.val);\n  }\n  return root;\n}",
        swift: "func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {\n    guard let root = root else { return nil }\n    if key < root.val {\n        root.left = deleteNode(root.left, key)\n    } else if key > root.val {\n        root.right = deleteNode(root.right, key)\n    } else {\n        if root.left == nil { return root.right }\n        if root.right == nil { return root.left }\n        var minLarger = root.right\n        while minLarger?.left != nil {\n            minLarger = minLarger?.left\n        }\n        root.val = minLarger!.val\n        root.right = deleteNode(root.right, minLarger!.val)\n    }\n    return root\n}",
        haskell: "deleteNode :: Tree Int -> Int -> Tree Int\ndeleteNode Empty _ = Empty\ndeleteNode (Node l v r) key\n  | key < v = Node (deleteNode l key) v r\n  | key > v = Node l v (deleteNode r key)\n  | otherwise = case (l, r) of\n      (Empty, _) -> r\n      (_, Empty) -> l\n      (_, _) -> let successor = findMin r\n               in Node l successor (deleteNode r successor)\n\nfindMin (Node Empty v _) = v\nfindMin (Node l _ _) = findMin l"
      }
    },
    {
      id: 19,
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      difficulty: 'medium',
      tags: ['tree', 'recursion', 'hash-table'],
      description: 'Given two integer arrays preorder and inorder, construct and return the binary tree.',
      examples: [
        {
          input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
          output: '[3,9,20,null,null,15,7]',
          explanation: 'Reconstruct tree from traversals'
        }
      ],
      constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length'],
      hint: 'First element of preorder is root. Find it in inorder to split into left/right subtrees.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {\n    val inMap = inorder.withIndex().associate { it.value to it.index }\n    var preIdx = 0\n\n    fun build(inLeft: Int, inRight: Int): TreeNode? {\n        if (inLeft > inRight) return null\n        val val = preorder[preIdx++]\n        val node = TreeNode(val)\n        val inIdx = inMap[val]!!\n        node.left = build(inLeft, inIdx - 1)\n        node.right = build(inIdx + 1, inRight)\n        return node\n    }\n\n    return build(0, inorder.size - 1)\n}",
        dart: "TreeNode? buildTree(List<int> preorder, List<int> inorder) {\n  final inMap = {for (int i = 0; i < inorder.length; i++) inorder[i]: i};\n  int preIdx = 0;\n\n  TreeNode? build(int inLeft, int inRight) {\n    if (inLeft > inRight) return null;\n    final val = preorder[preIdx++];\n    final node = TreeNode(val);\n    final inIdx = inMap[val]!;\n    node.left = build(inLeft, inIdx - 1);\n    node.right = build(inIdx + 1, inRight);\n    return node;\n  }\n\n  return build(0, inorder.length - 1);\n}",
        swift: "func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {\n    var inMap: [Int: Int] = [:]\n    for (i, v) in inorder.enumerated() {\n        inMap[v] = i\n    }\n    var preIdx = 0\n\n    func build(_ inLeft: Int, _ inRight: Int) -> TreeNode? {\n        if inLeft > inRight { return nil }\n        let val = preorder[preIdx]\n        preIdx += 1\n        let node = TreeNode(val)\n        let inIdx = inMap[val]!\n        node.left = build(inLeft, inIdx - 1)\n        node.right = build(inIdx + 1, inRight)\n        return node\n    }\n\n    return build(0, inorder.count - 1)\n}",
        haskell: "buildTree :: [Int] -> [Int] -> Tree Int\nbuildTree [] [] = Empty\nbuildTree (p:ps) inorder =\n  let (inL, v:inR) = span (/= p) inorder\n      lenL = length inL\n      (preL, preR) = splitAt lenL ps\n  in Node (buildTree preL inL) p (buildTree preR inR)"
      }
    },
    {
      id: 20,
      title: 'Vertical Order Traversal of a Binary Tree',
      difficulty: 'hard',
      tags: ['tree', 'traversal', 'hash-table'],
      description: 'Given the root of a binary tree, calculate the vertical order traversal of the tree.',
      examples: [
        {
          input: 'root = [3,9,20,null,null,15,7]',
          output: '[[9],[3,15],[20],[7]]',
          explanation: 'Column -1: [9], Column 0: [3,15], Column 1: [20], Column 2: [7]'
        }
      ],
      constraints: ['The number of nodes in the tree is in the range [1, 1000]'],
      hint: 'Track column offset from root. Use BFS with (node, column) pairs.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun verticalOrder(root: TreeNode?): List<List<Int>> {\n    if (root == null) return emptyList()\n    val colMap = mutableMapOf<Int, MutableList<Int>>()\n    val queue = mutableListOf<Pair<TreeNode, Int>>(root to 0)\n\n    while (queue.isNotEmpty()) {\n        val (node, col) = queue.removeAt(0)\n        colMap.computeIfAbsent(col) { mutableListOf() }.add(node.val)\n        if (node.left != null) queue.add(node.left!! to col - 1)\n        if (node.right != null) queue.add(node.right!! to col + 1)\n    }\n\n    return colMap.toSortedMap().values.toList()\n}",
        dart: "List<List<int>> verticalOrder(TreeNode? root) {\n  if (root == null) return [];\n  final colMap = <int, List<int>>{};\n  final queue = <(TreeNode, int)>[(root, 0)];\n\n  while (queue.isNotEmpty) {\n    final (node, col) = queue.removeAt(0);\n    colMap.update(col, (v) => [...v, node.val], ifAbsent: () => [node.val]);\n    if (node.left != null) queue.add((node.left!, col - 1));\n    if (node.right != null) queue.add((node.right!, col + 1));\n  }\n\n  final sorted = colMap.keys.toList()..sort();\n  return [for (final col in sorted) colMap[col]!];\n}",
        swift: "func verticalOrder(_ root: TreeNode?) -> [[Int]] {\n    guard let root = root else { return [] }\n    var colMap: [Int: [Int]] = [:]\n    var queue: [(TreeNode, Int)] = [(root, 0)]\n\n    while !queue.isEmpty {\n        let (node, col) = queue.removeFirst()\n        colMap[col, default: []].append(node.val)\n        if let left = node.left { queue.append((left, col - 1)) }\n        if let right = node.right { queue.append((right, col + 1)) }\n    }\n\n    return colMap.keys.sorted().map { colMap[\\$0]! }\n}",
        haskell: "verticalOrder :: Tree Int -> [[Int]]\nverticalOrder root = go [(root, 0)] Map.empty where\n  go [] colMap = [vals | (_, vals) <- sortBy (comparing fst) (Map.toList colMap)]\n  go ((Empty, _):rest) colMap = go rest colMap\n  go ((Node l v r, col):rest) colMap =\n    let colMap' = Map.insertWith (++) col [v] colMap\n    in go (rest ++ [(l, col-1), (r, col+1)]) colMap'"
      }
    }
  ]
}
