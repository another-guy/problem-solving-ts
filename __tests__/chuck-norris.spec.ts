import { asBitSequence, splitIntoGroups } from '../src/coding-game/1-easy/chuck-norris';

describe(`ChuckNorris`, () => {
  describe(asBitSequence.name, () => {
    [
      { input: '!', output: '0100001' },
      { input: 'a', output: '1100001' },
      { input: 'z', output: '1111010' },
      { input: 'A', output: '1000001' },
      { input: 'Z', output: '1011010' },
      { input: '!azAZ', output: '01000011100001111101010000011011010' },
    ].forEach(({ input, output }) => {
      it(`Should return ${JSON.stringify(output)} for ${input}`, () => {
        expect(asBitSequence(input)).toEqual(output);
      });
    });
  });

  describe(splitIntoGroups.name, () => {
    [
      { input: '0100001', output: [{g:"0", c:1}, {g:"1", c:1}, {g:"0", c:4}, {g:"1", c:1}] },
      { input: '1100001', output: [{g:"1", c:2}, {g:"0", c:4}, {g:"1", c:1}] },
      { input: '1111010', output: [{g:"1", c:4}, {g:"0", c:1}, {g:"1", c:1}, {g:"0", c:1}] },
      { input: '1000001', output: [{g:"1", c:1}, {g:"0", c:5}, {g:"1", c:1}] },
      { input: '1011010', output: [{g:"1", c:1}, {g:"0", c:1}, {g:"1", c:2}, {g:"0", c:1}, {g:"1", c:1}, {g:"0", c:1}] },
      { input: '01000011100001111101010000011011010', output: [{g:"0", c:1}, {g:"1", c:1}, {g:"0", c:4}, {g:"1", c:3}, {g:"0", c:4}, {g:"1", c:5}, {g:"0", c:1}, {g:"1", c:1}, {g:"0", c:1}, {g:"1", c:1}, {g:"0", c:5}, {g:"1", c:2}, {g:"0", c:1}, {g:"1", c:2}, {g:"0", c:1}, {g:"1", c:1}, {g:"0", c:1}] },
    ].forEach(({ input, output }) => {
      it(`Should return ${JSON.stringify(output)} for ${input}`, () => {
        expect(splitIntoGroups(input)).toEqual(output);
      });
    });
  });
});
