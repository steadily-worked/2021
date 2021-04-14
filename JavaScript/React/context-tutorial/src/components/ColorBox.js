import React from "react";
import ColorContext from "../contexts/color";

const ColorBox = () => {
  return (
    <div>
      <ColorContext.Consumer>
        {(value) => (
          <div
            style={{
              width: "64px",
              height: "64px",
              background: value.color,
            }}
          />
        )}
      </ColorContext.Consumer>
    </div>
  );
};

export default ColorBox;
