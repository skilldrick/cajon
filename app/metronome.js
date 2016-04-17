import SamplerScheduler from './sampler_scheduler.js';

export default class Metronome {
  constructor(bpm, sampler) {
    this.scheduler = new SamplerScheduler(bpm, sampler);

    const notes = [
      { beatOffset: 0, sample: 'rs5' },
      { beatOffset: 1, sample: 'rs2' },
      { beatOffset: 2, sample: 'rs2' },
      { beatOffset: 3, sample: 'rs2' }
    ];

    this.scheduler.addLoop(4, notes);
  }

  start() {
    this.scheduler.start();
  }

  stop() {
    this.scheduler.stop();
  }

  setBpm(bpm) {
    this.scheduler.setBpm(bpm);
  }
}
