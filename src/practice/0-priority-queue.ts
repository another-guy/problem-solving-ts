export interface IPriorityQueue<T> {
  isEmpty(): boolean;
  add(priority: number, value: T): void;
  peek(): T;
  pop(): T;
}
