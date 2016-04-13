import React, {Component} from 'react';
import {render} from 'react-dom';
import {playSource, samples} from './sounds.js';
import {Recorder} from './record.js';

const gridStyle = {
};

const rowStyle = {
  clear: 'both',
};

const buttonStyle = highlight => { return {
  width: '100px',
  height: '100px',
  display: 'table',
  backgroundColor: '#3af',
  float: 'left',
  margin: '4px',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '5px',
  boxShadow: highlight ? 'none' : '2px 2px 3px 1px #aaa',
  border: highlight ? '1px solid white' : '1px solid black',
  fontWeight: '300',
  fontFamily: 'Arial',
  textTransform: 'uppercase',
} };

const buttonInnerStyle = {
  display: 'table-cell',
  textAlign: 'center',
  verticalAlign: 'middle',
};


class App extends Component {
  render() {
    return (
      <div>
        <Grid samples={samples} recorder={this.recorder} />
        <Controls recorder={this.recorder} />
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  constructor(props) {
    super(props);
    this.recorder = new Recorder();
  }

}

class Controls extends Component {
  render() {
    return(
      <div>
        <button onClick={this.start}>Start Recording</button>
        <button onClick={this.stop}>Stop Recording</button>
        <button onClick={this.play}>Play</button>
        <input onInput={this.bpmChange} type="number" />
      </div>
    );
  }

  start = () => {
    this.props.recorder.startRecording();
  }

  stop = () => {
    this.props.recorder.stop();
  }

  play = () => {
    this.props.recorder.play();
  }

  bpmChange = (event) => {
    this.props.recorder.setBpm(event.target.value);
  }
}

class Grid extends Component {
  render() {
    return (<div style={gridStyle}>
      {this.props.samples.map((row, i) =>
        (<Row row={row} key={i} recorder={this.props.recorder} />)
      )}
    </div>);
  }
}

class Row extends Component {
  render() {
    return (<div style={rowStyle}>
      {this.props.row.map(([keyName, sample], i) =>
        (<Button sample={sample} keyName={keyName} key={i} recorder={this.props.recorder} />)
      )}
    </div>);
  }
}

class Button extends Component {
  render() {
    return (
      <div style={buttonStyle(this.state.highlight)} className="pad" onClick={this.handleClick}>
        <div style={buttonInnerStyle}>
          {this.props.keyName}: {this.props.sample}
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = { highlight: false };
  }

  playSample() {
    playSource(this.props.sample);
    this.props.recorder.addNote(this.props.sample);
  }

  handleClick = () => {
    this.playSample();
    this.addHighlight();
    setTimeout(this.removeHighlight, 50);
  }

  addHighlight = () => {
    this.setState({ highlight: true });
  }

  removeHighlight = () => {
    this.setState({ highlight: false });
  }

  isThisButton = event => String.fromCharCode(event.which) === this.props.keyName;

  handleKeydown = event => {
    if (this.isThisButton(event)) {
      this.playSample();
      this.addHighlight();
    }
  }

  handleKeyup = event => {
    if (this.isThisButton(event)) {
      this.removeHighlight();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  }
}

render(<App />, document.getElementById('root'));
