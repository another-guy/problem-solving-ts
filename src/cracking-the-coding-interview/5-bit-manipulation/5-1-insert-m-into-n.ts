export function insertMintoN(m: number, n: number, i: number, j: number): number {
  const allOnes = ~0;
  const highBitsMask = allOnes << (j + 1);
  const highBits = n & highBitsMask;

  const middleBits = m << i;

  const lowBitsMask = (1 << i) - 1;
  const lowBits = n & lowBitsMask;

  const insertionResult = highBits | middleBits | lowBits;
  return insertionResult;
}
