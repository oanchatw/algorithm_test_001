export default {
  id: 8,
  year: 1,
  slug: 'stacks-queues',
  icon: '📚',
  color: '#f0883e',
  title: 'Stacks & Queues',
  subtitle: 'LIFO, FIFO, Monotone Structures',
  description: 'Explore fundamental data structures and their applications. Master stack-based patterns like parentheses matching and monotone stacks, queue implementations, and amortized analysis techniques.',
  theorems: [
    {
      id: 'stack-lifo-correctness',
      name: 'Stack LIFO Correctness',
      katex_statement: '\\text{If } x \\text{ is pushed before } y, \\text{ then } x \\text{ is popped after } y',
      statement_text: 'For any two elements x and y where x is pushed before y onto a stack, x must be popped after y or not popped at all.',
      proof: `Proof by contradiction: Assume x is popped before y. Let t_push(x) < t_push(y) < t_pop(x) < t_pop(y). When x is popped at time t_pop(x), the stack must have x at the top. But y was pushed after x and before x was popped, so y must be above x in the stack. Therefore x cannot be at the top, contradicting the pop operation. Thus our assumption is false, and x must be popped after y (or remain on stack). This invariant is maintained because each pop operation removes only the top element, preserving LIFO ordering.`,
      cases: [
        {
          name: 'Both elements popped',
          description: 'x is popped after y, maintaining LIFO order'
        },
        {
          name: 'y is popped, x remains',
          description: 'y can be popped while x is still on stack'
        },
        {
          name: 'Neither is popped',
          description: 'Both remain on stack in correct order'
        }
      ]
    },
    {
      id: 'monotone-stack-invariant',
      name: 'Monotone Stack Invariant for Next Greater Element',
      katex_statement: '\\text{If stack contains indices } i_1 < i_2 < \\cdots < i_k, \\text{ then } arr[i_1] < arr[i_2] < \\cdots < arr[i_k]',
      statement_text: 'A monotone increasing stack maintains the invariant that values are in strictly increasing order from bottom to top, ensuring that when an element is greater than the stack top, it is the next greater element.',
      proof: `Induction on stack operations:
Base case: Empty stack trivially satisfies invariant.
Inductive step: Assume stack maintains monotone invariant before processing element arr[i].
- While arr[i] > top of stack: pop elements (only smaller elements are removed, maintaining order).
- Push arr[i]: now arr[i] is the new top.
- For all remaining elements in stack with indices j < i: arr[j] was not popped, so arr[j] >= arr[i].
- Combined with inductive hypothesis: remaining stack elements are in increasing order and arr[i] is >= all of them.
- Thus stack remains monotone increasing.
By induction, the invariant holds throughout all operations. When arr[i] pops elements, arr[i] becomes the next greater element for all popped indices because arr[i] > popped values and arr[i] comes after them in the array.`,
      cases: [
        {
          name: 'Element greater than stack top',
          description: 'Pop smaller elements and assign current element as their next greater'
        },
        {
          name: 'Element less than stack top',
          description: 'Push element directly, maintaining monotone property'
        }
      ]
    },
    {
      id: 'queue-two-stacks-amortized',
      name: 'Amortized O(1) Queue Operations via Two Stacks',
      katex_statement: 'T_{\\text{amortized}}(n) = O(1) \\text{ for } n \\text{ queue operations using two stacks}',
      statement_text: 'Using two stacks (inStack for push, outStack for pop), each element is transferred between stacks at most once, resulting in O(1) amortized cost per operation.',
      proof: `Amortized analysis using the accounting method:
- Assign cost: 1 unit for push, 1 unit for pop.
- Total cost for n operations: O(n).
Consider element flow:
- Each element is pushed once: 1 unit cost.
- Each element is transferred from inStack to outStack: counted as 1 unit of "prep" work during pushes.
- Each element is popped once: 1 unit cost.
- Total cost per element: at most 2 units (push + transfer).
- Total cost for n operations: 2n units = O(n).
Average cost per operation: O(n)/n = O(1).

Key insight: When outStack is empty and we need to pop, we transfer all elements from inStack to outStack. This expensive operation (O(k) where k = size of inStack) happens rarely. Using amortized analysis, we "bank" credit during cheap push operations (O(1)) to pay for expensive transfer operations. Over n operations, the average cost is O(1) per operation even though individual operations may cost O(k).`,
      cases: [
        {
          name: 'Push operation',
          description: 'Cost 1 unit, push to inStack'
        },
        {
          name: 'Pop from full outStack',
          description: 'Cost 1 unit, pop from outStack'
        },
        {
          name: 'Transfer from inStack',
          description: 'Expensive operation (O(k)) but amortized to O(1) per element'
        }
      ]
    }
  ],
  problems: [
    {
      id: 1,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      tags: ['stack', 'string', 'validation'],
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: (1) Open brackets must be closed by the same type of brackets, (2) Open brackets must be closed in the correct order.',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'Simple matching pair of parentheses'
        },
        {
          input: 's = "([{}])"',
          output: 'true',
          explanation: 'All brackets are properly nested and matched'
        },
        {
          input: 's = "([)]"',
          output: 'false',
          explanation: 'Square and round brackets are interleaved, not properly nested'
        }
      ],
      constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only'],
      hint: 'Use a stack. For each opening bracket, push it. For each closing bracket, check if it matches the top of the stack.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun isValid(s: String): Boolean {\n    val stack = mutableListOf<Char>()\n    val pairs = mapOf(')' to '(', '}' to '{', ']' to '[')\n\n    for (char in s) {\n        if (char in pairs) {\n            if (stack.isEmpty() || stack.last() != pairs[char]) {\n                return false\n            }\n            stack.removeAt(stack.lastIndex)\n        } else {\n            stack.add(char)\n        }\n    }\n    return stack.isEmpty()\n}",
        dart: "bool isValid(String s) {\n  final stack = <String>[];\n  final pairs = {')': '(', '}': '{', ']': '['};\n\n  for (final char in s.split('')) {\n    if (pairs.containsKey(char)) {\n      if (stack.isEmpty || stack.last != pairs[char]) {\n        return false;\n      }\n      stack.removeLast();\n    } else {\n      stack.add(char);\n    }\n  }\n  return stack.isEmpty;\n}",
        swift: "func isValid(_ s: String) -> Bool {\n    var stack: [Character] = []\n    let pairs: [Character: Character] = [')': '(', '}': '{', ']': '[']\n\n    for char in s {\n        if let opening = pairs[char] {\n            if stack.isEmpty || stack.removeLast() != opening {\n                return false\n            }\n        } else {\n            stack.append(char)\n        }\n    }\n    return stack.isEmpty\n}",
        haskell: "import Data.Maybe (isJust)\n\nisValid :: String -> Bool\nisValid s = go s [] where\n  go [] stack = null stack\n  go (c:cs) stack\n    | c \\`elem\\` \"([{\" = go cs (c:stack)\n    | c == ')' = (not (null stack) && head stack == '(') && go cs (tail stack)\n    | c == ']' = (not (null stack) && head stack == '[') && go cs (tail stack)\n    | c == '}' = (not (null stack) && head stack == '{') && go cs (tail stack)\n    | otherwise = False"
      }
    },
    {
      id: 2,
      title: 'Min Stack',
      difficulty: 'easy',
      tags: ['stack', 'design', 'optimization'],
      description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class.',
      examples: [
        {
          input: `["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]`,
          output: '[null,null,null,null,-3,null,0,-2]',
          explanation: 'getMin returns -3, after pop it returns -2'
        }
      ],
      constraints: ['At most 3 * 10^4 calls to push, pop, top, and getMin'],
      hint: 'Use two stacks: one for values and one for tracking minimums at each level.',
      timeComplexity: 'O(1) for all operations',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MinStack() {\n    private val stack = mutableListOf<Int>()\n    private val minStack = mutableListOf<Int>()\n\n    fun push(x: Int) {\n        stack.add(x)\n        val currentMin = if (minStack.isEmpty()) x else minOf(minStack.last(), x)\n        minStack.add(currentMin)\n    }\n\n    fun pop() {\n        stack.removeAt(stack.lastIndex)\n        minStack.removeAt(minStack.lastIndex)\n    }\n\n    fun top(): Int = stack.last()\n\n    fun getMin(): Int = minStack.last()\n}",
        dart: "class MinStack {\n  final _stack = <int>[];\n  final _minStack = <int>[];\n\n  void push(int x) {\n    _stack.add(x);\n    final minVal = _minStack.isEmpty ? x : (_minStack.last < x ? _minStack.last : x);\n    _minStack.add(minVal);\n  }\n\n  void pop() {\n    _stack.removeLast();\n    _minStack.removeLast();\n  }\n\n  int top() => _stack.last;\n\n  int getMin() => _minStack.last;\n}",
        swift: "class MinStack {\n    private var stack: [Int] = []\n    private var minStack: [Int] = []\n\n    func push(_ val: Int) {\n        stack.append(val)\n        let minVal = minStack.isEmpty ? val : min(minStack.last!, val)\n        minStack.append(minVal)\n    }\n\n    func pop() {\n        stack.removeLast()\n        minStack.removeLast()\n    }\n\n    func top() -> Int {\n        return stack.last!\n    }\n\n    func getMin() -> Int {\n        return minStack.last!\n    }\n}",
        haskell: "data MinStack = MinStack [Int] [Int]\n\npush :: MinStack -> Int -> MinStack\npush (MinStack stack minStack) x =\n  let newMin = if null minStack then x else min (head minStack) x\n  in MinStack (x:stack) (newMin:minStack)\n\npop :: MinStack -> MinStack\npop (MinStack stack minStack) = MinStack (tail stack) (tail minStack)\n\ntop :: MinStack -> Int\ntop (MinStack stack _) = head stack\n\ngetMin :: MinStack -> Int\ngetMin (MinStack _ minStack) = head minStack"
      }
    },
    {
      id: 3,
      title: 'Implement Stack using Queues',
      difficulty: 'easy',
      tags: ['stack', 'queue', 'design'],
      description: 'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all functions of a normal stack (push, pop, top, empty).',
      examples: [
        {
          input: `["MyStack","push","push","top","pop","empty"]
[[],[1],[2],[],[],[]]`,
          output: '[null,null,null,2,2,false]',
          explanation: 'top returns 2, pop returns 2'
        }
      ],
      constraints: ['1 <= x <= 9', 'At most 100 calls to push, pop, top, and empty'],
      hint: 'Use one primary queue and one auxiliary queue. On each push, transfer elements to maintain LIFO order.',
      timeComplexity: 'O(n) for push, O(1) for pop',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MyStack() {\n    private val q1 = mutableListOf<Int>()\n    private val q2 = mutableListOf<Int>()\n\n    fun push(x: Int) {\n        q2.add(x)\n        while (q1.isNotEmpty()) {\n            q2.add(q1.removeAt(0))\n        }\n        val temp = q1\n        q1.addAll(q2)\n        q2.clear()\n    }\n\n    fun pop(): Int = q1.removeAt(0)\n\n    fun top(): Int = q1[0]\n\n    fun empty(): Boolean = q1.isEmpty()\n}",
        dart: "class MyStack {\n  final _q1 = <int>[];\n  final _q2 = <int>[];\n\n  void push(int x) {\n    _q2.add(x);\n    while (_q1.isNotEmpty) {\n      _q2.add(_q1.removeAt(0));\n    }\n    _q1.addAll(_q2);\n    _q2.clear();\n  }\n\n  int pop() => _q1.removeAt(0);\n\n  int top() => _q1.first;\n\n  bool empty() => _q1.isEmpty;\n}",
        swift: "class MyStack {\n    private var q1: [Int] = []\n    private var q2: [Int] = []\n\n    func push(_ x: Int) {\n        q2.append(x)\n        while !q1.isEmpty {\n            q2.append(q1.removeFirst())\n        }\n        q1 = q2\n        q2 = []\n    }\n\n    func pop() -> Int {\n        return q1.removeFirst()\n    }\n\n    func top() -> Int {\n        return q1.first!\n    }\n\n    func empty() -> Bool {\n        return q1.isEmpty\n    }\n}",
        haskell: "import qualified Data.Sequence as Seq\n\ndata MyStack = MyStack (Seq.Seq Int) (Seq.Seq Int)\n\npush :: MyStack -> Int -> MyStack\npush (MyStack q1 q2) x =\n  let q2' = Seq.singleton x Seq.>< q1\n      q1' = q2'\n  in MyStack q1' Seq.empty\n\npop :: MyStack -> (Int, MyStack)\npop (MyStack q1 q2) = (Seq.index q1 0, MyStack (Seq.drop 1 q1) q2)\n\ntop :: MyStack -> Int\ntop (MyStack q1 _) = Seq.index q1 0\n\nempty :: MyStack -> Bool\nempty (MyStack q1 _) = Seq.null q1"
      }
    },
    {
      id: 4,
      title: 'Implement Queue using Stacks',
      difficulty: 'easy',
      tags: ['queue', 'stack', 'design'],
      description: 'Implement a first-in-first-out (FIFO) queue using only two stacks. The queue should support push, pop, peek, and empty operations.',
      examples: [
        {
          input: `["MyQueue","push","push","peek","pop","empty"]
[[],[1],[2],[],[],[]]`,
          output: '[null,null,null,1,1,false]',
          explanation: 'peek returns 1 (front), pop returns 1'
        }
      ],
      constraints: ['1 <= x <= 9', 'At most 100 calls to push, pop, peek, and empty'],
      hint: 'Use two stacks: inStack for pushes, outStack for pops. Transfer when outStack is empty.',
      timeComplexity: 'O(1) amortized',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class MyQueue() {\n    private val inStack = mutableListOf<Int>()\n    private val outStack = mutableListOf<Int>()\n\n    fun push(x: Int) {\n        inStack.add(x)\n    }\n\n    fun pop(): Int {\n        peek()\n        return outStack.removeAt(outStack.lastIndex)\n    }\n\n    fun peek(): Int {\n        if (outStack.isEmpty()) {\n            while (inStack.isNotEmpty()) {\n                outStack.add(inStack.removeAt(inStack.lastIndex))\n            }\n        }\n        return outStack.last()\n    }\n\n    fun empty(): Boolean = inStack.isEmpty() && outStack.isEmpty()\n}",
        dart: "class MyQueue {\n  final _inStack = <int>[];\n  final _outStack = <int>[];\n\n  void push(int x) {\n    _inStack.add(x);\n  }\n\n  int pop() {\n    peek();\n    return _outStack.removeLast();\n  }\n\n  int peek() {\n    if (_outStack.isEmpty) {\n      while (_inStack.isNotEmpty) {\n        _outStack.add(_inStack.removeLast());\n      }\n    }\n    return _outStack.last;\n  }\n\n  bool empty() => _inStack.isEmpty && _outStack.isEmpty;\n}",
        swift: "class MyQueue {\n    private var inStack: [Int] = []\n    private var outStack: [Int] = []\n\n    func push(_ x: Int) {\n        inStack.append(x)\n    }\n\n    func pop() -> Int {\n        _ = peek()\n        return outStack.removeLast()\n    }\n\n    func peek() -> Int {\n        if outStack.isEmpty {\n            while !inStack.isEmpty {\n                outStack.append(inStack.removeLast())\n            }\n        }\n        return outStack.last!\n    }\n\n    func empty() -> Bool {\n        return inStack.isEmpty && outStack.isEmpty\n    }\n}",
        haskell: "data MyQueue = MyQueue [Int] [Int]\n\npush :: MyQueue -> Int -> MyQueue\npush (MyQueue inS outS) x = MyQueue (x:inS) outS\n\npop :: MyQueue -> (Int, MyQueue)\npop (MyQueue inS outS) =\n  let (val, q) = peek (MyQueue inS outS)\n  in (val, case q of MyQueue i o -> MyQueue i (tail o))\n\npeek :: MyQueue -> (Int, MyQueue)\npeek (MyQueue inS outS)\n  | null outS = (head inS', MyQueue [] inS')\n  | otherwise = (head outS, MyQueue inS outS)\n  where inS' = reverse inS ++ outS\n\nempty :: MyQueue -> Bool\nempty (MyQueue inS outS) = null inS && null outS"
      }
    },
    {
      id: 5,
      title: 'Next Greater Element I',
      difficulty: 'easy',
      tags: ['stack', 'array', 'monotone-stack'],
      description: 'The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2, return an array of the same length as nums1 where answer[i] is the next greater element in nums2 that is to the right of nums1[i].',
      examples: [
        {
          input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]',
          output: '[-1,3,-1]',
          explanation: 'For 4: no greater element, for 1: 3 is greater, for 2: no greater element'
        },
        {
          input: 'nums1 = [2,4], nums2 = [1,2,3,4]',
          output: '[3,-1]',
          explanation: 'For 2: 3 is next greater, for 4: no greater element'
        }
      ],
      constraints: ['1 <= nums1.length <= nums2.length <= 1000'],
      hint: 'Use a monotone stack on nums2 to find next greater element, then map results to nums1.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun nextGreaterElement(nums1: IntArray, nums2: IntArray): IntArray {\n    val result = IntArray(nums1.size) { -1 }\n    val stack = mutableListOf<Int>()\n    val map = mutableMapOf<Int, Int>()\n\n    for (num in nums2) {\n        while (stack.isNotEmpty() && stack.last() < num) {\n            map[stack.removeAt(stack.lastIndex)] = num\n        }\n        stack.add(num)\n    }\n\n    for (i in nums1.indices) {\n        result[i] = map[nums1[i]] ?: -1\n    }\n    return result\n}",
        dart: "List<int> nextGreaterElement(List<int> nums1, List<int> nums2) {\n  final result = List<int>.filled(nums1.length, -1);\n  final stack = <int>[];\n  final map = <int, int>{};\n\n  for (final num in nums2) {\n    while (stack.isNotEmpty && stack.last < num) {\n      map[stack.removeLast()] = num;\n    }\n    stack.add(num);\n  }\n\n  for (int i = 0; i < nums1.length; i++) {\n    result[i] = map[nums1[i]] ?? -1;\n  }\n  return result;\n}",
        swift: "func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {\n    var result = Array(repeating: -1, count: nums1.count)\n    var stack: [Int] = []\n    var map: [Int: Int] = [:]\n\n    for num in nums2 {\n        while !stack.isEmpty && stack.last! < num {\n            map[stack.removeLast()] = num\n        }\n        stack.append(num)\n    }\n\n    for i in 0..<nums1.count {\n        result[i] = map[nums1[i]] ?? -1\n    }\n    return result\n}",
        haskell: "import qualified Data.Map as M\n\nnextGreaterElement :: [Int] -> [Int] -> [Int]\nnextGreaterElement nums1 nums2 = map findNext nums1 where\n  findNext n = case M.lookup n mp of\n    Just v -> v\n    Nothing -> -1\n  mp = go nums2 [] M.empty\n\n  go [] _ m = m\n  go (x:xs) st m =\n    let (st', m') = processStack x st m\n    in go xs (x:st') m'\n\n  processStack x [] m = ([], m)\n  processStack x (top:rest) m\n    | top < x = let (st', m') = processStack x rest (M.insert top x m)\n               in (st', m')\n    | otherwise = (top:rest, m)"
      }
    },
    {
      id: 6,
      title: 'Baseball Game',
      difficulty: 'easy',
      tags: ['stack', 'simulation'],
      description: 'You are keeping track of scores in a baseball game using a stack. Process operations: integers add to score, "+" sums last two scores, "D" doubles last score, "C" removes last score.',
      examples: [
        {
          input: 'ops = ["5","2","C","D","+"]',
          output: '30',
          explanation: '5, 2, 2 cancelled, 4 (doubled), 6 (sum) = 5+2+4+6+6=23? No: 5, 4, 6, 8 then 5+4+6+8=23. Actually: 5, 2->cancel, 4(2*2), 6(4+2), total=5+4+6=15? Let me recalculate: push 5, push 2, cancel 2, push 4, push 6 -> total 5+4+6=15'
        },
        {
          input: 'ops = ["5","-2","4","C","D","9","+","+"]',
          output: '27',
          explanation: 'Process in order maintaining stack'
        }
      ],
      constraints: ['1 <= ops.length <= 1000', 'ops[i] is an integer string or operator'],
      hint: 'Use a stack to track valid scores. For C, D, + manipulate the stack accordingly.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun calPoints(ops: Array<String>): Int {\n    val stack = mutableListOf<Int>()\n\n    for (op in ops) {\n        when (op) {\n            \"C\" -> stack.removeAt(stack.lastIndex)\n            \"D\" -> stack.add(stack.last() * 2)\n            \"+\" -> stack.add(stack[stack.lastIndex] + stack[stack.lastIndex - 1])\n            else -> stack.add(op.toInt())\n        }\n    }\n    return stack.sum()\n}",
        dart: "int calPoints(List<String> ops) {\n  final stack = <int>[];\n\n  for (final op in ops) {\n    if (op == \"C\") {\n      stack.removeLast();\n    } else if (op == \"D\") {\n      stack.add(stack.last * 2);\n    } else if (op == \"+\") {\n      stack.add(stack[stack.length - 1] + stack[stack.length - 2]);\n    } else {\n      stack.add(int.parse(op));\n    }\n  }\n  return stack.fold(0, (a, b) => a + b);\n}",
        swift: "func calPoints(_ ops: [String]) -> Int {\n    var stack: [Int] = []\n\n    for op in ops {\n        switch op {\n        case \"C\":\n            stack.removeLast()\n        case \"D\":\n            stack.append(stack.last! * 2)\n        case \"+\":\n            stack.append(stack[stack.count - 1] + stack[stack.count - 2])\n        default:\n            stack.append(Int(op)!)\n        }\n    }\n    return stack.reduce(0, +)\n}",
        haskell: "calPoints :: [String] -> Int\ncalPoints ops = sum (go ops []) where\n  go [] stack = stack\n  go (x:xs) stack\n    | x == \"C\" = go xs (tail stack)\n    | x == \"D\" = go xs (head stack * 2 : stack)\n    | x == \"+\" = go xs (head stack + head (tail stack) : stack)\n    | otherwise = go xs (read x : stack)"
      }
    },
    {
      id: 7,
      title: 'Daily Temperatures',
      difficulty: 'medium',
      tags: ['stack', 'array', 'monotone-stack'],
      description: 'Given an array of integers temperatures representing daily temperatures, return an array answer where answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature.',
      examples: [
        {
          input: 'temperatures = [73,74,75,71,69,72,76,73]',
          output: '[1,1,4,2,1,1,0,0]',
          explanation: 'On day 0 (73°), wait 1 day for 74. On day 1 (74°), wait 1 day for 75, etc.'
        },
        {
          input: 'temperatures = [30,40,50,60]',
          output: '[1,1,1,0]',
          explanation: 'Monotone increasing, each day wait 1 for next warmer'
        }
      ],
      constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
      hint: 'Use monotone decreasing stack to store indices. Pop when finding a warmer day.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun dailyTemperatures(temperatures: IntArray): IntArray {\n    val result = IntArray(temperatures.size)\n    val stack = mutableListOf<Int>()\n\n    for (i in temperatures.indices) {\n        while (stack.isNotEmpty() && temperatures[stack.last()] < temperatures[i]) {\n            val idx = stack.removeAt(stack.lastIndex)\n            result[idx] = i - idx\n        }\n        stack.add(i)\n    }\n    return result\n}",
        dart: "List<int> dailyTemperatures(List<int> temperatures) {\n  final result = List<int>.filled(temperatures.length, 0);\n  final stack = <int>[];\n\n  for (int i = 0; i < temperatures.length; i++) {\n    while (stack.isNotEmpty && temperatures[stack.last] < temperatures[i]) {\n      final idx = stack.removeLast();\n      result[idx] = i - idx;\n    }\n    stack.add(i);\n  }\n  return result;\n}",
        swift: "func dailyTemperatures(_ temperatures: [Int]) -> [Int] {\n    var result = Array(repeating: 0, count: temperatures.count)\n    var stack: [Int] = []\n\n    for i in 0..<temperatures.count {\n        while !stack.isEmpty && temperatures[stack.last!] < temperatures[i] {\n            let idx = stack.removeLast()\n            result[idx] = i - idx\n        }\n        stack.append(i)\n    }\n    return result\n}",
        haskell: "dailyTemperatures :: [Int] -> [Int]\ndailyTemperatures temps =\n  let n = length temps\n      result = replicate n 0\n  in fst (go temps [0..n-1] result []) where\n    go [] _ res _ = (res, [])\n    go (t:ts) (i:is) res st =\n      let (st', res') = processStack t i st res\n      in let (finalRes, _) = go ts is res' (i:st')\n         in (finalRes, [])"
      }
    },
    {
      id: 8,
      title: 'Evaluate Reverse Polish Notation',
      difficulty: 'medium',
      tags: ['stack', 'math'],
      description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Each operand may be an integer or another expression.',
      examples: [
        {
          input: 'tokens = ["2","1","+","3","*"]',
          output: '9',
          explanation: '((2 + 1) * 3) = 9'
        },
        {
          input: 'tokens = ["4","13","5","/","+"]',
          output: '6',
          explanation: '(4 + (13 / 5)) = 6'
        }
      ],
      constraints: ['1 <= tokens.length <= 10^4', 'Valid RPN expression'],
      hint: 'Push operands, pop two when seeing operator, compute and push result back.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun evalRPN(tokens: Array<String>): Int {\n    val stack = mutableListOf<Int>()\n\n    for (token in tokens) {\n        if (token in setOf(\"+\", \"-\", \"*\", \"/\")) {\n            val b = stack.removeAt(stack.lastIndex)\n            val a = stack.removeAt(stack.lastIndex)\n            val result = when (token) {\n                \"+\" -> a + b\n                \"-\" -> a - b\n                \"*\" -> a * b\n                else -> a / b\n            }\n            stack.add(result)\n        } else {\n            stack.add(token.toInt())\n        }\n    }\n    return stack.last()\n}",
        dart: "int evalRPN(List<String> tokens) {\n  final stack = <int>[];\n  final ops = {\"+\", \"-\", \"*\", \"/\"};\n\n  for (final token in tokens) {\n    if (ops.contains(token)) {\n      final b = stack.removeLast();\n      final a = stack.removeLast();\n      final result = token == \"+\" ? a + b\n                   : token == \"-\" ? a - b\n                   : token == \"*\" ? a * b\n                   : a ~/ b;\n      stack.add(result);\n    } else {\n      stack.add(int.parse(token));\n    }\n  }\n  return stack.last;\n}",
        swift: "func evalRPN(_ tokens: [String]) -> Int {\n    var stack: [Int] = []\n\n    for token in tokens {\n        if token == \"+\" || token == \"-\" || token == \"*\" || token == \"/\" {\n            let b = stack.removeLast()\n            let a = stack.removeLast()\n            let result: Int\n            switch token {\n            case \"+\": result = a + b\n            case \"-\": result = a - b\n            case \"*\": result = a * b\n            default: result = a / b\n            }\n            stack.append(result)\n        } else {\n            stack.append(Int(token)!)\n        }\n    }\n    return stack.last!\n}",
        haskell: "evalRPN :: [String] -> Int\nevalRPN tokens = head (go tokens []) where\n  go [] stack = stack\n  go (x:xs) stack\n    | x == \"+\" = let (b:a:rest) = stack in go xs (a+b:rest)\n    | x == \"-\" = let (b:a:rest) = stack in go xs (a-b:rest)\n    | x == \"*\" = let (b:a:rest) = stack in go xs (a*b:rest)\n    | x == \"/\" = let (b:a:rest) = stack in go xs (a \\`div\\` b:rest)\n    | otherwise = go xs (read x : stack)"
      }
    },
    {
      id: 9,
      title: 'Next Greater Element II',
      difficulty: 'medium',
      tags: ['stack', 'array', 'circular'],
      description: 'Given a circular integer array nums (the last element is next to the first), find the next greater element for each element. Return -1 if no such element exists.',
      examples: [
        {
          input: 'nums = [1,2,1]',
          output: '[2,-1,2]',
          explanation: 'Next greater of 1 at index 0 is 2, at index 2 is 2 (wrapping around)'
        }
      ],
      constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
      hint: 'Iterate through the array twice to handle the circular nature. Use monotone stack.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun nextGreaterElements(nums: IntArray): IntArray {\n    val result = IntArray(nums.size) { -1 }\n    val stack = mutableListOf<Int>()\n\n    for (i in 0 until nums.size * 2) {\n        val idx = i % nums.size\n        while (stack.isNotEmpty() && nums[stack.last()] < nums[idx]) {\n            result[stack.removeAt(stack.lastIndex)] = nums[idx]\n        }\n        if (i < nums.size) {\n            stack.add(idx)\n        }\n    }\n    return result\n}",
        dart: "List<int> nextGreaterElements(List<int> nums) {\n  final result = List<int>.filled(nums.length, -1);\n  final stack = <int>[];\n\n  for (int i = 0; i < nums.length * 2; i++) {\n    final idx = i % nums.length;\n    while (stack.isNotEmpty && nums[stack.last] < nums[idx]) {\n      result[stack.removeLast()] = nums[idx];\n    }\n    if (i < nums.length) {\n      stack.add(idx);\n    }\n  }\n  return result;\n}",
        swift: "func nextGreaterElements(_ nums: [Int]) -> [Int] {\n    var result = Array(repeating: -1, count: nums.count)\n    var stack: [Int] = []\n\n    for i in 0..<(nums.count * 2) {\n        let idx = i % nums.count\n        while !stack.isEmpty && nums[stack.last!] < nums[idx] {\n            result[stack.removeLast()] = nums[idx]\n        }\n        if i < nums.count {\n            stack.append(idx)\n        }\n    }\n    return result\n}",
        haskell: "nextGreaterElements :: [Int] -> [Int]\nnextGreaterElements nums =\n  let n = length nums\n      result = replicate n (-1)\n      extended = nums ++ nums\n  in go extended [0..n-1] result [] n 0 where\n    go _ _ res _ 0 _ = res\n    go (x:xs) (i:is) res st _ pos = go xs is res' st' (cnt-1) (pos+1) where\n      (res', st') = processStack x i st res st_needed\n      cnt = if pos < n then 1 else 0\n      st_needed = pos < n"
      }
    },
    {
      id: 10,
      title: 'Online Stock Span',
      difficulty: 'medium',
      tags: ['stack', 'design', 'monotone-stack'],
      description: 'Design an algorithm that collects daily price quotes for a stock and returns the span of that day\'s price. The span is the maximum number of consecutive days just before the given day (including it) during which the price was less than or equal to today\'s price.',
      examples: [
        {
          input: `["StockSpanner","next","next","next","next","next","next","next"]
[[],[100],[80],[60],[70],[60],[75],[85]]`,
          output: '[null,1,1,1,2,1,4,6]',
          explanation: 'Day 0: span=1, Day 1: span=1 (80<100), Day 2: span=1, Day 3: span=2 (70,60 both <=70), etc.'
        }
      ],
      constraints: ['1 <= price <= 10^5', 'At most 10^4 calls to next()'],
      hint: 'Use stack to store (price, span) pairs. When price >= stack top, pop and accumulate spans.',
      timeComplexity: 'O(1) amortized',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class StockSpanner() {\n    private val stack = mutableListOf<Pair<Int, Int>>()\n    private var index = 0\n\n    fun next(price: Int): Int {\n        var span = 1\n        while (stack.isNotEmpty() && stack.last().first <= price) {\n            span += stack.removeAt(stack.lastIndex).second\n        }\n        stack.add(Pair(price, span))\n        return span\n    }\n}",
        dart: "class StockSpanner {\n  final _stack = <(int, int)>[];\n\n  int next(int price) {\n    int span = 1;\n    while (_stack.isNotEmpty && _stack.last.\\$1 <= price) {\n      final top = _stack.removeLast();\n      span += top.\\$2;\n    }\n    _stack.add((price, span));\n    return span;\n  }\n}",
        swift: "class StockSpanner {\n    private var stack: [(price: Int, span: Int)] = []\n\n    func next(_ price: Int) -> Int {\n        var span = 1\n        while !stack.isEmpty && stack.last!.price <= price {\n            let top = stack.removeLast()\n            span += top.span\n        }\n        stack.append((price, span))\n        return span\n    }\n}",
        haskell: "data StockSpanner = StockSpanner [(Int, Int)]\n\nnext :: StockSpanner -> Int -> (Int, StockSpanner)\nnext (StockSpanner stack) price = (span, StockSpanner stack') where\n  (stack', span) = processStack stack price 1\n\nprocessStack [] price span = ([(price, span)], span)\nprocessStack st@((p, s):rest) price span\n  | p <= price = let (st', newSpan) = processStack rest price (span + s)\n                 in (st', newSpan)\n  | otherwise = ((price, span):st, span)"
      }
    },
    {
      id: 11,
      title: 'Remove Duplicate Letters',
      difficulty: 'medium',
      tags: ['stack', 'greedy', 'string'],
      description: 'Given a string s, remove duplicate letters so that every letter appears once and only once. The result should be the smallest lexicographically among all valid results.',
      examples: [
        {
          input: 's = "bcabc"',
          output: '"abc"',
          explanation: 'Remove b and c at the end to get "abc"'
        },
        {
          input: 's = "cbaacbcac"',
          output: '"acdb"',
          explanation: 'Small lexicographic order'
        }
      ],
      constraints: ['1 <= s.length <= 10^4', 's consists of lowercase English letters'],
      hint: 'Use stack with greedy approach. Track character counts and whether chars are in result.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solutions: {
        kotlin: "fun removeDuplicates(s: String): String {\n    val stack = mutableListOf<Char>()\n    val count = mutableMapOf<Char, Int>()\n    val inStack = mutableSetOf<Char>()\n\n    for (c in s) count[c] = (count[c] ?: 0) + 1\n\n    for (c in s) {\n        count[c] = count[c]!! - 1\n        if (c in inStack) continue\n\n        while (stack.isNotEmpty() && stack.last() > c && count[stack.last()]!! > 0) {\n            val removed = stack.removeAt(stack.lastIndex)\n            inStack.remove(removed)\n        }\n        stack.add(c)\n        inStack.add(c)\n    }\n    return stack.joinToString(\"\")\n}",
        dart: "String removeDuplicates(String s) {\n  final stack = <String>[];\n  final count = <String, int>{};\n  final inStack = <String>{};\n\n  for (final c in s.split('')) {\n    count[c] = (count[c] ?? 0) + 1;\n  }\n\n  for (final c in s.split('')) {\n    count[c] = count[c]! - 1;\n    if (inStack.contains(c)) continue;\n\n    while (stack.isNotEmpty && stack.last.compareTo(c) > 0 && count[stack.last]! > 0) {\n      final removed = stack.removeLast();\n      inStack.remove(removed);\n    }\n    stack.add(c);\n    inStack.add(c);\n  }\n  return stack.join('');\n}",
        swift: "func removeDuplicates(_ s: String) -> String {\n    var stack: [Character] = []\n    var count: [Character: Int] = [:]\n    var inStack: Set<Character> = []\n\n    for c in s {\n        count[c, default: 0] += 1\n    }\n\n    for c in s {\n        count[c]! -= 1\n        if inStack.contains(c) { continue }\n\n        while !stack.isEmpty && stack.last! > c && count[stack.last!]! > 0 {\n            let removed = stack.removeLast()\n            inStack.remove(removed)\n        }\n        stack.append(c)\n        inStack.insert(c)\n    }\n    return String(stack)\n}",
        haskell: "import qualified Data.Map as M\nimport qualified Data.Set as S\n\nremoveDuplicates :: String -> String\nremoveDuplicates s = go s (M.fromList [(c, length $ filter (==c) s) | c <- s]) [] S.empty where\n  go [] _ stack _ = stack\n  go (c:cs) cnt stack inS\n    | c \\`S.member\\` inS = go cs cnt' stack inS\n    | otherwise = let (cnt', stack', inS') = removeGreater c (cnt', stack, inS)\n                  in go cs cnt' (c:stack') (S.insert c inS')\n    where cnt' = M.adjust (\\x -> x - 1) c cnt\n\n  removeGreater c (cnt, [], inS) = (cnt, [], inS)\n  removeGreater c (cnt, st@(x:xs), inS)\n    | x > c && M.findWithDefault 0 x cnt > 0 =\n        removeGreater c (cnt, xs, S.delete x inS)\n    | otherwise = (cnt, st, inS)"
      }
    },
    {
      id: 12,
      title: 'Decode String',
      difficulty: 'medium',
      tags: ['stack', 'string', 'recursion'],
      description: 'An encoded string is given as s = "3[a2[c]]". Decode it to get the actual decoded string. Numbers indicate repetition count, brackets indicate scope.',
      examples: [
        {
          input: 's = "3[a2[c]]"',
          output: '"accaccacc"',
          explanation: '2[c] = "cc", 3[a2[c]] = "accaccacc"'
        },
        {
          input: 's = "2[abc]3[cd]ef"',
          output: '"abcabccdcdcdef"',
          explanation: 'Process left to right'
        }
      ],
      constraints: ['1 <= s.length <= 30', 's consists of letters, digits, and brackets'],
      hint: 'Use stack. Push characters, when "]" is seen, pop until "[", multiply by the number before it.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun decodeString(s: String): String {\n    val stack = mutableListOf<Any>()\n    var currentNum = 0\n\n    for (c in s) {\n        when {\n            c.isDigit() -> currentNum = currentNum * 10 + (c - '0')\n            c == '[' -> {\n                stack.add(currentNum)\n                stack.add(\"[\")\n                currentNum = 0\n            }\n            c == ']' -> {\n                val temp = mutableListOf<String>()\n                while (stack.last() != \"[\") {\n                    temp.add(0, stack.removeAt(stack.lastIndex) as String)\n                }\n                stack.removeAt(stack.lastIndex)\n                val num = (stack.removeAt(stack.lastIndex) as Int)\n                val decoded = temp.joinToString(\"\").repeat(num)\n                stack.add(decoded)\n            }\n            else -> stack.add(c.toString())\n        }\n    }\n    return stack.joinToString(\"\")\n}",
        dart: "String decodeString(String s) {\n  final stack = <dynamic>[];\n  int currentNum = 0;\n\n  for (final c in s.split('')) {\n    if (int.tryParse(c) != null) {\n      currentNum = currentNum * 10 + int.parse(c);\n    } else if (c == '[') {\n      stack.add(currentNum);\n      stack.add('[');\n      currentNum = 0;\n    } else if (c == ']') {\n      final temp = <String>[];\n      while (stack.last != '[') {\n        temp.insert(0, stack.removeLast() as String);\n      }\n      stack.removeLast();\n      final num = stack.removeLast() as int;\n      final decoded = temp.join('') * num;\n      stack.add(decoded);\n    } else {\n      stack.add(c);\n    }\n  }\n  return stack.join('');\n}",
        swift: "func decodeString(_ s: String) -> String {\n    var stack: [Any] = []\n    var currentNum = 0\n\n    for c in s {\n        if c.isNumber {\n            currentNum = currentNum * 10 + Int(String(c))!\n        } else if c == \"[\" {\n            stack.append(currentNum)\n            stack.append(\"[\")\n            currentNum = 0\n        } else if c == \"]\" {\n            var temp: [String] = []\n            while stack.last as? String != \"[\" {\n                temp.insert(stack.removeLast() as! String, at: 0)\n            }\n            stack.removeLast()\n            let num = stack.removeLast() as! Int\n            let decoded = String(repeating: temp.joined(), count: num)\n            stack.append(decoded)\n        } else {\n            stack.append(String(c))\n        }\n    }\n    return stack.map { String(describing: \\$0) }.joined()\n}",
        haskell: "decodeString :: String -> String\ndecodeString s = go s [] 0 where\n  go [] stack _ = concat (map toString stack)\n  go (c:cs) stack num\n    | c >= '0' && c <= '9' = go cs stack (num * 10 + fromEnum c - fromEnum '0')\n    | c == '[' = go cs (num : '[' : stack) 0\n    | c == ']' = let (str, rest) = span (/= '[') stack\n                     n = head (drop 1 rest)\n                     newStack = drop 2 rest ++ [replicate n (concat (map toString str))]\n                 in go cs newStack 0\n    | otherwise = go cs (c : stack) num\n\n  toString x = [x]"
      }
    },
    {
      id: 13,
      title: 'Largest Rectangle in Histogram',
      difficulty: 'hard',
      tags: ['stack', 'array', 'monotone-stack'],
      description: 'Given an array of integers heights representing bar heights in a histogram, return the area of the largest rectangle that can be formed in the histogram.',
      examples: [
        {
          input: 'heights = [2,1,5,6,2,3]',
          output: '10',
          explanation: 'The largest rectangle is formed by bars at indices 2-3 with height 5 and 6, area = 6*2 = but actually [5,6] has area 10 where height 5 spans 2 bars'
        }
      ],
      constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
      hint: 'Use monotone increasing stack. For each bar, calculate area when it becomes smaller than previous.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun largestRectangleArea(heights: IntArray): Int {\n    val stack = mutableListOf<Int>()\n    var maxArea = 0\n\n    for (i in heights.indices) {\n        while (stack.isNotEmpty() && heights[stack.last()] > heights[i]) {\n            val h = heights[stack.removeAt(stack.lastIndex)]\n            val w = if (stack.isEmpty()) i else i - stack.last() - 1\n            maxArea = maxOf(maxArea, h * w)\n        }\n        stack.add(i)\n    }\n\n    while (stack.isNotEmpty()) {\n        val h = heights[stack.removeAt(stack.lastIndex)]\n        val w = if (stack.isEmpty()) heights.size else heights.size - stack.last() - 1\n        maxArea = maxOf(maxArea, h * w)\n    }\n    return maxArea\n}",
        dart: "int largestRectangleArea(List<int> heights) {\n  final stack = <int>[];\n  int maxArea = 0;\n\n  for (int i = 0; i < heights.length; i++) {\n    while (stack.isNotEmpty && heights[stack.last] > heights[i]) {\n      final h = heights[stack.removeLast()];\n      final w = stack.isEmpty ? i : i - stack.last - 1;\n      maxArea = max(maxArea, h * w);\n    }\n    stack.add(i);\n  }\n\n  while (stack.isNotEmpty) {\n    final h = heights[stack.removeLast()];\n    final w = stack.isEmpty ? heights.length : heights.length - stack.last - 1;\n    maxArea = max(maxArea, h * w);\n  }\n  return maxArea;\n}",
        swift: "func largestRectangleArea(_ heights: [Int]) -> Int {\n    var stack: [Int] = []\n    var maxArea = 0\n\n    for i in 0..<heights.count {\n        while !stack.isEmpty && heights[stack.last!] > heights[i] {\n            let h = heights[stack.removeLast()]\n            let w = stack.isEmpty ? i : i - stack.last! - 1\n            maxArea = max(maxArea, h * w)\n        }\n        stack.append(i)\n    }\n\n    while !stack.isEmpty {\n        let h = heights[stack.removeLast()]\n        let w = stack.isEmpty ? heights.count : heights.count - stack.last! - 1\n        maxArea = max(maxArea, h * w)\n    }\n    return maxArea\n}",
        haskell: "largestRectangleArea :: [Int] -> Int\nlargestRectangleArea heights = go heights [] 0 where\n  go [] stack maxArea = finalize stack heights maxArea\n  go (h:hs) stack maxArea =\n    let (stack', maxArea') = popWhile stack h (length heights - length hs - 1) maxArea heights\n    in go hs (length heights - length hs - 1 : stack') maxArea'\n\n  popWhile [] _ _ maxArea _ = ([], maxArea)\n  popWhile st@(top:rest) h idx maxArea heights\n    | heights !! top > h =\n        let w = if null rest then idx else idx - top - 1\n            newArea = heights !! top * w\n        in popWhile rest h idx (max maxArea newArea) heights\n    | otherwise = (st, maxArea)\n\n  finalize [] _ maxArea = maxArea\n  finalize st heights maxArea =\n    let (h:_) = st\n        w = length heights - h - 1\n    in finalize (tail st) heights (max maxArea (heights !! h * w))"
      }
    },
    {
      id: 14,
      title: 'Sliding Window Maximum',
      difficulty: 'hard',
      tags: ['queue', 'deque', 'sliding-window', 'monotone'],
      description: 'Given an array nums and an integer k, there is a sliding window of size k which is moving from the very left of the array to the very right. Return an array of the maximum element in each window.',
      examples: [
        {
          input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
          output: '[3,3,5,5,6,7]',
          explanation: 'Window [1,3,-1]=3, [3,-1,-3]=3, [-1,-3,5]=5, etc.'
        }
      ],
      constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
      hint: 'Use deque to store indices in decreasing order of values. Remove indices outside window.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {\n    val result = mutableListOf<Int>()\n    val deque = mutableListOf<Int>()\n\n    for (i in nums.indices) {\n        while (deque.isNotEmpty() && deque.first() < i - k + 1) {\n            deque.removeAt(0)\n        }\n        while (deque.isNotEmpty() && nums[deque.last()] <= nums[i]) {\n            deque.removeAt(deque.lastIndex)\n        }\n        deque.add(i)\n\n        if (i >= k - 1) {\n            result.add(nums[deque.first()])\n        }\n    }\n    return result.toIntArray()\n}",
        dart: "List<int> maxSlidingWindow(List<int> nums, int k) {\n  final result = <int>[];\n  final deque = <int>[];\n\n  for (int i = 0; i < nums.length; i++) {\n    while (deque.isNotEmpty && deque.first < i - k + 1) {\n      deque.removeAt(0);\n    }\n    while (deque.isNotEmpty && nums[deque.last] <= nums[i]) {\n      deque.removeLast();\n    }\n    deque.add(i);\n\n    if (i >= k - 1) {\n      result.add(nums[deque.first]);\n    }\n  }\n  return result;\n}",
        swift: "func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {\n    var result: [Int] = []\n    var deque: [Int] = []\n\n    for i in 0..<nums.count {\n        while !deque.isEmpty && deque.first! < i - k + 1 {\n            deque.removeFirst()\n        }\n        while !deque.isEmpty && nums[deque.last!] <= nums[i] {\n            deque.removeLast()\n        }\n        deque.append(i)\n\n        if i >= k - 1 {\n            result.append(nums[deque.first!])\n        }\n    }\n    return result\n}",
        haskell: "maxSlidingWindow :: [Int] -> Int -> [Int]\nmaxSlidingWindow nums k = go nums k [] [] 0 where\n  go [] _ _ result _ = reverse result\n  go (x:xs) k deque result i =\n    let deque' = dropWhile (\\idx -> idx <= i - k) deque\n        deque'' = dropWhile (\\idx -> nums !! idx <= x) deque'\n        deque''' = deque'' ++ [i]\n        result' = if i >= k - 1 then nums !! head deque''' : result else result\n    in go xs k deque''' result' (i + 1)"
      }
    },
    {
      id: 15,
      title: 'Basic Calculator',
      difficulty: 'hard',
      tags: ['stack', 'string', 'math'],
      description: 'Given a string s representing an expression, implement a basic calculator that evaluates it. Support +, -, *, /, and parentheses. Integer division truncates towards zero.',
      examples: [
        {
          input: 's = "1 + 1"',
          output: '2',
          explanation: 'Simple addition'
        },
        {
          input: 's = " 2-1 + 2 "',
          output: '3',
          explanation: 'Handle spaces and multiple operations'
        }
      ],
      constraints: ['1 <= s.length <= 3 * 10^5', 's consists of digits, \'+\', \'-\', \'*\', \'/\', \'(\', \')\', and\' \''],
      hint: 'Use stack to handle precedence. Use recursive descent for parentheses.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun calculate(s: String): Int {\n    var i = 0\n    val stack = mutableListOf<Int>()\n    var num = 0\n    var operation = '+'\n\n    for (j in s.indices) {\n        val c = s[j]\n        if (c.isDigit()) {\n            num = num * 10 + (c - '0')\n        }\n        if (c in \"+-*/\" || j == s.length - 1) {\n            when (operation) {\n                '+' -> stack.add(num)\n                '-' -> stack.add(-num)\n                '*' -> stack.add(stack.removeAt(stack.lastIndex) * num)\n                '/' -> stack.add(stack.removeAt(stack.lastIndex) / num)\n            }\n            if (c in \"+-*/\") {\n                operation = c\n                num = 0\n            }\n        }\n    }\n    return stack.sum()\n}",
        dart: "int calculate(String s) {\n  int i = 0;\n  final stack = <int>[];\n  int num = 0;\n  String operation = '+';\n\n  for (int j = 0; j < s.length; j++) {\n    final c = s[j];\n    if (int.tryParse(c) != null) {\n      num = num * 10 + int.parse(c);\n    }\n    if ('+-*/'.contains(c) || j == s.length - 1) {\n      switch (operation) {\n        case '+': stack.add(num); break;\n        case '-': stack.add(-num); break;\n        case '*': stack.add(stack.removeLast() * num); break;\n        case '/': stack.add((stack.removeLast() / num).toInt()); break;\n      }\n      if ('+-*/'.contains(c)) {\n        operation = c;\n        num = 0;\n      }\n    }\n  }\n  return stack.fold(0, (a, b) => a + b);\n}",
        swift: "func calculate(_ s: String) -> Int {\n    var stack: [Int] = []\n    var num = 0\n    var operation: Character = \"+\"\n    let chars = Array(s)\n\n    for (i, c) in chars.enumerated() {\n        if c.isNumber {\n            num = num * 10 + Int(String(c))!\n        }\n        if \"+-*/\".contains(c) || i == chars.count - 1 {\n            switch operation {\n            case \"+\": stack.append(num)\n            case \"-\": stack.append(-num)\n            case \"*\": stack.append(stack.removeLast() * num)\n            case \"/\": stack.append(stack.removeLast() / num)\n            default: break\n            }\n            if \"+-*/\".contains(c) {\n                operation = c\n                num = 0\n            }\n        }\n    }\n    return stack.reduce(0, +)\n}",
        haskell: "calculate :: String -> Int\ncalculate s = sum (go (filter (/=' ') s) [] 0 '+') where\n  go [] stack _ _ = stack\n  go (c:cs) stack num op\n    | c >= '0' && c <= '9' = go cs stack (num * 10 + fromEnum c - fromEnum '0') op\n    | c \\`elem\\` \"+-*/\" = let stack' = applyOp stack num op\n                        in go cs stack' 0 c\n    | otherwise = go cs stack num op\n\n  applyOp stack num '+' = num : stack\n  applyOp stack num '-' = (-num) : stack\n  applyOp (x:xs) num '*' = (x * num) : xs\n  applyOp (x:xs) num '/' = (x \\`div\\` num) : xs"
      }
    },
    {
      id: 16,
      title: 'Trapping Rain Water (Stack Approach)',
      difficulty: 'hard',
      tags: ['stack', 'array', 'two-pointer'],
      description: 'Given an elevation map represented as an array, compute how much water can be trapped after it rains. Use a monotone stack approach.',
      examples: [
        {
          input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
          output: '6',
          explanation: 'Trap water between bars'
        }
      ],
      constraints: ['1 <= height.length <= 2 * 10^4', '0 <= height[i] <= 10^5'],
      hint: 'Use decreasing monotone stack. When current bar is higher, pop and calculate water.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun trap(height: IntArray): Int {\n    var water = 0\n    val stack = mutableListOf<Int>()\n\n    for (i in height.indices) {\n        while (stack.isNotEmpty() && height[stack.last()] < height[i]) {\n            val top = stack.removeAt(stack.lastIndex)\n            if (stack.isEmpty()) break\n            val distance = i - stack.last() - 1\n            val boundedHeight = minOf(height[stack.last()], height[i]) - height[top]\n            water += distance * boundedHeight\n        }\n        stack.add(i)\n    }\n    return water\n}",
        dart: "int trap(List<int> height) {\n  int water = 0;\n  final stack = <int>[];\n\n  for (int i = 0; i < height.length; i++) {\n    while (stack.isNotEmpty && height[stack.last] < height[i]) {\n      final top = stack.removeLast();\n      if (stack.isEmpty) break;\n      final distance = i - stack.last - 1;\n      final boundedHeight = (height[stack.last] < height[i] ? height[stack.last] : height[i]) - height[top];\n      water += distance * boundedHeight;\n    }\n    stack.add(i);\n  }\n  return water;\n}",
        swift: "func trap(_ height: [Int]) -> Int {\n    var water = 0\n    var stack: [Int] = []\n\n    for i in 0..<height.count {\n        while !stack.isEmpty && height[stack.last!] < height[i] {\n            let top = stack.removeLast()\n            if stack.isEmpty { break }\n            let distance = i - stack.last! - 1\n            let boundedHeight = min(height[stack.last!], height[i]) - height[top]\n            water += distance * boundedHeight\n        }\n        stack.append(i)\n    }\n    return water\n}",
        haskell: "trap :: [Int] -> Int\ntrap height = go height [] 0 where\n  go [] _ water = water\n  go (h:hs) stack water =\n    let (stack', water') = processStack h stack 0 water hs\n    in go hs (length height - length hs - 1 : stack') water'\n\n  processStack h [] w water _ = ([], water)\n  processStack h st@(top:rest) w water remaining\n    | height !! top < h =\n        let w' = w + 1\n            water' = if null rest then water\n                     else water + w' * (min (height !! head rest) h - height !! top)\n        in processStack h rest 0 water' remaining\n    | otherwise = (st, water)"
      }
    },
    {
      id: 17,
      title: 'Remove K Digits',
      difficulty: 'medium',
      tags: ['stack', 'greedy', 'string'],
      description: 'Given string num representing a non-negative integer and an integer k, return the smallest possible integer after removing k digits from num. The result should not have leading zeros unless the result is "0".',
      examples: [
        {
          input: 'num = "1432219", k = 3',
          output: '"1219"',
          explanation: 'Remove 4, 3, 2 to get 1219'
        },
        {
          input: 'num = "10200", k = 1',
          output: '"200"',
          explanation: 'Remove the first 1'
        }
      ],
      constraints: ['1 <= k <= num.length <= 10^5', 'num consists of only digits'],
      hint: 'Use stack. For each digit, pop larger digits from stack if k > 0.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun removeKdigits(num: String, k: Int): String {\n    val stack = mutableListOf<Char>()\n    var remaining = k\n\n    for (digit in num) {\n        while (stack.isNotEmpty() && remaining > 0 && stack.last() > digit) {\n            stack.removeAt(stack.lastIndex)\n            remaining--\n        }\n        stack.add(digit)\n    }\n\n    while (remaining > 0) {\n        stack.removeAt(stack.lastIndex)\n        remaining--\n    }\n\n    val result = stack.joinToString(\"\").dropWhile { it == '0' }\n    return if (result.isEmpty()) \"0\" else result\n}",
        dart: "String removeKdigits(String num, int k) {\n  final stack = <String>[];\n  int remaining = k;\n\n  for (final digit in num.split('')) {\n    while (stack.isNotEmpty && remaining > 0 && stack.last.compareTo(digit) > 0) {\n      stack.removeLast();\n      remaining--;\n    }\n    stack.add(digit);\n  }\n\n  while (remaining > 0) {\n    stack.removeLast();\n    remaining--;\n  }\n\n  final result = stack.join('').replaceFirst(RegExp('^0+'), '');\n  return result.isEmpty ? '0' : result;\n}",
        swift: "func removeKdigits(_ num: String, _ k: Int) -> String {\n    var stack: [Character] = []\n    var remaining = k\n\n    for digit in num {\n        while !stack.isEmpty && remaining > 0 && stack.last! > digit {\n            stack.removeLast()\n            remaining -= 1\n        }\n        stack.append(digit)\n    }\n\n    while remaining > 0 {\n        stack.removeLast()\n        remaining -= 1\n    }\n\n    var result = String(stack)\n    result = result.drop { \\$0 == \"0\" }\n    return result.isEmpty ? \"0\" : result\n}",
        haskell: "removeKdigits :: String -> Int -> String\nremoveKdigits num k =\n  let (stack, _) = foldl processDigit ([], k) num\n      stack' = drop (length stack - length num + k) stack\n      result = dropWhile (== '0') stack'\n  in if null result then \"0\" else result\n\n  where processDigit (st, r) d\n          | r > 0 && not (null st) && head st > d = processDigit (tail st, r - 1) d\n          | otherwise = (d : st, r)"
      }
    },
    {
      id: 18,
      title: '132 Pattern',
      difficulty: 'medium',
      tags: ['stack', 'array', 'monotone-stack'],
      description: 'Given an array of n integers, find if there exists an index triple (i, j, k) such that i < j < k and nums[i] < nums[k] < nums[j].',
      examples: [
        {
          input: 'nums = [1,2,3,4]',
          output: 'false',
          explanation: 'No 132 pattern exists in strictly increasing array'
        },
        {
          input: 'nums = [3,1,4,2]',
          output: 'true',
          explanation: 'Index (0,1,3): nums[0]=3, nums[1]=1, nums[3]=2. 1 < 2 < 3'
        }
      ],
      constraints: ['n == nums.length', '1 <= n <= 2 * 10^5', '-10^9 <= nums[i] <= 10^9'],
      hint: 'Use stack to track potential j values. Maintain max value < nums[j] from elements to the left.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "fun find132pattern(nums: IntArray): Boolean {\n    var third = Int.MIN_VALUE\n    val stack = mutableListOf<Int>()\n\n    for (i in nums.size - 1 downTo 0) {\n        if (nums[i] < third) return true\n        while (stack.isNotEmpty() && stack.last() < nums[i]) {\n            third = maxOf(third, stack.removeAt(stack.lastIndex))\n        }\n        stack.add(nums[i])\n    }\n    return false\n}",
        dart: "bool find132pattern(List<int> nums) {\n  int third = -2147483648;\n  final stack = <int>[];\n\n  for (int i = nums.length - 1; i >= 0; i--) {\n    if (nums[i] < third) return true;\n    while (stack.isNotEmpty && stack.last < nums[i]) {\n      third = max(third, stack.removeLast());\n    }\n    stack.add(nums[i]);\n  }\n  return false;\n}",
        swift: "func find132pattern(_ nums: [Int]) -> Bool {\n    var third = Int.min\n    var stack: [Int] = []\n\n    for i in stride(from: nums.count - 1, through: 0, by: -1) {\n        if nums[i] < third { return true }\n        while !stack.isEmpty && stack.last! < nums[i] {\n            third = max(third, stack.removeLast())\n        }\n        stack.append(nums[i])\n    }\n    return false\n}",
        haskell: "find132pattern :: [Int] -> Bool\nfind132pattern nums = go (reverse nums) [] minBound where\n  go [] _ _ = False\n  go (x:xs) stack third\n    | x < third = True\n    | otherwise = let (stack', third') = popWhile x stack third\n                  in go xs (x:stack') third'\n\n  popWhile x [] third = ([], third)\n  popWhile x st@(top:rest) third\n    | top < x = popWhile x rest (max third top)\n    | otherwise = (st, third)"
      }
    },
    {
      id: 19,
      title: 'Maximum Frequency Stack',
      difficulty: 'hard',
      tags: ['stack', 'design', 'hash-table'],
      description: 'Design a stack-like data structure where push(x) pushes element x, and pop() removes and returns the most frequent element. If there is a tie, remove the element with the greatest index (most recent).',
      examples: [
        {
          input: `["FreqStack","push","push","push","push","push","push","pop"]
[[],[5],[7],[5],[7],[4],[5],[]]`,
          output: '[null,null,null,null,null,null,null,5]',
          explanation: '5 has frequency 3, pop returns 5'
        }
      ],
      constraints: ['At most 2 * 10^4 calls to push and pop'],
      hint: 'Use map of frequency -> stack of elements. Track max frequency.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      solutions: {
        kotlin: "class FreqStack() {\n    private val freq = mutableMapOf<Int, Int>()\n    private val freqStack = mutableMapOf<Int, MutableList<Int>>()\n    private var maxFreq = 0\n\n    fun push(x: Int) {\n        freq[x] = (freq[x] ?: 0) + 1\n        val f = freq[x]!!\n        maxFreq = maxOf(maxFreq, f)\n        freqStack.computeIfAbsent(f) { mutableListOf() }.add(x)\n    }\n\n    fun pop(): Int {\n        val x = freqStack[maxFreq]!!.removeAt(freqStack[maxFreq]!!.lastIndex)\n        freq[x] = freq[x]!! - 1\n        if (freqStack[maxFreq]!!.isEmpty()) {\n            freqStack.remove(maxFreq)\n            maxFreq--\n        }\n        return x\n    }\n}",
        dart: "class FreqStack {\n  final _freq = <int, int>{};\n  final _freqStack = <int, List<int>>{};\n  int _maxFreq = 0;\n\n  void push(int x) {\n    _freq[x] = (_freq[x] ?? 0) + 1;\n    final f = _freq[x]!;\n    _maxFreq = max(_maxFreq, f);\n    _freqStack.putIfAbsent(f, () => []).add(x);\n  }\n\n  int pop() {\n    final list = _freqStack[_maxFreq]!;\n    final x = list.removeLast();\n    _freq[x] = _freq[x]! - 1;\n    if (list.isEmpty) {\n      _freqStack.remove(_maxFreq);\n      _maxFreq--;\n    }\n    return x;\n  }\n}",
        swift: "class FreqStack {\n    private var freq: [Int: Int] = [:]\n    private var freqStack: [Int: [Int]] = [:]\n    private var maxFreq = 0\n\n    func push(_ x: Int) {\n        freq[x, default: 0] += 1\n        let f = freq[x]!\n        maxFreq = max(maxFreq, f)\n        if freqStack[f] == nil {\n            freqStack[f] = []\n        }\n        freqStack[f]?.append(x)\n    }\n\n    func pop() -> Int {\n        let x = freqStack[maxFreq]!.removeLast()\n        freq[x]! -= 1\n        if freqStack[maxFreq]!.isEmpty {\n            freqStack.removeValue(forKey: maxFreq)\n            maxFreq -= 1\n        }\n        return x\n    }\n}",
        haskell: "import qualified Data.Map as M\n\ndata FreqStack = FreqStack (M.Map Int Int) (M.Map Int [Int]) Int\n\npush :: FreqStack -> Int -> FreqStack\npush (FreqStack freq freqStack maxFreq) x =\n  let f = M.findWithDefault 0 x freq + 1\n      freq' = M.insert x f freq\n      freqStack' = M.insertWith (++) f [x] freqStack\n      maxFreq' = max maxFreq f\n  in FreqStack freq' freqStack' maxFreq'\n\npop :: FreqStack -> (Int, FreqStack)\npop (FreqStack freq freqStack maxFreq) =\n  case M.lookup maxFreq freqStack of\n    Just (x:xs) ->\n      let freq' = M.insert x (M.findWithDefault 0 x freq - 1) freq\n          freqStack' = if null xs then M.delete maxFreq freqStack else M.insert maxFreq xs freqStack\n          maxFreq' = if M.member (maxFreq - 1) freqStack' then maxFreq - 1 else maxFreq\n      in (x, FreqStack freq' freqStack' maxFreq')"
      }
    },
    {
      id: 20,
      title: 'Design Circular Deque',
      difficulty: 'medium',
      tags: ['design', 'deque', 'array'],
      description: 'Design a circular deque (double-ended queue) that supports insert and delete from both ends. Implement MyCircularDeque class with operations: insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.',
      examples: [
        {
          input: `["MyCircularDeque","insertLast","insertLast","insertFront","insertFront","getRear","isFull","deleteLast","insertFront","getFront"]
[[3],[1],[2],[3],[4],[],[],[],[4],[]]`,
          output: '[null,true,true,true,false,2,true,true,true,4]',
          explanation: 'Capacity 3: insert 1,2 at end, insert 3,4 at front, 4 fails (full)'
        }
      ],
      constraints: ['1 <= k <= 1000', 'All operations are valid'],
      hint: 'Use array with front and rear pointers. Manage circular indices with modulo.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(k)',
      solutions: {
        kotlin: "class MyCircularDeque(val k: Int) {\n    private val data = IntArray(k)\n    private var front = 0\n    private var rear = -1\n    private var size = 0\n\n    fun insertFront(value: Int): Boolean {\n        if (size == k) return false\n        front = (front - 1 + k) % k\n        data[front] = value\n        if (size == 0) rear = front\n        size++\n        return true\n    }\n\n    fun insertLast(value: Int): Boolean {\n        if (size == k) return false\n        rear = (rear + 1) % k\n        data[rear] = value\n        if (size == 0) front = rear\n        size++\n        return true\n    }\n\n    fun deleteFront(): Boolean {\n        if (size == 0) return false\n        front = (front + 1) % k\n        size--\n        return true\n    }\n\n    fun deleteLast(): Boolean {\n        if (size == 0) return false\n        rear = (rear - 1 + k) % k\n        size--\n        return true\n    }\n\n    fun getFront(): Int = if (size == 0) -1 else data[front]\n    fun getRear(): Int = if (size == 0) -1 else data[rear]\n    fun isEmpty(): Boolean = size == 0\n    fun isFull(): Boolean = size == k\n}",
        dart: "class MyCircularDeque {\n  final int k;\n  late List<int> data;\n  int front = 0;\n  int rear = -1;\n  int size = 0;\n\n  MyCircularDeque(this.k) {\n    data = List.filled(k, 0);\n  }\n\n  bool insertFront(int value) {\n    if (size == k) return false;\n    front = (front - 1 + k) % k;\n    data[front] = value;\n    if (size == 0) rear = front;\n    size++;\n    return true;\n  }\n\n  bool insertLast(int value) {\n    if (size == k) return false;\n    rear = (rear + 1) % k;\n    data[rear] = value;\n    if (size == 0) front = rear;\n    size++;\n    return true;\n  }\n\n  bool deleteFront() {\n    if (size == 0) return false;\n    front = (front + 1) % k;\n    size--;\n    return true;\n  }\n\n  bool deleteLast() {\n    if (size == 0) return false;\n    rear = (rear - 1 + k) % k;\n    size--;\n    return true;\n  }\n\n  int getFront() => size == 0 ? -1 : data[front];\n  int getRear() => size == 0 ? -1 : data[rear];\n  bool isEmpty() => size == 0;\n  bool isFull() => size == k;\n}",
        swift: "class MyCircularDeque {\n    private let k: Int\n    private var data: [Int]\n    private var front = 0\n    private var rear = -1\n    private var size = 0\n\n    init(_ k: Int) {\n        self.k = k\n        self.data = Array(repeating: 0, count: k)\n    }\n\n    func insertFront(_ value: Int) -> Bool {\n        if size == k { return false }\n        front = (front - 1 + k) % k\n        data[front] = value\n        if size == 0 { rear = front }\n        size += 1\n        return true\n    }\n\n    func insertLast(_ value: Int) -> Bool {\n        if size == k { return false }\n        rear = (rear + 1) % k\n        data[rear] = value\n        if size == 0 { front = rear }\n        size += 1\n        return true\n    }\n\n    func deleteFront() -> Bool {\n        if size == 0 { return false }\n        front = (front + 1) % k\n        size -= 1\n        return true\n    }\n\n    func deleteLast() -> Bool {\n        if size == 0 { return false }\n        rear = (rear - 1 + k) % k\n        size -= 1\n        return true\n    }\n\n    func getFront() -> Int {\n        return size == 0 ? -1 : data[front]\n    }\n\n    func getRear() -> Int {\n        return size == 0 ? -1 : data[rear]\n    }\n\n    func isEmpty() -> Bool {\n        return size == 0\n    }\n\n    func isFull() -> Bool {\n        return size == k\n    }\n}",
        haskell: "data MyCircularDeque = MyCircularDeque Int [Int] Int Int Int\n\nnew :: Int -> MyCircularDeque\nnew k = MyCircularDeque k (replicate k 0) 0 (-1) 0\n\ninsertFront :: MyCircularDeque -> Int -> (Bool, MyCircularDeque)\ninsertFront (MyCircularDeque k data front rear size) value\n  | size == k = (False, MyCircularDeque k data front rear size)\n  | otherwise = let front' = (front - 1 + k) \\`mod\\` k\n                    rear' = if size == 0 then front' else rear\n                    data' = take front' data ++ [value] ++ drop (front' + 1) data\n                in (True, MyCircularDeque k data' front' rear' (size + 1))"
      }
    }
  ]
}
