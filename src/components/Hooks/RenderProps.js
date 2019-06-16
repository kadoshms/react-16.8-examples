import React from "react";
import {getRandomInt} from "./random";

class ChangingColor extends React.Component {
  state = {
    R: 0,
    G: 0,
    B: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        R: getRandomInt(0, 255),
        G: getRandomInt(0, 255),
        B: getRandomInt(0, 255),
      })
    }, 1500);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    const { R,G,B } = this.state;
    return this.props.render(`rgb(${R},${G},${B})`);
  }
}

export default ChangingColor;