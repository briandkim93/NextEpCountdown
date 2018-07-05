import React, { Component } from 'react';

import './CountDown.css';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {secondsLeft: ''};
  }
  convertSeconds(n) {
    const dateObject = {
      days: Math.floor(n / 86400),
      hours: Math.floor(n % 86400 / 3600),
      mins: Math.floor(n % 3600 / 60),
      secs: Math.floor(n % 60)
    }
    return dateObject;
  }
  componentDidUpdate(prevProps) {
    if (this.props.secondsUntilNextEp !== prevProps.secondsUntilNextEp) {
      if (this.props.secondsUntilNextEp > 0) {
        clearInterval(this.state.counter);
        this.setState({secondsLeft: this.props.secondsUntilNextEp});

        const counter = setInterval(() => {
          this.setState({secondsLeft: this.state.secondsLeft - 1});
        }, 1000);
        this.setState({counter});
      }
    }
  }

  render() {
    if (this.props.secondsUntilNextEp) {
      const timeLeft = this.convertSeconds(this.state.secondsLeft);
      return (
        <div>
          <figure className="unit-block">
            <span className="unit-value">{timeLeft.days}</span>
            <figcaption>Days</figcaption>
          </figure>
          <figure className="unit-block">
            <span className="unit-value">{timeLeft.hours}</span>
            <figcaption>Hours</figcaption>
          </figure>
          <figure className="unit-block">
            <span className="unit-value">{timeLeft.mins}</span>
            <figcaption>Minutes</figcaption>
          </figure>
          <figure className="unit-block">
            <span className="unit-value">{timeLeft.secs}</span>
            <figcaption>Seconds</figcaption>
          </figure>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default CountDown;