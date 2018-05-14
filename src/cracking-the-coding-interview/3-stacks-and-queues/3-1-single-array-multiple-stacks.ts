/*
3.1 Describe how you could use a single array to implement three stacks.
*/

export const DEFAULT_STACK_CAPACITY = 1024;

export class MultiStack {
  data: number[];

  readonly LENGTH_OF_VIRTUAL = 2;
  readonly RESERVED_COUNT = 1;
  get nextFreeVirtualIndex(): number { return this.data[0]; }
  set nextFreeVirtualIndex(value: number) { this.data[0] = value; }

  getHeadVirtualIndex(stackNumber: number) { return this.data[stackNumber + this.RESERVED_COUNT - 1]; }
  setHeadVirtualIndex(stackNumber: number, virtualIndex: number) { return this.data[stackNumber + this.RESERVED_COUNT - 1] = virtualIndex; }

  private getVirtual(virtualIndex: number): number[] {
    const index = this.RESERVED_COUNT + this.numberOfStacks + virtualIndex * this.LENGTH_OF_VIRTUAL;
    return this.data.slice(index, index + this.LENGTH_OF_VIRTUAL + 1);
  }

  private setVirtual(virtualIndex: number, values: number[]): void {
    const index = this.RESERVED_COUNT + this.numberOfStacks + virtualIndex * this.LENGTH_OF_VIRTUAL;
    this.data.splice(index, this.LENGTH_OF_VIRTUAL, ...values);
  }

  constructor(
    private numberOfStacks: number,
    private capacity: number = DEFAULT_STACK_CAPACITY,
  ) {
    this.data = new Array(this.RESERVED_COUNT + this.numberOfStacks + this.capacity * this.LENGTH_OF_VIRTUAL);
    this.nextFreeVirtualIndex = 0;
    for (let stackNumber = 1; stackNumber <= this.numberOfStacks; stackNumber++) {
      this.setHeadVirtualIndex(stackNumber, -1);
    }
  }

  printState(prefix: string): void {
    console.info(`\n${prefix}:\n${JSON.stringify(this.data)}`);
  }

  push(stackNumber: number, value: number): void {
    if (this.outOfSpace) {
      throw new Error(`No more space available`);
    }

    const insertionVirtualIndex = this.nextFreeVirtualIndex;
    const [ _1, afterNextFreeVirtualIndex ] = this.getVirtual(insertionVirtualIndex);
    const newNextFreeVirtualIndex = afterNextFreeVirtualIndex === undefined ? insertionVirtualIndex + 1 : afterNextFreeVirtualIndex;

    const currentHeadVirtualIndex = this.getHeadVirtualIndex(stackNumber);
    this.setVirtual(insertionVirtualIndex, [ value, currentHeadVirtualIndex ]);
    this.setHeadVirtualIndex(stackNumber, insertionVirtualIndex);

    this.nextFreeVirtualIndex = newNextFreeVirtualIndex;
  }

  pop(stackNumber: number): number {
    if (this.isEmpty(stackNumber)) {
      throw new Error(`Nothing to pop`);
    }

    const retrievalVirtualIndex = this.getHeadVirtualIndex(stackNumber);
    const [ value, tailVirtualIndex ] = this.getVirtual(retrievalVirtualIndex);
    this.setHeadVirtualIndex(stackNumber, tailVirtualIndex);

    const freeVirtualIndex = this.nextFreeVirtualIndex;
    this.setVirtual(retrievalVirtualIndex, [ <any>null, freeVirtualIndex ]);
    this.nextFreeVirtualIndex = retrievalVirtualIndex;

    return value;
  }

  isEmpty(stackNumber: number): boolean {
    return this.getHeadVirtualIndex(stackNumber) === -1;
  }

  get outOfSpace(): boolean {
    return this.nextFreeVirtualIndex === this.capacity;
  }

}

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
