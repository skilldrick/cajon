import React, { Component } from 'react';
import Footer from './Footer.js';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { render } from 'react-dom';
import { samples } from './sounds.js';
import Recorder from './record.js';
import initPromise from './init.js';


// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const gridStyle = {
};

const rowStyle = {
  clear: 'both',
};

const padStyle = (highlight) => { return {
  width: '100px',
  height: '100px',
  margin: '4px',
  display: 'table',
  float: 'left',
  cursor: 'pointer',
  backgroundColor: highlight ? '#BBDEFB' : '#42A5F5',
  transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  //boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
  boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
  borderRadius: '2px',
} };

const buttonInnerStyle = {
  display: 'table-cell',
  textAlign: 'center',
  verticalAlign: 'middle',
};


const Icon = (props) => {
  return <i className={"fa fa-" + props.icon} ariaHidden="true"></i>
};

class App extends Component {
  render() {
    return (
      <div>
        <Controls recorder={this.state.recorder} bpm={this.props.bpm} />
        <Grid samples={samples} recorder={this.state.recorder} sampler={this.state.sampler} />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  constructor(props) {
    super(props);

    this.state = {
      sampler: null,
      recorder: null
    };

    initPromise.then(sampler => {
      const recorder = new Recorder(this.props.bpm, sampler);
      this.setState({ sampler, recorder });
    });
  }

}

class Controls extends Component {
  buttonStyle = {
    marginRight: 10
  }

  render() {
    return(
      <div style={{marginBottom: 20, marginLeft: 5}}>
        <RaisedButton onTouchTap={this.start} style={this.buttonStyle}>
          <Icon icon="circle" />
        </RaisedButton>
        <RaisedButton onTouchTap={this.stop} style={this.buttonStyle}>
          <Icon icon="stop" />
        </RaisedButton>
        <RaisedButton onTouchTap={this.play} style={this.buttonStyle}>
          <Icon icon="play" />
        </RaisedButton>
        <TextField onInput={this.bpmChange} type="number" defaultValue={120} style={{width: 120}} />
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
        (<Row row={row} key={i} recorder={this.props.recorder} sampler={this.props.sampler} />)
      )}
    </div>);
  }
}

class Row extends Component {
  render() {
    return (<div style={rowStyle}>
      {this.props.row.map(([keyName, sample], i) =>
        (<Button sample={sample} keyName={keyName} key={i} recorder={this.props.recorder} sampler={this.props.sampler} />)
      )}
    </div>);
  }
}

class Button extends Component {
  render() {
    return (
      <div style={padStyle(this.state.highlight)} className="pad" onTouchTap={this.handleClick}>
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
    this.props.sampler.play(this.props.sample, 0);
    this.props.recorder.addNote(this.props.sample);
    this.addHighlight();
    setTimeout(this.removeHighlight, 60);
  }

  handleClick = () => {
    this.playSample();
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
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
}

render(<App bpm={120} />, document.getElementById('root'));
