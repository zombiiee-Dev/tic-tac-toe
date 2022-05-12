import React from "react";
//bo value, onClick.

function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
