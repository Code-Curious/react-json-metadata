import React from 'react';
import PropTypes from "prop-types";

// bouton collapse/expand à gauche du libellé de des propriétés complexes

function CollapseButton({isOpened, clickHandler}) {
  let buttonLabel = isOpened ? "-" : "+"; 
  return (
    <button onClick={clickHandler} className="btn btn-sm btn-outline-info collapse-btn">{buttonLabel}</button>
    )
}


CollapseButton.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    isOpened: PropTypes.bool.isRequired
}


export default CollapseButton;
