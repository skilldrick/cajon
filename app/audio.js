import {getAudioBuffer, getAudioBuffers} from './ajax.js';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const bufferNames = {
  'snare5': 'samples/drumatic3/2104__opm__sn-set5.wav',
  'kick1': 'samples/drumatic3/2085__opm__kk-set1.wav'
};

getAudioBuffers(ctx, bufferNames).then(buffers => {
  console.log('foo', bufferNames);
  console.log('bar', buffers);
});

module.exports = {ctx};
