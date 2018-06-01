export interface IDirectedGraph {
  nodes: string[];
  edges: { [ source: string ]: string[] };
}
