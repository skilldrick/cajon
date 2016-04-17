import Scheduler from 'sine/scheduler';
import _ from 'lodash';

// A Scheduler that plays samples using the supplied sampler
export default class SamplerScheduler extends Scheduler {
  constructor(bpm, sampler) {
    super(bpm, (note, when) => {
      this.queuedNotes.push(
        sampler.play(note.sample, when)
      );
    });
  }

  start() {
    this.queuedNotes = [];
    super.start();
  }

  stop() {
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());
    super.stop();
  }
}
