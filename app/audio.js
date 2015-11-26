import getAudioBuffer from './ajax.js';

var ctx = new (window.AudioContext || window.webkitAudioContext)();

getAudioBuffer();

module.exports = {
  ctx: ctx,
  foo: 'bar'
};
