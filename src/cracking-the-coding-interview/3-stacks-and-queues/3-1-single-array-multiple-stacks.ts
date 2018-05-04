/*
3.1 Describe how you could use a single array to implement three stacks.
*/

export class SingleStack {
  data: number[];
  topIndex: number = -1;

  constructor(capacity: number = 1024) {
    this.data = new Array(capacity).fill(null);
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
