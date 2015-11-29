import {playSource} from './sounds.js';
import {getCurrentTime} from './audio.js';

class Scheduler {
  constructor(bpm) {
    this.setBpm(bpm);
    this.notes = [];
    this.intervalTime = 100;
    this.lookAhead = this.intervalTime * 1.5 / 1000;
  }

  setBpm(bpm) {
    console.log(bpm);
    this.beatLength = 60 / bpm;
  }

  addNotes(notes) {
    this.notes = this.notes.concat(notes);
  }

  start(beginOffset, endOffset, loop = false) {
    let lastTime = getCurrentTime();
    let timeInBeats = 0;

    this.queuedNotes = [];

    const intervalFunc = () => {
      const now = getCurrentTime();
      const diff = now - lastTime;
      if (diff > this.lookAhead) {
        this.stop();
        throw new Error("Timer failed - did you change tabs?");
      }

      lastTime = now;
      timeInBeats = timeInBeats + diff / this.beatLength;

      let nextNote = this.notes[0];
      const maxTime = now + this.lookAhead;

      while (nextNote && (nextNote.offset - timeInBeats) * this.beatLength + now < maxTime) {
        this.queuedNotes.push(
          playSource(nextNote.sample, (nextNote.offset - timeInBeats) * this.beatLength + now)
        );
        this.notes.splice(0, 1);
        nextNote = this.notes[0];
      }
    };

    intervalFunc();
    this.interval = setInterval(intervalFunc, this.intervalTime);
  }

  stop() {
    clearInterval(this.interval);
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());
  }
}

module.exports = Scheduler;
