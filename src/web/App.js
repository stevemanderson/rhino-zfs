import React, { Component } from 'react';
import DatasetList from './DatasetList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DatasetList url="http://localhost:4000/datasets" />
      </div>
    );
  }
}

export default App;
