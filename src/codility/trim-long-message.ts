/**
 * Trim message by max word count that will fit into allowed length.
 * @param message Message to trim; only consists of English alphabet characters and spaces.
 * @param maxLength Maximal allowed length of the message in characters.
 */
export function trimLongMessage(message: string, maxLength: number): string {
  if (!message) return '';

  const words = message.split(' ');
  let result = '';
  let remaining = maxLength;
  let index = 0;
  while (remaining > 0 && index < words.length) {
    const currentWord = words[index];

    if (result === '') {
      if (currentWord.length > remaining) break;

      result += currentWord;
      remaining -= currentWord.length;
    } else {
      if (currentWord.length + 1 > remaining) break;

      result += ' ' + currentWord;
      remaining -= (currentWord.length + 1);
    }

    index++;
  }
  
  return result;
};
