import {getCurrentTime} from './audio.js';
import {playNotes} from './sounds.js';

class Recorder {
  constructor() {
    this.running = false;
    this.startTime = 0;
  }

  start() {
    this.running = true;
    this.startTime = getCurrentTime();
    this.notes = [];
    console.log('start');
  }

  stop() {
    this.running = false;
    console.log('stop');
    console.log(this.notes);
  }

  addNote(sample) {
    if (this.running) {
      const note = {
        offset: getCurrentTime() - this.startTime,
        sample
      };
      console.log(note);
      this.notes.push(note);
    }
  }

  play() {
    playNotes(this.notes);
  }
}

module.exports = {Recorder};
