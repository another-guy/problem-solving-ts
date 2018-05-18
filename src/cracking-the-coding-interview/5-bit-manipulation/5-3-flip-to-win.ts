const NUMBER_OF_BITS_IN_NUMBER = 32;

export function flipToWin(numberToFlip: number): number {
  return numbersWithSingleZeroFlippedToOneIn(numberToFlip)
    .reduce(
      (subresult, flippedNumber) => Math.max(subresult, longestSequenceOfOnes(flippedNumber)),
      -1,
    );
}

export function numbersWithSingleZeroFlippedToOneIn(numberToFlip: number): number[] {
  const flippedNumbers: number[] = [];
  for (let shift = 0; shift < NUMBER_OF_BITS_IN_NUMBER; shift++)
  {
    const candidate = numberToFlip | (1 << shift);
    const isFlipped = candidate !== numberToFlip;
    if (isFlipped)
      flippedNumbers.push(candidate)
  }
  return flippedNumbers;
}

export function longestSequenceOfOnes(flippedNumber: number): number {
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
