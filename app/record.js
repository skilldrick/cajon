import {getCurrentTime} from './audio.js';
import {playNotes} from './sounds.js';
import Metronome from './metronome.js';

class Recorder {
  constructor() {
    this.running = false;
    this.startTime = 0;
  }

  start() {
    this.running = true;
    this.startTime = getCurrentTime();
    this.notes = [];

    this.metronome && this.metronome.stop();
    this.metronome = new Metronome(120);
    this.metronome.start();
  }

  stop() {
    this.running = false;
    this.metronome.stop();
  }

  addNote(sample) {
    if (this.running) {
      const note = {
        offset: getCurrentTime() - this.startTime,
        sample
      };
      this.notes.push(note);
    }
  }

  play() {
    playNotes(this.notes);
  }

  setBpm(bpm) {
    this.metronome && this.metronome.setBpm(bpm);
  }
}

module.exports = {Recorder};
