import React from 'react';

import ShowSelection from '../ShowSelection/ShowSelection';

const ShowList = (props) => {
    const showSelections = props.searchResults.map(
      searchResult => <ShowSelection showInfo={searchResult} />
    );
  return (
    <ul>
      {showSelections}
    </ul>
  );
};

export default ShowList;