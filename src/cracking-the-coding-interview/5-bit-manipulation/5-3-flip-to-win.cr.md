# Find the longest length of sequence of 1-bits achievable by flipping a single bit from 0 to 1 in a number

[javascript] [interview-questions] [bitwise]

See on [CodeReview StackExchange](https://codereview.stackexchange.com/questions/194733/find-the-longest-length-of-sequence-of-1-bits-achievable-by-flipping-a-single-bi)

# Problem Statement

The problem is defined in the book as following:
> 5.3 You have an integer and you can flip exactly one bit from `0` to `1`.
> Write code to find the length of the longest sequence of `1`s you could create.
> 
> EXAMPLE
>
> Input `1775` (or: `11011101111`)
>
> Output `8`
>
> — [Cracking the Coding Interview (6th edition)](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850)

# Feedback I am looking for

Here's the list of things I am interested to hear back (**in order of significance**):

1. Design decisions and improvements (as in "better approach(es) performance- and memory-wise").
1. Code readability.
1. JavaScript (ES6) language idioms.
1. Whatever you find important to say that does not fall into three categories mentioned above.

# My approach, design, implementation, and performance description

Both time and space complexity of the solution is `O(n)`, where `n` is the total count of bits in a bit representation of the integer number. However, I feel there might be some smart approach (or a "trick") that improves the solution.

My code basically consists of three parts.

 1. `numbersWithSingleZeroFlippedToOneIn(n)` function attempts to set a single bit to `1` via bitwise or (`|`) operator with a `1` shifted to every possible position. If the result of that `|` application to `n` does not equal to `n` itself, it means the bit has changed the state from `0` to `1` and the resulting number should be used in the next step.
 1. The numbers from the previous steps are iterated through via `reduce()` function. The seed value is set to `-1` which indicates an "unknown" maximal length of sequence of `1`s (which is determined by making a call to `longestSequenceOfOnes(n)`.
 1. The `longestSequenceOfOnes(n)` function slides from one side of the bit array to another and increments the sequence length by 1 for each observed `1`-bit; or resets the sequence length to `0` when a `0`-bit is observed. The code actually explains this part better...

# Code
    
    const NUMBER_OF_BITS_IN_NUMBER = 32;

    function flipToWin(numberToFlip) {
      return numbersWithSingleZeroFlippedToOneIn(numberToFlip)
        .reduce(
          (subresult, flippedNumber) => Math.max(subresult, longestSequenceOfOnes(flippedNumber)),
          -1,
        );
    }

    function numbersWithSingleZeroFlippedToOneIn(numberToFlip) {
      const flippedNumbers = [];
      for (let shift = 0; shift < NUMBER_OF_BITS_IN_NUMBER; shift++)
      {
        const candidate = numberToFlip | (1 << shift);
        const isFlipped = candidate !== numberToFlip;
        if (isFlipped)
          flippedNumbers.push(candidate)
      }
      return flippedNumbers;
    }

    function longestSequenceOfOnes(flippedNumber) {
      let longestSequence = 0;
      let currentSequence = 0;
      for (let position = 0; position < NUMBER_OF_BITS_IN_NUMBER; position++) {
        const isBitInPositionSet = flippedNumber & (1 << position);
        if (isBitInPositionSet) {
          currentSequence += 1;
        } else {
          longestSequence = Math.max(longestSequence, currentSequence);
          currentSequence = 0;
        }
      }
      longestSequence = Math.max(longestSequence, currentSequence);

      return longestSequence;
    }

# Unit tests

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

