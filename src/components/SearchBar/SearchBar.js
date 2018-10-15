import React, { Component } from 'react';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  updateSearchQuery(event) {
    this.setState({
      query: event.target.value
    });
    this.props.onSearchTermChange(event.target.value);
  }

  render() {
    return (
      <input 
        className="search-bar col-12 mt-2 mt-sm-4"
        placeholder="Search TV Show"
        value={this.state.query}
        onChange={this.updateSearchQuery}
        onFocus={
          event => {
            event.target.select();
            event.target.placeholder = '';
          }
        }
        onBlur={event => event.target.placeholder = "Search TV Show"}
      />
    );
  }
}

export default SearchBar;