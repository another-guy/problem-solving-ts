import { SingleStack } from '../src/cracking-the-coding-interview/3-stacks-and-queues/3-1-single-array-multiple-stacks';

describe(SingleStack.name, () => {
  [
    { capacity: null, values: [ 1 ] },
    { capacity: null, values: [ 1, 2 ] },
    { capacity: null, values: [ 1, 2, 3 ] },
  ].forEach(testCase => {
    it(`Should correctly implement push(), pop(), isEmpty for ${JSON.stringify(testCase)}`, () => {
      const { capacity, values } = testCase;

      const stack = capacity ? new SingleStack(capacity) : new SingleStack();
      expect(stack.isEmpty).toBeTruthy();
  
      values.forEach(value => stack.push(value));
      expect(stack.isEmpty).toBeFalsy();
  
      for (let index = values.length - 1; index >= 0; index--) {
        const popped = stack.pop();
        expect(popped).toEqual(values[index]);
      }
      expect(stack.isEmpty).toBeTruthy();  
    });
  });

  [
    { capacity: null, values: [ ] },
  ].forEach(testCase => {
    it(`Should correctly implement push(), pop(), isEmpty for ${JSON.stringify(testCase)}`, () => {
      const { capacity, values } = testCase;

      const stack = capacity ? new SingleStack(capacity) : new SingleStack();
      expect(stack.isEmpty).toBeTruthy();
  
      values.forEach(value => stack.push(value));
      expect(stack.isEmpty).toBeTruthy();
    });
  });

  [
    { capacity: 0 },
    { capacity: 1 },
    { capacity: 2 },
  ].forEach(testCase => {
    it(`Should throw error when push() is invoked on full stack of capacity ${JSON.stringify(testCase)}`, () => {
      const { capacity } = testCase;

      const stack = new SingleStack(capacity);
      expect(stack.isEmpty).toBeTruthy();
  
      new Array(capacity)
        .fill(null)
        .forEach((_, index) => stack.push(index));
      
      expect(() => stack.push(100)).toThrow();
    });
  });
});