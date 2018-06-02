import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import PropTypes from "prop-types";

import './App.css';

import JsonReader from './components/JsonReader.js';
import Modal from './components/Modal.js';


// ReactModal.setAppElement('#root');
// const Modal = ReactModal;

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


function App(props) {
  console.log("props in App :", props);
  return (
    <div className="container-fluid" id="root">
      <h2 className="text-center title">React JSON metadata</h2>
      <JsonReader jsonData={props.jsonData}/>
      <Modal 
        contentLabel="Édition d'une propriété"
        style={modalStyle}

       />
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

