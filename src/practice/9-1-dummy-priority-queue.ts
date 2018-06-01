import { IPriorityQueue } from './0-priority-queue';

export class DummyPriorityQueue<T> implements IPriorityQueue<T> {

  _underlyingStorage: { [priorityKey: string]: T[] } = {};

  isEmpty(): boolean {
    return Object.keys(this._underlyingStorage).length === 0;
  }

  add(priority: number, valueToInsert: T): void {
    const priorityKey = priority.toString();
    const values = this._underlyingStorage[priorityKey];
    if (values)
      values.push(valueToInsert);
    else
      this._underlyingStorage[priorityKey] = [ valueToInsert ];
  }

  peek(): T {
    if (this.isEmpty()) throw new Error(`Can not 'peek()' into an empty queue.`);
    const key = this.highestPriorityKey;
    const values = this._underlyingStorage[key];
    return values[0];
  }

  pop(): T {
    if (this.isEmpty()) throw new Error(`Can not 'pop()' from an empty queue.`);
    const key = this.highestPriorityKey;
    const values = this._underlyingStorage[key];
    const valueToReturn = values.shift();
    if (valueToReturn === undefined) throw new Error(`This should never happen.`);
    if (values.length === 0) delete this._underlyingStorage[key];
    return valueToReturn;
  }

  private get highestPriorityKey(): string {
    const keys = Object.keys(this._underlyingStorage);
    return keys[keys.length - 1];
  }

}
