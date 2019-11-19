/**
Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

**Example 1**:

**Input**: "III"
**Output**: 3

**Example 2:**

**Input**: "IV"
**Output**: 4

**Example 3:**

**Input**: "IX"
**Output**: 9

**Example 4:**

**Input**: "LVIII"
**Output**: 58
**Explanation**: L = 50, V= 5, III = 3.

**Example 5:**

**Input**: "MCMXCIV"
**Output**: 1994
**Explanation**: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

type Action = { result: number, skipNext: boolean };
type Transitions = { [next: string]: Action };
type StateMachine = { [current: string]: Transitions };

export const stateMachine: StateMachine = {
  'I': {
    'V': { result: 4, skipNext: true },
    'X': { result: 9, skipNext: true },
    '.': { result: 1, skipNext: false },
  },
  'V': {
    '.': { result: 5, skipNext: false },
  },
  'X': {
    'L': { result: 40, skipNext: true },
    'C': { result: 90, skipNext: true },
    '.': { result: 10, skipNext: false },
  },
  'L': {
    '.': { result: 50, skipNext: false },
  },
  'C': {
    'D': { result: 400, skipNext: true },
    'M': { result: 900, skipNext: true },
    '.': { result: 100, skipNext: false },
  },
  'D': {
    '.': { result: 500, skipNext: false },
  },
  'M': {
    '.': { result: 1000, skipNext: false },
  },
};

export const romanToInt = function(roman: string): number {
  if (!roman || !roman.length) throw new Error(`${roman} is not a Roman number.`);

  const queue = roman.toUpperCase().split('');
  let result = 0;
  while (queue.length) {
    const current = queue.shift()!;
    const transitions = stateMachine[current];
    const next = queue[0];
    const transition = transitions[next] || transitions['.'];
    result += transition.result;
    if (transition.skipNext && queue.length)
      queue.shift();
  }
  return result;
};
