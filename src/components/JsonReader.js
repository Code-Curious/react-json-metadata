import React, { Component } from 'react';
import shortId from 'shortid';

import JsonNodeReader from './JsonNodeReader.js';

// renders the whole JSON
class JsonReader extends Component {
  render() {
    let subComponents = Object.keys(this.props.jsonData).map(key => {
      let subType, subValue;
      subType = this.props.jsonData[key].type;
      if (subType === "object") {
        subValue = this.props.jsonData[key].properties;
      } else {
        subValue = this.props.jsonData[key].value;
      }

      return <JsonNodeReader 
        key={shortId.generate()}
        itemKey={key} 
        type={subType} 
        value={subValue} 
        path={key} 
        depth={0} 
      />
      
    })


    return (
      <div className="json-reader">
        {subComponents}
      </div>
    );
  }
}

export default JsonReader;
