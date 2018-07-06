import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import ShowDetail from '../ShowDetail/ShowDetail';
import SearchBar from '../SearchBar/SearchBar';
import ShowList from '../ShowList/ShowList';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [], 
      showSelected: false,
      selectedShowId: '', 
      selectedShow: '',
      secondsUntilNextEp: 0,
      initialSearchState: true
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
        this.setState({secondsUntilNextEp: Math.round((unairedEpisodesUnixEpochAirTimes[0] - Date.now()) / 1000)});
      }
    );
  }
  handleOnShowSelect(show) {
    this.setState({selectedShow: show, showSelected: true, initialSearchState: false});
    this.updateNextEpUnixEpochAirTime(show.id);
  }
  render() {
    const state = this.state.initialSearchState ? 'initial-state' : '';
    return (
      <div className="app">
        <div className="container">
          <ShowDetail show={this.state.selectedShow} secondsUntilNextEp={this.state.secondsUntilNextEp} />
          <span className={state}>
            <SearchBar
              onSearchTermChange={this.handleSearchTermChange} 
            />
            <ShowList 
              searchResults={this.state.searchResults} 
              showSelected={this.state.showSelected}
              onShowSelect={this.handleOnShowSelect}
            />
          </span>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
