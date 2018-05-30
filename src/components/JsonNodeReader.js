import React, { Component } from 'react';
import shortId from 'shortid';
import {Collapse} from 'react-collapse';

import CollapseButton from './CollapseButton.js';
import EditableValue from './EditableValue.js';

 
// TODO: propTypes
// TODO: handle array rendering

// renders one node
class JsonNodeReader extends Component {
  constructor(props){
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = { isOpened: true };
  }

  toggleCollapse() {
    this.setState({ isOpened: !this.state.isOpened});
  }
  

  isTypeObject(type) {
    return type === "object";
  }

  render() {
    const {type, value, itemKey, path, depth} = this.props;
    // console.log("props.value :", value);
    if (this.isTypeObject(type)) {
      let subComponents = Object.keys(value).map(subKey => {
        let subType, subValue;
        subType = value[subKey].type;
        if (subType === "object") {
          subValue = value[subKey].properties;
        } else {
          subValue = value[subKey].value;
        }
        // let subValue = value[subKey];
        // let subType = this.props.jsonData[subKey].type;
      
        // JSX for each subNode :
        return <JsonNodeReader 
          key={shortId.generate()}
          itemKey={subKey}
          type={subType}
          value={subValue}
          depth={depth + 1}
          path={path + '.' + subKey}
        />
      })

      // subNode is an object :
      return ( 
        <div className="subnode-container">
        <CollapseButton isOpened={this.state.isOpened} clickHandler={this.toggleCollapse}></CollapseButton>
          <h4 className="complex-item-label">{itemKey}</h4>
          <Collapse isOpened={this.state.isOpened} hasNestedCollapse={true}>
            <div className="card card-body bg-light subnode">{subComponents}</div>
          </Collapse>
        </div>
      )

    } else {
      // subNode is a primitive value :
      return (
        <div className="subnode-container">
          <label className="control-label primitive-item-label">{itemKey} :</label>
          <EditableValue 
            value={value}
            type={type}
            path={path}
          />
        </div>
        )
    }
  }
}

export default JsonNodeReader;
