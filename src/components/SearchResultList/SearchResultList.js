import React from 'react';

import './SearchResultList.css';
import SearchResultItem from '../SearchResultItem/SearchResultItem';

const SearchResultList = (props) => {
  const searchResults = props.searchResults.map(
    searchResult => 
      <SearchResultItem 
        key={searchResult.show.id}
        showInfo={searchResult} 
        onShowSelect={props.onShowSelect}
      />
  );
  if (props.showSelected) {
    return <ul></ul>;
  } else {
    return (
      <ul 
        className="col-12 search-result-list list-group"
        onMouseOver={event => event.target.focus()}
      >
        {searchResults.slice(0, 5)}
      </ul>
    );
  }
};

export default SearchResultList;