import Scheduler from './scheduler.js';
import {Range} from 'immutable';

class Metronome {
  constructor(bpm) {
    this.bpm = bpm;
    this.running = false;
    this.startTime = 0;
  }

  start() {
    this.scheduler = new Scheduler(this.bpm);

    var notes = Range(0, 16).map(i => {
      return {
        beatOffset: i,
        sample: 'rs2'
      };
    }).toArray();

    this.scheduler.addNotes(notes);
    this.scheduler.start(0, 16, true);
  }

  stop() {
    this.scheduler && this.scheduler.stop();
  }

  setBpm(bpm) {
    this.scheduler && this.scheduler.setBpm(bpm);
  }
}

module.exports = Metronome;
