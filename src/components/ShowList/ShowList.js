import React from 'react';

import './ShowList.css';

import ShowSelection from '../ShowSelection/ShowSelection';

const ShowList = (props) => {
  const showSelections = props.searchResults.map(
    searchResult => 
      <ShowSelection 
        key={searchResult.show.id} 
        showInfo={searchResult} 
        onShowSelect={props.onShowSelect}
      />
  );
  if (props.showSelected) {
    return <ul></ul>;
  } else {
    return (
      <ul className="show-list list-group">
        {showSelections.slice(0, 5)}
      </ul>
    );
  }
};

export default ShowList;