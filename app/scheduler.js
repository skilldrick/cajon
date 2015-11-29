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
    //TODO: these need to be sorted
    this.notes = this.notes.concat(notes);
  }

  start(beginOffset, endOffset, loop = false) {
    const notes = this.notes.slice();
    let lastTime = getCurrentTime();
    let timeInBeats = 0;

    let i = 0;
    this.queuedNotes = [];

    const intervalFunc = () => {
      const now = getCurrentTime();
      const diff = now - lastTime;

      // If diff is greater than lookAhead, we've missed notes
      if (diff > this.lookAhead) {
        this.stop();
        throw new Error("Timer failed - did you change tabs?");
      }

      lastTime = now;
      timeInBeats = timeInBeats + diff / this.beatLength;

      const maxTime = now + this.lookAhead;

      while (notes[i]) {
        const note = notes[i];
        const noteOffsetFromNow = (note.beatOffset - timeInBeats) * this.beatLength;
        const noteTime = now + noteOffsetFromNow;

        if (noteTime > maxTime) {
          break;
        }

        this.queuedNotes.push(
          playSource(note.sample, noteTime)
        );

        console.log(note);
        i++;
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
