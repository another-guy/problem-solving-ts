export interface Graph {
  nodes: string[];
  edges: { [ sourceNode: string]: string[] };
}

export function pathExists(graph: Graph, source: string, destination: string): boolean {
  const visited = new Set<string>();
  const toVisit = [ source ];
  while (toVisit.length) {
    const currentNode = toVisit.shift();
    if (currentNode === undefined) throw new Error(`currentNode === ${currentNode}`);
    if (currentNode === destination) return true;

    visited.add(currentNode);
    const reachableUnvisited =
      (graph.edges[currentNode] || []).filter(reachableNode => !visited.has(reachableNode));

    toVisit.push(...reachableUnvisited);
  }
  return false;
}
