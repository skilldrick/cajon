import {getCurrentTime} from './audio.js';
import {playNotes} from './sounds.js';
import {mapField} from './utils.js';
import Metronome from './metronome.js';
import Scheduler from './scheduler.js';

class Recorder {
  constructor() {
    this.running = false;
    this.startTime = 0;
    this.bpm = 120;
  }

  start() {
    this.running = true;
    this.startTime = getCurrentTime();
    this.notes = [];

    this.metronome && this.metronome.stop();
    this.metronome = new Metronome(this.bpm);
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
    this.scheduler = new Scheduler(this.bpm, this.quantize(this.notes));
    this.scheduler.start(4, 4, true);
  }

  setBpm(bpm) {
    this.metronome && this.metronome.setBpm(bpm);
    this.scheduler && this.scheduler.setBpm(bpm);
  }

  quantize(notes) {
    const quantizeAmount = 8;
    return mapField(notes, 'beatOffset', beatOffset => {
      return Math.round(beatOffset * quantizeAmount) / quantizeAmount;
    });
  }
}

module.exports = {Recorder};
