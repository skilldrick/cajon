import React, {Component} from 'react';
import {render} from 'react-dom';
import {playSource} from "./audio.js";

class App extends Component {
  render() {
    return (
      <div>
        <div><Boo sample='kick1' keyName='F,G' /></div>
        <div><Boo sample='snare5' keyName='J,K' /></div>
      </div>
    );
  }

  handleKeydown = event => {
    if (event.which === 70 || event.which === 71) {
      playSource('kick1');
    } else if (event.which === 74 || event.which === 75) {
      playSource('snare5');
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
}

class Boo extends Component {
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.sample} {this.props.keyName}
      </button>
    );
  }
  handleClick = () => {
    playSource(this.props.sample);
  }
}

render(<App />, document.getElementById('root'));
