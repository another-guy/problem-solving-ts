/**
Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have ***exactly*** one solution, and you may not use the same element twice.

**Example:**

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
 */

var twoSum = function(nums: number[], target: number): number[] {
  const valuesAndIndices = nums.reduce((subResult, value, index) => {
    const indices = subResult[value];
    indices ? indices.push(index) : subResult[value] = [index];
    return subResult;
  }, { } as { [_: string]: number[] });

  const sortedNums = [...nums].sort((a, b) => a - b);
    
  const restoreOriginalIndex = (indexInSorted: number): number => valuesAndIndices[sortedNums[indexInSorted].toString()].shift() as number;

  let left = 0;
  let right = left + 1;
  while (true) {
    const sum = sortedNums[left] + sortedNums[right];
    if (sum === target) {
      return [ restoreOriginalIndex(left), restoreOriginalIndex(right) ];
    } else if (sum < target && right + 1 < sortedNums.length) {
      right += 1;
    } else {
      left += 1;
      right = left + 1;
    }
  }
}

var twoSumBruteForce = function(nums: number[], target: number): number[] {
  for (let left = 0; left < nums.length - 1; left++)
    for (let right = left + 1; right < nums.length; right++)
      if (nums[left] + nums[right] === target)
        return [left, right];
  throw new Error(`Cheaters!`);
};

export default twoSum;