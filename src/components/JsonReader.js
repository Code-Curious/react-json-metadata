import React, { Component } from 'react';
import shortId from 'shortid';

import JsonNodeReader from './JsonNodeReader.js';

// renders the whole JSON
class JsonReader extends Component {
  render() {
    let subComponents = Object.keys(this.props.jsonData).map(key => {
      let subValue = this.props.jsonData[key];
      return <JsonNodeReader itemkey={key} value={subValue} key={shortId.generate()}></JsonNodeReader>
      
    })


    return (
      <div className="json-reader">
        <h3>JsonReader :</h3>
        {subComponents}
      </div>
    );
  }
}

export default JsonReader;
