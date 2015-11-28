import {getAudioBuffer, getAudioBuffers} from './ajax.js';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createSource = (buffer) => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  return source;
};

const getBuffers = bufferMap => getAudioBuffers(ctx, bufferMap);

module.exports = {ctx, createSource, getBuffers};
