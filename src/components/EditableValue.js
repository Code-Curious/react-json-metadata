import React, { Component } from 'react';
// import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import * as actions from '../actions/actions';

// Render l'input en question selon le type de la propriété (pour type primitive seulement )
class EditableValue extends Component {

  state = {
    value: this.props.value
  }

  /*booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },

  ]*/


  // TODO: debounce edit event firing
  onChange = (e) => {
    this.setState({ value: e.target.value});
  }

  handleBlur = (e) => {
    this.props.editValue(e.target.value, this.props.path); // dispatch l'action sur la store

  }

  renderSwitch(){
    switch (this.props.type) {
      case 'string': 
        return <input type="text" className="form-control" value={this.state.value} onChange={this.onChange} onBlur={this.handleBlur}/>

      case 'number': 
        return <input type="number" className="form-control" value={this.state.value} onChange={this.onChange} onBlur={this.handleBlur}/>

      case 'boolean': 
        return <select value={this.state.value} onChange={this.onChange}>
                  <option value={false}>Non</option>
                  <option value={true}>Oui</option>
               </select>

      default: 
        return <div className="text-danger">Type non supporté</div>
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


function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}


EditableValue.propTypes = {
  value: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}


// composant a besoin juste des actions, d'où mapStateToProps === null
export default connect(null, mapDispatchToProps)(EditableValue);
