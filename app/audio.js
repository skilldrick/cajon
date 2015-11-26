import {getAudioBuffer, getAudioBuffers} from './ajax.js';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const bufferNames = {
  'snare5': 'samples/drumatic3/2104__opm__sn-set5.wav',
  'kick1': 'samples/drumatic3/2085__opm__kk-set1.wav'
};

//TODO: don't do this
let buffers = null;

getAudioBuffers(ctx, bufferNames).then(buffs => {
  buffers = buffs;

  //setInterval(() => playSource('kick1'), 500);
});

const createSource = (buffer) => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  return source;
};

const playSource = (name) => {
  const source = createSource(buffers[name]);
  source.start();
};


module.exports = {ctx, playSource};
