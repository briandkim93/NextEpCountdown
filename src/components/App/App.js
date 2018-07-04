import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';
import ShowList from '../ShowList/ShowList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: [], selectedShowId: '', showSelected: false};
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  updateSearchResults(query) {
    axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => this.setState({searchResults: response.data}));
  }
  handleSearchTermChange(query) {
    this.setState({showSelected: false});
    this.updateSearchResults(query);
  }
  render() {
    return (
      <div className="app">
        <div className="container my-4">
          <SearchBar
            showSelected={this.state.showSelected}
            onSearchTermChange={this.handleSearchTermChange} 
          />
          <ShowList 
            searchResults={this.state.searchResults} 
            showSelected={this.state.showSelected}
            onShowSelect={showId => this.setState({selectedShowId: showId, showSelected: true})}
          />
        </div>
      </div>
    );
  }
}

export default App;
