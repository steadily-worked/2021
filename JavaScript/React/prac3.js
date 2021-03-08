import React, { Component } from "react";

class EventPractice extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  state = {
    username: "",
    message: "",
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick(e) {
    alert(this.state.username + ": " + this.state.message);
    this.setState({
      message: "",
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
