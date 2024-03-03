export class Timer {
  private readonly _times: Map<string, { key: string; start: number; value?: number }>;

  constructor() {
    this._times = new Map();
  }

  time(name: string) {
    this._times.set(name, {
      key: name,
      start: performance.now(),
    });
  }

  timeEnd(name: string) {
    const timeObj = this._times.get(name);
    if (!timeObj) {
      return console.warn(`No such name ${name}`);
    }

    timeObj.value = performance.now() - timeObj.start;
    // this._times.delete(name);
    this._times.set(name, timeObj);
    return timeObj;
  }

  clear() {
    this._times.clear();
  }

  allTimes() {
    console.log(this._times);
    return this._times;
  }

  keys() {
    return this._times.keys();
  }
}
