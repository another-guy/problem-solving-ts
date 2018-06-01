import { IPriorityQueue } from '../src/practice/0-priority-queue';
import { DummyPriorityQueue } from '../src/practice/9-1-dummy-priority-queue';

describe(DummyPriorityQueue.name, () => {
  it(`Should pass a simple end-to-end test for max-priority first`, () => {
    const queue: IPriorityQueue<string> = new DummyPriorityQueue<string>();
    expect(queue.isEmpty()).toBeTruthy();
    expect(() => queue.peek()).toThrowError(`Can not 'peek()' into an empty queue.`);
    expect(() => queue.pop()).toThrowError(`Can not 'pop()' from an empty queue.`);

    queue.add(0, "Before last");
    queue.add(1000, "Very first");
    queue.add(500, "Somewhere in the middle");
    queue.add(0, "Very last");
    queue.add(1000, "Right after first");

    expect(queue.isEmpty()).toBeFalsy();

    expect(queue.peek()).toEqual("Very first");
    expect(queue.pop()).toEqual("Very first");
    expect(queue.peek()).toEqual("Right after first");
    expect(queue.pop()).toEqual("Right after first");
    expect(queue.peek()).toEqual("Somewhere in the middle");
    expect(queue.pop()).toEqual("Somewhere in the middle");
    expect(queue.peek()).toEqual("Before last");
    expect(queue.pop()).toEqual("Before last");
    expect(queue.peek()).toEqual("Very last");
    expect(queue.pop()).toEqual("Very last");

    expect(queue.isEmpty()).toBeTruthy();
  });

  it(`Should pass a simple end-to-end test for min-priority first`, () => {
    const queue: IPriorityQueue<string> = new DummyPriorityQueue<string>({ mode: 'min-first' });
    expect(queue.isEmpty()).toBeTruthy();
    expect(() => queue.peek()).toThrowError(`Can not 'peek()' into an empty queue.`);
    expect(() => queue.pop()).toThrowError(`Can not 'pop()' from an empty queue.`);

    queue.add(1000, "Before last");
    queue.add(0, "Very first");
    queue.add(500, "Somewhere in the middle");
    queue.add(1000, "Very last");
    queue.add(0, "Right after first");

    expect(queue.isEmpty()).toBeFalsy();

    expect(queue.peek()).toEqual("Very first");
    expect(queue.pop()).toEqual("Very first");
    expect(queue.peek()).toEqual("Right after first");
    expect(queue.pop()).toEqual("Right after first");
    expect(queue.peek()).toEqual("Somewhere in the middle");
    expect(queue.pop()).toEqual("Somewhere in the middle");
    expect(queue.peek()).toEqual("Before last");
    expect(queue.pop()).toEqual("Before last");
    expect(queue.peek()).toEqual("Very last");
    expect(queue.pop()).toEqual("Very last");

    expect(queue.isEmpty()).toBeTruthy();
  });
});
