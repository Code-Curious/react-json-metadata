import React, { Component } from 'react';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { openDialog, closeDialog } from 'redux-dialog';

import * as actions from '../actions/actions';

// ouvre modal
class EditPropertyButton extends Component {
  openModal(e) {
    const {type, itemKey, path, depth} = this.props;
    // this.props.dispatch(openDialog('EDIT_PROPERTY', { type, itemKey, path, depth }))
    this.props.openEditModal(type, itemKey, path, depth);
  }

  render(){
    return (
        <button className="btn btn-sm btn-outline-info modal-btn" onClick={this.openModal.bind(this)}><i className="fa fa-pencil"></i></button>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

EditPropertyButton.propTypes = {
    type: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired
}


export default connect(null, mapDispatchToProps)(EditPropertyButton); // on a besoin de dispatch() seulement
