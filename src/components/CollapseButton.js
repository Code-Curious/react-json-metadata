import React from 'react';

function CollapseButton({isOpened, clickHandler}) {
  let buttonLabel = isOpened ? "-" : "+"; 
  return (
    <button onClick={clickHandler} className="btn btn-sm btn-outline-info collapse-btn">{buttonLabel}</button>
    )
}

export default CollapseButton;
