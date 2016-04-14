import getAudioBuffer from 'sine/ajax';
import { bufferNames } from './sounds.js';
import Sampler from 'sine/sampler';

const objToAssoc = obj => {
  return Object.keys(obj).map(key => [key, obj[key]]);
};

const assocToObj = assoc => {
  return assoc.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

const getBuffers = (bufferNames) => {
  const bufferFutures = objToAssoc(bufferNames).map(([key, filename]) => {
    return getAudioBuffer(filename).then(buffer => [key, buffer]);
  });

  return Promise.all(bufferFutures).then(buffers => assocToObj(buffers));
}

export default getBuffers(bufferNames).then(bufferMap => {
  const sampler = new Sampler(bufferMap);
  return sampler;
});
