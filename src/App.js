import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import JsonReader from './components/JsonReader.js';

function App(props) {
  return (
    <div className="root container-fluid">
      <h2 className="text-center">React JSON metadata</h2>
      <JsonReader jsonData={props.JsonData}></JsonReader>
    </div>
    );
  }


function mapStateToProps({jsonData}) {
  return {
    jsonData
  }
}

export default connect(mapStateToProps)(App);

