import { insertMintoN } from '../src/cracking-the-coding-interview/5-bit-manipulation/5-1-insert-m-into-n';

function titleFor(
  nNumber: number,
  nBits: string,
  mNumber: number,
  mBits: string,
  i: number,
  j: number,
  expectedNumber: number,
  expectedBits: string,
): string {
  return `Should return ${expectedNumber} (${expectedBits}) for ${mNumber} (${mBits}) inserted into ${nNumber} (${nBits}) from ${i} to ${j}`;
}

describe(insertMintoN.name, () => {
  [
    { n: '10000000000', m: '10011', i: 2, j: 6, expectedNumber: 1100 },
    { n: 1024, m: 19, i: 2, j: 6, expectedNumber: 1100 },
    { n: 1198, m: 20, i: 2, j: 6, expectedNumber: 1234 },
  ].forEach(({ n, m, i, j, expectedNumber }) => {
    const numberFrom = v => ((typeof v === 'number') ? v : Number.parseInt(v, 2)) >>> 0;
    const bitsFrom = v => (typeof v === 'string') ? v : v.toString(2);
    const nNumber = numberFrom(n);
    const mNumber = numberFrom(m);
    const nBits = bitsFrom(n);
    const mBits = bitsFrom(m);
    const expectedBits = bitsFrom(expectedNumber);
    it(titleFor(nNumber, nBits, mNumber, mBits, i, j, expectedNumber, expectedBits), () => {
      expect(insertMintoN(mNumber, nNumber, i, j)).toEqual(expectedNumber);
    });
  });
});