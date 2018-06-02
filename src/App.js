import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import PropTypes from "prop-types";

import './App.css';

import JsonReader from './components/JsonReader.js';
import Modal from './components/Modal.js';


// ReactModal.setAppElement('#root');
// const Modal = ReactModal;

function App(props) {
  console.log("props in App :", props);
  return (
    <div className="container-fluid" id="root">
      <h2 className="text-center title">React JSON metadata</h2>
      <JsonReader jsonData={props.jsonData}/>
      <Modal
        contentLabel="Édition d'une propriété"
      >
       {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
       {/*<button onClick={this.closeModal}>close</button>*/}
       {/*<div>I am a modal</div>
       <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>*/}
      </Modal>
  </div>
    );
  }


function mapStateToProps({jsonData}) {
  return {
    jsonData
  }
}


App.propTypes = {
  jsonData: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(App);

