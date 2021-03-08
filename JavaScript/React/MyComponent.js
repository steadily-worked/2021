import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  static defaultProps = {
    name: "공백",
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };
  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        안녕하세요. 제 이름은 {name} 입니다. children 값은 {children} 입니다.
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: "기본 이름",
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNUmber: PropTypes.number.isRequired,
};

export default MyComponent;
