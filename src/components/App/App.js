import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './App.css';
import ShowDetail from '../ShowDetail/ShowDetail';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultList from '../SearchResultList/SearchResultList';
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
    .then(response => this.setState({
      searchResults: response.data
    }));
  }

  handleSearchTermChange(query) {
    this.setState({
      showSelected: false
    });
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
        this.setState({
          secondsUntilNextEp: Math.round((unairedEpisodesUnixEpochAirTimes[0] - Date.now()) / 1000)
        });
      }
    );
  }

  handleOnShowSelect(show) {
    this.setState({
      selectedShow: show, 
      showSelected: true, 
      initialSearchState: false
    });
    this.updateNextEpUnixEpochAirTime(show.id);
  }

  render() {
    const debouncedSearch = _.debounce(query => {this.handleSearchTermChange(query)}, 250);
    return (
      <div className={this.state.initialSearchState ? 'initial-app-state' : 'app'}>
        <div className="container">
          <div className="row justify-content-center">
            <div className={`col-10 ${this.state.initialSearchState ? 'initial-search-state' : 'final-search-state'}`}>
              <div className="row justify-content-center">
                <SearchBar onSearchTermChange={debouncedSearch} />
              </div>
              <div className="row justify-content-center">
                <SearchResultList 
                  searchResults={this.state.searchResults} 
                  showSelected={this.state.showSelected}
                  onShowSelect={this.handleOnShowSelect}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11">
              <ShowDetail show={this.state.selectedShow} secondsUntilNextEp={this.state.secondsUntilNextEp} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
