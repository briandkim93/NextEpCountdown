import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {query: ''};

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }
  updateSearchQuery(event) {
    this.setState({query: event.target.value});
    this.props.onSearchTermChange(event.target.value);
  }
  render() {
    return (
      <div>
        <input 
          className="col-12"
          placeholder="Search TV Show"
          value={this.state.query}
          onChange={this.updateSearchQuery}
        />
      </div>
    );
  }
}

export default SearchBar;