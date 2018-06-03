import { graphsEqual } from '../src/practice/0-undirected-graph';
import { primMinimalSpanningTree } from '../src/practice/1-3-prim-minimal-spaning-tree';

const graph = {
  nodes: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  edges: [
    { source: 'a', destination: 'b', distance: 7 },
    { source: 'a', destination: 'd', distance: 5 },
    { source: 'b', destination: 'd', distance: 9 },
    { source: 'b', destination: 'c', distance: 8 },
    { source: 'b', destination: 'e', distance: 7 },
    { source: 'c', destination: 'e', distance: 5 },
    { source: 'd', destination: 'e', distance: 15 },
    { source: 'd', destination: 'f', distance: 6 },
    { source: 'f', destination: 'e', distance: 8 },
    { source: 'f', destination: 'g', distance: 11 },
    { source: 'e', destination: 'g', distance: 9 },
  ],
};
const expectedGraph = {
  nodes: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  edges: [
    { source: 'a', destination: 'b', distance: 7 },
    { source: 'a', destination: 'd', distance: 5 },
    { source: 'b', destination: 'e', distance: 7 },
    { source: 'c', destination: 'e', distance: 5 },
    { source: 'd', destination: 'f', distance: 6 },
    { source: 'e', destination: 'g', distance: 9 },
  ],
};

describe(primMinimalSpanningTree.name, () => {
  it(`Should pass an end-to-end test on a small graph`, () => {
    const resultSpanningTree = primMinimalSpanningTree(graph);
    const treeMatchesExpected = graphsEqual(resultSpanningTree, expectedGraph);
    expect(treeMatchesExpected).toBeTruthy();
  });
});
