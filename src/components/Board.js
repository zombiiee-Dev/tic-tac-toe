import React from "react";
import Square from "./Square";

export default function Board({ squares, handleClick }) {
  let row1 = squares.slice(0, 3);
  let row2 = squares.slice(3, 6);
  let row3 = squares.slice(6);

  return (
    <div className="board">
      <div>
        <div className="board-row">
          {row1.map((square, index) => (
            // "square" value are either 'x', 'o', null
            <Square
              index={index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="board-row">
          {row2.map((square, index) => (
            <Square
              index={3 + index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="board-row">
          {row3.map((square, index) => (
            <Square
              index={6 + index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
