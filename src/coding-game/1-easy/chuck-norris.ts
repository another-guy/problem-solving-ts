/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// var MESSAGE = '';

export function asBitSequence(text: string): string {
  return text
    .split('')
    .map(chr => chr.charCodeAt(0))
    .map(num => num.toString(2))
    .map(str => new Array(7 - str.length).fill('0').join('') + str)
    .join('');
}

export function splitIntoGroups(bitSequence: string): { g: string, c: number }[] {
  const groups: { g: string, c: number }[] = [];
  let index = 0;
  let group = bitSequence[index];
  let groupLen = 1;
  while (true) {
    index++;
    if (index >= bitSequence.length) {
      groups.push({ g: group, c: groupLen });
      break;
    }

    if (group == bitSequence[index]) {
      groupLen++;
    } else {
      groups.push({ g: group, c: groupLen });
      group = bitSequence[index];
      groupLen = 1;
    }
  }
  return groups;
}

function encodedBits(group: string, count: number): string {
  const prefix = group === '1' ? '0' : '00';
  const suffix = new Array(count).fill('0').join('');
  return `${prefix} ${suffix}`;
}

const MESSAGE = 'Some input!';
const text = splitIntoGroups(asBitSequence(MESSAGE))
  .map(({ g, c }) => encodedBits(g, c))
  .join(' ');

// print(text);
