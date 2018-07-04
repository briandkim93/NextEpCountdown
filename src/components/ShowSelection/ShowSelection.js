import React from 'react';

const ShowSelection = (props) => {
  if (props.showInfo) {
    return (
      <li 
        className="list-group-item" 
        onClick={() => props.onShowSelect(props.showInfo.show.id)}
      >
        {props.showInfo.show.name}
      </li>
    );
  } else {
    return <li></li>;
  }
}

export default ShowSelection;