import {ctx, getCurrentTime} from 'sine/audio';
import {getAudioBuffers} from './ajax.js';

const createSource = (buffer) => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  return source;
};

const getBuffers = bufferMap => getAudioBuffers(ctx, bufferMap);

module.exports = {ctx, createSource, getBuffers, getCurrentTime};
