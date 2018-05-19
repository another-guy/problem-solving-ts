import { tripleStep } from '../src/cracking-the-coding-interview/8-recursion-and-dynamic-programming/8-1-triple-step';

describe(tripleStep.name, () => {
  [
    { numberOfSteps: 1, expectedResult: 1 },
    { numberOfSteps: 2, expectedResult: 2 },
    { numberOfSteps: 3, expectedResult: 4 },
    { numberOfSteps: 4, expectedResult: 7 },
    { numberOfSteps: 5, expectedResult: 13 },
    { numberOfSteps: 6, expectedResult: 24 },
    { numberOfSteps: 7, expectedResult: 44 },
    { numberOfSteps: 8, expectedResult: 81 },
    { numberOfSteps: 9, expectedResult: 149 },
  ].forEach(({ numberOfSteps, expectedResult }) => {
    it(`Should return ${expectedResult} for ${numberOfSteps} steps`, () => {
      expect(tripleStep(numberOfSteps)).toEqual(expectedResult);
    });
  });
});
