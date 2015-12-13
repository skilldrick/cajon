import {getCurrentTime} from './audio.js';
import {Set} from 'immutable';

class Clock {
  constructor() {
    console.log('constructing');
    this.beatLength = null;
    this.intervalTime = 100;
    this.lookAhead = this.intervalTime * 1.5 / 1000;
    this.callbacks = Set();
  }

  addCallback(cb) {
    this.callbacks = this.callbacks.add(cb);
  }

  removeCallback(cb) {
    this.callbacks = this.callbacks.remove(cb);
  }

  start() {
    this.stop();

    let previousTime = getCurrentTime();
    let timeInBeats = 0;

    const intervalFunc = () => {
      const now = getCurrentTime();
      const diff = now - previousTime;
      const diffInBeats = diff / this.beatLength;
      previousTime = now;

      // If diff is greater than lookAhead, we've missed notes
      if (diff > this.lookAhead) {
        this.stop();
        throw new Error("Timer failed - did you change tabs?");
      }

      timeInBeats += diffInBeats;

      const maxTime = now + this.lookAhead;

      for (let cb of this.callbacks) {
        cb(timeInBeats, now, maxTime);
      }
    };

    intervalFunc();
    this.interval = setInterval(intervalFunc, this.intervalTime);
  }

  stop() {
    clearInterval(this.interval);
  }

};

module.exports = new Clock();
