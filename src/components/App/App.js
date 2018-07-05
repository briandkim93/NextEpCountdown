import React, { Component } from 'react';
import axios from 'axios';

import ShowDetail from '../ShowDetail/ShowDetail';
import SearchBar from '../SearchBar/SearchBar';
import ShowList from '../ShowList/ShowList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [], 
      selectedShowId: '', 
      selectedShow: '',
      nextEpUnixEpochAirTime: ''
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleOnShowSelect = this.handleOnShowSelect.bind(this);
  }
  updateSearchResults(query) {
    axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => this.setState({searchResults: response.data}));
  }
  handleSearchTermChange(query) {
    this.setState({showSelected: false});
    this.updateSearchResults(query);
  }
  updateNextEpUnixEpochAirTime(showId) {
    axios.get(`http://api.tvmaze.com/shows/${showId}/episodes`)
    .then(
      response => {
        const showUnixEpochAirTimes = response.data.map(episode => {
          const airDateAndTime = new Date(
            parseInt(episode.airdate.split('-')[0], 0),
            parseInt(episode.airdate.split('-')[1] - 1, 0),
            parseInt(episode.airdate.split('-')[2], 0),
            parseInt(episode.airtime.split(':')[0], 0),
            parseInt(episode.airtime.split(':')[1], 0)
          );
          return airDateAndTime.getTime();
        });
        const unairedEpisodesUnixEpochAirTimes = showUnixEpochAirTimes.filter(airTime => airTime >= Date.now());
        this.setState({nextEpUnixEpochAirTime: unairedEpisodesUnixEpochAirTimes[0]});
      }
    );
  }
  handleOnShowSelect(show) {
    this.setState({selectedShow: show, showSelected: true});
    this.updateNextEpUnixEpochAirTime(show.id);
  }
  render() {
    return (
      <div className="app">
        <div className="container my-4">
          <ShowDetail show={this.state.selectedShow} nextEpAirTime={this.state.nextEpUnixEpochAirTime} />
          <SearchBar
            showSelected={this.state.showSelected}
            onSearchTermChange={this.handleSearchTermChange} 
          />
          <ShowList 
            searchResults={this.state.searchResults} 
            showSelected={this.state.showSelected}
            onShowSelect={this.handleOnShowSelect}
          />
        </div>
      </div>
    );
  }
}

export default App;
