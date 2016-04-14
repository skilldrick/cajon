import Scheduler from './scheduler.js';

class Metronome {
  constructor(bpm, sampler) {
    this.bpm = bpm;
    this.running = false;
    this.scheduler = new Scheduler(this.bpm, sampler);

    var note = {
      beatOffset: 0,
      sample: 'rs2'
    };

    this.scheduler.setNotes([note]);
  }

  start() {
    this.scheduler.start(0, 1, true);
  }

  stop() {
    this.scheduler.stop();
  }

  setBpm(bpm) {
    this.scheduler.setBpm(bpm);
  }
}

module.exports = Metronome;
