import { IGraph } from '../src/practice/0-directed-graph';
import { isTopSort, pathExists, topSort } from '../src/practice/1-1-top-sort';

export const singleNode: IGraph = {
  nodes: ['a'],
  edges: {},
};

export const loop: IGraph = {
  nodes: ['a'],
  edges: { a: ['a'] },
};

export const shortChain: IGraph = {
  nodes: ['a', 'b'],
  edges: { a: ['b'] },
};

export const longChain: IGraph = {
  nodes: ['a', 'b', 'c', 'd'],
  edges: { a: ['b'], b: ['c'], c: ['d'] },
};

export const linkedChain: IGraph = {
  nodes: ['a', 'b', 'c'],
  edges: { a: ['b'], b: ['c'], c: ['a'] },
};

describe(pathExists.name, () => {
  [
    { graph: singleNode, source: 'a', destination: 'a', expectedResult: false },

    { graph: loop, source: 'a', destination: 'a', expectedResult: true },

    { graph: shortChain, source: 'a', destination: 'b', expectedResult: true },
    { graph: shortChain, source: 'b', destination: 'a', expectedResult: false },
    
    { graph: longChain, source: 'a', destination: 'b', expectedResult: true },
    { graph: longChain, source: 'b', destination: 'c', expectedResult: true },
    { graph: longChain, source: 'c', destination: 'd', expectedResult: true },
    { graph: longChain, source: 'a', destination: 'c', expectedResult: true },
    { graph: longChain, source: 'b', destination: 'd', expectedResult: true },
    { graph: longChain, source: 'a', destination: 'd', expectedResult: true },
    { graph: longChain, source: 'b', destination: 'a', expectedResult: false },
    { graph: longChain, source: 'c', destination: 'b', expectedResult: false },
    { graph: longChain, source: 'd', destination: 'c', expectedResult: false },
    { graph: longChain, source: 'c', destination: 'a', expectedResult: false },
    { graph: longChain, source: 'd', destination: 'b', expectedResult: false },
    { graph: longChain, source: 'd', destination: 'a', expectedResult: false },

    { graph: linkedChain, source: 'a', destination: 'b', expectedResult: true },
    { graph: linkedChain, source: 'b', destination: 'c', expectedResult: true },
    { graph: linkedChain, source: 'c', destination: 'a', expectedResult: true },
    { graph: linkedChain, source: 'a', destination: 'c', expectedResult: true },
    { graph: linkedChain, source: 'c', destination: 'b', expectedResult: true },
  ].forEach(({graph, source, destination, expectedResult}) => {
    it(`Should return ${expectedResult} for path from ${source} to ${destination} on ${JSON.stringify(graph, null, 2)}`, () => {
      expect(pathExists(source, destination, graph)).toEqual(expectedResult);
    });
  });
});

describe(isTopSort.name, () => {
  [
    {
      graph: singleNode,
      orderedNodes: [],
      expectedResult: false,
    },
    {
      graph: singleNode,
      orderedNodes: ['a'],
      expectedResult: true,
    },

    {
      graph: loop,
      orderedNodes: ['a'],
      expectedResult: false,
    },

    {
      graph: shortChain,
      orderedNodes: [],
      expectedResult: false,
    },
    {
      graph: shortChain,
      orderedNodes: ['a'],
      expectedResult: false,
    },
    {
      graph: shortChain,
      orderedNodes: ['b'],
      expectedResult: false,
    },
    {
      graph: shortChain,
      orderedNodes: ['a', 'b'],
      expectedResult: true,
    },
    {
      graph: shortChain,
      orderedNodes: ['b', 'a'],
      expectedResult: false,
    },
    
    {
      graph: longChain,
      orderedNodes: ['a', 'b', 'c', 'd'],
      expectedResult: true,
    },
    {
      graph: longChain,
      orderedNodes: ['b', 'a', 'c', 'd'],
      expectedResult: false,
    },
    {
      graph: longChain,
      orderedNodes: ['a', 'c', 'b', 'd'],
      expectedResult: false,
    },
    {
      graph: longChain,
      orderedNodes: ['a', 'b', 'd', 'c'],
      expectedResult: false,
    },

    {
      graph: shortChain,
      orderedNodes: ['a', 'b'],
      expectedResult: true,
    },
    {
      graph: shortChain,
      orderedNodes: ['b', 'a'],
      expectedResult: false,
    },
    
    {
      graph: linkedChain,
      orderedNodes: ['a', 'b', 'c', 'd'],
      expectedResult: false,
    },
    {
      graph: linkedChain,
      orderedNodes: ['b', 'a', 'c', 'd'],
      expectedResult: false,
    },
    {
      graph: linkedChain,
      orderedNodes: ['a', 'c', 'b', 'd'],
      expectedResult: false,
    },
    {
      graph: linkedChain,
      orderedNodes: ['a', 'b', 'd', 'c'],
      expectedResult: false,
    },
  ].forEach(({graph, orderedNodes, expectedResult}) => {
    it(`Should return ${expectedResult} for sequence ${JSON.stringify(orderedNodes)} on ${JSON.stringify(graph, null, 2)}`, () => {
      expect(isTopSort(orderedNodes, graph)).toEqual(expectedResult);
    });
  });
});

describe(topSort.name, () => {
  [
    singleNode,
    shortChain,
    longChain,
  ].forEach(graph => {
    it(`Should produce a valid topsort result for graph ${JSON.stringify(graph, null, 2)}`, () => {
      const topsortResult = topSort(graph);
      expect(isTopSort(topsortResult, graph)).toBeTruthy();
    });
  });

  [
    loop,
    linkedChain,
  ].forEach(graph => {
    it(`Should throw an error for a cyclic graph ${JSON.stringify(graph, null, 2)}`, () => {
      expect(() => topSort(graph)).toThrowError(`Grap has a cycle!`);
    });
  });
});
