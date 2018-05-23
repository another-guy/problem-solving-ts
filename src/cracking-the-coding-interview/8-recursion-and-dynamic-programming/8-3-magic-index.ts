export function magicIndex(
  array: number[],
  lowIndex: number = 0,
  highIndex = array.length - 1,
): number | null {
  if (!array.length) return null;

  if (lowIndex === highIndex) return array[lowIndex] === lowIndex ? lowIndex : null;

  const index = lowIndex + Math.floor((highIndex - lowIndex) / 2);
  const value = array[index];

  if (value === index) return index;
  else if (value < index) return magicIndex(array, index + 1, highIndex);
  else return magicIndex(array, lowIndex, index - 1);
}
