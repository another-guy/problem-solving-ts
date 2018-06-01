import { dijkstraShortestPath } from '../src/practice/1-2-dijkstra-shortest-path';

const graph = {
  nodes: ['a', 'b', 'c', 'd', 'e', 'f'],
  edges: [
    { source: 'a', destination: 'b', distance: 7 },
    { source: 'a', destination: 'c', distance: 9 },
    { source: 'a', destination: 'f', distance: 14 },
    { source: 'b', destination: 'c', distance: 10 },
    { source: 'b', destination: 'd', distance: 15 },
    { source: 'c', destination: 'f', distance: 2 },
    { source: 'c', destination: 'd', distance: 11 },
    { source: 'd', destination: 'e', distance: 6 },
    { source: 'e', destination: 'f', distance: 9 },
  ],
};

describe(dijkstraShortestPath.name, () => {
  it(`Should pass end-to-end test`, () => {
    const result = dijkstraShortestPath(graph, 'a', 'e');
    expect(result.distance).toBe(20);
    expect(result.nodeList).toEqual(['a', 'c', 'f', 'e']);
  });
});
