import React, { Component } from 'react';
import Select from 'react-select';

class EditableValue extends Component {

  booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]

  state = {
    value: this.props.value
  }

  onChange = (e) => {
    this.setState({ value: e.target.value})
    // this.
  }

  renderSwitch(){
    switch (this.props.type) {
      case 'string': return <input type="text" className="form-control" value={this.state.value} onChange={this.onChange}/>
      case 'number': return <input type="number" className="form-control" value={this.state.value} onChange={this.onChange}/>
      case 'boolean': return <Select
                                onChange={this.onChange}
                                options={this.booleanOptions}
                                value={this.state.value}
                              />
      default : return <div>Type Not supported</div>
    }
  }

  render(){
    return (
      <div>
        {this.renderSwitch()}
      </div>
    )
  }
}

export default EditableValue;
