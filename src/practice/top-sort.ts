import { IGraph } from './graph';

export function topSort(
  graph: IGraph,
): string[] {
  const ordered: string[] = [];
  const notVisited = new Set(graph.nodes);
  const remainingEdges = Object.keys(graph.edges)
    .reduce(
      (result, srcNode) => (result[srcNode] = [...graph.edges[srcNode]], result),
      {} as { [src: string]: string[] }
    );
  while (notVisited.size) {
    const independentNodes = nodesWithoutIncomingEdges(notVisited, remainingEdges);
    if (!independentNodes.size) throw new Error(`Grap has a cycle!`);

    ordered.push(...independentNodes);
    independentNodes.forEach(node => {
      notVisited.delete(node);
      delete remainingEdges[node];
    });
  }
  return ordered;
}

export function nodesWithoutIncomingEdges(
  notVisited: Set<string>,
  remainingEdges: { [ src: string ]: string[] },
): Set<string> {
  const copy = new Set(notVisited);
  Object
    .keys(remainingEdges)
    .forEach(src =>
      remainingEdges[src]
        .forEach(dest => copy.delete(dest))
    );
  return copy;
}

export function isTopSort(
  orderedNodes: string[],
  graph: IGraph,
): boolean {
  if (graph.nodes.length !== (orderedNodes || []).length) return false;

  for (let sourceIndex = 0; sourceIndex < orderedNodes.length; sourceIndex++) {
    for (let destinationIndex = sourceIndex; destinationIndex < orderedNodes.length; destinationIndex++) {
      const reversePathExists = pathExists(orderedNodes[destinationIndex], orderedNodes[sourceIndex], graph);
      if (reversePathExists)
        return false;
    }
  }
  return true;
}

export function pathExists(source: string, destination: string, graph: IGraph): boolean {
  const toVisit = [source];
  const visited = new Set<string | undefined>([]);

  while (toVisit.length) {
    const currentNode = toVisit.shift();
    if (currentNode === undefined) throw new Error(`This should never happen`);

    visited.add(currentNode);
    const directlyReachable = graph.edges[currentNode] || [];

    if (directlyReachable.indexOf(destination) >= 0) return true;

    toVisit.push(
      ...directlyReachable.filter(node => !visited.has(node))
    );
  }
  return false;
}
