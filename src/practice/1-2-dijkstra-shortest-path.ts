import { IGraph } from './0-undirected-graph';
 
export interface IPath {
  nodeList: string[];
  distance: number;
}
 
export function dijkstraShortestPath(
  graph: IGraph,
  sourceNode: string,
  destinationNode: string,
): IPath {
  const edges = new Set(graph.edges);
  const distanceTo = graph.nodes
    .reduce(
      (result, node) => (
        result[node] = {
          from: null,
          distance: node === sourceNode ? 0 : Number.MAX_SAFE_INTEGER,
        },
        result
      ),
      {} as { [ dest: string ]: { from: string | null, distance: number } }
    );
 
  const unvisited = new Set(graph.nodes);
 
  let currentNode: string | undefined = sourceNode;
  do {
    unvisited.delete(currentNode);
 
    for (let edge of edges)
      if (edge.source === currentNode || edge.destination === currentNode) {
        edges.delete(edge);
 
        const neighbor = edge.source === currentNode ? edge.destination : edge.source;
        const alternativeDistance = distanceTo[currentNode].distance + edge.distance;
 
        if (alternativeDistance < distanceTo[neighbor].distance) {
          distanceTo[neighbor] = { from: currentNode, distance: alternativeDistance };
        }
      }
 
    // current = unvisited node with shortest `distance` path to it
    let closestUnvisitedEntry = (Object
      .entries(distanceTo)
      .sort((entry1, entry2) => entry1["1"].distance - entry2["1"].distance)
      .find(entry => unvisited.has(entry["0"])));
    currentNode = closestUnvisitedEntry && closestUnvisitedEntry["0"];
 
  } while (currentNode);
 
  return {
    distance: distanceTo[destinationNode].distance,
    nodeList: unwindPath(distanceTo, destinationNode),
  };
}
 
export function unwindPath(
  distanceTo: { [dest: string]: { from: string | null, distance: number } },
  destinationNode: string,
) {
  const path: string[] = [ destinationNode ];
  let currentNode: string | null = destinationNode;
  do {
    const entry: { from: string | null, distance: number } = distanceTo[currentNode];
    currentNode = entry.from;
    if (currentNode) path.unshift(currentNode);
  } while (currentNode);
  return path;
}
