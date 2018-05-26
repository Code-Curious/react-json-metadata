import React, { Component } from 'react';
import shortId from 'shortid';
import {Collapse} from 'react-collapse';

import CollapseButton from './CollapseButton.js';
 
// TODO: handle array rendering

// renders one node
class JsonNodeReader extends Component {
  constructor(props){
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = { isOpened: true };
    this.collapseButton = React.createRef();
  }

  toggleCollapse(){
    this.setState({ isOpened: !this.state.isOpened});
    debugger;
    let collapseBtn = this.collapseButton.current
    console.log("collapseBtn.textContent :", collapseBtn.textContent);
    if (collapseBtn.textContent === "+") {
      collapseBtn.textContent = "-";
    }
    else {
      collapseBtn.textContent = "+";
    }
  }

  isValueComplex(value) {
    return (value !== null && typeof value === 'object') || value.constructor === Array
  }

  render() {
    let value = this.props.value;
    let key = this.props.itemkey;

    if (this.isValueComplex(value)) {
      let subComponents = Object.keys(value).map(subKey => {
        let subValue = value[subKey];
        return <JsonNodeReader itemkey={subKey} value={subValue} key={shortId.generate()}></JsonNodeReader>
      })

      return ( 
        <div>
          <button ref={this.collapseButton} onClick={this.toggleCollapse}>
          +
          </button><span><strong>{key} (complex) : </strong></span>
          <Collapse isOpened={this.state.isOpened} hasNestedCollapse={true}>
            <div className="sub-node">{subComponents}</div>
          </Collapse>
        </div>
        )
    } else {
      return (
        <div>
          <span><strong>{key} (simple) : </strong></span>
          <span>{value}</span>
        </div>
        )
    }
  }
}

export default JsonNodeReader;
