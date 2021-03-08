import React, { Component } from "react";

class RefSample extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  };
  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefSample;

// ref를 설정해 준 DOM에 접근하려면, this.input.current를 조회하면 된다.
