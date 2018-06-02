import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxDialog from 'redux-dialog';
import PropTypes from "prop-types";
import _ from 'lodash';

import { editName, editType} from '../actions/actions';

class BasicDialog extends Component {
  constructor(props) {
      super(props);
      this.initialState = {
        itemKey: props.payload.itemKey,
        type: props.payload.type
      }

      this.state = _.clone(this.initialState);
      this.handleItemKeyChange = this.handleItemKeyChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
  }

  handleItemKeyChange(e) {
    this.setState({ itemKey: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleSave(e) {
    // this.props.dispatch()
    console.log("this.initialState :", this.initialState);
    console.log("this.state :", this.state);
    if (this.state.itemKey !== this.initialState.itemKey) this.props.editName(this.state.itemKey, this.props.payload.path )
    if (this.state.type !== this.initialState.type) this.props.editType(this.state.type, this.props.payload.path, this.props.payload.itemKey )
  }

  render() {
    return (
      <div>
        <div className="modal-header">
          <h5 className="modal-title">Édition de la propriété "{this.props.payload.itemKey}"</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Nom</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.itemKey} onChange={this.handleItemKeyChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Type</label>
              <div className="col-sm-10">
                <select className="form-control" id="exampleFormControlSelect1" value={this.state.type} onChange={this.handleTypeChange}>
                   <option value="string">Texte</option>
                   <option value="boolean">Booléen</option>
                   <option value="number">Nombre</option>
                   <option value="object">Objet</option>
                 </select>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={this.handleSave}>Sauvegarder</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
        </div>
      </div>
    )
  }
}

// Modal.propTypes = {
//   type: PropTypes.string.isRequired,
//   itemKey: PropTypes.string.isRequired,
//   path: PropTypes.string.isRequired
// }

const Modal = reduxDialog({
  name: 'EDIT_PROPERTY'
}) (BasicDialog);

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ editType, editName }, dispatch)
}

export default connect(null, mapDispatchToProps)(Modal);
