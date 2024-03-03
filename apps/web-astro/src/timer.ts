export class Timer {
  private readonly _times: Map<
    string,
    { key: string; start: [number, number]; value?: number }
  >;

  constructor() {
    this._times = new Map();
  }

  time(name: string) {
    this._times.set(name, {
      key: name,
      start: process.hrtime(),
    });
  }

  timeEnd(name: string) {
    const timeObj = this._times.get(name);
    if (!timeObj) {
      return console.warn(`No such name ${name}`);
    }
    const duration = process.hrtime(timeObj.start);
    timeObj.value = duration[0] * 1e3 + duration[1] * 1e-6;
    // this._times.delete(name);
    this._times.set(name, timeObj);
    console.log(this._times);
    return timeObj;
  }

  clear() {
    this._times.clear();
  }

  allTimes() {
    return this._times;
  }

  keys() {
    return this._times.keys();
  }
}
