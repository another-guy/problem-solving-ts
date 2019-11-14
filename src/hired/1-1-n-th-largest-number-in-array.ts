// TODO Move to test
describe(nThLargestNumberInArray.name, () => {
  it('work fine', () => {
    interface TestCase {
      numbers: number[];
      k: number;
      expectedResult: number;
    };
  
    const testCases: TestCase[] = [
      { numbers: [5,2,6,9], k: 1, expectedResult: 9 },
      { numbers: [5,2,6,9], k: 2, expectedResult: 6 },
      { numbers: [5,2,6,9], k: 3, expectedResult: 5 },
      { numbers: [5,2,6,9], k: 4, expectedResult: 2 },
      { numbers: [1,4,3,4,2,5], k: 3, expectedResult: 4 },
    ];
    testCases.forEach(testCase => {
      const { numbers, k, expectedResult } = testCase;
      expect(nThLargestNumberInArray(numbers, k)).toEqual(expectedResult);
    });
  });
  
});

// TODO Document
export const nThLargestNumberInArray = (numbers: number[], k: number) => {
  return (numbers || [])
    .sort((a, b) => b - a)
    [k - 1];
};
