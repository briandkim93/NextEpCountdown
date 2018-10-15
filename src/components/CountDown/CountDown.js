import React, { Component } from 'react';

import './CountDown.css';

import CountDownBlock from '../CountDownBlock/CountDownBlock';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsLeft: ''
    };
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
        this.setState({
          secondsLeft: this.props.secondsUntilNextEp
        });
        const counter = setInterval(() => {
          this.setState({
            secondsLeft: this.state.secondsLeft - 1
          });
        }, 1000);
        this.setState({
          counter: counter
        });
      } else {
        clearInterval(this.state.counter);
      }
    }
  }

  render() {
    if (this.props.secondsUntilNextEp) {
      const timeLeft = this.convertSeconds(this.state.secondsLeft);
      return (
        <div className="count-down">
          <div className="count-down-row">
            <CountDownBlock unitValue={timeLeft.days} caption="Days" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
            <CountDownBlock unitValue={timeLeft.hours >= 10 ? timeLeft.hours : `0${timeLeft.hours}`} caption="Hours" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
          </div>
          <div className="count-down-row">
            <CountDownBlock unitValue={timeLeft.mins >= 10 ? timeLeft.mins : `0${timeLeft.mins}`} caption="Minutes" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
            <CountDownBlock unitValue={timeLeft.secs >= 10 ? timeLeft.secs : `0${timeLeft.secs}`} caption="Seconds" />
          </div>
        </div>
      );
    } else if (this.props.secondsUntilNextEp === 0) {
      return <div className="count-down"></div>;
    } else {
      return (
        <div className="count-down">
          <div className="count-down-row">
            <CountDownBlock unitValue="00" caption="Days" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
            <CountDownBlock unitValue="00" caption="Hours" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
          </div>
          <div className="count-down-row">
            <CountDownBlock unitValue="00" caption="Minutes" />
            <CountDownBlock unitValue=":" caption="&nbsp;" />
            <CountDownBlock unitValue="00" caption="Seconds" />
            <span className="invisible"><CountDownBlock unitValue=":" caption="&nbsp;" /></span>
          </div>
          <div className="text-danger mt-3 mb-0">
            Program Concluded
          </div>
          <div className="text-danger m-0">
            - OR -
          </div>
          <div className="text-danger m-0">
            Next Episode Airtime TBD
          </div>
        </div>
      );
    }
  }
}

export default CountDown;