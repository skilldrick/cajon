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
    this.beatLength = 60 / bpm;
  }

  addNotes(notes) {
    //TODO: these need to be sorted
    this.notes = this.notes.concat(notes);
  }

  start(beginOffset, endOffset, loop = false) {
    let notes = this.limit(this.notes, beginOffset, endOffset);
    let previousTime = getCurrentTime();
    let timeInBeats = 0;

    let i = 0;
    this.queuedNotes = [];

    const intervalFunc = () => {
      const now = getCurrentTime();
      const diff = now - previousTime;
      const diffInBeats = diff / this.beatLength;
      previousTime = now;

      // If diff is greater than lookAhead, we've missed notes
      if (diff > this.lookAhead) {
        this.stop();
        throw new Error("Timer failed - did you change tabs?");
      }

      timeInBeats += diffInBeats;

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

      // Once we've gone through all notes, shift them forward by loop length
      if (i === notes.length) {
        notes = this.shift(notes, endOffset - beginOffset);
        i = 0;
      }
    };

    intervalFunc();
    this.interval = setInterval(intervalFunc, this.intervalTime);
  }

  stop() {
    clearInterval(this.interval);
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());
  }

  shift(notes, offset) {
    return notes.map(note => Object.assign({}, note, {
      beatOffset: note.beatOffset + offset
    }));
  }

  limit(notes, begin, end) {
    return this.shift(notes.filter(note =>
      note.beatOffset >= begin && note.beatOffset < end
    ), -begin);
  }
}

module.exports = Scheduler;
