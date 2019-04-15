import React, { Component } from 'react';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

class CountDown extends Component {
  state = {
    leftTime: 0,
  };

  componentDidMount() {
    const { target } = this.props;
    this.tick(target);
  }

  componentDidUpdate(prevProps) {
    const { target } = this.props;
    if (target !== prevProps.target) {
      clearTimeout(this.timer);
      this.tick(target);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // defaultFormat = time => (
  //  <span>{moment(time).format('hh:mm:ss')}</span>
  // );
  defaultFormat = time => {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;

    const h = Math.floor(time / hours);
    const m = Math.floor((time - h * hours) / minutes);
    const s = Math.floor((time - h * hours - m * minutes) / 1000);
    return (
      <span>
        {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
      </span>
    );
  };

  tick = time => {
    let leftTime = time;

    this.timer = setTimeout(() => {
      if (leftTime < 1000) {
        clearTimeout(this.timer);
      } else {
        leftTime -= 1000;
        this.setState(
          {
            leftTime,
          },
          () => {
            this.tick(leftTime);
          }
        );
      }
    }, 1000);
  };

  render() {
    const { format = this.defaultFormat, onEnd, ...rest } = this.props;
    const { leftTime } = this.state;
    const result = format(leftTime);

    return <span {...rest}>{result}</span>;
  }
}

export default CountDown;
