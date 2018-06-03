import { IEdge, IUndirectedGraph } from './0-undirected-graph';

export function primMinimalSpanningTree(graph: IUndirectedGraph): IUndirectedGraph {
  const result: IUndirectedGraph = { nodes: [], edges: [] };

  // create a set of  unvisitedNodes
  const unvisitedNodes = new Set(graph.nodes);

  // select random node  x
  const x = graph.nodes[0]; // TODO !!!
  
  // add  x  to result graph
  result.nodes.push(x);
  // remove node  x  from unvisitedNodes
  unvisitedNodes.delete(x);
  
  while (unvisitedNodes.size) {
    //   find the shortest edge  e  from any of result graph's nodes to a node in unvisitedNodes
    const { edge, unvisitedNeighbor } = shortestEdge(graph, unvisitedNodes);
    if (!edge) break;

    //   add edge  e  to result graph
    result.edges.push(edge);

    //   add  e's  OTHER node  unvisitedNeighbor  to result graph
    result.nodes.push(unvisitedNeighbor);
    //   remove node  unvisitedNeighbor  from unvisitedNodes
    unvisitedNodes.delete(unvisitedNeighbor);
  }

  return result;
}

export function shortestEdge(
  graph: IUndirectedGraph,
  unvisitedNodes: Set<string>,
) {
  let shortestEdge: IEdge = { distance: Number.MAX_SAFE_INTEGER, source: '', destination: '' };
  graph.edges.forEach(edge => {
    const sourceUnvisited = unvisitedNodes.has(edge.source) && !unvisitedNodes.has(edge.destination);
    const destinationUnvisited = unvisitedNodes.has(edge.destination) && !unvisitedNodes.has(edge.source);
    const isShorter = edge.distance < shortestEdge.distance;
    if ((sourceUnvisited || destinationUnvisited) && isShorter)
      shortestEdge = edge;
  });

  const unvisitedNeighbor = unvisitedNodes.has(shortestEdge.source) ?
    shortestEdge.source :
    shortestEdge.destination;
  return { edge: shortestEdge, unvisitedNeighbor };
}
