import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import JsonReader from './components/JsonReader.js';

function App(props) {
  console.log("props in App :", props);
  return (
    <div className="root container-fluid">
      <h2 className="text-center title">React JSON metadata</h2>
      <JsonReader jsonData={props.jsonData}></JsonReader>
    </div>
    );
  }


function mapStateToProps({jsonData}) {
  return {
    jsonData
  }
}

export default connect(mapStateToProps)(App);

