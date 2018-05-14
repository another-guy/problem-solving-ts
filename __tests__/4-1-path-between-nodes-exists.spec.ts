import { Graph, pathExists } from '../src/cracking-the-coding-interview/4-graphs/4-1-path-between-nodes-exists';

const graph1: Graph = {
  nodes: [ 'a', 'b', 'c' ],
  edges: {
    'a': [ 'b' ],
    'b': [ 'c' ],
  },
};
const graph1tests = [
  { graph: graph1, source: 'a', destination: 'a', expected: true },
  { graph: graph1, source: 'b', destination: 'b', expected: true },
  { graph: graph1, source: 'c', destination: 'c', expected: true },
  { graph: graph1, source: 'a', destination: 'b', expected: true },
  { graph: graph1, source: 'b', destination: 'c', expected: true },
  { graph: graph1, source: 'c', destination: 'b', expected: false },
  { graph: graph1, source: 'c', destination: 'a', expected: false },
  { graph: graph1, source: 'b', destination: 'a', expected: false },
];

const graph2: Graph = {
  nodes: [ 'a', 'b', 'c' ],
  edges: { },
};
const graph2tests = [
  { graph: graph2, source: 'a', destination: 'a', expected: true },
  { graph: graph2, source: 'b', destination: 'b', expected: true },
  { graph: graph2, source: 'c', destination: 'c', expected: true },
  { graph: graph2, source: 'a', destination: 'b', expected: false },
  { graph: graph2, source: 'b', destination: 'c', expected: false },
  { graph: graph2, source: 'c', destination: 'b', expected: false },
  { graph: graph2, source: 'c', destination: 'a', expected: false },
  { graph: graph2, source: 'b', destination: 'a', expected: false },
];

const graph3: Graph = {
  nodes: [ 'a', 'b', 'c' ],
  edges: {
    'a': [ 'b' ],
    'b': [ 'c' ],
    'c': [ 'a' ],
  },
};
const graph3tests = [
  { graph: graph3, source: 'a', destination: 'a', expected: true },
  { graph: graph3, source: 'b', destination: 'b', expected: true },
  { graph: graph3, source: 'c', destination: 'c', expected: true },
  { graph: graph3, source: 'a', destination: 'b', expected: true },
  { graph: graph3, source: 'b', destination: 'c', expected: true },
  { graph: graph3, source: 'c', destination: 'b', expected: true },
  { graph: graph3, source: 'c', destination: 'a', expected: true },
  { graph: graph3, source: 'b', destination: 'a', expected: true },
];

describe(pathExists.name, () => {
  [
    ...graph1tests,
    ...graph2tests,
    ...graph3tests,
  ].forEach(({ graph, source, destination, expected }) => {
    it(`Path from ${source} to ${destination} should ${ expected ? '': 'NOT' } exist in ${JSON.stringify(graph)}`, () => {
      expect(pathExists(graph, source, destination)).toEqual(expected);
    });
  });
});
