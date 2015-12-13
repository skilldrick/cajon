import {playSource} from './sounds.js';
import {mapField} from './utils.js';
import clock from './clock.js';
import {List} from 'immutable';

class Scheduler {
  constructor(bpm, notes) {
    this.setBpm(bpm);
    this.notes = List(notes).sortBy(note => note.beatOffset);
  }

  setBpm(bpm) {
    this.beatLength = 60 / bpm;
    clock.beatLength = this.beatLength;
  }

  start(beginOffset, length, loop = false) {
    let notes = this.limit(this.notes, beginOffset, beginOffset + length);

    let i = 0;
    this.queuedNotes = [];

    this.cb = (timeInBeats, now, maxTime) => {
      while (notes.has(i)) {
        const note = notes.get(i);
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

      if (loop) {
        // Once we've gone through all notes, shift them forward by loop length
        if (i === notes.size) {
          notes = this.shift(notes, length);
          i = 0;
        }
      }
    }

    clock.addCallback(this.cb);
    clock.start();
  }

  stop() {
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());

    clock.removeCallback(this.cb);
    clock.stop();
  }

  shift(notes, offset) {
    return mapField(notes, 'beatOffset', beatOffset => beatOffset + offset);
  }

  limit(notes, begin, end) {
    return this.shift(notes.filter(note =>
      note.beatOffset >= begin && note.beatOffset < end
    ), -begin);
  }
}

module.exports = Scheduler;
