import React, { Component } from 'react';

class ShowSelection extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    if (this.props.showInfo) {
      return (
        <li className="list-group-item">{this.props.showInfo.show.name}</li>
      );
    } else {
      return <li></li>;
    }
  }
}

export default ShowSelection;