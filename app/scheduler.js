import {playSource} from './sounds.js';
import {mapField} from './utils.js';
import clock from 'sine/clock';
import {List} from 'immutable';

class Scheduler {
  constructor(bpm, notes) {
    this.setBpm(bpm);
    this.notes = List(notes).sortBy(note => note.beatOffset);
  }

  setBpm(bpm) {
    clock.setBpm(bpm);
  }

  start(beginOffset, length, loop = false) {
    let notes = this.limit(this.notes, beginOffset, beginOffset + length);

    let i = 0;
    this.queuedNotes = [];

    //beat, now, timeUntilBeat, this.beatLength
    //this.cb = (timeInBeats, now, maxTime) => {
    this.cb = (beat, now, timeUntilBeat, beatLength) => {
      while (notes.has(i)) {
        const note = notes.get(i);
        const noteOffsetFromNow = (note.beatOffset - beat) * beatLength;
        const noteTime = now + noteOffsetFromNow + timeUntilBeat;

        if (note.beatOffset >= beat + 1) {
          break;
        }

        this.queuedNotes.push(
          playSource(note.sample, noteTime)
        );

        console.log(note);
        i++;
      }

      // TODO: Don't need to do this, just modulo the beat number
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
