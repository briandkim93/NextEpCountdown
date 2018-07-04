import React from 'react';

import ShowSelection from '../ShowSelection/ShowSelection';

const ShowList = (props) => {
    const showSelections = props.searchResults.map(
      searchResult => <ShowSelection showInfo={searchResult} />
    );
  return (
    <ul className="list-group">
      {showSelections}
    </ul>
  );
};

export default ShowList;