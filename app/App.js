import React, {Component} from 'react';
import {render} from 'react-dom';
import {playSource, samples} from "./sounds.js";

class App extends Component {
  render() {
    return (
      <div>
        <Grid samples={samples} />
      </div>
    );
  }

  handleKeydown = event => {
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
}

class Grid extends Component {
  render() {
    return (<div>
      {this.props.samples.map((row, i) =>
        (<Row row={row} key={i} />)
      )}
    </div>);
  }
}

class Row extends Component {
  render() {
    return (<div>
      {this.props.row.map(([keyName, sample], i) =>
        (<Button sample={sample} keyName={keyName} key={i} />)
      )}
    </div>);
  }
}

class Button extends Component {
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.sample} {this.props.keyName}
      </button>
    );
  }
  playSample() {
    playSource(this.props.sample);
  }

  handleClick = () => {
    playSample();
  }

  handleKeydown = event => {
    if (String.fromCharCode(event.which) === this.props.keyName) {
      this.playSample();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
}

render(<App />, document.getElementById('root'));
