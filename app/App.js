import React, {Component} from 'react';
import {render} from 'react-dom';
import audio from "./audio.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to the react starter. {audio.foo}
        </h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
