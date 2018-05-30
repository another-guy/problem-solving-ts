export interface IGraph {
  nodes: string[];
  edges: { [ source: string ]: string[] };
}
