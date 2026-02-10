export const searchAlgorithmSnippets = [
  `function linearSearch(list: number[], target: number): number {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === target) return i;
  }
  return -1;
}`,
  `function sentinelLinearSearch(list: number[], target: number): number {
  if (!list.length) return -1;
  const copy = [...list, target];
  let i = 0;
  while (copy[i] !== target) i += 1;
  return i < list.length ? i : -1;
}`,
  `function binarySearchIterative(list: number[], target: number): number {
  let left = 0;
  let right = list.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (list[mid] === target) return mid;
    if (list[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  `function binarySearchRecursive(
  list: number[],
  target: number,
  left = 0,
  right = list.length - 1,
): number {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (list[mid] === target) return mid;
  if (list[mid] < target) return binarySearchRecursive(list, target, mid + 1, right);
  return binarySearchRecursive(list, target, left, mid - 1);
}`,
  `function jumpSearch(list: number[], target: number): number {
  const size = Math.floor(Math.sqrt(list.length));
  let prev = 0;
  let step = size;
  while (list[Math.min(step, list.length) - 1] < target) {
    prev = step;
    step += size;
    if (prev >= list.length) return -1;
  }
  for (let i = prev; i < Math.min(step, list.length); i += 1) {
    if (list[i] === target) return i;
  }
  return -1;
}`,
  `function interpolationSearch(list: number[], target: number): number {
  let low = 0;
  let high = list.length - 1;
  while (low <= high && target >= list[low] && target <= list[high]) {
    const pos = low + Math.floor(((target - list[low]) * (high - low)) /
      (list[high] - list[low] || 1));
    if (list[pos] === target) return pos;
    if (list[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
  `function ternarySearch(list: number[], target: number): number {
  let left = 0;
  let right = list.length - 1;
  while (left <= right) {
    const step = Math.floor((right - left) / 3);
    const mid1 = left + step;
    const mid2 = right - step;
    if (list[mid1] === target) return mid1;
    if (list[mid2] === target) return mid2;
    if (target < list[mid1]) right = mid1 - 1;
    else if (target > list[mid2]) left = mid2 + 1;
    else { left = mid1 + 1; right = mid2 - 1; }
  }
  return -1;
}`,
  `function bfs(graph: Record<string, string[]>, start: string): string[] {
  const queue = [start];
  const seen = new Set([start]);
  const order: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    for (const next of graph[node] ?? []) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return order;
}`,
  `function dfs(graph: Record<string, string[]>, start: string): string[] {
  const stack = [start];
  const seen = new Set<string>();
  const order: string[] = [];
  while (stack.length) {
    const node = stack.pop()!;
    if (seen.has(node)) continue;
    seen.add(node);
    order.push(node);
    stack.push(...(graph[node] ?? []).reverse());
  }
  return order;
}`,
  `function depthFirstSearchRecursive(
  graph: Record<string, string[]>,
  node: string,
  seen = new Set<string>(),
  order: string[] = [],
): string[] {
  if (seen.has(node)) return order;
  seen.add(node);
  order.push(node);
  for (const next of graph[node] ?? []) {
    depthFirstSearchRecursive(graph, next, seen, order);
  }
  return order;
}`,
  `function depthLimitedSearch(
  graph: Record<string, string[]>,
  start: string,
  target: string,
  limit: number,
): boolean {
  const search = (node: string, depth: number, seen: Set<string>): boolean => {
    if (node === target) return true;
    if (depth === limit) return false;
    seen.add(node);
    for (const next of graph[node] ?? []) {
      if (!seen.has(next) && search(next, depth + 1, seen)) return true;
    }
    return false;
  };
  return search(start, 0, new Set());
}`,
] as const;
