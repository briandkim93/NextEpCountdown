import React from 'react';

import './ShowSelection.css';

const ShowSelection = (props) => {
  if (props.showInfo) {
    return (
      <li 
        className="show-selection list-group-item py-1 py-sm-2" 
        onClick={() => props.onShowSelect(props.showInfo.show)}
      >
        {props.showInfo.show.name}
      </li>
    );
  } else {
    return <li></li>;
  }
}

export default ShowSelection;