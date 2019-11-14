// TODO Move to test
describe(numberOfWaysToJumpToNthStep.name, () => {
  it('should work', () => {
    interface TestCase {
      n: number;
      expectedOutput: number;
    };
  
    const testCases: TestCase[] = [
      { n: 0, expectedOutput: 1 },
      { n: 1, expectedOutput: 1 },
      { n: 2, expectedOutput: 2 },
      { n: 3, expectedOutput: 4 },
      { n: 4, expectedOutput: 7 },
      { n: 5, expectedOutput: 13 },
    ];
    testCases.forEach(testCase => {
      const { n, expectedOutput } = testCase;
      expect(numberOfWaysToJumpToNthStep(n)).toEqual(expectedOutput);
    });
  });
  
});

export const memo = new Map();
memo.set(0, 1);
memo.set(1, 1);

// TODO Document
export const numberOfWaysToJumpToNthStep = (n) => {
  if (n < 0) throw new Error(`Cmon, you cant jump onto a negative step; but I'd be able to provide a math to that problem if necessary!`);

  if (memo.has(n)) return memo.get(n);

  const threeStepsBelow = n - 3;
  const twoStepsBelow = n - 2;
  const oneStepBelow = n - 1;

  let result = 0;
  if (threeStepsBelow >= 0)
    result += numberOfWaysToJumpToNthStep(threeStepsBelow);
  if (twoStepsBelow >= 0)
    result += numberOfWaysToJumpToNthStep(twoStepsBelow);
  if (oneStepBelow >= 0)
    result += numberOfWaysToJumpToNthStep(oneStepBelow);
  
  memo.set(n, result);
  
  return result;
};
