import React from 'react';

// bouton collapse/expand à gauche du libellé de des propriétés complexes

function CollapseButton({isOpened, clickHandler}) {
  let buttonLabel = isOpened ? "-" : "+"; 
  return (
    <button onClick={clickHandler} className="btn btn-sm btn-outline-info collapse-btn">{buttonLabel}</button>
    )
}

export default CollapseButton;
