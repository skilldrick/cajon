import Scheduler from './scheduler.js';

class Metronome {
  constructor(bpm) {
    this.bpm = bpm;
    this.running = false;
    this.startTime = 0;
  }

  start() {
    var note = {
      beatOffset: 0,
      sample: 'rs2'
    };

    this.scheduler = new Scheduler(this.bpm, [note]);
    this.scheduler.start(0, 1, true);
  }

  stop() {
    this.scheduler && this.scheduler.stop();
  }

  setBpm(bpm) {
    this.scheduler && this.scheduler.setBpm(bpm);
  }
}

module.exports = Metronome;
