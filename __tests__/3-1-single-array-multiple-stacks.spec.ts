import {
  DoubleStack,
  MultiStack,
  SingleStack,
} from '../src/cracking-the-coding-interview/3-stacks-and-queues/3-1-single-array-multiple-stacks';

describe(MultiStack.name, () => {
  it(`Should pass a pre-scripted end-to-end test`, () => {
    const capacity = 6;
    const stack = new MultiStack(3, capacity);
    expect(stack.data).toEqual([0, -1, -1, -1, ...new Array(capacity * 2)]);

    stack.push(1, 10);
    expect(stack.data).toEqual([1, 0, -1, -1, 10, -1, ...new Array((capacity - 1) * 2)]);

    stack.push(2, 20);
    expect(stack.data).toEqual([2, 0, 1, -1, 10, -1, 20, -1, ...new Array((capacity - 2) * 2)]);
    
    stack.push(3, 30);
    expect(stack.data).toEqual([3, 0, 1, 2, 10, -1, 20, -1, 30, -1, ...new Array((capacity - 3) * 2)]);
    
    stack.push(1, 11);
    expect(stack.data).toEqual([4, 3, 1, 2, 10, -1, 20, -1, 30, -1, 11, 0, ...new Array((capacity - 4) * 2)]);
    
    stack.push(2, 21);
    expect(stack.data).toEqual([5, 3, 4, 2, 10, -1, 20, -1, 30, -1, 11, 0, 21, 1, ...new Array((capacity - 5) * 2)]);

    let poppedValue;
    poppedValue = stack.pop(1);
    expect(poppedValue).toBe(11);
    expect(stack.data).toEqual([3, 0, 4, 2, 10, -1, 20, -1, 30, -1, null, 5, 21, 1, ...new Array((capacity - 5) * 2)]);

    poppedValue = stack.pop(1);
    expect(poppedValue).toBe(10);
    expect(stack.data).toEqual([0, -1, 4, 2, null, 3, 20, -1, 30, -1, null, 5, 21, 1, ...new Array((capacity - 5) * 2)]);

    poppedValue = stack.pop(2);
    expect(poppedValue).toBe(21);
    expect(stack.data).toEqual([4, -1, 1, 2, null, 3, 20, -1, 30, -1, null, 5, null, 0, ...new Array((capacity - 5) * 2)]);
    
    stack.push(3, 31);
    expect(stack.data).toEqual([0, -1, 1, 4, null, 3, 20, -1, 30, -1, null, 5, 31, 2, ...new Array((capacity - 5) * 2)]);

    stack.push(3, 32);
    expect(stack.data).toEqual([3, -1, 1, 0, 32, 4, 20, -1, 30, -1, null, 5, 31, 2, ...new Array((capacity - 5) * 2)]);
    
    stack.push(3, 33);
    expect(stack.data).toEqual([5, -1, 1, 3, 32, 4, 20, -1, 30, -1, 33, 0, 31, 2, ...new Array((capacity - 5) * 2)]);
    
    expect(stack.outOfSpace).toBeFalsy();

    stack.push(3, 34);
    expect(stack.data).toEqual([6, -1, 1, 5, 32, 4, 20, -1, 30, -1, 33, 0, 31, 2, 34, 3, ...new Array((capacity - 6) * 2)]);

    expect(stack.outOfSpace).toBeTruthy();

    expect(() => stack.push(1, 42)).toThrow(`No more space available`);

    expect(() => stack.pop(1)).toThrow(`Nothing to pop`);
  });
});

describe(DoubleStack.name, () => {
  describe(`left stack`, () => {
    [
      { capacity: undefined, values: [ 1 ] },
      { capacity: undefined, values: [ 1, 2 ] },
      { capacity: undefined, values: [ 1, 2, 3 ] },
    ].forEach(testCase => {
      it(`Should correctly implement pushLeft(), popLeft(), isEmpty* for ${JSON.stringify(testCase)}`, () => {
        const { capacity, values } = testCase;
  
        const stack = capacity ? new DoubleStack(capacity) : new DoubleStack();
        expect(stack.isEmpty).toBeTruthy();
    
        values.forEach(value => stack.pushLeft(value));
        expect(stack.isEmpty).toBeFalsy();
        expect(stack.isRightEmpty).toBeTruthy();
    
        for (let index = values.length - 1; index >= 0; index--) {
          const popped = stack.popLeft();
          expect(popped).toEqual(values[index]);
        }
        expect(stack.isEmpty).toBeTruthy();  
      });
    });
  
    [
      { capacity: undefined, values: [ ] },
    ].forEach(testCase => {
      it(`Should correctly implement pushLeft(), popLeft(), isEmpty* for ${JSON.stringify(testCase)}`, () => {
        const { capacity, values } = testCase;
  
        const stack = capacity ? new DoubleStack(capacity) : new DoubleStack();
        expect(stack.isEmpty).toBeTruthy();
    
        values.forEach(value => stack.pushLeft(value));
        expect(stack.isEmpty).toBeTruthy();
      });
    });
  
    [
      { capacity: 0 },
      { capacity: 1 },
      { capacity: 2 },
    ].forEach(testCase => {
      it(`Should throw error when pushLeft() is invoked on full stack of capacity ${JSON.stringify(testCase)}`, () => {
        const { capacity } = testCase;
  
        const stack = new DoubleStack(capacity);
        expect(stack.isEmpty).toBeTruthy();
    
        new Array(capacity)
          .fill(null)
          .forEach((_, index) => stack.pushLeft(index));
        
        expect(() => stack.pushLeft(100)).toThrow();
      });
    });  
  });

  describe(`right stack`, () => {
    [
      { capacity: undefined, values: [ 1 ] },
      { capacity: undefined, values: [ 1, 2 ] },
      { capacity: undefined, values: [ 1, 2, 3 ] },
    ].forEach(testCase => {
      it(`Should correctly implement pushRight(), popRight(), isEmpty* for ${JSON.stringify(testCase)}`, () => {
        const { capacity, values } = testCase;

        const stack = capacity ? new DoubleStack(capacity) : new DoubleStack();
        expect(stack.isEmpty).toBeTruthy();
    
        values.forEach(value => stack.pushRight(value));
        expect(stack.isEmpty).toBeFalsy();
        expect(stack.isLeftEmpty).toBeTruthy();
    
        for (let index = values.length - 1; index >= 0; index--) {
          const popped = stack.popRight();
          expect(popped).toEqual(values[index]);
        }
        expect(stack.isEmpty).toBeTruthy();  
      });
    });

    [
      { capacity: undefined, values: [ ] },
    ].forEach(testCase => {
      it(`Should correctly implement pushRight(), popRight(), isEmpty* for ${JSON.stringify(testCase)}`, () => {
        const { capacity, values } = testCase;

        const stack = capacity ? new DoubleStack(capacity) : new DoubleStack();
        expect(stack.isEmpty).toBeTruthy();
    
        values.forEach(value => stack.pushRight(value));
        expect(stack.isEmpty).toBeTruthy();
      });
    });

    [
      { capacity: 0 },
      { capacity: 1 },
      { capacity: 2 },
    ].forEach(testCase => {
      it(`Should throw error when pushRight() is invoked on full stack of capacity ${JSON.stringify(testCase)}`, () => {
        const { capacity } = testCase;

        const stack = new DoubleStack(capacity);
        expect(stack.isEmpty).toBeTruthy();
    
        new Array(capacity)
          .fill(null)
          .forEach((_, index) => stack.pushRight(index));
        
        expect(() => stack.pushRight(100)).toThrow();
      });
    });
  });

  describe(`simultaneous stacks usage`, () => {
    it(`should pass an end-to-end test`, () => {
      const stack = new DoubleStack(5);
      expect(stack.isEmpty).toBeTruthy();

      stack.pushLeft(1);
      stack.pushRight(5);
      stack.pushLeft(2);
      stack.pushRight(4);
      stack.pushLeft(3);

      expect(stack.isLeftEmpty).toBeFalsy();
      expect(stack.isRightEmpty).toBeFalsy();

      expect(stack.popLeft()).toBe(3);
      expect(stack.popLeft()).toBe(2);
      expect(stack.popLeft()).toBe(1);
      expect(stack.popRight()).toBe(4);
      expect(stack.popRight()).toBe(5);

      expect(stack.isEmpty).toBeTruthy();
      expect(stack.isLeftEmpty).toBeTruthy();
      expect(stack.isRightEmpty).toBeTruthy();
    });

    it(`pushRight() should throw when violates lefts's boundaries`, () => {
      const stack = new DoubleStack(5);
      expect(stack.isEmpty).toBeTruthy();

      stack.pushLeft(1);
      stack.pushRight(5);
      stack.pushLeft(2);
      stack.pushRight(4);
      stack.pushLeft(3);

      expect(() => stack.pushRight(3)).toThrow();
    });
    
    it(`pushLeft() should throw when violates right's boundaries`, () => {
      const stack = new DoubleStack(5);
      expect(stack.isEmpty).toBeTruthy();

      stack.pushLeft(1);
      stack.pushRight(5);
      stack.pushLeft(2);
      stack.pushRight(4);
      stack.pushRight(3);

      expect(() => stack.pushLeft(3)).toThrow();
    });
  });
});

describe(SingleStack.name, () => {
  [
    { capacity: undefined, values: [ 1 ] },
    { capacity: undefined, values: [ 1, 2 ] },
    { capacity: undefined, values: [ 1, 2, 3 ] },
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
    { capacity: undefined, values: [ ] },
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