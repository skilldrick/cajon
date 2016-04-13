import getAudioBuffer from 'sine/ajax';
import {objToAssoc, assocToObj} from './utils.js';

//TODO: move somewhere better
const getAudioBuffers = (ctx, bufferMap) => {
  const bufferFutures = objToAssoc(bufferMap).map(([key, filename]) => {
    return getAudioBuffer(filename).then(buffer => [key, buffer]);
  });

  return Promise.all(bufferFutures).then(buffers => assocToObj(buffers));
}

module.exports = {getAudioBuffer, getAudioBuffers};
