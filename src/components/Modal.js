import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxDialog, { openDialog, closeDialog } from 'redux-dialog';
import PropTypes from "prop-types";
import _ from 'lodash';

import { editName, editType, openEditModal, closeEditModal} from '../actions/actions';

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
      // const closeEditModal = this.props.closeEditModal.bind(this);
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

    const currentItemKey = this.state.itemKey;
    const currentType = this.state.type;
    const initialItemKey = this.initialState.itemKey;
    const initialType = this.initialState.type;

    console.log("this.props.payload :", this.props.payload);
    // if type or name has changed, trigger the action :
    // if both have changed editName() gets fired first to provide the correct itemKey for editType
    if (currentItemKey !== initialItemKey) this.props.editName(currentItemKey, this.props.payload.path, this.initialState.itemKey, this.props.payload.depth )
    if (this.state.type !== this.initialState.type) this.props.editType(currentType, this.props.payload.path, this.props.payload.itemKey, this.props.payload.depth )

    // TODO: handle errors
    // close dialog
    this.props.closeEditModal()
  }

  render() {
    return (
      <div>
        <div className="modal-header">
          <h5 className="modal-title">Édition de la propriété "{this.props.payload.itemKey}"</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeEditModal}>
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
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeEditModal}>Annuler</button>
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

/*Modal.propTypes = {
    type: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired
}
*/

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ editType, editName, openEditModal, closeEditModal }, dispatch)
}

export default connect(null, mapDispatchToProps)(Modal);
