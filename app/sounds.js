import {createSource, getBuffers} from "./audio.js";

const bufferNames = {
  'ch1': 'samples/drumatic3/2075__opm__ch-set1.wav',
  'ch2': 'samples/drumatic3/2076__opm__ch-set2.wav',
  'ch3': 'samples/drumatic3/2079__opm__ch-sset3.wav',
  'ch4': 'samples/drumatic3/2077__opm__ch-set4.wav',
  'ch5': 'samples/drumatic3/2078__opm__ch-set5.wav',
  'cp1': 'samples/drumatic3/2080__opm__cp-set1.wav',
  'cp2': 'samples/drumatic3/2081__opm__cp-set2.wav',
  'cp3': 'samples/drumatic3/2082__opm__cp-set3.wav',
  'cp4': 'samples/drumatic3/2083__opm__cp-set4.wav',
  'cp5': 'samples/drumatic3/2084__opm__cp-set5.wav',
  'kk1': 'samples/drumatic3/2085__opm__kk-set1.wav',
  'kk2': 'samples/drumatic3/2086__opm__kk-set2.wav',
  'kk3': 'samples/drumatic3/2087__opm__kk-set3.wav',
  'kk4': 'samples/drumatic3/2088__opm__kk-set4.wav',
  'kk5': 'samples/drumatic3/2089__opm__kk-set5.wav',
  'oh1': 'samples/drumatic3/2090__opm__oh-set1.wav',
  'oh2': 'samples/drumatic3/2091__opm__oh-set2.wav',
  'oh3': 'samples/drumatic3/2092__opm__oh-set3.wav',
  'oh4': 'samples/drumatic3/2093__opm__oh-set4.wav',
  'oh5': 'samples/drumatic3/2094__opm__oh-set5.wav',
  'rs1': 'samples/drumatic3/2095__opm__rs-set1.wav',
  'rs2': 'samples/drumatic3/2096__opm__rs-set2.wav',
  'rs3': 'samples/drumatic3/2097__opm__rs-set3.wav',
  'rs4': 'samples/drumatic3/2098__opm__rs-set4.wav',
  'rs5': 'samples/drumatic3/2099__opm__rs-set5.wav',
  'sn1': 'samples/drumatic3/2100__opm__sn-set1.wav',
  'sn2': 'samples/drumatic3/2101__opm__sn-set2.wav',
  'sn3': 'samples/drumatic3/2102__opm__sn-set3.wav',
  'sn4': 'samples/drumatic3/2103__opm__sn-set4.wav',
  'sn5': 'samples/drumatic3/2104__opm__sn-set5.wav',
  'tm1': 'samples/drumatic3/2105__opm__tm-set1.wav',
  'tm2': 'samples/drumatic3/2106__opm__tm-set2.wav',
  'tm3': 'samples/drumatic3/2107__opm__tm-set3.wav',
  'tm4': 'samples/drumatic3/2108__opm__tm-set4.wav',
  'tm5': 'samples/drumatic3/2109__opm__tm-set5.wav',
};

//TODO: don't do this
let buffers = null;

getBuffers(bufferNames).then(buffs => {
  buffers = buffs;

  //setInterval(() => playSource('tm3'), 500);
});

const playSource = (name) => {
  const source = createSource(buffers[name]);
  source.start();
};

const samples = [
  [['1', 'tm1'], ['2', 'tm2'], ['3', 'tm3'], ['4', 'tm4']],
  [['Q', 'cp1'], ['W', 'cp2'], ['E', 'cp3'], ['R', 'cp4']],
  [['A', 'sn1'], ['S', 'sn2'], ['D', 'ch3'], ['F', 'rs4']],
  [['Z', 'kk1'], ['X', 'kk2'], ['C', 'ch3'], ['V', 'oh4']],
];

module.exports = {playSource, samples};