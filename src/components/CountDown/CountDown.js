import React, { Component } from 'react';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {secondsLeft: ''};
  }
  componentDidUpdate(prevProps) {
    if (this.props.secondsUntilNextEp !== prevProps.secondsUntilNextEp) {
      clearInterval(this.state.counter);
      this.setState({secondsLeft: this.props.secondsUntilNextEp});

      const counter = setInterval(() => {
        this.setState({secondsLeft: this.state.secondsLeft - 1});
      }, 1000);
      this.setState({counter});
    }
  }

  render() {
    return (
      <div>Seconds Left Until Next Episode = {this.state.secondsLeft}</div>
    );
  }
}

export default CountDown;