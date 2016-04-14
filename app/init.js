import { getBuffers, bufferNames } from './sounds.js';
import Sampler from 'sine/sampler';

export default getBuffers(bufferNames).then(bufferMap => {
  const sampler = new Sampler(bufferMap);
  return sampler;
});
