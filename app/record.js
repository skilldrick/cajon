import { getCurrentTime } from 'sine/audio';
import Metronome from './metronome.js';
import SamplerScheduler from './sampler_scheduler.js';

export default class Recorder {
  constructor(bpm, sampler) {
    this.running = false;
    this.startTime = 0;
    this.bpm = bpm;

    this.metronome = new Metronome(this.bpm, sampler);
    this.scheduler = new SamplerScheduler(this.bpm, sampler);
  }

  startRecording() {
    this.running = true;
    this.startTime = getCurrentTime();
    this.notes = [];

    this.metronome.stop();
    this.metronome.start();
  }

  stop() {
    this.running = false;
    this.metronome.stop();
    this.scheduler.stop();
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());
  }

  addNote(sample) {
    const beatLength = 60 / this.bpm;
    const preRoll = (beatLength * 4);
    if (this.running) {
      const offset = getCurrentTime() - this.startTime - preRoll;
      const note = {
        beatOffset: offset / beatLength,
        sample
      };
      this.notes.push(note);
    }
  }

  play() {
    this.queuedNotes = [];
    this.scheduler.stop();
    this.scheduler.clearLoops();
    this.scheduler.addLoop(4, this.quantize(this.notes));

    this.scheduler.start();
  }

  setBpm(bpm) {
    this.bpm = bpm;
    this.metronome.setBpm(bpm);
    this.scheduler.setBpm(bpm);
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
