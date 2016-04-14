import { getCurrentTime } from 'sine/audio';
import Metronome from './metronome.js';
import Scheduler from './scheduler.js';

export default class Recorder {
  constructor(bpm, sampler) {
    this.running = false;
    this.startTime = 0;
    this.bpm = bpm;
    this.sampler = sampler;
  }

  startRecording() {
    this.running = true;
    this.startTime = getCurrentTime();
    this.notes = [];

    this.metronome && this.metronome.stop();
    this.metronome = new Metronome(this.bpm, this.sampler);
    this.metronome.start();
  }

  stop() {
    this.running = false;
    this.metronome.stop();
    this.scheduler && this.scheduler.stop();
  }

  addNote(sample) {
    const beatLength = 60 / this.bpm;
    if (this.running) {
      const offset = getCurrentTime() - this.startTime;
      const note = {
        beatOffset: offset / beatLength,
        sample
      };
      this.notes.push(note);
    }
  }

  play() {
    this.scheduler = new Scheduler(this.bpm, this.quantize(this.notes), this.sampler);
    this.scheduler.start(4, 4, true); // 4 beat intro, 4 beat loop
  }

  setBpm(bpm) {
    this.bpm = bpm;
    this.metronome && this.metronome.setBpm(bpm);
    this.scheduler && this.scheduler.setBpm(bpm);
  }

  mapField(arr, field, cb) {
    return arr.map(el => Object.assign({}, el, {
      [field]: cb(el[field])
    }));
  }

  quantize(notes) {
    const quantizeAmount = 8;
    return this.mapField(notes, 'beatOffset', beatOffset => {
      return Math.round(beatOffset * quantizeAmount) / quantizeAmount;
    });
  }
}
