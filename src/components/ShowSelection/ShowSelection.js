import React from 'react';

import './ShowSelection.css';

const ShowSelection = (props) => {
  if (props.showInfo) {
    return (
      <li 
        className="show-selection list-group-item py-1 py-sm-2"
        tabIndex="0" 
        onClick={() => props.onShowSelect(props.showInfo.show)}
        onKeyPress={(event) => event.key === "Enter" ? props.onShowSelect(props.showInfo.show): false}
      >
        {props.showInfo.show.name}
      </li>
    );
  } else {
    return <li></li>;
  }
}

export default ShowSelection;