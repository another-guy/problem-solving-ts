import { IUndirectedGraph } from './0-undirected-graph';

const infinity = Number.POSITIVE_INFINITY;

export type DistanceEntry = {
  from: string | null,
  distance: number,
};

export type DistanceToList = {
  [ dest: string ]: DistanceEntry,
};

export interface IPath {
  nodeList: string[];
  distance: number;
}
 
export function dijkstraShortestPath(
  graph: IUndirectedGraph,
  sourceNode: string,
  destinationNode: string,
): IPath {
  const unvisitedNodes = new Set(graph.nodes);
  const unvisitedEdges = new Set(graph.edges);
  const distanceTo = initializeDistances(graph.nodes, sourceNode);
 
  let currentNode: string | undefined = sourceNode;
  do {
    unvisitedNodes.delete(currentNode);
 
    for (const edge of unvisitedEdges)
      if (edge.source === currentNode || edge.destination === currentNode) {
        unvisitedEdges.delete(edge);
 
        const neighborNode = edge.source === currentNode ? edge.destination : edge.source;
        const alternativeDistance = distanceTo[currentNode].distance + edge.distance;
 
        if (alternativeDistance < distanceTo[neighborNode].distance) {
          distanceTo[neighborNode] = { from: currentNode, distance: alternativeDistance };
        }
      }
 
    currentNode = closestUnvisitedEntry(distanceTo, unvisitedNodes);
  } while (currentNode);
 
  return {
    distance: distanceTo[destinationNode].distance,
    nodeList: unwindPath(distanceTo, destinationNode),
  };
}

export function initializeDistances(
  nodes: string[],
  sourceNode: string,
): DistanceToList {
  return nodes
    .reduce(
      (result, node) => (
        result[node] = {
          from: null,
          distance: node === sourceNode ? 0 : infinity,
        },
        result
      ),
      {} as DistanceToList,
    );
}

export function closestUnvisitedEntry(
  distanceTo: DistanceToList,
  unvisitedNodes: Set<string>,
): string | undefined {
  let resultNode;
  let minimalDistance = infinity;
  for (const node of Object.keys(distanceTo)) {
    const nodeDistance = distanceTo[node].distance;
    if (unvisitedNodes.has(node) && nodeDistance < minimalDistance)
    {
      resultNode = node;
      minimalDistance = nodeDistance;
    }
  }
  return resultNode;
}
 
export function unwindPath(
  distanceTo: DistanceToList,
  destinationNode: string,
) {
  const path: string[] = [ destinationNode ];
  let currentNode: string | null = destinationNode;
  do {
    const entry: DistanceEntry = distanceTo[currentNode];
    currentNode = entry.from;
    if (currentNode) path.unshift(currentNode);
  } while (currentNode);
  return path;
}
