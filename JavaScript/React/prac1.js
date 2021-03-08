import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 5,
  };
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState({ number: number + 1 }, () => {
              console.log("ㅎㅊㄷ");
            });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
