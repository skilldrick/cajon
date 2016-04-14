import Scheduler from './scheduler.js';

class Metronome {
  constructor(bpm, sampler) {
    this.scheduler = new Scheduler(bpm, sampler);

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
