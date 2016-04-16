import clock from 'sine/clock';

export default class Scheduler {
  constructor(bpm, sampler) {
    this.setBpm(bpm);
    this.sampler = sampler;
  }

  // Currently just overwrites existing notes
  setNotes(notes) {
    this.partitionedNotes = this.partition(notes);
  }

  partition(notes) {
    const partitioned = [];
    notes.forEach(note => {
      const partition = Math.floor(note.beatOffset);
      if (!partitioned[partition]) {
        partitioned[partition] = [];
      }
      partitioned[partition].push(note);
    });

    return partitioned;
  }

  setBpm(bpm) {
    clock.setBpm(bpm);
  }

  start(beginOffset, length, loop = false) {
    this.queuedNotes = [];

    this.cb = (beat, when, beatLength) => {
      // Calculate beat within loop
      const loopBeat = loop ? beat % length + beginOffset : beat;
      const notes = this.partitionedNotes[loopBeat];

      notes && notes.forEach(note => {
        this.queuedNotes.push(
          this.sampler.play(note.sample, when(note.beatOffset - loopBeat))
        );

        console.log(note);
      })
    };

    clock.addCallback(this.cb);
    clock.start();
  }

  stop() {
    this.queuedNotes && this.queuedNotes.forEach(note => note.stop());
    clock.removeCallback(this.cb);
    clock.stop();
  }
}
