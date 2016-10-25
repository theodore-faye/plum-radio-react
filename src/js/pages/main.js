import React from 'react';
import Textarea from '../components/textarea.js';
import Timer from '../components/timer.js';
import Lines from '../components/lines.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
    }
    this.timeDown = this.timeDown.bind(this)
  }

  renderTimer() {
    if(this.state.time != null) {
      return <Timer time={this.state.time} />
    }
  }

  renderSubmitButton() {
    return (
      <div class='row'>
        <div class='col offset-s10'>
          <button onClick={this.props.submit}>Submit</button>
        </div>
      </div>
    )
  }

  handleClick() {
    console.log('click');
  }

  componentWillMount() {
    this.setCount()
    this.setTimer()
    this.props.randomLines()
  }

  componentDidMount() {
    this.timer = setInterval(this.timeDown, 1000)
  }

  setTimer() {
    if(this.props.count > 0) {
      this.setState({time: 10})
    }
  }

  setCount() {
    this.setState({count: this.props.count});
  }

  timeDown() {
    var count = this.state.count;
    var time = this.state.time;
    time--;
    this.setState({time: time});
    if(time == 0) {
      clearInterval(this.timer)
      count--;
      this.setState({count: count});
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Lines lines={this.props.lines} />
        {this.renderTimer()}
        <div class='row'>
          <div class='col offset-s1'>
            <button onClick={this.props.toggleTab}>{this.props.text}</button>
          </div>
        </div>
        <div class='row'>
          <Textarea />
        </div>
        <div class='row'>
          {this.props.mode=='zen mode' ? this.renderSubmitButton() : null}
        </div>
      </div>
    )
  }
}
