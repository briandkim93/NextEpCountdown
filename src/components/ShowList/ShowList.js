import React from 'react';

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
  return (
    <ul className="list-group">
      {showSelections}
    </ul>
  );
};

export default ShowList;