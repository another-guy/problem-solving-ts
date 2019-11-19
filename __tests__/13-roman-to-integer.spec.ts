import { romanToInt } from '../src/leet-code/1-easy/13-roman-to-integer';

describe(romanToInt.name, () => {
  it('Should work', () => {
    interface TestCase {
      input: string;
      expectedOutput: number;
    };
  
    const testCases: TestCase[] = [
      { input: 'I', expectedOutput: 1 },
      { input: 'II', expectedOutput: 2 },
      { input: 'III', expectedOutput: 3 },
      { input: 'IV', expectedOutput: 4 },
      { input: 'V', expectedOutput: 5 },
      { input: 'VI', expectedOutput: 6 },
      { input: 'VII', expectedOutput: 7 },
      { input: 'VIII', expectedOutput: 8 },
      { input: 'IX', expectedOutput: 9 },
      { input: 'X', expectedOutput: 10 },
      { input: 'XI', expectedOutput: 11 },
      { input: 'XII', expectedOutput: 12 },
      { input: 'XIII', expectedOutput: 13 },
      { input: 'XIV', expectedOutput: 14 },
      { input: 'XV', expectedOutput: 15 },
      { input: 'XVI', expectedOutput: 16 },
      { input: 'XVII', expectedOutput: 17 },
      { input: 'XVIII', expectedOutput: 18 },
      { input: 'XIX', expectedOutput: 19 },
      { input: 'XX', expectedOutput: 20 },
      { input: 'XXX', expectedOutput: 30 },
      { input: 'XL', expectedOutput: 40 },
      { input: 'L', expectedOutput: 50 },
      { input: 'LX', expectedOutput: 60 },
      { input: 'LXX', expectedOutput: 70 },
      { input: 'LXXX', expectedOutput: 80 },
      { input: 'XC', expectedOutput: 90 },
      { input: 'C', expectedOutput: 100 },
      { input: 'CC', expectedOutput: 200 },
      { input: 'CCC', expectedOutput: 300 },
      { input: 'CD', expectedOutput: 400 },
      { input: 'D', expectedOutput: 500 },
      { input: 'DC', expectedOutput: 600 },
      { input: 'DCC', expectedOutput: 700 },
      { input: 'DCCC', expectedOutput: 800 },
      { input: 'CM', expectedOutput: 900 },
      { input: 'M', expectedOutput: 1000 },
      { input: 'MM', expectedOutput: 2000 },
      { input: 'MMM', expectedOutput: 3000 },
      { input: 'MMMM', expectedOutput: 4000 },
      { input: 'MMMMM', expectedOutput: 5000 },
      { input: 'MCMXCIX', expectedOutput: 1999 },
    ];
    testCases.forEach(testCase => {
      const { input, expectedOutput } = testCase;
      expect(romanToInt(input)).toEqual(expectedOutput);
    });
  });
});
