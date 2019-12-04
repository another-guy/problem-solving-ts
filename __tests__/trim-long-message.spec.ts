import { trimLongMessage } from '../src/codility/trim-long-message';

describe(trimLongMessage.name, () => {
  it('should work', () => {

    interface TestCase {
      message: string | null | undefined;
      k: number;
      result: string;
    };

    const testCases: TestCase[] = [
      { message: null, k: 0, result: '' },
      { message: undefined, k: 0, result: '' },
      { message: '', k: 0, result: '' },
      { message: '', k: 1, result: '' },
      { message: '', k: 10, result: '' },
  
      { message: 'a', k: 0, result: '' },
      { message: 'abc', k: 1, result: '' },

      { message: 'a', k: 100, result: 'a' },
      { message: 'abc', k: 100, result: 'abc' },

      { message: 'Codility We test coders', k: 14, result: 'Codility We' },
    ];

    testCases.forEach(testCase => {
      const { message, k, result } = testCase;
      expect(trimLongMessage(message!, k)).toEqual(result);
    });
  });
  
});
