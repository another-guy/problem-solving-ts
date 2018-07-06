import twoSum from '../src/leet-code/1-easy/1-two-sum';

describe(twoSum.name, () => {
  [
    { nums: [1, 2], target: 3, expected: [0, 1] },
    { nums: [1, 2, 3], target: 4, expected: [0, 2] },
    { nums: [1, 2, 3], target: 5, expected: [1, 2] },
    { nums: [1, 2, 3], target: 3, expected: [0, 1] },
    { nums: [3, 3], target: 6, expected: [0, 1] },
  ].forEach(({ nums, target, expected}) => {
    it(`should return ${JSON.stringify({ expected })} for ${JSON.stringify({ nums })} and ${JSON.stringify({ target })}`, () => {
      expect(twoSum(nums, target)).toEqual(expected);
    });
  });
});
