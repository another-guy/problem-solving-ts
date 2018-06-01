export interface IEdge {
  source: string;
  destination: string;
  distance: number;
}

export interface IUndirectedGraph {
  nodes: string[];
  edges: IEdge[];
}
