export function parseEvaluate(expression: string): number {
  const tokens = getTokensFor(expression);
  const expressionTree = constructExpressionTree(tokens);
  return evaluate(expressionTree);
}

export type TokenType = 'number' | 'operator' | 'bracket';

export interface Token {
  type: TokenType;
  value: any;
}

export interface Node<T> {
  left: Node<T> | undefined;
  right: Node<T> | undefined;
  value: T;
}

export function getTokensFor(expression: string = ''): Token[] {
  if (!expression) return [];

  const expressionParts: string[] = [];
  const expressionCharacters = expression.split('');

  const isNumeric = (char: string) => char >= '0' && char <= '9';
  const isOperator = (char: string) => ['(', ')', '+', '-'].indexOf(char) >= 0;
  const pushExpressionPart = (part: string) => { if (part) expressionParts.push(part); };
  let part = '';
  for (
    let charIndex = 0;
    charIndex < expressionCharacters.length;
    charIndex++
  ) {
    const char = expressionCharacters[charIndex];
    if (isOperator(char)) {
      pushExpressionPart(char);
      part = '';
    } else if (isNumeric(char)) {
      part += char;
      if (charIndex === (expressionCharacters.length - 1) || !isNumeric(expressionCharacters[charIndex + 1])) {
        pushExpressionPart(part);
      }
    } else {
      throw new Error(`Unexpected character at position ${charIndex}: ${JSON.stringify(char)}`);
    }
  }

  return expressionParts.map<Token>(part => {
    if (part === '(' || part === ')')
      return { type: 'bracket', value: part };
    else if (part === '+' || part === '-')
      return { type: 'operator', value: part };
    else if (part.split('').every(isNumeric))
      return { type: 'number', value: Number.parseInt(part) };
    else
      throw new Error(`Unrecognized token ${part}`);
  });
}

export function constructExpressionTree(tokens: Token[]): Node<Token> | undefined {
  if (!tokens || !tokens.length)
    return undefined;
  else if (tokens.length === 1)
    return { left: undefined, right: undefined, value: tokens[0] };
  else {
    const [ currentToken, ...tokensAfterFirst ] = tokens;
    if (currentToken.type === 'operator') {
      throw new Error(`operator was unexpected`);
    } else if (currentToken.type === 'number') {
      return {
        left: constructExpressionTree([currentToken]),
        right: constructExpressionTree(tokensAfterFirst.slice(1)),
        value: tokensAfterFirst[0],
      };
    } else if (currentToken.type === 'bracket') {
      if (currentToken.value !== '(') throw new Error(`This bracket is supposed to be ab opening one`);
      const positionOfClosingMatch = getPositionOfClosingMatch(tokens);
      const subexpression = tokens.slice(1, positionOfClosingMatch);
      const operator = tokens.slice(positionOfClosingMatch + 1, positionOfClosingMatch + 2)[0] || '+';
      const restOfTokens = tokens.slice(positionOfClosingMatch + 2) || '0';
      return {
        left: constructExpressionTree(subexpression),
        right: constructExpressionTree(restOfTokens),
        value: operator,
      };
    } else {
      throw new Error(`Unrecognized token: ${JSON.stringify(currentToken)}`);
    }

    // const [ currentToken, ...remainingTokens ] = tokens;
    // if (currentToken.type === 'bracket') {

    // } else if (currentToken.type === 'number') {
    //   const [ operator,  ] = remainingTokens;
    // } else if (currentToken.type === 'operator') {
    //   throw new Error(`Did not expect to see 'operator'`);
    // } else {
    //   throw new Error(`Unexpected token type ${currentToken.type}`);
    // }
  }
}

export function getPositionOfClosingMatch(tree: Token[]): number {
  // ...
}

export function evaluate(tree: Node<Token> | undefined): number {
  throw new Error(`Not implemented`);
}
