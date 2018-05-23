import { magicIndex } from '../src/cracking-the-coding-interview/8-recursion-and-dynamic-programming/8-3-magic-index';

describe(magicIndex.name, () => {
  [
    { array: [ 0, 2, 4, 5, 6 ], expectedIndex: 0 },
    { array: [ -1, 1, 4, 5, 6 ], expectedIndex: 1 },
    { array: [ -1, 0, 2, 5, 6 ], expectedIndex: 2 },
    { array: [ -1, 0, 1, 3, 6 ], expectedIndex: 3 },
    { array: [ -1, 0, 1, 2, 4 ], expectedIndex: 4 },
    { array: [ -1, 0, 1, 2, 3 ], expectedIndex: null },
    { array: [], expectedIndex: null },
  ].forEach(({ array, expectedIndex }) => {
    it(`Should return ${expectedIndex} for ${JSON.stringify(array)}`, () => {
      expect(magicIndex(array)).toEqual(expectedIndex);
    });
  });
});
