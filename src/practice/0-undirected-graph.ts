export interface IEdge {
  source: string;
  destination: string;
  distance: number;
}

export interface IUndirectedGraph {
  nodes: string[];
  edges: IEdge[];
}

export function graphsEqual(graph1: IUndirectedGraph, graph2: IUndirectedGraph): boolean {
  if (!graph1 || !graph2) throw new Error(`Compared graphs can not be null/undefined`);
  
  if (graph1.nodes.length !== graph2.nodes.length) return false;
  const someNodeMissing = graph1.nodes.some(node => graph2.nodes.indexOf(node) < 0);
  if (someNodeMissing) return false;
  
  if (graph1.edges.length !== graph2.edges.length) return false;
  const someEdgeMissing = graph1.edges.some(edge =>
    graph2.edges.findIndex(candidateEdge =>
      (candidateEdge.source === edge.source && candidateEdge.destination === edge.destination) ||
      (candidateEdge.source === edge.destination && candidateEdge.destination === edge.source)) < 0
  );
  if (someEdgeMissing) return false;
  
  return true;
}
