import { flipToWin } from '../src/cracking-the-coding-interview/5-bit-manipulation/5-3-flip-to-win';

describe(flipToWin.name, () => {
  [
    { inputNumber: 0, expectedResult: 1 },

    { inputNumber: 1, expectedResult: 2 },
    { inputNumber: 2, expectedResult: 2 },
    { inputNumber: 4, expectedResult: 2 },
    { inputNumber: 8, expectedResult: 2 },
    { inputNumber: 16, expectedResult: 2 },
    { inputNumber: 32, expectedResult: 2 },

    { inputNumber: 3, expectedResult: 3 },
    { inputNumber: 5, expectedResult: 3 },
    { inputNumber: 6, expectedResult: 3 },
    { inputNumber: 10, expectedResult: 3 },
    { inputNumber: 12, expectedResult: 3 },
    { inputNumber: 20, expectedResult: 3 },
    { inputNumber: 24, expectedResult: 3 },
    { inputNumber: 48, expectedResult: 3 },

    { inputNumber: (~0 & (~0 << 1)), expectedResult: 32 },
    { inputNumber: (~0 & (~0 << 2)), expectedResult: 31 },
    { inputNumber: (~0 & (~0 << 3)), expectedResult: 30 },
    { inputNumber: (~0 & (~0 << 4)), expectedResult: 29 },
  ].forEach(({ inputNumber, expectedResult }) => {
    it(`Should return length of ${expectedResult} for input number ${inputNumber}.`, () => {
      expect(flipToWin(inputNumber)).toEqual(expectedResult);
    });
  });
});
