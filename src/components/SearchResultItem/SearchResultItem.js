import React from 'react';

import './SearchResultItem.css';

const SearchResultItem = (props) => {
  if (props.showInfo) {
    return (
      <li 
        className="search-result-item list-group-item py-1 py-sm-2"
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

export default SearchResultItem;