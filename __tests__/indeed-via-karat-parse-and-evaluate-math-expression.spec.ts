import {
  constructExpressionTree,
  getTokensFor,
  Token,
  Node,
} from '../src/real-interviews/indeed-via-karat-parse-and-evaluate-math-expression';

describe(getTokensFor.name, () => {
  [
    { inputString: '', expectedTokens: [] },
    { inputString: '(', expectedTokens: [ { type: 'bracket', value: '(' } ] },
    { inputString: ')', expectedTokens: [ { type: 'bracket', value: ')' } ] },
    { inputString: '+', expectedTokens: [ { type: 'operator', value: '+' } ] },
    { inputString: '-', expectedTokens: [ { type: 'operator', value: '-' } ] },
    { inputString: '0', expectedTokens: [ { type: 'number', value: 0 } ] },
    { inputString: '1', expectedTokens: [ { type: 'number', value: 1 } ] },
    { inputString: '1024', expectedTokens: [ { type: 'number', value: 1024 } ] },
    {
      inputString: '(1-20)+(300+4000)',
      expectedTokens: [
        { type: 'bracket', value: '(' },
        { type: 'number', value: 1 },
        { type: 'operator', value: '-' },
        { type: 'number', value: 20 },
        { type: 'bracket', value: ')' },
        { type: 'operator', value: '+' },
        { type: 'bracket', value: '(' },
        { type: 'number', value: 300 },
        { type: 'operator', value: '+' },
        { type: 'number', value: 4000 },
        { type: 'bracket', value: ')' },
      ],
    },
  ].forEach(({ inputString, expectedTokens }) => {
    it(`Should produce ${JSON.stringify(expectedTokens)} tokens for input: ${inputString}.`, () => {
      expect(getTokensFor(inputString)).toEqual(expectedTokens);
    });
  });
});

describe(constructExpressionTree.name, () => {
  const testCases: { inputTokens: Token[], expectedTree: Node<Token> }[] =
    [
      {
        inputTokens: undefined,
        expectedTree: undefined,
      },
      {
        inputTokens: null,
        expectedTree: undefined,
      },
      {
        inputTokens: [],
        expectedTree: undefined,
      },
      {
        inputTokens: [ { type: 'bracket', value:  '(' } ],
        expectedTree: { left: undefined, right: undefined, value: { type: 'bracket', value:  '(' } },
      },
      {
        inputTokens: [ { type: 'number', value: 1 } ],
        expectedTree: { left: undefined, right: undefined, value: { type: 'number', value: 1 } },
      },
      {
        inputTokens: [ { type: 'operator', value:  '-' } ],
        expectedTree: { left: undefined, right: undefined, value: { type: 'operator', value:  '-' } },
      },
      {
        inputTokens: [
          { type: 'number', value: 2 },
          { type: 'operator', value: '+' },
          { type: 'number', value: 3 },
        ],
        expectedTree: {
          left: { left: undefined, right: undefined, value: { type: 'number', value: 2 } },
          right: { left: undefined, right: undefined, value: { type: 'number', value: 3 } },
          value: { type: 'operator', value:  '+' },
        },
      },
      {
        inputTokens: [
          { type: 'bracket', value: '(' },
          { type: 'number', value: 2 },
          { type: 'operator', value: '+' },
          { type: 'number', value: 3 },
          { type: 'bracket', value: ')' },
        ],
        expectedTree: {
          left: { left: undefined, right: undefined, value: { type: 'number', value: 2 } },
          right: { left: undefined, right: undefined, value: { type: 'number', value: 3 } },
          value: { type: 'operator', value:  '+' },
        },
      },
    ];

  testCases.forEach(({ inputTokens, expectedTree }) => {
    it(`Should create the tree ${JSON.stringify(expectedTree)} for tokens ${JSON.stringify(inputTokens)}`, () => {
      expect(constructExpressionTree(inputTokens)).toEqual(expectedTree);
    });
  });
});