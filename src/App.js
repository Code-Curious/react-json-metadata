import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import JsonReader from './components/JsonReader.js';

class App extends Component {

  constructor(){
    super();
    this.state = {
      JsonData: {
        "name": "Jeremy Dorn",
        "age": 25,
        "favorite_color": "#ffa500",
        "gender": "male",
        "location": {
          "city": "San Francisco",
          "state": "CA",
          "citystate": "San Francisco, CA",
          "house": {
            "type": "appart",
            "size": "medium",
          }
        },
        "pet": {
            "type": "dog",
            "name": "Walter"
          }
      }
    }
  }
  render() {
    return (
      <div className="root">
        <h1>React JSON metadata</h1>
        <JsonReader jsonData={this.state.JsonData}></JsonReader>
      </div>
    );
  }
}

export default App;

