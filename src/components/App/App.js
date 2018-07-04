import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';
import ShowList from '../ShowList/ShowList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: []};
  }
  updateSearchResults(query) {
    axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => this.setState({searchResults: response.data}));
  }
  render() {
    return (
      <div className="app">
        <SearchBar onSearchTermChange={query => this.updateSearchResults(query)} />
        <ShowList searchResults={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
