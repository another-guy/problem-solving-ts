import {
  findPath,
  findPathRecursively,
  Grid,
} from '../src/cracking-the-coding-interview/8-recursion-and-dynamic-programming/8-2-robot-in-a-grid';

const nullGrid: Grid = null;

const gridWithSingleBlockedCell: Grid = [['x']];

const emptyGrid: Grid = [[]];

const oneByOneGrid: Grid = [[' ']];

const oneByTwoGrid: Grid = [[' ', ' ']];
const twoByOneGrid: Grid = [[' '], [' ']];

const twoByTwoGridA: Grid = [[' ', 'x'], [' ', ' ']];
const twoByTwoGridB: Grid = [[' ', ' '], ['x', ' ']];

const stairGrid: Grid = [
  [' ', 'x', ' ', ' ', ' '],
  [' ', ' ', 'x', ' ', ' '],
  ['x', ' ', ' ', 'x', ' '],
  [' ', 'x', ' ', ' ', 'x'],
  [' ', ' ', 'x', ' ', ' '],
];

const wellGrid: Grid = [
  [' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', 'x', ' '],
  [' ', ' ', 'x', ' ', ' '],
  [' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
];

const cliffGrid: Grid = [
  [' ', ' ', ' ', ' ', ' '],
  ['x', ' ', ' ', 'x', ' '],
  [' ', ' ', 'x', ' ', ' '],
  [' ', 'x', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
];

describe(`${findPathRecursively.name} & ${findPath.name}`, () => {
  [
    { grid: nullGrid, expectedPath: null },
    { grid: gridWithSingleBlockedCell, expectedPath: null },
    { grid: emptyGrid, expectedPath: null },
    { grid: oneByOneGrid, expectedPath: [] },
    { grid: oneByTwoGrid, expectedPath: ['right'] },
    { grid: twoByOneGrid, expectedPath: ['down'] },
    { grid: twoByTwoGridA, expectedPath: ['down', 'right'] },
    { grid: twoByTwoGridB, expectedPath: ['right', 'down'] },
    {
      grid: stairGrid,
      expectedPath: [ 'down', 'right', 'down', 'right', 'down', 'right', 'down', 'right' ],
    },
    {
      grid: wellGrid,
      expectedPath: [ 'down', 'down', 'down', 'down', 'right', 'right', 'right', 'right' ],
    },
    {
      grid: cliffGrid,
      expectedPath: [ 'right', 'right', 'right', 'right', 'down', 'down', 'down', 'down' ],
    },
  ].forEach(({ grid, expectedPath }) => {
    const path = expectedPath == null ? 'null' : expectedPath.join('->');
    const gridText = JSON.stringify(grid, null, 2);

    it(`[Recursive] Should return "${path}" for grid\n${gridText}`, () => {
      expect(findPathRecursively(grid)).toEqual(expectedPath);
    });

    it(`[Non-recursive] Should return "${path}" for grid\n${gridText}`, () => {
      expect(findPath(grid)).toEqual(expectedPath);
    });
  });
});
