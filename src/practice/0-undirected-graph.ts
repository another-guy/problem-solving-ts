export interface IEdge {
  source: string;
  destination: string;
  distance: number;
}

export interface IGraph {
  nodes: string[];
  edges: IEdge[];
}
