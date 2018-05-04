/*
3.1 Describe how you could use a single array to implement three stacks.
*/

export const DEFAULT_STACK_CAPACITY = 1024;

export class DoubleStack {
  data: number[];
  topLeftIndex: number;
  topRightIndex: number;

  constructor(capacity: number = DEFAULT_STACK_CAPACITY) {
    this.data = new Array(capacity).fill(null);
    this.topLeftIndex = -1;
    this.topRightIndex = this.data.length;
  }

  get isEmpty(): boolean { return this.isLeftEmpty && this.isRightEmpty; }
  get isLeftEmpty(): boolean { return this.topLeftIndex === -1; }
  get isRightEmpty(): boolean { return this.topRightIndex === this.data.length; }

  pushLeft(value: number): void {
    if (this.unsafeToPush())
      throw new Error(`No space for push`);

    this.topLeftIndex++;
    this.data[this.topLeftIndex] = value;
  }

  popLeft(): number {
    if (this.isLeftEmpty)
      throw new Error(`Left stack is empty.`)

    const result = this.data[this.topLeftIndex];
    this.topLeftIndex--;
    return result;
  }

  pushRight(value: number): void {    
    if (this.unsafeToPush())
      throw new Error(`No space for push`);

    this.topRightIndex--;
    this.data[this.topRightIndex] = value;
  }

  popRight(): number {
    if (this.isRightEmpty)
      throw new Error(`Right stack is empty.`);
    
    const result = this.data[this.topRightIndex];
    this.topRightIndex++;
    return result;
  }

  private unsafeToPush(): boolean {
    return this.topLeftIndex + 1 === this.topRightIndex;
  }
}

export class SingleStack {
  data: number[];
  topIndex: number;

  constructor(capacity: number = DEFAULT_STACK_CAPACITY) {
    this.data = new Array(capacity).fill(null);
    this.topIndex = -1;
  }

  get isEmpty(): boolean {
    return this.topIndex === -1;
  }

  push(value: number): void {
    this.topIndex++;
    if (this.topIndex == this.data.length)
      throw new Error(`push(${value}): Index out of range. ${this.topIndex}, ${this.data.length - 1}`);
    this.data[this.topIndex] = value;
  }

  pop(): number {
    if (this.topIndex < 0)
      throw new Error(`Index out of range. ${this.topIndex}`);
    const value = this.data[this.topIndex];
    this.topIndex--;
    return value;
  }
}
