# Multiple stacks implemented via a linked lists on top of single fixed-size array

[javascript] [array] [interview-questions] [stack] [ecmascript-6]

# Problem Statement

Originally, the problem is defined in the book as following:
> Describe how you could use a single array to implement three stacks. — [Cracking the Coding Interview (6th edition)](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850)

After some consideration I decided to reshape it. Here is the generalized, yet more specific definition:

> **Implement a data structure `MultiStack` that uses a single array to implement arbitrary (N) number of stacks. `N` is known in advance for every instance of `MultiStack`.**

# Feedback I am looking for

Here's the list of things I am interested to hear back (**in order of significance**):

1. Design decisions and improvements (as in "better approach(es) performance- and memory-wise").
1. Code readability.
1. JavaScript (ES6) language idioms.
1. Whatever you find important to say that does not fall into three categories mentioned above.

# My approach, design, and implementation description

## Array-based single stack

Array-based implementations of stacks are very well known. A single stack is normally implemented as an array and an extra field that works as a "pointer to/index of the stack header". One of the array boundaries then works as a bottom of the stack. The other boundary of the array represents the end of available stack "memory".

Here's my sketch for how it works (forgive my handwriting).

[![single stack][1]][1]

## Array-based double-stack

We can also easily use a single array to implement two stacks. Each array boundary represents a bottom of a particular stack (if left boundary is the bottom of the first stack, the right boundary has to be the bottom of the second stack). The directions of growth for the two stacks will be opposite to each other. The end of the available array memory is detected when the two array headers are pointing to adjacent indices.

Here's the illustration:

[![double-stack][2]][2]

## Array-based N-stack

When we want to implement three or more stacks using a single array things become trickier. This is because we don't have a thing which will work as a clear bottom for the 3rd, 4th, and all the remaining stacks.

### Even memory allocation scheme

Of course, we could "allocate" arrays space to each of the stacks simply by evenly distributing the space segments among them. Say, if we have 4 stacks and an array of length 100, we could say: "Segment from 0 to 24 is dedicated to array #1; from 25 to 49 — to array #2; from 50 to 74 — to array #3; and the remaining 75 to 99 — to array #4". If I am not mistaken, this approach is taken in [this question, which is about exactly three stacks via a single array](https://codereview.stackexchange.com/questions/127075/three-stacks-in-a-single-array).

This certainly would work, but this is only a great solution for the case where _all the stacks are populated evenly_. However, _if one of the stacks is very long, and all the others are very short_, we can easily run out of memory for the first array. In general case, not knowing anything about the data, we should not assume this is a great strategy.

### Non-even memory allocation scheme

> NB: Below I'm using _virtual index_ in a sense of a "pointer" to a _data slot_/_memory slot_ or a location in the _virtual space_/_stack data_ (which are the same thing). Sorry for the inconsistent wording here.

Instead of that I decided to use a more dynamic, queue-based allocation technique.

The 0th element of the array is reserved for a _virtual index_-pointer to the next available memory slot. Next `push()` to any stack will result in data insertion to the pointed _virtual index_.

The next `N` elements of the array are reserved for a _virtual index_-pointer per stack. These are basically saying where the certain stack's head is.

The rest `m` (`m === data.length - N - 1`) array indices are used as a _virtual space_. The very first index of this section will have a "_physical_" value of `1+N`, and a "_virtual_" value of `0`. The next _virtual index_ (`1`) has a physical value of `1+N + 2`, and so forth. This is because a single _virtual index_ consists of two _physical_ indices. The first value is dedicated to a value hold by the stack entry; and the second value is a _virtual index_-pointer to the next element in the stack.

The illustration below should help understand what I am trying to say (in case the description is too vague):

[![multi-stack][3]][3]

A few more notes about this particular implementation.

* By default, the `nextFreeVirtualIndex` is pointing to the `0`, which is the very first available memory slot.
* The stack heads are initialized to `-1` which is an in indicator of stack being empty.
* On each `push()` the code has to properly pre-set the insertion position for the next `push()` operation. If the current insertion point's references any index, that index will be used (i.e. we're reusing a slot which was used and released at least once in past). If the current insertion point's reference is `undefined`, the code should use `insertionVirtualIndex + 1` which is the first memory slot that has never been used yet.
* `isFull()` is not applicable to a particular stack. Instead, a shared `outOfMemory()` can be used to determine whether we can push to any stack.

### Pros & cons

Pros:

* truly dynamic allocation of available memory space among the arbitrary number of arrays;
* therefore, a better fit for the case where a little is known about the stack data in advance;
* `push()` and `pop()`'s complexity have not changed. Both are still `O(1)`.

Cons:

* complex implementation, which makes the maintenance harder and potentially leads to bugs (especially if not tested properly);
* only a half of the memory space actually holds the stack data itself; the other half is "wasted" (spent on the queues/stacks' pointers, which is basically no-data).

# Code
    
    const DEFAULT_STACK_CAPACITY = 1024;
    const LENGTH_OF_VIRTUAL = 2;
    const RESERVED_COUNT = 1;
    
    class MultiStack {
    
      get nextFreeVirtualIndex() { return this.data[0]; }
      set nextFreeVirtualIndex(value) { this.data[0] = value; }
    
      getHeadVirtualIndex(stackNumber) { return this.data[stackNumber + RESERVED_COUNT - 1]; }
      setHeadVirtualIndex(stackNumber, virtualIndex) { return this.data[stackNumber + RESERVED_COUNT - 1] = virtualIndex; }
    
      getVirtual(virtualIndex) {
        const index = RESERVED_COUNT + this.numberOfStacks + virtualIndex * LENGTH_OF_VIRTUAL;
        return this.data.slice(index, index + LENGTH_OF_VIRTUAL + 1);
      }
      setVirtual(virtualIndex, values) {
        const index = RESERVED_COUNT + this.numberOfStacks + virtualIndex * LENGTH_OF_VIRTUAL;
        this.data.splice(index, LENGTH_OF_VIRTUAL, ...values);
      }
    
      constructor(
        numberOfStacks,
        capacity,
      ) {
        this.numberOfStacks = numberOfStacks;
        this.capacity = capacity || DEFAULT_STACK_CAPACITY;

        this.data = new Array(RESERVED_COUNT + this.numberOfStacks + this.capacity * LENGTH_OF_VIRTUAL);
        this.nextFreeVirtualIndex = 0;
        for (let stackNumber = 1; stackNumber <= this.numberOfStacks; stackNumber++) {
          this.setHeadVirtualIndex(stackNumber, -1);
        }
      }
    
      push(stackNumber, value) {
        if (this.outOfSpace) {
          throw new Error(`No more space available`);
        }
    
        const insertionVirtualIndex = this.nextFreeVirtualIndex;
        const [ _, afterNextFreeVirtualIndex ] = this.getVirtual(insertionVirtualIndex);
        const newNextFreeVirtualIndex = afterNextFreeVirtualIndex === undefined ? insertionVirtualIndex + 1 : afterNextFreeVirtualIndex;
    
        const currentHeadVirtualIndex = this.getHeadVirtualIndex(stackNumber);
        this.setVirtual(insertionVirtualIndex, [ value, currentHeadVirtualIndex ]);
        this.setHeadVirtualIndex(stackNumber, insertionVirtualIndex);
    
        this.nextFreeVirtualIndex = newNextFreeVirtualIndex;
      }
    
      pop(stackNumber) {
        if (this.isEmpty(stackNumber)) {
          throw new Error(`Nothing to pop`);
        }
    
        const retrievalVirtualIndex = this.getHeadVirtualIndex(stackNumber);
        const [ value, tailVirtualIndex ] = this.getVirtual(retrievalVirtualIndex);
        this.setHeadVirtualIndex(stackNumber, tailVirtualIndex);
    
        const freeVirtualIndex = this.nextFreeVirtualIndex;
        this.setVirtual(retrievalVirtualIndex, [ null, freeVirtualIndex ]);
        this.nextFreeVirtualIndex = retrievalVirtualIndex;
    
        return value;
      }
    
      isEmpty(stackNumber) {
        return this.getHeadVirtualIndex(stackNumber) === -1;
      }
    
      get outOfSpace() {
        return this.nextFreeVirtualIndex === this.capacity;
      }
    
      printState(prefix) {
        console.info(`\n${prefix}:\n${JSON.stringify(this.data)}`);
      }
    
    }
    
# End-to-end test

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
    
---

**Update 1 | 2018-05-10 | to Sumurai8**

Even though it was a TypeScript code originally, I'd like it to be reviewed as ES6 (and I keep correcting the syntactic issues to ensure the question is valid). I also indicated ES6 in both "Feedback" section and in tags.

---

Your idea with buckets is a **brilliant** way to balance between the rigid upfront-allocated segments I described in "Even memory allocation scheme" on one hand and the bookkeeping-costly linked lists I am using in my code. Thank you so much for showing that! This is the most valuable part of the feedback!!

---

The end-to-end test was not meant to be exhaustive. Unit testing can be dome much more thoroughly here. It just was not my goal (rather, to illustrate how the things work).

If I had written the code as TypeScript I still would NOT mark `data` array as `private`. With data structure implementations I really want the internals to be directly available for observation from test — I'm very firm, it's **fine** to have internals open this way for consumption in tests. (I'm in agreement with Mark Seemann's thoughts on [structural inspection _not necessarily_ breaking encapsulation](http://blog.ploeh.dk/2013/04/04/structural-inspection/)).

Nevertheless, in real production code (if at all) I would add `IMultiStack` interface and use it everywhere to access the `MultiStack`. This is to prevent the accidental undesirable data access by the consumer.

---

Sorry @Sumurai8, I'm not accepting cheating here. I agree it's definitely an option in the real world, but as a coding exercise, we are supposed to pretend that the array is pretty much all we have for storing the complete stack data. I haven't made it explicit in the problem statement, which is **my fault**. Otherwise, your idea is what we probably would do without much thinking. :)

---

I really hate comments in code big time, but this is the case I totally agree that your confusion is an indicator of code readability issue. Comments would help (at cost of maintenance burden).

Long lines are not a big problem on large monitors, but it is indeed possible to soften the issue at least by using proper line return positions. I don't like unnecessary `{` and `}` as well as `(` and `)`...

Thanks for pointing out the style issues.

  [1]: https://i.stack.imgur.com/W0QNt.jpg
  [2]: https://i.stack.imgur.com/2yYsi.jpg
  [3]: https://i.stack.imgur.com/ECdb9.jpg